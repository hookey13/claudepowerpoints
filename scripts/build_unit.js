"use strict";

const { LESSONS } = require("../builds/configs/four_processes");
const { runCommand } = require("./qa_lib");

const unit = process.argv[2];

if (unit !== "4proc") {
  console.error("Usage: node scripts/build_unit.js 4proc");
  process.exit(1);
}

for (const sessionNumber of [1, 2, 3, 4]) {
  const scriptPath = `builds/build_4proc_lesson${sessionNumber}.js`;
  const lesson = LESSONS[sessionNumber];
  console.log(`Building Session ${sessionNumber}: ${lesson.pptxFileName}`);
  const output = runCommand("node", [scriptPath], { timeout: 120000 });
  process.stdout.write(output);
}
