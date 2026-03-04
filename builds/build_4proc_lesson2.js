// Lesson 2 of 4: Vertical Multiplication Method — Review & Fluency
// Year 5/6 Numeracy — Four Processes Review Week
// Focus: Misconceptions, common errors, and proficient independent practice
// Week 1, Session 2

"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const { createTheme } = require("../themes/factory");
const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addBodyText, addProblem, addTipBox, addPdfFooter,
  addWriteLine, addStepInstructions, addLinedArea,
  addTwoColumnOrganiser, addResourceSlide,
} = require("../themes/pdf_helpers");

// ── Theme ─────────────────────────────────────────────────────────────────────
const T = createTheme("numeracy", "grade56", 1);
const {
  C, FONT_H, FONT_B,
  titleSlide, liSlide, contentSlide, cfuSlide, closingSlide,
  workedExSlide, exitTicketSlide, addStageBadge,
  withReveal,
  addTopBar, addBadge, addTitle, addCard, addFooter, addTextOnShape,
  iconToBase64Png, getContrastColor,
  SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;

const OUT_DIR = "output/4Proc_Lesson2_Vertical_Multiplication";
const FOOTER = "Session 2 of 4 | Four Processes Review | Year 5/6 Maths";

// ── Teacher notes ─────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
• "Welcome to Session 2 of our Four Processes review week. Today we're reviewing the vertical multiplication method — a skill you've been taught before."
• "This is a REVIEW lesson. You already know how to do this. Today is about sharpening your accuracy, catching common mistakes, and building speed with multi-digit multiplication."

**DO:**
• Display the title slide as students settle. Ensure mini-whiteboards, markers, and erasers are on every desk.
• Direct attention to the session number — "This is Session 2 of 4. Yesterday was addition and subtraction. Today is multiplication."

**TEACHER NOTES:**
This is Lesson 2 of a 4-session review week on the four processes. Students have been explicitly taught the vertical multiplication algorithm before — this lesson is NOT first instruction. The focus is on review, fluency, common errors, and misconceptions. The lesson structure moves quickly through I Do (brief recap) to maximise independent practice time. Key misconceptions to watch for: forgetting the placeholder zero when multiplying by the tens digit, incorrect regrouping/carrying, misaligning partial products, and operational confusion (adding instead of multiplying). The Daily Review slides cover prerequisite content from different curriculum areas to maintain retention.

**WATCH FOR:**
• Students who seem unfamiliar with vertical multiplication — they may need the enabling scaffold (grid-lined paper) from the start.
• Readiness signal: students settling quickly with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR1 = `**SAY:**
• "Let's warm up with some daily review. Question 1 is about prime factorisation — breaking composite numbers into their prime building blocks."
• "Express 36 as a product of prime factors. Start by dividing by the smallest prime."
• "Then use your prime factorisation to simplify 36 times 25. Think: can you rearrange factors to make the multiplication easier?"

**DO:**
• Display the slide. Read the questions aloud.
• Allow 90 seconds. Students work on whiteboards.
• Check Q1: "36 = 2 times 2 times 3 times 3. We can write this as 2 squared times 3 squared."
• Check Q2: "36 times 25: Rewrite 36 as 4 times 9. Then 4 times 25 = 100, and 100 times 9 = 900. Prime factorisation helps us spot shortcuts!"

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Hold up your prime factorisation of 36. I'm looking for four primes multiplied together. Ready... show me!"
• Scan for: 2 x 2 x 3 x 3 on >=80% of boards.
PROCEED: If >=80% correct, move to DR Slide 2.
PIVOT: If students struggle, model the factor tree on the board: "36 splits into 6 times 6. Each 6 splits into 2 times 3. So 36 = 2 x 2 x 3 x 3."

**TEACHER NOTES:**
DR Topic 1 targets: "Multiplication and Division — I can represent composite numbers as a product of their factors, including prime factors when necessary and using this form to simplify calculations involving multiplication." The prime factorisation of 36 requires students to systematically decompose the number using factor trees or repeated division. The simplification task (36 x 25) tests whether students can strategically rearrange factors — recognising that 4 x 25 = 100 is the key insight. This connects to today's multiplication focus because efficient multiplication often relies on number sense and flexible factor manipulation.

**WATCH FOR:**
• Students who stop at 36 = 6 x 6 or 36 = 4 x 9 — these are factorisations but not PRIME factorisations. Redirect: "Are 6 and 9 prime? Can you break them down further?"
• Students who cannot see the simplification shortcut — this is common. The skill of rearranging factors for efficiency is an extension. Don't hold up the lesson for it.
• Readiness signal: students quickly producing 2 x 2 x 3 x 3 and attempting the simplification.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_DR2 = `**SAY:**
• "Now let's review division with remainders. This connects to yesterday's work."
• "47 divided by 5. How many times does 5 go into 47? What's left over?"
• "Now express that remainder three ways: as a whole number with remainder, as a fraction, and as a decimal."

**DO:**
• Display the slide. Read the question aloud.
• Allow 60 seconds. Students work on whiteboards.
• Check: "5 goes into 47 nine times — that's 45. Remainder is 2. So 47 divided by 5 = 9 remainder 2."
• "As a fraction: 9 and 2 fifths. As a decimal: 9.4 — because 2 fifths is the same as 4 tenths."

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Show me 47 divided by 5 as a decimal. Boards up... show me!"
• Scan for: 9.4 on >=80% of boards.
PROCEED: If >=80% correct, move to Fluency.
PIVOT: If students write 9.2, they are writing the remainder as a decimal digit rather than converting. Reteach: "The remainder is 2, but we divide by 5. Two fifths. What's 2 divided by 5? That's 0.4. So it's 9.4, not 9.2."

**TEACHER NOTES:**
DR Topic 2 targets: "Number Properties and Algorithms — I can solve division problems including remainders and express the result as a whole number, fraction or decimal." The number 47 divided by 5 is chosen because the decimal conversion is clean (0.4) but requires students to understand that the remainder IS the numerator of a fraction with the divisor as denominator. The most common error is writing 9.2 instead of 9.4 — students append the remainder directly as a decimal digit. This is a critical misconception to address because it reveals a fundamental misunderstanding of what a decimal remainder represents.

**WATCH FOR:**
• Students who write 9 r 2 but cannot convert to a fraction — they may not connect remainder to the fractional part. Prompt: "What fraction of 5 is the remainder 2?"
• Students who write 9.2 — see pivot above. This is the most common error.
• Students who cannot perform the initial division — they may need multiplication table support. "What's 5 times 9?"
• Readiness signal: students confidently writing all three representations.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
• "Fluency sprint! You have 60 seconds. This targets the tables that trip students up most: times 6, 7, 8, 9, and 12."
• "Write ONLY the answers. No working out — this is about instant recall."
• "Ready? Pencils up... GO."
• After 60 seconds: "Pens down. Let's check. Call out your answer for number 1..."

**DO:**
• Display the slide. Students work silently for 60 seconds on the multiplication grid.
• Time exactly 60 seconds. Say "GO" to start and "STOP" to end.
• Read answers aloud quickly — students self-mark. Ask for hands: "Who got 10 or more correct?"

**TEACHER NOTES:**
Fluency builds automaticity with the multiplication facts students need during vertical multiplication. If a student has to think about 6 x 8 = 48 during a multi-digit multiplication, they lose working memory capacity for the regrouping process. The 60-second sprint format builds speed. Problems deliberately target x6, x7, x8, x9, x12 — the tables most likely to cause hesitation. Answers: 1) 42 2) 54 3) 72 4) 108 5) 56 6) 63 7) 96 8) 84 9) 48 10) 81 11) 64 12) 72.

**WATCH FOR:**
• Students who freeze — they may lack confidence with harder tables. Encourage: "Start with the ones you know."
• Students who finish very quickly — they are ready for the lesson. Note who they are for potential extending challenges.
• Readiness signal: most students completing 8+ problems in 60 seconds.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
• Read from slide: "We are learning to use the vertical multiplication algorithm to accurately multiply multi-digit numbers so we can solve large calculations efficiently."
• "This is a REVIEW. You've learned this before. Today we're tightening up accuracy and catching the common mistakes."
• Read each SC aloud. "SC1 is about setting it up correctly — alignment matters. SC2 is single-digit multipliers. SC3 is two-digit multipliers with that crucial placeholder zero."

**DO:**
• Display the slide. Point to the LI as you read it.
• Point to each SC in turn. Emphasise SC3: "The placeholder zero is where most errors happen. Watch for that today."
• Leave this slide visible for 20 seconds so students can read and internalise.

**TEACHER NOTES:**
The LI frames this as a review lesson — students are consolidating, not encountering the algorithm for the first time. SC1 (digit alignment) is the foundational setup skill. SC2 (single-digit multiplier with regrouping) is the core procedural skill. SC3 (two-digit multiplier with placeholder zero and partial products) is the extension. The three SCs are progressive: you cannot do SC3 without SC2, and SC2 requires SC1. The exit ticket assesses all three, with the error analysis question probing conceptual understanding of the algorithm.

**WATCH FOR:**
• Students who look relieved (review is easier than new content) — great, they're ready.
• Students who look anxious — vertical multiplication may be a weak area. Note for closer monitoring.
• Readiness signal: students nodding, possibly mouthing the SC to themselves.

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_WE1 = `**SAY:**
• "Watch me work through 347 times 6. I'll think aloud so you can hear my reasoning."
• Think-aloud: "I need to multiply 347 by 6. First, let me set it up. 347 goes on top, 6 goes on the bottom, lined up under the ones column. I draw my multiplication sign and my line."
• "I start from the ONES column. 6 times 7 equals 42. I write the 2 in the ones column and carry the 4 above the tens column."
• "Next, the TENS column. 6 times 4 equals 24, plus the 4 I carried makes 28. I write the 8 in the tens column and carry the 2 above the hundreds column."
• "Finally, the HUNDREDS column. 6 times 3 equals 18, plus the 2 I carried makes 20. I write 20."
• Self-monitoring: "Let me estimate first: 350 times 6 is about 2,100. My answer is 2,082. That's close to 2,100 — it makes sense."
• "347 times 6 equals 2,082."

**DO:**
• Display the slide. Walk through each step slowly, pointing to the visual on the right.
• Physically write on the board or point to each digit as you narrate.
• Pause at each carry: "I carry the 4. Where does it go? Above the NEXT column."
• Emphasise the estimation check at the end — this is a critical self-monitoring habit.

**TEACHER NOTES:**
This is the first I Do worked example — a 3-digit by 1-digit multiplication with regrouping. 347 x 6 is chosen because every column requires regrouping (7x6=42, carry 4; 4x6+4=28, carry 2; 3x6+2=20), which forces students to practise the carry process three times. The think-aloud models three key habits: (1) starting from the ones column, (2) carrying correctly, (3) estimating to check reasonableness. The estimation is deliberately placed at the end, modelling the self-monitoring step. Students have seen this before — the purpose is to reactivate the procedure and highlight the carry process.

**MISCONCEPTIONS:**
• Misconception: "I add the carried number BEFORE multiplying."
  Why: Students may think carry means "add to the digit before multiplying." They compute 6 x (4+4) = 48 instead of (6 x 4) + 4 = 28.
  Impact: Produces wildly incorrect answers in higher columns.
  Quick correction: "Multiply FIRST, then add the carry. The carry gets added AFTER the multiplication, not before."

• Misconception: "I start from the hundreds column."
  Why: Students read left-to-right and may apply this to multiplication.
  Impact: Makes carrying impossible because you don't yet know what to carry.
  Quick correction: "Always start from the ones. You can't carry into a column you haven't calculated yet."

**WATCH FOR:**
• Students following along on whiteboards — encourage this.
• Students who look confused at the carry step — they may need the enabling scaffold (place value grid) during We Do.
• Readiness signal: students nodding along, possibly mouthing the steps.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_WE2 = `**SAY:**
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

**DO:**
• Display the slide. Walk through each step methodically.
• When you reach the placeholder zero, STOP and make eye contact with the class.
• "This zero is the NUMBER ONE mistake in two-digit multiplication. It's not optional. It's not decoration. It shifts everything into the tens column because we're multiplying by 30, not 3."
• Write the partial products clearly and model the addition step.
• Show the estimation check.

**TEACHER NOTES:**
This worked example tackles the hardest procedural step in vertical multiplication: the two-digit multiplier with partial products. 258 x 34 is chosen because every column in both partial products requires regrouping, giving maximum practice with the carry process. The deliberate near-error at the placeholder zero is critical — research consistently shows this is the most common error in two-digit multiplication. The teacher should dramatise the near-mistake to make the placeholder zero memorable. The three-step structure (multiply by ones, multiply by tens with placeholder, add partial products) must be explicit and labelled.

**MISCONCEPTIONS:**
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

**WATCH FOR:**
• Students who start copying the working — good sign, they're engaging.
• Students who look lost at the partial products step — they may only have experience with single-digit multipliers. Flag for the enabling scaffold.
• Readiness signal: students following the three-step process and anticipating the placeholder zero.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU_SHOWME = `**SAY:**
• "Quick check. On your whiteboards, work out 429 times 7."
• "Set it up vertically. Start from the ones. Show all your carries."
• "You have 45 seconds. When I say GO, boards up."
• After boards: "Let's check. 7 times 9 = 63. Write 3, carry 6. 7 times 2 = 14, plus 6 = 20. Write 0, carry 2. 7 times 4 = 28, plus 2 = 30. Answer: 3,003."

**DO:**
• Display the question slide (no answer visible). Students work on whiteboards.
• Time 45 seconds. Circulate and glance at boards.
• "Boards up — show me!" Scan quickly for correct answers.
• Click to reveal the worked solution.

**CFU CHECKPOINT:**
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

**TEACHER NOTES:**
This CFU checks SC2 (single-digit multiplier with regrouping). 429 x 7 requires carrying in every column (9x7=63, 2x7+6=20, 4x7+2=30), making it a thorough test of the regrouping process. Show Me Boards is the right technique here because it gives instant whole-class data — you can see exactly where errors are occurring. The withReveal structure shows the question first, then reveals the worked solution on the next slide.

**WATCH FOR:**
• Students who write 3003 but with no carries shown — they may be doing it mentally. That's fine for this problem, but push: "Show me your carries for the harder problems."
• Students who get a very different answer (e.g., 2000s or 4000s) — they likely have a multiplication fact error. Check: "What's 7 times 9?"
• Readiness signal: quick, confident answers with carries clearly shown.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
• "Your turn with a partner. Work out 568 times 8 on your whiteboards."
• "Talk to your partner as you work. Explain each step aloud — what are you multiplying? What are you carrying?"
• "You have 60 seconds. Then boards up."
• After boards: "Let's check together."

**DO:**
• Display the question slide. Students work in pairs on whiteboards.
• Circulate — listen for correct self-talk ("8 times 8 is 64, write 4, carry 6").
• After 60 seconds: "Boards up!" Scan.
• Click to reveal worked solution.

**CFU CHECKPOINT:**
Technique: Show Me Boards (Paired)
Script:
• "Work with your partner. One person writes, the other checks the carries. Boards up in 60 seconds."
• Scan for: 4,544 on >=80% of boards.
PROCEED: If >=80% correct, move to We Do Problem Pair 2 (two-digit multiplier).
PIVOT: If many students show incorrect answers:
  - Common error 4,504 (dropped carry from tens to hundreds): Model just that column. "6 times 8 = 48, plus the 6 we carried = 54. Write 4, carry 5."
  - Common error 4,464 (8x8=64 carry wrong): Check table knowledge.
  Re-do with simpler problem: "Try 234 x 5 first. Show me every carry."

**TEACHER NOTES:**
This We Do problem (568 x 8) is a single-digit multiplier with heavy regrouping: 8x8=64 (carry 6), 6x8+6=54 (carry 5), 5x8+5=45. Every column produces a two-digit result requiring a carry. The paired working format encourages mathematical talk — one student computes while the other monitors carries. This is a bridge between the I Do and independent work. The withReveal structure lets the teacher show the question, have students work, then click to show the solution.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide grid-lined paper with place value columns pre-drawn (H, T, O columns). Students write each digit in a separate cell. This reduces alignment errors and makes carries visible.
• Extra Notes: Seat enabling students near the front where the worked example from I Do is still visible.

EXTENDING PROMPT:
• Task: "After solving 568 x 8, estimate 568 x 80. How does it relate to your answer?" (It's 10 times larger — 45,440.)
• Extra Notes: This previews the placeholder zero concept from WE2.

**WATCH FOR:**
• Partners who disagree — excellent! Have them check each other's work column by column.
• Students who don't show carries — push: "Where's your carry? I need to see it."
• Readiness signal: partners finishing within 30 seconds with correct working.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
• "Now the challenge — a two-digit multiplier. Work out 374 times 26."
• "Remember the three steps: (1) multiply by the ones digit, (2) placeholder zero then multiply by the tens digit, (3) add partial products."
• "Talk through each step with your partner. You have 90 seconds."
• After boards: "Let's check together."

**DO:**
• Display the question slide. Students work in pairs for 90 seconds.
• Circulate actively — specifically check that students are:
  1. Writing two partial products (not just one)
  2. Including the placeholder zero in the second row
  3. Adding partial products correctly
• "Boards up!" Scan for correct answer and TWO rows of multiplication.
• Click to reveal worked solution.

**CFU CHECKPOINT:**
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

**TEACHER NOTES:**
This We Do problem (374 x 26) tests SC3 — the full two-digit multiplier process. The partial products are 374 x 6 = 2,244 and 374 x 20 = 7,480. Students must execute the three-step process: multiply by ones (6), multiply by tens (2) with placeholder zero, add partial products. 90 seconds is generous — most students should finish in 60. The extra time is for checking. This is the critical transition problem before the Hinge Question, which tests conceptual understanding of partial products.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide a partially completed template: "374 x 6 = ____" (first partial product) and "374 x 20 = ____0" (with the zero pre-filled). Students complete each multiplication and then add.
• Extra Notes: Breaking the two-digit multiplication into two separate single-digit multiplications (with the zero pre-filled) scaffolds the procedure while maintaining the mathematical structure.

EXTENDING PROMPT:
• Task: "Can you solve 374 x 26 using the area model (grid method) and compare it to the vertical method? Which do you prefer and why?"
• Extra Notes: The area model breaks 374 x 26 into (300+70+4) x (20+6) = 6 partial products. It connects to the vertical method but makes the place value explicit.

**WATCH FOR:**
• Students who write only one row — they're treating 26 as a single-digit multiplier. Redirect: "26 has TWO digits. How many rows of multiplication do you need?"
• Students who multiply by 2 instead of 20 (no placeholder zero) — the answer will be roughly 1,000 too small. "Check: is your answer close to 374 x 25 = about 9,350?"
• Partners who split the work (one does x6, other does x20) — this is a good strategy! Affirm it.
• Readiness signal: partners finishing within 60 seconds with correct two-row layout.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
• "Hinge question time. I need to know if you truly understand the partial products."
• "Look at the four options. Which calculation shows the CORRECT partial products for 156 times 43?"
• "Don't calculate the whole thing — just identify which option has the right partial products."
• "Hold up A, B, C, or D fingers. You have 15 seconds to decide."
• After finger vote: "The answer is..."

**DO:**
• Display the question slide with four options. Allow 15 seconds of thinking time.
• "Show me fingers — A, B, C, or D." Scan the room quickly.
• Click to reveal the answer and explanations.
• Address each distractor briefly: "Option A forgot the placeholder zero. Option C multiplied both digits by ones. Option D has the partial products in the wrong order and arithmetic errors."

**CFU CHECKPOINT:**
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

**TEACHER NOTES:**
This hinge question tests conceptual understanding of the partial products structure, not just procedural execution. Students must recognise that 156 x 43 produces partial products of 156 x 3 (= 468) and 156 x 40 (= 6,240). Each distractor targets a specific misconception. Option A (missing placeholder) is the most diagnostic — students who choose it can execute multiplication but don't understand why the placeholder zero exists. Option C (multiplied by 3 twice) reveals students who don't parse the two-digit multiplier correctly. Option D (swapped order) is a more sophisticated error.

**WATCH FOR:**
• Students who choose A — they need explicit reteaching of the placeholder zero before You Do.
• Students who hold up fingers uncertainly — they may be guessing. Ask them to check on whiteboards.
• Readiness signal: fast, confident holds for option B.

[Maths: Monitor Progress — Hinge Question | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
• "You're ready. Time to practise independently."
• Read from slide: "Complete six problems — three with single-digit multipliers and three with two-digit multipliers."
• "Use your worksheet. Set out each problem vertically. Show all carries. Estimate to check your answer."
• "You have 10 minutes. Quiet, focused work."

**DO:**
• Distribute SR1 worksheet (Vertical Multiplication Practice).
• Set a visible timer for 10 minutes.
• Circulate — visit enabling students first (those who struggled with CFU or We Do), then extending students.
• Conference briefly with 2–3 students: "Talk me through your working for this problem."

**TEACHER NOTES:**
You Do provides 6 graded problems (3 single-digit, 3 two-digit multipliers). The problems are:
Single-digit: (1) 253 x 7 = 1,771  (2) 486 x 9 = 4,374  (3) 615 x 8 = 4,920
Two-digit: (4) 324 x 15 = 4,860  (5) 478 x 32 = 15,296  (6) 593 x 47 = 27,871
Problems increase in difficulty. Problems 1–3 test SC2, problems 4–6 test SC3. The grid format on the worksheet supports alignment. Students should estimate before or after each calculation.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Students use the grid-lined worksheet with pre-drawn place value columns. They complete problems 1–4 (three single-digit multipliers plus the first two-digit multiplier, which has simpler numbers: 324 x 15). The SR2 answer key can be given after completion for self-checking.
• Extra Notes: Seat enabling students near the front. Check their digit alignment on problem 1 before they continue.

EXTENDING PROMPT:
• Task: After completing all 6 problems, students work on EXT1 — "Multiplying by 11: Discover the Shortcut Pattern." The PDF is self-contained with worked examples, a discovery task, and proof exploration.
• Extra Notes: Distribute the EXT1 PDF to extending students when they finish the main task.

**WATCH FOR:**
• Students who don't set up the problem vertically — they may try to do it mentally or horizontally. Redirect: "Set it up in the grid. Digits aligned."
• Students who skip the placeholder zero on problems 4–6 — the most common error. "Count your partial products — do you have TWO rows?"
• Students who finish all 6 quickly and correctly — these are your extending students. Give them EXT1.
• Readiness signal: students completing problems 1–3 in under 4 minutes.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
• "Pens down on the worksheet. Exit ticket time — three questions to show what you've learned."
• "Work silently and independently. No looking at your worksheet. This is just for me to see where you are."
• "You have 4 minutes."

**DO:**
• Display the exit ticket slide. Students write answers in their maths books.
• Set a timer for 4 minutes. Circulate silently — observe but don't help.
• Collect responses or note answers as students hold up books.

**TEACHER NOTES:**
The exit ticket assesses all three SCs:
Q1: 362 x 9 = 3,258 — tests SC2 (single-digit multiplier with regrouping in every column).
Q2: 245 x 36 = 8,820 — tests SC3 (two-digit multiplier with partial products: 1,470 + 7,350).
Q3: Error analysis — "A student wrote 156 x 43 = 1,092. What did they do wrong?" The answer: They only multiplied by 3 (156 x 3 = 468) and then by 4 without the placeholder zero (156 x 4 = 624), getting 468 + 624 = 1,092. They forgot the placeholder zero — they should have got 468 + 6,240 = 6,708.

Sort responses into three groups after class:
(1) Q1 wrong — need fundamental reteaching of single-digit vertical multiplication.
(2) Q1 correct, Q2 wrong — understand single-digit but need more practice with two-digit.
(3) All correct — ready for division review in Session 3.

**WATCH FOR:**
• Students who answer Q3 with "they multiplied wrong" but can't identify the SPECIFIC error — push: "Was the multiplication itself wrong, or was the setup wrong?"
• Students who can't spot the placeholder zero error in Q3 but got Q2 correct — they may be doing it procedurally without understanding WHY the placeholder zero matters.
• Readiness signal: students finishing Q1 and Q2 within 3 minutes.

[Maths: Summarise — Exit Ticket (Stage 5) | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `**SAY:**
• "Before we wrap up — here are the printable resources for today's lesson. If you're a teacher using this deck, click any link to open the PDF."
• "SR1 is the practice worksheet. SR2 is the answer key. EXT1 is the Multiplying by 11 investigation for extending students."

**DO:**
• Display the slide briefly. Teachers can click hyperlinks to open PDFs.
• This slide is primarily for teacher preparation — students don't need to see it during the lesson.

**TEACHER NOTES:**
All PDFs are in the same folder as this PPTX file. Hyperlinks are relative — they work when the PPTX is opened from the lesson folder. Print SR1 before the lesson (one per student). Print EXT1 for extending students only (typically 3–5 copies). SR2 is for teacher reference — do not distribute to students during the lesson.

**WATCH FOR:**
• N/A — this is a teacher-facing slide.

[Maths: Planning — Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
• "Let's look back at our success criteria."
• Read from slide: "SC1: I can set out a multiplication problem vertically with digits correctly aligned."
• "Give me a thumbs up, sideways, or down for SC1." Pause and scan. "Great — most thumbs up."
• Read: "SC2: I can multiply a multi-digit number by a single-digit number using the vertical method, including regrouping."
• "Thumbs for SC2." Pause and scan.
• Read: "SC3: I can multiply a multi-digit number by a two-digit number using the vertical method, including the placeholder zero and adding partial products."
• "Thumbs for SC3." Pause. "Some sideways — that's OK. The placeholder zero takes practice."
• "Turn to your partner: What is the ONE mistake you need to watch out for in vertical multiplication? 30 seconds."
• "Tomorrow we review division. Well done today."

**DO:**
• Display the closing slide with SC listed. Read each SC aloud.
• Run thumbs up/sideways/down for each SC in turn.
• Allow 30 seconds for the Turn & Talk. Listen to 2–3 pairs.
• Close with a brief acknowledgement of effort and preview of tomorrow.

**TEACHER NOTES:**
The closing slide reviews all three SCs. The Turn & Talk prompt asking about "one mistake to watch for" is deliberately framed around error awareness — this lesson's focus is on catching common mistakes. Students who name the placeholder zero are demonstrating SC3 awareness. Students who name carries are focused on SC2. Both are valid. The preview of division in Session 3 builds anticipation and connects to the unit trajectory.

**WATCH FOR:**
• Students who show thumbs-down on SC2 — this is a critical gap. They may need 1:1 conferencing before the unit test.
• Students who show thumbs-up on all three — confirm with exit ticket data.
• The Turn & Talk: listen for students who mention the placeholder zero — this indicates SC3 awareness.

[Maths: Summarise — Closing | VTLM 2.0: Monitor Progress & Feedback]`;

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

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "Vertical Multiplication — Session 2";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres, "Vertical Multiplication\nMethod", "Four Processes Review — Accuracy & Fluency",
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
    ["We are learning to use the vertical multiplication algorithm to accurately multiply multi-digit numbers so we can solve large calculations efficiently."],
    [
      "I can set out a multiplication problem vertically with digits correctly aligned.",
      "I can multiply a multi-digit number by a single-digit number using the vertical method, including regrouping.",
      "I can multiply a multi-digit number by a two-digit number using the vertical method, including the placeholder zero and adding partial products.",
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
    addCard(s, 0.5, CONTENT_TOP + 0.55, 4.8, 3.3, { strip: C.PRIMARY });
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
    addCard(s, 5.6, CONTENT_TOP + 0.55, 3.9, 3.3, { strip: C.SECONDARY });
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
    addCard(s, 0.5, CONTENT_TOP + 0.55, 5.0, 3.3, { strip: C.PRIMARY });

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
    addCard(s, 5.7, CONTENT_TOP + 0.55, 3.8, 3.3, { strip: C.ALERT });
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

      // Instructions
      addCard(s, 0.5, CONTENT_TOP + 1.7, 9, 1.5, { strip: C.ALERT });
      s.addText([
        { text: "On your whiteboards:", options: { bold: true, breakLine: true, fontSize: 16, color: C.ALERT } },
        { text: "Set it up vertically. Start from the ones.", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL } },
        { text: "Show ALL your carries.", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL } },
        { text: "45 seconds — then boards up!", options: { fontSize: 14, color: C.ALERT, bold: true } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.85, w: 8.5, h: 1.2,
        fontFace: FONT_B, margin: 0, valign: "top",
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

      // Instructions
      addCard(s, 0.5, CONTENT_TOP + 1.5, 4.5, 2.0, { strip: C.SECONDARY });
      s.addText([
        { text: "With your partner:", options: { bold: true, breakLine: true, fontSize: 14, color: C.SECONDARY } },
        { text: "One writes, one checks carries.", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "Talk through each step aloud.", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "60 seconds — then boards up!", options: { fontSize: 12, color: C.ALERT, bold: true } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.65, w: 4.0, h: 1.6,
        fontFace: FONT_B, margin: 0, valign: "top",
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

  // ── SLIDES 12–13: We Do — Problem Pair 2: 374 x 26 (withReveal) ───────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Problem Pair: 374 x 26", { fontSize: 22, color: C.SECONDARY });

      // Problem display
      addTextOnShape(s, "374 x 26 = ?", {
        x: 1.5, y: CONTENT_TOP + 0.2, w: 7, h: 1.0, rectRadius: 0.12,
        fill: { color: C.SECONDARY },
      }, { fontSize: 44, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Three-step reminder
      addCard(s, 0.5, CONTENT_TOP + 1.5, 4.5, 2.2, { strip: C.SECONDARY });
      s.addText([
        { text: "Three-step process:", options: { bold: true, breakLine: true, fontSize: 13, color: C.SECONDARY } },
        { text: "1.  Multiply by the ones digit (6)", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "2.  Placeholder zero, then multiply by the tens digit (2)", options: { breakLine: true, fontSize: 12, color: C.ALERT, bold: true } },
        { text: "3.  Add the two partial products", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "90 seconds — then boards up!", options: { fontSize: 12, color: C.ALERT, bold: true } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.65, w: 4.0, h: 1.8,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Warning card about placeholder zero
      addCard(s, 5.5, CONTENT_TOP + 1.5, 4.0, 2.2, { strip: C.ALERT });
      addTextOnShape(s, "WATCH OUT!", {
        x: 5.7, y: CONTENT_TOP + 1.58, w: 1.8, h: 0.3, rectRadius: 0.06,
        fill: { color: C.ALERT },
      }, { fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true });
      s.addText([
        { text: "The 2 in 26 means TWENTY", options: { bold: true, breakLine: true, fontSize: 12, color: C.ALERT } },
        { text: "You MUST put a placeholder zero before multiplying by 2.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Without it, your answer will be about 10x too small for that row!", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Estimate: 374 x 26 ~ 375 x 26 ~ 9,750", options: { fontSize: 11, color: C.ACCENT, bold: true } },
      ], {
        x: 5.7, y: CONTENT_TOP + 1.98, w: 3.6, h: 1.5,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO2);
      return s;
    },
    (slide) => {
      // Reveal: cover left card with solution steps
      addCard(slide, 0.5, CONTENT_TOP + 1.5, 4.5, 2.2, { fill: C.WHITE, strip: C.SUCCESS });
      slide.addText("Solution: 374 x 26", {
        x: 0.7, y: CONTENT_TOP + 1.56, w: 4.0, h: 0.22,
        fontSize: 12, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      // Partial product 1
      addTextOnShape(slide, "374 x 6 = 2,244", {
        x: 0.8, y: CONTENT_TOP + 1.82, w: 2.5, h: 0.26, rectRadius: 0.06,
        fill: { color: C.PRIMARY },
      }, { fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true });
      slide.addText("6x4=24(4,c2) 6x7=42+2=44(4,c4) 6x3=18+4=22", {
        x: 0.8, y: CONTENT_TOP + 2.12, w: 4.0, h: 0.18,
        fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });

      // Partial product 2
      addTextOnShape(slide, "374 x 20 = 7,480", {
        x: 0.8, y: CONTENT_TOP + 2.35, w: 2.5, h: 0.26, rectRadius: 0.06,
        fill: { color: C.SECONDARY },
      }, { fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true });
      slide.addText("0 placeholder, then 2x4=8, 2x7=14(4,c1) 2x3=6+1=7", {
        x: 0.8, y: CONTENT_TOP + 2.65, w: 4.0, h: 0.18,
        fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });

      // Addition total
      addTextOnShape(slide, "2,244 + 7,480 = 9,724", {
        x: 0.8, y: CONTENT_TOP + 2.9, w: 3.5, h: 0.32, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Cover right card with vertical multiplication visual
      addCard(slide, 5.5, CONTENT_TOP + 1.5, 4.0, 2.2, { fill: C.WHITE, strip: C.ALERT });
      slide.addText("Vertical Layout", {
        x: 5.7, y: CONTENT_TOP + 1.58, w: 3.6, h: 0.25,
        fontSize: 11, fontFace: FONT_H, color: C.ALERT, bold: true, margin: 0,
      });

      drawVerticalMultiplication(slide, 6.7, CONTENT_TOP + 1.78, {
        topNum: 374,
        bottomNum: 26,
        partials: [2244, 7480],
        answer: 9724,
        cellW: 0.3,
        cellH: 0.3,
        fontSize: 13,
        onesColor: C.PRIMARY,
        tensColor: C.SECONDARY,
        highlightPlaceholder: true,
      });

      addTextOnShape(slide, "374 x 26 = 9,724  |  Est. ~9,750", {
        x: 0.5, y: SAFE_BOTTOM - 0.35, w: 9, h: 0.35, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDES 14–15: CFU Hinge Question (withReveal) ─────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "Hinge Question", { color: C.ALERT, w: 2.2 });
      addTitle(s, "Which shows the CORRECT partial products for 156 x 43?", { color: C.ALERT, fontSize: 18 });

      // Four option cards in a 2x2 grid
      const options = [
        { letter: "A", line1: "156 x 3 = 468", line2: "156 x 4 = 624", line3: "Total: 1,092", desc: "(no placeholder zero)" },
        { letter: "B", line1: "156 x 3 = 468", line2: "156 x 40 = 6,240", line3: "Total: 6,708", desc: "(placeholder zero included)" },
        { letter: "C", line1: "156 x 3 = 468", line2: "156 x 3 = 468", line3: "Total: 936", desc: "(multiplied by 3 twice)" },
        { letter: "D", line1: "156 x 4 = 624", line2: "156 x 30 = 4,680", line3: "Total: 5,304", desc: "(swapped ones and tens)" },
      ];
      const optColors = [C.PRIMARY, C.SECONDARY, C.ACCENT, C.SUCCESS];

      options.forEach((opt, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const ox = 0.5 + col * 4.7;
        const oy = CONTENT_TOP + 0.1 + row * 1.72;
        const ow = 4.4;
        const oh = 1.55;

        addCard(s, ox, oy, ow, oh, { strip: optColors[i] });

        // Letter badge
        addTextOnShape(s, opt.letter, {
          x: ox + 0.12, y: oy + 0.1, w: 0.4, h: 0.4, rectRadius: 0.2,
          fill: { color: optColors[i] },
        }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

        // Content
        s.addText([
          { text: opt.line1, options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
          { text: opt.line2, options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
          { text: opt.line3, options: { breakLine: true, fontSize: 12, color: optColors[i], bold: true } },
          { text: opt.desc, options: { fontSize: 9, color: C.MUTED, italic: true } },
        ], {
          x: ox + 0.6, y: oy + 0.1, w: ow - 0.8, h: oh - 0.2,
          fontFace: FONT_B, margin: 0, valign: "middle",
        });
      });

      // Instruction
      addTextOnShape(s, "Hold up A, B, C, or D fingers — 15 seconds", {
        x: 2.0, y: SAFE_BOTTOM - 0.55, w: 6, h: 0.42, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_HINGE);
      return s;
    },
    (slide) => {
      // Reveal: highlight B as correct — banner over top row
      addTextOnShape(slide, "B is CORRECT: 468 + 6,240 = 6,708", {
        x: 1.5, y: CONTENT_TOP + 0.2, w: 7, h: 0.45, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Explanation text — cover bottom row of option cards and "Hold up" bar
      addCard(slide, 0.5, CONTENT_TOP + 1.82, 9, 2.1, { fill: C.WHITE, strip: C.SUCCESS });
      slide.addText([
        { text: "A: Forgot the placeholder zero — multiplied by 4 instead of 40.", options: { breakLine: true, fontSize: 10, color: C.ALERT } },
        { text: "B: CORRECT — 156 x 3 = 468 and 156 x 40 = 6,240. Placeholder zero shifts into tens.", options: { breakLine: true, fontSize: 10, color: C.SUCCESS, bold: true } },
        { text: "C: Multiplied by 3 twice instead of by 3 AND by 4(0).", options: { breakLine: true, fontSize: 10, color: C.ALERT } },
        { text: "D: Swapped ones and tens — multiplied by 4 first, then 30 instead of 3 then 40.", options: { fontSize: 10, color: C.ALERT } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.95, w: 8.5, h: 1.4,
        fontFace: FONT_B, margin: 0, valign: "top",
      });
    }
  );

  // ── SLIDE 16: You Do — Independent Practice (Stage 4) ─────────────────
  contentSlide(pres, "Stage 4 | You Do", C.ALERT, "Independent Practice: Vertical Multiplication", [], NOTES_YOUDO, FOOTER, (s) => {
    // Instruction card
    addCard(s, 0.5, CONTENT_TOP, 5.2, 1.5, { strip: C.ALERT });
    const instrSteps = [
      { label: "First:", text: "Complete Problems 1–3 (single-digit multipliers)." },
      { label: "Next:", text: "Complete Problems 4–6 (two-digit multipliers)." },
      { label: "Then:", text: "Estimate each answer to check reasonableness." },
      { label: "Challenge:", text: "Finished? Collect EXT1 — Multiplying by 11 investigation." },
    ];
    instrSteps.forEach((st, i) => {
      s.addText([
        { text: st.label + " ", options: { bold: true, fontSize: 11, color: i === 3 ? C.ACCENT : C.ALERT } },
        { text: st.text, options: { fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: CONTENT_TOP + 0.1 + i * 0.32, w: 4.7, h: 0.3,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Problems overview (right side)
    addCard(s, 5.8, CONTENT_TOP, 3.7, 1.5, { strip: C.PRIMARY });
    s.addText("Problems", {
      x: 6.0, y: CONTENT_TOP + 0.06, w: 3.3, h: 0.22,
      fontSize: 11, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });
    const probList = [
      "1. 253 x 7", "2. 486 x 9", "3. 615 x 8",
      "4. 324 x 15", "5. 478 x 32", "6. 593 x 47",
    ];
    probList.forEach((p, i) => {
      const pcol = i < 3 ? C.PRIMARY : C.SECONDARY;
      s.addText(p, {
        x: 6.0 + (i < 3 ? 0 : 1.65), y: CONTENT_TOP + 0.32 + (i % 3) * 0.3, w: 1.6, h: 0.28,
        fontSize: 11, fontFace: FONT_B, color: pcol, margin: 0, valign: "middle", bold: true,
      });
    });

    // Key reminders card at bottom
    addCard(s, 0.5, CONTENT_TOP + 1.7, 9, 2.0, { strip: C.SECONDARY });
    s.addText("Key Reminders", {
      x: 0.75, y: CONTENT_TOP + 1.78, w: 3, h: 0.25,
      fontSize: 11, fontFace: FONT_B, color: C.SECONDARY, bold: true, margin: 0,
    });

    // Reminders in two columns
    const leftReminders = [
      "Digits aligned in columns",
      "Start from the ones",
      "Carry amounts above the next column",
    ];
    const rightReminders = [
      "Placeholder zero for tens multiplication",
      "Add partial products carefully",
      "Estimate to check your answer",
    ];
    leftReminders.forEach((r, i) => {
      s.addText([
        { text: (i + 1) + ".  ", options: { bold: true, fontSize: 11, color: C.SECONDARY } },
        { text: r, options: { fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: CONTENT_TOP + 2.1 + i * 0.3, w: 4.2, h: 0.28,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });
    rightReminders.forEach((r, i) => {
      s.addText([
        { text: (i + 4) + ".  ", options: { bold: true, fontSize: 11, color: C.SECONDARY } },
        { text: r, options: { fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 5.2, y: CONTENT_TOP + 2.1 + i * 0.3, w: 4.2, h: 0.28,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Worksheet reference
    addTextOnShape(s, "Use your SR1 Worksheet  |  10 minutes", {
      x: 2.5, y: SAFE_BOTTOM - 0.55, w: 5, h: 0.42, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });
  });

  // ── SLIDE 17: Exit Ticket (Stage 5) ───────────────────────────────────
  exitTicketSlide(pres, [
    "Q1: 362 x 9 = ?  (Show all working.)",
    "Q2: 245 x 36 = ?  (Show both partial products.)",
    "Q3: A student calculated 156 x 43 = 1,092. Spot the mistake and explain what they did wrong.",
  ], NOTES_EXIT, FOOTER);

  // ── SLIDE 18: Resources ───────────────────────────────────────────────
  addResourceSlide(pres, [
    {
      name: "SR1 — Vertical Multiplication Practice",
      fileName: "SR1_Vertical_Multiplication_Practice.pdf",
      description: "8 problems (4 single-digit, 4 two-digit) with grid format. One per student.",
    },
    {
      name: "SR2 — Vertical Multiplication Answers",
      fileName: "SR2_Vertical_Multiplication_Answers.pdf",
      description: "Answer key for SR1. Teacher reference only.",
    },
    {
      name: "EXT1 — Multiplication Patterns Investigation",
      fileName: "EXT1_Multiplication_Patterns.pdf",
      description: "Multiplying by 11 — discover the shortcut pattern. Extending resource.",
    },
  ], { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // ── SLIDE 19: Closing ─────────────────────────────────────────────────
  closingSlide(pres,
    "What is the ONE mistake you need to watch out for in vertical multiplication? Turn to your partner — 30 seconds.",
    [
      "SC1: I can set out a multiplication problem vertically with digits correctly aligned.",
      "SC2: I can multiply a multi-digit number by a single-digit number using the vertical method, including regrouping.",
      "SC3: I can multiply a multi-digit number by a two-digit number using the vertical method, including the placeholder zero and adding partial products.",
      "Tomorrow: Session 3 — Division review. Keep practising your tables!",
    ],
    NOTES_CLOSING);

  // ── Write PPTX ──────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: OUT_DIR + "/4Proc_Lesson2_Vertical_Multiplication.pptx" });
  console.log("PPTX written to " + OUT_DIR);

  // ── Generate companion PDFs ────────────────────────────────────────────
  await generateWorksheet();
  await generateAnswerKey();
  await generateExtendingPdf();
  console.log("All PDFs generated.");
}

// ── PDF: SR1 — Vertical Multiplication Practice ─────────────────────────────

async function generateWorksheet() {
  const doc = createPdf({ title: "Vertical Multiplication Practice" });

  let y = addPdfHeader(doc, "Vertical Multiplication Practice", {
    subtitle: "SR1 — Supporting Resource",
    color: C.PRIMARY,
    lessonInfo: "Session 2 of 4 | Four Processes Review | Year 5/6 Maths",
  });

  y = addTipBox(doc, "Set out each problem vertically with digits aligned in columns. Show all carries. Estimate before you calculate to check your answer makes sense.", y, { color: C.SECONDARY });

  // ── Section A: Single-digit multipliers ──

  y = addSectionHeading(doc, "Section A: Single-Digit Multipliers", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Multiply each number using the vertical method. Show all regrouping (carries).", y);

  y = addProblem(doc, 1, "253 x 7", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Working:" },
      { label: "" },
      { label: "Answer:" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "486 x 9", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Working:" },
      { label: "" },
      { label: "Answer:" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "615 x 8", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Working:" },
      { label: "" },
      { label: "Answer:" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 4, "739 x 6", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Working:" },
      { label: "" },
      { label: "Answer:" },
    ],
    color: C.PRIMARY,
  });

  // ── Section B: Two-digit multipliers ──

  y = addSectionHeading(doc, "Section B: Two-Digit Multipliers", y, { color: C.SECONDARY });
  y = addBodyText(doc, "Remember the three steps: (1) Multiply by the ones digit. (2) Write the placeholder zero, then multiply by the tens digit. (3) Add the partial products.", y);

  y = addTipBox(doc, "The placeholder zero is NOT optional. The tens digit represents tens, not ones. Without the zero, your second partial product will be 10 times too small.", y, { color: C.ALERT });

  y = addProblem(doc, 5, "324 x 15", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Partial product 1 (x 5):" },
      { label: "Partial product 2 (x 10):" },
      { label: "Sum of partial products:" },
    ],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 6, "478 x 32", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Partial product 1 (x 2):" },
      { label: "Partial product 2 (x 30):" },
      { label: "Sum of partial products:" },
    ],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 7, "593 x 47", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Partial product 1 (x 7):" },
      { label: "Partial product 2 (x 40):" },
      { label: "Sum of partial products:" },
    ],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 8, "867 x 53", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Partial product 1 (x 3):" },
      { label: "Partial product 2 (x 50):" },
      { label: "Sum of partial products:" },
    ],
    color: C.SECONDARY,
  });

  addPdfFooter(doc, "Session 2 of 4 | Four Processes Review | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR1_Vertical_Multiplication_Practice.pdf");
  console.log("  SR1 worksheet written.");
}

// ── PDF: SR2 — Answer Key ──────────────────────────────────────────────────────

async function generateAnswerKey() {
  const doc = createPdf({ title: "Vertical Multiplication — Answer Key" });

  let y = addPdfHeader(doc, "Vertical Multiplication — Answer Key", {
    subtitle: "SR2 — Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: "Session 2 of 4 | Four Processes Review | Year 5/6 Maths",
    showNameDate: false,
  });

  y = addSectionHeading(doc, "Section A: Single-Digit Multipliers", y, { color: C.PRIMARY });

  y = addProblem(doc, 1, "253 x 7", y, {
    writeLines: [
      { label: "Estimate:", answer: "250 x 7 = 1,750" },
      { label: "Working:", answer: "7x3=21 (1, carry 2), 7x5=35+2=37 (7, carry 3), 7x2=14+3=17" },
      { label: "Answer:", answer: "1,771" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "486 x 9", y, {
    writeLines: [
      { label: "Estimate:", answer: "490 x 9 = 4,410 (or 500 x 9 = 4,500)" },
      { label: "Working:", answer: "9x6=54 (4, carry 5), 9x8=72+5=77 (7, carry 7), 9x4=36+7=43" },
      { label: "Answer:", answer: "4,374" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "615 x 8", y, {
    writeLines: [
      { label: "Estimate:", answer: "600 x 8 = 4,800" },
      { label: "Working:", answer: "8x5=40 (0, carry 4), 8x1=8+4=12 (2, carry 1), 8x6=48+1=49" },
      { label: "Answer:", answer: "4,920" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 4, "739 x 6", y, {
    writeLines: [
      { label: "Estimate:", answer: "740 x 6 = 4,440" },
      { label: "Working:", answer: "6x9=54 (4, carry 5), 6x3=18+5=23 (3, carry 2), 6x7=42+2=44" },
      { label: "Answer:", answer: "4,434" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Section B: Two-Digit Multipliers", y, { color: C.SECONDARY });

  y = addProblem(doc, 5, "324 x 15", y, {
    writeLines: [
      { label: "Estimate:", answer: "320 x 15 = 4,800 (or 300 x 15 = 4,500)" },
      { label: "Partial product 1 (x 5):", answer: "324 x 5 = 1,620" },
      { label: "Partial product 2 (x 10):", answer: "324 x 10 = 3,240" },
      { label: "Sum:", answer: "1,620 + 3,240 = 4,860" },
    ],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 6, "478 x 32", y, {
    writeLines: [
      { label: "Estimate:", answer: "480 x 30 = 14,400" },
      { label: "Partial product 1 (x 2):", answer: "478 x 2 = 956" },
      { label: "Partial product 2 (x 30):", answer: "478 x 30 = 14,340" },
      { label: "Sum:", answer: "956 + 14,340 = 15,296" },
    ],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 7, "593 x 47", y, {
    writeLines: [
      { label: "Estimate:", answer: "600 x 47 = 28,200 (or 600 x 50 = 30,000)" },
      { label: "Partial product 1 (x 7):", answer: "593 x 7 = 4,151" },
      { label: "Partial product 2 (x 40):", answer: "593 x 40 = 23,720" },
      { label: "Sum:", answer: "4,151 + 23,720 = 27,871" },
    ],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 8, "867 x 53", y, {
    writeLines: [
      { label: "Estimate:", answer: "870 x 50 = 43,500" },
      { label: "Partial product 1 (x 3):", answer: "867 x 3 = 2,601" },
      { label: "Partial product 2 (x 50):", answer: "867 x 50 = 43,350" },
      { label: "Sum:", answer: "2,601 + 43,350 = 45,951" },
    ],
    color: C.SECONDARY,
  });

  y = addSectionHeading(doc, "Exit Ticket Answers", y, { color: C.ALERT });

  y = addProblem(doc, "Q1", "362 x 9", y, {
    writeLines: [
      { label: "Working:", answer: "9x2=18 (8, carry 1), 9x6=54+1=55 (5, carry 5), 9x3=27+5=32" },
      { label: "Answer:", answer: "3,258" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, "Q2", "245 x 36", y, {
    writeLines: [
      { label: "Partial product 1:", answer: "245 x 6 = 1,470" },
      { label: "Partial product 2:", answer: "245 x 30 = 7,350" },
      { label: "Answer:", answer: "1,470 + 7,350 = 8,820" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, "Q3", "156 x 43 = 1,092 — What went wrong?", y, {
    writeLines: [
      { label: "Error:", answer: "The student forgot the placeholder zero when multiplying by the tens digit." },
      { label: "Detail:", answer: "They computed 156x3=468 and 156x4=624 (should be 156x40=6,240). 468+624=1,092 instead of 468+6,240=6,708." },
      { label: "Correct answer:", answer: "6,708" },
    ],
    color: C.ALERT,
  });

  addPdfFooter(doc, "Teacher Reference — Do Not Distribute to Students");
  await writePdf(doc, OUT_DIR + "/SR2_Vertical_Multiplication_Answers.pdf");
  console.log("  SR2 answer key written.");
}

// ── PDF: EXT1 — Multiplication Patterns Investigation ───────────────────────

async function generateExtendingPdf() {
  const doc = createPdf({ title: "Multiplying by 11 — Discover the Shortcut" });

  let y = addPdfHeader(doc, "Multiplying by 11: Discover the Pattern", {
    subtitle: "EXT1 — Extending Challenge",
    color: C.ACCENT,
    lessonInfo: "Session 2 of 4 | Four Processes Review | Year 5/6 Maths",
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

  addPdfFooter(doc, "Session 2 of 4 | Four Processes Review | Year 5/6 Maths — Extending Investigation");
  await writePdf(doc, OUT_DIR + "/EXT1_Multiplication_Patterns.pdf");
  console.log("  EXT1 extending investigation written.");
}

build().catch(console.error);
