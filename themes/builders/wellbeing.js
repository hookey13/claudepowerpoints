"use strict";

const { SAFE_BOTTOM, CONTENT_TOP } = require("../core/layout");

/**
 * Factory that returns wellbeing-specific slide builders bound to a given
 * palette, fonts, and element helpers.
 *
 * @param {object} C       Semantic palette colours (PRIMARY, SECONDARY, ACCENT, ALERT, SUCCESS, BG_DARK, BG_LIGHT, BG_CARD, WHITE, CHARCOAL, MUTED, TEXT_ON_DARK, SUBTITLE, DECOR_1, DECOR_2)
 * @param {string} FONT_H  Heading font name
 * @param {string} FONT_B  Body font name
 * @param {object} el      Bound element helpers: addTopBar, addBadge, addTitle, addCard, addFooter, addIconCircle, addTextOnShape
 * @returns {object}        { pairShareSlide, scenarioSlide, reflectionSlide }
 */
function createWellbeingBuilders(C, FONT_H, FONT_B, el) {

  /* ------------------------------------------------------------------ */
  /*  pairShareSlide                                                     */
  /* ------------------------------------------------------------------ */

  /**
   * Discussion prompt slide with alternating-colour question cards.
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
    const gap = 0.10;
    const qCount = Math.max(questions.length, 1);
    const qH = Math.min(0.95, (availH - gap * (qCount - 1)) / qCount);
    const fontSize = questions.length >= 5 ? 13 : 15;

    questions.forEach((q, i) => {
      const y = CONTENT_TOP + i * (qH + gap);
      if (y + qH > SAFE_BOTTOM) return;
      el.addCard(s, 0.5, y, 9, qH, {
        strip: i % 2 === 0 ? C.PRIMARY : C.SECONDARY,
        fill: C.WHITE,
      });
      s.addText(q, {
        x: 0.75, y: y + 0.08, w: 8.5, h: qH - 0.16,
        fontSize, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
      });
    });

    if (footer) el.addFooter(s, footer);
    if (notes) s.addNotes(notes);
    return s;
  }

  /* ------------------------------------------------------------------ */
  /*  scenarioSlide                                                      */
  /* ------------------------------------------------------------------ */

  /**
   * Social scenario with discussion questions — scenario card at top,
   * question cards below.
   *
   * @param {object}   pres       PptxGenJS presentation instance
   * @param {string}   badgeText  Badge label (customisable)
   * @param {string}   title      Slide title
   * @param {string}   scenario   Scenario description text
   * @param {string[]} questions  Array of discussion question strings
   * @param {string}   notes      Teacher notes
   * @param {string}   footer     Footer text
   * @returns {object}            The slide object
   */
  function scenarioSlide(pres, badgeText, title, scenario, questions, notes, footer) {
    const s = pres.addSlide();
    el.addTopBar(s, C.PRIMARY);
    el.addBadge(s, badgeText || "Scenario", { color: C.PRIMARY });
    el.addTitle(s, title);

    // Scenario card — full width, fixed height
    const scenH = 1.6;
    el.addCard(s, 0.5, CONTENT_TOP, 9, scenH, { strip: C.PRIMARY, fill: C.WHITE });
    s.addText(scenario, {
      x: 0.75, y: CONTENT_TOP + 0.10, w: 8.5, h: scenH - 0.20,
      fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, valign: "top", margin: 0,
    });

    // Question cards — fill remaining space
    const qStartY = CONTENT_TOP + scenH + 0.12;
    const qAvail = SAFE_BOTTOM - qStartY;
    const qCount = Math.max(questions.length, 1);
    const gap = 0.10;
    const qH = Math.min(0.95, (qAvail - gap * (qCount - 1)) / qCount);

    questions.forEach((q, i) => {
      const y = qStartY + i * (qH + gap);
      if (y + qH > SAFE_BOTTOM) return;
      el.addCard(s, 0.5, y, 9, qH, { strip: C.ACCENT, fill: C.WHITE });
      s.addText(q, {
        x: 0.75, y: y + 0.08, w: 8.5, h: qH - 0.16,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
      });
    });

    if (footer) el.addFooter(s, footer);
    if (notes) s.addNotes(notes);
    return s;
  }

  /* ------------------------------------------------------------------ */
  /*  reflectionSlide                                                    */
  /* ------------------------------------------------------------------ */

  /**
   * Personal reflection slide with numbered prompt cards.
   *
   * @param {object}   pres     PptxGenJS presentation instance
   * @param {string}   title    Slide title (defaults to "Time to Reflect")
   * @param {string[]} prompts  Array of reflection prompt strings
   * @param {string}   notes    Teacher notes
   * @param {string}   footer   Footer text
   * @returns {object}          The slide object
   */
  function reflectionSlide(pres, title, prompts, notes, footer) {
    const s = pres.addSlide();
    el.addTopBar(s, C.SUCCESS);
    el.addBadge(s, "Reflect", { color: C.SUCCESS });
    el.addTitle(s, title || "Time to Reflect");

    const availH = SAFE_BOTTOM - CONTENT_TOP;
    const gap = 0.10;
    const pCount = Math.max(prompts.length, 1);
    const cardH = Math.min(0.95, (availH - gap * (pCount - 1)) / pCount);
    const numBoxW = 1.0;

    prompts.forEach((p, i) => {
      const y = CONTENT_TOP + i * (cardH + gap);
      if (y + cardH > SAFE_BOTTOM) return;

      // Card background
      el.addCard(s, 0.5, y, 9, cardH, { strip: C.SUCCESS, fill: C.WHITE });

      // Numbered accent box on the left
      s.addShape("rect", {
        x: 0.5, y: y, w: numBoxW, h: cardH,
        fill: { color: C.SUCCESS },
      });
      s.addText(String(i + 1), {
        x: 0.5, y: y, w: numBoxW, h: cardH,
        fontSize: 22, fontFace: FONT_H, color: C.WHITE,
        bold: true, align: "center", valign: "middle", margin: 0,
      });

      // Prompt text
      s.addText(p, {
        x: 0.5 + numBoxW + 0.15, y: y + 0.08, w: 9 - numBoxW - 0.40, h: cardH - 0.16,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
      });
    });

    if (footer) el.addFooter(s, footer);
    if (notes) s.addNotes(notes);
    return s;
  }

  /* ------------------------------------------------------------------ */
  /*  Return all builders                                                */
  /* ------------------------------------------------------------------ */

  return { pairShareSlide, scenarioSlide, reflectionSlide };
}

module.exports = { createWellbeingBuilders };
