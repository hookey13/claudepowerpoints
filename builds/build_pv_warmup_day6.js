// PV Warm-up Day 6: Level Up — Closer Numbers, Harder Boundaries
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

const OUT_DIR = "output/PV_Warmup_Day6_Level_Up";
const FOOTER = "Day 6  |  Place Value to 10,000  |  Week 6";

// ── Teacher Notes ────────────────────────────────────────────────────────────

const NOTES_TITLE = `DAY 6 TITLE: LEVEL UP
Use as a holding slide while students settle.
SAY: "Welcome back. This week we are stepping up the difficulty. Same two skills — ordering and skip counting by 100 — but the numbers are closer together and the boundary crossings are trickier. Let's see how sharp you are."
DO: Have whiteboards and markers ready. Display slide as students settle.
KEY POINT: Establish that the strategy hasn't changed (start from the left, compare place by place) — only the numbers are harder.`;

const NOTES_WEDO_ORDER = `ORDERING 6,382 / 6,328 / 6,832 / 6,283 — WE DO
SAY: "Turn and talk to your partner. Order these four numbers from smallest to largest. Tell your partner which place helped you decide."
Give 30 seconds for pair discussion.
Cold Call 2–3 pairs to share.
CORRECT ANSWER: 6,283 → 6,328 → 6,382 → 6,832
REASONING: All have 6 thousands — same. Hundreds: 2, 3, 3, 8. Smallest hundreds = 2 → 6,283 goes first. Two numbers have 3 hundreds: 6,328 and 6,382. Check tens: 2 < 8, so 6,328 before 6,382. Finally 8 hundreds: 6,832 is last.
SAY: "These numbers were tricky because two of them had the same hundreds — 6,382 and 6,328. When the hundreds tie, we go to tens to break it."
KEY POINT: Emphasise the tie-breaking strategy. When two numbers share the same digit in one place, move to the next place to the right. This is the same strategy from last week — just applied to trickier numbers.
COMMON ERROR: Students may see "382" and "328" and compare them as three-digit numbers rather than going place by place. Reinforce: compare one digit at a time.`;

const NOTES_WEDO_SKIP = `SKIP COUNTING BY 100: FILL THE GAPS — WE DO
SAY: "Now skip counting. Each box adds 100. What are the missing numbers?"
Point to the sequence: 4,830 ... ? ... ? ... ? ... 5,230
Cold Call: "What comes 100 after 4,830?" [4,930]
Cold Call: "And 100 after 4,930?" [5,030 — boundary crossing!]
SAY: "Did you spot that? 4,930 to 5,030 crosses a thousands boundary. The 9 hundreds becomes 0 and the 4 thousands becomes 5 thousands."
Cold Call: "And 100 after 5,030?" [5,130]
CORRECT ANSWER: 4,830 → 4,930 → 5,030 → 5,130 → 5,230
KEY POINT: The boundary crossing at 4,930 → 5,030 is the critical moment. Students who miss this will write 4,030 (forgot to increase thousands) or 5,930 (added 1,000 instead of 100). If students struggle: write 4,930 in expanded form on the board. 4,000 + 900 + 30. Add 100: 900 + 100 = 1,000. So 4,000 + 1,000 + 30 = 5,030.
COMMON ERROR: Students writing 4,030 instead of 5,030 — they reset the hundreds to 0 but forget to increase the thousands.`;

const NOTES_YOUDO = `WHITEBOARD PRACTICE: DUAL SKILL — YOU DO
SAY: "Whiteboards out. Two questions. Write your answer for Question 1 first, then Question 2. Do NOT hold up until I say."

Q1: Order smallest to largest: 7,514 / 7,154 / 7,541 / 7,145
Give 45 seconds.
CORRECT ANSWER: 7,145 → 7,154 → 7,514 → 7,541
(All 7 thousands. Hundreds: 5, 1, 5, 1. Two with 1 hundred: 7,145 vs 7,154 — tens: 4 < 5, so 7,145 first. Two with 5 hundreds: 7,514 vs 7,541 — tens: 1 < 4, so 7,514 first.)

Q2: What comes 100 after 6,940?
CORRECT ANSWER: 7,040
(Boundary crossing: 9 hundreds + 1 = 10 hundreds = 1 thousand. 6 thousands becomes 7. Hundreds reset to 0. Tens and ones stay: 40.)

SAY: "Boards up for Q1!" Scan. Then "Now boards up for Q2!" Scan.

CIRCULATE. Look for:
- Q1: Students who only sort by hundreds but forget to check tens when hundreds tie
- Q2: Students who write 6,040 (forgot to increase thousands) or 7,940 (added 1,000)

SUPPORT: For students who struggle with Q1, say "Circle the hundreds digit in each number. Sort the hundreds first. If two have the same hundreds, move to tens."
For Q2: "Point to the hundreds digit. Add 1. Did it go past 9? Then hundreds become 0 and thousands go up by 1."`;

const NOTES_EXIT = `EXIT CHECK: DUAL SKILL — DAY 6
SAY: "Last one. Two quick questions. Write both answers on your board."
Read aloud: "Question 1: Order these from smallest to largest — 3,609, 3,690, 3,069, 3,096. Question 2: What comes 100 after 2,970?"
Give 45 seconds.
SAY: "3... 2... 1... boards up!"

CORRECT ANSWERS:
Q1: 3,069 → 3,096 → 3,609 → 3,690
(All 3 thousands. Hundreds: 6, 6, 0, 0. Two with 0 hundreds: 3,069 vs 3,096 — tens: 6 vs 9, 3,069 first. Two with 6 hundreds: 3,609 vs 3,690 — tens: 0 vs 9, 3,609 first.)

Q2: 3,070
(Boundary crossing: 9 hundreds + 1 = 10 = 1 thousand. 2 thousands becomes 3 thousands. Hundreds reset to 0. Tens and ones: 70.)

Cover the answer until boards are up. Scan ALL boards.
You want at least 80% correct on both.

If less than 80% on Q1: Briefly re-model. "Thousands — same. Now hundreds — that splits them into groups. Then tens break the ties within each group."
If less than 80% on Q2: "Point to the hundreds. 9 + 1 = 10 hundreds = 1 thousand. So thousands go up, hundreds go to zero."
If 80%+: "Strong work. Tomorrow the numbers get even closer together."`;

// ── Build ────────────────────────────────────────────────────────────────────

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const pres = new pptxgen();
  pres.defineLayout({ name: "CUSTOM", width: 10, height: 5.625 });
  pres.layout = "CUSTOM";

  // ── SLIDE 1: Title ──
  titleSlide(pres, "Level Up",
    "Closer numbers, harder boundaries",
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
      s.addText("Talk to your partner. Put these in order — smallest to largest.", {
        x: 0.5, y: CONTENT_TOP, w: 9, h: 0.35,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      addNumberCards(s, ["6,382", "6,328", "6,832", "6,283"], 2.2);
      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO_ORDER);
      return s;
    },
    (s) => {
      addAnswerBar(s, "6,283  \u2192  6,328  \u2192  6,382  \u2192  6,832", 3.6);
      addExplanation(s, "All 6 thousands. Hundreds: 2, 3, 3, 8. Two tied at 3 hundreds \u2014 tens broke it (2 < 8).", 4.25);
    }
  );

  // ── SLIDES 4–5: We Do — Skip Counting (with reveal) ──
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Fill the Gaps (+100 each time)", { fontSize: 22, color: STAGE_COLORS["3"] });
      s.addText("Each step adds 100. What are the missing numbers?", {
        x: 0.5, y: CONTENT_TOP, w: 9, h: 0.35,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      addSequenceRow(s, ["4,830", "?", "?", "?", "5,230"], 2.4);
      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO_SKIP);
      return s;
    },
    (s) => {
      addSequenceRow(s, ["4,830", "4,930", "5,030", "5,130", "5,230"], 2.4);
      addAnswerBar(s, "Boundary crossing at 4,930 \u2192 5,030: hundreds reset, thousands go up!", 3.6, { color: C.ALERT });
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

      // Q1 section
      addCard(s, 0.5, CONTENT_TOP, 9, 1.6, { strip: STAGE_COLORS["4"] });
      s.addText("Q1: Order from smallest to largest", {
        x: 0.75, y: CONTENT_TOP + 0.08, w: 8.5, h: 0.3,
        fontSize: 13, fontFace: FONT_B, color: STAGE_COLORS["4"], bold: true, margin: 0,
      });
      addNumberCards(s, ["7,514", "7,154", "7,541", "7,145"], CONTENT_TOP + 0.5, { cardH: 0.55, fontSize: 20 });

      // Q2 section
      addCard(s, 0.5, 3.3, 9, 1.3, { strip: STAGE_COLORS["4"] });
      s.addText("Q2: What comes 100 after 6,940?", {
        x: 0.75, y: 3.4, w: 8.5, h: 0.3,
        fontSize: 13, fontFace: FONT_B, color: STAGE_COLORS["4"], bold: true, margin: 0,
      });
      addTextOnShape(s, "6,940  \u2192  ?", {
        x: 3, y: 3.85, w: 4, h: 0.55, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      }, { fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_YOUDO);
      return s;
    },
    (s) => {
      addAnswerBar(s, "Q1: 7,145 \u2192 7,154 \u2192 7,514 \u2192 7,541", CONTENT_TOP + 1.15, { h: 0.4, fontSize: 15 });
      addAnswerBar(s, "Q2: 7,040", 4.5, { h: 0.4, fontSize: 15, w: 4 });
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

      addCard(s, 0.5, CONTENT_TOP, 9, 1.4, { strip: C.ALERT });
      s.addText("Q1: Order smallest to largest", {
        x: 0.75, y: CONTENT_TOP + 0.08, w: 8.5, h: 0.25,
        fontSize: 12, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0,
      });
      addNumberCards(s, ["3,609", "3,690", "3,069", "3,096"], CONTENT_TOP + 0.4, { cardH: 0.5, fontSize: 18, color: C.SECONDARY });

      addCard(s, 0.5, 3.15, 9, 1.15, { strip: C.ALERT });
      s.addText("Q2: What comes 100 after 2,970?", {
        x: 0.75, y: 3.25, w: 8.5, h: 0.25,
        fontSize: 12, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0,
      });
      addTextOnShape(s, "2,970  \u2192  ?", {
        x: 3, y: 3.6, w: 4, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_EXIT);
      return s;
    },
    (s) => {
      addAnswerBar(s, "Q1: 3,069 \u2192 3,096 \u2192 3,609 \u2192 3,690", CONTENT_TOP + 1.0, { h: 0.35, fontSize: 14 });
      addAnswerBar(s, "Q2: 3,070", 3.55, { h: 0.35, fontSize: 14, w: 3 });
      addExplanation(s, "Q1: 0-hundreds first (3,069 vs 3,096 — tens decide), then 6-hundreds. Q2: boundary crossing.", 4.4);
    }
  );

  await pres.writeFile({ fileName: `${OUT_DIR}/PV_Warmup_Day6.pptx` });
  console.log("Done: " + OUT_DIR);
}

build().catch(err => { console.error(err); process.exit(1); });
