// Lesson 1 of 5: Factors & Factor Pairs — Algorithmic Thinking
// Year 5/6 Numeracy — Number Properties
// VC2M5N10 (algorithms, factors, multiples, divisibility)
// VC2M6N02 (prime, composite, square, triangular numbers)
// Week 1, Session 1

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

const OUT_DIR = "output/FM_Lesson1_Factors_Factor_Pairs";
const FOOTER = "Session 1 of 5 | Factors & Multiples | Year 5/6 Maths";

// ── Teacher notes ─────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
• "Welcome to our Factors and Multiples unit. Over five sessions this week we'll explore how numbers are built — through factors, multiples, divisibility rules, and special number types like primes and squares."
• "Today we focus on factors and factor pairs. By the end of the session, you'll have a systematic method that finds every factor of a number — and you'll know exactly when to stop."

**DO:**
• Display the title slide as students settle. Ensure mini-whiteboards and markers are on every desk.
• Direct attention to the unit title — "This is Session 1 of 5."

**TEACHER NOTES:**
Lesson 1 of a 5-session unit covering VC2M5N10 (algorithms for factors, multiples, divisibility, LCM/HCF) and VC2M6N02 (prime, composite, square, triangular numbers). Today establishes the foundational skill of systematic factor finding, which underpins all subsequent lessons. The algorithmic thinking framework (divide systematically, record pairs, stop when factors repeat) recurs throughout the unit. Students need fluent multiplication and division facts to access factor finding — the Daily Review and Fluency phases target this prerequisite.

**WATCH FOR:**
• Students who seem unfamiliar with the term "factor" — note for closer monitoring during I Do.
• Readiness signal: students settling quickly with materials ready.

[Maths: Planning | VTLM 2.0: Planning]`;

const NOTES_DR = `**SAY:**
• "Let's warm up with some multiplication and division facts. These are the building blocks we'll use all lesson."
• "Show your answer on your whiteboard when I say GO."
• Ask each problem in turn. After each: "Hold up your boards… and down."

**DO:**
• Display the slide. Read each problem aloud, one at a time.
• Allow 5–8 seconds per problem. Students write answers on whiteboards.
• Scan for accuracy after each hold-up. Briefly correct any common errors.

**CFU CHECKPOINT:**
Technique: Show Me Boards
Script:
• "Write your answer on your board. When I say 'show me,' hold it up high. Ready… show me!"
• Scan for: correct answers on ≥80% of boards.
PROCEED: If ≥80% correct across most problems, move to Fluency.
PIVOT: If widespread errors on division facts (e.g., 72 ÷ 8), pause and model the related multiplication fact: "If I know 8 × 9 = 72, then 72 ÷ 8 must be 9. Multiplication and division are partners." Re-run the missed problem.

**TEACHER NOTES:**
Daily Review targets prerequisite multiplication and division fluency from prior learning. These facts are essential for today's factor-finding algorithm — students who cannot recall 18 ÷ 3 = 6 quickly will struggle to find factor pairs systematically. The problems spiral across tables (×7, ×8, ×9, ×11, ×12) which are typically the last to be automatised. Note: DR content should match your school's scope and sequence — adjust these problems to review whatever was taught in previous weeks.

**WATCH FOR:**
• Students counting on fingers for basic facts — these students need additional fluency support outside the lesson.
• Students confusing multiplication and division (writing 56 for 56 ÷ 7 instead of 8).
• Readiness signal: fast, confident responses on ≥5 of 6 problems.

[Maths: Daily Review | VTLM 2.0: Retention & Recall]`;

const NOTES_FLUENCY = `**SAY:**
• "Fluency time. You have 60 seconds to complete as many as you can. Write your answers quickly — no skipping."
• "Ready? Pencils up… GO."
• After 60 seconds: "Pens down. Let's check. Call out your answer for number 1…"

**DO:**
• Display the slide. Students work silently for 60 seconds on the multiplication chain.
• Time exactly 60 seconds. Say "GO" to start and "STOP" to end.
• Read answers aloud quickly — students self-mark. Ask for hands up: "Who got 10 or more correct?"

**TEACHER NOTES:**
Fluency builds automaticity with multiplication facts — the prerequisite skill for systematic factor finding. This is NOT teaching new content; it is building speed and accuracy on known facts. The multiplication chain format (answer feeds into the next problem) keeps pacing high and discourages skipping. Select problems that target the tables your cohort finds most challenging. If your class has strong ×7/×8/×9 fluency, shift to ×11/×12 or mixed operations.

**WATCH FOR:**
• Students who freeze at the start — they may lack confidence. Encourage: "Just start with the ones you know."
• Students who get stuck on one problem and stop — remind: "Skip it and come back."
• Readiness signal: most students completing 8+ problems in 60 seconds.

[Maths: Fluency | VTLM 2.0: Retention & Recall]`;

const NOTES_LISC = `**SAY:**
• Read from slide: "We are learning to find all the factor pairs of a number using a systematic method so we can describe how numbers are built from multiplication."
• "Let's look at our three success criteria. By the end of the lesson, you should be able to do all three."
• Read each SC aloud. "SC1 is the foundation — everyone will get there. SC2 is our main target. SC3 is for those ready to go further."

**DO:**
• Display the slide. Point to the LI as you read it.
• Point to each SC in turn. Pause after SC2: "This is the big one today."
• Leave this slide visible for 30 seconds so students can read and internalise.

**TEACHER NOTES:**
The LI translates VC2M5N10 ("create and use algorithms involving a sequence of steps and decisions to experiment with factors, multiples and divisibility") into student-friendly language. SC1 targets the prerequisite (division test for factors), SC2 is the core lesson goal (systematic factor pair finding), and SC3 extends to algorithmic representation (flowcharts). The SC are ordered progressively: SC1 → SC2 → SC3. The exit ticket assesses SC1 and SC2 directly, with SC3 as a stretch question. Enabling prompts target SC1 prerequisites; extending prompts target SC3 and beyond.

**WATCH FOR:**
• Students who look confused by the LI — this may indicate the vocabulary "factor pair" or "systematic method" is unfamiliar. The vocabulary slide (next) addresses this.
• Readiness signal: students nodding or whispering the SC to themselves.

[Maths: Planning — Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_VOCAB = `**SAY:**
• "Before we start, let's lock in four key words we'll use all lesson."
• Point to FACTOR: "A factor is a number that divides evenly into another number — no remainder. 3 is a factor of 12 because 12 ÷ 3 = 4 exactly."
• Point to MULTIPLE: "A multiple is what you get when you multiply a number. 12 is a multiple of 3 because 3 × 4 = 12. Factors and multiples are two sides of the same coin."
• Point to DIVISIBLE: "Divisible means 'divides evenly with no remainder.' 12 is divisible by 3."
• Point to FACTOR PAIR: "A factor pair is two numbers that multiply together to make the target. (3, 4) is a factor pair of 12 because 3 × 4 = 12."

**DO:**
• Display the slide. Point to each term and its visual as you explain it.
• After explaining all four: "Turn to your partner. Tell them one thing you noticed about how these four words connect." Allow 20 seconds.

**TEACHER NOTES:**
This vocabulary front-loading reduces cognitive load during the worked example — students won't be processing new terminology AND new procedures simultaneously. The visual representations (array for factor, skip-count sequence for multiple) build schema connections. The Turn & Talk activates student processing and surfaces any confusion before instruction begins. These terms are foundational for the entire unit — they recur in every lesson. Ensure the visual for "factor pair" clearly shows TWO numbers that multiply to give the target.

**MISCONCEPTIONS:**
• Misconception: "Factor and multiple mean the same thing."
  Why: Both involve multiplication/division of the same numbers, so students conflate the direction. "3 is a factor of 12" and "12 is a multiple of 3" describe the same relationship from different perspectives.
  Impact: Students who confuse these will misinterpret questions in lessons 2–5 (e.g., "List the first 5 multiples of 7" vs "List all the factors of 7").
  Quick correction: Use the analogy — "The factor is the small one that goes IN. The multiple is the big one that comes OUT. 3 goes into 12, so 3 is the factor and 12 is the multiple."

**WATCH FOR:**
• Students who say "12 is a factor of 3" (direction reversed) — correct immediately with the "goes into" language.
• Students who nod confidently at "factor" but look blank at "factor pair" — the pair concept is new for many.
• Readiness signal: partners discussing connections between the terms with correct usage.

[Maths: Launch — Explicit Instruction | VTLM 2.0: Explicit Explanation]`;

const NOTES_IDO_WE = `**SAY:**
• "Watch me find ALL the factor pairs of 12. I'm going to use a systematic method — that means I follow the same steps every time, and I'll know exactly when to stop."
• Think-aloud: "I always start by dividing by 1. 12 ÷ 1 = 12. That gives me my first factor pair: (1, 12). Every number has 1 and itself as a factor pair."
• "Next I try 2. 12 ÷ 2 = 6. No remainder, so 2 IS a factor. My second pair is (2, 6)."
• "Now 3. 12 ÷ 3 = 4. That works — pair (3, 4)."
• Decision point: "Now I try 4. But wait — 12 ÷ 4 = 3, and I've ALREADY found 3 in my previous pair. This is my signal to STOP. When I meet a factor I've already recorded, all pairs have been found."
• Self-monitoring: "Let me check: (1,12), (2,6), (3,4). That's 3 pairs, 6 total factors: 1, 2, 3, 4, 6, 12. Does that seem right? 12 is a medium-sized number, so 6 factors feels about right."

**DO:**
• Display the slide. Build the factor pair table step by step — point to each row as you narrate.
• Physically circle the "3 already found" on the table to emphasise the stopping rule.
• Pause after each step to let students process — don't rush through.

**TEACHER NOTES:**
This is the core I Do worked example. The systematic method (divide by 1, 2, 3, 4… and stop when a factor repeats) is the algorithm referenced in VC2M5N10. The think-aloud makes three key reasoning moves visible: (1) the systematic start-from-1 approach, (2) the division test for each candidate, and (3) the stopping rule. The stopping rule is the most conceptually challenging — it relies on understanding that factor pairs are symmetric (if 3 × 4 = 12, then 4 × 3 = 12, so we'd be double-counting). The self-monitoring check at the end models metacognition. This worked example sets the template for the We Do problem pairs that follow.

**MISCONCEPTIONS:**
• Misconception: "I need to test every number up to the target number to find all factors."
  Why: Students don't yet understand why the stopping rule works — they haven't internalised that factor pairs are symmetric.
  Impact: Without the stopping rule, students waste time testing 5, 6, 7, 8, 9, 10, 11 for a number like 12, and the method feels tedious rather than efficient.
  Quick correction: "When I get to 4, the answer is 3 — but I already have 3 from the step before. The pairs are like a mirror: (3, 4) and (4, 3) are the same pair. Once the mirror starts reflecting, I've found them all."

**WATCH FOR:**
• Students who look confused at the stopping rule — this is the threshold concept. If many students look uncertain, plan to revisit it during We Do.
• Students who are already nodding and looking bored — they may have prior knowledge of factor finding. These students are candidates for SC3 (algorithmic flowchart).
• Readiness signal: students watching attentively and some attempting to predict the next step before you say it.

[Maths: Launch — Explicit Instruction (I Do) | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `**SAY:**
• "Quick check before we practise together. I need to see if you understand how to TEST whether a number is a factor."
• "On your whiteboard, write YES or NO: Is 7 a factor of 28? You have 10 seconds."
• After boards up: "The answer is YES. 28 ÷ 7 = 4 exactly — no remainder. So 7 is a factor of 28."
• Ask follow-up (Cold Call): "[Student name], what's the factor pair that includes 7? Right — (7, 4) or equivalently (4, 7)."

**DO:**
• Display the question slide. Give students 10 seconds to write YES or NO.
• Say "Show me!" — scan boards quickly.
• Click to reveal the answer on the next slide.
• Cold call one student for the follow-up factor pair question.

**CFU CHECKPOINT:**
Technique: Show Me Boards (YES/NO)
Script:
• "Write YES or NO on your board. Is 7 a factor of 28? You have 10 seconds. Ready… show me!"
• Scan for: "YES" on ≥80% of boards.
PROCEED: If ≥80% show YES — students understand the division test. Move to We Do problem pairs.
PIVOT: Most likely misconception: students confusing "factor of" with "multiple of" — they may think "Is 28 a factor of 7?" instead. Reteach: "Factor means 'goes into.' Does 7 go into 28? Try dividing: 28 ÷ 7. If the answer is a whole number, YES." Re-check with: "Is 5 a factor of 35? Show me boards."

**TEACHER NOTES:**
This CFU checks SC1 (using division to test whether one number is a factor of another). It is deliberately simpler than the full factor-pair-finding task — it isolates the single-step division test before students need to apply it systematically. The follow-up Cold Call extends to factor pair identification, previewing the We Do. If students pass this check, they have the prerequisite for systematic factor finding. If they fail, the division test itself needs reteaching before any problem pairs.

**WATCH FOR:**
• Students writing "NO" — they may not know 7 × 4 = 28, which is a fluency gap rather than a conceptual gap. Check: "What's 7 × 4?" If they can answer that, redirect: "So does 7 go into 28?"
• Students who write nothing — they may be unsure what "factor" means. Refer them back to the vocabulary slide.
• Readiness signal: fast YES responses with confident board holds.

[Maths: Monitor Progress | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_WEDO1 = `**SAY:**
• "Your turn to help me. We're going to find all the factor pairs of 18 — together."
• Cold Call: "[Student name], what's the first number we always divide by?" [1] "And 18 ÷ 1 = ?" [18] "So our first pair is (1, 18)."
• Cold Call: "[Student name], what do we try next?" [2] "18 ÷ 2 = ?" [9] "Factor pair (2, 9)."
• "Next: 18 ÷ 3 = ?" Ask the whole class to respond chorally. [6] "Pair (3, 6)."
• "Now 18 ÷ 4. Does that work?" [No — 18 ÷ 4 = 4.5, not a whole number] "4 is NOT a factor."
• "18 ÷ 5?" [No — not a whole number] "18 ÷ 6 = 3. But 3 is already in our list. What does that tell us?" [Stop!]
• "Excellent. Three factor pairs: (1, 18), (2, 9), (3, 6)."

**DO:**
• Display the question slide with prompts. Use Cold Call for the first two rows.
• Switch to choral response for rows 3+.
• Click to reveal the completed answer on the next slide.
• Point to each completed pair as you confirm it.

**CFU CHECKPOINT:**
Technique: Cold Call
Script:
• Cold call different students for each step. "Name, what do we divide by next? And what's the answer?"
• Scan for: correct division results and understanding of when a number is NOT a factor.
PROCEED: If students are answering correctly and confidently, move to the second problem pair.
PIVOT: If multiple students give wrong division results, the gap is in multiplication/division fluency, not the factor-finding method. Reteach: return to the I Do table and repeat with 18, narrating the division test more slowly. "18 ÷ 3: I think — what times 3 gives me 18? 3, 6, 9, 12, 15, 18. Yes! 3 × 6 = 18."

**TEACHER NOTES:**
This is Problem Pair 1 — structurally identical to the I Do worked example (find all factor pairs) with different surface features (18 instead of 12). The deep structure is preserved: start from 1, divide systematically, record pairs, stop when a factor repeats. The shift from I Do to We Do is evident: the teacher asks students to supply each step rather than narrating it. Cold Call ensures individual accountability. Note that 18 has a non-factor (4) and a non-factor (5) in the sequence, which tests whether students understand that not every number is a factor — a subtlety the I Do example of 12 partially avoided since its first non-factor doesn't appear until 5.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Provide students with a pre-filled factor pair table for 18 showing the first two rows completed ((1,18) and (2,9)). Students complete the remaining rows with teacher support. This scaffolds the systematic method while reducing the cognitive load of initiating the process.
• Extra Notes: Use the SR1 worksheet with pre-filled scaffolding if available.

EXTENDING PROMPT:
• Task: "Find all factor pairs of 48. How many pairs does it have? Can you predict whether a larger number always has more factor pairs than a smaller number?"
• Extra Notes: This extends to larger numbers and introduces the idea that factor count is not simply related to number size (e.g., 48 has more factors than 47, which has only 1 pair).

**WATCH FOR:**
• Students who say "18 ÷ 4 = 4 remainder 2" — they understand but may not realise that ANY remainder means "not a factor." Confirm: "If there's a remainder, it's not a factor. Full stop."
• Students who want to skip straight from 3 to 6 — they may be guessing rather than testing systematically. Redirect: "We test every number in order. Don't skip."
• Readiness signal: students calling out answers before being Cold Called — they're ahead of the questioning.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_WEDO2 = `**SAY:**
• "One more together, then you're on your own. Find all factor pairs of 24."
• "This time I want you to work on your whiteboards. Write each factor pair as you find it. Start from 1 and work up. When you hit a factor you've already found — stop. You have 90 seconds."
• After 90 seconds: "Boards up. Let's check."
• "Who found (1, 24)? (2, 12)? (3, 8)? (4, 6)? Did anyone test 5? [No — 24 ÷ 5 = 4.8] And 6? [Already found — STOP]."
• "Four factor pairs. 24 has more factors than 18 — interesting."

**DO:**
• Display the question slide. Students work on whiteboards for 90 seconds.
• Circulate quickly — check that students are starting from 1 and working systematically.
• After time: students hold up boards. Click to reveal the answer.
• Compare answers publicly. Celebrate correct responses.

**CFU CHECKPOINT:**
Technique: Show Me Boards (open response)
Script:
• "Write all the factor pairs of 24 on your board. Start from 1, work up, stop when you meet a repeat. 90 seconds. Go!"
• Scan for: correct pairs listed in order, with the correct stopping point.
PROCEED: If ≥80% have all 4 pairs correct — students are ready for independent practice. Move to the Hinge Question as a final gate check.
PIVOT: Most likely misconception: students listing (1,24), (2,12), (3,8), (4,6) AND continuing to (6,4), (8,3), etc. — they haven't internalised the stopping rule. Reteach: "Look — (4, 6) and (6, 4) are the SAME pair, just written in a different order. Once you see a number you've already used, you've found the mirror point. Everything after is a repeat." Re-check: "How many factor pairs does 20 have? Show me." [(1,20), (2,10), (4,5) = 3 pairs]

**TEACHER NOTES:**
Problem Pair 2 with increased student autonomy. The teacher steps back — students work on boards rather than contributing verbally one step at a time. This is the fading of scaffold within the We Do phase: PP1 was heavily guided (Cold Call per step), PP2 gives students 90 seconds to attempt the full process independently before checking. 24 is deliberately chosen because it has more factor pairs than 18 (4 vs 3), testing whether students persist with the systematic method for larger numbers. The non-factor (5) appears mid-sequence, testing the "not a whole number → not a factor → move on" step.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Students who struggled with 18 should work with 12 (the I Do example) on their whiteboard, using the factor pair table from the slide as a reference. Success looks like reproducing the I Do example independently.
• Extra Notes: Seat enabling students near the front so you can check their boards during the 90 seconds.

EXTENDING PROMPT:
• Task: "Find all factor pairs of 72. Then find all factor pairs of 100. Which has more factors? Can a number with more digits always have more factors?"

**WATCH FOR:**
• Students who list pairs but in random order (e.g., (3,8), (1,24), (4,6), (2,12)) — they found the right answers but aren't working systematically. Redirect: "Always start from 1. The system keeps you from missing any."
• Students who stop at (3, 8) and miss (4, 6) — they may have mistakenly thought 3 was already found. Clarify: "3 appears for the first time here. You stop when you find a number in a NEW pair that already appeared in an OLD pair."
• Readiness signal: students finishing in under 60 seconds with all 4 pairs correct.

[Maths: Explore — Guided Practice (We Do) | VTLM 2.0: Scaffold Practice]`;

const NOTES_HINGE = `**SAY:**
• "One last check before you work independently. I need to know if you can spot factors confidently."
• "Look at the four options. Which number is NOT a factor of 30? Hold up 1, 2, 3, or 4 fingers to show your answer. You have 15 seconds to decide."
• After finger vote: "The answer is B — 8. 30 ÷ 8 = 3.75, which is not a whole number. Every other option divides evenly into 30."
• If needed: "A) 5 — yes, 30 ÷ 5 = 6. C) 6 — yes, 30 ÷ 6 = 5. D) 15 — yes, 30 ÷ 15 = 2."

**DO:**
• Display the question slide with four options. Allow 15 seconds.
• "Show me fingers — 1, 2, 3, or 4." Scan the room quickly.
• Click to reveal the answer.
• Briefly explain why each distractor is wrong (or right).

**CFU CHECKPOINT:**
Technique: Finger Voting (1–4)
Script:
• "Hold up the number of fingers matching your answer: 1 for A, 2 for B, 3 for C, 4 for D. Ready… show me!"
• Scan for: 2 fingers (option B) on ≥80% of hands.
PROCEED: If ≥80% choose B — students can distinguish factors from non-factors reliably. Release to You Do.
PIVOT: Most likely misconception — students choosing D (15) because "15 is too big to be a factor of 30." They believe factors must be small numbers. Reteach: "A factor doesn't have to be small. 15 goes into 30 exactly twice: 30 ÷ 15 = 2. Any number that divides evenly is a factor, even if it's close to the number itself. 30 is even a factor of 30!" Re-check: "Is 25 a factor of 50? Thumbs up or down." [Up — 50 ÷ 25 = 2]

**TEACHER NOTES:**
This hinge question tests the threshold concept: can students reliably apply the division test to identify factors vs non-factors? Each distractor maps to a specific misconception. A (5): if chosen, student may be confusing "factor" with "multiple" or guessing. B (8): correct — 8 does not divide evenly into 30. C (6): if chosen, student may be making a computation error (30 ÷ 6 = 5). D (15): if chosen, student likely believes factors must be small numbers less than half the target. The finger-voting technique ensures rapid, whole-class response that the teacher can scan in seconds. This is the final gate before You Do — it must be passed before releasing students to independent work.

**MISCONCEPTIONS:**
• Misconception: "Factors must be smaller than half the number."
  Why: Students overgeneralise from examples where most factors are in the lower half. They haven't seen enough examples where a factor is close to the number itself (e.g., 15 is a factor of 30).
  Impact: Students will miss large factor pairs when finding all factors, leading to incomplete factor pair lists.
  Quick correction: "1 and the number itself are ALWAYS factor pairs. 15 and 2 are a factor pair of 30. Factors come in pairs — one small, one large."

**WATCH FOR:**
• Students who hold up fingers uncertainly or change their answer mid-vote — they're guessing rather than testing. Ask them to do the division on their whiteboard first.
• Students who choose A (5) — this is concerning as 30 ÷ 5 = 6 is a basic fact. May indicate fluency gap.
• Readiness signal: fast, confident finger holds for option B.

[Maths: Monitor Progress — Hinge Question | VTLM 2.0: Monitor Progress (CFU)]`;

const NOTES_YOUDO = `**SAY:**
• "You're ready. Time to find factor pairs on your own."
• Read from slide: "First: Choose a number from the list. Next: Divide by 1, 2, 3, 4… testing each. Record every factor pair. Then: Stop when you meet a factor you've already found."
• "Use the worksheet I'm handing out. Start with the first number and work through as many as you can in 8 minutes."
• "If you finish all four, turn to the challenge question on the back."

**DO:**
• Distribute SR1 worksheet (Factor Pairs Practice).
• Set a visible timer for 8 minutes.
• Circulate — visit enabling students first (back-left table group), then extending students.
• Conference briefly with 2–3 students: "Talk me through your method for this number."

**TEACHER NOTES:**
You Do targets SC2 (find all factor pairs using a systematic method). The worksheet provides structured recording space with a factor pair table for each number. Numbers are sequenced by difficulty: 16 (easy — familiar square number), 20 (moderate), 36 (more pairs), 45 (odd number — tests whether students try even divisors on odd numbers). The challenge question on the back targets SC3 (flowchart representation) and feeds into the extending prompt. Students working on enabling prompts should use the scaffolded version (first pair pre-filled). Circulate to the enabling group first — they need the earliest support.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
• Task: Students work with 12 and 16 only (not the full set). Provide the SR1 worksheet with the first factor pair pre-filled for each number: (1, 12) and (1, 16). Students complete the remaining pairs. If they finish both, they attempt 20.
• Extra Notes: Seat enabling students near the board where the I Do worked example is still visible as a reference.

EXTENDING PROMPT:
• Task: After completing all four numbers, students attempt the EXT1 Perfect Numbers Investigation (companion PDF). This introduces perfect numbers — numbers whose factors (excluding the number itself) sum to the number. Students test numbers systematically to find the first three perfect numbers.
• Extra Notes: Distribute the EXT1 PDF to extending students when they finish the main worksheet. The PDF is self-contained — it teaches the concept, gives worked examples, and sets the investigation task.

**WATCH FOR:**
• Students who skip numbers in their systematic testing (e.g., testing 1, 2, 3, then jumping to 6) — redirect: "Test every number in order. Don't skip."
• Students who forget to stop — they list (1,36), (2,18), (3,12), (4,9), (6,6) and then continue with (9,4), (12,3), etc. Prompt: "Check your last pair. Is 6 already in your list? Then you've found the mirror. Stop."
• Students who record (6, 6) for 36 and wonder if it counts — confirm: "Yes, 6 × 6 = 36, so (6, 6) is a factor pair. When both numbers in the pair are the same, that's called a perfect square. We'll explore that more on Friday."
• Readiness signal: students completing 3+ numbers correctly in 8 minutes.

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
The exit ticket assesses SC1 (Q1: division test for factor), SC2 (Q2: find all factor pairs), and touches SC3 (Q3: explain the stopping rule). Q1 is the minimum — every student should get this right if the lesson succeeded. Q2 is the core target. Q3 is the stretch — students who can articulate the stopping rule in words have deep understanding. Sort responses into three piles after class: (1) SC1 only — need enabling support tomorrow, (2) SC1 + SC2 — on track, (3) all three — ready for extending challenges. Use this data to inform tomorrow's lesson groupings and the Daily Review content.

**WATCH FOR:**
• Students who answer Q1 correctly but struggle with Q2 — they understand the concept but haven't automated the systematic method. Tomorrow's DR should revisit a factor pair example.
• Students who answer Q2 but not Q3 — they can DO the method but can't EXPLAIN it. This is fine for Lesson 1; articulation develops with practice.
• Readiness signal: students finishing Q1 and Q2 within 2 minutes.

[Maths: Summarise — Exit Ticket (Stage 5) | VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_RESOURCES = `**SAY:**
• "Before we wrap up — here are the printable resources for today's lesson. If you're a teacher using this deck, click any link to open the PDF."
• "SR1 is the practice worksheet. SR2 is the answer key. EXT1 is the perfect numbers investigation for extending students."

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
• Read from slide: "SC1: I can use division to check whether one number is a factor of another."
• "Give me a thumbs up, sideways, or down for SC1." Pause and scan. "Most thumbs up — great."
• Read: "SC2: I can find all factor pairs of a whole number by dividing systematically from 1."
• "Thumbs for SC2." Pause and scan. Note any thumbs-down.
• Read: "SC3: I can use a flowchart to organise factor finding and explain when to stop."
• "Thumbs for SC3." Pause. "Some sideways here — that's OK. We'll build on this all week."
• "Turn to your partner: Which success criterion do you feel MOST confident about? Which one do you want to work on tomorrow? 30 seconds."
• "Tomorrow we move to multiples and divisibility rules — the other side of the coin. Well done today."

**DO:**
• Display the closing slide with SC listed. Read each SC aloud.
• Run thumbs up/sideways/down for each SC in turn. Scan and mentally note students who are down on SC2.
• Allow 30 seconds for the Turn & Talk. Listen to 2–3 pairs.
• Close with a brief acknowledgement of effort.

**TEACHER NOTES:**
The closing slide reviews all three SC and uses self-assessment to give the teacher and students a snapshot of where they are. Students who self-assess as "thumbs down" on SC2 should be noted for tomorrow's enabling group. The Turn & Talk prompt deliberately asks about confidence and next steps — this builds metacognition and prepares students for tomorrow's learning. The preview of tomorrow's content (multiples and divisibility) builds anticipation and shows the unit's trajectory. Always end with acknowledgement: "You tackled something new today — that takes effort."

**WATCH FOR:**
• Students who show thumbs-down on SC1 — this is a critical gap. They may need 1:1 conferencing before tomorrow.
• Students who show thumbs-up on all three — confirm in exit ticket data. If genuine, these students are ready for extending challenges tomorrow.
• The Turn & Talk: listen for students who can articulate the stopping rule — this indicates SC3 understanding.

[Maths: Summarise — Closing | VTLM 2.0: Monitor Progress & Feedback]`;

// ── Helper: draw factor pair table on a slide ─────────────────────────────────

function drawFactorTable(slide, x, y, rows, showAnswers) {
  const cols = [
    { header: "Test", w: 0.6 },
    { header: "Division", w: 2.0 },
    { header: "Factor Pair", w: 1.5 },
  ];
  const totalW = cols.reduce((a, c) => a + c.w, 0);
  const hdrH = 0.34;
  const rowH = 0.30;

  // Header row
  let cx = x;
  cols.forEach((col) => {
    slide.addShape("rect", {
      x: cx, y, w: col.w, h: hdrH,
      fill: { color: C.PRIMARY }, line: { color: C.WHITE, width: 1 },
    });
    slide.addText(col.header, {
      x: cx, y, w: col.w, h: hdrH,
      fontSize: 9, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    cx += col.w;
  });

  // Data rows
  rows.forEach((row, ri) => {
    const ry = y + hdrH + ri * rowH;
    const isStop = row.stop;
    cx = x;
    cols.forEach((col, ci) => {
      const fillColor = isStop ? C.ALERT : C.WHITE;
      slide.addShape("rect", {
        x: cx, y: ry, w: col.w, h: rowH,
        fill: { color: fillColor, transparency: isStop ? 85 : 0 },
        line: { color: C.MUTED, width: 0.5 },
      });
      const cellText = ci === 0 ? row.test
        : ci === 1 ? (showAnswers ? row.division : row.prompt || "")
        : (showAnswers ? row.pair : "");
      if (cellText) {
        slide.addText(cellText, {
          x: cx, y: ry, w: col.w, h: rowH,
          fontSize: 10, fontFace: FONT_B,
          color: isStop && showAnswers ? C.ALERT : C.CHARCOAL,
          align: "center", valign: "middle", margin: 0,
          bold: isStop && showAnswers,
        });
      }
      cx += col.w;
    });
  });

  return y + hdrH + rows.length * rowH;
}

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated";
  pres.title = "Factors & Factor Pairs — Session 1";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────
  titleSlide(pres, "Factors & Factor Pairs", "Algorithmic Thinking in Number",
    "Session 1 of 5 | Number Properties | Year 5/6", NOTES_TITLE);

  // ── SLIDE 2: Daily Review (Stage 1) ─────────────────────────────────────
  contentSlide(pres, "Daily Review", C.ACCENT, "Multiplication & Division Facts", [
    "48 ÷ 8 = ?",
    "7 × 9 = ?",
    "72 ÷ 9 = ?",
    "6 × 12 = ?",
    "84 ÷ 12 = ?",
    "11 × 8 = ?",
  ], NOTES_DR, FOOTER, (s) => {
    // Right-side instruction card
    addCard(s, 6.2, CONTENT_TOP + 0.1, 3.2, 1.6, { strip: C.ACCENT });
    s.addText([
      { text: "Show Me Boards", options: { bold: true, breakLine: true, fontSize: 13, color: C.ACCENT } },
      { text: "Write your answer.\nHold up on my signal.", options: { fontSize: 11, color: C.CHARCOAL } },
    ], {
      x: 6.5, y: CONTENT_TOP + 0.2, w: 2.7, h: 1.3,
      fontFace: FONT_B, margin: 0, valign: "top",
    });
  });

  // ── SLIDE 3: Fluency (Stage 1) ─────────────────────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addStageBadge(s, 1, "Fluency");
    addTitle(s, "Multiplication Sprint — 60 Seconds", { color: C.ACCENT });

    // Grid of multiplication problems (4 cols × 3 rows)
    const problems = [
      "7 × 8 =", "9 × 6 =", "12 × 4 =", "8 × 11 =",
      "5 × 9 =", "7 × 12 =", "6 × 8 =", "11 × 7 =",
      "9 × 9 =", "4 × 12 =", "8 × 8 =", "6 × 7 =",
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

  // ── SLIDE 4: LI / SC ──────────────────────────────────────────────────
  liSlide(pres,
    ["We are learning to find all the factor pairs of a number using a systematic method so we can describe how numbers are built from multiplication."],
    [
      "I can use division to check whether one number is a factor of another.",
      "I can find all factor pairs of a whole number by dividing systematically from 1.",
      "I can use a flowchart algorithm to organise factor finding and explain when to stop.",
    ],
    NOTES_LISC, FOOTER);

  // ── SLIDE 5: I Do — Key Vocabulary (Stage 2) ──────────────────────────
  contentSlide(pres, "Stage 2 | I Do", C.PRIMARY, "Key Vocabulary", [], NOTES_VOCAB, FOOTER, (s) => {
    // Four vocabulary cards in a 2×2 grid
    const terms = [
      { word: "Factor", def: "A number that divides evenly into another.\n3 is a factor of 12 because 12 ÷ 3 = 4", color: C.PRIMARY },
      { word: "Multiple", def: "The result of multiplying a number.\n12 is a multiple of 3 because 3 × 4 = 12", color: C.SECONDARY },
      { word: "Divisible", def: "Divides evenly with no remainder.\n12 is divisible by 3", color: C.ACCENT },
      { word: "Factor Pair", def: "Two numbers that multiply to make the target.\n(3, 4) is a factor pair of 12", color: C.ALERT },
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
        x: cx + 0.15, y: cy + 0.12, w: 1.8, h: 0.34, rectRadius: 0.08,
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

  // ── SLIDE 6: I Do — Worked Example: Factors of 12 (Stage 2) ───────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addStageBadge(s, 2, "I Do");
    addTitle(s, "Worked Example: Factor Pairs of 12", { fontSize: 22, color: C.PRIMARY });

    // Problem statement
    addTextOnShape(s, "Find ALL factor pairs of 12", {
      x: 0.5, y: CONTENT_TOP - 0.05, w: 4.2, h: 0.42, rectRadius: 0.08,
      fill: { color: C.BG_DARK },
    }, {
      fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
    });

    // Factor pair table (left side)
    const tableRows = [
      { test: "1", division: "12 ÷ 1 = 12", pair: "(1, 12)", prompt: "12 ÷ 1 = ?" },
      { test: "2", division: "12 ÷ 2 = 6", pair: "(2, 6)", prompt: "12 ÷ 2 = ?" },
      { test: "3", division: "12 ÷ 3 = 4", pair: "(3, 4)", prompt: "12 ÷ 3 = ?" },
      { test: "4", division: "12 ÷ 4 = 3 — STOP!", pair: "3 already found", stop: true },
    ];
    drawFactorTable(s, 0.5, CONTENT_TOP + 0.55, tableRows, true);

    // Summary card (right side)
    addCard(s, 5.2, CONTENT_TOP + 0.1, 4.3, 2.5, { strip: C.SECONDARY });

    s.addText("The Systematic Method", {
      x: 5.4, y: CONTENT_TOP + 0.2, w: 3.9, h: 0.32,
      fontSize: 13, fontFace: FONT_H, color: C.SECONDARY, bold: true, margin: 0,
    });

    s.addText([
      { text: "1.  Start at 1 and divide up", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "2.  Record each factor pair", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "3.  Skip non-factors (remainder)", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
      { text: "4.  STOP when a factor repeats", options: { fontSize: 11, color: C.ALERT, bold: true } },
    ], {
      x: 5.4, y: CONTENT_TOP + 0.62, w: 3.9, h: 1.2,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Factor count summary
    addTextOnShape(s, "12 has 6 factors:  1, 2, 3, 4, 6, 12", {
      x: 5.2, y: CONTENT_TOP + 2.0, w: 4.3, h: 0.45, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    }, {
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
    });

    // "Factor rainbow" visual at bottom
    addCard(s, 0.5, 4.0, 9, 1.0, { strip: C.ACCENT });
    s.addText("Factor Pairs of 12", {
      x: 0.7, y: 4.06, w: 3, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.ACCENT, bold: true, margin: 0,
    });

    // Draw pairs as connected bubbles
    const pairs = [[1, 12], [2, 6], [3, 4]];
    pairs.forEach((p, i) => {
      const bx = 1.0 + i * 2.8;
      const by = 4.38;
      // Left number
      addTextOnShape(s, String(p[0]), {
        x: bx, y: by, w: 0.5, h: 0.45, rectRadius: 0.22,
        fill: { color: C.PRIMARY },
      }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });
      // "×" symbol
      s.addText("×", {
        x: bx + 0.55, y: by, w: 0.3, h: 0.45,
        fontSize: 14, fontFace: FONT_B, color: C.MUTED, align: "center", valign: "middle", margin: 0,
      });
      // Right number
      addTextOnShape(s, String(p[1]), {
        x: bx + 0.9, y: by, w: 0.5, h: 0.45, rectRadius: 0.22,
        fill: { color: C.SECONDARY },
      }, { fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true });
      // "= 12"
      s.addText("= 12", {
        x: bx + 1.45, y: by, w: 0.6, h: 0.45,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_IDO_WE);
  })();

  // ── SLIDES 7–8: CFU 1 — Show Me Boards (withReveal) ───────────────────
  withReveal(
    () => cfuSlide(pres, "CFU", "Quick Check", "Show Me Boards",
      "Is 7 a factor of 28?\n\nWrite YES or NO on your whiteboard.",
      NOTES_CFU1, FOOTER),
    (slide) => {
      addTextOnShape(slide, "YES — because 28 ÷ 7 = 4 (no remainder)", {
        x: 2.5, y: 4.15, w: 5, h: 0.5, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      addTextOnShape(slide, "Factor pair: (7, 4)", {
        x: 3.5, y: 4.72, w: 3, h: 0.35, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, {
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
      });
    }
  );

  // ── SLIDES 9–10: We Do — Problem Pair 1: Factor Pairs of 18 (withReveal)
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Factor Pairs of 18", { fontSize: 22, color: C.SECONDARY });

      // Problem prompt
      addTextOnShape(s, "Find ALL factor pairs of 18", {
        x: 0.5, y: CONTENT_TOP - 0.05, w: 4.2, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_DARK },
      }, {
        fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Empty factor table (prompts only)
      const rows18 = [
        { test: "1", division: "", pair: "", prompt: "18 ÷ 1 = ?" },
        { test: "2", division: "", pair: "", prompt: "18 ÷ 2 = ?" },
        { test: "3", division: "", pair: "", prompt: "18 ÷ 3 = ?" },
        { test: "4", division: "", pair: "", prompt: "18 ÷ 4 = ?" },
        { test: "5", division: "", pair: "", prompt: "18 ÷ 5 = ?" },
        { test: "6", division: "", pair: "", prompt: "18 ÷ 6 = ?" },
      ];
      drawFactorTable(s, 0.5, CONTENT_TOP + 0.55, rows18, false);

      // Instruction card (right)
      addCard(s, 5.2, CONTENT_TOP + 0.3, 4.3, 2.0, { strip: C.SECONDARY });
      s.addText([
        { text: "Your turn to help!", options: { bold: true, breakLine: true, fontSize: 13, color: C.SECONDARY } },
        { text: "I'll Cold Call — be ready.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Divide by each number.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "Record factor pairs.", options: { breakLine: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "When do we stop?", options: { fontSize: 11, color: C.ALERT, bold: true } },
      ], {
        x: 5.4, y: CONTENT_TOP + 0.4, w: 3.9, h: 1.6,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO1);
      return s;
    },
    (slide) => {
      // Reveal: completed factor table overlay — fully covers instruction card
      addCard(slide, 5.2, CONTENT_TOP + 0.3, 4.3, 3.5, { strip: C.SUCCESS });
      slide.addText("Factor Pairs of 18", {
        x: 5.4, y: CONTENT_TOP + 0.4, w: 3.9, h: 0.3,
        fontSize: 13, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });
      const answers = [
        "(1, 18)  ✓", "(2, 9)  ✓", "(3, 6)  ✓",
        "4 — not a factor (4.5)", "5 — not a factor (3.6)",
        "6 — already found → STOP",
      ];
      answers.forEach((a, i) => {
        const isStop = i === 5;
        const isNotFactor = i === 3 || i === 4;
        slide.addText(a, {
          x: 5.6, y: CONTENT_TOP + 0.8 + i * 0.32, w: 3.7, h: 0.28,
          fontSize: 11, fontFace: FONT_B, margin: 0,
          color: isStop ? C.ALERT : (isNotFactor ? C.MUTED : C.CHARCOAL),
          bold: isStop, italic: isNotFactor,
        });
      });

      addTextOnShape(slide, "3 factor pairs found", {
        x: 5.4, y: SAFE_BOTTOM - 0.55, w: 3.8, h: 0.42, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, {
        fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── SLIDES 11–12: We Do — Problem Pair 2: Factor Pairs of 24 (withReveal)
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addStageBadge(s, 3, "We Do");
      addTitle(s, "Factor Pairs of 24", { fontSize: 22, color: C.SECONDARY });

      addTextOnShape(s, "Find ALL factor pairs of 24", {
        x: 0.5, y: CONTENT_TOP - 0.05, w: 4.2, h: 0.42, rectRadius: 0.08,
        fill: { color: C.BG_DARK },
      }, {
        fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
      });

      // Instruction card (LEFT side — leaves right side for reveal)
      addCard(s, 0.5, CONTENT_TOP + 0.55, 4.5, 3.2, { strip: C.SECONDARY });
      s.addText([
        { text: "On your whiteboard:", options: { bold: true, breakLine: true, fontSize: 14, color: C.SECONDARY } },
        { text: "Divide 24 by 1, 2, 3, 4, 5, 6…", options: { breakLine: true, fontSize: 13, color: C.CHARCOAL } },
        { text: "Record each factor pair you find.", options: { breakLine: true, fontSize: 13, color: C.CHARCOAL } },
        { text: "Stop when you meet a factor already found.", options: { breakLine: true, fontSize: 13, color: C.CHARCOAL } },
        { text: "You have 90 seconds.", options: { fontSize: 13, color: C.ALERT, bold: true } },
      ], {
        x: 0.75, y: CONTENT_TOP + 0.7, w: 4.0, h: 2.2,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Large number display (RIGHT side)
      addTextOnShape(s, "24", {
        x: 6.0, y: CONTENT_TOP + 0.8, w: 3.0, h: 2.2, rectRadius: 0.15,
        fill: { color: C.PRIMARY },
      }, {
        fontSize: 72, fontFace: FONT_H, color: C.WHITE, bold: true,
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
      // Reveal answer card (RIGHT side — doesn't overlap left instructions)
      addCard(slide, 5.2, CONTENT_TOP + 0.55, 4.3, 3.2, { strip: C.SUCCESS });
      slide.addText("Factor Pairs of 24", {
        x: 5.4, y: CONTENT_TOP + 0.65, w: 3.9, h: 0.3,
        fontSize: 14, fontFace: FONT_H, color: C.SUCCESS, bold: true, margin: 0,
      });

      const pairs24 = ["(1, 24)", "(2, 12)", "(3, 8)", "(4, 6)"];
      pairs24.forEach((p, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        addTextOnShape(slide, p, {
          x: 5.5 + col * 2.0, y: CONTENT_TOP + 1.1 + row * 0.6, w: 1.8, h: 0.45, rectRadius: 0.08,
          fill: { color: C.PRIMARY },
        }, {
          fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
        });
      });

      slide.addText([
        { text: "5 — not a factor (4.8)", options: { breakLine: true, italic: true, fontSize: 10, color: C.MUTED } },
        { text: "6 — already found → STOP", options: { fontSize: 10, color: C.ALERT, bold: true } },
      ], {
        x: 5.5, y: CONTENT_TOP + 2.4, w: 3.8, h: 0.5,
        fontFace: FONT_B, margin: 0,
      });

      addTextOnShape(slide, "4 pairs — 8 total factors", {
        x: 5.5, y: CONTENT_TOP + 3.0, w: 3.8, h: 0.38, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, {
        fontSize: 12, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    }
  );

  // ── SLIDES 13–14: CFU Hinge Question (withReveal) ──────────────────────
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.ALERT);
      addBadge(s, "Hinge Question", { color: C.ALERT, w: 2.2 });
      addTitle(s, "Which is NOT a factor of 30?", { color: C.ALERT });

      // Four option cards
      const options = [
        { letter: "A", value: "5", color: C.PRIMARY },
        { letter: "B", value: "8", color: C.SECONDARY },
        { letter: "C", value: "6", color: C.ACCENT },
        { letter: "D", value: "15", color: C.SUCCESS },
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
      addTextOnShape(s, "Hold up 1, 2, 3, or 4 fingers", {
        x: 2.5, y: CONTENT_TOP + 2.3, w: 5, h: 0.42, rectRadius: 0.08,
        fill: { color: C.ALERT },
      }, {
        fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_HINGE);
      return s;
    },
    (slide) => {
      // Reveal: highlight B as correct — cover the red "Hold up fingers" bar
      addTextOnShape(slide, "B — 8 is NOT a factor of 30", {
        x: 1.5, y: CONTENT_TOP + 2.2, w: 7, h: 0.55, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      slide.addText("30 ÷ 8 = 3.75 — not a whole number, so 8 does NOT divide evenly into 30.", {
        x: 1.5, y: CONTENT_TOP + 2.85, w: 7, h: 0.4,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      slide.addText("A) 30 ÷ 5 = 6 ✓    C) 30 ÷ 6 = 5 ✓    D) 30 ÷ 15 = 2 ✓", {
        x: 1.5, y: CONTENT_TOP + 3.25, w: 7, h: 0.25,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });
    }
  );

  // ── SLIDE 15: You Do — Independent Practice (Stage 4) ─────────────────
  contentSlide(pres, "Stage 4 | You Do", C.ALERT, "Independent Practice: Factor Pairs", [], NOTES_YOUDO, FOOTER, (s) => {
    // First / Next / Then instruction card
    addCard(s, 0.5, CONTENT_TOP, 5.2, 2.2, { strip: C.ALERT });

    const steps = [
      { label: "First:", text: "Choose a number from the list." },
      { label: "Next:", text: "Divide by 1, 2, 3… Record each factor pair." },
      { label: "Then:", text: "Stop when you meet a factor already found." },
    ];
    steps.forEach((st, i) => {
      const sy = CONTENT_TOP + 0.15 + i * 0.65;
      s.addText([
        { text: st.label + " ", options: { bold: true, fontSize: 13, color: C.ALERT } },
        { text: st.text, options: { fontSize: 13, color: C.CHARCOAL } },
      ], {
        x: 0.75, y: sy, w: 4.7, h: 0.5,
        fontFace: FONT_B, margin: 0, valign: "middle",
      });
    });

    // Number cards (right side)
    s.addText("Find all factor pairs of:", {
      x: 6.0, y: CONTENT_TOP, w: 3.5, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, bold: true, margin: 0,
    });
    const numbers = [16, 20, 36, 45];
    numbers.forEach((n, i) => {
      const nx = 6.0 + (i % 2) * 1.8;
      const ny = CONTENT_TOP + 0.45 + Math.floor(i / 2) * 0.9;
      addTextOnShape(s, String(n), {
        x: nx, y: ny, w: 1.5, h: 0.7, rectRadius: 0.1,
        fill: { color: C.PRIMARY },
      }, {
        fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
    });

    // SC reference card at bottom
    addCard(s, 0.5, 3.5, 9, 1.4, { strip: C.ACCENT });
    s.addText("Success Criteria Check", {
      x: 0.75, y: 3.58, w: 3, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.ACCENT, bold: true, margin: 0,
    });
    s.addText([
      { text: "SC1: I can use division to test whether one number is a factor of another.", options: { breakLine: true, fontSize: 10, color: C.CHARCOAL } },
      { text: "SC2: I can find all factor pairs by dividing systematically from 1.", options: { fontSize: 10, color: C.CHARCOAL } },
    ], {
      x: 0.75, y: 3.9, w: 8.5, h: 0.8,
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

  // ── SLIDE 16: Exit Ticket (Stage 5) ───────────────────────────────────
  exitTicketSlide(pres, [
    "Is 9 a factor of 54? Explain how you know.",
    "Find all factor pairs of 28. Show your systematic method.",
    "Challenge: How do you know when you've found ALL the factor pairs? Explain the stopping rule.",
  ], NOTES_EXIT, FOOTER);

  // ── SLIDE 17: Resources ───────────────────────────────────────────────
  addResourceSlide(pres, [
    {
      name: "SR1 — Factor Pairs Practice Worksheet",
      fileName: "SR1_Factor_Pairs_Worksheet.pdf",
      description: "Independent practice — find factor pairs of 4 numbers. Scaffolded version included.",
    },
    {
      name: "SR2 — Factor Pairs Answer Key",
      fileName: "SR2_Factor_Pairs_Answers.pdf",
      description: "Answer key for SR1. For teacher reference.",
    },
    {
      name: "EXT1 — Perfect Numbers Investigation",
      fileName: "EXT1_Perfect_Numbers_Investigation.pdf",
      description: "Self-contained extending resource for students who finish early.",
    },
  ], { C, FONT_H, FONT_B }, FOOTER, NOTES_RESOURCES);

  // ── SLIDE 18: Closing ─────────────────────────────────────────────────
  closingSlide(pres,
    "Which success criterion do you feel MOST confident about? Which one do you want to work on tomorrow? Turn to your partner — 30 seconds.",
    [
      "SC1: I can use division to check whether one number is a factor of another.",
      "SC2: I can find all factor pairs by dividing systematically from 1.",
      "SC3: I can use a flowchart to organise factor finding and explain when to stop.",
      "Tomorrow: Multiples and divisibility rules — the other side of the coin.",
    ],
    NOTES_CLOSING);

  // ── Write PPTX ──────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: OUT_DIR + "/FM_Lesson1_Factors_Factor_Pairs.pptx" });
  console.log("PPTX written to " + OUT_DIR);

  // ── Generate companion PDFs ────────────────────────────────────────────
  await generateWorksheet();
  await generateAnswerKey();
  await generateExtendingPdf();
  console.log("All PDFs generated.");
}

// ── PDF: SR1 — Factor Pairs Practice Worksheet ────────────────────────────────

async function generateWorksheet() {
  const doc = createPdf({ title: "Factor Pairs Practice Worksheet" });

  let y = addPdfHeader(doc, "Factor Pairs Practice", {
    subtitle: "SR1 — Supporting Resource",
    color: C.PRIMARY,
    lessonInfo: "Session 1 of 5 | Factors & Multiples | Year 5/6 Maths",
  });

  y = addTipBox(doc, "Remember: Start at 1 and divide up. Record each factor pair. STOP when you meet a factor you've already found.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Section A: Find All Factor Pairs", y, { color: C.PRIMARY });

  // Problem 1: 16
  y = addProblem(doc, 1, "Find all factor pairs of 16.", y, {
    writeLines: [
      { label: "Factor pair 1:" },
      { label: "Factor pair 2:" },
      { label: "Factor pair 3:" },
      { label: "I stopped at:" },
    ],
    color: C.PRIMARY,
  });

  // Problem 2: 20
  y = addProblem(doc, 2, "Find all factor pairs of 20.", y, {
    writeLines: [
      { label: "Factor pair 1:" },
      { label: "Factor pair 2:" },
      { label: "Factor pair 3:" },
      { label: "I stopped at:" },
    ],
    color: C.PRIMARY,
  });

  // Problem 3: 36
  y = addProblem(doc, 3, "Find all factor pairs of 36.", y, {
    writeLines: [
      { label: "Factor pair 1:" },
      { label: "Factor pair 2:" },
      { label: "Factor pair 3:" },
      { label: "Factor pair 4:" },
      { label: "Factor pair 5:" },
      { label: "I stopped at:" },
    ],
    color: C.PRIMARY,
  });

  // Problem 4: 45
  y = addProblem(doc, 4, "Find all factor pairs of 45.", y, {
    writeLines: [
      { label: "Factor pair 1:" },
      { label: "Factor pair 2:" },
      { label: "Factor pair 3:" },
      { label: "I stopped at:" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Section B: Challenge (SC3)", y, { color: C.ACCENT });
  y = addBodyText(doc, "Draw a simple flowchart that shows the steps for finding all factor pairs of ANY number. Include the starting step, the division test, recording pairs, and the stopping rule.", y);
  y = addLinedArea(doc, y + 5, 8);

  addPdfFooter(doc, "Session 1 of 5 | Factors & Multiples | Year 5/6 Maths");
  await writePdf(doc, OUT_DIR + "/SR1_Factor_Pairs_Worksheet.pdf");
  console.log("  SR1 worksheet written.");
}

// ── PDF: SR2 — Factor Pairs Answer Key ────────────────────────────────────────

async function generateAnswerKey() {
  const doc = createPdf({ title: "Factor Pairs Answer Key" });

  let y = addPdfHeader(doc, "Factor Pairs — Answer Key", {
    subtitle: "SR2 — Teacher Reference",
    color: C.PRIMARY,
    lessonInfo: "Session 1 of 5 | Factors & Multiples | Year 5/6 Maths",
    showNameDate: false,
  });

  y = addSectionHeading(doc, "Section A: Factor Pairs", y, { color: C.PRIMARY });

  y = addProblem(doc, 1, "Factor pairs of 16:", y, {
    writeLines: [
      { label: "Factor pair 1:", answer: "(1, 16)" },
      { label: "Factor pair 2:", answer: "(2, 8)" },
      { label: "Factor pair 3:", answer: "(4, 4)" },
      { label: "I stopped at:", answer: "4 — because 4 × 4 = 16 (same number appears twice)" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 2, "Factor pairs of 20:", y, {
    writeLines: [
      { label: "Factor pair 1:", answer: "(1, 20)" },
      { label: "Factor pair 2:", answer: "(2, 10)" },
      { label: "Factor pair 3:", answer: "(4, 5)" },
      { label: "I stopped at:", answer: "5 — because 5 already appeared in (4, 5)" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 3, "Factor pairs of 36:", y, {
    writeLines: [
      { label: "Factor pair 1:", answer: "(1, 36)" },
      { label: "Factor pair 2:", answer: "(2, 18)" },
      { label: "Factor pair 3:", answer: "(3, 12)" },
      { label: "Factor pair 4:", answer: "(4, 9)" },
      { label: "Factor pair 5:", answer: "(6, 6)" },
      { label: "I stopped at:", answer: "6 — same number appears twice (perfect square)" },
    ],
    color: C.PRIMARY,
  });

  y = addProblem(doc, 4, "Factor pairs of 45:", y, {
    writeLines: [
      { label: "Factor pair 1:", answer: "(1, 45)" },
      { label: "Factor pair 2:", answer: "(3, 15)" },
      { label: "Factor pair 3:", answer: "(5, 9)" },
      { label: "I stopped at:", answer: "6 — because 45 ÷ 6 = 7.5 (not a factor), then 7 — 45 ÷ 7 ≈ 6.4 (not a factor), then 8 — not a factor, then 9 — already found in (5, 9)" },
    ],
    color: C.PRIMARY,
  });

  y = addSectionHeading(doc, "Section B: Flowchart (SC3) — Suggested Answer", y, { color: C.ACCENT });
  y = addBodyText(doc, "Start → Set test number to 1 → Divide target by test number → Does it divide evenly? → YES: Record factor pair → Is the result a number already in your list? → YES: STOP (all pairs found) → NO: Increase test number by 1 → Repeat. If NO at the division step: Increase test number by 1 → Repeat.", y);

  addPdfFooter(doc, "Teacher Reference — Do Not Distribute to Students");
  await writePdf(doc, OUT_DIR + "/SR2_Factor_Pairs_Answers.pdf");
  console.log("  SR2 answer key written.");
}

// ── PDF: EXT1 — Perfect Numbers Investigation ─────────────────────────────────

async function generateExtendingPdf() {
  const doc = createPdf({ title: "Perfect Numbers Investigation" });

  let y = addPdfHeader(doc, "Perfect Numbers Investigation", {
    subtitle: "EXT1 — Extending Challenge",
    color: C.ACCENT,
    lessonInfo: "Session 1 of 5 | Factors & Multiples | Year 5/6 Maths",
  });

  y = addSectionHeading(doc, "What is a Perfect Number?", y, { color: C.ACCENT });
  y = addBodyText(doc, "A perfect number is a very special kind of number. It equals the sum of all its factors EXCEPT itself. These numbers are extremely rare — mathematicians have been fascinated by them for over 2,000 years!", y);

  y = addSectionHeading(doc, "Worked Example: Is 6 a Perfect Number?", y, { color: C.ACCENT });
  y = addBodyText(doc, "Step 1: Find all the factors of 6 (not including 6 itself).", y);
  y = addBodyText(doc, "The factors of 6 are: 1, 2, 3, 6. Removing 6 itself, we get: 1, 2, 3.", y);
  y = addBodyText(doc, "Step 2: Add them up.  1 + 2 + 3 = 6", y);
  y = addBodyText(doc, "Step 3: Compare. The sum (6) equals the number (6). YES — 6 is a perfect number!", y);

  y = addTipBox(doc, "Key idea: We add all the factors EXCEPT the number itself. If the total equals the number, it's perfect!", y, { color: C.ACCENT });

  y = addSectionHeading(doc, "Worked Example: Is 8 a Perfect Number?", y, { color: C.ACCENT });
  y = addBodyText(doc, "Factors of 8 (not including 8): 1, 2, 4.", y);
  y = addBodyText(doc, "Sum: 1 + 2 + 4 = 7. Since 7 ≠ 8, the number 8 is NOT perfect.", y);

  y = addSectionHeading(doc, "Your Investigation", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Test each number below. Find its factors (not including itself), add them up, and check if the sum equals the number. The first three perfect numbers are hiding in this list!", y);

  const testNumbers = [10, 12, 14, 15, 20, 21, 28];
  testNumbers.forEach((n, i) => {
    y = addProblem(doc, i + 1, `Is ${n} a perfect number?`, y, {
      writeLines: [
        { label: `Factors of ${n} (not including ${n}):` },
        { label: "Sum of factors:" },
        { label: "Perfect? (YES / NO):" },
      ],
      color: C.PRIMARY,
    });
  });

  y = addSectionHeading(doc, "Did You Know?", y, { color: C.ACCENT });
  y = addBodyText(doc, "The ancient Greek mathematician Euclid discovered that perfect numbers follow a pattern connected to prime numbers. The first four perfect numbers are 6, 28, 496, and 8128. As of 2024, only 51 perfect numbers have ever been found — and mathematicians still don't know if there are infinitely many!", y);

  y = addTipBox(doc, "Bonus challenge: Can you find 496? It has factors 1, 2, 4, 8, 16, 31, 62, 124, 248. Check: do they sum to 496?", y, { color: C.SECONDARY });

  addPdfFooter(doc, "Session 1 of 5 | Factors & Multiples | Year 5/6 Maths — Extending Investigation");
  await writePdf(doc, OUT_DIR + "/EXT1_Perfect_Numbers_Investigation.pdf");
  console.log("  EXT1 extending investigation written.");
}

// ── Main ──────────────────────────────────────────────────────────────────────
build().catch((err) => { console.error(err); process.exit(1); });
