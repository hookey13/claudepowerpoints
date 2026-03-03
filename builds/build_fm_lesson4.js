// Lesson 4 of 5: LCM & HCF
// Year 5/6 Numeracy — Factors & Multiples
// VC2M5N10 (algorithms, factors, multiples, LCM/HCF)
// Week 1, Session 4

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

const OUT_DIR = "output/FM_Lesson4_LCM_HCF";
const FOOTER = "Session 4 of 5 | Factors & Multiples | Year 5/6 Maths";

// ── Teacher notes ─────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
\u2022 "Over the last three sessions we've built a toolkit: factor pairs, multiples, divisibility rules, and prime identification. Today we put it all together. We're learning to find the Lowest Common Multiple and Highest Common Factor of two numbers."
\u2022 "LCM and HCF are THE practical applications of everything we've done. If you can list factors and multiples, you can find LCM and HCF."

**DO:**
\u2022 Display the title slide as students settle. Ensure mini-whiteboards and markers are on every desk.
\u2022 Direct attention: "This is Session 4 of 5."

**TEACHER NOTES:**
Lesson 4 synthesises all prior skills: systematic factor listing (L1), multiple listing (L2), and prime identification (L3). HCF uses the factor listing strategy from Lesson 1 applied to TWO numbers simultaneously. LCM uses the multiple listing strategy from Lesson 2 applied to TWO numbers simultaneously. The lesson introduces two new abbreviations (HCF, LCM) but NO new procedures \u2014 students are applying familiar skills in a new context. This is cognitive load-friendly: the only novelty is the comparison step.

**WATCH FOR:**
\u2022 Students who look anxious about new abbreviations \u2014 reassure: "You already know how to do this. We're just combining skills."
\u2022 Readiness signal: students settling quickly with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR = `**SAY:**
\u2022 "Quick review from yesterday. I'll say a number \u2014 you write PRIME or COMPOSITE on your whiteboard, and if it's composite, write one factor pair to prove it."
\u2022 "First number: 29. 10 seconds. Go!"
\u2022 After 10s: "Boards up. 29 is PRIME \u2014 no factor pairs other than 1 and 29."
\u2022 "Next: 51." After 10s: "COMPOSITE. 3 \u00d7 17 = 51. The digit sum 5+1=6 is divisible by 3."
\u2022 "Next: 37." After 10s: "PRIME. Not divisible by 2, 3, 5 \u2014 and 7\u00b2=49>37, so we stop."
\u2022 "Last one: 48." After 10s: "COMPOSITE. Many factor pairs: (1,48), (2,24), (3,16), (4,12), (6,8)."

**DO:**
\u2022 Display the slide. Students work on whiteboards.
\u2022 Time 10 seconds per number. Scan boards after each.
\u2022 Briefly correct any common errors.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
\u2022 "Write PRIME or COMPOSITE. If composite, prove it with a factor pair. Show me!"
\u2022 Scan for: correct classification on \u226580% of boards.
PROCEED: If \u226580% correct on all four, move to Fluency.
PIVOT: If widespread errors on 51 (students say prime), reteach: "Use your divisibility rules! 5+1=6, and 6\u00f73=2. So 3 is a factor of 51. 51=3\u00d717. Composite."

**TEACHER NOTES:**
Daily Review retrieves yesterday's prime/composite classification. Using 29 and 37 (primes) alongside 51 and 48 (composites) requires students to apply the full testing procedure. 51 is the key diagnostic \u2014 it looks prime but the digit sum rule reveals 3 as a factor. Students who correctly identify 51 as composite have internalised the testing process from Lesson 3.

**WATCH FOR:**
\u2022 Students who classify 51 as prime \u2014 they forgot to apply the digit sum rule from Lesson 2.
\u2022 Students who correctly list multiple factor pairs for 48 \u2014 strong retrieval from Lesson 1.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
\u2022 "Multiple chains \u2014 fast listing. I'll give you a starting number. Write as many multiples as you can in 45 seconds."
\u2022 "First chain: multiples of 6. Start at 6, keep adding 6. Go!"
\u2022 After 45s: "How far did you get? 6, 12, 18, 24, 30, 36, 42, 48, 54, 60\u2026"
\u2022 "Second chain: multiples of 8. 45 seconds. Go!"
\u2022 After 45s: "8, 16, 24, 32, 40, 48, 56, 64, 72, 80\u2026"
\u2022 "Look at both lists. Did any number appear in BOTH? Circle it."
\u2022 "24 and 48 appear in both lists. Today we'll learn what those shared numbers are called."

**DO:**
\u2022 Display the slide. Students write multiple chains on whiteboards.
\u2022 Time 45 seconds per chain. Read answers aloud for self-checking.
\u2022 After both chains: "Circle any numbers that appear in both lists." Pause 10 seconds.

**TEACHER NOTES:**
This fluency task is deliberately chosen to foreshadow the LCM concept. Multiples of 6 and 8 share common multiples (24, 48, 72\u2026), and 24 is the LCM. By having students discover the overlap naturally through fluency practice, the formal introduction of LCM will feel like naming something they already found. The "circle common numbers" instruction bridges fluency to the I Do.

**WATCH FOR:**
\u2022 Students who add incorrectly mid-chain (e.g., 6, 12, 18, 23 instead of 24) \u2014 computation gap.
\u2022 Students who find 24 in both lists without prompting \u2014 they're ready for the concept.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
\u2022 Read from slide: "We are learning to find the Lowest Common Multiple and Highest Common Factor of two numbers so we can solve problems involving shared patterns and groupings."
\u2022 "In the fluency task, you found that 24 appeared in both the multiples of 6 and the multiples of 8. That's a common multiple \u2014 and 24 is the LOWEST one. That's LCM."
\u2022 Read each SC: "SC1 is HCF \u2014 finding the biggest shared factor. SC2 is LCM \u2014 finding the smallest shared multiple. SC3 is applying these to real problems."

**DO:**
\u2022 Display the slide. Point to LI and read aloud.
\u2022 Point to each SC in turn. Emphasise SC3: "This is where we see WHY LCM and HCF are useful."

**TEACHER NOTES:**
The LI explicitly connects to the fluency task (common multiples of 6 and 8) to show students they already started finding LCMs without knowing the term. SC1 (HCF) comes first because it builds directly on factor listing from Lesson 1. SC2 (LCM) builds on multiple listing from Lesson 2. SC3 (application) provides the real-world motivation \u2014 packaging problems, scheduling, and grouping.

**WATCH FOR:**
\u2022 Students who look confused by the abbreviations \u2014 reassure: "HCF = Highest Common Factor. HCF uses factors. LCM = Lowest Common Multiple. LCM uses multiples. The abbreviation tells you which skill to use."

[Maths: Planning \u2014 Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_VOCAB = `**SAY:**
\u2022 "Two new terms today, but you already know the skills behind them."
\u2022 Point to HCF: "The Highest Common Factor is the BIGGEST number that divides into BOTH numbers evenly. To find it, list the factors of each number, find the ones they share, and pick the highest."
\u2022 "HCF of 12 and 18: factors of 12 are 1, 2, 3, 4, 6, 12. Factors of 18 are 1, 2, 3, 6, 9, 18. Common factors: 1, 2, 3, 6. Highest: 6."
\u2022 Point to LCM: "The Lowest Common Multiple is the SMALLEST number that is a multiple of BOTH numbers. To find it, list multiples of each number until you find the first match."
\u2022 "LCM of 4 and 6: multiples of 4: 4, 8, 12, 16\u2026 Multiples of 6: 6, 12, 18\u2026 First match: 12."
\u2022 "Turn to your partner. Say the full name for HCF and LCM. 10 seconds."

**DO:**
\u2022 Display the slide. Point to each term as you explain.
\u2022 After both terms: partner check on abbreviations.

**TEACHER NOTES:**
This vocabulary slide anchors the two key terms with concrete examples that students can verify using skills from Lessons 1-2. The HCF example (12 and 18) uses numbers whose factors students listed in previous lessons. The LCM example (4 and 6) is deliberately small to make the listing method quick and transparent. Both examples will be extended in the worked examples that follow.

**MISCONCEPTIONS:**
\u2022 Misconception: "HCF means the highest factor of one number."
  Why: Students read "highest" and ignore "common" \u2014 they just find the biggest factor of a single number.
  Impact: They'll write 24 as the HCF of 24 and 36 (instead of 12).
  Quick correction: "COMMON means shared by BOTH numbers. The highest factor of 24 alone is 24, but 24 is NOT a factor of 36. So 24 can't be the HCF. We need the highest factor that appears in BOTH lists."

\u2022 Misconception: "LCM is the product of both numbers."
  Why: Students default to multiplying the numbers together (4\u00d76=24) rather than listing multiples.
  Impact: They'll get the wrong LCM unless the two numbers happen to be coprime.
  Quick correction: "4\u00d76=24, but is 24 the LOWEST common multiple? Let's check: 12 appears in both lists and 12<24. So 24 is too high. Always list and compare."

[Maths: Launch \u2014 Explicit Instruction | VTLM 2.0: Explicit Explanation]`;

const NOTES_IDO_COMBINED = `**SAY:**
\u2022 "Let me show you both methods side by side."
\u2022 "Left side: HCF of 24 and 36. HCF uses FACTORS."
\u2022 "Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36."
\u2022 "Common factors: 1, 2, 3, 4, 6, 12. The HIGHEST is 12. HCF(24, 36) = 12."
\u2022 "Check: 24\u00f712=2 \u2713 and 36\u00f712=3 \u2713."
\u2022 "Right side: LCM of 4 and 6. LCM uses MULTIPLES."
\u2022 "Multiples of 4: 4, 8, 12, 16\u2026 Multiples of 6: 6, 12, 18\u2026"
\u2022 "First number in BOTH lists: 12. LCM(4, 6) = 12."
\u2022 "Check: 4\u00d73=12 \u2713 and 6\u00d72=12 \u2713."
\u2022 "Notice: you found common multiples in the fluency task! Multiples of 6 and 8 had 24 as their first overlap. LCM(6, 8) = 24."

**DO:**
\u2022 Display the slide. Walk through HCF (left) first, then LCM (right).
\u2022 Write factor/multiple lists on the whiteboard alongside the slide.
\u2022 Pause after each method to let students see the comparison process.

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
\u2022 After HCF: "[Name], why is 12 the HCF and not 6?" [Because 12 is also common and 12 > 6]
\u2022 After LCM: "[Name], why isn't the LCM 4\u00d76=24?" [Because 12 is a common multiple and 12 < 24]
PROCEED: If students can articulate the "highest" / "lowest" distinction, continue to CFU.
PIVOT: If confused, slow down: "HCF = biggest shared factor. LCM = smallest shared multiple. The clue is in the name."

**TEACHER NOTES:**
This slide presents both methods side-by-side to highlight the symmetry: HCF looks at factors and picks the HIGHEST common one; LCM looks at multiples and picks the LOWEST common one. The HCF example (24 and 36) has many factors, making the listing method substantive. The LCM example (4 and 6) is intentionally simple so the method is transparent. Note that 4\u00d76=24 is NOT the LCM \u2014 12 is. This is a key insight students must grasp.

**MISCONCEPTIONS:**
\u2022 Misconception: Students stop at the first common factor (e.g., 6) and call it the HCF.
  Why: Finding any common factor satisfies their mental model.
  Quick correction: "6 IS a common factor, but is it the HIGHEST? 12 is also common and 12>6."

\u2022 Misconception: "LCM = multiply the two numbers."
  Why: Students default to multiplication (4\u00d76=24) instead of listing.
  Quick correction: "4\u00d76=24, but 12 appears in both lists and 12<24. Always list and compare."

[Maths: Launch \u2014 Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
\u2022 "Quick check. On your whiteboard, find the HCF of 18 and 12."
\u2022 "You'll need to list the factors of each number, find the common ones, and pick the highest. 30 seconds. Go!"
\u2022 After 30s: "Boards up. Let's check."
\u2022 "Factors of 18: 1, 2, 3, 6, 9, 18. Factors of 12: 1, 2, 3, 4, 6, 12."
\u2022 "Common factors: 1, 2, 3, 6. The highest is 6. HCF(18, 12) = 6."

**DO:**
\u2022 Display the question slide. Give 30 seconds for whiteboard work.
\u2022 "Show me your boards!" Scan for 6 on \u226580%.
\u2022 Click to reveal. Walk through the factor lists.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
\u2022 "Find the HCF of 18 and 12. List factors, find common, pick highest. 30 seconds. Show me!"
\u2022 Scan for: answer of 6 on \u226580% of boards.
PROCEED: If \u226580% correct, move to We Do 1.
PIVOT: If students write 18 or 12 (highest factor of one number, not common): "COMMON means in BOTH lists. 18 is a factor of 18 but is it a factor of 12? 12\u00f718 is not a whole number. So 18 can't be the HCF." If students write 3 (found a common factor but not the highest): "3 IS common, but keep looking \u2014 is there a bigger common factor? Check 6."

**TEACHER NOTES:**
This CFU tests SC1 (finding HCF by listing and comparing factors). 18 and 12 are chosen because they have a clear HCF of 6, and the common factor set (1, 2, 3, 6) requires scanning past smaller values. The most diagnostic error is writing 3 \u2014 it means the student found common factors but didn't identify the highest. Writing 18 or 12 means they misunderstood "common."

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
\u2022 "Let's practise LCM together. Find the LCM of 6 and 8."
\u2022 "On your whiteboards, list multiples of 6 and multiples of 8 until you find the first number in both lists. 30 seconds."
\u2022 Cold Call: "[Name], what are the first few multiples of 6?" [6, 12, 18, 24, 30]
\u2022 Cold Call: "[Name], what are the first few multiples of 8?" [8, 16, 24, 32]
\u2022 "What number appears in both lists?" [24]
\u2022 "LCM(6, 8) = 24. This is exactly what you found in the fluency task!"

**DO:**
\u2022 Display the question slide. Students list on whiteboards. 30 seconds.
\u2022 Cold Call for each multiple list. Then reveal.

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
\u2022 Cold call different students: "[Name], multiples of 6?" "[Name], multiples of 8?" "[Name], first common?"
PROCEED: If students answer correctly, move to We Do 2.
PIVOT: If students say "48" (the product 6\u00d78): "48 IS a common multiple, but is it the LOWEST? Check your lists \u2014 24 comes first. Always find the FIRST match, not just multiply the numbers."

**ENABLING & EXTENDING:**
ENABLING PROMPT:
\u2022 Task: Students find the LCM of 3 and 4 (simpler: multiples of 3: 3,6,9,12; multiples of 4: 4,8,12; LCM=12). Then attempt 6 and 8.

EXTENDING PROMPT:
\u2022 Task: "Find the LCM of 6, 8, AND 12. How does adding a third number change your method?"

**TEACHER NOTES:**
LCM of 6 and 8 connects directly to the fluency warm-up where students listed these exact multiples. The Cold Call structure ensures accountability \u2014 students can't just copy a neighbour's answer. The key error to watch for is 48 (the product) instead of 24 (the actual LCM). The extending prompt introduces a three-number LCM, which requires checking all three lists (LCM(6,8,12) = 24).

[Maths: Explore \u2014 Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
\u2022 "This time, find BOTH the HCF and the LCM of 15 and 20. Use factors for HCF, multiples for LCM."
\u2022 "On your whiteboards, set up two sections: one for HCF, one for LCM. You have 45 seconds."
\u2022 After 45s: "Let's check HCF first."
\u2022 "Factors of 15: 1, 3, 5, 15. Factors of 20: 1, 2, 4, 5, 10, 20. Common: 1, 5. Highest: 5. HCF = 5."
\u2022 "Now LCM. Multiples of 15: 15, 30, 45, 60, 75. Multiples of 20: 20, 40, 60, 80. First match: 60. LCM = 60."
\u2022 "Notice: HCF is always \u2264 both numbers, and LCM is always \u2265 both numbers. That's a good check."

**DO:**
\u2022 Display the question slide. 45 seconds for whiteboard work.
\u2022 Walk through HCF first, then LCM. Click to reveal.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
\u2022 "Write HCF and LCM of 15 and 20 on your board. 45 seconds. Show me!"
\u2022 Scan for: HCF=5 and LCM=60 on \u226580% of boards.
PROCEED: If \u226580% correct on both, move to Hinge Question.
PIVOT: If HCF errors: students likely wrote 15 or 20 (not common). Reteach: "List factors of BOTH, then find what's SHARED." If LCM errors: students likely wrote 300 (15\u00d720). Reteach: "List multiples until you find the first match. 300 is a common multiple, but 60 comes first."

**ENABLING & EXTENDING:**
ENABLING PROMPT:
\u2022 Task: Students find only the HCF of 15 and 20 first. If successful, attempt the LCM.

EXTENDING PROMPT:
\u2022 Task: "The HCF of 15 and 20 is 5, and the LCM is 60. Multiply HCF\u00d7LCM: 5\u00d760=300. Now multiply 15\u00d720=300. Coincidence? Test with 6 and 8. Can you find the rule?"

**TEACHER NOTES:**
This problem requires both HCF and LCM for the same pair, testing whether students can switch between the two methods. 15 and 20 have relatively few factors but their LCM (60) requires listing to the 4th multiple of 15 and 3rd of 20 \u2014 enough listing to be non-trivial. The extending prompt leads to the theorem: HCF(a,b) \u00d7 LCM(a,b) = a \u00d7 b. This will be explored further in the EXT1 resource.

[Maths: Explore \u2014 Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
\u2022 "Gate check. What is the LCM of 3 and 5?"
\u2022 "Four options on screen. Hold up 1, 2, 3, or 4 fingers. 15 seconds to decide."
\u2022 After vote: "The answer is C \u2014 15."
\u2022 "Multiples of 3: 3, 6, 9, 12, 15. Multiples of 5: 5, 10, 15. First match: 15."
\u2022 "Why not the others? A) 8 is 3+5 \u2014 that's the SUM, not the LCM. B) 1 would be the HCF, not the LCM. D) 30 is 3\u00d75\u00d72 \u2014 it's a common multiple but not the LOWEST."

**DO:**
\u2022 Display the hinge question. 15 seconds.
\u2022 Finger vote: scan for option C (3 fingers) on \u226580%.
\u2022 Click to reveal. Explain each distractor.

**CFU CHECKPOINT:**
Technique: Finger Voting (1\u20134)
Script:
\u2022 "Fingers up \u2014 what is the LCM of 3 and 5? 1 for A, 2 for B, 3 for C, 4 for D. Show me!"
PROCEED: If \u226580% choose C, release to You Do.
PIVOT: If students choose A (8=sum): "LCM uses multiplication, not addition. List the multiples." If students choose B (1=HCF): "1 is the HCF of 3 and 5, not the LCM. HCF=factors, LCM=multiples." If students choose D (30=product): "30 IS a common multiple, but is it the lowest? 15 comes first."

**MISCONCEPTIONS:**
\u2022 Misconception: "LCM means multiply the two numbers" (choosing D=30 for 3\u00d75\u00d72 or thinking 3\u00d75=15 is always the method).
  Why: For coprime numbers like 3 and 5, the LCM happens to equal the product (15=3\u00d75). Students may generalise this.
  Impact: Works for coprime pairs but fails for others (e.g., LCM(4,6)\u226024).
  Quick correction: "For 3 and 5 the LCM IS 15, which equals 3\u00d75. But that only works because 3 and 5 share no common factors. For 4 and 6, the LCM is 24, NOT 4\u00d76=24\u2026 wait, that works too! Try 6 and 8: LCM=24, but 6\u00d78=48. So multiplying doesn't always work. Always list."

**TEACHER NOTES:**
This hinge question uses 3 and 5 (coprime numbers) where the LCM equals the product. Each distractor reveals a specific misconception: A=sum (confusing operations), B=HCF (confusing the two concepts), D=a plausible-looking larger multiple. The key diagnostic is whether students who choose C did so by listing (correct method) or by multiplying (works here but not generally). The teacher notes above address this.

[Maths: Monitor Progress \u2014 Hinge Question | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
\u2022 "Independent practice time. On your worksheet, you'll find 6 pairs of numbers. For each pair, find both the HCF and LCM."
\u2022 "Use the listing method: factors for HCF, multiples for LCM. Show your working."
\u2022 "You have 8 minutes. Start now."

**DO:**
\u2022 Distribute SR1 worksheet.
\u2022 Set timer for 8 minutes. Circulate \u2014 visit enabling students first.
\u2022 Conference with 2\u20133 students: "Show me your factor lists. How did you find the HCF?"

**ENABLING & EXTENDING:**
ENABLING PROMPT:
\u2022 Task: Students complete only the first 3 pairs (smaller numbers) and find HCF only. If they finish, attempt LCM for those same pairs.

EXTENDING PROMPT:
\u2022 Task: After completing the worksheet, students work on EXT1 \u2014 Using Prime Factorisation for LCM & HCF, which teaches the Venn diagram method using prime factors.

**TEACHER NOTES:**
The worksheet sequences pairs from easy (small numbers with obvious HCF/LCM) to challenging (larger numbers requiring more listing). The word problem at the end targets SC3 \u2014 applying LCM to a real context. Numbers are chosen so HCF and LCM vary: some pairs are coprime (HCF=1, LCM=product), others share large common factors.

[Maths: Summarise \u2014 Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
\u2022 "Pens down. Exit ticket time \u2014 three questions. Work silently, 3 minutes."
\u2022 Read Q1, Q2, Q3 aloud from the slide.

**DO:**
\u2022 Display exit ticket. 3 minutes. Circulate silently.
\u2022 Collect responses or observe.

**TEACHER NOTES:**
Q1 tests SC1 (HCF). Q2 tests SC2 (LCM). Q3 tests SC3 (applying LCM to a real-world problem \u2014 the hot dogs and buns classic). Sort responses: SC1 only \u2192 enabling tomorrow, SC1+SC2 \u2192 on track, all three \u2192 ready for extending. The hot dogs/buns problem is a canonical LCM application: LCM(8,6)=24, so you need 3 packs of 8 and 4 packs of 6.

[Maths: Summarise \u2014 Exit Ticket (Stage 5) | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `**SAY:**
\u2022 "Here are today's printable resources."

**DO:**
\u2022 Display briefly. Teachers click hyperlinks.

**TEACHER NOTES:**
SR1 is the practice worksheet (one per student). SR2 is the answer key (teacher reference). EXT1 is the extending investigation on prime factorisation for LCM/HCF (3\u20135 copies for extending students). EXT1 is SELF-CONTAINED \u2014 it teaches the Venn diagram method with worked examples so extending students can work independently.

[Maths: Planning \u2014 Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
\u2022 "Let's check our success criteria."
\u2022 Read SC1: "I can find the HCF of two numbers by listing and comparing their factors." Thumbs up/sideways/down. Scan.
\u2022 Read SC2: "I can find the LCM of two numbers by listing and comparing their multiples." Thumbs. Scan.
\u2022 Read SC3: "I can apply LCM or HCF to solve a real-world problem." Thumbs. Scan.
\u2022 "Turn to your partner: When would you use HCF? When would you use LCM? Give an example for each. 30 seconds."
\u2022 "Tomorrow is our final session \u2014 we bring ALL five sessions together: factors, multiples, primes, LCM, and HCF. Everything connects."

**DO:**
\u2022 Display closing slide. Run thumbs for each SC.
\u2022 30 seconds Turn & Talk. Listen to 2\u20133 pairs.
\u2022 Note students showing thumbs-down on SC1 or SC2 for tomorrow's enabling.

**TEACHER NOTES:**
SC3 (real-world application) is the most likely thumbs-down \u2014 this is fine for Lesson 4. The hot dogs/buns problem in the exit ticket introduces applied LCM, and students may need more exposure. The preview of Lesson 5 signals that tomorrow consolidates the entire unit. The Turn & Talk question pushes students to distinguish when to use HCF vs LCM, which is the deepest conceptual understanding in this lesson.

[Maths: Summarise \u2014 Closing | VTLM 2.0: Monitor Progress & Feedback]`;

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "LCM & HCF \u2014 Session 4";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres, "LCM & HCF", "Finding Shared Factors and Multiples",
    "Session 4 of 5 | Factors & Multiples | Year 5/6", NOTES_TITLE);

  // ── SLIDE 2: Daily Review (Stage 1) ─────────────────────────────────────
  contentSlide(pres, "Daily Review", C.ACCENT, "Prime or Composite?", [
    "Is 29 prime or composite? Prove it.",
    "Is 51 prime or composite? Prove it.",
    "Is 37 prime or composite? Prove it.",
    "Is 48 prime or composite? Prove it.",
  ], NOTES_DR, FOOTER, (s) => {
    addCard(s, 6.2, CONTENT_TOP + 0.1, 3.2, 1.6, { strip: C.ACCENT });
    s.addText([
      { text: "Show Me Boards", options: { bold: true, breakLine: true, fontSize: 13, color: C.ACCENT } },
      { text: "10 seconds per number.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "PRIME or COMPOSITE.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Prove composite with", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "a factor pair.", options: { fontSize: 11, color: C.CHARCOAL } },
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
    addTitle(s, "Multiple Chains", { fontSize: 26 });

    // Two chain cards
    const chains = [
      { label: "Chain 1", rule: "Multiples of 6: start at 6, keep adding 6", example: "6, 12, 18, 24, 30, 36, 42, 48, \u2026" },
      { label: "Chain 2", rule: "Multiples of 8: start at 8, keep adding 8", example: "8, 16, 24, 32, 40, 48, 56, 64, \u2026" },
    ];
    chains.forEach((ch, i) => {
      const cy = CONTENT_TOP + 0.1 + i * 1.55;
      addCard(s, 0.5, cy, 6.5, 1.35, { strip: C.PRIMARY });
      addTextOnShape(s, ch.label, {
        x: 0.7, y: cy + 0.12, w: 1.8, h: 0.32, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText(ch.rule, {
        x: 0.7, y: cy + 0.52, w: 6.0, h: 0.3,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
      });
      s.addText(ch.example, {
        x: 0.7, y: cy + 0.85, w: 6.0, h: 0.3,
        fontSize: 13, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });
    });

    // Prompt banner
    addTextOnShape(s, "45 seconds per chain \u2014 then circle numbers in BOTH lists!", {
      x: 1.5, y: SAFE_BOTTOM - 0.55, w: 7.0, h: 0.45, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });

    // Instruction card (right)
    addCard(s, 7.3, CONTENT_TOP + 0.1, 2.2, 2.5, { strip: C.SECONDARY });
    s.addText([
      { text: "Write on\nwhiteboard", options: { breakLine: true, fontSize: 12, color: C.SECONDARY, bold: true } },
      { text: "Circle any\nshared multiples!", options: { fontSize: 11, color: C.CHARCOAL } },
    ], {
      x: 7.5, y: CONTENT_TOP + 0.3, w: 1.8, h: 1.5,
      fontFace: FONT_B, margin: 0, align: "center", valign: "middle",
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_FLUENCY);
  })();

  // ── SLIDE 4: LI/SC ─────────────────────────────────────────────────────
  liSlide(pres,
    ["We are learning to find the Lowest Common Multiple (LCM) and Highest Common Factor (HCF) of two numbers so we can solve problems involving shared patterns and groupings."],
    [
      "I can find the HCF of two numbers by listing and comparing their factors.",
      "I can find the LCM of two numbers by listing and comparing their multiples.",
      "I can apply LCM or HCF to solve a real-world problem.",
    ],
    NOTES_LISC, FOOTER);

  // ── SLIDE 5: Vocabulary (Stage 2) ──────────────────────────────────────
  contentSlide(pres, "Stage 2 | I Do", C.PRIMARY, "Key Vocabulary", [], NOTES_VOCAB, FOOTER, (s) => {
    // Two vocab cards side by side
    const terms = [
      {
        word: "HCF",
        full: "Highest Common Factor",
        def: "The BIGGEST number that is a\nfactor of BOTH numbers.",
        example: "HCF(12, 18) = 6\nFactors of 12: 1, 2, 3, 4, 6, 12\nFactors of 18: 1, 2, 3, 6, 9, 18\nCommon: 1, 2, 3, 6  \u2192  Highest: 6",
        color: C.PRIMARY,
      },
      {
        word: "LCM",
        full: "Lowest Common Multiple",
        def: "The SMALLEST number that is a\nmultiple of BOTH numbers.",
        example: "LCM(4, 6) = 12\nMultiples of 4: 4, 8, 12, 16, 20\u2026\nMultiples of 6: 6, 12, 18, 24\u2026\nFirst match: 12",
        color: C.SECONDARY,
      },
    ];
    terms.forEach((t, i) => {
      const cx = 0.5 + i * 4.7;
      addCard(s, cx, CONTENT_TOP + 0.05, 4.4, 3.5, { strip: t.color });
      addTextOnShape(s, t.word, {
        x: cx + 0.12, y: CONTENT_TOP + 0.15, w: 1.2, h: 0.38, rectRadius: 0.08,
        fill: { color: t.color },
      }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText(t.full, {
        x: cx + 1.5, y: CONTENT_TOP + 0.15, w: 2.7, h: 0.38,
        fontSize: 11, fontFace: FONT_B, color: t.color, bold: true, margin: 0, valign: "middle",
      });
      s.addText(t.def, {
        x: cx + 0.15, y: CONTENT_TOP + 0.62, w: 4.1, h: 0.6,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });
      // Example in a light box
      s.addShape("roundRect", {
        x: cx + 0.15, y: CONTENT_TOP + 1.3, w: 4.1, h: 1.9, rectRadius: 0.06,
        fill: { color: C.BG_LIGHT },
      });
      s.addText(t.example, {
        x: cx + 0.25, y: CONTENT_TOP + 1.35, w: 3.9, h: 1.8,
        fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });
    });
  });

  // ── SLIDE 6: I Do \u2014 HCF & LCM Worked Examples (Stage 2) ─────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Examples: HCF & LCM", { fontSize: 22, color: C.PRIMARY });

    // LEFT: HCF of 24 and 36
    addCard(s, 0.5, CONTENT_TOP + 0.05, 4.4, 3.65, { strip: C.PRIMARY });
    addTextOnShape(s, "HCF(24, 36)", {
      x: 0.65, y: CONTENT_TOP + 0.12, w: 2.0, h: 0.32, rectRadius: 0.06,
      fill: { color: C.PRIMARY },
    }, { fontSize: 10, fontFace: FONT_H, color: C.WHITE, bold: true });
    s.addText([
      { text: "24: ", options: { bold: true, fontSize: 10, color: C.PRIMARY } },
      { text: "1, 2, 3, 4, 6, 8, 12, 24", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "36: ", options: { bold: true, fontSize: 10, color: C.SECONDARY } },
      { text: "1, 2, 3, 4, 6, 9, 12, 18, 36", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "Common: ", options: { bold: true, fontSize: 10, color: C.SUCCESS } },
      { text: "1, 2, 3, 4, 6, 12", options: { fontSize: 10, color: C.CHARCOAL } },
    ], {
      x: 0.65, y: CONTENT_TOP + 0.52, w: 4.1, h: 1.0,
      fontFace: FONT_B, margin: 0, valign: "top",
    });
    addTextOnShape(s, "HCF = 12", {
      x: 1.2, y: CONTENT_TOP + 1.65, w: 2.6, h: 0.55, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });
    s.addText([
      { text: "1. List factors of each number", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
      { text: "2. Find COMMON factors", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
      { text: "3. Pick the HIGHEST", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
      { text: "Check: 24\u00f712=2 \u2713  36\u00f712=3 \u2713", options: { fontSize: 9, color: C.SUCCESS, bold: true } },
    ], {
      x: 0.65, y: CONTENT_TOP + 2.35, w: 4.0, h: 1.2,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // RIGHT: LCM of 4 and 6
    addCard(s, 5.1, CONTENT_TOP + 0.05, 4.4, 3.65, { strip: C.SECONDARY });
    addTextOnShape(s, "LCM(4, 6)", {
      x: 5.25, y: CONTENT_TOP + 0.12, w: 2.0, h: 0.32, rectRadius: 0.06,
      fill: { color: C.SECONDARY },
    }, { fontSize: 10, fontFace: FONT_H, color: C.WHITE, bold: true });
    s.addText([
      { text: "4: ", options: { bold: true, fontSize: 10, color: C.PRIMARY } },
      { text: "4, 8, 12, 16, 20, 24, 28\u2026", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "6: ", options: { bold: true, fontSize: 10, color: C.SECONDARY } },
      { text: "6, 12, 18, 24, 30\u2026", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "First match: ", options: { bold: true, fontSize: 10, color: C.SUCCESS } },
      { text: "12", options: { fontSize: 10, color: C.CHARCOAL, bold: true } },
    ], {
      x: 5.25, y: CONTENT_TOP + 0.52, w: 4.1, h: 1.0,
      fontFace: FONT_B, margin: 0, valign: "top",
    });
    addTextOnShape(s, "LCM = 12", {
      x: 5.8, y: CONTENT_TOP + 1.65, w: 2.6, h: 0.55, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });
    s.addText([
      { text: "1. List multiples of each number", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
      { text: "2. Find FIRST in BOTH lists", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
      { text: "3. That's the LCM", options: { breakLine: true, fontSize: 9, color: C.CHARCOAL } },
      { text: "Check: 4\u00d73=12 \u2713  6\u00d72=12 \u2713", options: { fontSize: 9, color: C.SUCCESS, bold: true } },
    ], {
      x: 5.25, y: CONTENT_TOP + 2.35, w: 4.0, h: 1.2,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_IDO_COMBINED);
  })();

  // ── SLIDES 7\u20138: CFU 1 \u2014 HCF of 18 and 12 (withReveal) ──────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "CFU", { color: C.ALERT });
      addTitle(s, "Find the HCF", { color: C.ALERT });

      // Large number display
      addTextOnShape(s, "HCF( 18 , 12 )", {
        x: 2.0, y: CONTENT_TOP + 0.1, w: 6.0, h: 1.0, rectRadius: 0.12,
        fill: { color: C.BG_DARK },
      }, { fontSize: 42, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Prompt cards
      addCard(s, 0.5, CONTENT_TOP + 1.4, 4.2, 1.2, { strip: C.PRIMARY });
      s.addText([
        { text: "Step 1: ", options: { bold: true, fontSize: 12, color: C.PRIMARY } },
        { text: "List factors of 18", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "Step 2: ", options: { bold: true, fontSize: 12, color: C.PRIMARY } },
        { text: "List factors of 12", options: { breakLine: true, fontSize: 12, color: C.CHARCOAL } },
        { text: "Step 3: ", options: { bold: true, fontSize: 12, color: C.PRIMARY } },
        { text: "Find common \u2192 pick highest", options: { fontSize: 12, color: C.CHARCOAL } },
      ], {
        x: 0.7, y: CONTENT_TOP + 1.5, w: 3.8, h: 1.0,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addTextOnShape(s, "Show Me Boards \u2014 30 seconds", {
        x: 2.5, y: CONTENT_TOP + 2.9, w: 5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, { fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_CFU1);
      return s;
    },
    (slide) => {
      // Cover the "Show Me Boards" bar from the question slide
      slide.addShape("rect", {
        x: 2.3, y: CONTENT_TOP + 2.8, w: 5.4, h: 0.55,
        fill: { color: C.BG_LIGHT },
      });

      // Reveal: show factor lists and answer
      addCard(slide, 5.0, CONTENT_TOP + 1.4, 4.5, 1.8, { strip: C.SUCCESS });
      slide.addText([
        { text: "18: ", options: { bold: true, fontSize: 11, color: C.PRIMARY } },
        { text: "1, 2, 3, 6, 9, 18", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "12: ", options: { bold: true, fontSize: 11, color: C.SECONDARY } },
        { text: "1, 2, 3, 4, 6, 12", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Common: ", options: { bold: true, fontSize: 11, color: C.SUCCESS } },
        { text: "1, 2, 3, 6", options: { fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 5.2, y: CONTENT_TOP + 1.5, w: 4.1, h: 1.0,
        fontFace: FONT_B, margin: 0, valign: "top",
      });
      addTextOnShape(slide, "HCF = 6", {
        x: 5.5, y: CONTENT_TOP + 2.6, w: 3.5, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDES 9\u201310: We Do 1 \u2014 LCM of 6 and 8 (withReveal) ─────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Find the LCM of 6 and 8", { fontSize: 22, color: C.SECONDARY });

      addTextOnShape(s, "LCM( 6 , 8 )", {
        x: 2.5, y: CONTENT_TOP + 0.1, w: 5.0, h: 0.9, rectRadius: 0.12,
        fill: { color: C.PRIMARY },
      }, { fontSize: 40, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Two empty list cards
      const labels = ["Multiples of 6", "Multiples of 8"];
      labels.forEach((l, i) => {
        const cy = CONTENT_TOP + 1.25 + i * 1.0;
        addCard(s, 0.5, cy, 9.0, 0.8, { strip: C.PRIMARY });
        addTextOnShape(s, l, {
          x: 0.65, y: cy + 0.08, w: 2.0, h: 0.3, rectRadius: 0.06,
          fill: { color: C.PRIMARY },
        }, { fontSize: 10, fontFace: FONT_H, color: C.WHITE, bold: true });
        s.addText("?", {
          x: 3.0, y: cy + 0.1, w: 6.0, h: 0.6,
          fontSize: 28, fontFace: FONT_H, color: C.MUTED,
          align: "center", valign: "middle", margin: 0,
        });
      });

      addTextOnShape(s, "List multiples until you find the first match \u2014 30 seconds", {
        x: 1.5, y: CONTENT_TOP + 3.5, w: 7.0, h: 0.4, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (slide) => {
      // Cover the "?" placeholders from the question slide
      const lists = [
        { y: CONTENT_TOP + 1.25, items: "6,  12,  18,  24,  30,  36,  42,  48 \u2026" },
        { y: CONTENT_TOP + 2.25, items: "8,  16,  24,  32,  40,  48 \u2026" },
      ];
      lists.forEach((l) => {
        slide.addShape("rect", {
          x: 2.8, y: l.y + 0.05, w: 6.4, h: 0.7,
          fill: { color: C.WHITE },
        });
        slide.addText(l.items, {
          x: 3.0, y: l.y + 0.2, w: 6.0, h: 0.4,
          fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL,
          align: "center", valign: "middle", margin: 0, bold: true,
        });
      });
      // Cover the instruction bar from the question slide
      slide.addShape("rect", {
        x: 1.3, y: CONTENT_TOP + 3.4, w: 7.4, h: 0.6,
        fill: { color: C.BG_LIGHT },
      });
      addTextOnShape(slide, "LCM( 6, 8 ) = 24", {
        x: 2.5, y: CONTENT_TOP + 3.5, w: 5.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDES 11\u201312: We Do 2 \u2014 HCF and LCM of 15 and 20 (withReveal) ──────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "HCF AND LCM of 15 and 20", { fontSize: 20, color: C.SECONDARY });

      // Two section cards
      addCard(s, 0.5, CONTENT_TOP + 0.05, 4.3, 1.5, { strip: C.PRIMARY });
      addTextOnShape(s, "HCF", {
        x: 0.65, y: CONTENT_TOP + 0.12, w: 0.85, h: 0.3, rectRadius: 0.06,
        fill: { color: C.PRIMARY },
      }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText("List factors of 15 and 20.\nFind common. Pick highest.", {
        x: 0.65, y: CONTENT_TOP + 0.5, w: 3.9, h: 0.8,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });

      addCard(s, 5.2, CONTENT_TOP + 0.05, 4.3, 1.5, { strip: C.SECONDARY });
      addTextOnShape(s, "LCM", {
        x: 5.35, y: CONTENT_TOP + 0.12, w: 0.85, h: 0.3, rectRadius: 0.06,
        fill: { color: C.SECONDARY },
      }, { fontSize: 11, fontFace: FONT_H, color: C.WHITE, bold: true });
      s.addText("List multiples of 15 and 20.\nFind first match.", {
        x: 5.35, y: CONTENT_TOP + 0.5, w: 3.9, h: 0.8,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });

      // Answer area: question marks
      addCard(s, 0.5, CONTENT_TOP + 1.8, 4.3, 1.0, { strip: C.PRIMARY });
      s.addText("HCF = ?", {
        x: 0.5, y: CONTENT_TOP + 1.9, w: 4.3, h: 0.8,
        fontSize: 32, fontFace: FONT_H, color: C.MUTED,
        align: "center", valign: "middle", margin: 0,
      });

      addCard(s, 5.2, CONTENT_TOP + 1.8, 4.3, 1.0, { strip: C.SECONDARY });
      s.addText("LCM = ?", {
        x: 5.2, y: CONTENT_TOP + 1.9, w: 4.3, h: 0.8,
        fontSize: 32, fontFace: FONT_H, color: C.MUTED,
        align: "center", valign: "middle", margin: 0,
      });

      addTextOnShape(s, "Find BOTH \u2014 45 seconds on your whiteboard", {
        x: 2.0, y: CONTENT_TOP + 3.1, w: 6.0, h: 0.4, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO2);
      return s;
    },
    (slide) => {
      // Cover the "HCF = ?" and "LCM = ?" ghost text from the question slide
      slide.addShape("rect", {
        x: 0.55, y: CONTENT_TOP + 1.85, w: 4.2, h: 0.9,
        fill: { color: C.WHITE },
      });
      slide.addShape("rect", {
        x: 5.25, y: CONTENT_TOP + 1.85, w: 4.2, h: 0.9,
        fill: { color: C.WHITE },
      });

      // Reveal: HCF working
      slide.addText([
        { text: "15: ", options: { bold: true, fontSize: 10, color: C.PRIMARY } },
        { text: "1, 3, 5, 15", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "20: ", options: { bold: true, fontSize: 10, color: C.SECONDARY } },
        { text: "1, 2, 4, 5, 10, 20", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "Common: 1, 5", options: { fontSize: 10, color: C.SUCCESS, bold: true } },
      ], {
        x: 0.65, y: CONTENT_TOP + 1.9, w: 4.0, h: 0.8,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Reveal: LCM working
      slide.addText([
        { text: "15: ", options: { bold: true, fontSize: 10, color: C.PRIMARY } },
        { text: "15, 30, 45, 60, 75\u2026", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "20: ", options: { bold: true, fontSize: 10, color: C.SECONDARY } },
        { text: "20, 40, 60, 80\u2026", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
        { text: "First match: 60", options: { fontSize: 10, color: C.SUCCESS, bold: true } },
      ], {
        x: 5.35, y: CONTENT_TOP + 1.9, w: 4.0, h: 0.8,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Cover the instruction bar from the question slide
      slide.addShape("rect", {
        x: 1.8, y: CONTENT_TOP + 3.0, w: 6.4, h: 0.55,
        fill: { color: C.BG_LIGHT },
      });

      // Answer banners
      addTextOnShape(slide, "HCF = 5", {
        x: 0.5, y: CONTENT_TOP + 3.1, w: 4.3, h: 0.45, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(slide, "LCM = 60", {
        x: 5.2, y: CONTENT_TOP + 3.1, w: 4.3, h: 0.45, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
    }
  );

  // ── SLIDES 13\u201314: Hinge Question (withReveal) ────────────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "Hinge Question", { color: C.ALERT, w: 2.2 });
      addTitle(s, "What is the LCM of 3 and 5?", { color: C.ALERT });

      const options = [
        { letter: "A", value: "8", color: C.PRIMARY },
        { letter: "B", value: "1", color: C.SECONDARY },
        { letter: "C", value: "15", color: C.ACCENT },
        { letter: "D", value: "30", color: C.SUCCESS },
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
      addTextOnShape(slide, "C \u2014 LCM( 3, 5 ) = 15", {
        x: 1.5, y: CONTENT_TOP + 2.2, w: 7, h: 0.55, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });
      slide.addText("Multiples of 3: 3, 6, 9, 12, 15     Multiples of 5: 5, 10, 15     First match: 15", {
        x: 1.0, y: CONTENT_TOP + 2.85, w: 8, h: 0.35,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      slide.addText("A) 8 = sum (3+5)     B) 1 = HCF, not LCM     D) 30 = product, but 15 is lower", {
        x: 1.0, y: CONTENT_TOP + 3.2, w: 8, h: 0.25,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });
    }
  );

  // ── SLIDE 15: You Do (Stage 4) ──────────────────────────────────────────
  contentSlide(pres, "Stage 4 | You Do", C.ALERT, "Independent Practice: HCF & LCM", [], NOTES_YOUDO, FOOTER, (s) => {
    addCard(s, 0.5, CONTENT_TOP, 5.5, 2.0, { strip: C.ALERT });
    const steps = [
      { label: "For each pair:", text: "Find both HCF and LCM." },
      { label: "Show working:", text: "List factors (HCF) or multiples (LCM)." },
      { label: "Word problem:", text: "Apply LCM to a real-world context." },
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

    // Number pairs on right
    const pairs = ["8, 12", "10, 15", "14, 21", "9, 12", "16, 24", "18, 30"];
    pairs.forEach((p, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      addTextOnShape(s, p, {
        x: 6.3 + col * 1.7, y: CONTENT_TOP + 0.1 + row * 0.7, w: 1.4, h: 0.55, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

    addTextOnShape(s, "Use your SR1 Worksheet", {
      x: 6.5, y: SAFE_BOTTOM - 0.55, w: 3.0, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });
  });

  // ── SLIDE 16: Exit Ticket (Stage 5) ─────────────────────────────────────
  exitTicketSlide(pres, [
    "Find the HCF of 16 and 24. Show your working.",
    "Find the LCM of 6 and 9. Show your working.",
    "Hot dogs come in packs of 8. Buns come in packs of 6. What is the smallest number of each you need to buy so you have the same number of hot dogs and buns?",
  ], NOTES_EXIT, FOOTER);

  // ── SLIDE 17: Resources ─────────────────────────────────────────────────
  addResourceSlide(pres, [
    {
      name: "SR1 \u2014 LCM & HCF Practice Worksheet",
      fileName: "SR1_LCM_HCF_Worksheet.pdf",
      description: "Independent practice \u2014 6 number pairs + word problem.",
    },
    {
      name: "SR2 \u2014 LCM & HCF Answer Key",
      fileName: "SR2_LCM_HCF_Answers.pdf",
      description: "Answer key for SR1. Teacher reference.",
    },
    {
      name: "EXT1 \u2014 Prime Factorisation for LCM & HCF",
      fileName: "EXT1_Prime_Factorisation_LCM_HCF.pdf",
      description: "Extending: Venn diagram method using prime factors. Self-contained.",
    },
  ], { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // ── SLIDE 18: Closing ───────────────────────────────────────────────────
  closingSlide(pres,
    "Turn to your partner: When would you use HCF? When would you use LCM? Give a real-world example for each. 30 seconds.",
    [
      "SC1: I can find the HCF of two numbers by listing and comparing their factors.",
      "SC2: I can find the LCM of two numbers by listing and comparing their multiples.",
      "SC3: I can apply LCM or HCF to solve a real-world problem.",
      "Tomorrow: Bringing it all together \u2014 factors, multiples, primes, LCM, and HCF.",
    ],
    NOTES_CLOSING);

  // ── Write PPTX ──────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: OUT_DIR + "/FM_Lesson4_LCM_HCF.pptx" });
  console.log("PPTX written to " + OUT_DIR);

  // ── Generate companion PDFs ────────────────────────────────────────────
  await generateWorksheet();
  await generateAnswerKey();
  await generateExtendingPdf();
  console.log("All PDFs generated.");
}

// ── PDF: SR1 \u2014 LCM & HCF Practice Worksheet ──────────────────────────────────

async function generateWorksheet() {
  const doc = createPdf({ title: "LCM & HCF Practice Worksheet" });

  let y = addPdfHeader(doc, "LCM & HCF Practice", {
    subtitle: "SR1 \u2014 Supporting Resource",
    color: C.PRIMARY,
    lessonInfo: "Session 4 of 5 | Factors & Multiples | Year 5/6 Maths",
  });

  y = addTipBox(doc, "HCF: List factors of each number \u2192 find common \u2192 pick the HIGHEST.\nLCM: List multiples of each number \u2192 find the FIRST number in both lists.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Section A: Find the HCF and LCM", y, { color: C.PRIMARY });

  const pairs = [
    { a: 8, b: 12 },
    { a: 10, b: 15 },
    { a: 14, b: 21 },
    { a: 9, b: 12 },
    { a: 16, b: 24 },
    { a: 18, b: 30 },
  ];
  pairs.forEach((p, i) => {
    y = addProblem(doc, i + 1, `Find the HCF and LCM of ${p.a} and ${p.b}.`, y, {
      writeLines: [
        { label: `Factors of ${p.a}:` },
        { label: `Factors of ${p.b}:` },
        { label: "Common factors:" },
        { label: "HCF:" },
        { label: `Multiples of ${p.a}:` },
        { label: `Multiples of ${p.b}:` },
        { label: "LCM:" },
      ],
      color: C.PRIMARY,
    });
  });

  y = addSectionHeading(doc, "Section B: Word Problem (SC3)", y, { color: C.ACCENT });
  y = addBodyText(doc, "Hot dogs come in packs of 8. Buns come in packs of 6. What is the smallest number of each you need to buy so that you have the SAME number of hot dogs and buns? Show your working.", y);
  y = addLinedArea(doc, y + 5, 6);

  addPdfFooter(doc, "Session 4 of 5 | Factors & Multiples | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR1_LCM_HCF_Worksheet.pdf");
  console.log("  SR1 worksheet written.");
}

// ── PDF: SR2 \u2014 Answer Key ────────────────────────────────────────────────────

async function generateAnswerKey() {
  const doc = createPdf({ title: "LCM & HCF Answer Key" });

  let y = addPdfHeader(doc, "LCM & HCF \u2014 Answer Key", {
    subtitle: "SR2 \u2014 Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: "Session 4 of 5 | Factors & Multiples | Year 5/6 Maths",
    showNameDate: false,
  });

  y = addSectionHeading(doc, "Section A: Answers", y, { color: C.PRIMARY });

  const answers = [
    { a: 8, b: 12, fA: "1, 2, 4, 8", fB: "1, 2, 3, 4, 6, 12", common: "1, 2, 4", hcf: "4", mA: "8, 16, 24", mB: "12, 24", lcm: "24" },
    { a: 10, b: 15, fA: "1, 2, 5, 10", fB: "1, 3, 5, 15", common: "1, 5", hcf: "5", mA: "10, 20, 30", mB: "15, 30", lcm: "30" },
    { a: 14, b: 21, fA: "1, 2, 7, 14", fB: "1, 3, 7, 21", common: "1, 7", hcf: "7", mA: "14, 28, 42", mB: "21, 42", lcm: "42" },
    { a: 9, b: 12, fA: "1, 3, 9", fB: "1, 2, 3, 4, 6, 12", common: "1, 3", hcf: "3", mA: "9, 18, 27, 36", mB: "12, 24, 36", lcm: "36" },
    { a: 16, b: 24, fA: "1, 2, 4, 8, 16", fB: "1, 2, 3, 4, 6, 8, 12, 24", common: "1, 2, 4, 8", hcf: "8", mA: "16, 32, 48", mB: "24, 48", lcm: "48" },
    { a: 18, b: 30, fA: "1, 2, 3, 6, 9, 18", fB: "1, 2, 3, 5, 6, 10, 15, 30", common: "1, 2, 3, 6", hcf: "6", mA: "18, 36, 54, 72, 90", mB: "30, 60, 90", lcm: "90" },
  ];

  answers.forEach((a, i) => {
    y = addProblem(doc, i + 1, `${a.a} and ${a.b}:`, y, {
      writeLines: [
        { label: `Factors of ${a.a}:`, answer: a.fA },
        { label: `Factors of ${a.b}:`, answer: a.fB },
        { label: "Common factors:", answer: a.common },
        { label: "HCF:", answer: a.hcf },
        { label: `Multiples of ${a.a}:`, answer: a.mA },
        { label: `Multiples of ${a.b}:`, answer: a.mB },
        { label: "LCM:", answer: a.lcm },
      ],
      color: C.PRIMARY,
    });
  });

  y = addSectionHeading(doc, "Section B: Word Problem Answer", y, { color: C.ACCENT });
  y = addBodyText(doc, "LCM(8, 6) = 24. You need 24 of each. Hot dogs: 24 \u00f7 8 = 3 packs. Buns: 24 \u00f7 6 = 4 packs. Buy 3 packs of hot dogs and 4 packs of buns to have 24 of each.", y);

  addPdfFooter(doc, "Session 4 of 5 | Factors & Multiples | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR2_LCM_HCF_Answers.pdf");
  console.log("  SR2 answer key written.");
}

// ── PDF: EXT1 \u2014 Prime Factorisation for LCM & HCF ─────────────────────────

async function generateExtendingPdf() {
  const doc = createPdf({ title: "Prime Factorisation for LCM & HCF" });

  let y = addPdfHeader(doc, "Using Prime Factorisation for LCM & HCF", {
    subtitle: "EXT1 \u2014 Extending Investigation",
    color: C.ACCENT,
    lessonInfo: "Session 4 of 5 | Factors & Multiples | Year 5/6 Maths",
  });

  y = addTipBox(doc, "You know how to find LCM and HCF by listing. This resource teaches you a FASTER method using prime factorisation \u2014 especially useful for larger numbers where listing takes too long.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Step 1: Prime Factorisation", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Every number can be written as a product of prime numbers. This is called its prime factorisation.\n\nExample: 24 = 2 \u00d7 2 \u00d7 2 \u00d7 3 = 2\u00b3 \u00d7 3\nExample: 36 = 2 \u00d7 2 \u00d7 3 \u00d7 3 = 2\u00b2 \u00d7 3\u00b2\n\nUse a factor tree to find the prime factorisation:\n\u2022 Start with your number at the top.\n\u2022 Split it into any two factors (e.g., 24 = 4 \u00d7 6).\n\u2022 Keep splitting until every branch ends in a prime.\n\u2022 Collect all the primes at the bottom of the tree.", y);

  y = addSectionHeading(doc, "Step 2: The Venn Diagram Method", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Draw a Venn diagram with two overlapping circles. Write the prime factors of each number:\n\u2022 SHARED primes go in the OVERLAP (use as many as appear in BOTH).\n\u2022 Remaining primes go in the outer parts.\n\nExample: HCF and LCM of 24 and 36\n\u2022 24 = 2 \u00d7 2 \u00d7 2 \u00d7 3\n\u2022 36 = 2 \u00d7 2 \u00d7 3 \u00d7 3\n\n         [24 only]  [shared]   [36 only]\n            2       2, 2, 3       3\n\nShared primes: 2, 2, 3 (both have at least two 2s and one 3).\nLeft only: one extra 2 (24 has three 2s, only two are shared).\nRight only: one extra 3 (36 has two 3s, only one is shared).", y);

  y = addSectionHeading(doc, "Step 3: Read Off the Answers", y, { color: C.PRIMARY });
  y = addBodyText(doc, "HCF = multiply the OVERLAP numbers: 2 \u00d7 2 \u00d7 3 = 12\nLCM = multiply ALL numbers in the diagram: 2 \u00d7 2 \u00d7 2 \u00d7 3 \u00d7 3 = 72\n\nWait \u2014 let's check: LCM should be the smallest common multiple.\n\u2022 Is 72 a multiple of 24? 24 \u00d7 3 = 72 \u2713\n\u2022 Is 72 a multiple of 36? 36 \u00d7 2 = 72 \u2713\n\u2022 Is there anything smaller? 36 is a multiple of 36 but NOT of 24. 48 is a multiple of 24 but NOT of 36. So 72 is indeed the LCM.", y);

  y = addSectionHeading(doc, "Why It Works", y, { color: C.ACCENT });
  y = addBodyText(doc, "The HCF must divide both numbers, so it can only use primes that both numbers share. The LCM must be divisible by both numbers, so it needs ALL the primes from both \u2014 but shared primes only need to be counted once.\n\nBonus: HCF \u00d7 LCM = 12 \u00d7 72 = 864. And 24 \u00d7 36 = 864. This always works!", y);

  y = addSectionHeading(doc, "Your Turn", y, { color: C.ACCENT });
  y = addBodyText(doc, "Use the Venn diagram method to find the HCF and LCM of each pair.", y);

  const problems = [
    { a: 18, b: 24, hint: "18 = 2 \u00d7 3 \u00d7 3, 24 = 2 \u00d7 2 \u00d7 2 \u00d7 3" },
    { a: 30, b: 45, hint: "30 = 2 \u00d7 3 \u00d7 5, 45 = 3 \u00d7 3 \u00d7 5" },
    { a: 48, b: 60, hint: "Find the prime factorisations yourself!" },
    { a: 56, b: 84, hint: "Find the prime factorisations yourself!" },
  ];
  problems.forEach((p, i) => {
    y = addProblem(doc, i + 1, `Find the HCF and LCM of ${p.a} and ${p.b}. (${p.hint})`, y, {
      writeLines: [
        { label: `Prime factorisation of ${p.a}:` },
        { label: `Prime factorisation of ${p.b}:` },
        { label: "Venn: left only | shared | right only:" },
        { label: "HCF (overlap only):" },
        { label: "LCM (all primes):" },
        { label: `Check: HCF \u00d7 LCM = ${p.a} \u00d7 ${p.b}?` },
      ],
      color: C.ACCENT,
    });
  });

  y = addSectionHeading(doc, "Challenge: Three Numbers!", y, { color: C.ALERT });
  y = addBodyText(doc, "Can you extend the method to THREE numbers? Find the HCF and LCM of 12, 18, and 24.\nHint: Use a three-circle Venn diagram. Primes shared by all three go in the centre.", y);
  y = addLinedArea(doc, y + 5, 8);

  addPdfFooter(doc, "Session 4 of 5 | Factors & Multiples | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/EXT1_Prime_Factorisation_LCM_HCF.pdf");
  console.log("  EXT1 extending investigation written.");
}

build().catch(console.error);
