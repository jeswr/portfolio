// AUTHORED-BY Claude Fable 5
//
// Versioned specification persistent identifiers: https://jeswr.org/spec/<name>/<version>
// Accept-negotiated 303 redirects to the specification's representations.
// Registry: config/persistent-ids.ts; design: docs/persistent-ids.md.
import { NextRequest } from "next/server";

import { handlePersistentId } from "../../ns/handler";

export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ slug?: string[] }> },
) {
  return handlePersistentId(request, "spec", ctx.params);
}
