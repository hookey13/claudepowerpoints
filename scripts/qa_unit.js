"use strict";

const fs = require("fs");
const path = require("path");
const { LESSONS } = require("../builds/configs/four_processes");
const {
  ROOT,
  runCommand,
  lintTeacherNotesInFile,
  extractText,
  scanTextForForbiddenOutput,
  validateNotesXml,
  listPdfFiles,
} = require("./qa_lib");

async function main() {
  const unit = process.argv[2];
  if (unit !== "4proc") {
    throw new Error("Usage: node scripts/qa_unit.js 4proc");
  }

  const issues = [];

  for (const sessionNumber of [1, 2, 3, 4]) {
    const lesson = LESSONS[sessionNumber];
    const buildScript = `builds/build_4proc_lesson${sessionNumber}.js`;
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

    console.log(`Building Session ${sessionNumber}...`);
    const buildOutput = runCommand("node", [buildScript], { timeout: 180000 });
    process.stdout.write(buildOutput);

    if (/\[bounds\]/.test(buildOutput)) {
      issues.push(`Session ${sessionNumber}: build emitted bounds warnings`);
    }

    const pptxPath = path.join(ROOT, lesson.outDir, lesson.pptxFileName);
    if (!fs.existsSync(pptxPath)) {
      issues.push(`Session ${sessionNumber}: missing PPTX output ${pptxPath}`);
      continue;
    }

    console.log(`Validating PPTX content for Session ${sessionNumber}...`);
    const pptxText = extractText(pptxPath);
    issues.push(...scanTextForForbiddenOutput(pptxText, path.basename(pptxPath)));
    issues.push(...await validateNotesXml(pptxPath));

    const resourceDir = path.join(ROOT, lesson.outDir, path.dirname(lesson.resources.worksheet.fileName));
    const pdfFiles = listPdfFiles(resourceDir);
    if (pdfFiles.length === 0) {
      issues.push(`Session ${sessionNumber}: no PDFs found in ${resourceDir}`);
      continue;
    }

    for (const pdfPath of pdfFiles) {
      console.log(`Validating PDF ${path.basename(pdfPath)}...`);
      const pdfText = extractText(pdfPath);
      issues.push(...scanTextForForbiddenOutput(pdfText, path.basename(pdfPath)));
    }
  }

  if (issues.length > 0) {
    console.error("Four Processes QA failed:");
    issues.forEach((issue) => console.error(`- ${issue}`));
    process.exit(1);
  }

  console.log("Four Processes QA passed.");
}

main().catch((error) => {
  console.error(error.message || error);
  if (error.output) {
    process.stderr.write(error.output);
  }
  process.exit(1);
});
