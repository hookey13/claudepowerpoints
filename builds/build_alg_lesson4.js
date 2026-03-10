// Lesson 4 of 6: Combining Properties to Find Unknowns
// Year 5/6 Mathematics — Algebra: Finding Unknown Values
// VC2M5A02 — using associative property and factor decomposition
// Week 1, Session 4

"use strict";

const pptxgen = require("pptxgenjs");
const { createTheme } = require("../themes/factory");
const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addBodyText, addProblem, addTipBox, addPdfFooter,
  addWriteLine, addStepInstructions, addResourceSlide,
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

const OUT_DIR = "output/ALG_Lesson4_Combining_Properties";
const RES_DIR = OUT_DIR + "/resources-lesson4";
const FOOTER = "Session 4 of 6 | Algebra: Unknown Values | Year 5/6 Maths";

const NOTES_TITLE = `**SAY:**
• "We now have three tools: equivalence, commutative/associative, and distributive. Today we combine them to crack harder equations."
• "You'll decompose factors and use the associative property to find unknowns that aren't obvious."

**DO:**
• Display the title slide. Whiteboards ready.

**TEACHER NOTES:**
Lesson 4 synthesises Lessons 1-3. The curriculum reference is VC2M5A02 elaboration 5: "considering 3 × 4 = 12 and knowing 2 × 2 = 4, then 3 × 4 can be written as 3 × (2 × 2) and, using the associative property, (3 × 2) × 2 so 3 × 4 = 6 × 2 and so 6 is the solution to 3 × 4 = □ × 2." This is the most algebraically demanding lesson in the first half of the unit. Students need solid understanding of all three properties.

**WATCH FOR:**
• Students who struggled with L2 (associative) or L3 (distributive) exit tickets — they may need pre-teaching.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR = `**SAY:**
• "Daily Review: Rounding in addition and subtraction."
• "Problem 1: Round 347 + 582 to the nearest hundred, then calculate the estimate." [300 + 600 = 900]
• "Problem 2: 8,256 - 3,471. Estimate first by rounding to thousands." [8,000 - 3,000 = 5,000]
• "Problem 3: 23.7 + 46.8. Round to the nearest whole number and estimate." [24 + 47 = 71]

**DO:**
• Display the slide. Students work on whiteboards, 15 seconds per problem. "Show me!"
• Emphasise: "An estimate uses rounded numbers. It's NOT the exact answer — it's a quick check."

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Round and estimate on your board. Show me!"
• Scan for: reasonable estimates on ≥80% of boards.
PROCEED: If ≥80% correct estimates, move to Fluency.
PIVOT: If students calculate exactly instead of rounding, reteach: "Rounding means replacing each number with its nearest hundred (or thousand). 347 rounds to 300. 582 rounds to 600. THEN add: 300 + 600 = 900. That's the estimate." Re-check: "Estimate 678 + 215 by rounding to hundreds."

**TEACHER NOTES:**
Daily Review targets: "Four Processes — I can use rounding in addition and subtraction calculations." This is retrieval practice from prior learning and connects to estimation strategies students will use in later lessons to verify their algebraic solutions ("Is my answer reasonable?").

**WATCH FOR:**
• Students who calculate exactly instead of estimating — they may not understand the purpose of rounding.
• Students who round incorrectly (347 → 400 instead of 300) — review the rounding rule.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
• "Number Talk: I'll show you a multiplication. You solve it mentally and explain your strategy."
• "24 × 5. Think about it. No pencil — mental only. When you have an answer and a strategy, show me a quiet thumbs up."
• After most thumbs: "Who wants to share? What did you get and HOW?"
• Possible strategies: 24 × 5 = 12 × 10 = 120 (doubling/halving); 20 × 5 + 4 × 5 = 120 (distributive); 24 × 10 ÷ 2 = 120.
• "Multiple strategies, same answer. That's the power of number properties."

**DO:**
• Display the problem. Wait for thumbs up (no rushing).
• Take 3-4 strategies. Record them briefly on the board or verbally.
• Second problem if time: "36 × 5."

**TEACHER NOTES:**
Number Talks are a different fluency format from the sprint/chain activities in previous lessons — variety as required by the mega-prompt. The mental strategies students share are exactly the properties they've been studying: doubling/halving uses the associative property (24 × 5 = 12 × 2 × 5 = 12 × 10), the break-apart strategy uses the distributive property. Naming these connections reinforces that "number properties" aren't abstract rules — they're the strategies students already use.

**WATCH FOR:**
• Students who can only use one strategy — encourage: "Can you think of a different way?"
• Students who share a strategy that uses a property — name it: "You just used the distributive property!"

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
• Read from slide: "We are learning to use factors and number properties to find unknown values in multiplication equations."
• "SC1 is about decomposing — breaking a factor into its own factors. SC2 is the big one — using the associative property to rearrange and find □. SC3 asks you to explain your reasoning."

**DO:**
• Display the slide. Point to each SC.
• "SC2 is our main target."

**PACING OVERVIEW:**
Daily Review 5 min, Fluency 4 min, LI/SC 2 min, I Do 12 min, We Do 12 min, You Do 12 min, Exit Ticket 5 min, Closing 3 min.

**TEACHER NOTES:**
The LI addresses VC2M5A02 elaboration 5 directly. SC1 (factor decomposition) is the prerequisite skill from the NP unit — students need to identify that 4 = 2 × 2 before they can rewrite 3 × 4 as 3 × (2 × 2). SC2 (finding unknowns using associativity) is the core new learning. SC3 (explaining reasoning) extends to mathematical communication, which is assessed in the exit ticket.

**WATCH FOR:**
• Students who don't connect "decomposing factors" to their prior learning on factor pairs.

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_IDO1 = `**SAY:**
• "Watch me solve: 3 × 4 = □ × 2. What is □?"
• Think-aloud: "I could just calculate: 3 × 4 = 12, then 12 ÷ 2 = 6, so □ = 6. But today I want to show you WHY □ = 6 using properties."
• "I know that 4 = 2 × 2. So I can rewrite 3 × 4 as 3 × (2 × 2)."
• "Now I use the associative property to regroup: 3 × (2 × 2) = (3 × 2) × 2 = 6 × 2."
• "So 3 × 4 = 6 × 2, which means □ = 6."
• Decision point: "Why did I decompose 4 into 2 × 2 specifically? Because the equation has × 2 on the right side. I needed a 2 in my decomposition to match."
• Self-monitoring: "Verify: 3 × 4 = 12. 6 × 2 = 12. Both sides equal 12. ✓"

**DO:**
• Display the slide with step-by-step working.
• Emphasise the factor decomposition step (4 = 2 × 2) and the regrouping step.
• Circle the matching × 2 on both sides.

**TEACHER NOTES:**
This is the exact example from VC2M5A02 elaboration 5. The think-aloud makes two critical moves visible: (1) the strategic decomposition of 4 into 2 × 2 to match the × 2 in the target equation, and (2) the associative regrouping to isolate □. The decision point is crucial — students need to understand that the decomposition is not random but deliberately chosen to match the structure of the equation. The "I could just calculate" opening validates students who use division but shows that the property-based approach explains the underlying structure.

**MISCONCEPTIONS:**
• Misconception: "I can always just divide to find the unknown — I don't need properties."
  Why: Division IS valid for these equations. But properties explain WHY the unknown has a particular value and generalise to more complex equations where simple division doesn't work.
  Impact: Students who only rely on calculation will struggle with multi-step equations in Lessons 5-6.
  Quick correction: "Division gives you the answer. Properties explain the REASON. Both matter — today we focus on the reason."

**WATCH FOR:**
• Students who immediately say "□ = 6" by dividing 12 ÷ 2 — validate but redirect to the property-based method.
• Students confused by the factor decomposition step — "4 = 2 × 2" may seem like a strange move if they don't see the strategic purpose.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_IDO2 = `**SAY:**
• "Here's another: 5 × 6 = □ × 3. Find □ using properties."
• Think-aloud: "The right side has × 3. So I need to find a 3 inside the left side. What factor of 6 is 3? 6 = 3 × 2. So I decompose: 5 × 6 = 5 × (3 × 2)."
• "Regroup: 5 × (3 × 2). I need the 3 on the outside. Use commutativity first: 3 × 2 = 2 × 3. So 5 × (2 × 3)."
• "Now associative: (5 × 2) × 3 = 10 × 3."
• "So 5 × 6 = 10 × 3. □ = 10."
• Connection: "I used THREE properties here: decomposition (6 = 3 × 2), commutativity (3 × 2 = 2 × 3), and associativity (regroup to isolate × 3). They work together."
• "Verify: 5 × 6 = 30. 10 × 3 = 30. ✓"

**DO:**
• Display step-by-step. Show each property labelled.
• Emphasise: "I looked at the right side (× 3) and worked BACKWARDS to create it."

**TEACHER NOTES:**
This second I Do demonstrates the full three-property strategy. The key insight is working backwards from the target equation structure — if the right side has × 3, decompose the left side to produce a × 3 factor. This is a more sophisticated example than I Do 1 because it requires commutativity to rearrange before regrouping. The explicit labelling of each property (decomposition → commutativity → associativity) shows students the toolkit they're using.

**WATCH FOR:**
• Students who look overwhelmed by three properties in one problem — reassure: "Each step is simple. The power is using them together."
• Students who can follow but couldn't replicate — the We Do provides guided practice.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
• "Quick check. What factor decomposition would you use to solve: 4 × 6 = □ × 3?"
• "On your whiteboard, write how you would decompose 6 to match the × 3. You have 15 seconds."
• After boards: "6 = 3 × 2 or 6 = 2 × 3. Both work because we need a 3 to match × 3 on the right."
• Follow-up (Cold Call): "[Name], so what would □ be?" [8, because 4 × (2 × 3) = (4 × 2) × 3 = 8 × 3]

**DO:**
• Display the question. 15 seconds think time. "Show me!"
• Scan for 6 = 3 × 2 or equivalent on boards.
• Cold call for the final answer.

**CFU CHECKPOINT:**
Technique: Show Me Boards + Cold Call
Script:
• "Write the factor decomposition on your board. Show me!"
• Scan for: 6 = 3 × 2 (or 2 × 3) on ≥80% of boards.
PROCEED: If ≥80% identify the correct decomposition, students understand the strategic step. Move to We Do.
PIVOT: If students decompose 6 as 1 × 6 or just write "6," they don't see the strategic purpose. Reteach: "Look at the right side: □ × 3. I need a 3 in my decomposition. What are the factors of 6 that include 3? 3 × 2 = 6. That's the decomposition I need." Re-check: "8 × 9 = □ × 3. How would you decompose 9?"

**TEACHER NOTES:**
This CFU isolates the strategic decomposition step — the most challenging part of the combined-property method. If students can identify the right decomposition, they have the key to the entire procedure. The Cold Call extends to the full solution, checking whether students can complete the associative regrouping after decomposition.

**WATCH FOR:**
• Students who write 6 = 1 × 6 — valid decomposition but strategically useless for this equation.
• Students who correctly write 6 = 3 × 2 but can't proceed to □ = 8 — they need the regrouping modelled again.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
• "Together: 2 × 8 = □ × 4. Find □ using properties."
• Cold Call: "[Name], what's on the right side?" [□ × 4] "So I need a 4 inside the left side."
• Cold Call: "[Name], how can we decompose 8 to include a 4?" [8 = 4 × 2]
• "So 2 × 8 = 2 × (4 × 2). Now regroup: (2 × 4) × 2? No, wait — I need × 4 on the outside."
• Cold Call: "[Name], should I swap the factors inside first?" [Yes — 4 × 2 = 2 × 4, so 2 × (2 × 4)]
• "Now associate: (2 × 2) × 4 = 4 × 4. So □ = 4."
• "Verify: 2 × 8 = 16. 4 × 4 = 16. ✓"

**DO:**
• Display the equation. Use Cold Call for each step. Click to reveal.

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
• "[Name], what factor decomposition do we use?" "[Name], what's the regrouped form?"
PROCEED: If students provide correct steps, move to PP2.
PIVOT: If students can't decompose 8 to include 4, reteach: "What times what gives 8? 1×8, 2×4, 4×2. Which one has a 4? 4 × 2 or 2 × 4. Use that." Re-check: "6 × 10 = □ × 5. How do you decompose 10?"

**TEACHER NOTES:**
This problem pair mirrors I Do 1 in structure but with different numbers. The deliberate pause at "wait — I need × 4 on the outside" models the metacognitive checking that students must do when deciding how to regroup. The commutativity step (4 × 2 = 2 × 4) is needed to position the 4 for correct regrouping.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide a partially completed table: "2 × 8 = □ × 4. Step 1: 8 = ___ × ___. Step 2: 2 × (___ × ___). Step 3: (___ × ___) × 4. Step 4: □ = ___." Students fill blanks.

EXTENDING PROMPT:
• Task: "Find □: 3 × 8 = □ × 6. Hint: you might need to decompose BOTH factors. Can you find more than one way?"
• Extra Notes: This requires more creative decomposition — multiple solution paths exist.

**WATCH FOR:**
• Students who decompose 8 but then can't regroup — the associative step is the hurdle.
• Students who get □ = 4 and say "that's the same as 4 × 4 — obvious!" — they're seeing the pattern.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
• "Boards: 6 × 4 = □ × 8. Find □ using properties. You have 60 seconds."
• After boards: "Let me think through this. I need × 8 on the right. Is there an 8 in 6 × 4?"
• "6 × 4 = 24. 24 ÷ 8 = 3. So □ = 3."
• "But using properties: I need to CREATE an 8. 4 = part of 8? No. Let me think differently: 6 = 2 × 3. So 6 × 4 = (2 × 3) × 4 = 2 × (3 × 4) = 2 × 12. Hmm, that doesn't give × 8 directly."
• "Alternative: 6 × 4 = 24. 24 = 3 × 8. So □ × 8 = 3 × 8 → □ = 3."
• "Sometimes the fastest path is: calculate the product, then decompose into the target form."

**DO:**
• Display equation. 60 seconds on boards. Reveal.
• Discuss both approaches: property-based and calculate-then-decompose.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Write □ on your board. Show me!"
• Scan for: □ = 3 on ≥80%.
PROCEED: If ≥80% correct, move to hinge question.
PIVOT: If students write □ = 48 (6 × 4 × 8 — multiplying all three), reteach: "The equation says □ × 8 = 6 × 4 = 24. If □ × 8 = 24, then □ = 24 ÷ 8 = 3." Re-check: "4 × 5 = □ × 10. What's □?"

**TEACHER NOTES:**
This problem is deliberately harder — the decomposition path isn't as clean as previous examples. The "calculate then decompose" approach (find the product, then express it as □ × target) is a valid and often faster strategy. This builds flexibility — students should be able to use EITHER approach and choose the most efficient one. Both approaches give the same answer, but the property path requires more steps here.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Students use the calculate-first approach: "6 × 4 = ___. ___ ÷ 8 = ___. So □ = ___."

EXTENDING PROMPT:
• Task: "Find □: 5 × 12 = □ × 15. Can you use properties? When is the calculate-first method better?"
• Extra Notes: The EXT1 PDF explores when each method is more efficient.

**WATCH FOR:**
• Students stuck because the property path is messy — validate: "Sometimes calculating first IS the smart move."
• Students who solve both ways — excellent mathematical reasoning.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
• "Gate check. What is □ in: 4 × 9 = □ × 6? Show me fingers: A) 36, B) 6, C) 4, D) 2."
• After: "B — □ = 6. Because 4 × 9 = 36 and 36 ÷ 6 = 6. OR: 9 = 3 × 3, and... actually the property path is complex here. The key is: 4 × 9 = 36 = 6 × 6. So □ = 6."

**DO:**
• Display options. 15 seconds. "Show fingers." Scan. Reveal.

**CFU CHECKPOINT:**
Technique: Finger Voting
Script:
• "What's □? A=36, B=6, C=4, D=2. Fingers NOW."
• Scan for: B on ≥80%.
PROCEED: If ≥80% choose B, ready for You Do.
PIVOT: If A (students multiplied 4 × 9 but forgot to divide), reteach: "4 × 9 = 36. But the equation says □ × 6 = 36. So □ = 36 ÷ 6 = 6." Re-check: "3 × 8 = □ × 4. What's □?"

**TEACHER NOTES:**
Distractors: A (product without dividing), C (4 appears in the equation), D (common small-number guess). This hinge tests whether students can complete the full process — decompose/calculate, then find the unknown factor.

**WATCH FOR:**
• Students choosing A (36) — they found the product but didn't finish.
• Quick correct answers — ready for independent work.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
• Read from slide: "First: Decide your approach (properties or calculate-first). Next: Find □. Then: Verify and explain which properties you used."
• "Complete all problems on your worksheet."

**DO:**
• Distribute SR1. Circulate. Focus on students' reasoning, not just answers.

**TEACHER NOTES:**
The worksheet has 6 graduated problems. Problems 1-2 have clean decomposition paths (matching the I Do). Problems 3-4 work better with calculate-first. Problems 5-6 challenge students to explain which approach they chose and why.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: SR2 scaffold with the strategy steps pre-structured for each problem.

EXTENDING PROMPT:
• Task: EXT1 investigation on creating equations: "Make up 3 equations of the form a × b = □ × c where the properties path works cleanly. What makes a 'nice' equation?"

**WATCH FOR:**
• Students who calculate answers but can't explain using properties — push for reasoning.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
• "Exit ticket. Two questions. 3 minutes."

**DO:**
• Display exit ticket. Students work silently. Collect after 3 minutes.

**TEACHER NOTES:**
Q1: Find □ using properties (assess SC2). Q2: Explain reasoning (assess SC3). Data informs Lesson 5 — students who can combine properties will transition smoothly to order of operations.

[Maths: Summarise — Exit Ticket | VTLM 2.0: Monitor Progress]`;

const NOTES_RESOURCES = `**SAY:**
• "Printable resources for today."

**DO:**
• Print SR1 (class set), SR2 (enabling), EXT1 (extending).

**TEACHER NOTES:**
SR1 has 6 problems. SR2 provides structured scaffolding. EXT1 challenges students to design "nice" equations.

[Maths: Planning — Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
• "Success criteria check."
• "SC1: I can identify factors of a number to rewrite a multiplication. Thumbs."
• "SC2: I can use the associative property to find an unknown value. Thumbs."
• "SC3: I can explain my reasoning using mathematical properties. Thumbs."
• "Tomorrow we step up to equations with MULTIPLE operations and brackets — order of operations."

**DO:**
• Display closing slide. Run thumbs for each SC.

**TEACHER NOTES:**
The forward look to Lesson 5 signals the shift from single-operation to multi-operation equations. Students who are solid on properties will find order of operations an extension of the same thinking — but students who relied only on calculate-first will need to learn the new rules.

[Maths: Monitor Progress & Feedback | VTLM 2.0: Monitor Progress]`;

// ─────────────────────────────────────────────────────────────────────────────
async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  titleSlide(pres, "Combining Properties to Find Unknowns", "Factor Decomposition and the Associative Property",
    "Session 4 of 6  |  Year 5/6  |  Algebra", NOTES_TITLE);

  // DR — Rounding
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["1"]); addStageBadge(s, 1, "Daily Review");
    addTitle(s, "Rounding in Addition & Subtraction", { y: 0.65, fontSize: 22, color: STAGE_COLORS["1"] });
    const probs = [
      { q: "Estimate: 347 + 582 (round to nearest 100)", hint: "347 ≈ ? + 582 ≈ ?" },
      { q: "Estimate: 8,256 - 3,471 (round to nearest 1000)", hint: "8,256 ≈ ? - 3,471 ≈ ?" },
      { q: "Estimate: 23.7 + 46.8 (round to nearest whole)", hint: "23.7 ≈ ? + 46.8 ≈ ?" },
    ];
    probs.forEach((p, i) => {
      const cy = CONTENT_TOP + i * 1.1;
      addCard(s, 0.5, cy, 9, 0.9, { strip: STAGE_COLORS["1"] });
      s.addText((i+1) + ".  " + p.q, { x: 0.75, y: cy+0.08, w: 8.5, h: 0.4, fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL, margin: 0 });
      s.addText(p.hint, { x: 0.75, y: cy+0.5, w: 8.5, h: 0.3, fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0 });
    });
    addFooter(s, FOOTER); s.addNotes(NOTES_DR);
  }

  // Fluency — Number Talk
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["1"]); addStageBadge(s, 1, "Fluency");
    addTitle(s, "Number Talk", { y: 0.65, fontSize: 22, color: STAGE_COLORS["1"] });
    addTextOnShape(s, "24 × 5", { x: 2.5, y: CONTENT_TOP + 0.5, w: 5.0, h: 1.2, rectRadius: 0.1,
      fill: { color: STAGE_COLORS["1"] } },
      { fontSize: 48, fontFace: FONT_H, color: C.WHITE, bold: true });
    s.addText("Solve mentally. When you have an answer AND a strategy, show a quiet thumbs up.", {
      x: 1.0, y: CONTENT_TOP + 2.2, w: 8.0, h: 0.4, fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, align: "center", margin: 0 });
    addTextOnShape(s, "How many strategies can we find?", { x: 2.5, y: CONTENT_TOP + 3.0, w: 5.0, h: 0.4, rectRadius: 0.08,
      fill: { color: C.ALERT } },
      { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });
    addFooter(s, FOOTER); s.addNotes(NOTES_FLUENCY);
  }

  // LI/SC
  liSlide(pres,
    ["We are learning to use factors and number properties to find unknown values in multiplication equations"],
    ["I can identify factors of a number to rewrite a multiplication",
     "I can use the associative property to find an unknown value in an equation",
     "I can explain my reasoning using mathematical properties"],
    NOTES_LISC, FOOTER);

  // I Do 1
  workedExSlide(pres, 2, "Explicit Instruction", "Combining Properties: 3 × 4 = □ × 2",
    ["Given: 3 × 4 = □ × 2", "",
     "Step 1 — Decompose 4:", "4 = 2 × 2", "",
     "Step 2 — Rewrite:", "3 × 4 = 3 × (2 × 2)", "",
     "Step 3 — Associative regroup:", "(3 × 2) × 2 = 6 × 2", "",
     "So □ = 6  ✓"],
    NOTES_IDO1, FOOTER,
    (s) => {
      addTextOnShape(s, "3 × 4 = □ × 2", { x: 5.3, y: CONTENT_TOP+0.1, w: 3.8, h: 0.5, rectRadius: 0.08,
        fill: { color: C.PRIMARY } },
        { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
      // Decomposition
      addTextOnShape(s, "4 = 2 × 2", { x: 5.8, y: CONTENT_TOP+0.8, w: 2.5, h: 0.4, rectRadius: 0.08,
        fill: { color: C.SECONDARY } },
        { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });
      // Regrouping
      addTextOnShape(s, "(3 × 2) × 2", { x: 5.8, y: CONTENT_TOP+1.5, w: 2.5, h: 0.4, rectRadius: 0.08,
        fill: { color: C.ACCENT } },
        { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });
      // Answer
      addTextOnShape(s, "□ = 6", { x: 6.3, y: CONTENT_TOP+2.3, w: 1.8, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // I Do 2
  workedExSlide(pres, 2, "Explicit Instruction", "Three Properties Together: 5 × 6 = □ × 3",
    ["Given: 5 × 6 = □ × 3", "",
     "Step 1 — Decompose 6 to include 3:", "6 = 3 × 2 = 2 × 3 (commutative)", "",
     "Step 2 — Rewrite:", "5 × 6 = 5 × (2 × 3)", "",
     "Step 3 — Associative:", "(5 × 2) × 3 = 10 × 3", "",
     "So □ = 10  ✓"],
    NOTES_IDO2, FOOTER,
    (s) => {
      addTextOnShape(s, "5 × 6 = □ × 3", { x: 5.3, y: CONTENT_TOP+0.1, w: 3.8, h: 0.5, rectRadius: 0.08,
        fill: { color: C.PRIMARY } },
        { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
      // Properties used
      const props = [
        { label: "Decomposition", color: C.SECONDARY },
        { label: "Commutativity", color: C.ACCENT },
        { label: "Associativity", color: C.ALERT },
      ];
      props.forEach((p, i) => {
        addTextOnShape(s, p.label, { x: 5.5, y: CONTENT_TOP+0.8+i*0.5, w: 2.0, h: 0.35, rectRadius: 0.08,
          fill: { color: p.color } },
          { fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true });
      });
      addTextOnShape(s, "□ = 10", { x: 6.3, y: CONTENT_TOP+2.6, w: 1.8, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // CFU
  withReveal(
    () => cfuSlide(pres, "Stage 2", "Quick Check: Factor Decomposition",
      "Show Me Boards + Cold Call",
      "4 × 6 = □ × 3\n\nOn your board, write how you would decompose 6\nto match the × 3 on the right side.",
      NOTES_CFU1, FOOTER),
    (s) => {
      addTextOnShape(s, "6 = 3 × 2 → 4 × (2 × 3) → (4 × 2) × 3 = 8 × 3 → □ = 8", {
        x: 0.5, y: 4.0, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // We Do 1 — with reveal
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]); addStageBadge(s, 3, "Guided Practice");
      addTitle(s, "We Do: 2 × 8 = □ × 4", { y: 0.65, fontSize: 22, color: STAGE_COLORS["3"] });
      addTextOnShape(s, "2 × 8 = □ × 4", { x: 1.5, y: CONTENT_TOP+0.3, w: 7.0, h: 0.8, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["3"] } },
        { fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true });
      addCard(s, 0.5, CONTENT_TOP+1.5, 9, 2.0, { strip: STAGE_COLORS["3"] });
      s.addText([
        { text: "Step 1: Decompose 8 to include 4: 8 = ___ × ___", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 8 } },
        { text: "Step 2: Rewrite: 2 × (___ × ___)", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 8 } },
        { text: "Step 3: Regroup: (___ × ___) × 4 = ___ × 4", options: { fontSize: 15, color: C.CHARCOAL } },
      ], { x: 0.75, y: CONTENT_TOP+1.6, w: 8.5, h: 1.8, fontFace: FONT_B, margin: 0, valign: "top" });
      addFooter(s, FOOTER); s.addNotes(NOTES_WEDO1);
      return s;
    },
    (s) => {
      addTextOnShape(s, "8 = 2×4 → 2×(2×4) → (2×2)×4 = 4×4 → □ = 4", {
        x: 0.5, y: 4.2, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // We Do 2 — with reveal
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]); addStageBadge(s, 3, "Guided Practice");
      addTitle(s, "We Do: 6 × 4 = □ × 8", { y: 0.65, fontSize: 22, color: STAGE_COLORS["3"] });
      addTextOnShape(s, "6 × 4 = □ × 8", { x: 1.5, y: CONTENT_TOP+0.3, w: 7.0, h: 0.8, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["3"] } },
        { fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true });
      addTextOnShape(s, "60 seconds on your whiteboard!", { x: 2.0, y: CONTENT_TOP+1.5, w: 6.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.ALERT } },
        { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
      addCard(s, 0.5, CONTENT_TOP+2.3, 9, 1.0, { strip: STAGE_COLORS["3"] });
      s.addText("Hint: Try calculate-first if the property path is tricky.", {
        x: 0.75, y: CONTENT_TOP+2.5, w: 8.5, h: 0.6, fontSize: 13, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0, valign: "middle" });
      addFooter(s, FOOTER); s.addNotes(NOTES_WEDO2);
      return s;
    },
    (s) => {
      addTextOnShape(s, "6 × 4 = 24.  24 ÷ 8 = 3.  □ = 3.  Verify: 3 × 8 = 24 ✓", {
        x: 0.5, y: 4.2, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // Hinge
  withReveal(
    () => cfuSlide(pres, "Gate Check", "Find □:  4 × 9 = □ × 6",
      "Finger Voting",
      "A)  36\nB)  6\nC)  4\nD)  2\n\nHold up 1, 2, 3, or 4 fingers.",
      NOTES_HINGE, FOOTER),
    (s) => {
      addTextOnShape(s, "B)  □ = 6     (4 × 9 = 36, 36 ÷ 6 = 6)", {
        x: 1.5, y: 4.0, w: 7.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // You Do
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["4"]); addStageBadge(s, 4, "Independent Practice");
    addTitle(s, "You Do: Find the Unknown", { y: 0.65, fontSize: 22, color: STAGE_COLORS["4"] });
    addCard(s, 0.5, CONTENT_TOP, 9, 1.0, { strip: STAGE_COLORS["4"] });
    s.addText([
      { text: "First: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Decide: properties or calculate-first?", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "Next: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Find □.", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "Then: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Verify and name the property used.", options: { fontSize: 14, color: C.CHARCOAL } },
    ], { x: 0.75, y: CONTENT_TOP+0.05, w: 8.5, h: 0.9, fontFace: FONT_B, margin: 0, valign: "top" });
    const probs = ["1.  3 × 8 = □ × 4", "2.  5 × 6 = □ × 10", "3.  7 × 4 = □ × 2"];
    probs.forEach((p, i) => {
      s.addText(p, { x: 0.75, y: CONTENT_TOP+1.2+i*0.65, w: 8.5, h: 0.5, fontSize: 18, fontFace: FONT_H, color: C.CHARCOAL, margin: 0, valign: "middle" });
    });
    s.addText("Complete all 6 problems on your worksheet (SR1).", { x: 0.75, y: CONTENT_TOP+3.3, w: 8.5, h: 0.3, fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0 });
    addFooter(s, FOOTER); s.addNotes(NOTES_YOUDO);
  }

  // Exit Ticket
  exitTicketSlide(pres,
    ["Find □ using properties: 4 × 6 = □ × 3. Show each step and name the properties you used.",
     "Explain in words: Why does 3 × 4 = 6 × 2? Use the words 'associative' or 'decompose' in your answer."],
    NOTES_EXIT, FOOTER);

  // Resources
  addResourceSlide(pres,
    [{ name: "SR1 — Combining Properties Worksheet", fileName: "resources-lesson4/SR1_Combining_Properties.pdf", description: "6 problems using factor decomposition." },
     { name: "SR2 — Enabling Scaffold", fileName: "resources-lesson4/SR2_Enabling_Scaffold.pdf", description: "Step-by-step framework provided." },
     { name: "EXT1 — Design Your Own Equations", fileName: "resources-lesson4/EXT1_Design_Equations.pdf", description: "Extending: create equations where properties work cleanly." }],
    { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // Closing
  closingSlide(pres,
    "Turn & Talk: When would you use properties vs calculate-first to find an unknown?",
    ["SC1: I can identify factors to rewrite a multiplication",
     "SC2: I can use the associative property to find an unknown",
     "SC3: I can explain my reasoning using properties"],
    NOTES_CLOSING);

  await pres.writeFile({ fileName: OUT_DIR + "/ALG_Lesson4_Combining_Properties.pptx" });
  console.log("PPTX written.");
  await generateSR1(); await generateSR2(); await generateEXT1();
  console.log("All PDFs written.");
}

async function generateSR1() {
  const doc = createPdf({ title: "SR1 — Combining Properties" });
  let y = addPdfHeader(doc, "Combining Properties — Practice", { subtitle: "SR1 — Independent Practice", color: C.PRIMARY, lessonInfo: "Session 4 of 6 | Algebra | Year 5/6 Maths" });
  y = addTipBox(doc, "Method 1 (Properties): Decompose a factor, regroup with associativity, find □. Method 2 (Calculate-first): Find the product, divide by the target factor. Both work!", y, { color: C.SECONDARY });
  y = addProblem(doc, 1, "3 × 8 = □ × 4. Find □. Show your method.", y, { writeLines: [{ label: "Method:" }, { label: "□ =" }], color: C.PRIMARY });
  y = addProblem(doc, 2, "5 × 6 = □ × 10. Find □. Show your method.", y, { writeLines: [{ label: "Method:" }, { label: "□ =" }], color: C.PRIMARY });
  y = addProblem(doc, 3, "7 × 4 = □ × 2. Find □.", y, { writeLines: [{ label: "Method:" }, { label: "□ =" }], color: C.PRIMARY });
  y = addProblem(doc, 4, "8 × 9 = □ × 6. Find □.", y, { writeLines: [{ label: "Method:" }, { label: "□ =" }], color: C.PRIMARY });
  y = addProblem(doc, 5, "6 × 15 = □ × 5. Find □. Explain which method you chose and why.", y, { writeLines: [{ label: "□ =" }, { label: "Explanation:" }], color: C.PRIMARY });
  y = addProblem(doc, 6, "4 × 12 = □ × 8. Find □. Explain which method you chose and why.", y, { writeLines: [{ label: "□ =" }, { label: "Explanation:" }], color: C.PRIMARY });
  addPdfFooter(doc, "Session 4 of 6 | Algebra | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/SR1_Combining_Properties.pdf");
}

async function generateSR2() {
  const doc = createPdf({ title: "SR2 — Enabling Scaffold" });
  let y = addPdfHeader(doc, "Combining Properties — Scaffold", { subtitle: "SR2 — Enabling", color: C.SECONDARY, lessonInfo: "Session 4 of 6 | Algebra | Year 5/6 Maths" });
  y = addTipBox(doc, "Follow these steps for each problem. The framework is done — you fill in the numbers!", y, { color: C.SECONDARY });
  y = addProblem(doc, 1, "3 × 8 = □ × 4", y, { writeLines: [
    { label: "Step 1: 3 × 8 =" }, { label: "Step 2: ___ ÷ 4 =" }, { label: "□ =" }], color: C.SECONDARY });
  y = addProblem(doc, 2, "5 × 6 = □ × 10", y, { writeLines: [
    { label: "Step 1: 5 × 6 =" }, { label: "Step 2: ___ ÷ 10 =" }, { label: "□ =" }], color: C.SECONDARY });
  y = addProblem(doc, 3, "7 × 4 = □ × 2", y, { writeLines: [
    { label: "Step 1: 7 × 4 =" }, { label: "Step 2: ___ ÷ 2 =" }, { label: "□ =" }], color: C.SECONDARY });
  addPdfFooter(doc, "Session 4 of 6 | Algebra | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/SR2_Enabling_Scaffold.pdf");
}

async function generateEXT1() {
  const doc = createPdf({ title: "EXT1 — Design Your Own Equations" });
  let y = addPdfHeader(doc, "Design Your Own Equations", { subtitle: "EXT1 — Extending Challenge", color: C.ACCENT, lessonInfo: "Session 4 of 6 | Algebra | Year 5/6 Maths" });
  y = addSectionHeading(doc, "What Makes a 'Nice' Equation?", y, { color: C.ACCENT });
  y = addBodyText(doc, "Some equations like 3 × 4 = □ × 2 have a clean property path: decompose 4 = 2 × 2, regroup with associativity, done. Others require messy calculations. Your task: design equations where properties work smoothly.", y);
  y = addSectionHeading(doc, "Worked Example", y, { color: C.ACCENT });
  y = addBodyText(doc, "To make a × b = □ × c work cleanly, c must be a factor of b (or a must share a factor with c). Example: 5 × 12 = □ × 6 works because 12 = 6 × 2, so (5 × 2) × 6 = 10 × 6. □ = 10.", y);
  y = addSectionHeading(doc, "Your Equations", y, { color: C.ACCENT });
  y = addProblem(doc, 1, "Design an equation a × b = □ × c where c is a factor of b. Write it, solve it, and check.", y, {
    writeLines: [{ label: "My equation:" }, { label: "Solution:" }, { label: "Property path:" }], color: C.ACCENT });
  y = addProblem(doc, 2, "Design an equation where c is a factor of a instead. How is the solution path different?", y, {
    writeLines: [{ label: "My equation:" }, { label: "Solution:" }, { label: "What changed:" }], color: C.ACCENT });
  y = addProblem(doc, 3, "Design an equation where c is NOT a factor of a or b. Can you still solve it? What method works?", y, {
    writeLines: [{ label: "My equation:" }, { label: "Solution method:" }], color: C.ACCENT });
  y = addTipBox(doc, "Rule of thumb: the property path works cleanly when the numbers share common factors. When they don't, calculate-first is usually faster!", y, { color: C.ACCENT });
  addPdfFooter(doc, "Session 4 of 6 | Algebra | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/EXT1_Design_Equations.pdf");
}

build().catch(err => { console.error(err); process.exit(1); });
