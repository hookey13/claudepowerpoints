// War Horse Week 6 Helpers — Adapter module
// Wraps the factory theme system for War Horse Lessons 26-30 (Week 6, Grade 5/6 Literacy).
// Provides all standard theme exports plus the custom taskSlide builder.

"use strict";

const { createTheme, weekToVariant } = require("./factory");
const { SAFE_BOTTOM, CONTENT_TOP } = require("./core/layout");

// Week 6, Grade 5/6, Literacy → variant index for week 6
const T = createTheme("literacy", "grade56", weekToVariant(6));
const { C, FONT_H, FONT_B } = T;

/**
 * taskSlide — Structured "First, Next, Then" task slide for independent work (You Do).
 *
 * @param {object}   pres      PptxGenJS presentation instance
 * @param {string}   badgeText Badge label (e.g., "You Do")
 * @param {string}   title     Slide title
 * @param {object[]} steps     Array of { label, instruction } objects
 * @param {string}   notes     Teacher notes
 * @param {string}   footer    Footer text
 * @returns {object}           The slide object
 */
function taskSlide(pres, badgeText, title, steps, notes, footer) {
  const s = pres.addSlide();
  T.addTopBar(s, C.SUCCESS);
  T.addBadge(s, badgeText || "You Do", { color: C.SUCCESS, w: 1.4 });
  T.addTitle(s, title);

  const availH = SAFE_BOTTOM - CONTENT_TOP;
  const GAP = 0.12;
  const stepH = Math.min(1.0, (availH - GAP * (steps.length - 1)) / Math.max(steps.length, 1));

  steps.forEach((step, i) => {
    const y = CONTENT_TOP + i * (stepH + GAP);
    if (y + stepH > SAFE_BOTTOM) return;

    T.addCard(s, 0.5, y, 9, stepH, {
      strip: i === 0 ? C.PRIMARY : (i === 1 ? C.SECONDARY : C.ACCENT),
      fill: C.WHITE,
    });

    // Label pill
    s.addShape("roundRect", {
      x: 0.7, y: y + (stepH - 0.36) / 2, w: 1.2, h: 0.36, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    });
    s.addText(step.label, {
      x: 0.7, y: y + (stepH - 0.36) / 2, w: 1.2, h: 0.36,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });

    // Instruction text
    s.addText(step.instruction, {
      x: 2.05, y: y + 0.08, w: 7.2, h: stepH - 0.16,
      fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
    });
  });

  if (footer) T.addFooter(s, footer);
  if (notes) s.addNotes(notes);
  return s;
}

// Export everything from the theme plus the custom taskSlide
module.exports = {
  ...T,
  taskSlide,
};
