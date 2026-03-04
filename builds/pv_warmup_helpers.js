// Shared layout helpers for PV Warm-up Day 6–10 build scripts.
// These are specific to the place value warm-up series and require
// a bound theme object from createTheme("numeracy", ...).

"use strict";

function createWarmupHelpers(T) {
  const { C, FONT_H, FONT_B, addTextOnShape } = T;

  /**
   * Display numbers in coloured cards in a centered row.
   * @param {object} slide
   * @param {string[]} numbers – e.g. ["6,382", "6,328", "6,832", "6,283"]
   * @param {number} y – vertical position (inches)
   * @param {object} [opts] – { color, cardW, cardH, fontSize }
   */
  function addNumberCards(slide, numbers, y, opts) {
    const o = opts || {};
    const cardW = o.cardW || 1.8;
    const cardH = o.cardH || 0.7;
    const gap = 0.25;
    const totalW = numbers.length * cardW + (numbers.length - 1) * gap;
    const startX = (10 - totalW) / 2;
    numbers.forEach((num, i) => {
      addTextOnShape(slide, String(num), {
        x: startX + i * (cardW + gap), y, w: cardW, h: cardH,
        rectRadius: 0.1, fill: { color: o.color || C.PRIMARY },
      }, {
        fontSize: o.fontSize || 24, fontFace: FONT_H,
        color: C.WHITE, bold: true,
      });
    });
  }

  /**
   * Display a skip-counting sequence with +100 labels between boxes.
   * Use "?" for gap items (shown with dashed border).
   * @param {object} slide
   * @param {string[]} items – e.g. ["4,830", "?", "?", "?", "5,230"]
   * @param {number} y
   * @param {object} [opts] – { color, boxW, boxH, fontSize, gapColor }
   */
  function addSequenceRow(slide, items, y, opts) {
    const o = opts || {};
    const boxW = o.boxW || 1.15;
    const boxH = o.boxH || 0.55;
    const arrowW = 0.35;
    const n = items.length;
    const totalW = n * boxW + (n - 1) * arrowW;
    const startX = (10 - totalW) / 2;
    items.forEach((item, i) => {
      const x = startX + i * (boxW + arrowW);
      const isGap = item === "?";
      addTextOnShape(slide, String(item), {
        x, y, w: boxW, h: boxH, rectRadius: 0.08,
        fill: { color: isGap ? C.BG_CARD : (o.color || C.PRIMARY) },
        line: isGap ? { color: C.PRIMARY, width: 1.5, dashType: "dash" } : undefined,
      }, {
        fontSize: o.fontSize || 17, fontFace: FONT_H,
        color: isGap ? C.CHARCOAL : C.WHITE, bold: true,
      });
      if (i < n - 1) {
        slide.addText("+100", {
          x: x + boxW, y: y + boxH * 0.15, w: arrowW, h: boxH * 0.7,
          fontSize: 8, fontFace: FONT_B, color: C.MUTED,
          align: "center", valign: "middle", margin: 0,
        });
      }
    });
  }

  /**
   * Coloured answer bar for withReveal answer slides.
   * @param {object} slide
   * @param {string} text
   * @param {number} y
   * @param {object} [opts] – { color, w, h, fontSize }
   */
  function addAnswerBar(slide, text, y, opts) {
    const o = opts || {};
    addTextOnShape(slide, text, {
      x: 0.5, y, w: o.w || 9, h: o.h || 0.55, rectRadius: 0.08,
      fill: { color: o.color || C.SUCCESS },
    }, {
      fontSize: o.fontSize || 18, fontFace: FONT_H,
      color: C.WHITE, bold: true,
    });
  }

  /**
   * Small explanation text below an answer bar (italic, muted).
   */
  function addExplanation(slide, text, y) {
    slide.addText(text, {
      x: 0.5, y, w: 9, h: 0.35,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
  }

  return { addNumberCards, addSequenceRow, addAnswerBar, addExplanation };
}

module.exports = { createWarmupHelpers };
