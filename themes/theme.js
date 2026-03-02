const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

const C = {
  SLATE: "1B3F94", CREAM: "F5F3F0", SAND: "E8E4DF", CHARCOAL: "000000",
  AMBER: "F98E1F", SAGE: "4A7C59", BRICK: "B85450", WHITE: "FFFFFF",
  MUTED: "8B8B8B", LIGHT: "E9ECF0", WARM: "FDF8F3",
};
const FONT = "Calibri";
const makeShadow = () => ({ type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.12, angle: 135 });
const makeCardShadow = () => ({ type: "outer", blur: 4, offset: 1, color: "000000", opacity: 0.10, angle: 135 });

function renderIconSvg(Comp, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color, size: String(size) }));
}
async function iconToBase64Png(Comp, color, size = 256) {
  const svg = renderIconSvg(Comp, color, size);
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ── Slide Helpers ──

function addTopBar(slide) {
  slide.background = { color: C.CREAM };
  slide.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.SLATE } });
}

function addStageBadge(slide, text, color) {
  color = color || C.SLATE;
  slide.addShape("roundRect", { x: 0.5, y: 0.2, w: 1.8, h: 0.36, rectRadius: 0.08, fill: { color } });
  slide.addText(text, { x: 0.5, y: 0.2, w: 1.8, h: 0.36, fontSize: 11, fontFace: FONT, color: C.WHITE, align: "center", valign: "middle", bold: true, margin: 0 });
}

function addSlideTitle(slide, title, opts) {
  const x = (opts && opts.x) || 0.5;
  const y = (opts && opts.y) || 0.65;
  const w = (opts && opts.w) || 9;
  slide.addText(title, { x, y, w, h: 0.55, fontSize: 26, fontFace: FONT, color: C.SLATE, bold: true, margin: 0 });
}

function addCard(slide, x, y, w, h, opts) {
  const strip = opts && opts.strip;
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.1, fill: { color: C.WHITE }, shadow: makeCardShadow() });
  if (strip) {
    slide.addShape("rect", { x, y, w: 0.08, h, fill: { color: strip } });
  }
}

function makeTitleSlide(pres, line1, line2, line3, notes) {
  const s = pres.addSlide();
  s.background = { color: C.SLATE };
  s.addShape("rect", { x: 0, y: 0, w: 0.1, h: 5.625, fill: { color: C.AMBER } });
  s.addShape("oval", { x: 8.2, y: -0.8, w: 3, h: 3, fill: { color: C.SLATE, transparency: 60 } });
  s.addShape("oval", { x: 8.8, y: 3.8, w: 2.5, h: 2.5, fill: { color: C.AMBER, transparency: 70 } });
  s.addText(line1, { x: 0.7, y: 1.2, w: 8, h: 1, fontSize: 40, fontFace: FONT, color: C.WHITE, bold: true, margin: 0 });
  s.addText(line2, { x: 0.7, y: 2.2, w: 8, h: 0.6, fontSize: 22, fontFace: FONT, color: C.LIGHT, margin: 0 });
  s.addText(line3, { x: 0.7, y: 3.1, w: 8, h: 0.5, fontSize: 14, fontFace: FONT, color: C.MUTED, margin: 0 });
  if (notes) s.notes = notes;
  return s;
}

function makeClosingSlide(pres, prompt, notes) {
  const s = pres.addSlide();
  s.background = { color: C.SLATE };
  s.addShape("rect", { x: 0, y: 0, w: 0.1, h: 5.625, fill: { color: C.AMBER } });
  s.addText("Reflection", { x: 0.7, y: 0.8, w: 8, h: 0.7, fontSize: 36, fontFace: FONT, color: C.WHITE, bold: true, margin: 0 });
  s.addText("Turn & Talk", { x: 0.7, y: 1.7, w: 3, h: 0.4, fontSize: 16, fontFace: FONT, color: C.AMBER, bold: true, margin: 0 });
  s.addText(prompt, { x: 0.7, y: 2.3, w: 8.3, h: 1.8, fontSize: 20, fontFace: FONT, color: C.LIGHT, italic: true, margin: 0 });
  if (notes) s.notes = notes;
  return s;
}

function makeLISCSlide(pres, liItems, scItems, notes, icon) {
  const s = pres.addSlide();
  addTopBar(s);
  addSlideTitle(s, "Learning Intentions & Success Criteria");
  // LI card
  addCard(s, 0.5, 1.3, 9, 1.8, { strip: C.SLATE });
  if (icon) {
    s.addShape("roundRect", { x: 0.65, y: 1.4, w: 0.45, h: 0.45, rectRadius: 0.22, fill: { color: C.SLATE } });
    s.addImage({ data: icon, x: 0.7, y: 1.45, w: 0.35, h: 0.35 });
  }
  s.addText("Learning Intentions", { x: 1.2, y: 1.4, w: 4, h: 0.35, fontSize: 14, fontFace: FONT, color: C.SLATE, bold: true, margin: 0 });
  const liTexts = liItems.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < liItems.length - 1, fontSize: 12, color: C.CHARCOAL } }));
  s.addText(liTexts, { x: 0.75, y: 1.85, w: 8.5, h: 1.1, fontFace: FONT, margin: 0 });
  // SC card
  addCard(s, 0.5, 3.3, 9, 1.9, { strip: C.AMBER });
  s.addText("Success Criteria", { x: 0.75, y: 3.45, w: 4, h: 0.35, fontSize: 14, fontFace: FONT, color: C.AMBER, bold: true, margin: 0 });
  const scTexts = scItems.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < scItems.length - 1, fontSize: 13, color: C.CHARCOAL } }));
  s.addText(scTexts, { x: 0.75, y: 3.9, w: 8.5, h: 1.15, fontFace: FONT, margin: 0 });
  if (notes) s.notes = notes;
  return s;
}

function makeQuoteSlide(pres, quote, page, question, notes, icon) {
  const s = pres.addSlide();
  addTopBar(s);
  addStageBadge(s, "Pause Point");
  addSlideTitle(s, "Stop & Discuss", { y: 0.7 });
  addCard(s, 0.5, 1.4, 9, 2.0, { strip: C.AMBER });
  if (icon) s.addImage({ data: icon, x: 0.75, y: 1.6, w: 0.35, h: 0.35 });
  s.addText(quote, { x: 1.2, y: 1.55, w: 7.8, h: 0.9, fontSize: 16, fontFace: FONT, color: C.CHARCOAL, italic: true, margin: 0 });
  s.addText("p." + page, { x: 8.5, y: 2.5, w: 0.8, h: 0.3, fontSize: 11, fontFace: FONT, color: C.MUTED, align: "right", margin: 0 });
  addCard(s, 0.5, 3.6, 9, 1.5);
  s.addText("Discussion Question", { x: 0.75, y: 3.7, w: 4, h: 0.35, fontSize: 13, fontFace: FONT, color: C.SLATE, bold: true, margin: 0 });
  s.addText(question, { x: 0.75, y: 4.1, w: 8.5, h: 0.9, fontSize: 15, fontFace: FONT, color: C.CHARCOAL, margin: 0 });
  if (notes) s.notes = notes;
  return s;
}

function makeCFUSlide(pres, strategy, instruction, details, notes, icon) {
  const s = pres.addSlide();
  addTopBar(s);
  addStageBadge(s, "Check", C.AMBER);
  addSlideTitle(s, "Check Your Understanding", { y: 0.7 });
  addCard(s, 0.5, 1.4, 9, 1.2, { strip: C.AMBER });
  s.addText(strategy, { x: 0.75, y: 1.5, w: 3, h: 0.35, fontSize: 14, fontFace: FONT, color: C.AMBER, bold: true, margin: 0 });
  if (icon) {
    s.addShape("roundRect", { x: 8.6, y: 1.45, w: 0.5, h: 0.5, rectRadius: 0.25, fill: { color: C.AMBER } });
    s.addImage({ data: icon, x: 8.65, y: 1.5, w: 0.4, h: 0.4 });
  }
  s.addText(instruction, { x: 0.75, y: 1.9, w: 8.3, h: 0.55, fontSize: 16, fontFace: FONT, color: C.CHARCOAL, margin: 0 });
  if (details) {
    addCard(s, 0.5, 2.9, 9, 2.2);
    s.addText(details, { x: 0.75, y: 3.1, w: 8.5, h: 1.8, fontSize: 14, fontFace: FONT, color: C.CHARCOAL, margin: 0 });
  }
  if (notes) s.notes = notes;
  return s;
}

function makeYourTurnSlide(pres, first, next, then, notes, icon) {
  const s = pres.addSlide();
  s.background = { color: C.WARM };
  s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.AMBER } });
  addStageBadge(s, "Your Turn", C.AMBER);
  addSlideTitle(s, "Your Turn", { y: 0.7 });
  if (icon) {
    s.addShape("roundRect", { x: 8.95, y: 0.6, w: 0.55, h: 0.55, rectRadius: 0.27, fill: { color: C.AMBER } });
    s.addImage({ data: icon, x: 9, y: 0.65, w: 0.45, h: 0.45 });
  }
  const steps = [
    { label: "First", text: first, color: C.AMBER },
    { label: "Next", text: next, color: C.SLATE },
    { label: "Then", text: then, color: C.SLATE },
  ];
  steps.forEach((st, i) => {
    const y = 1.5 + i * 1.2;
    addCard(s, 0.5, y, 9, 1.0);
    s.addShape("roundRect", { x: 0.7, y: y + 0.25, w: 0.9, h: 0.36, rectRadius: 0.08, fill: { color: st.color } });
    s.addText(st.label, { x: 0.7, y: y + 0.25, w: 0.9, h: 0.36, fontSize: 12, fontFace: FONT, color: C.WHITE, align: "center", valign: "middle", bold: true, margin: 0 });
    s.addText(st.text, { x: 1.8, y: y + 0.15, w: 7.3, h: 0.7, fontSize: 15, fontFace: FONT, color: C.CHARCOAL, margin: 0, valign: "middle" });
  });
  if (notes) s.notes = notes;
  return s;
}

function makeExitTicketSlide(pres, questions, notes) {
  const s = pres.addSlide();
  addTopBar(s);
  addStageBadge(s, "Exit Ticket", C.SLATE);
  addSlideTitle(s, "Exit Ticket", { y: 0.7 });
  questions.forEach((q, i) => {
    const y = 1.5 + i * 1.1;
    addCard(s, 0.5, y, 9, 0.9);
    s.addShape("roundRect", { x: 0.7, y: y + 0.2, w: 0.4, h: 0.4, rectRadius: 0.2, fill: { color: C.SLATE } });
    s.addText(String(i + 1), { x: 0.7, y: y + 0.2, w: 0.4, h: 0.4, fontSize: 14, fontFace: FONT, color: C.WHITE, align: "center", valign: "middle", bold: true, margin: 0 });
    s.addText(q, { x: 1.3, y: y + 0.15, w: 7.9, h: 0.6, fontSize: 14, fontFace: FONT, color: C.CHARCOAL, margin: 0, valign: "middle" });
  });
  if (notes) s.notes = notes;
  return s;
}

module.exports = {
  C, FONT, iconToBase64Png, makeShadow, makeCardShadow,
  addTopBar, addStageBadge, addSlideTitle, addCard,
  makeTitleSlide, makeClosingSlide, makeLISCSlide, makeQuoteSlide,
  makeCFUSlide, makeYourTurnSlide, makeExitTicketSlide,
};
