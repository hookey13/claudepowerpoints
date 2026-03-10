// Lesson 3 of 6: The Distributive Property
// Year 5/6 Mathematics — Algebra: Finding Unknown Values
// VC2M5A02 — using arrays to recognise and explain the distributive property
// Week 1, Session 3

"use strict";

const pptxgen = require("pptxgenjs");
const { createTheme } = require("../themes/factory");
const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addBodyText, addProblem, addTipBox, addPdfFooter,
  addWriteLine, addStepInstructions, addResourceSlide,
  PAGE, hex, lighten,
} = require("../themes/pdf_helpers");

const T = createTheme("numeracy", "grade56", 0);
const {
  C, FONT_H, FONT_B,
  titleSlide, liSlide, contentSlide, cfuSlide, closingSlide,
  workedExSlide, exitTicketSlide, addStageBadge,
  withReveal,
  addTopBar, addBadge, addTitle, addCard, addFooter, addTextOnShape,
  SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;

const OUT_DIR = "output/ALG_Lesson3_Distributive_Property";
const RES_DIR = OUT_DIR + "/resources-lesson3";
const FOOTER = "Session 3 of 6 | Algebra: Unknown Values | Year 5/6 Maths";

// ─────────────────────────────────────────────────────────────────────────────
const NOTES_TITLE = `**SAY:**
• "Sessions 1 and 2 gave us two tools — equivalence and the commutative/associative properties. Today we add a third: the distributive property."
• "This property lets you BREAK APART a hard multiplication into two easy ones. By the end, you'll use it to find unknown values."

**DO:**
• Display the title slide. Whiteboards ready.

**TEACHER NOTES:**
Lesson 3 introduces the distributive property (VC2M5A02 elaboration 4: 4 × 13 = 4 × 10 + 4 × 3). This connects to students' mental computation strategies — many already "break apart" numbers when multiplying without knowing the formal name. The lesson makes this implicit strategy explicit and shows how it creates equivalent expressions useful for finding unknowns. The array representation makes the property concrete and visual.

**WATCH FOR:**
• Students who used the associative property confidently in L2 — they're ready.
• Readiness signal: settled with materials.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR = `**SAY:**
• "Today's review: Lowest Common Multiples and Highest Common Factors."
• "First: What is the LCM of 6 and 9? Write it on your board."
• After boards: "LCM of 6 and 9 is 18. The multiples of 6 are 6, 12, 18, 24… The multiples of 9 are 9, 18, 27… The smallest they share is 18."
• "Now: What is the HCF of 6 and 9? Show me."
• After boards: "HCF is 3. The factors of 6 are 1, 2, 3, 6. The factors of 9 are 1, 3, 9. The biggest they share is 3."
• "One more: LCM of 4 and 6?" [12]

**DO:**
• Display the slide. Run each problem with 15-second think time.
• Students write on whiteboards. "Show me!"
• Model the listing strategy for any errors.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Write the LCM of 6 and 9 on your board. Show me!"
• Scan for: 18 on ≥80% of boards.
PROCEED: If ≥80% correct on LCM and HCF, move to Fluency.
PIVOT: If errors on LCM, students may be finding the product (6 × 9 = 54) instead of the LOWEST common multiple. Reteach: "List the multiples of each number until you find a match. 6: 6, 12, 18... 9: 9, 18... They both hit 18 — that's the LCM. It's NOT 6 × 9." Re-check: "LCM of 3 and 4?"

**TEACHER NOTES:**
Daily Review targets: "Number Properties and Algorithms — I can identify lowest common multiples and highest common factors of pairs or triples of natural numbers (e.g. the LCM of {6, 9} is 18 and the HCF is 3)." This is the exact example from the user-provided scope and sequence. LCM and HCF connect to today's lesson because the distributive property involves decomposing numbers into factors — students who understand factor relationships will access distributive reasoning more easily.

**WATCH FOR:**
• Students who confuse LCM and HCF — LCM is usually bigger, HCF is usually smaller.
• Students who multiply the numbers instead of listing multiples — direct misconception.
• Readiness signal: correct answers with listing strategy shown.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
• "Fluency: Repeated Practice. You have 90 seconds to answer as many as you can."
• "These are ALL multiplications you know — the challenge is speed. Go!"
• After 90 seconds: "Pens down. Let's check. How many did you get? Hands up for 12 or more."

**DO:**
• Display the 15-problem grid (mixed × facts). Students work silently.
• Time 90 seconds exactly. "GO" and "STOP."
• Read answers quickly. Students self-mark.

**TEACHER NOTES:**
Repeated practice builds automaticity with multiplication facts. Today's lesson requires students to decompose multiplications (e.g., 4 × 13 = 4 × 10 + 4 × 3), which demands fluent recall of partial products. If students can't quickly compute 4 × 10 and 4 × 3, the distributive property lesson will stall at the arithmetic stage rather than reaching the algebraic insight. The grid format (rather than a chain) allows students to skip and return, maintaining momentum.

**WATCH FOR:**
• Students who complete <8 in 90 seconds — they need additional fluency support outside the lesson.
• Readiness signal: 12+ correct in 90 seconds.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
• Read from slide: "We are learning to use the distributive property to break apart multiplication problems and find unknown values."
• "SC1: You can split a multiplication into two parts using an array. SC2: You can write the equation. SC3: You can use it to find an unknown."
• "SC1 is visual — you'll draw or read arrays. SC2 is symbolic — you'll write it as maths. SC3 is algebraic — you'll solve for □."

**DO:**
• Display the slide. Point to each SC.
• "SC2 is our main target today."

**PACING OVERVIEW:**
Daily Review 5 min, Fluency 3 min, LI/SC + Vocab 3 min, I Do 10 min, We Do 12 min, You Do 15 min, Exit Ticket 5 min, Closing 2 min.

**TEACHER NOTES:**
The LI addresses VC2M5A02 elaboration 4 directly. The SC progress from concrete (array) to symbolic (equation) to algebraic (unknown). This CRA-like progression within a single lesson ensures accessibility — students who only achieve SC1 still have a concrete understanding of the property, while SC3 extends to algebraic application.

**WATCH FOR:**
• Students who seem unsure about "distributive" — the vocabulary slide will clarify.
• Readiness signal: students reading ahead.

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_VOCAB = `**SAY:**
• "One new term today: distributive."
• Point to DISTRIBUTIVE: "The distributive property says you can 'distribute' a multiplication over addition. It means you can break a hard multiplication into two easier ones and add the results."
• "Example: 4 × 13 is tricky. But 4 × 10 = 40, and 4 × 3 = 12. Add them: 40 + 12 = 52. So 4 × 13 = 52."
• "You've probably done this in your head before — this property gives it a name."
• "Choral response: say it with me — 'distributive.'"

**DO:**
• Display the slide with the term and visual example.
• Point to the array diagram showing 4 × 13 split into 4 × 10 and 4 × 3.
• Run the choral response for pronunciation.

**TEACHER NOTES:**
Many students already use this strategy mentally (breaking 13 into 10 + 3) without knowing its name. This lesson elevates an intuitive strategy to explicit mathematical language. The connection to mental computation makes it immediately relevant — students have been "distributing" without knowing it. The choral response ensures every student practises the pronunciation, which reduces barriers to using the term in discussion.

**MISCONCEPTIONS:**
• Misconception: "You can only break apart the second number, not the first."
  Why: All initial examples show a × (b + c), so students assume the first factor stays fixed.
  Impact: Students miss that (a + b) × c also works, limiting their flexibility.
  Quick correction: "You can break apart EITHER factor. 4 × 13 = 4 × (10 + 3) works. But you could also do (2 + 2) × 13 = 2 × 13 + 2 × 13. Both ways work!"

**WATCH FOR:**
• Students who say "I already do this" — validate and name it: "You're using the distributive property."
• Readiness signal: students nodding at the mental computation connection.

[Maths: Launch — Explicit Instruction | VTLM 2.0: Explicit Explanation]`;

const NOTES_IDO1 = `**SAY:**
• "Watch me use an array to prove the distributive property."
• Think-aloud: "I want to calculate 4 × 13. That's a big array — 4 rows of 13. But I can split the 13 into 10 and 3."
• "Now I have TWO arrays side by side: 4 × 10 on the left, and 4 × 3 on the right. Together they make the original 4 × 13."
• Decision point: "Why did I split 13 into 10 + 3 and not 7 + 6? Because 10 and 3 are easy to multiply by 4. I chose a split that makes the maths simple."
• "4 × 10 = 40. 4 × 3 = 12. Add them: 40 + 12 = 52. So 4 × 13 = 52."
• "In symbols: 4 × 13 = 4 × (10 + 3) = 4 × 10 + 4 × 3 = 40 + 12 = 52."
• Self-monitoring: "Let me verify: 4 × 13 = 52. Does 4 × 10 + 4 × 3 = 52? 40 + 12 = 52. ✓"

**DO:**
• Display the slide showing the full 4 × 13 array, then the split array.
• Use a vertical line to show where the array splits (after column 10).
• Write the symbolic form underneath.

**TEACHER NOTES:**
This I Do uses the exact example from VC2M5A02 elaboration 4: 4 × 13 = 4 × 10 + 4 × 3. The array representation makes the property visual and concrete — students can SEE that the two smaller arrays together form the original. The decision point about WHY we chose 10 + 3 (rather than other decompositions) models strategic thinking — in later lessons, students will choose decompositions that help them solve for unknowns. The symbolic form at the end bridges from concrete to abstract.

**MISCONCEPTIONS:**
• Misconception: "4 × 13 = 4 × 10 × 3 = 120."
  Why: Students confuse the distributive property (distribute over addition) with the associative property (regroup factors). They write × instead of +.
  Impact: This produces wildly wrong answers and conflates two different properties.
  Quick correction: "The distributive property uses ADDITION, not multiplication. You BREAK APART 13 into 10 + 3, then multiply EACH by 4 and ADD the results. 4 × 10 + 4 × 3 = 52, not 4 × 10 × 3 = 120."

**WATCH FOR:**
• Students writing × instead of + between the partial products — the key error to prevent.
• Students who understand the array but struggle with the symbolic form — they may need more concrete-to-abstract bridging.
• Readiness signal: students mouthing "40 + 12 = 52" as you work.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_IDO2 = `**SAY:**
• "Now let me show you how the distributive property helps find unknowns."
• "Here's the equation: 5 × 14 = 5 × 10 + 5 × □. What is □?"
• Think-aloud: "I can see that 14 has been broken into 10 + □. The distributive property says 5 × 14 = 5 × (10 + □) = 5 × 10 + 5 × □."
• "If 14 = 10 + □, then □ = 14 - 10 = 4."
• "Let me verify: 5 × 10 + 5 × 4 = 50 + 20 = 70. And 5 × 14 = 70. ✓"
• Connection: "Notice — finding the unknown here was just working out what 14 was broken into. The distributive property TELLS us the structure."

**DO:**
• Display the slide with the equation and step-by-step working.
• Emphasise the connection: 14 = 10 + □ → □ = 4.
• Show the verification on the right side.

**TEACHER NOTES:**
This second I Do transitions from demonstrating the distributive property to USING it to find unknowns — the core algebraic skill. The equation 5 × 14 = 5 × 10 + 5 × □ reveals the structure: the common factor (5) is distributed, and the unknown (□) is the missing addend. This is simpler than it looks — once students see that 14 = 10 + □, the unknown is just subtraction. The lesson progressively builds: I Do 1 showed the property, I Do 2 applies it to unknowns, We Do extends to new numbers.

**WATCH FOR:**
• Students who try to solve by calculating 5 × 14 = 70, then 70 ÷ 5 = 14 — that works but misses the distributive reasoning. Both approaches are valid but redirect to the property-based method.
• Students who see "□ = 4" and understand immediately — they're ready for We Do.
• Readiness signal: students nodding at the "14 = 10 + □" insight.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
• "Quick check. On your whiteboard, complete this equation using the distributive property."
• "3 × 15 = 3 × ___ + 3 × ___. Fill in the two blanks. You have 15 seconds."
• After boards: "The most common split is 3 × 10 + 3 × 5. Let's check: 30 + 15 = 45. And 3 × 15 = 45. ✓"
• "Did anyone split it differently? 3 × 12 + 3 × 3? That works too! 36 + 9 = 45."

**DO:**
• Display the question. Students work on whiteboards.
• "Show me!" Scan for correct splits.
• Click to reveal. Celebrate multiple valid answers.

**CFU CHECKPOINT:**
Technique: Show Me Boards (open response)
Script:
• "Fill in the blanks: 3 × 15 = 3 × ___ + 3 × ___. Show me your boards!"
• Scan for: any valid decomposition where the two blanks add to 15.
PROCEED: If ≥80% produce a valid split, students understand the property. Move to We Do.
PIVOT: If students write 3 × 15 = 3 × 10 × 5 (using × instead of +), the key error from the MISCONCEPTIONS section has surfaced. Reteach: "The distributive property uses ADDITION. You break 15 into two parts that ADD to 15: 10 + 5 = 15. Then multiply EACH part by 3 and ADD: 3 × 10 + 3 × 5." Re-check: "4 × 12 = 4 × ___ + 4 × ___."

**TEACHER NOTES:**
This CFU tests SC1 and SC2 — can students decompose and write the distributive form? The open-response format is deliberate: there are multiple correct answers (10+5, 12+3, 8+7, etc.), and accepting all of them reinforces that the property works for ANY decomposition of 15. This builds flexibility. The most likely error (× instead of +) is the critical misconception to catch before We Do.

**WATCH FOR:**
• Students writing × between partial products — catch and correct immediately.
• Students who only use the 10+remainder split — valid but limited. They may need encouragement to try other splits.
• Readiness signal: correct splits with + between partial products.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
• "Together now. The equation is: 6 × 17 = 6 × □ + 6 × 7. Find □."
• Cold Call: "[Name], what has 17 been broken into?" [□ + 7]
• Cold Call: "[Name], if 17 = □ + 7, what is □?" [10]
• "Let's verify: 6 × 10 + 6 × 7 = 60 + 42 = 102. And 6 × 17 = 102. ✓"
• "The distributive property told us the structure: 17 = □ + 7. Simple subtraction gives the unknown."

**DO:**
• Display the equation with prompts.
• Cold Call for each step. Click to reveal the solution.

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
• "[Name], what has 17 been split into?" "[Name], so what is □?"
• Scan for: correct identification of 17 = □ + 7 → □ = 10.
PROCEED: If correct, move to PP2.
PIVOT: If students struggle to see 17 = □ + 7, reteach: "Look at the equation. On the left: 6 × 17. On the right: 6 × □ + 6 × 7. The 6 is common. The 17 has been split into □ and 7. So □ + 7 = 17." Re-check with: "8 × 15 = 8 × □ + 8 × 5. What's □?"

**TEACHER NOTES:**
Problem Pair 1 applies the distributive property to find an unknown. The structure is transparent: the common factor (6) appears in both partial products, and the unknown (□) is the missing addend. Students who see the structure solve it instantly (17 = □ + 7 → □ = 10). Students who don't see the structure need the explicit comparison between the left side (6 × 17) and the right side (6 × □ + 6 × 7) to identify what was split.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide students with a pre-drawn array for 6 × 17, split at column 10. Students count the columns in each section to identify □ = 10. The visual scaffold makes the decomposition concrete.

EXTENDING PROMPT:
• Task: "Find □ in: 4 × □ = 4 × 20 + 4 × 8. Then find □ in: □ × 15 = 3 × 15 + 7 × 15. What's different about the second one?"
• Extra Notes: The second problem distributes the OTHER factor — extending to (a+b) × c form.

**WATCH FOR:**
• Students who try to calculate 6 × 17 first then work backwards — valid but not using the property directly.
• Students who write □ = 10 confidently — they see the structure.
• Readiness signal: immediate identification of 17 = □ + 7.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
• "Your turn on boards. Find □ in: 8 × 23 = 8 × 20 + 8 × □. You have 30 seconds."
• After boards: "□ = 3. Because 23 = 20 + □, so □ = 3."
• "Verify: 8 × 20 + 8 × 3 = 160 + 24 = 184. And 8 × 23 = 184. ✓"
• "Now a harder one on boards: 7 × □ = 7 × 30 + 7 × 6. What is □? 30 seconds."
• After boards: "□ = 36. Because the distributive property says 7 × 36 = 7 × 30 + 7 × 6."

**DO:**
• Display the first equation. 30 seconds, then boards up. Reveal.
• Display the second equation. 30 seconds, then boards up. Reveal.

**CFU CHECKPOINT:**
Technique: Show Me Boards (open response)
Script:
• "Write □ on your board. Show me!" (for each problem)
• Scan for: □ = 3 on first, □ = 36 on second.
PROCEED: If ≥80% correct on both, move to hinge question.
PIVOT: If the second problem (□ = 36) causes errors, students may be adding 30 + 6 incorrectly or not recognising that □ = 30 + 6. Reteach: "The right side shows 7 × 30 + 7 × 6. The 7 is distributed across (30 + 6). So the left side is 7 × (30 + 6) = 7 × 36." Re-check: "5 × □ = 5 × 40 + 5 × 2."

**TEACHER NOTES:**
Two problems with increasing complexity. The first (□ = 3) is straightforward — the unknown is the smaller addend. The second (□ = 36) requires combining the two addends — students must recognise that □ IS the sum, not one of the parts. This is a step up in abstraction. The second problem type appears in the You Do worksheet, so students who struggle here will need the enabling scaffold.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Students work with single-digit decompositions only: "4 × 15 = 4 × 10 + 4 × □." Smaller numbers, same structure.

EXTENDING PROMPT:
• Task: "Use the distributive property to calculate 7 × 99 without a calculator. Hint: 99 = 100 - 1. Does the distributive property work with subtraction too?"
• Extra Notes: The EXT1 PDF explores distribution over subtraction.

**WATCH FOR:**
• Students who get □ = 3 but not □ = 36 — the second problem requires addition (30+6) not subtraction (23-20).
• Students who solve both quickly — ready for You Do.
• Readiness signal: both answers correct with reasoning articulated.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
• "Gate check. Which equation correctly uses the distributive property? Show fingers: 1, 2, 3, or 4."
• After: "The answer is B: 6 × 14 = 6 × 10 + 6 × 4. Check: 10 + 4 = 14, and the 6 is distributed across both."
• "Why not A? 5 × 18 = 5 × 10 × 8 uses MULTIPLICATION, not addition. That's the associative property, not distributive. Why not C? 3 × 12 = 3 + 12 doesn't distribute at all. Why not D? 4 × 15 = 40 + 45 = 85, but 4 × 15 = 60. Wrong numbers."

**DO:**
• Display options. 15 seconds. "Show fingers." Scan. Reveal.

**CFU CHECKPOINT:**
Technique: Finger Voting
Script:
• "Which equation shows the distributive property correctly? 1, 2, 3, or 4. Show me NOW."
• Scan for: option B on ≥80%.
PROCEED: If ≥80% choose B, students can identify the distributive form. Move to You Do.
PIVOT: If students choose A (5 × 10 × 8), the × vs + confusion is still present. Reteach: "Distributive means break apart with ADDITION, then multiply each part. 5 × 18 = 5 × (10 + 8) = 5 × 10 + 5 × 8. The PLUS is the key." Re-check: "Is 3 × 21 = 3 × 20 + 3 × 1 distributive? Thumbs."

**TEACHER NOTES:**
Each distractor maps to a specific error: A (using × instead of +, confusing distributive with associative), C (adding factors instead of distributing), D (incorrect partial products). Finger voting ensures whole-class participation and rapid interpretation. This is the gate between We Do and You Do.

**WATCH FOR:**
• Students choosing A — the × vs + error is the #1 misconception in this lesson.
• Students choosing quickly and correctly — ready for You Do.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
• Read from slide: "First: Identify the common factor. Next: Work out what the number was broken into. Then: Find the unknown and verify."
• "Complete all 6 problems on your worksheet."

**DO:**
• Distribute SR1. Display the slide. Circulate.
• Check: are students identifying the structure (a × n = a × □ + a × □)?
• After 12 minutes: "Two-minute warning."

**TEACHER NOTES:**
The worksheet has 6 graduated problems: 1-2 mirror We Do exactly (find missing addend), 3-4 find the whole number (□ = sum of addends), 5-6 reverse the direction (given the partial products, identify the original multiplication). This progression builds from familiar to novel within the independent phase.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: SR2 scaffold with arrays drawn for each problem and the first step completed. Students identify the missing section of the array.

EXTENDING PROMPT:
• Task: EXT1 investigation on distribution over subtraction: "Does 7 × 99 = 7 × 100 - 7 × 1? Test it. Does this always work?"

**WATCH FOR:**
• Students who get stuck on problems 3-4 (finding the whole) — they may need the explicit prompt: "Add the two parts together to find □."
• Readiness signal: completing problem 4+ correctly.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
• "Exit ticket. Two questions. Show your working. 3 minutes."

**DO:**
• Display the exit ticket. Students work silently. Collect after 3 minutes.

**TEACHER NOTES:**
Q1 tests SC2 (write the distributive form): students must decompose a multiplication. Q2 tests SC3 (find unknown): students must use the distributive structure to identify □. Data informs Lesson 4 — students who struggle here need reteaching before combining multiple properties.

**WATCH FOR:**
• Students using × instead of + — the persistent misconception. Note for tomorrow's DR.
• Readiness signal: both questions completed with correct symbolic form.

[Maths: Summarise — Exit Ticket | VTLM 2.0: Monitor Progress]`;

const NOTES_RESOURCES = `**SAY:**
• "Printable resources for this lesson."

**DO:**
• Print SR1 (class set), SR2 (enabling), EXT1 (extending) before the lesson.

**TEACHER NOTES:**
SR1 is the main worksheet. SR2 provides array-based scaffolding. EXT1 investigates distribution over subtraction — a self-contained investigation for extending students.

**WATCH FOR:**
• Ensure EXT1 is available for early finishers.

[Maths: Planning — Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
• "Success criteria check."
• "SC1: I can break a multiplication into two parts using an array. Thumbs."
• "SC2: I can write an equation showing the distributive property. Thumbs."
• "SC3: I can use the distributive property to find an unknown value. Thumbs."
• "Tomorrow we combine ALL the properties — commutative, associative, AND distributive — to solve harder equations."

**DO:**
• Display the closing slide. Run thumbs for each SC.

**TEACHER NOTES:**
The forward look to Lesson 4 (combining properties) signals increasing complexity. Students who are solid on SC1-SC2 but shaky on SC3 will benefit from seeing how properties combine — sometimes the combined approach is clearer than using one property in isolation.

**WATCH FOR:**
• Thumbs-down on SC3 — these students need the enabling approach in Lesson 4.

[Maths: Monitor Progress & Feedback | VTLM 2.0: Monitor Progress]`;

// ─────────────────────────────────────────────────────────────────────────────
async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  // ── Slide 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres,
    "The Distributive Property",
    "Breaking Apart Multiplications to Find Unknowns",
    "Session 3 of 6  |  Year 5/6  |  Algebra",
    NOTES_TITLE
  );

  // ── Slide 2: Daily Review — LCM & HCF ─────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["1"]);
    addStageBadge(s, 1, "Daily Review");
    addTitle(s, "LCM and HCF", { y: 0.65, fontSize: 22, color: STAGE_COLORS["1"] });

    const problems = [
      { q: "Find the LCM of 6 and 9", hint: "List multiples of each until you find a match" },
      { q: "Find the HCF of 6 and 9", hint: "List factors of each and find the biggest common one" },
      { q: "Find the LCM of 4 and 6", hint: "Multiples of 4: 4, 8, 12... Multiples of 6: 6, 12..." },
    ];

    problems.forEach((p, i) => {
      const cy = CONTENT_TOP + i * 1.1;
      addCard(s, 0.5, cy, 9, 0.9, { strip: STAGE_COLORS["1"] });
      s.addText((i + 1) + ".  " + p.q, {
        x: 0.75, y: cy + 0.08, w: 8.5, h: 0.4,
        fontSize: 18, fontFace: FONT_H, color: C.CHARCOAL, margin: 0,
      });
      s.addText(p.hint, {
        x: 0.75, y: cy + 0.5, w: 8.5, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_DR);
  }

  // ── Slide 3: Fluency ──────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["1"]);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Repeated Practice: 90-Second Sprint", { y: 0.65, fontSize: 22, color: STAGE_COLORS["1"] });

    const facts = [
      ["6 × 7 =", "9 × 4 =", "8 × 5 =", "7 × 3 =", "12 × 4 ="],
      ["5 × 9 =", "8 × 8 =", "11 × 6 =", "4 × 7 =", "6 × 12 ="],
      ["3 × 9 =", "7 × 7 =", "8 × 6 =", "9 × 11 =", "5 × 8 ="],
    ];

    facts.forEach((row, r) => {
      row.forEach((f, c) => {
        const cx = 0.5 + c * 1.85;
        const cy = CONTENT_TOP + 0.3 + r * 0.9;
        addTextOnShape(s, f, {
          x: cx, y: cy, w: 1.6, h: 0.6, rectRadius: 0.08,
          fill: { color: C.BG_CARD },
          line: { color: STAGE_COLORS["1"], width: 1 },
        }, { fontSize: 15, fontFace: FONT_H, color: C.CHARCOAL, bold: true });
      });
    });

    addTextOnShape(s, "90 seconds — GO!", {
      x: 3.5, y: CONTENT_TOP + 3.3, w: 3.0, h: 0.4, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_FLUENCY);
  }

  // ── Slide 4: LI / SC ──────────────────────────────────────────────────
  liSlide(pres,
    ["We are learning to use the distributive property to break apart multiplication problems and find unknown values"],
    [
      "I can break a multiplication into two simpler parts using an array",
      "I can write an equation showing the distributive property",
      "I can use the distributive property to find an unknown value",
    ],
    NOTES_LISC,
    FOOTER
  );

  // ── Slide 5: Vocabulary ──────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, C.PRIMARY);
    addBadge(s, "Key Vocabulary", C.PRIMARY);
    addTitle(s, "The Distributive Property", { y: 0.65, fontSize: 22, color: C.PRIMARY });

    addCard(s, 0.5, CONTENT_TOP, 9, 1.3, { strip: C.SECONDARY });
    s.addText("Distributive Property", {
      x: 0.75, y: CONTENT_TOP + 0.08, w: 8.5, h: 0.35,
      fontSize: 18, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });
    s.addText("Break a hard multiplication into two easy ones and add the results.", {
      x: 0.75, y: CONTENT_TOP + 0.45, w: 8.5, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addText("4 × 13 = 4 × 10 + 4 × 3 = 40 + 12 = 52", {
      x: 0.75, y: CONTENT_TOP + 0.85, w: 8.5, h: 0.35,
      fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL, margin: 0,
    });

    // Array visual: 4 × 13 split
    // Left portion: 4 × 10
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 10; c++) {
        s.addShape("rect", {
          x: 0.7 + c * 0.32, y: CONTENT_TOP + 1.6 + r * 0.32,
          w: 0.28, h: 0.28,
          fill: { color: C.PRIMARY },
          line: { color: C.WHITE, width: 0.5 },
        });
      }
    }
    // Right portion: 4 × 3
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 3; c++) {
        s.addShape("rect", {
          x: 0.7 + (10 + c) * 0.32 + 0.1, y: CONTENT_TOP + 1.6 + r * 0.32,
          w: 0.28, h: 0.28,
          fill: { color: C.ACCENT },
          line: { color: C.WHITE, width: 0.5 },
        });
      }
    }

    // Labels under arrays
    s.addText("4 × 10 = 40", {
      x: 0.7, y: CONTENT_TOP + 2.95, w: 3.2, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.PRIMARY, align: "center", margin: 0,
    });
    s.addText("4 × 3 = 12", {
      x: 3.9, y: CONTENT_TOP + 2.95, w: 1.5, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.ACCENT, align: "center", margin: 0,
    });

    // General form
    s.addText("a × (b + c) = a × b + a × c", {
      x: 5.5, y: CONTENT_TOP + 2.0, w: 4.0, h: 0.4,
      fontSize: 16, fontFace: FONT_H, color: C.MUTED, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_VOCAB);
  }

  // ── Slide 6: I Do — Array Proof ───────────────────────────────────────
  workedExSlide(pres, 2, "Explicit Instruction", "Distributive Property with Arrays",
    [
      "Calculate: 4 × 13",
      "",
      "Split 13 into 10 + 3",
      "",
      "4 × 13 = 4 × (10 + 3)",
      "       = 4 × 10 + 4 × 3",
      "       = 40 + 12",
      "       = 52  ✓",
    ],
    NOTES_IDO1,
    FOOTER,
    (s) => {
      // Split array visual
      addTextOnShape(s, "4 × 10", {
        x: 5.5, y: CONTENT_TOP + 0.1, w: 1.5, h: 0.35, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });

      addTextOnShape(s, "4 × 3", {
        x: 7.3, y: CONTENT_TOP + 0.1, w: 1.2, h: 0.35, rectRadius: 0.08,
        fill: { color: C.ACCENT },
      }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });

      // Simplified array representation
      s.addShape("rect", {
        x: 5.5, y: CONTENT_TOP + 0.55, w: 1.5, h: 1.2,
        fill: { color: C.PRIMARY }, line: { color: C.WHITE, width: 1 },
      });
      s.addText("40", {
        x: 5.5, y: CONTENT_TOP + 0.55, w: 1.5, h: 1.2,
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, align: "center", valign: "middle", margin: 0,
      });

      // Plus sign
      s.addText("+", {
        x: 7.05, y: CONTENT_TOP + 0.9, w: 0.3, h: 0.4,
        fontSize: 18, fontFace: FONT_H, color: C.CHARCOAL, align: "center", margin: 0,
      });

      s.addShape("rect", {
        x: 7.3, y: CONTENT_TOP + 0.55, w: 1.2, h: 1.2,
        fill: { color: C.ACCENT }, line: { color: C.WHITE, width: 1 },
      });
      s.addText("12", {
        x: 7.3, y: CONTENT_TOP + 0.55, w: 1.2, h: 1.2,
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, align: "center", valign: "middle", margin: 0,
      });

      // Result
      addTextOnShape(s, "= 52", {
        x: 6.3, y: CONTENT_TOP + 2.0, w: 1.8, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── Slide 7: I Do — Finding Unknowns ──────────────────────────────────
  workedExSlide(pres, 2, "Explicit Instruction", "Using the Distributive Property for Unknowns",
    [
      "Find □ in: 5 × 14 = 5 × 10 + 5 × □",
      "",
      "The distributive property says:",
      "5 × 14 = 5 × (10 + □)",
      "",
      "So 14 = 10 + □",
      "□ = 14 - 10 = 4",
      "",
      "Verify: 5 × 10 + 5 × 4 = 50 + 20 = 70",
      "5 × 14 = 70  ✓",
    ],
    NOTES_IDO2,
    FOOTER,
    (s) => {
      addTextOnShape(s, "5 × 14 = 5 × 10 + 5 × □", {
        x: 5.3, y: CONTENT_TOP + 0.2, w: 4.2, h: 0.5, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(s, "14 = 10 + □", {
        x: 5.8, y: CONTENT_TOP + 1.0, w: 3.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(s, "□ = 4", {
        x: 6.3, y: CONTENT_TOP + 1.8, w: 1.8, h: 0.5, rectRadius: 0.08,
        fill: { color: C.ACCENT },
      }, { fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(s, "Verified ✓", {
        x: 6.3, y: CONTENT_TOP + 2.6, w: 1.8, h: 0.4, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── Slide 8-9: CFU — with reveal ──────────────────────────────────────
  withReveal(
    () => cfuSlide(pres, "Stage 2", "Quick Check: Distributive Property",
      "Show Me Boards",
      "Complete this equation:\n\n3 × 15 = 3 × ___ + 3 × ___\n\nFill in the two blanks. Any valid split!",
      NOTES_CFU1, FOOTER),
    (s) => {
      addTextOnShape(s, "3 × 15 = 3 × 10 + 3 × 5 = 30 + 15 = 45  ✓", {
        x: 0.5, y: 4.0, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });

      s.addText("Other valid splits: 3×12 + 3×3 = 45   or   3×8 + 3×7 = 45", {
        x: 0.5, y: 4.7, w: 9.0, h: 0.3,
        fontSize: 12, fontFace: FONT_B, color: C.MUTED, align: "center", margin: 0,
      });
    }
  );

  // ── Slide 10-11: We Do 1 — with reveal ────────────────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]);
      addStageBadge(s, 3, "Guided Practice");
      addTitle(s, "We Do: Find □ Using Distribution", { y: 0.65, fontSize: 22, color: STAGE_COLORS["3"] });

      addTextOnShape(s, "6 × 17 = 6 × □ + 6 × 7", {
        x: 1.5, y: CONTENT_TOP + 0.3, w: 7.0, h: 0.8, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["3"] },
      }, { fontSize: 26, fontFace: FONT_H, color: C.WHITE, bold: true });

      addCard(s, 0.5, CONTENT_TOP + 1.5, 9, 2.0, { strip: STAGE_COLORS["3"] });
      s.addText([
        { text: "17 has been broken into □ + 7", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 8 } },
        { text: "If 17 = □ + 7, then □ = ___", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 8 } },
        { text: "Verify: 6 × ___ + 6 × 7 = ___ + ___ = ___", options: { fontSize: 15, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.6, w: 8.5, h: 1.8,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (s) => {
      addTextOnShape(s, "17 = □ + 7 → □ = 10     Verify: 60 + 42 = 102 = 6 × 17 ✓", {
        x: 0.5, y: 4.2, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── Slide 12-13: We Do 2 — with reveal ────────────────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]);
      addStageBadge(s, 3, "Guided Practice");
      addTitle(s, "We Do: Boards — Two Problems", { y: 0.65, fontSize: 22, color: STAGE_COLORS["3"] });

      addTextOnShape(s, "A)  8 × 23 = 8 × 20 + 8 × □", {
        x: 0.5, y: CONTENT_TOP + 0.2, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["3"] },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(s, "B)  7 × □ = 7 × 30 + 7 × 6", {
        x: 0.5, y: CONTENT_TOP + 1.1, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["3"] },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(s, "30 seconds per problem — work on your whiteboard!", {
        x: 2.0, y: CONTENT_TOP + 2.1, w: 6.0, h: 0.4, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO2);
      return s;
    },
    (s) => {
      addTextOnShape(s, "A) □ = 3 (23 = 20 + 3)     B) □ = 36 (30 + 6 = 36)", {
        x: 0.5, y: 4.2, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── Slide 14-15: Hinge Question — with reveal ─────────────────────────
  withReveal(
    () => cfuSlide(pres, "Gate Check", "Which Is the Distributive Property?",
      "Finger Voting",
      "A)  5 × 18 = 5 × 10 × 8\nB)  6 × 14 = 6 × 10 + 6 × 4\nC)  3 × 12 = 3 + 12\nD)  4 × 15 = 40 + 45\n\nHold up 1, 2, 3, or 4 fingers.",
      NOTES_HINGE, FOOTER),
    (s) => {
      addTextOnShape(s, "B)  6 × 14 = 6 × 10 + 6 × 4 = 60 + 24 = 84  ✓", {
        x: 1.0, y: 4.0, w: 8.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });

      s.addText("A: × not + (associative)   C: no distribution   D: wrong products (40+45=85≠60)", {
        x: 1.0, y: 4.7, w: 8.0, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED, align: "center", margin: 0,
      });
    }
  );

  // ── Slide 16: You Do ──────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["4"]);
    addStageBadge(s, 4, "Independent Practice");
    addTitle(s, "You Do: Distributive Property", { y: 0.65, fontSize: 22, color: STAGE_COLORS["4"] });

    addCard(s, 0.5, CONTENT_TOP, 9, 1.1, { strip: STAGE_COLORS["4"] });
    s.addText([
      { text: "First: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Identify the common factor.", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "Next: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Work out what the number was broken into (find the missing addend).", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "Then: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Find □ and verify.", options: { fontSize: 14, color: C.CHARCOAL } },
    ], {
      x: 0.75, y: CONTENT_TOP + 0.05, w: 8.5, h: 1.0,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    const probs = [
      "1.  3 × 16 = 3 × 10 + 3 × □",
      "2.  9 × □ = 9 × 20 + 9 × 5",
      "3.  5 × 24 = 5 × □ + 5 × 4",
    ];

    probs.forEach((p, i) => {
      const cy = CONTENT_TOP + 1.3 + i * 0.7;
      s.addText(p, {
        x: 0.75, y: cy, w: 8.5, h: 0.55,
        fontSize: 17, fontFace: FONT_H, color: C.CHARCOAL, margin: 0, valign: "middle",
      });
    });

    s.addText("Complete all 6 problems on your worksheet (SR1).", {
      x: 0.75, y: CONTENT_TOP + 3.5, w: 8.5, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_YOUDO);
  }

  // ── Slide 17: Exit Ticket ─────────────────────────────────────────────
  exitTicketSlide(pres,
    [
      "Use the distributive property to write 7 × 16 as the sum of two simpler multiplications.",
      "Find □:  4 × 25 = 4 × 20 + 4 × □. Show your working.",
    ],
    NOTES_EXIT,
    FOOTER
  );

  // ── Slide 18: Resources ───────────────────────────────────────────────
  addResourceSlide(pres,
    [
      { name: "SR1 — Distributive Property Worksheet", fileName: "resources-lesson3/SR1_Distributive_Worksheet.pdf", description: "6 problems for independent practice." },
      { name: "SR2 — Enabling Scaffold", fileName: "resources-lesson3/SR2_Enabling_Scaffold.pdf", description: "Array-based scaffolding for students needing support." },
      { name: "EXT1 — Distribution Over Subtraction", fileName: "resources-lesson3/EXT1_Distribution_Subtraction.pdf", description: "Extending: does the property work with subtraction?" },
    ],
    { C, FONT_H, FONT_B },
    FOOTER,
    NOTES_RESOURCES
  );

  // ── Slide 19: Closing ─────────────────────────────────────────────────
  closingSlide(pres,
    "Turn & Talk: How does the distributive property help you multiply big numbers in your head?",
    [
      "SC1: I can break a multiplication into two parts using an array",
      "SC2: I can write an equation showing the distributive property",
      "SC3: I can use the distributive property to find an unknown",
    ],
    NOTES_CLOSING
  );

  await pres.writeFile({ fileName: OUT_DIR + "/ALG_Lesson3_Distributive_Property.pptx" });
  console.log("PPTX written.");
  await generateSR1();
  await generateSR2();
  await generateEXT1();
  console.log("All PDFs written.");
}

// ─────────────────────────────────────────────────────────────────────────────
async function generateSR1() {
  const doc = createPdf({ title: "SR1 — Distributive Property Worksheet" });
  let y = addPdfHeader(doc, "Distributive Property — Practice", {
    subtitle: "SR1 — Independent Practice", color: C.PRIMARY,
    lessonInfo: "Session 3 of 6 | Algebra: Unknown Values | Year 5/6 Maths",
  });
  y = addTipBox(doc, "a × (b + c) = a × b + a × c. Break apart one factor, multiply each part, then add. Use + not ×!", y, { color: C.SECONDARY });
  y = addSectionHeading(doc, "Section A: Find the Missing Addend", y, { color: C.PRIMARY });
  y = addProblem(doc, 1, "3 × 16 = 3 × 10 + 3 × □. Find □.", y, { writeLines: [{ label: "16 = 10 + □, so □ =" }], color: C.PRIMARY });
  y = addProblem(doc, 2, "8 × 23 = 8 × 20 + 8 × □. Find □.", y, { writeLines: [{ label: "23 = 20 + □, so □ =" }], color: C.PRIMARY });
  y = addSectionHeading(doc, "Section B: Find the Whole Number", y, { color: C.PRIMARY });
  y = addProblem(doc, 3, "9 × □ = 9 × 20 + 9 × 5. Find □.", y, { writeLines: [{ label: "□ = 20 + 5 =" }], color: C.PRIMARY });
  y = addProblem(doc, 4, "5 × □ = 5 × 30 + 5 × 8. Find □.", y, { writeLines: [{ label: "□ = 30 + 8 =" }], color: C.PRIMARY });
  y = addSectionHeading(doc, "Section C: Write the Distributive Form", y, { color: C.PRIMARY });
  y = addProblem(doc, 5, "Write 6 × 18 using the distributive property (split 18 into two parts).", y, { writeLines: [{ label: "6 × 18 = 6 × ___ + 6 × ___ =" }], color: C.PRIMARY });
  y = addProblem(doc, 6, "Write 7 × 24 using the distributive property.", y, { writeLines: [{ label: "7 × 24 = 7 × ___ + 7 × ___ =" }], color: C.PRIMARY });
  addPdfFooter(doc, "Session 3 of 6 | Algebra: Unknown Values | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/SR1_Distributive_Worksheet.pdf");
}

async function generateSR2() {
  const doc = createPdf({ title: "SR2 — Enabling Scaffold" });
  const M = PAGE.MARGIN;
  const CW = PAGE.CONTENT_W;
  const col = C.SECONDARY;

  let y = addPdfHeader(doc, "Distributive Property — Scaffold", {
    subtitle: "SR2 — Enabling Support", color: col,
    lessonInfo: "Session 3 of 6 | Algebra: Unknown Values | Year 5/6 Maths",
  });

  y = addTipBox(doc, "The area model is drawn for you. Use it to SEE the distributive property — count sections, then fill in the blanks.", y, { color: col });

  // Prevent PDFKit auto-pagination (all content fits on one page but
  // cumulative doc.text() calls push the internal cursor past the threshold).
  doc.page.margins.bottom = 0;

  // ── Local helper: draw a proportional area model ──────────────────────────
  function drawAreaModel(yStart, rows, totalCols, leftCols, rightLabel) {
    const indent = 30;           // space for row label
    const x = M + indent;
    const modelW = CW - indent;
    const modelH = 60;           // fixed height for all models
    const leftW = (leftCols / totalCols) * modelW;
    const rightW = modelW - leftW;
    const splitX = x + leftW;

    // Column labels above the model
    const labelY = yStart;
    doc.fontSize(11).font("Sans-Bold").fillColor(hex(col));
    doc.text(String(leftCols), x, labelY, { width: leftW, align: "center" });
    doc.text(rightLabel, splitX, labelY, { width: rightW, align: "center" });
    const modelTop = labelY + 16;

    // Filled sections (two tints)
    doc.save();
    doc.rect(x, modelTop, leftW, modelH).fill(lighten(col, 0.85));
    doc.rect(splitX, modelTop, rightW, modelH).fill(lighten(col, 0.7));

    // Section labels inside
    doc.fontSize(10).font("Sans").fillColor(hex("4B5563"));
    doc.text(rows + " × " + leftCols, x, modelTop + modelH / 2 - 6,
      { width: leftW, align: "center" });
    doc.text(rows + " × " + rightLabel, splitX, modelTop + modelH / 2 - 6,
      { width: rightW, align: "center" });

    // Row dividers
    const rowH = modelH / rows;
    doc.strokeColor(hex("D1D5DB")).lineWidth(0.5);
    for (let i = 1; i < rows; i++) {
      const ry = modelTop + i * rowH;
      doc.moveTo(x, ry).lineTo(x + modelW, ry).stroke();
    }

    // Split line (dashed)
    doc.strokeColor(hex(col)).lineWidth(1).dash(4, { space: 3 });
    doc.moveTo(splitX, modelTop).lineTo(splitX, modelTop + modelH).stroke();
    doc.undash();

    // Outer border
    doc.rect(x, modelTop, modelW, modelH)
      .strokeColor(hex(col)).lineWidth(1.5).stroke();
    doc.restore();

    // Row label on the left
    doc.fontSize(12).font("Sans-Bold").fillColor(hex(col));
    doc.text(String(rows), M, modelTop + modelH / 2 - 7,
      { width: indent - 4, align: "center" });

    return modelTop + modelH + 8;
  }

  // ── Problem 1: 3 × 16 = 3 × 10 + 3 × □  (find the addend) ──────────────
  y = addSectionHeading(doc, "Problem 1:  3 × 16 = 3 × 10 + 3 × □", y, { color: col });
  y = drawAreaModel(y, 3, 16, 10, "□");

  doc.fontSize(10).font("Sans").fillColor("#000000");
  doc.text("Step 1:  The WHOLE rectangle is 3 rows × 16 columns.", M, y); y += 14;
  doc.text("Step 2:  The LEFT section has 10 columns  →  3 × 10", M, y); y += 14;
  doc.text("Step 3:  Count columns in the RIGHT section:  16 − 10 = ____", M, y); y += 14;
  doc.text("Step 4:  So  □ = ____", M, y); y += 20;

  // ── Problem 2: 8 × 23 = 8 × 20 + 8 × □  (find the addend) ──────────────
  y = addSectionHeading(doc, "Problem 2:  8 × 23 = 8 × 20 + 8 × □", y, { color: col });
  y = drawAreaModel(y, 8, 23, 20, "□");

  doc.fontSize(10).font("Sans").fillColor("#000000");
  doc.text("Step 1:  The WHOLE rectangle is ____ rows × ____ columns.", M, y); y += 14;
  doc.text("Step 2:  The LEFT section has ____ columns  →  ____ × ____", M, y); y += 14;
  doc.text("Step 3:  Columns in the RIGHT section:  23 − 20 = ____", M, y); y += 14;
  doc.text("Step 4:  So  □ = ____", M, y); y += 20;

  // ── Problem 3: 9 × □ = 9 × 20 + 9 × 5  (find the whole number) ─────────
  y = addSectionHeading(doc, "Problem 3:  9 × □ = 9 × 20 + 9 × 5", y, { color: col });
  y = drawAreaModel(y, 9, 25, 20, "5");

  doc.fontSize(10).font("Sans").fillColor("#000000");
  doc.text("Step 1:  The LEFT section has 20 columns.  The RIGHT has 5 columns.", M, y); y += 14;
  doc.text("Step 2:  Total columns  =  20  +  5  = ____", M, y); y += 14;
  doc.text("Step 3:  So  □ = ____", M, y); y += 20;

  addPdfFooter(doc, "Session 3 of 6 | Algebra: Unknown Values | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/SR2_Enabling_Scaffold.pdf");
}

async function generateEXT1() {
  const doc = createPdf({ title: "EXT1 — Distribution Over Subtraction" });
  let y = addPdfHeader(doc, "Investigation: Distribution Over Subtraction", {
    subtitle: "EXT1 — Extending Challenge", color: C.ACCENT,
    lessonInfo: "Session 3 of 6 | Algebra: Unknown Values | Year 5/6 Maths",
  });
  y = addSectionHeading(doc, "What You Know", y, { color: C.ACCENT });
  y = addBodyText(doc, "The distributive property works with addition: 4 × 13 = 4 × 10 + 4 × 3 = 52.", y);
  y = addBodyText(doc, "But does it work with SUBTRACTION? Can you break apart using minus instead of plus?", y);
  y = addSectionHeading(doc, "Worked Example", y, { color: C.ACCENT });
  y = addBodyText(doc, "7 × 99: Think of 99 as 100 - 1.", y);
  y = addBodyText(doc, "7 × 99 = 7 × (100 - 1) = 7 × 100 - 7 × 1 = 700 - 7 = 693.", y, { italic: true });
  y = addBodyText(doc, "Check: 7 × 99 = 693. ✓ It works!", y);
  y = addSectionHeading(doc, "Your Investigation", y, { color: C.ACCENT });
  y = addProblem(doc, 1, "Calculate 6 × 98 using the distributive property over subtraction. Hint: 98 = 100 - 2.", y, {
    writeLines: [{ label: "6 × 98 = 6 × (___  - ___) = 6 × ___ - 6 × ___ =" }], color: C.ACCENT,
  });
  y = addProblem(doc, 2, "Calculate 8 × 47 by splitting 47 as 50 - 3.", y, {
    writeLines: [{ label: "8 × 47 = 8 × ___ - 8 × ___ =" }], color: C.ACCENT,
  });
  y = addProblem(doc, 3, "Create your own: choose a multiplication and solve it using distribution over subtraction.", y, {
    writeLines: [{ label: "My multiplication:" }, { label: "Distribution:" }, { label: "Answer:" }], color: C.ACCENT,
  });
  y = addTipBox(doc, "When is distribution over subtraction MORE useful than over addition? Think about numbers close to a round number (like 99, 48, 197...).", y, { color: C.ACCENT });
  addPdfFooter(doc, "Session 3 of 6 | Algebra: Unknown Values | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/EXT1_Distribution_Subtraction.pdf");
}

build().catch(err => { console.error(err); process.exit(1); });
