// AUTHORED-BY Claude Opus 4.8
import { test, expect } from "@playwright/test";

// The homepage is the human-readable face of the site AND the WebID document.
// These tests assert the visible content survives a dependency bump — a broken
// Next/React/NextUI upgrade typically shows up here as a blank render or a
// missing section.

test.describe("homepage rendering", () => {
  test("renders the hero heading and name", async ({ page }) => {
    await page.goto("/");

    // The H1 is split across two spans ("Trustworthy AI for a" +
    // "decentralized Web"); assert on the accessible name of the single H1.
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Trustworthy AI for a");
    await expect(h1).toContainText("decentralized Web");

    // The maintainer's name carries the foaf:name / schema:name on the page.
    await expect(page.getByText("Jesse Wright").first()).toBeVisible();
  });

  test("renders the About, Projects and Publications sections", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "About", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Projects", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Selected publications" }),
    ).toBeVisible();

    // The anchor targets the sections scroll to must exist (nav relies on them).
    await expect(page.locator("#about")).toBeAttached();
    await expect(page.locator("#projects")).toBeAttached();
    await expect(page.locator("#research")).toBeAttached();
  });

  test("HTML head carries JSON-LD and a canonical link", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    // The SEO JSON-LD <script> describes the SAME entity as the WebID.
    const ldJson = page.locator('script[type="application/ld+json"]');
    await expect(ldJson).toHaveCount(1);
    const ldText = await ldJson.textContent();
    expect(ldText).toBeTruthy();
    const parsed = JSON.parse(ldText!);
    // It must describe a Person whose @id is the WebID (…/#me).
    const graph: Array<Record<string, unknown>> = parsed["@graph"] ?? [parsed];
    const person = graph.find((n) => n["@type"] === "Person");
    expect(person, "JSON-LD must contain a Person node").toBeTruthy();
    expect(String(person!["@id"])).toContain("#me");

    // A canonical <link> must be present for SEO.
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute("href", /jeswr\.org/);
  });
});
