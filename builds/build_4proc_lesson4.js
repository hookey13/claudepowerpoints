// Lesson 4 of 4: Putting It All Together — Worded Problems
// Year 5/6 Numeracy — Four Processes Review Week
// Focus: Applying all four vertical methods to worded/contextual problems
// Week 1, Session 4

"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const { createTheme } = require("../themes/factory");
const { UNIT, LESSONS } = require("./configs/four_processes");
const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addBodyText, addProblem, addTipBox, addPdfFooter,
  addWriteLine, addStepInstructions, addLinedArea,
  addTwoColumnOrganiser, addResourceSlide,
} = require("../themes/pdf_helpers");

// ── Theme ─────────────────────────────────────────────────────────────────────
const LESSON = LESSONS[4];
const RESOURCES = LESSON.resources;
const T = createTheme(UNIT.subject, UNIT.yearLevel, UNIT.variant);
const {
  C, FONT_H, FONT_B,
  titleSlide, liSlide, contentSlide, cfuSlide, closingSlide,
  workedExSlide, exitTicketSlide, addStageBadge,
  withReveal,
  addTopBar, addBadge, addTitle, addCard, addFooter, addTextOnShape,
  iconToBase64Png, getContrastColor,
  SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;

const OUT_DIR = LESSON.outDir;
const FOOTER = LESSON.footer;

// ── Teacher Notes ─────────────────────────────────────────────────────────────

const NOTES_TITLE = `SAY:
- "Welcome to our final session in the Four Processes review week. Today we're putting it ALL together."
- "You've reviewed addition, subtraction, multiplication, and division. Now you need to choose the right method when given a real-world problem."

DO:
- Display the title slide. Ensure whiteboards and markers are ready.
- "This is Session 4 of 4 — the one where everything connects."

TEACHER NOTES:
This lesson is the culmination of the 4-session review week. Students must read worded problems, identify the operation, choose the correct algorithm, and solve. The key challenge is not the computation — it is identifying WHICH operation to use. This is higher-order thinking that draws on all previous sessions.

WATCH FOR:
- Students who seem confident from the week — channel this into careful reading of problems.
- Readiness signal: students settling quickly.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR1 = `SAY:
- "Let's warm up. Today's review is about finding unknowns using inverse operations."
- "Q1: What number times 8 equals 96?"
- "Q2: 132 divided by what equals 11?"
- "Q3: Find as many factor pairs of 144 as you can."

DO:
- Display the slide. Allow 60 seconds.
- Check Q1: "96 / 8 = 12."
- Check Q2: "132 / 11 = 12."
- Check Q3: "1x144, 2x72, 3x48, 4x36, 6x24, 8x18, 9x16, 12x12 — that's 8 pairs."

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
- "Show me Q1. Ready... boards up!"
- Scan for 12 on 80%+ of boards.
PROCEED: If 80%+ correct, move to Fluency.
PIVOT: Model inverse: "If ___ x 8 = 96, think: 96 / 8 = ?"

TEACHER NOTES:
DR target: "I can find the value of unknown numbers in numerical equations using multiplication and division." Inverse operations are the key strategy. Q3 extends to systematic factor pair finding — 144 is a square number (12x12) with 8 factor pairs.

WATCH FOR:
- Students who guess rather than using inverse operations.
- Students who find only 1-2 factor pairs — prompt systematic approach.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `SAY:
- "Fluency sprint! Mixed operations — 60 seconds."
- "You need to identify the operation AND solve. Speed and accuracy."
- "Ready? GO."

DO:
- Display the slide. Students work silently for 60 seconds.
- Read answers quickly. Students self-mark.

TEACHER NOTES:
This fluency targets all four operations to prepare for the mixed worded problems. The sprint format builds automaticity. Problems are deliberately mixed so students practice operation identification — the key skill for today.

WATCH FOR:
- Students who skip division problems — note for support during You Do.
- Readiness signal: 10+ correct in 60 seconds.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `SAY:
- Read the LI from the slide.
- "SC1 is the reading skill — figuring out WHAT to do. SC2 is the doing. SC3 is the checking."
- "Today, the hardest part isn't the maths — it's reading the problem carefully."

DO:
- Display the slide. Point to each SC.
- Leave visible for 20 seconds.

TEACHER NOTES:
SC1 (identify operation) is the strategic skill — this is where most errors occur. Students default to addition or multiplication without reading carefully. SC2 (correct algorithm) draws on Sessions 1-3. SC3 (check in context) requires metacognitive monitoring.

WATCH FOR:
- Students who nod confidently — they may underestimate the reading challenge.
- Readiness signal: students reading the SC carefully.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_IDO1 = `SAY:
- "Watch me solve this word problem. I'm going to think aloud so you can hear my process."
- "Step 1: READ. A school has 1,247 fiction books and 896 non-fiction books. How many books altogether?"
- "Step 2: IDENTIFY. Altogether means combining — that's ADDITION."
- "Step 3: SOLVE. I set up 1,247 + 896 vertically."
- Walk through: "7+6=13 (3, carry 1), 4+9+1=14 (4, carry 1), 2+8+1=11 (1, carry 1), 1+0+1=2. Answer: 2,143."
- "Step 4: CHECK. Does 2,143 books make sense? 1,200 + 900 = 2,100. Close. Yes."
- "My answer: The school has 2,143 books altogether."

DO:
- Display the slide. Model the 4-step process explicitly.
- Write on the board alongside the slide.
- Emphasise the IDENTIFY step — circle the key word "altogether."

TEACHER NOTES:
This I Do models the 4-step problem-solving process: Read, Identify, Solve, Check. The addition problem is straightforward — the goal is to model the PROCESS, not challenge the computation. Key words: altogether, total, combined, sum -> addition.

WATCH FOR:
- Students who want to jump to solving without reading — the 4-step process prevents this.
- Readiness signal: students following along and anticipating the operation.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_IDO2 = `SAY:
- "Now a trickier one. Watch my process again."
- "READ: A farmer packs 7,200 eggs into boxes of 8. How many boxes does she need?"
- "IDENTIFY: Packing INTO equal groups — that's DIVISION. 7,200 divided by 8."
- "SOLVE: Bus stop method. 8 into 7 = 0 r7. 8 into 72 = 9. 8 into 0 = 0. 8 into 0 = 0. Answer: 900."
- "CHECK: 900 x 8 = 7,200. Correct. She needs 900 boxes."

DO:
- Display the slide. Walk through methodically.
- Emphasise: "I used the INVERSE operation to check — 900 x 8 = 7,200."

TEACHER NOTES:
This problem uses division with a clean answer (no remainder). The "into equal groups" phrasing is a classic division signal. The check using inverse operations (multiplying back) is a key metacognitive strategy. The number 7,200 / 8 = 900 is chosen to be clean but requires the bus stop method for the leading zero handling.

WATCH FOR:
- Students who identify this as multiplication — clarify: "We KNOW the total and the group size. We need the NUMBER of groups."

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU = `SAY:
- "Quick check. I'm going to show you 4 word problems. For each one, hold up the operation symbol on your whiteboard."
- "+ for addition, - for subtraction, x for multiplication, / for division."
- "Don't solve — just identify the operation. 10 seconds per problem."

DO:
- Display the 4 problems. Read each aloud.
- "Problem 1: boards up!" Scan. Move to next.
- Click to reveal the correct operations.

CFU CHECKPOINT:
Technique: Show Me Boards (operation symbols)
Script:
- Scan for correct operation on 80%+ of boards for each problem.
PROCEED: If 80%+ correct on all 4, move to We Do.
PIVOT: If students confuse operations, reteach key words:
- "How many MORE/LEFT" -> subtraction
- "How many altogether/total" -> addition
- "How many in each group / how many groups" -> division
- "How many if each person gets X" -> multiplication

TEACHER NOTES:
This CFU isolates the identification skill from the computation. Students hold up +, -, x, or / on whiteboards. The 4 problems target one of each operation. Common confusion: "how many more" being treated as addition instead of subtraction.

WATCH FOR:
- Students who default to addition for everything — they're not reading carefully.
- Students who consistently identify correctly — they're ready for We Do.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO = `SAY:
- "Your turn with a partner. Read the problem carefully."
- "A shop orders 48 boxes of pens with 36 pens in each box. How many pens is that altogether?"
- "Step 1: What operation? Step 2: Set it up. Step 3: Solve. Step 4: Check."
- "90 seconds. Boards up!"

DO:
- Display the problem. Students work in pairs.
- Circulate — listen for correct operation identification.
- "Boards up!" Scan for 1,728.
- Click to reveal the solution.

TEACHER NOTES:
48 x 36 = 1,728. This is multiplication — "boxes OF pens" and "how many altogether" (total from equal groups). Students can use either vertical multiplication or lattice method. The answer 1,728 is close to 50 x 36 = 1,800. Either multiplication method is acceptable.

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Provide the operation identification: "This is multiplication: 48 x 36." Students focus on the computation only.

EXTENDING PROMPT:
- Task: "If the shop returns 15 boxes because they're damaged, how many pens does the shop keep?" (Two-step problem.)

WATCH FOR:
- Students who identify as addition (48 + 36 = 84) — they're combining numbers without reading.
- Students who set up 36 x 48 instead of 48 x 36 — both are correct (commutative).

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_YOUDO = `SAY:
- "Independent practice time. Your worksheet has 8 worded problems."
- "For EVERY problem: underline the key words, write the operation, solve, and check."
- "You have 12 minutes. Go."

DO:
- Distribute Session 4 Worksheet (one per student).
- Set a visible timer for 12 minutes.
- Circulate — check operation identification FIRST, then computation.

TEACHER NOTES:
The worksheet has 8 worded problems: 2 addition, 2 subtraction, 2 multiplication, 2 division. Problems are NOT grouped by operation — students must identify each one independently. Answers:
(1) 4,567 + 2,845 = 7,412
(2) 8,003 - 4,567 = 3,436
(3) 356 x 24 = 8,544
(4) 1,344 / 8 = 168
(5) 23,456 + 18,967 = 42,423
(6) 50,000 - 27,648 = 22,352
(7) 475 x 36 = 17,100
(8) 2,736 / 9 = 304

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Provide a "key words" reference card: altogether/total/combined -> addition, difference/how many more/left -> subtraction, each/per/times -> multiplication, share/divide/split -> division.

EXTENDING PROMPT:
- Task: After completing all 8 problems, attempt the Session 4 Extension — multi-step problems requiring 2-3 operations.

WATCH FOR:
- Students who solve correctly but chose the wrong operation — their answer is wrong even if the computation is right.
- Students who finish quickly — check their operation identification before giving extension.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `SAY:
- "Pens down. Exit ticket — three questions. Work silently. 4 minutes."

DO:
- Display the exit ticket. Students write in maths books.
- Set timer for 4 minutes. Circulate silently.

TEACHER NOTES:
Q1: "A cinema has 1,856 seats. 1,289 are occupied. How many are empty?" -> subtraction, 1,856 - 1,289 = 567.
Q2: "A baker makes 324 loaves per day for 28 days. How many loaves?" -> multiplication, 324 x 28 = 9,072.
Q3: "Name the 4 operations reviewed this week. For each, give one key word that tells you to use it." -> addition (altogether), subtraction (difference), multiplication (each/per), division (share/split).

Sort responses:
(1) Wrong operation on Q1 or Q2 — need more practice identifying operations from context.
(2) Right operation but wrong computation — the algorithm needs review.
(3) All correct — strong finish to the review week.

[Maths: Summarise — Exit Ticket | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `SAY:
- "Here are the printable resources. Click any link to open the PDF."

DO:
- Display briefly. Teacher-facing slide.

TEACHER NOTES:
All PDFs are in the resources-session4 folder. Print the worksheet before the lesson (one per student). Answer key is teacher reference. Extension is for extending students only.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `SAY:
- Read each SC aloud. "Thumbs up, sideways, or down."
- "This was the final session of our review week. You've reviewed addition, subtraction, multiplication, division, and the lattice method."
- "Turn to your partner: Which of the four processes do you feel MOST confident with? Which needs more practice? 30 seconds."
- "Well done this week."

DO:
- Display the closing slide. Run thumbs for each SC.
- Allow 30 seconds for partner discussion. Listen to 2-3 pairs.
- Affirm honest self-reflection.

TEACHER NOTES:
The closing reflects on the entire review week. Students who feel least confident with division is typical. The self-assessment data helps plan future intervention.

WATCH FOR:
- Students who show thumbs-down on SC1 — operation identification is the key transferable skill.

[Maths: Summarise — Closing | VTLM 2.0: Monitor Progress & Feedback]`;

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "Putting It All Together — Session 4";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres, "Putting It All Together\nWorded Problems", "Four Processes Review — Session 4",
    "Session 4 of 4 | Year 5/6 Maths", NOTES_TITLE);

  // ── SLIDE 2: Daily Review — Finding Unknowns (Stage 1) ─────────────────
  contentSlide(pres, "Daily Review", C.ACCENT, "Finding Unknowns Using Inverse Operations", [
    "Q1:  ___ x 8 = 96",
    "Q2:  132 / ___ = 11",
    "Q3:  ___ x ___ = 144   (Find as many factor pairs as you can!)",
  ], NOTES_DR1, FOOTER, (s) => {
    addCard(s, 0.5, CONTENT_TOP + 1.55, 5.0, 0.5, { strip: C.ACCENT });
    s.addText("I can find the value of unknown numbers in equations using multiplication and division", {
      x: 0.7, y: CONTENT_TOP + 1.6, w: 4.6, h: 0.4,
      fontSize: 9, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0, valign: "middle",
    });

    addCard(s, 5.8, CONTENT_TOP + 0.05, 3.8, 2.6, { strip: C.SECONDARY });
    s.addText("Strategy Reminder", {
      x: 6.0, y: CONTENT_TOP + 0.12, w: 3.4, h: 0.25,
      fontSize: 11, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });
    s.addText([
      { text: "Use inverse operations:", options: { bold: true, breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "If ___ x 8 = 96", options: { breakLine: true, fontSize: 10, color: C.MUTED } },
      { text: "Then 96 / 8 = ___", options: { breakLine: true, fontSize: 10, color: C.PRIMARY, bold: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "Factor pairs of 144:", options: { bold: true, breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Try dividing by 1, 2, 3, 4...", options: { fontSize: 10, color: C.MUTED } },
    ], {
      x: 6.0, y: CONTENT_TOP + 0.45, w: 3.4, h: 2.0,
      fontFace: FONT_B, margin: 0, valign: "top",
    });
  });

  // ── SLIDE 3: Fluency Sprint (Stage 1) ──────────────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Mixed Operations Sprint — 60 Seconds", { color: C.ACCENT });

    const problems = [
      "37 + 48 =",    "9 x 7 =",     "84 - 39 =",    "72 / 8 =",
      "8 x 12 =",     "156 - 78 =",   "63 / 9 =",     "245 + 367 =",
      "56 / 7 =",     "43 + 89 =",    "7 x 11 =",     "132 - 57 =",
      "6 x 8 =",      "96 / 12 =",    "204 + 198 =",  "11 x 9 =",
    ];
    const gridCols = 4, gridRows = 4;
    const cellW = 2.0, cellH = 0.62;
    const gridX = 0.7, gridY = CONTENT_TOP + 0.05;

    const opColors = [C.PRIMARY, C.ALERT, C.SECONDARY, C.ACCENT];
    const opIndices = [0, 1, 2, 3, 1, 2, 3, 0, 3, 0, 1, 2, 1, 3, 0, 1];

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const idx = r * gridCols + c;
        const px = gridX + c * (cellW + 0.18);
        const py = gridY + r * (cellH + 0.12);
        addCard(s, px, py, cellW, cellH, { strip: opColors[opIndices[idx]] });
        s.addText((idx + 1) + ".  " + problems[idx], {
          x: px + 0.12, y: py, w: cellW - 0.2, h: cellH,
          fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
          valign: "middle", margin: 0, bold: true,
        });
      }
    }

    addTextOnShape(s, "60 seconds — GO!", {
      x: 3.5, y: SAFE_BOTTOM - 0.5, w: 3, h: 0.42, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_FLUENCY);
  })();

  // ── SLIDE 4: LI / SC ──────────────────────────────────────────────────
  liSlide(pres,
    ["We are learning to apply the four processes to solve worded problems so we can choose the correct method for real-world calculations."],
    [
      "I can identify which operation a word problem requires.",
      "I can set up and solve the problem using the correct vertical method.",
      "I can check my answer makes sense in the context of the problem.",
    ],
    NOTES_LISC, FOOTER);

  // ── SLIDE 5: I Do — Worked Example 1: Addition Word Problem ───────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example: Reading the Problem", { fontSize: 21, color: C.PRIMARY });

    // Problem card
    addCard(s, 0.5, CONTENT_TOP + 0.0, 9, 0.8, { strip: C.PRIMARY });
    s.addText("A school library has 1,247 fiction books and 896 non-fiction books. How many books does the library have altogether?", {
      x: 0.75, y: CONTENT_TOP + 0.08, w: 8.5, h: 0.65,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
    });

    // 4-step process
    addCard(s, 0.5, CONTENT_TOP + 1.0, 5.0, 2.8, { strip: C.SECONDARY });
    const steps = [
      { label: "1. READ:", text: "1,247 fiction + 896 non-fiction. How many altogether?" },
      { label: "2. IDENTIFY:", text: "'Altogether' -> ADDITION" },
      { label: "3. SOLVE:", text: "1,247 + 896 = 2,143" },
      { label: "4. CHECK:", text: "1,200 + 900 = 2,100. Close to 2,143. Makes sense." },
    ];
    steps.forEach((st, i) => {
      const stepColor = [C.PRIMARY, C.ALERT, C.SECONDARY, C.SUCCESS][i];
      s.addText([
        { text: st.label + " ", options: { bold: true, fontSize: 12, color: stepColor } },
        { text: st.text, options: { fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.15 + i * 0.55, w: 4.5, h: 0.48,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Answer card on right
    addCard(s, 5.8, CONTENT_TOP + 1.0, 3.7, 2.8, { strip: C.SUCCESS });
    s.addText("Key Words -> Operations", {
      x: 6.0, y: CONTENT_TOP + 1.08, w: 3.3, h: 0.25,
      fontSize: 11, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
    });
    const keyWords = [
      { word: "altogether, total, combined, sum", op: "Addition (+)", color: C.PRIMARY },
      { word: "difference, how many more, left", op: "Subtraction (-)", color: C.SECONDARY },
      { word: "each, per, times, groups of", op: "Multiplication (x)", color: C.ACCENT },
      { word: "share, divide, split, per group", op: "Division (/)", color: C.ALERT },
    ];
    keyWords.forEach((kw, i) => {
      s.addText([
        { text: kw.op, options: { bold: true, breakLine: true, fontSize: 10, color: kw.color } },
        { text: kw.word, options: { fontSize: 9, color: C.MUTED, italic: true } },
      ], {
        x: 6.0, y: CONTENT_TOP + 1.42 + i * 0.55, w: 3.3, h: 0.5,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    addTextOnShape(s, "Answer: The library has 2,143 books altogether.", {
      x: 0.5, y: SAFE_BOTTOM - 0.55, w: 9, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, { fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_IDO1);
  })();

  // ── SLIDE 6: I Do — Worked Example 2: Division Word Problem ───────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example: Division in Context", { fontSize: 21, color: C.PRIMARY });

    addCard(s, 0.5, CONTENT_TOP + 0.0, 9, 0.8, { strip: C.ALERT });
    s.addText("A farmer packs 7,200 eggs into boxes of 8. How many boxes does she need?", {
      x: 0.75, y: CONTENT_TOP + 0.08, w: 8.5, h: 0.65,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
    });

    addCard(s, 0.5, CONTENT_TOP + 1.0, 5.0, 2.8, { strip: C.ALERT });
    const steps = [
      { label: "1. READ:", text: "7,200 eggs, boxes of 8. How many boxes?" },
      { label: "2. IDENTIFY:", text: "'Into boxes of 8' -> DIVISION. 7,200 / 8" },
      { label: "3. SOLVE:", text: "Bus stop: 7,200 / 8 = 900" },
      { label: "4. CHECK:", text: "900 x 8 = 7,200. Correct!" },
    ];
    steps.forEach((st, i) => {
      const stepColor = [C.PRIMARY, C.ALERT, C.SECONDARY, C.SUCCESS][i];
      s.addText([
        { text: st.label + " ", options: { bold: true, fontSize: 12, color: stepColor } },
        { text: st.text, options: { fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.15 + i * 0.55, w: 4.5, h: 0.48,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    addCard(s, 5.8, CONTENT_TOP + 1.0, 3.7, 2.8, { strip: C.SECONDARY });
    s.addText("Common Confusion", {
      x: 6.0, y: CONTENT_TOP + 1.08, w: 3.3, h: 0.25,
      fontSize: 11, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });
    s.addText([
      { text: "Is this multiplication or division?", options: { bold: true, breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "", options: { breakLine: true, fontSize: 4 } },
      { text: "We KNOW the total (7,200) and the group size (8).", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "We need the NUMBER of groups.", options: { breakLine: true, fontSize: 10, color: C.PRIMARY, bold: true } },
      { text: "Total / group size = number of groups", options: { breakLine: true, fontSize: 10, color: C.PRIMARY, bold: true } },
      { text: "-> DIVISION", options: { breakLine: true, fontSize: 12, color: C.ALERT, bold: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "If we knew groups x size, that would be multiplication.", options: { fontSize: 9, color: C.MUTED, italic: true } },
    ], {
      x: 6.0, y: CONTENT_TOP + 1.42, w: 3.3, h: 2.2,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    addTextOnShape(s, "Answer: The farmer needs 900 boxes.", {
      x: 0.5, y: SAFE_BOTTOM - 0.55, w: 9, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, { fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_IDO2);
  })();

  // ── SLIDES 7-8: CFU — Which Operation? (withReveal) ────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "CFU", { color: C.ALERT, w: 1.5 });
      addTitle(s, "Which Operation? Show me +  -  x  /", { color: C.ALERT, fontSize: 19 });

      const cfuProblems = [
        { num: "A", text: "A shop sold 3,456 items in March and 2,891 in April. How many more did they sell in March?", color: C.PRIMARY },
        { num: "B", text: "Each student gets 12 pencils. There are 45 students. How many pencils are needed?", color: C.SECONDARY },
        { num: "C", text: "A truck carries 2,568 kg. It drops off 1,245 kg. How much is left?", color: C.ACCENT },
        { num: "D", text: "756 stickers are shared equally among 6 children. How many does each child get?", color: C.ALERT },
      ];

      cfuProblems.forEach((p, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const ox = 0.5 + col * 4.7;
        const oy = CONTENT_TOP + 0.05 + row * 1.7;
        addCard(s, ox, oy, 4.4, 1.5, { strip: p.color });
        addTextOnShape(s, p.num, {
          x: ox + 0.1, y: oy + 0.1, w: 0.35, h: 0.35, rectRadius: 0.17,
          fill: { color: p.color },
        }, { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });
        s.addText(p.text, {
          x: ox + 0.55, y: oy + 0.1, w: 3.7, h: 1.3,
          fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
        });
      });

      addTextOnShape(s, "Write +  -  x  or /  on your whiteboard. 10 seconds each.", {
        x: 1.5, y: SAFE_BOTTOM - 0.55, w: 7, h: 0.42, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_CFU);
      return s;
    },
    (slide) => {
      addTextOnShape(slide, "A: Subtraction (-)  |  B: Multiplication (x)  |  C: Subtraction (-)  |  D: Division (/)", {
        x: 0.5, y: SAFE_BOTTOM - 0.55, w: 9, h: 0.42, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDES 9-10: We Do — Solve a Worded Problem (withReveal) ──────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Solve with Your Partner", { fontSize: 22, color: C.SECONDARY });

      addCard(s, 0.5, CONTENT_TOP + 0.0, 9, 0.9, { strip: C.SECONDARY });
      s.addText("A shop orders 48 boxes of pens with 36 pens in each box. How many pens is that altogether?", {
        x: 0.75, y: CONTENT_TOP + 0.08, w: 8.5, h: 0.75,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
      });

      addCard(s, 0.5, CONTENT_TOP + 1.1, 4.5, 2.5, { strip: C.SECONDARY });
      s.addText([
        { text: "With your partner:", options: { bold: true, breakLine: true, fontSize: 14, color: C.SECONDARY } },
        { text: "1. What operation is this?", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "2. Set up the calculation.", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "3. Solve it. Show working.", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "4. Check — does the answer make sense?", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "90 seconds — boards up!", options: { fontSize: 13, color: C.ALERT, bold: true } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.25, w: 4.0, h: 2.2,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addTextOnShape(s, "48 boxes x 36 pens = ?", {
        x: 5.8, y: CONTENT_TOP + 1.5, w: 3.5, h: 1.8, rectRadius: 0.12,
        fill: { color: C.PRIMARY },
      }, { fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO);
      return s;
    },
    (slide) => {
      addCard(slide, 5.3, CONTENT_TOP + 1.1, 4.2, 2.5, { strip: C.SUCCESS });
      slide.addText("Solution", {
        x: 5.5, y: CONTENT_TOP + 1.18, w: 3.8, h: 0.25,
        fontSize: 12, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });
      slide.addText([
        { text: "Operation: Multiplication", options: { bold: true, breakLine: true, fontSize: 11, color: C.PRIMARY } },
        { text: "48 x 36 = 1,728", options: { breakLine: true, fontSize: 14, color: C.SUCCESS, bold: true } },
        { text: "", options: { breakLine: true, fontSize: 4 } },
        { text: "PP1: 48 x 6 = 288", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "PP2: 48 x 30 = 1,440", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "288 + 1,440 = 1,728", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 4 } },
        { text: "Check: 50 x 36 = 1,800. Close!", options: { fontSize: 10, color: C.ACCENT, bold: true } },
      ], {
        x: 5.5, y: CONTENT_TOP + 1.5, w: 3.8, h: 1.9,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addTextOnShape(slide, "The shop ordered 1,728 pens.", {
        x: 0.5, y: SAFE_BOTTOM - 0.55, w: 9, h: 0.42, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDE 11: You Do — Independent Practice (Stage 4) ──────────────────
  contentSlide(pres, "Stage 4 | You Do", C.ALERT, "Worded Problems: Choose the Operation", [], NOTES_YOUDO, FOOTER, (s) => {
    addCard(s, 0.5, CONTENT_TOP, 9, 1.0, { strip: C.ALERT });
    s.addText([
      { text: "For every problem: ", options: { bold: true, fontSize: 12, color: C.ALERT } },
      { text: "1. Underline key words  2. Write the operation  3. Solve  4. Check", options: { fontSize: 11, color: C.CHARCOAL } },
    ], {
      x: 0.75, y: CONTENT_TOP + 0.1, w: 8.5, h: 0.35,
      fontFace: FONT_B, margin: 0, valign: "middle",
    });
    s.addText([
      { text: "8 problems  |  12 minutes  |  ", options: { bold: true, fontSize: 11, color: C.ALERT } },
      { text: "Use your Session 4 Worksheet. Finished early? Collect the extension.", options: { fontSize: 10, color: C.CHARCOAL } },
    ], {
      x: 0.75, y: CONTENT_TOP + 0.5, w: 8.5, h: 0.35,
      fontFace: FONT_B, margin: 0, valign: "middle",
    });

    // Sample problems preview (4 of 8)
    const previewProbs = [
      { num: 1, text: "A school raised $4,567 from a bake sale and $2,845 from a fun run. What was the total?", op: "+", color: C.PRIMARY },
      { num: 2, text: "A stadium holds 8,003 people. Only 4,567 attended. How many empty seats?", op: "-", color: C.SECONDARY },
      { num: 3, text: "A factory produces 356 toys per hour for 24 hours. How many toys?", op: "x", color: C.ACCENT },
      { num: 4, text: "1,344 students are split into 8 equal groups. How many per group?", op: "/", color: C.ALERT },
    ];

    previewProbs.forEach((p, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const ox = 0.5 + col * 4.7;
      const oy = CONTENT_TOP + 1.15 + row * 1.2;
      addCard(s, ox, oy, 4.4, 1.0, { strip: p.color });
      addTextOnShape(s, p.op, {
        x: ox + 0.1, y: oy + 0.06, w: 0.3, h: 0.3, rectRadius: 0.15,
        fill: { color: p.color },
      }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText(p.num + ".  " + p.text, {
        x: ox + 0.5, y: oy + 0.06, w: 3.8, h: 0.85,
        fontSize: 9, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
      });
    });

    s.addText("+ 4 more problems on the worksheet", {
      x: 3.0, y: SAFE_BOTTOM - 0.75, w: 4, h: 0.3,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0, align: "center",
    });
  });

  // ── SLIDE 12: Exit Ticket (Stage 5) ─────────────────────────────────────
  exitTicketSlide(pres, [
    "Q1: A cinema has 1,856 seats. 1,289 are occupied. How many seats are empty?  (Show the operation and working.)",
    "Q2: A baker makes 324 loaves per day for 28 days. How many loaves total?  (Show the operation and working.)",
    "Q3: Name the 4 operations we reviewed this week. For each, write one key word that signals that operation.",
  ], NOTES_EXIT, FOOTER);

  // ── SLIDE 13: Resources ────────────────────────────────────────────────
  addResourceSlide(pres, [
    RESOURCES.worksheet,
    RESOURCES.answerKey,
    RESOURCES.extension,
  ], { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // ── SLIDE 14: Closing ──────────────────────────────────────────────────
  closingSlide(pres,
    "Which of the four processes do you feel MOST confident with? Which needs more practice? Turn to your partner — 30 seconds.",
    [
      "SC1: I can identify which operation a word problem requires.",
      "SC2: I can set up and solve the problem using the correct vertical method.",
      "SC3: I can check my answer makes sense in context.",
      "Well done this week! You've reviewed all four processes.",
    ],
    NOTES_CLOSING);

  // ── Write PPTX ────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: `${OUT_DIR}/${LESSON.pptxFileName}` });
  console.log("PPTX written to " + OUT_DIR);

  // ── Generate companion PDFs ────────────────────────────────────────────
  await generateWorksheet();
  await generateAnswerKey();
  await generateExtension();
  console.log("All PDFs generated.");
}

// ── PDF: Session 4 Worksheet ────────────────────────────────────────────────

async function generateWorksheet() {
  const doc = createPdf({ title: RESOURCES.worksheet.name });

  let y = addPdfHeader(doc, RESOURCES.worksheet.name, {
    subtitle: "Worded Problems - All Four Processes",
    color: C.PRIMARY,
    lessonInfo: FOOTER,
  });

  y = addTipBox(doc, "For every problem: 1. Underline key words. 2. Write the operation (+, -, x, or /). 3. Solve using the correct vertical method. 4. Check your answer makes sense.", y, { color: C.SECONDARY });

  y = addProblem(doc, 1, "A school raised $4,567 from a bake sale and $2,845 from a fun run. What was the total amount raised?", y, {
    writeLines: [{ label: "Operation:" }, { label: "Working:" }, { label: "" }, { label: "Answer:" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "A stadium holds 8,003 people. Only 4,567 attended the match. How many seats were empty?", y, {
    writeLines: [{ label: "Operation:" }, { label: "Working:" }, { label: "" }, { label: "Answer:" }],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 3, "A factory produces 356 toys per hour. The factory runs for 24 hours. How many toys are produced?", y, {
    writeLines: [{ label: "Operation:" }, { label: "Working:" }, { label: "" }, { label: "Answer:" }],
    color: C.ACCENT,
  });

  y = addProblem(doc, 4, "1,344 students are split into 8 equal groups for sports day. How many students are in each group?", y, {
    writeLines: [{ label: "Operation:" }, { label: "Working:" }, { label: "" }, { label: "Answer:" }],
    color: C.ALERT,
  });

  y = addProblem(doc, 5, "A charity collected 23,456 cans in January and 18,967 cans in February. How many cans did they collect in total?", y, {
    writeLines: [{ label: "Operation:" }, { label: "Working:" }, { label: "" }, { label: "Answer:" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 6, "A warehouse had 50,000 items in stock. After filling orders, 27,648 items were shipped. How many items remain?", y, {
    writeLines: [{ label: "Operation:" }, { label: "Working:" }, { label: "" }, { label: "Answer:" }],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 7, "A farmer plants 475 trees in each of 36 rows. How many trees does she plant altogether?", y, {
    writeLines: [{ label: "Operation:" }, { label: "Working:" }, { label: "" }, { label: "Answer:" }],
    color: C.ACCENT,
  });

  y = addProblem(doc, 8, "2,736 chocolates are packed equally into 9 boxes. How many chocolates are in each box?", y, {
    writeLines: [{ label: "Operation:" }, { label: "Working:" }, { label: "" }, { label: "Answer:" }],
    color: C.ALERT,
  });

  addPdfFooter(doc, FOOTER);
  await writePdf(doc, `${OUT_DIR}/${RESOURCES.worksheet.fileName}`);
  console.log(`  ${RESOURCES.worksheet.name} written.`);
}

// ── PDF: Session 4 Answer Key ───────────────────────────────────────────────

async function generateAnswerKey() {
  const doc = createPdf({ title: RESOURCES.answerKey.name });

  let y = addPdfHeader(doc, RESOURCES.answerKey.name, {
    subtitle: "Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: FOOTER,
    showNameDate: false,
  });

  y = addSectionHeading(doc, "Worksheet Answers", y, { color: C.PRIMARY });

  y = addProblem(doc, 1, "$4,567 + $2,845", y, {
    writeLines: [
      { label: "Operation:", answer: "Addition" },
      { label: "Answer:", answer: "$7,412" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "8,003 - 4,567", y, {
    writeLines: [
      { label: "Operation:", answer: "Subtraction" },
      { label: "Answer:", answer: "3,436 empty seats" },
    ],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 3, "356 x 24", y, {
    writeLines: [
      { label: "Operation:", answer: "Multiplication" },
      { label: "Answer:", answer: "8,544 toys" },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 4, "1,344 / 8", y, {
    writeLines: [
      { label: "Operation:", answer: "Division" },
      { label: "Answer:", answer: "168 students per group" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, 5, "23,456 + 18,967", y, {
    writeLines: [
      { label: "Operation:", answer: "Addition" },
      { label: "Answer:", answer: "42,423 cans" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 6, "50,000 - 27,648", y, {
    writeLines: [
      { label: "Operation:", answer: "Subtraction" },
      { label: "Answer:", answer: "22,352 items remaining" },
    ],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 7, "475 x 36", y, {
    writeLines: [
      { label: "Operation:", answer: "Multiplication" },
      { label: "Answer:", answer: "17,100 trees" },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 8, "2,736 / 9", y, {
    writeLines: [
      { label: "Operation:", answer: "Division" },
      { label: "Answer:", answer: "304 chocolates per box" },
    ],
    color: C.ALERT,
  });

  y = addSectionHeading(doc, "Exit Ticket Answers", y, { color: C.ALERT });

  y = addProblem(doc, "Q1", "1,856 - 1,289", y, {
    writeLines: [
      { label: "Operation:", answer: "Subtraction (seats - occupied = empty)" },
      { label: "Answer:", answer: "567 empty seats" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, "Q2", "324 x 28", y, {
    writeLines: [
      { label: "Operation:", answer: "Multiplication (loaves per day x days)" },
      { label: "Answer:", answer: "9,072 loaves" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, "Q3", "Key words for each operation", y, {
    writeLines: [
      { label: "Sample:", answer: "+ altogether/total, - difference/left, x each/per, / share/split" },
    ],
    color: C.ALERT,
  });

  addPdfFooter(doc, "Teacher Reference - Do Not Distribute to Students");
  await writePdf(doc, `${OUT_DIR}/${RESOURCES.answerKey.fileName}`);
  console.log(`  ${RESOURCES.answerKey.name} written.`);
}

// ── PDF: Session 4 Extension ────────────────────────────────────────────────

async function generateExtension() {
  const doc = createPdf({ title: RESOURCES.extension.name });

  let y = addPdfHeader(doc, RESOURCES.extension.name, {
    subtitle: "Extending Challenge",
    color: C.ACCENT,
    lessonInfo: FOOTER,
  });

  y = addTipBox(doc, "These problems require TWO or MORE operations. Read carefully. Plan your steps BEFORE you start calculating.", y, { color: C.ACCENT });

  y = addProblem(doc, 1, "A school orders 48 boxes of exercise books. Each box has 25 books. The school already has 387 exercise books. How many exercise books does the school have now?", y, {
    writeLines: [
      { label: "Step 1 - Operation and answer:" },
      { label: "Step 2 - Operation and answer:" },
      { label: "Final answer:" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "A baker makes 324 cupcakes. She sells 5 boxes of 48 cupcakes to a cafe. How many cupcakes does she have left?", y, {
    writeLines: [
      { label: "Step 1 - Operation and answer:" },
      { label: "Step 2 - Operation and answer:" },
      { label: "Final answer:" },
    ],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 3, "Three friends earn money doing chores. Alex earns $156, Sam earns $234, and Mia earns $198. They combine their money and share it equally. How much does each person get?", y, {
    writeLines: [
      { label: "Step 1 - Operation and answer:" },
      { label: "Step 2 - Operation and answer:" },
      { label: "Final answer:" },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 4, "A cinema has 12 screens. Each screen has 185 seats. On Saturday, 1,567 tickets were sold. How many seats were empty across the whole cinema?", y, {
    writeLines: [
      { label: "Step 1 - Operation and answer:" },
      { label: "Step 2 - Operation and answer:" },
      { label: "Final answer:" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, 5, "A farmer plants 36 rows of apple trees with 28 trees in each row. She also plants 24 rows of pear trees with 15 trees in each row. How many trees does she plant altogether?", y, {
    writeLines: [
      { label: "Step 1 - Operation and answer:" },
      { label: "Step 2 - Operation and answer:" },
      { label: "Step 3 - Operation and answer:" },
      { label: "Final answer:" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Answers (check AFTER attempting)", y, { color: C.ACCENT });
  y = addBodyText(doc, "1. 48 x 25 = 1,200 books ordered. 1,200 + 387 = 1,587 books total.", y);
  y = addBodyText(doc, "2. 5 x 48 = 240 sold. 324 - 240 = 84 cupcakes left.", y);
  y = addBodyText(doc, "3. 156 + 234 + 198 = $588 total. 588 / 3 = $196 each.", y);
  y = addBodyText(doc, "4. 12 x 185 = 2,220 total seats. 2,220 - 1,567 = 653 empty seats.", y);
  y = addBodyText(doc, "5. 36 x 28 = 1,008 apple. 24 x 15 = 360 pear. 1,008 + 360 = 1,368 trees.", y);

  addPdfFooter(doc, FOOTER);
  await writePdf(doc, `${OUT_DIR}/${RESOURCES.extension.fileName}`);
  console.log(`  ${RESOURCES.extension.name} written.`);
}

build().catch(console.error);
