// Lesson 5 of 5: Square & Triangular Numbers
// Year 5/6 Numeracy — Factors & Multiples
// VC2M6N02 (identify and describe properties of square and triangular numbers)
// Week 1, Session 5

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

const OUT_DIR = "output/FM_Lesson5_Square_Triangular";
const FOOTER = "Session 5 of 5 | Factors & Multiples | Year 5/6 Maths";

// ── Teacher notes ─────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
\u2022 "This is our final session in the Factors & Multiples unit. We've explored factor pairs, multiples and divisibility, primes and composites, LCM and HCF. Today we discover two special families of numbers: square numbers and triangular numbers."
\u2022 "These numbers have beautiful visual patterns that connect directly to the factor work we've been doing all week."

**DO:**
\u2022 Display the title slide as students settle. Ensure mini-whiteboards and markers are on every desk.
\u2022 Direct attention: "This is Session 5 of 5 \u2014 our unit finale."

**TEACHER NOTES:**
Lesson 5 brings the unit full circle. Square numbers connect to factor pairs (Lesson 1) \u2014 a square number has a factor pair where both numbers are the same (e.g., 36 = 6\u00d76). Triangular numbers connect to addition patterns and sequences. The lesson also revisits prime/composite classification (Lesson 3): every square number greater than 1 is composite, which students will discover in We Do 2. This session consolidates all five lessons into a coherent number theory foundation.

**WATCH FOR:**
\u2022 Students who are unsettled or disengaged \u2014 it's the last session of the week.
\u2022 Readiness signal: students settling quickly with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR = `**SAY:**
\u2022 "Quick warm-up to review our whole unit. Four questions \u2014 one from each previous session. Show me boards after each."
\u2022 "Question 1: Find all factor pairs of 36. 45 seconds. Go!"
\u2022 After boards: "(1,36), (2,18), (3,12), (4,9), (6,6). Five pairs. Notice that last pair \u2014 (6,6). Keep that in mind for today."
\u2022 "Question 2: Is 456 divisible by 3? Use the digit-sum rule. 15 seconds."
\u2022 After boards: "4+5+6=15, 15\u00f73=5. YES."
\u2022 "Question 3: Is 51 prime or composite? 15 seconds."
\u2022 After boards: "Composite \u2014 51=3\u00d717."
\u2022 "Question 4: Find the HCF of 24 and 36. 30 seconds."
\u2022 After boards: "Factors of 24: 1,2,3,4,6,8,12,24. Factors of 36: 1,2,3,4,6,9,12,18,36. HCF=12."

**DO:**
\u2022 Display the slide. Students work on whiteboards.
\u2022 Time each question. Scan boards after each.
\u2022 Emphasise the factor pair (6,6) for 36 \u2014 this is the bridge to square numbers.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
\u2022 "Write your answer. Ready\u2026 show me!"
\u2022 Scan for: correct answers on \u226580% of boards per question.
PROCEED: If \u226580% correct on at least 3 of 4 questions, move to Fluency.
PIVOT: If Q1 (factor pairs) has widespread errors, briefly review: "Start at 1, divide up, stop when factors repeat." If Q3 (prime/composite) is weak, remind: "Prime = exactly 2 factors: 1 and itself."

**TEACHER NOTES:**
This Daily Review retrieves learning from all four previous sessions, creating a spaced retrieval effect. The factor pairs of 36 are deliberately chosen because (6,6) previews today's content \u2014 36 is a perfect square. The HCF question reinforces Lesson 4. The divisibility question retrieves Lesson 2. The prime/composite question retrieves Lesson 3. This comprehensive review primes students for the connections they'll make today.

**WATCH FOR:**
\u2022 Students who can do Q1 but not Q4 \u2014 they may have missed the HCF method from yesterday.
\u2022 Students who correctly identify (6,6) as a factor pair of 36 \u2014 they're ready for the square numbers connection.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
\u2022 "Perfect squares sprint. I want you to calculate 1\u00d71, 2\u00d72, 3\u00d73, all the way up to 12\u00d712. Write the answers in a list on your whiteboard. You have 60 seconds. Go!"
\u2022 After 60 seconds: "Boards up. The sequence is: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144."
\u2022 "Who got all 12? Thumbs up. These numbers have a special name \u2014 we'll learn it in a moment."

**DO:**
\u2022 Display the slide. Students write the sequence on whiteboards.
\u2022 Time 60 seconds. Read answers aloud for self-checking.
\u2022 Ask: "Who reached all 12? Who got stuck after 7\u00d77?"

**TEACHER NOTES:**
This fluency activity generates the sequence of square numbers through multiplication, BEFORE students learn the term "square number." This ensures the concept is grounded in their own calculation, not just a list to memorise. The common sticking points are 7\u00d77=49 and 8\u00d78=64 \u2014 these are the multiplication facts most often forgotten. The sprint format builds automaticity with these facts.

**WATCH FOR:**
\u2022 Students who add instead of multiply (e.g., writing 3+3=6 instead of 3\u00d73=9).
\u2022 Students who get stuck after 6\u00d76 or 7\u00d77 \u2014 note for enabling support.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
\u2022 Read from slide: "We are learning to identify and explore square numbers and triangular numbers so we can recognise patterns in how numbers are structured."
\u2022 "SC1: You'll be able to identify square numbers and explain WHY they're called 'square.' SC2: You'll do the same for triangular numbers. SC3: You'll connect these number families back to everything we've learned this week \u2014 factors, primes, multiples."

**DO:**
\u2022 Display the slide. Point to LI and read aloud.
\u2022 Point to each SC in turn. Emphasise SC3: "Today pulls everything together."

**TEACHER NOTES:**
The LI makes explicit that this lesson is about recognising PATTERNS and STRUCTURE in numbers, not just memorising lists. SC3 is the integration goal \u2014 connecting square and triangular numbers to factor pairs (L1), divisibility (L2), prime/composite classification (L3), and LCM/HCF (L4). This connection-making is the hallmark of deep mathematical understanding.

**WATCH FOR:**
\u2022 Students who look anxious about new terminology \u2014 reassure: "You already generated the square numbers in the fluency sprint."

[Maths: Planning \u2014 Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_IDO_SQUARE = `**SAY:**
\u2022 "Square numbers are the result of multiplying a whole number by itself. 1\u00d71=1, 2\u00d72=4, 3\u00d73=9, 4\u00d74=16. These are exactly the numbers you wrote in the sprint."
\u2022 "But WHY are they called SQUARE? Look at the screen. When I arrange 4 dots in a 2\u00d72 grid, I get a perfect square shape. 9 dots make a 3\u00d73 square. 16 dots make a 4\u00d74 square. The shape IS a square."
\u2022 "Now connect to Lesson 1: the factor pairs of 16 are (1,16), (2,8), (4,4). That repeated factor pair (4,4) \u2014 THAT'S what makes it a square number. Every square number has a factor pair where both numbers are the same."
\u2022 "The sequence is: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144."
\u2022 "Look at the differences: 4\u22121=3, 9\u22124=5, 16\u22129=7, 25\u221216=9. The gaps are consecutive odd numbers: 3, 5, 7, 9, 11, 13..."

**DO:**
\u2022 Display the slide. Point to each grid visual as you explain.
\u2022 Draw the connection arrow from the grid back to the factor pair.
\u2022 Point to the difference pattern at the bottom. "This is a beautiful pattern \u2014 the next square is always the current one plus the next odd number."

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
\u2022 "Why is 25 called a square number? [Name]?" [Because 5\u00d75=25 and you can arrange 25 dots in a 5\u00d75 square]
PROCEED: If student gives both multiplication and visual reason, continue.
PIVOT: If student only says "5 times 5," prompt: "And what shape do those dots make?"

**TEACHER NOTES:**
This slide makes three connections explicit: (1) square numbers come from n\u00d7n, (2) the name comes from the geometric shape, and (3) the factor pair connection to Lesson 1. The visual grids are essential \u2014 they make the abstract concept concrete. The difference pattern (consecutive odd numbers) is genuinely surprising and provides an extending investigation path. This pattern holds because (n+1)\u00b2 \u2212 n\u00b2 = 2n+1, which is always odd.

**MISCONCEPTIONS:**
\u2022 Misconception: "Square numbers are numbers with a 2 in them" or "numbers that end in 4 or 6."
  Why: Confusion between the name "square" and visual features of the digits.
  Impact: Students will misidentify non-square numbers as square.
  Quick correction: "A square number is n\u00d7n \u2014 a number times ITSELF. Test it: 2\u00d72=4, 3\u00d73=9. The digits don't matter; the multiplication does."

\u2022 Misconception: "1 is not a square number."
  Why: Students may think square numbers start at 4.
  Quick correction: "1\u00d71=1. One dot makes a 1\u00d71 square. It counts!"

[Maths: Launch \u2014 Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_IDO_TRIANGLE = `**SAY:**
\u2022 "Now for the second family: triangular numbers. These are the running total when you add 1+2+3+4+..."
\u2022 "T1=1. Just one dot. T2=1+2=3. Three dots form a triangle. T3=1+2+3=6. T4=1+2+3+4=10."
\u2022 "Each time we add the NEXT counting number. The differences between triangular numbers are 2, 3, 4, 5, 6... Each time, add one more."
\u2022 "The sequence is: 1, 3, 6, 10, 15, 21, 28, 36, 45, 55."
\u2022 "Wait \u2014 did you see 36 in that list? We said 36 is a square number too! 36 is BOTH square AND triangular. There aren't many numbers that are both."
\u2022 "For extending students: there's a formula. The nth triangular number is n\u00d7(n+1)\u00f72. So T10 = 10\u00d711\u00f72 = 55. You can check by adding 1+2+3+...+10."

**DO:**
\u2022 Display the slide. Point to each triangle dot pattern.
\u2022 Build the running total visually: "1... plus 2 makes 3... plus 3 makes 6... plus 4 makes 10."
\u2022 Pause at 36. "Remember our factor pairs of 36 from the warm-up? (6,6) made it square. Now we see it's triangular too!"

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
\u2022 "How do you get from T4=10 to T5? [Name]?" [Add 5, so T5=15]
PROCEED: If student articulates "add the next counting number," continue.
PIVOT: If student guesses or adds incorrectly, re-walk through: "T1=1, T2=1+2=3, T3=3+3=6, T4=6+4=10, T5=10+5=..."

**TEACHER NOTES:**
Triangular numbers are less familiar than square numbers for most students, so the visual support is critical. The dot triangle patterns should clearly show rows of 1, 2, 3, 4 dots. The connection to 36 being both square and triangular creates a "wow moment" that motivates further investigation. The formula Tn=n(n+1)/2 is optional for most students but should be mentioned for extending learners \u2014 it connects to the concept of area (a triangle is half a rectangle of n\u00d7(n+1) dots).

**MISCONCEPTIONS:**
\u2022 Misconception: "Triangular numbers are just multiples of 3."
  Why: The name "triangular" and the presence of 3, 6, 15, 21 in the sequence reinforce this misbelief.
  Impact: Students will think 9 is triangular (it's not \u2014 T3=6, T4=10, so 9 is skipped).
  Quick correction: "Let's check: is 9 in our list? 1, 3, 6, 10... No! 9 is NOT triangular \u2014 it's square (3\u00d73). Triangular numbers are running totals: 1, 1+2, 1+2+3..."

[Maths: Launch \u2014 Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
\u2022 "Quick check. Two questions on your whiteboard."
\u2022 "Part A: What is the 7th square number? Part B: What is the 5th triangular number?"
\u2022 "You have 20 seconds. Go!"
\u2022 After boards up: "The 7th square number is 7\u00d77=49. The 5th triangular number is 1+2+3+4+5=15."

**DO:**
\u2022 Display the question slide. Give 20 seconds.
\u2022 "Show me your boards!" Scan for 49 and 15.
\u2022 Click to reveal. Read through the working.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
\u2022 "Write both answers. 20 seconds. Show me!"
\u2022 Scan for: 49 and 15 on \u226580% of boards.
PROCEED: If \u226580% correct on both, move to We Do.
PIVOT: If Part A has errors, re-teach: "The nth square number is n\u00d7n. The 7th is 7\u00d77." If Part B has errors, re-walk the running total: "1, 1+2=3, 3+3=6, 6+4=10, 10+5=15."

**TEACHER NOTES:**
This CFU checks SC1 and SC2 simultaneously. The 7th square number tests whether students understand the n\u00d7n pattern (not just recalling the list). The 5th triangular number tests whether they can build the running total. Watch for students who confuse the two \u2014 writing 7+7=14 instead of 7\u00d77=49, or multiplying instead of adding for the triangular number.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
\u2022 "Let's investigate together. Is 36 a square number? Is it also a triangular number?"
\u2022 "On your whiteboards: test 36 for both. For square: find a number times itself that equals 36. For triangular: find a running total that equals 36. 30 seconds."
\u2022 Cold Call: "[Name], is 36 a square number? How do you know?" [Yes \u2014 6\u00d76=36]
\u2022 "Now connect to Lesson 1. The factor pairs of 36 are (1,36), (2,18), (3,12), (4,9), (6,6). That repeated pair (6,6) proves it's square."
\u2022 "Is 36 triangular? We need to check: does 1+2+3+...+n = 36 for some n?"
\u2022 "1+2+3+4+5+6+7+8 = 36. Yes! T8=36. So 36 is BOTH square AND triangular!"

**DO:**
\u2022 Display the question slide. 30 seconds for whiteboard work.
\u2022 Cold Call for each part. Click to reveal.
\u2022 Emphasise: "Numbers that are both square AND triangular are very rare. After 1, the next one is 36!"

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
\u2022 "[Name], what factor pair of 36 proves it's square?" [(6,6)]
\u2022 "[Name], what's the running total that reaches 36?" [1+2+3+4+5+6+7+8]
PROCEED: If students answer both correctly, move to We Do 2.
PIVOT: If students find the square but not the triangular, walk through the running total step by step on the board.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
\u2022 Task: Students check only whether 36 is square (simpler task). Provide the running total sequence 1, 3, 6, 10, 15, 21, 28, 36 on a reference card.

EXTENDING PROMPT:
\u2022 Task: "The next number that is both square and triangular is 1225. Can you find which square and which triangular number it is?" (35\u00d735 and T49)

**TEACHER NOTES:**
This We Do ties directly to the Daily Review warm-up where students found factor pairs of 36, including (6,6). The connection is now explicit: a repeated factor pair means the number is square. The triangular check requires patient running-total calculation \u2014 this is a good opportunity to model the systematic approach (keeping a running tally: 1, 3, 6, 10, 15, 21, 28, 36). The rarity of square-triangular numbers (1, 36, 1225, 41616...) adds a sense of mathematical wonder.

[Maths: Explore \u2014 Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
\u2022 "Harder question now. Find all square numbers between 1 and 100 that are also prime. Are there any?"
\u2022 "On your whiteboards, list the square numbers up to 100 first: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. Now check each one \u2014 is it prime?"
\u2022 "30 seconds. Go!"
\u2022 After boards: "Let's check. 1 \u2014 not prime (only 1 factor). 4=2\u00d72 \u2014 composite. 9=3\u00d73 \u2014 composite. 16=4\u00d74 \u2014 composite. Every single one is composite!"
\u2022 "WHY? Think about factors. A square number n\u00d7n always has at least THREE factors: 1, n, and n\u00d7n. To be prime you need EXACTLY two factors. So no square number greater than 1 can ever be prime."
\u2022 "This connects directly to Lesson 3 \u2014 prime vs composite. We now have a quick way to rule out primes: if it's a perfect square, it's automatically composite."

**DO:**
\u2022 Display the question slide. 30 seconds for whiteboard work.
\u2022 Click to reveal. Walk through the reasoning slowly.
\u2022 Emphasise the factors argument: "1, n, and n\u00d7n \u2014 that's 3 factors minimum."

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
\u2022 "[Name], why can't 49 be prime?" [Because 49=7\u00d77, so its factors are 1, 7, and 49 \u2014 that's 3 factors]
PROCEED: If students articulate the factor argument, move to the Hinge Question.
PIVOT: If students say "because it's even" or other incorrect reasons, redirect: "49 is odd, so it's not about being even. The key is the factor pair (7,7). If n\u00d7n, then 1 and n and n\u00d7n are all factors."

**ENABLING & EXTENDING:**
ENABLING PROMPT:
\u2022 Task: Students simply check whether 9, 16, 25 are prime by listing their factors. Don't need to generalise.

EXTENDING PROMPT:
\u2022 Task: "Can a triangular number be prime? Find examples. Can you explain why some triangular numbers are prime and some aren't?"

**TEACHER NOTES:**
This is the deepest connection moment in the lesson \u2014 linking square numbers to prime/composite classification. The argument that n\u00d7n has at least 3 factors (1, n, n\u00b2) is elegant but may be abstract for some students. Ground it in specific examples: "49 has factors 1, 7, 49. That's 3 factors, so it's composite." The extending question about triangular primes is interesting: T2=3 (prime), T3=6 (composite), T4=10 (composite), T6=21 (composite), but T2=3 and T10=55 is composite. Some triangular numbers are prime, unlike square numbers.

[Maths: Explore \u2014 Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
\u2022 "Final gate check. Which of these is a triangular number? A) 14  B) 18  C) 21  D) 24"
\u2022 "Hold up 1, 2, 3, or 4 fingers. 15 seconds to decide."
\u2022 After vote: "The answer is C \u2014 21. T6 = 1+2+3+4+5+6 = 21."
\u2022 "Why not the others? A) 14: T4=10, T5=15 \u2014 14 is between them, not triangular. B) 18: T5=15, T6=21 \u2014 18 is between, not triangular. D) 24: T6=21, T7=28 \u2014 24 is between, not triangular."

**DO:**
\u2022 Display the hinge question. 15 seconds.
\u2022 Finger vote: scan for option C (3 fingers) on \u226580%.
\u2022 Click to reveal. Briefly explain why each distractor fails.

**CFU CHECKPOINT:**
Technique: Finger Voting (1\u20134)
Script:
\u2022 "Fingers up \u2014 which is a triangular number? 1 for A, 2 for B, 3 for C, 4 for D. Show me!"
PROCEED: If \u226580% choose C, release to You Do.
PIVOT: If students choose B (18) \u2014 they may think "triangular = multiple of 3" since 18\u00f73=6. Reteach: "Triangular numbers are running totals: 1, 3, 6, 10, 15, 21. Count through the sequence \u2014 18 isn't in it." If students choose D (24) \u2014 similar confusion. Walk through: "T6=21, T7=21+7=28. 24 is between, not triangular."

**MISCONCEPTIONS:**
\u2022 Misconception: "18 is triangular because it's divisible by 3."
  Why: The name "triangular" and presence of multiples of 3 in the sequence (3, 6, 21) reinforce this.
  Quick correction: "Not every multiple of 3 is triangular. 18\u00f73=6, but 18 is not in the sequence 1, 3, 6, 10, 15, 21, 28. Triangular means 'running total of 1+2+3+...', not 'divisible by 3.'"

[Maths: Monitor Progress \u2014 Hinge Question | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
\u2022 "Independent practice time. On your worksheet, you'll identify square and triangular numbers, find patterns, and make connections to our earlier learning."
\u2022 "You have 8 minutes. Start now."

**DO:**
\u2022 Distribute SR1 worksheet.
\u2022 Set timer for 8 minutes. Circulate \u2014 visit enabling students first.
\u2022 Conference with 2\u20133 students: "How did you decide if this number was square/triangular?"

**ENABLING & EXTENDING:**
ENABLING PROMPT:
\u2022 Task: Students complete only Section A (identifying square numbers from a list) and the first 3 problems of Section B (calculating triangular numbers). Provide a reference card with the first 12 square numbers and first 10 triangular numbers.

EXTENDING PROMPT:
\u2022 Task: After completing the worksheet, students work on EXT1 \u2014 the Number Shape Investigations resource exploring pentagonal numbers, hexagonal numbers, and the relationship between consecutive triangular numbers.

**TEACHER NOTES:**
The worksheet sequences from identification (recognising square/triangular from a list) to calculation (finding specific square/triangular numbers) to pattern analysis (differences) to connection-making (factors, primes). Numbers are chosen to include edge cases: 1 (both square and triangular), 36 (both), and near-misses like 35 and 37 (neither).

[Maths: Summarise \u2014 Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
\u2022 "Pens down. Exit ticket time \u2014 three questions. Work silently, 3 minutes."
\u2022 Read Q1, Q2, Q3 aloud from the slide.

**DO:**
\u2022 Display exit ticket. 3 minutes. Circulate silently.
\u2022 Collect responses or observe.

**TEACHER NOTES:**
Q1 tests SC1 (identifying square numbers and explaining using factor pairs). Q2 tests SC2 (calculating the 6th triangular number). Q3 targets SC3 (connecting square numbers to prime/composite from Lesson 3). Sort responses: SC1 only \u2192 needs reinforcement, SC1+SC2 \u2192 on track, all three \u2192 deep understanding. This exit ticket captures end-of-unit mastery.

[Maths: Summarise \u2014 Exit Ticket (Stage 5) | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `**SAY:**
\u2022 "Here are today's printable resources."

**DO:**
\u2022 Display briefly. Teachers click hyperlinks.

**TEACHER NOTES:**
SR1 is the practice worksheet (one per student). SR2 is the answer key (teacher reference). EXT1 is the extending investigation on number shapes (3\u20135 copies for extending students). EXT1 is self-contained and teaches the concepts independently, since the teacher will be conferencing with other students.

[Maths: Planning \u2014 Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
\u2022 "What a week! Let's review our entire Factors & Multiples unit."
\u2022 "Session 1: Factor pairs \u2014 the building blocks. Session 2: Multiples and divisibility rules \u2014 quick tests. Session 3: Prime and composite numbers \u2014 classifying. Session 4: LCM and HCF \u2014 comparing numbers. Session 5: Square and triangular numbers \u2014 special families."
\u2022 "Turn to your partner: Which session was the most useful for you? What's one thing you'll remember from this unit? 30 seconds."
\u2022 "Thumbs up for each SC." Read SC1, SC2, SC3. Scan after each.
\u2022 "I'm proud of how hard you've worked. Next week we build on this foundation with new mathematical ideas."

**DO:**
\u2022 Display closing slide. Reference each session briefly.
\u2022 30 seconds Turn & Talk. Listen to 2\u20133 pairs.
\u2022 Run thumbs for each SC.
\u2022 Celebrate \u2014 it's the end of the unit.

**TEACHER NOTES:**
The closing synthesises all five sessions into a coherent narrative: factors \u2192 multiples \u2192 primes \u2192 LCM/HCF \u2192 square/triangular. Each session built on the previous one. The Turn & Talk encourages students to identify personal highlights, which strengthens encoding. The "next week" preview is deliberately vague \u2014 no specific content is promised.

[Maths: Summarise \u2014 Closing | VTLM 2.0: Monitor Progress & Feedback]`;

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "Square & Triangular Numbers \u2014 Session 5";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres, "Square & Triangular Numbers", "Special Families of Numbers",
    "Session 5 of 5 | Factors & Multiples | Year 5/6", NOTES_TITLE);

  // ── SLIDE 2: Daily Review (Stage 1) ─────────────────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Daily Review");
    addTitle(s, "Unit Review \u2014 Mixed Retrieval", { fontSize: 22 });

    const questions = [
      { num: "Q1", text: "Find ALL factor pairs of 36.", tag: "L1: Factors", color: C.PRIMARY },
      { num: "Q2", text: "Is 456 divisible by 3?", tag: "L2: Divisibility", color: C.SECONDARY },
      { num: "Q3", text: "Is 51 prime or composite?", tag: "L3: Primes", color: C.ACCENT },
      { num: "Q4", text: "Find the HCF of 24 and 36.", tag: "L4: HCF", color: C.ALERT },
    ];
    questions.forEach((q, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const cx = 0.5 + col * 4.7;
      const cy = CONTENT_TOP + 0.05 + row * 1.7;
      addCard(s, cx, cy, 4.4, 1.5, { strip: q.color });
      addTextOnShape(s, q.num, {
        x: cx + 0.12, y: cy + 0.1, w: 0.7, h: 0.35, rectRadius: 0.08,
        fill: { color: q.color },
      }, { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText(q.tag, {
        x: cx + 0.95, y: cy + 0.1, w: 3.2, h: 0.32,
        fontSize: 10, fontFace: FONT_B, color: q.color, bold: true, margin: 0, valign: "middle",
      });
      s.addText(q.text, {
        x: cx + 0.12, y: cy + 0.55, w: 4.1, h: 0.7,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_DR);
  })();

  // ── SLIDE 3: Fluency (Stage 1) ─────────────────────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Perfect Squares Sprint", { fontSize: 26 });

    addCard(s, 0.5, CONTENT_TOP + 0.05, 6.5, 2.8, { strip: C.PRIMARY });
    s.addText("Calculate and write the sequence:", {
      x: 0.75, y: CONTENT_TOP + 0.15, w: 6.0, h: 0.32,
      fontSize: 14, fontFace: FONT_B, color: C.PRIMARY, bold: true, margin: 0,
    });

    // Grid of n x n expressions
    const exprs = [
      "1\u00d71", "2\u00d72", "3\u00d73", "4\u00d74",
      "5\u00d75", "6\u00d76", "7\u00d77", "8\u00d78",
      "9\u00d79", "10\u00d710", "11\u00d711", "12\u00d712",
    ];
    exprs.forEach((expr, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const px = 0.85 + col * 1.55;
      const py = CONTENT_TOP + 0.6 + row * 0.7;
      addTextOnShape(s, expr, {
        x: px, y: py, w: 1.3, h: 0.5, rectRadius: 0.08,
        fill: { color: C.BG_LIGHT },
      }, { fontSize: 14, fontFace: FONT_H, color: C.CHARCOAL, bold: true });
    });

    // Timer card
    addTextOnShape(s, "60 seconds \u2014 GO!", {
      x: 2.5, y: SAFE_BOTTOM - 0.55, w: 5, h: 0.45, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

    // Instruction card (right)
    addCard(s, 7.3, CONTENT_TOP + 0.05, 2.2, 2.0, { strip: C.SECONDARY });
    s.addText([
      { text: "Write answers\non whiteboard", options: { breakLine: true, fontSize: 12, color: C.SECONDARY, bold: true } },
      { text: "As fast as\nyou can!", options: { fontSize: 11, color: C.CHARCOAL } },
    ], {
      x: 7.5, y: CONTENT_TOP + 0.25, w: 1.8, h: 1.5,
      fontFace: FONT_B, margin: 0, align: "center", valign: "middle",
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_FLUENCY);
  })();

  // ── SLIDE 4: LI/SC ─────────────────────────────────────────────────────
  liSlide(pres,
    ["We are learning to identify and explore square numbers and triangular numbers so we can recognise patterns in how numbers are structured."],
    [
      "I can identify square numbers and explain why they are called \"square.\"",
      "I can identify triangular numbers and explain the pattern in their sequence.",
      "I can connect square and triangular numbers to earlier learning (factors, primes).",
    ],
    NOTES_LISC, FOOTER);

  // ── SLIDE 5: I Do — Square Numbers (Stage 2) ──────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Square Numbers: n \u00d7 n", { fontSize: 22, color: C.PRIMARY });

    // Visual grids: 1x1, 2x2, 3x3, 4x4
    const grids = [
      { n: 1, label: "1\u00d71 = 1", x: 0.6 },
      { n: 2, label: "2\u00d72 = 4", x: 2.6 },
      { n: 3, label: "3\u00d73 = 9", x: 4.6 },
      { n: 4, label: "4\u00d74 = 16", x: 6.8 },
    ];
    const cellSize = 0.32;
    grids.forEach((g) => {
      // Draw grid of filled squares
      for (let row = 0; row < g.n; row++) {
        for (let col = 0; col < g.n; col++) {
          s.addShape("roundRect", {
            x: g.x + col * (cellSize + 0.04),
            y: CONTENT_TOP + 0.05 + row * (cellSize + 0.04),
            w: cellSize, h: cellSize, rectRadius: 0.04,
            fill: { color: C.PRIMARY },
          });
        }
      }
      // Label below grid
      const gridW = g.n * (cellSize + 0.04) - 0.04;
      s.addText(g.label, {
        x: g.x - 0.1, y: CONTENT_TOP + 0.05 + g.n * (cellSize + 0.04) + 0.05,
        w: gridW + 0.5, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0, align: "center",
      });
    });

    // Connection to factors card
    addCard(s, 0.5, CONTENT_TOP + 2.1, 4.2, 1.0, { strip: C.SECONDARY });
    s.addText([
      { text: "Factor pair connection: ", options: { bold: true, fontSize: 11, color: C.SECONDARY } },
      { text: "16 has pair (4,4) \u2014 the repeated factor makes it square!", options: { fontSize: 11, color: C.CHARCOAL } },
    ], {
      x: 0.7, y: CONTENT_TOP + 2.2, w: 3.8, h: 0.7,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Sequence card
    addCard(s, 5.0, CONTENT_TOP + 2.1, 4.5, 1.0, { strip: C.ACCENT });
    s.addText("1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144", {
      x: 5.2, y: CONTENT_TOP + 2.2, w: 4.1, h: 0.35,
      fontSize: 11, fontFace: FONT_H, color: C.CHARCOAL, bold: true, margin: 0,
    });
    s.addText("Differences: +3, +5, +7, +9, +11, +13\u2026\n(consecutive odd numbers!)", {
      x: 5.2, y: CONTENT_TOP + 2.55, w: 4.1, h: 0.45,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_IDO_SQUARE);
  })();

  // ── SLIDE 6: I Do — Triangular Numbers (Stage 2) ──────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Triangular Numbers: Running Totals", { fontSize: 22, color: C.PRIMARY });

    // Triangle dot patterns: T1=1, T2=3, T3=6, T4=10
    const triangles = [
      { n: 1, label: "T1 = 1", x: 0.8 },
      { n: 2, label: "T2 = 3", x: 2.8 },
      { n: 3, label: "T3 = 6", x: 4.8 },
      { n: 4, label: "T4 = 10", x: 7.0 },
    ];
    const dotSize = 0.22;
    const dotGap = 0.06;
    triangles.forEach((t) => {
      // Draw rows of dots: row 0 has 1 dot, row 1 has 2, ..., row n-1 has n
      for (let row = 0; row < t.n; row++) {
        const dotsInRow = row + 1;
        const rowW = dotsInRow * (dotSize + dotGap) - dotGap;
        const totalMaxW = t.n * (dotSize + dotGap) - dotGap;
        const offsetX = (totalMaxW - rowW) / 2;
        for (let col = 0; col < dotsInRow; col++) {
          s.addShape("roundRect", {
            x: t.x + offsetX + col * (dotSize + dotGap),
            y: CONTENT_TOP + 0.08 + row * (dotSize + dotGap),
            w: dotSize, h: dotSize, rectRadius: dotSize / 2,
            fill: { color: C.SECONDARY },
          });
        }
      }
      // Label below dots
      const totalH = t.n * (dotSize + dotGap);
      s.addText(t.label, {
        x: t.x - 0.3, y: CONTENT_TOP + 0.08 + totalH + 0.05,
        w: 1.6, h: 0.28,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0, align: "center",
      });
    });

    // Pattern card
    addCard(s, 0.5, CONTENT_TOP + 1.9, 4.2, 1.2, { strip: C.SECONDARY });
    s.addText("1, 3, 6, 10, 15, 21, 28, 36, 45, 55", {
      x: 0.7, y: CONTENT_TOP + 2.0, w: 3.8, h: 0.3,
      fontSize: 11, fontFace: FONT_H, color: C.CHARCOAL, bold: true, margin: 0,
    });
    s.addText("Pattern: +2, +3, +4, +5, +6\u2026\n(each time, add 1 more)", {
      x: 0.7, y: CONTENT_TOP + 2.35, w: 3.8, h: 0.45,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
    s.addText("36 is BOTH square AND triangular!", {
      x: 0.7, y: CONTENT_TOP + 2.78, w: 3.8, h: 0.25,
      fontSize: 10, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0,
    });

    // Formula card for extending
    addCard(s, 5.0, CONTENT_TOP + 1.9, 4.5, 1.2, { strip: C.ACCENT });
    addTextOnShape(s, "Extending", {
      x: 5.15, y: CONTENT_TOP + 2.0, w: 1.5, h: 0.28, rectRadius: 0.06,
      fill: { color: C.ACCENT },
    }, { fontSize: 9, fontFace: FONT_B, color: C.WHITE, bold: true });
    s.addText("Formula: Tn = n(n+1) \u00f7 2", {
      x: 5.2, y: CONTENT_TOP + 2.35, w: 4.1, h: 0.3,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, bold: true, margin: 0,
    });
    s.addText("T10 = 10 \u00d7 11 \u00f7 2 = 55", {
      x: 5.2, y: CONTENT_TOP + 2.7, w: 4.1, h: 0.3,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_IDO_TRIANGLE);
  })();

  // ── SLIDES 7-8: CFU 1 (withReveal) ─────────────────────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "CFU", { color: C.ALERT });
      addTitle(s, "Quick Check", { color: C.ALERT });

      // Two question cards side by side
      addCard(s, 0.5, CONTENT_TOP + 0.15, 4.2, 2.0, { strip: C.PRIMARY });
      addTextOnShape(s, "Part A", {
        x: 0.65, y: CONTENT_TOP + 0.25, w: 1.2, h: 0.32, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText("What is the 7th\nsquare number?", {
        x: 0.7, y: CONTENT_TOP + 0.75, w: 3.8, h: 1.0,
        fontSize: 20, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });

      addCard(s, 5.3, CONTENT_TOP + 0.15, 4.2, 2.0, { strip: C.SECONDARY });
      addTextOnShape(s, "Part B", {
        x: 5.45, y: CONTENT_TOP + 0.25, w: 1.2, h: 0.32, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText("What is the 5th\ntriangular number?", {
        x: 5.5, y: CONTENT_TOP + 0.75, w: 3.8, h: 1.0,
        fontSize: 20, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });

      addTextOnShape(s, "Show Me Boards \u2014 20 seconds", {
        x: 2.5, y: CONTENT_TOP + 2.5, w: 5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_CFU1);
      return s;
    },
    (slide) => {
      // Reveal answers
      addTextOnShape(slide, "7 \u00d7 7 = 49", {
        x: 0.7, y: CONTENT_TOP + 1.6, w: 3.8, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(slide, "1+2+3+4+5 = 15", {
        x: 5.5, y: CONTENT_TOP + 1.6, w: 3.8, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDES 9-10: We Do 1 — Is 36 both? (withReveal) ───────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Investigate: Is 36 Special?", { fontSize: 22, color: C.SECONDARY });

      addTextOnShape(s, "36", {
        x: 3.5, y: CONTENT_TOP + 0.05, w: 3.0, h: 1.0, rectRadius: 0.12,
        fill: { color: C.PRIMARY },
      }, { fontSize: 52, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Two question cards
      addCard(s, 0.5, CONTENT_TOP + 1.3, 4.2, 1.4, { strip: C.PRIMARY });
      addTextOnShape(s, "Square?", {
        x: 0.65, y: CONTENT_TOP + 1.4, w: 1.5, h: 0.32, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText("Is 36 = n \u00d7 n for some n?\nFind the factor pair.", {
        x: 0.7, y: CONTENT_TOP + 1.82, w: 3.8, h: 0.7,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });

      addCard(s, 5.3, CONTENT_TOP + 1.3, 4.2, 1.4, { strip: C.SECONDARY });
      addTextOnShape(s, "Triangular?", {
        x: 5.45, y: CONTENT_TOP + 1.4, w: 1.8, h: 0.32, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText("Does 1+2+3+\u2026+n = 36\nfor some n?", {
        x: 5.5, y: CONTENT_TOP + 1.82, w: 3.8, h: 0.7,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });

      addTextOnShape(s, "Test on your whiteboard \u2014 30 seconds", {
        x: 2.5, y: CONTENT_TOP + 3.0, w: 5.0, h: 0.4, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (slide) => {
      // Reveal: both YES
      addTextOnShape(slide, "YES \u2014 6 \u00d7 6 = 36", {
        x: 0.7, y: CONTENT_TOP + 2.5, w: 3.8, h: 0.42, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(slide, "YES \u2014 T8 = 1+2+\u2026+8 = 36", {
        x: 5.5, y: CONTENT_TOP + 2.5, w: 3.8, h: 0.42, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(slide, "36 is BOTH square AND triangular!", {
        x: 2.0, y: CONTENT_TOP + 3.0, w: 6.0, h: 0.4, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDES 11-12: We Do 2 — Square primes? (withReveal) ───────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Can a Square Number Be Prime?", { fontSize: 22, color: C.SECONDARY });

      // Show the square numbers to test
      addCard(s, 0.5, CONTENT_TOP + 0.1, 9.0, 1.3, { strip: C.PRIMARY });
      s.addText("Square numbers from 1 to 100:", {
        x: 0.7, y: CONTENT_TOP + 0.18, w: 8.5, h: 0.3,
        fontSize: 12, fontFace: FONT_B, color: C.PRIMARY, bold: true, margin: 0,
      });

      // Square number pills
      const squares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];
      squares.forEach((sq, i) => {
        const px = 0.7 + i * 0.88;
        addTextOnShape(s, String(sq), {
          x: px, y: CONTENT_TOP + 0.55, w: 0.72, h: 0.42, rectRadius: 0.08,
          fill: { color: C.BG_LIGHT },
        }, { fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, bold: true });
      });

      // Question card
      addCard(s, 0.5, CONTENT_TOP + 1.65, 9.0, 1.4, { strip: C.ALERT });
      s.addText("Which of these are prime?\nCheck each one \u2014 does it have exactly 2 factors?", {
        x: 0.75, y: CONTENT_TOP + 1.8, w: 8.5, h: 0.8,
        fontSize: 16, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });

      addTextOnShape(s, "30 seconds \u2014 Show Me Boards", {
        x: 2.5, y: CONTENT_TOP + 2.7, w: 5.0, h: 0.4, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO2);
      return s;
    },
    (slide) => {
      // Cover the question card content and instruction pill from the question slide
      slide.addShape("rect", {
        x: 0.4, y: CONTENT_TOP + 1.6, w: 9.2, h: 1.55,
        fill: { color: C.BG_LIGHT },
      });

      // Reveal: NONE are prime
      addTextOnShape(slide, "NONE! Every square number > 1 is composite.", {
        x: 1.0, y: CONTENT_TOP + 1.75, w: 8.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

      addCard(slide, 1.0, CONTENT_TOP + 2.4, 8.0, 0.85, { strip: C.PRIMARY });
      slide.addText([
        { text: "Why? ", options: { bold: true, fontSize: 13, color: C.PRIMARY } },
        { text: "If n\u00d7n is a square number, its factors include 1, n, and n\u00d7n. That's at least 3 factors \u2014 so it can't be prime (needs exactly 2).", options: { fontSize: 12, color: C.CHARCOAL } },
      ], {
        x: 1.2, y: CONTENT_TOP + 2.5, w: 7.5, h: 0.65,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    }
  );

  // ── SLIDES 13-14: Hinge Question (withReveal) ─────────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "Hinge Question", { color: C.ALERT, w: 2.2 });
      addTitle(s, "Which is a Triangular Number?", { color: C.ALERT });

      const options = [
        { letter: "A", value: "14", color: C.PRIMARY },
        { letter: "B", value: "18", color: C.SECONDARY },
        { letter: "C", value: "21", color: C.ACCENT },
        { letter: "D", value: "24", color: C.SUCCESS },
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
      addTextOnShape(slide, "C \u2014 21 is triangular (T6)", {
        x: 1.5, y: CONTENT_TOP + 2.2, w: 7, h: 0.55, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
      slide.addText("1 + 2 + 3 + 4 + 5 + 6 = 21", {
        x: 1.5, y: CONTENT_TOP + 2.85, w: 7, h: 0.35,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      slide.addText("A) 14: between T4=10 and T5=15     B) 18: between T5=15 and T6=21     D) 24: between T6=21 and T7=28", {
        x: 0.5, y: CONTENT_TOP + 3.2, w: 9.0, h: 0.25,
        fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });
    }
  );

  // ── SLIDE 15: You Do (Stage 4) ────────────────────────────────────────
  contentSlide(pres, "Stage 4 | You Do", C.ALERT, "Independent Practice", [], NOTES_YOUDO, FOOTER, (s) => {
    addCard(s, 0.5, CONTENT_TOP, 5.5, 2.2, { strip: C.ALERT });
    const steps = [
      { label: "Section A:", text: "Identify which numbers are square." },
      { label: "Section B:", text: "Calculate specific triangular numbers." },
      { label: "Section C:", text: "Find patterns and connections to factors/primes." },
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

    // Reference lists on the right
    addCard(s, 6.3, CONTENT_TOP, 3.2, 1.0, { strip: C.PRIMARY });
    s.addText([
      { text: "Square:", options: { bold: true, fontSize: 10, color: C.PRIMARY, breakLine: true } },
      { text: "1, 4, 9, 16, 25, 36, 49, 64, 81, 100", options: { fontSize: 9, color: C.CHARCOAL } },
    ], {
      x: 6.5, y: CONTENT_TOP + 0.08, w: 2.8, h: 0.8,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    addCard(s, 6.3, CONTENT_TOP + 1.15, 3.2, 1.0, { strip: C.SECONDARY });
    s.addText([
      { text: "Triangular:", options: { bold: true, fontSize: 10, color: C.SECONDARY, breakLine: true } },
      { text: "1, 3, 6, 10, 15, 21, 28, 36, 45, 55", options: { fontSize: 9, color: C.CHARCOAL } },
    ], {
      x: 6.5, y: CONTENT_TOP + 1.23, w: 2.8, h: 0.8,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    addTextOnShape(s, "Use your SR1 Worksheet", {
      x: 6.5, y: SAFE_BOTTOM - 0.55, w: 3.0, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });
  });

  // ── SLIDE 16: Exit Ticket (Stage 5) ───────────────────────────────────
  exitTicketSlide(pres, [
    "Is 64 a square number? Explain how you know.",
    "What is the 6th triangular number? Show your working.",
    "Challenge: Why can no square number greater than 1 be prime? Use what you know about factors to explain.",
  ], NOTES_EXIT, FOOTER);

  // ── SLIDE 17: Resources ───────────────────────────────────────────────
  addResourceSlide(pres, [
    {
      name: "SR1 \u2014 Square & Triangular Numbers Worksheet",
      fileName: "SR1_Square_Triangular_Worksheet.pdf",
      description: "Independent practice \u2014 identify, calculate, and connect.",
    },
    {
      name: "SR2 \u2014 Answer Key",
      fileName: "SR2_Square_Triangular_Answers.pdf",
      description: "Answer key for SR1. Teacher reference.",
    },
    {
      name: "EXT1 \u2014 Number Shape Investigations",
      fileName: "EXT1_Number_Shape_Investigations.pdf",
      description: "Extending: pentagonal numbers, hexagonal numbers, and Tn + Tn+1 = square.",
    },
  ], { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // ── SLIDE 18: Closing (Unit Wrap-Up) ──────────────────────────────────
  closingSlide(pres,
    "Which session was the most useful for you this week? What is one thing you will remember from the Factors & Multiples unit? Turn to your partner \u2014 30 seconds.",
    [
      "Session 1: Factor pairs \u2014 systematic finding and stopping points.",
      "Session 2: Multiples and divisibility rules for 2, 3, 5, 10.",
      "Session 3: Prime and composite numbers \u2014 classifying using factors.",
      "Session 4: LCM and HCF \u2014 comparing numbers efficiently.",
      "Session 5: Square and triangular numbers \u2014 special number families.",
      "Next week we build on this foundation.",
    ],
    NOTES_CLOSING);

  // ── Write PPTX ────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: OUT_DIR + "/FM_Lesson5_Square_Triangular.pptx" });
  console.log("PPTX written to " + OUT_DIR);

  // ── Generate companion PDFs ────────────────────────────────────────────
  await generateWorksheet();
  await generateAnswerKey();
  await generateExtendingPdf();
  console.log("All PDFs generated.");
}

// ── PDF: SR1 — Square & Triangular Numbers Worksheet ─────────────────────────

async function generateWorksheet() {
  const doc = createPdf({ title: "Square & Triangular Numbers Worksheet" });

  let y = addPdfHeader(doc, "Square & Triangular Numbers", {
    subtitle: "SR1 \u2014 Supporting Resource",
    color: C.PRIMARY,
    lessonInfo: "Session 5 of 5 | Factors & Multiples | Year 5/6 Maths",
  });

  y = addTipBox(doc, "Square numbers: n \u00d7 n (e.g., 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144)\nTriangular numbers: running total of 1+2+3+\u2026 (e.g., 1, 3, 6, 10, 15, 21, 28, 36, 45, 55)", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Section A: Identify Square Numbers", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Circle ALL the square numbers in each row. Explain how you know.", y);

  const rowA = [
    { nums: "12, 16, 20, 25, 30" },
    { nums: "35, 36, 42, 48, 49" },
    { nums: "60, 64, 72, 80, 81" },
  ];
  rowA.forEach((r, i) => {
    y = addProblem(doc, i + 1, `Which are square? ${r.nums}`, y, {
      writeLines: [{ label: "Square numbers:" }, { label: "How I know:" }],
      color: C.PRIMARY,
    });
  });

  y = addSectionHeading(doc, "Section B: Calculate Triangular Numbers", y, { color: C.SECONDARY });

  const triProbs = [
    { n: 7, prompt: "Calculate T7 (the 7th triangular number). Show your running total." },
    { n: 8, prompt: "Calculate T8. Show your running total." },
    { n: 9, prompt: "Calculate T9. Show your running total." },
  ];
  triProbs.forEach((p, i) => {
    y = addProblem(doc, i + 4, p.prompt, y, {
      writeLines: [{ label: "Running total:" }, { label: "Answer:" }],
      color: C.SECONDARY,
    });
  });

  y = addSectionHeading(doc, "Section C: Patterns & Connections", y, { color: C.ACCENT });

  y = addProblem(doc, 7, "Write the differences between consecutive square numbers from 1 to 100. What pattern do you notice?", y, {
    writeLines: [{ label: "Differences:" }, { label: "Pattern:" }],
    color: C.ACCENT,
  });

  y = addProblem(doc, 8, "Is 36 a square number AND a triangular number? Prove both.", y, {
    writeLines: [{ label: "Square proof:" }, { label: "Triangular proof:" }],
    color: C.ACCENT,
  });

  y = addProblem(doc, 9, "Can a square number greater than 1 be prime? Explain using what you know about factors.", y, {
    writeLines: [{ label: "Answer:" }, { label: "Explanation:" }],
    color: C.ALERT,
  });

  addPdfFooter(doc, "Session 5 of 5 | Factors & Multiples | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR1_Square_Triangular_Worksheet.pdf");
  console.log("  SR1 worksheet written.");
}

// ── PDF: SR2 — Answer Key ────────────────────────────────────────────────────

async function generateAnswerKey() {
  const doc = createPdf({ title: "Square & Triangular Numbers Answer Key" });

  let y = addPdfHeader(doc, "Square & Triangular Numbers \u2014 Answer Key", {
    subtitle: "SR2 \u2014 Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: "Session 5 of 5 | Factors & Multiples | Year 5/6 Maths",
    showNameDate: false,
  });

  y = addSectionHeading(doc, "Section A: Identify Square Numbers", y, { color: C.PRIMARY });

  y = addProblem(doc, 1, "12, 16, 20, 25, 30", y, {
    writeLines: [
      { label: "Square numbers:", answer: "16 (4\u00d74) and 25 (5\u00d75)" },
    ],
    color: C.PRIMARY,
  });
  y = addProblem(doc, 2, "35, 36, 42, 48, 49", y, {
    writeLines: [
      { label: "Square numbers:", answer: "36 (6\u00d76) and 49 (7\u00d77)" },
    ],
    color: C.PRIMARY,
  });
  y = addProblem(doc, 3, "60, 64, 72, 80, 81", y, {
    writeLines: [
      { label: "Square numbers:", answer: "64 (8\u00d78) and 81 (9\u00d79)" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Section B: Calculate Triangular Numbers", y, { color: C.SECONDARY });

  y = addProblem(doc, 4, "T7:", y, {
    writeLines: [
      { label: "Running total:", answer: "1+2+3+4+5+6+7 = 28" },
    ],
    color: C.SECONDARY,
  });
  y = addProblem(doc, 5, "T8:", y, {
    writeLines: [
      { label: "Running total:", answer: "1+2+3+4+5+6+7+8 = 36" },
    ],
    color: C.SECONDARY,
  });
  y = addProblem(doc, 6, "T9:", y, {
    writeLines: [
      { label: "Running total:", answer: "1+2+3+4+5+6+7+8+9 = 45" },
    ],
    color: C.SECONDARY,
  });

  y = addSectionHeading(doc, "Section C: Patterns & Connections", y, { color: C.ACCENT });

  y = addProblem(doc, 7, "Differences between consecutive square numbers:", y, {
    writeLines: [
      { label: "Differences:", answer: "3, 5, 7, 9, 11, 13, 15, 17, 19 (consecutive odd numbers)" },
      { label: "Pattern:", answer: "Each difference is the next odd number. This works because (n+1)\u00b2 \u2212 n\u00b2 = 2n+1." },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 8, "Is 36 both square and triangular?", y, {
    writeLines: [
      { label: "Square proof:", answer: "Yes \u2014 36 = 6\u00d76. Factor pair (6,6)." },
      { label: "Triangular proof:", answer: "Yes \u2014 T8 = 1+2+3+4+5+6+7+8 = 36." },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 9, "Can a square number > 1 be prime?", y, {
    writeLines: [
      { label: "Answer:", answer: "No. A square number n\u00d7n has at least 3 factors: 1, n, and n\u00d7n. Primes need exactly 2 factors." },
    ],
    color: C.ALERT,
  });

  addPdfFooter(doc, "Session 5 of 5 | Factors & Multiples | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR2_Square_Triangular_Answers.pdf");
  console.log("  SR2 answer key written.");
}

// ── PDF: EXT1 — Number Shape Investigations ─────────────────────────────────

async function generateExtendingPdf() {
  const doc = createPdf({ title: "Number Shape Investigations" });

  let y = addPdfHeader(doc, "Number Shape Investigations", {
    subtitle: "EXT1 \u2014 Extending Investigation",
    color: C.ACCENT,
    lessonInfo: "Session 5 of 5 | Factors & Multiples | Year 5/6 Maths",
  });

  y = addTipBox(doc, "You already know about square numbers (n\u00d7n) and triangular numbers (1+2+3+\u2026+n). But there are other number shapes too! Work through this investigation to discover pentagonal and hexagonal numbers, and a beautiful connection between triangular and square numbers.", y, { color: C.SECONDARY });

  // Part 1: Pentagonal Numbers
  y = addSectionHeading(doc, "Part 1: Pentagonal Numbers", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Pentagonal numbers count dots arranged in pentagons (5-sided shapes). The pattern is:", y);
  y = addBodyText(doc, "P1 = 1\nP2 = 5 (add 4 dots to make a pentagon)\nP3 = 12 (add 7 more dots)\nP4 = 22 (add 10 more dots)\n\nNotice the additions: +4, +7, +10, +13, +16\u2026 (each time add 3 more)", y);
  y = addBodyText(doc, "The formula is: Pn = n(3n \u2212 1) \u00f7 2", y);

  y = addProblem(doc, 1, "Calculate P5, P6, and P7 using the pattern (add the next number) or the formula.", y, {
    writeLines: [{ label: "P5 =" }, { label: "P6 =" }, { label: "P7 =" }],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "Are any of the first 7 pentagonal numbers also square? Also triangular? Check against your lists.", y, {
    writeLines: [{ label: "Also square?" }, { label: "Also triangular?" }],
    color: C.PRIMARY,
  });

  // Part 2: Hexagonal Numbers
  y = addSectionHeading(doc, "Part 2: Hexagonal Numbers", y, { color: C.SECONDARY });
  y = addBodyText(doc, "Hexagonal numbers count dots in hexagons (6-sided shapes). The pattern is:", y);
  y = addBodyText(doc, "H1 = 1\nH2 = 6 (add 5 dots)\nH3 = 15 (add 9 more dots)\nH4 = 28 (add 13 more dots)\n\nAdditions: +5, +9, +13, +17\u2026 (each time add 4 more)", y);

  y = addProblem(doc, 3, "Calculate H5 and H6. Do you notice anything about 1, 6, 15, 28\u2026? Compare with your list of triangular numbers.", y, {
    writeLines: [{ label: "H5 =" }, { label: "H6 =" }, { label: "Connection to triangular numbers:" }],
    color: C.SECONDARY,
  });

  // Part 3: The Amazing Tn + Tn+1 Connection
  y = addSectionHeading(doc, "Part 3: A Beautiful Discovery", y, { color: C.ALERT });
  y = addBodyText(doc, "Here is something amazing: if you add two CONSECUTIVE triangular numbers, you always get a square number!", y);
  y = addBodyText(doc, "T1 + T2 = 1 + 3 = 4 = 2\u00b2\nT2 + T3 = 3 + 6 = 9 = 3\u00b2\nT3 + T4 = 6 + 10 = 16 = 4\u00b2\n\nThis works because Tn + Tn+1 = n(n+1)/2 + (n+1)(n+2)/2 = (n+1)\u00b2", y);

  y = addProblem(doc, 4, "Verify: Calculate T4 + T5, T5 + T6, and T6 + T7. Is each sum a perfect square?", y, {
    writeLines: [
      { label: "T4 + T5 =" },
      { label: "T5 + T6 =" },
      { label: "T6 + T7 =" },
      { label: "Are they all perfect squares?" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, 5, "Challenge: Can you explain in your own words WHY adding two consecutive triangular numbers always gives a square number? (Hint: think about fitting two triangles together to make a square.)", y, {
    writeLines: [{ label: "Explanation:" }],
    color: C.ALERT,
  });
  y = addLinedArea(doc, y + 5, 5);

  addPdfFooter(doc, "Session 5 of 5 | Factors & Multiples | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/EXT1_Number_Shape_Investigations.pdf");
  console.log("  EXT1 extending investigation written.");
}

build().catch(console.error);
