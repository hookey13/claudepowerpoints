"use strict";

const path = require("path");
const {
  ROOT,
  runCommand,
  lintTeacherNotesInFile,
  extractText,
  scanTextForForbiddenOutput,
  validateNotesXml,
} = require("./qa_lib");

async function main() {
  const buildScript = "builds/build_wh4_lesson17.js";
  const pptxPath = path.join(ROOT, "output/WH4_Lesson17_Friedrich_And_Topthorn/WH4_Lesson17.pptx");
  const issues = [];

  issues.push(...lintTeacherNotesInFile(buildScript, {
    checkMarkdownHeaders: true,
    checkUnicodeBullets: false,
    checkSmartPunctuation: false,
    checkAscii: false,
    checkSectionStructure: true,
    maxLines: 50,
    maxChars: 4700,
    maxSayBullets: 16,
    maxDoBullets: 8,
    maxWatchForBullets: 5,
    maxTeacherNotesLines: 10,
    maxTeacherNotesChars: 1400,
  }));

  console.log("Building literacy notes regression deck...");
  const buildOutput = runCommand("node", [buildScript], { timeout: 180000 });
  process.stdout.write(buildOutput);

  if (/\[bounds\]/.test(buildOutput)) {
    issues.push("Literacy regression deck emitted bounds warnings");
  }

  console.log("Validating PPTX text and notes XML for literacy regression deck...");
  const pptxText = extractText(pptxPath);
  issues.push(...scanTextForForbiddenOutput(pptxText, path.basename(pptxPath)));
  issues.push(...await validateNotesXml(pptxPath));

  if (issues.length > 0) {
    console.error("Notes regression QA failed:");
    issues.forEach((issue) => console.error(`- ${issue}`));
    process.exit(1);
  }

  console.log("Notes regression QA passed.");
}

main().catch((error) => {
  console.error(error.message || error);
  if (error.output) {
    process.stderr.write(error.output);
  }
  process.exit(1);
});
