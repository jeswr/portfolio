import { Link } from "@nextui-org/link";
import NextImage from "next/image";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import headshot from "@/public/jesse-wright.jpg";

// The maintainer's WebID document. The page is BOTH the human-readable homepage
// and, when content-negotiated to Turtle/JSON-LD (see middleware.ts), a valid
// Solid WebID profile. The RDFa below describes <#me> (https://jeswr.org/#me);
// it is the WebID/Turtle layer and MUST be kept in sync with the JSON-LD in the
// <head> (app/layout.tsx) which describes the same entity for SEO.

type Project = {
  name: string;
  href?: string;
  blurb: string;
};

const projects: Project[] = [
  {
    name: "Solid Project",
    href: "https://solidproject.org/",
    blurb:
      "Project Lead at the Open Data Institute, coordinating the technical architecture, specification development, and open-source ecosystem of Solid — the decentralized Web standard founded by Sir Tim Berners-Lee.",
  },
  {
    name: "EYE JS",
    href: "https://github.com/eyereasoner/eye-js",
    blurb:
      "A client-side Notation3 (N3) and RDF Surfaces reasoner running in the browser via WebAssembly (ISWC 2024).",
  },
  {
    name: "N3.js Reasoner",
    href: "https://github.com/rdfjs/N3.js",
    blurb:
      "A reasoning engine built on the N3.js Linked Data toolkit for the JavaScript RDF ecosystem (ISWC 2024).",
  },
  {
    name: "Schímatos",
    href: "https://github.com/schimatos/schimatos.org",
    blurb:
      "A SHACL-driven web-form generator for creating and editing RDF data against shape constraints (ISWC 2020).",
  },
  {
    name: "shapes.jeswr.org",
    href: "https://shapes.jeswr.org/",
    blurb: "A registry and editor for reusable SHACL shapes.",
  },
];

type Publication = {
  title: string;
  venue?: string;
  href?: string;
};

const publications: Publication[] = [
  {
    title:
      "Proving Soundness of SPARQL Query Results with Zero-Knowledge Proofs",
    venue: "ESWC 2026",
  },
  {
    title:
      "Here's Charlie! Realising the Semantic Web vision of Agents in the age of LLMs",
    venue: "ISWC 2024",
  },
  {
    title: "Towards Computer-Using Personal Agents",
  },
  {
    title: "Permission Manifests for Web Agents",
  },
];

export default function Home() {
  return (
    <div
      // RDFa: the homepage IS the WebID document. about="#me" resolves to
      // https://jeswr.org/#me against the page base. Prefixes (foaf/schema/solid/
      // space/ldp/...) are declared on the wrapper in app/layout.tsx.
      // eslint-disable-next-line react/no-unknown-property
      about="#me"
      className="flex flex-col gap-16 py-8 md:py-12"
      // eslint-disable-next-line react/no-unknown-property
      typeof="foaf:Person schema:Person"
    >
      {/* Hero */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className={title({ size: "lg" })}>
            Trustworthy AI for a&nbsp;
            <span className={title({ color: "blue", size: "lg" })}>
              decentralized Web
            </span>
          </h1>
          <p className={subtitle({ fullWidth: true })}>
            <span
              // eslint-disable-next-line react/no-unknown-property
              property="foaf:name schema:name"
            >
              Jesse Wright
            </span>{" "}
            — Solid Lead at the Open Data Institute · DPhil candidate,
            University of Oxford
          </p>
          <p className="mt-2 text-default-600 max-w-xl mx-auto md:mx-0">
            Jesse Wright is the Solid Project Lead at the Open Data Institute
            (ODI) and a DPhil candidate at the University of Oxford (Jesus
            College; Department of Computer Science, Human-Centred Computing
            group), where his research focuses on trustworthy AI for the Web and
            decentralized data architectures.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              className="font-medium"
              color="primary"
              href="#projects"
              size="lg"
            >
              View projects
            </Link>
            <Link
              isExternal
              className="font-medium"
              href={`mailto:${siteConfig.email}`}
              property="schema:email"
              size="lg"
            >
              Get in touch
            </Link>
          </div>
        </div>
        <div className="shrink-0">
          <NextImage
            priority
            alt="Jesse Wright"
            className="rounded-2xl shadow-lg"
            height={200}
            // schema:image + foaf:img point at the self-hosted profile photo.
            property="schema:image foaf:img"
            src={headshot}
            width={200}
          />
        </div>
      </section>

      {/* About */}
      <section className="scroll-mt-20" id="about">
        <h2 className={title({ size: "sm" })}>About</h2>
        <div className="mt-4 flex flex-col gap-4 text-default-700 max-w-3xl">
          <p
            // eslint-disable-next-line react/no-unknown-property
            property="schema:description"
          >
            Jesse Wright is the Project Lead for the Solid Project at the Open
            Data Institute (ODI), where he coordinates the project&apos;s
            technical architecture, specification development, and open-source
            ecosystem. He is a DPhil candidate at the University of Oxford
            (Jesus College), in the Department of Computer Science
            (Human-Centred Computing group), supervised by Nigel Shadbolt and
            Jun Zhao, and a member of the Oxford Martin Programme on Ethical Web
            and Data Architectures (EWADA), led by Sir Nigel Shadbolt and Sir
            Tim Berners-Lee. His DPhil began in September 2023.
          </p>
          <p>
            His research designs architectures that let decentralized agents
            autonomously negotiate and make decisions, and explores trusted
            neuro-symbolic AI for the Web and query engines supporting
            zero-knowledge proofs that data was derived from given sources —
            driven by technologies that ensure individuals&apos; data and
            devices serve their best interests.
          </p>
          <p>
            Previously he was a Software Engineer at Inrupt, and worked at the
            Software Innovation Institute and the Australian National
            University, where he earned a Bachelor of Philosophy (Science)
            (Honours) in pure mathematics and computer science and received the
            university medal for his thesis &ldquo;Performant Interoperable
            Reasoning on a Decentralised Semantic Web.&rdquo;
          </p>
        </div>
        <p className="mt-4 text-default-600 max-w-3xl">
          He works across Solid, Linked Data, RDF, and the broader Semantic Web
          to build a Web where people, not platforms, own their data.
        </p>
      </section>

      {/* Projects */}
      <section className="scroll-mt-20" id="projects">
        <h2 className={title({ size: "sm" })}>Projects</h2>
        <p className="mt-2 text-default-600 max-w-3xl">
          Open-source work across the Solid suite and the Linked Data ecosystem.
        </p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <li
              key={p.name}
              className="rounded-xl border border-default-200 p-5"
            >
              <h3 className="text-lg font-semibold">
                {p.href ? (
                  <Link isExternal href={p.href}>
                    {p.name}
                  </Link>
                ) : (
                  p.name
                )}
              </h3>
              <p className="mt-2 text-default-600">{p.blurb}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Research / publications */}
      <section className="scroll-mt-20" id="research">
        <h2 className={title({ size: "sm" })}>Research &amp; publications</h2>
        <p className="mt-2 text-default-600 max-w-3xl">
          Jesse&apos;s DPhil research designs a logical framework for Solid and
          explores trustworthy, neuro-symbolic AI for the Web — including SPARQL
          query engines that produce zero-knowledge proofs of data provenance —
          as part of the Oxford Martin Programme on Ethical Web and Data
          Architectures (EWADA). Full publication lists are available on{" "}
          <Link isExternal href={siteConfig.links.scholar}>
            Google Scholar
          </Link>{" "}
          and{" "}
          <Link isExternal href="https://dblp.org/pid/189/1514.html">
            DBLP
          </Link>
          .
        </p>
        <ul className="mt-6 flex flex-col gap-4">
          {publications.map((pub) => (
            <li
              key={pub.title}
              className="rounded-xl border border-default-200 p-5"
            >
              <p className="font-medium">
                {pub.href ? (
                  <Link isExternal href={pub.href}>
                    {pub.title}
                  </Link>
                ) : (
                  pub.title
                )}
              </p>
              {pub.venue ? (
                <p className="mt-1 text-sm text-default-500">{pub.venue}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {/* Writing */}
      <section className="scroll-mt-20" id="writing">
        <h2 className={title({ size: "sm" })}>Writing</h2>
        <p className="mt-2 text-default-600 max-w-3xl">
          Jesse writes about Solid, decentralized data, and the Semantic Web on
          his blog.
        </p>
        <div className="mt-4">
          <Link
            isExternal
            className="font-medium"
            href={siteConfig.links.blog}
            size="lg"
          >
            Read the blog →
          </Link>
        </div>
      </section>

      {/* WebID profile metadata for <#me>. Rendered but visually hidden — these
          carry the Solid-OIDC issuer, storage, inbox, type index, and sameAs
          links that make this page a working WebID document under Turtle conneg.
          They are not user-facing chrome, hence aria-hidden + sr-only. */}
      <div aria-hidden className="sr-only">
        {/* IRI-valued WebID properties. We use <span rel=… resource=…> rather than
            <a href=…>: the `resource` attribute supplies the object IRI for RDFa
            (rel + resource → an object-IRI triple, NOT a literal) WITHOUT making
            the element focusable. An <a href> here would create invisible keyboard
            tab stops inside this aria-hidden block — a WCAG violation. Each span
            hangs off the about="#me" subject. */}
        {/* eslint-disable react/no-unknown-property */}
        <span rel="solid:oidcIssuer" resource={siteConfig.oidcIssuer} />
        <span rel="space:storage" resource={siteConfig.pod.storage} />
        <span rel="ldp:inbox" resource={siteConfig.pod.inbox} />
        <span
          rel="solid:publicTypeIndex"
          resource={siteConfig.pod.publicTypeIndex}
        />
        {/* NB: schema:sameAs + rdfs:seeAlso only — NOT owl:sameAs. These URLs are
            profile/account pages ABOUT Jesse (GitHub, ORCID, the ODI profile,
            the blog, …), not OWL-identical copies of the person resource, so
            asserting owl:sameAs would wrongly merge the person with those pages
            under OWL reasoning. schema:sameAs is exactly "the URL of a reference
            page that unambiguously indicates the item's identity", and
            rdfs:seeAlso is the generic "see also". */}
        {siteConfig.sameAs.map((url) => (
          <span key={url} rel="schema:sameAs rdfs:seeAlso" resource={url} />
        ))}
        {/* eslint-enable react/no-unknown-property */}
      </div>
    </div>
  );
}
