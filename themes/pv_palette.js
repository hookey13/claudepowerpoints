// Place Value Sequence — Shared Colour Palette & Constants
// Grade 3/4 Mathematics: Extend Place Value and Additive Thinking (Lessons 1–5)

const C = {
  // Primary — deep navy (structure, knowledge, mathematics) — dominant 60-70%
  NAVY:        "1B3A6B",
  // Secondary — bright teal (fresh, engaging, progress)
  TEAL:        "0F7F8C",
  // Accent — warm amber (Stage 1 activation, highlights)
  AMBER:       "C97D0A",
  // Alert — coral/red (Stage 4 independent, misconceptions, alerts)
  CORAL:       "C94030",
  // Exit — purple (exit ticket, assessment)
  PURPLE:      "5D3A8C",
  // Positive — emerald (correct, proceed, success)
  EMERALD:     "1B7A4A",
  // Backgrounds
  CREAM:       "F4F7FF",   // slide background (soft blue-white)
  WHITE:       "FFFFFF",
  LIGHT:       "D6E4F5",   // light blue fill
  MINT:        "D6F0F2",   // light teal fill
  LAVENDER:    "EDE6F8",   // light purple fill
  AMBER_LIGHT: "FFF3D0",   // light amber fill
  // Text
  CHARCOAL:    "2D3142",
  MUTED:       "6B7280",
  // Supporting tones
  NAVY_LIGHT:  "4A72B8",   // lighter navy for variety
  TEAL_DARK:   "0A5A66",
};

const FONT_H = "Arial Black";
const FONT_B = "Calibri";

const makeShadow = () => ({
  type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.12, angle: 135,
});
const makeCardShadow = () => ({
  type: "outer", blur: 4, offset: 1, color: "000000", opacity: 0.10, angle: 135,
});

// Stage badge colours (lesson plan stages 1-5)
const STAGE_COLORS = {
  "1": "C97D0A",   // AMBER   — Activate Prior Knowledge
  "2": "1B3A6B",   // NAVY    — Explicit Instruction (I Do)
  "3": "0F7F8C",   // TEAL    — Guided Practice (We Do)
  "4": "C94030",   // CORAL   — Independent Practice (You Do)
  "5": "5D3A8C",   // PURPLE  — Exit Ticket
};

// ── Contrast validation utilities ─────────────────────────────────────────────

/** Parse 6-char hex (no #) to {r, g, b} in 0–255 range. */
function hexToRgb(hex) {
  const h = hex.replace(/^#/, "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

/** WCAG 2.0 relative luminance (0 = black, 1 = white). */
function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/** WCAG contrast ratio between two hex colours (>= 1). AA requires >= 4.5. */
function contrastRatio(hex1, hex2) {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Return WHITE or CHARCOAL — whichever has better contrast on the given bg. */
function getContrastColor(bgHex) {
  return luminance(bgHex) > 0.4 ? C.CHARCOAL : C.WHITE;
}

/**
 * Console-warn if text/bg contrast is below WCAG AA (4.5:1).
 * Never throws — warnings only.
 */
function validateContrast(textHex, bgHex, context) {
  const ratio = contrastRatio(textHex, bgHex);
  if (ratio < 4.5) {
    console.warn(
      `[contrast] ${context || "?"}: ratio ${ratio.toFixed(2)}:1 ` +
      `(text #${textHex} on bg #${bgHex}). Min 4.5:1. ` +
      `Suggested: use ${getContrastColor(bgHex)} instead.`
    );
  }
  return ratio >= 4.5;
}

module.exports = {
  C, FONT_H, FONT_B, makeShadow, makeCardShadow, STAGE_COLORS,
  hexToRgb, luminance, contrastRatio, getContrastColor, validateContrast,
};
