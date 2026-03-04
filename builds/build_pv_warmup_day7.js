// PV Warm-up Day 7: Spot the Difference — Very Close Numbers
// Year 5/6 Numeracy — Place Value to 10,000 — Week 6
// 10-minute warm-up attached to start of main lesson

"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const { createTheme, weekToVariant } = require("../themes/factory");
const { createWarmupHelpers } = require("./pv_warmup_helpers");

const T = createTheme("numeracy", "grade56", weekToVariant(6));
const {
  C, FONT_H, FONT_B,
  titleSlide, withReveal,
  addTopBar, addBadge, addTitle, addCard, addFooter, addTextOnShape,
  addStageBadge, SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;
const { addNumberCards, addSequenceRow, addAnswerBar, addExplanation } = createWarmupHelpers(T);

const OUT_DIR = "output/PV_Warmup_Day7_Spot_Difference";
const FOOTER = "Day 7  |  Place Value to 10,000  |  Week 6";

// ── Teacher Notes ────────────────────────────────────────────────────────────

const NOTES_TITLE = `DAY 7 TITLE: SPOT THE DIFFERENCE
Use as a holding slide while students settle.
SAY: "Today the numbers are very close together. You will need to be extra careful — check every place. One digit difference can change the order completely."
DO: Have whiteboards and markers ready. Display slide as students settle.
KEY POINT: Today's difficulty increase is about numbers that share most digits. Students must be systematic — rushing leads to errors.`;

const NOTES_WEDO_ORDER = `ORDERING 5,439 / 5,493 / 5,394 / 5,349 — WE DO
SAY: "These four numbers all start with 5 thousand and they are very close together. Turn and talk — order them smallest to largest."
Give 30 seconds for pair discussion.
Cold Call 2–3 pairs to share their reasoning.
CORRECT ANSWER: 5,349 → 5,394 → 5,439 → 5,493
REASONING: All have 5 thousands. Hundreds: 4, 4, 3, 3. The 3-hundreds go first: 5,349 vs 5,394 — tens: 4 vs 9, so 5,349 first. Then 4-hundreds: 5,439 vs 5,493 — tens: 3 vs 9, so 5,439 first.
SAY: "The hundreds split them into two groups: the 3-hundreds and the 4-hundreds. Then tens broke the ties within each group. Same strategy as always — just trickier numbers."
KEY POINT: These numbers all use the digits 3, 4, 5, 9 in different arrangements. Students who compare numbers as whole chunks instead of place-by-place will struggle.
COMMON ERROR: Students reading 5,394 as "bigger" than 5,439 because they see 94 > 39. Reinforce: compare one place at a time from the left. Hundreds first (3 < 4), so 5,394 is in the smaller group.`;

const NOTES_WEDO_SKIP = `SKIP COUNTING: CROSSING 10,000 — WE DO
SAY: "This sequence crosses a very big boundary. Same rule — plus 100 each time. What are the missing numbers?"
Point to: ? ... 9,840 ... ? ... 10,040 ... ?
SAY: "I can see 9,840 and 10,040. Let us work backwards and forwards."
Cold Call: "What comes 100 before 9,840?" [9,740]
Cold Call: "What comes 100 after 9,840?" [9,940]
SAY: "And 100 after 9,940?" Pause — this is the big moment.
Cold Call: [10,040 — it matches the slide!]
SAY: "9,940 to 10,040. We have crossed into ten-thousands territory! 9 thousands becomes 10 thousands."
Cold Call: "And 100 after 10,040?" [10,140]
CORRECT ANSWER: 9,740 → 9,840 → 9,940 → 10,040 → 10,140
KEY POINT: The 10,000 crossing is the hardest boundary students encounter in this unit. Emphasise: the same rule applies (hundreds reset to 0, thousands go up by 1) — it is just that "9 thousands + 1 thousand = 10 thousands" gives us a 5-digit number.
COMMON ERROR: Students may write 10,940 (added 1,000 instead of 100) or 1,040 (dropped a zero). Reinforce: adding 100 only changes the hundreds and (sometimes) thousands. Tens and ones never change.`;

const NOTES_YOUDO = `WHITEBOARD PRACTICE: DUAL SKILL — YOU DO
SAY: "Whiteboards out. Two questions. Write your answer for each."

Q1: Order smallest to largest: 8,265 / 8,256 / 8,625 / 8,652
Give 45 seconds.
CORRECT ANSWER: 8,256 → 8,265 → 8,625 → 8,652
(All 8 thousands. Hundreds: 2, 2, 6, 6. Two with 2 hundreds: 8,256 vs 8,265 — tens: 5 vs 6, so 8,256 first. Two with 6 hundreds: 8,625 vs 8,652 — tens: 2 vs 5, so 8,625 first.)

Q2: Fill the gaps (+100 each time): 7,850, ___, ___, 8,150, ___
CORRECT ANSWER: 7,850, 7,950, 8,050, 8,150, 8,250
(7,850 + 100 = 7,950. 7,950 + 100 = 8,050 — boundary crossing! 8,050 + 100 = 8,150. 8,150 + 100 = 8,250.)

SAY: "Boards up for Q1!" Scan. Then "Boards up for Q2!" Scan.

CIRCULATE. Look for:
- Q1: Students who mix up 8,256 and 8,265 (need to check tens carefully — 5 vs 6)
- Q2: Students who miss the boundary at 7,950 → 8,050

SUPPORT: For Q1: "How many hundreds does each number have? Sort them into groups by hundreds first."
For Q2: "Start at 7,850. Add 100 to the hundreds digit. What happens when you get to 9 hundreds and add one more?"`;

const NOTES_EXIT = `EXIT CHECK: DUAL SKILL — DAY 7
SAY: "Final check. Two questions on your board."
Read aloud: "Question 1: Order from smallest to largest — 4,518, 4,581, 4,158, 4,185. Question 2: What comes 100 after 9,960?"
Give 45 seconds.
SAY: "3... 2... 1... boards up!"

CORRECT ANSWERS:
Q1: 4,158 → 4,185 → 4,518 → 4,581
(All 4 thousands. Hundreds: 5, 5, 1, 1. Two with 1 hundred: 4,158 vs 4,185 — tens: 5 vs 8, so 4,158 first. Two with 5 hundreds: 4,518 vs 4,581 — tens: 1 vs 8, so 4,518 first.)

Q2: 10,060
(9,960 + 100. Hundreds: 9 + 1 = 10 = 1 thousand. 9 thousands becomes 10 thousands. Hundreds reset to 0. Tens and ones: 60.)

Scan ALL boards. You want at least 80% correct.
If less than 80% on Q1: "Sort by hundreds first. That gives you two groups. Then use tens to order within each group."
If less than 80% on Q2: "This crosses into 10,000! Same rule — hundreds reset, thousands go up. 9 thousands plus 1 = 10 thousands."
If 80%+: "Great accuracy. Tomorrow we are doing some of this work on paper so we can collect evidence of your progress."`;

// ── Build ────────────────────────────────────────────────────────────────────

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const pres = new pptxgen();
  pres.defineLayout({ name: "CUSTOM", width: 10, height: 5.625 });
  pres.layout = "CUSTOM";

  // ── SLIDE 1: Title ──
  titleSlide(pres, "Spot the\nDifference",
    "Very close numbers \u2014 every digit matters",
    "10-minute warm-up  |  Place Value to 10,000  |  Week 6",
    NOTES_TITLE);

  // ── SLIDES 2–3: We Do — Ordering (with reveal) ──
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Order from Smallest to Largest", { fontSize: 22, color: STAGE_COLORS["3"] });
      s.addText("These numbers are very close. Turn and talk \u2014 be precise.", {
        x: 0.5, y: CONTENT_TOP, w: 9, h: 0.35,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      addNumberCards(s, ["5,439", "5,493", "5,394", "5,349"], 2.2);
      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO_ORDER);
      return s;
    },
    (s) => {
      addAnswerBar(s, "5,349  \u2192  5,394  \u2192  5,439  \u2192  5,493", 3.6);
      addExplanation(s, "Hundreds split them: 3-hundreds (5,349, 5,394) then 4-hundreds (5,439, 5,493). Tens broke the ties.", 4.25);
    }
  );

  // ── SLIDES 4–5: We Do — Skip Counting crossing 10,000 (with reveal) ──
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Fill the Gaps (+100 each time)", { fontSize: 22, color: STAGE_COLORS["3"] });
      s.addText("This one crosses a BIG boundary. Where is it?", {
        x: 0.5, y: CONTENT_TOP, w: 9, h: 0.35,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      addSequenceRow(s, ["?", "9,840", "?", "10,040", "?"], 2.4);
      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO_SKIP);
      return s;
    },
    (s) => {
      addSequenceRow(s, ["9,740", "9,840", "9,940", "10,040", "10,140"], 2.4, { fontSize: 14 });
      addAnswerBar(s, "Crosses 10,000!  9,940 \u2192 10,040", 3.6, { color: C.ALERT });
      addExplanation(s, "Same rule applies \u2014 9 thousands + 1 = 10 thousands. We now have a 5-digit number!", 4.25);
    }
  );

  // ── SLIDES 6–7: You Do — Dual Skill (with reveal) ──
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["4"]);
      addStageBadge(s, 4, "You Do");
      addTitle(s, "Your Turn \u2014 Whiteboards", { fontSize: 22, color: STAGE_COLORS["4"] });

      // Q1
      addCard(s, 0.5, CONTENT_TOP, 9, 1.5, { strip: STAGE_COLORS["4"] });
      s.addText("Q1: Order from smallest to largest", {
        x: 0.75, y: CONTENT_TOP + 0.08, w: 8.5, h: 0.25,
        fontSize: 12, fontFace: FONT_B, color: STAGE_COLORS["4"], bold: true, margin: 0,
      });
      addNumberCards(s, ["8,265", "8,256", "8,625", "8,652"], CONTENT_TOP + 0.45, { cardH: 0.5, fontSize: 19 });

      // Q2
      addCard(s, 0.5, 3.2, 9, 1.5, { strip: STAGE_COLORS["4"] });
      s.addText("Q2: Fill the gaps (+100 each time)", {
        x: 0.75, y: 3.28, w: 8.5, h: 0.25,
        fontSize: 12, fontFace: FONT_B, color: STAGE_COLORS["4"], bold: true, margin: 0,
      });
      addSequenceRow(s, ["7,850", "?", "?", "8,150", "?"], 3.7, { boxH: 0.48, fontSize: 15 });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_YOUDO);
      return s;
    },
    (s) => {
      addAnswerBar(s, "Q1: 8,256 \u2192 8,265 \u2192 8,625 \u2192 8,652", CONTENT_TOP + 1.1, { h: 0.35, fontSize: 14 });
      addSequenceRow(s, ["7,850", "7,950", "8,050", "8,150", "8,250"], 3.7, { boxH: 0.48, fontSize: 14 });
    }
  );

  // ── SLIDES 8–9: Exit Check (with reveal) ──
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, C.ALERT);
      addBadge(s, "Exit Check", { color: C.ALERT });
      addTitle(s, "Quick Check \u2014 Write Both Answers", { fontSize: 22, color: C.ALERT });

      addCard(s, 0.5, CONTENT_TOP, 9, 1.35, { strip: C.ALERT });
      s.addText("Q1: Order smallest to largest", {
        x: 0.75, y: CONTENT_TOP + 0.08, w: 8.5, h: 0.25,
        fontSize: 12, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0,
      });
      addNumberCards(s, ["4,518", "4,581", "4,158", "4,185"], CONTENT_TOP + 0.4, { cardH: 0.48, fontSize: 17, color: C.SECONDARY });

      addCard(s, 0.5, 3.1, 9, 1.1, { strip: C.ALERT });
      s.addText("Q2: What comes 100 after 9,960?", {
        x: 0.75, y: 3.2, w: 8.5, h: 0.25,
        fontSize: 12, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0,
      });
      addTextOnShape(s, "9,960  \u2192  ?", {
        x: 3, y: 3.55, w: 4, h: 0.48, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_EXIT);
      return s;
    },
    (s) => {
      addAnswerBar(s, "Q1: 4,158 \u2192 4,185 \u2192 4,518 \u2192 4,581", CONTENT_TOP + 0.95, { h: 0.35, fontSize: 14 });
      addAnswerBar(s, "Q2: 10,060", 3.5, { h: 0.35, fontSize: 14, w: 3 });
      addExplanation(s, "Q2 crosses 10,000! 9,960 + 100 = 10,060.", 4.35);
    }
  );

  await pres.writeFile({ fileName: `${OUT_DIR}/PV_Warmup_Day7.pptx` });
  console.log("Done: " + OUT_DIR);
}

build().catch(err => { console.error(err); process.exit(1); });
