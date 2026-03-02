// Place Value Sequence — Lesson 5: Representing Decimals Using Number Lines
// Grade 3/4 Mathematics | Extend Place Value & Additive Thinking
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const {
  C, FONT_H, FONT_B, makeCardShadow,
  SAFE_BOTTOM, CONTENT_TOP,
  addTopBar, addStageBadge, addTitle, addCard, addFooter, slide_addTechniqueBadge,
  addNumberLine,
  titleSlide, liSlide, contentSlide, workedExSlide, cfuSlide,
  exitTicketSlide, closingSlide,
  STAGE_COLORS,
} = require("../themes/pv_helpers");

const FOOTER = "Lesson 5 of 10  |  Extend Place Value & Additive Thinking  |  Grade 3/4 Maths";

// ── Utility: small coloured label badge inline ────────────────────────────────
function addInlineBadge(slide, text, x, y, color) {
  const w = text.length * 0.085 + 0.3;
  slide.addShape("roundRect", {
    x, y, w, h: 0.28, rectRadius: 0.06,
    fill: { color },
  });
  slide.addText(text, {
    x, y, w, h: 0.28,
    fontSize: 9, fontFace: FONT_B, color: C.WHITE,
    align: "center", valign: "middle", bold: true, margin: 0,
  });
  return w;
}

// ── Utility: draw a highlighted point marker above OR below a number line tick ─
// opts.below = true places label+stem below the line (avoids heading collisions)
function addNumberLineMarker(slide, lineX, lineY, lineW, numIntervals, idx, label, opts) {
  const o = opts || {};
  const markerColor = o.color || C.CORAL;
  const below = o.below || false;
  const intervalW = lineW / numIntervals;
  const mx = lineX + idx * intervalW;
  // Dot on line
  slide.addShape("roundRect", {
    x: mx - 0.08, y: lineY - 0.08, w: 0.16, h: 0.16, rectRadius: 0.08,
    fill: { color: markerColor },
  });
  if (below) {
    // Vertical stem going DOWN
    slide.addShape("line", {
      x: mx, y: lineY + 0.08, w: 0, h: 0.3,
      line: { color: markerColor, width: 2, dashType: "dash" },
    });
    // Label below
    if (label) {
      slide.addText(label, {
        x: mx - 0.4, y: lineY + 0.4, w: 0.8, h: 0.28,
        fontSize: 13, fontFace: FONT_B, color: markerColor, bold: true,
        align: "center", margin: 0,
      });
    }
  } else {
    // Vertical stem going UP
    slide.addShape("line", {
      x: mx, y: lineY - 0.45, w: 0, h: 0.38,
      line: { color: markerColor, width: 2, dashType: "dash" },
    });
    // Label above
    if (label) {
      slide.addText(label, {
        x: mx - 0.4, y: lineY - 0.72, w: 0.8, h: 0.28,
        fontSize: 13, fontFace: FONT_B, color: markerColor, bold: true,
        align: "center", margin: 0,
      });
    }
  }
}

// ── Slide 3 helper: whole number number lines warm-up visual ──────────────────
function drawWarmUpNumberLines(s) {
  const stageColor = STAGE_COLORS["1"];

  // ── Example A: count in 10s (fill the blank) ─────────────────
  s.addText("Count in 10s — fill the blank:", {
    x: 5.0, y: 1.3, w: 4.6, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: stageColor, bold: true, margin: 0,
  });
  // Number line: 10, 20, 30, ___, 50 (blank at index 3)
  addNumberLine(s, 5.0, 1.9, 4.5,
    ["10", "20", "30", "___", "50"], null, { tickH: 0.14 });

  // Answer reveal box
  addCard(s, 7.6, 2.05, 0.7, 0.3, { fill: C.AMBER_LIGHT });
  s.addText("40", {
    x: 7.6, y: 2.05, w: 0.7, h: 0.3,
    fontSize: 13, fontFace: FONT_H, color: stageColor, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // ── Example B: count in 100s (fill two blanks) ───────────────
  s.addText("Count in 100s — fill the blanks:", {
    x: 5.0, y: 2.55, w: 4.6, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: stageColor, bold: true, margin: 0,
  });
  addNumberLine(s, 5.0, 3.15, 4.5,
    ["0", "___", "200", "___", "400"], null, { tickH: 0.14 });

  // Answer boxes
  addCard(s, 5.88, 3.28, 0.7, 0.28, { fill: C.AMBER_LIGHT });
  s.addText("100", {
    x: 5.88, y: 3.28, w: 0.7, h: 0.28,
    fontSize: 11, fontFace: FONT_H, color: stageColor, bold: true,
    align: "center", valign: "middle", margin: 0,
  });
  addCard(s, 7.62, 3.28, 0.7, 0.28, { fill: C.AMBER_LIGHT });
  s.addText("300", {
    x: 7.62, y: 3.28, w: 0.7, h: 0.28,
    fontSize: 11, fontFace: FONT_H, color: stageColor, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // ── Example C: where does 900 go? (0 to 1000) ────────────────
  s.addText("Where does 900 go on this 0–1000 number line?", {
    x: 5.0, y: 3.75, w: 4.6, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: stageColor, bold: true, margin: 0,
  });
  addNumberLine(s, 5.0, 4.35, 4.5,
    ["0", "", "", "", "", "", "", "", "", "", "1000"], [9], { tickH: 0.14 });
  // Label for marked point
  s.addText("900", {
    x: 5.0 + 9 * (4.5 / 10) - 0.3, y: 4.42, w: 0.6, h: 0.22,
    fontSize: 10, fontFace: FONT_B, color: C.CORAL, bold: true,
    align: "center", margin: 0,
  });
}

// ── Slide 4 helper: full tenths number line 0 to 1 ───────────────────────────
function drawTenthsNumberLine(s) {
  // Main 0-to-1 tenths number line, centred on right side
  addNumberLine(s, 5.0, 3.3, 4.5,
    ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"],
    null, { tickH: 0.18 });

  // 0.5 halfway callout
  s.addShape("line", {
    x: 5.0 + 5 * (4.5 / 10), y: 2.9, w: 0, h: 0.36,
    line: { color: C.AMBER, width: 2, dashType: "dash" },
  });
  s.addText("halfway", {
    x: 5.0 + 5 * (4.5 / 10) - 0.5, y: 2.6, w: 1.0, h: 0.28,
    fontSize: 10, fontFace: FONT_B, color: C.AMBER, bold: true,
    align: "center", margin: 0,
  });

  // Choral count cue card
  addCard(s, 5.0, 1.35, 4.5, 1.3, { fill: C.LIGHT });
  s.addText("Choral Count", {
    x: 5.1, y: 1.42, w: 2.5, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
  });
  s.addText([
    { text: "Up:   ", options: { bold: true, color: C.NAVY } },
    { text: "0, 0.1, 0.2 ... 0.9, 1", options: { color: C.CHARCOAL } },
  ], {
    x: 5.1, y: 1.74, w: 4.2, h: 0.25,
    fontSize: 12, fontFace: FONT_B, margin: 0,
  });
  s.addText([
    { text: "Back: ", options: { bold: true, color: C.CORAL } },
    { text: "1, 0.9, 0.8 ... 0.1, 0", options: { color: C.CHARCOAL } },
  ], {
    x: 5.1, y: 2.01, w: 4.2, h: 0.25,
    fontSize: 12, fontFace: FONT_B, margin: 0,
  });
}

// ── Slide 5 helper: completing a tenths number line ───────────────────────────
function drawCompletingTenths(s) {
  // Incomplete number line — some labels blank
  s.addText("What is the difference between 0.1 and 0.2?", {
    x: 5.0, y: 1.35, w: 4.6, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
  });
  addCard(s, 5.0, 1.65, 4.5, 0.38, { fill: C.LIGHT });
  s.addText("0.2 − 0.1 = 0.1  →  counting in tenths", {
    x: 5.1, y: 1.68, w: 4.3, h: 0.32,
    fontSize: 12, fontFace: FONT_B, color: C.NAVY, margin: 0, valign: "middle",
  });

  // Number line with blanks at index 2 (0.2 shown), 3 missing, 4 shown, 5 missing
  // Labels: 0.1, blank, 0.3, blank, 0.5
  addNumberLine(s, 5.0, 2.65, 4.5,
    ["0.1", "", "", "0.4", "", "0.6"], null, { tickH: 0.16 });

  // Reveal answers
  const nlX = 5.0;
  const iW = 4.5 / 5;
  ["0.2", "0.3", "0.5"].forEach((val, j) => {
    const idx = [1, 2, 4][j];
    addCard(s, nlX + idx * iW - 0.32, 2.82, 0.64, 0.26, { fill: C.AMBER_LIGHT });
    s.addText(val, {
      x: nlX + idx * iW - 0.32, y: 2.82, w: 0.64, h: 0.26,
      fontSize: 11, fontFace: FONT_H, color: C.AMBER, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // Think-aloud step box
  addCard(s, 5.0, 3.3, 4.5, 1.6, { strip: C.NAVY });
  s.addText("Teacher Think-Aloud", {
    x: 5.2, y: 3.38, w: 4.0, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
  });
  const steps = [
    "1. Find two labelled numbers that are next to each other",
    "2. Calculate the difference: 0.4 − 0.3 = 0.1",
    "3. The number line is counting in tenths",
    "4. Count on from 0.1 to fill each missing value",
  ];
  steps.forEach((st, i) => {
    s.addText(st, {
      x: 5.2, y: 3.7 + i * 0.27, w: 4.1, h: 0.26,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
  });
}

// ── Slide 6 helper: placing 0.3 and 0.8 ──────────────────────────────────────
function drawPlacing03and08(s) {
  // Line for 0.3 — count on from 0
  s.addText("Placing 0.3 — count on from 0:", {
    x: 5.0, y: 1.35, w: 4.6, h: 0.26,
    fontSize: 11, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
  });
  // Number line sits lower so marker label (below) has room
  addNumberLine(s, 5.0, 1.82, 4.5,
    ["0", "", "", "", "", "", "", "", "", "", "1"], null, { tickH: 0.15 });
  // Counting step marks above: 0 → 0.1 → 0.2 → 0.3
  [1, 2, 3].forEach((step) => {
    const ax = 5.0 + step * (4.5 / 10);
    s.addShape("line", {
      x: ax - 0.01, y: 1.63, w: 0, h: 0.16,
      line: { color: C.TEAL, width: 1.5 },
    });
  });
  // Marker label placed BELOW the line (avoids heading text above)
  addNumberLineMarker(s, 5.0, 1.82, 4.5, 10, 3, "0.3", { color: C.TEAL, below: true });

  // Benchmark callout
  addCard(s, 5.0, 2.42, 4.5, 0.38, { fill: C.AMBER_LIGHT });
  s.addText("Benchmark: 0.5 is halfway between 0 and 1  (5 is halfway between 0 and 10)", {
    x: 5.1, y: 2.45, w: 4.3, h: 0.32,
    fontSize: 11, fontFace: FONT_B, color: C.AMBER, bold: true, margin: 0, valign: "middle",
  });

  // Line for 0.8 — count back from 1
  s.addText("Placing 0.8 — count back from 1:", {
    x: 5.0, y: 2.92, w: 4.6, h: 0.26,
    fontSize: 11, fontFace: FONT_B, color: C.CORAL, bold: true, margin: 0,
  });
  addNumberLine(s, 5.0, 3.3, 4.5,
    ["0", "", "", "", "", "", "", "", "", "", "1"], null, { tickH: 0.15 });
  // Counting back step marks above: 1 → 0.9 → 0.8
  [9, 8].forEach((step) => {
    const ax = 5.0 + step * (4.5 / 10);
    s.addShape("line", {
      x: ax - 0.01, y: 3.11, w: 0, h: 0.16,
      line: { color: C.CORAL, width: 1.5 },
    });
  });
  // Marker label placed BELOW the line
  addNumberLineMarker(s, 5.0, 3.3, 4.5, 10, 8, "0.8", { color: C.CORAL, below: true });

  // Tip box
  addCard(s, 5.0, 4.0, 4.5, 0.9, { fill: C.MINT });
  s.addText("Strategy tip", {
    x: 5.15, y: 4.07, w: 4.0, h: 0.24,
    fontSize: 10, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
  });
  s.addText("If a number is closer to 1 than to 0, count BACK from 1 — it's faster!", {
    x: 5.15, y: 4.34, w: 4.15, h: 0.5,
    fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
  });
}

// ── Slide 7 helper: zooming into hundredths ───────────────────────────────────
function drawHundredthsZoom(s) {
  // Zoom visual header
  addCard(s, 5.0, 1.35, 4.5, 0.44, { fill: C.NAVY });
  s.addText("Zoom in: between 0 and 0.1", {
    x: 5.1, y: 1.38, w: 4.3, h: 0.36,
    fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0, valign: "middle",
  });

  // 0–0.1 hundredths number line
  addNumberLine(s, 5.0, 2.2, 4.5,
    ["0", "0.01", "0.02", "0.03", "0.04", "0.05", "0.06", "0.07", "0.08", "0.09", "0.1"],
    null, { tickH: 0.16 });

  // 0.7–0.8 hundredths number line
  s.addText("Number line from 0.7 to 0.8 — counting in hundredths:", {
    x: 5.0, y: 2.72, w: 4.6, h: 0.26,
    fontSize: 11, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
  });
  addNumberLine(s, 5.0, 3.52, 4.5,
    ["0.7", "0.71", "0.72", "0.73", "0.74", "0.75", "0.76", "0.77", "0.78", "0.79", "0.8"],
    [5], { tickH: 0.16 });

  // 0.75 halfway callout — above the line so it doesn't overlap tick labels below
  s.addShape("line", {
    x: 5.0 + 5 * (4.5 / 10), y: 3.22, w: 0, h: 0.27,
    line: { color: C.CORAL, width: 1.5, dashType: "dash" },
  });
  s.addText("halfway = 0.75", {
    x: 5.0 + 5 * (4.5 / 10) - 0.6, y: 3.02, w: 1.2, h: 0.2,
    fontSize: 10, fontFace: FONT_B, color: C.CORAL, bold: true,
    align: "center", margin: 0,
  });

  // Choral count cue
  addCard(s, 5.0, 4.0, 4.5, 0.9, { fill: C.LIGHT });
  s.addText([
    { text: "Up:   ", options: { bold: true, color: C.NAVY } },
    { text: "0.7, 0.71, 0.72 … 0.79, 0.8", options: { color: C.CHARCOAL } },
  ], {
    x: 5.1, y: 4.1, w: 4.3, h: 0.28,
    fontSize: 11, fontFace: FONT_B, margin: 0,
  });
  s.addText([
    { text: "Back: ", options: { bold: true, color: C.CORAL } },
    { text: "0.8, 0.79, 0.78 … 0.71, 0.7", options: { color: C.CHARCOAL } },
  ], {
    x: 5.1, y: 4.42, w: 4.3, h: 0.28,
    fontSize: 11, fontFace: FONT_B, margin: 0,
  });
}

// ── Slide 8 helper: placing decimals on hundredths number lines ───────────────
function drawPlacingHundredths(s) {
  // Example 1: place 0.24 on 0.2–0.3 (count on)
  s.addText("Example 1: Place 0.24 on a 0.2–0.3 number line", {
    x: 5.0, y: 1.35, w: 4.6, h: 0.26,
    fontSize: 11, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
  });
  addCard(s, 5.0, 1.65, 4.5, 0.32, { fill: C.LIGHT });
  s.addText("Strategy: count on from 0.2 in hundredths", {
    x: 5.1, y: 1.68, w: 4.3, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: C.NAVY, margin: 0, valign: "middle",
  });
  addNumberLine(s, 5.0, 2.38, 4.5,
    ["0.2", "0.21", "0.22", "0.23", "0.24", "0.25", "0.26", "0.27", "0.28", "0.29", "0.3"],
    [4], { tickH: 0.15 });
  // Label above the dot
  s.addText("0.24", {
    x: 5.0 + 4 * (4.5 / 10) - 0.3, y: 2.08, w: 0.65, h: 0.22,
    fontSize: 11, fontFace: FONT_B, color: C.CORAL, bold: true,
    align: "center", margin: 0,
  });
  s.addShape("line", {
    x: 5.0 + 4 * (4.5 / 10), y: 2.31, w: 0, h: 0.06,
    line: { color: C.CORAL, width: 1.5 },
  });

  // Example 2: place 0.57 on 0.5–0.6 (count back)
  s.addText("Example 2: Place 0.57 on a 0.5–0.6 number line", {
    x: 5.0, y: 2.95, w: 4.6, h: 0.26,
    fontSize: 11, fontFace: FONT_B, color: C.CORAL, bold: true, margin: 0,
  });
  addCard(s, 5.0, 3.25, 4.5, 0.32, { fill: C.LIGHT });
  s.addText("Strategy: count back from 0.6 (0.57 is closer to 0.6)", {
    x: 5.1, y: 3.28, w: 4.3, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: C.CORAL, margin: 0, valign: "middle",
  });
  addNumberLine(s, 5.0, 3.98, 4.5,
    ["0.5", "0.51", "0.52", "0.53", "0.54", "0.55", "0.56", "0.57", "0.58", "0.59", "0.6"],
    [7], { tickH: 0.15 });
  // Label above the dot
  s.addText("0.57", {
    x: 5.0 + 7 * (4.5 / 10) - 0.3, y: 3.68, w: 0.65, h: 0.22,
    fontSize: 11, fontFace: FONT_B, color: C.CORAL, bold: true,
    align: "center", margin: 0,
  });
  s.addShape("line", {
    x: 5.0 + 7 * (4.5 / 10), y: 3.91, w: 0, h: 0.06,
    line: { color: C.CORAL, width: 1.5 },
  });
}

// ── Slide 9 helper: estimation on a blank number line ────────────────────────
function drawEstimation(s) {
  // Blank 0.8–0.9 number line (no labels except endpoints)
  s.addText("Estimate where 0.86 sits on this number line:", {
    x: 5.0, y: 1.35, w: 4.6, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
  });
  addNumberLine(s, 5.0, 2.05, 4.5,
    ["0.8", "", "", "", "", "0.85", "", "", "", "", "0.9"],
    null, { tickH: 0.16 });

  // Halfway marker
  s.addShape("line", {
    x: 5.0 + 5 * (4.5 / 10), y: 1.85, w: 0, h: 0.16,
    line: { color: C.AMBER, width: 2, dashType: "dash" },
  });
  s.addText("halfway\n0.85", {
    x: 5.0 + 5 * (4.5 / 10) - 0.42, y: 1.55, w: 0.84, h: 0.32,
    fontSize: 9, fontFace: FONT_B, color: C.AMBER, bold: true,
    align: "center", margin: 0,
  });

  // 0.86 marker — label placed BELOW the line so it doesn't hit the heading above
  addNumberLineMarker(s, 5.0, 2.05, 4.5, 10, 6, "0.86", { color: C.TEAL, below: true });

  // Reasoning card
  addCard(s, 5.0, 2.5, 4.5, 1.3, { strip: C.TEAL });
  s.addText("Estimation reasoning:", {
    x: 5.2, y: 2.58, w: 4.0, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
  });
  [
    "0.85 is the midpoint — halfway between 0.8 and 0.9",
    "0.86 is 1 hundredth above halfway",
    "So 0.86 sits just to the right of the halfway mark",
    "I don't need to be exact — I need to be close",
  ].forEach((line, i) => {
    s.addText(line, {
      x: 5.2, y: 2.9 + i * 0.27, w: 4.1, h: 0.26,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
  });

  // Think-Pair-Share cue
  addCard(s, 5.0, 3.92, 4.5, 0.95, { fill: C.MINT });
  s.addText("Think-Pair-Share", {
    x: 5.15, y: 4.0, w: 4.2, h: 0.26,
    fontSize: 11, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
  });
  s.addText("Estimate where 0.83 would go. Share your reasoning with your partner.", {
    x: 5.15, y: 4.28, w: 4.15, h: 0.52,
    fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
  });
}

// ── Slide 12 helper: exit ticket four options ─────────────────────────────────
function drawExitTicketOptions(s) {
  const opts = [
    {
      label: "A",
      color: C.CORAL,
      desc: "Number line 0 to 1 with 10 intervals\nLabelled: 0, 0.7, …  (each interval = 0.1)\nError: a value at the 7th tick is labelled 0.07",
    },
    {
      label: "B",
      color: C.CORAL,
      desc: "Number line 0 to 1\nDecimal placed at the 3rd tick out of 10\nBut the value 0.34 is written as the label\nError: wrong position — 0.34 would need hundredths",
    },
    {
      label: "C",
      color: C.EMERALD,
      desc: "Number line 0.3 to 0.4 with 10 intervals\nLabelled: 0.3, 0.31, … 0.4 (counting in 0.01)\nA point is correctly placed at the 6th tick: 0.36",
    },
    {
      label: "D",
      color: C.CORAL,
      desc: "Number line 0 to 1 with 10 intervals\nLabelled: 0, 0.02, 0.04, … (counting in 0.02)\nError: these are hundredths labels on a tenths line",
    },
  ];

  const cardW = 4.3;
  const cardH = 1.4;
  const positions = [
    { x: 0.5, y: 1.35 },
    { x: 5.2, y: 1.35 },
    { x: 0.5, y: 2.95 },
    { x: 5.2, y: 2.95 },
  ];

  opts.forEach((opt, i) => {
    const pos = positions[i];
    const isCorrect = opt.label === "C";
    addCard(s, pos.x, pos.y, cardW, cardH, { fill: isCorrect ? "E8F8EE" : "FFF0EF" });

    // Letter badge
    s.addShape("roundRect", {
      x: pos.x + 0.1, y: pos.y + 0.1, w: 0.42, h: 0.42, rectRadius: 0.08,
      fill: { color: opt.color },
    });
    s.addText(opt.label, {
      x: pos.x + 0.1, y: pos.y + 0.1, w: 0.42, h: 0.42,
      fontSize: 16, fontFace: FONT_H, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    if (isCorrect) {
      s.addShape("roundRect", {
        x: pos.x + 0.6, y: pos.y + 0.12, w: 0.9, h: 0.28, rectRadius: 0.06,
        fill: { color: C.EMERALD },
      });
      s.addText("CORRECT", {
        x: pos.x + 0.6, y: pos.y + 0.12, w: 0.9, h: 0.28,
        fontSize: 9, fontFace: FONT_B, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
    }

    s.addText(opt.desc, {
      x: pos.x + 0.12, y: pos.y + 0.58, w: cardW - 0.24, h: cardH - 0.65,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });
  });

  // Student instruction
  addCard(s, 0.5, 4.48, 9.0, 0.5, { fill: C.LAVENDER });
  s.addText("Write in your workbook: Which number line is correctly labelled? Write the letter and explain why.", {
    x: 0.65, y: 4.51, w: 8.7, h: 0.42,
    fontSize: 13, fontFace: FONT_B, color: C.PURPLE, bold: true, margin: 0, valign: "middle",
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN BUILD
// ══════════════════════════════════════════════════════════════════════════════

async function build() {
  if (!fs.existsSync("output")) fs.mkdirSync("output");

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Claude";
  pres.title = "Lesson 5: Representing Decimals Using Number Lines";

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ══════════════════════════════════════════════════════════════════════════
  titleSlide(
    pres,
    "Lesson 5: Representing Decimals Using Number Lines",
    "Extend Place Value & Additive Thinking",
    "Grade 3/4 Mathematics  |  Lesson 5 of 10  |  ~60 minutes",
    `SAY:
• "Today we are going to look at a powerful tool mathematicians use — the number line. We've already used number lines with whole numbers. Today we're going to use them to show decimal numbers."
• "We'll start with tenths, then zoom in to look at hundredths."

DO:
• Display this slide as students settle. Point to the lesson title.
• Have SR2 printed and ready to distribute at the start of Stage 1.

TEACHER NOTES:
This lesson builds directly on students' existing knowledge of whole-number number lines and decimal place value from Lessons 1–4. The key cognitive move is recognising that the structure of a number line is the same regardless of scale — intervals must be equal, and we use benchmarks (halfway points) to estimate. Students who understand this structural similarity will transfer the skill quickly. Students who are still uncertain about tenths and hundredths as fractions will need additional scaffolding on the link between 0.1 = 1/10 and 0.01 = 1/100. Keep fraction language alongside decimal language throughout the lesson to reinforce this connection.

WATCH FOR:
• Students who are still hesitant about decimal notation — seat them near the front for direct check-ins.
• Readiness signal: students who can immediately tell you what comes after 0.3 when counting in tenths are ready to move quickly to hundredths.

[Maths: Stage 2 — Fractions & Decimals | VTLM 2.0: Building Conceptual Understanding]`
  );

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — LI & SC
  // ══════════════════════════════════════════════════════════════════════════
  liSlide(
    pres,
    ["We will learn how to represent decimals on number lines."],
    [
      "I can complete a number line with decimal numbers.",
      "I can label the position of decimal numbers on a number line.",
      "I can estimate the position of decimal numbers on a number line.",
    ],
    `SAY:
• "Here is what we are working towards today. Let's read it together."
• Read LI aloud, then each success criterion.
• "By the end of the lesson I want you to be able to do all three of these things."

DO:
• Ask students to copy the LI into their workbooks (or point to where it is pre-printed in SR).
• Briefly explain the difference between 'complete' (filling in missing numbers), 'label' (marking an exact position), and 'estimate' (finding an approximate position) — these are three increasing levels of precision.

TEACHER NOTES:
Distinguishing 'complete', 'label', and 'estimate' is important because students often conflate them. Completing a number line requires recognising the counting pattern. Labelling requires counting on or back from a known point. Estimating requires benchmarking and spatial reasoning rather than exact calculation. Naming these distinctions explicitly at the start gives students language to use when justifying their answers during CFU checkpoints.

WATCH FOR:
• Students who ask "Do we need to be exact?" — this is a good question to revisit in Stage 2 when estimation is introduced.
• Students who skim the success criteria without reading — prompt: "Which of these three do you think will be hardest for you today?"

[Maths: Stage 2 — Fractions & Decimals | VTLM 2.0: Sharing Learning Intentions]`,
    FOOTER
  );

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — Stage 1: Whole Number Number Lines Warm-up
  // ══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres, 1, "Activate Prior Knowledge",
    "Warm-Up: Whole Number Number Lines",
    [
      "Distribute SR2 — complete independently (3 min)",
      "Count in 10s: 10, 20, 30, ___, 50",
      "Count in 100s: 0, ___, 200, ___, 400",
      "Placing numbers: where does 900 go on a 0–1000 line?",
      "Use what you know about counting patterns to find the missing numbers",
      "Think: how far apart are each pair of labelled numbers?",
    ],
    `SAY:
• "Before we look at decimals, let's warm up with number lines you already know."
• "On SR2, complete the number lines independently. You have about 3 minutes."
• After time: "Let's check some of these together. I'm going to ask some of you to share your thinking."

DO:
• Distribute SR2. Circulate during independent work — note who is confident and who needs support.
• After 3 minutes, direct students' attention to the right side of this slide as you discuss answers.
• For the 900 example: ask students to justify position, not just state the number.

CFU CHECKPOINT:
Technique: Non-volunteer (Cold Call)
Script:
• "[Name], for the first number line — how did you work out the missing number was 40?"
• Listen for: "I saw the numbers are going up in 10s because 20 to 30 is a difference of 10, so the next one after 30 is 40."
• "[Name], for the 900 question — where did you place it and how did you decide?"
• Listen for spatial reasoning: "900 is 9 tenths of the way along because 900 out of 1000 is like 9 out of 10."
PROCEED: If students can explain using the counting interval, move to Stage 2.
PIVOT: If students are just guessing without using the interval — reteach: "Let me show you how to find the counting rule. Find two consecutive labelled numbers and calculate the difference. That tells you what each interval is worth." Demonstrate with 10 and 20: 20 − 10 = 10. Then re-ask: "So if every interval is 10, what comes after 30?"

TEACHER NOTES:
This warm-up is designed to surface the key structural understanding: number lines have equal intervals, and you can use any two known values to find the interval size. Students who can verbalise this rule will apply it fluently to decimal number lines in Stage 2. The 900-on-0–1000 example is deliberately chosen because it parallels placing 0.9 on a 0–1 tenths line — the proportional reasoning is identical. If students struggle here, name the parallel explicitly when you reach the tenths number line.

WATCH FOR:
• Students who count tick marks without reading labels — they may misidentify the interval size.
• Students who say "it's counting in 10s" without explaining why — prompt for the difference calculation.
• Readiness signal: students who spontaneously say "it's 9/10 of the way along" are ready for decimal benchmarking.

[Maths: Stage 2 — Number & Algebra | VTLM 2.0: Activating Prior Knowledge]`,
    FOOTER,
    (s) => { drawWarmUpNumberLines(s); }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — Stage 2: Tenths Number Line 0 to 1
  // ══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres, 2, "Explicit Instruction",
    "A Number Line from 0 to 1 — Tenths",
    [
      "Draw a number line with 10 equal intervals from 0 to 1",
      "Each interval = 1 tenth (0.1)",
      "Label each tick: 0, 0.1, 0.2, 0.3 … 0.9, 1",
      "Choral count UP: zero, zero point one, zero point two…",
      "Choral count BACK: one, zero point nine, zero point eight…",
      "Key benchmark: 0.5 is halfway between 0 and 1",
      "Why? Because 5 is halfway between 0 and 10",
    ],
    `SAY:
• "Now we're moving to decimals. I'm going to draw a number line from 0 to 1 and divide it into 10 equal parts."
• As you point to each label: "Each part is worth one tenth — we write that as 0.1."
• "Let's count together. Repeat after me: zero … zero point one … zero point two …"
• Lead count up to 1. Then: "Now let's count back. One … zero point nine … zero point eight …"
• "Notice 0.5 sits exactly in the middle. Why does that make sense? Think about it — 5 is halfway between 0 and 10, so 5 tenths is halfway between 0 and 1."

DO:
• Draw or reveal the tenths number line (right side of slide).
• Point to each label in sequence during the choral count — use a pointer or cursor.
• Highlight the 0.5 dashed line with a gesture to emphasise the benchmark.
• Invite students to count along — check lips are moving.

TEACHER NOTES:
The choral count is not merely a procedural ritual — it builds the oral-decimal link so that students internalise the sequence before working with it visually. Students who count correctly but cannot yet write the decimals benefit enormously from this oral rehearsal. The 0.5 benchmark is the single most important reference point for estimation tasks later in the lesson; invest time here. The parallel to "5 is halfway between 0 and 10" is the key conceptual bridge and should be stated explicitly and revisited multiple times.

WATCH FOR:
• Students who say "zero point ten" instead of "one" at the end — they need to hear and say "one" (whole) explicitly.
• Students who confuse the labels: some may write 1/10, 2/10 — acknowledge this is also correct, but practise the decimal form.
• Readiness signal: students who can say "0.5 is halfway because 5 hundredths … no, 5 tenths is half of ten tenths" show strong conceptual grip.

[Maths: Stage 2 — Fractions & Decimals | VTLM 2.0: Explicit Teaching — Modelling]`,
    FOOTER,
    (s) => { drawTenthsNumberLine(s); }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 5 — Stage 2: Completing a Tenths Number Line
  // ══════════════════════════════════════════════════════════════════════════
  workedExSlide(
    pres, 2, "Explicit Instruction",
    "Worked Example 1: Completing a Number Line",
    [
      "Given: number line with some labels missing",
      "Step 1: Find two consecutive labelled numbers",
      "Step 2: Calculate the difference (0.4 − 0.3 = 0.1)",
      "Step 3: Identify the counting unit → tenths (0.1)",
      "Step 4: Count on from 0.1 to fill all missing values",
      "Missing values: 0.2, 0.3, 0.5",
      "Check: does each interval equal 0.1? ✓",
    ],
    `SAY:
• "Here's a number line with some labels missing. My job is to figure out the counting pattern and fill in the gaps."
• "I can see 0.1 and 0.4 labelled. The difference between 0.3 and 0.4 is 0.1, so I know each interval is worth 0.1."
• "I'm counting in tenths. Let me count on from 0.1: 0.1, 0.2, 0.3, 0.4, 0.5, 0.6."
• "My missing numbers are 0.2, 0.3, and 0.5."

DO:
• Model the think-aloud using the steps on the left card.
• Point to each step as you say it — don't rush.
• Reveal the answer highlights on the number line on the right.
• Ask the class: "Choral response — what is the missing number between 0.4 and 0.6?"

CFU CHECKPOINT:
Technique: Choral Response
Script:
• Point to the gap between 0.4 and 0.6: "Everyone together — what is the missing number?"
• Expected response: "Zero point five!"
• If response is clear and confident: proceed.
• If response is unclear or mixed: slow down — "Let me hear that again, louder. What do we get when we count one tenth past 0.4?"
PROCEED: Move to placing decimals on a number line.
PIVOT: If students say "0.10" or "0.14" — reteach: "Adding one tenth means adding 0.1. Let me show you: 0.4 plus 0.1 equals 0.5. What is 4 plus 1? Five. So 4 tenths plus 1 tenth = 5 tenths = 0.5."

TEACHER NOTES:
The think-aloud structure (find two values → calculate difference → identify unit → count on) is a reusable strategy that works for any number line, including hundredths and mixed sequences. Model it verbatim at this stage so students have the language to articulate it during guided practice. The choral response here is used strategically — it reveals whether students can produce the answer, not just recognise it. Hearing a clear chorus signals readiness; a muddled response reveals conceptual gaps to address before moving on.

WATCH FOR:
• Students who write "0.10" for the first missing value — they may be thinking in hundredths already; redirect to tenths.
• Students who skip the difference calculation and guess — prompt: "How do you know it's counting in tenths and not hundredths?"
• Readiness signal: students who spontaneously say "it has to be 0.5 because 5 is halfway" are connecting benchmarks to completion.

[Maths: Stage 2 — Fractions & Decimals | VTLM 2.0: Explicit Teaching — Worked Examples]`,
    FOOTER,
    (s) => { drawCompletingTenths(s); }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 6 — Stage 2: Placing 0.3 and 0.8
  // ══════════════════════════════════════════════════════════════════════════
  workedExSlide(
    pres, 2, "Explicit Instruction",
    "Worked Examples 2 & 3: Placing Decimals",
    [
      "Worked Example 2: Place 0.3 on a blank 0–1 number line",
      "→ Count on from 0: one tenth, two tenths, three tenths",
      "→ Mark the third tick: 0.3",
      "Worked Example 3: Place 0.8 on a blank 0–1 number line",
      "→ 0.8 is close to 1 — count back from 1 instead",
      "→ One tenth back: 0.9. Two tenths back: 0.8",
      "→ Mark the eighth tick from 0 (= second from 1)",
      "Benchmark: 0.5 is always halfway — use it to check",
    ],
    `SAY:
• "Now I want to place a decimal at a specific position on a blank number line."
• For 0.3: "I'll count on from 0: zero, zero point one, zero point two, zero point three. I mark the third tick."
• For 0.8: "Is 0.8 closer to 0 or closer to 1? It's closer to 1. So I'll count back from 1: one, zero point nine, zero point eight. That's the second tick from the right."
• "Either strategy works — choose the one that requires the fewest steps."

DO:
• Show the two number lines on the right side. Trace the counting with your finger or cursor.
• After 0.3, ask: "Is my mark to the left or right of halfway?" (Left — 0.3 < 0.5 ✓)
• After 0.8, ask: "Is my mark to the left or right of halfway?" (Right — 0.8 > 0.5 ✓)
• Display Show Me Boards prompt: "Show me where 0.6 would go — hold up your board."

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "On your Show Me Board, draw a number line from 0 to 1 and mark where 0.6 would go."
• "Hold your boards up in 3 … 2 … 1 … show!"
• Look for: mark placed at the sixth interval from 0 (and to the right of halfway).
• Common errors: mark at 6th of 5 intervals (wrong interval count), mark at halfway (confusing 0.6 with 0.5).
PROCEED: If most boards show 0.6 correctly placed to the right of halfway, move to hundredths.
PIVOT: If marks are at wrong positions — reteach with fingers: "Hold up 10 fingers. Fold down one finger for each tenth as we count: 0.1, 0.2 … 0.6. Count how many fingers are still up — 4. So 0.6 is 6 out of 10, four tenths from the right." Repeat for 0.7 then recheck.

TEACHER NOTES:
The counting-on vs counting-back choice mirrors strategies students use for addition and subtraction — choosing the most efficient direction. Making this connection explicit (we do the same thing with addition — we count back when the number is closer to the top) helps students see number lines as consistent mathematical objects, not a new procedure to memorise. The Show Me Board CFU is chosen here because it requires students to produce a spatial representation, not just name a number — this reveals whether they understand position, not just labels.

WATCH FOR:
• Students who always count from 0, even for large decimals like 0.9 — prompt the counting-back strategy explicitly.
• Students who miscount because they include the 0 tick as "one" — remind: 0 is the start, the first interval ends at 0.1.
• Readiness signal: students who voluntarily say "0.6 is a bit more than halfway" are using the benchmark correctly.

[Maths: Stage 2 — Fractions & Decimals | VTLM 2.0: Guided Practice — Checking for Understanding]`,
    FOOTER,
    (s) => { drawPlacing03and08(s); }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 7 — Stage 2: Zooming into Hundredths
  // ══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres, 2, "Explicit Instruction",
    "Zooming In: Hundredths on a Number Line",
    [
      "Zoom in between 0 and 0.1 — what do you see?",
      "10 more equal intervals, each worth 1 hundredth (0.01)",
      "Labels: 0, 0.01, 0.02, 0.03 … 0.09, 0.1",
      "Choral count UP: zero, zero point zero one…",
      "Choral count BACK: zero point one, zero point zero nine…",
      "Number line from 0.7 to 0.8: counting in hundredths",
      "Halfway between 0.7 and 0.8 is 0.75",
      "Why? 5 hundredths is halfway through 10 hundredths",
    ],
    `SAY:
• "We've been working with tenths. Now I want to zoom in. Imagine I take the space between 0 and 0.1 and I stretch it out. What would I see?"
• "I'd see ten more equal intervals — and each one is worth one hundredth: 0.01."
• "Let's count together in hundredths from 0 to 0.1: zero, zero point zero one, zero point zero two…"
• Lead count up to 0.1. Then count back.
• "Now look at the number line from 0.7 to 0.8. Same idea — 10 equal intervals, each worth 0.01. Halfway is 0.75 — five hundredths of the way through."

DO:
• Point to the zoom-in diagram on the right as you introduce hundredths.
• Show the 0.7–0.8 number line. Point to the 0.75 halfway marker.
• Lead the choral count for both the 0–0.1 line and the 0.7–0.8 line.
• Pause after each count and ask: "Is everyone with me?"

TEACHER NOTES:
The "zoom" metaphor is pedagogically powerful — it frames hundredths as a finer-grained view of tenths, not a completely new concept. Students who understand this see the structure as self-similar: any interval on a tenths line can itself be divided into 10 hundredths. This structural understanding is foundational for later work on thousandths and beyond. Invest time in the choral count — the oral sequence "zero point zero one, zero point zero two" is unfamiliar to many students and needs rehearsal before written work begins.

MISCONCEPTIONS:
• Misconception: Students confuse the size of the interval — they believe a number line from 0 to 1 divided into 10 parts is showing hundredths (labelling each tick 0.01, 0.02, … instead of 0.1, 0.2, …).
  Why: They hear "ten intervals" and associate "ten" with "hundredths" because 100 = 10 × 10.
  Impact: Will systematically misread and misplace values on tenths number lines; carries forward into hundredths work.
  Quick correction: "Count how many parts. Ten parts from 0 to 1 means each part is 1 tenth. For hundredths, we need 100 equal parts from 0 to 1 — or 10 equal parts inside each tenth."

• Misconception: Students think the scale of the number line (its endpoint values) determines whether it shows tenths or hundredths — e.g., a 0–0.1 line must be showing tenths because the numbers are small.
  Why: They key off the label values rather than the number of intervals and their size.
  Impact: Errors when working with partial number lines (e.g., 0.2–0.3 showing hundredths).
  Quick correction: "The scale doesn't tell you — the NUMBER OF INTERVALS does. Count the spaces, then calculate: endpoint difference ÷ number of spaces."

WATCH FOR:
• Students who write 0.10 instead of 0.1 for the endpoint — not an error in understanding but clarify notation consistency.
• Students who say "zero point one zero" when counting — reinforce that 0.10 = 0.1 as a side note, then move on.
• Students who lose track during the choral count around 0.05/0.06 — these middle values are the hardest to hold; repeat if needed.
• Readiness signal: students who can immediately say "0.75 is halfway" when shown the 0.7–0.8 line are fully ready for placing tasks.

[Maths: Stage 2 — Fractions & Decimals | VTLM 2.0: Explicit Teaching — Connecting Representations]`,
    FOOTER,
    (s) => { drawHundredthsZoom(s); }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 8 — Stage 2: Placing Decimals on Hundredths Number Lines
  // ══════════════════════════════════════════════════════════════════════════
  workedExSlide(
    pres, 2, "Explicit Instruction",
    "Worked Examples: Placing on Hundredths Lines",
    [
      "Example 1: Place 0.24 on a 0.2–0.3 number line",
      "→ Line has 10 intervals → counting in hundredths (0.01)",
      "→ Start at 0.2, count on: 0.21, 0.22, 0.23, 0.24",
      "→ Mark at the 4th tick from 0.2",
      "Example 2: Place 0.57 on a 0.5–0.6 number line",
      "→ Is 0.57 closer to 0.5 or 0.6? Closer to 0.6",
      "→ Count back from 0.6: 0.59, 0.58, 0.57",
      "→ Mark at the 3rd tick from 0.6 (= 7th from 0.5)",
    ],
    `SAY:
• "Let's apply the same counting-on and counting-back strategies to hundredths lines."
• For 0.24: "I'm on a 0.2–0.3 line. Ten intervals, so each one is 0.01. I start at 0.2 and count on: 0.21 … 0.22 … 0.23 … 0.24. The fourth tick."
• For 0.57: "I'm on a 0.5–0.6 line. Is 0.57 closer to 0.5 or 0.6? It's 7 hundredths from 0.5 and 3 hundredths from 0.6. Closer to 0.6 — so I count back: 0.59, 0.58, 0.57. Third tick from the right."

DO:
• Point to both number lines on the right as you model each example.
• For each: count aloud while pointing to ticks in sequence.
• After modelling: ask a student to explain the strategy back to you before moving on.

TEACHER NOTES:
These two worked examples are chosen deliberately to show both counting directions on hundredths lines. The counting-back strategy for 0.57 is particularly important — students who always count forward from the left endpoint will make consistent errors on values in the upper half of any interval. Naming the decision rule ("Is it closer to the left or right endpoint?") gives students a transferable heuristic. The efficiency argument (fewer steps) resonates with students who find the counting cognitively demanding.

MISCONCEPTIONS:
• Misconception: Students believe they must always find the exact position, even when estimating — they try to mark to sub-hundredths precision on a hundredths line.
  Why: 'Accurate' has been emphasised in prior number work; students may not yet distinguish estimation contexts from exact contexts.
  Impact: Paralysis or refusal to attempt estimation tasks; over-reliance on counting every tick even when it's impractical.
  Quick correction: "On this type of task, we are looking for approximately the right place — within one or two hundredths is excellent. You're not doing surgery; you're communicating a position."

WATCH FOR:
• Students who mark between ticks when exact positions are intended — prompt: "Decimals with two decimal places sit exactly on a tick on a hundredths line."
• Students who count the endpoint as tick "one" — this shifts every mark one position too far; address by saying "we start counting from 0 at the endpoint, the first interval ends at the first tick."
• Readiness signal: students who can say "I'll count back because it's closer to 0.6" without prompting are applying strategic thinking independently.

[Maths: Stage 2 — Fractions & Decimals | VTLM 2.0: Explicit Teaching — Worked Examples]`,
    FOOTER,
    (s) => { drawPlacingHundredths(s); }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 9 — Stage 2: Estimating Position
  // ══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres, 2, "Explicit Instruction",
    "Estimating Position on a Number Line",
    [
      "Estimation ≠ guessing — it's an informed approximation",
      "Use the halfway benchmark to anchor your estimate",
      "Blank 0.8–0.9 number line → estimate where 0.86 sits",
      "Step 1: Find halfway (0.85) — mark it mentally",
      "Step 2: Is 0.86 above or below halfway? Just above",
      "Step 3: How far above? One hundredth above 0.85",
      "Step 4: Place your mark just to the right of halfway",
      "You don't need to count every tick — use the midpoint",
    ],
    `SAY:
• "Estimation is different from what we've done so far. We don't need to count every single tick."
• "Instead, we use benchmarks — reference points we already know — to help us judge where a number sits."
• "Halfway between 0.8 and 0.9 is 0.85. I know that because 5 is halfway between 0 and 10."
• "Now, 0.86 is one hundredth above 0.85. So I place my mark just slightly to the right of the midpoint."
• "The key words are 'approximately' and 'about'. A good estimate is within one or two hundredths."

DO:
• Reveal the blank 0.8–0.9 number line on the right. Point to the halfway mark.
• Draw the estimated position of 0.86 live (or reveal it).
• Pose the Think-Pair-Share question displayed on the right.
• Give 2 minutes for partner discussion, then take 2–3 shares.

CFU CHECKPOINT:
Technique: Think-Pair-Share
Script:
• "Turn to your partner. Estimate where 0.83 would go on the same number line and explain your reasoning."
• "I'll give you 2 minutes. Both partners explain — don't just agree."
• After discussion: "Who can share their partner's reasoning?"
• Listen for: "0.85 is halfway, and 0.83 is below halfway, 2 hundredths below the midpoint, so it goes just to the left of halfway."
PROCEED: If students use the halfway benchmark in their reasoning, move to Stage 3.
PIVOT: If students are counting every tick rather than using the benchmark — reteach: "Stop counting at every mark. Tell me: what's halfway? Good. Is 0.83 above or below halfway? Good. How far? That's your estimate. You don't need to count 3 individual ticks."

TEACHER NOTES:
Estimation on number lines is one of the most underexplored skills in primary mathematics and one of the most predictive of proportional reasoning ability in later years. The benchmark strategy (find the midpoint, then reason about distance from it) is more powerful than tick-counting because it scales to any density of number line. Students who can estimate fluently here will transfer this skill immediately to measurement, graphing, and data interpretation contexts. The Think-Pair-Share is chosen because estimation reasoning is hard to surface in a whole-class setting — pairs give every student a chance to articulate the strategy and hear an alternative approach.

MISCONCEPTIONS:
• Misconception: Students think estimation is just guessing randomly — they place the mark anywhere without reasoning.
  Why: The word "estimate" has been used loosely in prior contexts to mean "have a go"; students have not internalised that estimation is structured approximation.
  Impact: Unable to justify estimate placement; marks are not consistently closer to correct positions than random placement.
  Quick correction: "Estimation always has a reason. You must be able to say: 'I put it here because...' Tell me your reason before you mark anything."

WATCH FOR:
• Students who mark 0.83 to the right of halfway — they may have reversed their benchmark reasoning; prompt: "Is 0.83 more than or less than 0.85?"
• Students who refuse to place a mark without counting all ticks — gently encourage: "That's being too careful. We're allowed to be approximately right here."
• Readiness signal: students who can articulate "above/below halfway by roughly X hundredths" are ready for guided practice estimation tasks.

[Maths: Stage 2 — Fractions & Decimals | VTLM 2.0: Explicit Teaching — Estimation & Spatial Reasoning]`,
    FOOTER,
    (s) => { drawEstimation(s); }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 10 — Stage 3: Guided Practice
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["3"];
    addTopBar(s, stageColor);
    addStageBadge(s, 3, "Guided Practice");
    addTitle(s, "Guided Practice: SR3 — Placing on a Number Line", { y: 0.65, fontSize: 22, color: stageColor });

    // Two-column layout: instructions left, benchmark reminder right
    // Left column
    const leftBullets = [
      "Work with your partner on SR3",
      "Part A: Label the positions on each number line",
      "Part B: Estimate the positions — mark approximately",
      "Use the halfway benchmark for all estimates",
      "Both partners must explain their reasoning aloud",
      "Be ready to share: why did you place it there?",
    ];
    const bTexts = leftBullets.map((b, i) => ({
      text: b,
      options: { bullet: true, breakLine: i < leftBullets.length - 1, fontSize: 14, color: C.CHARCOAL },
    }));
    s.addText(bTexts, {
      x: 0.5, y: CONTENT_TOP, w: 4.4, h: SAFE_BOTTOM - CONTENT_TOP,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Right column — benchmark reminder card
    addCard(s, 5.0, CONTENT_TOP, 4.6, 1.5, { fill: C.AMBER_LIGHT });
    s.addText("Benchmark Reminder", {
      x: 5.15, y: CONTENT_TOP + 0.1, w: 4.3, h: 0.32,
      fontSize: 13, fontFace: FONT_B, color: C.AMBER, bold: true, margin: 0,
    });
    [
      "0.5 is halfway between 0 and 1",
      "0.05 is halfway between 0 and 0.1",
      "0.75 is halfway between 0.7 and 0.8",
      "halfway = half the interval size above the lower endpoint",
    ].forEach((line, i) => {
      s.addText(line, {
        x: 5.15, y: CONTENT_TOP + 0.5 + i * 0.26, w: 4.3, h: 0.25,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    });

    // Enabling prompt card
    addCard(s, 5.0, CONTENT_TOP + 1.65, 4.6, 1.0, { fill: C.LIGHT, strip: stageColor });
    s.addText("If you're stuck:", {
      x: 5.15, y: CONTENT_TOP + 1.73, w: 4.3, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("→ Count the intervals first\n→ Find halfway\n→ Decide: count on or count back?", {
      x: 5.15, y: CONTENT_TOP + 2.04, w: 4.3, h: 0.55,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });

    // Extend prompt
    addCard(s, 5.0, CONTENT_TOP + 2.8, 4.6, 0.9, { fill: C.MINT });
    s.addText("Extend:", {
      x: 5.15, y: CONTENT_TOP + 2.88, w: 1.5, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("Can you make your own number line with missing numbers for your partner to complete?", {
      x: 5.15, y: CONTENT_TOP + 3.16, w: 4.3, h: 0.48,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });

    // CFU badge — placed right of stage badge at y=0.2 so it doesn't overlap content
    {
      const cfuW = 3.2;
      s.addShape("roundRect", {
        x: 3.3, y: 0.2, w: cfuW, h: 0.36, rectRadius: 0.08,
        fill: { color: stageColor },
      });
      s.addText("CFU: Cold Call — Non-volunteer reasoning", {
        x: 3.3, y: 0.2, w: cfuW, h: 0.36,
        fontSize: 10, fontFace: FONT_B, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
    }
    addFooter(s, FOOTER);
    s.addNotes(`SAY:
• "Now it's your turn to work with your partner on SR3."
• "Part A asks you to label positions on number lines — use counting-on or counting-back."
• "Part B asks you to estimate. Remember — use halfway as your anchor point."
• "I'm going to come around and listen to your explanations. Everyone should be able to explain why their mark is where it is."

DO:
• Circulate during pair work — listen to explanations, not just checking written answers.
• Look for: partners who are sharing reasoning vs. one partner dominating.
• Identify 2–3 pairs with strong reasoning to share. Note 1–2 pairs with errors to cold-call and correct publicly.
• After 10 minutes, bring class together for CFU.

CFU CHECKPOINT:
Technique: Cold Call (non-volunteer reasoning)
Script:
• "[Name — non-volunteer], can you tell me which number line you found hardest and what strategy you used?"
• "[Name], your partner said [X]. Do you agree? Why or why not?"
• Listen for: use of "halfway" as a reference, use of "count on/count back" as a strategy name.
PROCEED: If students use benchmark language and can justify their placement, move to Stage 4.
PIVOT: If students are placing by feel without articulating reasoning — reteach: "You need to be able to say one sentence that explains your placement. 'I put it here because…' Let me hear that sentence from you."

TEACHER NOTES:
Guided practice with a partner is chosen here because number line estimation benefits from verbalisation — students who explain their reasoning aloud are more likely to self-correct. The cold-call structure is deliberate: non-volunteers are chosen to ensure all students, not just confident ones, are accountable for their reasoning. Listen particularly for students who can explain using "above/below halfway" rather than just "it looked about right." The enabling and extending prompts allow you to differentiate during circulation without preparing separate materials.

WATCH FOR:
• Partners where one student does all the work — prompt the quieter student to explain each answer.
• Students who complete Part A quickly but rush Part B without reasoning — slow them down with: "Before you mark it, say the halfway point out loud."
• Readiness signal: students who can articulate the counting unit before marking any position are working at or above expected level.

[Maths: Stage 3 — Fractions & Decimals | VTLM 2.0: Guided Practice — Partner Work]`);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 11 — Stage 4: Independent Practice
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["4"];
    addTopBar(s, stageColor);
    addStageBadge(s, 4, "Independent Practice");
    addTitle(s, "Independent Practice: SR4 — Fill the Gaps", { y: 0.65, fontSize: 22, color: stageColor });

    const mainBullets = [
      "Work independently and silently on SR4",
      "Part 1: Complete the number lines (fill missing labels)",
      "Part 2: Label the position of given decimals on number lines",
      "Check your work: does each interval equal the same amount?",
    ];
    const bTexts = mainBullets.map((b, i) => ({
      text: b,
      options: { bullet: true, breakLine: i < mainBullets.length - 1, fontSize: 14, color: C.CHARCOAL },
    }));
    s.addText(bTexts, {
      x: 0.5, y: CONTENT_TOP, w: 4.4, h: 2.0,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Enable card
    addCard(s, 0.5, CONTENT_TOP + 2.1, 4.4, 0.95, { fill: C.AMBER_LIGHT, strip: stageColor });
    s.addText("If you need support  (Enable — SR5):", {
      x: 0.7, y: CONTENT_TOP + 2.18, w: 4.0, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.AMBER, bold: true, margin: 0,
    });
    s.addText("SR5 has completed number lines you can use for reference.", {
      x: 0.7, y: CONTENT_TOP + 2.5, w: 4.0, h: 0.48,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });

    // Right column: Extend and self-check cards
    addCard(s, 5.0, CONTENT_TOP, 4.6, 1.5, { fill: C.MINT });
    s.addText("Extend Challenge:", {
      x: 5.15, y: CONTENT_TOP + 0.1, w: 4.3, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    [
      "Unlabelled number lines — no endpoints given",
      "Estimate positions using only the halfway marker",
      "Explain in writing: how did you decide where to place each number?",
    ].forEach((line, i) => {
      s.addText(line, {
        x: 5.15, y: CONTENT_TOP + 0.48 + i * 0.3, w: 4.3, h: 0.28,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    });

    // Self-check card
    addCard(s, 5.0, CONTENT_TOP + 1.65, 4.6, 1.0, { fill: C.LIGHT });
    s.addText("Self-check questions:", {
      x: 5.15, y: CONTENT_TOP + 1.73, w: 4.3, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
    });
    [
      "Are all my intervals equal?",
      "Are my marks between 0 and 1?",
      "Does my placement make sense compared to 0.5?",
    ].forEach((q, i) => {
      s.addText("✓  " + q, {
        x: 5.15, y: CONTENT_TOP + 2.05 + i * 0.26, w: 4.3, h: 0.25,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    });

    // Time cue bar
    addCard(s, 0.5, 4.52, 9.0, 0.46, { fill: C.NAVY });
    s.addText("You have approximately 12 minutes for independent practice.", {
      x: 0.65, y: 4.56, w: 8.7, h: 0.36,
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0, valign: "middle",
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
• "This is your time to show what you can do independently. SR4 is in front of you."
• "Part 1: complete the number lines by filling in the missing labels."
• "Part 2: place the given decimal numbers on the number lines."
• "If you find Part 1 or Part 2 very challenging, SR5 has completed number lines you can look at."
• "If you finish and want a challenge, try the unlabelled number lines at the back."
• "Work silently — this helps me see what you know."

DO:
• Distribute SR4 (and SR5 face-down for enabling students).
• Circulate and observe — resist giving answers. Ask: "What's the first step?" or "What's the counting unit on this line?"
• Note students who are using strategies fluently vs. those who are unsure — this informs exit ticket review.
• At 10-minute mark, give a 2-minute warning.

TEACHER NOTES:
Independent practice is deliberately brief (12 minutes) because students need time for the exit ticket discussion. The self-check card on screen gives students an internal quality-control process without requiring teacher intervention. SR5 is positioned as an enabling resource rather than an answer sheet — students who use it are still practising the skill of reading a completed number line and comparing it to their own work. Watch for students who copy from SR5 without engaging with the reasoning — redirect them to cover SR5 and work from memory.

WATCH FOR:
• Students who complete quickly and leave the extend tasks untouched — encourage them explicitly: "Have you explained your reasoning in writing?"
• Students who are stuck on a first question — this may indicate they need direct small-group instruction now; pull them aside briefly if possible.
• Students who alternate between counting on and counting back randomly without a reason — prompt: "Which endpoint are you closer to?"
• Readiness signal: students who can complete Part 2 without counting every tick are ready for the next lesson on comparing and ordering decimals.

[Maths: Stage 4 — Fractions & Decimals | VTLM 2.0: Independent Practice — Consolidation]`);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 12 — Stage 5: Exit Ticket
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.LAVENDER };
    s.addShape("rect", {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.PURPLE },
    });
    // Badge
    s.addShape("roundRect", {
      x: 0.5, y: 0.2, w: 1.8, h: 0.36, rectRadius: 0.08,
      fill: { color: C.PURPLE },
    });
    s.addText("Exit Ticket", {
      x: 0.5, y: 0.2, w: 1.8, h: 0.36,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    addTitle(s, "Which number line is correctly labelled?", {
      y: 0.65, fontSize: 22, color: C.PURPLE,
    });

    drawExitTicketOptions(s);

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
• "For our exit ticket, I want you to look at four number lines — A, B, C, and D."
• "Each one has a decimal labelled on it. Only ONE of these is correctly labelled."
• "In your workbook, write the letter of the correct number line and explain why it is correct."
• "Also write what is wrong with ONE of the incorrect ones — your choice."
• After 2–3 minutes: bring class together for discussion.

DO:
• Display this slide. Give students 2–3 minutes to write their answer independently.
• Do NOT discuss yet — let students commit to an answer first.
• After writing time: "Who chose C? Hands up. Good. Let's hear why."
• Then: "Who chose a different letter? Tell me what you were thinking."

CFU CHECKPOINT:
Technique: Hinge Question (multiple choice — single correct answer)
Script:
• "Write your answer now. You have 2 minutes. No talking."
• After time: "[Name — non-volunteer], which letter did you choose? Explain why C is correct."
• "Now [Name], can you tell me what is wrong with A?"
• "And [Name], what is wrong with D?"
• Listen for:
  - A: labelled 0.7 but the 7th tick out of 10 intervals from 0 to 1 should be 0.7 not 0.07 — wait, A's error is the REVERSE: the line has 10 intervals but a value at the 7th tick is labelled 0.07 (should be 0.7 — confusing tenths with hundredths)
  - B: the point is placed at position 3 of 10 intervals (= 0.3) but labelled as 0.34 — wrong position
  - D: has a tenths number line (0 to 1, 10 intervals) but labels each tick 0.02, 0.04 — treating it as hundredths
PROCEED: If students can identify all four errors correctly, lesson objective is met.
PIVOT: If students choose A, B, or D as correct — address the specific confusion: "Let's go back to our counting rule. How many intervals? What is each interval worth? Does the label match?"

TEACHER NOTES:
The hinge question format is used here because it allows the teacher to identify specific diagnostic errors from student responses — each wrong answer (A, B, D) represents a distinct misconception. A student who chooses A likely confuses tenths and hundredths when reading. A student who chooses B likely focuses on the label without checking the position. A student who chooses D likely applies a hundredths labelling pattern without checking the interval size. This makes the exit ticket highly informative for planning the next lesson.

MISCONCEPTIONS:
• Misconception (Error A): A tenths line (0 to 1, 10 intervals) has a value written as 0.07 at the 7th tick — student accepts this because they see a small decimal number and a small tick count.
  Why: Students see "07" and associate it with "small" without checking whether the scale is tenths or hundredths.
  Impact: Will misread tenths lines throughout future work.
  Quick correction: "Count the intervals. Ten intervals from 0 to 1 means TENTHS. The 7th tick must be 0.7, not 0.07."

• Misconception (Error B): Student accepts 0.34 placed at the 3rd tick of a 0–1 tenths line.
  Why: They read the label without checking whether the position matches the counting pattern.
  Impact: Will place and read values incorrectly — confusing tenths and hundredths positionally.
  Quick correction: "The 3rd tick out of 10 from 0 to 1 is 0.3. If you want to show 0.34, you need a hundredths line from 0.3 to 0.4."

• Misconception (Error D): Student accepts 0.02, 0.04 labels on a 0–1 tenths line.
  Why: The labels look like hundredths — students recognise the two-decimal-place format but don't check whether it matches the interval count.
  Impact: Systematic errors when interpreting partially labelled number lines.
  Quick correction: "If there are 10 intervals from 0 to 1, the labels MUST count in tenths. 0.02 after 0 means the next would be 0.04, 0.06 — but then we'd reach 0.20 at the 10th tick, not 1. That's wrong."

WATCH FOR:
• Students who write only a letter without an explanation — insist on at least one sentence.
• Students who correctly identify C but cannot articulate why the others are wrong — this is partial understanding; probe with a follow-up question.
• Readiness signal: students who use the phrase "the counting unit doesn't match the labels" are showing strong conceptual understanding of number line structure.

[Maths: Stage 5 — Assessment | VTLM 2.0: Checking for Understanding — Hinge Question]`);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 13 — Closing
  // ══════════════════════════════════════════════════════════════════════════
  closingSlide(
    pres,
    "How does using a benchmark like 0.5 help you estimate where a decimal goes on a number line?",
    [
      "Number lines have equal intervals — find the interval size first",
      "Count on from the left or count back from the right (choose the shorter path)",
      "0.5 is halfway on a tenths line; the midpoint of any interval is your estimation anchor",
      "Estimation means approximately right — you don't need to count every tick",
      "Tenths: 10 intervals from 0 to 1. Hundredths: 10 intervals inside each tenth",
    ],
    `SAY:
• "Before we finish — Turn and Talk with your partner."
• "The question is on the screen: How does using a benchmark like 0.5 help you estimate where a decimal goes on a number line?"
• "You have 90 seconds. Both partners speak."
• After discussion: "Let's hear one response. [Name], what did you and your partner decide?"
• Close with: "Remember — number lines are everywhere: rulers, thermometers, scales. The skills you've practised today help you read all of them."

DO:
• Display the Turn & Talk question. Start a 90-second timer.
• Circulate briefly during Turn & Talk — listen for benchmark language.
• Take 1–2 shares. Affirm and add if needed.
• Point to each key takeaway briefly as you close.
• Remind students: next lesson will use number lines to compare and order decimals.

TEACHER NOTES:
The closing Turn & Talk serves as a metacognitive consolidation — students articulate the generalised strategy (use benchmarks) rather than a specific procedure. This is crucial for transfer: if students leave only knowing how to count ticks, they will not apply the skill to novel contexts. The five key takeaways are sequenced to mirror the lesson arc: interval identification → counting strategy → benchmark estimation → estimation mindset → tenths vs hundredths structure. If time is short, prioritise reading the first and third takeaways aloud.

WATCH FOR:
• Students who give a procedural answer ("you count to the halfway tick") rather than a conceptual one ("0.5 gives you a reference point so you know whether your number is in the left or right half") — the conceptual answer shows deeper understanding.
• Students who are disengaged during Turn & Talk — pair them with a more articulate partner and ask the quieter student to summarise.
• Readiness signal: students who connect today's lesson to a real-world context (ruler, thermometer) are showing strong transfer capacity.

[Maths: Stage 5 — Reflection | VTLM 2.0: Consolidating and Reflecting]`
  );

  // ══════════════════════════════════════════════════════════════════════════
  // Write output
  // ══════════════════════════════════════════════════════════════════════════
  await pres.writeFile({ fileName: "output/Lesson_PV5_Number_Lines.pptx" });
  console.log("Done: output/Lesson_PV5_Number_Lines.pptx");
}

build().catch(console.error);
