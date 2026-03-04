// PV Warm-up Day 8: Show Your Working — Paper Evidence Day
// Year 5/6 Numeracy — Place Value to 10,000 — Week 6/7
// 10-minute warm-up attached to start of main lesson
// Includes companion PDF worksheet for hard-copy evidence collection

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

const T = createTheme("numeracy", "grade56", weekToVariant(6));
const {
  C, FONT_H, FONT_B,
  titleSlide, withReveal,
  addTopBar, addBadge, addTitle, addCard, addFooter, addTextOnShape,
  addStageBadge, SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;
const { addNumberCards, addSequenceRow, addAnswerBar, addExplanation } = createWarmupHelpers(T);

const OUT_DIR = "output/PV_Warmup_Day8_Paper_Evidence";
const FOOTER = "Day 8  |  Place Value to 10,000  |  Week 7";

// ── Teacher Notes ────────────────────────────────────────────────────────────

const NOTES_TITLE = `DAY 8 TITLE: SHOW YOUR WORKING
Use as a holding slide while students settle.
SAY: "Today is evidence day. You are going to show me what you know ON PAPER. Same skills — ordering and counting by 100 — but this time I need to see your thinking written down."
DO: Have the printed worksheets ready to distribute. Do NOT hand them out yet — do the quick warm-up on whiteboards first.
KEY POINT: This session produces the written evidence the teaching team agreed on at the PLC meeting. Students write directly on the worksheet.`;

const NOTES_WEDO = `QUICK WARM-UP: WHICH IS BIGGER? — WE DO
SAY: "Quick warm-up on whiteboards first. Which is bigger — 6,705 or 6,750? Write the bigger number on your board."
Give 10 seconds.
SAY: "Boards up!"
CORRECT ANSWER: 6,750
REASONING: Both have 6 thousands — same. Both have 7 hundreds — same. Tens: 0 vs 5. 5 > 0. So 6,750 is bigger.
SAY: "The tens told us. 5 tens beats 0 tens. The 05 at the end of 6,705 can be confusing — but we go place by place, not chunk by chunk."
If most correct: "Good. Now put your whiteboards away. I am handing out a worksheet."
If many incorrect: Briefly re-model. "Both start with 6,7. That means thousands and hundreds are the same. Move to tens. 6,705 has 0 tens. 6,750 has 5 tens. 5 is more."`;

const NOTES_YOUDO = `PAPER EVIDENCE: WORKSHEET — YOU DO
SAY: "This is your chance to show me your thinking on paper. Three questions. Work through them carefully. Show your working — I want to see how you figured it out, not just the answer."
DO: Distribute the printed worksheets now. One per student.
SAY: "Write your name and date at the top. Question 1 is ordering — put the four numbers in order from smallest to largest. Question 2 is skip counting — write the next four numbers in the sequence. Question 3 is a boundary crossing."
SAY: "You have 5 minutes. Work independently. If you finish early, check your work by going back through each question place by place."
Give 5 minutes. Circulate.

ANSWERS:
Q1: Order from smallest to largest: 3,847 / 3,478 / 3,748 / 3,874
CORRECT ORDER: 3,478 → 3,748 → 3,847 → 3,874
(All 3 thousands. Hundreds: 8, 4, 7, 8. Smallest = 4: 3,478. Then 7: 3,748. Then two with 8 hundreds: 3,847 vs 3,874 — tens: 4 vs 7, so 3,847 first.)

Q2: Write the next 4 numbers (+100 each): 5,760, ___, ___, ___, ___
CORRECT ANSWER: 5,760, 5,860, 5,960, 6,060, 6,160
(5,760 + 100 = 5,860. 5,860 + 100 = 5,960. 5,960 + 100 = 6,060 — boundary crossing! 6,060 + 100 = 6,160.)

Q3: What comes 100 after 8,920?
CORRECT ANSWER: 9,020
(8,920 + 100. Hundreds: 9 + 1 = 10 = 1 thousand. 8 thousands becomes 9 thousands. Hundreds reset to 0. Tens and ones: 20.)

CIRCULATE. Look for:
- Students who write no working — prompt: "Show me which place you looked at first."
- Q1: Students who order largest to smallest by mistake
- Q2: Students who miss the boundary at 5,960 → 6,060
- Q3: Students who write 8,020 (forgot to increase thousands)

SUPPORT: For students who struggle: "Point to the hundreds digit. What is it? Now add 1. Did it go past 9?"

COLLECT the worksheets after the warm-up for evidence tracking.`;

const NOTES_RESOURCE = `RESOURCE SLIDE
SAY: Do not display this slide to students. This lists the companion worksheet.
DO: Print the worksheet before the lesson. One copy per student.
TEACHER NOTES: This worksheet generates hard-copy evidence for the PLC focus student tracking. Collect and file after the warm-up. Review before the next PLC meeting.`;

// ── Build ────────────────────────────────────────────────────────────────────

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const pres = new pptxgen();
  pres.defineLayout({ name: "CUSTOM", width: 10, height: 5.625 });
  pres.layout = "CUSTOM";

  // ── SLIDE 1: Title ──
  titleSlide(pres, "Show Your\nWorking",
    "Paper evidence day \u2014 show me your thinking",
    "10-minute warm-up  |  Place Value to 10,000  |  Week 7",
    NOTES_TITLE);

  // ── SLIDES 2–3: Quick We Do warm-up (with reveal) ──
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Quick Warm-Up: Which Is Bigger?", { fontSize: 22, color: STAGE_COLORS["3"] });
      s.addText("Write the bigger number on your whiteboard.", {
        x: 0.5, y: CONTENT_TOP, w: 9, h: 0.35,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      addNumberCards(s, ["6,705", "or", "6,750"], 2.2, { cardW: 2.0, color: C.PRIMARY });
      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO);
      return s;
    },
    (s) => {
      addAnswerBar(s, "6,750 is bigger", 3.6);
      addExplanation(s, "Both have 6 thousands and 7 hundreds. Tens: 0 vs 5. Five tens beats zero tens.", 4.25);
    }
  );

  // ── SLIDE 4: You Do — Paper Instructions ──
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["4"]);
    addStageBadge(s, 4, "You Do \u2014 On Paper");
    addTitle(s, "Show Your Working \u2014 Worksheet", { fontSize: 22, color: STAGE_COLORS["4"] });

    // Q1
    addCard(s, 0.5, CONTENT_TOP, 4.2, 1.5, { strip: STAGE_COLORS["4"] });
    s.addText("Q1: Order smallest to largest", {
      x: 0.68, y: CONTENT_TOP + 0.08, w: 3.8, h: 0.22,
      fontSize: 11, fontFace: FONT_B, color: STAGE_COLORS["4"], bold: true, margin: 0,
    });
    s.addText("3,847    3,478\n3,748    3,874", {
      x: 0.68, y: CONTENT_TOP + 0.4, w: 3.8, h: 0.9,
      fontSize: 20, fontFace: FONT_H, color: C.CHARCOAL, align: "center", valign: "middle", margin: 0,
    });

    // Q2
    addCard(s, 5.1, CONTENT_TOP, 4.4, 1.5, { strip: STAGE_COLORS["4"] });
    s.addText("Q2: Write the next 4 numbers (+100)", {
      x: 5.28, y: CONTENT_TOP + 0.08, w: 4.0, h: 0.22,
      fontSize: 11, fontFace: FONT_B, color: STAGE_COLORS["4"], bold: true, margin: 0,
    });
    s.addText("5,760,  ___,  ___,  ___,  ___", {
      x: 5.28, y: CONTENT_TOP + 0.4, w: 4.0, h: 0.9,
      fontSize: 17, fontFace: FONT_H, color: C.CHARCOAL, align: "center", valign: "middle", margin: 0,
    });

    // Q3
    addCard(s, 0.5, 3.2, 9, 1.2, { strip: STAGE_COLORS["4"] });
    s.addText("Q3: What comes 100 after 8,920? Show your working.", {
      x: 0.75, y: 3.3, w: 8.5, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: STAGE_COLORS["4"], bold: true, margin: 0,
    });
    addTextOnShape(s, "8,920  \u2192  ?", {
      x: 3, y: 3.7, w: 4, h: 0.5, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    }, { fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true });

    s.addText("Write your answers on the worksheet. Show your working!", {
      x: 0.5, y: 4.6, w: 9, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.ALERT, bold: true, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_YOUDO);
  }

  // ── SLIDE 5: Resource Slide ──
  addResourceSlide(pres, [
    {
      name: "PV Warm-up Worksheet \u2014 Day 8",
      fileName: "PV_Warmup_Day8_Worksheet.pdf",
      description: "3-question worksheet for paper evidence. Print one per student.",
    },
  ], T, FOOTER, NOTES_RESOURCE);

  await pres.writeFile({ fileName: `${OUT_DIR}/PV_Warmup_Day8.pptx` });
  console.log("PPTX written: " + OUT_DIR);

  // ── Generate companion PDF worksheet ──
  await generateWorksheet();
  console.log("Done: " + OUT_DIR);
}

// ── PDF Worksheet ────────────────────────────────────────────────────────────

async function generateWorksheet() {
  const doc = createPdf({ title: "PV Warm-up Day 8 Worksheet" });
  const color = C.PRIMARY;

  let y = addPdfHeader(doc, "Place Value Warm-Up \u2014 Day 8", {
    subtitle: "Ordering numbers and skip counting by 100",
    color,
    lessonInfo: "Place Value to 10,000  |  Week 7  |  Year 5/6 Maths",
  });

  y += 6;
  y = addSectionHeading(doc, "Question 1: Order from Smallest to Largest", y, { color });
  y = addBodyText(doc, "Put these four numbers in order from smallest to largest. Show which place you compared.", y);
  y += 4;

  // Number boxes for Q1
  const numbers = ["3,847", "3,478", "3,748", "3,874"];
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
  y += boxH + 16;

  y = addBodyText(doc, "Smallest \u2192 Largest:", y);
  y = addWriteLine(doc, "Answer:", y);
  y = addWriteLine(doc, "I compared the:", y);
  y += 12;

  // Q2
  y = addSectionHeading(doc, "Question 2: Skip Counting by 100", y, { color });
  y = addBodyText(doc, "Write the next 4 numbers. Each number is 100 more than the one before.", y);
  y += 4;

  // Sequence boxes
  const seqItems = ["5,760", "____", "____", "____", "____"];
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
  y += boxH + 16;

  y = addBodyText(doc, "Did the sequence cross a thousands boundary? Circle where.", y);
  y += 16;

  // Q3
  y = addSectionHeading(doc, "Question 3: What Comes 100 After?", y, { color });
  y = addBodyText(doc, "What number comes 100 after 8,920? Show your working.", y);
  y += 4;

  // Working space
  doc.save();
  const workX = PAGE.MARGIN + 60;
  doc.roundedRect(PAGE.MARGIN, y, PAGE.CONTENT_W, 80, 4)
    .lineWidth(0.5).strokeColor("#CCCCCC").stroke();
  doc.fontSize(14).font("Helvetica-Bold").fillColor("#" + color);
  doc.text("8,920  +  100  =", PAGE.MARGIN + 10, y + 8);
  // Write line inside box
  doc.moveTo(workX + 130, y + 22).lineTo(workX + 300, y + 22)
    .strokeColor("#CCCCCC").lineWidth(0.5).stroke();
  doc.fontSize(10).font("Helvetica").fillColor("#" + C.MUTED);
  doc.text("Show which digits changed and why:", PAGE.MARGIN + 10, y + 40);
  // Lined area for working
  for (let i = 0; i < 2; i++) {
    const ly = y + 56 + i * 18;
    doc.moveTo(PAGE.MARGIN + 10, ly).lineTo(PAGE.MARGIN + PAGE.CONTENT_W - 10, ly)
      .strokeColor("#DDDDDD").lineWidth(0.5).stroke();
  }
  doc.restore();
  y += 100;

  // Tip box
  y = addTipBox(doc, "Remember: When adding 100, only the hundreds digit changes. If the hundreds go past 9, they reset to 0 and the thousands go up by 1. Tens and ones NEVER change when adding 100.", y, { color: C.SECONDARY });

  addPdfFooter(doc, "Place Value to 10,000  |  Day 8 Evidence Worksheet  |  Year 5/6 Maths");

  await writePdf(doc, `${OUT_DIR}/PV_Warmup_Day8_Worksheet.pdf`);
}

build().catch(err => { console.error(err); process.exit(1); });
