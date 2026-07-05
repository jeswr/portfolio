// AUTHORED-BY Claude Fable 5
//
// The shared artifact builder: projects scripts/agent/descriptor.mjs into the
// exact bytes of every committed artifact. Used by BOTH generate.mjs (writes
// them) and verify.mjs (re-derives them and diffs against the committed copies,
// so the committed artifacts can never silently drift from the descriptor).
//
// All document construction goes through @jeswr/solid-agent-card
// (describeAgent / buildAgentPointer) — no hand-built RDF, no hand-built card.

import { buildAgentPointer, describeAgent } from "@jeswr/solid-agent-card";
import { AGENT_IRI, OWNER_WEBID, POINTER_PREDICATES, descriptor } from "./descriptor.mjs";

/**
 * Build every artifact as a string, keyed by repo-relative path.
 *
 * @returns {Promise<{
 *   artifacts: Record<string, string>,
 *   turtle: string,
 *   jsonld: string,
 *   card: Record<string, unknown>,
 *   pointerTurtle: string,
 * }>}
 */
export async function buildArtifacts() {
  const documents = describeAgent(descriptor);

  // The A2A card, with two deliberate, package-blessed post-edits (the card is
  // plain JSON; describeAgent's own comment invites post-editing these fields):
  //   1. DROP `preferredTransport` ("JSONRPC"): the agent exposes NO live
  //      JSON-RPC endpoint yet — advertising a transport would over-claim on the
  //      maintainer's identity origin. The card's `url` is the agent IRI, which
  //      serves the Agent Description document itself.
  //   2. `x-solid.agentDescription`: the builder's default convention is
  //      `${id}#ad`, but this site serves the RDF Agent Description AT the agent
  //      IRI itself (subject === document URL), so point there.
  const { preferredTransport: _dropped, ...builtCard } = documents.agentCard;
  const card = {
    ...builtCard,
    "x-solid": { ...builtCard["x-solid"], agentDescription: AGENT_IRI },
  };

  const turtle = await documents.agentDescription.toTurtle();
  const jsonldDoc = await documents.agentDescription.toJsonLd();
  const jsonld = `${JSON.stringify(jsonldDoc, null, 2)}\n`;

  // The canonical WebID→agent pointer quads (what the homepage RDFa must emit).
  const pointerTurtle = await buildAgentPointer(
    OWNER_WEBID,
    AGENT_IRI,
    POINTER_PREDICATES,
  ).toString();

  const artifacts = {
    "public/.well-known/agent-card.json": `${JSON.stringify(card, null, 2)}\n`,
    "config/agent-description.generated.ts": renderGeneratedModule(turtle, jsonld),
  };

  return { artifacts, turtle, jsonld, card, pointerTurtle };
}

/** Render the TypeScript module the /agent route handlers import. */
function renderGeneratedModule(turtle, jsonld) {
  return `// AUTHORED-BY Claude Fable 5
// GENERATED FILE — do not edit by hand. Single source: scripts/agent/descriptor.mjs.
// Regenerate:  cd scripts/agent && npm install && npm run generate
// Self-verify: cd scripts/agent && npm run verify
//   (byte-freshness against this file + a discoverAgent round-trip with the
//    owner back-link required — see scripts/agent/verify.mjs)
//
// This is the ANP Agent Description served at /agent and
// /.well-known/agent-descriptions (app/agent/handler.ts). The A2A Agent Card
// lives at public/.well-known/agent-card.json. Both are projected from the ONE
// descriptor via @jeswr/solid-agent-card's describeAgent, so they cannot drift.

/** The agent's IRI — the WebID→agent pointer target AND the AD document URL. */
export const AGENT_IRI = ${JSON.stringify(AGENT_IRI)};

/** The WebID the agent represents (the ad:owner back-link). */
export const OWNER_WEBID = ${JSON.stringify(OWNER_WEBID)};

/** The ANP Agent Description, as Turtle. */
export const AGENT_DESCRIPTION_TURTLE = ${JSON.stringify(turtle)};

/** The ANP Agent Description, as a pre-serialised JSON-LD document. */
export const AGENT_DESCRIPTION_JSONLD = ${JSON.stringify(jsonld)};
`;
}
