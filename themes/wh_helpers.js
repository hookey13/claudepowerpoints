// War Horse Unit — Shared slide helpers for Lessons 12–15
// Imports palette from wh_palette.js, provides element + full-slide builders

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { C, FONT_H, FONT_B, makeShadow, makeCardShadow } = require("./wh_palette");

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

// ── Layout constants ────────────────────────────────────────────────────────
const SAFE_BOTTOM = 5.1;   // max y for content (footer sits at 5.3)
const CONTENT_TOP = 1.3;   // standard y where cards start below title

// ── Element helpers ─────────────────────────────────────────────────────────

function addTopBar(slide, color) {
  slide.background = { color: C.IVORY };
  slide.addShape("rect", {
    x: 0, y: 0, w: 10, h: 0.06,
    fill: { color: color || C.OLIVE },
  });
}

function addBadge(slide, text, opts) {
  const o = opts || {};
  const x = o.x != null ? o.x : 0.5;
  const y = o.y != null ? o.y : 0.2;
  const w = o.w || 1.8;
  const color = o.color || C.OLIVE;
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

function addTitle(slide, title, opts) {
  const o = opts || {};
  slide.addText(title, {
    x: o.x || 0.5, y: o.y || 0.65, w: o.w || 9, h: o.h || 0.55,
    fontSize: o.fontSize || 26, fontFace: FONT_H,
    color: o.color || C.OLIVE, bold: true, margin: 0,
  });
}

function addCard(slide, x, y, w, h, opts) {
  const o = opts || {};
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.1,
    fill: { color: o.fill || C.WHITE }, shadow: makeCardShadow(),
  });
  if (o.strip) {
    slide.addShape("rect", { x, y, w: 0.08, h, fill: { color: o.strip } });
  }
}

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0.5, y: 5.3, w: 9, h: 0.2,
    fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
  });
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

// ── Full slide builders ─────────────────────────────────────────────────────

function titleSlide(pres, title, subtitle, meta, notes) {
  const s = pres.addSlide();
  s.background = { color: C.OLIVE };
  s.addShape("rect", { x: 0, y: 0, w: 0.1, h: 5.625, fill: { color: C.GOLD } });
  s.addShape("oval", { x: 8.2, y: -0.8, w: 3, h: 3, fill: { color: C.SAGE, transparency: 50 } });
  s.addShape("oval", { x: 8.8, y: 3.8, w: 2.5, h: 2.5, fill: { color: C.GOLD, transparency: 60 } });
  s.addText(title, {
    x: 0.7, y: 1.0, w: 8, h: 1.2,
    fontSize: 40, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.7, y: 2.2, w: 8, h: 0.7,
      fontSize: 22, fontFace: FONT_B, color: C.SAND, margin: 0,
    });
  }
  if (meta) {
    s.addText(meta, {
      x: 0.7, y: 3.1, w: 8, h: 0.5,
      fontSize: 14, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
  }
  if (notes) s.addNotes(notes);
  return s;
}

function liSlide(pres, liItems, scItems, notes, footer) {
  const s = pres.addSlide();
  addTopBar(s);
  addTitle(s, "Learning Intentions & Success Criteria");

  // Dynamic sizing — fit both cards above SAFE_BOTTOM
  const GAP = 0.12;
  const LI_HDR = 0.42;       // header row height inside LI card
  const SC_HDR = 0.40;       // header row height inside SC card
  const PAD = 0.10;           // bottom padding inside each card
  const totalItems = liItems.length + scItems.length;

  // Calculate per-item height: shrink when dense (>8 total items)
  const maxPerItem = 0.28;
  const available = SAFE_BOTTOM - CONTENT_TOP - GAP - LI_HDR - SC_HDR - PAD * 2;
  const perItem = Math.min(maxPerItem, available / totalItems);

  // Font sizes — smaller when dense
  const dense = totalItems > 8;
  const liFontSize = dense ? 10 : 11;
  const scFontSize = dense ? 11 : 12;

  // LI card
  const liBody = liItems.length * perItem;
  const liH = LI_HDR + liBody + PAD;
  addCard(s, 0.5, CONTENT_TOP, 9, liH, { strip: C.OLIVE });
  s.addText("Learning Intentions", {
    x: 0.75, y: CONTENT_TOP + 0.06, w: 4, h: 0.30,
    fontSize: 13, fontFace: FONT_B, color: C.OLIVE, bold: true, margin: 0,
  });
  const liTexts = liItems.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < liItems.length - 1, fontSize: liFontSize, color: C.CHARCOAL },
  }));
  s.addText(liTexts, {
    x: 0.75, y: CONTENT_TOP + LI_HDR, w: 8.5, h: liBody,
    fontFace: FONT_B, margin: 0,
  });

  // SC card
  const scY = CONTENT_TOP + liH + GAP;
  const scBody = scItems.length * perItem;
  const scH = SC_HDR + scBody + PAD;
  addCard(s, 0.5, scY, 9, scH, { strip: C.GOLD });
  s.addText("Success Criteria", {
    x: 0.75, y: scY + 0.06, w: 4, h: 0.30,
    fontSize: 13, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
  });
  const scTexts = scItems.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < scItems.length - 1, fontSize: scFontSize, color: C.CHARCOAL },
  }));
  s.addText(scTexts, {
    x: 0.75, y: scY + SC_HDR, w: 8.5, h: scBody,
    fontFace: FONT_B, margin: 0,
  });

  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

function pausePointSlide(pres, quote, page, question, notes, footer) {
  const s = pres.addSlide();
  addTopBar(s);
  addBadge(s, "Pause Point", { color: C.GOLD });
  addTitle(s, "Stop & Discuss", { y: 0.7 });

  addCard(s, 0.5, 1.4, 9, 2.0, { strip: C.GOLD });
  s.addText("\u201C" + quote + "\u201D", {
    x: 0.85, y: 1.55, w: 8.2, h: 1.0,
    fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
  });
  s.addText("p." + page, {
    x: 8.5, y: 2.6, w: 0.8, h: 0.3,
    fontSize: 11, fontFace: FONT_B, color: C.MUTED, align: "right", margin: 0,
  });

  addCard(s, 0.5, 3.6, 9, 1.5);
  s.addText("Discussion Question", {
    x: 0.75, y: 3.7, w: 4, h: 0.35,
    fontSize: 13, fontFace: FONT_B, color: C.OLIVE, bold: true, margin: 0,
  });
  s.addText(question, {
    x: 0.75, y: 4.1, w: 8.5, h: 0.9,
    fontSize: 15, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
  });

  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

function closingSlide(pres, reflectionPrompt, takeaways, notes) {
  const s = pres.addSlide();
  s.background = { color: C.OLIVE };
  s.addShape("rect", { x: 0, y: 0, w: 0.1, h: 5.625, fill: { color: C.GOLD } });
  s.addShape("oval", { x: -1, y: 3.5, w: 3, h: 3, fill: { color: C.SAGE, transparency: 40 } });
  s.addShape("oval", { x: 8.5, y: -0.5, w: 2.5, h: 2.5, fill: { color: C.GOLD, transparency: 60 } });
  s.addText("Reflection", {
    x: 0.7, y: 0.5, w: 8, h: 0.7,
    fontSize: 36, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
  });
  s.addText("Turn & Talk", {
    x: 0.7, y: 1.3, w: 3, h: 0.4,
    fontSize: 16, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
  });
  s.addText(reflectionPrompt, {
    x: 0.7, y: 1.9, w: 8.3, h: 1.2,
    fontSize: 18, fontFace: FONT_B, color: C.SAND, italic: true, margin: 0,
  });
  if (takeaways && takeaways.length) {
    s.addText("Key Takeaways", {
      x: 0.7, y: 3.3, w: 4, h: 0.4,
      fontSize: 14, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
    });
    takeaways.forEach((t, i) => {
      s.addText("\u2022  " + t, {
        x: 0.9, y: 3.8 + i * 0.35, w: 8, h: 0.3,
        fontSize: 13, fontFace: FONT_B, color: C.LIGHT, margin: 0,
      });
    });
  }
  if (notes) s.addNotes(notes);
  return s;
}

module.exports = {
  C, FONT_H, FONT_B, makeShadow, makeCardShadow,
  SAFE_BOTTOM, CONTENT_TOP,
  iconToBase64Png,
  addTopBar, addBadge, addTitle, addCard, addFooter,
  withReveal,
  titleSlide, liSlide, pausePointSlide, closingSlide,
};
