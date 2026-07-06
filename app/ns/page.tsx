// AUTHORED-BY Claude Fable 5
import type { Metadata } from "next";

import styles from "../agentic-web/agentic-web.module.css";

import { PERSISTENT_IDS, PersistentIdEntry } from "@/config/persistent-ids";

export const metadata: Metadata = {
  title: "Namespaces — persistent identifiers",
  description:
    "The persistent-identifier index for the @jeswr vocabulary and specification namespaces: every RDF vocabulary namespace and versioned specification identifier served from jeswr.org, with content-negotiated redirects to Turtle, JSON-LD, and human documentation.",
  openGraph: {
    title: "Namespaces — persistent identifiers",
    description:
      "Content-negotiated persistent identifiers for the @jeswr vocabulary and specification namespaces.",
    type: "article",
  },
};

const vocabs = PERSISTENT_IDS.filter((e) => e.tree === "ns" && !e.pending);
const specs = PERSISTENT_IDS.filter((e) => e.tree === "spec" && !e.pending);
const pending = PERSISTENT_IDS.filter((e) => e.pending);

function canonicalUri(entry: PersistentIdEntry): string {
  return `https://jeswr.org/${entry.tree}/${entry.slug}`;
}

function RepresentationLinks({ entry }: { entry: PersistentIdEntry }) {
  return (
    <>
      {entry.html && (
        <a href={entry.html} rel="noopener noreferrer" target="_blank">
          html
        </a>
      )}
      {entry.turtle && (
        <>
          {" · "}
          <a href={entry.turtle} rel="noopener noreferrer" target="_blank">
            turtle
          </a>
        </>
      )}
      {entry.jsonld && (
        <>
          {" · "}
          <a href={entry.jsonld} rel="noopener noreferrer" target="_blank">
            json-ld
          </a>
        </>
      )}
    </>
  );
}

function EntryRows({ entries }: { entries: PersistentIdEntry[] }) {
  return (
    <>
      {entries.map((entry) => (
        <tr key={`${entry.tree}/${entry.slug}`}>
          <td>
            <code>
              <a href={canonicalUri(entry)}>
                /{entry.tree}/{entry.slug}
              </a>
            </code>
          </td>
          <td>{entry.prefix ? <code>{entry.prefix}:</code> : "—"}</td>
          <td>{entry.title}</td>
          <td>
            {entry.repo ? (
              <a
                href={`https://github.com/${entry.repo}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {entry.repo.replace("jeswr/", "")}
              </a>
            ) : (
              "—"
            )}
          </td>
          <td>
            <RepresentationLinks entry={entry} />
          </td>
        </tr>
      ))}
    </>
  );
}

export default function NamespaceIndexPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageShell}>
        <header className={styles.masthead}>
          <span className={styles.eyebrow}>
            Persistent identifiers · @jeswr Solid suite
          </span>
          <h1 className={styles.mastheadTitle}>Namespaces</h1>
          <p className={styles.subtitle}>
            The persistent-identifier home for the vocabularies and
            specifications built in the @jeswr Solid suite
          </p>
        </header>

        <section className={styles.section} id="scheme">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§1</span>
            <span className={styles.sectionRailTag}>How these resolve</span>
          </div>
          <div className={`${styles.sectionBody} ${styles.prose}`}>
            <h2>The identifier scheme</h2>
            <p>
              RDF vocabulary namespaces live at{" "}
              <code>https://jeswr.org/ns/&lt;name&gt;</code>; versioned
              specification identifiers live at{" "}
              <code>https://jeswr.org/spec/&lt;name&gt;/&lt;version&gt;</code>.
              Each identifier answers <code>GET</code> with{" "}
              <code>303 See Other</code>, content-negotiated on the{" "}
              <code>Accept</code> header: <code>text/turtle</code> resolves to
              the vocabulary&rsquo;s Turtle source,{" "}
              <code>application/ld+json</code> to its JSON-LD context where one
              is published, and <code>text/html</code> (the default) to the
              human documentation. Hash-namespace terms such as{" "}
              <code>…/ns/fedreg#Membership</code> resolve via their namespace
              document, and any identifier minted <em>under</em> a registered
              namespace — versioned data-profiles, slash sub-terms — resolves to
              that namespace&rsquo;s representations.
            </p>
            <p>
              These identifiers are the designated successors of the{" "}
              <code>https://w3id.org/jeswr/…</code> IRIs used while the
              vocabularies were being drafted; the migration is staged, and the
              w3id forms remain documented here until every consumer has moved.
            </p>
          </div>
        </section>

        <section className={styles.section} id="vocabularies">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§2</span>
            <span className={styles.sectionRailTag}>Vocabularies</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Vocabulary namespaces</h2>
            <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
              <table>
                <thead>
                  <tr>
                    <th>Identifier</th>
                    <th>Prefix</th>
                    <th>Vocabulary</th>
                    <th>Source</th>
                    <th>Representations</th>
                  </tr>
                </thead>
                <tbody>
                  <EntryRows entries={vocabs} />
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.section} id="specifications">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§3</span>
            <span className={styles.sectionRailTag}>Specifications</span>
          </div>
          <div className={styles.sectionBody}>
            <h2>Specification identifiers</h2>
            <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
              <table>
                <thead>
                  <tr>
                    <th>Identifier</th>
                    <th>Prefix</th>
                    <th>Specification</th>
                    <th>Source</th>
                    <th>Representations</th>
                  </tr>
                </thead>
                <tbody>
                  <EntryRows entries={specs} />
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.section} id="pending">
          <div className={styles.sectionRail}>
            <span className={styles.sectionRailNum}>§4</span>
            <span className={styles.sectionRailTag}>Pending</span>
          </div>
          <div className={`${styles.sectionBody} ${styles.prose}`}>
            <h2>Registered, not yet resolvable</h2>
            <p>
              These namespaces are in use but their documentation is not yet
              publicly published; their identifiers answer 404 until it is.
            </p>
            <ul>
              {pending.map((entry) => (
                <li key={entry.slug}>
                  <code>
                    /{entry.tree}/{entry.slug}
                  </code>{" "}
                  — {entry.title}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
