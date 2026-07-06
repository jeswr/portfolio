// AUTHORED-BY Claude Fable 5
import type { Metadata } from "next";

import Link from "next/link";

import { DraftBanner } from "../agentic-web/DraftBanner";
import { WorkstreamNav } from "../agentic-web/WorkstreamNav";
import styles from "../agentic-web/agentic-web.module.css";

export const metadata: Metadata = {
  title: "unite — participatory democracy, designed to decentralise",
  description:
    "unite combines participatory democracy with value-centric design: describe your ideal future, your current life, and your needs; psychology-informed convergence surfaces shared futures, with dissent carried as a first-class artifact. A founding design proposal and a Stage-1 seed client — bootstrapping, under active development.",
  openGraph: {
    title: "unite — participatory democracy, designed to decentralise",
    description:
      "Shared futures, computed needs-first on the Solid federation stack — convergence without manufactured consensus, dissent never smoothed away. Working draft — under ongoing review.",
    type: "article",
  },
};

export default function UnitePage() {
  return (
    <div className={styles.page}>
      <DraftBanner />

      <div className={styles.pageShell}>
        <header className={styles.masthead}>
          <span className={styles.eyebrow}>
            Workstream — participatory democracy · @jeswr Solid suite
          </span>
          <h1 className={styles.mastheadTitle}>unite</h1>
          <p className={styles.subtitle}>
            Participatory democracy × value-centric design — shared futures,
            computed needs-first, with dissent carried
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
              Founding design proposal — bootstrapping
            </span>
          </div>
          <p className={styles.draftNote}>
            <em>
              The unite design and its seed client are AI-agent-authored (Claude
              Fable 5, @jeswr’s agent) and are intended to be criticised,
              forked, and superseded. Text is CC BY 4.0. Under active
              development; not production-ready.
            </em>
          </p>

          <WorkstreamNav current="unite" />
        </header>

        {/* ================= SECTION 1 ================= */}
        <section className={styles.section} id="sec-1">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§1</span>
            <span className={styles.sectionRailTag}>The inversion</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>What unite is</h2>
            <div className={styles.prose}>
              <p>
                Existing social platforms optimise for engagement, which in
                practice amplifies division: the content that spreads is the
                content that provokes. Existing participation mechanisms —
                elections, consultations, petitions — are low-bandwidth: they
                let people choose between options others framed, not describe
                the future they actually want.
              </p>
              <p>
                <strong>unite</strong> inverts both. Its primitive is a person’s
                own description of their <em>ideal future</em>, their{" "}
                <em>current life</em>, and their <em>needs</em>. Its social
                mechanic is <strong>resonance across difference</strong> rather
                than engagement — you see others’ futures for inspiration, and
                react to theirs as they react to yours. Its output is{" "}
                <strong>convergence artifacts</strong>: shared-future statements
                with explicit provenance, endorsement evidence, and carried
                dissent — legible enough for governments and industry to act on.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2 ================= */}
        <section className={styles.section} id="sec-2">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§2</span>
            <span className={styles.sectionRailTag}>Non-negotiables</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Two non-negotiables</h2>
            <div className={styles.prose}>
              <div className={styles.diptych}>
                <div>
                  <span className={styles.diptychTag}>1 — no single owner</span>
                  <p>
                    unite has{" "}
                    <strong>
                      no single codebase and no single standards owner
                    </strong>{" "}
                    — either one would concentrate too much control. It is built
                    on the Solid data-model federation stack (
                    <Link href="/agentic-web#sec-2-5">
                      the vision paper’s §2.5
                    </Link>
                    ), and it is <em>designed to decentralise</em>, with
                    measurable exit criteria — by its own rules it describes
                    itself as “bootstrapping”, not “decentralised”, until those
                    criteria are met (§8).
                  </p>
                </div>
                <div>
                  <span className={styles.diptychTag}>
                    2 — convergence without manufactured consensus
                  </span>
                  <p>
                    Dissent is a{" "}
                    <strong>first-class, permanently-carried artifact</strong> —
                    never smoothed away. A shared-future statement without its
                    dissent annex is <em>invalid</em> (SHACL-enforced); dissent
                    may be absent only via an explicit signed no-dissent
                    assertion, which is auditable — and embarrassing to fake.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3 ================= */}
        <section className={styles.section} id="sec-3">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§3</span>
            <span className={styles.sectionRailTag}>The data model</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Needs, not positions: the data model</h2>
            <div className={styles.prose}>
              <p>
                The <code>fut:</code> vocabulary (
                <code>w3id.org/jeswr/sectors/futures#</code>, a seed namespace)
                follows the suite’s federation sector pattern and reuses
                ActivityStreams, SKOS, PROV-O, ODRL 2.2, and Verifiable
                Credentials — minting nothing that already exists. It has three
                layers, distinguished by <em>where the data lives</em>:
              </p>
              <ul>
                <li>
                  <strong>Expression, in the author’s pod</strong> —{" "}
                  <code>fut:VisionStatement</code> (“my ideal future”),{" "}
                  <code>fut:LifeContext</code> (“my current life”),{" "}
                  <code>fut:Claim</code> (an atomic, voteable statement — the
                  deliberation unit, length-capped and shape-validated), plus{" "}
                  <code>fut:Need</code>, <code>fut:Satisfier</code>, and{" "}
                  <code>fut:ValueStatement</code>.
                </li>
                <li>
                  <strong>Reaction, in the reactor’s pod</strong> —{" "}
                  <code>fut:Resonance</code>, tri-state (
                  <em>Resonates / Conflicts / Unsure</em>) with an optional
                  dimension qualifier — <em>I share this</em>,{" "}
                  <em>I aspire to this</em>, <em>I would support this</em> —
                  because a present condition, an aspiration, and a willingness
                  to support others are psychologically distinct.
                </li>
                <li>
                  <strong>Process, in the community’s space</strong> —{" "}
                  <code>fut:Deliberation</code>, <code>fut:SharedFuture</code>{" "}
                  (the convergence artifact: full PROV derivation, per-cluster
                  bridging evidence, signed as a Verifiable Credential),{" "}
                  <code>fut:DissentRecord</code>, and open, k-anonymous{" "}
                  <code>fut:ConvergenceMetrics</code>.
                </li>
              </ul>
              <p>
                The load-bearing idea is Max-Neef’s split between{" "}
                <strong>needs</strong> — few, universal, stable across cultures
                — and <strong>satisfiers</strong>, the culturally variable ways
                needs are met:
              </p>
              <p className={styles.scenarioQuote}>
                People who violently disagree about satisfiers (“cars vs
                trains”) routinely share the underlying needs (“get to work
                reliably; breathe clean air”).
              </p>
              <p>
                Convergence is therefore computed <strong>needs-first</strong>,
                where common ground structurally exists, and satisfier diversity
                is treated as a portfolio to preserve, not noise to average away
                — which reframes disagreement as design-space, not conflict. The
                value scheme is seeded from Schwartz’s basic-values circumplex;
                neither scheme is closed or centrally owned — the seed schemes
                are defaults, not law.
              </p>
              <p>
                Every statement can carry an{" "}
                <strong>ODRL consent policy</strong> — aggregate, synthesize,
                quote-verbatim, government-use, with a k-anonymity threshold
                (default k = 5). The defaults are conservative: quotation and
                government use are prohibited until explicitly granted, consent
                is recorded at synthesis time, and the consent UI says plainly
                that aggregates derived with your consent may persist after
                deletion.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 4 ================= */}
        <section className={styles.section} id="sec-4">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§4</span>
            <span className={styles.sectionRailTag}>Convergence</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>How convergence works</h2>
            <div className={styles.prose}>
              <p>
                unite adopts{" "}
                <strong>
                  bridging as the ranking objective everywhere content is
                  ordered
                </strong>{" "}
                — there is no engagement-ranked surface anywhere in the design.
                The pipeline has five steps, each grounded in named prior work:
              </p>
              <ol>
                <li>
                  <strong>Elicitation.</strong> Narratives decompose into atomic
                  claims, needs, and values — the Pol.is deliberation model
                  (Small et al., 2021), deployed nationally in Taiwan’s vTaiwan
                  process.
                </li>
                <li>
                  <strong>Substrate and presentation.</strong> Max-Neef (1991)
                  for needs; Schwartz (1992) for values. Presentation follows
                  the false-polarisation and perception-gap literature (Ahler
                  &amp; Sood 2018; More in Common 2019): unite always shows{" "}
                  <em>actual resonance distributions</em> rather than exemplar
                  opponents, and its inspiration feed applies intergroup-contact
                  findings (Allport 1954; Pettigrew &amp; Tropp 2006) by routing
                  whole vision narratives from people outside your opinion
                  neighbourhood whose need and value profile overlaps yours.
                </li>
                <li>
                  <strong>Resonance mapping.</strong> The Pol.is layer: a
                  reaction matrix, dimensionality reduction, opinion clusters —
                  with group-informed consensus surfaced first, and deliberately{" "}
                  <em>no replies</em> at this layer, which removes the flame-war
                  surface entirely.
                </li>
                <li>
                  <strong>Synthesis — advisory, with mandatory dissent.</strong>{" "}
                  Shaped on the “Habermas Machine” result (Tessler et al.,{" "}
                  <em>Science</em>, 2024): draft, stratified critique round,
                  bounded revision, then an endorsement vote that must clear a{" "}
                  <em>bridging threshold</em> — minimum resonance in every
                  cluster, cross-polarity approval rather than majority (the
                  bridging-based-ranking lineage: Ovadya 2022; Wojcik et al.
                  2022). Surviving objections become the mandatory dissent
                  annex; a failed candidate publishes as a{" "}
                  <em>disagreement map</em>, a first-class outcome: here is
                  exactly where we divide, and on which needs we nonetheless
                  agree.
                </li>
                <li>
                  <strong>Escalation.</strong> For contested or governance-bound
                  topics, sortition-based mini-publics in the
                  deliberative-polling lineage (Fishkin 2009). The legitimacy
                  split is explicit: self-selected resonance maps{" "}
                  <em>inform</em>; sortition-based mini-publics{" "}
                  <em>legitimate</em>.
                </li>
              </ol>
              <p>
                The design takes Mouffe’s agonistic critique seriously —
                consensus can be a mask that suppresses legitimate conflict — so
                the objective is to{" "}
                <strong>
                  maximise <em>mapped</em> common ground
                </strong>
                , never to minimise dissent: no metric rewards unanimity, and a
                community whose consensus rate rises while its dissent annexes
                empty out is flagged, not celebrated. One honesty note carried
                from the design record: the literature is grounding, not proof
                that this system works — effectiveness claims belong to the
                cited studies, and unite’s own extensions are flagged as
                plausible but unvalidated.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 5 ================= */}
        <section className={styles.section} id="sec-5">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§5</span>
            <span className={styles.sectionRailTag}>Federation</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>No component is a point of control</h2>
            <div className={styles.prose}>
              <p>
                unite is not an application; it is a{" "}
                <strong>data-model federation</strong>. There is deliberately no
                “unite server”. A community is just conventional Solid resources
                — a registry, an inbox, an index — hostable on any pod.
                Statements live in the author’s pod under standard access
                control; community indexes are caches, never authoritative; and
                syntheses carry authority via <em>signature, not location</em>.
              </p>
              <p>
                The design record audits every function for capture — code,
                standards, identity, storage, curation, facilitation, and
                moderation. Two examples: there is no global moderator — a
                community can decline to index a statement, but cannot delete
                the pod resource or bar it from other communities; and AI
                mediation is attributed, swappable, and <em>advisory</em> — a
                synthesis has zero standing until it wins cross-cluster human
                endorsement. The standing test for every future feature is{" "}
                <strong>exit cost</strong>: what does a person, a community, or
                an implementer lose by leaving? If the answer ever becomes
                “their data”, “their identity”, “their history”, or “the
                network”, the feature is wrong.
              </p>
              <p>
                Identity is stratified rather than gated, because honest
                expression and sybil resistance genuinely conflict: three
                participation tiers (pseudonymous; community-vouched;
                personhood-verified, with a zero-knowledge seam), the posture
                being <em>stratify and disclose, not exclude</em> — every metric
                reports participation by tier, and governance-bound syntheses
                are computed over vouched-or-verified cohorts with the
                pseudonymous tier shown alongside, never silently mixed.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 6 ================= */}
        <section className={styles.section} id="sec-6">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§6</span>
            <span className={styles.sectionRailTag}>Governance</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Governance without an owner — by mechanism, not promise</h2>
            <div className={styles.prose}>
              <p>
                Specification versions are <strong>immutable</strong> (permanent{" "}
                <code>owl:versionIRI</code>s), and change is{" "}
                <strong>adoption-ratified, not decree-ratified</strong>: a
                version becomes Current only when at least two independent
                implementations interoperate on it <em>and</em> at least two
                independent communities advertise it — adoption is measured on
                the wire, not declared (the IETF’s “rough consensus and running
                code”, inherited). The steward circle carries a hard cap — no
                organisation holds more than a third of seats, quorum requires
                three unaffiliated organisations, and editors assemble, they
                don’t decide: even a fully captured circle cannot force a change
                onto the network, and cannot block one the network wants.
              </p>
              <p>
                Forkability is a constitutional right: CC BY 4.0 text,
                multi-homed mirrors, and registry machinery that lets fork
                lineages coexist on the wire. The cost of forking is kept low{" "}
                <em>on purpose</em> — a cheap fork is the standing check on
                every other mechanism here. The governance eats its own cooking:
                circle decisions are recorded with objections carried, the same
                dissent-is-data rule the platform imposes on its communities.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 7 ================= */}
        <section className={styles.section} id="sec-7">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§7</span>
            <span className={styles.sectionRailTag}>Roll-out</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Roll-out stages</h2>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>Scope</th>
                    <th>Character</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Stage 1 — app co-design</td>
                    <td>
                      Co-design the Solid applications people want: propose,
                      articulate needs, converge on a spec, the suite’s
                      generative tooling implements, ship — then{" "}
                      <em>verify-against-needs</em>, where contributors check
                      the shipped app against their own original needs.
                    </td>
                    <td>
                      Reflexive and deliberately low-stakes (app specs, not
                      public policy); verify-against-needs is what makes it
                      participatory design rather than a suggestion box.
                    </td>
                  </tr>
                  <tr>
                    <td>Stage 2 — public technology</td>
                    <td>
                      Broader standards-based public technology, fediverse-style
                      — the same substrate applied beyond the suite.
                    </td>
                    <td>Designed; not started.</td>
                  </tr>
                  <tr>
                    <td>Stage 3 — governance input</td>
                    <td>
                      Participatory input into government and industry
                      decision-making, escalating through mini-publics.
                    </td>
                    <td>
                      Designed; gated — launches only on low-sensitivity civic
                      topics, and never on Stage-1 privacy machinery.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.prose} style={{ marginTop: "1.4rem" }}>
              <p>
                The seed client also carries three scope lenses — apps,
                infrastructure, society — over the same deliberation substrate
                with different artifact lifecycles; the society scope’s rule is
                blunt: nothing executes; institutions and humans decide.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 8 ================= */}
        <section className={styles.section} id="sec-8">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§8</span>
            <span className={styles.sectionRailTag}>Status — honest</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>What exists today, and what does not</h2>
            <div className={styles.prose}>
              <p>
                What exists is a <strong>founding design proposal</strong>{" "}
                (seven design documents, including a kept adversarial
                self-critique — §9) and a{" "}
                <strong>Stage-1 MVP seed client</strong>: a vite/React
                single-page app in which you can join a deliberation
                (membership-gated, fail-closed), submit Max-Neef-classified
                needs with inline ODRL consent policies <em>to your own pod</em>
                , react with tri-state resonance, and read a bridging-ranked
                opinion map with full per-group distributions — the UI cannot
                render a bare consensus number even if it wanted to. It opens on
                a seeded demo deliberation: an in-browser pod federation behind
                a fetch facade that never touches the network — while everything
                above that facade is the real production pipeline. The data
                layer is exhaustively tested, and the ranking math is
                deterministic by construction, pinned by a characterization
                fixture that asserts exact cluster assignments and full ranking
                order — the seed of the executable conformance fixture set a
                second implementation must pass.
              </p>
            </div>
            <div className={styles.honestyBox}>
              <span className={styles.honestyTitle}>
                The not-yets, stated plainly
              </span>
              <p>
                No LLM-mediated synthesis machinery yet (the Habermas-Machine
                step is design-stage; the convergence room computes outcomes
                from votes). ODRL consent is the author’s standing consent{" "}
                <em>record</em>, not yet enforced service-side. Steward signing
                is pending, and the two-steward floor is shown honestly unmet.
                Sortition mini-publics are designed, not implemented, and unite
                never claims representativeness — self-selected maps inform,
                only mini-publics legitimate. Nothing in Stage 1 claims
                sybil-resistance beyond the vouching community’s diligence.
                There is exactly one implementation and a nearly-empty adoption
                matrix — the correct display, not a bug to paper over. By its
                own exit criteria, unite’s governance is{" "}
                <strong>“bootstrapping”, never “decentralised”</strong>, until a
                second independent implementation and a second steward exist —
                the final milestone being that the seed author demonstrably
                loses a recommendation vote and the network follows the adoption
                rule anyway. Under active development; not production-ready.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION 9 ================= */}
        <section className={styles.section} id="sec-9">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§9</span>
            <span className={styles.sectionRailTag}>Self-critique</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>The design attacks itself, and keeps the wounds</h2>
            <div className={styles.prose}>
              <p>
                The design was attacked before it was finalised, and the attacks
                and their outcomes are kept in the repo permanently — the same
                dissent-is-data rule the platform imposes on itself. Three of
                the sharpest:
              </p>
              <ul>
                <li>
                  <strong>The intimacy honeypot.</strong> “Describe your ideal
                  future, your current life, your unmet needs” is an intimacy
                  honeypot. Mitigations: conservative consent defaults,
                  pseudonymity, k-anonymity floors — and a hard gate: sensitive
                  Stage-3 topics (health, income) must not launch on Stage-1
                  privacy machinery.
                </li>
                <li>
                  <strong>Mediator monoculture.</strong> If every community uses
                  the same frontier model, the mediator’s training distribution
                  becomes an invisible ideology — exactly the “single standards
                  owner” failure in new clothes. Hence conformance requires
                  swappable non-LLM and human mediators, and mediator diversity
                  is a published metric.
                </li>
                <li>
                  <strong>The deepest attack:</strong> a convergence engine is,
                  uncharitably described, a persuasion engine with a democracy
                  skin. The kept response concedes the core: ranking <em>is</em>{" "}
                  power. unite chooses bridging as its editorial value, openly,
                  in a forkable spec — the legitimacy claim is{" "}
                  <strong>transparency plus exit, not neutrality</strong>. No
                  further mitigation exists; anyone claiming otherwise about any
                  ranked system is selling something.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= SECTION 10 ================= */}
        <section className={styles.section} id="sec-10">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§10</span>
            <span className={styles.sectionRailTag}>Context</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Relationship to the Accountable Web of Agents</h2>
            <div className={styles.prose}>
              <p>
                unite runs on the same federation substrate the{" "}
                <Link href="/agentic-web">
                  <em>Accountable Web of Agents</em>
                </Link>{" "}
                vision describes — pods, sector vocabularies and shapes,
                registries, verifiable-credential trust, ODRL consent, PROV
                provenance — and it is that vision’s fullest demonstration: a
                system whose outputs must be credible to institutions is exactly
                the stress test the accountability stack exists for. The
                platform pieces it stands on are inventoried in{" "}
                <Link href="/solid">
                  <em>Solid — what we’ve built</em>
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <footer className={styles.colophon}>
          <span>
            Set in system old-style serif (body/argument) and system monospace
            (structure/citations) — no webfonts loaded.
          </span>
          <span>
            Source and full design record (including the kept adversarial
            self-critique):{" "}
            <a
              href="https://github.com/jeswr/unite"
              rel="noopener noreferrer"
              target="_blank"
            >
              github.com/jeswr/unite
            </a>
            ; design brief:{" "}
            <a
              href="https://github.com/jeswr/full-solid-ecosystem/issues/15"
              rel="noopener noreferrer"
              target="_blank"
            >
              full-solid-ecosystem#15
            </a>
            .
          </span>
          <span>
            © Jesse Wright, 2026. Text CC BY 4.0. Draft — pending maintainer
            review.
          </span>
        </footer>
      </div>
    </div>
  );
}
