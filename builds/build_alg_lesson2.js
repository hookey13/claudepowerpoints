// Lesson 2 of 6: Commutative & Associative Properties of Multiplication
// Year 5/6 Mathematics — Algebra: Finding Unknown Values
// VC2M5A02 — using arrays, commutative/associative properties, division is not commutative
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

const OUT_DIR = "output/ALG_Lesson2_Commutative_Associative";
const RES_DIR = OUT_DIR + "/resources-lesson2";
const FOOTER = "Session 2 of 6 | Algebra: Unknown Values | Year 5/6 Maths";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
• "Yesterday we learned about equivalent number sentences. Today we take it further — we'll discover WHY certain equations are equivalent, using two powerful properties of multiplication."
• "By the end of the session you'll be able to rearrange and regroup factors to create equivalent expressions — and explain why division doesn't work the same way."

**DO:**
• Display the title slide. Ensure whiteboards and markers are ready.
• Direct attention to "Session 2 of 6."

**TEACHER NOTES:**
Lesson 2 builds directly on Lesson 1's equivalence concept. Students now learn the REASON behind equivalence — the commutative and associative properties of multiplication. This shifts from recognising equivalence to EXPLAINING it using properties. The lesson also introduces an important boundary: division is NOT commutative, so not all rearrangements preserve equality. This distinction prevents students from overgeneralising. VC2M5A02 elaboration 3 is the primary curriculum reference.

**WATCH FOR:**
• Students who struggled with Lesson 1's exit ticket — they may need pre-teaching during Daily Review.
• Readiness signal: students settled with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR = `**SAY:**
• "Today's warm-up is about algorithms. An algorithm is a step-by-step set of instructions — like a recipe. Some algorithms have branches, where you make a decision, and repetition, where you loop back."
• "Look at this flowchart. Start with the number 24. Follow the steps."
• Read the flowchart steps aloud: "Is the number even? If YES, divide by 2. Is the result still even? If YES, divide by 2 again. Keep going until the number is odd. Write down your final answer."
• "Work through it on your whiteboard. You have 30 seconds."
• After boards: "24 → 12 → 6 → 3. The answer is 3. You divided by 2 three times — that's the repetition part."

**DO:**
• Display the flowchart slide. Walk through the first step verbally.
• Allow 30 seconds for students to work through the algorithm.
• "Show me your final answer!" Scan boards.
• Repeat with 36: "Now try 36. Follow the same algorithm." [36 → 18 → 9]

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Follow the algorithm with 36. Write your final odd number. Show me!"
• Scan for: answer of 9 on ≥80% of boards.
PROCEED: If ≥80% correct, students understand branching and iteration. Move to Fluency.
PIVOT: If errors, the gap is likely in the branching decision ("Is it even?"). Reteach: "Even numbers end in 0, 2, 4, 6, or 8. If it's even, divide by 2. If it's odd, stop." Re-check with 40: [40 → 20 → 10 → 5].

**TEACHER NOTES:**
Daily Review targets the user-specified topic: "Number Properties and Algorithms — I can follow an algorithm that involves branching and repetition (iteration)." The halving-until-odd algorithm is a clean example of both branching (the even/odd decision) and iteration (repeating the division). This connects to the prior NP unit on algorithms and previews today's lesson on number properties — dividing repeatedly by 2 is related to factor decomposition, which feeds into the associative property.

**WATCH FOR:**
• Students who divide only once (24 → 12) and stop — they missed the iteration (loop back).
• Students who try to divide odd numbers by 2 and get decimals — they didn't check the branch condition.
• Readiness signal: correct final answers with evidence of multiple steps.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
• "Fluency: Mental Maths! I'll show a multiplication. You write the answer AND a different multiplication that gives the same product."
• "Example: I show 3 × 8. You write 24, and then another fact like 6 × 4 or 4 × 6 or 8 × 3."
• "Ready? Here's number 1: 5 × 6." [30 — also 6 × 5, 10 × 3, 15 × 2]
• "Number 2: 4 × 9." [36 — also 9 × 4, 6 × 6, 12 × 3]
• "Number 3: 7 × 8." [56 — also 8 × 7, 14 × 4]
• After: "Notice — you can always swap the order. 5 × 6 = 6 × 5. That's today's big idea."

**DO:**
• Display each problem one at a time. Allow 10 seconds per problem.
• Students write both: the product AND an alternative fact.
• After each, ask: "Who found a different multiplication?" Take 2-3 responses.

**TEACHER NOTES:**
This fluency task directly primes today's lesson by requiring students to produce equivalent multiplications — which is the commutative property in action. When students write 5 × 6 = 30 and 6 × 5 = 30, they are demonstrating commutativity before it has been formally named. The "find another fact" element pushes beyond simple recall into relational thinking, which is the core of VC2M5A02.

**WATCH FOR:**
• Students who can only produce the swap (5 × 6 → 6 × 5) — they understand commutativity but not factor decomposition (5 × 6 → 10 × 3). Both are valid; note which students go beyond the swap.
• Students who struggle to find any alternative — their factor knowledge may be limited.
• Readiness signal: students producing 2+ alternative facts per problem.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
• Read from slide: "We are learning how the commutative and associative properties help us rearrange and regroup factors to create equivalent expressions."
• "Let's look at our success criteria."
• Read each SC aloud. "SC1 is about swapping — the commutative property. SC2 is about regrouping — the associative property. SC3 is the boundary — why division doesn't follow the same rules."

**DO:**
• Display the slide. Point to each SC in turn.
• Pause after reading SC3: "This one might surprise you."
• Leave visible for 30 seconds.

**PACING OVERVIEW:**
Daily Review 5 min, Fluency 3 min, LI/SC + Vocabulary 4 min, I Do 12 min, We Do 12 min, You Do 12 min, Exit Ticket 5 min, Closing 2 min.

**TEACHER NOTES:**
The LI translates VC2M5A02 elaboration 3 ("using materials, diagrams and arrays to demonstrate that multiplication is associative and commutative but division is not") into student language. SC1 targets commutativity (prerequisite — many students already know this intuitively), SC2 targets associativity (the new core learning), SC3 targets the boundary case (division is not commutative). The progressive ordering ensures that even students who only achieve SC1 have solidified an important property.

**WATCH FOR:**
• Students who already know "you can swap multiplication" — SC1 will be quick for them.
• Students who look confused by "associative" — the vocabulary slide will unpack this.
• Readiness signal: students reading ahead on the SC.

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_VOCAB = `**SAY:**
• "Two properties to lock in today."
• Point to COMMUTATIVE: "The commutative property says you can swap the order of numbers in multiplication and the answer stays the same. 3 × 5 = 5 × 3. Think of it as: the order doesn't matter for ×."
• Point to ASSOCIATIVE: "The associative property says you can regroup factors — change which ones you multiply first — and the answer stays the same. (2 × 3) × 4 = 2 × (3 × 4). The brackets move, but the answer is the same."
• "Image check: Which image shows the commutative property?" [The one with the same array rotated]
• "And the associative?" [The one where groups are arranged differently but the total is the same]

**DO:**
• Display the slide. Point to each term and its visual representation.
• Use the array diagrams to show commutativity (2×3 array rotated = 3×2 array).
• After both terms: "Turn & Talk — explain to your partner the difference between commutative and associative. 20 seconds."

**TEACHER NOTES:**
These terms are likely new to many Year 5/6 students. The visual distinction is crucial: commutativity is about ORDER (swapping), associativity is about GROUPING (regrouping with brackets). The array rotation makes commutativity concrete — the same dots arranged as 2 rows of 3 or 3 rows of 2. The associative property is harder to visualise — use the example of (2 × 3) × 4 = 6 × 4 = 24 vs 2 × (3 × 4) = 2 × 12 = 24 to show that different groupings give the same result.

**MISCONCEPTIONS:**
• Misconception: "Commutative and associative are the same thing — they both mean you can rearrange."
  Why: Both properties result in the same answer, so students conflate them.
  Impact: Students who can't distinguish them will struggle in Lesson 4 when they need to apply the associative property specifically to find unknowns.
  Quick correction: "Commutative = swap ORDER (a × b = b × a). Associative = change GROUPING ((a × b) × c = a × (b × c)). Order vs grouping — different moves."

**WATCH FOR:**
• Students who look blank at "associative" — this is the new term. Monitor comprehension during Turn & Talk.
• Students who can explain commutative but not associative — expected. The I Do will make associative concrete.
• Readiness signal: partners distinguishing the two properties in their Turn & Talk.

[Maths: Launch — Explicit Instruction | VTLM 2.0: Explicit Explanation]`;

const NOTES_IDO1 = `**SAY:**
• "Watch me use arrays to prove the commutative property."
• Think-aloud: "I'm going to draw a 2 × 3 array — that's 2 rows of 3 dots. I count: 6 dots total."
• "Now I rotate the array 90 degrees. It becomes 3 × 2 — 3 rows of 2 dots. I count: still 6 dots."
• "The array is the SAME dots, just turned. So 2 × 3 = 3 × 2. This works for ANY multiplication."
• "Let me try 4 × 5 = 5 × 4. Both equal 20. I could draw a 4×5 grid and rotate it to 5×4 — same total."
• Decision point: "But does this work for division? Let's test: 6 ÷ 3 = 2. Now swap: 3 ÷ 6 = 0.5. 2 ≠ 0.5. Division is NOT commutative."
• Deliberate error: "If a student said '6 ÷ 3 is the same as 3 ÷ 6,' we'd need to catch that. Swapping works for multiplication but NOT for division."

**DO:**
• Display the slide showing the 2×3 and 3×2 arrays side by side.
• Point to each array and count the dots.
• Show the rotation visually.
• Then display 6 ÷ 3 vs 3 ÷ 6 — emphasise the ≠ sign.

**TEACHER NOTES:**
This I Do uses arrays as the concrete representation for the commutative property, directly aligned to VC2M5A02 elaboration 3. The array rotation is a powerful visual proof — the same physical objects rearranged give the same total. The deliberate contrast with division (6 ÷ 3 ≠ 3 ÷ 6) is essential — it sets the boundary that prevents overgeneralisation. Students who leave this lesson thinking "you can always swap" will make errors; students who understand "you can swap for ×, but NOT for ÷" have a nuanced understanding.

**MISCONCEPTIONS:**
• Misconception: "Division is commutative too — you can swap any operation."
  Why: Students overgeneralise from × to all operations because the pattern is appealing.
  Impact: If uncorrected, students will create invalid equations in Lessons 4-6 by swapping divisor and dividend.
  Quick correction: "Test it! 6 ÷ 3 = 2. Now swap: 3 ÷ 6 = 0.5. Different answers. Multiplication lets you swap; division does not."

**WATCH FOR:**
• Students who nod at commutativity but look surprised at the division counterexample — good, that's the learning moment.
• Students who already know 2 × 3 = 3 × 2 — the new insight is the division boundary.
• Readiness signal: students able to articulate "× is commutative but ÷ is not."

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_IDO2 = `**SAY:**
• "Now the associative property — this one is about GROUPING."
• Think-aloud: "I have 2 × 2 × 3. I can group it as (2 × 2) × 3. The brackets tell me to multiply 2 × 2 first: that's 4. Then 4 × 3 = 12."
• "But what if I group it differently? 2 × (2 × 3). Now I do 2 × 3 first: that's 6. Then 2 × 6 = 12."
• "Same factors, different grouping, same answer! That's the associative property."
• "Let me try one more grouping: (2 × 3) × 2. 6 × 2 = 12. Still 12!"
• Connection: "So 2 × 2 × 3 = (2 × 2) × 3 = 2 × (2 × 3) = (2 × 3) × 2 = 12. No matter how I group them, I get 12."
• Self-monitoring: "But wait — does associativity work for division? Let's test: 8 ÷ 2 ÷ 2. If I do (8 ÷ 2) ÷ 2 = 4 ÷ 2 = 2. But 8 ÷ (2 ÷ 2) = 8 ÷ 1 = 8. Different! Division is NOT associative either."

**DO:**
• Display the three groupings side by side with working shown.
• Circle the brackets in each version to emphasise the grouping.
• Show the division counterexample: (8 ÷ 2) ÷ 2 ≠ 8 ÷ (2 ÷ 2).

**TEACHER NOTES:**
This I Do demonstrates the associative property using the exact example from VC2M5A02 elaboration 3: 2 × 2 × 3 = 12 regardless of grouping. The three arrangements (2×2×3, 2×3×2, 3×2×2) use both commutativity (reordering) AND associativity (regrouping), which shows how the properties work together. The division counterexample (8 ÷ 2 ÷ 2 = 2 but 8 ÷ (2 ÷ 2) = 8) is directly from the curriculum elaboration and is critical — it shows that brackets MATTER for division, which foreshadows Lesson 5 on order of operations.

**WATCH FOR:**
• Students who look confused by brackets — they may not have worked with grouping notation before. Clarify: "Brackets mean 'do this part first'."
• Students who can follow the working but can't articulate WHY it works — the property is about the REASON, not just the result.
• Readiness signal: students predicting "12" before you calculate the third grouping.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
• "Quick check. I'm going to show you an equation. You tell me if it's TRUE or FALSE — and which property proves it."
• "On your whiteboard, write TRUE or FALSE: 5 × 4 = 4 × 5."
• After boards: "TRUE — commutative property. You can swap the order in multiplication."
• "Now: TRUE or FALSE: 12 ÷ 4 = 4 ÷ 12."
• After boards: "FALSE — division is NOT commutative. 12 ÷ 4 = 3, but 4 ÷ 12 is less than 1."

**DO:**
• Display both equations. Run them one at a time.
• 10 seconds think time per equation. "Show me!"
• After each, ask a Cold Call: "Which property did you use?"

**CFU CHECKPOINT:**
Technique: Show Me Boards (TRUE/FALSE) + Cold Call
Script:
• "TRUE or FALSE on your board. Show me!" Then: "[Name], which property proves it?"
• Scan for: TRUE on ≥80% for Q1, FALSE on ≥80% for Q2.
PROCEED: If ≥80% correct on both, students distinguish commutative ×  from non-commutative ÷. Move to We Do.
PIVOT: If students mark Q2 as TRUE, the boundary hasn't landed. Reteach: "Let's calculate. 12 ÷ 4 = 3. Now 4 ÷ 12 — is that 3? No! 4 shared among 12 is less than 1. Division does NOT let you swap." Re-check: "TRUE or FALSE: 8 ÷ 2 = 2 ÷ 8."

**TEACHER NOTES:**
This CFU tests SC1 (commutativity) and SC3 (division is not commutative) simultaneously with a paired TRUE/FALSE format. The pairing is deliberate — it forces students to apply the property AND its boundary in immediate contrast. If students can distinguish × commutativity from ÷ non-commutativity, they have the conceptual foundation for safe algebraic rearrangement. The Cold Call for the property name checks whether students have the vocabulary, not just the intuition.

**WATCH FOR:**
• Students who write TRUE for both — they're overgeneralising commutativity to all operations.
• Students who write the correct answers but can't name the property — vocabulary gap, not conceptual gap.
• Readiness signal: correct TRUE/FALSE with "commutative" articulated.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
• "Your turn. Let's use the associative property together to prove that different groupings give the same answer."
• "The expression is 3 × 2 × 5. I want you to find the answer using TWO different groupings."
• Cold Call: "[Name], group the first two factors. What's (3 × 2) × 5?" [(6) × 5 = 30]
• Cold Call: "[Name], now group the last two. What's 3 × (2 × 5)?" [3 × (10) = 30]
• "Same answer — 30 — both times. That's the associative property at work."
• "Now: can you use this to find an unknown? 3 × 2 × 5 = □ × 5. What is □?"
• Cold Call: "[Name], what's □?" [6 — because (3 × 2) × 5 = 6 × 5]
• "You just used the associative property to find an unknown!"

**DO:**
• Display the expression with blank working areas for both groupings.
• Use Cold Call for each grouping — different students.
• Click to reveal the completed solutions.
• Show the unknown equation and solution.

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
• Cold call different students for each step. "[Name], what grouping did you use?"
• Scan for: correct products and understanding that both groupings give 30.
PROCEED: If students answer correctly and can identify □ = 6, move to Problem Pair 2.
PIVOT: If students struggle with the grouping, the brackets concept may be unclear. Reteach: "Brackets mean 'do this part first.' (3 × 2) means multiply 3 and 2 before anything else. That gives 6. Then 6 × 5 = 30." Re-check with: "What's (4 × 2) × 3 versus 4 × (2 × 3)?"

**TEACHER NOTES:**
Problem Pair 1 extends from demonstrating the associative property to using it to find an unknown. This is the bridge from Lesson 1 (finding unknowns) to Lesson 2 (using properties to explain WHY). The equation 3 × 2 × 5 = □ × 5 asks students to recognise that □ represents the product of the first two factors — a direct application of associative regrouping. This prepares students for Lesson 4 where they'll use associativity more deliberately to decompose and find unknowns.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide students with the first grouping already calculated: "(3 × 2) = 6, so 6 × 5 = ___." Students only complete the second grouping and the unknown equation.
• Extra Notes: Use concrete materials (counters in groups) if students can't visualise the regrouping.

EXTENDING PROMPT:
• Task: "Write three different groupings for 2 × 3 × 4 × 5. Do they all give the same answer? Can you find □ in: 2 × 3 × 4 × 5 = 6 × □? What about 2 × 3 × 4 × 5 = □ × 20?"
• Extra Notes: This extends to 4-factor expressions where multiple groupings are possible.

**WATCH FOR:**
• Students who multiply all three without grouping (3 × 2 × 5 = 30 "I just knew it") — they're right but haven't demonstrated the PROPERTY. Push: "Show me TWO groupings that both give 30."
• Students who think □ must equal 30 in the equation — they're confusing the total with the unknown factor.
• Readiness signal: students explaining "□ = 6 because 3 × 2 = 6" without prompting.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
• "One more. This time on your whiteboards."
• "The equation is: 4 × 3 × 2 = □ × 2. Find □. Show your working using the associative property. 45 seconds."
• After boards: "Let's check. If I group (4 × 3) × 2 = 12 × 2. So □ × 2 = 12 × 2. Therefore □ = 12."
• "But I could also check: 4 × (3 × 2) = 4 × 6 = 24. And 12 × 2 = 24. Same answer — confirmed."
• "Who can tell me which property you used?" [Associative — regrouping the factors]

**DO:**
• Display the equation. Students work on whiteboards for 45 seconds.
• Circulate — check students are showing groupings, not just guessing.
• After time: "Boards up!" Click to reveal the answer.
• Celebrate correct responses. Emphasise the verification.

**CFU CHECKPOINT:**
Technique: Show Me Boards (open response)
Script:
• "Write the value of □ on your board. 4 × 3 × 2 = □ × 2. Show your grouping. 45 seconds. Go!"
• Scan for: □ = 12 on ≥80% of boards with evidence of grouping shown.
PROCEED: If ≥80% correct with working, students are ready for the hinge question.
PIVOT: Most likely misconception: students write □ = 24 (the total) instead of □ = 12 (the factor). Reteach: "The equation says □ × 2. If the total is 24 and □ × 2 = 24, then □ = 24 ÷ 2 = 12. The □ is a FACTOR, not the product." Re-check: "5 × 3 × 2 = □ × 2. What's □?"

**TEACHER NOTES:**
Problem Pair 2 with increased autonomy (whiteboard work rather than step-by-step Cold Call). The equation 4 × 3 × 2 = □ × 2 requires students to recognise that the × 2 on both sides is the common factor, so □ represents the product of the remaining factors (4 × 3 = 12). This is a stepping stone to Lesson 4 where students will use factor decomposition to find unknowns in more complex equations.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Students work with 2 × 3 × 4 = □ × 4 using the scaffolded format: "(2 × 3) = ___, so □ = ___." Smaller numbers, same structure.

EXTENDING PROMPT:
• Task: "Can you find TWO different values of □ and △ that make this true: 2 × 3 × 5 = □ × △? How many solutions are there?"
• Extra Notes: This opens into factor pair thinking — connecting to the NP unit on factors.

**WATCH FOR:**
• Students who write □ = 24 — they computed the product instead of isolating the unknown factor.
• Students who write □ = 4 × 3 but don't compute it — they've shown the property but not completed the calculation.
• Readiness signal: students finishing in under 30 seconds with □ = 12 and correct grouping.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
• "Gate check before You Do. Look at four equations. ONE is FALSE. Hold up 1, 2, 3, or 4 fingers for the FALSE equation."
• After finger vote: "The answer is D: 10 ÷ 2 = 2 ÷ 10. Division is NOT commutative! 10 ÷ 2 = 5, but 2 ÷ 10 = 0.2."
• "All the others are true: A uses commutativity (7 × 4 = 4 × 7), B uses associativity ((2 × 3) × 5 = 2 × (3 × 5) = 30), C uses commutativity (9 × 3 = 3 × 9)."

**DO:**
• Display the four options. Allow 15 seconds.
• "Show me fingers." Scan room.
• Click to reveal the answer.

**CFU CHECKPOINT:**
Technique: Finger Voting
Script:
• "Which equation is FALSE? Hold up 1, 2, 3, or 4. Think… show me NOW."
• Scan for: option D on ≥80% of students.
PROCEED: If ≥80% choose D, students can distinguish commutative × from non-commutative ÷. Move to You Do.
PIVOT: If students choose B (thinking associativity doesn't work), the grouping concept hasn't landed. Reteach: "Let's calculate B step by step. (2 × 3) × 5 = 6 × 5 = 30. And 2 × (3 × 5) = 2 × 15 = 30. Same answer! The brackets moved but the answer didn't change." Re-check: "TRUE or FALSE: (4 × 2) × 3 = 4 × (2 × 3). Thumbs."

**TEACHER NOTES:**
This hinge question tests all three SC simultaneously: A and C test commutativity (SC1), B tests associativity (SC2), D tests the division boundary (SC3). Each distractor maps to a misconception: choosing A or C as false means the student doubts commutativity; choosing B means they doubt associativity; choosing D correctly means they understand the boundary. The finger voting format ensures every student commits before seeing the answer.

**WATCH FOR:**
• Students who choose B — they may not trust that different groupings give the same answer. They need more examples.
• Students who choose quickly and correctly — they're ready for You Do.
• Readiness signal: confident, immediate selection of D.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
• Read from slide: "First: Identify which property you need (commutative or associative). Next: Use the property to rewrite the expression. Then: Find the unknown and verify."
• "Work through all problems on your worksheet. Show which property you used for each one."
• "If you finish early, try the extending challenge."

**DO:**
• Distribute the SR1 worksheet (6 problems). Display the slide with instructions.
• Circulate. Start with the group that struggled during We Do.
• Check: are students naming the property, not just finding the answer?
• After 10 minutes: "Two-minute warning."

**TEACHER NOTES:**
Independent practice targets all three SC. Problems 1-2 test commutativity (SC1), problems 3-4 test associativity (SC2), problems 5-6 test the division boundary (SC3). Students must both solve AND name the property, reinforcing the vocabulary alongside the procedure. The worksheet includes a "Property Used" column to ensure students engage with the reasoning, not just the arithmetic.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide the SR2 scaffold with properties listed and partially worked examples. Students match each problem to its property, then complete the working.

EXTENDING PROMPT:
• Task: EXT1 investigation: "Division is not commutative or associative. Investigate: IS division distributive? Test: does 12 ÷ (2 + 4) = (12 ÷ 2) + (12 ÷ 4)? What about 24 ÷ (3 + 5)? Write a rule."
• Extra Notes: The EXT1 PDF provides scaffolding for this investigation.

**WATCH FOR:**
• Students who solve correctly but write the wrong property name — vocabulary gap, not conceptual gap. Redirect to the vocabulary card.
• Students who avoid the division problems — they may be unsure about the boundary. Encourage: "Test it! Calculate both sides."
• Readiness signal: students completing problems 3-4 with correct property labels.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
• "Exit ticket time. Two questions. Work silently and independently. Show your working."
• "You have 3 minutes."

**DO:**
• Display the exit ticket slide. Students work in workbooks.
• Circulate silently — no help. This is assessment.
• Collect after 3 minutes. Sort into SC1-only, SC1+SC2, SC1+SC2+SC3 piles.

**TEACHER NOTES:**
Question 1 tests SC2 (associative property): students must show that two different groupings of the same factors give the same product. Question 2 tests SC3 (division boundary): students must explain why a division equation is false. The data informs Lesson 3 planning — students who cannot demonstrate associativity will struggle with the distributive property tomorrow.

**WATCH FOR:**
• Students who leave Q1 blank — they may not understand brackets notation.
• Students who get Q2 wrong — they're still overgeneralising commutativity to division.
• Readiness signal: both questions completed within 2 minutes.

[Maths: Summarise — Exit Ticket | VTLM 2.0: Monitor Progress]`;

const NOTES_RESOURCES = `**SAY:**
• "These are the printable resources for this lesson."

**DO:**
• This slide is for teacher reference. Print SR1 (class set), SR2 (enabling), EXT1 (extending) before the lesson.

**TEACHER NOTES:**
SR1 is the main practice worksheet with 6 problems covering all three properties. SR2 provides scaffolding with properties listed and partial working. EXT1 investigates whether division is distributive — a self-contained investigation PDF for extending students.

**WATCH FOR:**
• Ensure EXT1 copies are available for students who finish early.

[Maths: Planning — Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
• "Let's check our success criteria."
• Read from slide: "SC1: I can show that changing the order of factors does not change the product."
• "Thumbs for SC1."
• Read: "SC2: I can regroup factors using the associative property to create equivalent expressions."
• "Thumbs for SC2."
• Read: "SC3: I can explain why division is NOT commutative using a counterexample."
• "Thumbs for SC3."
• "You've learned something powerful today: multiplication lets you swap and regroup freely, but division does not. Tomorrow we'll learn the distributive property — how to BREAK APART a multiplication into two simpler parts."

**DO:**
• Display the closing slide with SC visible. Run thumbs assessment.
• Note class-level response — if most are sideways on SC2, revisit associativity in tomorrow's DR.

**TEACHER NOTES:**
The closing brings the three SC full circle. The forward look to Lesson 3 (distributive property) connects the unit progression — students are building a toolkit of properties that they'll combine in Lesson 4 to solve complex equations. The thumbs data supplements the exit ticket for planning purposes.

**WATCH FOR:**
• Students who show thumbs-down on SC3 — they may still think division is commutative. Address in tomorrow's DR.
• Discrepancy between thumbs and exit ticket — trust the ticket.

[Maths: Monitor Progress & Feedback | VTLM 2.0: Monitor Progress]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build function
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  // ── Slide 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres,
    "Commutative & Associative Properties",
    "Rearranging and Regrouping Factors",
    "Session 2 of 6  |  Year 5/6  |  Algebra",
    NOTES_TITLE
  );

  // ── Slide 2: Daily Review (Stage 1) — Algorithms ───────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["1"]);
    addStageBadge(s, 1, "Daily Review");
    addTitle(s, "Follow the Algorithm", { y: 0.65, fontSize: 22, color: STAGE_COLORS["1"] });

    // Flowchart-style algorithm
    const steps = [
      { text: "START with 24", bg: STAGE_COLORS["1"] },
      { text: "Is it even?", bg: C.ACCENT },
      { text: "YES → Divide by 2", bg: C.SUCCESS },
      { text: "Repeat until ODD", bg: C.ACCENT },
      { text: "Write your answer", bg: STAGE_COLORS["1"] },
    ];

    steps.forEach((st, i) => {
      const cy = CONTENT_TOP + i * 0.7;
      addTextOnShape(s, st.text, {
        x: 1.5, y: cy, w: 4.0, h: 0.5, rectRadius: 0.08,
        fill: { color: st.bg },
      }, { fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true });

      if (i < steps.length - 1) {
        s.addShape("line", {
          x: 3.5, y: cy + 0.52, w: 0, h: 0.15,
          line: { color: C.MUTED, width: 2 },
        });
      }
    });

    // Second problem
    addCard(s, 6.0, CONTENT_TOP, 3.5, 3.5, { strip: STAGE_COLORS["1"] });
    s.addText([
      { text: "Now try 36!", options: { bold: true, fontSize: 16, color: STAGE_COLORS["1"], breakLine: true } },
      { text: "", options: { breakLine: true, fontSize: 8 } },
      { text: "Follow the same algorithm.", options: { fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: "Write your final odd number on your whiteboard.", options: { fontSize: 13, color: C.CHARCOAL } },
    ], {
      x: 6.25, y: CONTENT_TOP + 0.15, w: 3.0, h: 3.2,
      fontFace: FONT_B, margin: 0, valign: "top",
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
    addTitle(s, "Mental Maths: Find Another Fact", { y: 0.65, fontSize: 22, color: STAGE_COLORS["1"] });

    const facts = ["5 × 6", "4 × 9", "7 × 8"];

    facts.forEach((f, i) => {
      const cy = CONTENT_TOP + 0.2 + i * 1.1;
      addTextOnShape(s, f, {
        x: 1.0, y: cy, w: 2.5, h: 0.7, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["1"] },
      }, { fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true });

      s.addText("= ?    Another fact: ___ × ___ = ?", {
        x: 4.0, y: cy, w: 5.5, h: 0.7,
        fontSize: 16, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
      });
    });

    addTextOnShape(s, "Write the product AND a different multiplication!", {
      x: 1.5, y: CONTENT_TOP + 3.7, w: 7.0, h: 0.4, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, { fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_FLUENCY);
  }

  // ── Slide 4: LI / SC ───────────────────────────────────────────────────
  liSlide(pres,
    ["We are learning how the commutative and associative properties help us rearrange and regroup factors to create equivalent expressions"],
    [
      "I can show that changing the order of factors does not change the product",
      "I can regroup factors using the associative property to create equivalent expressions",
      "I can explain why division is NOT commutative using a counterexample",
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
    addTitle(s, "Two Properties of Multiplication", { y: 0.65, fontSize: 22, color: C.PRIMARY });

    // Commutative
    addCard(s, 0.5, CONTENT_TOP, 4.3, 1.8, { strip: C.SECONDARY });
    s.addText("Commutative", {
      x: 0.75, y: CONTENT_TOP + 0.08, w: 3.8, h: 0.35,
      fontSize: 18, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });
    s.addText("Swap the order — same answer", {
      x: 0.75, y: CONTENT_TOP + 0.45, w: 3.8, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
    s.addText("3 × 5 = 5 × 3", {
      x: 0.75, y: CONTENT_TOP + 0.85, w: 3.8, h: 0.35,
      fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL, margin: 0,
    });
    s.addText("a × b = b × a", {
      x: 0.75, y: CONTENT_TOP + 1.25, w: 3.8, h: 0.3,
      fontSize: 14, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    // Associative
    addCard(s, 5.2, CONTENT_TOP, 4.3, 1.8, { strip: C.ACCENT });
    s.addText("Associative", {
      x: 5.45, y: CONTENT_TOP + 0.08, w: 3.8, h: 0.35,
      fontSize: 18, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });
    s.addText("Change the grouping — same answer", {
      x: 5.45, y: CONTENT_TOP + 0.45, w: 3.8, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
    s.addText("(2 × 3) × 4 = 2 × (3 × 4)", {
      x: 5.45, y: CONTENT_TOP + 0.85, w: 3.8, h: 0.35,
      fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL, margin: 0,
    });
    s.addText("(a × b) × c = a × (b × c)", {
      x: 5.45, y: CONTENT_TOP + 1.25, w: 3.8, h: 0.3,
      fontSize: 14, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    // Division boundary
    addTextOnShape(s, "Division is NOT commutative:  6 ÷ 3 ≠ 3 ÷ 6", {
      x: 0.5, y: CONTENT_TOP + 2.2, w: 9.0, h: 0.5, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_VOCAB);
  }

  // ── Slide 6: I Do — Commutative Property with Arrays ───────────────────
  workedExSlide(pres, 2, "Explicit Instruction", "The Commutative Property",
    [
      "2 × 3 = 6  (2 rows of 3)",
      "3 × 2 = 6  (3 rows of 2)",
      "Same dots, just rotated!",
      "So: a × b = b × a  ✓",
      "",
      "But does it work for division?",
      "6 ÷ 3 = 2",
      "3 ÷ 6 = 0.5",
      "2 ≠ 0.5 — Division is NOT commutative ✗",
    ],
    NOTES_IDO1,
    FOOTER,
    (s) => {
      // 2×3 array
      s.addText("2 × 3", {
        x: 5.5, y: CONTENT_TOP, w: 1.8, h: 0.3,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, align: "center", margin: 0,
      });
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 3; c++) {
          s.addShape("roundRect", {
            x: 5.6 + c * 0.5, y: CONTENT_TOP + 0.35 + r * 0.5,
            w: 0.35, h: 0.35, rectRadius: 0.175,
            fill: { color: C.PRIMARY },
          });
        }
      }

      // 3×2 array
      s.addText("3 × 2", {
        x: 7.5, y: CONTENT_TOP, w: 1.8, h: 0.3,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, align: "center", margin: 0,
      });
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 2; c++) {
          s.addShape("roundRect", {
            x: 7.7 + c * 0.5, y: CONTENT_TOP + 0.35 + r * 0.5,
            w: 0.35, h: 0.35, rectRadius: 0.175,
            fill: { color: C.SECONDARY },
          });
        }
      }

      // Equals sign between arrays
      s.addText("=", {
        x: 7.1, y: CONTENT_TOP + 0.6, w: 0.4, h: 0.4,
        fontSize: 24, fontFace: FONT_H, color: C.CHARCOAL, align: "center", margin: 0,
      });

      // Division counterexample
      addTextOnShape(s, "6 ÷ 3 ≠ 3 ÷ 6", {
        x: 5.8, y: CONTENT_TOP + 2.5, w: 3.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── Slide 7: I Do — Associative Property ───────────────────────────────
  workedExSlide(pres, 2, "Explicit Instruction", "The Associative Property",
    [
      "2 × 2 × 3 — three ways to group:",
      "",
      "(2 × 2) × 3 = 4 × 3 = 12",
      "2 × (2 × 3) = 2 × 6 = 12",
      "(2 × 3) × 2 = 6 × 2 = 12",
      "",
      "Different grouping, SAME answer!",
      "",
      "Division? (8÷2)÷2 = 2  but  8÷(2÷2) = 8",
      "NOT associative ✗",
    ],
    NOTES_IDO2,
    FOOTER,
    (s) => {
      // Three groupings shown visually
      const groups = [
        { label: "(2×2) × 3", result: "4 × 3 = 12", color: C.PRIMARY },
        { label: "2 × (2×3)", result: "2 × 6 = 12", color: C.SECONDARY },
        { label: "(2×3) × 2", result: "6 × 2 = 12", color: C.ACCENT },
      ];

      groups.forEach((g, i) => {
        const cy = CONTENT_TOP + 0.1 + i * 0.9;
        addTextOnShape(s, g.label, {
          x: 5.5, y: cy, w: 2.0, h: 0.4, rectRadius: 0.08,
          fill: { color: g.color },
        }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });

        s.addText(g.result, {
          x: 7.7, y: cy, w: 2.0, h: 0.4,
          fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
        });
      });

      // Big "= 12" confirmation
      addTextOnShape(s, "All = 12!", {
        x: 6.5, y: CONTENT_TOP + 2.9, w: 2.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── Slide 8-9: CFU — TRUE/FALSE with reveal ───────────────────────────
  withReveal(
    () => cfuSlide(pres, "Stage 2", "Quick Check: Properties",
      "Show Me Boards (TRUE/FALSE)",
      "TRUE or FALSE?\n\nA)  5 × 4 = 4 × 5\n\nB)  12 ÷ 4 = 4 ÷ 12\n\nWrite TRUE or FALSE for EACH on your board.",
      NOTES_CFU1, FOOTER),
    (s) => {
      addTextOnShape(s, "A) TRUE — Commutative Property    B) FALSE — Division is NOT commutative", {
        x: 0.5, y: 4.0, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

      s.addText("5 × 4 = 20 = 4 × 5 ✓     12 ÷ 4 = 3 ≠ 4 ÷ 12 = 0.33 ✗", {
        x: 0.5, y: 4.7, w: 9.0, h: 0.3,
        fontSize: 12, fontFace: FONT_B, color: C.MUTED, align: "center", margin: 0,
      });
    }
  );

  // ── Slide 10-11: We Do 1 — with reveal ─────────────────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]);
      addStageBadge(s, 3, "Guided Practice");
      addTitle(s, "We Do: Use the Associative Property", { y: 0.65, fontSize: 22, color: STAGE_COLORS["3"] });

      addTextOnShape(s, "3 × 2 × 5 = □ × 5", {
        x: 1.5, y: CONTENT_TOP + 0.3, w: 7.0, h: 0.8, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["3"] },
      }, { fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true });

      addCard(s, 0.5, CONTENT_TOP + 1.5, 9, 2.0, { strip: STAGE_COLORS["3"] });
      s.addText([
        { text: "Step 1: Group the first two factors: (3 × 2) × 5 = ___ × 5", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 8 } },
        { text: "Step 2: So □ = ___", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 8 } },
        { text: "Step 3: Verify — does □ × 5 = 3 × 2 × 5?", options: { fontSize: 15, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.6, w: 8.5, h: 1.8,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (s) => {
      addTextOnShape(s, "(3 × 2) × 5 = 6 × 5 = 30     □ = 6", {
        x: 1.0, y: 4.2, w: 8.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── Slide 12-13: We Do 2 — with reveal ─────────────────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]);
      addStageBadge(s, 3, "Guided Practice");
      addTitle(s, "We Do: Your Turn on Boards", { y: 0.65, fontSize: 22, color: STAGE_COLORS["3"] });

      addTextOnShape(s, "4 × 3 × 2 = □ × 2", {
        x: 1.5, y: CONTENT_TOP + 0.3, w: 7.0, h: 0.8, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["3"] },
      }, { fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(s, "45 seconds — show your grouping on your whiteboard!", {
        x: 2.0, y: CONTENT_TOP + 1.5, w: 6.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

      addCard(s, 0.5, CONTENT_TOP + 2.3, 9, 1.0, { strip: STAGE_COLORS["3"] });
      s.addText("Hint: Which two factors can you group to match the × 2 on the right side?", {
        x: 0.75, y: CONTENT_TOP + 2.5, w: 8.5, h: 0.6,
        fontSize: 14, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0, valign: "middle",
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO2);
      return s;
    },
    (s) => {
      addTextOnShape(s, "(4 × 3) × 2 = 12 × 2     □ = 12", {
        x: 1.0, y: 4.2, w: 8.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── Slide 14-15: Hinge Question — with reveal ─────────────────────────
  withReveal(
    () => cfuSlide(pres, "Gate Check", "Which Equation Is FALSE?",
      "Finger Voting",
      "A)  7 × 4 = 4 × 7\nB)  (2 × 3) × 5 = 2 × (3 × 5)\nC)  9 × 3 = 3 × 9\nD)  10 ÷ 2 = 2 ÷ 10\n\nHold up 1, 2, 3, or 4 fingers.",
      NOTES_HINGE, FOOTER),
    (s) => {
      addTextOnShape(s, "D)  10 ÷ 2 = 2 ÷ 10 is FALSE!", {
        x: 1.5, y: 4.0, w: 7.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });

      s.addText("10 ÷ 2 = 5    but    2 ÷ 10 = 0.2    Division is NOT commutative!", {
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
    addTitle(s, "You Do: Properties in Action", { y: 0.65, fontSize: 22, color: STAGE_COLORS["4"] });

    addCard(s, 0.5, CONTENT_TOP, 9, 1.1, { strip: STAGE_COLORS["4"] });
    s.addText([
      { text: "First: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Identify the property (commutative or associative).", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "Next: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Use the property to rewrite the expression.", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "Then: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Find the unknown and verify.", options: { fontSize: 14, color: C.CHARCOAL } },
    ], {
      x: 0.75, y: CONTENT_TOP + 0.05, w: 8.5, h: 1.0,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    const probs = [
      "1.  8 × 5 = □ × 8      (property: ___)",
      "2.  (3 × 4) × 2 = □ × 2      (property: ___)",
      "3.  Is 15 ÷ 3 = 3 ÷ 15 true?  Explain.",
    ];

    probs.forEach((p, i) => {
      const cy = CONTENT_TOP + 1.3 + i * 0.7;
      s.addText(p, {
        x: 0.75, y: cy, w: 8.5, h: 0.55,
        fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL, margin: 0, valign: "middle",
      });
    });

    s.addText("Complete all 6 problems on your worksheet (SR1).", {
      x: 0.75, y: CONTENT_TOP + 3.5, w: 8.5, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_YOUDO);
  }

  // ── Slide 17: Exit Ticket (Stage 5) ────────────────────────────────────
  exitTicketSlide(pres,
    [
      "Show that (5 × 2) × 4 = 5 × (2 × 4) using the associative property. Calculate both sides.",
      "Is 20 ÷ 5 = 5 ÷ 20? Explain why or why not.",
    ],
    NOTES_EXIT,
    FOOTER
  );

  // ── Slide 18: Resources ────────────────────────────────────────────────
  addResourceSlide(pres,
    [
      { name: "SR1 — Properties Practice Worksheet", fileName: "resources-lesson2/SR1_Properties_Practice.pdf", description: "6 problems covering commutative, associative, and division boundary." },
      { name: "SR2 — Enabling Scaffold", fileName: "resources-lesson2/SR2_Enabling_Scaffold.pdf", description: "Partially worked examples with property labels provided." },
      { name: "EXT1 — Is Division Distributive?", fileName: "resources-lesson2/EXT1_Division_Distributive_Investigation.pdf", description: "Extending: investigate whether division is distributive." },
    ],
    { C, FONT_H, FONT_B },
    FOOTER,
    NOTES_RESOURCES
  );

  // ── Slide 19: Closing ──────────────────────────────────────────────────
  closingSlide(pres,
    "Turn & Talk: What is the difference between the commutative and associative properties?",
    [
      "SC1: I can show that changing the order of factors does not change the product",
      "SC2: I can regroup factors using the associative property",
      "SC3: I can explain why division is NOT commutative",
    ],
    NOTES_CLOSING
  );

  // ── Write PPTX ─────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: OUT_DIR + "/ALG_Lesson2_Commutative_Associative.pptx" });
  console.log("PPTX written.");

  // ── Generate PDFs ──────────────────────────────────────────────────────
  await generateSR1();
  await generateSR2();
  await generateEXT1();
  console.log("All PDFs written.");
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF Resources
// ─────────────────────────────────────────────────────────────────────────────

async function generateSR1() {
  const doc = createPdf({ title: "SR1 — Properties Practice" });

  let y = addPdfHeader(doc, "Commutative & Associative Properties — Practice", {
    subtitle: "SR1 — Independent Practice",
    color: C.PRIMARY,
    lessonInfo: "Session 2 of 6 | Algebra: Unknown Values | Year 5/6 Maths",
  });

  y = addTipBox(doc, "Commutative: a × b = b × a (swap order). Associative: (a × b) × c = a × (b × c) (change grouping). Division is NOT commutative.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Section A: Commutative Property (SC1)", y, { color: C.PRIMARY });
  y = addProblem(doc, 1, "8 × 5 = □ × 8. Find □. Name the property.", y, { writeLines: [{ label: "□ =" }, { label: "Property:" }], color: C.PRIMARY });
  y = addProblem(doc, 2, "12 × 7 = 7 × □. Find □. Name the property.", y, { writeLines: [{ label: "□ =" }, { label: "Property:" }], color: C.PRIMARY });

  y = addSectionHeading(doc, "Section B: Associative Property (SC2)", y, { color: C.PRIMARY });
  y = addProblem(doc, 3, "(3 × 4) × 2 = □ × 2. Find □. Show your grouping.", y, { writeLines: [{ label: "Grouping:" }, { label: "□ =" }], color: C.PRIMARY });
  y = addProblem(doc, 4, "5 × 2 × 3 = □ × 3. Find □. Show your grouping.", y, { writeLines: [{ label: "Grouping:" }, { label: "□ =" }], color: C.PRIMARY });

  y = addSectionHeading(doc, "Section C: Division Boundary (SC3)", y, { color: C.PRIMARY });
  y = addProblem(doc, 5, "Is 15 ÷ 3 = 3 ÷ 15? Calculate both sides and explain.", y, { writeLines: [{ label: "Left side:" }, { label: "Right side:" }, { label: "Explain:" }], color: C.PRIMARY });
  y = addProblem(doc, 6, "Is (12 ÷ 3) ÷ 2 = 12 ÷ (3 ÷ 2)? Calculate both sides and explain.", y, { writeLines: [{ label: "Left side:" }, { label: "Right side:" }, { label: "Explain:" }], color: C.PRIMARY });

  addPdfFooter(doc, "Session 2 of 6 | Algebra: Unknown Values | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/SR1_Properties_Practice.pdf");
}

async function generateSR2() {
  const doc = createPdf({ title: "SR2 — Enabling Scaffold" });

  let y = addPdfHeader(doc, "Properties — Scaffold", {
    subtitle: "SR2 — Enabling Support",
    color: C.SECONDARY,
    lessonInfo: "Session 2 of 6 | Algebra: Unknown Values | Year 5/6 Maths",
  });

  y = addTipBox(doc, "The property name and first step are done for you. Complete the rest!", y, { color: C.SECONDARY });

  y = addProblem(doc, 1, "8 × 5 = □ × 8. Property: Commutative (swap order).", y, {
    writeLines: [{ label: "Because 8 × 5 = 5 × 8, then □ =", answer: "" }],
    color: C.SECONDARY,
  });
  y = addProblem(doc, 2, "(3 × 4) × 2 = □ × 2. Property: Associative (change grouping).", y, {
    writeLines: [{ label: "3 × 4 =", answer: "" }, { label: "So □ =", answer: "" }],
    color: C.SECONDARY,
  });
  y = addProblem(doc, 3, "5 × 2 × 3 = □ × 3. Property: Associative.", y, {
    writeLines: [{ label: "5 × 2 =", answer: "" }, { label: "So □ =", answer: "" }],
    color: C.SECONDARY,
  });
  y = addProblem(doc, 4, "Is 15 ÷ 3 = 3 ÷ 15? Calculate:", y, {
    writeLines: [{ label: "15 ÷ 3 =", answer: "" }, { label: "3 ÷ 15 =", answer: "" }, { label: "Same? YES / NO", answer: "" }],
    color: C.SECONDARY,
  });

  addPdfFooter(doc, "Session 2 of 6 | Algebra: Unknown Values | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/SR2_Enabling_Scaffold.pdf");
}

async function generateEXT1() {
  const doc = createPdf({ title: "EXT1 — Is Division Distributive?" });

  let y = addPdfHeader(doc, "Investigation: Is Division Distributive?", {
    subtitle: "EXT1 — Extending Challenge",
    color: C.ACCENT,
    lessonInfo: "Session 2 of 6 | Algebra: Unknown Values | Year 5/6 Maths",
  });

  y = addSectionHeading(doc, "What is the Distributive Property?", y, { color: C.ACCENT });
  y = addBodyText(doc, "The distributive property says you can break apart a multiplication over addition:", y);
  y = addBodyText(doc, "4 × (10 + 3) = 4 × 10 + 4 × 3 = 40 + 12 = 52", y, { italic: true });
  y = addBodyText(doc, "This works for multiplication. But does it work for DIVISION?", y);

  y = addSectionHeading(doc, "Your Investigation", y, { color: C.ACCENT });
  y = addBodyText(doc, "Test whether division is distributive over addition by calculating both sides:", y);

  y = addProblem(doc, 1, "Does 12 ÷ (2 + 4) = (12 ÷ 2) + (12 ÷ 4)?", y, {
    writeLines: [{ label: "Left side: 12 ÷ (2+4) = 12 ÷ 6 =" }, { label: "Right side: (12÷2) + (12÷4) = ___ + ___ =" }, { label: "Equal? YES / NO" }],
    color: C.ACCENT,
  });
  y = addProblem(doc, 2, "Does 24 ÷ (3 + 5) = (24 ÷ 3) + (24 ÷ 5)?", y, {
    writeLines: [{ label: "Left side: 24 ÷ (3+5) = 24 ÷ 8 =" }, { label: "Right side: (24÷3) + (24÷5) = ___ + ___ =" }, { label: "Equal? YES / NO" }],
    color: C.ACCENT,
  });
  y = addProblem(doc, 3, "Does (8 + 4) ÷ 2 = (8 ÷ 2) + (4 ÷ 2)?", y, {
    writeLines: [{ label: "Left side: (8+4) ÷ 2 = 12 ÷ 2 =" }, { label: "Right side: (8÷2) + (4÷2) = ___ + ___ =" }, { label: "Equal? YES / NO" }],
    color: C.ACCENT,
  });

  y = addSectionHeading(doc, "What Did You Discover?", y, { color: C.ACCENT });
  y = addWriteLine(doc, "Is division distributive over addition?", y);
  y = addWriteLine(doc, "Does it matter which side the ÷ is on?", y);
  y = addTipBox(doc, "Hint: Compare problems 1-2 (dividing a number by a sum) with problem 3 (dividing a sum by a number). They behave differently!", y, { color: C.ACCENT });

  addPdfFooter(doc, "Session 2 of 6 | Algebra: Unknown Values | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/EXT1_Division_Distributive_Investigation.pdf");
}

build().catch(err => { console.error(err); process.exit(1); });
