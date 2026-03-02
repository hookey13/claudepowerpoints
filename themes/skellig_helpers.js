// Skellig Novel Study — Year 5/6 Literacy
// Slide helpers: re-exports palette + element helpers + full slide builders

const React           = require("react");
const ReactDOMServer  = require("react-dom/server");
const sharp           = require("sharp");

const {
  C, FONT_H, FONT_B,
  makeShadow, makeCardShadow,
  validateContrast, getContrastColor,
} = require("./skellig_palette");

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
    fill: { color: color || C.MIDNIGHT },
  });
}

function addBadge(slide, text, opts) {
  const o = opts || {};
  const x = o.x != null ? o.x : 0.5;
  const y = o.y != null ? o.y : 0.20;
  const w = o.w || 1.8;
  const color = o.color || C.MIDNIGHT;
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
    color: o.color || C.MIDNIGHT,
    bold: true,
    margin: 0,
  });
}

function addCard(slide, x, y, w, h, opts) {
  const o = opts || {};
  // Bounds check
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
    fill: { color: circleColor || C.MIDNIGHT },
  });
  const iconSize = r * 1.1;
  slide.addImage({
    data: iconData,
    x: cx - iconSize / 2,
    y: cy - iconSize / 2,
    w: iconSize, h: iconSize,
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

// ── Full slide builders ──────────────────────────────────────────────────────

/**
 * titleSlide — Dark full-bleed title for lesson start.
 * @param {object} pres  - PptxGenJS presentation
 * @param {string} title
 * @param {string} subtitle
 * @param {string} meta   - small meta line (e.g. lesson number, week)
 * @param {string} notes  - presenter notes
 */
function titleSlide(pres, title, subtitle, meta, notes) {
  const s = pres.addSlide();
  s.background = { color: C.MIDNIGHT };
  // Vertical gold accent bar
  s.addShape("rect", { x: 0, y: 0, w: 0.12, h: SLIDE_H, fill: { color: C.GOLD } });
  // Decorative shapes (large semi-transparent)
  s.addShape("roundRect", {
    x: 7.5, y: -0.6, w: 3.5, h: 3.5, rectRadius: 1.75,
    fill: { color: C.SLATE, transparency: 75 },
  });
  s.addShape("roundRect", {
    x: 8.2, y: 3.8, w: 2.5, h: 2.5, rectRadius: 1.25,
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
 * Hardcoded title "Learning Objective & Success Criteria"
 */
function liSlide(pres, liItems, scItems, notes, footer) {
  const s = pres.addSlide();
  addTopBar(s, C.MIDNIGHT);
  addBadge(s, "Lesson Objective");
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
  addCard(s, 0.5, CONTENT_TOP, 9, liH, { strip: C.MIDNIGHT });
  s.addText("Learning Objective", {
    x: 0.75, y: CONTENT_TOP + 0.07, w: 5, h: 0.30,
    fontSize: 13, fontFace: FONT_B, color: C.MIDNIGHT, bold: true, margin: 0,
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
    fontSize: 13, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
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
 *
 * @param {object} pres
 * @param {string} badgeText   - short label in the stage badge (e.g. "Stage 1")
 * @param {string} badgeColor  - colour for the badge fill
 * @param {string} title       - slide title
 * @param {Array}  bullets     - array of strings for bullet list
 * @param {string} notes       - presenter notes
 * @param {string} footer      - footer text
 * @param {Function} drawRight - optional callback(slide) to add right-column content
 */
function contentSlide(pres, badgeText, badgeColor, title, bullets, notes, footer, drawRight) {
  const s = pres.addSlide();
  addTopBar(s, C.MIDNIGHT);
  addBadge(s, badgeText || "Content", { color: badgeColor || C.MIDNIGHT });
  addTitle(s, title);

  const cardW  = drawRight ? 5.4 : 9.0;
  const cardH  = SAFE_BOTTOM - CONTENT_TOP;
  addCard(s, 0.5, CONTENT_TOP, cardW, cardH, { strip: badgeColor || C.MIDNIGHT, fill: C.WHITE });

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
 * vocabSlide — Single vocabulary word with definition and example sentence.
 * Large word display, definition card, example sentence.
 */
function vocabSlide(pres, word, partOfSpeech, definition, exampleSentence, notes, footer) {
  const s = pres.addSlide();
  addTopBar(s, C.SLATE);
  addBadge(s, "Vocabulary", { color: C.SLATE });
  addTitle(s, "Word Study");

  // Large word display
  addCard(s, 0.5, CONTENT_TOP, 9, 1.1, { fill: C.MIDNIGHT });
  s.addText(word, {
    x: 0.7, y: CONTENT_TOP + 0.10, w: 6.5, h: 0.65,
    fontSize: 34, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
  });
  if (partOfSpeech) {
    s.addShape("roundRect", {
      x: 7.8, y: CONTENT_TOP + 0.28, w: 1.5, h: 0.38, rectRadius: 0.08,
      fill: { color: C.GOLD },
    });
    s.addText(partOfSpeech, {
      x: 7.8, y: CONTENT_TOP + 0.28, w: 1.5, h: 0.38,
      fontSize: 11, fontFace: FONT_B, color: C.MIDNIGHT, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
  }

  // Definition card
  addCard(s, 0.5, CONTENT_TOP + 1.22, 9, 1.5, { strip: C.SLATE, fill: C.WHITE });
  s.addText("Definition", {
    x: 0.75, y: CONTENT_TOP + 1.30, w: 3, h: 0.30,
    fontSize: 11, fontFace: FONT_B, color: C.SLATE, bold: true, margin: 0,
  });
  s.addText(definition, {
    x: 0.75, y: CONTENT_TOP + 1.66, w: 8.4, h: 1.0,
    fontSize: 15, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
  });

  // Example sentence card
  const exY = CONTENT_TOP + 1.22 + 1.5 + 0.14;
  const exH = SAFE_BOTTOM - exY;
  if (exH > 0.3) {
    addCard(s, 0.5, exY, 9, exH, { strip: C.GOLD, fill: C.PARCHMENT });
    s.addText("Example", {
      x: 0.75, y: exY + 0.08, w: 3, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
    });
    s.addText("\u201C" + exampleSentence + "\u201D", {
      x: 0.75, y: exY + 0.38, w: 8.4, h: exH - 0.50,
      fontSize: 14, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });
  }

  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

/**
 * pairShareSlide — Discussion prompt slide with question(s) for Pair-Share.
 */
function pairShareSlide(pres, title, questions, notes, footer) {
  const s = pres.addSlide();
  addTopBar(s, C.SLATE);
  addBadge(s, "Pair-Share", { color: C.SLATE });
  addTitle(s, title || "Discuss with Your Partner");

  const availH  = SAFE_BOTTOM - CONTENT_TOP;
  const qH      = Math.min(0.95, (availH - 0.1) / Math.max(questions.length, 1));
  const fontSize = questions.length > 4 ? 13 : 15;

  questions.forEach((q, i) => {
    const y = CONTENT_TOP + i * (qH + 0.10);
    if (y + qH > SAFE_BOTTOM) return;
    addCard(s, 0.5, y, 9, qH, { strip: i % 2 === 0 ? C.MIDNIGHT : C.SLATE, fill: C.WHITE });
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
 * quoteSlide — Display a text quote with discussion question.
 */
function quoteSlide(pres, badgeText, chapter, quote, pageRef, question, notes, footer) {
  const s = pres.addSlide();
  addTopBar(s, C.MIDNIGHT);
  addBadge(s, badgeText || "Read Aloud", { color: C.MIDNIGHT });
  addTitle(s, chapter || "Chapter");

  // Quote card
  addCard(s, 0.5, CONTENT_TOP, 9, 2.1, { fill: C.MIDNIGHT });
  s.addText("\u201C", {
    x: 0.6, y: CONTENT_TOP + 0.05, w: 0.6, h: 0.7,
    fontSize: 52, fontFace: FONT_H, color: C.GOLD, margin: 0,
  });
  s.addText(quote, {
    x: 1.1, y: CONTENT_TOP + 0.18, w: 7.6, h: 1.7,
    fontSize: 16, fontFace: FONT_H, color: C.WHITE, italic: true, margin: 0,
  });
  if (pageRef) {
    s.addText(pageRef, {
      x: 8.5, y: CONTENT_TOP + 1.75, w: 0.9, h: 0.24,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, align: "right", margin: 0,
    });
  }

  // Discussion card
  const discY = CONTENT_TOP + 2.1 + 0.14;
  const discH = SAFE_BOTTOM - discY;
  if (question && discH > 0.3) {
    addCard(s, 0.5, discY, 9, discH, { strip: C.GOLD, fill: C.WHITE });
    s.addText("Discussion", {
      x: 0.75, y: discY + 0.08, w: 3, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.MIDNIGHT, bold: true, margin: 0,
    });
    s.addText(question, {
      x: 0.75, y: discY + 0.40, w: 8.5, h: discH - 0.52,
      fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
  }

  if (footer) addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

/**
 * cfuSlide — Check for Understanding slide.
 */
function cfuSlide(pres, badgeText, title, technique, questionText, notes, footer) {
  const s = pres.addSlide();
  addTopBar(s, C.CRIMSON);
  addBadge(s, "CFU", { color: C.CRIMSON });
  addTitle(s, title || "Check for Understanding", { color: C.CRIMSON });

  // Technique pill
  s.addShape("roundRect", {
    x: 0.5, y: CONTENT_TOP, w: 2.8, h: 0.40, rectRadius: 0.08,
    fill: { color: C.CRIMSON },
  });
  s.addText(technique || "Show Me Boards", {
    x: 0.5, y: CONTENT_TOP, w: 2.8, h: 0.40,
    fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Question card
  const qY = CONTENT_TOP + 0.56;
  const qH = SAFE_BOTTOM - qY;
  addCard(s, 0.5, qY, 9, qH, { strip: C.CRIMSON, fill: C.WHITE });
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
 */
function taskSlide(pres, badgeText, title, steps, notes, footer) {
  // steps: array of {label, instruction} e.g. [{label:"First", instruction:"..."}, ...]
  const s = pres.addSlide();
  addTopBar(s, C.SAGE);
  addBadge(s, badgeText || "You Do", { color: C.SAGE });
  addTitle(s, title || "Your Turn");

  const availH  = SAFE_BOTTOM - CONTENT_TOP;
  const stepH   = Math.min(1.1, (availH - 0.1) / Math.max(steps.length, 1));
  const fontSize = 14;

  const labelColors = [C.MIDNIGHT, C.SLATE, C.SAGE, C.AMBER];
  steps.forEach((step, i) => {
    const y = CONTENT_TOP + i * (stepH + 0.10);
    if (y + stepH > SAFE_BOTTOM) return;
    const lc = labelColors[i % labelColors.length];
    addCard(s, 0.5, y, 9, stepH, { fill: C.WHITE });
    // Step label box
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
 * modellingSlide — I Do slide showing teacher modelling with example text/annotations.
 * Left card: key labels/terms. Right area: worked example text.
 */
function modellingSlide(pres, badgeText, title, leftContent, rightContent, notes, footer) {
  const s = pres.addSlide();
  addTopBar(s, C.MIDNIGHT);
  addBadge(s, badgeText || "I Do — Watch Me", { color: C.MIDNIGHT, w: 2.2 });
  addTitle(s, title);

  const cardH = SAFE_BOTTOM - CONTENT_TOP;

  if (leftContent && rightContent) {
    // Two-column layout
    addCard(s, 0.5, CONTENT_TOP, 4.3, cardH, { strip: C.MIDNIGHT, fill: C.WHITE });
    s.addText(leftContent, {
      x: 0.75, y: CONTENT_TOP + 0.12, w: 3.8, h: cardH - 0.20,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, valign: "top", margin: 0,
    });

    addCard(s, 5.0, CONTENT_TOP, 4.5, cardH, { strip: C.GOLD, fill: C.PARCHMENT });
    s.addText(rightContent, {
      x: 5.2, y: CONTENT_TOP + 0.12, w: 4.1, h: cardH - 0.20,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, valign: "top", italic: true, margin: 0,
    });
  } else {
    // Single full-width card
    const content = leftContent || rightContent || "";
    addCard(s, 0.5, CONTENT_TOP, 9, cardH, { strip: C.MIDNIGHT, fill: C.WHITE });
    s.addText(content, {
      x: 0.75, y: CONTENT_TOP + 0.12, w: 8.5, h: cardH - 0.20,
      fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, valign: "top", margin: 0,
    });
  }

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
    fill: { color: C.SLATE, transparency: 75 },
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
  vocabSlide,
  pairShareSlide,
  quoteSlide,
  cfuSlide,
  taskSlide,
  modellingSlide,
  closingSlide,
};
