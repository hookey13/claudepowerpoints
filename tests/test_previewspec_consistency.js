"use strict";

/**
 * Regression guard: build scripts that define a structured mockup spec
 * (an object with a `components` array) for a designed visual must not
 * then pass `previewBlocks` to annotatedModelSlide(...) for the same
 * visual while using `previewSpec` on compareVisualSlide(...).
 *
 * This is a lightweight heuristic — it scans source text, not an AST.
 * It catches the most common failure mode: defining a spec at the top
 * of the file and then using previewBlocks in the annotatedModelSlide
 * call instead of the spec.
 *
 * Run:  node tests/test_previewspec_consistency.js
 */

const fs = require("fs");
const path = require("path");

const BUILDS_DIR = path.resolve(__dirname, "..", "builds");

// Only scan files that actually exist and match build_*.js
const buildFiles = fs.readdirSync(BUILDS_DIR)
  .filter((f) => f.startsWith("build_") && f.endsWith(".js"))
  .map((f) => path.join(BUILDS_DIR, f));

let failures = 0;
let checked = 0;

for (const filePath of buildFiles) {
  const src = fs.readFileSync(filePath, "utf8");
  const name = path.basename(filePath);

  // Heuristic 1: file defines at least one object with a `components` array
  // that looks like a poster/mockup spec (pageFill or accent + components).
  const hasSpecDef = /\bcomponents\s*:\s*\[/.test(src) &&
                     (/\bpageFill\s*:/.test(src) || /\baccent\s*:/.test(src));
  if (!hasSpecDef) continue; // Not a designed-visual lesson — skip

  checked += 1;

  // Heuristic 2: file has a compareVisualSlide( function call with previewSpec
  // Use opening paren to target actual calls, not string references in notes.
  const usesCompareSpec = /compareVisualSlide\s*\([\s\S]*?previewSpec\s*:/.test(src);

  // Heuristic 3: find the annotatedModelSlide( function call (not string refs).
  // Match from `annotatedModelSlide(` to the next `);` on its own line or after
  // a closing brace, which is the standard call-termination pattern in builds.
  const annotatedMatch = src.match(/annotatedModelSlide\s*\(([\s\S]*?)\n\s*\);/);
  if (!annotatedMatch) continue;
  const annotatedCall = annotatedMatch[1];
  const annotatedUsesBlocks = /previewBlocks\s*:/.test(annotatedCall);
  const annotatedUsesSpec = /previewSpec\s*:/.test(annotatedCall);

  if (usesCompareSpec && annotatedUsesBlocks && !annotatedUsesSpec) {
    console.error(`FAIL: ${name} — defines a structured mockup spec and passes previewSpec to compareVisualSlide, but passes previewBlocks to annotatedModelSlide.`);
    console.error(`      The annotatedModelSlide call should use previewSpec for visual consistency.`);
    failures += 1;
  } else {
    console.log(`PASS: ${name} — previewSpec usage is consistent`);
  }
}

if (checked === 0) {
  console.log("SKIP: no designed-visual build scripts found to check");
}

console.log("");
if (failures > 0) {
  console.error(`${failures} build script(s) have inconsistent previewSpec/previewBlocks usage`);
  process.exit(1);
} else {
  console.log(`All ${checked} designed-visual build script(s) passed consistency check`);
}
