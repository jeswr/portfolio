<!-- AUTHORED-BY Claude Fable 5 -->

# Persistent identifiers on jeswr.org

The persistent-identifier layer for the vocabularies and specifications built in the
@jeswr Solid suite. Maintainer directive: persistent IDs are served as redirects from
this site (`jeswr.org`, Vercel, deploy-on-push) — **no PRs to w3id.org**.

## Canonical URI scheme

| Kind | Pattern | Example |
|---|---|---|
| RDF vocabulary namespace | `https://jeswr.org/ns/<name>` | `https://jeswr.org/ns/fedreg` (terms: `…/ns/fedreg#Membership`) |
| Versioned specification identifier | `https://jeswr.org/spec/<name>/<version>` | `https://jeswr.org/spec/dpop-sk/v1` |

Rationale:

- **`/ns/` for vocabularies** mirrors the widely-used convention (w3id `/ns/`, W3C
  `/ns/`), and the path was already reserved on this site for the vocabulary
  namespace surface.
- **`/spec/` for versioned specification IDs** keeps identifier-of-a-spec-version
  (DPoP-SK v1, A2A-RDF v1, the LWS protocol versions) distinct from
  identifier-of-a-vocabulary-term. Spec IRIs carry their version in the path and mint
  slash sub-terms (e.g. `…/a2a-rdf/v1/kind`), which a hash vocabulary cannot.
- **Apex `jeswr.org`** is the maintainer-controlled permanent domain (it is also his
  WebID document), served over TLS with deploy-on-push — the durability properties a
  PID host needs, without depending on the w3id.org review queue.

## Resolution mechanics

- Registry: [`config/persistent-ids.ts`](../config/persistent-ids.ts) — one data
  entry per namespace (`slug`, tree, title, prefix, the legacy w3id IRI, and the
  representation URLs). Route handlers:
  [`app/ns/[...slug]/route.ts`](../app/ns/%5B...slug%5D/route.ts) and
  [`app/spec/[...slug]/route.ts`](../app/spec/%5B...slug%5D/route.ts), sharing
  [`app/ns/handler.ts`](../app/ns/handler.ts).
- **Longest-prefix match**: any IRI minted under a registered namespace
  (`/ns/sectors/finance/profile/1.2.0`, `/spec/a2a-rdf/v1/kind`,
  `/spec/lws/problems/unparseable-source`) resolves to that namespace's
  representations. Hash-namespace terms work by construction — the fragment never
  reaches the server.
- **`303 See Other`**, content-negotiated on `Accept`
  (Linked-Data best practice for non-information resources):
  - `text/turtle` → the raw Turtle on GitHub, **pinned to `main`** (never a sha), so
    the redirect tracks the living vocabulary;
  - `application/ld+json` → the JSON-LD context, where one is published;
  - `text/html` / absent / wildcard `Accept` → the human documentation (GitHub Pages
    render where Pages is enabled, otherwise the repository README).
  A representation the entry lacks falls back to the best available one
  (html → turtle → json-ld): a PID must resolve to *something*; a 406 helps nobody.
- **`Vary: Accept`** on every response — declared both in the handler and in
  `next.config.js` `headers()` (Next's router owns Vary on some response paths; the
  config copy is the cache-correctness one, same as `/` and `/agent`).
- **Legacy surface preserved**: `/ns/:path*` was previously a path-preserving proxy
  of the solid-federation-vocab GitHub Pages site. Unregistered `/ns/` paths
  (`/ns/fedreg.ttl`, `/ns/sectors/futures.shacl.ttl`, …) now answer 303 to the same
  Pages URL, so no previously-served URL goes dark. The rewrite itself had to go: an
  `afterFiles` rewrite runs before dynamic routes and would have shadowed the conneg
  handler.
- **Pending entries** (minting repo private or unpublished) answer 404 with an
  explanation and are listed on the [`/ns` index](https://jeswr.org/ns).
- Both trees are excluded from the homepage RDFa-conneg middleware
  (`middleware.ts` matcher) — the middleware's inner fetch would otherwise follow
  the 303 and re-parse the redirect target as homepage RDFa.

## Adding a namespace

Add one entry to `PERSISTENT_IDS` in `config/persistent-ids.ts` (the `/ns` index
page and both route handlers are registry-driven). Verify each representation URL
answers 200 before committing. Point `turtle` at
`raw.githubusercontent.com/...`/`main`/... — never a commit sha.

## Namespace inventory (2026-07, from a suite-wide grep for `w3id.org/jeswr`)

Legend: **served** = publicly resolvable representations registered here;
**pending** = registered, minting repo private/unpublished.

| Namespace (w3id form) | Prefix | Minting repo | Served artifact | Status |
|---|---|---|---|---|
| `…/fed#` | `fedapp:` | solid-federation-vocab | `docs/fed.ttl` + `docs/context.jsonld` + Pages `fed.html` | served `/ns/fed` |
| `…/fedreg#` | `fedreg:` | solid-federation-vocab | `docs/fedreg.ttl` + context + Pages | served `/ns/fedreg` |
| `…/task#` | `tm:` | solid-federation-vocab | `docs/task.ttl` + context + Pages | served `/ns/task` |
| `…/core#` | `core:` | solid-federation-vocab | `docs/core.ttl` + context + Pages | served `/ns/core` |
| `…/sectors/<s>#` ×12 (bookmarks, collectibles, contacts, drawing, equine, finance, futures (`fut:`), health, identity, media, scheduling, social) | per-sector | solid-federation-vocab | `docs/sectors/<s>.ttl` + context + Pages | served `/ns/sectors/<s>` |
| `…/sectors/health/diet#` | `diet:` | solid-federation-vocab | `docs/sectors/health/diet.ttl` + context + Pages | served |
| `…/sectors/<s>/profile/<ver>`, `…/sectors/<s>/<ver>` | — | solid-federation-vocab | version IRIs under a sector | served via prefix match |
| `…/bookmark#` | `book:` | solid-bookmark | `bookmark.ttl` | served `/ns/bookmark` |
| `…/drawing#` | `draw:` | solid-drawing | `drawing.ttl` | served `/ns/drawing` |
| `…/spec-companion#` | `sc:` | spec-companion | `vocab/spec-companion.ttl` | served `/ns/spec-companion` |
| `…/pod-chat#` | `pc:` | solid-chat-interop | terms in `src/vocab.ts`; no vocab TTL | served (html only) |
| `…/memory#` | `mem:` | solid-memory | terms in code; no vocab TTL | served (html only) |
| `…/solid-vc#` | — | solid-vc | terms in `src/credential.ts` | served (html only) |
| `…/odrl-delegation#` (+ slashless profile IRI) | `odrld:` | solid-odrl | terms in `src/vocab.ts` | served (html only) |
| `…/a2a#` | `a2a:` | solid-a2a | terms in `src/vocab.ts` | served (html only) |
| `…/fedtrust#` | `fedtrust:` | federation-trust | terms in `src/vocab.ts` | served (html only) |
| `…/accm#` | `accm:` | solid-access-manager | terms in `src/lib/vocab.ts` | served (html only) |
| `…/community#` | — | solid-community-feeds | terms in `src/activitystreams.ts` | served (html only) |
| `…/pod-docs#` | `pd:` | pod-docs | terms in code | served (html only) |
| `…/pod-drive#`, `…/pod-money#` | — | pod-drive / pod-money | terms in code | served (html only) |
| `…/dpop-sk/v1` | — | dpop-sk-spec | `index.html` (ReSpec) + `spec.statements.ttl` | served `/spec/dpop-sk/v1` |
| `…/a2a-rdf/v1` (+ `/kind`, `/protocolHash`, …) | — | a2a-rdf-extension | `index.html` + `spec.statements.ttl` | served `/spec/a2a-rdf/v1` |
| `…/lws`, `…/lws/v1`, `…/lws/protocol/core/1.0`, `…/lws/access-profile/odrl-1`, `…/lws/problems/*` | — | lws-spec | `index.html` + `index.statements.ttl` | served `/spec/lws` (prefix) |
| `…/lws/transform/rdf-1` | — | lws-spec | `rdf-transform.html` + `rdf-transform.statements.ttl` | served `/spec/lws/transform/rdf-1` |
| `…/solid-problem#` | — | prod-solid-server (private) | `src/http/problemTypes.ts` | pending |
| `…/agentic#` | — | agentic-solid-vision (unpublished) | — | pending |
| `…/interop#`, `…/interop/...`, `…/ac-sparql#` | — | standards-interop-map (unpublished) | `schema/interop.ttl` | pending |
| `…/fdc3#` | — | fdc3-solid (private) | `src/rdf/vocab.ts` | pending |
| `…/apps/{keystone,capnote,provena}#` | — | product-2/3/4 (private) | app-local terms | pending (grouped `/ns/apps`) |
