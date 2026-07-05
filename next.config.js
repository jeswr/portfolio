/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // The homepage is content-negotiated on Accept (HTML for browsers/crawlers,
    // Turtle/JSON-LD for RDF clients — see middleware.ts). The RDF transform
    // responses set `Vary: Accept` themselves, but the HTML pass-through goes
    // through NextResponse.next(), whose Vary header Next's RSC router owns and
    // overwrites — so a middleware-set Vary doesn't survive there. Declaring it
    // here attaches `Vary: Accept` to the page response itself so a shared cache
    // keys the HTML representation separately from the RDF ones.
    return [
      {
        source: "/",
        headers: [{ key: "Vary", value: "Accept" }],
      },
      // The agent-description routes are content-negotiated on Accept too
      // (Turtle / JSON-LD / a 303 to the homepage for browsers — see
      // app/agent/handler.ts). Next's router overwrites a route handler's own
      // Vary header with its RSC vary set, so — exactly as for "/" above — the
      // cache-correctness copy is declared here.
      {
        source: "/agent",
        headers: [{ key: "Vary", value: "Accept" }],
      },
      {
        source: "/.well-known/agent-descriptions",
        headers: [{ key: "Vary", value: "Accept" }],
      },
    ];
  },
  // `/ns/` is the home, under this permanent domain, for @jeswr's family of
  // experimental Solid vocabularies — it is the target of the
  // `w3id.org/jeswr/` redirect. Path-preserving proxy to the GitHub Pages
  // source where the vocabularies are authored, so the canonical namespace
  // resolves under jeswr.org (a domain the owner controls) rather than a
  // transient repo URL. Excluded from the homepage content-negotiation
  // middleware (see middleware.ts matcher) so the proxied vocabulary bytes are
  // served untouched rather than re-parsed as homepage RDFa.
  async rewrites() {
    return [
      {
        source: "/ns/:path*",
        destination: "https://jeswr.github.io/solid-federation-vocab/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
