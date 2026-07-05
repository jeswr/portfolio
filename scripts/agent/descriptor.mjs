// AUTHORED-BY Claude Fable 5
//
// The SINGLE SOURCE for Jesse's agent self-description. Everything served by the
// site — the A2A Agent Card (public/.well-known/agent-card.json), the ANP Agent
// Description (/agent + /.well-known/agent-descriptions, via
// config/agent-description.generated.ts) and the WebID→agent pointer on the
// homepage RDFa — is projected from THIS object via @jeswr/solid-agent-card's
// describeAgent/buildAgentPointer (never hand-built). Edit here, then:
//   cd scripts/agent && npm install && npm run generate && npm run verify

/** The maintainer's WebID — the principal the agent represents (ad:owner). */
export const OWNER_WEBID = "https://jeswr.org/#me";

/**
 * The agent's IRI. Deliberately the fragment-less DOCUMENT URL `/agent` on the
 * canonical apex origin (the same pattern as @jeswr/solid-agent-card's own
 * canonical usage, e.g. `https://alice.pod.example/agent`):
 *   - `discoverAgent` fetches the pointer target and requires the Agent
 *     Description subject to EQUAL it (the subject-binding spoofing guard), so
 *     id === the URL the description is served at binds trivially;
 *   - the AgentDescriptor.id semantics are "the agent's stable endpoint / id",
 *     i.e. an endpoint-shaped IRI, not a `#fragment` thing-IRI;
 *   - a fragment id (`/agent#this`) would also make the A2A card's derived
 *     `x-solid.agentDescription` (`${id}#ad`) an invalid double-fragment IRI.
 */
export const AGENT_IRI = "https://jeswr.org/agent";

/**
 * The Solid-OIDC issuer the agent authenticates through — the SAME issuer the
 * owner WebID trusts (config/site.ts `oidcIssuer`, emitted as solid:oidcIssuer
 * on https://jeswr.org/#me).
 */
export const OIDC_ISSUER = "https://idp.solid-test.jeswr.org";

/**
 * The AgentDescriptor (see @jeswr/solid-agent-card's AgentDescriptor type).
 *
 * Honesty notes (this is a public identity claim):
 *   - NO skills are advertised: nothing is live yet, and advertising placeholder
 *     capabilities on the maintainer's identity origin would over-claim. Add
 *     skills here only when the agent actually serves them.
 *   - The description says outright that no live task endpoint exists yet —
 *     this descriptor is the M1 discovery pointer ("the WebID points to an
 *     agent"), not a claim of a running A2A service.
 */
export const descriptor = {
  id: AGENT_IRI,
  name: "Jesse Wright's agent",
  description:
    "The personal agent representing Jesse Wright (WebID https://jeswr.org/#me). " +
    "Under active development: this descriptor is the discovery pointer — the " +
    "agent does not yet expose a live task endpoint. To reach Jesse, use the " +
    "contact details in his WebID profile at https://jeswr.org/.",
  owner: OWNER_WEBID,
  securitySchemes: [
    {
      type: "solid-oidc",
      issuer: OIDC_ISSUER,
      description:
        "WebID + Solid-OIDC with DPoP-bound tokens (RFC 9449). The issuer is the " +
        "same one the owner's WebID trusts (solid:oidcIssuer).",
    },
  ],
};

/**
 * The pointer predicate(s) the homepage WebID profile publishes — kept IN SYNC
 * with the `rel=` on the pointer span in app/page.tsx so verify.mjs's stub
 * profile tests exactly what the site emits. `interop:hasAuthorizationAgent`
 * ALONE: the SAI "agent that represents you" (discoverAgent's priority-1
 * predicate). NOT `schema:agent` — schema.org defines `agent` on Action, not
 * Person, so it is domain-incorrect on <#me>, and redundant once the correct
 * Solid-interop predicate is present.
 */
export const POINTER_PREDICATES = ["interop:hasAuthorizationAgent"];
