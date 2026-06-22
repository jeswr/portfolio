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
    ];
  },
};

module.exports = nextConfig;
