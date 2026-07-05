#!/usr/bin/env node
// AUTHORED-BY Claude Fable 5
//
// SELF-VERIFY the hosted agent descriptors — fail-closed (exits non-zero on the
// first broken invariant). Three layers:
//
//  1. FRESHNESS — every committed artifact byte-matches a fresh build from
//     scripts/agent/descriptor.mjs (the check:dist pattern), so what the site
//     serves is exactly what describeAgent produced.
//
//  2. DISCOVERY — @jeswr/solid-agent-card's own consumer path resolves the
//     agent from the owner WebID with { requireOwnerMatch: true }: the profile
//     pointer (built by buildAgentPointer — the same triples the homepage RDFa
//     emits) leads to the Agent Description, verification passes, and the
//     ad:owner back-link binds (exactly one ad:owner === https://jeswr.org/#me).
//     Run against BOTH encodings (Turtle and JSON-LD), plus the A2A card shape
//     and the package's well-known URL helpers matching the paths this site
//     actually serves.
//
//  3. FAIL-CLOSED CONTROL — a tampered descriptor (foreign ad:owner) must FAIL
//     discovery under requireOwnerMatch, proving the back-link check is real.
//
// Network-free: the fetches discoverAgent performs are served by an in-process
// stub carrying the exact bytes the site serves.

import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  agentCardUrl,
  agentDescriptionsUrl,
  discoverAgent,
  HAS_AUTHORIZATION_AGENT,
} from "@jeswr/solid-agent-card";
import { buildArtifacts } from "./build.mjs";
import { AGENT_IRI, OIDC_ISSUER, OWNER_WEBID } from "./descriptor.mjs";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
let failures = 0;

function check(ok, label, detail) {
  if (ok) {
    console.log(`  ok: ${label}`);
  } else {
    failures += 1;
    console.error(`  FAIL: ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

/** A fetch stub serving the WebID profile + the Agent Description bytes. */
function stubFetch(profileTurtle, descriptionBody, descriptionContentType) {
  return async (url) => {
    const u = String(url);
    if (u === OWNER_WEBID || u === new URL(OWNER_WEBID).href.split("#")[0]) {
      return new Response(profileTurtle, {
        status: 200,
        headers: { "content-type": "text/turtle" },
      });
    }
    if (u === AGENT_IRI) {
      return new Response(descriptionBody, {
        status: 200,
        headers: { "content-type": descriptionContentType },
      });
    }
    return new Response("not found", { status: 404 });
  };
}

const { artifacts, turtle, jsonld, card, pointerTurtle } = await buildArtifacts();

// ---- 1. FRESHNESS ----------------------------------------------------------
console.log("freshness: committed artifacts vs a fresh build");
for (const [relPath, expected] of Object.entries(artifacts)) {
  let committed;
  try {
    committed = await readFile(join(REPO_ROOT, relPath), "utf8");
  } catch {
    check(false, relPath, "missing — run `npm run generate`");
    continue;
  }
  check(committed === expected, `${relPath} is fresh`, "drift — run `npm run generate`");
}

// ---- 2. DISCOVERY (both encodings) ----------------------------------------
for (const [label, body, contentType] of [
  ["text/turtle", turtle, "text/turtle"],
  ["application/ld+json", jsonld, "application/ld+json"],
]) {
  console.log(`discovery: ${OWNER_WEBID} → ${AGENT_IRI} over ${label}`);
  const result = await discoverAgent(OWNER_WEBID, {
    fetch: stubFetch(pointerTurtle, body, contentType),
    requireOwnerMatch: true,
  });
  check(result.pointers.length === 1, "profile carries exactly the interop pointer",
    `got ${result.pointers.length}`);
  check(result.pointers[0]?.predicate === HAS_AUTHORIZATION_AGENT,
    "the pointer is interop:hasAuthorizationAgent (schema:agent dropped)",
    result.pointers[0]?.predicate);
  check(result.pointers.every((p) => p.agent === AGENT_IRI),
    `every pointer targets ${AGENT_IRI}`);
  check(result.verification?.valid === true, "descriptor verifies (requireOwnerMatch)",
    JSON.stringify(result.verification?.issues));
  check(result.ownerMatchesWebId === true, "ad:owner back-link binds to the WebID");
  check(result.descriptor?.id === AGENT_IRI, "descriptor id === agent IRI");
  check(result.descriptor?.owner === OWNER_WEBID, "descriptor owner === WebID");
  check(
    result.descriptor?.securitySchemes?.some(
      (s) => s.type === "solid-oidc" && s.issuer === OIDC_ISSUER,
    ) === true,
    "solid-oidc scheme carries the WebID's own issuer",
  );
}

// ---- 2b. A2A card shape + well-known path binding --------------------------
console.log("card: A2A Agent Card shape + well-known paths");
check(card.name === "Jesse Wright's agent", "card name");
check(card.url === AGENT_IRI, "card url === agent IRI");
check(card["x-solid"]?.owner === OWNER_WEBID, "card x-solid.owner === WebID");
check(card["x-solid"]?.agentDescription === AGENT_IRI,
  "card x-solid.agentDescription === agent IRI (served there)");
check(card.securitySchemes?.["solid-oidc"]?.openIdConnectUrl === OIDC_ISSUER,
  "card solid-oidc scheme issuer");
check(card.preferredTransport === undefined,
  "no preferredTransport claimed (no live task endpoint yet)");
check(agentCardUrl("https://jeswr.org") === "https://jeswr.org/.well-known/agent-card.json",
  "A2A well-known URL matches public/.well-known/agent-card.json");
check(
  agentDescriptionsUrl("https://jeswr.org") === "https://jeswr.org/.well-known/agent-descriptions",
  "ANP well-known URL matches app/.well-known/agent-descriptions route",
);

// ---- 3. FAIL-CLOSED CONTROL -------------------------------------------------
console.log("fail-closed: a foreign ad:owner must fail requireOwnerMatch discovery");
const tampered = turtle.replaceAll(OWNER_WEBID, "https://attacker.example/#me");
check(tampered !== turtle, "tamper control actually changed the document");
const tamperedResult = await discoverAgent(OWNER_WEBID, {
  fetch: stubFetch(pointerTurtle, tampered, "text/turtle"),
  requireOwnerMatch: true,
});
check(tamperedResult.verification?.valid === false, "tampered descriptor is rejected");
check(tamperedResult.ownerMatchesWebId === false, "tampered back-link reported false");
check(
  tamperedResult.verification?.issues?.some((i) => i.code === "owner-mismatch") === true,
  "rejection reason is owner-mismatch",
);

// ---- verdict ----------------------------------------------------------------
if (failures > 0) {
  console.error(`\nverify: FAILED — ${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\nverify: PASS — artifacts fresh; discovery + owner back-link verified.");
