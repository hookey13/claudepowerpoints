// Skellig — Lesson 1: Connecting an Author's Life to a Text
// Year 5/6 Literacy — Novel Study
// Uses shared helpers from themes/skellig_helpers.js

"use strict";

const pptxgen = require("pptxgenjs");
const fs      = require("fs");

const {
  C, FONT_H, FONT_B,
  makeShadow, makeCardShadow,
  SAFE_BOTTOM, CONTENT_TOP,
  iconToBase64Png,
  addTopBar, addBadge, addTitle, addCard, addFooter,
  titleSlide, liSlide, contentSlide, vocabSlide,
  pairShareSlide, quoteSlide, cfuSlide, taskSlide,
  modellingSlide, closingSlide,
} = require("../themes/skellig_helpers");

const {
  FaBookOpen,
  FaPen,
  FaUsers,
  FaSearch,
  FaComments,
  FaFeatherAlt,
  FaQuoteLeft,
  FaLightbulb,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaStar,
} = require("react-icons/fa");

const FOOTER = "Skellig  |  Lesson 1 of 25  |  Year 5/6 Literacy";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_SLIDE1 = `SAY:
• "Welcome to our new novel study. Over the next 25 lessons we will be reading Skellig by David Almond — a story full of mystery, loss, and unexpected friendship."
• "Today we start by finding out about the author himself. Understanding an author's life can unlock meaning in their text."
• "Our big question for today: what can we learn about David Almond that helps us understand what he writes about?"

DO:
• Display this slide as students settle. Have copies of Skellig (class set) on desks, closed.
• Point to the lesson title and read it aloud. Emphasise "connecting" — a comprehension strategy students will use throughout the unit.

TEACHER NOTES:
This title slide frames the entire lesson arc. Connecting author biography to text is a higher-order comprehension strategy (VC2E6LY08: connecting, predicting). Beginning with an author study positions students to read Chapter 1 as informed analysts rather than passive recipients — they bring prior knowledge (Almond's life) into active dialogue with the text. VTLM 2.0 element: Establishing Purpose and Relevance. DECIDE Framework: this is the opening of the D (Define) phase.

WATCH FOR:
• Students who have already read Skellig — ask them to hold their knowledge and approach it fresh from the author's perspective.
• Students unfamiliar with the concept of author biography — note these students for targeted questioning during the shared read in Stage 2.

[General: I Do stage (context-setting) | VTLM 2.0: Establishing Purpose and Relevance]`;

const NOTES_SLIDE2 = `SAY:
• "Here is what we are going to learn today and how we will know we have been successful."
• Read Learning Objective aloud. "We are making connections — that is a strategy skilled readers use all the time."
• Point to each Success Criterion and briefly explain: "By the end of today you will be able to talk about David Almond's life, discuss Chapter 1, and write a response that links the two."
• "Keep these in mind as we work — you can use them as a checklist at the end."

DO:
• Read the LO and SC aloud together — students track with finger or repeat key phrases.
• Leave the slide visible for 30 seconds so students can re-read silently.
• Do not explain the task in full yet — this slide is an anchor, not a preview.

TEACHER NOTES:
Explicitly sharing learning intentions reduces cognitive load by giving students a schema to hang new information onto (Sweller, 1988). The three success criteria map directly to the lesson's GRR structure: SC1 aligns to I Do (shared read of "About me"), SC2 aligns to We Do (guided read aloud of Chapter 1), SC3 aligns to You Do (written response). Returning to these criteria in Stage 3 closes the feedback loop. VTLM 2.0 element: Making Learning Visible / Clear Learning Intentions.

WATCH FOR:
• Students who write down the criteria without reading them — pause and model reading SC1: "So what does this mean we need to do first?"
• The word "impact" in SC1 may be unfamiliar — briefly gloss: "impact means effect, or what difference it makes."

[General: I Do | VTLM 2.0: Making Learning Visible / Clear Learning Intentions]`;

const NOTES_SLIDE3 = `SAY:
• "Before we meet the author, let's think about what good readers do before they even open a book."
• "A prediction is not a guess — it is using clues from the text combined with what you already know and have experienced."
• "The key thing about predictions: we keep revising them as we read more. A prediction is never wrong — it just gets updated."
• Ask: "What is the difference between a guess and a prediction?" [Expected: a prediction uses evidence from the text and prior knowledge; a guess is random.]

DO:
• Do not read all bullets aloud — use them as anchor points while you talk. Students should be listening to you, not copying from the slide.
• After explaining prediction, move to the next slide (cover exploration) before taking hands.

CFU CHECKPOINT:
Technique: Cold Call
Script:
• "I am going to ask someone to define 'prediction' in their own words. Remember — a prediction is not a guess. [Pause 3 seconds.] [Student name] — what is a prediction?"
• Listen for: reference to using clues/evidence AND prior knowledge/experience.
• Prompt if needed: "What do we combine to make a prediction? Text clues plus what else?"
PROCEED (≥80% understand): Students articulate that predictions use text evidence and prior knowledge — move to Slide 4.
PIVOT (<80%): Most likely misconception: students confuse prediction with guessing, treating it as arbitrary. Reteach: Write on the board — PREDICTION = TEXT CLUES + PRIOR KNOWLEDGE + EXPERIENCE. Give a concrete non-text example: "I predict it will rain today because the sky is dark and I can smell moisture. I used clues from around me. That is a prediction." Re-check: "So if I look at a book cover and think about what I know — what am I doing?" [Making a prediction.]

MISCONCEPTIONS:
• Misconception: Predictions are fixed — once you make one, you stick with it.
  Why: Students have experience with "guess the answer" tasks where changing your mind signals failure.
  Impact: Students stop engaging with the text as they read, missing the comprehension benefit of monitoring and revising.
  Quick correction: Say explicitly: "In this class, changing your prediction is a sign of great reading — it means you noticed something new."

[General: I Do — activating strategy knowledge | VTLM 2.0: Activating Prior Knowledge]`;

const NOTES_SLIDE4 = `SAY:
• "Here is the cover of Skellig. You have 60 seconds to look carefully — the title, the image, the colours, the blurb on the back."
• "Then you will discuss with your partner. I want you to look for clues — what might this story be about?"
• Prompt if needed: "What does the title make you think of? What do you notice about the image? What does the blurb tell us?"
• After pair discussion (approx. 2 minutes), cold call 2–3 pairs: "Tell me one clue you found and what prediction it gave you."

DO:
• If you have a physical copy, hold it up. If projecting, show cover prominently.
• Circulate during pair discussion. Listen for: students who only use the picture (surface level) vs students who integrate title + blurb + image (deeper inference).
• Write 2–3 student predictions on the board — you will return to these at the end of the lesson.

TEACHER NOTES:
Cover and blurb analysis is a text-feature strategy (VC2E6LY08: predicting, connecting). This We Do moment is deliberately low-stakes — every student has something to say about a cover image. Structuring it as Pair-Share before cold call builds psychological safety. The dark, misty aesthetic of the Skellig cover provides rich visual inference opportunities: the shadowy figure, the bird imagery, the title's unusual word. Recording student predictions on the board creates a "prediction wall" to revisit as the novel progresses. VTLM 2.0 element: Collaborative learning structures.

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Provide students with a printed copy of the cover and blurb. Ask them to circle ONE thing they notice and write one word about what they think will happen.
• Rationale: Reduces working memory load by making the stimulus concrete and limiting the response scope. Supports students who struggle to generate language unprompted.
• Learning Progression Step: VC2E5LY08 — use comprehension strategies to interpret texts (Year 5 equivalent; building toward VC2E6LY08).
EXTENDING PROMPT:
• Task: Ask students to write three predictions using the structure "I predict __ because the [text feature] suggests __." Encourage them to consider genre and audience.
• Rationale: Extends into written analytical language and explicitly uses textual evidence, moving toward the written response in Stage 2.
• Learning Progression Step: VC2E6LY08 — analysing how authors use text features to create meaning.

WATCH FOR:
• Students making predictions that are entirely personal ("I think it will be about sport because I like sport") with no text connection — redirect: "What clue from the cover gave you that idea?"
• Pairs where one student dominates — use ABBA structure: "Partner A speaks first for 30 seconds, then Partner B."

[General: We Do — guided pair activity | VTLM 2.0: Collaborative learning / Peer dialogue]`;

const NOTES_SLIDE5 = `SAY:
• "Now we are going to meet the author. Before I start reading, I want you to read with a purpose."
• "As we read David Almond's 'About me' page, you are a detective. You are collecting clues: what happened in his life, how did he feel, what challenges did he face?"
• "These clues will help us understand what he chooses to write about and why."
• "I will call on students at random to read sections aloud. When you are not reading, track the text with your finger."

DO:
• Project Student Resource 1 (David Almond's "About me" text) — this should be prepared and ready to display.
• Distribute printed copies if available.
• Explain the alternating read-aloud routine before beginning: "I will call names unexpectedly — this keeps us all on the page. If I call your name and you're not sure where we are, that's OK — just find someone nearby to help you quickly and keep going."

TEACHER NOTES:
Shared read aloud with alternating readers is a high-engagement, high-accountability structure. Random selection (rather than volunteering) ensures all students remain cognitively active — they cannot "opt out" of listening. Framing the reading as "detective work" activates a purpose-setting comprehension strategy. The author biography provides the background knowledge (schema) students need to make the intertextual connections required in the written response. VTLM 2.0 element: Explicit Instruction — I Do modelling of active reading purpose-setting.

WATCH FOR:
• Students who begin skimming ahead — redirect with "eyes back to paragraph one, finger on the line."
• Students who are reluctant to read aloud — avoid forcing; instead, ask them to "be ready" and then call on a willing student. Build trust over time.
• EAL/D students for whom fluency is a barrier — allow these students to read shorter segments and provide pre-reading time if possible.

[General: I Do into We Do — shared reading | VTLM 2.0: Explicit Instruction / Modelling]`;

const NOTES_SLIDE6 = `SAY:
• "Now we have read David Almond's 'About me' text. Discuss these three questions with your partner. Take about one minute each."
• Question 1: "What important events happened in David Almond's life? How might they shape his writing?"
• Question 2: "How did David Almond feel about school? What might this mean for his characters?"
• Question 3: "Was it easy for him to become published? How do you know? What does this show?"
• After each question, cold call a non-volunteer pair: "Tell me what you discussed."

DO:
• Display all three questions but direct students to discuss them one at a time.
• Move around the room during discussion. Listen for the three key insights you want students to surface (loss → grief; school → character school feelings; persistence → character resilience).
• Annotate the board with student responses. Draw lines connecting life events to possible writing themes.

CFU CHECKPOINT:
Technique: Cold Call (non-volunteers only)
Script:
• After Q1: "[Student name], what did you and your partner identify as the most significant event in David Almond's life and why?"
• After Q2: "[Student name], how did David Almond feel about secondary school? What word from the text gives you that idea?"
• After Q3: "[Student name], give me one piece of evidence that it was not easy for Almond to get published."
• Listen for: specific text references, not just general statements ("he didn't like it" → push for "what in the text tells us that?").
PROCEED (≥80% understand): Students can name at least one specific life event and connect it to potential writing themes — move to Slide 7 (Key Insights).
PIVOT (<80%): Most likely misconception: students list facts from the biography without connecting them to the text (e.g. "he was born in Newcastle" without linking to themes of place and identity). Reteach: Model the connection explicitly: "Watch how I do this. He mentions that his father died when he was young. How might that make a writer feel? What kinds of stories might he want to tell? I am connecting his life to his writing." Then ask students to try one connection themselves. Re-check: "Give me one connection — his life to something he might write about."

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Provide a graphic organiser with two columns: "Event in David Almond's life" / "This might make him write about…" Students select ONE event to complete one row.
• Rationale: Reduces the open-ended nature of the task; scaffolds the inferential step of connecting biography to narrative.
• Learning Progression Step: VC2E5LY08 — making connections between personal experience and texts.
EXTENDING PROMPT:
• Task: Ask students to find a direct quote from the "About me" text that supports their connection, and explain why that specific language choice is significant.
• Rationale: Moves toward embedding textual evidence — the skill required in the You Do written response.
• Learning Progression Step: VC2E6LY08 — analysing and evaluating authors' choices; constructing evidence-based arguments.

TEACHER NOTES:
This is the pivotal We Do moment of Stage 2. Students are practising the comprehension strategy of connecting (biography to text), which is explicitly named in VC2E6LY08. The three questions are sequenced deliberately: Q1 is recall (easier), Q2 requires inference (moderate), Q3 requires evaluation and use of textual evidence (harder). Non-volunteer cold calling after each question raises accountability and ensures the lesson does not rely on the same few confident voices. VTLM 2.0 element: Guided Practice with Feedback.

WATCH FOR:
• Students who are aware that Almond mentions the death of his sister and father — handle sensitively. Acknowledge: "Yes, David Almond experienced real loss. That is something many people experience, and writers often explore those experiences in their work." Do not linger; move forward.
• Students who conflate Almond's experiences with Michael's (the character) — affirm this is exactly the kind of connection we are building toward.

[General: We Do — guided pair discussion with cold call | VTLM 2.0: Guided Practice / Formative Assessment]`;

const NOTES_SLIDE7 = `SAY:
• "Let's draw together the key ideas from your discussions."
• Point to each insight as you discuss it. Do not simply read the slide — elaborate from your discussion.
• "We established that David Almond experienced significant loss — the deaths of his father and sister. This means he understands grief deeply. When he creates characters, they may go through similar emotional journeys."
• "We also noticed he found secondary school difficult. So we might expect his characters to have complex feelings about school — perhaps alienation or not fitting in."
• "And his path to publication was long and difficult — he was rejected many times. Persistence mattered. This value of persistence might show up in how his characters respond to challenges."

DO:
• Use this slide as a visual anchor — teacher talk carries the explanation; students look at the slide as a reference.
• Annotate the board or a sticky note wall if you have one: "Almond's life → Writing choices."
• Pause after each insight: "Does everyone agree? Can anyone add to this?"

TEACHER NOTES:
This content slide consolidates the We Do discussion into three transferable inferences students will use in the You Do written response. The bullet points are deliberately concise — this is NOT a lecture slide, it is a summary. The teacher narration (SAY) carries the pedagogical weight. Presenting insights in this format supports students with lower working memory capacity — the three points give a clear structure for the written response. VTLM 2.0 element: Consolidation and Summarising.

MISCONCEPTIONS:
• Misconception: Authors only write about things that literally happened to them.
  Why: Students confuse autobiography with fiction; they lack understanding of how lived experience shapes imaginative work without direct translation.
  Impact: Students may write "David Almond is Michael" rather than "Almond's experience of loss may have inspired Michael's experience of loss."
  Quick correction: Say: "David Almond is not Michael — he did not invent this story from scratch from his memories. But the feelings he experienced — grief, not fitting in, persistence — those feelings informed how he built Michael's world. Authors use emotion and experience as ingredients, not blueprints."

WATCH FOR:
• Students who fixate only on the death of family members and miss the school/publishing insights — ensure all three are noted in student books.
• Students who have been sitting passively — use a brief choral summary: "Say back to me: authors use their __ [life experiences] to shape their __ [writing choices]."

[General: I Do — consolidating guided practice | VTLM 2.0: Explicit Instruction / Consolidation]`;

const NOTES_SLIDE8 = `SAY:
• "Before we read Chapter 1, I want to introduce a key literary device — the narrative hook."
• "A narrative hook appears at the very beginning of a text. Its job is to capture the reader's attention immediately and make them desperate to keep reading."
• "Narrative hooks often work by creating a gap — a mystery, a question, something we do not yet understand. This activates our curiosity."
• "When we read the first sentence of Skellig in a moment, I want you to ask yourself: what question does this create in my mind?"

DO:
• Use this slide as an anchor for teacher explanation — keep it brief (2–3 minutes).
• Write "NARRATIVE HOOK" on the board in large letters — this is a metalanguage term students will use throughout the unit.
• Ask students to write the definition in their workbooks before the next slide.

TEACHER NOTES:
Introducing the metalanguage term "narrative hook" before reading Chapter 1 is a pre-teaching strategy that reduces cognitive load during the read aloud. Students who know the term can focus attention on identifying it rather than processing what the term means while also processing the text (dual processing). This is aligned to VC2E6LY08 (comprehension strategies: questioning, inferring) and supports the analytical written response. VTLM 2.0 element: Explicit Instruction — building shared metalanguage.

MISCONCEPTIONS:
• Misconception: A narrative hook must be dramatic or shocking — students dismiss subtle hooks as "not really a hook."
  Why: Media exposure (trailers, game intros) has conditioned students to expect high-stimulus openings.
  Impact: Students miss sophisticated literary hooks and are unable to analyse them in assessments.
  Quick correction: "A hook does not need to be explosive. The most effective hooks create a QUESTION in the reader's mind. Even a quiet, mysterious first sentence can hook us if it makes us wonder."

WATCH FOR:
• Students who copy the definition without understanding it — after writing, ask: "What is one question a hook might create?" (expected: who is this? what happens next? why did that happen?)

[General: I Do — explicit teaching of literary device | VTLM 2.0: Explicit Instruction / Metalanguage]`;

const NOTES_SLIDE9 = `SAY:
• Read the opening sentence of Chapter 1 aloud with care — model fluency, pace, and expression.
• Pause after reading. "Say nothing yet. Just sit with that sentence for a moment."
• "Now — turn to your partner. What question did that one sentence create in your mind?"
• After pair discussion (1 min): "Who can tell me how this is a narrative hook?" Cold call.
• Push for depth: "What is the gap — what do we NOT know?" [Expected: Why did they move? What is wrong with the garage? Who is this 'I'? Why mention the baby?]

DO:
• Read the sentence slowly and expressively — do not rush. Model how a skilled reader inhabits a text.
• After cold call responses, annotate the quote on screen or board: circle the words that create mystery/questions.
• Bridge: "Let's read the whole first paragraph now. Listen for more hooks — more gaps."

TEACHER NOTES:
Pausing after reading the first sentence creates a brief moment of "desirable difficulty" — students must process the sentence without immediate instruction. This is a high-leverage modelling moment: teacher models how to slow down and interrogate a text rather than rushing forward. The sentence is famously ambiguous and rich — almost every word raises a question. The subsequent Pair-Share is the first We Do activity for this literary device. VTLM 2.0 element: Explicit Modelling / Think-Aloud.

WATCH FOR:
• Students who say "it's a hook because it's interesting" without identifying the specific gap — push: "What specifically don't we know? What question does it create?"
• Students who focus only on "the baby" — prompt them to also notice "the garage" and "he" (unnamed narrator).

[General: I Do modelling into We Do pair analysis | VTLM 2.0: Explicit Modelling / Guided Practice]`;

const NOTES_SLIDE10 = `SAY:
• "As we read Chapter 1, we are going to pause to examine some important words."
• "Our focus word today is filthy — adjective, meaning very dirty or unpleasant."
• "In Chapter 1, the garage is described as filthy. What does that tell us about this place — and perhaps about the creature living there?"
• "Two other words to note as we read: demolition — the act of tearing down or destroying a building — and plywood — a type of engineered wood made from layered sheets. Both appear on pages 1 and 2."

DO:
• Read the example sentence aloud. Ask: "Can someone use filthy in a sentence about something in our school or community?"
• Write demolition and plywood on the board with brief definitions — do not use a separate slide for each.
• During the read aloud, pause at pages 1–2 when these words appear and briefly gloss them in context.

TEACHER NOTES:
Pre-teaching vocabulary before a read aloud is an evidence-based strategy for comprehension. Rather than interrupting the narrative flow with multiple vocab slides, this slide introduces the anchor word (filthy) formally while glossing demolition and plywood during the reading itself — this models contextual vocabulary acquisition. Students with lower vocabulary may particularly benefit from encountering these words before the text. VTLM 2.0 element: Explicit Instruction — vocabulary development in context.

WATCH FOR:
• Students who know the word "filthy" in informal registers but cannot use it analytically — bridge: "When the author says the garage is filthy, what effect does that create? Why not just say 'dirty'?" (Expected: filthy is more extreme; it signals neglect, danger, something forgotten.)
• EAL/D students for whom "filthy" carries different connotations — accept all valid examples and validate.

[General: I Do — vocabulary instruction | VTLM 2.0: Explicit Instruction / Vocabulary]`;

const NOTES_SLIDE11 = `SAY:
• "We have just read the beginning of Chapter 1 together. Now, with your partner, discuss these questions."
• "Some of these are questions about what we know. Some are predictions — we are using evidence from the text plus what we know about David Almond's life."
• Work through one question at a time. Allow 60–90 seconds per question before sharing out.
• After discussion: select non-volunteers for each question. Probe for evidence: "What in the text makes you think that?"

DO:
• Circulate actively during pair discussions. Listen for evidence-based reasoning vs unsupported assertions.
• Especially watch for Q3 (the "creature") — students may make connections to the title Skellig, to mythology, to nature (owl, spider). All are valid; reinforce that we are making predictions, not finding the right answer.
• Annotate student responses on the board — draw a question mark next to "What is the creature?" to signal this mystery will persist.

CFU CHECKPOINT:
Technique: Think-Pair-Share + cold call non-volunteers
Script:
• "Think first — 20 seconds silently. Then turn to your partner." [Pause] "Now — [non-volunteer] — what did you and your partner predict about the man in the garage?"
• Scan responses for: reference to specific text details (spider's web, cobwebs, Chinese takeaway, dusty suit) AND biographical connection (Almond's themes of the mysterious and overlooked).
PROCEED (≥80% understand): Students can identify at least one text-based clue about the creature's nature and connect it to a prediction with a reason — move to Slide 12 (Written Response task).
PIVOT (<80%): Most likely misconception: students think predicting means knowing the answer ("I think it's a skeleton" with no reasoning). Reteach: "A prediction must have evidence. Let me model. I predict the man in the garage is very old and sick BECAUSE the text says he had 'dust and ash and powder and chips of plywood and half-eaten Chinese takeaway' around him. Old people who are very ill sometimes cannot take care of themselves. That is a text-evidence prediction." Re-check: "Now you try — give me a prediction WITH a because."

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Provide students with a printed copy of the relevant paragraphs from Chapter 1 with the descriptive phrases about the man/creature highlighted. Ask them to answer Q1 only: "What do you notice about the man in the garage?"
• Rationale: Reduces the number of simultaneous demands; grounds prediction in close reading of a specific, manageable passage.
• Learning Progression Step: VC2E5LY08 — using information from texts to make inferences.
EXTENDING PROMPT:
• Task: Ask students to consider Q3 and Q4 together: "What does the information about the baby tell us about why the doctor is there, AND how does this connect to David Almond's own experience of loss?"
• Rationale: Requires synthesising two threads (plot inference + biographical connection) — the exact skill needed for the highest-quality written response.
• Learning Progression Step: VC2E6LY08 — evaluating how authors use personal experience to construct narrative meaning.

TEACHER NOTES:
This is the transitional We Do moment before independent writing. The four questions move from literal (what is the author telling us about the man) to inferential (what do we think of when we say "creature") to predictive (who might he be; what does the baby signal). This deliberate progression models the comprehension strategy sequence from VC2E6LY08: literal → inferential → evaluative. Non-volunteer cold calling ensures the class constructs a shared body of ideas that less confident writers can draw on in the You Do phase. VTLM 2.0 element: Guided Practice / Formative Assessment.

WATCH FOR:
• Students who are distracted by the emotional content of the baby storyline — acknowledge: "Yes, a sick baby is very worrying. How does Michael's reaction to this tell us something about him as a person?"
• Students who have finished pair discussion early — prompt with the extending question above.

[General: We Do — guided discussion pre-writing | VTLM 2.0: Guided Practice / Collaborative Learning]`;

const NOTES_SLIDE12 = `SAY:
• "Now it is your turn. You are going to write a response in your workbooks using both texts — David Almond's 'About me' and Chapter 1 of Skellig."
• Read each question aloud. "You do not need to answer all three in equal depth — choose the angle that gives you the most to say."
• "Remember: a strong response uses specific examples from BOTH texts. I want to see 'In About me, Almond says...' AND 'In Chapter 1, we see that...'"
• "You have approximately 15 minutes. I will circulate and I am looking for your connections."

DO:
• Set a visible timer for 15 minutes.
• Circulate systematically — do not hover near one student. Use "cold circuit" visits: approach, read 2–3 sentences, give a brief prompt if needed, move on.
• Note: students connecting Almond's experience of loss to Michael's worry about the baby (Q1/Q2) are demonstrating the target comprehension strategy. Students connecting Almond's persistence to how Michael might handle adversity (Q2) are showing higher-order inference.

CFU CHECKPOINT:
Technique: Circulate and observe (formative — not whole-class check)
Script:
• After 5 minutes: scan for students who are writing. For those who have not started, approach and ask: "Tell me in words — what is one similarity between David Almond's life and Michael's situation?" Then: "Write that down exactly as you just said it."
• After 10 minutes: check for evidence from BOTH texts. Prompt if only one text cited: "You've mentioned Skellig — can you find one thing from 'About me' to add?"
PROCEED: Students producing a minimum of 3–4 sentences with at least one reference to each text — wrap up and move to Stage 3.
PIVOT: If many students are stuck on starting — pause the class briefly: "Let me show you a sentence starter on the board: 'One similarity between David Almond's life and Michael's situation is __ . In Almond's About me, he says __ . In Chapter 1 of Skellig, we can see __ .'" Return to writing.

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Provide sentence frames printed on a card: "David Almond experienced ___ in his life. This might be why Michael feels ___ in Chapter 1." Students complete the frames using events from both texts.
• Rationale: Sentence frames reduce the language production demand while maintaining the conceptual challenge of making the connection. Students focus on meaning, not on generating syntax from scratch.
• Learning Progression Step: VC2E5LY08 — using comprehension strategies to construct meaning; building written response skills.
EXTENDING PROMPT:
• Task: Ask students to embed at least one direct quote from each text within their response, and to analyse the specific language choice: "The author uses the word '___' here, which suggests ___."
• Rationale: Embedding and analysing quotations is the defining skill at Year 7+ level — extending students toward this now builds analytical writing capacity.
• Learning Progression Step: VC2E7LY08 / VC2E7LY10 — analysing language choices; constructing evidence-based written arguments with embedded textual reference.

TEACHER NOTES:
This is the You Do phase — independent application of the comprehension strategy (connecting) practised in the I Do and We Do stages. The three questions are sequenced by demand: Q1 (similarity — recall + inference), Q2 (prediction about response — higher-order inference + character analysis), Q3 (identity prediction — open-ended, evidence-based). Students who are on track for Year 6 expectations should be able to address at least Q1 and Q2 with specific evidence. Use circulation data to inform tomorrow's lesson opening and any targeted small-group work. VTLM 2.0 element: Independent Practice / Formative Assessment.

WATCH FOR:
• Students who paraphrase only — prompt: "Can you find the exact words from the text? Use inverted commas."
• Students who write only about Skellig and ignore "About me" — redirect: "Go back to the 'About me' text. Find one sentence that connects to what you've written."
• Students who finish early — ask them to revisit Q3 with more specificity: "Give three pieces of text evidence for your prediction about who the man in the garage might be."

[General: You Do — independent written response | VTLM 2.0: Independent Practice]`;

const NOTES_SLIDE13 = `SAY:
• "It is time to review and reflect. Reread your writing quietly for one minute — add anything you want to add."
• "Now share your response with your partner. As you listen, think: Is there an idea I can add to mine? Is there something I want to respectfully challenge or question?"
• After pair sharing (2 min): "Who would like to share a connection they made between David Almond's life and Chapter 1? I am especially interested in any connections we have not yet discussed as a class."
• Revisit the LO: "Did we achieve our learning objective? Let's check our success criteria."
• Check each SC with a thumbs response: "SC1 — hands up if you can discuss events from David Almond's life. SC2 — hands up if you read and discussed Chapter 1. SC3 — hands up if you wrote a text response connecting both."

DO:
• Return to the predictions written on the board at the start of the lesson (Slide 4). Ask: "Have any of your predictions changed after reading Chapter 1?"
• Briefly note: "These takeaways are what we will build on in Lesson 2."
• Do not debrief the whole response — save detailed feedback for marking/return in Lesson 2.

TEACHER NOTES:
The closing slide completes the GRR cycle and activates metacognition through self-assessment against the success criteria. Revisiting the cover predictions from Slide 4 creates a closing loop that honours students' thinking from the start of the lesson and demonstrates how predictions are revised with new information — reinforcing the strategy explicitly taught in Stage 1. Pair sharing before whole-class share increases the quality of public contributions and ensures quieter students have articulated their thinking. VTLM 2.0 element: Review and Reflect / Metacognition.

WATCH FOR:
• Students who score themselves all thumbs up without genuine self-assessment — ask a follow-up: "Tell me one specific connection you made today." If they cannot, note for targeted follow-up.
• Students who are reluctant to share — validate pair-sharing as success: "If you shared it with your partner, you've achieved SC3. That counts."

[General: Review and Reflect | VTLM 2.0: Metacognition / Closing the Learning Loop]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build function
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  if (!fs.existsSync("output")) fs.mkdirSync("output");

  const pres = new pptxgen();
  pres.layout  = "LAYOUT_16x9";
  pres.author  = "Claude";
  pres.title   = "Skellig — Lesson 1: Connecting an Author's Life to a Text";

  // Pre-render icons
  const icons = {
    bookOpen:      await iconToBase64Png(FaBookOpen,          "#FFFFFF", 256),
    pen:           await iconToBase64Png(FaPen,               "#FFFFFF", 256),
    users:         await iconToBase64Png(FaUsers,             "#FFFFFF", 256),
    search:        await iconToBase64Png(FaSearch,            "#FFFFFF", 256),
    comments:      await iconToBase64Png(FaComments,          "#FFFFFF", 256),
    feather:       await iconToBase64Png(FaFeatherAlt,        "#FFFFFF", 256),
    quoteLeft:     await iconToBase64Png(FaQuoteLeft,         "#FFFFFF", 256),
    lightbulb:     await iconToBase64Png(FaLightbulb,         "#FFFFFF", 256),
    chalkboard:    await iconToBase64Png(FaChalkboardTeacher, "#FFFFFF", 256),
    checkCircle:   await iconToBase64Png(FaCheckCircle,       "#FFFFFF", 256),
    star:          await iconToBase64Png(FaStar,              "#C9A84C", 256),
  };

  // ── Slide 1: Title ──────────────────────────────────────────────────────────
  titleSlide(
    pres,
    "Skellig: Connecting an Author's Life to a Text",
    "Novel Study — Year 5/6 Literacy",
    "Lesson 1 of 25",
    NOTES_SLIDE1
  );

  // ── Slide 2: Learning Intention + Success Criteria ──────────────────────────
  liSlide(
    pres,
    [
      "We will make connections between events in an author's life and a text to deepen our engagement with and understanding of the text.",
    ],
    [
      "I can discuss events from David Almond's life and how they might impact his writing.",
      "I can read and discuss Chapter 1 of Skellig.",
      "I can write a text response that connects the events in David Almond's life to the first chapter of Skellig.",
    ],
    NOTES_SLIDE2,
    FOOTER
  );

  // ── Slide 3: What is a Prediction? ─────────────────────────────────────────
  contentSlide(
    pres,
    "Stage 1",
    C.SLATE,
    "What is a Prediction?",
    [
      "A prediction uses text clues + prior knowledge + personal experience — it is not a guess.",
      "Predictions help us set a purpose for reading and stay actively engaged with the text.",
      "Effective readers continually revise their predictions as new information becomes available.",
      "Revised predictions are a sign of careful, active reading — not a sign of being wrong.",
    ],
    NOTES_SLIDE3,
    FOOTER,
    (s) => {
      // Right column: icon in circle + key formula card
      s.addShape("roundRect", {
        x: 6.1, y: CONTENT_TOP + 0.15, w: 0.7, h: 0.7, rectRadius: 0.35,
        fill: { color: C.SLATE },
      });
      s.addImage({ data: icons.lightbulb, x: 6.18, y: CONTENT_TOP + 0.23, w: 0.54, h: 0.54 });

      // Formula card
      s.addShape("roundRect", {
        x: 6.0, y: CONTENT_TOP + 1.05, w: 3.4, h: 1.55, rectRadius: 0.1,
        fill: { color: C.MIDNIGHT },
        shadow: makeCardShadow(),
      });
      s.addText("PREDICTION =", {
        x: 6.15, y: CONTENT_TOP + 1.18, w: 3.1, h: 0.32,
        fontSize: 11, fontFace: FONT_B, color: C.GOLD, bold: true, align: "center", margin: 0,
      });
      s.addText([
        { text: "Text clues", options: { breakLine: true, color: C.WHITE, bold: true } },
        { text: "+ Prior knowledge", options: { breakLine: true, color: C.SAND } },
        { text: "+ Personal experience", options: { color: C.SAND } },
      ], {
        x: 6.15, y: CONTENT_TOP + 1.54, w: 3.1, h: 0.96,
        fontSize: 13, fontFace: FONT_B, align: "center", valign: "middle", margin: 0,
      });

      // "Revise as you read" note
      s.addShape("roundRect", {
        x: 6.0, y: CONTENT_TOP + 2.78, w: 3.4, h: 0.62, rectRadius: 0.08,
        fill: { color: C.GOLD, transparency: 15 },
        shadow: makeCardShadow(),
      });
      s.addText("Revise predictions as you read more!", {
        x: 6.05, y: CONTENT_TOP + 2.82, w: 3.3, h: 0.54,
        fontSize: 12, fontFace: FONT_B, color: C.MIDNIGHT, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
    }
  );

  // ── Slide 4: Pair-Share — Explore the Cover ─────────────────────────────────
  pairShareSlide(
    pres,
    "Explore the Cover of Skellig",
    [
      "What does the title Skellig suggest to you? What images or ideas does the word bring to mind?",
      "Look carefully at the cover image. What do you notice? What mood or atmosphere does it create?",
      "Read the blurb. What clues does it offer about the setting, characters, or themes of the story?",
      "What prediction can you make about the story? What text evidence supports your prediction?",
    ],
    NOTES_SLIDE4,
    FOOTER
  );

  // ── Slide 5: About the Author — Shared Read Setup ───────────────────────────
  contentSlide(
    pres,
    "Shared Read",
    C.MIDNIGHT,
    "About the Author: David Almond",
    [
      "We will read David Almond's 'About me' text (Student Resource 1) as a class.",
      "Read with a PURPOSE: you are a detective, collecting clues about the author's life.",
      "Gather evidence: What happened in his life? How did he feel? What challenges did he face?",
      "Ask yourself: how might these experiences shape what he chooses to write about?",
      "Non-readers: track the text with your finger as classmates read aloud.",
    ],
    NOTES_SLIDE5,
    FOOTER,
    (s) => {
      // Right column: reading detective visual
      s.addShape("roundRect", {
        x: 5.85, y: CONTENT_TOP + 0.15, w: 0.7, h: 0.7, rectRadius: 0.35,
        fill: { color: C.MIDNIGHT },
        shadow: makeCardShadow(),
      });
      s.addImage({ data: icons.search, x: 5.93, y: CONTENT_TOP + 0.23, w: 0.54, h: 0.54 });

      // Detective prompts card
      s.addShape("roundRect", {
        x: 5.75, y: CONTENT_TOP + 1.00, w: 3.65, h: 2.60, rectRadius: 0.1,
        fill: { color: C.PARCHMENT },
        shadow: makeCardShadow(),
      });
      s.addText("While reading, ask:", {
        x: 5.9, y: CONTENT_TOP + 1.10, w: 3.35, h: 0.30,
        fontSize: 11, fontFace: FONT_B, color: C.SLATE, bold: true, margin: 0,
      });
      const detectiveQs = [
        "What life events does he mention?",
        "How does he describe his feelings?",
        "What challenges did he face?",
        "What values or beliefs come through?",
      ];
      detectiveQs.forEach((q, i) => {
        s.addText("\u2022  " + q, {
          x: 5.9, y: CONTENT_TOP + 1.48 + i * 0.42, w: 3.35, h: 0.38,
          fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
        });
      });
    }
  );

  // ── Slide 6: Pair-Share — Discussing David Almond's Life ────────────────────
  pairShareSlide(
    pres,
    "Discussing David Almond's Life",
    [
      "What were some important events in David Almond's life? How might they influence his writing?",
      "How did David Almond feel about school? How might his feelings about school influence his characters?",
      "Was it easy for David Almond to become a published writer? How do you know from the text?",
    ],
    NOTES_SLIDE6,
    FOOTER
  );

  // ── Slide 7: Key Insights — What We Know About David Almond ─────────────────
  contentSlide(
    pres,
    "Key Insights",
    C.GOLD,
    "What We Know About David Almond",
    [
      "Loss and grief: Almond experienced the death of his father and sister — he understands grief deeply. His characters may navigate similar emotional journeys.",
      "School and belonging: Almond found secondary school difficult — his characters may have complex, ambivalent feelings about school and fitting in.",
      "Persistence through rejection: Almond was rejected many times before being published — his characters may show resilience and perseverance when facing adversity.",
    ],
    NOTES_SLIDE7,
    FOOTER,
    (s) => {
      // Right column: three icon rows
      const insightIcons = [icons.feather, icons.chalkboard, icons.pen];
      const insightColors = [C.MIDNIGHT, C.SLATE, C.AMBER];
      insightIcons.forEach((ic, i) => {
        const cy = CONTENT_TOP + 0.55 + i * 1.25;
        s.addShape("roundRect", {
          x: 5.85, y: cy - 0.28, w: 0.6, h: 0.6, rectRadius: 0.30,
          fill: { color: insightColors[i] },
          shadow: makeCardShadow(),
        });
        s.addImage({ data: ic, x: 5.915, y: cy - 0.215, w: 0.46, h: 0.46 });
      });
    }
  );

  // ── Slide 8: Literary Device — Narrative Hook ───────────────────────────────
  contentSlide(
    pres,
    "Literary Device",
    C.MIDNIGHT,
    "Narrative Hook",
    [
      "A narrative hook appears at the beginning of a text to capture the reader's attention and make them want to keep reading.",
      "Hooks often create gaps or mysteries — things we do not yet understand that activate our curiosity.",
      "When we encounter a hook, we instinctively ask questions and want to read on to fill the gap.",
      "Strong hooks work immediately — even in a single sentence.",
    ],
    NOTES_SLIDE8,
    FOOTER,
    (s) => {
      // Right: definition card in styled box
      s.addShape("roundRect", {
        x: 5.85, y: CONTENT_TOP + 0.10, w: 3.65, h: 1.20, rectRadius: 0.1,
        fill: { color: C.MIDNIGHT },
        shadow: makeCardShadow(),
      });
      s.addText("NARRATIVE HOOK", {
        x: 5.95, y: CONTENT_TOP + 0.24, w: 3.45, h: 0.36,
        fontSize: 14, fontFace: FONT_H, color: C.GOLD, bold: true, align: "center", margin: 0,
      });
      s.addText("Creates a gap → activates curiosity → reader infers and wants more", {
        x: 5.95, y: CONTENT_TOP + 0.64, w: 3.45, h: 0.50,
        fontSize: 11, fontFace: FONT_B, color: C.SAND, align: "center", valign: "middle", margin: 0,
      });

      // Hook icon
      s.addShape("roundRect", {
        x: 6.70, y: CONTENT_TOP + 1.50, w: 0.60, h: 0.60, rectRadius: 0.30,
        fill: { color: C.SLATE },
        shadow: makeCardShadow(),
      });
      s.addImage({ data: icons.quoteLeft, x: 6.77, y: CONTENT_TOP + 1.57, w: 0.46, h: 0.46 });
    }
  );

  // ── Slide 9: Quote — Chapter 1, First Sentence ──────────────────────────────
  quoteSlide(
    pres,
    "Chapter 1",
    "The First Sentence — A Narrative Hook",
    "I found him in the garage on a Sunday afternoon. It was the day after we moved into Falconer Road.",
    "p.1",
    "How does this single sentence hook the reader? What questions does it raise in your mind? What don\u2019t we know yet?",
    NOTES_SLIDE9,
    FOOTER
  );

  // ── Slide 10: Vocabulary — Filthy ───────────────────────────────────────────
  vocabSlide(
    pres,
    "Filthy",
    "adjective",
    "Something very dirty or unpleasant.",
    "The filthy garage was dark and full of dust and cobwebs.",
    NOTES_SLIDE10,
    FOOTER
  );

  // ── Slide 11: Pair-Share — Chapter 1, Pause & Predict ───────────────────────
  pairShareSlide(
    pres,
    "Chapter 1 — Pause & Predict",
    [
      "What is the author trying to tell us about the man in the garage? What specific details stand out to you?",
      "Why does the author refer to him as \u201Ca creature\u201D? What do you think of when you hear the word \u2018creature\u2019? What might this choice of word suggest?",
      "Who or what do you predict this creature might be? Use text clues to support your prediction. What does the information about the baby tell us — and what have we learned about the narrator from his reactions so far?",
    ],
    NOTES_SLIDE11,
    FOOTER
  );

  // ── Slide 12: Task — Written Response ───────────────────────────────────────
  taskSlide(
    pres,
    "You Do",
    "Written Response",
    [
      {
        label: "First",
        instruction: "Return to both texts. Find 2\u20133 specific examples or details from David Almond\u2019s \u2018About me\u2019 AND from Chapter 1 of Skellig that you want to use in your response.",
      },
      {
        label: "Next",
        instruction: "Write your response in your workbook. Choose at least one of these questions: (1) What similarities can we see between David Almond\u2019s life and Michael\u2019s? (2) How might Almond\u2019s views on persisting through challenges shape how Michael responds to events? (3) Who do you think is the man in the garage, and why might he be important?",
      },
      {
        label: "Then",
        instruction: "Check your response includes evidence from BOTH texts. Use the structure: \u2018In Almond\u2019s About me, he says\u2026\u2019 and \u2018In Chapter 1, we see that\u2026\u2019",
      },
    ],
    NOTES_SLIDE12,
    FOOTER
  );

  // ── Slide 13: Closing — Review & Reflect ────────────────────────────────────
  closingSlide(
    pres,
    "Share your written response with your partner. What ideas can you add, build on, or respectfully challenge?",
    [
      "Readers connect what they know about an author's life to the text to deepen understanding.",
      "Predictions are revised as we read more — changing your prediction shows great reading.",
      "Narrative hooks create mystery and gaps that make us want to keep reading.",
    ],
    NOTES_SLIDE13
  );

  // ── Write file ──────────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: "output/Lesson_Skellig_1_Authors_Life.pptx" });
  console.log("\u2713 output/Lesson_Skellig_1_Authors_Life.pptx");
}

build().catch(console.error);
