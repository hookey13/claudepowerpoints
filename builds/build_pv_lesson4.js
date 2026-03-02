// Grade 3/4 Mathematics — Place Value Sequence
// Lesson 4 of 10: Decimal Place Value (Hundredths)
// Extend Place Value & Additive Thinking

"use strict";
const pptxgen = require("pptxgenjs");
const fs = require("fs");

const {
  C, FONT_H, FONT_B, STAGE_COLORS,
  SAFE_BOTTOM, CONTENT_TOP,
  addTopBar, addStageBadge, addTitle, addCard, addFooter,
  addPlaceValueChart, addTenthsStrip, addAreaModel,
  titleSlide, liSlide, contentSlide, workedExSlide, cfuSlide,
  exitTicketSlide, closingSlide,
} = require("../themes/pv_helpers");

const FOOTER = "Lesson 4 of 10  |  Extend Place Value & Additive Thinking  |  Grade 3/4 Maths";

// ─── Helper: draw a decimal-point dot between chart columns ─────────────────
function addDecimalDot(slide, x, y, opts) {
  const o = opts || {};
  slide.addShape("roundRect", {
    x: x - 0.07, y: y + 1.04, w: 0.14, h: 0.14, rectRadius: 0.07,
    fill: { color: o.color || C.CORAL },
  });
}

// ─── Helper: callout label box ───────────────────────────────────────────────
function addCallout(slide, text, x, y, w, h, opts) {
  const o = opts || {};
  const fill = o.fill || C.AMBER;
  const textColor = o.textColor || C.WHITE;
  const fontSize = o.fontSize || 13;
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: fill },
  });
  slide.addText(text, {
    x, y, w, h,
    fontSize, fontFace: FONT_B, color: textColor,
    align: "center", valign: "middle", bold: true, margin: 0,
  });
}

async function build() {
  if (!fs.existsSync("output")) fs.mkdirSync("output");

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Claude";
  pres.title = "Lesson 4: Decimal Place Value (Hundredths)";


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ═══════════════════════════════════════════════════════════════════════════
  titleSlide(
    pres,
    "Lesson 4: Decimal Place Value\n(Hundredths)",
    "Extend Place Value & Additive Thinking",
    "Grade 3/4 Mathematics  |  Lesson 4 of 10",
    `SAY:
\u2022 Welcome. Today we move one step further in place value \u2014 from tenths, which we know, into hundredths.
\u2022 A hundredth is when we cut ONE whole into 100 equal parts. By the end of this lesson you will be able to read, write, and represent hundredths.
\u2022 We are going to use a special picture called an area model to see what hundredths look like.

DO:
\u2022 Display title slide as students settle and materials are distributed (whiteboards, markers, erasers).
\u2022 Ensure SR2 and SR3 worksheets are accessible (not distributed yet).

TEACHER NOTES:
Lesson 4 is the pivot lesson of the unit \u2014 students have built tenths fluency in Lessons 1\u20133 and now extend to hundredths. The conceptual leap here is understanding that hundredths is a further partitioning of the whole; one tenth can itself be divided into ten equal pieces (each is one hundredth). This lesson uses area models (10\u00d710 grids) as the primary representational tool, complemented by the place value chart to anchor symbolic notation. Keep the atmosphere calm and curious \u2014 hundredths feel small but the idea is powerful.

WATCH FOR:
\u2022 Students who have shaky tenths understanding from earlier lessons \u2014 the warm-up (Stage 1) will reveal these students; note them for targeted support during guided practice.
\u2022 Pace: Stage 2 is content-heavy (20 min); keep choral responses brisk to maintain engagement.

[Maths: Stage 2 \u2013 Working with Decimals | VTLM 2.0: Building Knowledge]`
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — LI & SC
  // ═══════════════════════════════════════════════════════════════════════════
  liSlide(
    pres,
    [
      "We will learn how to represent the place value of decimal numbers.",
    ],
    [
      "I can write the decimal number to match a picture.",
      "I can represent decimal numbers using a picture.",
      "I can represent decimal numbers using place value charts.",
    ],
    `SAY:
\u2022 Read the Learning Intention together: \u201CWe will learn how to represent the place value of decimal numbers.\u201D
\u2022 This means we want to be able to go in both directions: see a picture \u2192 write the number; see a number \u2192 draw the picture.
\u2022 Read each Success Criteria. Explain: by the end of the lesson I expect every student to achieve all three \u2014 these are not targets for some; they are targets for everyone.
\u2022 Ask: \u201CWhich success criteria do you feel most confident about RIGHT NOW? Hold up 1, 2, or 3 fingers.\u201D (Quick temperature check \u2014 no wrong answer; just honest.)

DO:
\u2022 Point to each SC as you read it.
\u2022 Briefly note which SC links to which activity: SC1 \u2192 Exit Ticket, SC2 \u2192 SR3, SC3 \u2192 class examples.

TEACHER NOTES:
The single learning intention is deliberately broad to encompass both directions of representation \u2014 reading and writing decimals. The three success criteria are sequenced: write from picture (receptive), draw from number (expressive), use symbolic place value chart (abstract). This CPA (Concrete-Pictorial-Abstract) arc underpins the lesson sequence. Sharing the criteria at the start primes students to self-monitor and builds metacognitive habit.

WATCH FOR:
\u2022 Students who give a confident \u201C3\u201D before instruction \u2014 flag as potential extenders for the unshaded decimal challenge in Stage 4.
\u2022 Students who give \u201C1\u201D \u2014 prioritise these students for proximity and verbal check-ins during guided practice.

[Maths: Stage 2 | VTLM 2.0: Goal Setting]`,
    FOOTER
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — Stage 1: Tenths Warm-Up
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["1"];
    addTopBar(s, stageColor);
    addStageBadge(s, 1, "Activate Prior Knowledge");
    addTitle(s, "Warm-Up: Tenths Review", { y: 0.65, fontSize: 22, color: stageColor });
    addFooter(s, FOOTER);

    // Left column — task instructions
    addCard(s, 0.5, CONTENT_TOP, 4.2, 3.6, { strip: stageColor });
    s.addText("Show Me Boards", {
      x: 0.75, y: CONTENT_TOP + 0.1, w: 3.8, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: stageColor, bold: true, margin: 0,
    });
    s.addText([
      { text: "Round 1:", options: { bold: true, breakLine: true, fontSize: 13 } },
      { text: "Match each tenths strip to its decimal.\nWrite on your whiteboard.", options: { breakLine: true, fontSize: 12 } },
      { text: "\nRound 2:", options: { bold: true, breakLine: true, fontSize: 13 } },
      { text: "I call a decimal. Draw the tenths strip on your board.", options: { breakLine: true, fontSize: 12 } },
      { text: "\nDecimals I will call: 0.1, 0.9, 0.4, 0.8", options: { fontSize: 12, bold: true } },
    ], {
      x: 0.75, y: CONTENT_TOP + 0.5, w: 3.8, h: 2.9,
      fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });

    // Right column — tenths strips
    const stripX = 5.1;
    const stripW = 4.4;
    const startY = CONTENT_TOP + 0.05;
    const decimals = [0.5, 0.3, 0.7, 0.2];
    const filled  = [5, 3, 7, 2];

    decimals.forEach((dec, i) => {
      const sy = startY + i * 0.82;
      addTenthsStrip(s, stripX, sy, stripW - 0.7, filled[i], { fillColor: C.TEAL, h: 0.42 });
      // Label
      s.addText(String(dec), {
        x: stripX + stripW - 0.5, y: sy, w: 0.6, h: 0.42,
        fontSize: 16, fontFace: FONT_H, color: stageColor,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
    });

    // CFU reminder banner
    s.addShape("roundRect", {
      x: 0.5, y: 4.55, w: 9, h: 0.45, rectRadius: 0.08,
      fill: { color: stageColor },
    });
    s.addText("CFU \u2014 Show Me Boards: Non-volunteers explain. \u201CThere are 10 equal parts and ___ are shaded. This is ___ tenths.\u201D", {
      x: 0.6, y: 4.55, w: 8.8, h: 0.45,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", margin: 0,
    });

    s.addNotes(`SAY:
\u2022 \u201CLet\u2019s warm up our brains with tenths \u2014 our building block for today.\u201D
\u2022 ROUND 1: Display each strip on screen. \u201CHow many tenths are shaded? Write the decimal on your board.\u201D
\u2022 After each: \u201CShow me!\u201D \u2014 scan boards, select a non-volunteer.
\u2022 Non-volunteer script: \u201CThere are 10 equal parts and [5] are shaded. This is [5] tenths, or zero point five.\u201D
\u2022 ROUND 2: \u201CNow I say the decimal \u2014 you draw the strip. 0.1 \u2026 show me. 0.9 \u2026 show me. 0.4 \u2026 show me. 0.8 \u2026 show me.\u201D
\u2022 After boards up: \u201CDo we all agree? How do we know the representations are correct even if they look slightly different?\u201D

DO:
\u2022 Circulate as students write \u2014 note any who write \u201C5\u201D instead of \u201C0.5\u201D (missing zero before decimal point).
\u2022 Call non-volunteers (not hands up); use name sticks or random selector.
\u2022 For Round 2, accept strips in any orientation as long as exactly the right number of segments are filled.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
\u2022 \u201CShow me\u201D after each strip \u2014 scan all boards in 3 seconds.
\u2022 Select a non-volunteer: \u201C[Name], explain to the class what you wrote and why.\u201D
\u2022 Expected: \u201CThere are 10 equal parts and 5 are shaded. This is 5 tenths, or 0.5.\u201D
\u2022 Look for: Correct fraction + decimal language; zero before decimal point; correct count of segments in Round 2.
PROCEED: Transition to Stage 2 when 80%+ of boards show correct decimals in both rounds.
PIVOT: If students are writing fractions only (e.g., 5/10) without the decimal, pause and model: \u201CWe can also write this as zero point five \u2014 the decimal point sits between the ones and the tenths. Watch.\u201D Show on chart. Re-check with one more example.

TEACHER NOTES:
This warm-up activates the tenths schema students need to make sense of hundredths. The critical link is that tenths strips and area model rows are equivalent representations. Students who are confident here will find the hundredths extension accessible. The Show Me Boards technique keeps all students accountable and gives you real-time data on readiness. The language scaffold (\u201CThere are 10 equal parts and ___ are shaded\u201D) is deliberately identical to the hundredths language used in Stage 2, so students will hear familiar patterns when new content is introduced.

WATCH FOR:
\u2022 Students writing the digit only (e.g., 5) without the decimal point format (0.5) \u2014 address immediately; the decimal point is essential notation.
\u2022 Students who draw strips with unequal segments \u2014 reinforce that ALL 10 parts must be exactly equal (otherwise the fraction is not a tenth).
\u2022 Readiness signal: Students explain using fraction AND decimal language without prompting.

[Maths: Stage 2 \u2013 Decimal Fractions | VTLM 2.0: Activate Prior Knowledge]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — Stage 2: The Area Model — 1 Whole
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["2"];
    addTopBar(s, stageColor);
    addStageBadge(s, 2, "Explicit Instruction (I Do)");
    addTitle(s, "The Area Model: One Whole Divided into 100 Parts", { y: 0.65, fontSize: 20, color: stageColor });
    addFooter(s, FOOTER);

    // Left column — explanation card
    addCard(s, 0.5, CONTENT_TOP, 4.2, SAFE_BOTTOM - CONTENT_TOP, { strip: stageColor });
    s.addText([
      { text: "This square = 1 whole", options: { bold: true, breakLine: true, fontSize: 13 } },
      { text: "\nPair-Share:", options: { bold: true, breakLine: true, fontSize: 13, color: C.AMBER } },
      { text: "How many smaller squares can you count?", options: { breakLine: true, fontSize: 12 } },
      { text: "\nThink:", options: { bold: true, breakLine: true, fontSize: 12 } },
      { text: "How many rows? \u2192", options: { breakLine: true, fontSize: 12 } },
      { text: "How many columns? \u2192", options: { breakLine: true, fontSize: 12 } },
      { text: "Total = rows \u00d7 columns", options: { breakLine: true, fontSize: 12 } },
      { text: "\n10 rows \u00d7 10 columns = 100 small squares", options: { bold: true, breakLine: true, fontSize: 13, color: stageColor } },
      { text: "\nEach small square = 1 out of 100", options: { fontSize: 12 } },
    ], {
      x: 0.75, y: CONTENT_TOP + 0.12, w: 3.8, h: SAFE_BOTTOM - CONTENT_TOP - 0.2,
      fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });

    // Right column — blank area model (3.5" square, fits within safe zone)
    // Badge first (above grid), then grid starts 0.38" lower
    s.addShape("roundRect", {
      x: 5.1, y: CONTENT_TOP, w: 2.2, h: 0.32, rectRadius: 0.08,
      fill: { color: C.AMBER },
    });
    s.addText("Pair-Share", {
      x: 5.1, y: CONTENT_TOP, w: 2.2, h: 0.32,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    const gridY4 = CONTENT_TOP + 0.38;
    addAreaModel(s, 5.1, gridY4, 3.0, 0, 0);

    // Row/column callouts (within safe zone)
    s.addText("10 columns", {
      x: 5.1, y: gridY4 + 3.05, w: 3.0, h: 0.25,
      fontSize: 11, fontFace: FONT_B, color: stageColor,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText("10\nrows", {
      x: 4.65, y: gridY4 + 0.5, w: 0.42, h: 2.2,
      fontSize: 10, fontFace: FONT_B, color: stageColor,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    s.addNotes(`SAY:
\u2022 \u201CThis large square represents 1 whole \u2014 just like a whole pizza or a whole piece of paper.\u201D
\u2022 \u201CTurn and tell your partner: how many smaller squares are inside this big square?\u201D [Wait 30 seconds.]
\u2022 \u201CHow did you work it out?\u201D \u2014 accept strategies; guide towards rows \u00d7 columns.
\u2022 \u201C10 rows times 10 columns gives us 100 equal squares. That means we have divided 1 whole into 100 equal parts.\u201D

DO:
\u2022 Display the blank area model \u2014 do not pre-label it.
\u2022 Give genuine think time (15\u201320 seconds) before calling on pairs.
\u2022 Write \u201C10 \u00d7 10 = 100\u201D on the whiteboard as students confirm the count.
\u2022 Draw attention to the similarity with the tenths strip: \u201CRemember our tenths strip had 10 parts? Now each of THOSE parts has been cut into 10 again \u2014 so 10 \u00d7 10 = 100.\u201D

CFU CHECKPOINT:
Technique: Pair-Share
Script:
\u2022 \u201CTurn and tell your partner how many smaller squares are in the big square.\u201D
\u2022 After sharing: \u201CWho can tell me the answer and explain how they worked it out?\u201D
\u2022 Look for: Students using multiplicative thinking (10 \u00d7 10) rather than counting every square.
PROCEED: Once students confirm 100 squares and can connect it to tenths (10 parts \u00d7 10 parts), move to Slide 5.
PIVOT: If students just say \u201C100\u201D without explaining the structure, ask \u201CHow do you KNOW it\u2019s 100? Show me another way to check.\u201D Direct to rows \u00d7 columns.

TEACHER NOTES:
The area model (10\u00d710 grid) is the central representation for this lesson. It is chosen because it shows BOTH tenths (columns) and hundredths (individual cells) simultaneously, making the multiplicative relationship visible. When students articulate \u201C10 rows \u00d7 10 columns\u201D they are doing the conceptual work that underpins understanding why 10 hundredths equals 1 tenth. The Pair-Share here is not merely procedural \u2014 the act of explaining to a partner embeds the concept. Resist telling students the answer before they discuss.

WATCH FOR:
\u2022 Students counting every individual square \u2014 this is valid but inefficient; nudge them toward the multiplicative structure.
\u2022 Students who say \u201C100 squares\u201D but cannot explain HOW they know \u2014 these students may struggle later; probe with \u201CAnd if there were 20 rows instead, how many squares would there be?\u201D

[Maths: Stage 2 \u2013 Decimal Fractions | VTLM 2.0: Explicit Teaching]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 5 — Stage 2: 1 Hundredth = 0.01
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["2"];
    addTopBar(s, stageColor);
    addStageBadge(s, 2, "Explicit Instruction (I Do)");
    addTitle(s, "One Hundredth = 0.01", { y: 0.65, fontSize: 22, color: stageColor });
    addFooter(s, FOOTER);

    // Area model \u2014 1 square filled
    addAreaModel(s, 0.5, CONTENT_TOP, 3.0, 0, 1, { fillColor: C.CORAL });

    // Fraction label — y = 1.3 + 3.1 = 4.4", h=0.35 → ends at 4.75" (within safe zone)
    s.addText("1 square shaded  =  1 out of 100  =  1/100", {
      x: 0.5, y: CONTENT_TOP + 3.1, w: 3.0, h: 0.35,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL,
      align: "center", valign: "middle", margin: 0,
    });

    // Place value chart \u2014 three columns: Ones, Tenths, Hundredths
    // Draw chart at right; add decimal point manually between Tenths and Hundredths
    const chartX = 4.3;
    const chartY = CONTENT_TOP + 0.1;
    addPlaceValueChart(s, chartX, chartY, ["Ones", "Tenths", "Hundredths"], ["0", "0", "1"], {
      cellW: 1.5, headerColor: stageColor,
    });
    // Decimal point between Tenths and Hundredths columns (after column index 1, i.e. between x=chartX+1.5 and chartX+3.0)
    addDecimalDot(s, chartX + 3.0, chartY, { color: C.CORAL });

    // Decimal notation callout
    addCallout(s, "0.01", 4.3, CONTENT_TOP + 1.55, 2.2, 0.9, { fill: stageColor, textColor: C.WHITE, fontSize: 36 });

    // "one hundredth" label
    s.addText("one hundredth", {
      x: 6.7, y: CONTENT_TOP + 1.6, w: 3.0, h: 0.9,
      fontSize: 17, fontFace: FONT_B, color: C.CHARCOAL,
      align: "left", valign: "middle", italic: true, margin: 0,
    });

    // Choral repeat prompt
    s.addShape("roundRect", {
      x: 4.3, y: CONTENT_TOP + 2.6, w: 5.2, h: 0.52, rectRadius: 0.08,
      fill: { color: C.AMBER },
    });
    s.addText("\u201CZero point zero one.\u201D  \u2014 Say it together!", {
      x: 4.3, y: CONTENT_TOP + 2.6, w: 5.2, h: 0.52,
      fontSize: 13, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Hundredths pointer annotation
    s.addText("\u2191 Hundredths column", {
      x: 4.3 + 3.0, y: chartY + 1.28, w: 2.2, h: 0.28,
      fontSize: 10, fontFace: FONT_B, color: C.CORAL,
      align: "center", valign: "middle", margin: 0,
    });

    s.addNotes(`SAY:
\u2022 \u201CI am going to shade just ONE small square in our area model.\u201D [Point.] \u201CThis one square is 1 out of 100 equal parts \u2014 we call it ONE HUNDREDTH.\u201D
\u2022 \u201CLook at our place value chart. We have a new column today \u2014 Hundredths. It sits to the RIGHT of the Tenths column.\u201D
\u2022 \u201COne hundredth: 0 ones, 0 tenths, 1 hundredth. As a decimal we write: zero point zero one.\u201D
\u2022 Point to the chart: \u201CAnd there\u2019s our decimal point \u2014 it separates the ones from the parts.\u201D
\u2022 \u201CEveryone: zero point zero one.\u201D [Pause.] \u201CAgain.\u201D

DO:
\u2022 Physically point to: (1) the shaded square, (2) the fraction 1/100, (3) the Hundredths column, (4) the decimal 0.01 \u2014 in that order.
\u2022 Lead choral repetition TWICE: \u201Czero point zero one.\u201D
\u2022 Write 0.01 large on the board alongside the chart.

CFU CHECKPOINT:
Technique: Choral Response
Script:
\u2022 \u201CEverybody: how do we read this decimal?\u201D [Point to 0.01.]
\u2022 Expected choral response: \u201Czero point zero one\u201D (accept \u201Cone hundredth\u201D as equivalent).
\u2022 Look for: All voices joining; correct pronunciation of BOTH zeros; no students saying \u201Czero point one.\u201D
PROCEED: When all (or nearly all) students produce the correct choral response on the second attempt.
PIVOT: If a significant number say \u201Czero point one\u201D (missing the middle zero), stop and compare 0.01 and 0.1 side by side on the chart. \u201CLet\u2019s look carefully: 0.1 has a digit in the tenths column. 0.01 has a zero in tenths and a ONE in hundredths. They are very different!\u201D Re-choral after comparison.

TEACHER NOTES:
The place value chart with a Hundredths column is the key symbolic anchor for this concept. Students need to see that the digit \u201C1\u201D sits in the third column (hundredths), not the second (tenths). The double zero in \u201C0.01\u201D is a common error source \u2014 students read only one zero after the decimal point, arriving at 0.1. The choral repetition builds phonological memory of the correct decimal reading. The MISCONCEPTIONS section below addresses the most common confusions at this precise moment of instruction.

MISCONCEPTIONS:
\u2022 Misconception: Students write or say 0.1 when they mean 0.01 (confuse tenths and hundredths columns).
  Why: The symbol 0.01 looks similar to 0.1 to a student not yet tracking column positions. Students may focus on the \u201C1\u201D and ignore the zero placeholder in the tenths column.
  Impact: Persistent place value confusion that will cause errors in all decimal operations (addition, comparison, rounding).
  Quick correction: Place 0.01 and 0.1 in the chart side by side. Ask: \u201CWhich column is the 1 in for each one?\u201D Make the column position explicit.

\u2022 Misconception: Students think hundredths are BIGGER than tenths (because 100 > 10).
  Why: Students apply whole-number reasoning \u2014 a larger denominator feels like a bigger number rather than a smaller piece.
  Impact: Incorrect ordering and comparison of decimals.
  Quick correction: Return to the area model \u2014 show one shaded column (tenth) vs one shaded cell (hundredth). \u201CWhich is bigger? The column or the tiny square?\u201D The visual resolves the confusion.

WATCH FOR:
\u2022 Students saying \u201Cone hundredth\u201D correctly but writing \u201C0.1\u201D on their whiteboard \u2014 the disconnect between oral and symbolic is a key diagnostic.
\u2022 Readiness signal: Students point independently to the hundredths column when asked \u201CWhere does the 1 live in 0.01?\u201D

[Maths: Stage 2 \u2013 Decimal Fractions | VTLM 2.0: Explicit Teaching]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 6 — Stage 2: Counting Hundredths — 0.07 and linking to tenths
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["2"];
    addTopBar(s, stageColor);
    addStageBadge(s, 2, "Explicit Instruction (I Do)");
    addTitle(s, "Counting Hundredths: 0.07 and the Tenths Link", { y: 0.65, fontSize: 20, color: stageColor });
    addFooter(s, FOOTER);

    // --- Left model: 7 hundredths ---
    addAreaModel(s, 0.5, CONTENT_TOP, 2.8, 0, 7, { fillColor: C.CORAL });
    s.addText("7 squares = 7/100 = 0.07\n\u201CSeven hundredths\u201D", {
      x: 0.5, y: CONTENT_TOP + 2.9, w: 2.8, h: 0.5,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL,
      align: "center", valign: "middle", bold: false, margin: 0,
    });
    addCallout(s, "0.07", 0.5, CONTENT_TOP + 3.45, 2.8, 0.5, { fill: C.CORAL, fontSize: 22 });

    // --- Middle model: 10 hundredths = 1 column = 0.1 ---
    addAreaModel(s, 3.6, CONTENT_TOP, 2.8, 1, 0, { fillColor: C.TEAL });
    s.addText("10 squares = 1 full column\n= 1/10 = 0.1", {
      x: 3.6, y: CONTENT_TOP + 2.9, w: 2.8, h: 0.5,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL,
      align: "center", valign: "middle", margin: 0,
    });
    addCallout(s, "0.1", 3.6, CONTENT_TOP + 3.45, 2.8, 0.5, { fill: C.TEAL, fontSize: 22 });

    // --- Right: key takeaway card ---
    addCard(s, 6.65, CONTENT_TOP, 3.0, SAFE_BOTTOM - CONTENT_TOP, { strip: stageColor });
    s.addText("Key Link", {
      x: 6.9, y: CONTENT_TOP + 0.1, w: 2.6, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: stageColor, bold: true, margin: 0,
    });
    s.addText([
      { text: "10 hundredths", options: { bold: true, fontSize: 13, breakLine: true } },
      { text: "= 1 tenth", options: { fontSize: 13, breakLine: true } },
      { text: "\n10 \u00d7 0.01 = 0.1", options: { bold: true, fontSize: 13, color: stageColor, breakLine: true } },
      { text: "\nJust like:\n10 ones = 1 ten", options: { fontSize: 11, breakLine: false } },
    ], {
      x: 6.9, y: CONTENT_TOP + 0.5, w: 2.6, h: 2.0,
      fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });

    // Choral badge
    s.addShape("roundRect", {
      x: 6.65, y: CONTENT_TOP + 2.7, w: 3.0, h: 0.42, rectRadius: 0.08,
      fill: { color: C.AMBER },
    });
    s.addText("Choral: \u201Cseven hundredths \u2014 zero point zero seven\u201D", {
      x: 6.65, y: CONTENT_TOP + 2.7, w: 3.0, h: 0.42,
      fontSize: 9, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    s.addNotes(`SAY:
\u2022 \u201CNow I\u2019m going to shade 7 squares. Count with me as I shade.\u201D [Count aloud: 1, 2, 3, 4, 5, 6, 7.]
\u2022 \u201C7 squares = 7 hundredths. As a decimal: zero point zero seven.\u201D
\u2022 CHORAL: \u201CSay it with me \u2014 seven hundredths \u2014 zero point zero seven.\u201D
\u2022 \u201CNow look at the middle model. I keep shading until an entire COLUMN is filled. How many squares in one column?\u201D [10.]
\u2022 \u201C10 hundredths = 1 tenth = 0.1. A full column is worth exactly the same as ONE tenth from our tenths strip.\u201D
\u2022 \u201CThis is a KEY idea: 10 hundredths make 1 tenth, just like 10 ones make 1 ten in whole numbers.\u201D

DO:
\u2022 Point explicitly to the left model (0.07) and say the decimal.
\u2022 Lead choral response twice.
\u2022 Draw a bracket or arrow connecting the column of 10 shaded squares to a tenths strip if you have one on a physical chart nearby.
\u2022 Write the equation \u201C10 \u00d7 0.01 = 0.1\u201D on the board after students confirm verbally.

CFU CHECKPOINT:
Technique: Choral Response
Script:
\u2022 Point to the left model: \u201CHow do we read this decimal?\u201D \u2192 \u201CZero point zero seven.\u201D
\u2022 Point to the middle model: \u201CAnd this one?\u201D \u2192 \u201CZero point one.\u201D
\u2022 \u201CHold up fingers: how many hundredths equal one tenth?\u201D \u2192 [10 fingers.]
\u2022 Look for: Uniform choral response; no students saying \u201Czero point seven\u201D for 0.07; all holding 10 fingers.
PROCEED: When students articulate the 10 hundredths = 1 tenth relationship.
PIVOT: If students say \u201Czero point seven\u201D for 0.07, return to the chart and emphasise the ZERO in the tenths column: \u201CThere is NOTHING in the tenths column \u2014 we MUST write a zero there as a placeholder.\u201D Use chart to show the two zeros after the decimal point mapping to tenths=0, hundredths=7.

MISCONCEPTIONS:
\u2022 Misconception: Students write 0.010 instead of 0.10 or 0.1 for a full column (thinking 10 hundredths = \u201Czero point zero ten\u201D).
  Why: Students apply the pattern from 0.07 (zero in tenths column) to 10 hundredths, not recognising that 10 hundredths regroups into the tenths column.
  Impact: Students will fail to regroup correctly when adding decimals, producing answers like 0.015 when they should get 0.15.
  Quick correction: Physically regroup on the chart: \u201CWhen we get 10 hundredths, they trade up to 1 tenth \u2014 just like 10 ones trade for 1 ten. Remove the 10 from hundredths, add 1 to tenths.\u201D

TEACHER NOTES:
The critical learning on this slide is the multiplicative link: 10 hundredths = 1 tenth. This mirrors the whole-number place value relationship (10 ones = 1 ten) and is the key to preventing later confusion when students add decimals. The two area models side by side make the visual relationship clear \u2014 seven scattered cells vs. one full column. Spend adequate time on the comparison; do not rush to the combined decimals on the next slide until students can articulate \u201C10 hundredths = 1 tenth\u201D independently.

WATCH FOR:
\u2022 Students who correctly say 0.07 but write 0.7 \u2014 oral/written disconnect needs immediate correction.
\u2022 Students who claim 0.1 and 0.10 are different \u2014 address this: trailing zeros after the last significant digit in a decimal do not change its value.

[Maths: Stage 2 \u2013 Decimal Fractions | VTLM 2.0: Explicit Teaching]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 7 — Stage 2: Tenths and Hundredths Together — 0.31
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["2"];
    addTopBar(s, stageColor);
    addStageBadge(s, 2, "Explicit Instruction (I Do)");
    addTitle(s, "Tenths and Hundredths Together: 0.31", { y: 0.65, fontSize: 22, color: stageColor });
    addFooter(s, FOOTER);

    // Area model: 3 full columns + 1 extra cell
    addAreaModel(s, 0.5, CONTENT_TOP, 3.5, 3, 1, { fillColor: C.TEAL, extraColor: C.CORAL });

    // Legend for colours
    s.addShape("roundRect", { x: 0.5, y: CONTENT_TOP + 3.6, w: 0.24, h: 0.24, rectRadius: 0.05, fill: { color: C.TEAL } });
    s.addText("3 full columns = 3 tenths", {
      x: 0.82, y: CONTENT_TOP + 3.6, w: 2.9, h: 0.24,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
    });
    s.addShape("roundRect", { x: 0.5, y: CONTENT_TOP + 3.9, w: 0.24, h: 0.24, rectRadius: 0.05, fill: { color: C.CORAL } });
    s.addText("1 extra cell = 1 hundredth", {
      x: 0.82, y: CONTENT_TOP + 3.9, w: 2.9, h: 0.24,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
    });

    // Right side — explanations
    addCard(s, 4.3, CONTENT_TOP, 5.2, 2.4, { strip: stageColor });
    s.addText([
      { text: "31 squares shaded = 31/100", options: { bold: true, breakLine: true, fontSize: 14 } },
      { text: "\u201Cthirty-one hundredths\u201D", options: { italic: true, breakLine: true, fontSize: 13 } },
      { text: "\nAlso read as:", options: { bold: true, breakLine: true, fontSize: 13 } },
      { text: "3 tenths and 1 hundredth", options: { breakLine: true, fontSize: 13 } },
    ], {
      x: 4.55, y: CONTENT_TOP + 0.1, w: 4.8, h: 2.1,
      fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });

    // Place value chart
    const chartX = 4.3;
    const chartY = CONTENT_TOP + 2.55;
    addPlaceValueChart(s, chartX, chartY, ["Ones", "Tenths", "Hundredths"], ["0", "3", "1"], {
      cellW: 1.5, headerColor: stageColor,
    });
    addDecimalDot(s, chartX + 3.0, chartY, { color: C.CORAL });

    // Decimal callout
    addCallout(s, "0.31", 7.6, CONTENT_TOP + 2.55, 1.7, 1.22, { fill: stageColor, fontSize: 26 });

    // Partitioning equation
    s.addShape("roundRect", {
      x: 4.3, y: 4.52, w: 5.2, h: 0.42, rectRadius: 0.08,
      fill: { color: C.AMBER, transparency: 15 },
    });
    s.addText("0.31 = 0.3 + 0.01    (3 tenths + 1 hundredth)", {
      x: 4.3, y: 4.52, w: 5.2, h: 0.42,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    s.addNotes(`SAY:
\u2022 \u201CNow we are going to shade more squares \u2014 3 full columns, which we know is 3 tenths, PLUS 1 extra square.\u201D
\u2022 \u201CCount the shaded squares with me.\u201D [Count: 10, 20, 30 \u2014 slapping each column \u2014 then 31.]
\u2022 \u201C31 squares = 31 hundredths. We can also say thirty-one hundredths.\u201D
\u2022 \u201CBut look at what we know: 3 full columns is 3 tenths, and 1 extra cell is 1 hundredth. So we can ALSO say: 3 tenths and 1 hundredth.\u201D
\u2022 \u201CLook at the place value chart: 0 in ones, 3 in tenths, 1 in hundredths. We write this as 0.31.\u201D
\u2022 \u201CNotice the partitioning: 0.31 = 0.3 + 0.01. The 0.3 is our tenths part, the 0.01 is our hundredths part.\u201D
\u2022 \u201CWhiteboard CFU coming up \u2014 listen carefully.\u201D

DO:
\u2022 Use two different colours (or physically point to teal vs coral cells) to distinguish tenths and hundredths components.
\u2022 Write 0.31 = 0.3 + 0.01 on the board in front of students.
\u2022 Prepare students for the whiteboard task on the next slide.

CFU CHECKPOINT:
Technique: Show Me Boards (Whiteboard CFU)
Script:
\u2022 \u201COn your whiteboard, write 0.31 as an addition: ___ + ___. Go.\u201D
\u2022 \u201CShow me.\u201D [Scan boards.]
\u2022 Select non-volunteer: \u201C[Name], read your equation aloud.\u201D Expected: \u201C0.3 plus 0.01.\u201D
\u2022 Look for: Correct partition (0.3 + 0.01, not 0.30 + 0.01 or 0.3 + 0.1).
PROCEED: When majority write 0.3 + 0.01 correctly.
PIVOT: If students write 0.3 + 0.1 (the most common error \u2014 doubling the tenths), ask: \u201CIf 0.3 + 0.1 = 0.4, does that equal 0.31? Let\u2019s check.\u201D Guide students to see that 0.1 \u2260 0.01.

MISCONCEPTIONS:
\u2022 Misconception: Students write 0.31 as \u201C0.3 and 0.1\u201D (i.e., 0.3 + 0.1) rather than 0.3 + 0.01.
  Why: Seeing three shaded columns and one extra cell, students may read the extra cell as \u201Canother tenth\u201D rather than a hundredth, especially if the hundredths column is not yet anchored in their mental model.
  Impact: Direct calculation error; 0.3 + 0.1 = 0.4, not 0.31.
  Quick correction: Return to the place value chart. \u201CPoint to where the 1 lives. Which column? Hundredths. So it\u2019s worth 0.01, not 0.1.\u201D

TEACHER NOTES:
This slide introduces the combined reading of a decimal with both tenths and hundredths \u2014 the first truly two-component decimal. The partitioning equation (0.31 = 0.3 + 0.01) is central to Stage 4 independent practice and the Exit Ticket. Students need to understand that the digit in the tenths column represents a multiple of 0.1, and the digit in the hundredths column a multiple of 0.01. The dual reading (\u201Cthirty-one hundredths\u201D and \u201C3 tenths and 1 hundredth\u201D) builds flexible thinking about decimal notation. The visual two-colour area model makes this concrete.

WATCH FOR:
\u2022 Students who correctly write 0.31 but cannot explain where each digit comes from \u2014 probe with: \u201CWhat does the 3 tell us? What does the 1 tell us?\u201D
\u2022 Students who write 3.1 instead of 0.31 \u2014 they are ignoring the decimal point structure; reinforce with chart.

[Maths: Stage 2 \u2013 Decimal Fractions | VTLM 2.0: Explicit Teaching]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 8 — Stage 2: Partitioning CFU — 0.27
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["2"];
    addTopBar(s, stageColor);
    addStageBadge(s, 2, "Explicit Instruction (I Do)");
    addTitle(s, "Partitioning: 0.27 = 0.2 + 0.07", { y: 0.65, fontSize: 22, color: stageColor });
    addFooter(s, FOOTER);

    // Area model: 2 full columns + 7 extra cells
    addAreaModel(s, 0.5, CONTENT_TOP, 3.5, 2, 7, { fillColor: C.TEAL, extraColor: C.CORAL });

    // Legend
    s.addShape("roundRect", { x: 0.5, y: CONTENT_TOP + 3.6, w: 0.22, h: 0.22, rectRadius: 0.05, fill: { color: C.TEAL } });
    s.addText("2 tenths", {
      x: 0.78, y: CONTENT_TOP + 3.58, w: 1.5, h: 0.26,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
    });
    s.addShape("roundRect", { x: 2.5, y: CONTENT_TOP + 3.6, w: 0.22, h: 0.22, rectRadius: 0.05, fill: { color: C.CORAL } });
    s.addText("7 hundredths", {
      x: 2.78, y: CONTENT_TOP + 3.58, w: 1.5, h: 0.26,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
    });

    // Right: CFU prompt card
    addCard(s, 4.3, CONTENT_TOP, 5.2, 3.7, { strip: stageColor });
    s.addText("CFU \u2014 Show Me Boards", {
      x: 4.55, y: CONTENT_TOP + 0.1, w: 4.7, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: stageColor, bold: true, margin: 0,
    });
    s.addText([
      { text: "Task 1:", options: { bold: true, breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: "Write this as a decimal.", options: { breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: "\nTask 2:", options: { bold: true, breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: "Write as an addition:\n___ + ___", options: { breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: "\nPair-Share:", options: { bold: true, breakLine: true, fontSize: 12, color: C.AMBER } },
      { text: "How many hundredths altogether?", options: { fontSize: 12, color: C.CHARCOAL } },
    ], {
      x: 4.55, y: CONTENT_TOP + 0.5, w: 4.7, h: 2.9,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Answer reveal box
    s.addShape("roundRect", {
      x: 4.3, y: CONTENT_TOP + 3.8, w: 5.2, h: 0.55, rectRadius: 0.08,
      fill: { color: stageColor },
    });
    s.addText("Answers: 0.27  |  0.2 + 0.07  |  27 hundredths", {
      x: 4.3, y: CONTENT_TOP + 3.8, w: 5.2, h: 0.55,
      fontSize: 13, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    s.addNotes(`SAY:
\u2022 \u201CLook at this area model. On your whiteboard: write the decimal this model shows.\u201D [Wait 20 seconds.] \u201CShow me.\u201D
\u2022 Scan boards. Select non-volunteer: \u201C[Name], what decimal did you write and how did you work it out?\u201D
\u2022 \u201CGood. Now Task 2: write it as an addition \u2014 tenths plus hundredths. Go.\u201D [Wait.] \u201CShow me.\u201D
\u2022 \u201CNow Pair-Share: how many hundredths are there ALTOGETHER in 0.27? Not just in the extra column \u2014 counting ALL of them. Go.\u201D
\u2022 \u201CWho can explain? [Name]?\u201D Expected: \u201CThere are 27 hundredths altogether, because 2 tenths = 20 hundredths, plus 7 hundredths = 27 hundredths.\u201D

DO:
\u2022 Run the two whiteboard tasks sequentially \u2014 do not show tasks 1 and 2 simultaneously. Cover or reveal step by step.
\u2022 After boards show 0.27, confirm. After boards show 0.2 + 0.07, confirm.
\u2022 For the Pair-Share on \u201C27 hundredths\u201D, allow 45 seconds of pair discussion before cold-calling.
\u2022 Reveal the answer bar only after students have attempted all three tasks.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
\u2022 Task 1: \u201CShow me the decimal.\u201D Expected: 0.27 on every board.
\u2022 Task 2: \u201CShow me the addition.\u201D Expected: 0.2 + 0.07 (not 0.20 + 0.07 or 0.2 + 0.7).
\u2022 Non-volunteer explains: \u201CWhy is it 0.07 and not 0.7?\u201D \u2014 should reference the hundredths column.
\u2022 Pair-Share: 27 hundredths (2 tens = 20, so 20 + 7 = 27 hundredths).
\u2022 Look for: Zero placeholder in tenths addition term (0.07, not 0.7); correct total of 27.
PROCEED: When all boards show 0.27 and addition is correct; at least one pair can articulate 27 hundredths.
PIVOT: If students write 0.2 + 0.7, revisit the place value chart immediately: \u201C0.7 would mean 7 tenths \u2014 look at the column. The extra cells are in the HUNDREDTHS column, so they are each worth 0.01.\u201D

TEACHER NOTES:
This slide consolidates the partitioning concept before moving to guided practice. The three-task sequence (write decimal \u2192 partition \u2192 count total hundredths) builds increasingly abstract understanding. The final \u201C27 hundredths\u201D task is deliberately harder: students must understand that 2 tenths = 20 hundredths, requiring them to convert between the two units. This is precisely the multiplicative relationship that underpins decimal addition. Students who can do this confidently are ready for Stage 3; those who cannot need the supported guided practice on the SR2 resource.

WATCH FOR:
\u2022 Students who write 0.27 correctly but cannot partition it \u2014 they are reading the decimal holistically, not place-value-analytically.
\u2022 Students who say \u201C7 hundredths\u201D for the total (counting only the extra column, not converting the 2 tenths) \u2014 address this conceptual gap in guided practice.

[Maths: Stage 2 \u2013 Decimal Fractions | VTLM 2.0: Explicit Teaching]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 9 — Stage 3: Guided Practice
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["3"];
    addTopBar(s, stageColor);
    addStageBadge(s, 3, "Guided Practice (We Do)");
    addTitle(s, "Guided Practice: Read the Area Model", { y: 0.65, fontSize: 22, color: stageColor });
    addFooter(s, FOOTER);

    // 6 small area models in a 3x2 grid
    const models = [
      { t: 0, e: 8,  label: "A",  ans: "0.08" },
      { t: 0, e: 4,  label: "B",  ans: "0.04" },
      { t: 3, e: 0,  label: "C",  ans: "0.3"  },
      { t: 6, e: 0,  label: "D",  ans: "0.6"  },
      { t: 4, e: 3,  label: "E",  ans: "0.43" },
      { t: 9, e: 9,  label: "F",  ans: "0.99" },
    ];

    const gridX = 0.5;
    const gridY = CONTENT_TOP;
    const modelSize = 1.45;
    const colGap = 0.25;
    const rowGap = 0.55;
    const cols = 3;

    models.forEach((m, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const mx = gridX + col * (modelSize + colGap);
      const my = gridY + row * (modelSize + rowGap);
      addAreaModel(s, mx, my, modelSize, m.t, m.e, { fillColor: C.TEAL });
      // Label above
      s.addText(m.label, {
        x: mx, y: my - 0.28, w: modelSize, h: 0.26,
        fontSize: 13, fontFace: FONT_H, color: stageColor,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
      // Answer below (for reveal)
      addCallout(s, m.ans, mx, my + modelSize + 0.05, modelSize, 0.28, {
        fill: stageColor, textColor: C.WHITE, fontSize: 13,
      });
    });

    // Right panel — instructions
    const panelX = 5.5;
    addCard(s, panelX, CONTENT_TOP, 4.0, SAFE_BOTTOM - CONTENT_TOP, { strip: stageColor });
    s.addText("Pair-Share", {
      x: panelX + 0.2, y: CONTENT_TOP + 0.1, w: 3.5, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: stageColor, bold: true, margin: 0,
    });
    s.addText([
      { text: "For each area model:", options: { bold: true, breakLine: true, fontSize: 12 } },
      { text: "Discuss with your partner what decimal is shown.", options: { breakLine: true, fontSize: 12 } },
      { text: "\nSR2 Activity:", options: { bold: true, breakLine: true, fontSize: 12, color: stageColor } },
      { text: "Page 1: Each partner uses a DIFFERENT method (area model or place value chart) to represent the decimal.", options: { breakLine: true, fontSize: 12 } },
      { text: "\nCFU \u2014 Cold Call:", options: { bold: true, breakLine: true, fontSize: 12, color: C.CORAL } },
      { text: "\u201CThere are ___ tenths and ___ hundredths in ___.\u201D", options: { fontSize: 12 } },
    ], {
      x: panelX + 0.2, y: CONTENT_TOP + 0.5, w: 3.6, h: 3.3,
      fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });

    // Enable note
    s.addShape("roundRect", {
      x: panelX, y: CONTENT_TOP + 3.5, w: 4.0, h: 0.38, rectRadius: 0.08,
      fill: { color: C.TEAL, transparency: 20 },
    });
    s.addText("Early finishers: SR2 Page 2", {
      x: panelX, y: CONTENT_TOP + 3.5, w: 4.0, h: 0.38,
      fontSize: 11, fontFace: FONT_B, color: stageColor,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    s.addNotes(`SAY:
\u2022 \u201CYou have six area models in front of you on screen. With your partner, decide what decimal each one shows. Use the language we\u2019ve been practising: \u2018There are ___ tenths and ___ hundredths.\u2019\u201D
\u2022 \u201CI\u2019ll give you about 2 minutes, then I\u2019ll ask pairs to share.\u201D
\u2022 After pair time: Go through A\u2013F, calling non-volunteers for each. Confirm with the answer labels.
\u2022 \u201CNow open SR2, page 1. Each person in the pair picks a DIFFERENT method \u2014 one of you uses the area model, the other uses the place value chart. Represent the decimal your teacher writes on the board.\u201D
\u2022 Write 0.49 on the board as the first SR2 decimal.

DO:
\u2022 Circulate during Pair-Share \u2014 listen for correct language and correct decimal identification.
\u2022 Note pairs who struggle with Model F (0.99) \u2014 this is the most complex.
\u2022 During SR2, ensure pairs are genuinely using different methods (not both colouring an area model).
\u2022 Early finishers go directly to SR2 page 2.

CFU CHECKPOINT:
Technique: Cold Call (Non-Volunteer)
Script:
\u2022 For each model: \u201C[Name], what decimal does Model [X] show? Explain using our sentence.\u201D
\u2022 Expected: \u201CThere are [4] tenths and [3] hundredths in 0.43.\u201D
\u2022 For Model C/D (whole tenths): \u201CThere are [3] tenths and [0] hundredths in 0.3.\u201D
\u2022 Look for: Correct decimal; correct tenths/hundredths breakdown; zero acknowledgement in whole-tenths cases.
PROCEED: When majority of pairs correctly identify all six models; at least three cold-called students use the full sentence.
PIVOT: If pairs read Model A (0.08) as 0.8 \u2014 return to the chart: \u201CZero full columns means zero tenths. Eight cells means 8 hundredths. So zero tenths, 8 hundredths = 0.08.\u201D Pause class and re-model before SR2.

TEACHER NOTES:
The six models are carefully sequenced: pure hundredths (A, B) \u2192 pure tenths (C, D) \u2192 combined (E, F). This scaffolds the difficulty and reveals different misconception profiles. Students who err on A and B have not yet internalised the hundredths column; those who err on E and F have not generalised the partitioning pattern. SR2 pairs who choose different methods are practising the bidirectional nature of representation (SC2 and SC3). Circulating during SR2 is critical \u2014 this is your main formative data point before independent practice.

WATCH FOR:
\u2022 Pairs where both students use the area model on SR2 \u2014 redirect: \u201COne of you switch to the place value chart.\u201D
\u2022 Students reading Model F (0.99) as \u201C1 whole\u201D \u2014 address: \u201CNot quite \u2014 we need ONE more square to fill all 100. 99 hundredths is just less than 1 whole.\u201D

[Maths: Stage 3 \u2013 Guided Practice | VTLM 2.0: Guided Practice]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 10 — Stage 4: Independent Practice
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["4"];
    addTopBar(s, stageColor);
    addStageBadge(s, 4, "Independent Practice (You Do)");
    addTitle(s, "Independent Practice: SR3", { y: 0.65, fontSize: 22, color: stageColor });
    addFooter(s, FOOTER);

    // Left: instructions card
    addCard(s, 0.5, CONTENT_TOP, 4.5, SAFE_BOTTOM - CONTENT_TOP, { strip: stageColor });
    s.addText("SR3 Instructions", {
      x: 0.75, y: CONTENT_TOP + 0.1, w: 4.1, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: stageColor, bold: true, margin: 0,
    });
    s.addText([
      { text: "Choose EITHER:", options: { bold: true, breakLine: true, fontSize: 13 } },
      { text: "\u2022 Colour the area model to match the decimal, OR", options: { breakLine: true, fontSize: 12 } },
      { text: "\u2022 Fill in the place value grid to match.", options: { breakLine: true, fontSize: 12 } },
      { text: "\nDemonstration: 0.27", options: { bold: true, breakLine: true, fontSize: 13, color: stageColor } },
      { text: "\u2022 Tenths digit = 2 \u2192 shade 2 full columns", options: { breakLine: true, fontSize: 12 } },
      { text: "\u2022 Hundredths digit = 7 \u2192 shade 7 more cells", options: { breakLine: true, fontSize: 12 } },
      { text: "\u2022 Partition: 0.27 = 0.2 + 0.07", options: { breakLine: true, fontSize: 12 } },
      { text: "\nExtend Challenge:", options: { bold: true, breakLine: true, fontSize: 13, color: C.CORAL } },
      { text: "Record the UNSHADED decimal. What do you notice when you add both decimals?", options: { fontSize: 12 } },
    ], {
      x: 0.75, y: CONTENT_TOP + 0.5, w: 4.1, h: SAFE_BOTTOM - CONTENT_TOP - 0.65,
      fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });

    // Right: demonstration model for 0.27
    addAreaModel(s, 5.25, CONTENT_TOP, 3.0, 2, 7, { fillColor: C.TEAL, extraColor: C.CORAL });

    // Labels
    s.addText("Demo: 0.27", {
      x: 5.25, y: CONTENT_TOP - 0.02, w: 3.0, h: 0.28,
      fontSize: 13, fontFace: FONT_B, color: stageColor,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    addCallout(s, "0.2 + 0.07 = 0.27", 5.25, CONTENT_TOP + 3.1, 3.0, 0.38, {
      fill: stageColor, fontSize: 13,
    });

    // Unshaded complement
    s.addText("Unshaded = 0.73", {
      x: 5.25, y: CONTENT_TOP + 3.55, w: 3.0, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.CORAL,
      align: "center", valign: "middle", italic: true, margin: 0,
    });
    s.addText("0.27 + 0.73 = ?", {
      x: 5.25, y: CONTENT_TOP + 3.88, w: 3.0, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    s.addNotes(`SAY:
\u2022 \u201CYou are working independently now. Open SR3.\u201D
\u2022 \u201CFor each question, you choose: colour the area model OR fill the place value grid. Both are correct methods.\u201D
\u2022 \u201CWatch me do the first one \u2014 0.27. Tenths digit is 2, so I shade two whole columns.\u201D [Point.] \u201CHundredths digit is 7, so I shade 7 more cells in the next column.\u201D [Point.]
\u2022 \u201CThe partition is 0.27 = 0.2 + 0.07.\u201D
\u2022 \u201CIf you finish the main task, try the Extend: find the UNSHADED decimal and add it to the shaded decimal. What do you always get?\u201D

DO:
\u2022 Circulate and observe \u2014 do NOT answer questions immediately; ask \u201CWhat is the tenths digit? What column does it go in?\u201D to scaffold without giving the answer.
\u2022 Note students who are struggling: invite them to use the area model (pictorial) rather than the grid (abstract) first.
\u2022 Enable SR2 page 2 for students who need a stepping stone before SR3.
\u2022 For the Extend: the unshaded + shaded decimals always sum to 1 (whole). Do not reveal this \u2014 let students discover it.

TEACHER NOTES:
Stage 4 is deliberately silent and independent. The teacher\u2019s role shifts from instructor to observer and diagnostician. The choice of method (area model vs. place value grid) respects the pictorial-to-abstract gradient and allows students to self-select at their readiness level. The Extend challenge (unshaded decimal, complement to 1) is mathematically significant \u2014 it previews the concept of decimal complements and reinforces that the whole area model equals 1. Students who notice this and articulate it demonstrate strong conceptual understanding. Record names for enrichment planning.

WATCH FOR:
\u2022 Students shading columns for hundredths and cells for tenths (reversed) \u2014 redirect: \u201CWhich digit is in the tenths column? How many full columns should that be?\u201D
\u2022 Students who fill the grid correctly but cannot shade the area model \u2014 they are at the abstract level without the pictorial; support by asking them to count cells column by column.
\u2022 Readiness signal: Students self-correct by checking that the total of shaded + unshaded cells = 100.

[Maths: Stage 4 \u2013 Independent Practice | VTLM 2.0: Independent Practice]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 11 — Stage 5: Exit Ticket
  // ═══════════════════════════════════════════════════════════════════════════
  exitTicketSlide(
    pres,
    [
      "An area model shows 4 full columns shaded and 6 extra cells shaded.\n\nWhich answer correctly describes this model?\n\nA)  0.46  (4 ones and 6 tenths)\nB)  0.54  (the unshaded part)\nC)  46  (just counting all the shaded squares)\nD)  0.46  (4 tenths and 6 hundredths)  \u2190 CORRECT",
    ],
    `SAY:
\u2022 \u201CThis is your exit ticket. Work completely independently \u2014 no talking, no partner, no SR2.\u201D
\u2022 \u201CLook at the area model described: 4 full columns shaded and 6 extra cells. Choose ONE answer and write it in your workbook. Write a sentence to explain why.\u201D
\u2022 After students write: \u201CWho can explain which answer is correct and why?\u201D [Cold-call non-volunteers.]
\u2022 Discuss distractors once the correct answer is confirmed.

DO:
\u2022 Ensure all SR resources are closed or turned over.
\u2022 Allow 3\u20134 minutes for independent writing.
\u2022 Do NOT clarify the question \u2014 this is a self-assessment moment.
\u2022 After collecting answers, discuss distractors as a class.

CFU CHECKPOINT:
Technique: Hinge Question (Multiple Choice)
Script:
\u2022 \u201CWho chose D? [Name], explain your reasoning.\u201D
\u2022 Expected: \u201CThe area model shows 4 full columns which are 4 tenths, and 6 extra cells which are 6 hundredths. So the decimal is 0.46.\u201D
\u2022 Now discuss each distractor:
  \u2022 A \u2014 correct number but wrong language/understanding: says \u201C4 ones and 6 tenths\u201D \u2014 confuses place value column names.
  \u2022 B \u2014 found the complement (unshaded part = 0.54); a real mathematical result but answers the wrong question.
  \u2022 C \u2014 just counted 46 squares as a whole number, ignoring that the whole = 100 parts, not 1 part.
\u2022 Look for: Students who chose D AND can name WHY each distractor is wrong.
PROCEED: Use results to group students for next lesson warm-up.
PIVOT: If majority chose A \u2014 re-teach decimal point position and column labels at the start of Lesson 5. If majority chose C \u2014 re-emphasise the \u201Cwhole = 100 squares\u201D concept at the start of Lesson 5.

TEACHER NOTES:
The exit ticket is a hinge question designed to discriminate between four common misconception profiles. Distractor A tests whether students know column names (ones, tenths, hundredths). Distractor B tests whether students read the model (shaded) vs. its complement (unshaded) \u2014 a genuine and interesting error that shows mathematical thinking but misreads the question. Distractor C tests whether students understand that the area model represents a decimal fraction (not a whole number). Only D requires correct understanding of both the tenths and hundredths columns simultaneously. Collect workbook answers and use them to plan Lesson 5 differentiation groups.

WATCH FOR:
\u2022 Students who choose D but cannot explain why the distractors are wrong \u2014 they may have guessed correctly; probe with \u201CWhy is A wrong?\u201D
\u2022 Students who write \u201C0.46 because there are 46 squares\u201D (choosing D for wrong reasons, essentially the same logic as C) \u2014 flag for reteach.

[Maths: Stage 5 \u2013 Assessment | VTLM 2.0: Consolidation & Assessment]`,
    FOOTER
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 12 — Closing Slide
  // ═══════════════════════════════════════════════════════════════════════════
  closingSlide(
    pres,
    "In your own words, explain the relationship between tenths and hundredths. Use the area model in your explanation.",
    [
      "1 whole = 10 tenths = 100 hundredths",
      "10 hundredths = 1 tenth (10 \u00d7 0.01 = 0.1)",
      "Hundredths are written in the 3rd column after the decimal point",
      "0.31 = 3 tenths + 1 hundredth = 0.3 + 0.01",
      "The area model (10\u00d710 grid) shows both tenths AND hundredths",
    ],
    `SAY:
\u2022 \u201CTurn and talk: in your own words, explain the relationship between tenths and hundredths. You can use the area model in your explanation.\u201D
\u2022 After 60 seconds: \u201CWho can share what their partner said?\u201D [Select 2\u20133 students.]
\u2022 Summarise key takeaways by pointing to each dot point.
\u2022 \u201CNext lesson we will keep building \u2014 we\u2019ll look at decimals on number lines and ordering decimals from smallest to largest.\u201D

DO:
\u2022 Use the Turn & Talk as a final consolidation, not just a social activity.
\u2022 Listen specifically for students who use the fraction vocabulary (tenths, hundredths) and the area model language.
\u2022 Record any persistent confusions heard during Turn & Talk for Lesson 5 planning.

TEACHER NOTES:
The closing Turn & Talk serves two purposes: it reinforces learning through verbal articulation (metacognition) and gives the teacher a final pulse check on class understanding. The key takeaways are pitched at the conceptual level rather than procedural \u2014 students should leave knowing the RELATIONSHIPS, not just the procedures. The preview of Lesson 5 (number lines, ordering) helps students see the learning trajectory and builds anticipation. Ensure the room is left with manipulatives and workbooks stored; SR2/SR3 should be collected or self-kept according to your class routine.

WATCH FOR:
\u2022 Students who can only give procedural explanations (\u201CYou count the squares\u201D) rather than relational ones (\u201C10 hundredths make 1 tenth\u201D) \u2014 these students need the concrete experience of the area model reinforced in the next lesson.
\u2022 Readiness signal for Lesson 5: Students who spontaneously say \u201C10 hundredths = 1 tenth\u201D using their own words.

[Maths: Stage 2\u20134 \u2013 Consolidation | VTLM 2.0: Reflection & Consolidation]`
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // Write file
  // ═══════════════════════════════════════════════════════════════════════════
  await pres.writeFile({ fileName: "output/Lesson_PV4_Hundredths.pptx" });
  console.log("Done: output/Lesson_PV4_Hundredths.pptx");
}

build().catch(console.error);
