// Lesson 6 of 6: Pairs of Unknowns in Complex Equations
// Year 5/6 Mathematics — Algebra: Finding Unknown Values
// VC2M6A02 — finding unknown values involving one or more operations;
//   recognising that □ + □ = 12 has multiple solutions
// Week 1, Session 6

"use strict";

const pptxgen = require("pptxgenjs");
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
  SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;

const OUT_DIR = "output/ALG_Lesson6_Pairs_of_Unknowns";
const RES_DIR = OUT_DIR + "/resources-lesson6";
const FOOTER = "Session 6 of 6 | Algebra: Unknown Values | Year 5/6 Maths";

const NOTES_TITLE = `**SAY:**
• "This is it — our final session. You've learned number properties, order of operations, brackets, and how to find unknowns. Today we combine EVERYTHING."
• "Today's challenge: equations with TWO unknowns. And sometimes, there's more than one right answer."

**DO:**
• Display the title slide. Whiteboards ready.

**TEACHER NOTES:**
Lesson 6 is the culminating lesson. It addresses VC2M6A02: "finding unknown values in numerical equations involving one or more operations" and specifically the elaboration about multiple solutions: "recognising that □ + □ = 12 has multiple solutions and could be 1 + 11, 2 + 10, 3 + 9, …" This lesson also introduces equations like 6 + 4 × 8 = 6 × Δ + □ where students apply all prior learning. The shift from single unknowns to pairs of unknowns represents genuine algebraic thinking — students must reason systematically about constraints.

**WATCH FOR:**
• Students who are excited by the open-ended nature of multiple solutions.
• Students who are unsettled by "more than one right answer" — reassure that this is normal in algebra.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR = `**SAY:**
• "Daily Review: Mixed review — we're cycling back across all our Daily Review topics."
• "Problem 1: Find the unknown pair: □ × Δ = 24 where □ > Δ. Give TWO possible answers." [e.g., 8 × 3, 6 × 4, 12 × 2, 24 × 1]
• "Problem 2: What is the LCM of 6 and 8?" [24]
• "Problem 3: Estimate 489 + 312 by rounding to hundreds." [500 + 300 = 800]

**DO:**
• Display the slide. Students work on whiteboards, 20 seconds per problem. "Show me!"
• Problem 1 previews today's lesson — multiple solutions for a pair of unknowns.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Show me your TWO solutions for Problem 1!"
• Scan for: two valid factor pairs on ≥80% of boards.
PROCEED: If ≥80% find two valid pairs, move to Fluency.
PIVOT: If students can only find one pair (or give the same pair twice like 4 × 6 and 6 × 4), reteach: "□ × Δ = 24 with □ > Δ means the first number is bigger. Let's list: 24 × 1, 12 × 2, 8 × 3, 6 × 4. Four pairs!" Re-check: "□ × Δ = 36, □ > Δ. Find two pairs."

**TEACHER NOTES:**
Daily Review cycles back across the unit's topics: factor pairs (L1-2), LCM (NP unit), estimation (L4-5). Problem 1 is deliberately chosen to preview the lesson — multiple valid solutions for a pair of unknowns. This connects the DR to the new content seamlessly.

**WATCH FOR:**
• Students who list 6 × 4 and 4 × 6 as different — clarify the □ > Δ constraint.
• Students who struggle with LCM — brief reteach if needed, but don't derail.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
• "Countdown challenge! I'll put an expression on the board. Evaluate it — race against the timer. 10 seconds each."
• "Expression 1: 3 + 2 × 5." [13]
• "Expression 2: (4 + 1) × 6." [30]
• "Expression 3: 12 ÷ 3 + 5 × 2." [14]
• "Expression 4: (8 − 3) × (2 + 4)." [30]
• Speed round — show answer on board when timer hits zero.

**DO:**
• Display expressions one at a time with a 10-second countdown.
• "Show me!" after each. Quick pace — this is fluency, not teaching.

**TEACHER NOTES:**
This fluency round consolidates Lesson 5's order of operations content. Expressions 3 and 4 are more complex — E3 has two operations at the same level (÷ and ×) interleaved with +, and E4 has two sets of brackets. These prepare students for the complexity of today's equations. If students struggle, the issue is from Lesson 5, not today's content — note who needs catch-up but don't reteach here.

**WATCH FOR:**
• Expression 3 is the trickiest — students must evaluate 12 ÷ 3 AND 5 × 2 before adding.
• Students who ace all four — they're ready for today's challenges.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
• Read from slide: "We are learning to find pairs of unknown values in equations with multiple operations."
• "SC1: I can find multiple solutions when an equation has two unknowns."
• "SC2: I can use number properties and order of operations to find unknowns in complex equations."
• "SC3: I can systematically list and check all possible solutions."

**DO:**
• Display the slide. Point to each SC.
• "SC3 is the big one — being SYSTEMATIC means you don't miss any solutions."

**PACING OVERVIEW:**
Daily Review 5 min, Fluency 4 min, LI/SC 2 min, I Do 12 min, We Do 12 min, You Do 12 min, Exit Ticket 5 min, Closing 3 min.

**TEACHER NOTES:**
SC1 introduces the concept of multiple solutions — a significant shift from earlier lessons where each equation had exactly one answer. SC2 connects to all prior content (properties + order of operations). SC3 emphasises systematic thinking — listing all possibilities rather than guessing. This aligns with the curriculum elaboration about □ + □ = 12 having "multiple solutions."

**WATCH FOR:**
• Students who seem worried about "multiple answers" — normalise: "In real algebra, many equations have more than one answer. Your job is to find ALL of them."

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_IDO1 = `**SAY:**
• "Let's start with a puzzle: □ + Δ = 12. What could □ and Δ be?"
• Think-aloud: "I'll be SYSTEMATIC. Start with □ = 1. Then Δ = 11. Next, □ = 2, Δ = 10. Then 3 + 9, 4 + 8, 5 + 7, 6 + 6."
• "That's 6 pairs if we use whole numbers from 1 to 11 (assuming □ and Δ are both positive)."
• "If □ = Δ, we get 6 + 6 = 12. If □ ≠ Δ, we get 5 pairs."
• "Now: What about □ + □ = 12? This is different — both unknowns are the SAME number."
• "□ + □ = 12 means 2 × □ = 12, so □ = 6. Only ONE solution."
• Decision point: "See the difference? □ + Δ (different letters) means different values are OK. □ + □ (same letter) means SAME value."

**DO:**
• Display the pairs systematically in a table on the slide.
• Highlight the distinction between □ + Δ and □ + □.

**TEACHER NOTES:**
This is the direct curriculum example: "recognising that □ + □ = 12 has multiple solutions and could be 1 + 11, 2 + 10, 3 + 9, …" The systematic listing (starting from 1, incrementing) demonstrates the organised approach students need. The distinction between different symbols (□ and Δ can differ) and same symbols (□ and □ must be equal) is crucial. At this level, restrict to positive whole numbers unless students raise decimals/negatives — validate but refocus.

**MISCONCEPTIONS:**
• Misconception: "□ + Δ = 12 has only one answer."
  Why: All previous lessons had exactly one answer. Students expect one right answer.
  Impact: Students will stop after finding one pair, missing the richness of the problem.
  Quick correction: "Finding ONE pair is great. But can you find ANOTHER? And another? How many can you find? Be systematic!"

**WATCH FOR:**
• Students who give one pair and stop — push: "Can you find them ALL?"
• Students who raise 0 + 12 — validate if you accept zero as a positive whole number in your class context.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_IDO2 = `**SAY:**
• "Now the big one. Ready? 6 + 4 × 8 = 6 × Δ + □. Find Δ and □."
• Think-aloud: "First, I evaluate the left side. Remember order of operations: 4 × 8 = 32, then 6 + 32 = 38."
• "So the equation becomes: 38 = 6 × Δ + □."
• "Strategy: Try values for Δ and see what □ must be."
• "If Δ = 1: 6 × 1 + □ = 38. 6 + □ = 38. □ = 32."
• "If Δ = 2: 6 × 2 + □ = 38. 12 + □ = 38. □ = 26."
• "If Δ = 3: 6 × 3 + □ = 38. 18 + □ = 38. □ = 20."
• "If Δ = 6: 6 × 6 + □ = 38. 36 + □ = 38. □ = 2."
• Self-monitoring: "Verify Δ = 6, □ = 2: 6 × 6 + 2 = 36 + 2 = 38. ✓"
• Decision point: "This equation has MANY solutions. But some are more 'interesting' than others. Δ = 6, □ = 2 is nice because the numbers are small."

**DO:**
• Display the equation. Show the systematic substitution.
• Build a table on the slide: Δ, 6 × Δ, □ = 38 − 6Δ.

**TEACHER NOTES:**
This equation (from the VC2M6A02 elaboration hint: "6 + 4 × 8 = 6 × Δ + □") combines everything: order of operations (evaluating the left side), substitution (trying values for Δ), and inverse operations (finding □ given Δ). The systematic table approach (try Δ = 1, 2, 3, …) models the organised thinking from SC3. Multiple valid solutions exist — restrict to positive whole numbers at this level. The "interesting" solution commentary encourages mathematical taste without invalidating other correct answers.

**MISCONCEPTIONS:**
• Misconception: "There should be one answer."
  Why: Prior experience. Every equation before this had one solution.
  Impact: Students stop searching after finding any valid pair.
  Quick correction: "With TWO unknowns, you often get MANY solutions. Your job is to find them systematically."

**WATCH FOR:**
• Students overwhelmed by the complexity — break it down: "Left side first. Then try numbers for Δ."
• Students who try Δ = 7: 6 × 7 = 42 > 38, so □ would be negative — discuss the boundary.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
• "Quick check. □ × Δ = 20, both whole numbers greater than 1. On your whiteboard, list ALL possible pairs."
• After boards: "The pairs are: 2 × 10, 4 × 5, 5 × 4, 10 × 2. If order matters, that's 4 pairs. If □ > Δ, just 2 pairs: 10 × 2 and 5 × 4."
• Follow-up (Cold Call): "[Name], why isn't 1 × 20 included?" [Because both must be greater than 1]

**DO:**
• Display question. 30 seconds. "Show me!"
• Scan for systematic listing on boards.

**CFU CHECKPOINT:**
Technique: Show Me Boards + Cold Call
Script:
• "List ALL pairs on your board. Show me!"
• Scan for: at least 2 valid pairs on ≥80%.
PROCEED: If ≥80% find at least 2 pairs with systematic listing, move to We Do.
PIVOT: If students find only one pair or are not systematic, reteach: "Start from the smallest factor greater than 1. Does 2 × ? = 20? Yes, 2 × 10. Does 3 × ? = 20? No, 20 ÷ 3 isn't whole. Does 4 × ? = 20? Yes, 4 × 5. Does 5 × ? = 20? Yes, 5 × 4. Keep going until the factors start repeating." Re-check: "□ × Δ = 18, both > 1."

**TEACHER NOTES:**
This CFU checks whether students can systematically find multiple solutions. The constraint "greater than 1" limits the search space and prevents students from defaulting to 1 × 20. The Cold Call extends by testing whether students understand and apply constraints.

**WATCH FOR:**
• Students who list 2 × 10 and 10 × 2 as the same — discuss whether order matters (it depends on the problem).
• Students who try every number from 2 to 19 — efficient but time-consuming. Guide them to stop when factors start repeating.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
• "Together: □ + Δ = 15, where □ > Δ and both are whole numbers ≥ 1."
• Cold Call: "[Name], what's the smallest Δ can be?" [1] "And then □ = ?" [14]
• "Let's list systematically. Δ = 1, □ = 14. Δ = 2, □ = 13. Keep going..."
• Cold Call: "[Name], when do we stop?" [When □ = Δ would happen — at 7 + 8, since 8 > 7. If □ must be GREATER, 8 + 7 is the last valid pair]
• "So we have: 14+1, 13+2, 12+3, 11+4, 10+5, 9+6, 8+7. Seven pairs."

**DO:**
• Display equation. Build the list together through Cold Call. Click to reveal full table.

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
• "[Name], give me one pair." "[Name], give me another."
PROCEED: If students contribute correct pairs fluently, move to PP2.
PIVOT: If students repeat pairs or can't find new ones, reteach using the systematic approach from smallest Δ upward.

**TEACHER NOTES:**
This problem parallels I Do 1 (□ + Δ = 12) but with a different target. The key learning is the systematic listing strategy and knowing when to stop. The constraint □ > Δ halves the search space and introduces students to using constraints to limit solutions — a core algebraic skill.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Partially filled table: "Δ = 1, □ = ___. Δ = 2, □ = ___. …" Students fill in.

EXTENDING PROMPT:
• Task: "What if we allow □ = Δ? How many MORE solutions do we get? What if we allow 0?"

**WATCH FOR:**
• Students who forget the constraint □ > Δ and list duplicates.
• Students who see the pattern: as Δ increases by 1, □ decreases by 1.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
• "Now the complex one. Boards: 5 + 3 × Δ = □. Find THREE pairs where Δ is 1, 2, or 3."
• "Remember: order of operations! 3 × Δ happens FIRST, then + 5."
• After boards:
• "Δ = 1: 5 + 3 × 1 = 5 + 3 = 8. So □ = 8."
• "Δ = 2: 5 + 3 × 2 = 5 + 6 = 11. So □ = 11."
• "Δ = 3: 5 + 3 × 3 = 5 + 9 = 14. So □ = 14."
• "Notice the pattern: □ goes up by 3 each time. Why?" [Because we're adding another group of 3]

**DO:**
• Display equation. 60 seconds on boards. Reveal all three pairs.
• Highlight the pattern: □ increases by 3 as Δ increases by 1.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Write all three pairs. Show me!"
• Scan for: all three correct on ≥80%.
PROCEED: If ≥80% find all three correctly (applying order of operations), move to hinge.
PIVOT: If students get wrong answers (e.g., adding before multiplying), reteach: "3 × Δ happens FIRST. THEN add 5. So for Δ = 2: 3 × 2 = 6, then 6 + 5 = 11."

**TEACHER NOTES:**
This We Do combines order of operations (from L5) with paired unknowns (today). The pattern (□ increases by 3 as Δ increases by 1) connects to the concept of a linear relationship, though this terminology isn't needed at this level. The observation that "we're adding another group of 3" connects back to the multiplicative thinking from earlier lessons.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Table with structure: "Δ = 1: 3 × 1 = ___. ___ + 5 = ___. □ = ___." For each value.

EXTENDING PROMPT:
• Task: "Predict: What is □ when Δ = 10? When Δ = 100? Can you write a RULE connecting □ and Δ?"

**WATCH FOR:**
• Students who see the +3 pattern and predict without calculating — excellent mathematical reasoning.
• Students who apply incorrect order of operations — redirect to L5 learning.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
• "Gate check. 4 × Δ + □ = 19. If Δ = 3, what is □?"
• "Show me fingers: A) 7, B) 19, C) 31, D) 12."
• After: "A — □ = 7. Because 4 × 3 = 12. 12 + □ = 19. □ = 7."

**DO:**
• Display options. 15 seconds. "Show fingers." Scan. Reveal.

**CFU CHECKPOINT:**
Technique: Finger Voting
Script:
• "Δ = 3. What's □? A=7, B=19, C=31, D=12. Fingers NOW."
• Scan for: A on ≥80%.
PROCEED: If ≥80% choose A, ready for You Do.
PIVOT: If D (students just calculated 4 × 3 and stopped), reteach: "4 × 3 = 12. But the equation says 12 + □ = 19. You still need to find □: 19 - 12 = 7." Re-check: "2 × Δ + □ = 15. If Δ = 4, what is □?"

**TEACHER NOTES:**
Distractors: A (correct), B (wrote the target 19 — didn't process), C (added 12 + 19), D (just calculated 4 × 3 without finishing). The most diagnostic wrong answer is D, indicating students who can partially solve but don't complete the process.

**WATCH FOR:**
• Students choosing D — they're halfway there but forgot the second step.
• Quick correct answers — ready for independent work.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
• Read from slide: "First: Identify all unknowns and constraints. Next: Try values systematically (start from the smallest). Then: Record all solutions and verify each one."
• "Complete all problems on your worksheet."

**DO:**
• Distribute SR1. Circulate. Focus on systematic listing and correct order of operations.

**TEACHER NOTES:**
The worksheet has 6 graduated problems: 1-2 are additive pairs (□ + Δ = target, with constraints), 3-4 combine multiplication and addition (substitution type), 5-6 are the complex multi-operation type. This covers both curriculum elements: multiple solutions for simple pairs AND combined-operation equations with unknowns.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: SR2 scaffold with tables pre-structured for systematic substitution.

EXTENDING PROMPT:
• Task: EXT1 investigation connecting pairs of unknowns to coordinate plots and rules.

**WATCH FOR:**
• Students who find some solutions but not all — push for systematic approach.
• Students who can solve but can't verify — emphasise substitution check.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
• "Final exit ticket of the unit. Two questions. 3 minutes."

**DO:**
• Display exit ticket. Students work silently. Collect after 3 minutes.

**TEACHER NOTES:**
Q1 assesses SC1+SC3 (find all solutions systematically). Q2 assesses SC2 (combined operations with paired unknowns). This exit ticket data gives a holistic picture of the unit — compare with L1 exit ticket data to measure growth. Students who couldn't find single unknowns in L1 but can now find paired unknowns have made significant progress.

[Maths: Summarise — Exit Ticket | VTLM 2.0: Monitor Progress]`;

const NOTES_RESOURCES = `**SAY:**
• "Printable resources for today."

**DO:**
• Print SR1 (class set), SR2 (enabling), EXT1 (extending).

**TEACHER NOTES:**
SR1 has 6 problems. SR2 provides table scaffolds. EXT1 extends to coordinate plotting and rules — enrichment for high-achieving students.

[Maths: Planning — Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
• "Success criteria check — one last time."
• "SC1: I can find multiple solutions when an equation has two unknowns. Thumbs."
• "SC2: I can use number properties and order of operations to find unknowns. Thumbs."
• "SC3: I can systematically list and check all possible solutions. Thumbs."
• "You started this unit not knowing what an 'unknown' was. Now you can solve equations with TWO unknowns, use brackets, apply properties, and work systematically. That's real algebra."
• "Well done. Give yourselves a round of applause."

**DO:**
• Display closing slide. Run thumbs for each SC. Celebrate.

**TEACHER NOTES:**
This closing should feel celebratory — the unit is complete. The summary statement connects L1 (simple unknowns) to L6 (paired unknowns in complex equations) to show the learning journey. If time permits, revisit one of the early equations from L1 and show how "easy" it seems now — this builds student confidence and metacognitive awareness of their own growth.

[Maths: Monitor Progress & Feedback | VTLM 2.0: Monitor Progress]`;

// ─────────────────────────────────────────────────────────────────────────────
async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  titleSlide(pres, "Pairs of Unknowns in Complex Equations", "Multiple Solutions and Systematic Thinking",
    "Session 6 of 6  |  Year 5/6  |  Algebra", NOTES_TITLE);

  // DR — Mixed Review
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["1"]); addStageBadge(s, 1, "Daily Review");
    addTitle(s, "Mixed Review", { y: 0.65, fontSize: 22, color: STAGE_COLORS["1"] });
    const probs = [
      { q: "□ × Δ = 24 where □ > Δ. Find TWO pairs.", hint: "Think: factor pairs of 24" },
      { q: "What is the LCM of 6 and 8?", hint: "Lowest Common Multiple" },
      { q: "Estimate: 489 + 312 (round to hundreds)", hint: "489 ≈ ?  312 ≈ ?" },
    ];
    probs.forEach((p, i) => {
      const cy = CONTENT_TOP + i * 1.1;
      addCard(s, 0.5, cy, 9, 0.9, { strip: STAGE_COLORS["1"] });
      s.addText((i+1) + ".  " + p.q, { x: 0.75, y: cy+0.08, w: 8.5, h: 0.4, fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL, margin: 0 });
      s.addText(p.hint, { x: 0.75, y: cy+0.5, w: 8.5, h: 0.3, fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0 });
    });
    addFooter(s, FOOTER); s.addNotes(NOTES_DR);
  }

  // Fluency — Countdown challenge
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["1"]); addStageBadge(s, 1, "Fluency");
    addTitle(s, "Order of Operations Countdown", { y: 0.65, fontSize: 22, color: STAGE_COLORS["1"] });
    const exprs = [
      "3 + 2 × 5",
      "(4 + 1) × 6",
      "12 ÷ 3 + 5 × 2",
      "(8 − 3) × (2 + 4)",
    ];
    exprs.forEach((e, i) => {
      const cy = CONTENT_TOP + i * 0.85;
      addCard(s, 0.5, cy, 9, 0.7, { strip: STAGE_COLORS["1"] });
      s.addText("E" + (i+1), { x: 0.75, y: cy+0.1, w: 0.5, h: 0.5, fontSize: 11, fontFace: FONT_B, color: C.MUTED, margin: 0 });
      s.addText(e, { x: 1.5, y: cy+0.05, w: 7.5, h: 0.6, fontSize: 22, fontFace: FONT_H, color: C.CHARCOAL, margin: 0, valign: "middle" });
    });
    s.addText("10 seconds per expression.  Show your answer on your board!", {
      x: 1.0, y: CONTENT_TOP+3.6, w: 8.0, h: 0.3, fontSize: 12, fontFace: FONT_B, color: C.MUTED, align: "center", italic: true, margin: 0 });
    addFooter(s, FOOTER); s.addNotes(NOTES_FLUENCY);
  }

  // LI/SC
  liSlide(pres,
    ["We are learning to find pairs of unknown values in equations with multiple operations"],
    ["I can find multiple solutions when an equation has two unknowns",
     "I can use number properties and order of operations to find unknowns in complex equations",
     "I can systematically list and check all possible solutions"],
    NOTES_LISC, FOOTER);

  // I Do 1 — Multiple solutions: □ + Δ = 12
  workedExSlide(pres, 2, "Explicit Instruction", "Multiple Solutions: □ + Δ = 12",
    ["How many ways can two whole numbers add to 12?", "",
     "Systematic approach (□ > Δ, both ≥ 1):", "",
     "11 + 1, 10 + 2, 9 + 3, 8 + 4, 7 + 5", "",
     "That's 5 pairs where □ > Δ.", "(Plus 6 + 6 if □ = Δ is allowed.)", "",
     "KEY: □ + □ = 12 → only ONE solution: □ = 6"],
    NOTES_IDO1, FOOTER,
    (s) => {
      // Right panel: table of solutions
      addTextOnShape(s, "□ + Δ = 12", { x: 5.3, y: CONTENT_TOP+0.1, w: 3.8, h: 0.45, rectRadius: 0.08,
        fill: { color: C.PRIMARY } },
        { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
      const pairs = ["11 + 1", "10 + 2", "9 + 3", "8 + 4", "7 + 5", "6 + 6"];
      pairs.forEach((p, i) => {
        const py = CONTENT_TOP + 0.7 + i * 0.38;
        addTextOnShape(s, p, { x: 5.8, y: py, w: 2.5, h: 0.3, rectRadius: 0.06,
          fill: { color: i < 5 ? C.SECONDARY : C.ACCENT } },
          { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });
      });
      addTextOnShape(s, "Many solutions!", { x: 5.6, y: CONTENT_TOP+3.1, w: 3.0, h: 0.35, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // I Do 2 — Complex equation: 6 + 4 × 8 = 6 × Δ + □
  workedExSlide(pres, 2, "Explicit Instruction", "Complex: 6 + 4 × 8 = 6 × Δ + □",
    ["Left side first (order of operations):", "4 × 8 = 32, then 6 + 32 = 38", "",
     "So: 6 × Δ + □ = 38", "",
     "Try Δ = 1: 6 + □ = 38 → □ = 32",
     "Try Δ = 2: 12 + □ = 38 → □ = 26",
     "Try Δ = 3: 18 + □ = 38 → □ = 20",
     "Try Δ = 6: 36 + □ = 38 → □ = 2"],
    NOTES_IDO2, FOOTER,
    (s) => {
      addTextOnShape(s, "6 + 4 × 8 = 6 × Δ + □", { x: 5.3, y: CONTENT_TOP+0.1, w: 4.0, h: 0.45, rectRadius: 0.08,
        fill: { color: C.PRIMARY } },
        { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
      // Table header
      addTextOnShape(s, "Δ    6×Δ    □", { x: 5.3, y: CONTENT_TOP+0.7, w: 4.0, h: 0.35, rectRadius: 0.06,
        fill: { color: C.CHARCOAL } },
        { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });
      const rows = [
        { d: "1", prod: "6", box: "32" },
        { d: "2", prod: "12", box: "26" },
        { d: "3", prod: "18", box: "20" },
        { d: "6", prod: "36", box: "2" },
      ];
      rows.forEach((r, i) => {
        const ry = CONTENT_TOP + 1.15 + i * 0.38;
        addTextOnShape(s, `${r.d}      ${r.prod}      ${r.box}`, { x: 5.3, y: ry, w: 4.0, h: 0.3, rectRadius: 0.06,
          fill: { color: i === 3 ? C.SUCCESS : C.BG_CARD } },
          { fontSize: 12, fontFace: FONT_B, color: i === 3 ? C.WHITE : C.CHARCOAL, bold: i === 3 });
      });
      addTextOnShape(s, "Multiple valid pairs!", { x: 5.6, y: CONTENT_TOP+2.9, w: 3.0, h: 0.35, rectRadius: 0.08,
        fill: { color: C.ALERT } },
        { fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // CFU — Systematic listing
  withReveal(
    () => cfuSlide(pres, "Stage 2", "Quick Check: List All Pairs",
      "Show Me Boards",
      "□ × Δ = 20\n(both whole numbers > 1)\n\nList ALL possible pairs on your board.",
      NOTES_CFU1, FOOTER),
    (s) => {
      addTextOnShape(s, "Pairs: 2×10, 4×5, 5×4, 10×2 (if order matters) or 2×10, 4×5 (if □ > Δ)", {
        x: 0.5, y: 4.0, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // We Do 1 — Additive pairs with constraint
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]); addStageBadge(s, 3, "Guided Practice");
      addTitle(s, "We Do: □ + Δ = 15 (□ > Δ, both ≥ 1)", { y: 0.65, fontSize: 20, color: STAGE_COLORS["3"] });
      addTextOnShape(s, "□ + Δ = 15  (□ > Δ)", { x: 1.5, y: CONTENT_TOP+0.3, w: 7.0, h: 0.7, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["3"] } },
        { fontSize: 26, fontFace: FONT_H, color: C.WHITE, bold: true });
      addCard(s, 0.5, CONTENT_TOP+1.3, 9, 2.2, { strip: STAGE_COLORS["3"] });
      s.addText([
        { text: "Start from the smallest Δ and work up:", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL, bold: true } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "Δ = 1, □ = ___    Δ = 2, □ = ___    Δ = 3, □ = ___", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "Δ = 4, □ = ___    Δ = 5, □ = ___    Δ = 6, □ = ___", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "Δ = 7, □ = ___    STOP! Why do we stop here?", options: { fontSize: 14, color: C.CHARCOAL } },
      ], { x: 0.75, y: CONTENT_TOP+1.4, w: 8.5, h: 2.0, fontFace: FONT_B, margin: 0, valign: "top" });
      addFooter(s, FOOTER); s.addNotes(NOTES_WEDO1);
      return s;
    },
    (s) => {
      addTextOnShape(s, "14+1, 13+2, 12+3, 11+4, 10+5, 9+6, 8+7 = 7 pairs. Stop at Δ=7 because □ must be > Δ.", {
        x: 0.5, y: 4.2, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // We Do 2 — Substitution with order of operations
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]); addStageBadge(s, 3, "Guided Practice");
      addTitle(s, "We Do: 5 + 3 × Δ = □", { y: 0.65, fontSize: 22, color: STAGE_COLORS["3"] });
      addTextOnShape(s, "5 + 3 × Δ = □", { x: 1.5, y: CONTENT_TOP+0.3, w: 7.0, h: 0.7, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["3"] } },
        { fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true });
      addCard(s, 0.5, CONTENT_TOP+1.3, 9, 2.2, { strip: STAGE_COLORS["3"] });
      s.addText([
        { text: "Find □ when Δ = 1, 2, and 3:", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL, bold: true } },
        { text: "Remember: multiplication BEFORE addition!", options: { breakLine: true, fontSize: 11, color: C.MUTED, italic: true } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "Δ = 1: 5 + 3 × 1 = 5 + ___ = ___", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "Δ = 2: 5 + 3 × 2 = 5 + ___ = ___", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "Δ = 3: 5 + 3 × 3 = 5 + ___ = ___", options: { fontSize: 15, color: C.CHARCOAL } },
      ], { x: 0.75, y: CONTENT_TOP+1.4, w: 8.5, h: 2.0, fontFace: FONT_B, margin: 0, valign: "top" });
      addFooter(s, FOOTER); s.addNotes(NOTES_WEDO2);
      return s;
    },
    (s) => {
      addTextOnShape(s, "Δ=1 → □=8    Δ=2 → □=11    Δ=3 → □=14    (Pattern: □ goes up by 3!)", {
        x: 0.5, y: 4.2, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 15, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // Hinge
  withReveal(
    () => cfuSlide(pres, "Gate Check", "4 × Δ + □ = 19.  If Δ = 3, what is □?",
      "Finger Voting",
      "A)  7\nB)  19\nC)  31\nD)  12\n\nHold up 1, 2, 3, or 4 fingers.",
      NOTES_HINGE, FOOTER),
    (s) => {
      addTextOnShape(s, "A)  □ = 7     (4 × 3 = 12, 12 + □ = 19, □ = 7)", {
        x: 1.5, y: 4.0, w: 7.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // You Do
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["4"]); addStageBadge(s, 4, "Independent Practice");
    addTitle(s, "You Do: Pairs of Unknowns", { y: 0.65, fontSize: 22, color: STAGE_COLORS["4"] });
    addCard(s, 0.5, CONTENT_TOP, 9, 0.9, { strip: STAGE_COLORS["4"] });
    s.addText([
      { text: "First: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Identify unknowns and constraints.", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "Next: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Try values systematically (start from the smallest).", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "Then: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Record ALL solutions and verify.", options: { fontSize: 14, color: C.CHARCOAL } },
    ], { x: 0.75, y: CONTENT_TOP+0.05, w: 8.5, h: 0.8, fontFace: FONT_B, margin: 0, valign: "top" });

    const probs = [
      "1.  □ + Δ = 18 (□ > Δ ≥ 1). List all pairs.",
      "2.  □ × Δ = 36 (both > 1). List all pairs.",
      "3.  2 × Δ + □ = 15. Find □ when Δ = 1, 2, 3, 4.",
    ];
    probs.forEach((p, i) => {
      s.addText(p, { x: 0.75, y: CONTENT_TOP+1.1+i*0.7, w: 8.5, h: 0.6, fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL, margin: 0, valign: "middle" });
    });
    s.addText("Complete all 6 problems on your worksheet (SR1).", { x: 0.75, y: CONTENT_TOP+3.4, w: 8.5, h: 0.3, fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0 });
    addFooter(s, FOOTER); s.addNotes(NOTES_YOUDO);
  }

  // Exit Ticket
  exitTicketSlide(pres,
    ["□ + Δ = 20 where □ > Δ ≥ 1. List ALL possible pairs. How many are there?",
     "3 × Δ + □ = 22. If Δ = 4, what is □? Show your working."],
    NOTES_EXIT, FOOTER);

  // Resources
  addResourceSlide(pres,
    [{ name: "SR1 — Pairs of Unknowns Worksheet", fileName: "resources-lesson6/SR1_Pairs_of_Unknowns.pdf", description: "6 problems: additive pairs + multi-operation." },
     { name: "SR2 — Enabling Scaffold", fileName: "resources-lesson6/SR2_Enabling_Scaffold.pdf", description: "Tables pre-structured for systematic listing." },
     { name: "EXT1 — Unknown Pairs & Patterns", fileName: "resources-lesson6/EXT1_Unknown_Pairs_Patterns.pdf", description: "Extending: discovering rules and coordinate connections." }],
    { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // Closing
  closingSlide(pres,
    "Turn & Talk: What was the BIGGEST thing you learned across all 6 sessions?",
    ["SC1: I can find multiple solutions for paired unknowns",
     "SC2: I can use properties and order of operations to solve complex equations",
     "SC3: I can systematically list and verify all solutions"],
    NOTES_CLOSING);

  await pres.writeFile({ fileName: OUT_DIR + "/ALG_Lesson6_Pairs_of_Unknowns.pptx" });
  console.log("PPTX written.");
  await generateSR1(); await generateSR2(); await generateEXT1();
  console.log("All PDFs written.");
}

async function generateSR1() {
  const doc = createPdf({ title: "SR1 — Pairs of Unknowns" });
  let y = addPdfHeader(doc, "Pairs of Unknowns — Practice", { subtitle: "SR1 — Independent Practice", color: C.PRIMARY, lessonInfo: "Session 6 of 6 | Algebra | Year 5/6 Maths" });
  y = addTipBox(doc, "When an equation has TWO unknowns, there may be MANY solutions. Be systematic: start from the smallest value and work up. Check your constraint (e.g., □ > Δ).", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Section A: Additive Pairs", y, { color: C.PRIMARY });
  y = addProblem(doc, 1, "□ + Δ = 18 where □ > Δ ≥ 1. List ALL pairs.", y, {
    writeLines: [{ label: "Pairs:" }, { label: "How many pairs?" }], color: C.PRIMARY });
  y = addProblem(doc, 2, "□ + Δ = 25 where □ > Δ ≥ 1. List ALL pairs.", y, {
    writeLines: [{ label: "Pairs:" }, { label: "How many pairs?" }], color: C.PRIMARY });

  y = addSectionHeading(doc, "Section B: Multiplicative Pairs", y, { color: C.PRIMARY });
  y = addProblem(doc, 3, "□ × Δ = 36 where both > 1. List ALL pairs.", y, {
    writeLines: [{ label: "Pairs:" }, { label: "How many pairs?" }], color: C.PRIMARY });

  y = addSectionHeading(doc, "Section C: Multi-Operation Equations", y, { color: C.PRIMARY });
  y = addProblem(doc, 4, "2 × Δ + □ = 15. Find □ when Δ = 1, 2, 3, 4.", y, {
    writeLines: [{ label: "Δ=1, □=" }, { label: "Δ=2, □=" }, { label: "Δ=3, □=" }, { label: "Δ=4, □=" }], color: C.PRIMARY });
  y = addProblem(doc, 5, "4 × Δ + □ = 25. Find □ when Δ = 1, 2, 3, 4, 5.", y, {
    writeLines: [{ label: "Δ=1, □=" }, { label: "Δ=2, □=" }, { label: "Δ=3, □=" }, { label: "Δ=4, □=" }, { label: "Δ=5, □=" }], color: C.PRIMARY });
  y = addProblem(doc, 6, "Challenge: 6 + 4 × 8 = 6 × Δ + □. Find THREE valid pairs for Δ and □.", y, {
    writeLines: [{ label: "Left side =" }, { label: "Pair 1: Δ=___, □=___" }, { label: "Pair 2: Δ=___, □=___" }, { label: "Pair 3: Δ=___, □=___" }], color: C.PRIMARY });

  addPdfFooter(doc, "Session 6 of 6 | Algebra | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/SR1_Pairs_of_Unknowns.pdf");
}

async function generateSR2() {
  const doc = createPdf({ title: "SR2 — Enabling Scaffold" });
  let y = addPdfHeader(doc, "Pairs of Unknowns — Scaffold", { subtitle: "SR2 — Enabling", color: C.SECONDARY, lessonInfo: "Session 6 of 6 | Algebra | Year 5/6 Maths" });
  y = addTipBox(doc, "Use the table below to work systematically. Start from the smallest value and increase by 1 each time.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Problem 1: □ + Δ = 18 (□ > Δ ≥ 1)", y, { color: C.SECONDARY });
  y = addBodyText(doc, "Fill in the table:", y);
  const pairs18 = ["Δ = 1, □ = 18 - 1 = ___", "Δ = 2, □ = 18 - 2 = ___", "Δ = 3, □ = 18 - 3 = ___",
    "Δ = 4, □ = ___", "Δ = 5, □ = ___", "Δ = 6, □ = ___", "Δ = 7, □ = ___", "Δ = 8, □ = ___"];
  pairs18.forEach(p => { y = addWriteLine(doc, p, y); });
  y = addBodyText(doc, "Stop when □ would equal Δ. How many pairs? ___", y);

  y = addSectionHeading(doc, "Problem 4: 2 × Δ + □ = 15", y, { color: C.SECONDARY });
  y = addBodyText(doc, "Step 1: Calculate 2 × Δ. Step 2: Subtract from 15 to find □.", y);
  y = addWriteLine(doc, "Δ = 1: 2 × 1 = ___. 15 - ___ = ___. □ = ___", y);
  y = addWriteLine(doc, "Δ = 2: 2 × 2 = ___. 15 - ___ = ___. □ = ___", y);
  y = addWriteLine(doc, "Δ = 3: 2 × 3 = ___. 15 - ___ = ___. □ = ___", y);
  y = addWriteLine(doc, "Δ = 4: 2 × 4 = ___. 15 - ___ = ___. □ = ___", y);

  addPdfFooter(doc, "Session 6 of 6 | Algebra | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/SR2_Enabling_Scaffold.pdf");
}

async function generateEXT1() {
  const doc = createPdf({ title: "EXT1 — Unknown Pairs & Patterns" });
  let y = addPdfHeader(doc, "Unknown Pairs & Patterns", { subtitle: "EXT1 — Extending Challenge", color: C.ACCENT, lessonInfo: "Session 6 of 6 | Algebra | Year 5/6 Maths" });
  y = addSectionHeading(doc, "Discovering the Rule", y, { color: C.ACCENT });
  y = addBodyText(doc, "When you found □ for different values of Δ in equations like 5 + 3 × Δ = □, you noticed a pattern. In this investigation, you'll discover the RULE that connects Δ and □.", y);

  y = addSectionHeading(doc, "Part 1: Spot the Pattern", y, { color: C.ACCENT });
  y = addProblem(doc, 1, "Complete the table for 2 + 4 × Δ = □:", y, {
    writeLines: [{ label: "Δ=1, □=___  |  Δ=2, □=___  |  Δ=3, □=___  |  Δ=4, □=___  |  Δ=5, □=___" },
      { label: "What pattern do you notice?" },
      { label: "Predict □ when Δ = 10:" },
      { label: "Write a RULE: □ = ___ × Δ + ___" }], color: C.ACCENT });

  y = addSectionHeading(doc, "Part 2: Create Your Own Rule", y, { color: C.ACCENT });
  y = addProblem(doc, 2, "Make up an equation of the form a + b × Δ = □. Complete a table for Δ = 1 to 5.", y, {
    writeLines: [{ label: "My equation:" }, { label: "Table:" }, { label: "Rule:" }], color: C.ACCENT });

  y = addSectionHeading(doc, "Part 3: Coordinate Connection (Extension)", y, { color: C.ACCENT });
  y = addBodyText(doc, "Plot your pairs (Δ, □) as coordinates on the grid below. What shape do they make? What does the pattern in the numbers look like on the graph?", y);
  y = addLinedArea(doc, y, 8);

  y = addTipBox(doc, "When pairs of numbers follow a constant pattern (going up by the same amount each time), the coordinates form a straight line. This is the beginning of a branch of maths called 'linear algebra'!", y, { color: C.ACCENT });
  addPdfFooter(doc, "Session 6 of 6 | Algebra | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/EXT1_Unknown_Pairs_Patterns.pdf");
}

build().catch(err => { console.error(err); process.exit(1); });
