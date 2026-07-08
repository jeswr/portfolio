// AUTHORED-BY Claude Fable 5
import { test, expect } from "@playwright/test";

// The persistent-identifier contract (docs/persistent-ids.md): /ns/<name> and
// /spec/<name>/<version> answer GET with 303 See Other, content-negotiated on
// Accept — text/turtle to the raw Turtle on GitHub (pinned to main),
// application/ld+json to the JSON-LD context where published, text/html (or no
// preference) to the human documentation. These IRIs are (or will be, post
// w3id-migration) baked into published RDF across the suite: a redirect that
// stops resolving breaks every consumer, so the contract is pinned here.

async function statusAndLocation(
  request: import("@playwright/test").APIRequestContext,
  path: string,
  accept?: string,
) {
  const response = await request.get(path, {
    headers: accept ? { Accept: accept } : {},
    maxRedirects: 0,
  });

  return {
    status: response.status(),
    location: response.headers()["location"],
    vary: response.headers()["vary"],
  };
}

test.describe("persistent identifiers — /ns", () => {
  test("turtle: /ns/fedreg 303s to the raw TTL on main", async ({ request }) => {
    const { status, location, vary } = await statusAndLocation(
      request,
      "/ns/fedreg",
      "text/turtle",
    );

    expect(status).toBe(303);
    expect(location).toBe(
      "https://raw.githubusercontent.com/jeswr/solid-federation-vocab/main/docs/fedreg.ttl",
    );
    expect(vary).toContain("Accept");
  });

  test("html: /ns/fedreg 303s to the GitHub Pages doc", async ({ request }) => {
    const { status, location } = await statusAndLocation(
      request,
      "/ns/fedreg",
      "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
    );

    expect(status).toBe(303);
    expect(location).toBe(
      "https://jeswr.github.io/solid-federation-vocab/fedreg.html",
    );
  });

  test("json-ld: /ns/task 303s to the published context", async ({ request }) => {
    const { status, location } = await statusAndLocation(
      request,
      "/ns/task",
      "application/ld+json",
    );

    expect(status).toBe(303);
    expect(location).toBe(
      "https://raw.githubusercontent.com/jeswr/solid-federation-vocab/main/docs/task-context.jsonld",
    );
  });

  test("no Accept header defaults to the html documentation", async ({
    request,
  }) => {
    const { status, location } = await statusAndLocation(request, "/ns/bookmark");

    expect(status).toBe(303);
    expect(location).toBe("https://github.com/jeswr/solid-bookmark");
  });

  test("longest-prefix match: a versioned profile IRI under a sector resolves", async ({
    request,
  }) => {
    const { status, location } = await statusAndLocation(
      request,
      "/ns/sectors/finance/profile/1.2.0",
      "text/turtle",
    );

    expect(status).toBe(303);
    expect(location).toBe(
      "https://raw.githubusercontent.com/jeswr/solid-federation-vocab/main/docs/sectors/finance.ttl",
    );
  });

  test("code-minted vocab without a TTL falls back to the repo for turtle", async ({
    request,
  }) => {
    const { status, location } = await statusAndLocation(
      request,
      "/ns/pod-chat",
      "text/turtle",
    );

    expect(status).toBe(303);
    expect(location).toBe("https://github.com/jeswr/solid-chat-interop");
  });

  test("legacy proxy path: /ns/fedreg.ttl still resolves (303 to Pages)", async ({
    request,
  }) => {
    const { status, location } = await statusAndLocation(
      request,
      "/ns/fedreg.ttl",
    );

    expect(status).toBe(303);
    expect(location).toBe(
      "https://jeswr.github.io/solid-federation-vocab/fedreg.ttl",
    );
  });

  test("pending namespace answers 404, not a redirect", async ({ request }) => {
    const { status } = await statusAndLocation(
      request,
      "/ns/solid-problem",
      "text/turtle",
    );

    expect(status).toBe(404);
  });

  test("/ns index page renders for browsers", async ({ page }) => {
    await page.goto("/ns");
    await expect(
      page.getByRole("heading", { level: 1, name: "Namespaces" }),
    ).toBeVisible();
    // A registry-driven row must be present.
    await expect(page.getByRole("link", { name: "/ns/fedreg" })).toBeVisible();
  });
});

test.describe("persistent identifiers — /spec", () => {
  test("html: /spec/dpop-sk/v1 303s to the spec repo", async ({ request }) => {
    const { status, location } = await statusAndLocation(
      request,
      "/spec/dpop-sk/v1",
      "text/html",
    );

    expect(status).toBe(303);
    expect(location).toBe("https://github.com/jeswr/dpop-sk-spec");
  });

  test("turtle: /spec/a2a-rdf/v1 303s to the statements TTL on main", async ({
    request,
  }) => {
    const { status, location } = await statusAndLocation(
      request,
      "/spec/a2a-rdf/v1",
      "text/turtle",
    );

    expect(status).toBe(303);
    expect(location).toBe(
      "https://raw.githubusercontent.com/jeswr/a2a-rdf-extension/main/spec.statements.ttl",
    );
  });

  test("slash sub-term: /spec/a2a-rdf/v1/kind resolves via prefix match", async ({
    request,
  }) => {
    const { status, location } = await statusAndLocation(
      request,
      "/spec/a2a-rdf/v1/kind",
      "text/turtle",
    );

    expect(status).toBe(303);
    expect(location).toBe(
      "https://raw.githubusercontent.com/jeswr/a2a-rdf-extension/main/spec.statements.ttl",
    );
  });

  test("more-specific entry wins: /spec/lws/transform/rdf-1", async ({
    request,
  }) => {
    const { status, location } = await statusAndLocation(
      request,
      "/spec/lws/transform/rdf-1",
      "text/turtle",
    );

    expect(status).toBe(303);
    expect(location).toBe(
      "https://raw.githubusercontent.com/jeswr/lws-spec/main/rdf-transform.statements.ttl",
    );
  });

  test("unknown spec path answers 404 (no legacy surface under /spec)", async ({
    request,
  }) => {
    const { status } = await statusAndLocation(request, "/spec/no-such-spec");

    expect(status).toBe(404);
  });
});
