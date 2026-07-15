// AUTHORED-BY Claude Opus 4.8
import { test, expect } from "@playwright/test";
import { Parser } from "n3";
import { Readable } from "node:stream";
import { rdfParser } from "rdf-parse";

// The load-bearing contract: the homepage, content-negotiated to an RDF
// serialisation, is a valid Solid WebID document. This is what lets the page act
// as the maintainer's WebID (jeswr.org/#me). middleware.ts transforms the
// embedded RDFa into the requested RDF serialisation; a dependency bump that
// breaks rdf-parse / rdf-transform / @jeswr/pretty-turtle / n3 must fail HERE,
// not silently in prod.

// The two load-bearing WebID predicates, fully expanded so we can assert them at
// the quad level (substring matching can pass on a prefix declaration alone).
const RDF_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
const FOAF_PERSON = "http://xmlns.com/foaf/0.1/Person";
const SOLID_OIDC_ISSUER = "http://www.w3.org/ns/solid/terms#oidcIssuer";
const HAS_AUTHORIZATION_AGENT =
  "http://www.w3.org/ns/solid/interop#hasAuthorizationAgent";
const EXPECTED_ISSUER_HOST = "idp.solid-test.jeswr.org";
const EXPECTED_AGENT_DESCRIPTION =
  "https://solid-test.jeswr.org/jeswr/profile/agent-card";

test.describe("WebID content negotiation", () => {
  test("GET / with Accept: text/turtle returns a WebID profile (quad-level)", async ({
    request,
  }) => {
    const response = await request.get("/", {
      headers: { Accept: "text/turtle" },
    });

    // Status + content-type are the negotiation contract.
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/turtle");

    const body = await response.text();

    // Parse the Turtle with n3 and assert the WebID quads exist at the IRI level
    // (not just a substring of the prefixed source). The subject IRI resolves
    // against the request base (…/#me), so match the #me fragment rather than the
    // absolute host (which differs local vs prod).
    const quads = new Parser().parse(body);
    expect(quads.length).toBeGreaterThan(0);

    const meSubject = quads
      .map((q) => q.subject)
      .find((s) => s.termType === "NamedNode" && s.value.endsWith("#me"));
    expect(
      meSubject,
      "Turtle must describe a subject whose IRI ends in #me",
    ).toBeTruthy();

    // (<…/#me>, rdf:type, foaf:Person)
    const isPerson = quads.some(
      (q) =>
        q.subject.equals(meSubject!) &&
        q.predicate.value === RDF_TYPE &&
        q.object.termType === "NamedNode" &&
        q.object.value === FOAF_PERSON,
    );
    expect(isPerson, "<#me> must be typed foaf:Person").toBe(true);

    // (<…/#me>, solid:oidcIssuer, <https://idp.solid-test.jeswr.org…>) — the
    // single most load-bearing WebID triple: it is what an IdP and a relying app
    // check before trusting a login for this WebID.
    const hasIssuer = quads.some(
      (q) =>
        q.subject.equals(meSubject!) &&
        q.predicate.value === SOLID_OIDC_ISSUER &&
        q.object.termType === "NamedNode" &&
        q.object.value.includes(EXPECTED_ISSUER_HOST),
    );
    expect(
      hasIssuer,
      `<#me> must carry solid:oidcIssuer pointing at ${EXPECTED_ISSUER_HOST}`,
    ).toBe(true);

    const hasAgentPointer = quads.some(
      (q) =>
        q.subject.equals(meSubject!) &&
        q.predicate.value === HAS_AUTHORIZATION_AGENT &&
        q.object.termType === "NamedNode" &&
        q.object.value === EXPECTED_AGENT_DESCRIPTION,
    );
    expect(
      hasAgentPointer,
      `<#me> must point to ${EXPECTED_AGENT_DESCRIPTION}`,
    ).toBe(true);
  });

  test("GET / with Accept: application/ld+json returns JSON-LD describing #me", async ({
    request,
  }) => {
    const response = await request.get("/", {
      headers: { Accept: "application/ld+json" },
    });

    // Status + content-type are the negotiation contract for the JSON-LD branch.
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/ld+json");

    // The body must parse as JSON, be JSON-LD shaped, and describe the #me
    // subject — that is what a Solid client keys on.
    const text = await response.text();
    const json = JSON.parse(text);
    expect(json, "body must parse as JSON-LD").toBeTruthy();

    // JSON-LD shape: an @context/@graph or @id-bearing object (or an array of
    // such). Distinguishes genuine JSON-LD from arbitrary JSON.
    const hasJsonLdShape =
      Array.isArray(json) ||
      "@context" in json ||
      "@graph" in json ||
      "@id" in json;
    expect(hasJsonLdShape, "response must be JSON-LD shaped").toBe(true);

    // The document must mention the #me subject somewhere in its graph.
    const containsMe = JSON.stringify(json).includes("#me");
    expect(containsMe, "JSON-LD must contain the #me subject").toBe(true);

    // Parse the JSON-LD as RDF, then assert the pointer at the quad level. This
    // proves the RDFa pointer survives both negotiated representations.
    const quads = [];
    const quadStream = rdfParser.parse(Readable.from([text]), {
      contentType: "application/ld+json",
      baseIRI: response.url(),
    });
    for await (const quad of quadStream) {
      quads.push(quad);
    }
    const hasAgentPointer = quads.some(
      (q) =>
        q.subject.termType === "NamedNode" &&
        q.subject.value.endsWith("#me") &&
        q.predicate.value === HAS_AUTHORIZATION_AGENT &&
        q.object.termType === "NamedNode" &&
        q.object.value === EXPECTED_AGENT_DESCRIPTION,
    );
    expect(
      hasAgentPointer,
      `JSON-LD <#me> must point to ${EXPECTED_AGENT_DESCRIPTION}`,
    ).toBe(true);
  });

  test("Vary: Accept is set so caches key HTML vs RDF separately", async ({
    request,
  }) => {
    const response = await request.get("/", {
      headers: { Accept: "text/turtle" },
    });
    expect(response.headers()["vary"]).toMatch(/Accept/i);
  });
});

test.describe("crawl-safety: browsers and wildcards get HTML, not RDF", () => {
  // A real browser sends this Accept header. It MUST receive HTML — never an RDF
  // serialisation — or the site is unviewable and crawlers index RDF instead of
  // the page.
  test("GET / with a browser Accept returns HTML", async ({ request }) => {
    const response = await request.get("/", {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    expect(response.status()).toBe(200);
    const ct = response.headers()["content-type"];
    expect(ct).toContain("text/html");
    // Explicitly assert it is NOT any RDF type the middleware could have produced.
    expect(ct).not.toContain("text/turtle");
    expect(ct).not.toContain("application/ld+json");
    expect(ct).not.toContain("n-quads");
    expect(ct).not.toContain("n-triples");
  });

  test("GET / with Accept: */* returns HTML", async ({ request }) => {
    const response = await request.get("/", {
      headers: { Accept: "*/*" },
    });
    expect(response.status()).toBe(200);
    const ct = response.headers()["content-type"];
    expect(ct).toContain("text/html");
    expect(ct).not.toContain("text/turtle");
    expect(ct).not.toContain("application/ld+json");
  });
});

test.describe("SEO / crawler routes", () => {
  test("GET /sitemap.xml returns 200 XML", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("xml");
    expect(await response.text()).toContain("<urlset");
  });

  test("GET /robots.txt returns 200 text", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/plain");
    expect(await response.text()).toMatch(/User-Agent/i);
  });
});
