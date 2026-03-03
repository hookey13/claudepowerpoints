// Lesson 2 of 5: Multiples & Divisibility Rules
// Year 5/6 Numeracy — Number Properties
// VC2M5N10 (algorithms, factors, multiples, divisibility)
// VC2M6N02 (prime, composite, square, triangular numbers)
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

const OUT_DIR = "output/FM_Lesson2_Multiples_Divisibility";
const FOOTER = "Session 2 of 5 | Factors & Multiples | Year 5/6 Maths";

// ── Teacher notes ─────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
• "Yesterday we found factor pairs — we looked at the numbers that go INTO a number. Today we flip to the other side of the coin: multiples. Multiples are what you get when you MULTIPLY a number."
• "We'll also learn divisibility rules — quick mental tests that tell you whether a number is divisible by 2, 3, 5, or 10 WITHOUT doing the full division."

**DO:**
• Display the title slide as students settle. Ensure mini-whiteboards and markers are on every desk.
• Direct attention: "This is Session 2 of 5."

**TEACHER NOTES:**
Lesson 2 shifts from factors (Lesson 1) to multiples and divisibility — the reciprocal relationship. Students who grasped "3 is a factor of 12" should now see that "12 is a multiple of 3." Divisibility rules provide a shortcut for factor testing that will be essential for Lessons 3–4 (identifying primes, finding LCM/HCF). The rules for 2, 5, and 10 are typically familiar; the rule for 3 (digit sum) is new for most Year 5/6 students. The rule for 4 (last two digits) is introduced for extending students.

**WATCH FOR:**
• Students who mix up "factor" and "multiple" language from yesterday — this will be addressed in the vocabulary review.
• Readiness signal: students settling quickly with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR = `**SAY:**
• "Let's review yesterday's learning. I'll give you a number — you find ALL its factor pairs on your whiteboard. Use the systematic method."
• "First number: 24. You have 60 seconds. Go!"
• After 60s: "Boards up. You should have (1,24), (2,12), (3,8), (4,6). Four pairs."
• "Second number: 30. 60 seconds. Go!"
• After 60s: "Boards up. (1,30), (2,15), (3,10), (5,6). Four pairs."

**DO:**
• Display the slide. Students work on whiteboards.
• Time 60 seconds per problem. Scan boards after each.
• Briefly correct any common errors — especially stopping too early or too late.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Write all factor pairs on your board. Ready… show me!"
• Scan for: correct pairs with correct stopping point on ≥80% of boards.
PROCEED: If ≥80% correct on both, move to Fluency.
PIVOT: If widespread errors, revisit the systematic method briefly: "Start at 1, divide up. Stop when a factor repeats." Re-run with 20 as a simpler example.

**TEACHER NOTES:**
Daily Review retrieves yesterday's learning — systematic factor pair finding. Using 24 (from yesterday's We Do) and 30 (from yesterday's hinge question) connects directly to prior lesson content. This spaced retrieval strengthens long-term retention. The factor pairs of these numbers will also be referenced later in the lesson when introducing divisibility.

**WATCH FOR:**
• Students who found all pairs yesterday but struggle today — normal forgetting curve; the retrieval practice is doing its job.
• Students who still don't stop correctly — note for enabling support.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
• "Skip counting — fast as you can. I'll say a starting number and a rule. You continue the pattern on your whiteboard."
• "Start at 0, count by 7s. Write as many as you can in 45 seconds. Go!"
• After 45s: "How far did you get? The sequence is 0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84…"
• "Now start at 0, count by 9s. 45 seconds. Go!"

**DO:**
• Display the slide. Students write skip-counting sequences on whiteboards.
• Time 45 seconds per sequence. Read answers aloud for self-checking.
• Ask: "Who reached at least 10 numbers? Give me a thumbs up."

**TEACHER NOTES:**
Skip counting builds the multiplicative reasoning underpinning multiples — "the multiples of 7 are what you land on when you skip-count by 7." This connects directly to today's LI. Skip counting by 7 and 9 targets the tables students find most challenging. The sequences generated here are literally lists of multiples, so the vocabulary connection will be made explicit in the I Do.

**WATCH FOR:**
• Students who add incorrectly mid-sequence (e.g., 7, 14, 21, 27 instead of 28) — computation fluency gap.
• Students who freeze after 3–4 numbers — may need multiplication table support.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
• Read from slide: "We are learning to identify multiples and apply divisibility rules so we can quickly test whether one number divides into another."
• "Yesterday we asked 'Is 7 a factor of 28?' and tested by dividing. Today I'll give you a shortcut — divisibility rules that let you answer instantly for certain numbers."
• Read each SC: "SC1 is listing multiples — the foundation. SC2 is using divisibility rules — the shortcut. SC3 is explaining WHY the rules work."

**DO:**
• Display the slide. Point to LI and read aloud.
• Point to each SC in turn. Emphasise SC2: "This is our main goal today."

**TEACHER NOTES:**
The LI connects explicitly to yesterday (factor testing by division) and introduces today's efficiency gain (divisibility rules as shortcuts). SC1 (listing multiples) is the foundation — it establishes what a multiple IS before introducing shortcuts. SC2 (applying divisibility rules for 2, 3, 5, 10) is the core target. SC3 (explaining why a rule works) extends to mathematical reasoning — understanding the structure behind the rule, not just memorising it.

**WATCH FOR:**
• Students who look confused by "divisibility rules" — reassure: "We'll learn exactly what these are in a few minutes."

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_VOCAB = `**SAY:**
• "Let's connect yesterday's vocabulary to today. Yesterday: factors go INTO a number. Today: multiples come OUT of multiplication."
• Point to MULTIPLE: "The multiples of 3 are 3, 6, 9, 12, 15, 18… They're the results of multiplying 3 by 1, 2, 3, 4, 5, 6… The list goes on forever."
• Point to DIVISIBLE: "12 is divisible by 3 means 12 ÷ 3 has no remainder. It's another way of saying '3 is a factor of 12' or '12 is a multiple of 3.' Three ways to say the same thing."
• Point to DIVISIBILITY RULE: "A divisibility rule is a shortcut — a quick test you can do in your head to check divisibility without actually dividing."

**DO:**
• Display the slide. Point to each term as you explain.
• After all three: "Turn to your partner. Tell them one way that factors and multiples are connected." 20 seconds.

**TEACHER NOTES:**
This vocabulary slide makes the factor-multiple-divisibility connection explicit. Students often learn these as separate concepts; today we unify them. The key insight: "3 is a factor of 12," "12 is a multiple of 3," and "12 is divisible by 3" ALL describe the same relationship from different perspectives. This triple connection is foundational for all remaining lessons in the unit.

**MISCONCEPTIONS:**
• Misconception: "Multiples are the small numbers, factors are the big numbers" (or vice versa).
  Why: Students conflate the terms because both involve the same pair of numbers (3 and 12).
  Impact: They'll reverse the language all week if not corrected now.
  Quick correction: "The FACTOR goes IN (small into big). The MULTIPLE comes OUT (the result of multiplication — the big number). 3 goes into 12, so 3 is the factor, 12 is the multiple."

[Maths: Launch — Explicit Instruction | VTLM 2.0: Explicit Explanation]`;

const NOTES_IDO_RULES = `**SAY:**
• "Now for the power tools. Divisibility rules let you test numbers INSTANTLY — no calculator, no long division."
• Point to Rule for 2: "A number is divisible by 2 if its last digit is even — 0, 2, 4, 6, or 8. Look at 5 748. Last digit is 8 — that's even. So 5 748 is divisible by 2."
• Point to Rule for 5: "Divisible by 5 if it ends in 0 or 5. Does 5 748 end in 0 or 5? No — ends in 8. NOT divisible by 5."
• Point to Rule for 10: "Divisible by 10 if it ends in 0. Even simpler."
• Think-aloud for Rule for 3: "This one's different — and more interesting. Add ALL the digits together. If the sum is divisible by 3, the original number is divisible by 3."
• "Let's test 5 748: 5 + 7 + 4 + 8 = 24. Is 24 divisible by 3? 24 ÷ 3 = 8. Yes! So 5 748 IS divisible by 3."
• Self-monitoring: "Let me double-check: 5 748 ÷ 3 = 1 916. Yep — no remainder. The digit sum rule works."

**DO:**
• Display the slide. Reveal each rule one at a time (top to bottom).
• For the rule of 3, write "5 + 7 + 4 + 8 = 24" on the whiteboard to show the digit sum.
• Pause after the rule of 3 — this is the new content. Give students 5 seconds to process.

**TEACHER NOTES:**
The rules for 2, 5, and 10 are typically familiar from prior years — this is retrieval. The rule for 3 (digit sum) is genuinely new for most Year 5/6 students and carries the highest cognitive load. Present 2/5/10 briskly as revision, then slow down for 3. The worked example uses 5 748 because it's divisible by 2 and 3 but NOT by 5 or 10 — this forces students to think about each rule independently rather than assuming a number is "divisible by everything" or "nothing." The self-monitoring check (verifying by actual division) models the metacognitive habit.

**MISCONCEPTIONS:**
• Misconception: "If a number is divisible by 2 and 3, it must be divisible by 5."
  Why: Students overgeneralise — they think divisibility is cumulative.
  Impact: They'll apply rules incorrectly in the hinge question and exit ticket.
  Quick correction: "Each divisibility rule is independent. A number might be divisible by 2 and 3 but not 5. Test each rule separately."

• Misconception: "For the rule of 3, multiply the digits instead of adding them."
  Why: Confusion between digit sum and digit product — both involve operating on individual digits.
  Quick correction: "For 3, we ADD the digits. 5 + 7 + 4 + 8 = 24. Adding, not multiplying."

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
• "Quick check. On your whiteboard, I want you to test this number against all four rules."
• "The number is 135. Is it divisible by 2? By 3? By 5? By 10? Write YES or NO for each one."
• After boards up: "Let's check. Divisible by 2? NO — last digit is 5, which is odd."
• "Divisible by 5? YES — ends in 5."
• "Divisible by 10? NO — doesn't end in 0."
• "Divisible by 3? Let's test: 1 + 3 + 5 = 9. Is 9 divisible by 3? YES. So 135 is divisible by 3."

**DO:**
• Display the question slide. Give 20 seconds for all four tests.
• "Show me your boards!" Scan for correct pattern: No, Yes, Yes, No (for 2, 5, 3, 10 respectively).
• Click to reveal. Read through each test.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Write Yes or No for each rule: ÷2, ÷3, ÷5, ÷10. 20 seconds. Show me!"
• Scan for: correct answers on ≥80% of boards.
PROCEED: If ≥80% correct on all four rules, move to We Do.
PIVOT: If the rule of 3 has widespread errors, reteach: "Remember — ADD the digits. For 135: 1 + 3 + 5 = 9. Is 9 divisible by 3? Count by 3s: 3, 6, 9. Yes! So 135 is divisible by 3." Re-check: "Is 246 divisible by 3? Show me boards."

**TEACHER NOTES:**
This CFU checks SC2 (applying all four divisibility rules). 135 is chosen because it has a mixed pattern — divisible by 3 and 5 but NOT by 2 or 10. This prevents students from just writing "yes to everything." The rule of 3 is the most likely error point. Watch for students who write the digit sum correctly but then test it wrong (e.g., "9 ÷ 3 = 4" or uncertainty about whether 9 is a multiple of 3).

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
• "Let's practise together. I'll give you a number — you apply all four rules and tell me which ones pass."
• "Number: 360. On your whiteboards, test for 2, 3, 5, and 10. You have 20 seconds."
• Cold Call: "[Name], is 360 divisible by 2?" [Yes — ends in 0] "By 5?" [Yes — ends in 0] "By 10?" [Yes — ends in 0]
• Cold Call: "[Name], is 360 divisible by 3? How did you test it?" [3 + 6 + 0 = 9, and 9 ÷ 3 = 3, so yes]
• "360 passes ALL four tests! That's unusual — most numbers don't pass all four."

**DO:**
• Display question slide. Students test on whiteboards. 20 seconds.
• Cold Call for each rule. Require students to explain their reasoning.
• Click to reveal answers.

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
• Cold call different students for each rule. "[Name], divisible by 2? How do you know?"
PROCEED: If students answer correctly with clear reasoning, move to Problem Pair 2.
PIVOT: If students can state the rule but apply it wrong (e.g., adding digits for rule of 2), reteach the specific rule that's failing. "The rule of 2 is about the LAST DIGIT only. You don't need to add anything."

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Students test 360 against only rules of 2 and 5 (the simpler last-digit rules). If successful, add the rule of 10. Only then attempt the rule of 3.

EXTENDING PROMPT:
• Task: "Can you find a 3-digit number that is divisible by 2 AND 3 but NOT by 5 or 10? How many can you find?"

**TEACHER NOTES:**
360 is deliberately chosen because it passes all four rules — this gives students confidence (all "yes" answers) and lets the teacher focus on whether the REASONING is correct, not just the answer. If a student says "360 is divisible by 3" but can't explain via digit sum, they may be guessing. The Cold Call technique ensures accountability.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
• "One more together. This time the number is 847. Test all four rules on your whiteboard. 20 seconds."
• After boards up: "Let's check together."
• "Divisible by 2? Last digit is 7 — odd. NO."
• "Divisible by 5? Last digit is 7 — not 0 or 5. NO."
• "Divisible by 10? Doesn't end in 0. NO."
• "Divisible by 3? Digit sum: 8 + 4 + 7 = 19. Is 19 divisible by 3? 3, 6, 9, 12, 15, 18 — 19 is NOT in the list. NO."
• "847 fails ALL four rules. That means 2, 3, 5, and 10 are NOT factors of 847. Interesting — we'll learn more about numbers like this tomorrow."

**DO:**
• Display the question slide. 20 seconds for whiteboard work.
• Students hold up boards. Check for all four "NO" answers.
• Click to reveal. Walk through each rule.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Test 847 against all four rules. Write Yes or No for each. Show me!"
• Scan for: all four "NO" on ≥80% of boards.
PROCEED: If ≥80% correct, move to the Hinge Question.
PIVOT: If widespread errors, most likely on the rule of 3. Students may think 19 is divisible by 3. Reteach: "Count by 3s: 3, 6, 9, 12, 15, 18, 21. Where's 19? It's between 18 and 21 — not a multiple of 3. So 847 is NOT divisible by 3."

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Students who struggle test 120 instead (passes all four rules, simpler digits: 1+2+0=3).

EXTENDING PROMPT:
• Task: "847 is not divisible by 2, 3, 5, or 10. Does that mean it has NO factors other than 1 and itself? Test divisibility by 7 and 11 to find out." (847 = 7 × 121 = 7 × 11²)

**TEACHER NOTES:**
847 is chosen because it fails all four rules — the opposite pattern to 360. This contrast (all-yes vs all-no) sharpens students' understanding that each rule is independent. The preview of "numbers like this" sets up tomorrow's lesson on prime and composite numbers. 847 is actually NOT prime (7 × 121), which is a useful reference if students ask. The extending prompt leads to this discovery.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
• "Final gate check. Look at the four numbers on the screen. Only ONE of them is divisible by 3. Which one?"
• "Hold up 1, 2, 3, or 4 fingers. 15 seconds to decide."
• After vote: "The answer is C — 531. Digit sum: 5 + 3 + 1 = 9. And 9 IS divisible by 3."
• "Why not the others? A) 412: 4+1+2=7 — not divisible by 3. B) 305: 3+0+5=8 — not divisible by 3. D) 700: 7+0+0=7 — not divisible by 3."

**DO:**
• Display the hinge question. 15 seconds.
• Finger vote: scan for option C (3 fingers) on ≥80%.
• Click to reveal. Briefly explain why each distractor fails.

**CFU CHECKPOINT:**
Technique: Finger Voting (1–4)
Script:
• "Fingers up — which number is divisible by 3? 1 for A, 2 for B, 3 for C, 4 for D. Show me!"
PROCEED: If ≥80% choose C, release to You Do.
PIVOT: If students choose A (412) — they may be testing for even numbers, not divisibility by 3. They're confusing rules. Reteach: "Divisibility by 2 checks the last digit. Divisibility by 3 checks the DIGIT SUM. Different rules, different tests." If students choose B (305) — digit sum is 8, not divisible by 3. They may have added wrong. Re-check their digit sum.

**TEACHER NOTES:**
This hinge question isolates the rule of 3 — the genuinely new content. All four numbers have similar magnitudes (3-digit) so students can't use estimation. Each distractor has a digit sum that is close to but NOT a multiple of 3 (7, 8, 7), making careless addition errors consequential. Only 531 (digit sum 9) passes. This tests whether students can accurately compute a digit sum AND correctly identify whether it's a multiple of 3.

**MISCONCEPTIONS:**
• Misconception: "305 is divisible by 3 because it's divisible by 5."
  Why: Conflating divisibility rules — passing one rule doesn't mean passing another.
  Quick correction: "Each rule is independent. 305 ends in 5, so it's divisible by 5. But 3+0+5=8, and 8 is NOT divisible by 3."

[Maths: Monitor Progress — Hinge Question | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
• "Independent practice time. On your worksheet, you'll test numbers against all four divisibility rules."
• "For each number, write YES or NO for each rule. Then answer the challenge questions at the bottom."
• "You have 8 minutes. Start now."

**DO:**
• Distribute SR1 worksheet.
• Set timer for 8 minutes. Circulate — visit enabling students first.
• Conference with 2–3 students: "Explain how you tested this number for 3."

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Students complete only the first 4 numbers (2-digit numbers) and test only for rules of 2, 5, and 10. If they finish, attempt the rule of 3 with support.

EXTENDING PROMPT:
• Task: After completing the worksheet, students work on EXT1 — the Divisibility Patterns Investigation, which explores rules for 4, 6, 8, 9, and 11.

**TEACHER NOTES:**
The worksheet sequences numbers from easy (2-digit, obvious) to challenging (4-digit, mixed). The challenge questions at the bottom target SC3 — asking students to explain WHY the digit sum rule works for 3 (with scaffolded prompts). Numbers are chosen so each row of the table has a different divisibility pattern, preventing students from falling into a "yes to everything" routine.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
• "Pens down. Exit ticket time — three quick questions. Work silently, 3 minutes."
• Read Q1, Q2, Q3 aloud from the slide.

**DO:**
• Display exit ticket. 3 minutes. Circulate silently.
• Collect responses or observe.

**TEACHER NOTES:**
Q1 tests SC1 (listing multiples). Q2 tests SC2 (applying divisibility rules). Q3 touches SC3 (explaining the rule of 3). Sort responses: SC1 only → enabling tomorrow, SC1+SC2 → on track, all three → ready for extending.

[Maths: Summarise — Exit Ticket (Stage 5) | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `**SAY:**
• "Here are today's printable resources."

**DO:**
• Display briefly. Teachers click hyperlinks.

**TEACHER NOTES:**
SR1 is the practice worksheet (one per student). SR2 is the answer key (teacher reference). EXT1 is the extending investigation on advanced divisibility rules (3–5 copies for extending students).

[Maths: Planning — Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
• "Let's check our success criteria."
• Read SC1: "I can list the first 10 multiples of any single-digit number." Thumbs up/sideways/down. Scan.
• Read SC2: "I can use divisibility rules for 2, 3, 5, and 10 to quickly test any number." Thumbs. Scan.
• Read SC3: "I can explain why the digit-sum rule works for 3." Thumbs. Scan.
• "Turn to your partner: What's one divisibility rule you'll remember tomorrow? 30 seconds."
• "Tomorrow we use factors AND multiples to explore a special type of number — prime numbers. Well done today."

**DO:**
• Display closing slide. Run thumbs for each SC.
• 30 seconds Turn & Talk. Listen to 2–3 pairs.
• Note students showing thumbs-down on SC2 for tomorrow's enabling.

**TEACHER NOTES:**
SC3 (explaining WHY the digit sum rule works) is the most likely thumbs-down — this is fine for Lesson 2. Understanding the structure behind the rule develops over time. The preview of prime numbers connects today's divisibility testing to tomorrow's classification: a prime number has no factors other than 1 and itself, which means it fails divisibility tests for all numbers except 1 and itself.

[Maths: Summarise — Closing | VTLM 2.0: Monitor Progress & Feedback]`;

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "Multiples & Divisibility Rules — Session 2";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres, "Multiples & Divisibility Rules", "The Other Side of the Coin",
    "Session 2 of 5 | Number Properties | Year 5/6", NOTES_TITLE);

  // ── SLIDE 2: Daily Review (Stage 1) ─────────────────────────────────────
  contentSlide(pres, "Daily Review", C.ACCENT, "Factor Pairs Retrieval", [
    "Find ALL factor pairs of 24.",
    "Find ALL factor pairs of 30.",
  ], NOTES_DR, FOOTER, (s) => {
    addCard(s, 6.2, CONTENT_TOP + 0.1, 3.2, 1.6, { strip: C.ACCENT });
    s.addText([
      { text: "Show Me Boards", options: { bold: true, breakLine: true, fontSize: 13, color: C.ACCENT } },
      { text: "60 seconds per number.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Write all pairs.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Hold up on my signal.", options: { fontSize: 11, color: C.CHARCOAL } },
    ], {
      x: 6.4, y: CONTENT_TOP + 0.2, w: 2.8, h: 1.3,
      fontFace: FONT_B, margin: 0, valign: "top",
    });
  });

  // ── SLIDE 3: Fluency (Stage 1) ─────────────────────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Skip Counting Sprint", { fontSize: 26 });

    // Two sequence cards
    const seqs = [
      { label: "Sequence 1", rule: "Start at 0, count by 7s", example: "0, 7, 14, 21, 28, …" },
      { label: "Sequence 2", rule: "Start at 0, count by 9s", example: "0, 9, 18, 27, 36, …" },
    ];
    seqs.forEach((seq, i) => {
      const cy = CONTENT_TOP + 0.1 + i * 1.55;
      addCard(s, 0.5, cy, 6.5, 1.35, { strip: C.PRIMARY });
      addTextOnShape(s, seq.label, {
        x: 0.7, y: cy + 0.12, w: 1.8, h: 0.32, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText(seq.rule, {
        x: 0.7, y: cy + 0.52, w: 6.0, h: 0.3,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
      });
      s.addText(seq.example, {
        x: 0.7, y: cy + 0.85, w: 6.0, h: 0.3,
        fontSize: 13, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });
    });

    // Timer card
    addTextOnShape(s, "45 seconds per sequence — GO!", {
      x: 2.5, y: SAFE_BOTTOM - 0.55, w: 5, h: 0.45, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

    // Instruction card (right)
    addCard(s, 7.3, CONTENT_TOP + 0.1, 2.2, 2.5, { strip: C.SECONDARY });
    s.addText([
      { text: "Write on\nwhiteboard", options: { breakLine: true, fontSize: 12, color: C.SECONDARY, bold: true } },
      { text: "As many\nas you can!", options: { fontSize: 11, color: C.CHARCOAL } },
    ], {
      x: 7.5, y: CONTENT_TOP + 0.3, w: 1.8, h: 1.5,
      fontFace: FONT_B, margin: 0, align: "center", valign: "middle",
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_FLUENCY);
  })();

  // ── SLIDE 4: LI/SC ─────────────────────────────────────────────────────
  liSlide(pres,
    ["We are learning to identify multiples and apply divisibility rules so we can quickly test whether one number divides into another."],
    [
      "I can list the first 10 multiples of any single-digit number.",
      "I can use divisibility rules for 2, 3, 5, and 10 to quickly test any number.",
      "I can explain why the digit-sum rule works for divisibility by 3.",
    ],
    NOTES_LISC, FOOTER);

  // ── SLIDE 5: Vocabulary Review (Stage 2) ────────────────────────────────
  contentSlide(pres, "Stage 2 | I Do", C.PRIMARY, "Factor ↔ Multiple Connection", [], NOTES_VOCAB, FOOTER, (s) => {
    // Three connected vocab cards in a row
    const terms = [
      { word: "Multiple", def: "The result of multiplying.\nMultiples of 3: 3, 6, 9, 12, 15, 18…\nThe list goes on forever.", color: C.PRIMARY },
      { word: "Divisible", def: "Divides evenly — no remainder.\n12 is divisible by 3 because\n12 ÷ 3 = 4 exactly.", color: C.SECONDARY },
      { word: "Divisibility Rule", def: "A quick mental test to check\ndivisibility without dividing.\nE.g., last digit even → ÷2", color: C.ACCENT },
    ];
    terms.forEach((t, i) => {
      const cx = 0.5 + i * 3.1;
      addCard(s, cx, CONTENT_TOP + 0.05, 2.85, 2.6, { strip: t.color });
      addTextOnShape(s, t.word, {
        x: cx + 0.12, y: CONTENT_TOP + 0.15, w: 2.2, h: 0.34, rectRadius: 0.08,
        fill: { color: t.color },
      }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText(t.def, {
        x: cx + 0.12, y: CONTENT_TOP + 0.6, w: 2.6, h: 1.8,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });
    });

    // Connection banner
    addCard(s, 0.5, CONTENT_TOP + 2.85, 9.0, 0.85, { strip: C.ALERT });
    s.addText("Same relationship, three perspectives:", {
      x: 0.75, y: CONTENT_TOP + 2.92, w: 8.5, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0,
    });
    s.addText('"3 is a factor of 12"  =  "12 is a multiple of 3"  =  "12 is divisible by 3"', {
      x: 0.75, y: CONTENT_TOP + 3.22, w: 8.5, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, italic: true,
    });
  });

  // ── SLIDE 6: I Do — Divisibility Rules (Stage 2) ─────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Divisibility Rules: 2, 3, 5, 10", { fontSize: 22, color: C.PRIMARY });

    // Test number banner
    addTextOnShape(s, "Test number:  5 748", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 3.5, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

    // Four rule cards in a 2×2 grid
    const rules = [
      { div: "÷ 2", rule: "Last digit is even\n(0, 2, 4, 6, 8)", test: "5 748 → last digit 8 → YES", pass: true, color: C.PRIMARY },
      { div: "÷ 5", rule: "Last digit is 0 or 5", test: "5 748 → last digit 8 → NO", pass: false, color: C.SECONDARY },
      { div: "÷ 10", rule: "Last digit is 0", test: "5 748 → last digit 8 → NO", pass: false, color: C.ACCENT },
      { div: "÷ 3", rule: "Digit sum divisible by 3\n(add ALL digits)", test: "5+7+4+8 = 24 → 24÷3 = 8 → YES", pass: true, color: C.ALERT },
    ];
    rules.forEach((r, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const cx = 0.5 + col * 4.7;
      const cy = CONTENT_TOP + 0.55 + row * 1.7;
      addCard(s, cx, cy, 4.4, 1.5, { strip: r.color });

      addTextOnShape(s, r.div, {
        x: cx + 0.12, y: cy + 0.1, w: 0.7, h: 0.35, rectRadius: 0.08,
        fill: { color: r.color },
      }, { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });

      s.addText(r.rule, {
        x: cx + 0.95, y: cy + 0.08, w: 3.2, h: 0.45,
        fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });

      // Test result
      addTextOnShape(s, r.test, {
        x: cx + 0.12, y: cy + 0.65, w: 4.1, h: 0.35, rectRadius: 0.06,
        fill: { color: r.pass ? C.SUCCESS : C.CHARCOAL },
      }, {
        fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      // Pass/fail indicator
      s.addText(r.pass ? "✓" : "✗", {
        x: cx + 3.8, y: cy + 0.08, w: 0.4, h: 0.4,
        fontSize: 20, fontFace: FONT_H, color: r.pass ? C.SUCCESS : C.MUTED,
        align: "center", valign: "middle", margin: 0, bold: true,
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_IDO_RULES);
  })();

  // ── SLIDES 7–8: CFU 1 — Test 135 (withReveal) ────────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "CFU", { color: C.ALERT });
      addTitle(s, "Test This Number", { color: C.ALERT });

      // Large number display
      addTextOnShape(s, "135", {
        x: 3.0, y: CONTENT_TOP + 0.1, w: 4.0, h: 1.2, rectRadius: 0.15,
        fill: { color: C.BG_DARK },
      }, { fontSize: 60, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Four test boxes
      const tests = ["÷ 2 ?", "÷ 3 ?", "÷ 5 ?", "÷ 10 ?"];
      tests.forEach((t, i) => {
        const tx = 0.8 + i * 2.3;
        addCard(s, tx, CONTENT_TOP + 1.6, 1.8, 0.8, { strip: C.PRIMARY });
        s.addText(t, {
          x: tx, y: CONTENT_TOP + 1.7, w: 1.8, h: 0.6,
          fontSize: 18, fontFace: FONT_H, color: C.CHARCOAL,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
      });

      addTextOnShape(s, "Show Me Boards — YES or NO for each", {
        x: 2.0, y: CONTENT_TOP + 2.7, w: 6.0, h: 0.42, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_CFU1);
      return s;
    },
    (slide) => {
      // Cover the red "Show Me Boards" bar from the question slide
      slide.addShape("rect", {
        x: 0.3, y: CONTENT_TOP + 2.6, w: 9.4, h: 0.55,
        fill: { color: C.BG_LIGHT },
      });
      // Reveal: show results
      const results = [
        { label: "÷ 2", answer: "NO", reason: "Last digit 5 (odd)", pass: false },
        { label: "÷ 3", answer: "YES", reason: "1+3+5=9, 9÷3=3", pass: true },
        { label: "÷ 5", answer: "YES", reason: "Last digit is 5", pass: true },
        { label: "÷ 10", answer: "NO", reason: "Last digit ≠ 0", pass: false },
      ];
      results.forEach((r, i) => {
        const rx = 0.8 + i * 2.3;
        addTextOnShape(slide, r.answer, {
          x: rx, y: CONTENT_TOP + 2.7, w: 1.8, h: 0.4, rectRadius: 0.06,
          fill: { color: r.pass ? C.SUCCESS : C.CHARCOAL },
        }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });
        slide.addText(r.reason, {
          x: rx, y: CONTENT_TOP + 3.15, w: 1.8, h: 0.3,
          fontSize: 8, fontFace: FONT_B, color: C.CHARCOAL, align: "center", margin: 0,
        });
      });
    }
  );

  // ── SLIDES 9–10: We Do 1 — Test 360 (withReveal) ─────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Divisibility Test: 360", { fontSize: 22, color: C.SECONDARY });

      addTextOnShape(s, "360", {
        x: 3.5, y: CONTENT_TOP + 0.1, w: 3.0, h: 1.0, rectRadius: 0.12,
        fill: { color: C.PRIMARY },
      }, { fontSize: 52, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Four empty test cards
      const labels = ["÷ 2", "÷ 3", "÷ 5", "÷ 10"];
      labels.forEach((l, i) => {
        const cx = 0.5 + i * 2.35;
        addCard(s, cx, CONTENT_TOP + 1.4, 2.1, 1.3, { strip: C.PRIMARY });
        addTextOnShape(s, l, {
          x: cx + 0.1, y: CONTENT_TOP + 1.5, w: 0.65, h: 0.3, rectRadius: 0.06,
          fill: { color: C.PRIMARY },
        }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
        s.addText("?", {
          x: cx, y: CONTENT_TOP + 1.9, w: 2.1, h: 0.6,
          fontSize: 28, fontFace: FONT_H, color: C.MUTED,
          align: "center", valign: "middle", margin: 0,
        });
      });

      addTextOnShape(s, "Test all 4 rules — 20 seconds", {
        x: 2.5, y: CONTENT_TOP + 3.0, w: 5.0, h: 0.4, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (slide) => {
      const results = [
        { label: "÷ 2", answer: "YES", reason: "Ends in 0\n(even)", pass: true },
        { label: "÷ 3", answer: "YES", reason: "3+6+0=9\n9÷3=3 ✓", pass: true },
        { label: "÷ 5", answer: "YES", reason: "Ends in 0", pass: true },
        { label: "÷ 10", answer: "YES", reason: "Ends in 0", pass: true },
      ];
      results.forEach((r, i) => {
        const cx = 0.5 + i * 2.35;
        addTextOnShape(slide, r.answer, {
          x: cx + 0.5, y: CONTENT_TOP + 1.9, w: 1.1, h: 0.5, rectRadius: 0.08,
          fill: { color: C.SUCCESS },
        }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
        slide.addText(r.reason, {
          x: cx + 0.1, y: CONTENT_TOP + 2.45, w: 1.9, h: 0.35,
          fontSize: 9, fontFace: FONT_B, color: C.CHARCOAL, align: "center", margin: 0,
        });
      });
      addTextOnShape(slide, "360 passes ALL four rules!", {
        x: 2.5, y: CONTENT_TOP + 3.0, w: 5.0, h: 0.4, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDES 11–12: We Do 2 — Test 847 (withReveal) ────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Divisibility Test: 847", { fontSize: 22, color: C.SECONDARY });

      addTextOnShape(s, "847", {
        x: 3.5, y: CONTENT_TOP + 0.1, w: 3.0, h: 1.0, rectRadius: 0.12,
        fill: { color: C.PRIMARY },
      }, { fontSize: 52, fontFace: FONT_H, color: C.WHITE, bold: true });

      const labels = ["÷ 2", "÷ 3", "÷ 5", "÷ 10"];
      labels.forEach((l, i) => {
        const cx = 0.5 + i * 2.35;
        addCard(s, cx, CONTENT_TOP + 1.4, 2.1, 1.3, { strip: C.PRIMARY });
        addTextOnShape(s, l, {
          x: cx + 0.1, y: CONTENT_TOP + 1.5, w: 0.65, h: 0.3, rectRadius: 0.06,
          fill: { color: C.PRIMARY },
        }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
        s.addText("?", {
          x: cx, y: CONTENT_TOP + 1.9, w: 2.1, h: 0.6,
          fontSize: 28, fontFace: FONT_H, color: C.MUTED,
          align: "center", valign: "middle", margin: 0,
        });
      });

      addTextOnShape(s, "Test all 4 rules on your whiteboard", {
        x: 2.5, y: CONTENT_TOP + 3.0, w: 5.0, h: 0.4, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO2);
      return s;
    },
    (slide) => {
      const results = [
        { label: "÷ 2", answer: "NO", reason: "Ends in 7\n(odd)", pass: false },
        { label: "÷ 3", answer: "NO", reason: "8+4+7=19\n19÷3 ≠ whole", pass: false },
        { label: "÷ 5", answer: "NO", reason: "Ends in 7\n(not 0 or 5)", pass: false },
        { label: "÷ 10", answer: "NO", reason: "Doesn't\nend in 0", pass: false },
      ];
      results.forEach((r, i) => {
        const cx = 0.5 + i * 2.35;
        addTextOnShape(slide, r.answer, {
          x: cx + 0.5, y: CONTENT_TOP + 1.9, w: 1.1, h: 0.5, rectRadius: 0.08,
          fill: { color: C.ALERT },
        }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
        slide.addText(r.reason, {
          x: cx + 0.1, y: CONTENT_TOP + 2.45, w: 1.9, h: 0.35,
          fontSize: 9, fontFace: FONT_B, color: C.CHARCOAL, align: "center", margin: 0,
        });
      });
      addTextOnShape(slide, "847 fails ALL four rules — what kind of number is this?", {
        x: 1.5, y: CONTENT_TOP + 3.0, w: 7.0, h: 0.4, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDES 13–14: Hinge Question (withReveal) ────────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "Hinge Question", { color: C.ALERT, w: 2.2 });
      addTitle(s, "Which is divisible by 3?", { color: C.ALERT });

      const options = [
        { letter: "A", value: "412", color: C.PRIMARY },
        { letter: "B", value: "305", color: C.SECONDARY },
        { letter: "C", value: "531", color: C.ACCENT },
        { letter: "D", value: "700", color: C.SUCCESS },
      ];
      options.forEach((opt, i) => {
        const ox = 0.5 + i * 2.3;
        addCard(s, ox, CONTENT_TOP + 0.2, 2.0, 1.8, { strip: opt.color });
        addTextOnShape(s, opt.letter, {
          x: ox + 0.15, y: CONTENT_TOP + 0.35, w: 0.45, h: 0.45, rectRadius: 0.22,
          fill: { color: opt.color },
        }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
        s.addText(opt.value, {
          x: ox, y: CONTENT_TOP + 0.9, w: 2.0, h: 0.8,
          fontSize: 32, fontFace: FONT_H, color: C.CHARCOAL,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
      });

      addTextOnShape(s, "Hold up 1, 2, 3, or 4 fingers", {
        x: 2.5, y: CONTENT_TOP + 2.3, w: 5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_HINGE);
      return s;
    },
    (slide) => {
      // Cover the red bar and show answer
      addTextOnShape(slide, "C — 531 is divisible by 3", {
        x: 1.5, y: CONTENT_TOP + 2.2, w: 7, h: 0.55, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
      slide.addText("5 + 3 + 1 = 9     and     9 ÷ 3 = 3  ✓", {
        x: 1.5, y: CONTENT_TOP + 2.85, w: 7, h: 0.35,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      slide.addText("A) 4+1+2=7 ✗     B) 3+0+5=8 ✗     D) 7+0+0=7 ✗", {
        x: 1.5, y: CONTENT_TOP + 3.2, w: 7, h: 0.25,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });
    }
  );

  // ── SLIDE 15: You Do (Stage 4) ──────────────────────────────────────
  contentSlide(pres, "Stage 4 | You Do", C.ALERT, "Independent Practice: Divisibility Testing", [], NOTES_YOUDO, FOOTER, (s) => {
    addCard(s, 0.5, CONTENT_TOP, 5.5, 2.0, { strip: C.ALERT });
    const steps = [
      { label: "For each number:", text: "Test all 4 divisibility rules." },
      { label: "Write:", text: "YES or NO for ÷2, ÷3, ÷5, ÷10." },
      { label: "Challenge:", text: "Explain WHY the digit-sum rule works for 3." },
    ];
    steps.forEach((st, i) => {
      s.addText([
        { text: st.label + " ", options: { bold: true, fontSize: 12, color: C.ALERT } },
        { text: st.text, options: { fontSize: 12, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: CONTENT_TOP + 0.15 + i * 0.55, w: 5.0, h: 0.4,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Sample numbers on right
    const nums = [48, 135, 270, 511, 1236, 4095];
    nums.forEach((n, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      addTextOnShape(s, String(n), {
        x: 6.3 + col * 1.7, y: CONTENT_TOP + 0.1 + row * 0.7, w: 1.4, h: 0.55, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

    addTextOnShape(s, "Use your SR1 Worksheet", {
      x: 6.5, y: SAFE_BOTTOM - 0.55, w: 3.0, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });
  });

  // ── SLIDE 16: Exit Ticket (Stage 5) ─────────────────────────────────
  exitTicketSlide(pres, [
    "List the first 8 multiples of 7.",
    "Test 594 for divisibility by 2, 3, 5, and 10. Show your working for each rule.",
    "Challenge: Explain in your own words WHY adding the digits tells you if a number is divisible by 3.",
  ], NOTES_EXIT, FOOTER);

  // ── SLIDE 17: Resources ─────────────────────────────────────────────
  addResourceSlide(pres, [
    {
      name: "SR1 — Divisibility Rules Worksheet",
      fileName: "SR1_Divisibility_Worksheet.pdf",
      description: "Independent practice — test 10 numbers against all four rules.",
    },
    {
      name: "SR2 — Divisibility Rules Answer Key",
      fileName: "SR2_Divisibility_Answers.pdf",
      description: "Answer key for SR1. Teacher reference.",
    },
    {
      name: "EXT1 — Advanced Divisibility Rules Investigation",
      fileName: "EXT1_Advanced_Divisibility.pdf",
      description: "Extending resource: rules for 4, 6, 8, 9, and 11.",
    },
  ], { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // ── SLIDE 18: Closing ───────────────────────────────────────────────
  closingSlide(pres,
    "What's one divisibility rule you'll remember tomorrow? Turn to your partner — explain the rule and WHY it works. 30 seconds.",
    [
      "SC1: I can list the first 10 multiples of any single-digit number.",
      "SC2: I can use divisibility rules for 2, 3, 5, and 10 to quickly test any number.",
      "SC3: I can explain why the digit-sum rule works for 3.",
      "Tomorrow: Prime and composite numbers — using factors to classify.",
    ],
    NOTES_CLOSING);

  // ── Write PPTX ──────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: OUT_DIR + "/FM_Lesson2_Multiples_Divisibility.pptx" });
  console.log("PPTX written to " + OUT_DIR);

  // ── Generate companion PDFs ──────────────────────────────────────────
  await generateWorksheet();
  await generateAnswerKey();
  await generateExtendingPdf();
  console.log("All PDFs generated.");
}

// ── PDF: SR1 — Divisibility Rules Worksheet ──────────────────────────────────

async function generateWorksheet() {
  const doc = createPdf({ title: "Divisibility Rules Worksheet" });

  let y = addPdfHeader(doc, "Divisibility Rules Practice", {
    subtitle: "SR1 — Supporting Resource",
    color: C.PRIMARY,
    lessonInfo: "Session 2 of 5 | Factors & Multiples | Year 5/6 Maths",
  });

  y = addTipBox(doc, "Rules: ÷2 → last digit even  |  ÷3 → digit sum ÷ 3  |  ÷5 → ends in 0 or 5  |  ÷10 → ends in 0", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Section A: Test Each Number", y, { color: C.PRIMARY });

  const numbers = [48, 75, 135, 210, 270, 399, 511, 846, 1236, 4095];
  numbers.forEach((n, i) => {
    y = addProblem(doc, i + 1, `Test ${n} for divisibility.`, y, {
      writeLines: [
        { label: "÷ 2:" },
        { label: "÷ 3 (digit sum =       ):" },
        { label: "÷ 5:" },
        { label: "÷ 10:" },
      ],
      color: C.PRIMARY,
    });
  });

  y = addSectionHeading(doc, "Section B: Challenge (SC3)", y, { color: C.ACCENT });
  y = addBodyText(doc, "Explain in your own words: Why does adding the digits of a number tell you whether it is divisible by 3? (Hint: Think about what happens when you break 10 into 9 + 1, 100 into 99 + 1, etc.)", y);
  y = addLinedArea(doc, y + 5, 6);

  addPdfFooter(doc, "Session 2 of 5 | Factors & Multiples | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR1_Divisibility_Worksheet.pdf");
  console.log("  SR1 worksheet written.");
}

// ── PDF: SR2 — Answer Key ────────────────────────────────────────────────────

async function generateAnswerKey() {
  const doc = createPdf({ title: "Divisibility Rules Answer Key" });

  let y = addPdfHeader(doc, "Divisibility Rules — Answer Key", {
    subtitle: "SR2 — Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: "Session 2 of 5 | Factors & Multiples | Year 5/6 Maths",
    showNameDate: false,
  });

  y = addSectionHeading(doc, "Section A: Answers", y, { color: C.PRIMARY });

  const answers = [
    { n: 48, d2: "YES (8 even)", d3: "YES (4+8=12, 12÷3=4)", d5: "NO", d10: "NO" },
    { n: 75, d2: "NO (5 odd)", d3: "YES (7+5=12, 12÷3=4)", d5: "YES (ends in 5)", d10: "NO" },
    { n: 135, d2: "NO (5 odd)", d3: "YES (1+3+5=9, 9÷3=3)", d5: "YES (ends in 5)", d10: "NO" },
    { n: 210, d2: "YES (0 even)", d3: "YES (2+1+0=3, 3÷3=1)", d5: "YES (ends in 0)", d10: "YES (ends in 0)" },
    { n: 270, d2: "YES (0 even)", d3: "YES (2+7+0=9, 9÷3=3)", d5: "YES (ends in 0)", d10: "YES (ends in 0)" },
    { n: 399, d2: "NO (9 odd)", d3: "YES (3+9+9=21, 21÷3=7)", d5: "NO", d10: "NO" },
    { n: 511, d2: "NO (1 odd)", d3: "NO (5+1+1=7)", d5: "NO", d10: "NO" },
    { n: 846, d2: "YES (6 even)", d3: "YES (8+4+6=18, 18÷3=6)", d5: "NO", d10: "NO" },
    { n: 1236, d2: "YES (6 even)", d3: "YES (1+2+3+6=12, 12÷3=4)", d5: "NO", d10: "NO" },
    { n: 4095, d2: "NO (5 odd)", d3: "YES (4+0+9+5=18, 18÷3=6)", d5: "YES (ends in 5)", d10: "NO" },
  ];

  answers.forEach((a, i) => {
    y = addProblem(doc, i + 1, `${a.n}:`, y, {
      writeLines: [
        { label: "÷ 2:", answer: a.d2 },
        { label: "÷ 3:", answer: a.d3 },
        { label: "÷ 5:", answer: a.d5 },
        { label: "÷ 10:", answer: a.d10 },
      ],
      color: C.PRIMARY,
    });
  });

  y = addSectionHeading(doc, "Section B: Challenge Answer", y, { color: C.ACCENT });
  y = addBodyText(doc, "Every place value is 1 more than a multiple of 3: 10 = 9+1, 100 = 99+1, 1000 = 999+1. Since 9, 99, 999… are all divisible by 3, the 'leftover' from each digit position is just the digit itself. So when we add all the digits, we get the total leftover after removing all the multiples of 3. If that total is divisible by 3, the original number is too.", y);

  addPdfFooter(doc, "Session 2 of 5 | Factors & Multiples | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR2_Divisibility_Answers.pdf");
  console.log("  SR2 answer key written.");
}

// ── PDF: EXT1 — Advanced Divisibility Rules ─────────────────────────────────

async function generateExtendingPdf() {
  const doc = createPdf({ title: "Advanced Divisibility Rules Investigation" });

  let y = addPdfHeader(doc, "Advanced Divisibility Rules", {
    subtitle: "EXT1 — Extending Investigation",
    color: C.ACCENT,
    lessonInfo: "Session 2 of 5 | Factors & Multiples | Year 5/6 Maths",
  });

  y = addTipBox(doc, "You already know the rules for 2, 3, 5, and 10. Now let's discover rules for MORE numbers! Work through each section carefully — the explanations will help you understand WHY each rule works.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Rule for 4: Check the last TWO digits", y, { color: C.PRIMARY });
  y = addBodyText(doc, "A number is divisible by 4 if its last two digits form a number divisible by 4.\nExample: 1 316 → last two digits are 16 → 16 ÷ 4 = 4 → YES!\nExample: 1 318 → last two digits are 18 → 18 ÷ 4 = 4.5 → NO", y);
  y = addBodyText(doc, "Why it works: 100 is divisible by 4 (100 ÷ 4 = 25), so any hundreds, thousands, etc. are automatically divisible by 4. Only the last two digits matter.", y);

  y = addSectionHeading(doc, "Rule for 6: Must pass BOTH ÷2 AND ÷3", y, { color: C.PRIMARY });
  y = addBodyText(doc, "6 = 2 × 3. So a number is divisible by 6 only if it passes the rule of 2 (even) AND the rule of 3 (digit sum divisible by 3).\nExample: 354 → even? YES (ends in 4) → digit sum 3+5+4=12, 12÷3=4 → YES → divisible by 6!", y);

  y = addSectionHeading(doc, "Rule for 9: Digit sum divisible by 9", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Just like the rule of 3, but the digit sum must be divisible by 9 (not just 3).\nExample: 729 → 7+2+9=18 → 18÷9=2 → YES!\nExample: 135 → 1+3+5=9 → 9÷9=1 → YES! (135 is divisible by both 3 AND 9)", y);

  y = addSectionHeading(doc, "Your Investigation", y, { color: C.ACCENT });
  y = addBodyText(doc, "Test each number below against the rules for 4, 6, and 9. Write YES or NO for each.", y);

  const testNums = [252, 504, 738, 1044, 2187];
  testNums.forEach((n, i) => {
    y = addProblem(doc, i + 1, `Test ${n}:`, y, {
      writeLines: [
        { label: "÷ 4 (last two digits =       ):" },
        { label: "÷ 6 (even AND digit sum ÷ 3):" },
        { label: "÷ 9 (digit sum =       ):" },
      ],
      color: C.ACCENT,
    });
  });

  y = addSectionHeading(doc, "Challenge: The Rule for 11", y, { color: C.ALERT });
  y = addBodyText(doc, "A number is divisible by 11 if the alternating sum of its digits is divisible by 11 (or is 0).\nAlternating sum: start from the left, alternate + and −.\nExample: 918 → 9 − 1 + 8 = 16 → NOT divisible by 11.\nExample: 935 → 9 − 3 + 5 = 11 → YES! (935 ÷ 11 = 85)\n\nTest these numbers for divisibility by 11: 253, 407, 1 364. Show your working.", y);
  y = addLinedArea(doc, y + 5, 6);

  addPdfFooter(doc, "Session 2 of 5 | Factors & Multiples | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/EXT1_Advanced_Divisibility.pdf");
  console.log("  EXT1 extending investigation written.");
}

build().catch(console.error);
