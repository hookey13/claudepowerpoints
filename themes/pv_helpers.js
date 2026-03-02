// Place Value Sequence — Shared Slide Helpers (Lessons 1–5)
// Imports palette from pv_palette.js

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  C, FONT_H, FONT_B, makeShadow, makeCardShadow, STAGE_COLORS,
  getContrastColor, validateContrast,
} = require("./pv_palette");

// ── Icon rendering ──────────────────────────────────────────────────────────

function renderIconSvg(Comp, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(Comp, { color, size: String(size) })
  );
}

async function iconToBase64Png(Comp, color, size = 256) {
  const svg = renderIconSvg(Comp, color, size);
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ── Layout constants ─────────────────────────────────────────────────────────
const SAFE_BOTTOM = 5.1;   // max y for content (footer at 5.3)
const CONTENT_TOP = 1.3;   // standard y where cards start below title
const SLIDE_W = 10;        // 16:9 slide width in inches
const SAFE_RIGHT = 9.5;    // right margin limit (0.5" from edge)

// ── Bounds validation (never crashes — warnings only) ────────────────────────

/**
 * Warn if an element exceeds safe layout bounds.
 * Call this inside visual helpers to catch overflow at build time.
 */
function validateBounds(label, x, y, w, h) {
  const issues = [];
  // Hard limit: off-screen (slide = 10" x 5.625")
  if (x + w > SLIDE_W + 0.1) {
    issues.push(`right edge ${(x + w).toFixed(2)}" exceeds slide width (${SLIDE_W}")`);
  }
  if (y + h > 5.625 + 0.1) {
    issues.push(`bottom ${(y + h).toFixed(2)}" exceeds slide height (5.625")`);
  }
  if (issues.length > 0) {
    console.warn(`[bounds] ${label}: ${issues.join("; ")}`);
  }
  return issues.length === 0;
}

// ── Basic element helpers ────────────────────────────────────────────────────

function addTopBar(slide, color) {
  slide.background = { color: C.CREAM };
  slide.addShape("rect", {
    x: 0, y: 0, w: 10, h: 0.06,
    fill: { color: color || C.NAVY },
  });
}

function addBadge(slide, text, opts) {
  const o = opts || {};
  const x = o.x != null ? o.x : 0.5;
  const y = o.y != null ? o.y : 0.2;
  const w = o.w || 2.0;
  const color = o.color || C.NAVY;
  slide.addShape("roundRect", {
    x, y, w, h: 0.36, rectRadius: 0.08,
    fill: { color },
  });
  slide.addText(text, {
    x, y, w, h: 0.36,
    fontSize: 11, fontFace: FONT_B, color: C.WHITE,
    align: "center", valign: "middle", bold: true, margin: 0,
  });
}

function addStageBadge(slide, stageNum, label) {
  const color = STAGE_COLORS[String(stageNum)] || C.NAVY;
  const w = label.length > 20 ? 3.2 : 2.4;
  slide.addShape("roundRect", {
    x: 0.5, y: 0.2, w, h: 0.36, rectRadius: 0.08,
    fill: { color },
  });
  slide.addText("Stage " + stageNum + "  |  " + label, {
    x: 0.5, y: 0.2, w, h: 0.36,
    fontSize: 10, fontFace: FONT_B, color: C.WHITE,
    align: "center", valign: "middle", bold: true, margin: 0,
  });
}

function addTitle(slide, title, opts) {
  const o = opts || {};
  slide.addText(title, {
    x: o.x || 0.5, y: o.y || 0.65, w: o.w || 9, h: o.h || 0.55,
    fontSize: o.fontSize || 24, fontFace: FONT_H,
    color: o.color || C.NAVY, bold: true, margin: 0,
  });
}

function addCard(slide, x, y, w, h, opts) {
  const o = opts || {};
  validateBounds("addCard", x, y, w, h);
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.1,
    fill: { color: o.fill || C.WHITE }, shadow: o.shadow || makeCardShadow(),
  });
  if (o.strip) {
    slide.addShape("rect", { x, y, w: 0.07, h, fill: { color: o.strip } });
  }
}

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0.5, y: 5.3, w: 9, h: 0.2,
    fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
  });
}

// ── Math visual helpers ──────────────────────────────────────────────────────

/**
 * Draw a place value chart.
 * @param {object} slide
 * @param {number} x, y — top-left corner in inches
 * @param {string[]} headers — e.g. ['Ten Thousands','Thousands','Hundreds','Tens','Ones']
 * @param {(string|number)[]} values — digit for each column (use '' for blank)
 * @param {object} opts — { totalW, w, cellW, hdrH, valH, headerColor, valueColor }
 *   totalW / w → auto-calculates cellW to fit (totalW preferred, w for backward compat)
 *   cellW → explicit per-column width (default 1.2")
 * @returns {{ cellW, totalW, hdrH, valH, n, x, y }} geometry for downstream positioning
 */
function addPlaceValueChart(slide, x, y, headers, values, opts) {
  const o = opts || {};
  const n = headers.length;
  if (n === 0) {
    console.warn("[addPlaceValueChart] empty headers array — skipping");
    return { cellW: 0, totalW: 0, hdrH: 0, valH: 0, n: 0, x, y };
  }

  // Cell width priority: totalW > w (backward compat) > cellW > default
  let cellW;
  if (o.totalW != null) {
    cellW = o.totalW / n;
  } else if (o.w != null) {
    cellW = o.w / n;
  } else {
    cellW = o.cellW || 1.2;
  }

  const hdrH = o.hdrH || 0.52;
  const valH = o.valH || 0.7;
  const totalW = cellW * n;
  const headerColor = o.headerColor || C.NAVY;

  validateBounds("addPlaceValueChart", x, y, totalW, hdrH + valH);

  // Vertical separator line between thousands and hundreds groups (after 5-digit charts)
  const hasTenThousands = headers.some(h => h.toLowerCase().includes("ten thousand"));

  // Auto-scale font sizes for narrow cells
  const hdrFontSize = cellW < 0.7 ? 7 : cellW < 0.9 ? 8 : 9;
  const valFontSize = cellW < 0.7 ? 18 : cellW < 0.9 ? 22 : 26;

  headers.forEach((h, i) => {
    const cx = x + i * cellW;
    // Header cell
    slide.addShape("rect", {
      x: cx, y, w: cellW, h: hdrH,
      fill: { color: headerColor },
      line: { color: C.WHITE, width: 1 },
    });
    slide.addText(h, {
      x: cx, y, w: cellW, h: hdrH,
      fontSize: hdrFontSize, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    // Value cell
    slide.addShape("rect", {
      x: cx, y: y + hdrH, w: cellW, h: valH,
      fill: { color: C.WHITE },
      line: { color: headerColor, width: 1 },
    });
    const val = values && values[i] != null ? String(values[i]) : "";
    if (val !== "") {
      slide.addText(val, {
        x: cx, y: y + hdrH, w: cellW, h: valH,
        fontSize: valFontSize, fontFace: FONT_H, color: C.CHARCOAL,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
    }
  });

  // Add gap marker between thousands and hundreds for large numbers
  if (hasTenThousands && n >= 5) {
    const gapX = x + 2 * cellW;
    slide.addShape("rect", {
      x: gapX - 0.03, y: y + hdrH, w: 0.06, h: valH,
      fill: { color: C.AMBER },
    });
  }

  return { cellW, totalW, hdrH, valH, n, x, y };
}

/**
 * Draw a tenths strip (10 equal segments, some filled).
 * @param {object} slide
 * @param {number} x, y — top-left in inches
 * @param {number} w — total width of strip in inches
 * @param {number} filled — number of filled segments (0-10)
 * @param {object} opts — { fillColor, emptyColor, h }
 */
function addTenthsStrip(slide, x, y, w, filled, opts) {
  const o = opts || {};
  const h = o.h || 0.45;
  const segW = w / 10;
  const fillColor = o.fillColor || C.TEAL;
  const emptyColor = o.emptyColor || C.WHITE;
  validateBounds("addTenthsStrip", x, y, w + 0.6, h);

  for (let i = 0; i < 10; i++) {
    slide.addShape("rect", {
      x: x + i * segW, y, w: segW, h,
      fill: { color: i < filled ? fillColor : emptyColor },
      line: { color: C.NAVY, width: 1 },
    });
  }
  // Fraction label below
  slide.addText(filled + "/10", {
    x: x + w + 0.1, y: y, w: 0.5, h,
    fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL,
    align: "left", valign: "middle", margin: 0,
  });
}

/**
 * Draw a 10x10 area model (hundredths grid).
 * @param {object} slide
 * @param {number} x, y — top-left in inches
 * @param {number} sizeIn — total size (square) in inches
 * @param {number} filledTenths — number of full columns filled (0-10)
 * @param {number} extraHundredths — additional small cells in next column (0-9)
 * @param {object} opts — { fillColor }
 */
function addAreaModel(slide, x, y, sizeIn, filledTenths, extraHundredths, opts) {
  const o = opts || {};
  const cellSize = sizeIn / 10;
  const fillColor = o.fillColor || C.TEAL;
  const extraColor = o.extraColor || C.TEAL;
  validateBounds("addAreaModel", x, y, sizeIn, sizeIn);

  for (let col = 0; col < 10; col++) {
    for (let row = 0; row < 10; row++) {
      const isFullCol = col < filledTenths;
      const isExtraCell = col === filledTenths && row < extraHundredths;
      slide.addShape("rect", {
        x: x + col * cellSize,
        y: y + row * cellSize,
        w: cellSize, h: cellSize,
        fill: { color: isFullCol ? fillColor : (isExtraCell ? extraColor : C.WHITE) },
        line: { color: C.NAVY, width: 0.5 },
      });
    }
  }
}

/**
 * Draw a simple number line with adaptive label sizing.
 * @param {object} slide
 * @param {number} x, y — left anchor in inches
 * @param {number} w — width in inches
 * @param {string[]} labels — labels at each interval (left to right)
 * @param {number[]} markedPositions — 0-based indices of labelled points (marks a cross/dot)
 * @param {object} opts — { tickH, labelFontSize }
 * @returns {{ x, y, w, n, intervalW, tickH, labelW, labelFontSize }} geometry
 */
function addNumberLine(slide, x, y, w, labels, markedPositions, opts) {
  const o = opts || {};
  const tickH = o.tickH || 0.12;
  const n = labels.length - 1;  // number of intervals
  if (n <= 0) {
    console.warn("[addNumberLine] need at least 2 labels — skipping");
    return { x, y, w, n: 0, intervalW: 0, tickH, labelW: 0, labelFontSize: 12 };
  }
  const intervalW = w / n;

  // Adaptive label sizing — prevent overlaps on dense number lines
  const baseLabelW = 0.7;
  const labelW = Math.min(baseLabelW, intervalW * 1.4);
  const maxLabelLen = Math.max(...labels.filter(l => l !== "").map(l => l.length), 1);
  const baseFontSize = o.labelFontSize || 12;
  let labelFontSize = baseFontSize;
  if (intervalW < 0.5 && maxLabelLen > 3) {
    labelFontSize = Math.max(8, Math.round(baseFontSize * (intervalW / 0.5)));
  }

  validateBounds("addNumberLine", x - 0.15, y - tickH, w + 0.3, tickH + 0.4);

  // Main line
  slide.addShape("line", {
    x, y, w, h: 0,
    line: { color: C.CHARCOAL, width: 2.5 },
  });
  // Left arrowhead (end cap)
  slide.addShape("line", {
    x: x - 0.15, y: y - 0.1, w: 0.15, h: 0.1,
    line: { color: C.CHARCOAL, width: 2 },
  });
  // Right arrow
  slide.addShape("line", {
    x: x + w, y: y - 0.1, w: 0.15, h: 0.1,
    line: { color: C.CHARCOAL, width: 2 },
  });

  // Ticks and labels
  labels.forEach((lbl, i) => {
    const tx = x + i * intervalW;
    slide.addShape("line", {
      x: tx, y: y - tickH / 2, w: 0, h: tickH,
      line: { color: C.CHARCOAL, width: 2 },
    });
    if (lbl !== "") {
      slide.addText(lbl, {
        x: tx - labelW / 2, y: y + tickH / 2 + 0.04, w: labelW, h: 0.28,
        fontSize: labelFontSize, fontFace: FONT_B, color: C.CHARCOAL,
        align: "center", margin: 0,
      });
    }
  });

  // Marked points (coloured dots)
  if (markedPositions) {
    markedPositions.forEach((idx) => {
      const mx = x + idx * intervalW;
      slide.addShape("roundRect", {
        x: mx - 0.07, y: y - 0.07, w: 0.14, h: 0.14, rectRadius: 0.07,
        fill: { color: C.CORAL },
      });
    });
  }

  return { x, y, w, n, intervalW, tickH, labelW, labelFontSize };
}

// ── Click-to-reveal (duplicate slide pair) ──────────────────────────────────

/**
 * Create a click-to-reveal slide pair.
 * Calls buildFn twice: first call creates the "question" slide (no answer),
 * second call creates an identical slide, then revealFn adds the answer.
 * Teacher clicks "next" in PowerPoint to advance from question → answer.
 *
 * @param {Function} buildFn  — zero-arg function that calls a slide builder
 *                               and returns the slide (e.g. () => cfuSlide(...))
 * @param {Function} revealFn — callback(slide) that adds answer/reveal content
 * @returns {object} the answer slide (second slide)
 */
function withReveal(buildFn, revealFn) {
  buildFn();              // Slide 1: question only
  const s = buildFn();    // Slide 2: identical base
  revealFn(s);            // Add reveal content to slide 2
  return s;
}

// ── Full slide builders ──────────────────────────────────────────────────────

function titleSlide(pres, title, subtitle, meta, notes) {
  const s = pres.addSlide();
  s.background = { color: C.NAVY };
  // Geometric shapes — diagonal bars
  s.addShape("rect", {
    x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.AMBER },
  });
  s.addShape("roundRect", {
    x: 7.5, y: 4.0, w: 3.5, h: 3.5, rectRadius: 0.5,
    fill: { color: C.TEAL, transparency: 70 },
  });
  s.addShape("roundRect", {
    x: 7.2, y: -1.5, w: 3.2, h: 3.2, rectRadius: 0.5,
    fill: { color: C.AMBER, transparency: 75 },
  });
  s.addText(title, {
    x: 0.7, y: 1.0, w: 8.2, h: 1.6,
    fontSize: 36, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.7, y: 2.75, w: 7.5, h: 0.65,
      fontSize: 20, fontFace: FONT_B, color: C.LIGHT, margin: 0,
    });
  }
  if (meta) {
    s.addText(meta, {
      x: 0.7, y: 3.5, w: 7.5, h: 0.45,
      fontSize: 13, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
  }
  if (notes) s.addNotes(notes);
  return s;
}

function liSlide(pres, liItems, scItems, notes, footer) {
  const s = pres.addSlide();
  addTopBar(s);
  addTitle(s, "Learning Intentions & Success Criteria");

  const GAP = 0.14;
  const HDR_H = 0.44;
  const PAD = 0.10;
  const totalItems = liItems.length + scItems.length;
  const available = SAFE_BOTTOM - CONTENT_TOP - GAP - HDR_H * 2 - PAD * 2;
  const perItem = Math.min(0.32, available / totalItems);
  const dense = totalItems > 7;
  const liFontSize = dense ? 10 : 12;
  const scFontSize = dense ? 11 : 13;

  // LI card
  const liBody = liItems.length * perItem;
  const liH = HDR_H + liBody + PAD;
  addCard(s, 0.5, CONTENT_TOP, 9, liH, { strip: C.NAVY });
  s.addText("Learning Intentions", {
    x: 0.75, y: CONTENT_TOP + 0.07, w: 4.5, h: 0.3,
    fontSize: 13, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
  });
  const liTexts = liItems.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < liItems.length - 1, fontSize: liFontSize, color: C.CHARCOAL },
  }));
  s.addText(liTexts, {
    x: 0.75, y: CONTENT_TOP + HDR_H, w: 8.5, h: liBody,
    fontFace: FONT_B, margin: 0,
  });

  // SC card
  const scY = CONTENT_TOP + liH + GAP;
  const scBody = scItems.length * perItem;
  const scH = HDR_H + scBody + PAD;
  addCard(s, 0.5, scY, 9, scH, { strip: C.AMBER });
  s.addText("Success Criteria", {
    x: 0.75, y: scY + 0.07, w: 4.5, h: 0.3,
    fontSize: 13, fontFace: FONT_B, color: C.AMBER, bold: true, margin: 0,
  });
  const scTexts = scItems.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < scItems.length - 1, fontSize: scFontSize, color: C.CHARCOAL },
  }));
  s.addText(scTexts, {
    x: 0.75, y: scY + HDR_H, w: 8.5, h: scBody,
    fontFace: FONT_B, margin: 0,
  });

  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

/**
 * Generic content slide with stage badge, title, and a left-column bullet list.
 * Right side is left free for visual/shape content.
 * @param {object} pres
 * @param {number} stageNum
 * @param {string} stageLabel
 * @param {string} title
 * @param {string[]} bullets
 * @param {string} notes
 * @param {string} footer
 * @param {Function} drawRight — optional callback(slide) to add right-side content
 */
function contentSlide(pres, stageNum, stageLabel, title, bullets, notes, footer, drawRight) {
  const s = pres.addSlide();
  const stageColor = STAGE_COLORS[String(stageNum)] || C.NAVY;
  addTopBar(s, stageColor);
  addStageBadge(s, stageNum, stageLabel);
  addTitle(s, title, { y: 0.65, fontSize: 22, color: stageColor });

  const colW = drawRight ? 4.3 : 9;
  const bTexts = bullets.map((b, i) => ({
    text: b,
    options: { bullet: true, breakLine: i < bullets.length - 1, fontSize: 14, color: C.CHARCOAL },
  }));
  s.addText(bTexts, {
    x: 0.5, y: CONTENT_TOP, w: colW, h: SAFE_BOTTOM - CONTENT_TOP,
    fontFace: FONT_B, margin: 0, valign: "top",
  });

  if (drawRight) drawRight(s);
  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

/**
 * Worked example slide (I Do) — two-column: steps left, visual right.
 */
function workedExSlide(pres, stageNum, stageLabel, title, steps, notes, footer, drawRight) {
  const s = pres.addSlide();
  const stageColor = STAGE_COLORS[String(stageNum)] || C.NAVY;
  addTopBar(s, stageColor);
  addStageBadge(s, stageNum, stageLabel);
  addTitle(s, title, { y: 0.65, fontSize: 22, color: stageColor });

  // Steps card on left
  const cardW = drawRight ? 4.5 : 9;
  addCard(s, 0.5, CONTENT_TOP, cardW, SAFE_BOTTOM - CONTENT_TOP, { strip: stageColor });
  const stepTexts = steps.map((step, i) => ({
    text: step,
    options: { bullet: true, breakLine: i < steps.length - 1, fontSize: 13, color: C.CHARCOAL },
  }));
  s.addText(stepTexts, {
    x: 0.75, y: CONTENT_TOP + 0.12, w: cardW - 0.4, h: SAFE_BOTTOM - CONTENT_TOP - 0.2,
    fontFace: FONT_B, margin: 0, valign: "top",
  });

  if (drawRight) drawRight(s);
  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

/**
 * CFU / Prompt slide — centred card with question and technique badge.
 */
function cfuSlide(pres, stageNum, stageLabel, title, technique, question, notes, footer) {
  const s = pres.addSlide();
  const stageColor = STAGE_COLORS[String(stageNum)] || C.NAVY;
  addTopBar(s, stageColor);
  addStageBadge(s, stageNum, stageLabel);
  addTitle(s, title, { y: 0.65, fontSize: 22, color: stageColor });

  // Technique badge
  slide_addTechniqueBadge(s, technique, stageColor);

  // Question card
  addCard(s, 0.8, 2.0, 8.4, 2.5);
  s.addText(question, {
    x: 1.1, y: 2.15, w: 7.8, h: 2.2,
    fontSize: 18, fontFace: FONT_B, color: C.CHARCOAL,
    align: "center", valign: "middle", margin: 0,
  });

  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

function slide_addTechniqueBadge(slide, technique, color) {
  const w = Math.min(4.5, technique.length * 0.13 + 1.0);
  slide.addShape("roundRect", {
    x: 0.5, y: 1.5, w, h: 0.35, rectRadius: 0.08,
    fill: { color: color || C.TEAL },
  });
  slide.addText("CFU: " + technique, {
    x: 0.5, y: 1.5, w, h: 0.35,
    fontSize: 11, fontFace: FONT_B, color: C.WHITE,
    align: "center", valign: "middle", bold: true, margin: 0,
  });
}

/**
 * Exit ticket slide.
 */
function exitTicketSlide(pres, questions, notes, footer) {
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
  s.addText("Stage 5  |  Show What You Know", {
    x: 0.5, y: 0.65, w: 9, h: 0.52,
    fontSize: 22, fontFace: FONT_H, color: C.PURPLE, bold: true, margin: 0,
  });

  // Question cards
  const perH = Math.min(1.2, (SAFE_BOTTOM - 1.3) / questions.length - 0.12);
  questions.forEach((q, i) => {
    const qY = 1.3 + i * (perH + 0.12);
    addCard(s, 0.5, qY, 9, perH, { strip: C.PURPLE });
    s.addText((i + 1) + ".  " + q, {
      x: 0.75, y: qY + 0.06, w: 8.5, h: perH - 0.08,
      fontSize: 15, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
    });
  });

  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

/**
 * Closing/reflection slide (dark background).
 */
function closingSlide(pres, prompt, keyPoints, notes) {
  const s = pres.addSlide();
  s.background = { color: C.NAVY };
  s.addShape("rect", { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.AMBER } });
  s.addText("Lesson Wrap-Up", {
    x: 0.7, y: 0.5, w: 8, h: 0.7,
    fontSize: 32, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
  });
  s.addText("Turn & Talk", {
    x: 0.7, y: 1.3, w: 3, h: 0.4,
    fontSize: 16, fontFace: FONT_B, color: C.AMBER, bold: true, margin: 0,
  });
  s.addText(prompt, {
    x: 0.7, y: 1.85, w: 8.3, h: 1.1,
    fontSize: 17, fontFace: FONT_B, color: C.LIGHT, italic: true, margin: 0,
  });
  if (keyPoints && keyPoints.length) {
    s.addText("Key Takeaways", {
      x: 0.7, y: 3.1, w: 4, h: 0.4,
      fontSize: 14, fontFace: FONT_B, color: C.AMBER, bold: true, margin: 0,
    });
    keyPoints.forEach((t, i) => {
      s.addShape("roundRect", {
        x: 0.7, y: 3.6 + i * 0.38, w: 0.28, h: 0.28, rectRadius: 0.14,
        fill: { color: C.TEAL },
      });
      s.addText(t, {
        x: 1.1, y: 3.58 + i * 0.38, w: 8, h: 0.3,
        fontSize: 13, fontFace: FONT_B, color: C.LIGHT, margin: 0,
      });
    });
  }
  if (notes) s.addNotes(notes);
  return s;
}

// ── Defensive helpers ─────────────────────────────────────────────────────────

/**
 * Add a shape with centred text overlay — the safe way to put text on a shape.
 * Guarantees valign:"middle", align:"center", margin:0 unless explicitly overridden.
 * Runs contrast validation automatically.
 *
 * @param {object} slide
 * @param {string|Array} text — plain string or rich text array
 * @param {object} shapeOpts — { x, y, w, h, fill, rectRadius, shadow, line }
 *   fill can be a string (hex) or { color, transparency }
 * @param {object} textOpts — { fontSize, fontFace, color, bold, italic, align, valign, margin }
 */
function addTextOnShape(slide, text, shapeOpts, textOpts) {
  const so = shapeOpts || {};
  const to = textOpts || {};

  const shapeType = so.rectRadius ? "roundRect" : "rect";
  const fillObj = so.fill
    ? (typeof so.fill === "string" ? { color: so.fill } : so.fill)
    : undefined;

  slide.addShape(shapeType, {
    x: so.x, y: so.y, w: so.w, h: so.h,
    rectRadius: so.rectRadius,
    fill: fillObj,
    line: so.line,
    shadow: so.shadow,
  });

  // Contrast check
  if (to.color && fillObj && fillObj.color) {
    validateContrast(to.color, fillObj.color, "addTextOnShape");
  }

  slide.addText(text, {
    x: so.x, y: so.y, w: so.w, h: so.h,
    align: to.align || "center",
    valign: to.valign || "middle",
    margin: to.margin != null ? to.margin : 0,
    fontSize: to.fontSize,
    fontFace: to.fontFace || FONT_B,
    color: to.color,
    bold: to.bold,
    italic: to.italic,
  });
}

/**
 * Draw a decimal point dot positioned relative to a place value chart's geometry.
 * Use with the return value of addPlaceValueChart().
 *
 * @param {object} slide
 * @param {object} chartGeo — { cellW, hdrH, valH, x, y } from addPlaceValueChart()
 * @param {number} afterCol — 0-based column index; dot goes between afterCol and afterCol+1
 * @param {object} opts — { color, dotSize, position: "center"|"baseline" }
 */
function addDecimalDot(slide, chartGeo, afterCol, opts) {
  const o = opts || {};
  const dotSize = o.dotSize || 0.14;
  const color = o.color || C.CORAL;
  const position = o.position || "baseline";

  // Horizontal: between afterCol and afterCol+1
  const dotX = chartGeo.x + (afterCol + 1) * chartGeo.cellW - dotSize / 2;

  // Vertical: centred or baseline in value row
  let dotY;
  if (position === "center") {
    dotY = chartGeo.y + chartGeo.hdrH + chartGeo.valH / 2 - dotSize / 2;
  } else {
    dotY = chartGeo.y + chartGeo.hdrH + chartGeo.valH * 0.75 - dotSize / 2;
  }

  slide.addShape("roundRect", {
    x: dotX, y: dotY, w: dotSize, h: dotSize, rectRadius: dotSize / 2,
    fill: { color },
  });
}

module.exports = {
  C, FONT_H, FONT_B, makeShadow, makeCardShadow, STAGE_COLORS,
  SAFE_BOTTOM, CONTENT_TOP, SLIDE_W, SAFE_RIGHT,
  iconToBase64Png,
  // Element helpers
  addTopBar, addBadge, addStageBadge, addTitle, addCard, addFooter,
  slide_addTechniqueBadge,
  // Math visual helpers
  addPlaceValueChart, addTenthsStrip, addAreaModel, addNumberLine,
  // Defensive helpers
  validateBounds, addTextOnShape, addDecimalDot,
  getContrastColor, validateContrast,
  // Click-to-reveal
  withReveal,
  // Full slide builders
  titleSlide, liSlide, contentSlide, workedExSlide, cfuSlide,
  exitTicketSlide, closingSlide,
};
