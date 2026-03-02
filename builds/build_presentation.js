const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

const {
  FaBullseye, FaClock, FaUsers, FaCubes,
  FaChalkboardTeacher, FaCheckCircle,
  FaStar, FaLightbulb, FaDice, FaBook
} = require("react-icons/fa");
const {
  MdNumbers, MdGridOn, MdExtension
} = require("react-icons/md");

function renderIconSvg(IconComponent, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

const C = {
  navy:      "1B4965",
  teal:      "028090",
  seafoam:   "00A896",
  mint:      "02C39A",
  orange:    "F4A261",
  cream:     "FDF6EC",
  white:     "FFFFFF",
  offWhite:  "F7F9FB",
  dark:      "2D3436",
  muted:     "6B7B8D",
  lightGray: "E8EDF2",
};

const FONT_H = "Georgia";
const FONT_B = "Calibri";

const makeShadow = () => ({ type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.12, angle: 135 });
const makeCardShadow = () => ({ type: "outer", blur: 4, offset: 1, color: "000000", opacity: 0.10, angle: 135 });

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Claude";
  pres.title = "Ten and Some More - Numbers 11 to 20";

  const icons = {
    bullseye:  await iconToBase64Png(FaBullseye, "#FFFFFF"),
    users:     await iconToBase64Png(FaUsers, "#FFFFFF"),
    cubes:     await iconToBase64Png(FaCubes, "#FFFFFF"),
    teacher:   await iconToBase64Png(FaChalkboardTeacher, "#FFFFFF"),
    star:      await iconToBase64Png(FaStar, "#" + C.orange),
    bulbDark:  await iconToBase64Png(FaLightbulb, "#" + C.navy),
    dice:      await iconToBase64Png(FaDice, "#FFFFFF"),
    numbers:   await iconToBase64Png(MdNumbers, "#FFFFFF"),
    grid:      await iconToBase64Png(MdGridOn, "#FFFFFF"),
    bookOpen:  await iconToBase64Png(FaBook, "#FFFFFF"),
    bookNavy:  await iconToBase64Png(FaBook, "#" + C.navy),
    checkW:    await iconToBase64Png(FaCheckCircle, "#FFFFFF"),
    checkTeal: await iconToBase64Png(FaCheckCircle, "#" + C.teal),
  };

  // ===== SLIDE 1: Title =====
  let s1 = pres.addSlide();
  s1.background = { color: C.navy };
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.mint } });
  s1.addShape(pres.shapes.OVAL, { x: 8.2, y: -0.8, w: 3, h: 3, fill: { color: C.teal, transparency: 30 } });
  s1.addShape(pres.shapes.OVAL, { x: 9, y: 3.5, w: 2.5, h: 2.5, fill: { color: C.seafoam, transparency: 40 } });
  s1.addText("Ten and Some More", {
    x: 0.8, y: 1.2, w: 7.5, h: 1.2,
    fontSize: 44, fontFace: FONT_H, color: C.white, bold: true, margin: 0,
  });
  s1.addText("Numbers 11 to 20", {
    x: 0.8, y: 2.4, w: 7.5, h: 0.7,
    fontSize: 28, fontFace: FONT_H, color: C.mint, margin: 0,
  });
  s1.addText("Foundation Mathematics  |  Lesson 2", {
    x: 0.8, y: 3.4, w: 7, h: 0.5,
    fontSize: 16, fontFace: FONT_B, color: C.muted, margin: 0,
  });
  s1.addText("VC2MFN01  |  VC2MFN03", {
    x: 0.8, y: 3.9, w: 7, h: 0.4,
    fontSize: 12, fontFace: FONT_B, color: C.muted, italic: true, margin: 0,
  });

  // ===== SLIDE 2: Learning Objective & Success Criteria =====
  let s2 = pres.addSlide();
  s2.background = { color: C.offWhite };
  s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s2.addText("Learning Objective & Success Criteria", {
    x: 0.6, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.1, w: 8.8, h: 1.1, rectRadius: 0.1,
    fill: { color: C.teal }, shadow: makeShadow(),
  });
  s2.addImage({ data: icons.bullseye, x: 0.85, y: 1.3, w: 0.45, h: 0.45 });
  s2.addText("Learning Objective", {
    x: 1.5, y: 1.15, w: 7.5, h: 0.4,
    fontSize: 14, fontFace: FONT_B, color: C.mint, bold: true, margin: 0,
  });
  s2.addText("We will count numbers to 20 and show them as \u2018ten and some more\u2019.", {
    x: 1.5, y: 1.55, w: 7.5, h: 0.5,
    fontSize: 18, fontFace: FONT_B, color: C.white, margin: 0,
  });
  s2.addText("Success Criteria", {
    x: 0.6, y: 2.5, w: 4, h: 0.4,
    fontSize: 18, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  const criteria = [
    "I can partition collections from 11\u201319, using tens and ones.",
    "I can correctly say and record number quantities up to 20, using pop sticks and counters.",
    "I can identify the total in a quantity by counting.",
  ];
  criteria.forEach((c, i) => {
    const y = 3.05 + i * 0.7;
    s2.addImage({ data: icons.checkTeal, x: 0.7, y: y + 0.05, w: 0.3, h: 0.3 });
    s2.addText(c, {
      x: 1.15, y: y, w: 8.2, h: 0.5,
      fontSize: 15, fontFace: FONT_B, color: C.dark, margin: 0,
    });
  });

  // ===== SLIDE 3: Lesson Overview Timeline =====
  let s3 = pres.addSlide();
  s3.background = { color: C.offWhite };
  s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s3.addText("Lesson at a Glance", {
    x: 0.6, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  const stages = [
    { label: "Prior\nKnowledge", time: "10 min", icon: icons.numbers, color: C.teal },
    { label: "Place\nValue", time: "10 min", icon: icons.cubes, color: C.seafoam },
    { label: "Guided\nPractice", time: "30 min", icon: icons.teacher, color: C.orange },
    { label: "Make\nConnections", time: "5 min", icon: icons.bookOpen, color: C.teal },
    { label: "Consolidate", time: "5 min", icon: icons.checkW, color: C.navy },
  ];
  const startX = 0.5, cardW = 1.6, gap = 0.3;
  stages.forEach((st, i) => {
    const cx = startX + i * (cardW + gap);
    const cy = 1.4;
    s3.addShape(pres.shapes.OVAL, { x: cx + (cardW - 0.7) / 2, y: cy, w: 0.7, h: 0.7, fill: { color: st.color } });
    s3.addImage({ data: st.icon, x: cx + (cardW - 0.4) / 2, y: cy + 0.15, w: 0.4, h: 0.4 });
    if (i < stages.length - 1) {
      s3.addShape(pres.shapes.LINE, {
        x: cx + cardW * 0.5 + 0.35, y: cy + 0.35, w: cardW + gap - 0.7, h: 0,
        line: { color: C.lightGray, width: 2 },
      });
    }
    s3.addText("Stage " + (i + 1), {
      x: cx, y: cy + 0.85, w: cardW, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.muted, align: "center", margin: 0, bold: true,
    });
    s3.addText(st.label, {
      x: cx, y: cy + 1.15, w: cardW, h: 0.6,
      fontSize: 14, fontFace: FONT_B, color: C.dark, align: "center", margin: 0, bold: true,
    });
    s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + (cardW - 0.9) / 2, y: cy + 1.85, w: 0.9, h: 0.32, rectRadius: 0.08, fill: { color: C.lightGray },
    });
    s3.addText(st.time, {
      x: cx + (cardW - 0.9) / 2, y: cy + 1.85, w: 0.9, h: 0.32,
      fontSize: 11, fontFace: FONT_B, color: C.muted, align: "center", valign: "middle", margin: 0,
    });
  });
  s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.0, w: 8.8, h: 1.2, rectRadius: 0.1, fill: { color: C.white }, shadow: makeCardShadow(),
  });
  s3.addText("Key Vocabulary", {
    x: 0.9, y: 4.1, w: 3, h: 0.35,
    fontSize: 14, fontFace: FONT_B, color: C.teal, bold: true, margin: 0,
  });
  const vocab = ["Tens and ones", "Teen", "Ten and some more", "Numeral names (0\u201320)"];
  vocab.forEach((v, i) => {
    const col = i < 2 ? 0 : 1;
    const row = i % 2;
    s3.addText("\u2022  " + v, {
      x: 0.9 + col * 4.2, y: 4.5 + row * 0.3, w: 4, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.dark, margin: 0,
    });
  });

  // ===== SLIDE 4: Stage 1 =====
  let s4 = pres.addSlide();
  s4.background = { color: C.offWhite };
  s4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s4.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 0.3, w: 1.6, h: 0.38, rectRadius: 0.08, fill: { color: C.teal },
  });
  s4.addText("Stage 1  \u00B7  10 min", {
    x: 0.6, y: 0.3, w: 1.6, h: 0.38,
    fontSize: 11, fontFace: FONT_B, color: C.white, align: "center", valign: "middle", bold: true, margin: 0,
  });
  s4.addText("Activate Prior Knowledge", {
    x: 2.4, y: 0.25, w: 7, h: 0.5,
    fontSize: 26, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  // Left card
  s4.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.1, w: 4.3, h: 4.0, rectRadius: 0.1, fill: { color: C.white }, shadow: makeCardShadow(),
  });
  s4.addShape(pres.shapes.OVAL, { x: 0.75, y: 1.3, w: 0.55, h: 0.55, fill: { color: C.teal } });
  s4.addImage({ data: icons.numbers, x: 0.85, y: 1.4, w: 0.35, h: 0.35 });
  s4.addText("Choral Counting", {
    x: 1.5, y: 1.35, w: 3, h: 0.4,
    fontSize: 17, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  ["Count as a class from 0 to 20 using a number chart", "Repeat 3\u20134 times to build fluency",
   "Say a number (11\u201320) \u2014 students make it on their ten frame", "Chorally count to verify with one-to-one correspondence"
  ].forEach((step, i) => {
    s4.addText(step, {
      x: 1.0, y: 2.05 + i * 0.6, w: 3.5, h: 0.5,
      fontSize: 13, fontFace: FONT_B, color: C.dark, bullet: true, margin: 0,
    });
  });
  // Right card
  s4.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.1, w: 4.3, h: 4.0, rectRadius: 0.1, fill: { color: C.white }, shadow: makeCardShadow(),
  });
  s4.addShape(pres.shapes.OVAL, { x: 5.45, y: 1.3, w: 0.55, h: 0.55, fill: { color: C.seafoam } });
  s4.addImage({ data: icons.grid, x: 5.55, y: 1.4, w: 0.35, h: 0.35 });
  s4.addText("Numeral Recognition", {
    x: 6.2, y: 1.35, w: 3, h: 0.4,
    fontSize: 17, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  ["Draw a ten frame representation (11\u201320) on the board", "Students write the numeral on their mini whiteboard",
   "Chorally count to check and model correct formation", "Repeat 3\u20134 times, varying the numbers shown"
  ].forEach((step, i) => {
    s4.addText(step, {
      x: 5.7, y: 2.05 + i * 0.6, w: 3.5, h: 0.5,
      fontSize: 13, fontFace: FONT_B, color: C.dark, bullet: true, margin: 0,
    });
  });
  s4.addText("Materials:  Ten frames sheet  \u00B7  20 counters  \u00B7  Mini whiteboard & marker", {
    x: 0.5, y: 5.2, w: 9, h: 0.3,
    fontSize: 11, fontFace: FONT_B, color: C.muted, italic: true, margin: 0,
  });

  // ===== SLIDE 5: Stage 2 =====
  let s5 = pres.addSlide();
  s5.background = { color: C.offWhite };
  s5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 0.3, w: 1.6, h: 0.38, rectRadius: 0.08, fill: { color: C.seafoam },
  });
  s5.addText("Stage 2  \u00B7  10 min", {
    x: 0.6, y: 0.3, w: 1.6, h: 0.38,
    fontSize: 11, fontFace: FONT_B, color: C.white, align: "center", valign: "middle", bold: true, margin: 0,
  });
  s5.addText("Introducing Place Value", {
    x: 2.4, y: 0.25, w: 7, h: 0.5,
    fontSize: 26, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  // Demo steps card
  s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.0, w: 5.8, h: 3.8, rectRadius: 0.1, fill: { color: C.white }, shadow: makeCardShadow(),
  });
  s5.addText("Demonstration with Bundling Sticks", {
    x: 0.8, y: 1.15, w: 5.2, h: 0.4,
    fontSize: 16, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  const demoSteps = [
    { num: "1", text: "Take a pre-bundled group and unbundle it" },
    { num: "2", text: "Count aloud \u2014 when you reach 10, re-bundle" },
    { num: "3", text: "Count remaining sticks on the Tens and Ones template" },
    { num: "4", text: "Point to the ten, say \u2018ten\u2019, then count on to the total" },
    { num: "5", text: "Phrase it: \u201CTen and ___ more. The number is ___.\u201D" },
  ];
  demoSteps.forEach((st, i) => {
    const y = 1.7 + i * 0.55;
    s5.addShape(pres.shapes.OVAL, { x: 0.85, y: y + 0.02, w: 0.35, h: 0.35, fill: { color: C.teal } });
    s5.addText(st.num, {
      x: 0.85, y: y + 0.02, w: 0.35, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.white, align: "center", valign: "middle", bold: true, margin: 0,
    });
    s5.addText(st.text, {
      x: 1.35, y: y, w: 4.7, h: 0.4,
      fontSize: 13, fontFace: FONT_B, color: C.dark, margin: 0,
    });
  });
  // Key concept card
  s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.6, y: 1.0, w: 2.9, h: 2.5, rectRadius: 0.1, fill: { color: C.navy }, shadow: makeShadow(),
  });
  s5.addText("Key Concept", {
    x: 6.8, y: 1.15, w: 2.5, h: 0.35,
    fontSize: 14, fontFace: FONT_B, color: C.mint, bold: true, margin: 0,
  });
  s5.addText([
    { text: "\u2018Teen\u2019 means \u2018ten\u2019", options: { bold: true, breakLine: true, fontSize: 15 } },
    { text: "", options: { breakLine: true, fontSize: 8 } },
    { text: "fourteen = ten + four more", options: { breakLine: true, fontSize: 13 } },
    { text: "sixteen = ten + six more", options: { breakLine: true, fontSize: 13 } },
    { text: "", options: { breakLine: true, fontSize: 8 } },
    { text: "Tricky ones: eleven, twelve, fifteen don\u2019t follow the pattern exactly", options: { fontSize: 12, italic: true } },
  ], {
    x: 6.8, y: 1.55, w: 2.5, h: 1.8,
    fontFace: FONT_B, color: C.white, margin: 0,
  });
  // Example callout
  s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.6, y: 3.7, w: 2.9, h: 1.1, rectRadius: 0.1, fill: { color: C.orange }, shadow: makeCardShadow(),
  });
  s5.addText("Example Script", {
    x: 6.8, y: 3.8, w: 2.5, h: 0.3,
    fontSize: 12, fontFace: FONT_B, color: C.white, bold: true, margin: 0,
  });
  s5.addText("\u201C10, 11, 12, 13, 14.\nMy collection has fourteen.\nFourteen is 10 and 4 more.\u201D", {
    x: 6.8, y: 4.1, w: 2.5, h: 0.65,
    fontSize: 11, fontFace: FONT_B, color: C.white, italic: true, margin: 0,
  });

  // ===== SLIDE 6: Stage 3 - Guided Practice =====
  let s6 = pres.addSlide();
  s6.background = { color: C.offWhite };
  s6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 0.3, w: 1.6, h: 0.38, rectRadius: 0.08, fill: { color: C.orange },
  });
  s6.addText("Stage 3  \u00B7  30 min", {
    x: 0.6, y: 0.3, w: 1.6, h: 0.38,
    fontSize: 11, fontFace: FONT_B, color: C.white, align: "center", valign: "middle", bold: true, margin: 0,
  });
  s6.addText("Guided Practice \u2014 Bundling", {
    x: 2.4, y: 0.25, w: 7, h: 0.5,
    fontSize: 26, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  const practiceCards = [
    { title: "Teacher Demo", desc: "Repeat bundling with another group. Students chorally count on from 10 and phrase the total.", color: C.teal },
    { title: "Student Demo", desc: "Choose a student to demonstrate the process. Class counts along and phrases total as \u2018ten and ___ more\u2019.", color: C.seafoam },
    { title: "Independent", desc: "Each student unbundles, counts, re-bundles the 10, then counts on. Swap bundles and repeat.", color: C.orange },
  ];
  practiceCards.forEach((card, i) => {
    const cx = 0.5 + i * 3.15;
    s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 1.05, w: 2.85, h: 2.0, rectRadius: 0.1, fill: { color: C.white }, shadow: makeCardShadow(),
    });
    s6.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.05, w: 2.85, h: 0.06, fill: { color: card.color } });
    s6.addShape(pres.shapes.OVAL, { x: cx + 0.2, y: 1.3, w: 0.4, h: 0.4, fill: { color: card.color } });
    s6.addText(String(i + 1), {
      x: cx + 0.2, y: 1.3, w: 0.4, h: 0.4,
      fontSize: 14, fontFace: FONT_B, color: C.white, align: "center", valign: "middle", bold: true, margin: 0,
    });
    s6.addText(card.title, {
      x: cx + 0.7, y: 1.3, w: 2.0, h: 0.4,
      fontSize: 15, fontFace: FONT_H, color: C.navy, bold: true, margin: 0, valign: "middle",
    });
    s6.addText(card.desc, {
      x: cx + 0.2, y: 1.85, w: 2.45, h: 1.0,
      fontSize: 13, fontFace: FONT_B, color: C.dark, margin: 0,
    });
  });
  // Frames and More section
  s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.25, w: 9, h: 1.85, rectRadius: 0.1, fill: { color: C.navy }, shadow: makeShadow(),
  });
  s6.addText("Introducing \u2018Frames and More\u2019", {
    x: 0.8, y: 3.35, w: 5, h: 0.4,
    fontSize: 17, fontFace: FONT_H, color: C.mint, bold: true, margin: 0,
  });
  [
    "Count a bundle and organise onto the Tens and Ones template",
    "Model: \u201CI have 1 ten\u201D (draw on ten frame) \u201Cand 5 more\u201D (draw ones) \u2014 \u201CThe number name is fifteen\u201D",
    "Write the numerals on the Frames and More chart",
    "Students copy along, then work independently or in pairs",
  ].forEach((step, i) => {
    s6.addText(step, {
      x: 1.0, y: 3.8 + i * 0.3, w: 8.2, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.white, bullet: true, margin: 0,
    });
  });

  // ===== SLIDE 7: Differentiation =====
  let s7 = pres.addSlide();
  s7.background = { color: C.offWhite };
  s7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s7.addText("Differentiation", {
    x: 0.6, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  // Enable card
  s7.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.1, w: 4.3, h: 3.5, rectRadius: 0.1, fill: { color: C.white }, shadow: makeCardShadow(),
  });
  s7.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4.3, h: 0.06, fill: { color: C.teal } });
  s7.addShape(pres.shapes.OVAL, { x: 0.75, y: 1.35, w: 0.55, h: 0.55, fill: { color: C.teal } });
  s7.addImage({ data: icons.users, x: 0.85, y: 1.45, w: 0.35, h: 0.35 });
  s7.addText("Enable", {
    x: 1.5, y: 1.4, w: 3, h: 0.4,
    fontSize: 18, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  s7.addText("Supporting students who need consolidation", {
    x: 1.5, y: 1.8, w: 3, h: 0.3,
    fontSize: 12, fontFace: FONT_B, color: C.muted, italic: true, margin: 0,
  });
  ["Provide repeated opportunities to count and represent collections of ten",
   "Focus on the concept that 1 ten is the same as ten ones",
   "Consolidate accurate counting to 10 before moving to teen numbers"
  ].forEach((p, i) => {
    s7.addText(p, {
      x: 0.9, y: 2.3 + i * 0.6, w: 3.6, h: 0.5,
      fontSize: 13, fontFace: FONT_B, color: C.dark, bullet: true, margin: 0,
    });
  });
  // Extend card
  s7.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.1, w: 4.3, h: 3.5, rectRadius: 0.1, fill: { color: C.white }, shadow: makeCardShadow(),
  });
  s7.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.1, w: 4.3, h: 0.06, fill: { color: C.orange } });
  s7.addShape(pres.shapes.OVAL, { x: 5.45, y: 1.35, w: 0.55, h: 0.55, fill: { color: C.orange } });
  s7.addImage({ data: icons.dice, x: 5.55, y: 1.45, w: 0.35, h: 0.35 });
  s7.addText("Extend", {
    x: 6.2, y: 1.4, w: 3, h: 0.4,
    fontSize: 18, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  s7.addText("Challenging students who are ready for more", {
    x: 6.2, y: 1.8, w: 3, h: 0.3,
    fontSize: 12, fontFace: FONT_B, color: C.muted, italic: true, margin: 0,
  });
  ["Use a ten-sided dice to determine the \u2018ones\u2019 to add to a bundle of ten",
   "Students create their own bundles and record the total",
   "Provide pre-filled Frames and More sheets (e.g., \u201811\u2019) \u2014 students build the matching bundle"
  ].forEach((p, i) => {
    s7.addText(p, {
      x: 5.6, y: 2.3 + i * 0.6, w: 3.6, h: 0.5,
      fontSize: 13, fontFace: FONT_B, color: C.dark, bullet: true, margin: 0,
    });
  });
  // Tip bar
  s7.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.65, w: 9, h: 0.5, rectRadius: 0.08, fill: { color: C.cream },
  });
  s7.addImage({ data: icons.bulbDark, x: 0.7, y: 4.72, w: 0.3, h: 0.3 });
  s7.addText("Repeat this lesson with Unifix cubes, counters on ten frames, or rekenreks for consolidation.", {
    x: 1.15, y: 4.68, w: 8, h: 0.45,
    fontSize: 12, fontFace: FONT_B, color: C.navy, italic: true, margin: 0,
  });

  // ===== SLIDE 8: Stage 4 & 5 =====
  let s8 = pres.addSlide();
  s8.background = { color: C.offWhite };
  s8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  // Stage 4 left
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 0.3, w: 4.3, h: 5.0, rectRadius: 0.1, fill: { color: C.white }, shadow: makeCardShadow(),
  });
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: 0.5, w: 1.6, h: 0.38, rectRadius: 0.08, fill: { color: C.teal },
  });
  s8.addText("Stage 4  \u00B7  5 min", {
    x: 0.7, y: 0.5, w: 1.6, h: 0.38,
    fontSize: 11, fontFace: FONT_B, color: C.white, align: "center", valign: "middle", bold: true, margin: 0,
  });
  s8.addText("Make Connections", {
    x: 0.7, y: 1.1, w: 3.8, h: 0.45,
    fontSize: 20, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.9, y: 1.7, w: 3.6, h: 1.4, rectRadius: 0.1, fill: { color: C.cream },
  });
  s8.addImage({ data: icons.bookNavy, x: 2.3, y: 1.85, w: 0.6, h: 0.6 });
  s8.addText("Hide and Seek eBook", {
    x: 0.9, y: 2.55, w: 3.6, h: 0.4,
    fontSize: 14, fontFace: FONT_B, color: C.navy, align: "center", bold: true, margin: 0,
  });
  ["Read the \u2018Hide and Seek eBook\u2019 with the class",
   "Pause at page 4 \u2014 students count along with the character",
   "When Pao says numbers out of order, pause and ask: \u201CWhich number comes next?\u201D",
   "Students pair-share, then a non-volunteer answers"
  ].forEach((step, i) => {
    s8.addText(step, {
      x: 0.9, y: 3.3 + i * 0.47, w: 3.6, h: 0.4,
      fontSize: 12, fontFace: FONT_B, color: C.dark, bullet: true, margin: 0,
    });
  });
  // Stage 5 right
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 0.3, w: 4.3, h: 5.0, rectRadius: 0.1, fill: { color: C.white }, shadow: makeCardShadow(),
  });
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.4, y: 0.5, w: 1.6, h: 0.38, rectRadius: 0.08, fill: { color: C.navy },
  });
  s8.addText("Stage 5  \u00B7  5 min", {
    x: 5.4, y: 0.5, w: 1.6, h: 0.38,
    fontSize: 11, fontFace: FONT_B, color: C.white, align: "center", valign: "middle", bold: true, margin: 0,
  });
  s8.addText("Consolidating Task", {
    x: 5.4, y: 1.1, w: 3.8, h: 0.45,
    fontSize: 20, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  s8.addText("Counting On", {
    x: 5.4, y: 1.55, w: 3.8, h: 0.35,
    fontSize: 15, fontFace: FONT_B, color: C.teal, italic: true, margin: 0,
  });
  ["Provide each student with a mini whiteboard and marker",
   "Display a ten frame or hold up pop stick bundles (numbers 11\u201320)",
   "Chorally count on from 10 to find the total",
   "Students write the numeral on their whiteboard",
   "Repeat 4\u20135 times, varying the numbers"
  ].forEach((step, i) => {
    s8.addText(step, {
      x: 5.6, y: 2.1 + i * 0.5, w: 3.6, h: 0.4,
      fontSize: 12, fontFace: FONT_B, color: C.dark, bullet: true, margin: 0,
    });
  });
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.6, y: 4.5, w: 3.5, h: 0.6, rectRadius: 0.08, fill: { color: C.cream },
  });
  s8.addImage({ data: icons.bulbDark, x: 5.75, y: 4.58, w: 0.3, h: 0.3 });
  s8.addText("Check numeral formation \u2014 e.g., 15 not 51", {
    x: 6.15, y: 4.55, w: 2.8, h: 0.5,
    fontSize: 11, fontFace: FONT_B, color: C.navy, margin: 0,
  });

  // ===== SLIDE 9: Teaching Considerations =====
  let s9 = pres.addSlide();
  s9.background = { color: C.offWhite };
  s9.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s9.addText("Teaching Considerations", {
    x: 0.6, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  const considerations = [
    { title: "Number Name Uniqueness", desc: "Numbers 11\u201319 have unique names. Link these names to place value: each is 1 ten and some more. For example, \u201C1 ten and 3 more \u2014 the number name is thirteen.\u201D", color: C.teal },
    { title: "Numeral Formation", desc: "Explicitly teach correct digit recording. Address the common misconception of reversed digits (e.g., writing 51 instead of 15).", color: C.seafoam },
    { title: "Concrete Manipulatives", desc: "Bundling sticks, counters, and ten frames strengthen number sense. These concrete experiences are vital before moving to pictorial and abstract representations.", color: C.orange },
    { title: "Stable Counting Order", desc: "Students are building the rote counting sequence. Some may think 14 comes after 15 instead of before it. Reinforce the correct sequence through repetition.", color: C.navy },
  ];
  considerations.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = 0.5 + col * 4.7;
    const cy = 1.1 + row * 2.1;
    s9.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cy, w: 4.4, h: 1.8, rectRadius: 0.1, fill: { color: C.white }, shadow: makeCardShadow(),
    });
    s9.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 0.08, h: 1.8, fill: { color: c.color } });
    s9.addText(c.title, {
      x: cx + 0.3, y: cy + 0.15, w: 3.8, h: 0.35,
      fontSize: 15, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
    });
    s9.addText(c.desc, {
      x: cx + 0.3, y: cy + 0.55, w: 3.8, h: 1.1,
      fontSize: 12, fontFace: FONT_B, color: C.dark, margin: 0,
    });
  });

  // ===== SLIDE 10: Materials Checklist =====
  let s10 = pres.addSlide();
  s10.background = { color: C.offWhite };
  s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s10.addText("Materials Checklist", {
    x: 0.6, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  // Student materials
  s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.1, w: 4.3, h: 4.2, rectRadius: 0.1, fill: { color: C.white }, shadow: makeCardShadow(),
  });
  s10.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4.3, h: 0.06, fill: { color: C.teal } });
  s10.addText("Student Materials", {
    x: 0.8, y: 1.3, w: 3.5, h: 0.4,
    fontSize: 17, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  ["\u2018Ten frames\u2019 (Supporting resource 1) \u2014 1 per student",
   "\u2018Frames and more\u2019 (Supporting resource 2) \u2014 1 per student",
   "\u2018Tens and ones template\u2019 (Supporting resource 3) \u2014 1 per student",
   "Counters \u2014 20 per student",
   "Pre-bundled pop sticks (11\u201320) \u2014 1\u20132 per student",
   "Mini whiteboards and markers \u2014 1 per student"
  ].forEach((m, i) => {
    s10.addImage({ data: icons.checkTeal, x: 0.8, y: 1.85 + i * 0.45, w: 0.22, h: 0.22 });
    s10.addText(m, {
      x: 1.15, y: 1.8 + i * 0.45, w: 3.4, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.dark, margin: 0,
    });
  });
  // Teacher materials
  s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.1, w: 4.3, h: 4.2, rectRadius: 0.1, fill: { color: C.white }, shadow: makeCardShadow(),
  });
  s10.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.1, w: 4.3, h: 0.06, fill: { color: C.orange } });
  s10.addText("Teacher Materials", {
    x: 5.5, y: 1.3, w: 3.5, h: 0.4,
    fontSize: 17, fontFace: FONT_H, color: C.navy, bold: true, margin: 0,
  });
  ["\u2018Hide and Seek eBook\u2019 (Key resource 1)",
   "\u2018Frames and more\u2019 (Supporting resource 2) \u2014 A3",
   "\u2018Tens and ones template\u2019 (Supporting resource 3) \u2014 A3"
  ].forEach((m, i) => {
    s10.addImage({ data: icons.checkTeal, x: 5.5, y: 1.85 + i * 0.45, w: 0.22, h: 0.22 });
    s10.addText(m, {
      x: 5.85, y: 1.8 + i * 0.45, w: 3.4, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.dark, margin: 0,
    });
  });
  s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 3.2, w: 4.3, h: 0.7, rectRadius: 0.08, fill: { color: C.cream },
  });
  s10.addImage({ data: icons.bulbDark, x: 5.4, y: 3.35, w: 0.3, h: 0.3 });
  s10.addText("Pre-bundle pop sticks with rubber bands into quantities of 11\u201320 before the lesson.", {
    x: 5.8, y: 3.25, w: 3.5, h: 0.6,
    fontSize: 11, fontFace: FONT_B, color: C.navy, margin: 0,
  });
  s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 4.1, w: 4.3, h: 1.0, rectRadius: 0.08, fill: { color: C.cream },
  });
  s10.addText("Enrichment Videos", {
    x: 5.5, y: 4.2, w: 3.5, h: 0.3,
    fontSize: 13, fontFace: FONT_B, color: C.navy, bold: true, margin: 0,
  });
  s10.addText([
    { text: "ClickView: Into the Teens", options: { breakLine: true, fontSize: 11 } },
    { text: "ClickView: The Number Crew \u2013 Counting 1 to 20", options: { fontSize: 11 } },
  ], {
    x: 5.5, y: 4.5, w: 3.8, h: 0.5,
    fontFace: FONT_B, color: C.dark, margin: 0,
  });

  // ===== SLIDE 11: Closing =====
  let s11 = pres.addSlide();
  s11.background = { color: C.navy };
  s11.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.mint } });
  s11.addShape(pres.shapes.OVAL, { x: -1, y: 3.5, w: 3, h: 3, fill: { color: C.teal, transparency: 25 } });
  s11.addShape(pres.shapes.OVAL, { x: 8.5, y: -0.5, w: 2.5, h: 2.5, fill: { color: C.seafoam, transparency: 40 } });
  s11.addText("Key Takeaways", {
    x: 0.8, y: 0.6, w: 8, h: 0.7,
    fontSize: 32, fontFace: FONT_H, color: C.white, bold: true, margin: 0,
  });
  ["Teen numbers = ten and some more",
   "Bundling sticks make place value visible",
   "Concrete \u2192 pictorial \u2192 abstract progression",
   "Repeat with varied manipulatives to consolidate"
  ].forEach((t, i) => {
    s11.addImage({ data: icons.star, x: 0.8, y: 1.6 + i * 0.6, w: 0.3, h: 0.3 });
    s11.addText(t, {
      x: 1.25, y: 1.55 + i * 0.6, w: 7.5, h: 0.4,
      fontSize: 17, fontFace: FONT_B, color: C.white, margin: 0,
    });
  });
  s11.addText("Foundation Mathematics  |  VC2MFN01  |  VC2MFN03", {
    x: 0.8, y: 4.7, w: 8, h: 0.4,
    fontSize: 12, fontFace: FONT_B, color: C.muted, margin: 0,
  });

  await pres.writeFile({ fileName: "Ten_and_Some_More.pptx" });
  console.log("Presentation saved: Ten_and_Some_More.pptx");
}

build().catch(err => { console.error(err); process.exit(1); });
