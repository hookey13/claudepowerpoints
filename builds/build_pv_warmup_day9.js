// PV Warm-up Day 9: Test Ready — Post-Test Format Practice
// Year 5/6 Numeracy — Place Value to 10,000 — Week 7
// 10-minute warm-up attached to start of main lesson

"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const { createTheme, weekToVariant } = require("../themes/factory");
const { createWarmupHelpers } = require("./pv_warmup_helpers");

const T = createTheme("numeracy", "grade56", weekToVariant(7));
const {
  C, FONT_H, FONT_B,
  titleSlide, closingSlide, withReveal,
  addTopBar, addBadge, addTitle, addCard, addFooter, addTextOnShape,
  addStageBadge, SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;
const { addNumberCards, addSequenceRow, addAnswerBar, addExplanation } = createWarmupHelpers(T);

const OUT_DIR = "output/PV_Warmup_Day9_Test_Ready";
const FOOTER = "Day 9  |  Place Value to 10,000  |  Week 7";

// ── Teacher Notes ────────────────────────────────────────────────────────────

const NOTES_TITLE = `DAY 9 TITLE: TEST READY
Use as a holding slide while students settle.
SAY: "Next session is your check-in — a quick test on paper to see how much you have grown since the start. Today we practise in exactly the same format as the check-in. Think of this as your dress rehearsal."
DO: Have whiteboards and markers ready. Display slide as students settle.
KEY POINT: Today's purpose is familiarity with the assessment format. Students should feel confident walking into tomorrow's check-in — no surprises.`;

const NOTES_WEDO = `ORDERING 2,739 / 2,793 / 2,397 / 2,973 — WE DO
SAY: "Quick ordering practice. Turn and talk — smallest to largest."
Give 20 seconds for pair discussion.
Cold Call 2 students.
CORRECT ANSWER: 2,397 → 2,739 → 2,793 → 2,973
REASONING: All 2 thousands. Hundreds: 7, 7, 3, 9. Smallest = 3: 2,397. Then two with 7 hundreds: 2,739 vs 2,793 — tens: 3 vs 9, so 2,739 first. Then 9 hundreds: 2,973.
SAY: "Quick and clean. Hundreds first, then tens for the tie. Let us move on."
COMMON ERROR: Students who see 973 and think 2,973 comes before 2,793 because they compare the last three digits as a chunk. Reinforce: place by place, left to right.`;

const NOTES_YOUDO = `POST-TEST FORMAT PRACTICE — YOU DO
SAY: "Three questions, just like tomorrow's check-in. Write all three answers on your whiteboard."

Q1: Order smallest to largest: 5,062 / 5,620 / 5,206 / 5,026
Give 30 seconds.
CORRECT ANSWER: 5,026 → 5,062 → 5,206 → 5,620
(All 5 thousands. Hundreds: 0, 6, 2, 0. Two with 0 hundreds: 5,062 vs 5,026 — tens: 6 vs 2, so 5,026 first. Then 2 hundreds: 5,206. Then 6 hundreds: 5,620.)

Q2: What comes 100 after 3,950?
CORRECT ANSWER: 4,050
(Boundary crossing: 9 hundreds + 1 = 10 hundreds = 1 thousand. 3 thousands becomes 4 thousands. Hundreds reset to 0. Tens and ones: 50.)

Q3: Fill the gaps (+100): ___, 6,930, ___, ___, 7,230
CORRECT ANSWER: 6,830, 6,930, 7,030, 7,130, 7,230
(6,930 - 100 = 6,830. 6,930 + 100 = 7,030 — boundary crossing! 7,030 + 100 = 7,130. 7,130 + 100 = 7,230.)

SAY: "Boards up!" Scan all three answers.

CIRCULATE. Look for:
- Q1: The zero hundreds can trick students. 5,062 and 5,026 both start with 5,0 — they need to check tens carefully (6 vs 2).
- Q2: Standard boundary crossing — should be solid by now.
- Q3: Working backwards from 6,930 to find 6,830 requires subtracting 100. Some students may struggle with the reverse operation.

SUPPORT: For Q3 backwards: "Subtracting 100 is the reverse. The hundreds digit goes down by 1."`;

const NOTES_EXIT = `CONFIDENCE CHECK — EXIT
SAY: "Before we finish — I want to check how you are feeling about each skill. I will name a skill. Show me thumbs up if you feel confident, thumbs sideways if you are nearly there, thumbs down if you still need help."
DO: Read each skill aloud. Scan the room for each. Note which focus students show thumbs down.

Skill 1: "Ordering four 4-digit numbers from smallest to largest."
Scan. Note names of thumbs-down students.

Skill 2: "Finding the number that comes 100 after — including when it crosses a thousands boundary."
Scan. Note names.

Skill 3: "Filling in a skip-counting-by-100 sequence with missing numbers."
Scan. Note names.

SAY: "If you showed thumbs up for all three — brilliant, you are ready. If you showed sideways or down — that is OK. Tomorrow's check-in is short and you will do your best. I am proud of how hard you have all worked on this."

TEACHER NOTES: Record the thumbs-down students. Cross-reference with your focus student list. If any focus students are still thumbs-down on one or more skills, consider a 2-minute check-in with them before the lesson tomorrow to build confidence. Do NOT reteach — just reassure.`;

// ── Build ────────────────────────────────────────────────────────────────────

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const pres = new pptxgen();
  pres.defineLayout({ name: "CUSTOM", width: 10, height: 5.625 });
  pres.layout = "CUSTOM";

  // ── SLIDE 1: Title ──
  titleSlide(pres, "Test Ready",
    "Dress rehearsal \u2014 post-test format practice",
    "10-minute warm-up  |  Place Value to 10,000  |  Week 7",
    NOTES_TITLE);

  // ── SLIDES 2–3: Quick We Do (with reveal) ──
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Quick Order \u2014 Smallest to Largest", { fontSize: 22, color: STAGE_COLORS["3"] });
      s.addText("Turn and talk. 20 seconds. Go.", {
        x: 0.5, y: CONTENT_TOP, w: 9, h: 0.3,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      addNumberCards(s, ["2,739", "2,793", "2,397", "2,973"], 2.0);
      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO);
      return s;
    },
    (s) => {
      addAnswerBar(s, "2,397  \u2192  2,739  \u2192  2,793  \u2192  2,973", 3.4);
      addExplanation(s, "Hundreds: 3, 7, 7, 9. The two 7-hundreds \u2014 tens broke it (3 < 9).", 4.05);
    }
  );

  // ── SLIDES 4–5: You Do — 3 Questions, Post-Test Format (with reveal) ──
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["4"]);
      addStageBadge(s, 4, "You Do");
      addTitle(s, "Post-Test Practice \u2014 3 Questions", { fontSize: 20, color: STAGE_COLORS["4"] });

      // Q1 — ordering
      addCard(s, 0.5, CONTENT_TOP, 4.2, 1.15, { strip: STAGE_COLORS["4"] });
      s.addText("Q1: Order smallest to largest", {
        x: 0.68, y: CONTENT_TOP + 0.05, w: 3.8, h: 0.2,
        fontSize: 10, fontFace: FONT_B, color: STAGE_COLORS["4"], bold: true, margin: 0,
      });
      s.addText("5,062    5,620\n5,206    5,026", {
        x: 0.68, y: CONTENT_TOP + 0.28, w: 3.8, h: 0.75,
        fontSize: 18, fontFace: FONT_H, color: C.CHARCOAL, align: "center", valign: "middle", margin: 0,
      });

      // Q2 — 100 after
      addCard(s, 5.1, CONTENT_TOP, 4.4, 1.15, { strip: STAGE_COLORS["4"] });
      s.addText("Q2: What comes 100 after 3,950?", {
        x: 5.28, y: CONTENT_TOP + 0.05, w: 4.0, h: 0.2,
        fontSize: 10, fontFace: FONT_B, color: STAGE_COLORS["4"], bold: true, margin: 0,
      });
      addTextOnShape(s, "3,950  \u2192  ?", {
        x: 5.6, y: CONTENT_TOP + 0.4, w: 3.5, h: 0.5, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Q3 — fill gaps
      addCard(s, 0.5, 2.85, 9, 1.55, { strip: STAGE_COLORS["4"] });
      s.addText("Q3: Fill the gaps (+100 each time)", {
        x: 0.68, y: 2.92, w: 8.5, h: 0.2,
        fontSize: 10, fontFace: FONT_B, color: STAGE_COLORS["4"], bold: true, margin: 0,
      });
      addSequenceRow(s, ["?", "6,930", "?", "?", "7,230"], 3.35, { boxH: 0.48, fontSize: 14 });

      s.addText("Write all 3 answers on your whiteboard. Boards up when I say.", {
        x: 0.5, y: 4.65, w: 9, h: 0.25,
        fontSize: 12, fontFace: FONT_B, color: C.ALERT, bold: true, italic: true, margin: 0,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_YOUDO);
      return s;
    },
    (s) => {
      // Q1 answer
      addTextOnShape(s, "Q1: 5,026 \u2192 5,062 \u2192 5,206 \u2192 5,620", {
        x: 0.5, y: CONTENT_TOP + 1.2, w: 4.2, h: 0.32, rectRadius: 0.06,
        fill: { color: C.SUCCESS },
      }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });

      // Q2 answer
      addTextOnShape(s, "Q2: 4,050", {
        x: 5.1, y: CONTENT_TOP + 1.2, w: 4.4, h: 0.32, rectRadius: 0.06,
        fill: { color: C.SUCCESS },
      }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });

      // Q3 answer
      addSequenceRow(s, ["6,830", "6,930", "7,030", "7,130", "7,230"], 3.35, { boxH: 0.48, fontSize: 13 });
    }
  );

  // ── SLIDE 6: Confidence Check ──
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, C.ACCENT);
    addBadge(s, "Confidence Check", { color: C.ACCENT, w: 2.2 });
    addTitle(s, "How Ready Are You?", { fontSize: 24, color: C.ACCENT });

    const skills = [
      "Ordering four 4-digit numbers from smallest to largest",
      "Finding the number 100 after \u2014 including boundary crossings",
      "Filling gaps in a skip-counting-by-100 sequence",
    ];

    skills.forEach((skill, i) => {
      const sy = CONTENT_TOP + 0.1 + i * 1.0;
      addCard(s, 0.5, sy, 9, 0.8, { strip: C.ACCENT });

      // Skill number badge
      addTextOnShape(s, String(i + 1), {
        x: 0.7, y: sy + 0.15, w: 0.45, h: 0.45, rectRadius: 0.22,
        fill: { color: C.ACCENT },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });

      s.addText(skill, {
        x: 1.35, y: sy + 0.15, w: 7.6, h: 0.45,
        fontSize: 15, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
      });
    });

    s.addText("\uD83D\uDC4D Confident     \uD83D\uDC4A Nearly there     \uD83D\uDC4E Need help", {
      x: 0.5, y: 4.5, w: 9, h: 0.35,
      fontSize: 14, fontFace: FONT_B, color: C.MUTED, align: "center", margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_EXIT);
  }

  await pres.writeFile({ fileName: `${OUT_DIR}/PV_Warmup_Day9.pptx` });
  console.log("Done: " + OUT_DIR);
}

build().catch(err => { console.error(err); process.exit(1); });
