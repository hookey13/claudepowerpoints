"use strict";

/** Parse 6-char hex (no #) to {r, g, b} in 0-255 range. */
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
  const darker  = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Return whiteHex or charcoalHex — whichever has better contrast on the given bg.
 * Caller passes their palette's WHITE and CHARCOAL values.
 */
function getContrastColor(bgHex, whiteHex, charcoalHex) {
  return luminance(bgHex) > 0.4 ? charcoalHex : whiteHex;
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
      `(text #${textHex} on bg #${bgHex}). Min 4.5:1.`
    );
  }
  return ratio >= 4.5;
}

module.exports = { hexToRgb, luminance, contrastRatio, getContrastColor, validateContrast };
