"use strict";

const React          = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp          = require("sharp");

const iconPngCache = new WeakMap();

function renderIconSvg(Comp, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(Comp, { color, size: String(size) })
  );
}

async function iconToBase64Png(Comp, color, size = 256) {
  let componentCache = iconPngCache.get(Comp);
  if (!componentCache) {
    componentCache = new Map();
    iconPngCache.set(Comp, componentCache);
  }

  const cacheKey = `${color}|${size}`;
  if (!componentCache.has(cacheKey)) {
    const renderPromise = sharp(Buffer.from(renderIconSvg(Comp, color, size)))
      .png()
      .toBuffer()
      .then((buf) => "image/png;base64," + buf.toString("base64"))
      .catch((err) => {
        componentCache.delete(cacheKey);
        throw err;
      });
    componentCache.set(cacheKey, renderPromise);
  }

  return componentCache.get(cacheKey);
}

module.exports = { renderIconSvg, iconToBase64Png };
