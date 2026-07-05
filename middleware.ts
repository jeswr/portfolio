import contentType from 'content-type';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { allowedDestinations, transform, } from 'rdf-transform';
import { Readable } from 'readable-stream';
import { write } from "@jeswr/pretty-turtle";
import { readableFromWeb } from 'readable-from-web';
import { arrayifyStream } from 'arrayify-stream';
import { rdfParser } from 'rdf-parse';
import { DataFactory } from 'n3';
import { siteConfig } from '@/config/site';

// Only run on document routes. Everything in this matcher's negative lookahead
// (Next internals, static assets, generated metadata routes, the OG image) must
// NEVER be re-fetched or content-negotiated — doing so would corrupt images,
// the sitemap/robots/manifest, and the OG card. `/agent` and `/.well-known/…`
// are excluded too: the agent-descriptor surfaces (app/agent/route.ts, the ANP
// well-known route, the static A2A agent-card.json) do their OWN Accept
// negotiation over pre-generated documents — this middleware's RDFa transform
// must never re-handle them.
export const config = {
  matcher: [
    '/((?!_next/|favicon.ico|icon|apple-icon|opengraph-image|twitter-image|sitemap.xml|robots.txt|manifest.webmanifest|agent/?$|\\.well-known/|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|map|txt|xml|json|woff2?|ttf)$).*)',
  ],
};

// HTML media types a browser / crawler asks for. If the client will take any of
// these, we serve the real HTML page untouched (crawl-safe, fast).
const HTML_TYPES = ['text/html', 'application/xhtml+xml'];

// Every response from this middleware depends on the request's Accept header
// (HTML vs an RDF serialisation), so it MUST carry `Vary: Accept` — otherwise a
// shared cache/CDN could serve Turtle to an HTML client or vice versa. The RDF
// transform responses set it explicitly (below); the HTML pass-through path
// (`pass()`) gets it from next.config.js `headers()` for `/`, because Next's RSC
// router owns and overwrites the Vary header on NextResponse.next() responses,
// so a middleware-set value would not survive there.
function pass(): NextResponse {
  return NextResponse.next();
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const accept = request.headers.get('Accept');

  // No Accept header, or a wildcard: treat as HTML and do not transform. This is
  // also how most crawlers (and `curl` with no -H) behave — return the page.
  if (!accept || accept.trim() === '' || accept === '*/*') {
    return pass();
  }

  // Decide what the client actually prefers across HTML + every RDF destination
  // we could produce. We need the upstream content-type to know the RDF options,
  // so first ask the negotiator only about HTML vs the RDF families we serve.
  // Crucial invariant: if HTML is acceptable (present, or via */*, or ambiguous),
  // serve HTML — only transform when the client EXCLUSIVELY wants RDF.
  const negotiator = new Negotiator({
    headers: { accept },
  });

  // The page itself is text/html. Build the candidate list = HTML + the RDF
  // destinations reachable from text/html, then let the client pick.
  let rdfDestinations: string[] = [];
  try {
    rdfDestinations = await allowedDestinations('text/html');
  } catch {
    // If we can't enumerate RDF destinations, never transform — serve HTML.
    return pass();
  }

  const candidates = [...HTML_TYPES, ...rdfDestinations];
  const preferred = negotiator.mediaTypes(candidates);

  // Serve the HTML page untouched whenever HTML is the client's TOP preference
  // (or nothing is acceptable). This is the crawl-safety invariant:
  //   - A browser / crawler sends an explicit `text/html` (q=1), so it ranks
  //     first and we return HTML.
  //   - A bare `*/*` was already handled above; any other request where `*/*`
  //     only makes HTML acceptable as a low-q fallback ranks an explicitly
  //     requested RDF type higher, so HTML does NOT win — important so a Solid
  //     client sending `Accept: text/turtle, …, */*` still gets Turtle.
  // We intentionally do NOT bail merely because HTML appears anywhere in the
  // acceptable set: an explicitly-preferred RDF type must beat a wildcard HTML
  // fallback. Only the top preference decides.
  if (preferred.length === 0 || HTML_TYPES.includes(preferred[0])) {
    return pass();
  }

  // From here on the client prefers an RDF type. Fetch the HTML page and transform
  // its embedded RDFa into the requested RDF serialisation.
  //
  // IMPORTANT: ask the upstream for HTML explicitly. `fetch(request)` re-enters
  // this same middleware; if we forwarded the original `Accept: text/turtle`,
  // the inner request would recurse into the transform branch instead of
  // returning the HTML we need to parse. Overriding Accept to text/html makes
  // the inner call short-circuit to NextResponse.next() (HTML pass-through).
  const htmlHeaders = new Headers(request.headers);
  htmlHeaders.set('Accept', 'text/html');
  const originalResponse = await fetch(request, { headers: htmlHeaders });
  const sourceContentType = originalResponse.headers.get('content-type');

  if (!sourceContentType) {
    return pass();
  }

  const content = contentType.parse(sourceContentType).type;

  // Re-negotiate against the destinations reachable from the ACTUAL upstream
  // content type. If nothing better than the source is available, pass through.
  let mediaTypes: string[];
  try {
    mediaTypes = negotiator.mediaTypes(await allowedDestinations(content));
  } catch {
    return pass();
  }
  if (mediaTypes.length === 0 || mediaTypes[0] === content) {
    return pass();
  }

  const resContentType = mediaTypes[0];
  let stream;
  try {
    const webReadable: any = readableFromWeb(originalResponse.body!);

    if (mediaTypes[0] === 'text/turtle') {
      const quads = await arrayifyStream(
        rdfParser.parse(webReadable, { contentType: content, baseIRI: originalResponse.url }),
      );
      // RDFa parsing emits the page's embedded JSON-LD <script> into its own
      // named graph (alongside the default-graph RDFa triples). A WebID profile
      // is a single document graph, and @jeswr/pretty-turtle refuses to serialise
      // more than one graph, so collapse everything into the default graph.
      const defaultGraph = DataFactory.defaultGraph();
      const merged = quads.map((q) =>
        q.graph.equals(defaultGraph)
          ? q
          : DataFactory.quad(q.subject, q.predicate, q.object, defaultGraph),
      );
      stream = await write(merged, {
        format: 'text/turtle',
        prefixes: siteConfig.prefixes,
      });
    } else {
      stream = transform(webReadable, {
        from: { contentType: content },
        to: { contentType: mediaTypes[0] },
        baseIRI: originalResponse.url,
      });
    }
  } catch (e) {
    return new NextResponse(`${e}`, { status: 500 });
  }

  // Build the response headers fresh. We replaced the body, so every header that
  // describes the OLD body must be dropped/recomputed — copying upstream
  // content-length / content-encoding / etag / transfer-encoding verbatim would
  // describe the wrong bytes (truncation, decode failures, or a stale validator
  // for a different representation). Copy only safe, body-agnostic headers.
  const DROP_HEADERS = new Set([
    'content-type',
    'content-length',
    'content-encoding',
    'transfer-encoding',
    'etag',
    'content-md5',
    'content-disposition',
  ]);
  const headers = new Headers({ 'content-type': resContentType });
  for (const [key, value] of originalResponse.headers.entries()) {
    if (!DROP_HEADERS.has(key.toLowerCase())) {
      headers.append(key, value);
    }
  }
  // This representation was chosen by content negotiation on Accept.
  headers.set('Vary', 'Accept');

  // Carry the upstream status explicitly (don't rely on spreading the Response,
  // which does not reliably propagate status/statusText to NextResponse).
  return new NextResponse(stream as any, {
    status: originalResponse.status,
    statusText: originalResponse.statusText,
    headers,
  });
}
