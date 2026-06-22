// AUTHORED-BY Claude Opus 4.8
import { test, expect } from "@playwright/test";

// The load-bearing contract: the homepage, content-negotiated to Turtle, is a
// valid Solid WebID document. This is what lets the page act as the maintainer's
// WebID (jeswr.org/#me). middleware.ts transforms the embedded RDFa into the
// requested RDF serialisation; a dependency bump that breaks rdf-parse /
// rdf-transform / @jeswr/pretty-turtle / n3 must fail HERE, not silently in prod.

test.describe("WebID content negotiation", () => {
  test("GET / with Accept: text/turtle returns a WebID profile", async ({
    request,
  }) => {
    const response = await request.get("/", {
      headers: { Accept: "text/turtle" },
    });

    // Status + content-type are the negotiation contract.
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/turtle");

    const body = await response.text();

    // The page must describe a <#me> subject as a foaf:Person — the WebID.
    // The subject IRI resolves against the request base (…/#me), so match the
    // fragment rather than the absolute host (which differs local vs prod).
    expect(body).toContain("#me");
    expect(body).toMatch(/#me>\s+a\s+[^.]*foaf:Person/);

    // The Solid-OIDC issuer is the single most load-bearing WebID triple: it is
    // what an IdP and a relying app check before trusting a login for this WebID.
    expect(body).toContain("solid:oidcIssuer");
    expect(body).toContain("https://idp.solid-test.jeswr.org");
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
