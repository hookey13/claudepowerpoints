// Lesson 3 of 3: Prime, Composite, Square & Triangular Numbers
// Year 5/6 Numeracy — Number Properties 2
// VC2M6N02 (prime, composite, square, triangular numbers)
// Week 2, Session 3

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

// -- Theme --------------------------------------------------------------------
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

const OUT_DIR = "output/NP2_Lesson3_Prime_Composite_Square_Triangular";
const FOOTER = "Session 3 of 3 | Number Properties 2 | Year 5/6 Maths";

// -- Teacher notes ------------------------------------------------------------

const NOTES_TITLE = `**SAY:**
- "Welcome to the final session in our Number Properties unit. Over the last two lessons we explored factors, multiples, and divisibility. Today we bring it all together with four special types of number: prime, composite, square, and triangular."
- "By the end of today you'll be able to identify all four types and use their properties to simplify calculations."

**DO:**
- Display the title slide as students settle. Ensure mini-whiteboards and markers are on every desk.
- Direct attention to the unit title -- "This is Session 3 of 3."

**TEACHER NOTES:**
Lesson 3 of a 3-session unit covering VC2M6N02 (identify and describe properties of prime, composite, square and triangular numbers; use properties to solve problems and simplify calculations). This session builds on the factor-finding and divisibility skills from Lessons 1-2. Students need fluent recall of multiplication facts and the ability to test for factors systematically. The lesson introduces prime factorisation as a tool for simplifying calculations -- a powerful technique that bridges number properties and mental computation. Square and triangular numbers connect number theory to visual/geometric representations (dot arrays).

**WATCH FOR:**
- Students who seem unfamiliar with the term "prime" -- note for closer monitoring during I Do.
- Readiness signal: students settling quickly with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR = `**SAY:**
- "Let's warm up with some estimation. We're going to round, calculate, and then decide: is our estimate an overestimate or an underestimate?"
- "Read each question on the slide. Work it out on your whiteboard. When I say GO, hold up your answer AND whether it's an overestimate or underestimate."
- Ask each problem in turn. After each: "Hold up your boards... and down."

**DO:**
- Display the slide. Read each problem aloud, one at a time.
- Allow 15-20 seconds per problem. Students write the rounded calculation AND over/under on whiteboards.
- Scan for accuracy after each hold-up. Briefly correct any common errors.
- Use the number line visual on the right to show why rounding up gives an overestimate and rounding down gives an underestimate.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
- "Write your estimate AND whether it's an overestimate or underestimate. When I say 'show me,' hold it up high. Ready... show me!"
- Scan for: correct estimates on >=80% of boards AND correct identification of over/under.
PROCEED: If >=80% correct across most problems, move to Fluency.
PIVOT: If widespread errors on identifying over vs underestimate, pause and model with a concrete example: "I rounded 387 UP to 400. That means I made the number bigger, so my answer will be bigger than the real answer. That's an OVERestimate -- I estimated OVER." Re-run the missed problem.

**TEACHER NOTES:**
Daily Review targets estimation using rounding from prior learning. This connects to today's content because prime factorisation is itself a simplification strategy -- students who can estimate and simplify are developing flexible number sense. The over/underestimate reasoning requires students to think about the direction of rounding, not just the rounded value. Q4 introduces division estimation (rounding the dividend down), which reverses the typical pattern -- rounding down the dividend gives an underestimate in division.

**WATCH FOR:**
- Students who can round and calculate but cannot determine over vs under -- they're doing the procedure without understanding the reasoning. The number line visual should help.
- Students who round incorrectly (e.g., 387 to 380 instead of 400) -- they may not know the rounding rule. Quick fix: "Look at the tens digit. 8 is 5 or more, so round up."
- Readiness signal: fast, confident responses with correct over/under identification.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
- "Fluency time. I'm going to show you two number sequences. Your job is to figure out the pattern and fill in the missing numbers."
- "First sequence: square numbers. 1, 4, 9, 16, 25... what comes next? Write the next three on your whiteboard."
- After boards up: "36, 49, 64. These are square numbers -- each one is a number multiplied by itself. 6 times 6 is 36, 7 times 7 is 49, 8 times 8 is 64."
- "Second sequence: triangular numbers. 1, 3, 6, 10, 15... what comes next?"
- After boards up: "21, 28, 36. Each time we add one more than we added last time. We added 5 to get 15, so we add 6 to get 21, then 7 to get 28, then 8 to get 36."

**DO:**
- Display the slide with both sequences and their dot pattern visuals.
- Give 20 seconds for the square number sequence. Boards up. Confirm answers.
- Give 20 seconds for the triangular number sequence. Boards up. Confirm answers.
- Point to the dot arrays: "Notice how square numbers form perfect squares, and triangular numbers form triangles."

**TEACHER NOTES:**
This fluency activity previews two of the four number types covered today. By encountering square and triangular numbers in a pattern-recognition context first, students build intuition before the formal definitions in the vocabulary slide. The dot pattern visuals are critical -- they connect the abstract number sequence to a geometric representation. Students who struggle with the triangular sequence may need the visual of "adding one more row each time" to see the pattern. Note: 36 appears in BOTH sequences -- this foreshadows the We Do question about numbers that are both square and triangular.

**WATCH FOR:**
- Students who get the square numbers easily but struggle with triangular -- the pattern (add 1 more each time) is less familiar than "multiply by itself."
- Students who try to find a multiplicative pattern in the triangular numbers -- redirect to the additive pattern: "+2, +3, +4, +5, +6..."
- Readiness signal: most students completing both sequences correctly within the time limit.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
- Read from slide: "We are learning to identify and describe the properties of prime, composite, square and triangular numbers so we can use them to solve problems and simplify calculations."
- "Let's look at our three success criteria. By the end of the lesson, you should be able to do all three."
- Read each SC aloud. "SC1 is the foundation -- everyone will get there. SC2 takes it further with prime factorisation. SC3 connects to square and triangular numbers."

**DO:**
- Display the slide. Point to the LI as you read it.
- Point to each SC in turn. Pause after SC1: "This is the starting point -- can you tell if a number is prime or composite?"
- Leave this slide visible for 30 seconds so students can read and internalise.

**TEACHER NOTES:**
The LI translates VC2M6N02 ("identify and describe the properties of prime, composite, square and triangular numbers and use these properties to solve problems and simplify calculations") into student-friendly language. SC1 targets the classification skill (prime vs composite using factor tests), SC2 extends to prime factorisation as a tool for simplification, and SC3 introduces square and triangular numbers with their properties. The SC are ordered progressively: SC1 -> SC2 -> SC3. The exit ticket assesses all three SC directly.

**WATCH FOR:**
- Students who look confused by the LI -- this may indicate the vocabulary "prime," "composite," or "factorisation" is unfamiliar. The vocabulary slide (next) addresses this.
- Readiness signal: students nodding or whispering the SC to themselves.

[Maths: Planning -- Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_VOCAB = `**SAY:**
- "Before we start, let's lock in four key terms we'll use all lesson."
- Point to PRIME NUMBER: "A prime number has exactly 2 factors: 1 and itself. 7 is prime because only 1 and 7 divide into it. Notice I said EXACTLY 2 factors -- that's why 1 is NOT prime. 1 has only 1 factor."
- Point to COMPOSITE NUMBER: "A composite number has 3 or more factors. 12 is composite because 1, 2, 3, 4, 6, and 12 all divide into it. Most numbers are composite."
- Point to SQUARE NUMBER: "A square number is a number multiplied by itself. 9 is a square number because 3 times 3 equals 9. We can show this as a square array of dots -- 3 rows of 3."
- Point to TRIANGULAR NUMBER: "A triangular number is formed by adding consecutive counting numbers. 1, then 1+2=3, then 1+2+3=6, then 1+2+3+4=10. We can show these as triangular dot patterns."

**DO:**
- Display the slide. Point to each term and its visual as you explain it.
- After explaining all four: "Turn to your partner. Give me one example of a prime number and one example of a composite number. 15 seconds."

**TEACHER NOTES:**
This vocabulary front-loading reduces cognitive load during the worked examples -- students won't be processing new terminology AND new procedures simultaneously. The visual representations are critical: prime = only two factor arrows (1 and itself), composite = factor tree branching into multiple factors, square = dot array forming a perfect square shape, triangular = dot pattern forming a triangle. These visuals build schema connections that support the rest of the lesson. Emphasise that 1 is NEITHER prime NOR composite -- this is a common source of confusion.

**MISCONCEPTIONS:**
- Misconception: "1 is a prime number because it's only divisible by 1 and itself."
  Why: Students apply the "only divisible by 1 and itself" definition without recognising that for 1, "1" and "itself" are the SAME number. Prime requires EXACTLY 2 distinct factors.
  Impact: Students who classify 1 as prime will make errors in prime factorisation and in identifying the smallest prime (which is 2, not 1).
  Quick correction: "Prime means exactly TWO different factors. 1 has only ONE factor -- just 1. So 1 is special -- it's neither prime nor composite."

**WATCH FOR:**
- Students who say "2 isn't prime because it's even" -- this is the misconception that all primes are odd. Address immediately: "2 IS prime. It has exactly 2 factors: 1 and 2. It's the only even prime."
- Students who confidently name examples during Turn & Talk -- readiness signal.
- Students who cannot distinguish prime from composite -- monitor closely during I Do.

[Maths: Launch -- Explicit Instruction | VTLM 2.0: Explicit Explanation]`;

const NOTES_WE1 = `**SAY:**
- "Watch me test whether a number is prime or composite. I'll use a systematic method."
- "Is 23 prime or composite? I test by dividing by small primes: 2, 3, 5, 7..."
- "23 divided by 2 is 11.5 -- no. 23 divided by 3 is about 7.67 -- no. 23 divided by 5 is 4.6 -- no."
- "The next prime to test is 7, but 7 times 7 is 49, which is bigger than 23. So I can stop. If no prime up to the square root divides evenly, the number is prime."
- "No factors found besides 1 and 23 -- it's PRIME."
- "Now let me try 15. Is 15 prime or composite? 15 divided by 3 is 5 -- yes! So 15 is COMPOSITE. I can write it as a factor tree: 15 = 3 times 5. Both 3 and 5 are prime, so that's the prime factorisation."

**DO:**
- Display the slide. Work through the 23 example step by step, pointing to each division test on the right.
- Circle or highlight the "7 times 7 = 49 > 23, so STOP" step -- this is the key efficiency insight.
- Then work through 15 briefly, showing the factor tree.
- Pause after each step to let students process -- don't rush through.

**TEACHER NOTES:**
This is the first I Do worked example. The systematic method for testing primality (divide by each prime up to the square root) is the core algorithm. The stopping rule (when the next prime squared exceeds the number) mirrors the stopping rule from factor-pair finding in Lesson 1 -- draw this parallel explicitly if students seem confused. The 23 example is chosen because it IS prime (students see the full testing process with a prime result), while 15 provides the composite counterexample. The factor tree for 15 is deliberately simple (two prime factors) to introduce the notation before the more complex example in Worked Example 2.

**MISCONCEPTIONS:**
- Misconception: "I need to test every number, not just primes."
  Why: Students don't yet understand why testing only primes is sufficient. If a number is divisible by 4, it's already divisible by 2 (which we tested first). Testing composites is redundant.
  Impact: Students waste time on unnecessary tests and the method feels tedious.
  Quick correction: "If 23 were divisible by 4, it would also be divisible by 2. But we already checked 2. So testing 4 is a waste of time. We only need to test primes: 2, 3, 5, 7, 11..."

**WATCH FOR:**
- Students who look confused at the stopping rule (7 times 7 = 49 > 23) -- this is the threshold concept. Explain: "If 23 had a factor bigger than its square root, the matching factor would be smaller than the square root -- and we already tested all of those."
- Students who are already nodding -- they may have encountered primes before. These students are candidates for the extending challenge (Goldbach's Conjecture).
- Readiness signal: students watching attentively and some attempting to predict whether a number is prime before you confirm.

[Maths: Launch -- Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_WE2 = `**SAY:**
- "Now let's use prime factorisation to break a number into its prime building blocks."
- "Write 36 as a product of prime factors. I'll use a factor tree."
- "36: I start by finding any factor pair. 36 = 6 times 6. Now, is 6 prime? No -- 6 = 2 times 3. So I branch again."
- "36 = 2 times 3 times 2 times 3. I can write this as 2 squared times 3 squared."
- "Why is this useful? Look: I want to calculate 15 times 16."
- "15 = 5 times 3. And 16 = 4 times 4 = 2 times 2 times 2 times 2."
- "So 15 times 16 = 5 times 3 times 2 times 2 times 2 times 2. I can rearrange: (5 times 2) times (3 times 2 times 2 times 2) = 10 times 24 = 240."
- "Breaking numbers into primes lets me rearrange to make friendly numbers like 10, 20, 100."

**DO:**
- Display the slide. Draw the factor tree for 36 step by step on the left side.
- Circle the prime factors at the bottom of the tree.
- Then walk through the 15 times 16 simplification on the right, showing the rearrangement.
- Emphasise: "I'm looking for pairs that make 10 or 100 -- that's the strategy."

**TEACHER NOTES:**
This second I Do connects prime factorisation (a number theory concept) to calculation simplification (a practical skill). The factor tree for 36 is chosen because it has repeated prime factors (2 squared times 3 squared), introducing index notation naturally. The 15 times 16 example shows the power of the technique: by decomposing into primes and rearranging, we create a "10 times something" calculation that's easy to do mentally. This bridges abstract number theory and practical mental computation -- exactly what VC2M6N02 requires ("use these properties to solve problems and simplify calculations"). Students need to understand that multiplication is commutative and associative (order and grouping don't matter) for the rearrangement to work.

**MISCONCEPTIONS:**
- Misconception: "The factor tree must always start with the smallest prime."
  Why: Some students have been taught a rigid "always divide by 2 first" approach.
  Impact: Students who insist on starting with 2 will struggle with odd numbers (e.g., 45 = 9 times 5 is easier to see than repeatedly testing 2 first).
  Quick correction: "You can start with ANY factor pair. 36 = 6 times 6 or 36 = 4 times 9 or 36 = 2 times 18. All roads lead to the same prime factorisation: 2 times 2 times 3 times 3."

**WATCH FOR:**
- Students who stop the factor tree too early (e.g., leaving 6 as a leaf instead of breaking it into 2 times 3) -- remind: "Every number at the bottom of the tree must be prime. Is 6 prime? No, so we keep going."
- Students who understand the tree but don't see the connection to simplification -- the 15 times 16 example is the bridge. If they look lost, slow down on the rearrangement step.
- Readiness signal: students following the tree construction and some predicting the next branch.

[Maths: Launch -- Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
- "Quick check. On your whiteboard, write P if you think the number is prime, or C if you think it's composite."
- "Is 37 prime or composite? You have 15 seconds. Test it!"
- After boards up: "37 is PRIME. Let's check: 37 divided by 2 = 18.5, no. Divided by 3 = about 12.3, no. Divided by 5 = 7.4, no. Next prime is 7, and 7 times 7 is 49 which is bigger than 37, so we stop. No factors found -- PRIME."

**DO:**
- Display the question slide. Give students 15 seconds to test and write P or C.
- Say "Show me!" -- scan boards quickly.
- Walk through the verification aloud, pointing to each test.
- Cold Call: "[Student name], which primes did you test before deciding?" Confirm their method.

**CFU CHECKPOINT:**
Technique: Show Me Boards (P or C)
Script:
- "Write P for prime or C for composite on your board. Is 37 prime or composite? You have 15 seconds. Ready... show me!"
- Scan for: "P" on >=80% of boards.
PROCEED: If >=80% show P -- students understand the prime testing method. Move to We Do.
PIVOT: If widespread errors (many showing C), students may be making division errors or not testing systematically. Reteach: "Let me test 37 together. Start with 2: is 37 even? No. Next, 3: does 3+7=10 divide by 3? No. Next, 5: does 37 end in 0 or 5? No. Next, 7: 7 times 5 is 35, 7 times 6 is 42 -- 37 is between these, so 7 doesn't divide evenly. And 7 squared is 49 which is bigger than 37, so we stop. Prime!" Re-check with: "Is 33 prime or composite? Show me." [Composite: 33 divided by 3 = 11]

**TEACHER NOTES:**
This CFU checks SC1 (identifying whether a number is prime or composite by testing for factors). 37 is chosen deliberately -- it's a two-digit prime that requires testing 2, 3, 5 and applying the stopping rule. Students who answer correctly have internalised both the testing method and the stopping rule. The Cold Call follow-up checks whether students used a systematic method or guessed. If a student says "I just knew 37 was prime," probe: "How would you prove it to someone who didn't know?"

**WATCH FOR:**
- Students writing "C" -- they may have made a division error (e.g., thinking 37 divided by 3 = 12 remainder 1 means it IS a factor). Clarify: "A remainder means it's NOT a factor."
- Students who write nothing -- they may not know where to start. Redirect: "Start with 2. Is 37 even? No. Move to 3."
- Readiness signal: fast P responses with confident board holds.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
- "Your turn to help me. We have two numbers: 29 and 27. For each one, test whether it's prime or composite."
- "Start with 29. On your whiteboards, test it. Divide by 2, 3, 5... What do you find?"
- Cold Call: "[Student name], is 29 prime or composite?" [Prime] "What primes did you test?" [2, 3, 5 -- and 5 squared is 25 which is less than 29, but 7 squared is 49 which is more, so we check 5: 29 divided by 5 = 5.8, not a factor. Stop at 7. Prime.]
- "Now 27. Test it." Cold Call: "[Student name]?" [Composite: 27 divided by 3 = 9]
- "Excellent. 27 is composite. Now write the prime factorisation of 27."
- "27 = 3 times 9 = 3 times 3 times 3 = 3 cubed."

**DO:**
- Display the question slide with both numbers. Students work on whiteboards.
- Give 30 seconds for 29, then Cold Call. Confirm with the class.
- Give 30 seconds for 27, then Cold Call. Confirm.
- Click to reveal the answers and the prime factorisation of 27.

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
- Cold call different students for each number. "Name, is 29 prime or composite? How do you know?"
- Scan for: correct identification AND ability to explain the testing process.
PROCEED: If students are answering correctly and can explain their method, move to the next We Do.
PIVOT: If students identify 29 incorrectly, the gap is likely in applying the stopping rule or making division errors. Reteach: walk through 29 step by step on the board. "29 divided by 2 = 14.5. Not a factor. 29 divided by 3 = 9.67. Not a factor. 29 divided by 5 = 5.8. Not a factor. The next prime is 7, and 7 times 7 = 49 > 29. STOP. No factors found -- prime."

**TEACHER NOTES:**
This We Do pairs a prime (29) with a composite (27) so students practise both outcomes. 29 requires testing through 5 before the stopping rule kicks in (7 squared = 49 > 29). 27 is caught quickly by 3 (27 divided by 3 = 9). The prime factorisation of 27 extends to SC2 -- students write 27 as a product of primes (3 cubed). This is a simple factorisation since 27 has only one prime factor, which makes it a good transition from the I Do example (36 = 2 squared times 3 squared, which had two different primes).

**ENABLING & EXTENDING:**
ENABLING PROMPT:
- Task: Provide students with a checklist: "Test 2, Test 3, Test 5, Test 7. Circle YES or NO for each." This scaffolds the systematic testing process. Students fill in the checklist for 29 and 27.
- Extra Notes: For students who struggle with the division, allow calculators for the testing step only.

EXTENDING PROMPT:
- Task: "Test 91. Is it prime or composite? Most people think 91 is prime -- prove them wrong!" (91 = 7 times 13)
- Extra Notes: This challenges the assumption that two-digit numbers ending in 1 are prime. 91 is a classic "prime imposter."

**WATCH FOR:**
- Students who say 27 is prime because "27 divided by 2 doesn't work" -- they stopped after one test. Remind: "Test ALL the small primes: 2, 3, 5, 7..."
- Students who struggle with the prime factorisation of 27 -- they may write 27 = 3 times 9 and stop. Prompt: "Is 9 prime?" [No] "So keep breaking it down."
- Readiness signal: students completing both tests correctly within 60 seconds.

[Maths: Explore -- Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
- "Now let's use prime factorisation to simplify a calculation."
- "Calculate 15 times 16 by breaking each number into prime factors and rearranging."
- "On your whiteboards: first write 15 as a product of primes, then write 16 as a product of primes."
- Cold Call: "[Student name], what's 15 as primes?" [3 times 5] "And 16?" [2 times 2 times 2 times 2]
- "So 15 times 16 = 3 times 5 times 2 times 2 times 2 times 2. Now rearrange to make a friendly number. Can you spot a pair that makes 10?" [5 times 2 = 10]
- "10 times 3 times 2 times 2 times 2 = 10 times 24 = 240."
- "Now you try: Calculate 12 times 25 by rearranging prime factors."
- After 60 seconds: "12 = 2 times 2 times 3. And 25 = 5 times 5."
- "12 times 25 = 2 times 2 times 3 times 5 times 5. Rearrange: (2 times 5) times (2 times 5) times 3 = 10 times 10 times 3 = 300."

**DO:**
- Display the question slide. Walk through 15 times 16 together using Cold Call.
- Then set students to work on 12 times 25 independently on whiteboards. 60 seconds.
- After time: boards up. Click to reveal the answer.
- Emphasise the strategy: "Look for 2 times 5 = 10 or 4 times 25 = 100. These create friendly numbers."

**CFU CHECKPOINT:**
Technique: Show Me Boards (open response)
Script:
- "Write the prime factorisation of 12 and 25 on your board. Then rearrange to calculate the product. 60 seconds. Go!"
- Scan for: correct prime factorisations AND a sensible rearrangement.
PROCEED: If >=80% get the correct answer (300) with a valid rearrangement, move to the Square and Triangular We Do.
PIVOT: Most likely issue: students can do the prime factorisation but don't see HOW to rearrange. Reteach: "I'm hunting for pairs of numbers that multiply to 10 or 100. A 2 and a 5 make 10. Two 2s and two 5s make 100. Scan your prime factors for these pairs." Re-check: "What's 14 times 5? Break it down: (2 times 7) times 5 = (2 times 5) times 7 = 10 times 7 = 70."

**TEACHER NOTES:**
This We Do targets SC2 (represent composite numbers as products of prime factors) and bridges to practical calculation. The 15 times 16 example is teacher-led; the 12 times 25 problem is student-attempted with teacher support. 12 times 25 is particularly elegant because it produces TWO pairs of (2 times 5), giving 10 times 10 times 3 = 300. This reinforces the strategy of "hunting for tens." Students who can do this fluently have a powerful mental computation tool. The key insight is that multiplication is commutative and associative -- we can regroup factors in any order.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
- Task: Provide the prime factorisations already written out: "12 = 2 x 2 x 3" and "25 = 5 x 5." Students just need to rearrange and calculate.
- Extra Notes: Draw lines connecting the 2s and 5s visually to show the pairing.

EXTENDING PROMPT:
- Task: "Calculate 45 times 24 using prime factorisation. Can you find a way to make it really easy?" (45 times 24 = (9 times 5) times (8 times 3) = rearrange to (5 times 8) times (9 times 3) = 40 times 27 = 1080... or use primes: 3 times 3 times 5 times 2 times 2 times 2 times 3 = (5 times 2) times (3 times 2) times (3 times 2) times 3 = 10 times 6 times 6 times 3 = 1080)
- Extra Notes: Multiple valid rearrangements exist -- celebrate any that lead to the correct answer efficiently.

**WATCH FOR:**
- Students who write the prime factorisations correctly but then just multiply left to right without rearranging -- they're missing the point of the strategy. Redirect: "The goal is to rearrange FIRST, then calculate. Don't just multiply in order."
- Students who get confused by the number of factors -- for 12 times 25 there are 5 prime factors total. Some students lose track. Suggest: "Write them all out, then draw circles around the pairs you want to group."
- Readiness signal: students finding the 10 times 10 times 3 rearrangement quickly.

[Maths: Explore -- Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO3 = `**SAY:**
- "Let's now explore square and triangular numbers."
- "Look at the dot arrays. The square numbers form perfect square shapes: 1 dot, then 2-by-2 is 4, 3-by-3 is 9, 4-by-4 is 16, 5-by-5 is 25."
- "What's the pattern? Each square number is n times n. The nth square number is n squared."
- "Now look at the triangular numbers: 1, then 1+2=3, then 1+2+3=6, then 1+2+3+4=10, then 1+2+3+4+5=15."
- "What's the pattern? Each time we add one more than we added last time."
- "Here's a special question: Is 36 both a square number AND a triangular number?"
- Think-Pair-Share: "Turn to your partner. Discuss for 30 seconds. Is 36 both?"
- After sharing: "Yes! 6 times 6 = 36, so it's the 6th square number. And 1+2+3+4+5+6+7+8 = 36, so it's the 8th triangular number. Numbers that are both square AND triangular are very rare!"

**DO:**
- Display the slide with dot arrays for both sequences on the left.
- Point to each dot pattern as you describe it.
- Set the Think-Pair-Share for the 36 question. Circulate and listen to 2-3 pairs.
- Click to reveal the answer.

**CFU CHECKPOINT:**
Technique: Think-Pair-Share
Script:
- "Is 36 both a square number and a triangular number? Turn to your partner and discuss. You have 30 seconds."
- Listen for: correct identification of 36 as 6 squared AND as the 8th triangular number.
PROCEED: If most pairs correctly identify 36 as both, students understand both number types well enough. Move to Hinge Question.
PIVOT: If pairs struggle, they may not have internalised the definitions. Quick reteach: "A square number is n times n. Is 36 = n times n for some n? Yes, 6 times 6. A triangular number is 1+2+3+...+n for some n. Let me add: 1+2+3+4+5+6+7+8 = 36. Yes!"

**TEACHER NOTES:**
This We Do introduces square and triangular numbers with visual representations (dot arrays) and then poses the intriguing question about 36 being both. The Think-Pair-Share technique ensures all students engage with this higher-order question before the answer is revealed. The dot arrays are essential -- they provide a concrete, visual understanding that supports abstraction. The fact that 36 is both square and triangular is mathematically interesting and serves as a hook. Other numbers that are both: 1, 1225, 41616... these are extremely rare, which students find fascinating. This connects to the Challenge question in the You Do.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
- Task: Students who struggle to verify 36 as triangular should be given the partial sums: "1, 1+2=3, 3+3=6, 6+4=10, 10+5=15, 15+6=21, 21+7=28, 28+8=?" to scaffold the addition.
- Extra Notes: The visual dot pattern (adding one more row each time) is the most accessible scaffold.

EXTENDING PROMPT:
- Task: "The first five square numbers are 1, 4, 9, 16, 25. What do you notice about the DIFFERENCES between consecutive square numbers? (3, 5, 7, 9...) Can you explain why?"
- Extra Notes: The differences are consecutive odd numbers. This is because (n+1) squared minus n squared = 2n + 1, which is always odd.

**WATCH FOR:**
- Students who confuse square numbers with "numbers in the 2 times table" -- they may think "square" means "even." Clarify: "9 is a square number (3 times 3) and it's odd. Square numbers can be odd or even."
- Students who can identify square numbers but not triangular -- the additive pattern is less intuitive. Use the dot visual: "Each row has one more dot than the row above."
- Readiness signal: pairs discussing 36 with correct mathematical language.

[Maths: Explore -- Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
- "One last check before you work independently. I need to know if you can spot true statements about these number types."
- "Look at the four statements. Which one is FALSE? Hold up 1, 2, 3, or 4 fingers. You have 20 seconds to decide."
- After finger vote: "The answer is B -- 'All prime numbers are odd' is FALSE. Who can tell me why?"
- Cold Call: "[Student name]?" [2 is prime and even] "Exactly. 2 is the only even prime number. Every other even number is divisible by 2, so it has at least 3 factors and is composite."
- "Let's check the others. A: '2 is the only even prime' -- TRUE, as we just said. C: '49 is a square number' -- TRUE, 7 times 7 = 49. D: '1 is not a prime number' -- TRUE, 1 has only 1 factor, and primes need exactly 2."

**DO:**
- Display the question slide with four options. Allow 20 seconds.
- "Show me fingers -- 1, 2, 3, or 4." Scan the room quickly.
- Click to reveal the answer.
- Walk through why each statement is true or false.

**CFU CHECKPOINT:**
Technique: Finger Voting (1-4)
Script:
- "Hold up the number of fingers matching your answer: 1 for A, 2 for B, 3 for C, 4 for D. Ready... show me!"
- Scan for: 2 fingers (option B) on >=80% of hands.
PROCEED: If >=80% choose B -- students can distinguish properties of prime numbers. Release to You Do.
PIVOT: Most likely misconception -- students choosing A because they think "2 is even so it can't be prime." This is the same misconception that B describes but from the other direction. Reteach: "Let's test 2. What are its factors? 1 and 2. That's exactly 2 factors. So 2 IS prime. It's the ONLY even prime -- every other even number is divisible by 2, giving it a third factor." Re-check: "Is 9 prime? Thumbs up or down." [Down -- 9 = 3 times 3, so it has factors 1, 3, 9]

**TEACHER NOTES:**
This hinge question tests the threshold concept: do students truly understand the definitions of prime, composite, and square numbers? Each option maps to a specific understanding. A (2 is the only even prime): TRUE -- tests understanding that 2 is exceptional. B (all primes are odd): FALSE -- the classic misconception that forgets about 2. C (49 is square): TRUE -- tests recall of 7 times 7. D (1 is not prime): TRUE -- tests the "exactly 2 factors" definition. Students who choose B correctly demonstrate that they understand 2 is prime, which is the most commonly confused point. The finger-voting technique ensures rapid whole-class scanning.

**MISCONCEPTIONS:**
- Misconception: "All prime numbers are odd."
  Why: Students see that 3, 5, 7, 11, 13, 17, 19, 23... are all odd and overgeneralise. They forget or don't know that 2 is prime.
  Impact: Students will incorrectly classify 2 as composite and may make errors in prime factorisation (e.g., failing to divide by 2 first).
  Quick correction: "2 has exactly two factors: 1 and 2. That makes it prime. It's the only even prime because every other even number is also divisible by 2, giving it at least 3 factors."

**WATCH FOR:**
- Students who hold up 4 fingers (choosing D) -- they think 1 IS prime. This is a critical misconception. Address: "1 has only ONE factor: 1. Primes need exactly TWO factors."
- Students who hold up 1 finger (choosing A) -- they know 2 is even but aren't sure it's prime. They need the factor test: "What are the factors of 2? Just 1 and 2. That's TWO factors -- prime."
- Readiness signal: fast, confident 2-finger holds.

[Maths: Monitor Progress -- Hinge Question | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
- "You're ready. Time to work independently."
- Read from slide: "First: Test these numbers -- prime or composite? 31, 33, 39, 41, 47, 51."
- "Next: Write the prime factorisation of 48 and 60 using factor trees."
- "Then: Calculate 18 times 15 by rearranging prime factors. Show your working."
- "If you finish all three sections, turn to the Challenge at the bottom."
- "Use your SR1 worksheet. Start now -- you have 10 minutes."

**DO:**
- Distribute SR1 worksheet (Prime, Composite, Square & Triangular Numbers).
- Set a visible timer for 10 minutes.
- Circulate -- visit enabling students first (check they can test for primes), then extending students.
- Conference briefly with 2-3 students: "Talk me through how you tested this number."

**TEACHER NOTES:**
You Do targets all three SC. Section First targets SC1 (classifying prime vs composite). Section Next targets SC2 (prime factorisation). Section Then applies SC2 to calculation simplification. The Challenge targets SC3 (square and triangular numbers). Numbers are carefully chosen: 31 (prime), 33 (composite: 3 times 11), 39 (composite: 3 times 13), 41 (prime), 47 (prime), 51 (composite: 3 times 17 -- a common "prime imposter"). 48 and 60 have rich factor trees with multiple branching points. 18 times 15 = (2 times 3 times 3) times (3 times 5) = rearrange to (2 times 5) times (3 times 3 times 3) = 10 times 27 = 270.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
- Task: Students work on the "First" section only, with a prime-testing checklist provided: "Test 2, Test 3, Test 5, Test 7. Circle YES or NO." If they finish, attempt one factor tree (48) with the first branch provided (48 = 2 times 24).
- Extra Notes: Seat enabling students near the front so you can check their boards during the 10 minutes.

EXTENDING PROMPT:
- Task: After completing all sections, students attempt the EXT1 Goldbach's Conjecture Investigation (companion PDF). This introduces Goldbach's conjecture and has students test even numbers from 4 to 50.
- Extra Notes: Distribute the EXT1 PDF to extending students when they finish the main worksheet. The PDF is self-contained.

**WATCH FOR:**
- Students who classify 51 as prime -- this is the most common error. 51 = 3 times 17. Prompt: "Test 3. What's 5 + 1? That's 6, which is divisible by 3. So 51 is divisible by 3."
- Students who draw factor trees but stop at composite numbers (e.g., 48 = 6 times 8, then stop). Prompt: "Are 6 and 8 prime? No -- keep branching until every leaf is prime."
- Students who get the correct prime factorisation for 18 times 15 but then just multiply left to right. Redirect: "Rearrange FIRST to make friendly numbers."
- Readiness signal: students completing Section First correctly within 3 minutes.

[Maths: Summarise -- Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
- "Pens down on the worksheet. Time for your exit ticket -- three questions to show what you've learned."
- "Work silently and independently. No looking at your worksheet or your neighbour. This is just for me to see where you are."
- "You have 3 minutes."

**DO:**
- Display the exit ticket slide. Students write answers in their maths books or on the back of the worksheet.
- Set a timer for 3 minutes. Circulate silently -- observe but don't help.
- Collect responses or note answers as students hold up books.

**TEACHER NOTES:**
The exit ticket assesses SC1 (Q1: prime testing and explanation), SC2 (Q2: prime factorisation), and SC3 (Q3: square and triangular numbers). Q1 requires both the classification AND the explanation of the testing process -- students who just write "prime" without showing the tests have not demonstrated the method. Q2 requires a complete prime factorisation with the product notation. Q3 tests recall of square and triangular number sequences. Sort responses into three groups: (1) Q1 only correct -- need SC2/SC3 support, (2) Q1+Q2 correct -- on track, (3) all three correct -- confident with all number types. Use this data to inform future lesson groupings.

**WATCH FOR:**
- Students who answer Q1 correctly but struggle with Q2 -- they understand classification but haven't automated factor trees. Provide extra practice with factor trees in follow-up lessons.
- Students who mix up square and triangular number sequences in Q3 -- they may need the dot array visuals as a reference.
- Readiness signal: students finishing all three questions within 2 minutes.

[Maths: Summarise -- Exit Ticket (Stage 5) | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `**SAY:**
- "Before we wrap up -- here are the printable resources for today's lesson. If you're a teacher using this deck, click any link to open the PDF."
- "SR1 is the practice worksheet. SR2 is the answer key. EXT1 is the Goldbach's Conjecture investigation for extending students."

**DO:**
- Display the slide briefly. Teachers can click hyperlinks to open PDFs.
- This slide is primarily for teacher preparation -- students don't need to see it during the lesson.

**TEACHER NOTES:**
All PDFs are in the same folder as this PPTX file. Hyperlinks are relative -- they work when the PPTX is opened from the lesson folder. Print SR1 before the lesson (one per student). Print EXT1 for extending students only (typically 3-5 copies). SR2 is for teacher reference -- do not distribute to students during the lesson.

**WATCH FOR:**
- N/A -- this is a teacher-facing slide.

[Maths: Planning -- Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
- "Let's look back at our success criteria."
- Read from slide: "SC1: I can identify whether a number is prime or composite by testing for factors."
- "Give me a thumbs up, sideways, or down for SC1." Pause and scan. "Most thumbs up -- great."
- Read: "SC2: I can represent composite numbers as a product of their prime factors."
- "Thumbs for SC2." Pause and scan. Note any thumbs-down.
- Read: "SC3: I can identify square and triangular numbers and use their properties to simplify calculations."
- "Thumbs for SC3." Pause. "Some sideways here -- that's OK."
- "Turn to your partner: What was the most interesting thing you learned today about special numbers? 30 seconds."
- "Fantastic work this unit. You now have a toolkit of number properties -- factors, multiples, divisibility, primes, composites, squares, triangular numbers. These are the building blocks of all the maths you'll do from here."

**DO:**
- Display the closing slide with SC listed. Read each SC aloud.
- Run thumbs up/sideways/down for each SC in turn. Scan and mentally note students who are down on SC1 or SC2.
- Allow 30 seconds for the Turn & Talk. Listen to 2-3 pairs.
- Close with a brief acknowledgement of effort and a summary of the unit.

**TEACHER NOTES:**
The closing slide reviews all three SC and uses self-assessment to give the teacher and students a snapshot of where they are. As this is the final lesson in the unit, the closing also serves as a unit summary -- acknowledge how far students have come from Lesson 1. Students who self-assess as "thumbs down" on SC1 should be noted for targeted revision. The Turn & Talk prompt asks about the most interesting learning, not just the most confident -- this encourages reflection on the content rather than just self-assessment. End with acknowledgement: "You've built a powerful number toolkit this week."

**WATCH FOR:**
- Students who show thumbs-down on SC1 -- this is a critical gap for a final lesson. They may need 1:1 conferencing.
- Students who show thumbs-up on all three -- confirm in exit ticket data. If genuine, these students have strong number sense.
- The Turn & Talk: listen for students mentioning the connection between prime factorisation and simplification -- this indicates deep SC2 understanding.

[Maths: Summarise -- Closing | VTLM 2.0: Monitor Progress & Feedback]`;

// -- Build --------------------------------------------------------------------

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "Prime, Composite, Square & Triangular Numbers -- Session 3";

  // -- SLIDE 1: Title ---------------------------------------------------------
  titleSlide(pres, "Prime, Composite, Square &\nTriangular Numbers",
    "Properties of Special Numbers",
    "Session 3 of 3 | Number Properties 2 | Year 5/6", NOTES_TITLE);

  // -- SLIDE 2: Daily Review (Stage 1) ----------------------------------------
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Daily Review");
    addTitle(s, "Estimation Using Rounding", { color: C.ACCENT });

    // I Can statement
    addTextOnShape(s, "I can apply rounding to estimate a calculation and identify if the estimate is greater or less than the actual value", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 5.2, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 9, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    // Questions (left side)
    const questions = [
      { q: "Q1: Estimate 387 x 6", round: "387 -> 400", calc: "400 x 6 = 2400", verdict: "Overestimate" },
      { q: "Q2: Estimate 29 x 48", round: "29 -> 30, 48 -> 50", calc: "30 x 50 = 1500", verdict: "Overestimate" },
      { q: "Q3: Estimate 195 x 4", round: "195 -> 200", calc: "200 x 4 = 800", verdict: "Overestimate" },
      { q: "Q4: Estimate 312 / 6", round: "312 -> 300", calc: "300 / 6 = 50", verdict: "Underestimate" },
    ];

    questions.forEach((item, i) => {
      const qy = CONTENT_TOP + 0.5 + i * 0.82;
      addCard(s, 0.5, qy, 5.2, 0.72, { strip: i === 3 ? C.ALERT : C.ACCENT });
      s.addText([
        { text: item.q, options: { bold: true, breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: item.round + "   ->   " + item.calc, options: { fontSize: 10, color: C.MUTED } },
      ], {
        x: 0.75, y: qy + 0.05, w: 4.7, h: 0.62,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Number line visual (right side)
    addCard(s, 6.0, CONTENT_TOP + 0.5, 3.5, 3.3, { strip: C.SECONDARY });
    s.addText("Rounding on a Number Line", {
      x: 6.2, y: CONTENT_TOP + 0.58, w: 3.1, h: 0.3,
      fontSize: 11, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });

    // Number line for 387
    const nlY = CONTENT_TOP + 1.1;
    s.addShape("rect", {
      x: 6.4, y: nlY + 0.15, w: 2.8, h: 0.04,
      fill: { color: C.CHARCOAL },
    });
    // Tick marks
    s.addText("380", {
      x: 6.3, y: nlY + 0.25, w: 0.5, h: 0.2,
      fontSize: 8, fontFace: FONT_B, color: C.MUTED, align: "center", margin: 0,
    });
    s.addText("387", {
      x: 7.2, y: nlY - 0.15, w: 0.5, h: 0.2,
      fontSize: 9, fontFace: FONT_B, color: C.ALERT, align: "center", bold: true, margin: 0,
    });
    s.addText("400", {
      x: 8.8, y: nlY + 0.25, w: 0.5, h: 0.2,
      fontSize: 8, fontFace: FONT_B, color: C.MUTED, align: "center", margin: 0,
    });
    // Arrow from 387 to 400
    addTextOnShape(s, "Round UP", {
      x: 7.5, y: nlY + 0.5, w: 1.2, h: 0.28, rectRadius: 0.06,
      fill: { color: C.ACCENT },
    }, { fontSize: 8, fontFace: FONT_B, color: C.WHITE, bold: true });

    // Key insight
    addTextOnShape(s, "Rounded UP = Overestimate", {
      x: 6.3, y: nlY + 1.05, w: 2.9, h: 0.32, rectRadius: 0.06,
      fill: { color: C.ACCENT },
    }, { fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true });

    addTextOnShape(s, "Rounded DOWN = Underestimate", {
      x: 6.3, y: nlY + 1.5, w: 2.9, h: 0.32, rectRadius: 0.06,
      fill: { color: C.ALERT },
    }, { fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true });

    // Show Me Boards instruction
    addTextOnShape(s, "Show Me Boards: answer + over/under", {
      x: 6.3, y: nlY + 2.0, w: 2.9, h: 0.28, rectRadius: 0.06,
      fill: { color: C.PRIMARY },
    }, { fontSize: 9, fontFace: FONT_B, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_DR);
  })();

  // -- SLIDE 3: Fluency (Stage 1) ---------------------------------------------
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Number Sequences -- What Comes Next?", { color: C.ACCENT });

    // Square numbers sequence (top half)
    addCard(s, 0.5, CONTENT_TOP + 0.05, 5.5, 1.65, { strip: C.PRIMARY });
    s.addText("Square Numbers", {
      x: 0.75, y: CONTENT_TOP + 0.12, w: 3.0, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });

    const sqNums = ["1", "4", "9", "16", "25", "?", "?", "?"];
    sqNums.forEach((n, i) => {
      const isMissing = n === "?";
      addTextOnShape(s, n, {
        x: 0.7 + i * 0.63, y: CONTENT_TOP + 0.48, w: 0.52, h: 0.48, rectRadius: 0.08,
        fill: { color: isMissing ? C.ALERT : C.PRIMARY },
      }, {
        fontSize: isMissing ? 18 : 14, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    });

    s.addText("1x1    2x2    3x3    4x4    5x5    6x6    7x7    8x8", {
      x: 0.7, y: CONTENT_TOP + 1.05, w: 5.0, h: 0.25,
      fontSize: 8, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });

    // Dot array for square (right side top)
    addCard(s, 6.3, CONTENT_TOP + 0.05, 3.2, 1.65, { strip: C.PRIMARY });
    s.addText("Dot Array: 4 x 4 = 16", {
      x: 6.5, y: CONTENT_TOP + 0.12, w: 2.8, h: 0.25,
      fontSize: 10, fontFace: FONT_B, color: C.PRIMARY, bold: true, margin: 0,
    });
    // Draw 4x4 dot grid
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        s.addShape("roundRect", {
          x: 6.9 + c * 0.4, y: CONTENT_TOP + 0.5 + r * 0.28, w: 0.2, h: 0.2, rectRadius: 0.1,
          fill: { color: C.PRIMARY },
        });
      }
    }

    // Triangular numbers sequence (bottom half)
    addCard(s, 0.5, CONTENT_TOP + 1.85, 5.5, 1.65, { strip: C.SECONDARY });
    s.addText("Triangular Numbers", {
      x: 0.75, y: CONTENT_TOP + 1.92, w: 3.0, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });

    const triNums = ["1", "3", "6", "10", "15", "?", "?", "?"];
    triNums.forEach((n, i) => {
      const isMissing = n === "?";
      addTextOnShape(s, n, {
        x: 0.7 + i * 0.63, y: CONTENT_TOP + 2.28, w: 0.52, h: 0.48, rectRadius: 0.08,
        fill: { color: isMissing ? C.ALERT : C.SECONDARY },
      }, {
        fontSize: isMissing ? 18 : 14, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    });

    s.addText("+1     +2     +3     +4     +5     +6     +7     +8", {
      x: 0.7, y: CONTENT_TOP + 2.85, w: 5.0, h: 0.25,
      fontSize: 8, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });

    // Dot array for triangular (right side bottom)
    addCard(s, 6.3, CONTENT_TOP + 1.85, 3.2, 1.65, { strip: C.SECONDARY });
    s.addText("Dot Pattern: T5 = 15", {
      x: 6.5, y: CONTENT_TOP + 1.92, w: 2.8, h: 0.25,
      fontSize: 10, fontFace: FONT_B, color: C.SECONDARY, bold: true, margin: 0,
    });
    // Draw triangular pattern (rows: 1, 2, 3, 4, 5)
    for (let row = 0; row < 5; row++) {
      const dots = row + 1;
      const startX = 7.5 - (dots * 0.3) / 2;
      for (let d = 0; d < dots; d++) {
        s.addShape("roundRect", {
          x: startX + d * 0.3, y: CONTENT_TOP + 2.25 + row * 0.23, w: 0.18, h: 0.18, rectRadius: 0.09,
          fill: { color: C.SECONDARY },
        });
      }
    }

    addFooter(s, FOOTER);
    s.addNotes(NOTES_FLUENCY);
  })();

  // -- SLIDE 4: LI / SC -------------------------------------------------------
  liSlide(pres,
    ["We are learning to identify and describe the properties of prime, composite, square and triangular numbers so we can use them to solve problems and simplify calculations."],
    [
      "I can identify whether a number is prime or composite by testing for factors.",
      "I can represent composite numbers as a product of their prime factors.",
      "I can identify square and triangular numbers and use their properties to simplify calculations.",
    ],
    NOTES_LISC, FOOTER);

  // -- SLIDE 5: I Do -- Key Vocabulary (Stage 2) ------------------------------
  contentSlide(pres, "Stage 2 | I Do", C.PRIMARY, "Key Vocabulary", [], NOTES_VOCAB, FOOTER, (s) => {
    const terms = [
      {
        word: "Prime Number",
        def: "Has exactly 2 factors: 1 and itself.\nExamples: 2, 3, 5, 7, 11, 13\n1 is NOT prime (only 1 factor)",
        color: C.PRIMARY,
      },
      {
        word: "Composite Number",
        def: "Has 3 or more factors.\nExamples: 4, 6, 8, 9, 12, 15\nCan be written as a product of primes",
        color: C.SECONDARY,
      },
      {
        word: "Square Number",
        def: "A number multiplied by itself: n x n\nExamples: 1, 4, 9, 16, 25, 36\nForms a square dot array",
        color: C.ACCENT,
      },
      {
        word: "Triangular Number",
        def: "Sum of consecutive counting numbers.\nExamples: 1, 3, 6, 10, 15, 21\nForms a triangular dot pattern",
        color: C.ALERT,
      },
    ];

    terms.forEach((t, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const cx = 0.5 + col * 4.7;
      const cy = CONTENT_TOP + 0.05 + row * 1.95;
      const cw = 4.4;
      const ch = 1.8;

      addCard(s, cx, cy, cw, ch, { strip: t.color });

      // Term header pill
      addTextOnShape(s, t.word, {
        x: cx + 0.15, y: cy + 0.12, w: 2.2, h: 0.34, rectRadius: 0.08,
        fill: { color: t.color },
      }, {
        fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Definition
      s.addText(t.def, {
        x: cx + 0.15, y: cy + 0.55, w: cw - 0.3, h: ch - 0.7,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });
    });
  });

  // -- SLIDE 6: Worked Example 1 -- Is 23 Prime or Composite? (I Do, Stage 2) -
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example: Testing for Primes", { fontSize: 22, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "Is 23 prime or composite?", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 4.5, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    // Think-aloud steps (left side)
    addCard(s, 0.5, CONTENT_TOP + 0.5, 4.5, 2.6, { strip: C.PRIMARY });
    s.addText("Think-Aloud: Testing 23", {
      x: 0.75, y: CONTENT_TOP + 0.58, w: 4.0, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });

    const steps23 = [
      { text: "23 / 2 = 11.5", result: "No", color: C.ALERT },
      { text: "23 / 3 = 7.67", result: "No", color: C.ALERT },
      { text: "23 / 5 = 4.6", result: "No", color: C.ALERT },
      { text: "Next: 7. But 7 x 7 = 49 > 23", result: "STOP", color: C.SUCCESS },
    ];

    steps23.forEach((step, i) => {
      const sy = CONTENT_TOP + 0.95 + i * 0.42;
      s.addText([
        { text: step.text, options: { fontSize: 11, color: C.CHARCOAL } },
        { text: "  " + step.result, options: { fontSize: 11, color: step.color, bold: true } },
      ], {
        x: 0.85, y: sy, w: 3.8, h: 0.35,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Conclusion for 23
    addTextOnShape(s, "23 is PRIME (only factors: 1 and 23)", {
      x: 0.5, y: CONTENT_TOP + 2.7, w: 4.5, h: 0.38, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, {
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    // Second example: Is 15 prime or composite? (right side)
    addCard(s, 5.3, CONTENT_TOP + 0.5, 4.2, 2.6, { strip: C.SECONDARY });
    s.addText("Now Try: Is 15 Prime?", {
      x: 5.5, y: CONTENT_TOP + 0.58, w: 3.8, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });

    s.addText([
      { text: "15 / 3 = 5", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Yes! 3 is a factor.", options: { breakLine: true, fontSize: 11, color: C.SUCCESS, bold: true } },
      { text: "15 is COMPOSITE", options: { breakLine: true, fontSize: 13, color: C.ALERT, bold: true } },
    ], {
      x: 5.5, y: CONTENT_TOP + 1.0, w: 3.8, h: 0.8,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Factor tree for 15
    s.addText("Factor Tree:", {
      x: 5.5, y: CONTENT_TOP + 1.85, w: 2.0, h: 0.25,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, bold: true, margin: 0,
    });

    // 15 at top
    addTextOnShape(s, "15", {
      x: 6.5, y: CONTENT_TOP + 2.1, w: 0.55, h: 0.4, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });

    // 3 and 5 at bottom
    addTextOnShape(s, "3", {
      x: 5.9, y: CONTENT_TOP + 2.65, w: 0.45, h: 0.38, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    }, { fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true });
    addTextOnShape(s, "5", {
      x: 7.2, y: CONTENT_TOP + 2.65, w: 0.45, h: 0.38, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    }, { fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true });

    // "15 = 3 x 5" summary
    s.addText("15 = 3 x 5 (both prime)", {
      x: 5.5, y: SAFE_BOTTOM - 0.5, w: 3.8, h: 0.3,
      fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, italic: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_WE1);
  })();

  // -- SLIDE 7: Worked Example 2 -- Prime Factorisation of 36 (I Do, Stage 2) -
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example: Prime Factorisation", { fontSize: 22, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "Write 36 as a product of prime factors", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 5.0, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    // Factor tree (left side)
    addCard(s, 0.5, CONTENT_TOP + 0.5, 4.5, 2.8, { strip: C.PRIMARY });
    s.addText("Factor Tree for 36", {
      x: 0.75, y: CONTENT_TOP + 0.58, w: 3.0, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });

    // Tree: 36 -> 6 x 6 -> (2x3) x (2x3)
    // Level 0: 36
    addTextOnShape(s, "36", {
      x: 2.3, y: CONTENT_TOP + 0.95, w: 0.6, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });

    // Level 1: 6 and 6
    addTextOnShape(s, "6", {
      x: 1.4, y: CONTENT_TOP + 1.55, w: 0.5, h: 0.38, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, { fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true });
    addTextOnShape(s, "6", {
      x: 3.3, y: CONTENT_TOP + 1.55, w: 0.5, h: 0.38, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, { fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true });

    // Multiply sign between
    s.addText("x", {
      x: 2.2, y: CONTENT_TOP + 1.55, w: 0.4, h: 0.38,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, align: "center", valign: "middle", margin: 0,
    });

    // Level 2: 2, 3, 2, 3
    const primeY = CONTENT_TOP + 2.15;
    addTextOnShape(s, "2", {
      x: 0.9, y: primeY, w: 0.42, h: 0.36, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
    addTextOnShape(s, "3", {
      x: 1.75, y: primeY, w: 0.42, h: 0.36, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
    addTextOnShape(s, "2", {
      x: 2.85, y: primeY, w: 0.42, h: 0.36, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
    addTextOnShape(s, "3", {
      x: 3.7, y: primeY, w: 0.42, h: 0.36, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });

    // Result
    addTextOnShape(s, "36 = 2 x 2 x 3 x 3 = 2\u00B2 x 3\u00B2", {
      x: 0.5, y: CONTENT_TOP + 2.75, w: 4.5, h: 0.42, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    }, {
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    // Simplification example (right side)
    addCard(s, 5.3, CONTENT_TOP + 0.5, 4.2, 2.8, { strip: C.ACCENT });
    s.addText("Why Is This Useful?", {
      x: 5.5, y: CONTENT_TOP + 0.58, w: 3.8, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.ACCENT, bold: true, margin: 0,
    });

    s.addText([
      { text: "Calculate 15 x 16", options: { bold: true, breakLine: true, fontSize: 12, color: C.CHARCOAL } },
      { text: "15 = 5 x 3", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "16 = 2 x 2 x 2 x 2", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "15 x 16 = 5 x 3 x 2 x 2 x 2 x 2", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Rearrange:", options: { breakLine: true, fontSize: 11, color: C.ACCENT, bold: true } },
      { text: "(5 x 2) x (3 x 2 x 2 x 2)", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "= 10 x 24 = 240", options: { fontSize: 13, color: C.SUCCESS, bold: true } },
    ], {
      x: 5.5, y: CONTENT_TOP + 0.95, w: 3.8, h: 2.0,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Strategy tip
    addTextOnShape(s, "Strategy: Hunt for 2 x 5 = 10!", {
      x: 5.3, y: CONTENT_TOP + 2.85, w: 4.2, h: 0.38, rectRadius: 0.08,
      fill: { color: C.ACCENT },
    }, {
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_WE2);
  })();

  // -- SLIDES 8-9: CFU 1 -- Show Me Boards (withReveal) -----------------------
  withReveal(
    () => cfuSlide(pres, "CFU", "Quick Check", "Show Me Boards",
      "Is 37 prime or composite?\n\nWrite P or C on your whiteboard.\nTest it -- show your working!",
      NOTES_CFU1, FOOTER),
    (slide) => {
      addTextOnShape(slide, "P -- PRIME", {
        x: 2.5, y: 4.0, w: 5, h: 0.45, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      slide.addText([
        { text: "37 / 2 = 18.5 (no)    37 / 3 = 12.3 (no)    37 / 5 = 7.4 (no)", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "Next prime: 7.  7 x 7 = 49 > 37  -->  STOP. No factors found.", options: { fontSize: 10, color: C.ACCENT, bold: true } },
      ], {
        x: 2.0, y: 4.5, w: 6, h: 0.5,
        fontFace: FONT_B, margin: 0,
      });
    }
  );

  // -- SLIDES 10-11: We Do -- Problem Pair 1: 29 and 27 (withReveal) ----------
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Prime or Composite?", { fontSize: 22, color: C.SECONDARY });

      // Two number cards
      addTextOnShape(s, "29", {
        x: 0.5, y: CONTENT_TOP + 0.1, w: 4.2, h: 0.6, rectRadius: 0.1,
        fill: { color: C.PRIMARY },
      }, {
        fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      addTextOnShape(s, "27", {
        x: 5.3, y: CONTENT_TOP + 0.1, w: 4.2, h: 0.6, rectRadius: 0.1,
        fill: { color: C.SECONDARY },
      }, {
        fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Testing prompt cards
      addCard(s, 0.5, CONTENT_TOP + 0.9, 4.2, 2.2, { strip: C.PRIMARY });
      s.addText([
        { text: "Test 29:", options: { bold: true, breakLine: true, fontSize: 13, color: C.PRIMARY } },
        { text: "Divide by 2, 3, 5, 7...", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Is it prime or composite?", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Write P or C on your board.", options: { fontSize: 11, color: C.MUTED } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.0, w: 3.7, h: 1.5,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addCard(s, 5.3, CONTENT_TOP + 0.9, 4.2, 2.2, { strip: C.SECONDARY });
      s.addText([
        { text: "Test 27:", options: { bold: true, breakLine: true, fontSize: 13, color: C.SECONDARY } },
        { text: "Divide by 2, 3, 5, 7...", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Is it prime or composite?", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "If composite: write the\nprime factorisation.", options: { fontSize: 11, color: C.ALERT, bold: true } },
      ], {
        x: 5.55, y: CONTENT_TOP + 1.0, w: 3.7, h: 1.5,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Cold Call instruction
      addTextOnShape(s, "Cold Call -- be ready!", {
        x: 3.5, y: SAFE_BOTTOM - 0.5, w: 3.0, h: 0.4, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, {
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (slide) => {
      // Reveal answers overlay -- covers the testing prompt cards
      addCard(slide, 0.5, CONTENT_TOP + 0.9, 4.2, 2.2, { strip: C.SUCCESS });
      slide.addText([
        { text: "29 is PRIME", options: { bold: true, breakLine: true, fontSize: 14, color: C.SUCCESS } },
        { text: "29 / 2 = 14.5 (no)", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "29 / 3 = 9.67 (no)", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "29 / 5 = 5.8 (no)", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "7 x 7 = 49 > 29 --> STOP", options: { fontSize: 10, color: C.ACCENT, bold: true } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.0, w: 3.7, h: 1.8,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addCard(slide, 5.3, CONTENT_TOP + 0.9, 4.2, 2.2, { strip: C.ALERT });
      slide.addText([
        { text: "27 is COMPOSITE", options: { bold: true, breakLine: true, fontSize: 14, color: C.ALERT } },
        { text: "27 / 3 = 9  -- YES!", options: { breakLine: true, fontSize: 10, color: C.SUCCESS, bold: true } },
        { text: "Prime factorisation:", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL, bold: true } },
        { text: "27 = 3 x 9 = 3 x 3 x 3", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "27 = 3\u00B3", options: { fontSize: 13, color: C.PRIMARY, bold: true } },
      ], {
        x: 5.55, y: CONTENT_TOP + 1.0, w: 3.7, h: 1.8,
        fontFace: FONT_B, margin: 0, valign: "top",
      });
    }
  );

  // -- SLIDES 12-13: We Do -- Simplify Using Prime Factors (withReveal) -------
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Simplify Using Prime Factors", { fontSize: 22, color: C.SECONDARY });

      // Teacher-led example (left)
      addCard(s, 0.5, CONTENT_TOP + 0.0, 4.5, 1.7, { strip: C.SECONDARY });
      s.addText([
        { text: "Together: 15 x 16", options: { bold: true, breakLine: true, fontSize: 13, color: C.SECONDARY } },
        { text: "15 = 3 x 5    16 = 2 x 2 x 2 x 2", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "= (5 x 2) x (3 x 2 x 2 x 2)", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "= 10 x 24 = 240", options: { fontSize: 12, color: C.SUCCESS, bold: true } },
      ], {
        x: 0.75, y: CONTENT_TOP + 0.1, w: 4.0, h: 1.4,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Student attempt (right)
      addCard(s, 5.3, CONTENT_TOP + 0.0, 4.2, 1.7, { strip: C.ACCENT });
      s.addText([
        { text: "Your Turn: 12 x 25", options: { bold: true, breakLine: true, fontSize: 13, color: C.ACCENT } },
        { text: "Break each number into primes.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Rearrange to make friendly numbers.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Calculate!", options: { fontSize: 11, color: C.ALERT, bold: true } },
      ], {
        x: 5.55, y: CONTENT_TOP + 0.1, w: 3.7, h: 1.4,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Big number display
      addTextOnShape(s, "12 x 25 = ?", {
        x: 2.5, y: CONTENT_TOP + 2.0, w: 5, h: 0.8, rectRadius: 0.12,
        fill: { color: C.PRIMARY },
      }, {
        fontSize: 36, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Strategy reminder
      addTextOnShape(s, "Hunt for 2 x 5 = 10 or 4 x 25 = 100", {
        x: 2.0, y: SAFE_BOTTOM - 0.55, w: 6, h: 0.42, rectRadius: 0.08,
        fill: { color: C.ACCENT },
      }, {
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO2);
      return s;
    },
    (slide) => {
      // Reveal: answer overlay covers the big number display and strategy bar
      const revealH = SAFE_BOTTOM - (CONTENT_TOP + 1.85);
      addCard(slide, 1.5, CONTENT_TOP + 1.85, 7.0, revealH, { strip: C.SUCCESS });
      slide.addText([
        { text: "12 x 25", options: { bold: true, breakLine: true, fontSize: 14, color: C.SECONDARY } },
        { text: "12 = 2 x 2 x 3       25 = 5 x 5", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "= (2 x 5) x (2 x 5) x 3", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "= 10 x 10 x 3", options: { breakLine: true, fontSize: 12, color: C.ACCENT, bold: true } },
        { text: "= 300", options: { fontSize: 20, color: C.SUCCESS, bold: true } },
      ], {
        x: 1.75, y: CONTENT_TOP + 1.95, w: 6.5, h: revealH - 0.2,
        fontFace: FONT_B, margin: 0, valign: "top",
      });
    }
  );

  // -- SLIDES 14-15: We Do -- Square & Triangular Numbers (withReveal) --------
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Square & Triangular Numbers", { fontSize: 22, color: C.SECONDARY });

      // Square numbers (left)
      addCard(s, 0.5, CONTENT_TOP + 0.0, 4.5, 1.55, { strip: C.PRIMARY });
      s.addText("Square Numbers: n x n", {
        x: 0.75, y: CONTENT_TOP + 0.06, w: 4.0, h: 0.25,
        fontSize: 11, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
      });

      const sqArr = [
        { n: 1, label: "1" }, { n: 4, label: "4" }, { n: 9, label: "9" },
        { n: 16, label: "16" }, { n: 25, label: "25" },
      ];
      sqArr.forEach((item, i) => {
        addTextOnShape(s, item.label, {
          x: 0.7 + i * 0.85, y: CONTENT_TOP + 0.38, w: 0.65, h: 0.45, rectRadius: 0.08,
          fill: { color: C.PRIMARY },
        }, { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });
      });
      s.addText("Pattern: each is n x n (1x1, 2x2, 3x3, 4x4, 5x5...)", {
        x: 0.75, y: CONTENT_TOP + 0.95, w: 4.0, h: 0.25,
        fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });

      // Triangular numbers (right)
      addCard(s, 5.3, CONTENT_TOP + 0.0, 4.2, 1.55, { strip: C.SECONDARY });
      s.addText("Triangular Numbers: 1+2+3+...+n", {
        x: 5.55, y: CONTENT_TOP + 0.06, w: 3.7, h: 0.25,
        fontSize: 11, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
      });

      const triArr = [
        { n: 1, label: "1" }, { n: 3, label: "3" }, { n: 6, label: "6" },
        { n: 10, label: "10" }, { n: 15, label: "15" },
      ];
      triArr.forEach((item, i) => {
        addTextOnShape(s, item.label, {
          x: 5.5 + i * 0.8, y: CONTENT_TOP + 0.38, w: 0.6, h: 0.45, rectRadius: 0.08,
          fill: { color: C.SECONDARY },
        }, { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });
      });
      s.addText("Pattern: add 1 more each time (+2, +3, +4, +5...)", {
        x: 5.55, y: CONTENT_TOP + 0.95, w: 3.7, h: 0.25,
        fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });

      // Special question
      addCard(s, 0.5, CONTENT_TOP + 1.75, 9, 1.8, { strip: C.ALERT });
      s.addText([
        { text: "Think-Pair-Share", options: { bold: true, breakLine: true, fontSize: 14, color: C.ALERT } },
        { text: "Is 36 both a square number AND a triangular number?", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL, bold: true } },
        { text: "Turn to your partner. Discuss for 30 seconds.", options: { fontSize: 11, color: C.MUTED } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.85, w: 8.5, h: 1.0,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Hint cards
      addTextOnShape(s, "Hint: 6 x 6 = ?", {
        x: 0.75, y: CONTENT_TOP + 3.0, w: 2.2, h: 0.35, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      }, { fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true });

      addTextOnShape(s, "Hint: 1+2+3+...+8 = ?", {
        x: 3.2, y: CONTENT_TOP + 3.0, w: 2.5, h: 0.35, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO3);
      return s;
    },
    (slide) => {
      // Reveal answer
      addCard(slide, 0.5, CONTENT_TOP + 1.75, 9, 1.8, { strip: C.SUCCESS });
      slide.addText([
        { text: "YES! 36 is BOTH!", options: { bold: true, breakLine: true, fontSize: 16, color: C.SUCCESS } },
        { text: "Square: 6 x 6 = 36 (the 6th square number)", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "Triangular: 1+2+3+4+5+6+7+8 = 36 (the 8th triangular number)", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "Numbers that are BOTH square and triangular are extremely rare!", options: { fontSize: 11, color: C.ALERT, bold: true } },
      ], {
        x: 0.75, y: CONTENT_TOP + 1.85, w: 8.5, h: 1.5,
        fontFace: FONT_B, margin: 0, valign: "top",
      });
    }
  );

  // -- SLIDES 16-17: CFU 2 -- Hinge Question (withReveal) ---------------------
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "Hinge Question", { color: C.ALERT, w: 2.2 });
      addTitle(s, "Which statement is FALSE?", { color: C.ALERT });

      const options = [
        { letter: "A", text: "2 is the only even\nprime number", color: C.PRIMARY },
        { letter: "B", text: "All prime numbers\nare odd", color: C.SECONDARY },
        { letter: "C", text: "49 is a square\nnumber", color: C.ACCENT },
        { letter: "D", text: "1 is not a\nprime number", color: C.SUCCESS },
      ];
      options.forEach((opt, i) => {
        const ox = 0.5 + i * 2.3;
        const oy = CONTENT_TOP + 0.2;
        addCard(s, ox, oy, 2.0, 1.8, { strip: opt.color });

        addTextOnShape(s, opt.letter, {
          x: ox + 0.15, y: oy + 0.15, w: 0.45, h: 0.45, rectRadius: 0.22,
          fill: { color: opt.color },
        }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

        s.addText(opt.text, {
          x: ox + 0.1, y: oy + 0.7, w: 1.8, h: 0.9,
          fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
      });

      // Instruction
      addTextOnShape(s, "Finger Voting: Hold up 1, 2, 3, or 4 fingers", {
        x: 1.5, y: CONTENT_TOP + 2.3, w: 7, h: 0.42, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, {
        fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_HINGE);
      return s;
    },
    (slide) => {
      // Reveal: highlight B as FALSE
      addTextOnShape(slide, "B is FALSE -- Not all primes are odd. 2 is prime AND even!", {
        x: 1.0, y: CONTENT_TOP + 2.2, w: 8, h: 0.55, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      slide.addText([
        { text: "A) TRUE -- 2 is the only even prime (all other evens divisible by 2)", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "C) TRUE -- 49 = 7 x 7", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "D) TRUE -- 1 has only 1 factor; primes need exactly 2 factors", options: { fontSize: 10, color: C.CHARCOAL } },
      ], {
        x: 1.5, y: CONTENT_TOP + 2.85, w: 7, h: 0.6,
        fontFace: FONT_B, margin: 0,
      });
    }
  );

  // -- SLIDE 18: You Do -- Independent Practice (Stage 4) ---------------------
  contentSlide(pres, "Stage 4 | You Do", C.ALERT, "Independent Practice", [], NOTES_YOUDO, FOOTER, (s) => {
    // First / Next / Then instruction card
    addCard(s, 0.5, CONTENT_TOP, 5.5, 2.8, { strip: C.ALERT });

    const steps = [
      { label: "First:", text: "Test these numbers -- prime or composite?\n31, 33, 39, 41, 47, 51" },
      { label: "Next:", text: "Write the prime factorisation of 48 and 60\nusing factor trees." },
      { label: "Then:", text: "Calculate 18 x 15 by rearranging prime\nfactors. Show your working." },
    ];
    steps.forEach((st, i) => {
      const sy = CONTENT_TOP + 0.1 + i * 0.85;
      s.addText([
        { text: st.label + " ", options: { bold: true, fontSize: 13, color: C.ALERT } },
        { text: st.text, options: { fontSize: 12, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: sy, w: 5.0, h: 0.75,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Challenge card (right side)
    addCard(s, 6.3, CONTENT_TOP, 3.2, 2.8, { strip: C.ACCENT });
    s.addText([
      { text: "Challenge", options: { bold: true, breakLine: true, fontSize: 13, color: C.ACCENT } },
      { text: "Find all square numbers between 1 and 100.", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "Find all triangular numbers between 1 and 100.", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "Is there another number (besides 1 and 36) that is BOTH?", options: { fontSize: 10, color: C.ALERT, bold: true } },
    ], {
      x: 6.55, y: CONTENT_TOP + 0.1, w: 2.7, h: 2.5,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // SC reference card at bottom
    addCard(s, 0.5, CONTENT_TOP + 2.95, 9, 0.95, { strip: C.SECONDARY });
    s.addText([
      { text: "SC1: I can identify whether a number is prime or composite by testing for factors.", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
      { text: "SC2: I can represent composite numbers as a product of their prime factors.", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
      { text: "SC3: I can identify square and triangular numbers and use their properties.", options: { fontSize: 9, color: C.CHARCOAL } },
    ], {
      x: 0.75, y: CONTENT_TOP + 3.0, w: 8.5, h: 0.8,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Worksheet reference
    addTextOnShape(s, "Use your SR1 Worksheet", {
      x: 6.8, y: SAFE_BOTTOM - 0.55, w: 2.7, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, {
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
    });
  });

  // -- SLIDE 19: Exit Ticket (Stage 5) ----------------------------------------
  exitTicketSlide(pres, [
    "Is 43 prime or composite? Explain how you tested it.",
    "Write 24 as a product of its prime factors.",
    "What is the 8th square number? What is the 7th triangular number?",
  ], NOTES_EXIT, FOOTER);

  // -- SLIDE 20: Resources ----------------------------------------------------
  addResourceSlide(pres, [
    {
      name: "SR1 -- Prime, Composite, Square & Triangular Worksheet",
      fileName: "SR1_Prime_Composite_Square_Triangular_Worksheet.pdf",
      description: "Independent practice -- testing numbers, factor trees, calculation simplification.",
    },
    {
      name: "SR2 -- Answer Key",
      fileName: "SR2_Prime_Composite_Answer_Key.pdf",
      description: "Answer key for SR1. For teacher reference.",
    },
    {
      name: "EXT1 -- Goldbach's Conjecture Investigation",
      fileName: "EXT1_Goldbachs_Conjecture_Investigation.pdf",
      description: "Self-contained extending resource: every even number > 2 as the sum of two primes.",
    },
  ], { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // -- SLIDE 21: Closing ------------------------------------------------------
  closingSlide(pres,
    "What was the most interesting thing you learned today about special numbers? Turn to your partner -- 30 seconds.",
    [
      "SC1: I can identify whether a number is prime or composite by testing for factors.",
      "SC2: I can represent composite numbers as a product of their prime factors.",
      "SC3: I can identify square and triangular numbers and use their properties to simplify calculations.",
      "Well done! You now have a complete toolkit of number properties.",
    ],
    NOTES_CLOSING);

  // -- Write PPTX -------------------------------------------------------------
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: OUT_DIR + "/NP2_Lesson3_Prime_Composite_Square_Triangular.pptx" });
  console.log("PPTX written to " + OUT_DIR);

  // -- Generate companion PDFs ------------------------------------------------
  await generateWorksheet();
  await generateAnswerKey();
  await generateExtendingPdf();
  console.log("All PDFs generated.");
}

// -- PDF: SR1 -- Prime, Composite, Square & Triangular Numbers Worksheet ------

async function generateWorksheet() {
  const doc = createPdf({ title: "Prime, Composite, Square & Triangular Numbers Worksheet" });

  let y = addPdfHeader(doc, "Prime, Composite, Square &\nTriangular Numbers", {
    subtitle: "SR1 -- Supporting Resource",
    color: C.PRIMARY,
    lessonInfo: "Session 3 of 3 | Number Properties 2 | Year 5/6 Maths",
  });

  y = addTipBox(doc, "Remember: To test if a number is prime, divide by each small prime (2, 3, 5, 7...) and stop when the next prime squared exceeds the number. If no prime divides evenly, it's prime!", y, { color: C.SECONDARY });

  // Section A: Prime or Composite
  y = addSectionHeading(doc, "Section A: Prime or Composite?", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Test each number. Write P (prime) or C (composite). If composite, list one factor pair.", y);

  const testNums = [31, 33, 39, 41, 47, 51];
  testNums.forEach((n, i) => {
    y = addProblem(doc, i + 1, `Is ${n} prime or composite?`, y, {
      writeLines: [
        { label: "Tests:" },
        { label: "Answer (P or C):" },
        { label: "If C, one factor pair:" },
      ],
      color: C.PRIMARY,
    });
  });

  // Section B: Factor Trees
  y = addSectionHeading(doc, "Section B: Prime Factorisation (Factor Trees)", y, { color: C.ACCENT });
  y = addBodyText(doc, "Draw a factor tree for each number. Write the final prime factorisation.", y);

  y = addProblem(doc, 7, "Write 48 as a product of prime factors.", y, {
    writeLines: [
      { label: "Factor tree:" },
      { label: "" },
      { label: "" },
      { label: "Prime factorisation:" },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 8, "Write 60 as a product of prime factors.", y, {
    writeLines: [
      { label: "Factor tree:" },
      { label: "" },
      { label: "" },
      { label: "Prime factorisation:" },
    ],
    color: C.ACCENT,
  });

  // Section C: Simplify Using Prime Factors
  y = addSectionHeading(doc, "Section C: Simplify Using Prime Factors", y, { color: C.SECONDARY });

  y = addProblem(doc, 9, "Calculate 18 x 15 by rearranging prime factors. Show all working.", y, {
    writeLines: [
      { label: "18 = " },
      { label: "15 = " },
      { label: "18 x 15 = " },
      { label: "Rearrange:" },
      { label: "Answer:" },
    ],
    color: C.SECONDARY,
  });

  // Section D: Challenge
  y = addSectionHeading(doc, "Section D: Challenge -- Square & Triangular Numbers", y, { color: C.ALERT });

  y = addProblem(doc, 10, "List all square numbers between 1 and 100.", y, {
    writeLines: [
      { label: "Square numbers:" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, 11, "List all triangular numbers between 1 and 100.", y, {
    writeLines: [
      { label: "Triangular numbers:" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, 12, "Besides 1 and 36, is there another number between 1 and 100 that is BOTH a square number and a triangular number?", y, {
    writeLines: [
      { label: "Answer and explanation:" },
    ],
    color: C.ALERT,
  });

  addPdfFooter(doc, "Session 3 of 3 | Number Properties 2 | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR1_Prime_Composite_Square_Triangular_Worksheet.pdf");
  console.log("  SR1 worksheet written.");
}

// -- PDF: SR2 -- Answer Key ---------------------------------------------------

async function generateAnswerKey() {
  const doc = createPdf({ title: "Prime, Composite, Square & Triangular Numbers -- Answer Key" });

  let y = addPdfHeader(doc, "Answer Key -- Prime, Composite,\nSquare & Triangular Numbers", {
    subtitle: "SR2 -- Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: "Session 3 of 3 | Number Properties 2 | Year 5/6 Maths",
    showNameDate: false,
  });

  // Section A
  y = addSectionHeading(doc, "Section A: Prime or Composite?", y, { color: C.PRIMARY });

  y = addProblem(doc, 1, "31:", y, {
    writeLines: [
      { label: "Tests:", answer: "31/2=15.5, 31/3=10.3, 31/5=6.2; 7x7=49>31 STOP" },
      { label: "Answer:", answer: "P (Prime)" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "33:", y, {
    writeLines: [
      { label: "Tests:", answer: "33/3=11 -- YES" },
      { label: "Answer:", answer: "C (Composite). Factor pair: (3, 11)" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "39:", y, {
    writeLines: [
      { label: "Tests:", answer: "39/3=13 -- YES" },
      { label: "Answer:", answer: "C (Composite). Factor pair: (3, 13)" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 4, "41:", y, {
    writeLines: [
      { label: "Tests:", answer: "41/2=20.5, 41/3=13.7, 41/5=8.2; 7x7=49>41 STOP" },
      { label: "Answer:", answer: "P (Prime)" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 5, "47:", y, {
    writeLines: [
      { label: "Tests:", answer: "47/2=23.5, 47/3=15.7, 47/5=9.4; 7x7=49>47 STOP" },
      { label: "Answer:", answer: "P (Prime)" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 6, "51:", y, {
    writeLines: [
      { label: "Tests:", answer: "51/3=17 -- YES (digit sum 5+1=6, divisible by 3)" },
      { label: "Answer:", answer: "C (Composite). Factor pair: (3, 17)" },
    ],
    color: C.PRIMARY,
  });

  // Section B
  y = addSectionHeading(doc, "Section B: Prime Factorisation", y, { color: C.ACCENT });

  y = addProblem(doc, 7, "48:", y, {
    writeLines: [
      { label: "Factor tree:", answer: "48 -> 6 x 8 -> (2x3) x (2x4) -> (2x3) x (2x2x2)" },
      { label: "Prime factorisation:", answer: "48 = 2 x 2 x 2 x 2 x 3 = 2^4 x 3" },
    ],
    color: C.ACCENT,
  });

  y = addProblem(doc, 8, "60:", y, {
    writeLines: [
      { label: "Factor tree:", answer: "60 -> 6 x 10 -> (2x3) x (2x5)" },
      { label: "Prime factorisation:", answer: "60 = 2 x 2 x 3 x 5 = 2^2 x 3 x 5" },
    ],
    color: C.ACCENT,
  });

  // Section C
  y = addSectionHeading(doc, "Section C: Simplify Using Prime Factors", y, { color: C.SECONDARY });

  y = addProblem(doc, 9, "18 x 15:", y, {
    writeLines: [
      { label: "18 =", answer: "2 x 3 x 3" },
      { label: "15 =", answer: "3 x 5" },
      { label: "18 x 15 =", answer: "2 x 3 x 3 x 3 x 5 = (2 x 5) x (3 x 3 x 3) = 10 x 27 = 270" },
    ],
    color: C.SECONDARY,
  });

  // Section D
  y = addSectionHeading(doc, "Section D: Challenge", y, { color: C.ALERT });

  y = addProblem(doc, 10, "Square numbers 1-100:", y, {
    writeLines: [
      { label: "Answer:", answer: "1, 4, 9, 16, 25, 36, 49, 64, 81, 100 (10 square numbers)" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, 11, "Triangular numbers 1-100:", y, {
    writeLines: [
      { label: "Answer:", answer: "1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91 (13 triangular numbers)" },
    ],
    color: C.ALERT,
  });

  y = addProblem(doc, 12, "Both square and triangular (besides 1 and 36)?", y, {
    writeLines: [
      { label: "Answer:", answer: "No. The next number that is both square and triangular is 1225 (35^2 = T49), which is beyond 100." },
    ],
    color: C.ALERT,
  });

  addPdfFooter(doc, "Teacher Reference -- Do Not Distribute to Students");
  await writePdf(doc, OUT_DIR + "/SR2_Prime_Composite_Answer_Key.pdf");
  console.log("  SR2 answer key written.");
}

// -- PDF: EXT1 -- Goldbach's Conjecture Investigation -------------------------

async function generateExtendingPdf() {
  const doc = createPdf({ title: "Goldbach's Conjecture Investigation" });

  let y = addPdfHeader(doc, "Goldbach's Conjecture\nInvestigation", {
    subtitle: "EXT1 -- Extending Challenge",
    color: C.ACCENT,
    lessonInfo: "Session 3 of 3 | Number Properties 2 | Year 5/6 Maths",
  });

  y = addSectionHeading(doc, "What is Goldbach's Conjecture?", y, { color: C.ACCENT });
  y = addBodyText(doc, "In 1742, a mathematician named Christian Goldbach wrote a letter to the famous mathematician Leonhard Euler. In it, he made an extraordinary claim:", y);

  y = addTipBox(doc, "Goldbach's Conjecture: Every even number greater than 2 can be written as the sum of two prime numbers.", y, { color: C.ACCENT });

  y = addBodyText(doc, "For example: 8 = 3 + 5, and both 3 and 5 are prime. 20 = 3 + 17, and both are prime.", y);
  y = addBodyText(doc, "This has been tested for every even number up to 4,000,000,000,000,000,000 (4 quintillion!) and it has ALWAYS worked. But amazingly, nobody has ever been able to PROVE that it works for ALL even numbers. It remains one of the greatest unsolved problems in mathematics!", y);

  y = addSectionHeading(doc, "Worked Example: Is 12 the Sum of Two Primes?", y, { color: C.ACCENT });
  y = addBodyText(doc, "Step 1: List the prime numbers less than 12: 2, 3, 5, 7, 11.", y);
  y = addBodyText(doc, "Step 2: Try pairs that add to 12:", y);
  y = addBodyText(doc, "  2 + 10 = 12. Is 10 prime? No (10 = 2 x 5).", y);
  y = addBodyText(doc, "  3 + 9 = 12. Is 9 prime? No (9 = 3 x 3).", y);
  y = addBodyText(doc, "  5 + 7 = 12. Is 7 prime? YES!", y);
  y = addBodyText(doc, "Step 3: 12 = 5 + 7. Goldbach's conjecture holds for 12.", y);

  y = addTipBox(doc, "Tip: Start with the smallest prime (2) and work up. For each prime p, check if (target - p) is also prime. If yes, you've found a Goldbach pair!", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Your Investigation", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Write each even number as the sum of two prime numbers. Some numbers have more than one way -- find at least one. The first few are done for you.", y);

  const evens = [
    { n: 4, hint: "4 = 2 + 2" },
    { n: 6, hint: "6 = 3 + 3" },
    { n: 8, hint: "" },
    { n: 10, hint: "" },
    { n: 12, hint: "" },
    { n: 14, hint: "" },
    { n: 16, hint: "" },
    { n: 18, hint: "" },
    { n: 20, hint: "" },
    { n: 22, hint: "" },
    { n: 24, hint: "" },
    { n: 26, hint: "" },
    { n: 28, hint: "" },
    { n: 30, hint: "" },
    { n: 32, hint: "" },
    { n: 34, hint: "" },
    { n: 36, hint: "" },
    { n: 38, hint: "" },
    { n: 40, hint: "" },
    { n: 42, hint: "" },
    { n: 44, hint: "" },
    { n: 46, hint: "" },
    { n: 48, hint: "" },
    { n: 50, hint: "" },
  ];
  evens.forEach((item, i) => {
    if (item.hint) {
      y = addProblem(doc, i + 1, `${item.n} = `, y, {
        writeLines: [{ label: "", answer: item.hint }],
        color: C.PRIMARY,
      });
    } else {
      y = addProblem(doc, i + 1, `${item.n} = _____ + _____`, y, {
        writeLines: [{ label: "Both prime?" }],
        color: C.PRIMARY,
      });
    }
  });

  y = addSectionHeading(doc, "Bonus Questions", y, { color: C.ACCENT });
  y = addBodyText(doc, "1. Which even number between 4 and 50 has the MOST different Goldbach pairs? (Hint: try 30 or 48.)", y);
  y = addWriteLine(doc, "", y);
  y = addBodyText(doc, "2. Can you find a Goldbach pair for 100? (Hint: 100 = ? + ?)", y);
  y = addWriteLine(doc, "", y);
  y = addBodyText(doc, "3. Goldbach's conjecture only talks about EVEN numbers. Can every ODD number greater than 5 be written as the sum of three primes? Try a few!", y);
  y = addWriteLine(doc, "", y);

  y = addSectionHeading(doc, "Did You Know?", y, { color: C.SECONDARY });
  y = addBodyText(doc, "In 2000, the publisher Faber & Faber offered a $1,000,000 prize to anyone who could prove Goldbach's Conjecture. Nobody claimed the prize! The conjecture has been verified by computers up to enormous numbers, but a mathematical proof remains elusive. Perhaps one day, YOU might be the mathematician who finally proves it!", y);

  addPdfFooter(doc, "Session 3 of 3 | Number Properties 2 | Year 5/6 Maths -- Extending Investigation");
  await writePdf(doc, OUT_DIR + "/EXT1_Goldbachs_Conjecture_Investigation.pdf");
  console.log("  EXT1 extending investigation written.");
}

// -- Main ---------------------------------------------------------------------
build().catch((err) => { console.error(err); process.exit(1); });
