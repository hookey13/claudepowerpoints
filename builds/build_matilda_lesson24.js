// Matilda — Lesson 24: Persuasive Writing — Plan a Body Paragraph
// Year 3/4 Literacy — Persuasive Writing (Pivot from Narrative) — Week 5
// Uses shared helpers from themes/matilda_helpers.js
// Companion PDFs: SPO1 (student planner) + SPO2 (teacher model)

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
  addBodyText, addWriteLine, addTipBox, addPdfFooter,
  addLinedArea, addResourceSlide,
} = require("../themes/pdf_helpers");

const OUT_DIR = "output/Matilda_Lesson24_Persuasive_Body_Paragraph";
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const FOOTER = "Matilda  |  Lesson 24 of 25  |  Week 5  |  Year 3/4 Literacy";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `SAY:
\u2022 "Today we are doing something different. We are putting our novels down and picking up our persuasive writing hats."
\u2022 "Over the past few weeks we have been reading Matilda and exploring narrative writing. Today we PIVOT to persuasive writing. We will learn how to plan a body paragraph \u2014 the engine room of any persuasive text."
\u2022 "First, we are going to read a short supplementary text about reading \u2014 yes, a text about reading! It will give us the evidence we need to write persuasively."

DO:
\u2022 Display this slide as students settle. Allow 15 seconds to read the title and subtitle.
\u2022 Build anticipation for the shift: "This is a big change in gear \u2014 we are moving from story to argument."

TEACHER NOTES:
PACING NOTE: This is a writing-focused session. Suggested timing: Title/LI (3 min), Supplementary Text Reading (8 min), Macrostructure Review (4 min), Body Paragraph Features (4 min), Emotive Language Hinge (3 min), SPO I Do Part 1 + Part 2 (10 min), We Do (5 min), You Do (10 min), Resources + Closing (3 min) = ~50 min. If running behind after the reading, shorten the macrostructure review to 2 minutes (students should recall this from earlier lessons). The SPO modelling and You Do are the priority new learning \u2014 protect this time.

This lesson marks the deliberate PIVOT from narrative study to persuasive writing. Students have spent Lessons 1\u201323 immersed in Matilda as a narrative text. Lesson 24 uses the novel study context (reading matters) as a springboard into persuasion. The supplementary text "Seven Interesting Facts About Reading" provides accessible, factual evidence that students can draw on when planning their persuasive body paragraph. This is a strategic choice: by writing about something they know well (reading), cognitive load stays on the STRUCTURE (body paragraph planning) rather than the CONTENT (finding evidence).

Cross-Curriculum Links: VC2HP4P03 (Describe factors that contribute to wellbeing), VC2HP4P06 (Describe strategies to make the classroom a healthy, safe and active place). Reading is framed as a wellbeing and learning strategy.

WATCH FOR:
\u2022 Students who seem confused by the shift from narrative to persuasive \u2014 reassure: "We are still using what we learned about good writing. Now we are applying it to a different text type."
\u2022 Students who ask "Are we still doing Matilda?" \u2014 respond: "We will finish our novel study in Lesson 25. Today we are building a new writing skill."

[General: Title \u2014 VTLM 2.0: Establishing Purpose and Relevance]`;

const NOTES_LI = `SAY:
\u2022 Read from slide: "Here are our learning intentions for today."
\u2022 Point to each LI briefly: "We are reading a new text to find evidence, learning about the structure of persuasive texts, and planning a body paragraph using a tool called the Single Paragraph Outline."
\u2022 Point to the success criteria: "By the end of the lesson, you will be able to name the parts of a body paragraph, explain what emotive language is, and plan your own body paragraph."

DO:
\u2022 Read each LI aloud. Keep this brisk (90 seconds max).
\u2022 Point to each SC as you read it. Ask students to give a thumbs up for any SC they already feel confident about.
\u2022 Leave visible for 15 seconds for silent re-reading.

TEACHER NOTES:
The learning intentions bridge literacy (reading for information, text structure) with writing craft (persuasive paragraph planning). The SCs are deliberately practical and observable \u2014 teachers can check each one during the lesson: (1) naming parts via the features slide, (2) explaining emotive language via the hinge question, (3) planning the SPO during You Do. The final SC ("plan my own body paragraph using an SPO") is the priority outcome. If students can do this, the lesson has succeeded. VTLM 2.0: Making Learning Visible / Clear Learning Intentions.

WATCH FOR:
\u2022 Students who give thumbs up on "plan my own body paragraph using an SPO" \u2014 probe: "Tell me what SPO stands for." This is new content; high confidence may indicate guessing.
\u2022 Students who seem overwhelmed \u2014 reassure: "We are learning ONE new tool today: the SPO. Everything else supports that."

[General: LI/SC \u2014 VTLM 2.0: Making Learning Visible / Clear Learning Intentions]`;

const NOTES_READING = `SAY:
\u2022 "Before we can write persuasively about reading, we need EVIDENCE. Today\u2019s text gives us real facts about why reading matters."
\u2022 "This is called a supplementary text \u2014 it supplements our learning. It is not a story. It is an informational text called 'Seven Interesting Facts About Reading.'"
\u2022 "I am going to select readers to share aloud. Everyone follows along."
\u2022 After reading: "Let\u2019s check what stuck."
\u2022 Cold Call: "[Student name], name one fact from the text that surprised you." [Expected answers: reading reduces stress by 68%, regular readers learn up to 1000 new words per year, reading improves test scores, reading exercises the brain like physical exercise strengthens muscles.]
\u2022 "Good. These facts are going to become our EVIDENCE when we write persuasively."

DO:
\u2022 Distribute or display the supplementary text "Seven Interesting Facts About Reading."
\u2022 Select 3\u20134 confident readers to read sections aloud. Keep transitions between readers to under 5 seconds.
\u2022 After reading, run a quick Cold Call CFU \u2014 call on 2\u20133 students to name a fact.
\u2022 Do not elaborate on every fact. The goal is comprehension, not deep analysis.
\u2022 Total time for this section: 8 minutes (reading + CFU).

CFU CHECKPOINT:
Technique: Cold Call

Script:
\u2022 Cold call a student: "Name one fact from the text that surprised you or that you think is important."
\u2022 If correct and specific (names a real fact from the text), cold call a second student: "What about you \u2014 a different fact."
\u2022 If the first student gives a vague answer ("Reading is good"), redirect: "That\u2019s a general idea. Can you give me a SPECIFIC fact \u2014 maybe a number or a detail from the text?"
\u2022 Cold call a third student: "Which fact do you think would be most convincing if you were trying to persuade someone that reading matters?"

PROCEED (if \u226580% can name a specific fact):
Move to macrostructure review. Students have engaged with the text and retained key evidence.

PIVOT (if <80% can name a specific fact):
Most likely issue: Students read passively without encoding the content. The text is informational, and some students may not have engaged as actively as they would with narrative.
Reteach: "Let me pull out three key facts for you." Read aloud: "(1) Reading reduces stress by 68%. (2) Regular readers learn up to 1000 new words per year. (3) Students who read daily score higher on tests." Write these on the board. "These are the facts we will use as evidence today."
Re-check: "Turn to your partner and say one of those three facts." Listen for accurate recall.

TEACHER NOTES:
This is NOT a novel reading lesson \u2014 it is a short informational text that provides the raw material (evidence) for persuasive writing. The text is deliberately chosen because the topic (why reading matters) is accessible and personally relevant to Year 3/4 students. The facts are concrete and quotable, making them ideal for body paragraph evidence. The Cold Call CFU ensures students have actually processed the content before moving to the writing instruction. VTLM 2.0: Scaffold Practice (shared reading with monitoring). DECIDE Framework: D (Define the content component \u2014 the evidence base).

WATCH FOR:
\u2022 Students who cannot name any fact \u2014 they may not have followed along. Note for targeted support during You Do.
\u2022 Students who confuse facts from the text with opinions \u2014 this is a teaching opportunity for later (distinguishing evidence from opinion in persuasive writing).
\u2022 Readiness signal: At least 2\u20133 students can name a specific, accurate fact from the text.

[General: Guided Practice (We Do \u2014 Shared Reading) \u2014 VTLM 2.0: Scaffold Practice]`;

const NOTES_MACROSTRUCTURE = `SAY:
\u2022 "Before we zoom in on body paragraphs, let\u2019s zoom out. What is the STRUCTURE of a persuasive text?"
\u2022 Point to the diagram: "A persuasive text has an Introduction, Body Paragraphs, and a Conclusion."
\u2022 "The introduction states your position \u2014 what you believe. The conclusion wraps it up and restates your argument."
\u2022 Point to the highlighted body paragraph: "But the BODY PARAGRAPHS are where the real work happens. This is where you present your evidence and convince the reader. Today, we are learning how to plan ONE strong body paragraph."
\u2022 "Think of it like a burger. The introduction and conclusion are the buns. The body paragraphs are the meat \u2014 that is where the substance is."

DO:
\u2022 Display the macrostructure diagram. Point to each section as you name it.
\u2022 Emphasise the highlighted body paragraph \u2014 this is today\u2019s focus.
\u2022 Keep this section to 4 minutes. Students should already have some familiarity with persuasive structure from prior units.
\u2022 Do NOT teach each section in depth \u2014 this is a reminder, not new learning.

TEACHER NOTES:
This slide provides the "big picture" before zooming into the body paragraph. The vertical flow diagram is more effective than bullet points because it shows the SEQUENTIAL RELATIONSHIP between sections \u2014 students need to understand that body paragraphs sit in the middle of a larger structure. The highlighted body paragraph with the "Today\u2019s focus" label creates a visual anchor: students can see exactly where today\u2019s learning fits within the whole. If students have strong prior knowledge of persuasive structure, this slide can be covered in 2 minutes. If not, extend to 4 minutes and add verbal scaffolding. VTLM 2.0: Making Learning Visible / Connecting to Prior Knowledge.

The "burger" analogy is well-known but effective for this age group. Use it only if students have not heard it before \u2014 if they have, reference it briefly and move on.

WATCH FOR:
\u2022 Students who cannot name the three parts of a persuasive text \u2014 this indicates weak prior knowledge. Note for additional support.
\u2022 Students who confuse "body paragraph" with "introduction" \u2014 clarify: "The introduction STATES your opinion. The body paragraphs PROVE it."
\u2022 Readiness signal: Students can point to the three sections on the diagram and name them.

[General: Explicit Instruction (I Do) \u2014 Text Structure \u2014 VTLM 2.0: Making Learning Visible]`;

const NOTES_BODY_FEATURES = `SAY:
\u2022 "Now let\u2019s zoom in. What does a strong body paragraph actually look like?"
\u2022 Go through each feature: "It starts with a TOPIC SENTENCE \u2014 we learned about these in an earlier lesson. The topic sentence tells the reader the main point of this paragraph."
\u2022 "Then we need SUPPORTING EVIDENCE \u2014 facts, statistics, or examples that prove the point."
\u2022 "After the evidence, we EXPLAIN why it matters. Don\u2019t just drop the evidence and walk away \u2014 tell the reader WHY it is important."
\u2022 "EMOTIVE LANGUAGE is the persuasive magic. It is language that makes the reader FEEL something."
\u2022 "Finally, a LINKING SENTENCE connects this paragraph to the next one, or back to your main argument."
\u2022 CFU: "Fingers up \u2014 how many of these features did we already learn about in earlier lessons?" [Expected: students should recognise topic sentences and possibly evidence.]
\u2022 "Right \u2014 topic sentences and evidence are familiar. The new parts today are EXPLANATION, EMOTIVE LANGUAGE, and LINKING SENTENCES."

DO:
\u2022 Display the slide. Point to each feature as you explain it.
\u2022 Keep explanations brief \u2014 20\u201330 seconds per feature. The detail comes during modelling.
\u2022 Run the Finger Voting CFU after naming all five features.
\u2022 Total time: 4 minutes.

CFU CHECKPOINT:
Technique: Finger Voting

Script:
\u2022 "Hold up fingers to show how many of these five features you have seen before. 1 finger = one feature, 5 fingers = all five."
\u2022 Scan the room. Most students should hold up 1\u20132 fingers (topic sentence, maybe evidence).
\u2022 "Most of you are showing 1 or 2. That makes sense \u2014 we have learned about topic sentences. Today we are adding four more pieces to the puzzle."

PROCEED (if most students show 1\u20132 fingers and can name topic sentences):
Move to emotive language hinge question. Students have the right baseline.

PIVOT (if most students show 0 or cannot name topic sentences):
Most likely issue: Students have not retained the topic sentence concept from Lesson 21.
Reteach: "A topic sentence is the MAIN IDEA of a paragraph. It tells the reader what the paragraph is about. It is usually the first sentence. For example: 'Reading is one of the most important skills a child can develop.' That is a topic sentence. Everything else in the paragraph supports it."
Re-check: "Thumbs up if a topic sentence tells the main idea. Thumbs down if it gives a specific detail." [Thumbs up.] Proceed.

TEACHER NOTES:
This slide establishes the five components of a body paragraph. Students already know topic sentences (Lesson 21) and may have some awareness of evidence from reading comprehension work. The three new components are: explanation (connecting evidence to argument), emotive language (persuasive device), and linking sentences (cohesion). The Finger Voting CFU is diagnostic rather than evaluative \u2014 it tells the teacher what students already know so she can calibrate the depth of instruction. DECIDE Framework: D (Define the writing component). VTLM 2.0: Explicit Explanation.

MISCONCEPTIONS:
\u2022 Misconception: A supporting detail and a piece of evidence are the same thing.
  Why: In narrative writing (Lessons 1\u201323), students learned "supporting details" as information that supports the main idea. In persuasive writing, "evidence" is a specific type of supporting detail \u2014 it must be factual, verifiable, or from an authoritative source. Students may conflate the two.
  Impact: Students may write opinions disguised as evidence (e.g., "I think reading is fun" instead of "Studies show reading reduces stress by 68%").
  Quick correction: "In a story, a supporting detail can be anything that adds information. In persuasive writing, evidence must be a FACT or a REAL EXAMPLE \u2014 something you can prove."

WATCH FOR:
\u2022 Students who cannot remember what a topic sentence is \u2014 they will need extra scaffolding during SPO modelling.
\u2022 Students who seem overwhelmed by five features \u2014 reassure: "We will learn these step by step. The SPO planning tool will guide you through each one."
\u2022 Readiness signal: Students can name at least one familiar feature (topic sentence) and show interest in the new ones.

[General: Explicit Instruction (I Do) \u2014 Body Paragraph Features \u2014 VTLM 2.0: Explicit Explanation]`;

const NOTES_EMOTIVE = `SAY:
\u2022 "Before we plan our paragraph, let\u2019s practise recognising one of the new features: emotive language."
\u2022 "Emotive language is language that makes the reader FEEL something \u2014 angry, sad, hopeful, worried. It is designed to stir emotions."
\u2022 Read the question: "Which sentence uses emotive language?"
\u2022 "Read all three options. Think carefully. Then on my signal, hold up 1 finger for A, 2 for B, 3 for C."
\u2022 "3, 2, 1 \u2014 show me."
\u2022 After scanning: "The answer is B."
\u2022 Click to reveal: "B says: 'Imagine a world where children are denied the life-changing gift of reading.' The words 'denied' and 'life-changing' are emotive. They make you FEEL something \u2014 outrage that children might lose something so valuable."
\u2022 "A is a fact \u2014 it has a number. Facts are evidence, not emotive language. C is a plain statement \u2014 it gives information but does not stir feelings."
\u2022 "When you write your body paragraph, you will use emotive language to make your argument more powerful."

DO:
\u2022 Display the three options. Allow 15 seconds for silent reading.
\u2022 Run Finger Voting: 1 = A, 2 = B, 3 = C. Count "3, 2, 1 \u2014 show me."
\u2022 Scan the room and note the distribution. Click to reveal the answer.
\u2022 After reveal, briefly explain WHY B is emotive and WHY A and C are not.
\u2022 Total time: 3 minutes.

CFU CHECKPOINT:
Technique: Finger Voting

Script:
\u2022 "Which sentence uses emotive language? 1 finger for A, 2 for B, 3 for C. 3, 2, 1 \u2014 show me."
\u2022 Scan for: \u226580% holding up 2 fingers (B).

PROCEED (if \u226580% vote B):
Move to SPO modelling. Students can identify emotive language.

PIVOT (if <80% vote B):
Most likely issue: Students confuse "interesting" or "impressive" facts with emotive language. A is a striking statistic (68%), which may feel "emotional" to students.
Reteach: "Emotive language is about FEELINGS, not NUMBERS. Sentence A has a number \u2014 68%. That is a fact. It is convincing, but it does not make you feel angry or sad or hopeful. Sentence B says 'denied' \u2014 that makes you feel something is being taken away, which is unfair. And 'life-changing gift' makes reading sound precious. THOSE words stir emotions."
Re-check: "Thumbs up if 'denied' makes you feel something. Thumbs up if '68%' makes you feel something." Most will agree that 'denied' is more emotional. Proceed.

TEACHER NOTES:
This hinge question is critical because it tests whether students can distinguish between three types of persuasive content: (A) statistical evidence, (B) emotive language, and (C) plain factual statement. Students at this age often conflate "persuasive" with "having numbers" because statistics feel authoritative. The hinge isolates emotive language specifically. The key teaching point is that emotive language works on FEELINGS, not LOGIC. Both facts and emotive language are persuasive, but in different ways \u2014 a strong body paragraph uses BOTH. DECIDE Framework: C (Check for Understanding). VTLM 2.0: Monitor Progress.

MISCONCEPTIONS:
\u2022 Misconception: Any sentence that sounds "strong" or "important" is emotive language.
  Why: Students associate persuasive writing with confidence and authority. They may label a strong fact as emotive because it "sounds persuasive."
  Impact: Students will not include genuine emotive language in their writing \u2014 they will rely solely on facts and think they have covered all the persuasive features.
  Quick correction: "A fact convinces your BRAIN. Emotive language convinces your HEART. You need both."

WATCH FOR:
\u2022 Students who vote A \u2014 they are drawn to the statistic. Redirect: "Is 68% a feeling or a fact?"
\u2022 Students who vote C \u2014 they may have chosen at random. Check understanding after the reveal.
\u2022 Readiness signal: \u226580% vote B, and at least 2 students can explain WHY B is emotive (pointing to specific words like "denied" or "life-changing").

[General: CFU \u2014 Emotive Language \u2014 VTLM 2.0: Monitor Progress]`;

const NOTES_SPO_INTRO = `SAY:
\u2022 "Now we are going to learn a planning tool that will change the way you write paragraphs. It is called the Single Paragraph Outline \u2014 or SPO."
\u2022 "An SPO is a PLAN. Before you write a paragraph, you fill in the SPO to organise your thinking. It is like a recipe \u2014 you gather all the ingredients before you start cooking."
\u2022 Point to the blank SPO template on the right: "Look at the boxes. First: Topic Sentence \u2014 your main point. Then: three Supporting Points, each with Evidence and Emotive Language. Finally: a Linking Sentence."
\u2022 "This template is what you will use when you plan your own paragraph. But first \u2014 watch me fill one in."

DO:
\u2022 Display the slide with the blank SPO template visible.
\u2022 Point to each box as you name it. Students should see the structure clearly.
\u2022 Do NOT fill anything in yet \u2014 this is orientation. The next slide shows the completed model.
\u2022 Emphasise that the SPO is a PLANNING tool, not a writing task. Planning comes first, writing comes second.
\u2022 Total time: 3 minutes.

TEACHER NOTES:
The SPO (Single Paragraph Outline) is a scaffolded planning tool adapted from Hochman & Wexler\u2019s "The Writing Revolution." It structures student thinking before writing begins, reducing the cognitive load during composition. By separating PLANNING from WRITING, students can focus on organising their ideas first and crafting sentences second. The blank template on this slide provides a visual anchor \u2014 students can see the entire structure at a glance. The next slide will show the teacher\u2019s completed model, making the abstract template concrete. DECIDE Framework: E (Execute through modelling \u2014 I Do). VTLM 2.0: Explicit Explanation and Modelling.

The "recipe" analogy works well: you gather ingredients (evidence, emotive words) and follow a recipe (the SPO structure) to produce a dish (the paragraph). If students have cooked or baked, this analogy will resonate.

WATCH FOR:
\u2022 Students who look confused by the template \u2014 reassure: "This will make more sense when you see me fill it in on the next slide."
\u2022 Students who want to start writing immediately \u2014 hold them: "Planning first. Writing second. Trust the process."
\u2022 Readiness signal: Students can name the first box on the SPO (Topic Sentence) without being told.

[General: Explicit Instruction (I Do) \u2014 SPO Introduction \u2014 VTLM 2.0: Explicit Explanation]`;

const NOTES_SPO_MODEL = `SAY:
\u2022 "Now watch me complete an SPO and then turn it into a paragraph."
\u2022 Point to the left card (completed SPO): "Here is my plan."
\u2022 "My Topic Sentence is: 'Reading is one of the most important skills a child can develop.' That is my main point \u2014 the big idea."
\u2022 "Supporting Point 1: reading reduces stress. Evidence: studies show reading lowers stress by 68%. Emotive word: overwhelmed \u2014 because children who cannot read well often feel overwhelmed."
\u2022 "Supporting Point 2: reading builds vocabulary. Evidence: regular readers learn up to 1000 new words per year. Emotive word: powerful \u2014 because vocabulary gives you power to express yourself."
\u2022 "Supporting Point 3: reading improves school results. Evidence: students who read daily score higher on tests. Emotive word: life-changing \u2014 because better results change the direction of a child\u2019s life."
\u2022 Now point to the right card (written paragraph): "And HERE is what that plan looks like as a paragraph. Notice how every piece of the SPO appears in the writing. The plan became the paragraph."
\u2022 "Do you see how the SPO made writing easier? I did not stare at a blank page. I had a plan."

DO:
\u2022 Display the two-column slide. Left: completed SPO. Right: written paragraph.
\u2022 Read through the SPO methodically \u2014 point to each box as you explain it.
\u2022 Then read the paragraph aloud with expression. As you read, gesture back to the SPO to show where each part came from.
\u2022 This is the most important modelling moment in the lesson. Spend 5\u20137 minutes here.
\u2022 Do NOT rush. Students need to see the direct connection between PLAN and PARAGRAPH.

TEACHER NOTES:
This is the core I Do moment. The two-column layout is essential: students must see the SPO (plan) and the paragraph (product) side by side to understand the transformation. The paragraph demonstrates all five body paragraph features: topic sentence, supporting evidence (three facts from the supplementary text), explanation (why each fact matters), emotive language (overwhelmed, powerful, life-changing), and an implicit linking sentence. The teacher\u2019s verbal modelling should make the connection explicit: "This fact from my SPO became THIS sentence in my paragraph." DECIDE Framework: E (Execute through modelling). VTLM 2.0: Explicit Explanation and Modelling.

The evidence used in the model paragraph comes directly from the supplementary text students read earlier. This is deliberate: students can verify the facts and see how raw information is transformed into persuasive writing. It also models the process they will follow during You Do.

WATCH FOR:
\u2022 Students who seem to understand the SPO but not the transition to paragraph \u2014 re-read the paragraph and trace each sentence back to the SPO: "Where did this sentence come from? Point to the SPO."
\u2022 Students who want to copy the teacher\u2019s paragraph \u2014 clarify: "You will write about a DIFFERENT topic sentence. My paragraph is a model, not a template to copy."
\u2022 Readiness signal: When you point to a part of the paragraph and ask "Where is this on the SPO?", students can point to the correct box.

[General: Explicit Instruction (I Do) \u2014 SPO Modelling \u2014 VTLM 2.0: Explicit Explanation and Modelling]`;

const NOTES_WEDO = `SAY:
\u2022 "Your turn to try. Here is a topic sentence: 'Libraries deserve more funding.'"
\u2022 "On your whiteboard, write ONE supporting point with a piece of evidence. Just one \u2014 we are practising the skill."
\u2022 "Think about what you know about libraries. What is one reason they deserve more funding? And what evidence could you use to support that reason?"
\u2022 "You have 90 seconds. Go."
\u2022 After boards up: "Let me share some strong examples."
\u2022 Click to reveal: Read 2\u20133 strong examples aloud.
\u2022 "Notice how each example has a POINT and a PIECE OF EVIDENCE. That is what the SPO asks you to do \u2014 just for three points instead of one."

DO:
\u2022 Display the slide with the topic sentence. Distribute whiteboards if not already out.
\u2022 Give students 90 seconds to write. Circulate and read over shoulders.
\u2022 "3, 2, 1 \u2014 boards up."
\u2022 Scan boards quickly. Identify 2\u20133 strong examples to read aloud.
\u2022 Click to reveal the answer slide with example responses.
\u2022 Total time: 5 minutes (including reveal and discussion).

CFU CHECKPOINT:
Technique: Show Me Boards

Script:
\u2022 "Write ONE supporting point with evidence for the topic sentence 'Libraries deserve more funding.' You have 90 seconds."
\u2022 "3, 2, 1 \u2014 boards up."
\u2022 Scan for: A supporting point (not just an opinion) with at least a gesture toward evidence. Strong examples: "Libraries provide free access to books and internet \u2014 not all families can afford these at home." "Libraries run reading programs for children \u2014 research shows reading programs improve literacy." "Libraries reduce social isolation \u2014 they are community meeting places."
\u2022 Flag boards that show only an opinion without evidence (e.g., "Libraries are good").

PROCEED (if \u226570% write a supporting point with some evidence):
Move to You Do. Students understand the structure.

PIVOT (if <70% can write a point with evidence):
Most likely issue: Students write opinions ("Libraries are important") without evidence. They have not yet internalised the distinction between opinion and evidence.
Reteach: "An opinion says what you THINK. Evidence says what you can PROVE. Watch: 'Libraries are important' \u2014 that is an opinion. 'Libraries provide free internet access to families who cannot afford it' \u2014 that is evidence. Can you see the difference? The evidence has a specific, provable fact."
Re-check: "Try again. Write a FACT about libraries, not just an opinion. 60 seconds. Boards up." Scan for improvement.

ENABLING & EXTENDING:
ENABLING PROMPT:
\u2022 Task: Give students a sentence starter: "Libraries deserve more funding because ___." Students complete the sentence with a specific reason and one piece of evidence. This scaffolds the structure so students focus only on content.

EXTENDING PROMPT:
\u2022 Task: Students write TWO supporting points with evidence and add one emotive word to each. This extends the single-point practice to multi-point planning with persuasive language.

TEACHER NOTES:
This We Do bridges the teacher\u2019s modelling (SPO about reading) with the students\u2019 independent work (SPO about their own topic). The topic "Libraries deserve more funding" is deliberately different from the You Do topic to prevent copying. Show Me Boards are used because the task requires written output that can be visually scanned. The 90-second time limit creates urgency and prevents overthinking. The reveal slide provides model answers so students can self-correct before You Do. DECIDE Framework: C (Check for Understanding). VTLM 2.0: Scaffold Practice.

MISCONCEPTIONS:
\u2022 Misconception: Evidence and opinion are the same thing in persuasive writing.
  Why: In everyday language, "I think libraries are important" sounds persuasive. Students may not yet understand that persuasive writing requires PROOF, not just belief.
  Impact: Paragraphs will lack substance \u2014 students will state opinions repeatedly without supporting them with facts, reducing the persuasive power of their writing.
  Quick correction: "If I say 'Libraries are amazing,' does that convince you? Maybe a little. But if I say 'Libraries provide free access to over 50,000 books, internet, and community programs,' NOW I have given you a reason. Facts persuade. Opinions alone do not."

WATCH FOR:
\u2022 Students who write only an opinion \u2014 prompt: "Can you add a FACT to support that opinion?"
\u2022 Students who write a full paragraph instead of one point \u2014 redirect: "Just one point with evidence. Save the rest for your SPO."
\u2022 Students who struggle with the topic (libraries) \u2014 offer prompts: "Think about what libraries provide. Books? Internet? Programs? Community space?"
\u2022 Readiness signal: Boards show specific, factual supporting points (not just opinions).

[General: Guided Practice (We Do) \u2014 Persuasive Writing \u2014 VTLM 2.0: Scaffold Practice]`;

const NOTES_YOUDO = `SAY:
\u2022 "Now it is YOUR turn to plan a body paragraph. You are going to use the SPO worksheet."
\u2022 "On your worksheet, you will see a Topic Sentence already printed for you: 'Reading should be a priority for every child.' OR, if your teacher has given you the alternative, it might say something different."
\u2022 Read from slide: "First: Read the topic sentence on your SPO worksheet."
\u2022 "Next: Write three supporting points with evidence from today\u2019s text. Remember those facts about reading? Use them!"
\u2022 "Then: Choose at least two emotive words or phrases to include in your paragraph."
\u2022 "You have 10 minutes. Fill in the SPO first. If you finish the SPO with time left, start drafting your paragraph in the lined area."
\u2022 "I will come around and check your work. If you are stuck, look at my modelled SPO on the board."

DO:
\u2022 Distribute the SPO1 worksheet (Body Paragraph Planner). Ensure every student has one.
\u2022 Display the task slide with the three steps visible throughout.
\u2022 Leave the teacher\u2019s modelled SPO (Slide 9) visible on the board as a reference if you have dual screens. Otherwise, tell students to refer to the SPO2 teacher model handout.
\u2022 Set a timer for 10 minutes (visible if possible).
\u2022 Circulate immediately. In the first 2 minutes, check that students are reading the topic sentence and writing supporting points \u2014 not jumping to the draft.
\u2022 Conference briefly with students who are stuck: "What is one fact from the text about reading? Write that as your first supporting point."

ENABLING & EXTENDING:
ENABLING PROMPT:
\u2022 Task: Students who struggle with generating supporting points are given the SPO2 teacher model to refer to. They may use the SAME evidence but must write their supporting points in their own words. This scaffolds content while preserving the structural practice.
\u2022 Extra Notes: For students with very low writing stamina, reduce the requirement to 2 supporting points instead of 3.

EXTENDING PROMPT:
\u2022 Task: Students complete the SPO AND draft the full paragraph in the lined area below. They then add a linking sentence at the end: "This shows that..." or "Therefore..." This extends the planning into drafting and adds paragraph cohesion.
\u2022 Extra Notes: Challenge extending students to include at least 3 emotive words and underline them in their draft.

TEACHER NOTES:
This is the You Do phase \u2014 students apply the SPO planning tool independently. The pre-printed topic sentence removes the hardest step (generating a main argument) so students can focus on the new skill (planning supporting points with evidence and emotive language). The evidence comes from the supplementary text read earlier, so cognitive load stays on STRUCTURE, not CONTENT. The 10-minute time limit is generous for SPO completion but tight for drafting \u2014 most students should complete the SPO and begin drafting. Students who finish early should be challenged with the extending prompt. DECIDE Framework: D (Differentiate through fading). VTLM 2.0: Supported Application.

The alternative TS option (which teachers can write on the worksheet) allows differentiation by position: some students argue FOR reading as a priority, others could argue AGAINST (e.g., "Children today have too much pressure to read"). This is a teacher decision \u2014 for most Year 3/4 classes, the FOR position is more accessible.

WATCH FOR:
\u2022 Students who skip the SPO and start writing a paragraph directly \u2014 redirect: "SPO first. Fill in every box, THEN write."
\u2022 Students who write opinions instead of evidence in the "Evidence" box \u2014 prompt: "Is that a fact from the text, or is that your opinion? Find a fact."
\u2022 Students whose emotive words are generic ("good," "bad," "nice") \u2014 offer alternatives: "Instead of 'good,' try 'invaluable.' Instead of 'bad,' try 'devastating.'"
\u2022 Students who finish early \u2014 extend: "Now draft your paragraph using the SPO. Include a linking sentence at the end."
\u2022 Readiness signal: SPOs are completed with 3 supporting points, evidence for each, and at least 2 emotive words. At least 60% of the class should reach this within 10 minutes.

[General: Independent Practice (You Do) \u2014 Persuasive Writing \u2014 VTLM 2.0: Supported Application]`;

const NOTES_RESOURCES = `SAY:
\u2022 "On this slide you can see the printable resources for today\u2019s lesson."
\u2022 "SPO1 is the student worksheet \u2014 your Body Paragraph Planner. This is what you are filling in during You Do."
\u2022 "SPO2 is the teacher model \u2014 my completed SPO with the written paragraph. You can refer to this if you are stuck."
\u2022 "Click the links to open and print the PDFs."

DO:
\u2022 This slide is primarily for the teacher to reference when printing resources before the lesson.
\u2022 Click each link to verify it opens correctly.
\u2022 Print SPO1 (one per student) and SPO2 (one per table group or displayed on the board) before the lesson.

TEACHER NOTES:
Both resources should be printed BEFORE the lesson. SPO1 is the student\u2019s working document \u2014 they fill it in during You Do and may continue drafting as homework or in the next session. SPO2 is the teacher\u2019s completed model \u2014 it can be displayed on the board during I Do (Slide 9) or distributed to enabling students as a scaffold during You Do. Ensure the printer settings are A4 and that the planning grids print clearly.

[General: Resources \u2014 VTLM 2.0: Resource Preparation]`;

const NOTES_CLOSING = `SAY:
\u2022 "Let\u2019s reflect on what we learned today."
\u2022 Read the Turn & Talk prompt: "Why is planning BEFORE writing so important? What would happen if you skipped the plan and just started writing?"
\u2022 Allow 60 seconds Turn & Talk.
\u2022 Share 1\u20132 responses. Then: "Planning gives your writing direction. Without a plan, your paragraph can wander, repeat itself, or miss important points. The SPO keeps you organised."
\u2022 Point to takeaways: "Today we learned about the macrostructure of a persuasive text, the five features of a body paragraph, what emotive language is, and how to use the SPO to plan."
\u2022 "Check the success criteria. Can you name the parts of a body paragraph? Can you explain emotive language? Did you plan your own SPO? Thumbs up."

DO:
\u2022 Run the Turn & Talk for 60 seconds. Circulate and listen.
\u2022 Share 1\u20132 brief responses. Do not extend \u2014 keep the closing to 3 minutes.
\u2022 Read the key takeaways aloud. Connect back to LI/SC.
\u2022 Quick thumbs up self-assessment against the SCs.
\u2022 Collect SPO worksheets if students have not finished drafting (they can continue tomorrow).

TEACHER NOTES:
The reflection prompt targets metacognition: students are asked to think about the PROCESS of writing (planning vs. not planning), not just the PRODUCT. This is intentional \u2014 the SPO is a transferable tool that students can use in any subject area, not just English. The takeaways mirror the lesson sequence: macrostructure \u2192 body paragraph features \u2192 emotive language \u2192 SPO planning. This gives students a mental map of what they learned and how it connects. In Lesson 25, students will use their SPOs to draft and refine their body paragraphs \u2014 preview this: "Tomorrow we will turn your plans into polished paragraphs." VTLM 2.0: Retention and Recall / Consolidation.

WATCH FOR:
\u2022 Students who rush the thumbs up \u2014 pause: "Be honest. If you are not sure about emotive language yet, that is okay. We will practise more."
\u2022 Students who did not finish their SPO \u2014 reassure: "You will have time tomorrow. Keep your worksheet safe."
\u2022 Readiness signal: A calm, purposeful close with most students giving honest thumbs up on at least 2 of 3 SCs.

[General: Closing / Review \u2014 VTLM 2.0: Retention and Recall]`;

// ─────────────────────────────────────────────────────────────────────────────
// Main build
// ─────────────────────────────────────────────────────────────────────────────

(async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Explicit Teaching Slide Generator";
  pres.title  = "Matilda Lesson 24 \u2014 Persuasive Writing: Plan a Body Paragraph";

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1: TITLE
  // ═══════════════════════════════════════════════════════════════════════════
  titleSlide(
    pres,
    "Persuasive Writing",
    "Planning a Body Paragraph",
    "Lesson 24 of 25  |  Week 5  |  Year 3/4 Literacy",
    NOTES_TITLE
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2: LEARNING INTENTIONS & SUCCESS CRITERIA
  // ═══════════════════════════════════════════════════════════════════════════
  liSlide(
    pres,
    [
      "We are learning to plan a persuasive body paragraph using a Single Paragraph Outline",
    ],
    [
      "I can name the five parts of a body paragraph",
      "I can identify emotive language in a sentence",
      "I can plan my own body paragraph using an SPO",
    ],
    NOTES_LI,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3: SUPPLEMENTARY TEXT — Reading facts + Cold Call CFU
  // ═══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres,
    "Read Aloud", C.PLUM,
    "Seven Interesting Facts About Reading",
    [
      "Today we are reading a supplementary text \u2014 not a story, but an informational text.",
      "This text gives us real facts about why reading matters.",
      "These facts will become our EVIDENCE for persuasive writing.",
      "Listen carefully \u2014 you will need to remember these facts!",
      "After reading: be ready to name one fact that surprised you.",
    ],
    NOTES_READING,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4: MACROSTRUCTURE DIAGRAM — Custom inline
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PLUM);
    addBadge(s, "Text Structure", { color: C.PLUM });
    addTitle(s, "Persuasive Text Macrostructure");

    // Vertical flow diagram: 5 stacked cards with arrows between them
    // Introduction (PLUM) -> Body Para 1 (TEAL, highlighted) -> Body Para 2 (TEAL) -> Body Para 3 (TEAL, optional) -> Conclusion (PLUM)

    const diagramX = 2.0;
    const diagramW = 3.2;
    const cardH = 0.54;
    const arrowH = 0.24;
    const startY = CONTENT_TOP + 0.05;

    const sections = [
      { label: "Introduction",         sublabel: "State your position",        color: C.PLUM, highlight: false },
      { label: "Body Paragraph 1",     sublabel: "Point + Evidence + Explain", color: C.TEAL, highlight: true  },
      { label: "Body Paragraph 2",     sublabel: "Point + Evidence + Explain", color: C.TEAL, highlight: false },
      { label: "Body Paragraph 3",     sublabel: "(optional)",                 color: C.TEAL, highlight: false },
      { label: "Conclusion",           sublabel: "Restate and summarise",      color: C.PLUM, highlight: false },
    ];

    sections.forEach((sec, i) => {
      const y = startY + i * (cardH + arrowH);

      // Highlight border for Body Para 1
      if (sec.highlight) {
        s.addShape("roundRect", {
          x: diagramX - 0.08, y: y - 0.06, w: diagramW + 0.16, h: cardH + 0.12,
          rectRadius: 0.12,
          fill: { color: C.HONEY, transparency: 75 },
          line: { color: C.HONEY, width: 3 },
        });
      }

      // Card
      s.addShape("roundRect", {
        x: diagramX, y, w: diagramW, h: cardH, rectRadius: 0.08,
        fill: { color: sec.color },
        shadow: makeCardShadow(),
      });
      s.addText(sec.label, {
        x: diagramX + 0.15, y, w: diagramW - 0.3, h: cardH * 0.55,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
        valign: "bottom", margin: 0,
      });
      s.addText(sec.sublabel, {
        x: diagramX + 0.15, y: y + cardH * 0.48, w: diagramW - 0.3, h: cardH * 0.48,
        fontSize: 9, fontFace: FONT_B, color: C.LIGHT,
        valign: "top", margin: 0,
      });

      // Arrow between cards (except after the last)
      if (i < sections.length - 1) {
        const arrowY = y + cardH + 0.02;
        const arrowCX = diagramX + diagramW / 2;
        // Arrow shaft
        s.addShape("rect", {
          x: arrowCX - 0.03, y: arrowY, w: 0.06, h: arrowH - 0.06,
          fill: { color: C.MUTED },
        });
        // Arrow head (small triangle approximated with a diamond shape)
        s.addShape("roundRect", {
          x: arrowCX - 0.08, y: arrowY + arrowH - 0.12, w: 0.16, h: 0.10,
          rectRadius: 0.02,
          fill: { color: C.MUTED },
        });
      }
    });

    // "Today's focus" callout arrow pointing to Body Para 1
    const focusY = startY + 1 * (cardH + arrowH) + cardH / 2;
    const calloutX = diagramX + diagramW + 0.35;
    // Connecting line
    s.addShape("rect", {
      x: diagramX + diagramW + 0.05, y: focusY - 0.015, w: 0.35, h: 0.03,
      fill: { color: C.HONEY },
    });
    // Callout box
    s.addShape("roundRect", {
      x: calloutX, y: focusY - 0.28, w: 2.6, h: 0.56, rectRadius: 0.08,
      fill: { color: C.HONEY },
      shadow: makeCardShadow(),
    });
    s.addText("Today\u2019s Focus", {
      x: calloutX + 0.1, y: focusY - 0.28, w: 2.4, h: 0.56,
      fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });

    // Left-side summary card
    const sumX = 0.5;
    const sumW = 1.3;
    const sumY = CONTENT_TOP + 0.1;
    const sumH = SAFE_BOTTOM - sumY - 0.05;
    addCard(s, sumX, sumY, sumW, sumH, { fill: C.PARCHMENT });
    s.addText("Persuasive\nText\nStructure", {
      x: sumX + 0.08, y: sumY + 0.10, w: sumW - 0.16, h: sumH - 0.20,
      fontSize: 11, fontFace: FONT_H, color: C.PLUM, bold: true,
      align: "center", valign: "middle", margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_MACROSTRUCTURE);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 5: BODY PARAGRAPH FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.TEAL);
    addBadge(s, "I Do", { color: C.TEAL });
    addTitle(s, "What Makes a Strong Body Paragraph?");

    const features = [
      { label: "Topic Sentence",     desc: "States the main point of the paragraph",         color: C.PLUM  },
      { label: "Supporting Evidence", desc: "Facts, statistics, or examples that prove the point", color: C.TEAL  },
      { label: "Explanation",         desc: "Tells the reader WHY the evidence matters",      color: C.SAGE  },
      { label: "Emotive Language",    desc: "Words that make the reader FEEL something",      color: C.CORAL },
      { label: "Linking Sentence",    desc: "Connects this paragraph to the next or the main argument", color: C.AMBER },
    ];

    const availH = SAFE_BOTTOM - CONTENT_TOP;
    const rowH = Math.min(0.68, (availH - 0.1) / features.length);
    const gap = (availH - features.length * rowH) / Math.max(features.length - 1, 1);

    features.forEach((feat, i) => {
      const y = CONTENT_TOP + i * (rowH + gap);

      // Card background
      addCard(s, 0.5, y, 9, rowH, { fill: C.WHITE });

      // Colour tag on left
      s.addShape("roundRect", {
        x: 0.5, y, w: 0.12, h: rowH, rectRadius: 0.02,
        fill: { color: feat.color },
      });

      // Number circle
      s.addShape("roundRect", {
        x: 0.80, y: y + (rowH - 0.42) / 2, w: 0.42, h: 0.42, rectRadius: 0.21,
        fill: { color: feat.color },
      });
      s.addText(String(i + 1), {
        x: 0.80, y: y + (rowH - 0.42) / 2, w: 0.42, h: 0.42,
        fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });

      // Feature name
      s.addText(feat.label, {
        x: 1.40, y: y + 0.04, w: 3.0, h: rowH - 0.08,
        fontSize: 14, fontFace: FONT_H, color: feat.color, bold: true,
        valign: "middle", margin: 0,
      });

      // Description
      s.addText(feat.desc, {
        x: 4.50, y: y + 0.04, w: 4.8, h: rowH - 0.08,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
        valign: "middle", margin: 0,
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_BODY_FEATURES);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 6-7: EMOTIVE LANGUAGE HINGE QUESTION (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.CORAL);
      addBadge(s, "CFU", { color: C.CORAL });
      addTitle(s, "Which Sentence Uses Emotive Language?", { color: C.CORAL });

      // Technique pill
      s.addShape("roundRect", {
        x: 0.5, y: CONTENT_TOP, w: 2.2, h: 0.38, rectRadius: 0.08,
        fill: { color: C.CORAL },
      });
      s.addText("Finger Voting", {
        x: 0.5, y: CONTENT_TOP, w: 2.2, h: 0.38,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });

      // Three option cards
      const options = [
        { letter: "A", text: "Reading reduces stress by 68%." },
        { letter: "B", text: "Imagine a world where children are denied the life-changing gift of reading." },
        { letter: "C", text: "Many schools have reading programs." },
      ];

      const optStartY = CONTENT_TOP + 0.56;
      const optH = 0.88;
      const optGap = 0.12;

      options.forEach((opt, i) => {
        const y = optStartY + i * (optH + optGap);
        addCard(s, 0.5, y, 9, optH, { fill: C.WHITE });

        // Letter circle
        s.addShape("roundRect", {
          x: 0.68, y: y + (optH - 0.46) / 2, w: 0.46, h: 0.46, rectRadius: 0.23,
          fill: { color: C.PLUM },
        });
        s.addText(opt.letter, {
          x: 0.68, y: y + (optH - 0.46) / 2, w: 0.46, h: 0.46,
          fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
          align: "center", valign: "middle", margin: 0,
        });

        // Option text
        s.addText(opt.text, {
          x: 1.35, y: y + 0.08, w: 7.8, h: optH - 0.16,
          fontSize: 15, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
        });
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_EMOTIVE);
      return s;
    },
    (slide) => {
      // Highlight option B with a HONEY border
      const bY = CONTENT_TOP + 0.56 + 1 * (0.88 + 0.12);
      slide.addShape("roundRect", {
        x: 0.42, y: bY - 0.04, w: 9.16, h: 0.96, rectRadius: 0.12,
        fill: { color: C.HONEY, transparency: 75 },
        line: { color: C.HONEY, width: 3 },
      });

      // "Emotive Language" label above B (top-right of highlight border)
      slide.addShape("roundRect", {
        x: 7.2, y: bY - 0.28, w: 2.3, h: 0.30, rectRadius: 0.08,
        fill: { color: C.HONEY },
      });
      slide.addText("Emotive Language", {
        x: 7.2, y: bY - 0.28, w: 2.3, h: 0.30,
        fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });

      // Labels for A and C
      const labelAC = [
        { idx: 0, text: "Fact / Statistic" },
        { idx: 2, text: "Plain Statement" },
      ];
      labelAC.forEach((item) => {
        const itemY = CONTENT_TOP + 0.56 + item.idx * (0.88 + 0.12);
        slide.addShape("roundRect", {
          x: 7.2, y: itemY + 0.22, w: 2.1, h: 0.38, rectRadius: 0.08,
          fill: { color: C.MUTED },
        });
        slide.addText(item.text, {
          x: 7.2, y: itemY + 0.22, w: 2.1, h: 0.38,
          fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
      });

      // Brief explanation at the bottom
      const explY = CONTENT_TOP + 0.56 + 3 * (0.88 + 0.12) - 0.24;
      if (explY + 0.40 <= SAFE_BOTTOM) {
        slide.addText("\u201CDenied\u201D and \u201Clife-changing\u201D are emotive \u2014 they make the reader FEEL something.", {
          x: 0.5, y: explY, w: 9, h: 0.36,
          fontSize: 12, fontFace: FONT_B, color: C.PLUM, italic: true, margin: 0,
        });
      }
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 8: SPO I DO PART 1 — What is an SPO? + Blank template
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PLUM);
    addBadge(s, "I Do \u2014 Watch Me", { color: C.PLUM, w: 2.2 });
    addTitle(s, "Single Paragraph Outline (SPO)");

    const cardH = SAFE_BOTTOM - CONTENT_TOP;

    // Left card: What is an SPO?
    addCard(s, 0.5, CONTENT_TOP, 4.3, cardH, { strip: C.PLUM, fill: C.WHITE });
    s.addText("What Is an SPO?", {
      x: 0.75, y: CONTENT_TOP + 0.10, w: 3.8, h: 0.30,
      fontSize: 14, fontFace: FONT_H, color: C.PLUM, bold: true, margin: 0,
    });

    const leftBullets = [
      "A Single Paragraph Outline is a PLANNING tool.",
      "It organises your thinking BEFORE you write.",
      "It has boxes for each part of your paragraph.",
      "Fill in the plan first \u2014 then write from it.",
      "Think of it like a recipe: gather ingredients before you cook!",
    ];
    s.addText(
      leftBullets.map((t, i) => ({
        text: t,
        options: { bullet: true, breakLine: i < leftBullets.length - 1, fontSize: 12, color: C.CHARCOAL },
      })),
      {
        x: 0.75, y: CONTENT_TOP + 0.50, w: 3.8, h: cardH - 0.65,
        fontFace: FONT_B, valign: "top", margin: 0,
      }
    );

    // Right card: Blank SPO template visual
    addCard(s, 5.0, CONTENT_TOP, 4.5, cardH, { fill: C.PARCHMENT });
    s.addText("SPO Template", {
      x: 5.15, y: CONTENT_TOP + 0.08, w: 4.2, h: 0.26,
      fontSize: 11, fontFace: FONT_B, color: C.PLUM, bold: true, margin: 0,
    });

    // Template boxes
    const templateX = 5.15;
    const templateW = 4.15;
    const tBoxH = 0.38;
    const tGap = 0.08;
    let tY = CONTENT_TOP + 0.40;

    // Topic Sentence box
    s.addShape("roundRect", {
      x: templateX, y: tY, w: templateW, h: tBoxH, rectRadius: 0.06,
      fill: { color: C.PLUM },
    });
    s.addText("Topic Sentence", {
      x: templateX + 0.1, y: tY, w: templateW - 0.2, h: tBoxH,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
      valign: "middle", margin: 0,
    });
    tY += tBoxH + tGap;

    // Supporting Points 1-3 (nested: Point, Evidence, Emotive)
    for (let sp = 1; sp <= 3; sp++) {
      const spH = 0.68;
      s.addShape("roundRect", {
        x: templateX, y: tY, w: templateW, h: spH, rectRadius: 0.06,
        line: { color: C.TEAL, width: 1.5 },
        fill: { color: C.WHITE },
      });
      // SP label
      s.addShape("roundRect", {
        x: templateX + 0.06, y: tY + 0.05, w: 1.4, h: 0.22, rectRadius: 0.04,
        fill: { color: C.TEAL },
      });
      s.addText("SP" + sp, {
        x: templateX + 0.06, y: tY + 0.05, w: 1.4, h: 0.22,
        fontSize: 8, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      // Sub-labels
      const subLabels = ["Point:", "Evidence:", "Emotive:"];
      subLabels.forEach((sl, si) => {
        s.addText(sl, {
          x: templateX + 0.10, y: tY + 0.28 + si * 0.13, w: 3.8, h: 0.13,
          fontSize: 7, fontFace: FONT_B, color: C.MUTED, margin: 0,
        });
      });
      tY += spH + tGap;
    }

    // Linking Sentence box
    if (tY + tBoxH <= SAFE_BOTTOM) {
      s.addShape("roundRect", {
        x: templateX, y: tY, w: templateW, h: tBoxH, rectRadius: 0.06,
        fill: { color: C.AMBER },
      });
      s.addText("Linking Sentence", {
        x: templateX + 0.1, y: tY, w: templateW - 0.2, h: tBoxH,
        fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
        valign: "middle", margin: 0,
      });
    }

    addFooter(s, FOOTER);
    s.addNotes(NOTES_SPO_INTRO);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 9: SPO I DO PART 2 — Completed SPO + Written Paragraph
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PLUM);
    addBadge(s, "I Do \u2014 Watch Me", { color: C.PLUM, w: 2.2 });
    addTitle(s, "From Plan to Paragraph");

    const cardH = SAFE_BOTTOM - CONTENT_TOP;

    // Left card: Completed SPO
    addCard(s, 0.5, CONTENT_TOP, 4.3, cardH, { strip: C.PLUM, fill: C.WHITE });
    s.addText("My Completed SPO", {
      x: 0.75, y: CONTENT_TOP + 0.06, w: 3.8, h: 0.24,
      fontSize: 11, fontFace: FONT_B, color: C.PLUM, bold: true, margin: 0,
    });

    // Compact SPO content
    const spoLines = [
      { label: "TS:", text: "Reading is one of the most important skills a child can develop.", bold: true, color: C.PLUM },
      { label: "SP1:", text: "Reduces stress", bold: false, color: C.TEAL },
      { label: "Ev:", text: "Lowers stress by 68%", bold: false, color: C.MUTED },
      { label: "Em:", text: "overwhelmed", bold: false, color: C.CORAL },
      { label: "SP2:", text: "Builds vocabulary", bold: false, color: C.TEAL },
      { label: "Ev:", text: "Up to 1000 new words/year", bold: false, color: C.MUTED },
      { label: "Em:", text: "powerful", bold: false, color: C.CORAL },
      { label: "SP3:", text: "Improves school results", bold: false, color: C.TEAL },
      { label: "Ev:", text: "Daily readers score higher", bold: false, color: C.MUTED },
      { label: "Em:", text: "life-changing", bold: false, color: C.CORAL },
    ];

    const spoStartY = CONTENT_TOP + 0.36;
    const lineH = 0.33;

    spoLines.forEach((line, i) => {
      const ly = spoStartY + i * lineH;
      if (ly + lineH > SAFE_BOTTOM) return;

      // Label
      s.addText(line.label, {
        x: 0.75, y: ly, w: 0.55, h: lineH,
        fontSize: 9, fontFace: FONT_B, color: line.color, bold: true,
        valign: "middle", margin: 0,
      });
      // Value
      s.addText(line.text, {
        x: 1.32, y: ly, w: 3.25, h: lineH,
        fontSize: line.bold ? 10 : 9, fontFace: FONT_B, color: C.CHARCOAL,
        bold: line.bold, valign: "middle", margin: 0,
      });
    });

    // Right card: Written paragraph
    addCard(s, 5.0, CONTENT_TOP, 4.5, cardH, { strip: C.HONEY, fill: C.PARCHMENT });
    s.addText("The Written Paragraph", {
      x: 5.2, y: CONTENT_TOP + 0.06, w: 4.1, h: 0.24,
      fontSize: 11, fontFace: FONT_B, color: C.PLUM, bold: true, margin: 0,
    });

    const paragraph = "Reading is one of the most important skills a child can develop. "
      + "Children who do not read regularly can feel overwhelmed by schoolwork, "
      + "but studies show that reading reduces stress by an incredible 68%. "
      + "Furthermore, regular readers learn up to 1,000 new words per year, "
      + "giving them a powerful vocabulary to express their ideas. "
      + "Most importantly, students who read daily achieve life-changing improvements "
      + "in their test scores, setting them up for future success. "
      + "Clearly, reading is a skill that every child deserves to master.";

    s.addText(paragraph, {
      x: 5.2, y: CONTENT_TOP + 0.36, w: 4.1, h: cardH - 0.50,
      fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, valign: "top", margin: 0,
      lineSpacingMultiple: 1.3,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_SPO_MODEL);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 10-11: WE DO — Show Me Boards (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.TEAL);
      addBadge(s, "We Do", { color: C.TEAL });
      addTitle(s, "Your Turn to Try", { color: C.TEAL });

      // Technique pill
      s.addShape("roundRect", {
        x: 0.5, y: CONTENT_TOP, w: 2.4, h: 0.38, rectRadius: 0.08,
        fill: { color: C.TEAL },
      });
      s.addText("Show Me Boards", {
        x: 0.5, y: CONTENT_TOP, w: 2.4, h: 0.38,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });

      // Topic Sentence card
      const tsCardY = CONTENT_TOP + 0.56;
      addCard(s, 0.5, tsCardY, 9, 1.0, { fill: C.PLUM });
      s.addText("Topic Sentence:", {
        x: 0.72, y: tsCardY + 0.10, w: 8.5, h: 0.26,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      s.addText("\u201CLibraries deserve more funding.\u201D", {
        x: 0.72, y: tsCardY + 0.40, w: 8.5, h: 0.48,
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
      });

      // Instruction card
      const instrY = tsCardY + 1.0 + 0.14;
      const instrH = SAFE_BOTTOM - instrY;
      addCard(s, 0.5, instrY, 9, instrH, { strip: C.TEAL, fill: C.WHITE });
      s.addText("On your whiteboard, write:", {
        x: 0.75, y: instrY + 0.12, w: 8.5, h: 0.28,
        fontSize: 13, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
      });
      s.addText("ONE supporting point with a piece of evidence\nfor why libraries deserve more funding.", {
        x: 0.75, y: instrY + 0.50, w: 8.5, h: instrH - 0.70,
        fontSize: 16, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO);
      return s;
    },
    (slide) => {
      // Answer banner covering the instruction area
      const ansY = CONTENT_TOP + 0.56 + 1.0 + 0.14;
      const ansH = SAFE_BOTTOM - ansY;
      slide.addShape("roundRect", {
        x: 0.5, y: ansY, w: 9, h: ansH, rectRadius: 0.1,
        fill: { color: C.TEAL },
      });
      slide.addText("Strong Examples", {
        x: 0.72, y: ansY + 0.08, w: 8.5, h: 0.26,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });

      const examples = [
        "\u2022 Libraries provide free access to books and internet \u2014 not all families can afford these at home.",
        "\u2022 Libraries run reading programs for children \u2014 research shows these programs improve literacy rates.",
        "\u2022 Libraries reduce social isolation \u2014 they are community meeting places used by thousands of people.",
      ];
      slide.addText(examples.join("\n\n"), {
        x: 0.72, y: ansY + 0.42, w: 8.5, h: ansH - 0.60,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 12: YOU DO — Plan Your SPO
  // ═══════════════════════════════════════════════════════════════════════════
  taskSlide(
    pres,
    "You Do", "Plan Your Body Paragraph",
    [
      { label: "First",  instruction: "Read the Topic Sentence on your SPO worksheet." },
      { label: "Next",   instruction: "Write 3 supporting points with evidence from today\u2019s text." },
      { label: "Then",   instruction: "Choose at least 2 emotive words or phrases to include." },
    ],
    NOTES_YOUDO,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 13: RESOURCES
  // ═══════════════════════════════════════════════════════════════════════════
  addResourceSlide(
    pres,
    [
      {
        name: "SPO1 \u2014 Body Paragraph Planner",
        fileName: "SPO1_Body_Paragraph_Planner.pdf",
        description: "Student worksheet \u2014 plan a body paragraph with topic sentence, evidence, and emotive language.",
      },
      {
        name: "SPO2 \u2014 Teacher Model",
        fileName: "SPO2_Teacher_Model.pdf",
        description: "Completed example SPO with written paragraph \u2014 for teacher reference or enabling students.",
      },
    ],
    { C, FONT_H, FONT_B },
    FOOTER,
    NOTES_RESOURCES
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 14: CLOSING
  // ═══════════════════════════════════════════════════════════════════════════
  closingSlide(
    pres,
    "Why is planning BEFORE writing so important? What would happen if you skipped the plan and just started writing?",
    [
      "Persuasive texts have a macrostructure: Introduction \u2192 Body Paragraphs \u2192 Conclusion",
      "A body paragraph has five parts: TS, Evidence, Explanation, Emotive Language, Linking Sentence",
      "Emotive language makes the reader FEEL something \u2014 it convinces the heart, not just the brain",
      "The SPO is a planning tool that organises your thinking before you write",
    ],
    NOTES_CLOSING
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // WRITE PPTX
  // ═══════════════════════════════════════════════════════════════════════════
  await pres.writeFile({ fileName: OUT_DIR + "/Matilda_Lesson24_Persuasive_Body_Paragraph.pptx" });
  console.log("\u2713 Written PPTX to " + OUT_DIR + "/Matilda_Lesson24_Persuasive_Body_Paragraph.pptx");

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPANION PDF: SPO1 — Body Paragraph Planner (Student Worksheet)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const doc = createPdf({ title: "Body Paragraph Planner \u2014 SPO" });

    let y = addPdfHeader(doc, "Body Paragraph Planner", {
      subtitle: "Single Paragraph Outline (SPO)",
      color: C.PLUM,
      lessonInfo: "Lesson 24 of 25  |  Matilda Unit  |  Year 3/4 Literacy",
    });

    // Pre-printed Topic Sentence
    y = addSectionHeading(doc, "Topic Sentence", y, { color: C.PLUM });
    y = addBodyText(doc, "Reading should be a priority for every child.", y, {
      fontSize: 13, italic: true,
    });
    y = addBodyText(doc, "(If your teacher gives you a different topic sentence, cross this out and write theirs.)", y, {
      fontSize: 9, color: "9CA3AF",
    });

    y += 6;

    // Planning grid: 3 Supporting Points
    for (let sp = 1; sp <= 3; sp++) {
      y = addSectionHeading(doc, "Supporting Point " + sp, y, { color: C.TEAL });
      y = addWriteLine(doc, "Point:", y);
      y = addWriteLine(doc, "Evidence:", y);
      y = addWriteLine(doc, "Emotive Language:", y);
      y += 6;
    }

    // Linking Sentence
    y = addSectionHeading(doc, "Linking Sentence", y, { color: C.AMBER });
    y = addWriteLine(doc, "Link:", y);
    y += 8;

    // Draft Your Paragraph section
    y = addSectionHeading(doc, "Draft Your Paragraph", y, { color: C.PLUM });

    // Check if we need a new page for the lined area
    if (y > 580) {
      doc.addPage();
      y = 50;
      y = addSectionHeading(doc, "Draft Your Paragraph (continued)", y, { color: C.PLUM });
    }

    y = addLinedArea(doc, y, 10, { lineSpacing: 26 });

    // Tip box
    y = addTipBox(doc,
      "Start with your topic sentence. Each supporting point gets its own sentence. " +
      "Include your evidence and explain why it matters. " +
      "Use at least one emotive word or phrase. " +
      "End with a linking sentence that connects back to your main argument.",
      y, { color: C.TEAL }
    );

    addPdfFooter(doc, "Matilda  |  Lesson 24 of 25  |  Week 5  |  Year 3/4 Literacy");

    await writePdf(doc, OUT_DIR + "/SPO1_Body_Paragraph_Planner.pdf");
    console.log("\u2713 Written PDF: " + OUT_DIR + "/SPO1_Body_Paragraph_Planner.pdf");
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPANION PDF: SPO2 — Teacher Model (Completed Example)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const doc = createPdf({ title: "Teacher Model \u2014 Completed SPO" });

    let y = addPdfHeader(doc, "Teacher Model \u2014 Completed SPO", {
      subtitle: "Single Paragraph Outline (SPO) \u2014 ANSWER KEY",
      color: C.PLUM,
      lessonInfo: "Lesson 24 of 25  |  Matilda Unit  |  Year 3/4 Literacy",
      showNameDate: false,
    });

    // Completed Topic Sentence
    y = addSectionHeading(doc, "Topic Sentence", y, { color: C.PLUM });
    y = addWriteLine(doc, "TS:", y, {
      answer: "Reading is one of the most important skills a child can develop.",
      color: C.PLUM,
    });

    y += 4;

    // SP1
    y = addSectionHeading(doc, "Supporting Point 1", y, { color: C.TEAL });
    y = addWriteLine(doc, "Point:", y, {
      answer: "Reading reduces stress.",
      color: C.TEAL,
    });
    y = addWriteLine(doc, "Evidence:", y, {
      answer: "Studies show reading lowers stress by 68%.",
      color: C.TEAL,
    });
    y = addWriteLine(doc, "Emotive Language:", y, {
      answer: "overwhelmed",
      color: C.CORAL,
    });

    y += 4;

    // SP2
    y = addSectionHeading(doc, "Supporting Point 2", y, { color: C.TEAL });
    y = addWriteLine(doc, "Point:", y, {
      answer: "Reading builds vocabulary.",
      color: C.TEAL,
    });
    y = addWriteLine(doc, "Evidence:", y, {
      answer: "Regular readers learn up to 1,000 new words per year.",
      color: C.TEAL,
    });
    y = addWriteLine(doc, "Emotive Language:", y, {
      answer: "powerful",
      color: C.CORAL,
    });

    y += 4;

    // SP3
    y = addSectionHeading(doc, "Supporting Point 3", y, { color: C.TEAL });
    y = addWriteLine(doc, "Point:", y, {
      answer: "Reading improves school results.",
      color: C.TEAL,
    });
    y = addWriteLine(doc, "Evidence:", y, {
      answer: "Students who read daily score higher on tests.",
      color: C.TEAL,
    });
    y = addWriteLine(doc, "Emotive Language:", y, {
      answer: "life-changing",
      color: C.CORAL,
    });

    y += 4;

    // Linking Sentence
    y = addSectionHeading(doc, "Linking Sentence", y, { color: C.AMBER });
    y = addWriteLine(doc, "Link:", y, {
      answer: "Clearly, reading is a skill that every child deserves to master.",
      color: C.AMBER,
    });

    y += 10;

    // Written paragraph
    y = addSectionHeading(doc, "The Written Paragraph", y, { color: C.PLUM });

    const modelParagraph =
      "Reading is one of the most important skills a child can develop. " +
      "Children who do not read regularly can feel overwhelmed by schoolwork, " +
      "but studies show that reading reduces stress by an incredible 68%. " +
      "Furthermore, regular readers learn up to 1,000 new words per year, " +
      "giving them a powerful vocabulary to express their ideas. " +
      "Most importantly, students who read daily achieve life-changing improvements " +
      "in their test scores, setting them up for future success. " +
      "Clearly, reading is a skill that every child deserves to master.";

    y = addBodyText(doc, modelParagraph, y, { fontSize: 11 });

    y += 8;

    y = addTipBox(doc,
      "Notice how each part of the SPO becomes a sentence (or part of a sentence) in the paragraph. " +
      "The emotive words (overwhelmed, powerful, life-changing) are woven into the sentences, " +
      "not just dropped in. The linking sentence echoes the topic sentence, creating a satisfying close.",
      y, { color: C.PLUM }
    );

    addPdfFooter(doc, "Matilda  |  Lesson 24 of 25  |  Week 5  |  Year 3/4 Literacy  |  TEACHER MODEL");

    await writePdf(doc, OUT_DIR + "/SPO2_Teacher_Model.pdf");
    console.log("\u2713 Written PDF: " + OUT_DIR + "/SPO2_Teacher_Model.pdf");
  }

  console.log("\n\u2713 Build complete. All files in: " + OUT_DIR);
})();
