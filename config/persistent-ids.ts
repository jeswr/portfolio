// AUTHORED-BY Claude Fable 5
//
// Persistent-identifier registry for the @jeswr vocabulary + specification
// namespaces, served from this domain (maintainer directive: persistent IDs
// live on jeswr.org — no w3id.org PRs). Full design + migration notes in
// docs/persistent-ids.md.
//
// Canonical URI scheme:
//   - RDF vocabulary namespaces:  https://jeswr.org/ns/<name>          (tree "ns")
//   - Versioned specification IDs: https://jeswr.org/spec/<name>/<ver> (tree "spec")
//
// Every request under /ns/ or /spec/ is resolved by LONGEST-PREFIX match
// against this registry, then content-negotiated to a 303 See Other:
//   text/turtle          -> the raw Turtle on GitHub (pinned to `main`, never a sha,
//                           so the redirect tracks the living vocabulary)
//   application/ld+json  -> the JSON-LD context, where one is published
//   text/html (default)  -> the human documentation (GitHub Pages render where
//                           it exists, otherwise the repository README)
// Hash-namespace vocabularies (…#Term) work by construction: the fragment never
// reaches the server, so the namespace document URI is what resolves.
//
// A representation that does not exist for an entry falls back to the best
// available one (html -> turtle -> jsonld): for a persistent-identifier layer,
// resolvability beats a 406.

/** Where a namespace's representations live. All URLs must be publicly reachable. */
export interface PersistentIdEntry {
  /** Path under the tree root, no leading/trailing slash (e.g. "sectors/futures"). */
  slug: string;
  tree: "ns" | "spec";
  title: string;
  /** Conventional Turtle prefix, where one is established. */
  prefix?: string;
  /**
   * The legacy w3id.org IRI this entry is the designated successor of, for a
   * namespace that was drafted under w3id.org before the no-w3id directive.
   * Omit entirely for a namespace minted directly under jeswr.org from
   * inception (the standing rule going forward) — it never had a w3id
   * predecessor to document.
   */
  w3id?: string;
  /** GitHub repository (owner/name) that mints/documents the namespace. */
  repo?: string;
  /** Raw Turtle representation (raw.githubusercontent.com, pinned to main). */
  turtle?: string;
  /** JSON-LD context, where published. */
  jsonld?: string;
  /** Human documentation (GitHub Pages page or repository README). */
  html?: string;
  /**
   * Registered but not yet publicly resolvable (the minting repo is private or
   * not yet published). Listed on the /ns index; the route answers 404 with an
   * explanation until the artifact is public.
   */
  pending?: boolean;
}

const RAW = "https://raw.githubusercontent.com";
const GH = "https://github.com";
const FED_RAW = `${RAW}/jeswr/solid-federation-vocab/main/docs`;
const FED_PAGES = "https://jeswr.github.io/solid-federation-vocab";

/** The federation-vocab sector vocabularies (docs/ artifacts verified live). */
const SECTORS: ReadonlyArray<{ name: string; prefix: string; title: string }> =
  [
    {
      name: "bookmarks",
      prefix: "bookmark",
      title: "Bookmarks sector vocabulary",
    },
    {
      name: "collectibles",
      prefix: "col",
      title: "Collectibles sector vocabulary",
    },
    {
      name: "contacts",
      prefix: "contact",
      title: "Contacts sector vocabulary",
    },
    { name: "drawing", prefix: "drawing", title: "Drawing sector vocabulary" },
    { name: "equine", prefix: "eq", title: "Equine sector vocabulary" },
    { name: "finance", prefix: "fin", title: "Finance sector vocabulary" },
    {
      name: "futures",
      prefix: "fut",
      title: "Futures (participatory democracy) sector vocabulary",
    },
    { name: "health", prefix: "health", title: "Health sector vocabulary" },
    { name: "identity", prefix: "id", title: "Identity sector vocabulary" },
    { name: "media", prefix: "media", title: "Media sector vocabulary" },
    {
      name: "scheduling",
      prefix: "sched",
      title: "Scheduling sector vocabulary",
    },
    { name: "social", prefix: "social", title: "Social sector vocabulary" },
  ];

function sectorEntry(s: {
  name: string;
  prefix: string;
  title: string;
}): PersistentIdEntry {
  return {
    slug: `sectors/${s.name}`,
    tree: "ns",
    title: s.title,
    prefix: s.prefix,
    w3id: `https://w3id.org/jeswr/sectors/${s.name}`,
    repo: "jeswr/solid-federation-vocab",
    turtle: `${FED_RAW}/sectors/${s.name}.ttl`,
    jsonld: `${FED_RAW}/sectors/${s.name}-context.jsonld`,
    html: `${FED_PAGES}/sectors/${s.name}.html`,
  };
}

export const PERSISTENT_IDS: ReadonlyArray<PersistentIdEntry> = [
  // ── solid-federation-vocab (GitHub Pages from docs/ on main) ─────────────
  {
    slug: "fed",
    tree: "ns",
    title: "Federation application vocabulary (fedapp)",
    prefix: "fedapp",
    w3id: "https://w3id.org/jeswr/fed",
    repo: "jeswr/solid-federation-vocab",
    turtle: `${FED_RAW}/fed.ttl`,
    jsonld: `${FED_RAW}/context.jsonld`,
    html: `${FED_PAGES}/fed.html`,
  },
  {
    slug: "fedreg",
    tree: "ns",
    title: "Federation catalogue / registry vocabulary",
    prefix: "fedreg",
    w3id: "https://w3id.org/jeswr/fedreg",
    repo: "jeswr/solid-federation-vocab",
    turtle: `${FED_RAW}/fedreg.ttl`,
    jsonld: `${FED_RAW}/fedreg-context.jsonld`,
    html: `${FED_PAGES}/fedreg.html`,
  },
  {
    slug: "task",
    tree: "ns",
    title: "Federated task / issue model vocabulary",
    prefix: "tm",
    w3id: "https://w3id.org/jeswr/task",
    repo: "jeswr/solid-federation-vocab",
    turtle: `${FED_RAW}/task.ttl`,
    jsonld: `${FED_RAW}/task-context.jsonld`,
    html: `${FED_PAGES}/task.html`,
  },
  {
    slug: "core",
    tree: "ns",
    title: "Suite core vocabulary",
    prefix: "core",
    w3id: "https://w3id.org/jeswr/core",
    repo: "jeswr/solid-federation-vocab",
    turtle: `${FED_RAW}/core.ttl`,
    jsonld: `${FED_RAW}/core-context.jsonld`,
    html: `${FED_PAGES}/core.html`,
  },
  ...SECTORS.map(sectorEntry),
  {
    slug: "sectors/health/diet",
    tree: "ns",
    title: "Diet / food-intolerance sector vocabulary",
    prefix: "diet",
    w3id: "https://w3id.org/jeswr/sectors/health/diet",
    repo: "jeswr/solid-federation-vocab",
    turtle: `${FED_RAW}/sectors/health/diet.ttl`,
    jsonld: `${FED_RAW}/sectors/health/diet-context.jsonld`,
    html: `${FED_PAGES}/sectors/health/diet.html`,
  },

  // ── standalone vocabulary repos with a published Turtle artifact ─────────
  {
    slug: "bookmark",
    tree: "ns",
    title: "Bookmarks / read-it-later data model",
    prefix: "book",
    w3id: "https://w3id.org/jeswr/bookmark",
    repo: "jeswr/solid-bookmark",
    turtle: `${RAW}/jeswr/solid-bookmark/main/bookmark.ttl`,
    html: `${GH}/jeswr/solid-bookmark`,
  },
  {
    slug: "drawing",
    tree: "ns",
    title: "Vector-drawing / whiteboard scene data model",
    prefix: "draw",
    w3id: "https://w3id.org/jeswr/drawing",
    repo: "jeswr/solid-drawing",
    turtle: `${RAW}/jeswr/solid-drawing/main/drawing.ttl`,
    html: `${GH}/jeswr/solid-drawing`,
  },
  {
    slug: "spec-companion",
    tree: "ns",
    title: "Spec-companion vocabulary (normative-statement metadata)",
    prefix: "sc",
    w3id: "https://w3id.org/jeswr/spec-companion",
    repo: "jeswr/spec-companion",
    turtle: `${RAW}/jeswr/spec-companion/main/vocab/spec-companion.ttl`,
    html: `${GH}/jeswr/spec-companion`,
  },

  // ── vocabularies minted in code (no standalone Turtle published yet) ─────
  // The html target is the minting repository; authoring a vocabulary Turtle
  // document per namespace is part of the staged migration (docs/persistent-ids.md).
  {
    slug: "pod-chat",
    tree: "ns",
    title: "Canonical chat-message interop vocabulary",
    prefix: "pc",
    w3id: "https://w3id.org/jeswr/pod-chat",
    repo: "jeswr/solid-chat-interop",
    html: `${GH}/jeswr/solid-chat-interop`,
  },
  {
    slug: "memory",
    tree: "ns",
    title: "Agent-memory vocabulary",
    prefix: "mem",
    w3id: "https://w3id.org/jeswr/memory",
    repo: "jeswr/solid-memory",
    html: `${GH}/jeswr/solid-memory`,
  },
  {
    slug: "solid-vc",
    tree: "ns",
    title: "Solid Verifiable Credentials vocabulary",
    w3id: "https://w3id.org/jeswr/solid-vc",
    repo: "jeswr/solid-vc",
    html: `${GH}/jeswr/solid-vc`,
  },
  {
    slug: "odrl-delegation",
    tree: "ns",
    title: "ODRL delegation profile vocabulary",
    prefix: "odrld",
    w3id: "https://w3id.org/jeswr/odrl-delegation",
    repo: "jeswr/solid-odrl",
    html: `${GH}/jeswr/solid-odrl`,
  },
  {
    slug: "a2a",
    tree: "ns",
    title: "A2A extension vocabulary",
    prefix: "a2a",
    w3id: "https://w3id.org/jeswr/a2a",
    repo: "jeswr/solid-a2a",
    html: `${GH}/jeswr/solid-a2a`,
  },
  {
    slug: "fedtrust",
    tree: "ns",
    title: "Federation trust / signed-membership vocabulary",
    prefix: "fedtrust",
    w3id: "https://w3id.org/jeswr/fedtrust",
    repo: "jeswr/federation-trust",
    html: `${GH}/jeswr/federation-trust`,
  },
  {
    slug: "accm",
    tree: "ns",
    title: "Access-manager consent / grant vocabulary",
    prefix: "accm",
    w3id: "https://w3id.org/jeswr/accm",
    repo: "jeswr/solid-access-manager",
    html: `${GH}/jeswr/solid-access-manager`,
  },
  {
    slug: "community",
    tree: "ns",
    title: "Community-feeds vocabulary",
    w3id: "https://w3id.org/jeswr/community",
    repo: "jeswr/solid-community-feeds",
    html: `${GH}/jeswr/solid-community-feeds`,
  },
  {
    slug: "pod-docs",
    tree: "ns",
    title: "Pod documents vocabulary",
    prefix: "pd",
    w3id: "https://w3id.org/jeswr/pod-docs",
    repo: "jeswr/pod-docs",
    html: `${GH}/jeswr/pod-docs`,
  },
  {
    slug: "pod-drive",
    tree: "ns",
    title: "Pod drive vocabulary",
    w3id: "https://w3id.org/jeswr/pod-drive",
    repo: "jeswr/pod-drive",
    html: `${GH}/jeswr/pod-drive`,
  },
  {
    slug: "pod-money",
    tree: "ns",
    title: "Pod money vocabulary",
    w3id: "https://w3id.org/jeswr/pod-money",
    repo: "jeswr/pod-money",
    html: `${GH}/jeswr/pod-money`,
  },

  // ── registered but not yet publicly resolvable ───────────────────────────
  {
    // Minted directly under jeswr.org from inception — no w3id.org predecessor
    // (an earlier design draft briefly proposed one; fixed before the repo was
    // ever published, so there is nothing to document here). Not yet on
    // GitHub, hence `pending`; the turtle/html targets below are the intended
    // post-publish representations, ready to resolve the moment the repo goes
    // public — flip `pending` to false then (verify each URL answers 200 first).
    slug: "integrity",
    tree: "ns",
    title: "Integrity abstraction vocabulary (property-profile, fail-closed)",
    prefix: "integrity",
    repo: "jeswr/integrity",
    turtle: `${RAW}/jeswr/integrity/main/integrity.ttl`,
    html: `${GH}/jeswr/integrity`,
    pending: true,
  },
  {
    slug: "solid-problem",
    tree: "ns",
    title: "Solid problem-details vocabulary (prod-solid-server)",
    w3id: "https://w3id.org/jeswr/solid-problem",
    pending: true,
  },
  {
    slug: "agentic",
    tree: "ns",
    title: "Agentic-web vision vocabulary",
    w3id: "https://w3id.org/jeswr/agentic",
    pending: true,
  },
  {
    slug: "interop",
    tree: "ns",
    title: "Standards-interoperability map vocabulary",
    w3id: "https://w3id.org/jeswr/interop",
    pending: true,
  },
  {
    slug: "ac-sparql",
    tree: "ns",
    title: "Access-controlled SPARQL vocabulary",
    w3id: "https://w3id.org/jeswr/ac-sparql",
    pending: true,
  },
  {
    slug: "fdc3",
    tree: "ns",
    title: "FDC3-on-Solid vocabulary",
    w3id: "https://w3id.org/jeswr/fdc3",
    pending: true,
  },
  {
    slug: "apps",
    tree: "ns",
    title: "App-local namespaces (per-application terms)",
    w3id: "https://w3id.org/jeswr/apps/",
    pending: true,
  },

  // ── versioned specification identifiers (tree "spec") ────────────────────
  {
    slug: "dpop-sk/v1",
    tree: "spec",
    title: "DPoP-SK — DPoP session-key proof-of-possession negotiation profile",
    w3id: "https://w3id.org/jeswr/dpop-sk/v1",
    repo: "jeswr/dpop-sk-spec",
    turtle: `${RAW}/jeswr/dpop-sk-spec/main/spec.statements.ttl`,
    html: `${GH}/jeswr/dpop-sk-spec`,
  },
  {
    slug: "a2a-rdf/v1",
    tree: "spec",
    title: "A2A RDF protocol-document extension",
    w3id: "https://w3id.org/jeswr/a2a-rdf/v1",
    repo: "jeswr/a2a-rdf-extension",
    turtle: `${RAW}/jeswr/a2a-rdf-extension/main/spec.statements.ttl`,
    html: `${GH}/jeswr/a2a-rdf-extension`,
  },
  {
    slug: "lws",
    tree: "spec",
    title: "Linked Web Storage — clean-slate specification suite",
    w3id: "https://w3id.org/jeswr/lws",
    repo: "jeswr/lws-spec",
    turtle: `${RAW}/jeswr/lws-spec/main/index.statements.ttl`,
    html: `${GH}/jeswr/lws-spec`,
  },
  {
    slug: "lws/transform/rdf-1",
    tree: "spec",
    title: "LWS RDF transform profile",
    w3id: "https://w3id.org/jeswr/lws/transform/rdf-1",
    repo: "jeswr/lws-spec",
    turtle: `${RAW}/jeswr/lws-spec/main/rdf-transform.statements.ttl`,
    html: `${GH}/jeswr/lws-spec`,
  },
];

// ─── resolution ─────────────────────────────────────────────────────────────

/**
 * Longest-prefix match: `/ns/sectors/finance/profile/1.2.0` resolves to the
 * `sectors/finance` entry — every IRI minted under a registered namespace
 * (versioned data-profiles, slash sub-terms like `a2a-rdf/v1/kind`) 303s to
 * that namespace's representations.
 */
export function findEntry(
  tree: "ns" | "spec",
  segments: ReadonlyArray<string>,
): PersistentIdEntry | undefined {
  let best: PersistentIdEntry | undefined;
  let bestLen = -1;

  for (const entry of PERSISTENT_IDS) {
    if (entry.tree !== tree) continue;
    const parts = entry.slug.split("/");

    if (parts.length > segments.length) continue;
    if (parts.length <= bestLen) continue;
    if (parts.every((p, i) => p === segments[i])) {
      best = entry;
      bestLen = parts.length;
    }
  }

  return best;
}

/** Media types we can negotiate, in server-preference order (html wins ties/wildcards). */
const REP_TYPES: ReadonlyArray<{
  rep: "html" | "turtle" | "jsonld";
  type: string;
}> = [
  { rep: "html", type: "text/html" },
  { rep: "html", type: "application/xhtml+xml" },
  { rep: "turtle", type: "text/turtle" },
  { rep: "jsonld", type: "application/ld+json" },
];

/**
 * Pick the redirect target for an entry given the client's Accept preferences
 * (an ordered list of acceptable media types, most-preferred first — the
 * caller derives it via `negotiator`). Falls back to the best available
 * representation when nothing acceptable exists: a persistent identifier must
 * resolve to SOMETHING (resolvability beats a 406).
 */
export function pickTarget(
  entry: PersistentIdEntry,
  preferredTypes: ReadonlyArray<string>,
): { url: string; mediaType: string } | undefined {
  const available = REP_TYPES.filter(({ rep }) => entry[rep] !== undefined);

  for (const type of preferredTypes) {
    const match = available.find((c) => c.type === type);

    if (match) return { url: entry[match.rep]!, mediaType: match.type };
  }

  // Fallback: first available in server-preference order (html -> turtle -> jsonld).
  const first = available[0];

  if (first) return { url: entry[first.rep]!, mediaType: first.type };

  return undefined;
}

/** The media types available for an entry, in server-preference order. */
export function availableTypes(entry: PersistentIdEntry): string[] {
  return REP_TYPES.filter(({ rep }) => entry[rep] !== undefined).map(
    (c) => c.type,
  );
}

/**
 * Legacy surface: before this conneg layer, `/ns/:path*` was a path-preserving
 * proxy of the solid-federation-vocab GitHub Pages site. Unmatched /ns/ paths
 * (e.g. `/ns/fedreg.ttl`, `/ns/sectors/futures.shacl.ttl`) keep resolving by
 * 303 to the same Pages URL, so no previously-served URL goes dark.
 */
export function legacyPagesUrl(segments: ReadonlyArray<string>): string {
  return `${FED_PAGES}/${segments.map(encodeURIComponent).join("/")}`;
}
