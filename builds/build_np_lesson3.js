// Lesson 3 of 5: Simplifying Calculations with Factors
// Year 5/6 Mathematics — Number Properties
// Uses shared helpers from pv_helpers.js and pv_palette.js

"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");

const {
  C, FONT_H, FONT_B, STAGE_COLORS,
  SAFE_BOTTOM, CONTENT_TOP,
  makeShadow, makeCardShadow,
  addTopBar, addBadge, addStageBadge, addTitle, addCard, addFooter,
  addTextOnShape,
  withReveal,
  titleSlide, liSlide, contentSlide, workedExSlide, cfuSlide,
  exitTicketSlide, closingSlide,
} = require("../themes/pv_helpers");

const OUT_DIR = "output/NP_Lesson3_Simplifying_Calculations";

const FOOTER = "Session 3 of 5 | Number Properties | Year 5/6 Maths";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes strings (kept as constants to keep build() readable)
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `SAY:
\u2022 "Welcome to Session 3 of our Number Properties unit. Last session we explored how numbers can be broken into factor pairs. Today we are going to USE those factors to make multiplication much easier."
\u2022 "By the end of today you will be able to look at a tricky multiplication like 25 \u00d7 32 and rearrange it so you can do it in your head."

DO:
\u2022 Display the title slide while students are settling.
\u2022 Direct students' attention to the subtitle \u2014 "Rearranging factors to make multiplication easier" is the key message for today.

TEACHER NOTES:
This lesson is the conceptual heart of the unit. Sessions 1\u20132 built fluency with factors and multiples; today students apply that knowledge strategically. The commutative and associative properties are not just abstract rules \u2014 they are practical tools for mental computation. Students who master factor rearrangement gain a powerful strategy that transfers to algebra and proportional reasoning. VTLM 2.0 element: Strategic competence \u2014 choosing efficient strategies.

Pacing overview (60 min):
\u2022 Daily Review (Slides 2\u20133): 8 min
\u2022 LI/SC (Slide 4): 2 min
\u2022 I Do \u2014 Big Idea + Worked Examples (Slides 5\u20137): 12 min
\u2022 CFU 1 (Slide 8): 3 min
\u2022 We Do (Slides 9\u201310): 10 min
\u2022 CFU 2 (Slide 11): 3 min
\u2022 You Do (Slide 12): 15 min
\u2022 Exit Ticket + Closing (Slides 13\u201314): 7 min

WATCH FOR:
\u2022 Students who seem disengaged during title \u2014 preview with: "Who thinks they can do 25 \u00d7 32 in their head right now? By the end of today, you all will."
\u2022 Students who did not complete last session's exit ticket \u2014 check their factor pair fluency during Daily Review.

[Maths: Session 3 | VTLM 2.0: Strategic competence]`;

const NOTES_DR1 = `SAY:
\u2022 "Let\u2019s warm up our multiplication muscles. Three questions on your whiteboard. Show Me when I say."
\u2022 Q1: "253 \u00d7 4 using doubling. What is 253 doubled? And then doubled again?" Walk through: 253 \u00d7 2 = 506, 506 \u00d7 2 = 1 012.
\u2022 Q2: "324 \u00d7 8 using place value partitioning. Split 324 into hundreds, tens, and ones first." Walk through: 300\u00d78 = 2 400, 20\u00d78 = 160, 4\u00d78 = 32, total = 2 592.
\u2022 Q3: "48 \u00d7 5 \u2014 can you find a shortcut?" Pause, then: "What if I think of \u00d75 as \u00d710 \u00f7 2? 48 \u00d7 10 = 480, 480 \u00f7 2 = 240."

DO:
\u2022 Write each question on the board one at a time. Give 60\u201390 seconds per question.
\u2022 After each Show Me, select a non-volunteer to explain their strategy.
\u2022 On Q3, celebrate ANY valid shortcut (halving, reordering, etc.) \u2014 this previews today\u2019s lesson.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
\u2022 "Boards up in 3, 2, 1 \u2014 Show Me!" for each question.
\u2022 Scan for correct answers: Q1 = 1 012, Q2 = 2 592, Q3 = 240.
\u2022 Look for strategy evidence: did students show doubling steps for Q1? Partitioning for Q2?
PROCEED: If \u2265 80% show correct answers with visible working, move to Slide 3.
PIVOT: If students struggle with Q1 (doubling), pause and model: "253 \u00d7 2 means 250 \u00d7 2 + 3 \u00d7 2 = 500 + 6 = 506. Now 506 \u00d7 2 = 500 \u00d7 2 + 6 \u00d7 2 = 1 000 + 12 = 1 012." The doubling-as-partitioning scaffold helps students who lack automatic recall. Re-check with a simpler example (126 \u00d7 4).

TEACHER NOTES:
The daily review deliberately revisits three multiplication strategies from previous sessions: doubling (Session 1), place value partitioning (Session 1), and the \u00d75 shortcut (Session 2). Q3 is the critical bridge \u2014 the \u00d710\u00f72 shortcut is essentially rearranging factors (5 = 10 \u00f7 2), which is today\u2019s big idea at an intuitive level. Naming this connection explicitly after students solve Q3 creates a "hook" for the formal instruction ahead. VTLM 2.0 element: Retrieval practice \u2014 spaced recall of prior strategies.

WATCH FOR:
\u2022 Students who get the right answer but cannot explain their strategy \u2014 push: "Tell me what you did step by step."
\u2022 Students who use the standard algorithm for all three \u2014 they may lack mental strategies. Target them during I Do for explicit strategy modelling.

[Maths: Stage 1 \u2014 Daily Review, multiplication strategies | VTLM 2.0: Retrieval practice]`;

const NOTES_DR2 = `SAY:
\u2022 "Two more warm-up questions to check your factor knowledge from last session."
\u2022 Q4: "List ALL factor pairs of 30. How many pairs can you find?" Give 60 seconds.
\u2022 After Show Me: "Let\u2019s check: 1 \u00d7 30, 2 \u00d7 15, 3 \u00d7 10, 5 \u00d7 6. That\u2019s four pairs. Did anyone miss one?"
\u2022 Q5: "Is 47 prime or composite? How do you know?" After Show Me: "47 is prime \u2014 its only factors are 1 and 47. We tested 2, 3, 5, 7 and none divide evenly."

DO:
\u2022 For Q4, write factor pairs on the board as students share them. Emphasise systematic listing (start from 1, work upward).
\u2022 For Q5, briefly model the divisibility test: "I check 2 (not even), 3 (4+7=11, not divisible), 5 (doesn\u2019t end in 0 or 5), 7 (47\u00f77 \u2248 6.7, no). Since 7\u00b2 = 49 > 47, I can stop. Prime."

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
\u2022 "Boards up \u2014 Show Me your factor pairs for 30!"
\u2022 Count pairs on each board. Most students should get 3\u20134 pairs; all four pairs is strong.
\u2022 For Q5: "Thumbs up for prime, thumbs down for composite. Ready \u2014 show me!"
PROCEED: If \u2265 75% get at least 3 factor pairs of 30 and correctly identify 47 as prime, move to LI/SC.
PIVOT: If students miss factor pairs systematically (e.g., forget 2 \u00d7 15 or 3 \u00d7 10), they lack systematic listing. Reteach from a different angle: "Start at 1: does 1 go into 30? Yes \u2014 1 \u00d7 30. Does 2? Yes \u2014 2 \u00d7 15. Does 3? Yes \u2014 3 \u00d7 10. Does 4? No. Does 5? Yes \u2014 5 \u00d7 6. Does 6? We already have 6 \u00d7 5. Stop." This systematic approach prevents missed pairs. Re-check with factor pairs of 24.

TEACHER NOTES:
Factor pair fluency is prerequisite to today\u2019s lesson \u2014 students cannot rearrange factors they cannot identify. Q4 tests this directly. The factor pairs of 30 (1\u00d730, 2\u00d715, 3\u00d710, 5\u00d76) are particularly relevant because 30 appears in several of today\u2019s practice problems. Q5 (primality) connects to the idea that prime numbers CANNOT be broken into smaller factors \u2014 a constraint students need to understand when choosing which number to decompose. VTLM 2.0 element: Prerequisite activation \u2014 ensuring readiness for new learning.

WATCH FOR:
\u2022 Students who list 1 \u00d7 30 and 5 \u00d7 6 but miss 2 \u00d7 15 and 3 \u00d7 10 \u2014 they are not being systematic. Teach the "start from 1, go up" method.
\u2022 Students who say 47 is composite because "it\u2019s a big number" \u2014 address the misconception that size determines primality.

[Maths: Stage 1 \u2014 Daily Review, factor pairs and primality | VTLM 2.0: Prerequisite activation]`;

const NOTES_LISC = `SAY:
\u2022 "Here is what we are learning today and how you will know you\u2019ve got it."
\u2022 Read the Learning Intention aloud. Then read each Success Criterion, pausing to explain:
  \u2014 SC1: "Breaking a number into factors means finding two or more numbers that multiply to give it. You did this last session with factor pairs."
  \u2014 SC2: "Friendly pairs are combinations that make easy numbers like 10, 20, 25, 50, or 100."
  \u2014 SC3: "Choosing the most efficient strategy means you don\u2019t just find ANY rearrangement \u2014 you find the BEST one."

DO:
\u2022 Point to each criterion as you read it.
\u2022 Leave up briefly for students to note in workbooks if your school requires.

TEACHER NOTES:
The three success criteria form a progression: identify (SC1) \u2192 rearrange (SC2) \u2192 evaluate (SC3). SC3 is the highest cognitive demand \u2014 it asks students to compare multiple valid rearrangements and justify their choice. Not all students will reach SC3 today, and that is expected. The "explain why it works" component of SC3 connects to the mathematical properties (commutative, associative) introduced on Slide 5. VTLM 2.0 element: Making Learning Visible \u2014 clear success criteria.

WATCH FOR:
\u2022 Students who copy criteria without understanding \u2014 do a quick verbal check: "What does \u2018friendly pair\u2019 mean? Give me an example."

[Maths: Stage 2 | VTLM 2.0: Making Learning Visible]`;

const NOTES_BIG_IDEA = `SAY:
\u2022 "Before we start simplifying, I need you to understand WHY this works. There are two mathematical properties that make it possible."
\u2022 "First: the Commutative Property. This says the ORDER of multiplication doesn\u2019t matter. 3 \u00d7 5 gives the same answer as 5 \u00d7 3. You\u2019ve known this since Year 2 \u2014 but now we\u2019re going to USE it strategically."
\u2022 "Second: the Associative Property. This says the GROUPING doesn\u2019t matter. Whether I do (2 \u00d7 3) \u00d7 4 or 2 \u00d7 (3 \u00d7 4), I get the same answer."
\u2022 "Put these together: if I have a multiplication like 15 \u00d7 16, I can BREAK 15 into 3 \u00d7 5 and 16 into 2 \u00d7 8, then REARRANGE those factors to find pairs that are easy to multiply. That\u2019s our strategy for today."

DO:
\u2022 Point to the visual examples on the right as you explain each property.
\u2022 Write "Commutative: order" and "Associative: grouping" on the board as anchor vocabulary.
\u2022 Have students say each property name chorally.

TEACHER NOTES:
Students do not need to memorise the property names \u2014 they need to understand the IDEA that order and grouping can change without affecting the product. The visual examples on the right make this concrete. The transition sentence ("We can BREAK numbers into factors and REARRANGE them") is the key conceptual bridge between factor knowledge (Sessions 1\u20132) and today\u2019s strategy. DECIDE framework: this is the "Connect" phase \u2014 linking prior knowledge to new learning explicitly. VTLM 2.0 element: Conceptual understanding \u2014 mathematical properties as tools.

WATCH FOR:
\u2022 Students who nod but cannot explain \u2014 quick check: "Give me an example of the commutative property using two numbers."
\u2022 Students who confuse commutative with associative \u2014 use the anchor words: "Order vs Grouping."

[Maths: Stage 2 \u2014 Commutative and Associative Properties | VTLM 2.0: Conceptual understanding]`;

const NOTES_WE1 = `SAY:
\u2022 "Watch me carefully. I\u2019m going to simplify 15 \u00d7 16 step by step."
\u2022 "Step 1: I break down the numbers into factors. 15 = 3 \u00d7 5 and 16 = 2 \u00d7 8. Now I have four factors: 3, 5, 2, 8."
\u2022 Think aloud: "I\u2019m scanning these factors for pairs that make 10, 20, 25, or 100 \u2014 these are my \u2018friendly numbers\u2019 because they make mental calculation easy."
\u2022 "Step 2: I spot that 5 \u00d7 2 = 10. That\u2019s my friendly pair!"
\u2022 "Step 3: I rearrange so the friendly pair is together: (5 \u00d7 2) \u00d7 (3 \u00d7 8) = 10 \u00d7 24."
\u2022 "Step 4: 10 \u00d7 24 = 240. Done \u2014 in my head!"
\u2022 "Let me verify: 15 \u00d7 16. I know 15 \u00d7 16 = 15 \u00d7 10 + 15 \u00d7 6 = 150 + 90 = 240. Same answer!"

DO:
\u2022 Write each step on the board as you say it. Use different coloured markers for the "break down" and "rearrange" steps.
\u2022 Circle the friendly pair (5 \u00d7 2) in a bright colour.
\u2022 Point to the visual on the right showing the factor rearrangement.

TEACHER NOTES:
This is the anchor worked example \u2014 the most important modelling moment of the lesson. The think-aloud ("I\u2019m scanning for pairs that make 10, 20, 25, or 100") makes the metacognitive strategy explicit. The verification step is essential \u2014 it shows students that rearranging factors does not change the answer, building trust in the method. 15 \u00d7 16 is chosen because (a) neither factor is immediately "easy," (b) the 5 \u00d7 2 = 10 pair is readily visible, and (c) the remaining multiplication (10 \u00d7 24) is genuinely simple. VTLM 2.0 element: Explicit teaching \u2014 modelling with think-aloud.

WATCH FOR:
\u2022 Students who want to use the standard algorithm instead \u2014 acknowledge it works but emphasise: "This strategy is about being EFFICIENT. Which would you rather calculate: 15 \u00d7 16 or 10 \u00d7 24?"
\u2022 Students who are confused about how to "break down" \u2014 connect to last session: "Remember factor pairs? That\u2019s all we\u2019re doing."

[Maths: Stage 2 \u2014 Worked Example 1, factor rearrangement | VTLM 2.0: Explicit teaching]`;

const NOTES_WE2 = `SAY:
\u2022 "Let\u2019s try another one. Simplify 25 \u00d7 32."
\u2022 "Step 1: I look at 25 \u2014 do I need to break it down? 25 is already a useful number. But 32 can be broken into 4 \u00d7 8."
\u2022 Think aloud: "Now I have 25, 4, and 8. I\u2019m scanning for friendly pairs... 25 \u00d7 4 = 100! That\u2019s one of my FAVOURITE friendly pairs \u2014 it makes 100 instantly!"
\u2022 "Step 2: Rearrange: (25 \u00d7 4) \u00d7 8 = 100 \u00d7 8."
\u2022 "Step 3: 100 \u00d7 8 = 800. Done!"
\u2022 "Notice: I didn\u2019t need to break BOTH numbers down. Sometimes only one needs factoring."

DO:
\u2022 Write the steps on the board. Circle 25 \u00d7 4 = 100 prominently.
\u2022 Start a "Friendly Pairs" reference list on the board: 5 \u00d7 2 = 10, 25 \u00d7 4 = 100, 5 \u00d7 4 = 20, 50 \u00d7 2 = 100.
\u2022 Ask: "Can anyone think of other friendly pairs?" Add to the list.

TEACHER NOTES:
This example introduces an important nuance: you don\u2019t always break BOTH numbers down. Strategic decomposition means choosing which number to factorise based on what creates the best friendly pair. 25 \u00d7 4 = 100 is a "power pair" that students should memorise \u2014 it appears in many real-world contexts (quarters to dollars, 25% as a fraction). The "Friendly Pairs" reference list on the board becomes a classroom resource for the rest of the unit. VTLM 2.0 element: Strategic competence \u2014 selective decomposition.

WATCH FOR:
\u2022 Students who break 25 into 5 \u00d7 5 \u2014 this works but misses the more efficient 25 \u00d7 4 pair. Point out: "5 \u00d7 5 \u00d7 4 \u00d7 8 gives 20 \u00d7 40 = 800, which also works. But spotting 25 \u00d7 4 directly is faster."
\u2022 Students who ask "How do I know which number to break?" \u2014 answer: "Look for a factor in one number that pairs nicely with the other number. 32 has a factor of 4, and 25 \u00d7 4 = 100."

[Maths: Stage 2 \u2014 Worked Example 2, 25 \u00d7 4 = 100 power pair | VTLM 2.0: Strategic competence]`;

const NOTES_CFU1 = `SAY:
\u2022 "Time to check your understanding. Look at this question carefully."
\u2022 Read the question aloud. Give 30 seconds of thinking time.
\u2022 "I\u2019m going to count down from 3. On 1, hold up 1 finger for A, 2 fingers for B, 3 fingers for C."
\u2022 "3, 2, 1 \u2014 VOTE!"
\u2022 After voting: "Interesting \u2014 both A and B are CORRECT rearrangements! Both give 420. But B is the BEST because it creates \u00d710, which is the easiest multiplication to do mentally. C isn\u2019t really a rearrangement \u2014 it\u2019s just rewriting 12 as 3 \u00d7 4."

DO:
\u2022 Count fingers carefully \u2014 note who votes C (they may not understand what "rearrangement" means).
\u2022 After reveal, verify both: A = 20 \u00d7 21 = 420, B = 42 \u00d7 10 = 420, C = 35 \u00d7 12 = 420.
\u2022 Emphasise: "The key is not just finding A rearrangement but the MOST EFFICIENT one."

CFU CHECKPOINT:
Technique: Finger Voting
Script:
\u2022 "Think about which rearrangement YOU would choose and why. 30 seconds."
\u2022 "Fingers up in 3, 2, 1 \u2014 VOTE!"
\u2022 Scan for finger count distribution. Most should choose A or B.
PROCEED: If most students vote A or B (both valid), and can articulate WHY B is optimal, move to We Do.
PIVOT: If many students vote C or cannot distinguish between rearrangements \u2014 they don\u2019t understand what "rearranging factors" means. Reteach from a different angle: "Let\u2019s go back to basics. 35 = 5 \u00d7 7 and 12 = 2 \u00d7 6 or 3 \u00d7 4. So 35 \u00d7 12 = 5 \u00d7 7 \u00d7 2 \u00d7 6. Now I can group ANY way I like." Build each option visually on the board. Re-check: "Which grouping gives you \u00d710?"

MISCONCEPTIONS:
\u2022 Misconception: "There is only one correct rearrangement."
  Why: Students are used to single-answer problems and assume one right way.
  Impact: They may freeze if they can\u2019t find the "right" decomposition, or stop after finding any rearrangement without evaluating efficiency.
  Quick correction: Show all three options give 420. "There are many correct rearrangements. Your job is to find the one that makes the calculation EASIEST."

TEACHER NOTES:
This CFU tests two things: (1) Can students evaluate pre-made rearrangements? (2) Can they identify which is most efficient? The "both A and B are correct" reveal is deliberately surprising \u2014 it challenges the one-right-answer expectation and opens discussion about efficiency vs correctness. The Finger Voting technique gives every student a low-stakes way to commit to an answer before the reveal. VTLM 2.0 element: Formative assessment \u2014 Finger Voting with reasoning.

WATCH FOR:
\u2022 Students who change their vote when they see others \u2014 "I need YOUR thinking, not your neighbour\u2019s."
\u2022 Students who vote B confidently but cannot explain why \u00d710 is easier \u2014 push: "Why is multiplying by 10 easier than multiplying by 20 or 21?"

[Maths: Stage 2 \u2014 CFU 1, evaluating rearrangements | VTLM 2.0: Formative assessment]`;

const NOTES_WEDO1 = `SAY:
\u2022 "Now let\u2019s work through one together. Simplify 45 \u00d7 16."
\u2022 "First, let\u2019s break down the numbers. What are the factors of 45?" Wait for student response. "5 \u00d7 9. Good."
\u2022 "What about 16?" Wait. "2 \u00d7 8. Now I have 5, 9, 2, 8."
\u2022 "Who can spot a friendly pair?" Wait. "5 \u00d7 2 = 10! Let\u2019s rearrange."
\u2022 "(5 \u00d7 2) \u00d7 (9 \u00d7 8) = 10 \u00d7 72 = 720."
\u2022 "Let\u2019s verify: 45 \u00d7 16. I know 45 \u00d7 16 = 45 \u00d7 10 + 45 \u00d7 6 = 450 + 270 = 720. Correct!"

DO:
\u2022 Write each step on the board, pausing to elicit student responses before writing.
\u2022 Use cold call to involve different students at each step.
\u2022 Circle the friendly pair in the same colour as Worked Example 1 for consistency.

ENABLING:
\u2022 For students 6\u201312 months behind: Provide a "Factor Pairs" reference card listing common factor pairs for numbers 2\u201350. Have them circle the factors they find in each number before scanning for friendly pairs. If needed, allow use of a multiplication chart to check factor identification.

EXTENDING:
\u2022 For students 6\u201312 months ahead: "Can you find a DIFFERENT rearrangement that also works? Is it more or less efficient?" (e.g., 45 = 5 \u00d7 9, 16 = 4 \u00d7 4 \u2192 (5 \u00d7 4) \u00d7 (9 \u00d7 4) = 20 \u00d7 36 = 720. Compare: is 10 \u00d7 72 or 20 \u00d7 36 easier?)

TEACHER NOTES:
This We Do slide transitions from teacher modelling to guided practice. The key pedagogical move is ELICITING rather than telling \u2014 students should identify the factors and friendly pair with teacher prompts, not teacher answers. Use wait time (3\u20135 seconds) after each question. Cold calling ensures participation is distributed. The verification step reinforces that the strategy is reliable. DECIDE framework: Guided Practice \u2014 gradual release. VTLM 2.0 element: Collaborative learning \u2014 guided elicitation.

WATCH FOR:
\u2022 Students who identify 5 \u00d7 2 = 10 quickly \u2014 they are transferring from the worked examples. Acknowledge this.
\u2022 Students who suggest 45 = 15 \u00d7 3 instead of 5 \u00d7 9 \u2014 this is valid but less useful here. Ask: "Does 15 pair nicely with 2 or 8? Not as easily as 5 does."

[Maths: Stage 3 \u2014 Guided Practice, We Do together | VTLM 2.0: Collaborative learning]`;

const NOTES_WEDO2 = `SAY:
\u2022 "Now it\u2019s YOUR turn. On your whiteboard, simplify 15 \u00d7 24 by rearranging factors."
\u2022 "Show me each step: break down, spot the friendly pair, rearrange, calculate."
\u2022 "You have 90 seconds. Go."
\u2022 After Show Me: "Let\u2019s look at solutions. Who got 360? Let me share two different approaches."
\u2022 "Approach 1: 15 = 3 \u00d7 5, 24 = 4 \u00d7 6. Friendly pair: 5 \u00d7 4 = 20. So (5 \u00d7 4) \u00d7 (3 \u00d7 6) = 20 \u00d7 18 = 360."
\u2022 "Approach 2: 15 = 3 \u00d7 5, 24 = 8 \u00d7 3. Friendly pair: 5 \u00d7 8 = 40. So (5 \u00d7 8) \u00d7 (3 \u00d7 3) = 40 \u00d7 9 = 360."
\u2022 "Both are valid! Which do you find easier: 20 \u00d7 18 or 40 \u00d7 9?"

DO:
\u2022 While students work, circulate and note different approaches.
\u2022 After Show Me, select two students with different approaches to explain.
\u2022 Write both solutions side by side on the board.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
\u2022 "Show me your working in 3, 2, 1 \u2014 boards up!"
\u2022 Scan for: correct factorisation, correct identification of a friendly pair, correct final answer (360).
\u2022 Look for students who got the right answer using a valid rearrangement they chose independently.
PROCEED: If \u2265 75% show 360 with visible working showing factor rearrangement, move to CFU 2.
PIVOT: If many students are stuck at the "break down" step \u2014 they cannot factorise 15 or 24 reliably. Reteach from a different angle: "Let\u2019s use the friendly pairs list on the board. I see 5 on my list. Is 5 a factor of 15? Yes \u2014 15 = 5 \u00d7 3. Is 5 a factor of 24? No. Is 4 a factor of 24? Yes \u2014 24 = 4 \u00d7 6. Now I have 5 and 4 \u2014 that\u2019s 20!" Scaffold using the reference list. Re-check with 15 \u00d7 14.

ENABLING:
\u2022 For students 6\u201312 months behind: Prompt with "Start by listing the factor pairs of 15 and 24 separately. Then look across both lists for a pair that makes 10, 20, or 100."

EXTENDING:
\u2022 For students 6\u201312 months ahead: "Find THREE different valid rearrangements. Which gives the easiest final multiplication?"

TEACHER NOTES:
This is the critical assessment point of the We Do phase. Students must independently factorise, scan, rearrange, and calculate. The two-solution reveal is deliberate \u2014 it reinforces that multiple rearrangements exist and invites efficiency comparison. The "which do you find easier?" question develops metacognitive awareness about strategy selection. DECIDE framework: Gradual Release \u2014 supported independence. VTLM 2.0 element: Metacognitive strategies \u2014 comparing approaches.

WATCH FOR:
\u2022 Students who write "15 \u00d7 24 = 360" without any rearrangement \u2014 they may have calculated directly. Redirect: "I can see your answer is correct, but show me the FACTOR REARRANGEMENT. That\u2019s the skill we\u2019re practising."
\u2022 Students who correctly factorise but pick an unhelpful pair (e.g., 3 \u00d7 6 = 18) \u2014 redirect: "Is 18 a friendly number? What numbers are friendlier?"

[Maths: Stage 3 \u2014 We Do, independent attempt with support | VTLM 2.0: Metacognitive strategies]`;

const NOTES_CFU2 = `SAY:
\u2022 "One more check before you work independently. Turn to your partner."
\u2022 "Simplify 35 \u00d7 18 by rearranging factors. EXPLAIN your strategy to your partner as you go \u2014 I want to hear the thinking, not just the answer."
\u2022 "You have 2 minutes. Go."
\u2022 After partner time: "Who can share what their partner said?" Select a student to report their PARTNER\u2019S strategy.

DO:
\u2022 Circulate and listen to partner conversations. Note the quality of explanations, not just answers.
\u2022 After partner sharing, select a student to report their partner\u2019s strategy (not their own) \u2014 this ensures active listening.
\u2022 Reveal: "35 \u00d7 18 = 5 \u00d7 7 \u00d7 2 \u00d7 9. Friendly pair: 5 \u00d7 2 = 10. So 10 \u00d7 63 = 630."

CFU CHECKPOINT:
Technique: Turn & Talk
Script:
\u2022 "Turn to your partner. Show them your strategy step by step."
\u2022 "I should hear: \u2018First I broke down... then I found the friendly pair... then I rearranged...\u2019"
\u2022 Listen for mathematical language: "factors," "rearrange," "friendly pair."
PROCEED: If most pairs can articulate a valid strategy (even if slow) and reach 630, students are ready for independent practice.
PIVOT: If partner conversations reveal confusion about which number to decompose \u2014 the issue is strategic, not procedural. Reteach from a different angle: "When I see 35, I think: what\u2019s a useful factor? 5 \u2014 because 5 pairs with 2 to make 10. When I see 18, I think: does it have a factor of 2? Yes \u2014 18 = 2 \u00d7 9. Found it!" Model the SCANNING process explicitly. Re-check with 25 \u00d7 14 (25 \u00d7 2 \u00d7 7 \u2192 50 \u00d7 7 = 350).

MISCONCEPTIONS:
\u2022 Misconception: "I have to break BOTH numbers into pairs of factors."
  Why: The first worked example broke both 15 and 16 down, creating a false pattern.
  Impact: Students waste time factorising numbers that don\u2019t need it, or get confused with too many factors.
  Quick correction: Refer back to Worked Example 2 (25 \u00d7 32): "I only broke down 32 because 25 was already useful. Sometimes one is enough."

TEACHER NOTES:
This hinge question assesses readiness for independent practice. The Turn & Talk format adds a speaking-and-listening demand beyond pure computation \u2014 students who can EXPLAIN their strategy have deeper understanding than those who can only execute it. Having students report their PARTNER\u2019S strategy (not their own) ensures active listening and builds collaborative accountability. 35 \u00d7 18 is chosen because the 5 \u00d7 2 = 10 pair is accessible (matching WE1 and We Do 1) but requires students to find it independently. VTLM 2.0 element: Mathematical discourse \u2014 partner explanation.

WATCH FOR:
\u2022 Students who correctly say "5 \u00d7 2 = 10" but then struggle with 7 \u00d7 9 = 63 \u2014 their times tables need support. Note for You Do enabling.
\u2022 Students who finish quickly and explain confidently \u2014 flag for the Challenge problem in You Do.

[Maths: Stage 3 \u2014 Hinge CFU, readiness for independent practice | VTLM 2.0: Mathematical discourse]`;

const NOTES_YOUDO = `SAY:
\u2022 "Time to work independently. You have three problems, and they get progressively harder."
\u2022 "For each one: First, break each calculation into factors. Next, rearrange to find friendly pairs \u2014 look for \u00d710, \u00d720, \u00d725, \u00d750, or \u00d7100. Then, calculate and check your answer."
\u2022 "Problem A is similar to what we just did together. Problem B adds a twist. Problem C is a challenge \u2014 give it a go!"
\u2022 "You have 12 minutes. Begin."

DO:
\u2022 Write all three problems on the board alongside the slide.
\u2022 Circulate with a clipboard. Target students who struggled during We Do first.
\u2022 For enabling students: point to the Friendly Pairs list on the board and prompt: "Which factor from 36 pairs with 25?"
\u2022 For extending students who finish C: "Can you find a way to simplify 35 \u00d7 24 \u00d7 15?"

ENABLING:
\u2022 For students 6\u201312 months behind:
  \u2014 Provide a prompt card: "Step 1: Write factor pairs of each number. Step 2: Circle a friendly pair. Step 3: Rearrange. Step 4: Calculate."
  \u2014 For Problem A (25 \u00d7 36): Hint \u2014 "What is 25 \u00d7 4? Can you find 4 inside 36?"
  \u2014 Allow use of multiplication charts if times tables are a barrier.

EXTENDING:
\u2022 For students 6\u201312 months ahead:
  \u2014 Problem C (125 \u00d7 48): Requires recognising 125 \u00d7 8 = 1 000 as a power pair. 48 = 8 \u00d7 6 \u2192 (125 \u00d7 8) \u00d7 6 = 1 000 \u00d7 6 = 6 000.
  \u2014 Triple product challenge: 35 \u00d7 24 \u00d7 15 = 5 \u00d7 7 \u00d7 8 \u00d7 3 \u00d7 5 \u00d7 3. Friendly pairs: 5 \u00d7 8 = 40, 5 \u00d7 3 = 15... or (5 \u00d7 2)(7 \u00d7 4)(3 \u00d7 5 \u00d7 3) \u2014 multiple approaches.

TEACHER NOTES:
The three problems form a deliberate progression:
\u2022 A) 25 \u00d7 36: Direct transfer from WE2. 36 = 4 \u00d7 9 \u2192 (25 \u00d7 4) \u00d7 9 = 100 \u00d7 9 = 900.
\u2022 B) 45 \u00d7 24: Similar to We Do 1 but with a twist \u2014 multiple valid rearrangements. 45 = 5 \u00d7 9, 24 = 4 \u00d7 6 \u2192 (5 \u00d7 4) \u00d7 (9 \u00d7 6) = 20 \u00d7 54 = 1 080. OR 45 = 9 \u00d7 5, 24 = 8 \u00d7 3 \u2192 (5 \u00d7 8) \u00d7 (9 \u00d7 3) = 40 \u00d7 27 = 1 080.
\u2022 C) 125 \u00d7 48: The power pair 125 \u00d7 8 = 1 000 is less familiar. 48 = 8 \u00d7 6 \u2192 (125 \u00d7 8) \u00d7 6 = 6 000.

Circulate in three waves: (1) check enabling students have started, (2) scan middle group for correct strategy use, (3) verify extending students are genuinely challenged. VTLM 2.0 element: Differentiated practice \u2014 enabling and extending.

WATCH FOR:
\u2022 Students using standard algorithm instead of factor rearrangement \u2014 redirect: "I can see you got the answer, but today\u2019s skill is REARRANGING FACTORS. Try that method."
\u2022 Students stuck on Problem B \u2014 prompt: "What are the factor pairs of 24? Do any of them pair with a factor of 45 to make 10, 20, or 100?"
\u2022 Students who answer A and B correctly but skip C \u2014 encourage: "125 has a VERY special factor pair. Think about money: how many 125s make 1 000?"

[Maths: Stage 4 \u2014 Independent Practice, differentiated | VTLM 2.0: Differentiated learning]`;

const NOTES_EXIT = `SAY:
\u2022 "Pens down on your independent work. Exit ticket time \u2014 two questions, three minutes."
\u2022 Read Q1 aloud: "Simplify 15 \u00d7 32 by rearranging factors. Show each step."
\u2022 Read Q2 aloud: "Explain in one sentence why rearranging factors always gives the same answer."
\u2022 "Work silently and independently. This shows me what YOU understand."
\u2022 After collection: "Great work today. Tomorrow we will look at how these same properties help us with division."

DO:
\u2022 Ensure students write in workbooks, not whiteboards.
\u2022 Collect promptly. Mark tonight \u2014 these inform Session 4 groupings.

TEACHER NOTES:
The exit ticket assesses both procedural (Q1) and conceptual (Q2) understanding:
\u2022 Q1: 15 \u00d7 32. Multiple valid approaches: 15 = 3 \u00d7 5, 32 = 2 \u00d7 16 \u2192 (5 \u00d7 2) \u00d7 (3 \u00d7 16) = 10 \u00d7 48 = 480. OR 32 = 4 \u00d7 8 \u2192 (5 \u00d7 4) \u00d7 (3 \u00d7 8) = 20 \u00d7 24 = 480.
\u2022 Q2: Target response: "Multiplication is commutative and associative, so changing the order or grouping of factors does not change the product." Accept simpler versions: "The order of multiplication doesn\u2019t change the answer."

Mark with three categories:
\u2022 Secure: Correct rearrangement with clear steps + reasonable explanation.
\u2022 Developing: Correct answer but unclear steps OR good steps but arithmetic error.
\u2022 Not yet: Cannot factorise or does not attempt rearrangement.

Use results to form flexible groups for Session 4. VTLM 2.0 element: Summative-formative assessment \u2014 exit ticket.

WATCH FOR:
\u2022 Students who write "15 \u00d7 32 = 480" without showing factor rearrangement \u2014 they may have calculated correctly but did not demonstrate the TARGET skill.
\u2022 Students who struggle with Q2 \u2014 conceptual understanding of WHY the strategy works lags behind procedural ability. This is expected for some students and will be revisited in Session 4.
\u2022 Students who leave Q2 blank \u2014 they may lack the mathematical vocabulary. Note for Session 4 vocabulary review.

[Maths: Stage 5 \u2014 Exit Ticket, procedural and conceptual | VTLM 2.0: Summative-formative assessment]`;

const NOTES_CLOSING = `SAY:
\u2022 "Before we finish, turn to your partner. Share your top 3 friendly pairs \u2014 the ones you think are most useful for simplifying multiplications."
\u2022 Give 60 seconds, then: "Let\u2019s hear from a few pairs. What made your top 3 list?"
\u2022 Collect responses and write on board. Likely answers: 5 \u00d7 2 = 10, 25 \u00d7 4 = 100, 5 \u00d7 4 = 20, 50 \u00d7 2 = 100.
\u2022 "These are the key takeaways from today. Whenever you see a tricky multiplication, ask yourself: can I BREAK it into factors and REARRANGE to find a friendly pair?"

DO:
\u2022 Leave the "Friendly Pairs" list visible as students pack up.
\u2022 Preview Session 4: "Tomorrow we will use these same ideas to help with DIVISION. If I know 25 \u00d7 4 = 100, how might that help me divide by 25?"
\u2022 Collect exit tickets as students leave.

TEACHER NOTES:
The Turn & Talk closing serves two purposes: (1) retrieval practice \u2014 students recall the friendly pairs they used today, (2) consolidation \u2014 verbalising the strategy reinforces memory formation. The three key points on the slide summarise the lesson\u2019s core ideas at increasing levels of abstraction: practical (look for pairs), strategic (breaking reveals hidden pairs), theoretical (properties guarantee correctness). The preview of Session 4 creates anticipation and connects today\u2019s multiplication work to division, showing the strategy\u2019s broader utility. VTLM 2.0 element: Reflection and consolidation.

WATCH FOR:
\u2022 Students who can only name one friendly pair (usually 5 \u00d7 2 = 10) \u2014 they need more exposure. Session 4 warm-up should include rapid-fire friendly pair identification.
\u2022 Students who are excited about the strategy \u2014 harness this: "Try using it at home tonight with any multiplication you see!"

[Maths: Closing \u2014 consolidation | VTLM 2.0: Reflection]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build function
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Year 5/6 Maths";
  pres.title = "Session 3: Simplifying Calculations with Factors";

  // ── Slide 1: Title ────────────────────────────────────────────────────────
  titleSlide(
    pres,
    "Simplifying Calculations with Factors",
    "Rearranging factors to make multiplication easier",
    "Year 5/6 | Number Properties | Session 3 of 5",
    NOTES_TITLE
  );

  // ── Slide 2: Stage 1 — Daily Review (multiplication strategies) ─────────
  contentSlide(
    pres,
    1,
    "Daily Review",
    "Multiplication Strategies Warm-Up",
    [
      "Q1: 253 \u00d7 4 using doubling",
      "Q2: 324 \u00d7 8 using place value partitioning",
      "Q3: 48 \u00d7 5 \u2014 can you find a shortcut?",
    ],
    NOTES_DR1,
    FOOTER,
    (s) => {
      // Right side: answer callout cards stacked vertically
      const answers = [
        { q: "Q1", calc: "253\u00d72=506, 506\u00d72=1 012", ans: "1 012", color: C.AMBER },
        { q: "Q2", calc: "300\u00d78 + 20\u00d78 + 4\u00d78", ans: "2 592", color: C.NAVY },
        { q: "Q3", calc: "48\u00d710\u00f72 = 480\u00f72", ans: "240", color: C.TEAL },
      ];
      answers.forEach((item, i) => {
        const cy = CONTENT_TOP + i * 1.2;
        addCard(s, 5.2, cy, 4.3, 1.05, { strip: item.color });
        s.addText(item.q, {
          x: 5.45, y: cy + 0.08, w: 0.5, h: 0.35,
          fontSize: 12, fontFace: FONT_H, color: item.color, bold: true, margin: 0,
        });
        s.addText(item.calc, {
          x: 5.95, y: cy + 0.08, w: 3.3, h: 0.35,
          fontSize: 11, fontFace: FONT_B, color: C.MUTED, margin: 0,
        });
        // Use NAVY fill for AMBER items to avoid contrast issues
        const pillColor = item.color === C.AMBER ? C.NAVY : item.color;
        addTextOnShape(s, item.ans, {
          x: 5.45, y: cy + 0.48, w: 3.8, h: 0.46, rectRadius: 0.08,
          fill: { color: pillColor },
        }, {
          fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true,
        });
      });
    }
  );

  // ── Slide 3: Stage 1 — Daily Review (factor pairs & primality) ──────────
  contentSlide(
    pres,
    1,
    "Daily Review",
    "Factor Pairs & Primality Review",
    [
      "Q4: List ALL factor pairs of 30",
      "Q5: Is 47 prime or composite? How do you know?",
    ],
    NOTES_DR2,
    FOOTER,
    (s) => {
      // Right side: answer cards
      // Q4 answer card
      addCard(s, 5.2, CONTENT_TOP, 4.3, 1.8, { strip: C.AMBER });
      s.addText("Q4 — Factor Pairs of 30", {
        x: 5.45, y: CONTENT_TOP + 0.1, w: 3.8, h: 0.3,
        fontSize: 12, fontFace: FONT_H, color: C.AMBER, bold: true, margin: 0,
      });
      const pairs = ["1 \u00d7 30", "2 \u00d7 15", "3 \u00d7 10", "5 \u00d7 6"];
      pairs.forEach((p, i) => {
        addTextOnShape(s, p, {
          x: 5.45 + (i % 2) * 1.95, y: CONTENT_TOP + 0.5 + Math.floor(i / 2) * 0.55,
          w: 1.8, h: 0.45, rectRadius: 0.08,
          fill: { color: C.NAVY },
        }, {
          fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
        });
      });

      // Q5 answer card
      addCard(s, 5.2, CONTENT_TOP + 2.0, 4.3, 1.75, { strip: C.TEAL });
      s.addText("Q5 — Is 47 Prime?", {
        x: 5.45, y: CONTENT_TOP + 2.1, w: 3.8, h: 0.3,
        fontSize: 12, fontFace: FONT_H, color: C.TEAL, bold: true, margin: 0,
      });
      addTextOnShape(s, "PRIME", {
        x: 5.45, y: CONTENT_TOP + 2.5, w: 3.8, h: 0.5, rectRadius: 0.08,
        fill: { color: C.EMERALD },
      }, {
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      s.addText("Only factors: 1 and 47", {
        x: 5.45, y: CONTENT_TOP + 3.1, w: 3.8, h: 0.35,
        fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
        align: "center",
      });
    }
  );

  // ── Slide 4: LI & SC ──────────────────────────────────────────────────────
  liSlide(
    pres,
    [
      "We are learning to rearrange and regroup factors to simplify multi-digit multiplication so we can calculate more efficiently.",
    ],
    [
      "I can break a number into its factors",
      "I can rearrange factors to create friendlier multiplication pairs",
      "I can choose the most efficient strategy and explain why it works",
    ],
    NOTES_LISC,
    FOOTER
  );

  // ── Slide 5: Stage 2 — The Big Idea ───────────────────────────────────────
  contentSlide(
    pres,
    2,
    "Explicit Instruction \u2014 I Do",
    "Multiplication Can Be Done in ANY Order",
    [
      "Commutative Property: the ORDER doesn\u2019t matter",
      "3 \u00d7 5 = 5 \u00d7 3 = 15",
      "Associative Property: the GROUPING doesn\u2019t matter",
      "(2 \u00d7 3) \u00d7 4 = 2 \u00d7 (3 \u00d7 4) = 24",
      "We can BREAK numbers into factors and REARRANGE them to find friendly pairs!",
    ],
    NOTES_BIG_IDEA,
    FOOTER,
    (s) => {
      // Right side: visual examples of properties
      const startX = 5.3;
      const boxW = 4.2;

      // Commutative property visual
      addCard(s, startX, CONTENT_TOP, boxW, 1.5, { strip: C.NAVY });
      s.addText("Commutative", {
        x: startX + 0.2, y: CONTENT_TOP + 0.08, w: 3.5, h: 0.3,
        fontSize: 13, fontFace: FONT_H, color: C.NAVY, bold: true, margin: 0,
      });
      // 3 x 5 visual
      addTextOnShape(s, "3 \u00d7 5", {
        x: startX + 0.2, y: CONTENT_TOP + 0.45, w: 1.6, h: 0.45, rectRadius: 0.08,
        fill: { color: C.NAVY },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      s.addText("=", {
        x: startX + 1.85, y: CONTENT_TOP + 0.45, w: 0.4, h: 0.45,
        fontSize: 20, fontFace: FONT_H, color: C.CHARCOAL, align: "center", valign: "middle", margin: 0,
      });
      addTextOnShape(s, "5 \u00d7 3", {
        x: startX + 2.3, y: CONTENT_TOP + 0.45, w: 1.6, h: 0.45, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      s.addText("Order doesn\u2019t matter!", {
        x: startX + 0.2, y: CONTENT_TOP + 1.0, w: 3.8, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
        align: "center",
      });

      // Associative property visual
      addCard(s, startX, CONTENT_TOP + 1.7, boxW, 1.5, { strip: C.TEAL });
      s.addText("Associative", {
        x: startX + 0.2, y: CONTENT_TOP + 1.78, w: 3.5, h: 0.3,
        fontSize: 13, fontFace: FONT_H, color: C.TEAL, bold: true, margin: 0,
      });
      addTextOnShape(s, "(2\u00d73) \u00d7 4", {
        x: startX + 0.2, y: CONTENT_TOP + 2.15, w: 1.6, h: 0.45, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      s.addText("=", {
        x: startX + 1.85, y: CONTENT_TOP + 2.15, w: 0.4, h: 0.45,
        fontSize: 20, fontFace: FONT_H, color: C.CHARCOAL, align: "center", valign: "middle", margin: 0,
      });
      addTextOnShape(s, "2 \u00d7 (3\u00d74)", {
        x: startX + 2.3, y: CONTENT_TOP + 2.15, w: 1.6, h: 0.45, rectRadius: 0.08,
        fill: { color: C.NAVY },
      }, {
        fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      s.addText("Grouping doesn\u2019t matter!", {
        x: startX + 0.2, y: CONTENT_TOP + 2.7, w: 3.8, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
        align: "center",
      });
    }
  );

  // ── Slide 6: Stage 2 — Worked Example 1: 15 x 16 ──────────────────────
  workedExSlide(
    pres,
    2,
    "Explicit Instruction \u2014 I Do",
    "Simplify: 15 \u00d7 16",
    [
      "Break down: 15 = 3 \u00d7 5 and 16 = 2 \u00d7 8",
      "Scan for friendly pairs: 5 \u00d7 2 = 10!",
      "Rearrange: (5 \u00d7 2) \u00d7 (3 \u00d7 8) = 10 \u00d7 24",
      "Calculate: 10 \u00d7 24 = 240",
    ],
    NOTES_WE1,
    FOOTER,
    (s) => {
      // Right side: factor rearrangement visual
      const rx = 5.3;
      const ry = CONTENT_TOP + 0.1;

      // Original problem
      addTextOnShape(s, "15 \u00d7 16", {
        x: rx, y: ry, w: 4.2, h: 0.55, rectRadius: 0.08,
        fill: { color: C.NAVY },
      }, {
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Factor breakdown
      const factY = ry + 0.7;
      addTextOnShape(s, "3 \u00d7 5", {
        x: rx, y: factY, w: 1.9, h: 0.5, rectRadius: 0.08,
        fill: { color: C.LIGHT },
      }, {
        fontSize: 16, fontFace: FONT_H, color: C.NAVY, bold: true,
      });
      addTextOnShape(s, "2 \u00d7 8", {
        x: rx + 2.3, y: factY, w: 1.9, h: 0.5, rectRadius: 0.08,
        fill: { color: C.LIGHT },
      }, {
        fontSize: 16, fontFace: FONT_H, color: C.NAVY, bold: true,
      });

      // Friendly pair highlight
      const fpY = factY + 0.7;
      addTextOnShape(s, "5 \u00d7 2 = 10", {
        x: rx + 0.6, y: fpY, w: 3.0, h: 0.55, rectRadius: 0.08,
        fill: { color: C.CORAL },
      }, {
        fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Rearranged calculation
      const reY = fpY + 0.75;
      addTextOnShape(s, "10 \u00d7 24", {
        x: rx, y: reY, w: 4.2, h: 0.55, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Final answer
      const ansY = reY + 0.75;
      addTextOnShape(s, "= 240", {
        x: rx + 0.8, y: ansY, w: 2.6, h: 0.6, rectRadius: 0.1,
        fill: { color: C.EMERALD },
      }, {
        fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 7: Stage 2 — Worked Example 2: 25 x 32 ──────────────────────
  workedExSlide(
    pres,
    2,
    "Explicit Instruction \u2014 I Do",
    "Simplify: 25 \u00d7 32",
    [
      "Look at 25 \u2014 already a useful number!",
      "Break down: 32 = 4 \u00d7 8",
      "Spot the friendly pair: 25 \u00d7 4 = 100!",
      "Rearrange: (25 \u00d7 4) \u00d7 8 = 100 \u00d7 8",
      "Calculate: 100 \u00d7 8 = 800",
    ],
    NOTES_WE2,
    FOOTER,
    (s) => {
      // Right side: factor rearrangement visual
      const rx = 5.3;
      const ry = CONTENT_TOP + 0.1;

      // Original problem
      addTextOnShape(s, "25 \u00d7 32", {
        x: rx, y: ry, w: 4.2, h: 0.55, rectRadius: 0.08,
        fill: { color: C.NAVY },
      }, {
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Factor breakdown — only 32
      const factY = ry + 0.7;
      addTextOnShape(s, "25", {
        x: rx, y: factY, w: 1.4, h: 0.5, rectRadius: 0.08,
        fill: { color: C.LIGHT },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.NAVY, bold: true,
      });
      s.addText("\u00d7", {
        x: rx + 1.4, y: factY, w: 0.4, h: 0.5,
        fontSize: 18, fontFace: FONT_H, color: C.CHARCOAL, align: "center", valign: "middle", margin: 0,
      });
      addTextOnShape(s, "4 \u00d7 8", {
        x: rx + 1.8, y: factY, w: 2.4, h: 0.5, rectRadius: 0.08,
        fill: { color: C.LIGHT },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.NAVY, bold: true,
      });

      // Friendly pair highlight
      const fpY = factY + 0.7;
      addTextOnShape(s, "25 \u00d7 4 = 100", {
        x: rx + 0.4, y: fpY, w: 3.4, h: 0.55, rectRadius: 0.08,
        fill: { color: C.CORAL },
      }, {
        fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Rearranged calculation
      const reY = fpY + 0.75;
      addTextOnShape(s, "100 \u00d7 8", {
        x: rx, y: reY, w: 4.2, h: 0.55, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Final answer
      const ansY = reY + 0.75;
      addTextOnShape(s, "= 800", {
        x: rx + 0.8, y: ansY, w: 2.6, h: 0.6, rectRadius: 0.1,
        fill: { color: C.EMERALD },
      }, {
        fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 8 (pair): CFU 1 — Finger Voting — withReveal ────────────────
  withReveal(
    () => cfuSlide(
      pres, 2, "Check for Understanding", "Which Rearrangement?",
      "Finger Voting",
      "Which is the BEST rearrangement for 35 \u00d7 12?\n\nA) 5 \u00d7 7 \u00d7 4 \u00d7 3 \u2192 (5 \u00d7 4) \u00d7 (7 \u00d7 3) = 20 \u00d7 21\n\nB) 7 \u00d7 5 \u00d7 6 \u00d7 2 \u2192 (7 \u00d7 6) \u00d7 (5 \u00d7 2) = 42 \u00d7 10\n\nC) 35 \u00d7 3 \u00d7 4 \u2192 35 \u00d7 12",
      NOTES_CFU1, FOOTER
    ),
    (slide) => {
      // Reveal: answer banner
      addTextOnShape(slide, "Both A and B give 420! B creates \u00d710 which is easiest.", {
        x: 0.8, y: 4.55, w: 8.4, h: 0.5, rectRadius: 0.08,
        fill: { color: C.EMERALD },
      }, {
        fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 9: Stage 3 — We Do: 45 x 16 ─────────────────────────────────
  contentSlide(
    pres,
    3,
    "Guided Practice \u2014 We Do",
    "Let\u2019s Simplify Together: 45 \u00d7 16",
    [
      "Break down: 45 = 5 \u00d7 9, 16 = 2 \u00d7 8",
      "Scan for a friendly pair: 5 \u00d7 2 = 10",
      "Rearrange: (5 \u00d7 2) \u00d7 (9 \u00d7 8) = 10 \u00d7 72",
      "Calculate: 10 \u00d7 72 = 720",
      "Verify: 45 \u00d7 10 + 45 \u00d7 6 = 450 + 270 = 720 \u2713",
    ],
    NOTES_WEDO1,
    FOOTER,
    (s) => {
      // Right side: step-by-step visual
      const rx = 5.3;

      // Original
      addTextOnShape(s, "45 \u00d7 16", {
        x: rx, y: CONTENT_TOP, w: 4.2, h: 0.5, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Factors
      const facY = CONTENT_TOP + 0.65;
      addTextOnShape(s, "5 \u00d7 9", {
        x: rx, y: facY, w: 1.9, h: 0.45, rectRadius: 0.08,
        fill: { color: C.LIGHT },
      }, {
        fontSize: 15, fontFace: FONT_H, color: C.CHARCOAL, bold: true,
      });
      addTextOnShape(s, "2 \u00d7 8", {
        x: rx + 2.3, y: facY, w: 1.9, h: 0.45, rectRadius: 0.08,
        fill: { color: C.LIGHT },
      }, {
        fontSize: 15, fontFace: FONT_H, color: C.CHARCOAL, bold: true,
      });

      // Friendly pair
      const fpY = facY + 0.6;
      addTextOnShape(s, "5 \u00d7 2 = 10", {
        x: rx + 0.6, y: fpY, w: 3.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.CORAL },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Rearranged
      const reY = fpY + 0.65;
      addTextOnShape(s, "10 \u00d7 72", {
        x: rx, y: reY, w: 4.2, h: 0.5, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Answer
      const ansY = reY + 0.65;
      addTextOnShape(s, "= 720", {
        x: rx + 0.8, y: ansY, w: 2.6, h: 0.55, rectRadius: 0.1,
        fill: { color: C.EMERALD },
      }, {
        fontSize: 26, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 10 (pair): We Do Problem Pair 2 — Show Me Boards — withReveal ─
  withReveal(
    () => cfuSlide(
      pres, 3, "Guided Practice \u2014 We Do", "Your Turn",
      "Show Me Boards",
      "Simplify 15 \u00d7 24 by rearranging factors.\n\nShow your working on your whiteboard.",
      NOTES_WEDO2, FOOTER
    ),
    (slide) => {
      // Reveal: two approaches — positioned below centred question text
      addCard(slide, 0.5, 4.2, 4.3, 0.85, { strip: C.TEAL });
      slide.addText([
        { text: "Approach 1: ", options: { bold: true, fontSize: 11, color: C.TEAL } },
        { text: "(5\u00d74) \u00d7 (3\u00d76) = 20 \u00d7 18 = 360", options: { fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 0.7, y: 4.28, w: 3.9, h: 0.3,
        fontFace: FONT_B, margin: 0,
      });
      slide.addText("15=3\u00d75, 24=4\u00d76", {
        x: 0.7, y: 4.62, w: 3.9, h: 0.25,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });

      addCard(slide, 5.2, 4.2, 4.3, 0.85, { strip: C.NAVY });
      slide.addText([
        { text: "Approach 2: ", options: { bold: true, fontSize: 11, color: C.NAVY } },
        { text: "(5\u00d78) \u00d7 (3\u00d73) = 40 \u00d7 9 = 360", options: { fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 5.4, y: 4.28, w: 3.9, h: 0.3,
        fontFace: FONT_B, margin: 0,
      });
      slide.addText("15=3\u00d75, 24=8\u00d73", {
        x: 5.4, y: 4.62, w: 3.9, h: 0.25,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });
    }
  );

  // ── Slide 11 (pair): CFU 2 — Turn & Talk — withReveal ──────────────────
  withReveal(
    () => cfuSlide(
      pres, 3, "Check for Understanding", "Hinge Check",
      "Turn & Talk",
      "Simplify 35 \u00d7 18 by rearranging factors.\n\nExplain your strategy to your partner.",
      NOTES_CFU2, FOOTER
    ),
    (slide) => {
      // Reveal: answer
      addTextOnShape(slide, "35 \u00d7 18 = 5 \u00d7 7 \u00d7 2 \u00d7 9 \u2192 (5 \u00d7 2) \u00d7 (7 \u00d7 9) = 10 \u00d7 63 = 630", {
        x: 0.8, y: 4.55, w: 8.4, h: 0.5, rectRadius: 0.08,
        fill: { color: C.EMERALD },
      }, {
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 12: Stage 4 — Independent Practice (You Do) ──────────────────
  contentSlide(
    pres,
    4,
    "Independent Practice \u2014 You Do",
    "Independent Practice",
    [
      "First: Break each calculation into factors.",
      "Next: Rearrange to find friendly pairs (\u00d710, \u00d7100, \u00d720).",
      "Then: Calculate and check your answer.",
    ],
    NOTES_YOUDO,
    FOOTER,
    (s) => {
      // Right side: problem cards
      const rx = 5.2;
      const problems = [
        { label: "A", text: "25 \u00d7 36", color: C.NAVY },
        { label: "B", text: "45 \u00d7 24", color: C.TEAL },
        { label: "C", text: "125 \u00d7 48", color: C.CORAL },
      ];

      problems.forEach((p, i) => {
        const py = CONTENT_TOP + i * 1.15;
        addCard(s, rx, py, 4.3, 1.0, { strip: p.color });

        // Label badge
        addTextOnShape(s, p.label, {
          x: rx + 0.2, y: py + 0.12, w: 0.5, h: 0.35, rectRadius: 0.08,
          fill: { color: p.color },
        }, {
          fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
        });

        // Problem text
        s.addText(p.text, {
          x: rx + 0.85, y: py + 0.1, w: 3.2, h: 0.4,
          fontSize: 22, fontFace: FONT_H, color: C.CHARCOAL, bold: true, margin: 0,
        });

        // Challenge tag for C
        if (p.label === "C") {
          addTextOnShape(s, "Challenge", {
            x: rx + 0.85, y: py + 0.55, w: 1.4, h: 0.3, rectRadius: 0.06,
            fill: { color: C.CORAL },
          }, {
            fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
          });
        }
      });
    }
  );

  // ── Slide 13: Stage 5 — Exit Ticket ────────────────────────────────────
  exitTicketSlide(
    pres,
    [
      "Simplify 15 \u00d7 32 by rearranging factors. Show each step.",
      "Explain in one sentence why rearranging factors always gives the same answer.",
    ],
    NOTES_EXIT,
    FOOTER
  );

  // ── Slide 14: Closing ──────────────────────────────────────────────────
  closingSlide(
    pres,
    "What \u2018friendly pairs\u2019 should you look for when rearranging factors? Share your top 3 with your partner.",
    [
      "Look for pairs that make 10, 20, 25, 50, or 100",
      "Breaking into smaller factors reveals hidden friendly combinations",
      "The commutative and associative properties guarantee the answer stays the same",
    ],
    NOTES_CLOSING
  );

  // ── Write PPTX ─────────────────────────────────────────────────────────────
  const pptxPath = OUT_DIR + "/NP_Lesson3_Simplifying_Calculations.pptx";
  await pres.writeFile({ fileName: pptxPath });
  console.log("Written: " + pptxPath);
}

build().catch(console.error);
