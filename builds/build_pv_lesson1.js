// Lesson 1 of 10: Whole Numbers Using Proportional Materials
// Grade 3/4 Mathematics — Extend Place Value & Additive Thinking
// Uses shared helpers from pv_helpers.js and pv_palette.js

"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");

const {
  C, FONT_H, FONT_B, STAGE_COLORS,
  SAFE_BOTTOM, CONTENT_TOP,
  addTopBar, addBadge, addStageBadge, addTitle, addCard, addFooter,
  addPlaceValueChart,
  titleSlide, liSlide, contentSlide, workedExSlide, cfuSlide,
  exitTicketSlide, closingSlide,
} = require("../themes/pv_helpers");

const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addProblem, addTipBox, addPdfFooter,
  addResourceSlide,
} = require("../themes/pdf_helpers");

const OUT_DIR = "output/Lesson_PV1_Proportional_Materials";

const FOOTER = "Lesson 1 of 10  |  Extend Place Value & Additive Thinking  |  Grade 3/4 Maths";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes strings (kept as constants to keep build() readable)
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_SLIDE1 = `SAY:
• "Welcome to our place value unit. Over ten lessons we will build understanding of numbers all the way through to decimals. Today we start by making sure our foundations are rock-solid — using blocks and charts to represent large whole numbers."
• "By the end of today you will be able to make, read, write and represent any whole number greater than 10 000."

DO:
• Display the title slide while students are settling. Have base-10 blocks available on every table.
• Direct students' attention to the lesson number and unit title.

TEACHER NOTES:
This title slide sets the scene for the ten-lesson arc. Lesson 1 is diagnostic as much as instructional — use Stage 1 to quietly assess which students have solid hundreds understanding and which are still shaky. Base-10 proportional materials are essential for Stages 1–2 because they make the ten-times relationship physically visible (ten ones literally combine into one ten rod). VTLM 2.0 element: Concrete-Representational-Abstract (CRA) continuum — we begin at Concrete today.

WATCH FOR:
• Students who begin without blocks — prompt "show me with your blocks first, then write."
• Students who are unfamiliar with whiteboard routines — practise the Show Me signal now.

[Maths: Stage 2 | VTLM 2.0: Concrete-Representational-Abstract]`;

const NOTES_SLIDE2 = `SAY:
• "Here is what we are going to learn and how we will know we have learned it."
• "The Learning Intention tells us the big idea. The Success Criteria tell us exactly what being successful looks like today — you can use these as a checklist."
• Read each criterion aloud and briefly explain: (1) using blocks means concrete, (2) numerals and words means we can move between representations, (3) expanded form unpacks the value of each digit.

DO:
• Point to each criterion as you read.
• Leave this slide up briefly so students can note the criteria in their workbooks if required by your school protocol.

TEACHER NOTES:
Sharing learning intentions explicitly activates students' metacognitive awareness and tells them what to pay attention to. The three success criteria map to the three representations in the CRA framework: blocks (concrete), numerals and words (representational), expanded form (abstract). Returning to these criteria at the exit ticket creates a closing loop. VTLM 2.0 element: Making Learning Visible.

WATCH FOR:
• Students copying the LI/SC mechanically without reading — pause and do a brief think-aloud: "What does expanded form mean? Let's think…"

[Maths: Stage 2 | VTLM 2.0: Making Learning Visible]`;

const NOTES_SLIDE3 = `SAY:
• "Before we go further, let's warm up our place value brains. I am going to write three numbers on the board. For each one: make it with your base-10 blocks, then write it in words on your whiteboard."
• Write 300, 170, 529 one at a time. Give 60–90 seconds per number before asking for Show Me.
• After each Show Me: "Tell me what you see on the boards around you. Are they the same? Different?"

DO:
• Write numbers large on the board or whiteboard — not on the slide, so students stay engaged with you.
• Circulate during making time to spot-check block arrangements before Show Me signal.
• After the three numbers: "Now I will say a number — don't make it yet — just listen. Four hundred and five."
• Pause. "Now make it. Now write it."
• Choose a non-volunteer to explain: "I have ____ hundreds, ____ tens and ____ ones."

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "Boards up in 3, 2, 1 — Show Me!" for each of 300, 170, 529.
• Scan left-to-right across the room. Look for: correct digit order, correct spelling of the word form (particularly "one hundred and seventy" vs "one hundred seventy").
• For 405 specifically, look for whether students write "four hundred and five" or incorrectly write "four hundred five" — both are acceptable in Australian English but note any who write "four hundred and fifty" (transposition error).
PROCEED: If ≥ 80% show correct numeral and plausible word form, transition to Slide 4 (zero placeholder debrief).
PIVOT: If students write 4005 or 450 for 405 — the most common error is misreading the spoken form and omitting or misplacing the zero. Reteach from a different angle: draw a blank place value chart (Hundreds | Tens | Ones) on the board. Say "Four hundred" — fill in 4. "And five — which column? Show me." Students point to the ones. "What goes in tens?" Students answer zero. Build the chart first, then write the numeral from it. Re-check with Show Me.

TEACHER NOTES:
This warm-up is diagnostic. 300 (round hundreds), 170 (zero ones), and 529 (all columns filled) form a deliberate progression. Students who struggle with 170 likely have a place-holder misconception — they may write 17 or write "one hundred and seventy" but make 1 hundreds rod and 7 tens (correct) yet then write 170 on the board (correct) — watch whether the match between blocks and written form is consistent. 405 is the key diagnostic: it tests whether students understand zero as a placeholder in the tens position. VTLM 2.0 element: Formative assessment through Show Me Boards.

WATCH FOR:
• Students making 529 as 5 flats + 2 longs + 9 ones correctly but writing "five hundred twenty-nine" — Australian convention includes "and": "five hundred and twenty-nine." Accept both but model the "and."
• Students who complete quickly — prompt: "Can you write the expanded form? 500 + 20 + 9."

[Maths: Stage 2 — place value to hundreds | VTLM 2.0: Formative assessment]`;

const NOTES_SLIDE4 = `SAY:
• "Now I am going to write two numbers that look similar. Watch carefully." Write "Six hundred and eighty" and "Six hundred and eight" side by side.
• "Make each one with your blocks. Then write the numeral on your whiteboard."
• After Show Me: "Who can tell me the difference between 680 and 608? Don't tell me the answer — tell me WHERE the difference is."
• Deliver the key explanation: "680 has 6 hundreds, 8 tens and 0 ones. 608 has 6 hundreds, 0 tens and 8 ones. The zero is not nothing — it is a place holder. It holds the tens column open so the 8 sits in the right place."

DO:
• Write both number-words visibly. Underline the key word in each: "eighty" vs "eight."
• After explanation, write on board: 680 vs 608. Draw arrows to the zero in each and label: "place holder."
• Have students chorally repeat: "Zero is a place holder."

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "Write the numeral for 'Six hundred and eight' on your board. Boards up — Show Me!"
• Look specifically for 608 vs 680 vs 68. Any student writing 68 has omitted the placeholder entirely.
• Ask: "What is in the tens column of 608?" Students answer "zero" — if they say "nothing," correct gently: "Zero is something — it is a place holder."
PROCEED: If ≥ 80% correctly write 608 and can articulate the zero's role, move to Stage 2.
PIVOT: If students consistently write 68 — they are treating zero as meaning "nothing to write." Reteach from a different angle: use a physical place value mat with labelled columns. Have the student place 6 hundreds blocks in the hundreds column, then count out loud: "Hundreds… now tens — how many tens? Zero. I must write a zero here to show I looked." Place a 0 card in the tens column. "Now ones — 8." Place 8. Read back together. Re-check with a new number (e.g., 507).

MISCONCEPTIONS:
• Misconception: Zero means "skip that column" — students write 68 instead of 608.
  Why: Students have learned that leading/trailing zeros "don't count" and overgeneralise this to interior zeros.
  Impact: Systematic errors in all large-number work: 3050 becomes 35, 40 600 becomes 46, etc.
  Quick correction: Use a physical column mat and make students physically place a zero card before moving on. The tactile step interrupts the skip habit.

• Misconception: "Eighty" and "eight" are the same — students write 680 for "six hundred and eight."
  Why: Auditory discrimination between "-ty" and the base number is hard, especially for EAL/D students.
  Impact: Reading numbers from words becomes unreliable across the whole unit.
  Quick correction: Write both on board. Say them slowly, emphasising the "-ty" suffix. Have students echo. Link to times tables: "Eighty is 8 × 10."

TEACHER NOTES:
The zero place holder is one of the most persistently misunderstood concepts in place value. Students who grasp it at the hundreds level will transfer the understanding to larger numbers in Stage 2. The side-by-side presentation of 680 and 608 is deliberate — minimal pairs make the conceptual difference maximally visible. This connects to the DECIDE framework's spiral: we return to zero as placeholder in Lesson 3 (rounding) and Lesson 5 (decimals). VTLM 2.0 element: Conceptual understanding through comparison.

WATCH FOR:
• EAL/D students who may hear "six hundred and eight" and write 6008 — they have correctly identified three parts (600, 0, 8) but miscount the columns. Provide a pre-drawn chart.
• Students who write 608 correctly but make it with blocks as 6 hundreds + 8 ones (no zero block) — this is actually correct since there is no zero block in a base-10 set, but check that they can explain why the tens column is empty.

[Maths: Stage 2 — place value, zero as placeholder | VTLM 2.0: Conceptual understanding]`;

const NOTES_SLIDE5 = `SAY:
• "Now let us look at how the place value system is built. Every time we move one column to the left, the value becomes ten times bigger."
• Point to each relationship in turn: "10 ones make 1 ten. 10 tens make 1 hundred. 10 hundreds make 1 thousand. 10 thousands make 10 thousand — we sometimes call this ten-thousands."
• "This is not a coincidence — it is the structure of our number system. It is called a base-10 system because everything is grouped in tens."
• "With base-10 blocks, you can actually SEE this. The ones cube is tiny. Ten of them snap together to make the tens rod. Ten rods make the hundreds flat. Ten flats make the thousands cube."

DO:
• If you have a large demonstration set of base-10 blocks, hold them up in sequence as you explain each relationship.
• Point to the visual on the slide as you say each step.
• Have students echo each relationship chorally: "10 ones make… 1 ten!"

TEACHER NOTES:
The multiplicative structure of place value (each position is ten times the previous) is the key mathematical idea of this unit. Many students have additive understanding (ones, tens, hundreds are just labels) but not multiplicative understanding (each position is genuinely ten times bigger). This slide makes the multiplicative relationship explicit before students encounter five-digit numbers. Connecting blocks to the diagram is essential — the diagram alone is abstract. VTLM 2.0 element: Making connections between representations.

WATCH FOR:
• Students who can recite the relationships but cannot explain why — probe with "How many ones rods would you need to make one thousands cube?" (Answer: 1,000 — this tests multiplicative understanding).
• Students who confuse "ten thousands" with "a thousand tens" — both are correct but the latter phrasing sometimes causes confusion later. Standardise: "ten-thousands column."

[Maths: Stage 2 — multiplicative structure of place value | VTLM 2.0: Making connections]`;

const NOTES_SLIDE6 = `SAY:
• "Watch me build a 4-digit number. I am going to use 3 thousands blocks, 4 hundreds, 5 tens and 8 ones."
• Point to the place value chart on the right: "I record this in the chart — 3 in the thousands, 4 in the hundreds, 5 in the tens, 8 in the ones."
• "The numeral is 3 458. Notice: I leave a small gap between 3 and 458 — this makes thousands easier to read."
• "Now I will write it in expanded form: 3 000 + 400 + 50 + 8. Each term tells me the value of one digit."
• "And in words: three thousand, four hundred and fifty-eight."
• "Three representations — blocks, numeral, words. They all show the same number."

DO:
• Physically build 3 458 with blocks on the document camera or demonstration area as you talk.
• Fill in the chart column by column, naming each as you go.
• Write all three representations on the board and draw arrows between them.

TEACHER NOTES:
This is the anchor worked example for four-digit numbers. The deliberate sequencing (blocks → chart → numeral → words → expanded form) follows the CRA continuum and builds the representational fluency students need for five-digit numbers on the next slide. Writing expanded form is often skipped in primary maths — include it explicitly here as it directly supports understanding of place value and later work on addition strategies. The gap in "3 458" is an Australian mathematical convention taught in this unit. VTLM 2.0 element: Multiple representations — concrete, representational, abstract.

WATCH FOR:
• Students who write expanded form as 3 + 4 + 5 + 8 (face values, not place values) — correct immediately: "What is the value of the 3? Not 3 — it is 3 thousands, so 3 000."
• Students who write 3458 without the gap — remind them: thousands gap is standard convention in Australian maths.

[Maths: Stage 2 — four-digit numbers, multiple representations | VTLM 2.0: CRA continuum]`;

const NOTES_SLIDE7 = `SAY:
• "Now we move to numbers bigger than ten thousand. We need a new column — the ten-thousands column."
• "Look at our chart. It now has five columns: Ten Thousands, Thousands, Hundreds, Tens, Ones."
• Point to the chart showing 35 628: "I read this in two parts. First the thousands group — 3 in the ten-thousands, 5 in the thousands — so I say 'thirty-five thousand.' Then the rest — 6 hundreds, 2 tens, 8 ones — 'six hundred and twenty-eight.'"
• "Put those together: thirty-five thousand, six hundred and twenty-eight. We write it 35 628 — notice the gap between 35 and 628. The gap sits between the thousands group and the hundreds group."
• "Everyone say it with me: thirty-five thousand…" [wait] "…six hundred and twenty-eight."

DO:
• Point to each column in the chart as you read the number.
• Draw a vertical line or use your finger to show the gap position between 35 and 628.
• Lead two rounds of choral response so all students practise the reading.

CFU CHECKPOINT:
Technique: Choral Response
Script:
• Show the chart with 35 628. "On my signal, read this number aloud together. Ready — read."
• Listen for: "thirty-five thousand, six hundred and twenty-eight." Accept "thirty-five thousand six hundred twenty-eight" (without "and") — both are correct.
• If choral response is muddled, try call-and-response: "The thousands group is…?" [thirty-five thousand] "The rest is…?" [six hundred and twenty-eight] "Together…?" [thirty-five thousand, six hundred and twenty-eight].
PROCEED: If the class responds correctly and clearly as a group, continue to Slide 8 (zero placeholder in large numbers).
PIVOT: If students read 3 as "three" and 5 as "five" separately (i.e., "three-five thousand") — they are not grouping the ten-thousands and thousands digits together. Reteach from a different angle: cover the last three columns with a piece of paper. "Read just this part." [35 — "thirty-five."] Uncover. "Now add thousand. Now read the rest." Reconstruct the number in parts. Re-check with choral response on a new number (47 209).

MISCONCEPTIONS:
• Misconception: Reading "35 628" as "three five six two eight" or "three hundred and fifty-six thousand, twenty-eight."
  Why: Students are treating each digit independently, or are grouping incorrectly (reading 356 as the thousands group instead of 35).
  Impact: Students cannot read or write five-digit numbers in any context, affecting all subsequent lessons.
  Quick correction: Cover columns to isolate each group. "How many digits are in the thousands group? Two — ten-thousands and thousands. Those two digits together make the number of thousands."

• Misconception: The gap between 35 and 628 is optional or cosmetic.
  Why: Students may not have seen the Australian convention explicitly taught and have seen 35628 written without a gap.
  Impact: When writing five-digit numbers, students omit the gap, making numbers harder to read and causing errors in later computation.
  Quick correction: Show both versions (35628 and 35 628) and ask which is easier to read. Connect to the way we write phone numbers in groups.

TEACHER NOTES:
The five-digit number is the new learning for today. The key insight students need is that the number is read in two groups — thousands group and the remainder — separated visually by the gap. This grouping strategy (reading in chunks) is a precursor to understanding number magnitude and comparing large numbers. The choral response here is important: it gives every student a low-stakes opportunity to practise the verbal form before being asked to write it. VTLM 2.0 element: Mathematical language — reading and saying numbers correctly.

WATCH FOR:
• Students who read the chart correctly but write "35,628" with a comma — the Australian convention uses a space, not a comma (comma is used in some international contexts). Correct explicitly.
• Students who can read but not write — they may need the chart scaffolded for writing tasks.

[Maths: Stage 2 — five-digit numbers, place value chart | VTLM 2.0: Mathematical language]`;

const NOTES_SLIDE8 = `SAY:
• "What happens when a column has no value? We use zero as a place holder."
• Point to the chart showing 12 304: "1 in ten-thousands — so ten-thousand. 2 in thousands — so two-thousands together. That gives us twelve thousand."
• "Now the hundreds: 3 hundreds. Tens: zero — there are no tens. Ones: 4."
• "Twelve thousand, three hundred and four. The zero in the tens column tells us there are no tens — without it, we might write 1 234 by mistake."
• "Say it with me: twelve thousand…" [wait] "…three hundred and four."
• "The zero is doing important work. Without the zero, the 4 would slide into the tens column."

DO:
• Cover the zero in the chart with your finger, then read what remains: "Twelve thousand, three hundred and forty — that's a different number!" Uncover.
• Have students write 12 304 on their whiteboards, then check their neighbour's writing.

TEACHER NOTES:
Returning to the zero placeholder in the context of five-digit numbers reinforces the concept introduced in Stage 1 and extends it to a larger, less familiar position. The tens column is chosen deliberately — students rarely encounter zero-tens at this scale and it is a common point of error. Asking students to write the number on their whiteboards before seeing it written by the teacher is a mini retrieval practice moment. VTLM 2.0 element: Conceptual understanding — zero as placeholder.

WATCH FOR:
• Students who write 12 34 (four digits only, omitting the zero) — the place holder has been skipped. Point to the tens column and say: "What goes here?" Repeat the physical card exercise from Slide 4 if needed.
• Students who write 12 034 (correct zero but wrong position relative to gap) — they understand zero but are confused about the gap convention. Show the chart again and count columns from the right.

[Maths: Stage 2 — zero placeholder in five-digit numbers | VTLM 2.0: Conceptual understanding]`;

const NOTES_SLIDE9 = `SAY:
• "Now let me show you how to go the other direction — from words to a chart."
• "I hear: 'Twenty-four thousand, eight hundred and twelve.' I need to fill in my chart."
• Think aloud: "Twenty-four thousand — that is 2 ten-thousands and 4 thousands. So I write 2 in the ten-thousands column and 4 in the thousands column."
• "Eight hundred — that is 8 hundreds. So I write 8 in hundreds."
• "And twelve — twelve is 1 ten and 2 ones. So 1 in tens and 2 in ones."
• "Let me read it back to check: 2 in ten-thousands, 4 in thousands — twenty-four thousand. 8 hundreds, 1 ten, 2 ones — eight hundred and twelve. Twenty-four thousand, eight hundred and twelve. Correct!"

DO:
• Draw a blank five-column chart on the board.
• Fill each column live as you think aloud — do not pre-fill.
• Emphasise "twelve is 1 ten and 2 ones" — students sometimes want to write 12 in a single column.

TEACHER NOTES:
The words-to-chart direction is harder than chart-to-words because it requires students to decompose compound numbers like "twelve" into tens and ones. This is a common sticking point and worth spending extra time modelling. The think-aloud is a metacognitive strategy that makes invisible reasoning visible — use "I think… I know… I check" language explicitly. This slide models the process students will attempt in Guided Practice (Slide 10). VTLM 2.0 element: Metacognitive strategy — think-aloud.

WATCH FOR:
• Students who want to write 12 in the ones column — redirect: "Twelve is bigger than 9. Can one column hold 12? No — we need to split it."
• Students who fill from left to right but lose track of which words they have processed — teach them to cross off each word group as they fill in a column.

[Maths: Stage 2 — words to chart, decomposing numbers | VTLM 2.0: Metacognitive strategies]`;

const NOTES_SLIDE10 = `SAY:
• "Your turn to work with your partner. Look at the place value chart on the screen."
• "With your partner, write this number in words on your whiteboard. You have 60 seconds. Go."
• After Think-Pair-Share: "Boards up — Show Me! Now I need someone who did not put their hand up to share their answer."
• Select a non-volunteer: "Tell me how you wrote it." Listen for: "Fifty-three thousand, four hundred and sixty-two."
• Confirm or correct as needed.

DO:
• Display the chart showing 53 462 (Ten Thousands: 5, Thousands: 3, Hundreds: 4, Tens: 6, Ones: 2).
• While students work, circulate and note who writes it correctly and who makes errors.
• After non-volunteer response: "Thumbs up if you agree with that answer."

CFU CHECKPOINT:
Technique: Think-Pair-Share then non-volunteer
Script:
• "Think to yourself for 20 seconds — how do you say this number in words?" [pause]
• "Share with your partner for 30 seconds." [pause]
• "Boards up — Show Me!"
• Choose a student who has NOT volunteered: "[Name], can you read your board to us?"
• Look for: correct grouping (53 as "fifty-three thousand"), correct "and" placement, no comma in the numeral if they wrote it.
PROCEED: If non-volunteer reads correctly and most boards match, move to Slide 11 (zero placeholder practice).
PIVOT: If the non-volunteer reads 53 as "five-three" separately — they have not grasped the grouping concept. Reteach from a different angle: "Let me put my hand over the last three columns. What number do I see?" [53] "And 53 is…?" [fifty-three] "So add 'thousand' — fifty-three thousand. Now uncover and read the rest." Rebuild with the covering technique. Re-check with a new chart (e.g., 27 841).

TEACHER NOTES:
The Think-Pair-Share → non-volunteer sequence is a high-leverage formative structure. Pair-sharing gives every student a chance to articulate their thinking before a public response, reducing anxiety. The non-volunteer strategy ensures you are sampling from the full range of understanding, not just the confident students. Circulating during pair-share gives you data to inform the non-volunteer selection — choose someone whose board you saw and whose answer you know. VTLM 2.0 element: Collaborative learning — peer discourse.

WATCH FOR:
• Students who read the chart correctly but write "fifty three thousand four hundred and sixty two" without the comma — this is acceptable in Australian English but note the word-form convention.
• Students who reverse the tens and ones in "sixty-two" and write "twenty-six" — prompt: "Which column is tens? Which is ones? Read from left to right."

[Maths: Stage 3 — guided practice, reading charts | VTLM 2.0: Collaborative learning]`;

const NOTES_SLIDE11 = `SAY:
• "Now here is one with a twist. Look at the chart: 4, 0, 0, 5, 0."
• "Work with your partner. Write this number in words. Be careful — there are two zeros."
• After Thumbs Up/Down: "Let's check. The number is 40 050. How do I say it? Forty thousand — then zero hundreds, so I skip hundreds and say… fifty. Forty thousand and fifty."
• "The zeros tell me to skip those columns when I say the number in words, but they must be in the numeral."

DO:
• Display the chart for 40 050 (Ten Thousands: 4, Thousands: 0, Hundreds: 0, Tens: 5, Ones: 0).
• After pair-share: Do a Thumbs Up/Down check before revealing the answer.
• After reveal: Have students check their written answer and correct if needed.

CFU CHECKPOINT:
Technique: Thumbs Up/Down
Script:
• "If you and your partner wrote 'forty thousand and fifty' — thumbs up. If you wrote something different — thumbs sideways or down."
• Scan the room. Note students with thumbs sideways.
• Ask a thumbs-sideways student: "What did you write? Let's see if we can figure out what happened."
PROCEED: If ≥ 75% are thumbs up, confirm the answer and move to Stage 4.
PIVOT: If many students wrote "forty thousand, five hundred" — they have filled in zeros in speech but moved the 5 to the wrong column. Reteach from a different angle: go back to the chart. "Point to the 5. Which column? [Tens.] Ten means the 5 is worth 5 × 10 = 50. So we say fifty, not five hundred." Use place value language explicitly. Re-check with 30 040.

MISCONCEPTIONS:
• Misconception: Students read zeros in speech — saying "forty thousand, zero hundreds, zero thousands, five tens, zero ones" or "forty thousand, zero hundred and fifty."
  Why: Students are being overly literal, not understanding that zero columns are skipped in spoken form while retained in written form.
  Impact: Spoken language becomes awkward and non-standard, and the rule about when to say "and" becomes confusing.
  Quick correction: Model two versions — "do we say 'twenty and three' for 23? No. So we don't say the zeros either. We only say what's there."

• Misconception: Writing 4 050 instead of 40 050 — students drop the zero in the thousands column.
  Why: The zero thousands is invisible in speech ("forty thousand" does not say "zero thousands") so students omit it in writing.
  Impact: A five-digit number becomes four digits — magnitude error.
  Quick correction: "Say 'forty.' How many ten-thousands? [4.] How many plain thousands? [0 — there are none.] So I need both columns — 4 in ten-thousands AND 0 in thousands."

TEACHER NOTES:
This is the most cognitively demanding slide in Stage 3. The double zero (thousands and ones) tests both the grouping strategy and the placeholder understanding simultaneously. The Thumbs Up/Down technique is quick and gives students a safe way to signal uncertainty. The key teaching move here is to distinguish the spoken representation (zeros omitted) from the written representation (zeros required). This distinction reappears in Lesson 3 when rounding creates trailing zeros. VTLM 2.0 element: Formative assessment — Thumbs Up/Down.

WATCH FOR:
• Students who write the numeral correctly (40 050) but cannot say it in words — the representation is disconnected. Ask them to point to each digit as they read: this forces column-by-column reading.
• Students who consistently transpose thousands and ten-thousands — they may need a colour-coded chart where each column group is a different colour.

[Maths: Stage 3 — zero placeholders in practice | VTLM 2.0: Formative assessment]`;

const NOTES_SLIDE12 = `SAY:
• "Time to work on your own. You will complete Supporting Resource 3 — 'Place value greater than 10 000.'"
• "Before you start: what do you need to remember when writing large numbers in numerals?"
• [Wait for student response.] Confirm: "Leave a gap between the thousands group and the hundreds group."
• "If you find it helpful, the Example Answer (Supporting Resource 4) is available — see me to get a copy."
• "When you finish the main activity, try the challenge clue: 'It has 5 ten-thousands and 3 thousands. It has one less than 6 hundreds and 5 more than 3 ones. What is the number?'"

DO:
• Distribute SR3 worksheets. Enable students who need it: hand SR4 (example answer) to students identified during guided practice as needing the scaffold.
• Circulate continuously. Do not sit. Target students who struggled on Slides 10–11 first.
• Write the challenge clue on the board so it is available independently.

TEACHER NOTES:
The independent practice phase (You Do) is where students consolidate. The key question "What do you need to remember?" activates procedural knowledge before students work, reducing errors from forgetting the gap convention. The extend challenge (53 508) requires students to interpret relational clues: "one less than 6 hundreds" = 5 hundreds, "5 more than 3 ones" = 8 ones. This tests multiplicative and additive reasoning simultaneously and is appropriate for students who complete SR3 quickly. Circulating with a targeted sequence (struggling students first) maximises formative impact. VTLM 2.0 element: Differentiated practice — enabling and extending prompts.

WATCH FOR:
• Students who begin writing without looking at the chart structure — remind them to draw the chart first, fill in columns, then write the numeral.
• Students who get the challenge clue partially: they may solve "5 ten-thousands and 3 thousands = 53 ___" correctly but then misinterpret "one less than 6 hundreds" as 6 − 1 = 5 hundreds (correct) and "5 more than 3 ones" as 3 + 5 = 8 ones (correct). Watch for arithmetic slips.

[Maths: Stage 4 — independent practice | VTLM 2.0: Differentiated learning]`;

const NOTES_SLIDE13 = `SAY:
• "Pens down on your worksheet. Now open your workbook to a fresh page. Exit ticket time — two questions, two minutes."
• Read Question 1 aloud: "Thirty-three thousand, seven hundred and eighty-one. Write this as a numeral."
• Read Question 2 aloud: "40 632. Write this number in words."
• "Work silently and independently. This is your chance to show me what you understand."
• After collection: "Well done today. We looked at how our place value system is built in tens, and we represented numbers all the way to ten thousands. Next lesson we will look at how to compare and order numbers on a number line."

DO:
• Collect workbooks immediately after exit ticket. Mark these tonight — they inform your groupings for Lesson 2.
• As students pack up, briefly preview Lesson 2 to create anticipation.

TEACHER NOTES:
The exit ticket is a direct measure of today's two success criteria: reading words → numeral (Q1) and reading numerals → words (Q2). Both questions involve five-digit numbers. Q2 (40 632) includes a zero in the hundreds position — it is the same structure as Slide 11 but presented as numeral → words rather than chart → words. Students who answer both correctly have met the lesson learning intention. Students who write 33 781 correctly but write "forty thousand, six hundred and thirty-two" (dropping the gap but getting words right) have partial understanding. Mark with three categories: secure / developing / not yet. Use results to form flexible groups for Lesson 2 guided practice. VTLM 2.0 element: Summative-formative assessment — exit ticket.

WATCH FOR:
• Students who write 33781 (no gap) for Q1 — correct in marking but note: teach the gap convention again in Lesson 2 warm-up.
• Students who write "forty thousand, six hundred and thirty two" for Q2 — "thirty two" as one word is common and acceptable, but "thirty-two" with a hyphen is standard.
• Students who leave Q2 blank after completing Q1 — they may have run out of time or may not have the words-from-numeral direction solid. Flag for Lesson 2 enable group.

[Maths: Stage 2 — exit ticket, both directions | VTLM 2.0: Summative-formative assessment]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build function
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Grade 3/4 Maths";
  pres.title = "Lesson 1: Whole Numbers Using Proportional Materials";

  // ── Slide 1: Title ────────────────────────────────────────────────────────
  titleSlide(
    pres,
    "Lesson 1: Whole Numbers Using Proportional Materials",
    "Making, representing and writing numbers greater than 10 000",
    "Stage 1 | Lesson 1 of 10 | Extend Place Value & Additive Thinking",
    NOTES_SLIDE1
  );

  // ── Slide 2: LI & SC ──────────────────────────────────────────────────────
  liSlide(
    pres,
    [
      "We will make, represent and write numbers using base-10 blocks and place value charts.",
    ],
    [
      "I can represent whole numbers using base-10 blocks.",
      "I can write whole numbers greater than 10 000 in numerals and in words.",
      "I can write whole numbers greater than 10 000 in expanded form.",
    ],
    NOTES_SLIDE2,
    FOOTER
  );

  // ── Slide 3: Stage 1 — Prior Knowledge warm-up ────────────────────────────
  contentSlide(
    pres,
    1,
    "Activate Prior Knowledge",
    "Making Numbers in Hundreds",
    [
      "Get your base-10 blocks ready.",
      "For each number: make it with blocks, then write it in words on your whiteboard.",
      "Numbers to make: 300, then 170, then 529.",
      "Show Me Boards after each number.",
      "Listen carefully: 'Four hundred and five' — make it, then write the numeral.",
      "A non-volunteer will explain: 'I have ___ hundreds, ___ tens and ___ ones.'",
    ],
    NOTES_SLIDE3,
    FOOTER,
    (s) => {
      // Right side: three number callout cards stacked vertically
      const nums = ["300", "170", "529"];
      const colors = [C.NAVY, C.TEAL, C.AMBER];
      nums.forEach((n, i) => {
        const cy = CONTENT_TOP + i * 1.2;
        s.addShape("roundRect", {
          x: 5.4, y: cy, w: 4.0, h: 1.0, rectRadius: 0.1,
          fill: { color: colors[i] },
          shadow: { type: "outer", blur: 4, offset: 1, color: "000000", opacity: 0.12, angle: 135 },
        });
        s.addText(n, {
          x: 5.4, y: cy, w: 4.0, h: 1.0,
          fontSize: 40, fontFace: FONT_H, color: C.WHITE,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
      });
    }
  );

  // ── Slide 4: Stage 1 — Zero as placeholder ───────────────────────────────
  contentSlide(
    pres,
    1,
    "Activate Prior Knowledge",
    "Zero as a Place Holder",
    [
      "Write 'Six hundred and eighty' and 'Six hundred and eight' side by side.",
      "Make each one with blocks. Write the numeral on your whiteboard.",
      "680: 6 hundreds, 8 tens, 0 ones.",
      "608: 6 hundreds, 0 tens, 8 ones.",
      "The zero holds the tens column open — without it, 608 becomes 68.",
      "Zero is not nothing. Zero is a place holder.",
    ],
    NOTES_SLIDE4,
    FOOTER,
    (s) => {
      // Right side: comparison card showing 680 vs 608
      addCard(s, 5.2, CONTENT_TOP, 4.3, SAFE_BOTTOM - CONTENT_TOP, { fill: C.WHITE });

      // 680
      s.addShape("roundRect", {
        x: 5.45, y: CONTENT_TOP + 0.15, w: 1.75, h: 0.85, rectRadius: 0.08,
        fill: { color: C.TEAL },
      });
      s.addText("680", {
        x: 5.45, y: CONTENT_TOP + 0.15, w: 1.75, h: 0.85,
        fontSize: 32, fontFace: FONT_H, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // 608
      s.addShape("roundRect", {
        x: 7.35, y: CONTENT_TOP + 0.15, w: 1.75, h: 0.85, rectRadius: 0.08,
        fill: { color: C.CORAL },
      });
      s.addText("608", {
        x: 7.35, y: CONTENT_TOP + 0.15, w: 1.75, h: 0.85,
        fontSize: 32, fontFace: FONT_H, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // VS label
      s.addText("vs", {
        x: 6.7, y: CONTENT_TOP + 0.25, w: 0.7, h: 0.65,
        fontSize: 18, fontFace: FONT_B, color: C.MUTED,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // Mini charts below each number
      // 680 chart
      const chartY = CONTENT_TOP + 1.2;
      const smallHeaders = ["H", "T", "O"];
      const vals680 = ["6", "8", "0"];
      const vals608 = ["6", "0", "8"];
      const cellW = 0.5;

      // Header and value cells for 680
      smallHeaders.forEach((h, i) => {
        const cx = 5.45 + i * cellW;
        s.addShape("rect", {
          x: cx, y: chartY, w: cellW, h: 0.3,
          fill: { color: C.TEAL }, line: { color: C.WHITE, width: 1 },
        });
        s.addText(h, {
          x: cx, y: chartY, w: cellW, h: 0.3,
          fontSize: 9, fontFace: FONT_B, color: C.WHITE,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
        s.addShape("rect", {
          x: cx, y: chartY + 0.3, w: cellW, h: 0.4,
          fill: { color: C.WHITE }, line: { color: C.TEAL, width: 1 },
        });
        s.addText(vals680[i], {
          x: cx, y: chartY + 0.3, w: cellW, h: 0.4,
          fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
      });

      // Header and value cells for 608
      smallHeaders.forEach((h, i) => {
        const cx = 7.35 + i * cellW;
        s.addShape("rect", {
          x: cx, y: chartY, w: cellW, h: 0.3,
          fill: { color: C.CORAL }, line: { color: C.WHITE, width: 1 },
        });
        s.addText(h, {
          x: cx, y: chartY, w: cellW, h: 0.3,
          fontSize: 9, fontFace: FONT_B, color: C.WHITE,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
        s.addShape("rect", {
          x: cx, y: chartY + 0.3, w: cellW, h: 0.4,
          fill: { color: C.WHITE }, line: { color: C.CORAL, width: 1 },
        });
        s.addText(vals608[i], {
          x: cx, y: chartY + 0.3, w: cellW, h: 0.4,
          fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
      });

      // Zero highlight label for 680
      s.addShape("roundRect", {
        x: 5.45 + cellW, y: chartY + 0.72, w: cellW, h: 0.22, rectRadius: 0.04,
        fill: { color: C.AMBER },
      });
      s.addText("0 here", {
        x: 5.45 + cellW, y: chartY + 0.72, w: cellW, h: 0.22,
        fontSize: 7, fontFace: FONT_B, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // Zero highlight label for 608
      s.addShape("roundRect", {
        x: 7.35 + cellW, y: chartY + 0.72, w: cellW, h: 0.22, rectRadius: 0.04,
        fill: { color: C.AMBER },
      });
      s.addText("0 here", {
        x: 7.35 + cellW, y: chartY + 0.72, w: cellW, h: 0.22,
        fontSize: 7, fontFace: FONT_B, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // Key rule strip
      s.addShape("rect", {
        x: 5.2, y: 4.55, w: 4.3, h: 0.42,
        fill: { color: C.AMBER },
      });
      s.addText("Zero is a place holder — never skip it!", {
        x: 5.2, y: 4.55, w: 4.3, h: 0.42,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
    }
  );

  // ── Slide 5: Stage 2 — Base-10 relationships ──────────────────────────────
  contentSlide(
    pres,
    2,
    "Explicit Instruction — I Do",
    "How Place Value is Built",
    [
      "10 ones = 1 ten",
      "10 tens = 1 hundred",
      "10 hundreds = 1 thousand",
      "10 thousands = 1 ten-thousand",
      "Each column is TEN TIMES bigger than the one to its right.",
      "This is why we call it a base-10 (decimal) number system.",
    ],
    NOTES_SLIDE5,
    FOOTER,
    (s) => {
      // Right side: visual chain of relationships
      const stageColor = STAGE_COLORS["2"];
      const items = [
        { label: "1 Ones", sub: "tiny cube", color: C.TEAL },
        { label: "1 Ten", sub: "= 10 ones", color: C.NAVY },
        { label: "1 Hundred", sub: "= 10 tens", color: C.AMBER },
        { label: "1 Thousand", sub: "= 10 hundreds", color: C.CORAL },
        { label: "1 Ten-Thousand", sub: "= 10 thousands", color: C.PURPLE },
      ];

      const boxW = 3.6;
      const boxH = 0.58;
      const startX = 5.8;
      const startY = CONTENT_TOP + 0.05;
      const gap = 0.1;

      items.forEach((item, i) => {
        const cy = startY + i * (boxH + gap);
        s.addShape("roundRect", {
          x: startX, y: cy, w: boxW, h: boxH, rectRadius: 0.08,
          fill: { color: item.color },
          shadow: { type: "outer", blur: 3, offset: 1, color: "000000", opacity: 0.12, angle: 135 },
        });
        s.addText(item.label, {
          x: startX + 0.12, y: cy, w: boxW - 0.12, h: boxH * 0.55,
          fontSize: 13, fontFace: FONT_H, color: C.WHITE,
          align: "left", valign: "bottom", bold: true, margin: 0,
        });
        s.addText(item.sub, {
          x: startX + 0.12, y: cy + boxH * 0.52, w: boxW - 0.12, h: boxH * 0.45,
          fontSize: 11, fontFace: FONT_B, color: C.WHITE,
          align: "left", valign: "top", margin: 0,
        });
        // Arrow between items
        if (i < items.length - 1) {
          const arrowY = cy + boxH + 0.01;
          s.addShape("line", {
            x: startX + boxW / 2, y: arrowY, w: 0, h: gap + 0.01,
            line: { color: C.MUTED, width: 1.5 },
          });
        }
      });
    }
  );

  // ── Slide 6: Stage 2 — Worked example (4-digit) ───────────────────────────
  workedExSlide(
    pres,
    2,
    "Explicit Instruction — I Do",
    "Worked Example: 4-Digit Number",
    [
      "Make with blocks: 3 thousands, 4 hundreds, 5 tens, 8 ones.",
      "Record in the chart (see right).",
      "Numeral: 3 458  (leave a gap after thousands).",
      "Expanded form: 3 000 + 400 + 50 + 8.",
      "Words: three thousand, four hundred and fifty-eight.",
      "Three representations — same number!",
    ],
    NOTES_SLIDE6,
    FOOTER,
    (s) => {
      // Right side: place value chart + representations
      const chartX = 5.3;
      const chartY = CONTENT_TOP + 0.1;
      addPlaceValueChart(
        s, chartX, chartY,
        ["Thousands", "Hundreds", "Tens", "Ones"],
        [3, 4, 5, 8],
        { cellW: 1.1, headerColor: C.NAVY }
      );

      // Numeral label
      const labelY = chartY + 0.52 + 0.7 + 0.2;
      s.addShape("roundRect", {
        x: chartX, y: labelY, w: 4.4, h: 0.44, rectRadius: 0.08,
        fill: { color: C.NAVY },
      });
      s.addText("3 458", {
        x: chartX, y: labelY, w: 4.4, h: 0.44,
        fontSize: 20, fontFace: FONT_H, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // Expanded form
      const expY = labelY + 0.55;
      s.addShape("roundRect", {
        x: chartX, y: expY, w: 4.4, h: 0.44, rectRadius: 0.08,
        fill: { color: C.TEAL },
      });
      s.addText("3 000 + 400 + 50 + 8", {
        x: chartX, y: expY, w: 4.4, h: 0.44,
        fontSize: 14, fontFace: FONT_B, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // Words
      const wordsY = expY + 0.55;
      s.addShape("roundRect", {
        x: chartX, y: wordsY, w: 4.4, h: 0.55, rectRadius: 0.08,
        fill: { color: C.AMBER },
      });
      s.addText("three thousand, four hundred\nand fifty-eight", {
        x: chartX, y: wordsY, w: 4.4, h: 0.55,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE,
        align: "center", valign: "middle", margin: 0,
      });
    }
  );

  // ── Slide 7: Stage 2 — Numbers > 10 000 ──────────────────────────────────
  workedExSlide(
    pres,
    2,
    "Explicit Instruction — I Do",
    "Numbers Greater Than 10 000",
    [
      "We need a fifth column: Ten Thousands.",
      "Read in two groups: thousands group | rest.",
      "35 628 → 'thirty-five thousand' + 'six hundred and twenty-eight'.",
      "The gap between 35 and 628 shows where to pause.",
      "Say it together: 'Thirty-five thousand, six hundred and twenty-eight.'",
    ],
    NOTES_SLIDE7,
    FOOTER,
    (s) => {
      // Right side: 5-column place value chart for 35 628
      const chartX = 5.1;
      const chartY = CONTENT_TOP + 0.25;
      addPlaceValueChart(
        s, chartX, chartY,
        ["Ten\nThousands", "Thousands", "Hundreds", "Tens", "Ones"],
        [3, 5, 6, 2, 8],
        { cellW: 0.96, headerColor: C.NAVY }
      );

      // Group label — thousands group
      s.addShape("roundRect", {
        x: chartX, y: chartY + 0.52 + 0.7 + 0.15, w: 1.92, h: 0.3, rectRadius: 0.06,
        fill: { color: C.TEAL },
      });
      s.addText("thousands", {
        x: chartX, y: chartY + 0.52 + 0.7 + 0.15, w: 1.92, h: 0.3,
        fontSize: 9, fontFace: FONT_B, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // Group label — rest
      s.addShape("roundRect", {
        x: chartX + 1.92 + 0.12, y: chartY + 0.52 + 0.7 + 0.15, w: 2.76, h: 0.3, rectRadius: 0.06,
        fill: { color: C.AMBER },
      });
      s.addText("hundreds, tens, ones", {
        x: chartX + 1.92 + 0.12, y: chartY + 0.52 + 0.7 + 0.15, w: 2.76, h: 0.3,
        fontSize: 9, fontFace: FONT_B, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // Numeral
      const numY = chartY + 0.52 + 0.7 + 0.6;
      s.addShape("roundRect", {
        x: chartX, y: numY, w: 4.8, h: 0.46, rectRadius: 0.08,
        fill: { color: C.NAVY },
      });
      s.addText("35 628", {
        x: chartX, y: numY, w: 4.8, h: 0.46,
        fontSize: 22, fontFace: FONT_H, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
    }
  );

  // ── Slide 8: Stage 2 — Zero placeholder in large numbers ─────────────────
  workedExSlide(
    pres,
    2,
    "Explicit Instruction — I Do",
    "Zero as Place Holder in Large Numbers",
    [
      "What if a column has no value? We write zero.",
      "12 304: 1 ten-thousand, 2 thousands, 3 hundreds, 0 tens, 4 ones.",
      "Say it: 'twelve thousand, three hundred and four.'",
      "Without the zero, 12 304 becomes 1 234 — a completely different number!",
      "Say it together: 'Twelve thousand, three hundred and four.'",
    ],
    NOTES_SLIDE8,
    FOOTER,
    (s) => {
      // Right side: 5-column chart for 12 304 with zero highlighted
      const chartX = 5.1;
      const chartY = CONTENT_TOP + 0.25;
      addPlaceValueChart(
        s, chartX, chartY,
        ["Ten\nThousands", "Thousands", "Hundreds", "Tens", "Ones"],
        [1, 2, 3, 0, 4],
        { cellW: 0.96, headerColor: C.NAVY }
      );

      // Highlight the zero cell in tens column (index 3)
      const zeroX = chartX + 3 * 0.96;
      const zeroY = chartY + 0.52;
      s.addShape("rect", {
        x: zeroX, y: zeroY, w: 0.96, h: 0.7,
        fill: { color: C.AMBER_LIGHT },
        line: { color: C.AMBER, width: 2 },
      });
      s.addText("0", {
        x: zeroX, y: zeroY, w: 0.96, h: 0.7,
        fontSize: 26, fontFace: FONT_H, color: C.AMBER,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // Arrow + label pointing to zero
      s.addText("Place holder!", {
        x: chartX + 3.9, y: zeroY + 0.1, w: 1.3, h: 0.5,
        fontSize: 11, fontFace: FONT_B, color: C.AMBER, bold: true, margin: 0,
      });

      // Numeral
      const numY = chartY + 0.52 + 0.7 + 0.2;
      s.addShape("roundRect", {
        x: chartX, y: numY, w: 4.8, h: 0.44, rectRadius: 0.08,
        fill: { color: C.NAVY },
      });
      s.addText("12 304", {
        x: chartX, y: numY, w: 4.8, h: 0.44,
        fontSize: 22, fontFace: FONT_H, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // Warning note
      const warnY = numY + 0.55;
      s.addShape("roundRect", {
        x: chartX, y: warnY, w: 4.8, h: 0.44, rectRadius: 0.08,
        fill: { color: C.CORAL },
      });
      s.addText("Without zero: 1 234 — wrong number!", {
        x: chartX, y: warnY, w: 4.8, h: 0.44,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
    }
  );

  // ── Slide 9: Stage 2 — Words to chart (modelling) ────────────────────────
  workedExSlide(
    pres,
    2,
    "Explicit Instruction — I Do",
    "Words to Chart: Think-Aloud",
    [
      "Number: 'Twenty-four thousand, eight hundred and twelve.'",
      "Step 1: Twenty-four thousand → 2 in ten-thousands, 4 in thousands.",
      "Step 2: Eight hundred → 8 in hundreds.",
      "Step 3: Twelve → 1 ten and 2 ones → 1 in tens, 2 in ones.",
      "Step 4: Read back to check: 24 812. ✓",
      "Key: 'twelve' is 1 ten + 2 ones — it never fits in one column!",
    ],
    NOTES_SLIDE9,
    FOOTER,
    (s) => {
      // Right side: completed chart for 24 812
      const chartX = 5.1;
      const chartY = CONTENT_TOP + 0.2;
      addPlaceValueChart(
        s, chartX, chartY,
        ["Ten\nThousands", "Thousands", "Hundreds", "Tens", "Ones"],
        [2, 4, 8, 1, 2],
        { cellW: 0.96, headerColor: C.NAVY }
      );

      // Step annotations
      const steps = [
        { text: "1", detail: "24 thousand", cx: chartX, cols: 2 },
        { text: "2", detail: "8 hundred", cx: chartX + 2 * 0.96, cols: 1 },
        { text: "3", detail: "12 = 1 ten + 2 ones", cx: chartX + 3 * 0.96, cols: 2 },
      ];

      const annY = chartY + 0.52 + 0.7 + 0.14;
      steps.forEach((st) => {
        const annW = st.cols * 0.96 - 0.04;
        s.addShape("roundRect", {
          x: st.cx + 0.02, y: annY, w: annW, h: 0.38, rectRadius: 0.06,
          fill: { color: C.TEAL },
        });
        s.addText(st.detail, {
          x: st.cx + 0.02, y: annY, w: annW, h: 0.38,
          fontSize: 9, fontFace: FONT_B, color: C.WHITE,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
      });

      // Numeral
      const numY = annY + 0.5;
      s.addShape("roundRect", {
        x: chartX, y: numY, w: 4.8, h: 0.44, rectRadius: 0.08,
        fill: { color: C.NAVY },
      });
      s.addText("24 812", {
        x: chartX, y: numY, w: 4.8, h: 0.44,
        fontSize: 22, fontFace: FONT_H, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
    }
  );

  // ── Slide 10: Stage 3 — Guided practice: 53 462 ──────────────────────────
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["3"];
    addTopBar(s, stageColor);
    addStageBadge(s, 3, "Guided Practice — We Do");
    addTitle(s, "Pair-Share: Write This Number in Words", { y: 0.65, fontSize: 22, color: stageColor });

    // CFU technique badge
    const techW = 2.8;
    s.addShape("roundRect", {
      x: 0.5, y: 1.5, w: techW, h: 0.35, rectRadius: 0.08,
      fill: { color: stageColor },
    });
    s.addText("CFU: Think-Pair-Share then Non-Volunteer", {
      x: 0.5, y: 1.5, w: techW, h: 0.35,
      fontSize: 9, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Instruction
    addCard(s, 0.5, CONTENT_TOP, 4.5, 1.1);
    s.addText([
      { text: "1. Think to yourself (20 sec)\n", options: { bold: true } },
      { text: "2. Share with your partner (30 sec)\n", options: {} },
      { text: "3. Write on your whiteboard\n", options: {} },
      { text: "4. Boards up — Show Me!", options: { bold: true } },
    ], {
      x: 0.7, y: CONTENT_TOP + 0.1, w: 4.1, h: 0.9,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });

    // Place value chart for 53 462
    const chartX = 0.5;
    const chartY = CONTENT_TOP + 1.3;
    addPlaceValueChart(
      s, chartX, chartY,
      ["Ten\nThousands", "Thousands", "Hundreds", "Tens", "Ones"],
      [5, 3, 4, 6, 2],
      { cellW: 1.1, headerColor: stageColor }
    );

    // Answer reveal card (right side)
    addCard(s, 5.3, CONTENT_TOP, 4.2, SAFE_BOTTOM - CONTENT_TOP, { strip: stageColor });
    s.addText("Answer:", {
      x: 5.5, y: CONTENT_TOP + 0.15, w: 3.8, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: stageColor, bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: 5.5, y: CONTENT_TOP + 0.55, w: 3.8, h: 0.7, rectRadius: 0.08,
      fill: { color: stageColor },
    });
    s.addText("Fifty-three thousand,\nfour hundred and sixty-two", {
      x: 5.5, y: CONTENT_TOP + 0.55, w: 3.8, h: 0.7,
      fontSize: 14, fontFace: FONT_H, color: C.WHITE,
      align: "center", valign: "middle", margin: 0,
    });

    // Numeral reminder
    s.addShape("roundRect", {
      x: 5.5, y: CONTENT_TOP + 1.45, w: 3.8, h: 0.44, rectRadius: 0.08,
      fill: { color: C.NAVY },
    });
    s.addText("53 462", {
      x: 5.5, y: CONTENT_TOP + 1.45, w: 3.8, h: 0.44,
      fontSize: 20, fontFace: FONT_H, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Choral check prompt
    s.addText("Check: non-volunteer reads aloud. Class agrees?", {
      x: 5.5, y: CONTENT_TOP + 2.05, w: 3.8, h: 0.4,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, margin: 0, italic: true,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_SLIDE10);
  }

  // ── Slide 11: Stage 3 — Guided practice: 40 050 ─────────────────────────
  {
    const s = pres.addSlide();
    const stageColor = STAGE_COLORS["3"];
    addTopBar(s, stageColor);
    addStageBadge(s, 3, "Guided Practice — We Do");
    addTitle(s, "Zero Place Holders — Pair-Share", { y: 0.65, fontSize: 22, color: stageColor });

    // CFU technique badge
    const techW = 2.4;
    s.addShape("roundRect", {
      x: 0.5, y: 1.5, w: techW, h: 0.35, rectRadius: 0.08,
      fill: { color: stageColor },
    });
    s.addText("CFU: Thumbs Up / Down", {
      x: 0.5, y: 1.5, w: techW, h: 0.35,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Instruction card
    addCard(s, 0.5, CONTENT_TOP, 4.5, 1.1);
    s.addText([
      { text: "Look carefully — this number has TWO zeros.\n", options: { bold: true } },
      { text: "With your partner: write this number in words.\n", options: {} },
      { text: "Then: Thumbs Up if you agree with the answer.", options: {} },
    ], {
      x: 0.7, y: CONTENT_TOP + 0.1, w: 4.1, h: 0.9,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
    });

    // Place value chart for 40 050
    const chartX = 0.5;
    const chartY = CONTENT_TOP + 1.3;
    addPlaceValueChart(
      s, chartX, chartY,
      ["Ten\nThousands", "Thousands", "Hundreds", "Tens", "Ones"],
      [4, 0, 0, 5, 0],
      { cellW: 1.1, headerColor: stageColor }
    );

    // Answer card (right side)
    addCard(s, 5.3, CONTENT_TOP, 4.2, SAFE_BOTTOM - CONTENT_TOP, { strip: stageColor });
    s.addText("Answer:", {
      x: 5.5, y: CONTENT_TOP + 0.15, w: 3.8, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: stageColor, bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: 5.5, y: CONTENT_TOP + 0.55, w: 3.8, h: 0.6, rectRadius: 0.08,
      fill: { color: stageColor },
    });
    s.addText("Forty thousand and fifty", {
      x: 5.5, y: CONTENT_TOP + 0.55, w: 3.8, h: 0.6,
      fontSize: 15, fontFace: FONT_H, color: C.WHITE,
      align: "center", valign: "middle", margin: 0,
    });

    s.addShape("roundRect", {
      x: 5.5, y: CONTENT_TOP + 1.3, w: 3.8, h: 0.44, rectRadius: 0.08,
      fill: { color: C.NAVY },
    });
    s.addText("40 050", {
      x: 5.5, y: CONTENT_TOP + 1.3, w: 3.8, h: 0.44,
      fontSize: 20, fontFace: FONT_H, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Key rule
    s.addShape("rect", {
      x: 5.5, y: CONTENT_TOP + 1.9, w: 3.8, h: 0.42,
      fill: { color: C.AMBER },
    });
    s.addText("Zeros in speech: skip them.\nZeros in writing: keep them!", {
      x: 5.5, y: CONTENT_TOP + 1.9, w: 3.8, h: 0.42,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_SLIDE11);
  }

  // ── Slide 12: Stage 4 — Independent Practice ─────────────────────────────
  contentSlide(
    pres,
    4,
    "Independent Practice — You Do",
    "Place Value Greater Than 10 000",
    [
      "Complete Supporting Resource 3 independently.",
      "Remember: leave a gap between the thousands group and hundreds group.",
      "Enable support: ask the teacher for an Example Answer (SR4).",
    ],
    NOTES_SLIDE12,
    FOOTER,
    (s) => {
      // Right side: challenge card
      addCard(s, 5.2, CONTENT_TOP, 4.3, SAFE_BOTTOM - CONTENT_TOP, { fill: C.WHITE });

      // Challenge header
      s.addShape("rect", {
        x: 5.2, y: CONTENT_TOP, w: 4.3, h: 0.44,
        fill: { color: C.CORAL },
      });
      s.addText("Challenge — Extend", {
        x: 5.2, y: CONTENT_TOP, w: 4.3, h: 0.44,
        fontSize: 13, fontFace: FONT_H, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });

      // Clue bullets
      const clues = [
        "It has 5 ten-thousands and 3 thousands.",
        "It has one less than 6 hundreds.",
        "It has 5 more than 3 ones.",
        "What is the number?",
      ];
      const clueTexts = clues.map((c, i) => ({
        text: c,
        options: { bullet: i < 3, breakLine: i < clues.length - 1, fontSize: 13, color: C.CHARCOAL },
      }));
      s.addText(clueTexts, {
        x: 5.4, y: CONTENT_TOP + 0.55, w: 3.9, h: 2.0,
        fontFace: FONT_B, margin: 0, valign: "top",
      });

      // Answer reveal (spoiler strip — teachers can cover)
      s.addShape("roundRect", {
        x: 5.4, y: CONTENT_TOP + 2.7, w: 3.9, h: 0.5, rectRadius: 0.08,
        fill: { color: C.EMERALD },
      });
      s.addText("Answer: 53 508", {
        x: 5.4, y: CONTENT_TOP + 2.7, w: 3.9, h: 0.5,
        fontSize: 14, fontFace: FONT_H, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
    }
  );

  // ── Slide 13: Stage 5 — Exit Ticket ──────────────────────────────────────
  exitTicketSlide(
    pres,
    [
      "\"Thirty-three thousand, seven hundred and eighty-one\" — write as a numeral.",
      "40 632 — write this number in words.",
    ],
    NOTES_SLIDE13,
    FOOTER
  );

  // ── Resource slide ─────────────────────────────────────────────────────────
  addResourceSlide(
    pres,
    [
      {
        name: "SR3 — Place Value Greater Than 10 000",
        fileName: "SR3_Place_Value_Worksheet.pdf",
        description: "Independent practice worksheet (You Do) — 8 problems covering words ↔ numerals ↔ place value charts.",
      },
      {
        name: "SR4 — Example Answer",
        fileName: "SR4_Example_Answer.pdf",
        description: "Completed answer key for SR3. Distribute to enabling students as a scaffold.",
      },
    ],
    { C, FONT_H, FONT_B },
    FOOTER,
    `SAY:\n• "This slide lists the printable resources for today's lesson. You should have printed SR3 and SR4 before the lesson."\n\nDO:\n• Skip this slide during teaching — it is for teacher preparation only.\n\nTEACHER NOTES:\nSR3 is the independent practice worksheet distributed during Stage 4 (You Do). SR4 is the completed answer key used as an enabling scaffold — hand it to students who were identified during guided practice as needing additional support. Both PDFs are in the same folder as this presentation file. Click the resource name to open the PDF.\n\nWATCH FOR:\n• Ensure SR3 and SR4 are printed before the lesson begins. Colour printing is not required — the worksheets are print-friendly in grayscale.\n\n[Maths: Preparation — resources | VTLM 2.0: Planning]`
  );

  // ── Write PPTX ─────────────────────────────────────────────────────────────
  const pptxPath = OUT_DIR + "/Lesson_PV1_Proportional_Materials.pptx";
  await pres.writeFile({ fileName: pptxPath });
  console.log("Written: " + pptxPath);

  // ── Generate companion PDFs ────────────────────────────────────────────────
  await Promise.all([generateWorksheet(false), generateWorksheet(true)]);
}

// ── SR3/SR4: Shared problem data ─────────────────────────────────────────────

const PV_HDR = ["TTh", "Th", "H", "T", "O"];

const PROBLEMS = {
  sectionA: {
    heading: "Section A: Write in the place value chart, then write the numeral.",
    headingAnswer: "Section A: Words → Place Value Chart → Numeral",
    color: "NAVY",
    items: [
      { prompt: "Twenty-four thousand, three hundred and fifty-six", chartValues: [2,4,3,5,6], writeLabel: "Numeral:", answer: "24 356" },
      { prompt: "Fifteen thousand and ninety-two", chartValues: [1,5,0,9,2], writeLabel: "Numeral:", answer: "15 092" },
      { prompt: "Sixty thousand, one hundred and seven", chartValues: [6,0,1,0,7], writeLabel: "Numeral:", answer: "60 107" },
    ],
  },
  sectionB: {
    heading: "Section B: Write in the place value chart, then write in words.",
    headingAnswer: "Section B: Numeral → Place Value Chart → Words",
    color: "TEAL",
    items: [
      { prompt: "31 405", chartValues: [3,1,4,0,5], writeLabel: "Words:", answer: "Thirty-one thousand, four hundred and five" },
      { prompt: "72 830", chartValues: [7,2,8,3,0], writeLabel: "Words:", answer: "Seventy-two thousand, eight hundred and thirty" },
      { prompt: "50 016", chartValues: [5,0,0,1,6], writeLabel: "Words:", answer: "Fifty thousand and sixteen" },
    ],
  },
  sectionC: {
    heading: "Section C: Challenge",
    headingAnswer: "Section C: Challenge",
    color: "CORAL",
    items: [
      { prompt: "A number has 4 ten-thousands, 8 thousands, 0 hundreds, 5 tens, and 2 ones.", noChart: true,
        writeLines: ["Numeral:", "Words:"], answers: ["48 052", "Forty-eight thousand and fifty-two"] },
      { prompt: "What number is 1 000 more than 29 999?", chartValues: [3,0,9,9,9],
        writeLines: ["Numeral:", "Words:"], answers: ["30 999", "Thirty thousand, nine hundred and ninety-nine"] },
    ],
  },
};

/**
 * Generate SR3 (worksheet) or SR4 (answer key).
 * @param {boolean} isAnswerKey — true for SR4
 */
async function generateWorksheet(isAnswerKey) {
  const label = isAnswerKey ? "SR4" : "SR3";
  const doc = createPdf({ title: `${label} — Place Value Greater Than 10 000` });

  let y = addPdfHeader(doc, isAnswerKey ? "Place Value Greater Than 10 000 — Example Answer" : "Place Value Greater Than 10 000", {
    subtitle: isAnswerKey
      ? "Supporting Resource 4 — Answer Key (Enabling Scaffold)"
      : "Supporting Resource 3 — Independent Practice",
    lessonInfo: FOOTER,
    color: isAnswerKey ? C.EMERALD : C.NAVY,
    showNameDate: !isAnswerKey,
  });

  y = addTipBox(doc, isAnswerKey
    ? "This answer key is for enabling students who need a scaffold during independent practice. Distribute to students identified during guided practice as needing additional support."
    : "Remember: when writing large numerals, leave a gap between the thousands group and the hundreds group (e.g., 24 356 not 24356).",
    y, { color: isAnswerKey ? C.EMERALD : C.TEAL });

  let num = 1;
  for (const section of [PROBLEMS.sectionA, PROBLEMS.sectionB, PROBLEMS.sectionC]) {
    const sColor = C[section.color];
    y = addSectionHeading(doc, isAnswerKey ? section.headingAnswer : section.heading, y, { color: sColor });

    for (const item of section.items) {
      // Build writeLines for this problem
      let writeLines;
      if (item.writeLines) {
        // Section C: multiple write lines
        writeLines = item.writeLines.map((lbl, i) => ({
          label: lbl,
          ...(isAnswerKey ? { answer: item.answers[i] } : {}),
        }));
      } else {
        writeLines = [{
          label: item.writeLabel,
          ...(isAnswerKey ? { answer: item.answer } : {}),
        }];
      }

      y = addProblem(doc, num++, item.prompt, y, {
        headers: item.noChart ? undefined : PV_HDR,
        chartValues: isAnswerKey ? item.chartValues : undefined,
        writeLines,
        color: sColor,
      });
    }
  }

  addPdfFooter(doc, FOOTER);

  const fileName = isAnswerKey ? "SR4_Example_Answer.pdf" : "SR3_Place_Value_Worksheet.pdf";
  const outPath = OUT_DIR + "/" + fileName;
  await writePdf(doc, outPath);
  console.log("Written: " + outPath);
}

build().catch(console.error);
