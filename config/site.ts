export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Jesse Wright",
  // ~150-char meta description (real, accurate, keyword-bearing).
  description:
    "Jesse Wright is the Solid Project Lead at the Open Data Institute and a DPhil candidate at the University of Oxford, working on trustworthy AI for the decentralized Web.",
  // Canonical apex host. The www -> apex redirect is a deploy-time concern.
  url: "https://jeswr.org",
  vocab: "http://xmlns.com/foaf/0.1/",
  prefixes: {
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    foaf: "http://xmlns.com/foaf/0.1/",
    owl: "http://www.w3.org/2002/07/owl#",
    xsd: "http://www.w3.org/2001/XMLSchema#",
    org: "http://www.w3.org/ns/org#",
    cert: "http://www.w3.org/ns/auth/cert#",
    schema: "http://schema.org/",
    vcard: "http://www.w3.org/2006/vcard/ns#",
    solid: "http://www.w3.org/ns/solid/terms#",
    space: "http://www.w3.org/ns/pim/space#",
    ldp: "http://www.w3.org/ns/ldp#",
    dct: "http://purl.org/dc/terms/",
    // The maintainer's apex namespace — the WebID document lives at jeswr.org/#me.
    jeswr: "https://jeswr.org/",
    rdfa: "http://www.w3.org/ns/rdfa#",
    xhtml: "http://www.w3.org/1999/xhtml/vocab#",
  },
  navItems: [
    {
      label: "About",
      href: "/#about",
    },
    {
      label: "Projects",
      href: "/#projects",
    },
    {
      label: "Research",
      href: "/#research",
    },
    {
      label: "Writing",
      href: "https://blog.jeswr.org",
    },
  ],
  navMenuItems: [
    {
      label: "About",
      href: "/#about",
    },
    {
      label: "Projects",
      href: "/#projects",
    },
    {
      label: "Research",
      href: "/#research",
    },
    {
      label: "Writing",
      href: "https://blog.jeswr.org",
    },
    {
      label: "GitHub",
      href: "https://github.com/jeswr",
    },
  ],
  // The Solid-OIDC issuer the WebID at jeswr.org/#me trusts for login.
  // Verified from https://idp.solid-test.jeswr.org/.well-known/openid-configuration
  // ("issuer":"https://idp.solid-test.jeswr.org" — no trailing slash).
  oidcIssuer: "https://idp.solid-test.jeswr.org",
  // The intended Solid pod for this WebID (provisioning is a deploy-time step).
  pod: {
    storage: "https://solid-test.jeswr.org/jeswr/",
    inbox: "https://solid-test.jeswr.org/jeswr/inbox/",
    publicTypeIndex:
      "https://solid-test.jeswr.org/jeswr/settings/publicTypeIndex.ttl",
  },
  // Verified profile links. This list is the single source of truth for both the
  // RDFa schema:sameAs on the page and the JSON-LD sameAs in the head — keep them identical.
  sameAs: [
    "https://github.com/jeswr",
    "https://www.linkedin.com/in/jeswr/",
    "https://x.com/jesmwr",
    "https://sfba.social/@jeswr",
    "https://bsky.app/profile/jeswr.bsky.social",
    "https://scholar.google.com.au/citations?user=J_HhOU8AAAAJ",
    "https://dblp.org/pid/189/1514.html",
    "https://orcid.org/0000-0002-5771-988X",
    "https://www.researchgate.net/profile/Jesse-Wright-5",
    "https://theodi.org/profile/jesse-wright/",
    "https://www.cs.ox.ac.uk/people/jesse.wright/",
    "https://www.oxfordmartin.ox.ac.uk/people/jesse-wright",
    "https://blog.jeswr.org/",
    "https://shapes.jeswr.org/",
  ],
  email: "jesse@jeswr.org",
  links: {
    github: "https://github.com/jeswr",
    linkedin: "https://www.linkedin.com/in/jeswr/",
    x: "https://x.com/jesmwr",
    mastodon: "https://sfba.social/@jeswr",
    bluesky: "https://bsky.app/profile/jeswr.bsky.social",
    scholar: "https://scholar.google.com.au/citations?user=J_HhOU8AAAAJ",
    orcid: "https://orcid.org/0000-0002-5771-988X",
    blog: "https://blog.jeswr.org/",
    // Jesse's OWN personal-profile pages on the organisations he is part of —
    // linked from the natural anchor text where each role/affiliation is named
    // in About (his ODI team profile, his Oxford CS people page, his Oxford
    // Martin people page). Each is also asserted as schema:sameAs/rdfs:seeAlso
    // on <#me> via siteConfig.sameAs above, so they stay a single source of
    // truth — the same exact URLs.
    odiProfile: "https://theodi.org/profile/jesse-wright/",
    oxfordProfile: "https://www.cs.ox.ac.uk/people/jesse.wright/",
    oxfordMartinProfile:
      "https://www.oxfordmartin.ox.ac.uk/people/jesse-wright",
  } as Record<string, string | undefined>,
};
