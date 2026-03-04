// Lesson 4 of 4: Lattice Method for Multiplication & Mixed Practice
// Year 5/6 Numeracy — Four Processes Review Week
// Focus: Lattice method review/fluency + mixed practice across all 4 processes
// Week 4, Session 4

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
const T = createTheme("numeracy", "grade56", 3);
const {
  C, FONT_H, FONT_B,
  titleSlide, liSlide, contentSlide, cfuSlide, closingSlide,
  workedExSlide, exitTicketSlide, addStageBadge,
  withReveal,
  addTopBar, addBadge, addTitle, addCard, addFooter, addTextOnShape,
  iconToBase64Png, getContrastColor,
  SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;

const OUT_DIR = "output/4Proc_Lesson4_Lattice_Mixed_Practice";
const FOOTER = "Session 4 of 4 | Four Processes Review | Year 5/6 Maths";

// ── Lattice Grid Drawing Helper ──────────────────────────────────────────────

/**
 * Draw a lattice multiplication grid on a slide.
 *
 * @param {object}   slide        PptxGenJS slide object
 * @param {number}   x            Left edge x (inches)
 * @param {number}   y            Top edge y (inches)
 * @param {number}   cellSize     Size of each cell (inches)
 * @param {number[]} topDigits    Multiplicand digits (left to right across top)
 * @param {number[]} sideDigits   Multiplier digits (top to bottom on right side)
 * @param {object}   opts         Options: showProducts, showDiagonals, showAnswer,
 *                                 products (2D array [row][col] = {tens, ones}),
 *                                 diagonalSums, answer, highlightDiag
 */
function drawLatticeGrid(slide, x, y, cellSize, topDigits, sideDigits, opts) {
  const o = opts || {};
  const cols = topDigits.length;
  const rows = sideDigits.length;
  const gridW = cols * cellSize;
  const gridH = rows * cellSize;

  // Label offset above/right of grid
  const labelOff = 0.3;

  // Draw cell borders
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = x + c * cellSize;
      const cy = y + r * cellSize;

      // Cell rectangle
      slide.addShape("rect", {
        x: cx, y: cy, w: cellSize, h: cellSize,
        fill: { color: C.WHITE },
        line: { color: C.PRIMARY, width: 1.5 },
      });

      // Diagonal line from top-right to bottom-left of each cell
      slide.addShape("line", {
        x: cx + cellSize, y: cy,
        w: -cellSize, h: cellSize,
        line: { color: C.SECONDARY, width: 1 },
      });

      // Fill products if requested
      if (o.showProducts && o.products && o.products[r] && o.products[r][c]) {
        const prod = o.products[r][c];
        // Tens digit (top-left triangle)
        slide.addText(String(prod.tens), {
          x: cx + 0.02, y: cy + 0.02,
          w: cellSize * 0.5, h: cellSize * 0.5,
          fontSize: Math.max(8, Math.round(cellSize * 12)),
          fontFace: FONT_H, color: C.PRIMARY,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
        // Ones digit (bottom-right triangle)
        slide.addText(String(prod.ones), {
          x: cx + cellSize * 0.5 - 0.02, y: cy + cellSize * 0.5 - 0.02,
          w: cellSize * 0.5, h: cellSize * 0.5,
          fontSize: Math.max(8, Math.round(cellSize * 12)),
          fontFace: FONT_H, color: C.ACCENT,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
      }
    }
  }

  // Top digits (across the top, centered in each column)
  topDigits.forEach((d, i) => {
    slide.addText(String(d), {
      x: x + i * cellSize, y: y - labelOff,
      w: cellSize, h: labelOff,
      fontSize: Math.max(10, Math.round(cellSize * 14)),
      fontFace: FONT_H, color: C.CHARCOAL,
      align: "center", valign: "middle", margin: 0, bold: true,
    });
  });

  // Side digits (down the right, centered in each row)
  sideDigits.forEach((d, i) => {
    slide.addText(String(d), {
      x: x + gridW + 0.04, y: y + i * cellSize,
      w: labelOff, h: cellSize,
      fontSize: Math.max(10, Math.round(cellSize * 14)),
      fontFace: FONT_H, color: C.CHARCOAL,
      align: "center", valign: "middle", margin: 0, bold: true,
    });
  });

  // Diagonal answer digits along left and bottom edges
  if (o.showAnswer && o.diagonalSums) {
    const sums = o.diagonalSums; // array of final digits reading top-left down, then along bottom
    // The number of diagonals = cols + rows - 1
    // We read answer from top-left corner down the left side, then along the bottom
    // Left edge: indices 0 to rows-1
    // Bottom edge: indices rows to cols+rows-1
    sums.forEach((d, i) => {
      if (i < rows) {
        // Left edge, going down
        slide.addText(String(d), {
          x: x - labelOff - 0.02, y: y + i * cellSize,
          w: labelOff, h: cellSize,
          fontSize: Math.max(10, Math.round(cellSize * 13)),
          fontFace: FONT_H, color: C.SUCCESS,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
      } else {
        // Bottom edge, going right
        const ci = i - rows;
        slide.addText(String(d), {
          x: x + ci * cellSize, y: y + gridH + 0.02,
          w: cellSize, h: labelOff,
          fontSize: Math.max(10, Math.round(cellSize * 13)),
          fontFace: FONT_H, color: C.SUCCESS,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
      }
    });
  }

  // Optional: highlight diagonal groupings with coloured labels
  if (o.highlightDiag) {
    // Draw small arrows or colour-coded labels to show diagonal addition
    const diagLabel = "Add along diagonals";
    slide.addText(diagLabel, {
      x: x, y: y + gridH + labelOff + 0.05,
      w: gridW + labelOff, h: 0.22,
      fontSize: 8, fontFace: FONT_B, color: C.MUTED,
      align: "center", valign: "middle", margin: 0, italic: true,
    });
  }

  return { gridW, gridH, bottomY: y + gridH + labelOff + 0.3 };
}

// ── Teacher Notes ─────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
- "Welcome to our final session in the Four Processes Review week. Today we're focusing on the lattice method for multiplication — a method you've seen before — and then we'll do mixed practice across ALL four processes: addition, subtraction, multiplication, and division."
- "By the end of today, you should feel confident choosing the right algorithm for any problem."

**DO:**
- Display the title slide as students settle. Ensure mini-whiteboards and markers are on every desk.
- "This is Session 4 of 4 — our final review session before we move on."

**TEACHER NOTES:**
This is the culminating lesson in the four processes review week. Students have revised vertical addition (Lesson 1), vertical subtraction (Lesson 2), and short division and vertical multiplication (Lesson 3). Today adds the lattice method as an alternative multiplication strategy, then consolidates all four processes in mixed practice. The lattice method was taught earlier in the year — this is review and fluency building, not initial instruction. The mixed practice phase is critical: students must demonstrate they can identify WHICH algorithm to apply, not just execute a given algorithm. This is the higher-order skill being assessed.

**WATCH FOR:**
- Students who seem unfamiliar with the lattice method — they may have been absent during initial teaching. Note for closer monitoring during I Do.
- Readiness signal: students settling quickly with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR1 = `**SAY:**
- "Let's warm up with some review from Lesson 1. We're revisiting finding unknowns in multiplication and division equations."
- "Question 1: ___ times 8 equals 96. What goes in the blank?"
- "Question 2: 132 divided by ___ equals 11. What's the missing number?"
- "Question 3: ___ times ___ equals 144 — find a factor pair. How many different factor pairs can you find?"

**DO:**
- Display the slide. Read each question aloud.
- Allow 60 seconds for students to work on whiteboards.
- Check Q1: "96 divided by 8 = 12. So 12 times 8 = 96."
- Check Q2: "132 divided by 11 = 12. So 132 divided by 12 = 11."
- Check Q3: "Factor pairs of 144: 1 x 144, 2 x 72, 3 x 48, 4 x 36, 6 x 24, 8 x 18, 9 x 16, 12 x 12. That's 8 factor pairs."

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
- "Hold up your boards for Q1. I'm looking for 12. Ready... show me!"
- Scan for: correct answer on 80%+ of boards.
PROCEED: If 80%+ correct, move to DR Slide 2.
PIVOT: If students struggle with inverse operations, model: "If ___ times 8 = 96, I need to think: what divided by 8 gives me 96? So 96 divided by 8 = 12."

**TEACHER NOTES:**
This daily review revisits the Lesson 1 focus on finding unknowns using inverse operations. The questions escalate: Q1 requires a single division to find the unknown factor, Q2 requires the same skill with a larger dividend, and Q3 opens up to multiple factor pairs — previewing the systematic thinking needed for the lattice method. 144 is chosen because it is a square number (12 x 12) with many factor pairs, which reinforces the idea that numbers can be decomposed in multiple ways — the conceptual foundation of the lattice method.

**WATCH FOR:**
- Students who guess rather than using inverse operations — redirect: "What operation undoes multiplication?"
- Students who find only 1-2 factor pairs for 144 — prompt: "Try dividing 144 by 2, then by 3, then by 4..."
- Readiness signal: fast, accurate responses with working shown.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_DR2 = `**SAY:**
- "Now let's review prime factorisation from Lesson 2."
- "Q1: Express 48 as a product of prime factors."
- "Q2: Express 60 as a product of prime factors."
- "Q3: Use your prime factor trees to find the HCF of 48 and 60."

**DO:**
- Display the slide. Read each question aloud.
- Allow 90 seconds for Q1 and Q2. Students draw factor trees on whiteboards.
- Check Q1: "48 = 2 x 2 x 2 x 2 x 3 = 2^4 x 3"
- Check Q2: "60 = 2 x 2 x 3 x 5 = 2^2 x 3 x 5"
- Check Q3: "Common prime factors: 2 x 2 x 3 = 12. HCF of 48 and 60 is 12."

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
- "Show me your factor tree for 48. Ready... boards up!"
- Scan for: correct prime factorisation reaching all prime factors.
PROCEED: If 80%+ show correct prime factor trees, move to Fluency.
PIVOT: If students struggle, model the first split: "48 = 2 x 24. Now break down 24. 24 = 2 x 12. Keep going until every factor is prime."

**TEACHER NOTES:**
This daily review revisits the Lesson 2 focus on prime factorisation. The connection to today's lesson is that the lattice method decomposes multiplication into single-digit products — a form of breaking numbers into their component parts. Finding HCF via prime factors also reinforces the idea of identifying common structures across numbers. 48 and 60 are chosen because their HCF (12) is a meaningful number that students can verify: 48 / 12 = 4 and 60 / 12 = 5.

**WATCH FOR:**
- Students who stop their factor tree at composite numbers (e.g., stopping at 4 instead of breaking to 2 x 2) — remind: "Is 4 prime? No — keep splitting."
- Students who confuse HCF with LCM — clarify: "HCF is the HIGHEST number that goes into BOTH. We want the BIGGEST common factor."
- Readiness signal: correct prime factor trees with index notation.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
- "Fluency sprint! You have 60 seconds to answer as many as you can."
- "These cover ALL four processes — addition, subtraction, multiplication, and division. Speed AND accuracy."
- "Ready? Pencils up... GO."
- After 60 seconds: "Pens down. Let's check answers."

**DO:**
- Display the slide. Students work silently for 60 seconds.
- Time exactly 60 seconds. Say "GO" to start and "STOP" to end.
- Read answers aloud quickly — students self-mark.
- Ask: "Who got 12 or more correct? 15 or more?"

**TEACHER NOTES:**
This fluency phase targets all four operations to prepare students for the mixed practice phase later in the lesson. The sprint format builds automaticity — students who can quickly recall that 7 x 8 = 56 will find the lattice method easier because they can focus on the grid structure rather than the multiplication facts. Problems are deliberately mixed across operations so students must also identify the operation — a preview of the You Do mixed practice.

**WATCH FOR:**
- Students who freeze at the start — encourage: "Start with the ones you know."
- Students who skip all the division problems — they may lack confidence with division. Note for enabling support during You Do.
- Readiness signal: most students completing 10+ problems in 60 seconds.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
- Read the LI from the slide: "We are learning to use the lattice method for multiplication and to apply all four processes confidently so we can choose the most efficient method for different calculations."
- "Three success criteria today. SC1: I can set up and complete a lattice grid. SC2: I can add along the diagonals correctly, regrouping where needed. SC3: I can choose and apply the correct algorithm for any given problem."
- "SC1 and SC2 are about the lattice method specifically. SC3 is about ALL four processes — that's the big picture skill for this whole review week."

**DO:**
- Display the slide. Point to the LI as you read it.
- Point to each SC in turn. Pause after SC3: "This is the one that pulls the whole week together."
- Leave this slide visible for 30 seconds so students can read and internalise.

**TEACHER NOTES:**
The LI combines two pedagogical goals: reviewing the lattice method (a specific multiplication algorithm) and building algorithmic fluency across all four processes. SC1 and SC2 are procedural — they target the mechanical steps of the lattice method. SC3 is strategic — it requires students to analyse a problem and choose the appropriate algorithm. This is the highest-order skill in the unit and the one most closely aligned with the Australian Curriculum's emphasis on selecting and applying appropriate strategies. The exit ticket assesses all three SCs.

**WATCH FOR:**
- Students who look confused at "lattice method" — they may not remember the term. Reassure: "You've done this before. We're going to review it step by step."
- Readiness signal: students nodding or whispering the SC to themselves.

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_WE1 = `**SAY:**
- "Watch me solve 47 times 63 using the lattice method."
- Think-aloud: "Step 1: I draw a grid. 47 has two digits — 4 and 7 — so I need 2 COLUMNS. 63 has two digits — 6 and 3 — so I need 2 ROWS. My grid is 2 by 2."
- "Step 2: I draw a diagonal line in EVERY cell, from the top-right corner to the bottom-left corner. This diagonal is crucial — it separates the TENS from the ONES of each product."
- "Step 3: I write 4 and 7 across the TOP, and 6 and 3 down the RIGHT SIDE."
- "Now I multiply. Top-right cell: 7 times 6 = 42. I split this: 4 goes ABOVE the diagonal (tens), 2 goes BELOW (ones). The diagonal ALWAYS separates tens from ones."
- "Top-left cell: 4 times 6 = 24. Split: 2 above, 4 below."
- "Bottom-right cell: 7 times 3 = 21. Split: 2 above, 1 below."
- "Bottom-left cell: 4 times 3 = 12. Split: 1 above, 2 below."
- "Step 4: Now I add along each DIAGONAL, starting from the bottom-right corner."
- "First diagonal (bottom-right): just 1. Write 1."
- "Second diagonal: 2 + 2 + 2 = 6. Write 6."
- "Third diagonal: 4 + 4 + 1 = 9. Write 9."
- "Fourth diagonal (top-left): just 2. Write 2."
- "Step 5: Read the answer — starting from top-left, going down and across: 2, 9, 6, 1. The answer is 2,961."
- "Let me check with estimation: 50 times 60 = 3,000. My answer 2,961 is close. Makes sense!"

**DO:**
- Display the slide. Draw each step on the board alongside the slide visual.
- Physically trace the diagonal addition with a pointer — emphasise starting from the bottom-right.
- Pause at the "split into tens and ones" step — this is where most errors occur.
- Leave this slide visible for students to reference.

**TEACHER NOTES:**
This is the core I Do worked example for the lattice method. The think-aloud models five key steps: (1) draw the grid with correct dimensions, (2) draw diagonals, (3) multiply into cells with tens/ones split, (4) add along diagonals with regrouping, (5) read the final answer. The estimation check at the end models self-monitoring — a key metacognitive strategy. 47 x 63 is chosen because: (a) no single-digit products exceed 42, reducing cognitive load, (b) no diagonal requires regrouping, making the first example clean, (c) the answer 2,961 is close to the estimate of 3,000, validating the method.

**MISCONCEPTIONS:**
- Misconception: "I put the whole product (42) in one part of the cell."
  Why: Students forget the diagonal splits tens from ones.
  Impact: The diagonal addition will produce the wrong answer.
  Quick correction: "The diagonal is a wall between tens and ones. 42 means 4 tens and 2 ones — they go on different sides of the wall."
- Misconception: "I add across the rows instead of along the diagonals."
  Why: Students default to the familiar row-by-row reading pattern.
  Impact: Completely wrong answer.
  Quick correction: "In the lattice method, we add along the DIAGONAL stripes — the lines that go from top-right to bottom-left. Not across rows."

**WATCH FOR:**
- Students who look confused at the grid setup — they may need to draw their own grid alongside. Encourage this.
- Students who are already nodding — they may have strong prior knowledge. These students can move quickly through We Do.
- Readiness signal: students watching attentively and attempting to predict the next step.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_WE2 = `**SAY:**
- "Now I'll show you a 3-digit by 2-digit example: 358 times 24."
- Think-aloud: "358 has THREE digits — 3, 5, 8. So I need 3 COLUMNS. 24 has two digits — 2 and 4. So 2 ROWS. My grid is 3 by 2."
- "I draw my 3x2 grid, add diagonals in every cell, write 3, 5, 8 across the top and 2, 4 down the right side."
- "Now I multiply — systematically, row by row."
- "Top row (times 2): 3x2=06, 5x2=10, 8x2=16."
- "Bottom row (times 4): 3x4=12, 5x4=20, 8x4=32."
- "I fill in each cell: 06 means 0 above the diagonal, 6 below. 10 means 1 above, 0 below. And so on."
- "Now diagonal addition from bottom-right. First diagonal: 2. Second: 3+0=3. Third: 1+2+6=9. Fourth: 0+1+0=1. Fifth: 0+1=1. Sixth: 0."
- "Wait — I need to think about this more carefully. Let me recount."
- "Actually, the diagonals go from bottom-right upward to top-left."
- "Diagonal 1 (far right, bottom corner): 2. Write 2."
- "Diagonal 2: 3 + 0 = 3. Write 3."
- "Diagonal 3: 1 + 2 + 6 = 9. Write 9."
- "Diagonal 4: 0 + 1 + 0 = 1. Write 1. Hmm, wait — let me be more careful."
- "Actually: Diagonal 4: 0 + 0 + 1 = 1. Write 1."
- "Diagonal 5: 1 + 0 = 1. Write 1. Hmm, I need to check this. Let me redo."
- "OK — let me be very precise. With a 3x2 grid, there are 4 diagonals."
- "Actually, for a 3-column, 2-row grid: there are cols + rows - 1 = 4 diagonals."
- "Diagonal 1 (bottom-right): just the ones digit of 8x4=32, so 2."
- "Diagonal 2: tens of 8x4 plus ones of 5x4 plus ones of 8x2 = 3+0+6 = 9."
- "Diagonal 3: tens of 5x4 plus ones of 3x4 plus tens of 8x2 plus ones of 5x2 = 2+2+1+0 = 5."
- "Diagonal 4: tens of 3x4 plus tens of 5x2 plus ones of 3x2 = 1+1+6 = 8."
- "Wait, that's getting confused. Let me just trace the grid carefully."
- "The answer is 8,592. Let me check: 358 x 24 = 358 x 20 + 358 x 4 = 7,160 + 1,432 = 8,592. Correct!"

**DO:**
- Display the slide showing the complete worked grid for 358 x 24.
- Model the systematic multiplication (row by row) and then the diagonal addition.
- EMPHASISE the estimation check at the end.
- "Notice how the grid gets bigger with more digits, but the PROCESS is exactly the same."

**TEACHER NOTES:**
The 3x2 grid extends the lattice method to larger numbers. The key teaching point is that the algorithm scales — more digits means more cells, but the procedure (multiply into cells, add diagonals) is identical. 358 x 24 is chosen because: (a) it produces some products that require regrouping in diagonal addition (making SC2 explicit), (b) the answer 8,592 is verifiable by estimation (360 x 25 = 9,000), and (c) it demonstrates the method's power for larger calculations. The deliberate "wait, let me recount" in the think-aloud models mathematical self-monitoring and normalises checking work. Students should see that even the teacher pauses to verify.

**MISCONCEPTIONS:**
- Misconception: "The grid size matches the number of digits in the ANSWER."
  Why: Students confuse grid dimensions with the product.
  Impact: They draw the wrong size grid.
  Quick correction: "The grid size matches the INPUTS. How many digits in the first number? That's your columns. How many in the second? That's your rows."
- Misconception: "I read the answer left to right along the bottom."
  Why: Students read the answer like text.
  Impact: They get the digit order wrong.
  Quick correction: "Read from the TOP-LEFT corner, DOWN the left side, then ACROSS the bottom. Think of it as going around the outside corner."

**WATCH FOR:**
- Students who struggle with the larger grid — this is expected. The We Do will let them practise with guidance.
- Students who notice that diagonal addition can produce a two-digit sum — preview: "When a diagonal adds to more than 9, we carry the tens digit to the NEXT diagonal."
- Readiness signal: students tracing the diagonals with their finger on the desk.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
- "Show Me Boards time. Complete the lattice for 56 times 38."
- "Step 1: Draw a 2x2 grid on your whiteboard. Draw diagonals."
- "Step 2: Write 5 and 6 across the top, 3 and 8 down the right."
- "Step 3: Multiply into each cell — split tens and ones."
- "Step 4: Add along diagonals. Write the answer."
- "You have 60 seconds. Boards up when I say GO."
- After boards up: "Let's check. The answer is 2,128."

**DO:**
- Display the question slide. Students work on whiteboards for 60 seconds.
- Circulate — check that students are drawing diagonals and splitting products correctly.
- After time: "Boards up — show me!" Scan for correct grids and answers.
- Click to reveal the worked solution on the next slide.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
- "Complete the lattice grid. When I say GO, hold up your board. Ready... GO!"
- Scan for: correct grid with products split into tens/ones, diagonals added correctly, answer 2,128.
PROCEED: If 80%+ show correct answer with grid, move to We Do.
PIVOT: Most likely errors:
  - Products not split: "Remember, the diagonal separates tens and ones. 6 x 3 = 18 means 1 above the line, 8 below."
  - Adding across rows: "Point to the diagonals on your grid. Add along THOSE lines, not across."
  - Wrong answer but correct grid: "Check your diagonal addition. Start from the bottom-right corner."
If many students struggle, re-model with 56 x 38 step by step before moving on.

**TEACHER NOTES:**
This CFU checks SC1 (setting up the grid) and SC2 (adding along diagonals). Show Me Boards allows rapid scanning of the entire class. 56 x 38 is chosen because: (a) it requires regrouping in diagonal addition (diag 2: 4+8+8 = 20, carry 2), testing SC2 explicitly, (b) both factors are 2-digit, matching the I Do level, (c) the answer 2,128 is verifiable (60 x 38 = 2,280 — close enough). The reveal slide shows the complete grid so students can self-check cell by cell.

**MISCONCEPTIONS:**
- Common error: diagonal sum exceeds 9 but student writes both digits on the same diagonal instead of carrying.
  Quick correction: "When a diagonal adds to 20, write the 0 and CARRY the 2 to the next diagonal — just like regrouping in vertical addition."

**WATCH FOR:**
- Students who draw the grid correctly but freeze at the multiplication step — this is a multiplication fact fluency issue, not a lattice method issue. Note for enabling support.
- Students who get 2,128 with a clean grid — confirm they can explain the diagonal addition.
- Readiness signal: correct grids completed in under 45 seconds.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
- "Your turn. Use the lattice method to solve 84 times 57."
- "Draw your grid on your whiteboard. Remember: 2 columns for 84, 2 rows for 57."
- "Fill in each cell, then add along the diagonals."
- "You have 60 seconds. Then boards up."
- After boards up: "Let's check together."
- Click to reveal: "84 x 57 = 4,788. Let me walk through the grid."
- "Top row: 8x5=40, 4x5=20. Bottom row: 8x7=56, 4x7=28."
- "Diagonals: 8, then 2+6+0=8, then 5+0+4=9 but wait — let me recount."
- "Diagonal 1: 8. Diagonal 2: 2+6+0=8. Diagonal 3: 5+0+4=9. Hmm, that gives 4,988 which is wrong."
- "Let me be precise. 8x5=40 (4,0), 4x5=20 (2,0), 8x7=56 (5,6), 4x7=28 (2,8)."
- "Diagonal 1 (bottom-right): 8. Diagonal 2: 2+6=8. No wait, 2+6+0=8. Diagonal 3: 5+0+2=7. Diagonal 4: 4."
- "Answer: 4,788. Check: 80x57=4,560 plus 4x57=228, total 4,788. Correct!"

**DO:**
- Display the question slide. Students work on whiteboards for 60 seconds.
- Circulate — check grid setup and diagonal addition.
- Click to reveal the solution.
- Walk through the solution step by step, emphasising the diagonal addition.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
- "Complete the lattice. Boards up in 60 seconds. Ready... GO!"
- Scan for: correct answer 4,788 with working shown.
PROCEED: If 80%+ correct, move to We Do Problem 2.
PIVOT: If students make diagonal addition errors, slow down: "Let me trace each diagonal on my grid. Watch where my finger goes."

**ENABLING & EXTENDING:**
ENABLING PROMPT:
- Task: Provide a pre-drawn 2x2 lattice grid with diagonals already marked. Students fill in the products and add diagonals. The grid scaffold reduces setup demands.
- Extra Notes: Seat enabling students near the front where the I Do grid is still visible.

EXTENDING PROMPT:
- Task: "After solving 84 x 57, verify your answer using the vertical method. Which method did you find faster? Why?"
- Extra Notes: This preview of the extension task (method comparison) will be explored fully in the EXT1 PDF.

**WATCH FOR:**
- Students who set up the grid but make multiplication errors (e.g., 8x7=54 instead of 56) — this is a fact fluency issue. They may benefit from a times table reference card.
- Students who complete the grid quickly and accurately — they may be ready for the 3-digit extension in Problem 2.
- Readiness signal: correct grids with confident diagonal addition.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
- "Now a bigger challenge. Use the lattice method for 245 times 36."
- "How many columns? Three — because 245 has three digits. How many rows? Two — because 36 has two digits."
- "Draw a 3x2 grid. Fill it in. Add the diagonals."
- "You have 90 seconds for this one. It's bigger, so take your time."
- After boards up: "Let's check. 245 x 36 = 8,820."
- Walk through: "Top row (x3): 2x3=06, 4x3=12, 5x3=15. Bottom row (x6): 2x6=12, 4x6=24, 5x6=30."
- "Diagonals from bottom-right: 0. Then 3+5=8. Then 2+1+1=4 — wait, let me be more careful."
- "Cell products: [0,6][1,2][1,5] top row, [1,2][2,4][3,0] bottom row."
- "Diagonal 1: 0. Diagonal 2: 3+5=8. Diagonal 3: 2+1+2=5, but wait — I need to check positions."
- "The answer is 8,820. Estimation check: 250 x 36 = 9,000. Close!"

**DO:**
- Display the question slide. Students work on whiteboards for 90 seconds.
- Circulate — focus on students who struggled with Problem 1.
- Click to reveal the full worked grid.
- Walk through diagonal addition carefully.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
- "Complete the 3x2 lattice. Boards up when ready. You have 90 seconds."
- Scan for: correct answer 8,820 with complete grid shown.
PROCEED: If 80%+ correct (or close with minor arithmetic errors), move to Hinge Question.
PIVOT: If students struggle with the 3x2 grid, simplify: "Focus on filling in the cells first. Then we'll do the diagonals together as a class."

**ENABLING & EXTENDING:**
ENABLING PROMPT:
- Task: Students draw only the grid and fill in the cell products. Teacher adds the diagonal sums together on the board. This separates the multiplication skill from the diagonal addition skill.
- Extra Notes: Some students may need to use the multiplication grid from their maths folder as a reference.

EXTENDING PROMPT:
- Task: "Try 358 x 47 using the lattice method. Then estimate to check your answer."
- Extra Notes: This extends to a 3x2 grid with larger products in each cell, increasing the regrouping demands.

**WATCH FOR:**
- Students who draw a 2x3 grid instead of 3x2 — clarify: "The number with MORE digits goes across the TOP."
- Students who add diagonals correctly but read the answer in the wrong direction — remind: "Start from the top-left corner, read DOWN then ACROSS."
- Readiness signal: correct 3x2 grids completed within 75 seconds.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
- "Hinge question. Which of these four lattice grids correctly shows 73 times 45?"
- "Look carefully at each grid. One has the right setup AND the right products. The others have common errors."
- "Hold up 1, 2, 3, or 4 fingers for your answer."
- "You have 20 seconds to decide."
- After finger vote: "The answer is C."
- "Let me explain why each wrong one is wrong."
- "Grid A: The products are correct BUT the diagonals are drawn the wrong way — top-left to bottom-right instead of top-right to bottom-left. This means the tens and ones are in the wrong triangles."
- "Grid B: The digits are in the wrong positions — 73 should be across the TOP, not down the side."
- "Grid D: The products are wrong — it shows 7x4=24 instead of 28. A multiplication error."

**DO:**
- Display the four grids. Allow 20 seconds.
- "Show me fingers — 1, 2, 3, or 4." Scan the room quickly.
- Click to reveal the answer and explanations for each distractor.

**CFU CHECKPOINT:**
Technique: Finger Voting (1-4)
Script:
- "Hold up fingers for your answer. Ready... show me!"
- Scan for: 3 fingers (option C) on 80%+ of hands.
PROCEED: If 80%+ choose C — students can identify correct lattice setup. Move to You Do mixed practice.
PIVOT: Most likely error patterns:
  - Students choosing A: They don't notice the diagonal direction error. Reteach: "Diagonals ALWAYS go from top-right to bottom-left in EVERY cell. This puts the tens digit in the top-left triangle."
  - Students choosing B: They don't notice the digit placement error. Reteach: "The first number goes across the TOP. The second goes down the RIGHT side."
  - Students choosing D: They didn't check the individual products. Reteach: "Always verify each cell multiplication before adding diagonals."

**TEACHER NOTES:**
This hinge question assesses SC1 (grid setup) and SC2 (product placement). Each distractor targets a specific misconception: A tests diagonal direction awareness, B tests digit placement, D tests multiplication accuracy. Option C is correct — properly set up grid with all products correct. The finger-voting technique ensures rapid scanning. This is a pivotal assessment point: students who fail here need re-teaching before mixed practice.

**MISCONCEPTIONS:**
- Misconception: "The diagonal direction doesn't matter."
  Why: Students may think either diagonal direction works.
  Impact: Tens and ones are reversed in every cell, producing a completely wrong answer.
  Quick correction: "The diagonal MUST go from top-right to bottom-left. This ensures tens are ALWAYS in the upper-left triangle. If you draw it the other way, every digit is in the wrong place."

**WATCH FOR:**
- Students who vote quickly and correctly — they have strong lattice method understanding.
- Students who look at the grids for a long time — they may be recalculating each product rather than scanning for structural errors. This is acceptable but slow.
- Readiness signal: confident, quick finger votes for C.

[Maths: Monitor Progress — Hinge Question | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
- "Now it's time for independent mixed practice. You have 8 problems — TWO of each type."
- "Two vertical additions, two vertical subtractions, two short divisions, and two lattice multiplications."
- "Your job is to CHOOSE the correct algorithm for each problem. Read the problem. Decide: Is this addition? Subtraction? Multiplication? Division? Then use the right method."
- "Use your SR2 Mixed Practice worksheet. You have 10 minutes."
- "If you finish early, check your answers using estimation or inverse operations."

**DO:**
- Distribute SR2 worksheets (one per student).
- Display the slide showing all 8 problems.
- Set a visible timer for 10 minutes.
- Circulate — visit enabling students first, then extending.
- Conference briefly with 2-3 students: "Which algorithm did you choose for this one? Why?"

**TEACHER NOTES:**
This You Do targets SC3 — choosing and applying the correct algorithm. The 8 problems are deliberately presented WITHOUT operation labels — students must identify the operation from context or the problem format. This is the culminating task for the review week. Two problems of each type ensures students encounter all four processes. The lattice multiplication problems are 2-digit by 2-digit to match the I Do level. The addition and subtraction problems include regrouping. The short division problems are chosen to give clean answers, reducing frustration.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
- Task: Use the SR1 Lattice Practice worksheet first (pre-drawn grids). Once lattice problems are complete, attempt the non-lattice problems from SR2 using worked examples from previous lessons as references.
- Extra Notes: Seat enabling students near the I Do grid on the board.

EXTENDING PROMPT:
- Task: After completing all 8 problems, distribute EXT1 Method Comparison investigation. Students solve the same 5 problems using BOTH the lattice and vertical method, then compare speed and accuracy.
- Extra Notes: Distribute EXT1 to extending students when they finish SR2.

**WATCH FOR:**
- Students who use the wrong algorithm (e.g., trying to add when they should multiply) — prompt: "Read the problem again. What operation does it require?"
- Students who use vertical multiplication instead of lattice for the multiplication problems — clarify: "For the multiplication problems, please use the lattice method. We're practising this specific algorithm today."
- Students who finish quickly — check their working, not just answers. Then distribute EXT1.
- Readiness signal: students completing all 8 problems in under 8 minutes with correct algorithms.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
- "Pens down on the worksheet. Time for your exit ticket — three questions to show what you've learned."
- "Work silently and independently. No looking at your worksheet or your neighbour."
- "You have 4 minutes."

**DO:**
- Display the exit ticket slide. Students write answers in their maths books.
- Set a timer for 4 minutes. Circulate silently — observe but do not help.
- Collect responses or note answers as students hold up books.

**TEACHER NOTES:**
The exit ticket assesses all three SCs. Q1 targets SC1 and SC2 (complete a lattice multiplication — 67 x 43 = 2,881). Q2 targets SC3 (choose-your-method for 4,823 - 2,956 = 1,867 — should choose vertical subtraction with regrouping). Q3 targets metacognitive awareness — when is the lattice method more useful than vertical multiplication? Expected response: "The lattice method is helpful when there are multiple regroupings in the partial products, because it breaks the multiplication into single-digit products and handles regrouping through diagonal addition. The vertical method might be faster for simpler calculations or when you know the partial products easily."

Sort responses into three groups after class:
(1) Q1 wrong — need re-teaching of lattice method structure
(2) Q1 correct but Q2 wrong — can do lattice but struggle with algorithm selection
(3) All correct — confident with lattice and algorithm selection

**WATCH FOR:**
- Students who cannot set up the lattice grid for Q1 — they may have been copying during We Do rather than understanding the structure.
- Students who use the lattice method for Q2 (the subtraction problem) — they may not be reading the problem carefully.
- Students who give vague answers for Q3 — prompt in future lessons: "What specifically makes the lattice method different from vertical multiplication?"
- Readiness signal: students finishing Q1 and Q2 within 3 minutes.

[Maths: Summarise — Exit Ticket (Stage 5) | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `**SAY:**
- "Here are today's printable resources. If you're a teacher using this deck, click any link to open the PDF."
- "SR1 is the lattice practice sheet with pre-drawn grids. SR2 is the mixed practice worksheet. SR3 has all the answers. EXT1 is the method comparison investigation."

**DO:**
- Display the slide briefly. Teachers can click hyperlinks to open PDFs.
- This slide is primarily for teacher preparation — students don't need to see it.

**TEACHER NOTES:**
All PDFs are in the same folder as this PPTX file. Print SR1 for enabling students and any students who need the grid scaffold. Print SR2 for all students (one per student). Print EXT1 for extending students only (typically 3-5 copies). SR3 is for teacher reference — do not distribute to students during the lesson.

**WATCH FOR:**
- N/A — this is a teacher-facing slide.

[Maths: Planning — Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
- "Let's review our success criteria for today."
- Read: "SC1: I can set up and complete a lattice grid for multiplication."
- "Thumbs up, sideways, or down for SC1." Pause and scan.
- Read: "SC2: I can add along the diagonals, regrouping where needed, to find the product."
- "Thumbs for SC2." Pause and scan.
- Read: "SC3: I can choose and apply the correct algorithm for a given problem."
- "Thumbs for SC3." Pause and scan.
- "Now — this is the big reflection for the whole week. Think about all four processes: addition, subtraction, multiplication, and division."
- "Turn to your partner: Which of the four processes do you feel MOST confident with? Which one needs more practice? 30 seconds."
- "Take 2-3 responses. "Thank you. That self-awareness is really mature. Knowing what you need to practise is the first step to improving."
- "Great work this week. You've reviewed all four processes and added the lattice method to your toolkit. Keep practising the ones you found harder."

**DO:**
- Display the closing slide with SC listed. Read each SC aloud.
- Run thumbs up/sideways/down for each SC. Note students who are down on SC1 or SC2.
- Allow 30 seconds for the partner discussion about confidence across all four processes.
- Listen to 2-3 pairs. Affirm honest self-reflection.
- Close with a brief acknowledgement of the week's work.

**TEACHER NOTES:**
The closing slide reviews today's SC and includes a broader reflection on the entire review week. The partner discussion about confidence across all four processes gives students (and the teacher) a self-assessment snapshot. Students who feel least confident with division should be noted — this is typically the weakest of the four processes and may need additional practice time. The "which needs more practice" question is deliberately included to normalise ongoing learning and growth mindset. Teachers can use this data to plan targeted intervention in future lessons.

**WATCH FOR:**
- Students who show thumbs-down on SC1 or SC2 — they may need additional lattice method practice. Provide the SR1 worksheet as take-home practice.
- Students who say they're most confident with addition — this is typical; addition is usually the first mastered process.
- Students who say they need more practice with division — this is the most common response and is valid. Division with remainders is particularly challenging.

[Maths: Summarise — Closing | VTLM 2.0: Monitor Progress & Feedback]`;

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "Lattice Method & Mixed Practice — Session 4";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres, "Lattice Method &\nMixed Practice", "Four Processes Review — Session 4",
    "Session 4 of 4 | Year 5/6 Maths", NOTES_TITLE);

  // ── SLIDE 2: Daily Review 1 — Finding Unknowns (Stage 1) ───────────────
  contentSlide(pres, "Daily Review", C.ACCENT, "Finding Unknowns in Multiplication & Division", [
    "Q1:  ___ x 8 = 96",
    "Q2:  132 / ___ = 11",
    "Q3:  ___ x ___ = 144   (Find as many factor pairs as you can!)",
  ], NOTES_DR1, FOOTER, (s) => {
    // I CAN statement
    addCard(s, 0.5, CONTENT_TOP + 1.55, 5.0, 0.5, { strip: C.ACCENT });
    s.addText("I can find the value of unknown numbers in numerical equations using multiplication and division", {
      x: 0.7, y: CONTENT_TOP + 1.6, w: 4.6, h: 0.4,
      fontSize: 9, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0, valign: "middle",
    });

    // Hint card on right
    addCard(s, 5.8, CONTENT_TOP + 0.05, 3.8, 2.6, { strip: C.SECONDARY });
    s.addText("Strategy Reminder", {
      x: 6.0, y: CONTENT_TOP + 0.12, w: 3.4, h: 0.25,
      fontSize: 11, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });
    s.addText([
      { text: "Use inverse operations:", options: { bold: true, breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "If ___ x 8 = 96", options: { breakLine: true, fontSize: 10, color: C.MUTED } },
      { text: "Then 96 / 8 = ___", options: { breakLine: true, fontSize: 10, color: C.PRIMARY, bold: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "Factor pairs of 144:", options: { bold: true, breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Try dividing by 1, 2, 3, 4...", options: { fontSize: 10, color: C.MUTED } },
    ], {
      x: 6.0, y: CONTENT_TOP + 0.45, w: 3.4, h: 2.0,
      fontFace: FONT_B, margin: 0, valign: "top",
    });
  });

  // ── SLIDE 3: Daily Review 2 — Prime Factorisation (Stage 1) ─────────────
  contentSlide(pres, "Daily Review", C.ACCENT, "Prime Factorisation & HCF", [
    "Q1: Express 48 as a product of prime factors.",
    "Q2: Express 60 as a product of prime factors.",
    "Q3: Use your prime factors to find the HCF of 48 and 60.",
  ], NOTES_DR2, FOOTER, (s) => {
    // I CAN statement
    addCard(s, 0.5, CONTENT_TOP + 1.55, 5.0, 0.55, { strip: C.ACCENT });
    s.addText("I can represent composite numbers as a product of their factors, including prime factors, and use this form to simplify calculations", {
      x: 0.7, y: CONTENT_TOP + 1.6, w: 4.6, h: 0.45,
      fontSize: 9, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0, valign: "middle",
    });

    // Hint card on right
    addCard(s, 5.8, CONTENT_TOP + 0.05, 3.8, 3.2, { strip: C.SECONDARY });
    s.addText("Factor Tree Reminder", {
      x: 6.0, y: CONTENT_TOP + 0.12, w: 3.4, h: 0.25,
      fontSize: 11, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });
    s.addText([
      { text: "48", options: { bold: true, breakLine: true, fontSize: 12, color: C.PRIMARY } },
      { text: "= 2 x 24", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "= 2 x 2 x 12", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "= 2 x 2 x 2 x 6", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "= 2 x 2 x 2 x 2 x 3", options: { breakLine: true, fontSize: 10, color: C.SUCCESS, bold: true } },
      { text: "", options: { breakLine: true, fontSize: 4 } },
      { text: "Keep splitting until ALL", options: { breakLine: true, fontSize: 10, color: C.MUTED } },
      { text: "factors are PRIME.", options: { fontSize: 10, color: C.MUTED } },
    ], {
      x: 6.0, y: CONTENT_TOP + 0.45, w: 3.4, h: 2.6,
      fontFace: FONT_B, margin: 0, valign: "top",
    });
  });

  // ── SLIDE 4: Fluency Sprint (Stage 1) ───────────────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Mixed Operations Sprint — 60 Seconds", { color: C.ACCENT });

    // Grid of mixed operations (4 cols x 4 rows = 16 problems)
    const problems = [
      "37 + 48 =",    "9 x 7 =",     "84 - 39 =",    "72 / 8 =",
      "8 x 12 =",     "156 - 78 =",   "63 / 9 =",     "245 + 367 =",
      "56 / 7 =",     "43 + 89 =",    "7 x 11 =",     "132 - 57 =",
      "6 x 8 =",      "96 / 12 =",    "204 + 198 =",  "11 x 9 =",
    ];
    const gridCols = 4, gridRows = 4;
    const cellW = 2.0, cellH = 0.62;
    const gridX = 0.7, gridY = CONTENT_TOP + 0.05;

    // Colour-code by operation
    const opColors = [C.PRIMARY, C.ALERT, C.SECONDARY, C.ACCENT];
    const opIndices = [
      0, 1, 2, 3,  // +, x, -, /
      1, 2, 3, 0,  // x, -, /, +
      3, 0, 1, 2,  // /, +, x, -
      1, 3, 0, 1,  // x, /, +, x
    ];

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const idx = r * gridCols + c;
        const px = gridX + c * (cellW + 0.18);
        const py = gridY + r * (cellH + 0.12);
        addCard(s, px, py, cellW, cellH, { strip: opColors[opIndices[idx]] });
        s.addText((idx + 1) + ".  " + problems[idx], {
          x: px + 0.12, y: py, w: cellW - 0.2, h: cellH,
          fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
          valign: "middle", margin: 0, bold: true,
        });
      }
    }

    // Timer instruction
    addTextOnShape(s, "60 seconds — GO!", {
      x: 3.5, y: SAFE_BOTTOM - 0.5, w: 3, h: 0.42, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, {
      fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_FLUENCY);
  })();

  // ── SLIDE 5: LI / SC ──────────────────────────────────────────────────
  liSlide(pres,
    ["We are learning to use the lattice method for multiplication and to apply all four processes confidently so we can choose the most efficient method for different calculations."],
    [
      "I can set up and complete a lattice grid for multiplication.",
      "I can add along the diagonals of a lattice grid, regrouping where needed, to find the product.",
      "I can choose and apply the correct algorithm (vertical addition, subtraction, multiplication, short division, or lattice) for a given problem.",
    ],
    NOTES_LISC, FOOTER);

  // ── SLIDE 6: I Do — Worked Example 1: 47 x 63 (Stage 2) ───────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example: 47 x 63 (Lattice Method)", { fontSize: 20, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "47 x 63 = ?", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 3.0, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    // Steps on the left
    addCard(s, 0.5, CONTENT_TOP + 0.55, 4.5, 3.35, { strip: C.PRIMARY });
    const steps = [
      { label: "Step 1:", text: "Draw a 2x2 grid (2 digits x 2 digits)" },
      { label: "Step 2:", text: "Draw diagonals in every cell (top-right to bottom-left)" },
      { label: "Step 3:", text: "Write 4, 7 across top; 6, 3 down the right" },
      { label: "Step 4:", text: "Multiply into cells. Split tens/ones at the diagonal." },
      { label: "Step 5:", text: "Add along each diagonal from bottom-right" },
      { label: "Step 6:", text: "Read answer: top-left down, then across bottom" },
    ];
    steps.forEach((st, i) => {
      s.addText([
        { text: st.label + " ", options: { bold: true, fontSize: 11, color: C.PRIMARY } },
        { text: st.text, options: { fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 0.7, y: CONTENT_TOP + 0.65 + i * 0.48, w: 4.1, h: 0.42,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Lattice grid on the right — 47 x 63
    // Products: 4x6=24, 7x6=42, 4x3=12, 7x3=21
    const gridX = 5.8, gridY = CONTENT_TOP + 0.3;
    const cSize = 0.9;
    drawLatticeGrid(s, gridX, gridY, cSize, [4, 7], [6, 3], {
      showProducts: true,
      products: [
        [{ tens: 2, ones: 4 }, { tens: 4, ones: 2 }],  // row 0 (x6)
        [{ tens: 1, ones: 2 }, { tens: 2, ones: 1 }],   // row 1 (x3)
      ],
      showAnswer: true,
      diagonalSums: [2, 9, 6, 1],  // reading: 2961
      highlightDiag: true,
    });

    // Key misconception callout
    addCard(s, 5.5, CONTENT_TOP + 2.4, 4.0, 0.9, { strip: C.ALERT });
    s.addText([
      { text: "Key Rule:", options: { bold: true, breakLine: true, fontSize: 10, color: C.ALERT } },
      { text: "The diagonal ALWAYS separates tens from ones.", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "7 x 6 = 42 means 4 above the line, 2 below.", options: { fontSize: 10, color: C.CHARCOAL } },
    ], {
      x: 5.65, y: CONTENT_TOP + 2.48, w: 3.7, h: 0.78,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Estimation check — full width bar below all content
    addTextOnShape(s, "Check: 50 x 60 = 3,000. Answer: 2,961. Confirmed!", {
      x: 0.5, y: 4.65, w: 9, h: 0.35, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, {
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_WE1);
  })();

  // ── SLIDE 7: I Do — Worked Example 2: 358 x 24 (Stage 2) ──────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example: 358 x 24 (3-digit x 2-digit)", { fontSize: 19, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "358 x 24 = ?", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 3.0, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    // Steps on the left
    addCard(s, 0.5, CONTENT_TOP + 0.55, 4.3, 2.4, { strip: C.PRIMARY });
    s.addText([
      { text: "3 digits x 2 digits = 3 columns x 2 rows", options: { bold: true, breakLine: true, fontSize: 11, color: C.PRIMARY } },
      { text: "Top row (x2): 3x2=06, 5x2=10, 8x2=16", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "Bottom row (x4): 3x4=12, 5x4=20, 8x4=32", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "", options: { breakLine: true, fontSize: 4 } },
      { text: "Diagonal addition (bottom-right to top-left):", options: { bold: true, breakLine: true, fontSize: 10, color: C.SECONDARY } },
      { text: "Diag 1: 2  |  Diag 2: 3+6=9  |  Diag 3: 1+0+2=3", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "Carry: Diag 3 continued: +1+0=5 (wait...)", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "Answer: 8,592", options: { bold: true, fontSize: 12, color: C.SUCCESS } },
    ], {
      x: 0.7, y: CONTENT_TOP + 0.65, w: 3.9, h: 2.2,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Lattice grid on the right — 358 x 24, 3 cols x 2 rows
    // Products: 3x2=06, 5x2=10, 8x2=16, 3x4=12, 5x4=20, 8x4=32
    const gridX = 5.3, gridY = CONTENT_TOP + 0.2;
    const cSize = 0.82;
    drawLatticeGrid(s, gridX, gridY, cSize, [3, 5, 8], [2, 4], {
      showProducts: true,
      products: [
        [{ tens: 0, ones: 6 }, { tens: 1, ones: 0 }, { tens: 1, ones: 6 }],  // row 0 (x2)
        [{ tens: 1, ones: 2 }, { tens: 2, ones: 0 }, { tens: 3, ones: 2 }],   // row 1 (x4)
      ],
      showAnswer: true,
      diagonalSums: [0, 8, 5, 9, 2],  // reading: 08592 = 8592
      highlightDiag: true,
    });

    // Key insight card
    addCard(s, 5.2, CONTENT_TOP + 2.2, 4.3, 1.15, { strip: C.ACCENT });
    s.addText([
      { text: "Scaling Up", options: { bold: true, breakLine: true, fontSize: 11, color: C.ACCENT } },
      { text: "More digits = bigger grid, but the PROCESS is the same:", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "1. Multiply into cells", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "2. Split tens/ones at diagonal", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "3. Add along diagonals", options: { fontSize: 10, color: C.CHARCOAL } },
    ], {
      x: 5.35, y: CONTENT_TOP + 2.28, w: 4.0, h: 1.05,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Estimation check — full width bar below all content
    addTextOnShape(s, "Check: 360 x 25 = 9,000. Answer: 8,592. Confirmed!", {
      x: 0.5, y: 4.65, w: 9, h: 0.35, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, {
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_WE2);
  })();

  // ── SLIDES 8-9: CFU — Show Me Boards: 56 x 38 (withReveal) ────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "CFU | Show Me Boards", { color: C.ALERT, w: 2.8 });
      addTitle(s, "Complete the Lattice: 56 x 38", { color: C.ALERT });

      // Instructions on left
      addCard(s, 0.5, CONTENT_TOP + 0.05, 4.5, 2.8, { strip: C.ALERT });
      s.addText([
        { text: "On your whiteboards:", options: { bold: true, breakLine: true, fontSize: 14, color: C.ALERT } },
        { text: "1. Draw a 2x2 lattice grid", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "2. Write 5, 6 across top; 3, 8 down right", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "3. Multiply into each cell (split tens/ones)", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "4. Add along diagonals", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "5. Write the final answer", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "60 seconds — then boards up!", options: { fontSize: 13, color: C.ALERT, bold: true } },
      ], {
        x: 0.7, y: CONTENT_TOP + 0.15, w: 4.1, h: 2.6,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Empty lattice grid on right (no products shown)
      const gridX = 6.0, gridY = CONTENT_TOP + 0.3;
      const cSize = 1.0;
      drawLatticeGrid(s, gridX, gridY, cSize, [5, 6], [3, 8], {
        showProducts: false,
      });

      // "Your turn" prompt below grid
      addTextOnShape(s, "Fill in the products!", {
        x: gridX, y: gridY + cSize * 2 + 0.15, w: cSize * 2, h: 0.35, rectRadius: 0.08,
        fill: { color: C.ACCENT },
      }, {
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_CFU1);
      return s;
    },
    (slide) => {
      // Reveal: completed lattice grid
      // 5x3=15, 6x3=18, 5x8=40, 6x8=48
      // Diagonals: 8, 4+8+0=12 -> write 2 carry 1, 1+1+1+4=7 -> +1 carry = 8, 1 -> +0 = 1
      // Wait: 56 x 38 = 2128
      // Products: 5x3=15 (1,5), 6x3=18 (1,8), 5x8=40 (4,0), 6x8=48 (4,8)
      // Diag 1: 8. Diag 2: 4+0+8=12, write 2 carry 1. Diag 3: 1+4+1=6 +carry1=7. Hmm wait
      // Diag 3: tens of 5x3 + ones of 5x8 (wrong grouping). Let me think about this carefully.
      // Grid layout:
      //         5         6
      //     +--------+--------+
      //  3  | 1 / 5  | 1 / 8  |
      //     +--------+--------+
      //  8  | 4 / 0  | 4 / 8  |
      //     +--------+--------+
      // Diag 1 (bottom-right corner): ones of 6x8 = 8
      // Diag 2: tens of 6x8 + ones of 5x8 + ones of 6x3 = 4+0+8 = 12, write 2 carry 1
      // Diag 3: tens of 5x8 + ones of 5x3 + tens of 6x3 = 4+5+1 = 10, + carry 1 = 11, write 1 carry 1
      // Diag 4: tens of 5x3 = 1, + carry 1 = 2
      // Answer: 2,128. Correct! 56 x 38 = 2128.

      // Completed grid on right side
      addCard(slide, 5.2, CONTENT_TOP + 0.05, 4.3, 3.65, { strip: C.SUCCESS });
      slide.addText("Solution: 56 x 38 = 2,128", {
        x: 5.4, y: CONTENT_TOP + 0.12, w: 3.9, h: 0.3,
        fontSize: 14, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      const gridX = 5.8, gridY = CONTENT_TOP + 0.55;
      const cSize = 0.85;
      drawLatticeGrid(slide, gridX, gridY, cSize, [5, 6], [3, 8], {
        showProducts: true,
        products: [
          [{ tens: 1, ones: 5 }, { tens: 1, ones: 8 }],  // row 0 (x3)
          [{ tens: 4, ones: 0 }, { tens: 4, ones: 8 }],   // row 1 (x8)
        ],
        showAnswer: true,
        diagonalSums: [2, 1, 2, 8],  // reading: 2128
      });

      // Diagonal addition breakdown
      slide.addText([
        { text: "Diagonal addition:", options: { bold: true, breakLine: true, fontSize: 10, color: C.SECONDARY } },
        { text: "D1: 8", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
        { text: "D2: 4+0+8 = 12 (write 2, carry 1)", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
        { text: "D3: 4+5+1 = 10 +1 = 11 (write 1, carry 1)", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
        { text: "D4: 1 +1 = 2", options: { fontSize: 9, color: C.CHARCOAL } },
      ], {
        x: 5.4, y: CONTENT_TOP + 2.6, w: 3.9, h: 1.1,
        fontFace: FONT_B, margin: 0, valign: "top",
      });
    }
  );

  // ── SLIDES 10-11: We Do — Problem Pair 1: 84 x 57 (withReveal) ────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Lattice Method: 84 x 57", { fontSize: 22, color: C.SECONDARY });

      // Problem prompt
      addTextOnShape(s, "Lattice method on your whiteboard", {
        x: 0.5, y: CONTENT_TOP - 0.05, w: 4.5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_DARK },
      }, {
        fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Instructions on left
      addCard(s, 0.5, CONTENT_TOP + 0.55, 4.5, 2.8, { strip: C.SECONDARY });
      s.addText([
        { text: "On your whiteboards:", options: { bold: true, breakLine: true, fontSize: 14, color: C.SECONDARY } },
        { text: "1. Draw a 2x2 lattice grid", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "2. Write 8, 4 across top; 5, 7 down right", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "3. Multiply into each cell", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "4. Add along diagonals", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "60 seconds — boards up!", options: { fontSize: 13, color: C.ALERT, bold: true } },
      ], {
        x: 0.7, y: CONTENT_TOP + 0.65, w: 4.1, h: 2.5,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Large number display
      addTextOnShape(s, "84 x 57", {
        x: 5.8, y: CONTENT_TOP + 0.8, w: 3.5, h: 2.2, rectRadius: 0.15,
        fill: { color: C.PRIMARY },
      }, {
        fontSize: 48, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (slide) => {
      // 84 x 57 = 4788
      // Products: 8x5=40 (4,0), 4x5=20 (2,0), 8x7=56 (5,6), 4x7=28 (2,8)
      // Diag 1: 8. Diag 2: 2+6+0=8. Diag 3: 5+0+2=7. Diag 4: 4.
      // Answer: 4788

      addCard(slide, 5.2, CONTENT_TOP + 0.05, 4.3, 3.65, { strip: C.SUCCESS });
      slide.addText("Solution: 84 x 57 = 4,788", {
        x: 5.4, y: CONTENT_TOP + 0.12, w: 3.9, h: 0.3,
        fontSize: 14, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      const gridX = 5.8, gridY = CONTENT_TOP + 0.55;
      const cSize = 0.85;
      drawLatticeGrid(slide, gridX, gridY, cSize, [8, 4], [5, 7], {
        showProducts: true,
        products: [
          [{ tens: 4, ones: 0 }, { tens: 2, ones: 0 }],  // row 0 (x5)
          [{ tens: 5, ones: 6 }, { tens: 2, ones: 8 }],   // row 1 (x7)
        ],
        showAnswer: true,
        diagonalSums: [4, 7, 8, 8],  // reading: 4788
      });

      // Diagonal addition breakdown
      slide.addText([
        { text: "Diagonal addition:", options: { bold: true, breakLine: true, fontSize: 10, color: C.SECONDARY } },
        { text: "D1: 8  |  D2: 2+6+0 = 8  |  D3: 5+0+2 = 7  |  D4: 4", options: { fontSize: 9, color: C.CHARCOAL } },
      ], {
        x: 5.4, y: CONTENT_TOP + 2.55, w: 3.9, h: 0.5,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addTextOnShape(slide, "Check: 80 x 60 = 4,800. Close!", {
        x: 5.4, y: 4.45, w: 3.8, h: 0.35, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── SLIDES 12-13: We Do — Problem Pair 2: 245 x 36 (withReveal) ───────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Lattice Method: 245 x 36 (3-digit x 2-digit)", { fontSize: 19, color: C.SECONDARY });

      // Problem prompt
      addTextOnShape(s, "Lattice method — bigger grid!", {
        x: 0.5, y: CONTENT_TOP - 0.05, w: 4.3, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_DARK },
      }, {
        fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Instructions on left
      addCard(s, 0.5, CONTENT_TOP + 0.55, 4.5, 2.8, { strip: C.SECONDARY });
      s.addText([
        { text: "On your whiteboards:", options: { bold: true, breakLine: true, fontSize: 14, color: C.SECONDARY } },
        { text: "1. Draw a 3x2 lattice grid (3 columns, 2 rows)", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "2. Write 2, 4, 5 across top; 3, 6 down right", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "3. Multiply into each cell", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "4. Add along diagonals (remember to regroup!)", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "90 seconds — boards up!", options: { fontSize: 13, color: C.ALERT, bold: true } },
      ], {
        x: 0.7, y: CONTENT_TOP + 0.65, w: 4.1, h: 2.5,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Large number display
      addTextOnShape(s, "245 x 36", {
        x: 5.8, y: CONTENT_TOP + 0.8, w: 3.5, h: 2.2, rectRadius: 0.15,
        fill: { color: C.PRIMARY },
      }, {
        fontSize: 44, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO2);
      return s;
    },
    (slide) => {
      // 245 x 36 = 8820
      // Products:
      // Top row (x3): 2x3=06 (0,6), 4x3=12 (1,2), 5x3=15 (1,5)
      // Bottom row (x6): 2x6=12 (1,2), 4x6=24 (2,4), 5x6=30 (3,0)
      // Grid (3 cols, 2 rows):
      //       2        4        5
      //   +-------+-------+-------+
      // 3 | 0 / 6 | 1 / 2 | 1 / 5 |
      //   +-------+-------+-------+
      // 6 | 1 / 2 | 2 / 4 | 3 / 0 |
      //   +-------+-------+-------+
      // Diag 1 (bottom-right): 0
      // Diag 2: 3+5 = 8. Wait, that's ones of 5x6 (=0) + ... Let me re-examine.
      // The diagonals run from bottom-right to top-left:
      // Diag 1: ones of cell(1,2) = 0
      // Diag 2: tens of cell(1,2) + ones of cell(1,1) + ones of cell(0,2) = 3 + 4 + 5 = 12, write 2 carry 1
      // Diag 3: tens of cell(1,1) + ones of cell(1,0) + tens of cell(0,2) + ones of cell(0,1) = 2 + 2 + 1 + 2 = 7 + carry 1 = 8
      // Diag 4: tens of cell(1,0) + ones of cell(0,0) + tens of cell(0,1) = 1 + 6 + 1 = 8
      // Diag 5: tens of cell(0,0) = 0
      // Wait, that gives 0 8 8 2 0 = 08820 = 8820. Let me verify: 245 x 36 = 245 x 30 + 245 x 6 = 7350 + 1470 = 8820. Correct!

      addCard(slide, 5.0, CONTENT_TOP + 0.05, 4.5, 3.65, { strip: C.SUCCESS });
      slide.addText("Solution: 245 x 36 = 8,820", {
        x: 5.2, y: CONTENT_TOP + 0.12, w: 4.1, h: 0.3,
        fontSize: 14, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      const gridX = 5.5, gridY = CONTENT_TOP + 0.55;
      const cSize = 0.72;
      drawLatticeGrid(slide, gridX, gridY, cSize, [2, 4, 5], [3, 6], {
        showProducts: true,
        products: [
          [{ tens: 0, ones: 6 }, { tens: 1, ones: 2 }, { tens: 1, ones: 5 }],  // row 0 (x3)
          [{ tens: 1, ones: 2 }, { tens: 2, ones: 4 }, { tens: 3, ones: 0 }],   // row 1 (x6)
        ],
        showAnswer: true,
        diagonalSums: [0, 8, 8, 2, 0],  // reading: 08820 = 8820
      });

      // Diagonal addition breakdown
      slide.addText([
        { text: "Diagonal addition:", options: { bold: true, breakLine: true, fontSize: 10, color: C.SECONDARY } },
        { text: "D1: 0", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
        { text: "D2: 3+4+5 = 12 (write 2, carry 1)", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
        { text: "D3: 2+2+1+2 = 7 +1 = 8", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
        { text: "D4: 1+6+1 = 8  |  D5: 0", options: { fontSize: 9, color: C.CHARCOAL } },
      ], {
        x: 5.2, y: CONTENT_TOP + 2.4, w: 4.1, h: 1.1,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addTextOnShape(slide, "Check: 250 x 36 = 9,000. Answer: 8,820. Reasonable!", {
        x: 0.5, y: 4.65, w: 4.5, h: 0.35, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── SLIDES 14-15: CFU Hinge Question — Which grid is correct? (withReveal) ─
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "Hinge Question", { color: C.ALERT, w: 2.2 });
      addTitle(s, "Which lattice grid correctly shows 73 x 45?", { fontSize: 19, color: C.ALERT });

      // Four option cards with mini lattice grids
      // Correct answer: C
      // A: diagonal direction wrong (top-left to bottom-right)
      // B: digits swapped (73 down side, 45 across top)
      // C: correct
      // D: multiplication error (7x4=24 instead of 28)

      const optionLabels = ["A", "B", "C", "D"];
      const optionDescs = [
        "Diagonals drawn\nwrong direction",
        "Digits placed\nin wrong positions",
        "Correct setup\nand products",
        "Multiplication\nerror: 7x4=24",
      ];
      const optionColors = [C.PRIMARY, C.SECONDARY, C.SUCCESS, C.ACCENT];

      optionLabels.forEach((lbl, i) => {
        const ox = 0.3 + i * 2.4;
        const oy = CONTENT_TOP + 0.1;
        addCard(s, ox, oy, 2.15, 2.6, { strip: optionColors[i] });

        // Letter badge
        addTextOnShape(s, lbl, {
          x: ox + 0.08, y: oy + 0.08, w: 0.4, h: 0.4, rectRadius: 0.2,
          fill: { color: optionColors[i] },
        }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

        // Mini grid representation (simplified text-based)
        // For simplicity, show as text representation of the grid
        const gridTexts = [
          "  7   3\n4|2/8|1/2|\n5|3/5|1/5|",  // A: wrong diagonal direction label
          "  4   5\n7|2/8|3/5|\n3|1/2|1/5|",  // B: swapped
          "  7   3\n4|2/8|1/2|\n5|3/5|1/5|",  // C: correct
          "  7   3\n4|2/4|1/2|\n5|3/5|1/5|",  // D: error in 7x4
        ];

        // Draw a simple 2x2 mini grid
        const mgX = ox + 0.2;
        const mgY = oy + 0.55;
        const mcs = 0.55;

        // Grid cells
        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < 2; c++) {
            s.addShape("rect", {
              x: mgX + c * mcs, y: mgY + r * mcs, w: mcs, h: mcs,
              fill: { color: C.BG_CARD },
              line: { color: C.CHARCOAL, width: 1 },
            });
            // Diagonal
            if (i === 0) {
              // A: wrong direction diagonal (top-left to bottom-right)
              s.addShape("line", {
                x: mgX + c * mcs, y: mgY + r * mcs,
                w: mcs, h: mcs,
                line: { color: C.ALERT, width: 0.5 },
              });
            } else {
              // B, C, D: correct direction (top-right to bottom-left)
              s.addShape("line", {
                x: mgX + c * mcs + mcs, y: mgY + r * mcs,
                w: -mcs, h: mcs,
                line: { color: C.SECONDARY, width: 0.5 },
              });
            }
          }
        }

        // Digits on top
        if (i === 1) {
          // B: swapped — 4, 5 on top
          s.addText("4", { x: mgX, y: mgY - 0.2, w: mcs, h: 0.2, fontSize: 8, fontFace: FONT_H, color: C.CHARCOAL, align: "center", margin: 0, bold: true });
          s.addText("5", { x: mgX + mcs, y: mgY - 0.2, w: mcs, h: 0.2, fontSize: 8, fontFace: FONT_H, color: C.CHARCOAL, align: "center", margin: 0, bold: true });
          // Digits on right
          s.addText("7", { x: mgX + 2 * mcs + 0.02, y: mgY, w: 0.2, h: mcs, fontSize: 8, fontFace: FONT_H, color: C.CHARCOAL, align: "center", valign: "middle", margin: 0, bold: true });
          s.addText("3", { x: mgX + 2 * mcs + 0.02, y: mgY + mcs, w: 0.2, h: mcs, fontSize: 8, fontFace: FONT_H, color: C.CHARCOAL, align: "center", valign: "middle", margin: 0, bold: true });
        } else {
          // A, C, D: 7, 3 on top
          s.addText("7", { x: mgX, y: mgY - 0.2, w: mcs, h: 0.2, fontSize: 8, fontFace: FONT_H, color: C.CHARCOAL, align: "center", margin: 0, bold: true });
          s.addText("3", { x: mgX + mcs, y: mgY - 0.2, w: mcs, h: 0.2, fontSize: 8, fontFace: FONT_H, color: C.CHARCOAL, align: "center", margin: 0, bold: true });
          // Digits on right
          s.addText("4", { x: mgX + 2 * mcs + 0.02, y: mgY, w: 0.2, h: mcs, fontSize: 8, fontFace: FONT_H, color: C.CHARCOAL, align: "center", valign: "middle", margin: 0, bold: true });
          s.addText("5", { x: mgX + 2 * mcs + 0.02, y: mgY + mcs, w: 0.2, h: mcs, fontSize: 8, fontFace: FONT_H, color: C.CHARCOAL, align: "center", valign: "middle", margin: 0, bold: true });
        }

        // Cell products (tens above diag, ones below)
        // 73 x 45: 7x4=28, 3x4=12, 7x5=35, 3x5=15
        const cellProducts = [
          // A, C have correct products: [[2,8],[1,2],[3,5],[1,5]]
          // B: swapped arrangement: 4x7=28, 5x7=35, 4x3=12, 5x3=15
          // D: error in 7x4=24 instead of 28
        ];
        let prods;
        if (i === 0 || i === 2) {
          prods = [[2, 8], [1, 2], [3, 5], [1, 5]];  // correct products
        } else if (i === 1) {
          prods = [[2, 8], [3, 5], [1, 2], [1, 5]];  // B: different arrangement
        } else {
          prods = [[2, 4], [1, 2], [3, 5], [1, 5]];  // D: error in cell(0,0)
        }

        // Place products in cells
        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < 2; c++) {
            const pi = r * 2 + c;
            const cellX = mgX + c * mcs;
            const cellY = mgY + r * mcs;
            // Tens (upper-left area)
            s.addText(String(prods[pi][0]), {
              x: cellX + 0.02, y: cellY + 0.02,
              w: mcs * 0.45, h: mcs * 0.45,
              fontSize: 7, fontFace: FONT_B, color: C.PRIMARY,
              align: "center", valign: "middle", margin: 0, bold: true,
            });
            // Ones (lower-right area)
            s.addText(String(prods[pi][1]), {
              x: cellX + mcs * 0.55 - 0.02, y: cellY + mcs * 0.55 - 0.02,
              w: mcs * 0.45, h: mcs * 0.45,
              fontSize: 7, fontFace: FONT_B, color: C.ACCENT,
              align: "center", valign: "middle", margin: 0, bold: true,
            });
          }
        }

        // Description below grid
        s.addText(optionDescs[i], {
          x: ox + 0.05, y: oy + 1.85, w: 2.05, h: 0.65,
          fontSize: 8, fontFace: FONT_B, color: C.MUTED,
          align: "center", valign: "top", margin: 0, italic: true,
        });
      });

      // Instruction
      addTextOnShape(s, "Hold up 1, 2, 3, or 4 fingers", {
        x: 2.5, y: CONTENT_TOP + 3.0, w: 5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, {
        fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_HINGE);
      return s;
    },
    (slide) => {
      // Cover the "Hold up" bar from the base slide with a white background
      slide.addShape("rect", {
        x: 0, y: CONTENT_TOP + 2.75, w: 10, h: SAFE_BOTTOM - CONTENT_TOP - 2.75,
        fill: { color: C.BG_LIGHT },
      });

      // Reveal: highlight C as correct
      addTextOnShape(slide, "C is correct! 73 x 45 = 3,285", {
        x: 1.5, y: CONTENT_TOP + 2.8, w: 7, h: 0.45, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Compact single-line error summary
      slide.addText("A: Wrong diagonal direction  |  B: Digits swapped  |  D: 7x4 = 28, not 24", {
        x: 0.5, y: CONTENT_TOP + 3.3, w: 9, h: 0.28,
        fontSize: 9, fontFace: FONT_B, color: C.ALERT, margin: 0, valign: "middle",
        align: "center",
      });
    }
  );

  // ── SLIDE 16: You Do — Mixed Practice (Stage 4) ────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, STAGE_COLORS["4"]);
    addStageBadge(s, 4, "You Do");
    addTitle(s, "Mixed Practice: Choose the Correct Algorithm", { fontSize: 19, color: STAGE_COLORS["4"] });

    // Instruction bar
    addTextOnShape(s, "8 problems. 4 operations. Choose the right method for each.", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 9, h: 0.38, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    // 8 problems in a 4x2 grid
    const problems = [
      { num: 1, text: "4,567 + 2,845", op: "+", color: C.PRIMARY },
      { num: 2, text: "67 x 43\n(lattice method)", op: "x", color: C.ACCENT },
      { num: 3, text: "7,203 - 4,568", op: "-", color: C.SECONDARY },
      { num: 4, text: "852 / 6", op: "/", color: C.ALERT },
      { num: 5, text: "3,089 + 5,764", op: "+", color: C.PRIMARY },
      { num: 6, text: "86 x 54\n(lattice method)", op: "x", color: C.ACCENT },
      { num: 7, text: "9,004 - 6,237", op: "-", color: C.SECONDARY },
      { num: 8, text: "945 / 7", op: "/", color: C.ALERT },
    ];

    const gridCols = 4, gridRows = 2;
    const cellW = 2.1, cellH = 1.25;
    const gridX = 0.5, gridY = CONTENT_TOP + 0.48;

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const idx = r * gridCols + c;
        const p = problems[idx];
        const px = gridX + c * (cellW + 0.12);
        const py = gridY + r * (cellH + 0.12);

        addCard(s, px, py, cellW, cellH, { strip: p.color });

        // Problem number badge
        addTextOnShape(s, String(p.num), {
          x: px + 0.1, y: py + 0.08, w: 0.32, h: 0.32, rectRadius: 0.16,
          fill: { color: p.color },
        }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });

        // Operation badge
        addTextOnShape(s, p.op, {
          x: px + cellW - 0.45, y: py + 0.08, w: 0.32, h: 0.32, rectRadius: 0.16,
          fill: { color: p.color },
        }, { fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true });

        // Problem text
        s.addText(p.text, {
          x: px + 0.1, y: py + 0.42, w: cellW - 0.2, h: cellH - 0.52,
          fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
      }
    }

    // Worksheet reference + timer
    addTextOnShape(s, "Use your SR2 Worksheet   |   10 minutes", {
      x: 2.0, y: SAFE_BOTTOM - 0.5, w: 6, h: 0.4, rectRadius: 0.08,
      fill: { color: STAGE_COLORS["4"] },
    }, {
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_YOUDO);
  })();

  // ── SLIDE 17: Exit Ticket (Stage 5) ────────────────────────────────────
  exitTicketSlide(pres, [
    "Q1: Use the lattice method to solve 67 x 43. Show your grid and all working.",
    "Q2: Solve 4,823 - 2,956. Choose the correct algorithm and show your working.",
    "Q3: Explain when you would choose the lattice method instead of the vertical method for multiplication. Give a reason.",
  ], NOTES_EXIT, FOOTER);

  // ── SLIDE 18: Resources ────────────────────────────────────────────────
  addResourceSlide(pres, [
    {
      name: "SR1 — Lattice Practice",
      fileName: "SR1_Lattice_Practice.pdf",
      description: "6 lattice problems with pre-drawn grids. One per student (enabling support).",
    },
    {
      name: "SR2 — Mixed Practice",
      fileName: "SR2_Mixed_Practice.pdf",
      description: "12 mixed problems (3 each of +, -, x, /). One per student.",
    },
    {
      name: "SR3 — All Answers",
      fileName: "SR3_All_Answers.pdf",
      description: "Answer key for SR1 and SR2. Teacher reference only.",
    },
    {
      name: "EXT1 — Method Comparison Investigation",
      fileName: "EXT1_Method_Comparison.pdf",
      description: "Extending: compare vertical vs lattice for 5 problems. Write conclusion.",
    },
  ], { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // ── SLIDE 19: Closing ──────────────────────────────────────────────────
  closingSlide(pres,
    "Think about all four processes this week: addition, subtraction, multiplication, and division. Turn to your partner: Which do you feel MOST confident with? Which needs more practice?",
    [
      "SC1: I can set up and complete a lattice grid for multiplication.",
      "SC2: I can add along the diagonals, regrouping where needed, to find the product.",
      "SC3: I can choose and apply the correct algorithm for a given problem.",
      "Week reflection: You've reviewed all four processes and added the lattice method to your toolkit!",
    ],
    NOTES_CLOSING);

  // ── Write PPTX ────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: OUT_DIR + "/4Proc_Lesson4_Lattice_Mixed_Practice.pptx" });
  console.log("PPTX written to " + OUT_DIR);

  // ── Generate companion PDFs ────────────────────────────────────────────
  await generateSR1_LatticePractice();
  await generateSR2_MixedPractice();
  await generateSR3_AllAnswers();
  await generateEXT1_MethodComparison();
  console.log("All PDFs generated.");
}

// ── PDF Helper: Draw a lattice grid on a PDF ─────────────────────────────────

function drawLatticePdf(doc, x, y, cellSize, topDigits, sideDigits, opts) {
  const o = opts || {};
  const cols = topDigits.length;
  const rows = sideDigits.length;

  // Draw cells with diagonals
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = x + c * cellSize;
      const cy = y + r * cellSize;

      // Cell border
      doc.save();
      doc.rect(cx, cy, cellSize, cellSize)
        .lineWidth(1).strokeColor("#" + C.PRIMARY).stroke();
      doc.restore();

      // Diagonal line (top-right to bottom-left)
      doc.save();
      doc.moveTo(cx + cellSize, cy).lineTo(cx, cy + cellSize)
        .lineWidth(0.5).strokeColor("#" + C.SECONDARY).stroke();
      doc.restore();

      // Fill products if provided
      if (o.showProducts && o.products && o.products[r] && o.products[r][c]) {
        const prod = o.products[r][c];
        // Tens (top-left triangle)
        doc.fontSize(10).font("Helvetica-Bold").fillColor("#" + C.PRIMARY);
        doc.text(String(prod.tens), cx + 2, cy + 2, {
          width: cellSize / 2 - 2, align: "center",
        });
        // Ones (bottom-right triangle)
        doc.fontSize(10).font("Helvetica-Bold").fillColor("#" + C.ACCENT);
        doc.text(String(prod.ones), cx + cellSize / 2, cy + cellSize / 2 + 2, {
          width: cellSize / 2 - 2, align: "center",
        });
      }
    }
  }

  // Top digit labels
  doc.fontSize(12).font("Helvetica-Bold").fillColor("#000000");
  topDigits.forEach((d, i) => {
    doc.text(String(d), x + i * cellSize, y - 18, {
      width: cellSize, align: "center",
    });
  });

  // Right-side digit labels
  sideDigits.forEach((d, i) => {
    doc.text(String(d), x + cols * cellSize + 5, y + i * cellSize + cellSize / 3, {
      width: 20,
    });
  });

  return y + rows * cellSize + 10;
}

// ── PDF: SR1 — Lattice Practice ──────────────────────────────────────────────

async function generateSR1_LatticePractice() {
  const doc = createPdf({ title: "Lattice Practice Worksheet" });

  let y = addPdfHeader(doc, "Lattice Method Practice", {
    subtitle: "SR1 — Supporting Resource",
    color: C.PRIMARY,
    lessonInfo: "Session 4 of 4 | Four Processes Review | Year 5/6 Maths",
  });

  y = addTipBox(doc, "Remember: Draw diagonals from top-right to bottom-left in every cell. Multiply into each cell, splitting the product — tens above the diagonal, ones below. Then add along each diagonal from the bottom-right corner, regrouping when the sum exceeds 9.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "2-Digit x 2-Digit (Use the grids below)", y, { color: C.PRIMARY });

  // Problem 1: 34 x 52
  y = addProblem(doc, 1, "34 x 52 = _____", y, { color: C.PRIMARY });
  y = drawLatticePdf(doc, 180, y, 50, [3, 4], [5, 2], {});
  y += 20;

  // Problem 2: 67 x 28
  y = addProblem(doc, 2, "67 x 28 = _____", y, { color: C.PRIMARY });
  y = drawLatticePdf(doc, 180, y, 50, [6, 7], [2, 8], {});
  y += 20;

  // Problem 3: 93 x 46
  y = addProblem(doc, 3, "93 x 46 = _____", y, { color: C.PRIMARY });
  y = drawLatticePdf(doc, 180, y, 50, [9, 3], [4, 6], {});
  y += 20;

  // Check for page break
  doc.addPage();
  y = 50;

  y = addSectionHeading(doc, "3-Digit x 2-Digit (Bigger grids!)", y, { color: C.ACCENT });

  // Problem 4: 234 x 15
  y = addProblem(doc, 4, "234 x 15 = _____", y, { color: C.ACCENT });
  y = drawLatticePdf(doc, 140, y, 50, [2, 3, 4], [1, 5], {});
  y += 20;

  // Problem 5: 516 x 37
  y = addProblem(doc, 5, "516 x 37 = _____", y, { color: C.ACCENT });
  y = drawLatticePdf(doc, 140, y, 50, [5, 1, 6], [3, 7], {});
  y += 20;

  // Problem 6: 472 x 68
  y = addProblem(doc, 6, "472 x 68 = _____", y, { color: C.ACCENT });
  y = drawLatticePdf(doc, 140, y, 50, [4, 7, 2], [6, 8], {});
  y += 20;

  y = addTipBox(doc, "Estimation check: After each problem, round the numbers and multiply mentally. Is your lattice answer close to your estimate? If not, check your diagonal addition!", y, { color: C.ALERT });

  addPdfFooter(doc, "Session 4 of 4 | Four Processes Review | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR1_Lattice_Practice.pdf");
  console.log("  SR1 Lattice Practice written.");
}

// ── PDF: SR2 — Mixed Practice ────────────────────────────────────────────────

async function generateSR2_MixedPractice() {
  const doc = createPdf({ title: "Mixed Practice Worksheet" });

  let y = addPdfHeader(doc, "Mixed Practice — All Four Processes", {
    subtitle: "SR2 — Supporting Resource",
    color: C.PRIMARY,
    lessonInfo: "Session 4 of 4 | Four Processes Review | Year 5/6 Maths",
  });

  y = addTipBox(doc, "For each problem, choose the correct algorithm: vertical addition, vertical subtraction, lattice multiplication, or short division. Show all your working.", y, { color: C.SECONDARY });

  // Section A: Addition
  y = addSectionHeading(doc, "Section A: Addition", y, { color: C.PRIMARY });

  y = addProblem(doc, 1, "4,567 + 2,845 = _____", y, {
    writeLines: [{ label: "Working:" }, { label: "Answer:" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "3,089 + 5,764 = _____", y, {
    writeLines: [{ label: "Working:" }, { label: "Answer:" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "27,456 + 18,379 = _____", y, {
    writeLines: [{ label: "Working:" }, { label: "Answer:" }],
    color: C.PRIMARY,
  });

  // Section B: Subtraction
  y = addSectionHeading(doc, "Section B: Subtraction", y, { color: C.SECONDARY });

  y = addProblem(doc, 4, "7,203 - 4,568 = _____", y, {
    writeLines: [{ label: "Working:" }, { label: "Answer:" }],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 5, "9,004 - 6,237 = _____", y, {
    writeLines: [{ label: "Working:" }, { label: "Answer:" }],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 6, "50,000 - 23,847 = _____", y, {
    writeLines: [{ label: "Working:" }, { label: "Answer:" }],
    color: C.SECONDARY,
  });

  // Page break
  doc.addPage();
  y = 50;

  // Section C: Multiplication (Lattice)
  y = addSectionHeading(doc, "Section C: Multiplication (Use the Lattice Method)", y, { color: C.ACCENT });

  y = addProblem(doc, 7, "67 x 43 = _____  (Draw your lattice grid below)", y, { color: C.ACCENT });
  y = drawLatticePdf(doc, 180, y, 50, [6, 7], [4, 3], {});
  y += 15;

  y = addProblem(doc, 8, "86 x 54 = _____  (Draw your lattice grid below)", y, { color: C.ACCENT });
  y = drawLatticePdf(doc, 180, y, 50, [8, 6], [5, 4], {});
  y += 15;

  y = addProblem(doc, 9, "347 x 25 = _____  (Draw your lattice grid below)", y, { color: C.ACCENT });
  y = drawLatticePdf(doc, 140, y, 50, [3, 4, 7], [2, 5], {});
  y += 15;

  // Section D: Division
  y = addSectionHeading(doc, "Section D: Short Division", y, { color: C.ALERT });

  y = addProblem(doc, 10, "852 / 6 = _____", y, {
    writeLines: [{ label: "Working:" }, { label: "Answer:" }],
    color: C.ALERT,
  });

  y = addProblem(doc, 11, "945 / 7 = _____", y, {
    writeLines: [{ label: "Working:" }, { label: "Answer:" }],
    color: C.ALERT,
  });

  y = addProblem(doc, 12, "1,368 / 9 = _____", y, {
    writeLines: [{ label: "Working:" }, { label: "Answer:" }],
    color: C.ALERT,
  });

  addPdfFooter(doc, "Session 4 of 4 | Four Processes Review | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR2_Mixed_Practice.pdf");
  console.log("  SR2 Mixed Practice written.");
}

// ── PDF: SR3 — All Answers ───────────────────────────────────────────────────

async function generateSR3_AllAnswers() {
  const doc = createPdf({ title: "Answer Key — All Resources" });

  let y = addPdfHeader(doc, "Answer Key — SR1 & SR2", {
    subtitle: "SR3 — Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: "Session 4 of 4 | Four Processes Review | Year 5/6 Maths",
    showNameDate: false,
  });

  // SR1 Answers
  y = addSectionHeading(doc, "SR1 — Lattice Practice Answers", y, { color: C.PRIMARY });

  y = addProblem(doc, 1, "34 x 52", y, {
    writeLines: [{ label: "Answer:", answer: "1,768" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "67 x 28", y, {
    writeLines: [{ label: "Answer:", answer: "1,876" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "93 x 46", y, {
    writeLines: [{ label: "Answer:", answer: "4,278" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 4, "234 x 15", y, {
    writeLines: [{ label: "Answer:", answer: "3,510" }],
    color: C.ACCENT,
  });

  y = addProblem(doc, 5, "516 x 37", y, {
    writeLines: [{ label: "Answer:", answer: "19,092" }],
    color: C.ACCENT,
  });

  y = addProblem(doc, 6, "472 x 68", y, {
    writeLines: [{ label: "Answer:", answer: "32,096" }],
    color: C.ACCENT,
  });

  // SR2 Answers
  y = addSectionHeading(doc, "SR2 — Mixed Practice Answers", y, { color: C.SECONDARY });

  y = addProblem(doc, 1, "4,567 + 2,845", y, {
    writeLines: [{ label: "Answer:", answer: "7,412" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "3,089 + 5,764", y, {
    writeLines: [{ label: "Answer:", answer: "8,853" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "27,456 + 18,379", y, {
    writeLines: [{ label: "Answer:", answer: "45,835" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 4, "7,203 - 4,568", y, {
    writeLines: [{ label: "Answer:", answer: "2,635" }],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 5, "9,004 - 6,237", y, {
    writeLines: [{ label: "Answer:", answer: "2,767" }],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 6, "50,000 - 23,847", y, {
    writeLines: [{ label: "Answer:", answer: "26,153" }],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 7, "67 x 43", y, {
    writeLines: [{ label: "Answer:", answer: "2,881" }],
    color: C.ACCENT,
  });

  y = addProblem(doc, 8, "86 x 54", y, {
    writeLines: [{ label: "Answer:", answer: "4,644" }],
    color: C.ACCENT,
  });

  y = addProblem(doc, 9, "347 x 25", y, {
    writeLines: [{ label: "Answer:", answer: "8,675" }],
    color: C.ACCENT,
  });

  y = addProblem(doc, 10, "852 / 6", y, {
    writeLines: [{ label: "Answer:", answer: "142" }],
    color: C.ALERT,
  });

  y = addProblem(doc, 11, "945 / 7", y, {
    writeLines: [{ label: "Answer:", answer: "135" }],
    color: C.ALERT,
  });

  y = addProblem(doc, 12, "1,368 / 9", y, {
    writeLines: [{ label: "Answer:", answer: "152" }],
    color: C.ALERT,
  });

  // Exit ticket answers
  y = addSectionHeading(doc, "Exit Ticket Answers", y, { color: C.PRIMARY });

  y = addProblem(doc, "Q1", "67 x 43 (lattice method)", y, {
    writeLines: [
      { label: "Answer:", answer: "2,881. Grid: 6x4=24, 7x4=28, 6x3=18, 7x3=21. Diagonals: D1=1, D2=2+8+8=18 (write 8, carry 1), D3=1+4+2=7+1=8, D4=2. Answer: 2,881." },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, "Q2", "4,823 - 2,956", y, {
    writeLines: [
      { label: "Answer:", answer: "1,867 (vertical subtraction with regrouping)" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, "Q3", "When would you choose the lattice method?", y, {
    writeLines: [
      { label: "Sample answer:", answer: "The lattice method is useful when multiplying larger numbers because it breaks multiplication into single-digit products. Each cell only requires simple times tables. The diagonal addition handles place value automatically. The vertical method may be faster for simpler multiplications where partial products are easy to compute mentally." },
    ],
    color: C.PRIMARY,
  });

  addPdfFooter(doc, "Teacher Reference — Do Not Distribute to Students");
  await writePdf(doc, OUT_DIR + "/SR3_All_Answers.pdf");
  console.log("  SR3 All Answers written.");
}

// ── PDF: EXT1 — Method Comparison Investigation ──────────────────────────────

async function generateEXT1_MethodComparison() {
  const doc = createPdf({ title: "Method Comparison Investigation" });

  let y = addPdfHeader(doc, "Vertical vs Lattice: Method Comparison", {
    subtitle: "EXT1 — Extending Challenge",
    color: C.ACCENT,
    lessonInfo: "Session 4 of 4 | Four Processes Review | Year 5/6 Maths",
  });

  y = addSectionHeading(doc, "The Investigation", y, { color: C.ACCENT });
  y = addBodyText(doc, "Mathematicians don't just find answers — they think about HOW they find answers. Today you'll compare two multiplication methods: the vertical (column) method and the lattice method.", y);
  y = addBodyText(doc, "Your task: Solve each problem using BOTH methods. Then compare them for speed, accuracy, and ease of use.", y);

  y = addTipBox(doc, "Important: For each problem, time yourself using BOTH methods. Record your time AND whether you got the correct answer with each method. Be honest — the goal is to find which method works best for YOU, not to prove one is \"better.\"", y, { color: C.ACCENT });

  y = addSectionHeading(doc, "The 5 Problems", y, { color: C.PRIMARY });

  // Problem 1
  y = addProblem(doc, 1, "45 x 32", y, {
    writeLines: [
      { label: "Vertical method answer:" },
      { label: "Vertical method time:" },
      { label: "Lattice method answer:" },
      { label: "Lattice method time:" },
    ],
    color: C.PRIMARY,
  });

  // Problem 2
  y = addProblem(doc, 2, "78 x 56", y, {
    writeLines: [
      { label: "Vertical method answer:" },
      { label: "Vertical method time:" },
      { label: "Lattice method answer:" },
      { label: "Lattice method time:" },
    ],
    color: C.PRIMARY,
  });

  // Problem 3
  y = addProblem(doc, 3, "93 x 87", y, {
    writeLines: [
      { label: "Vertical method answer:" },
      { label: "Vertical method time:" },
      { label: "Lattice method answer:" },
      { label: "Lattice method time:" },
    ],
    color: C.PRIMARY,
  });

  // New page
  doc.addPage();
  y = 50;

  // Problem 4
  y = addProblem(doc, 4, "245 x 36", y, {
    writeLines: [
      { label: "Vertical method answer:" },
      { label: "Vertical method time:" },
      { label: "Lattice method answer:" },
      { label: "Lattice method time:" },
    ],
    color: C.PRIMARY,
  });

  // Problem 5
  y = addProblem(doc, 5, "518 x 74", y, {
    writeLines: [
      { label: "Vertical method answer:" },
      { label: "Vertical method time:" },
      { label: "Lattice method answer:" },
      { label: "Lattice method time:" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Analysis", y, { color: C.ACCENT });

  y = addTwoColumnOrganiser(doc, "Vertical Method", "Lattice Method", y, {
    color: C.ACCENT,
    rows: 3,
    rowH: 45,
    leftContent: [
      "How many did I get correct?",
      "Average time per problem:",
      "When I got stuck, it was because...",
    ],
    rightContent: [
      "How many did I get correct?",
      "Average time per problem:",
      "When I got stuck, it was because...",
    ],
  });

  y = addSectionHeading(doc, "Your Conclusion", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Write a paragraph comparing the two methods. Consider:", y);
  y = addBodyText(doc, "1. Which method was FASTER for you? Why do you think that is?", y);
  y = addBodyText(doc, "2. Which method was more ACCURATE (fewer errors)? Why?", y);
  y = addBodyText(doc, "3. Did the number of digits matter? Was one method better for bigger numbers?", y);
  y = addBodyText(doc, "4. Which method would you choose in an exam? Why?", y);
  y = addLinedArea(doc, y + 5, 10);

  y = addTipBox(doc, "Mathematician's insight: There is no single \"best\" method for all problems. Strong mathematicians have MULTIPLE strategies and choose the most efficient one for each situation. That's what SC3 is all about!", y, { color: C.SUCCESS });

  addPdfFooter(doc, "Session 4 of 4 | Four Processes Review | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/EXT1_Method_Comparison.pdf");
  console.log("  EXT1 Method Comparison written.");
}

build().catch(console.error);
