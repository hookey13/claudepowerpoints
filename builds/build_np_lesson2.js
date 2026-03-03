// Lesson 2 of 5: Factor Pairs & Prime Factorisation
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
  addTextOnShape, getContrastColor, validateContrast,
  withReveal,
  titleSlide, liSlide, contentSlide, workedExSlide, cfuSlide,
  exitTicketSlide, closingSlide,
} = require("../themes/pv_helpers");

const OUT_DIR = "output/NP_Lesson2_Factor_Pairs_Prime_Factorisation";

const FOOTER = "Session 2 of 5 | Number Properties | Year 5/6 Maths";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes strings (kept as constants to keep build() readable)
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
• "Welcome to session 2 of our Number Properties unit. Last session we explored number sequences and rules. Today we are going to take numbers apart — breaking them into their building blocks using factor pairs and prime factorisation."
• "By the end of today you will be able to find every factor pair of a number, tell me whether it is prime or composite, and draw a factor tree to express it as a product of primes."

**DO:**
• Display the title slide while students are settling.
• Have mini whiteboards and markers on every table.
• Set the tone: "Today is about detective work — finding hidden structure inside numbers."

**TEACHER NOTES:**
This lesson connects multiplication and division knowledge to the deeper structure of numbers. Factor pairs are foundational for later work on HCF and LCM (Sessions 3-4). The DECIDE framework positions this as a "build" lesson — students will use the systematic approach modelled here as a tool across the remaining sessions. VTLM 2.0 element: Making mathematical structure visible.

**WATCH FOR:**
• Students who confuse "factors" with "multiples" — address this explicitly during vocabulary.
• Students who have forgotten basic multiplication facts — they will need a multiplication chart scaffold.

[Maths: Stage 2 | VTLM 2.0: Making mathematical structure visible]`;

const NOTES_DR1 = `**SAY:**
• "Before we begin, let's warm up our multiplication brains. Imagine you have 18 blocks. What rectangles can you make? Think about all the different arrangements."
• "For each number, I want you to find EVERY possible rectangle. Write them on your whiteboard."
• Give 60 seconds per question. "Boards up — Show Me!"

**DO:**
• Write each question one at a time on the board.
• For Q1 (18 blocks): After Show Me, confirm: 1x18, 2x9, 3x6. "Three different rectangles — that means 18 has three factor pairs."
• For Q2 (24 blocks): 1x24, 2x12, 3x8, 4x6. "Four factor pairs."
• For Q3 (36 blocks): 1x36, 2x18, 3x12, 4x9, 6x6. "Five factor pairs — and notice 6x6 is special because both factors are the same."

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Boards up in 3, 2, 1 — Show Me!" for each question.
• Scan left-to-right. Look for: complete lists (not missing any pairs), systematic ordering (starting from 1).
PROCEED (>=80%): If most students find all factor pairs for at least Q1 and Q2, move to Q4-Q5.
PIVOT (<80%): If students miss factor pairs, model the systematic approach: "Start at 1. Does 1 go into 18? Yes — 1x18. Does 2? Yes — 2x9. Does 3? Yes — 3x6. Does 4? 18/4 = 4.5 — no. Does 5? 18/5 = 3.6 — no. We've passed the square root, so stop." Re-check with 12 blocks.

**TEACHER NOTES:**
The rectangle model is a powerful concrete representation of factor pairs — each rectangle dimension pair IS a factor pair. This warm-up deliberately bridges from concrete (physical rectangles) to abstract (factor pairs as numbers). Starting from 1 and working up establishes the systematic approach that will be formalised in Stage 2. The numbers are chosen to increase in complexity: 18 (3 pairs), 24 (4 pairs), 36 (5 pairs, including a square). VTLM 2.0 element: Concrete-to-abstract bridging.

**WATCH FOR:**
• Students who list 2x9 and 9x2 as separate rectangles — clarify: "In factor pairs, 2x9 and 9x2 are the same pair."
• Students who miss the 1xN pair — remind them: "1 is always a factor of every number."
• Students who stop too early on 36 — they may find 1x36, 2x18, 3x12 but miss 4x9 or 6x6.

[Maths: Stage 1 — Activate Prior Knowledge | VTLM 2.0: Concrete-to-abstract bridging]`;

const NOTES_DR2 = `**SAY:**
• "Now let's review something from last session. Start at 5 and apply the rule 'times 2 plus 1.' Write the first four outputs on your whiteboard."
• Give 45 seconds. "Boards up!"
• Confirm: 5 -> 5x2+1=11 -> 11x2+1=23 -> 23x2+1=47 -> 47x2+1=95. Outputs: 11, 23, 47, 95.
• "Q5: 563 times 4 using doubling. Remember our strategy from last session?"
• Confirm: 563x2=1126, 1126x2=2252. "Doubling twice IS times 4."

**DO:**
• Write Q4 and Q5 on the board. Give 60 seconds total.
• For Q4: point out the chain structure — each output feeds back in as input.
• For Q5: explicitly model the two-step doubling if students are unsure.

**TEACHER NOTES:**
Q4 reviews the function machine / rule-based sequence from Session 1, ensuring continuity across the unit. The outputs (11, 23, 47, 95) are interesting — the first three are prime numbers, which foreshadows today's content about primes. Q5 reviews the doubling strategy for multiplication by 4, maintaining computational fluency. Both questions use prior session content to create a spiral review pattern consistent with the DECIDE framework. VTLM 2.0 element: Spaced retrieval practice.

**WATCH FOR:**
• Students who apply the rule incorrectly: e.g., 5x2=10, then 10+1=11, then 11+1=12 (forgetting to multiply). Remind: "The WHOLE rule applies each time — times 2 THEN plus 1."
• Students who struggle with 563x2 — they may need to use expanded form: 500x2=1000, 60x2=120, 3x2=6, total 1126.

[Maths: Stage 1 — Prior Topic Review | VTLM 2.0: Spaced retrieval practice]`;

const NOTES_LI = `**SAY:**
• "Here is what we are learning today and how you will know you have been successful."
• Read the Learning Intention aloud.
• Read each Success Criterion and briefly explain:
  - SC1: "Finding ALL factor pairs means being systematic — starting from 1 and working up."
  - SC2: "Prime means exactly 2 factors. Composite means more than 2. And 1 is special — it is neither."
  - SC3: "A factor tree breaks a number all the way down to its prime building blocks."

**DO:**
• Point to each criterion as you read it.
• Leave this slide visible briefly so students can note the criteria.

**TEACHER NOTES:**
The three success criteria are sequenced to build on each other: finding factor pairs (SC1) requires knowing which numbers are prime (SC2), and expressing a number as a product of prime factors (SC3) uses both skills together. This scaffolded sequence follows the DECIDE framework's principle of layered complexity. VTLM 2.0 element: Making Learning Visible — explicit success criteria.

**WATCH FOR:**
• Students who cannot distinguish "factor" from "multiple" — if confusion is widespread, add a quick verbal check: "Factors of 12 are numbers that divide INTO 12. Multiples of 12 are numbers you get BY multiplying 12."

[Maths: Stage 2 | VTLM 2.0: Making Learning Visible]`;

const NOTES_VOCAB = `**SAY:**
• "Before we start finding factors, we need four key terms."
• Point to each card:
  - "A prime number has EXACTLY two factors — 1 and itself. Not one factor — two. 2, 3, 5, 7, 11 are all prime."
  - "A composite number has MORE than two factors. 4, 6, 8, 9, 10 — they can all be broken down further."
  - "A factor pair is two numbers that multiply together to give a product. For example, 3 and 4 are a factor pair of 12."
  - "A factor tree is a diagram we use to break a composite number down into its prime factors."
• "And here is the tricky one: 1 is NEITHER prime nor composite. It has only ONE factor — itself. Primes need exactly TWO."

**DO:**
• Point to each definition as you read it.
• For the "1 is neither" note, use emphasis: this is a common exam error.
• Ask: "Why can't 1 be prime?" Wait for responses. Confirm: "Because prime means exactly two different factors. 1 only has one factor — 1."

**TEACHER NOTES:**
These four terms are the conceptual foundation for the entire lesson. The distinction between prime and composite is the classification system students will use for every number they encounter. The note about 1 being neither prime nor composite is a frequent source of confusion and a common assessment error — making it explicit here prevents a misconception from forming. The factor tree is introduced as a TOOL, not just a diagram — students should see it as a problem-solving strategy. VTLM 2.0 element: Mathematical vocabulary — precise definitions.

**MISCONCEPTIONS:**
• Misconception: "1 is prime because it can only be divided by 1 and itself."
  Why: Students recall the definition as "divisible by 1 and itself" and apply it to 1 (where "1 and itself" are the same number).
  Quick correction: "The definition says EXACTLY TWO factors. 1 has only ONE factor. Two and one are different. So 1 does not qualify."

• Misconception: "2 is not prime because it is even."
  Why: Students associate "even" with "composite" because most even numbers are composite.
  Quick correction: "2 is special — it is the only even prime. It has exactly two factors: 1 and 2. That is the definition of prime."

**WATCH FOR:**
• Students who think 9 is prime — they forget that 3x3=9. Ask: "Can you find two numbers that multiply to give 9?"
• Students who list 0 as either prime or composite — clarify: "We are talking about natural numbers starting from 1. Zero is a special case we do not classify here."

[Maths: Stage 2 — Vocabulary | VTLM 2.0: Mathematical vocabulary]`;

const NOTES_WE1 = `**SAY:**
• "Watch me find all the factor pairs of 36 using a systematic method."
• Think aloud: "I start at 1. Does 1 go into 36? Yes — 1 times 36. That is my first pair."
• "Does 2 go into 36? 36 divided by 2 is 18. Yes — 2 times 18."
• "Does 3? 36 divided by 3 is 12. Yes — 3 times 12."
• "Does 4? 36 divided by 4 is 9. Yes — 4 times 9."
• "Does 5? 36 divided by 5 is 7.2. No — 5 is NOT a factor."
• "Does 6? 36 divided by 6 is 6. Yes — 6 times 6. And notice — both numbers in the pair are the same!"
• "Now here is the KEY insight: do I need to check 7? Well, 7 times something would need to be 36. But 7 is bigger than 6, and we already found 6x6. The pairs would start repeating in reverse. So I STOP."

**DO:**
• Write each division on the board as you test it.
• Circle the ones that work. Cross out 5.
• Draw a "STOP" line after 6x6.
• Emphasise the stopping rule: "When the smaller factor reaches the square root, stop."

**TEACHER NOTES:**
The systematic approach (starting from 1, testing each integer in order, stopping at the square root) is the key procedural skill of this lesson. The think-aloud makes the internal reasoning visible — students need to hear WHY we test each number and WHY we stop. The square root as a stopping point is an implicit concept here — we say "pairs start repeating" rather than "square root" explicitly, but advanced students may grasp the connection. 36 is chosen because it has many factors (9 total) and includes a perfect square pair (6x6), making the stopping rule clear. VTLM 2.0 element: Metacognitive modelling — think-aloud.

**WATCH FOR:**
• Students who want to continue past 6 — they may test 7, 8, 9, etc. Ask: "What would 7's partner be? 36/7 is not a whole number. What about 9? We already found 9 — it was paired with 4. The pairs are just reversing."
• Students who forget the 1x36 pair — always start with 1.

[Maths: Stage 2 — Worked Example | VTLM 2.0: Metacognitive modelling]`;

const NOTES_FACTOR_TREE = `**SAY:**
• "Now I am going to show you how to break 36 ALL the way down to its prime building blocks using a factor tree."
• "I start with 36 at the top. I need to split it into two factors. I will choose 4 times 9."
• "Is 4 prime? No — 4 = 2 times 2. Is 9 prime? No — 9 = 3 times 3."
• "Now look at what is left: 2, 2, 3, 3. Are these all prime? Yes! Every branch ends at a prime number."
• "So 36 = 2 times 2 times 3 times 3 = 2 squared times 3 squared."
• "Here is the amazing thing: it does not matter how you start. If I had split 36 as 6 times 6, then 6 = 2 times 3 and 6 = 2 times 3. I still get 2, 2, 3, 3. The SAME primes every time."

**DO:**
• Draw the factor tree step by step on the board as you narrate.
• Circle the prime numbers at the bottom of each branch.
• Write the final expression: 36 = 2 x 2 x 3 x 3 = 2^2 x 3^2.
• Emphasise: "The Fundamental Theorem of Arithmetic says every composite number has a UNIQUE prime factorisation."

**TEACHER NOTES:**
The factor tree is the primary representational tool for prime factorisation. Drawing it step by step — with the think-aloud — makes the branching logic visible. The key mathematical insight is that the prime factorisation is unique regardless of the starting split. This is the Fundamental Theorem of Arithmetic, which underpins all of number theory. We do not need to name the theorem formally, but students should experience the invariance: "no matter how you split it, the primes are the same." This insight will be tested in the You Do challenge (two different trees for 120). VTLM 2.0 element: Multiple representations — tree diagram as visual organiser.

**WATCH FOR:**
• Students who stop splitting too early (e.g., leaving 4 or 9 in the tree because they forget these are composite). Prompt: "Is 4 prime? Can you split it further?"
• Students who are unsure how to write the index notation. Clarify: "2 squared means 2 times 2. It is a shorthand."

[Maths: Stage 2 — Factor Tree | VTLM 2.0: Multiple representations]`;

const NOTES_CFU1 = `**SAY:**
• "Quick check time. Discuss with your partner: Is 23 prime or composite? How do you know?"
• Give 30 seconds for pair discussion.
• "Hands down — I will choose someone. [Name], what did you and your partner decide?"

**DO:**
• Circulate during pair discussion. Listen for reasoning, not just the answer.
• Select a non-volunteer to share.
• After the reveal: "23 is prime. It has exactly 2 factors — 1 and 23."
• "How do we KNOW? We test: 23 divided by 2 — not whole. Divided by 3 — not whole. Divided by 4 — not whole. The square root of 23 is about 4.8, so we only need to test up to 4. None of them work. Prime."

**CFU CHECKPOINT:**
Technique: Think-Pair-Share
Script:
• "Think for 10 seconds. Share with your partner for 20 seconds."
• "Thumbs up if you said prime. Thumbs down if you said composite."
• Scan the room. Look for: correct classification AND reasoning.
PROCEED (>=80%): If most pairs correctly identify 23 as prime with reasoning, move to We Do.
PIVOT (<80%): If students say composite, ask: "What factor pair did you find for 23?" They will not be able to name one. Say: "If you cannot find ANY factor pair besides 1x23, then 23 is prime by definition." Reteach with 17: "Is 17 prime? Test 2, 3, 4 — none work. So yes, prime." Re-check with 29.

**TEACHER NOTES:**
23 is chosen because it is large enough that students cannot immediately "see" it is prime — they must apply the systematic testing method. The square root stopping rule (sqrt(23) is approx 4.8, so test 2, 3, 4) makes the process efficient. This CFU checks both classification (prime/composite) and reasoning (how do you know). VTLM 2.0 element: Formative assessment — Think-Pair-Share.

**WATCH FOR:**
• Students who say "23 is prime because it is odd" — this is an insufficient reason (9 is odd but composite). Correct: "Being odd is not enough. You must check that no number divides it evenly."
• Students who test every number up to 22 — teach the square root shortcut: "You only need to test up to about 5."

[Maths: Stage 2 — CFU | VTLM 2.0: Formative assessment]`;

const NOTES_WEDO_PAIRS = `**SAY:**
• "Now let's do one together. Find all the factor pairs of 48."
• "Start at 1 — everyone write on your whiteboards. I will work through it on the board."
• Work through systematically: "1x48, 2x24, 3x16, 4x12, 6x8. Does 5 work? 48/5 = 9.6 — no. Does 6? 48/6 = 8. Yes — 6x8."
• "Now check: does 7 go in? 48/7 = 6.86 — no. 7 is bigger than the square root of 48 (about 6.9). STOP."
• "How many factor pairs? 6 pairs. How many individual factors? Count them: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48. That is 10 factors."

**DO:**
• Write each test on the board as a class activity — students call out "yes" or "no" for each test.
• Collect answers from multiple students.
• After completion, list all 10 factors in order.

**ENABLING & EXTENDING:**
ENABLING: Students who struggle can use a multiplication chart to check whether each number divides 48. Provide a pre-drawn factor pair table with the first pair (1x48) filled in.
EXTENDING: "Can you predict whether a number with exactly 10 factors is likely to be even or odd? Why?"

**TEACHER NOTES:**
48 is chosen because it has many factors (10), providing ample practice with the systematic approach. The distinction between "factor pairs" (6 pairs) and "individual factors" (10 factors) is important — students sometimes conflate these. The square root stopping rule becomes clearer here because sqrt(48) is approximately 6.9, so we test up to 6 and then stop after finding 6x8. This is the "We Do" bridge between teacher modelling and independent work. VTLM 2.0 element: Guided practice — gradual release of responsibility.

**WATCH FOR:**
• Students who count factor pairs and individual factors interchangeably — clarify: "Each factor pair contains TWO factors (except when both are the same, like 6x6 in 36)."
• Students who miss 3x16 because 16 is not in their times tables — prompt: "48 divided by 3 is...?" Have them calculate.

[Maths: Stage 3 — Guided Practice | VTLM 2.0: Guided practice]`;

const NOTES_WEDO_TREE = `**SAY:**
• "Now for the challenge: draw a factor tree for 60 and write 60 as a product of prime factors."
• "Use your whiteboards. You have 90 seconds. Go."
• "Boards up — Show Me!"

**DO:**
• Circulate while students work. Note who gets stuck on the first split.
• After Show Me: "Let me show you one way. 60 = 6 x 10. Then 6 = 2 x 3 and 10 = 2 x 5."
• "So 60 = 2 x 3 x 2 x 5. Rearranging in order: 2 x 2 x 3 x 5 = 2 squared times 3 times 5."
• "Did anyone start with a different split? 60 = 4 x 15? 4 = 2 x 2 and 15 = 3 x 5. Same answer!"

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Boards up — Show Me your factor tree!"
• Look for: correct tree structure, all leaves are prime, correct final expression.
• "Now boards up — show me the prime factorisation as a product."
• Look for: 2^2 x 3 x 5 (or equivalent: 2 x 2 x 3 x 5).
PROCEED (>=80%): If most students produce correct trees and expressions, move to CFU 2.
PIVOT (<80%): If students cannot start the tree, model the first split: "Pick ANY two factors of 60. 2 x 30 is fine. Now split 30: 2 x 15. Split 15: 3 x 5. Done." Emphasise: "You can start anywhere." Re-check with 40.

**ENABLING & EXTENDING:**
ENABLING: Provide a partially completed factor tree for 60 (first split done: 60 = 6 x 10) and have students complete the remaining branches.
EXTENDING: "What is the prime factorisation of 360? How does it relate to 60?"

**TEACHER NOTES:**
This problem pair tests whether students can apply the factor tree independently. 60 is chosen because it has multiple valid starting splits, reinforcing the Fundamental Theorem of Arithmetic (all paths lead to the same primes). The Show Me Boards technique gives instant whole-class data. Asking for different starting splits from different students demonstrates the uniqueness of prime factorisation experientially. VTLM 2.0 element: Collaborative practice — shared problem solving.

**MISCONCEPTIONS:**
• Misconception: Students think different starting splits give different prime factorisations.
  Why: They see different trees and assume different answers.
  Quick correction: Compare two different trees side by side. "Count the 2s, count the 3s, count the 5s. Same every time."

**WATCH FOR:**
• Students who write 60 = 2 x 30 and stop — they have not split 30 further. Prompt: "Is 30 prime?"
• Students who write 60 = 2 x 2 x 15 and stop — same issue with 15.

[Maths: Stage 3 — Problem Pair | VTLM 2.0: Collaborative practice]`;

const NOTES_CFU2 = `**SAY:**
• "Hinge question time. Look at the four options on screen. Which one is the correct prime factorisation of 72?"
• "I want you to vote with your fingers. Hold up 1, 2, 3, or 4 fingers. Do NOT show your answer until I say go."
• "3, 2, 1 — VOTE!"

**DO:**
• Give students 20 seconds to think before voting.
• Scan the room and count. Note which incorrect options are popular.
• Reveal: "The answer is B — 72 = 2 cubed times 3 squared."
• "Why not A? 8 times 9 is 72 — correct multiplication — but 8 and 9 are NOT prime. A, C, and D all use composite factors."
• "Prime factorisation means EVERY factor must be prime. 2 and 3 are prime. 8, 9, 6, 12, 36 are NOT."

**CFU CHECKPOINT:**
Technique: Finger Voting
Script:
• "Fingers up in 3, 2, 1 — VOTE!"
• Look for: B (correct). Note who votes A (common error — correct product but not prime factors).
PROCEED (>=80%): If most students vote B, move to You Do.
PIVOT (<80%): If many students vote A, ask: "Is 8 prime? How many factors does 8 have?" [1, 2, 4, 8 = 4 factors — composite.] "So 8 x 9 is a correct FACTORISATION of 72, but it is not a PRIME factorisation." Reteach: draw the factor tree for 72 live. 72 = 8 x 9 = (2x2x2) x (3x3) = 2^3 x 3^2. Re-check: "Is 2^3 x 3^2 the PRIME factorisation? Yes — every factor is prime."

**MISCONCEPTIONS:**
• Misconception: Any correct multiplication that equals 72 is a "prime factorisation."
  Why: Students focus on the PRODUCT being correct rather than the FACTORS being prime.
  Quick correction: "Prime factorisation has two requirements: (1) the product must equal the number, AND (2) every factor must be prime."

**TEACHER NOTES:**
This hinge question is a critical diagnostic. Option A (8 x 9) is the most common error because students see a correct product and assume that is sufficient. The distinction between "a factorisation" and "the PRIME factorisation" is the conceptual hurdle. Options C (2 x 36) and D (6 x 12) test the same misconception with different numbers. Only B satisfies both conditions. The finger voting technique ensures every student commits to an answer before the reveal. VTLM 2.0 element: Hinge-point assessment — diagnostic question.

**WATCH FOR:**
• Students who vote C or D — they may not even realise 36, 6, and 12 are composite. Flash check: "Is 6 prime? How many factors does it have?"
• Students who change their vote after seeing others — remind: "Commit to YOUR answer. We learn from mistakes."

[Maths: Stage 3 — Hinge Question | VTLM 2.0: Hinge-point assessment]`;

const NOTES_YOUDO = `**SAY:**
• "Time for independent practice. You have three tasks."
• Read each task aloud:
  - "First: Find all factor pairs of 72."
  - "Next: Draw a factor tree for 72."
  - "Then: Express 72 as a product of its prime factors."
• "If you finish early, there is a challenge: draw TWO different factor trees for 120. Do you get the same prime factorisation?"
• "Work silently and independently. Show your working."

**DO:**
• Write the tasks on the board for reference.
• Circulate continuously. Target students who struggled on the We Do tasks first.
• For the challenge: "120 is bigger — you will need more branches. But the same process works."

**ENABLING & EXTENDING:**
ENABLING: Provide a structured factor pair table for 72 with column headers "Factor 1 | Factor 2" and the first pair (1 x 72) pre-filled. For the factor tree, provide the first split (72 = 8 x 9) and let students complete the branches.
EXTENDING: "Draw two different factor trees for 120 and verify they give the same prime factorisation. Then find the prime factorisation of 180. What primes do 120 and 180 share?"

**TEACHER NOTES:**
72 is chosen for independent practice because students just analysed it in the hinge question — they already know the answer (2^3 x 3^2) but must now demonstrate the PROCESS. This tests procedural fluency rather than just answer recall. The challenge (120 = 2^3 x 3 x 5, two different trees) directly tests the Fundamental Theorem of Arithmetic. Students who complete this have secure understanding. Circulating with a targeted sequence (struggling students first) maximises formative impact. VTLM 2.0 element: Differentiated practice — enabling and extending prompts.

**WATCH FOR:**
• Students who list factor pairs of 72 but miss some: full list is 1x72, 2x36, 3x24, 4x18, 6x12, 8x9. That is 6 pairs, 12 individual factors.
• Students who draw the factor tree but forget to write the final expression — prompt: "Now write it as a product using index notation."
• Challenge students who say 120 trees are "different answers" — have them count each prime factor. Both trees should give 2^3 x 3 x 5.

[Maths: Stage 4 — Independent Practice | VTLM 2.0: Differentiated practice]`;

const NOTES_EXIT = `**SAY:**
• "Pens down on your practice work. Exit ticket time — three questions, three minutes."
• Read each question aloud:
  - "Question 1: Is 51 prime or composite? Show your reasoning."
  - "Question 2: Express 90 as a product of its prime factors."
  - "Question 3: Why is 1 neither prime nor composite?"
• "Work silently and independently."

**DO:**
• Collect workbooks/papers immediately after the exit ticket.
• Mark tonight — categorise students as secure / developing / not yet for each SC.
• Q1 answer: 51 = 3 x 17, so composite (common trap — 51 looks prime but 5+1=6, divisible by 3).
• Q2 answer: 90 = 2 x 3^2 x 5.
• Q3 answer: 1 has only one factor (itself). Primes need exactly 2 factors. Composite needs more than 2. One factor fits neither category.

**TEACHER NOTES:**
The exit ticket tests all three success criteria. Q1 tests SC2 (prime vs composite classification) with a deliberately tricky number — 51 is commonly mistaken for prime because it ends in 1. The divisibility rule for 3 (digit sum 5+1=6, divisible by 3) provides the key insight. Q2 tests SC3 (prime factorisation) with a new number not used in the lesson. Q3 tests conceptual understanding of SC2 — the definition of prime requires EXACTLY 2 factors. Students who answer all three correctly have met the lesson learning intention. VTLM 2.0 element: Summative-formative assessment — exit ticket.

**WATCH FOR:**
• Students who say 51 is prime — they have not tested divisibility by 3. Note these students for Session 3 enable group.
• Students who write 90 = 9 x 10 and stop — they have factorised but not found PRIME factors.
• Students who say "1 is prime because it is only divisible by itself" — they have the wrong definition. Flag for reteach.

[Maths: Stage 5 — Exit Ticket | VTLM 2.0: Summative-formative assessment]`;

const NOTES_CLOSING = `**SAY:**
• "Turn to your partner. Discuss: Why is it useful to break a number into its prime factors? When might you use this in real life?"
• Give 60 seconds for discussion.
• "Let's hear some ideas." Take 2-3 responses.
• Summarise: "Prime factorisation tells us the DNA of a number — its unique building blocks. We will use this in our next sessions to find highest common factors and lowest common multiples."

**DO:**
• Point to each key takeaway as you read it.
• Preview Session 3: "Next session we use prime factorisation to find HCF. If you can build factor trees, you are ready."

**TEACHER NOTES:**
The Turn & Talk reflection consolidates learning by requiring students to articulate the PURPOSE of prime factorisation, not just the procedure. The "DNA of a number" metaphor connects to students' science knowledge and makes the abstract concept memorable. The preview of HCF/LCM creates anticipation and shows students that today's skills are tools for upcoming problem-solving. The three key takeaways reinforce: (1) uniqueness of prime factorisation, (2) invariance of the tree method, (3) practical application in coming sessions. VTLM 2.0 element: Metacognitive reflection — connecting learning to purpose.

**WATCH FOR:**
• Students who cannot articulate why prime factorisation is useful — this suggests procedural understanding without conceptual depth. Note for Session 3 scaffolding.
• Students who are excited about the HCF/LCM preview — these are your extending group for Session 3.

[Maths: Closing | VTLM 2.0: Metacognitive reflection]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build function
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Year 5/6 Maths";
  pres.title = "Session 2: Factor Pairs & Prime Factorisation";

  // ── Slide 1: Title ────────────────────────────────────────────────────────
  titleSlide(
    pres,
    "Factor Pairs & Prime Factorisation",
    "Breaking numbers into their building blocks",
    "Year 5/6 | Number Properties | Session 2 of 5",
    NOTES_TITLE
  );

  // ── Slide 2: Daily Review — Rectangle Factor Pairs (Stage 1) ─────────────
  contentSlide(
    pres,
    1,
    "Daily Review",
    "Multiplication and Division as Inverse Operations",
    [
      "I can express natural numbers as products of their factors",
      "Q1: List all rectangles you can make with 18 blocks.",
      "Q2: List all rectangles you can make with 24 blocks.",
      "Q3: List all rectangles you can make with 36 blocks.",
    ],
    NOTES_DR1,
    FOOTER,
    (s) => {
      // Right side: three answer cards stacked
      const questions = [
        { q: "18", pairs: "1x18, 2x9, 3x6", color: C.AMBER },
        { q: "24", pairs: "1x24, 2x12, 3x8, 4x6", color: C.NAVY },
        { q: "36", pairs: "1x36, 2x18, 3x12, 4x9, 6x6", color: C.TEAL },
      ];

      questions.forEach((item, i) => {
        const cy = CONTENT_TOP + i * 1.2;
        // Number callout
        s.addShape("roundRect", {
          x: 5.3, y: cy, w: 1.1, h: 0.95, rectRadius: 0.1,
          fill: { color: item.color },
          shadow: makeCardShadow(),
        });
        s.addText(item.q, {
          x: 5.3, y: cy, w: 1.1, h: 0.95,
          fontSize: 32, fontFace: FONT_H, color: C.WHITE,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
        // Pairs card
        addCard(s, 6.55, cy, 2.9, 0.95);
        s.addText(item.pairs, {
          x: 6.65, y: cy + 0.05, w: 2.7, h: 0.85,
          fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
          align: "left", valign: "middle", margin: 0,
        });
      });
    }
  );

  // ── Slide 3: Daily Review — Prior Topic Review (Stage 1) ──────────────────
  contentSlide(
    pres,
    1,
    "Daily Review",
    "Prior Topic Review",
    [
      "Q4: Start at 5, apply rule x2 + 1. Write first 4 outputs.",
      "     5 -> ? -> ? -> ? -> ?",
      "Q5: 563 x 4 using doubling?",
      "     563 x 2 = ?     then double again = ?",
    ],
    NOTES_DR2,
    FOOTER,
    (s) => {
      // Right side: answer cards
      const ansY1 = CONTENT_TOP + 0.2;
      addCard(s, 5.3, ansY1, 4.2, 1.4, { strip: C.AMBER });
      s.addText("Q4 Answer", {
        x: 5.5, y: ansY1 + 0.08, w: 3.8, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.AMBER, bold: true, margin: 0,
      });
      s.addText("5 -> 11 -> 23 -> 47 -> 95\nOutputs: 11, 23, 47, 95", {
        x: 5.5, y: ansY1 + 0.4, w: 3.8, h: 0.9,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });

      const ansY2 = ansY1 + 1.6;
      addCard(s, 5.3, ansY2, 4.2, 1.4, { strip: C.NAVY });
      s.addText("Q5 Answer", {
        x: 5.5, y: ansY2 + 0.08, w: 3.8, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
      });
      s.addText("563 x 2 = 1 126\n1 126 x 2 = 2 252", {
        x: 5.5, y: ansY2 + 0.4, w: 3.8, h: 0.9,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    }
  );

  // ── Slide 4: LI & SC ──────────────────────────────────────────────────────
  liSlide(
    pres,
    [
      "We are learning to express composite numbers as products of their factors, including prime factors, so we can understand how numbers are built.",
    ],
    [
      "I can list all factor pairs of a given number.",
      "I can identify whether a number is prime or composite.",
      "I can express a composite number as a product of its prime factors using a factor tree.",
    ],
    NOTES_LI,
    FOOTER
  );

  // ── Slide 5: Vocabulary (I Do — Stage 2) ──────────────────────────────────
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["2"];
    addTopBar(s, stageColor);
    addStageBadge(s, 2, "Explicit Instruction — I Do");
    addTitle(s, "Key Vocabulary", { y: 0.65, fontSize: 22, color: stageColor });

    // Four vocab cards stacked vertically
    const vocabItems = [
      {
        term: "Prime Number",
        def: "Exactly 2 factors (1 and itself)",
        ex: "e.g. 2, 3, 5, 7, 11",
        color: C.NAVY,
      },
      {
        term: "Composite Number",
        def: "More than 2 factors",
        ex: "e.g. 4, 6, 8, 9, 10",
        color: C.TEAL,
      },
      {
        term: "Factor Pair",
        def: "Two numbers that multiply to give a product",
        ex: "e.g. 3 and 4 are a factor pair of 12",
        color: C.AMBER,
      },
      {
        term: "Factor Tree",
        def: "A diagram breaking a number into prime factors",
        ex: "e.g. 12 -> 2 x 2 x 3",
        color: C.CORAL,
      },
    ];

    const cardH = 0.78;
    const gap = 0.1;
    const startY = CONTENT_TOP;

    vocabItems.forEach((item, i) => {
      const cy = startY + i * (cardH + gap);

      // Left colour strip + card
      addCard(s, 0.5, cy, 8.5, cardH, { strip: item.color });

      // Term (bold, coloured)
      s.addText(item.term, {
        x: 0.75, y: cy + 0.05, w: 2.4, h: cardH - 0.1,
        fontSize: 15, fontFace: FONT_H, color: item.color,
        bold: true, margin: 0, valign: "middle",
      });

      // Definition
      s.addText(item.def, {
        x: 3.2, y: cy + 0.05, w: 3.3, h: cardH - 0.1,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL,
        margin: 0, valign: "middle",
      });

      // Example
      s.addText(item.ex, {
        x: 6.6, y: cy + 0.05, w: 2.2, h: cardH - 0.1,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED,
        italic: true, margin: 0, valign: "middle",
      });
    });

    // Note about 1
    const noteY = startY + 4 * (cardH + gap) + 0.05;
    addTextOnShape(s, "1 is NEITHER prime nor composite — it has only 1 factor", {
      x: 0.5, y: noteY, w: 8.5, h: 0.45, rectRadius: 0.08,
      fill: { color: C.CORAL },
    }, {
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_VOCAB);
  }

  // ── Slide 6: Worked Example 1 — Factor Pairs of 36 (I Do — Stage 2) ─────
  workedExSlide(
    pres,
    2,
    "Explicit Instruction — I Do",
    "Finding All Factor Pairs of 36",
    [
      "Start from 1 and work up systematically:",
      "1 x 36 = 36  ✓",
      "2 x 18 = 36  ✓",
      "3 x 12 = 36  ✓",
      "4 x  9 = 36  ✓",
      "5 x  ? = 36 ÷ 5 = 7.2  ✗",
      "6 x  6 = 36  ✓  →  STOP (pairs repeat)",
      "36 has 5 factor pairs and 9 individual factors.",
    ],
    NOTES_WE1,
    FOOTER,
    (s) => {
      // Right side: visual representation of factor pairs
      const pairs = [
        { a: "1", b: "36", color: C.NAVY },
        { a: "2", b: "18", color: C.NAVY },
        { a: "3", b: "12", color: C.TEAL },
        { a: "4", b: "9", color: C.TEAL },
        { a: "6", b: "6", color: C.CORAL },
      ];

      const startX = 5.4;
      const pairW = 4.0;
      const pairH = 0.52;
      const pairGap = 0.12;
      const pY = CONTENT_TOP + 0.05;

      // Header
      s.addText("Factor Pairs of 36", {
        x: startX, y: pY, w: pairW, h: 0.35,
        fontSize: 12, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
      });

      pairs.forEach((pair, i) => {
        const cy = pY + 0.4 + i * (pairH + pairGap);
        const textColor = getContrastColor(pair.color);

        // Left factor pill
        addTextOnShape(s, pair.a, {
          x: startX, y: cy, w: 1.1, h: pairH, rectRadius: 0.08,
          fill: { color: pair.color },
        }, {
          fontSize: 20, fontFace: FONT_H, color: textColor, bold: true,
        });

        // "x" symbol
        s.addText("x", {
          x: startX + 1.15, y: cy, w: 0.35, h: pairH,
          fontSize: 16, fontFace: FONT_H, color: C.MUTED,
          align: "center", valign: "middle", margin: 0,
        });

        // Right factor pill
        addTextOnShape(s, pair.b, {
          x: startX + 1.55, y: cy, w: 1.1, h: pairH, rectRadius: 0.08,
          fill: { color: pair.color },
        }, {
          fontSize: 20, fontFace: FONT_H, color: textColor, bold: true,
        });

        // "= 36"
        s.addText("= 36", {
          x: startX + 2.7, y: cy, w: 1.0, h: pairH,
          fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL,
          align: "center", valign: "middle", margin: 0,
        });
      });

      // STOP marker
      const stopY = pY + 0.4 + 5 * (pairH + pairGap);
      addTextOnShape(s, "STOP — pairs start repeating!", {
        x: startX, y: stopY, w: pairW, h: 0.38, rectRadius: 0.08,
        fill: { color: C.CORAL },
      }, {
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 7: Worked Example 2 — Factor Tree for 36 (I Do — Stage 2) ─────
  contentSlide(
    pres,
    2,
    "Explicit Instruction — I Do",
    "Factor Tree for 36",
    [
      "Start with 36 at the top.",
      "Split: 36 = 4 x 9",
      "Split 4: 4 = 2 x 2  (both prime — circle them)",
      "Split 9: 9 = 3 x 3  (both prime — circle them)",
      "Collect the primes: 2 x 2 x 3 x 3",
      "Write in index notation:",
      "36 = 2\u00B2 x 3\u00B2",
    ],
    NOTES_FACTOR_TREE,
    FOOTER,
    (s) => {
      // Right side: visual factor tree for 36
      const treeX = 7.0;  // center x for the tree
      const treeY = CONTENT_TOP + 0.1;
      const nodeW = 0.65;
      const nodeH = 0.5;
      const levelGap = 0.7;

      // Helper to draw a tree node
      function drawNode(x, y, text, isPrime) {
        const fillColor = isPrime ? C.TEAL : C.NAVY;
        s.addShape("roundRect", {
          x: x - nodeW / 2, y, w: nodeW, h: nodeH, rectRadius: isPrime ? nodeH / 2 : 0.08,
          fill: { color: fillColor },
          shadow: makeCardShadow(),
        });
        s.addText(text, {
          x: x - nodeW / 2, y, w: nodeW, h: nodeH,
          fontSize: 16, fontFace: FONT_H, color: C.WHITE,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
      }

      // Helper to draw a connector line
      function drawLine(x1, y1, x2, y2) {
        s.addShape("line", {
          x: x1, y: y1, w: x2 - x1, h: y2 - y1,
          line: { color: C.MUTED, width: 1.5 },
        });
      }

      // Level 0: 36
      drawNode(treeX, treeY, "36", false);

      // Lines from 36 to 4 and 9
      drawLine(treeX - 0.15, treeY + nodeH, treeX - 0.8, treeY + levelGap);
      drawLine(treeX + 0.15, treeY + nodeH, treeX + 0.8, treeY + levelGap);

      // Level 1: 4 and 9
      const l1Y = treeY + levelGap;
      drawNode(treeX - 0.85, l1Y, "4", false);
      drawNode(treeX + 0.85, l1Y, "9", false);

      // Lines from 4 to 2, 2
      drawLine(treeX - 0.95, l1Y + nodeH, treeX - 1.35, l1Y + levelGap);
      drawLine(treeX - 0.75, l1Y + nodeH, treeX - 0.35, l1Y + levelGap);

      // Lines from 9 to 3, 3
      drawLine(treeX + 0.75, l1Y + nodeH, treeX + 0.35, l1Y + levelGap);
      drawLine(treeX + 0.95, l1Y + nodeH, treeX + 1.35, l1Y + levelGap);

      // Level 2: 2, 2, 3, 3 (all prime — circled)
      const l2Y = l1Y + levelGap;
      drawNode(treeX - 1.35, l2Y, "2", true);
      drawNode(treeX - 0.35, l2Y, "2", true);
      drawNode(treeX + 0.35, l2Y, "3", true);
      drawNode(treeX + 1.35, l2Y, "3", true);

      // Result expression at bottom
      const resultY = l2Y + nodeH + 0.2;
      addTextOnShape(s, "36 = 2\u00B2 x 3\u00B2", {
        x: treeX - 1.6, y: resultY, w: 3.2, h: 0.48, rectRadius: 0.08,
        fill: { color: C.NAVY },
      }, {
        fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 8: CFU 1 — Think-Pair-Share (Stage 2) — withReveal ─────────────
  withReveal(
    () => cfuSlide(
      pres, 2, "Check", "Quick Check",
      "Think-Pair-Share",
      "Is 23 prime or composite?\n\nDiscuss with your partner — how do you know?",
      NOTES_CFU1, FOOTER
    ),
    (s) => {
      addTextOnShape(s, "PRIME — 23 has exactly 2 factors (1 and 23).\nTesting: not divisible by 2, 3, or any number up to \u221A23 \u2248 4.8", {
        x: 1.2, y: 3.8, w: 7.6, h: 0.9, rectRadius: 0.1,
        fill: { color: C.EMERALD },
      }, {
        fontSize: 15, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 9: We Do — Factor Pairs of 48 (Stage 3) ────────────────────────
  contentSlide(
    pres,
    3,
    "Guided Practice — We Do",
    "Let's Find Factor Pairs Together",
    [
      "Find all factor pairs of 48 together:",
      "1 x 48  ✓",
      "2 x 24  ✓",
      "3 x 16  ✓",
      "4 x 12  ✓",
      "5 x ? — 48 ÷ 5 = 9.6  ✗",
      "6 x 8  ✓  →  STOP (7\u00B2 = 49 > 48)",
      "48 has 10 factors: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48",
    ],
    NOTES_WEDO_PAIRS,
    FOOTER,
    (s) => {
      // Right side: factor summary card
      addCard(s, 5.3, CONTENT_TOP, 4.2, SAFE_BOTTOM - CONTENT_TOP, { fill: C.WHITE });

      // Header
      addTextOnShape(s, "48 — Factor Summary", {
        x: 5.3, y: CONTENT_TOP, w: 4.2, h: 0.44, rectRadius: 0,
        fill: { color: STAGE_COLORS["3"] },
      }, {
        fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Factor pair pills
      const pairs48 = [
        { a: "1", b: "48" },
        { a: "2", b: "24" },
        { a: "3", b: "16" },
        { a: "4", b: "12" },
        { a: "6", b: "8" },
      ];

      const pillStartY = CONTENT_TOP + 0.55;
      const pillH = 0.38;
      const pillGap = 0.08;

      pairs48.forEach((pair, i) => {
        const py = pillStartY + i * (pillH + pillGap);
        // Left pill
        addTextOnShape(s, pair.a, {
          x: 5.5, y: py, w: 0.8, h: pillH, rectRadius: 0.06,
          fill: { color: C.TEAL },
        }, {
          fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
        });
        // x
        s.addText("x", {
          x: 6.35, y: py, w: 0.3, h: pillH,
          fontSize: 13, fontFace: FONT_H, color: C.MUTED,
          align: "center", valign: "middle", margin: 0,
        });
        // Right pill
        addTextOnShape(s, pair.b, {
          x: 6.7, y: py, w: 0.8, h: pillH, rectRadius: 0.06,
          fill: { color: C.TEAL },
        }, {
          fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
        });
        // = 48
        s.addText("= 48", {
          x: 7.55, y: py, w: 0.8, h: pillH,
          fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
          align: "left", valign: "middle", margin: 0,
        });
      });

      // Count summary
      const countY = pillStartY + 5 * (pillH + pillGap) + 0.1;
      addTextOnShape(s, "6 pairs = 10 individual factors", {
        x: 5.5, y: countY, w: 3.4, h: 0.36, rectRadius: 0.06,
        fill: { color: C.NAVY },
      }, {
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 10: We Do — Factor Tree for 60 (Stage 3) — withReveal ──────────
  withReveal(
    () => cfuSlide(
      pres, 3, "Guided Practice — We Do", "Your Turn — Factor Tree",
      "Show Me Boards",
      "Draw a factor tree for 60.\n\nWrite 60 as a product of its prime factors.",
      NOTES_WEDO_TREE, FOOTER
    ),
    (s) => {
      // Add answer: factor tree visual + expression
      // Answer banner — positioned below the centred question text
      addTextOnShape(s, "60 = 2\u00B2 x 3 x 5", {
        x: 1.5, y: 4.1, w: 3.0, h: 0.45, rectRadius: 0.08,
        fill: { color: C.EMERALD },
      }, {
        fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Mini factor tree for 60 on the right — compact to avoid text overlap
      const tx = 7.2;
      const ty = 3.7;
      const nW = 0.48;
      const nH = 0.32;

      function miniNode(x, y, text, prime) {
        s.addShape("roundRect", {
          x: x - nW / 2, y, w: nW, h: nH, rectRadius: prime ? nH / 2 : 0.06,
          fill: { color: prime ? C.TEAL : C.NAVY },
        });
        s.addText(text, {
          x: x - nW / 2, y, w: nW, h: nH,
          fontSize: 12, fontFace: FONT_H, color: C.WHITE,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
      }

      function miniLine(x1, y1, x2, y2) {
        s.addShape("line", {
          x: x1, y: y1, w: x2 - x1, h: y2 - y1,
          line: { color: C.MUTED, width: 1 },
        });
      }

      // 60
      miniNode(tx, ty, "60", false);
      miniLine(tx - 0.1, ty + nH, tx - 0.55, ty + 0.4);
      miniLine(tx + 0.1, ty + nH, tx + 0.55, ty + 0.4);

      // 6 and 10
      miniNode(tx - 0.6, ty + 0.42, "6", false);
      miniNode(tx + 0.6, ty + 0.42, "10", false);

      // 6 -> 2, 3
      miniLine(tx - 0.67, ty + 0.42 + nH, tx - 0.95, ty + 0.85);
      miniLine(tx - 0.53, ty + 0.42 + nH, tx - 0.25, ty + 0.85);

      // 10 -> 2, 5
      miniLine(tx + 0.53, ty + 0.42 + nH, tx + 0.25, ty + 0.85);
      miniLine(tx + 0.67, ty + 0.42 + nH, tx + 0.95, ty + 0.85);

      // Primes
      miniNode(tx - 0.95, ty + 0.88, "2", true);
      miniNode(tx - 0.25, ty + 0.88, "3", true);
      miniNode(tx + 0.25, ty + 0.88, "2", true);
      miniNode(tx + 0.95, ty + 0.88, "5", true);
    }
  );

  // ── Slide 11: CFU 2 — Hinge Question (Stage 3) — withReveal ──────────────
  withReveal(
    () => cfuSlide(
      pres, 3, "Check", "Hinge Question",
      "Finger Voting",
      "Which is the correct prime factorisation of 72?\n\nA)  8 x 9\nB)  2\u00B3 x 3\u00B2\nC)  2 x 36\nD)  6 x 12",
      NOTES_CFU2, FOOTER
    ),
    (s) => {
      addTextOnShape(s, "B — 72 = 2\u00B3 x 3\u00B2\nOptions A, C, D use composite factors, not prime factors.", {
        x: 1.0, y: 4.15, w: 8.0, h: 0.8, rectRadius: 0.1,
        fill: { color: C.EMERALD },
      }, {
        fontSize: 15, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 12: You Do — Independent Practice (Stage 4) ────────────────────
  contentSlide(
    pres,
    4,
    "Independent Practice — You Do",
    "Independent Practice",
    [
      "First: Find all factor pairs of 72.",
      "Next: Draw a factor tree for 72.",
      "Then: Express 72 as a product of its prime factors.",
    ],
    NOTES_YOUDO,
    FOOTER,
    (s) => {
      // Right side: challenge card
      addCard(s, 5.2, CONTENT_TOP, 4.3, SAFE_BOTTOM - CONTENT_TOP, { fill: C.WHITE });

      // Challenge header
      addTextOnShape(s, "Challenge — Extend", {
        x: 5.2, y: CONTENT_TOP, w: 4.3, h: 0.44, rectRadius: 0,
        fill: { color: C.CORAL },
      }, {
        fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Challenge text
      s.addText([
        { text: "Draw TWO different factor trees for 120.\n", options: { bold: true, breakLine: true, fontSize: 13 } },
        { text: "Do you get the same prime factorisation?\n\n", options: { breakLine: true, fontSize: 13 } },
        { text: "Tree 1: Start with 120 = 10 x 12\n", options: { breakLine: true, fontSize: 12, color: C.MUTED } },
        { text: "Tree 2: Start with 120 = 8 x 15\n\n", options: { breakLine: true, fontSize: 12, color: C.MUTED } },
        { text: "Both should give: 120 = 2\u00B3 x 3 x 5", options: { bold: true, fontSize: 13, color: C.TEAL } },
      ], {
        x: 5.4, y: CONTENT_TOP + 0.55, w: 3.9, h: 2.8,
        fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });
    }
  );

  // ── Slide 13: Exit Ticket (Stage 5) ────────────────────────────────────────
  exitTicketSlide(
    pres,
    [
      "Is 51 prime or composite? Show your reasoning.",
      "Express 90 as a product of its prime factors.",
      "Why is 1 neither prime nor composite?",
    ],
    NOTES_EXIT,
    FOOTER
  );

  // ── Slide 14: Closing ──────────────────────────────────────────────────────
  closingSlide(
    pres,
    "Why is it useful to break a number into its prime factors? When might you use this in real life?",
    [
      "Every composite number has a unique prime factorisation.",
      "Factor trees always lead to the same primes, no matter how you start.",
      "Prime factorisation helps us find HCF and LCM (coming later this week!).",
    ],
    NOTES_CLOSING
  );

  // ── Write PPTX ─────────────────────────────────────────────────────────────
  const pptxPath = OUT_DIR + "/NP_Lesson2_Factor_Pairs_Prime_Factorisation.pptx";
  await pres.writeFile({ fileName: pptxPath });
  console.log("Written: " + pptxPath);
}

build().catch(console.error);
