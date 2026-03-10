// Lesson 1 of 6: Equivalent Number Sentences — Finding Unknowns with × and ÷
// Year 5/6 Mathematics — Algebra: Finding Unknown Values
// VC2M5A02 / VC2M6A02
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
  getContrastColor,
  SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;

const OUT_DIR = "output/ALG_Lesson1_Equivalent_Number_Sentences";
const RES_DIR = OUT_DIR + "/resources-lesson1";
const FOOTER = "Session 1 of 6 | Algebra: Unknown Values | Year 5/6 Maths";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
• "Welcome to our Algebra unit on finding unknown values. Over six sessions we'll learn how to use number properties — equivalence, commutativity, associativity, distributivity, and order of operations — to crack equations."
• "Today we focus on equivalent number sentences. You'll discover that when two expressions equal the same value, you can set them equal and use that to find unknowns."

**DO:**
• Display the title slide as students settle. Mini-whiteboards and markers on every desk.
• Direct attention to the unit title and session number.

**TEACHER NOTES:**
Lesson 1 of a 6-session unit covering VC2M5A02 (find unknowns in equations involving × and ÷ using number properties) and VC2M6A02 (unknowns with brackets and combined operations). Today establishes the foundational concept of equivalence — if two expressions both equal the same value, they are equivalent, and this relationship can be used to find unknown values. This concept underpins every subsequent lesson. Students need fluent multiplication and division facts to access the algebraic reasoning.

**WATCH FOR:**
• Students who seem unsettled — ensure whiteboards are distributed quickly.
• Readiness signal: students attentive with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR = `**SAY:**
• "Let's warm up with some equations. Your job is to find the missing number that makes each equation true."
• "Write your answer on your whiteboard. I'll give you 15 seconds per problem."
• Problem 1: "3 × □ = 21. What goes in the box?" [7]
• Problem 2: "□ × 6 = 42. What's the missing number?" [7]
• Problem 3: "56 ÷ □ = 8. What number is missing?" [7]
• Problem 4: "□ ÷ 5 = 9. What number makes this true?" [45]
• "Notice how each equation has one unknown — and you used your times tables and division facts to find it."

**DO:**
• Display the slide. Read each problem aloud, one at a time.
• Allow 15 seconds per problem. Students write answers on whiteboards.
• After each: "Show me!" — scan boards.
• Briefly correct errors. Emphasise the inverse relationship: "If I know 3 × 7 = 21, then 21 ÷ 3 = 7."

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Write your answer on your board. When I say 'show me,' hold it up high. Ready… show me!"
• Scan for: correct answers on ≥80% of boards for each problem.
PROCEED: If ≥80% correct across most problems, move to Fluency.
PIVOT: If widespread errors on division unknowns (e.g., 56 ÷ □ = 8), pause. Reteach using the inverse: "Think: what times 8 gives 56? 8 × 7 = 56, so the missing number is 7. Multiplication and division undo each other." Re-run: "48 ÷ □ = 6. Show me."

**TEACHER NOTES:**
Daily Review targets the user-specified topic: "Multiplication and Division — I can find pairs of unknown values in numerical equations that make the equation hold true." These problems isolate simple one-step unknowns as a prerequisite for today's multi-step equivalence reasoning. The problems spiral through × and ÷ unknowns in different positions (result unknown, factor unknown, divisor unknown, dividend unknown). This variety ensures students practise all four unknown positions they'll encounter in equivalent number sentences.

**WATCH FOR:**
• Students who solve 3 × □ = 21 by counting up in 3s (3, 6, 9…21) — they know the concept but lack fact fluency. Note for fluency planning.
• Students who confuse □ ÷ 5 = 9 with 5 ÷ □ = 9 — position of the unknown matters.
• Readiness signal: fast, confident responses on ≥3 of 4 problems.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
• "Fluency time! We're doing a multiplication and division relay. I'll say a problem — you write the answer. The answer feeds into the next problem."
• "Start: 6 × 7 = ? Write it. Now take your answer and divide by 3. Now multiply by 5. Now divide by 10. Now multiply by 8."
• After 60 seconds: "Pens down. Let's check the chain: 42, 14, 70, 7, 56. Who got all five?"

**DO:**
• Display the chain on the slide. Students work silently, writing each answer.
• Time 60 seconds. Read each step with 10-second gaps.
• After: read the chain of answers. Students self-check.
• Ask: "Hands up — who got 4 or more correct?"

**TEACHER NOTES:**
Fluency builds automaticity with multiplication and division facts — the prerequisite skill for recognising equivalent number sentences. The chain format (answer feeds forward) keeps pacing high and discourages skipping. The operations alternate between × and ÷ to practise the inverse relationship, which is central to today's lesson on equivalence. The chain: 6×7=42, 42÷3=14, 14×5=70, 70÷10=7, 7×8=56.

**WATCH FOR:**
• Students who freeze when the chain requires division — they may not realise they can use the inverse multiplication fact.
• Students who get one wrong and then all subsequent answers are wrong — reassure: "If you get stuck on one, skip it and try the next with a fresh start."
• Readiness signal: most students completing 4+ steps in 60 seconds.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
• Read from slide: "We are learning to use equivalent number sentences to find unknown values in multiplication and division equations."
• "Let's look at our three success criteria. By the end of the lesson, you should be able to do all three."
• Read each SC aloud. "SC1 is the foundation — everyone will get there. SC2 is our main target. SC3 is for those ready to go deeper."

**DO:**
• Display the slide. Point to the LI as you read it.
• Point to each SC in turn. Pause after SC2: "This is our big goal today."
• Leave visible for 30 seconds so students internalise.

**PACING OVERVIEW:**
Daily Review 5 min, Fluency 3 min, LI/SC + Vocabulary 3 min, I Do 10 min, We Do 12 min, You Do 15 min, Exit Ticket 5 min, Closing 2 min. Adjust based on CFU data.

**TEACHER NOTES:**
The LI translates VC2M5A02 ("find unknown values in numerical equations involving multiplication and division using the properties of numbers and operations") into student-friendly language. SC1 targets the prerequisite (recognising equal value), SC2 is the core skill (building equivalent sentences), SC3 extends to using equivalence to solve for unknowns. The SC are ordered progressively: SC1 → SC2 → SC3. The exit ticket assesses SC1 and SC2 directly, with SC3 as a stretch.

**WATCH FOR:**
• Students who look confused by "equivalent" — the vocabulary slide (next) addresses this.
• Readiness signal: students nodding, whispering the SC to themselves.

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_VOCAB = `**SAY:**
• "Before we dive in, let's lock in three key words we'll use all lesson."
• Point to EQUIVALENT: "Equivalent means equal in value. Two expressions are equivalent when they give the same answer. 3 × 5 and 30 ÷ 2 are equivalent because they both equal 15."
• Point to EQUATION: "An equation is a number sentence with an equals sign. It says: the left side has the same value as the right side. 3 × 5 = 15 is an equation."
• Point to UNKNOWN: "An unknown is a missing value in an equation — the number we need to find. We show it with a box □ or a letter."
• "Turn to your partner: use the word 'equivalent' in a sentence about numbers. You have 15 seconds."

**DO:**
• Display the slide. Point to each term and its example as you explain.
• After all three: "Turn & Talk — use 'equivalent' in a sentence." Allow 15 seconds.
• Cold call one pair to share their sentence.

**TEACHER NOTES:**
Vocabulary front-loading reduces cognitive load during the worked example — students won't process new terminology AND new algebraic reasoning simultaneously. "Equivalent" is the threshold concept for this lesson: if students don't grasp that two different expressions can have the same value, the entire lesson is inaccessible. The Turn & Talk activates student processing and surfaces confusion before instruction. These terms recur across all six lessons in the unit.

**MISCONCEPTIONS:**
• Misconception: "The equals sign means 'the answer is' rather than 'is the same value as'."
  Why: Years of seeing equations like 3 + 5 = 8 (operation on left, answer on right) train students to read = as a signal to compute, not as a statement of balance.
  Impact: Students who hold this view will struggle with equations like 3 × 5 = 30 ÷ □ because the "answer" appears on both sides. They need to see = as a balance point.
  Quick correction: "The equals sign is like a balance scale. Whatever is on the left must weigh the same as what's on the right. Both sides have the same value."

**WATCH FOR:**
• Students who can't produce a sentence with "equivalent" — they may need the definition restated in simpler terms: "It means the same amount."
• Students who say "3 × 5 equals 15" but resist "3 × 5 is equivalent to 30 ÷ 2" — the multi-expression equivalence is new.
• Readiness signal: partners using "equivalent" correctly in their Turn & Talk.

[Maths: Launch — Explicit Instruction | VTLM 2.0: Explicit Explanation]`;

const NOTES_IDO1 = `**SAY:**
• "Watch me build an equivalent number sentence. I'm going to show you that two different calculations can have the same value — and then use that to find an unknown."
• Think-aloud: "I know that 3 × 5 = 15. I also know that 30 ÷ 2 = 15. Both expressions equal 15. That means they are equivalent — I can write 3 × 5 = 30 ÷ 2."
• Decision point: "How did I know these were equivalent? I didn't guess. I calculated both sides separately and got the same answer. That's the test: calculate each side. If they match, the equation is true."
• "Now here's the powerful part. If I know 3 × 5 = 30 ÷ 2, I can replace the 2 with a box: 3 × 5 = 30 ÷ □. The question becomes: what number do I divide 30 by to get 15? Since 30 ÷ 15 gives me 2… wait, let me think more carefully."
• Self-monitoring: "The left side equals 15. So the right side must also equal 15. What divided into 30 gives 15? 30 ÷ □ = 15. I think: □ × 15 = 30. That means □ = 2."
• Deliberate error: "Watch out — I might be tempted to think 30 ÷ 15 = □, giving me 2. That happens to be right here, but the REASONING is: I calculate the known side first (3 × 5 = 15), then use that result to solve the unknown side (30 ÷ □ = 15)."

**DO:**
• Display the slide showing the step-by-step building of equivalence.
• Point to each expression as you calculate it.
• Write "= 15" next to both expressions to make the equivalence visible.
• Circle the equals sign between 3 × 5 and 30 ÷ 2 to emphasise balance.

**TEACHER NOTES:**
This is the core I Do worked example. It demonstrates the three-step process students will use throughout the unit: (1) calculate each expression separately, (2) if both equal the same value, they are equivalent, (3) use the known value to find an unknown. The think-aloud makes three invisible expert moves visible: separate calculation, equivalence recognition, and inverse operation to find the unknown. The deliberate error proactively addresses the most common procedural confusion — students trying to calculate across the equals sign rather than working each side independently. This example comes directly from the VC2M5A02 elaboration.

**MISCONCEPTIONS:**
• Misconception: "To solve 3 × 5 = 30 ÷ □, I do 3 × 5 ÷ 30 to find □."
  Why: Students treat the equation as a single left-to-right computation rather than two balanced sides.
  Impact: They get wrong answers and lose confidence in algebraic reasoning. This misconception persists into secondary algebra if not corrected early.
  Quick correction: "The equals sign splits the equation into two sides. Calculate the left side first: 3 × 5 = 15. Now you know the right side must also equal 15. Solve: 30 ÷ □ = 15."

**WATCH FOR:**
• Students who look lost at "30 ÷ □ = 15" — the inverse step may be unfamiliar. Watch for blank faces.
• Students who nod when you calculate both sides but disengage when you introduce the unknown — the unknown step is the new learning; the equivalence is the scaffold.
• Readiness signal: students watching attentively, some mouthing "15" before you say it.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_IDO2 = `**SAY:**
• "Let me show you another one. This time I'll start with a known fact and build the equivalence from scratch."
• Think-aloud: "I know 4 × 8 = 32. What other expression equals 32? Let me think… 64 ÷ 2 = 32. So 4 × 8 = 64 ÷ 2."
• "Now I can create an unknown: 4 × 8 = □ ÷ 2. The left side is 32. So □ ÷ 2 = 32. What number divided by 2 gives 32? □ = 64."
• Connection: "Notice the strategy is always the same: (1) calculate the side you CAN solve, (2) use that answer to find the unknown on the other side."
• Self-monitoring: "Let me verify: 4 × 8 = 32 ✓. 64 ÷ 2 = 32 ✓. Both sides equal 32. The equation is true."

**DO:**
• Display the slide showing the second worked example.
• Emphasise the two-step strategy by numbering the steps visually: Step 1 — calculate the known side. Step 2 — solve for the unknown.
• Underline the verification at the end: "Always check by substituting back."

**TEACHER NOTES:**
This second I Do example reinforces the same deep structure with different surface features. The unknown is now in the dividend position (□ ÷ 2 = 32) rather than the divisor position (30 ÷ □ = 15 in example 1). This deliberate variation ensures students see both positions before We Do. The verification step models metacognition — checking your answer by substituting it back into the equation. The "build from a known fact" approach shows students that they can CONSTRUCT equivalent sentences, not just recognise them.

**WATCH FOR:**
• Students who struggle with "what number divided by 2 gives 32" — they may need the inverse reframed: "2 × what = 32?"
• Students who are confidently predicting answers — they may be ready for We Do sooner.
• Readiness signal: students nodding at the verification step and some verbalising "both sides are 32."

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
• "Quick check. I need to see if you understand equivalence before we practise together."
• "Here are two expressions: 6 × 4 and 48 ÷ 2. Are they equivalent? Show me thumbs up for YES, thumbs down for NO. Think first — don't just guess."
• After thumbs: "Thumbs UP — yes, they are equivalent. 6 × 4 = 24 and 48 ÷ 2 = 24. Both equal 24."
• Follow-up (Cold Call): "[Student name], how did you check? What did you do first?" [Calculated each side separately and compared]

**DO:**
• Display the question slide. Allow 10 seconds of think time.
• "Thumbs up or down — NOW." Scan the room.
• Click to reveal the answer.
• Cold call one student for the method.

**CFU CHECKPOINT:**
Technique: Thumbs Up / Down
Script:
• "Are 6 × 4 and 48 ÷ 2 equivalent? Think… thumbs up for yes, thumbs down for no. Show me NOW."
• Scan for: thumbs up on ≥80% of students.
PROCEED: If ≥80% show thumbs up, students understand equivalence. Move to We Do.
PIVOT: Most likely misconception: students think "equivalent" means "the same operation" rather than "the same value." They may say NO because one is multiplication and the other is division. Reteach: "Equivalent doesn't mean the same operation — it means the same VALUE. Calculate each one: 6 × 4 = 24, 48 ÷ 2 = 24. Same value = equivalent." Re-check: "Are 5 × 6 and 60 ÷ 2 equivalent? Thumbs."

**TEACHER NOTES:**
This CFU checks SC1 (identifying when two expressions are equal in value). The Thumbs Up/Down format is chosen deliberately — it requires every student to commit to an answer and is interpretable in under 5 seconds. The follow-up Cold Call checks the METHOD, not just the answer, ensuring students are calculating both sides rather than guessing. If students pass, they have the prerequisite understanding for building equivalent sentences in We Do.

**WATCH FOR:**
• Thumbs down — students may not have calculated both sides. Ask: "What's 6 × 4? What's 48 ÷ 2?" If they can answer both, redirect: "Same answer means equivalent."
• Students who hesitate — they may be unsure of 48 ÷ 2. This is a fluency gap, not a conceptual gap.
• Readiness signal: quick, confident thumbs up with no hesitation.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
• "Your turn to help me. We're going to find the unknown in this equation together."
• "Look at the equation: 5 × 6 = □ ÷ 3."
• Cold Call: "[Student name], what's the first step?" [Calculate the side we know: 5 × 6 = 30]
• "Right — the left side equals 30. So the right side must also equal 30."
• Cold Call: "[Student name], so □ ÷ 3 = 30. What number divided by 3 gives 30?" [90]
• "How do you know?" [Because 3 × 30 = 90] "Excellent — you used the inverse."
• "Let's verify: 5 × 6 = 30 ✓. 90 ÷ 3 = 30 ✓. Both sides equal 30. □ = 90."

**DO:**
• Display the question slide with the equation and blank working space.
• Use Cold Call for each step — different students.
• Click to reveal the completed solution.
• Point to the verification step.

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
• Cold call different students for each step. "[Name], what's the first step? [Name], what's the answer?"
• Scan for: correct identification of the strategy (calculate known side first) and correct inverse reasoning.
PROCEED: If students answer correctly and confidently, move to Problem Pair 2.
PIVOT: If students can calculate 5 × 6 = 30 but cannot solve □ ÷ 3 = 30, the gap is in the inverse operation. Reteach: "Think of it as: 3 × ? = 30. What times 3 gives 30? Skip count: 3, 6, 9… 30. That's 10 threes. So □ = 90." Wait — that gives 10, not 90. Let me reconsider. □ ÷ 3 = 30 means □ = 30 × 3 = 90. Reteach: "If □ ÷ 3 = 30, then □ = 30 × 3 = 90. We multiply to undo division." Re-check with a simpler example: "□ ÷ 2 = 5. What's □?" [10]

**TEACHER NOTES:**
Problem Pair 1 — structurally identical to the I Do (find an unknown in a ×/÷ equivalence) with different surface features. The deep structure is preserved: calculate the known side, then use inverse operations to find the unknown on the other side. The shift from I Do to We Do: the teacher asks students to supply each step via Cold Call rather than narrating. The unknown is in the dividend position (□ ÷ 3), which mirrors I Do example 2 for consistency.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide students with partially completed working: "5 × 6 = ___. So □ ÷ 3 = ___. □ = ___ × 3 = ___." Students fill in each blank sequentially. This breaks the multi-step reasoning into single-step fills.
• Extra Notes: Seat enabling students near the front for quick board checks.

EXTENDING PROMPT:
• Task: "Create your OWN equivalent number sentence with an unknown. Write two expressions that both equal the same number, then replace one value with □. Give it to your partner to solve."
• Extra Notes: This extends to constructing equations — a higher-order skill than solving them.

**WATCH FOR:**
• Students who say "30 ÷ 3 = 10" and write □ = 10 — they divided by 3 instead of finding what divided by 3 gives 30. Redirect: "The right side must equal 30. If □ ÷ 3 = 30, what's □?"
• Students who solve correctly but can't explain how — push for articulation: "What strategy did you use?"
• Readiness signal: students answering before being Cold Called.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
• "One more together. This time, work it out on your whiteboards first, then we'll check."
• "The equation is: 7 × 9 = 63 ÷ □. Find the unknown. You have 45 seconds."
• After 45 seconds: "Boards up!"
• "Let's check. Left side: 7 × 9 = 63. Right side: 63 ÷ □ = 63. What divides into 63 to give 63? □ = 1."
• "Who got 1? Did that surprise you? When you divide a number by 1, you get the number itself. That's a number property we'll keep using."
• "Verify: 7 × 9 = 63 ✓. 63 ÷ 1 = 63 ✓."

**DO:**
• Display the question slide. Students work on whiteboards for 45 seconds.
• Circulate quickly — check students are calculating the left side first.
• After time: students hold up boards. Click to reveal the answer.
• Celebrate correct responses. Address the ÷1 insight.

**CFU CHECKPOINT:**
Technique: Show Me Boards (open response)
Script:
• "Write the value of □ on your board. 7 × 9 = 63 ÷ □. 45 seconds. Go!"
• Scan for: □ = 1 on ≥80% of boards.
PROCEED: If ≥80% correct, students are ready for the hinge question gate check before You Do.
PIVOT: Most likely misconception: students write □ = 9 because they see 63 ÷ 9 = 7 and confuse which side is which. Reteach: "Stop. Which side has the unknown? The RIGHT side. The left side equals 63, so the right side must also equal 63. 63 ÷ □ = 63. What number do you divide by to get the same number back? Try: 63 ÷ 1 = 63." Re-check: "8 × 5 = 40 ÷ □. Show me."

**TEACHER NOTES:**
Problem Pair 2 with increased autonomy. Students work on boards independently for 45 seconds before checking. This equation is deliberately chosen because the answer (□ = 1) is surprising — students expect larger numbers. This creates a productive discussion moment about the identity property of division (n ÷ 1 = n). The surprise factor also reinforces that students must CALCULATE rather than guess. The shift from PP1 (Cold Call step-by-step) to PP2 (independent board work) mirrors the fading within We Do.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Students who struggled with PP1 should work with simpler numbers: "4 × 3 = □ ÷ 2. First: 4 × 3 = ___. So □ ÷ 2 = ___. □ = ___ × 2 = ___." Pre-fill the first step.

EXTENDING PROMPT:
• Task: "Write three different equations where the unknown equals 1. Can you find a pattern? When does dividing give you 1?"
• Extra Notes: This pushes toward the generalisation: n ÷ n = 1, connecting to the identity property.

**WATCH FOR:**
• Students who write □ = 9 — they're computing 63 ÷ 7 instead of recognising both sides must equal 63.
• Students who freeze because "1 seems too simple" — reassure: "Trust the maths. If both sides equal 63, the answer is 1."
• Readiness signal: students finishing in under 30 seconds with the correct answer.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
• "Last check before independent work. Look at the four equations on screen. Only ONE is true. Hold up 1, 2, 3, or 4 fingers to show which equation is true. You have 15 seconds."
• After finger vote: "The answer is C: 4 × 9 = 72 ÷ 2. Let's check: 4 × 9 = 36, and 72 ÷ 2 = 36. Both sides equal 36."
• "Why are the others wrong? A: 3 × 8 = 24, but 36 ÷ 2 = 18. Not equal. B: 5 × 7 = 35, but 45 ÷ 3 = 15. Not equal. D: 6 × 6 = 36, but 54 ÷ 3 = 18. Not equal."

**DO:**
• Display the four options. Allow 15 seconds.
• "Show me fingers — 1, 2, 3, or 4." Scan room quickly.
• Click to reveal the answer and explanations.

**CFU CHECKPOINT:**
Technique: Finger Voting
Script:
• "Which equation is TRUE? Hold up 1, 2, 3, or 4 fingers. Think… show me NOW."
• Scan for: option C on ≥80% of students.
PROCEED: If ≥80% choose C, students understand equivalence checking. Move to You Do.
PIVOT: Most likely misconception: students chose D (6 × 6 = 54 ÷ 3) because they see 36 and 54 and think "close enough" or miscalculate 54 ÷ 3. Reteach: "Both sides must be EXACTLY equal. 6 × 6 = 36, but 54 ÷ 3 = 18. 36 ≠ 18. Always calculate both sides separately and compare." Re-check: "Is 8 × 3 = 48 ÷ 2 true? Thumbs up or down."

**TEACHER NOTES:**
This hinge question is the gate between We Do and You Do. It tests whether students can independently verify equivalence — the core skill needed for independent practice. Each distractor maps to a specific misconception: A tests whether students calculate both sides (not just one); B has attractively similar-looking numbers that are not equivalent; D has both sides producing multiples of 6 but different values. The finger voting format allows rapid whole-class scanning. If ≥80% get this right, they have demonstrated SC1 and are ready for SC2/SC3 work in You Do.

**WATCH FOR:**
• Students who hold up fingers quickly without calculating — they may be guessing or following the crowd. Wait for ALL hands before scanning.
• Students who hold up fingers for B (5×7=45÷3) — they may have miscalculated 45÷3 as 35. Check their division.
• Readiness signal: confident, quick finger responses with option C.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
• "You're ready. Time to find unknowns independently."
• Read from slide: "First: Calculate the side of the equation that has no unknown. Next: Set the other side equal to your answer. Then: Use inverse operations to find the unknown."
• "Work through all six problems on your worksheet. Show your working for each one — I need to see the steps, not just the answer."
• "If you finish early, check the extending challenge on the back."

**DO:**
• Distribute the SR1 worksheet (6 problems). Display the slide with the three-step strategy.
• Circulate. Start with the back-left table group.
• Check: are students calculating the known side FIRST? This is the most common error in independent work.
• After 12 minutes: "Two-minute warning."

**TEACHER NOTES:**
Independent practice targets SC2 (building equivalent number sentences) and SC3 (finding unknowns). The worksheet provides 6 problems of graduated difficulty: problems 1-2 mirror We Do structure exactly, problems 3-4 increase number size, problems 5-6 require students to identify which side to calculate first when the unknown is on the left. The "First, Next, Then" instructions on the slide serve as a procedural scaffold — students can glance up at the strategy whenever they get stuck. The extending challenge on the worksheet back asks students to construct their own equations, targeting SC3 depth.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide the SR2 scaffold worksheet with the first step pre-completed for each problem (the known side already calculated). Students complete steps 2 and 3 only. This isolates the inverse-operation reasoning without the cognitive load of calculating the known side.
• Extra Notes: Distribute to identified students during circulation. Do not announce it publicly.

EXTENDING PROMPT:
• Task: Students who finish the main 6 problems attempt the extending investigation on the worksheet reverse: "Create 3 equations where both sides use different operations (one side ×, the other ÷). Make one where the unknown equals 1, one where it equals the same as one of the original numbers, and one where it's a large number. Explain the pattern."
• Extra Notes: The EXT1 investigation PDF provides scaffolding for this task.

**WATCH FOR:**
• Students who calculate the unknown side first and get confused — redirect: "Which side can you solve completely? Start there."
• Students who find the answer but don't verify — prompt: "Substitute your answer back in. Do both sides match?"
• Students skipping working and writing answers only — remind: "I need to see your steps. The working IS the learning."
• Readiness signal: students completing problem 4+ with correct working shown.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
• "Pens down on the worksheet. Time for your exit ticket — this tells me how well you've understood today's learning."
• "Two questions. Work silently and independently. Show your working."
• "You have 3 minutes."

**DO:**
• Display the exit ticket slide. Students work in their workbooks (or on the printed exit ticket if distributed).
• Circulate silently — do not help. This is assessment.
• Collect workbooks / exit tickets after 3 minutes.
• Note: sort into three piles after the lesson — SC1 only, SC1+SC2, SC1+SC2+SC3 — to inform tomorrow's planning.

**TEACHER NOTES:**
The exit ticket assesses SC1 and SC2 directly. Question 1 tests equivalence identification (SC1): students must determine if two given expressions are equivalent. Question 2 tests finding an unknown (SC2): students must calculate a missing value in an equivalent number sentence. The data from this ticket directly informs tomorrow's lesson — students who cannot pass Q1 need reteaching on equivalence before new content; students who pass both are ready for the commutative/associative properties in Lesson 2.

**WATCH FOR:**
• Students who leave Q2 blank — they may need the enabling scaffold tomorrow.
• Students who answer Q2 correctly without showing working — they may have mental strategies worth sharing.
• Readiness signal: most students completing both questions within 2 minutes.

[Maths: Summarise — Exit Ticket | VTLM 2.0: Monitor Progress]`;

const NOTES_RESOURCES = `**SAY:**
• "These are the printable resources for this lesson. I've printed them for you already."

**DO:**
• This slide is for teacher reference. Click the links to open each PDF before the lesson.
• Print SR1 (class set), SR2 (enabling students only), EXT1 (extending students only).

**TEACHER NOTES:**
Three companion resources support differentiation in this lesson. SR1 is the main independent practice worksheet with 6 graduated problems. SR2 is the enabling scaffold with pre-completed first steps. EXT1 is the extending investigation that teaches students to construct their own equations. All PDFs are in the same folder as this PPTX. Print before the lesson.

**WATCH FOR:**
• Ensure SR2 copies are discreetly available — do not announce who gets them.

[Maths: Planning — Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
• "Let's look back at our success criteria from the start of the lesson."
• Read from slide: "SC1: I can identify when two number sentences are equal in value."
• "Give me a thumbs up if you can do this confidently, sideways if you're nearly there, down if you need more practice."
• Read: "SC2: I can use known number facts to build equivalent number sentences."
• "Thumbs for SC2."
• Read: "SC3: I can find an unknown value by matching equivalent expressions."
• "Thumbs for SC3."
• "Even if you're still working on SC2 or SC3, you've built the foundation today. Tomorrow we'll explore HOW the order of multiplication doesn't matter — and why that helps us solve harder equations."

**DO:**
• Display the closing slide with all three SC visible.
• Run the thumbs assessment for each SC — pause between each to scan.
• Note the class-level response: if most are sideways/down on SC2, consider revisiting equivalence in tomorrow's Daily Review.

**TEACHER NOTES:**
The closing slide brings the SC full circle — introduced on the LI slide, worked toward throughout the lesson, and now self-assessed by students. The thumbs routine provides rapid formative data: if most students show thumbs-up on SC1 but sideways on SC2, the lesson achieved its foundation goal but the core target needs reinforcement. Use this data alongside the exit ticket to plan tomorrow's Daily Review and determine whether any students need pre-teaching before Lesson 2. The forward look to tomorrow (commutative property) creates anticipation and connects lessons within the unit.

**WATCH FOR:**
• Students who show thumbs-down on SC1 — they may not have grasped equivalence at all. Flag for individual conference.
• Discrepancy between thumbs self-assessment and exit ticket results — some students over-estimate their understanding. Trust the exit ticket data.
• Readiness signal: majority thumbs-up on SC1 and SC2.

[Maths: Monitor Progress & Feedback | VTLM 2.0: Monitor Progress]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build function
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  // ── Slide 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres,
    "Equivalent Number Sentences",
    "Finding Unknown Values with Multiplication and Division",
    "Session 1 of 6  |  Year 5/6  |  Algebra",
    NOTES_TITLE
  );

  // ── Slide 2: Daily Review (Stage 1) ─────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["1"]);
    addStageBadge(s, 1, "Daily Review");
    addTitle(s, "Find the Missing Number", { y: 0.65, fontSize: 22, color: STAGE_COLORS["1"] });

    const problems = [
      "3 × □ = 21",
      "□ × 6 = 42",
      "56 ÷ □ = 8",
      "□ ÷ 5 = 9",
    ];

    // Two-column layout
    problems.forEach((p, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const cx = 0.5 + col * 4.75;
      const cy = CONTENT_TOP + row * 1.6;
      addCard(s, cx, cy, 4.4, 1.3, { strip: STAGE_COLORS["1"] });
      s.addText((i + 1) + ".  " + p, {
        x: cx + 0.25, y: cy + 0.15, w: 3.9, h: 1.0,
        fontSize: 24, fontFace: FONT_H, color: C.CHARCOAL,
        margin: 0, valign: "middle",
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_DR);
  }

  // ── Slide 3: Fluency (Stage 1) ─────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["1"]);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Multiplication & Division Chain", { y: 0.65, fontSize: 22, color: STAGE_COLORS["1"] });

    const chain = [
      { op: "Start:", val: "6 × 7 = ?" },
      { op: "÷ 3", val: "= ?" },
      { op: "× 5", val: "= ?" },
      { op: "÷ 10", val: "= ?" },
      { op: "× 8", val: "= ?" },
    ];

    // Chain displayed as connected boxes
    chain.forEach((item, i) => {
      const cx = 0.5 + i * 1.85;
      const cy = CONTENT_TOP + 0.5;

      addTextOnShape(s, item.op, {
        x: cx, y: cy, w: 1.6, h: 0.5, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["1"] },
      }, {
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      addTextOnShape(s, item.val, {
        x: cx, y: cy + 0.65, w: 1.6, h: 0.7, rectRadius: 0.08,
        fill: { color: C.BG_CARD },
        line: { color: STAGE_COLORS["1"], width: 1.5 },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.CHARCOAL, bold: true,
      });

      // Arrow between boxes
      if (i < chain.length - 1) {
        s.addShape("line", {
          x: cx + 1.65, y: cy + 1.0, w: 0.15, h: 0,
          line: { color: C.MUTED, width: 2 },
        });
      }
    });

    // Timer instruction
    addTextOnShape(s, "60 seconds — GO!", {
      x: 3.0, y: CONTENT_TOP + 2.5, w: 4.0, h: 0.5, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, {
      fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_FLUENCY);
  }

  // ── Slide 4: LI / SC ───────────────────────────────────────────────────
  liSlide(pres,
    ["We are learning to use equivalent number sentences to find unknown values in multiplication and division equations"],
    [
      "I can identify when two number sentences are equal in value",
      "I can use known number facts to build equivalent number sentences",
      "I can find an unknown value by matching equivalent expressions",
    ],
    NOTES_LISC,
    FOOTER
  );

  // ── Slide 5: Vocabulary ────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, C.PRIMARY);
    addBadge(s, "Key Vocabulary", C.PRIMARY);
    addTitle(s, "Words We Need Today", { y: 0.65, fontSize: 22, color: C.PRIMARY });

    const vocab = [
      { term: "Equivalent", def: "Equal in value", example: "3 × 5 and 30 ÷ 2 are equivalent (both = 15)" },
      { term: "Equation", def: "A number sentence with =", example: "3 × 5 = 30 ÷ 2" },
      { term: "Unknown", def: "The missing value to find", example: "3 × 5 = 30 ÷ □" },
    ];

    vocab.forEach((v, i) => {
      const cy = CONTENT_TOP + i * 1.15;
      addCard(s, 0.5, cy, 9, 1.0, { strip: C.SECONDARY });

      s.addText(v.term, {
        x: 0.75, y: cy + 0.08, w: 2.2, h: 0.4,
        fontSize: 18, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
      });
      s.addText(v.def, {
        x: 0.75, y: cy + 0.48, w: 2.2, h: 0.4,
        fontSize: 12, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });
      s.addText(v.example, {
        x: 3.2, y: cy + 0.1, w: 6.0, h: 0.8,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_VOCAB);
  }

  // ── Slide 6: I Do — Worked Example 1 ───────────────────────────────────
  workedExSlide(pres, 2, "Explicit Instruction", "Building Equivalent Number Sentences",
    [
      "Step 1: Calculate each expression separately",
      "3 × 5 = 15",
      "30 ÷ 2 = 15",
      "Step 2: Both equal 15 — they are equivalent!",
      "So: 3 × 5 = 30 ÷ 2",
      "Step 3: Replace 2 with □",
      "3 × 5 = 30 ÷ □",
      "Left side = 15, so 30 ÷ □ = 15",
      "□ × 15 = 30 → □ = 2 ✓",
    ],
    NOTES_IDO1,
    FOOTER,
    (s) => {
      // Visual: balance scale showing equivalence
      addTextOnShape(s, "= 15", {
        x: 5.5, y: CONTENT_TOP + 0.2, w: 1.5, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(s, "= 15", {
        x: 7.3, y: CONTENT_TOP + 0.2, w: 1.5, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Labels
      s.addText("3 × 5", {
        x: 5.5, y: CONTENT_TOP + 0.8, w: 1.5, h: 0.4,
        fontSize: 14, fontFace: FONT_H, color: C.CHARCOAL, align: "center", margin: 0,
      });
      s.addText("30 ÷ 2", {
        x: 7.3, y: CONTENT_TOP + 0.8, w: 1.5, h: 0.4,
        fontSize: 14, fontFace: FONT_H, color: C.CHARCOAL, align: "center", margin: 0,
      });

      // Big equation
      addTextOnShape(s, "3 × 5 = 30 ÷ □", {
        x: 5.3, y: CONTENT_TOP + 1.6, w: 3.8, h: 0.7, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      }, { fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Answer
      addTextOnShape(s, "□ = 2", {
        x: 6.3, y: CONTENT_TOP + 2.6, w: 1.8, h: 0.6, rectRadius: 0.08,
        fill: { color: C.ACCENT },
      }, { fontSize: 24, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── Slide 7: I Do — Worked Example 2 ───────────────────────────────────
  workedExSlide(pres, 2, "Explicit Instruction", "Building Equivalence from a Known Fact",
    [
      "Start with a known fact: 4 × 8 = 32",
      "Find another expression that equals 32:",
      "64 ÷ 2 = 32 ✓",
      "So: 4 × 8 = 64 ÷ 2",
      "Create the unknown: 4 × 8 = □ ÷ 2",
      "Left side = 32, so □ ÷ 2 = 32",
      "□ = 32 × 2 = 64",
      "Verify: 4 × 8 = 32 ✓   64 ÷ 2 = 32 ✓",
    ],
    NOTES_IDO2,
    FOOTER,
    (s) => {
      // Strategy reminder box
      addTextOnShape(s, "Strategy", {
        x: 5.3, y: CONTENT_TOP + 0.2, w: 3.8, h: 0.4, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

      const steps = [
        "1. Calculate the known side",
        "2. Solve for the unknown",
        "3. Verify both sides match",
      ];
      addCard(s, 5.3, CONTENT_TOP + 0.75, 3.8, 2.0, { strip: C.SECONDARY });
      s.addText(steps.map((st, i) => ({
        text: st,
        options: { bullet: false, breakLine: i < steps.length - 1, fontSize: 13, color: C.CHARCOAL },
      })), {
        x: 5.55, y: CONTENT_TOP + 0.85, w: 3.3, h: 1.8,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Answer highlight
      addTextOnShape(s, "□ = 64", {
        x: 6.3, y: CONTENT_TOP + 3.0, w: 1.8, h: 0.6, rectRadius: 0.08,
        fill: { color: C.ACCENT },
      }, { fontSize: 24, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── Slide 8-9: CFU Check (Thumbs) — with reveal ────────────────────────
  withReveal(
    () => cfuSlide(pres, "Stage 2", "Quick Check: Equivalence",
      "Thumbs Up / Down",
      "Are these two expressions equivalent?\n\n6 × 4     and     48 ÷ 2\n\nThink… then show thumbs.",
      NOTES_CFU1, FOOTER),
    (s) => {
      addTextOnShape(s, "YES — Both equal 24!", {
        x: 2.5, y: 4.0, w: 5.0, h: 0.7, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true });

      s.addText("6 × 4 = 24     48 ÷ 2 = 24     Same value = Equivalent", {
        x: 1.5, y: 4.75, w: 7.0, h: 0.3,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, align: "center", margin: 0,
      });
    }
  );

  // ── Slide 10-11: We Do Problem 1 — with reveal ─────────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]);
      addStageBadge(s, 3, "Guided Practice");
      addTitle(s, "We Do: Find the Unknown", { y: 0.65, fontSize: 22, color: STAGE_COLORS["3"] });

      addTextOnShape(s, "5 × 6 = □ ÷ 3", {
        x: 1.5, y: CONTENT_TOP + 0.3, w: 7.0, h: 0.8, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["3"] },
      }, { fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Prompts
      addCard(s, 0.5, CONTENT_TOP + 1.5, 9, 2.5, { strip: STAGE_COLORS["3"] });
      s.addText([
        { text: "Step 1: Calculate the known side: 5 × 6 = ___", options: { breakLine: true, fontSize: 16, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 10 } },
        { text: "Step 2: So □ ÷ 3 = ___", options: { breakLine: true, fontSize: 16, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 10 } },
        { text: "Step 3: □ = ___ × 3 = ___", options: { breakLine: true, fontSize: 16, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.6, w: 8.5, h: 2.3,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (s) => {
      // Reveal: completed solution
      addTextOnShape(s, "5 × 6 = 30     □ ÷ 3 = 30     □ = 90", {
        x: 1.0, y: 4.2, w: 8.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── Slide 12-13: We Do Problem 2 — with reveal ─────────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]);
      addStageBadge(s, 3, "Guided Practice");
      addTitle(s, "We Do: Your Turn on Boards", { y: 0.65, fontSize: 22, color: STAGE_COLORS["3"] });

      addTextOnShape(s, "7 × 9 = 63 ÷ □", {
        x: 1.5, y: CONTENT_TOP + 0.3, w: 7.0, h: 0.8, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["3"] },
      }, { fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Timer
      addTextOnShape(s, "45 seconds — work on your whiteboard!", {
        x: 2.0, y: CONTENT_TOP + 1.5, w: 6.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Strategy reminder
      addCard(s, 0.5, CONTENT_TOP + 2.4, 9, 1.5, { strip: STAGE_COLORS["3"] });
      s.addText([
        { text: "Remember the strategy:", options: { breakLine: true, fontSize: 14, color: C.MUTED, bold: true } },
        { text: "1. Calculate the known side   2. Solve for □   3. Verify", options: { fontSize: 14, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: CONTENT_TOP + 2.6, w: 8.5, h: 1.1,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO2);
      return s;
    },
    (s) => {
      addTextOnShape(s, "7 × 9 = 63     63 ÷ □ = 63     □ = 1", {
        x: 1.0, y: 4.2, w: 8.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── Slide 14-15: Hinge Question — with reveal ──────────────────────────
  withReveal(
    () => cfuSlide(pres, "Gate Check", "Which Equation Is TRUE?",
      "Finger Voting",
      "A)  3 × 8 = 36 ÷ 2\nB)  5 × 7 = 45 ÷ 3\nC)  4 × 9 = 72 ÷ 2\nD)  6 × 6 = 54 ÷ 3\n\nHold up 1, 2, 3, or 4 fingers.",
      NOTES_HINGE, FOOTER),
    (s) => {
      addTextOnShape(s, "C)  4 × 9 = 72 ÷ 2   (both = 36)", {
        x: 1.5, y: 4.0, w: 7.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });

      s.addText("A: 24 ≠ 18    B: 35 ≠ 15    D: 36 ≠ 18", {
        x: 1.5, y: 4.7, w: 7.0, h: 0.3,
        fontSize: 12, fontFace: FONT_B, color: C.MUTED, align: "center", margin: 0,
      });
    }
  );

  // ── Slide 16: You Do (Stage 4) ─────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["4"]);
    addStageBadge(s, 4, "Independent Practice");
    addTitle(s, "You Do: Find the Unknown", { y: 0.65, fontSize: 22, color: STAGE_COLORS["4"] });

    // First, Next, Then instructions
    addCard(s, 0.5, CONTENT_TOP, 9, 1.3, { strip: STAGE_COLORS["4"] });
    s.addText([
      { text: "First: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Calculate the side with no unknown.", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "Next: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Set the other side equal to your answer.", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "Then: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Use inverse operations to find □. Verify by substituting back.", options: { fontSize: 14, color: C.CHARCOAL } },
    ], {
      x: 0.75, y: CONTENT_TOP + 0.1, w: 8.5, h: 1.1,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Sample problems on slide
    const probs = [
      "1.  4 × 7 = □ ÷ 3",
      "2.  □ × 5 = 8 × 10",
      "3.  9 × 6 = 108 ÷ □",
    ];

    probs.forEach((p, i) => {
      const cy = CONTENT_TOP + 1.5 + i * 0.7;
      s.addText(p, {
        x: 0.75, y: cy, w: 8.5, h: 0.55,
        fontSize: 18, fontFace: FONT_H, color: C.CHARCOAL, margin: 0, valign: "middle",
      });
    });

    s.addText("Complete all 6 problems on your worksheet (SR1).", {
      x: 0.75, y: CONTENT_TOP + 3.7, w: 8.5, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_YOUDO);
  }

  // ── Slide 17: Exit Ticket (Stage 5) ────────────────────────────────────
  exitTicketSlide(pres,
    [
      "Are 8 × 3 and 48 ÷ 2 equivalent? Show your working to prove it.",
      "Find the unknown:  6 × 7 = □ ÷ 5.  Show all steps.",
    ],
    NOTES_EXIT,
    FOOTER
  );

  // ── Slide 18: Resources ────────────────────────────────────────────────
  addResourceSlide(pres,
    [
      { name: "SR1 — Practice Worksheet", fileName: "resources-lesson1/SR1_Equivalent_Equations_Worksheet.pdf", description: "6 graduated problems for independent practice." },
      { name: "SR2 — Enabling Scaffold", fileName: "resources-lesson1/SR2_Enabling_Scaffold.pdf", description: "Pre-completed first steps for students needing support." },
      { name: "EXT1 — Equation Builder Investigation", fileName: "resources-lesson1/EXT1_Equation_Builder_Investigation.pdf", description: "Extending: construct your own equivalent equations." },
    ],
    { C, FONT_H, FONT_B },
    FOOTER,
    NOTES_RESOURCES
  );

  // ── Slide 19: Closing ──────────────────────────────────────────────────
  closingSlide(pres,
    "Turn & Talk: What strategy do you use to find an unknown in an equivalent number sentence?",
    [
      "SC1: I can identify when two number sentences are equal in value",
      "SC2: I can use known number facts to build equivalent number sentences",
      "SC3: I can find an unknown value by matching equivalent expressions",
    ],
    NOTES_CLOSING
  );

  // ── Write PPTX ─────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: OUT_DIR + "/ALG_Lesson1_Equivalent_Number_Sentences.pptx" });
  console.log("PPTX written.");

  // ── Generate companion PDFs ─────────────────────────────────────────────
  await generateSR1();
  await generateSR2();
  await generateEXT1();
  console.log("All PDFs written.");
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF Resources
// ─────────────────────────────────────────────────────────────────────────────

async function generateSR1() {
  const doc = createPdf({ title: "SR1 — Equivalent Equations Worksheet" });

  let y = addPdfHeader(doc, "Equivalent Equations — Practice", {
    subtitle: "SR1 — Independent Practice",
    color: C.PRIMARY,
    lessonInfo: "Session 1 of 6 | Algebra: Unknown Values | Year 5/6 Maths",
  });

  y = addTipBox(doc, "Strategy: (1) Calculate the side with no unknown. (2) Set the other side equal to your answer. (3) Use inverse operations to find □. (4) Verify by substituting back.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Section A: Find the Unknown", y, { color: C.PRIMARY });

  const problems = [
    { prompt: "4 × 7 = □ ÷ 3", lines: [{ label: "Known side:" }, { label: "□ =" }] },
    { prompt: "□ × 5 = 8 × 10", lines: [{ label: "Known side:" }, { label: "□ =" }] },
    { prompt: "9 × 6 = 108 ÷ □", lines: [{ label: "Known side:" }, { label: "□ =" }] },
    { prompt: "12 × 4 = □ ÷ 6", lines: [{ label: "Known side:" }, { label: "□ =" }] },
    { prompt: "□ × 3 = 7 × 9", lines: [{ label: "Known side:" }, { label: "□ =" }] },
    { prompt: "11 × 8 = 176 ÷ □", lines: [{ label: "Known side:" }, { label: "□ =" }] },
  ];

  problems.forEach((p, i) => {
    y = addProblem(doc, i + 1, p.prompt, y, {
      writeLines: p.lines,
      color: C.PRIMARY,
    });
  });

  addPdfFooter(doc, "Session 1 of 6 | Algebra: Unknown Values | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/SR1_Equivalent_Equations_Worksheet.pdf");
}

async function generateSR2() {
  const doc = createPdf({ title: "SR2 — Enabling Scaffold" });

  let y = addPdfHeader(doc, "Equivalent Equations — Scaffold", {
    subtitle: "SR2 — Enabling Support",
    color: C.SECONDARY,
    lessonInfo: "Session 1 of 6 | Algebra: Unknown Values | Year 5/6 Maths",
  });

  y = addTipBox(doc, "The first step is done for you! Complete steps 2 and 3 for each problem.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Find the Unknown (with scaffolding)", y, { color: C.SECONDARY });

  const scaffolded = [
    { prompt: "4 × 7 = □ ÷ 3", lines: [{ label: "Known side:", answer: "4 × 7 = 28" }, { label: "So □ ÷ 3 =" }, { label: "□ = ___ × 3 =" }] },
    { prompt: "□ × 5 = 8 × 10", lines: [{ label: "Known side:", answer: "8 × 10 = 80" }, { label: "So □ × 5 =" }, { label: "□ = ___ ÷ 5 =" }] },
    { prompt: "9 × 6 = 108 ÷ □", lines: [{ label: "Known side:", answer: "9 × 6 = 54" }, { label: "So 108 ÷ □ =" }, { label: "□ = 108 ÷ ___ =" }] },
    { prompt: "12 × 4 = □ ÷ 6", lines: [{ label: "Known side:", answer: "12 × 4 = 48" }, { label: "So □ ÷ 6 =" }, { label: "□ = ___ × 6 =" }] },
  ];

  scaffolded.forEach((p, i) => {
    y = addProblem(doc, i + 1, p.prompt, y, {
      writeLines: p.lines,
      color: C.SECONDARY,
    });
  });

  addPdfFooter(doc, "Session 1 of 6 | Algebra: Unknown Values | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/SR2_Enabling_Scaffold.pdf");
}

async function generateEXT1() {
  const doc = createPdf({ title: "EXT1 — Equation Builder Investigation" });

  let y = addPdfHeader(doc, "Equation Builder Investigation", {
    subtitle: "EXT1 — Extending Challenge",
    color: C.ACCENT,
    lessonInfo: "Session 1 of 6 | Algebra: Unknown Values | Year 5/6 Maths",
  });

  y = addSectionHeading(doc, "What Are Equivalent Equations?", y, { color: C.ACCENT });

  y = addBodyText(doc, "Two number sentences are equivalent when they both have the same value. For example:", y);

  y = addBodyText(doc, "3 × 5 = 15   and   30 ÷ 2 = 15   →   So 3 × 5 = 30 ÷ 2", y, { italic: true });

  y = addBodyText(doc, "You can use this idea to CREATE equations with unknowns. Replace any number with □ and challenge someone to find it!", y);

  y = addSectionHeading(doc, "Worked Examples", y, { color: C.ACCENT });

  y = addBodyText(doc, 'Example 1: Start with 4 × 8 = 32. Find another expression equal to 32: 64 ÷ 2 = 32. So 4 × 8 = 64 ÷ 2. Replace 64 with □: 4 × 8 = □ ÷ 2. Answer: □ = 64.', y);

  y = addBodyText(doc, 'Example 2: Start with 7 × 3 = 21. Find another: 42 ÷ 2 = 21. So 7 × 3 = 42 ÷ □. Replace 2: Answer: □ = 2.', y);

  y = addSectionHeading(doc, "Your Investigation", y, { color: C.ACCENT });

  y = addBodyText(doc, "Create 3 equivalent equations with unknowns. Follow these rules:", y);

  y = addStepInstructions(doc, [
    "Start with a multiplication fact you know well.",
    "Find a DIFFERENT expression (using ÷) that equals the same value.",
    "Write the equation, replacing one number with □.",
  ], y, { color: C.ACCENT });

  y = addSectionHeading(doc, "Equation 1", y, { color: C.ACCENT });
  y = addWriteLine(doc, "Start fact:", y);
  y = addWriteLine(doc, "Equivalent expression:", y);
  y = addWriteLine(doc, "Equation with □:", y);
  y = addWriteLine(doc, "Answer: □ =", y);

  y = addSectionHeading(doc, "Equation 2", y, { color: C.ACCENT });
  y = addWriteLine(doc, "Start fact:", y);
  y = addWriteLine(doc, "Equivalent expression:", y);
  y = addWriteLine(doc, "Equation with □:", y);
  y = addWriteLine(doc, "Answer: □ =", y);

  y = addSectionHeading(doc, "Equation 3", y, { color: C.ACCENT });
  y = addWriteLine(doc, "Start fact:", y);
  y = addWriteLine(doc, "Equivalent expression:", y);
  y = addWriteLine(doc, "Equation with □:", y);
  y = addWriteLine(doc, "Answer: □ =", y);

  y = addTipBox(doc, "Challenge: Can you make an equation where □ = 1? What pattern do you notice?", y, { color: C.ACCENT });

  addPdfFooter(doc, "Session 1 of 6 | Algebra: Unknown Values | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/EXT1_Equation_Builder_Investigation.pdf");
}

// ── Run ───────────────────────────────────────────────────────────────────────
build().catch(err => { console.error(err); process.exit(1); });
