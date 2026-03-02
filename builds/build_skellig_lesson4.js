// Skellig — Lesson 4: Inferring Character Traits
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
  FaSearch,
  FaUsers,
  FaLightbulb,
  FaPen,
  FaUserCircle,
} = require("react-icons/fa");

const FOOTER = "Skellig  |  Lesson 4 of 25  |  Year 5/6 Literacy";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_SLIDE1 = `SAY:
• "Today we are going to build on our reading of Skellig by developing one of the most important comprehension skills — making inferences."
• "We have already read and discussed Chapters 1 to 3. Today we will read Chapters 4 and 5 together and use what we read to build a detailed picture of Michael's character."
• "By the end of today you will have a written character profile and a diary entry in Michael's voice."

DO:
• Display this slide as students settle. Copies of Skellig should be on desks.
• Point to the lesson title: "Inferring Character Traits — what do you think that phrase means? Turn and tell your neighbour." Allow 20 seconds.

TEACHER NOTES:
Launching with the lesson title as a brief discussion prompt activates prior schema without front-loading instruction. The word "inferring" signals continuity with earlier comprehension lessons (visualising, predicting, connecting, summarising — VC2E6LY08). This slide sets a purposeful, literary tone consistent with the Skellig theme: mystery, depth, reading beneath the surface. VTLM 2.0 element: Establishing Purpose and Relevance. DECIDE Framework: opening of the D (Define) and E (Explore) phase.

WATCH FOR:
• Students who conflate "inferring" with "guessing" before instruction begins — note these students for targeted CFU on Slide 4.
• Students who have read ahead — ask them to hold their knowledge and focus on the evidence approach being taught today.

[General: Lesson opener — Establishing Purpose | VTLM 2.0: Establishing Purpose and Relevance]`;

const NOTES_SLIDE2 = `SAY:
• "Here is what we are learning today and how we will know we have been successful."
• Read the Learning Objective aloud: "We will learn to infer character traits in a text."
• Point to each Success Criterion: "By the end of this lesson you should be able to do both of these things — make inferences AND back them up with evidence."
• "Keep these visible as we work. At the end of the lesson I will ask you to check yourself against them."

DO:
• Read the LO and SC together as a class — students track with finger or murmur along.
• Leave the slide visible for 30 seconds for silent re-reading.
• Do not preview the full lesson sequence yet — return to these criteria at Stage 3.

TEACHER NOTES:
Explicitly sharing learning intentions reduces cognitive load by providing students with a schema to anchor incoming information (CLT: schema activation). The two success criteria map directly to the lesson's GRR arc: SC1 aligns to We Do (Pair-Share inferences, guided reading), SC2 aligns to You Do (character profile completion and diary entry). Returning to these at the close of Stage 3 creates a metacognitive feedback loop. VTLM 2.0 element: Making Learning Visible / Clear Learning Intentions.

WATCH FOR:
• Students who write down criteria without reading them — pause and model reading SC1: "So what does this tell us we need to practise?"
• The word "traits" may need a quick gloss: "A trait is a quality — something that describes what someone is like as a person."

[General: I Do — Making Learning Visible | VTLM 2.0: Clear Learning Intentions]`;

const NOTES_SLIDE3 = `SAY:
• "Before we read new chapters, we are going to practise summarising what we have read so far."
• "Summarising means expressing the most important parts of a text — in your own words — in a short and clear way. It is the main ideas made smaller."
• "These sentence starters are tools to help you write with precision. Notice that some tell us about time, some about place, some about characters' decisions. We call these adverb groups — they tell us when, where, how, or why something happened."
• "With your partner, use at least three of these starters to summarise Chapters 1 to 3 in 4 to 5 sentences. Write your summary in your workbook."

DO:
• Project this slide and give students 30 seconds to read the sentence starters silently before Pair-Share begins.
• Circulate actively during Pair-Share — listen for accurate recall of key events (move, garage, sick man).
• After 3 minutes, call on 2–3 non-volunteer pairs. Affirm accurate recall; gently correct inaccuracies without shaming.
• Students then write their 4–5 sentence summary independently in workbooks. Allow 5 minutes.

CFU CHECKPOINT:
Technique: Pair-Share + non-volunteer
Script:
• "Discuss with your partner: using at least three of these starters, summarise the most important events of Chapters 1 to 3. You have 2 minutes."
• After sharing: "[Non-volunteer pair] — which starter did you use first, and what did you write? Read it to us."
• Listen for: accurate recall of the three key events (family moved; garage forbidden; Michael finds injured man).
PROCEED (≥80%): Most pairs identify all three key events and use sentence starters appropriately — move to inference review.
PIVOT (<80%): Misconception: students may summarise with excessive detail (retelling rather than summarising). Reteach: "Summarising is NOT retelling — it is choosing only the most important events. Ask yourself: if I removed this detail, would the reader still understand the story? If yes, leave it out." Re-check: "Give me one sentence that captures the most important thing that happened in Chapter 3."

MISCONCEPTIONS:
• Misconception: Summarising equals retelling (students include irrelevant details or near-verbatim text).
  Why: Students have been rewarded for recall; summarising requires active selection which is a higher cognitive demand.
  Impact: Later, when writing their diary entry, students will struggle to prioritise character-revealing details over plot.
  Quick correction: Model a poor summary vs a strong summary side by side — circle the unnecessary details in the poor version.

WATCH FOR:
• Pairs who split the work rather than constructing the summary together — redirect: "Both of you need to be able to explain each sentence."
• Students who are unsure of key events — these students may need the enabling support during independent application.

[General: Stage 1 — Activate Prior Knowledge | VTLM 2.0: Prior Knowledge Activation / Retrieval Practice]`;

const NOTES_SLIDE4 = `SAY:
• "Now we are going to revisit a skill we have started to develop — making inferences."
• Read the definition: "An inference is made by combining clues from the text with background knowledge to understand what is happening in the text."
• Write on the board or display: TEXT CLUES + MY THINKING = INFERENCE
• "Inference is different from prediction. A prediction is something we think will happen next. An inference is something we conclude is TRUE right now, based on evidence — we are reading between the lines."
• "We will use a three-part structure every time we make an inference: The text says... / I am thinking... / I infer..."
• Read aloud the final two sentences of Chapter 1. Ask: "What can we infer about the family from this passage? Use the structure."
• Ask: "What do you think Michael means by the last sentence?" Pair-Share. Call on a non-volunteer.

DO:
• Write the formula on the board as you say it — students copy into their workbooks.
• After the pair share, confirm understanding before moving on: use Thumbs Up / Thumbs Down.

CFU CHECKPOINT:
Technique: Thumbs Up / Thumbs Down
Script:
• "Show me with your thumb — thumbs up if you understand the difference between an inference and a prediction; thumbs down if you are still unsure; thumb sideways if you are getting there."
• Scan the room. If fewer than 80% thumbs up — reteach using the anchor chart.
PROCEED (≥80% thumbs up): Move to vocabulary instruction.
PIVOT (<80%): Misconception: inference = prediction. Reteach using the anchor chart: "A prediction looks forward — it says 'I think this will happen.' An inference looks at what is happening NOW and draws a conclusion from the evidence. Example: if I see someone come inside with wet hair and a dripping coat, I don't predict — I infer it is raining outside. I used evidence." Re-check: "Which is the inference — 'I think it will rain later' or 'I think it is raining now because of the wet coat'?" [Inference = the second one — it uses current evidence.]

MISCONCEPTIONS:
• Misconception: Inference and prediction follow the same structure, therefore they are the same thing.
  Why: Both involve using clues and thinking — students focus on the similar process and miss the critical distinction: inferences conclude about the present; predictions project into the future.
  Impact: Students will consistently use "I predict" when asked to infer, muddying comprehension responses and character analysis throughout the unit.
  Quick correction: Use a two-column anchor chart — INFERENCE (now / what IS true based on evidence) vs PREDICTION (later / what MIGHT happen). Return to this chart every lesson until the distinction is automatic.
• Misconception: Inferences are opinions that do not need evidence.
  Why: Students have been asked "What do you think about [character]?" in informal discussions without being required to justify.
  Impact: Written responses lack textual grounding; character profiles will be vague or speculative.
  Quick correction: Explicitly reject responses that lack evidence. Repeat the formula: "Text clues + my thinking = inference. Where are your text clues? Point to the line."

WATCH FOR:
• Students who confuse emotional response ("I feel sorry for Michael") with inference — redirect: "What does the text TELL us? Now — what do you THINK about that? Now combine them."
• Students who can state the formula but cannot apply it — these students may need the enabling support on Slides 11 and 12.

[General: Stage 1 — Activate Prior Knowledge (inference review) | VTLM 2.0: Prior Knowledge Activation]`;

const NOTES_SLIDE5 = `SAY:
• "Before we read Chapters 4 and 5 together, we are going to learn two words from those chapters."
• Say the word with me: BAWLING.
• Read the definition: "to cry loudly — like howling or wailing."
• "Think of synonyms — other words that mean the same thing." [sobbing, wailing, howling, weeping]
• "And antonyms — opposites." [whispering, murmuring, laughing]
• Read the example sentence together as a choral read: "The toddler was bawling at the supermarket after his mother said no to the sweets."
• "With your partner, jointly construct a sentence using 'bawling'. You have 30 seconds. Write it down."
• Call on 2 non-volunteers to share their sentences.

DO:
• Use a consistent vocabulary routine — say, define, synonyms/antonyms, choral example, joint construct, share.
• Do not rush this routine — consistent exposure over time builds vocabulary depth (Nation, 2001).
• If students offer an example that uses "bawling" correctly but in a different context, affirm and expand: "Great — that shows bawling can happen when someone is frustrated, not just sad."

TEACHER NOTES:
Explicit vocabulary instruction using the word study routine (define — examples — non-examples — sentence construction) builds both breadth and depth of vocabulary knowledge. This aligns with Beck, McKeown and Kucan's (2013) Tier 2 vocabulary approach: "bawling" is a general academic word with literary register that students will encounter in many texts. Teaching it before reading reduces cognitive load during the reading task (CLT: extraneous load reduction). VTLM 2.0 element: Building Vocabulary.

WATCH FOR:
• Students who know the word informally ("my little brother was bawling last night") — affirm and link to the formal definition.
• Students who write a sentence using the word incorrectly — collect these for brief one-to-one correction during partner reading.

[General: Stage 2 — Vocabulary Instruction | VTLM 2.0: Building Vocabulary]`;

const NOTES_SLIDE6 = `SAY:
• "Our second word: DAFT."
• Say it together: DAFT.
• "Daft means to appear foolish, silly or lacking good sense."
• "Think of synonyms." [silly, foolish, ridiculous, absurd]
• "And antonyms." [sensible, wise, reasonable, clever]
• Choral read the example: "It was a bit daft to go outside without a coat in the middle of winter."
• "Jointly construct a sentence with your partner using 'daft'. 30 seconds. Write it."
• Call on 2 non-volunteers.

DO:
• Keep the same routine as "bawling" — predictability in vocabulary instruction reduces anxiety and increases on-task time.
• Note that "daft" is an informal British English word — this is worth commenting on: "David Almond uses British English — it feels like the world of the book, not a textbook."
• Ask: "Where might you encounter the word 'daft' outside a novel?" [British TV shows, conversations in the UK]

TEACHER NOTES:
"Daft" is an excellent example of a word with cultural register — it flags the British setting of Skellig and builds students' appreciation of how word choice creates voice. Almond uses "daft" in Chapter 5 in dialogue, and recognising it will reduce decoding interruptions during partner reading. Consistent vocabulary routines (VC2E6LY08: vocabulary knowledge) reduce cognitive load during the reading task. VTLM 2.0 element: Building Vocabulary.

WATCH FOR:
• Students who giggle at the word — acknowledge: "Yes, it is a funny-sounding word. That is actually part of what makes Almond's voice distinctive."
• Students who use "daft" in a sentence about a person in a way that could be unkind — redirect: "Let's keep our examples about situations, not people we know."

[General: Stage 2 — Vocabulary Instruction | VTLM 2.0: Building Vocabulary]`;

const NOTES_SLIDE7 = `SAY:
• "Now I am going to introduce a tool we will use throughout this novel study — the Character Profile."
• "Character traits are the different qualities that define a character. They include what a character thinks, feels, says, does, their personality, and the choices they make."
• "We are going to build a profile of Michael using five lenses — five different ways of looking at evidence in the text."
• Point to each category: "What Michael says — his dialogue; What Michael thinks — his internal thoughts; What Michael does — his actions and behaviour; What others say or think about Michael — evidence from other characters; My inferences about Michael's character traits — where we bring it all together."
• "As we read Chapters 4 and 5, I will stop at key moments. Your job is to add information to the correct box."

DO:
• Display the actual Character Profile 1 document alongside this slide if possible (projected or printed).
• Walk students through where each piece of information goes. Stress: "We do not write what we personally feel — we write what the TEXT gives us as evidence."
• Remind students: this document will also be used in Lesson 12. They must keep it safe.

TEACHER NOTES:
The character profile is a graphic organiser that scaffolds the cognitive demand of inference by distributing evidence into discrete categories (CLT: managing intrinsic load through structure). The five categories directly correspond to the four evidence types taught in VTLM 2.0 character analysis: dialogue, thought, action, and others' perception. Presenting the profile before reading primes students to read as active analysts rather than passive recipients. DECIDE Framework: entering the C (Construct) phase. VTLM 2.0 element: Structured Scaffolding / Reading Like a Writer.

WATCH FOR:
• Students who want to fill in the "My inferences" box first — redirect: "Gather the evidence first, then draw your conclusions. Otherwise you are guessing, not inferring."
• Students unsure which box to use for a piece of evidence — this is a teachable ambiguity: discuss why some evidence could fit more than one category (e.g., an action can also reveal a thought).

[General: Stage 2 — I Do (introducing the character profile) | VTLM 2.0: Structured Scaffolding]`;

const NOTES_SLIDE8 = `SAY:
• "Now I will show you how I use the three-part inference structure to read a character."
• Point to the left panel: "This is the structure we always use. Every inference must have all three parts."
• "Watch how I think aloud as I read this passage from Chapter 4."
• Read the example inference aloud, pausing between each part: "The text says... [pause] I am thinking... [pause] I infer..."
• "Notice: I do not just say 'Michael is kind.' I say WHAT THE TEXT SAYS, then WHAT I AM THINKING about it, then MY INFERENCE. The text grounds the inference — it is not an opinion."

DO:
• Model thinking aloud with deliberate slowness — make the cognitive process visible.
• Return to the Character Profile: "Now I add this inference to the 'My inferences' box AND the evidence to 'What Michael says' box."
• After modelling, invite Pair-Share: "What other inferences could you draw from this same passage?" Call on 2 non-volunteer pairs.

CFU CHECKPOINT:
Technique: Pair-Share + non-volunteer
Script:
• "With your partner — what other inference could you draw from Michael whispering to his sister? Use the three-part structure."
• Listen for: students who anchor their inference to a specific word or phrase in the text (not a general feeling).
• Affirm strong responses: "Excellent — you tied your inference to a specific piece of evidence. That is what makes it an inference, not a guess."
PROCEED (≥80%): Students can generate at least one alternative inference grounded in textual evidence — move to partner reading.
PIVOT (<80%): Misconception: students offer opinions without textual grounding (e.g., "I think Michael is sad because babies make people sad"). Reteach: "Let me show the difference between an opinion and an inference. Opinion: I think Michael is worried. Inference: The text says Michael whispers to his sister; I am thinking whispering is quiet and careful — as if he does not want to disturb her; I infer Michael is worried about her and is being protective." Re-check: "Now you try — point to the exact words in the text that gave you your idea."

MISCONCEPTIONS:
• Misconception: Students confuse personal opinion with text-supported inference — they write "I think Michael is a good brother" without citing evidence.
  Why: Everyday discussion of characters (in film, TV, social contexts) rarely requires evidence. Students transfer this informal habit to the classroom.
  Impact: Written character analyses and diary entries will be generic and unsupported — unable to demonstrate VC2E6LY08 comprehension skill.
  Quick correction: Introduce a "show me the words" protocol. Any inference must be accompanied by the student physically pointing to (or quoting) the specific text that grounds it. Repeat this requirement on every task slide.
• Misconception: The three-part structure is a formula to complete mechanically, not a thinking tool.
  Why: Students focus on satisfying the structure's form rather than genuinely reasoning from evidence.
  Impact: Students produce grammatically correct but intellectually hollow inferences that use the structure as a template.
  Quick correction: Require students to identify the exact words they are drawing from before writing. If they cannot, they do not yet have their inference.

WATCH FOR:
• Students who give a valid inference using different words — do not insist on verbatim structure. Honour the thinking; then show how the structure makes it clearer.
• Students who are writing their own inference while the modelling is occurring — redirect: "Not yet — this is my turn to show you. Your turn comes in a moment."

[General: Stage 2 — I Do / Watch Me (modelling inference from Chapter 4) | VTLM 2.0: Explicit Modelling / Cognitive Apprenticeship]`;

const NOTES_SLIDE9 = `SAY:
• "Now it is your turn to practise — this is We Do. I am here to support you."
• "You are going to partner read Chapter 4, then part of Chapter 5. While you read, pause at these four questions and discuss them with your partner before moving on."
• "Remember: use the three-part structure when you discuss. Do not just answer — give me TEXT SAYS, I AM THINKING, I INFER."

DO:
• Before partner reading begins: assign roles — Partner A reads page 9; Partner B reads page 10; alternate from there.
• Circulate during reading. Listen for fluency, pacing, intonation. Take anecdotal notes on 4–5 students' reading fluency.
• Observe the non-reading partner — are they tracking with a finger? Redirect gently if not.
• After partner reading, re-read aloud the Michael/mum dialogue on page 10 as a model before Pair-Share.
• After Pair-Share on each question, call on non-volunteer pairs. Add strong inferences to the teacher's character profile on the board/document camera.
• For Question 3 (reluctance to go to school) — note that Almond's text references Michael's dad staying home to renovate and mum taking the baby to hospital. These are important context clues.
• For Question 4 — be mindful: students may bring up the reference to drunk people in Chapter 5. If raised, acknowledge it briefly and redirect: "Let us focus on what this tells us about Michael's character."

CFU CHECKPOINT:
Technique: Pair-Share + non-volunteer
Script:
• After Question 2: "[Non-volunteer pair] — using the structure, what can you infer about Michael's personality from him walking away from his mum?"
• Listen for: acknowledgement that walking away is an ACTION; thinking about what action reveals (discomfort, grief, not wanting to burden); inference about Michael's personality trait (self-contained, protective of his emotions, private).
PROCEED (≥80%): Pairs are generating grounded inferences, even if imperfect — continue guided reading.
PIVOT (<80%): Students are describing what happened rather than inferring. Reteach: "Describing is not inferring. I walk away — that is what HAPPENS. But WHY does Michael walk away? What does it REVEAL about him? Now use the structure to explain." Re-check: "Have another go — The text says Michael walks away from his mum. I am thinking... I infer..."

TEACHER NOTES:
Partner reading with alternating roles develops reading fluency through supported oral reading — a key component of VC2E6LY08 (monitoring, questioning, connecting). The deliberate alternation ensures both partners are reading actively, not just listening. The anecdotal notes during partner reading are formative data for future guided reading groups. This slide represents the We Do phase of GRR — structured support with teacher circulation and non-volunteer calling. VTLM 2.0 element: Guided Practice / Collaborative Learning.

WATCH FOR:
• Pairs who are rushing through the reading without pausing for the discussion questions — place a hand on the book: "Stop here. Discuss Question 2 before you read on."
• Students who are disengaged during their partner's reading — redirect to tracking with a finger.
• Note students who generate sophisticated inferences during pair share — these students may be ready for the extending task.

[General: Stage 2 — We Do (guided practice, partner reading) | VTLM 2.0: Guided Practice / Collaborative Learning]`;

const NOTES_SLIDE10 = `SAY:
• "I am going to ask someone to share an inference about Michael using our three-part structure."
• "The focus is the nicknames Michael gives to his teachers — and the doctor."
• "Scan back through Chapter 5 to find the relevant passage. You have one minute."
• [After 1 minute] "I will now cold call someone to share their inference."
• After response: affirm or prompt for textual grounding. "Where in the text did you find your evidence? Read us the line."

DO:
• Do not signal who you will call — maintain genuine cold call expectation across the room.
• After the cold call response, open briefly to additional responses: "Who has a different inference from the same evidence?"
• Record 2–3 inferences on the board/document camera. Ask the class: "Which of these is best grounded in the text? Why?"

CFU CHECKPOINT:
Technique: Cold Call
Script:
• "Scan Chapter 5. Find where Michael gives nicknames to his teachers. You have 60 seconds. Do not write yet — just find the passage. [Pause.] [Student name] — using the three-part structure, share your inference about Michael's character from this passage."
• Listen for: a specific quotation or event; a reasoning step (I am thinking he invents names because...); a character trait inference (irreverent, observant, uses humour as a coping mechanism, highly perceptive).
• Prompt if needed: "What does it tell us about a person who invents nicknames for authority figures?"
PROCEED (≥80%): Student generates a valid, evidence-grounded inference — class can move to independent application.
PIVOT (<80%): Misconception: students interpret nickname-giving as purely humorous ("Michael is funny") without deeper character insight. Reteach: "Yes, it is funny — but why does Michael do it? What does it tell us about how he sees the world? Does naming someone yourself give you a kind of power over them? What kind of person does that reveal?" Re-check: "So using that idea — complete the structure: The text says... I am thinking... I infer..."

TEACHER NOTES:
Cold Call is the most rigorous accountability technique — it ensures all students have prepared rather than only the volunteers. This slide marks the transition from We Do to You Do, so this CFU functions as a readiness gate: if fewer than 80% can generate a grounded inference, the independent task will produce poor outcomes and reinforcing errors is worse than pausing here. The "nicknames" passage is particularly rich for character inference — it reveals Michael's wit, his emotional distance, and his way of asserting agency in disorienting circumstances. DECIDE Framework: C (Construct) phase. VTLM 2.0 element: Accountable Talk / Formative Assessment.

WATCH FOR:
• Students who read the passage aloud rather than making an inference — redirect: "You found the evidence — great. Now tell me what you THINK about it. Then tell me your inference."
• Students who are visibly anxious about being cold called — normalise: "There is no wrong answer here — I just want to see your thinking."

[General: Stage 2 — CFU (readiness gate before independent application) | VTLM 2.0: Accountable Talk / Formative Assessment]`;

const NOTES_SLIDE11 = `SAY:
• "Now it is your turn. You are completing Michael's Character Profile independently."
• "Go back to Chapter 5 — read a section that tells you something about Michael's character. Then use the three-part structure to write your inference in the correct profile box."
• "The key test: can you point to the exact words in the text that gave you your evidence? If you cannot, you do not yet have an inference — you have an opinion."
• "Work silently and independently for 10 minutes."

DO:
• Circulate actively. Prioritise students who struggled during the CFU.
• Prompt students who are stuck: "Open Chapter 5. Find a moment where Michael DOES something, SAYS something, or THINKS something. Start there."
• Use the character profile scaffold — model adding to the profile in real time using the document camera if available.
• After 8 minutes, call on 2 volunteers to read their inferences aloud. Add to the teacher's profile.

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Provide students with 2 pre-selected short quotations from Chapter 5 (e.g., Michael's thoughts on the bus to school; a moment of curiosity about the garage). Provide a partially completed inference frame: "The text says [quotation]. I am thinking ______. I infer Michael is ______." Students complete the blanks.
• Rationale: Reducing the selection demand (which passage to choose) allows students to focus cognitive resources on the inference reasoning itself. The quotation is already identified; only the interpretation remains. This scaffolds the working memory load (CLT).
• Learning Progression Step: VC2E6LY08 — applying comprehension strategies with support; progressing toward independent application.
EXTENDING PROMPT:
• Task: After completing the profile for Michael, write inferences about one other character — Mum or Dad — from Chapter 5, using evidence from their dialogue and actions. Compare: in what ways do the parents' character traits contrast with Michael's?
• Rationale: Comparing characters requires students to hold two profiles in working memory simultaneously and identify patterns and contrasts — a higher-order application of inference skill across the text.
• Learning Progression Step: VC2E6LY08 — evaluating and synthesising across a text; extended comprehension strategies applied to multiple characters.

TEACHER NOTES:
The independent character profile task is the You Do phase of GRR. It is critical that students work from primary text evidence (open books) rather than from memory — this is not a recall task. The profile structure (five categories) ensures students distribute attention across different types of character evidence rather than defaulting to one type (most students default to action). Collecting profiles at the end of class provides formative assessment data for Lesson 5 planning. DECIDE Framework: C (Construct) phase / I (Implement). VTLM 2.0 element: Independent Practice.

WATCH FOR:
• Students who copy their partner's inference — circulate and quietly ask each student to explain their reasoning in their own words.
• Students who are filling in the profile without returning to the text — physically point to the book: "Show me the line."
• Students who finish early — direct immediately to the Extending task rather than waiting.

[General: Stage 2 — You Do (independent application: character profile) | VTLM 2.0: Independent Practice]`;

const NOTES_SLIDE12 = `SAY:
• "Excellent work on your character profiles. Now you are going to use what you have inferred about Michael to write a short diary entry — in his voice."
• "A diary entry is written in first person — 'I'. You are Michael, writing at the end of his first day back at school."
• "Use the character traits you have identified in the profile to make your writing feel authentic. If Michael is curious — show it. If he is guarded — show it. Let the reader infer his traits from what he writes, rather than stating them."
• "This is creative writing grounded in evidence. Every character choice you make should be justifiable from the text."

DO:
• Before students begin, briefly model the difference between stating a trait ("I felt worried") versus showing it through voice ("I kept thinking about the garage — about those eyes in the dark. What if it was gone when I got back?").
• Ensure students have their character profiles visible as a reference.
• Allow 8–10 minutes for independent writing.
• Circulate. Target students who are writing generic diary entries with no connection to the profile — ask: "Which box on your profile are you using right now? How can I tell from your writing?"

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Provide students with a structured diary entry frame: an opening line (Today was my first day back at school after...), a dot-point list of three things Michael might think or notice, and a closing line prompt. Students write 2–3 sentences expanding on each dot point.
• Rationale: The diary entry requires students to simultaneously apply their inferences, adopt a first-person voice, and write in a sustained way. For students who struggle with written expression, the frame reduces the compositional demand so they can focus on applying the inference to authentic character voice.
• Learning Progression Step: VC2E6LY08 — connecting comprehension to written response; progressing toward independent narrative composition in a character's voice.
EXTENDING PROMPT:
• Task: Write the diary entry AND a brief second diary entry from one parent's point of view on the same day. How does the same day look different through a different character's eyes? What can the reader infer about the parent's character from what they notice?
• Rationale: Writing from multiple perspectives requires students to hold distinct character profiles in mind simultaneously, synthesise their inferences, and produce differentiated voices — a sophisticated literary challenge.
• Learning Progression Step: VC2E6LY08 — synthesising and evaluating; applying inference skills across character perspectives in extended written response.

TEACHER NOTES:
The diary entry task is the culminating You Do activity — it asks students to apply their inferences in a creative written form, demonstrating that their understanding of Michael's character is genuinely internalised rather than surface-level. Constraining the task to first-person creative writing rather than an analytical paragraph is a deliberate choice: it requires students to show (not tell) their inferences, which is a higher cognitive demand than listing traits. Collecting diary entries alongside character profiles provides a two-point formative assessment window — the profile shows evidence-gathering; the diary shows application. DECIDE Framework: E (Evaluate) phase beginning. VTLM 2.0 element: Independent Practice / Creative Application.

WATCH FOR:
• Students who begin diary entries with "Dear Diary" and then describe plot events — redirect: "Michael would not describe the plot — he would write his thoughts and feelings. What is Michael thinking about right now?"
• Students who are very reluctant to begin — offer a first line: "It has been a long day."
• Students using first-person to describe other characters excessively — remind: "You are Michael. Stay in his head."

[General: Stage 2 — You Do (diary entry: creative written response from character's perspective) | VTLM 2.0: Independent Practice / Creative Application]`;

const NOTES_SLIDE13 = `SAY:
• "Before we finish, return to our Learning Objective and Success Criteria."
• Read the LO: "We will learn to infer character traits in a text."
• "Check yourself: can you make an inference about Michael? Can you back it up with evidence from the text?"
• "Share your diary entry with your partner. Does your partner's portrayal of Michael match your inferences — or does it reveal something different about his character? That itself is interesting — it shows that inference involves the reader's thinking too."
• "Here are our three key takeaways from today."
• Read each takeaway. Pause after each: "Which of these did you actually DO today?"

DO:
• Allow 2–3 minutes for partner sharing of diary entries.
• Call on 2–3 pairs to share an excerpt and their reflection: "In what way does your diary entry show Michael's character — without stating the trait directly?"
• Collect character profiles and diary entries for formative assessment before students leave.
• Remind students: "Your character profile will be used again in Lesson 12. If I am returning it to you before then, keep it in your Skellig folder."

CFU CHECKPOINT:
Technique: Pair-Share + non-volunteer
Script:
• "Share your diary entry. While your partner reads, write down one character trait you can INFER from their writing — do not tell them yet."
• After 2 minutes: "What trait did you infer from your partner's writing? Partner — did they capture what you intended? If not, what will you revise?"
• Listen for: students who can name a trait AND point to the specific line in the diary entry that revealed it.
PROCEED (≥80%): Pairs can identify a specific trait from diary entries and link it to a specific line — learning outcomes achieved.
PIVOT (<80%): Character traits are being stated rather than inferred from the writing. Reteach quickly: "In your diary entry — can I find your character traits WITHOUT you telling me? A reader should be able to infer — just like we inferred from Almond. Revise one sentence to SHOW rather than TELL." Re-check: "Read your revised sentence. What would a reader infer?"

TEACHER NOTES:
The closing reflection returns to the Learning Objective and Success Criteria — this metacognitive close completes the lesson's feedback loop (VTLM 2.0: Making Learning Visible). The partner share of diary entries serves a dual purpose: it is a peer review activity AND a formative assessment moment — students must infer from each other's writing, applying the lesson skill in a novel direction. Collecting both character profiles and diary entries provides two data points for formative assessment. The reminder about Character Profile 1 being used in Lesson 12 is critical for continuity. DECIDE Framework: E (Evaluate) phase. VTLM 2.0 element: Metacognitive Reflection / Sharing and Evaluating.

WATCH FOR:
• Students who have not completed their diary entry — note for follow-up; these students' character profiles will show whether the inference skill is developing.
• Students who are resistant to sharing — allow an optional "read to the teacher" alternative.
• Strong diary entries — request permission to use as exemplars in Lesson 5.

[General: Stage 3 — Review and Reflect | VTLM 2.0: Metacognitive Reflection / Evaluating Learning]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  if (!fs.existsSync("output")) fs.mkdirSync("output");

  const pres = new pptxgen();
  pres.layout  = "LAYOUT_16x9";
  pres.author  = "Claude";
  pres.title   = "Skellig — Lesson 4: Inferring Character Traits";

  // Pre-render icons
  const icons = {};
  icons.bookOpen   = await iconToBase64Png(FaBookOpen,   "#FFFFFF", 256);
  icons.search     = await iconToBase64Png(FaSearch,     "#FFFFFF", 256);
  icons.users      = await iconToBase64Png(FaUsers,      "#FFFFFF", 256);
  icons.lightbulb  = await iconToBase64Png(FaLightbulb,  "#FFFFFF", 256);
  icons.pen        = await iconToBase64Png(FaPen,        "#FFFFFF", 256);
  icons.userCircle = await iconToBase64Png(FaUserCircle, "#FFFFFF", 256);

  // ── Slide 1: Title ───────────────────────────────────────────────────────

  titleSlide(
    pres,
    "Skellig: Inferring Character Traits",
    "Novel Study — Year 5/6 Literacy",
    "Lesson 4 of 25",
    NOTES_SLIDE1
  );

  // ── Slide 2: LI + SC ────────────────────────────────────────────────────

  liSlide(
    pres,
    ["We will learn to infer character traits in a text."],
    [
      "I can make and discuss inferences about a character's traits.",
      "I can use evidence from the text to support my inferences about a character.",
    ],
    NOTES_SLIDE2,
    FOOTER
  );

  // ── Slide 3: Summarising Chapters 1–3 ───────────────────────────────────

  contentSlide(
    pres,
    "Stage 1",
    C.SLATE,
    "Summarising Chapters 1\u20133",
    [
      "In the story so far, we learn that Michael\u2019s family\u2026",
      "In the beginning, Michael discovers\u2026",
      "His mum and dad fearfully forbid him from going to the garage due to\u2026",
      "Inside the garage\u2026",
      "Michael quickly realises that\u2026",
    ],
    NOTES_SLIDE3,
    FOOTER,
    (s) => {
      // Right column: icon + reminder label
      const cx = 8.0, cy = 2.4, r = 0.32;
      s.addShape("roundRect", {
        x: cx - r, y: cy - r, w: r * 2, h: r * 2, rectRadius: r,
        fill: { color: C.SLATE },
      });
      s.addImage({ data: icons.bookOpen, x: cx - r * 0.55, y: cy - r * 0.55, w: r * 1.1, h: r * 1.1 });

      s.addText("Use adverb groups:\nwhen, where, how, why", {
        x: 5.7, y: 2.85, w: 3.6, h: 0.65,
        fontSize: 12, fontFace: FONT_B, color: C.SLATE, margin: 0, italic: true,
      });

      // Summary tip card
      s.addShape("roundRect", {
        x: 5.7, y: 3.6, w: 3.6, h: 1.35, rectRadius: 0.1,
        fill: { color: C.PARCHMENT },
        shadow: makeCardShadow(),
      });
      s.addText("Summarising tip", {
        x: 5.85, y: 3.68, w: 3.3, h: 0.28,
        fontSize: 10, fontFace: FONT_B, color: C.SLATE, bold: true, margin: 0,
      });
      s.addText("Express the most important parts in your own words — in a short and clear way.", {
        x: 5.85, y: 3.98, w: 3.3, h: 0.88,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    }
  );

  // ── Slide 4: What Is an Inference? ──────────────────────────────────────

  contentSlide(
    pres,
    "Inference",
    C.MIDNIGHT,
    "What Is an Inference?",
    [
      "An inference is made by combining clues from the text with background knowledge to understand what is happening in the text.",
      "TEXT CLUES  +  MY THINKING  =  INFERENCE",
      "Inference is different from prediction: a prediction is something we think will happen next; an inference is a conclusion we draw about what is true RIGHT NOW, based on evidence.",
      "Three-part structure: The text says\u2026 / I am thinking\u2026 / I infer\u2026",
    ],
    NOTES_SLIDE4,
    FOOTER,
    (s) => {
      // Formula callout card on right
      s.addShape("roundRect", {
        x: 5.7, y: CONTENT_TOP, w: 3.6, h: 1.55, rectRadius: 0.1,
        fill: { color: C.MIDNIGHT },
        shadow: makeCardShadow(),
      });
      s.addText("The formula", {
        x: 5.85, y: CONTENT_TOP + 0.10, w: 3.3, h: 0.28,
        fontSize: 10, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
      });
      s.addText("Text clues\n+ My thinking\n= Inference", {
        x: 5.85, y: CONTENT_TOP + 0.42, w: 3.3, h: 1.0,
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
      });

      // Three-part structure card
      const structY = CONTENT_TOP + 1.75;
      s.addShape("roundRect", {
        x: 5.7, y: structY, w: 3.6, h: 1.2, rectRadius: 0.1,
        fill: { color: C.PARCHMENT },
        shadow: makeCardShadow(),
      });
      s.addText("Three-part structure", {
        x: 5.85, y: structY + 0.08, w: 3.3, h: 0.28,
        fontSize: 10, fontFace: FONT_B, color: C.MIDNIGHT, bold: true, margin: 0,
      });
      s.addText("The text says\u2026\nI am thinking\u2026\nI infer\u2026", {
        x: 5.85, y: structY + 0.40, w: 3.3, h: 0.72,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });

      // Icon circle
      const cx = 7.5, cy = 4.35, r = 0.30;
      s.addShape("roundRect", {
        x: cx - r, y: cy - r, w: r * 2, h: r * 2, rectRadius: r,
        fill: { color: C.SLATE },
      });
      s.addImage({ data: icons.lightbulb, x: cx - r * 0.55, y: cy - r * 0.55, w: r * 1.1, h: r * 1.1 });
    }
  );

  // ── Slide 5: Vocab — Bawling ─────────────────────────────────────────────

  vocabSlide(
    pres,
    "Bawling",
    "verb",
    "to cry loudly, such as howling or wailing",
    "The toddler was bawling at the supermarket after his mother said no to the sweets.",
    NOTES_SLIDE5,
    FOOTER
  );

  // ── Slide 6: Vocab — Daft ───────────────────────────────────────────────

  vocabSlide(
    pres,
    "Daft",
    "adjective",
    "to appear foolish, silly or lacking good sense",
    "It was a bit daft to go outside without a coat in the middle of winter.",
    NOTES_SLIDE6,
    FOOTER
  );

  // ── Slide 7: Michael's Character Profile ────────────────────────────────

  contentSlide(
    pres,
    "Character Profile",
    C.GOLD,
    "Michael\u2019s Character Profile",
    [
      "What Michael SAYS \u2014 his dialogue and spoken words",
      "What Michael THINKS \u2014 his internal thoughts and feelings",
      "What Michael DOES \u2014 his actions and behaviour",
      "What OTHERS say or think about Michael \u2014 evidence from other characters",
      "My INFERENCES about Michael\u2019s character traits",
    ],
    NOTES_SLIDE7,
    FOOTER,
    (s) => {
      const cx = 8.0, cy = 2.0, r = 0.30;
      s.addShape("roundRect", {
        x: cx - r, y: cy - r, w: r * 2, h: r * 2, rectRadius: r,
        fill: { color: C.GOLD },
      });
      s.addImage({ data: icons.userCircle, x: cx - r * 0.55, y: cy - r * 0.55, w: r * 1.1, h: r * 1.1 });

      // Reminder card
      s.addShape("roundRect", {
        x: 5.7, y: 2.6, w: 3.6, h: 2.3, rectRadius: 0.1,
        fill: { color: C.PARCHMENT },
        shadow: makeCardShadow(),
      });
      s.addText("Remember", {
        x: 5.85, y: 2.68, w: 3.3, h: 0.28,
        fontSize: 10, fontFace: FONT_B, color: C.AMBER, bold: true, margin: 0,
      });
      s.addText("Character traits are the qualities that define a character:\nthoughts \u2022 feelings \u2022 actions\nwords \u2022 personality \u2022 choices", {
        x: 5.85, y: 3.00, w: 3.3, h: 1.30,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
      s.addText("Keep your profile \u2014 you will use it in Lesson 12.", {
        x: 5.85, y: 4.40, w: 3.3, h: 0.38,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });
    }
  );

  // ── Slide 8: Modelling — Inference from Chapter 4 ───────────────────────

  modellingSlide(
    pres,
    "I Do \u2014 Watch Me",
    "Inferring from Chapter 4 \u2014 Michael\u2019s Dialogue",
    "Three-part inference structure:\n\n1. The text says\u2026\n\n2. I am thinking\u2026\n\n3. I infer\u2026",
    "Example inference:\n\nThe text says Michael whispers to his sister on p.\u202f10.\n\nI am thinking he is worried about his sister and wants her to get better.\n\nI infer Michael is caring and hopeful, even when facing fear.",
    NOTES_SLIDE8,
    FOOTER
  );

  // ── Slide 9: Pair-Share — Guided Reading Inferences ─────────────────────

  pairShareSlide(
    pres,
    "Guided Reading \u2014 Inferences from Chapters 4 & 5",
    [
      "Why does Michael\u2019s mum reach out her hand? What can we infer about their relationship?",
      "Why does Michael walk away from his mum? What does this tell us about his character?",
      "What can we infer from Michael\u2019s reluctance to go to school?",
      "Why does Michael NOT tell anyone about the creature in the garage?",
    ],
    NOTES_SLIDE9,
    FOOTER
  );

  // ── Slide 10: CFU — Cold Call ────────────────────────────────────────────

  cfuSlide(
    pres,
    "CFU",
    "Check: Making an Inference",
    "Cold Call",
    "Using the three-part structure, make an inference about Michael based on the nicknames he gives his teachers.\n\nThe text says\u2026 / I am thinking\u2026 / I infer\u2026",
    NOTES_SLIDE10,
    FOOTER
  );

  // ── Slide 11: Task — Character Profile (You Do) ──────────────────────────

  taskSlide(
    pres,
    "You Do",
    "Complete Michael\u2019s Character Profile",
    [
      {
        label: "First",
        instruction:
          "Re-read a section from Chapter 5 that reveals something about Michael\u2019s character.",
      },
      {
        label: "Next",
        instruction:
          "Use the three-part structure: The text says\u2026 / I am thinking\u2026 / I infer\u2026  Write your inference in the correct box on your character profile.",
      },
      {
        label: "Then",
        instruction:
          "Check: does your inference come from EVIDENCE in the text, not just a guess? Could you point to the exact words?",
      },
    ],
    NOTES_SLIDE11,
    FOOTER
  );

  // ── Slide 12: Task — Diary Entry (You Do) ───────────────────────────────

  taskSlide(
    pres,
    "You Do",
    "Diary Entry: Michael\u2019s First Day Back at School",
    [
      {
        label: "First",
        instruction:
          "Review the character traits you have inferred about Michael from his profile.",
      },
      {
        label: "Next",
        instruction:
          "Write a diary entry from Michael\u2019s point of view at the end of his first day back at school. Include his thoughts, feelings, and what he has seen in the garage.",
      },
      {
        label: "Then",
        instruction:
          "Read your diary entry. Have you used evidence from the text to make your portrayal of Michael authentic? SHOW the traits \u2014 do not state them.",
      },
    ],
    NOTES_SLIDE12,
    FOOTER
  );

  // ── Slide 13: Closing ────────────────────────────────────────────────────

  closingSlide(
    pres,
    "Share your diary entry with a partner. Does your partner\u2019s portrayal of Michael match your inferences \u2014 or reveal something different about his character?",
    [
      "Inferences combine text evidence with our own background knowledge and thinking",
      "Character traits are revealed through a character\u2019s words, actions, thoughts and what others say about them",
      "The three-part inference structure: The text says\u2026  I am thinking\u2026  I infer\u2026",
    ],
    NOTES_SLIDE13
  );

  // ── Write file ───────────────────────────────────────────────────────────

  await pres.writeFile({ fileName: "output/Lesson_Skellig_4_Character_Traits.pptx" });
  console.log("\u2713 output/Lesson_Skellig_4_Character_Traits.pptx");
}

build().catch(console.error);
