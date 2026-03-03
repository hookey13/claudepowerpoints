// Lesson 1 of 5: Factors, Multiples & Divisibility Algorithms
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

const OUT_DIR = "output/NP_Lesson1_Factors_Multiples_Algorithms";

const FOOTER = "Session 1 of 5 | Number Properties | Year 5/6 Maths";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes strings (kept as constants to keep build() readable)
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
• "Welcome to our Number Properties unit. Over five sessions we are going to explore how numbers relate to each other — through factors, multiples, divisibility, and the algorithms that tie them together."
• "Today we focus on factors, multiples, and how to use a step-by-step algorithm to test whether one number divides evenly into another."
• "By the end of this session you will be able to build and follow a flowchart that answers yes-or-no questions about numbers."

**DO:**
• Display the title slide as students settle. Have mini whiteboards and markers on every desk.
• Direct attention to the unit title and session number.

**TEACHER NOTES:**
This is the opening session of a five-lesson arc. Session 1 builds the conceptual foundation — factor/multiple vocabulary and the idea of divisibility as a testable property. The algorithm strand (flowcharts with branching) connects to the Australian Curriculum v9.0 emphasis on computational thinking. Students who can articulate "I divided and checked for a whole number" have the reasoning template for Sessions 2-5. VTLM 2.0 element: Setting clear expectations and activating prior knowledge.

**WATCH FOR:**
• Students who arrive without whiteboards — have spares ready.
• Students who confuse "factor" and "multiple" from prior exposure — this is normal and will be explicitly addressed in the vocabulary slide.

[Maths: Session 1 | VTLM 2.0: Setting expectations]`;

const NOTES_DR1 = `**SAY:**
• "Let's warm up with some pattern work. These questions ask you to start with a number, apply a rule repeatedly, and record the results."
• "Q1: Start at 2. The rule is multiply by 3, then subtract 1. Record the first 5 terms. Watch me do the first one: 2 times 3 is 6, minus 1 is 5. So our second term is 5. Now you continue."
• "Q2: Start at 64. If the number is even, halve it. Keep going until you reach 1. How many steps does it take?"
• "Q3: Double then add 3. Start at 1. Record 5 outputs. Go."

**DO:**
• Write Q1 on the board as you narrate. Give 90 seconds for students to work.
• Circulate and spot-check the first two terms — errors compound in iterative rules.
• After each question, use Cold Call to select a student: "[Name], read me your five terms."

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
• Cold Call one student per question: "What are your five terms for Q1?"
• Expected: [5, 14, 41, 122, 365]. Listen for correct order and correct arithmetic.
PROCEED (>=80%): If most students get Q1 and Q2 correct, move to Slide 3.
PIVOT (<80%): If students struggle with Q1, the likely error is order of operations — they add before multiplying. Reteach: "The rule says multiply FIRST, then subtract. Let me show you with arrows on the board." Re-check with a simpler rule: "Start at 3, multiply by 2, subtract 1."

**MISCONCEPTIONS:**
• Misconception: Students apply operations in the wrong order (e.g., subtract 1 first, then multiply by 3).
  Why: They read left-to-right and apply operations in reading order rather than the specified sequence.
  Quick correction: Underline the operations in order. "Which word comes first in the rule? Multiply. So we multiply first."

**TEACHER NOTES:**
The Daily Review activates procedural fluency with iterative rules — a precursor to the divisibility algorithms introduced later. Q2 (halving to 1) foreshadows the factor-testing algorithm. Q3 (double then add) builds confidence with two-step rules. These are deliberately multi-step to build the stamina needed for flowchart work. VTLM 2.0 element: Retrieval practice — activating prior learning.

**WATCH FOR:**
• Students who record the starting number as the first "output" — clarify: "The starting number is your input. The first output comes after applying the rule once."
• Students who reach 1 on Q2 but count the steps incorrectly — remind them that each application of the rule is one step.

[Maths: Stage 1 — Daily Review | VTLM 2.0: Retrieval practice]`;

const NOTES_DR2 = `**SAY:**
• "Two more warm-up questions from topics we have covered before."
• "Q4: 456 times 7. Use partitioning: 400 times 7, plus 50 times 7, plus 6 times 7. Write your answer on your whiteboard."
• "Q5: Round 4876 to the nearest hundred. Then tell me — is this an overestimate or an underestimate of the actual number?"

**DO:**
• For Q4, write the partitioning on the board as a scaffold: 400x7 = ___, 50x7 = ___, 6x7 = ___.
• For Q5, draw a quick number line segment: 4800 — 4876 — 4900. "Which hundred is closer?"
• Use Choral Response for the final answers.

**CFU CHECKPOINT:**
Technique: Choral Response
Script:
• "On my signal, everyone say the answer to Q4. Ready — say it." [Expected: 3192]
• "Is 4900 an overestimate or underestimate of 4876? Say it together." [Expected: overestimate]
PROCEED (>=80%): If choral response is clear and unified, transition to the LI/SC slide.
PIVOT (<80%): If Q4 is weak, the issue is likely partitioning. Write the three partial products on the board: 2800 + 350 + 42. Ask students to add these step by step. Re-check with Choral Response.

**TEACHER NOTES:**
Q4 reviews partitioning for multiplication — a prerequisite skill for the division-based factor test introduced in Stage 2. Q5 reviews rounding and introduces the language of "overestimate/underestimate," which connects to estimation skills used when checking divisibility mentally. Both questions are pitched at Year 5 expected level. VTLM 2.0 element: Spaced retrieval — revisiting prior content.

**WATCH FOR:**
• Students who multiply 400x7 as 280 (forgetting the trailing zeros) — remind: "4 times 7 is 28, so 400 times 7 is 2800."
• Students who say 4900 is an underestimate — they may be confusing the direction. Clarify: "4900 is bigger than 4876, so we have estimated UP — that is an overestimate."

[Maths: Stage 1 — Daily Review (prior topics) | VTLM 2.0: Spaced retrieval]`;

const NOTES_LI = `**SAY:**
• "Here is what we are learning today and how we will know we have been successful."
• Read the Learning Intention aloud. Emphasise: "algorithms with branching — that means yes/no decisions."
• Read each Success Criterion. Briefly explain: (1) factor vs multiple — we will define these carefully, (2) flowchart algorithm — a step-by-step diagram with decision points, (3) describe the pattern — we look for what happens when we test many numbers.

**DO:**
• Point to each criterion as you read it.
• Leave this slide visible briefly so students can note the criteria if required.

**TEACHER NOTES:**
Sharing the learning intention explicitly activates metacognitive awareness. The three success criteria map to a progression: vocabulary (know), procedure (do), generalisation (reason). SC3 — describing emerging patterns — is the highest-order criterion and connects to the Australian Curriculum proficiency strand of reasoning. VTLM 2.0 element: Making Learning Visible.

**WATCH FOR:**
• Students who glaze over the LI/SC — use a quick engagement move: "Turn to your partner and say one word from the Learning Intention that you think is important."

[Maths: LI/SC | VTLM 2.0: Making Learning Visible]`;

const NOTES_VOCAB = `**SAY:**
• "Before we start working with algorithms, we need four key words. Let me define each one carefully."
• Think aloud for Factor: "A factor is a number that divides evenly into another number with no remainder. So 6 is a factor of 18 because 18 divided by 6 equals 3 — a whole number, no leftovers."
• Think aloud for Multiple: "A multiple is the result of multiplying a number by a whole number. 18 is a multiple of 6 because 6 times 3 equals 18."
• "Notice: factor and multiple are two sides of the same coin. If A is a factor of B, then B is a multiple of A."
• Think aloud for Divisible: "Divisible means one number can be divided by another with no remainder. 18 is divisible by 6."
• Think aloud for Algorithm: "An algorithm is a set of step-by-step instructions for solving a problem. Today our algorithms will have branching — yes/no decisions."

**DO:**
• Point to each term card as you define it.
• Write the reciprocal relationship on the board: "6 is a factor of 18. 18 is a multiple of 6." Draw a double arrow between them.
• Have students repeat the definitions chorally for factor and multiple.

**TEACHER NOTES:**
The vocabulary slide is essential because students frequently confuse factor and multiple. The think-aloud approach makes the reasoning visible — not just the definition but the test that confirms it (division with no remainder). Linking factor and multiple as reciprocals is a key conceptual insight that prevents the common error of treating them as unrelated terms. The algorithm definition sets up the flowchart work in Stages 2-3. VTLM 2.0 element: Explicit vocabulary instruction with think-aloud.

**MISCONCEPTIONS:**
• Misconception: "Factor" means "a really big number" or "something that matters."
  Why: The everyday English meaning of "factor" (a contributing element) interferes with the mathematical meaning.
  Quick correction: "In maths, factor has a very specific meaning: a number that divides evenly into another. Let's practise: is 5 a factor of 20? Yes — 20 divided by 5 is 4, whole number."

• Misconception: Factors are always smaller than multiples.
  Why: Students generalise from examples like "factors of 12" where all factors are smaller.
  Quick correction: "Every number is a factor of itself. 12 is a factor of 12 because 12 divided by 12 equals 1."

**WATCH FOR:**
• Students who nod but cannot restate the definition — use Cold Call: "[Name], in your own words, what is a factor?"
• EAL/D students may need the definitions written on a vocabulary card at their desk.

[Maths: Stage 2 — Vocabulary | VTLM 2.0: Explicit vocabulary instruction]`;

const NOTES_WE1 = `**SAY:**
• "Now watch me use an algorithm to answer a question: Is 7 a factor of 42?"
• Think aloud: "Step 1 — Start. I have two numbers: 7 and 42. The question is: does 7 divide evenly into 42?"
• "Step 2 — Calculate. I divide 42 by 7. Let me think... 7 times 6 is 42. So 42 divided by 7 equals 6."
• "Step 3 — Decision. Is 6 a whole number? Yes, it is — there is no decimal, no remainder."
• "Step 4 — Conclusion. Because the answer is a whole number, 7 IS a factor of 42."
• "That is the algorithm. Four steps: Start, Calculate, Decide, Conclude."

**DO:**
• Point to each step on the flowchart as you narrate.
• Write the division on the board: 42 / 7 = 6.
• Emphasise the decision point: "This is where the algorithm branches. If YES, factor. If NO, not a factor."

**TEACHER NOTES:**
This is the anchor worked example for the factor-testing algorithm. The think-aloud makes each decision point explicit — students need to see that the algorithm is not just "divide and get an answer" but "divide, check the nature of the answer, then conclude." The flowchart visual on the right reinforces the branching structure. The four-step sequence (Start, Calculate, Decide, Conclude) provides a memorable scaffold. VTLM 2.0 element: Explicit instruction with think-aloud — making decision-making visible.

**WATCH FOR:**
• Students who jump straight to "yes" without articulating the division — insist on the full process: "What did you divide? What was the answer? Is it a whole number?"
• Students who struggle with 42 / 7 — this is a times-table fact. If they cannot recall it, they need multiplication fluency support alongside this unit.

[Maths: Stage 2 — I Do, Worked Example 1 | VTLM 2.0: Explicit instruction with think-aloud]`;

const NOTES_WE2 = `**SAY:**
• "Now let me show you the same algorithm but with a different question: Is 56 a multiple of 8?"
• Think aloud: "A multiple question is really the same test. If 56 is a multiple of 8, then 8 is a factor of 56. So I divide 56 by 8."
• "56 divided by 8... 8 times 7 is 56. The answer is 7 — a whole number."
• "So yes, 56 IS a multiple of 8. And notice — 8 is a factor of 56. Same relationship, different direction."
• "Key insight: testing for multiples and testing for factors uses the SAME algorithm — divide and check for a whole number."

**DO:**
• Write on the board: "56 / 8 = 7. Whole number? YES. So 56 is a multiple of 8."
• Draw the reciprocal arrows again: "8 is a factor of 56 <-> 56 is a multiple of 8."
• Pause and check: "Who can tell me another multiple of 8?" Cold Call a student.

**TEACHER NOTES:**
This second worked example deliberately uses "multiple" language to show students that the same division algorithm answers both factor and multiple questions. The reciprocal relationship is reinforced visually and verbally. By connecting the two question types through a single algorithm, we reduce cognitive load — students learn one procedure, not two. VTLM 2.0 element: Connecting representations — showing factor and multiple as reciprocal views.

**WATCH FOR:**
• Students who think multiples require a different test — "Do I need to multiply instead?" Clarify: "You can multiply to generate multiples (8, 16, 24, 32...) but to TEST whether a number is a multiple, divide."
• Students who correctly say "7" but cannot explain why that means 56 is a multiple — push for the reasoning: "7 is a whole number, so 8 goes into 56 exactly 7 times with nothing left over."

[Maths: Stage 2 — I Do, Worked Example 2 | VTLM 2.0: Connecting representations]`;

const NOTES_CFU1 = `**SAY:**
• "Quick check. I am going to call on someone to answer this question."
• "Is 6 a factor of 48? Use the algorithm to decide. Think for 10 seconds."
• [Pause 10 seconds.] Cold Call: "[Name], walk me through the algorithm."
• Expected response: "48 divided by 6 is 8. 8 is a whole number. So yes, 6 is a factor of 48."

**DO:**
• Allow 10 seconds of silent thinking before the Cold Call.
• If the called student gives the correct answer, ask a follow-up: "And is 48 a multiple of 6?" [Yes — same relationship.]
• If incorrect, thank the student and redirect: "Let's work through it together."

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
• "[Name], is 6 a factor of 48? Tell me the steps."
• Listen for: (1) 48 / 6 = 8, (2) 8 is a whole number, (3) therefore yes.
PROCEED (>=80%): If the called student and class agreement (thumbs) confirm understanding, move to the flowchart building slide.
PIVOT (<80%): If the student says "no" or cannot articulate the steps — the likely issue is either a multiplication fact error (6 x 8 = 48) or not understanding what "whole number" means in this context. Reteach: "Let me show you on the board. 6 times what gives 48? Let's count: 6, 12, 18, 24, 30, 36, 42, 48. That's 8 groups. No remainders — whole number." Re-check with Cold Call on a different student: "Is 5 a factor of 35?"

**TEACHER NOTES:**
Cold Call is chosen here because it holds all students accountable to think during the 10-second wait time. The question is deliberately straightforward (48/6 = 8 is a known fact for most Year 5/6 students) so the focus is on articulating the algorithm, not on the arithmetic. The follow-up question about multiples reinforces the reciprocal relationship. VTLM 2.0 element: Formative assessment — Cold Call with wait time.

**WATCH FOR:**
• Students who give the answer without the reasoning — insist: "I need the steps, not just yes or no."
• Students who say "6 times 8 is 48 so yes" — this is correct reasoning but expressed as multiplication rather than division. Accept it but model the division form: "That's right — and we can also say 48 divided by 6 is 8."

[Maths: Stage 2 — CFU 1 | VTLM 2.0: Formative assessment — Cold Call]`;

const NOTES_FLOWCHART = `**SAY:**
• "Now we are going to build this algorithm as a flowchart — together."
• "A flowchart uses boxes for steps and diamonds for decisions. Let me walk you through the structure."
• "Step 1: We start with two numbers, X and Y. The question is: Is X a factor of Y?"
• "Step 2: We calculate Y divided by X."
• "Step 3: The diamond — Is the result a whole number? This is the branching point."
• "Step 4: If YES, we follow one path: X IS a factor of Y. If NO, the other path: X is NOT a factor."
• "This is the same algorithm we used in the worked examples, but now we can see its structure."

**DO:**
• Draw the flowchart on the board as you describe each step, even though it is on the slide.
• Use two different coloured markers: one for the YES path, one for the NO path.
• Have students copy the flowchart into their workbooks.

**ENABLING & EXTENDING:**
ENABLING: Provide a pre-drawn flowchart template with empty boxes. Students fill in the text only.
EXTENDING: Ask students to add a second decision: "Is Y also a factor of X?" (Hint: only when X = Y.)

**TEACHER NOTES:**
Building the flowchart collaboratively transitions students from following an algorithm (I Do) to understanding its structure (We Do). Drawing it live on the board, mirroring the slide, reinforces the connection between the verbal steps and the visual representation. The flowchart is a key computational thinking artefact — students need to see that the diamond (decision box) is where the algorithm branches. This connects to digital technologies curriculum strands. VTLM 2.0 element: Collaborative construction of a mathematical tool.

**WATCH FOR:**
• Students who draw the flowchart but cannot explain what each box does — quiz them: "Point to the decision. What question does it ask?"
• Students who draw arrows in the wrong direction — flowcharts read top-to-bottom (and left/right for branches).

[Maths: Stage 3 — We Do, Flowchart building | VTLM 2.0: Collaborative construction]`;

const NOTES_PP = `**SAY:**
• "Your turn with a partner. Use the flowchart we just built."
• "Is 9 a factor of 63? Work through each step of the flowchart on your whiteboard. Show your working."
• "You have 60 seconds. Go."
• After 60 seconds: "Boards up — Show Me! I want to see your division AND your conclusion."

**DO:**
• Circulate during the 60 seconds. Look for: correct division (63/9 = 7), correct conclusion (yes, factor).
• After Show Me, select a student whose board clearly shows all steps.
• If using Show Me Boards, scan left-to-right across the room. Note who wrote only the answer vs who showed the algorithm.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Boards up in 3, 2, 1 — Show Me!"
• Scan for: "63 / 9 = 7" and "Yes, 9 is a factor of 63."
• Ask a non-volunteer to explain their working.
PROCEED (>=80%): If most boards show the complete algorithm with correct answer, move to Pattern Investigation.
PIVOT (<80%): If students write "yes" without showing division, or get the division wrong — the likely issue is either recall of 9x7=63 or not following the flowchart structure. Reteach: "Let me show you how I use the flowchart step by step. Box 1 — start with 9 and 63. Box 2 — divide 63 by 9. I need to think: 9 times what is 63? 9 times 7 is 63. So the answer is 7. Diamond — is 7 a whole number? Yes. Conclusion — 9 IS a factor." Re-check with a new pair: "Is 7 a factor of 49?"

**ENABLING & EXTENDING:**
ENABLING: Provide the division fact (63/9 = 7) and ask students to complete the flowchart from Step 3 onward.
EXTENDING: "Is 9 a factor of 65? What changes in the flowchart?" (65/9 = 7.22... not whole number, so NO.)

**TEACHER NOTES:**
The Problem Pair is the first time students apply the algorithm independently (with partner support). Show Me Boards provides immediate whole-class data. The deliberate choice of 63/9 = 7 uses a times-table fact students should know — the cognitive demand is on following the algorithm, not on the arithmetic. VTLM 2.0 element: Guided practice with formative feedback.

**WATCH FOR:**
• Students who write "9 x 7 = 63" instead of "63 / 9 = 7" — both are valid but encourage the division form as it matches the flowchart structure.
• Students who write "yes" but cannot point to where in the flowchart they made the decision — they are getting the answer by recall, not by algorithm. Push: "Show me which box gave you your answer."

[Maths: Stage 3 — We Do, Problem Pair | VTLM 2.0: Guided practice]`;

const NOTES_PATTERN = `**SAY:**
• "Now let's investigate a pattern using an algorithm with branching."
• "Here is the rule: If the number is even, halve it. If it is odd, subtract 1, then halve."
• "Start at 20. Apply the rule at each step. Record each number until you reach 1."
• "Then do the same starting at 15."
• "After both, I want you to think: What pattern do you notice?"
• Allow 2-3 minutes. Then: "Turn to your partner and share what you noticed."

**DO:**
• Write the rule on the board with two branches clearly shown:
  - EVEN -> halve
  - ODD -> subtract 1, then halve
• Model the first two steps for 20: "20 is even, so halve: 10. 10 is even, so halve: 5. Now you continue."
• Circulate and note which students identify the pattern.

**ENABLING & EXTENDING:**
ENABLING: Provide the first three steps for each starting number. Students complete the rest.
EXTENDING: "Try starting at 100. Does the same pattern hold? How many steps to reach 1?"

**TEACHER NOTES:**
This activity bridges the procedural (following an algorithm) and the analytical (observing emergent patterns). The branching rule (even/odd) is a natural precursor to divisibility testing — students are implicitly checking "is this number divisible by 2?" at each step. The pattern they should notice: regardless of starting number, the sequence always reaches 1; and the number of steps relates to how many times you can halve. This connects to powers of 2 and binary thinking. VTLM 2.0 element: Mathematical investigation — pattern recognition.

**WATCH FOR:**
• Students who apply "subtract 1 then halve" to even numbers — the branching condition must be checked each time.
• Students who reach 1 but do not count steps or compare — prompt: "How many steps from 20? How many from 15? Why the difference?"
• The sequence from 20: 20, 10, 5, 2, 1 (4 steps). From 15: 15, 7, 3, 1 (3 steps — but check: 15 is odd, subtract 1 = 14, halve = 7. 7 is odd, subtract 1 = 6, halve = 3. 3 is odd, subtract 1 = 2, halve = 1.)

[Maths: Stage 3 — We Do, Pattern Investigation | VTLM 2.0: Mathematical investigation]`;

const NOTES_CFU2 = `**SAY:**
• "Hinge check before you work independently."
• "Is 72 a multiple of 9? Turn to your partner, discuss your reasoning using the algorithm, then show me your answer."
• Allow 30 seconds for pair discussion. Then: "Boards up — Show Me!"

**DO:**
• Scan boards for: "72 / 9 = 8, whole number, YES."
• Select a pair to explain their reasoning aloud.
• If most boards are correct, give a brief affirmation and transition to You Do.

**CFU CHECKPOINT:**
Technique: Think-Pair-Share
Script:
• "Think for 10 seconds. Then share with your partner for 20 seconds." [Pause.]
• "Boards up — Show Me!"
• Scan for: "72 / 9 = 8" and "Yes, 72 is a multiple of 9."
• Select a pair: "Tell us how you decided."
PROCEED (>=80%): If boards show correct algorithm with reasoning, move to Independent Practice.
PIVOT (<80%): If students struggle, the likely issue is either the 9x tables or confusion between factor/multiple language. Reteach: "Let me rephrase: is there a whole number you can multiply by 9 to get 72? 9 times 1 is 9, 9 times 2 is 18... count up to 9 times 8 = 72. Yes! So 72 is a multiple of 9." Re-check with: "Is 54 a multiple of 9?"

**TEACHER NOTES:**
Think-Pair-Share is chosen here because it gives every student a chance to articulate reasoning before the public check. The "multiple" language (rather than "factor") tests whether students can translate between the two framings. The hinge question gates entry to independent practice — students who cannot answer this correctly need additional guided support before working alone. VTLM 2.0 element: Formative assessment — hinge question.

**WATCH FOR:**
• Students who say "yes" but explain using factor language ("9 is a factor of 72") — this is correct reasoning! Validate it and add: "And that means 72 is a multiple of 9."
• Students who cannot recall 9x8 — suggest the digit-sum trick: "Add the digits of 72: 7+2 = 9. If the digit sum is 9, the number is divisible by 9."

[Maths: Stage 3 — CFU 2 (Hinge) | VTLM 2.0: Formative assessment — hinge question]`;

const NOTES_YODO = `**SAY:**
• "Time to work independently. Follow the instructions on the screen."
• "First: choose 3 numbers between 30 and 100. Write them down."
• "Next: for each number, use the flowchart to test whether 6 is a factor. Show every step — Start, Calculate, Decide, Conclude."
• "Then: record your results in a table with columns: Number, 6 is a factor (Yes/No), Division result."
• "Describe any pattern you notice in the numbers where 6 IS a factor."
• "Challenge: create your own algorithm to test if a number is a multiple of 7."

**DO:**
• Display the slide and read through the instructions once.
• Distribute workbooks or worksheets if applicable.
• Circulate continuously — target students who struggled during CFU 2 first.
• For the challenge, guide students who finish early: "What steps does your algorithm need? Start, Calculate... what else?"

**ENABLING & EXTENDING:**
ENABLING: Provide three specific numbers (36, 45, 54) and a pre-drawn table. Students complete the division and conclusion only. Include the flowchart as a reference.
EXTENDING: "Create your own algorithm to test if a number is a multiple of 7. Test it on 5 numbers. Can you find a shortcut for divisibility by 7?"

**TEACHER NOTES:**
Independent practice is where students consolidate. The choice of "is 6 a factor?" is deliberate — 6 is a composite number (2x3), so students who test numbers like 36, 42, 48 will find factors, while numbers like 35, 37, 43 will not divide evenly. The pattern (multiples of 6 are all even and divisible by 3) connects to Session 2's work on divisibility rules. The challenge (algorithm for multiples of 7) extends computational thinking — there is no simple divisibility rule for 7, so students must rely on the division algorithm. VTLM 2.0 element: Differentiated practice — enabling and extending.

**WATCH FOR:**
• Students who test only one number — encourage: "You need three. Try a variety — some you think will be factors and some you think won't."
• Students who write "yes" or "no" without the division — redirect to the flowchart: "Show me Step 2. What division did you do?"
• Students who complete the challenge: check that their algorithm includes a decision point (branching), not just "divide by 7."

[Maths: Stage 4 — You Do, Independent Practice | VTLM 2.0: Differentiated practice]`;

const NOTES_EXIT = `**SAY:**
• "Pens down on your independent work. Open your workbook to a fresh page. Exit ticket — three questions, three minutes."
• Read Q1: "Is 8 a factor of 52? Use the algorithm and explain your reasoning."
• Read Q2: "List the first 5 multiples of 7."
• Read Q3: "Start at 48. Apply: if even, halve; if odd, add 1. Record each step until you reach 3. How many steps?"
• "Work silently and independently. This is your chance to show me what you understand."

**DO:**
• Collect workbooks immediately after the exit ticket. Mark tonight to inform groupings for Session 2.
• Q1 tests SC1 and SC2 (factor identification via algorithm). Q2 tests SC1 (multiple generation). Q3 tests SC3 (pattern from algorithm application).

**TEACHER NOTES:**
The exit ticket directly measures all three success criteria. Q1 (is 8 a factor of 52?) has answer NO — 52/8 = 6.5, not a whole number. This is the first time students encounter a "no" result in a formal assessment context, testing whether they understand the decision branch. Q2 is straightforward generation (7, 14, 21, 28, 35). Q3 tests algorithm application with branching (48, 24, 12, 6, 3 — four steps). Mark with three categories: secure / developing / not yet. Use results for Session 2 flexible grouping. VTLM 2.0 element: Summative-formative assessment.

**WATCH FOR:**
• Students who say 8 IS a factor of 52 — they may have made an arithmetic error (52/8 = 6 remainder 4, not 6.5). Both framings are correct for "not a whole number."
• Students who list multiples of 7 starting from 1 (1, 7, 14...) — 1 is not a multiple of 7 in the conventional sense. Accept 7 as the first multiple.
• Students who leave Q3 blank — they may not have reached this content. Note for enabling support in Session 2.

[Maths: Stage 5 — Exit Ticket | VTLM 2.0: Summative-formative assessment]`;

const NOTES_CLOSING = `**SAY:**
• "Before we finish, turn to your partner."
• "Explain: what is the difference between a factor and a multiple? Give an example of each."
• Allow 30 seconds. Then: "Who can share what their partner said?" Select a non-volunteer.
• Confirm key points: "Factors divide evenly into a number. Multiples are the result of multiplying. An algorithm with branching helps us test both."

**DO:**
• Listen to several pair discussions as you circulate.
• Select a non-volunteer to share — this validates quiet students and keeps everyone accountable.
• Preview Session 2: "Next time we will explore divisibility RULES — shortcuts that let you test without dividing."

**TEACHER NOTES:**
The Turn & Talk closing activates retrieval and requires students to articulate the key distinction of the lesson. The non-volunteer selection ensures the summary comes from a range of students, not just the most confident. The key points on screen provide a reference frame. Previewing Session 2 creates anticipation and connects today's algorithm work to the rules-based approach that follows. VTLM 2.0 element: Consolidation through peer articulation.

**WATCH FOR:**
• Students who can give examples but cannot state the general relationship — this is developing understanding. Note for Session 2 vocabulary revision.
• Students who say "factors are small and multiples are big" — this is a partial truth but not a definition. Redirect: "12 is a factor of 12. Is 12 small?"

[Maths: Closing | VTLM 2.0: Consolidation]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build function
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Year 5/6 Maths";
  pres.title = "Session 1: Factors, Multiples & Divisibility Algorithms";

  // ── Slide 1: Title ────────────────────────────────────────────────────────
  titleSlide(
    pres,
    "Factors, Multiples & Divisibility Algorithms",
    "Using step-by-step algorithms to explore number relationships",
    "Year 5/6 | Number Properties | Session 1 of 5",
    NOTES_TITLE
  );

  // ── Slide 2: Daily Review — Pattern Questions ─────────────────────────────
  contentSlide(
    pres,
    1,
    "Activate Prior Knowledge",
    "Daily Review",
    [
      "Q1: Start at 2, apply rule: multiply by 3 then subtract 1. Record the first 5 terms.",
      "Q2: Start at 64. If even, halve it. Record until you reach 1.",
      "Q3: Apply: double then add 3. Start at 1. Record 5 outputs.",
    ],
    NOTES_DR1,
    FOOTER,
    (s) => {
      // Right side: three question cards with answers hidden behind colour blocks
      const questions = [
        { q: "Q1", rule: "x3 then -1", start: "Start: 2", color: C.AMBER },
        { q: "Q2", rule: "If even, halve", start: "Start: 64", color: C.NAVY },
        { q: "Q3", rule: "x2 then +3", start: "Start: 1", color: C.TEAL },
      ];
      questions.forEach((item, i) => {
        const cy = CONTENT_TOP + i * 1.25;
        s.addShape("roundRect", {
          x: 5.3, y: cy, w: 4.2, h: 1.05, rectRadius: 0.1,
          fill: { color: item.color },
          shadow: makeCardShadow(),
        });
        s.addText(item.q, {
          x: 5.5, y: cy + 0.06, w: 3.8, h: 0.35,
          fontSize: 16, fontFace: FONT_H, color: C.WHITE,
          align: "left", valign: "middle", bold: true, margin: 0,
        });
        s.addText(item.rule + "  |  " + item.start, {
          x: 5.5, y: cy + 0.45, w: 3.8, h: 0.5,
          fontSize: 13, fontFace: FONT_B, color: C.WHITE,
          align: "left", valign: "top", margin: 0,
        });
      });
    }
  );

  // ── Slide 3: Daily Review — Prior Topic Questions ─────────────────────────
  contentSlide(
    pres,
    1,
    "Activate Prior Knowledge",
    "Daily Review (continued)",
    [
      "Q4: 456 x 7 = ?",
      "Use partitioning: 400x7 + 50x7 + 6x7",
      "Q5: Round 4876 to the nearest hundred.",
      "Is this an overestimate or an underestimate?",
    ],
    NOTES_DR2,
    FOOTER,
    (s) => {
      // Right side: two calculation cards
      // Q4 card
      addCard(s, 5.3, CONTENT_TOP, 4.2, 1.6, { strip: C.AMBER });
      s.addText("Q4: Partitioning", {
        x: 5.55, y: CONTENT_TOP + 0.1, w: 3.7, h: 0.3,
        fontSize: 13, fontFace: FONT_H, color: C.AMBER, bold: true, margin: 0,
      });
      s.addText([
        { text: "400 x 7 = 2800", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL } },
        { text: " 50 x 7 =  350", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL } },
        { text: "  6 x 7 =   42", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL } },
      ], {
        x: 5.55, y: CONTENT_TOP + 0.45, w: 3.7, h: 1.0,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Q5 card
      const q5Y = CONTENT_TOP + 1.8;
      addCard(s, 5.3, q5Y, 4.2, 1.6, { strip: C.NAVY });
      s.addText("Q5: Rounding", {
        x: 5.55, y: q5Y + 0.1, w: 3.7, h: 0.3,
        fontSize: 13, fontFace: FONT_H, color: C.NAVY, bold: true, margin: 0,
      });
      // Mini number line visual
      s.addShape("line", {
        x: 5.7, y: q5Y + 0.7, w: 3.5, h: 0,
        line: { color: C.CHARCOAL, width: 2 },
      });
      // Tick marks
      s.addShape("line", { x: 5.7, y: q5Y + 0.6, w: 0, h: 0.2, line: { color: C.CHARCOAL, width: 2 } });
      s.addShape("line", { x: 9.2, y: q5Y + 0.6, w: 0, h: 0.2, line: { color: C.CHARCOAL, width: 2 } });
      // Labels
      s.addText("4800", {
        x: 5.4, y: q5Y + 0.82, w: 0.7, h: 0.25,
        fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, align: "center", margin: 0,
      });
      s.addText("4900", {
        x: 8.9, y: q5Y + 0.82, w: 0.7, h: 0.25,
        fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, align: "center", margin: 0,
      });
      // 4876 marker dot
      const markerX = 5.7 + (4876 - 4800) / (4900 - 4800) * 3.5;
      s.addShape("roundRect", {
        x: markerX - 0.08, y: q5Y + 0.62, w: 0.16, h: 0.16, rectRadius: 0.08,
        fill: { color: C.CORAL },
      });
      s.addText("4876", {
        x: markerX - 0.35, y: q5Y + 0.42, w: 0.7, h: 0.2,
        fontSize: 9, fontFace: FONT_B, color: C.CORAL, align: "center", bold: true, margin: 0,
      });
    }
  );

  // ── Slide 4: LI & SC ───────────────────────────────────────────────────────
  liSlide(
    pres,
    [
      "We are learning to use algorithms with branching and repetition to identify factors, multiples and test for divisibility.",
    ],
    [
      "I can identify whether a number is a factor or multiple of another number.",
      "I can follow and create a flowchart algorithm using yes/no decisions to test divisibility.",
      "I can describe the emerging pattern when I apply a divisibility rule to a set of numbers.",
    ],
    NOTES_LI,
    FOOTER
  );

  // ── Slide 5: Vocabulary (I Do — Stage 2) ──────────────────────────────────
  contentSlide(
    pres,
    2,
    "Explicit Instruction — I Do",
    "Key Vocabulary",
    [
      "Factor: a number that divides evenly into another (no remainder).",
      "Multiple: the result of multiplying a number by a whole number.",
      "Divisible: can be divided by another number with no remainder.",
      "Algorithm: a step-by-step set of instructions for solving a problem.",
    ],
    NOTES_VOCAB,
    FOOTER,
    (s) => {
      // Right side: four vocabulary cards
      const terms = [
        { word: "Factor", icon: "F", color: C.NAVY, desc: "Divides evenly" },
        { word: "Multiple", icon: "M", color: C.TEAL, desc: "Result of multiplying" },
        { word: "Divisible", icon: "D", color: C.AMBER, desc: "No remainder" },
        { word: "Algorithm", icon: "A", color: C.CORAL, desc: "Step-by-step" },
      ];
      terms.forEach((t, i) => {
        const cy = CONTENT_TOP + i * 0.92;
        // Card background
        s.addShape("roundRect", {
          x: 5.3, y: cy, w: 4.2, h: 0.78, rectRadius: 0.08,
          fill: { color: C.WHITE },
          shadow: makeCardShadow(),
        });
        // Left accent strip
        s.addShape("rect", {
          x: 5.3, y: cy, w: 0.07, h: 0.78,
          fill: { color: t.color },
        });
        // Icon circle
        s.addShape("roundRect", {
          x: 5.55, y: cy + 0.12, w: 0.54, h: 0.54, rectRadius: 0.27,
          fill: { color: t.color },
        });
        s.addText(t.icon, {
          x: 5.55, y: cy + 0.12, w: 0.54, h: 0.54,
          fontSize: 20, fontFace: FONT_H, color: C.WHITE,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
        // Term name
        s.addText(t.word, {
          x: 6.25, y: cy + 0.06, w: 3.0, h: 0.36,
          fontSize: 15, fontFace: FONT_H, color: t.color, bold: true, margin: 0,
          valign: "bottom",
        });
        // Short definition
        s.addText(t.desc, {
          x: 6.25, y: cy + 0.42, w: 3.0, h: 0.3,
          fontSize: 11, fontFace: FONT_B, color: C.MUTED, margin: 0,
          valign: "top",
        });
      });
    }
  );

  // ── Slide 6: Worked Example 1 (I Do — Stage 2) ───────────────────────────
  workedExSlide(
    pres,
    2,
    "Explicit Instruction — I Do",
    "Is 7 a Factor of 42?",
    [
      "Step 1: Start with numbers 7 and 42.",
      "Step 2: Calculate 42 / 7 = 6.",
      "Step 3: Is 6 a whole number? YES.",
      "Step 4: Conclusion — 7 IS a factor of 42.",
      "The algorithm: Start, Calculate, Decide, Conclude.",
    ],
    NOTES_WE1,
    FOOTER,
    (s) => {
      // Right side: flowchart using shapes
      const fx = 6.2;       // flowchart x anchor
      const fy = CONTENT_TOP + 0.05;
      const boxW = 2.8;
      const boxH = 0.48;
      const diaW = 2.8;
      const diaH = 0.52;
      const gap = 0.18;

      // Box 1: Start
      addTextOnShape(s, "START: 7 and 42", {
        x: fx, y: fy, w: boxW, h: boxH, rectRadius: 0.08,
        fill: { color: C.NAVY },
      }, {
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      // Arrow 1
      const a1y = fy + boxH;
      s.addShape("line", {
        x: fx + boxW / 2, y: a1y, w: 0, h: gap,
        line: { color: C.MUTED, width: 1.5 },
      });

      // Box 2: Calculate
      const b2y = a1y + gap;
      addTextOnShape(s, "42 / 7 = 6", {
        x: fx, y: b2y, w: boxW, h: boxH, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Arrow 2
      const a2y = b2y + boxH;
      s.addShape("line", {
        x: fx + boxW / 2, y: a2y, w: 0, h: gap,
        line: { color: C.MUTED, width: 1.5 },
      });

      // Diamond: Decision
      const d3y = a2y + gap;
      addTextOnShape(s, "Whole number?", {
        x: fx, y: d3y, w: diaW, h: diaH, rectRadius: 0.08,
        fill: { color: C.NAVY_LIGHT },
      }, {
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      // Arrow 3
      const a3y = d3y + diaH;
      s.addShape("line", {
        x: fx + boxW / 2, y: a3y, w: 0, h: gap,
        line: { color: C.MUTED, width: 1.5 },
      });

      // "YES" label on arrow
      s.addText("YES", {
        x: fx + boxW / 2 + 0.08, y: a3y, w: 0.5, h: gap,
        fontSize: 9, fontFace: FONT_B, color: C.EMERALD, bold: true, margin: 0,
        valign: "middle",
      });

      // Box 4: Conclusion
      const b4y = a3y + gap;
      addTextOnShape(s, "7 IS a factor of 42", {
        x: fx, y: b4y, w: boxW, h: boxH + 0.1, rectRadius: 0.08,
        fill: { color: C.EMERALD },
      }, {
        fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 7: Worked Example 2 (I Do — Stage 2) ───────────────────────────
  contentSlide(
    pres,
    2,
    "Explicit Instruction — I Do",
    "Is 56 a Multiple of 8?",
    [
      "Use the same algorithm: divide 56 by 8.",
      "56 / 8 = 7 (whole number).",
      "YES — 56 IS a multiple of 8.",
      "Reciprocal: 8 is a factor of 56.",
      "Key insight: factor and multiple tests use the SAME algorithm.",
    ],
    NOTES_WE2,
    FOOTER,
    (s) => {
      // Right side: reciprocal relationship diagram
      const rx = 5.4;
      const ry = CONTENT_TOP + 0.2;

      // Division card
      addCard(s, rx, ry, 4.1, 1.1, { strip: C.NAVY });
      s.addText("56 / 8 = 7", {
        x: rx + 0.2, y: ry + 0.08, w: 3.7, h: 0.5,
        fontSize: 26, fontFace: FONT_H, color: C.NAVY,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
      s.addText("Whole number? YES", {
        x: rx + 0.2, y: ry + 0.6, w: 3.7, h: 0.4,
        fontSize: 14, fontFace: FONT_B, color: C.EMERALD, bold: true,
        align: "center", valign: "middle", margin: 0,
      });

      // Reciprocal arrows
      const arrowY = ry + 1.35;
      // Top pill: "8 is a factor of 56"
      addTextOnShape(s, "8 is a FACTOR of 56", {
        x: rx, y: arrowY, w: 4.1, h: 0.48, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      // Double arrow between
      const midArrowY = arrowY + 0.48;
      s.addShape("line", {
        x: rx + 2.05, y: midArrowY + 0.02, w: 0, h: 0.2,
        line: { color: C.MUTED, width: 1.5 },
      });
      s.addText("\u2195", {
        x: rx + 1.75, y: midArrowY, w: 0.6, h: 0.24,
        fontSize: 14, fontFace: FONT_B, color: C.MUTED, align: "center", valign: "middle", margin: 0,
      });

      // Bottom pill: "56 is a multiple of 8"
      addTextOnShape(s, "56 is a MULTIPLE of 8", {
        x: rx, y: midArrowY + 0.24, w: 4.1, h: 0.48, rectRadius: 0.08,
        fill: { color: C.NAVY_LIGHT },
      }, {
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      // Key insight banner
      addTextOnShape(s, "Same algorithm, different question!", {
        x: rx, y: midArrowY + 1.0, w: 4.1, h: 0.42, rectRadius: 0.08,
        fill: { color: C.CORAL },
      }, {
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 8 (+ reveal): CFU 1 — Cold Call ────────────────────────────────
  withReveal(
    () => cfuSlide(
      pres,
      2,
      "Explicit Instruction — I Do",
      "Quick Check",
      "Cold Call",
      "Is 6 a factor of 48?\nUse the algorithm to decide.",
      NOTES_CFU1,
      FOOTER
    ),
    (s) => {
      // Reveal: answer banner
      addTextOnShape(s, "Yes \u2014 48 \u00f7 6 = 8 (whole number), so 6 IS a factor of 48", {
        x: 0.8, y: 4.4, w: 8.4, h: 0.55, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 9: We Do — Building a Flowchart (Stage 3) ──────────────────────
  contentSlide(
    pres,
    3,
    "Guided Practice — We Do",
    "Let's Build a Flowchart Together",
    [
      "We need a flowchart that answers: Is X a factor of Y?",
      "Step 1: Start with numbers X and Y.",
      "Step 2: Divide Y by X.",
      "Step 3: Is the result a whole number?",
      "Step 4: If YES \u2192 X is a factor. If NO \u2192 X is not a factor.",
    ],
    NOTES_FLOWCHART,
    FOOTER,
    (s) => {
      // Right side: generic flowchart template
      const fx = 5.6;
      const fy = CONTENT_TOP + 0.05;
      const bw = 3.6;
      const bh = 0.44;
      const gap = 0.16;

      // Start
      addTextOnShape(s, "START: X and Y", {
        x: fx, y: fy, w: bw, h: bh, rectRadius: 0.22,
        fill: { color: C.TEAL },
      }, {
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      // Arrow
      s.addShape("line", {
        x: fx + bw / 2, y: fy + bh, w: 0, h: gap,
        line: { color: C.MUTED, width: 1.5 },
      });

      // Calculate
      const calcY = fy + bh + gap;
      addTextOnShape(s, "Calculate: Y \u00f7 X", {
        x: fx, y: calcY, w: bw, h: bh, rectRadius: 0.08,
        fill: { color: C.NAVY },
      }, {
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      // Arrow
      s.addShape("line", {
        x: fx + bw / 2, y: calcY + bh, w: 0, h: gap,
        line: { color: C.MUTED, width: 1.5 },
      });

      // Decision diamond (using rounded rect styled as a diamond visually)
      const decY = calcY + bh + gap;
      addTextOnShape(s, "Whole number?", {
        x: fx, y: decY, w: bw, h: 0.52, rectRadius: 0.08,
        fill: { color: C.NAVY_LIGHT },
      }, {
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      // YES arrow (down-left)
      const yesArrY = decY + 0.52;
      s.addShape("line", {
        x: fx + bw * 0.3, y: yesArrY, w: 0, h: gap,
        line: { color: C.EMERALD, width: 1.5 },
      });
      s.addText("YES", {
        x: fx + bw * 0.3 - 0.55, y: yesArrY, w: 0.5, h: gap,
        fontSize: 9, fontFace: FONT_B, color: C.EMERALD, bold: true, margin: 0,
        align: "right", valign: "middle",
      });

      // NO arrow (down-right)
      s.addShape("line", {
        x: fx + bw * 0.7, y: yesArrY, w: 0, h: gap,
        line: { color: C.CORAL, width: 1.5 },
      });
      s.addText("NO", {
        x: fx + bw * 0.7 + 0.05, y: yesArrY, w: 0.5, h: gap,
        fontSize: 9, fontFace: FONT_B, color: C.CORAL, bold: true, margin: 0,
        align: "left", valign: "middle",
      });

      // YES outcome
      const outY = yesArrY + gap;
      addTextOnShape(s, "X IS a factor", {
        x: fx, y: outY, w: bw * 0.46, h: bh, rectRadius: 0.08,
        fill: { color: C.EMERALD },
      }, {
        fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      // NO outcome
      addTextOnShape(s, "X is NOT a factor", {
        x: fx + bw * 0.54, y: outY, w: bw * 0.46, h: bh, rectRadius: 0.08,
        fill: { color: C.CORAL },
      }, {
        fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 10 (+ reveal): We Do — Problem Pair (Stage 3) ──────────────────
  withReveal(
    () => cfuSlide(
      pres,
      3,
      "Guided Practice — We Do",
      "Your Turn — Problem Pair",
      "Show Me Boards",
      "Is 9 a factor of 63?\nUse the flowchart. Show your working on your whiteboard.",
      NOTES_PP,
      FOOTER
    ),
    (s) => {
      // Reveal: answer banner
      addTextOnShape(s, "63 \u00f7 9 = 7  \u2714  Yes, 9 is a factor of 63", {
        x: 0.8, y: 4.4, w: 8.4, h: 0.55, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 11: We Do — Pattern Investigation (Stage 3) ────────────────────
  contentSlide(
    pres,
    3,
    "Guided Practice — We Do",
    "Pattern Investigation",
    [
      "Apply this rule to each number:",
      "If even \u2192 halve it.  If odd \u2192 subtract 1, then halve.",
      "Start at 20. Record each step until you reach 1.",
      "Start at 15. Do the same.",
      "What pattern do you notice?",
    ],
    NOTES_PATTERN,
    FOOTER,
    (s) => {
      // Right side: worked trace for starting at 20
      const rx = 5.4;
      const ry = CONTENT_TOP + 0.1;

      addCard(s, rx, ry, 4.1, 1.5, { strip: C.TEAL });
      s.addText("Starting at 20:", {
        x: rx + 0.2, y: ry + 0.08, w: 3.7, h: 0.3,
        fontSize: 12, fontFace: FONT_H, color: C.TEAL, bold: true, margin: 0,
      });
      // Chain of numbers
      const chain20 = ["20", "10", "5", "2", "1"];
      const chainW = 0.62;
      chain20.forEach((n, i) => {
        const cx = rx + 0.25 + i * (chainW + 0.12);
        s.addShape("roundRect", {
          x: cx, y: ry + 0.45, w: chainW, h: 0.45, rectRadius: 0.08,
          fill: { color: i === chain20.length - 1 ? C.EMERALD : C.NAVY },
        });
        s.addText(n, {
          x: cx, y: ry + 0.45, w: chainW, h: 0.45,
          fontSize: 16, fontFace: FONT_H, color: C.WHITE,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
        if (i < chain20.length - 1) {
          s.addText("\u2192", {
            x: cx + chainW, y: ry + 0.45, w: 0.12, h: 0.45,
            fontSize: 10, fontFace: FONT_B, color: C.MUTED,
            align: "center", valign: "middle", margin: 0,
          });
        }
      });
      s.addText("4 steps", {
        x: rx + 0.2, y: ry + 1.0, w: 3.7, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });

      // Card for starting at 15 (empty — students fill in)
      const c2y = ry + 1.7;
      addCard(s, rx, c2y, 4.1, 1.0, { strip: C.AMBER });
      s.addText("Starting at 15:", {
        x: rx + 0.2, y: c2y + 0.08, w: 3.7, h: 0.3,
        fontSize: 12, fontFace: FONT_H, color: C.AMBER, bold: true, margin: 0,
      });
      s.addText("Your turn \u2014 trace the steps!", {
        x: rx + 0.2, y: c2y + 0.45, w: 3.7, h: 0.4,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
        valign: "top",
      });
    }
  );

  // ── Slide 12 (+ reveal): CFU 2 — Think-Pair-Share (Stage 3) ──────────────
  withReveal(
    () => cfuSlide(
      pres,
      3,
      "Guided Practice — We Do",
      "Hinge Check",
      "Think-Pair-Share",
      "Is 72 a multiple of 9?\nTurn to your partner, discuss, then show me your answer.",
      NOTES_CFU2,
      FOOTER
    ),
    (s) => {
      // Reveal: answer banner
      addTextOnShape(s, "Yes \u2014 72 \u00f7 9 = 8 (whole number), so 72 IS a multiple of 9", {
        x: 0.8, y: 4.4, w: 8.4, h: 0.55, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 13: You Do — Independent Practice (Stage 4) ────────────────────
  contentSlide(
    pres,
    4,
    "Independent Practice — You Do",
    "Independent Practice",
    [
      "First: Choose 3 numbers between 30 and 100.",
      "Next: For each number, use the flowchart to determine if 6 is a factor.",
      "Then: Record results in a table. Describe any pattern you notice.",
      "Challenge: Create your own algorithm to test if a number is a multiple of 7.",
    ],
    NOTES_YODO,
    FOOTER,
    (s) => {
      // Right side: sample table template
      const rx = 5.3;
      const ry = CONTENT_TOP + 0.1;

      addCard(s, rx, ry, 4.2, 2.4, { fill: C.WHITE });

      // Table header
      s.addShape("rect", {
        x: rx, y: ry, w: 4.2, h: 0.4,
        fill: { color: C.CORAL },
      });
      s.addText("Results Table", {
        x: rx, y: ry, w: 4.2, h: 0.4,
        fontSize: 12, fontFace: FONT_H, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // Column headers
      const colHeaders = ["Number", "6 is a factor?", "Division"];
      const colWidths = [1.2, 1.5, 1.5];
      let cx = rx;
      colHeaders.forEach((hdr, i) => {
        s.addShape("rect", {
          x: cx, y: ry + 0.4, w: colWidths[i], h: 0.35,
          fill: { color: C.NAVY },
          line: { color: C.WHITE, width: 1 },
        });
        s.addText(hdr, {
          x: cx, y: ry + 0.4, w: colWidths[i], h: 0.35,
          fontSize: 9, fontFace: FONT_B, color: C.WHITE,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
        cx += colWidths[i];
      });

      // Empty rows
      for (let r = 0; r < 3; r++) {
        let rx2 = rx;
        colHeaders.forEach((_, i) => {
          s.addShape("rect", {
            x: rx2, y: ry + 0.75 + r * 0.4, w: colWidths[i], h: 0.4,
            fill: { color: C.WHITE },
            line: { color: C.NAVY, width: 0.5 },
          });
          rx2 += colWidths[i];
        });
      }

      // Challenge card below table
      const chY = ry + 2.6;
      addTextOnShape(s, "Challenge: Build your own algorithm for multiples of 7!", {
        x: rx, y: chY, w: 4.2, h: 0.42, rectRadius: 0.08,
        fill: { color: C.CORAL },
      }, {
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── Slide 14: Exit Ticket ─────────────────────────────────────────────────
  exitTicketSlide(
    pres,
    [
      "Is 8 a factor of 52? Use the algorithm and explain your reasoning.",
      "List the first 5 multiples of 7.",
      "Start at 48. Apply: if even, halve; if odd, add 1. Record until you reach 3. How many steps?",
    ],
    NOTES_EXIT,
    FOOTER
  );

  // ── Slide 15: Closing ─────────────────────────────────────────────────────
  closingSlide(
    pres,
    "Explain to your partner: what is the difference between a factor and a multiple? Give an example of each.",
    [
      "Factors divide evenly into a number; multiples are the result of multiplying.",
      "An algorithm with branching uses yes/no decisions to solve problems.",
      "Testing divisibility helps us identify factors and multiples.",
    ],
    NOTES_CLOSING
  );

  // ── Write PPTX ─────────────────────────────────────────────────────────────
  const pptxPath = OUT_DIR + "/NP_Lesson1_Factors_Multiples_Algorithms.pptx";
  await pres.writeFile({ fileName: pptxPath });
  console.log("Written: " + pptxPath);
}

build().catch(console.error);
