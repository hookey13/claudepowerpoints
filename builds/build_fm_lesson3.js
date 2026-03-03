// Lesson 3 of 5: Prime & Composite Numbers
// Year 5/6 Numeracy — Number Properties
// VC2M6N02 (identify and describe properties of prime, composite numbers)
// Week 1, Session 3

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
const T = createTheme("numeracy", "grade56", 0);
const {
  C, FONT_H, FONT_B,
  titleSlide, liSlide, contentSlide, cfuSlide, closingSlide,
  workedExSlide, exitTicketSlide, addStageBadge,
  withReveal,
  addTopBar, addBadge, addTitle, addCard, addFooter, addTextOnShape,
  iconToBase64Png, getContrastColor,
  SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;

const OUT_DIR = "output/FM_Lesson3_Prime_Composite";
const FOOTER = "Session 3 of 5 | Factors & Multiples | Year 5/6 Maths";

// ── Teacher notes ─────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
\u2022 "Over the last two sessions we\u2019ve been building tools \u2014 factor pairs in Lesson 1, divisibility rules in Lesson 2. Today we put those tools to work. We\u2019re going to classify numbers as PRIME or COMPOSITE."
\u2022 "By the end of today, you\u2019ll be able to look at any number and determine whether it\u2019s prime or composite \u2014 and explain WHY."

**DO:**
\u2022 Display the title slide as students settle. Ensure mini-whiteboards and markers are on every desk.
\u2022 Direct attention: "This is Session 3 of 5."

**TEACHER NOTES:**
Lesson 3 is the conceptual heart of the unit. Lessons 1\u20132 built the tools (factor pairs, divisibility rules); today those tools are applied to classify numbers. The prime/composite distinction is foundational for Lessons 4\u20135 (LCM/HCF, prime factorisation). Students who can systematically test for factors using divisibility rules will find prime classification straightforward. Students who struggled with divisibility rules yesterday will need extra support on the factor-testing process.

**WATCH FOR:**
\u2022 Students who didn\u2019t master divisibility rules yesterday \u2014 they\u2019ll struggle with the factor-testing process.
\u2022 Readiness signal: students settling quickly with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR = `**SAY:**
\u2022 "Let\u2019s warm up with yesterday\u2019s divisibility rules. I\u2019ll give you a number \u2014 you test it against all four rules on your whiteboard."
\u2022 "First number: 84. Test for 2, 3, 5, and 10. You have 20 seconds. Go!"
\u2022 After 20s: "Boards up. \u00F72: YES (ends in 4). \u00F73: YES (8+4=12, 12\u00F73=4). \u00F75: NO. \u00F710: NO."
\u2022 "Second number: 255. 20 seconds. Go!"
\u2022 After 20s: "Boards up. \u00F72: NO (5 is odd). \u00F73: YES (2+5+5=12, 12\u00F73=4). \u00F75: YES (ends in 5). \u00F710: NO."
\u2022 "Third number: 91. 20 seconds. Go!"
\u2022 After 20s: "Boards up. \u00F72: NO. \u00F73: NO (9+1=10, not \u00F73). \u00F75: NO. \u00F710: NO. Interesting \u2014 91 fails all four rules. Remember 847 from yesterday? We\u2019ll come back to numbers like these."

**DO:**
\u2022 Display the slide. Students work on whiteboards.
\u2022 Time 20 seconds per number. Scan boards after each.
\u2022 The third number (91) is deliberately chosen to fail all four rules \u2014 it previews today\u2019s theme.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
\u2022 "Write Yes or No for each rule. Ready\u2026 show me!"
\u2022 Scan for: correct answers on \u226580% of boards.
PROCEED: If \u226580% correct on all three numbers, move to Fluency.
PIVOT: If widespread errors on the rule of 3, briefly reteach: "Add ALL the digits. For 84: 8 + 4 = 12. Is 12 divisible by 3? Yes \u2014 12 \u00F7 3 = 4." Re-check with 63.

**TEACHER NOTES:**
Daily Review retrieves yesterday\u2019s divisibility rules \u2014 the primary tool students will use today to test whether numbers are prime. 84 passes \u00F72 and \u00F73 (composite), 255 passes \u00F73 and \u00F75 (composite), and 91 fails all four (but is NOT prime \u2014 91 = 7 \u00D7 13). This sets up the key insight: failing all four basic divisibility rules does NOT guarantee a number is prime. You must test ALL primes up to the square root.

**WATCH FOR:**
\u2022 Students who struggle with the digit sum for 3 \u2014 this was yesterday\u2019s new content.
\u2022 Students who assume 91 is prime because it fails all four rules \u2014 we\u2019ll address this explicitly later.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
\u2022 "Times tables rapid fire. 12 problems, 60 seconds. These are the multiplication facts you\u2019ll need for finding factors today."
\u2022 "Write your answers on your whiteboard. Go!"
\u2022 After 60s: read answers aloud for self-checking.
\u2022 "Who got 10 or more? Thumbs up."

**DO:**
\u2022 Display the slide. Students write answers on whiteboards.
\u2022 Time 60 seconds. Read answers aloud.
\u2022 Focus on \u00D77, \u00D78, \u00D79 \u2014 the tables most students find hardest.

**TEACHER NOTES:**
Fluency with \u00D77, \u00D78, and \u00D79 directly underpins today\u2019s factor-testing process. When students test whether 53 is prime, they need to quickly check: is 53 \u00F7 7 a whole number? If they can\u2019t recall 7 \u00D7 7 = 49 and 7 \u00D7 8 = 56, they\u2019ll struggle. The rapid-fire format builds automaticity.

**WATCH FOR:**
\u2022 Students who freeze on \u00D77 and \u00D78 facts \u2014 these students will need a times table reference during independent practice.
\u2022 Students who compute slowly but accurately \u2014 speed will improve with practice.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
\u2022 Read from slide: "We are learning to classify numbers as prime or composite by examining their factors."
\u2022 "Yesterday we tested divisibility. Today we use that skill to answer a deeper question: what KIND of number is this?"
\u2022 Read each SC: "SC1 \u2014 determine whether a number is prime or composite. SC2 \u2014 explain WHY. SC3 \u2014 use a systematic method to find all primes up to 50."

**DO:**
\u2022 Display the slide. Point to LI and read aloud.
\u2022 Point to each SC in turn. Emphasise SC1 and SC2 as the core targets.

**TEACHER NOTES:**
The LI connects explicitly to Lessons 1\u20132 (factor pairs and divisibility rules) and introduces today\u2019s classification task. SC1 (classifying) is procedural \u2014 can you DO the factor test? SC2 (explaining) is conceptual \u2014 do you UNDERSTAND the definition? SC3 (systematic method) introduces the Sieve of Eratosthenes approach, extending to pattern recognition. Most students should achieve SC1\u2013SC2; SC3 is for consolidation.

**WATCH FOR:**
\u2022 Students who look confused by "classify" \u2014 clarify: "It means sorting numbers into groups based on their properties."

[Maths: Planning \u2014 Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_VOCAB = `**SAY:**
\u2022 "Two new definitions today. Listen carefully because the EXACT NUMBER of factors is what matters."
\u2022 Point to PRIME: "A prime number has EXACTLY 2 factors \u2014 1 and itself. Not one factor. Not three. Exactly two."
\u2022 "Examples: 2, 3, 5, 7, 11, 13. Notice 2 is prime \u2014 it\u2019s the only EVEN prime number."
\u2022 Point to COMPOSITE: "A composite number has MORE than 2 factors. It can be divided evenly by numbers other than 1 and itself."
\u2022 "Examples: 4, 6, 8, 9, 10, 12. Notice 9 \u2014 it\u2019s odd but still composite because 9 = 3 \u00D7 3."
\u2022 Point to the special case: "What about 1? It has only ONE factor \u2014 itself. Not two factors, just one. So 1 is NEITHER prime NOR composite. It\u2019s in a category of its own."

**DO:**
\u2022 Display the slide. Point to each card as you explain.
\u2022 Pause after the note about 1. Give 5 seconds for processing.
\u2022 "Turn to your partner: Is 2 prime or composite? Why?" 15 seconds.

**MISCONCEPTIONS:**
\u2022 Misconception: "1 is prime because it can only be divided by 1 and itself."
  Why: Students hear "only divided by 1 and itself" and think 1 fits. They miss the "exactly 2 factors" requirement \u2014 1 has only 1 factor.
  Impact: Misclassifying 1 as prime affects understanding of prime factorisation in Lessons 4\u20135.
  Quick correction: "Prime means exactly TWO different factors. For 1: its only factor is 1. That\u2019s just one factor, not two. So 1 doesn\u2019t qualify."

\u2022 Misconception: "All odd numbers are prime."
  Why: Students notice that many primes are odd (3, 5, 7, 11\u2026) and overgeneralise.
  Impact: They\u2019ll incorrectly classify 9, 15, 21, 25\u2026 as prime.
  Quick correction: "9 is odd but 9 = 3 \u00D7 3, so it has factors 1, 3, and 9. Three factors \u2014 composite."

**TEACHER NOTES:**
The vocabulary slide makes the factor-count definition crystal clear. The key distinction: prime = exactly 2 factors, composite = more than 2 factors, and 1 = exactly 1 factor (neither). The examples are carefully chosen \u2014 2 (even prime, only one), 9 (odd composite), and 1 (neither) \u2014 to pre-empt the three most common misconceptions. The partner talk about 2 forces students to apply the definition immediately.

[Maths: Launch \u2014 Explicit Instruction | VTLM 2.0: Explicit Explanation]`;

const NOTES_IDO_WORKED = `**SAY:**
\u2022 "Let me show you the systematic process for testing whether a number is prime."
\u2022 "The number is 29. I want to know: prime or composite?"
\u2022 "Step 1: Test divisibility by 2. Is 29 even? No \u2014 it\u2019s odd. Not divisible by 2."
\u2022 "Step 2: Test divisibility by 3. Digit sum: 2 + 9 = 11. Is 11 divisible by 3? No. Not divisible by 3."
\u2022 "Step 3: Test divisibility by 5. Does 29 end in 0 or 5? No. Not divisible by 5."
\u2022 "Step 4: Test divisibility by 7. 7 \u00D7 4 = 28 and 7 \u00D7 5 = 35. 29 is between them \u2014 not divisible by 7."
\u2022 "Now here\u2019s the shortcut: \u221A29 \u2248 5.4. I only need to test primes up to 5.4 \u2014 that\u2019s 2, 3, and 5. I\u2019ve already tested those! So I\u2019m done. 29 is PRIME."
\u2022 "The square root trick: once you\u2019ve tested all primes up to the square root of a number, you can stop. If none of them divide evenly, the number is prime."

**DO:**
\u2022 Display the slide. Walk through each step.
\u2022 Write "\u221A29 \u2248 5.4" on the whiteboard. Circle it.
\u2022 Emphasise: "The square root tells us where to STOP testing."

**TEACHER NOTES:**
The worked example demonstrates the systematic factor-testing process and introduces the square root shortcut. 29 is chosen because (a) it IS prime, (b) it requires testing 2, 3, 5 but not 7 (since \u221A29 < 7), and (c) it\u2019s large enough to feel non-trivial. The square root shortcut is the efficiency insight \u2014 without it, students would need to test every number up to n-1, which is impractical for larger numbers. The explanation connects to factor pairs from Lesson 1: if n = a \u00D7 b, then one of a or b must be \u2264 \u221An.

**MISCONCEPTIONS:**
\u2022 Misconception: "You need to test EVERY number up to 29."
  Why: Students don\u2019t understand why the square root is the stopping point.
  Impact: Testing takes too long \u2014 students give up or make errors.
  Quick correction: "If 29 = a \u00D7 b, then one of those numbers must be small (less than \u221A29 \u2248 5.4). So if no small prime divides 29, no number divides 29. We only need to test 2, 3, 5."

[Maths: Launch \u2014 Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
\u2022 "Your turn. On your whiteboard: Is 51 prime or composite? Test it."
\u2022 "You have 20 seconds. Use your divisibility rules."
\u2022 After boards up: "Let\u2019s check. Many students think 51 is prime \u2014 it\u2019s odd, doesn\u2019t end in 5, looks prime."
\u2022 "But: digit sum 5 + 1 = 6. Is 6 divisible by 3? Yes! So 51 is divisible by 3."
\u2022 "51 = 3 \u00D7 17. That\u2019s three factors: 1, 3, 17, 51. MORE than 2 factors \u2014 COMPOSITE."

**DO:**
\u2022 Display the question slide. Give 20 seconds.
\u2022 "Show me your boards!" Scan for "composite" on \u226580%.
\u2022 Click to reveal. Emphasise the digit sum test.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
\u2022 "Is 51 prime or composite? Show your working and your answer. 20 seconds. Show me!"
\u2022 Scan for: "Composite" with correct reasoning on \u226580% of boards.
PROCEED: If \u226580% correct with reasoning, move to We Do.
PIVOT: If widespread "prime" answers, reteach: "51 looks prime \u2014 it\u2019s a trap! Always test the divisibility rules. Digit sum: 5 + 1 = 6. Is 6 divisible by 3? YES. So 51 = 3 \u00D7 17. Composite." Give another: "Test 57." (5+7=12, 12\u00F73=4, so 57 = 3 \u00D7 19. Also composite.)

**TEACHER NOTES:**
51 is the classic "trap" number \u2014 students routinely misidentify it as prime because it\u2019s odd, doesn\u2019t end in 0 or 5, and "feels" prime. The digit sum test (5+1=6, divisible by 3) catches it immediately. This CFU tests whether students apply divisibility rules systematically rather than relying on intuition. The connection to Lesson 2 is explicit: the rule of 3 is the tool that reveals 51\u2019s true nature.

**MISCONCEPTIONS:**
\u2022 Misconception: "51 is prime because it\u2019s odd and doesn\u2019t end in 5."
  Why: Students rely on surface features (odd, no obvious factors) instead of systematic testing.
  Quick correction: "Never trust how a number \u2018looks.\u2019 Always test. The digit sum rule catches numbers that look prime but aren\u2019t."

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
\u2022 "Let\u2019s classify three numbers together. For each one, test systematically and tell me: prime or composite."
\u2022 "First: 37. On your whiteboard, test it. 15 seconds."
\u2022 Cold Call: "[Name], is 37 prime or composite? How do you know?"
\u2022 "37: \u221A37 \u2248 6.1, so test 2, 3, 5. Odd (not \u00F72), digit sum 10 (not \u00F73), doesn\u2019t end in 0 or 5 (not \u00F75). PRIME."
\u2022 "Next: 42. Test it. 15 seconds."
\u2022 Cold Call: "[Name], 42?" "Even \u2014 so 42 \u00F7 2 = 21. Done. COMPOSITE. We found a factor other than 1 and itself."
\u2022 "Last: 53. Test it. 15 seconds."
\u2022 Cold Call: "[Name], 53?" "\u221A53 \u2248 7.3, test 2, 3, 5, 7. Odd, digit sum 8, doesn\u2019t end in 0/5, 53\u00F77 \u2248 7.6. PRIME."

**DO:**
\u2022 Display the question slide. Students test each number on whiteboards. 15 seconds per number.
\u2022 Cold Call different students for each. Require reasoning.
\u2022 Click to reveal answers after all three.

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
\u2022 Cold call different students for each number. "[Name], prime or composite? How did you test?"
PROCEED: If students answer correctly with clear reasoning for all three, move to We Do 2.
PIVOT: If 42 is missed (students don\u2019t check \u00F72 first), reteach: "Always start with 2 \u2014 it\u2019s the easiest test. If it\u2019s even, you\u2019re done. It\u2019s composite."

**ENABLING & EXTENDING:**
ENABLING PROMPT:
\u2022 Task: Students test only 42 (the easiest \u2014 even number). If successful, try 37 with scaffolded steps written on the board.

EXTENDING PROMPT:
\u2022 Task: "Find a composite number between 50 and 60 that is NOT even and NOT divisible by 5. How did you find it?" (57 = 3 \u00D7 19)

**TEACHER NOTES:**
The three numbers are deliberately sequenced: 37 (prime, requires full testing), 42 (composite, caught immediately by \u00F72), 53 (prime, requires testing up to 7). This mix reinforces the systematic process while showing that composite numbers can be identified quickly when they\u2019re even. The sequence also shows that primes require MORE work to confirm than composites \u2014 you must exhaust all possible factors.

[Maths: Explore \u2014 Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
\u2022 "Now let\u2019s find ALL primes between 20 and 40. Work through each number on your whiteboard."
\u2022 "I\u2019ll give you 90 seconds. Start at 20 and test every number. Write P for prime, C for composite."
\u2022 After 90s: "Boards up. Let\u2019s check together."
\u2022 "20 \u2014 even, composite. 21 = 3 \u00D7 7, composite. 22 \u2014 even, composite. 23 \u2014 test 2, 3 (digit sum 5, not \u00F73), 5 (no). \u221A23 \u2248 4.8, done. PRIME."
\u2022 "24\u201328 \u2014 all composite. 29 \u2014 we tested this! PRIME."
\u2022 "30 \u2014 even, composite. 31 \u2014 test 2, 3, 5. \u221A31 \u2248 5.6. All pass. PRIME."
\u2022 "32\u201336 \u2014 all composite. 37 \u2014 just tested! PRIME."
\u2022 "38\u201339 \u2014 composite. The primes between 20 and 40 are: 23, 29, 31, 37."

**DO:**
\u2022 Display the question slide. 90 seconds for whiteboard work.
\u2022 Walk the room \u2014 check students are working systematically (not skipping numbers).
\u2022 Click to reveal. Walk through the full list.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
\u2022 "Write all primes between 20 and 40 on your board. 90 seconds. Show me!"
\u2022 Scan for: all four primes (23, 29, 31, 37) on \u226580% of boards.
PROCEED: If \u226580% found all four, move to Hinge Question.
PIVOT: If students miss 23 or 31, they may not be testing systematically. Reteach: "Go through EVERY number from 20 to 40. Test each one. Don\u2019t skip \u2014 you\u2019ll miss primes." Walk through 23 step by step.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
\u2022 Task: Students find primes between 20 and 30 only (half the range). Test each number with step-by-step guidance.

EXTENDING PROMPT:
\u2022 Task: "Extend to 40\u201360. How many primes are there? Is the density of primes increasing or decreasing?"

**TEACHER NOTES:**
This exercise previews the Sieve of Eratosthenes (SC3) in a guided format. Finding ALL primes in a range requires systematic testing of every number \u2014 students can\u2019t skip. The range 20\u201340 contains exactly 4 primes, which is enough to show the pattern without overwhelming. Students should notice: (a) even numbers are immediately eliminated, (b) multiples of 3 and 5 go next, (c) only a few numbers survive. This is exactly how the Sieve works.

**WATCH FOR:**
\u2022 Students who skip even numbers without testing \u2014 good! They\u2019re applying \u00F72 efficiently.
\u2022 Students who include 21 or 27 \u2014 they\u2019re not testing \u00F73.

[Maths: Explore \u2014 Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
\u2022 "Gate check. Look at the four numbers on the screen. Only ONE of them is prime. Which one?"
\u2022 "Hold up 1, 2, 3, or 4 fingers. 20 seconds to decide."
\u2022 After vote: "The answer is B \u2014 47."
\u2022 "Why not the others? A) 39 = 3 \u00D7 13 (digit sum 12, divisible by 3). C) 51 = 3 \u00D7 17 (digit sum 6, divisible by 3). D) 57 = 3 \u00D7 19 (digit sum 12, divisible by 3)."
\u2022 "Notice the pattern \u2014 ALL three distractors are divisible by 3. The digit sum rule is your best friend."

**DO:**
\u2022 Display the hinge question. 20 seconds.
\u2022 Finger vote: scan for option B (2 fingers) on \u226580%.
\u2022 Click to reveal. Explain each distractor.

**CFU CHECKPOINT:**
Technique: Finger Voting (1\u20134)
Script:
\u2022 "Fingers up \u2014 which number is prime? 1 for A, 2 for B, 3 for C, 4 for D. Show me!"
PROCEED: If \u226580% choose B, release to You Do.
PIVOT: If students choose A (39) or C (51), they\u2019re not testing \u00F73. Reteach: "Every time you see an odd number that doesn\u2019t end in 5, test the digit sum for 3. 39: 3+9=12, 12\u00F73=4. Divisible by 3 \u2014 composite." Re-check: "Is 87 prime?" (8+7=15, 15\u00F73=5, composite).

**TEACHER NOTES:**
This hinge question is designed to catch the most common error in prime classification: failing to test divisibility by 3. All three distractors (39, 51, 57) are divisible by 3 \u2014 they\u2019re the "looks prime but isn\u2019t" numbers that trip students up. Only 47 survives all tests (\u221A47 \u2248 6.9, test 2, 3, 5 \u2014 all fail). If a student picks B, they almost certainly applied the digit sum rule correctly. If they pick any other option, the digit sum rule is the intervention point.

**MISCONCEPTIONS:**
\u2022 Misconception: "39 is prime because it\u2019s odd."
  Why: Over-reliance on the \u00F72 test only; students don\u2019t follow through with \u00F73.
  Quick correction: "Odd doesn\u2019t mean prime. Always test 3 as well. 3+9=12, 12\u00F73=4. Composite."

[Maths: Monitor Progress \u2014 Hinge Question | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
\u2022 "Independent practice time. On your worksheet, you\u2019ll classify 10 numbers as prime or composite."
\u2022 "For each number, show your factor testing. Write P for prime, C for composite, and explain why."
\u2022 "You have 8 minutes. Start now."

**DO:**
\u2022 Distribute SR1 worksheet.
\u2022 Set timer for 8 minutes. Circulate \u2014 visit enabling students first.
\u2022 Conference with 2\u20133 students: "How did you decide this one was prime? What did you test?"

**ENABLING & EXTENDING:**
ENABLING PROMPT:
\u2022 Task: Students complete only the first 5 numbers (smaller, more straightforward). Provide a divisibility rules reference card. If they finish, attempt number 6.

EXTENDING PROMPT:
\u2022 Task: After completing the worksheet, students work on EXT1 \u2014 the Goldbach\u2019s Conjecture Investigation, which explores writing even numbers as sums of two primes.

**TEACHER NOTES:**
The worksheet sequences numbers from easy (small, obviously even/odd) to challenging (larger numbers requiring multi-step testing). Numbers are chosen to include classic traps: 51, 91 (= 7 \u00D7 13), and numbers that students commonly misclassify. The "explain why" requirement targets SC2 \u2014 understanding the definition, not just applying a procedure.

[Maths: Summarise \u2014 Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
\u2022 "Pens down. Exit ticket time \u2014 three questions. Work silently, 3 minutes."
\u2022 Read Q1, Q2, Q3 aloud from the slide.

**DO:**
\u2022 Display exit ticket. 3 minutes. Circulate silently.
\u2022 Collect responses or observe.

**TEACHER NOTES:**
Q1 tests SC1 (classifying a number). Q2 tests SC2 (explaining the definition \u2014 why 1 is neither). Q3 tests SC3 (finding primes in a range systematically). Sort responses: SC1 only \u2192 enabling tomorrow, SC1+SC2 \u2192 on track, all three \u2192 ready for extending.

[Maths: Summarise \u2014 Exit Ticket (Stage 5) | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `**SAY:**
\u2022 "Here are today\u2019s printable resources."

**DO:**
\u2022 Display briefly. Teachers click hyperlinks.

**TEACHER NOTES:**
SR1 is the practice worksheet (one per student). SR2 is the answer key (teacher reference). EXT1 is the Goldbach\u2019s Conjecture extending investigation (3\u20135 copies for extending students). The EXT1 PDF is self-contained \u2014 it teaches Goldbach\u2019s Conjecture, provides examples, and sets the task without needing teacher explanation.

[Maths: Planning \u2014 Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
\u2022 "Let\u2019s check our success criteria."
\u2022 Read SC1: "I can determine whether a number is prime or composite by finding its factors." Thumbs up/sideways/down. Scan.
\u2022 Read SC2: "I can explain why a number is prime or composite." Thumbs. Scan.
\u2022 Read SC3: "I can use a systematic method to identify all primes up to 50." Thumbs. Scan.
\u2022 "Turn to your partner: Tell them one number you tested today and whether it was prime or composite \u2014 and WHY. 30 seconds."
\u2022 "Tomorrow we\u2019ll use prime numbers to break numbers apart \u2014 prime factorisation. It\u2019s like finding the DNA of a number. Well done today."

**DO:**
\u2022 Display closing slide. Run thumbs for each SC.
\u2022 30 seconds Turn & Talk. Listen to 2\u20133 pairs.
\u2022 Note students showing thumbs-down on SC1 for tomorrow\u2019s enabling.

**TEACHER NOTES:**
SC3 (systematic method for all primes up to 50) is the most likely thumbs-down \u2014 this is fine. The Sieve approach was only introduced in We Do 2; it needs more practice. The preview of prime factorisation connects today\u2019s classification to tomorrow\u2019s decomposition: knowing a number is composite means it CAN be broken into prime factors.

[Maths: Summarise \u2014 Closing | VTLM 2.0: Monitor Progress & Feedback]`;

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "Prime & Composite Numbers \u2014 Session 3";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres, "Prime & Composite Numbers", "Classifying Numbers by Their Factors",
    "Session 3 of 5 | Number Properties | Year 5/6", NOTES_TITLE);

  // ── SLIDE 2: Daily Review (Stage 1) ─────────────────────────────────────
  contentSlide(pres, "Daily Review", C.ACCENT, "Divisibility Rules Retrieval", [
    "Test 84 for divisibility by 2, 3, 5, and 10.",
    "Test 255 for divisibility by 2, 3, 5, and 10.",
    "Test 91 for divisibility by 2, 3, 5, and 10.",
  ], NOTES_DR, FOOTER, (s) => {
    addCard(s, 6.2, CONTENT_TOP + 0.1, 3.2, 1.6, { strip: C.ACCENT });
    s.addText([
      { text: "Show Me Boards", options: { bold: true, breakLine: true, fontSize: 13, color: C.ACCENT } },
      { text: "20 seconds per number.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Write YES or NO", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "for each rule.", options: { fontSize: 11, color: C.CHARCOAL } },
    ], {
      x: 6.4, y: CONTENT_TOP + 0.2, w: 2.8, h: 1.3,
      fontFace: FONT_B, margin: 0, valign: "top",
    });
  });

  // ── SLIDE 3: Fluency (Stage 1) ─────────────────────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Times Tables Rapid Fire", { fontSize: 26 });

    // 12 problems in a 3x4 grid
    const problems = [
      "7 \u00D7 8 =", "9 \u00D7 6 =", "8 \u00D7 7 =",
      "6 \u00D7 9 =", "7 \u00D7 9 =", "8 \u00D7 8 =",
      "9 \u00D7 7 =", "7 \u00D7 6 =", "9 \u00D7 9 =",
      "8 \u00D7 9 =", "6 \u00D7 7 =", "7 \u00D7 7 =",
    ];
    const cols = 3;
    const rows = 4;
    const cellW = 2.6;
    const cellH = 0.7;
    const gridX = 0.5;
    const gridY = CONTENT_TOP + 0.1;
    problems.forEach((p, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = gridX + col * (cellW + 0.2);
      const cy = gridY + row * (cellH + 0.12);
      addCard(s, cx, cy, cellW, cellH, { strip: C.PRIMARY });
      s.addText((i + 1) + ".  " + p, {
        x: cx + 0.15, y: cy + 0.05, w: cellW - 0.3, h: cellH - 0.1,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
        margin: 0, valign: "middle",
      });
    });

    // Timer card
    addTextOnShape(s, "60 seconds \u2014 GO!", {
      x: 3.5, y: SAFE_BOTTOM - 0.5, w: 3.0, h: 0.42, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_FLUENCY);
  })();

  // ── SLIDE 4: LI/SC ─────────────────────────────────────────────────────
  liSlide(pres,
    ["We are learning to classify numbers as prime or composite by examining their factors."],
    [
      "I can determine whether a number is prime or composite by finding its factors.",
      "I can explain why a number is prime (only 2 factors: 1 and itself) or composite (more than 2 factors).",
      "I can use a systematic method to identify all primes up to 50.",
    ],
    NOTES_LISC, FOOTER);

  // ── SLIDE 5: Vocabulary (Stage 2) ──────────────────────────────────────
  contentSlide(pres, "Stage 2 | I Do", C.PRIMARY, "Key Vocabulary", [], NOTES_VOCAB, FOOTER, (s) => {
    // Two side-by-side definition cards
    const terms = [
      {
        word: "Prime Number",
        def: "Exactly 2 factors:\n1 and itself.\n\nExamples: 2, 3, 5, 7, 11, 13",
        note: "2 is the only even prime.",
        color: C.PRIMARY,
      },
      {
        word: "Composite Number",
        def: "MORE than 2 factors.\nCan be divided by numbers\nother than 1 and itself.\n\nExamples: 4, 6, 8, 9, 10, 12",
        note: "9 is odd but composite (3\u00D73).",
        color: C.SECONDARY,
      },
    ];
    terms.forEach((t, i) => {
      const cx = 0.5 + i * 4.6;
      addCard(s, cx, CONTENT_TOP + 0.05, 4.3, 2.55, { strip: t.color });
      addTextOnShape(s, t.word, {
        x: cx + 0.12, y: CONTENT_TOP + 0.15, w: 2.6, h: 0.34, rectRadius: 0.08,
        fill: { color: t.color },
      }, { fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText(t.def, {
        x: cx + 0.12, y: CONTENT_TOP + 0.6, w: 4.0, h: 1.3,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });
      s.addText(t.note, {
        x: cx + 0.12, y: CONTENT_TOP + 1.95, w: 4.0, h: 0.3,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });
    });

    // Special case banner
    addCard(s, 0.5, CONTENT_TOP + 2.8, 9.0, 0.85, { strip: C.ALERT });
    s.addText("Special Case: The Number 1", {
      x: 0.75, y: CONTENT_TOP + 2.87, w: 8.5, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0,
    });
    s.addText("1 has only ONE factor (itself). Prime requires exactly 2. So 1 is NEITHER prime NOR composite.", {
      x: 0.75, y: CONTENT_TOP + 3.17, w: 8.5, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
  });

  // ── SLIDE 6: I Do \u2014 Worked Example (Stage 2) ──────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Is 29 Prime or Composite?", { fontSize: 22, color: C.PRIMARY });

    // Test number banner
    addTextOnShape(s, "29", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 1.8, h: 0.65, rectRadius: 0.1,
      fill: { color: C.BG_DARK },
    }, { fontSize: 36, fontFace: FONT_H, color: C.WHITE, bold: true });

    // Steps on the left card
    addCard(s, 0.5, CONTENT_TOP + 0.8, 5.0, 3.2, { strip: C.PRIMARY });
    const steps = [
      "Test \u00F72: 29 is odd \u2192 NO",
      "Test \u00F73: 2+9=11, not \u00F73 \u2192 NO",
      "Test \u00F75: doesn\u2019t end in 0 or 5 \u2192 NO",
      "Test \u00F77: 7\u00D74=28, 7\u00D75=35 \u2192 NO",
      "\u221A29 \u2248 5.4 \u2192 only need to test up to 5",
      "All primes \u22645 tested \u2192 29 is PRIME",
    ];
    s.addText(steps.map((step, i) => ({
      text: step,
      options: { bullet: true, breakLine: i < steps.length - 1, fontSize: 12, color: C.CHARCOAL },
    })), {
      x: 0.75, y: CONTENT_TOP + 0.95, w: 4.5, h: 2.9,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Square root shortcut card on the right
    addCard(s, 5.8, CONTENT_TOP + 0.8, 3.7, 1.6, { strip: C.ACCENT });
    addTextOnShape(s, "Square Root Shortcut", {
      x: 5.95, y: CONTENT_TOP + 0.9, w: 2.5, h: 0.32, rectRadius: 0.08,
      fill: { color: C.ACCENT },
    }, { fontSize: 10, fontFace: FONT_H, color: C.WHITE, bold: true });
    s.addText("Only test primes up to \u221An.\nIf n = a \u00D7 b, one factor\nmust be \u2264 \u221An.", {
      x: 5.95, y: CONTENT_TOP + 1.35, w: 3.4, h: 0.9,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });

    // Verdict banner
    addTextOnShape(s, "29 is PRIME \u2014 only factors are 1 and 29", {
      x: 5.8, y: CONTENT_TOP + 2.6, w: 3.7, h: 0.5, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, { fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_IDO_WORKED);
  })();

  // ── SLIDES 7\u20138: CFU 1 \u2014 Is 51 Prime or Composite? (withReveal) ────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "CFU", { color: C.ALERT });
      addTitle(s, "Prime or Composite?", { color: C.ALERT });

      // Large number display
      addTextOnShape(s, "51", {
        x: 3.0, y: CONTENT_TOP + 0.1, w: 4.0, h: 1.2, rectRadius: 0.15,
        fill: { color: C.BG_DARK },
      }, { fontSize: 60, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Instruction
      addTextOnShape(s, "Show Me Boards \u2014 Prime or Composite? Show your working.", {
        x: 1.5, y: CONTENT_TOP + 1.6, w: 7.0, h: 0.42, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true });

      // Hint card
      addCard(s, 2.0, CONTENT_TOP + 2.3, 6.0, 1.0, { strip: C.PRIMARY });
      s.addText([
        { text: "Hint: ", options: { bold: true, fontSize: 12, color: C.PRIMARY } },
        { text: "Use your divisibility rules! Test \u00F72, \u00F73, \u00F75. What does the digit sum tell you?", options: { fontSize: 12, color: C.CHARCOAL } },
      ], {
        x: 2.2, y: CONTENT_TOP + 2.5, w: 5.5, h: 0.6,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_CFU1);
      return s;
    },
    (slide) => {
      // Cover the "Show Me Boards" bar from the question slide
      slide.addShape("rect", {
        x: 1.3, y: CONTENT_TOP + 1.5, w: 7.4, h: 0.6,
        fill: { color: C.BG_LIGHT },
      });

      // Reveal: answer
      addTextOnShape(slide, "COMPOSITE", {
        x: 3.0, y: CONTENT_TOP + 1.6, w: 4.0, h: 0.55, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true });

      addCard(slide, 2.0, CONTENT_TOP + 2.3, 6.0, 1.2, { strip: C.ALERT });
      slide.addText([
        { text: "Digit sum: 5 + 1 = 6", options: { breakLine: true, bold: true, fontSize: 13, color: C.ALERT } },
        { text: "6 \u00F7 3 = 2 \u2192 51 IS divisible by 3", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "51 = 3 \u00D7 17 \u2192 factors: 1, 3, 17, 51", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "More than 2 factors \u2192 COMPOSITE", options: { fontSize: 12, color: C.CHARCOAL, bold: true } },
      ], {
        x: 2.2, y: CONTENT_TOP + 2.42, w: 5.5, h: 1.0,
        fontFace: FONT_B, margin: 0, valign: "top",
      });
    }
  );

  // ── SLIDES 9\u201310: We Do 1 \u2014 Classify 37, 42, 53 (withReveal) ───────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Classify These Numbers", { fontSize: 22, color: C.SECONDARY });

      const nums = [
        { value: "37", color: C.PRIMARY },
        { value: "42", color: C.SECONDARY },
        { value: "53", color: C.ACCENT },
      ];
      nums.forEach((n, i) => {
        const cx = 0.5 + i * 3.15;
        addCard(s, cx, CONTENT_TOP + 0.1, 2.85, 1.8, { strip: n.color });
        s.addText(n.value, {
          x: cx, y: CONTENT_TOP + 0.2, w: 2.85, h: 1.0,
          fontSize: 44, fontFace: FONT_H, color: C.CHARCOAL,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
        s.addText("?", {
          x: cx, y: CONTENT_TOP + 1.2, w: 2.85, h: 0.5,
          fontSize: 24, fontFace: FONT_H, color: C.MUTED,
          align: "center", valign: "middle", margin: 0,
        });
      });

      addTextOnShape(s, "Test each number \u2014 Prime or Composite?", {
        x: 2.0, y: CONTENT_TOP + 2.2, w: 6.0, h: 0.42, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (slide) => {
      const answers = [
        { value: "37", verdict: "PRIME", reason: "\u221A37\u22486.1: test 2,3,5\nOdd, sum=10, no 0/5\nNo factors found", pass: true, color: C.PRIMARY },
        { value: "42", verdict: "COMPOSITE", reason: "Even \u2192 \u00F72\n42 = 2 \u00D7 21\nFactors: 1,2,3,6,7,14,21,42", pass: false, color: C.SECONDARY },
        { value: "53", verdict: "PRIME", reason: "\u221A53\u22487.3: test 2,3,5,7\nOdd, sum=8, no 0/5\n53\u00F77\u22487.6 \u2192 no", pass: true, color: C.ACCENT },
      ];
      answers.forEach((a, i) => {
        const cx = 0.5 + i * 3.15;
        addTextOnShape(slide, a.verdict, {
          x: cx + 0.4, y: CONTENT_TOP + 1.2, w: 2.05, h: 0.42, rectRadius: 0.08,
          fill: { color: a.pass ? C.SUCCESS : C.ALERT },
        }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });
        slide.addText(a.reason, {
          x: cx + 0.1, y: CONTENT_TOP + 1.7, w: 2.65, h: 0.8,
          fontSize: 8, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
        });
      });
    }
  );

  // ── SLIDES 11\u201312: We Do 2 \u2014 Primes between 20 and 40 (withReveal) ─────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Find All Primes: 20 to 40", { fontSize: 22, color: C.SECONDARY });

      // Number grid 20\u201339 (4 rows \u00D7 5 cols)
      const gridX = 0.5;
      const gridY = CONTENT_TOP + 0.15;
      const cellW = 1.7;
      const cellH = 0.72;
      for (let n = 20; n <= 39; n++) {
        const i = n - 20;
        const col = i % 5;
        const row = Math.floor(i / 5);
        const cx = gridX + col * (cellW + 0.12);
        const cy = gridY + row * (cellH + 0.1);
        addCard(s, cx, cy, cellW, cellH, { strip: C.PRIMARY });
        s.addText(String(n), {
          x: cx, y: cy + 0.05, w: cellW, h: cellH - 0.1,
          fontSize: 20, fontFace: FONT_H, color: C.CHARCOAL,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
      }

      addTextOnShape(s, "Test every number \u2014 mark P (prime) or C (composite)", {
        x: 1.5, y: SAFE_BOTTOM - 0.5, w: 7.0, h: 0.42, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO2);
      return s;
    },
    (slide) => {
      // Overlay prime indicators on the grid
      const primes = [23, 29, 31, 37];
      const gridX = 0.5;
      const gridY = CONTENT_TOP + 0.15;
      const cellW = 1.7;
      const cellH = 0.72;

      for (let n = 20; n <= 39; n++) {
        const i = n - 20;
        const col = i % 5;
        const row = Math.floor(i / 5);
        const cx = gridX + col * (cellW + 0.12);
        const cy = gridY + row * (cellH + 0.1);
        const isPrime = primes.includes(n);

        // Small badge in corner of each cell
        addTextOnShape(slide, isPrime ? "P" : "C", {
          x: cx + cellW - 0.42, y: cy + 0.04, w: 0.35, h: 0.25, rectRadius: 0.06,
          fill: { color: isPrime ? C.SUCCESS : C.CHARCOAL },
        }, { fontSize: 9, fontFace: FONT_H, color: C.WHITE, bold: true });
      }

      // Summary banner
      addTextOnShape(slide, "Primes: 23, 29, 31, 37  (4 primes in 20\u201339)", {
        x: 1.5, y: SAFE_BOTTOM - 0.5, w: 7.0, h: 0.42, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDES 13\u201314: Hinge Question (withReveal) ────────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "Hinge Question", { color: C.ALERT, w: 2.2 });
      addTitle(s, "Which is a Prime Number?", { color: C.ALERT });

      const options = [
        { letter: "A", value: "39", color: C.PRIMARY },
        { letter: "B", value: "47", color: C.SECONDARY },
        { letter: "C", value: "51", color: C.ACCENT },
        { letter: "D", value: "57", color: C.SUCCESS },
      ];
      options.forEach((opt, i) => {
        const ox = 0.5 + i * 2.3;
        addCard(s, ox, CONTENT_TOP + 0.2, 2.0, 1.8, { strip: opt.color });
        addTextOnShape(s, opt.letter, {
          x: ox + 0.15, y: CONTENT_TOP + 0.35, w: 0.45, h: 0.45, rectRadius: 0.22,
          fill: { color: opt.color },
        }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
        s.addText(opt.value, {
          x: ox, y: CONTENT_TOP + 0.9, w: 2.0, h: 0.8,
          fontSize: 32, fontFace: FONT_H, color: C.CHARCOAL,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
      });

      addTextOnShape(s, "Hold up 1, 2, 3, or 4 fingers", {
        x: 2.5, y: CONTENT_TOP + 2.3, w: 5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_HINGE);
      return s;
    },
    (slide) => {
      // Cover the instruction bar and show answer
      addTextOnShape(slide, "B \u2014 47 is PRIME", {
        x: 1.5, y: CONTENT_TOP + 2.2, w: 7, h: 0.55, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
      slide.addText("\u221A47 \u2248 6.9 \u2192 test 2, 3, 5: odd, sum=11, no 0/5  \u2714", {
        x: 1.5, y: CONTENT_TOP + 2.85, w: 7, h: 0.35,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      slide.addText("A) 39=3\u00D713  (3+9=12, \u00F73)     C) 51=3\u00D717  (5+1=6, \u00F73)     D) 57=3\u00D719  (5+7=12, \u00F73)", {
        x: 1.0, y: CONTENT_TOP + 3.2, w: 8, h: 0.25,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });
    }
  );

  // ── SLIDE 15: You Do (Stage 4) ──────────────────────────────────────
  contentSlide(pres, "Stage 4 | You Do", C.ALERT, "Independent Practice: Prime or Composite?", [], NOTES_YOUDO, FOOTER, (s) => {
    addCard(s, 0.5, CONTENT_TOP, 5.5, 2.0, { strip: C.ALERT });
    const instructions = [
      { label: "For each number:", text: "Test divisibility systematically." },
      { label: "Write:", text: "P (prime) or C (composite)." },
      { label: "Explain:", text: "List the factors you found (or didn\u2019t find)." },
    ];
    instructions.forEach((st, i) => {
      s.addText([
        { text: st.label + " ", options: { bold: true, fontSize: 12, color: C.ALERT } },
        { text: st.text, options: { fontSize: 12, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: CONTENT_TOP + 0.15 + i * 0.55, w: 5.0, h: 0.4,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Sample numbers on right (5 rows x 2 cols)
    const nums = [23, 36, 41, 51, 67, 72, 83, 91, 97, 119];
    nums.forEach((n, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      addTextOnShape(s, String(n), {
        x: 6.3 + col * 1.7, y: CONTENT_TOP + 0.1 + row * 0.6, w: 1.4, h: 0.48, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

    addTextOnShape(s, "Use your SR1 Worksheet", {
      x: 6.5, y: SAFE_BOTTOM - 0.55, w: 3.0, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });
  });

  // ── SLIDE 16: Exit Ticket (Stage 5) ─────────────────────────────────
  exitTicketSlide(pres, [
    "Is 87 prime or composite? Show your divisibility testing.",
    "Explain why the number 1 is neither prime nor composite.",
    "List all the prime numbers between 40 and 50.",
  ], NOTES_EXIT, FOOTER);

  // ── SLIDE 17: Resources ─────────────────────────────────────────────
  addResourceSlide(pres, [
    {
      name: "SR1 \u2014 Prime & Composite Worksheet",
      fileName: "SR1_Prime_Composite_Worksheet.pdf",
      description: "Independent practice \u2014 classify 10 numbers with factor testing.",
    },
    {
      name: "SR2 \u2014 Prime & Composite Answer Key",
      fileName: "SR2_Prime_Composite_Answers.pdf",
      description: "Answer key for SR1. Teacher reference.",
    },
    {
      name: "EXT1 \u2014 Goldbach\u2019s Conjecture Investigation",
      fileName: "EXT1_Goldbach_Investigation.pdf",
      description: "Extending: every even number >2 as a sum of two primes.",
    },
  ], { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // ── SLIDE 18: Closing ───────────────────────────────────────────────
  closingSlide(pres,
    "Tell your partner one number you tested today \u2014 was it prime or composite? Explain WHY using the factor-count definition. 30 seconds.",
    [
      "SC1: I can determine whether a number is prime or composite by finding its factors.",
      "SC2: I can explain why \u2014 prime has exactly 2 factors, composite has more than 2.",
      "SC3: I can systematically find all primes in a range.",
      "Tomorrow: Prime factorisation \u2014 breaking composite numbers into prime building blocks.",
    ],
    NOTES_CLOSING);

  // ── Write PPTX ──────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: OUT_DIR + "/FM_Lesson3_Prime_Composite.pptx" });
  console.log("PPTX written to " + OUT_DIR);

  // ── Generate companion PDFs ──────────────────────────────────────────
  await generateWorksheet();
  await generateAnswerKey();
  await generateExtendingPdf();
  console.log("All PDFs generated.");
}

// ── PDF: SR1 \u2014 Prime & Composite Worksheet ──────────────────────────────────

async function generateWorksheet() {
  const doc = createPdf({ title: "Prime & Composite Practice Worksheet" });

  let y = addPdfHeader(doc, "Prime & Composite Numbers", {
    subtitle: "SR1 \u2014 Supporting Resource",
    color: C.PRIMARY,
    lessonInfo: "Session 3 of 5 | Factors & Multiples | Year 5/6 Maths",
  });

  y = addTipBox(doc, "A PRIME number has exactly 2 factors (1 and itself). A COMPOSITE number has more than 2 factors. Remember: 1 is NEITHER prime nor composite.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Section A: Classify Each Number", y, { color: C.PRIMARY });

  const numbers = [23, 36, 41, 51, 67, 72, 83, 91, 97, 119];
  numbers.forEach((n, i) => {
    y = addProblem(doc, i + 1, `Is ${n} prime or composite? Show your factor testing.`, y, {
      writeLines: [
        { label: "Divisibility tests:" },
        { label: "Classification (P or C):" },
        { label: "Reason:" },
      ],
      color: C.PRIMARY,
    });
  });

  y = addSectionHeading(doc, "Section B: Challenge (SC3)", y, { color: C.ACCENT });
  y = addBodyText(doc, "List all prime numbers between 1 and 50. Use the systematic elimination method: cross out multiples of 2 (except 2), then multiples of 3 (except 3), then multiples of 5 (except 5), then multiples of 7 (except 7).", y);
  y = addLinedArea(doc, y + 5, 4);

  addPdfFooter(doc, "Session 3 of 5 | Factors & Multiples | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR1_Prime_Composite_Worksheet.pdf");
  console.log("  SR1 worksheet written.");
}

// ── PDF: SR2 \u2014 Answer Key ────────────────────────────────────────────────────

async function generateAnswerKey() {
  const doc = createPdf({ title: "Prime & Composite Answer Key" });

  let y = addPdfHeader(doc, "Prime & Composite \u2014 Answer Key", {
    subtitle: "SR2 \u2014 Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: "Session 3 of 5 | Factors & Multiples | Year 5/6 Maths",
    showNameDate: false,
  });

  y = addSectionHeading(doc, "Section A: Answers", y, { color: C.PRIMARY });

  const answers = [
    { n: 23, cls: "PRIME", reason: "Odd, 2+3=5 (not \u00F73), no 0/5, \u221A23\u22484.8 \u2014 tested 2,3. Only factors: 1, 23." },
    { n: 36, cls: "COMPOSITE", reason: "Even \u2192 36\u00F72=18. Factors: 1, 2, 3, 4, 6, 9, 12, 18, 36." },
    { n: 41, cls: "PRIME", reason: "Odd, 4+1=5 (not \u00F73), no 0/5, \u221A41\u22486.4 \u2014 tested 2,3,5. Only factors: 1, 41." },
    { n: 51, cls: "COMPOSITE", reason: "5+1=6, 6\u00F73=2 \u2192 51=3\u00D717. Factors: 1, 3, 17, 51." },
    { n: 67, cls: "PRIME", reason: "Odd, 6+7=13 (not \u00F73), no 0/5, 67\u00F77\u22489.6. \u221A67\u22488.2 \u2014 tested 2,3,5,7. Only factors: 1, 67." },
    { n: 72, cls: "COMPOSITE", reason: "Even \u2192 72\u00F72=36. Factors: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72." },
    { n: 83, cls: "PRIME", reason: "Odd, 8+3=11 (not \u00F73), no 0/5, 83\u00F77\u224811.9. \u221A83\u22489.1 \u2014 tested 2,3,5,7. Only factors: 1, 83." },
    { n: 91, cls: "COMPOSITE", reason: "Odd, 9+1=10 (not \u00F73), no 0/5. But 91\u00F77=13 \u2192 91=7\u00D713. Factors: 1, 7, 13, 91." },
    { n: 97, cls: "PRIME", reason: "Odd, 9+7=16 (not \u00F73), no 0/5, 97\u00F77\u224813.9. \u221A97\u22489.8 \u2014 tested 2,3,5,7. Only factors: 1, 97." },
    { n: 119, cls: "COMPOSITE", reason: "Odd, 1+1+9=11 (not \u00F73), no 0/5. But 119\u00F77=17 \u2192 119=7\u00D717. Factors: 1, 7, 17, 119." },
  ];

  answers.forEach((a, i) => {
    y = addProblem(doc, i + 1, `${a.n}: ${a.cls}`, y, {
      writeLines: [
        { label: "Reason:", answer: a.reason },
      ],
      color: C.PRIMARY,
    });
  });

  y = addSectionHeading(doc, "Section B: Challenge Answer", y, { color: C.ACCENT });
  y = addBodyText(doc, "Primes 1\u201350: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47 (15 primes).", y);
  y = addBodyText(doc, "Method (Sieve of Eratosthenes): Start with all numbers 2\u201350. Cross out multiples of 2 (4,6,8\u2026), then multiples of 3 (6,9,12\u2026), then multiples of 5 (10,15,20\u2026), then multiples of 7 (14,21,28\u2026). Since \u221A50 \u2248 7.1, you only need to sieve up to 7. All remaining numbers are prime.", y);

  addPdfFooter(doc, "Session 3 of 5 | Factors & Multiples | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR2_Prime_Composite_Answers.pdf");
  console.log("  SR2 answer key written.");
}

// ── PDF: EXT1 \u2014 Goldbach\u2019s Conjecture Investigation ──────────────────────────

async function generateExtendingPdf() {
  const doc = createPdf({ title: "Goldbach's Conjecture Investigation" });

  let y = addPdfHeader(doc, "Goldbach\u2019s Conjecture", {
    subtitle: "EXT1 \u2014 Extending Investigation",
    color: C.ACCENT,
    lessonInfo: "Session 3 of 5 | Factors & Multiples | Year 5/6 Maths",
  });

  y = addTipBox(doc, "This is a self-guided investigation. Read each section carefully \u2014 the explanations will teach you everything you need. Your teacher is working with other students, so the instructions below are your guide.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "What is Goldbach\u2019s Conjecture?", y, { color: C.PRIMARY });
  y = addBodyText(doc, "In 1742, a mathematician named Christian Goldbach made a bold claim:", y);
  y = addTipBox(doc, "\"Every even number greater than 2 can be written as the sum of two prime numbers.\"", y, { color: C.PRIMARY });
  y = addBodyText(doc, "For example: 8 = 3 + 5 (both 3 and 5 are prime). Another way: 8 = 8? No \u2014 8 is not prime. So 3 + 5 is the way.\n\nAnother example: 10 = 3 + 7 or 10 = 5 + 5. Both work!\n\nNo one has ever proved this conjecture \u2014 but no one has found a number where it fails either. Computers have checked every even number up to 4 \u00D7 10\u00B9\u2078 and it ALWAYS works. That\u2019s your job today: test it yourself.", y);

  y = addSectionHeading(doc, "Prime Numbers You\u2019ll Need", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Here are the primes up to 50 (you\u2019ll need these as your reference):\n2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47", y);

  y = addSectionHeading(doc, "Your Investigation", y, { color: C.ACCENT });
  y = addBodyText(doc, "For each even number below, find at least ONE way to write it as the sum of two prime numbers. If you can find more than one way, write all the ways you find.", y);

  const evenNums = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50];
  evenNums.forEach((n, i) => {
    y = addProblem(doc, i + 1, `${n} = _____ + _____`, y, {
      writeLines: [
        { label: "Other ways:" },
      ],
      color: C.ACCENT,
    });
  });

  y = addSectionHeading(doc, "Challenge Questions", y, { color: C.ALERT });
  y = addBodyText(doc, "1. Which even number between 4 and 50 can be written as a sum of two primes in the MOST different ways? How many ways did you find?", y);
  y = addLinedArea(doc, y + 3, 3);
  y = addBodyText(doc, "2. Can any ODD number be written as the sum of two primes? Try 9, 15, and 21. What do you notice? (Hint: what happens when you add two odd numbers?)", y);
  y = addLinedArea(doc, y + 3, 3);
  y = addBodyText(doc, "3. Why do you think mathematicians have been unable to PROVE Goldbach\u2019s Conjecture, even though it seems to always work? Write your thoughts.", y);
  y = addLinedArea(doc, y + 3, 3);

  addPdfFooter(doc, "Session 3 of 5 | Factors & Multiples | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/EXT1_Goldbach_Investigation.pdf");
  console.log("  EXT1 extending investigation written.");
}

build().catch(console.error);
