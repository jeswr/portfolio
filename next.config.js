/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // `/unite-v2` serves the prebuilt unite v2 demo SPA (a static vite bundle
    // committed under public/unite-v2/). Next does not resolve a directory
    // index inside public/, so the clean URL is rewritten to the bundle's
    // index.html. With the default trailingSlash:false Next itself 308s
    // `/unite-v2/` → `/unite-v2`, so both spellings land here. The SPA is
    // hash-routed (#/arc, #/curtain, …) and its asset URLs are absolute under
    // `/unite-v2/…` (built with --base=/unite-v2/), so this single rewrite is
    // the only server-side routing it needs. The whole subtree is excluded
    // from the RDFa-conneg middleware — see middleware.ts.
    return [
      {
        source: "/unite-v2",
        destination: "/unite-v2/index.html",
      },
    ];
  },
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
      // `/ns/…` and `/spec/…` are the persistent-identifier trees for the
      // @jeswr vocabularies + specifications (app/ns/[...slug]/route.ts,
      // app/spec/[...slug]/route.ts; design in docs/persistent-ids.md): every
      // response is a 303 whose Location depends on the Accept header, so a
      // shared cache must key on it. As for "/" and "/agent" above, Next's
      // router can overwrite a handler-set Vary — the cache-correctness copy
      // is declared here. (The conneg handlers superseded the earlier
      // `/ns/:path*` rewrite that path-preservingly proxied the
      // solid-federation-vocab GitHub Pages site: an afterFiles rewrite would
      // shadow the dynamic route handler, so the handler itself keeps the
      // legacy file paths resolving via 303 to the same Pages URLs. Both
      // trees stay excluded from the homepage RDFa-conneg middleware — see
      // middleware.ts matcher.)
      {
        source: "/ns/:path*",
        headers: [{ key: "Vary", value: "Accept" }],
      },
      {
        source: "/spec/:path*",
        headers: [{ key: "Vary", value: "Accept" }],
      },
    ];
  },
};

module.exports = nextConfig;
