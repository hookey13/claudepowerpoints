"use strict";

/**
 * Create a click-to-reveal slide pair.
 * Calls buildFn twice: first call creates the "question" slide (no answer),
 * second call creates an identical slide, then revealFn adds the answer.
 * Teacher clicks "next" in PowerPoint to advance from question -> answer.
 *
 * @param {Function} buildFn  - zero-arg function that calls a slide builder
 *                               and returns the slide (e.g. () => cfuSlide(...))
 * @param {Function} revealFn - callback(slide) that adds answer/reveal content
 * @returns {object} the answer slide (second slide)
 */
function withReveal(buildFn, revealFn) {
  buildFn();              // Slide 1: question only
  const s = buildFn();    // Slide 2: identical base
  revealFn(s);            // Add reveal content to slide 2
  return s;
}

module.exports = { withReveal };
