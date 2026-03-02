// Skellig — Lesson 5: Inferring and Character Development
// Year 5/6 Literacy — Novel Study
// Victorian Curriculum: VC2E6LY08

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
  FaBookOpen, FaSearch, FaUsers, FaLightbulb,
  FaPen, FaUserCircle, FaFeatherAlt,
} = require("react-icons/fa");

const FOOTER = "Skellig  |  Lesson 5 of 25  |  Year 5/6 Literacy";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_SLIDE1 = `SAY:
• "Today we are reading detectives. We are not just finding out what happens — we are working out what the author is hinting at."
• "We call this skill inferring: using what the text tells us, combined with what we already know, to work out something the author hasn't said directly."
• "By the end of the lesson you will have begun a character development profile of the mysterious man in the garage — and you'll write a paragraph describing him."

DO:
• Display title slide as students settle. Copies of Skellig should be on desks.
• Point to the lesson title and ask: "What does 'character development' mean to you? What do you already know about this man?"
• Keep opening brief — the lesson has a lot of reading. Move to the LO slide promptly.

TEACHER NOTES:
This title slide opens Stage 1 (Define, DECIDE Framework). The phrase "reading detectives" primes students to approach the text analytically rather than passively. Framing inferring as an active, effortful skill (rather than guessing) supports metacognitive awareness, a key VTLM 2.0 element: Establishing Purpose and Relevance. The character development profile that begins today will be returned to in Lesson 19, creating a longitudinal comprehension scaffold across the unit.

WATCH FOR:
• Students who confuse inferring with guessing — clarify the distinction at the outset: inferences are grounded in text evidence, not imagination.

[General: Title / D — Define phase | VTLM 2.0: Establishing Purpose and Relevance]`;

const NOTES_SLIDE2 = `SAY:
• Read the Learning Objective aloud: "We are learning to infer character traits based on the language and events in a text."
• "Let's read the Success Criteria together." [Choral read each criterion.]
• "Notice the word 'evidence' in SC2. That is the key to today. Every inference must point back to specific words or phrases in the text."

DO:
• Choral read the LO, then each SC.
• Ask students to make a mental note: "Which of these do you already feel confident about? Which will be the challenge?"
• Leave the slide visible long enough for students to re-read silently before moving on.

TEACHER NOTES:
Explicit sharing of learning intentions reduces extraneous cognitive load by giving students a framework to organise incoming information (Sweller; Kirschner). SC1 (identify descriptions) scaffolds into SC2 (make inferences with evidence) — these map directly to the I Do → You Do arc of the GRR model. Returning to these criteria at the end of Stage 3 closes the formative feedback loop. VTLM 2.0: Making Learning Visible / Clear Learning Intentions.

WATCH FOR:
• Students who skim the SC without processing — pause and ask: "So what is the difference between describing a character and inferring something about them?"

[General: I Do | VTLM 2.0: Making Learning Visible / Clear Learning Intentions]`;

const NOTES_SLIDE3 = `SAY:
• "Before we read new chapters, let's activate what we already know. Think back to Chapters 4 and 5 from last lesson."
• "Turn to your partner. You have 90 seconds. Question 1: what key events do you remember? Question 2: what do you know about the man in the garage so far?"
• [After Pair-Share] "Let's hear from some of you."

DO:
• Use Cold Call (not hands-up) to gather responses after partner talk. Target 3–4 pairs.
• Expected events from Ch 4–5: Michael worries about his baby sister; he doesn't tell anyone about the man; he wonders if he dreamed the encounter.
• Expected descriptions of the man: filthy, pale, thin face, squeaky voice, cobwebs in his hair, wearing a black suit.
• Record key student contributions on the board in two columns: "Events" and "The man — what we know." These anchor the inferring work to come.

CFU CHECKPOINT:
Technique: Cold Call
Script:
• "I'm going to pick some pairs at random — not hands up."
• Scan for: factual accuracy about events; descriptive language about the man (appearance, voice, behaviour).
PROCEED (≥80%): Students can identify 3+ details about the man. Move to vocabulary.
PIVOT (<80%): Misconception: students confuse man with another character, or rely on single detail. Reteach: open text to relevant page and read aloud the description together before continuing.

TEACHER NOTES:
Activating prior knowledge at lesson start is a low-stakes retrieval practice event (Roediger & Butler, 2011). Using Cold Call (Dylan Wiliam) rather than hands-up gives you a representative sample of understanding across the class. The two-column board record becomes a reference point throughout the lesson and connects directly to the character development profile students will begin completing in Stage 2. DECIDE Framework: C — Connect (prior knowledge activation). VTLM 2.0: Activating Prior Knowledge.

WATCH FOR:
• Students who cannot recall any details about the man — note for close monitoring during guided practice.
• Students who over-summarise ("he's just weird") — prompt: "Can you point me to a word or phrase in the text?"

[General: We Do (prior knowledge) | VTLM 2.0: Activating Prior Knowledge | DECIDE: Connect]`;

const NOTES_SLIDE4 = `SAY:
• "Before we read Chapter 6, we are going to meet a word that appears in the chapter: fossil."
• [Choral read:] "Fossil."
• "A fossil is the remains or traces of a plant or animal that lived long ago. Fossils give scientists clues about the past."
• [Choral read the definition.] "Now listen to the example sentence." [Read aloud.]
• "Here is a quick check — thumbs up or thumbs down. I'll ask two questions."

DO:
• Point to the word, read it, choral read.
• Read definition clearly and slowly. Ask students to restate to a partner in their own words before the example.
• Read the example sentence with expression.
• Move immediately to the CFU slide (slide 6) for thumbs up/down check — this slide is the vocab introduction; the check has its own slide.

TEACHER NOTES:
Pre-teaching tier 2/3 vocabulary before reading reduces cognitive load during the reading itself (Nation, 2001). "Fossil" is significant in Chapter 6 because Almond uses it as a symbolic description linked to the man's apparent stillness and connection to the past. The word also primes students to think about age, decay, and secrets preserved through time — all thematic threads of Skellig. VTLM 2.0: Building Vocabulary and Background Knowledge. DECIDE: I — Introduce.

WATCH FOR:
• Students who think fossils are only dinosaur bones — broaden: "Fossils can be plant imprints, shells, insect traces..."
• The link between fossil and the man's character should not be made explicit yet — save for after Chapter 7 reading.

[General: I Do — Vocabulary | VTLM 2.0: Building Vocabulary and Background Knowledge]`;

const NOTES_SLIDE5 = `SAY:
• "Before we read, let me show you the character development profile you'll be working with today. This is Student Resource 4."
• "You can see it has two columns: 'Before' and 'Now'. Today we are only filling in the 'Now' column based on Chapters 6 and 7."
• "The five categories are: Looks like; Says and thinks; Does; Relationship with Michael; and My inference."
• "As we read, you are looking for evidence that fits into each of these boxes. I will model the first two inferences during the read aloud."

DO:
• Project or distribute Student Resource 4 (character development profile).
• Point to each category label and briefly gloss what each means.
• Emphasise: "The 'Now' column captures who the man is at this point in the story. We will come back to the 'Before' column and the right half of the profile in Lesson 19 — so hold onto your copy."
• Make clear the reading purpose: students are gathering evidence, not summarising plot.

TEACHER NOTES:
The character development profile is a graphic organiser that reduces cognitive load during complex inferential reading (Marzano, 2004). Showing it before reading primes students for the specific type of thinking required — categorised, evidence-based analysis. The longitudinal design (completing it again in Lesson 19) creates a powerful comparison point for tracking character change. VTLM 2.0: Providing Worked Examples / Structured Practice. DECIDE: E — Engage (orienting to purpose).

MISCONCEPTIONS:
• Misconception: Students treat the profile boxes as a retelling exercise — writing "He looks dirty" rather than quoting specific words and making an inference.
  Why: Students default to paraphrase because it feels safer and requires less text-specific attention.
  Impact: Reduces the analytical rigour of the exercise; blurs the line between observation and inference.
  Quick correction: Model the contrast explicitly — "Retelling says 'he looks dirty.' Evidence + inference says: 'The text says cobwebs are in his hair (p.13). I infer he has not moved or been near other people for a very long time.'"

WATCH FOR:
• Students writing in the wrong column (Before instead of Now) — monitor and redirect early.
• Students who rush to fill all boxes before reading — remind them to find text evidence first.

[General: I Do — orienting to task | VTLM 2.0: Providing Worked Examples]`;

const NOTES_SLIDE6 = `SAY:
• "Quick check before we read. I'm going to ask you two questions about 'fossil.' Answer with thumbs up for yes, thumbs down for no. No calling out — show me silently."
• Question 1: "Is a fallen leaf a fossil?" [Pause — scan hands.] "Thumbs down — correct. A fallen leaf is organic matter, but it has not been preserved in rock over thousands of years."
• Question 2: "Is an imprint of a bird skeleton in a rock a fossil?" [Pause.] "Thumbs up — yes! That is exactly what a fossil is: the preserved trace of a living thing."
• "And the thinking question: why does it matter whether something is a fossil or not?"

DO:
• Scan all students simultaneously — do not allow early responders to signal others.
• Use the thinking question to extend: cold-call a student. [Expected: fossils tell us about history, about what lived before us. They are evidence from the past — just as the man in the garage seems to be a kind of living fossil.]
• Do not make the man-fossil connection explicit for students — allow them to encounter it in the text.

CFU CHECKPOINT:
Technique: Thumbs Up/Down
Script:
• "Show me silently. No calling out — I want to see everyone's thinking."
• Scan for: universal thumbs-down on Q1, universal thumbs-up on Q2.
PROCEED (≥80%): Most students respond correctly on both questions. Move to Chapter 6 partner reading.
PIVOT (<80%): Misconception: students think any old or dead thing is a fossil. Reteach: "A fossil requires preservation over thousands of years in rock or resin. It's not just something that's old — it's something that has been captured and held." Re-check: "So — a mammoth frozen in ice for 10,000 years. Fossil or not?" [Fossil.] Confirm, then move on.

TEACHER NOTES:
Thumbs Up/Down is an efficient simultaneous CFU technique that provides a whole-class signal without social pressure (Dylan Wiliam). The thinking question elevates beyond recall into application — students must use the definition generatively, which is a stronger indicator of understanding. This also pre-loads the symbolic register of 'fossil' that Almond exploits in later chapters. VTLM 2.0: Formative Assessment / Checking for Understanding. DECIDE: E — Engage.

[General: CFU — Vocabulary | VTLM 2.0: Formative Assessment]`;

const NOTES_SLIDE7 = `SAY:
• "Now we read Chapter 6 together as partners. Your job is to read with fluency and expression — not just decoding, but bringing the text to life."
• "You will alternate: one partner reads the first half of each page, then swap. The listener tracks with a finger."
• "As you read, keep thinking: what does the author tell us about the man's character?"
• "After reading, everybody writes a 2-minute summary independently. Then share with your partner and add anything you missed."

DO:
• Circulate while students read — listen for at least 3 pairs. Write anecdotal notes on reading fluency (speed, phrasing, expression, self-correction).
• Target students who read in a monotone or word-by-word — model a short phrase with expression, then invite them to try again.
• After reading: enforce the independent 2-minute write before partner sharing. This prevents the stronger partner from dominating.
• Call on 2–3 non-volunteers to share summary points. Build a brief shared summary on the board.

TEACHER NOTES:
Partner reading builds reading fluency through authentic oral performance (Rasinski, 2010). Alternating by half-page (rather than full page) keeps both partners equally engaged and prevents one student from doing all the reading. The independent 2-minute summary before discussion is a high-leverage retrieval practice event — students who cannot summarise independently are signalling comprehension gaps that pair discussion might otherwise mask. VTLM 2.0: Structured Practice / Fluency. DECIDE: I — Independent (partner) reading.

WATCH FOR:
• Pairs who read silently despite the instruction — remind them that oral reading is the purpose.
• Students who skip the independent write and go straight to talking — enforce with a timer on the board.
• Chapter 6 summary should include: Michael returns to the garage; he finds the man again; the man's description is reinforced; Michael brings 27 and a half — note this for later inference.

[General: We Do — Partner Reading | VTLM 2.0: Structured Practice / Fluency]`;

const NOTES_SLIDE8 = `SAY:
• "Now I am going to read the first page of Chapter 7 aloud. Your job: listen and notice. Look for evidence that fits the categories in the character development profile."
• [Read aloud — pause after line 4, p.17:] "Listen to what the text says: his voice is cracked and squeaky. Watch what I do with that."
• "The text tells me the man's voice is cracked and squeaky. I am thinking he is old, timid and possibly ill. I infer he might have been in the garage for a very long time and has neither spoken with anyone nor used his voice."
• [Continue reading — pause after line 7, p.17:] "He keeps repeating the word 'nothing.' Watch the three-part structure again."
• "The text tells me the man keeps repeating 'nothing.' I am thinking he has almost given up and is close to despair. He has very little energy to answer simple questions. I infer that he does not have the energy or will to talk to anyone."
• [Project on character development profile:] "'Nothing' goes in the 'Says and thinks' box. In the 'Inference' box: 'I think the man has almost given up and is close to despair.'"

DO:
• Model the three-part structure visibly and narrate each step: "The text says... / I am thinking... / I infer..."
• Write on the projected profile as you speak — students watch; they do not write yet.
• Keep the modelling brisk and focused on the structure, not the interpretation. The point is the method.
• After modelling, ask: "Did anyone notice the structure I used each time?" [Cold call — expected: text says / I think / I infer.]

CFU CHECKPOINT:
Technique: Cold Call (embedded in I Do)
Script:
• "What was the three-part structure I used?"
• Scan for: all three parts named in order.
PROCEED (≥80%): Students can name the three-part structure. Move to guided practice.
PIVOT (<80%): Misconception: students merge "I am thinking" and "I infer" into one step — they skip background knowledge and jump to the conclusion. Reteach: "There are two moves here. First I connect the text clue to what I already know (I am thinking...). Then I state my conclusion (I infer...). Without the thinking step, we're just guessing." Re-check: "What is the difference between 'I am thinking' and 'I infer'?"

TEACHER NOTES:
Teacher think-aloud (the I Do phase of GRR) makes the invisible thinking of expert readers visible (Davey, 1983). The three-part inference scaffold (text says / I am thinking / I infer) separates the three cognitive moves that novice readers conflate: identifying evidence, connecting to background knowledge, and drawing a conclusion. By modelling with specific page and line references, the teacher also demonstrates precision of evidence — a key quality criterion for analytical writing. VTLM 2.0: Worked Example / Modelling. DECIDE: D — Demonstrate.

MISCONCEPTIONS:
• Misconception: Students record opinions or feelings about the character rather than text-grounded inferences ("I think he's scary" without evidence).
  Why: Students confuse personal response with textual analysis. This is a critical error — inference without evidence is speculation.
  Impact: Undermines analytical writing; students cannot transfer the skill to unfamiliar texts.
  Quick correction: "That is a response — and it might be right. But I need you to show me the word or phrase that made you think that. Go back and find it, then complete the three-part structure."
• Misconception: Students think 'cracked and squeaky' proves the man is old. Age is the inference, not the observation.
  Why: Students blur the distinction between what the text says (evidence) and what it means (inference).
  Impact: Collapses the analytical structure; makes the inference step invisible.
  Quick correction: "Is the word 'old' in the text? [No.] So where did 'old' come from? [Our thinking.] Exactly — that is the inference."

WATCH FOR:
• Students writing in profile during modelling — ask them to hold off: "Watch first. You will have time to write your own."
• Students who copy the modelled inference verbatim rather than constructing their own later.

[General: I Do — Modelling | VTLM 2.0: Worked Example / I Do | DECIDE: Demonstrate]`;

const NOTES_SLIDE9 = `SAY:
• "Now it's your turn to read independently to the end of Chapter 7. As you read, look for more evidence about the man's character traits."
• "When you've finished, discuss with your partner. Use the questions on the screen to guide your thinking."
• "I'm going to be walking around to listen and ask you questions. Be ready to share with the class."

DO:
• Allow 8–10 minutes of independent reading, then 5 minutes of partner discussion.
• Circulate throughout — listen into pairs. Ask probing questions: "What does the text actually say? / What does that make you think? / So what can you infer?"
• Use Pair-Share + non-volunteer callout after discussion. Choose 2–3 pairs who have not yet volunteered to share an inference.
• Jointly construct one further inference on the character development profile (projected). Model: "The text tells me that the man is pale and his clothes are loose (p.17, lines 16–17). I am thinking he is sick and has lost weight. He might be dying or malnourished. I infer this from his skin colour and the loose fit of his clothes."
• Choral read the jointly constructed response. Invite one more jointly constructed example.

CFU CHECKPOINT:
Technique: Pair-Share + Non-Volunteer Cold Call
Script:
• "Tell your partner one inference you can make about the man based on Chapter 7. Use the three-part structure."
• Call on 2–3 pairs who have not shared before. Prompt if needed: "What does the text say? What are you thinking?"
PROCEED (≥80%): Pairs can produce at least one evidence-grounded inference. Move to CFC (joint construction).
PIVOT (<80%): Misconception: students describe the man's actions without making an inference ("He keeps saying 'go away'"). Reteach: "That's the evidence — great. Now: what does that tell you about how he feels or what kind of person he is? Complete the sentence: I infer..." Re-check: ask the same pair to try again.

TEACHER NOTES:
Non-volunteer callout (Dylan Wiliam) disrupts the pattern of only confident students sharing, giving the teacher a truer sample of understanding. The joint construction phase (We Do) bridges between full teacher modelling and independent application — students contribute the content while the teacher maintains the analytical structure. Choral reading of the jointly constructed response reinforces the model and gives all students a spoken example to internalise. VTLM 2.0: Guided Practice / We Do. DECIDE: E — Engage (shared construction).

WATCH FOR:
• The laughing-without-smiling detail is particularly rich for inference — if no pair raises it, prompt: "What about the moment when the man laughs but doesn't smile? What can you infer from that?"
• Students who rely solely on the teacher's model rather than generating their own — prompt them to find a different quote.

[General: We Do — Guided Practice | VTLM 2.0: Guided Practice / We Do | DECIDE: Engage]`;

const NOTES_SLIDE10 = `SAY:
• "I want to check how well you can apply the three-part structure on your own before you go independent."
• "Read the information on the screen. The text tells us the man is pale and his clothes are loose — page 17, lines 16 to 17."
• "With your partner: complete the three-part inference together. I want to hear: 'The text says... / I am thinking... / I infer...'"

DO:
• Give 2–3 minutes for Think-Pair-Share.
• Listen to at least 3 pairs during the thinking time.
• Cold-call 1–2 pairs to share. Listen for: text evidence (pale skin, loose clothes); thinking (sick / weight loss / malnourished); inference (dying, has been without food or care for a long time).
• Accept variations provided they are evidence-grounded. Correct any inference that is stated without evidence.

CFU CHECKPOINT:
Technique: Think-Pair-Share
Script:
• "Think first on your own for 30 seconds. Then share with your partner. I will ask some of you to share."
• Scan for: students who can complete all three parts; students who skip the "I am thinking" step and go straight to inference.
PROCEED (≥80%): Most pairs produce a complete, evidence-grounded three-part inference. Move to independent task (slide 11).
PIVOT (<80%): Misconception: students write that the man "must have a disease" without connecting to specific text clues. Reteach: "Where in the text does it say 'disease'? It doesn't — so how do you know? Walk me through: what does the text say? What does that make you think? Then what do you infer?" Re-check: repeat with a simpler, single-detail inference before releasing to independent work.

TEACHER NOTES:
This CFU acts as a gating check before independent work — the GRR hinge point between We Do and You Do. Think-Pair-Share (Lyman, 1981) gives processing time before public sharing, increasing the quality of responses. The specific page and line reference in the prompt models the precision of evidence students should apply independently. If fewer than 80% can complete the three-part structure here, independent practice will compound the gap — pivot and re-teach before releasing. VTLM 2.0: Formative Assessment / CFU. DECIDE: C — Check.

[General: CFU — Hinge Point | VTLM 2.0: Formative Assessment | DECIDE: Check]`;

const NOTES_SLIDE11 = `SAY:
• "You are now going to complete the 'Now' column of your character development profile independently."
• "Step 1: find a section from Chapter 6 or 7 that tells you something about the man. Find the exact words."
• "Step 2: use the three-part structure — text says, I am thinking, I infer — and record it in the correct box."
• "Step 3: complete as many boxes as you can. For each one, ask yourself: can I point to a specific word or phrase?"

DO:
• Allow 10–12 minutes of independent work.
• Circulate and monitor: check that students are quoting specific text, not paraphrasing.
• Write anecdotal notes against SC1 (identifies descriptions) and SC2 (makes evidence-grounded inferences).
• Prompt students who are stuck: "Find the page where [X happens]. Read that paragraph. What exact words describe the man?"
• Prompt students who are writing opinions: "Show me the word in the text that made you think that."

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Re-read only the first page of Chapter 7 (page 17). Find one word or phrase that describes the man. Write it in the 'Says and thinks' box. Then complete just the inference for that one box using the structure on the board.
• Rationale: Breaking the task into a single category for a single text section reduces the cognitive load for students who are overwhelmed by the full profile. It preserves the analytical structure while limiting the scope.
• Learning Progression Step: VC2E6LY08 — identifying stated information in a text before moving to inferential comprehension.
EXTENDING PROMPT:
• Task: Complete the 'Now' column, then compare the man in the garage to Michael. Identify two character traits they share and two that differ, using evidence from the text for each point.
• Rationale: Character comparison requires synthesising evidence across multiple characters and sections — a higher-order analytical move that extends beyond the year-level expectation.
• Learning Progression Step: VC2E6LY08 — evaluating and synthesising information across a text to analyse themes and characterisation.

TEACHER NOTES:
Independent application is the You Do phase of the GRR model. The three-step task sequence (find evidence → apply structure → check with text) keeps students anchored to the text rather than relying on memory or opinion. Anecdotal notes against the SC during this phase constitute ongoing formative assessment (Assessment for Learning). The enabling prompt preserves the analytical skill while reducing scope; the extending prompt deepens through comparison, which is a hallmark of higher-order textual analysis. VTLM 2.0: Independent Practice / You Do. DECIDE: I — Independent Application.

WATCH FOR:
• Students who fill all boxes quickly without returning to the text — check quality, not completion speed.
• Students who have strong opinions but cannot locate text evidence — direct them back to specific pages.

[General: You Do — Independent Application | VTLM 2.0: Independent Practice | DECIDE: Independent]`;

const NOTES_SLIDE12 = `SAY:
• "Now use your character development profile entries to write a paragraph describing the man in detail."
• "Use words and phrases from the text — don't just retell. Show us what you have inferred about him."
• "If you finish, try the extension: write from the man's point of view. What is he thinking and feeling the moment Michael comes into the garage?"

DO:
• Allow 8–10 minutes of independent writing.
• Remind students before they start: "Your paragraph should include at least two direct references to language from the text."
• Circulate and look for: use of specific vocabulary from Almond's text; inference language ("I think/this suggests/this shows"); specificity of detail.
• Prompt: "Can you add a word or phrase directly from the text to support that idea?"
• For the extension: prompt students to consider the man's perspective — "He cannot move easily. He has been alone. Michael is intruding. What is going through his mind?"

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Use the sentence frame — "The man looks [character trait] because the text says [direct quote]. This makes me think [inference]." Write at least two sentences using this frame before writing a full paragraph.
• Rationale: Sentence frames scaffold the integration of evidence and inference for students who understand the analytical move but struggle to produce extended written discourse independently.
• Learning Progression Step: VC2E6LY08 / VC2E6LE03 — using language evidence to support an analytical claim in writing.
EXTENDING PROMPT:
• Task: Write the scene entirely from the man's point of view as first-person narration. Use techniques from Lesson 2 (narrative hooks, withholding information) to create the same sense of mystery that Almond achieves from Michael's perspective.
• Rationale: Writing the same scene from a different perspective requires internalising the character's inferred traits and applying craft techniques — a synthesis of comprehension and composition at the highest level.
• Learning Progression Step: VC2E6LE03 / VC2E6LE05 — crafting narrative voice and perspective-taking through deliberate language choices.

TEACHER NOTES:
This writing task is the point at which comprehension and composition converge — a key VTLM 2.0 principle (Reading-Writing Connection). The character development profile serves as a pre-writing planning tool, reducing cognitive load during composition by externalising the character knowledge students have built. The perspective-switch extension (writing from the man's point of view) connects to Lesson 12's work on perspective writing, creating a coherent skill thread across the unit. Collect profiles and workbooks at the end for formative assessment against both SC. DECIDE: E — Evaluate (formative). VTLM 2.0: Reading-Writing Connection / Independent Production.

WATCH FOR:
• Paragraphs that retell plot rather than describe character — redirect: "I know what he does. Tell me what kind of person he is."
• Strong writers who write about the man sympathetically without evidence — valuable instinct, but must be grounded: "Find the moment in the text that made you feel sorry for him. Quote it."

[General: You Do — Writing | VTLM 2.0: Reading-Writing Connection | DECIDE: Evaluate]`;

const NOTES_SLIDE13 = `SAY:
• "Let's come back together. Re-read the Learning Objective and Success Criteria at the top of your profile or workbook."
• [Reflection prompt:] "Turn and talk: how does making inferences about the man in the garage deepen your understanding of the story's themes? What do you think the man represents?"
• "Let's hear some ideas." [Cold call 2–3 students.]
• "Here are three things I want you to hold onto from today's lesson." [Read through takeaways.]

DO:
• Ask students to swap workbooks/profiles with a partner and read each other's paragraph descriptions of the man.
• Circulate and write final anecdotal notes against both success criteria.
• Use the reflection prompt as a whole-class discussion starter — do not over-direct. Listen for ideas about mystery, isolation, despair, hope, mortality.
• Collect character development profiles and workbooks for formative assessment at the end of the lesson.

CFU CHECKPOINT:
Technique: Turn and Talk (embedded closing reflection)
Script:
• "What do you need to remember when making an inference? Tell your partner."
• Scan for: text evidence; background knowledge/thinking; stating the inference.
PROCEED (≥80%): Students articulate the three components. Close the lesson with takeaways.
PIVOT (<80%): Misconception: students think character analysis is about listing what a character does, not what their actions reveal about them as a person. Reteach: "Retelling tells us what. Analysis tells us why — what it reveals about who they are. The man keeps saying 'go away' — what does that reveal about him? His character, not just his actions." Re-check: "So what kind of person is he, based on the evidence?"

TEACHER NOTES:
The closing reflection returns to the LO and SC, completing the lesson arc (Making Learning Visible — VTLM 2.0). Peer reading of paragraphs is a low-stakes sharing strategy that broadens the sample of writing students encounter. The open-ended reflection on what the man 'represents' invites students into thematic interpretation — a higher-order move that previews the analytical work of Lesson 19 when profiles will be completed. Collecting profiles and workbooks provides summative formative assessment data to inform groupings and differentiation in the next lesson. VTLM 2.0: Reviewing Learning / Consolidation. DECIDE: E — Evaluate.

MISCONCEPTIONS:
• Misconception: Students think character analysis is a retelling of what the character does, rather than an analysis of what their actions and words reveal about their personality, values, and inner life.
  Why: Students' prior experience of character work often focuses on plot-level description ("Michael is worried") rather than personality-level analysis ("Michael's secrecy suggests he craves control in a situation where he feels powerless").
  Impact: Students produce surface-level responses that do not demonstrate inferential comprehension — a critical gap for Years 5/6.
  Quick correction: "If I said 'Michael worries about his sister' — is that character analysis or a plot summary? Now, if I said 'Michael's constant worry reveals that he feels responsible for things beyond his control' — which is analysis?"

WATCH FOR:
• Students who cannot name any of the three components of an inference at the end of the lesson — these students need additional supported practice before Lesson 6.
• Students who are excited by the extension (man's perspective writing) — note these for the enrichment task in Lesson 12.

[General: Review & Reflect | VTLM 2.0: Reviewing Learning / Consolidation | DECIDE: Evaluate]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build function
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  if (!fs.existsSync("output")) fs.mkdirSync("output");

  const pres = new pptxgen();
  pres.layout  = "LAYOUT_16x9";
  pres.author  = "Claude";
  pres.title   = "Skellig — Lesson 5: Inferring and Character Development";

  // ── Pre-render icons ─────────────────────────────────────────────────────
  const icons = {
    bookOpen:    await iconToBase64Png(FaBookOpen,    "#FFFFFF", 256),
    search:      await iconToBase64Png(FaSearch,      "#FFFFFF", 256),
    users:       await iconToBase64Png(FaUsers,       "#FFFFFF", 256),
    lightbulb:   await iconToBase64Png(FaLightbulb,   "#FFFFFF", 256),
    pen:         await iconToBase64Png(FaPen,         "#FFFFFF", 256),
    userCircle:  await iconToBase64Png(FaUserCircle,  "#FFFFFF", 256),
    feather:     await iconToBase64Png(FaFeatherAlt,  "#FFFFFF", 256),
  };

  // ── Slide 1 — Title ───────────────────────────────────────────────────────
  titleSlide(
    pres,
    "Skellig: Inferring and Character Development",
    "Novel Study — Year 5/6 Literacy",
    "Lesson 5 of 25",
    NOTES_SLIDE1
  );

  // ── Slide 2 — LO + SC ────────────────────────────────────────────────────
  liSlide(
    pres,
    ["We are learning to infer character traits based on the language and events in a text."],
    [
      "I can identify an author's descriptions of a character.",
      "I can make and discuss inferences about a character using evidence from the text.",
    ],
    NOTES_SLIDE2,
    FOOTER
  );

  // ── Slide 3 — Prior knowledge Pair-Share ─────────────────────────────────
  pairShareSlide(
    pres,
    "Chapters 4 & 5 — What Do We Know So Far?",
    [
      "Recall: what happened in Chapters 4 and 5? What key events do you remember?",
      "What do we know about the man in the garage so far? List as many descriptive details as you can — his appearance, his voice, his behaviour.",
    ],
    NOTES_SLIDE3,
    FOOTER
  );

  // ── Slide 4 — Vocabulary: Fossil ─────────────────────────────────────────
  vocabSlide(
    pres,
    "Fossil",
    "noun",
    "the remains or traces of a plant or animal that lived long ago. A fossil gives scientists clues about the past.",
    "The children found a fossil of a shell in the rock near the cliff.",
    NOTES_SLIDE4,
    FOOTER
  );

  // ── Slide 5 — Character Development Profile overview ─────────────────────
  contentSlide(
    pres,
    "Character Development",
    C.MIDNIGHT,
    "The Character Development Profile — The Man in the Garage",
    [
      "We are completing the 'Now' column today using evidence from Chapters 6 and 7.",
      "Looks like — key words and phrases describing the man's appearance.",
      "Says and thinks — what the man says; what he thinks (direct or inferred).",
      "Does — the man's actions and behaviour throughout the chapters.",
      "Relationship with Michael — how does the man react to Michael's presence?",
      "My inference — using the three-part structure: The text says... / I am thinking... / I infer...",
      "Hold onto your profile — you will complete the remaining column in Lesson 19.",
    ],
    NOTES_SLIDE5,
    FOOTER,
    (s) => {
      // Right-column visual anchor: a simple icon + label panel
      const panelX = 6.1;
      const panelY = CONTENT_TOP;
      const panelW = 3.4;
      const panelH = SAFE_BOTTOM - CONTENT_TOP;

      s.addShape("roundRect", {
        x: panelX, y: panelY, w: panelW, h: panelH, rectRadius: 0.1,
        fill: { color: C.MIDNIGHT },
        shadow: makeCardShadow(),
      });

      // Gold header label
      s.addText("Track These", {
        x: panelX + 0.15, y: panelY + 0.12, w: panelW - 0.3, h: 0.35,
        fontSize: 12, fontFace: FONT_B, color: C.GOLD, bold: true,
        align: "center", margin: 0,
      });
      s.addText("as you read →", {
        x: panelX + 0.15, y: panelY + 0.47, w: panelW - 0.3, h: 0.28,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED,
        align: "center", margin: 0,
      });

      const rows = [
        { icon: icons.userCircle, label: "Looks like",             color: C.SLATE   },
        { icon: icons.lightbulb,  label: "Says & thinks",          color: C.AMBER   },
        { icon: icons.search,     label: "Does",                   color: C.SAGE    },
        { icon: icons.users,      label: "Relationship w/ Michael",color: C.CRIMSON },
        { icon: icons.feather,    label: "My inference",           color: C.GOLD    },
      ];

      rows.forEach((row, i) => {
        const ry = panelY + 0.90 + i * 0.65;
        if (ry + 0.48 > SAFE_BOTTOM) return;

        // Circle bg (roundRect for LibreOffice compat)
        const r = 0.20;
        const cx = panelX + 0.42;
        const cy = ry + 0.22;
        s.addShape("roundRect", {
          x: cx - r, y: cy - r, w: r * 2, h: r * 2, rectRadius: r,
          fill: { color: row.color },
        });
        s.addImage({ data: row.icon, x: cx - 0.14, y: cy - 0.14, w: 0.28, h: 0.28 });

        s.addText(row.label, {
          x: panelX + 0.80, y: ry + 0.08, w: panelW - 0.92, h: 0.32,
          fontSize: 11, fontFace: FONT_B, color: C.WHITE,
          valign: "middle", margin: 0,
        });
      });
    }
  );

  // ── Slide 6 — CFU: Fossil Thumbs Up/Down ─────────────────────────────────
  cfuSlide(
    pres,
    "CFU",
    "Quick Check: Understanding 'Fossil'",
    "Thumbs Up / Thumbs Down",
    "Is a fallen leaf a fossil?  [Thumbs down — No]\n\nIs an imprint of a bird skeleton in a rock a fossil?  [Thumbs up — Yes]\n\nWhy does it matter whether something is a fossil or not?",
    NOTES_SLIDE6,
    FOOTER
  );

  // ── Slide 7 — Partner Reading: Chapter 6 ─────────────────────────────────
  pairShareSlide(
    pres,
    "Partner Reading — Chapter 6",
    [
      "While reading: what does the author tell us about the man's character through his appearance, words, and actions? Track evidence for the character development profile.",
      "Write a 2-minute summary of Chapter 6 independently. What are the most important events? Share with your partner and add anything you missed.",
    ],
    NOTES_SLIDE7,
    FOOTER
  );

  // ── Slide 8 — Modelling: Inferring from Chapter 7 ────────────────────────
  modellingSlide(
    pres,
    "I Do — Watch Me",
    "Inferring from Chapter 7 — The Man's Character",
    // leftContent — the inference structure scaffold
    "Three-part inference structure:\n\n1. The text says...\n2. I am thinking...\n3. I infer...\n\nLook for evidence of:\n\u2022 Appearance\n\u2022 Words and voice\n\u2022 Actions and behaviour\n\u2022 Relationship to Michael",
    // rightContent — modelled examples (displayed in parchment card)
    "'His voice is cracked and squeaky' (p.17, line 4)\n\u2192 I am thinking he is old, timid and possibly ill.\n\u2192 I infer he might have been in the garage for a long time without speaking to anyone.\n\n'Nothing' repeated (p.17, line 7)\n\u2192 I am thinking he has almost given up and is close to despair.\n\u2192 I infer he does not have the energy or will to talk to anyone.",
    NOTES_SLIDE8,
    FOOTER
  );

  // ── Slide 9 — Guided Practice Pair-Share: Chapter 7 ─────────────────────
  pairShareSlide(
    pres,
    "Chapter 7 — More Inferences About the Man",
    [
      "The man laughs but doesn't smile. What can we infer from this?",
      "He keeps saying 'go away.' What does this tell us about how he feels about Michael intruding?",
      "He is covered in dust, dirt and cobwebs but does not wipe them away. What does this suggest about his state of mind?",
      "Why doesn't Michael get help for the man? What does this tell us about Michael?",
    ],
    NOTES_SLIDE9,
    FOOTER
  );

  // ── Slide 10 — CFU: Joint Construction inference ─────────────────────────
  cfuSlide(
    pres,
    "CFU",
    "Jointly Construct an Inference",
    "Think-Pair-Share",
    "The text says the man is pale and his clothes are loose (p.17, lines 16\u201317).\n\nWith your partner \u2014 complete the three-part inference:\n\nThe text says\u2026  /  I am thinking\u2026  /  I infer\u2026",
    NOTES_SLIDE10,
    FOOTER
  );

  // ── Slide 11 — Task: Complete Character Development Profile ───────────────
  taskSlide(
    pres,
    "You Do",
    "Complete the Character Development Profile — The Man",
    [
      {
        label: "First",
        instruction: "Re-read a section from Chapter 6 or 7 that reveals something about the man's character. Find specific words or phrases — quote them exactly.",
      },
      {
        label: "Next",
        instruction: "Use the three-part structure to make an inference and record it in the correct box of the character development profile: The text says\u2026 / I am thinking\u2026 / I infer\u2026",
      },
      {
        label: "Then",
        instruction: "Complete as many boxes in the 'Now' column as you can. For each box, check: can you point to a specific word or phrase in the text?",
      },
    ],
    NOTES_SLIDE11,
    FOOTER
  );

  // ── Slide 12 — Task: Write a Description ─────────────────────────────────
  taskSlide(
    pres,
    "You Do",
    "Write a Description of the Man",
    [
      {
        label: "First",
        instruction: "Review your character development profile entries about the man. Choose your two or three strongest inferences to anchor your paragraph.",
      },
      {
        label: "Next",
        instruction: "Write a paragraph describing the man in detail using words and phrases from the text. Show what you have inferred about his character — not just what he looks like.",
      },
      {
        label: "Then",
        instruction: "EXTEND: Rewrite the scene from the man's point of view. What does he think and feel when Michael comes into the garage? Consider his despair, his privacy, and what Michael fails to offer him.",
      },
    ],
    NOTES_SLIDE12,
    FOOTER
  );

  // ── Slide 13 — Closing reflection ────────────────────────────────────────
  closingSlide(
    pres,
    "How does making inferences about the man in the garage deepen your understanding of the story's themes? What do you think the man represents?",
    [
      "Inferences come from text evidence + background knowledge + your thinking — all three parts matter.",
      "Character development profiles help us track how characters change over the course of a story.",
      "Analysing character traits helps us write more complex and authentic characters in our own work.",
    ],
    NOTES_SLIDE13
  );

  // ── Write file ────────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: "output/Lesson_Skellig_5_Character_Development.pptx" });
  console.log("Done: output/Lesson_Skellig_5_Character_Development.pptx");
}

build().catch(console.error);
