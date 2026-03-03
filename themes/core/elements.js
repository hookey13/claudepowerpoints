"use strict";

const { SLIDE_W, SAFE_BOTTOM, validateBounds } = require("./layout");
const { validateContrast } = require("./contrast");

/**
 * Create element helpers bound to a specific palette.
 * All returned functions close over C, FONT_H, FONT_B, and cardShadowFn.
 *
 * @param {object}   C             - palette colours object (semantic keys)
 * @param {string}   FONT_H        - heading font name
 * @param {string}   FONT_B        - body font name
 * @param {Function} cardShadowFn  - zero-arg factory that returns a fresh card shadow object
 * @returns {object} { addTopBar, addBadge, addTitle, addCard, addFooter, addIconCircle, addTextOnShape }
 */
function createElements(C, FONT_H, FONT_B, cardShadowFn) {

  function addTopBar(slide, color) {
    slide.background = { color: C.BG_LIGHT };
    slide.addShape("rect", {
      x: 0, y: 0, w: SLIDE_W, h: 0.06,
      fill: { color: color || C.PRIMARY },
    });
  }

  function addBadge(slide, text, opts) {
    const o = opts || {};
    const x     = o.x != null ? o.x : 0.5;
    const y     = o.y != null ? o.y : 0.20;
    const w     = o.w || 1.8;
    const color = o.color || C.PRIMARY;
    slide.addShape("roundRect", {
      x, y, w, h: 0.36, rectRadius: 0.08,
      fill: { color },
    });
    slide.addText(text, {
      x, y, w, h: 0.36,
      fontSize: o.fontSize || 10, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
  }

  function addTitle(slide, title, opts) {
    const o = opts || {};
    slide.addText(title, {
      x: o.x || 0.5,
      y: o.y || 0.65,
      w: o.w || 9.0,
      h: o.h || 0.55,
      fontSize: o.fontSize || 26,
      fontFace: FONT_H,
      color: o.color || C.PRIMARY,
      bold: true,
      margin: 0,
    });
  }

  function addCard(slide, x, y, w, h, opts) {
    const o = opts || {};
    validateBounds("addCard", x, y, w, h);
    slide.addShape("roundRect", {
      x, y, w, h, rectRadius: 0.1,
      fill: { color: o.fill || C.WHITE },
      shadow: o.shadow || cardShadowFn(),
    });
    if (o.strip) {
      slide.addShape("rect", { x, y, w: 0.07, h, fill: { color: o.strip } });
    }
  }

  function addFooter(slide, text) {
    slide.addText(text, {
      x: 0.5, y: 5.32, w: 9, h: 0.20,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
  }

  /** Icon in a coloured circle (roundRect for LibreOffice compatibility). */
  function addIconCircle(slide, iconData, cx, cy, r, circleColor) {
    slide.addShape("roundRect", {
      x: cx - r, y: cy - r, w: r * 2, h: r * 2, rectRadius: r,
      fill: { color: circleColor || C.PRIMARY },
    });
    const iconSize = r * 1.1;
    slide.addImage({
      data: iconData,
      x: cx - iconSize / 2,
      y: cy - iconSize / 2,
      w: iconSize, h: iconSize,
    });
  }

  /**
   * Add a shape with centred text overlay — the safe way to put text on a shape.
   * Guarantees valign:"middle", align:"center", margin:0 unless explicitly overridden.
   * Runs contrast validation automatically.
   */
  function addTextOnShape(slide, text, shapeOpts, textOpts) {
    const so = shapeOpts || {};
    const to = textOpts || {};
    const shapeType = so.rectRadius ? "roundRect" : "rect";
    const fillObj = so.fill
      ? (typeof so.fill === "string" ? { color: so.fill } : so.fill)
      : undefined;

    slide.addShape(shapeType, {
      x: so.x, y: so.y, w: so.w, h: so.h,
      rectRadius: so.rectRadius,
      fill: fillObj,
      line: so.line,
      shadow: so.shadow,
    });

    if (to.color && fillObj && fillObj.color) {
      validateContrast(to.color, fillObj.color, "addTextOnShape");
    }

    slide.addText(text, {
      x: so.x, y: so.y, w: so.w, h: so.h,
      align:    to.align    || "center",
      valign:   to.valign   || "middle",
      margin:   to.margin != null ? to.margin : 0,
      fontSize: to.fontSize,
      fontFace: to.fontFace || FONT_B,
      color:    to.color,
      bold:     to.bold,
      italic:   to.italic,
    });
  }

  return { addTopBar, addBadge, addTitle, addCard, addFooter, addIconCircle, addTextOnShape };
}

module.exports = { createElements };
