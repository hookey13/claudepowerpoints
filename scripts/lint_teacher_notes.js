"use strict";

const path = require("path");
const { lintTeacherNotesInFile } = require("./qa_lib");

const DEFAULT_FILES = [
  "builds/build_4proc_lesson1.js",
  "builds/build_4proc_lesson2.js",
  "builds/build_4proc_lesson3.js",
  "builds/build_4proc_lesson4.js",
  "builds/build_wh4_lesson17.js",
];

const files = process.argv.slice(2);
const targets = files.length > 0 ? files : DEFAULT_FILES;

const issues = [];
targets.forEach((filePath) => {
  issues.push(...lintTeacherNotesInFile(filePath, {
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
});

if (issues.length > 0) {
  console.error("Teacher notes source lint failed:");
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log(`Teacher notes source lint passed for ${targets.map((file) => path.basename(file)).join(", ")}.`);
