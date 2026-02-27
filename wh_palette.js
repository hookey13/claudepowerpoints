// War Horse Unit — Shared Colour Palette & Constants
// Used by all Lesson 12–15 build scripts for visual consistency

const C = {
  // Primary — deep olive (military, wartime gravitas) — dominant 60-70%
  OLIVE:     "2B3A2D",
  // Secondary — golden amber (warmth, horse, bond)
  GOLD:      "C8913B",
  // Accent — deep burgundy (sacrifice, war)
  BURGUNDY:  "8B2E3B",
  // Backgrounds
  IVORY:     "F5F0E8",
  WHITE:     "FFFFFF",
  WARM:      "FBF7F1",
  // Text
  CHARCOAL:  "2D2D2D",
  MUTED:     "7A7A7A",
  LIGHT:     "E8E4DF",
  // Supporting tones
  SAGE:      "5B7553",
  SAND:      "D9CDB8",
  CREAM_DARK:"E8DFD0",
};

const FONT_H = "Georgia";
const FONT_B = "Calibri";

const makeShadow = () => ({
  type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.12, angle: 135,
});
const makeCardShadow = () => ({
  type: "outer", blur: 4, offset: 1, color: "000000", opacity: 0.10, angle: 135,
});

module.exports = { C, FONT_H, FONT_B, makeShadow, makeCardShadow };
