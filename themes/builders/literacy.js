"use strict";

const { SAFE_BOTTOM, CONTENT_TOP } = require("../core/layout");

/**
 * Factory that returns literacy-specific slide builders bound to a given
 * palette, fonts, and element helpers.
 *
 * @param {object} C       Semantic palette colours (PRIMARY, SECONDARY, ACCENT, ALERT, SUCCESS, BG_DARK, BG_LIGHT, BG_CARD, WHITE, CHARCOAL, MUTED, TEXT_ON_DARK, SUBTITLE, DECOR_1, DECOR_2)
 * @param {string} FONT_H  Heading font name
 * @param {string} FONT_B  Body font name
 * @param {object} el       Bound element helpers: addTopBar, addBadge, addTitle, addCard, addFooter, addIconCircle, addTextOnShape
 * @returns {object}        { vocabSlide, quoteSlide, modellingSlide, pairShareSlide }
 */
function createLiteracyBuilders(C, FONT_H, FONT_B, el) {

  /* ------------------------------------------------------------------ */
  /*  vocabSlide                                                         */
  /* ------------------------------------------------------------------ */

  /**
   * Vocabulary focus slide — word, part of speech badge, definition, example sentence.
   *
   * @param {object} pres              PptxGenJS presentation instance
   * @param {string} word              The vocabulary word
   * @param {string} partOfSpeech      Part of speech label (e.g. "noun") — shown as pill badge
   * @param {string} definition        Definition text
   * @param {string} exampleSentence   Example sentence (displayed in quotes)
   * @param {string} notes             Teacher notes
   * @param {string} footer            Footer text
   * @returns {object}                 The slide object
   */
  function vocabSlide(pres, word, partOfSpeech, definition, exampleSentence, notes, footer) {
    const s = pres.addSlide();
    el.addTopBar(s, C.SECONDARY);
    el.addBadge(s, "Vocabulary", { color: C.SECONDARY });
    el.addTitle(s, "Word Study");

    // Word banner
    el.addCard(s, 0.5, CONTENT_TOP, 9, 1.1, { fill: C.PRIMARY });
    s.addText(word, {
      x: 0.7, y: CONTENT_TOP + 0.10, w: 6.5, h: 0.65,
      fontSize: 34, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
    });

    // Part-of-speech pill
    if (partOfSpeech) {
      s.addShape("roundRect", {
        x: 7.8, y: CONTENT_TOP + 0.28, w: 1.5, h: 0.38, rectRadius: 0.08,
        fill: { color: C.ACCENT },
      });
      s.addText(partOfSpeech, {
        x: 7.8, y: CONTENT_TOP + 0.28, w: 1.5, h: 0.38,
        fontSize: 11, fontFace: FONT_B, color: C.PRIMARY, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
    }

    // Definition card
    el.addCard(s, 0.5, CONTENT_TOP + 1.22, 9, 1.5, { strip: C.SECONDARY, fill: C.WHITE });
    s.addText("Definition", {
      x: 0.75, y: CONTENT_TOP + 1.30, w: 3, h: 0.30,
      fontSize: 11, fontFace: FONT_B, color: C.SECONDARY, bold: true, margin: 0,
    });
    s.addText(definition, {
      x: 0.75, y: CONTENT_TOP + 1.66, w: 8.4, h: 1.0,
      fontSize: 15, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    // Example sentence card (uses remaining space)
    const exY = CONTENT_TOP + 1.22 + 1.5 + 0.14;
    const exH = SAFE_BOTTOM - exY;
    if (exH > 0.3) {
      el.addCard(s, 0.5, exY, 9, exH, { strip: C.ACCENT, fill: C.BG_CARD });
      s.addText("Example", {
        x: 0.75, y: exY + 0.08, w: 3, h: 0.28,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
      });
      s.addText("\u201C" + exampleSentence + "\u201D", {
        x: 0.75, y: exY + 0.38, w: 8.4, h: exH - 0.50,
        fontSize: 14, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
      });
    }

    if (footer) el.addFooter(s, footer);
    if (notes) s.addNotes(notes);
    return s;
  }

  /* ------------------------------------------------------------------ */
  /*  quoteSlide                                                         */
  /* ------------------------------------------------------------------ */

  /**
   * Quote / read-aloud slide — large quote block with optional discussion question.
   *
   * @param {object} pres       PptxGenJS presentation instance
   * @param {string} badgeText  Badge label (defaults to "Read Aloud")
   * @param {string} chapter    Chapter or section title
   * @param {string} quote      The quoted text
   * @param {string} pageRef    Page reference (e.g. "p. 12")
   * @param {string} question   Discussion question shown below the quote
   * @param {string} notes      Teacher notes
   * @param {string} footer     Footer text
   * @returns {object}          The slide object
   */
  function quoteSlide(pres, badgeText, chapter, quote, pageRef, question, notes, footer) {
    const s = pres.addSlide();
    el.addTopBar(s, C.PRIMARY);
    el.addBadge(s, badgeText || "Read Aloud", { color: C.PRIMARY });
    el.addTitle(s, chapter || "Chapter");

    // Quote card (dark background)
    el.addCard(s, 0.5, CONTENT_TOP, 9, 2.1, { fill: C.PRIMARY });
    s.addText("\u201C", {
      x: 0.6, y: CONTENT_TOP + 0.05, w: 0.6, h: 0.7,
      fontSize: 52, fontFace: FONT_H, color: C.ACCENT, margin: 0,
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

    // Discussion card (uses remaining space)
    const discY = CONTENT_TOP + 2.1 + 0.14;
    const discH = SAFE_BOTTOM - discY;
    if (question && discH > 0.3) {
      el.addCard(s, 0.5, discY, 9, discH, { strip: C.ACCENT, fill: C.WHITE });
      s.addText("Discussion", {
        x: 0.75, y: discY + 0.08, w: 3, h: 0.28,
        fontSize: 11, fontFace: FONT_B, color: C.PRIMARY, bold: true, margin: 0,
      });
      s.addText(question, {
        x: 0.75, y: discY + 0.40, w: 8.5, h: discH - 0.52,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    }

    if (footer) el.addFooter(s, footer);
    if (notes) s.addNotes(notes);
    return s;
  }

  /* ------------------------------------------------------------------ */
  /*  modellingSlide                                                     */
  /* ------------------------------------------------------------------ */

  /**
   * Modelling / "I Do" slide — teacher demonstration with one or two content panels.
   * When both leftContent and rightContent are provided, renders as a two-column layout.
   * When only one is provided, renders as a single full-width card.
   *
   * @param {object} pres          PptxGenJS presentation instance
   * @param {string} badgeText     Badge label (defaults to "I Do \u2014 Watch Me")
   * @param {string} title         Slide title
   * @param {string} leftContent   Left column text (or single-panel text)
   * @param {string} rightContent  Right column text (optional)
   * @param {string} notes         Teacher notes
   * @param {string} footer        Footer text
   * @returns {object}             The slide object
   */
  function modellingSlide(pres, badgeText, title, leftContent, rightContent, notes, footer) {
    const s = pres.addSlide();
    el.addTopBar(s, C.PRIMARY);
    el.addBadge(s, badgeText || "I Do \u2014 Watch Me", { color: C.PRIMARY, w: 2.2 });
    el.addTitle(s, title);

    const cardH = SAFE_BOTTOM - CONTENT_TOP;

    if (leftContent && rightContent) {
      // Two-column layout
      el.addCard(s, 0.5, CONTENT_TOP, 4.3, cardH, { strip: C.PRIMARY, fill: C.WHITE });
      s.addText(leftContent, {
        x: 0.75, y: CONTENT_TOP + 0.12, w: 3.8, h: cardH - 0.20,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, valign: "top", margin: 0,
      });

      el.addCard(s, 5.0, CONTENT_TOP, 4.5, cardH, { strip: C.ACCENT, fill: C.BG_CARD });
      s.addText(rightContent, {
        x: 5.2, y: CONTENT_TOP + 0.12, w: 4.1, h: cardH - 0.20,
        fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, valign: "top", italic: true, margin: 0,
      });
    } else {
      // Single full-width card
      const content = leftContent || rightContent || "";
      el.addCard(s, 0.5, CONTENT_TOP, 9, cardH, { strip: C.PRIMARY, fill: C.WHITE });
      s.addText(content, {
        x: 0.75, y: CONTENT_TOP + 0.12, w: 8.5, h: cardH - 0.20,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, valign: "top", margin: 0,
      });
    }

    if (footer) el.addFooter(s, footer);
    if (notes) s.addNotes(notes);
    return s;
  }

  /* ------------------------------------------------------------------ */
  /*  pairShareSlide                                                     */
  /* ------------------------------------------------------------------ */

  /**
   * Pair-Share discussion slide — evenly spaced question cards with alternating strip colours.
   *
   * @param {object}   pres       PptxGenJS presentation instance
   * @param {string}   title      Slide title (defaults to "Discuss with Your Partner")
   * @param {string[]} questions  Array of discussion question strings
   * @param {string}   notes      Teacher notes
   * @param {string}   footer     Footer text
   * @returns {object}            The slide object
   */
  function pairShareSlide(pres, title, questions, notes, footer) {
    const s = pres.addSlide();
    el.addTopBar(s, C.SECONDARY);
    el.addBadge(s, "Pair-Share", { color: C.SECONDARY });
    el.addTitle(s, title || "Discuss with Your Partner");

    const availH = SAFE_BOTTOM - CONTENT_TOP;
    const qH = Math.min(0.95, (availH - 0.1) / Math.max(questions.length, 1));
    const fontSize = questions.length > 4 ? 13 : 15;

    questions.forEach((q, i) => {
      const y = CONTENT_TOP + i * (qH + 0.10);
      if (y + qH > SAFE_BOTTOM) return;
      el.addCard(s, 0.5, y, 9, qH, { strip: i % 2 === 0 ? C.PRIMARY : C.SECONDARY, fill: C.WHITE });
      s.addText(q, {
        x: 0.75, y: y + 0.08, w: 8.5, h: qH - 0.16,
        fontSize, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
      });
    });

    if (footer) el.addFooter(s, footer);
    if (notes) s.addNotes(notes);
    return s;
  }

  // NOTE: annotatedModelSlide is intentionally NOT overridden here.
  // The base builder's version (from base.js) supports both previewBlocks
  // and structured previewSpec (poster specs via drawMockupPreview/drawPosterSpec).
  // A stale literacy fork that only supported previewBlocks was removed in
  // March 2026. If literacy needs genuinely different annotatedModelSlide
  // behaviour in the future, add it here with a comment explaining why
  // the base version is insufficient.

  /* ------------------------------------------------------------------ */
  /*  Return all builders                                                */
  /* ------------------------------------------------------------------ */

  return { vocabSlide, quoteSlide, modellingSlide, pairShareSlide };
}

module.exports = { createLiteracyBuilders };
