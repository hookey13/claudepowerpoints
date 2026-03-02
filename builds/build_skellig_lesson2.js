// Skellig — Lesson 2: Narrative Hooks to Engage the Reader
// Year 5/6 Literacy — Novel Study
// Victorian Curriculum: VC2E6LE03, VC2E6LE05

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
  FaBookOpen, FaPen, FaUsers, FaSearch, FaComments,
  FaFeatherAlt, FaQuoteLeft, FaLightbulb, FaChalkboardTeacher,
  FaCheckCircle, FaStar, FaPencilAlt,
} = require("react-icons/fa");

const FOOTER = "Skellig  |  Lesson 2 of 25  |  Year 5/6 Literacy";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_SLIDE1 = `SAY:
• "Good morning. Today we are going to become detectives — detectives of a writer's craft."
• "You have already met Michael, his family, and the mysterious garage in Chapter 1. Today we dig into HOW David Almond made you want to keep reading."
• "The answer is something called a narrative hook — and by the end of today you will be writing your own."

DO:
• Display the title slide as students settle. Have student copies of Skellig on desks.
• Gesture to the novel cover. "This is a book many of you could not put down. That doesn't happen by accident."

TEACHER NOTES:
This lesson sits at the D — Decide on the Thing phase of the DECIDE framework. The lesson hones in on one precise, teachable literary technique: the narrative hook. Keeping the focus tight (hook only, not all narrative devices) is deliberate CLT management — novice readers cannot simultaneously internalise multiple new devices. The lesson follows a full GRR arc: I Do (modelling with Ch. 2 first sentence) → We Do (analysing Ch. 2 paragraph) → You Do (writing from an image prompt). VTLM 2.0 element: Setting the context and purpose for learning. Victorian Curriculum: VC2E6LE03 — characteristics of literary texts defining author's style.

WATCH FOR:
• Students who read ahead — note this as a teaching opportunity, not a problem.
• Students unfamiliar with the novel — brief orientation to setting and main character in Stage 1.

[Examining/Creating Literature — Stage 1 | VTLM 2.0: Establishing the Learning Environment]`;

const NOTES_SLIDE2 = `SAY:
• "Here is what we are learning today and how we will know we have got there."
• Read the learning objective: "We will learn how authors use narrative hooks to engage the reader."
• Read each success criterion aloud and briefly explain what it looks like: "Identifying means pointing to one and explaining its job. Writing means producing your own, in your own words, starting from an image."
• "These criteria are your checklist. At the end of the lesson I will ask you to decide where you sit on each one."

DO:
• Point to each success criterion as you read.
• Leave the slide visible while students note LO and SC in workbooks if your school protocol requires it.
• Avoid explaining narrative hook in depth here — that comes on the next slide. Let the SC create productive curiosity.

TEACHER NOTES:
Sharing LOs and SC explicitly is a Making Learning Visible strategy (VTLM 2.0). Two SC is appropriate for a 65-minute lesson — one receptive (identify/explain) and one productive (write). The productive SC is assessed formatively via workbook collection at lesson close, matching the DECIDE framework's E — Embed in Long-Term Memory checkpoint. Victorian Curriculum: VC2E6LE03 (identifying characteristics), VC2E6LE05 (creating texts).

WATCH FOR:
• Students who conflate "identify" with "copy out" — clarify: identifying means locating AND explaining the purpose.
• Students who skip SC notation — these students often lack a self-monitoring anchor; prompt them gently.

[Examining/Creating Literature — Stage 1 | VTLM 2.0: Making Learning Visible]`;

const NOTES_SLIDE3 = `SAY:
• "Before we look at Chapter 2, let's warm up our memories of Chapter 1."
• "Turn to your partner. You have 90 seconds. Tell each other: who are the main characters, where are they, and what has happened so far? Go."
• After 90 seconds: "Let's hear from a few people. Who can give me one character and one key event?"
• Cold-call 3–4 students. Build up the shared understanding: Michael → new house → mysterious garage → sick baby sister → something in the garage.

DO:
• Write the key recall items on the board as students call them out — this creates a shared reference students can use during Chapter 2 analysis.
• If a student mentions the creature directly, validate: "Yes — David Almond doesn't actually name what Michael finds. That mystery is part of the hook."

CFU CHECKPOINT:
Technique: Cold Call
Script:
• "Without looking at your book — [student name], who is the main character and where are we at the start of the story?"
• "Thank you. [Next student] — what one event from Chapter 1 do you think is most important for understanding what comes next? Why?"
• Scan for: accurate recall of setting (old run-down house, overgrown garden, forbidden garage), character details (Michael, baby sister, mum and dad preoccupied with baby), and key action (Michael discovers something/someone in the garage).
PROCEED (≥80%): Students can name setting, main character, and at least one significant event → move to Slide 4.
PIVOT (<80%): Misconception: Students may conflate the garage finding with a later event, or forget the baby sister subplot. Reteach: "Let me map Chapter 1 on the board quickly." Sketch a timeline: Move → See garage → Baby unwell → Michael enters garage → Creature. Re-check with: "Thumbs up if you can now place these events in order."

TEACHER NOTES:
Retrieval practice here activates prior knowledge (VTLM 2.0: Activate Prior Knowledge) and reduces the extraneous cognitive load of Chapter 2 analysis — students who can't remember Ch. 1 will struggle to understand WHY Ch. 2 hooks they already have questions. The board notes created here serve as a cognitive anchor for the rest of the lesson. DECIDE framework: D — Decide on the Thing (what prior knowledge is already in place?). VC2E6LE03.

WATCH FOR:
• Students who are dominant in pair discussion — prompt quieter partner: "I want to hear your partner's view too."
• Students who confuse Skellig with other texts — signal to teacher to quietly check in.

[Examining/Creating Literature — Stage 1 | VTLM 2.0: Activate Prior Knowledge]`;

const NOTES_SLIDE4 = `SAY:
• "Now let's build our literary vocabulary for today. Two key terms — both are on your slide."
• Read the narrative hook definition aloud: "A narrative hook appears at the beginning of a story or chapter to capture the reader's attention and make the reader continue reading to find out what happens next."
• Choral response: "Everyone say: narrative hook." Pause. "Say it again."
• Read the first-person narrative voice definition aloud.
• "Now — open your copy of Skellig to Chapter 1, any page. Can you spot where David Almond uses first-person voice? You have 30 seconds — find one example and show your partner."
• Cold-call one pair to share.

DO:
• Keep both definitions on screen throughout this discussion — they are reference material, not narration.
• After students find first-person voice examples, ask: "How does being inside Michael's head make us more curious? How does that BECOME a hook?"
• This question bridges from the definition to the analytical work in Stage 2.

CFU CHECKPOINT:
Technique: Choral Response
Script:
• "Finish this sentence for me: A narrative hook is designed to make the reader…" [Continue reading…]
• Listen for: "want to keep reading" / "continue" / "find out what happens."
• "And first-person voice means the story is told from whose perspective?" [One character's / the narrator's / Michael's.]
PROCEED (≥80%): Students can complete both sentences accurately → move to Slide 5.
PIVOT (<80%): Misconception: Students may say "hook = exciting opening" without understanding the mechanism (creating questions). Reteach: "A hook isn't just exciting — it creates a GAP. The reader knows something but not enough. That gap makes them turn the page." Use analogy: "Like a trailer for a movie — it shows you just enough to make you buy a ticket." Re-check: "So what is the gap in a narrative hook?" [What happens next / unanswered questions.]

TEACHER NOTES:
This slide is the conceptual anchor for the lesson — all subsequent work returns to these two definitions. Displaying them prominently (rather than narrating them and removing the slide) is deliberate: students need to reference the definitions during independent work. CLT note: definitions belong on the slide face because they are reference material, not teacher explanation. This is the DECIDE framework's D — Decide on the Thing: establishing the precise conceptual target before instruction begins. VTLM 2.0 element: Building Vocabulary and Conceptual Understanding. VC2E6LE03.

MISCONCEPTIONS:
• Misconception: Students conflate "narrative hook" with "sizzling start" (a primary school term).
  Why: "Sizzling start" is often taught as a stylistic choice (start with action/dialogue/description) without emphasising the reader-engagement mechanism (creating questions/gaps).
  Impact: Students write hooks that are stylistically exciting but don't actually create curiosity — they tell the reader everything upfront.
  Quick correction: "A sizzling start might use action or dialogue — but the HOOK is the effect it has. Does it make the reader ask a question? If not, it hasn't hooked them yet."

• Misconception: Students think hooks must always be action-based.
  Why: "Start with a bang" advice leads students to default to physical action. Almond's hooks often work through tone, atmosphere, and withholding — not action.
  Impact: Students produce formulaic "suddenly a loud noise!" openings rather than subtle, atmospheric hooks.
  Quick correction: "Read this: 'I nearly went into the garage that day.' Is that action? Not really. But what question does it create?" [What stopped him? Why nearly?]

WATCH FOR:
• Students who write only the definition without engaging with the examples — they need to see the definition applied before it becomes useful.
• Students who cannot locate first-person pronouns in text — flag for support during We Do.

[Examining/Creating Literature — Stage 1 → Stage 2 | VTLM 2.0: Building Conceptual Understanding]`;

const NOTES_SLIDE5 = `SAY:
• "Our first new word for today: lurched."
• "Say it with me: lurched." [Choral response.]
• "Say it again." [Choral response.]
• "Lurched is a verb — it means to suddenly move or sway in an unexpected way."
• "Think of a time when YOU lurched — maybe on a bus that stopped suddenly, or when you tripped. Turn to your partner — 30 seconds — share a time you lurched toward or away from something."
• After 30 seconds: cold-call 2 non-volunteers to share.
• "Now — why might an author use the word 'lurched' rather than 'moved'? What does it tell us about the movement?" [It was sudden, unexpected, uncontrolled — it tells us more about the character's state.]

DO:
• Point to the example sentence on screen. "Notice how the sentence uses lurched to show the bus was sudden and unexpected — the word does a lot of work in one go."
• After the pair-share, write one student's example on the board next to the word "lurched" — this anchors the word in lived experience.

TEACHER NOTES:
Vocabulary instruction here follows the Frayer-adjacent pattern: definition → personal connection → example in context → discussion of author's word choice effect. The choral response for pronunciation is especially important for EAL/D students and those with limited exposure to literary vocabulary. This word will appear in Chapter 2 — activating it before the read-aloud reduces cognitive load during comprehension. DECIDE framework: D — Decide on the Thing (vocabulary is prerequisite knowledge for text analysis). VTLM 2.0 element: Building Background Knowledge. VC2E6LE03.

WATCH FOR:
• Students who produce a definition paraphrase rather than a personal example during pair-share — prompt: "Tell me about YOUR body, not the dictionary."
• Students who are reluctant to volunteer because they've never lurched — prompt with a visual: "Has anyone ever been on a boat or a bus? What happens to your body?"

[Examining/Creating Literature — Stage 1 | VTLM 2.0: Building Background Knowledge — Vocabulary]`;

const NOTES_SLIDE6 = `SAY:
• "Second new word: wilderness."
• "Say it: wilderness." [Choral response.]
• "Wilderness — a noun — means an area of land largely undisturbed by humans."
• "Think about the garden described in Chapter 1 of Skellig. David Almond describes it as overgrown, tangled, full of weeds. Is that a wilderness?" [Yes.]
• "Turn and tell your partner: have you ever explored a wilderness — even a small one? A park, a bush trail, an overgrown backyard?"
• Cold-call 2 non-volunteers.
• "Why might the author use this word to describe the garden rather than 'messy garden'?" [It evokes wildness, nature untamed by humans, signals the setting is mysterious and forgotten.]

DO:
• Gesture back to the board notes from Slide 3. The garden was a recalled detail — now students have the precise word for it.
• If time allows: "How does knowing the garden is a 'wilderness' add to the mystery of the garage?"

TEACHER NOTES:
Wilderness is not just vocabulary — it is world-building vocabulary. Students who can label the setting precisely will write more atmospheric hooks in the independent task. The question "why this word rather than that word?" is a CLT-efficient move: it deepens understanding without adding new slide content, simply by directing attention to author's craft. DECIDE framework: D — Decide on the Thing. VTLM 2.0 element: Building Background Knowledge. VC2E6LE03.

WATCH FOR:
• Students who say the garden is not a wilderness because it is a private garden — use this as a productive discussion: "The word doesn't require it to be a national park. What matters is that humans have stopped tending it. Has it been left to nature? Then Almond is calling it a wilderness."

[Examining/Creating Literature — Stage 1 | VTLM 2.0: Building Background Knowledge — Vocabulary]`;

const NOTES_SLIDE7 = `SAY:
• "Here we go. I am going to read the first sentence of Chapter 2."
• Read aloud with deliberate pacing: "I nearly went into the garage that day."
• Pause. Silence. Let it land.
• "That is a narrative hook. Turn to your partner — 60 seconds — what questions does this sentence create in your mind? What does the word 'nearly' make you wonder?"
• After 60 seconds: cold-call 3–4 non-volunteers. Record questions on the board.
• "Notice: we are INSIDE Michael's head. We know he NEARLY did something — which tells us he didn't. That 'nearly' is doing enormous work. It creates a gap."

DO:
• After collecting student questions, point to 2–3 of the strongest: "Look at this one: [student's question]. Does everyone see how the sentence CREATES that question rather than ANSWERING it? That is the hook doing its job."
• Connect to the definition on Slide 4: "The definition said a hook makes the reader continue reading to find out what happens next. Do you want to find out? That is the hook working."
• Expected student responses: What stopped him? Why only nearly? What's in the garage? Will he go back? Who or what is in there?

TEACHER NOTES:
This is the E — Execute Through Modelling phase (DECIDE framework). The teacher is performing a think-aloud not by narrating privately but by drawing student questions out publicly — a socially-mediated version of modelling analytical thinking. The sentence is deceptively simple; its hook quality comes entirely from the word 'nearly' and the first-person voice. Both features are explicitly named. Reading aloud with pacing models the kind of attentive close reading students will need during We Do. VTLM 2.0 element: I Do — Explicit Modelling. VC2E6LE03, VC2E6LE05.

WATCH FOR:
• Students who say "I nearly went" is boring — this is a productive misconception to address: "That's interesting. It doesn't use action or sound. So why is it a hook?" Push them back to the gap/question mechanism.
• Students who focus only on plot curiosity ("what's in the garage?") without noticing the language — prompt: "What single word creates that question?" [Nearly.]

[Examining/Creating Literature — Stage 2 I Do | VTLM 2.0: Explicit Modelling]`;

const NOTES_SLIDE8 = `SAY:
• "Now I am going to read the first paragraph of Chapter 2 aloud. Your job is to listen like a detective. Use these four questions as your guide — I will leave them on screen."
• Read the first paragraph of Chapter 2 aloud slowly and expressively.
• "Discuss with your partner — work through each question. You have three minutes."
• Circulate and listen to pairs. After 3 minutes: "Everybody — open your workbooks. You have 4 minutes to write your thoughts. Don't copy your partner's — I want YOUR thinking."
• Set a visible 4-minute timer.
• After writing: cold-call non-volunteers on questions 3 and 4 specifically.

DO:
• Set timer visibly (phone, display, or board timer).
• During circulation: note students who are writing confidently — these are candidates for cold-call sharing.
• Note students who are stuck — check they have attempted question 1 (lower threshold) before moving to 3 and 4.
• After sharing: "Did you WANT to keep reading? Hands up if yes." Near-universal hands expected. "That is the hook doing its job."

CFU CHECKPOINT:
Technique: Cold Call
Script:
• "[Student name] — question 3: what do we NEED to know to find out more? What question are you left with?"
• "[Next student] — question 4: did you want to keep reading? Tell me one specific thing in the paragraph that made you want to continue."
• Scan written workbooks (brief circulation) for: responses that identify specific language (not just plot), responses that articulate a question the text creates (not just "I want to know what happens").
PROCEED (≥80%): Students can identify at least one hook element AND explain the question it creates → move to Slide 9 (modelling writing).
PIVOT (<80%): Misconception: Students describe what happens in the paragraph without identifying what is withheld. Reteach: "A hook works by telling you something and NOT telling you something else. Let me show you." Read one sentence from Ch. 2. "What does Almond tell us? [X.] What does he NOT tell us? [Y.] That gap between X and Y — that is the hook." Re-check: "Try question 2 again — what is Almond NOT telling us?"

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Provide the student with a pre-identified hook sentence from the paragraph. Ask only: "What question does this sentence make you ask?" (framework: "This sentence makes me wonder… because the author told me… but didn't tell me…")
• Rationale: Separating identification from analysis reduces the task demand for students who cannot yet locate hooks independently. The ability to reason about a hook's effect is the prerequisite for writing one.
• Learning Progression Step: VC2E6LE02 — discussing how authors use language to create effect (Year 5/6 receptive strand).
EXTENDING PROMPT:
• Task: Rewrite one identified hook to include more sensory details (sounds, actions, smells). Then annotate: "My version hooks the reader because…"
• Rationale: Transforming a found example develops compositional flexibility and metacognitive awareness of craft choices — prerequisite for producing original hooks at text level.
• Learning Progression Step: VC2E6LE05 — experimenting with vocabulary and literary devices in own writing.

MISCONCEPTIONS:
• Misconception: Students list everything that happens in the paragraph as "hooks."
  Why: Without the gap/question mechanism, students default to plot summary.
  Impact: Writing tasks produce engaging-sounding openings that actually over-explain, leaving no mystery.
  Quick correction: "If the paragraph ANSWERED that question, would you still want to keep reading? The hook is not the information — it is the MISSING information."

WATCH FOR:
• Students writing full summaries instead of analytical responses — redirect with "What question are you left with?"
• Students who finish early — prompt with the Extending task.

[Examining/Creating Literature — Stage 2 We Do | VTLM 2.0: Guided Practice]`;

const NOTES_SLIDE9 = `SAY:
• "Now I am going to show you how I would plan and write a narrative hook. Watch me think — I am going to say everything out loud."
• Project the planning scaffold on the left.
• "I am looking at an image of a dark, mysterious space — like an old garage or cellar. First question: what will I TELL my audience? I can see it is dark. Something is moving. I will tell them both those things."
• "Second question: what will I NOT tell them? I will NOT tell them WHAT is moving or WHY."
• "Third question: what will the audience need to know to find out more? Whether the moving thing is dangerous."
• "Now I write. Watch." [Read the modelled hook aloud as though composing it.]
• "Creak! Amongst the pile of filthy things, something shifted in the darkness — a slow movement which sent a chill up my spine."
• "Choral read — everyone, together." [Read it chorally once.]

DO:
• Point to each planning question as you name it — use the left card as a visible scaffold.
• After the choral read: "Which planning question does the word 'something' answer? It tells the reader a THING is there — but 'something' refuses to name it. That is the NOT TELLING working."
• "What question does the last phrase — 'chill up my spine' — create?" [Is it dangerous? What is it?]
• Do NOT erase or advance past this slide before students have read the hook chorally.

TEACHER NOTES:
This is the I Do — Watch Me phase of GRR (VTLM 2.0) and the E — Execute Through Modelling phase of DECIDE. The two-column layout is deliberate CLT design: the left shows the planning scaffold (process), the right shows the product. By keeping both visible simultaneously, students can map process to product — reducing split-attention. The think-aloud makes invisible cognitive processes visible (what to tell / not tell / withhold). The choral read embeds the modelled text in short-term memory, giving students an exemplar to compare against their own writing. VC2E6LE05.

WATCH FOR:
• Students who copy the modelled hook word-for-word in their own task — this is copying, not applying. Address during You Do by prompting: "Use the planning questions to make YOUR version — not mine."
• Students who cannot identify what the hook withholds — return to Slide 4 definition and the "gap" language.

[Examining/Creating Literature — Stage 2 I Do | VTLM 2.0: Explicit Modelling — Think Aloud]`;

const NOTES_SLIDE10 = `SAY:
• "Now it is your turn to plan — but not write yet. We are going to plan together first, then you will write independently."
• "Think about Image 1 — the dark space. Use the three questions on screen."
• "Turn to your partner. Question 1: what will you TELL your audience? 45 seconds — go."
• Cold-call 2 pairs to share question 1 answers. Write best examples on board.
• "Now question 2: what will you NOT tell? 45 seconds." Cold-call 2 pairs.
• "Finally — question 3: what does the audience NEED to know to find out more?" Cold-call 2 pairs.
• "Quick write — in your workbook, draft your own hook for Image 1. You have 3 minutes."
• After 3 minutes: pair-share drafts, then cold-call one student to share with the class. Write it on the board.

DO:
• Prompt discussion: "Does [student's hook] create a gap? What question does it leave the reader with?"
• If the student response doesn't create a gap: "What if we removed the part that explains everything? Would we still want to read on?"
• Build a short list of "hook strategies" on the board from student examples: SOUND + mystery, ACTION + stop, QUESTION, WITHHOLD THE WHO.

TEACHER NOTES:
This We Do slide applies the planning scaffold from Slide 9 to Image 1 before students tackle Image 2 independently. This is the C — Cycle Through Problem Pairs phase (DECIDE): we have had one worked example (Slide 9) and now apply the same scaffold to a parallel task before full independence. Displaying the three planning questions (rather than the whole modelling slide) fades the scaffold slightly — students must generate the content, not copy the example. This is Contour Fading (DECIDE framework: D — Differentiate Through Fading). VTLM 2.0 element: Guided Practice / We Do. VC2E6LE05.

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: For question 2 (what NOT to tell), provide a sentence stem: "I will NOT tell the reader _____ because I want them to wonder _____." This scaffolds the withholding strategy explicitly.
• Rationale: The withholding mechanism is cognitively demanding for students who are accustomed to storytelling that explains everything. The stem makes the gap-creating move concrete.
• Learning Progression Step: VC2E6LE04 — examining how authors create suspense and tension through language choices (Year 5/6).
EXTENDING PROMPT:
• Task: After drafting, annotate your hook: label which words create SOUND, ATMOSPHERE, ACTION, or MYSTERY. Then rewrite one sentence to use a different hook strategy (e.g., if you used sound, try atmosphere instead).
• Rationale: Metalinguistic annotation develops explicit control over craft choices — the student moves from intuitive to deliberate hook construction.
• Learning Progression Step: VC2E6LE05 — experimenting with literary devices deliberately and reflecting on their effect.

WATCH FOR:
• Students who plan by listing events (story plan) rather than thinking about what to withhold — redirect: "We are not writing a story outline. We are deciding what the reader does NOT get to know."
• Students who produce only one planning answer before moving to writing — prompt them to complete all three questions.

[Examining/Creating Literature — Stage 2 We Do | VTLM 2.0: Guided Practice]`;

const NOTES_SLIDE11 = `SAY:
• "Now you are ready to work on your own. Image 2 is a playground — bright, sunny day, children playing, an athletic confident girl swinging from handles."
• "Think about your audience. Who are you writing for? How can your hook grab THEIR attention right away?"
• "Use the same three planning questions. Then write your paragraph — at least one narrative hook, underlined."
• "You have the rest of independent time. Aim for at least four sentences."
• Set timer (approximately 10–12 minutes).

DO:
• Write the Enable framework on the board (or ensure it is already there from pre-lesson prep): "Start with a sound or question → 2 action sentences → end with a description of a feeling."
• Circulate: check that students are underlining their hooks, not just writing continuous paragraphs.
• After 5 minutes: briefly pause the class. "Show me your workbook. Has anyone underlined at least one hook? Thumbs up." Scan and re-prompt students who haven't underlined.
• Prompt for extending students verbally — no whole-class instruction needed.

CFU CHECKPOINT:
Technique: Think-Pair-Share (see Slide 12)
Script (at end of task):
• "Find a partner's workbook. Read their paragraph. Can you identify their hook — could you underline it? Then tell them WHY it works."
• Scan for: students who can locate the hook in a partner's text; students who can articulate the mechanism (creates a question / withholds information).
PROCEED (≥80%): Students have written at least one identifiable hook and can explain it → move to Slide 12 CFU slide.
PIVOT (<80%): If many students have written descriptive paragraphs without an identifiable hook, reconvene. "Let me show you the difference between a description and a hook." Contrast: "The playground was sunny." vs "She gripped the bar — but something was wrong." "Which one makes you ask a question? THAT is the hook." Re-check: "Try one more sentence — make it create a question."

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Begin with the framework written on the board: (1) Start with a sound or a question. (2) Write two action sentences. (3) End with a description of a feeling. Focus on underlining which of these three moves IS the hook.
• Rationale: The framework offloads the structural decision, allowing the student to focus working memory on the language choices within each step — the core learning target.
• Learning Progression Step: VC2E6LE04 — identifying how authors create tension, build atmosphere, and engage readers through structure and language.
EXTENDING PROMPT:
• Task: After completing the paragraph, write 2–3 sentences justifying WHY your hook is effective: name the technique you used (action / sound / question / withholding information), explain the question it creates for the reader, and predict how a specific reader (e.g., a 10-year-old who loves sport) would respond.
• Rationale: Metalinguistic justification is the highest level of craft awareness — it moves the student from producer to analyst of their own writing, which accelerates future transfer to new writing contexts.
• Learning Progression Step: VC2E6LE05 — experimenting with vocabulary and literary devices and evaluating their effectiveness.

MISCONCEPTIONS:
• Misconception: Students underline the entire paragraph as "the hook."
  Why: They have not internalised that the hook is a specific technique, not a style.
  Impact: Fails to develop precision in identifying and applying the device.
  Quick correction: "A hook is usually one or two sentences — the ones that create the GAP. Which sentence in your paragraph asks the most questions? That is your hook. Underline only that."

WATCH FOR:
• Students who write in third person — remind them the LO focuses on first-person narrative voice.
• Students who finish early — prompt with the Extending task; do NOT give them a new task that moves away from hooks.
• Students who are stuck at the planning stage — direct to the Enable framework on the board.

[Examining/Creating Literature — Stage 2 You Do | VTLM 2.0: Independent Application]`;

const NOTES_SLIDE12 = `SAY:
• "Pens down. Swap workbooks with your partner."
• "Your job: read their paragraph. Can you find their narrative hook? If you can, underline it — or point to it — and then tell your partner WHY it works."
• "What question does the hook create? What does it withhold? Use those words."
• Give 2–3 minutes for the exchange, then cold-call 3–4 pairs to share.
• "Listen to what [student] said about their partner's hook: [quote/paraphrase]. Does everyone hear the mechanism they described?"

DO:
• After pair feedback, collect workbooks for formative assessment.
• As you collect: briefly scan the first sentence of each workbook — this gives you immediate data on whether hooks are present and whether they are underlined.
• Note students who produced strong hooks — consider reading 1–2 anonymously to the class as exemplars.

CFU CHECKPOINT:
Technique: Think-Pair-Share
Script:
• "Partner A — tell Partner B what the hook in their paragraph is AND what question it creates for a reader. Partner B — listen, then tell Partner A whether you agree and why."
• After 2 minutes: "Who heard a hook from their partner that they thought was particularly effective? Tell me what made it work."
• Scan for: students using the vocabulary of the lesson (hook, gap, withhold, question, first-person voice), and students identifying the mechanism rather than simply liking the writing.
PROCEED (≥80%): Students can locate hooks in peer writing and explain the mechanism → move to Slide 13 (closing reflection).
PIVOT (<80%): Misconception: Students confuse "interesting writing" with "hook" — they praise good description but cannot identify the gap-creating move. Reteach: "Interesting writing is good — but a hook is specific. Ask yourself: does this sentence leave me with an unanswered question? If yes — it is a hook. If it is complete — it might be great writing, but it is not a hook yet." Re-check: "Try again — is there a sentence in the paragraph where the author refuses to tell you something?"

TEACHER NOTES:
Think-Pair-Share here is the final CFU before the lesson close. Peer-assessment is used deliberately: it externalises the identification process, which is more cognitively demanding than identifying your own hook. Students who can find and explain a hook in someone else's writing are demonstrating deeper understanding than those who can only write one. Workbook collection provides formative assessment data against both SC: can students identify a hook (SC1) and have they written one (SC2)? DECIDE framework: I — Interact Constantly Through CFU. VTLM 2.0 element: Formative Assessment for Learning. VC2E6LE03, VC2E6LE05.

WATCH FOR:
• Students who say "I don't know what the hook is" when reading a partner's work — direct: "Find the sentence that creates a question. Start there."
• Partners who agree without actually evaluating — prompt: "Tell me specifically WHAT question the hook creates, not just that it is good."

[Examining/Creating Literature — Stage 2 → Stage 3 | VTLM 2.0: Formative Assessment — Think-Pair-Share]`;

const NOTES_SLIDE13 = `SAY:
• "Let's come back to our big question: what makes a narrative hook effective?"
• "Turn and talk to your partner — 60 seconds. Use the prompts on screen."
• After 60 seconds: cold-call 3 pairs to share.
• Read the three key takeaways chorally: "Everyone read the first dot point with me: Narrative hooks…" [Read together.]
• "What technique did YOU use in your playground hook? Sound? Action? A question? Description? Think — and tell your partner."
• "Next lesson we will look at Chapter 3 and see how Almond keeps using hooks across the whole novel. Today you have taken your first step as a writer who understands HOW an author creates the need to keep reading."

DO:
• Return to the definitions from Slide 4: "Choral read the definition of narrative hook one more time." [Choral read.]
• As students leave: stand at the door. Ask 2–3 students exiting: "Tell me one word that makes your hook work." This is a low-stakes retrieval check.

TEACHER NOTES:
This closing slide completes the DECIDE framework's E — Embed in Long-Term Memory. The reflection prompt is deliberately metacognitive: "What technique did YOU use?" forces students to categorise their own output, which strengthens long-term encoding. The choral re-read of the definition is spaced repetition within the lesson. The exit-door verbal check is a micro-retrieval practice. VTLM 2.0 element: Consolidation and Reflection. The three takeaways are sequenced intentionally: hook mechanism → first-person connection → craft of withholding. This is the cognitive sequence of the lesson. Collect workbooks to assess SC1 (identify) and SC2 (write). VC2E6LE03, VC2E6LE05.

WATCH FOR:
• Students who name only the image-based task as "what I did today" — redirect to the literary term: "What is the name of the technique you used?"
• Students who pack up before the choral read — this is a high-leverage moment; wait for them.

[Examining/Creating Literature — Stage 3 | VTLM 2.0: Consolidation and Reflection]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  if (!fs.existsSync("output")) fs.mkdirSync("output");

  const pres = new pptxgen();
  pres.layout  = "LAYOUT_16x9";
  pres.author  = "Claude";
  pres.title   = "Skellig — Lesson 2: Narrative Hooks to Engage the Reader";

  // Pre-render icons once
  const icons = {
    bookOpen:   await iconToBase64Png(FaBookOpen,          "#FFFFFF", 256),
    pen:        await iconToBase64Png(FaPen,               "#FFFFFF", 256),
    users:      await iconToBase64Png(FaUsers,             "#FFFFFF", 256),
    search:     await iconToBase64Png(FaSearch,            "#FFFFFF", 256),
    comments:   await iconToBase64Png(FaComments,          "#FFFFFF", 256),
    feather:    await iconToBase64Png(FaFeatherAlt,        "#FFFFFF", 256),
    quoteleft:  await iconToBase64Png(FaQuoteLeft,         "#FFFFFF", 256),
    lightbulb:  await iconToBase64Png(FaLightbulb,        "#FFFFFF", 256),
    board:      await iconToBase64Png(FaChalkboardTeacher, "#FFFFFF", 256),
    check:      await iconToBase64Png(FaCheckCircle,       "#FFFFFF", 256),
    star:       await iconToBase64Png(FaStar,              "#FFFFFF", 256),
    pencilAlt:  await iconToBase64Png(FaPencilAlt,        "#FFFFFF", 256),
  };

  // ── Slide 1: Title ─────────────────────────────────────────────────────────
  titleSlide(
    pres,
    "Skellig: Narrative Hooks to Engage the Reader",
    "Novel Study — Year 5/6 Literacy",
    "Lesson 2 of 25",
    NOTES_SLIDE1
  );

  // ── Slide 2: Learning Objective & Success Criteria ─────────────────────────
  liSlide(
    pres,
    [
      "We will learn how authors use narrative hooks to engage the reader.",
    ],
    [
      "I can identify and explain the purpose of narrative hooks.",
      "I can write a passage beginning with a narrative hook.",
    ],
    NOTES_SLIDE2,
    FOOTER
  );

  // ── Slide 3: Chapter 1 Review ───────────────────────────────────────────────
  contentSlide(
    pres,
    "Stage 1",
    C.SLATE,
    "Chapter 1 Review — What Do We Remember?",
    [
      "Michael and his family have moved to a new, run-down house.",
      "The garden is overgrown — described as wild and untended.",
      "Michael's parents have forbidden him from entering the old garage.",
      "Michael discovers something — or someone — in the garage.",
      "His baby sister is seriously unwell; his parents are distracted with worry.",
      "The creature in the garage is mysterious — never fully described in Chapter 1.",
    ],
    NOTES_SLIDE3,
    FOOTER,
    (s) => {
      // Right column: icon + pair-share prompt
      const cardX = 6.1, cardY = CONTENT_TOP, cardW = 3.7, cardH = SAFE_BOTTOM - CONTENT_TOP;
      s.addShape("roundRect", {
        x: cardX, y: cardY, w: cardW, h: cardH, rectRadius: 0.1,
        fill: { color: C.MIDNIGHT },
        shadow: makeCardShadow(),
      });
      s.addImage({ data: icons.users, x: cardX + 1.35, y: cardY + 0.3, w: 0.6, h: 0.6 });
      s.addText("Pair-Share", {
        x: cardX + 0.15, y: cardY + 0.98, w: cardW - 0.3, h: 0.34,
        fontSize: 13, fontFace: FONT_B, color: C.GOLD, bold: true,
        align: "center", margin: 0,
      });
      s.addText("Tell your partner:\nWho are the main characters?\nWhat has happened so far?\nWhere is the story set?", {
        x: cardX + 0.2, y: cardY + 1.38, w: cardW - 0.4, h: 1.8,
        fontSize: 12, fontFace: FONT_B, color: C.LIGHT,
        align: "center", valign: "top", margin: 0,
      });
      s.addText("90 seconds", {
        x: cardX + 0.2, y: cardY + 3.0, w: cardW - 0.4, h: 0.32,
        fontSize: 11, fontFace: FONT_B, color: C.SAND, italic: true,
        align: "center", margin: 0,
      });
    }
  );

  // ── Slide 4: Key Concepts — Narrative Hook & First-Person Voice ─────────────
  (function () {
    const s = pres.addSlide();
    addTopBar(s, C.MIDNIGHT);
    addBadge(s, "Key Concepts", { color: C.MIDNIGHT, w: 2.2 });
    addTitle(s, "Narrative Hook & First-Person Narrative Voice");

    const GAP    = 0.16;
    const card1Y = CONTENT_TOP;
    const card1H = 1.66;
    const card2Y = card1Y + card1H + GAP;
    const card2H = SAFE_BOTTOM - card2Y;

    // Card 1 — Narrative Hook
    s.addShape("roundRect", {
      x: 0.5, y: card1Y, w: 9, h: card1H, rectRadius: 0.1,
      fill: { color: C.MIDNIGHT },
      shadow: makeCardShadow(),
    });
    s.addShape("rect", { x: 0.5, y: card1Y, w: 0.07, h: card1H, fill: { color: C.GOLD } });
    s.addImage({ data: icons.quoteleft, x: 0.7, y: card1Y + 0.22, w: 0.48, h: 0.48 });
    s.addText("Narrative Hook", {
      x: 1.35, y: card1Y + 0.12, w: 4, h: 0.32,
      fontSize: 13, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
    });
    s.addText(
      "A narrative hook appears at the beginning of a story or chapter to capture the reader\u2019s attention and make the reader continue reading to find out what happens next.",
      {
        x: 1.35, y: card1Y + 0.48, w: 7.9, h: 1.05,
        fontSize: 14, fontFace: FONT_H, color: C.WHITE, italic: false, margin: 0,
      }
    );

    // Card 2 — First-Person Narrative Voice
    s.addShape("roundRect", {
      x: 0.5, y: card2Y, w: 9, h: card2H, rectRadius: 0.1,
      fill: { color: C.PARCHMENT },
      shadow: makeCardShadow(),
    });
    s.addShape("rect", { x: 0.5, y: card2Y, w: 0.07, h: card2H, fill: { color: C.SLATE } });
    s.addImage({ data: icons.feather, x: 0.7, y: card2Y + 0.22, w: 0.44, h: 0.44 });
    // Tint the feather icon background so it shows on parchment
    s.addShape("roundRect", {
      x: 0.65, y: card2Y + 0.18, w: 0.52, h: 0.52, rectRadius: 0.26,
      fill: { color: C.SLATE },
    });
    s.addImage({ data: icons.feather, x: 0.71, y: card2Y + 0.22, w: 0.40, h: 0.40 });
    s.addText("First-Person Narrative Voice", {
      x: 1.35, y: card2Y + 0.12, w: 5, h: 0.32,
      fontSize: 13, fontFace: FONT_B, color: C.SLATE, bold: true, margin: 0,
    });
    s.addText(
      "The author tells the story through the voice of one character including their personal experiences, feelings and opinions, using words such as \u2018I,\u2019 \u2018my\u2019 and \u2018mine.\u2019",
      {
        x: 1.35, y: card2Y + 0.48, w: 7.9, h: card2H - 0.62,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      }
    );

    addFooter(s, FOOTER);
    s.addNotes(NOTES_SLIDE4);
  })();

  // ── Slide 5: Vocabulary — Lurched ──────────────────────────────────────────
  vocabSlide(
    pres,
    "Lurched",
    "verb",
    "to suddenly move or sway in an unexpected way.",
    "He lurched forward as the bus suddenly braked.",
    NOTES_SLIDE5,
    FOOTER
  );

  // ── Slide 6: Vocabulary — Wilderness ──────────────────────────────────────
  vocabSlide(
    pres,
    "Wilderness",
    "noun",
    "an area of land that has been largely undisturbed by humans.",
    "The old garden behind the house had become a wilderness of weeds and nettles.",
    NOTES_SLIDE6,
    FOOTER
  );

  // ── Slide 7: Quote — Chapter 2 First Sentence ─────────────────────────────
  quoteSlide(
    pres,
    "Chapter 2",
    "The First Sentence — A Narrative Hook",
    "I nearly went into the garage that day.",
    "Ch. 2",
    "Pair-Share: What questions does this sentence raise in your mind? What does the word \u2018nearly\u2019 make you wonder?",
    NOTES_SLIDE7,
    FOOTER
  );

  // ── Slide 8: Pair-Share — Analysing Chapter 2 ─────────────────────────────
  pairShareSlide(
    pres,
    "Analysing Chapter 2 — Find the Hooks",
    [
      "1.  What did the author TELL us?",
      "2.  What is the author NOT telling us?",
      "3.  What do we NEED to know to find out more?  |  4.  Did you want to keep reading? Why or why not?",
    ],
    NOTES_SLIDE8,
    FOOTER
  );

  // ── Slide 9: Modelling — Writing a Narrative Hook ─────────────────────────
  modellingSlide(
    pres,
    "I Do — Watch Me",
    "Writing a Narrative Hook",
    // Left — planning scaffold
    [
      { text: "Plan Your Hook\n\n", options: { bold: true, color: C.MIDNIGHT, fontSize: 14, breakLine: false } },
      { text: "What will I TELL the audience?\n", options: { color: C.CHARCOAL, fontSize: 13, breakLine: false } },
      { text: "It\u2019s dark. Something is moving.\n\n", options: { color: C.SLATE, fontSize: 13, italic: true, breakLine: false } },
      { text: "What will I NOT tell them?\n", options: { color: C.CHARCOAL, fontSize: 13, breakLine: false } },
      { text: "What is moving. Why it\u2019s moving.\n\n", options: { color: C.SLATE, fontSize: 13, italic: true, breakLine: false } },
      { text: "What must they read on to find out?\n", options: { color: C.CHARCOAL, fontSize: 13, breakLine: false } },
      { text: "Whether the moving thing is dangerous.", options: { color: C.SLATE, fontSize: 13, italic: true } },
    ],
    // Right — modelled example
    "\u201CCreak! Amongst the pile of filthy things, something shifted in the darkness \u2014 a slow movement which sent a chill up my spine.\u201D",
    NOTES_SLIDE9,
    FOOTER
  );

  // ── Slide 10: Pair-Share — Plan Your Narrative Hook ───────────────────────
  pairShareSlide(
    pres,
    "Plan Your Narrative Hook — Image 1",
    [
      "What will you TELL your audience? (What can you see / sense in the dark space?)",
      "What will you NOT tell your audience? (What mystery will you keep hidden?)",
      "What will the audience NEED to know — to make them keep reading?",
    ],
    NOTES_SLIDE10,
    FOOTER
  );

  // ── Slide 11: Task — Independent Writing ──────────────────────────────────
  taskSlide(
    pres,
    "You Do",
    "Write Your Narrative Hook — Playground Image",
    [
      {
        label: "First",
        instruction:
          "Look carefully at the playground image. What do you see, hear, and feel? Jot down 3\u20134 words or phrases in your workbook.",
      },
      {
        label: "Next",
        instruction:
          "Plan your hook using the three questions: What will you TELL? What will you NOT tell? What must the reader find out?",
      },
      {
        label: "Then",
        instruction:
          "Write a paragraph (at least 4 sentences) containing at least ONE narrative hook. Underline your hook(s). Use first-person voice.",
      },
    ],
    NOTES_SLIDE11,
    FOOTER
  );

  // ── Slide 12: CFU — Identify the Hook ────────────────────────────────────
  cfuSlide(
    pres,
    "CFU",
    "Identify the Hook",
    "Think-Pair-Share",
    "Read your partner\u2019s paragraph.\nCan you identify their narrative hook?\nExplain WHY it works \u2014 what questions does it create for the reader?",
    NOTES_SLIDE12,
    FOOTER
  );

  // ── Slide 13: Closing ─────────────────────────────────────────────────────
  closingSlide(
    pres,
    "What makes a narrative hook effective? What technique did you use \u2014 action, sound, question, or description?",
    [
      "Narrative hooks create mystery and make readers want to keep reading.",
      "First-person voice puts readers inside the character\u2019s experience.",
      "Good hooks withhold just enough information to create curiosity.",
    ],
    NOTES_SLIDE13
  );

  // ── Write file ────────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: "output/Lesson_Skellig_2_Narrative_Hooks.pptx" });
  console.log("\u2713 output/Lesson_Skellig_2_Narrative_Hooks.pptx");
}

build().catch(console.error);
