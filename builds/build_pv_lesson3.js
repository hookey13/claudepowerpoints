// Place Value Sequence — Lesson 3: Decimal Place Value (Tenths)
// Grade 3/4 Mathematics: Extend Place Value and Additive Thinking

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const {
  C, FONT_H, FONT_B, STAGE_COLORS,
  SAFE_BOTTOM, CONTENT_TOP,
  addTopBar, addStageBadge, addTitle, addCard, addFooter,
  addPlaceValueChart, addTenthsStrip,
  titleSlide, liSlide, contentSlide, workedExSlide, cfuSlide, exitTicketSlide,
} = require("../themes/pv_helpers");

const FOOTER = "Lesson 3 of 10  |  Extend Place Value & Additive Thinking  |  Grade 3/4 Maths";

async function build() {
  if (!fs.existsSync("output")) fs.mkdirSync("output");

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Claude";
  pres.title = "Lesson 3: Decimal Place Value (Tenths)";


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ═══════════════════════════════════════════════════════════════════════════
  titleSlide(
    pres,
    "Lesson 3: Decimal Place Value (Tenths)",
    "Understanding how one whole can be divided into ten equal parts",
    "Grade 3/4 Maths  |  Lesson 3 of 10  |  Extend Place Value & Additive Thinking",
    `SAY:
\u2022 Welcome to Lesson 3. Today we are going to cross a really important bridge in mathematics.
\u2022 So far in this unit we have worked with whole numbers and place value. Today we start to go SMALLER than one whole.
\u2022 Ask: Has anyone noticed numbers with a dot in them? Where have you seen them? [Prices, measuring tape, thermometer, sports scores]
\u2022 Those dots are decimal points. Today we find out what they mean.

DO:
\u2022 Display the title slide as students settle and gather on the floor or at desks
\u2022 Use a curious, inviting tone to signal this is new and exciting territory
\u2022 Have a strip of paper and scissors ready for Stage 2 demonstration

TEACHER NOTES:
This lesson introduces decimal fractions for the first time. The key conceptual move is connecting the fraction notation students know (1/10) to decimal notation (0.1) using the concrete model of a tenths strip. The lesson follows the DECIDE framework: stages move from Activate (fractions warm-up) through Explicit Instruction (I Do) to Guided and Independent Practice. The tenths strip is the primary manipulative and should appear on the desk of every student before Stage 4. Ensure paper strips are prepared — cutting them live during Stage 2 is a powerful concrete anchor.

WATCH FOR:
\u2022 Students who are unfamiliar with fractions from prior learning — this will surface in Stage 1; use that as diagnostic information
\u2022 Keep Stage 1 brisk (10 min); the conceptual weight of the lesson is in Stage 2

[Maths: Early Stage 2 / Stage 2 Fractions | VTLM 2.0: Engage — Making connections]`
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — Learning Intentions & Success Criteria
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
\u2022 Read the learning intention together: \u201CWe will learn how to represent the place value of decimal numbers.\u201D
\u2022 Explain: \u201CPlace value means understanding what each digit in a number is WORTH. Today we add something new \u2014 digits after the decimal point.\u201D
\u2022 Read each success criterion together: \u201CI can write the decimal number to match a picture. I can represent decimals using a picture. I can use a place value chart.\u201D
\u2022 Tell students: \u201CBy the end of this lesson, you should be able to do all three of these.\u201D
\u2022 Point to SC 1 and say: \u201CWe\u2019ll start by looking at pictures, and you\u2019ll write the decimal. Then we flip it \u2014 I say the decimal, you make the picture.\u201D

DO:
\u2022 Read the LI aloud and have students read with you
\u2022 Ask students to give a quiet thumbs signal against their chest: thumbs up = confident, sideways = heard of it, down = new to me
\u2022 Note any students signalling \u201Cnew to me\u201D \u2014 these students may need closer monitoring in Stage 2

TEACHER NOTES:
The single learning intention is deliberately broad to encompass the three representations students will work across: pictorial (tenths strip), symbolic (decimal notation), and positional (place value chart). The three success criteria map directly onto the three representations. This structure gives students a clear mental hook for the lesson. In the DECIDE framework, making the LI visual and explicit at the start builds metacognitive awareness.

WATCH FOR:
\u2022 Students who signal high confidence \u2014 check whether this is accurate or assumed; some students confuse fractions with decimals
\u2022 Keep the LI display brief; return to it at the end of the lesson as a self-assessment prompt

[Maths: Stage 2 Number | VTLM 2.0: Structured Overview]`,
    FOOTER
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — Stage 1: Fraction Warm-Up (Activate Prior Knowledge)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["1"];
    addTopBar(s, stageColor);
    addStageBadge(s, 1, "Activate Prior Knowledge");
    addTitle(s, "Warm-Up: What Fraction is Shaded?", { y: 0.65, fontSize: 22, color: stageColor });

    // CFU technique badge
    s.addShape("roundRect", {
      x: 0.5, y: 1.55, w: 2.6, h: 0.32, rectRadius: 0.08,
      fill: { color: stageColor },
    });
    s.addText("CFU: Show Me Boards", {
      x: 0.5, y: 1.55, w: 2.6, h: 0.32,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Left column — instructions card
    addCard(s, 0.5, 1.97, 4.4, 3.0, { strip: stageColor });
    s.addText([
      { text: "Task 1 — Show Me Boards", options: { bold: true, breakLine: true, fontSize: 13, color: C.AMBER } },
      { text: "Look at each shape I show you.", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
      { text: "Write the fraction of the shaded area on your whiteboard.", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
      { text: "Hold up on my signal.", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
      { text: " ", options: { breakLine: true, fontSize: 10 } },
      { text: "Task 2 — Draw It", options: { bold: true, breakLine: true, fontSize: 13, color: C.AMBER } },
      { text: "I will write a fraction. You draw a shape that shows it.", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
      { text: "Fractions to draw:", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
    ], {
      x: 0.7, y: 2.07, w: 4.05, h: 2.75,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Fraction pill badges for Task 2
    const fracs = ["1/4", "3/4", "2/5", "1/3"];
    fracs.forEach((f, i) => {
      const px = 0.75 + i * 0.95;
      s.addShape("roundRect", {
        x: px, y: 4.35, w: 0.82, h: 0.38, rectRadius: 0.09,
        fill: { color: C.NAVY },
      });
      s.addText(f, {
        x: px, y: 4.35, w: 0.82, h: 0.38,
        fontSize: 16, fontFace: FONT_H, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
    });

    // Right column — CFU prompt card
    addCard(s, 5.1, 1.97, 4.4, 3.0, { strip: C.TEAL });
    s.addText("CFU Prompt", {
      x: 5.3, y: 2.07, w: 4.0, h: 0.3,
      fontSize: 11, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText([
      { text: "Non-volunteer, explain your fraction:", options: { breakLine: true, italic: true, fontSize: 12, color: C.CHARCOAL } },
      { text: " ", options: { breakLine: true, fontSize: 8 } },
      { text: "\u201CThere are ___ equal parts and ___ is/are shaded. The fraction is ___.\u201D", options: { breakLine: true, fontSize: 13, color: C.NAVY, bold: true } },
      { text: " ", options: { breakLine: true, fontSize: 8 } },
      { text: "Then ask: Do all whiteboards look the same?", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
      { text: "How do we know they are correct?", options: { fontSize: 12, color: C.CHARCOAL } },
    ], {
      x: 5.3, y: 2.42, w: 4.0, h: 2.45,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 \u201CWe are going to start with something you already know \u2014 fractions.\u201D
\u2022 \u201CI\u2019ll show you a shape. Write the fraction of the shaded area on your whiteboard. Wait for my signal to hold up.\u201D
\u2022 After showing each shape: \u201CThere are ___ equal parts. ___ is/are shaded. The fraction is ___.\u201D
\u2022 Task 2: \u201CI\u2019ll write a fraction on the board. Your job is to draw a shape that shows that fraction.\u201D
\u2022 \u201CRemember: the parts MUST be equal or it doesn\u2019t work!\u201D

DO:
\u2022 Draw or display 3-4 simple shapes on the board with sections shaded (e.g., a rectangle with 1 of 2 shaded, a circle with 3 of 4 shaded, a strip with 2 of 5 shaded)
\u2022 After each reveal, pause for 5 seconds of think time, then signal with hand
\u2022 Scan boards quickly; call on 2-3 non-volunteers
\u2022 For Task 2, write each fraction in turn and give 30 seconds of draw time

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
\u2022 After Task 1: \u201C[Name], explain your thinking. How did you know the fraction?\u201D Script: \u201CThere are ___ equal parts and ___ is/are shaded. The fraction is ___.\u201D
\u2022 For Task 2: \u201CDo all the drawings look the same? [Probably not.] Is that okay? How do we check they are all correct?\u201D — Listen for: same number of equal parts, same number shaded
\u2022 Call on non-volunteers for BOTH tasks; do not accept volunteers only
PROCEED: If \u226580% of whiteboards show correct fractions with equal parts, transition to Stage 2.
PIVOT: If students are drawing UNequal parts and calling them fractions — reteach: draw a shape, divide it into unequal parts, shade one and ask \u201CIs this one half? Why not?\u201D Emphasise EQUAL is non-negotiable. Then re-check with one new fraction.

TEACHER NOTES:
This stage activates the prior knowledge students must have to access today\u2019s new learning. The key connection is: fractions describe a number of equal parts out of a total number of equal parts — and decimals do exactly the same thing, just with a special notation for tenths (and later hundredths). Spotting students who don\u2019t yet have secure fraction concepts here is critical; those students will need paired support in Stage 2. The DECIDE framework labels this \u201CActivate\u201D — we are surfacing and checking prior knowledge before building on it.

MISCONCEPTIONS:
\u2022 Misconception: Students believe that any division of a shape shows a fraction, even if parts are unequal.
  Why: Students focus on the shaded region rather than the equality of all parts.
  Impact: Will lead to incorrect decimal representations — if parts aren\u2019t equal, the fraction/decimal is meaningless.
  Quick correction: Draw two rectangles side-by-side: one split equally, one not. Ask \u201CWhich one shows one half? How do you know?\u201D

WATCH FOR:
\u2022 Students writing fractions as whole numbers (e.g., writing \u201C1\u201D instead of \u201C1/2\u201D) — prompt: \u201CHow many parts altogether? That\u2019s the bottom number.\u201D
\u2022 Fast finishers who may rush drawings without checking equal parts \u2014 ask them: \u201CCould you fold this shape in half and both sides match?\u201D

[Maths: Stage 2 Fractions | VTLM 2.0: Activate Prior Knowledge]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — Stage 2: From Fractions to Decimals (Introduction)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["2"];
    addTopBar(s, stageColor);
    addStageBadge(s, 2, "Explicit Instruction (I Do)");
    addTitle(s, "From Fractions to Decimals", { y: 0.65, fontSize: 22, color: stageColor });

    // Left card — where we see decimals
    addCard(s, 0.5, CONTENT_TOP, 4.4, SAFE_BOTTOM - CONTENT_TOP, { strip: stageColor });
    s.addText("Where do we see decimal points?", {
      x: 0.7, y: CONTENT_TOP + 0.1, w: 4.0, h: 0.32,
      fontSize: 13, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
    });

    const examples = [
      { icon: "$2.50", label: "Money — $2.50 means 2 dollars and 50 cents" },
      { icon: "1.75 m", label: "Height — 1.75 m on a measuring tape" },
      { icon: "36.6\u00B0C", label: "Temperature — 36.6 degrees body temperature" },
      { icon: "9.81 m/s\u00B2", label: "Science — gravity measurement" },
    ];

    examples.forEach((ex, i) => {
      const ey = CONTENT_TOP + 0.55 + i * 0.88;
      // Amber pill for the example
      s.addShape("roundRect", {
        x: 0.72, y: ey, w: 1.5, h: 0.38, rectRadius: 0.08,
        fill: { color: C.AMBER },
      });
      s.addText(ex.icon, {
        x: 0.72, y: ey, w: 1.5, h: 0.38,
        fontSize: 14, fontFace: FONT_H, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
      s.addText(ex.label, {
        x: 2.35, y: ey, w: 2.45, h: 0.38,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL,
        valign: "middle", margin: 0,
      });
    });

    // Right card — bridging statement
    addCard(s, 5.1, CONTENT_TOP, 4.4, SAFE_BOTTOM - CONTENT_TOP, { strip: C.AMBER });
    s.addText("The Big Idea", {
      x: 5.3, y: CONTENT_TOP + 0.1, w: 3.9, h: 0.32,
      fontSize: 13, fontFace: FONT_B, color: C.AMBER, bold: true, margin: 0,
    });
    s.addText([
      { text: "You already know about fractions.", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL } },
      { text: " ", options: { breakLine: true, fontSize: 8 } },
      { text: "Decimals are a DIFFERENT WAY to write certain fractions.", options: { breakLine: true, fontSize: 14, color: C.NAVY, bold: true } },
      { text: " ", options: { breakLine: true, fontSize: 8 } },
      { text: "Today we focus on TENTHS.", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL } },
      { text: " ", options: { breakLine: true, fontSize: 8 } },
      { text: "When we split a whole into 10 equal parts, each part is one tenth.", options: { breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: " ", options: { breakLine: true, fontSize: 8 } },
      { text: "We can write one tenth as:", options: { breakLine: true, fontSize: 13, color: C.CHARCOAL } },
    ], {
      x: 5.3, y: CONTENT_TOP + 0.52, w: 3.9, h: 2.2,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Fraction and decimal notation displayed prominently
    s.addShape("roundRect", {
      x: 5.5, y: 3.6, w: 1.4, h: 0.7, rectRadius: 0.1,
      fill: { color: C.LIGHT },
    });
    s.addText("1/10", {
      x: 5.5, y: 3.6, w: 1.4, h: 0.7,
      fontSize: 24, fontFace: FONT_H, color: C.NAVY,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText("=", {
      x: 7.0, y: 3.6, w: 0.5, h: 0.7,
      fontSize: 24, fontFace: FONT_H, color: C.CHARCOAL,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: 7.55, y: 3.6, w: 1.7, h: 0.7, rectRadius: 0.1,
      fill: { color: C.TEAL },
    });
    s.addText("0.1", {
      x: 7.55, y: 3.6, w: 1.7, h: 0.7,
      fontSize: 28, fontFace: FONT_H, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 \u201CYou did brilliantly with fractions just now. Here\u2019s the exciting news: today we\u2019re going to see those fractions written in a completely new way.\u201D
\u2022 \u201CLook at these examples on the left. Who has seen $2.50 before? What does the dot mean?\u201D [Accept ideas freely]
\u2022 \u201CThe dot is called a DECIMAL POINT. It separates the whole number from the part that is smaller than a whole.\u201D
\u2022 \u201CToday we focus on one special type of decimal: tenths. When we split a whole into 10 equal parts, we get tenths.\u201D
\u2022 Point to the notation: \u201C1 over 10 \u2014 you know this. We can ALSO write it as zero point one. That dot is the decimal point.\u201D

DO:
\u2022 Point to each real-world example in turn and briefly discuss
\u2022 Bring student attention to the right panel when introducing the 1/10 = 0.1 equation
\u2022 Write both notations on the board simultaneously as you say them
\u2022 Have your strip of paper visible but not yet cut

TEACHER NOTES:
This slide creates the conceptual bridge: fractions and decimals are two notations for the same idea. Connecting to everyday contexts (money, measurement) grounds the abstract concept before students encounter the formal notation. The DECIDE framework element here is \u201CExplicit Instruction\u201D — the teacher is naming and explaining the concept directly. Do not skip the real-world examples; for students with limited decimal exposure, this grounding is essential. Note: we are NOT yet introducing the place value chart; that comes in Slide 8 after students have a concrete model.

WATCH FOR:
\u2022 Students who say \u201C0.1 looks like zero\u201D — address immediately: \u201CThe zero before the dot tells us there are zero whole numbers. The one AFTER the dot is the important part.\u201D
\u2022 Students who confuse the decimal point with a multiplication dot from earlier learning \u2014 clarify: \u201CIn maths, a dot between numbers usually means multiply. But a dot at the bottom of a number, with digits on both sides, is a decimal point.\u201D

[Maths: Stage 2 Number & Algebra | VTLM 2.0: Explicit Teaching]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 5 — Stage 2: Tenths — One Whole Split into 10
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["2"];
    addTopBar(s, stageColor);
    addStageBadge(s, 2, "Explicit Instruction (I Do)");
    addTitle(s, "Tenths: One Whole Split into 10 Equal Parts", { y: 0.65, fontSize: 21, color: stageColor });

    // Left column — stem sentence card
    addCard(s, 0.5, CONTENT_TOP, 4.5, SAFE_BOTTOM - CONTENT_TOP, { strip: stageColor });
    s.addText("Stem Sentence (say together):", {
      x: 0.72, y: CONTENT_TOP + 0.1, w: 4.1, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
    });

    // Stem sentence box
    s.addShape("roundRect", {
      x: 0.65, y: CONTENT_TOP + 0.48, w: 4.2, h: 1.55, rectRadius: 0.1,
      fill: { color: C.LIGHT },
    });
    s.addText([
      { text: "\u201CThe whole is split into 10 equal parts.", options: { breakLine: true, italic: true, fontSize: 14, color: C.NAVY } },
      { text: "1 part is shaded.", options: { breakLine: true, italic: true, fontSize: 14, color: C.NAVY } },
      { text: "This represents 0.1", options: { breakLine: true, italic: true, fontSize: 14, color: C.NAVY } },
      { text: "(1 tenth).\u201D", options: { italic: true, fontSize: 14, color: C.NAVY } },
    ], {
      x: 0.75, y: CONTENT_TOP + 0.52, w: 4.0, h: 1.47,
      fontFace: FONT_B, valign: "middle", align: "center", margin: 0,
    });

    s.addText("Steps I follow:", {
      x: 0.72, y: CONTENT_TOP + 2.14, w: 4.0, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
    });
    s.addText([
      { text: "1. Count ALL the equal parts (that\u2019s the denominator).", options: { bullet: true, breakLine: true, fontSize: 12, color: C.CHARCOAL } },
      { text: "2. Count the SHADED parts (that\u2019s the numerator).", options: { bullet: true, breakLine: true, fontSize: 12, color: C.CHARCOAL } },
      { text: "3. Write as a fraction: shaded/total.", options: { bullet: true, breakLine: true, fontSize: 12, color: C.CHARCOAL } },
      { text: "4. Write as a decimal (e.g., 1/10 = 0.1).", options: { bullet: true, fontSize: 12, color: C.CHARCOAL } },
    ], {
      x: 0.72, y: CONTENT_TOP + 2.48, w: 4.15, h: 1.35,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Right column — visual
    s.addText("One tenth shaded:", {
      x: 5.2, y: CONTENT_TOP + 0.05, w: 4.5, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: stageColor, bold: true, margin: 0,
    });

    // Tenths strip with 1 filled
    addTenthsStrip(s, 5.2, CONTENT_TOP + 0.44, 3.8, 1, { fillColor: C.TEAL, h: 0.55 });

    // Labels for the strip
    s.addText("10 equal parts", {
      x: 5.2, y: CONTENT_TOP + 1.1, w: 3.8, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, align: "center", margin: 0,
    });

    // Fraction = Decimal display
    s.addText("1 part shaded = 1 tenth", {
      x: 5.2, y: CONTENT_TOP + 1.46, w: 3.8, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, align: "center", margin: 0,
    });

    s.addShape("roundRect", {
      x: 5.5, y: CONTENT_TOP + 1.86, w: 1.2, h: 0.56, rectRadius: 0.09,
      fill: { color: C.LIGHT },
    });
    s.addText("1/10", {
      x: 5.5, y: CONTENT_TOP + 1.86, w: 1.2, h: 0.56,
      fontSize: 22, fontFace: FONT_H, color: C.NAVY,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText("=", {
      x: 6.76, y: CONTENT_TOP + 1.86, w: 0.45, h: 0.56,
      fontSize: 22, fontFace: FONT_H, color: C.CHARCOAL,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: 7.26, y: CONTENT_TOP + 1.86, w: 1.4, h: 0.56, rectRadius: 0.09,
      fill: { color: C.TEAL },
    });
    s.addText("0.1", {
      x: 7.26, y: CONTENT_TOP + 1.86, w: 1.4, h: 0.56,
      fontSize: 26, fontFace: FONT_H, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Choral response prompt
    s.addShape("roundRect", {
      x: 5.2, y: CONTENT_TOP + 2.58, w: 4.3, h: 0.76, rectRadius: 0.1,
      fill: { color: C.AMBER_LIGHT },
    });
    s.addText([
      { text: "Choral Response: ", options: { bold: true, fontSize: 12, color: C.AMBER } },
      { text: "Say the stem sentence together!", options: { fontSize: 12, color: C.CHARCOAL } },
    ], {
      x: 5.3, y: CONTENT_TOP + 2.65, w: 4.1, h: 0.62,
      fontFace: FONT_B, valign: "middle", align: "center", margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 \u201CNow watch what I do with this strip of paper.\u201D [Hold up strip]
\u2022 \u201CI\u2019m going to fold it and cut it into 10 equal parts.\u201D [Fold into 10ths, cut or score]
\u2022 \u201CHow many equal parts are there?\u201D [10] \u201CThat\u2019s the WHOLE divided into 10 equal parts.\u201D
\u2022 \u201CNow I shade ONE part.\u201D [Shade one segment] \u201CWhat fraction of the shape is shaded?\u201D [1/10] \u201COne tenth.\u201D
\u2022 \u201CNow here\u2019s the new bit: one tenth can also be written as zero point one. Watch me write it.\u201D [Write 0.1 on board, circling the decimal point]
\u2022 \u201CSay the stem sentence with me.\u201D [Choral response \u2014 point to each part of the stem as students say it]

DO:
\u2022 Physically fold and cut (or demonstrate with pre-cut strip) a strip of paper into 10 equal segments
\u2022 Shade 1 segment clearly with a marker
\u2022 Point to the visual on the slide that mirrors your physical strip
\u2022 Write 1/10 = 0.1 on the board with the decimal point circled or underlined
\u2022 Conduct choral response: point to the slide, say the stem sentence, students repeat x2
\u2022 Ask: \u201CDoes this strip on the slide look like my paper strip?\u201D — connecting concrete to visual

CFU CHECKPOINT:
Technique: Choral Response
Script:
\u2022 Teacher: \u201CSay it with me: The whole is split into 10 equal parts. 1 part is shaded. This represents 0.1 (one tenth).\u201D
\u2022 Students repeat together. Listen for accuracy: \u201C10 equal parts\u201D (not just \u201C10 parts\u201D), \u201C0.1\u201D (not \u201Cone tenth\u201D as fraction).
\u2022 Repeat once more if response is weak or unison.
PROCEED: If students say the stem sentence fluently and correctly, move to showing 0.2, 0.3, 0.4.
PIVOT: If students say \u201Cone tenth\u201D as the decimal (confusing fraction name with decimal): Write \u201C0.1\u201D on the board and say \u201CThe NAME of this is \u2018one tenth\u2019 but the WRITTEN form is zero-point-one. The dot matters!\u201D Re-do choral response.

TEACHER NOTES:
The physical paper strip is the most important manipulative in this lesson. The concrete act of folding and cutting communicates the idea of \u201Cequal parts\u201D in a way no diagram can. Students who are present for this moment have a durable memory anchor. The stem sentence is taken directly from the lesson plan and should be kept visible on the slide throughout Stage 2. Choral response at this stage serves to give every student low-stakes practice with the new vocabulary before they are called on individually.

MISCONCEPTIONS:
\u2022 Misconception: Any shape divided into 10 parts (even unequal) shows tenths / shows 1/10 if 1 is shaded.
  Why: Students focus on counting the shaded part rather than verifying equality of all parts.
  Impact: Core misunderstanding \u2014 the decimal representation is only valid if the whole is split into equal parts. Without this, all subsequent decimal work is built on sand.
  Quick correction: Show two strips side by side: one with equal segments, one with very unequal sections. Ask: \u201CIf I shaded one part of each, do they both show one tenth? Why not?\u201D Establish: EQUAL parts is the non-negotiable rule.

WATCH FOR:
\u2022 Students who write 1/10 correctly but struggle to say \u201C0.1\u201D \u2014 the fraction-to-decimal translation is the core challenge; give extra wait time
\u2022 Students who say \u201Czero point one tenth\u201D \u2014 they are combining both notations; correct gently: \u201C0.1 IS one tenth; you don\u2019t need to say both\u201D

[Maths: Stage 2 Fractions & Decimals | VTLM 2.0: Explicit Teaching \u2014 Concrete to Visual]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 6 — Stage 2: Worked Example — 0.7 (Progressive Shading)
  // ═══════════════════════════════════════════════════════════════════════════
  workedExSlide(
    pres,
    2,
    "Explicit Instruction (I Do)",
    "Worked Example: Building Up to 0.7",
    [
      "Start: strip with 1 part shaded = 0.1 (one tenth)",
      "Shade one more \u2192 2 parts = 0.2 (two tenths)",
      "Keep going: 3 parts = 0.3, 4 parts = 0.4, 5 parts = 0.5",
      "Now: 7 parts shaded out of 10 \u2014 what decimal?",
      "Stem sentence: \u201CThe whole is split into 10 equal parts. 7 parts are shaded. This represents 0.7 (7 tenths).\u201D",
      "Students: Repeat chorally with teacher.",
      "Key: the digit after the decimal point tells you how many tenths.",
    ],
    `SAY:
\u2022 \u201CWatch as I shade more and more parts of our strip.\u201D
\u2022 As you shade each one: \u201C1 part \u2014 that\u2019s 0.1. 2 parts \u2014 that\u2019s 0.2. 3 parts \u2014 0.3.\u201D
\u2022 \u201CWhat do you notice about the pattern?\u201D [The digit after the decimal matches the number of shaded parts]
\u2022 \u201CIf I shade 7 parts out of 10 equal parts, what decimal do I write?\u201D [0.7]
\u2022 \u201CSay the stem sentence with me for 7 parts.\u201D [Choral response]
\u2022 \u201CThe digit after the decimal point \u2014 the one after the dot \u2014 tells me how many tenths. 0.7 means 7 tenths.\u201D

DO:
\u2022 Use a pre-prepared series of strips or draw on the board: shade 1, 2, 3, 4, 5 progressively
\u2022 Point to each strip visual on the slide as you build up
\u2022 Write each decimal on the board as you say it: 0.1, 0.2, 0.3, 0.4, 0.5
\u2022 Then jump to 7 shaded \u2014 write 0.7 on board
\u2022 Conduct choral response for stem sentence with 7 parts
\u2022 Pause and look around the room; ensure all students are tracking

TEACHER NOTES:
The progressive shading is a crucial pedagogical move. Students see the pattern in real time: each additional shaded part adds one tenth to the decimal. This builds the multiplicative understanding that the digit in the tenths place directly tells you the number of tenths. The worked example culminates at 0.7 (not a \u201Cround\u201D number like 0.5) so that students can\u2019t shortcut using halving intuition. The DECIDE framework labels this \u201CI Do\u201D \u2014 the teacher demonstrates with full narration and student choral participation. The stem sentence keeps language consistent and models the mathematical explanation students will use in Stage 3.

WATCH FOR:
\u2022 Students who say \u201C0.7 = 7\u201D (treating the digit after the decimal as a whole number) \u2014 address: \u201C0.7 is LESS than 1; it\u2019s seven parts out of ten\u201D
\u2022 Students who can say the stem sentence but can\u2019t yet write the decimal without the strip \u2014 this is fine at this stage; they still have visual support

[Maths: Stage 2 Decimals | VTLM 2.0: Explicit Teaching \u2014 Worked Examples]`,
    FOOTER,
    (s) => {
      // Right side — strip progression visual
      const strips = [
        { filled: 1, label: "0.1" },
        { filled: 2, label: "0.2" },
        { filled: 3, label: "0.3" },
        { filled: 5, label: "0.5" },
        { filled: 7, label: "0.7", highlight: true },
      ];
      const stripW = 3.8;
      const startX = 5.35;
      const startY = CONTENT_TOP + 0.1;
      const stripH = 0.38;
      const gap = 0.65;

      strips.forEach((strip, i) => {
        const sy = startY + i * gap;
        // Highlight the 0.7 strip with a TEAL background pill
        if (strip.highlight) {
          s.addShape("roundRect", {
            x: startX - 0.08, y: sy - 0.06, w: stripW + 0.7, h: stripH + 0.12, rectRadius: 0.06,
            fill: { color: C.MINT },
          });
        }
        addTenthsStrip(s, startX, sy, stripW, strip.filled, {
          fillColor: strip.highlight ? C.TEAL : C.NAVY_LIGHT,
          emptyColor: C.WHITE,
          h: stripH,
        });
        // Override the fraction label from helper with decimal label
        // (helper adds fraction label to the right; we add decimal below)
        s.addShape("roundRect", {
          x: startX + stripW + 0.65, y: sy, w: 0.72, h: stripH, rectRadius: 0.07,
          fill: { color: strip.highlight ? C.TEAL : C.NAVY },
        });
        s.addText(strip.label, {
          x: startX + stripW + 0.65, y: sy, w: 0.72, h: stripH,
          fontSize: strip.highlight ? 18 : 14, fontFace: FONT_H, color: C.WHITE,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
      });
    }
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 7 — Stage 2: Your Turn — Stem Sentences CFU (Think-Pair-Share)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["2"];
    addTopBar(s, stageColor);
    addStageBadge(s, 2, "Explicit Instruction (I Do)");
    addTitle(s, "Your Turn: Say the Stem Sentence", { y: 0.65, fontSize: 22, color: stageColor });

    // Technique badge
    s.addShape("roundRect", {
      x: 0.5, y: 1.55, w: 2.8, h: 0.32, rectRadius: 0.08,
      fill: { color: stageColor },
    });
    s.addText("CFU: Think-Pair-Share", {
      x: 0.5, y: 1.55, w: 2.8, h: 0.32,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // The strip visual — 4 parts filled
    const stripX = 1.0;
    const stripY = 2.1;
    const stripW = 5.0;
    const stripH = 0.7;
    s.addText("Look at this strip. How many parts are shaded?", {
      x: 0.5, y: 1.96, w: 9.0, h: 0.3,
      fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    addTenthsStrip(s, stripX, stripY, stripW, 4, { fillColor: C.TEAL, h: stripH });

    // Step instructions
    addCard(s, 0.5, 3.05, 9.0, 1.82, { strip: stageColor });
    s.addText([
      { text: "Think (30 sec):", options: { bold: true, fontSize: 13, color: C.NAVY } },
      { text: "  Silently say the stem sentence in your head.", options: { fontSize: 13, color: C.CHARCOAL } },
    ], {
      x: 0.75, y: 3.15, w: 8.4, h: 0.32,
      fontFace: FONT_B, margin: 0,
    });
    s.addText([
      { text: "Pair (30 sec):", options: { bold: true, fontSize: 13, color: C.TEAL } },
      { text: "  Say it to your partner. Listen to each other.", options: { fontSize: 13, color: C.CHARCOAL } },
    ], {
      x: 0.75, y: 3.54, w: 8.4, h: 0.32,
      fontFace: FONT_B, margin: 0,
    });
    s.addText([
      { text: "Share:", options: { bold: true, fontSize: 13, color: C.AMBER } },
      { text: "  [Non-volunteer] explain using the stem sentence.", options: { fontSize: 13, color: C.CHARCOAL } },
    ], {
      x: 0.75, y: 3.93, w: 8.4, h: 0.32,
      fontFace: FONT_B, margin: 0,
    });

    // Stem sentence reminder
    s.addShape("roundRect", {
      x: 0.5, y: 4.52, w: 9.0, h: 0.42, rectRadius: 0.09,
      fill: { color: C.LIGHT },
    });
    s.addText("\u201CThe whole is split into 10 equal parts. ___ parts are shaded. This represents ___ (___ tenths).\u201D", {
      x: 0.65, y: 4.52, w: 8.7, h: 0.42,
      fontSize: 12, fontFace: FONT_B, color: C.NAVY, italic: true,
      valign: "middle", margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 \u201CNow it\u2019s your turn. Look at the strip on the slide. Don\u2019t call out \u2014 think first.\u201D
\u2022 \u201CTHINK: In your head, say the stem sentence for this strip. You have 30 seconds.\u201D [Pause]
\u2022 \u201CPAIR: Turn to your partner. Say your stem sentence. Listen to see if your partner agrees.\u201D [Pause 30 sec]
\u2022 \u201CSHARE: [Name of non-volunteer], tell me the stem sentence for this strip.\u201D
\u2022 After sharing: \u201CDoes everyone agree? Thumbs up if your stem sentence matched.\u201D

DO:
\u2022 Point to the strip and count the shaded parts with a finger before giving think time
\u2022 Use a timer or count aloud for think time (30 seconds)
\u2022 Circulate during pair time \u2014 listen to 2-3 pairs; note any errors to address in share
\u2022 Select a non-volunteer for share; do NOT take a volunteer
\u2022 Accept a correct response and rephrase it with full precision if the student was partial

CFU CHECKPOINT:
Technique: Think-Pair-Share
Script:
\u2022 Target answer: \u201CThe whole is split into 10 equal parts. 4 parts are shaded. This represents 0.4 (4 tenths).\u201D
\u2022 During pair: listen for \u201C10 equal parts\u201D and \u201C0.4\u201D specifically
\u2022 Common partial response: student says \u201C4 out of 10\u201D without the decimal \u2014 prompt: \u201CAnd how do we write that as a decimal?\u201D
PROCEED: If non-volunteer produces the full stem sentence correctly, move to Slide 8.
PIVOT: If the non-volunteer gives the fraction but not the decimal (or vice versa), conduct a brief reteach: \u201CThe fraction and the decimal say the same thing in different ways. 4/10 and 0.4 are equal. Say: four tenths equals zero point four.\u201D Then cold-call a second non-volunteer.

TEACHER NOTES:
Think-Pair-Share gives every student a safe rehearsal space before public sharing. This is especially important when introducing new notation, because students who are uncertain won\u2019t risk the public error without the pair warm-up. The DECIDE framework labels this a \u201CCheck for Understanding\u201D embedded within the I Do stage \u2014 teachers check whether students can apply the stem sentence before moving to the place value chart. The answer for this strip (4 parts = 0.4) was chosen to avoid the \u201Ceasy\u201D anchors of 0.1, 0.5, and 1.0 that students might guess.

WATCH FOR:
\u2022 Students who say \u201C0.4 = 40\u201D (misreading the digit as a tens value) \u2014 reteach: \u201C0.4 is LESS than 1. It\u2019s between 0 and 1 on the number line.\u201D
\u2022 Students who produce a correct stem sentence in the pair but freeze when cold-called \u2014 allow them to reference their whiteboard or partner

[Maths: Stage 2 Decimals | VTLM 2.0: Structured Student Talk \u2014 Think-Pair-Share]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 8 — Stage 2: When the Whole is Shaded = 1 & Place Value Chart
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["2"];
    addTopBar(s, stageColor);
    addStageBadge(s, 2, "Explicit Instruction (I Do)");
    addTitle(s, "When 10 Tenths = 1 Whole  |  The Place Value Chart", { y: 0.65, fontSize: 20, color: stageColor });

    // Choral Response badge
    s.addShape("roundRect", {
      x: 0.5, y: 1.55, w: 2.8, h: 0.32, rectRadius: 0.08,
      fill: { color: stageColor },
    });
    s.addText("CFU: Choral Response", {
      x: 0.5, y: 1.55, w: 2.8, h: 0.32,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Left card — 10 tenths = 1 whole
    addCard(s, 0.5, 1.97, 4.3, 2.9, { strip: C.CORAL });
    s.addText("10 tenths = 1 whole", {
      x: 0.72, y: 2.07, w: 3.9, h: 0.34,
      fontSize: 14, fontFace: FONT_H, color: C.CORAL, bold: true, margin: 0,
    });
    // Fully filled strip
    addTenthsStrip(s, 0.72, 2.53, 3.8, 10, { fillColor: C.TEAL, h: 0.46 });
    s.addText("All 10 parts shaded \u2192 write as:", {
      x: 0.72, y: 3.1, w: 3.9, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    // Convention display
    s.addShape("roundRect", {
      x: 0.75, y: 3.45, w: 0.78, h: 0.56, rectRadius: 0.09,
      fill: { color: C.TEAL },
    });
    s.addText("1", {
      x: 0.75, y: 3.45, w: 0.78, h: 0.56,
      fontSize: 28, fontFace: FONT_H, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // NOT badges
    const notItems = ["0.10", "1.0"];
    notItems.forEach((n, i) => {
      const nx = 1.73 + i * 1.4;
      s.addShape("roundRect", {
        x: nx, y: 3.45, w: 1.15, h: 0.56, rectRadius: 0.09,
        fill: { color: C.CREAM },
      });
      s.addText("NOT " + n, {
        x: nx, y: 3.45, w: 1.15, h: 0.56,
        fontSize: 13, fontFace: FONT_B, color: C.CORAL, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
    });

    s.addText("Standard convention: write 10 tenths as \u201C1\u201D", {
      x: 0.72, y: 4.12, w: 3.9, h: 0.56,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0, valign: "top",
    });

    // Right card — place value chart
    addCard(s, 5.0, 1.97, 4.6, 2.9, { strip: stageColor });
    s.addText("Place Value Chart", {
      x: 5.22, y: 2.07, w: 4.2, h: 0.34,
      fontSize: 14, fontFace: FONT_H, color: stageColor, bold: true, margin: 0,
    });
    s.addText("Ones   .   Tenths", {
      x: 5.22, y: 2.5, w: 4.2, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });

    // Place value chart for 0.3
    addPlaceValueChart(s, 5.4, 2.88, ["Ones", "Tenths"], ["0", "3"], {
      headerColor: C.TEAL, cellW: 1.35,
    });

    // Decimal point indicator
    s.addText("\u2022", {
      x: 6.79, y: 3.35, w: 0.22, h: 0.45,
      fontSize: 22, fontFace: FONT_B, color: C.CORAL,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText("(decimal point)", {
      x: 6.68, y: 3.85, w: 0.55, h: 0.28,
      fontSize: 8, fontFace: FONT_B, color: C.MUTED,
      align: "center", margin: 0,
    });

    s.addText("This shows 0.3 (3 tenths)", {
      x: 5.22, y: 4.12, w: 4.2, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
    });
    s.addText("0 in the Ones column, 3 in the Tenths column", {
      x: 5.22, y: 4.46, w: 4.2, h: 0.32,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 \u201CWhat happens when we shade ALL 10 parts?\u201D [All shaded] \u201CThat\u2019s the WHOLE \u2014 one whole.\u201D
\u2022 \u201CSo we write it as\u2026\u201D [Pause] \u201CJust the number 1. Not 0.10 \u2014 that\u2019s not standard. Not 1.0 \u2014 also not standard. Just 1.\u201D
\u2022 \u201CThis is a maths convention \u2014 an agreement mathematicians made. We write ten tenths as 1.\u201D
\u2022 [Transition] \u201CNow I want to show you a tool that makes place value very clear: the place value chart.\u201D
\u2022 Point to chart: \u201CYou already know the ones column. Now we add a decimal point, and then a tenths column to the right.\u201D
\u2022 \u201CIf I have zero ones and 3 tenths, I put a zero here [ones] and a three here [tenths]. That gives me 0.3.\u201D
\u2022 Choral response: \u201CSay: zero ones and 3 tenths equals zero point three.\u201D

DO:
\u2022 Point to the fully filled strip visual on the slide
\u2022 Write \u201C1\u201D on the board, then cross out \u201C0.10\u201D and \u201C1.0\u201D with an X as you say each one
\u2022 Transition to the place value chart: draw it on the board to match the slide
\u2022 Write 0 in the ones column and 3 in the tenths column; point to the decimal point between them
\u2022 Conduct choral response for the place value reading

CFU CHECKPOINT:
Technique: Choral Response
Script:
\u2022 Teacher: \u201CSay together: 10 tenths equals 1 whole. We write it as just 1.\u201D Students repeat.
\u2022 Teacher: \u201CSay: zero ones and 3 tenths equals zero point three.\u201D Students repeat.
\u2022 Scan for students who are not participating or mouthing incorrectly.
PROCEED: If both responses are strong and unison, move to Slide 9 (Guided Practice).
PIVOT: If students say \u201C0.10\u201D or \u201C1.0\u201D for the complete whole: \u201CThose digits after the zero add nothing \u2014 they\u2019re like writing $1.00 vs $1. Same value, but in maths we drop the trailing zeros. The standard way is just 1.\u201D

TEACHER NOTES:
The \u201C10 tenths = 1\u201D convention is one of the most important and most frequently confused ideas in decimal work. Students who write 0.10 or 1.0 are not wrong in terms of value, but they are violating mathematical convention that affects all future decimal reading and writing. The place value chart formally introduces the tenths column, which sits to the RIGHT of the decimal point. This is the first time students see the decimal point as a structural separator in a chart \u2014 not just a dot in a number. The DECIDE framework element is Explicit Instruction: the teacher demonstrates the chart with a specific example before students encounter it in practice.

MISCONCEPTIONS:
\u2022 Misconception: When all 10 tenths are shaded, students write 0.10 or 1.0 instead of 1.
  Why: Students see 10 shaded cells and write the 10 as the decimal digit, or carry over patterns from rounding work.
  Impact: Creates errors in all decimal notation tasks; 0.10 will be misread and cause confusion in later hundredths work.
  Quick correction: Write \u201C10 tenths = 10/10 = 1 whole\u201D on the board. Ask: \u201CIs 10/10 the same as 1?\u201D [Yes] \u201CThat\u2019s why we write just 1.\u201D
\u2022 Misconception: The place value chart for decimals is the same as for whole numbers \u2014 students put digits in the wrong columns.
  Why: Students may not yet recognise the decimal point as a fixed separator; they read the chart left-to-right without anchoring to the decimal point.
  Impact: Swaps ones and tenths digits, producing values 10 times too large or too small.
  Quick correction: Use a coloured marker (red) to draw the decimal point between the Ones and Tenths columns. \u201CThis red dot is our anchor. Whole numbers go LEFT of the dot. Tenths go RIGHT.\u201D

WATCH FOR:
\u2022 Students who put 3 in the Ones column for \u201C0.3\u201D \u2014 this is the tenths/ones confusion; use the chart alignment correction above
\u2022 Students who write \u201C.3\u201D without the leading zero \u2014 acceptable in some contexts but not standard; ask them to add the zero

[Maths: Stage 2 Decimals | VTLM 2.0: Explicit Teaching \u2014 Conventions & Representations]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 9 — Stage 3: Guided Practice (We Do)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["3"];
    addTopBar(s, stageColor);
    addStageBadge(s, 3, "Guided Practice (We Do)");
    addTitle(s, "Guided Practice: What Decimal is Represented?", { y: 0.65, fontSize: 20, color: stageColor });

    // Instruction card (top left)
    addCard(s, 0.5, CONTENT_TOP, 4.4, 1.52, { strip: stageColor });
    s.addText([
      { text: "Pair-Share:", options: { bold: true, fontSize: 13, color: C.TEAL } },
      { text: " Look at each strip. Tell your partner the decimal AND say the stem sentence.", options: { fontSize: 12, color: C.CHARCOAL } },
    ], {
      x: 0.72, y: CONTENT_TOP + 0.1, w: 4.0, h: 0.6,
      fontFace: FONT_B, margin: 0, valign: "top",
    });
    s.addText("Non-volunteers will share with the class.", {
      x: 0.72, y: CONTENT_TOP + 0.8, w: 4.0, h: 0.52,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0, valign: "middle",
    });

    // Three strips for guided practice
    const practiceStrips = [
      { filled: 6, y: CONTENT_TOP + 0.1 },
      { filled: 9, y: CONTENT_TOP + 0.78 },
      { filled: 2, y: CONTENT_TOP + 1.46 },
    ];
    practiceStrips.forEach((ps) => {
      addTenthsStrip(s, 5.0, ps.y, 4.2, ps.filled, { fillColor: C.TEAL, h: 0.46 });
    });

    // SR2 introduction card (bottom left)
    addCard(s, 0.5, CONTENT_TOP + 1.65, 4.4, 1.72, { strip: C.AMBER });
    s.addText("SR2 \u2014 Representing a Tenth", {
      x: 0.72, y: CONTENT_TOP + 1.75, w: 4.0, h: 0.32,
      fontSize: 13, fontFace: FONT_B, color: C.AMBER, bold: true, margin: 0,
    });
    s.addText([
      { text: "Work in pairs. Each partner shows the SAME decimal in a DIFFERENT way:", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
      { text: "  Partner A: Draw the tenths strip.", options: { bullet: true, breakLine: true, fontSize: 12, color: C.CHARCOAL } },
      { text: "  Partner B: Fill in the place value chart.", options: { bullet: true, breakLine: true, fontSize: 12, color: C.CHARCOAL } },
      { text: "Compare and discuss your representations.", options: { fontSize: 12, color: C.CHARCOAL, italic: true } },
    ], {
      x: 0.72, y: CONTENT_TOP + 2.15, w: 4.0, h: 1.05,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Stem sentence reminder (bottom)
    s.addShape("roundRect", {
      x: 0.5, y: 4.62, w: 9.0, h: 0.34, rectRadius: 0.08,
      fill: { color: C.LIGHT },
    });
    s.addText("\u201CThe whole is split into 10 equal parts. ___ parts are shaded. This represents ___ (___ tenths).\u201D", {
      x: 0.65, y: 4.62, w: 8.7, h: 0.34,
      fontSize: 11, fontFace: FONT_B, color: C.NAVY, italic: true,
      valign: "middle", margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 \u201CGreat work in Stage 2. Now it\u2019s \u2018We Do\u2019 time \u2014 I\u2019ll be here but you\u2019re doing more of the thinking.\u201D
\u2022 \u201CLook at each strip on the right side of the slide. With your partner, say the decimal AND the full stem sentence. Don\u2019t just say the number \u2014 say the whole sentence.\u201D
\u2022 After pair time: \u201C[Non-volunteer 1], what decimal does the first strip represent? Say the stem sentence.\u201D
\u2022 After each share: \u201CDoes everyone agree? Any differences?\u201D
\u2022 [After strips practice] \u201CNow we\u2019ll do SR2. With your partner, you\u2019ll both represent the SAME decimal but in DIFFERENT ways. Partner A draws the strip, Partner B fills the place value chart. Then compare.\u201D

DO:
\u2022 Point to each strip in turn; allow 30-45 seconds of pair talk per strip
\u2022 Call on at least 2 non-volunteers for the three strip examples
\u2022 Listen during pair talk for: correct count of filled parts, correct decimal, full stem sentence
\u2022 Distribute SR2 worksheets (or direct students to workbooks) after the strips CFU
\u2022 Circulate during SR2; listen for mathematical language; look for equal parts in strip drawings

TEACHER NOTES:
Stage 3 is the \u201CWe Do\u201D phase of the I Do / We Do / You Do gradual release structure in DECIDE. Students have pair support but are now generating the decimal and the stem sentence themselves, rather than choral-repeating after the teacher. SR2 tasks students with producing representations in two modes simultaneously (strip and chart) with different partners, which builds flexible thinking about the same quantity. The requirement that each partner uses a DIFFERENT representation prevents one student from copying the other and ensures both representations are practised.

WATCH FOR:
\u2022 Partners who split the task and only do their own representation, missing the comparison step \u2014 prompt: \u201CHow do you know both representations show the same decimal?\u201D
\u2022 Students who draw a strip with 10 sections but shade an incorrect number \u2014 they may be counting from the wrong end; redirect: \u201CAlways start shading from the left.\u201D

[Maths: Stage 2 Decimals | VTLM 2.0: Guided Practice \u2014 Structured Pairs]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 10 — Stage 3: Place Value Chart Connections (CFU: Cold Call)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["3"];
    addTopBar(s, stageColor);
    addStageBadge(s, 3, "Guided Practice (We Do)");
    addTitle(s, "Connecting Strips and Place Value Charts", { y: 0.65, fontSize: 21, color: stageColor });

    // Cold Call technique badge
    s.addShape("roundRect", {
      x: 0.5, y: 1.55, w: 2.8, h: 0.32, rectRadius: 0.08,
      fill: { color: stageColor },
    });
    s.addText("CFU: Cold Call (Non-Volunteer)", {
      x: 0.5, y: 1.55, w: 2.8, h: 0.32,
      fontSize: 9, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Task instructions header
    s.addText("Both directions: strip \u2192 chart  AND  chart \u2192 strip", {
      x: 0.5, y: 1.96, w: 9.0, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
    });

    // Example A: Strip → Chart
    addCard(s, 0.5, 2.34, 4.4, 2.52, { strip: stageColor });
    s.addText("A: Strip \u2192 Chart", {
      x: 0.72, y: 2.44, w: 3.9, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: stageColor, bold: true, margin: 0,
    });
    s.addText("5 parts shaded. Fill in the chart:", {
      x: 0.72, y: 2.82, w: 3.9, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    addTenthsStrip(s, 0.72, 3.18, 3.8, 5, { fillColor: C.TEAL, h: 0.44 });
    s.addText("= ? in the chart", {
      x: 0.72, y: 3.72, w: 3.8, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, align: "center", margin: 0,
    });
    addPlaceValueChart(s, 1.0, 4.05, ["Ones", "Tenths"], ["", ""], {
      headerColor: C.TEAL, cellW: 1.2,
    });

    // Example B: Chart → Strip
    addCard(s, 5.1, 2.34, 4.4, 2.52, { strip: C.AMBER });
    s.addText("B: Chart \u2192 Strip", {
      x: 5.32, y: 2.44, w: 3.9, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.AMBER, bold: true, margin: 0,
    });
    s.addText("The chart shows 0.8. Shade the strip:", {
      x: 5.32, y: 2.82, w: 3.9, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    addPlaceValueChart(s, 5.5, 3.18, ["Ones", "Tenths"], ["0", "8"], {
      headerColor: C.AMBER, cellW: 1.2,
    });
    s.addText("= shade ___ parts on strip", {
      x: 5.32, y: 3.98, w: 3.9, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, align: "center", margin: 0,
    });
    // Empty strip for student response
    addTenthsStrip(s, 5.5, 4.32, 3.8, 0, { fillColor: C.TEAL, h: 0.44 });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 \u201CWe\u2019re going to work in both directions now. First: you see the strip, you fill the place value chart. Then: I give you the chart, you shade the strip.\u201D
\u2022 For Example A: \u201CLook at the strip on the left. How many parts are shaded?\u201D [5] \u201CSo what goes in the Ones column?\u201D [0] \u201CAnd in the Tenths column?\u201D [5] \u201CWhat is the decimal?\u201D [0.5]
\u2022 For Example B: \u201CThe chart shows 0.8. How many parts do you shade on the strip?\u201D [8] \u201CWhy 8?\u201D [The tenths digit is 8]
\u2022 Cold call: \u201C[Name], without looking at your partner \u2014 for Example B, which column in the chart tells you how many parts to shade?\u201D
\u2022 After response: \u201CThat\u2019s right \u2014 the TENTHS column. The digit there tells you exactly how many tenths to shade.\u201D

DO:
\u2022 Point to the chart columns and the strip in sync as you explain
\u2022 Ask students to write answers in their workbooks before cold-calling
\u2022 For cold call: select students who have not yet contributed; say their name BEFORE the question (gives think time)
\u2022 Pause after the question: wait at least 5 seconds for a response
\u2022 Confirm or correct the response, then ask a second non-volunteer to explain WHY

CFU CHECKPOINT:
Technique: Cold Call (Non-Volunteer)
Script:
\u2022 \u201C[Name], look at the chart in Example B. Which column tells you how many parts to shade?\u201D [Tenths column]
\u2022 \u201C[Different name], and if the tenths column says 8, how many parts do you shade?\u201D [8]
\u2022 \u201C[Another name], so what decimal does the shaded strip show?\u201D [0.8]
\u2022 Look for: understanding that the TENTHS digit directly gives the count of shaded parts
PROCEED: If students correctly identify the tenths column and make the connection, move to Stage 4.
PIVOT: If students confuse ones and tenths columns (reading the digit from the wrong column): Redraw the chart on the board with a thick red vertical line between Ones and Tenths. Label it \u201CDecimal Point\u201D. \u201CWhole numbers are LEFT of this line. Tenths are RIGHT. The tenths digit tells you how many parts to shade out of 10.\u201D

TEACHER NOTES:
This slide does double duty: it assesses whether students can navigate between two representations (strip and chart) AND introduces bidirectional fluency. In the DECIDE framework, this is still Guided Practice but is moving towards independence \u2014 students are now expected to complete parts of the task without teacher narration. The cold call technique ensures non-volunteers are accountable and prevents the same few students from dominating. Waiting 5 seconds after naming a student before asking the question is a deliberate move: it gives the named student time to compose their response.

MISCONCEPTIONS:
\u2022 Misconception: Students read the Ones column value to determine how many parts to shade, rather than the Tenths column.
  Why: Students may read the chart left-to-right and grab the first digit they see, or may not yet have anchored the columns relative to the decimal point.
  Impact: Produces answers that are 10 times too large (e.g., treating 0.8 as if it requires shading 0 parts because the Ones column says 0, or shading nothing because they only read the zero).
  Quick correction: Physically cover the Ones column with your hand. \u201COnly look at the Tenths column. That\u2019s the one that tells you parts out of 10.\u201D

WATCH FOR:
\u2022 Students who shade ALL 10 parts for 0.8 (rounding up) \u2014 redirect: \u201C0.8 means 8 tenths, not the whole. Count carefully: 1, 2, 3, 4, 5, 6, 7, 8 \u2014 stop.\u201D
\u2022 Students who leave the Ones column blank instead of writing 0 \u2014 discuss: \u201C0 ones is still important; it tells us there are no whole numbers.\u201D

[Maths: Stage 2 Decimals | VTLM 2.0: Guided Practice \u2014 Cold Call CFU]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 11 — Stage 4: Independent Practice — Dice Activity
  // ═══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres,
    4,
    "Independent Practice (You Do)",
    "Dice Activity: Roll, Colour, Record",
    [
      "You will need: a 10-sided dice, a strip of paper with 10 equal sections, coloured pencils, your workbook.",
      "Step 1: Roll the 10-sided dice.",
      "Step 2: The number you roll = the number of tenths to colour on your strip.",
      "Step 3: Cut out the strip. Colour the correct number of sections.",
      "Step 4: Stick your strip in your workbook.",
      "Step 5: Record the decimal in NUMBERS (e.g., 0.6) AND WORDS (e.g., \u201Csix tenths\u201D).",
      "Rolled the same number again? Show a DIFFERENT representation (strip shape, chart, or written form).",
      "Enable: Colour 0.1, then 0.2, then 0.3 \u2026 in order.",
      "Extend: What decimal does the UNSHADED part of your strip show? What do you notice when you add the two decimals?",
    ],
    `SAY:
\u2022 \u201CNow it\u2019s YOUR turn. This part you do independently \u2014 no pair talking for the recording, but you can check materials with your neighbour.\u201D
\u2022 \u201CWe\u2019re going to roll a 10-sided dice and build our own decimal strips.\u201D
\u2022 Demonstrate: roll the dice, count out the tenths on a strip, shade them, write the decimal in numbers and words.
\u2022 \u201CIf you roll the same number again, don\u2019t just draw another identical strip \u2014 show it a DIFFERENT way: a place value chart, or just the written form with words.\u201D
\u2022 \u201CFor students needing support: instead of rolling randomly, start with 0.1 and work your way up to 0.9 in order.\u201D
\u2022 \u201CFor students ready for a challenge: after you shade the strip, look at the parts that are NOT shaded. What decimal do they show? What happens when you add the two decimals together?\u201D

DO:
\u2022 Distribute 10-sided dice (one per student or pair), pre-cut strip sections, coloured pencils
\u2022 Demonstrate the full process once before releasing students: roll, count, shade, cut, stick, record
\u2022 Set an expectation: aim for at least 3-4 strips recorded in the time
\u2022 Circulate continuously; focus on the RECORDING step (numbers AND words) \u2014 this is where errors accumulate
\u2022 Check: are strips cut with 10 EQUAL sections? Unequal sections should be discarded and restarted

TEACHER NOTES:
The dice activity provides genuine variation in practice \u2014 every student works with a different set of decimals, but the task structure is identical. This prevents copying and ensures each student has their own data set to reason about. The extend task (unshaded part) is a first encounter with the complement of a decimal (a + b = 1), which is foundational for later work on rounding and number sense. In the DECIDE framework this is the \u201CYou Do\u201D phase \u2014 the teacher\u2019s role shifts to monitoring and targeted intervention, not whole-class instruction. Resist the urge to re-teach whole-class here; pull small groups only.

WATCH FOR:
\u2022 Students recording the decimal as a fraction (e.g., \u201C6/10\u201D instead of \u201C0.6\u201D) \u2014 this is correct understanding but wrong notation for this task; redirect: \u201CAs a decimal with a point, please.\u201D
\u2022 Students who write the word form as \u201Czero point six\u201D rather than \u201Csix tenths\u201D \u2014 both are valid names but \u201Csix tenths\u201D shows place value understanding; prompt: \u201CTell me what PLACE the 6 is in.\u201D
\u2022 Fast finishers who attempt the extend task without checking their addition \u2014 ask them: \u201CDo your two decimals add to 1? Show me.\u201D

[Maths: Stage 2 Decimals | VTLM 2.0: Independent Practice \u2014 Open Task]`,
    FOOTER
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 12 — Stage 5: Exit Ticket
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.LAVENDER };
    s.addShape("rect", {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.PURPLE },
    });

    // Exit ticket badge
    s.addShape("roundRect", {
      x: 0.5, y: 0.2, w: 1.8, h: 0.36, rectRadius: 0.08,
      fill: { color: C.PURPLE },
    });
    s.addText("Exit Ticket", {
      x: 0.5, y: 0.2, w: 1.8, h: 0.36,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    addTitle(s, "Show What You Know: Complete the Table", {
      y: 0.65, fontSize: 22, color: C.PURPLE,
    });

    s.addText("Complete the table so the decimal, the strip picture, and the place value chart all match.", {
      x: 0.5, y: 1.1, w: 9.0, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    // Table header
    const tableHdrY = 1.5;
    const tableHdrH = 0.38;
    const colXs = [0.5, 3.0, 5.8];
    const colWs = [2.35, 2.65, 3.85];
    const hdrs = ["Decimal", "Tenths Strip", "Place Value Chart"];
    hdrs.forEach((h, i) => {
      s.addShape("rect", {
        x: colXs[i], y: tableHdrY, w: colWs[i], h: tableHdrH,
        fill: { color: C.PURPLE }, line: { color: C.WHITE, width: 1 },
      });
      s.addText(h, {
        x: colXs[i], y: tableHdrY, w: colWs[i], h: tableHdrH,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
    });

    // Row 1: decimal given (0.3), strip blank, chart blank
    const row1Y = tableHdrY + tableHdrH;
    const rowH = 0.78;
    // Decimal cell
    s.addShape("rect", {
      x: colXs[0], y: row1Y, w: colWs[0], h: rowH,
      fill: { color: C.WHITE }, line: { color: C.PURPLE, width: 1 },
    });
    s.addText("0.3", {
      x: colXs[0], y: row1Y, w: colWs[0], h: rowH,
      fontSize: 28, fontFace: FONT_H, color: C.NAVY,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    // Strip cell — blank strip
    s.addShape("rect", {
      x: colXs[1], y: row1Y, w: colWs[1], h: rowH,
      fill: { color: C.WHITE }, line: { color: C.PURPLE, width: 1 },
    });
    s.addText("Draw the strip:", {
      x: colXs[1] + 0.08, y: row1Y + 0.04, w: colWs[1] - 0.12, h: 0.28,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
    addTenthsStrip(s, colXs[1] + 0.1, row1Y + 0.32, colWs[1] - 0.25, 0, {
      fillColor: C.TEAL, emptyColor: C.WHITE, h: 0.3,
    });
    // Chart cell — blank chart
    s.addShape("rect", {
      x: colXs[2], y: row1Y, w: colWs[2], h: rowH,
      fill: { color: C.WHITE }, line: { color: C.PURPLE, width: 1 },
    });
    s.addText("Fill in the chart:", {
      x: colXs[2] + 0.08, y: row1Y + 0.04, w: colWs[2] - 0.12, h: 0.28,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
    addPlaceValueChart(s, colXs[2] + 0.15, row1Y + 0.32, ["Ones", "Tenths"], ["", ""], {
      headerColor: C.TEAL, cellW: 1.1,
    });

    // Row 2: strip given (7 shaded), decimal blank, chart blank
    const row2Y = row1Y + rowH;
    // Decimal cell — blank
    s.addShape("rect", {
      x: colXs[0], y: row2Y, w: colWs[0], h: rowH,
      fill: { color: C.WHITE }, line: { color: C.PURPLE, width: 1 },
    });
    s.addText("Write the decimal:", {
      x: colXs[0] + 0.08, y: row2Y + 0.06, w: colWs[0] - 0.12, h: 0.3,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
    s.addShape("roundRect", {
      x: colXs[0] + 0.3, y: row2Y + 0.38, w: 1.6, h: 0.3, rectRadius: 0.06,
      fill: { color: C.LAVENDER },
    });
    s.addText("_____", {
      x: colXs[0] + 0.3, y: row2Y + 0.38, w: 1.6, h: 0.3,
      fontSize: 16, fontFace: FONT_B, color: C.MUTED,
      align: "center", valign: "middle", margin: 0,
    });
    // Strip cell — 7 shaded (given)
    s.addShape("rect", {
      x: colXs[1], y: row2Y, w: colWs[1], h: rowH,
      fill: { color: C.WHITE }, line: { color: C.PURPLE, width: 1 },
    });
    addTenthsStrip(s, colXs[1] + 0.1, row2Y + 0.24, colWs[1] - 0.25, 7, {
      fillColor: C.TEAL, emptyColor: C.WHITE, h: 0.3,
    });
    // Chart cell — blank
    s.addShape("rect", {
      x: colXs[2], y: row2Y, w: colWs[2], h: rowH,
      fill: { color: C.WHITE }, line: { color: C.PURPLE, width: 1 },
    });
    s.addText("Fill in the chart:", {
      x: colXs[2] + 0.08, y: row2Y + 0.04, w: colWs[2] - 0.12, h: 0.28,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
    addPlaceValueChart(s, colXs[2] + 0.15, row2Y + 0.3, ["Ones", "Tenths"], ["", ""], {
      headerColor: C.TEAL, cellW: 1.1,
    });

    // Instruction strip at bottom
    s.addShape("roundRect", {
      x: 0.5, y: row2Y + rowH + 0.12, w: 9.0, h: 0.42, rectRadius: 0.09,
      fill: { color: C.PURPLE },
    });
    s.addText("Complete independently. When done: check your answers with a partner.", {
      x: 0.65, y: row2Y + rowH + 0.12, w: 8.7, h: 0.42,
      fontSize: 12, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 \u201CAlmost done! Time for your exit ticket. This is your chance to show ME what YOU know \u2014 independently.\u201D
\u2022 \u201CThe table has three columns: the decimal, the strip picture, and the place value chart. Your job is to complete any blank cell so all three match.\u201D
\u2022 \u201CRow 1: I\u2019ve given you the decimal 0.3. You need to draw the strip AND fill the place value chart.\u201D
\u2022 \u201CRow 2: I\u2019ve given you the strip \u2014 7 parts shaded. You need to write the decimal AND fill the place value chart.\u201D
\u2022 \u201CThis is independent \u2014 no talking until you\u2019ve finished. Then you may check with a partner.\u201D
\u2022 After most are done: call on 2-3 non-volunteers to share their answers for each cell.

DO:
\u2022 Distribute the printed exit ticket (or direct students to the table in their workbook)
\u2022 Circulate silently while students work \u2014 do NOT intervene unless a student is completely stuck
\u2022 After 3-4 minutes, ask 2-3 non-volunteers to share: \u201CFor Row 1, what did you put in the strip?\u201D \u201CFor the chart?\u201D
\u2022 Collect exit tickets as students leave \u2014 sort into three piles: got it, partial, needs support
\u2022 Use the three piles to inform tomorrow\u2019s lesson groupings

TEACHER NOTES:
The exit ticket is the formal assessment data point for this lesson. It checks all three success criteria simultaneously: the decimal (SC1), the strip (SC2), and the chart (SC3). Two rows are used so that students cannot simply memorise one mapping \u2014 they must work in both directions (decimal-to-representation and representation-to-decimal). The exit ticket sorting process (got it / partial / needs support) is the DECIDE framework\u2019s \u201CCheck for Understanding\u201D at the lesson level \u2014 it informs grouping and re-teaching decisions for Lesson 4. Students who cannot complete Row 2 (strip to decimal) are likely to have the tenths/ones confusion from Slide 10 and need targeted intervention on place value column identification.

WATCH FOR:
\u2022 Students who complete Row 1 (decimal given) correctly but cannot complete Row 2 (strip given) \u2014 this isolates whether the difficulty is reading the notation or producing it from a visual
\u2022 Students who write 10 tenths as 0.10 in the chart \u2014 there is no Row for this in today\u2019s exit ticket but watch for it in written responses during sharing

Expected answers:
\u2022 Row 1 (0.3): Strip = 3 parts shaded; Chart = Ones: 0, Tenths: 3
\u2022 Row 2 (7 shaded): Decimal = 0.7; Chart = Ones: 0, Tenths: 7

[Maths: Stage 2 Decimals | VTLM 2.0: Assessment for Learning \u2014 Exit Ticket]`);
  }


  // ── Write file ─────────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: "output/Lesson_PV3_Tenths.pptx" });
  console.log("Done: output/Lesson_PV3_Tenths.pptx");
}

build().catch(console.error);
