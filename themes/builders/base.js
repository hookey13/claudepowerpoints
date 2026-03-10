"use strict";

const { contrastRatio } = require("../core/contrast");
const { SLIDE_H, SAFE_BOTTOM, CONTENT_TOP } = require("../core/layout");
const { normalizeLessonTargets } = require("../core/notes");

/**
 * Create the 5 universal slide builders bound to a specific palette.
 * Every subject gets these. They close over C, FONT_H, FONT_B, el, and shadowFn.
 *
 * @param {object}   C         - palette colours (semantic keys)
 * @param {string}   FONT_H    - heading font
 * @param {string}   FONT_B    - body font
 * @param {object}   el        - bound element helpers from createElements()
 * @param {Function} shadowFn  - zero-arg shadow factory
 * @returns {object} { titleSlide, liSlide, contentSlide, cfuSlide, closingSlide }
 */
function createBaseBuilders(C, FONT_H, FONT_B, el, shadowFn) {
  function pickOnDarkColor(preferred, ...fallbacks) {
    const candidates = [preferred, ...fallbacks].filter(Boolean);
    const passing = candidates.find((color) => contrastRatio(color, C.BG_DARK) >= 4.5);
    if (passing) return passing;
    return candidates.reduce((best, color) =>
      contrastRatio(color, C.BG_DARK) > contrastRatio(best, C.BG_DARK) ? color : best
    );
  }

  const subtitleOnDark = pickOnDarkColor(C.SUBTITLE, C.TEXT_ON_DARK, C.WHITE);
  const metaOnDark = pickOnDarkColor(C.MUTED, C.TEXT_ON_DARK, C.WHITE);
  const accentOnDark = pickOnDarkColor(C.ACCENT, C.TEXT_ON_DARK, C.WHITE);

  /**
   * titleSlide - Dark full-bleed title for lesson start.
   */
  function titleSlide(pres, title, subtitle, meta, notes) {
    const s = pres.addSlide();
    s.background = { color: C.BG_DARK };

    // Vertical accent bar
    s.addShape("rect", { x: 0, y: 0, w: 0.12, h: SLIDE_H, fill: { color: C.ACCENT } });

    // Decorative shapes (large, semi-transparent)
    s.addShape("roundRect", {
      x: 7.5, y: -0.6, w: 3.5, h: 3.5, rectRadius: 1.75,
      fill: { color: C.DECOR_1, transparency: 75 },
    });
    s.addShape("roundRect", {
      x: 8.2, y: 3.8, w: 2.5, h: 2.5, rectRadius: 1.25,
      fill: { color: C.DECOR_2, transparency: 80 },
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
        fontSize: 22, fontFace: FONT_B, color: subtitleOnDark, margin: 0,
      });
    }

    // Meta line
    if (meta) {
      s.addText(meta, {
        x: 0.7, y: 3.05, w: 8.0, h: 0.4,
        fontSize: 13, fontFace: FONT_B, color: metaOnDark, margin: 0,
      });
    }

    if (notes) s.addNotes(notes);
    return s;
  }

  /**
   * liSlide - Learning Intention + Success Criteria.
   */
  function liSlide(pres, liItems, scItems, notes, footer) {
    const s = pres.addSlide();
    el.addTopBar(s, C.PRIMARY);
    el.addBadge(s, "Learning Intention");
    el.addTitle(s, "Learning Intention & Success Criteria");

    const normalizedTargets = normalizeLessonTargets(liItems, scItems);
    if (normalizedTargets.warnings.length) {
      console.warn(`[liSlide] ${normalizedTargets.warnings.join("; ")}. Keeping the first LI and first three SC items.`);
    }
    liItems = normalizedTargets.liItems;
    scItems = normalizedTargets.scItems;

    const GAP      = 0.14;
    const LI_HDR_H = 0.44;
    const SC_HDR_H = 0.40;
    const PAD      = 0.12;
    const totalItems = liItems.length + scItems.length;
    const available  = SAFE_BOTTOM - CONTENT_TOP - GAP - LI_HDR_H - SC_HDR_H - PAD * 2;
    const perItem    = Math.min(0.32, available / Math.max(totalItems, 1));
    const dense      = totalItems > 8;
    const fontSize   = dense ? 11 : 13;

    // LI card
    const liBodyH = Math.max(liItems.length * perItem, 0.48);
    const liH     = LI_HDR_H + liBodyH + PAD;
    el.addCard(s, 0.5, CONTENT_TOP, 9, liH, { strip: C.PRIMARY });
    s.addText("Learning Intention", {
      x: 0.75, y: CONTENT_TOP + 0.07, w: 5, h: 0.30,
      fontSize: 13, fontFace: FONT_B, color: C.PRIMARY, bold: true, margin: 0,
    });
    s.addText(liItems[0] || "", {
      x: 0.75, y: CONTENT_TOP + LI_HDR_H, w: 8.5, h: liBodyH,
      fontFace: FONT_B, fontSize, color: C.CHARCOAL, margin: 0, valign: "middle",
    });

    // SC card
    const scY     = CONTENT_TOP + liH + GAP;
    const scBodyH = scItems.length * perItem;
    const scH     = SC_HDR_H + scBodyH + PAD;
    el.addCard(s, 0.5, scY, 9, scH, { strip: C.ACCENT });
    s.addText("Success Criteria \u2014 I can\u2026", {
      x: 0.75, y: scY + 0.07, w: 5, h: 0.28,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
    });
    s.addText(scItems.map((t, i) => ({
      text: t,
      options: { bullet: true, breakLine: i < scItems.length - 1, fontSize, color: C.CHARCOAL },
    })), {
      x: 0.75, y: scY + SC_HDR_H, w: 8.5, h: scBodyH,
      fontFace: FONT_B, margin: 0,
    });

    if (footer) el.addFooter(s, footer);
    if (notes) s.addNotes(notes);
    return s;
  }

  /**
   * contentSlide - Standard content slide with badge, title, and bullet card.
   * Optional drawRight callback for right-column visual content.
   */
  function contentSlide(pres, badgeText, badgeColor, title, bullets, notes, footer, drawRight) {
    const s = pres.addSlide();
    el.addTopBar(s, C.PRIMARY);
    el.addBadge(s, badgeText || "Content", { color: badgeColor || C.PRIMARY });
    el.addTitle(s, title);

    const cardW = drawRight ? 5.4 : 9.0;
    const cardH = SAFE_BOTTOM - CONTENT_TOP;
    el.addCard(s, 0.5, CONTENT_TOP, cardW, cardH, {
      strip: badgeColor || C.PRIMARY,
      fill: C.WHITE,
    });

    if (bullets && bullets.length) {
      const perItem  = Math.min(0.38, (cardH - 0.18) / Math.max(bullets.length, 1));
      const fs       = bullets.length > 8 ? 12 : 14;
      s.addText(bullets.map((t, i) => ({
        text: t,
        options: { bullet: true, breakLine: i < bullets.length - 1, fontSize: fs, color: C.CHARCOAL },
      })), {
        x: 0.75, y: CONTENT_TOP + 0.12, w: cardW - 0.5, h: cardH - 0.18,
        fontFace: FONT_B, valign: "top", margin: 0,
      });
    }

    if (drawRight) drawRight(s);
    if (footer) el.addFooter(s, footer);
    if (notes) s.addNotes(notes);
    return s;
  }

  /**
   * cfuSlide - Check for Understanding slide.
   */
  function cfuSlide(pres, badgeText, title, technique, questionText, notes, footer) {
    const s = pres.addSlide();
    el.addTopBar(s, C.ALERT);
    el.addBadge(s, "CFU", { color: C.ALERT });
    el.addTitle(s, title || "Check for Understanding", { color: C.ALERT });

    // Technique pill
    s.addShape("roundRect", {
      x: 0.5, y: CONTENT_TOP, w: 2.8, h: 0.40, rectRadius: 0.08,
      fill: { color: C.ALERT },
    });
    s.addText(technique || "Show Me Boards", {
      x: 0.5, y: CONTENT_TOP, w: 2.8, h: 0.40,
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });

    // Question card
    const qY = CONTENT_TOP + 0.56;
    const qH = SAFE_BOTTOM - qY;
    el.addCard(s, 0.5, qY, 9, qH, { strip: C.ALERT, fill: C.WHITE });
    s.addText(questionText || "", {
      x: 0.75, y: qY + 0.15, w: 8.5, h: qH - 0.28,
      fontSize: 18, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
    });

    if (footer) el.addFooter(s, footer);
    if (notes) s.addNotes(notes);
    return s;
  }

  /**
   * closingSlide - Dark reflection/review slide for lesson close.
   */
  function closingSlide(pres, reflectionPrompt, takeaways, notes) {
    const s = pres.addSlide();
    s.background = { color: C.BG_DARK };

    // Accent bar
    s.addShape("rect", { x: 0, y: 0, w: 0.12, h: SLIDE_H, fill: { color: C.ACCENT } });

    // Decorative shapes
    s.addShape("roundRect", {
      x: -1.0, y: 3.2, w: 3.5, h: 3.5, rectRadius: 1.75,
      fill: { color: C.DECOR_1, transparency: 75 },
    });
    s.addShape("roundRect", {
      x: 8.5, y: -0.5, w: 2.5, h: 2.5, rectRadius: 1.25,
      fill: { color: C.DECOR_2, transparency: 80 },
    });

    s.addText("Review & Reflect", {
      x: 0.7, y: 0.45, w: 8, h: 0.8,
      fontSize: 36, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
    });
    s.addText("Turn & Talk", {
      x: 0.7, y: 1.35, w: 2.5, h: 0.38,
      fontSize: 15, fontFace: FONT_B, color: accentOnDark, bold: true, margin: 0,
    });
    s.addText(reflectionPrompt, {
      x: 0.7, y: 1.82, w: 8.5, h: 1.2,
      fontSize: 18, fontFace: FONT_B, color: subtitleOnDark, italic: true, margin: 0,
    });

    if (takeaways && takeaways.length) {
      s.addText("Key Takeaways", {
        x: 0.7, y: 3.15, w: 4, h: 0.38,
        fontSize: 14, fontFace: FONT_B, color: accentOnDark, bold: true, margin: 0,
      });
      takeaways.forEach((t, i) => {
        const y = 3.62 + i * 0.34;
        if (y + 0.28 > SAFE_BOTTOM) return;
        s.addText("\u2022  " + t, {
          x: 0.9, y, w: 8.0, h: 0.28,
          fontSize: 13, fontFace: FONT_B, color: C.TEXT_ON_DARK, margin: 0,
        });
      });
    }

    if (notes) s.addNotes(notes);
    return s;
  }

  return { titleSlide, liSlide, contentSlide, cfuSlide, closingSlide };
}

module.exports = { createBaseBuilders };
