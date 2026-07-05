// AUTHORED-BY Claude Fable 5
//
// https://jeswr.org/agent — the agent's IRI. Serves the ANP Agent Description
// (subject === this URL, so discoverAgent's subject-binding holds), Turtle by
// default, JSON-LD via conneg; browsers are 303-redirected to the homepage.
// See app/agent/handler.ts.

import { NextRequest, NextResponse } from "next/server";

import { agentDescriptionResponse } from "./handler";

export function GET(request: NextRequest): NextResponse {
  return agentDescriptionResponse(request, "text/turtle");
}
