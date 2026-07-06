// AUTHORED-BY Claude Fable 5
//
// Vocabulary-namespace persistent identifiers: https://jeswr.org/ns/<name>
// Accept-negotiated 303 redirects to the vocabulary's representations.
// Registry: config/persistent-ids.ts; design: docs/persistent-ids.md.
import { NextRequest } from "next/server";

import { handlePersistentId } from "../handler";

export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ slug?: string[] }> },
) {
  return handlePersistentId(request, "ns", ctx.params);
}
