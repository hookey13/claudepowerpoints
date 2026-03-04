// PV Warm-up Day 10: Formative Check-In
// Year 5/6 Numeracy — Place Value to 10,000 — Week 7
// 10-minute warm-up attached to start of main lesson
// Includes companion PDF: 3-question formative check-in sheet

"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const { createTheme, weekToVariant } = require("../themes/factory");
const { createWarmupHelpers } = require("./pv_warmup_helpers");
const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addBodyText, addTipBox, addPdfFooter, addWriteLine,
  addResourceSlide, PAGE,
} = require("../themes/pdf_helpers");

const T = createTheme("numeracy", "grade56", weekToVariant(7));
const {
  C, FONT_H, FONT_B,
  titleSlide, withReveal,
  addTopBar, addBadge, addTitle, addCard, addFooter, addTextOnShape,
  addStageBadge, SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;
const { addNumberCards, addSequenceRow, addAnswerBar, addExplanation } = createWarmupHelpers(T);

const OUT_DIR = "output/PV_Warmup_Day10_Formative_Check";
const FOOTER = "Day 10  |  Place Value to 10,000  |  Week 7";

// ── Teacher Notes ────────────────────────────────────────────────────────────

const NOTES_TITLE = `DAY 10 TITLE: FORMATIVE CHECK-IN
Use as a holding slide while students settle.
SAY: "Today is our check-in day. You are going to answer three questions on paper — just like the test next week. This is not a big deal — it is a quick snapshot so I can see how you are going."
DO: Have the printed check-in sheets ready but do NOT distribute yet. Quick whiteboard warm-up first.
KEY POINT: This is formative — diagnostic, not graded. The purpose is to inform teaching decisions for the final week and to provide data for the PLC meeting. Keep the tone low-stakes and encouraging.`;

const NOTES_WEDO = `QUICK WARM-UP: WHICH IS BIGGER? — WE DO
SAY: "One quick warm-up on whiteboards. Which is bigger — 4,819 or 4,891? Write the bigger number."
Give 10 seconds.
SAY: "Boards up!"
CORRECT ANSWER: 4,891
REASONING: Both have 4 thousands — same. Both have 8 hundreds — same. Tens: 1 vs 9. 9 > 1. So 4,891 is bigger.
SAY: "Good — the tens told us. 9 tens beats 1 ten. Now put your whiteboards away. I am handing out your check-in sheet."
KEY POINT: This is just a confidence builder before the check-in. Keep it fast and positive.`;

const NOTES_CHECKIN = `FORMATIVE CHECK-IN — YOU DO (ON PAPER)
SAY: "This is your check-in. Three questions on paper. Work independently and in silence. Show your working where it asks you to."
DO: Distribute the check-in sheets. One per student.
SAY: "Write your name and date at the top. Read each question carefully. You have 5 minutes."

DO NOT provide hints, scaffolds, or support during the check-in. This is assessment — you need clean data. Circulate and observe, but do not help.

ANSWERS (for marking after collection):

Q1: Order from smallest to largest: 7,305 / 7,530 / 7,053 / 7,350
CORRECT ORDER: 7,053 → 7,305 → 7,350 → 7,530
(All 7 thousands. Hundreds: 3, 5, 0, 3. Smallest = 0: 7,053. Then two with 3 hundreds: 7,305 vs 7,350 — tens: 0 vs 5, so 7,305 first. Then 5 hundreds: 7,530.)

Q2: What comes 100 after 6,940?
CORRECT ANSWER: 7,040
(Boundary crossing: 9 hundreds + 1 = 10 = 1 thousand. 6 thousands becomes 7. Hundreds reset to 0. Tens and ones: 40.)

Q3 (Challenge): Fill the gaps (+100): ___, 8,850, ___, ___, 9,150
CORRECT ANSWER: 8,750, 8,850, 8,950, 9,050, 9,150
(8,850 - 100 = 8,750. 8,850 + 100 = 8,950. 8,950 + 100 = 9,050 — boundary crossing! 9,050 + 100 = 9,150.)
AND order these 5 numbers smallest to largest:
CORRECT ORDER: 8,750 → 8,850 → 8,950 → 9,050 → 9,150 (already in order if completed correctly)

AFTER 5 MINUTES:
SAY: "Pens down. Pass your sheets to the end of the row."
Collect ALL sheets.

TEACHER NOTES: Mark these before the next PLC meeting. For each focus student, record: Q1 correct? Q2 correct? Q3 correct? Bring the marked sheets and your tracking data to the PLC meeting. This data drives the post-test decision.`;

const NOTES_CLOSING = `CLOSING — DAY 10
SAY: "That is our check-in done. Well done for giving it a go. Remember — this is not about getting everything perfect. It is about showing me where you are so I can help you get even further."
SAY: "Next week is the real thing — the post-test. But the strategy hasn't changed: start from the left, go place by place, and check every digit. You know how to do this."
DO: End the warm-up. Transition to the main lesson.`;

const NOTES_RESOURCE = `RESOURCE SLIDE
SAY: Do not display this slide to students. This lists the companion check-in sheet.
DO: Print the check-in sheet before the lesson. One copy per student.
TEACHER NOTES: This is the formative check-in agreed at the PLC meeting. 3 questions: 1 ordering, 1 counting by 100, 1 challenge combining both skills. Mark and bring to the Week 8 PLC meeting.`;

// ── Build ────────────────────────────────────────────────────────────────────

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const pres = new pptxgen();
  pres.defineLayout({ name: "CUSTOM", width: 10, height: 5.625 });
  pres.layout = "CUSTOM";

  // ── SLIDE 1: Title ──
  titleSlide(pres, "Formative\nCheck-In",
    "3 questions on paper \u2014 show what you know",
    "10-minute warm-up  |  Place Value to 10,000  |  Week 7",
    NOTES_TITLE);

  // ── SLIDES 2–3: Quick warm-up (with reveal) ──
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Quick Warm-Up: Which Is Bigger?", { fontSize: 22, color: STAGE_COLORS["3"] });
      s.addText("Write the bigger number on your whiteboard.", {
        x: 0.5, y: CONTENT_TOP, w: 9, h: 0.3,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      addNumberCards(s, ["4,819", "or", "4,891"], 2.2, { cardW: 2.0, color: C.PRIMARY });
      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO);
      return s;
    },
    (s) => {
      addAnswerBar(s, "4,891 is bigger", 3.6);
      addExplanation(s, "Both have 4 thousands, 8 hundreds. Tens: 1 vs 9. Nine tens wins.", 4.25);
    }
  );

  // ── SLIDE 4: Check-In Instructions ──
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, C.ALERT);
    addBadge(s, "Check-In", { color: C.ALERT, w: 1.6 });
    addTitle(s, "Formative Check-In \u2014 On Paper", { fontSize: 24, color: C.ALERT });

    addCard(s, 0.5, CONTENT_TOP, 9, 3.5, { strip: C.ALERT });

    const instructions = [
      "Write your name and date at the top of your sheet.",
      "3 questions. Work independently and in silence.",
      "Show your working where it asks you to.",
      "You have 5 minutes.",
      "When you finish, check your work \u2014 go back through each question place by place.",
    ];

    instructions.forEach((inst, i) => {
      const iy = CONTENT_TOP + 0.2 + i * 0.55;
      addTextOnShape(s, String(i + 1), {
        x: 0.72, y: iy, w: 0.4, h: 0.4, rectRadius: 0.2,
        fill: { color: C.ALERT },
      }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText(inst, {
        x: 1.3, y: iy, w: 7.8, h: 0.4,
        fontSize: 15, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_CHECKIN);
  }

  // ── SLIDE 5: Closing ──
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_DARK };
    s.addShape("rect", { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.ACCENT } });

    s.addText("Well done!", {
      x: 0.7, y: 0.8, w: 8, h: 1.0,
      fontSize: 36, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
    });
    s.addText("You have worked hard on place value this fortnight.\nThe strategy has not changed:", {
      x: 0.7, y: 1.9, w: 8, h: 0.8,
      fontSize: 16, fontFace: FONT_B, color: C.SUBTITLE, margin: 0,
    });

    const tips = [
      "Start from the left \u2014 thousands first",
      "Go place by place \u2014 do not skip",
      "When adding 100, only hundreds change (and sometimes thousands)",
    ];
    tips.forEach((tip, i) => {
      addTextOnShape(s, tip, {
        x: 0.7, y: 2.9 + i * 0.6, w: 8.4, h: 0.45, rectRadius: 0.08,
        fill: { color: C.ACCENT },
      }, { fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true });
    });

    s.addText("Next week: post-test. You are ready.", {
      x: 0.7, y: 4.75, w: 8, h: 0.35,
      fontSize: 14, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    s.addNotes(NOTES_CLOSING);
  }

  // ── SLIDE 6: Resource Slide ──
  addResourceSlide(pres, [
    {
      name: "Formative Check-In Sheet",
      fileName: "PV_Formative_CheckIn.pdf",
      description: "3-question hard-copy check-in. Print one per student. Collect and mark for PLC meeting.",
    },
  ], T, FOOTER, NOTES_RESOURCE);

  await pres.writeFile({ fileName: `${OUT_DIR}/PV_Warmup_Day10.pptx` });
  console.log("PPTX written: " + OUT_DIR);

  // ── Generate companion PDF: Formative Check-In Sheet ──
  await generateCheckIn();
  console.log("Done: " + OUT_DIR);
}

// ── PDF: Formative Check-In Sheet ────────────────────────────────────────────

async function generateCheckIn() {
  const doc = createPdf({ title: "PV Formative Check-In" });
  const color = C.PRIMARY;

  let y = addPdfHeader(doc, "Place Value Check-In", {
    subtitle: "Ordering numbers and skip counting by 100",
    color,
    lessonInfo: "Place Value to 10,000  |  Formative Check-In  |  Year 5/6 Maths",
  });

  y += 8;

  // ── Q1: Ordering ──
  y = addSectionHeading(doc, "Question 1: Order from Smallest to Largest", y, { color });
  y = addBodyText(doc, "Put these four numbers in order from smallest to largest.", y);
  y += 6;

  // Number boxes
  const numbers = ["7,305", "7,530", "7,053", "7,350"];
  const boxW = 90;
  const boxH = 36;
  const gap = 20;
  const totalW = numbers.length * boxW + (numbers.length - 1) * gap;
  const startX = PAGE.MARGIN + (PAGE.CONTENT_W - totalW) / 2;

  doc.save();
  numbers.forEach((num, i) => {
    const bx = startX + i * (boxW + gap);
    doc.roundedRect(bx, y, boxW, boxH, 4).fill("#" + color);
    doc.fontSize(16).font("Helvetica-Bold").fillColor("#FFFFFF");
    doc.text(num, bx, y + 10, { width: boxW, align: "center" });
  });
  doc.restore();
  y += boxH + 18;

  // Answer boxes (4 boxes with arrows)
  const ansBoxW = 80;
  const arrowW = 30;
  const ansTotalW = 4 * ansBoxW + 3 * arrowW;
  const ansStartX = PAGE.MARGIN + (PAGE.CONTENT_W - ansTotalW) / 2;

  doc.save();
  for (let i = 0; i < 4; i++) {
    const bx = ansStartX + i * (ansBoxW + arrowW);
    doc.roundedRect(bx, y, ansBoxW, boxH, 4)
      .lineWidth(1).strokeColor("#" + color).stroke();
    if (i < 3) {
      doc.fontSize(14).font("Helvetica").fillColor("#" + C.MUTED);
      doc.text("\u2192", bx + ansBoxW + 5, y + 8, { width: arrowW - 10, align: "center" });
    }
  }
  doc.restore();

  doc.fontSize(9).font("Helvetica").fillColor("#" + C.MUTED);
  doc.text("Smallest", ansStartX, y + boxH + 4, { width: ansBoxW, align: "center" });
  doc.text("Largest", ansStartX + 3 * (ansBoxW + arrowW), y + boxH + 4, { width: ansBoxW, align: "center" });
  y += boxH + 28;

  // ── Q2: 100 After ──
  y = addSectionHeading(doc, "Question 2: What Comes 100 After?", y, { color });
  y = addBodyText(doc, "What number comes 100 after 6,940? Show your working.", y);
  y += 6;

  // Working box
  doc.save();
  doc.roundedRect(PAGE.MARGIN, y, PAGE.CONTENT_W, 75, 4)
    .lineWidth(0.5).strokeColor("#CCCCCC").stroke();
  doc.fontSize(14).font("Helvetica-Bold").fillColor("#" + color);
  doc.text("6,940  +  100  =", PAGE.MARGIN + 14, y + 10);
  doc.moveTo(PAGE.MARGIN + 160, y + 24).lineTo(PAGE.MARGIN + 340, y + 24)
    .strokeColor("#CCCCCC").lineWidth(0.5).stroke();
  doc.fontSize(10).font("Helvetica").fillColor("#" + C.MUTED);
  doc.text("Working:", PAGE.MARGIN + 14, y + 38);
  for (let i = 0; i < 2; i++) {
    const ly = y + 52 + i * 16;
    doc.moveTo(PAGE.MARGIN + 14, ly).lineTo(PAGE.MARGIN + PAGE.CONTENT_W - 14, ly)
      .strokeColor("#DDDDDD").lineWidth(0.5).stroke();
  }
  doc.restore();
  y += 95;

  // ── Q3: Challenge ──
  y = addSectionHeading(doc, "Question 3: Challenge \u2014 Fill the Gaps AND Order", y, { color: C.ALERT });
  y = addBodyText(doc, "a) Fill in the missing numbers. Each step adds 100.", y);
  y += 6;

  // Sequence boxes
  const seqItems = ["____", "8,850", "____", "____", "9,150"];
  const sBoxW = 75;
  const sGap = 16;
  const sTotalW = seqItems.length * sBoxW + (seqItems.length - 1) * sGap;
  const sStartX = PAGE.MARGIN + (PAGE.CONTENT_W - sTotalW) / 2;

  doc.save();
  seqItems.forEach((item, i) => {
    const bx = sStartX + i * (sBoxW + sGap);
    const isBlank = item.startsWith("_");
    if (isBlank) {
      doc.roundedRect(bx, y, sBoxW, boxH, 4)
        .lineWidth(1.5).dash(4, { space: 3 }).strokeColor("#" + color).stroke();
    } else {
      doc.roundedRect(bx, y, sBoxW, boxH, 4).fill("#" + color);
      doc.fontSize(14).font("Helvetica-Bold").fillColor("#FFFFFF");
      doc.text(item, bx, y + 10, { width: sBoxW, align: "center" });
    }
    if (i < seqItems.length - 1) {
      doc.fontSize(8).font("Helvetica").fillColor("#" + C.MUTED);
      doc.text("+100", bx + sBoxW + 2, y + 12, { width: sGap - 4, align: "center" });
    }
  });
  doc.restore();
  y += boxH + 18;

  y = addBodyText(doc, "b) Now write all 5 numbers in order from smallest to largest.", y);
  y += 4;

  // Answer line for ordering
  doc.save();
  const orderBoxW = 70;
  const orderGap = 22;
  const orderTotalW = 5 * orderBoxW + 4 * orderGap;
  const orderStartX = PAGE.MARGIN + (PAGE.CONTENT_W - orderTotalW) / 2;
  for (let i = 0; i < 5; i++) {
    const bx = orderStartX + i * (orderBoxW + orderGap);
    doc.roundedRect(bx, y, orderBoxW, 32, 4)
      .lineWidth(0.5).strokeColor("#" + color).stroke();
    if (i < 4) {
      doc.fontSize(12).font("Helvetica").fillColor("#" + C.MUTED);
      doc.text("\u2192", bx + orderBoxW + 4, y + 8, { width: orderGap - 8, align: "center" });
    }
  }
  doc.restore();
  y += 50;

  // Tip box
  y = addTipBox(doc, "Strategy reminder: Always start from the left \u2014 compare thousands first, then hundreds, then tens, then ones. When adding 100, only the hundreds digit changes (and thousands if there is a boundary crossing).", y, { color: C.SECONDARY });

  addPdfFooter(doc, "Place Value to 10,000  |  Formative Check-In  |  Year 5/6 Maths");

  await writePdf(doc, `${OUT_DIR}/PV_Formative_CheckIn.pdf`);
}

build().catch(err => { console.error(err); process.exit(1); });
