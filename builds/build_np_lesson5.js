// Lesson 5 of 5: LCM, HCF & Patterns
// Year 5/6 Mathematics — Number Properties
// Uses shared helpers from pv_helpers.js and pv_palette.js

"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");

const {
  C, FONT_H, FONT_B, STAGE_COLORS,
  SAFE_BOTTOM, CONTENT_TOP,
  addTopBar, addBadge, addStageBadge, addTitle, addCard, addFooter,
  addTextOnShape, addNumberLine, makeShadow, makeCardShadow, getContrastColor,
  withReveal,
  titleSlide, liSlide, contentSlide, workedExSlide, cfuSlide,
  exitTicketSlide, closingSlide,
} = require("../themes/pv_helpers");

const OUT_DIR = "output/NP_Lesson5_LCM_HCF_Patterns";

const FOOTER = "Session 5 of 5  |  Number Properties  |  Year 5/6 Maths";

// ---------------------------------------------------------------------------
// Teacher notes strings (kept as constants to keep build() readable)
// ---------------------------------------------------------------------------

const NOTES_TITLE = `SAY:
• "Welcome to our final session on number properties. Over the past four sessions we have explored factors, multiples, prime numbers, square numbers, and triangular numbers. Today we bring it all together — we will learn how to find the Lowest Common Multiple and Highest Common Factor of numbers, and investigate some fascinating patterns that emerge when we apply mathematical rules."
• "By the end of today you will be able to find the LCM and HCF of two numbers, use estimation to check your answers, and describe patterns when you apply rules systematically."

DO:
• Display the title slide while students are settling.
• Have mini whiteboards, markers and erasers on every table.
• If available, place a multiplication grid or times table chart on each table for reference.

TEACHER NOTES:
This lesson is the capstone of a five-session unit on number properties. Sessions 1-4 covered: (1) factors and factor pairs, (2) multiples and divisibility, (3) prime numbers and prime factorisation, (4) square and triangular numbers. Today synthesises the concepts of factors and multiples into LCM and HCF — higher-order applications that require fluent recall of earlier content. The Daily Review deliberately revisits estimation (a cross-strand skill) and prior unit content to strengthen retrieval pathways. VTLM 2.0 element: Spiral curriculum — building on prior learning.

WATCH FOR:
• Students who have forgotten key vocabulary from earlier sessions — have a "Number Properties Word Wall" visible if possible.
• Students who are anxious about the final session — reassure them that today builds on what they already know.

[Maths: Number Properties — Session 5 | VTLM 2.0: Spiral curriculum]`;

const NOTES_DR1 = `SAY:
• "Let's warm up with some estimation. Estimation is a powerful tool — it helps us check whether our answers are reasonable."
• Q1: "Estimate 487 times 6 by rounding 487 to the nearest hundred. What do you get?" Pause. "500 times 6 equals 3 000. Now — is 3 000 greater or less than the actual answer? We rounded 487 UP to 500, so our estimate is an overestimate."
• Q2: "Estimate 23 times 38. Round both to the nearest 10." Pause. "20 times 40 equals 800. Tricky — we rounded one DOWN and one UP. This is a mixed adjustment, so we cannot be certain which direction the error goes without calculating."
• Q3: "Estimate 674 times 3. Round 674 to the nearest hundred." Pause. "700 times 3 equals 2 100. We rounded UP, so this is an overestimate."

DO:
• Write each question on the board one at a time. Give 30 seconds per question.
• After each, do a quick Show Me Boards check.
• Emphasise the language: overestimate, underestimate, mixed.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "Boards up — show me your estimate for Q1." Scan for 3 000. Then: "Thumbs up if you said overestimate."
• For Q2, accept 800. Ask: "Is this an overestimate or underestimate? Tricky — who can explain why it is mixed?" Select a non-volunteer.
• For Q3, scan for 2 100 and the word "overestimate."
PROCEED: If >= 80% show correct estimates with reasonable explanations, move to Slide 3.
PIVOT: If students struggle with the direction of rounding, reteach from a different angle: draw a number line showing 487 between 400 and 500. "Which hundred is closer? 500. We moved the number to the RIGHT — that means we made it BIGGER. So 500 x 6 will be BIGGER than 487 x 6." Re-check with a new example (312 x 4).

MISCONCEPTIONS:
• Misconception: "Rounding always makes the answer bigger."
  Why: Students overgeneralise from examples where the number rounds up.
  Impact: Students cannot evaluate whether their estimates are upper or lower bounds.
  Quick correction: Show 312 x 5 — rounds DOWN to 300 x 5 = 1 500. "Is 1 500 more or less than the real answer? Less — because we made 312 smaller."

TEACHER NOTES:
The estimation strand is revisited here deliberately — it connects to today's LCM/HCF work because students will need to estimate whether their LCM/HCF answers are reasonable (e.g., "the LCM of 4 and 6 cannot be less than 6 — it must be at least as big as the larger number"). Building this estimation habit across strands is a key VTLM 2.0 principle. DECIDE framework: this is diagnostic — watch for which students have automated estimation and which still need the rounding step scaffolded.

ENABLING:
• Students 6-12 months behind: provide a number line to support rounding (mark hundreds explicitly). Allow use of times tables chart for the multiplication step.

EXTENDING:
• Students 6-12 months ahead: "Can you estimate 487 x 63 by rounding both numbers? What is the effect of rounding both?"

WATCH FOR:
• Students who round correctly but then cannot multiply — the multiplication is a prerequisite, not today's focus. Provide the product if needed.
• Students who say "overestimate" for every question — they are guessing rather than reasoning about direction.

[Maths: Estimation — rounding and reasonableness | VTLM 2.0: Cross-strand connections]`;

const NOTES_DR2 = `SAY:
• Q4: "Is 16 a square number, a triangular number, both, or neither?" Pause. "16 is a square number because 4 times 4 equals 16. It is NOT a triangular number — the sequence goes 1, 3, 6, 10, 15, 21... 16 is not in that list."
• Q5: "Simplify 25 times 44 by rearranging the factors." Pause. "We can split 44 into 4 times 11. So 25 times 4 times 11 equals 100 times 11 equals 1 100. The factoring strategy makes hard multiplications easy."

DO:
• For Q4, draw a 4x4 dot array on the board to show why 16 is square. List the first few triangular numbers to show 16 is not among them.
• For Q5, write the factor rearrangement step by step. Emphasise: "We are using our knowledge of factors to make calculation easier — this is exactly why factors matter."

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• Q4: "Write square, triangular, both, or neither on your board. Boards up!" Scan for "square."
• Q5: "Show me the rearranged calculation on your board. Boards up!" Look for 25 x 4 x 11 or equivalent.
PROCEED: If >= 80% answer both correctly, transition to the LI slide.
PIVOT: If students cannot identify 16 as square — reteach from a different angle: "What number times itself gives 16? Try 1x1=1, 2x2=4, 3x3=9, 4x4=16. Yes! So 16 is a perfect square." Use the systematic approach rather than recall. Re-check: "Is 25 a square number?"

MISCONCEPTIONS:
• Misconception: "16 is triangular because you can arrange 16 dots in a triangle."
  Why: Students confuse the geometric shape (any triangle) with triangular numbers (specific cumulative sums 1+2+3+...).
  Impact: Students misidentify numbers and cannot use the correct test.
  Quick correction: "Triangular numbers are built by adding rows: 1, then 1+2=3, then 1+2+3=6, then 1+2+3+4=10. Count — does 16 appear? No."

TEACHER NOTES:
These two questions deliberately activate content from Sessions 3-4 (square numbers, factoring strategies). Q5 bridges directly into today's lesson — if students can rearrange factors, they already have the mental flexibility needed for prime factorisation approaches to LCM/HCF. DECIDE framework: the Daily Review is a retrieval practice opportunity that strengthens long-term retention of earlier sessions.

ENABLING:
• Students 6-12 months behind: provide a list of square numbers (1, 4, 9, 16, 25, 36, 49, 64, 81, 100) and triangular numbers (1, 3, 6, 10, 15, 21, 28, 36, 45, 55) as a reference.

EXTENDING:
• Students 6-12 months ahead: "Is there any number that is BOTH square AND triangular? Can you find one?" (Answer: 1 and 36 are both.)

WATCH FOR:
• Students who recall "square" but cannot explain why — push for the multiplication: "What times what?"
• Students who find Q5 challenging — they may need more practice with the associative property of multiplication. Note for future planning.

[Maths: Square/triangular numbers, factor rearrangement | VTLM 2.0: Retrieval practice]`;

const NOTES_LI = `SAY:
• "Here is what we are learning today and how we will know we have succeeded."
• Read each criterion aloud: (1) finding LCM and HCF means we can identify special relationships between numbers, (2) estimation helps us check our work, (3) describing patterns is what mathematicians do — they do not just calculate, they notice and explain.
• "These three criteria connect everything we have learned this week. Factors help us find HCF. Multiples help us find LCM. And the patterns we find show us why mathematics is beautiful."

DO:
• Point to each criterion as you read it.
• Briefly connect each criterion to a prior session: "Remember factors from Session 1? We need those for HCF."
• Leave the slide up for students to note criteria if required.

TEACHER NOTES:
The learning intention is deliberately broad to encompass the synthesis nature of this lesson. The three success criteria map to the three main activities: (1) I Do/We Do on LCM and HCF, (2) estimation integration throughout, (3) the Collatz pattern investigation in We Do. Making these explicit gives students metacognitive awareness of what the lesson requires and how it connects to the unit arc. VTLM 2.0 element: Making Learning Visible — explicit criteria.

WATCH FOR:
• Students who glaze over during LI reading — pause and ask: "Which of these three do you think will be the hardest? Why?"
• Students who do not recognise the vocabulary (LCM, HCF) — they will need extra support during I Do.

[Maths: Number Properties — LCM, HCF, patterns | VTLM 2.0: Making Learning Visible]`;

const NOTES_LCM = `SAY:
• "LCM stands for Lowest Common Multiple. Let me show you how to find the LCM of 6 and 9."
• "First, I list multiples of 6: 6, 12, 18, 24, 30, 36... I keep going until I find a match."
• "Then, multiples of 9: 9, 18, 27, 36, 45... I stop as soon as I see a number that is ALSO in the first list."
• "18 appears in both lists — it is a common multiple. 36 also appears in both. But 18 is the LOWEST common multiple. So LCM of 6 and 9 is 18."
• Think aloud: "I list multiples of each number until I find one that appears in BOTH lists. The first match is the LCM."

DO:
• Write both lists on the board side by side. Circle 18 in both lists. Circle 36 as well to show there are multiple common multiples, but 18 is the lowest.
• Point to the number line visual on the slide showing both sequences with 18 highlighted.
• Have students echo: "The LCM of 6 and 9 is 18."

TEACHER NOTES:
This is the anchor worked example for LCM. The listing method is the most accessible approach and builds directly on the multiples work from Session 2. The choice of 6 and 9 is deliberate — they share a common factor of 3, so the LCM (18) is less than their product (54). This is important because a common misconception is that the LCM is always the product of the two numbers. The number line visual on the right reinforces the concept concretely. VTLM 2.0 element: Concrete-Representational — listing then visual.

ENABLING:
• Students 6-12 months behind: provide a pre-printed multiples grid or allow use of skip counting on a number line to generate multiples.

EXTENDING:
• Students 6-12 months ahead: "Can you find the LCM of 6 and 9 using prime factorisation? 6 = 2 x 3, 9 = 3 x 3. LCM = 2 x 3 x 3 = 18."

MISCONCEPTIONS:
• Misconception: "The LCM of 6 and 9 is 54 (6 x 9)."
  Why: Students assume LCM means multiplying the two numbers together.
  Impact: They get correct answers only when the two numbers are coprime (share no common factors). For all other pairs, the answer is too large.
  Quick correction: "54 IS a common multiple — but is it the LOWEST? Check: is there a smaller number that both 6 and 9 divide into? Yes — 18. So 54 is not the LCM."

WATCH FOR:
• Students who list only 3-4 multiples and give up — encourage them to keep going: "You might need 6 or 7 multiples before you find the match."
• Students who find 18 in both lists but are not confident it is the lowest — confirm: "Is there any common multiple smaller than 18? Check: 6 is a multiple of 6 but not 9. 9 is a multiple of 9 but not 6. 12 — multiple of 6 but not 9. So 18 is the first match."

[Maths: LCM — listing multiples method | VTLM 2.0: Concrete-Representational]`;

const NOTES_HCF = `SAY:
• "HCF stands for Highest Common Factor. Let me find the HCF of 24 and 36."
• "First, I list ALL factors of 24. I use factor pairs: 1 and 24, 2 and 12, 3 and 8, 4 and 6. So factors of 24 are: 1, 2, 3, 4, 6, 8, 12, 24."
• "Now factors of 36: 1 and 36, 2 and 18, 3 and 12, 4 and 9, 6 and 6. So factors of 36 are: 1, 2, 3, 4, 6, 9, 12, 18, 36."
• "Common factors — numbers in BOTH lists: 1, 2, 3, 4, 6, 12."
• "The HIGHEST common factor is 12. So HCF of 24 and 36 is 12."

DO:
• Write factor pairs systematically on the board — model the pair strategy explicitly.
• Circle common factors in both lists.
• Have students echo: "The HCF of 24 and 36 is 12."

TEACHER NOTES:
This worked example deliberately uses larger numbers (24 and 36) to give students a meaningful challenge. The factor pair method from Session 1 is revisited here — students should recognise it from earlier. The pair strategy (1x24, 2x12, 3x8, 4x6) ensures no factors are missed. The HCF (12) is large enough to be non-trivial, which reinforces that HCF is not always a small number. VTLM 2.0 element: Building on prior knowledge — factor pairs from Session 1.

ENABLING:
• Students 6-12 months behind: allow use of a multiplication chart to find factors. "Look along the 24 row — every column header that has a product of 24 is a factor."

EXTENDING:
• Students 6-12 months ahead: "There is a beautiful relationship: HCF(a,b) x LCM(a,b) = a x b. Check: HCF(24,36) x LCM(24,36) = 12 x 72 = 864. And 24 x 36 = 864. It works! Can you prove why?"

MISCONCEPTIONS:
• Misconception: "The HCF is always 1."
  Why: Students confuse HCF with the idea that all numbers share the factor 1.
  Impact: They identify 1 as a common factor (correct) but stop there without checking for larger common factors.
  Quick correction: "1 IS a common factor — but is it the HIGHEST? Let us check systematically. Does 2 divide both? Yes. Does 3? Yes. Does 4? Yes. Does 6? Yes. Does 12? Yes. So 12 is the highest."

• Misconception: Confusing LCM and HCF — giving the LCM when asked for HCF.
  Why: The terminology is new and the abbreviations are similar.
  Impact: Students solve the wrong problem entirely.
  Quick correction: "HCF — Highest Common FACTOR. Factors are numbers that divide IN. LCM — Lowest Common MULTIPLE. Multiples are numbers you get by multiplying OUT. Factor = divides in. Multiple = multiplies out."

WATCH FOR:
• Students who miss factor pairs — remind them of the systematic approach: "Start at 1 and work up. When the pair numbers meet, you have found them all."
• Students who list factors but forget to identify common ones — use colour coding: circle common factors in a different colour.

[Maths: HCF — factor listing method | VTLM 2.0: Building on prior knowledge]`;

const NOTES_PRIME_FACT = `SAY:
• "There is a faster method for finding LCM and HCF — using prime factorisation from Session 3."
• "24 equals 2 cubed times 3. That means 2 times 2 times 2 times 3."
• "36 equals 2 squared times 3 squared. That means 2 times 2 times 3 times 3."
• "For HCF: take the LOWEST power of each SHARED prime. Both have 2 — lowest power is 2 squared. Both have 3 — lowest power is 3 to the power 1. So HCF = 2 squared times 3 = 4 times 3 = 12."
• "For LCM: take the HIGHEST power of each prime that appears in EITHER factorisation. Highest power of 2 is 2 cubed. Highest power of 3 is 3 squared. So LCM = 2 cubed times 3 squared = 8 times 9 = 72."

DO:
• Write both prime factorisations on the board.
• Draw a Venn diagram: left circle = factors unique to 24 (extra 2), overlap = shared factors (2 squared x 3), right circle = factors unique to 36 (extra 3).
• Point to the Venn diagram on the slide as you explain.

TEACHER NOTES:
The prime factorisation method is more efficient for larger numbers but requires solid understanding of prime factorisation from Session 3. This slide bridges Session 3 content into today's application. The Venn diagram visual is a powerful representation — the overlap gives HCF, and the union of ALL factors gives LCM. Not all students need to master this method today — the listing method from Slides 5-6 is sufficient for most Year 5/6 students. The prime factorisation method is for extending students. VTLM 2.0 element: Multiple methods — connecting representations.

ENABLING:
• Students 6-12 months behind: this method may be too abstract. Reassure them: "The listing method we learned on the last two slides works perfectly. This is just a shortcut for when numbers get very large."

EXTENDING:
• Students 6-12 months ahead: "Use prime factorisation to find LCM and HCF of 60 and 90. 60 = 2 squared x 3 x 5. 90 = 2 x 3 squared x 5. HCF = 2 x 3 x 5 = 30. LCM = 2 squared x 3 squared x 5 = 180."

WATCH FOR:
• Students who confuse "lowest power" and "highest power" for HCF vs LCM — the mnemonic is: "HCF is the modest one — it takes the LOWEST. LCM is the greedy one — it takes the HIGHEST."
• Students who forget to include primes that only appear in one factorisation when finding LCM — remind: "LCM needs EVERY prime from EITHER number."

[Maths: Prime factorisation for LCM/HCF | VTLM 2.0: Multiple methods]`;

const NOTES_CFU1 = `SAY:
• "Whiteboards ready. Find the LCM of 4 and 6. Show your working — I want to see multiples listed."
• "You have 60 seconds. Go."
• After boards up: "I am looking for the multiples of 4 and 6 listed, and 12 circled as the LCM."
• Confirm: "Multiples of 4: 4, 8, 12. Multiples of 6: 6, 12. The first match is 12. LCM = 12."

DO:
• Give exactly 60 seconds. Walk the room while students work.
• Signal: "Boards up in 3, 2, 1 — Show Me!"
• Scan left to right. Note students who wrote 24 (the product — common error) vs 12 (correct).
• If many students wrote 24: address it immediately — "24 IS a common multiple, but is it the lowest?"

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "Boards up — Show Me!" Scan for 12 with supporting working.
• Ask a non-volunteer: "Read me the multiples of 4 you listed."
• Ask another: "Where did you stop listing multiples of 6?"
PROCEED: If >= 80% show LCM = 12 with working, continue to Slide 9.
PIVOT: If students write LCM = 24 (the product of 4 and 6) — reteach from a different angle: "Let us check. Is 12 a multiple of 4? Yes — 4 x 3 = 12. Is 12 a multiple of 6? Yes — 6 x 2 = 12. So 12 is a common multiple. And is there any common multiple SMALLER than 12? Check 4, 8 — not multiples of 6. Check 6 — not a multiple of 4. So 12 is the LOWEST. Not 24." Re-check with: "Find the LCM of 3 and 5."

MISCONCEPTIONS:
• Misconception: "LCM of 4 and 6 is 24 because 4 x 6 = 24."
  Why: Students default to multiplying the two numbers, which only gives the LCM when the numbers are coprime.
  Impact: Systematic overestimation of LCM for all non-coprime pairs.
  Quick correction: "The product always WORKS as a common multiple, but it is not always the LOWEST. List multiples to check."

TEACHER NOTES:
This CFU deliberately uses small, accessible numbers (4 and 6) so that the method — not the arithmetic — is the focus. If students can correctly apply the listing method here, they can extend it to harder numbers. The 60-second time limit creates urgency and prevents overthinking. VTLM 2.0 element: Formative assessment — Show Me Boards.

WATCH FOR:
• Students who write only "12" with no working — push for evidence: "Show me HOW you know it is 12."
• Students who listed multiples correctly but circled the wrong one — they may have misread their own lists.

[Maths: CFU — LCM of 4 and 6 | VTLM 2.0: Formative assessment]`;

const NOTES_WE_DO = `SAY:
• "Let us work through this one together. Find the LCM and HCF of 12 and 18."
• "First, HCF. I need factors. Who can give me a factor pair of 12?" [Take responses: 1x12, 2x6, 3x4.] "So factors of 12 are 1, 2, 3, 4, 6, 12."
• "Now factor pairs of 18?" [1x18, 2x9, 3x6.] "Factors of 18 are 1, 2, 3, 6, 9, 18."
• "Common factors? Look at both lists. 1, 2, 3, 6 appear in both. The highest is 6. HCF = 6."
• "Now LCM. Multiples of 12: 12, 24, 36... Multiples of 18: 18, 36... 36 is the first match. LCM = 36."
• "Quick estimation check: the LCM must be at least 18 (the larger number). 36 is bigger than 18 — reasonable. The HCF must be no bigger than 12 (the smaller number). 6 is less than 12 — reasonable."

DO:
• This is collaborative — invite student responses at each step. Use raised hands or cold call.
• Write the factor lists and multiple lists on the board as students provide them.
• Circle common factors and common multiples in different colours.
• Explicitly model the estimation check at the end.

TEACHER NOTES:
This We Do example combines both HCF and LCM in one problem, which is the first time students have done both together. The estimation check ("LCM must be at least as big as the larger number; HCF must be no bigger than the smaller number") is a key reasonableness strategy that connects to the Daily Review. Making students provide the factor pairs collaboratively activates recall from Session 1. VTLM 2.0 element: Guided practice — gradual release of responsibility.

ENABLING:
• Students 6-12 months behind: provide the factor list for 12 pre-written. Let them focus on finding factors of 18 and identifying common factors.

EXTENDING:
• Students 6-12 months ahead: "Verify using the relationship: HCF x LCM = 12 x 18. Check: 6 x 36 = 216, and 12 x 18 = 216. It works!"

WATCH FOR:
• Students who confuse factors and multiples mid-problem — use the language anchor: "Factors divide IN. Multiples multiply OUT."
• Students who find HCF = 6 but then write LCM = 6 as well — they are conflating the two concepts.

[Maths: Guided practice — LCM and HCF of 12 and 18 | VTLM 2.0: Gradual release]`;

const NOTES_PROBLEM_PAIR = `SAY:
• "Your turn. Find the HCF and LCM of 8 and 12. Work on your whiteboards."
• "You have 90 seconds. Show both the HCF and LCM with your working."
• After boards up: "Let me cold call for the answers."
• Select a non-volunteer for HCF: "What factors did you list for 8?" [1, 2, 4, 8] "And for 12?" [1, 2, 3, 4, 6, 12] "Common factors?" [1, 2, 4] "HCF?" [4]
• Select a different non-volunteer for LCM: "What multiples of 8 did you list?" [8, 16, 24] "Multiples of 12?" [12, 24] "LCM?" [24]

DO:
• Give exactly 90 seconds. Circulate actively — note which students are stuck and on which part.
• Signal: "Boards up — Show Me!"
• Cold call two different students for HCF and LCM.
• Write correct answers on the board after cold call.

CFU CHECKPOINT:
Technique: Cold Call
Script:
• "Boards up!" Scan for HCF = 4 and LCM = 24.
• Cold call Student A: "What is the HCF? How did you find it?"
• Cold call Student B: "What is the LCM? Show us your multiples."
• "Estimation check: LCM must be at least 12. 24 is bigger — reasonable. HCF must be no bigger than 8. 4 is less — reasonable."
PROCEED: If >= 80% show both answers correctly with working, continue to the pattern investigation.
PIVOT: If students give HCF = 2 or HCF = 8 — reteach from a different angle: "Let us list ALL common factors systematically. Does 1 divide both? Yes. Does 2? Yes. Does 3? 3 divides 12 but does 3 divide 8? No. Does 4? 4 divides 8 (8 / 4 = 2) and 4 divides 12 (12 / 4 = 3). Yes! Does 5? No. Does 6? 6 does not divide 8. So common factors are 1, 2, 4. Highest = 4." Re-check with: "Find the HCF of 10 and 15."

MISCONCEPTIONS:
• Misconception: "HCF of 8 and 12 is 8 because 8 divides 8."
  Why: Students check only whether the number divides one of the pair, not both.
  Impact: They always give the smaller number as the HCF.
  Quick correction: "Does 8 divide 12? 12 / 8 = 1.5. That is not a whole number. So 8 is NOT a factor of 12, and cannot be a common factor."

• Misconception: Forgetting that 1 is always a common factor.
  Why: Students start listing from 2 and miss 1.
  Impact: Minor — but shows incomplete understanding of factors.
  Quick correction: "What is the smallest factor of ANY number? 1. Always start your list with 1."

TEACHER NOTES:
The problem pair (8 and 12) is slightly easier than the We Do example (12 and 18) to build confidence. Cold Call ensures accountability — every student knows they might be asked. The 90-second time limit is generous enough for both calculations but prevents disengagement. VTLM 2.0 element: Gradual release — student ownership increasing.

ENABLING:
• Students 6-12 months behind: suggest they start with just the HCF. "List factors of 8. Now list factors of 12. Circle the ones in common."

EXTENDING:
• Students 6-12 months ahead: "Now try 8, 12, and 20. Can you find the HCF of all three? What about the LCM of all three?"

WATCH FOR:
• Students who find HCF but run out of time for LCM — they may need a prompt: "For LCM, just skip count in each number until you find a match."
• Students who write HCF = 4 and LCM = 24 without working — insist on evidence.

[Maths: Problem pair — HCF and LCM of 8 and 12 | VTLM 2.0: Gradual release]`;

const NOTES_PATTERN = `SAY:
• "Now for something different. We are going to investigate a pattern that mathematicians have studied for decades."
• "Here is the rule: pick any positive whole number. If it is even, halve it. If it is odd, multiply by 3 and add 1. Keep applying the rule until you reach 1."
• "Let me demonstrate with 6. 6 is even, so halve: 3. 3 is odd, so 3 times 3 plus 1 equals 10. 10 is even: 5. 5 is odd: 16. 16 is even: 8. 8: 4. 4: 2. 2: 1. Done! That took 8 steps."
• "Your task: apply this rule to each number from 1 to 10. Record the number of steps. Look for a pattern."
• "This is called the Collatz conjecture — one of the biggest unsolved problems in mathematics. Every number anyone has ever tested reaches 1. But nobody has been able to PROVE it always works!"

DO:
• Model the steps for 6 on the board as described above.
• Distribute this as a partner task. Each pair takes numbers 1-10.
• After 5 minutes, gather results on a class chart.
• Guide discussion: "Which starting number took the most steps? Did any number surprise you?"

TEACHER NOTES:
The Collatz conjecture (also known as the 3n+1 problem) is accessible to primary students but connects to deep mathematical thinking. The key learning is NOT the conjecture itself but the process: applying a rule systematically, recording results, and identifying patterns. This directly addresses SC3 ("describe and explain an emerging pattern when I apply a mathematical rule"). Expected results: 1 takes 0 steps, 2 takes 1, 3 takes 7, 4 takes 2, 5 takes 5, 6 takes 8, 7 takes 16, 8 takes 3, 9 takes 19, 10 takes 6. The pattern is not simple — this is deliberate. Students learn that not all mathematical patterns are neat, and that "describing a pattern" sometimes means describing complexity. VTLM 2.0 element: Mathematical reasoning — systematic investigation.

ENABLING:
• Students 6-12 months behind: provide a structured recording sheet with columns: Number, Step 1, Step 2, etc. Pair them with a stronger student for the odd/even decisions.

EXTENDING:
• Students 6-12 months ahead: "Extend to numbers 11-20. Can you find the starting number under 100 that takes the most steps?"

WATCH FOR:
• Students who make arithmetic errors with the "multiply by 3 and add 1" step — this is the most common error source.
• Students who get stuck in a loop (2, 1, 4, 2, 1...) — they may have continued past reaching 1. Clarify: "Stop as soon as you reach 1."
• Students who are frustrated that the pattern is not obvious — validate: "Real mathematicians find this frustrating too! That is what makes it interesting."

[Maths: Pattern investigation — Collatz conjecture | VTLM 2.0: Mathematical reasoning]`;

const NOTES_CFU2 = `SAY:
• "Quick fire round! Everyone together. What is the HCF of 15 and 25?"
• "Think for 10 seconds..." [pause] "On my signal... what is the HCF of 15 and 25?"
• [Choral response] "5! That is correct."
• "Let me hear you explain: factors of 15 are 1, 3, 5, 15. Factors of 25 are 1, 5, 25. Common factors are 1 and 5. Highest is 5."

DO:
• Use Choral Response — the whole class answers together on your signal.
• Hold up 3 fingers and count down: "3, 2, 1, ANSWER!"
• After the choral response, cold call one student to explain the full working.

CFU CHECKPOINT:
Technique: Choral Response
Script:
• "Think... 3, 2, 1, ANSWER!" Listen for a strong "5" from the class.
• Cold call: "[Name], can you list the factors of 15 and 25 and show us the common ones?"
• If the choral response is weak or muddled, re-do: "Let us try again. Think. What are the factors of 15? And 25? What do they share? 3, 2, 1, ANSWER!"
PROCEED: If the class gives a clear, confident "5" and the cold-called student explains correctly, move to You Do.
PIVOT: If many students say "1" or "15" or a wrong answer — reteach from a different angle: "Let me list factors on the board. Factors of 15: 1, 3, 5, 15. Factors of 25: 1, 5, 25. I will circle the numbers that appear in BOTH lists: 1 and 5. Which is bigger? 5." Re-check with: "What is the HCF of 12 and 18?"

MISCONCEPTIONS:
• Misconception: "HCF of 15 and 25 is 15 because 15 divides into 15."
  Why: Students check if the smaller number is a factor of itself but forget to check if it divides the larger number.
  Impact: They default to the smaller number as HCF, which is only correct when the smaller divides the larger.
  Quick correction: "Does 15 divide into 25? 25 / 15 = 1.67 — not a whole number. So 15 is NOT a factor of 25."

TEACHER NOTES:
Choral Response is used here to build class confidence and create a "we can do this" energy before the independent practice phase. The choice of 15 and 25 is deliberate — both end in 5, so students might be tempted to say "5" based on pattern recognition rather than systematic factor listing. The follow-up cold call ensures at least one student demonstrates the rigorous method. VTLM 2.0 element: Formative assessment — Choral Response for engagement.

WATCH FOR:
• Students who mouth the answer after hearing others but did not think independently — vary the technique: "This time, write it on your board FIRST, then we will say it together."
• Students whose choral response is delayed — they may be unsure and waiting to hear others.

[Maths: CFU — HCF of 15 and 25 | VTLM 2.0: Formative assessment — engagement]`;

const NOTES_YOU_DO = `SAY:
• "Independent practice time. You are working on your own for the next 10-12 minutes."
• "First: Find the LCM and HCF of 10 and 15. This is like the examples we just did together."
• "Next: Find the LCM of 3, 4, and 5. This is harder because there are three numbers — list multiples of the largest number first and check which are also multiples of the other two."
• "Then: A real-world problem. A baker has 48 muffins and 36 cookies. She wants to make identical gift bags with no leftovers. What is the maximum number of bags?"
• "Challenge: Estimate 67 times 8 by rounding. Will your estimate be greater or less? Then calculate the exact answer to check."

DO:
• Students work independently in workbooks or on worksheets.
• Circulate with a focus on the baker problem — this is the application question that many students will find challenging.
• For the baker problem, hint if needed: "The number of bags must divide evenly into BOTH 48 and 36. What operation helps us find that?"

TEACHER NOTES:
The four questions form a deliberate progression: (1) direct application of both LCM and HCF, (2) extension to three numbers (LCM only — HCF of three numbers is not required at this level), (3) real-world application requiring students to identify HCF in context (maximum number of identical groups = HCF), (4) estimation integration from the Daily Review strand. The baker problem (HCF of 48 and 36 = 12) is a classic application that appears in many curricula. The challenge question (67 x 8: round to 70 x 8 = 560, overestimate; exact = 536) brings the lesson full circle to the opening estimation theme. VTLM 2.0 element: Differentiated practice — enabling and extending.

ENABLING:
• Students 6-12 months behind:
  - For Q1: provide a number line to 30 for listing multiples.
  - For Q3: reframe — "What is the biggest number that divides into BOTH 48 and 36? Start by listing factors of 36."
  - Skip Q2 (three-number LCM) if needed — it is extension content.

EXTENDING:
• Students 6-12 months ahead:
  - Q2 extension: "Now find the LCM of 3, 4, 5, and 6."
  - Q3 extension: "How many muffins and cookies would be in each bag?" (48/12 = 4 muffins, 36/12 = 3 cookies)
  - Challenge extension: "Estimate 67 x 83 by rounding both. Is this a good estimate? Why or why not?"

MISCONCEPTIONS:
• Misconception: "The baker problem is about LCM."
  Why: Students see "muffins and cookies" and think they need to find a common multiple.
  Impact: They get a very large number (LCM of 48 and 36 = 144) which does not make sense as "number of bags."
  Quick correction: "If there are 48 muffins and only 12 bags, how many muffins per bag? 4. Does that work evenly? Yes. Does 12 divide 36 cookies? 36/12 = 3. Yes. So 12 bags works. Could we do 13 bags? 48/13 is not whole. So the MAXIMUM is 12 — and 12 is the HCF."

WATCH FOR:
• Students who finish Q1-Q2 quickly but skip Q3 — the word problem requires interpretation, not just calculation. Prompt: "Read the baker problem again. What is the question actually asking?"
• Students who attempt Q2 by listing multiples of 3, then multiples of 4, then multiples of 5 separately — guide them: "Start with multiples of the biggest number (5): 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60. Which of these are also multiples of 4? 20, 40, 60. Which of THOSE are also multiples of 3? 60. So LCM = 60."

[Maths: Independent practice — LCM, HCF, estimation | VTLM 2.0: Differentiated practice]`;

const NOTES_EXIT = `SAY:
• "Pens down. Exit ticket time — three questions, five minutes. Work silently and independently."
• Read each question aloud once.
• "This is your chance to show me what you have learned. There are no trick questions."
• After collection: "Excellent work this week. We have covered factors, multiples, primes, square numbers, triangular numbers, LCM, HCF, and patterns. That is a huge amount of mathematical thinking!"

DO:
• Collect workbooks immediately after the exit ticket. Mark tonight — these inform your assessment of the unit.
• Q1 tests SC1 (LCM and HCF). Q2 tests SC2 (estimation and reasoning). Q3 tests metacognition across the unit.
• Mark Q1 and Q2 quantitatively. Q3 is qualitative — read for depth of reflection.

TEACHER NOTES:
The exit ticket deliberately spans all three success criteria. Q1 (HCF and LCM of 10 and 15) mirrors the independent practice to check transfer. Expected answers: HCF = 5, LCM = 30. Q2 (estimate 67 x 8) mirrors the Daily Review and the challenge question — if students cannot do it here, the estimation skill has not transferred. Expected: 70 x 8 = 560, overestimate because 67 rounds UP. Q3 is metacognitive — it asks students to reflect on their own learning journey across all five sessions. This is not assessable as right/wrong but gives valuable qualitative data about student perception of the unit. VTLM 2.0 element: Summative-formative assessment.

WATCH FOR:
• Students who give LCM = 150 (10 x 15) for Q1 — the product error persists.
• Students who write an estimate for Q2 but do not explain direction — prompt: "Greater or less? You need to explain."
• Students who leave Q3 blank — they may need a sentence starter: "One thing I now understand is..."

[Maths: Exit ticket — LCM, HCF, estimation, reflection | VTLM 2.0: Summative-formative assessment]`;

const NOTES_CLOSING = `SAY:
• "Turn to your partner. This week we explored factors, multiples, primes, square numbers, triangular numbers, LCM, and HCF. Which concept do you feel most confident about? Which do you want more practice with?"
• Give 60 seconds for partner discussion.
• "Hands up: who feels confident about factors? Multiples? Primes? LCM? HCF?"
• "Remember our three key takeaways: LCM is the smallest number in both multiple lists. HCF is the largest number in both factor lists. And patterns emerge when we apply rules systematically."
• "You have done fantastic mathematical thinking this week. Keep looking for patterns — they are everywhere in mathematics."

DO:
• Allow genuine partner discussion — do not rush this.
• The hands-up survey gives you quick data about perceived confidence (which may differ from actual competence — compare with exit ticket results).
• End on a positive note. Acknowledge the effort required for this unit.

TEACHER NOTES:
The closing slide serves two purposes: (1) metacognitive reflection — students identify strengths and areas for growth, and (2) consolidation — the three key takeaways are stated explicitly as memory anchors. The Turn & Talk format gives every student a voice, not just the confident ones. Comparing the hands-up survey with exit ticket results gives you both self-reported and actual competence data — discrepancies are diagnostically useful. VTLM 2.0 element: Reflection and metacognition.

WATCH FOR:
• Students who cannot name a concept they feel confident about — they may need individual follow-up.
• Students who say "everything" without specifics — push for precision: "Give me one specific example of something you can do now that you could not do on Monday."

[Maths: Lesson closure — reflection and metacognition | VTLM 2.0: Reflection]`;

// ---------------------------------------------------------------------------
// Build function
// ---------------------------------------------------------------------------

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Year 5/6 Maths";
  pres.title = "Session 5: LCM, HCF & Patterns";

  // -- Slide 1: Title --------------------------------------------------------
  titleSlide(
    pres,
    "LCM, HCF & Patterns",
    "Using number properties to solve problems and spot patterns",
    "Year 5/6  |  Number Properties  |  Session 5 of 5",
    NOTES_TITLE
  );

  // -- Slides 2-3: Daily Review (Stage 1) ------------------------------------

  // Slide 2: DR — Estimation
  contentSlide(
    pres,
    1,
    "Daily Review",
    "Estimation: Rounding to Estimate Calculations",
    [
      "Q1: Estimate 487 x 6 by rounding to the nearest hundred.",
      "Q2: Estimate 23 x 38 by rounding both to the nearest 10.",
      "Q3: Estimate 674 x 3. Will your estimate be greater or less?",
    ],
    NOTES_DR1,
    FOOTER,
    (s) => {
      // Right side: three answer cards stacked
      const answers = [
        { q: "Q1", calc: "500 x 6 = 3 000", note: "Overestimate", color: C.NAVY },
        { q: "Q2", calc: "20 x 40 = 800", note: "Mixed rounding", color: C.TEAL },
        { q: "Q3", calc: "700 x 3 = 2 100", note: "Overestimate", color: C.AMBER },
      ];
      answers.forEach((a, i) => {
        const cy = CONTENT_TOP + i * 1.25;
        addCard(s, 5.2, cy, 4.3, 1.1, { strip: a.color });
        s.addText(a.q, {
          x: 5.45, y: cy + 0.08, w: 1.0, h: 0.3,
          fontSize: 11, fontFace: FONT_B, color: a.color, bold: true, margin: 0,
        });
        s.addText(a.calc, {
          x: 5.45, y: cy + 0.35, w: 3.8, h: 0.35,
          fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL, bold: true, margin: 0,
        });
        s.addText(a.note, {
          x: 5.45, y: cy + 0.7, w: 3.8, h: 0.28,
          fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
        });
      });
    }
  );

  // Slide 3: DR — Prior unit topics
  contentSlide(
    pres,
    1,
    "Daily Review",
    "Prior Topics: Square Numbers & Factor Strategies",
    [
      "Q4: Is 16 a square number, triangular number, both, or neither?",
      "Q5: Simplify 25 x 44 by rearranging factors.",
    ],
    NOTES_DR2,
    FOOTER,
    (s) => {
      // Right side: two answer cards
      // Q4 answer
      addCard(s, 5.2, CONTENT_TOP, 4.3, 1.6, { strip: C.NAVY });
      s.addText("Q4 Answer", {
        x: 5.45, y: CONTENT_TOP + 0.08, w: 3.8, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
      });
      addTextOnShape(s, "Square: 4 x 4 = 16", {
        x: 5.45, y: CONTENT_TOP + 0.45, w: 3.8, h: 0.45, rectRadius: 0.08,
        fill: { color: C.NAVY },
      }, {
        fontSize: 15, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      s.addText("Not triangular — sequence is 1, 3, 6, 10, 15, 21...", {
        x: 5.45, y: CONTENT_TOP + 1.0, w: 3.8, h: 0.4,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });

      // Q5 answer
      const q5Y = CONTENT_TOP + 1.8;
      addCard(s, 5.2, q5Y, 4.3, 1.9, { strip: C.TEAL });
      s.addText("Q5 Answer", {
        x: 5.45, y: q5Y + 0.08, w: 3.8, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
      });
      // Step-by-step
      const steps = [
        "25 x 44",
        "= 25 x 4 x 11",
        "= 100 x 11",
        "= 1 100",
      ];
      steps.forEach((st, i) => {
        s.addText(st, {
          x: 5.45, y: q5Y + 0.42 + i * 0.34, w: 3.8, h: 0.32,
          fontSize: 14, fontFace: FONT_H, color: C.CHARCOAL,
          bold: i === steps.length - 1, margin: 0,
        });
      });
    }
  );

  // -- Slide 4: LI/SC -------------------------------------------------------
  liSlide(
    pres,
    [
      "We are learning to find the lowest common multiple and highest common factor of numbers and describe emerging patterns so we can solve problems efficiently.",
    ],
    [
      "I can find the LCM and HCF of two numbers.",
      "I can use estimation to check whether my answer is reasonable.",
      "I can describe and explain an emerging pattern when I apply a mathematical rule.",
    ],
    NOTES_LI,
    FOOTER
  );

  // -- Slide 5: LCM — I Do (Stage 2) ----------------------------------------
  workedExSlide(
    pres,
    2,
    "Explicit Instruction \u2014 I Do",
    "Finding the LCM of 6 and 9",
    [
      "Multiples of 6: 6, 12, 18, 24, 30, 36...",
      "Multiples of 9: 9, 18, 27, 36, 45...",
      "Common multiples: 18, 36...",
      "Lowest Common Multiple = 18",
    ],
    NOTES_LCM,
    FOOTER,
    (s) => {
      // Right side: two number lines with multiples, 18 highlighted
      const nlX = 5.3;
      const nlW = 4.2;

      // Number line for multiples of 6
      s.addText("Multiples of 6", {
        x: nlX, y: CONTENT_TOP + 0.05, w: nlW, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
      });
      const labels6 = ["6", "12", "18", "24", "30", "36"];
      addNumberLine(s, nlX + 0.15, CONTENT_TOP + 0.55, nlW - 0.3, labels6, [2], {
        labelFontSize: 11,
      });

      // Number line for multiples of 9
      s.addText("Multiples of 9", {
        x: nlX, y: CONTENT_TOP + 1.2, w: nlW, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
      });
      const labels9 = ["9", "18", "27", "36"];
      addNumberLine(s, nlX + 0.15, CONTENT_TOP + 1.7, nlW - 0.3, labels9, [1], {
        labelFontSize: 11,
      });

      // LCM highlight box
      addTextOnShape(s, "LCM = 18", {
        x: nlX + 0.5, y: CONTENT_TOP + 2.3, w: 3.2, h: 0.55, rectRadius: 0.08,
        fill: { color: C.NAVY },
        shadow: makeShadow(),
      }, {
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Explanation note
      s.addText("18 is the first number that appears in BOTH lists.", {
        x: nlX, y: CONTENT_TOP + 3.0, w: nlW, h: 0.4,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
        align: "center",
      });
    }
  );

  // -- Slide 6: HCF — I Do (Stage 2) ----------------------------------------
  workedExSlide(
    pres,
    2,
    "Explicit Instruction \u2014 I Do",
    "Finding the HCF of 24 and 36",
    [
      "Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24",
      "Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36",
      "Common factors: 1, 2, 3, 4, 6, 12",
      "Highest Common Factor = 12",
    ],
    NOTES_HCF,
    FOOTER,
    (s) => {
      // Right side: factor listing visual with common factors highlighted
      const cardX = 5.3;
      const cardY = CONTENT_TOP + 0.05;

      // Factors of 24 card
      addCard(s, cardX, cardY, 4.2, 1.2, { strip: C.NAVY });
      s.addText("Factors of 24", {
        x: cardX + 0.2, y: cardY + 0.06, w: 3.8, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
      });
      const f24 = [1, 2, 3, 4, 6, 8, 12, 24];
      const common = [1, 2, 3, 4, 6, 12];
      const pillW = 0.42;
      const pillH = 0.28;
      const pillGap = 0.06;
      f24.forEach((f, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const px = cardX + 0.2 + col * (pillW + pillGap);
        const py = cardY + 0.4 + row * (pillH + pillGap);
        const isCommon = common.includes(f);
        addTextOnShape(s, String(f), {
          x: px, y: py, w: pillW, h: pillH, rectRadius: 0.06,
          fill: { color: isCommon ? C.TEAL : C.LIGHT },
        }, {
          fontSize: 11, fontFace: FONT_B, color: isCommon ? C.WHITE : C.CHARCOAL, bold: true,
        });
      });

      // Factors of 36 card
      const f36Y = cardY + 1.35;
      addCard(s, cardX, f36Y, 4.2, 1.35, { strip: C.NAVY });
      s.addText("Factors of 36", {
        x: cardX + 0.2, y: f36Y + 0.06, w: 3.8, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.NAVY, bold: true, margin: 0,
      });
      const f36 = [1, 2, 3, 4, 6, 9, 12, 18, 36];
      f36.forEach((f, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const px = cardX + 0.2 + col * (pillW + pillGap);
        const py = f36Y + 0.4 + row * (pillH + pillGap);
        const isCommon = common.includes(f);
        addTextOnShape(s, String(f), {
          x: px, y: py, w: pillW, h: pillH, rectRadius: 0.06,
          fill: { color: isCommon ? C.TEAL : C.LIGHT },
        }, {
          fontSize: 11, fontFace: FONT_B, color: isCommon ? C.WHITE : C.CHARCOAL, bold: true,
        });
      });

      // HCF result
      addTextOnShape(s, "HCF = 12", {
        x: cardX + 0.5, y: f36Y + 1.5, w: 3.2, h: 0.55, rectRadius: 0.08,
        fill: { color: C.NAVY },
        shadow: makeShadow(),
      }, {
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Legend
      s.addShape("roundRect", {
        x: cardX + 0.2, y: f36Y + 2.15, w: 0.28, h: 0.2, rectRadius: 0.04,
        fill: { color: C.TEAL },
      });
      s.addText("= common factor", {
        x: cardX + 0.55, y: f36Y + 2.14, w: 1.5, h: 0.22,
        fontSize: 9, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });
    }
  );

  // -- Slide 7: Prime Factorisation Method (Stage 2) -------------------------
  contentSlide(
    pres,
    2,
    "Explicit Instruction \u2014 I Do",
    "A Faster Method \u2014 Prime Factorisation",
    [
      "24 = 2\u00B3 x 3  and  36 = 2\u00B2 x 3\u00B2",
      "HCF: take LOWEST power of each shared prime",
      "    \u2192 2\u00B2 x 3 = 4 x 3 = 12",
      "LCM: take HIGHEST power of each prime",
      "    \u2192 2\u00B3 x 3\u00B2 = 8 x 9 = 72",
    ],
    NOTES_PRIME_FACT,
    FOOTER,
    (s) => {
      // Right side: Venn diagram style showing shared and unique prime factors
      const cx = 7.2;
      const cy = CONTENT_TOP + 0.8;

      // Left circle — 24
      s.addShape("roundRect", {
        x: cx - 1.9, y: cy, w: 2.6, h: 2.6, rectRadius: 1.3,
        fill: { color: C.NAVY, transparency: 80 },
        line: { color: C.NAVY, width: 2 },
      });
      s.addText("24", {
        x: cx - 1.9, y: cy - 0.05, w: 1.2, h: 0.35,
        fontSize: 14, fontFace: FONT_H, color: C.NAVY, bold: true, margin: 0,
        align: "center",
      });

      // Right circle — 36
      s.addShape("roundRect", {
        x: cx - 0.7, y: cy, w: 2.6, h: 2.6, rectRadius: 1.3,
        fill: { color: C.TEAL, transparency: 80 },
        line: { color: C.TEAL, width: 2 },
      });
      s.addText("36", {
        x: cx + 0.7, y: cy - 0.05, w: 1.2, h: 0.35,
        fontSize: 14, fontFace: FONT_H, color: C.TEAL, bold: true, margin: 0,
        align: "center",
      });

      // Unique to 24: extra 2
      addTextOnShape(s, "2", {
        x: cx - 1.6, y: cy + 0.9, w: 0.6, h: 0.5, rectRadius: 0.08,
        fill: { color: C.NAVY },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      s.addText("(extra)", {
        x: cx - 1.7, y: cy + 1.4, w: 0.8, h: 0.25,
        fontSize: 8, fontFace: FONT_B, color: C.NAVY, margin: 0, align: "center",
      });

      // Shared: 2^2 x 3
      addTextOnShape(s, "2\u00B2 x 3", {
        x: cx - 0.6, y: cy + 0.9, w: 1.2, h: 0.5, rectRadius: 0.08,
        fill: { color: C.AMBER_LIGHT },
      }, {
        fontSize: 15, fontFace: FONT_H, color: C.CHARCOAL, bold: true,
      });
      s.addText("shared", {
        x: cx - 0.6, y: cy + 1.4, w: 1.2, h: 0.25,
        fontSize: 8, fontFace: FONT_B, color: C.AMBER, margin: 0, align: "center",
      });

      // Unique to 36: extra 3
      addTextOnShape(s, "3", {
        x: cx + 1.0, y: cy + 0.9, w: 0.6, h: 0.5, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      s.addText("(extra)", {
        x: cx + 0.9, y: cy + 1.4, w: 0.8, h: 0.25,
        fontSize: 8, fontFace: FONT_B, color: C.TEAL, margin: 0, align: "center",
      });

      // Labels below
      const labelY = cy + 1.9;
      addTextOnShape(s, "HCF = overlap = 12", {
        x: cx - 1.6, y: labelY, w: 2.0, h: 0.36, rectRadius: 0.06,
        fill: { color: C.AMBER_LIGHT },
      }, {
        fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
      });
      addTextOnShape(s, "LCM = all = 72", {
        x: cx + 0.5, y: labelY, w: 1.8, h: 0.36, rectRadius: 0.06,
        fill: { color: C.NAVY },
      }, {
        fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // -- Slide 8: CFU 1 — withReveal (Show Me Boards) -------------------------
  withReveal(
    () => cfuSlide(
      pres, 2, "Check", "Quick Check",
      "Show Me Boards",
      "Find the LCM of 4 and 6.\nShow your working on your whiteboard.",
      NOTES_CFU1, FOOTER
    ),
    (slide) => {
      addTextOnShape(slide, "Multiples of 4: 4, 8, 12...\nMultiples of 6: 6, 12...\nLCM = 12", {
        x: 1.5, y: 4.0, w: 7.0, h: 0.9, rectRadius: 0.08,
        fill: { color: C.EMERALD },
        shadow: makeShadow(),
      }, {
        fontSize: 16, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // -- Slide 9: We Do — LCM and HCF Together (Stage 3) ----------------------
  contentSlide(
    pres,
    3,
    "Guided Practice \u2014 We Do",
    "Let's Find LCM and HCF Together",
    [
      "Find the LCM and HCF of 12 and 18.",
      "Factors of 12: 1, 2, 3, 4, 6, 12",
      "Factors of 18: 1, 2, 3, 6, 9, 18",
      "Common factors: 1, 2, 3, 6 \u2192 HCF = 6",
      "Multiples of 12: 12, 24, 36...",
      "Multiples of 18: 18, 36... \u2192 LCM = 36",
    ],
    NOTES_WE_DO,
    FOOTER,
    (s) => {
      // Right side: two result boxes + estimation check
      addCard(s, 5.2, CONTENT_TOP, 4.3, SAFE_BOTTOM - CONTENT_TOP, { fill: C.WHITE });

      // HCF result
      addTextOnShape(s, "HCF = 6", {
        x: 5.5, y: CONTENT_TOP + 0.2, w: 3.7, h: 0.65, rectRadius: 0.08,
        fill: { color: C.TEAL },
        shadow: makeCardShadow(),
      }, {
        fontSize: 24, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // LCM result
      addTextOnShape(s, "LCM = 36", {
        x: 5.5, y: CONTENT_TOP + 1.05, w: 3.7, h: 0.65, rectRadius: 0.08,
        fill: { color: C.NAVY },
        shadow: makeCardShadow(),
      }, {
        fontSize: 24, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Estimation check card
      s.addShape("rect", {
        x: 5.5, y: CONTENT_TOP + 1.95, w: 3.7, h: 0.36,
        fill: { color: C.AMBER },
      });
      s.addText("Estimation Check", {
        x: 5.5, y: CONTENT_TOP + 1.95, w: 3.7, h: 0.36,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      s.addText([
        { text: "LCM must be \u2265 18 (larger number) ", options: { breakLine: true, fontSize: 11 } },
        { text: "\u2713  36 \u2265 18", options: { bold: true, breakLine: true, fontSize: 11, color: C.EMERALD } },
        { text: "HCF must be \u2264 12 (smaller number) ", options: { breakLine: true, fontSize: 11 } },
        { text: "\u2713  6 \u2264 12", options: { bold: true, fontSize: 11, color: C.EMERALD } },
      ], {
        x: 5.5, y: CONTENT_TOP + 2.35, w: 3.7, h: 1.2,
        fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });
    }
  );

  // -- Slide 10: We Do — Problem Pair with withReveal (Stage 3) ---------------
  withReveal(
    () => cfuSlide(
      pres, 3, "Guided Practice \u2014 We Do", "Your Turn",
      "Cold Call",
      "Find the HCF and LCM of 8 and 12.\nShow your working on your whiteboard.",
      NOTES_PROBLEM_PAIR, FOOTER
    ),
    (slide) => {
      addTextOnShape(slide, "HCF = 4  (common factors: 1, 2, 4)\nLCM = 24  (multiples: 8, 16, 24... and 12, 24...)", {
        x: 1.0, y: 4.0, w: 8.0, h: 0.9, rectRadius: 0.08,
        fill: { color: C.EMERALD },
        shadow: makeShadow(),
      }, {
        fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // -- Slide 11: We Do — Pattern Investigation (Stage 3) ---------------------
  contentSlide(
    pres,
    3,
    "Guided Practice \u2014 We Do",
    "Pattern Investigation",
    [
      "Apply this rule to each number from 1 to 10:",
      "If even \u2192 halve it.  If odd \u2192 multiply by 3 and add 1.",
      "Keep applying the rule until you reach 1.",
      "Record the number of steps for each starting number.",
      "What pattern do you notice?",
    ],
    NOTES_PATTERN,
    FOOTER,
    (s) => {
      // Right side: worked example for starting number 6
      addCard(s, 5.2, CONTENT_TOP, 4.3, SAFE_BOTTOM - CONTENT_TOP, { fill: C.WHITE });

      // Example header
      s.addShape("rect", {
        x: 5.2, y: CONTENT_TOP, w: 4.3, h: 0.4,
        fill: { color: C.TEAL },
      });
      s.addText("Example: Start with 6", {
        x: 5.2, y: CONTENT_TOP, w: 4.3, h: 0.4,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });

      // Chain of steps
      const chain = [
        { val: "6", rule: "even \u00F7 2", color: C.NAVY },
        { val: "3", rule: "odd x3+1", color: C.CORAL },
        { val: "10", rule: "even \u00F7 2", color: C.NAVY },
        { val: "5", rule: "odd x3+1", color: C.CORAL },
        { val: "16", rule: "even \u00F7 2", color: C.NAVY },
        { val: "8", rule: "\u00F7 2", color: C.NAVY },
        { val: "4", rule: "\u00F7 2", color: C.NAVY },
        { val: "2", rule: "\u00F7 2", color: C.NAVY },
        { val: "1", rule: "DONE!", color: C.EMERALD },
      ];
      const pillW2 = 0.72;
      const pillH2 = 0.28;
      const gap = 0.04;
      const cols = 3;
      chain.forEach((step, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const px = 5.4 + col * (pillW2 + gap + 0.62);
        const py = CONTENT_TOP + 0.55 + row * (pillH2 + gap + 0.12);

        addTextOnShape(s, step.val, {
          x: px, y: py, w: pillW2, h: pillH2, rectRadius: 0.06,
          fill: { color: step.color },
        }, {
          fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true,
        });
        // Rule label to the right (except last in row)
        if (step.rule !== "DONE!") {
          s.addText(step.rule, {
            x: px + pillW2 + 0.02, y: py, w: 0.6, h: pillH2,
            fontSize: 7, fontFace: FONT_B, color: C.MUTED, margin: 0,
            valign: "middle",
          });
        }
      });

      // Steps count
      addTextOnShape(s, "8 steps to reach 1", {
        x: 5.5, y: CONTENT_TOP + 2.0, w: 3.7, h: 0.4, rectRadius: 0.06,
        fill: { color: C.NAVY },
      }, {
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      // Fun fact
      s.addText("The Collatz Conjecture: every number tested reaches 1.\nBut nobody has proved it always works!", {
        x: 5.4, y: CONTENT_TOP + 2.55, w: 3.8, h: 0.7,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });
    }
  );

  // -- Slide 12: CFU 2 — withReveal (Choral Response) -----------------------
  withReveal(
    () => cfuSlide(
      pres, 3, "Check", "Quick Fire",
      "Choral Response",
      "What is the HCF of 15 and 25?",
      NOTES_CFU2, FOOTER
    ),
    (slide) => {
      addTextOnShape(slide, "HCF = 5\nFactors of 15: 1, 3, 5, 15\nFactors of 25: 1, 5, 25\nCommon: 1, 5  \u2192  Highest = 5", {
        x: 1.0, y: 3.6, w: 8.0, h: 1.2, rectRadius: 0.08,
        fill: { color: C.EMERALD },
        shadow: makeShadow(),
      }, {
        fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // -- Slide 13: You Do (Stage 4) --------------------------------------------
  contentSlide(
    pres,
    4,
    "Independent Practice \u2014 You Do",
    "Independent Practice",
    [
      "First: Find the LCM and HCF of 10 and 15.",
      "Next: Find the LCM of 3, 4 and 5.",
      "Then: A baker has 48 muffins and 36 cookies. She wants identical gift bags with no leftovers. What is the maximum number of bags she can make?",
      "Challenge: Estimate 67 x 8 by rounding. Will your estimate be greater or less? Then calculate the exact answer.",
    ],
    NOTES_YOU_DO,
    FOOTER,
    (s) => {
      // Right side: difficulty progression card
      addCard(s, 5.2, CONTENT_TOP, 4.3, SAFE_BOTTOM - CONTENT_TOP, { fill: C.WHITE });

      const levels = [
        { label: "First", hint: "HCF & LCM", color: C.TEAL },
        { label: "Next", hint: "LCM of 3 numbers", color: C.NAVY },
        { label: "Then", hint: "Real-world problem", color: C.CORAL },
        { label: "Challenge", hint: "Estimation + exact", color: C.CORAL },
      ];
      levels.forEach((lv, i) => {
        const ly = CONTENT_TOP + 0.15 + i * 0.9;
        const lblColor = C.WHITE;
        addTextOnShape(s, lv.label, {
          x: 5.4, y: ly, w: 1.5, h: 0.36, rectRadius: 0.06,
          fill: { color: lv.color },
        }, {
          fontSize: 11, fontFace: FONT_B, color: lblColor, bold: true,
        });
        s.addText(lv.hint, {
          x: 7.0, y: ly, w: 2.3, h: 0.36,
          fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
        });
        // Progress bar
        const barW = 3.8 * ((i + 1) / levels.length);
        s.addShape("roundRect", {
          x: 5.4, y: ly + 0.42, w: barW, h: 0.12, rectRadius: 0.04,
          fill: { color: lv.color, transparency: 60 },
        });
      });

      // Tip at bottom
      s.addShape("rect", {
        x: 5.2, y: SAFE_BOTTOM - 0.5, w: 4.3, h: 0.42,
        fill: { color: C.NAVY },
      });
      s.addText("Tip: Check — does your answer make sense?", {
        x: 5.2, y: SAFE_BOTTOM - 0.5, w: 4.3, h: 0.42,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
    }
  );

  // -- Slide 14: Exit Ticket (Stage 5) ----------------------------------------
  exitTicketSlide(
    pres,
    [
      "Find the HCF and LCM of 10 and 15.",
      "Estimate 67 x 8 by rounding. Will your estimate be greater or less than the actual value? Explain.",
      "This week we learned about factors, multiples, primes, square numbers, and triangular numbers. Name one thing you now understand that you didn't before.",
    ],
    NOTES_EXIT,
    FOOTER
  );

  // -- Slide 15: Closing ------------------------------------------------------
  closingSlide(
    pres,
    "This week we explored factors, multiples, primes, and special numbers. Which concept do you feel most confident about? Which do you want more practice with? Share with your partner.",
    [
      "LCM = smallest number that appears in both multiple lists",
      "HCF = largest number that appears in both factor lists",
      "Patterns emerge when we apply rules systematically \u2014 mathematicians look for these!",
    ],
    NOTES_CLOSING
  );

  // -- Write PPTX -------------------------------------------------------------
  const pptxPath = OUT_DIR + "/NP_Lesson5_LCM_HCF_Patterns.pptx";
  await pres.writeFile({ fileName: pptxPath });
  console.log("Written: " + pptxPath);
}

build().catch(console.error);
