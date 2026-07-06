// AUTHORED-BY Claude Fable 5
//
// Shared GET handler for the persistent-identifier trees (/ns/… and /spec/…).
// Linked-Data best practice for non-information resources: answer with
// 303 See Other to the representation the client asked for (Accept-negotiated),
// never a 200 — the namespace IRI identifies the vocabulary/spec, not the
// document. See config/persistent-ids.ts for the registry and
// docs/persistent-ids.md for the design.
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

import {
  availableTypes,
  findEntry,
  legacyPagesUrl,
  pickTarget,
} from "@/config/persistent-ids";

// Redirect targets pin to `main`, so cache briefly: an hour at the edge is a
// fine staleness bound for a redirect whose destination content evolves.
const CACHE_CONTROL = "public, max-age=3600";

// Refuse absurd paths outright rather than forwarding them anywhere.
const MAX_PATH_LENGTH = 2000;

export async function handlePersistentId(
  request: NextRequest,
  tree: "ns" | "spec",
  params: Promise<{ slug?: string[] }>,
): Promise<NextResponse> {
  const { slug } = await params;
  const segments = slug ?? [];

  if (segments.join("/").length > MAX_PATH_LENGTH) {
    return notFound("Path too long.");
  }

  const entry = findEntry(tree, segments);

  if (!entry) {
    // /ns/ predates this conneg layer as a path-preserving proxy of the
    // solid-federation-vocab GitHub Pages site; keep every previously-served
    // file path (…/fedreg.ttl, …/sectors/futures.shacl.ttl, …) resolving.
    if (tree === "ns" && segments.length > 0) {
      return redirect(legacyPagesUrl(segments));
    }

    return notFound("No persistent identifier is registered at this path.");
  }

  if (entry.pending) {
    return notFound(
      `The namespace <${entry.w3id}> (${entry.title}) is registered but its ` +
        "documentation is not yet published. Index: https://jeswr.org/ns",
    );
  }

  // Negotiate over the representations this entry actually has. A bare or
  // wildcard Accept resolves to HTML (server preference — same convention as
  // the homepage WebID conneg in middleware.ts).
  const accept = request.headers.get("accept");
  const negotiator = new Negotiator({ headers: { accept: accept ?? "*/*" } });
  const preferred = negotiator.mediaTypes(availableTypes(entry));

  const target = pickTarget(entry, preferred);

  if (!target) {
    // Unreachable for non-pending entries (every entry has at least one
    // representation), but fail closed rather than throw.
    return notFound("No representation is available for this identifier.");
  }

  return redirect(target.url);
}

function redirect(url: string): NextResponse {
  const response = NextResponse.redirect(url, 303);

  // The chosen Location depends on Accept; caches must key on it. (next.config.js
  // headers() also declares Vary for these paths — Next's router owns Vary on
  // some response paths, so the config copy is the cache-correctness one.)
  response.headers.set("Vary", "Accept");
  response.headers.set("Cache-Control", CACHE_CONTROL);

  return response;
}

function notFound(message: string): NextResponse {
  return new NextResponse(`${message}\n`, {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      Vary: "Accept",
    },
  });
}
