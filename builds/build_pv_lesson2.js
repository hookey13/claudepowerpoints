// build_pv_lesson2.js
// Lesson 2 of 10: Whole Numbers Using Non-Proportional Materials
// Grade 3/4 Maths — Place Value & Additive Thinking

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const {
  C, FONT_H, FONT_B, SAFE_BOTTOM, CONTENT_TOP,
  addTopBar, addStageBadge, addTitle, addCard, addFooter, addPlaceValueChart,
  titleSlide, liSlide, contentSlide, workedExSlide, cfuSlide,
  exitTicketSlide, closingSlide,
} = require("../themes/pv_helpers");

if (!fs.existsSync("output")) fs.mkdirSync("output");

const FOOTER = "Lesson 2 of 10  |  Extend Place Value & Additive Thinking  |  Grade 3/4 Maths";

const STAGE_COLORS = {
  1: "C97D0A",
  2: "1B3A6B",
  3: "0F7F8C",
  4: "C94030",
  5: "5D3A8C",
};

// ---------------------------------------------------------------------------
// Abacus drawing helper
// placeLabels: e.g. ["TTh","Th","H","T","O"]
// circleCounts: e.g. [2, 5, 4, 1, 3]
// lineColor: hex string for circles
// ---------------------------------------------------------------------------
function drawAbacus(slide, x, y, placeLabels, circleCounts, lineColor) {
  const lineSpacing = 0.55;
  const circleSize = 0.18;
  const circleColor = lineColor || "1B3A6B";

  placeLabels.forEach((lbl, i) => {
    const lineX = x + i * lineSpacing;

    // Vertical line
    slide.addShape("line", {
      x: lineX,
      y: y,
      w: 0,
      h: 2.2,
      line: { color: "6B7280", width: 1.5 },
    });

    // Label below line
    slide.addText(lbl, {
      x: lineX - 0.25,
      y: y + 2.3,
      w: 0.5,
      h: 0.25,
      fontSize: 10,
      fontFace: FONT_B,
      color: C.CHARCOAL,
      align: "center",
      margin: 0,
    });

    // Circles stacked from the bottom of the line upward
    for (let c = 0; c < circleCounts[i]; c++) {
      const cy = y + 2.0 - c * 0.24;
      slide.addShape("roundRect", {
        x: lineX - circleSize / 2,
        y: cy - circleSize / 2,
        w: circleSize,
        h: circleSize,
        rectRadius: circleSize / 2,
        fill: { color: circleColor },
        line: { color: circleColor, width: 0 },
      });
    }
  });
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------
async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Grade 3/4 Maths";
  pres.title = "Lesson 2: Whole Numbers Using Non-Proportional Materials";

  // =========================================================================
  // SLIDE 1 — Title
  // =========================================================================
  const s1notes = `SAY:
• "Today we are going to explore a new way to represent numbers — using tools called non-proportional materials."
• "We already know how to use base-10 blocks, where a long is physically ten times bigger than a one cube. Today's tools look different — they don't show size differences — but they still help us think about place value."
• "By the end of today, you will be able to read and build numbers greater than ten thousand using a place value chart and an abacus."

DO:
• Display the title slide as students settle.
• Write the lesson number and date on the board.

TEACHER NOTES:
Non-proportional materials are tools where the physical size of the representation does NOT match the relative value — a bead or card representing ten-thousands looks the same as one representing ones. This is cognitively more demanding than proportional materials (base-10 blocks) and is an important conceptual step because it mirrors how we write numerals on paper. Students who have only used proportional materials sometimes struggle to grasp this; framing the lesson around "same vs. different" sets up the key comparison. Lesson 2 builds directly on Lesson 1's place value language and numeral writing, extending to five-digit numbers.

WATCH FOR:
• Students who look confused by "non-proportional" — reassure them the term will make sense by the end of Stage 2.
• Students still shaky on 4-digit vocabulary — Stage 1 warm-up will surface this quickly.

[Maths: Stage 2 — Number and Algebra | VTLM 2.0: Place Value — Extending]`;

  titleSlide(
    pres,
    "Lesson 2: Whole Numbers Using Non-Proportional Materials",
    "Using place value charts and an abacus to represent numbers greater than 10 000",
    "Grade 3/4  |  Mathematics  |  Place Value & Additive Thinking",
    s1notes
  );

  // =========================================================================
  // SLIDE 2 — LI & SC
  // =========================================================================
  const s2notes = `SAY:
• "Our Learning Intention today is: We will make and represent numbers using different materials."
• "By the end of the lesson you should be able to say — I can represent whole numbers using place value charts, AND I can represent whole numbers using an abacus."
• "Keep these in mind as we work through today's activities. If you feel unsure at any point, that's okay — that's exactly when to ask a question."

DO:
• Read the LI aloud; ask students to read the two Success Criteria chorally.
• Point to the SC and say "We'll come back to these at the end of the lesson to check in."

TEACHER NOTES:
Displaying explicit learning intentions and success criteria helps students self-monitor their understanding and gives them language to use when explaining their thinking. The two success criteria are intentionally parallel in structure ("I can represent...") to make them memorable. Students should be able to articulate both criteria in their own words by the lesson's closing activity. Return to this slide briefly during Stage 5 to allow self-assessment.

WATCH FOR:
• Students who read but don't engage with the SC — invite them to put it in their own words before moving on.
• Any misreading of "abacus" — pronounce it clearly and have students repeat it.

[Maths: Stage 2 — Number and Algebra | VTLM 2.0: Place Value — Representing]`;

  liSlide(
    pres,
    ["We will make and represent numbers using different materials."],
    [
      "I can represent whole numbers using place value charts.",
      "I can represent whole numbers using an abacus.",
    ],
    s2notes,
    FOOTER
  );

  // =========================================================================
  // SLIDE 3 — Stage 1: Prior Knowledge Warm-Up
  // =========================================================================
  const s3notes = `SAY:
• "Let's warm up what you already know. I'm going to write a number on the board, and you'll make it with your base-10 blocks and write it in words on your whiteboard."
• (Write 2412) "Ready? Make 2412 and write it in words."
• (After 60 seconds) "Hold up your boards. I'll come around to check."
• (Write 3043) "New number — 3043. Make it with blocks and write in words."
• "Now I'll say a number aloud — write it in digits AND make it with your blocks." (Say: three thousand, one hundred and twenty-three)
• "Next — I'll write the words. You write the digits." (Write: two thousand, one hundred and thirty-four; then one thousand, two hundred and four)

DO:
• Write 2412 on the board or projector.
• Circulate during making time — look for common errors (noted below).
• Cold-call non-volunteers: "How many thousands are in 2412?" / "How many hundreds?" / "Tens?" / "Ones?"
• After 3043: non-volunteer explains their blocks arrangement.
• Write words on board; students respond on Show Me Boards.

CFU CHECKPOINT:
Technique: Cold Call (non-volunteer)
Script:
• Call a non-volunteer: "Tell me — how many thousands are there in 2412?"
• Then: "How many hundreds?" / "Tens?" / "Ones?"
• After 3043: "Can you explain how you built that number with your blocks?"
• For the words-to-digits task: "Show me your boards on three — one, two, three!"
PROCEED: If ≥80% of students show correct digits on boards, move to Stage 2.
PIVOT: If students are confused by "two thousand, one hundred and thirty-four" vs "two thousand, one hundred and four" — slow down: write both side by side, ask "What is different about these two numbers? Look at the tens and ones." Circle the zero in 1204, say "When there are no tens, we write a zero as a placeholder." Re-check with a new words-to-digits example before proceeding.

TEACHER NOTES:
This warm-up serves a dual purpose: re-activating place value language from Lesson 1 and providing teacher assessment data about readiness for 5-digit numbers. The key concept being surfaced is that each digit's position determines its value — this is the conceptual bridge to non-proportional materials. The cold-call technique ensures all students are accountable, not just volunteers. Four-digit numbers are the anchor — if students are struggling here, scaffold Stage 2 carefully before introducing five-digit numbers.

MISCONCEPTIONS:
(Not a primary misconceptions slide — see Slide 4 for the main non-proportional misconception.)

WATCH FOR:
• Students writing "2 thousand 4 hundred and 12" as words — model conventional word form ("two thousand, four hundred and twelve").
• Students placing a long (ten) in the ones column when building 3043 — the zero means no tens; ask "Do you need any longs for the tens?"
• Students who write 3000430 or 30430 for "three thousand, four hundred and thirty" — check place value understanding before Stage 2.

[Maths: Stage 2 — Number and Algebra | VTLM 2.0: Place Value — 4-digit numbers]`;

  {
    const pres_slide = pres.addSlide();
    pres_slide.background = { color: C.CREAM };
    addTopBar(pres_slide, STAGE_COLORS[1]);
    addStageBadge(pres_slide, 1, "Activate Prior Knowledge");
    addTitle(pres_slide, "Making 4-Digit Numbers", {});
    addFooter(pres_slide, FOOTER);

    // Left card — tasks
    addCard(pres_slide, 0.35, 1.35, 4.8, 3.55, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    pres_slide.addText("Your Tasks", {
      x: 0.5, y: 1.45, w: 4.5, h: 0.35,
      fontSize: 13, fontFace: FONT_H, color: STAGE_COLORS[1],
      bold: true, margin: 0,
    });

    const tasks = [
      "1. Make 2412 with base-10 blocks. Write in words on your whiteboard.",
      "2. Make 3043 with base-10 blocks. Write in words.",
      "3. Listen: teacher says 3 123 aloud → write digits + make with blocks.",
      "4. Teacher writes words → you write digits + make with blocks:",
      "   • two thousand, one hundred and thirty-four",
      "   • one thousand, two hundred and four",
    ];

    tasks.forEach((t, i) => {
      pres_slide.addText(t, {
        x: 0.55, y: 1.88 + i * 0.48, w: 4.45, h: 0.42,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
        align: "left", margin: 0,
      });
    });

    // Right card — numbers to show
    addCard(pres_slide, 5.35, 1.35, 4.3, 1.6, {
      fill: STAGE_COLORS[1],
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.12 },
    });

    pres_slide.addText("Numbers on the board", {
      x: 5.5, y: 1.45, w: 4.0, h: 0.3,
      fontSize: 11, fontFace: FONT_B, color: C.CREAM,
      bold: true, margin: 0,
    });

    pres_slide.addText("2 412     3 043", {
      x: 5.5, y: 1.8, w: 4.0, h: 0.55,
      fontSize: 26, fontFace: FONT_H, color: C.WHITE,
      align: "center", bold: true, margin: 0,
    });

    // Show Me Boards reminder
    addCard(pres_slide, 5.35, 3.1, 4.3, 1.8, {
      fill: "FFF8E7",
      shadow: { type: "outer", blur: 4, offset: 1, color: "000000", opacity: 0.08 },
    });

    pres_slide.addText("Show Me Boards", {
      x: 5.5, y: 3.2, w: 4.0, h: 0.3,
      fontSize: 13, fontFace: FONT_H, color: STAGE_COLORS[1],
      bold: true, margin: 0,
    });

    pres_slide.addText(
      "Hold up your board when teacher says \u201CShow me!\u201D",
      {
        x: 5.5, y: 3.55, w: 3.9, h: 0.7,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
        align: "left", margin: 0,
      }
    );

    // CFU badge
    addCard(pres_slide, 5.35, 5.0, 4.3, 0.45, {
      fill: STAGE_COLORS[1],
    });
    pres_slide.addText("CFU: Cold Call — non-volunteer", {
      x: 5.5, y: 5.05, w: 4.0, h: 0.32,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE,
      bold: true, align: "center", margin: 0,
    });

    pres_slide.addNotes(s3notes);
  }

  // =========================================================================
  // SLIDE 4 — Stage 2: What is an abacus?
  // =========================================================================
  const s4notes = `SAY:
• "We've been using base-10 blocks. Today we're adding two new tools to our toolbox: the abacus and the place value chart with cards."
• "An abacus has vertical lines — or rods — and each line represents one place value position."
• "The line on the right is the ones place. The next one to the left is tens, then hundreds, then thousands, then ten-thousands."
• "Instead of different-sized blocks, we draw circles — or slide beads — on each line. The number of circles tells us the digit."
• (Point to abacus diagram) "Look at this abacus. Let's read it together: 2 circles on the ten-thousands line is 2 ten-thousands — that's 20 000. 5 circles on thousands — that's 5 000. 4 on hundreds — 400. 1 on tens — 10. 3 on ones — 3. The whole number is 25 413."
• "Here is the KEY idea: a circle on the ten-thousands line and a circle on the ones line look EXACTLY the same. But one represents 10 000 and one represents just 1. That is what makes this a NON-PROPORTIONAL tool."

DO:
• Reveal the abacus diagram on slide.
• Trace each vertical line with a pointer from left to right.
• Write 25 413 on the board as you build it from the abacus diagram.
• Emphasise the circled key point visually.

TEACHER NOTES:
The term "non-proportional" is central to this slide and to the conceptual leap of the lesson. In proportional materials (base-10 blocks), a flat is physically 10 times larger than a long, which is 10 times larger than a one cube. Students can see and feel the relative size. In non-proportional materials, all representations look the same — a circle is a circle regardless of the column. This mirrors written numerals, where a 5 in any column is the same symbol. Understanding this requires students to rely on positional knowledge rather than perceptual size cues, which is a more abstract and generalisable understanding. Return to this key idea throughout the lesson.

MISCONCEPTIONS:
• Misconception: "A circle on the hundreds line is worth more than one on the tens line, so it should look bigger."
  Why: Students have internalised proportional reasoning from base-10 blocks — they expect larger value = larger physical representation.
  Impact: Students may misread abacus diagrams or lose track of which line they are on when drawing circles.
  Quick correction: Place a base-10 block flat next to a long next to a one cube. Then show three identical circles on three columns. Ask: "In this picture, which circle represents the biggest number?" — reinforce that it is POSITION, not SIZE, that determines value.

• Misconception: Students read the abacus right-to-left (ones first) because that matches how they've spoken digits.
  Why: Students verbalise numbers left-to-right but sometimes count physical objects right-to-left on an abacus.
  Impact: Digit order reversal (e.g., reading 25 413 as 31 452).
  Quick correction: Always label columns from left before counting circles. "We read our number left to right — just like reading words."

WATCH FOR:
• Students who look at the diagram and say the number backwards — prompt "Which line is on the far left?" before reading.
• Students who think an abacus is only for adding/subtracting (some have seen physical abacuses) — clarify we are using it here purely as a representation tool.

[Maths: Stage 2 — Number and Algebra | VTLM 2.0: Place Value — Non-proportional materials]`;

  {
    const slide = pres.addSlide();
    slide.background = { color: C.CREAM };
    addTopBar(slide, STAGE_COLORS[2]);
    addStageBadge(slide, 2, "Explicit Instruction — I Do");
    addTitle(slide, "What is an Abacus?", {});
    addFooter(slide, FOOTER);

    // Left explanation card
    addCard(slide, 0.35, 1.35, 4.6, 3.6, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    pres_slide_text(slide, "How it works", 0.5, 1.45, 4.3, 0.35, {
      fontSize: 13, fontFace: FONT_H, color: STAGE_COLORS[2], bold: true,
    });

    const explainLines = [
      "Each vertical line = one place value position",
      "Right line = Ones, next = Tens, then Hundreds...",
      "Circles on each line show the digit for that place",
      "Count circles left to right to read the number",
    ];
    explainLines.forEach((ln, i) => {
      slide.addText(ln, {
        x: 0.5, y: 1.87 + i * 0.45, w: 4.35, h: 0.38,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
        align: "left", margin: 0,
        bullet: true,
      });
    });

    // Key concept highlight box
    addCard(slide, 0.35, 3.78, 4.6, 1.15, {
      fill: STAGE_COLORS[2],
      shadow: { type: "outer", blur: 4, offset: 2, color: "000000", opacity: 0.15 },
    });

    slide.addText("KEY IDEA — Non-Proportional:", {
      x: 0.5, y: 3.85, w: 4.3, h: 0.3,
      fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
    });
    slide.addText(
      "All circles look the same. Position, not size, determines value.",
      {
        x: 0.5, y: 4.18, w: 4.3, h: 0.65,
        fontSize: 12, fontFace: FONT_B, color: C.CREAM,
        align: "left", margin: 0,
      }
    );

    // Right panel — abacus for 25 413
    addCard(slide, 5.15, 1.35, 4.5, 3.6, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("Abacus: 25 413", {
      x: 5.3, y: 1.45, w: 4.2, h: 0.3,
      fontSize: 13, fontFace: FONT_H, color: STAGE_COLORS[2], bold: true, margin: 0,
    });

    drawAbacus(
      slide,
      5.5, 1.85,
      ["TTh", "Th", "H", "T", "O"],
      [2, 5, 4, 1, 3],
      STAGE_COLORS[2]
    );

    // Number label under abacus
    slide.addText("= 25 413", {
      x: 5.3, y: 4.45, w: 4.2, h: 0.35,
      fontSize: 16, fontFace: FONT_H, color: STAGE_COLORS[2],
      bold: true, align: "center", margin: 0,
    });

    slide.addNotes(s4notes);
  }

  // =========================================================================
  // SLIDE 5 — Stage 2: Place Value Chart with Cards + Choral Response
  // =========================================================================
  const s5notes = `SAY:
• "Our second non-proportional tool is the place value chart with cards."
• "Look at the chart — each column is labelled with a place value. The number of cards stacked in each column tells you the digit for that place."
• "So if there are 1 card in the ten-thousands column, 2 in thousands, 3 in hundreds, 2 in tens, and 1 in ones — we have the number 12 321."
• "Now let's practise reading 12 321 from an abacus. Watch me count the circles left to right." (Trace the diagram)
• "1 circle on TTh — say 'one ten-thousand', 2 on Th — 'two thousands', 3 on H, 2 on T, 1 on O."
• "Everyone together — what is the number?" (Students: 12 321)
• "Now compare the abacus and the place value chart. Turn to your partner — what is the SAME? What is DIFFERENT?"

DO:
• Point to the place value chart columns as you explain.
• Model reading the abacus diagram left to right, saying each digit aloud.
• Trigger choral response: hold hand up, drop it as signal.
• Give 60 seconds for Pair-Share; nominate one pair to share.

CFU CHECKPOINT:
Technique: Choral Response
Script:
• "I'm going to count the circles on the abacus. After each column, you tell me the digit."
• Point to TTh line: "How many?" (1) "Th?" (2) "H?" (3) "T?" (2) "O?" (1)
• "Everyone — what is the whole number?" — wait for "12 321"
• For Pair-Share: "What's the same about the two tools? What's different?"
• Take 2-3 paired responses; record key ideas on board.
PROCEED: If students read the number correctly and identify "both show place value" as a similarity, move to worked example.
PIVOT: If students cannot read left-to-right from the abacus, place the matching place value chart next to it and map each column to a circle group explicitly. "Look — 1 card in TTh = 1 circle on the TTh line. They're saying the same thing, just drawn differently."

TEACHER NOTES:
Choral response is a high-participation strategy that ensures all students practise saying the number aloud. The Pair-Share on same/different primes students for the mathematical comparison that is central to this lesson — both tools are non-proportional but look different. Typical "same" responses: both show place value positions, both don't show size differences, both go left to right. Typical "different" responses: one uses circles/lines, the other uses stacked cards; abacus is more abstract. Validate all responses and connect them to the key idea from Slide 4.

WATCH FOR:
• Students who choral-respond with the wrong number — check whether they are reading right-to-left; reinforce left-to-right.
• Students who say abacus and place value chart are "the same thing" — push for specifics: "Tell me one thing that looks different about how they show the number."
• Students confusing the number of lines with the digit — clarify: "We count the CIRCLES, not the lines."

[Maths: Stage 2 — Number and Algebra | VTLM 2.0: Place Value — Representing and comparing]`;

  {
    const slide = pres.addSlide();
    slide.background = { color: C.CREAM };
    addTopBar(slide, STAGE_COLORS[2]);
    addStageBadge(slide, 2, "Explicit Instruction — I Do");
    addTitle(slide, "Place Value Chart with Cards", {});
    addFooter(slide, FOOTER);

    // Left: place value chart for 12321
    addCard(slide, 0.35, 1.35, 4.55, 2.85, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("Place Value Chart: 12 321", {
      x: 0.5, y: 1.45, w: 4.25, h: 0.3,
      fontSize: 12, fontFace: FONT_H, color: STAGE_COLORS[2], bold: true, margin: 0,
    });

    addPlaceValueChart(
      slide,
      0.5, 1.82,
      ["TTh", "Th", "H", "T", "O"],
      [1, 2, 3, 2, 1],
      { headerColor: STAGE_COLORS[2], w: 4.2, h: 1.75 }
    );

    // Pair-Share prompt
    addCard(slide, 0.35, 4.28, 4.55, 0.68, {
      fill: "FFF8E7",
      shadow: { type: "outer", blur: 3, offset: 1, color: "000000", opacity: 0.08 },
    });
    slide.addText(
      "Pair-Share: What is the SAME and DIFFERENT about the abacus and place value chart?",
      {
        x: 0.5, y: 4.33, w: 4.3, h: 0.58,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL,
        align: "left", margin: 0,
      }
    );

    // Right: abacus for 12321
    addCard(slide, 5.1, 1.35, 4.55, 2.85, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("Abacus: 12 321", {
      x: 5.25, y: 1.45, w: 4.25, h: 0.3,
      fontSize: 12, fontFace: FONT_H, color: STAGE_COLORS[2], bold: true, margin: 0,
    });

    drawAbacus(
      slide,
      5.45, 1.82,
      ["TTh", "Th", "H", "T", "O"],
      [1, 2, 3, 2, 1],
      STAGE_COLORS[2]
    );

    slide.addText("= 12 321", {
      x: 5.25, y: 4.05, w: 4.2, h: 0.3,
      fontSize: 14, fontFace: FONT_H, color: STAGE_COLORS[2],
      bold: true, align: "center", margin: 0,
    });

    // CFU badge
    addCard(slide, 5.1, 4.28, 4.55, 0.68, {
      fill: STAGE_COLORS[2],
    });
    slide.addText("CFU: Choral Response — read the number!", {
      x: 5.25, y: 4.38, w: 4.25, h: 0.48,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE,
      bold: true, align: "center", margin: 0,
    });

    slide.addNotes(s5notes);
  }

  // =========================================================================
  // SLIDE 6 — Stage 2: Worked Example — 13 415 on Abacus
  // =========================================================================
  const s6notes = `SAY:
• "Now I'll show you how I draw circles on the abacus to represent a number. Watch carefully."
• "The number is 13 415."
• "I start on the LEFT — the ten-thousands column. 1 ten-thousand, so I draw 1 circle."
• "Move to thousands — 3, so I draw 3 circles."
• "Hundreds — 4 circles."
• "Tens — 1 circle."
• "Ones — 5 circles."
• "Now let's read it back together: 1 ten-thousand is 10 000. 3 thousands is 3 000. 4 hundreds is 400. 1 ten is 10. 5 ones is 5. Total: 13 415."
• "Everyone — say the number." (Choral: thirteen thousand, four hundred and fifteen)

DO:
• Trace each column on the slide with a pointer as you say each digit.
• Use deliberate, slow gestures — left to right, column by column.
• Write 1-3-4-1-5 on the board one digit at a time as you count circles.
• Trigger choral response for the full number.

TEACHER NOTES:
Modelling the process of drawing circles is as important as reading them. Many students will default to drawing all circles at once and then labelling rather than working methodically left to right — this increases errors. Explicitly naming the direction and the column before placing each circle group ingrains the habit. This slide bridges reading (Slide 5) to drawing (which students will do in Guided Practice). The choral reading reinforces correct pronunciation of five-digit numbers: "thirteen thousand, four hundred and fifteen" — not "one three four one five."

WATCH FOR:
• Students who want to start from ones (right side) — consistently redirect to left-to-right.
• Students who draw the correct number of circles but on the wrong line — labelling columns before drawing circles is a critical strategy to emphasise.
• Students who say "one thousand, three thousands" instead of "thirteen thousand" — reinforce that the first two digits form the ten-thousands and thousands together.

[Maths: Stage 2 — Number and Algebra | VTLM 2.0: Place Value — Representing 5-digit numbers]`;

  {
    const slide = pres.addSlide();
    slide.background = { color: C.CREAM };
    addTopBar(slide, STAGE_COLORS[2]);
    addStageBadge(slide, 2, "Explicit Instruction — I Do");
    addTitle(slide, "Drawing on the Abacus: 13 415", {});
    addFooter(slide, FOOTER);

    // Left: step-by-step card
    addCard(slide, 0.35, 1.35, 4.6, 3.6, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("Work left to right — column by column", {
      x: 0.5, y: 1.45, w: 4.35, h: 0.35,
      fontSize: 12, fontFace: FONT_H, color: STAGE_COLORS[2], bold: true, margin: 0,
    });

    const steps13415 = [
      { col: "TTh (Ten-Thousands)", digit: "1", circles: "1 circle" },
      { col: "Th (Thousands)", digit: "3", circles: "3 circles" },
      { col: "H (Hundreds)", digit: "4", circles: "4 circles" },
      { col: "T (Tens)", digit: "1", circles: "1 circle" },
      { col: "O (Ones)", digit: "5", circles: "5 circles" },
    ];

    steps13415.forEach((s, i) => {
      // Column label
      slide.addText(s.col, {
        x: 0.5, y: 1.88 + i * 0.55, w: 2.7, h: 0.28,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
      });
      // Digit pill
      slide.addShape("roundRect", {
        x: 3.3, y: 1.88 + i * 0.55,
        w: 0.35, h: 0.28, rectRadius: 0.14,
        fill: { color: STAGE_COLORS[2] },
        line: { color: STAGE_COLORS[2], width: 0 },
      });
      slide.addText(s.digit, {
        x: 3.3, y: 1.88 + i * 0.55, w: 0.35, h: 0.28,
        fontSize: 12, fontFace: FONT_H, color: C.WHITE,
        align: "center", bold: true, margin: 0,
      });
      // Circles label
      slide.addText(s.circles, {
        x: 3.72, y: 1.88 + i * 0.55, w: 1.1, h: 0.28,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });
    });

    // Choral response banner
    addCard(slide, 0.35, 4.6, 4.6, 0.38, {
      fill: STAGE_COLORS[2],
    });
    slide.addText("Say together: thirteen thousand, four hundred and fifteen", {
      x: 0.5, y: 4.65, w: 4.3, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE,
      align: "center", bold: true, margin: 0,
    });

    // Right: abacus for 13415
    addCard(slide, 5.1, 1.35, 4.55, 3.6, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("Abacus: 13 415", {
      x: 5.25, y: 1.45, w: 4.2, h: 0.3,
      fontSize: 12, fontFace: FONT_H, color: STAGE_COLORS[2], bold: true, margin: 0,
    });

    drawAbacus(
      slide,
      5.45, 1.82,
      ["TTh", "Th", "H", "T", "O"],
      [1, 3, 4, 1, 5],
      STAGE_COLORS[2]
    );

    slide.addText("13 415", {
      x: 5.25, y: 4.45, w: 4.2, h: 0.38,
      fontSize: 22, fontFace: FONT_H, color: STAGE_COLORS[2],
      bold: true, align: "center", margin: 0,
    });

    slide.addNotes(s6notes);
  }

  // =========================================================================
  // SLIDE 7 — Stage 2: Reading from Place Value Chart — 34 212 Pair-Share
  // =========================================================================
  const s7notes = `SAY:
• "Now let's try the place value chart. Here is a chart showing 34 212."
• "Look at each column. How many cards are in the ten-thousands column? The thousands? Hundreds? Tens? Ones?"
• "Turn to your partner — read the number from the chart. Can you both agree on what number this is?"
• (After 45 seconds) "Let's check. [Non-volunteer], what did you and your partner get?"
• "The number is thirty-four thousand, two hundred and twelve — 34 212. Say it with me."
• "And here is the same number shown on an abacus. Can you see how they match?"

DO:
• Display the place value chart and abacus side by side.
• Allow genuine Pair-Share time — do not rush.
• Cold-call a non-volunteer pair for their answer.
• After the answer, point to matching columns on both diagrams.

CFU CHECKPOINT:
Technique: Pair-Share
Script:
• "Look at the place value chart. With your partner, count the cards in each column and decide what number it shows."
• After 45 seconds: "[Student name], what number did you and your partner get?"
• "Where did you start — left or right? Tell me the column name for your first digit."
• If they are correct: "Say the number in words — everyone repeat: thirty-four thousand, two hundred and twelve."
PROCEED: If pairs identify 34 212 and can say it in words, proceed to Stage 3.
PIVOT: If students get 43 212 or another reversal, draw attention to column headers: "Which column is furthest to the left? That column has the highest value — that digit comes first when we say the number." Recount together slowly.

TEACHER NOTES:
This Pair-Share gives students structured social time with the new concept before they have to work independently. The task is deliberately achievable — reading from a labelled chart — to build confidence before the less-scaffolded abacus drawing. Comparing the chart and abacus side by side reinforces the key lesson theme: different representations, same number. Ensure students are practising the correct verbal form ("thirty-four thousand" not "three four thousand") — this language precision matters for Stage 3 and beyond.

WATCH FOR:
• Students who read columns right-to-left and say "two hundred and twelve thousand, thirty-four" — address immediately with a left-to-right pointer gesture.
• Students who add the number of cards across columns rather than reading them as digits (e.g., 3+4+2+1+2 = 12) — clarify: "The number of cards is the DIGIT for that column, not something we add together."
• Pairs who disagree — use as a teaching moment: "You have two different answers; work out who is right and why."

[Maths: Stage 2 — Number and Algebra | VTLM 2.0: Place Value — Reading 5-digit numbers]`;

  {
    const slide = pres.addSlide();
    slide.background = { color: C.CREAM };
    addTopBar(slide, STAGE_COLORS[2]);
    addStageBadge(slide, 2, "Explicit Instruction — I Do");
    addTitle(slide, "Read from the Place Value Chart: 34 212", {});
    addFooter(slide, FOOTER);

    // Left: place value chart
    addCard(slide, 0.35, 1.35, 4.55, 2.95, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("Place Value Chart", {
      x: 0.5, y: 1.45, w: 4.25, h: 0.3,
      fontSize: 12, fontFace: FONT_H, color: STAGE_COLORS[2], bold: true, margin: 0,
    });

    addPlaceValueChart(
      slide,
      0.5, 1.82,
      ["TTh", "Th", "H", "T", "O"],
      [3, 4, 2, 1, 2],
      { headerColor: STAGE_COLORS[2], w: 4.2, h: 1.8 }
    );

    // Right: abacus for 34212
    addCard(slide, 5.1, 1.35, 4.55, 2.95, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("Abacus", {
      x: 5.25, y: 1.45, w: 4.25, h: 0.3,
      fontSize: 12, fontFace: FONT_H, color: STAGE_COLORS[2], bold: true, margin: 0,
    });

    drawAbacus(
      slide,
      5.45, 1.82,
      ["TTh", "Th", "H", "T", "O"],
      [3, 4, 2, 1, 2],
      STAGE_COLORS[2]
    );

    // Pair-Share instruction
    addCard(slide, 0.35, 4.38, 4.55, 0.6, {
      fill: "FFF8E7",
      shadow: { type: "outer", blur: 3, offset: 1, color: "000000", opacity: 0.08 },
    });
    slide.addText(
      "Pair-Share: Count the cards in each column. What number is shown?",
      {
        x: 0.5, y: 4.43, w: 4.3, h: 0.5,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL,
        align: "left", margin: 0,
      }
    );

    // Answer reveal
    addCard(slide, 5.1, 4.38, 4.55, 0.6, {
      fill: STAGE_COLORS[2],
    });
    slide.addText("Answer: 34 212  — thirty-four thousand, two hundred and twelve", {
      x: 5.25, y: 4.43, w: 4.25, h: 0.5,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE,
      bold: true, align: "center", margin: 0,
    });

    slide.addNotes(s7notes);
  }

  // =========================================================================
  // SLIDE 8 — Stage 3: Guided Practice — 21 471
  // =========================================================================
  const s8notes = `SAY:
• "You now have SR2 — the abacus template and place value chart sheet."
• "Look at the first place value chart on your sheet. With your partner, work out what number it shows."
• (Allow 60 seconds) "Let's hear from some non-volunteers. [Student A], what number did you find?"
• "The number is 21 471. Now write that number on your sheet, then draw the matching circles on the blank abacus next to it."
• "Work with your partner — compare your abacus drawings when you're done."
• "I'll be coming around. Be ready to tell me: what is the value of the 4 in 21 471?"

DO:
• Hand out SR2 if not already distributed.
• Allow genuine partner work time — 90 seconds minimum.
• Circulate and specifically observe: left-to-right drawing, correct circle count, number written in digits.
• Cold-call 1-2 non-volunteers for the number before moving on.
• Ask "What is the value of the digit 4?" as you circulate — expect "four hundreds" or "400."

CFU CHECKPOINT:
Technique: Think-Pair-Share
Script:
• "Look at the first place value chart on SR2. THINK — what number is it? Then PAIR — share with your partner."
• After 60 seconds: call a non-volunteer: "What number did you get, and how do you know?"
• "What is the value of the 4 in this number?" — expect "four hundreds" or "400."
• "What is the value of the 7?" — expect "seventy" or "7 tens."
• Observe abacus drawings: are circles in the correct columns? Are counts accurate?
PROCEED: If students correctly identify 21 471 and draw the abacus with correct circle counts in each column, continue to 10 236.
PIVOT: If students have wrong totals in any column: "Let's count together. Point to the TTh column on your chart — how many cards are there? Write that digit first." Work column by column together before students re-draw.

TEACHER NOTES:
This guided practice slide transitions students from watching the teacher to doing the task alongside a partner, which is a critical scaffolding step before independent work. The Think-Pair-Share structure ensures individual thinking before social support — this is deliberate; students should not immediately defer to their partner. Circulating during this stage gives the teacher real-time formative data: which students need more scaffolding (pre-cut cards, mat support) and which may be ready for the extend challenge. Watch especially for zero-placeholder issues — the next slide (10 236) will address this explicitly.

WATCH FOR:
• Students who correctly identify the number but draw circles on the wrong lines — intervene early; errors here will compound in independent practice.
• Students who write "21471" without a space — model correct 5-digit spacing: "21 471."
• Students who can draw but cannot explain the value of each digit — push for verbal articulation: "Don't just show me — tell me."

[Maths: Stage 3 — Guided Practice | VTLM 2.0: Place Value — Representing and reading]`;

  {
    const slide = pres.addSlide();
    slide.background = { color: C.CREAM };
    addTopBar(slide, STAGE_COLORS[3]);
    addStageBadge(slide, 3, "Guided Practice — We Do");
    addTitle(slide, "Place Value Chart \u2192 Abacus: 21 471", {});
    addFooter(slide, FOOTER);

    // Place value chart left
    addCard(slide, 0.35, 1.35, 4.55, 2.85, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("SR2 \u2014 Place Value Chart (Example 1)", {
      x: 0.5, y: 1.45, w: 4.25, h: 0.3,
      fontSize: 11, fontFace: FONT_H, color: STAGE_COLORS[3], bold: true, margin: 0,
    });

    addPlaceValueChart(
      slide,
      0.5, 1.82,
      ["TTh", "Th", "H", "T", "O"],
      [2, 1, 4, 7, 1],
      { headerColor: STAGE_COLORS[3], w: 4.2, h: 1.75 }
    );

    // Abacus right
    addCard(slide, 5.1, 1.35, 4.55, 2.85, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("Draw on the Abacus", {
      x: 5.25, y: 1.45, w: 4.25, h: 0.3,
      fontSize: 11, fontFace: FONT_H, color: STAGE_COLORS[3], bold: true, margin: 0,
    });

    drawAbacus(
      slide,
      5.45, 1.82,
      ["TTh", "Th", "H", "T", "O"],
      [2, 1, 4, 7, 1],
      STAGE_COLORS[3]
    );

    slide.addText("= 21 471", {
      x: 5.25, y: 4.1, w: 4.2, h: 0.3,
      fontSize: 14, fontFace: FONT_H, color: STAGE_COLORS[3],
      bold: true, align: "center", margin: 0,
    });

    // CFU bottom strip
    addCard(slide, 0.35, 4.35, 9.3, 0.65, {
      fill: STAGE_COLORS[3],
      shadow: { type: "outer", blur: 4, offset: 2, color: "000000", opacity: 0.12 },
    });

    slide.addText(
      "CFU \u2014 Think-Pair-Share: What number? \u2022 What is the value of the 4?  \u2022 What is the value of the 7?",
      {
        x: 0.55, y: 4.43, w: 9.0, h: 0.48,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE,
        bold: true, align: "center", margin: 0,
      }
    );

    slide.addNotes(s8notes);
  }

  // =========================================================================
  // SLIDE 9 — Stage 3: Zero as Placeholder — 10 236
  // =========================================================================
  const s9notes = `SAY:
• "Now look at the second example on SR2. The number is 10 236."
• "Count the cards in the ten-thousands column — there is 1 card. So the TTh digit is 1."
• "Thousands column — ZERO cards. No cards means no circles on that abacus line."
• "This is very important: we do NOT skip that line. The thousands line has NO circles — it stays empty. Zero is still a digit — it holds that position."
• "Hundreds: 2. Tens: 3. Ones: 6."
• "So on the abacus, I draw 1 circle on TTh, NOTHING on Th, 2 circles on H, 3 on T, 6 on O."
• "If I skip the thousands line and just draw circles from TTh straight to H, what number would someone read? They might think it is 1 236 — a four-digit number, not 10 236. That is why zero matters."

DO:
• Display both diagrams side by side.
• Trace the Th column on the chart — empty — then trace the Th line on the abacus — no circles.
• Write "0" visibly in the thousands digit column.
• Use dramatic voice: "Nothing. No circles. But the LINE is still there."

CFU CHECKPOINT:
Technique: Cold Call (non-volunteer)
Script:
• Point to the thousands column on the place value chart: "How many cards are in the thousands column?"
• "So how many circles go on the thousands line of the abacus?"
• Call non-volunteer: "[Student], tell me why we don't just skip the thousands line."
• Expected answer: "Because it would change the number — we need the zero to show there are no thousands."
• Ask a second student: "What happens to the number if we skip the zero?"
PROCEED: If students articulate that zero is a placeholder and skipping it changes the number's value, proceed to Stage 4.
PIVOT: If students say "zero doesn't matter, it's nothing" — bring out base-10 blocks: build 1 236 and 10 236 side by side. "Are these the same number? Which is bigger? By how much? Now look at the abacus — what is different?" Make the visual contrast explicit before re-asking.

TEACHER NOTES:
The zero-as-placeholder concept is one of the most common sources of error for students at this stage. Many students understand that zero means "nothing" but don't yet understand that it holds a positional role — without it, every digit to the right would shift one place to the left, changing the entire number's value. This is also a direct connection to why we write five digits (not four) for ten-thousand-range numbers: each position must be accounted for. This misconception is foundational — if not addressed here, students will make systematic errors in addition and subtraction with regrouping in later lessons.

MISCONCEPTIONS:
• Misconception: "Zero means nothing, so I don't draw anything AND I skip that line."
  Why: Students conflate "zero circles" with "no column" — they see empty as non-existent rather than positional.
  Impact: Reading 10 236 as 1 236 or 1 0 236 (as if thousands is invisible). Creates cascading errors in all five-digit operations.
  Quick correction: Write 10 236 and 1 236 on the board. "Point to the difference. Both have the same digits except — 10 236 has a zero in thousands. That zero pushes the 1 into ten-thousands. Without it, the 1 falls back to thousands and we only have a 4-digit number."

• Misconception: Students draw a zero symbol (the numeral 0) on the abacus line instead of leaving it empty.
  Why: Students have been taught to "write zero" when a place has no value — they don't yet distinguish between numeral representation and abacus representation.
  Impact: Technically wrong but easy to fix — the abacus convention is no circles = zero. Gently correct: "On an abacus, an empty line IS zero. We don't write a 0 — we just leave it blank."

WATCH FOR:
• Students who leave out the Th line entirely when drawing their abacus — the line must still be drawn even if no circles go on it. Check that students are drawing all five lines before adding circles.
• Students who put 1 circle on the Th line — they may be conflating "10" with "1 in Th column"; ask "What column are we talking about now? Thousands. How many cards in the thousands column? Zero."

[Maths: Stage 3 — Guided Practice | VTLM 2.0: Place Value — Zero as placeholder]`;

  {
    const slide = pres.addSlide();
    slide.background = { color: C.CREAM };
    addTopBar(slide, STAGE_COLORS[3]);
    addStageBadge(slide, 3, "Guided Practice — We Do");
    addTitle(slide, "Zero as a Placeholder: 10 236", {});
    addFooter(slide, FOOTER);

    // Left: place value chart — 10236, zero in Th
    addCard(slide, 0.35, 1.35, 4.55, 2.85, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("Place Value Chart: 10 236", {
      x: 0.5, y: 1.45, w: 4.25, h: 0.3,
      fontSize: 11, fontFace: FONT_H, color: STAGE_COLORS[3], bold: true, margin: 0,
    });

    addPlaceValueChart(
      slide,
      0.5, 1.82,
      ["TTh", "Th", "H", "T", "O"],
      [1, 0, 2, 3, 6],
      { headerColor: STAGE_COLORS[3], w: 4.2, h: 1.75 }
    );

    // Right: abacus — 10236, empty Th line
    addCard(slide, 5.1, 1.35, 4.55, 2.85, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("Abacus: 10 236 (zero circles on Th line)", {
      x: 5.25, y: 1.45, w: 4.25, h: 0.3,
      fontSize: 11, fontFace: FONT_H, color: STAGE_COLORS[3], bold: true, margin: 0,
    });

    drawAbacus(
      slide,
      5.45, 1.82,
      ["TTh", "Th", "H", "T", "O"],
      [1, 0, 2, 3, 6],
      STAGE_COLORS[3]
    );

    // Callout box — zero annotation
    addCard(slide, 5.1, 4.25, 4.55, 0.72, {
      fill: "FFF3CD",
      shadow: { type: "outer", blur: 3, offset: 1, color: "000000", opacity: 0.08 },
    });
    slide.addText(
      "The Th line has NO circles — it is EMPTY. Zero holds the position!",
      {
        x: 5.25, y: 4.31, w: 4.25, h: 0.6,
        fontSize: 12, fontFace: FONT_B, color: "7A5000",
        bold: true, align: "center", margin: 0,
      }
    );

    // Bottom CFU strip
    addCard(slide, 0.35, 4.25, 4.55, 0.72, {
      fill: STAGE_COLORS[3],
    });
    slide.addText(
      "CFU \u2014 Cold Call: Why don\u2019t we skip the thousands line?",
      {
        x: 0.5, y: 4.31, w: 4.3, h: 0.6,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE,
        bold: true, align: "center", margin: 0,
      }
    );

    slide.addNotes(s9notes);
  }

  // =========================================================================
  // SLIDE 10 — Stage 4: Independent Practice
  // =========================================================================
  const s10notes = `SAY:
• "Now it's your turn to work independently. Open SR2 to pages 2 and 3."
• "For each question: look at the number or chart, draw the circles on the abacus, and write the place value parts."
• "Work silently for the first 5 minutes. If you finish early, try the Enable or Extend activities."
• (Circulate and ask) "What is the value of the [digit] in this number?" — expect expanded notation answers.
• "If you get stuck, use the strategy we practised: start at the left, label each column, then draw your circles one column at a time."

DO:
• Circulate systematically — do not stay in one area.
• Ask specific value questions to different students: "What is the value of the 3 in 23 415?" (expected: "3 000" or "three thousands")
• For Enable: provide pre-cut place value cards and place value mat (SR3 + SR4).
• For Extend: students use 10-sided dice; prompt "Can you find more than one answer?"
• Use a 5-minute work signal before pulling whole class back together.

CFU CHECKPOINT:
Technique: Teacher Observation and Circulation
Script:
• Observe students' abacus drawings — are columns correctly labelled? Are circle counts matching digits?
• Ask every student visited: "Tell me the value of one digit in your number" or "Read me the whole number."
• If a student pauses on a zero: "How many circles go on the thousands line for this number? Why?"
• Look for students who have finished quickly and may be ready for Extend challenge.
• Note any students still struggling for a targeted small-group follow-up after the lesson.
PROCEED: After 10-12 minutes of independent work, call the class back for Stage 5.
PIVOT: If more than 25% of students are stuck at the same step (e.g., drawing circles for zero), pause the class: "Pencils down — eyes on me. Let's look at this column together for 2 minutes." Re-teach targeted point then resume.

TEACHER NOTES:
Independent practice is where students consolidate understanding and where the teacher gathers the richest formative data. The tiered structure (core SR2 pages 2-3, Enable with concrete materials, Extend with dice) ensures all students are appropriately challenged. The Enable activity is not remediation — it is an alternative representation pathway for students who need to work more concretely. Encourage students on Enable to also draw the abacus representation once they have built the number with cards. The Extend dice challenge introduces combinatorics thinking (largest/smallest numbers from given digits) which previews Year 4 content around ordering and comparing large numbers.

WATCH FOR:
• Students who rush through drawings without counting carefully — prompt: "How did you know to draw 3 circles there? Count again with me."
• Students who write digits in the wrong order when recording the number — check that they read left to right from their own abacus.
• Enable students who can build with cards but struggle to transfer to written digits — this is a sequencing issue; have them read their card arrangement aloud first.
• Extend students: if they get one answer immediately, ask "Is there another number with zero as one of the five digits that is still even?" — connect to the exit ticket.

[Maths: Stage 4 — Independent Practice | VTLM 2.0: Place Value — Applying representations]`;

  {
    const slide = pres.addSlide();
    slide.background = { color: C.CREAM };
    addTopBar(slide, STAGE_COLORS[4]);
    addStageBadge(slide, 4, "Independent Practice — You Do");
    addTitle(slide, "Your Turn: SR2 Pages 2 & 3", {});
    addFooter(slide, FOOTER);

    // Core task card
    addCard(slide, 0.35, 1.35, 4.6, 2.2, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("Core Task", {
      x: 0.5, y: 1.45, w: 4.3, h: 0.32,
      fontSize: 13, fontFace: FONT_H, color: STAGE_COLORS[4], bold: true, margin: 0,
    });

    const coreTasks = [
      "Open SR2 \u2014 pages 2 and 3.",
      "Draw circles on the abacus for each number.",
      "Write the place value parts for each number.",
      "Work left to right \u2014 column by column.",
    ];
    coreTasks.forEach((t, i) => {
      slide.addText(t, {
        x: 0.55, y: 1.83 + i * 0.41, w: 4.25, h: 0.36,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
        align: "left", margin: 0,
        bullet: true,
      });
    });

    // Enable card
    addCard(slide, 0.35, 3.65, 4.6, 1.35, {
      fill: C.LIGHT,
      shadow: { type: "outer", blur: 4, offset: 1, color: "000000", opacity: 0.08 },
    });
    slide.addText("Enable", {
      x: 0.5, y: 3.72, w: 4.3, h: 0.3,
      fontSize: 12, fontFace: FONT_H, color: STAGE_COLORS[2], bold: true, margin: 0,
    });
    slide.addText(
      "Use pre-cut place value cards + place value mat (SR3 & SR4). Build 4- and 5-digit numbers with the cards first, then draw the abacus.",
      {
        x: 0.55, y: 4.05, w: 4.25, h: 0.85,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL,
        align: "left", margin: 0,
      }
    );

    // Extend card
    addCard(slide, 5.1, 1.35, 4.55, 3.65, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("Extend", {
      x: 5.25, y: 1.45, w: 4.25, h: 0.32,
      fontSize: 13, fontFace: FONT_H, color: STAGE_COLORS[4], bold: true, margin: 0,
    });

    slide.addText("Roll a 10-sided dice 5 times.", {
      x: 5.3, y: 1.85, w: 4.2, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
    });

    const extendTasks = [
      "1. Make the LARGEST possible even number from your 5 digits.",
      "2. Make the SMALLEST possible odd number.",
      "3. Roll again — this time one of your 5 digits must be zero. Make the largest possible even number. What changes?",
    ];
    extendTasks.forEach((t, i) => {
      slide.addText(t, {
        x: 5.3, y: 2.22 + i * 0.65, w: 4.2, h: 0.58,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
        align: "left", margin: 0,
      });
    });

    // CFU monitoring bar
    addCard(slide, 5.1, 4.68, 4.55, 0.32, {
      fill: STAGE_COLORS[4],
    });
    slide.addText("CFU: Circulate \u2014 ask \u201CWhat is the value of that digit?\u201D", {
      x: 5.25, y: 4.72, w: 4.25, h: 0.24,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE,
      bold: true, align: "center", margin: 0,
    });

    slide.addNotes(s10notes);
  }

  // =========================================================================
  // SLIDE 11 — Stage 5: Exit Ticket — Number Puzzle
  // =========================================================================
  const s11notes = `SAY:
• "Before we finish, a quick challenge. Look at the number 14 023."
• "With your partner — what do you know about this number? Think about: how many of each place value; what it looks like on the abacus; even or odd; and — here's a special one — what do the digits add up to?"
• "1 + 4 + 0 + 2 + 3 = 10. The digit sum is 10."
• "Now the puzzle: I am thinking of an even 5-digit number. I have 4 tens and zero hundreds. I have the same number of thousands as I do tens — that means 4 thousands. I have fewer ones than tens. My digit sum is 13."
• "Can you work out what I am? There might be more than one answer — can you find them all?"

DO:
• Write 14 023 on the board.
• Take 1-2 Pair-Share responses about what they know — accept all mathematical observations.
• Read the clue puzzle slowly, one clue at a time, and write the constraints on the board.
• Allow 3-4 minutes for students to work on the puzzle.
• Collect responses — note correct and near-correct answers for discussion at start of next lesson.

CFU CHECKPOINT:
Technique: Pair-Share (exit discussion)
Script:
• "Tell your partner three things you know about 14 023."
• Cold-call: "What is the digit sum of 14 023?" (1+4+0+2+3 = 10)
• "Now for the puzzle — write down what you know from the clues before you guess." (Even; 4 tens; 0 hundreds; 4 thousands; ones < 4; digit sum = 13)
• After 3 minutes: "Has anyone found one answer? Two answers?"
• Take answers — possible solutions: if TTh + 4000 + 0 + 40 + ones = 13 digit sum: TTh + 4 + 0 + 4 + ones = 13 → TTh + ones = 5. Number must be even so ones is 0, 2, or 4. Ones < 4 so ones is 0 or 2. If ones=0: TTh=5 → 54 040. If ones=2: TTh=3 → 34 042. Both are valid.
PROCEED: Accept any well-reasoned answer; reveal solutions at start of next lesson.
PIVOT: If students are stuck: "Let's use what we know. Digit sum is 13. We know hundreds is 0 and tens is 4 and thousands is 4 — what do those digits add to? 0+4+4 = 8. So the remaining two digits (TTh + ones) must add to 5. Can you list pairs that add to 5?"

TEACHER NOTES:
The exit ticket serves two purposes: consolidation of lesson learning (reading and representing 5-digit numbers) and extension thinking (reasoning from constraints). The digit sum connection is a deliberate bridge to additive thinking and number sense. The puzzle has multiple solutions, which is mathematically important — students who find one answer should be pushed to look for others. Record which students engage deeply with the puzzle versus which need more support with basic representation — this data informs the start of Lesson 3. The clue-puzzle format mirrors deductive reasoning tasks that appear in later mathematics and builds persistence.

WATCH FOR:
• Students who can solve the puzzle numerically but cannot represent their answer on an abacus — ask them to do so.
• Students who find 54 040 but miss 34 042 (or vice versa) — prompt: "What other ones digit is even and less than 4?"
• Students who add digits incorrectly — remind them of the constraint method: "We know three of the five digits already (0, 4, 4). Work from what you know."

[Maths: Stage 5 — Exit Ticket | VTLM 2.0: Place Value — Reasoning with 5-digit numbers]`;

  {
    const slide = pres.addSlide();
    slide.background = { color: C.CREAM };
    addTopBar(slide, STAGE_COLORS[5]);
    addStageBadge(slide, 5, "Exit Ticket");
    addTitle(slide, "Number Puzzle: What Am I?", {});
    addFooter(slide, FOOTER);

    // Left: 14023 discussion
    addCard(slide, 0.35, 1.35, 4.55, 2.55, {
      fill: STAGE_COLORS[5],
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.12 },
    });

    slide.addText("Start: What do you know about…", {
      x: 0.5, y: 1.45, w: 4.25, h: 0.3,
      fontSize: 12, fontFace: FONT_H, color: C.CREAM, bold: true, margin: 0,
    });

    slide.addText("14 023", {
      x: 0.5, y: 1.82, w: 4.25, h: 0.65,
      fontSize: 42, fontFace: FONT_H, color: C.WHITE,
      bold: true, align: "center", margin: 0,
    });

    const knowItems = [
      "Place value of each digit?",
      "Even or odd?",
      "Digit sum: 1+4+0+2+3 = \u2753",
    ];
    knowItems.forEach((k, i) => {
      slide.addText(k, {
        x: 0.55, y: 2.55 + i * 0.38, w: 4.2, h: 0.34,
        fontSize: 12, fontFace: FONT_B, color: C.CREAM,
        align: "left", margin: 0, bullet: true,
      });
    });

    // Right: Puzzle card
    addCard(slide, 5.1, 1.35, 4.55, 3.65, {
      fill: C.WHITE,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 },
    });

    slide.addText("The Puzzle \u2014 What number am I?", {
      x: 5.25, y: 1.45, w: 4.25, h: 0.32,
      fontSize: 12, fontFace: FONT_H, color: STAGE_COLORS[5], bold: true, margin: 0,
    });

    const clues = [
      "I am an even 5-digit number.",
      "I have 4 tens and zero hundreds.",
      "My thousands digit equals my tens digit.",
      "I have fewer ones than tens.",
      "The sum of all my digits is 13.",
    ];
    clues.forEach((c, i) => {
      slide.addText(c, {
        x: 5.3, y: 1.85 + i * 0.5, w: 4.2, h: 0.42,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
        align: "left", margin: 0, bullet: true,
      });
    });

    slide.addText("Can you find more than one answer?", {
      x: 5.25, y: 4.42, w: 4.25, h: 0.42,
      fontSize: 12, fontFace: FONT_H, color: STAGE_COLORS[5],
      bold: true, italic: true, align: "center", margin: 0,
    });

    // Pair-Share banner
    addCard(slide, 0.35, 3.98, 4.55, 0.45, {
      fill: "3A3A3A",
    });
    slide.addText("Pair-Share \u2014 then write your answer independently.", {
      x: 0.5, y: 4.03, w: 4.3, h: 0.35,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE,
      bold: true, align: "center", margin: 0,
    });

    slide.addNotes(s11notes);
  }

  // =========================================================================
  // SLIDE 12 — Closing Slide
  // =========================================================================
  const s12notes = `SAY:
• "Before we pack away — let's talk about what we explored today."
• "Turn and talk to your partner: what is the SAME and what is DIFFERENT about using base-10 blocks versus an abacus to represent a number?"
• (After 60 seconds) "Who wants to share? Let's hear a few ideas."
• "Key things I want you to remember: the position of each circle or card is what gives it its value — that's the big idea of place value. And zero is not nothing — it is a placeholder that holds a position in the number."
• "Next lesson we will look at how we can compare and order these large numbers. Well done today."

DO:
• Display the closing slide.
• Allow genuine Turn & Talk — 60 seconds minimum.
• Take 3-4 responses and record key points on the board.
• Point back to the LI and SC: "Look at our success criteria — can you do both of these? Give me a thumbs up, sideways, or down."
• Collect any SR2 pages as formative assessment.

TEACHER NOTES:
The closing Turn & Talk is a metacognitive consolidation activity — students are not just recalling facts but comparing conceptual tools. This mirrors the mathematical practice of making connections between representations, which is a higher-order thinking skill. The key takeaways listed on this slide should be co-constructed with students where possible — when students generate the words themselves, they are more likely to retain them. The self-assessment against Success Criteria (thumbs) gives the teacher a rapid sense of class confidence before Lesson 3. Students with thumbs sideways or down are priority targets for the warm-up in Lesson 3.

WATCH FOR:
• Students who compare base-10 blocks and abacus as "totally different" without identifying the shared purpose (both represent place value) — prompt with "What are BOTH of these tools trying to help us do?"
• Students who are still unsure about zero — the closing discussion is a final opportunity to hear their thinking; a student who says "zero doesn't matter" at this stage needs targeted support in Lesson 3.
• Students who express high confidence but whose SR2 work shows errors — schedule a brief individual check at the start of the next lesson.

[Maths: Stage 2 — Closing / Synthesis | VTLM 2.0: Place Value — Comparing representations]`;

  {
    const slide = pres.addSlide();
    slide.background = { color: C.NAVY };
    addTopBar(slide, "0F7F8C");
    addFooter(slide, FOOTER);

    // Main heading
    slide.addText("Turn & Talk", {
      x: 0.5, y: 0.85, w: 9.0, h: 0.65,
      fontSize: 32, fontFace: FONT_H, color: C.WHITE,
      bold: true, align: "center", margin: 0,
    });

    slide.addText(
      "What is the SAME and DIFFERENT about using\nbase-10 blocks versus an abacus to represent a number?",
      {
        x: 0.5, y: 1.58, w: 9.0, h: 0.8,
        fontSize: 16, fontFace: FONT_B, color: C.LIGHT,
        align: "center", margin: 0,
      }
    );

    // Key takeaways card
    addCard(slide, 0.5, 2.55, 9.0, 2.35, {
      fill: "1A2F52",
      shadow: { type: "outer", blur: 8, offset: 3, color: "000000", opacity: 0.18 },
    });

    slide.addText("Key Takeaways", {
      x: 0.75, y: 2.65, w: 8.5, h: 0.35,
      fontSize: 15, fontFace: FONT_H, color: "0F7F8C",
      bold: true, align: "left", margin: 0,
    });

    const takeaways = [
      "Position determines value — not size. A circle on the TTh line = 10 000; on the O line = 1.",
      "Zero is a placeholder — it holds a position even when the digit is nothing.",
      "Abacus and place value charts are non-proportional — they represent number abstractly, like written digits.",
      "Always read and draw left to right: Ten-Thousands \u2192 Thousands \u2192 Hundreds \u2192 Tens \u2192 Ones.",
    ];
    takeaways.forEach((t, i) => {
      slide.addText(t, {
        x: 0.85, y: 3.07 + i * 0.43, w: 8.3, h: 0.38,
        fontSize: 12, fontFace: FONT_B, color: C.CREAM,
        align: "left", margin: 0, bullet: true,
      });
    });

    // Next lesson teaser
    slide.addText("Next lesson: Comparing and ordering whole numbers to 99 999", {
      x: 0.5, y: 5.0, w: 9.0, h: 0.3,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED,
      align: "center", italic: true, margin: 0,
    });

    slide.addNotes(s12notes);
  }

  // =========================================================================
  // Write file
  // =========================================================================
  await pres.writeFile({ fileName: "output/Lesson_PV2_Non_Proportional.pptx" });
  console.log("Done: output/Lesson_PV2_Non_Proportional.pptx");
}

// ---------------------------------------------------------------------------
// Utility: thin wrapper so inline addText calls are shorter
// ---------------------------------------------------------------------------
function pres_slide_text(slide, text, x, y, w, h, opts) {
  slide.addText(text, { x, y, w, h, ...opts, margin: opts.margin ?? 0 });
}

build().catch(console.error);
