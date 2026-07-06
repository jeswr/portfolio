// AUTHORED-BY Claude Sonnet
import type { Metadata } from "next";

import Link from "next/link";

import styles from "./agentic-web.module.css";
import { DraftBanner } from "./DraftBanner";

export const metadata: Metadata = {
  title: "The Accountable Web of Agents",
  description:
    "A vision paper: Solid, Verifiable Credential Data Integrity, PROV, ODRL, and data federations as the substrate for an accountable, machine-readable agentic web. Draft — pending Claude Fable 5 review.",
  openGraph: {
    title: "The Accountable Web of Agents",
    description:
      "A vision for an automated, data-driven future built on Solid — data-centric, verifiable, accountable agents in place of platform intermediation. Draft — pending Claude Fable 5 review.",
    type: "article",
  },
};

export default function AgenticWebPage() {
  return (
    <div className={styles.page}>
      <DraftBanner />

      <div className={styles.pageShell}>
        <header className={styles.masthead}>
          <span className={styles.eyebrow}>
            Vision paper — @jeswr Solid suite
          </span>
          <h1 className={styles.mastheadTitle}>
            The Accountable Web of Agents
          </h1>
          <p className={styles.subtitle}>
            A vision for an automated, data-driven future built on Solid
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
              Draft — pending maintainer review
            </span>
          </div>
          <p className={styles.draftNote}>
            <em>
              Draft — 2 July 2026. Prepared with AI assistance (Claude Fable 5);
              pending maintainer review. Status: vision statement of the @jeswr
              Solid suite; intended for publication as a standalone web essay,
              with a W3C Solid Community Group contribution and an arXiv
              preprint as follow-on venues (see the adoption roadmap,{" "}
              <code>ROADMAP.md</code>).
            </em>
          </p>

          <nav aria-label="Table of contents" className={styles.toc}>
            <p className={styles.tocTitle}>Contents</p>
            <ol className={styles.tocList}>
              <li>
                <a href="#sec-abstract">
                  <span className={styles.tocNum}>—</span> Abstract
                </a>
              </li>
              <li>
                <a href="#sec-1">
                  <span className={styles.tocNum}>§1</span> Two futures for the
                  agentic web
                </a>
              </li>
              <li>
                <a href="#sec-2">
                  <span className={styles.tocNum}>§2</span> The stack
                </a>
              </li>
              <li>
                <a href="#sec-3">
                  <span className={styles.tocNum}>§3</span> Agents that speak
                  data
                </a>
              </li>
              <li>
                <a href="#sec-4">
                  <span className={styles.tocNum}>§4</span> The accountability
                  chain, end to end
                </a>
              </li>
              <li>
                <a href="#sec-5">
                  <span className={styles.tocNum}>§5</span> What exists today
                </a>
              </li>
              <li>
                <a href="#sec-6">
                  <span className={styles.tocNum}>§6</span> Related work
                </a>
              </li>
              <li>
                <a href="#sec-7">
                  <span className={styles.tocNum}>§7</span> Bridging legacy
                  channels
                </a>
              </li>
              <li>
                <a href="#sec-8">
                  <span className={styles.tocNum}>§8</span> The adoption path
                </a>
              </li>
              <li>
                <a href="#sec-9">
                  <span className={styles.tocNum}>§9</span> Conclusion
                </a>
              </li>
              <li>
                <a href="#sec-references">
                  <span className={styles.tocNum}>—</span> References
                </a>
              </li>
            </ol>
          </nav>
        </header>

        {/* ================= ABSTRACT ================= */}
        <section className={styles.section} id="sec-abstract">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>—</span>
            <span className={styles.sectionRailTag}>Abstract</span>
          </div>
          <div className={`${styles.sectionBody} ${styles.prose}`}>
            <p>
              Software agents are about to conduct a large share of the world’s
              routine digital activity — scheduling, purchasing, negotiating,
              filing, coordinating. Today they are being built on the weakest
              possible substrate: scraped web pages, proprietary APIs, and
              unsigned, unattributed text passed between black boxes. Nothing in
              that substrate says <em>what a piece of data means</em>,{" "}
              <em>where it came from</em>,{" "}
              <em>whether it has been tampered with</em>, or{" "}
              <em>
                who answers for it when an agent acts on it and something goes
                wrong
              </em>
              .
            </p>

            <p>
              This paper argues for a different substrate, assembled almost
              entirely from existing W3C standards. <strong>Solid</strong> gives
              people and organisations data stores they control, with standard
              authentication and access control.{" "}
              <strong>Verifiable Credential Data Integrity</strong> makes data
              portable <em>and</em> tamper-evident: signatures travel with the
              graph, not the connection. <strong>PROV</strong> records where
              every artifact came from — which agent, which activity, acting for
              whom. <strong>ODRL</strong> expresses the policies and agreements
              under which data may be used — and, critically, makes the{" "}
              <em>owner</em> of an agent legally accountable for what that agent
              does, because the agreement the agent operates under is an
              explicit, signed, machine-readable artifact.{" "}
              <strong>Data federations</strong> — sector-scoped agreements on
              vocabularies, shapes, and membership — make independent
              applications and agents actually interoperable rather than merely
              co-located.
            </p>

            <p>
              On this substrate, agents speak{" "}
              <strong>machine-readable data first</strong>: they exchange typed,
              SHACL-validated RDF whose meaning is pinned by shared
              vocabularies, and fall back to natural-language agent-to-agent
              protocols only at the edges, to negotiate what has not yet been
              formalised. The result is an agentic web where interoperability is
              the default, verification replaces trust-by-reputation, and
              accountability is complete: every assertion an agent makes can be
              traced through a provenance chain to a signed authorization from a
              legally identifiable owner, under an explicit usage agreement.
            </p>

            <p>
              We describe the vision, the stack, and a worked accountability
              scenario; we inventory the working software that already
              demonstrates each layer — a from-scratch Solid server and
              application suite, signed-credential / policy / agent-protocol
              libraries, a federation vocabulary and registry, and a draft
              specification for access-controlled SPARQL query — and we set out
              an adoption roadmap through the standards bodies and
              data-infrastructure institutions that could make this the normal
              way software works.
            </p>
          </div>
        </section>

        {/* ================= SECTION 1 ================= */}
        <section className={styles.section} id="sec-1">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§1</span>
            <span className={styles.sectionRailTag}>Introduction</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Two futures for the agentic web</h2>
            <div className={styles.prose}>
              <p>
                The current wave of AI agents is colliding with an old problem.
                The web that humans read was never designed for machines to{" "}
                <em>act on</em>. An agent that books travel, renegotiates a
                utility contract, or assembles a medical history today does so
                by scraping pages, driving browsers, and calling proprietary
                APIs — each integration bespoke, each output unsigned, each
                action deniable.
              </p>

              <p>
                Two futures follow from this, and the difference between them is
                infrastructural, not algorithmic.
              </p>

              <div className={styles.diptych}>
                <div>
                  <span className={styles.diptychTag}>
                    Future A — intermediation
                  </span>
                  <p>
                    The friction of acting on an unstructured web is resolved by{" "}
                    <strong>intermediation</strong>. A handful of platform
                    operators wrap the world’s services in their own agent
                    frameworks; your agent works because it is <em>their</em>{" "}
                    agent, running in their cloud, under their terms, on data
                    they hold. Interoperability exists only inside each walled
                    garden.
                  </p>
                  <p>
                    Accountability is whatever the platform’s terms of service
                    say it is. This future is already being built, by default,
                    at speed.
                  </p>
                </div>
                <div>
                  <span className={styles.diptychTag}>
                    Future B — structure
                  </span>
                  <p>
                    The friction is resolved by <strong>structure</strong>: data
                    that describes itself, carries its own proofs, names its own
                    provenance, and states its own terms of use — held in stores
                    that the people and organisations it concerns actually
                    control. Agents in this future do not need a platform to
                    mediate, because the data itself is the interface.
                  </p>
                  <p>
                    This future has to be built deliberately. Almost all of its
                    components already exist as W3C Recommendations; what has
                    been missing is their <strong>integration</strong> — and
                    working software that demonstrates the integrated stack end
                    to end.
                  </p>
                </div>
              </div>

              <p>
                This paper is a statement of intent to build the second future,
                a description of the stack that makes it possible, and an honest
                inventory of how much of it already runs today.
              </p>
            </div>

            <h3 id="sec-1-1">1.1 Design principles</h3>
            <div className={styles.prose}>
              <p>Five principles organise everything that follows:</p>
              <ol className={styles.principles}>
                <li>
                  <span className={styles.principlesN}>1</span>
                  <p>
                    <strong>Data-centric, not app-centric.</strong> Applications
                    and agents are views and actors over data that outlives
                    them, stored where its subject controls it. No application
                    owns the data it touches; losing an app must never mean
                    losing the data ([SOLID]).
                  </p>
                </li>
                <li>
                  <span className={styles.principlesN}>2</span>
                  <p>
                    <strong>Machine-readable first.</strong> Agents exchange
                    typed RDF validated against shared shapes, so the meaning of
                    a message is fixed by public vocabulary, not inferred
                    per-message by a language model. Natural language is the{" "}
                    <em>fallback</em> for what has not yet been formalised — the
                    negotiation channel through which new machine-readable
                    protocols crystallise, not the default transport ([AGORA],
                    [A2A]).
                  </p>
                </li>
                <li>
                  <span className={styles.principlesN}>3</span>
                  <p>
                    <strong>Verification over trust.</strong> A claim is
                    believed because a proof verifies — a signature over a
                    canonicalised graph, checked against a key bound to an
                    identity — not because of who operates the server it came
                    from ([VC-DI], [RDFC]).
                  </p>
                </li>
                <li>
                  <span className={styles.principlesN}>4</span>
                  <p>
                    <strong>
                      Accountability is legal, not just technical.
                    </strong>{" "}
                    Every autonomous action must be traceable to a legally
                    identifiable party who answers for it. The technical chain —
                    provenance records, signed authorizations, explicit usage
                    agreements — exists to make that legal accountability{" "}
                    <em>operational</em> ([PROV-O], [ODRL-IM]).
                  </p>
                </li>
                <li>
                  <span className={styles.principlesN}>5</span>
                  <p>
                    <strong>Decentralised by construction.</strong> No single
                    codebase, vendor, or standards owner. Sector-level
                    interoperability is achieved by <em>federations</em> —
                    published vocabularies, shapes, and membership registries
                    that any party can implement independently — not by everyone
                    adopting one platform.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2 ================= */}
        <section className={styles.section} id="sec-2">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§2</span>
            <span className={styles.sectionRailTag}>The stack</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>The stack</h2>
            <div className={styles.prose}>
              <p>
                The stack has five layers. Each is an existing standard or a
                thin, published extension of one; the contribution is the
                integration.
              </p>

              <figure className={styles.stackFigure}>
                <figcaption className={styles.stackFigcaption}>
                  Figure 1 — the five layers, foundation to federation (each
                  band jumps to its section)
                </figcaption>
                <a className={styles.stackBand} data-i="0" href="#sec-2-5">
                  <span className={styles.labelGroup}>
                    <span className={styles.eyebrow2}>§2.5 · federations</span>
                    <span className={styles.bandName}>Federations</span>
                    <span className={styles.bandDesc}>
                      sector vocabularies · shapes · registries · membership
                      trust · spec-version negotiation
                    </span>
                  </span>
                  <span className={styles.spectag}>fedapp / fedreg</span>
                </a>
                <a className={styles.stackBand} data-i="1" href="#sec-2-4">
                  <span className={styles.labelGroup}>
                    <span className={styles.eyebrow2}>
                      §2.4 · the accountability layer
                    </span>
                    <span className={styles.bandName}>ODRL</span>
                    <span className={styles.bandDesc}>
                      policies · agreements · duties
                    </span>
                  </span>
                  <span className={styles.spectag}>ODRL-IM</span>
                </a>
                <a className={styles.stackBand} data-i="2" href="#sec-2-3">
                  <span className={styles.labelGroup}>
                    <span className={styles.eyebrow2}>
                      §2.3 · the provenance layer
                    </span>
                    <span className={styles.bandName}>PROV</span>
                    <span className={styles.bandDesc}>
                      who made what, how, acting for whom
                    </span>
                  </span>
                  <span className={styles.spectag}>PROV-O</span>
                </a>
                <a className={styles.stackBand} data-i="3" href="#sec-2-2">
                  <span className={styles.labelGroup}>
                    <span className={styles.eyebrow2}>
                      §2.2 · the integrity layer
                    </span>
                    <span className={styles.bandName}>Data Integrity</span>
                    <span className={styles.bandDesc}>
                      VC 2.0 + Data Integrity proofs over canonicalised RDF
                    </span>
                  </span>
                  <span className={styles.spectag}>VC-DI / RDFC</span>
                </a>
                <a className={styles.stackBand} data-i="4" href="#sec-2-1">
                  <span className={styles.labelGroup}>
                    <span className={styles.eyebrow2}>
                      §2.1 · storage and control layer
                    </span>
                    <span className={styles.bandName}>Solid</span>
                    <span className={styles.bandDesc}>
                      WebID identity · pods · WAC/ACP access control ·
                      Solid-OIDC + DPoP
                    </span>
                  </span>
                  <span className={styles.spectag}>SOLID / WAC / DPoP</span>
                </a>
              </figure>
            </div>

            <h3 id="sec-2-1">2.1 Solid: storage you control</h3>
            <div className={styles.prose}>
              <p>
                [SOLID] provides the base: every person, organisation, and agent
                has a <strong>WebID</strong> — an HTTP URI that dereferences to
                a profile document — and one or more <strong>pods</strong>,
                personal data stores addressed and manipulated over plain HTTP
                (the Linked Data Platform reading of REST). Authentication is
                [SOLID-OIDC] with [DPOP] proof-of-possession tokens;
                authorization is declarative access control ([WAC] / [ACP])
                evaluated by the storage server, not by each application. Data
                is RDF (with non-RDF resources alongside), so everything above
                this layer speaks in graphs.
              </p>

              <p>
                Two properties matter for the agentic web. First,{" "}
                <strong>the pod is the integration point</strong>: two
                applications — or two agents — interoperate by reading and
                writing the <em>same data</em> under the{" "}
                <em>same access-control regime</em>, rather than by pairwise API
                integration. Second, <strong>identity is uniform</strong>: a
                human’s WebID, an organisation’s WebID, and an agent’s WebID are
                the same kind of thing, which is what lets authorization and
                accountability span all three.
              </p>
            </div>

            <h3 id="sec-2-2">
              2.2 Data Integrity: proofs that travel with the data
            </h3>
            <div className={styles.prose}>
              <p>
                Transport security is not data security. TLS tells you which
                server you spoke to; it says nothing once the data is copied,
                cached, syndicated, or handed from one agent to another — which
                is precisely what agents do all day.
              </p>

              <p>
                The [VC-DM] and [VC-DI] (W3C Recommendations, 2025) solve this
                by embedding the proof in the data: the graph is canonicalised
                ([RDFC]) and signed ([DI-EDDSA]), so any holder can verify
                integrity and authorship offline, no matter how many hops the
                data has travelled. Because the signature is over the{" "}
                <em>canonical graph</em> rather than a byte stream, the data
                remains queryable, mergeable Linked Data — signed data is still
                data.
              </p>

              <p>In this stack, Data Integrity does double duty:</p>
              <ul>
                <li>
                  <strong>Claims</strong> become verifiable credentials: “this
                  WebID holds this qualification”, “this app is a member of this
                  federation”, “this agent is authorized by this owner”.
                </li>
                <li>
                  <strong>
                    Selective disclosure and zero-knowledge proofs
                  </strong>{" "}
                  are an upgrade path, not a rewrite: the proof suite is
                  pluggable, so BBS-style or ZK-over-SPARQL proofs (an active
                  research line in the adjacent SPARQ project) slot into the
                  same verification pipeline.
                </li>
              </ul>
            </div>

            <h3 id="sec-2-3">2.3 PROV: where everything came from</h3>
            <div className={styles.prose}>
              <p>
                When agents produce most of the data, “who wrote this?” stops
                being a curiosity and becomes the load-bearing question.
                [PROV-O] (W3C Recommendation) gives the standard answer: every
                artifact is an <em>entity</em>, generated by an{" "}
                <em>activity</em>, associated with an <em>agent</em>, who may be{" "}
                <em>acting on behalf of</em> another agent. That last relation —{" "}
                <code>prov:actedOnBehalfOf</code> — is the hinge of the whole
                accountability story: it is how a document written by a software
                agent is bound, in the data itself, to the human or organisation
                the agent represents.
              </p>

              <p>
                Concretely, in this stack every agent-generated resource carries
                (or links to) a PROV record naming the software agent (by
                WebID), the activity, the time, and the responsible owner. AI
                attribution is not a watermark or a policy promise; it is a
                queryable graph.
              </p>
            </div>

            <h3 id="sec-2-4">
              2.4 ODRL: policy, agreement, and legal accountability
            </h3>
            <div className={styles.prose}>
              <p>
                [ODRL-IM] (W3C Recommendation) expresses{" "}
                <strong>policies</strong> — permissions, prohibitions, and
                duties over assets, with constraints (purpose, time, recipient…)
                — and, crucially, <strong>agreements</strong>: policies with an
                identified <em>assigner</em> and <em>assignee</em>. An ODRL
                agreement is a machine-readable contract.
              </p>

              <p>
                This supplies the layer the agentic web is most conspicuously
                missing. Today, when an agent acts, the terms it acted under are
                implicit (a platform ToS, a prompt, nothing at all) and the
                responsible party is deniable. In this stack:
              </p>
              <ul>
                <li>
                  Data in a pod carries ODRL policies stating the terms under
                  which it may be read, used, and shared onward.
                </li>
                <li>
                  An agent operates under an explicit{" "}
                  <strong>ODRL agreement</strong> between its owner (assigner of
                  the mandate) and the agent (assignee), stating what the agent
                  may do, must do, and must not do.
                </li>
                <li>
                  The agreement is <strong>signed</strong> (Data Integrity) and{" "}
                  <strong>referenced from the provenance chain</strong> (PROV),
                  so any downstream party can mechanically answer:{" "}
                  <em>
                    under what terms, granted by whom, was this action
                    performed?
                  </em>
                </li>
              </ul>

              <p>
                The legal position this operationalises is deliberately simple:{" "}
                <strong>the agent’s owner is accountable</strong>. An agent is
                not a liability shield; it is a mandated actor, and the mandate
                is a public, verifiable artifact. Section 4 walks the full
                chain.
              </p>
            </div>

            <h3 id="sec-2-5">
              2.5 Data federations: interoperability with governance
            </h3>
            <div className={styles.prose}>
              <p>
                Standards make interoperability <em>possible</em>; they do not
                make it <em>actual</em>. Two task-management apps can both “use
                RDF” and still not share a task. What closes the gap is
                sector-level agreement on vocabulary and shape — and somewhere
                to record who participates and what they conform to.
              </p>

              <p>
                A <strong>data federation</strong>, in this stack, is exactly
                that agreement, published as Linked Data:
              </p>
              <ul>
                <li>
                  a <strong>vocabulary and shapes hub</strong> — the sector’s
                  terms and SHACL shapes, minted minimally and reusing
                  established vocabularies (Dublin Core, schema.org,
                  ActivityStreams 2.0 [AS2], the SolidOS workflow ontology,
                  PROV);
                </li>
                <li>
                  <strong>self-description</strong> — an application publishes,
                  in its Client Identifier Document, which sectors it operates
                  in, which shapes it reads and writes, and which access modes
                  it requests;
                </li>
                <li>
                  a <strong>registry</strong> — memberships as registry-asserted
                  records with lifecycle status, because a self-asserted “I am a
                  member” must never be treated as a membership claim;
                </li>
                <li>
                  a <strong>trust layer</strong> — membership assertions backed
                  by Verifiable Credentials, with delegation chains to a trust
                  anchor, so “the registry says so” itself becomes verifiable;
                </li>
                <li>
                  <strong>spec-version negotiation</strong> — storage advertises
                  which specification versions it accepts, so schema migration
                  happens on independent clocks (apps, pods, and servers upgrade
                  separately, with dual-read windows), which is what lets a
                  federation evolve without a flag day.
                </li>
              </ul>

              <p>
                This is the same problem the European <strong>dataspace</strong>{" "}
                movement (IDSA [IDS-RAM], [Gaia-X], the Data Spaces Support
                Centre) is solving for industrial data sharing — participant
                registries, usage policies (notably ODRL-based in IDS usage
                control), federated catalogues — approached from the
                personal-data end, on web-native standards. Section 6 returns to
                the relationship.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3 ================= */}
        <section className={styles.section} id="sec-3">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§3</span>
            <span className={styles.sectionRailTag}>
              Agents that speak data
            </span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Agents that speak data</h2>
            <div className={styles.prose}>
              <p>
                With the stack in place, agent communication inverts today’s
                default. Rather than natural language everywhere with structure
                as an optimisation, the default is{" "}
                <strong>
                  structured data with natural language as the negotiation
                  channel
                </strong>
                .
              </p>
            </div>

            <h3 id="sec-3-1">3.1 Discovery: the pod points to the agent</h3>
            <div className={styles.prose}>
              <p>
                A WebID profile advertises the agent that represents its owner.
                The descriptor is dual-published for reach: an [A2A] Agent Card
                (plain JSON, for the industry toolchain) and an RDF agent
                description (JSON-LD/Turtle, aligned with the [ANP]’s
                description layer, for the Linked Data toolchain). An agent is
                findable and self-describing before any conversation starts.
              </p>
            </div>
            <p className={styles.worklib}>
              <b>Working library:</b> <code>@jeswr/solid-agent-card</code>
            </p>

            <h3 id="sec-3-2">3.2 The NL→RDF upgrade</h3>
            <div className={styles.prose}>
              <p>
                When two agents first meet over a task, they may need natural
                language — that is what makes open-ended agent networks
                reachable at all. But natural language between production agents
                is a cost and a risk: every message re-incurs LLM inference, and
                every message is an injection surface with no fixed semantics.
              </p>

              <p>
                The [AGORA] protocol showed the resolution: agents negotiate in
                natural language <em>once</em>, then crystallise the negotiated
                routine as a <strong>hash-pinned protocol document</strong> both
                sides reference thereafter. This stack makes that
                crystallisation RDF-native: the protocol document’s body is a{" "}
                <strong>SHACL shape</strong>, content-addressed and pod-hosted,
                so post-negotiation exchange is SHACL-validated RDF with{" "}
                <strong>no further LLM inference on the hot path</strong> — and
                a no-silent-downgrade rule for security-bearing steps, so an
                agent cannot be talked back down into ambiguous prose where it
                matters.
              </p>
            </div>
            <p className={styles.worklib}>
              <b>Working library:</b> <code>@jeswr/solid-a2a</code> —
              translator, SHACL protocol documents, and the upgrade-handshake
              codec.
            </p>

            <h3 id="sec-3-3">3.3 A2A and MCP: the pragmatic edges</h3>
            <div className={styles.prose}>
              <p>
                Two pragmatic protocols complete the picture, both used{" "}
                <em>at the edges</em> rather than as the core:
              </p>
              <ul>
                <li>
                  <strong>[A2A]</strong> (Google, 2025; now a Linux Foundation
                  project) is the industry’s agent-to-agent envelope. Here it is
                  the <em>fallback and first-contact</em> channel — maximum
                  reach, used when no shared shape yet exists, and the channel
                  over which the NL→RDF upgrade handshake itself runs.
                </li>
                <li>
                  <strong>[MCP]</strong> (Anthropic, 2024) is the tool seam
                  between an LLM host and resources. A pod is exposed to any MCP
                  client as resources and scope-guarded tools, which is how
                  today’s assistants get <em>user-controlled</em> memory and
                  data instead of platform-siloed copies.
                </li>
              </ul>
            </div>
            <p className={styles.worklib}>
              <b>Working libraries:</b> <code>@jeswr/solid-mcp</code>,{" "}
              <code>@jeswr/solid-memory</code>
            </p>

            <h3 id="sec-3-4">3.4 Querying under authorization</h3>
            <div className={styles.prose}>
              <p>
                Agents ask questions, and the questions must respect access
                control. A draft specification —{" "}
                <strong>Access-Controlled SPARQL Query over a Solid Pod</strong>{" "}
                — defines a read-only SPARQL endpoint that answers over exactly
                the subset of a pod the authenticated agent is authorized to
                read: a new read <em>interface</em> over Solid’s existing
                authorization model, not a new authorization model.{" "}
                <em>
                  (Editor’s Draft written, Solid Community Group track:{" "}
                  <code>jeswr/solid-sparql-query</code>; server-side contract
                  tracked for the experimental Rust server.)
                </em>
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 4 ================= */}
        <section className={styles.section} id="sec-4">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§4</span>
            <span className={styles.sectionRailTag}>
              Accountability, end to end
            </span>
          </div>
          <div className={styles.sectionBody}>
            <h2>The accountability chain, end to end</h2>
            <div className={styles.prose}>
              <p>
                The claim “complete legal accountability” reduces to a
                mechanical procedure. Consider a concrete scenario:
              </p>

              <p className={styles.scenarioQuote}>
                Alice’s agent negotiates a data-sharing arrangement with a
                research institute’s agent: selected records from Alice’s pod,
                for a stated purpose, for one year.
              </p>
            </div>

            <div className={styles.thread}>
              <div className={styles.threadStage}>
                <span className={styles.stageLabel}>Setup</span>
                <p>
                  Alice holds a WebID; her agent holds its own WebID; Alice’s
                  profile links the two. Alice issues her agent an{" "}
                  <strong>authorization credential</strong> — a Verifiable
                  Credential, signed with a Data Integrity proof, stating{" "}
                  <em>
                    “WebID A authorizes agent Y to act in scope Z under ODRL
                    policy P”
                  </em>
                  . Policy P is the mandate: what the agent may negotiate, up to
                  what limits, with what duties.
                </p>
              </div>
              <p className={styles.worklib} style={{ marginLeft: "1.75rem" }}>
                <b>Working artifacts:</b> <code>@jeswr/solid-vc</code> —
                including exactly this <code>AgentAuthorizationCredential</code>{" "}
                pattern — and <code>@jeswr/solid-odrl</code>.
              </p>

              <div className={styles.threadStage}>
                <span className={styles.stageLabel}>Negotiation</span>
                <p>
                  The agents discover each other (§3.1), establish or reuse a
                  SHACL protocol document (§3.2), and exchange typed offers. The
                  institute’s agent carries its own authorization credential and
                  its federation membership credential (§2.5). Each side{" "}
                  <em>verifies</em> — signature, validity window, issuer
                  binding, delegation chain — rather than assuming.
                </p>
              </div>

              <div className={styles.threadStage}>
                <span className={styles.stageLabel}>Agreement</span>
                <p>
                  The outcome is an <strong>ODRL Agreement</strong>: assigner =
                  Alice (through her agent, within mandate P), assignee = the
                  institute; permissions constrained by purpose and period;
                  duties (e.g. deletion at expiry) explicit. The agreement is
                  signed by both sides’ keys and stored in both pods.
                </p>
              </div>

              <div className={styles.threadStage}>
                <span className={styles.stageLabel}>Action</span>
                <p>
                  The institute’s access is granted by access-control rules that
                  reference the agreement. Every resource the institute’s
                  systems derive from Alice’s data carries PROV: derived from
                  which entities, by which activity, by which software agent,{" "}
                  <code>prov:actedOnBehalfOf</code> the institute, under (a link
                  to) the agreement.
                </p>
              </div>

              <div className={styles.threadStage}>
                <span className={styles.stageLabel}>Dispute</span>
                <p>
                  A year later, Alice finds her data used outside the stated
                  purpose. Accountability is now a <em>walk</em>, not an
                  investigation: the offending artifact’s PROV names the
                  activity and the acting agent; the agent’s authorization
                  credential names its owner; the agreement — signed,
                  timestamped, tamper-evident — names the terms breached. Every
                  link in that chain is a standard, independently verifiable
                  artifact. The owner answers, because the mandate structure
                  makes “the AI did it” a non-sequitur: the AI did it{" "}
                  <em>on the owner’s signed authority</em>.
                </p>
              </div>
            </div>

            <div className={styles.honestyBox}>
              <span className={styles.honestyTitle}>
                Three honest caveats bound the claim
              </span>
              <div className={styles.hItem}>
                <p>
                  <strong>Enforcement is legal, not cryptographic</strong> — the
                  chain proves what was agreed and who did what; courts and
                  regulators do the rest (this is a feature: the alternative,
                  purely technical enforcement, is DRM, which fails and
                  centralises).
                </p>
              </div>
              <div className={styles.hItem}>
                <p>
                  <strong>Policy semantics must be unambiguous</strong> — which
                  is why the formal-semantics work in the ODRL community, and an
                  agent-delegation ODRL profile, sit on the roadmap (§8) rather
                  than being assumed.
                </p>
              </div>
              <div className={styles.hItem}>
                <p>
                  <strong>Server-side policy enforcement is staged</strong> —
                  today’s libraries evaluate ODRL client-side; enforcing it in
                  the storage server’s authorizer, beside WAC, is deliberately a
                  later, separately-reviewed step.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 5 ================= */}
        <section className={styles.section} id="sec-5">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§5</span>
            <span className={styles.sectionRailTag}>What exists today</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>What exists today</h2>
            <div className={styles.prose}>
              <p>
                A vision paper earns its claims with running code. The rule for
                this section: every “works today” names its artifact, and
                maturity is stated plainly.
              </p>
            </div>

            <h3 id="sec-5-1">5.1 Live services</h3>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>URL</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Solid server (from-scratch TypeScript: LDP, Solid-OIDC +
                      DPoP, WAC, notifications, S3-backed storage)
                    </td>
                    <td>
                      <code>solid-test.jeswr.org</code>
                    </td>
                    <td>
                      <span className={styles.tagLive}>live</span>;{" "}
                      <span className={styles.tagDev}>
                        under active development
                      </span>
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
                  <tr>
                    <td>
                      Pod Manager (files, tasks, contacts, sharing, type
                      indexes…)
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
                      App catalogue (Linked Data catalogue: DCAT + schema.org,
                      content-negotiated)
                    </td>
                    <td>
                      <code>apps.solid-test.jeswr.org</code>
                    </td>
                    <td>
                      <span className={styles.tagLive}>live</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Issue tracker (pod-backed, shared task model)</td>
                    <td>
                      <code>issues.solid-test.jeswr.org</code>
                    </td>
                    <td>
                      <span className={styles.tagLive}>live</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      A personal WebID served from a personal site (RDFa/Turtle
                      content negotiation)
                    </td>
                    <td>
                      <code>jeswr.org</code>
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
                The server, apps, and identity provider are one{" "}
                <strong>deployed instance of the whole base layer</strong>:
                WebID login via Solid-OIDC/DPoP, pods under WAC, multiple
                independent applications reading and writing the same data.
                Interoperability is demonstrated concretely: a task created in
                the issue tracker appears in the Pod Manager because both
                implement the shared task model (
                <code>@jeswr/solid-task-model</code>) — the same mechanism a
                federation generalises.
              </p>
            </div>

            <h3 id="sec-5-2">
              5.2 Libraries (experimental, open source, installable today)
            </h3>
            <div className={styles.prose}>
              <p>
                All are public on GitHub under <code>github.com/jeswr/…</code>,
                TypeScript, AI-agent-authored under review discipline, and
                explicitly{" "}
                <strong>experimental — not production-hardened</strong>:
              </p>
            </div>
            <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
              <table>
                <thead>
                  <tr>
                    <th>Layer</th>
                    <th>Package</th>
                    <th>What it does</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Integrity</td>
                    <td>
                      <code>solid-vc</code>
                    </td>
                    <td>
                      VC 2.0 build/sign/verify with Data Integrity (
                      <code>eddsa-rdfc-2022</code>, <code>ecdsa-rdfc-2019</code>{" "}
                      over RDFC-1.0), fail-closed verification gates, pluggable
                      proof-suite seam; the{" "}
                      <code>AgentAuthorizationCredential</code> pattern
                    </td>
                  </tr>
                  <tr>
                    <td>Accountability</td>
                    <td>
                      <code>solid-odrl</code>
                    </td>
                    <td>
                      ODRL 2.2 policy expression + deterministic client-side
                      evaluation (permit / deny / duty)
                    </td>
                  </tr>
                  <tr>
                    <td>Agents</td>
                    <td>
                      <code>solid-agent-card</code>
                    </td>
                    <td>
                      WebID/pod → A2A Agent Card + ANP-aligned RDF agent
                      description
                    </td>
                  </tr>
                  <tr>
                    <td>Agents</td>
                    <td>
                      <code>solid-a2a</code>
                    </td>
                    <td>
                      The NL→RDF upgrade: SHACL-bodied, hash-pinned protocol
                      documents + handshake codec
                    </td>
                  </tr>
                  <tr>
                    <td>Agents</td>
                    <td>
                      <code>solid-mcp</code>, <code>solid-memory</code>
                    </td>
                    <td>
                      Pod ↔ MCP clients; portable, user-owned agent memory (
                      <code>mem:MemoryItem</code>)
                    </td>
                  </tr>
                  <tr>
                    <td>Federation</td>
                    <td>
                      <code>solid-federation-vocab</code>
                    </td>
                    <td>
                      The <code>fedapp:</code> / <code>fedreg:</code>{" "}
                      vocabularies (w3id.org-homed)
                    </td>
                  </tr>
                  <tr>
                    <td>Federation</td>
                    <td>
                      <code>federation-client</code>,{" "}
                      <code>federation-registry</code>,{" "}
                      <code>federation-trust</code>
                    </td>
                    <td>
                      App self-description; registry-asserted membership +
                      storage spec-versions; VC-signed membership with
                      delegation chains
                    </td>
                  </tr>
                  <tr>
                    <td>Interop models</td>
                    <td>
                      <code>solid-task-model</code>,{" "}
                      <code>solid-chat-interop</code>,{" "}
                      <code>solid-bookmark</code>, <code>solid-drawing</code>,{" "}
                      <code>solid-memory</code>
                    </td>
                    <td>
                      Shared sector data models (mint minimally, reuse Dublin
                      Core / schema.org / AS2 / PROV)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 id="sec-5-3">5.3 Specifications and experiments</h3>
            <div className={styles.prose}>
              <ul>
                <li>
                  <strong>
                    Access-Controlled SPARQL Query over a Solid Pod
                  </strong>{" "}
                  — ReSpec Editor’s Draft written, Solid CG track (
                  <code>jeswr/solid-sparql-query</code>); all design decisions
                  resolved and recorded.
                </li>
                <li>
                  <code>solid-server-rs</code> — an explicitly{" "}
                  <strong>experimental</strong> Rust Solid server (not a
                  replacement for the TypeScript server above) used as the
                  reference implementation target for the access-controlled
                  query endpoint.
                </li>
                <li>
                  <strong>Solid ↔ mainstream OSS integrations</strong> — forks
                  and drivers demonstrating that pod-backed storage retrofits
                  onto existing ecosystems: bookmarks (linkding), whiteboards
                  (Excalidraw), social (Elk/Mastodon), RSS (Miniflux), finance
                  (Actual), automation (n8n), CRDT collaboration (Yjs), agent
                  frameworks (MCP, OpenClaw memory). Each demonstrates the same
                  pattern: the app keeps its UX; the <em>data</em> moves to a
                  store the user controls.
                </li>
              </ul>
            </div>

            <h3 id="sec-5-4">5.4 The flagship demonstration: unite</h3>
            <div className={styles.prose}>
              <p>
                The vision’s fullest demonstration is under design as a sibling
                deliverable: <strong>unite</strong>, a decentralised
                participatory-democracy platform in which people co-design the
                future they want — beginning, reflexively, with co-designing the
                Solid applications they want (which this suite’s generative
                tooling then implements). unite is constitutionally
                decentralised — no single codebase, no single standards owner —
                and is built directly on the federation model described in §2.5.
                It is deliberately <em>not</em> specified here; it is tracked as
                its own design effort (
                <code>jeswr/full-solid-ecosystem#15</code>).
              </p>
            </div>

            <h3 id="sec-5-5">5.5 What does not exist yet</h3>
            <div className={styles.honestyBox}>
              <span className={styles.honestyTitle}>
                Honesty about the gaps is part of the method
              </span>
              <p>
                Server-side ODRL enforcement beside WAC (designed, deliberately
                staged); ZK selective disclosure through the proof-suite seam
                (active research, adjacent SPARQ project); live multi-party
                federation registries with independent operators (the software
                exists; the <em>institutions</em> do not yet); the agent runtime
                carried over <strong>live transports</strong> (a Phase-0
                reference runtime now executes the full §4 scenario as a
                deterministic, golden-master-tested script — real cryptography,
                doubled I/O — but no long-running agent service listens anywhere
                yet); and the <strong>live wiring of discovery itself</strong> —
                as of this draft the author’s own WebID does not yet carry the
                agent pointer, and no agent descriptor is publicly hosted on the
                pod: the mechanism and the exact triples exist (
                <code>@jeswr/solid-agent-card</code>), the deployment is a small
                tracked step. And standardisation of everything minted here (the
                point of the roadmap, <code>ROADMAP.md</code>).
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 6 ================= */}
        <section className={styles.section} id="sec-6">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§6</span>
            <span className={styles.sectionRailTag}>Related work</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Related work</h2>
            <div className={`${styles.relatedList} ${styles.prose}`}>
              <p>
                <strong>Dataspaces.</strong> The European dataspace programme —
                IDSA’s reference architecture [IDS-RAM], the [Gaia-X] trust
                framework, the Data Spaces Support Centre blueprint, and the
                legal scaffolding of the Data Governance Act [DGA] and Data Act
                [DATA-ACT] — shares this stack’s convictions: machine-readable
                usage policies (IDS usage control is ODRL-based), participant
                registries, federated catalogues, sovereignty over data. The
                difference is vantage: dataspaces begin from industrial B2B
                exchange with heavyweight connectors; this stack begins from the
                individual’s pod on plain web standards and scales <em>up</em>{" "}
                to sectors via federations. The convergence point — ODRL
                agreements between registry-verified participants — is an
                alignment opportunity, not a rivalry, and the roadmap treats it
                as such.
              </p>

              <p>
                <strong>Self-sovereign identity.</strong> The VC/DID community
                ([DID], DIF, the eIDAS 2.0 European Digital Identity Wallet
                [EIDAS2]) built the credential layer this stack consumes. What
                Solid adds is the <em>storage and access-control substrate</em>{" "}
                — credentials live somewhere, are queried under authorization,
                and sit beside the rest of one’s data — and what the agentic
                layer adds is credentials <em>for mandates</em>, not just
                attributes.
              </p>

              <p>
                <strong>Agent protocol stacks.</strong> A2A [A2A], MCP [MCP],
                ANP [ANP], and AGORA [AGORA] each solve a slice — envelope, tool
                seam, description layer, protocol crystallisation. This stack’s
                position is that none of them answers the <em>data</em>{" "}
                questions (integrity, provenance, terms, interop), and that the
                answers already exist as W3C Recommendations; the agent
                protocols become far more valuable when what travels over them
                is verifiable, attributed, policy-bound Linked Data.
              </p>

              <p>
                <strong>The fediverse.</strong> ActivityPub demonstrated
                protocol-federated social networking at scale, and [AS2] is
                reused here as a sector vocabulary. The structural difference:
                fediverse data lives on instances (leaving means losing
                context); here it lives in pods (instances are views), and the
                accountability layers have no fediverse equivalent.
              </p>

              <p>
                <strong>Government Solid deployments.</strong> Flanders’ public
                data-utility <strong>Athumi</strong> operates Solid-based
                personal data vaults in production public-sector use — evidence
                that the base layer is institutionally deployable, and a natural
                early interlocutor for the accountability layers (§8).
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 7 ================= */}
        <section className={styles.section} id="sec-7">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§7</span>
            <span className={styles.sectionRailTag}>
              Bridging legacy channels
            </span>
          </div>
          <div className={styles.sectionBody}>
            <h2>The path from today: bridging legacy channels</h2>
            <div className={styles.prose}>
              <p>
                The stack in §2–§4 describes the destination — agents that speak
                signed, attributed, policy-bound data. But no one begins there.
                Today the world coordinates over{" "}
                <strong>
                  email, Slack, WhatsApp, Telegram, SMS, and service/platform
                  web pages
                </strong>{" "}
                — unstructured natural language between parties who have never
                heard of a WebID. A vision that requires everyone to onboard{" "}
                <em>before</em> they can be reached is a vision that is never
                reached. The path from today is a <strong>ratchet</strong>, not
                a flag day — meet legacy where it is, then pull it up, one
                opt-in rung at a time, always with a working channel underneath.
              </p>

              <p>
                The mechanism has four rungs, each reusing packages that already
                exist (§5). The full design record is{" "}
                <code>LEGACY-INTEROP.md</code>; in brief:
              </p>

              <ol>
                <li>
                  <strong>Represent legacy sources as agentic entities.</strong>{" "}
                  An inbound email’s sender becomes a <code>schema:Person</code>
                  /agent — with a WebID if one can be{" "}
                  <em>discovered and verified</em>, never assumed from an
                  unauthenticated address — and the message becomes a
                  provenance-carrying event whose raw bytes are stored
                  owner-private as the audit anchor. Slack, WhatsApp, Telegram
                  and the rest map to the same Person/event shape (and already
                  reach a pod today as Matrix events through the working{" "}
                  <code>@jeswr/matrix-chat-to-pod</code> bridge).
                </li>

                <li>
                  <strong>Interpret with reliability, not laundering.</strong>{" "}
                  The message body becomes structured RDF via the existing{" "}
                  <code>@jeswr/solid-a2a</code> NL→RDF translator and its
                  injectable-LLM seam — but an LLM reading is an{" "}
                  <em>opinion</em>, not a fact. Every interpreted datum is
                  emitted as a qualified PROV derivation carrying{" "}
                  <code>prov:wasDerivedFrom</code> the raw message,{" "}
                  <code>prov:wasAssociatedWith</code> the interpreting agent
                  (under a signed ODRL mandate),{" "}
                  <strong>and an explicit reliability score</strong> whose own
                  calibration provenance is recorded (self-reported vs.
                  calibrated vs. verified). Downstream consumers gate on it:
                  threshold for reversible convenience, human-confirm for the
                  ambiguous middle, and{" "}
                  <strong>
                    always-human-confirm for the irreversible or
                    security-bearing tail, at any confidence
                  </strong>{" "}
                  — the reliability-model expression of the stack’s
                  no-silent-downgrade rule. A model that is confidently wrong
                  about a payee must not be able to pay them.
                </li>

                <li>
                  <strong>Reply with structured, signed metadata.</strong> When
                  the system answers over the legacy channel, it embeds a
                  machine-readable version alongside the human prose — e.g.
                  offered meeting times as <code>schema:Event</code>. The
                  carrier is <strong>inline JSON-LD in the email body</strong>{" "}
                  (Gmail’s own supported markup path, so it survives
                  forwarding), and it is signed as a{" "}
                  <code>@jeswr/solid-vc</code> Verifiable Credential{" "}
                  <strong>over the canonicalised graph</strong> (§2.2) — so the
                  proof holds even if a mail client re-flows the HTML, because
                  RDFC-1.0 signs the graph, not the bytes. A{" "}
                  <code>multipart/alternative</code> RDF part and a header
                  pointer to the authoritative pod-hosted copy give agent-aware
                  clients full fidelity; a human just reads the text. A
                  recipient agent can verify that{" "}
                  <em>this identifiable agent</em> made this offer.
                </li>

                <li>
                  <strong>Onboard, then negotiate the channel up.</strong> The
                  reply links the recipient to a passkey-first onboarding that
                  stands up their own agent (an agent card at their WebID) and
                  pod — which already understands the structured data they were
                  sent, and closes the deferred identity-verification loop. The
                  two agents then <strong>negotiate</strong>: they discover each
                  other’s capabilities (<code>@jeswr/solid-agent-card</code>,
                  over the A2A agent-card <code>capabilities.extensions</code>{" "}
                  array), rank a shared preference order (RDF-native exchange ≻
                  the dpop-sk fast path ≻ A2A-JSON ≻ email), and run the{" "}
                  <code>@jeswr/solid-a2a</code> upgrade handshake — which fails
                  closed on a security-bearing step and falls back cleanly to
                  the highest agreed rung, worst case the email channel that
                  already worked. Every rung is capability-discovered, never
                  assumed.
                </li>
              </ol>

              <p>
                What this earns: a legacy contact is reachable{" "}
                <em>immediately</em> (rung 1–3 need nothing from them), gains
                verifiable structured replies the moment they want them, and is
                pulled onto the full accountable stack at their own pace —
                without a flag day, and without ever losing the channel
                underneath. The precedent is real:{" "}
                <code>@jeswr/matrix-chat-to-pod</code>,{" "}
                <code>solid-granary</code>, and <code>solid-dav-bridge</code>{" "}
                are working inbound legacy→pod bridges today, and the proposed
                package has since shipped:{" "}
                <a
                  className={styles.refLink}
                  href="https://github.com/jeswr/agentic-legacy-bridge"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <code>@jeswr/agentic-legacy-bridge</code>
                </a>{" "}
                now implements the reliability model, the signed-reply carrier
                assembly, the negotiation codec, and an inbound webhook service,
                composing the existing hardened libraries rather than rebuilding
                them (status as of 2026-07-05). What remains designed-not-built
                is the <em>running deployment</em>: live channel pulls and an
                always-on agent service (the same “no long-running agent service
                listens anywhere yet” caveat as §5.5) — the concrete design for
                that deployment, as the maintainer’s own personal agent, is{" "}
                <code>NOW-PERSONAL-AGENT.md</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 8 ================= */}
        <section className={styles.section} id="sec-8">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§8</span>
            <span className={styles.sectionRailTag}>Adoption path</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>The adoption path</h2>
            <div className={styles.prose}>
              <p>
                Standardisation is the linchpin: this vision works only if the
                stack is <em>boringly standard</em> — implementable by anyone,
                owned by no one. The full sequenced roadmap, with named bodies
                and concrete first asks, is <code>ROADMAP.md</code>; in brief:
              </p>
            </div>
            <div className={styles.roadmap}>
              <div>
                <span className={styles.roadmapStageTag}>Now</span>
                <p>
                  Publish this vision and its live demonstrations; contribute
                  the Access-Controlled SPARQL draft to the W3C Solid Community
                  Group; open the RDF-native protocol-document conversation in
                  the Linux Foundation A2A project; present the
                  agent-authorization credential pattern to the W3C Credentials
                  Community Group.
                </p>
              </div>
              <div>
                <span className={styles.roadmapStageTag}>Next</span>
                <p>
                  An{" "}
                  <strong>
                    ODRL Profile for Agent Delegation and Accountability
                  </strong>{" "}
                  in the ODRL Community Group; provenance/integrity requirements
                  into the W3C Linked Web Storage Working Group; a mapping
                  document aligning Solid federations with dataspace building
                  blocks (IDSA/DSSC); engagement with data institutions (ODI)
                  and existing public-sector Solid operators (Athumi).
                </p>
              </div>
              <div>
                <span className={styles.roadmapStageTag}>Later</span>
                <p>
                  TR-track specifications for the pieces that prove out;
                  independent federation operators; public-sector pilots where
                  accountable agents act on citizen data under explicit
                  mandates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 9 ================= */}
        <section className={styles.section} id="sec-9">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§9</span>
            <span className={styles.sectionRailTag}>Conclusion</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Conclusion</h2>
            <div className={styles.prose}>
              <p>
                The agentic web will be built either on platforms or on data.
                The platform path is the default — frictionless, fast, and
                centralising; it will leave agency, interoperability, and
                accountability as properties <em>of the platforms</em>, on loan
                to everyone else. The data path requires assembling standards
                that already exist — Solid for control, Data Integrity for
                truth-carrying data, PROV for origin, ODRL for terms and
                accountability, federations for actual interoperability — into a
                substrate agents can act on directly.
              </p>

              <p>
                This paper has argued that the second path is not merely
                preferable but <em>available</em>: the stack is running, in
                miniature but end to end, today — a live server and application
                suite, the credential and policy and protocol libraries, the
                federation machinery, a draft specification. What remains is the
                deliberately unglamorous work of standardisation and
                institution-building that turns a demonstration into an
                ecosystem.
              </p>

              <p>
                The future in which your agent acts for you — under your terms,
                on your data, answerable to you, verifiable by everyone — is a
                future someone has to build on purpose. This is the blueprint we
                are building to.
              </p>
            </div>
          </div>
        </section>

        {/* ================= REFERENCES ================= */}
        <section className={styles.section} id="sec-references">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>—</span>
            <span className={styles.sectionRailTag}>References</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>References</h2>
            <div className={styles.refList}>
              <div className={styles.refItem} id="ref-solid">
                <span className={styles.refTag}>[SOLID]</span>
                <span className={styles.refBody}>
                  S. Capadisli, T. Berners-Lee, R. Verborgh, K. Kjernsmo (eds.),{" "}
                  <span className={styles.refTitle}>Solid Protocol</span>,
                  Version 0.11.0, W3C Solid Community Group Draft, 2024.{" "}
                  <a
                    href="https://solidproject.org/TR/protocol"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    solidproject.org/TR/protocol
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-wac">
                <span className={styles.refTag}>[WAC]</span>
                <span className={styles.refBody}>
                  S. Capadisli,{" "}
                  <span className={styles.refTitle}>Web Access Control</span>,
                  W3C Solid Community Group, 2022.{" "}
                  <a
                    href="https://solidproject.org/TR/wac"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    solidproject.org/TR/wac
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-acp">
                <span className={styles.refTag}>[ACP]</span>
                <span className={styles.refBody}>
                  M. Bosquet,{" "}
                  <span className={styles.refTitle}>
                    Access Control Policy (ACP)
                  </span>
                  , W3C Solid Community Group, 2022.{" "}
                  <a
                    href="https://solidproject.org/TR/acp"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    solidproject.org/TR/acp
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-solid-oidc">
                <span className={styles.refTag}>[SOLID-OIDC]</span>
                <span className={styles.refBody}>
                  A. Coburn, e. Pavlik, D. Zagidulin,{" "}
                  <span className={styles.refTitle}>Solid-OIDC</span>, W3C Solid
                  Community Group, 2022.{" "}
                  <a
                    href="https://solidproject.org/TR/oidc"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    solidproject.org/TR/oidc
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-dpop">
                <span className={styles.refTag}>[DPOP]</span>
                <span className={styles.refBody}>
                  D. Fett et al.,{" "}
                  <span className={styles.refTitle}>
                    OAuth 2.0 Demonstrating Proof of Possession (DPoP)
                  </span>
                  , RFC 9449, IETF, September 2023.{" "}
                  <a
                    href="https://www.rfc-editor.org/rfc/rfc9449"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    rfc-editor.org/rfc/rfc9449
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-vc-dm">
                <span className={styles.refTag}>[VC-DM]</span>
                <span className={styles.refBody}>
                  M. Sporny et al. (eds.),{" "}
                  <span className={styles.refTitle}>
                    Verifiable Credentials Data Model v2.0
                  </span>
                  , W3C Recommendation, 15 May 2025.{" "}
                  <a
                    href="https://www.w3.org/TR/vc-data-model-2.0/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    w3.org/TR/vc-data-model-2.0
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-vc-di">
                <span className={styles.refTag}>[VC-DI]</span>
                <span className={styles.refBody}>
                  M. Sporny, D. Longley et al. (eds.),{" "}
                  <span className={styles.refTitle}>
                    Verifiable Credential Data Integrity 1.0
                  </span>
                  , W3C Recommendation, 15 May 2025.{" "}
                  <a
                    href="https://www.w3.org/TR/vc-data-integrity/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    w3.org/TR/vc-data-integrity
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-di-eddsa">
                <span className={styles.refTag}>[DI-EDDSA]</span>
                <span className={styles.refBody}>
                  <span className={styles.refTitle}>
                    Data Integrity EdDSA Cryptosuites v1.0
                  </span>
                  , W3C Recommendation, 15 May 2025.{" "}
                  <a
                    href="https://www.w3.org/TR/vc-di-eddsa/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    w3.org/TR/vc-di-eddsa
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-rdfc">
                <span className={styles.refTag}>[RDFC]</span>
                <span className={styles.refBody}>
                  D. Longley (ed.),{" "}
                  <span className={styles.refTitle}>
                    RDF Dataset Canonicalization (RDFC-1.0)
                  </span>
                  , W3C Recommendation, 21 May 2024.{" "}
                  <a
                    href="https://www.w3.org/TR/rdf-canon/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    w3.org/TR/rdf-canon
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-prov-o">
                <span className={styles.refTag}>[PROV-O]</span>
                <span className={styles.refBody}>
                  T. Lebo, S. Sahoo, D. McGuinness (eds.),{" "}
                  <span className={styles.refTitle}>
                    PROV-O: The PROV Ontology
                  </span>
                  , W3C Recommendation, 30 April 2013.{" "}
                  <a
                    href="https://www.w3.org/TR/prov-o/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    w3.org/TR/prov-o
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-odrl-im">
                <span className={styles.refTag}>[ODRL-IM]</span>
                <span className={styles.refBody}>
                  R. Iannella, S. Villata (eds.),{" "}
                  <span className={styles.refTitle}>
                    ODRL Information Model 2.2
                  </span>
                  , W3C Recommendation, 15 February 2018.{" "}
                  <a
                    href="https://www.w3.org/TR/odrl-model/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    w3.org/TR/odrl-model
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-odrl-vocab">
                <span className={styles.refTag}>[ODRL-VOCAB]</span>
                <span className={styles.refBody}>
                  R. Iannella et al. (eds.),{" "}
                  <span className={styles.refTitle}>
                    ODRL Vocabulary &amp; Expression 2.2
                  </span>
                  , W3C Recommendation, 15 February 2018.{" "}
                  <a
                    href="https://www.w3.org/TR/odrl-vocab/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    w3.org/TR/odrl-vocab
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-shacl">
                <span className={styles.refTag}>[SHACL]</span>
                <span className={styles.refBody}>
                  H. Knublauch, D. Kontokostas (eds.),{" "}
                  <span className={styles.refTitle}>
                    Shapes Constraint Language (SHACL)
                  </span>
                  , W3C Recommendation, 20 July 2017.{" "}
                  <a
                    href="https://www.w3.org/TR/shacl/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    w3.org/TR/shacl
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-as2">
                <span className={styles.refTag}>[AS2]</span>
                <span className={styles.refBody}>
                  J. Snell, E. Prodromou (eds.),{" "}
                  <span className={styles.refTitle}>Activity Streams 2.0</span>,
                  W3C Recommendation, 23 May 2017.{" "}
                  <a
                    href="https://www.w3.org/TR/activitystreams-core/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    w3.org/TR/activitystreams-core
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-did">
                <span className={styles.refTag}>[DID]</span>
                <span className={styles.refBody}>
                  M. Sporny et al. (eds.),{" "}
                  <span className={styles.refTitle}>
                    Decentralized Identifiers (DIDs) v1.0
                  </span>
                  , W3C Recommendation, 19 July 2022.{" "}
                  <a
                    href="https://www.w3.org/TR/did-core/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    w3.org/TR/did-core
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-a2a">
                <span className={styles.refTag}>[A2A]</span>
                <span className={styles.refBody}>
                  Google,{" "}
                  <span className={styles.refTitle}>
                    Announcing the Agent2Agent Protocol (A2A)
                  </span>
                  , April 2025; now a Linux Foundation project.{" "}
                  <a
                    href="https://a2a-protocol.org/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    a2a-protocol.org
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-mcp">
                <span className={styles.refTag}>[MCP]</span>
                <span className={styles.refBody}>
                  Anthropic,{" "}
                  <span className={styles.refTitle}>
                    Model Context Protocol
                  </span>
                  , November 2024.{" "}
                  <a
                    href="https://modelcontextprotocol.io/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    modelcontextprotocol.io
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-anp">
                <span className={styles.refTag}>[ANP]</span>
                <span className={styles.refBody}>
                  <span className={styles.refTitle}>
                    Agent Network Protocol
                  </span>{" "}
                  (open-source community specification).{" "}
                  <a
                    href="https://agent-network-protocol.com/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    agent-network-protocol.com
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-agora">
                <span className={styles.refTag}>[AGORA]</span>
                <span className={styles.refBody}>
                  S. Marro, E. La Malfa, J. Wright, G. Li, N. Shadbolt, P. Torr,
                  M. Wooldridge,{" "}
                  <span className={styles.refTitle}>
                    A Scalable Communication Protocol for Networks of Large
                    Language Models
                  </span>
                  , arXiv:2410.11905, 2024.{" "}
                  <a
                    href="https://arxiv.org/abs/2410.11905"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    arxiv.org/abs/2410.11905
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-solid-demo">
                <span className={styles.refTag}>[SOLID-DEMO]</span>
                <span className={styles.refBody}>
                  E. Mansour, A. V. Sambra, S. Hawke, M. Zereba, S. Capadisli,
                  A. Ghanem, A. Aboulnaga, T. Berners-Lee,{" "}
                  <span className={styles.refTitle}>
                    A Demonstration of the Solid Platform for Social Web
                    Applications
                  </span>
                  , WWW ’16 Companion, 2016.
                </span>
              </div>
              <div className={styles.refItem} id="ref-ids-ram">
                <span className={styles.refTag}>[IDS-RAM]</span>
                <span className={styles.refBody}>
                  International Data Spaces Association,{" "}
                  <span className={styles.refTitle}>
                    IDS Reference Architecture Model 4
                  </span>{" "}
                  (IDS-RAM 4).{" "}
                  <a
                    href="https://docs.internationaldataspaces.org/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    docs.internationaldataspaces.org
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-gaiax">
                <span className={styles.refTag}>[GAIA-X]</span>
                <span className={styles.refBody}>
                  Gaia-X European Association for Data and Cloud AISBL,{" "}
                  <span className={styles.refTitle}>
                    Gaia-X Architecture and Trust Framework documents
                  </span>
                  .{" "}
                  <a
                    href="https://gaia-x.eu/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    gaia-x.eu
                  </a>
                </span>
              </div>
              <div className={styles.refItem} id="ref-dga">
                <span className={styles.refTag}>[DGA]</span>
                <span className={styles.refBody}>
                  Regulation (EU) 2022/868 (Data Governance Act), 2022.
                </span>
              </div>
              <div className={styles.refItem} id="ref-data-act">
                <span className={styles.refTag}>[DATA-ACT]</span>
                <span className={styles.refBody}>
                  Regulation (EU) 2023/2854 (Data Act), 2023.
                </span>
              </div>
              <div className={styles.refItem} id="ref-eidas2">
                <span className={styles.refTag}>[EIDAS2]</span>
                <span className={styles.refBody}>
                  Regulation (EU) 2024/1183 (European Digital Identity
                  framework), 2024.
                </span>
              </div>
            </div>
          </div>
        </section>

        <footer className={styles.colophon}>
          <span>
            Set in system old-style serif (body/argument) and system monospace
            (structure/citations/references) — no webfonts loaded.
          </span>
          <span>
            A companion catalogue,{" "}
            <Link href="/agentic-web/companions">
              <em>Solid Spec Companions</em>
            </Link>
            , inventories the machine-readable specification layer this paper
            describes in §3.4.
          </span>
          <span>© Jesse Wright, 2026. Draft — pending maintainer review.</span>
        </footer>
      </div>
    </div>
  );
}
