"use strict";

// 16:9 slide dimensions (inches)
const SLIDE_W     = 10;
const SLIDE_H     = 5.625;
const SAFE_RIGHT  = 9.5;     // 0.5" right margin
const SAFE_BOTTOM = 5.1;     // max y for content (footer at 5.3)
const CONTENT_TOP = 1.3;     // y where main content starts (below badge + title)

/**
 * Warn if an element exceeds safe layout bounds.
 * Never throws — warnings only. Call inside visual helpers to catch overflow at build time.
 */
function validateBounds(label, x, y, w, h) {
  const issues = [];
  if (x + w > SLIDE_W + 0.1) {
    issues.push(`right edge ${(x + w).toFixed(2)}" exceeds slide width (${SLIDE_W}")`);
  }
  if (y + h > SLIDE_H + 0.1) {
    issues.push(`bottom ${(y + h).toFixed(2)}" exceeds slide height (${SLIDE_H}")`);
  } else if (y + h > SAFE_BOTTOM + 0.01) {
    issues.push(`bottom ${(y + h).toFixed(2)}" exceeds safe content limit (${SAFE_BOTTOM}")`);
  }
  if (issues.length > 0) {
    console.warn(`[bounds] ${label}: ${issues.join("; ")}`);
  }
  return issues.length === 0;
}

module.exports = { SLIDE_W, SLIDE_H, SAFE_RIGHT, SAFE_BOTTOM, CONTENT_TOP, validateBounds };
