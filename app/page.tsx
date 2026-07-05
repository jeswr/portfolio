import { Link } from "@nextui-org/link";
import NextImage from "next/image";

import { AGENT_IRI } from "@/config/agent-description.generated";
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
  // "App" or "Library" — labels each card so the gallery reads honestly.
  kind: string;
  href?: string;
  blurb: string;
};

// What Jesse is building — an apps/tools gallery. Flagship work leads; each card
// is labelled App or Library. Links are verified to resolve publicly before use;
// a card with no public link omits the link rather than pointing at a 404.
const flagshipProjects: Project[] = [
  {
    name: "SPARQ",
    kind: "App · research",
    href: "https://github.com/jeswr/sparq",
    blurb:
      "Privacy-preserving query verification: zero-knowledge proofs that a SPARQL query result is correct over RDF and Verifiable Credentials, without revealing the underlying data.",
  },
  {
    name: "EYE JS",
    kind: "Library · live",
    href: "https://github.com/eyereasoner/eye-js",
    blurb:
      "A client-side N3 and RDF Surfaces reasoning engine — the EYE reasoner compiled to WebAssembly so it runs in the browser.",
  },
  {
    name: "N3.js",
    kind: "Library · live",
    href: "https://github.com/rdfjs/N3.js",
    blurb:
      "A fast, spec-compliant streaming RDF parser and serializer for JavaScript. Jesse is a core maintainer.",
  },
  {
    name: "Pod Manager",
    kind: "App",
    // The repo is public, but a live app is the more useful link for an App card.
    href: "https://app.solid-test.jeswr.org",
    blurb:
      "A modern app for managing a Solid Pod — profile, type index, sharing, and file and data views.",
  },
  {
    name: "Solid App Store",
    kind: "App",
    href: "https://github.com/jeswr/solid-app-store",
    blurb:
      "Discover and launch every app in the Solid suite. The catalog is itself Linked Data (a DCAT dataset).",
  },
];

const recommendedProjects: Project[] = [
  {
    name: "solid-issues",
    kind: "App",
    href: "https://github.com/jeswr/solid-issues",
    blurb: "An issue tracker that stores your issues in your own Solid Pod.",
  },
  {
    name: "create-solid-app",
    kind: "Library · DX",
    href: "https://github.com/jeswr/create-solid-app",
    blurb:
      "Run npx create-solid-app to scaffold a new Solid app with the suite conventions baked in.",
  },
  {
    name: "solid-components",
    kind: "Library",
    href: "https://github.com/jeswr/solid-components",
    blurb: "Declarative, codegen-friendly Solid Web Components built on Lit 3.",
  },
  {
    name: "The Pod Apps",
    kind: "App",
    href: "https://github.com/jeswr?tab=repositories&q=pod-",
    blurb:
      "A family of Solid-native apps: music, drive, photos, money, health, docs, mail, and chat.",
  },
  {
    name: "OSS → Solid forks",
    kind: "App",
    href: "https://github.com/jeswr?tab=repositories&q=excalidraw",
    blurb:
      "Popular open-source apps re-homed onto Solid Pods: Linkding, Elk, Excalidraw, Miniflux, and Actual.",
  },
];

type Publication = {
  title: string;
  venue: string;
  note?: string;
  href?: string;
};

// First-author papers first, then co-authored — each group newest-first.
const firstAuthorPublications: Publication[] = [
  {
    title:
      "Towards Provable Provenance and Privacy-Preserving Queries in Decentralised Data Architectures",
    venue: "ISWC 2025 (Doctoral Consortium)",
    note: "Sole author",
    href: "https://ceur-ws.org/Vol-4085/paper19.pdf",
  },
  {
    title: "N3.js Reasoner: Implementing reasoning in N3.js",
    venue: "ISWC 2024 (Posters/Demos)",
    note: "Sole author",
    href: "https://ceur-ws.org/Vol-3828/paper23.pdf",
  },
  {
    title:
      "Here's Charlie! Realising the Semantic Web vision of Agents in the age of LLMs",
    venue: "ISWC 2024 (Posters/Demos)",
    note: "Sole author",
    href: "https://ceur-ws.org/Vol-3828/paper38.pdf",
  },
  {
    title:
      "EYE JS: A client-side reasoning engine supporting Notation3 and RDF Surfaces",
    venue: "ISWC 2024 (Posters/Demos)",
    note: "1st of 3 authors",
    href: "https://ceur-ws.org/Vol-3828/paper8.pdf",
  },
  {
    title:
      "Me want cookie! Towards automated and transparent data governance on the Web",
    venue: "NXDG@SEMANTiCS 2024",
    note: "1st of 3 authors",
    href: "https://ceur-ws.org/Vol-3891/paper4.pdf",
  },
  {
    title:
      "Schímatos: A SHACL-Based Web-Form Generator for Knowledge Graph Editing",
    venue: "ISWC 2020",
    note: "1st of 5 authors",
    href: "https://doi.org/10.1007/978-3-030-62466-8_5",
  },
  {
    title: "on2ts: TypeScript generation from OWL ontologies and SHACL",
    venue: "ISWC 2020 (Demos)",
    note: "1st of 5 authors",
    href: "https://ceur-ws.org/Vol-2721/paper590.pdf",
  },
];

const coAuthoredPublications: Publication[] = [
  {
    title:
      "Proving Soundness of SPARQL Query Results Using Selective Disclosure of RDF Datasets and Zero-Knowledge Proofs",
    venue: "ESWC 2026",
    note: "2nd of 3 authors",
    href: "https://doi.org/10.1007/978-3-032-25156-5_16",
  },
  {
    title: "Permission Manifests for Web Agents",
    venue: "arXiv 2026",
    note: "5th of 15 authors",
    href: "https://doi.org/10.48550/arXiv.2601.02371",
  },
  {
    title: "Addressing vulnerability in customer experience with AI-agents",
    venue: "Journal of Service Management (Emerald), Vol. 37(3), pp. 418–450",
    note: "2nd of 6 authors",
    href: "https://doi.org/10.1108/JOSM-04-2025-0182",
  },
  {
    title: "Introduce an Auditing Layer to Web Science",
    venue: "WebSci 2025 (Companion)",
    note: "2nd of 2 authors",
    href: "https://doi.org/10.1145/3720554.3736184",
  },
  {
    title:
      "Let's Measure the Elephant in the Room: Facilitating Personalized Automated Analysis of Privacy Policies at Scale",
    venue: "arXiv 2025",
    note: "4th of 5 authors",
    href: "https://doi.org/10.48550/arXiv.2507.14214",
  },
  {
    title:
      "An LLM-enabled semantic-centric framework to consume privacy policies",
    venue: "arXiv 2025",
    note: "4th of 5 authors",
    href: "https://doi.org/10.48550/arXiv.2509.01716",
  },
  {
    title: "Towards Computer-Using Personal Agents",
    venue: "arXiv 2025",
    note: "12th of 12 authors",
    href: "https://doi.org/10.48550/arXiv.2503.15515",
  },
  {
    title:
      "A Scalable Communication Protocol for Networks of Large Language Models",
    venue: "arXiv 2024",
    note: "3rd of 7 authors",
    href: "https://doi.org/10.48550/arXiv.2410.11905",
  },
  {
    title:
      "What's in a Pod? A Knowledge Graph Interpretation For The Solid Ecosystem",
    venue: "QuWeDa@ISWC 2022",
    note: "3rd of 6 authors",
    href: "https://ceur-ws.org/Vol-3279/paper6.pdf",
  },
  {
    title: "J2RM: An ontology-based JSON-to-RDF Mapping tool",
    venue: "ISWC 2020 (Demos)",
    note: "4th of 5 authors",
    href: "https://ceur-ws.org/Vol-2721/paper593.pdf",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="flex flex-col rounded-xl border border-default-200 p-5">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-lg font-semibold">
          {project.href ? (
            <Link isExternal href={project.href}>
              {project.name}
            </Link>
          ) : (
            project.name
          )}
        </h4>
        <span className="shrink-0 rounded-full bg-default-100 px-2.5 py-0.5 text-xs font-medium text-default-600">
          {project.kind}
        </span>
      </div>
      <p className="mt-2 text-default-600">{project.blurb}</p>
    </li>
  );
}

function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <li className="rounded-xl border border-default-200 p-5">
      <p className="font-medium">
        {publication.href ? (
          <Link isExternal href={publication.href}>
            {publication.title}
          </Link>
        ) : (
          publication.title
        )}
      </p>
      <p className="mt-1 text-sm text-default-500">
        {publication.venue}
        {publication.note ? ` · ${publication.note}` : ""}
      </p>
    </li>
  );
}

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
          {/* The schema:description literal stays on a clean, link-free sentence
              so the WebID profile carries a tidy description; the linked, more
              readable prose follows in the paragraphs below. */}
          <p
            // eslint-disable-next-line react/no-unknown-property
            property="schema:description"
          >
            Jesse Wright leads the{" "}
            <Link isExternal href="https://solidproject.org">
              Solid
            </Link>{" "}
            Project at the{" "}
            <Link isExternal href="https://theodi.org">
              Open Data Institute
            </Link>
            . There he coordinates the technical architecture, the
            specifications, and the open-source ecosystem.
          </p>
          <p>
            He is also a DPhil candidate at the{" "}
            <Link isExternal href="https://www.ox.ac.uk">
              University of Oxford
            </Link>
            , at{" "}
            <Link isExternal href="https://www.jesus.ox.ac.uk">
              Jesus College
            </Link>
            . He started in September 2023, in the Department of Computer
            Science (Human-Centred Computing group). His supervisors are{" "}
            <Link
              isExternal
              href="https://www.cs.ox.ac.uk/people/nigel.shadbolt/"
            >
              Nigel Shadbolt
            </Link>{" "}
            and{" "}
            <Link isExternal href="https://www.cs.ox.ac.uk/people/jun.zhao/">
              Jun Zhao
            </Link>
            , and he is a member of the Oxford Martin{" "}
            <Link
              isExternal
              href="https://www.oxfordmartin.ox.ac.uk/programmes/ethical-web-and-data-architectures"
            >
              EWADA
            </Link>{" "}
            programme. His research is on trustworthy AI for the Web,
            decentralized data, and query engines that prove their results with
            zero-knowledge proofs.
          </p>
          <p>
            Before Oxford he was a Software Engineer at{" "}
            <Link isExternal href="https://www.inrupt.com">
              Inrupt
            </Link>
            . He also worked at the Software Innovation Institute and the
            Australian National University, where he earned a Bachelor of
            Philosophy (Science) (Honours) in pure mathematics and computer
            science and won the university medal for his thesis.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="scroll-mt-20" id="projects">
        <h2 className={title({ size: "sm" })}>Projects</h2>
        <p className="mt-2 text-default-600 max-w-3xl">
          A gallery of the apps and tools Jesse is building across the Solid
          suite and the Linked Data ecosystem.
        </p>

        <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-default-500">
          Flagship
        </h3>
        <ul className="mt-4 grid gap-6 sm:grid-cols-2">
          {flagshipProjects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </ul>

        <h3 className="mt-10 text-sm font-semibold uppercase tracking-wide text-default-500">
          More work
        </h3>
        <ul className="mt-4 grid gap-6 sm:grid-cols-2">
          {recommendedProjects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </ul>
      </section>

      {/* Research / publications */}
      <section className="scroll-mt-20" id="research">
        <h2 className={title({ size: "sm" })}>Selected publications</h2>
        <p className="mt-2 text-default-600 max-w-3xl">
          Jesse&apos;s research covers trustworthy, neuro-symbolic AI for the
          Web and SPARQL query engines that produce zero-knowledge proofs of
          data provenance. The full list is on{" "}
          <Link isExternal href={siteConfig.links.scholar}>
            Google Scholar
          </Link>
          ,{" "}
          <Link isExternal href={siteConfig.links.orcid}>
            ORCID
          </Link>
          , and{" "}
          <Link isExternal href="https://dblp.org/pid/189/1514.html">
            DBLP
          </Link>
          .
        </p>

        <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-default-500">
          First author
        </h3>
        <ul className="mt-4 flex flex-col gap-4">
          {firstAuthorPublications.map((pub) => (
            <PublicationCard key={pub.title} publication={pub} />
          ))}
        </ul>

        <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-default-500">
          Co-authored
        </h3>
        <ul className="mt-4 flex flex-col gap-4">
          {coAuthoredPublications.map((pub) => (
            <PublicationCard key={pub.title} publication={pub} />
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
        {/* The WebID→agent pointer (agentic-Solid M1: "the WebID points to an
            agent"). Links <#me> to the self-describing agent document served at
            /agent (an ANP Agent Description; A2A card at
            /.well-known/agent-card.json). AGENT_IRI comes from the GENERATED
            module so this triple cannot drift from the served descriptors; the
            canonical quads are built by @jeswr/solid-agent-card's
            buildAgentPointer and self-verified in scripts/agent/verify.mjs.
            Two predicates, one object: interop:hasAuthorizationAgent (the SAI
            "agent that represents you" — discoverAgent's priority predicate)
            plus schema:agent for industry reach (the site-wide schema: prefix
            expands to http://schema.org/, which discoverAgent also reads).
            Deliberately NOT mirrored into the head JSON-LD: schema.org defines
            `agent` on Action, not Person, so it would be noise to SEO tooling —
            the pointer is WebID-profile (RDFa) surface, like solid:oidcIssuer. */}
        <span
          rel="interop:hasAuthorizationAgent schema:agent"
          resource={AGENT_IRI}
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
