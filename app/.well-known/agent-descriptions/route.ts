// AUTHORED-BY Claude Fable 5
//
// /.well-known/agent-descriptions — the ANP Agent Description discovery path
// (@jeswr/solid-agent-card's agentDescriptionsUrl for this origin). Serves the
// SAME generated document as /agent (whose URL is the description's RDF
// subject), JSON-LD by default (ANP-aligned), Turtle via conneg.
// See app/agent/handler.ts.

import { NextRequest, NextResponse } from "next/server";

import { agentDescriptionResponse } from "../../agent/handler";

export function GET(request: NextRequest): NextResponse {
  return agentDescriptionResponse(request, "application/ld+json");
}
