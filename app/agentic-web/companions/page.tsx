// AUTHORED-BY Claude Sonnet
import type { Metadata } from "next";

import Link from "next/link";

import styles from "../agentic-web.module.css";
import { DraftBanner } from "../DraftBanner";

export const metadata: Metadata = {
  title: "Agentic-Solid Companion Specifications",
  description:
    "A catalogue of machine-readable spec companions — sidecar RDF/SHACL documents that make the normative statements in five Agentic-Solid specifications machine-checkable. Draft — pending Claude Fable 5 review.",
  openGraph: {
    title: "Agentic-Solid Companion Specifications",
    description:
      "The machine-readable companion layer for five Agentic-Solid specifications — a testability spine and a SHACL spec-of-specs guardrail. Draft — pending Claude Fable 5 review.",
    type: "article",
  },
};

export default function AgenticWebCompanionsPage() {
  return (
    <div className={styles.page}>
      <DraftBanner />

      <div className={styles.pageShell}>
        <header className={styles.masthead}>
          <span className={styles.eyebrow}>
            Machine-readable spec layer — @jeswr Solid suite
          </span>
          <h1 className={styles.mastheadTitle}>Solid Spec Companions</h1>
          <p className={styles.subtitle}>
            The sidecar RDF that makes a specification’s normative statements
            machine-checkable
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
              A catalogue of the machine-readable companions produced alongside
              five specifications in the @jeswr Solid suite. Companions are
              complementary documents — the full-text specifications remain the
              normative source; the companion is what lets a claim in that text
              be checked by software rather than only read by a person.
            </em>
          </p>
        </header>

        <section className={styles.sectionBlock} id="stats">
          <div className={styles.statRail}>
            <div className={styles.statTile}>
              <span className={styles.statNum}>464</span>
              <span className={styles.statLabel}>Statements produced</span>
            </div>
            <div className={styles.statTile}>
              <span className={styles.statNum}>5</span>
              <span className={styles.statLabel}>Core specs covered</span>
            </div>
            <div className={styles.statTile}>
              <span className={styles.statNum}>0</span>
              <span className={styles.statLabel}>
                SHACL errors, spec-of-specs
              </span>
            </div>
            <div className={styles.statTile}>
              <span className={styles.statNum}>~53</span>
              <span className={styles.statLabel}>
                Errata surfaced while authoring
              </span>
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock} id="format">
          <h2>The format home</h2>
          <div className={styles.sectionIntro}>
            <p>
              <code>jeswr/spec-companion</code> is the machine-readable
              spec-companion format itself: the shared shape every companion
              below is written against. It reuses the W3C <code>spec:</code>{" "}
              vocabulary rather than minting a competing one, and adds a{" "}
              <strong>testability spine</strong> — a fixed vocabulary for
              classifying exactly how checkable each normative statement is (see
              below) — plus a SHACL <strong>“spec-of-specs” guardrail</strong>:
              a shape that validates the companions themselves, enforced by a
              validator with five global structural checks,{" "}
              <strong>G1–G5</strong>.
            </p>
            <p>
              Companions are <strong>complementary</strong> documents, not
              replacements: the full-text specification stays the normative
              source a person reads; the companion is the sidecar a machine
              reads to check conformance against it.
            </p>
          </div>

          <div className={styles.catalogGrid} style={{ marginTop: "1.5rem" }}>
            <div className={`${styles.specCard} ${styles.formatCard}`}>
              <div className={styles.cardTop}>
                <div>
                  <span className={styles.repo}>jeswr/spec-companion</span>
                  <h3 style={{ marginTop: "0.3rem" }}>
                    The spec-companion format
                  </h3>
                </div>
              </div>
              <p>
                Reuses the W3C <code>spec:</code> vocabulary + the testability
                spine (E / A-int / A-exist / P) + a SHACL “spec-of-specs”
                guardrail, enforced by a validator (globals G1–G5). This is the
                format home, not one of the five companions — every companion
                below is written against it.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock} id="spine">
          <h2>The testability spine</h2>
          <div className={styles.sectionIntro}>
            <p>
              Every normative statement in a companion is tagged with one of
              four testability classes — how, in principle, a claim of
              conformance to that statement could actually be checked:
            </p>
          </div>
          <div className={styles.spineGrid}>
            <div className={styles.spineChip}>
              <span className={styles.spineCode}>E</span>
              <p>
                <strong>Server-denies.</strong> The statement describes
                behaviour a conforming server actively enforces — a violation is
                caught and rejected at request time.
              </p>
            </div>
            <div className={styles.spineChip}>
              <span className={styles.spineCode}>A-int</span>
              <p>
                <strong>Audit-detectable from signed evidence.</strong> A
                violation isn’t blocked in the moment, but is detectable after
                the fact from cryptographically signed evidence.
              </p>
            </div>
            <div className={styles.spineChip}>
              <span className={styles.spineCode}>A-exist</span>
              <p>
                <strong>Record exists but unverifiable.</strong> A record of the
                fact is produced, but nothing lets an independent party verify
                it after the fact.
              </p>
            </div>
            <div className={styles.spineChip}>
              <span className={styles.spineCode}>P</span>
              <p>
                <strong>Premature decline.</strong> The statement is explicitly
                marked not yet testable by any of the above — an honest “not
                there yet” rather than a forced classification.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock} id="catalog">
          <h2>The five core companions</h2>
          <div className={styles.sectionIntro}>
            <p>
              Each row below is a companion document for one specification in
              the suite — the statement count is the number of individually
              testable normative statements the companion extracts and
              classifies.
            </p>
          </div>

          <div className={styles.catalogGrid}>
            <div className={styles.specCard}>
              <div className={styles.cardTop}>
                <div>
                  <span className={styles.repo}>jeswr/a2a-rdf-extension</span>
                  <h3 style={{ marginTop: "0.3rem" }}>A2A RDF Extension</h3>
                </div>
                <div className={styles.count}>
                  64
                  <small className={styles.countSmall}>statements</small>
                </div>
              </div>
              <p>
                The A2A RDF protocol-document extension — formalizes what{" "}
                <code>@jeswr/solid-a2a</code> implements.
              </p>
            </div>

            <div className={styles.specCard}>
              <div className={styles.cardTop}>
                <div>
                  <span className={styles.repo}>
                    jeswr/agentic-solid-conformance
                  </span>
                  <h3 style={{ marginTop: "0.3rem" }}>
                    Agentic Solid Conformance
                  </h3>
                </div>
                <div className={styles.count}>
                  11
                  <small className={styles.countSmall}>statements</small>
                </div>
              </div>
              <p>
                The shared conformance test-vector suite — the language-neutral
                golden vectors an independent implementation must reproduce.
              </p>
            </div>

            <div className={styles.specCard}>
              <div className={styles.cardTop}>
                <div>
                  <span className={styles.repo}>
                    jeswr/solid-webauthn-reauth-spec
                  </span>
                  <h3 style={{ marginTop: "0.3rem" }}>
                    Solid WebAuthn Re-auth
                  </h3>
                </div>
                <div className={styles.count}>
                  74
                  <small className={styles.countSmall}>statements</small>
                </div>
              </div>
              <p>
                The redirect-free WebAuthn re-auth profile — WebAuthn L3 +
                Solid-OIDC + RFC 8693 token-exchange.
              </p>
              <p className={styles.footnote}>
                First companion with <code>sc:formalModel</code> seams.
              </p>
            </div>

            <div className={styles.specCard}>
              <div className={styles.cardTop}>
                <div>
                  <span className={styles.repo}>jeswr/dpop-sk-spec</span>
                  <h3 style={{ marginTop: "0.3rem" }}>DPoP-SK</h3>
                </div>
                <div className={styles.count}>
                  73
                  <small className={styles.countSmall}>statements</small>
                </div>
              </div>
              <p>
                The DPoP-SK PoP-negotiation profile — the Tier-2 browser fast
                path: one DPoP proof at session establishment, then per-request
                RFC 9421 HMAC attestation.
              </p>
            </div>

            <div className={`${styles.specCard} ${styles.wideCard}`}>
              <div className={styles.cardTop}>
                <div>
                  <span className={styles.repo}>jeswr/lws-spec</span>
                  <h3 style={{ marginTop: "0.3rem" }}>
                    Linked Web Storage (clean-slate)
                  </h3>
                </div>
                <div className={styles.count}>
                  242
                  <small className={styles.countSmall}>statements</small>
                </div>
              </div>
              <p>
                Clean-slate Linked Web Storage: the index companion (195
                statements) plus the rdf-transform companion (47 statements).
              </p>
              <p className={styles.footnote}>
                The index companion doubles as the LWS test-suite requirement
                index.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock} id="honesty">
          <h2>Honest framing</h2>
          <div className={styles.honestyBox}>
            <span className={styles.honestyTitle}>
              What this is, and isn’t, yet
            </span>
            <p>
              All five companions validate at <strong>0 errors</strong> against
              the spec-of-specs SHACL guardrail, and the authoring process
              itself surfaced <strong>~53 per-spec errata</strong> in the source
              specifications along the way — the companion format is already
              paying for itself as a proofreading pass, independent of tooling.
            </p>
            <p>
              Two things remain <strong>pending</strong>: publication of the{" "}
              <code>jeswr/spec-companion</code> format repository itself, and
              wiring the validator up as an enforced CI gate rather than a
              manually-run check.
            </p>
          </div>
        </section>

        <footer className={styles.colophon}>
          <span>
            Set in system old-style serif (body) and system monospace
            (structure/data) — no webfonts loaded.
          </span>
          <span>
            Companion to the vision paper,{" "}
            <Link href="/agentic-web">
              <em>The Accountable Web of Agents</em>
            </Link>
            , which this catalogue’s format is §3.4’s “querying under
            authorization” and machine-readable-first argument made concrete.
          </span>
          <span>© Jesse Wright, 2026. Draft — pending maintainer review.</span>
        </footer>
      </div>
    </div>
  );
}
