// Lesson 2 of 4: Vertical Multiplication & Lattice Method — Review & Fluency
// Year 5/6 Numeracy — Four Processes Review Week
// Focus: Both vertical and lattice multiplication methods, common errors, and practice
// Week 1, Session 2

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
const LESSON = LESSONS[2];
const RESOURCES = LESSON.resources;
const T = createTheme(UNIT.subject, UNIT.yearLevel, UNIT.variant);
const {
  C, FONT_H, FONT_B,
  titleSlide, liSlide, contentSlide, cfuSlide, closingSlide,
  workedExSlide, exitTicketSlide, addStageBadge,
  withReveal,
  addTopBar, addBadge, addTitle, addCard, addInstructionCard, addFooter, addTextOnShape,
  iconToBase64Png, getContrastColor,
  SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;

const OUT_DIR = LESSON.outDir;
const FOOTER = LESSON.footer;

// ── Teacher notes ─────────────────────────────────────────────────────────────

const NOTES_TITLE = `SAY:
- "Welcome to Session 2 of our Four Processes review week. Today we're covering two multiplication methods: the vertical algorithm and the lattice method."
- "Both of these are review. Today is about sharpening accuracy and having two tools in your toolkit."

DO:
- Display the title slide as students settle. Ensure mini-whiteboards, markers, and erasers are on every desk.
- "This is Session 2 of 4. Yesterday was addition and subtraction. Today is multiplication — two methods."

TEACHER NOTES:
Lesson 2 of a 4-session review week. Students have been taught both the vertical algorithm and lattice method before. The first half focuses on vertical multiplication (single-digit and two-digit multipliers). The second half introduces the lattice method as an alternative strategy. Key misconceptions: placeholder zero in vertical method, diagonal direction and tens/ones split in lattice.

WATCH FOR:
- Students who seem unfamiliar with either method — note for enabling support.
- Readiness signal: students settling quickly with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR1 = `SAY:
• "Let's warm up with some daily review. Question 1 is about prime factorisation — breaking composite numbers into their prime building blocks."
• "Express 36 as a product of prime factors. Start by dividing by the smallest prime."
• "Then use your prime factorisation to simplify 36 times 25. Think: can you rearrange factors to make the multiplication easier?"

DO:
• Display the slide. Read the questions aloud.
• Allow 90 seconds. Students work on whiteboards.
• Check Q1: "36 = 2 times 2 times 3 times 3. We can write this as 2 squared times 3 squared."
• Check Q2: "36 times 25: Rewrite 36 as 4 times 9. Then 4 times 25 = 100, and 100 times 9 = 900. Prime factorisation helps us spot shortcuts!"

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "Hold up your prime factorisation of 36. I'm looking for four primes multiplied together. Ready... show me!"
• Scan for: 2 x 2 x 3 x 3 on >=80% of boards.
PROCEED: If >=80% correct, move to DR Slide 2.
PIVOT: If students struggle, model the factor tree on the board: "36 splits into 6 times 6. Each 6 splits into 2 times 3. So 36 = 2 x 2 x 3 x 3."

TEACHER NOTES:
DR Topic 1 targets: "Multiplication and Division — I can represent composite numbers as a product of their factors, including prime factors when necessary and using this form to simplify calculations involving multiplication." The prime factorisation of 36 requires students to systematically decompose the number using factor trees or repeated division. The simplification task (36 x 25) tests whether students can strategically rearrange factors — recognising that 4 x 25 = 100 is the key insight. This connects to today's multiplication focus because efficient multiplication often relies on number sense and flexible factor manipulation.

WATCH FOR:
• Students who stop at 36 = 6 x 6 or 36 = 4 x 9 — these are factorisations but not PRIME factorisations. Redirect: "Are 6 and 9 prime? Can you break them down further?"
• Students who cannot see the simplification shortcut — this is common. The skill of rearranging factors for efficiency is an extension. Don't hold up the lesson for it.
• Readiness signal: students quickly producing 2 x 2 x 3 x 3 and attempting the simplification.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_DR2 = `SAY:
• "Now let's review division with remainders. This connects to yesterday's work."
• "47 divided by 5. How many times does 5 go into 47? What's left over?"
• "Now express that remainder three ways: as a whole number with remainder, as a fraction, and as a decimal."

DO:
• Display the slide. Read the question aloud.
• Allow 60 seconds. Students work on whiteboards.
• Check: "5 goes into 47 nine times — that's 45. Remainder is 2. So 47 divided by 5 = 9 remainder 2."
• "As a fraction: 9 and 2 fifths. As a decimal: 9.4 — because 2 fifths is the same as 4 tenths."

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "Show me 47 divided by 5 as a decimal. Boards up... show me!"
• Scan for: 9.4 on >=80% of boards.
PROCEED: If >=80% correct, move to Fluency.
PIVOT: If students write 9.2, they are writing the remainder as a decimal digit rather than converting. Reteach: "The remainder is 2, but we divide by 5. Two fifths. What's 2 divided by 5? That's 0.4. So it's 9.4, not 9.2."

TEACHER NOTES:
DR Topic 2 targets: "Number Properties and Algorithms — I can solve division problems including remainders and express the result as a whole number, fraction or decimal." The number 47 divided by 5 is chosen because the decimal conversion is clean (0.4) but requires students to understand that the remainder IS the numerator of a fraction with the divisor as denominator. The most common error is writing 9.2 instead of 9.4 — students append the remainder directly as a decimal digit. This is a critical misconception to address because it reveals a fundamental misunderstanding of what a decimal remainder represents.

WATCH FOR:
• Students who write 9 r 2 but cannot convert to a fraction — they may not connect remainder to the fractional part. Prompt: "What fraction of 5 is the remainder 2?"
• Students who write 9.2 — see pivot above. This is the most common error.
• Students who cannot perform the initial division — they may need multiplication table support. "What's 5 times 9?"
• Readiness signal: students confidently writing all three representations.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `SAY:
• "Fluency sprint! You have 60 seconds. This targets the tables that trip students up most: times 6, 7, 8, 9, and 12."
• "Write ONLY the answers. No working out — this is about instant recall."
• "Ready? Pencils up... GO."
• After 60 seconds: "Pens down. Let's check. Call out your answer for number 1..."

DO:
• Display the slide. Students work silently for 60 seconds on the multiplication grid.
• Time exactly 60 seconds. Say "GO" to start and "STOP" to end.
• Read answers aloud quickly — students self-mark. Ask for hands: "Who got 10 or more correct?"

TEACHER NOTES:
Fluency builds automaticity with the multiplication facts students need during vertical multiplication. If a student has to think about 6 x 8 = 48 during a multi-digit multiplication, they lose working memory capacity for the regrouping process. The 60-second sprint format builds speed. Problems deliberately target x6, x7, x8, x9, x12 — the tables most likely to cause hesitation. Answers: 1) 42 2) 54 3) 72 4) 108 5) 56 6) 63 7) 96 8) 84 9) 48 10) 81 11) 64 12) 72.

WATCH FOR:
• Students who freeze — they may lack confidence with harder tables. Encourage: "Start with the ones you know."
• Students who finish very quickly — they are ready for the lesson. Note who they are for potential extending challenges.
• Readiness signal: most students completing 8+ problems in 60 seconds.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `SAY:
- Read the LI from the slide. "Today we're reviewing two multiplication methods."
- Read each SC aloud. "SC1 is the vertical method — you've done this before. SC2 is about setting up the lattice grid. SC3 is about adding along the diagonals to get your answer."

DO:
- Display the slide. Point to the LI as you read it.
- Point to each SC in turn. Leave visible for 20 seconds.

TEACHER NOTES:
SC1 covers the vertical algorithm (single and two-digit multipliers, including placeholder zero). SC2 and SC3 break the lattice method into its two key steps: grid setup with products, then diagonal addition. All three are review skills.

WATCH FOR:
- Students who look anxious at "lattice method" — reassure that it will be taught step by step.
- Readiness signal: students nodding, possibly mouthing the SC to themselves.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_WE1 = `SAY:
• "Watch me work through 347 times 6. I'll think aloud so you can hear my reasoning."
• Think-aloud: "I need to multiply 347 by 6. First, let me set it up. 347 goes on top, 6 goes on the bottom, lined up under the ones column. I draw my multiplication sign and my line."
• "I start from the ONES column. 6 times 7 equals 42. I write the 2 in the ones column and carry the 4 above the tens column."
• "Next, the TENS column. 6 times 4 equals 24, plus the 4 I carried makes 28. I write the 8 in the tens column and carry the 2 above the hundreds column."
• "Finally, the HUNDREDS column. 6 times 3 equals 18, plus the 2 I carried makes 20. I write 20."
• Self-monitoring: "Let me estimate first: 350 times 6 is about 2,100. My answer is 2,082. That's close to 2,100 — it makes sense."
• "347 times 6 equals 2,082."

DO:
• Display the slide. Walk through each step slowly, pointing to the visual on the right.
• Physically write on the board or point to each digit as you narrate.
• Pause at each carry: "I carry the 4. Where does it go? Above the NEXT column."
• Emphasise the estimation check at the end — this is a critical self-monitoring habit.

TEACHER NOTES:
This is the first I Do worked example — a 3-digit by 1-digit multiplication with regrouping. 347 x 6 is chosen because every column requires regrouping (7x6=42, carry 4; 4x6+4=28, carry 2; 3x6+2=20), which forces students to practise the carry process three times. The think-aloud models three key habits: (1) starting from the ones column, (2) carrying correctly, (3) estimating to check reasonableness. The estimation is deliberately placed at the end, modelling the self-monitoring step. Students have seen this before — the purpose is to reactivate the procedure and highlight the carry process.

MISCONCEPTIONS:
• Misconception: "I add the carried number BEFORE multiplying."
  Why: Students may think carry means "add to the digit before multiplying." They compute 6 x (4+4) = 48 instead of (6 x 4) + 4 = 28.
  Impact: Produces wildly incorrect answers in higher columns.
  Quick correction: "Multiply FIRST, then add the carry. The carry gets added AFTER the multiplication, not before."

• Misconception: "I start from the hundreds column."
  Why: Students read left-to-right and may apply this to multiplication.
  Impact: Makes carrying impossible because you don't yet know what to carry.
  Quick correction: "Always start from the ones. You can't carry into a column you haven't calculated yet."

WATCH FOR:
• Students following along on whiteboards — encourage this.
• Students who look confused at the carry step — they may need the enabling scaffold (place value grid) during We Do.
• Readiness signal: students nodding along, possibly mouthing the steps.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_WE2 = `SAY:
• "Now the big one — 258 times 34. This is a TWO-digit multiplier. Watch carefully."
• "I set it up: 258 on top, 34 on the bottom, digits aligned."
• "Step 1 — I multiply by the ONES digit first. That's the 4 in 34."
• "4 times 8 = 32. Write 2, carry 3."
• "4 times 5 = 20, plus 3 = 23. Write 3, carry 2."
• "4 times 2 = 8, plus 2 = 10. Write 10."
• "First partial product: 1,032."
• "Step 2 — NOW I multiply by the TENS digit. That's the 3, but it represents 30."
• Deliberate error: "Watch — I'm tempted to start writing directly under the ones column... but the 3 represents 30, so I MUST put a zero placeholder first. This is where most mistakes happen."
• "I write a 0 in the ones column. Now: 3 times 8 = 24. Write 4, carry 2."
• "3 times 5 = 15, plus 2 = 17. Write 7, carry 1."
• "3 times 2 = 6, plus 1 = 7. Write 7."
• "Second partial product: 7,740."
• "Step 3 — ADD the partial products. 1,032 + 7,740 = 8,772."
• Self-monitoring: "Estimate: 260 times 34 is about 260 times 30 = 7,800 plus 260 times 4 = 1,040, so roughly 8,840. My answer is 8,772. Close enough — makes sense."

DO:
• Display the slide. Walk through each step methodically.
• When you reach the placeholder zero, STOP and make eye contact with the class.
• "This zero is the NUMBER ONE mistake in two-digit multiplication. It's not optional. It's not decoration. It shifts everything into the tens column because we're multiplying by 30, not 3."
• Write the partial products clearly and model the addition step.
• Show the estimation check.

TEACHER NOTES:
This worked example tackles the hardest procedural step in vertical multiplication: the two-digit multiplier with partial products. 258 x 34 is chosen because every column in both partial products requires regrouping, giving maximum practice with the carry process. The deliberate near-error at the placeholder zero is critical — research consistently shows this is the most common error in two-digit multiplication. The teacher should dramatise the near-mistake to make the placeholder zero memorable. The three-step structure (multiply by ones, multiply by tens with placeholder, add partial products) must be explicit and labelled.

MISCONCEPTIONS:
• Misconception: "Forgetting the placeholder zero when multiplying by the tens digit."
  Why: Students see 34 as "3 and 4" rather than "30 and 4." They multiply by 3 and align the result in the ones column.
  Impact: The second partial product is 10 times too small, producing an answer roughly 10x too low for that partial product.
  Quick correction: "The 3 in 34 means 30, not 3. The placeholder zero shows that. Without it, you're multiplying by 3 instead of 30. Your answer would be about 774 instead of 7,740 for that row."

• Misconception: "Misaligning partial products before adding."
  Why: If students don't use lined paper or place value columns, digits shift and the addition is wrong.
  Impact: Can produce an answer that's off by hundreds or thousands.
  Quick correction: "Use grid paper or draw vertical place value lines. Every digit must sit in its correct column."

• Misconception: "Only multiplying by the ones digit of the multiplier."
  Why: Students may think they only need one row of multiplication and forget the second partial product entirely.
  Impact: Answer is roughly one-third of what it should be (e.g., 1,032 instead of 8,772).
  Quick correction: "Two-digit multiplier means TWO rows of multiplication. You multiply by the 4 AND the 30. Then add them together."

WATCH FOR:
• Students who start copying the working — good sign, they're engaging.
• Students who look lost at the partial products step — they may only have experience with single-digit multipliers. Flag for the enabling scaffold.
• Readiness signal: students following the three-step process and anticipating the placeholder zero.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU_SHOWME = `SAY:
• "Quick check. On your whiteboards, work out 429 times 7."
• "Set it up vertically. Start from the ones. Show all your carries."
• "You have 45 seconds. When I say GO, boards up."
• After boards: "Let's check. 7 times 9 = 63. Write 3, carry 6. 7 times 2 = 14, plus 6 = 20. Write 0, carry 2. 7 times 4 = 28, plus 2 = 30. Answer: 3,003."

DO:
• Display the question slide (no answer visible). Students work on whiteboards.
• Time 45 seconds. Circulate and glance at boards.
• "Boards up — show me!" Scan quickly for correct answers.
• Click to reveal the worked solution.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "Set it up, work through it, boards up when I say GO. Ready... GO!"
• Scan for: 3,003 with carries shown on >=80% of boards.
PROCEED: If >=80% correct with working shown, move to We Do.
PIVOT: Most likely errors:
  - 3,063 (forgot to add carry of 6 to next column — carried but didn't add)
  - 2,903 (incorrect carry — wrote 6 instead of carrying it, or dropped a carry)
  - "Off by one" errors in any column indicate multiplication fact gaps.
  Reteach: Model the problem step-by-step on the board, emphasising "multiply THEN add carry."

TEACHER NOTES:
This CFU checks SC2 (single-digit multiplier with regrouping). 429 x 7 requires carrying in every column (9x7=63, 2x7+6=20, 4x7+2=30), making it a thorough test of the regrouping process. Show Me Boards is the right technique here because it gives instant whole-class data — you can see exactly where errors are occurring. The withReveal structure shows the question first, then reveals the worked solution on the next slide.

WATCH FOR:
• Students who write 3003 but with no carries shown — they may be doing it mentally. That's fine for this problem, but push: "Show me your carries for the harder problems."
• Students who get a very different answer (e.g., 2000s or 4000s) — they likely have a multiplication fact error. Check: "What's 7 times 9?"
• Readiness signal: quick, confident answers with carries clearly shown.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `SAY:
• "Your turn with a partner. Work out 568 times 8 on your whiteboards."
• "Talk to your partner as you work. Explain each step aloud — what are you multiplying? What are you carrying?"
• "You have 60 seconds. Then boards up."
• After boards: "Let's check together."

DO:
• Display the question slide. Students work in pairs on whiteboards.
• Circulate — listen for correct self-talk ("8 times 8 is 64, write 4, carry 6").
• After 60 seconds: "Boards up!" Scan.
• Click to reveal worked solution.

CFU CHECKPOINT:
Technique: Show Me Boards (Paired)
Script:
• "Work with your partner. One person writes, the other checks the carries. Boards up in 60 seconds."
• Scan for: 4,544 on >=80% of boards.
PROCEED: If >=80% correct, move to We Do Problem Pair 2 (two-digit multiplier).
PIVOT: If many students show incorrect answers:
  - Common error 4,504 (dropped carry from tens to hundreds): Model just that column. "6 times 8 = 48, plus the 6 we carried = 54. Write 4, carry 5."
  - Common error 4,464 (8x8=64 carry wrong): Check table knowledge.
  Re-do with simpler problem: "Try 234 x 5 first. Show me every carry."

TEACHER NOTES:
This We Do problem (568 x 8) is a single-digit multiplier with heavy regrouping: 8x8=64 (carry 6), 6x8+6=54 (carry 5), 5x8+5=45. Every column produces a two-digit result requiring a carry. The paired working format encourages mathematical talk — one student computes while the other monitors carries. This is a bridge between the I Do and independent work. The withReveal structure lets the teacher show the question, have students work, then click to show the solution.

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Provide grid-lined paper with place value columns pre-drawn (H, T, O columns). Students write each digit in a separate cell. This reduces alignment errors and makes carries visible.
• Extra Notes: Seat enabling students near the front where the worked example from I Do is still visible.

EXTENDING PROMPT:
• Task: "After solving 568 x 8, estimate 568 x 80. How does it relate to your answer?" (It's 10 times larger — 45,440.)
• Extra Notes: This previews the placeholder zero concept from WE2.

WATCH FOR:
• Partners who disagree — excellent! Have them check each other's work column by column.
• Students who don't show carries — push: "Where's your carry? I need to see it."
• Readiness signal: partners finishing within 30 seconds with correct working.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `SAY:
• "Now the challenge — a two-digit multiplier. Work out 374 times 26."
• "Remember the three steps: (1) multiply by the ones digit, (2) placeholder zero then multiply by the tens digit, (3) add partial products."
• "Talk through each step with your partner. You have 90 seconds."
• After boards: "Let's check together."

DO:
• Display the question slide. Students work in pairs for 90 seconds.
• Circulate actively — specifically check that students are:
  1. Writing two partial products (not just one)
  2. Including the placeholder zero in the second row
  3. Adding partial products correctly
• "Boards up!" Scan for correct answer and TWO rows of multiplication.
• Click to reveal worked solution.

CFU CHECKPOINT:
Technique: Show Me Boards (Paired)
Script:
• "I need to see TWO partial products and the final sum. Boards up in 90 seconds."
• Scan for: 9,724 with both partial products visible (2,244 and 7,480).
PROCEED: If >=80% show correct answer with both partial products, move to Hinge Question.
PIVOT: Most likely errors:
  - 2,992 (only multiplied by 6, forgot the tens multiplication entirely): "You did 374 x 6. But the multiplier is 26. You need a SECOND row for the 20."
  - 9,784 or similar (placeholder zero missing — second partial product misaligned): "Your second row is off by a column. Did you put the placeholder zero?"
  - 10,404 or similar (arithmetic error in adding partial products): "Your partial products look right, but check your addition."
  Reteach: Show the three steps on the board. Emphasise the placeholder zero with colour.

TEACHER NOTES:
This We Do problem (374 x 26) tests SC3 — the full two-digit multiplier process. The partial products are 374 x 6 = 2,244 and 374 x 20 = 7,480. Students must execute the three-step process: multiply by ones (6), multiply by tens (2) with placeholder zero, add partial products. 90 seconds is generous — most students should finish in 60. The extra time is for checking. This is the critical transition problem before the Hinge Question, which tests conceptual understanding of partial products.

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Provide a partially completed template: "374 x 6 = ____" (first partial product) and "374 x 20 = ____0" (with the zero pre-filled). Students complete each multiplication and then add.
• Extra Notes: Breaking the two-digit multiplication into two separate single-digit multiplications (with the zero pre-filled) scaffolds the procedure while maintaining the mathematical structure.

EXTENDING PROMPT:
• Task: "Can you solve 374 x 26 using the area model (grid method) and compare it to the vertical method? Which do you prefer and why?"
• Extra Notes: The area model breaks 374 x 26 into (300+70+4) x (20+6) = 6 partial products. It connects to the vertical method but makes the place value explicit.

WATCH FOR:
• Students who write only one row — they're treating 26 as a single-digit multiplier. Redirect: "26 has TWO digits. How many rows of multiplication do you need?"
• Students who multiply by 2 instead of 20 (no placeholder zero) — the answer will be roughly 1,000 too small. "Check: is your answer close to 374 x 25 = about 9,350?"
• Partners who split the work (one does x6, other does x20) — this is a good strategy! Affirm it.
• Readiness signal: partners finishing within 60 seconds with correct two-row layout.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `SAY:
• "Hinge question time. I need to know if you truly understand the partial products."
• "Look at the four options. Which calculation shows the CORRECT partial products for 156 times 43?"
• "Don't calculate the whole thing — just identify which option has the right partial products."
• "Hold up A, B, C, or D fingers. You have 15 seconds to decide."
• After finger vote: "The answer is..."

DO:
• Display the question slide with four options. Allow 15 seconds of thinking time.
• "Show me fingers — A, B, C, or D." Scan the room quickly.
• Click to reveal the answer and explanations.
• Address each distractor briefly: "Option A forgot the placeholder zero. Option C multiplied both digits by ones. Option D has the partial products in the wrong order and arithmetic errors."

CFU CHECKPOINT:
Technique: Finger Voting (A–D)
Script:
• "Hold up fingers — 1 for A, 2 for B, 3 for C, 4 for D. Ready... show me!"
• Scan for: 2 fingers (option B) on >=80% of hands.
PROCEED: If >=80% choose B — students understand partial products structure. Release to You Do.
PIVOT: Most likely error patterns:
  - Students choosing A (468 + 6240): They correctly multiplied by 3 and 4, but forgot the placeholder zero in the second partial product. The 6,240 should be 624 without the zero — wait, no: A says 468 + 6240. Actually 156 x 3 = 468 (correct), and 156 x 4 = 624 (correct ones product without zero). So A would show 468 + 624 = missing placeholder. Let me recalculate for the notes...
  Actually, I need to carefully set up the options in the slide. Let me define them:
  Correct: 156 x 43 => partial product 1: 156 x 3 = 468; partial product 2: 156 x 40 = 6,240. Sum = 6,708.
  - Option A: 468 + 624 (forgot placeholder — multiplied by 4 not 40)
  - Option B: 468 + 6,240 (correct)
  - Option C: 468 + 468 (multiplied by 3 twice)
  - Option D: 624 + 4,680 (swapped — multiplied by 4 for ones and 3 for tens, which gives wrong result)

  Students choosing A: Don't understand the placeholder zero — the core misconception.
  Students choosing C: Don't understand that you multiply by BOTH digits of the multiplier.
  Students choosing D: Understand the structure but confused the order.
  Reteach A: "Look at the 4 in 43. It's in the TENS column. It represents 40, not 4. So we multiply 156 x 40 = 6,240."
  Reteach C: "You've multiplied by 3 twice. But the multiplier is 43 — two different digits."
  Reteach D: "You multiplied by the right digits but swapped which is ones and which is tens."

TEACHER NOTES:
This hinge question tests conceptual understanding of the partial products structure, not just procedural execution. Students must recognise that 156 x 43 produces partial products of 156 x 3 (= 468) and 156 x 40 (= 6,240). Each distractor targets a specific misconception. Option A (missing placeholder) is the most diagnostic — students who choose it can execute multiplication but don't understand why the placeholder zero exists. Option C (multiplied by 3 twice) reveals students who don't parse the two-digit multiplier correctly. Option D (swapped order) is a more sophisticated error.

WATCH FOR:
• Students who choose A — they need explicit reteaching of the placeholder zero before You Do.
• Students who hold up fingers uncertainly — they may be guessing. Ask them to check on whiteboards.
• Readiness signal: fast, confident holds for option B.

[Maths: Monitor Progress — Hinge Question | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `SAY:
- "Time to practise independently. Your worksheet has two sections."
- "Section A: vertical multiplication — 4 problems. Section B: lattice method — 3 problems."
- "Show all working. Estimate to check. You have 10 minutes."

DO:
- Distribute Session 2 Worksheet (one per student).
- Set a visible timer for 10 minutes.
- Circulate — visit enabling students first, then extending.

TEACHER NOTES:
Section A (vertical): (1) 253 x 7 = 1,771 (2) 486 x 9 = 4,374 (3) 324 x 15 = 4,860 (4) 478 x 32 = 15,296. Section B (lattice): (5) 53 x 47 = 2,491 (6) 86 x 35 = 3,010 (7) 245 x 36 = 8,820. Problems increase in difficulty across both sections.

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Complete problems 1-3 (vertical, single-digit) and problem 5 (lattice, 2x2). Use grid-lined paper for vertical and pre-drawn lattice grids.

EXTENDING PROMPT:
- Task: After completing all 7 problems, collect the Session 2 Extension — Multiplying by 11 investigation.

WATCH FOR:
- Students who skip the placeholder zero on problems 3-4.
- Students who put products in the wrong triangle in lattice problems.
- Readiness signal: completing Section A in under 5 minutes.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `SAY:
- "Pens down on the worksheet. Exit ticket time — three questions."
- "Work silently and independently. You have 4 minutes."

DO:
- Display the exit ticket slide. Students write answers in maths books.
- Set a timer for 4 minutes. Circulate silently.

TEACHER NOTES:
Q1: 362 x 9 = 3,258 — tests SC1 (vertical, single-digit multiplier with regrouping).
Q2: Use the lattice method to solve 67 x 43 = 2,881 — tests SC2 and SC3.
Q3: "Which method did you find easier — vertical or lattice? Why?" — metacognitive reflection.

Sort responses:
(1) Q1 wrong — need vertical method reteaching.
(2) Q2 wrong — need lattice method reteaching.
(3) Both correct — ready for division in Session 3.

WATCH FOR:
- Students who cannot set up the lattice grid for Q2 — they may have been copying during We Do.
- Students who give vague Q3 answers — push for specifics.

[Maths: Summarise — Exit Ticket | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `SAY:
- "Here are the printable resources for today. Click any link to open the PDF."
- "Session 2 Enabling Scaffold is the supported version with pre-drawn vertical and lattice frames."

DO:
- Display the slide briefly. Teachers can click hyperlinks to open PDFs.

TEACHER NOTES:
All PDFs are in the resources-session2 folder alongside this PPTX. Print the worksheet before the lesson (one per student). Print a small set of Session 2 Enabling Scaffold copies for students who need the layout drawn for them. The answer key is teacher reference only. The extension is for extending students (3-5 copies).

WATCH FOR:
- N/A — teacher-facing slide.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `SAY:
- Read each SC aloud. "Thumbs up, sideways, or down for each one."
- "Turn to your partner: Which multiplication method do you prefer — vertical or lattice? Why? 30 seconds."
- "Tomorrow we review short division. Well done today."

DO:
- Display the closing slide. Run thumbs for each SC.
- Allow 30 seconds for partner discussion. Listen to 2-3 pairs.

TEACHER NOTES:
The closing reviews both multiplication methods. Students who prefer vertical often cite speed; students who prefer lattice often cite reduced carrying errors. Both are valid. The preview of division in Session 3 connects to the unit trajectory.

WATCH FOR:
- Students who show thumbs-down on SC2 or SC3 — they may need lattice method reteaching.
- Readiness signal: confident thumbs and articulate method preferences.

[Maths: Summarise — Closing | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_LATTICE_IDO = `SAY:
- "Now we're switching to a different multiplication method: the lattice."
- "Watch me solve 47 x 63 step by step."
- Think-aloud: "47 has 2 digits, 63 has 2 digits, so I need a 2x2 grid."
- "I draw diagonals in every cell — top-right to bottom-left. These separate tens from ones."
- "I write 4 and 7 across the top, 6 and 3 down the right side."
- "Now I multiply into each cell: 7 x 6 = 42, so 4 above the diagonal, 2 below."
- "Then I add along each diagonal from bottom-right: 1, 6, 9, 2. Answer: 2,961."
- "Check: 50 x 60 = 3,000. Close — makes sense."

DO:
- Display the slide. Draw each step alongside the slide visual.
- Physically trace the diagonal addition — start from bottom-right.
- Pause at the tens/ones split — this is where most errors occur.

TEACHER NOTES:
47 x 63 is chosen because no diagonal requires regrouping, making it a clean first example. The answer 2,961 is close to 3,000 estimate. Five key steps: draw grid, draw diagonals, multiply into cells (split tens/ones), add along diagonals, read answer.

WATCH FOR:
- Students who look confused at the grid — encourage drawing their own alongside.
- Students already nodding — they may have strong prior knowledge.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_LATTICE_CFU = `SAY:
- "Your turn. On your whiteboards, complete the lattice for 56 x 38."
- "Draw a 2x2 grid. Diagonals in every cell. 5 and 6 across the top, 3 and 8 down the right."
- "Multiply, split tens and ones, add diagonals. 60 seconds. Boards up when I say GO."

DO:
- Display the question slide. Students work on whiteboards for 60 seconds.
- Circulate — check diagonals and product placement.
- "Boards up — show me!" Scan for correct grids.
- Click to reveal the worked solution.

TEACHER NOTES:
56 x 38 = 2,128. This problem requires regrouping in diagonal addition (D2: 4+0+8=12, carry 1; D3: 4+5+1=10+1=11, carry 1). Products: 5x3=15, 6x3=18, 5x8=40, 6x8=48.

WATCH FOR:
- Students who write the whole product in one triangle — remind about the tens/ones split.
- Students who add across rows instead of along diagonals.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_LATTICE_WEDO = `SAY:
- "Your turn with a partner. Use the lattice method for 84 x 57."
- "2 columns for 84, 2 rows for 57. Fill in each cell, add diagonals."
- "60 seconds — boards up!"

DO:
- Display the question. Students work in pairs on whiteboards.
- Circulate — check grid setup and diagonal addition.
- Click to reveal: "84 x 57 = 4,788."

TEACHER NOTES:
84 x 57 = 4,788. Products: 8x5=40, 4x5=20, 8x7=56, 4x7=28. Diagonals: D1=8, D2=2+6+0=8, D3=5+0+2=7, D4=4. No regrouping needed in diagonals.

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Provide a pre-drawn 2x2 lattice grid with diagonals. Students fill in products and add diagonals.

EXTENDING PROMPT:
- Task: "Verify your lattice answer using the vertical method. Which was faster?"

WATCH FOR:
- Students who set up the grid but freeze at multiplication — fact fluency issue, not a method issue.
- Readiness signal: correct grids completed in under 45 seconds.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

// ── Helper: draw vertical multiplication working ─────────────────────────────

/**
 * Draw a vertical multiplication layout on a slide.
 * @param {object} slide - PptxGenJS slide
 * @param {number} x - left edge
 * @param {number} y - top edge
 * @param {object} opts - { topNum, bottomNum, partials[], answer, cellW, cellH, fontSize, showCarries[], highlightPlaceholder, onesColor, tensColor }
 */
function drawVerticalMultiplication(slide, x, y, opts) {
  const o = opts || {};
  const cellW = o.cellW || 0.42;
  const cellH = o.cellH || 0.46;
  const fontSize = o.fontSize || 18;
  const carryFontSize = o.carryFontSize || 9;

  const topStr = String(o.topNum);
  const botStr = String(o.bottomNum);

  // Determine the maximum number of digits we need columns for
  const maxDigits = Math.max(
    topStr.length,
    botStr.length,
    ...(o.partials || []).map(p => String(p).length),
    o.answer ? String(o.answer).length : 0
  ) + 1; // +1 for multiplication sign column or overflow

  const gridW = maxDigits * cellW;

  // Draw the top number (right-aligned)
  const topDigits = topStr.split("");
  topDigits.forEach((d, i) => {
    const cx = x + (maxDigits - topDigits.length + i) * cellW;
    slide.addText(d, {
      x: cx, y, w: cellW, h: cellH,
      fontSize, fontFace: FONT_H, color: C.CHARCOAL,
      align: "center", valign: "middle", margin: 0, bold: true,
    });
  });

  // Draw carries above the top number if provided
  if (o.showCarries && o.showCarries.length > 0) {
    o.showCarries.forEach((carry) => {
      if (carry.value) {
        const cx = x + (maxDigits - 1 - carry.col) * cellW;
        slide.addText(String(carry.value), {
          x: cx + cellW * 0.55, y: y - cellH * 0.35, w: cellW * 0.4, h: cellH * 0.35,
          fontSize: carryFontSize, fontFace: FONT_B, color: C.ALERT,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
      }
    });
  }

  // Draw the multiplication sign and bottom number
  const row2Y = y + cellH;
  // Multiplication sign
  slide.addText("x", {
    x: x, y: row2Y, w: cellW, h: cellH,
    fontSize: fontSize - 2, fontFace: FONT_B, color: C.MUTED,
    align: "center", valign: "middle", margin: 0,
  });

  // Bottom number (right-aligned)
  const botDigits = botStr.split("");
  botDigits.forEach((d, i) => {
    const cx = x + (maxDigits - botDigits.length + i) * cellW;
    slide.addText(d, {
      x: cx, y: row2Y, w: cellW, h: cellH,
      fontSize, fontFace: FONT_H, color: C.CHARCOAL,
      align: "center", valign: "middle", margin: 0, bold: true,
    });
  });

  // Line under the multiplication
  const lineY = row2Y + cellH;
  slide.addShape("line", {
    x, y: lineY, w: gridW, h: 0,
    line: { color: C.CHARCOAL, width: 2 },
  });

  // Partial products
  let partialY = lineY + 0.06;
  const partials = o.partials || [];
  partials.forEach((partial, pi) => {
    const pStr = String(partial);
    const pDigits = pStr.split("");
    const rowColor = pi === 0 ? (o.onesColor || C.PRIMARY) : (o.tensColor || C.SECONDARY);

    pDigits.forEach((d, i) => {
      const cx = x + (maxDigits - pDigits.length + i) * cellW;
      slide.addText(d, {
        x: cx, y: partialY, w: cellW, h: cellH,
        fontSize, fontFace: FONT_B, color: rowColor,
        align: "center", valign: "middle", margin: 0, bold: true,
      });
    });

    // Highlight placeholder zero
    if (pi > 0 && o.highlightPlaceholder) {
      const zeroX = x + (maxDigits - 1) * cellW;
      slide.addShape("roundRect", {
        x: zeroX - 0.02, y: partialY - 0.02, w: cellW + 0.04, h: cellH + 0.04, rectRadius: 0.06,
        line: { color: C.ALERT, width: 2.5 }, fill: { color: C.ALERT, transparency: 85 },
      });
    }

    partialY += cellH;
  });

  // If there are 2+ partial products, draw addition line and answer
  if (partials.length >= 2 && o.answer) {
    // Addition sign
    slide.addText("+", {
      x, y: partialY - cellH, w: cellW * 0.6, h: cellH,
      fontSize: fontSize - 4, fontFace: FONT_B, color: C.MUTED,
      align: "center", valign: "middle", margin: 0,
    });

    // Line above the answer
    slide.addShape("line", {
      x, y: partialY, w: gridW, h: 0,
      line: { color: C.CHARCOAL, width: 2 },
    });

    partialY += 0.06;

    // Answer
    const ansStr = String(o.answer);
    const ansDigits = ansStr.split("");
    ansDigits.forEach((d, i) => {
      const cx = x + (maxDigits - ansDigits.length + i) * cellW;
      slide.addText(d, {
        x: cx, y: partialY, w: cellW, h: cellH,
        fontSize, fontFace: FONT_H, color: C.SUCCESS,
        align: "center", valign: "middle", margin: 0, bold: true,
      });
    });
    partialY += cellH;
  } else if (partials.length === 1 && o.answer) {
    // Single partial product IS the answer — just colour it as success
    // Already drawn above
  }

  return { bottomY: partialY, gridW };
}

/**
 * Draw a step-by-step working display for multiplication.
 * @param {object} slide
 * @param {number} x
 * @param {number} y
 * @param {Array} steps - [{ text, color }]
 * @param {object} opts - { fontSize, lineH }
 */
function drawStepList(slide, x, y, steps, opts) {
  const o = opts || {};
  const fontSize = o.fontSize || 11;
  const lineH = o.lineH || 0.32;

  steps.forEach((step, i) => {
    slide.addText(step.text, {
      x, y: y + i * lineH, w: o.w || 4.0, h: lineH,
      fontSize, fontFace: FONT_B, color: step.color || C.CHARCOAL,
      margin: 0, valign: "middle", bold: step.bold || false,
    });
  });

  return y + steps.length * lineH;
}

// ── Helper: draw lattice multiplication grid ─────────────────────────────────

/**
 * Draw a lattice multiplication grid on a slide.
 * @param {object}   slide        PptxGenJS slide object
 * @param {number}   x            Left edge x (inches)
 * @param {number}   y            Top edge y (inches)
 * @param {number}   cellSize     Size of each cell (inches)
 * @param {number[]} topDigits    Multiplicand digits (left to right across top)
 * @param {number[]} sideDigits   Multiplier digits (top to bottom on right side)
 * @param {object}   opts         Options: showProducts, products, showAnswer, diagonalSums, highlightDiag
 */
function drawLatticeGrid(slide, x, y, cellSize, topDigits, sideDigits, opts) {
  const o = opts || {};
  const cols = topDigits.length;
  const rows = sideDigits.length;
  const gridW = cols * cellSize;
  const gridH = rows * cellSize;
  const labelOff = 0.3;

  // Draw cell borders and diagonals
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = x + c * cellSize;
      const cy = y + r * cellSize;
      slide.addShape("rect", {
        x: cx, y: cy, w: cellSize, h: cellSize,
        fill: { color: C.WHITE }, line: { color: C.PRIMARY, width: 1.5 },
      });
      slide.addShape("line", {
        x: cx + cellSize, y: cy, w: -cellSize, h: cellSize,
        line: { color: C.SECONDARY, width: 1 },
      });
      if (o.showProducts && o.products && o.products[r] && o.products[r][c]) {
        const prod = o.products[r][c];
        slide.addText(String(prod.tens), {
          x: cx + 0.02, y: cy + 0.02,
          w: cellSize * 0.5, h: cellSize * 0.5,
          fontSize: Math.max(8, Math.round(cellSize * 12)),
          fontFace: FONT_H, color: C.PRIMARY,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
        slide.addText(String(prod.ones), {
          x: cx + cellSize * 0.5 - 0.02, y: cy + cellSize * 0.5 - 0.02,
          w: cellSize * 0.5, h: cellSize * 0.5,
          fontSize: Math.max(8, Math.round(cellSize * 12)),
          fontFace: FONT_H, color: C.ACCENT,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
      }
    }
  }

  // Top digit labels
  topDigits.forEach((d, i) => {
    slide.addText(String(d), {
      x: x + i * cellSize, y: y - labelOff,
      w: cellSize, h: labelOff,
      fontSize: Math.max(10, Math.round(cellSize * 14)),
      fontFace: FONT_H, color: C.CHARCOAL,
      align: "center", valign: "middle", margin: 0, bold: true,
    });
  });

  // Side digit labels
  sideDigits.forEach((d, i) => {
    slide.addText(String(d), {
      x: x + gridW + 0.04, y: y + i * cellSize,
      w: labelOff, h: cellSize,
      fontSize: Math.max(10, Math.round(cellSize * 14)),
      fontFace: FONT_H, color: C.CHARCOAL,
      align: "center", valign: "middle", margin: 0, bold: true,
    });
  });

  // Diagonal answer digits along left and bottom edges
  if (o.showAnswer && o.diagonalSums) {
    const sums = o.diagonalSums;
    sums.forEach((d, i) => {
      if (i < rows) {
        slide.addText(String(d), {
          x: x - labelOff - 0.02, y: y + i * cellSize,
          w: labelOff, h: cellSize,
          fontSize: Math.max(10, Math.round(cellSize * 13)),
          fontFace: FONT_H, color: C.SUCCESS,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
      } else {
        const ci = i - rows;
        slide.addText(String(d), {
          x: x + ci * cellSize, y: y + gridH + 0.02,
          w: cellSize, h: labelOff,
          fontSize: Math.max(10, Math.round(cellSize * 13)),
          fontFace: FONT_H, color: C.SUCCESS,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
      }
    });
  }

  if (o.highlightDiag) {
    slide.addText("Add along diagonals", {
      x: x, y: y + gridH + labelOff + 0.05,
      w: gridW + labelOff, h: 0.22,
      fontSize: 8, fontFace: FONT_B, color: C.MUTED,
      align: "center", valign: "middle", margin: 0, italic: true,
    });
  }

  return { gridW, gridH, bottomY: y + gridH + labelOff + 0.3 };
}

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "Multiplication Methods — Session 2";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres, "Multiplication Methods\nVertical & Lattice", "Four Processes Review — Session 2",
    "Session 2 of 4 | Year 5/6 Maths", NOTES_TITLE);

  // ── SLIDE 2: Daily Review 1 — Prime Factorisation (Stage 1) ────────────
  contentSlide(pres, "Daily Review", C.ACCENT, "Composite Numbers as Products of Prime Factors", [
    "Q1: Express 36 as a product of its prime factors.",
    "Q2: Use your prime factorisation to simplify 36 x 25. (Hint: rearrange the factors!)",
  ], NOTES_DR1, FOOTER, (s) => {
    // I CAN statement
    addCard(s, 0.5, CONTENT_TOP + 1.2, 5.0, 0.55, { strip: C.ACCENT });
    s.addText("I can represent composite numbers as a product of their factors, including prime factors, and use this to simplify calculations", {
      x: 0.7, y: CONTENT_TOP + 1.25, w: 4.6, h: 0.45,
      fontSize: 8, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0, valign: "middle",
    });

    // Right side — Factor tree visual
    addCard(s, 5.8, CONTENT_TOP + 0.05, 3.8, 3.55, { strip: C.SECONDARY });
    s.addText("Factor Tree: 36", {
      x: 6.0, y: CONTENT_TOP + 0.12, w: 3.4, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });

    // Factor tree nodes
    const treeNodes = [
      { text: "36", x: 7.3, y: CONTENT_TOP + 0.48, color: C.PRIMARY },
      { text: "6", x: 6.5, y: CONTENT_TOP + 1.08, color: C.SECONDARY },
      { text: "6", x: 8.1, y: CONTENT_TOP + 1.08, color: C.SECONDARY },
      { text: "2", x: 6.15, y: CONTENT_TOP + 1.68, color: C.SUCCESS },
      { text: "3", x: 6.85, y: CONTENT_TOP + 1.68, color: C.SUCCESS },
      { text: "2", x: 7.75, y: CONTENT_TOP + 1.68, color: C.SUCCESS },
      { text: "3", x: 8.45, y: CONTENT_TOP + 1.68, color: C.SUCCESS },
    ];
    treeNodes.forEach((node) => {
      addTextOnShape(s, node.text, {
        x: node.x, y: node.y, w: 0.45, h: 0.45, rectRadius: 0.22,
        fill: { color: node.color },
      }, { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

    // Lines connecting tree nodes (simplified with thin rectangles)
    const lines = [
      { x1: 7.52, y1: CONTENT_TOP + 0.93, x2: 6.72, y2: CONTENT_TOP + 1.08 },
      { x1: 7.52, y1: CONTENT_TOP + 0.93, x2: 8.32, y2: CONTENT_TOP + 1.08 },
      { x1: 6.72, y1: CONTENT_TOP + 1.53, x2: 6.37, y2: CONTENT_TOP + 1.68 },
      { x1: 6.72, y1: CONTENT_TOP + 1.53, x2: 7.07, y2: CONTENT_TOP + 1.68 },
      { x1: 8.32, y1: CONTENT_TOP + 1.53, x2: 7.97, y2: CONTENT_TOP + 1.68 },
      { x1: 8.32, y1: CONTENT_TOP + 1.53, x2: 8.67, y2: CONTENT_TOP + 1.68 },
    ];
    lines.forEach((l) => {
      s.addShape("line", {
        x: l.x1, y: l.y1, w: l.x2 - l.x1, h: l.y2 - l.y1,
        line: { color: C.MUTED, width: 1.5 },
      });
    });

    // Result
    addTextOnShape(s, "36 = 2 x 2 x 3 x 3", {
      x: 6.1, y: CONTENT_TOP + 2.25, w: 3.3, h: 0.38, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });

    // Simplification
    s.addText([
      { text: "Simplify 36 x 25:", options: { bold: true, breakLine: true, fontSize: 11, color: C.SECONDARY } },
      { text: "= (4 x 9) x 25", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "= (4 x 25) x 9", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "= 100 x 9 = 900", options: { fontSize: 12, color: C.SUCCESS, bold: true } },
    ], {
      x: 6.1, y: CONTENT_TOP + 2.75, w: 3.3, h: 0.8,
      fontFace: FONT_B, margin: 0, valign: "top",
    });
  });

  // ── SLIDE 3: Daily Review 2 — Division with Remainders (Stage 1) ───────
  contentSlide(pres, "Daily Review", C.ACCENT, "Division with Remainders: Three Representations", [
    "Solve 47 divided by 5. Express your answer THREE ways:",
    "1.  As a whole number with remainder",
    "2.  As a mixed number (fraction)",
    "3.  As a decimal",
  ], NOTES_DR2, FOOTER, (s) => {
    // I CAN statement
    addCard(s, 0.5, CONTENT_TOP + 1.8, 5.0, 0.5, { strip: C.ACCENT });
    s.addText("I can solve division problems including remainders and express the result as a whole number, fraction or decimal", {
      x: 0.7, y: CONTENT_TOP + 1.85, w: 4.6, h: 0.4,
      fontSize: 8, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0, valign: "middle",
    });

    // Right side — Three representations
    addCard(s, 5.8, CONTENT_TOP + 0.05, 3.8, 3.55, { strip: C.SECONDARY });
    s.addText("47 / 5 = ?", {
      x: 6.0, y: CONTENT_TOP + 0.12, w: 3.4, h: 0.35,
      fontSize: 16, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });

    const reps = [
      { label: "Whole + remainder:", value: "9 r 2", color: C.PRIMARY },
      { label: "Mixed number:", value: "9  2/5", color: C.ACCENT },
      { label: "Decimal:", value: "9.4", color: C.SUCCESS },
    ];
    reps.forEach((rep, i) => {
      const ry = CONTENT_TOP + 0.6 + i * 0.85;
      addTextOnShape(s, rep.label, {
        x: 6.1, y: ry, w: 2.0, h: 0.35, rectRadius: 0.08,
        fill: { color: rep.color },
      }, { fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true });

      s.addText(rep.value, {
        x: 6.1, y: ry + 0.4, w: 3.3, h: 0.35,
        fontSize: 20, fontFace: FONT_H, color: rep.color,
        margin: 0, valign: "middle", bold: true,
      });
    });

    // Connection arrow
    s.addText("2/5 = 2 divided by 5 = 0.4", {
      x: 6.1, y: CONTENT_TOP + 3.15, w: 3.3, h: 0.3,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
  });

  // ── SLIDE 4: Fluency — Multiplication Tables Rapid Fire (Stage 1) ──────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Multiplication Sprint — 60 Seconds", { color: C.ACCENT });

    // Grid of multiplication problems (4 cols x 3 rows)
    const problems = [
      "7 x 6 =", "9 x 6 =", "8 x 9 =", "12 x 9 =",
      "7 x 8 =", "9 x 7 =", "12 x 8 =", "7 x 12 =",
      "6 x 8 =", "9 x 9 =", "8 x 8 =", "12 x 6 =",
    ];
    const gridCols = 4, gridRows = 3;
    const cellW = 2.0, cellH = 0.7;
    const gridX = 0.7, gridY = CONTENT_TOP + 0.1;

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const idx = r * gridCols + c;
        const px = gridX + c * (cellW + 0.2);
        const py = gridY + r * (cellH + 0.15);
        addCard(s, px, py, cellW, cellH, { strip: C.SECONDARY });
        s.addText((idx + 1) + ".  " + problems[idx], {
          x: px + 0.12, y: py, w: cellW - 0.2, h: cellH,
          fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL,
          valign: "middle", margin: 0, bold: true,
        });
      }
    }

    // Target tables badge
    addTextOnShape(s, "Targeting: x6, x7, x8, x9, x12", {
      x: 0.7, y: SAFE_BOTTOM - 0.95, w: 4.0, h: 0.35, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });

    // Timer instruction
    addTextOnShape(s, "60 seconds — GO!", {
      x: 3.5, y: SAFE_BOTTOM - 0.55, w: 3, h: 0.45, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, {
      fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_FLUENCY);
  })();

  // ── SLIDE 5: LI / SC ──────────────────────────────────────────────────
  liSlide(pres,
    ["We are learning to use the vertical multiplication algorithm and the lattice method to accurately multiply multi-digit numbers."],
    [
      "I can multiply multi-digit numbers using the vertical method, including regrouping and placeholder zeros.",
      "I can set up a lattice grid and fill in the single-digit products.",
      "I can add along the diagonals of a lattice grid to find the final answer.",
    ],
    NOTES_LISC, FOOTER);

  // ── SLIDE 6: I Do — Worked Example 1: 347 x 6 (Stage 2) ──────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example: 347 x 6", { fontSize: 22, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "347 x 6 = ?", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 3.5, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

    // Estimation badge
    addTextOnShape(s, "Estimate: 350 x 6 = 2,100", {
      x: 4.2, y: CONTENT_TOP - 0.05, w: 3.0, h: 0.42, rectRadius: 0.08,
      fill: { color: C.ACCENT },
    }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });

    // Step-by-step working on the left
    addCard(s, 0.5, CONTENT_TOP + 0.55, 4.8, 3.2, { strip: C.PRIMARY });
    s.addText("Step-by-Step Working", {
      x: 0.7, y: CONTENT_TOP + 0.62, w: 4.4, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });

    const steps = [
      { text: "1.  Set up: 347 on top, 6 below (ones aligned)", color: C.CHARCOAL },
      { text: "2.  Ones: 6 x 7 = 42 -> write 2, carry 4", color: C.PRIMARY },
      { text: "3.  Tens: 6 x 4 = 24 + 4 = 28 -> write 8, carry 2", color: C.PRIMARY },
      { text: "4.  Hundreds: 6 x 3 = 18 + 2 = 20 -> write 20", color: C.PRIMARY },
      { text: "Answer: 2,082", color: C.SUCCESS, bold: true },
      { text: "Check: Close to estimate of 2,100", color: C.ACCENT },
    ];
    drawStepList(s, 0.75, CONTENT_TOP + 0.98, steps, { w: 4.3, fontSize: 11, lineH: 0.38 });

    // Visual multiplication on the right
    addCard(s, 5.6, CONTENT_TOP + 0.55, 3.9, 3.2, { strip: C.SECONDARY });
    s.addText("Vertical Layout", {
      x: 5.8, y: CONTENT_TOP + 0.62, w: 3.5, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });

    drawVerticalMultiplication(s, 6.4, CONTENT_TOP + 1.0, {
      topNum: 347,
      bottomNum: 6,
      partials: [2082],
      answer: 2082,
      cellW: 0.46,
      cellH: 0.5,
      fontSize: 20,
      onesColor: C.SUCCESS,
      showCarries: [
        { col: 1, value: 4 },
        { col: 2, value: 2 },
      ],
    });

    // Answer summary
    addTextOnShape(s, "347 x 6 = 2,082", {
      x: 0.5, y: SAFE_BOTTOM - 0.55, w: 9, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, { fontSize: 15, fontFace: FONT_H, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_WE1);
  })();

  // ── SLIDE 7: I Do — Worked Example 2: 258 x 34 (Stage 2) ─────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example: 258 x 34", { fontSize: 22, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "258 x 34 = ?", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 3.5, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

    // Estimation badge
    addTextOnShape(s, "Estimate: 260 x 34 ~ 8,840", {
      x: 4.2, y: CONTENT_TOP - 0.05, w: 3.2, h: 0.42, rectRadius: 0.08,
      fill: { color: C.ACCENT },
    }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });

    // Three-step process on the left
    addCard(s, 0.5, CONTENT_TOP + 0.55, 5.0, 3.2, { strip: C.PRIMARY });

    // Step 1 — Multiply by ones (4)
    addTextOnShape(s, "Step 1: Multiply by 4 (ones)", {
      x: 0.65, y: CONTENT_TOP + 0.62, w: 3.2, h: 0.28, rectRadius: 0.06,
      fill: { color: C.PRIMARY },
    }, { fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true });

    const step1Lines = [
      { text: "4 x 8 = 32 -> write 2, carry 3", color: C.PRIMARY },
      { text: "4 x 5 = 20 + 3 = 23 -> write 3, carry 2", color: C.PRIMARY },
      { text: "4 x 2 = 8 + 2 = 10 -> write 10", color: C.PRIMARY },
      { text: "Partial product 1: 1,032", color: C.PRIMARY, bold: true },
    ];
    drawStepList(s, 0.75, CONTENT_TOP + 0.96, step1Lines, { w: 4.5, fontSize: 10, lineH: 0.25 });

    // Step 2 — Multiply by tens (3 = 30)
    addTextOnShape(s, "Step 2: Multiply by 30 (tens)", {
      x: 0.65, y: CONTENT_TOP + 2.0, w: 3.2, h: 0.28, rectRadius: 0.06,
      fill: { color: C.SECONDARY },
    }, { fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true });

    const step2Lines = [
      { text: "PLACEHOLDER ZERO first!", color: C.ALERT, bold: true },
      { text: "3 x 8 = 24 -> write 4, carry 2", color: C.SECONDARY },
      { text: "3 x 5 = 15 + 2 = 17 -> write 7, carry 1", color: C.SECONDARY },
      { text: "3 x 2 = 6 + 1 = 7 -> write 7", color: C.SECONDARY },
      { text: "Partial product 2: 7,740", color: C.SECONDARY, bold: true },
    ];
    drawStepList(s, 0.75, CONTENT_TOP + 2.34, step2Lines, { w: 4.5, fontSize: 10, lineH: 0.22 });

    // Visual multiplication on the right
    addCard(s, 5.7, CONTENT_TOP + 0.55, 3.8, 3.2, { strip: C.ALERT });
    s.addText("Vertical Layout", {
      x: 5.9, y: CONTENT_TOP + 0.62, w: 3.4, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.ALERT, bold: true, margin: 0,
    });

    drawVerticalMultiplication(s, 6.4, CONTENT_TOP + 0.96, {
      topNum: 258,
      bottomNum: 34,
      partials: [1032, 7740],
      answer: 8772,
      cellW: 0.38,
      cellH: 0.38,
      fontSize: 16,
      onesColor: C.PRIMARY,
      tensColor: C.SECONDARY,
      highlightPlaceholder: true,
    });

    // Answer summary
    addTextOnShape(s, "258 x 34 = 8,772  |  Estimate was ~8,840", {
      x: 0.5, y: SAFE_BOTTOM - 0.55, w: 9, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, { fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_WE2);
  })();

  // ── SLIDES 8–9: CFU — Show Me Boards: 429 x 7 (withReveal) ───────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "CFU", { color: C.ALERT, w: 1.5 });
      addTitle(s, "Show Me Boards: 429 x 7", { color: C.ALERT });

      // Problem display
      addTextOnShape(s, "429 x 7 = ?", {
        x: 1.5, y: CONTENT_TOP + 0.2, w: 7, h: 1.2, rectRadius: 0.15,
        fill: { color: C.PRIMARY },
      }, { fontSize: 48, fontFace: FONT_H, color: C.WHITE, bold: true });

      addInstructionCard(s, [
        { text: "On your whiteboards:", role: "header" },
        { text: "Set it up vertically. Start from the ones." },
        { text: "Show ALL your carries." },
        { text: "45 seconds — then boards up!", role: "emphasis" },
      ], {
        x: 0.5, y: CONTENT_TOP + 1.7, w: 9, h: 1.5,
        strip: C.ALERT,
        headerColor: C.ALERT,
      });

      // Reminder
      addTextOnShape(s, "Multiply FIRST, then add the carry", {
        x: 2.5, y: SAFE_BOTTOM - 0.6, w: 5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_CFU_SHOWME);
      return s;
    },
    (slide) => {
      // Reveal: worked solution
      addCard(slide, 1.0, CONTENT_TOP + 1.6, 8, 2.1, { strip: C.SUCCESS });
      slide.addText("Solution", {
        x: 1.2, y: CONTENT_TOP + 1.68, w: 2, h: 0.28,
        fontSize: 13, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      // Step working
      const solSteps = [
        { text: "7 x 9 = 63 -> write 3, carry 6", color: C.PRIMARY },
        { text: "7 x 2 = 14 + 6 = 20 -> write 0, carry 2", color: C.PRIMARY },
        { text: "7 x 4 = 28 + 2 = 30 -> write 30", color: C.PRIMARY },
      ];
      solSteps.forEach((step, i) => {
        slide.addText(step.text, {
          x: 1.3, y: CONTENT_TOP + 2.05 + i * 0.3, w: 4.5, h: 0.28,
          fontSize: 11, fontFace: FONT_B, color: step.color, margin: 0, valign: "middle",
        });
      });

      // Visual answer on right
      drawVerticalMultiplication(slide, 6.5, CONTENT_TOP + 1.95, {
        topNum: 429,
        bottomNum: 7,
        partials: [3003],
        answer: 3003,
        cellW: 0.42,
        cellH: 0.42,
        fontSize: 17,
        onesColor: C.SUCCESS,
        showCarries: [
          { col: 1, value: 6 },
          { col: 2, value: 2 },
        ],
      });

      addTextOnShape(slide, "429 x 7 = 3,003", {
        x: 2.5, y: SAFE_BOTTOM - 0.6, w: 5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDES 10–11: We Do — Problem Pair 1: 568 x 8 (withReveal) ────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Problem Pair: 568 x 8", { fontSize: 22, color: C.SECONDARY });

      // Problem display
      addTextOnShape(s, "568 x 8 = ?", {
        x: 1.5, y: CONTENT_TOP + 0.2, w: 7, h: 1.0, rectRadius: 0.12,
        fill: { color: C.PRIMARY },
      }, { fontSize: 44, fontFace: FONT_H, color: C.WHITE, bold: true });

      addInstructionCard(s, [
        { text: "With your partner:", role: "header" },
        { text: "One writes, one checks carries." },
        { text: "Talk through each step aloud." },
        { text: "60 seconds — then boards up!", role: "emphasis" },
      ], {
        x: 0.5, y: CONTENT_TOP + 1.5, w: 4.5, h: 2.0,
        strip: C.SECONDARY,
      });

      // Reminder card
      addCard(s, 5.5, CONTENT_TOP + 1.5, 4.0, 2.0, { strip: C.ACCENT });
      s.addText("Remember:", {
        x: 5.7, y: CONTENT_TOP + 1.58, w: 3.6, h: 0.25,
        fontSize: 11, fontFace: FONT_B, color: C.ACCENT, bold: true, margin: 0,
      });
      s.addText([
        { text: "Start from the ones column", options: { bullet: true, breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Multiply FIRST, then add carry", options: { bullet: true, breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Write the ones digit, carry the tens", options: { bullet: true, breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Estimate to check: 570 x 8 = 4,560", options: { bullet: true, fontSize: 11, color: C.ACCENT, bold: true } },
      ], {
        x: 5.7, y: CONTENT_TOP + 1.9, w: 3.6, h: 1.4,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (slide) => {
      // Reveal: cover right card with solution card
      addCard(slide, 5.5, CONTENT_TOP + 1.5, 4.0, 2.0, { fill: C.WHITE, strip: C.SUCCESS });
      slide.addText("Solution", {
        x: 5.7, y: CONTENT_TOP + 1.58, w: 3.6, h: 0.25,
        fontSize: 11, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      drawVerticalMultiplication(slide, 6.3, CONTENT_TOP + 1.85, {
        topNum: 568,
        bottomNum: 8,
        partials: [4544],
        answer: 4544,
        cellW: 0.38,
        cellH: 0.38,
        fontSize: 16,
        onesColor: C.SUCCESS,
        showCarries: [
          { col: 1, value: 6 },
          { col: 2, value: 5 },
        ],
      });

      // Worked steps on left (cover the instruction card)
      addCard(slide, 0.5, CONTENT_TOP + 1.5, 4.5, 2.0, { fill: C.WHITE, strip: C.SUCCESS });
      slide.addText("Solution: 568 x 8", {
        x: 0.7, y: CONTENT_TOP + 1.58, w: 4.0, h: 0.25,
        fontSize: 13, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      const solSteps = [
        { text: "8 x 8 = 64 -> write 4, carry 6", color: C.PRIMARY },
        { text: "8 x 6 = 48 + 6 = 54 -> write 4, carry 5", color: C.PRIMARY },
        { text: "8 x 5 = 40 + 5 = 45 -> write 45", color: C.PRIMARY },
      ];
      solSteps.forEach((step, i) => {
        slide.addText(step.text, {
          x: 0.8, y: CONTENT_TOP + 1.95 + i * 0.32, w: 4.0, h: 0.28,
          fontSize: 11, fontFace: FONT_B, color: step.color, margin: 0, valign: "middle",
        });
      });

      addTextOnShape(slide, "568 x 8 = 4,544  |  Estimate was 4,560", {
        x: 0.5, y: SAFE_BOTTOM - 0.6, w: 9, h: 0.42, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDE 12: I Do — Lattice Method: 47 x 63 (Stage 2) ────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Lattice Method: 47 x 63", { fontSize: 22, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "47 x 63 = ?", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 3.0, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

    // Steps on the left
    addCard(s, 0.5, CONTENT_TOP + 0.55, 4.5, 3.2, { strip: C.PRIMARY });
    const latticeSteps = [
      { label: "Step 1:", text: "Draw a 2x2 grid (2 digits x 2 digits)" },
      { label: "Step 2:", text: "Diagonals in every cell (top-right to bottom-left)" },
      { label: "Step 3:", text: "Write 4, 7 across top; 6, 3 down the right" },
      { label: "Step 4:", text: "Multiply into cells. Split tens/ones at diagonal." },
      { label: "Step 5:", text: "Add along each diagonal from bottom-right" },
      { label: "Step 6:", text: "Read answer: top-left down, then across bottom" },
    ];
    latticeSteps.forEach((st, i) => {
      s.addText([
        { text: st.label + " ", options: { bold: true, fontSize: 11, color: C.PRIMARY } },
        { text: st.text, options: { fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 0.7, y: CONTENT_TOP + 0.65 + i * 0.48, w: 4.1, h: 0.42,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Lattice grid on the right
    drawLatticeGrid(s, 5.8, CONTENT_TOP + 0.3, 0.9, [4, 7], [6, 3], {
      showProducts: true,
      products: [
        [{ tens: 2, ones: 4 }, { tens: 4, ones: 2 }],
        [{ tens: 1, ones: 2 }, { tens: 2, ones: 1 }],
      ],
      showAnswer: true,
      diagonalSums: [2, 9, 6, 1],
      highlightDiag: true,
    });

    // Key rule callout
    addCard(s, 5.5, CONTENT_TOP + 2.4, 4.0, 0.9, { strip: C.ALERT });
    s.addText([
      { text: "Key Rule:", options: { bold: true, breakLine: true, fontSize: 10, color: C.ALERT } },
      { text: "The diagonal separates tens from ones.", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "7 x 6 = 42 means 4 above the line, 2 below.", options: { fontSize: 10, color: C.CHARCOAL } },
    ], {
      x: 5.65, y: CONTENT_TOP + 2.48, w: 3.7, h: 0.78,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Estimation check
    addTextOnShape(s, "Check: 50 x 60 = 3,000. Answer: 2,961. Confirmed!", {
      x: 0.5, y: 4.65, w: 9, h: 0.35, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_LATTICE_IDO);
  })();

  // ── SLIDES 13-14: CFU — Lattice: 56 x 38 (withReveal) ────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "CFU | Show Me Boards", { color: C.ALERT, w: 2.8 });
      addTitle(s, "Complete the Lattice: 56 x 38", { color: C.ALERT });

      // Instructions on left
      addInstructionCard(s, [
        { text: "On your whiteboards:", role: "header" },
        { text: "1. Draw a 2x2 lattice grid" },
        { text: "2. Write 5, 6 across top; 3, 8 down right" },
        { text: "3. Multiply into each cell (split tens/ones)" },
        { text: "4. Add along diagonals" },
        { text: "", role: "spacer" },
        { text: "60 seconds — then boards up!", role: "emphasis" },
      ], {
        x: 0.5, y: CONTENT_TOP + 0.05, w: 4.5, h: 2.8,
        strip: C.ALERT,
        headerColor: C.ALERT,
      });

      // Empty lattice grid on right
      drawLatticeGrid(s, 6.0, CONTENT_TOP + 0.3, 1.0, [5, 6], [3, 8], {
        showProducts: false,
      });

      addTextOnShape(s, "Fill in the products!", {
        x: 6.0, y: CONTENT_TOP + 2.45, w: 2.0, h: 0.35, rectRadius: 0.08,
        fill: { color: C.ACCENT },
      }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_LATTICE_CFU);
      return s;
    },
    (slide) => {
      // Reveal: completed lattice grid
      addCard(slide, 5.2, CONTENT_TOP + 0.05, 4.3, 3.65, { strip: C.SUCCESS });
      slide.addText("Solution: 56 x 38 = 2,128", {
        x: 5.4, y: CONTENT_TOP + 0.12, w: 3.9, h: 0.3,
        fontSize: 14, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      drawLatticeGrid(slide, 5.8, CONTENT_TOP + 0.55, 0.85, [5, 6], [3, 8], {
        showProducts: true,
        products: [
          [{ tens: 1, ones: 5 }, { tens: 1, ones: 8 }],
          [{ tens: 4, ones: 0 }, { tens: 4, ones: 8 }],
        ],
        showAnswer: true,
        diagonalSums: [2, 1, 2, 8],
      });

      slide.addText([
        { text: "Diagonal addition:", options: { bold: true, breakLine: true, fontSize: 10, color: C.SECONDARY } },
        { text: "D1: 8", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
        { text: "D2: 4+0+8 = 12 (write 2, carry 1)", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
        { text: "D3: 4+5+1 = 10 +1 = 11 (write 1, carry 1)", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
        { text: "D4: 1 +1 = 2", options: { fontSize: 9, color: C.CHARCOAL } },
      ], {
        x: 5.4, y: CONTENT_TOP + 2.6, w: 3.9, h: 1.1,
        fontFace: FONT_B, margin: 0, valign: "top",
      });
    }
  );

  // ── SLIDES 15-16: We Do — Lattice: 84 x 57 (withReveal) ──────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Lattice Method: 84 x 57", { fontSize: 22, color: C.SECONDARY });

      addTextOnShape(s, "Lattice method on your whiteboard", {
        x: 0.5, y: CONTENT_TOP - 0.05, w: 4.5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_DARK },
      }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

      addInstructionCard(s, [
        { text: "With your partner:", role: "header" },
        { text: "1. Draw a 2x2 lattice grid" },
        { text: "2. Write 8, 4 across top; 5, 7 down right" },
        { text: "3. Multiply into each cell" },
        { text: "4. Add along diagonals" },
        { text: "", role: "spacer" },
        { text: "60 seconds — boards up!", role: "emphasis" },
      ], {
        x: 0.5, y: CONTENT_TOP + 0.55, w: 4.5, h: 2.8,
        strip: C.SECONDARY,
      });

      // Large number display
      addTextOnShape(s, "84 x 57", {
        x: 5.8, y: CONTENT_TOP + 0.8, w: 3.5, h: 2.2, rectRadius: 0.15,
        fill: { color: C.PRIMARY },
      }, { fontSize: 48, fontFace: FONT_H, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_LATTICE_WEDO);
      return s;
    },
    (slide) => {
      // Reveal: completed grid
      addCard(slide, 5.2, CONTENT_TOP + 0.05, 4.3, 3.65, { strip: C.SUCCESS });
      slide.addText("Solution: 84 x 57 = 4,788", {
        x: 5.4, y: CONTENT_TOP + 0.12, w: 3.9, h: 0.3,
        fontSize: 14, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      drawLatticeGrid(slide, 5.8, CONTENT_TOP + 0.55, 0.85, [8, 4], [5, 7], {
        showProducts: true,
        products: [
          [{ tens: 4, ones: 0 }, { tens: 2, ones: 0 }],
          [{ tens: 5, ones: 6 }, { tens: 2, ones: 8 }],
        ],
        showAnswer: true,
        diagonalSums: [4, 7, 8, 8],
      });

      slide.addText([
        { text: "Diagonal addition:", options: { bold: true, breakLine: true, fontSize: 10, color: C.SECONDARY } },
        { text: "D1: 8  |  D2: 2+6+0 = 8  |  D3: 5+0+2 = 7  |  D4: 4", options: { fontSize: 9, color: C.CHARCOAL } },
      ], {
        x: 5.4, y: CONTENT_TOP + 2.55, w: 3.9, h: 0.5,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addTextOnShape(slide, "Check: 80 x 60 = 4,800. Close!", {
        x: 5.4, y: 4.45, w: 3.8, h: 0.35, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDE 17: You Do — Independent Practice (Stage 4) ─────────────────
  contentSlide(pres, "Stage 4 | You Do", C.ALERT, "Independent Practice: Both Methods", [], NOTES_YOUDO, FOOTER, (s) => {
    // Two-column layout: Vertical on left, Lattice on right
    // Section A: Vertical
    addCard(s, 0.5, CONTENT_TOP, 4.5, 2.5, { strip: C.PRIMARY });
    s.addText("Section A: Vertical Method", {
      x: 0.7, y: CONTENT_TOP + 0.06, w: 4.1, h: 0.25,
      fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });
    const vertProbs = [
      "1.  253 x 7", "2.  486 x 9",
      "3.  324 x 15", "4.  478 x 32",
    ];
    vertProbs.forEach((p, i) => {
      s.addText(p, {
        x: 0.75, y: CONTENT_TOP + 0.4 + i * 0.38, w: 4.0, h: 0.32,
        fontSize: 12, fontFace: FONT_B, color: i < 2 ? C.PRIMARY : C.SECONDARY,
        margin: 0, valign: "middle", bold: true,
      });
    });
    s.addText("Show all carries. Placeholder zero for two-digit multipliers.", {
      x: 0.75, y: CONTENT_TOP + 2.0, w: 4.0, h: 0.3,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    // Section B: Lattice
    addCard(s, 5.3, CONTENT_TOP, 4.2, 2.5, { strip: C.ACCENT });
    s.addText("Section B: Lattice Method", {
      x: 5.5, y: CONTENT_TOP + 0.06, w: 3.8, h: 0.25,
      fontSize: 12, fontFace: FONT_H, color: C.ACCENT, bold: true, margin: 0,
    });
    const latticeProbs = [
      "5.  53 x 47", "6.  86 x 35",
      "7.  245 x 36",
    ];
    latticeProbs.forEach((p, i) => {
      s.addText(p, {
        x: 5.55, y: CONTENT_TOP + 0.4 + i * 0.38, w: 3.7, h: 0.32,
        fontSize: 12, fontFace: FONT_B, color: i < 2 ? C.ACCENT : C.SECONDARY,
        margin: 0, valign: "middle", bold: true,
      });
    });
    s.addText("Draw grid. Diagonals in every cell. Add along diagonals.", {
      x: 5.55, y: CONTENT_TOP + 1.6, w: 3.7, h: 0.3,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    // Instructions bar
    addCard(s, 0.5, CONTENT_TOP + 2.7, 9, 1.0, { strip: C.ALERT });
    s.addText([
      { text: "10 minutes  |  ", options: { bold: true, fontSize: 12, color: C.ALERT } },
      { text: "Use your Session 2 Worksheet. Estimate to check each answer.", options: { fontSize: 11, color: C.CHARCOAL } },
      { text: "  Finished early? Collect the Session 2 Extension.", options: { fontSize: 11, color: C.ACCENT, bold: true } },
    ], {
      x: 0.75, y: CONTENT_TOP + 2.85, w: 8.5, h: 0.6,
      fontFace: FONT_B, margin: 0, valign: "middle",
    });
  });

  // ── SLIDE 17: Exit Ticket (Stage 5) ───────────────────────────────────
  exitTicketSlide(pres, [
    "Q1: 362 x 9 = ?  (Vertical method. Show all working.)",
    "Q2: Use the lattice method to solve 67 x 43.  (Draw the grid. Show products and diagonals.)",
    "Q3: Which method did you find easier today — vertical or lattice? Give one reason why.",
  ], NOTES_EXIT, FOOTER);

  // ── SLIDE 18: Resources ───────────────────────────────────────────────
  addResourceSlide(pres, Object.values(RESOURCES), { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // ── SLIDE 19: Closing ─────────────────────────────────────────────────
  closingSlide(pres,
    "Which multiplication method do you prefer — vertical or lattice? Turn to your partner — 30 seconds.",
    [
      "SC1: I can multiply multi-digit numbers using the vertical method, including regrouping and placeholder zeros.",
      "SC2: I can set up a lattice grid and fill in the single-digit products.",
      "SC3: I can add along the diagonals of a lattice grid to find the final answer.",
      "Tomorrow: Session 3 — Short division review.",
    ],
    NOTES_CLOSING);

  // ── Write PPTX ──────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: `${OUT_DIR}/${LESSON.pptxFileName}` });
  console.log("PPTX written to " + OUT_DIR);

  // ── Generate companion PDFs ────────────────────────────────────────────
  await generateWorksheet();
  await generateAnswerKey();
  await generateEnablingPdf();
  await generateExtendingPdf();
  console.log("All PDFs generated.");
}

// ── PDF: Session 2 Worksheet ────────────────────────────────────────────────

async function generateWorksheet() {
  const doc = createPdf({ title: RESOURCES.worksheet.name });

  let y = addPdfHeader(doc, RESOURCES.worksheet.name, {
    subtitle: "Multiplication Methods",
    color: C.PRIMARY,
    lessonInfo: FOOTER,
  });

  y = addTipBox(doc, "Show all working. Estimate each answer to check it makes sense.", y, { color: C.SECONDARY });

  // ── Section A: Vertical Method ──

  y = addSectionHeading(doc, "Section A: Vertical Method", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Set out each problem vertically. Show all carries. Use placeholder zeros for two-digit multipliers.", y);

  y = addProblem(doc, 1, "253 x 7", y, {
    writeLines: [{ label: "Estimate:" }, { label: "Working:" }, { label: "" }, { label: "Answer:" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "486 x 9", y, {
    writeLines: [{ label: "Estimate:" }, { label: "Working:" }, { label: "" }, { label: "Answer:" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "324 x 15", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Partial product 1:" },
      { label: "Partial product 2:" },
      { label: "Sum:" },
    ],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 4, "478 x 32", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Partial product 1:" },
      { label: "Partial product 2:" },
      { label: "Sum:" },
    ],
    color: C.SECONDARY,
  });

  // ── Section B: Lattice Method ──

  y = addSectionHeading(doc, "Section B: Lattice Method", y, { color: C.ACCENT });
  y = addBodyText(doc, "Draw the lattice grid. Fill in each cell (tens above the diagonal, ones below). Add along the diagonals from bottom-right.", y);

  y = addProblem(doc, 5, "53 x 47  (2x2 grid)", y, {
    writeLines: [{ label: "Answer:" }, { label: "Estimate check:" }],
    color: C.ACCENT,
  });

  y = addProblem(doc, 6, "86 x 35  (2x2 grid)", y, {
    writeLines: [{ label: "Answer:" }, { label: "Estimate check:" }],
    color: C.ACCENT,
  });

  y = addProblem(doc, 7, "245 x 36  (3x2 grid)", y, {
    writeLines: [{ label: "Answer:" }, { label: "Estimate check:" }],
    color: C.ACCENT,
  });

  addPdfFooter(doc, FOOTER);
  await writePdf(doc, `${OUT_DIR}/${RESOURCES.worksheet.fileName}`);
  console.log(`  ${RESOURCES.worksheet.name} written.`);
}

// ── PDF: Session 2 Answer Key ────────────────────────────────────────────────

async function generateAnswerKey() {
  const doc = createPdf({ title: RESOURCES.answerKey.name });

  let y = addPdfHeader(doc, RESOURCES.answerKey.name, {
    subtitle: "Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: FOOTER,
    showNameDate: false,
  });

  y = addSectionHeading(doc, "Section A: Vertical Method", y, { color: C.PRIMARY });

  y = addProblem(doc, 1, "253 x 7", y, {
    writeLines: [
      { label: "Working:", answer: "7x3=21 (1,c2), 7x5=35+2=37 (7,c3), 7x2=14+3=17" },
      { label: "Answer:", answer: "1,771" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "486 x 9", y, {
    writeLines: [
      { label: "Working:", answer: "9x6=54 (4,c5), 9x8=72+5=77 (7,c7), 9x4=36+7=43" },
      { label: "Answer:", answer: "4,374" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "324 x 15", y, {
    writeLines: [
      { label: "PP1 (x5):", answer: "324 x 5 = 1,620" },
      { label: "PP2 (x10):", answer: "324 x 10 = 3,240" },
      { label: "Answer:", answer: "1,620 + 3,240 = 4,860" },
    ],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 4, "478 x 32", y, {
    writeLines: [
      { label: "PP1 (x2):", answer: "478 x 2 = 956" },
      { label: "PP2 (x30):", answer: "478 x 30 = 14,340" },
      { label: "Answer:", answer: "956 + 14,340 = 15,296" },
    ],
    color: C.SECONDARY,
  });

  y = addSectionHeading(doc, "Section B: Lattice Method", y, { color: C.ACCENT });

  y = addProblem(doc, 5, "53 x 47", y, {
    writeLines: [
      { label: "Products:", answer: "5x4=20, 3x4=12, 5x7=35, 3x7=21" },
      { label: "Diagonals:", answer: "D1:1, D2:2+5+2=9, D3:3+0+1=4, D4:2 -> 2,491" },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 6, "86 x 35", y, {
    writeLines: [
      { label: "Products:", answer: "8x3=24, 6x3=18, 8x5=40, 6x5=30" },
      { label: "Diagonals:", answer: "D1:0, D2:3+0+8=11 (1,c1), D3:4+1+4+1=10 (0,c1), D4:2+1=3 -> 3,010" },
      { label: "Answer:", answer: "3,010" },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 7, "245 x 36", y, {
    writeLines: [
      { label: "Grid:", answer: "3x2 lattice. Products: 2x3=06, 4x3=12, 5x3=15, 2x6=12, 4x6=24, 5x6=30" },
      { label: "Answer:", answer: "8,820" },
    ],
    color: C.ACCENT,
  });

  y = addSectionHeading(doc, "Exit Ticket Answers", y, { color: C.ALERT });

  y = addProblem(doc, "Q1", "362 x 9 (vertical)", y, {
    writeLines: [
      { label: "Working:", answer: "9x2=18 (8,c1), 9x6=54+1=55 (5,c5), 9x3=27+5=32" },
      { label: "Answer:", answer: "3,258" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, "Q2", "67 x 43 (lattice)", y, {
    writeLines: [
      { label: "Products:", answer: "6x4=24, 7x4=28, 6x3=18, 7x3=21" },
      { label: "Diagonals:", answer: "D1:1, D2:2+8+8=18 (8,c1), D3:4+2+1+1=8, D4:2 -> 2,881" },
      { label: "Answer:", answer: "2,881" },
    ],
    color: C.ALERT,
  });

  addPdfFooter(doc, "Teacher Reference - Do Not Distribute to Students");
  await writePdf(doc, `${OUT_DIR}/${RESOURCES.answerKey.fileName}`);
  console.log(`  ${RESOURCES.answerKey.name} written.`);
}

// ── PDF: Session 2 Extension ────────────────────────────────────────────────

function drawPdfLatticeGrid(doc, x, y, cellSize, topDigits, sideDigits, opts) {
  const o = opts || {};
  const rows = sideDigits.length;
  const cols = topDigits.length;
  const gridW = cols * cellSize;
  const gridH = rows * cellSize;

  doc.save();
  doc.lineWidth(1.5).strokeColor("#1B3A6B");

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const cx = x + c * cellSize;
      const cy = y + r * cellSize;
      doc.rect(cx, cy, cellSize, cellSize).stroke();
      doc.moveTo(cx, cy + cellSize).lineTo(cx + cellSize, cy).stroke();

      const product = o.products && o.products[r] && o.products[r][c];
      if (product) {
        doc.font("Sans-Bold").fontSize(16).fillColor("#1B3A6B");
        doc.text(String(product.tens), cx + 6, cy + 6, { width: 18, align: "center" });
        doc.fillColor("#0F7F8C");
        doc.text(String(product.ones), cx + cellSize - 24, cy + cellSize - 22, { width: 18, align: "center" });
      }
    }
  }

  doc.font("Sans-Bold").fontSize(14).fillColor("#2D3142");
  topDigits.forEach((digit, index) => {
    doc.text(String(digit), x + index * cellSize, y - 18, { width: cellSize, align: "center" });
  });
  sideDigits.forEach((digit, index) => {
    doc.text(String(digit), x + gridW + 6, y + index * cellSize + 16, { width: 16, align: "center" });
  });
  doc.restore();

  return y + gridH;
}

async function generateEnablingPdf() {
  const doc = createPdf({ title: RESOURCES.enabling.name });

  let y = addPdfHeader(doc, RESOURCES.enabling.name, {
    subtitle: "Supported Practice",
    color: C.SECONDARY,
    lessonInfo: FOOTER,
  });

  y = addTipBox(doc, "Use this page for students who need the multiplication structure drawn for them. The vertical section pre-labels the partial products. The lattice section already has the grid and diagonals in place.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "1. Vertical Multiplication Frames", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Students complete only these supported problems first. The second partial-product line already reminds them to start with a placeholder zero.", y);

  y = addProblem(doc, 1, "324 x 15", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Partial product 1 (x5):" },
      { label: "Partial product 2 (x10 - start with 0): 0" },
      { label: "Final sum:" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "478 x 32", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Partial product 1 (x2):" },
      { label: "Partial product 2 (x30 - start with 0): 0" },
      { label: "Final sum:" },
    ],
    color: C.SECONDARY,
  });

  y = addSectionHeading(doc, "2. Lattice Starter Grids", y, { color: C.ACCENT });
  y = addBodyText(doc, "These grids already show the frame, diagonals, and outside digits. Problem 3 models the first cell so students can see where the tens and ones go.", y);

  doc.fontSize(11).font("Sans-Bold").fillColor("#0F7F8C");
  doc.text("Problem 3: 56 x 38", 50, y + 2);
  let bottomY = drawPdfLatticeGrid(doc, 70, y + 26, 46, [5, 6], [3, 8], {
    products: [
      [{ tens: 1, ones: 5 }, null],
      [null, null],
    ],
  });
  doc.fontSize(10).font("Sans").fillColor("#2D3142");
  doc.text("Add along diagonals: ________________________________", 50, bottomY + 10);

  doc.fontSize(11).font("Sans-Bold").fillColor("#0F7F8C");
  doc.text("Problem 4: 84 x 57", 300, y + 2);
  bottomY = drawPdfLatticeGrid(doc, 320, y + 26, 46, [8, 4], [5, 7]);
  doc.fontSize(10).font("Sans").fillColor("#2D3142");
  doc.text("Add along diagonals: ______________________", 300, bottomY + 10);

  addPdfFooter(doc, FOOTER);
  await writePdf(doc, `${OUT_DIR}/${RESOURCES.enabling.fileName}`);
  console.log(`  ${RESOURCES.enabling.name} written.`);
}

async function generateExtendingPdf() {
  const doc = createPdf({ title: RESOURCES.extension.name });

  let y = addPdfHeader(doc, RESOURCES.extension.name, {
    subtitle: "Extending Challenge",
    color: C.ACCENT,
    lessonInfo: FOOTER,
  });

  y = addSectionHeading(doc, "The Discovery Task", y, { color: C.ACCENT });
  y = addBodyText(doc, "When you multiply a two-digit number by 11, something interesting happens. Complete the table below and look for the pattern.", y);

  // Problem table
  y = addProblem(doc, 1, "Use the vertical method to calculate each multiplication. Write the answer in the table.", y, {
    color: C.ACCENT,
  });

  // We'll use addTwoColumnOrganiser for a neat layout
  y = addTwoColumnOrganiser(doc, "Calculation", "Answer", y, {
    color: C.ACCENT,
    rows: 8,
    rowH: 30,
    leftContent: [
      "11 x 23 =",
      "11 x 34 =",
      "11 x 45 =",
      "11 x 52 =",
      "11 x 61 =",
      "11 x 72 =",
      "11 x 81 =",
      "11 x 36 =",
    ],
  });

  y = addSectionHeading(doc, "Spot the Pattern", y, { color: C.ACCENT });
  y = addProblem(doc, 2, "Look at your answers. For each one, look at the first digit, the last digit, and the middle digit(s). What do you notice?", y, {
    writeLines: [
      { label: "I notice:" },
      { label: "" },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 3, "Complete this rule: \"To multiply a two-digit number by 11, you...\"", y, {
    writeLines: [
      { label: "My rule:" },
      { label: "" },
    ],
    color: C.ACCENT,
  });

  y = addTipBox(doc, "Hint: For 11 x 23, the answer is 253. The first digit is 2. The last digit is 3. The middle digit is 2 + 3 = 5. Does this work for all your answers?", y, { color: C.ACCENT });

  y = addSectionHeading(doc, "Testing Your Rule", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Use your rule (without the vertical method) to predict the answers. Then check with the vertical method.", y);

  y = addProblem(doc, 4, "11 x 54 — Prediction: _____ Check: _____", y, {
    writeLines: [{ label: "Does your rule work?" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 5, "11 x 77 — Prediction: _____ Check: _____", y, {
    writeLines: [{ label: "Does your rule work?" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 6, "11 x 85 — Prediction: _____ Check: _____", y, {
    writeLines: [{ label: "Does your rule work?" }],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "The Tricky Ones", y, { color: C.ALERT });
  y = addBodyText(doc, "What happens when the two digits add up to MORE than 9? Try these:", y);

  y = addProblem(doc, 7, "11 x 48 = ?  (4 + 8 = 12 — what happens to the extra 1?)", y, {
    writeLines: [
      { label: "Prediction using rule:" },
      { label: "Check with vertical method:" },
      { label: "What happened:" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, 8, "11 x 67 = ?  (6 + 7 = 13)", y, {
    writeLines: [
      { label: "Prediction:" },
      { label: "Check:" },
      { label: "Modified rule:" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, 9, "11 x 99 = ?  (9 + 9 = 18)", y, {
    writeLines: [
      { label: "Prediction:" },
      { label: "Check:" },
    ],
    color: C.ALERT,
  });

  y = addSectionHeading(doc, "Explain Why It Works", y, { color: C.PRIMARY });
  y = addProblem(doc, 10, "Can you explain WHY this shortcut works? Think about what 11 actually means: 11 = 10 + 1. So 11 x 23 = (10 + 1) x 23 = 10 x 23 + 1 x 23 = 230 + 23 = 253. How does this connect to the pattern you found?", y, {
    writeLines: [
      { label: "My explanation:" },
      { label: "" },
      { label: "" },
    ],
    color: C.PRIMARY,
  });

  y = addTipBox(doc, "Extra challenge: Can you find a similar shortcut for multiplying by 111? Test it with 111 x 23 and 111 x 34. Does a pattern emerge?", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Answer Key (check AFTER attempting)", y, { color: C.ACCENT });
  y = addBodyText(doc, "11x23=253, 11x34=374, 11x45=495, 11x52=572, 11x61=671, 11x72=792, 11x81=891, 11x36=396", y);
  y = addBodyText(doc, "The rule: Split the two digits apart and write their sum in the middle. E.g., 2_3, middle = 2+3=5, answer = 253.", y);
  y = addBodyText(doc, "When digits sum > 9: carry the 1. E.g., 11x48: 4_8, 4+8=12, so write 2 in middle, carry 1 to first digit: 528. 11x67=737. 11x99=1089.", y);

  addPdfFooter(doc, FOOTER);
  await writePdf(doc, `${OUT_DIR}/${RESOURCES.extension.fileName}`);
  console.log(`  ${RESOURCES.extension.name} written.`);
}

build().catch(console.error);
