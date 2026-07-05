// AUTHORED-BY Claude Fable 5
//
// The shared GET handler for the ANP Agent Description, served at BOTH
//   /agent                          (the agent IRI — the WebID→agent pointer
//                                    target; the RDF subject === this URL), and
//   /.well-known/agent-descriptions (the ANP discovery path,
//                                    @jeswr/solid-agent-card's agentDescriptionsUrl).
//
// The document bytes are GENERATED (config/agent-description.generated.ts,
// projected from scripts/agent/descriptor.mjs via @jeswr/solid-agent-card's
// describeAgent) — this handler only negotiates the encoding. Both paths are
// EXCLUDED from middleware.ts's RDFa-conneg matcher: this handler owns its own
// negotiation, with the pinned inline JSON-LD context the generic RDFa
// transform pipeline would not preserve.

import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

import {
  AGENT_DESCRIPTION_JSONLD,
  AGENT_DESCRIPTION_TURTLE,
} from "@/config/agent-description.generated";

const TURTLE = "text/turtle";
const JSONLD = "application/ld+json";
// Plain application/json clients get the JSON-LD document (it IS valid JSON;
// A2A-adjacent tooling often asks for application/json).
const JSON_PLAIN = "application/json";
// A human's browser: redirect to the homepage — the human-readable description
// of this agent's owner — rather than serving raw RDF.
const HTML_TYPES = ["text/html", "application/xhtml+xml"];

export type AgentDescriptionMediaType = typeof TURTLE | typeof JSONLD;

/**
 * Serve the Agent Description, negotiated on Accept.
 *
 * @param request - the incoming request.
 * @param defaultType - the encoding for clients with no preference: Turtle at
 *   /agent (Solid-native), JSON-LD at /.well-known/agent-descriptions
 *   (ANP-aligned).
 */
export function agentDescriptionResponse(
  request: NextRequest,
  defaultType: AgentDescriptionMediaType,
): NextResponse {
  const accept = request.headers.get("accept");
  let chosen: AgentDescriptionMediaType = defaultType;

  // No Accept, or a bare wildcard: the default encoding (mirrors middleware.ts).
  if (accept && accept.trim() !== "" && accept.trim() !== "*/*") {
    const negotiator = new Negotiator({ headers: { accept } });
    const top = negotiator.mediaTypes([
      TURTLE,
      JSONLD,
      JSON_PLAIN,
      ...HTML_TYPES,
    ])[0];

    if (top && HTML_TYPES.includes(top)) {
      // 303 See Other — "a human-readable description is over there". The
      // redirect varies on Accept (an RDF client on the same URL gets a body).
      return NextResponse.redirect(new URL("/", request.url), {
        status: 303,
        headers: { Vary: "Accept" },
      });
    }
    if (top === JSONLD || top === JSON_PLAIN) {
      chosen = JSONLD;
    } else if (top === TURTLE) {
      chosen = TURTLE;
    }
    // Nothing we offer was acceptable: fall through to the default encoding
    // rather than a hostile 406 — every consumer here is RDF-capable anyway.
  }

  const body =
    chosen === TURTLE ? AGENT_DESCRIPTION_TURTLE : AGENT_DESCRIPTION_JSONLD;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": `${chosen}; charset=utf-8`,
      // This representation was chosen by content negotiation on Accept.
      Vary: "Accept",
    },
  });
}
