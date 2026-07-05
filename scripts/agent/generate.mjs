#!/usr/bin/env node
// AUTHORED-BY Claude Fable 5
//
// Write the committed agent-descriptor artifacts (the A2A Agent Card + the
// generated Agent Description module) from scripts/agent/descriptor.mjs.
// Run `npm run verify` afterwards — it fails if the committed artifacts do not
// byte-match a fresh build, and self-verifies discovery end-to-end.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildArtifacts } from "./build.mjs";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const { artifacts } = await buildArtifacts();
for (const [relPath, content] of Object.entries(artifacts)) {
  const absPath = join(REPO_ROOT, relPath);
  await mkdir(dirname(absPath), { recursive: true });
  await writeFile(absPath, content, "utf8");
  console.log(`generate: wrote ${relPath} (${content.length} bytes)`);
}
console.log("generate: done. Now run `npm run verify`.");
