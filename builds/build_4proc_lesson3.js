// Lesson 3 of 4: Short Division Review
// Year 5/6 Numeracy — Four Processes Review Week
// Focus: Short division algorithm, carrying remainders, expressing remainders
// Session 3

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
const T = createTheme("numeracy", "grade56", 2);
const {
  C, FONT_H, FONT_B,
  titleSlide, liSlide, contentSlide, cfuSlide, closingSlide,
  workedExSlide, exitTicketSlide, addStageBadge,
  withReveal,
  addTopBar, addBadge, addTitle, addCard, addFooter, addTextOnShape,
  iconToBase64Png, getContrastColor,
  SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;

const OUT_DIR = "output/4Proc_Lesson3_Short_Division";
const FOOTER = "Session 3 of 4 | Four Processes Review | Year 5/6 Maths";

// ── Teacher notes ─────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
• "Welcome to Session 3 of our Four Processes Review week. Today we're focusing on short division — the bus stop method."
• "You've all learned short division before. Today is about making sure we are accurate, fluent, and confident — especially when carrying remainders between columns."
• "By the end of the lesson, you'll be dividing multi-digit numbers with precision and expressing remainders in three different ways."

**DO:**
• Display the title slide as students settle. Ensure mini-whiteboards and markers are on every desk.
• Remind students: "This is a REVIEW lesson — we're tightening up our skills, not learning from scratch."

**TEACHER NOTES:**
Session 3 of a 4-session review week covering the four processes (addition, subtraction, multiplication, division). Students have been previously taught short division — this session targets fluency, accuracy, and common error correction. The lesson follows an explicit teaching structure: Daily Review activates prerequisite knowledge (multiples and divisibility), Fluency builds automaticity with division facts, I Do models the algorithm with think-aloud to surface misconceptions, We Do provides guided practice with withReveal, and You Do gives independent practice. The exit ticket assesses three tiers: clean division, remainder expression, and error analysis.

**WATCH FOR:**
• Students who seem anxious about division — division is the most commonly feared of the four processes. Reassure: "We're reviewing, not starting from scratch. You know more than you think."
• Readiness signal: students settling with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR1 = `**SAY:**
• "Let's warm up. Today's Daily Review connects to division by looking at how multiples work."
• "Remember: all multiples can be formed by combining or regrouping. For example, multiples of 7 can be made by adding a multiple of 2 and the matching multiple of 5."
• "3 times 7 equals 3 times 2 plus 3 times 5. That's 6 plus 15 equals 21. Check: 3 times 7 IS 21."
• "Now let's extend: what about 6 times 7? Use the same approach."
• Allow 30 seconds. "6 times 2 is 12. 6 times 5 is 30. 12 plus 30 is 42. And 6 times 7 IS 42."
• "Why does this work? Because 7 equals 2 plus 5, so multiplying by 7 is the same as multiplying by 2 and by 5 and adding the results. This is the distributive law in action."

**DO:**
• Display the slide. Walk through the worked example for 3 x 7 step by step.
• Allow 30 seconds for students to attempt 6 x 7 on whiteboards.
• Reveal the answer. Ask: "Can anyone explain WHY this works?"
• Draw attention to the right-side visual showing the splitting.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Using the same method, what is 4 x 7? Split into 4 x 2 and 4 x 5. Show me on your boards."
• Scan for: 4 x 2 = 8, 4 x 5 = 20, 8 + 20 = 28. Correct answer on >=80% of boards.
PROCEED: If >=80% correct, move to DR2.
PIVOT: If students struggle, model one more: "5 x 7 = 5 x 2 + 5 x 5 = 10 + 25 = 35." Then re-check.

**TEACHER NOTES:**
This Daily Review target is prescribed: "Number Properties and Algorithms — I can demonstrate that all multiples can be formed by combining or regrouping." The distributive law underpins why short division works — when we carry a remainder to the next column, we're essentially regrouping. By activating this understanding here, students are better prepared to understand WHY carrying works in short division. The connection is not made explicit to students at this point — it's primed implicitly.

**WATCH FOR:**
• Students who multiply correctly but don't understand WHY the splitting works — note for later. Understanding the distributive property supports later algebraic thinking.
• Students who get confused by the "splitting" and add 2 and 5 first (getting 7, then multiplying) — they're not splitting, they're just multiplying by 7. Redirect: "The point is to split BEFORE multiplying."
• Readiness signal: students completing the board check within 15 seconds with working shown.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_DR2 = `**SAY:**
• "Now let's review divisibility tests. These help us quickly check if a number divides evenly — no calculator needed."
• "Question 1: Is 45,678 divisible by 9?"
• "The divisibility rule for 9: add all the digits. If the sum is divisible by 9, the number is divisible by 9."
• "4 + 5 + 6 + 7 + 8 = 30. Is 30 divisible by 9? 30 divided by 9 is 3 remainder 3. So NO, 45,678 is NOT divisible by 9."
• "Question 2: Is 12,345 divisible by 3?"
• "The rule for 3 is the same idea: add the digits. If the sum is divisible by 3, the number is divisible by 3."
• "1 + 2 + 3 + 4 + 5 = 15. Is 15 divisible by 3? 15 divided by 3 = 5 exactly. YES, 12,345 IS divisible by 3."

**DO:**
• Display the slide. Read Q1 aloud. Model the digit sum for 45,678.
• Allow students to attempt Q2 on whiteboards (30 seconds).
• Reveal: "Digit sum of 12,345 is 15, and 15 / 3 = 5. YES."
• Quick extension: "If 12,345 is divisible by 3, what would 12,345 / 3 actually be? Don't calculate — just know the algorithm will produce a whole number answer."

**CFU CHECKPOINT:**
Technique: Thumbs Up/Down
Script:
• "Is 111 divisible by 3? Thumbs up for yes, thumbs down for no."
• Digit sum: 1 + 1 + 1 = 3. YES. Thumbs up.
• "Is 245 divisible by 9?" Digit sum: 2 + 4 + 5 = 11. NO. Thumbs down.
PROCEED: If >=80% correct on both, move to Fluency.
PIVOT: If students struggle with the digit sum, model slowly: "Write the digits apart: 2... 4... 5... Now add: 2 plus 4 is 6, plus 5 is 11. Is 11 in the 9 times table? No."

**TEACHER NOTES:**
This Daily Review target is prescribed: "Multiplication and Division as Inverse Operations — I can use divisibility tests to determine if larger numbers are multiples of one-digit numbers." Divisibility tests connect directly to short division — if a student knows a number is NOT divisible by the divisor, they can predict there will be a remainder before they even start the algorithm. This metacognitive awareness helps students self-monitor during short division. The digit-sum tests for 3 and 9 are the most commonly taught and most useful for checking work.

**WATCH FOR:**
• Students who add digits incorrectly — this is an arithmetic error, not a conceptual one. Encourage: "Write each digit separately, then add carefully."
• Students who confuse the rules for 3 and 9 — both use digit sums, but the threshold differs. Clarify: "For 3, the digit sum must be a multiple of 3. For 9, the digit sum must be a multiple of 9."
• Readiness signal: confident thumbs and quick digit sums.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
• "Division facts sprint. You have 60 seconds. These target the harder division facts: dividing by 6, 7, 8, and 9."
• "Write answers only — no working needed. If you get stuck, skip it and come back."
• "Ready? Pencils up... GO."
• After 60 seconds: "Pens down. Let's check. Call out your answer for number 1... 48 divided by 6 is 8."
• Read through answers rapidly. Students self-mark.
• "Hands up — who got 10 or more? 8 or more? If you got fewer than 8, that's OK — these are the hardest division facts. Keep practising."

**DO:**
• Display the slide. Students work silently for exactly 60 seconds.
• Time precisely. Say "GO" to start and "STOP" to end.
• Read answers aloud quickly — students self-mark.
• Ask for hands up at different thresholds to gauge class fluency.

**TEACHER NOTES:**
Division fact fluency is the critical prerequisite for short division. A student who cannot quickly recall 56 / 8 = 7 will struggle at every step of the algorithm. The 60-second sprint format normalises speed alongside accuracy. Facts targeting /6, /7, /8, /9 are deliberately chosen because these are the hardest and most commonly confused division facts. The facts are presented in mixed order to prevent students from using patterns (e.g., counting by 7s) rather than recall. Students who score below 8/12 may need additional fluency intervention outside this lesson.

**WATCH FOR:**
• Students who freeze at the start — they may lack confidence. Encourage: "Just do the ones you know first."
• Students who count on fingers or skip-count — this is not automaticity. Note these students for follow-up fluency practice.
• Students who confuse 56/7 with 56/8 — common mix-up. These students will likely make errors during short division when identifying the largest multiple.
• Readiness signal: most students completing 8+ problems in 60 seconds.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
• Read the LI: "We are learning to use the short division algorithm to divide multi-digit numbers accurately so we can solve division problems fluently."
• "Let's look at our three success criteria."
• "SC1: I can set out a short division problem correctly using the bus stop layout. This is the foundation — getting the layout right."
• "SC2: I can carry out short division including carrying remainders between place value columns. This is the big one today — the carrying is where most errors happen."
• "SC3: I can interpret the remainder and express it as a whole number remainder, a fraction, or a decimal. This is the final step — what do you DO with the remainder?"

**DO:**
• Display the slide. Point to each SC in turn.
• Pause after SC2: "This is where the most common errors happen. We're going to spend a lot of time on this today."
• Leave the slide visible for 20-30 seconds so students can read and internalise.

**TEACHER NOTES:**
The LI frames short division as a REVIEW skill being consolidated for fluency and accuracy, not as new learning. The three SCs are ordered progressively: SC1 is procedural setup (bus stop layout), SC2 is the core algorithmic skill (carrying remainders), SC3 extends to interpretation (expressing remainders three ways). SC2 is where most Year 5/6 errors occur — students who set up correctly (SC1) still frequently fail at carrying (SC2). SC3 connects short division to fractions and decimals, reinforcing cross-topic links.

**WATCH FOR:**
• Students who look confident at the LI — they may already be fluent. Plan to release these students to independent practice earlier during We Do.
• Students who look anxious — note for closer monitoring during I Do.
• Readiness signal: students nodding or whispering the SC to themselves.

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_WE1 = `**SAY:**
• "Watch me work through a short division problem. I'm going to think aloud so you can hear my decision-making."
• "The problem: 846 divided by 2."
• "First, I set up the bus stop. The DIVISOR — that's the number I'm dividing BY — goes on the LEFT, outside the bus stop. The DIVIDEND — that's the number being divided — goes INSIDE. The answer goes ON TOP."
• Think-aloud: "I start with the FIRST digit of the dividend: 8."
• "8 divided by 2... I ask myself: what's the biggest multiple of 2 that fits into 8? 2 times 4 equals 8. It fits exactly! I write 4 on top, above the 8. No remainder to carry."
• "Next digit: 4. 4 divided by 2... 2 times 2 equals 4. Exactly! I write 2 on top. No remainder."
• "Last digit: 6. 6 divided by 2... 2 times 3 equals 6. Exactly! I write 3 on top."
• "My answer: 423. Let me check: 423 times 2 equals 846. Correct!"
• "Notice: this was a clean division — no remainders anywhere. Every digit divided evenly. That won't always happen."

**DO:**
• Display the slide. Point to each element of the bus stop layout as you name it.
• Work through each digit deliberately slowly — narrate EVERY decision.
• After completing, demonstrate the checking strategy: multiply quotient by divisor.
• Emphasise: "The answer goes ON TOP — not underneath. Many students get confused about where the answer sits."

**TEACHER NOTES:**
Worked Example 1 is deliberately simple — 846 / 2 has no carrying, no remainders. This allows students to focus on the LAYOUT and PROCEDURE of the bus stop method without the cognitive load of carrying. The think-aloud models three key metacognitive moves: (1) identifying where each number goes in the bus stop, (2) working left-to-right through the dividend, and (3) checking by multiplying back. The checking strategy (quotient x divisor = dividend) is essential for self-monitoring and should be reinforced throughout the lesson.

**MISCONCEPTIONS:**
• Misconception: "The answer goes below the bus stop line."
  Why: Students may confuse short division layout with long multiplication layout, where partial products go below.
  Impact: If the answer is written below, students lose track of place value alignment and may produce incorrect answers.
  Quick correction: "In the bus stop, the answer always sits ON TOP of the line. Think of it as passengers sitting ON TOP of the bus."

**WATCH FOR:**
• Students who look bored or impatient — this example is intentionally easy. They can be reassured that the next example gets harder.
• Students who seem confused about the layout despite this being review — note for closer monitoring. These students may have a fragile understanding of short division.
• Readiness signal: students nodding along and some mouthing the answers before you say them.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_WE2 = `**SAY:**
• "Now a harder one. 7,458 divided by 6. This time there WILL be remainders to carry."
• "I set up my bus stop: 6 on the outside, 7,458 on the inside."
• Think-aloud: "First digit: 7. I ask: what's the biggest multiple of 6 that fits into 7? 6 times 1 equals 6. So I write 1 on top. My remainder is 7 minus 6 equals 1."
• Decision point: "Here's the CRITICAL step. I CARRY this remainder 1 to the next column. I write a small 1 next to the 4, making it 14. NOT just 4 — FOURTEEN."
• "14 divided by 6... what's the biggest multiple of 6 that fits into 14? I might be tempted to say 6 times 3 equals 18... WAIT. 18 is BIGGER than 14! That's too much. It must be 6 times 2 equals 12. I write 2 on top. Remainder is 14 minus 12 equals 2. Carry the 2."
• "Now I have 25 (the carried 2 with the 5). 25 divided by 6... 6 times 4 equals 24. Write 4 on top. Remainder 25 minus 24 equals 1. Carry the 1."
• "Now I have 18 (the carried 1 with the 8). 18 divided by 6... 6 times 3 equals 18 exactly! Write 3 on top. No remainder."
• "My answer: 1,243. Let me check: 1,243 times 6... 1,200 times 6 is 7,200, plus 43 times 6 is 258. 7,200 plus 258 equals 7,458. CORRECT!"

**DO:**
• Display the slide. Work through each step with exaggerated deliberateness.
• Use colour-coding on the slide: each step in a different colour to show the progression.
• At the carrying step, physically write the small superscript digit — make this very visible.
• Pause at the deliberate error moment (14 / 6 = 3?): "6 times 3 is 18 — TOO BIG! Always check that your multiple doesn't exceed the number."
• Demonstrate the verification: "1,243 times 6 should give me back 7,458."

**TEACHER NOTES:**
This is the core worked example of the lesson. 7,458 / 6 is chosen because it requires carrying at every step except the last, forcing students to see the carrying process repeatedly. The deliberate error at 14 / 6 = 3 is pedagogically critical — this is the most common error in short division. Students who choose a multiple that is too large produce an answer that is too high for that column and cascade errors through the remaining digits. The think-aloud explicitly models the self-monitoring question: "Is my multiple bigger than the number? If so, go down one." The verification step (multiply back) teaches students to self-check — a habit that prevents errors from persisting.

**MISCONCEPTIONS:**
• Misconception: "After 7 / 6 = 1 r 1, the next step is 4 / 6, not 14 / 6."
  Why: Students forget to carry the remainder. They see the next digit as standalone rather than combined with the carried remainder.
  Impact: This produces completely wrong answers. For 7,458 / 6: without carrying, the student gets 1 (from 7/6) then gets stuck at 4/6 (can't divide), potentially writing 0 or skipping.
  Quick correction: "The remainder is like a passenger who moves to the next seat. The 1 remainder hops over to join the 4, making 14. Always carry your remainder."

• Misconception: "6 times 3 = 18 fits into 14."
  Why: Students choose the next multiple without checking if it exceeds the number. They may confuse "closest" with "biggest that fits."
  Impact: The quotient digit is too large, and when they subtract, they'd get a negative remainder — but most students just write a wrong digit and move on.
  Quick correction: "Always CHECK: is your multiple BIGGER than the number? 18 is bigger than 14, so 3 is too much. Go down to 2: 6 times 2 equals 12. Does 12 fit in 14? Yes — with remainder 2."

**WATCH FOR:**
• Students who are writing along on their whiteboards — excellent! They're actively processing.
• Students who look confused at the carrying step — this is the key misconception area. Plan to give these students extra attention during CFU.
• Readiness signal: students following along and some nodding at the verification step.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
• "Your turn. On your whiteboards, work out 5,376 divided by 4 using the bus stop method."
• "Set up your bus stop. Work through each digit. Carry any remainders. You have 45 seconds."
• "Remember: divisor on the left, dividend inside, answer on top."
• After 45 seconds: "Boards up — show me!"
• Scan boards. "Let's check."
• "5 divided by 4 equals 1 remainder 1. Carry the 1 to make 13."
• "13 divided by 4 equals 3 remainder 1. Carry the 1 to make 17."
• "17 divided by 4 equals 4 remainder 1. Carry the 1 to make 16."
• "16 divided by 4 equals 4 exactly."
• "Answer: 1,344. Check: 1,344 times 4 equals 5,376."

**DO:**
• Display the question slide. Students work on whiteboards for 45 seconds.
• Circulate quickly — look for: correct bus stop layout, carrying digits visible, answer on top.
• After time: "Boards up!" Scan for correct answer (1,344).
• Click to reveal the worked solution.
• Cold call 1-2 students: "What did you carry after dividing 5 by 4?"

**CFU CHECKPOINT:**
Technique: Show Me Boards + Cold Call
Script:
• "Hold up your boards. I'm looking for 1,344 with carrying shown."
• Scan for: correct answer on >=80% of boards.
PROCEED: If >=80% correct with carrying shown, move to We Do.
PIVOT: Most likely errors:
  - Answer of 1,344 but no carrying shown: "I need to SEE the carried digits. They're tiny numbers next to the next digit."
  - Answer of 1,094 (forgot to carry): Reteach carrying with the first two digits. "5 / 4 = 1 r 1. That remainder 1 makes the next number 13, not 3."
  - Answer wrong in the last digit (e.g., 1,346): Check if they carried correctly to the last column.

**TEACHER NOTES:**
This CFU uses Show Me Boards because it gives whole-class visibility of working AND answers simultaneously. The problem 5,376 / 4 requires carrying at every step (5/4 = 1 r1, 13/4 = 3 r1, 17/4 = 4 r1, 16/4 = 4), providing a thorough check of SC2. Cold calling after boards up pushes beyond just getting the right answer — it checks whether students can EXPLAIN the carrying process. Students who produce 1,344 without being able to explain what they carried are pattern-matching, not understanding.

**WATCH FOR:**
• Students who produce the correct answer quickly and confidently — these students are ready for We Do without scaffolding.
• Students who get 1,344 but took a long time — they understand the process but lack fluency. More practice needed.
• Students who get a wrong answer — check WHERE the error occurred. Is it a carrying error (SC2) or a division fact error (fluency)?
• Readiness signal: >=80% correct within 45 seconds with visible carrying.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
• "Let's work through this together. 8,694 divided by 3."
• "Set up your bus stop. Divisor 3 on the left, 8,694 inside."
• "Work each digit on your whiteboards. I'll give you 45 seconds, then we'll check together."
• After 45 seconds: "Let's go through it."
• "8 divided by 3: biggest multiple of 3 that fits? 3 times 2 equals 6. Write 2. Remainder: 8 minus 6 equals 2. Carry the 2."
• "Now we have 26. 26 divided by 3: 3 times 8 equals 24. Write 8. Remainder: 26 minus 24 equals 2. Carry the 2."
• "Now 29. 29 divided by 3: 3 times 9 equals 27. Write 9. Remainder: 29 minus 27 equals 2. Carry the 2."
• "Now 24. 24 divided by 3: 3 times 8 equals 24. Write 8. No remainder."
• "Answer: 2,898."
• "Check: 2,898 times 3. 2,900 times 3 is 8,700, minus 2 times 3 is 6. 8,700 minus 6 is 8,694. Correct!"

**DO:**
• Display the question slide. Students work on whiteboards.
• After 45 seconds, click to reveal and work through the solution step by step.
• Point to each carrying step on the slide — ensure the small superscript digits are visible.
• Highlight the pattern: "Notice how we kept carrying 2 each time. That's a coincidence here — it won't always be the same remainder."

**TEACHER NOTES:**
Problem Pair 1 is a clean division (no final remainder). 8,694 / 3 requires carrying at every step except the last, reinforcing the carrying procedure from the I Do. The answer 2,898 has a satisfying pattern that students may notice. This problem is used with withReveal — students attempt on whiteboards before the solution is shown, creating a low-stakes assessment moment. The verification step (multiply back) is modelled again to reinforce the self-checking habit.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide a bus stop template with place value columns pre-drawn. The first step is completed: "8 / 3 = 2 r 2" with the 2 carried. Students complete the remaining digits.
• Extra Notes: Seat enabling students near the front. Check their first carry is correct before they proceed.

EXTENDING PROMPT:
• Task: After solving 8,694 / 3, students verify by multiplying 2,898 x 3 on their whiteboards using the column method. Then they try: "What is 8,695 / 3? How is it different?"
• Extra Notes: 8,695 / 3 = 2,898 r 1. The extending question introduces the remainder concept naturally.

**WATCH FOR:**
• Students who get 2,898 quickly — they're fluent. Move them to extending.
• Students who stumble at 26 / 3 — they may not know that 3 x 8 = 24. This is a fluency gap, not a conceptual one.
• Students who forget to carry — redirect: "What's left over? Where does it go?"
• Readiness signal: >=80% with correct answer within 45 seconds.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
• "This time, we'll have a remainder at the END. 4,537 divided by 8."
• "Set up your bus stop. Work through each digit. When you finish, you'll have a remainder. Keep it!"
• "You have 60 seconds — this one's trickier."
• After 60 seconds: "Let's work through it."
• "4 divided by 8... 4 is SMALLER than 8! I can't divide. So I write 0 on top — or I can combine: I look at the first TWO digits together. 45 divided by 8."
• "Actually, let me show you the cleaner approach: 4 divided by 8 = 0 remainder 4. Write 0 on top. Carry the 4 to make 45."
• "45 divided by 8: 8 times 5 equals 40. Write 5. Remainder: 45 minus 40 equals 5. Carry the 5."
• "53 divided by 8: 8 times 6 equals 48. Write 6. Remainder: 53 minus 48 equals 5. Carry the 5."
• "57 divided by 8: 8 times 7 equals 56. Write 7. Remainder: 57 minus 56 equals 1."
• "We've gone through all the digits, and we have a final remainder of 1."
• "Now — THREE ways to express this:"
• "Way 1: 567 remainder 1, or 567 r 1."
• "Way 2: 567 and 1/8. The remainder over the divisor gives us a fraction."
• "Way 3: 567.125. We can continue dividing: 1.000 divided by 8 = 0.125."
• "All three are correct — the question tells you which form to use."

**DO:**
• Display the question slide. Students work on whiteboards for 60 seconds.
• Click to reveal. Work through each step with colour-coding.
• At the "4 / 8" step, pause: "This is a common tripping point. When the first digit is smaller than the divisor, we write 0 and carry the entire digit."
• After reaching remainder 1, display all three forms side by side.
• For the decimal: briefly show continuing the division with a decimal point.

**TEACHER NOTES:**
Problem Pair 2 introduces TWO critical concepts: (1) what happens when the first digit of the dividend is smaller than the divisor (4 < 8), and (2) expressing the final remainder three ways. The "first digit smaller" situation is a common sticking point — students either skip the digit, start from the second digit, or get confused. The approach of writing 0 and carrying is shown explicitly but note that the leading zero can be dropped in the final answer (567, not 0567). The three forms of remainder expression are a key SC3 target. The fraction form (remainder/divisor = 1/8) is the most commonly confused — students sometimes write remainder/dividend (1/4537) by mistake.

**MISCONCEPTIONS:**
• Misconception: "When the first digit is smaller than the divisor, skip it."
  Why: Students think "I can't divide 4 by 8, so I'll start at 45." This sometimes gives the right answer but shows poor understanding of the algorithm.
  Impact: When this happens in the middle of a problem (not just the first digit), students skip digits entirely and get wrong answers.
  Quick correction: "Never skip a digit. If 4 can't be divided by 8, the answer for that column is 0 and you carry the 4. This keeps our place value aligned."

• Misconception: "The remainder fraction is remainder over dividend (1/4537)."
  Why: Students confuse which number goes on top and bottom.
  Impact: Produces nonsensical tiny fractions instead of the correct fractional part.
  Quick correction: "The fraction is REMAINDER over DIVISOR. Think: the remainder is still waiting to be divided BY the divisor. 1 is still waiting to be divided by 8. So it's 1/8."

**WATCH FOR:**
• Students who write 567.1 instead of 567.125 — they may not know how to continue dividing with the decimal.
• Students who skip the leading zero and start at 45 — correct their layout even if they get the right answer. The habit will cause errors with more complex problems.
• Students who write 1/4537 as the fraction — immediately correct: "Remainder over DIVISOR."
• Readiness signal: students expressing the remainder correctly in at least one form.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
• "Hinge question time. I need to know if you're ready for independent work."
• "Look at this problem: 456 divided by 7. Four students have attempted it. Only ONE has the correct working. Which one?"
• "Study each option carefully. Look at the carrying digits, the quotient digits, and the final remainder."
• "You have 15 seconds. Hold up 1, 2, 3, or 4 fingers for your answer."
• After finger vote: "The answer is..." — click to reveal.
• "Let's examine why each wrong answer is wrong."
• Option A explanation (if wrong): describe the specific error.
• Option B explanation (if correct): "456 / 7. 4 / 7 = 0 r 4. Carry 4 to make 45. 45 / 7 = 6 r 3. Carry 3 to make 36. 36 / 7 = 5 r 1. Answer: 65 r 1."
• Debrief each distractor to surface and correct the specific misconception it represents.

**DO:**
• Display the hinge question with four options. Allow 15 seconds.
• "Show me fingers — 1, 2, 3, or 4." Scan the room.
• Click to reveal. Work through the correct solution step by step.
• Address each distractor: explain what error each one made.

**CFU CHECKPOINT:**
Technique: Finger Voting (1-4)
Script:
• "Hold up your fingers for the correct option. Ready... show me!"
• Scan for: correct option on >=80% of hands.
PROCEED: If >=80% choose the correct answer — students can identify correct division working. Release to You Do.
PIVOT: Most likely error patterns:
  - Students choosing the "forgot to carry" option: They may not recognise the carrying error. Reteach: "After 4 / 7 = 0 r 4, the 4 MUST carry to make 45. If you see 5 / 7 next, the carry was forgotten."
  - Students choosing the "wrong multiple" option: They may accept that a wrong quotient digit is fine. Reteach: "Always check: quotient digit times divisor — is the product LESS THAN or EQUAL to the number? If it's more, the digit is too big."
Re-check with: "What is 456 / 7? Work it out on your board." Boards up.

**TEACHER NOTES:**
The hinge question tests diagnostic ability — can students identify correct vs incorrect short division working? This is a higher-order skill than performing the division themselves, as it requires understanding WHY each step works. Each distractor represents a specific common misconception: forgetting to carry, choosing a multiple that's too large, mishandling the first digit when it's smaller than the divisor, and/or expressing the remainder incorrectly. Finger voting ensures rapid whole-class scanning. Students who identify the correct working can reliably self-monitor their own division.

**WATCH FOR:**
• Students who hold up fingers uncertainly — they may be guessing. Ask them to verify on their whiteboard.
• Students who choose quickly and confidently but choose the WRONG option — they may have the misconception themselves. Note for targeted support during You Do.
• Readiness signal: fast, confident finger holds for the correct answer.

[Maths: Monitor Progress — Hinge Question | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
• "You're ready. Time to practise independently."
• "You have 6 problems on your worksheet. They increase in difficulty."
• "Problems 1-4 are clean divisions or divisions with simple remainders."
• "Problems 5-6 require you to express the remainder as a fraction AND a decimal."
• "Work in silence. Show all your working — bus stop layout, carrying digits, and final answer."
• "You have 10 minutes."

**DO:**
• Distribute SR1 worksheet (Short Division Practice).
• Set a visible timer for 10 minutes.
• Circulate — visit struggling students first, then move to extending students.
• Conference briefly with 2-3 students: "Talk me through your carrying here."
• For extending students who finish early, direct them to EXT1 (Repeating Decimals Investigation).

**TEACHER NOTES:**
The You Do provides independent practice across the full difficulty range. Problems 1-2 are clean divisions (no final remainder), Problems 3-4 have remainders expressed as whole numbers, and Problems 5-6 require remainder expression as fractions and decimals. This progression allows every student to experience success on at least the first two problems before encountering increased difficulty. The instruction to "show all working" prevents students from just writing answers — their working reveals whether they understand the carrying process (SC2) and can self-check.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Students complete Problems 1-4 only. Provide a laminated bus stop template with place value columns marked. The first problem has the bus stop pre-drawn with the first step completed.
• Extra Notes: Circulate to enabling students after 2 minutes to check Problem 1 before they proceed.

EXTENDING PROMPT:
• Task: After completing all 6 problems, students attempt EXT1 — the Repeating Decimals Investigation. They explore what happens when dividing by 3, 6, 7, and 9, looking for repeating decimal patterns.
• Extra Notes: Distribute EXT1 to extending students when they finish the main worksheet. The investigation is self-contained.

**WATCH FOR:**
• Students who skip the carrying digits — remind: "I need to see every carry. They're tiny but important."
• Students who express remainders as fractions incorrectly (remainder/dividend instead of remainder/divisor) — this is the most common SC3 error.
• Students who struggle with Problem 5-6 — these require converting remainder to decimal. It's OK if enabling students don't reach these.
• Readiness signal: students completing Problems 1-4 correctly within 6 minutes.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
• "Pens down on the worksheet. Exit ticket time — three questions."
• "Work silently and independently. No looking at your worksheet or your neighbour."
• "Question 1 is a clean division. Question 2 has a remainder — express it three ways. Question 3 is error analysis — find and fix the mistake."
• "You have 4 minutes."

**DO:**
• Display the exit ticket slide. Students write answers in maths books or on the back of the worksheet.
• Set a timer for 4 minutes. Circulate silently — observe but don't help.
• Collect responses or note answers as students hold up books.
• After collection: briefly share Q1 answer. "9,636 / 4 = 2,409. Quick check: 2,409 x 4 = 9,636."

**TEACHER NOTES:**
The exit ticket assesses all three SCs. Q1 (clean division: 9,636 / 4) targets SC1 and SC2 — correct layout and carrying. The answer 2,409 includes a 0 in the tens column (40/4=0 r0, then 36/4=9), which tests whether students handle zero quotient digits correctly. Q2 (3,527 / 6) targets SC3 — expressing the remainder three ways (587 r 5, 587 5/6, 587.833...). Q3 (error analysis) targets deeper understanding — students must identify WHERE an error occurred in a worked solution and explain what went wrong. Sort responses into three groups: (1) Q1 wrong — need reteaching of basic algorithm, (2) Q1 right but Q2 partially right — need help with remainder expression, (3) all correct — ready for next session.

**WATCH FOR:**
• Q1: Students who get 2,409 wrong often stumble on the 0 — they may write 249 (dropping the tens digit when there's no remainder to carry but the digit divides evenly).
• Q2: Students who express remainder as 5/3527 instead of 5/6. Mark these for immediate feedback.
• Q3: Students who can't find the error — they may have the same misconception. This is valuable diagnostic data.
• Readiness signal: students finishing Q1 within 1 minute.

[Maths: Summarise — Exit Ticket (Stage 5) | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `**SAY:**
• "Here are the printable resources for today's lesson. If you're a teacher using this deck, click any link to open the PDF."
• "SR1 is the practice worksheet — 8 problems with bus stop grids. SR2 is the answer key showing all three remainder forms. EXT1 is the repeating decimals investigation for extending students."

**DO:**
• Display the slide briefly. Teachers can click hyperlinks to open PDFs.
• This slide is primarily for teacher preparation — students don't need to see it during the lesson.

**TEACHER NOTES:**
All PDFs are in the same folder as this PPTX file. Hyperlinks are relative — they work when the PPTX is opened from the lesson folder. Print SR1 before the lesson (one per student). Print EXT1 for extending students only (typically 3-5 copies). SR2 is for teacher reference — do not distribute to students.

**WATCH FOR:**
• N/A — this is a teacher-facing slide.

[Maths: Planning — Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
• "Let's review our success criteria."
• "SC1: I can set out a short division problem correctly using the bus stop layout. Thumbs up, sideways, or down."
• Pause and scan. "Great — most thumbs up."
• "SC2: I can carry out short division including carrying remainders between place value columns. Thumbs for SC2."
• Pause and scan. Note any thumbs-down.
• "SC3: I can interpret the remainder and express it as a whole number remainder, a fraction, or a decimal. Thumbs for SC3."
• Pause. "Some sideways here — that's the trickiest part. We'll keep practising."
• "Turn to your partner: What is the ONE mistake you want to make sure you NEVER make in short division? 30 seconds."
• Take 2-3 responses. "Great awareness. Tomorrow — Session 4, we put all four processes together."

**DO:**
• Display the closing slide with SC and takeaways listed.
• Run thumbs up/sideways/down for each SC in turn.
• Allow 30 seconds for the Turn & Talk about common mistakes.
• Listen for students mentioning carrying errors, remainder expression, or checking — all indicate metacognitive awareness.
• Close with acknowledgement of effort.

**TEACHER NOTES:**
The closing slide reviews all three SC and uses self-assessment to snapshot confidence levels. Students who self-assess as "thumbs down" on SC1 have a critical gap — they can't even set up the problem. SC2 thumbs-down indicates carrying issues — the most common error. SC3 thumbs-down is acceptable at this point — expressing remainders as fractions and decimals is the most cognitively demanding skill. The Turn & Talk about mistakes they want to avoid is deliberately framed to make error-awareness a positive metacognitive habit rather than a source of shame. The preview of Session 4 (combining all four processes) provides closure and anticipation.

**WATCH FOR:**
• Students who show thumbs-down on SC1 — this is a fundamental gap requiring 1:1 conferencing before next session.
• Students who show thumbs-up on everything — verify against exit ticket data.
• The Turn & Talk: listen for "forgetting to carry" — this indicates SC2 awareness.

[Maths: Summarise — Closing | VTLM 2.0: Monitor Progress & Feedback]`;

// ── Helper: draw a bus stop division diagram on a slide ──────────────────────

function drawBusStop(slide, x, y, divisor, dividendDigits, quotientDigits, carries, opts = {}) {
  const digitW = opts.digitW || 0.52;
  const h = opts.h || 1.6;
  const fontSize = opts.fontSize || 28;
  const smallFontSize = opts.smallFontSize || 12;
  const labelFontSize = opts.labelFontSize || 10;
  const n = dividendDigits.length;
  const totalW = n * digitW + 0.6; // extra space for divisor

  // Divisor
  slide.addText(String(divisor), {
    x: x, y: y + 0.45, w: 0.5, h: 0.6,
    fontSize: fontSize, fontFace: FONT_H, color: C.PRIMARY,
    align: "center", valign: "middle", bold: true, margin: 0,
  });

  // Bus stop line (horizontal top of the dividend)
  slide.addShape("line", {
    x: x + 0.45, y: y + 0.4, w: n * digitW + 0.15, h: 0,
    line: { color: C.CHARCOAL, width: 2.5 },
  });

  // Bus stop line (vertical left side)
  slide.addShape("line", {
    x: x + 0.45, y: y + 0.4, w: 0, h: 0.7,
    line: { color: C.CHARCOAL, width: 2.5 },
  });

  // Dividend digits (inside the bus stop)
  dividendDigits.forEach((d, i) => {
    const dx = x + 0.5 + i * digitW;
    slide.addText(String(d), {
      x: dx, y: y + 0.45, w: digitW, h: 0.6,
      fontSize: fontSize, fontFace: FONT_H, color: C.CHARCOAL,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
  });

  // Quotient digits (on top of the bus stop)
  if (quotientDigits) {
    quotientDigits.forEach((q, i) => {
      if (q == null) return;
      const qx = x + 0.5 + i * digitW;
      const qColor = opts.stepColors ? (opts.stepColors[i] || C.PRIMARY) : C.PRIMARY;
      slide.addText(String(q), {
        x: qx, y: y - 0.15, w: digitW, h: 0.55,
        fontSize: fontSize, fontFace: FONT_H, color: qColor,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
    });
  }

  // Carry digits (small superscript next to the next dividend digit)
  if (carries) {
    carries.forEach((c, i) => {
      if (c == null || c === 0) return;
      const cx = x + 0.5 + (i + 1) * digitW - 0.12;
      slide.addText(String(c), {
        x: cx, y: y + 0.4, w: 0.2, h: 0.25,
        fontSize: smallFontSize, fontFace: FONT_B, color: C.ALERT,
        align: "center", valign: "top", bold: true, margin: 0,
      });
    });
  }

  return { totalW, h, endX: x + totalW };
}

// ── Helper: draw a division step explanation table ────────────────────────────

function drawStepTable(slide, x, y, steps, opts = {}) {
  const rowH = opts.rowH || 0.38;
  const colWidths = opts.colWidths || [1.0, 2.0, 1.5, 0.8];
  const headers = ["Digit", "Division", "Write", "Carry"];
  const totalW = colWidths.reduce((a, b) => a + b, 0);

  // Header row
  let cx = x;
  headers.forEach((h, i) => {
    slide.addShape("rect", {
      x: cx, y, w: colWidths[i], h: rowH,
      fill: { color: C.PRIMARY }, line: { color: C.WHITE, width: 1 },
    });
    slide.addText(h, {
      x: cx, y, w: colWidths[i], h: rowH,
      fontSize: 9, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    cx += colWidths[i];
  });

  // Data rows
  steps.forEach((row, ri) => {
    cx = x;
    const ry = y + rowH + ri * rowH;
    const stepColor = opts.stepColors ? (opts.stepColors[ri] || C.CHARCOAL) : C.CHARCOAL;
    row.forEach((cell, ci) => {
      slide.addShape("rect", {
        x: cx, y: ry, w: colWidths[ci], h: rowH,
        fill: { color: C.WHITE }, line: { color: C.MUTED, width: 0.5 },
      });
      if (cell) {
        slide.addText(cell, {
          x: cx, y: ry, w: colWidths[ci], h: rowH,
          fontSize: 9, fontFace: FONT_B, color: ci === 3 ? C.ALERT : stepColor,
          align: "center", valign: "middle", margin: 0,
          bold: ci === 2 || ci === 3,
        });
      }
      cx += colWidths[ci];
    });
  });

  return y + rowH + steps.length * rowH;
}

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "Short Division — Session 3";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────
  titleSlide(
    pres,
    "Short Division",
    "Four Processes Review — Session 3",
    "Session 3 of 4 | Year 5/6 Maths",
    NOTES_TITLE
  );

  // ── SLIDE 2: Daily Review 1 — Combining Multiples ──────────────────────
  contentSlide(pres, "Daily Review", C.ACCENT,
    "Combining Multiples — The Distributive Law", [
      "All multiples can be formed by combining or regrouping.",
      "Multiples of 7 = multiples of 2 + matching multiples of 5.",
      "Example: 3 x 7 = 3 x 2 + 3 x 5 = 6 + 15 = 21",
      "Your turn: Work out 6 x 7 using the same method.",
    ], NOTES_DR1, FOOTER, (s) => {
      // I CAN statement
      addCard(s, 0.5, CONTENT_TOP + 1.8, 5.0, 0.55, { strip: C.ACCENT });
      s.addText("I can demonstrate that all multiples can be formed by combining or regrouping", {
        x: 0.7, y: CONTENT_TOP + 1.85, w: 4.6, h: 0.45,
        fontSize: 9, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0, valign: "middle",
      });

      // Right side — visual breakdown
      addCard(s, 5.8, CONTENT_TOP + 0.05, 3.8, 3.5, { strip: C.SECONDARY });
      s.addText("Splitting 7 = 2 + 5", {
        x: 6.0, y: CONTENT_TOP + 0.12, w: 3.4, h: 0.3,
        fontSize: 12, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
      });

      // Worked example: 3 x 7
      s.addText([
        { text: "3 x 7", options: { bold: true, fontSize: 16, color: C.PRIMARY, breakLine: true } },
        { text: "= 3 x 2  +  3 x 5", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
        { text: "=    6    +    15", options: { fontSize: 14, color: C.CHARCOAL, breakLine: true } },
        { text: "=         21", options: { fontSize: 16, color: C.SUCCESS, bold: true } },
      ], {
        x: 6.1, y: CONTENT_TOP + 0.5, w: 3.3, h: 1.4,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Student task: 6 x 7
      addTextOnShape(s, "Your turn: 6 x 7 = ?", {
        x: 6.0, y: CONTENT_TOP + 2.1, w: 3.4, h: 0.4, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, {
        fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      s.addText([
        { text: "6 x 2 = 12", options: { fontSize: 13, color: C.MUTED, breakLine: true } },
        { text: "6 x 5 = 30", options: { fontSize: 13, color: C.MUTED, breakLine: true } },
        { text: "12 + 30 = 42", options: { fontSize: 14, color: C.SUCCESS, bold: true } },
      ], {
        x: 6.1, y: CONTENT_TOP + 2.6, w: 3.3, h: 0.85,
        fontFace: FONT_B, margin: 0, valign: "top",
      });
    }
  );

  // ── SLIDE 3: Daily Review 2 — Divisibility Tests ──────────────────────
  contentSlide(pres, "Daily Review", C.ACCENT,
    "Divisibility Tests — Quick Checks", [
      "Q1: Is 45,678 divisible by 9?",
      "Rule: Add ALL digits. If the sum is divisible by 9, the number is too.",
      "Q2: Is 12,345 divisible by 3?",
      "Rule: Add ALL digits. If the sum is divisible by 3, the number is too.",
    ], NOTES_DR2, FOOTER, (s) => {
      // I CAN statement
      addCard(s, 0.5, CONTENT_TOP + 1.85, 5.0, 0.5, { strip: C.ACCENT });
      s.addText("I can use divisibility tests to determine if larger numbers are multiples of one-digit numbers", {
        x: 0.7, y: CONTENT_TOP + 1.9, w: 4.6, h: 0.4,
        fontSize: 9, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0, valign: "middle",
      });

      // Right side — worked solutions
      addCard(s, 5.8, CONTENT_TOP + 0.05, 3.8, 3.5, { strip: C.SECONDARY });
      s.addText("Working", {
        x: 6.0, y: CONTENT_TOP + 0.12, w: 3.4, h: 0.28,
        fontSize: 12, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
      });

      // Q1 solution
      s.addText([
        { text: "Q1: 45,678", options: { bold: true, fontSize: 11, color: C.PRIMARY, breakLine: true } },
        { text: "4 + 5 + 6 + 7 + 8 = 30", options: { fontSize: 11, color: C.CHARCOAL, breakLine: true } },
        { text: "30 / 9 = 3 r 3", options: { fontSize: 11, color: C.CHARCOAL, breakLine: true } },
        { text: "NO — not divisible by 9", options: { fontSize: 11, color: C.ALERT, bold: true } },
      ], {
        x: 6.1, y: CONTENT_TOP + 0.48, w: 3.3, h: 1.2,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Q2 solution
      s.addText([
        { text: "Q2: 12,345", options: { bold: true, fontSize: 11, color: C.PRIMARY, breakLine: true } },
        { text: "1 + 2 + 3 + 4 + 5 = 15", options: { fontSize: 11, color: C.CHARCOAL, breakLine: true } },
        { text: "15 / 3 = 5 exactly", options: { fontSize: 11, color: C.CHARCOAL, breakLine: true } },
        { text: "YES — divisible by 3!", options: { fontSize: 11, color: C.SUCCESS, bold: true } },
      ], {
        x: 6.1, y: CONTENT_TOP + 1.8, w: 3.3, h: 1.2,
        fontFace: FONT_B, margin: 0, valign: "top",
      });
    }
  );

  // ── SLIDE 4: Fluency — Division Facts Rapid Fire ──────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Division Facts Sprint — 60 Seconds", { color: C.ACCENT });

    // Grid of division problems (4 cols x 3 rows)
    const problems = [
      "48 / 6 =", "56 / 8 =", "63 / 7 =", "81 / 9 =",
      "54 / 9 =", "42 / 7 =", "72 / 8 =", "36 / 6 =",
      "49 / 7 =", "64 / 8 =", "54 / 6 =", "63 / 9 =",
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
    ["We are learning to use the short division algorithm to divide multi-digit numbers accurately so we can solve division problems fluently."],
    [
      "I can set out a short division problem correctly using the bus stop layout.",
      "I can carry out short division including carrying remainders between place value columns.",
      "I can interpret the remainder of a division problem and express it as a whole number remainder, a fraction, or a decimal.",
    ],
    NOTES_LISC, FOOTER);

  // ── SLIDE 6: I Do — Worked Example 1: 846 / 2 (no carrying) ──────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example 1: Short Division (No Carrying)", { fontSize: 20, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "846 / 2", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 2.5, h: 0.45, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    // Bus stop diagram (left side)
    drawBusStop(s, 0.8, CONTENT_TOP + 0.6, 2, [8, 4, 6], [4, 2, 3], [null, null, null], {
      stepColors: [C.ACCENT, C.SECONDARY, C.SUCCESS],
    });

    // Step-by-step explanation (right side)
    addCard(s, 4.8, CONTENT_TOP + 0.05, 4.8, 3.6, { strip: C.PRIMARY });
    s.addText("Step-by-Step", {
      x: 5.0, y: CONTENT_TOP + 0.12, w: 4.4, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });

    const steps = [
      { step: "1. Layout", desc: "Divisor (2) outside. Dividend (846) inside. Answer on top." },
      { step: "2. First digit", desc: "8 / 2 = 4. Write 4 on top. No remainder." },
      { step: "3. Second digit", desc: "4 / 2 = 2. Write 2 on top. No remainder." },
      { step: "4. Third digit", desc: "6 / 2 = 3. Write 3 on top. No remainder." },
      { step: "Answer", desc: "423" },
      { step: "Check", desc: "423 x 2 = 846" },
    ];
    const stepTextArr = [];
    steps.forEach((st, i) => {
      stepTextArr.push({ text: st.step, options: { bold: true, fontSize: 11, color: C.PRIMARY, breakLine: true } });
      stepTextArr.push({ text: st.desc, options: { fontSize: 10, color: C.CHARCOAL, breakLine: i < steps.length - 1 } });
    });
    s.addText(stepTextArr, {
      x: 5.1, y: CONTENT_TOP + 0.48, w: 4.3, h: 3.0,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Summary bar
    addTextOnShape(s, "846 / 2 = 423   (no carrying needed — every digit divides evenly)", {
      x: 0.5, y: SAFE_BOTTOM - 0.55, w: 9, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, {
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_WE1);
  })();

  // ── SLIDE 7: I Do — Worked Example 2: 7,458 / 6 (with carrying) ──────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example 2: Short Division (With Carrying)", { fontSize: 19, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "7,458 / 6", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 2.5, h: 0.45, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    // Bus stop diagram with carries
    drawBusStop(s, 0.6, CONTENT_TOP + 0.55, 6, [7, 4, 5, 8], [1, 2, 4, 3], [1, 2, 1, null], {
      stepColors: [C.ACCENT, C.SECONDARY, C.ALERT, C.SUCCESS],
    });

    // Step table (right side)
    addCard(s, 4.5, CONTENT_TOP + 0.05, 5.1, 3.5, { strip: C.PRIMARY });
    s.addText("Carrying Remainders", {
      x: 4.7, y: CONTENT_TOP + 0.12, w: 4.7, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });

    drawStepTable(s, 4.7, CONTENT_TOP + 0.48, [
      ["7", "7 / 6 = 1 r 1", "1", "1"],
      ["14", "14 / 6 = 2 r 2", "2", "2"],
      ["25", "25 / 6 = 4 r 1", "4", "1"],
      ["18", "18 / 6 = 3", "3", "---"],
    ], {
      colWidths: [0.6, 1.8, 0.6, 0.6],
      stepColors: [C.ACCENT, C.SECONDARY, C.ALERT, C.SUCCESS],
    });

    // Key insight callout
    addCard(s, 4.7, CONTENT_TOP + 2.6, 4.9, 0.8, { strip: C.ALERT });
    s.addText([
      { text: "KEY: ", options: { bold: true, fontSize: 11, color: C.ALERT } },
      { text: "After 7 / 6 = 1 r 1, carry the 1 to make the next digit 14, NOT 4. The carried remainder joins the next digit!", options: { fontSize: 10, color: C.CHARCOAL } },
    ], {
      x: 4.9, y: CONTENT_TOP + 2.68, w: 4.5, h: 0.65,
      fontFace: FONT_B, margin: 0, valign: "middle",
    });

    // Summary bar
    addTextOnShape(s, "7,458 / 6 = 1,243   Check: 1,243 x 6 = 7,458", {
      x: 0.5, y: SAFE_BOTTOM - 0.55, w: 9, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, {
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_WE2);
  })();

  // ── SLIDES 8-9: CFU — Whiteboards: 5,376 / 4 (withReveal) ────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "CFU", { color: C.ALERT });
      addTitle(s, "Quick Check: Show Me Boards", { color: C.ALERT });

      // Technique pill
      s.addShape("roundRect", {
        x: 0.5, y: CONTENT_TOP, w: 2.8, h: 0.40, rectRadius: 0.08,
        fill: { color: C.ALERT },
      });
      s.addText("Show Me Boards + Cold Call", {
        x: 0.5, y: CONTENT_TOP, w: 2.8, h: 0.40,
        fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });

      // Large problem display
      addCard(s, 0.5, CONTENT_TOP + 0.6, 9, 2.8, { strip: C.ALERT });
      s.addText("5,376 / 4 = ?", {
        x: 1.0, y: CONTENT_TOP + 1.0, w: 8.0, h: 1.2,
        fontSize: 48, fontFace: FONT_H, color: C.CHARCOAL,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      s.addText([
        { text: "Use the bus stop method. Show ALL carrying.", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL } },
        { text: "45 seconds — then boards up!", options: { fontSize: 14, color: C.ALERT, bold: true } },
      ], {
        x: 1.0, y: CONTENT_TOP + 2.4, w: 8.0, h: 0.7,
        fontFace: FONT_B, margin: 0, align: "center",
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_CFU1);
      return s;
    },
    (slide) => {
      // Reveal: worked solution
      addCard(slide, 1.5, CONTENT_TOP + 0.6, 7, 2.8, { strip: C.SUCCESS });

      // Bus stop solution
      drawBusStop(slide, 2.0, CONTENT_TOP + 0.8, 4, [5, 3, 7, 6], [1, 3, 4, 4], [1, 1, 1, null], {
        stepColors: [C.ACCENT, C.SECONDARY, C.ALERT, C.SUCCESS],
        fontSize: 24,
        smallFontSize: 11,
      });

      // Step breakdown
      slide.addText([
        { text: "5 / 4 = 1 r 1", options: { fontSize: 11, color: C.ACCENT, bold: true, breakLine: true } },
        { text: "13 / 4 = 3 r 1", options: { fontSize: 11, color: C.SECONDARY, bold: true, breakLine: true } },
        { text: "17 / 4 = 4 r 1", options: { fontSize: 11, color: C.ALERT, bold: true, breakLine: true } },
        { text: "16 / 4 = 4", options: { fontSize: 11, color: C.SUCCESS, bold: true } },
      ], {
        x: 5.2, y: CONTENT_TOP + 0.9, w: 3.0, h: 1.6,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addTextOnShape(slide, "Answer: 1,344", {
        x: 5.2, y: CONTENT_TOP + 2.6, w: 2.8, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── SLIDES 10-11: We Do — Problem Pair 1: 8,694 / 3 (withReveal) ──────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Problem Pair 1: 8,694 / 3", { fontSize: 22, color: C.SECONDARY });

      // Instruction
      addTextOnShape(s, "Use the bus stop method on your whiteboards", {
        x: 0.5, y: CONTENT_TOP - 0.05, w: 5.0, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_DARK },
      }, {
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      // Large problem display
      addCard(s, 0.5, CONTENT_TOP + 0.55, 9, 2.6, { strip: C.SECONDARY });
      s.addText("8,694 / 3 = ?", {
        x: 1.0, y: CONTENT_TOP + 0.9, w: 8.0, h: 1.2,
        fontSize: 52, fontFace: FONT_H, color: C.CHARCOAL,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      s.addText([
        { text: "Show all your working. Carry any remainders.", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL } },
        { text: "45 seconds — then boards up!", options: { fontSize: 14, color: C.ALERT, bold: true } },
      ], {
        x: 1.0, y: CONTENT_TOP + 2.3, w: 8.0, h: 0.6,
        fontFace: FONT_B, margin: 0, align: "center",
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (slide) => {
      // Reveal: worked solution
      addCard(slide, 0.5, CONTENT_TOP + 0.55, 4.6, 2.6, { strip: C.SUCCESS });

      // Bus stop
      drawBusStop(slide, 0.7, CONTENT_TOP + 0.75, 3, [8, 6, 9, 4], [2, 8, 9, 8], [2, 2, 2, null], {
        stepColors: [C.ACCENT, C.SECONDARY, C.ALERT, C.SUCCESS],
        fontSize: 22,
        smallFontSize: 10,
      });

      // Step breakdown on right
      addCard(slide, 5.1, CONTENT_TOP + 0.55, 4.4, 2.6, { strip: C.SUCCESS });
      slide.addText("Solution", {
        x: 5.3, y: CONTENT_TOP + 0.62, w: 4.0, h: 0.25,
        fontSize: 12, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      slide.addText([
        { text: "8 / 3 = 2 r 2  (carry 2)", options: { fontSize: 11, color: C.ACCENT, bold: true, breakLine: true } },
        { text: "26 / 3 = 8 r 2  (carry 2)", options: { fontSize: 11, color: C.SECONDARY, bold: true, breakLine: true } },
        { text: "29 / 3 = 9 r 2  (carry 2)", options: { fontSize: 11, color: C.ALERT, bold: true, breakLine: true } },
        { text: "24 / 3 = 8  (no remainder)", options: { fontSize: 11, color: C.SUCCESS, bold: true, breakLine: true } },
        { text: "", options: { breakLine: true, fontSize: 6 } },
        { text: "Answer: 2,898", options: { fontSize: 16, color: C.SUCCESS, bold: true, breakLine: true } },
        { text: "Check: 2,898 x 3 = 8,694", options: { fontSize: 11, color: C.MUTED } },
      ], {
        x: 5.4, y: CONTENT_TOP + 0.95, w: 3.9, h: 2.0,
        fontFace: FONT_B, margin: 0, valign: "top",
      });
    }
  );

  // ── SLIDES 12-13: We Do — Problem Pair 2: 4,537 / 8 (with remainder) (withReveal) ──
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Problem Pair 2: 4,537 / 8 (Remainder!)", { fontSize: 20, color: C.SECONDARY });

      // Instruction
      addTextOnShape(s, "Solve — then express the remainder THREE ways", {
        x: 0.5, y: CONTENT_TOP - 0.05, w: 5.5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_DARK },
      }, {
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      // Large problem display
      addCard(s, 0.5, CONTENT_TOP + 0.55, 9, 2.0, { strip: C.SECONDARY });
      s.addText("4,537 / 8 = ?", {
        x: 1.0, y: CONTENT_TOP + 0.7, w: 8.0, h: 1.0,
        fontSize: 48, fontFace: FONT_H, color: C.CHARCOAL,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      s.addText("Express your answer as: r __ , a fraction, and a decimal", {
        x: 1.0, y: CONTENT_TOP + 1.8, w: 8.0, h: 0.4,
        fontSize: 13, fontFace: FONT_B, color: C.ALERT, bold: true,
        align: "center", margin: 0,
      });

      // Hint cards for remainder expression
      const forms = [
        { label: "r __", desc: "Whole number remainder", color: C.PRIMARY },
        { label: "__/__", desc: "Remainder as fraction", color: C.SECONDARY },
        { label: "__.___", desc: "Remainder as decimal", color: C.ACCENT },
      ];
      forms.forEach((f, i) => {
        const fx = 0.7 + i * 3.1;
        addCard(s, fx, CONTENT_TOP + 2.75, 2.8, 0.75, { strip: f.color });
        s.addText(f.label, {
          x: fx + 0.15, y: CONTENT_TOP + 2.8, w: 1.0, h: 0.35,
          fontSize: 16, fontFace: FONT_H, color: f.color, bold: true, margin: 0,
        });
        s.addText(f.desc, {
          x: fx + 1.1, y: CONTENT_TOP + 2.82, w: 1.5, h: 0.3,
          fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0, valign: "middle",
        });
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO2);
      return s;
    },
    (slide) => {
      // Reveal: worked solution
      addCard(slide, 0.5, CONTENT_TOP + 0.55, 4.5, 2.0, { strip: C.SUCCESS });

      // Bus stop with solution
      drawBusStop(slide, 0.7, CONTENT_TOP + 0.65, 8, [4, 5, 3, 7], [0, 5, 6, 7], [4, 5, 5, null], {
        stepColors: [C.ACCENT, C.SECONDARY, C.ALERT, C.SUCCESS],
        fontSize: 20,
        smallFontSize: 10,
      });

      // Steps
      slide.addText([
        { text: "4 / 8 = 0 r 4  (carry 4)", options: { fontSize: 10, color: C.ACCENT, bold: true, breakLine: true } },
        { text: "45 / 8 = 5 r 5  (carry 5)", options: { fontSize: 10, color: C.SECONDARY, bold: true, breakLine: true } },
        { text: "53 / 8 = 6 r 5  (carry 5)", options: { fontSize: 10, color: C.ALERT, bold: true, breakLine: true } },
        { text: "57 / 8 = 7 r 1", options: { fontSize: 10, color: C.SUCCESS, bold: true } },
      ], {
        x: 0.7, y: CONTENT_TOP + 1.8, w: 4.1, h: 0.7,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Three remainder forms (right side)
      addCard(slide, 5.2, CONTENT_TOP + 0.55, 4.3, 2.0, { strip: C.SUCCESS });
      slide.addText("Three Ways to Express the Remainder", {
        x: 5.4, y: CONTENT_TOP + 0.62, w: 3.9, h: 0.25,
        fontSize: 11, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      const remForms = [
        { label: "567 r 1", desc: "Whole number remainder", color: C.PRIMARY },
        { label: "567 1/8", desc: "Remainder / Divisor = 1/8", color: C.SECONDARY },
        { label: "567.125", desc: "1 / 8 = 0.125", color: C.ACCENT },
      ];
      remForms.forEach((rf, i) => {
        const ry = CONTENT_TOP + 1.0 + i * 0.48;
        addTextOnShape(slide, rf.label, {
          x: 5.4, y: ry, w: 1.8, h: 0.38, rectRadius: 0.08,
          fill: { color: rf.color },
        }, {
          fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
        });
        slide.addText(rf.desc, {
          x: 7.4, y: ry, w: 2.0, h: 0.38,
          fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
        });
      });

      // Key reminder
      addCard(slide, 0.5, CONTENT_TOP + 2.75, 9, 0.75, { strip: C.ALERT });
      slide.addText([
        { text: "REMEMBER: ", options: { bold: true, fontSize: 11, color: C.ALERT } },
        { text: "The fraction is remainder / DIVISOR (1/8), NOT remainder / dividend (1/4537). The remainder is what's left to divide BY the divisor.", options: { fontSize: 10, color: C.CHARCOAL } },
      ], {
        x: 0.7, y: CONTENT_TOP + 2.82, w: 8.6, h: 0.6,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    }
  );

  // ── SLIDES 14-15: CFU Hinge Question: 456 / 7 (withReveal) ────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "Hinge Question", { color: C.ALERT, w: 2.2 });
      addTitle(s, "Which Shows the Correct Working?", { color: C.ALERT });

      // Problem statement
      addTextOnShape(s, "456 / 7", {
        x: 0.5, y: CONTENT_TOP - 0.05, w: 2.0, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_DARK },
      }, {
        fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Four options in a 2x2 grid
      const options = [
        {
          label: "A",
          lines: [
            "4 / 7 = 0 r 4",
            "45 / 7 = 6 r 3",
            "36 / 7 = 5 r 1",
            "Answer: 65 r 1",
          ],
        },
        {
          label: "B",
          lines: [
            "4 / 7 = 0 r 4",
            "45 / 7 = 6 r 3",
            "36 / 7 = 5 r 1",
            "Answer: 65 1/7",
          ],
        },
        {
          label: "C",
          lines: [
            "4 / 7 = 0 r 4",
            "5 / 7 = 0 r 5",
            "56 / 7 = 8",
            "Answer: 8",
          ],
        },
        {
          label: "D",
          lines: [
            "45 / 7 = 7 r 4",
            "46 / 7 = 6 r 4",
            "Answer: 76 r 4",
          ],
        },
      ];

      options.forEach((opt, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const ox = 0.5 + col * 4.7;
        const oy = CONTENT_TOP + 0.55 + row * 1.75;
        const ow = 4.4;
        const oh = 1.6;

        addCard(s, ox, oy, ow, oh, { strip: C.MUTED });

        // Option label circle
        addTextOnShape(s, opt.label, {
          x: ox + 0.15, y: oy + 0.1, w: 0.4, h: 0.4, rectRadius: 0.2,
          fill: { color: C.ALERT },
        }, {
          fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
        });

        // Working
        const workArr = opt.lines.map((line, li) => ({
          text: line,
          options: {
            fontSize: 11,
            color: li === opt.lines.length - 1 ? C.PRIMARY : C.CHARCOAL,
            bold: li === opt.lines.length - 1,
            breakLine: li < opt.lines.length - 1,
          },
        }));
        s.addText(workArr, {
          x: ox + 0.7, y: oy + 0.08, w: ow - 0.9, h: oh - 0.15,
          fontFace: FONT_B, margin: 0, valign: "middle",
        });
      });

      s.addText("Hold up 1, 2, 3, or 4 fingers for your answer.", {
        x: 0.5, y: SAFE_BOTTOM - 0.35, w: 9, h: 0.3,
        fontSize: 12, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0, align: "center",
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_HINGE);
      return s;
    },
    (slide) => {
      // Reveal: highlight option A as correct, explain errors in others

      // Correct answer banner
      addTextOnShape(slide, "Correct Answer: A  (65 r 1)", {
        x: 2.5, y: CONTENT_TOP - 0.05, w: 5.0, h: 0.42, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Green border on option A
      slide.addShape("roundRect", {
        x: 0.45, y: CONTENT_TOP + 0.50, w: 4.5, h: 1.7, rectRadius: 0.1,
        line: { color: C.SUCCESS, width: 3 },
        fill: { type: "none" },
      });

      // Error explanations card
      addCard(slide, 0.5, SAFE_BOTTOM - 1.1, 9, 1.0, { strip: C.ALERT });
      slide.addText([
        { text: "B: ", options: { bold: true, fontSize: 10, color: C.ALERT } },
        { text: "Same working as A but wrote 1/7 instead of r 1. Both are correct forms! B is also acceptable.", options: { fontSize: 9, color: C.CHARCOAL, breakLine: true } },
        { text: "C: ", options: { bold: true, fontSize: 10, color: C.ALERT } },
        { text: "Forgot to carry r4 from 4/7. Treated 5 and 6 separately instead of making 45 and 36.", options: { fontSize: 9, color: C.CHARCOAL, breakLine: true } },
        { text: "D: ", options: { bold: true, fontSize: 10, color: C.ALERT } },
        { text: "Skipped the first digit entirely. Started at 45 instead of 4. Wrong multiples used (7x7=49, not 45/7=7).", options: { fontSize: 9, color: C.CHARCOAL } },
      ], {
        x: 0.7, y: SAFE_BOTTOM - 1.02, w: 8.6, h: 0.85,
        fontFace: FONT_B, margin: 0, valign: "top",
      });
    }
  );

  // ── SLIDE 16: You Do — Independent Practice ───────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, STAGE_COLORS["4"]);
    addStageBadge(s, 4, "You Do");
    addTitle(s, "Independent Practice: Short Division", { color: STAGE_COLORS["4"] });

    // Instructions card
    addCard(s, 0.5, CONTENT_TOP, 9, 0.65, { strip: STAGE_COLORS["4"] });
    s.addText([
      { text: "Complete all 6 problems using the bus stop method. Show ALL working.", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL, bold: true } },
      { text: "Problems 5-6: Express your remainder as r__, a fraction, and a decimal.", options: { fontSize: 11, color: C.ALERT, bold: true } },
    ], {
      x: 0.7, y: CONTENT_TOP + 0.05, w: 8.6, h: 0.55,
      fontFace: FONT_B, margin: 0, valign: "middle",
    });

    // Problem grid (3 cols x 2 rows)
    const problems = [
      { num: 1, text: "936 / 4", diff: "Basic" },
      { num: 2, text: "5,184 / 3", diff: "Basic" },
      { num: 3, text: "7,296 / 6", diff: "Carrying" },
      { num: 4, text: "3,528 / 7", diff: "Carrying" },
      { num: 5, text: "6,347 / 8", diff: "Remainder" },
      { num: 6, text: "9,521 / 6", diff: "Remainder" },
    ];
    const colW = 2.8, rowH = 1.15;
    const startY = CONTENT_TOP + 0.8;

    problems.forEach((p, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const px = 0.5 + col * (colW + 0.2);
      const py = startY + row * (rowH + 0.15);

      const diffColor = p.diff === "Basic" ? C.SUCCESS : (p.diff === "Carrying" ? C.SECONDARY : C.ALERT);
      addCard(s, px, py, colW, rowH, { strip: diffColor });

      // Problem number circle
      addTextOnShape(s, String(p.num), {
        x: px + 0.1, y: py + 0.08, w: 0.35, h: 0.35, rectRadius: 0.17,
        fill: { color: diffColor },
      }, {
        fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Problem text
      s.addText(p.text, {
        x: px + 0.55, y: py + 0.05, w: colW - 0.7, h: 0.45,
        fontSize: 18, fontFace: FONT_H, color: C.CHARCOAL, bold: true, margin: 0, valign: "middle",
      });

      // Difficulty label
      s.addText(p.diff, {
        x: px + 0.55, y: py + 0.55, w: colW - 0.7, h: 0.25,
        fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });

      // Remainder instruction for 5-6
      if (p.diff === "Remainder") {
        s.addText("Express as r__, fraction, decimal", {
          x: px + 0.15, y: py + 0.8, w: colW - 0.3, h: 0.25,
          fontSize: 8, fontFace: FONT_B, color: C.ALERT, italic: true, margin: 0,
        });
      }
    });

    // Timer
    addTextOnShape(s, "10 minutes", {
      x: 4.0, y: SAFE_BOTTOM - 0.45, w: 2, h: 0.38, rectRadius: 0.08,
      fill: { color: STAGE_COLORS["4"] },
    }, {
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_YOUDO);
  })();

  // ── SLIDE 17: Exit Ticket ─────────────────────────────────────────────
  exitTicketSlide(pres, [
    "Solve: 9,636 / 4. Show all working using the bus stop method.",
    "Solve: 3,527 / 6. Express your remainder as: (a) r__, (b) a fraction, (c) a decimal.",
    "Error Analysis: A student solved 2,538 / 7 and got 362 r 4. The correct answer is 362 r 4. Check their working: is 362 x 7 + 4 = 2,538? If not, find and fix the error.",
  ], NOTES_EXIT, FOOTER);

  // ── SLIDE 18: Resources Slide ──────────────────────────────────────────
  addResourceSlide(pres, [
    {
      name: "SR1 — Short Division Practice",
      fileName: "SR1_Short_Division_Practice.pdf",
      description: "8 problems (4 clean, 4 with remainders) with bus stop gridlines. One per student.",
    },
    {
      name: "SR2 — Short Division Answers",
      fileName: "SR2_Short_Division_Answers.pdf",
      description: "Answer key with all 3 remainder forms. Teacher reference only.",
    },
    {
      name: "EXT1 — Division Investigation: Repeating Decimals",
      fileName: "EXT1_Division_Investigation.pdf",
      description: "Investigate which divisors create repeating decimals. Extending students.",
    },
  ], { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // ── SLIDE 19: Closing ─────────────────────────────────────────────────
  closingSlide(pres,
    "What is the ONE mistake you want to make sure you NEVER make in short division? Turn to your partner — 30 seconds.",
    [
      "SC1: I can set out a short division problem correctly using the bus stop layout.",
      "SC2: I can carry out short division including carrying remainders between columns.",
      "SC3: I can interpret the remainder and express it as r__, a fraction, or a decimal.",
      "Tomorrow: Session 4 — putting all four processes together.",
    ],
    NOTES_CLOSING);

  // ── Write PPTX ──────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = `${OUT_DIR}/4Proc_Lesson3_Short_Division.pptx`;
  await pres.writeFile({ fileName: outPath });
  console.log("PPTX written to " + outPath);

  // ── Generate companion PDFs ────────────────────────────────────────────
  await generateWorksheet();
  await generateAnswerKey();
  await generateExtendingPdf();
  console.log("All PDFs generated.");
}

// ── PDF: SR1 — Short Division Practice ──────────────────────────────────────

async function generateWorksheet() {
  const doc = createPdf({ title: "Short Division Practice" });

  let y = addPdfHeader(doc, "Short Division Practice", {
    subtitle: "SR1 — Supporting Resource",
    color: C.PRIMARY,
    lessonInfo: "Session 3 of 4 | Four Processes Review | Year 5/6 Maths",
  });

  y = addTipBox(doc, "Use the bus stop method for every problem. Show your working clearly: divisor on the left, dividend inside, answer on top. Write carried remainders as small digits next to the next number.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Section A: Clean Division (No Final Remainder)", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Solve each problem using short division. Check your answer by multiplying back.", y);

  // Problem 1
  y = addProblem(doc, 1, "936 / 4", y, {
    writeLines: [
      { label: "Bus stop working:" },
      { label: "Answer:" },
      { label: "Check (answer x divisor):" },
    ],
    color: C.PRIMARY,
  });

  // Problem 2
  y = addProblem(doc, 2, "5,184 / 3", y, {
    writeLines: [
      { label: "Bus stop working:" },
      { label: "Answer:" },
      { label: "Check:" },
    ],
    color: C.PRIMARY,
  });

  // Problem 3
  y = addProblem(doc, 3, "7,296 / 6", y, {
    writeLines: [
      { label: "Bus stop working:" },
      { label: "Answer:" },
      { label: "Check:" },
    ],
    color: C.PRIMARY,
  });

  // Problem 4
  y = addProblem(doc, 4, "8,505 / 5", y, {
    writeLines: [
      { label: "Bus stop working:" },
      { label: "Answer:" },
      { label: "Check:" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Section B: Division with Remainders", y, { color: C.ACCENT });
  y = addBodyText(doc, "Solve each problem. Express the remainder in ALL THREE forms: r __, as a fraction, and as a decimal.", y);

  // Problem 5
  y = addProblem(doc, 5, "3,528 / 7", y, {
    writeLines: [
      { label: "Bus stop working:" },
      { label: "Answer (r __):" },
      { label: "Answer (fraction):" },
      { label: "Answer (decimal):" },
    ],
    color: C.ACCENT,
  });

  // Problem 6
  y = addProblem(doc, 6, "6,347 / 8", y, {
    writeLines: [
      { label: "Bus stop working:" },
      { label: "Answer (r __):" },
      { label: "Answer (fraction):" },
      { label: "Answer (decimal):" },
    ],
    color: C.ACCENT,
  });

  // Problem 7
  y = addProblem(doc, 7, "9,521 / 6", y, {
    writeLines: [
      { label: "Bus stop working:" },
      { label: "Answer (r __):" },
      { label: "Answer (fraction):" },
      { label: "Answer (decimal):" },
    ],
    color: C.ACCENT,
  });

  // Problem 8
  y = addProblem(doc, 8, "4,259 / 9", y, {
    writeLines: [
      { label: "Bus stop working:" },
      { label: "Answer (r __):" },
      { label: "Answer (fraction):" },
      { label: "Answer (decimal):" },
    ],
    color: C.ACCENT,
  });

  addPdfFooter(doc, "Session 3 of 4 | Four Processes Review | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR1_Short_Division_Practice.pdf");
  console.log("  SR1 worksheet written.");
}

// ── PDF: SR2 — Short Division Answers ───────────────────────────────────────

async function generateAnswerKey() {
  const doc = createPdf({ title: "Short Division Practice — Answer Key" });

  let y = addPdfHeader(doc, "Short Division Practice — Answer Key", {
    subtitle: "SR2 — Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: "Session 3 of 4 | Four Processes Review | Year 5/6 Maths",
    showNameDate: false,
  });

  y = addSectionHeading(doc, "Section A: Clean Division", y, { color: C.PRIMARY });

  y = addProblem(doc, 1, "936 / 4", y, {
    writeLines: [
      { label: "Working:", answer: "9/4=2 r1, 13/4=3 r1, 16/4=4" },
      { label: "Answer:", answer: "234" },
      { label: "Check:", answer: "234 x 4 = 936" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "5,184 / 3", y, {
    writeLines: [
      { label: "Working:", answer: "5/3=1 r2, 21/3=7, 8/3=2 r2, 24/3=8" },
      { label: "Answer:", answer: "1,728" },
      { label: "Check:", answer: "1,728 x 3 = 5,184" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "7,296 / 6", y, {
    writeLines: [
      { label: "Working:", answer: "7/6=1 r1, 12/6=2, 9/6=1 r3, 36/6=6" },
      { label: "Answer:", answer: "1,216" },
      { label: "Check:", answer: "1,216 x 6 = 7,296" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 4, "8,505 / 5", y, {
    writeLines: [
      { label: "Working:", answer: "8/5=1 r3, 35/5=7, 0/5=0, 5/5=1" },
      { label: "Answer:", answer: "1,701" },
      { label: "Check:", answer: "1,701 x 5 = 8,505" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Section B: Division with Remainders", y, { color: C.ACCENT });

  y = addProblem(doc, 5, "3,528 / 7", y, {
    writeLines: [
      { label: "Working:", answer: "3/7=0 r3, 35/7=5, 2/7=0 r2, 28/7=4" },
      { label: "Answer (r __):", answer: "504 (no remainder — divides evenly)" },
      { label: "Answer (fraction):", answer: "504" },
      { label: "Answer (decimal):", answer: "504.0" },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 6, "6,347 / 8", y, {
    writeLines: [
      { label: "Working:", answer: "6/8=0 r6, 63/8=7 r7, 74/8=9 r2, 27/8=3 r3" },
      { label: "Answer (r __):", answer: "793 r 3" },
      { label: "Answer (fraction):", answer: "793 3/8" },
      { label: "Answer (decimal):", answer: "793.375" },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 7, "9,521 / 6", y, {
    writeLines: [
      { label: "Working:", answer: "9/6=1 r3, 35/6=5 r5, 52/6=8 r4, 41/6=6 r5" },
      { label: "Answer (r __):", answer: "1,586 r 5" },
      { label: "Answer (fraction):", answer: "1,586 5/6" },
      { label: "Answer (decimal):", answer: "1,586.833... (repeating)" },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 8, "4,259 / 9", y, {
    writeLines: [
      { label: "Working:", answer: "4/9=0 r4, 42/9=4 r6, 65/9=7 r2, 29/9=3 r2" },
      { label: "Answer (r __):", answer: "473 r 2" },
      { label: "Answer (fraction):", answer: "473 2/9" },
      { label: "Answer (decimal):", answer: "473.222... (repeating)" },
    ],
    color: C.ACCENT,
  });

  y = addSectionHeading(doc, "Exit Ticket Answers", y, { color: C.PRIMARY });

  y = addProblem(doc, "Q1", "9,636 / 4", y, {
    writeLines: [
      { label: "Working:", answer: "9/4=2 r1, 16/4=4, 3/4=0 r3, 36/4=9" },
      { label: "Answer:", answer: "2,409" },
      { label: "Note:", answer: "The 0 in the tens column is critical — 03/4=0 r3, don't skip it!" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, "Q2", "3,527 / 6", y, {
    writeLines: [
      { label: "Working:", answer: "3/6=0 r3, 35/6=5 r5, 52/6=8 r4, 47/6=7 r5" },
      { label: "Answer (r __):", answer: "587 r 5" },
      { label: "Answer (fraction):", answer: "587 5/6" },
      { label: "Answer (decimal):", answer: "587.833... (repeating)" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, "Q3", "Error Analysis: 2,538 / 7", y, {
    writeLines: [
      { label: "Check:", answer: "362 x 7 = 2,534. Then 2,534 + 4 = 2,538. The answer IS correct." },
      { label: "Note:", answer: "Working: 2/7=0 r2, 25/7=3 r4, 43/7=6 r1, 18/7=2 r4. Answer: 362 r 4." },
    ],
    color: C.PRIMARY,
  });

  addPdfFooter(doc, "Teacher Reference — Do Not Distribute to Students");
  await writePdf(doc, OUT_DIR + "/SR2_Short_Division_Answers.pdf");
  console.log("  SR2 answer key written.");
}

// ── PDF: EXT1 — Division Investigation: Repeating Decimals ──────────────────

async function generateExtendingPdf() {
  const doc = createPdf({ title: "Repeating Decimals Investigation" });

  let y = addPdfHeader(doc, "Division Investigation: Repeating Decimals", {
    subtitle: "EXT1 — Extending Challenge",
    color: C.ACCENT,
    lessonInfo: "Session 3 of 4 | Four Processes Review | Year 5/6 Maths",
  });

  y = addSectionHeading(doc, "The Big Question", y, { color: C.ACCENT });
  y = addBodyText(doc, "When you divide one whole number by another, you sometimes get a remainder. If you continue the division using decimals, something interesting happens — some divisions terminate (end) and some REPEAT forever!", y);
  y = addBodyText(doc, "Your investigation: Which single-digit divisors (2, 3, 4, 5, 6, 7, 8, 9) create repeating decimals, and which create terminating decimals?", y);

  y = addSectionHeading(doc, "Worked Example: 1 / 3", y, { color: C.ACCENT });
  y = addBodyText(doc, "To convert 1/3 to a decimal, we continue dividing:", y);
  y = addStepInstructions(doc, [
    "1.000... / 3: 10 / 3 = 3 r 1",
    "Bring down 0: 10 / 3 = 3 r 1",
    "Bring down 0: 10 / 3 = 3 r 1 (same pattern!)",
    "Result: 0.333333... = 0.3 recurring (the 3 repeats forever)",
  ], y, { color: C.ACCENT });

  y = addTipBox(doc, "A recurring decimal is shown with a dot above the repeating digit(s). For example: 0.3 recurring means 0.333333... and 0.142857 recurring means 0.142857142857...", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Your Investigation", y, { color: C.PRIMARY });
  y = addBodyText(doc, "For each divisor below, calculate 1 divided by the number. Continue the decimal division until the decimal either terminates or you spot the repeating pattern.", y);

  // Investigation table
  const divisors = [
    { div: "2", hint: "1 / 2 = ?" },
    { div: "3", hint: "1 / 3 = ?" },
    { div: "4", hint: "1 / 4 = ?" },
    { div: "5", hint: "1 / 5 = ?" },
    { div: "6", hint: "1 / 6 = ?" },
    { div: "7", hint: "1 / 7 = ?" },
    { div: "8", hint: "1 / 8 = ?" },
    { div: "9", hint: "1 / 9 = ?" },
  ];

  divisors.forEach((d, i) => {
    y = addProblem(doc, i + 1, d.hint, y, {
      writeLines: [
        { label: "Decimal result:" },
        { label: "Terminates or repeats?" },
        { label: "If repeating, which digits repeat?" },
      ],
      color: C.PRIMARY,
    });
  });

  y = addSectionHeading(doc, "Analysis", y, { color: C.ACCENT });

  y = addProblem(doc, 9, "Sort the divisors into two groups: those that give terminating decimals and those that give repeating decimals.", y, {
    writeLines: [
      { label: "Terminating:" },
      { label: "Repeating:" },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 10, "Look at the divisors that give terminating decimals. What do they have in common? (Hint: think about their factors.)", y, {
    writeLines: [
      { label: "I notice:" },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 11, "Challenge: 1/7 = 0.142857142857... The repeating block has 6 digits. Can you predict what 2/7, 3/7, 4/7, 5/7, and 6/7 will be? (Hint: they use the SAME digits in a different starting position!)", y, {
    writeLines: [
      { label: "2/7 =" },
      { label: "3/7 =" },
      { label: "4/7 =" },
      { label: "5/7 =" },
      { label: "6/7 =" },
    ],
    color: C.ACCENT,
  });

  y = addTipBox(doc, "Key insight: A fraction gives a terminating decimal when the denominator's only prime factors are 2 and/or 5. If the denominator has ANY other prime factor (3, 7, 11...), the decimal repeats. This is because our number system is base 10 = 2 x 5.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Extension: Cyclic Numbers", y, { color: C.PRIMARY });
  y = addBodyText(doc, "The number 142857 is called a 'cyclic number.' Multiply it by 1, 2, 3, 4, 5, and 6. What do you notice about the results? Can you explain the connection to 1/7?", y);
  y = addLinedArea(doc, y + 5, 5);

  addPdfFooter(doc, "Session 3 of 4 | Four Processes Review | Year 5/6 Maths — Extending Investigation");
  await writePdf(doc, OUT_DIR + "/EXT1_Division_Investigation.pdf");
  console.log("  EXT1 extending investigation written.");
}

// ── Main ──────────────────────────────────────────────────────────────────────

build().catch(console.error);
