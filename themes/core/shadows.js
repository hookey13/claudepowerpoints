"use strict";

/**
 * Create a makeShadow factory bound to the given palette's shadow params.
 * Returns a zero-arg function that produces a fresh shadow object each call
 * (PptxGenJS mutates objects in-place, so never reuse shadow objects).
 */
function makeShadow(palette) {
  return () => ({
    type: "outer",
    blur:    palette.SHADOW_BLUR    || 6,
    offset:  palette.SHADOW_OFFSET  || 2,
    color:   "000000",
    opacity: palette.SHADOW_OPACITY || 0.12,
    angle:   135,
  });
}

/**
 * Create a makeCardShadow factory bound to the given palette's card shadow params.
 */
function makeCardShadow(palette) {
  return () => ({
    type: "outer",
    blur:    palette.CARD_SHADOW_BLUR    || 4,
    offset:  palette.CARD_SHADOW_OFFSET  || 1,
    color:   "000000",
    opacity: palette.CARD_SHADOW_OPACITY || 0.10,
    angle:   135,
  });
}

module.exports = { makeShadow, makeCardShadow };
