// Kasey the Kind Kangaroo — Year 5/6 Wellbeing Program
// Colour palette and low-level utilities

const C = {
  // Primary — deep eucalyptus green (Australian bush, growth, nurturing)
  BUSH:      "2B5F4F",
  // Secondary — warm ochre (kangaroo fur, Australian earth, warmth)
  OCHRE:     "C4882F",
  // Accent — warm coral (heart, emotion, caring)
  CORAL:     "D9735B",
  // Calm — teal blue (trust, wellbeing, peace)
  TEAL:      "3A8A8C",
  // Backgrounds
  CREAM:     "FFF6ED",   // warm cream — content slide background
  PARCHMENT: "F0E4D4",   // deeper cream — card fills
  WHITE:     "FFFFFF",
  WARM:      "FBF6F0",   // near-white warm
  // Text
  CHARCOAL:  "2C2C2C",   // primary text on light backgrounds
  MUTED:     "7B8A8B",   // captions, footers
  LIGHT:     "E8DFD1",   // text on dark backgrounds (not pure white)
  SAND:      "D4C5AD",   // subtitle text on dark slides
  // Supporting
  SAGE:      "5A9E6F",   // success / extending / You Do
};

const FONT_H = "Georgia";
const FONT_B = "Calibri";

// Shadow factories — always return a fresh object (PptxGenJS mutates in place)
const makeShadow = () => ({
  type: "outer", blur: 8, offset: 3, color: "000000", opacity: 0.16, angle: 135,
});
const makeCardShadow = () => ({
  type: "outer", blur: 4, offset: 1, color: "000000", opacity: 0.10, angle: 135,
});

// ── Contrast utilities ───────────────────────────────────────────────────────

function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function luminance({ r, g, b }) {
  return [r, g, b].reduce((acc, v, i) => {
    const s = v / 255;
    const lin = s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    return acc + lin * [0.2126, 0.7152, 0.0722][i];
  }, 0);
}

function contrastRatio(hex1, hex2) {
  const l1 = luminance(hexToRgb(hex1));
  const l2 = luminance(hexToRgb(hex2));
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

function validateContrast(textHex, bgHex, label) {
  const ratio = contrastRatio(textHex, bgHex);
  if (ratio < 4.5) {
    console.warn(
      `[CONTRAST] ${label || "element"}: ${ratio.toFixed(2)}:1 — below WCAG AA. ` +
      `Text: #${textHex} on #${bgHex}`
    );
  }
}

function getContrastColor(bgHex) {
  const onWhite    = contrastRatio(C.WHITE,    bgHex);
  const onCharcoal = contrastRatio(C.CHARCOAL, bgHex);
  return onWhite >= onCharcoal ? C.WHITE : C.CHARCOAL;
}

module.exports = {
  C, FONT_H, FONT_B,
  makeShadow, makeCardShadow,
  hexToRgb, luminance, contrastRatio, validateContrast, getContrastColor,
};
