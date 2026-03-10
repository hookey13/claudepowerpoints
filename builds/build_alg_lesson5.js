// Lesson 5 of 6: Order of Operations & Brackets
// Year 5/6 Mathematics — Algebra: Finding Unknown Values
// VC2M6A02 — recognising that 6 + 4 × 8 is not the same as (6 + 4) × 8
// Week 1, Session 5

"use strict";

const pptxgen = require("pptxgenjs");
const { createTheme } = require("../themes/factory");
const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addBodyText, addProblem, addTipBox, addPdfFooter,
  addWriteLine, addStepInstructions, addLinedArea, addResourceSlide,
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

const OUT_DIR = "output/ALG_Lesson5_Order_of_Operations";
const RES_DIR = OUT_DIR + "/resources-lesson5";
const FOOTER = "Session 5 of 6 | Algebra: Unknown Values | Year 5/6 Maths";

const NOTES_TITLE = `**SAY:**
• "Today we level up. Until now, every equation had ONE operation — multiplication or division. Today we tackle equations with TWO operations: addition AND multiplication, mixed together."
• "When you see 6 + 4 × 8, your brain might want to go left to right. But maths has rules about which operation comes first. Today we learn those rules and use brackets to change them."

**DO:**
• Display the title slide. Whiteboards ready.

**TEACHER NOTES:**
Lesson 5 marks the shift from VC2M5A02 (single-operation unknowns) to VC2M6A02 (multi-operation equations). The curriculum explicitly states students should recognise "that 6 + 4 × 8 is not the same as (6 + 4) × 8." This lesson establishes the order of operations convention (multiplication before addition) and introduces brackets as a tool to override that convention. This is foundational for Lesson 6, where students solve for unknowns in multi-operation equations.

**WATCH FOR:**
• Students who have encountered BODMAS/BIMDAS before — some may have partial understanding. Build on it.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR = `**SAY:**
• "Daily Review: Estimation strategies."
• "Problem 1: A school orders 48 boxes of pencils with 12 pencils each. Estimate the total." [50 × 12 = 600, or 48 × 10 = 480]
• "Problem 2: 397 × 6. Estimate by rounding one factor." [400 × 6 = 2,400]
• "Problem 3: 2,847 ÷ 7. Estimate." [2,800 ÷ 7 = 400]

**DO:**
• Display the slide. Students work on whiteboards, 15 seconds per problem. "Show me!"
• Accept multiple valid estimates — emphasise the strategy, not one "correct" estimate.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Estimate on your board. Show me!"
• Scan for: reasonable estimates using rounding on ≥80% of boards.
PROCEED: If ≥80% produce reasonable estimates, move to Fluency.
PIVOT: If students calculate exactly instead of estimating, reteach: "Estimating means rounding to make the calculation easy. 397 is close to 400. 400 × 6 is easy mental maths — 2,400. That's our estimate." Re-check: "Estimate 612 × 4."

**TEACHER NOTES:**
Daily Review targets: "Four Processes — I can use appropriate estimation strategies." This connects to the algebra work — students will need estimation to verify whether their solutions to multi-operation equations are reasonable (e.g., "I got 38 for 6 + 4 × 8. Does that seem about right? 4 × 8 is about 32, plus 6 is about 38. Yes.").

**WATCH FOR:**
• Students who round both factors (48 × 12 → 50 × 10) — valid but may lose accuracy. Discuss trade-offs.
• Students who can't decide what to round to — guide: "Round to the nearest easy number."

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
• "True or False sprint. I'll show a statement. Decide if it's true or false. Show thumbs up for true, thumbs down for false."
• "Statement 1: 3 × 4 = 4 × 3." [True — commutative]
• "Statement 2: 5 + 3 × 2 = 16." [False — it's 11, not 16. But students may say true if they go left to right!]
• "Hold that thought on Statement 2. We'll come back to it."
• "Statement 3: (2 + 3) × 4 = 2 × 4 + 3 × 4." [True — distributive property]
• "Statement 4: 10 - 3 + 2 = 10 - 5 = 5." [False — it's 9. Left to right for + and -]

**DO:**
• Display statements one at a time. Quick pace — 5 seconds per statement.
• Statement 2 is the hook — don't resolve it yet. Say "Interesting — we'll explore this."

**TEACHER NOTES:**
This True/False sprint is designed to surface the order-of-operations misconception organically. Statement 2 (5 + 3 × 2) will likely split the class — students who go left to right will get 16, while those who multiply first get 11. This creates productive cognitive conflict that motivates the new learning. Don't tell them the answer yet — use it as the hook for the I Do.

**WATCH FOR:**
• How the class splits on Statement 2 — the ratio tells you how much reteaching you'll need.
• Students who already know "multiplication first" — they may have prior exposure.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
• Read from slide: "We are learning to use the order of operations and brackets to evaluate and solve equations with more than one operation."
• "SC1: I know which operations to do first when there are no brackets."
• "SC2: I can use brackets to change which operation happens first."
• "SC3: I can find unknown values in equations with mixed operations."

**DO:**
• Display the slide. Point to each SC.
• "SC3 is what we're building towards — but we need SC1 and SC2 first."

**PACING OVERVIEW:**
Daily Review 5 min, Fluency 4 min, LI/SC 2 min, I Do 12 min, We Do 12 min, You Do 12 min, Exit Ticket 5 min, Closing 3 min.

**TEACHER NOTES:**
SC1 establishes the convention (multiplication/division before addition/subtraction). SC2 introduces brackets as an override. SC3 applies both to find unknowns — linking back to the unit's central skill. The progression is deliberate: understand the rules → use brackets → find unknowns using both.

**WATCH FOR:**
• Students who think "order of operations" is a fixed algorithm (BODMAS) to memorise — it's a convention, not a law of nature.

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_IDO1 = `**SAY:**
• "Back to Statement 2 from our sprint: 5 + 3 × 2. Some of you said 16, some said 11. Who's right?"
• "Mathematics has a convention — a rule everyone agrees on — about the ORDER of operations."
• "The rule: Multiplication and division come BEFORE addition and subtraction."
• Think-aloud: "5 + 3 × 2. I see addition AND multiplication. Multiplication first: 3 × 2 = 6. THEN addition: 5 + 6 = 11."
• "So 5 + 3 × 2 = 11, NOT 16. The answer is 11."
• "Let me try another: 6 + 4 × 8."
• "Multiplication first: 4 × 8 = 32. Then addition: 6 + 32 = 38."
• "NOT 10 × 8 = 80. The 6 + 4 does NOT happen first."
• Self-monitoring: "Does 38 make sense? 4 × 8 is 32, plus a bit more. Yes."

**DO:**
• Display the slide showing both interpretations visually.
• Circle the multiplication to emphasise "this happens first."
• Show the WRONG way crossed out.

**TEACHER NOTES:**
This is the curriculum example from VC2M6A02: "recognising that 6 + 4 × 8 is not the same as (6 + 4) × 8." The convention is that multiplication/division have higher precedence than addition/subtraction. This is not arbitrary — it follows from the algebraic structure of multiplication as repeated addition. However, at this level, present it as an agreed convention that lets everyone get the same answer. The wrong interpretation (left to right) is shown and explicitly crossed out.

**MISCONCEPTIONS:**
• Misconception: "You always work left to right."
  Why: Reading left to right is natural and reinforced in literacy. Students transfer this to maths.
  Impact: Students will get wrong answers on every multi-operation expression.
  Quick correction: "In reading, left to right is correct. In maths, the OPERATION tells you what to do first, not the position. × and ÷ jump the queue."

**WATCH FOR:**
• Students who got 16 during the sprint — they now see why it's wrong.
• Students who ask "Why does multiplication go first?" — great question. "It's a convention — an agreement. Like driving on the left. Everyone agrees so we all get the same answer."

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_IDO2 = `**SAY:**
• "But what if I WANT to add first? What if the problem NEEDS me to add before I multiply?"
• "That's what BRACKETS are for. Brackets say: DO THIS FIRST."
• "Watch: (6 + 4) × 8. The brackets around 6 + 4 say: add first."
• Think-aloud: "Inside brackets first: 6 + 4 = 10. Then multiply: 10 × 8 = 80."
• "Compare: 6 + 4 × 8 = 38. But (6 + 4) × 8 = 80. Same numbers, different answer."
• "The brackets CHANGED the order of operations."
• Decision point: "When I see brackets, I ALWAYS do what's inside them first — even if it's addition."
• "Let's try: 3 × (5 + 2). Brackets first: 5 + 2 = 7. Then: 3 × 7 = 21."
• Self-monitoring: "Without brackets: 3 × 5 + 2 = 15 + 2 = 17. With brackets: 21. Different answers. Brackets matter."

**DO:**
• Display the slide with both expressions side by side.
• Highlight brackets in a contrasting colour.
• Show the two different answers prominently.

**TEACHER NOTES:**
This directly addresses the curriculum example: "6 + 4 × 8 is not the same as (6 + 4) × 8." The side-by-side comparison makes the impact of brackets concrete. The second example (3 × (5 + 2) vs 3 × 5 + 2) reinforces the pattern and previews the distributive property connection — 3 × (5 + 2) = 3 × 5 + 3 × 2 — though this isn't the focus today.

**MISCONCEPTIONS:**
• Misconception: "Brackets don't change anything — they're just decoration."
  Why: Students may have seen brackets used merely for grouping without changing meaning.
  Impact: Students will ignore brackets and get wrong answers.
  Quick correction: "In maths, brackets are an INSTRUCTION. They say: do this part first. They're not optional."

**WATCH FOR:**
• The "aha" moment when students see that the same numbers give different answers.
• Students who connect this to the distributive property from Lesson 3 — validate but keep focus on order of operations.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
• "Quick check. What is 2 + 5 × 4? On your whiteboard. 15 seconds."
• After boards: "22. Multiplication first: 5 × 4 = 20. Then: 2 + 20 = 22."
• Follow-up: "Now what is (2 + 5) × 4? Same numbers, but brackets."
• After boards: "28. Brackets first: 2 + 5 = 7. Then: 7 × 4 = 28."

**DO:**
• Display first expression. 15 seconds. "Show me!" Scan. Reveal.
• Display second expression. 15 seconds. "Show me!" Scan. Reveal.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Solve 2 + 5 × 4 on your board. Show me!"
• Scan for: 22 on ≥80%.
• Then: "(2 + 5) × 4. Show me!"
• Scan for: 28 on ≥80%.
PROCEED: If ≥80% correct on both, students understand the convention. Move to We Do.
PIVOT: If students get 28 for both (ignoring order of operations on the first), reteach: "Without brackets: × first, then +. WITH brackets: inside first, then outside." Use the mnemonic: "× and ÷ are VIPs — they go first unless brackets override them." Re-check: "3 + 6 × 2. What's the answer? Now (3 + 6) × 2?"

**TEACHER NOTES:**
The paired questions test both conventions: without brackets (multiplication first) and with brackets (brackets first). Students who get both right have grasped the core concept. The common error is getting 28 for both — treating everything left to right.

**WATCH FOR:**
• Students who get the first right but hesitate on the second — they may be second-guessing themselves.
• Students who get both right confidently — they're ready for unknowns.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
• "Together: Find the value of □ in 3 + □ × 2 = 13."
• Cold Call: "[Name], what's the order of operations here?" [Multiplication first, then addition]
• "So □ × 2 happens first, then we add 3. That means □ × 2 = 13 - 3 = 10."
• Cold Call: "[Name], if □ × 2 = 10, what is □?" [□ = 5]
• "Verify: 3 + 5 × 2 = 3 + 10 = 13. ✓"
• Key insight: "I worked BACKWARDS from the answer. The last operation to happen was + 3, so I UNDO it first by subtracting 3."

**DO:**
• Display the equation. Cold Call through each step. Click to reveal.

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
• "[Name], which operation happens first?" "[Name], what do we undo first?"
PROCEED: If students identify the operations correctly and can undo them.
PIVOT: If students try 3 + □ = something first (wrong order), reteach: "Multiplication happens FIRST. So I need to undo the LAST thing that happened — the addition — before I can find □."

**TEACHER NOTES:**
This introduces the "working backwards" (inverse operations) strategy for multi-operation equations. The key insight: to find an unknown, undo operations in REVERSE order. The last operation applied was addition (because multiplication precedes it in the order), so subtract first to isolate the multiplication, then divide. This mirrors formal algebraic equation-solving but is presented concretely.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Scaffold: "13 - 3 = ___. So □ × 2 = ___. □ = ___ ÷ 2 = ___."

EXTENDING PROMPT:
• Task: "Find □: 7 + □ × 3 = 25. Then make up your own equation with the same structure."

**WATCH FOR:**
• Students who try to subtract 13 - 2 first — they're undoing in the wrong order.
• Students who see the "undo" logic — they're thinking algebraically.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
• "Now with brackets: Find □ in (□ + 4) × 3 = 21."
• "Boards: What happens first here?" [Inside brackets: □ + 4]
• "So (□ + 4) is calculated first, then multiplied by 3."
• "Working backwards: the LAST operation was × 3. Undo it: 21 ÷ 3 = 7."
• "So □ + 4 = 7."
• Cold Call: "[Name], what is □?" [□ = 3]
• "Verify: (3 + 4) × 3 = 7 × 3 = 21. ✓"

**DO:**
• Display equation. 30 seconds think time. Step through with Cold Call. Click to reveal.

**CFU CHECKPOINT:**
Technique: Show Me Boards + Cold Call
Script:
• "What do we undo first — the + 4 or the × 3?" [× 3]
• "Write □ on your board. Show me!"
• Scan for: □ = 3 on ≥80%.
PROCEED: If ≥80% correct, move to hinge.
PIVOT: If students undo + 4 first (getting 21 ÷ 3 = 7, then □ = 7 - 4 = 3 — actually this gives the right answer by accident in this case). Try alternative: if students get confused about which to undo first, reteach: "The LAST operation to happen in (□ + 4) × 3 is the × 3. We always undo the LAST operation first. 21 ÷ 3 = 7. Now □ + 4 = 7. Undo + 4: 7 - 4 = 3."

**TEACHER NOTES:**
With brackets, the undoing order changes. Without brackets, multiplication would come first in evaluation, so addition would be undone first in solving. WITH brackets, the bracket contents are evaluated first, so the multiplication (outside) is the LAST step — undo that first. This is a subtle but important distinction. The key heuristic: "Last operation done = first operation undone."

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: "21 ÷ 3 = ___. So □ + 4 = ___. □ = ___ - 4 = ___."

EXTENDING PROMPT:
• Task: "Find □: (□ + 5) × 4 = 36. Then: □ × (3 + 2) = 45. How is the second one different?"

**WATCH FOR:**
• Students who can follow the undo steps but don't understand WHY — push for explanation.
• Students confusing bracket equations with non-bracket equations — keep the two types visually distinct.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
• "Gate check. What is □ in: 4 + □ × 5 = 24?"
• "Show me fingers: A) 4, B) 28, C) 100, D) 1."
• After: "A — □ = 4. Multiplication first: □ × 5. Then + 4. Working backwards: 24 - 4 = 20. 20 ÷ 5 = 4."

**DO:**
• Display options. 15 seconds. "Show fingers." Scan. Reveal.

**CFU CHECKPOINT:**
Technique: Finger Voting
Script:
• "What's □? A=4, B=28, C=100, D=1. Fingers NOW."
• Scan for: A on ≥80%.
PROCEED: If ≥80% choose A, ready for You Do.
PIVOT: If B (students went left to right: 4 + □ = 24, □ = 20, 20 × 5 = 100 — hmm, or added first), reteach: "Remember: multiplication happens BEFORE addition. So × 5 happens first, then + 4. Undo: 24 - 4 = 20. 20 ÷ 5 = 4." Re-check: "2 + □ × 3 = 14. What's □?"

**TEACHER NOTES:**
Distractors: A (correct), B (if they calculate 24 + 4 = 28), C (if they multiply 4 × 5 × 5), D (if they guess). The most revealing wrong answer is B, indicating left-to-right thinking.

**WATCH FOR:**
• Students choosing B — they're still thinking left to right. Need targeted reteaching.
• Quick correct answers — ready for independent practice.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
• Read from slide: "First: Identify the operations and their order. Next: Work backwards — undo the last operation first. Then: Verify by substituting back."
• "Complete all problems on your worksheet."

**DO:**
• Distribute SR1. Circulate. Focus on whether students correctly identify the order of operations.

**TEACHER NOTES:**
The worksheet has 8 graduated problems: 1-2 are evaluation (no unknowns — just order of operations practice), 3-5 are unknowns without brackets, 6-8 are unknowns with brackets. This progression lets students practice the convention before applying it to unknowns.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: SR2 scaffold with "undo steps" pre-structured.

EXTENDING PROMPT:
• Task: EXT1 investigation on creating equations that have different answers with and without brackets.

**WATCH FOR:**
• Students who can evaluate expressions (Q1-2) but struggle to find unknowns (Q3+) — the backwards-working step is new.
• Students who confuse bracket and non-bracket rules.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
• "Exit ticket. Two questions. 3 minutes."

**DO:**
• Display exit ticket. Students work silently. Collect after 3 minutes.

**TEACHER NOTES:**
Q1 assesses SC1+SC3 (evaluate an expression using correct order, then find an unknown). Q2 assesses SC2 (impact of brackets). Data informs Lesson 6 — students who understand order of operations will handle complex multi-variable equations.

[Maths: Summarise — Exit Ticket | VTLM 2.0: Monitor Progress]`;

const NOTES_RESOURCES = `**SAY:**
• "Printable resources for today."

**DO:**
• Print SR1 (class set), SR2 (enabling), EXT1 (extending).

**TEACHER NOTES:**
SR1 has 8 problems. SR2 provides undo-step scaffolding. EXT1 challenges students to explore brackets and their effects.

[Maths: Planning — Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
• "Success criteria check."
• "SC1: I know which operations to do first when there are no brackets. Thumbs."
• "SC2: I can use brackets to change which operation happens first. Thumbs."
• "SC3: I can find unknown values in equations with mixed operations. Thumbs."
• "Tomorrow — our final lesson. Two unknowns in one equation. The ultimate challenge."

**DO:**
• Display closing slide. Run thumbs for each SC.

**TEACHER NOTES:**
The forward look to Lesson 6 signals the culmination of the unit. Students who are solid on order of operations and brackets will find the transition to paired unknowns manageable. Students who are still shaky need the evening to consolidate — consider sending home a practice sheet.

[Maths: Monitor Progress & Feedback | VTLM 2.0: Monitor Progress]`;

// ─────────────────────────────────────────────────────────────────────────────
async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  titleSlide(pres, "Order of Operations & Brackets", "Why 6 + 4 × 8 ≠ (6 + 4) × 8",
    "Session 5 of 6  |  Year 5/6  |  Algebra", NOTES_TITLE);

  // DR — Estimation Strategies
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["1"]); addStageBadge(s, 1, "Daily Review");
    addTitle(s, "Estimation Strategies", { y: 0.65, fontSize: 22, color: STAGE_COLORS["1"] });
    const probs = [
      { q: "48 boxes × 12 pencils each. Estimate the total.", hint: "Round one factor to make it easy" },
      { q: "397 × 6. Estimate by rounding.", hint: "397 ≈ ?" },
      { q: "2,847 ÷ 7. Estimate.", hint: "What nearby number divides easily by 7?" },
    ];
    probs.forEach((p, i) => {
      const cy = CONTENT_TOP + i * 1.1;
      addCard(s, 0.5, cy, 9, 0.9, { strip: STAGE_COLORS["1"] });
      s.addText((i+1) + ".  " + p.q, { x: 0.75, y: cy+0.08, w: 8.5, h: 0.4, fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL, margin: 0 });
      s.addText(p.hint, { x: 0.75, y: cy+0.5, w: 8.5, h: 0.3, fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0 });
    });
    addFooter(s, FOOTER); s.addNotes(NOTES_DR);
  }

  // Fluency — True/False Sprint
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["1"]); addStageBadge(s, 1, "Fluency");
    addTitle(s, "True or False Sprint", { y: 0.65, fontSize: 22, color: STAGE_COLORS["1"] });
    const stmts = [
      { text: "3 × 4 = 4 × 3", label: "Statement 1" },
      { text: "5 + 3 × 2 = 16", label: "Statement 2" },
      { text: "(2 + 3) × 4 = 2 × 4 + 3 × 4", label: "Statement 3" },
      { text: "10 − 3 + 2 = 5", label: "Statement 4" },
    ];
    stmts.forEach((st, i) => {
      const cy = CONTENT_TOP + i * 0.85;
      addCard(s, 0.5, cy, 9, 0.7, { strip: STAGE_COLORS["1"] });
      s.addText(st.label, { x: 0.75, y: cy+0.05, w: 1.5, h: 0.3, fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0 });
      s.addText(st.text, { x: 2.0, y: cy+0.1, w: 7.0, h: 0.5, fontSize: 20, fontFace: FONT_H, color: C.CHARCOAL, margin: 0, valign: "middle" });
    });
    s.addText("Thumbs up = TRUE.   Thumbs down = FALSE.", {
      x: 1.0, y: CONTENT_TOP+3.6, w: 8.0, h: 0.3, fontSize: 12, fontFace: FONT_B, color: C.MUTED, align: "center", italic: true, margin: 0 });
    addFooter(s, FOOTER); s.addNotes(NOTES_FLUENCY);
  }

  // LI/SC
  liSlide(pres,
    ["We are learning to use the order of operations and brackets to evaluate and solve equations with more than one operation"],
    ["I know which operations to do first when there are no brackets",
     "I can use brackets to change which operation happens first",
     "I can find unknown values in equations with mixed operations"],
    NOTES_LISC, FOOTER);

  // I Do 1 — Order of Operations
  workedExSlide(pres, 2, "Explicit Instruction", "Order of Operations: 6 + 4 × 8",
    ["Expression: 6 + 4 × 8", "",
     "Step 1 — Identify operations:", "Addition (+) and multiplication (×)", "",
     "Step 2 — Multiplication first:", "4 × 8 = 32", "",
     "Step 3 — Then addition:", "6 + 32 = 38", "",
     "Answer: 6 + 4 × 8 = 38"],
    NOTES_IDO1, FOOTER,
    (s) => {
      // Right panel: visual comparison
      addTextOnShape(s, "6 + 4 × 8 = 38  ✓", { x: 5.3, y: CONTENT_TOP+0.1, w: 4.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
      addTextOnShape(s, "× before +", { x: 5.8, y: CONTENT_TOP+0.8, w: 2.5, h: 0.35, rectRadius: 0.08,
        fill: { color: C.SECONDARY } },
        { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });
      // Wrong way
      addTextOnShape(s, "10 × 8 = 80  ✗", { x: 5.3, y: CONTENT_TOP+1.8, w: 4.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.ALERT } },
        { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
      addTextOnShape(s, "Left to right = WRONG", { x: 5.8, y: CONTENT_TOP+2.5, w: 2.5, h: 0.35, rectRadius: 0.08,
        fill: { color: C.ALERT } },
        { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });
    });

  // I Do 2 — Brackets
  workedExSlide(pres, 2, "Explicit Instruction", "Brackets Change the Order: (6 + 4) × 8",
    ["Expression: (6 + 4) × 8", "",
     "Step 1 — Brackets first:", "6 + 4 = 10", "",
     "Step 2 — Then multiply:", "10 × 8 = 80", "",
     "Compare:", "6 + 4 × 8 = 38", "(6 + 4) × 8 = 80", "",
     "Same numbers, different answer!"],
    NOTES_IDO2, FOOTER,
    (s) => {
      // Visual comparison panel
      addTextOnShape(s, "Without brackets", { x: 5.3, y: CONTENT_TOP+0.1, w: 4.0, h: 0.35, rectRadius: 0.08,
        fill: { color: C.PRIMARY } },
        { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });
      addTextOnShape(s, "6 + 4 × 8 = 38", { x: 5.3, y: CONTENT_TOP+0.55, w: 4.0, h: 0.45, rectRadius: 0.08,
        fill: { color: C.PRIMARY } },
        { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(s, "With brackets", { x: 5.3, y: CONTENT_TOP+1.3, w: 4.0, h: 0.35, rectRadius: 0.08,
        fill: { color: C.ACCENT } },
        { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });
      addTextOnShape(s, "(6 + 4) × 8 = 80", { x: 5.3, y: CONTENT_TOP+1.75, w: 4.0, h: 0.45, rectRadius: 0.08,
        fill: { color: C.ACCENT } },
        { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(s, "Brackets = DO THIS FIRST", { x: 5.5, y: CONTENT_TOP+2.7, w: 3.5, h: 0.4, rectRadius: 0.08,
        fill: { color: C.ALERT } },
        { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // CFU — Paired evaluation
  withReveal(
    () => cfuSlide(pres, "Stage 2", "Quick Check: Order of Operations",
      "Show Me Boards",
      "Solve both on your board:\n\n1.  2 + 5 × 4 = ?\n\n2.  (2 + 5) × 4 = ?",
      NOTES_CFU1, FOOTER),
    (s) => {
      addTextOnShape(s, "1.  2 + 5 × 4 = 2 + 20 = 22", {
        x: 0.5, y: 3.6, w: 9.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
      addTextOnShape(s, "2.  (2 + 5) × 4 = 7 × 4 = 28", {
        x: 0.5, y: 4.2, w: 9.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // We Do 1 — Finding unknowns without brackets
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]); addStageBadge(s, 3, "Guided Practice");
      addTitle(s, "We Do: 3 + □ × 2 = 13", { y: 0.65, fontSize: 22, color: STAGE_COLORS["3"] });
      addTextOnShape(s, "3 + □ × 2 = 13", { x: 1.5, y: CONTENT_TOP+0.3, w: 7.0, h: 0.8, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["3"] } },
        { fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true });
      addCard(s, 0.5, CONTENT_TOP+1.5, 9, 2.0, { strip: STAGE_COLORS["3"] });
      s.addText([
        { text: "Step 1: Which operation happens LAST?", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL, bold: true } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "Step 2: Undo the last operation: 13 - ___ = ___", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "Step 3: So □ × 2 = ___. Find □: ___ ÷ 2 = ___", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "Verify: 3 + ___ × 2 = ?", options: { fontSize: 15, color: C.CHARCOAL } },
      ], { x: 0.75, y: CONTENT_TOP+1.6, w: 8.5, h: 1.8, fontFace: FONT_B, margin: 0, valign: "top" });
      addFooter(s, FOOTER); s.addNotes(NOTES_WEDO1);
      return s;
    },
    (s) => {
      addTextOnShape(s, "Last op: + 3. Undo: 13 - 3 = 10. □ × 2 = 10. □ = 5. Verify: 3 + 5 × 2 = 13 ✓", {
        x: 0.5, y: 4.2, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // We Do 2 — Finding unknowns with brackets
  withReveal(
    () => {
      const s = pres.addSlide();
      s.background = { color: C.BG_LIGHT };
      addTopBar(s, STAGE_COLORS["3"]); addStageBadge(s, 3, "Guided Practice");
      addTitle(s, "We Do: (□ + 4) × 3 = 21", { y: 0.65, fontSize: 22, color: STAGE_COLORS["3"] });
      addTextOnShape(s, "(□ + 4) × 3 = 21", { x: 1.5, y: CONTENT_TOP+0.3, w: 7.0, h: 0.8, rectRadius: 0.08,
        fill: { color: STAGE_COLORS["3"] } },
        { fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true });
      addCard(s, 0.5, CONTENT_TOP+1.5, 9, 2.0, { strip: STAGE_COLORS["3"] });
      s.addText([
        { text: "Step 1: Which operation happens LAST?", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL, bold: true } },
        { text: "(Hint: brackets change the order!)", options: { breakLine: true, fontSize: 11, color: C.MUTED, italic: true } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "Step 2: Undo the last operation: 21 ÷ ___ = ___", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "Step 3: So □ + 4 = ___. Find □: ___ - 4 = ___", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "Verify: (___ + 4) × 3 = ?", options: { fontSize: 15, color: C.CHARCOAL } },
      ], { x: 0.75, y: CONTENT_TOP+1.6, w: 8.5, h: 1.8, fontFace: FONT_B, margin: 0, valign: "top" });
      addFooter(s, FOOTER); s.addNotes(NOTES_WEDO2);
      return s;
    },
    (s) => {
      addTextOnShape(s, "Last op: × 3. Undo: 21 ÷ 3 = 7. □ + 4 = 7. □ = 3. Verify: (3 + 4) × 3 = 21 ✓", {
        x: 0.5, y: 4.2, w: 9.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // Hinge
  withReveal(
    () => cfuSlide(pres, "Gate Check", "Find □:  4 + □ × 5 = 24",
      "Finger Voting",
      "A)  4\nB)  28\nC)  100\nD)  1\n\nHold up 1, 2, 3, or 4 fingers.",
      NOTES_HINGE, FOOTER),
    (s) => {
      addTextOnShape(s, "A)  □ = 4     (24 − 4 = 20, 20 ÷ 5 = 4)", {
        x: 1.5, y: 4.0, w: 7.0, h: 0.6, rectRadius: 0.08,
        fill: { color: C.SUCCESS } },
        { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

  // You Do
  {
    const s = pres.addSlide();
    s.background = { color: C.BG_LIGHT };
    addTopBar(s, STAGE_COLORS["4"]); addStageBadge(s, 4, "Independent Practice");
    addTitle(s, "You Do: Order of Operations & Unknowns", { y: 0.65, fontSize: 22, color: STAGE_COLORS["4"] });
    addCard(s, 0.5, CONTENT_TOP, 9, 0.9, { strip: STAGE_COLORS["4"] });
    s.addText([
      { text: "First: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Identify operations and their order.", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "Next: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Work backwards — undo the last operation first.", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "Then: ", options: { bold: true, fontSize: 14, color: STAGE_COLORS["4"] } },
      { text: "Verify by substituting back.", options: { fontSize: 14, color: C.CHARCOAL } },
    ], { x: 0.75, y: CONTENT_TOP+0.05, w: 8.5, h: 0.8, fontFace: FONT_B, margin: 0, valign: "top" });

    const probs = [
      "1.  Evaluate: 8 + 3 × 6 = ?",
      "2.  Evaluate: (8 + 3) × 6 = ?",
      "3.  Find □: 5 + □ × 3 = 20",
      "4.  Find □: (□ + 6) × 2 = 18",
    ];
    probs.forEach((p, i) => {
      s.addText(p, { x: 0.75, y: CONTENT_TOP+1.1+i*0.6, w: 8.5, h: 0.5, fontSize: 17, fontFace: FONT_H, color: C.CHARCOAL, margin: 0, valign: "middle" });
    });
    s.addText("Complete all 8 problems on your worksheet (SR1).", { x: 0.75, y: CONTENT_TOP+3.6, w: 8.5, h: 0.3, fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0 });
    addFooter(s, FOOTER); s.addNotes(NOTES_YOUDO);
  }

  // Exit Ticket
  exitTicketSlide(pres,
    ["Find □: 7 + □ × 4 = 27. Show your working.",
     "Explain: Why does 6 + 4 × 8 give a different answer to (6 + 4) × 8?"],
    NOTES_EXIT, FOOTER);

  // Resources
  addResourceSlide(pres,
    [{ name: "SR1 — Order of Operations Worksheet", fileName: "resources-lesson5/SR1_Order_of_Operations.pdf", description: "8 problems: evaluation + unknowns." },
     { name: "SR2 — Enabling Scaffold", fileName: "resources-lesson5/SR2_Enabling_Scaffold.pdf", description: "Step-by-step undo framework." },
     { name: "EXT1 — Brackets Investigation", fileName: "resources-lesson5/EXT1_Brackets_Investigation.pdf", description: "Exploring how brackets change answers." }],
    { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // Closing
  closingSlide(pres,
    "Turn & Talk: In your own words, what do brackets DO in a maths expression?",
    ["SC1: I know which operations to do first (× and ÷ before + and −)",
     "SC2: I can use brackets to change which operation happens first",
     "SC3: I can find unknown values in mixed-operation equations"],
    NOTES_CLOSING);

  await pres.writeFile({ fileName: OUT_DIR + "/ALG_Lesson5_Order_of_Operations.pptx" });
  console.log("PPTX written.");
  await generateSR1(); await generateSR2(); await generateEXT1();
  console.log("All PDFs written.");
}

async function generateSR1() {
  const doc = createPdf({ title: "SR1 — Order of Operations" });
  let y = addPdfHeader(doc, "Order of Operations — Practice", { subtitle: "SR1 — Independent Practice", color: C.PRIMARY, lessonInfo: "Session 5 of 6 | Algebra | Year 5/6 Maths" });
  y = addTipBox(doc, "Rules: 1) Brackets first. 2) × and ÷ before + and −. 3) Left to right for operations of equal rank.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Section A: Evaluate (no unknowns)", y, { color: C.PRIMARY });
  y = addProblem(doc, 1, "8 + 3 × 6 = ___", y, { writeLines: [{ label: "Working:" }, { label: "Answer:" }], color: C.PRIMARY });
  y = addProblem(doc, 2, "(8 + 3) × 6 = ___", y, { writeLines: [{ label: "Working:" }, { label: "Answer:" }], color: C.PRIMARY });

  y = addSectionHeading(doc, "Section B: Find the Unknown (no brackets)", y, { color: C.PRIMARY });
  y = addProblem(doc, 3, "5 + □ × 3 = 20. Find □.", y, { writeLines: [{ label: "Last operation:" }, { label: "Undo it:" }, { label: "□ =" }], color: C.PRIMARY });
  y = addProblem(doc, 4, "2 + □ × 7 = 30. Find □.", y, { writeLines: [{ label: "Last operation:" }, { label: "Undo it:" }, { label: "□ =" }], color: C.PRIMARY });
  y = addProblem(doc, 5, "□ × 4 + 6 = 26. Find □.", y, { writeLines: [{ label: "Last operation:" }, { label: "Undo it:" }, { label: "□ =" }], color: C.PRIMARY });

  y = addSectionHeading(doc, "Section C: Find the Unknown (with brackets)", y, { color: C.PRIMARY });
  y = addProblem(doc, 6, "(□ + 6) × 2 = 18. Find □.", y, { writeLines: [{ label: "Last operation:" }, { label: "Undo it:" }, { label: "□ =" }], color: C.PRIMARY });
  y = addProblem(doc, 7, "5 × (□ + 1) = 35. Find □.", y, { writeLines: [{ label: "Last operation:" }, { label: "Undo it:" }, { label: "□ =" }], color: C.PRIMARY });
  y = addProblem(doc, 8, "(□ − 3) × 4 = 20. Find □.", y, { writeLines: [{ label: "Last operation:" }, { label: "Undo it:" }, { label: "□ =" }], color: C.PRIMARY });

  addPdfFooter(doc, "Session 5 of 6 | Algebra | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/SR1_Order_of_Operations.pdf");
}

async function generateSR2() {
  const doc = createPdf({ title: "SR2 — Enabling Scaffold" });
  let y = addPdfHeader(doc, "Order of Operations — Scaffold", { subtitle: "SR2 — Enabling", color: C.SECONDARY, lessonInfo: "Session 5 of 6 | Algebra | Year 5/6 Maths" });
  y = addTipBox(doc, "The secret: Undo the LAST operation first! Ask yourself: 'What happened last?' Then reverse it.", y, { color: C.SECONDARY });
  y = addStepInstructions(doc,
    ["Identify the operations and decide: which one happens LAST?",
     "Undo the last operation (use the inverse: + ↔ −, × ↔ ÷)",
     "Solve for □ in the simpler equation",
     "Verify: substitute □ back into the original equation"],
    y, { color: C.SECONDARY });

  y = addProblem(doc, 1, "5 + □ × 3 = 20", y, { writeLines: [
    { label: "Operations: + and ×. Last operation: + 5" },
    { label: "Undo + 5: 20 - 5 =" },
    { label: "So □ × 3 = ___. □ = ___ ÷ 3 =" },
    { label: "Verify: 5 + ___ × 3 =" }], color: C.SECONDARY });

  y = addProblem(doc, 2, "(□ + 6) × 2 = 18", y, { writeLines: [
    { label: "Brackets change the order! Last operation: × 2" },
    { label: "Undo × 2: 18 ÷ 2 =" },
    { label: "So □ + 6 = ___. □ = ___ - 6 =" },
    { label: "Verify: (___ + 6) × 2 =" }], color: C.SECONDARY });

  y = addProblem(doc, 3, "2 + □ × 7 = 30", y, { writeLines: [
    { label: "Last operation: + 2" },
    { label: "Undo: 30 - 2 =" },
    { label: "So □ × 7 = ___. □ =" },
    { label: "Verify:" }], color: C.SECONDARY });

  addPdfFooter(doc, "Session 5 of 6 | Algebra | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/SR2_Enabling_Scaffold.pdf");
}

async function generateEXT1() {
  const doc = createPdf({ title: "EXT1 — Brackets Investigation" });
  let y = addPdfHeader(doc, "Brackets Investigation", { subtitle: "EXT1 — Extending Challenge", color: C.ACCENT, lessonInfo: "Session 5 of 6 | Algebra | Year 5/6 Maths" });
  y = addSectionHeading(doc, "The Brackets Challenge", y, { color: C.ACCENT });
  y = addBodyText(doc, "You've seen that brackets change the answer. In this investigation, you'll explore exactly HOW brackets change things and discover some surprising patterns.", y);

  y = addSectionHeading(doc, "Part 1: Same Numbers, Different Brackets", y, { color: C.ACCENT });
  y = addBodyText(doc, "Use the numbers 2, 3, 5, and the operations + and ×. Place brackets in different positions and compare the answers.", y);
  y = addProblem(doc, 1, "Calculate: 2 + 3 × 5 (no brackets)", y, { writeLines: [{ label: "Answer:" }], color: C.ACCENT });
  y = addProblem(doc, 2, "Calculate: (2 + 3) × 5 (brackets around the addition)", y, { writeLines: [{ label: "Answer:" }], color: C.ACCENT });
  y = addProblem(doc, 3, "Which arrangement gives the BIGGER answer? Can you explain why?", y, { writeLines: [{ label: "Explanation:" }], color: C.ACCENT });

  y = addSectionHeading(doc, "Part 2: Make It Equal", y, { color: C.ACCENT });
  y = addBodyText(doc, "Add brackets to make each equation TRUE. There may be more than one way!", y);
  y = addProblem(doc, 4, "Make it true: 2 + 3 × 4 + 1 = 21", y, { writeLines: [{ label: "With brackets:" }], color: C.ACCENT });
  y = addProblem(doc, 5, "Make it true: 5 × 3 + 2 × 4 = 100", y, { writeLines: [{ label: "With brackets:" }], color: C.ACCENT });

  y = addSectionHeading(doc, "Part 3: Design Your Own", y, { color: C.ACCENT });
  y = addProblem(doc, 6, "Create an expression using 3 numbers and 2 operations where brackets change the answer by MORE THAN 20.", y, {
    writeLines: [{ label: "Without brackets:" }, { label: "Answer:" }, { label: "With brackets:" }, { label: "Answer:" }, { label: "Difference:" }], color: C.ACCENT });

  y = addTipBox(doc, "Brackets have the biggest impact when they make you add BEFORE you multiply a large number. The more you add inside brackets, the bigger the effect!", y, { color: C.ACCENT });
  addPdfFooter(doc, "Session 5 of 6 | Algebra | Year 5/6 Maths");
  await writePdf(doc, RES_DIR + "/EXT1_Brackets_Investigation.pdf");
}

build().catch(err => { console.error(err); process.exit(1); });
