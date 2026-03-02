// Wellbeing — Year 5/6
// Colour palette and low-level utilities
// Warm Australian bushland palette: forest greens, warm gold, deep coral

const C = {
  // Primary — deep forest green (growth, nature, calm) — white text safe (5.8:1)
  FOREST:    "2D6A4F",
  // Secondary — leaf green — charcoal text only (too light for white)
  LEAF:      "52B788",
  // Accent — warm gold/sunshine — charcoal text only
  GOLD:      "E9C46A",
  // Alert / highlight — dark terracotta — white text safe (5.6:1)
  CORAL:     "A8402D",
  // Deep blue — alternate accent — white text safe (5.0:1)
  OCEAN:     "2B6CB0",
  // Backgrounds
  CREAM:     "FFF8EE",   // warm cream — content slide background
  PARCHMENT: "FAF0DC",   // deeper cream — card fills
  WHITE:     "FFFFFF",
  WARM:      "FFFBF5",   // near-white warm
  // Text
  CHARCOAL:  "2C2C2C",   // primary text on light backgrounds
  MUTED:     "7B8A88",   // captions, footers
  LIGHT:     "D4F0E2",   // light green-tinted — subtle text on dark backgrounds
  SAND:      "D4C9A5",   // warm sand — subtitle text on dark slides
  // Supporting
  SAGE:      "74C69D",   // lighter sage — decorative / enabling accent (charcoal text)
  MIDNIGHT:  "1B3A2D",   // deep dark green — title slides — white text safe
};

const FONT_H = "Trebuchet MS";
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
