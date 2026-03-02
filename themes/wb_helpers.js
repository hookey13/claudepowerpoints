// Wellbeing — Year 5/6
// Slide helpers: re-exports palette + element helpers + full slide builders

const React          = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp          = require("sharp");

const {
  C, FONT_H, FONT_B,
  makeShadow, makeCardShadow,
  validateContrast, getContrastColor,
} = require("./wb_palette");

// ── Layout constants ─────────────────────────────────────────────────────────
const SLIDE_W    = 10;
const SLIDE_H    = 5.625;
const SAFE_RIGHT  = 9.5;
const SAFE_BOTTOM = 5.1;
const CONTENT_TOP = 1.3;    // y where main content starts (below badge + title)

// ── Icon rendering ───────────────────────────────────────────────────────────

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

// ── Element helpers ──────────────────────────────────────────────────────────

function addTopBar(slide, color) {
  slide.background = { color: C.CREAM };
  slide.addShape("rect", {
    x: 0, y: 0, w: SLIDE_W, h: 0.06,
    fill: { color: color || C.FOREST },
  });
}

function addBadge(slide, text, opts) {
  const o = opts || {};
  const x = o.x != null ? o.x : 0.5;
  const y = o.y != null ? o.y : 0.20;
  const w = o.w || 1.8;
  const color = o.color || C.FOREST;
  slide.addShape("roundRect", {
    x, y, w, h: 0.36, rectRadius: 0.08,
    fill: { color },
  });
  slide.addText(text, {
    x, y, w, h: 0.36,
    fontSize: 10, fontFace: FONT_B, color: C.WHITE,
    align: "center", valign: "middle", bold: true, margin: 0,
  });
}

function addTitle(slide, title, opts) {
  const o = opts || {};
  slide.addText(title, {
    x: o.x || 0.5,
    y: o.y || 0.65,
    w: o.w || 9.0,
    h: o.h || 0.55,
    fontSize: o.fontSize || 26,
    fontFace: FONT_H,
    color: o.color || C.FOREST,
    bold: true,
    margin: 0,
  });
}

function addCard(slide, x, y, w, h, opts) {
  const o = opts || {};
  if (y + h > SAFE_BOTTOM + 0.01) {
    console.warn(`[BOUNDS] addCard overflow: y=${y}, h=${h}, bottom=${y + h} > SAFE_BOTTOM=${SAFE_BOTTOM}`);
  }
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.1,
    fill: { color: o.fill || C.WHITE },
    shadow: makeCardShadow(),
  });
  if (o.strip) {
    slide.addShape("rect", { x, y, w: 0.07, h, fill: { color: o.strip } });
  }
}

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0.5, y: 5.32, w: 9, h: 0.20,
    fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
  });
}

// Icon in a coloured circle (roundRect used for LibreOffice compatibility)
function addIconCircle(slide, iconData, cx, cy, r, circleColor) {
  slide.addShape("roundRect", {
    x: cx - r, y: cy - r, w: r * 2, h: r * 2, rectRadius: r,
    fill: { color: circleColor || C.FOREST },
  });
  const iconSize = r * 1.1;
  slide.addImage({
    data: iconData,
    x: cx - iconSize / 2,
    y: cy - iconSize / 2,
    w: iconSize, h: iconSize,
  });
}

// ── Click-to-reveal (duplicate slide pair) ───────────────────────────────────

/**
 * Create a click-to-reveal slide pair.
 * Calls buildFn twice (question-only, then question+answer).
 * Teacher clicks "next" in PowerPoint to advance from question → answer.
 */
function withReveal(buildFn, revealFn) {
  buildFn();              // Slide 1: question only
  const s = buildFn();    // Slide 2: identical base
  revealFn(s);            // Add reveal content to slide 2
  return s;
}

// ── Full slide builders ──────────────────────────────────────────────────────

/**
 * titleSlide — Dark full-bleed title for lesson start.
 */
function titleSlide(pres, title, subtitle, meta, notes) {
  const s = pres.addSlide();
  s.background = { color: C.MIDNIGHT };
  // Vertical gold accent bar
  s.addShape("rect", { x: 0, y: 0, w: 0.12, h: SLIDE_H, fill: { color: C.GOLD } });
  // Decorative shapes (large semi-transparent)
  s.addShape("roundRect", {
    x: 7.0, y: -0.8, w: 4.0, h: 4.0, rectRadius: 2.0,
    fill: { color: C.FOREST, transparency: 72 },
  });
  s.addShape("roundRect", {
    x: 8.0, y: 3.5, w: 2.8, h: 2.8, rectRadius: 1.4,
    fill: { color: C.GOLD, transparency: 80 },
  });
  // Title
  s.addText(title, {
    x: 0.7, y: 0.9, w: 8.0, h: 1.3,
    fontSize: 40, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
  });
  // Subtitle
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.7, y: 2.25, w: 8.0, h: 0.7,
      fontSize: 22, fontFace: FONT_B, color: C.SAND, margin: 0,
    });
  }
  // Meta
  if (meta) {
    s.addText(meta, {
      x: 0.7, y: 3.05, w: 8.0, h: 0.4,
      fontSize: 13, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
  }
  if (notes) s.addNotes(notes);
  return s;
}

/**
 * liSlide — Learning Intention + Success Criteria.
 */
function liSlide(pres, liItems, scItems, notes, footer) {
  const s = pres.addSlide();
  addTopBar(s, C.FOREST);
  addBadge(s, "Learning Objective");
  addTitle(s, "Learning Objective & Success Criteria");

  const GAP        = 0.14;
  const LI_HDR_H   = 0.44;
  const SC_HDR_H   = 0.40;
  const PAD        = 0.12;
  const totalItems = liItems.length + scItems.length;
  const maxPerItem = 0.32;
  const available  = SAFE_BOTTOM - CONTENT_TOP - GAP - LI_HDR_H - SC_HDR_H - PAD * 2;
  const perItem    = Math.min(maxPerItem, available / Math.max(totalItems, 1));
  const dense      = totalItems > 8;
  const liFontSize = dense ? 11 : 13;
  const scFontSize = dense ? 11 : 13;

  // LI card
  const liBodyH = liItems.length * perItem;
  const liH     = LI_HDR_H + liBodyH + PAD;
  addCard(s, 0.5, CONTENT_TOP, 9, liH, { strip: C.FOREST });
  s.addText("Learning Objective", {
    x: 0.75, y: CONTENT_TOP + 0.07, w: 5, h: 0.30,
    fontSize: 13, fontFace: FONT_B, color: C.FOREST, bold: true, margin: 0,
  });
  const liTexts = liItems.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < liItems.length - 1, fontSize: liFontSize, color: C.CHARCOAL },
  }));
  s.addText(liTexts, {
    x: 0.75, y: CONTENT_TOP + LI_HDR_H, w: 8.5, h: liBodyH,
    fontFace: FONT_B, margin: 0,
  });

  // SC card
  const scY     = CONTENT_TOP + liH + GAP;
  const scBodyH = scItems.length * perItem;
  const scH     = SC_HDR_H + scBodyH + PAD;
  addCard(s, 0.5, scY, 9, scH, { strip: C.GOLD });
  s.addText("Success Criteria — I can…", {
    x: 0.75, y: scY + 0.07, w: 5, h: 0.28,
    fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
  });
  const scTexts = scItems.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < scItems.length - 1, fontSize: scFontSize, color: C.CHARCOAL },
  }));
  s.addText(scTexts, {
    x: 0.75, y: scY + SC_HDR_H, w: 8.5, h: scBodyH,
    fontFace: FONT_B, margin: 0,
  });

  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

/**
 * contentSlide — Standard content slide with badge, title, and bullet card.
 * Optional drawRight callback for right-column visual content.
 */
function contentSlide(pres, badgeText, badgeColor, title, bullets, notes, footer, drawRight) {
  const s = pres.addSlide();
  addTopBar(s, C.FOREST);
  addBadge(s, badgeText || "Content", { color: badgeColor || C.FOREST });
  addTitle(s, title);

  const cardW  = drawRight ? 5.4 : 9.0;
  const cardH  = SAFE_BOTTOM - CONTENT_TOP;
  addCard(s, 0.5, CONTENT_TOP, cardW, cardH, { strip: badgeColor || C.FOREST, fill: C.WHITE });

  if (bullets && bullets.length) {
    const perItem   = Math.min(0.38, (cardH - 0.18) / Math.max(bullets.length, 1));
    const fontSize  = bullets.length > 8 ? 12 : 14;
    const bullTexts = bullets.map((t, i) => ({
      text: t,
      options: { bullet: true, breakLine: i < bullets.length - 1, fontSize, color: C.CHARCOAL },
    }));
    s.addText(bullTexts, {
      x: 0.75, y: CONTENT_TOP + 0.12, w: cardW - 0.5, h: cardH - 0.18,
      fontFace: FONT_B, valign: "top", margin: 0,
    });
  }

  if (drawRight) drawRight(s);
  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

/**
 * pairShareSlide — Discussion prompt slide with question(s) for Pair-Share.
 */
function pairShareSlide(pres, title, questions, notes, footer) {
  const s = pres.addSlide();
  addTopBar(s, C.OCEAN);
  addBadge(s, "Discuss", { color: C.OCEAN });
  addTitle(s, title || "Discuss with Your Partner", { color: C.OCEAN });

  const availH  = SAFE_BOTTOM - CONTENT_TOP;
  const qH      = Math.min(0.95, (availH - 0.1) / Math.max(questions.length, 1));
  const fontSize = questions.length > 4 ? 13 : 15;

  questions.forEach((q, i) => {
    const y = CONTENT_TOP + i * (qH + 0.10);
    if (y + qH > SAFE_BOTTOM) return;
    addCard(s, 0.5, y, 9, qH, { strip: i % 2 === 0 ? C.FOREST : C.OCEAN, fill: C.WHITE });
    s.addText(q, {
      x: 0.75, y: y + 0.08, w: 8.5, h: qH - 0.16,
      fontSize, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
    });
  });

  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

/**
 * cfuSlide — Check for Understanding slide.
 */
function cfuSlide(pres, badgeText, title, technique, questionText, notes, footer) {
  const s = pres.addSlide();
  addTopBar(s, C.CORAL);
  addBadge(s, "CFU", { color: C.CORAL });
  addTitle(s, title || "Check for Understanding", { color: C.CORAL });

  // Technique pill
  s.addShape("roundRect", {
    x: 0.5, y: CONTENT_TOP, w: 2.8, h: 0.40, rectRadius: 0.08,
    fill: { color: C.CORAL },
  });
  s.addText(technique || "Show Me Boards", {
    x: 0.5, y: CONTENT_TOP, w: 2.8, h: 0.40,
    fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Question card
  const qY = CONTENT_TOP + 0.56;
  const qH = SAFE_BOTTOM - qY;
  addCard(s, 0.5, qY, 9, qH, { strip: C.CORAL, fill: C.WHITE });
  s.addText(questionText || "", {
    x: 0.75, y: qY + 0.15, w: 8.5, h: qH - 0.28,
    fontSize: 18, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
  });

  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

/**
 * taskSlide — "First, Next, Then" independent practice task.
 * steps: array of { label, instruction }
 */
function taskSlide(pres, badgeText, title, steps, notes, footer) {
  const s = pres.addSlide();
  addTopBar(s, C.FOREST);
  addBadge(s, badgeText || "You Do", { color: C.FOREST });
  addTitle(s, title || "Your Turn");

  const availH  = SAFE_BOTTOM - CONTENT_TOP;
  const stepH   = Math.min(1.1, (availH - 0.1) / Math.max(steps.length, 1));
  const fontSize = 14;

  const labelColors = [C.FOREST, C.OCEAN, C.CORAL, C.MIDNIGHT];
  steps.forEach((step, i) => {
    const y = CONTENT_TOP + i * (stepH + 0.10);
    if (y + stepH > SAFE_BOTTOM) return;
    const lc = labelColors[i % labelColors.length];
    addCard(s, 0.5, y, 9, stepH, { fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.5, y, w: 1.2, h: stepH, rectRadius: 0.08,
      fill: { color: lc },
    });
    s.addText(step.label || ("Step " + (i + 1)), {
      x: 0.5, y, w: 1.2, h: stepH,
      fontSize: 15, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(step.instruction, {
      x: 1.85, y: y + 0.08, w: 7.4, h: stepH - 0.16,
      fontSize, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
    });
  });

  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

/**
 * closingSlide — Dark reflection/review slide for lesson close.
 */
function closingSlide(pres, reflectionPrompt, takeaways, notes) {
  const s = pres.addSlide();
  s.background = { color: C.MIDNIGHT };
  // Accent bar
  s.addShape("rect", { x: 0, y: 0, w: 0.12, h: SLIDE_H, fill: { color: C.GOLD } });
  // Decorative shapes
  s.addShape("roundRect", {
    x: -1.0, y: 3.2, w: 3.5, h: 3.5, rectRadius: 1.75,
    fill: { color: C.FOREST, transparency: 75 },
  });
  s.addShape("roundRect", {
    x: 8.5, y: -0.5, w: 2.5, h: 2.5, rectRadius: 1.25,
    fill: { color: C.GOLD, transparency: 80 },
  });

  s.addText("Review & Reflect", {
    x: 0.7, y: 0.45, w: 8, h: 0.8,
    fontSize: 36, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
  });
  s.addText("Turn & Talk", {
    x: 0.7, y: 1.35, w: 2.5, h: 0.38,
    fontSize: 15, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
  });
  s.addText(reflectionPrompt, {
    x: 0.7, y: 1.82, w: 8.5, h: 1.2,
    fontSize: 18, fontFace: FONT_B, color: C.SAND, italic: true, margin: 0,
  });

  if (takeaways && takeaways.length) {
    s.addText("Key Takeaways", {
      x: 0.7, y: 3.15, w: 4, h: 0.38,
      fontSize: 14, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
    });
    takeaways.forEach((t, i) => {
      const y = 3.62 + i * 0.34;
      if (y + 0.28 > SAFE_BOTTOM) return;
      s.addText("\u2022  " + t, {
        x: 0.9, y, w: 8.0, h: 0.28,
        fontSize: 13, fontFace: FONT_B, color: C.LIGHT, margin: 0,
      });
    });
  }

  if (notes) s.addNotes(notes);
  return s;
}

// ── Exports ──────────────────────────────────────────────────────────────────

module.exports = {
  // Palette re-exports
  C, FONT_H, FONT_B,
  makeShadow, makeCardShadow,
  validateContrast, getContrastColor,

  // Layout constants
  SLIDE_W, SLIDE_H, SAFE_RIGHT, SAFE_BOTTOM, CONTENT_TOP,

  // Element helpers
  iconToBase64Png,
  addTopBar, addBadge, addTitle, addCard, addFooter, addIconCircle,

  // Click-to-reveal
  withReveal,

  // Full slide builders
  titleSlide,
  liSlide,
  contentSlide,
  pairShareSlide,
  cfuSlide,
  taskSlide,
  closingSlide,
};
