"use strict";

/**
 * Regression guard: subject builders must not shadow base builders
 * with stale forks. If a subject builder exports a name that also
 * exists in the base builders, this test fails — forcing a deliberate
 * decision about whether the override adds genuine subject-specific
 * behaviour.
 *
 * Run:  node tests/test_no_stale_builder_overrides.js
 */

const { createBaseBuilders } = require("../themes/builders/base");
const { createLiteracyBuilders } = require("../themes/builders/literacy");
const { createNumeracyBuilders } = require("../themes/builders/numeracy");
const { createScienceBuilders } = require("../themes/builders/science");
const { createWellbeingBuilders } = require("../themes/builders/wellbeing");
const { createInquiryBuilders } = require("../themes/builders/inquiry");
const { createTheme } = require("../themes/factory");

// --- Stub palette and helpers for introspection only ---
const STUB_C = {
  PRIMARY: "000000", SECONDARY: "111111", ACCENT: "222222",
  ALERT: "333333", SUCCESS: "444444", BG_DARK: "555555",
  BG_LIGHT: "EEEEEE", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
  CHARCOAL: "333333", MUTED: "999999", TEXT_ON_DARK: "FFFFFF",
  SUBTITLE: "CCCCCC", DECOR_1: "AAAAAA", DECOR_2: "BBBBBB",
  FONT_H: "Georgia", FONT_B: "Calibri",
};
const STUB_EL = new Proxy({}, { get: () => () => {} });
const STUB_SHADOW = () => ({});

const baseNames = Object.keys(createBaseBuilders(STUB_C, "Georgia", "Calibri", STUB_EL, STUB_SHADOW));

const SUBJECT_FACTORIES = {
  literacy: createLiteracyBuilders,
  numeracy: createNumeracyBuilders,
  science: createScienceBuilders,
  wellbeing: createWellbeingBuilders,
  inquiry: createInquiryBuilders,
};

let failures = 0;

// Test 1: No subject builder shadows a base builder name
for (const [subject, factory] of Object.entries(SUBJECT_FACTORIES)) {
  const subjectNames = Object.keys(factory(STUB_C, "Georgia", "Calibri", STUB_EL));
  const shadows = subjectNames.filter((name) => baseNames.includes(name));
  if (shadows.length > 0) {
    console.error(`FAIL: ${subject} builder shadows base builder(s): ${shadows.join(", ")}`);
    console.error(`      If intentional, document why in themes/builders/${subject}.js`);
    failures += 1;
  } else {
    console.log(`PASS: ${subject} — no base builder shadows`);
  }
}

// Test 2: Literacy theme resolves annotatedModelSlide from base (supports previewSpec)
const T = createTheme("literacy", "grade56", 0);

// The base annotatedModelSlide's toString includes "drawMockupPreview" in its source.
// The stale literacy fork did not call drawMockupPreview.
const fnSource = T.annotatedModelSlide.toString();
if (fnSource.includes("drawMockupPreview")) {
  console.log("PASS: literacy annotatedModelSlide uses drawMockupPreview (structured mockup path)");
} else {
  console.error("FAIL: literacy annotatedModelSlide does NOT use drawMockupPreview");
  console.error("      This means a stale override may be shadowing the base builder.");
  failures += 1;
}

// Test 3: Verify the theme object has annotatedModelSlide at all
if (typeof T.annotatedModelSlide === "function") {
  console.log("PASS: createTheme('literacy', ...) exports annotatedModelSlide");
} else {
  console.error("FAIL: createTheme('literacy', ...) is missing annotatedModelSlide");
  failures += 1;
}

// Summary
console.log("");
if (failures > 0) {
  console.error(`${failures} test(s) FAILED`);
  process.exit(1);
} else {
  console.log("All tests passed");
}
