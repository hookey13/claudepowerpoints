// Lesson 1 of 3: Factors, Multiples & Divisibility Algorithms
// Year 5/6 Numeracy — Number Properties 2
// VC2M5N10 (algorithms with branching/repetition, factors, multiples, divisibility)
// Week 1, Session 1

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

const OUT_DIR = "output/NP2_Lesson1_Factors_Multiples_Algorithms";
const FOOTER = "Session 1 of 3 | Factors, Multiples & Algorithms | Year 5/6 Maths";

// ── Teacher notes ─────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
• "Welcome to our Factors, Multiples and Divisibility Algorithms unit. Over three sessions we'll explore how to use step-by-step algorithms — including flowcharts with yes/no decisions — to test whether numbers are factors, multiples, or divisible by other numbers."
• "Today we focus on building and using a flowchart algorithm to test for factors and multiples. By the end of the session, you'll be able to follow a decision-making flowchart and describe the patterns that emerge when you apply divisibility rules."

**DO:**
• Display the title slide as students settle. Ensure mini-whiteboards and markers are on every desk.
• Direct attention to the unit title — "This is Session 1 of 3."

**TEACHER NOTES:**
Lesson 1 of a 3-session unit covering VC2M5N10 (algorithms with branching and repetition to investigate factors, multiples, and divisibility). Today establishes the connection between division tests and algorithmic thinking — students learn to represent the "Is X a factor of Y?" question as a flowchart with a branching decision (whole number result? YES/NO). This algorithmic framing recurs in Lessons 2 and 3 where students build more complex algorithms for divisibility rules and LCM/HCF. Students need fluent multiplication and division facts to access the division test — the Daily Review and Fluency phases target this prerequisite.

**WATCH FOR:**
• Students who seem unfamiliar with the terms "factor" or "multiple" — note for closer monitoring during I Do.
• Readiness signal: students settling quickly with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR1 = `**SAY:**
• "Let's warm up our mathematical thinking. Today's review focuses on patterns and algorithms — applying a rule over and over and recording what happens."
• "Question 1: Start at 2 and apply the rule 'multiply by 3 then subtract 1.' Record the first five terms in your table."
• "Question 2: Start at 64. If the number is even, halve it. Record in your table until you reach 1. Count how many steps it takes."

**DO:**
• Display the slide. Read each question aloud.
• Allow 60–90 seconds per question. Students write in their books or on whiteboards.
• For Q1: check tables after 90 seconds. "Who has 2, 5, 14, 41, 122?"
• For Q2: check after 60 seconds. "How many steps? Six steps to get from 64 to 1."

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Hold up your table for Q1. I'm scanning for five terms: 2, 5, 14, 41, 122. Ready… show me!"
• Scan for: correct sequence on ≥80% of boards.
PROCEED: If ≥80% correct, move to DR Slide 2.
PIVOT: If students struggle with the iterative rule, model the first two steps slowly: "Start with 2. Multiply by 3: that's 6. Subtract 1: that's 5. Now start with 5. Multiply by 3: that's 15. Subtract 1: that's 14." Re-run Q1.

**TEACHER NOTES:**
Daily Review Slide 1 targets algorithmic thinking prerequisites — applying a rule iteratively and recording outcomes in a table. Q1 uses a compound operation rule (multiply then subtract), building fluency with multi-step calculations. Q2 introduces the concept of branching (if even, halve) which foreshadows the factor-testing flowchart in the I Do phase. The halving sequence from 64 is deliberately chosen because it is a power of 2, so every step produces an even number — students won't encounter the "odd" branch yet. This builds confidence with the halving operation before the Pattern Investigation introduces the full even/odd branching rule.

**WATCH FOR:**
• Students who apply the rule incorrectly (e.g., "multiply by 3" but forget to "subtract 1") — they may not be reading the full rule. Point to both parts.
• Students who stop the halving sequence early (e.g., stopping at 2 instead of 1) — clarify: "Keep going until you reach exactly 1."
• Readiness signal: fast, accurate table completion with correct term counts.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_DR2 = `**SAY:**
• "Now let's review how multiplication and division connect. We're going to think about factor pairs using rectangle arrays."
• "Q3: 12 blocks can be arranged into these rectangles: 1 by 12, 2 by 6, 3 by 4. Now think about 18 blocks. How many different rectangles can you make? List them."
• "Q4: Express 24 as a product of two factors in as many ways as you can."

**DO:**
• Display the slide. Draw attention to the rectangle visual on the right.
• Allow 90 seconds for Q3 and Q4. Students work on whiteboards.
• Check Q3: "18 blocks — 1 by 18, 2 by 9, 3 by 6. That's three different rectangles."
• Check Q4: "24 = 1 times 24, 2 times 12, 3 times 8, 4 times 6. Four ways."

**CFU CHECKPOINT:**
Technique: Think-Pair-Share
Script:
• "Think about Q3 on your own for 30 seconds. Now turn to your partner — share your rectangles. Did you get the same ones?"
• Scan for: students listing at least 2 of the 3 rectangles for 18.
PROCEED: If most pairs identify all 3 rectangles, move to Fluency.
PIVOT: If students miss rectangles, prompt: "Did you try dividing 18 by 2? By 3? What about 1?" The systematic approach previews the factor-testing algorithm.

**TEACHER NOTES:**
DR Slide 2 connects factor pairs to the concrete representation of rectangle arrays. This builds on prior learning from the Number Properties unit where students found factor pairs systematically. The rectangle model makes factor pairs visual — each factor pair corresponds to a unique rectangle arrangement. This review activates prior knowledge that will be reframed today through an algorithmic lens. The transition from "find factor pairs" to "use a flowchart to test for factors" is the key conceptual shift in this lesson.

**WATCH FOR:**
• Students who list rectangles randomly rather than systematically — they may not be using the divide-from-1 approach. The I Do phase will formalise this into a flowchart.
• Students who count 1 by 18 and 18 by 1 as different rectangles — clarify: "In maths, 1 by 18 and 18 by 1 are the same rectangle, just rotated."
• Readiness signal: students quickly listing factor pairs and connecting them to rectangles.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
• "Fluency time. You have 60 seconds to complete as many multiplication problems as you can. Write your answers quickly — no skipping."
• "These target the tables you'll need all lesson: times 7, 8, 9, 11 and 12."
• "Ready? Pencils up… GO."
• After 60 seconds: "Pens down. Let's check. Call out your answer for number 1…"

**DO:**
• Display the slide. Students work silently for 60 seconds on the multiplication grid.
• Time exactly 60 seconds. Say "GO" to start and "STOP" to end.
• Read answers aloud quickly — students self-mark. Ask for hands up: "Who got 10 or more correct?"

**TEACHER NOTES:**
Fluency builds automaticity with multiplication facts — the prerequisite skill for factor and multiple testing. Students who cannot quickly recall that 7 times 8 equals 56 will struggle to determine whether 7 is a factor of 56 using the flowchart algorithm. The 60-second sprint format keeps pacing high and normalises speed alongside accuracy. Problems target the harder tables (7, 8, 9, 11, 12) which are typically the last to be automatised.

**WATCH FOR:**
• Students who freeze at the start — they may lack confidence. Encourage: "Just start with the ones you know."
• Students who get stuck on one problem and stop — remind: "Skip it and come back."
• Readiness signal: most students completing 8+ problems in 60 seconds.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
• Read from slide: "We are learning to use algorithms with branching and repetition to identify factors, multiples and test for divisibility."
• "Let's look at our three success criteria. By the end of the lesson, you should be able to do all three."
• Read each SC aloud. "SC1 is the foundation — everyone will get there. SC2 is our main target. SC3 is for those ready to go further."

**DO:**
• Display the slide. Point to the LI as you read it.
• Point to each SC in turn. Pause after SC2: "This is the big one today — building and following flowcharts."
• Leave this slide visible for 30 seconds so students can read and internalise.

**TEACHER NOTES:**
The LI translates VC2M5N10 ("create and use algorithms involving a sequence of steps and decisions to experiment with factors, multiples and divisibility") directly. SC1 targets the prerequisite conceptual understanding (factor/multiple identification), SC2 is the core lesson goal (flowchart algorithms with branching decisions), and SC3 extends to pattern recognition when divisibility rules are applied to sets of numbers. The SC are ordered progressively: SC1 is conceptual, SC2 is procedural/algorithmic, SC3 is analytical. The exit ticket assesses all three SCs with increasing difficulty.

**WATCH FOR:**
• Students who look confused by the LI — this may indicate the vocabulary "algorithm" or "branching" is unfamiliar. The vocabulary slide (next) addresses this.
• Readiness signal: students nodding or whispering the SC to themselves.

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_VOCAB = `**SAY:**
• "Before we start, let's lock in four key words we'll use all lesson."
• Point to FACTOR: "A factor is a number that divides evenly into another number — no remainder. 7 is a factor of 42 because 42 divided by 7 equals 6 exactly."
• Point to MULTIPLE: "A multiple is what you get when you multiply a number by a whole number. 42 is a multiple of 7 because 7 times 6 equals 42. Notice — factor and multiple describe the SAME relationship from different directions."
• Point to DIVISIBLE: "Divisible means 'divides evenly with no remainder.' 42 is divisible by 7."
• Point to ALGORITHM: "An algorithm is a step-by-step set of instructions. Today we'll use algorithms with DECISIONS — points where we ask a yes/no question and follow different paths depending on the answer."

**DO:**
• Display the slide. Point to each term and its definition as you explain it.
• After explaining all four: "Turn to your partner. Can you use all four words in one sentence about the number 42?" Allow 20 seconds.
• Take 1–2 examples: "42 is divisible by 7 because 7 is a factor of 42, which means 42 is a multiple of 7, and we can check this using an algorithm."

**TEACHER NOTES:**
This vocabulary front-loading reduces cognitive load during the worked example — students won't be processing new terminology AND new procedures simultaneously. The four terms are deliberately chosen: Factor, Multiple, and Divisible establish the mathematical domain, while Algorithm establishes the computational thinking framework. The Turn & Talk challenge of using all four words in one sentence forces students to connect the concepts rather than treating them as isolated definitions. These terms are foundational for the entire unit.

**MISCONCEPTIONS:**
• Misconception: "Factor and multiple mean the same thing."
  Why: Both involve multiplication/division of the same numbers, so students conflate the direction. "7 is a factor of 42" and "42 is a multiple of 7" describe the same relationship from different perspectives.
  Impact: Students who confuse these will misinterpret questions like "Is 56 a multiple of 8?" vs "Is 8 a factor of 56?"
  Quick correction: Use the analogy — "The factor is the small one that goes IN. The multiple is the big one that comes OUT. 7 goes into 42, so 7 is the factor and 42 is the multiple."

**WATCH FOR:**
• Students who say "42 is a factor of 7" (direction reversed) — correct immediately with the "goes into" language.
• Students who look blank at "algorithm" — this may be a new term. Reassure: "You already follow algorithms every day — recipes, game rules, morning routines. Today we formalise one for maths."
• Readiness signal: partners discussing connections between the terms with correct usage.

[Maths: Launch — Explicit Instruction | VTLM 2.0: Explicit Explanation]`;

const NOTES_WE1 = `**SAY:**
• "Watch me use an algorithm to answer this question: Is 7 a factor of 42?"
• "I'm going to follow a flowchart — a step-by-step set of instructions with a decision point."
• Think-aloud: "Step 1 — START. I identify my two numbers: I'm testing whether 7 is a factor of 42."
• "Step 2 — CALCULATE. I divide: 42 divided by 7 equals 6."
• "Step 3 — DECISION. Is the result a whole number? I ask: is 6 a whole number? YES — there's no remainder, no decimal."
• "Step 4 — CONCLUSION. Because the answer is YES, 7 IS a factor of 42. Done."
• "Notice: the flowchart gave me a clear path. START, CALCULATE, DECIDE, CONCLUDE. Every time I test whether a number is a factor, I follow the same four steps."

**DO:**
• Display the slide. Point to each step of the flowchart on the right as you narrate.
• Physically trace the path through the flowchart with your finger or pointer.
• Pause at the DECISION diamond — emphasise the YES/NO branching: "This is where the algorithm DECIDES. If yes, we go this way. If no, we go that way."
• Leave the flowchart visible for students to reference during We Do.

**TEACHER NOTES:**
This is the core I Do worked example. The 4-step algorithm (Start, Calculate, Decision, Conclusion) is the algorithmic structure referenced in VC2M5N10. The flowchart visual makes the branching explicit — the diamond shape represents the decision point where the algorithm takes different paths depending on the answer. This is the first time many students will see mathematical reasoning formalised as a flowchart. The think-aloud models three key reasoning moves: (1) identifying the inputs, (2) performing the computation, (3) interpreting the result through a yes/no lens. The flowchart will be reused in Worked Example 2 with different framing (multiples instead of factors), demonstrating that the same algorithm answers both questions.

**MISCONCEPTIONS:**
• Misconception: "If the division gives a big number, it's not a factor."
  Why: Students may think factors must produce small results. They might doubt that 2 is a factor of 100 because 100 divided by 2 equals 50, which "feels too big."
  Impact: Students may incorrectly conclude that numbers are not factors when the quotient is large.
  Quick correction: "The size of the answer doesn't matter. What matters is whether it's a WHOLE number. 100 divided by 2 equals 50 — that's a whole number, so 2 IS a factor of 100."

**WATCH FOR:**
• Students who look confused at the flowchart shape conventions — briefly explain: "Ovals mean start/stop, rectangles mean do something, diamonds mean make a decision."
• Students who are already nodding — they may have prior knowledge of factor testing. These students are candidates for SC3 (pattern description).
• Readiness signal: students watching attentively and some attempting to predict the conclusion before you say it.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_WE2 = `**SAY:**
• "Now the same algorithm, but I'm going to frame the question differently: Is 56 a multiple of 8?"
• "Watch — the flowchart is IDENTICAL. Only the question changes."
• Think-aloud: "Step 1 — START. I'm testing whether 56 is a multiple of 8. To check, I divide 56 by 8."
• "Step 2 — CALCULATE. 56 divided by 8 equals 7."
• "Step 3 — DECISION. Is 7 a whole number? YES."
• "Step 4 — CONCLUSION. Because the answer is YES, 56 IS a multiple of 8."
• "Here's the key insight: '7 is a factor of 42' and '42 is a multiple of 7' are answered by the SAME algorithm. Factor and multiple are two sides of the same coin. The division test works for both."

**DO:**
• Display the slide. Trace through the flowchart again, emphasising that the structure is identical to WE1.
• After completing the example, ask the class: "What's the connection between '8 is a factor of 56' and '56 is a multiple of 8'?" Take 2–3 responses.
• Draw a double-headed arrow on the board between "factor" and "multiple" to reinforce the reciprocal relationship.

**TEACHER NOTES:**
This worked example deliberately mirrors WE1 in structure but changes the surface framing from "Is X a factor of Y?" to "Is Y a multiple of X?" The deep structure (divide Y by X, check for whole number) is identical. This parallel presentation is pedagogically intentional — it shows students that the same algorithmic tool answers both questions, preventing them from believing factors and multiples require different methods. The factor/multiple reciprocity is a threshold concept: once students see that "8 is a factor of 56" and "56 is a multiple of 8" are the same relationship described differently, many subsequent concepts (divisibility, LCM, HCF) become more accessible.

**WATCH FOR:**
• Students who seem surprised that the algorithm is the same — this is a positive sign that they're genuinely processing the reciprocity.
• Students who still look confused about the factor/multiple distinction — note these students for targeted questioning during CFU 1.
• Readiness signal: students articulating the connection unprompted ("It's the same thing from a different angle").

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
• "Quick check. I'm going to cold call — be ready."
• Pause 3 seconds. "[Student name] — is 6 a factor of 48?"
• Wait for response. "Explain your reasoning."
• "Correct — YES, because 48 divided by 6 equals 8, which is a whole number. So 6 IS a factor of 48."
• Follow-up cold call: "[Different student] — so is 48 a multiple of 6?" [Yes — same relationship]

**DO:**
• Display the question on the slide. Pause for 3 seconds of think time.
• Cold call a student. Require the full explanation, not just yes/no.
• If the student gives only "yes," prompt: "How do you know? What's the division?"
• Cold call a second student for the reciprocal question (multiple).

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
• "[Name], is 6 a factor of 48? Explain your reasoning using the algorithm steps."
• Listen for: "48 divided by 6 equals 8, which is a whole number, so yes."
PROCEED: If the cold-called student explains correctly and the class is nodding, move to We Do.
PIVOT: If the student cannot explain or gives an incorrect answer, model the algorithm steps on the board: "Step 1: Divide 48 by 6. Step 2: Is 8 a whole number? Yes. Step 3: So 6 IS a factor of 48." Then cold call another student with a simpler example: "Is 5 a factor of 25?"

**TEACHER NOTES:**
This CFU checks SC1 (identifying whether a number is a factor or multiple of another number). Cold Call is used deliberately here rather than Show Me Boards because it tests whether a specific student can articulate the reasoning, not just produce an answer. The follow-up question about multiples reinforces the factor/multiple reciprocity from WE2. Cold Call also maintains alertness — every student should be mentally answering even if not called upon.

**WATCH FOR:**
• The cold-called student hesitating on the division — this may indicate a fluency gap (not knowing 48 divided by 6) rather than a conceptual gap. Check: "What's 6 times 8?" If they can answer that, redirect.
• Students who give the answer but cannot explain — they may be pattern-matching rather than understanding the algorithm. Push for "What step did you follow?"
• Readiness signal: confident explanation with reference to the division test.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
• "Your turn. Use the flowchart algorithm to answer this: Is 9 a factor of 63?"
• "On your whiteboard, work through the four steps. Step 1: What are your two numbers? Step 2: Divide. Step 3: Is the result a whole number? Step 4: What's your conclusion?"
• "You have 30 seconds. Show me your boards when I say GO."
• After boards up: "Let's check. 63 divided by 9 equals 7. Is 7 a whole number? YES. So 9 IS a factor of 63. Well done."

**DO:**
• Display the question slide. Students work on whiteboards for 30 seconds.
• Circulate quickly — check that students are following the algorithm steps, not just guessing.
• After time: "Boards up — show me!" Scan for correct answers and reasoning.
• Click to reveal the worked solution on the next slide.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Work through the four steps on your board. When I say GO, hold up your board. Ready… GO!"
• Scan for: correct conclusion (YES) with the division shown (63 divided by 9 equals 7).
PROCEED: If ≥80% show correct answer with working, move to Pattern Investigation.
PIVOT: If many students show only "YES" without the division working, redirect: "I need to see your ALGORITHM — show me the division step. What did you divide? What was the result?" Re-do with a simpler example: "Is 5 a factor of 35? Show me ALL four steps."

**TEACHER NOTES:**
This is the We Do Problem Pair — structurally identical to the I Do worked examples but with the teacher stepping back. Students apply the same 4-step flowchart algorithm independently on whiteboards. 63 divided by 9 is chosen because the answer (7) is a clean whole number, making the YES/NO decision unambiguous. The question "Is 9 a factor of 63?" mirrors the framing of WE1. Students who succeed here have demonstrated SC2 (following a flowchart algorithm). The withReveal structure allows the teacher to show the question first, then click to reveal the worked solution.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide students with a printed copy of the flowchart from the I Do slides. They physically trace through each step with a pencil, writing their calculation at each box. This scaffolds the algorithmic process while reducing the demand on working memory.
• Extra Notes: Seat enabling students near the front so you can check their tracing during the 30 seconds.

EXTENDING PROMPT:
• Task: "After answering the factor question, flip your board and answer: What are ALL the factor pairs of 63? Use the systematic method." This extends from a single factor test to the full factor-pair-finding algorithm from the prior unit.
• Extra Notes: Students who finish quickly can compare factor pair counts: 63 has how many pairs? Is that more or fewer than 42?

**WATCH FOR:**
• Students who write the correct answer but skip the decision step — they may be calculating and concluding without consciously applying the algorithm. Prompt: "Show me the diamond — the yes/no question."
• Students who write "63 divided by 9 = 7 remainder 0" — this is mathematically correct and shows strong reasoning. Affirm the approach.
• Readiness signal: students finishing within 15 seconds with complete working shown.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_PATTERN = `**SAY:**
• "Now we're going to investigate a branching algorithm — one that makes DIFFERENT decisions depending on the input."
• "Here's the rule: If the number is EVEN, halve it. If the number is ODD, subtract 1, then halve."
• "Let's start at 20 and apply the rule until we reach 1. Watch me first."
• Trace on the board: "20 — even — halve — 10. 10 — even — halve — 5. 5 — odd — subtract 1 is 4, halve is 2. 2 — even — halve — 1. Done in 4 steps."
• "Now do the same starting at 15 on your whiteboards. Record each step and count how many steps to reach 1."
• After 60 seconds: "Let's check. 15 — odd — subtract 1 = 14, halve = 7. 7 — odd — subtract 1 = 6, halve = 3. 3 — odd — subtract 1 = 2, halve = 1. That's 3 steps."
• "Interesting — 20 took 4 steps but 15 took only 3. What pattern do you notice?"

**DO:**
• Display the slide. Model the 20 sequence step by step, writing each on the board.
• Students work on the 15 sequence on whiteboards.
• After checking: facilitate a brief discussion about patterns. Take 2–3 observations.
• Key insight to draw out: "Even numbers take one step each. Odd numbers take one step to become even (subtract then halve). The number of steps relates to how many times you can halve."

**TEACHER NOTES:**
This Pattern Investigation slide targets SC3 (describing the emerging pattern when a divisibility rule is applied to a set of numbers). The even/odd branching algorithm is a concrete example of VC2M5N10's "algorithms involving branching and repetition." The branching occurs at the even/odd decision, and the repetition occurs in the iteration until reaching 1. The two starting numbers (20 and 15) are chosen deliberately: 20 is even and involves only halving (with one odd intermediate), while 15 is odd and involves the subtract-then-halve branch repeatedly. The pattern discussion develops mathematical reasoning — students are not just following the algorithm but analysing its behaviour.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide a table with columns "Number," "Even or Odd?," "Operation," "Result." Students fill in row by row for starting number 20 (the modelled example), then attempt 15 with the table scaffold.
• Extra Notes: The table structure makes the branching explicit — students can see the pattern of Even/Odd decisions.

EXTENDING PROMPT:
• Task: "Try starting numbers 32 and 31. How many steps does each take? Can you predict how many steps 64 would take WITHOUT doing the calculation? What about 100?"
• Extra Notes: 32 takes 5 steps (all halving — it's a power of 2). 31 takes 5 steps too. Students who notice that powers of 2 take exactly log2(n) steps are demonstrating strong pattern recognition.

**WATCH FOR:**
• Students who forget the "subtract 1" part of the odd rule — they may try to halve an odd number and get a decimal. Redirect: "Is 15 even or odd? Odd — so what do we do FIRST before halving?"
• Students who don't reach 1 and keep going past it — clarify the stopping condition: "Stop as soon as you reach 1."
• Readiness signal: students making observations about the pattern without prompting.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_CFU2 = `**SAY:**
• "Hinge question time. I need to know if you're ready for independent work."
• "Look at the four statements. Which one is TRUE? Hold up 1, 2, 3, or 4 fingers."
• "You have 15 seconds to decide. Test each one using the algorithm."
• After finger vote: "The answer is A — 7 is a factor of 49. 49 divided by 7 equals 7, which is a whole number."
• "Let's check why the others are false."
• "B: 36 is a multiple of 5? 36 divided by 5 is 7.2 — not a whole number. FALSE."
• "C: 9 is a factor of 50? 50 divided by 9 is 5.5... — not a whole number. FALSE."
• "D: 45 is a multiple of 7? 45 divided by 7 is 6.4... — not a whole number. FALSE."

**DO:**
• Display the question slide with four options. Allow 15 seconds.
• "Show me fingers — 1, 2, 3, or 4." Scan the room quickly.
• Click to reveal the answer and explanations.
• Briefly address each distractor to surface and correct misconceptions.

**CFU CHECKPOINT:**
Technique: Finger Voting (1–4)
Script:
• "Hold up the number of fingers matching your answer: 1 for A, 2 for B, 3 for C, 4 for D. Ready… show me!"
• Scan for: 1 finger (option A) on ≥80% of hands.
PROCEED: If ≥80% choose A — students can reliably apply the factor/multiple test. Release to You Do.
PIVOT: Most likely error patterns:
  - Students choosing B (36 is a multiple of 5): They may confuse "multiple of 5" with "number in the 30s." Reteach: "A multiple of 5 must be divisible by 5. What are the multiples of 5? 5, 10, 15, 20, 25, 30, 35, 40… Is 36 in that list?"
  - Students choosing C (9 is a factor of 50): They may round 50 divided by 9 to "about 6" and accept it. Reteach: "About 6 is NOT 6. The algorithm says: is it a WHOLE number? 5.55... has a decimal, so NO."
  - Students choosing D (45 is a multiple of 7): They may confuse 45 with 42 (which IS a multiple of 7). Reteach: "Check: 7 times 6 is 42, 7 times 7 is 49. 45 is between those — it's NOT a multiple of 7."
Re-check with: "Is 8 a factor of 72? Thumbs up or down." [Up — 72 divided by 8 = 9]

**TEACHER NOTES:**
This hinge question tests whether students can apply the factor/multiple test accurately across different framings. Each distractor is carefully designed to reveal a specific misconception. Option A is the correct answer and tests the core skill (49 divided by 7 = 7, whole number, so yes). Option B tests whether students understand what "multiple of" means (not just a number near a multiple). Option C tests whether students accept approximate division results (50 divided by 9 is "close to 6" but not exactly 6). Option D tests whether students can distinguish between nearby multiples (42 vs 45 for multiples of 7). The finger-voting technique ensures rapid whole-class scanning and prevents students from changing answers based on peers.

**MISCONCEPTIONS:**
• Misconception: "If the division result is CLOSE to a whole number, the number is a factor."
  Why: Students who aren't confident with division may approximate and accept "about 6" as "yes."
  Impact: Students will incorrectly identify non-factors as factors, leading to errors in factor pair lists and divisibility testing.
  Quick correction: "Close doesn't count. The algorithm asks: IS it a whole number? Not 'is it close to a whole number?' 50 divided by 9 equals 5.555... — that decimal means NO."

**WATCH FOR:**
• Students who hold up fingers uncertainly or change their answer mid-vote — they're guessing rather than testing. Ask them to do the division on their whiteboard first.
• Students who choose D — check if they are confusing 45 with 42 or 49. This is a number recognition issue, not an algorithm issue.
• Readiness signal: fast, confident finger holds for option A.

[Maths: Monitor Progress — Hinge Question | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
• "You're ready. Time to apply the algorithm independently."
• Read from slide: "Choose 3 numbers between 30 and 100. For each number, use the flowchart algorithm to test whether 6 is a factor. Record your work in a table."
• "Use your worksheet. Start with the first number and work through the algorithm step by step."
• "If you finish all three, turn to the challenge: create your OWN algorithm to test whether a number is a multiple of 7."
• "You have 8 minutes."

**DO:**
• Distribute SR1 worksheet (Factor and Multiple Testing).
• Set a visible timer for 8 minutes.
• Circulate — visit enabling students first (students who struggled with CFU 2), then extending students.
• Conference briefly with 2–3 students: "Talk me through your algorithm steps for this number."

**TEACHER NOTES:**
You Do targets SC1 and SC2. Students choose their own numbers (within a range), which increases engagement and means every student's work is slightly different — reducing copying. The constraint "test whether 6 is a factor" means students must divide each chosen number by 6 and interpret the result. Numbers between 30 and 100 ensure some will be divisible by 6 (e.g., 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96) and some will not. The challenge question (create an algorithm for multiples of 7) targets SC2 at a higher level — students must construct rather than just follow an algorithm. Circulate to the enabling group first — they need the earliest support.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Instead of choosing their own numbers, provide these three numbers: 36, 45, 60. The first row of the table is pre-filled (36 divided by 6 = 6, whole number, YES). Students complete the remaining two. If they finish, they choose one more number to test.
• Extra Notes: Seat enabling students near the front where the flowchart from I Do is still visible as a reference.

EXTENDING PROMPT:
• Task: After testing three numbers for factor 6, students attempt the EXT1 investigation — Random Walk exploration using coin flips and a number line algorithm. The PDF is self-contained with instructions, worked examples, and recording space.
• Extra Notes: Distribute the EXT1 PDF to extending students when they finish the main task. The random walk connects algorithmic thinking to probability — a cross-strand connection.

**WATCH FOR:**
• Students who choose only multiples of 6 (e.g., 36, 42, 48) — they may be avoiding the "NO" path of the algorithm. Prompt: "Try a number that's NOT a multiple of 6. What happens in the flowchart?"
• Students who forget to record the algorithm steps — they may write only the final answer. Redirect: "I need to see your working — the division and the yes/no decision."
• Students who create a correct algorithm for multiples of 7 — this is strong SC2 evidence. Ask them to test it with two numbers.
• Readiness signal: students completing 3 numbers correctly in under 5 minutes.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
• "Pens down on the worksheet. Time for your exit ticket — three questions to show what you've learned."
• "Work silently and independently. No looking at your worksheet or your neighbour. This is just for me to see where you are."
• "You have 3 minutes."

**DO:**
• Display the exit ticket slide. Students write answers in their maths books or on the back of the worksheet.
• Set a timer for 3 minutes. Circulate silently — observe but don't help.
• Collect responses or note answers as students hold up books.

**TEACHER NOTES:**
The exit ticket assesses all three SCs. Q1 targets SC1 and SC2 (apply the division algorithm — 52 divided by 8 = 6.5, not a whole number, so NO). Q2 targets SC1 (list multiples — 7, 14, 21, 28, 35). Q3 targets SC3 (apply the even/odd branching algorithm and count steps). Q1 is deliberately chosen so the answer is NO — students must correctly handle the "not a whole number" branch. This is harder than a YES answer because students must recognise that 6.5 means "not a factor." Sort responses into three groups after class: (1) Q1 wrong — need fundamental reteaching of the division test, (2) Q1 and Q2 correct but Q3 wrong — on track but need more practice with branching algorithms, (3) all correct — ready for extending challenges in Lesson 2.

**WATCH FOR:**
• Students who answer Q1 as "Yes" — they may be rounding 6.5 to 7 and accepting it. This is the key misconception from CFU 2. Mark for reteaching.
• Students who list multiples of 7 incorrectly (e.g., including 7 itself is correct but some may start at 1) — clarify that multiples include the number itself: 7 times 1 = 7.
• Students who struggle with Q3 — they may not remember the even/odd branching rule. This is acceptable for Lesson 1; the Pattern Investigation was exploratory.
• Readiness signal: students finishing Q1 and Q2 within 2 minutes.

[Maths: Summarise — Exit Ticket (Stage 5) | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `**SAY:**
• "Before we wrap up — here are the printable resources for today's lesson. If you're a teacher using this deck, click any link to open the PDF."
• "SR1 is the practice worksheet. SR2 is the answer key. EXT1 is the Random Walk investigation for extending students."

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
• Read from slide: "SC1: I can identify whether a number is a factor or multiple of another number."
• "Give me a thumbs up, sideways, or down for SC1." Pause and scan. "Most thumbs up — great."
• Read: "SC2: I can follow and create a flowchart algorithm using yes/no decisions to test divisibility."
• "Thumbs for SC2." Pause and scan. Note any thumbs-down.
• Read: "SC3: I can describe the emerging pattern when I apply a divisibility rule to a set of numbers."
• "Thumbs for SC3." Pause. "Some sideways here — that's OK. We'll build on this next session."
• "Turn to your partner: What is the ONE thing you want to remember about algorithms from today? 30 seconds."
• "Next session we extend our algorithms to divisibility rules and prime testing. Well done today."

**DO:**
• Display the closing slide with SC listed. Read each SC aloud.
• Run thumbs up/sideways/down for each SC in turn. Scan and mentally note students who are down on SC1 or SC2.
• Allow 30 seconds for the Turn & Talk. Listen to 2–3 pairs.
• Close with a brief acknowledgement of effort.

**TEACHER NOTES:**
The closing slide reviews all three SC and uses self-assessment to give the teacher and students a snapshot of where they are. Students who self-assess as "thumbs down" on SC1 should be noted for tomorrow's enabling group — they haven't grasped the foundational factor/multiple concept. Students down on SC2 need more flowchart practice. SC3 was only briefly explored in the Pattern Investigation, so sideways/down responses here are expected and acceptable. The Turn & Talk prompt about "one thing to remember" forces consolidation — students must prioritise their learning. The preview of next session's content (divisibility rules and prime testing) builds anticipation and connects to the unit trajectory.

**WATCH FOR:**
• Students who show thumbs-down on SC1 — this is a critical gap. They may need 1:1 conferencing before next session.
• Students who show thumbs-up on all three — confirm in exit ticket data. If genuine, these students are ready for extending challenges next session.
• The Turn & Talk: listen for students who mention the flowchart or the yes/no decision — this indicates SC2 understanding.

[Maths: Summarise — Closing | VTLM 2.0: Monitor Progress & Feedback]`;

// ── Helper: draw a flowchart on a slide ────────────────────────────────────────

function drawFlowchart(slide, x, y, steps, opts = {}) {
  const boxW = opts.boxW || 2.4;
  const boxH = opts.boxH || 0.38;
  const gap = opts.gap || 0.12;
  const fontSize = opts.fontSize || 10;

  let cy = y;
  steps.forEach((step, i) => {
    const isDecision = step.type === "decision";
    const isTerminal = step.type === "terminal";
    const shape = isDecision ? "diamond" : (isTerminal ? "roundRect" : "rect");
    const h = isDecision ? boxH + 0.15 : boxH;
    const fillColor = step.fill || (isDecision ? C.ALERT : (isTerminal ? C.ACCENT : C.PRIMARY));

    addTextOnShape(slide, step.text, {
      x, y: cy, w: boxW, h, rectRadius: isTerminal ? 0.12 : (isDecision ? 0 : 0.06),
      fill: { color: fillColor },
    }, {
      fontSize: isDecision ? fontSize - 1 : fontSize,
      fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    // Arrow between steps (except after last)
    if (i < steps.length - 1) {
      const arrowY = cy + h;
      slide.addShape("rect", {
        x: x + boxW / 2 - 0.015, y: arrowY, w: 0.03, h: gap,
        fill: { color: C.MUTED },
      });
    }

    // YES / NO labels for decision nodes
    if (isDecision && step.yesLabel) {
      slide.addText(step.yesLabel, {
        x: x + boxW + 0.05, y: cy + 0.05, w: 0.8, h: 0.25,
        fontSize: 8, fontFace: FONT_B, color: C.SUCCESS, bold: true, margin: 0,
      });
    }
    if (isDecision && step.noLabel) {
      slide.addText(step.noLabel, {
        x: x - 0.85, y: cy + 0.05, w: 0.8, h: 0.25,
        fontSize: 8, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0, align: "right",
      });
    }

    cy += h + gap;
  });

  return cy;
}

// ── Helper: draw an input/output table ─────────────────────────────────────────

function drawIOTable(slide, x, y, headers, rows, opts = {}) {
  const colW = opts.colW || 0.8;
  const hdrH = 0.32;
  const rowH = opts.rowH || 0.28;
  const fontSize = opts.fontSize || 9;

  // Header row
  headers.forEach((hdr, ci) => {
    const cx = x + ci * colW;
    slide.addShape("rect", {
      x: cx, y, w: colW, h: hdrH,
      fill: { color: C.PRIMARY }, line: { color: C.WHITE, width: 1 },
    });
    slide.addText(hdr, {
      x: cx, y, w: colW, h: hdrH,
      fontSize, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
  });

  // Data rows
  rows.forEach((row, ri) => {
    const ry = y + hdrH + ri * rowH;
    row.forEach((cell, ci) => {
      const cx = x + ci * colW;
      slide.addShape("rect", {
        x: cx, y: ry, w: colW, h: rowH,
        fill: { color: C.WHITE }, line: { color: C.MUTED, width: 0.5 },
      });
      if (cell) {
        slide.addText(cell, {
          x: cx, y: ry, w: colW, h: rowH,
          fontSize, fontFace: FONT_B, color: C.CHARCOAL,
          align: "center", valign: "middle", margin: 0,
        });
      }
    });
  });

  return y + hdrH + rows.length * rowH;
}

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "Factors, Multiples & Divisibility Algorithms — Session 1";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres, "Factors, Multiples &\nDivisibility Algorithms", "Algorithmic Thinking with Branching & Repetition",
    "Session 1 of 3 | VC2M5N10 | Year 5/6", NOTES_TITLE);

  // ── SLIDE 2: Daily Review 1 (Stage 1) — Patterns & Algorithms ─────────
  contentSlide(pres, "Daily Review", C.ACCENT, "Exploring Mathematical Patterns and Algorithms", [
    "Q1: Start at 2. Apply rule: \"multiply by 3 then subtract 1\". Record first 5 terms in a table.",
    "Q2: Start at 64. If even, halve it. Record in a table until you reach 1. How many steps?",
  ], NOTES_DR1, FOOTER, (s) => {
    // I CAN statement
    addCard(s, 0.5, CONTENT_TOP + 1.3, 4.8, 0.5, { strip: C.ACCENT });
    s.addText("I can describe the pattern emerging from the application of a rule by recording outcomes in a table", {
      x: 0.7, y: CONTENT_TOP + 1.35, w: 4.4, h: 0.4,
      fontSize: 9, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0, valign: "middle",
    });

    // Right side — Input/Output table for Q1
    addCard(s, 5.8, CONTENT_TOP + 0.05, 3.8, 2.8, { strip: C.SECONDARY });
    s.addText("Q1 Table", {
      x: 6.0, y: CONTENT_TOP + 0.12, w: 3.4, h: 0.25,
      fontSize: 11, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });
    drawIOTable(s, 6.1, CONTENT_TOP + 0.42, ["Step", "Value"], [
      ["1", "2"], ["2", "?"], ["3", "?"], ["4", "?"], ["5", "?"],
    ], { colW: 1.0 });

    // Q2 table below
    s.addText("Q2 Halving Table", {
      x: 6.0, y: CONTENT_TOP + 2.2, w: 3.4, h: 0.25,
      fontSize: 11, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });
    drawIOTable(s, 6.1, CONTENT_TOP + 2.5, ["Step", "Value"], [
      ["Start", "64"], ["1", "?"], ["2", "?"], ["...", "..."],
    ], { colW: 1.0 });
  });

  // ── SLIDE 3: Daily Review 2 (Stage 1) — Factor Pairs as Rectangles ────
  contentSlide(pres, "Daily Review", C.ACCENT, "Multiplication and Division as Inverse Operations", [
    "Q3: 12 blocks make rectangles 1x12, 2x6, 3x4. Express 18 blocks as rectangles. How many?",
    "Q4: Express 24 as a product of two factors in as many ways as you can.",
  ], NOTES_DR2, FOOTER, (s) => {
    // I CAN statement
    addCard(s, 0.5, CONTENT_TOP + 1.3, 4.8, 0.55, { strip: C.ACCENT });
    s.addText("I can express natural numbers as products of their factors (e.g., 12 blocks can form rectangles 1x12, 2x6, 3x4)", {
      x: 0.7, y: CONTENT_TOP + 1.35, w: 4.4, h: 0.45,
      fontSize: 9, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0, valign: "middle",
    });

    // Right side — Rectangle array visuals
    addCard(s, 5.8, CONTENT_TOP + 0.05, 3.8, 3.6, { strip: C.SECONDARY });
    s.addText("Rectangle Arrays for 12", {
      x: 6.0, y: CONTENT_TOP + 0.12, w: 3.4, h: 0.25,
      fontSize: 11, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });

    // Draw three rectangle representations
    const rects = [
      { label: "1 x 12", w: 3.0, h: 0.25 },
      { label: "2 x 6", w: 1.8, h: 0.5 },
      { label: "3 x 4", w: 1.2, h: 0.7 },
    ];
    let ry = CONTENT_TOP + 0.45;
    rects.forEach((r) => {
      slide_addRect(s, 6.1, ry, Math.min(r.w, 3.2), Math.min(r.h, 0.7), r.label);
      ry += Math.min(r.h, 0.7) + 0.2;
    });

    // Prompt for 18
    s.addText("Now find rectangles for 18!", {
      x: 6.0, y: CONTENT_TOP + 2.9, w: 3.4, h: 0.3,
      fontSize: 11, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0,
    });
  });

  // ── SLIDE 4: Fluency (Stage 1) ─────────────────────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Multiplication Sprint — 60 Seconds", { color: C.ACCENT });

    // Grid of multiplication problems (4 cols x 3 rows)
    const problems = [
      "7 x 8 =", "9 x 7 =", "12 x 6 =", "8 x 11 =",
      "7 x 9 =", "11 x 12 =", "8 x 9 =", "12 x 7 =",
      "9 x 12 =", "7 x 11 =", "8 x 8 =", "9 x 9 =",
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
    ["We are learning to use algorithms with branching and repetition to identify factors, multiples and test for divisibility."],
    [
      "I can identify whether a number is a factor or multiple of another number.",
      "I can follow and create a flowchart algorithm using yes/no decisions to test divisibility.",
      "I can describe the emerging pattern when I apply a divisibility rule to a set of numbers.",
    ],
    NOTES_LISC, FOOTER);

  // ── SLIDE 6: I Do — Key Vocabulary (Stage 2) ──────────────────────────
  contentSlide(pres, "Stage 2 | I Do", C.PRIMARY, "Key Vocabulary", [], NOTES_VOCAB, FOOTER, (s) => {
    // Four vocabulary cards in a 2x2 grid
    const terms = [
      { word: "Factor", def: "A number that divides evenly into another.\n7 is a factor of 42 because 42 / 7 = 6", color: C.PRIMARY },
      { word: "Multiple", def: "The result of multiplying by a whole number.\n42 is a multiple of 7 because 7 x 6 = 42", color: C.SECONDARY },
      { word: "Divisible", def: "Divides evenly with no remainder.\n42 is divisible by 7", color: C.ACCENT },
      { word: "Algorithm", def: "A step-by-step set of instructions with\ndecisions (YES/NO branching points)", color: C.ALERT },
    ];

    terms.forEach((t, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const cx = 0.5 + col * 4.7;
      const cy = CONTENT_TOP + 0.05 + row * 1.95;
      const cw = 4.4;
      const ch = 1.8;

      addCard(s, cx, cy, cw, ch, { strip: t.color });

      // Term header
      addTextOnShape(s, t.word, {
        x: cx + 0.15, y: cy + 0.12, w: 1.8, h: 0.34, rectRadius: 0.08,
        fill: { color: t.color },
      }, {
        fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Definition
      s.addText(t.def, {
        x: cx + 0.15, y: cy + 0.55, w: cw - 0.3, h: ch - 0.7,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });
    });
  });

  // ── SLIDE 7: I Do — Worked Example 1: Is 7 a factor of 42? (Stage 2) ──
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example: Is 7 a factor of 42?", { fontSize: 21, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "Is 7 a factor of 42?", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 4.2, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    // 4-step algorithm on the left
    const algoSteps = [
      { num: "1", label: "START", desc: "Test: Is 7 a factor of 42?" },
      { num: "2", label: "CALCULATE", desc: "42 / 7 = 6" },
      { num: "3", label: "DECISION", desc: "Is 6 a whole number? YES" },
      { num: "4", label: "CONCLUSION", desc: "7 IS a factor of 42" },
    ];
    const stepColors = [C.ACCENT, C.PRIMARY, C.ALERT, C.SUCCESS];
    algoSteps.forEach((step, i) => {
      const sy = CONTENT_TOP + 0.55 + i * 0.68;
      addTextOnShape(s, step.num, {
        x: 0.5, y: sy, w: 0.45, h: 0.45, rectRadius: 0.22,
        fill: { color: stepColors[i] },
      }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

      s.addText([
        { text: step.label, options: { bold: true, breakLine: true, fontSize: 11, color: stepColors[i] } },
        { text: step.desc, options: { fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 1.1, y: sy, w: 3.6, h: 0.55,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Flowchart visual on the right
    addCard(s, 5.2, CONTENT_TOP + 0.1, 4.3, 3.2, { strip: C.PRIMARY });
    s.addText("Factor Testing Flowchart", {
      x: 5.4, y: CONTENT_TOP + 0.18, w: 3.9, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });

    drawFlowchart(s, 5.8, CONTENT_TOP + 0.55, [
      { type: "terminal", text: "START: Two numbers", fill: C.ACCENT },
      { type: "rect", text: "CALCULATE: Divide A by B", fill: C.PRIMARY },
      { type: "decision", text: "Whole number?", fill: C.ALERT, yesLabel: "YES ->", noLabel: "<- NO" },
      { type: "terminal", text: "B IS a factor of A", fill: C.SUCCESS },
    ], { boxW: 2.8, boxH: 0.38 });

    // Not-a-factor branch label (positioned left of decision diamond, not overlapping flowchart)
    addTextOnShape(s, "B is NOT\na factor", {
      x: 4.3, y: CONTENT_TOP + 1.65, w: 0.85, h: 0.52, rectRadius: 0.06,
      fill: { color: C.ALERT },
    }, {
      fontSize: 7, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    // Summary
    addTextOnShape(s, "42 / 7 = 6 (whole number) -> YES, 7 is a factor!", {
      x: 0.5, y: SAFE_BOTTOM - 0.55, w: 9, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, {
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_WE1);
  })();

  // ── SLIDE 8: I Do — Worked Example 2: Is 56 a multiple of 8? (Stage 2) ─
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example: Is 56 a multiple of 8?", { fontSize: 21, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "Is 56 a multiple of 8?", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 4.2, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    // 4-step algorithm on the left
    const algoSteps = [
      { num: "1", label: "START", desc: "Test: Is 56 a multiple of 8?" },
      { num: "2", label: "CALCULATE", desc: "56 / 8 = 7" },
      { num: "3", label: "DECISION", desc: "Is 7 a whole number? YES" },
      { num: "4", label: "CONCLUSION", desc: "56 IS a multiple of 8" },
    ];
    const stepColors = [C.ACCENT, C.PRIMARY, C.ALERT, C.SUCCESS];
    algoSteps.forEach((step, i) => {
      const sy = CONTENT_TOP + 0.55 + i * 0.68;
      addTextOnShape(s, step.num, {
        x: 0.5, y: sy, w: 0.45, h: 0.45, rectRadius: 0.22,
        fill: { color: stepColors[i] },
      }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

      s.addText([
        { text: step.label, options: { bold: true, breakLine: true, fontSize: 11, color: stepColors[i] } },
        { text: step.desc, options: { fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 1.1, y: sy, w: 3.6, h: 0.55,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Key insight card (right side)
    addCard(s, 5.2, CONTENT_TOP + 0.1, 4.3, 1.8, { strip: C.SECONDARY });
    s.addText("Key Insight", {
      x: 5.4, y: CONTENT_TOP + 0.18, w: 3.9, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });
    s.addText([
      { text: "Factor and Multiple are two sides of the same coin.", options: { bold: true, breakLine: true, fontSize: 12, color: C.CHARCOAL } },
      { text: "\"8 is a factor of 56\"", options: { breakLine: true, fontSize: 11, color: C.PRIMARY, bold: true } },
      { text: "means exactly the same as", options: { breakLine: true, fontSize: 10, color: C.MUTED } },
      { text: "\"56 is a multiple of 8\"", options: { fontSize: 11, color: C.SECONDARY, bold: true } },
    ], {
      x: 5.4, y: CONTENT_TOP + 0.52, w: 3.9, h: 1.2,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Same algorithm badge
    addCard(s, 5.2, CONTENT_TOP + 2.1, 4.3, 1.3, { strip: C.ACCENT });
    s.addText("Same Algorithm!", {
      x: 5.4, y: CONTENT_TOP + 2.18, w: 3.9, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.ACCENT, bold: true, margin: 0,
    });
    s.addText([
      { text: "To test factor: divide and check for whole number", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "To test multiple: divide and check for whole number", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "The same division test answers BOTH questions!", options: { fontSize: 10, color: C.ALERT, bold: true } },
    ], {
      x: 5.4, y: CONTENT_TOP + 2.52, w: 3.9, h: 0.8,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Summary
    addTextOnShape(s, "56 / 8 = 7 (whole number) -> YES, 56 is a multiple of 8!", {
      x: 0.5, y: SAFE_BOTTOM - 0.55, w: 9, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, {
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_WE2);
  })();

  // ── SLIDE 9: CFU 1 — Cold Call ─────────────────────────────────────────
  cfuSlide(pres, "CFU", "Quick Check", "Cold Call",
    "Is 6 a factor of 48?\n\nBe ready — I'm going to Cold Call.\n\n\"Explain your reasoning using the algorithm steps.\"",
    NOTES_CFU1, FOOTER);

  // ── SLIDES 10–11: We Do — Problem Pair 1: Is 9 a factor of 63? (withReveal) ─
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Is 9 a factor of 63?", { fontSize: 22, color: C.SECONDARY });

      // Problem prompt
      addTextOnShape(s, "Use the flowchart algorithm to test", {
        x: 0.5, y: CONTENT_TOP - 0.05, w: 4.5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_DARK },
      }, {
        fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Steps prompt on left
      addCard(s, 0.5, CONTENT_TOP + 0.55, 4.5, 2.8, { strip: C.SECONDARY });
      s.addText([
        { text: "On your whiteboards:", options: { bold: true, breakLine: true, fontSize: 14, color: C.SECONDARY } },
        { text: "Step 1: What are your two numbers?", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "Step 2: Divide.", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "Step 3: Whole number? YES or NO?", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "Step 4: Conclusion.", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "30 seconds — then boards up!", options: { fontSize: 12, color: C.ALERT, bold: true } },
      ], {
        x: 0.7, y: CONTENT_TOP + 0.7, w: 4.1, h: 2.4,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Large number display (right side)
      addTextOnShape(s, "9 | 63", {
        x: 5.8, y: CONTENT_TOP + 0.8, w: 3.5, h: 2.2, rectRadius: 0.15,
        fill: { color: C.PRIMARY },
      }, {
        fontSize: 54, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (slide) => {
      // Reveal: worked solution card (right side)
      addCard(slide, 5.2, CONTENT_TOP + 0.1, 4.3, 3.5, { strip: C.SUCCESS });
      slide.addText("Solution", {
        x: 5.4, y: CONTENT_TOP + 0.18, w: 3.9, h: 0.28,
        fontSize: 13, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      const solSteps = [
        { label: "START:", text: "Is 9 a factor of 63?" },
        { label: "CALCULATE:", text: "63 / 9 = 7" },
        { label: "DECISION:", text: "Is 7 a whole number? YES" },
        { label: "CONCLUSION:", text: "9 IS a factor of 63" },
      ];
      const solColors = [C.ACCENT, C.PRIMARY, C.ALERT, C.SUCCESS];
      solSteps.forEach((step, i) => {
        slide.addText([
          { text: step.label + " ", options: { bold: true, fontSize: 11, color: solColors[i] } },
          { text: step.text, options: { fontSize: 11, color: C.CHARCOAL } },
        ], {
          x: 5.6, y: CONTENT_TOP + 0.6 + i * 0.45, w: 3.7, h: 0.38,
          fontFace: FONT_B, margin: 0, valign: "middle",
        });
      });

      addTextOnShape(slide, "YES — 9 is a factor of 63", {
        x: 5.4, y: SAFE_BOTTOM - 0.6, w: 3.8, h: 0.45, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── SLIDE 12: We Do — Pattern Investigation: Even/Odd Branching ───────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.SECONDARY);
    addStageBadge(s, 3, "We Do");
    addTitle(s, "Pattern Investigation: Even/Odd Branching", { fontSize: 20, color: C.SECONDARY });

    // Rule card
    addCard(s, 0.5, CONTENT_TOP - 0.05, 9, 0.85, { strip: C.ALERT });
    s.addText([
      { text: "The Rule: ", options: { bold: true, fontSize: 13, color: C.ALERT } },
      { text: "If EVEN, halve it.  If ODD, subtract 1 then halve.  Repeat until you reach 1.", options: { fontSize: 13, color: C.CHARCOAL } },
    ], {
      x: 0.7, y: CONTENT_TOP + 0.02, w: 8.6, h: 0.35,
      fontFace: FONT_B, margin: 0, valign: "middle",
    });
    s.addText("Record each step. Count how many steps. Describe the pattern you see.", {
      x: 0.7, y: CONTENT_TOP + 0.4, w: 8.6, h: 0.3,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0, valign: "middle",
    });

    // Start at 20 — modelled (left)
    addCard(s, 0.5, CONTENT_TOP + 0.95, 4.3, 2.8, { strip: C.PRIMARY });
    s.addText("Start at 20 (I Do)", {
      x: 0.7, y: CONTENT_TOP + 1.02, w: 3.9, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });

    const seq20 = [
      { val: "20", rule: "Even -> halve", result: "10" },
      { val: "10", rule: "Even -> halve", result: "5" },
      { val: "5", rule: "Odd -> -1 = 4, halve", result: "2" },
      { val: "2", rule: "Even -> halve", result: "1" },
    ];
    seq20.forEach((step, i) => {
      const sy = CONTENT_TOP + 1.4 + i * 0.42;
      s.addText([
        { text: step.val, options: { bold: true, fontSize: 11, color: C.PRIMARY } },
        { text: " -> " + step.rule + " -> ", options: { fontSize: 10, color: C.MUTED } },
        { text: step.result, options: { bold: true, fontSize: 11, color: C.PRIMARY } },
      ], {
        x: 0.7, y: sy, w: 3.9, h: 0.35,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });
    addTextOnShape(s, "4 steps", {
      x: 0.7, y: CONTENT_TOP + 3.15, w: 1.5, h: 0.35, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });

    // Start at 15 — student task (right)
    addCard(s, 5.2, CONTENT_TOP + 0.95, 4.3, 2.8, { strip: C.SECONDARY });
    s.addText("Start at 15 (You Do)", {
      x: 5.4, y: CONTENT_TOP + 1.02, w: 3.9, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });

    s.addText([
      { text: "On your whiteboard:", options: { bold: true, breakLine: true, fontSize: 12, color: C.SECONDARY } },
      { text: "Apply the rule to 15", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Record each step", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Count steps to reach 1", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "What pattern do you notice?", options: { fontSize: 11, color: C.ALERT, bold: true } },
    ], {
      x: 5.4, y: CONTENT_TOP + 1.4, w: 3.9, h: 2.0,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    addTextOnShape(s, "60 seconds", {
      x: 5.4, y: CONTENT_TOP + 3.15, w: 1.5, h: 0.35, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_PATTERN);
  })();

  // ── SLIDES 13–14: CFU 2 — Hinge Question (withReveal with Finger Voting) ─
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "Hinge Question", { color: C.ALERT, w: 2.2 });
      addTitle(s, "Which statement is TRUE?", { color: C.ALERT });

      // Four option cards
      const options = [
        { letter: "A", value: "7 is a factor of 49", color: C.PRIMARY },
        { letter: "B", value: "36 is a multiple of 5", color: C.SECONDARY },
        { letter: "C", value: "9 is a factor of 50", color: C.ACCENT },
        { letter: "D", value: "45 is a multiple of 7", color: C.SUCCESS },
      ];
      options.forEach((opt, i) => {
        const ox = 0.5 + i * 2.3;
        const oy = CONTENT_TOP + 0.2;
        addCard(s, ox, oy, 2.0, 1.8, { strip: opt.color });

        addTextOnShape(s, opt.letter, {
          x: ox + 0.15, y: oy + 0.15, w: 0.45, h: 0.45, rectRadius: 0.22,
          fill: { color: opt.color },
        }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

        s.addText(opt.value, {
          x: ox + 0.1, y: oy + 0.7, w: 1.8, h: 0.9,
          fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL,
          align: "center", valign: "middle", bold: false, margin: 0,
        });
      });

      // Instruction
      addTextOnShape(s, "Hold up 1, 2, 3, or 4 fingers", {
        x: 2.5, y: CONTENT_TOP + 2.3, w: 5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, {
        fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_CFU2);
      return s;
    },
    (slide) => {
      // Reveal: highlight A as correct
      addTextOnShape(slide, "A — 7 is a factor of 49 (TRUE)", {
        x: 1.5, y: CONTENT_TOP + 2.2, w: 7, h: 0.55, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      slide.addText("49 / 7 = 7 — a whole number, so 7 IS a factor of 49.", {
        x: 1.5, y: CONTENT_TOP + 2.85, w: 7, h: 0.35,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      slide.addText([
        { text: "B) 36 / 5 = 7.2 — NOT a whole number", options: { breakLine: true, fontSize: 10, color: C.ALERT } },
        { text: "C) 50 / 9 = 5.55... — NOT a whole number", options: { breakLine: true, fontSize: 10, color: C.ALERT } },
        { text: "D) 45 / 7 = 6.42... — NOT a whole number", options: { fontSize: 10, color: C.ALERT } },
      ], {
        x: 1.5, y: CONTENT_TOP + 3.25, w: 7, h: 0.7,
        fontFace: FONT_B, margin: 0,
      });
    }
  );

  // ── SLIDE 15: You Do — Independent Practice (Stage 4) ─────────────────
  contentSlide(pres, "Stage 4 | You Do", C.ALERT, "Independent Practice: Factor & Multiple Testing", [], NOTES_YOUDO, FOOTER, (s) => {
    // First / Next / Then instruction card
    addCard(s, 0.5, CONTENT_TOP, 5.2, 2.5, { strip: C.ALERT });

    const steps = [
      { label: "First:", text: "Choose 3 numbers between 30 and 100." },
      { label: "Next:", text: "For each number, use the flowchart to test: Is 6 a factor?" },
      { label: "Then:", text: "Record your algorithm steps in the table on your worksheet." },
      { label: "Challenge:", text: "Create your OWN algorithm to test for multiples of 7." },
    ];
    steps.forEach((st, i) => {
      const sy = CONTENT_TOP + 0.15 + i * 0.55;
      s.addText([
        { text: st.label + " ", options: { bold: true, fontSize: 13, color: i === 3 ? C.ACCENT : C.ALERT } },
        { text: st.text, options: { fontSize: 13, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: sy, w: 4.7, h: 0.5,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Algorithm reminder (right side)
    addCard(s, 5.8, CONTENT_TOP + 0.1, 3.7, 2.2, { strip: C.PRIMARY });
    s.addText("Algorithm Steps", {
      x: 6.0, y: CONTENT_TOP + 0.18, w: 3.3, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });
    const reminders = [
      "1. Identify your numbers",
      "2. Divide the larger by the smaller",
      "3. Is the result a whole number?",
      "4. YES = factor / NO = not a factor",
    ];
    reminders.forEach((r, i) => {
      s.addText(r, {
        x: 6.0, y: CONTENT_TOP + 0.55 + i * 0.35, w: 3.3, h: 0.3,
        fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
      });
    });

    // SC reference card at bottom
    addCard(s, 0.5, 3.6, 9, 1.3, { strip: C.ACCENT });
    s.addText("Success Criteria Check", {
      x: 0.75, y: 3.68, w: 3, h: 0.25,
      fontSize: 11, fontFace: FONT_B, color: C.ACCENT, bold: true, margin: 0,
    });
    s.addText([
      { text: "SC1: I can identify whether a number is a factor or multiple of another number.", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "SC2: I can follow and create a flowchart algorithm using yes/no decisions to test divisibility.", options: { fontSize: 10, color: C.CHARCOAL } },
    ], {
      x: 0.75, y: 3.95, w: 8.5, h: 0.8,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Worksheet reference
    addTextOnShape(s, "Use your SR1 Worksheet", {
      x: 6.8, y: SAFE_BOTTOM - 0.55, w: 2.7, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, {
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
    });
  });

  // ── SLIDE 16: Exit Ticket (Stage 5) ───────────────────────────────────
  exitTicketSlide(pres, [
    "Q1: Is 8 a factor of 52? Use the algorithm to explain. (Show all 4 steps.)",
    "Q2: List the first 5 multiples of 7.",
    "Q3: Start at 48. Apply the even/odd rule (even: halve; odd: subtract 1 then halve). Record steps until you reach 3. How many steps?",
  ], NOTES_EXIT, FOOTER);

  // ── SLIDE 17: Resources ───────────────────────────────────────────────
  addResourceSlide(pres, [
    {
      name: "SR1 — Factor & Multiple Testing Worksheet",
      fileName: "SR1_Factor_Multiple_Testing.pdf",
      description: "Practice problems with flowchart template. One per student.",
    },
    {
      name: "SR2 — Answer Key",
      fileName: "SR2_Answer_Key.pdf",
      description: "Answer key for SR1. Teacher reference only.",
    },
    {
      name: "EXT1 — Random Walk Investigation",
      fileName: "EXT1_Random_Walk_Investigation.pdf",
      description: "Self-contained extending resource — algorithmic thinking with coin flips.",
    },
  ], { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // ── SLIDE 18: Closing ─────────────────────────────────────────────────
  closingSlide(pres,
    "What is the ONE thing you want to remember about algorithms from today? Turn to your partner — 30 seconds.",
    [
      "SC1: I can identify whether a number is a factor or multiple of another number.",
      "SC2: I can follow and create a flowchart algorithm using yes/no decisions to test divisibility.",
      "SC3: I can describe the emerging pattern when I apply a divisibility rule to a set of numbers.",
      "Next session: Divisibility rules and prime number testing — building more powerful algorithms.",
    ],
    NOTES_CLOSING);

  // ── Write PPTX ──────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: OUT_DIR + "/NP2_Lesson1_Factors_Multiples_Algorithms.pptx" });
  console.log("PPTX written to " + OUT_DIR);

  // ── Generate companion PDFs ────────────────────────────────────────────
  await generateWorksheet();
  await generateAnswerKey();
  await generateExtendingPdf();
  console.log("All PDFs generated.");
}

// ── Helper for rectangle visuals on DR2 slide ──────────────────────────────────

function slide_addRect(s, x, y, w, h, label) {
  s.addShape("rect", {
    x, y, w, h,
    fill: { color: C.PRIMARY, transparency: 80 },
    line: { color: C.PRIMARY, width: 1.5 },
  });
  s.addText(label, {
    x, y, w, h,
    fontSize: 9, fontFace: FONT_B, color: C.PRIMARY,
    align: "center", valign: "middle", margin: 0, bold: true,
  });
}

// ── PDF: SR1 — Factor & Multiple Testing Worksheet ─────────────────────────────

async function generateWorksheet() {
  const doc = createPdf({ title: "Factor & Multiple Testing Worksheet" });

  let y = addPdfHeader(doc, "Factor & Multiple Testing", {
    subtitle: "SR1 — Supporting Resource",
    color: C.PRIMARY,
    lessonInfo: "Session 1 of 3 | Factors, Multiples & Algorithms | Year 5/6 Maths",
  });

  y = addTipBox(doc, "Remember the 4-step algorithm: 1) START — identify your numbers. 2) CALCULATE — divide. 3) DECISION — whole number? YES or NO. 4) CONCLUSION — factor or not a factor.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Section A: Is 6 a Factor?", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Choose 3 numbers between 30 and 100. For each number, use the algorithm to test whether 6 is a factor. Record your working in the table below.", y);

  // Problem 1
  y = addProblem(doc, 1, "My number: _____ . Is 6 a factor of this number?", y, {
    writeLines: [
      { label: "Step 1 — START: Testing if 6 is a factor of _____" },
      { label: "Step 2 — CALCULATE: _____ / 6 =" },
      { label: "Step 3 — DECISION: Is the result a whole number? (YES / NO)" },
      { label: "Step 4 — CONCLUSION:" },
    ],
    color: C.PRIMARY,
  });

  // Problem 2
  y = addProblem(doc, 2, "My number: _____ . Is 6 a factor of this number?", y, {
    writeLines: [
      { label: "Step 1 — START: Testing if 6 is a factor of _____" },
      { label: "Step 2 — CALCULATE: _____ / 6 =" },
      { label: "Step 3 — DECISION: Is the result a whole number? (YES / NO)" },
      { label: "Step 4 — CONCLUSION:" },
    ],
    color: C.PRIMARY,
  });

  // Problem 3
  y = addProblem(doc, 3, "My number: _____ . Is 6 a factor of this number?", y, {
    writeLines: [
      { label: "Step 1 — START: Testing if 6 is a factor of _____" },
      { label: "Step 2 — CALCULATE: _____ / 6 =" },
      { label: "Step 3 — DECISION: Is the result a whole number? (YES / NO)" },
      { label: "Step 4 — CONCLUSION:" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Section B: Flowchart Template", y, { color: C.ACCENT });
  y = addBodyText(doc, "Draw the factor-testing algorithm as a flowchart. Use ovals for START/STOP, rectangles for CALCULATE steps, and diamonds for YES/NO DECISIONS.", y);
  y = addLinedArea(doc, y + 5, 6);

  y = addSectionHeading(doc, "Section C: Challenge — Multiples of 7 Algorithm", y, { color: C.ALERT });
  y = addBodyText(doc, "Create your own algorithm to test whether a number is a multiple of 7. Write the steps, then test it with two numbers of your choice.", y);

  y = addProblem(doc, 4, "My algorithm for testing multiples of 7:", y, {
    writeLines: [
      { label: "Step 1:" },
      { label: "Step 2:" },
      { label: "Step 3:" },
      { label: "Step 4:" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, 5, "Test your algorithm with two numbers:", y, {
    writeLines: [
      { label: "Number 1: _____ Is it a multiple of 7?" },
      { label: "Number 2: _____ Is it a multiple of 7?" },
    ],
    color: C.ALERT,
  });

  addPdfFooter(doc, "Session 1 of 3 | Factors, Multiples & Algorithms | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR1_Factor_Multiple_Testing.pdf");
  console.log("  SR1 worksheet written.");
}

// ── PDF: SR2 — Answer Key ──────────────────────────────────────────────────────

async function generateAnswerKey() {
  const doc = createPdf({ title: "Factor & Multiple Testing — Answer Key" });

  let y = addPdfHeader(doc, "Factor & Multiple Testing — Answer Key", {
    subtitle: "SR2 — Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: "Session 1 of 3 | Factors, Multiples & Algorithms | Year 5/6 Maths",
    showNameDate: false,
  });

  y = addSectionHeading(doc, "Section A: Sample Answers (6 as a factor)", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Students will choose their own numbers. Below are examples of numbers divisible by 6 and not divisible by 6 in the 30–100 range.", y);

  y = addProblem(doc, 1, "Example: Is 6 a factor of 42?", y, {
    writeLines: [
      { label: "Step 1 — START:", answer: "Testing if 6 is a factor of 42" },
      { label: "Step 2 — CALCULATE:", answer: "42 / 6 = 7" },
      { label: "Step 3 — DECISION:", answer: "Is 7 a whole number? YES" },
      { label: "Step 4 — CONCLUSION:", answer: "6 IS a factor of 42" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "Example: Is 6 a factor of 50?", y, {
    writeLines: [
      { label: "Step 1 — START:", answer: "Testing if 6 is a factor of 50" },
      { label: "Step 2 — CALCULATE:", answer: "50 / 6 = 8.333..." },
      { label: "Step 3 — DECISION:", answer: "Is 8.333... a whole number? NO" },
      { label: "Step 4 — CONCLUSION:", answer: "6 is NOT a factor of 50" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "Example: Is 6 a factor of 78?", y, {
    writeLines: [
      { label: "Step 1 — START:", answer: "Testing if 6 is a factor of 78" },
      { label: "Step 2 — CALCULATE:", answer: "78 / 6 = 13" },
      { label: "Step 3 — DECISION:", answer: "Is 13 a whole number? YES" },
      { label: "Step 4 — CONCLUSION:", answer: "6 IS a factor of 78" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Numbers between 30–100 that ARE divisible by 6:", y, { color: C.ACCENT });
  y = addBodyText(doc, "30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96", y);

  y = addSectionHeading(doc, "Section C: Multiples of 7 Algorithm — Expected Answer", y, { color: C.ALERT });
  y = addBodyText(doc, "Step 1: START — identify the number to test. Step 2: CALCULATE — divide the number by 7. Step 3: DECISION — is the result a whole number? Step 4: CONCLUSION — if YES, the number is a multiple of 7; if NO, it is not.", y);
  y = addBodyText(doc, "Example tests: 49 / 7 = 7 (whole number) — YES, multiple of 7. 50 / 7 = 7.14... (not whole) — NO, not a multiple of 7.", y);

  y = addSectionHeading(doc, "Exit Ticket Answers", y, { color: C.PRIMARY });

  y = addProblem(doc, "Q1", "Is 8 a factor of 52?", y, {
    writeLines: [
      { label: "Answer:", answer: "NO — 52 / 8 = 6.5, which is not a whole number. So 8 is NOT a factor of 52." },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, "Q2", "List the first 5 multiples of 7.", y, {
    writeLines: [
      { label: "Answer:", answer: "7, 14, 21, 28, 35" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, "Q3", "Start at 48, apply even/odd rule until reaching 3.", y, {
    writeLines: [
      { label: "Answer:", answer: "48 -> 24 -> 12 -> 6 -> 3. That is 4 steps." },
    ],
    color: C.PRIMARY,
  });

  addPdfFooter(doc, "Teacher Reference — Do Not Distribute to Students");
  await writePdf(doc, OUT_DIR + "/SR2_Answer_Key.pdf");
  console.log("  SR2 answer key written.");
}

// ── PDF: EXT1 — Random Walk Investigation ──────────────────────────────────────

async function generateExtendingPdf() {
  const doc = createPdf({ title: "Random Walk Investigation" });

  let y = addPdfHeader(doc, "Random Walk Investigation", {
    subtitle: "EXT1 — Extending Challenge",
    color: C.ACCENT,
    lessonInfo: "Session 1 of 3 | Factors, Multiples & Algorithms | Year 5/6 Maths",
  });

  y = addSectionHeading(doc, "What is a Random Walk?", y, { color: C.ACCENT });
  y = addBodyText(doc, "A random walk is a mathematical journey where each step is decided by chance. Imagine standing at position 0 on a number line. You flip a coin: HEADS means step right (+1), TAILS means step left (-1). Where will you end up after 10 flips?", y);
  y = addBodyText(doc, "This is an algorithm with BRANCHING — the coin flip creates a YES/NO decision (heads/tails) that determines which instruction to follow. The REPETITION comes from flipping the coin over and over.", y);

  y = addSectionHeading(doc, "The Algorithm", y, { color: C.ACCENT });
  y = addStepInstructions(doc, [
    "Start at position 0 on the number line.",
    "Flip a coin (or write H or T randomly).",
    "DECISION: Is it HEADS? If YES, move right (+1). If NO (TAILS), move left (-1).",
    "Record your new position.",
    "REPEAT steps 2–4 until you have completed 10 flips.",
    "Record your final position.",
  ], y, { color: C.ACCENT });

  y = addSectionHeading(doc, "Worked Example: 5-Flip Walk", y, { color: C.ACCENT });
  y = addBodyText(doc, "Flips: H, T, H, H, T", y);
  y = addBodyText(doc, "Start: 0 -> H(+1) = 1 -> T(-1) = 0 -> H(+1) = 1 -> H(+1) = 2 -> T(-1) = 1", y);
  y = addBodyText(doc, "Final position: 1 (one step to the right of start)", y);

  y = addTipBox(doc, "Key insight: With 5 flips, the MOST you can move is 5 steps in one direction (all heads or all tails). But what's the MOST LIKELY final position? You'll investigate this!", y, { color: C.ACCENT });

  y = addSectionHeading(doc, "Your Investigation", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Complete 5 random walks of 10 flips each. Record your results in the table below. You can flip a real coin or write H/T randomly.", y);

  // Walk recording spaces
  for (let walk = 1; walk <= 5; walk++) {
    y = addProblem(doc, walk, `Random Walk ${walk}:`, y, {
      writeLines: [
        { label: "Coin flips (H or T):" },
        { label: "Positions: 0 ->" },
        { label: "Final position:" },
      ],
      color: C.PRIMARY,
    });
  }

  y = addSectionHeading(doc, "Analysis Questions", y, { color: C.PRIMARY });

  y = addProblem(doc, 6, "What was your highest final position across all 5 walks?", y, {
    writeLines: [{ label: "Answer:" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 7, "What was your lowest final position?", y, {
    writeLines: [{ label: "Answer:" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 8, "What is the average of your 5 final positions? What do you notice?", y, {
    writeLines: [
      { label: "Calculation:" },
      { label: "I notice:" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 9, "PREDICTION: If you did 100 random walks of 10 flips each, what do you think the average final position would be? Explain your reasoning.", y, {
    writeLines: [
      { label: "My prediction:" },
      { label: "My reasoning:" },
    ],
    color: C.ACCENT,
  });

  y = addSectionHeading(doc, "Connection to Algorithms", y, { color: C.ACCENT });
  y = addBodyText(doc, "The random walk algorithm has the same structure as the factor-testing algorithm you learned today:", y);
  y = addBodyText(doc, "- Both have a BRANCHING decision (coin: heads/tails; factor test: whole number yes/no)", y);
  y = addBodyText(doc, "- Both follow different PATHS depending on the decision", y);
  y = addBodyText(doc, "- The random walk also has REPETITION (repeat 10 times), just like applying the even/odd rule repeatedly", y);

  y = addTipBox(doc, "Did you know? Random walks are used in science (particle movement), finance (stock prices), and even in Google's search algorithm! The same mathematical structure appears everywhere.", y, { color: C.SECONDARY });

  addPdfFooter(doc, "Session 1 of 3 | Factors, Multiples & Algorithms | Year 5/6 Maths — Extending Investigation");
  await writePdf(doc, OUT_DIR + "/EXT1_Random_Walk_Investigation.pdf");
  console.log("  EXT1 extending investigation written.");
}

// ── Main ──────────────────────────────────────────────────────────────────────
build().catch((err) => { console.error(err); process.exit(1); });
