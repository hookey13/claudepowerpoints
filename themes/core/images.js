"use strict";

const fs = require("fs");
const imageSize = require("image-size");
const { SAFE_BOTTOM, validateBounds } = require("./layout");

function isDataString(value) {
  return typeof value === "string" &&
    (/^data:/i.test(value) || /^image\/[a-z0-9.+-]+;base64,/i.test(value));
}

function getImageInput(source) {
  if (Buffer.isBuffer(source)) {
    return { kind: "buffer", value: source };
  }
  if (isDataString(source)) {
    return { kind: "data", value: source };
  }
  if (typeof source === "string") {
    return { kind: "path", value: source };
  }

  throw new Error("Unsupported image source. Use a local path, base64 image string, or Buffer.");
}

function bufferFromDataString(value) {
  const normalized = value.startsWith("data:") ? value : `data:${value}`;
  const commaIndex = normalized.indexOf(",");
  if (commaIndex < 0) {
    throw new Error("Invalid image data string. Expected base64 image header.");
  }
  return Buffer.from(normalized.slice(commaIndex + 1), "base64");
}

function getImageDimensions(source) {
  const input = getImageInput(source);
  if (input.kind === "path") {
    return imageSize(input.value);
  }
  if (input.kind === "buffer") {
    return imageSize(input.value);
  }
  return imageSize(bufferFromDataString(input.value));
}

function getImageRef(source) {
  const input = getImageInput(source);
  if (input.kind === "path") {
    if (!fs.existsSync(input.value)) {
      throw new Error(`Image path not found: ${input.value}`);
    }
    return { path: input.value };
  }
  if (input.kind === "buffer") {
    const { type } = imageSize(input.value);
    return { data: `image/${type || "png"};base64,${input.value.toString("base64")}` };
  }
  return { data: input.value.startsWith("data:") ? input.value.slice(5) : input.value };
}

function imageSizingCrop(source, x, y, w, h) {
  const { width, height } = getImageDimensions(source);
  const aspectRatio = width / height;
  const boxAspect = w / h;

  let cropXFrac;
  let cropYFrac;
  let cropWFrac;
  let cropHFrac;

  if (aspectRatio >= boxAspect) {
    cropHFrac = 1;
    cropWFrac = boxAspect / aspectRatio;
    cropXFrac = (1 - cropWFrac) / 2;
    cropYFrac = 0;
  } else {
    cropWFrac = 1;
    cropHFrac = aspectRatio / boxAspect;
    cropXFrac = 0;
    cropYFrac = (1 - cropHFrac) / 2;
  }

  let virtualW = w / cropWFrac;
  let virtualH = virtualW / aspectRatio;
  if (Math.abs((virtualH * cropHFrac) - h) > 1e-6) {
    virtualH = h / cropHFrac;
    virtualW = virtualH * aspectRatio;
  }

  return {
    x,
    y,
    w: virtualW,
    h: virtualH,
    sizing: {
      type: "crop",
      x: cropXFrac * virtualW,
      y: cropYFrac * virtualH,
      w,
      h,
    },
  };
}

function imageSizingContain(source, x, y, w, h) {
  const { width, height } = getImageDimensions(source);
  const aspectRatio = width / height;
  const boxAspect = w / h;

  let nextW;
  let nextH;
  if (aspectRatio >= boxAspect) {
    nextW = w;
    nextH = nextW / aspectRatio;
  } else {
    nextH = h;
    nextW = nextH * aspectRatio;
  }

  return {
    x: x + (w - nextW) / 2,
    y: y + (h - nextH) / 2,
    w: nextW,
    h: nextH,
  };
}

function createImageHelpers(C, FONT_H, FONT_B, el, cardShadowFn) {
  function addCaptionText(slide, text, x, y, w, h, color) {
    slide.addText(String(text), {
      x,
      y,
      w,
      h,
      fontFace: FONT_B,
      fontSize: 9.2,
      color: color || C.MUTED,
      margin: 0,
      fit: "shrink",
      valign: "top",
    });
  }

  function addImageWithCaption(slide, source, opts) {
    const o = opts || {};
    const x = Number(o.x);
    const y = Number(o.y);
    const w = Number(o.w);
    const h = Number(o.h);
    if (![x, y, w, h].every(Number.isFinite)) {
      throw new Error("addImageWithCaption requires numeric x, y, w, and h.");
    }

    const caption = o.caption ? String(o.caption) : "";
    const sourceLabel = o.sourceLabel ? String(o.sourceLabel) : "";
    const captionLineCount = (caption ? 1 : 0) + (sourceLabel ? 1 : 0);
    const captionH = captionLineCount > 0 ? Math.min(0.42, 0.04 + (captionLineCount * 0.14)) : 0;
    const imageH = Math.max(h - captionH, 0.2);
    const fit = o.fit === "contain" ? "contain" : "crop";
    const placement = fit === "contain"
      ? imageSizingContain(source, x, y, w, imageH)
      : imageSizingCrop(source, x, y, w, imageH);

    validateBounds("addImageWithCaption", x, y, w, h);
    if (y + h > SAFE_BOTTOM + 0.01) {
      console.warn(`[bounds] addImageWithCaption: bottom ${(y + h).toFixed(2)}" exceeds safe content limit (${SAFE_BOTTOM}")`);
    }

    if (o.fill || o.border) {
      slide.addShape("roundRect", {
        x,
        y,
        w,
        h: imageH,
        rectRadius: 0.08,
        fill: o.fill ? { color: o.fill } : { color: C.WHITE, transparency: 100 },
        line: o.border ? { color: o.border, width: 1 } : { color: C.WHITE, transparency: 100 },
        shadow: o.shadow || undefined,
      });
    }

    slide.addImage({
      ...getImageRef(source),
      ...placement,
      shadow: o.shadow || undefined,
    });

    let captionY = y + imageH + 0.04;
    if (caption) {
      addCaptionText(slide, caption, x, captionY, w, 0.12, o.captionColor || C.MUTED);
      captionY += 0.14;
    }
    if (sourceLabel) {
      addCaptionText(
        slide,
        sourceLabel,
        x,
        captionY,
        w,
        0.12,
        o.sourceColor || C.MUTED
      );
    }

    return {
      x,
      y,
      w,
      h,
      imageH,
    };
  }

  function addInstructionalImageCard(slide, source, opts) {
    const o = opts || {};
    const x = Number(o.x);
    const y = Number(o.y);
    const w = Number(o.w);
    const h = Number(o.h);
    if (![x, y, w, h].every(Number.isFinite)) {
      throw new Error("addInstructionalImageCard requires numeric x, y, w, and h.");
    }

    el.addCard(slide, x, y, w, h, {
      fill: o.fill || C.WHITE,
      strip: o.strip,
      shadow: o.shadow || cardShadowFn(),
    });

    const innerPad = o.pad != null ? Number(o.pad) : 0.16;
    return addImageWithCaption(slide, source, {
      x: x + innerPad,
      y: y + innerPad,
      w: w - innerPad * 2,
      h: h - innerPad * 2,
      fit: o.fit,
      caption: o.caption,
      sourceLabel: o.sourceLabel,
      border: o.border,
      shadow: undefined,
    });
  }

  return {
    getImageDimensions,
    imageSizingCrop,
    imageSizingContain,
    addImageWithCaption,
    addInstructionalImageCard,
  };
}

module.exports = {
  getImageDimensions,
  imageSizingCrop,
  imageSizingContain,
  createImageHelpers,
};
