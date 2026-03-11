// Lesson 1 of 4: Vertical Addition & Subtraction Review
// Year 5/6 Maths — Four Processes Review Week
// Focus: Review, fluency, misconceptions, independent practice
// Week 1, Session 1

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
const LESSON = LESSONS[1];
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

// ── Teacher notes ─────────────────────────────────────────────────────────────

const NOTES_TITLE = `SAY:
• "Welcome to our Four Processes Review week. Over four sessions we'll sharpen our skills with addition, subtraction, multiplication and division — the four building blocks of all maths."
• "Today we focus on vertical addition and vertical subtraction. You've learned these before — today is about getting faster, more accurate, and spotting the mistakes that catch people out."
• "By the end of today, you'll be confident setting out and solving multi-digit addition and subtraction problems vertically."

DO:
• Display the title slide as students settle. Ensure mini-whiteboards, markers and erasers are on every desk.
• Direct attention to the session number: "This is Session 1 of 4 — addition and subtraction today, multiplication and division later in the week."

TEACHER NOTES:
This is a review week, not initial instruction. Students have been taught vertical addition (with regrouping/carrying) and vertical subtraction (with trading/borrowing) in prior terms. The purpose of this lesson is threefold: (1) rebuild automaticity through fluency practice, (2) surface and correct common misconceptions that have crept in since initial instruction, and (3) build proficiency through graduated independent practice. The I Do phase is shorter than in a new-content lesson because the algorithms are not new — instead, the think-alouds deliberately model the self-monitoring strategies (estimation, column-by-column checking) that distinguish proficient from mechanical application.

WATCH FOR:
• Students who groan or say "we already know this" — reframe: "Knowing it and being FAST and ACCURATE are different things. Today we're aiming for both."
• Students who look anxious — they may have gaps from initial instruction. Note for closer monitoring during I Do.
• Readiness signal: students settling quickly with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR1 = `SAY:
• "Let's warm up with some review from a different strand. We're looking at divisibility tests — quick tricks to check if a large number is divisible by a smaller one."
• "Look at this example: Is 89,472 divisible by 3?"
• "Here's the test: add all the digits. 8 + 9 + 4 + 7 + 2 = 30. Is 30 divisible by 3? Yes — 30 divided by 3 is 10. So 89,472 IS divisible by 3, which means it's a multiple of 3."
• "Now your turn. Use the divisibility test to check the numbers on the board. Work on your whiteboards."

DO:
• Display the slide. Walk through the worked example (89,472) step by step.
• Set 60 seconds for students to test the practice numbers on their whiteboards.
• After 60 seconds: "Boards up — show me your answers."
• Check and discuss: emphasise the digit-sum strategy.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "Hold up your boards. I'm looking for the digit sum and your YES/NO conclusion. Ready… show me!"
• Scan for: correct digit sums and correct divisibility conclusions on >=80% of boards.
PROCEED: If >=80% correct, move to DR Slide 2.
PIVOT: If students struggle with the digit-sum rule, model a second example slowly: "Let's try 123. 1 + 2 + 3 = 6. Is 6 divisible by 3? Yes, because 3 x 2 = 6. So 123 is a multiple of 3." Then retry with 457: "4 + 5 + 7 = 16. Is 16 divisible by 3? No — 3 x 5 = 15, 3 x 6 = 18, 16 is in between. So 457 is NOT a multiple of 3."

TEACHER NOTES:
Daily Review spirals content from a different strand — here, multiplication and division via divisibility tests. The divisibility rule for 3 (digit sum divisible by 3) is one of the most useful and commonly forgotten. By revisiting it in the review context, students maintain their number-sense toolkit. The digit-sum approach also reinforces mental addition — students must add multiple single digits — which connects to today's addition focus. The large number (89,472) is deliberately chosen to look intimidating but produce a clean digit sum (30), showing students that the test works even for numbers too large to divide directly.

WATCH FOR:
• Students who try to divide 89,472 by 3 directly instead of using the digit-sum test — redirect: "There's a shortcut. Add the digits first."
• Students who add digits incorrectly — this is an addition error, which is relevant to today's main content. Note these students for monitoring during I Do.
• Readiness signal: fast, confident digit-sum calculations with correct conclusions.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_DR2 = `SAY:
• "Now let's review finding unknowns using multiplication and division."
• "When you see a missing number in a multiplication or division equation, you need to think about the INVERSE operation to find it."
• "For example: ___ x 7 = 63. Think: what times 7 gives 63? Or: 63 divided by 7 = 9. So the missing number is 9."
• "Work through the problems on your whiteboards. You have 90 seconds."

DO:
• Display the slide with 6 missing-number equations.
• Allow 90 seconds. Circulate and check working.
• After time: "Let's check. Call out your answers..." Go through each one.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "Boards up for all six answers. Ready… show me!"
• Scan for: correct answers on >=80% of boards for at least 4 of the 6 problems.
PROCEED: If >=80% correct on most problems, move to Fluency.
PIVOT: If students struggle, model the inverse operation explicitly: "96 divided by ___ = 12. Think: what number times 12 gives 96? 12 x 8 = 96. So the missing number is 8." Re-check with a simpler example: "___ x 5 = 45."

TEACHER NOTES:
DR Slide 2 targets the inverse relationship between multiplication and division, a prerequisite skill for the entire Four Processes unit. Finding unknowns requires flexible thinking — students must determine which operation to use based on the structure of the equation. This skill transfers directly to checking addition and subtraction work (using the inverse to verify answers). The six problems include both multiplication and division formats to ensure students can work both directions. Numbers are chosen from the harder tables (7, 8, 9, 12) to maintain challenge.

WATCH FOR:
• Students who guess-and-check rather than using the inverse — this works but is slow. Encourage: "What's the inverse operation? Can you find the answer in one step?"
• Students who confuse which number to divide by — help them identify: "What numbers do you KNOW? What's missing?"
• Readiness signal: students completing all six within 60 seconds.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `SAY:
• "Fluency sprint time! You have 60 seconds to solve as many addition and subtraction problems as you can."
• "These are all single-step mental calculations — no setting out required. Just write the answers."
• "Some are additions, some are subtractions. Read carefully."
• "Ready? Pencils up… GO."
• After 60 seconds: "Pens down. Let's check. Call out your answer for number 1…"

DO:
• Display the slide. Students work silently for exactly 60 seconds.
• Time precisely. Say "GO" to start and "STOP" to end.
• Read answers aloud quickly — students self-mark.
• Ask: "Who got 10 or more correct? 15 or more? All 16?"

TEACHER NOTES:
The fluency sprint focuses on single-step additions and subtractions that activate the mental computation pathways students will rely on during the vertical algorithm. Problems include bridging tens (e.g., 47 + 8, 63 - 7) and bridging hundreds (e.g., 198 + 5, 304 - 8) — these are the exact sub-skills that underpin column-by-column processing in the vertical algorithm. A student who can't fluently add 8 + 5 = 13 will struggle to recognise when regrouping is needed in the ones column. The 60-second format normalises speed alongside accuracy and builds automaticity.

WATCH FOR:
• Students who freeze at subtraction problems but are fine with addition — they may have a subtraction fact fluency gap. Note for targeted monitoring during the subtraction I Do.
• Students who complete very few problems — they may be counting on fingers. This is a fluency gap that will slow their vertical algorithm work. Consider providing a number facts reference card during You Do.
• Readiness signal: most students completing 10+ problems in 60 seconds.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `SAY:
• Read from slide: "We are learning to use vertical addition and subtraction algorithms accurately so we can solve multi-digit problems with confidence."
• "Let's look at our three success criteria."
• Read SC1: "I can set out addition and subtraction problems vertically with digits aligned in the correct place value columns."
• "This is the foundation. If your digits aren't lined up, your answer WILL be wrong."
• Read SC2: "I can apply the vertical addition algorithm including regrouping — or carrying — across columns."
• Read SC3: "I can apply the vertical subtraction algorithm including trading — or borrowing — when a top digit is smaller than the bottom digit."
• "SC1 is the foundation everyone needs. SC2 and SC3 are the two algorithms we're reviewing today."

DO:
• Display the slide. Point to the LI as you read it.
• Point to each SC in turn. Pause after each one briefly.
• Leave this slide visible for 20 seconds so students can read and internalise.

TEACHER NOTES:
The LI explicitly names both algorithms and their purpose (solving multi-digit problems with confidence). "With confidence" is deliberate — this is review, so the goal is not just understanding but fluency and accuracy. SC1 (place value alignment) is separated out because misalignment is the single most common cause of errors in vertical algorithms — students who skip this step will make place value errors regardless of whether they understand regrouping and trading. SC2 and SC3 target the two algorithms independently, acknowledging that students often master addition regrouping before subtraction trading. The SCs are ordered by typical difficulty progression.

WATCH FOR:
• Students who look bored at the LI — this is review content, so some students may disengage. The I Do slides will re-engage them through error-spotting and estimation strategies.
• Students who look worried at SC3 (subtraction with trading) — trading across zeros is a common anxiety point. Reassure: "We'll go step by step."
• Readiness signal: students nodding at SC1 and SC2, attentive at SC3.

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_IDO_ADD = `SAY:
• "Watch me work through this addition step by step. I'm going to think aloud so you can hear exactly what's going on in my head."
• "First, before I even start: I'm going to ESTIMATE. 4,738 is close to 4,700. 2,695 is close to 2,700. So my answer should be near 7,400. I'll check this at the end."
• "Now I set it out vertically. Most important rule: digits must be ALIGNED by place value. Ones under ones, tens under tens, hundreds under hundreds."
• Think-aloud: "I ALWAYS start from the RIGHT — the ones column. Why? Because I need to know if I'm regrouping before I move to the tens."
• "Ones: 8 + 5 = 13. I'm tempted to write 13 in the ones column… but wait, 13 is more than 9, so I can only write the 3 and carry the 1 into the tens column."
• "Tens: 3 + 9 = 12, plus the carried 1 = 13. Again, more than 9. Write 3, carry 1."
• "Hundreds: 7 + 6 = 13, plus the carried 1 = 14. Write 4, carry 1."
• "Thousands: 4 + 2 = 6, plus the carried 1 = 7. Write 7. No more carrying."
• "My answer is 7,433. Let me check against my estimate: I predicted about 7,400. 7,433 is close to 7,400. That makes sense."
• "Self-check complete. 4,738 + 2,695 = 7,433."

DO:
• Display the slide showing the vertical algorithm with place value columns.
• Point to each column as you work through it. Use a pointer or your finger to trace right-to-left.
• Write the carried digits visibly above each column (these are shown on the slide in a different colour).
• After completing: point to the estimate and the answer side by side.
• Pause 5 seconds for students to absorb the complete working.

TEACHER NOTES:
This I Do models three critical metacognitive strategies: (1) estimating before calculating — this creates a reasonableness check that catches major errors, (2) verbalising the right-to-left direction — many errors come from students who add left-to-right and then try to "fix" regrouping retroactively, (3) the self-monitoring check ("more than 9, so I carry") — this internal dialogue is what proficient students do automatically but struggling students skip. The deliberate "temptation" moment ("I'm tempted to write 13…") names the exact error students make and models the correction in real time. The numbers are chosen to require regrouping in EVERY column (8+5=13, 3+9+1=13, 7+6+1=14) so students see the carry process repeated consistently.

MISCONCEPTIONS:
• Misconception: Not carrying the regrouped ten — writing 13 instead of 3 with a carry.
  Why: Students process each column independently without considering that two-digit results must be decomposed. They see 8 + 5 = 13 and write "13" in the ones column.
  Impact: The answer will be wildly wrong — digits will overflow their columns and place values will be corrupted.
  Quick correction: "If the answer in ANY column is 10 or more, the tens digit gets CARRIED to the next column. Only one digit can live in each column."

• Misconception: Adding left-to-right instead of right-to-left.
  Why: Reading direction (left to right) feels natural. Students may start with the thousands column.
  Impact: They won't know whether to regroup because they haven't processed the columns to the right yet. They may get a correct answer sometimes (when no regrouping is needed) but fail when regrouping occurs.
  Quick correction: "We ALWAYS start at the ones. Why? Because we need to know if we're carrying before we can add the next column."

WATCH FOR:
• Students who nod along mechanically — they may be going through the motions without processing the think-aloud. Engage: "Why did I start from the right?"
• Students who look confused at the carry — they may need the physical regrouping model (base-10 blocks) to understand what the carried 1 represents.
• Readiness signal: students mouthing "carry the 1" along with you.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_IDO_SUB = `SAY:
• "Now subtraction. This one is deliberately tricky because it involves zeros — and zeros are where most mistakes happen."
• "8,003 minus 2,457. Let me estimate first: 8,000 minus 2,500 is about 5,500. My answer should be near there."
• "I set it out vertically. Digits aligned. Now I start from the RIGHT — the ones."
• "Ones: 3 minus 7. Problem. 3 is SMALLER than 7. I can't subtract a bigger number from a smaller number in this column. I need to TRADE."
• "I need to borrow from the tens. But the tens column is 0. I can't borrow from zero."
• "So I go to the hundreds. Also 0. I can't borrow from zero either."
• "I have to go all the way to the thousands. Watch the chain: I borrow 1 thousand from the 8, making it 7. That 1 thousand becomes 10 hundreds. I borrow 1 hundred from those 10, leaving 9 hundreds. That 1 hundred becomes 10 tens. I borrow 1 ten from those 10, leaving 9 tens. That 1 ten becomes 10 ones. Now I have 13 ones."
• "Let me track: 7 thousands, 9 hundreds, 9 tens, 13 ones. That's still 8,003 — I've just renamed it."
• "Now I can subtract: Ones: 13 - 7 = 6. Tens: 9 - 5 = 4. Hundreds: 9 - 4 = 5. Thousands: 7 - 2 = 5."
• "Answer: 5,546. Check against estimate: I said about 5,500. 5,546 is close. Confirmed."

DO:
• Display the slide showing the subtraction with the trading chain across zeros highlighted.
• Trace the trading chain slowly: 8 becomes 7, zero becomes 10 then 9, zero becomes 10 then 9, 3 becomes 13.
• Use the colour coding on the slide — original digits in one colour, traded digits in another.
• After completing: compare answer to estimate. "5,546 versus my estimate of 5,500 — makes sense."

TEACHER NOTES:
This is the hardest variant of vertical subtraction: trading across consecutive zeros. The number 8,003 is deliberately chosen because it forces a chain trade through TWO zeros — the single most common error context in subtraction. Many students panic when they can't borrow from the adjacent column and don't know to "keep going left." The think-aloud models the complete chain trade and — critically — the renaming check: "7 thousands, 9 hundreds, 9 tens, 13 ones is still 8,003." This verification step prevents the misconception that trading "changes" the number. The estimation strategy is modelled again to reinforce it as a habit, not a one-off.

MISCONCEPTIONS:
• Misconception: Subtracting the smaller digit from the larger regardless of position (e.g., in the ones column, doing 7 - 3 = 4 instead of recognising that 3 - 7 requires trading).
  Why: Students see two digits and subtract the smaller from the larger automatically, ignoring which is the top number and which is the bottom.
  Impact: The answer will be wrong in every column where the top digit is smaller. This is the most common subtraction error.
  Quick correction: "The TOP number is what you START with. The BOTTOM number is what you TAKE AWAY. If the top is smaller than the bottom, you MUST trade. Always ask: is the top digit big enough?"

• Misconception: Forgetting to reduce the next column after trading.
  Why: Students borrow 1 from the next column but forget to subtract 1 from that column. They add 10 to the ones without removing 1 from the tens.
  Impact: The answer will be too large by 10 for each forgotten reduction. With chain trading across zeros, this compounds — they may forget to reduce at multiple points.
  Quick correction: "When you borrow, it's a TRADE — you get 10 in one column but you must GIVE UP 1 from the next column. Cross out the old digit and write the new one."

• Misconception: Trading across zeros — students get lost in the chain.
  Why: When the tens and hundreds are both 0, students don't know how to borrow from nothing. They may skip the problem or write 0 - 5 = 5 (wrong).
  Impact: Any subtraction from a number with internal zeros will be incorrect.
  Quick correction: "If the column you need to borrow from is 0, keep going left until you find a non-zero digit. Then trade back one column at a time. Every zero becomes 9 (except the last one, which becomes 10 minus what you trade away)."

WATCH FOR:
• Students who look lost during the chain trade — this is the hardest part. If many students look confused, pause and re-demonstrate on the board with a simpler example: 400 - 156.
• Students who say "you can't do 3 minus 7" — affirm: "Correct! In this column, you can't. That's your signal to TRADE."
• Readiness signal: students following the chain trade with visible understanding (nodding, tracing the path).

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU_SMB = `SAY:
• "Show Me Boards time. Here's your problem: 3,567 + 4,876."
• "Set it out vertically on your whiteboard. Solve it step by step."
• "You have 45 seconds. Start from the ones column. Show all your carrying."
• After 45 seconds: "Boards up — show me!"
• Scan boards. "Looking for 8,443. Let's check column by column."
• "Ones: 7 + 6 = 13. Write 3, carry 1. Tens: 6 + 7 = 13, plus 1 = 14. Write 4, carry 1. Hundreds: 5 + 8 = 13, plus 1 = 14. Write 4, carry 1. Thousands: 3 + 4 = 7, plus 1 = 8."
• "The answer is 8,443."

DO:
• Display the question slide. Students work on whiteboards for 45 seconds.
• Circulate quickly — look for alignment errors, missing carries, left-to-right processing.
• After time: "Boards up!" Scan for correct answer (8,443).
• Click to reveal the worked solution on the next slide.
• Address any common errors you observed during circulation.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "Set it out vertically and solve. When I say GO, hold up your board. Ready… GO!"
• Scan for: correct answer (8,443) with visible carrying digits on >=80% of boards.
PROCEED: If >=80% show correct answer with working, move to We Do.
PIVOT: Most likely error: answer of 7,433 (forgot to carry from the hundreds column) or 8,343 (carry error in tens). If many students show errors, model the problem step-by-step on the board: "Let's do this together. Ones: 7 + 6 = ?" Use cold calls for each column. Then re-check with a simpler problem: 256 + 378.

TEACHER NOTES:
This CFU tests whether students can independently apply the addition algorithm with regrouping after watching the I Do. The numbers are chosen to require regrouping in three consecutive columns (7+6=13, 6+7+1=14, 5+8+1=14) — mirroring the I Do example's difficulty. Show Me Boards is the ideal technique here because it gives whole-class data in seconds — the teacher can scan 25+ boards in one glance and identify whether the class is ready for We Do or needs reteaching. The 45-second time limit creates mild pressure that reveals whether students can execute the algorithm fluently or need to count on fingers.

WATCH FOR:
• Students who get 8,443 with no visible carrying — they may be calculating mentally, which is fine, but ask one student: "Where did you carry?" to check they understand the process.
• Students who set the problem out with misaligned columns — this is an SC1 issue. Prompt: "Are your ones under ones?"
• Students who get a 5-digit answer (like 18,443) — they may be concatenating rather than adding. This is a fundamental misunderstanding.
• Readiness signal: boards showing 8,443 with small carried digits visible.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO_ADD = `SAY:
• "Now a bigger number. Work with me: 24,536 + 18,789."
• "On your whiteboards, set this out vertically. Line up your place values carefully — we've got 5-digit numbers now."
• "Before you start calculating: estimate. 24,500 + 18,800 is about 43,300. Your answer should be near that."
• "You have 60 seconds. Start from the ones."
• After 60 seconds: "Boards up — show me!"
• "Let's check together. Ones: 6 + 9 = 15. Write 5, carry 1."
• "Tens: 3 + 8 = 11, plus 1 = 12. Write 2, carry 1."
• "Hundreds: 5 + 7 = 12, plus 1 = 13. Write 3, carry 1."
• "Thousands: 4 + 8 = 12, plus 1 = 13. Write 3, carry 1."
• "Ten-thousands: 2 + 1 = 3, plus 1 = 4."
• "Answer: 43,325. Check: my estimate was 43,300. Very close. Confirmed."

DO:
• Display the question slide. Students work on whiteboards for 60 seconds.
• Circulate — visit students who struggled in the CFU first.
• After boards up: click to reveal the worked solution.
• Walk through each column, pausing at each carry to confirm.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "Boards up! I'm looking for 43,325 with carries shown. Ready… show me!"
• Scan for: correct answer on >=80% of boards.
PROCEED: If >=80% correct, move to We Do Problem 2 (subtraction).
PIVOT: If students struggle with the 5-digit number, the issue is likely tracking carries across more columns. Model a shorter version first: "Let's try 2,453 + 1,878." Then scale back up. Emphasise: "The algorithm is the SAME regardless of how many digits. Start at the ones, carry when needed."

TEACHER NOTES:
This We Do scales up from the 4-digit I Do to a 5-digit problem. The pedagogical purpose is threefold: (1) test that students can generalise the algorithm to larger numbers, (2) require sustained concentration (carries in 4 consecutive columns), (3) reinforce the estimation-before-calculation habit. The numbers are chosen so that regrouping occurs in every column except the ten-thousands — this maximises the opportunity to practise carrying. The estimation check (43,325 vs 43,300) demonstrates that even with large numbers, estimation provides a useful reasonableness check.

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Provide these students with a place value grid on their whiteboard (TTh | Th | H | T | O) drawn in advance. They write each digit in its grid square before starting the algorithm. The grid enforces alignment — the most common error for struggling students.
• Extra Notes: Seat enabling students where you can check their grid setup before they start calculating.

EXTENDING PROMPT:
• Task: "After solving the addition, create your own 5-digit addition problem that requires carrying in EVERY column including the ten-thousands (producing a 6-digit answer). Solve it and verify with estimation."
• Extra Notes: Example: 87,654 + 23,456 = 111,110. This forces students to handle the case where the final column also requires carrying.

WATCH FOR:
• Students who misalign the 5-digit numbers (e.g., writing 18,789 under 24,536 starting from the left instead of aligning the ones) — redirect: "Always line up from the RIGHT. Ones under ones."
• Students who get the algorithm correct but forget to estimate — prompt: "What should the answer be ROUGHLY?"
• Students who produce a 4-digit answer — they likely missed the ten-thousands column. Check: "How many digits should a 5-digit plus 5-digit answer have?"
• Readiness signal: correct answer with visible carries, completed within 45 seconds.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO_SUB = `SAY:
• "Subtraction turn. This one has zeros — just like the I Do. Work through it on your whiteboards: 7,004 minus 3,258."
• "Before calculating: estimate. 7,000 minus 3,300 is about 3,700."
• "Start from the ones. Remember: if the top digit is smaller, you need to TRADE."
• "You have 60 seconds. Show your trading."
• After 60 seconds: "Boards up!"
• "Let's check. Ones: 4 minus 8. Can't do it — 4 is smaller than 8. I need to trade."
• "Tens column is 0. I can't borrow from 0. Hundreds is also 0. I go to the thousands."
• "Borrow 1 from the 7, making it 6. That gives me 10 hundreds. Borrow 1 from 10, leaving 9 hundreds. That gives me 10 tens. Borrow 1 from 10, leaving 9 tens. That gives me 14 ones."
• "Now: Ones: 14 - 8 = 6. Tens: 9 - 5 = 4. Hundreds: 9 - 2 = 7. Thousands: 6 - 3 = 3."
• "Answer: 3,746. Estimate was 3,700. Close. Confirmed."

DO:
• Display the question slide. Students work for 60 seconds on whiteboards.
• Circulate — prioritise students who looked confused during the I Do subtraction.
• After boards up: click to reveal the worked solution.
• Trace the trading chain on the revealed slide.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "Boards up — looking for 3,746 with trading shown. Show me!"
• Scan for: correct answer on >=80% of boards. Also scan for the trading annotations (crossed-out digits, new digits above).
PROCEED: If >=80% correct with visible trading, move to Hinge Question.
PIVOT: Most likely errors:
  - 4,254 (subtracted small from large in every column without trading — the classic "flip" error)
  - 3,756 or 3,846 (carry chain error — borrowed but forgot to reduce a zero)
  If many students show the flip error, re-model emphatically: "STOP. Which number did we START with? 7,004. Which are we TAKING AWAY? 3,258. The top number is what we have. The bottom number is what we remove. If the top is smaller, we MUST trade."
  If carry chain errors, model 7,004 with the trading chain step by step.

TEACHER NOTES:
This We Do deliberately parallels the I Do subtraction (8,003 - 2,457) by featuring trading across zeros in a slightly different configuration (7,004 vs 8,003). The pedagogical purpose is to test whether students can independently execute the chain-trading process they observed. The zero-trading problem is the highest-difficulty subtraction variant because it requires students to chain trades across multiple columns — each step depends on the previous one. Students who get this right have strong procedural understanding. Students who get it wrong provide diagnostic information about exactly where in the chain their understanding breaks down.

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Before tackling 7,004 - 3,258, have enabling students practise the trading chain on a simpler number first: "Rename 7,004 as ___ thousands, ___ hundreds, ___ tens, ___ ones without changing the total." Once they correctly rename it as 6 thousands, 9 hundreds, 9 tens, 14 ones, they proceed with the subtraction.
• Extra Notes: This separates the trading process from the subtraction, reducing cognitive load.

EXTENDING PROMPT:
• Task: "Create a subtraction problem where the top number has THREE consecutive zeros (e.g., _0,00_ - _,___). Solve it and explain the trading chain in words."
• Extra Notes: Example: 50,003 - 27,458. This extends the chain to three zeros and a 5-digit context.

WATCH FOR:
• The "flip" error (subtracting small from large regardless of position) — this is the #1 subtraction misconception. If you see it, address it immediately and publicly.
• Students who trade from the thousands but forget to continue the chain through the zeros — they may borrow 1 from 7 but then get stuck at the zeros.
• Students who get 3,746 but can't explain the trading — they may be following the algorithm mechanically. Ask: "What did the 7 become? Why?"
• Readiness signal: correct answer with crossed-out digits and new trading annotations visible.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `SAY:
• "Hinge question. This tells me if you're ready for independent practice."
• "Look at the four subtraction problems on the screen. Each one shows a completed vertical subtraction. Only ONE is correct. The other three have common mistakes."
• "On your whiteboards, write A, B, C, or D — whichever you think is correct."
• "You have 20 seconds. Check the working carefully."
• After 20 seconds: "Boards up — show me!"
• Reveal: "The answer is C. Let's see why the others are wrong."
• "A: They subtracted the smaller from the larger in the ones — 5 minus 2 instead of trading. Classic flip error."
• "B: They traded but forgot to reduce the hundreds column — borrowed from 6 but left it as 6 instead of changing to 5."
• "D: They made a subtraction fact error in the tens column — 12 minus 8 is 4, not 5."

DO:
• Display the question slide with four completed subtraction problems.
• Allow 20 seconds. Students write their choice on whiteboards.
• "Boards up!" Scan quickly.
• Click to reveal the correct answer and error explanations.
• For each incorrect option, name the specific error.

CFU CHECKPOINT:
Technique: Show Me Boards (Letter Choice)
Script:
• "Write A, B, C, or D on your board. Ready… show me!"
• Scan for: C on >=80% of boards.
PROCEED: If >=80% choose C — students can identify correct subtraction working. Release to You Do.
PIVOT: Most likely error patterns:
  - Students choosing A: They may not recognise the flip error because they make it themselves. Reteach: "Look at the ones column. 2 minus 5 — is the answer 3? NO. You can't subtract a bigger number from a smaller one without trading."
  - Students choosing B: They may not check the trading chain carefully. Point out: "Look at the hundreds. They borrowed from it but didn't reduce it."
  - Students choosing D: They may not check basic subtraction facts. Model: "Count: 12 - 8. Count back from 12: 11, 10, 9, 8, 7, 6, 5, 4. That's 4, not 5."
  Re-check with: "What is 503 - 267? Solve it on your boards — 30 seconds."

TEACHER NOTES:
The hinge question assesses students' ability to not just perform subtraction but critically evaluate subtraction working — a higher-order skill. Each distractor embodies a specific, named misconception: A = the flip error (subtracting small from large), B = forgetting to reduce after trading, D = basic subtraction fact error. The correct option C requires students to verify that every step is correct, including trading annotations. This diagnostic format reveals not just whether students CAN subtract but whether they can SPOT errors — a transferable self-checking skill. The hinge format (one question, whole-class data, immediate decision) is the most efficient CFU technique at this point in the lesson.

MISCONCEPTIONS:
• Misconception: Selecting A — not recognising the "flip" error.
  Why: Students who habitually subtract small from large won't see this as an error because it matches their own practice.
  Impact: These students will make the flip error consistently in their own work without self-correcting.
  Quick correction: "The rule is simple: TOP minus BOTTOM, always. If the top is smaller, you TRADE. You never flip them."

WATCH FOR:
• Students who choose B — they may understand trading conceptually but not track the column reduction carefully. These students need practice with the annotation system (crossing out and rewriting).
• Students who can't decide and keep changing their answer — they may not have a systematic checking strategy. Model: "Check one column at a time, left to right."
• Readiness signal: fast, confident choice of C with ability to explain why A, B, D are wrong.

[Maths: Monitor Progress — Hinge Question | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `SAY:
• "You're ready. Time for independent practice."
• Read from slide: "You have 6 problems — 3 addition with regrouping, 3 subtraction with trading. They get harder as you go."
• "Use your worksheet. Set each problem out vertically. Show ALL your working — carries for addition, trading annotations for subtraction."
• "ESTIMATE first for each problem. Write your estimate next to the problem before you start."
• "You have 10 minutes. If you finish early, check your work using the inverse operation: for addition, subtract one number from your answer. For subtraction, add the answer to the bottom number."
• "Work silently and independently. This is YOUR practice time."

DO:
• Distribute the Session 1 Worksheet.
• Set a visible timer for 10 minutes.
• Circulate — visit enabling students first (students who struggled with We Do), then extending students.
• Conference briefly with 2–3 students: "Talk me through your trading for this one."
• After 8 minutes: "Two minutes remaining. If you haven't started Problem 6, skip to it now — it's the hardest."

TEACHER NOTES:
The You Do provides 6 problems of graduated difficulty: Problems 1–3 are addition with increasing regrouping demand (single carry, double carry, triple carry), Problems 4–6 are subtraction with increasing trading complexity (simple trade, trade across one zero, trade across two zeros). This gradient ensures enabling students can experience success on Problems 1 and 4 while extending students are challenged by Problems 3 and 6. The instruction to estimate before calculating reinforces the metacognitive habit modelled in I Do. The inverse-operation check (for early finishers) introduces a self-verification strategy that doesn't require teacher input — students become independent self-assessors.

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Students who struggle should begin with Problems 1 and 4 only (the simplest of each type). Provide a place value grid template. If they complete these two correctly, move to Problems 2 and 5.
• Extra Notes: Seat enabling students where you can quickly check their column alignment before they start calculating. The place value grid is the most impactful scaffold — most errors trace back to misalignment.

EXTENDING PROMPT:
• Task: After completing all 6 problems, students take the Session 1 Extension (Palindromic Number Investigation). The PDF is self-contained with instructions, examples, and recording space. They explore what happens when you add a number to its reverse (e.g., 4,738 + 8,374) and investigate whether the process always produces a palindrome.
• Extra Notes: Distribute the Session 1 Extension to extending students when they finish the main task. This investigation requires addition fluency and introduces a fascinating pattern — some numbers reach a palindrome in one step, others take many steps, and some (like 196) may never reach one.

WATCH FOR:
• Students who skip the estimation step — prompt: "Where's your estimate? Write it FIRST."
• Students who set problems out horizontally instead of vertically — redirect immediately. This lesson is specifically about the vertical algorithm.
• Students who get stuck on subtraction trading — whisper: "Is the top digit big enough? If not, where will you trade from?"
• Students who finish very quickly — check their work for accuracy before giving the Session 1 Extension. Speed without accuracy is not the goal.
• Readiness signal: students working silently through problems with visible estimates and working shown.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `SAY:
• "Pens down on the worksheet. Time for your exit ticket — three questions."
• "Question 1 is addition. Question 2 is subtraction. Question 3 is error analysis — you need to spot a mistake."
• "Work silently and independently. No looking at your worksheet or your neighbour."
• "You have 4 minutes."

DO:
• Display the exit ticket slide. Students write answers in their maths books or on paper.
• Set a timer for 4 minutes. Circulate silently — observe but don't help.
• Collect responses or note answers as students hold up books.

TEACHER NOTES:
The exit ticket assesses all three SCs. Q1 (addition: 6,485 + 3,847) targets SC1 and SC2 — students must align correctly and regroup. Q2 (subtraction: 9,002 - 4,536) targets SC1 and SC3 — requires trading across zeros. Q3 (error analysis: spot the mistake in a worked subtraction) targets metacognitive awareness — can students identify the flip error or a trading error in someone else's work? Q3 is the highest-level question because it requires understanding the algorithm well enough to evaluate it, not just execute it. Sort responses into three groups after class: (1) Q1 wrong — need reteaching of addition regrouping, (2) Q1 right but Q2 wrong — addition is secure but subtraction trading needs work, (3) Q1 and Q2 right but Q3 wrong — can execute but can't yet evaluate.

WATCH FOR:
• Students who rush Q1 and Q2 but spend all their time on Q3 — reassure: "Q3 is meant to be tricky. If you're stuck, re-do the subtraction yourself and compare."
• Students who answer Q2 as 5,534 or similar — the flip error again. Track these students for tomorrow's enabling group.
• Students who can't identify the error in Q3 — they may make the same error themselves. This is diagnostic gold.
• Readiness signal: students finishing Q1 and Q2 within 2 minutes, spending the remaining time on Q3.

[Maths: Summarise — Exit Ticket (Stage 5) | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `SAY:
• "Here are the printable resources for today's lesson. If you're a teacher using this deck, click any link to open the PDF."
• "Session 1 Worksheet is the practice sheet with 6 problems. Session 1 Answer Key is for teacher reference. Session 1 Extension is the palindromic number investigation for extending students."

DO:
• Display the slide briefly. Teachers can click hyperlinks to open PDFs.
• This slide is primarily for teacher preparation — students don't need to see it during the lesson.

TEACHER NOTES:
All PDFs are in the same folder as this PPTX file. Hyperlinks are relative — they work when the PPTX is opened from the lesson folder. Print Session 1 Worksheet before the lesson (one per student). Print Session 1 Extension for extending students only (typically 3–5 copies). Session 1 Answer Key is for teacher reference — do not distribute to students during the lesson.

WATCH FOR:
• N/A — this is a teacher-facing slide.

[Maths: Planning — Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `SAY:
• "Let's look back at our success criteria."
• Read from slide: "SC1: I can set out addition and subtraction problems vertically with digits aligned in the correct place value columns."
• "Thumbs up, sideways, or down for SC1." Pause and scan. "Good — most thumbs up."
• Read: "SC2: I can apply the vertical addition algorithm including regrouping across columns."
• "Thumbs for SC2." Pause and scan.
• Read: "SC3: I can apply the vertical subtraction algorithm including trading when a top digit is smaller than the bottom digit."
• "Thumbs for SC3." Pause and scan. "Some sideways — that's honest. Subtraction with zeros is the hardest part."
• "Turn to your partner: What is the ONE mistake you need to watch out for when doing vertical subtraction? 30 seconds."
• "Next session: multiplication and division. Well done today — you've reviewed two of the four processes."

DO:
• Display the closing slide with SCs listed. Read each SC aloud.
• Run thumbs up/sideways/down for each SC in turn. Scan and mentally note students who are down on SC2 or SC3.
• Allow 30 seconds for the Turn & Talk. Listen to 2–3 pairs.
• Close with a brief acknowledgement of effort.

TEACHER NOTES:
The closing slide reviews all three SCs. Students who self-assess as "thumbs down" on SC2 should be noted — if they can't yet regroup confidently, they may also struggle with multiplication (which involves repeated regrouping) later in the week. Students down on SC3 are expected — subtraction with trading, especially across zeros, is the most difficult algorithm in this lesson. The Turn & Talk about "one mistake to watch out for" forces metacognitive reflection on the error types discussed during the lesson. Listen for students who name specific errors (the flip error, forgetting to reduce after trading, chain trading across zeros) — these students have internalised the misconception framework.

WATCH FOR:
• Students who show thumbs-down on SC1 (alignment) — this is a critical foundation gap. They need a place value grid template for all future vertical algorithm work.
• Students who show thumbs-up on all three but got exit ticket questions wrong — flag for closer monitoring next session. Self-assessment may not match performance.
• The Turn & Talk: listen for students who name "subtracting the smaller from the bigger" — this shows they've identified the key misconception.

[Maths: Summarise — Closing | VTLM 2.0: Monitor Progress & Feedback]`;

// ── Helper: draw a vertical algorithm on a slide ─────────────────────────────

function drawVerticalAlgorithm(slide, x, y, opts) {
  const {
    top,           // array of digit strings, e.g. ["4","7","3","8"]
    bottom,        // array of digit strings
    answer,        // array of digit strings (optional — omit for question-only)
    carries,       // array of carry strings (optional, same length as top, "" for no carry)
    operation,     // "+" or "-"
    trades,        // for subtraction: array of { original, traded } objects (optional)
    colW = 0.42,
    rowH = 0.5,
    fontSize = 22,
    highlightCol,  // column index to highlight (optional)
  } = opts;

  const numCols = Math.max(top.length, bottom.length);
  const totalW = (numCols + 1) * colW; // +1 for the operation column

  // Carry row (small digits above)
  if (carries) {
    carries.forEach((c, i) => {
      if (c) {
        slide.addText(c, {
          x: x + (i + 1) * colW, y: y - 0.28, w: colW, h: 0.28,
          fontSize: 11, fontFace: FONT_B, color: C.ALERT,
          align: "center", valign: "bottom", margin: 0, bold: true,
        });
      }
    });
  }

  // Trade annotations (for subtraction — new digits above original)
  if (trades) {
    trades.forEach((t, i) => {
      if (t && t.traded) {
        // Crossed-out original digit shown with strikethrough effect
        slide.addText(t.traded, {
          x: x + (i + 1) * colW, y: y - 0.28, w: colW, h: 0.28,
          fontSize: 11, fontFace: FONT_B, color: C.SECONDARY,
          align: "center", valign: "bottom", margin: 0, bold: true,
        });
      }
    });
  }

  // Top number row
  top.forEach((d, i) => {
    const cx = x + (i + 1) * colW;
    const isHighlight = highlightCol !== undefined && i === highlightCol;
    if (isHighlight) {
      slide.addShape("rect", {
        x: cx, y, w: colW, h: rowH,
        fill: { color: C.ACCENT, transparency: 75 },
      });
    }
    const displayDigit = (trades && trades[i] && trades[i].original) ? trades[i].original : d;
    slide.addText(displayDigit, {
      x: cx, y, w: colW, h: rowH,
      fontSize, fontFace: FONT_H, color: C.CHARCOAL,
      align: "center", valign: "middle", margin: 0, bold: true,
    });
  });

  // Operation sign
  slide.addText(operation, {
    x, y: y + rowH, w: colW, h: rowH,
    fontSize, fontFace: FONT_H, color: C.PRIMARY,
    align: "center", valign: "middle", margin: 0, bold: true,
  });

  // Bottom number row
  bottom.forEach((d, i) => {
    const cx = x + (i + 1) * colW;
    const isHighlight = highlightCol !== undefined && i === highlightCol;
    if (isHighlight) {
      slide.addShape("rect", {
        x: cx, y: y + rowH, w: colW, h: rowH,
        fill: { color: C.ACCENT, transparency: 75 },
      });
    }
    slide.addText(d, {
      x: cx, y: y + rowH, w: colW, h: rowH,
      fontSize, fontFace: FONT_H, color: C.CHARCOAL,
      align: "center", valign: "middle", margin: 0, bold: true,
    });
  });

  // Line under the bottom row
  slide.addShape("rect", {
    x, y: y + 2 * rowH, w: totalW, h: 0.03,
    fill: { color: C.CHARCOAL },
  });

  // Answer row (if provided)
  if (answer) {
    answer.forEach((d, i) => {
      const cx = x + (i + 1) * colW;
      slide.addText(d, {
        x: cx, y: y + 2 * rowH + 0.06, w: colW, h: rowH,
        fontSize, fontFace: FONT_H, color: C.PRIMARY,
        align: "center", valign: "middle", margin: 0, bold: true,
      });
    });
  }

  // Place value column headers (small, above everything)
  const pvHeaders = ["TTh", "Th", "H", "T", "O"];
  const offset = pvHeaders.length - numCols;
  for (let i = 0; i < numCols; i++) {
    const label = pvHeaders[offset + i] || "";
    slide.addText(label, {
      x: x + (i + 1) * colW, y: y - 0.52, w: colW, h: 0.22,
      fontSize: 8, fontFace: FONT_B, color: C.MUTED,
      align: "center", valign: "middle", margin: 0,
    });
  }

  return y + 2 * rowH + 0.06 + (answer ? rowH : 0);
}

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "Vertical Addition & Subtraction — Session 1";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres,
    "Vertical Addition &\nSubtraction",
    "Four Processes Review — Session 1",
    "Session 1 of 4 | Year 5/6 Maths",
    NOTES_TITLE);

  // ── SLIDE 2: Daily Review 1 — Divisibility Tests (Stage 1) ─────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Daily Review");
    addTitle(s, "Divisibility Tests for Larger Numbers", { color: C.ACCENT });

    // I CAN statement
    addCard(s, 0.5, CONTENT_TOP - 0.05, 9, 0.65, { strip: C.ACCENT });
    s.addText("I can use divisibility tests to determine if larger numbers are multiples of one-digit numbers", {
      x: 0.7, y: CONTENT_TOP, w: 8.6, h: 0.5,
      fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0, valign: "middle",
    });

    // Worked example card (left)
    addCard(s, 0.5, CONTENT_TOP + 0.75, 4.5, 2.6, { strip: C.PRIMARY });
    s.addText("Worked Example: Is 89,472 divisible by 3?", {
      x: 0.7, y: CONTENT_TOP + 0.82, w: 4.1, h: 0.3,
      fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });

    // Step-by-step
    const steps = [
      { label: "Step 1:", text: "Add the digits: 8 + 9 + 4 + 7 + 2 = 30" },
      { label: "Step 2:", text: "Is 30 divisible by 3?" },
      { label: "Step 3:", text: "30 / 3 = 10. YES, whole number." },
      { label: "Result:", text: "89,472 IS a multiple of 3" },
    ];
    const stepColors = [C.CHARCOAL, C.CHARCOAL, C.CHARCOAL, C.SUCCESS];
    steps.forEach((step, i) => {
      s.addText([
        { text: step.label + " ", options: { bold: true, fontSize: 11, color: C.PRIMARY } },
        { text: step.text, options: { fontSize: 11, color: stepColors[i], bold: i === 3 } },
      ], {
        x: 0.7, y: CONTENT_TOP + 1.2 + i * 0.42, w: 4.1, h: 0.35,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Practice problems (right)
    addCard(s, 5.3, CONTENT_TOP + 0.75, 4.2, 2.6, { strip: C.SECONDARY });
    s.addText("Your Turn — Test These Numbers", {
      x: 5.5, y: CONTENT_TOP + 0.82, w: 3.8, h: 0.3,
      fontSize: 12, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });

    const problems = [
      { num: "1.", text: "Is 7,245 divisible by 3?" },
      { num: "2.", text: "Is 45,831 divisible by 3?" },
      { num: "3.", text: "Is 12,346 divisible by 3?" },
    ];
    problems.forEach((p, i) => {
      s.addText([
        { text: p.num + " ", options: { bold: true, fontSize: 12, color: C.SECONDARY } },
        { text: p.text, options: { fontSize: 12, color: C.CHARCOAL } },
      ], {
        x: 5.5, y: CONTENT_TOP + 1.25 + i * 0.5, w: 3.8, h: 0.4,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Tip badge
    addTextOnShape(s, "Digit Sum Rule: Add all digits. If the sum is divisible by 3, the number is too!", {
      x: 5.5, y: CONTENT_TOP + 2.8, w: 3.8, h: 0.4, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, {
      fontSize: 9, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_DR1);
  })();

  // ── SLIDE 3: Daily Review 2 — Finding Unknowns (Stage 1) ──────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Daily Review");
    addTitle(s, "Finding Unknowns Using Multiplication and Division", { color: C.ACCENT, fontSize: 20 });

    // I CAN statement
    addCard(s, 0.5, CONTENT_TOP - 0.05, 9, 0.55, { strip: C.ACCENT });
    s.addText("I can find the value of unknown numbers in numerical equations using multiplication and division", {
      x: 0.7, y: CONTENT_TOP, w: 8.6, h: 0.45,
      fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0, valign: "middle",
    });

    // Problem grid — 6 missing number equations in 2 columns x 3 rows
    const equations = [
      { text: "___ x 7 = 63", hint: "Think: 63 / 7 = ?" },
      { text: "96 / ___ = 12", hint: "Think: 96 / 12 = ?" },
      { text: "8 x ___ = 104", hint: "Think: 104 / 8 = ?" },
      { text: "___ / 9 = 11", hint: "Think: 9 x 11 = ?" },
      { text: "12 x ___ = 144", hint: "Think: 144 / 12 = ?" },
      { text: "___ / 7 = 13", hint: "Think: 7 x 13 = ?" },
    ];

    equations.forEach((eq, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const cx = 0.5 + col * 4.7;
      const cy = CONTENT_TOP + 0.7 + row * 0.88;
      const cw = 4.4;
      const ch = 0.72;

      addCard(s, cx, cy, cw, ch, { strip: C.PRIMARY });
      s.addText([
        { text: (i + 1) + ".  " + eq.text, options: { bold: true, fontSize: 16, color: C.CHARCOAL, breakLine: true } },
        { text: eq.hint, options: { fontSize: 10, color: C.MUTED, italic: true } },
      ], {
        x: cx + 0.15, y: cy + 0.05, w: cw - 0.3, h: ch - 0.1,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Timer instruction
    addTextOnShape(s, "90 seconds — whiteboards!", {
      x: 3.5, y: SAFE_BOTTOM - 0.55, w: 3, h: 0.42, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, {
      fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_DR2);
  })();

  // ── SLIDE 4: Fluency Sprint (Stage 1) ──────────────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Addition & Subtraction Sprint — 60 Seconds", { color: C.ACCENT });

    // Grid of 16 addition/subtraction problems (4 cols x 4 rows)
    const problems = [
      "47 + 8 =",    "63 - 7 =",    "86 + 9 =",    "52 - 8 =",
      "198 + 5 =",   "304 - 8 =",   "75 + 17 =",   "143 - 6 =",
      "456 + 7 =",   "500 - 3 =",   "29 + 34 =",   "81 - 15 =",
      "167 + 8 =",   "200 - 6 =",   "88 + 25 =",   "1000 - 7 =",
    ];
    const gridCols = 4, gridRows = 4;
    const cellW = 2.0, cellH = 0.58;
    const gridX = 0.6, gridY = CONTENT_TOP + 0.05;

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const idx = r * gridCols + c;
        const px = gridX + c * (cellW + 0.2);
        const py = gridY + r * (cellH + 0.12);
        addCard(s, px, py, cellW, cellH, { strip: C.SECONDARY });
        s.addText((idx + 1) + ".  " + problems[idx], {
          x: px + 0.12, y: py, w: cellW - 0.2, h: cellH,
          fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
          valign: "middle", margin: 0, bold: true,
        });
      }
    }

    // Timer instruction
    addTextOnShape(s, "60 seconds — GO!", {
      x: 3.5, y: SAFE_BOTTOM - 0.5, w: 3, h: 0.42, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, {
      fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_FLUENCY);
  })();

  // ── SLIDE 5: LI / SC ──────────────────────────────────────────────────
  liSlide(pres,
    ["We are learning to use vertical addition and subtraction algorithms accurately so we can solve multi-digit problems with confidence."],
    [
      "I can set out addition and subtraction problems vertically with digits aligned in the correct place value columns.",
      "I can apply the vertical addition algorithm including regrouping (carrying) across columns.",
      "I can apply the vertical subtraction algorithm including trading (borrowing) when a top digit is smaller than the bottom digit.",
    ],
    NOTES_LISC, FOOTER);

  // ── SLIDE 6: I Do — Worked Example 1: Vertical Addition 4,738 + 2,695 (Stage 2)
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Vertical Addition with Regrouping", { fontSize: 21, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "4,738 + 2,695 = ?", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 3.8, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 16, fontFace: FONT_H, color: getContrastColor(C.BG_DARK), bold: true,
    });

    // Estimate badge
    addTextOnShape(s, "Estimate: 4,700 + 2,700 = ~7,400", {
      x: 4.5, y: CONTENT_TOP - 0.05, w: 3.5, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, {
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    // Vertical algorithm visual (left side)
    addCard(s, 0.5, CONTENT_TOP + 0.55, 4.5, 2.55, { strip: C.PRIMARY });
    s.addText("Step-by-Step", {
      x: 0.7, y: CONTENT_TOP + 0.62, w: 4.1, h: 0.25,
      fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });

    drawVerticalAlgorithm(s, 1.2, CONTENT_TOP + 1.4, {
      top: ["4", "7", "3", "8"],
      bottom: ["2", "6", "9", "5"],
      answer: ["7", "4", "3", "3"],
      carries: ["", "1", "1", "1"],
      operation: "+",
      fontSize: 20,
      rowH: 0.4,
    });

    // Think-aloud steps (right side)
    addCard(s, 5.2, CONTENT_TOP + 0.55, 4.3, 2.55, { strip: C.ACCENT });
    s.addText("Think-Aloud", {
      x: 5.4, y: CONTENT_TOP + 0.62, w: 3.9, h: 0.25,
      fontSize: 12, fontFace: FONT_H, color: C.ACCENT, bold: true, margin: 0,
    });

    const thinkSteps = [
      { col: "Ones:", text: "8 + 5 = 13 -> write 3, carry 1", color: C.CHARCOAL },
      { col: "Tens:", text: "3 + 9 + 1 = 13 -> write 3, carry 1", color: C.CHARCOAL },
      { col: "Hundreds:", text: "7 + 6 + 1 = 14 -> write 4, carry 1", color: C.CHARCOAL },
      { col: "Thousands:", text: "4 + 2 + 1 = 7 -> write 7", color: C.CHARCOAL },
    ];
    thinkSteps.forEach((step, i) => {
      s.addText([
        { text: step.col + " ", options: { bold: true, fontSize: 11, color: C.PRIMARY } },
        { text: step.text, options: { fontSize: 11, color: step.color } },
      ], {
        x: 5.4, y: CONTENT_TOP + 1.0 + i * 0.42, w: 3.9, h: 0.36,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Key reminder
    addTextOnShape(s, "Always start from the RIGHT (ones column). Carry when >= 10.", {
      x: 5.4, y: CONTENT_TOP + 2.7, w: 3.9, h: 0.32, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, {
      fontSize: 9, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    // Confirmation bar
    addTextOnShape(s, "Answer: 7,433  |  Estimate: ~7,400  |  Confirmed!", {
      x: 0.5, y: SAFE_BOTTOM - 0.55, w: 9, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, {
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_IDO_ADD);
  })();

  // ── SLIDE 7: I Do — Worked Example 2: Vertical Subtraction 8,003 - 2,457 (Stage 2)
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Vertical Subtraction with Trading Across Zeros", { fontSize: 19, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "8,003 - 2,457 = ?", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 3.5, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 16, fontFace: FONT_H, color: getContrastColor(C.BG_DARK), bold: true,
    });

    // Estimate badge
    addTextOnShape(s, "Estimate: 8,000 - 2,500 = ~5,500", {
      x: 4.2, y: CONTENT_TOP - 0.05, w: 3.5, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, {
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    // Vertical algorithm visual (left side) — showing the trading chain
    addCard(s, 0.5, CONTENT_TOP + 0.55, 4.5, 2.55, { strip: C.PRIMARY });
    s.addText("Trading Chain Across Zeros", {
      x: 0.7, y: CONTENT_TOP + 0.62, w: 4.1, h: 0.25,
      fontSize: 11, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });

    drawVerticalAlgorithm(s, 1.2, CONTENT_TOP + 1.4, {
      top: ["8", "0", "0", "3"],
      bottom: ["2", "4", "5", "7"],
      answer: ["5", "5", "4", "6"],
      trades: [
        { original: "8", traded: "7" },
        { original: "0", traded: "9" },
        { original: "0", traded: "9" },
        { original: "3", traded: "13" },
      ],
      operation: "-",
      fontSize: 20,
      rowH: 0.4,
    });

    // Think-aloud steps (right side)
    addCard(s, 5.2, CONTENT_TOP + 0.55, 4.3, 2.55, { strip: C.ALERT });
    s.addText("Think-Aloud: The Trading Chain", {
      x: 5.4, y: CONTENT_TOP + 0.62, w: 3.9, h: 0.25,
      fontSize: 11, fontFace: FONT_H, color: C.ALERT, bold: true, margin: 0,
    });

    const tradeSteps = [
      { text: "Ones: 3 - 7? Can't! Need to trade.", color: C.ALERT },
      { text: "Tens: 0 — can't borrow from zero!", color: C.ALERT },
      { text: "Hundreds: 0 — also zero! Go to Th.", color: C.ALERT },
      { text: "Th: Borrow 1 from 8 -> 7 Th", color: C.CHARCOAL },
      { text: "Chain: 10H -> 9H + 10T -> 9T + 13O", color: C.CHARCOAL },
      { text: "Now: 13-7=6, 9-5=4, 9-4=5, 7-2=5", color: C.SUCCESS },
    ];
    tradeSteps.forEach((step, i) => {
      s.addText(step.text, {
        x: 5.4, y: CONTENT_TOP + 1.0 + i * 0.3, w: 3.9, h: 0.26,
        fontSize: 10, fontFace: FONT_B, color: step.color, margin: 0, valign: "middle",
        bold: i >= 4,
      });
    });

    // Renamed number check
    addTextOnShape(s, "Check: 7 Th + 9 H + 9 T + 13 O = 8,003", {
      x: 5.4, y: CONTENT_TOP + 2.7, w: 3.9, h: 0.28, rectRadius: 0.06,
      fill: { color: C.SECONDARY },
    }, {
      fontSize: 9, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    // Confirmation bar
    addTextOnShape(s, "Answer: 5,546  |  Estimate: ~5,500  |  Confirmed!", {
      x: 0.5, y: SAFE_BOTTOM - 0.55, w: 9, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, {
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_IDO_SUB);
  })();

  // ── SLIDES 8–9: CFU — Show Me Boards: 3,567 + 4,876 (withReveal) ──────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "Show Me Boards", { color: C.ALERT, w: 2.4 });
      addTitle(s, "3,567 + 4,876 = ?", { color: C.ALERT, fontSize: 28 });

      // Large number display
      addCard(s, 0.5, CONTENT_TOP + 0.1, 9, 1.5, { strip: C.ALERT });
      s.addText([
        { text: "Set it out vertically on your whiteboard.", options: { breakLine: true, fontSize: 16, color: C.CHARCOAL, bold: true } },
        { text: "Show ALL your carrying. Start from the ones.", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL } },
        { text: "You have 45 seconds.", options: { fontSize: 14, color: C.ALERT, bold: true } },
      ], {
        x: 0.75, y: CONTENT_TOP + 0.2, w: 8.5, h: 1.3,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });

      // Visual prompt — numbers large and centred
      addTextOnShape(s, "3,567  +  4,876", {
        x: 2, y: CONTENT_TOP + 2.0, w: 6, h: 1.2, rectRadius: 0.12,
        fill: { color: C.PRIMARY },
      }, {
        fontSize: 42, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_CFU_SMB);
      return s;
    },
    (slide) => {
      // Reveal: worked solution
      addCard(slide, 0.5, CONTENT_TOP + 1.65, 9, 2.0, { strip: C.SUCCESS });
      slide.addText("Solution", {
        x: 0.7, y: CONTENT_TOP + 1.72, w: 3, h: 0.22,
        fontSize: 12, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      drawVerticalAlgorithm(slide, 1.0, CONTENT_TOP + 2.1, {
        top: ["3", "5", "6", "7"],
        bottom: ["4", "8", "7", "6"],
        answer: ["8", "4", "4", "3"],
        carries: ["", "1", "1", "1"],
        operation: "+",
        fontSize: 15,
        colW: 0.36,
        rowH: 0.36,
      });

      // Column-by-column explanation (right of algorithm)
      const explanations = [
        "O: 7 + 6 = 13 -> 3, carry 1",
        "T: 6 + 7 + 1 = 14 -> 4, carry 1",
        "H: 5 + 8 + 1 = 14 -> 4, carry 1",
        "Th: 3 + 4 + 1 = 8",
      ];
      explanations.forEach((exp, i) => {
        slide.addText(exp, {
          x: 5.0, y: CONTENT_TOP + 1.95 + i * 0.32, w: 4.2, h: 0.28,
          fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
        });
      });

      addTextOnShape(slide, "Answer: 8,443", {
        x: 5.0, y: CONTENT_TOP + 3.22, w: 2.5, h: 0.35, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── SLIDES 10–11: We Do — Problem Pair 1: 24,536 + 18,789 (withReveal) ─
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Vertical Addition: 24,536 + 18,789", { fontSize: 20, color: C.SECONDARY });

      // Problem prompt
      addTextOnShape(s, "Set it out vertically. Estimate first!", {
        x: 0.5, y: CONTENT_TOP - 0.05, w: 4.5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_DARK },
      }, {
        fontSize: 14, fontFace: FONT_H, color: getContrastColor(C.BG_DARK), bold: true,
      });

      // Instructions card (left)
      addCard(s, 0.5, CONTENT_TOP + 0.55, 4.5, 2.8, { strip: C.SECONDARY });
      s.addText([
        { text: "On your whiteboards:", options: { bold: true, breakLine: true, fontSize: 14, color: C.SECONDARY } },
        { text: "1. Write your estimate", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "2. Set out vertically — align place values", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "3. Add right to left — carry when >= 10", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "4. Check answer against estimate", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "60 seconds — then boards up!", options: { fontSize: 12, color: C.ALERT, bold: true } },
      ], {
        x: 0.7, y: CONTENT_TOP + 0.7, w: 4.1, h: 2.4,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Large number display (right side)
      addTextOnShape(s, "24,536\n+ 18,789", {
        x: 5.5, y: CONTENT_TOP + 0.8, w: 4, h: 2.2, rectRadius: 0.15,
        fill: { color: C.PRIMARY },
      }, {
        fontSize: 36, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO_ADD);
      return s;
    },
    (slide) => {
      // Reveal: worked solution
      addCard(slide, 5.2, CONTENT_TOP + 0.1, 4.3, 3.35, { strip: C.SUCCESS });
      slide.addText("Solution", {
        x: 5.4, y: CONTENT_TOP + 0.18, w: 3.9, h: 0.25,
        fontSize: 13, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      const algBottom = drawVerticalAlgorithm(slide, 5.6, CONTENT_TOP + 0.75, {
        top: ["2", "4", "5", "3", "6"],
        bottom: ["1", "8", "7", "8", "9"],
        answer: ["4", "3", "3", "2", "5"],
        carries: ["", "1", "1", "1", "1"],
        operation: "+",
        fontSize: 15,
        colW: 0.34,
        rowH: 0.38,
      });

      // Column explanations — compact single text box
      slide.addText([
        { text: "O: 6+9=15 -> 5, carry 1", options: { breakLine: true } },
        { text: "T: 3+8+1=12 -> 2, carry 1", options: { breakLine: true } },
        { text: "H: 5+7+1=13 -> 3, carry 1", options: { breakLine: true } },
        { text: "Th: 4+8+1=13 -> 3, carry 1", options: { breakLine: true } },
        { text: "TTh: 2+1+1=4", options: {} },
      ], {
        x: 5.4, y: algBottom + 0.05, w: 3.9, h: 0.7,
        fontSize: 7.5, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
        paraSpaceAfter: 2,
      });

      addTextOnShape(slide, "43,325  |  Est: ~43,300", {
        x: 5.4, y: CONTENT_TOP + 2.95, w: 3.8, h: 0.38, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── SLIDES 12–13: We Do — Problem Pair 2: 7,004 - 3,258 (withReveal) ──
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Vertical Subtraction: 7,004 - 3,258", { fontSize: 20, color: C.SECONDARY });

      // Problem prompt
      addTextOnShape(s, "This one has zeros! Remember the trading chain.", {
        x: 0.5, y: CONTENT_TOP - 0.05, w: 5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_DARK },
      }, {
        fontSize: 13, fontFace: FONT_H, color: getContrastColor(C.BG_DARK), bold: true,
      });

      // Instructions card (left)
      addCard(s, 0.5, CONTENT_TOP + 0.55, 4.5, 2.8, { strip: C.SECONDARY });
      s.addText([
        { text: "On your whiteboards:", options: { bold: true, breakLine: true, fontSize: 14, color: C.SECONDARY } },
        { text: "1. Write your estimate", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "2. Set out vertically", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "3. Start from the ones — TRADE if needed", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "4. If a column is 0, go LEFT until non-zero", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "5. Show ALL your trading annotations", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "60 seconds — show your trading!", options: { fontSize: 12, color: C.ALERT, bold: true } },
      ], {
        x: 0.7, y: CONTENT_TOP + 0.65, w: 4.1, h: 2.5,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Large number display (right side)
      addTextOnShape(s, "7,004\n-  3,258", {
        x: 5.5, y: CONTENT_TOP + 0.8, w: 4, h: 2.2, rectRadius: 0.15,
        fill: { color: C.PRIMARY },
      }, {
        fontSize: 36, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO_SUB);
      return s;
    },
    (slide) => {
      // Reveal: worked solution
      addCard(slide, 5.2, CONTENT_TOP + 0.1, 4.3, 3.35, { strip: C.SUCCESS });
      slide.addText("Solution", {
        x: 5.4, y: CONTENT_TOP + 0.18, w: 3.9, h: 0.25,
        fontSize: 13, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      const algBottom = drawVerticalAlgorithm(slide, 5.7, CONTENT_TOP + 0.75, {
        top: ["7", "0", "0", "4"],
        bottom: ["3", "2", "5", "8"],
        answer: ["3", "7", "4", "6"],
        trades: [
          { original: "7", traded: "6" },
          { original: "0", traded: "9" },
          { original: "0", traded: "9" },
          { original: "4", traded: "14" },
        ],
        operation: "-",
        fontSize: 16,
        colW: 0.38,
        rowH: 0.38,
      });

      // Trading chain explanation — compact single text box
      slide.addText([
        { text: "Borrow 1 from 7 Th -> 6 Th", options: { breakLine: true } },
        { text: "10 H -> 9 H (lend 1 to T)", options: { breakLine: true } },
        { text: "10 T -> 9 T (lend 1 to O)", options: { breakLine: true } },
        { text: "4 O + 10 = 14 O", options: { breakLine: true } },
        { text: "14-8=6, 9-5=4, 9-2=7, 6-3=3", options: { bold: true, color: C.SUCCESS } },
      ], {
        x: 5.4, y: algBottom + 0.05, w: 3.9, h: 0.7,
        fontSize: 7.5, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
        paraSpaceAfter: 2,
      });

      addTextOnShape(slide, "3,746  |  Est: ~3,700", {
        x: 5.4, y: CONTENT_TOP + 2.95, w: 3.8, h: 0.38, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── SLIDES 14–15: Hinge Question — Spot the Correct Subtraction (withReveal)
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "Hinge Question", { color: C.ALERT, w: 2.2 });
      addTitle(s, "Which subtraction is correct?", { color: C.ALERT });

      // Subtitle instruction
      s.addText("Each shows 6,302 - 2,875. Only ONE has correct working. Write A, B, C, or D on your board.", {
        x: 0.5, y: CONTENT_TOP - 0.1, w: 9, h: 0.35,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });

      // Four option cards with "completed" subtraction problems
      // A: flip error — ones: 5-2=3 instead of trading (answer: 4,573 — wrong)
      // B: forgot to reduce hundreds after trading (answer: 3,527 — wrong)
      // C: CORRECT (answer: 3,427)
      // D: subtraction fact error in tens (12-7=6 instead of 5, answer: 3,437 — wrong)

      const optionData = [
        {
          letter: "A", color: C.PRIMARY,
          top: "6302", bottom: "2875", answer: "4573",
          detail: "Ones: 5-2=3",
        },
        {
          letter: "B", color: C.SECONDARY,
          top: "6302", bottom: "2875", answer: "3527",
          detail: "H not reduced",
        },
        {
          letter: "C", color: C.ACCENT,
          top: "6302", bottom: "2875", answer: "3427",
          detail: "Full trading shown",
        },
        {
          letter: "D", color: C.SUCCESS,
          top: "6302", bottom: "2875", answer: "3437",
          detail: "T: 12-7=6?",
        },
      ];

      optionData.forEach((opt, i) => {
        const ox = 0.3 + i * 2.4;
        const oy = CONTENT_TOP + 0.35;
        const ow = 2.15;
        const oh = 2.8;

        addCard(s, ox, oy, ow, oh, { strip: opt.color });

        // Letter badge
        addTextOnShape(s, opt.letter, {
          x: ox + 0.1, y: oy + 0.08, w: 0.4, h: 0.4, rectRadius: 0.2,
          fill: { color: opt.color },
        }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

        // Show the subtraction as text
        const topDigits = opt.top.split("");
        const botDigits = opt.bottom.split("");
        const ansDigits = opt.answer.split("");

        // Mini vertical algorithm
        s.addText(topDigits.join("  "), {
          x: ox + 0.15, y: oy + 0.6, w: ow - 0.3, h: 0.4,
          fontSize: 18, fontFace: FONT_H, color: C.CHARCOAL,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
        s.addText("-  " + botDigits.join("  "), {
          x: ox + 0.15, y: oy + 1.0, w: ow - 0.3, h: 0.4,
          fontSize: 18, fontFace: FONT_H, color: C.CHARCOAL,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
        // Line
        s.addShape("rect", {
          x: ox + 0.2, y: oy + 1.4, w: ow - 0.4, h: 0.03,
          fill: { color: C.CHARCOAL },
        });
        // Answer
        s.addText(ansDigits.join("  "), {
          x: ox + 0.15, y: oy + 1.45, w: ow - 0.3, h: 0.4,
          fontSize: 18, fontFace: FONT_H, color: opt.color,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
        // Detail label
        s.addText(opt.detail, {
          x: ox + 0.1, y: oy + 2.0, w: ow - 0.2, h: 0.4,
          fontSize: 9, fontFace: FONT_B, color: C.MUTED,
          align: "center", valign: "middle", margin: 0, italic: true,
        });
      });

      // Timer
      addTextOnShape(s, "20 seconds — write A, B, C, or D", {
        x: 2.5, y: SAFE_BOTTOM - 0.5, w: 5, h: 0.38, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, {
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_HINGE);
      return s;
    },
    (slide) => {
      // Reveal: C is correct, explain errors
      addTextOnShape(slide, "C is CORRECT! Answer: 3,427", {
        x: 1.5, y: CONTENT_TOP + 0.3, w: 7, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Error explanations overlaid at bottom
      addCard(slide, 0.5, SAFE_BOTTOM - 1.6, 9, 1.1, { strip: C.ALERT });
      slide.addText([
        { text: "A: FLIP ERROR — Ones: did 5-2=3 instead of trading (2-5 needs a trade!)", options: { breakLine: true, fontSize: 10, color: C.ALERT } },
        { text: "B: FORGOT TO REDUCE — Traded from hundreds but left it unchanged.", options: { breakLine: true, fontSize: 10, color: C.ALERT } },
        { text: "D: FACT ERROR — Tens: 12-7=5, not 6.", options: { fontSize: 10, color: C.ALERT } },
      ], {
        x: 0.75, y: SAFE_BOTTOM - 1.5, w: 8.5, h: 0.9,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    }
  );

  // ── SLIDE 16: You Do — Independent Practice (Stage 4) ──────────────────
  contentSlide(pres, "Stage 4 | You Do", C.ALERT, "You Do: Addition & Subtraction", [], NOTES_YOUDO, FOOTER, (s) => {
    // First / Next / Then instruction card
    addCard(s, 0.5, CONTENT_TOP, 5.2, 2.35, { strip: C.ALERT });

    const steps = [
      { label: "First:", text: "Estimate each problem before calculating." },
      { label: "Next:", text: "Set out vertically. Align place values carefully." },
      { label: "Then:", text: "Solve Problems 1-6. Show all carrying and trading." },
      { label: "Check:", text: "Use the inverse operation to verify your answers." },
      { label: "Challenge:", text: "Finished? Take the Session 1 Extension." },
    ];
    steps.forEach((st, i) => {
      const sy = CONTENT_TOP + 0.08 + i * 0.44;
      s.addText([
        { text: st.label + " ", options: { bold: true, fontSize: 11, color: i === 4 ? C.ACCENT : C.ALERT } },
        { text: st.text, options: { fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: sy, w: 4.7, h: 0.38,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Problems summary (right side)
    addCard(s, 5.8, CONTENT_TOP, 3.7, 2.35, { strip: C.PRIMARY });
    s.addText("6 Problems", {
      x: 6.0, y: CONTENT_TOP + 0.08, w: 3.3, h: 0.25,
      fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });

    const problemList = [
      { num: "1.", text: "3,456 + 2,378", type: "Addition" },
      { num: "2.", text: "15,847 + 6,295", type: "Addition" },
      { num: "3.", text: "48,679 + 37,854", type: "Addition" },
      { num: "4.", text: "8,432 - 5,167", type: "Subtraction" },
      { num: "5.", text: "6,005 - 2,378", type: "Subtraction" },
      { num: "6.", text: "40,003 - 17,568", type: "Subtraction" },
    ];
    problemList.forEach((p, i) => {
      s.addText([
        { text: p.num + " ", options: { bold: true, fontSize: 10, color: C.PRIMARY } },
        { text: p.text, options: { fontSize: 10, color: C.CHARCOAL, bold: true } },
        { text: "  " + p.type, options: { fontSize: 8, color: C.MUTED, italic: true } },
      ], {
        x: 6.0, y: CONTENT_TOP + 0.4 + i * 0.3, w: 3.3, h: 0.28,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Difficulty indicator
    s.addText("Increasing difficulty ->", {
      x: 6.0, y: CONTENT_TOP + 2.15, w: 3.3, h: 0.18,
      fontSize: 8, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    // SC reference card
    addCard(s, 0.5, CONTENT_TOP + 2.45, 9, 0.45, { strip: C.ACCENT });
    s.addText([
      { text: "SC1: Digits aligned in correct columns.  ", options: { fontSize: 8, color: C.CHARCOAL } },
      { text: "SC2: Carrying in addition.  ", options: { fontSize: 8, color: C.CHARCOAL } },
      { text: "SC3: Trading in subtraction (incl. across zeros).", options: { fontSize: 8, color: C.CHARCOAL } },
    ], {
      x: 0.75, y: CONTENT_TOP + 2.5, w: 8.5, h: 0.35,
      fontFace: FONT_B, margin: 0, valign: "middle",
    });

    // Worksheet reference and timer — below SC card
    addTextOnShape(s, "Use your Session 1 Worksheet", {
      x: 0.5, y: CONTENT_TOP + 3.0, w: 2.6, h: 0.32, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, {
      fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addTextOnShape(s, "10 minutes", {
      x: 3.3, y: CONTENT_TOP + 3.0, w: 1.6, h: 0.32, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, {
      fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true,
    });
  });

  // ── SLIDE 17: Exit Ticket (Stage 5) ────────────────────────────────────
  exitTicketSlide(pres, [
    "Q1: Solve using vertical addition (show all working): 6,485 + 3,847",
    "Q2: Solve using vertical subtraction (show all trading): 9,002 - 4,536",
    "Q3: Spot the mistake — A student solved 703 - 258 and got 555. What error did they make? What is the correct answer?",
  ], NOTES_EXIT, FOOTER);

  // ── SLIDE 18: Resources ─────────────────────────────────────────────────
  addResourceSlide(pres, [
    RESOURCES.worksheet,
    RESOURCES.answerKey,
    RESOURCES.extension,
  ], { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // ── SLIDE 19: Closing ───────────────────────────────────────────────────
  closingSlide(pres,
    "Turn to your partner: What is the ONE mistake you need to watch out for when doing vertical subtraction? 30 seconds.",
    [
      "SC1: I can set out addition and subtraction problems vertically with digits aligned in the correct place value columns.",
      "SC2: I can apply the vertical addition algorithm including regrouping (carrying) across columns.",
      "SC3: I can apply the vertical subtraction algorithm including trading (borrowing) when a top digit is smaller than the bottom digit.",
      "Next session: Multiplication and division — the other two processes.",
    ],
    NOTES_CLOSING);

  // ── Write PPTX ──────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: `${OUT_DIR}/${LESSON.pptxFileName}` });
  console.log("PPTX written to " + OUT_DIR);

  // ── Generate companion PDFs ──────────────────────────────────────────────
  await generateWorksheet();
  await generateAnswerKey();
  await generateExtendingPdf();
  console.log("All PDFs generated.");
}

// ── PDF: SR1 — Addition & Subtraction Practice ──────────────────────────────

async function generateWorksheet() {
  const doc = createPdf({ title: RESOURCES.worksheet.name });

  let y = addPdfHeader(doc, RESOURCES.worksheet.name, {
    subtitle: "Independent Practice",
    color: C.PRIMARY,
    lessonInfo: FOOTER,
  });

  y = addTipBox(doc, "Remember: (1) ESTIMATE before calculating. (2) Set out VERTICALLY — align digits by place value. (3) Start from the ONES column. (4) Addition: carry when >= 10. Subtraction: trade when the top digit is smaller.", y, { color: C.SECONDARY });

  // Section A: Addition with Regrouping
  y = addSectionHeading(doc, "Section A: Vertical Addition with Regrouping", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Solve each problem using the vertical addition algorithm. Show all regrouping (carrying). Write your estimate first.", y);

  y = addProblem(doc, 1, "3,456 + 2,378", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Working (set out vertically below):" },
    ],
    color: C.PRIMARY,
  });

  y = addLinedArea(doc, y, 4);

  y = addProblem(doc, 2, "15,847 + 6,295", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Working (set out vertically below):" },
    ],
    color: C.PRIMARY,
  });

  y = addLinedArea(doc, y, 4);

  y = addProblem(doc, 3, "48,679 + 37,854", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Working (set out vertically below):" },
    ],
    color: C.PRIMARY,
  });

  y = addLinedArea(doc, y, 4);

  // Section B: Subtraction with Trading
  y = addSectionHeading(doc, "Section B: Vertical Subtraction with Trading", y, { color: C.ALERT });
  y = addBodyText(doc, "Solve each problem using the vertical subtraction algorithm. Show all trading (borrowing) annotations. Write your estimate first.", y);

  y = addProblem(doc, 4, "8,432 - 5,167", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Working (set out vertically below):" },
    ],
    color: C.ALERT,
  });

  y = addLinedArea(doc, y, 4);

  y = addProblem(doc, 5, "6,005 - 2,378  (watch the zeros!)", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Working (set out vertically below):" },
    ],
    color: C.ALERT,
  });

  y = addLinedArea(doc, y, 4);

  y = addProblem(doc, 6, "40,003 - 17,568  (chain trading across zeros)", y, {
    writeLines: [
      { label: "Estimate:" },
      { label: "Working (set out vertically below):" },
    ],
    color: C.ALERT,
  });

  y = addLinedArea(doc, y, 4);

  // Self-check section
  y = addSectionHeading(doc, "Self-Check: Use the Inverse Operation", y, { color: C.SECONDARY });
  y = addBodyText(doc, "For addition: subtract one number from your answer. You should get the other number.", y);
  y = addBodyText(doc, "For subtraction: add your answer to the bottom number. You should get the top number.", y);

  addPdfFooter(doc, FOOTER);
  await writePdf(doc, `${OUT_DIR}/${RESOURCES.worksheet.fileName}`);
  console.log(`  ${RESOURCES.worksheet.name} written.`);
}

// ── PDF: SR2 — Answer Key ────────────────────────────────────────────────────

async function generateAnswerKey() {
  const doc = createPdf({ title: RESOURCES.answerKey.name });

  let y = addPdfHeader(doc, RESOURCES.answerKey.name, {
    subtitle: "Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: FOOTER,
    showNameDate: false,
  });

  // Section A: Addition Answers
  y = addSectionHeading(doc, "Section A: Vertical Addition with Regrouping", y, { color: C.PRIMARY });

  y = addProblem(doc, 1, "3,456 + 2,378", y, {
    writeLines: [
      { label: "Estimate:", answer: "3,500 + 2,400 = ~5,900" },
      { label: "O: 6+8=14 -> 4, carry 1", answer: "" },
      { label: "T: 5+7+1=13 -> 3, carry 1", answer: "" },
      { label: "H: 4+3+1=8", answer: "" },
      { label: "Th: 3+2=5", answer: "" },
      { label: "Answer:", answer: "5,834" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "15,847 + 6,295", y, {
    writeLines: [
      { label: "Estimate:", answer: "15,800 + 6,300 = ~22,100" },
      { label: "O: 7+5=12 -> 2, carry 1", answer: "" },
      { label: "T: 4+9+1=14 -> 4, carry 1", answer: "" },
      { label: "H: 8+2+1=11 -> 1, carry 1", answer: "" },
      { label: "Th: 5+6+1=12 -> 2, carry 1", answer: "" },
      { label: "TTh: 1+0+1=2", answer: "" },
      { label: "Answer:", answer: "22,142" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "48,679 + 37,854", y, {
    writeLines: [
      { label: "Estimate:", answer: "48,700 + 37,900 = ~86,600" },
      { label: "O: 9+4=13 -> 3, carry 1", answer: "" },
      { label: "T: 7+5+1=13 -> 3, carry 1", answer: "" },
      { label: "H: 6+8+1=15 -> 5, carry 1", answer: "" },
      { label: "Th: 8+7+1=16 -> 6, carry 1", answer: "" },
      { label: "TTh: 4+3+1=8", answer: "" },
      { label: "Answer:", answer: "86,533" },
    ],
    color: C.PRIMARY,
  });

  // Section B: Subtraction Answers
  y = addSectionHeading(doc, "Section B: Vertical Subtraction with Trading", y, { color: C.ALERT });

  y = addProblem(doc, 4, "8,432 - 5,167", y, {
    writeLines: [
      { label: "Estimate:", answer: "8,400 - 5,200 = ~3,200" },
      { label: "O: 2-7 can't, trade: 12-7=5 (T: 3->2)", answer: "" },
      { label: "T: 2-6 can't, trade: 12-6=6 (H: 4->3)", answer: "" },
      { label: "H: 3-1=2", answer: "" },
      { label: "Th: 8-5=3", answer: "" },
      { label: "Answer:", answer: "3,265" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, 5, "6,005 - 2,378", y, {
    writeLines: [
      { label: "Estimate:", answer: "6,000 - 2,400 = ~3,600" },
      { label: "Chain trade: 6Th->5Th, 0H->9H, 0T->9T, 5O->15O", answer: "" },
      { label: "O: 15-8=7", answer: "" },
      { label: "T: 9-7=2", answer: "" },
      { label: "H: 9-3=6", answer: "" },
      { label: "Th: 5-2=3", answer: "" },
      { label: "Answer:", answer: "3,627" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, 6, "40,003 - 17,568", y, {
    writeLines: [
      { label: "Estimate:", answer: "40,000 - 17,600 = ~22,400" },
      { label: "Chain trade: 4TTh->3TTh, 0Th->9Th, 0H->9H, 0T->9T, 3O->13O", answer: "" },
      { label: "O: 13-8=5", answer: "" },
      { label: "T: 9-6=3", answer: "" },
      { label: "H: 9-5=4", answer: "" },
      { label: "Th: 9-7=2", answer: "" },
      { label: "TTh: 3-1=2", answer: "" },
      { label: "Answer:", answer: "22,435" },
    ],
    color: C.ALERT,
  });

  // Exit Ticket Answers
  y = addSectionHeading(doc, "Exit Ticket Answers", y, { color: C.PRIMARY });

  y = addProblem(doc, "Q1", "6,485 + 3,847", y, {
    writeLines: [
      { label: "O: 5+7=12 -> 2, carry 1", answer: "" },
      { label: "T: 8+4+1=13 -> 3, carry 1", answer: "" },
      { label: "H: 4+8+1=13 -> 3, carry 1", answer: "" },
      { label: "Th: 6+3+1=10 -> 0, carry 1", answer: "" },
      { label: "TTh: 0+0+1=1", answer: "" },
      { label: "Answer:", answer: "10,332" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, "Q2", "9,002 - 4,536", y, {
    writeLines: [
      { label: "Chain trade: 9Th->8Th, 0H->9H, 0T->9T, 2O->12O", answer: "" },
      { label: "O: 12-6=6, T: 9-3=6, H: 9-5=4, Th: 8-4=4", answer: "" },
      { label: "Answer:", answer: "4,466" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, "Q3", "Spot the mistake: 703 - 258 = 555", y, {
    writeLines: [
      { label: "Error:", answer: "The student used the 'flip' error - subtracting the smaller digit from the larger regardless of place value." },
      { label: "Details:", answer: "They did 8-3=5 in the ones and 5-0=5 in the tens instead of trading from the hundreds." },
      { label: "Correct working:", answer: "Chain trade: 7H->6H, 0T->9T, 3O->13O. Then 13-8=5, 9-5=4, 6-2=4. Answer: 445." },
    ],
    color: C.ALERT,
  });

  addPdfFooter(doc, "Teacher Reference — Do Not Distribute to Students");
  await writePdf(doc, `${OUT_DIR}/${RESOURCES.answerKey.fileName}`);
  console.log(`  ${RESOURCES.answerKey.name} written.`);
}

// ── PDF: EXT1 — Palindromic Number Investigation ─────────────────────────────

async function generateExtendingPdf() {
  const doc = createPdf({ title: RESOURCES.extension.name });

  let y = addPdfHeader(doc, RESOURCES.extension.name, {
    subtitle: "Extending Challenge",
    color: C.ACCENT,
    lessonInfo: FOOTER,
  });

  y = addSectionHeading(doc, "What is a Palindromic Number?", y, { color: C.ACCENT });
  y = addBodyText(doc, "A palindromic number reads the same forwards and backwards. For example: 121, 3443, 56765. Non-palindromic examples: 123, 4567, 89012.", y);
  y = addBodyText(doc, "Here is a fascinating mathematical mystery: take any number, reverse its digits, and add the two together. Keep doing this until you get a palindrome. Does it always work?", y);

  y = addSectionHeading(doc, "The Algorithm", y, { color: C.ACCENT });
  y = addStepInstructions(doc, [
    "Choose a number (e.g., 4,738).",
    "Reverse its digits (e.g., 4,738 reversed is 8,374).",
    "Add the number to its reverse using vertical addition (e.g., 4,738 + 8,374).",
    "Check: is the sum a palindrome? If YES, stop. If NO, go back to Step 2 with your new number.",
    "Count how many steps it took.",
  ], y, { color: C.ACCENT });

  y = addSectionHeading(doc, "Worked Example: 4,738", y, { color: C.ACCENT });
  y = addBodyText(doc, "Step 1: 4,738 + 8,374 = 13,112. Is 13,112 a palindrome? NO (reversed: 21,131). Continue.", y);
  y = addBodyText(doc, "Step 2: 13,112 + 21,131 = 34,243. Is 34,243 a palindrome? YES! (it reads 34243 both ways).", y);
  y = addBodyText(doc, "Result: 4,738 reaches a palindrome in 2 steps.", y);

  y = addTipBox(doc, "You will need to use vertical addition with regrouping to solve these. Show all your working! This is great practice for the skills we learned today.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Your Investigation", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Try each starting number below. Use vertical addition to add the number to its reverse. Keep going until you get a palindrome. Record how many steps each one takes.", y);

  // Investigation problems
  y = addProblem(doc, 1, "Starting number: 263", y, {
    writeLines: [
      { label: "Step 1: 263 + 362 =" },
      { label: "Palindrome? (If no, continue)" },
      { label: "Step 2:" },
      { label: "Palindrome?" },
      { label: "Total steps:" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "Starting number: 5,280", y, {
    writeLines: [
      { label: "Step 1: 5,280 + 0,825 =" },
      { label: "Palindrome?" },
      { label: "Step 2:" },
      { label: "Palindrome?" },
      { label: "Total steps:" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "Starting number: 1,467", y, {
    writeLines: [
      { label: "Step 1: 1,467 + 7,641 =" },
      { label: "Palindrome?" },
      { label: "Step 2:" },
      { label: "Palindrome?" },
      { label: "Total steps:" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 4, "Starting number: 89 (this one is tricky!)", y, {
    writeLines: [
      { label: "Step 1: 89 + 98 =" },
      { label: "Palindrome?" },
      { label: "Step 2:" },
      { label: "Palindrome?" },
      { label: "Continue on the back if needed." },
      { label: "Total steps:" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, 5, "Choose your OWN starting number:", y, {
    writeLines: [
      { label: "My number:" },
      { label: "Step 1:" },
      { label: "Palindrome?" },
      { label: "Step 2:" },
      { label: "Palindrome?" },
      { label: "Total steps:" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Analysis Questions", y, { color: C.PRIMARY });

  y = addProblem(doc, 6, "Which starting number reached a palindrome in the fewest steps?", y, {
    writeLines: [{ label: "Answer:" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 7, "Which starting number took the most steps?", y, {
    writeLines: [{ label: "Answer:" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 8, "Do you think EVERY number eventually reaches a palindrome? Why or why not?", y, {
    writeLines: [
      { label: "My prediction:" },
      { label: "My reasoning:" },
    ],
    color: C.ACCENT,
  });

  y = addTipBox(doc, "Fun fact: The number 196 has been tested by computers through millions of steps and has NEVER reached a palindrome! Mathematicians still don't know if it ever will. This is an unsolved problem in mathematics — and you've been investigating it today!", y, { color: C.ACCENT });

  y = addSectionHeading(doc, "Connection to Today's Lesson", y, { color: C.SECONDARY });
  y = addBodyText(doc, "This investigation uses the same vertical addition algorithm you practised today, but applied repeatedly. Notice how important it is to:", y);
  y = addBodyText(doc, "- Align your digits carefully (SC1) — one misaligned digit and the whole chain goes wrong.", y);
  y = addBodyText(doc, "- Carry accurately (SC2) — regrouping errors compound with each step.", y);
  y = addBodyText(doc, "- Check your work (estimation) — a quick reasonableness check catches errors early.", y);

  addPdfFooter(doc, `${FOOTER} - Extending Investigation`);
  await writePdf(doc, `${OUT_DIR}/${RESOURCES.extension.fileName}`);
  console.log(`  ${RESOURCES.extension.name} written.`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
build().catch((err) => { console.error(err); process.exit(1); });
