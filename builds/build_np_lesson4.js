// Lesson 4 of 5: Special Number Types
// Year 5/6 Mathematics — Number Properties
// Uses shared helpers from pv_helpers.js and pv_palette.js

"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");

const {
  C, FONT_H, FONT_B, STAGE_COLORS,
  SAFE_BOTTOM, CONTENT_TOP,
  withReveal,
  addTopBar, addBadge, addStageBadge, addTitle, addCard, addFooter,
  addTextOnShape,
  titleSlide, liSlide, contentSlide, workedExSlide, cfuSlide,
  exitTicketSlide, closingSlide,
  makeShadow, makeCardShadow,
} = require("../themes/pv_helpers");

const OUT_DIR = "output/NP_Lesson4_Special_Numbers";

const FOOTER = "Session 4 of 5 | Number Properties | Year 5/6 Maths";

// ---------------------------------------------------------------------------
// Teacher notes strings (kept as constants to keep build() readable)
// ---------------------------------------------------------------------------

const NOTES_TITLE = `SAY:
* "Welcome to session 4 of our Number Properties unit. Today we are going to explore four special types of numbers: prime, composite, square and triangular. By the end of the lesson you will be able to classify any number by its type and explain your reasoning."
* "Some numbers belong to more than one type — and that is one of the most interesting things we will discover today."

DO:
* Display the title slide while students settle. Have mini whiteboards and markers ready on every desk.
* Direct students' attention to the subtitle — it previews the four types they will meet.

TEACHER NOTES:
This lesson consolidates prior work on factors and primes (Sessions 1-3) and extends into square and triangular numbers. The key mathematical idea is that number types are not mutually exclusive — a number like 36 can be square, triangular, AND composite simultaneously. This multi-classification thinking develops flexibility and deeper understanding of number structure. VTLM 2.0 element: Making connections — linking factor structure to visual and sequential patterns.

Pacing: Daily Review 5 min | LI/SC 2 min | I Do (slides 5-8) 12 min | CFU 1 3 min | We Do (slides 10-11) 8 min | CFU 2 3 min | You Do 15 min | Exit Ticket 5 min | Closing 2 min.

WATCH FOR:
* Students who are unclear on factors from prior sessions — they will struggle with prime vs composite classification. Have a factors reference sheet available.
* Students who confuse "square number" with "even number" — address early in I Do.

[Maths: Stage 2 | VTLM 2.0: Making connections]`;

const NOTES_DR1 = `SAY:
* "Let's warm up our multiplication skills. These questions use strategies we have practised: halving and doubling, and rearranging factors."
* Q1: "48 times 5. Can anyone see a shortcut? Yes — halving and doubling: 48 times 10 is 480, divide by 2 gives 240."
* Q2: "125 times 16. Think about rearranging factors. 16 is 8 times 2. So 125 times 8 is 1000, times 2 is 2000."
* Q3: "36 times 25. Rearrange: 36 is 9 times 4. So 9 times 4 times 25 equals 9 times 100 equals 900."

DO:
* Write each question on the board. Give students 30 seconds per question to attempt on whiteboards before revealing the strategy.
* Cold Call a different student for each answer.

CFU CHECKPOINT:
Technique: Cold Call
Script:
* "[Name], what did you get for Q1 and what strategy did you use?" Listen for: 240, halving and doubling.
* "[Name], Q2?" Listen for: 2000, rearranging factors.
* "[Name], Q3?" Listen for: 900, rearranging factors.
PROCEED: If all three answers are correct and students can name the strategy, move on.
PIVOT: If students cannot rearrange factors, pause and model: "125 times 16 — I look for pairs that make nice numbers. 125 times 8 = 1000. So I split 16 into 8 times 2." Re-check with a new example: 25 times 12.

TEACHER NOTES:
Daily Review targets multiplication fluency — a prerequisite for identifying factors efficiently when classifying numbers later in the lesson. The three strategies (halving/doubling, rearranging factors) connect directly to the factor-based reasoning needed for prime vs composite. VTLM 2.0 element: Retrieval practice — spaced review of prior content.

WATCH FOR:
* Students who get the right answer but cannot explain the strategy — push for the explanation: "What did you do first?"
* Students who attempt long multiplication instead of using efficient strategies — redirect: "Is there a shortcut?"

[Maths: Stage 1 — Daily Review | VTLM 2.0: Retrieval practice]`;

const NOTES_DR2 = `SAY:
* "Now two questions from our previous sessions on factors and primes."
* Q4: "Express 84 as a product of its prime factors. Start with a factor tree."
* Think aloud: "84 splits into 2 times 42. 42 splits into 2 times 21. 21 splits into 3 times 7. So 84 = 2 times 2 times 3 times 7, which is 2 squared times 3 times 7."
* Q5: "Start at 128. If the number is even, halve it. How many steps to reach 1?"
* Think aloud: "128, 64, 32, 16, 8, 4, 2, 1 — that is 7 steps. Why 7? Because 128 = 2 to the power of 7."

DO:
* For Q4, draw the factor tree on the board step by step.
* For Q5, have students track the steps on their whiteboards. Count together as a class.

CFU CHECKPOINT:
Technique: Cold Call
Script:
* "[Name], what prime factors did you find for 84?" Listen for: 2 squared times 3 times 7.
* "[Name], how many halving steps from 128 to 1?" Listen for: 7 steps.
PROCEED: If students can decompose into primes and track the halving process, move to LI/SC.
PIVOT: If students struggle with factor trees, briefly re-model with a simpler number (e.g., 36 = 2 squared times 3 squared) before moving on. Flag these students for enabling support during We Do/You Do.

TEACHER NOTES:
Q4 retrieves prime factorisation from Session 3. Q5 is a reasoning extension — it connects halving to powers of 2, which primes students for recognising that 128 has only one prime factor (2). This sets up today's discussion of composite numbers having multiple prime factors vs numbers like 128 that are composite but have only one prime factor. VTLM 2.0 element: Retrieval practice — prior session content.

WATCH FOR:
* Students who list 84 = 2 times 42 but do not continue decomposing 42 — remind them: "Is 42 prime? No — keep splitting."
* Students who count the starting number as a step in Q5 — clarify: we count halvings, not numbers.

[Maths: Stage 1 — Daily Review | VTLM 2.0: Retrieval practice]`;

const NOTES_LISC = `SAY:
* "Here are our Learning Intentions and Success Criteria for today."
* Read the LI aloud. Then read each SC and briefly explain: (1) sorting means being able to test a number and decide which category, (2) square and triangular numbers have specific patterns, (3) some numbers belong to more than one type.

DO:
* Point to each criterion as you read it.
* Leave this slide up briefly for students to note the criteria if required.

TEACHER NOTES:
Sharing learning intentions explicitly activates students' metacognitive awareness. The three SC map to increasing complexity: identification (SC1), pattern recognition (SC2), and multi-classification with justification (SC3). Returning to these criteria at the exit ticket creates a closing loop. VTLM 2.0 element: Making Learning Visible.

WATCH FOR:
* Students who hear "triangular numbers" and think of geometry (triangles as shapes) rather than number patterns — briefly preview: "Triangular numbers are about counting patterns, not shapes — although we CAN show them with dots in a triangle."

[Maths: Stage 2 | VTLM 2.0: Making Learning Visible]`;

const NOTES_PRIME_RECAP = `SAY:
* "Before we meet new number types, let's lock in what we already know about primes and composites."
* "A prime number has EXACTLY 2 factors — 1 and itself. A composite number has MORE than 2 factors."
* "What about 1? It has only ONE factor — just 1. So 1 is NEITHER prime NOR composite. This is a crucial distinction."
* Point to the number grid on the right: "Look at the numbers 1 to 30. The coloured numbers are prime. Notice how they thin out as numbers get larger — but they never disappear entirely."

DO:
* Point to the grid and identify the primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.
* Ask: "What do you notice about 2?" — it is the ONLY even prime number.
* Have students count the primes from 1-30 (there are 10).

TEACHER NOTES:
This recap slide consolidates Sessions 1-3 and establishes the vocabulary foundation for today's extension into square and triangular numbers. The number grid visual is a simplified Sieve of Eratosthenes. The key teaching point about 1 being neither prime nor composite is essential — it prevents the most common misconception. Emphasising that 2 is the only even prime forestalls the misconception "all even numbers are composite." VTLM 2.0 element: Connecting to prior learning.

MISCONCEPTIONS:
* Misconception: "1 is prime because its only factors are 1 and itself."
  Why: Students interpret "1 and itself" as two factors, not realising that when the number IS 1, those are the same factor.
  Impact: Affects factor counting and prime factorisation throughout the unit.
  Quick correction: "How many DIFFERENT factors does 1 have? Just one — the number 1. Prime needs EXACTLY 2 different factors."

* Misconception: "All even numbers are composite."
  Why: Students overgeneralise from examples like 4, 6, 8, 10.
  Impact: Students incorrectly classify 2 as composite.
  Quick correction: "What are the factors of 2? Just 1 and 2 — exactly 2 factors. So 2 IS prime. It is the only even prime."

ENABLING & EXTENDING:
* Enabling: Provide a printed 1-30 number chart. Students circle numbers with exactly 2 factors.
* Extending: "How many primes are there between 30 and 50? Can you predict where they are?"

WATCH FOR:
* Students who include 1 in their list of primes — correct immediately with the "exactly 2 different factors" rule.
* Students who say 9 is prime — prompt: "What is 3 times 3?"

[Maths: Stage 2 — I Do, prime/composite recap | VTLM 2.0: Connecting to prior learning]`;

const NOTES_SQUARE = `SAY:
* "Now let's meet our first new number type: square numbers."
* "A square number is what you get when you multiply a whole number by itself. 3 times 3 equals 9, so 9 is a square number. We write it as 3 squared, or 3 to the power of 2."
* "Look at the dot array on the right — 9 dots arranged in a 3-by-3 square. That is why we call them SQUARE numbers — they literally make a square shape."
* "The first 10 square numbers are 1, 4, 9, 16, 25, 36, 49, 64, 81, 100."
* "Notice something about the gaps between consecutive square numbers: 1, 3, 5, 7, 9, 11... the differences are consecutive odd numbers! This is not a coincidence — it is a deep pattern."

DO:
* Point to each dot array as you explain. Show how 3 times 3 makes a 3-by-3 grid.
* Write the sequence on the board with differences between terms: 1 (+3) 4 (+5) 9 (+7) 16 (+9) 25...
* Have students predict: "What comes after 100? 11 times 11 = 121."

TEACHER NOTES:
Square numbers connect multiplication to visual geometry. The dot array representation makes the concept concrete — students can literally SEE why these are called "square" numbers. The pattern of consecutive odd differences (1, 3, 5, 7...) is algebraically beautiful: (n+1) squared minus n squared = 2n+1 (always odd). This pattern is worth highlighting but does not need formal proof at this level. The visual is the argument. VTLM 2.0 element: Multiple representations — symbolic (n squared), visual (dot array), sequential (pattern).

MISCONCEPTIONS:
* Misconception: "Square root is always a whole number."
  Why: Students encounter sqrt(9)=3, sqrt(16)=4 and assume all square roots are integers.
  Impact: When asked "Is 20 a square number?" students may try to force a whole-number root.
  Quick correction: "What number times itself gives 20? 4 times 4 = 16, 5 times 5 = 25. Since 20 is between two perfect squares and no whole number works, 20 is NOT a square number."

ENABLING & EXTENDING:
* Enabling: Provide dot grid paper. Students physically draw squares for 2 times 2, 3 times 3, 4 times 4.
* Extending: "Can a square number also be prime? Find an example or explain why not." (Only 1 squared = 1, and 1 is not prime. Every other square n squared where n >= 2 has at least 3 factors: 1, n, n squared.)

WATCH FOR:
* Students who confuse "square number" with "even number" — 9, 25, 49 are square but odd.
* Students who cannot generate the sequence beyond what is shown — prompt with: "What is 7 times 7?"

[Maths: Stage 2 — I Do, square numbers | VTLM 2.0: Multiple representations]`;

const NOTES_TRIANGULAR = `SAY:
* "Our second new number type is triangular numbers. These are built by adding one more each time."
* "Start with 1. Add 2 to get 3. Add 3 to get 6. Add 4 to get 10. Each time, we add the next counting number."
* "Look at the dot triangle on the right — row 1 has 1 dot, row 2 has 2 dots, row 3 has 3 dots, row 4 has 4 dots. Total: 1 + 2 + 3 + 4 = 10. That is the 4th triangular number."
* "The sequence is: 1, 3, 6, 10, 15, 21, 28, 36, 45, 55."
* "Notice 36 is in BOTH lists — it is square (6 times 6) AND triangular (1+2+3+4+5+6+7+8). Numbers can be multi-talented!"

DO:
* Build the triangle on the board dot by dot: row 1 (1 dot), row 2 (2 dots), row 3 (3 dots), row 4 (4 dots).
* Count the cumulative totals: 1, 3, 6, 10.
* Write the differences under the sequence: +2, +3, +4, +5, +6... (increases by 1 each time, compared to square numbers which increase by consecutive odds).

TEACHER NOTES:
Triangular numbers are less familiar than square numbers to most students, so the visual representation is critical. The staircase/triangle of dots makes the additive pattern tangible. Comparing the growth pattern to square numbers (differences increase by 1 vs by 2) deepens understanding of both types. Highlighting that 36 appears in both sequences foreshadows the worked example and the key lesson idea that number types overlap. VTLM 2.0 element: Concrete-Representational — dot patterns make abstract sequences visible.

ENABLING & EXTENDING:
* Enabling: Provide counters. Students physically build triangles for T1 through T5.
* Extending: "Two consecutive triangular numbers always add up to a square number. Check this: T3 + T4 = 6 + 10 = 16 = 4 squared. Try T4 + T5. Does the pattern hold?"

WATCH FOR:
* Students who confuse the sequence position with the value — "the 4th triangular number is 4" instead of 10.
* Students who add incorrectly in the cumulative sums — have them write each addition step.

[Maths: Stage 2 — I Do, triangular numbers | VTLM 2.0: Concrete-Representational]`;

const NOTES_WORKED_EX = `SAY:
* "Now I am going to show you how to classify a number systematically. Let's investigate 36."
* Think aloud: "First test — is it a square number? I ask: is there a whole number times itself that gives 36? Yes — 6 times 6 = 36. So 36 IS a square number."
* "Second test — is it a triangular number? I need to check if 36 equals 1+2+3+...+n for some n. Let me add: 1+2=3, +3=6, +4=10, +5=15, +6=21, +7=28, +8=36. Yes! It is the 8th triangular number."
* "Third test — is it prime or composite? 36 = 2 squared times 3 squared. It has factors 1, 2, 3, 4, 6, 9, 12, 18, 36 — that is 9 factors. Way more than 2. So it is composite."
* "Conclusion: 36 is square AND triangular AND composite. Numbers can belong to MORE THAN ONE type!"

DO:
* Write each test on the board as you think aloud. Use "I think... I test... I conclude..." language.
* Draw a mini Venn diagram showing 36 in the overlap of square, triangular, and composite.

TEACHER NOTES:
The systematic testing approach (check each type in turn) is the transferable skill. Students need to see that classification is not about guessing — it is about applying definitions methodically. The think-aloud makes the metacognitive process visible: name the test, apply it, state the result. 36 is ideal because it belongs to three types, reinforcing the key lesson idea. The factor decomposition (2 squared times 3 squared) also connects back to Session 3 on prime factorisation. VTLM 2.0 element: Metacognitive strategy — systematic classification via think-aloud.

MISCONCEPTIONS:
* Misconception: "If a number is square, it cannot be anything else."
  Why: Students think categories are mutually exclusive, like odd/even.
  Impact: Students stop testing after finding the first type.
  Quick correction: "Odd and even are exclusive — a number cannot be both. But prime/composite/square/triangular are different tests. Always check ALL types."

WATCH FOR:
* Students who accept that 36 is square but do not check the other types — model the discipline of testing every type.
* Students who struggle with the cumulative addition for triangular — provide the running total: 1, 3, 6, 10, 15, 21, 28, 36.

[Maths: Stage 2 — I Do, worked example | VTLM 2.0: Metacognitive strategies]`;

const NOTES_CFU1 = `SAY:
* "Quick check. I am going to show you a question about 25. Read all four options carefully, then vote with your fingers: 1 for A, 2 for B, 3 for C, 4 for D."
* After voting: "The answer is C — square AND composite."
* "25 is 5 times 5, so it is a square number. Its factors are 1, 5, and 25 — that is 3 factors, so it is composite. It is NOT prime because it has more than 2 factors."

DO:
* Display the question. Give students 15 seconds to think, then call: "Fingers up in 3, 2, 1 — vote!"
* Scan the room quickly. Note which option students choose.
* After reveal, ask a student who voted correctly: "Explain why 25 is NOT prime."

CFU CHECKPOINT:
Technique: Finger Voting
Script:
* "Fingers up — 1 for A, 2 for B, 3 for C, 4 for D. 3, 2, 1 — vote!"
* Look for: majority showing 3 fingers (option C).
* Common errors: D (students think 5 times 5 means it is "special" and therefore prime) or B (students forget to check if it is also composite).
PROCEED: If >= 80% vote C and can explain the reasoning, transition to We Do.
PIVOT: If students choose D — they think a number that is a perfect square is automatically prime. Reteach: "List ALL the factors of 25: 1, 5, 25. That is THREE factors. Prime needs EXACTLY 2. Three is more than 2, so 25 is composite." Then re-check: "Is 49 prime? Factors: 1, 7, 49 — three factors — composite."

TEACHER NOTES:
This hinge question is diagnostic for two key understandings: (1) can students identify 25 as a square number, and (2) do they understand that being square does not make a number prime. Option D is the key distractor — it tests whether students conflate "special" with "prime." The finger voting technique allows rapid whole-class scanning. VTLM 2.0 element: Formative assessment — hinge question.

WATCH FOR:
* Students who vote A (just prime) — they may think 5 is the only factor because 5 times 5 = 25. Remind them that 1 and 25 are also factors.
* Students who hesitate between C and D — they know it is square but are unsure about prime vs composite.

[Maths: Stage 2 — CFU hinge | VTLM 2.0: Formative assessment]`;

const NOTES_SORT = `SAY:
* "Now it is your turn with your partner. Here are seven numbers: 7, 9, 10, 15, 16, 21, 23."
* "Sort them into four columns: Prime, Composite, Square, Triangular. Some numbers will appear in more than one column!"
* "With your partner, work through each number systematically — just like I did with 36. Test each type."
* After 3 minutes: "Let's check. Who has a number that appears in more than one column?"

DO:
* Give partners 3 minutes to sort all seven numbers.
* Circulate and check: Are students testing each type for each number?
* After sorting, build the class answer on the board column by column.

TEACHER NOTES:
The sorting task requires students to apply all four definitions from the I Do phase. The deliberate inclusion of overlapping numbers (9 = square + composite, 10 = triangular + composite, 15 = triangular + composite, 16 = square + composite, 21 = triangular + composite) means students cannot avoid multi-classification. 7 and 23 are prime only, providing clean single-category examples for contrast. The partner work provides peer scaffolding — students can check each other's factor lists. VTLM 2.0 element: Collaborative learning.

Answer key:
* 7: Prime
* 9: Square (3x3), Composite (factors: 1,3,9)
* 10: Triangular (1+2+3+4), Composite (factors: 1,2,5,10)
* 15: Triangular (1+2+3+4+5), Composite (factors: 1,3,5,15)
* 16: Square (4x4), Composite (factors: 1,2,4,8,16)
* 21: Triangular (1+2+3+4+5+6), Composite (factors: 1,3,7,21)
* 23: Prime

ENABLING & EXTENDING:
* Enabling (6-12 months behind): Provide a factors checklist — for each number, list its factors first, then decide prime/composite. Use counters to build dot squares/triangles.
* Extending (6-12 months ahead): "Find a number less than 100 that is BOTH square AND triangular. Is there one besides 1 and 36?" (Answer: 1 and 36 are the only ones below 100.)

WATCH FOR:
* Students who put 7 under "composite" — they may be miscounting factors. Prompt: "List the factors of 7."
* Students who miss that 9 is a square number — prompt: "What times what equals 9?"

[Maths: Stage 3 — We Do, sorting | VTLM 2.0: Collaborative learning]`;

const NOTES_PATTERN_HUNT = `SAY:
* "Here is a claim from a student: 'All square numbers are also composite numbers.' Discuss with your partner — is this ALWAYS true?"
* After Think-Pair-Share: "What did you decide?"
* Reveal: "Not always! 1 is a square number — 1 times 1 equals 1 — but 1 is NEITHER prime NOR composite. It has only one factor."
* "Every OTHER square number IS composite: 4, 9, 16, 25... they all have at least 3 factors (1, the root, and the square). So the claim is ALMOST true, but 1 is the exception."

DO:
* Give partners 60 seconds to discuss. Circulate and listen for reasoning.
* After reveal, write on the board: "All square numbers except 1 are composite."
* Challenge: "Why must every square number n squared (where n >= 2) be composite? Because it always has at least 3 factors: 1, n, and n squared."

CFU CHECKPOINT:
Technique: Think-Pair-Share
Script:
* "Think for 15 seconds." [pause] "Share with your partner for 45 seconds." [pause]
* "Hands up if you and your partner found a counterexample."
* Listen for: "1 is a square number but not composite."
PROCEED: If at least one pair identifies 1 as the exception, confirm and generalise.
PIVOT: If no pair finds the exception, hint: "What is the very first square number? 1 times 1 = 1. Is 1 composite?" Then re-check understanding: "So is the claim always true?"

TEACHER NOTES:
This pattern hunt develops critical mathematical thinking — the ability to evaluate a conjecture by seeking counterexamples. The claim is deliberately close to true (all square numbers >= 4 are composite) to make the task challenging. Finding the single exception (1) requires students to check boundary cases, which is an important mathematical habit. The follow-up reasoning ("why must n squared for n >= 2 be composite?") pushes toward generalisation. VTLM 2.0 element: Mathematical reasoning — conjecturing and counterexamples.

WATCH FOR:
* Students who say "4 is a counterexample because 4 = 2 times 2 and 2 is prime" — they are confusing the number with its root. Clarify: "Is 4 itself composite? Yes — factors 1, 2, 4."
* Students who confidently say "yes, always true" without checking 1 — prompt: "Did you check EVERY square number, starting from the smallest?"

[Maths: Stage 3 — We Do, pattern hunt | VTLM 2.0: Mathematical reasoning]`;

const NOTES_CFU2 = `SAY:
* "Show Me Boards time. Write a number that is BOTH triangular AND composite. Then write WHY it fits both types."
* After boards up: "Let's see what you found."
* Reveal: "Many answers work! 6 is triangular (1+2+3) and composite (2 times 3). 10 is triangular (1+2+3+4) and composite (2 times 5). Also 15, 21, 28..."
* "Did anyone find 3? That is triangular (1+2+3... wait, 1+2=3, yes) but 3 is PRIME, not composite. So 3 does NOT fit both."

DO:
* Give students 45 seconds to think and write. Then: "Boards up — Show Me!"
* Scan boards for correct answers AND correct justifications.
* Highlight a student who gave a clear explanation.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
* "Boards up in 3, 2, 1 — Show Me!"
* Scan left-to-right. Look for: a correct triangular number that is also composite, with some form of justification.
* Common correct answers: 6, 10, 15, 21, 28, 36, 45, 55.
* If a student writes 3: "Is 3 composite? Let's check — factors are 1 and 3. That is exactly 2 factors — so 3 is prime, not composite. Good try though — 3 IS triangular."
PROCEED: If >= 75% show a valid answer with reasoning, move to You Do.
PIVOT: If students cannot find any triangular-composite number, scaffold: "Here are the triangular numbers: 1, 3, 6, 10, 15... Which of these have MORE than 2 factors?" Students can then test each in turn. Re-check with boards.

TEACHER NOTES:
This CFU requires students to apply two definitions simultaneously and justify their answer — it directly assesses SC3 (determine which types a number belongs to and justify reasoning). The open-ended format (any valid answer) means students cannot simply guess or copy — they must demonstrate understanding. Watching for 3 as an error is important: it tests whether students remember to check ALL criteria, not just one. VTLM 2.0 element: Formative assessment — Show Me Boards with justification.

WATCH FOR:
* Students who write a square number instead of a triangular one — they may be confusing the two types. Redirect: "Is your number in the triangular sequence: 1, 3, 6, 10, 15, 21...?"
* Students who write a correct number but cannot justify — prompt: "Show me the addition that makes it triangular AND list its factors to show it is composite."

[Maths: Stage 3 — CFU hinge | VTLM 2.0: Formative assessment]`;

const NOTES_YOUDO = `SAY:
* "Time for independent investigation. You have three tasks — First, Next, Then — plus a challenge if you finish early."
* "First: list the first 10 square numbers and the first 8 triangular numbers."
* "Next: circle any numbers that appear in BOTH lists."
* "Then: pick 3 numbers from your lists. For each one, write which types it belongs to — prime, composite, square, triangular — and explain your reasoning."
* "Challenge: Can a prime number also be triangular? Find an example or explain why not."
* "Work independently. You have 15 minutes."

DO:
* Set a visible timer for 15 minutes.
* Circulate continuously — target students who struggled during We Do first.
* For enabling students: provide the square number sequence (1, 4, 9, 16, 25, 36, 49, 64, 81, 100) as a scaffold.
* For extending students: direct them to the challenge immediately.

TEACHER NOTES:
The three-step structure (list, compare, classify) scaffolds the investigation from procedural (listing sequences) to analytical (finding overlaps) to reasoning (multi-classification with justification). The challenge question ("Can a prime be triangular?") has a definitive answer: yes — 2 is not triangular, but 3 IS both prime and triangular (1+2=3, and 3 has exactly 2 factors). This is a satisfying discovery for students who reach it. VTLM 2.0 element: Differentiated practice — enabling and extending.

ENABLING & EXTENDING:
* Enabling (6-12 months behind): Provide the sequences pre-printed. Students focus on the classification task (Then) with only 2 numbers instead of 3. Use a classification flowchart: "Does it have exactly 2 factors? Yes = prime. No = composite. Is it n times n? Yes = square. Is it 1+2+3+...? Yes = triangular."
* Extending (6-12 months ahead): Investigate perfect numbers — numbers that equal the sum of their proper factors (e.g., 6 = 1+2+3, 28 = 1+2+4+7+14). Notice these are also triangular. Is this always true?

WATCH FOR:
* Students who list square numbers incorrectly (e.g., including 2 or 8) — they may be confusing "even" with "square." Redirect: "A square number is n times n. Is 8 equal to some number times itself?"
* Students who cannot find the overlap between lists — prompt: "Read through both lists slowly. Is any number on both?"

[Maths: Stage 4 — You Do | VTLM 2.0: Differentiated practice]`;

const NOTES_EXIT = `SAY:
* "Pens down on your investigation. Exit ticket time — three questions, five minutes."
* Read each question aloud.
* "Work silently and independently. Show your reasoning."
* After collection: "Well done today. We discovered that numbers can be multi-talented — belonging to more than one type."

DO:
* Collect workbooks immediately after the exit ticket. Mark tonight to inform Session 5 groupings.
* Q1 assesses SC1 + SC3 (square + composite with explanation).
* Q2 assesses SC2 (triangular number generation).
* Q3 assesses SC3 (multi-classification with justification).

TEACHER NOTES:
The exit ticket directly measures all three success criteria. Q1 (name a square-composite number and explain) is accessible — any student who understood the I Do should manage this. Q2 (7th triangular number: 1+2+3+4+5+6+7 = 28) tests whether students can generate the sequence, not just recognise it. Q3 (classify 49: 7 squared = square, factors 1/7/49 = composite, not triangular) requires multi-classification. Mark with three categories: secure (all 3 correct with reasoning), developing (2 correct or 3 correct without reasoning), not yet (0-1 correct). VTLM 2.0 element: Summative-formative assessment.

WATCH FOR:
* Students who answer Q1 with 4 but cannot explain why it is composite — they know the answer but not the reasoning. Flag for explicit instruction on factor listing in Session 5.
* Students who add incorrectly for Q2 — arithmetic errors vs conceptual errors. Mark differently.
* Students who say 49 is prime — they have not checked for factors other than 1 and 49. Flag for reteaching.

[Maths: Stage 5 — Exit Ticket | VTLM 2.0: Summative-formative assessment]`;

const NOTES_CLOSING = `SAY:
* "Turn and Talk with your partner: If I tell you a number is prime, can it also be a square number? Why or why not?"
* After 30 seconds: "Who wants to share?"
* Guide toward: "No — except for the edge case of 1 (which is not prime anyway). Any square number n squared where n >= 2 has at least 3 factors (1, n, n squared), so it must be composite, not prime."
* "Today's key takeaways: numbers can belong to multiple types. Square numbers grow with increasing odd gaps. Triangular numbers grow by adding one more each time."

DO:
* Give 30 seconds for Turn & Talk, then cold-call a pair.
* Summarise the key points on the board.
* Preview Session 5: "Next time we will put everything together — using all the number properties we have learned to solve problems and investigate patterns."

TEACHER NOTES:
The closing question ties together today's two big ideas: multi-classification and the relationship between prime and square. The answer requires deductive reasoning — if n squared has factors 1, n, and n squared, then for n >= 2 it has at least 3 factors and cannot be prime. This is a genuine mathematical argument accessible to Year 5/6 students. The key takeaway points reinforce the growth patterns (square: odd differences; triangular: unit differences) which will be extended in Session 5. VTLM 2.0 element: Reflection and consolidation.

WATCH FOR:
* Students who say "yes, because 1 is both" — redirect: "Is 1 prime? No — it has only 1 factor. Prime needs exactly 2."
* Students who struggle to articulate the reasoning — scaffold: "If n times n = a square number, what are its factors? 1, n, and n squared. How many is that?"

[Maths: Closing | VTLM 2.0: Reflection and consolidation]`;

// ---------------------------------------------------------------------------
// Build function
// ---------------------------------------------------------------------------

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Year 5/6 Maths";
  pres.title = "Session 4: Special Number Types";

  // == Slide 1: Title ========================================================
  titleSlide(
    pres,
    "Special Number Types",
    "Prime, composite, square and triangular numbers",
    "Year 5/6 | Number Properties | Session 4 of 5",
    NOTES_TITLE
  );

  // == Slide 2: Daily Review — multiplication strategies (Stage 1) ===========
  contentSlide(
    pres,
    1,
    "Daily Review",
    "Multiplication and Division Strategies",
    [
      "Q1: 48 \u00D7 5 using halving and doubling",
      "Q2: 125 \u00D7 16 by rearranging factors",
      "Q3: 36 \u00D7 25 by rearranging factors",
    ],
    NOTES_DR1,
    FOOTER,
    (s) => {
      // Right side: answer cards stacked vertically
      const answers = [
        { q: "Q1", work: "48 \u00D7 10 \u00F7 2", ans: "240", color: C.CORAL },
        { q: "Q2", work: "125 \u00D7 8 \u00D7 2", ans: "2 000", color: C.NAVY },
        { q: "Q3", work: "9 \u00D7 4 \u00D7 25", ans: "900", color: C.TEAL },
      ];
      answers.forEach((item, i) => {
        const cy = CONTENT_TOP + i * 1.15;
        addCard(s, 5.2, cy, 4.3, 1.0, { strip: item.color });
        s.addText(item.q, {
          x: 5.45, y: cy + 0.08, w: 1.0, h: 0.3,
          fontSize: 12, fontFace: FONT_H, color: item.color, bold: true, margin: 0,
        });
        s.addText(item.work, {
          x: 6.3, y: cy + 0.08, w: 2.9, h: 0.3,
          fontSize: 11, fontFace: FONT_B, color: C.MUTED, margin: 0,
        });
        addTextOnShape(s, item.ans, {
          x: 5.45, y: cy + 0.45, w: 3.8, h: 0.42, rectRadius: 0.08,
          fill: { color: item.color },
        }, {
          fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true,
        });
      });
    }
  );

  // == Slide 3: Daily Review — prior topics (Stage 1) ========================
  contentSlide(
    pres,
    1,
    "Daily Review",
    "Prior Sessions: Factors and Primes",
    [
      "Q4: Express 84 as a product of its prime factors",
      "Q5: Start at 128. If even, halve. How many steps to reach 1?",
    ],
    NOTES_DR2,
    FOOTER,
    (s) => {
      // Right side: answer cards
      const cardY1 = CONTENT_TOP + 0.1;
      addCard(s, 5.2, cardY1, 4.3, 1.5, { strip: C.NAVY });
      s.addText("Q4 Answer", {
        x: 5.45, y: cardY1 + 0.08, w: 3.8, h: 0.3,
        fontSize: 12, fontFace: FONT_H, color: C.NAVY, bold: true, margin: 0,
      });
      addTextOnShape(s, "2\u00B2 \u00D7 3 \u00D7 7", {
        x: 5.45, y: cardY1 + 0.45, w: 3.8, h: 0.5, rectRadius: 0.08,
        fill: { color: C.NAVY },
      }, {
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      s.addText("84 = 2 \u00D7 42 = 2 \u00D7 2 \u00D7 21 = 2 \u00D7 2 \u00D7 3 \u00D7 7", {
        x: 5.45, y: cardY1 + 1.0, w: 3.8, h: 0.35,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });

      const cardY2 = cardY1 + 1.7;
      addCard(s, 5.2, cardY2, 4.3, 1.5, { strip: C.TEAL });
      s.addText("Q5 Answer", {
        x: 5.45, y: cardY2 + 0.08, w: 3.8, h: 0.3,
        fontSize: 12, fontFace: FONT_H, color: C.TEAL, bold: true, margin: 0,
      });
      addTextOnShape(s, "7 steps", {
        x: 5.45, y: cardY2 + 0.45, w: 3.8, h: 0.5, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      s.addText("128 \u2192 64 \u2192 32 \u2192 16 \u2192 8 \u2192 4 \u2192 2 \u2192 1", {
        x: 5.45, y: cardY2 + 1.0, w: 3.8, h: 0.35,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });
    }
  );

  // == Slide 4: LI & SC =====================================================
  liSlide(
    pres,
    [
      "We are learning to identify and describe the properties of prime, composite, square and triangular numbers so we can recognise patterns and solve problems.",
    ],
    [
      "I can sort numbers into prime and composite and explain the difference.",
      "I can identify square and triangular numbers and describe how they are formed.",
      "I can determine which types a given number belongs to and justify my reasoning.",
    ],
    NOTES_LISC,
    FOOTER
  );

  // == Slide 5: Prime vs Composite Recap (I Do — Stage 2) ===================
  contentSlide(
    pres,
    2,
    "Explicit Instruction \u2014 I Do",
    "Prime vs Composite \u2014 Quick Recap",
    [
      "Prime = exactly 2 factors (1 and itself)",
      "Composite = more than 2 factors",
      "1 is NEITHER prime NOR composite (only 1 factor)",
      "2 is the ONLY even prime number",
      "Primes 1\u201330: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29",
    ],
    NOTES_PRIME_RECAP,
    FOOTER,
    (s) => {
      // Right side: mini number grid 1-30 with primes highlighted
      const primes = new Set([2,3,5,7,11,13,17,19,23,29]);
      const gridX = 5.6;
      const gridY = CONTENT_TOP + 0.1;
      const cellSize = 0.52;
      const cols = 6;

      // Grid title
      s.addText("Numbers 1\u201330", {
        x: gridX, y: gridY - 0.32, w: cols * cellSize, h: 0.3,
        fontSize: 11, fontFace: FONT_H, color: C.NAVY, bold: true, margin: 0, align: "center",
      });

      for (let n = 1; n <= 30; n++) {
        const row = Math.floor((n - 1) / cols);
        const col = (n - 1) % cols;
        const cx = gridX + col * cellSize;
        const cy = gridY + row * cellSize;
        const isPrime = primes.has(n);
        const isOne = n === 1;

        s.addShape("roundRect", {
          x: cx + 0.02, y: cy + 0.02, w: cellSize - 0.04, h: cellSize - 0.04,
          rectRadius: 0.06,
          fill: { color: isPrime ? C.NAVY : (isOne ? C.AMBER : C.WHITE) },
          line: { color: isPrime ? C.NAVY : (isOne ? C.AMBER : C.LIGHT), width: 1 },
        });
        s.addText(String(n), {
          x: cx + 0.02, y: cy + 0.02, w: cellSize - 0.04, h: cellSize - 0.04,
          fontSize: 12, fontFace: FONT_H,
          color: (isPrime || isOne) ? C.WHITE : C.CHARCOAL,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
      }

      // Legend below grid
      const legendY = gridY + 5 * cellSize + 0.1;
      // Prime legend
      s.addShape("roundRect", {
        x: gridX, y: legendY, w: 0.28, h: 0.28, rectRadius: 0.06,
        fill: { color: C.NAVY },
      });
      s.addText("Prime", {
        x: gridX + 0.35, y: legendY, w: 1.0, h: 0.28,
        fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
      });
      // Neither legend
      s.addShape("roundRect", {
        x: gridX + 1.5, y: legendY, w: 0.28, h: 0.28, rectRadius: 0.06,
        fill: { color: C.AMBER },
      });
      s.addText("Neither", {
        x: gridX + 1.85, y: legendY, w: 1.2, h: 0.28,
        fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
      });
    }
  );

  // == Slide 6: Square Numbers (I Do — Stage 2) ==============================
  contentSlide(
    pres,
    2,
    "Explicit Instruction \u2014 I Do",
    "Square Numbers",
    [
      "A square number = a number multiplied by itself (n \u00D7 n = n\u00B2)",
      "Example: 3\u00B2 = 3 \u00D7 3 = 9",
      "The first 10: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100",
      "Differences: +3, +5, +7, +9, +11... (consecutive odd numbers!)",
    ],
    NOTES_SQUARE,
    FOOTER,
    (s) => {
      // Right side: dot arrays showing 3x3=9 and 4x4=16
      const dotSize = 0.18;
      const dotR = 0.09;
      const dotGap = 0.06;
      const startX = 5.8;

      // 3x3 = 9 label
      s.addText("3\u00B2 = 9", {
        x: startX, y: CONTENT_TOP + 0.0, w: 1.8, h: 0.35,
        fontSize: 14, fontFace: FONT_H, color: C.NAVY, bold: true, margin: 0, align: "center",
      });

      // 3x3 dot grid
      const grid3Y = CONTENT_TOP + 0.4;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          s.addShape("roundRect", {
            x: startX + 0.38 + c * (dotSize + dotGap),
            y: grid3Y + r * (dotSize + dotGap),
            w: dotSize, h: dotSize, rectRadius: dotR,
            fill: { color: C.NAVY },
          });
        }
      }

      // 4x4 = 16 label
      const block4X = 7.2;
      s.addText("4\u00B2 = 16", {
        x: block4X, y: CONTENT_TOP + 0.0, w: 2.2, h: 0.35,
        fontSize: 14, fontFace: FONT_H, color: C.TEAL, bold: true, margin: 0, align: "center",
      });

      // 4x4 dot grid
      const grid4Y = CONTENT_TOP + 0.4;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          s.addShape("roundRect", {
            x: block4X + 0.22 + c * (dotSize + dotGap),
            y: grid4Y + r * (dotSize + dotGap),
            w: dotSize, h: dotSize, rectRadius: dotR,
            fill: { color: C.TEAL },
          });
        }
      }

      // 5x5 = 25 label (smaller, below)
      const block5X = 5.8;
      const block5LabelY = CONTENT_TOP + 1.55;
      s.addText("5\u00B2 = 25", {
        x: block5X, y: block5LabelY, w: 3.6, h: 0.35,
        fontSize: 14, fontFace: FONT_H, color: C.CORAL, bold: true, margin: 0, align: "center",
      });

      // 5x5 dot grid
      const grid5Y = block5LabelY + 0.38;
      const smallDot = 0.16;
      const smallR = 0.08;
      const smallGap = 0.04;
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          s.addShape("roundRect", {
            x: block5X + 0.85 + c * (smallDot + smallGap),
            y: grid5Y + r * (smallDot + smallGap),
            w: smallDot, h: smallDot, rectRadius: smallR,
            fill: { color: C.CORAL },
          });
        }
      }

      // Key insight box
      addTextOnShape(s, "n \u00D7 n = n\u00B2 = square number", {
        x: 5.6, y: SAFE_BOTTOM - 0.65, w: 3.9, h: 0.5, rectRadius: 0.08,
        fill: { color: C.NAVY },
      }, {
        fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // == Slide 7: Triangular Numbers (I Do — Stage 2) =========================
  contentSlide(
    pres,
    2,
    "Explicit Instruction \u2014 I Do",
    "Triangular Numbers",
    [
      "Built by adding one more each time: 1, 1+2, 1+2+3, ...",
      "The sequence: 1, 3, 6, 10, 15, 21, 28, 36, 45, 55",
      "Each triangular number adds the next counting number",
      "Differences: +2, +3, +4, +5, +6... (increases by 1 each time)",
    ],
    NOTES_TRIANGULAR,
    FOOTER,
    (s) => {
      // Right side: dot triangles showing T4 = 10
      const dotSize = 0.18;
      const dotR = 0.09;
      const dotGap = 0.06;
      const triX = 6.2;
      const triY = CONTENT_TOP + 0.1;

      s.addText("T\u2084 = 10", {
        x: 5.6, y: triY - 0.05, w: 3.9, h: 0.35,
        fontSize: 16, fontFace: FONT_H, color: C.TEAL, bold: true, margin: 0, align: "center",
      });

      // Build triangle: row 1 = 1 dot, row 2 = 2 dots, row 3 = 3 dots, row 4 = 4 dots
      const rows = [1, 2, 3, 4];
      const maxCols = 4;
      const triStartY = triY + 0.4;

      rows.forEach((numDots, rowIdx) => {
        // Centre each row relative to the widest row (4 dots)
        const rowWidth = numDots * dotSize + (numDots - 1) * dotGap;
        const maxWidth = maxCols * dotSize + (maxCols - 1) * dotGap;
        const offsetX = (maxWidth - rowWidth) / 2;

        for (let c = 0; c < numDots; c++) {
          s.addShape("roundRect", {
            x: triX + offsetX + c * (dotSize + dotGap),
            y: triStartY + rowIdx * (dotSize + dotGap),
            w: dotSize, h: dotSize, rectRadius: dotR,
            fill: { color: C.TEAL },
          });
        }
      });

      // Row labels on the right
      const labelX = triX + maxCols * (dotSize + dotGap) + 0.15;
      const runningTotals = [1, 3, 6, 10];
      rows.forEach((numDots, rowIdx) => {
        s.addText("+" + numDots + " = " + runningTotals[rowIdx], {
          x: labelX, y: triStartY + rowIdx * (dotSize + dotGap) - 0.02,
          w: 1.2, h: dotSize + 0.04,
          fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0, valign: "middle",
        });
      });

      // T6 = 21 — a smaller second triangle
      const tri2Y = triStartY + 4 * (dotSize + dotGap) + 0.3;
      s.addText("T\u2086 = 21", {
        x: 5.6, y: tri2Y - 0.05, w: 3.9, h: 0.32,
        fontSize: 14, fontFace: FONT_H, color: C.CORAL, bold: true, margin: 0, align: "center",
      });

      const smallDot = 0.14;
      const smallR = 0.07;
      const smallGap = 0.03;
      const tri2StartY = tri2Y + 0.3;
      const tri2X = 6.4;
      const maxCols2 = 6;

      for (let rowIdx = 0; rowIdx < 6; rowIdx++) {
        const numDots = rowIdx + 1;
        const rowWidth = numDots * smallDot + (numDots - 1) * smallGap;
        const maxWidth = maxCols2 * smallDot + (maxCols2 - 1) * smallGap;
        const offsetX = (maxWidth - rowWidth) / 2;

        for (let c = 0; c < numDots; c++) {
          s.addShape("roundRect", {
            x: tri2X + offsetX + c * (smallDot + smallGap),
            y: tri2StartY + rowIdx * (smallDot + smallGap),
            w: smallDot, h: smallDot, rectRadius: smallR,
            fill: { color: C.CORAL },
          });
        }
      }

      // Key insight box
      addTextOnShape(s, "Add +1, +2, +3, +4... = triangular", {
        x: 5.6, y: SAFE_BOTTOM - 0.65, w: 3.9, h: 0.5, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // == Slide 8: Worked Example — Classify 36 (I Do — Stage 2) ===============
  workedExSlide(
    pres,
    2,
    "Explicit Instruction \u2014 I Do",
    "Classify: Is 36 Special?",
    [
      "Test 1: 36 = 6 \u00D7 6 \u2192 It's a SQUARE number (6\u00B2)",
      "Test 2: 36 = 1+2+3+4+5+6+7+8 \u2192 It's the 8th TRIANGULAR number",
      "Test 3: 36 = 2\u00B2 \u00D7 3\u00B2 \u2192 Many factors \u2192 It's COMPOSITE",
      "Numbers can belong to MORE THAN ONE type!",
    ],
    NOTES_WORKED_EX,
    FOOTER,
    (s) => {
      // Right side: classification result cards
      const cardX = 5.3;
      const types = [
        { label: "SQUARE", detail: "6 \u00D7 6 = 36", color: C.NAVY },
        { label: "TRIANGULAR", detail: "1+2+3+...+8 = 36", color: C.TEAL },
        { label: "COMPOSITE", detail: "9 factors", color: C.CORAL },
      ];

      // Big 36 callout
      addTextOnShape(s, "36", {
        x: cardX + 0.5, y: CONTENT_TOP + 0.05, w: 3.3, h: 0.7, rectRadius: 0.1,
        fill: { color: C.NAVY },
        shadow: makeShadow(),
      }, {
        fontSize: 34, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      types.forEach((t, i) => {
        const cy = CONTENT_TOP + 0.9 + i * 0.78;
        addCard(s, cardX, cy, 4.3, 0.72, { strip: t.color });
        s.addText(t.label, {
          x: cardX + 0.2, y: cy + 0.05, w: 2.0, h: 0.3,
          fontSize: 12, fontFace: FONT_H, color: t.color, bold: true, margin: 0,
        });
        s.addText(t.detail, {
          x: cardX + 0.2, y: cy + 0.35, w: 3.8, h: 0.3,
          fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
        });
      });

      // Key message
      addTextOnShape(s, "One number \u2014 THREE types!", {
        x: cardX, y: SAFE_BOTTOM - 0.55, w: 4.3, h: 0.45, rectRadius: 0.08,
        fill: { color: C.NAVY },
      }, {
        fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // == Slide 9 (9a/9b): CFU 1 — Finger Voting — withReveal ==================
  withReveal(
    () => cfuSlide(
      pres, 2, "Check", "Quick Check", "Finger Voting",
      "The number 25 is:\n\nA) Just prime\nB) Just square\nC) Square AND composite\nD) Prime AND square",
      NOTES_CFU1, FOOTER
    ),
    (slide) => {
      addTextOnShape(slide, "C \u2014 Square (5\u00D75=25) AND Composite\n(factors: 1, 5, 25 = 3 factors) \u2014 NOT prime (more than 2 factors)", {
        x: 1.2, y: 4.2, w: 7.6, h: 0.75, rectRadius: 0.1,
        fill: { color: C.EMERALD },
        shadow: makeShadow(),
      }, {
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // == Slide 10: We Do — Sorting Numbers (Stage 3) ===========================
  contentSlide(
    pres,
    3,
    "Guided Practice \u2014 We Do",
    "Sort These Numbers",
    [
      "Sort: 7, 9, 10, 15, 16, 21, 23",
      "Into: Prime / Composite / Square / Triangular",
      "Some numbers may appear in more than one column!",
      "Test each number systematically \u2014 like we did with 36.",
      "Work with your partner. You have 3 minutes.",
    ],
    NOTES_SORT,
    FOOTER,
    (s) => {
      // Right side: 4-column header as coloured labels
      const colW = 1.05;
      const startX = 5.2;
      const hdrY = CONTENT_TOP + 0.1;

      const headers = [
        { label: "Prime", color: C.NAVY },
        { label: "Composite", color: C.TEAL },
        { label: "Square", color: C.PURPLE },
        { label: "Triangular", color: C.CORAL },
      ];

      headers.forEach((h, i) => {
        const hx = startX + i * (colW + 0.05);
        addTextOnShape(s, h.label, {
          x: hx, y: hdrY, w: colW, h: 0.38, rectRadius: 0.08,
          fill: { color: h.color },
        }, {
          fontSize: 10, fontFace: FONT_H, color: C.WHITE, bold: true,
        });
      });

      // Numbers to sort displayed as pills below
      const nums = [7, 9, 10, 15, 16, 21, 23];
      const pillW = 0.55;
      const pillH = 0.42;
      const pillGap = 0.08;
      const pillsPerRow = 4;
      const pillStartY = hdrY + 0.55;

      nums.forEach((n, i) => {
        const row = Math.floor(i / pillsPerRow);
        const col = i % pillsPerRow;
        const totalRowW = Math.min(nums.length - row * pillsPerRow, pillsPerRow) * (pillW + pillGap) - pillGap;
        const rowStartX = startX + ((headers.length * (colW + 0.05) - 0.05) - totalRowW) / 2;
        const px = rowStartX + col * (pillW + pillGap);
        const py = pillStartY + row * (pillH + 0.1);

        addTextOnShape(s, String(n), {
          x: px, y: py, w: pillW, h: pillH, rectRadius: 0.08,
          fill: { color: C.CHARCOAL },
          shadow: makeCardShadow(),
        }, {
          fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
        });
      });

      // Hint card below
      addCard(s, 5.2, pillStartY + 1.2, 4.3, 1.8, { strip: C.TEAL });
      s.addText("Hint: Check each number against ALL four types!", {
        x: 5.4, y: pillStartY + 1.3, w: 3.9, h: 0.35,
        fontSize: 11, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
      });

      // Quick reference
      const refItems = [
        { text: "Prime: exactly 2 factors", options: { bullet: true, breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "Composite: more than 2 factors", options: { bullet: true, breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "Square: n \u00D7 n", options: { bullet: true, breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "Triangular: 1+2+3+...+n", options: { bullet: true, fontSize: 10, color: C.CHARCOAL } },
      ];
      s.addText(refItems, {
        x: 5.4, y: pillStartY + 1.65, w: 3.9, h: 1.2,
        fontFace: FONT_B, margin: 0, valign: "top",
      });
    }
  );

  // == Slide 11 (11a/11b): We Do — Pattern Hunt — withReveal =================
  withReveal(
    () => cfuSlide(
      pres, 3, "Guided Practice", "Pattern Hunt", "Think-Pair-Share",
      "A student says:\n\n\"All square numbers are also composite numbers.\"\n\nIs this ALWAYS true?\nDiscuss with your partner.",
      NOTES_PATTERN_HUNT, FOOTER
    ),
    (slide) => {
      addTextOnShape(slide, "Not always! 1 = 1\u00B2 is square,\nbut 1 is NEITHER prime NOR composite.\nEvery other square number IS composite.", {
        x: 1.2, y: 3.9, w: 7.6, h: 1.0, rectRadius: 0.1,
        fill: { color: C.EMERALD },
        shadow: makeShadow(),
      }, {
        fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // == Slide 12 (12a/12b): CFU 2 — Show Me Boards — withReveal ===============
  withReveal(
    () => cfuSlide(
      pres, 3, "Check", "Hinge Check", "Show Me Boards",
      "Write a number that is BOTH triangular AND composite.\n\nShow WHY it fits both types.",
      NOTES_CFU2, FOOTER
    ),
    (slide) => {
      addTextOnShape(slide, "Many answers work!\n6 (T: 1+2+3, C: 2\u00D73) | 10 (T: 1+2+3+4, C: 2\u00D75)\n15, 21, 28, 36, 45, 55...", {
        x: 1.2, y: 3.9, w: 7.6, h: 1.0, rectRadius: 0.1,
        fill: { color: C.EMERALD },
        shadow: makeShadow(),
      }, {
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // == Slide 13: You Do — Independent Investigation (Stage 4) ================
  contentSlide(
    pres,
    4,
    "Independent Practice \u2014 You Do",
    "Independent Investigation",
    [
      "First: List the first 10 square numbers AND first 8 triangular numbers.",
      "Next: Circle any numbers that appear in BOTH lists.",
      "Then: Pick 3 numbers from your lists. For each, write which types it belongs to (prime, composite, square, triangular) and explain.",
    ],
    NOTES_YOUDO,
    FOOTER,
    (s) => {
      // Right side: challenge card
      addCard(s, 5.2, CONTENT_TOP, 4.3, SAFE_BOTTOM - CONTENT_TOP, { fill: C.WHITE });

      // Challenge header
      s.addShape("rect", {
        x: 5.2, y: CONTENT_TOP, w: 4.3, h: 0.44,
        fill: { color: C.CORAL },
      });
      s.addText("Challenge \u2014 Extend", {
        x: 5.2, y: CONTENT_TOP, w: 4.3, h: 0.44,
        fontSize: 13, fontFace: FONT_H, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // Challenge question
      s.addText([
        { text: "Can a prime number also be triangular?\n\n", options: { bold: true, fontSize: 14, color: C.CHARCOAL } },
        { text: "Find an example or explain why not.", options: { fontSize: 13, color: C.CHARCOAL } },
      ], {
        x: 5.4, y: CONTENT_TOP + 0.6, w: 3.9, h: 1.5,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Hint (small)
      s.addText("Hint: Check the triangular sequence...\n1, 3, 6, 10, 15, 21...", {
        x: 5.4, y: CONTENT_TOP + 2.1, w: 3.9, h: 0.6,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0, italic: true,
      });

      // Enable scaffold strip at bottom
      addTextOnShape(s, "Enable: Sequences provided on request", {
        x: 5.2, y: SAFE_BOTTOM - 0.52, w: 4.3, h: 0.4, rectRadius: 0.0,
        fill: { color: C.TEAL },
      }, {
        fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // == Slide 14: Exit Ticket =================================================
  exitTicketSlide(
    pres,
    [
      "Name a number that is both square and composite. Explain why it fits both types.",
      "What is the 7th triangular number? Show your working.",
      "Is 49 prime, composite, square, or triangular? It may be more than one type.",
    ],
    NOTES_EXIT,
    FOOTER
  );

  // == Slide 15: Closing =====================================================
  closingSlide(
    pres,
    "If I tell you a number is prime, can it also be a square number? Why or why not?",
    [
      "Numbers can belong to multiple types (square + composite, triangular + composite)",
      "Square numbers grow: 1, 4, 9, 16... (differences increase by 2 each time)",
      "Triangular numbers grow: 1, 3, 6, 10... (differences increase by 1 each time)",
    ],
    NOTES_CLOSING
  );

  // == Write PPTX ============================================================
  const pptxPath = OUT_DIR + "/NP_Lesson4_Special_Numbers.pptx";
  await pres.writeFile({ fileName: pptxPath });
  console.log("Written: " + pptxPath);
}

build().catch((err) => { console.error(err); process.exit(1); });
