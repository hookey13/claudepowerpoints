// Skellig — Lesson 3 of 25: Analysing Descriptive Language and Sensory Details
// Year 5/6 Literacy — Novel Study
// Victorian Curriculum: VC2E6LE02, VC2E6LE05, VC2E6LY08

"use strict";

const pptxgen = require("pptxgenjs");
const fs      = require("fs");

const {
  C, FONT_H, FONT_B,
  makeShadow, makeCardShadow,
  SAFE_BOTTOM, CONTENT_TOP,
  iconToBase64Png,
  addTopBar, addBadge, addTitle, addCard, addFooter,
  titleSlide, liSlide, contentSlide,
  vocabSlide, pairShareSlide, quoteSlide, cfuSlide,
  taskSlide, modellingSlide, closingSlide,
} = require("../themes/skellig_helpers");

const {
  FaBookOpen, FaPen, FaSearch, FaFeatherAlt,
  FaPencilAlt, FaEye, FaLightbulb,
} = require("react-icons/fa");

const FOOTER = "Skellig  |  Lesson 3 of 25  |  Year 5/6 Literacy";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_SLIDE1 = `SAY:
• "Welcome back to our Skellig unit. In our first two lessons we met the text and began to explore the world David Almond has created. Today we are going to look very carefully at HOW he creates that world — specifically at his descriptive language and his use of sensory details."
• "By the end of today, you will be able to identify those language features in the text, explain WHY an author uses them, and write your own descriptive passage using the same techniques."

DO:
• Display the title slide as students settle. Have printed A4 copies of the pages 6–7 passage ready to distribute before Stage 2.
• Note to self: the word 'fag' appears on page 6. It is a 1990s British colloquialism for cigarette. Acknowledge this briefly and factually if students react — do not skip past it in a way that draws more attention.

TEACHER NOTES:
This is a Stage 2 (Reading) lesson within the DECIDE framework — the focus is Examining Literary Texts. Students shift from whole-text comprehension (Lessons 1–2) to close reading at sentence and word level. This is cognitively demanding: it requires students to hold the whole-text context in working memory while attending to micro-level language choices. The title slide signals a clear pivot in focus. VTLM 2.0 element: Metalinguistic awareness — teaching students the language for talking about language.

[Examining Lit — Stage 2 | VTLM 2.0: Metalinguistic Awareness]`;

const NOTES_SLIDE2 = `SAY:
• "Here is what we are aiming for today." Read the Learning Objective aloud: "We will analyse how descriptive language and sensory details are used in a text."
• "And here are the three things that will show us — and you — that you have succeeded." Read each criterion.
• Choral read: "Everyone together — our learning objective is…" [Students respond chorally.]

DO:
• Point to each success criterion as you read it.
• Leave this slide up briefly. Students may mark these in workbooks if required by school protocol.
• Return to this slide at the close of the lesson during Stage 3 review.

TEACHER NOTES:
Sharing explicit success criteria at lesson start activates metacognitive monitoring — students know what the target looks like before they begin. The three criteria are deliberately sequenced: identify (noticing) → explain (reasoning about purpose) → write (applying). This mirrors the GRR sequence: I identify, we explain, you write. Returning to the criteria during closure creates the loop that reinforces what has been learned. VTLM 2.0 element: Making Learning Visible.

[Examining/Creating Lit — Stage 1 | VTLM 2.0: Making Learning Visible]`;

const NOTES_SLIDE3 = `SAY:
• "Before we look at Skellig, let's refresh two key grammar tools — adverb groups and noun groups. These are two of the main resources authors use to build vivid descriptions."
• "An adverb group of place tells us WHERE something happens." Choral read the definition together: "Everyone — an adverb group of place is…"
• "A noun group is a group of words built around a noun." Choral read: "A noun group is a group of words…"
• "Listen to this sentence: 'I watered the healthy, green plant.' What is the noun group? Think, then tell your partner." → Cold Call. Expected answer: 'the healthy, green plant'. Underline on board.
• "Now this one: 'The black cat with the sharp claws scratched her arm.' Two noun groups. Pair-Share — find both." → Call on non-volunteer. Expected: 'The black cat with the sharp claws' and 'her arm'.
• "When authors build longer, richer noun groups and adverb groups, they create detailed pictures in the reader's mind. That's exactly what David Almond does."

DO:
• Display definitions and example sentences. Students do NOT need to copy — this is a reference slide and an oral discussion tool.
• Underline noun groups on your whiteboard or digital board to make the skill visible.

CFU CHECKPOINT:
Technique: Choral Response
Script:
• Read the adverb group definition together before asking students to apply it.
• After noun group choral read: "On your whiteboards — write a noun group for the word 'door'. You have 20 seconds."
• Scan boards. Look for: at least one word before or after the noun 'door' (e.g. 'the old, creaky door', 'the door at the end of the alley').
PROCEED (≥80%): Students write a multi-word noun group with at least one modifier. Proceed to Slide 4.
PIVOT (<80%): Misconception: Students write only the noun alone (e.g. 'door') — they believe a single noun IS a noun group. Reteach: "A noun by itself is just a noun. A noun GROUP has extra words around it. Watch — I'll add words: 'the old door' — now it's a noun group. Try again: add at least one word to 'door'." Re-check with boards up.

MISCONCEPTIONS:
• Misconception: Students confuse adjectives with noun groups, thinking an adjective alone IS the noun group.
  Why: Students have learned 'adjectives describe nouns' and over-apply this, conflating the modifier with the whole group.
  Impact: They will annotate only the adjective in the Skellig passage, missing the full structure — leading to shallow analysis.
  Quick correction: Explain the noun group includes the noun itself plus any words before AND after it. Physically draw a bracket underneath the whole group.
• Misconception: Students confuse adverb groups with adjectives, especially prepositional phrases that precede a noun.
  Why: Phrases like 'in the park' often appear near nouns; students misread spatial context as description of the noun rather than the verb.
  Impact: In annotation tasks, students will mislabel adverb groups as adjectives or noun group modifiers.
  Quick correction: Apply the test — "Does it tell us WHERE or WHEN the action happened? Then it's an adverb group. Does it describe a person or thing? Then it's part of a noun group."

WATCH FOR:
• Students who write only an adjective (e.g. 'old') without the noun — prompt: "Where's the noun?"
• Students who include the verb in the noun group — remind: "The noun group is the person or thing, not the doing."

[Examining Lit — Stage 1 | VTLM 2.0: Metalinguistic Awareness]`;

const NOTES_SLIDE4 = `SAY:
• "As well as noun groups and adverb groups, authors use sensory details — language that appeals to our five senses — to make settings feel real and immediate."
• "Look at this list. These are the five senses and some vocabulary an author might choose. As I read through each sense, I want you to think: which of these words could David Almond use to describe a dark, crumbling garage?"
• Work through each row. Pause at smell: "Can you think of other smell words that might suit a neglected, rotting space?" Pair-Share. Expected: musty, damp, stale, putrid, mouldy.
• "This is a reference list. When you write your own description later, come back to it."

DO:
• Leave this slide visible while students brainstorm — it is a resource, not a delivery slide.
• You may annotate digitally — circle or highlight 2-3 words per sense that feel most appropriate to the Skellig garage setting.

MISCONCEPTIONS:
• Misconception: Students believe 'sensory language' means 'adjectives that sound nice' — they equate any descriptive adjective with sensory detail.
  Why: Students conflate 'descriptive' with 'sensory'. Not all descriptive language is sensory — 'large', 'important', 'good' describe without engaging the senses.
  Impact: In annotation tasks, students label non-sensory adjectives as sensory details, weakening analysis precision.
  Quick correction: Apply the sense test: "Which physical sense does this word activate in the reader's body? If none, it's not a sensory detail." Demonstrate: 'important' (no sense) vs. 'thunderous' (hearing) vs. 'gritty' (touch).
• Misconception: Students conflate sensory language and simile, thinking similes are the only form of sensory detail.
  Why: Similes ('smelled like a garbage dump') are the most memorable sensory examples from teaching sequences.
  Impact: Students miss single-word sensory vocabulary in annotation tasks.
  Quick correction: Model a sentence with a single sensory adjective that contains no simile: 'The musty air clung to his clothes.' "Which sense? Smell. No simile — just a precise word choice."

WATCH FOR:
• Students who only list simile examples during brainstorm — broaden: "Can you find a single word instead of a comparison?"
• Students who list colour words only under 'sight' — prompt: "What else can we see? Movement? Light? Shadow?"

[Examining Lit — Stage 2 | VTLM 2.0: Metalinguistic Awareness]`;

const NOTES_SLIDE5 = `SAY:
• "Now let's put those tools to work on a real text. I'm going to show you a description of a garage setting — not from Skellig, but one I've prepared. Watch me as I read it and identify the sensory language."
• Read model text aloud slowly and expressively. "The garage smelled like a garbage dump — which sense? Smell — good. And felt as hot as an oven — which sense? Touch. The dust cloud made it hard to see anything — sight."
• "Notice that in just two sentences, the author hits THREE senses. That layering of the senses is what makes a setting feel immersive."
• Ask: "What do you notice about the verbs? 'Smelled', 'felt', 'made it hard to see' — these are sensing verbs. The author uses verb groups to carry the sensory information, not just adjectives."
• Pair-Share: "With your partner, try to add one more sentence that appeals to a fourth sense — sound or taste. You have 60 seconds."

DO:
• Display both left and right panels together. Left panel = what students are looking FOR. Right panel = where they look.
• During Pair-Share, circulate and listen. Collect 2-3 strong sentences to share back with the class.

CFU CHECKPOINT:
Technique: Cold Call
Script:
• After Pair-Share: Cold call 2-3 pairs. "Tell us your extra sentence and name the sense."
• Scan for: does the sentence contain a sensing word (a word that activates a specific physical sense in the reader)?
PROCEED (≥80%): Pairs produce a plausible sensory sentence with a named sense. Move to Slide 6 (Chapter 3 vocabulary).
PIVOT (<80%): Misconception: Students add sentences with descriptive adjectives but no sense activation (e.g. 'The garage was very messy'). Reteach: "Close your eyes. If I said 'very messy', what do you experience in your body? Nothing physical — it's an idea, not a sensation. Now: 'I could smell rotting wood and damp concrete' — what do you experience? Smell. That's the difference." Re-check: "Now try again with eyes closed — describe what a character walking in would physically sense."

TEACHER NOTES:
The modelling slide is the core of GRR Stage 1 (I Do). The teacher is making the invisible thinking visible: they are narrating the cognitive process of identifying sensory language, not just pointing at it. The Pair-Share extension pushes students to immediately apply the concept in oral form (low-stakes practice before writing). VTLM 2.0 element: Explicit Teaching — worked example with think-aloud.

[Examining Lit — Stage 2 | VTLM 2.0: Explicit Teaching / Think-Aloud]`;

const NOTES_SLIDE6 = `SAY:
• "Before we read Chapter 3, there are three words in the text that I want to make sure we all understand. When you encounter an unfamiliar word while reading, it can pull you out of the story — so we'll build these into our vocabulary now."
• Work through each term: Bluebottles → "A type of fly, shiny and blue-green, often found around decaying matter — rotting food, dead animals. What does that tell us about the garage if there are bluebottles there?"
• Clogging → "To clog means to block or fill so that movement stops. Imagine your nose 'clogging' in a dusty space. What does this word suggest about the level of dust in the garage?"
• Nettles → "Nettles are rough, stinging plants that grow in neglected gardens and waste ground. Their presence tells us this space is overgrown and uncared for."
• "As I read aloud, when you hear one of these words, raise your hand briefly — just so I know you noticed it."

DO:
• Keep this slide up throughout the brief vocabulary discussion.
• Students do not copy — this is a listen and discuss moment.
• Transition directly from this slide to the read aloud of Chapter 3. Have your own marked copy ready.

TEACHER NOTES:
Pre-teaching vocabulary before a read aloud reduces cognitive load during the reading itself. Students do not have to pause to decode unfamiliar words — their working memory is freed for comprehension and enjoyment. The three words are also rich in connotation: they all signal neglect, decay, and abandonment — which connects to the themes of the novel. VTLM 2.0 element: Vocabulary — building semantic and contextual understanding before encountering text.

[Examining Lit — Stage 2 | VTLM 2.0: Vocabulary]`;

const NOTES_SLIDE7 = `SAY:
• "Now I am going to show you HOW to annotate a passage. Watch exactly what I do and listen to my thinking — because in a moment you will do the same thing."
• "We're going to read the first six lines of our passage together. Everyone track on your A4 copy as I read." [Choral read first 6 lines together.]
• "Now I'm going to annotate. Watch me write on this A3 copy."
• Think aloud for each example in the right panel:
  - "'Something little and black' — I'm labelling this NOUN GROUP because it's a group of words building on the noun — the creature. It describes what the character sees."
  - "'Creaked and cracked' — I'm labelling these VERB GROUPS. I can almost hear the sound — these are auditory words. The repetition of the 'cr' sound makes the noise feel sharp."
  - "'Felt spiderwebs breaking on my brow' — I'm labelling this TOUCH — it's a sensory detail. I can feel that sensation. The author chose 'brow' not 'forehead' — older, more evocative word."
  - "'Through the flashlight beam' — I'm labelling this ADVERB GROUP OF PLACE. It tells me WHERE the dust poured. Without this detail, we'd just have dust — but now we can picture the beam of light lit up by the dust."
• "Now: the word 'poured'. Why 'poured' and not 'floated' or 'drifted'? Pair-Share." Expected: 'poured' implies volume, weight, density — a lot of dust, pressing down.

DO:
• Distribute A4 passage copies NOW if not already done.
• Use an A3 annotated copy or digital projection — physically write on it in front of students.
• Circulate briefly during Pair-Share on 'poured'.

TEACHER NOTES:
This is the core I Do phase of annotation. Making the cognitive process audible — narrating WHY a label applies, not just WHAT the label is — is the defining feature of effective modelling for close reading. Students must hear the analytical reasoning: "I am choosing this label because…" Annotation is a skill, not a product — the labelling gesture itself teaches students to pause and commit to an interpretation. VTLM 2.0 element: Explicit Teaching — Gradual Release of Responsibility, I Do phase.

[Examining Lit — Stage 2 | VTLM 2.0: Explicit Teaching / Modelling]`;

const NOTES_SLIDE8 = `SAY:
• "Now it is your turn to try. Read the remaining lines of the passage with your partner — read it aloud between you."
• "Then work through these three questions together. You have 5 minutes. Use the annotation key from the previous slide."
• Circulate and listen. Identify pairs who have interesting examples to share. Note misconceptions to address.
• After 5 minutes: Cold Call. "Jamie — which noun group did you find and what does it describe?" [Expected: rich examples from the passage.]
• "Aisha — which verb group did you find? What action, process or sense does it convey?" Then: "Does anyone agree? Disagree? Why?"
• "Marcus — which sensory detail? Which sense?" Push for explanation: "How do you know it's that sense?"

DO:
• Keep Annotation Key (Slide 7) available on a second screen or leave it accessible for reference.
• During circulating, prompt students using: "I am highlighting this because it is an example of a [blank] and it describes [blank]. As a reader, it helps me to [blank]."
• Call on NON-volunteers for at least 2 of the 3 questions. Use Cold Call — not hands up.

CFU CHECKPOINT:
Technique: Cold Call
Script:
• Cold call 3 different students — one per question.
• Probe: "Can you say more about that? What did the author want the reader to experience?"
• Scan for: is the student naming the feature type AND explaining its purpose/effect?
PROCEED (≥80%): Students can name the feature and offer a brief purpose statement. Move to Slide 9.
PIVOT (<80%): Misconception: Students name features without explaining purpose (e.g. "this is a noun group" with no further comment). Reteach: Use the stem — "As a reader, this makes me feel/picture/hear/sense... because the word [blank] creates the impression of [blank]." Provide the stem visibly on the board. Re-check: "Now use the stem to explain your example again."

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Student identifies and labels ONE type of feature only (e.g. noun groups only). Teacher or partner provides the label ('noun group') and student copies it above the phrase and explains it orally rather than in writing.
• Rationale: Reduces the cognitive demand of holding multiple categories simultaneously. Narrating first externalises the thinking before committing to annotation marks.
• Learning Progression Step: VC2E6LY08 — comprehension strategies (visualising, connecting, monitoring) applied to specific text evidence.
EXTENDING PROMPT:
• Task: Student annotates AND writes a short evaluative comment for each feature explaining its effect on the reader's experience (e.g. "The phrase 'creaked and cracked' creates auditory tension because…").
• Rationale: Moves beyond identification into literary evaluation — appropriate for students working toward VC2E6LE02 (comparing language choices for effect).
• Learning Progression Step: VC2E6LE02 — compare language choices, modality, emphasis; justify interpretation with evidence.

TEACHER NOTES:
Guided annotation (We Do phase) requires teachers to resist the urge to hover and correct immediately — allow productive struggle before intervening. The three questions are structured to target the three main annotation categories, ensuring breadth of coverage. Cold Call on all three questions ensures accountability and also allows the teacher to diagnose which category is weakest. VTLM 2.0 element: Guided Practice — GRR We Do phase.

[Examining Lit — Stage 2 | VTLM 2.0: Guided Practice / We Do]`;

const NOTES_SLIDE9 = `SAY:
• "Now we're going to move from reading like a writer to WRITING like a writer. We've analysed how David Almond describes the garage. Now I'm going to write my own description of that same setting — and I want you to watch my thinking."
• Think aloud as you write each sentence on the board:
  - "My plan says I want an adverb group of place to open with — so I'll start: 'The floorboards creaked as I stepped slowly into...' — I need an adverb group telling me where. 'Into the crumbling garage.'"
  - "Now a sensory detail for smell: 'A musty, damp smell of decay hung heavily in the air' — I've got touch too because it 'hung heavily' — that weight, that sense of it pressing down."
  - "Now touch: 'A cold draft brushed against my skin.' Short sentence — the shortness creates a moment of pause, a small shock."
  - "And now I want a vivid noun group for something I see: 'a large, black rat' — the noun group signals size and colour before we even get to the noun. Then a precise verb: 'scuttled' — not ran, not moved. Scuttled. Why scuttled? It's hurried, low to the ground, unsettling."
• After completing the paragraph: "Pair-Share — find one example of descriptive language in my paragraph and name its type."

DO:
• Write the model paragraph on the board/whiteboard as you think aloud — do NOT pre-type it; the act of composing in real time models the writing process.
• Right card shows the completed paragraph as a reference — reveal it once you have finished writing live.

TEACHER NOTES:
Live think-aloud composition is significantly more powerful than showing a pre-written model. Students see that writing involves decision-making, reconsideration, and deliberate word choice. The left card (the plan) and right card (the output) make the bridge from planning to composition explicit. The focus on a specific verb ('scuttled') models lexical precision and the habit of asking 'why this word?' VTLM 2.0 element: Explicit Teaching — Live Modelled Writing.

[Creating Lit — Stage 2 | VTLM 2.0: Explicit Teaching / Live Modelled Writing]`;

const NOTES_SLIDE10 = `SAY:
• "Now it's your turn — but we're doing it together at first. Your task is to write a paragraph describing the Skellig garage using descriptive language and sensory details."
• "First step — choose 2 or 3 senses to focus on. Don't try to do all five in one paragraph — that becomes overwhelming. Jot down 3-4 words for each sense you've chosen."
• "Pair-Share your word choices before you write — tell your partner one sentence aloud first. If it sounds right, write it. If it doesn't, adjust it."
• "Read your paragraph aloud to yourself when you finish. If a sentence sounds flat or repetitive, that's a signal to add a more precise verb or a richer noun group."
• After 8-10 minutes: "Call on non-volunteers to read. After each reading: class, name one type of descriptive language or sensory detail you heard."

DO:
• Circulate constantly during this phase. Use these prompts:
  - "What can your character smell as they walk in? What's the first word that comes to mind?"
  - "You've used 'big' — can you make that into a noun group? What kind of big? What does it look like exactly?"
  - "Read that sentence back to me. Does the verb give us enough information?"
• Enable: write one sentence at a time; share each before writing the next.
• Extend: write a CONTRASTING description of the same garage — one that feels welcoming, or busy with creative hobbies — using the same features to create a completely different mood.

CFU CHECKPOINT:
Technique: Cold Call (non-volunteer)
Script:
• Ask a non-volunteer to read their paragraph aloud.
• Ask the class: "Which sensory detail did you find most effective? Why?"
• Probe: "Can you point to the specific word that created that effect?"
PROCEED (≥80%): Students read paragraphs that contain at least two identifiable language features and one sensory detail. Proceed to Slide 11.
PIVOT (<80%): Misconception: Student paragraphs are lists of adjectives without sensory grounding ('The garage was dark and old and dirty'). Reteach: Return to the model paragraph. "In my model, every sentence has a verb group doing work — 'creaked', 'hung', 'brushed', 'scuttled'. Adjectives alone don't create sensation. Find your most important sentence and give it a stronger verb." Re-check: pair shares revised sentence.

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Student writes two separate sentences — one containing only an adverb group of place, one containing only a sensory detail. Sentence structures can be borrowed and adapted from the model paragraph (e.g. "A [adjective] smell of [noun] [verb] in the [noun group].")
• Rationale: Reduces multi-feature cognitive load by isolating one target feature per sentence. Borrowed sentence structures reduce composition demand while maintaining focus on the target language feature.
• Learning Progression Step: VC2E6LE05 — create texts adapting literary texts; experiment with vocabulary.
EXTENDING PROMPT:
• Task: Write a contrasting paragraph describing the same garage as welcoming (e.g. a grandfather's workshop full of tools and sawdust and warmth) using the same categories of language features — noun groups, adverb groups, sensory details — but with vocabulary choices that produce a completely different emotional effect. Include a reflection sentence: "I changed [word] to [word] because…"
• Rationale: Demonstrates explicit understanding that word CHOICE, not feature TYPE, creates mood — the insight at the core of VC2E6LE02.
• Learning Progression Step: VC2E6LE02 — compare language choices for emphasis and effect; VC2E6LE05 — experiment with vocabulary.

TEACHER NOTES:
This slide is the GRR 'We Do → You Do' bridge. The Pair-Share-before-writing protocol (oral composition before handwriting) reduces cognitive overload: students rehearse their sentence structure orally, receive immediate feedback from a partner, then commit it to paper with more confidence. This is particularly important for students with working memory challenges or reluctant writers. VTLM 2.0 element: Gradual Release of Responsibility — scaffolded independent practice.

[Creating Lit — Stage 2 | VTLM 2.0: Guided/Independent Practice]`;

const NOTES_SLIDE11 = `SAY:
• "Before we move to your independent task, let's do a quick check. I want to see what you understand about noun groups — because this is one of the features you MUST include in your own writing."
• "On your Show Me Board: write ONE noun group from YOUR paragraph that you've just written. Then underline the noun inside it. Then label it with the letters NG."
• "Boards up in 3, 2, 1 — Show Me!"
• Scan the room. "I can see some great examples. [Name] — read yours aloud. What's the noun? What words expand it before or after?"

DO:
• This is a formative checkpoint — use it diagnostically, not judgementally.
• Scan for: does the student write a noun group (multiple words including a noun with at least one modifier) OR do they write just a noun alone?
• Address any visible confusion immediately before releasing to independent writing.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
• "Write ONE noun group from your paragraph. Underline the noun. Write NG above it."
• "Boards up — Show Me!"
• Scan specifically for: (a) multiple words present, (b) a clear noun underlined, (c) modifiers before or after the noun.
PROCEED (≥80%): Students show multi-word noun groups with the noun clearly identified. Proceed to Slide 12.
PIVOT (<80%): Misconception: Students write a single noun or an adjective alone. Reteach: "A noun group must have the noun PLUS at least one extra word. Watch: 'garage' is a noun. 'The dark, crumbling garage' is a noun group. Find your noun and build outward from it — add a word before it and a word after it." Re-check: repeat boards up after 30 seconds.

TEACHER NOTES:
Show Me Boards are ideal here because they make noun group structure immediately visible. The teacher can simultaneously assess whether students understand the concept AND check that the features are present in the student's own writing — two birds with one stone. The instruction to underline the noun forces students to locate the head of the group, which is the key metalinguistic understanding. VTLM 2.0 element: Formative Assessment / Check for Understanding.

[Creating Lit — Stage 2 | VTLM 2.0: Formative Assessment]`;

const NOTES_SLIDE12 = `SAY:
• "Excellent. Now for your independent task. This is your chance to apply everything from today — on your OWN setting, in your OWN words."
• "Step one: choose your setting. If you are unsure, look at the images on screen — these are just prompts, you can choose any setting you know well."
• "Step two: write your paragraph. You must include noun groups, adverb groups of place, and at least THREE sensory details. Aim for at least five sentences."
• "Step three: when you finish, read it to your partner. Tell them which sensory detail you think is most powerful, and WHY you made that choice."
• After writing time: "Non-volunteers: read your paragraph to the class. Class: listen for sensory details — which one is most vivid for you?"

DO:
• Project 2 setting images on screen to support students who struggle to visualise a setting independently.
• Circulate and prompt:
  - "Which senses has your character experienced so far? Can you add one more?"
  - "Is that a noun group or just a noun? What words can you add to it?"
  - "Read that sentence aloud. Does the verb give us enough information about HOW it happened?"
• Enable: use prompt questions to scaffold students orally before they write. Focus on one sense at a time: "Tell me what your character smells when they walk in."
• Extend: two contrasting paragraphs — same setting, different mood (e.g. a beach where someone is afraid of water vs. a beach where someone is relaxed and at home). Students write a reflection: "I changed these language choices because..."

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Student verbally describes their setting to the teacher or a support partner (using 5-senses prompts) before writing. They write one sentence per sense rather than a continuous paragraph. Sentence stems provided: "When I walked in, I could smell…" / "I reached out and felt…" / "All I could hear was…"
• Rationale: Oral composition before writing reduces the dual demand of composition and transcription. Sentence-level targets with stems give structure without removing the student's authorial choices.
• Learning Progression Step: VC2E6LE05 — create texts experimenting with vocabulary; VC2E6LY08 — monitoring and comprehension strategies applied to own writing.
EXTENDING PROMPT:
• Task: Write two contrasting descriptive paragraphs about the SAME setting designed to create opposite emotional responses. Annotate each paragraph with labels (NG, AG, SENSE). Then write a 2-3 sentence reflection: "I created a [mood] atmosphere by choosing [example] instead of [alternative] because…"
• Rationale: Requires students to consciously manipulate language choices to produce a target effect — this is the highest-order application of VC2E6LE02 (compare language choices for emphasis and effect).
• Learning Progression Step: VC2E6LE02 — language choices, emphasis; VC2E6LE05 — experiment with vocabulary and literary devices.

TEACHER NOTES:
This is the GRR You Do phase — fully independent application. The task is authentic (students write about a known setting, not a prescribed one) which increases motivation and the quality of sensory detail (students have genuine experiential knowledge to draw on). The partner share-back builds oral language and metalinguistic reflection simultaneously. Anecdotal notes taken during this phase against the success criteria form the formative assessment record for the lesson. VTLM 2.0 element: Independent Practice — authentic task with structured accountability.

[Creating Lit — Stage 3 | VTLM 2.0: Independent Practice]`;

const NOTES_SLIDE13 = `SAY:
• "Let's close today with a reflection. A volunteer — and then a non-volunteer — will share their setting description with the class."
• "After each reading, I want you to think: which sensory detail is most powerful for you — and WHY did the author choose it? Not just 'I liked it' — WHY is it effective?"
• Return to LO: "We said today we would analyse how descriptive language and sensory details are used in a text. Let's check against our success criteria: thumbs up if you can identify descriptive language in a text. Thumbs up if you can explain its purpose. Thumbs up if you wrote your own description."
• "Our three takeaways: look up and read each one with me."

DO:
• Take anecdotal notes during student shares — note examples of strong sensory language or noun groups against names for your records.
• If time allows, invite students to share one word they are most proud of from their writing and explain their choice.
• Before dismissing: "Tomorrow we will continue building our understanding of how David Almond creates the character of Skellig — so hold onto your images from today's reading."

TEACHER NOTES:
The closing slide connects the reflective Turn-and-Talk to the lesson's success criteria, completing the learning loop opened in Slide 2. Asking students to evaluate which sensory detail is 'most powerful' and explain WHY shifts the cognitive demand from recall to evaluation — the top of Bloom's Taxonomy. The three takeaways are deliberately phrased as principles students can transfer to any text or writing task. Collecting anecdotal notes now (not after the lesson) ensures assessment is captured against actual student performance. VTLM 2.0 element: Consolidation — reflection and transfer.

[Examining/Creating Lit — Stage 3 | VTLM 2.0: Consolidation / Review]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build function
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  if (!fs.existsSync("output")) fs.mkdirSync("output");

  const pres = new pptxgen();
  pres.layout  = "LAYOUT_16x9";
  pres.author  = "Claude";
  pres.title   = "Skellig — Lesson 3: Analysing Descriptive Language and Sensory Details";

  // Pre-render icons
  const icons = {
    book:    await iconToBase64Png(FaBookOpen,    "#FFFFFF", 256),
    pen:     await iconToBase64Png(FaPen,          "#FFFFFF", 256),
    search:  await iconToBase64Png(FaSearch,       "#FFFFFF", 256),
    feather: await iconToBase64Png(FaFeatherAlt,   "#FFFFFF", 256),
    pencil:  await iconToBase64Png(FaPencilAlt,    "#FFFFFF", 256),
    eye:     await iconToBase64Png(FaEye,          "#FFFFFF", 256),
    bulb:    await iconToBase64Png(FaLightbulb,    "#C9A84C", 256),
  };

  // ── Slide 1 — Title ────────────────────────────────────────────────────────
  titleSlide(
    pres,
    "Skellig: Analysing Descriptive Language and Sensory Details",
    "Novel Study — Year 5/6 Literacy",
    "Lesson 3 of 25",
    NOTES_SLIDE1
  );

  // ── Slide 2 — Learning Objective & Success Criteria ───────────────────────
  liSlide(
    pres,
    ["We will analyse how descriptive language and sensory details are used in a text."],
    [
      "I can identify descriptive language and sensory details in a text.",
      "I can explain the purpose of descriptive language and sensory details in a text.",
      "I can write a description of a setting using descriptive language and sensory details.",
    ],
    NOTES_SLIDE2,
    FOOTER
  );

  // ── Slide 3 — Grammar Revision: Adverb Groups & Noun Groups ───────────────
  contentSlide(
    pres,
    "Stage 1",
    C.SLATE,
    "Grammar Revision: Adverb Groups & Noun Groups",
    [
      "Adverb group of place: a word or group of words that describes WHERE someone does something or WHERE something happens.",
      "Example: \"The children played happily in the park.\" → adverb group of place = \"in the park\"",
      "Noun group: a group of words built around a noun — includes words before the noun (articles, adjectives) and after the noun (phrases, clauses).",
      "Example 1: \"I watered the healthy, green plant.\" → noun group = \"the healthy, green plant\"",
      "Example 2: \"The black cat with the sharp claws scratched her arm.\" → noun groups = \"The black cat with the sharp claws\" and \"her arm\"",
      "Both features expand and express ideas — they build vivid pictures in the reader's mind.",
    ],
    NOTES_SLIDE3,
    FOOTER,
    (slide) => {
      // Right column: icon visual anchor
      const cx = 7.8, cy = 2.65, r = 0.38;
      slide.addShape("roundRect", {
        x: cx - r, y: cy - r, w: r * 2, h: r * 2, rectRadius: r,
        fill: { color: C.SLATE },
      });
      slide.addImage({ data: icons.search, x: cx - 0.32, y: cy - 0.32, w: 0.64, h: 0.64 });
      slide.addText("Look for structure", {
        x: 6.4, y: cy + 0.25, w: 2.8, h: 0.36,
        fontSize: 11, fontFace: FONT_B, color: C.SLATE, align: "center",
        bold: true, margin: 0,
      });

      // Small example boxes
      const ex = [
        { label: "NOUN GROUP",   color: C.MIDNIGHT, y: 3.35 },
        { label: "ADVERB GROUP", color: C.SLATE,    y: 3.90 },
      ];
      ex.forEach(({ label, color, y }) => {
        slide.addShape("roundRect", {
          x: 6.1, y, w: 3.2, h: 0.38, rectRadius: 0.08,
          fill: { color },
        });
        slide.addText(label, {
          x: 6.1, y, w: 3.2, h: 0.38,
          fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
      });
    }
  );

  // ── Slide 4 — The Five Senses in Writing ──────────────────────────────────
  contentSlide(
    pres,
    "Sensory Details",
    C.MIDNIGHT,
    "The Five Senses in Writing",
    [
      "Sight — dazzling, vivid, shimmering, hazy, blurred, shadowy, flickering",
      "Sound — muffled, thunderous, tapping, cacophonous, scraping, whispering",
      "Smell — fragrant, pungent, putrid, musty, damp, stale, earthy",
      "Taste — tangy, sour, bitter, acrid, metallic, nauseating",
      "Touch — feathery, prickly, silky, rough, slippery, jagged, clammy",
      "Sensory detail: words that help readers EXPERIENCE a scene through the senses — not just understand it.",
      "Sense test: which physical sense does this word activate in the reader's body?",
    ],
    NOTES_SLIDE4,
    FOOTER,
    (slide) => {
      // Right column: five sense icons in coloured circles
      const senses = [
        { icon: icons.eye,     color: C.MIDNIGHT, label: "Sight",  cy: 1.55 },
        { icon: icons.bulb,    color: C.AMBER,    label: "Sound",  cy: 2.15 },
        { icon: icons.feather, color: C.SAGE,     label: "Smell",  cy: 2.75 },
        { icon: icons.pen,     color: C.SLATE,    label: "Taste",  cy: 3.35 },
        { icon: icons.pencil,  color: C.CRIMSON,  label: "Touch",  cy: 3.95 },
      ];
      const cx = 6.55, r = 0.26;
      senses.forEach(({ icon, color, label, cy }) => {
        slide.addShape("roundRect", {
          x: cx - r, y: cy - r, w: r * 2, h: r * 2, rectRadius: r,
          fill: { color },
        });
        slide.addImage({ data: icon, x: cx - 0.22, y: cy - 0.22, w: 0.44, h: 0.44 });
        slide.addText(label, {
          x: 6.95, y: cy - 0.16, w: 1.4, h: 0.32,
          fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL,
          bold: true, valign: "middle", margin: 0,
        });
      });
    }
  );

  // ── Slide 5 — Modelling: Reading the Garage Setting ───────────────────────
  modellingSlide(
    pres,
    "I Do — Watch Me",
    "Reading the Garage Setting",
    // Left card
    "What to look for:\n\n• Noun groups\n  (who or what is described?)\n\n• Verb groups\n  (what is happening or being sensed?)\n\n• Adverb groups of place\n  (where does it happen?)\n\n• Sensory details\n  (sight, smell, touch, sound, taste)",
    // Right card — model text + question
    "\"The garage smelled like a garbage dump and felt as hot as an oven. The dust cloud made it hard to see anything.\"\n\n— Which senses does the author use? How do you know?\n\n— What verb groups carry the sensory information?\n\n— Try: add one sentence for a FOURTH sense.",
    NOTES_SLIDE5,
    FOOTER
  );

  // ── Slide 6 — Chapter 3 Read Aloud: Key Vocabulary ───────────────────────
  contentSlide(
    pres,
    "Chapter 3",
    C.MIDNIGHT,
    "Chapter 3 Read Aloud — Key Vocabulary",
    [
      "Bluebottles — a type of fly, shiny and blue-green, often found near decaying matter (rotting food, dead animals). Signals neglect and decay.",
      "Clogging — blocking or stopping something so it cannot move or flow. Suggests the dust or grime is thick and heavy enough to obstruct.",
      "Nettles — rough, stinging plants that grow in neglected gardens and waste ground. Their presence signals the space is overgrown and uncared for.",
      "As you listen: raise your hand briefly each time you hear one of these words in the text.",
    ],
    NOTES_SLIDE6,
    FOOTER,
    (slide) => {
      // Right column: icon + visual
      const cx = 7.8, cy = 3.0, r = 0.40;
      slide.addShape("roundRect", {
        x: cx - r, y: cy - r, w: r * 2, h: r * 2, rectRadius: r,
        fill: { color: C.MIDNIGHT },
      });
      slide.addImage({ data: icons.book, x: cx - 0.34, y: cy - 0.34, w: 0.68, h: 0.68 });
      slide.addText("Read Aloud", {
        x: 6.55, y: cy + 0.32, w: 2.5, h: 0.36,
        fontSize: 11, fontFace: FONT_B, color: C.MIDNIGHT, align: "center",
        bold: true, margin: 0,
      });

      // Chapter reference pill
      slide.addShape("roundRect", {
        x: 6.2, y: 4.15, w: 3.1, h: 0.40, rectRadius: 0.08,
        fill: { color: C.GOLD },
      });
      slide.addText("Chapter 3, pages 6–7", {
        x: 6.2, y: 4.15, w: 3.1, h: 0.40,
        fontSize: 11, fontFace: FONT_B, color: C.MIDNIGHT, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
    }
  );

  // ── Slide 7 — Modelling: Close Reading Annotation (Lines 1–6) ─────────────
  modellingSlide(
    pres,
    "I Do — Watch Me",
    "Close Reading: Annotating the Passage (Lines 1–6)",
    // Left card
    "Annotation key:\n\n[NOUN GROUP]\n— label the group of words\n\n[VERB GROUP]\n— label the doing/sensing word(s)\n\n[ADVERB GROUP]\n— label where/when\n\n[SENSE]\n— name it: sight / sound / touch / smell / taste",
    // Right card — annotated examples
    "• 'something little and black'\n  [NOUN GROUP — creature in the garage]\n\n• 'creaked and cracked'\n  [VERB GROUPS — sound of the door]\n\n• 'felt spiderwebs breaking on my brow'\n  [TOUCH — sensation on the face]\n\n• 'through the flashlight beam'\n  [ADVERB GROUP OF PLACE — where the dust poured]",
    NOTES_SLIDE7,
    FOOTER
  );

  // ── Slide 8 — Pair-Share: Annotate the Remaining Passage ─────────────────
  pairShareSlide(
    pres,
    "Annotate the Remaining Passage",
    [
      "Find ONE example of a noun group in the remaining lines. What does it describe — a person, a creature, or a thing?",
      "Find ONE example of a verb group. What action, process or sense does it convey? Why did the author choose that verb?",
      "Find ONE example of sensory detail. Which sense does it appeal to? What does the author want the reader to experience?",
    ],
    NOTES_SLIDE8,
    FOOTER
  );

  // ── Slide 9 — Modelling: Writing a Descriptive Scene ─────────────────────
  modellingSlide(
    pres,
    "I Do — Watch Me",
    "Writing a Descriptive Scene: The Garage",
    // Left card — planning notes
    "My plan:\n\n• Adverb group of place:\n  where things happen\n\n• Noun group:\n  what I can see (with precision)\n\n• Verb group:\n  what is happening (precise verb)\n\n• Sensory detail:\n  smell, touch, sound\n\n• Short sentence for impact",
    // Right card — model paragraph
    "\"The floorboards creaked as I stepped slowly into the crumbling garage. A musty, damp smell of decay hung heavily in the air, sending shivers down my spine. A cold draft brushed against my skin. I gasped in fright as a large, black rat scuttled across the filthy floor.\"\n\n— Find: one noun group, one adverb group, one sensory detail.",
    NOTES_SLIDE9,
    FOOTER
  );

  // ── Slide 10 — Task: Write Descriptive Paragraph — The Garage ─────────────
  taskSlide(
    pres,
    "We Do → You Do",
    "Write Your Descriptive Paragraph — The Garage",
    [
      {
        label: "First",
        instruction: "Choose 2–3 senses to focus on. Jot down words and phrases that capture those sensory details — use the Slide 4 vocabulary list as a reference.",
      },
      {
        label: "Next",
        instruction: "Write your paragraph including: at least one noun group, one adverb group of place, and at least 2 sensory details. Pair-Share one sentence before you write it.",
      },
      {
        label: "Then",
        instruction: "Read your paragraph aloud. Can you replace a weak verb with a more precise one? Can you expand a noun into a richer noun group? Annotate one feature with its label.",
      },
    ],
    NOTES_SLIDE10,
    FOOTER
  );

  // ── Slide 11 — CFU: Show Me Boards — Noun Groups ─────────────────────────
  cfuSlide(
    pres,
    "CFU",
    "Check: Identifying Noun Groups",
    "Show Me Boards",
    "Write ONE noun group from your paragraph on your whiteboard.\nUnderline the noun inside it.\nLabel it   NG   above the phrase.\n\nBoards up in 3… 2… 1… Show Me!",
    NOTES_SLIDE11,
    FOOTER
  );

  // ── Slide 12 — Task: Independent Setting Description ─────────────────────
  taskSlide(
    pres,
    "You Do",
    "Write Your Own Setting Description",
    [
      {
        label: "First",
        instruction: "Choose a setting you know well — treehouse, beach, forest, classroom, campsite — or use one of the setting images on screen if you need a starting point.",
      },
      {
        label: "Next",
        instruction: "Write a short paragraph (at least 5 sentences) using: noun groups, adverb groups of place, and at least 3 sensory details. Remember: strong verbs carry the sensory information.",
      },
      {
        label: "Then",
        instruction: "Read your paragraph to your partner. Explain which sensory detail you think is most powerful and why you chose it. Be ready to share with the class.",
      },
    ],
    NOTES_SLIDE12,
    FOOTER
  );

  // ── Slide 13 — Closing Slide ──────────────────────────────────────────────
  closingSlide(
    pres,
    "Share your setting description. Which sensory detail do you think is most powerful — and why did you choose it?",
    [
      "Noun groups, verb groups and adverb groups help create vivid pictures in the reader's mind.",
      "Sensory details let readers experience a scene through all five senses.",
      "Studying a published author's language choices improves our own writing.",
    ],
    NOTES_SLIDE13
  );

  // ── Write file ─────────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: "output/Lesson_Skellig_3_Descriptive_Language.pptx" });
  console.log("Done: output/Lesson_Skellig_3_Descriptive_Language.pptx");
}

build().catch(console.error);
