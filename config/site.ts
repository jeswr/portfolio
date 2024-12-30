export type SiteConfig = typeof siteConfig;

const toPrefix = (prefixes: Record<string, string>) => Object.entries(prefixes).map(([key, value]) => `${key}: ${value}`).join(" ");

export const siteConfig = {
  name: "Jesse Wright",
  description: "Jesse Wrights Personal Website",
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
    dct: "http://purl.org/dc/terms/",
    jeswr: "https://www.jeswr.org/"
  },
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
