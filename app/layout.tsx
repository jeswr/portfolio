import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import NextLink from "next/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

const toPrefix = (prefixes: Record<string, string>) =>
  Object.entries(prefixes)
    .map(([key, value]) => `${key}: ${value}`)
    .join(" ");

const WEBID = `${siteConfig.url}/#me`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Jesse Wright — Solid Lead at the ODI & Oxford researcher",
    template: "%s — Jesse Wright",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Jesse Wright",
    "Solid Project",
    "Open Data Institute",
    "decentralized Web",
    "trustworthy AI",
    "Linked Data",
    "RDF",
    "Semantic Web",
    "University of Oxford",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "profile",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Jesse Wright — Solid Lead at the ODI & Oxford researcher",
    description: siteConfig.description,
    firstName: "Jesse",
    lastName: "Wright",
    username: "jeswr",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jesse Wright — Trustworthy AI for a decentralized Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesse Wright — Solid Lead at the ODI & Oxford researcher",
    description: siteConfig.description,
    creator: "@jesmwr",
  },
  robots: {
    index: true,
    follow: true,
  },
  // The page is also a WebID document; foaf:primaryTopic points at <#me>.
  other: {
    "foaf:primaryTopic": WEBID,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// JSON-LD for SEO. Describes the SAME entity as the page RDFa (@id === the WebID
// subject). Every fact here is also visible on the page. sameAs is sourced from
// siteConfig.sameAs so it stays identical to the RDFa schema:sameAs links.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": WEBID,
      name: "Jesse Wright",
      alternateName: "jeswr",
      url: siteConfig.url,
      image: `${siteConfig.url}/jesse-wright.jpg`,
      email: `mailto:${siteConfig.email}`,
      jobTitle: "Solid Project Lead",
      description: siteConfig.description,
      worksFor: {
        "@type": "Organization",
        name: "Open Data Institute",
        url: "https://theodi.org/",
      },
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "University of Oxford",
        url: "https://www.ox.ac.uk/",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Australian National University",
        url: "https://www.anu.edu.au/",
      },
      knowsAbout: [
        "Solid",
        "Decentralized Web",
        "Trustworthy AI",
        "Linked Data",
        "RDF",
        "Semantic Web",
      ],
      sameAs: siteConfig.sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": WEBID },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteConfig.url}/#profilepage`,
      url: siteConfig.url,
      name: "Jesse Wright — Solid Lead at the ODI & Oxford researcher",
      mainEntity: { "@id": WEBID },
      dateModified: "2026-06-22",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <script
          // Server-rendered JSON-LD for search engines. The @id matches the
          // RDFa/WebID subject (https://jeswr.org/#me).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div
            className="relative flex flex-col h-screen"
            // RDFa prefixes so the page doubles as a WebID profile. We DON'T set a
            // default `vocab`: with a default vocab, bare HTML rel tokens (the
            // security tokens `noopener`/`noreferrer`, and `me`) would expand into
            // junk predicates (e.g. foaf:noopener) on <#me>. Every RDFa term we
            // actually emit is a fully-qualified CURIE (foaf:name, schema:sameAs,
            // solid:oidcIssuer, …), so no default vocab is needed and the profile
            // stays clean.
            // eslint-disable-next-line react/no-unknown-property
            prefix={toPrefix(siteConfig.prefixes)}
          >
            <Navbar />
            <main className="container mx-auto max-w-5xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center gap-2 py-6 text-sm text-default-500">
              <span>© {new Date().getFullYear()} Jesse Wright</span>
              <span aria-hidden>·</span>
              <NextLink className="text-primary" href="/#me">
                WebID
              </NextLink>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
