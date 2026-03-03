// Matilda — Lesson 25: Persuasive Writing — Write a Body Paragraph (FINAL LESSON)
// Year 3/4 Literacy — Persuasive Writing — Week 5
// Uses shared helpers from themes/matilda_helpers.js

"use strict";

const pptxgen = require("pptxgenjs");
const fs      = require("fs");

const {
  C, FONT_H, FONT_B,
  makeCardShadow,
  SAFE_BOTTOM, CONTENT_TOP,
  addTopBar, addBadge, addTitle, addCard, addFooter,
  withReveal,
  titleSlide, liSlide, contentSlide,
  cfuSlide, taskSlide, modellingSlide, closingSlide,
} = require("../themes/matilda_helpers");

const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addBodyText, addTipBox, addPdfFooter, addLinedArea,
  addResourceSlide,
} = require("../themes/pdf_helpers");

const OUT_DIR = "output/Matilda_Lesson25_Write_Body_Paragraph";
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const FOOTER = "Matilda  |  Lesson 25 of 25  |  Week 5  |  Year 3/4 Literacy";

// =============================================================================
// Teacher notes
// =============================================================================

const NOTES_TITLE = `SAY:
\u2022 "Welcome to our FINAL Matilda lesson \u2014 Lesson 25! Today we are going to write a complete persuasive body paragraph from the plans you created in Lesson 24."
\u2022 "You will also learn how to EDIT your own writing using a 4-step checklist. By the end of today, you will have a polished paragraph you can be proud of."

DO:
\u2022 Display this slide as students settle. Allow 15 seconds for students to read the title and subtitle.
\u2022 Acknowledge the milestone: "This is our last lesson in the Matilda unit. You have all come a long way."
\u2022 Ensure students have their SPOs from Lesson 24 on their desks. If any SPOs are missing, have blank copies ready.

TEACHER NOTES:
PACING NOTE: This is the LEANEST deck in the unit \u2014 only 10 logical slides. Most lesson time goes to student writing. Suggested timing: Title/LI (3 min), Quick Revision (3 min), Reading + Evidence (6 min), Revise Model (3 min), Editing I Do (4 min), Editing We Do (5 min), You Do writing (20 min), Closing (4 min) = ~48 min. PROTECT THE 20-MINUTE WRITING BLOCK. If running behind after the reading, compress the model revision to 2 minutes. The editing section (I Do + We Do) is the only new teaching \u2014 keep it tight but thorough.

This is the culmination of the 25-lesson Matilda unit. Students have progressed from reading comprehension and vocabulary through figurative language analysis to persuasive writing. Today they apply everything: the SPO planned in L24 becomes a written paragraph, and they learn self-editing for the first time. The editing checklist is a transferable skill they will carry into future units.

Cross-Curriculum Links: VC2HH4S04 (historical sources and evidence), VC2HH4S01 (historical knowledge and understanding) \u2014 the supplementary text "Libraries are Special Places" connects to history of libraries from ancient Egypt to modern times.

WATCH FOR:
\u2022 Students who do not have their SPO from Lesson 24 \u2014 have blank SPO templates ready. They can complete the planning during the You Do phase before writing.
\u2022 Students who seem anxious about "the last lesson" \u2014 reassure: "Everything you have learned in this unit stays with you. These skills will come with you into the next unit."

[General: Title \u2014 VTLM 2.0: Establishing Purpose and Relevance]`;

const NOTES_LI = `SAY:
\u2022 Read from slide: "Here are our learning intentions for today."
\u2022 Point to each LI: "We are writing a body paragraph, using emotive language, finding information, using persuasive structure, and proofreading our work."
\u2022 Point to success criteria: "By the end of the lesson, you will be able to do each of these things. The big one today is writing your paragraph \u2014 that is where most of our time goes."

DO:
\u2022 Read each LI aloud. Keep this brisk \u2014 90 seconds maximum.
\u2022 Point to each SC as you read it. Ask: "Which of these did we start in Lesson 24?" [Write a body paragraph from SPO, use emotive language.]
\u2022 Leave visible for 15 seconds for silent re-reading.

TEACHER NOTES:
Five learning intentions aligns with Victorian Curriculum descriptors for persuasive writing at Level 3/4. The SCs are deliberately practical and observable: students can self-assess against each one by the end of the lesson. "Edit my paragraph using the 4-step checklist" is the only entirely new SC \u2014 the others consolidate L24 learning. VTLM 2.0: Making Learning Visible / Clear Learning Intentions.

WATCH FOR:
\u2022 Students who are unfamiliar with "proofread" or "revise" \u2014 brief clarification: "Proofread means checking for errors. Revise means making it better. We will learn exactly how to do both today."
\u2022 Students who seem disengaged with LIs \u2014 hook them: "Today is the day your plan becomes a REAL paragraph. This is the fun part."

[General: LI/SC \u2014 VTLM 2.0: Making Learning Visible / Clear Learning Intentions]`;

const NOTES_REVISION = `SAY:
\u2022 "Before we write, let\u2019s quickly recall what makes a strong body paragraph. We learned these features in Lesson 24."
\u2022 Point to each feature and read it aloud. Ask: "Let\u2019s say it together \u2014 a body paragraph starts with a\u2026" [Students: "Topic sentence!"]
\u2022 "Good. And what do supporting details do?" [They give evidence, examples, or reasons that connect to the topic sentence.]
\u2022 "Excellent. You already know this. Today you PUT IT INTO PRACTICE."

DO:
\u2022 Display the five features. Use choral response for the first feature to energise the class.
\u2022 Keep this to 3 minutes maximum. This is RECALL, not reteaching. Students should be reciting these back to you.
\u2022 If students struggle to recall, do a quick reteach: "A body paragraph has five parts: topic sentence, supporting details with evidence, emotive language, a linking sentence, and everything connects to the TS."

CFU CHECKPOINT:
Technique: Choral Response

Script:
\u2022 "Everyone together: A body paragraph starts with a\u2026" [Topic sentence!]
\u2022 "And every supporting detail must connect back to the\u2026" [Topic sentence!]
\u2022 "What type of language do we use to persuade the reader to FEEL something?" [Emotive language!]
\u2022 Listen for: Strong, unified responses from \u226580% of the class.

PROCEED (if clear, unified responses):
Move to the supplementary text. Students have sufficient recall.

PIVOT (if responses are weak or mixed):
Most likely issue: Students did not consolidate L24 content sufficiently.
Reteach: Point to each feature on the slide and give a one-sentence explanation. "Number 1: Topic sentence \u2014 this is the MAIN IDEA of your paragraph, the first sentence. Number 2: Supporting details \u2014 these are sentences that give evidence or reasons. Number 3: Emotive language \u2014 words that make the reader FEEL something, like \u2018essential,\u2019 \u2018vital,\u2019 \u2018heartbreaking.\u2019 Number 4: Linking sentence \u2014 the last sentence that ties back to your argument. Number 5: Every sentence connects to the TS."
Re-check: "What does every sentence in a body paragraph connect to?" [The topic sentence.]

TEACHER NOTES:
This revision slide activates prior knowledge from L24 and establishes the success criteria for the writing task. The five features are the same ones taught explicitly in L24 \u2014 today they shift from declarative knowledge ("I know what these are") to procedural knowledge ("I can use them in my writing"). Choral Response is deliberately chosen here because it is fast, inclusive, and builds collective confidence before independent writing. DECIDE Framework: D (Define what students already know). VTLM 2.0: Retention and Recall.

WATCH FOR:
\u2022 Students who cannot recall any features \u2014 these students will need the teacher\u2019s model paragraph visible during writing (keep Slide 5 accessible).
\u2022 Students who recall "topic sentence" but not "emotive language" \u2014 this is the harder concept. Flag these students for conferencing during You Do.
\u2022 Readiness signal: \u226580% can complete the choral responses without looking at the slide.

[General: Review/Activation of Prior Knowledge \u2014 VTLM 2.0: Retention and Recall]`;

const NOTES_READING = `SAY:
\u2022 "Before we start writing, we are going to read a short supplementary text called \u2018Libraries are Special Places.\u2019 This text is FULL of facts you can use as evidence in your persuasive paragraph."
\u2022 "I need four volunteers to read aloud \u2014 one paragraph each." [Select readers.]
\u2022 "Everyone else: follow along and listen for FACTS. A fact is something that is true and can be proven."
\u2022 After reading: "Now \u2014 Quick-Write! You have 60 seconds. Write ONE new fact from this text on your SPO that you could use as evidence in your paragraph. Go!"
\u2022 After 60 seconds: "Pencils down. Who can share the fact they chose?" [Cold Call 2\u20133 students.]

DO:
\u2022 Distribute the supplementary text "Libraries are Special Places" if not already provided.
\u2022 Select four confident readers \u2014 one per paragraph. Keep transitions between readers to under 5 seconds.
\u2022 After reading, set a visible timer for 60 seconds. Students write on their SPO.
\u2022 Circulate during the Quick-Write \u2014 check students are writing FACTS, not opinions.
\u2022 Cold Call 2\u20133 students to share. Validate: "That IS a fact \u2014 great evidence for a persuasive paragraph."

CFU CHECKPOINT:
Technique: Cold Call (after Quick-Write)

Script:
\u2022 "Who can tell me one fact from the text?" Cold call a student.
\u2022 If the student shares a fact: "Yes! That is a fact because it can be verified. How could you use that as evidence in a persuasive paragraph about libraries?"
\u2022 If the student shares an opinion: "Is that a FACT or an OPINION? A fact is something we can prove. Can you find a fact in the text instead?"
\u2022 Cold call 1\u20132 more students. Validate each fact.

PROCEED (if students can identify facts from the text):
Move to the model revision. Students have evidence to add to their SPOs.

PIVOT (if students struggle to identify facts):
Most likely issue: Students confuse facts with opinions or cannot locate specific information.
Reteach: "A fact is something that is TRUE and can be PROVEN. \u2018Libraries are important\u2019 is an opinion \u2014 not everyone might agree. But \u2018The Library of Alexandria was built in ancient Egypt\u2019 is a FACT \u2014 we can look it up. Find me one more fact."
Re-check: Cold call a different student. If correct, proceed.

TEACHER NOTES:
The supplementary text serves a dual purpose: (1) it gives students fresh evidence for their persuasive paragraphs, and (2) it practises the curriculum descriptor "Locate, select and retrieve relevant information." The text covers famous libraries from ancient Egypt (Library of Alexandria) through to modern times, showing how libraries protect knowledge, adapt to technology, and serve communities. The Quick-Write is deliberately short (60 seconds) to maintain pace and prevent students from writing too much before the main writing task. Cross-Curriculum Links: VC2HH4S04 (historical sources), VC2HH4S01 (historical knowledge). VTLM 2.0: Scaffold Practice / Building Knowledge.

WATCH FOR:
\u2022 Students who write an opinion instead of a fact \u2014 redirect during the Quick-Write: "Is that something you can PROVE? Find a fact from the text."
\u2022 Students who cannot find a fact \u2014 point them to a specific paragraph: "Look at the second paragraph. What does it say about the Library of Alexandria?"
\u2022 Students who do not have their SPO \u2014 give them a blank sheet. They can write the fact there and transfer it to their SPO later.
\u2022 Readiness signal: \u226580% of students have written at least one fact on their SPO within 60 seconds.

[General: Guided Practice (We Do \u2014 Shared Reading) \u2014 VTLM 2.0: Building Knowledge]`;

const NOTES_MODEL = `SAY:
\u2022 "Let\u2019s quickly look at how I turned MY plan into a paragraph. On the left is my SPO from Lesson 24. On the right is the paragraph I wrote from it."
\u2022 Point to the SPO: "See \u2014 my topic sentence is right here in my plan. My three supporting points are listed. And I noted where I would use emotive language."
\u2022 Point to the paragraph: "Now look at the paragraph. Notice four things:"
\u2022 "ONE: I started with my topic sentence. It tells the reader the main idea."
\u2022 "TWO: Each supporting point from my plan became its own sentence."
\u2022 "THREE: I used emotive language \u2014 can you spot it?" [Allow 5 seconds.] "Words like \u2018vital\u2019 and \u2018irreplaceable.\u2019 These make the reader FEEL something."
\u2022 "FOUR: My linking sentence at the end ties back to the topic sentence."
\u2022 "Your job is to do exactly the same thing with YOUR SPO."

DO:
\u2022 Display the two-column modelling slide. Point to each element as you narrate.
\u2022 Keep this to 3 minutes MAXIMUM. This is revision of L24 modelling, not new teaching.
\u2022 Do NOT re-write the paragraph live. Simply point to the existing model and highlight the four features.
\u2022 Leave the slide visible or tell students you will come back to it if they need a reference during writing.

TEACHER NOTES:
This is a brief model revision, not a full I Do. Students saw the teacher model writing from SPO to paragraph in L24 \u2014 today we remind them of the process and the key features to look for. The two-column layout (plan on left, paragraph on right) makes the SPO\u2192paragraph transformation visual and concrete. The four numbered observations (TS first, SP\u2192sentences, emotive language, linking sentence) give students a mental checklist for their own writing. DECIDE Framework: C (Consolidate through modelling review). VTLM 2.0: Modelling / Worked Examples.

WATCH FOR:
\u2022 Students who look lost \u2014 they may not remember the L24 model. Pair them with a student who does, or keep this slide accessible during writing.
\u2022 Students who rush to start writing before seeing the model \u2014 redirect: "Wait. Watch me point out the four features first. Then you write."
\u2022 Readiness signal: Students can point to the topic sentence and one piece of emotive language in the model paragraph.

[General: Explicit Instruction (I Do \u2014 Model Revision) \u2014 VTLM 2.0: Modelling / Worked Examples]`;

const NOTES_EDITING_IDO = `SAY:
\u2022 "After you write your paragraph, you need to EDIT it. Editing is how good writers make their work even better."
\u2022 "I am going to teach you a 4-step editing checklist that you will use today \u2014 and in every piece of writing from now on."
\u2022 Point to each step:
  \u2014 "Step 1: Read your paragraph aloud quietly. Does it FLOW? If you stumble over a sentence, it probably needs fixing."
  \u2014 "Step 2: Check \u2014 does every sentence connect to your topic sentence? If a sentence does not support your main idea, it does not belong."
  \u2014 "Step 3: Circle your emotive language. Is there at least ONE emotive word or phrase? If not, add one."
  \u2014 "Step 4: Check spelling and punctuation. Read backwards word by word to spot spelling errors."
\u2022 "Now \u2014 here is my question for you." Display the question: "Which step do you think most students skip?"
\u2022 "Think about it. Turn to your partner and discuss for 30 seconds."
\u2022 After pairs share: Click to reveal. "Step 2. Most students check spelling but forget to check whether their sentences actually SUPPORT the topic sentence. A perfectly spelled sentence that does not connect to your TS is still a problem."

DO:
\u2022 Display the 4-step checklist. Point to each step as you read it aloud.
\u2022 Spend about 30 seconds on each step \u2014 brief explanation, no extended examples yet (that is the We Do).
\u2022 Run Think-Pair-Share for the question: 10 seconds think, 30 seconds pair, then cold call 2 pairs.
\u2022 Click to reveal the answer after pairs have shared.
\u2022 Emphasise Step 2 as the "hidden" editing skill \u2014 coherence checking, not just error checking.

CFU CHECKPOINT:
Technique: Think-Pair-Share

Script:
\u2022 "Which step do you think most students skip? Think for 10 seconds, then turn and talk."
\u2022 After 30 seconds: cold call 2 pairs. "What did you and your partner decide?"
\u2022 Expected responses: Some will say Step 4 (spelling), some will say Step 2, some Step 3.
\u2022 Accept all answers, then reveal: "The answer is Step 2. Here is why\u2026"

PROCEED (after reveal):
Move to the We Do editing practice. Students understand the checklist.

TEACHER NOTES:
This is the only NEW content in Lesson 25. The 4-step editing checklist is a transferable writing strategy that students will use beyond this unit. The steps are sequenced intentionally: (1) fluency check first (read aloud), (2) coherence check (TS connection), (3) persuasive technique check (emotive language), (4) mechanics last (spelling/punctuation). This sequence mirrors professional editing practice: content and structure before surface features. Many students (and adults) default to Step 4 only \u2014 the Think-Pair-Share question is designed to surface this misconception. DECIDE Framework: E (Execute through explicit instruction \u2014 I Do). VTLM 2.0: Explicit Explanation.

MISCONCEPTIONS:
\u2022 Misconception: Editing means fixing spelling mistakes.
  Why: Students associate "editing" exclusively with mechanics because that is the most visible and concrete editing task.
  Impact: If students only check spelling, they will produce mechanically correct but structurally weak paragraphs. Sentences may be spelled correctly but not support the topic sentence.
  Quick correction: "Editing is MORE than spelling. A perfectly spelled sentence that does not connect to your topic sentence is still a problem. Step 2 \u2014 checking connection to the TS \u2014 is the most important step."

WATCH FOR:
\u2022 Students who look overwhelmed by 4 steps \u2014 reassure: "You do not have to memorise these. You will have the checklist in front of you."
\u2022 Students who are eager to start writing and are not paying attention to the editing instruction \u2014 redirect: "This is the skill that turns a good paragraph into a GREAT paragraph. Watch carefully."
\u2022 Readiness signal: Students can name at least 2 of the 4 steps when asked.

[General: Explicit Instruction (I Do) \u2014 Editing \u2014 VTLM 2.0: Explicit Explanation]`;

const NOTES_EDITING_WEDO = `SAY:
\u2022 "Now let\u2019s practise editing together. Look at this paragraph on the screen."
\u2022 Read the paragraph aloud: "Reading is good. Kids should read more books. My favourite book is Matilda because it is funny. Reading help you learn new words. libraries are important for everyone."
\u2022 "Using the 4-step checklist, find the problems. Write the STEP NUMBER and the PROBLEM on your whiteboard. For example, if you find a spelling error, write \u2018Step 4 \u2014 spelling mistake.\u2019 You have 60 seconds."
\u2022 "3, 2, 1 \u2014 boards up!"
\u2022 After scanning boards: Click to reveal. "Let\u2019s go through them together."
\u2022 Point to each error:
  \u2014 "Step 1: \u2018Reading is good\u2019 \u2014 weak topic sentence, no emotive language. It does not flow well as an opening."
  \u2014 "Step 2: \u2018My favourite book is Matilda because it is funny\u2019 \u2014 this does NOT connect to the topic sentence about reading being good. It is about a specific book, not about why reading is good. It does not belong."
  \u2014 "Step 3: No emotive language anywhere. No words that make the reader FEEL why reading matters."
  \u2014 "Step 4: \u2018Reading help\u2019 \u2014 should be \u2018helps.\u2019 Grammar error."
  \u2014 "Step 4: \u2018libraries\u2019 \u2014 missing capital letter at the start of a sentence."
\u2022 "See how the checklist catches DIFFERENT types of problems? That is why we need all four steps."

DO:
\u2022 Display the flawed paragraph. Read it aloud exactly as written (including the errors).
\u2022 Distribute whiteboards if not already out. Set 60 seconds for students to identify errors.
\u2022 Say "Boards up!" and scan quickly. Note which steps students identify (most will find Step 4 errors; fewer will find Step 2).
\u2022 Click to reveal the annotated version. Walk through each error, connecting it to the relevant checklist step.
\u2022 Spend extra time on the Step 2 error (off-topic sentence) \u2014 this is the hardest and most important.

CFU CHECKPOINT:
Technique: Show Me Boards

Script:
\u2022 "Write the step number and the problem you found. You have 60 seconds."
\u2022 "3, 2, 1 \u2014 boards up!"
\u2022 Scan for: Students who identify the Step 2 error (off-topic sentence). This is the highest-value finding.
\u2022 Count: How many found Step 4 errors? [Most.] How many found the Step 2 error? [Fewer.]
\u2022 "Notice \u2014 most of you found the spelling and grammar errors. But the BIGGEST problem is the sentence that does not belong. That is why Step 2 matters."

PROCEED (if \u226560% identify at least 2 different types of errors):
Move to You Do. Students understand multi-step editing.

PIVOT (if <60% identify more than spelling errors):
Most likely issue: Students are only looking for Step 4 (mechanics) and ignoring Steps 1\u20133.
Reteach: "Let\u2019s use the checklist step by step. Step 1: I read it aloud. Does \u2018Reading is good\u2019 sound like a strong opening? No \u2014 it is bland. Step 2: Does EVERY sentence connect to \u2018Reading is good\u2019? Read the third sentence: \u2018My favourite book is Matilda because it is funny.\u2019 Does that tell us why reading is good? No \u2014 it tells us about a specific book. It does not belong."
Re-check: "On your whiteboard, write the sentence that does NOT belong." Scan for the correct answer.

TEACHER NOTES:
The deliberately flawed paragraph is calibrated to contain errors at EVERY level of the checklist, not just mechanics. This is pedagogically important: students must see that editing addresses content and structure, not just spelling. The five errors are: (1) weak TS with no emotive language, (2) off-topic sentence that does not support the TS, (3) no emotive language anywhere, (4) grammar error ("help" instead of "helps"), (5) missing capital letter. The Step 2 error (off-topic sentence) is the most challenging because students must evaluate whether a sentence BELONGS in the paragraph, not just whether it is spelled correctly. DECIDE Framework: C (Check understanding through guided practice \u2014 We Do). VTLM 2.0: Scaffold Practice.

ENABLING & EXTENDING:
ENABLING PROMPT:
\u2022 Task: Give students a simplified version with only 2 errors (the grammar error and the missing capital) and ask them to find just those. Remove the structural errors to reduce cognitive load.
\u2022 Extra Notes: After they find the mechanical errors, then reveal the off-topic sentence: "Now I will show you a BIGGER problem that the checklist catches."

EXTENDING PROMPT:
\u2022 Task: Ask students to REWRITE the flawed paragraph, fixing all five errors and adding emotive language. This moves from identification to application.
\u2022 Extra Notes: "Can you turn \u2018Reading is good\u2019 into a strong topic sentence with emotive language? Try: \u2018Reading is one of the most powerful gifts we can give ourselves.\u2019"

WATCH FOR:
\u2022 Students who only find spelling errors \u2014 redirect: "You found Step 4 errors. Now try Step 2. Read each sentence and ask: does this connect to the topic sentence?"
\u2022 Students who think the Matilda sentence belongs because "it IS about reading" \u2014 probe: "Does it tell us why reading is GOOD? Or does it just tell us about a favourite book?"
\u2022 Readiness signal: \u226560% identify the off-topic sentence (Step 2 error) in addition to at least one mechanical error.

[General: Guided Practice (We Do) \u2014 Editing \u2014 VTLM 2.0: Scaffold Practice]`;

const NOTES_YOUDO = `SAY:
\u2022 "It is YOUR turn. This is the big moment \u2014 you are going to write your complete persuasive body paragraph."
\u2022 Read from slide: "First: Check your SPO. Is it complete? If you need to add evidence from \u2018Libraries are Special Places,\u2019 do that now."
\u2022 "Next: Write your body paragraph from your SPO. Start with your topic sentence. Then write each supporting point as its own sentence. Use emotive language. End with a linking sentence."
\u2022 "Then: Self-edit using the 4-step checklist. Circle any changes you make in a DIFFERENT colour so I can see your editing work."
\u2022 "You have 20 minutes. I will give you a 5-minute warning before time is up. Begin!"

DO:
\u2022 Ensure students have: (1) their SPO from L24, (2) the supplementary text, (3) the editing checklist (EC1 \u2014 distribute printed copies), (4) a different colour pen/pencil for editing.
\u2022 Set a visible timer for 20 minutes. This is the protected writing block \u2014 do not cut it short.
\u2022 Circulate immediately. For the first 3 minutes, check that students are writing a TOPIC SENTENCE first.
\u2022 At the 10-minute mark, quietly announce: "If you have not started your linking sentence yet, aim to finish your supporting details and write your linking sentence now."
\u2022 At the 15-minute mark, announce: "5 minutes left. If you have finished writing, begin the 4-step editing checklist. Use your different colour."
\u2022 Conference with 4\u20136 students during the 20 minutes. Prioritise: (a) students who are stuck, (b) students who are not using emotive language, (c) students who are not editing.

TEACHER NOTES:
This is the culmination of the entire persuasive writing sequence (L22\u201325). The 20-minute writing block is non-negotiable \u2014 students need sustained time to produce a complete paragraph. The three-step task structure (complete SPO \u2192 write paragraph \u2192 self-edit) allows students at different stages to enter at the appropriate point. Students who completed their SPO in L24 can begin writing immediately; those who need more planning time have it built in. The editing step (with different colour) makes the revision process VISIBLE to both the student and the teacher \u2014 you can see at a glance who edited and what they changed. DECIDE Framework: D (Differentiate through fading \u2014 students write independently with checklist support). VTLM 2.0: Supported Application / Independent Practice.

ENABLING & EXTENDING:
ENABLING PROMPT:
\u2022 Task: Provide students with a sentence starter for their topic sentence. E.g., "Libraries are important because\u2026" or "Everyone should have access to libraries because\u2026" This removes the hardest part (generating the TS) and lets them focus on supporting details and emotive language.
\u2022 Extra Notes: Have 2\u20133 sentence starters on cards. Let enabling students choose one. Also consider pairing them with a peer who has a completed SPO for reference.

EXTENDING PROMPT:
\u2022 Task: Students write a SECOND body paragraph with a different argument. If their first paragraph argued "libraries protect knowledge," the second could argue "libraries provide equal access to learning." This extends single-paragraph to multi-paragraph persuasive structure.
\u2022 Extra Notes: Challenge: "Can you write a linking sentence that connects your first paragraph to your second? That is how professional writers build an argument."

WATCH FOR:
\u2022 Students who write a narrative instead of a persuasive paragraph \u2014 redirect: "Is this PERSUADING the reader? Or is it TELLING a story? Persuasive writing uses evidence and emotive language to convince."
\u2022 Students who write only 1\u20132 sentences \u2014 probe: "How many supporting points are on your SPO? Each one needs its own sentence."
\u2022 Students who skip the editing step \u2014 redirect: "Pick up your different colour pen. Run through the 4 steps. Step 1: read it aloud quietly."
\u2022 Students whose sentences do not connect to the TS \u2014 conference: "Read me your topic sentence. Now read me this sentence. Does this sentence tell us MORE about your topic sentence?"
\u2022 Readiness signal: \u226570% of students produce a paragraph with at least 4 sentences (TS + 2 SP + linking sentence). At least 50% show visible editing marks in a different colour.

[General: Independent Practice (You Do) \u2014 Persuasive Writing \u2014 VTLM 2.0: Supported Application]`;

const NOTES_RESOURCES = `TEACHER NOTES:
Distribute the Editing Checklist (EC1) before students begin the You Do phase. Each student needs their own copy to reference during writing and editing. The checklist is designed to be kept \u2014 students can use it in future writing tasks across all subjects.

PREPARATION:
\u2022 Print one copy per student of EC1_Editing_Checklist.pdf (A4, single-sided).
\u2022 Have extra copies available for students who lose or damage theirs.
\u2022 Consider laminating a few copies for the writing corner as a permanent classroom resource.

[General: Resources \u2014 VTLM 2.0: Scaffolding Tools]`;

const NOTES_CLOSING = `SAY:
\u2022 "Put your pens down. Let\u2019s take a moment to reflect \u2014 not just on today, but on the ENTIRE Matilda unit."
\u2022 "Over 25 lessons, we have read Roald Dahl\u2019s Matilda together. We have explored characters, learned new vocabulary, analysed figurative language, studied how authors use dialogue, learned about topic sentences and supporting details, and finally \u2014 written our own persuasive paragraphs."
\u2022 "That is an incredible journey. You should be proud of how far you have come."
\u2022 Read the Turn & Talk prompt: "What is ONE skill from this unit that you will use in your writing from now on?"
\u2022 Allow 60 seconds Turn & Talk. Circulate and listen.
\u2022 Share 3\u20134 responses (more than usual \u2014 this is the final lesson).
\u2022 After sharing: "I have heard skills like \u2018using emotive language,\u2019 \u2018writing topic sentences,\u2019 \u2018editing with the checklist,\u2019 and \u2018using evidence to support my ideas.\u2019 These are not just Matilda skills \u2014 they are WRITING skills. They go with you everywhere."
\u2022 Point to takeaways: "Let me read these final takeaways. These are the big things you take away from 25 lessons."
\u2022 "And finally \u2014 thank you for being such wonderful readers, thinkers, and writers throughout this unit. Matilda would be proud of you."

DO:
\u2022 Run the Turn & Talk for 60 seconds. Circulate and listen to as many pairs as possible.
\u2022 Share 3\u20134 responses \u2014 extend the sharing time here because this is the FINAL closing.
\u2022 Read the key takeaways aloud. Make eye contact around the room as you do.
\u2022 End with genuine praise. Name specific things the class has achieved: "In Lesson 1, some of you had never heard the word \u2018inference.\u2019 Now you can infer character traits, make predictions, and explain your thinking with evidence."
\u2022 Collect written paragraphs for assessment if needed.
\u2022 Collect or note who has the editing checklist \u2014 it should stay in student folders.

TEACHER NOTES:
This is the FINAL lesson of a 25-lesson unit. The closing should feel celebratory and reflective, not rushed. Allow extra time (4 minutes instead of the usual 2) for sharing and reflection. The reflection prompt is deliberately forward-looking ("What skill will you USE from now on?") rather than backward-looking ("What did you learn?") \u2014 this encourages transfer and metacognition. The takeaways name four concrete skills: body paragraph writing, SPO-to-paragraph process, self-editing, and the Matilda journey. The final line about Matilda being proud connects the character\u2019s love of learning to the students\u2019 own growth.

ASSESSMENT OPPORTUNITY:
This lesson provides summative evidence for multiple Victorian Curriculum descriptors:
\u2022 VC2E4LY03: Create texts that include an introduction, sequenced paragraphs, and a conclusion
\u2022 VC2E4LY05: Read and view texts, applying growing knowledge of text structures
\u2022 VC2E4LY08: Use language features to create texts, including emotive language for persuasion
\u2022 VC2E4LY09: Proofread, revise and edit written texts
Collect paragraphs and assess against these descriptors. Use the editing checklist marks as evidence of VC2E4LY09.

NEXT STEPS:
\u2022 The next unit will build on the persuasive writing skills established here.
\u2022 Students should keep their editing checklists in their writing folders as a permanent reference.
\u2022 Consider displaying exemplar paragraphs (with student permission) as mentor texts for the next unit.
\u2022 The SPO planning structure can be revisited in future persuasive writing tasks.

WATCH FOR:
\u2022 Students who seem sad that the unit is over \u2014 validate: "It is okay to feel that way. Good books and good learning stay with us."
\u2022 Students who cannot name a skill \u2014 prompt: "Think about what we did today. You wrote a whole paragraph from a plan. That is a skill. What did you do after writing?" [Edited using the checklist.]
\u2022 Readiness signal: A calm, warm close with genuine student reflections and a sense of accomplishment.

[General: Closing / Unit Wrap-Up \u2014 VTLM 2.0: Retention and Recall / Consolidation]`;

// =============================================================================
// Main build
// =============================================================================

(async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Explicit Teaching Slide Generator";
  pres.title  = "Matilda Lesson 25 \u2014 Persuasive Writing: Write a Body Paragraph";

  // ===========================================================================
  // SLIDE 1: TITLE
  // ===========================================================================
  titleSlide(
    pres,
    "Persuasive Writing",
    "Writing a Body Paragraph \u2014 Final Lesson",
    "Lesson 25 of 25  |  Week 5  |  Year 3/4 Literacy",
    NOTES_TITLE
  );

  // ===========================================================================
  // SLIDE 2: LEARNING INTENTIONS & SUCCESS CRITERIA
  // ===========================================================================
  liSlide(
    pres,
    [
      "We are learning to write and edit a persuasive body paragraph",
    ],
    [
      "I can write a body paragraph from my SPO using evidence and emotive language",
      "I can check that every sentence connects back to my topic sentence",
      "I can edit my paragraph using the 4-step editing checklist",
    ],
    NOTES_LI,
    FOOTER
  );

  // ===========================================================================
  // SLIDE 3: QUICK REVISION — Body paragraph features
  // ===========================================================================
  {
    const s = pres.addSlide();
    addTopBar(s, C.PLUM);
    addBadge(s, "Revision", { color: C.PLUM });
    addTitle(s, "What Makes a Strong Body Paragraph?");

    const features = [
      { num: "1", text: "Starts with a clear topic sentence (the main idea)", color: C.PLUM },
      { num: "2", text: "Supporting details give evidence, examples, or reasons", color: C.TEAL },
      { num: "3", text: "Uses emotive language to persuade the reader", color: C.CORAL },
      { num: "4", text: "Ends with a linking sentence that ties back to the argument", color: C.SAGE },
      { num: "5", text: "Every sentence connects to the topic sentence", color: C.AMBER },
    ];

    const cardH  = 0.62;
    const gap    = 0.12;

    features.forEach((f, i) => {
      const y = CONTENT_TOP + i * (cardH + gap);
      addCard(s, 0.5, y, 9, cardH, { fill: C.WHITE });
      // Numbered circle
      s.addShape("roundRect", {
        x: 0.65, y: y + 0.10, w: 0.42, h: 0.42, rectRadius: 0.21,
        fill: { color: f.color },
      });
      s.addText(f.num, {
        x: 0.65, y: y + 0.10, w: 0.42, h: 0.42,
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      // Feature text
      s.addText(f.text, {
        x: 1.25, y: y + 0.04, w: 7.9, h: cardH - 0.08,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_REVISION);
  }

  // ===========================================================================
  // SLIDE 4: READING — "Libraries are Special Places"
  // ===========================================================================
  contentSlide(
    pres,
    "Read Aloud", C.PLUM,
    "Libraries are Special Places",
    [
      "Supplementary text \u2014 Student Read Aloud",
      "Listen for FACTS you can use as evidence in your paragraph",
      "Famous libraries from ancient Egypt to modern times",
      "How libraries protect knowledge, adapt to technology, and serve communities",
    ],
    NOTES_READING,
    FOOTER,
    (slide) => {
      // Right-side card: Quick-Write instruction
      addCard(slide, 6.1, CONTENT_TOP, 3.4, SAFE_BOTTOM - CONTENT_TOP, { fill: C.PARCHMENT });
      slide.addShape("roundRect", {
        x: 6.25, y: CONTENT_TOP + 0.12, w: 2.0, h: 0.36, rectRadius: 0.08,
        fill: { color: C.CORAL },
      });
      slide.addText("Quick-Write", {
        x: 6.25, y: CONTENT_TOP + 0.12, w: 2.0, h: 0.36,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      slide.addText("After reading:", {
        x: 6.3, y: CONTENT_TOP + 0.62, w: 3.0, h: 0.26,
        fontSize: 11, fontFace: FONT_B, color: C.PLUM, bold: true, margin: 0,
      });
      slide.addText("Write ONE new fact on your SPO that you could use as evidence.", {
        x: 6.3, y: CONTENT_TOP + 0.94, w: 3.0, h: 1.0,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
      });
      // Timer indicator
      slide.addShape("roundRect", {
        x: 6.6, y: CONTENT_TOP + 2.3, w: 2.4, h: 0.44, rectRadius: 0.08,
        fill: { color: C.TEAL },
      });
      slide.addText("60 seconds", {
        x: 6.6, y: CONTENT_TOP + 2.3, w: 2.4, h: 0.44,
        fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
    }
  );

  // ===========================================================================
  // SLIDE 5: REVISE MODEL — SPO to Paragraph
  // ===========================================================================
  modellingSlide(
    pres,
    "I Do \u2014 Revision", "SPO to Paragraph: Teacher Model",
    [
      { text: "Teacher\u2019s SPO", options: { bold: true, fontSize: 13, color: C.PLUM, breakLine: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "Topic Sentence:", options: { bold: true, fontSize: 11, color: C.TEAL, breakLine: true } },
      { text: "Libraries are essential places that every community needs.", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "Supporting Point 1:", options: { bold: true, fontSize: 11, color: C.TEAL, breakLine: true } },
      { text: "Protect and preserve knowledge", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "Supporting Point 2:", options: { bold: true, fontSize: 11, color: C.TEAL, breakLine: true } },
      { text: "Free access for everyone", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "Emotive language:", options: { bold: true, fontSize: 11, color: C.CORAL, breakLine: true } },
      { text: "essential, vital, irreplaceable", options: { fontSize: 12, color: C.CHARCOAL } },
    ],
    [
      { text: "Written Paragraph", options: { bold: true, fontSize: 13, color: C.PLUM, breakLine: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "Libraries are essential places that every community needs.", options: { bold: true, fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: " They protect and preserve irreplaceable knowledge that would otherwise be lost forever.", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: " They also provide vital, free access to books and information for everyone \u2014 regardless of background.", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: " For these reasons, libraries remain one of the most important places in any community.", options: { fontSize: 12, color: C.CHARCOAL } },
    ],
    NOTES_MODEL,
    FOOTER
  );

  // ===========================================================================
  // SLIDES 6-7: EDITING I DO — 4-Step Checklist (withReveal)
  // ===========================================================================
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.PLUM);
      addBadge(s, "I Do \u2014 New Skill", { color: C.PLUM, w: 2.2 });
      addTitle(s, "How to Edit Your Paragraph");

      const steps = [
        { num: "1", text: "Read aloud quietly \u2014 does it flow?", color: C.PLUM },
        { num: "2", text: "Check: Does every sentence connect to your topic sentence?", color: C.TEAL },
        { num: "3", text: "Circle your emotive language \u2014 is there at least one?", color: C.SAGE },
        { num: "4", text: "Check spelling and punctuation \u2014 read backwards word by word.", color: C.AMBER },
      ];

      const cardH = 0.66;
      const gap   = 0.10;

      steps.forEach((step, i) => {
        const y = CONTENT_TOP + i * (cardH + gap);
        addCard(s, 0.5, y, 9, cardH, { fill: C.WHITE });
        // Step number circle
        s.addShape("roundRect", {
          x: 0.65, y: y + 0.08, w: 0.50, h: 0.50, rectRadius: 0.25,
          fill: { color: step.color },
        });
        s.addText(step.num, {
          x: 0.65, y: y + 0.08, w: 0.50, h: 0.50,
          fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
        // Step text
        s.addText(step.text, {
          x: 1.35, y: y + 0.04, w: 7.8, h: cardH - 0.08,
          fontSize: 15, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
        });
      });

      // Question at bottom
      const qY = CONTENT_TOP + 4 * (cardH + gap) + 0.06;
      if (qY + 0.50 <= SAFE_BOTTOM) {
        s.addShape("roundRect", {
          x: 0.5, y: qY, w: 9, h: 0.50, rectRadius: 0.08,
          fill: { color: C.PARCHMENT },
        });
        s.addText("Which step do you think most students skip?  Think-Pair-Share", {
          x: 0.7, y: qY, w: 8.6, h: 0.50,
          fontSize: 14, fontFace: FONT_B, color: C.PLUM, bold: true,
          valign: "middle", margin: 0,
        });
      }

      addFooter(s, FOOTER);
      s.addNotes(NOTES_EDITING_IDO);
      return s;
    },
    (slide) => {
      // Highlight Step 2 with a HONEY border
      const cardH = 0.66;
      const gap   = 0.10;
      const step2Y = CONTENT_TOP + 1 * (cardH + gap);

      slide.addShape("roundRect", {
        x: 0.42, y: step2Y - 0.04, w: 9.16, h: cardH + 0.08, rectRadius: 0.12,
        fill: { color: C.HONEY, transparency: 80 },
        line: { color: C.HONEY, width: 3 },
      });

      // Answer banner at the bottom
      const qY = CONTENT_TOP + 4 * (cardH + gap) + 0.06;
      slide.addShape("roundRect", {
        x: 0.5, y: qY, w: 9, h: 0.50, rectRadius: 0.08,
        fill: { color: C.HONEY },
      });
      slide.addText("Step 2! Most students check spelling but forget to check if sentences support the TS.", {
        x: 0.7, y: qY, w: 8.6, h: 0.50,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
        valign: "middle", margin: 0,
      });
    }
  );

  // ===========================================================================
  // SLIDES 8-9: EDITING WE DO — Flawed Paragraph (withReveal)
  // ===========================================================================
  withReveal(
    () => cfuSlide(
      pres,
      "We Do \u2014 Editing",
      "Find the Problems",
      "Show Me Boards",
      "\"Reading is good. Kids should read more books. My favourite book is Matilda because it is funny. Reading help you learn new words. libraries are important for everyone.\"\n\nUsing the 4-step checklist, find the problems.\nWrite the STEP NUMBER and the PROBLEM on your whiteboard.",
      NOTES_EDITING_WEDO,
      FOOTER
    ),
    (slide) => {
      // Annotated answer overlay covering the question card area
      const ansY = CONTENT_TOP + 0.56 + 0.15;
      const ansH = SAFE_BOTTOM - ansY - 0.05;

      slide.addShape("roundRect", {
        x: 0.57, y: ansY, w: 8.86, h: ansH, rectRadius: 0.08,
        fill: { color: C.PARCHMENT },
        line: { color: C.CORAL, width: 2 },
      });

      slide.addText("Errors Found", {
        x: 0.75, y: ansY + 0.06, w: 4, h: 0.26,
        fontSize: 12, fontFace: FONT_B, color: C.CORAL, bold: true, margin: 0,
      });

      const errors = [
        { step: "1", text: "\u201CReading is good\u201D \u2014 weak topic sentence, bland, does not flow", color: C.PLUM },
        { step: "2", text: "\u201CMy favourite book is Matilda\u2026\u201D \u2014 does NOT support the TS!", color: C.TEAL },
        { step: "3", text: "No emotive language used anywhere in the paragraph", color: C.SAGE },
        { step: "4", text: "\u201CReading help\u201D \u2192 \u201Chelps\u201D (grammar) + \u201Clibraries\u201D \u2192 capital L", color: C.AMBER },
      ];

      const errH = 0.52;
      const errGap = 0.06;
      errors.forEach((err, i) => {
        const ey = ansY + 0.38 + i * (errH + errGap);
        if (ey + errH > SAFE_BOTTOM) return;

        // Step badge
        slide.addShape("roundRect", {
          x: 0.72, y: ey + 0.06, w: 0.40, h: 0.40, rectRadius: 0.20,
          fill: { color: err.color },
        });
        slide.addText(err.step, {
          x: 0.72, y: ey + 0.06, w: 0.40, h: 0.40,
          fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
        // Error description
        slide.addText(err.text, {
          x: 1.25, y: ey, w: 8.0, h: errH,
          fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
        });
      });
    }
  );

  // ===========================================================================
  // SLIDE 10: YOU DO — Write Your Paragraph
  // ===========================================================================
  taskSlide(
    pres,
    "You Do", "Write Your Body Paragraph",
    [
      { label: "First",  instruction: "Check your SPO. Is it complete? Add evidence from \u2018Libraries are Special Places\u2019 if needed." },
      { label: "Next",   instruction: "Write your body paragraph from your SPO. Start with your topic sentence. Each supporting point becomes its own sentence. Use emotive language." },
      { label: "Then",   instruction: "Self-edit using the 4-step checklist. Circle changes in a DIFFERENT colour so you can see your editing work." },
    ],
    NOTES_YOUDO,
    FOOTER
  );

  // ===========================================================================
  // SLIDE 11: RESOURCES
  // ===========================================================================
  addResourceSlide(
    pres,
    [
      {
        name: "EC1 \u2014 Self-Editing Checklist",
        fileName: "EC1_Editing_Checklist.pdf",
        description: "4-step editing checklist for persuasive body paragraphs. One per student.",
      },
    ],
    { C, FONT_H, FONT_B },
    FOOTER,
    NOTES_RESOURCES
  );

  // ===========================================================================
  // SLIDE 12: CLOSING — UNIT WRAP-UP
  // ===========================================================================
  closingSlide(
    pres,
    "Over 25 lessons we have read Matilda\u2019s story, learned vocabulary, explored figurative language, and written our own paragraphs. What is ONE skill from this unit that you will use in your writing from now on?",
    [
      "We can write a persuasive body paragraph from an SPO",
      "We can turn a plan into sentences with emotive language",
      "We can self-edit using the 4-step checklist",
      "The Matilda journey is complete \u2014 these skills stay with us",
    ],
    NOTES_CLOSING
  );

  // ===========================================================================
  // WRITE PPTX
  // ===========================================================================
  await pres.writeFile({ fileName: OUT_DIR + "/Matilda_Lesson25_Write_Body_Paragraph.pptx" });
  console.log("\u2713 Written to " + OUT_DIR + "/Matilda_Lesson25_Write_Body_Paragraph.pptx");

  // ===========================================================================
  // GENERATE COMPANION PDF: EC1_Editing_Checklist.pdf
  // ===========================================================================
  await generateEditingChecklist();
  console.log("\u2713 Written to " + OUT_DIR + "/EC1_Editing_Checklist.pdf");
})();

// =============================================================================
// PDF Generation: EC1 — Self-Editing Checklist
// =============================================================================

async function generateEditingChecklist() {
  const doc = createPdf({ title: "Self-Editing Checklist \u2014 Persuasive Body Paragraph" });

  // ── Header ──────────────────────────────────────────────────────────────────
  let y = addPdfHeader(doc, "Self-Editing Checklist", {
    subtitle: "Persuasive Body Paragraph",
    color: C.PLUM,
    lessonInfo: "Matilda | Lesson 25 of 25 | Week 5 | Year 3/4 Literacy",
  });

  y += 8;

  // ── Introduction ────────────────────────────────────────────────────────────
  y = addBodyText(doc, "Use this checklist EVERY TIME you edit a persuasive paragraph. Work through all four steps in order. Tick each box when you have completed the step.", y, {
    fontSize: 11,
  });

  y += 4;

  // ── Checklist Steps ─────────────────────────────────────────────────────────
  const PAGE_MARGIN = 50;
  const CONTENT_W = 595.28 - 2 * PAGE_MARGIN;

  const steps = [
    {
      num: "1",
      title: "Read Aloud Quietly",
      instruction: "Read your paragraph aloud in a quiet voice. Listen to how it sounds. Does it flow smoothly from one sentence to the next? If you stumble over a sentence, mark it \u2014 it probably needs rewriting.",
      color: C.PLUM,
    },
    {
      num: "2",
      title: "Check: Does Every Sentence Connect to Your Topic Sentence?",
      instruction: "Read your topic sentence. Then read each supporting sentence and ask: \u201CDoes this sentence tell me MORE about my topic sentence?\u201D If a sentence does not connect, cross it out or rewrite it. This is the most important step.",
      color: C.TEAL,
    },
    {
      num: "3",
      title: "Circle Your Emotive Language",
      instruction: "Look for words that make the reader FEEL something (e.g., essential, vital, heartbreaking, incredible, devastating). Circle them. Is there at least one emotive word or phrase? If not, add one. Emotive language is what makes persuasive writing powerful.",
      color: C.SAGE,
    },
    {
      num: "4",
      title: "Check Spelling and Punctuation",
      instruction: "Read your paragraph backwards, word by word. This helps you see each word on its own, rather than reading what you THINK you wrote. Check: capital letters at the start of sentences, full stops at the end, and correct spelling of key words.",
      color: C.AMBER,
    },
  ];

  steps.forEach((step) => {
    // Check if we need a new page
    if (y > 841.89 - PAGE_MARGIN - 120) {
      doc.addPage();
      y = PAGE_MARGIN;
    }

    const boxH = doc.fontSize(10).font("Helvetica").heightOfString(step.instruction, { width: CONTENT_W - 80 }) + 54;

    // Background box
    doc.save();
    doc.roundedRect(PAGE_MARGIN, y, CONTENT_W, boxH, 4)
      .lineWidth(1)
      .strokeColor("#" + step.color)
      .stroke();
    doc.restore();

    // Step number circle
    doc.save();
    doc.circle(PAGE_MARGIN + 22, y + 22, 14).fill("#" + step.color);
    doc.fontSize(14).font("Helvetica-Bold").fillColor("#FFFFFF");
    doc.text(step.num, PAGE_MARGIN + 10, y + 14, { width: 24, align: "center" });
    doc.restore();

    // Checkbox
    doc.save();
    doc.rect(PAGE_MARGIN + CONTENT_W - 36, y + 10, 22, 22)
      .lineWidth(1.5)
      .strokeColor("#" + step.color)
      .stroke();
    doc.restore();

    // Step title
    doc.fontSize(12).font("Helvetica-Bold").fillColor("#" + step.color);
    doc.text(step.title, PAGE_MARGIN + 44, y + 10, { width: CONTENT_W - 100 });

    // Step instruction
    doc.fontSize(10).font("Helvetica").fillColor("#2D3142");
    doc.text(step.instruction, PAGE_MARGIN + 44, y + 32, { width: CONTENT_W - 80 });

    y += boxH + 12;
  });

  y += 4;

  // ── Tip Box ─────────────────────────────────────────────────────────────────
  y = addTipBox(doc, "Edit in a DIFFERENT colour so you can see your changes. This shows your teacher that you edited carefully \u2014 and helps you see how your writing improved.", y, {
    color: C.CORAL,
  });

  y += 6;

  // ── My Editing Notes section ────────────────────────────────────────────────
  y = addSectionHeading(doc, "My Editing Notes", y, { color: C.PLUM });

  y += 4;

  y = addBodyText(doc, "Use this space to write notes about your editing. What did you change? What did you add? What did you remove?", y, {
    fontSize: 10,
    italic: true,
    color: "6B7280",
  });

  y += 4;

  // 5 write-on lines
  y = addLinedArea(doc, y, 5, { lineSpacing: 30 });

  // ── Footer ──────────────────────────────────────────────────────────────────
  addPdfFooter(doc, "Matilda | Lesson 25 of 25 | Week 5 | Year 3/4 Literacy");

  await writePdf(doc, OUT_DIR + "/EC1_Editing_Checklist.pdf");
}
