"use strict";

/**
 * Smoke test: exercise the shared mockup renderer through the public builders
 * and PDF helpers so structure/layout lessons fail fast when the shared visual
 * language regresses.
 *
 * Covers:
 * - homepage layout mockup
 * - infographic layout mockup
 * - front-page comparison
 * - poster comparison
 * - PDF pair rendering
 * - legacy previewBlocks fallback
 *
 * Run: node tests/test_base_builder_smoke.js
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const pptxgen = require("pptxgenjs");

const { createTheme } = require("../themes/factory");
const { createPdf, writePdf, addPosterPairPdf } = require("../themes/pdf_helpers");

const T = createTheme("literacy", "grade56", 0);
const { C, annotatedModelSlide, compareVisualSlide } = T;

function lightenColor(color, amount) {
  const raw = String(color || "CCCCCC").replace("#", "");
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  const ratio = Math.max(0, Math.min(1, Number(amount) || 0));
  const nr = Math.round(r + (255 - r) * ratio);
  const ng = Math.round(g + (255 - g) * ratio);
  const nb = Math.round(b + (255 - b) * ratio);
  return [nr, ng, nb].map((v) => v.toString(16).padStart(2, "0")).join("");
}

const HOMEPAGE_A = {
  pageFill: "FFFFFF",
  pageBorder: "B0B0B0",
  accent: C.PRIMARY,
  components: [
    { kind: "masthead", text: "NATURE DISCOVERY", fill: C.PRIMARY, textColor: "FFFFFF", scale: 0.44, align: "center" },
    { kind: "nav", text: "Home | Animals | Plants | Videos | About", scale: 0.28 },
    { kind: "hero", mode: "photo", fill: "E8F0FA", scale: 1.1 },
    { kind: "heading", text: "The Secret Life of Frogs", fill: "FFFFFF", scale: 0.42 },
    { kind: "textBlock", count: 3, scale: 0.58, widths: [0.92, 0.82, 0.56] },
    { kind: "cta", text: "Learn More", fill: C.ACCENT, scale: 0.32 },
  ],
};

const HOMEPAGE_B = {
  pageFill: "F8F8F8",
  pageBorder: "B0B0B0",
  accent: C.ALERT,
  components: [
    { kind: "masthead", text: "FUN FACTS ZONE", fill: C.ALERT, textColor: "FFFFFF", scale: 0.38, align: "center" },
    { kind: "nav", text: "Games | Prizes | Videos | Animals", fill: "FFF3C4", scale: 0.24 },
    { kind: "heading", text: "DID YOU KNOW? FROGS CAN...", scale: 0.34 },
    { kind: "subheading", text: "TOP 10 ANIMALS!!!", fill: lightenColor(C.SECONDARY, 0.78), scale: 0.24 },
    { kind: "textBlock", count: 5, scale: 1.0 },
    { kind: "footerBand", text: "SUBSCRIBE | SHARE | FOLLOW", fill: C.ALERT, scale: 0.28 },
  ],
};

const INFOGRAPHIC_A = {
  pageFill: "FFFFFF",
  pageBorder: "B0B0B0",
  accent: C.PRIMARY,
  components: [
    { kind: "masthead", text: "WATER USAGE IN AUSTRALIA", fill: C.PRIMARY, textColor: "FFFFFF", scale: 0.42, align: "center" },
    { kind: "subheading", text: "How Much Do We Use Each Day?", scale: 0.3 },
    { kind: "chart", fill: "EEF4FB", scale: 0.95 },
    { kind: "stat", text: "155 litres per person per day", fill: C.SECONDARY, textColor: "FFFFFF", scale: 0.34 },
    { kind: "iconRow", count: 4, scale: 0.42 },
    { kind: "caption", text: "Shower 34% | Garden 25% | Laundry 20%", scale: 0.28 },
  ],
};

const FRONT_PAGE_A = {
  pageFill: "FFFFFF",
  pageBorder: "B0B0B0",
  accent: C.PRIMARY,
  components: [
    { kind: "masthead", text: "THE MORNING CHRONICLE", fill: C.PRIMARY, textColor: "FFFFFF", scale: 0.36, align: "center" },
    { kind: "heading", text: "WILD STORM BATTERS LOCAL COAST", scale: 0.32 },
    { kind: "hero", mode: "photo", fill: "E8F0FA", scale: 0.95 },
    { kind: "caption", text: "Photo + caption", scale: 0.18 },
    { kind: "textBlock", count: 3, scale: 0.58 },
    { kind: "quote", text: "\"Worst I have seen\" - Resident", scale: 0.3 },
  ],
};

const FRONT_PAGE_B = {
  pageFill: "F8F8F8",
  pageBorder: "B0B0B0",
  accent: C.ALERT,
  components: [
    { kind: "masthead", text: "THE DAILY BUZZ", fill: C.ALERT, textColor: "FFFFFF", scale: 0.34, align: "center" },
    { kind: "heading", text: "STORM HITS!", scale: 0.24 },
    { kind: "subheading", text: "Sports Finals This Weekend!", fill: "EEF1F5", scale: 0.22 },
    { kind: "textBlock", count: 5, scale: 0.9 },
    { kind: "footerBand", text: "5 MORE STORIES INSIDE", fill: C.ALERT, scale: 0.22 },
  ],
};

const POSTER_A = {
  pageFill: "FFFDFB",
  pageBorder: "B0B0B0",
  accent: C.SECONDARY,
  components: [
    { kind: "masthead", text: "STOP. STAND UP. SPEAK OUT.", fill: C.SECONDARY, textColor: "FFFFFF", scale: 0.36, align: "center" },
    { kind: "hero", mode: "diagram", fill: "F4ECE8", scale: 1.0, overlayText: "Help is available", overlayFill: C.SECONDARY },
    { kind: "cta", text: "Tell a teacher you trust", fill: C.ACCENT, scale: 0.26 },
    { kind: "caption", text: "Bold contrast and clear action", scale: 0.22 },
  ],
};

const POSTER_B = {
  pageFill: "FBFAFF",
  pageBorder: "B0B0B0",
  accent: C.PRIMARY,
  components: [
    { kind: "masthead", text: "YOU ARE NOT ALONE", fill: C.PRIMARY, textColor: "FFFFFF", scale: 0.34, align: "center" },
    { kind: "hero", mode: "diagram", fill: "EFEAF7", scale: 1.0 },
    { kind: "cta", text: "Talk to someone you trust", fill: C.PRIMARY, scale: 0.26 },
    { kind: "caption", text: "Calm colour palette and support message", scale: 0.22 },
  ],
};

let failures = 0;

function pass(label) {
  console.log(`PASS: ${label} - no errors`);
}

function fail(label, err) {
  console.error(`FAIL: ${label} threw:`, err.message);
  failures += 1;
}

try {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  annotatedModelSlide(
    pres,
    "I Do",
    "Smoke Test: Homepage",
    ["Notice the parts", "Each feature has a purpose."],
    "Nature Discovery",
    [
      { label: "Site Title", detail: "Tells you which site you are on", color: C.PRIMARY },
      { label: "Nav Bar", detail: "Lets you move to different pages", color: C.SECONDARY },
      { label: "Hero Image", detail: "Grabs attention", color: C.ACCENT },
      { label: "Button", detail: "Tells you what to do next", color: C.ALERT },
    ],
    "Smoke test notes",
    "Smoke test footer",
    { sourceType: "WEBSITE HOMEPAGE", previewSpec: HOMEPAGE_A }
  );
  pass("annotatedModelSlide with homepage previewSpec");
} catch (err) {
  fail("annotatedModelSlide with homepage previewSpec", err);
}

try {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  annotatedModelSlide(
    pres,
    "I Do",
    "Smoke Test: Infographic",
    ["Notice the title, chart, and statistics"],
    "Water Usage in Australia",
    [
      { label: "Title", detail: "Introduces the topic", color: C.PRIMARY },
      { label: "Chart", detail: "Shows information visually", color: C.SECONDARY },
      { label: "Statistic", detail: "Adds evidence", color: C.ACCENT },
      { label: "Labels", detail: "Explain what the data means", color: C.ALERT },
    ],
    "Smoke test notes",
    "Smoke test footer",
    { sourceType: "INFOGRAPHIC", previewSpec: INFOGRAPHIC_A }
  );
  pass("annotatedModelSlide with infographic previewSpec");
} catch (err) {
  fail("annotatedModelSlide with infographic previewSpec", err);
}

try {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  compareVisualSlide(
    pres,
    "We Do",
    "Smoke Test: Front Page Comparison",
    "Which front page helps the reader faster?",
    { panelTitle: "Front Page A", title: "The Morning Chronicle", strip: C.PRIMARY, previewSpec: FRONT_PAGE_A },
    { panelTitle: "Front Page B", title: "The Daily Buzz", strip: C.ALERT, previewSpec: FRONT_PAGE_B },
    "Smoke test notes",
    "Smoke test footer"
  );
  pass("compareVisualSlide with front-page previewSpec objects");
} catch (err) {
  fail("compareVisualSlide with front-page previewSpec objects", err);
}

try {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  compareVisualSlide(
    pres,
    "We Do",
    "Smoke Test: Poster Comparison",
    "Which poster is more persuasive?",
    { panelTitle: "Poster A", title: "Stop. Stand Up. Speak Out.", strip: C.SECONDARY, previewSpec: POSTER_A },
    { panelTitle: "Poster B", title: "You Are Not Alone", strip: C.PRIMARY, previewSpec: POSTER_B },
    "Smoke test notes",
    "Smoke test footer"
  );
  pass("compareVisualSlide with poster previewSpec objects");
} catch (err) {
  fail("compareVisualSlide with poster previewSpec objects", err);
}

try {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  annotatedModelSlide(
    pres,
    "I Do",
    "Smoke Test: Legacy previewBlocks",
    ["Notice the parts"],
    "Test Model",
    [{ label: "Feature 1", detail: "Description", color: C.PRIMARY }],
    "Smoke test notes",
    "Smoke test footer",
    { previewBlocks: ["Line 1", "Line 2", "Line 3"] }
  );
  pass("annotatedModelSlide with previewBlocks (legacy)");
} catch (err) {
  fail("annotatedModelSlide with previewBlocks (legacy)", err);
}

async function runPdfTest() {
  try {
    const tmpFile = path.join(os.tmpdir(), `mockup-smoke-${Date.now()}.pdf`);
    const doc = createPdf({ title: "Mockup Smoke" });
    addPosterPairPdf(doc, 80, HOMEPAGE_A, HOMEPAGE_B, {
      color: C.PRIMARY,
      leftTitle: "Homepage A",
      rightTitle: "Homepage B",
      posterH: 150,
    });
    await writePdf(doc, tmpFile);
    if (!fs.existsSync(tmpFile) || fs.statSync(tmpFile).size === 0) {
      throw new Error("PDF file was not written");
    }
    fs.unlinkSync(tmpFile);
    pass("addPosterPairPdf with homepage previewSpec objects");
  } catch (err) {
    fail("addPosterPairPdf with homepage previewSpec objects", err);
  }
}

(async () => {
  await runPdfTest();

  console.log("");
  if (failures > 0) {
    console.error(`${failures} smoke test(s) FAILED`);
    process.exit(1);
  } else {
    console.log("All 6 builder smoke tests passed");
  }
})();
