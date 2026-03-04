// Lesson 2 of 3: Lowest Common Multiples & Highest Common Factors
// Year 5/6 Numeracy — Number Properties 2
// VC2M5N10 (identifying LCM and HCF of pairs of natural numbers)
// Week 2, Session 2

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
const T = createTheme("numeracy", "grade56", 1);
const {
  C, FONT_H, FONT_B,
  titleSlide, liSlide, contentSlide, cfuSlide, closingSlide,
  workedExSlide, exitTicketSlide, addStageBadge,
  withReveal,
  addTopBar, addBadge, addTitle, addCard, addFooter, addTextOnShape,
  iconToBase64Png, getContrastColor,
  SAFE_BOTTOM, CONTENT_TOP, STAGE_COLORS,
} = T;

const OUT_DIR = "output/NP2_Lesson2_LCM_HCF";
const FOOTER = "Session 2 of 3 | LCM & HCF | Year 5/6 Maths";

// ── Teacher notes ─────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
• "Welcome back to our Number Properties unit. Last session we explored factors and multiples. Today we take that knowledge further — we're learning to find the Lowest Common Multiple and Highest Common Factor of pairs of numbers."
• "By the end of the session, you'll be able to find the LCM and HCF of any pair of numbers and use them to solve real-world problems."

**DO:**
• Display the title slide as students settle. Ensure mini-whiteboards and markers are on every desk.
• Direct attention to the unit title — "This is Session 2 of 3."

**TEACHER NOTES:**
Lesson 2 of a 3-session unit covering VC2M5N10 (identifying LCM and HCF of pairs of natural numbers). Today builds directly on Lesson 1's factor and multiple listing skills. Students must be fluent at listing multiples and factors before they can identify common ones and select the lowest/highest. The LCM and HCF concepts are dual — LCM works with multiples (products going up), HCF works with factors (divisors going down). Teaching them side by side helps students see the symmetry and reduces confusion. The Daily Review and Fluency phases target the prerequisite skip-counting and multiplication fluency.

**WATCH FOR:**
• Students who seem unfamiliar with the terms "multiple" or "factor" from the previous lesson — note for closer monitoring during I Do.
• Readiness signal: students settling quickly with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR1 = `**SAY:**
• "Let's warm up with some multiplication strategies. These will help you work efficiently today."
• "Look at Question 1: 253 times 4. Instead of using a written algorithm, we can use doubling. Watch…"
• "2 times 253 is 506. Then 2 times 506 is 1012. Doubling twice is the same as multiplying by 4."
• "Question 2: 15 times 16. This looks tricky, but we can rearrange the factors. 15 is 3 times 5, and 16 is 2 times 8. I can rearrange: 5 times 2 gives 10, and 3 times 8 gives 24. So 10 times 24 is 240."

**DO:**
• Display the slide. Walk through Q1 step by step, writing the doubling on the board alongside.
• For Q2, point to the factor cards on the right side of the slide showing the rearrangement.
• Allow students to verify on whiteboards.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Try this on your board: What is 125 times 8 using doubling? You have 15 seconds. Ready… show me!"
• Scan for: correct answer (1000) on ≥80% of boards.
PROCEED: If ≥80% correct, move to DR Slide 2.
PIVOT: If widespread errors, model the doubling chain: 125 → 250 → 500 → 1000. Emphasise: "Doubling three times IS multiplying by 8 because 2 × 2 × 2 = 8."

**TEACHER NOTES:**
Daily Review targets prerequisite multiplication fluency from prior learning. The doubling strategy for Q1 builds mental computation efficiency — doubling is cognitively easier than the standard algorithm for ×4. The factor rearrangement for Q2 leverages the commutative and associative properties of multiplication to create friendlier sub-problems. Both strategies reduce cognitive load during the main lesson, where students will need to generate multiples and factors quickly. These strategies also reinforce the concept that numbers can be decomposed into factors — directly relevant to today's HCF work.

**WATCH FOR:**
• Students who attempt long multiplication instead of doubling — redirect: "Can you find a quicker path? What if you doubled?"
• Students confused by factor rearrangement — they may not see that 15 × 16 = (3 × 5) × (2 × 8) = (5 × 2) × (3 × 8). Use arrows or colour coding on the board.
• Readiness signal: fast, confident responses using the efficient strategy.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_DR2 = `**SAY:**
• "Now let's use place value partitioning for larger multiplication."
• "Question 3: 324 times 8. I'll use an area model. I partition 324 into 300, 20, and 4."
• "300 times 8 is 2400. 20 times 8 is 160. 4 times 8 is 32. Add them: 2400 plus 160 plus 32 equals 2592."
• "Question 4: 467 times 5. Your turn — partition 467 and multiply each part by 5. Show me on your boards."

**DO:**
• Display the slide. Point to the area model array on the right showing the three boxes: 300×8, 20×8, 4×8.
• For Q4, give students 20 seconds to work it out on whiteboards using the same partitioning method.
• Cold Call one student: "How did you partition 467?"

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
• "[Student name], what did you get for 467 times 5? Talk me through your partitioning."
• Expected: 400×5 = 2000, 60×5 = 300, 7×5 = 35, total = 2335.
PROCEED: If the Cold Called student explains correctly, move to Fluency.
PIVOT: If the student struggles with partitioning, model it: "I break 467 into 400 + 60 + 7. Each part gets multiplied by 5 separately, then I add them all up."

**TEACHER NOTES:**
The area model (or grid method) is a visual representation of the distributive property. It makes the partial products explicit and helps students see WHY place value partitioning works. This visual scaffold is critical for students who struggle with the standard algorithm — it provides a conceptual bridge. The area model also connects to later work in measurement and algebra (area of rectangles). Note: if your cohort is already fluent with the standard algorithm, you can use DR to revisit a different prerequisite instead.

**WATCH FOR:**
• Students who partition incorrectly (e.g., 467 → 400 + 67 instead of 400 + 60 + 7) — the area model won't give wrong answers with a two-part partition, but three parts gives more practice with addition.
• Students who forget to add the partial products — they write 2000, 300, 35 but don't sum them.
• Readiness signal: students completing Q4 independently within 20 seconds.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
• "Fluency time! We're going to practise skip counting — this is the engine that powers our LCM work today."
• "Everyone together — count by 6s starting from 6. Ready? 6, 12, 18…" [Continue to 72]
• "Now count by 8s from 8. Ready? 8, 16, 24…" [Continue to 96]
• "Quick fire — what is the 7th multiple of 9?" [63] "The 5th multiple of 12?" [60] "The 4th multiple of 7?" [28]

**DO:**
• Display the slide. Lead choral counting by 6s, maintaining a brisk pace.
• Switch to counting by 8s. Use hand signals to keep the rhythm.
• For the quick-fire questions, allow 5 seconds thinking time, then Cold Call.

**TEACHER NOTES:**
Skip counting is the foundational skill for listing multiples — which is exactly what students will do during the LCM worked examples. Counting by 6s and 8s directly primes the We Do problem (LCM of 8 and 12). The quick-fire questions shift from sequential counting to direct recall of specific multiples, which builds the flexibility students need to efficiently list multiples of any number. If your cohort finds 6s and 8s easy, substitute 7s and 9s. The choral response technique ensures full participation and builds confidence before the main lesson.

**WATCH FOR:**
• Students who fall silent after the first few multiples — they may be losing the pattern. Watch their lips; encourage: "Keep going, even if you're a beat behind."
• Students who confuse skip counting with counting on by 1s — redirect: "We're jumping by 6 each time, not counting up one by one."
• Readiness signal: most students maintaining the choral count to at least the 8th multiple.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
• Read from slide: "We are learning to find the lowest common multiple and highest common factor of pairs of numbers so we can simplify calculations and solve problems."
• "Let's look at our three success criteria. By the end of the lesson, you should be able to do all three."
• Read each SC aloud. "SC1 is the foundation — listing multiples and spotting common ones. SC2 is our main target — finding LCM and HCF. SC3 is for those ready to apply this to real-world problems."

**DO:**
• Display the slide. Point to the LI as you read it.
• Point to each SC in turn. Pause after SC2: "This is the big one today — LCM and HCF."
• Leave this slide visible for 30 seconds so students can read and internalise.

**TEACHER NOTES:**
The LI translates VC2M5N10 ("identifying LCM and HCF of pairs of natural numbers") into student-friendly language. SC1 targets the prerequisite (listing multiples and identifying common multiples), SC2 is the core lesson goal (finding LCM and HCF), and SC3 extends to application (using LCM/HCF in context). The SC are ordered progressively: SC1 → SC2 → SC3. The exit ticket assesses SC1 and SC2 directly, with SC3 as a stretch question. Enabling prompts target SC1 prerequisites; extending prompts target SC3 and beyond.

**WATCH FOR:**
• Students who look confused by "LCM" or "HCF" — this is expected. The vocabulary slide (next) addresses these terms explicitly.
• Readiness signal: students nodding or whispering the SC to themselves.

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_VOCAB = `**SAY:**
• "Before we dive in, let's lock in four key terms we'll use all lesson."
• Point to COMMON MULTIPLE: "A common multiple is a number that appears in the times tables of BOTH numbers. 12 is a common multiple of 3 and 4 because 3 × 4 = 12 and 4 × 3 = 12."
• Point to LCM: "The Lowest Common Multiple is the SMALLEST common multiple. Of all the numbers that appear in both lists, the LCM is the first one."
• Point to COMMON FACTOR: "A common factor is a number that divides evenly into BOTH numbers. 3 is a common factor of 12 and 18 because 12 ÷ 3 = 4 and 18 ÷ 3 = 6."
• Point to HCF: "The Highest Common Factor is the BIGGEST common factor. Of all the numbers that go into both, the HCF is the largest."

**DO:**
• Display the slide. Point to each term and its visual example as you explain it.
• After explaining all four: "Turn to your partner. Say one sentence using the word LCM and one sentence using the word HCF." Allow 20 seconds.

**TEACHER NOTES:**
This vocabulary front-loading reduces cognitive load during the worked examples — students won't be processing new terminology AND new procedures simultaneously. The visual representations (overlapping lists for common multiples, Venn diagram hint for common factors) build schema connections. The Turn & Talk activates student processing and surfaces any confusion before instruction begins. These terms are foundational — LCM appears in fraction addition (common denominators) and HCF appears in simplifying fractions. Ensure students understand the direction: LCM is the SMALLEST (looking for the minimum), HCF is the BIGGEST (looking for the maximum). This naming seems counterintuitive and is a common source of confusion.

**MISCONCEPTIONS:**
• Misconception: "LCM means the biggest number and HCF means the smallest number."
  Why: Students associate "highest" with big and "lowest" with small, then apply this to the wrong concept. They confuse which one deals with multiples (bigger numbers) and which with factors (smaller numbers).
  Impact: Students who swap LCM and HCF will give the wrong answer to every problem — they'll find the HCF when asked for LCM and vice versa.
  Quick correction: "LCM = Lowest Common MULTIPLE. Multiples go UP (6, 12, 18, 24…), and we want the LOWEST one they share. HCF = Highest Common FACTOR. Factors go DOWN (12, 6, 4, 3, 2, 1), and we want the HIGHEST one they share."

**WATCH FOR:**
• Students who mix up "common multiple" and "common factor" — they may have shaky understanding of "factor" vs "multiple" from the prior lesson. Quick check: "Is 12 a factor of 3 or a multiple of 3?" [Multiple]
• Students who nod at LCM but look blank at HCF — the factor concept is often less intuitive than multiples.
• Readiness signal: partners using LCM and HCF correctly in their sentences.

[Maths: Launch — Explicit Instruction | VTLM 2.0: Explicit Explanation]`;

const NOTES_WE1 = `**SAY:**
• "Watch me find the LCM of 6 and 9. I'm going to list the multiples of each number until I spot one that appears in BOTH lists."
• Think-aloud: "Multiples of 6: 6, 12, 18, 24, 30, 36… I'll list about six to start."
• "Multiples of 9: 9, 18, 27, 36, 45… Now I scan both lists. Which numbers appear in BOTH?"
• "18 appears in both! And 36 appears in both. These are common multiples."
• "The LCM is the SMALLEST common multiple. That's 18."
• Self-monitoring: "Let me verify: Is 18 a multiple of 6? 6 × 3 = 18, yes. Is 18 a multiple of 9? 9 × 2 = 18, yes. And is there anything smaller than 18 in both lists? No. So LCM(6, 9) = 18."

**DO:**
• Display the slide. Write the multiples lists side by side, highlighting common multiples in a different colour.
• Circle 18 as the LCM — the first number that appears in both lists.
• Pause after each step to let students process.

**TEACHER NOTES:**
This is the core I Do worked example for LCM. The method is conceptually simple: list multiples, find overlaps, pick the smallest. The key teaching moves are: (1) listing enough multiples to find at least one overlap, (2) scanning both lists systematically, and (3) verifying the answer. The verification step models metacognition — students should always check that their LCM is genuinely a multiple of both numbers. The colour-coded lists make common multiples visually obvious. Note: for larger numbers, students may need to list more multiples before finding an overlap. The method always works but can be slow — in later lessons, the prime factorisation method provides an efficient alternative.

**MISCONCEPTIONS:**
• Misconception: "The LCM of two numbers is always their product."
  Why: For some pairs (e.g., 3 and 5), the LCM IS the product (15). Students overgeneralise this pattern.
  Impact: Students will give 54 as the LCM of 6 and 9, when the correct answer is 18.
  Quick correction: "The LCM equals the product ONLY when the two numbers share no common factors. 6 and 9 both have 3 as a factor, so the LCM is smaller than 6 × 9. Always list and check."

**WATCH FOR:**
• Students who stop listing after just 2–3 multiples and miss the overlap — remind: "Keep listing until you find a match."
• Students who identify 36 instead of 18 as the LCM — they found a common multiple but not the LOWEST. Redirect: "Is there a smaller number that's in both lists?"
• Readiness signal: students watching attentively, some nodding when 18 is circled.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_WE2 = `**SAY:**
• "Now let's find the HCF of 12 and 18. This time, instead of listing multiples going UP, I list factors going DOWN — all the numbers that divide evenly into each number."
• Think-aloud: "Factors of 12: I start from 1. 1, 2, 3, 4, 6, 12. Those are all the numbers that go into 12."
• "Factors of 18: 1, 2, 3, 6, 9, 18."
• "Now I look for numbers that appear in BOTH lists. 1 is in both. 2 is in both. 3 is in both. 6 is in both. These are the common factors: 1, 2, 3, 6."
• "The HCF is the HIGHEST — the biggest one. HCF(12, 18) = 6."
• Self-monitoring: "Let me verify: Does 6 divide into 12? 12 ÷ 6 = 2, yes. Does 6 divide into 18? 18 ÷ 6 = 3, yes. Is there anything bigger than 6 that goes into both? 9 goes into 18 but not 12. 12 goes into 12 but not 18. So 6 is correct."

**DO:**
• Display the slide. Show the Venn diagram with factors sorted into "only 12," "both," and "only 18."
• Point to the "both" section: "These are our common factors. The biggest one is the HCF."
• Circle 6 as the HCF.

**TEACHER NOTES:**
This is the I Do worked example for HCF. The Venn diagram is a powerful visual because it physically separates factors into three groups: unique to the first number, shared (common factors), and unique to the second number. The HCF is simply the largest number in the middle section. This visual scaffold helps students understand what "common" means — it's the overlap, the intersection. The verification step is especially important for HCF because students often select a common factor that isn't the highest. By systematically checking whether any larger number divides both, students confirm their answer. Note: 12 and 18 are deliberately chosen because they share multiple common factors (1, 2, 3, 6), so students can see that there are several common factors and must select the highest.

**MISCONCEPTIONS:**
• Misconception: "The HCF is always 1."
  Why: Students know 1 is always a common factor and assume that's the answer.
  Impact: They never look for larger common factors, giving HCF = 1 for every pair.
  Quick correction: "1 is always a common factor, but is it the HIGHEST? Keep looking. Are there bigger numbers that go into BOTH? 2 goes into both, 3 goes into both, 6 goes into both. The HIGHEST is 6."

**WATCH FOR:**
• Students who confuse HCF with LCM and try to list multiples instead of factors — redirect: "HCF uses FACTORS. Factors are numbers that go INTO the number. List the divisors."
• Students who miss factors (e.g., forget that 6 is a factor of 12) — this is a fluency gap from the prior lesson. Encourage the systematic method: "Divide by 1, 2, 3, 4… just like we did for factor pairs."
• Readiness signal: students nodding when 6 is identified as the HCF.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
• "Quick check. I need to see if you can find an LCM."
• "On your whiteboard, find the LCM of 4 and 6. List the multiples of each until you find the first one they share. You have 20 seconds."
• After boards up: "The answer is 12. Multiples of 4: 4, 8, 12. Multiples of 6: 6, 12. The first number in both lists is 12."
• Think-Pair-Share: "Turn to your partner and explain: why is the LCM NOT 24?" Allow 15 seconds. Cold Call one pair.

**DO:**
• Display the question slide. Give students 20 seconds to list multiples and find the LCM.
• Say "Show me!" — scan boards quickly for 12.
• After scanning, run the Think-Pair-Share to deepen understanding.

**CFU CHECKPOINT:**
Technique: Show Me Boards + Think-Pair-Share
Script:
• "Write the LCM of 4 and 6 on your board. List multiples to find it. 20 seconds. Ready… show me!"
• Scan for: 12 on ≥80% of boards.
PROCEED: If ≥80% show 12 — students can find LCM by listing. Move to We Do Problem Pair 1.
PIVOT: Most likely error: students writing 24 (the product). Reteach: "You wrote 24 — that IS a common multiple, but is it the LOWEST? List the multiples: 4, 8, 12, 16, 20, 24… and 6, 12, 18, 24… Both lists contain 12 AND 24. But 12 comes first. The LOWEST common multiple is 12." Re-check: "What is the LCM of 3 and 5? Show me boards." [15 — here the LCM IS the product because 3 and 5 share no common factors]

**TEACHER NOTES:**
This CFU checks SC1 (listing multiples and identifying common multiples) and the beginning of SC2 (finding LCM). It is deliberately simpler than the I Do example (4 and 6 are small numbers with a small LCM). The Think-Pair-Share deepens understanding by asking students to articulate why 24 is not the LCM — this targets the "LCM = product" misconception directly. The combination of Show Me Boards (individual check) and Think-Pair-Share (verbal reasoning) uses two different CFU techniques to assess both procedural and conceptual understanding.

**WATCH FOR:**
• Students writing 2 instead of 12 — they may have found the HCF instead of the LCM. Redirect: "LCM uses MULTIPLES, not factors. Multiples of 4 go UP: 4, 8, 12…"
• Students who list multiples correctly but circle the wrong one — they may not understand "lowest."
• Readiness signal: fast responses of 12 with confident board holds.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
• "Your turn to help me. We're going to find the LCM of 8 and 12 — together."
• Cold Call: "[Student name], give me the first five multiples of 8." [8, 16, 24, 32, 40]
• Cold Call: "[Student name], give me the first five multiples of 12." [12, 24, 36, 48, 60]
• "Now scan both lists. Which number appears in BOTH?" [24]
• Choral Response: "So the LCM of 8 and 12 is…?" [24!]
• "Let me verify: Is 24 a multiple of 8? 8 × 3 = 24, yes. Is 24 a multiple of 12? 12 × 2 = 24, yes. Is there anything smaller? 8 and 16 aren't multiples of 12. 12 isn't a multiple of 8. So 24 is correct."

**DO:**
• Display the question slide with the multiples lists partially filled.
• Use Cold Call for listing multiples — different students for each number.
• Click to reveal the completed answer on the next slide.
• Point to 24 highlighted in both lists.

**CFU CHECKPOINT:**
Technique: Cold Call + Choral Response
Script:
• Cold call different students for each list of multiples.
• Choral response for the final answer: "Everyone together — the LCM of 8 and 12 is…?"
• Scan for: confident choral response of "24."
PROCEED: If students answer correctly and confidently, move to We Do Problem Pair 2.
PIVOT: If students give wrong multiples (e.g., listing 8, 12, 16, 20 for multiples of 8 — mixing in multiples of other numbers), reteach: "Multiples of 8 means 8 times 1, 8 times 2, 8 times 3… We're only counting by 8s." Re-do the listing slowly.

**TEACHER NOTES:**
This is We Do Problem Pair 1 — structurally identical to the I Do LCM worked example (find LCM by listing multiples) with different surface features (8 and 12 instead of 6 and 9). The shift from I Do to We Do is evident: students supply the multiples via Cold Call rather than the teacher listing them. The verification step is retained to reinforce the metacognitive habit. 8 and 12 are chosen because their LCM (24) is neither too small (which would make it trivial) nor too large (which would require extensive listing). Students who were fluent with skip counting in the Fluency phase should be able to list these multiples quickly.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide students with both multiples lists pre-written: Multiples of 8: 8, 16, 24, 32, 40 / Multiples of 12: 12, 24, 36, 48, 60. Students circle the common multiples and identify the LCM. This removes the listing step and focuses on the identification step.
• Extra Notes: Students who struggle with listing multiples need additional skip-counting fluency work outside the lesson.

EXTENDING PROMPT:
• Task: "Find the LCM of 15 and 20. Then find the LCM of 12 and 18. What do you notice about numbers that share common factors?"
• Extra Notes: This extends to recognising that when numbers share common factors, the LCM is less than the product.

**WATCH FOR:**
• Students who say "48" (the product) instead of 24 — this is the persistent "LCM = product" misconception. Redirect: "48 IS a common multiple, but is it the LOWEST? Check — is there something smaller in both lists?"
• Students who list multiples incorrectly (e.g., 8, 16, 22 instead of 24) — this is a skip-counting error. Have them self-correct: "What's 8 times 3?"
• Readiness signal: students calling out "24" before being asked.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
• "One more together, then you're on your own. This time we're finding the HCF of 24 and 36."
• "On your whiteboards, list all the factors of 24 and all the factors of 36. Then circle the ones that appear in both lists. You have 90 seconds."
• After 90 seconds: "Boards up. Let's check."
• "Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36."
• "Common factors: 1, 2, 3, 4, 6, 12. The HIGHEST common factor is 12."
• "So HCF(24, 36) = 12."

**DO:**
• Display the question slide. Students work on whiteboards for 90 seconds.
• Circulate quickly — check that students are listing factors systematically (from 1 upward).
• After time: students hold up boards. Click to reveal the answer.
• Compare answers publicly. Celebrate correct responses.

**CFU CHECKPOINT:**
Technique: Show Me Boards (open response)
Script:
• "List the factors of 24 and 36 on your board. Circle the common factors. Write the HCF. 90 seconds. Go!"
• Scan for: correct common factors listed with HCF = 12 on ≥80% of boards.
PROCEED: If ≥80% have HCF = 12 correct — students are ready for independent practice. Move to the Hinge Question as a final gate check.
PIVOT: Most likely error: students giving HCF = 6 (a common factor, but not the highest). Reteach: "6 IS a common factor — well done for finding it. But is there anything BIGGER that goes into both? 12 ÷ 12 = 1 and 24 ÷ 12 = 2… wait, does 12 go into both 24 AND 36? 24 ÷ 12 = 2, yes. 36 ÷ 12 = 3, yes. So 12 is a common factor too, and it's bigger than 6."

**TEACHER NOTES:**
We Do Problem Pair 2 with increased student autonomy. The teacher steps back — students work on boards rather than contributing verbally one step at a time. This mirrors the FM lesson pattern: PP1 was heavily guided (Cold Call per step), PP2 gives students 90 seconds to attempt the full process independently before checking. 24 and 36 are deliberately chosen because they share many common factors (1, 2, 3, 4, 6, 12), testing whether students can identify ALL common factors and then select the highest. The HCF of 12 is relatively large, which helps counteract the misconception that HCF is always a small number.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide students with the factors of 24 and 36 pre-listed. Students sort them into a Venn diagram (provided as a template) and identify the common factors. Then they select the HCF from the "both" section. This removes the factor-listing step and focuses on the identification step.
• Extra Notes: Students who struggle with factor listing need to revisit the systematic factor-finding method from Lesson 1.

EXTENDING PROMPT:
• Task: "Find the HCF of 48 and 72. Then find the HCF of 60 and 90. Can you find a pair of numbers whose HCF is 1? What are these numbers called?"
• Extra Notes: Numbers whose HCF is 1 are called coprime (or relatively prime). This extends vocabulary and connects to prime numbers.

**WATCH FOR:**
• Students who list multiples instead of factors — they're confusing the LCM and HCF procedures. Redirect: "For HCF, we need FACTORS — numbers that DIVIDE INTO 24 and 36. Not multiples."
• Students who miss 12 as a factor of 36 — they may have stopped listing too early. Prompt: "Keep going — is there anything between 9 and 18 that divides into 36?"
• Readiness signal: students finishing in under 60 seconds with HCF = 12.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
• "One last check before you work independently. I need to know if you can apply what we've learned."
• "Look at the four options. The LCM of 4 and 10 is… Hold up 1, 2, 3, or 4 fingers to show your answer. You have 15 seconds to decide."
• After finger vote: "The answer is B — 20."
• "Let me explain each option:"
• "A) 2 — that's actually the HCF of 4 and 10. If you chose A, you found the highest COMMON FACTOR instead of the lowest common MULTIPLE."
• "B) 20 — correct! Multiples of 4: 4, 8, 12, 16, 20. Multiples of 10: 10, 20. The first one in both lists is 20."
• "C) 40 — you multiplied 4 times 10. The product IS a common multiple, but it's not the LOWEST."
• "D) 10 — you chose the bigger number. But 10 is not a multiple of 4 (10 ÷ 4 = 2.5), so it can't be the LCM."

**DO:**
• Display the question slide with four options. Allow 15 seconds.
• "Show me fingers — 1, 2, 3, or 4." Scan the room quickly.
• Click to reveal the answer and misconception breakdown.
• Briefly explain each distractor and the misconception it reveals.

**CFU CHECKPOINT:**
Technique: Finger Voting (1–4)
Script:
• "Hold up the number of fingers matching your answer: 1 for A, 2 for B, 3 for C, 4 for D. Ready… show me!"
• Scan for: 2 fingers (option B) on ≥80% of hands.
PROCEED: If ≥80% choose B — students understand LCM. Release to You Do.
PIVOT:
  - If many choose A (2): Students are confusing LCM with HCF. Reteach: "LCM = multiples going UP. HCF = factors going DOWN. You found the factor, not the multiple."
  - If many choose C (40): The "LCM = product" misconception persists. Reteach: "40 IS a common multiple — but is it the LOWEST? List: 4, 8, 12, 16, 20… and 10, 20… What's the first shared number?" [20]
  - If many choose D (10): Students think LCM is always the larger number. Reteach: "Is 10 a multiple of 4? 10 ÷ 4 = 2.5. No! So 10 can't be the LCM. The LCM must be a multiple of BOTH numbers."

**TEACHER NOTES:**
This hinge question is diagnostic — each distractor maps to a specific misconception. A (2): confusing LCM with HCF. B (20): correct. C (40): LCM = product misconception. D (10): LCM is the larger number misconception. The finger-voting technique ensures rapid, whole-class response that the teacher can scan in seconds. This is the final gate before You Do — it must be passed before releasing students to independent work. If more than 20% of students choose the wrong answer, the specific distribution of wrong answers tells the teacher exactly what to reteach.

**MISCONCEPTIONS:**
• Misconception: "LCM and HCF are the same thing."
  Why: Both involve "common" and both involve two numbers. Students who don't distinguish multiples from factors will conflate the procedures.
  Impact: Students will randomly apply whichever method they remember, getting correct answers roughly half the time by chance.
  Quick correction: "LCM = Lowest Common MULTIPLE. List multiples (going UP), find the SMALLEST match. HCF = Highest Common FACTOR. List factors (going DOWN), find the BIGGEST match. They are OPPOSITE operations."

**WATCH FOR:**
• Students who hold up fingers uncertainly or change their answer mid-vote — they're guessing rather than computing. Ask them to do the listing on their whiteboard first.
• Students who choose A (HCF) — this is the most concerning error because it indicates a fundamental conceptual confusion between LCM and HCF.
• Readiness signal: fast, confident finger holds for option B.

[Maths: Monitor Progress — Hinge Question | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
• "You're ready. Time to find LCM and HCF on your own."
• Read from slide: "Find the LCM and HCF for each pair. Show your working — list the multiples for LCM and list the factors for HCF."
• "Use the worksheet I'm handing out. Start with Pair 1 and work through as many as you can in 8 minutes."
• "If you finish all three pairs, tackle the challenge problem."

**DO:**
• Distribute SR1 worksheet (LCM & HCF Practice).
• Set a visible timer for 8 minutes.
• Circulate — visit enabling students first, then extending students.
• Conference briefly with 2–3 students: "Talk me through how you found the LCM of this pair."

**TEACHER NOTES:**
You Do targets SC2 (find LCM and HCF of a pair of numbers). The worksheet provides structured recording space with listing tables for each pair. Pairs are sequenced by difficulty: Pair 1 (6 and 8) has a moderate LCM of 24 and HCF of 2; Pair 2 (10 and 15) has LCM = 30 and HCF = 5; Pair 3 (12 and 20) has LCM = 60 and HCF = 4. The challenge problem targets SC3 (real-world application) — it requires students to recognise that the hotdog buns problem is an LCM problem (LCM of 8 and 6 = 24). Circulate to the enabling group first — they need the earliest support.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Students work with Pair 1 only (6 and 8). Provide the SR1 worksheet with the multiples of 6 and 8 pre-listed up to 48. Students circle common multiples and identify the LCM. Then list factors of each and circle common factors to find the HCF. If they finish, attempt Pair 2.
• Extra Notes: Seat enabling students near the board where the worked examples are still visible.

EXTENDING PROMPT:
• Task: After completing all pairs and the challenge, students attempt the EXT1 — LCM & HCF of Triples Investigation (companion PDF). This extends the concept to three numbers. Students explore how to find LCM and HCF when three numbers are involved.
• Extra Notes: Distribute the EXT1 PDF to extending students when they finish the main worksheet. The PDF is self-contained.

**WATCH FOR:**
• Students who find LCM but forget HCF (or vice versa) — remind: "Each pair needs BOTH — the LCM and the HCF."
• Students who mix up the procedures (listing multiples for HCF, listing factors for LCM) — redirect: "LCM = multiples going UP. HCF = factors going DOWN."
• Students who struggle with the challenge problem — prompt: "What does 'no leftovers' mean mathematically? Sam needs a number of sausages that's a multiple of 6 AND a multiple of 8. What's the smallest such number?"
• Readiness signal: students completing 2+ pairs correctly in 8 minutes.

[Maths: Summarise — Independent Practice (You Do) | VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `**SAY:**
• "Pens down on the worksheet. Time for your exit ticket — three quick questions to show what you've learned."
• "Work silently and independently. No looking at your worksheet or your neighbour. This is just for me to see where you are."
• "You have 3 minutes."

**DO:**
• Display the exit ticket slide. Students write answers in their maths books or on the back of the worksheet.
• Set a timer for 3 minutes. Circulate silently — observe but don't help.
• Collect responses or note answers as students hold up books.

**TEACHER NOTES:**
The exit ticket assesses SC1 and SC2 directly. Q1 (LCM of 5 and 8) tests whether students can list multiples and find the first common one — answer is 40. Q2 (HCF of 18 and 24) tests factor listing and identification of the highest common factor — answer is 6. Q3 targets deeper understanding: "Why can't the HCF of 18 and 24 be 9?" — because 9 is not a factor of 24 (24 ÷ 9 = 2.67). This tests whether students understand that a common factor must divide BOTH numbers. Sort responses into three piles after class: (1) Q1 only correct — need enabling support on HCF, (2) Q1 + Q2 — on track, (3) all three — ready for extending. Use this data to inform tomorrow's lesson groupings.

**WATCH FOR:**
• Students who answer Q1 correctly but give HCF = 9 for Q2 — they may be selecting the largest factor of EITHER number rather than the largest COMMON factor. This is a conceptual gap: "common" means in BOTH.
• Students who answer Q2 but not Q3 — they can DO the method but can't EXPLAIN why. This is fine for Lesson 2; articulation develops with practice.
• Readiness signal: students finishing Q1 and Q2 within 2 minutes.

[Maths: Summarise — Exit Ticket (Stage 5) | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `**SAY:**
• "Before we wrap up — here are the printable resources for today's lesson. If you're a teacher using this deck, click any link to open the PDF."
• "SR1 is the practice worksheet. SR2 is the answer key. EXT1 is the LCM & HCF of Triples investigation for extending students."

**DO:**
• Display the slide briefly. Teachers can click hyperlinks to open PDFs.
• This slide is primarily for teacher preparation — students don't need to see it during the lesson.

**TEACHER NOTES:**
All PDFs are in the same folder as this PPTX file. Hyperlinks are relative — they work when the PPTX is opened from the lesson folder. Print SR1 before the lesson (one per student). Print EXT1 for extending students only (typically 3–5 copies). SR2 is for teacher reference — do not distribute to students during the lesson.

**WATCH FOR:**
• N/A — this is a teacher-facing slide.

[Maths: Planning — Preparation | VTLM 2.0: Planning]`;

const NOTES_CLOSING = `**SAY:**
• "Let's look back at our success criteria."
• Read from slide: "SC1: I can list the multiples of a number and identify common multiples."
• "Give me a thumbs up, sideways, or down for SC1." Pause and scan. "Most thumbs up — great."
• Read: "SC2: I can find the LCM and HCF of a pair of numbers."
• "Thumbs for SC2." Pause and scan. Note any thumbs-down.
• Read: "SC3: I can use LCM and HCF to solve real-world problems."
• "Thumbs for SC3." Pause. "Some sideways here — that's OK. The challenge question was tough."
• "Turn to your partner: What's the difference between LCM and HCF? Explain it in your own words. 30 seconds."
• "Tomorrow we extend this to three numbers and explore prime factorisation as a shortcut. Well done today."

**DO:**
• Display the closing slide with SC listed. Read each SC aloud.
• Run thumbs up/sideways/down for each SC in turn. Scan and mentally note students who are down on SC2.
• Allow 30 seconds for the Turn & Talk. Listen to 2–3 pairs.
• Close with a brief acknowledgement of effort.

**TEACHER NOTES:**
The closing slide reviews all three SC and uses self-assessment to give the teacher and students a snapshot of where they are. Students who self-assess as "thumbs down" on SC2 should be noted for tomorrow's enabling group. The Turn & Talk prompt deliberately asks students to articulate the difference between LCM and HCF — this is the key conceptual distinction of the lesson and the most common source of confusion. The preview of tomorrow's content (triples and prime factorisation) builds anticipation and shows the unit's trajectory. Always end with acknowledgement: "You worked hard on two new concepts today — LCM and HCF. That takes real effort."

**WATCH FOR:**
• Students who show thumbs-down on SC1 — this is a critical gap since SC1 is the foundation. They may need 1:1 conferencing before tomorrow.
• Students who show thumbs-up on all three — confirm in exit ticket data. If genuine, these students are ready for extending challenges tomorrow.
• The Turn & Talk: listen for students who can clearly distinguish LCM from HCF — this indicates deep understanding.

[Maths: Summarise — Closing | VTLM 2.0: Monitor Progress & Feedback]`;

// ── Helper: draw a multiples list on a slide ────────────────────────────────

function drawMultiplesList(slide, x, y, label, multiples, highlightSet, color) {
  // Label
  slide.addText(label, {
    x, y, w: 4.0, h: 0.3,
    fontSize: 12, fontFace: FONT_H, color: color, bold: true, margin: 0,
  });

  // Number bubbles
  const bubbleW = 0.52;
  const gap = 0.08;
  multiples.forEach((m, i) => {
    const bx = x + i * (bubbleW + gap);
    const by = y + 0.35;
    const isHighlighted = highlightSet.has(m);
    addTextOnShape(slide, String(m), {
      x: bx, y: by, w: bubbleW, h: 0.4, rectRadius: 0.08,
      fill: { color: isHighlighted ? C.ACCENT : C.BG_CARD },
    }, {
      fontSize: 12, fontFace: FONT_B,
      color: isHighlighted ? C.WHITE : C.CHARCOAL,
      bold: isHighlighted,
    });
  });

  return y + 0.85;
}

// ── Helper: draw a Venn diagram for factors ─────────────────────────────────

function drawVennDiagram(slide, x, y, leftLabel, rightLabel, leftOnly, both, rightOnly) {
  const circleW = 2.8;
  const circleH = 2.2;
  const overlap = 1.0;

  // Left circle
  slide.addShape("ellipse", {
    x, y, w: circleW, h: circleH,
    fill: { color: C.PRIMARY, transparency: 80 },
    line: { color: C.PRIMARY, width: 1.5 },
  });

  // Right circle
  slide.addShape("ellipse", {
    x: x + circleW - overlap, y, w: circleW, h: circleH,
    fill: { color: C.SECONDARY, transparency: 80 },
    line: { color: C.SECONDARY, width: 1.5 },
  });

  // Labels
  slide.addText(leftLabel, {
    x: x + 0.1, y: y - 0.3, w: 1.8, h: 0.25,
    fontSize: 10, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
  });
  slide.addText(rightLabel, {
    x: x + circleW - overlap + 0.9, y: y - 0.3, w: 1.8, h: 0.25,
    fontSize: 10, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
  });

  // Left-only numbers
  slide.addText(leftOnly.join(", "), {
    x: x + 0.15, y: y + 0.3, w: circleW - overlap - 0.1, h: circleH - 0.6,
    fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL,
    align: "center", valign: "middle", margin: 0,
  });

  // Both (common factors)
  slide.addText(both.join(", "), {
    x: x + circleW - overlap, y: y + 0.2, w: overlap, h: circleH - 0.4,
    fontSize: 11, fontFace: FONT_B, color: C.ACCENT, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Right-only numbers
  slide.addText(rightOnly.join(", "), {
    x: x + circleW + 0.05, y: y + 0.3, w: circleW - overlap - 0.1, h: circleH - 0.6,
    fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL,
    align: "center", valign: "middle", margin: 0,
  });

  return y + circleH + 0.1;
}

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "LCM & HCF — Session 2";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres, "Lowest Common Multiples &\nHighest Common Factors", "Finding LCM & HCF of Number Pairs",
    "Session 2 of 3 | Number Properties 2 | Year 5/6", NOTES_TITLE);

  // ── SLIDE 2: Daily Review 1 (Stage 1) — Multiplication Strategies ──────
  contentSlide(pres, "Daily Review", C.ACCENT,
    "Multiplication Strategies: Doubling & Rearranging", [], NOTES_DR1, FOOTER, (s) => {
    // Q1 card (left)
    addCard(s, 0.4, CONTENT_TOP + 0.05, 5.0, 1.7, { strip: C.PRIMARY });
    s.addText([
      { text: "Q1: 253 x 4 using doubling", options: { bold: true, breakLine: true, fontSize: 12, color: C.PRIMARY } },
      { text: "Step 1:  2 x 253 = 506", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Step 2:  2 x 506 = 1012", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Answer: 1012", options: { fontSize: 12, color: C.ACCENT, bold: true } },
    ], {
      x: 0.65, y: CONTENT_TOP + 0.15, w: 4.5, h: 1.4,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Q2 card (left, below Q1)
    addCard(s, 0.4, CONTENT_TOP + 1.9, 5.0, 1.7, { strip: C.SECONDARY });
    s.addText([
      { text: "Q2: 15 x 16 by rearranging factors", options: { bold: true, breakLine: true, fontSize: 12, color: C.SECONDARY } },
      { text: "15 = 3 x 5    16 = 2 x 8", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Rearrange: (5 x 2) x (3 x 8) = 10 x 24", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Answer: 240", options: { fontSize: 12, color: C.ACCENT, bold: true } },
    ], {
      x: 0.65, y: CONTENT_TOP + 2.0, w: 4.5, h: 1.4,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Factor rearrangement visual (right side)
    addCard(s, 5.7, CONTENT_TOP + 0.05, 3.8, 3.55, { strip: C.ACCENT });
    s.addText("Factor Rearrangement", {
      x: 5.9, y: CONTENT_TOP + 0.15, w: 3.4, h: 0.3,
      fontSize: 12, fontFace: FONT_H, color: C.ACCENT, bold: true, margin: 0,
    });

    // Factor boxes for 15 × 16
    const factors = [
      { label: "3", x: 6.1, y: CONTENT_TOP + 0.6, color: C.PRIMARY },
      { label: "5", x: 6.8, y: CONTENT_TOP + 0.6, color: C.PRIMARY },
      { label: "2", x: 7.7, y: CONTENT_TOP + 0.6, color: C.SECONDARY },
      { label: "8", x: 8.4, y: CONTENT_TOP + 0.6, color: C.SECONDARY },
    ];
    factors.forEach((f) => {
      addTextOnShape(s, f.label, {
        x: f.x, y: f.y, w: 0.5, h: 0.45, rectRadius: 0.08,
        fill: { color: f.color },
      }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
    });

    // Arrows showing rearrangement
    s.addText("15", {
      x: 6.1, y: CONTENT_TOP + 0.45, w: 1.2, h: 0.18,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, align: "center", margin: 0,
    });
    s.addText("16", {
      x: 7.7, y: CONTENT_TOP + 0.45, w: 1.2, h: 0.18,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, align: "center", margin: 0,
    });

    // Rearranged result
    s.addText("Rearranged:", {
      x: 6.0, y: CONTENT_TOP + 1.25, w: 3.2, h: 0.25,
      fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    addTextOnShape(s, "5 x 2 = 10", {
      x: 6.1, y: CONTENT_TOP + 1.55, w: 1.6, h: 0.4, rectRadius: 0.08,
      fill: { color: C.ACCENT },
    }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });
    addTextOnShape(s, "3 x 8 = 24", {
      x: 7.9, y: CONTENT_TOP + 1.55, w: 1.6, h: 0.4, rectRadius: 0.08,
      fill: { color: C.ACCENT },
    }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });
    addTextOnShape(s, "10 x 24 = 240", {
      x: 6.5, y: CONTENT_TOP + 2.15, w: 2.6, h: 0.5, rectRadius: 0.1,
      fill: { color: C.SUCCESS },
    }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
  });

  // ── SLIDE 3: Daily Review 2 (Stage 1) — Area Model ────────────────────
  contentSlide(pres, "Daily Review", C.ACCENT,
    "Multiplication Strategies: Area Model", [], NOTES_DR2, FOOTER, (s) => {
    // Q3 card (left)
    addCard(s, 0.4, CONTENT_TOP + 0.05, 5.0, 1.7, { strip: C.PRIMARY });
    s.addText([
      { text: "Q3: 324 x 8 using an area model", options: { bold: true, breakLine: true, fontSize: 12, color: C.PRIMARY } },
      { text: "300 x 8 = 2400", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: " 20 x 8 =  160", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "  4 x 8 =    32", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Total: 2592", options: { fontSize: 12, color: C.ACCENT, bold: true } },
    ], {
      x: 0.65, y: CONTENT_TOP + 0.15, w: 4.5, h: 1.5,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Q4 card (left, below Q3)
    addCard(s, 0.4, CONTENT_TOP + 1.9, 5.0, 1.6, { strip: C.SECONDARY });
    s.addText([
      { text: "Q4: 467 x 5 using partitioning", options: { bold: true, breakLine: true, fontSize: 12, color: C.SECONDARY } },
      { text: "400 x 5 = 2000", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: " 60 x 5 =  300", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "  7 x 5 =    35", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Total: 2335", options: { fontSize: 12, color: C.ACCENT, bold: true } },
    ], {
      x: 0.65, y: CONTENT_TOP + 2.0, w: 4.5, h: 1.4,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Area model array visual (right side)
    addCard(s, 5.7, CONTENT_TOP + 0.05, 3.8, 3.0, { strip: C.ACCENT });
    s.addText("Area Model: 324 x 8", {
      x: 5.9, y: CONTENT_TOP + 0.15, w: 3.4, h: 0.3,
      fontSize: 12, fontFace: FONT_H, color: C.ACCENT, bold: true, margin: 0,
    });

    // Three boxes showing the partitioning
    const boxes = [
      { label: "300 x 8", value: "2400", w: 1.6, color: C.PRIMARY },
      { label: "20 x 8", value: "160", w: 1.0, color: C.SECONDARY },
      { label: "4 x 8", value: "32", w: 0.7, color: C.ACCENT },
    ];
    let bx = 6.0;
    const by = CONTENT_TOP + 0.6;
    const bh = 1.4;
    boxes.forEach((b) => {
      s.addShape("rect", {
        x: bx, y: by, w: b.w, h: bh,
        fill: { color: b.color, transparency: 75 },
        line: { color: b.color, width: 1.5 },
      });
      s.addText(b.label, {
        x: bx, y: by + 0.1, w: b.w, h: 0.3,
        fontSize: 9, fontFace: FONT_B, color: b.color, bold: true,
        align: "center", margin: 0,
      });
      s.addText(b.value, {
        x: bx, y: by + 0.4, w: b.w, h: bh - 0.6,
        fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      bx += b.w + 0.05;
    });

    // "x 8" label on left
    s.addText("x 8", {
      x: 5.4, y: by + 0.3, w: 0.5, h: 0.8,
      fontSize: 14, fontFace: FONT_H, color: C.CHARCOAL, bold: true,
      valign: "middle", align: "center", margin: 0,
    });

    // Sum bar
    addTextOnShape(s, "2400 + 160 + 32 = 2592", {
      x: 6.0, y: CONTENT_TOP + 2.2, w: 3.3, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    }, { fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true });
  });

  // ── SLIDE 4: Fluency (Stage 1) — Skip Counting ────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Mental Maths — Skip Counting Multiples", { color: C.ACCENT });

    // Choral counting cards
    const countTasks = [
      { label: "Count by 6s", range: "6 to 72", color: C.PRIMARY },
      { label: "Count by 8s", range: "8 to 96", color: C.SECONDARY },
    ];
    countTasks.forEach((t, i) => {
      const cx = 0.5 + i * 4.7;
      const cy = CONTENT_TOP + 0.05;
      addCard(s, cx, cy, 4.4, 1.3, { strip: t.color });
      s.addText([
        { text: t.label, options: { bold: true, breakLine: true, fontSize: 16, color: t.color } },
        { text: "from " + t.range, options: { fontSize: 13, color: C.CHARCOAL } },
      ], {
        x: cx + 0.15, y: cy + 0.1, w: 4.0, h: 1.1,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Quick-fire questions
    addCard(s, 0.5, CONTENT_TOP + 1.55, 9, 2.0, { strip: C.ACCENT });
    s.addText("Quick Fire — What is...?", {
      x: 0.75, y: CONTENT_TOP + 1.65, w: 4, h: 0.3,
      fontSize: 13, fontFace: FONT_H, color: C.ACCENT, bold: true, margin: 0,
    });

    const quickFire = [
      "The 7th multiple of 9?",
      "The 5th multiple of 12?",
      "The 4th multiple of 7?",
      "The 6th multiple of 8?",
    ];
    quickFire.forEach((q, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const qx = 0.75 + col * 4.4;
      const qy = CONTENT_TOP + 2.1 + row * 0.55;
      addTextOnShape(s, q, {
        x: qx, y: qy, w: 4.0, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_CARD },
      }, {
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
      });
    });

    // Choral response instruction
    addTextOnShape(s, "Choral Response — Everyone Together!", {
      x: 2.5, y: SAFE_BOTTOM - 0.55, w: 5, h: 0.45, rectRadius: 0.08,
      fill: { color: C.ALERT },
    }, {
      fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_FLUENCY);
  })();

  // ── SLIDE 5: LI / SC ──────────────────────────────────────────────────
  liSlide(pres,
    ["We are learning to find the lowest common multiple and highest common factor of pairs of numbers so we can simplify calculations and solve problems."],
    [
      "I can list the multiples of a number and identify common multiples.",
      "I can find the LCM and HCF of a pair of numbers.",
      "I can use LCM and HCF to solve real-world problems.",
    ],
    NOTES_LISC, FOOTER);

  // ── SLIDE 6: I Do — Key Vocabulary (Stage 2) ──────────────────────────
  contentSlide(pres, "Stage 2 | I Do", C.PRIMARY, "Key Vocabulary", [], NOTES_VOCAB, FOOTER, (s) => {
    // Four vocabulary cards in a 2x2 grid
    const terms = [
      {
        word: "Common Multiple",
        def: "A number that is a multiple of BOTH numbers.\n24 is a common multiple of 6 and 8\nbecause 6 x 4 = 24 and 8 x 3 = 24",
        color: C.PRIMARY,
      },
      {
        word: "LCM",
        def: "Lowest Common Multiple — the SMALLEST number that is a multiple of both.\nLCM(6, 8) = 24",
        color: C.SECONDARY,
      },
      {
        word: "Common Factor",
        def: "A number that divides evenly into BOTH numbers.\n6 is a common factor of 12 and 18\nbecause 12 / 6 = 2 and 18 / 6 = 3",
        color: C.ACCENT,
      },
      {
        word: "HCF",
        def: "Highest Common Factor — the BIGGEST number that divides evenly into both.\nHCF(12, 18) = 6",
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

      // Term header
      addTextOnShape(s, t.word, {
        x: cx + 0.15, y: cy + 0.12, w: 2.6, h: 0.34, rectRadius: 0.08,
        fill: { color: t.color },
      }, {
        fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Definition
      s.addText(t.def, {
        x: cx + 0.15, y: cy + 0.55, w: cw - 0.3, h: ch - 0.7,
        fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
      });
    });
  });

  // ── SLIDE 7: I Do — Worked Example 1: LCM of 6 and 9 (Stage 2) ───────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example: Find the LCM of 6 and 9", { fontSize: 20, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "Find the Lowest Common Multiple of 6 and 9", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 5.5, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    // Multiples lists (left side)
    const commonMultiples = new Set([18, 36]);
    drawMultiplesList(s, 0.5, CONTENT_TOP + 0.55,
      "Multiples of 6:", [6, 12, 18, 24, 30, 36], commonMultiples, C.PRIMARY);
    drawMultiplesList(s, 0.5, CONTENT_TOP + 1.5,
      "Multiples of 9:", [9, 18, 27, 36, 45], commonMultiples, C.SECONDARY);

    // Common multiples highlight
    addCard(s, 0.5, CONTENT_TOP + 2.5, 4.5, 0.85, { strip: C.ACCENT });
    s.addText([
      { text: "Common multiples: 18, 36...", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "LCM = 18 (the smallest)", options: { fontSize: 13, color: C.ACCENT, bold: true } },
    ], {
      x: 0.75, y: CONTENT_TOP + 2.6, w: 4.0, h: 0.65,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Method card (right side)
    addCard(s, 5.5, CONTENT_TOP + 0.1, 4.0, 2.5, { strip: C.SUCCESS });
    s.addText("The Listing Method for LCM", {
      x: 5.7, y: CONTENT_TOP + 0.2, w: 3.6, h: 0.32,
      fontSize: 12, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
    });
    s.addText([
      { text: "1.  List multiples of each number", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "2.  Find numbers in BOTH lists", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "3.  Pick the SMALLEST match", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "4.  Verify: is it a multiple of both?", options: { fontSize: 11, color: C.ACCENT, bold: true } },
    ], {
      x: 5.7, y: CONTENT_TOP + 0.62, w: 3.6, h: 1.1,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Verification
    addTextOnShape(s, "Check: 6 x 3 = 18  and  9 x 2 = 18", {
      x: 5.5, y: CONTENT_TOP + 1.9, w: 4.0, h: 0.45, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    }, {
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    // Think-aloud card (bottom)
    addCard(s, 0.5, CONTENT_TOP + 3.5, 9.0, 0.55, { strip: C.MUTED });
    s.addText([
      { text: "Think-aloud: ", options: { bold: true, fontSize: 10, color: C.ACCENT } },
      { text: "\"I list multiples of each until I spot one that appears in BOTH lists. The smallest one is the LCM.\"", options: { fontSize: 10, color: C.CHARCOAL, italic: true } },
    ], {
      x: 0.75, y: CONTENT_TOP + 3.55, w: 8.5, h: 0.45,
      fontFace: FONT_B, margin: 0, valign: "middle",
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_WE1);
  })();

  // ── SLIDE 8: I Do — Worked Example 2: HCF of 12 and 18 (Stage 2) ─────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example: Find the HCF of 12 and 18", { fontSize: 20, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "Find the Highest Common Factor of 12 and 18", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 5.5, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    // Factor lists (left side)
    addCard(s, 0.5, CONTENT_TOP + 0.55, 4.5, 2.2, { strip: C.PRIMARY });
    s.addText("Factors of 12:", {
      x: 0.7, y: CONTENT_TOP + 0.65, w: 4.0, h: 0.25,
      fontSize: 11, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
    });
    s.addText("1,  2,  3,  4,  6,  12", {
      x: 0.7, y: CONTENT_TOP + 0.95, w: 4.0, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addText("Factors of 18:", {
      x: 0.7, y: CONTENT_TOP + 1.35, w: 4.0, h: 0.25,
      fontSize: 11, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });
    s.addText("1,  2,  3,  6,  9,  18", {
      x: 0.7, y: CONTENT_TOP + 1.65, w: 4.0, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addText([
      { text: "Common factors: ", options: { fontSize: 11, color: C.CHARCOAL } },
      { text: "1, 2, 3, 6", options: { fontSize: 13, color: C.ACCENT, bold: true } },
    ], {
      x: 0.7, y: CONTENT_TOP + 2.05, w: 4.0, h: 0.3,
      fontFace: FONT_B, margin: 0,
    });
    addTextOnShape(s, "HCF = 6", {
      x: 0.7, y: CONTENT_TOP + 2.42, w: 1.5, h: 0.3, rectRadius: 0.08,
      fill: { color: C.ACCENT },
    }, { fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true });

    // Venn diagram (right side)
    drawVennDiagram(s, 5.2, CONTENT_TOP + 0.55,
      "Only 12", "Only 18",
      ["4", "12"], ["1", "2", "3", "6"], ["9", "18"]);

    // HCF label on Venn
    addTextOnShape(s, "HCF = 6  (largest in overlap)", {
      x: 5.5, y: CONTENT_TOP + 2.85, w: 3.6, h: 0.38, rectRadius: 0.08,
      fill: { color: C.ACCENT },
    }, { fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true });

    // Think-aloud card (bottom)
    addCard(s, 0.5, CONTENT_TOP + 3.4, 9.0, 0.55, { strip: C.MUTED });
    s.addText([
      { text: "Think-aloud: ", options: { bold: true, fontSize: 10, color: C.ACCENT } },
      { text: "\"I find all factors of each number, then identify which factors they share. The biggest shared factor is the HCF.\"", options: { fontSize: 10, color: C.CHARCOAL, italic: true } },
    ], {
      x: 0.75, y: CONTENT_TOP + 3.45, w: 8.5, h: 0.45,
      fontFace: FONT_B, margin: 0, valign: "middle",
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_WE2);
  })();

  // ── SLIDES 9–10: CFU 1 — Show Me Boards (withReveal) ──────────────────
  withReveal(
    () => cfuSlide(pres, "CFU", "Quick Check", "Show Me Boards",
      "Find the LCM of 4 and 6.\n\nList the multiples of each on your whiteboard.\nIdentify the first common multiple.",
      NOTES_CFU1, FOOTER),
    (slide) => {
      addTextOnShape(slide, "LCM(4, 6) = 12", {
        x: 2.5, y: 3.5, w: 5, h: 0.55, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      slide.addText([
        { text: "Multiples of 4: 4, 8, 12, 16...", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Multiples of 6: 6, 12, 18, 24...", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "First common multiple = 12", options: { fontSize: 12, color: C.ACCENT, bold: true } },
      ], {
        x: 2.5, y: 4.15, w: 5, h: 0.8,
        fontFace: FONT_B, margin: 0,
      });
    }
  );

  // ── SLIDES 11–12: We Do — Problem Pair 1: LCM of 8 and 12 (withReveal)
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Find the LCM of 8 and 12", { fontSize: 22, color: C.SECONDARY });

      // Problem prompt
      addTextOnShape(s, "List the multiples of each number. Find the first common multiple.", {
        x: 0.5, y: CONTENT_TOP - 0.05, w: 6.0, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_DARK },
      }, {
        fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Multiples listing prompts (left side)
      addCard(s, 0.5, CONTENT_TOP + 0.55, 5.0, 2.8, { strip: C.SECONDARY });
      s.addText("Multiples of 8:", {
        x: 0.75, y: CONTENT_TOP + 0.7, w: 4.5, h: 0.3,
        fontSize: 12, fontFace: FONT_H, color: C.PRIMARY, bold: true, margin: 0,
      });
      s.addText("8,  16,  ?,  ?,  ?", {
        x: 0.75, y: CONTENT_TOP + 1.05, w: 4.5, h: 0.3,
        fontSize: 14, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });
      s.addText("Multiples of 12:", {
        x: 0.75, y: CONTENT_TOP + 1.55, w: 4.5, h: 0.3,
        fontSize: 12, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
      });
      s.addText("12,  ?,  ?,  ?,  ?", {
        x: 0.75, y: CONTENT_TOP + 1.9, w: 4.5, h: 0.3,
        fontSize: 14, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });
      s.addText("LCM = ?", {
        x: 0.75, y: CONTENT_TOP + 2.5, w: 4.5, h: 0.35,
        fontSize: 16, fontFace: FONT_H, color: C.ALERT, bold: true, margin: 0,
      });

      // Instruction card (right)
      addCard(s, 5.8, CONTENT_TOP + 0.55, 3.7, 2.0, { strip: C.SECONDARY });
      s.addText([
        { text: "Cold Call Steps", options: { bold: true, breakLine: true, fontSize: 13, color: C.SECONDARY } },
        { text: "List multiples of 8 first.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "List multiples of 12 next.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Scan for a match.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "What is the LCM?", options: { fontSize: 11, color: C.ALERT, bold: true } },
      ], {
        x: 6.0, y: CONTENT_TOP + 0.65, w: 3.3, h: 1.6,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (slide) => {
      // Reveal: completed multiples and answer
      addCard(slide, 5.8, CONTENT_TOP + 0.55, 3.7, 3.2, { strip: C.SUCCESS });
      slide.addText("Answer", {
        x: 6.0, y: CONTENT_TOP + 0.65, w: 3.3, h: 0.3,
        fontSize: 13, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });
      slide.addText([
        { text: "Multiples of 8:", options: { bold: true, breakLine: true, fontSize: 11, color: C.PRIMARY } },
        { text: "8, 16, 24, 32, 40", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Multiples of 12:", options: { bold: true, breakLine: true, fontSize: 11, color: C.SECONDARY } },
        { text: "12, 24, 36, 48, 60", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Common multiple: 24", options: { breakLine: true, fontSize: 11, color: C.ACCENT, bold: true } },
      ], {
        x: 6.0, y: CONTENT_TOP + 1.05, w: 3.3, h: 1.8,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addTextOnShape(slide, "LCM(8, 12) = 24", {
        x: 6.0, y: CONTENT_TOP + 2.9, w: 3.3, h: 0.45, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 15, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── SLIDES 13–14: We Do — Problem Pair 2: HCF of 24 and 36 (withReveal)
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Find the HCF of 24 and 36", { fontSize: 22, color: C.SECONDARY });

      addTextOnShape(s, "List all factors of each number. Find the largest common factor.", {
        x: 0.5, y: CONTENT_TOP - 0.05, w: 6.0, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_DARK },
      }, {
        fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Instruction card (LEFT side — leaves right side for reveal)
      addCard(s, 0.5, CONTENT_TOP + 0.55, 4.8, 3.2, { strip: C.SECONDARY });
      s.addText([
        { text: "On your whiteboard:", options: { bold: true, breakLine: true, fontSize: 14, color: C.SECONDARY } },
        { text: "List all factors of 24.", options: { breakLine: true, fontSize: 13, color: C.CHARCOAL } },
        { text: "List all factors of 36.", options: { breakLine: true, fontSize: 13, color: C.CHARCOAL } },
        { text: "Circle the common factors.", options: { breakLine: true, fontSize: 13, color: C.CHARCOAL } },
        { text: "Identify the HCF.", options: { breakLine: true, fontSize: 13, color: C.CHARCOAL } },
        { text: "You have 90 seconds.", options: { fontSize: 13, color: C.ALERT, bold: true } },
      ], {
        x: 0.75, y: CONTENT_TOP + 0.7, w: 4.3, h: 2.6,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Large number display (RIGHT side)
      addTextOnShape(s, "24 & 36", {
        x: 5.8, y: CONTENT_TOP + 0.8, w: 3.5, h: 2.0, rectRadius: 0.15,
        fill: { color: C.PRIMARY },
      }, {
        fontSize: 48, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Timer visual
      addTextOnShape(s, "90 seconds — GO!", {
        x: 0.5, y: SAFE_BOTTOM - 0.55, w: 3, h: 0.45, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, {
        fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO2);
      return s;
    },
    (slide) => {
      // Reveal answer card (RIGHT side)
      addCard(slide, 5.5, CONTENT_TOP + 0.55, 4.0, 3.2, { strip: C.SUCCESS });
      slide.addText("Answer", {
        x: 5.7, y: CONTENT_TOP + 0.65, w: 3.6, h: 0.3,
        fontSize: 14, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      slide.addText([
        { text: "Factors of 24:", options: { bold: true, breakLine: true, fontSize: 10, color: C.PRIMARY } },
        { text: "1, 2, 3, 4, 6, 8, 12, 24", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Factors of 36:", options: { bold: true, breakLine: true, fontSize: 10, color: C.SECONDARY } },
        { text: "1, 2, 3, 4, 6, 9, 12, 18, 36", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Common factors: 1, 2, 3, 4, 6, 12", options: { breakLine: true, fontSize: 11, color: C.ACCENT, bold: true } },
      ], {
        x: 5.7, y: CONTENT_TOP + 1.05, w: 3.6, h: 1.8,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addTextOnShape(slide, "HCF(24, 36) = 12", {
        x: 5.7, y: CONTENT_TOP + 2.9, w: 3.6, h: 0.45, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 15, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── SLIDES 15–16: CFU 2 — Hinge Question (withReveal) ─────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "Hinge Question", { color: C.ALERT, w: 2.2 });
      addTitle(s, "The LCM of 4 and 10 is:", { color: C.ALERT });

      // Four option cards
      const options = [
        { letter: "A", value: "2", subtext: "(HCF)", color: C.PRIMARY },
        { letter: "B", value: "20", subtext: "(correct)", color: C.SECONDARY },
        { letter: "C", value: "40", subtext: "(product)", color: C.ACCENT },
        { letter: "D", value: "10", subtext: "(larger number)", color: C.SUCCESS },
      ];
      options.forEach((opt, i) => {
        const ox = 0.5 + i * 2.3;
        const oy = CONTENT_TOP + 0.2;
        addCard(s, ox, oy, 2.0, 1.8, { strip: opt.color });

        addTextOnShape(s, opt.letter, {
          x: ox + 0.15, y: oy + 0.15, w: 0.45, h: 0.45, rectRadius: 0.22,
          fill: { color: opt.color },
        }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

        s.addText(opt.value, {
          x: ox, y: oy + 0.7, w: 2.0, h: 0.9,
          fontSize: 36, fontFace: FONT_H, color: C.CHARCOAL,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
      });

      // Instruction
      addTextOnShape(s, "Finger Voting — Hold up 1, 2, 3, or 4 fingers", {
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
      // Reveal: highlight B as correct
      addTextOnShape(slide, "B — LCM(4, 10) = 20", {
        x: 1.5, y: CONTENT_TOP + 2.2, w: 7, h: 0.55, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      slide.addText([
        { text: "Multiples of 4: 4, 8, 12, 16, 20   Multiples of 10: 10, 20   First match = 20", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      ], {
        x: 1.5, y: CONTENT_TOP + 2.85, w: 7, h: 0.35,
        fontFace: FONT_B, margin: 0,
      });
      slide.addText([
        { text: "A) 2 = HCF, not LCM    ", options: { fontSize: 10, color: C.MUTED } },
        { text: "C) 40 = product, not LCM    ", options: { fontSize: 10, color: C.MUTED } },
        { text: "D) 10 is not a multiple of 4", options: { fontSize: 10, color: C.MUTED } },
      ], {
        x: 1.5, y: CONTENT_TOP + 3.25, w: 7, h: 0.25,
        fontFace: FONT_B, margin: 0,
      });
    }
  );

  // ── SLIDE 17: You Do — Independent Practice (Stage 4) ─────────────────
  contentSlide(pres, "Stage 4 | You Do", C.ALERT,
    "Independent Practice: LCM & HCF", [], NOTES_YOUDO, FOOTER, (s) => {
    // Instruction card (left)
    addCard(s, 0.4, CONTENT_TOP, 5.4, 1.7, { strip: C.ALERT });
    s.addText([
      { text: "Find the LCM and HCF for each pair.", options: { bold: true, breakLine: true, fontSize: 13, color: C.ALERT } },
      { text: "For LCM: List multiples until you find a match.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "For HCF: List all factors, find the largest common one.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "Show all your working.", options: { fontSize: 11, color: C.CHARCOAL, italic: true } },
    ], {
      x: 0.65, y: CONTENT_TOP + 0.1, w: 4.9, h: 1.4,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Number pair cards (right side)
    s.addText("Find LCM and HCF of:", {
      x: 6.1, y: CONTENT_TOP, w: 3.5, h: 0.3,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, bold: true, margin: 0,
    });
    const pairs = [
      { label: "Pair 1", nums: "6 and 8", color: C.PRIMARY },
      { label: "Pair 2", nums: "10 and 15", color: C.SECONDARY },
      { label: "Pair 3", nums: "12 and 20", color: C.ACCENT },
    ];
    pairs.forEach((p, i) => {
      const py = CONTENT_TOP + 0.4 + i * 0.65;
      addTextOnShape(s, p.label + ": " + p.nums, {
        x: 6.1, y: py, w: 3.3, h: 0.5, rectRadius: 0.08,
        fill: { color: p.color },
      }, {
        fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    });

    // Challenge card (bottom)
    addCard(s, 0.4, CONTENT_TOP + 1.9, 9.1, 1.85, { strip: C.SUCCESS });
    s.addText("Challenge (SC3)", {
      x: 0.65, y: CONTENT_TOP + 2.0, w: 3, h: 0.28,
      fontSize: 12, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
    });
    s.addText("Sam needs to buy hotdog buns (packs of 8) and sausages (packs of 6). What is the smallest number of each he should buy so he has no leftovers?", {
      x: 0.65, y: CONTENT_TOP + 2.35, w: 8.6, h: 0.55,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });
    s.addText([
      { text: "Hint: ", options: { bold: true, fontSize: 10, color: C.ACCENT } },
      { text: "What mathematical concept tells you the smallest number that is a multiple of BOTH 8 and 6?", options: { fontSize: 10, color: C.CHARCOAL, italic: true } },
    ], {
      x: 0.65, y: CONTENT_TOP + 2.95, w: 8.6, h: 0.35,
      fontFace: FONT_B, margin: 0,
    });

    // Worksheet reference
    addTextOnShape(s, "Use your SR1 Worksheet", {
      x: 6.8, y: SAFE_BOTTOM - 0.55, w: 2.7, h: 0.42, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, {
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
    });
  });

  // ── SLIDE 18: Exit Ticket (Stage 5) ───────────────────────────────────
  exitTicketSlide(pres, [
    "Q1: Find the LCM of 5 and 8.",
    "Q2: Find the HCF of 18 and 24.",
    "Q3: Explain in one sentence why the HCF of 18 and 24 cannot be 9.",
  ], NOTES_EXIT, FOOTER);

  // ── SLIDE 19: Resources ───────────────────────────────────────────────
  addResourceSlide(pres, [
    {
      name: "SR1 — LCM & HCF Practice Worksheet",
      fileName: "SR1_LCM_HCF_Worksheet.pdf",
      description: "Independent practice — find LCM and HCF for 3 pairs plus a challenge problem.",
    },
    {
      name: "SR2 — LCM & HCF Answer Key",
      fileName: "SR2_LCM_HCF_Answers.pdf",
      description: "Answer key for SR1. For teacher reference.",
    },
    {
      name: "EXT1 — LCM & HCF of Triples Investigation",
      fileName: "EXT1_LCM_HCF_Triples_Investigation.pdf",
      description: "Extending resource — finding LCM and HCF of three numbers.",
    },
  ], { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // ── SLIDE 20: Closing ─────────────────────────────────────────────────
  closingSlide(pres,
    "What is the difference between LCM and HCF? Explain it to your partner in your own words. 30 seconds.",
    [
      "SC1: I can list the multiples of a number and identify common multiples.",
      "SC2: I can find the LCM and HCF of a pair of numbers.",
      "SC3: I can use LCM and HCF to solve real-world problems.",
      "Tomorrow: Extending to three numbers and exploring prime factorisation as a shortcut.",
    ],
    NOTES_CLOSING);

  // ── Write PPTX ──────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: OUT_DIR + "/NP2_Lesson2_LCM_HCF.pptx" });
  console.log("PPTX written to " + OUT_DIR);

  // ── Generate companion PDFs ────────────────────────────────────────────
  await generateWorksheet();
  await generateAnswerKey();
  await generateExtendingPdf();
  console.log("All PDFs generated.");
}

// ── PDF: SR1 — LCM & HCF Practice Worksheet ────────────────────────────────

async function generateWorksheet() {
  const doc = createPdf({ title: "LCM & HCF Practice Worksheet" });

  let y = addPdfHeader(doc, "LCM & HCF Practice", {
    subtitle: "SR1 — Supporting Resource",
    color: C.PRIMARY,
    lessonInfo: "Session 2 of 3 | LCM & HCF | Year 5/6 Maths",
  });

  y = addTipBox(doc, "For LCM: List the multiples of each number until you find the first one they share. For HCF: List all the factors of each number and find the biggest one they share.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Section A: Find the LCM", y, { color: C.PRIMARY });

  // Problem 1: LCM of 6 and 8
  y = addProblem(doc, 1, "Find the LCM of 6 and 8.", y, {
    writeLines: [
      { label: "Multiples of 6:" },
      { label: "Multiples of 8:" },
      { label: "Common multiples:" },
      { label: "LCM:" },
    ],
    color: C.PRIMARY,
  });

  // Problem 2: LCM of 10 and 15
  y = addProblem(doc, 2, "Find the LCM of 10 and 15.", y, {
    writeLines: [
      { label: "Multiples of 10:" },
      { label: "Multiples of 15:" },
      { label: "Common multiples:" },
      { label: "LCM:" },
    ],
    color: C.PRIMARY,
  });

  // Problem 3: LCM of 12 and 20
  y = addProblem(doc, 3, "Find the LCM of 12 and 20.", y, {
    writeLines: [
      { label: "Multiples of 12:" },
      { label: "Multiples of 20:" },
      { label: "Common multiples:" },
      { label: "LCM:" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Section B: Find the HCF", y, { color: C.SECONDARY });

  // Problem 4: HCF of 6 and 8
  y = addProblem(doc, 4, "Find the HCF of 6 and 8.", y, {
    writeLines: [
      { label: "Factors of 6:" },
      { label: "Factors of 8:" },
      { label: "Common factors:" },
      { label: "HCF:" },
    ],
    color: C.SECONDARY,
  });

  // Problem 5: HCF of 10 and 15
  y = addProblem(doc, 5, "Find the HCF of 10 and 15.", y, {
    writeLines: [
      { label: "Factors of 10:" },
      { label: "Factors of 15:" },
      { label: "Common factors:" },
      { label: "HCF:" },
    ],
    color: C.SECONDARY,
  });

  // Problem 6: HCF of 12 and 20
  y = addProblem(doc, 6, "Find the HCF of 12 and 20.", y, {
    writeLines: [
      { label: "Factors of 12:" },
      { label: "Factors of 20:" },
      { label: "Common factors:" },
      { label: "HCF:" },
    ],
    color: C.SECONDARY,
  });

  y = addSectionHeading(doc, "Section C: Challenge (SC3)", y, { color: C.ACCENT });
  y = addProblem(doc, 7, "Sam needs to buy hotdog buns (packs of 8) and sausages (packs of 6). What is the smallest number of each he should buy so he has no leftovers?", y, {
    writeLines: [
      { label: "What type of problem is this? (LCM or HCF):" },
      { label: "Multiples of 8:" },
      { label: "Multiples of 6:" },
      { label: "Smallest common multiple:" },
      { label: "How many packs of buns:" },
      { label: "How many packs of sausages:" },
    ],
    color: C.ACCENT,
  });

  addPdfFooter(doc, "Session 2 of 3 | LCM & HCF | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR1_LCM_HCF_Worksheet.pdf");
  console.log("  SR1 worksheet written.");
}

// ── PDF: SR2 — LCM & HCF Answer Key ────────────────────────────────────────

async function generateAnswerKey() {
  const doc = createPdf({ title: "LCM & HCF Answer Key" });

  let y = addPdfHeader(doc, "LCM & HCF — Answer Key", {
    subtitle: "SR2 — Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: "Session 2 of 3 | LCM & HCF | Year 5/6 Maths",
    showNameDate: false,
  });

  y = addSectionHeading(doc, "Section A: LCM", y, { color: C.PRIMARY });

  y = addProblem(doc, 1, "LCM of 6 and 8:", y, {
    writeLines: [
      { label: "Multiples of 6:", answer: "6, 12, 18, 24, 30, 36, 42, 48" },
      { label: "Multiples of 8:", answer: "8, 16, 24, 32, 40, 48" },
      { label: "Common multiples:", answer: "24, 48..." },
      { label: "LCM:", answer: "24" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "LCM of 10 and 15:", y, {
    writeLines: [
      { label: "Multiples of 10:", answer: "10, 20, 30, 40, 50, 60" },
      { label: "Multiples of 15:", answer: "15, 30, 45, 60" },
      { label: "Common multiples:", answer: "30, 60..." },
      { label: "LCM:", answer: "30" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "LCM of 12 and 20:", y, {
    writeLines: [
      { label: "Multiples of 12:", answer: "12, 24, 36, 48, 60, 72" },
      { label: "Multiples of 20:", answer: "20, 40, 60, 80" },
      { label: "Common multiples:", answer: "60..." },
      { label: "LCM:", answer: "60" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Section B: HCF", y, { color: C.SECONDARY });

  y = addProblem(doc, 4, "HCF of 6 and 8:", y, {
    writeLines: [
      { label: "Factors of 6:", answer: "1, 2, 3, 6" },
      { label: "Factors of 8:", answer: "1, 2, 4, 8" },
      { label: "Common factors:", answer: "1, 2" },
      { label: "HCF:", answer: "2" },
    ],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 5, "HCF of 10 and 15:", y, {
    writeLines: [
      { label: "Factors of 10:", answer: "1, 2, 5, 10" },
      { label: "Factors of 15:", answer: "1, 3, 5, 15" },
      { label: "Common factors:", answer: "1, 5" },
      { label: "HCF:", answer: "5" },
    ],
    color: C.SECONDARY,
  });

  y = addProblem(doc, 6, "HCF of 12 and 20:", y, {
    writeLines: [
      { label: "Factors of 12:", answer: "1, 2, 3, 4, 6, 12" },
      { label: "Factors of 20:", answer: "1, 2, 4, 5, 10, 20" },
      { label: "Common factors:", answer: "1, 2, 4" },
      { label: "HCF:", answer: "4" },
    ],
    color: C.SECONDARY,
  });

  y = addSectionHeading(doc, "Section C: Challenge", y, { color: C.ACCENT });

  y = addProblem(doc, 7, "Hotdog buns and sausages:", y, {
    writeLines: [
      { label: "Type of problem:", answer: "LCM — we need the smallest number that is a multiple of both 8 and 6" },
      { label: "Multiples of 8:", answer: "8, 16, 24, 32, 40, 48" },
      { label: "Multiples of 6:", answer: "6, 12, 18, 24, 30, 36" },
      { label: "Smallest common multiple:", answer: "24" },
      { label: "Packs of buns:", answer: "3 packs (3 x 8 = 24)" },
      { label: "Packs of sausages:", answer: "4 packs (4 x 6 = 24)" },
    ],
    color: C.ACCENT,
  });

  addPdfFooter(doc, "Teacher Reference — Do Not Distribute to Students");
  await writePdf(doc, OUT_DIR + "/SR2_LCM_HCF_Answers.pdf");
  console.log("  SR2 answer key written.");
}

// ── PDF: EXT1 — LCM & HCF of Triples Investigation ─────────────────────────

async function generateExtendingPdf() {
  const doc = createPdf({ title: "LCM & HCF of Triples Investigation" });

  let y = addPdfHeader(doc, "LCM & HCF of Triples", {
    subtitle: "EXT1 — Extending Challenge",
    color: C.ACCENT,
    lessonInfo: "Session 2 of 3 | LCM & HCF | Year 5/6 Maths",
  });

  y = addSectionHeading(doc, "What Happens With THREE Numbers?", y, { color: C.ACCENT });
  y = addBodyText(doc, "You already know how to find the LCM and HCF of two numbers. But what if you have THREE numbers? The same ideas work — you just need to find numbers that are common to ALL THREE lists.", y);

  y = addSectionHeading(doc, "Worked Example: LCM of 3, 4, and 5", y, { color: C.ACCENT });
  y = addBodyText(doc, "Step 1: List multiples of each number.", y);
  y = addBodyText(doc, "Multiples of 3: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60", y);
  y = addBodyText(doc, "Multiples of 4: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60", y);
  y = addBodyText(doc, "Multiples of 5: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60", y);
  y = addBodyText(doc, "Step 2: Find the first number that appears in ALL THREE lists.", y);
  y = addBodyText(doc, "60 appears in all three lists! LCM(3, 4, 5) = 60", y);

  y = addTipBox(doc, "Shortcut: You can also find the LCM of three numbers in steps. First find LCM(3, 4) = 12. Then find LCM(12, 5) = 60. This two-step method saves listing time!", y, { color: C.ACCENT });

  y = addSectionHeading(doc, "Worked Example: HCF of 12, 18, and 24", y, { color: C.ACCENT });
  y = addBodyText(doc, "Step 1: List factors of each number.", y);
  y = addBodyText(doc, "Factors of 12: 1, 2, 3, 4, 6, 12", y);
  y = addBodyText(doc, "Factors of 18: 1, 2, 3, 6, 9, 18", y);
  y = addBodyText(doc, "Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24", y);
  y = addBodyText(doc, "Step 2: Find the numbers that appear in ALL THREE lists.", y);
  y = addBodyText(doc, "Common factors: 1, 2, 3, 6. The HIGHEST is 6. HCF(12, 18, 24) = 6", y);

  y = addTipBox(doc, "Shortcut: Find HCF(12, 18) = 6 first. Then find HCF(6, 24) = 6. Same answer!", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Your Investigation", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Find the LCM and HCF for each set of three numbers. Use whichever method you prefer — listing all three, or the two-step shortcut.", y);

  y = addProblem(doc, 1, "Find the LCM of 2, 3, and 7.", y, {
    writeLines: [
      { label: "Method:" },
      { label: "LCM:" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "Find the LCM of 4, 6, and 10.", y, {
    writeLines: [
      { label: "Method:" },
      { label: "LCM:" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "Find the HCF of 12, 20, and 28.", y, {
    writeLines: [
      { label: "Factors of 12:" },
      { label: "Factors of 20:" },
      { label: "Factors of 28:" },
      { label: "Common factors:" },
      { label: "HCF:" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 4, "Find the HCF of 18, 27, and 36.", y, {
    writeLines: [
      { label: "Factors of 18:" },
      { label: "Factors of 27:" },
      { label: "Factors of 36:" },
      { label: "Common factors:" },
      { label: "HCF:" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Challenge Question", y, { color: C.ACCENT });
  y = addProblem(doc, 5, "Three friends visit the same library. Alex visits every 4 days, Bella every 6 days, and Charlie every 9 days. If they all visit today, in how many days will they ALL be at the library on the same day again?", y, {
    writeLines: [
      { label: "What type of problem is this?" },
      { label: "Working:" },
      { label: "Answer:" },
    ],
    color: C.ACCENT,
  });

  y = addTipBox(doc, "Answers: (1) LCM = 42  (2) LCM = 60  (3) HCF = 4  (4) HCF = 9  (5) LCM(4, 6, 9) = 36 days", y, { color: C.SECONDARY });

  addPdfFooter(doc, "Session 2 of 3 | LCM & HCF | Year 5/6 Maths — Extending Investigation");
  await writePdf(doc, OUT_DIR + "/EXT1_LCM_HCF_Triples_Investigation.pdf");
  console.log("  EXT1 extending investigation written.");
}

// ── Main ──────────────────────────────────────────────────────────────────────
build().catch((err) => { console.error(err); process.exit(1); });
