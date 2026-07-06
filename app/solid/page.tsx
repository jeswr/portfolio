// AUTHORED-BY Claude Fable 5
import type { Metadata } from "next";

import Link from "next/link";

import { DraftBanner } from "../agentic-web/DraftBanner";
import { WorkstreamNav } from "../agentic-web/WorkstreamNav";
import styles from "../agentic-web/agentic-web.module.css";

export const metadata: Metadata = {
  title: "Solid — what we’ve built",
  description:
    "A from-scratch, open-source exploration of the whole Solid stack: two servers, a Rust query engine, an application fleet, clean-slate specifications, and a library ecosystem — with maturity stated plainly on every item. Working draft — under ongoing review.",
  openGraph: {
    title: "Solid — what we’ve built",
    description:
      "Servers, a query engine, applications, specifications, and libraries built from scratch for Solid — everything experimental or under active development, and labelled as such. Working draft — under ongoing review.",
    type: "article",
  },
};

export default function SolidAssetsPage() {
  return (
    <div className={styles.page}>
      <DraftBanner />

      <div className={styles.pageShell}>
        <header className={styles.masthead}>
          <span className={styles.eyebrow}>
            Workstream — the Solid platform · @jeswr Solid suite
          </span>
          <h1 className={styles.mastheadTitle}>Solid — what we’ve built</h1>
          <p className={styles.subtitle}>
            A from-scratch, open-source exploration of the whole Solid stack
          </p>
          <div className={styles.bylineRow}>
            <span>
              <strong className={styles.bylineName}>Jesse Wright</strong> —{" "}
              <a
                href="https://jeswr.org/#me"
                rel="noopener noreferrer"
                target="_blank"
              >
                jeswr.org/#me
              </a>
            </span>
            <span className={styles.statusPill}>
              Experimental — under active development
            </span>
          </div>
          <p className={styles.draftNote}>
            <em>
              Everything on this page is open source, AI-agent-authored under
              review discipline, and either experimental or under active
              development — the maturity of each item is stated where it is
              described, in each project’s own words.
            </em>
          </p>

          <WorkstreamNav current="solid" />
        </header>

        {/* ================= INTRO ================= */}
        <section className={styles.section} id="intro">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§1</span>
            <span className={styles.sectionRailTag}>Why build all of it</span>
          </div>
          <div className={`${styles.sectionBody} ${styles.prose}`}>
            <h2>The whole stack, from scratch</h2>
            <p>
              This workstream builds the Solid stack end to end rather than
              consuming it: two servers, a query engine, an application fleet, a
              set of specifications, and the libraries that connect them.
              Building from scratch is the point — it is how the specifications
              get tested against reality, how the gaps get found, and how the{" "}
              <Link href="/agentic-web">accountable-agents vision</Link> earns
              its “what exists today” section. Nothing here claims to be
              production-ready; every item below carries its own maturity
              statement.
            </p>
          </div>
        </section>

        {/* ================= SERVERS ================= */}
        <section className={styles.section} id="servers">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§2</span>
            <span className={styles.sectionRailTag}>Servers</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Two Solid servers</h2>
            <div className={styles.prose}>
              <p>
                <strong>
                  <a
                    href="https://github.com/jeswr/prod-solid-server"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    prod-solid-server
                  </a>
                </strong>{" "}
                is a Solid server built from scratch in TypeScript — one
                concrete, deployable server, not a framework, using the
                Community Solid Server as a reference only (no shared code). It
                implements the Solid Protocol / LDP request surface, Solid-OIDC
                authentication with DPoP-bound proof-of-possession tokens (via
                an external Keycloak identity provider behind an issuer-agnostic
                verifier), Web Access Control authorization, the Solid
                Notifications Protocol (WebSocketChannel2023, with WAC-gated
                subscriptions), and S3-backed storage behind a SPARQL index. It
                is <strong>under active development</strong>, and it is the
                server behind the suite’s deployment: the pod endpoint at{" "}
                <code>solid-test.jeswr.org</code> (auth-gated — a Solid server
                root, not a browsable page) and the identity provider at{" "}
                <code>idp.solid-test.jeswr.org</code>.
              </p>
              <p>
                <strong>
                  <a
                    href="https://github.com/jeswr/solid-server-rs"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    solid-server-rs
                  </a>
                </strong>{" "}
                is an explicitly <strong>experimental</strong> Rust Solid server
                — its own README opens “NOT a production server … Do not deploy
                this.” It is a research vehicle, not a replacement for the
                TypeScript server, with two load-bearing rules: the sparq engine
                (§3) is the authoritative source for RDF data, metadata,
                containment, and access-control evaluation, and object storage
                is backup-only for resource bytes. Authentication is delegated
                wholesale to a standalone DPoP/Solid-OIDC verifier crate. The
                current slice covers the LDP verbs with content negotiation and
                conditional requests, an N3 Patch engine, and fail-closed
                DPoP-authenticated middleware; full WAC evaluation and the live
                sparq wiring are deferred, by its own list.
              </p>
            </div>
          </div>
        </section>

        {/* ================= QUERY ENGINE ================= */}
        <section className={styles.section} id="query-engine">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§3</span>
            <span className={styles.sectionRailTag}>Query engine</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>sparq — a Rust RDF triplestore and SPARQL engine</h2>
            <div className={styles.prose}>
              <p>
                <strong>
                  <a
                    href="https://github.com/sparq-org/sparq"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    sparq
                  </a>
                </strong>{" "}
                is a from-scratch RDF triplestore and SPARQL engine in Rust:
                dictionary-encoded with six sorted permutation indexes, parallel
                execution, RDFS/OWL-RL/N3 inference, an out-of-core
                memory-mapped mode with a compressed on-disk format, a
                WebAssembly build, and a W3C-conformant HTTP server. Its own
                status line is <strong>“experimental research engine”</strong>:
                the API is unstable and SPARQL SERVICE federation is
                unimplemented. Against the full W3C SPARQL suites it accounts
                for all 1,229 tests — 1,225 pass, zero fail, zero skips, plus
                four documented divergences where it argues the suite’s expected
                files are wrong against the spec (rationale published in its
                conformance report) — and it passes 100% of the W3C Update
                suite, with an opt-in SHACL Core crate at 100% of the core
                suite. Its benchmark tables report it ahead of QLever on every
                compute benchmark run so far, published together with
                methodology and honesty notes (the synthetic dataset favours
                simple joins; full multi-billion-triple validation is pending
                bigger hardware) — the claims are its own, reproducible from its
                bench records.
              </p>
              <p>
                Its role in this stack is access-controlled query: the opt-in{" "}
                <code>sparq-solid</code> crate models pods as
                named-graph-per-document, evaluates WAC/ACP as N3 rules into a
                queryable authorization view, and filters SPARQL per (WebID,
                client) session through a zero-copy dataset view, fail-closed.
                That is the engine-side counterpart of the Access-Controlled
                SPARQL Query specification below (§5) — and the direction{" "}
                <code>solid-server-rs</code> is built around.
              </p>
            </div>
          </div>
        </section>

        {/* ================= APPLICATIONS ================= */}
        <section className={styles.section} id="applications">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§4</span>
            <span className={styles.sectionRailTag}>Applications</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Applications</h2>
            <div className={styles.prose}>
              <p>
                The applications exist to prove the data-centric claim:
                independent apps reading and writing the <em>same</em>{" "}
                pod-hosted data under the same access-control regime. These are
                deployed and reachable today:
              </p>
            </div>
            <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
              <table>
                <thead>
                  <tr>
                    <th>App</th>
                    <th>URL</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Pod Manager — a personal-data dashboard: view, add, and
                      organise the data in your pod, and control which apps may
                      access it
                    </td>
                    <td>
                      <code>app.solid-test.jeswr.org</code>
                    </td>
                    <td>
                      <span className={styles.tagLive}>live</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Solid Issues — an issue tracker whose data lives in your
                      own pod, on the shared task model
                    </td>
                    <td>
                      <code>issues.solid-test.jeswr.org</code>
                    </td>
                    <td>
                      <span className={styles.tagLive}>live</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Solid App Store — discover and launch the suite’s apps;
                      the catalog itself is published as Linked Data (DCAT +
                      schema.org, content-negotiated)
                    </td>
                    <td>
                      <code>apps.solid-test.jeswr.org</code>
                    </td>
                    <td>
                      <span className={styles.tagLive}>live</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Solid Catalog — a viewer over the community app catalog
                      collected by Jeff Zucker
                    </td>
                    <td>
                      <code>solid-catalog.jeswr.org</code>
                    </td>
                    <td>
                      <span className={styles.tagLive}>live</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Identity provider (Keycloak-based Solid-OIDC broker)
                    </td>
                    <td>
                      <code>idp.solid-test.jeswr.org</code>
                    </td>
                    <td>
                      <span className={styles.tagLive}>live</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.prose} style={{ marginTop: "1.4rem" }}>
              <p>
                Behind those sits the <strong>pod-app fleet</strong> — eight
                repos (<code>pod-mail</code>, <code>pod-music</code>,{" "}
                <code>pod-photos</code>, <code>pod-drive</code>,{" "}
                <code>pod-money</code>, <code>pod-health</code>,{" "}
                <code>pod-docs</code>, <code>pod-chat</code>) building typed RDF
                data layers per domain, several with React views. All carry the
                same honest banner: experimental, AI-agent-generated, under
                active development, not production-hardened — and none has a
                public deployment yet; they are linked by repo, not by URL.
              </p>
              <p>
                A second pattern is the <strong>OSS fork</strong>: take a real,
                loved open-source app and move its <em>data</em> to a pod the
                user controls while the app keeps its UX. Five working forks
                exist in the repos — linkding (bookmarks), Excalidraw
                (whiteboards), Elk (Mastodon social), Miniflux (RSS), and Actual
                (budgeting) — each with a self-contained Solid persistence layer
                on a dedicated Solid feature branch.{" "}
                <strong>None of the five is publicly deployed</strong>; they are
                working forks, not hosted services.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SPECIFICATIONS ================= */}
        <section className={styles.section} id="specifications">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§5</span>
            <span className={styles.sectionRailTag}>Specifications</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Specifications</h2>
            <div className={styles.prose}>
              <p>
                All of these are unofficial drafts — none is an adopted W3C or
                Solid Community Group work item; each states its own standing in
                its Status section:
              </p>
              <ul>
                <li>
                  <strong>
                    <code>lws-spec</code> (JLWS)
                  </strong>{" "}
                  — an explicitly labelled <em>experiment</em>: an AI-authored,
                  clean-slate re-write of Linked Web Storage as a
                  wire-compatible superset of the LWS Working Draft, diverging
                  only on identified gaps with every divergence registered, plus
                  an opt-in RDF content-transformation profile. It ships 150
                  language-neutral conformance test vectors (spec-derived — no
                  reference implementation exists yet, and it says so) and
                  machine-readable normative-statement companions (195 + 47
                  requirements). Not a W3C deliverable, and not a position of
                  the LWS Working Group.
                </li>
                <li>
                  <strong>
                    Access-Controlled SPARQL Query over a Solid Pod
                  </strong>{" "}
                  (<code>solid-sparql-query</code>) — a read-only SPARQL
                  endpoint answering over exactly the subset of a pod the
                  authenticated agent may read: a new read interface over
                  Solid’s existing authorization, not a new authorization model.
                  Editor’s Draft written with every design call resolved and
                  recorded; contribution to the Solid CG is the stated next
                  step.
                </li>
                <li>
                  <strong>
                    <code>dpop-sk-spec</code>
                  </strong>{" "}
                  — a negotiated, optional fast path that keeps
                  proof-of-possession while amortizing DPoP’s per-request
                  signature verification into per-request HMAC message
                  signatures. Its own Status: <em>no implementations exist</em>{" "}
                  — the document deliberately precedes code.
                </li>
                <li>
                  <strong>
                    <code>solid-webauthn-reauth-spec</code>
                  </strong>{" "}
                  — redirect-free WebAuthn (passkey) re-authentication for
                  Solid-OIDC via RFC 8693 token exchange. Implementation-first:
                  its normative requirements are the proven wire contract of two
                  reference implementations.
                </li>
                <li>
                  <strong>
                    <code>a2a-rdf-extension</code>
                  </strong>{" "}
                  — an extension to the Linux Foundation Agent2Agent protocol
                  (via A2A’s own extension mechanism): negotiate once in natural
                  language, then crystallise the routine into a hash-pinned
                  protocol document whose body is a SHACL shape. Reference
                  codec: <code>@jeswr/solid-a2a</code>.
                </li>
                <li>
                  <strong>
                    <code>agentic-solid-note</code> +{" "}
                    <code>agentic-solid-conformance</code>
                  </strong>{" "}
                  — the umbrella architecture Note (“a map, not a spec” — wholly
                  informative, with an honest per-component maturity table) and
                  the shared conformance suite: 58 golden test vectors,
                  extracted from pinned reference-implementation commits, that
                  an independent implementation must reproduce.
                </li>
              </ul>
              <p>
                The machine-readable layer of this catalogue — one checkable
                statement per normative requirement, wired to test vectors — is
                inventoried at{" "}
                <Link href="/agentic-web/companions">
                  <em>Solid Spec Companions</em>
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ================= LIBRARIES ================= */}
        <section className={styles.section} id="libraries">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§6</span>
            <span className={styles.sectionRailTag}>Libraries</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Libraries, by family</h2>
            <div className={styles.prose}>
              <p>
                All TypeScript, all public under{" "}
                <a
                  href="https://github.com/jeswr"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  github.com/jeswr
                </a>
                , all explicitly{" "}
                <strong>experimental — not production-hardened</strong>,
                installable from GitHub:
              </p>
            </div>
            <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
              <table>
                <thead>
                  <tr>
                    <th>Family</th>
                    <th>Packages</th>
                    <th>One line</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Auth</td>
                    <td>
                      <code>solid-dpop</code>, <code>solid-openid-client</code>,{" "}
                      <code>solid-auth-core</code>, <code>solid-api-auth</code>
                    </td>
                    <td>
                      DPoP proofs, server-side Solid-OIDC login, the shared
                      browser login core, and a framework-free API-request
                      verifier
                    </td>
                  </tr>
                  <tr>
                    <td>Data models</td>
                    <td>
                      <code>solid-task-model</code>, <code>solid-bookmark</code>
                      , <code>solid-drawing</code>,{" "}
                      <code>solid-chat-interop</code>,{" "}
                      <code>solid-health-diary</code>
                    </td>
                    <td>
                      Shared sector RDF models — mint minimally, reuse Dublin
                      Core / schema.org / AS2 / PROV — so independent apps read
                      each other’s data
                    </td>
                  </tr>
                  <tr>
                    <td>Federation</td>
                    <td>
                      <code>solid-federation-vocab</code>,{" "}
                      <code>federation-client</code>,{" "}
                      <code>federation-registry</code>,{" "}
                      <code>federation-trust</code>
                    </td>
                    <td>
                      Sector vocabularies and shapes, app self-description,
                      registry-asserted membership, and VC-signed membership
                      trust
                    </td>
                  </tr>
                  <tr>
                    <td>Integration drivers</td>
                    <td>
                      <code>solid-mcp</code>, <code>unstorage-solid</code>,{" "}
                      <code>n8n-nodes-solid</code>, <code>y-solid</code>,{" "}
                      <code>rxdb-solid</code>, <code>auth-solid</code>,{" "}
                      <code>solid-dav-bridge</code>,{" "}
                      <code>matrix-chat-to-pod</code>,{" "}
                      <code>solid-granary</code>
                    </td>
                    <td>
                      Pods reached from existing ecosystems — MCP agents, Nuxt
                      storage, n8n workflows, Yjs and RxDB sync, Auth.js,
                      CalDAV/CardDAV, Matrix, and social-web feeds
                    </td>
                  </tr>
                  <tr>
                    <td>Platform</td>
                    <td>
                      <code>app-shell</code>, <code>solid-elements</code>,{" "}
                      <code>solid-components</code>,{" "}
                      <code>create-solid-app</code>, <code>guarded-fetch</code>
                    </td>
                    <td>
                      The shared app chrome, framework-agnostic Web Components,
                      a declarative component framework, the app scaffolder, and
                      the SSRF-safe fetch every credentialed request goes
                      through
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================= CROSS-LINKS ================= */}
        <section className={styles.section} id="context">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§7</span>
            <span className={styles.sectionRailTag}>Context</span>
          </div>
          <div className={`${styles.sectionBody} ${styles.prose}`}>
            <h2>What all of this is for</h2>
            <p>
              These assets are the platform layer of a larger argument:{" "}
              <Link href="/agentic-web">
                <em>The Accountable Web of Agents</em>
              </Link>{" "}
              sets out the vision they serve — verifiable, attributed,
              policy-bound data as the substrate agents act on — and{" "}
              <Link href="/unite">
                <em>unite</em>
              </Link>
              , the participatory-democracy platform, is its flagship
              demonstration, built directly on the federation machinery listed
              above.
            </p>
          </div>
        </section>

        <footer className={styles.colophon}>
          <span>
            Set in system old-style serif (body/argument) and system monospace
            (structure/data) — no webfonts loaded.
          </span>
          <span>
            Live-URL claims on this page were verified by request at the time of
            writing; everything without a URL is linked by repository, with its
            own maturity statement.
          </span>
          <span>© Jesse Wright, 2026. Draft — pending maintainer review.</span>
        </footer>
      </div>
    </div>
  );
}
