"use strict";

// War Horse Unit -- Lesson 18: Chapter 15 -- No Man's Land
// Week 4, Session 3, Grade 5/6 Literacy
// Chapter 15: Joey alone in No Man's Land -- literary devices, perspective, conjunctions

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

const {
  C, FONT_H, FONT_B,
  makeCardShadow,
  SAFE_BOTTOM, CONTENT_TOP,
  addTopBar, addBadge, addTitle, addCard, addFooter,
  withReveal,
  titleSlide, liSlide, contentSlide,
  cfuSlide, taskSlide, modellingSlide, closingSlide,
  vocabSlide, quoteSlide, pairShareSlide,
} = require("../themes/wh4_helpers");

const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addBodyText, addTipBox, addPdfFooter, addLinedArea,
  addResourceSlide, getSessionResourceFolder, makeSessionResource,
} = require("../themes/pdf_helpers");

const SESSION_NUMBER = 3;
const FOOTER = "War Horse | Lesson 18 of 25 | Week 4 | Year 5/6 Literacy";
const OUT_DIR = "output/WH4_Lesson18_No_Mans_Land";
const RES_DIR = path.join(OUT_DIR, getSessionResourceFolder(SESSION_NUMBER));
const WORKSHEET_RESOURCE = makeSessionResource(
  SESSION_NUMBER,
  "Because But So Worksheet",
  "Student worksheet: complete three sentences using because, but, and so. Includes challenge extension."
);
const ANSWER_KEY_RESOURCE = makeSessionResource(
  SESSION_NUMBER,
  "Answer Key",
  "Teacher reference: model answers with alternative valid completions."
);
const REFERENCE_RESOURCE = makeSessionResource(
  SESSION_NUMBER,
  "Literary Devices Reference",
  "Student reference: 5 devices with definitions and Chapter 15 examples. Keep for narrative writing."
);
const RESOURCE_ITEMS = [WORKSHEET_RESOURCE, ANSWER_KEY_RESOURCE, REFERENCE_RESOURCE];
const WORKSHEET_PDF_PATH = path.join(OUT_DIR, WORKSHEET_RESOURCE.fileName);
const ANSWER_KEY_PDF_PATH = path.join(OUT_DIR, ANSWER_KEY_RESOURCE.fileName);
const REFERENCE_PDF_PATH = path.join(OUT_DIR, REFERENCE_RESOURCE.fileName);
fs.mkdirSync(RES_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Teacher Notes
// ---------------------------------------------------------------------------

const NOTES_TITLE = `SAY:
- Welcome back to War Horse -- we are continuing with Chapter 15 today
- Last lesson was emotional -- Topthorn died, Friedrich was injured. Today Joey is completely alone for the first time
- This chapter is one of the most powerfully written in the book. Morpurgo uses almost every literary device we have studied to put us inside Joey's experience
- We will read Chapter 15, study the devices Morpurgo uses, and then do some sentence-level writing with conjunctions

DO:
- Have copies of War Horse on desks, bookmarked at Chapter 15 (p. 118)
- Display title slide as students settle
- Set a calm, focused tone -- this is an intense chapter

SENSITIVITY ADVISORY:
- What it is: Joey is alone, injured, and terrified in a war zone. He encounters explosions, barbed wire, and the terror of no man's land.
- Framing language: "This chapter shows Joey at his bravest. He is scared but he keeps going."
- Watch for: Students who are still processing Topthorn's death from last lesson, or who have personal connections to war, loss, or separation
- Protocol: If a student becomes distressed, acknowledge their feelings privately. Remind students that Joey survives -- this is not a death scene.

TEACHER NOTES:
Lesson 18 of 25, third session of Week 4. Chapter 15 deploys simile, metaphor, onomatopoeia, personification, and repetition in concentrated form -- ideal for explicit teaching of narrative devices that connect to students' own writing.

WATCH FOR:
- Students emotionally affected by the content -- validate feelings, remind them Joey survives
- Students absent last lesson who need a brief recap of Chapter 14

[General: Title | VTLM 2.0: Establishing Purpose and Relevance]`;

const NOTES_LI_SC = `SAY:
- Read the learning intention from the slide
- We have two connected strands today: analysing Morpurgo's craft in Chapter 15 and extending sentences clearly with because, but and so
- Read the success criteria together. Ask: Which of these feels most challenging? [Take 2-3 responses]

DO:
- Choral read the LI, then the SCs
- Keep the LI/SC introduction brisk -- 90 seconds maximum

TEACHER NOTES:
SC1 focuses on literary devices, SC2 on conjunction sentence building, SC3 on perspective. The conjunction focus connects naturally to narrative writing -- students need varied sentence structures in their own stories.

WATCH FOR:
- Students who only attend to the device work or only to the writing -- remind them the LI connects both
- Students who seem confident on all three -- probe: "Can you name a literary device right now?"

[General: Learning Intention | VTLM 2.0: Clear Learning Intention]`;

const NOTES_VOCAB_MURKY = `SAY:
- Read this word with me: murky [students repeat]
- Murky means dark, gloomy, and hard to see through. Think of water you can't see the bottom of, or a night where fog makes everything unclear
- In Chapter 15, conditions are murky -- Joey can barely see where he is going
- Quick check: thumbs up if murky means clear and bright, thumbs down if it means dark and hard to see through [thumbs down]

DO:
- Display word, choral read, define, example
- Emphasise the sensory quality -- murky is a word you can feel
- Connect to the chapter: murky describes the world Joey is stumbling through

TEACHER NOTES:
"Murky" is a Tier 2 word with significant atmospheric weight. Pre-teaching it before reading ensures students can process descriptions without stopping to decode vocabulary.

MISCONCEPTIONS:
- Misconception: "Murky" only means dirty water
  Why: Students often encounter the word in the context of ponds or rivers
  Impact: Limits their ability to apply the word to non-water contexts (murky night, murky atmosphere)
  Quick correction: "Murky can describe any situation where things are hard to see or understand -- murky fog, murky darkness, even murky intentions"

WATCH FOR:
- Students who confuse "murky" with "mucky" (dirty) -- clarify: murky is about visibility, mucky is about cleanliness
- Students who can't generate their own example -- provide a sentence frame: "The ___ was so murky that ___"

[General: I Do -- Vocabulary | VTLM 2.0: Building Vocabulary and Background Knowledge]`;

const NOTES_VOCAB_VAGUE = `SAY:
- Second vocabulary word: vague [students repeat]
- Vague means unclear, not definite, hard to pin down. Something vague lacks detail or precision
- In Chapter 15, things are vague for Joey -- shapes in the darkness, sounds he can't identify
- Ask: How is "vague" different from "murky"? [Murky is about the environment being hard to see through; vague is about the thing itself being unclear]

DO:
- Display word, choral read, define, example
- Draw the distinction between murky (the medium) and vague (the object)
- Ask 2-3 students to use "vague" in a sentence about today's chapter

TEACHER NOTES:
Teaching "vague" alongside "murky" creates a productive comparison. Both relate to unclear perception but operate differently: murky describes conditions, vague describes what is perceived.

WATCH FOR:
- Students who treat "vague" and "murky" as identical -- reinforce the distinction
- Students who use "vague" only about people ("he was being vague") -- extend to visual and physical contexts

[General: I Do -- Vocabulary | VTLM 2.0: Building Vocabulary and Background Knowledge]`;

const NOTES_READING_INTRO = `SAY:
- Chapter 15 picks up right where we left off. Topthorn has died, Friedrich has been injured. Joey is now completely alone
- Today's reading is Student Read Aloud. I will select readers, and we will pause at three key moments to discuss
- As you listen, pay attention to the language Morpurgo uses -- similes, metaphors, personification, onomatopoeia, repetition. Your job is to notice them
- Pages 118 to 126 -- open your books now

DO:
- Give students 30 seconds to find p. 118
- Select first reader -- choose a confident, expressive reader for the opening (the tank scene is dramatic)
- Plan reader rotations: change every half-page or at natural pause points

SENSITIVITY ADVISORY:
- What it is: The chapter describes Joey running through a battlefield at night -- explosions, barbed wire, injury, isolation
- Framing language: "This chapter shows Joey's courage and determination to survive"
- Watch for: Student distress, especially those with personal connections to war or loss
- Protocol: Allow distressed students to follow along silently. Frame as courage and survival, not suffering.

TEACHER NOTES:
Student Read Aloud is chosen deliberately -- the dramatic prose benefits from being heard aloud. Three pause points create natural comprehension checkpoints.

WATCH FOR:
- Readers who rush dramatic passages -- coach: "Slow down at the commas. Let the tension build"
- Emotional responses to battlefield descriptions -- normalise: "That is Morpurgo's writing doing what it is supposed to do"

[General: Reading Launch | VTLM 2.0: Structured Reading Practice]`;

const NOTES_PAUSE1 = `SAY:
- Stop here. Read this quote carefully: "And then exhaustion finally overtook me, sapped the strength from my legs and forced me to lie down and sleep."
- What is happening in this moment? [Joey has been running, he is utterly exhausted, he collapses]
- Ask: What is unusual about the way Morpurgo describes exhaustion here? Think about what exhaustion is DOING in this sentence [Exhaustion is described as if it is a person -- it "overtook" him, "sapped" his strength, "forced" him. These are human actions]
- That is personification -- giving human qualities to something non-human. Exhaustion becomes a character that defeats Joey

DO:
- Display the quote, read aloud slowly with expression
- Give 15 seconds of think time before taking responses
- Use Cold Call for initial responses, then open to volunteers for the literary device identification

TEACHER NOTES:
This is the first pause point and introduces personification in context. The power of this example is that exhaustion becomes an antagonist -- it acts upon Joey with agency and force.

WATCH FOR:
- Students who identify the quote as a simile (no comparison word) or metaphor (it is not saying exhaustion IS something else) -- clarify: personification specifically gives human traits to non-human things
- Students who can't see the personification -- ask: "Can exhaustion actually grab you and force you? Those are human actions"

[General: Pause Point 1 | VTLM 2.0: Teacher-Led Discussion]`;

const NOTES_PAUSE1_REVEAL = `SAY:
- Joey has run until his body cannot go any further. Exhaustion is personified as a force that physically defeats him
- Notice the three verbs: "overtook" -- like a pursuer; "sapped" -- draining energy; "forced" -- no choice
- Think about how you could use this in your own writing: instead of "I was tired," you could write "Exhaustion grabbed me and dragged me to the ground"

DO:
- Reveal the answer card and read through the analysis
- Pause on the narrative writing connection -- directly transferable
- Continue reading from where you left off

[General: Pause Point 1 Reveal | VTLM 2.0: Teacher-Led Discussion]`;

const NOTES_PAUSE2 = `SAY:
- Pause here. "...and moving towards the darker more silent world ahead of me."
- What is going on? Where is Joey heading? [Away from the fighting, towards quiet -- but also towards the unknown]
- Ask: What does "darker more silent world" suggest? [It could mean the quieter part of the battlefield, but it also sounds like death. Silence and darkness are often associated with death]

DO:
- Display quote, read with a slow, quiet tone
- Use Think-Pair-Share: 30 seconds think, 60 seconds pair talk, then share
- Push students beyond literal interpretation -- this is a metaphorical landscape

CFU CHECKPOINT:
Technique: Think-Pair-Share

Script:
- "Think for 30 seconds: what could 'darker more silent world' mean beyond just the physical darkness?"
- "Now share with your partner for 60 seconds"
- "Hands down -- I am going to select pairs to share"
- Scan for: students who offer both literal and symbolic readings

PROCEED (>=80%): Most pairs identify at least the literal meaning and attempt a deeper reading. Move to Pause Point 3.
PIVOT (<80%): Most likely issue -- students stuck on the literal only. Reteach: "When an author uses words like 'world' instead of 'place,' they are often signalling something bigger. What feelings do darkness and silence give you?" Re-check with a quick thumbs: "Could this phrase be about more than just geography?"

TEACHER NOTES:
This pause point develops inferential reading. The phrase operates on two levels: literal (quieter battlefield) and symbolic (death, isolation, the unknown).

WATCH FOR:
- Students stuck on the literal only -- prompt: "What else could 'darker more silent' mean beyond just the physical darkness?"
- Students who jump to "he is going to die" -- redirect: "The language creates a feeling of uncertainty"

[General: Pause Point 2 | VTLM 2.0: Higher-Order Questioning]`;

const NOTES_PAUSE2_REVEAL = `SAY:
- Joey is moving away from the fighting but into complete uncertainty
- The phrase "darker more silent world" works on two levels: the literal landscape and the emotional journey
- Notice how Morpurgo uses the word "world" -- not "place" or "area." World suggests something vast and overwhelming

DO:
- Reveal the answer card
- Highlight the dual-level reading -- literal and symbolic
- Continue reading towards the chapter's climax

[General: Pause Point 2 Reveal | VTLM 2.0: Higher-Order Questioning]`;

const NOTES_PAUSE3 = `SAY:
- Final pause. "This was what the soldiers called 'no man's land.'"
- What do you think the author wants us to know? [Joey has ended up in the most dangerous place on the entire battlefield -- the strip of land between the two opposing armies]
- Ask: What is ironic about Joey being in no man's land? [He is not a man -- he is a horse. But he is trapped in a place defined by human war]

DO:
- Display quote, let the weight of the moment settle
- Use Cold Call for initial responses
- Draw attention to the irony -- this is a central theme of the book

TEACHER NOTES:
Joey's presence in no man's land crystallises the book's central theme: the absurdity of war for animals who had no choice. The irony is both linguistic and thematic.

WATCH FOR:
- Students who don't know what no man's land is -- brief explanation: the strip between opposing trenches
- Students moved by the moment -- acknowledge: "That is the power of Morpurgo's writing"

[General: Pause Point 3 | VTLM 2.0: Deep Comprehension / Critical Literacy]`;

const NOTES_PAUSE3_REVEAL = `SAY:
- Morpurgo wants us to understand Joey has stumbled into the most dangerous place on the battlefield
- No man's land is the space between the British and German trenches -- constantly shelled by both sides
- The name -- "no MAN's land" -- reminds us that Joey is not a man. He does not understand sides or enemies. Animals suffer in wars they did not choose

DO:
- Reveal the answer card
- Let this moment land -- don't rush
- Transition to literary devices analysis: "Now let's go back through the chapter and look at HOW Morpurgo created all that tension"

[General: Pause Point 3 Reveal | VTLM 2.0: Deep Comprehension]`;

const NOTES_DEVICES_1 = `SAY:
- Now we are looking at the specific literary devices Morpurgo uses. This chapter is one of the richest for literary techniques
- First: simile. A simile compares two things using "like" or "as." The craters "smoked as if the earth itself was on fire" -- what effect does this create? [The destruction feels enormous -- like the earth is being destroyed]
- Second: onomatopoeia. Words that sound like what they describe. Listen: "crump and whistle... whining... rattle" -- Morpurgo makes us HEAR the battlefield

DO:
- Display both examples clearly
- Read the onomatopoeia example aloud with emphasis on the sound words
- Ask: "Which is more effective at putting you in Joey's position -- the simile or the onomatopoeia? Why?"

TEACHER NOTES:
Pairing simile and onomatopoeia allows comparison of two sensory strategies: simile creates visual imagery through comparison, onomatopoeia creates auditory imagery through phonetic mimicry. Both are accessible for students to use in their own writing.

MISCONCEPTIONS:
- Misconception: Any comparison is a simile
  Why: Students confuse simile with metaphor because both involve comparison
  Impact: Reduces precision in literary analysis
  Quick correction: "Simile always uses 'like' or 'as' to compare. No 'like' or 'as' means it is a metaphor"
- Misconception: Onomatopoeia is only words like "bang" and "pop"
  Why: Students learn onomatopoeia with obvious comic-book examples
  Impact: They miss subtler sound words like "whining," "rattle," "crump"
  Quick correction: "Onomatopoeia includes any word where the sound suggests its meaning. 'Rattle' sounds rattly"

WATCH FOR:
- Students who can identify the device but can't explain the EFFECT -- push: "What does it make you feel or picture?"
- Students strong at one device but weak at the other -- note for differentiation

[General: I Do -- Literary Devices | VTLM 2.0: Explicit Teaching]`;

const NOTES_DEVICES_COMBINED = `SAY:
- Start with metaphor: Joey calls the tank a "monster" because, from his point of view, that is what it is
- Personification: exhaustion is treated like an attacker that overtakes Joey and forces him down
- Repetition: "He would know... He would know." Ask: What does the repeated phrase show about Joey's trust in Albert? [It is absolute -- unshakeable even in his darkest moment]

DO:
- Read the three examples aloud in order: metaphor, personification, repetition
- Keep pushing for effect, not just naming the device
- Cold call 2-3 students: which device feels most powerful and why?

TEACHER NOTES:
This combined slide condenses three devices so the lesson stays lean. SC1 is addressed through accurate device naming and effect; SC3 is reinforced through the perspective note about why the tank is a "monster."

WATCH FOR:
- Students who label the metaphor as a simile -- remind them there is no "like" or "as"
- Students who miss the perspective link -- ask: "Would a human narrator choose the word 'monster' here?"

[General: I Do -- Literary Devices Part 2 | VTLM 2.0: Explicit Teaching / Deep Analysis]`;

const NOTES_CFU_DEVICES = `SAY:
- Time to check your understanding. I am going to show you a quote from Chapter 15 and I want you to identify which literary device it uses
- Write your answer on your whiteboard. Don't hold it up until I say
- "...a great grey lumbering monster that belched out smoke..." Which device is this?
- Three, two, one -- show me! [Scan boards]

DO:
- Use Show Me Boards (mini whiteboards)
- Students write the device name, hold boards face-down until the count
- Scan for: correct identification of METAPHOR
- If students write "simile" -- ask: "Is there a 'like' or 'as'?"

CFU CHECKPOINT:
Technique: Show Me Boards

Script:
- "Write the name of the literary device on your board. Don't show me yet."
- "Three, two, one -- boards up!"
- Scan all boards simultaneously
- Look for: METAPHOR as the answer

PROCEED (>=80%): Most students correctly identify METAPHOR. Move to conjunction teaching.
PIVOT (<80%): Most likely misconception: students confuse metaphor with simile because both involve comparison. Reteach: "A metaphor says something IS something else. This sentence says the tank IS a monster. No 'like' or 'as.' That is metaphor." Re-check with: "craters that smoked as if the earth was on fire" -- what device? [Simile -- "as if"]

TEACHER NOTES:
The chosen example (tank as monster) tests the metaphor-simile distinction, which is the most common confusion. Using a single well-chosen example keeps the CFU focused and time-efficient.

MISCONCEPTIONS:
- Misconception: If it describes something as another thing, it must be personification
  Why: Students overapply personification because they learned it first
  Impact: Conflates two distinct devices
  Quick correction: "Personification gives HUMAN qualities to non-human things. A tank called a monster is not personification -- a monster is not human. It is metaphor: saying one thing IS another"

WATCH FOR:
- Students who write nothing -- check after the reveal whether they now understand
- Students who answer correctly but can't explain why -- push for reasoning in the debrief

[General: CFU | VTLM 2.0: Formative Assessment]`;

const NOTES_CFU_DEVICES_REVEAL = `SAY:
- The answer is METAPHOR. The tank is described as a monster -- not "like a monster" (that would be a simile), but AS a monster
- Remember: metaphor says something IS something else. Simile says something is LIKE something else
- If you got it right, well done. If you wrote simile or personification, you were close -- now you know the distinction

DO:
- Reveal the answer
- Brief whole-class acknowledgement
- Transition to conjunction teaching

[General: CFU Reveal | VTLM 2.0: Formative Assessment]`;

const NOTES_CONJ_IDO = `SAY:
- We are working with three conjunctions: "because," "but," and "so." Each does a different job -- WHY, CHANGE, or RESULT
- Watch me. I am taking the stem "Joey ran as far away as he could" and completing it three ways
- Read from slide: each model sentence. After each, name the function: "See how 'because' explains WHY? 'But' changes direction? 'So' shows the result?"
- Think aloud: "I chose 'because' to explain motivation, 'but' to show it didn't solve the problem, 'so' to show the consequence"

DO:
- Display the three conjunction types on the left, teacher models on the right
- Read each model sentence with emphasis on the conjunction
- Think aloud after each: name the function of the conjunction explicitly

TEACHER NOTES:
The think-aloud is critical -- students need to see the THINKING behind each choice. Modelling all three with the same stem lets students directly compare how each conjunction changes meaning.

WATCH FOR:
- Students who tune out -- re-engage: "Which conjunction would YOU have chosen first?"
- Students who don't see the difference between completions -- ask: "Does each sentence take you in the same direction?"

[General: I Do -- Modelling | VTLM 2.0: Explicit Teaching / Modelling]`;

const NOTES_CONJ_WEDO = `SAY:
- Your turn. Same stem: "Joey ran as far away as he could..." Complete it with "because" first -- 30 seconds with your partner
- [Cold Call 2-3 pairs] Now "but" -- change direction. 30 seconds. [Cold Call 2-3 pairs]
- Now "so" -- show a result. 30 seconds. [Cold Call 2-3 pairs]

DO:
- Time each round strictly -- 30 seconds per conjunction
- Cold Call 2-3 pairs after each round
- Correct in real time: "That sounds more like a 'because' sentence than a 'but' sentence"

CFU CHECKPOINT:
Technique: Cold Call (paired oral response)

Script:
- After each 30-second pair talk, cold call 2-3 pairs
- Listen for: correct function of the conjunction (reason, contrast, result)
- "Read me your 'but' sentence. Does it change direction from the stem?"

PROCEED (>=80%): Most pairs produce sentences that match the correct function. Move to You Do.
PIVOT (<80%): Most likely issue -- students writing "because" sentences for all three (all give reasons, no contrast or result). Reteach with physical gesture: "'Because' points backwards to the reason. 'But' turns a corner. 'So' points forward to the result." Re-check: "Give me a 'but' sentence that turns a corner."

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Provide sentence starters after the conjunction -- "Joey ran as far away as he could because he was scared of..."
- Extra Notes: Students who struggle can refer to the teacher models displayed on the previous slide

EXTENDING PROMPT:
- Task: Challenge students to add a literary device to their completion -- "Joey ran as far away as he could but exhaustion overtook him like a shadow" (combining conjunction with simile)

TEACHER NOTES:
Pair work with Cold Call maintains accountability. Doing all three in quick succession allows direct comparison.

WATCH FOR:
- Students who write "because" sentences for all three -- they don't understand the functional difference
- Students who struggle with "but" specifically -- "but" requires thinking against the expected direction, which is cognitively harder

[General: We Do | VTLM 2.0: Guided Practice]`;

const NOTES_CONJ_WEDO_REVEAL = `SAY:
- Great work. Notice how each conjunction takes the sentence in a completely different direction
- "Because" gives the reason -- the WHY
- "But" introduces a twist or complication
- "So" shows the consequence -- what happened AS A RESULT
- This is the kind of sentence variety that makes narrative writing powerful

DO:
- Display strong student examples (or teacher alternatives if needed)
- Reinforce the function of each conjunction one final time before You Do

[General: We Do Reveal | VTLM 2.0: Guided Practice]`;

const NOTES_CONJ_YOUDO = `SAY:
- Now write independently. Three sentences on the worksheet: First with "because," Next with "but," Then with "so"
- Make sure your completions are DIFFERENT from each other -- each conjunction takes the sentence in a new direction
- You have 5 minutes. If you finish early, there is a challenge on the worksheet

DO:
- Distribute the Because-But-So Worksheet and set a 5-minute timer
- Circulate -- spend time with students who struggled during the We Do
- Provide targeted feedback: check that "but" sentences actually change direction

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Students who are stuck use sentence frames -- "Joey ran as far away as he could because he felt..." / "...but something stopped him when..." / "...so he ended up..."
- Extra Notes: Keep the I Do model visible or have it printed for reference

EXTENDING PROMPT:
- Task: Write your own sentence stem from Chapter 15 (e.g., "The tanks rolled towards Joey..." or "Topthorn lay still on the ground...") and complete it with all three conjunctions. Then add a literary device to at least one sentence
- Extra Notes: Check that their self-selected stem genuinely comes from Chapter 15

TEACHER NOTES:
The 5-minute limit maintains urgency. Circulating here is the most valuable assessment opportunity for conjunction understanding.

WATCH FOR:
- Students who write the same completion for all three -- intervention: "Read your three sentences aloud. Do they take you in three different directions?"
- Students who struggle to start -- scaffold: "Tell me out loud: why did Joey run? Now write that after 'because'"

[General: You Do | VTLM 2.0: Independent Practice]`;

const NOTES_CLOSING = `SAY:
- Let's review our success criteria. SC1: literary devices -- thumbs up, sideways, or down? [scan] SC2: three conjunction sentences -- thumbs? [scan] SC3: Joey's perspective -- thumbs? [scan]
- Turn and talk: What is one thing from today you could use in your own narrative writing?
- Preview: "Next time, we find out what happens to Joey in no man's land"

DO:
- Run through each SC with thumbs check, record any "down" for follow-up
- Use the turn-and-talk to end on a positive, forward-looking note

TEACHER NOTES:
The closing returns to the success criteria for a formative feedback loop. Students "down" on SC1 may need the Literary Devices Reference Sheet.

WATCH FOR:
- Students "thumbs down" on SC1 -- may need a small-group reteach or the reference sheet
- Students who can't articulate a writing transfer -- prompt: "Which device could you use in a story?"

[General: Closing | VTLM 2.0: Review and Reflect]`;

const NOTES_RESOURCES = `SAY:
- Three printable resources for today's lesson
- The ${WORKSHEET_RESOURCE.name} is for the You Do activity
- The ${ANSWER_KEY_RESOURCE.name} is for your reference -- multiple valid answers are included
- The ${REFERENCE_RESOURCE.name} is a student keepsake for when they write their own narratives

DO:
- Print the worksheet before the lesson (one per student)
- Print the answer key (teacher copy only)
- Print the reference sheet (one per student)
- Click any resource card to open the PDF

TEACHER NOTES:
The reference sheet reinforces today's learning and provides a lasting writing tool. The worksheet separates the three conjunctions to reinforce their different functions.

[General: Resources | VTLM 2.0: Student Resources]`;

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Claude";
  pres.title = "War Horse - Lesson 18 - Chapter 15: No Man's Land";

  // =========================================================================
  // SLIDE 1 -- Title
  // =========================================================================
  titleSlide(
    pres,
    "War Horse",
    "Chapter 15 -- No Man's Land",
    "Lesson 18  |  Week 4  |  Year 5/6 Literacy",
    NOTES_TITLE
  );

  // =========================================================================
  // SLIDE 2 -- Learning Intention & Success Criteria
  // =========================================================================
  liSlide(
    pres,
    [
      "We are learning to analyse how Morpurgo uses literary devices and perspective in Chapter 15, and to extend sentences clearly using because, but and so",
    ],
    [
      "I can identify a literary device from Chapter 15 and explain its effect",
      "I can write three sentences using because, but and so to extend a sentence stem in different directions",
      "I can explain how Joey's perspective shapes the way the battlefield is described",
    ],
    NOTES_LI_SC,
    FOOTER
  );

  // =========================================================================
  // SLIDE 3 -- Vocabulary: murky
  // =========================================================================
  vocabSlide(
    pres,
    "murky",
    "adjective",
    "Dark, gloomy, and difficult to see through. Often describes water, air, or conditions where visibility is poor and the atmosphere feels heavy and uncertain.",
    "The murky water of the shell crater hid everything beneath its surface.",
    NOTES_VOCAB_MURKY,
    FOOTER
  );

  // =========================================================================
  // SLIDE 4 -- Vocabulary: vague
  // =========================================================================
  vocabSlide(
    pres,
    "vague",
    "adjective",
    "Unclear, not definite or precise. Something vague lacks detail, making it hard to understand, identify, or describe with certainty.",
    "Joey could only make out vague shapes in the distance through the smoke and mist.",
    NOTES_VOCAB_VAGUE,
    FOOTER
  );

  // Incidental vocabulary slide omitted -- lean profile default (OFF).
  // Teacher can surface words during reading as needed.

  // =========================================================================
  // SLIDE 5 -- Reading Introduction
  // =========================================================================
  contentSlide(
    pres,
    "Read Aloud",
    C.PRIMARY,
    "Chapter 15 -- Pages 118-126",
    [
      "Reading Mode: Student Read Aloud",
      "Joey is startled by tanks -- machines he has never seen before",
      "He runs in terror through the darkness, injuring his leg on barbed wire",
      "As dawn approaches, he realises he is in no man's land",
      "Focus: Notice the literary devices Morpurgo uses to put us inside Joey's experience",
    ],
    NOTES_READING_INTRO,
    FOOTER
  );

  // =========================================================================
  // SLIDES 6-7 -- Pause Point 1 (withReveal)
  // =========================================================================
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 1", "Chapter 15 -- p. 120",
      "And then exhaustion finally overtook me, sapped the strength from my legs and forced me to lie down and sleep.",
      "p. 120",
      "What's happening? Look at how exhaustion is described -- what is unusual about this sentence?",
      NOTES_PAUSE1, FOOTER
    ),
    (slide) => {
      const ansY = 3.62;
      slide.addShape("roundRect", {
        x: 0.5, y: ansY, w: 9, h: 1.38, rectRadius: 0.10,
        fill: { color: C.SUCCESS },
      });
      slide.addText("Personification", {
        x: 0.75, y: ansY + 0.08, w: 3, h: 0.30,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      slide.addText("Exhaustion is personified -- given human actions: it \"overtook\" Joey, \"sapped\" his strength, and \"forced\" him to sleep. Exhaustion becomes a character that physically defeats him. This makes the abstract feeling of tiredness concrete and dramatic.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
      slide.addNotes(NOTES_PAUSE1_REVEAL);
    }
  );

  // =========================================================================
  // SLIDES 8-9 -- Pause Point 2 (withReveal)
  // =========================================================================
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 2", "Chapter 15 -- p. 123",
      "...and moving towards the darker more silent world ahead of me.",
      "p. 123",
      "What's going on? What does \"darker more silent world\" suggest about where Joey is heading?",
      NOTES_PAUSE2, FOOTER
    ),
    (slide) => {
      const ansY = 3.62;
      slide.addShape("roundRect", {
        x: 0.5, y: ansY, w: 9, h: 1.38, rectRadius: 0.10,
        fill: { color: C.SUCCESS },
      });
      slide.addText("Dual Meaning", {
        x: 0.75, y: ansY + 0.08, w: 3, h: 0.30,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      slide.addText("Literal: Joey is moving away from the explosions towards a quieter part of the battlefield. Symbolic: \"darker more silent world\" echoes death, isolation, and the unknown. Morpurgo's language works on two levels -- describing the physical landscape AND Joey's emotional journey into uncertainty.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
      slide.addNotes(NOTES_PAUSE2_REVEAL);
    }
  );

  // =========================================================================
  // SLIDES 10-11 -- Pause Point 3 (withReveal)
  // =========================================================================
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 3", "Chapter 15 -- p. 126",
      "This was what the soldiers called 'no man's land.'",
      "p. 126",
      "What do you think the author wants us to know? What is \"no man's land\" and why is it significant that Joey is there?",
      NOTES_PAUSE3, FOOTER
    ),
    (slide) => {
      const ansY = 3.62;
      slide.addShape("roundRect", {
        x: 0.5, y: ansY, w: 9, h: 1.38, rectRadius: 0.10,
        fill: { color: C.SUCCESS },
      });
      slide.addText("Theme -- Animals in Human Wars", {
        x: 0.75, y: ansY + 0.08, w: 5, h: 0.30,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      slide.addText("No man's land is the strip between opposing trenches -- the most dangerous place on the battlefield. The irony: it is called \"no MAN's land\" but Joey, a horse, is the one trapped there. Morpurgo crystallises the novel's central theme: animals suffer in wars they did not choose and cannot understand.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
      slide.addNotes(NOTES_PAUSE3_REVEAL);
    }
  );

  // =========================================================================
  // SLIDE 12 -- Literary Devices Part 1: Simile + Onomatopoeia
  // =========================================================================
  {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addBadge(s, "Literary Devices", { color: C.ACCENT, w: 2.0 });
    addTitle(s, "Simile & Onomatopoeia");

    // Simile card
    addCard(s, 0.5, CONTENT_TOP, 9, 1.7, { strip: C.PRIMARY, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.7, y: CONTENT_TOP + 0.10, w: 1.1, h: 0.30, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    });
    s.addText("Simile", {
      x: 0.7, y: CONTENT_TOP + 0.10, w: 1.1, h: 0.30,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("A comparison using \"like\" or \"as\"", {
      x: 1.95, y: CONTENT_TOP + 0.10, w: 4, h: 0.30,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    s.addText("\"...leaving behind great craters that smoked as if the earth itself was on fire.\" (p. 118)", {
      x: 0.75, y: CONTENT_TOP + 0.55, w: 8.4, h: 1.0,
      fontSize: 15, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Onomatopoeia card
    const onoY = CONTENT_TOP + 1.84;
    addCard(s, 0.5, onoY, 9, 1.7, { strip: C.SECONDARY, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.7, y: onoY + 0.10, w: 1.8, h: 0.30, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    });
    s.addText("Onomatopoeia", {
      x: 0.7, y: onoY + 0.10, w: 1.8, h: 0.30,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Words that sound like what they describe", {
      x: 2.65, y: onoY + 0.10, w: 5, h: 0.30,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    s.addText("\"...I heard through the crump and whistle of the shells the whining sound of motors accompanied by a terrifying rattle of steel that set my ears back against my head.\" (p. 119)", {
      x: 0.75, y: onoY + 0.55, w: 8.4, h: 1.0,
      fontSize: 15, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_DEVICES_1);
  }

  // =========================================================================
  // SLIDE 13 -- Literary Devices Part 2: Metaphor, Personification & Repetition
  // =========================================================================
  {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addBadge(s, "Literary Devices", { color: C.ACCENT, w: 2.0 });
    addTitle(s, "Metaphor, Personification & Repetition");

    // Metaphor card
    const cardH = 1.05;
    addCard(s, 0.5, CONTENT_TOP, 9, cardH, { strip: C.PRIMARY, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.7, y: CONTENT_TOP + 0.08, w: 1.4, h: 0.26, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    });
    s.addText("Metaphor", {
      x: 0.7, y: CONTENT_TOP + 0.08, w: 1.4, h: 0.26,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Describing something AS something else (no \"like\" or \"as\")", {
      x: 2.25, y: CONTENT_TOP + 0.08, w: 5, h: 0.26,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    s.addText("\"...a great grey lumbering monster that belched out smoke from behind as it rocked down the hillside towards me.\" (p. 119)", {
      x: 0.75, y: CONTENT_TOP + 0.42, w: 8.4, h: 0.60,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Personification card
    const persY = CONTENT_TOP + cardH + 0.12;
    addCard(s, 0.5, persY, 9, cardH, { strip: C.SUCCESS, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.7, y: persY + 0.08, w: 1.8, h: 0.26, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    });
    s.addText("Personification", {
      x: 0.7, y: persY + 0.08, w: 1.8, h: 0.26,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Giving human qualities to non-human things", {
      x: 2.65, y: persY + 0.08, w: 5, h: 0.26,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    s.addText("\"And then exhaustion finally overtook me, sapped the strength from my legs and forced me to lie down and sleep.\" (p. 120)", {
      x: 0.75, y: persY + 0.42, w: 8.4, h: 0.60,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Repetition card
    const repY = persY + cardH + 0.12;
    addCard(s, 0.5, repY, 9, cardH, { strip: C.ASSESS, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.7, y: repY + 0.08, w: 1.4, h: 0.26, rectRadius: 0.08,
      fill: { color: C.ASSESS },
    });
    s.addText("Repetition", {
      x: 0.7, y: repY + 0.08, w: 1.4, h: 0.26,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Deliberately repeating words or phrases for emphasis", {
      x: 2.25, y: repY + 0.08, w: 5, h: 0.26,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    s.addText("\"...I shall never know. ... He would know ... He would know.\" (p. 121)", {
      x: 0.75, y: repY + 0.42, w: 8.4, h: 0.60,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Perspective note at bottom
    const noteY = repY + cardH + 0.15;
    if (noteY + 0.26 <= SAFE_BOTTOM) {
      s.addText("Joey doesn't know what tanks are -- so to him, they ARE monsters. Perspective shapes metaphor.", {
        x: 0.75, y: noteY, w: 8.5, h: 0.26,
        fontSize: 11, fontFace: FONT_B, color: C.ACCENT, bold: true, italic: true, margin: 0,
      });
    }

    addFooter(s, FOOTER);
    s.addNotes(NOTES_DEVICES_COMBINED);
  }

  // =========================================================================
  // SLIDES 14-15 -- CFU: Literary Devices (withReveal)
  // =========================================================================
  withReveal(
    () => cfuSlide(
      pres,
      "CFU",
      "Name That Device",
      "Show Me Boards",
      "\"...a great grey lumbering monster that belched out smoke from behind as it rocked down the hillside towards me.\"\n\nWhich literary device is Morpurgo using here?\nWrite it on your whiteboard.",
      NOTES_CFU_DEVICES,
      FOOTER
    ),
    (slide) => {
      const ansY = 4.0;
      slide.addShape("roundRect", {
        x: 0.5, y: ansY, w: 9, h: 1.0, rectRadius: 0.10,
        fill: { color: C.SUCCESS },
      });
      slide.addShape("roundRect", {
        x: 0.7, y: ansY + 0.10, w: 1.6, h: 0.28, rectRadius: 0.08,
        fill: { color: C.WHITE },
      });
      slide.addText("METAPHOR", {
        x: 0.7, y: ansY + 0.10, w: 1.6, h: 0.28,
        fontSize: 12, fontFace: FONT_B, color: C.SUCCESS, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      slide.addText("The tank IS a monster -- not \"like\" a monster (that would be a simile). Joey has never seen a tank, so to him it IS a monstrous creature.", {
        x: 2.5, y: ansY + 0.08, w: 6.8, h: 0.84,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "middle", margin: 0,
      });
      slide.addNotes(NOTES_CFU_DEVICES_REVEAL);
    }
  );

  // =========================================================================
  // SLIDE 16 -- Conjunctions: I Do (Modelling)
  // =========================================================================
  modellingSlide(
    pres,
    "I Do -- Watch Me",
    "Because, But, So -- Conjunctions",
    "Three conjunctions, three different jobs:\n\n\"Because\" -- tells us WHY\n(gives a reason)\n\n\"But\" -- shows a CHANGE\n(introduces a contrast)\n\n\"So\" -- shows a RESULT\n(what happens next)",
    "Sentence stem:\n\"Joey ran as far away as he could...\"\n\n...because he was terrified of the tank and wanted to find a place that was calm and safe.\n\n...but he still couldn't escape the war altogether.\n\n...so he found himself alone and injured in the dark.",
    NOTES_CONJ_IDO,
    FOOTER
  );

  // =========================================================================
  // SLIDES 17-18 -- Conjunctions: We Do (withReveal)
  // =========================================================================
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addBadge(s, "We Do", { color: C.SECONDARY });
      addTitle(s, "Your Turn -- Complete the Stem");

      // Sentence stem card
      addCard(s, 0.5, CONTENT_TOP, 9, 0.9, { fill: C.PRIMARY });
      s.addText("\"Joey ran as far away as he could...\"", {
        x: 0.75, y: CONTENT_TOP + 0.15, w: 8.4, h: 0.55,
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, italic: true, margin: 0,
        valign: "middle",
      });

      // Three conjunction cards
      const conjunctions = [
        { word: "BECAUSE", desc: "Give a reason -- WHY did Joey run?", color: C.PRIMARY },
        { word: "BUT", desc: "Change direction -- what worked AGAINST him?", color: C.SECONDARY },
        { word: "SO", desc: "Show the result -- what HAPPENED because he ran?", color: C.ACCENT },
      ];

      conjunctions.forEach((conj, i) => {
        const cy = CONTENT_TOP + 1.06 + i * 0.90;
        addCard(s, 0.5, cy, 9, 0.78, { strip: conj.color, fill: C.WHITE });
        s.addShape("roundRect", {
          x: 0.7, y: cy + 0.20, w: 1.6, h: 0.36, rectRadius: 0.08,
          fill: { color: conj.color },
        });
        s.addText(conj.word, {
          x: 0.7, y: cy + 0.20, w: 1.6, h: 0.36,
          fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
        s.addText(conj.desc, {
          x: 2.50, y: cy + 0.18, w: 6.5, h: 0.42,
          fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
        });
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_CONJ_WEDO);
      return s;
    },
    (slide) => {
      const examples = [
        { y: CONTENT_TOP + 1.06, text: "\"...because the metal monsters were getting closer and he could feel the ground shaking beneath him.\"" },
        { y: CONTENT_TOP + 1.96, text: "\"...but the darkness and barbed wire made every step more dangerous than the last.\"" },
        { y: CONTENT_TOP + 2.86, text: "\"...so he ended up lost and limping through no man's land as dawn began to break.\"" },
      ];
      examples.forEach((ex) => {
        slide.addShape("roundRect", {
          x: 2.45, y: ex.y + 0.12, w: 6.85, h: 0.54, rectRadius: 0.06,
          fill: { color: C.BG_LIGHT },
        });
        slide.addText(ex.text, {
          x: 2.55, y: ex.y + 0.14, w: 6.65, h: 0.50,
          fontSize: 12, fontFace: FONT_H, color: C.CHARCOAL, italic: true, valign: "middle", margin: 0,
        });
      });
      slide.addNotes(NOTES_CONJ_WEDO_REVEAL);
    }
  );

  // =========================================================================
  // SLIDE 19 -- Conjunctions: You Do
  // =========================================================================
  taskSlide(
    pres,
    "You Do",
    "Write Three Sentences",
    [
      { label: "First", instruction: "Write the stem and complete it with \"because\" -- explain WHY Joey ran." },
      { label: "Next", instruction: "Write the stem and complete it with \"but\" -- show a contrast or complication." },
      { label: "Then", instruction: "Write the stem and complete it with \"so\" -- show the result of his running." },
    ],
    NOTES_CONJ_YOUDO,
    FOOTER
  );

  // =========================================================================
  // SLIDE 20 -- Closing
  // =========================================================================
  closingSlide(
    pres,
    "What is one literary device or writing technique from today that you could use to make your own narrative writing stronger? Tell your partner which device and HOW you would use it.",
    [
      "I can identify a literary device from Chapter 15 and explain its effect",
      "I can write three sentences using because, but and so to extend a sentence stem",
      "I can explain how Joey's perspective shapes the way the battlefield is described",
    ],
    NOTES_CLOSING
  );

  // =========================================================================
  // SLIDE 21 -- Resources
  // =========================================================================
  const theme = { C, FONT_H, FONT_B, addTopBar, addTitle, addFooter, addCard };
  addResourceSlide(
    pres,
    RESOURCE_ITEMS,
    theme,
    FOOTER,
    NOTES_RESOURCES
  );

  // =========================================================================
  // Generate companion PDFs
  // =========================================================================

  // --- PDF 1: Because-But-So Worksheet ------------------------------------
  const ws = createPdf({ title: WORKSHEET_RESOURCE.name });
  let wsY = addPdfHeader(ws, "Because, But, So -- Sentence Building", {
    color: C.PRIMARY,
    subtitle: "Chapter 15: No Man's Land",
    lessonInfo: "War Horse | Lesson 18 | Week 4 | Year 5/6 Literacy",
    showNameDate: true,
  });

  wsY = addTipBox(ws, "Read the sentence stem, then complete it three different ways using the conjunctions below. Each conjunction does a different job -- make sure your completions are genuinely different from each other!", wsY, { color: C.PRIMARY });

  wsY = addSectionHeading(ws, "Sentence Stem", wsY, { color: C.PRIMARY });
  wsY = addBodyText(ws, "\"Joey ran as far away as he could...\"", wsY, { fontSize: 14, italic: true });
  wsY += 8;

  // Because section
  wsY = addSectionHeading(ws, "1. BECAUSE -- Give a reason (WHY did Joey run?)", wsY, { color: C.PRIMARY });
  wsY = addBodyText(ws, "Joey ran as far away as he could because", wsY, { fontSize: 12 });
  wsY = addLinedArea(ws, wsY, 3, { lineSpacing: 26 });
  wsY += 8;

  // But section
  wsY = addSectionHeading(ws, "2. BUT -- Show a contrast (what worked AGAINST him?)", wsY, { color: C.SECONDARY });
  wsY = addBodyText(ws, "Joey ran as far away as he could but", wsY, { fontSize: 12 });
  wsY = addLinedArea(ws, wsY, 3, { lineSpacing: 26 });
  wsY += 8;

  // So section
  wsY = addSectionHeading(ws, "3. SO -- Show the result (what HAPPENED because he ran?)", wsY, { color: C.ACCENT });
  wsY = addBodyText(ws, "Joey ran as far away as he could so", wsY, { fontSize: 12 });
  wsY = addLinedArea(ws, wsY, 3, { lineSpacing: 26 });
  wsY += 12;

  // Challenge section
  wsY = addSectionHeading(ws, "CHALLENGE: Write Your Own!", wsY, { color: C.ALERT, fontSize: 14 });
  wsY = addTipBox(ws, "Choose your OWN sentence stem from Chapter 15 (e.g., \"The tanks rolled towards Joey...\" or \"Topthorn lay still on the ground...\"). Write it below, then complete it with all three conjunctions.", wsY, { color: C.ALERT });

  wsY = addBodyText(ws, "My sentence stem:", wsY, { fontSize: 11 });
  wsY = addLinedArea(ws, wsY, 1, { lineSpacing: 26 });
  wsY += 4;
  wsY = addBodyText(ws, "Because:", wsY, { fontSize: 11 });
  wsY = addLinedArea(ws, wsY, 2, { lineSpacing: 24 });
  wsY = addBodyText(ws, "But:", wsY, { fontSize: 11 });
  wsY = addLinedArea(ws, wsY, 2, { lineSpacing: 24 });
  wsY = addBodyText(ws, "So:", wsY, { fontSize: 11 });
  wsY = addLinedArea(ws, wsY, 2, { lineSpacing: 24 });

  addPdfFooter(ws, "War Horse | Lesson 18 | Because-But-So Worksheet");

  // --- PDF 2: Because-But-So Answer Key -----------------------------------
  const ak = createPdf({ title: ANSWER_KEY_RESOURCE.name });
  let akY = addPdfHeader(ak, "Because, But, So -- Answer Key", {
    color: C.ALERT,
    subtitle: "Teacher Reference -- Chapter 15: No Man's Land",
    lessonInfo: "War Horse | Lesson 18 | Week 4 | Year 5/6 Literacy",
    showNameDate: false,
  });

  akY = addTipBox(ak, "These are model answers. Accept any response that demonstrates correct use of the conjunction's function: \"because\" gives a reason, \"but\" introduces a contrast, \"so\" shows a result.", akY, { color: C.ALERT });

  akY = addSectionHeading(ak, "Sentence Stem: \"Joey ran as far away as he could...\"", akY, { color: C.PRIMARY });
  akY += 6;

  akY = addSectionHeading(ak, "1. BECAUSE", akY, { color: C.PRIMARY });
  akY = addBodyText(ak, "Model: \"...because he was terrified of the tank and wanted to find a place that was calm and safe.\"", akY);
  akY = addBodyText(ak, "Alternative: \"...because the ground was shaking and the monstrous machines were getting closer.\"", akY, { italic: true });
  akY = addBodyText(ak, "Alternative: \"...because every instinct told him to escape from the noise and the smoke.\"", akY, { italic: true });
  akY += 8;

  akY = addSectionHeading(ak, "2. BUT", akY, { color: C.SECONDARY });
  akY = addBodyText(ak, "Model: \"...but he still couldn't escape the war altogether.\"", akY);
  akY = addBodyText(ak, "Alternative: \"...but his leg caught on barbed wire and pain shot through his body.\"", akY, { italic: true });
  akY = addBodyText(ak, "Alternative: \"...but the explosions followed him no matter which direction he turned.\"", akY, { italic: true });
  akY += 8;

  akY = addSectionHeading(ak, "3. SO", akY, { color: C.ACCENT });
  akY = addBodyText(ak, "Model: \"...so he found himself alone and injured in the dark.\"", akY);
  akY = addBodyText(ak, "Alternative: \"...so he ended up in no man's land, the most dangerous place on the battlefield.\"", akY, { italic: true });
  akY = addBodyText(ak, "Alternative: \"...so by the time dawn broke, he was standing in the open between the two armies.\"", akY, { italic: true });
  akY += 12;

  akY = addSectionHeading(ak, "Common Errors to Watch For", akY, { color: C.ALERT });
  akY = addBodyText(ak, "- \"But\" sentences that don't actually change direction (e.g., \"...but he was very scared\" -- this is a reason, not a contrast)", akY);
  akY = addBodyText(ak, "- \"So\" sentences that give a reason instead of a result (e.g., \"...so he was frightened\" -- this explains why, not what happened)", akY);
  akY = addBodyText(ak, "- All three sentences saying essentially the same thing with different conjunctions", akY);
  akY = addBodyText(ak, "- Incomplete sentences or sentences that don't connect logically to the stem", akY);

  addPdfFooter(ak, "War Horse | Lesson 18 | Answer Key -- TEACHER COPY");

  // --- PDF 3: Literary Devices Reference Sheet ----------------------------
  const ld = createPdf({ title: REFERENCE_RESOURCE.name });
  let ldY = addPdfHeader(ld, "Literary Devices -- Reference Sheet", {
    color: C.ACCENT,
    subtitle: "Five devices from Chapter 15 of War Horse",
    lessonInfo: "War Horse | Lesson 18 | Year 5/6 Literacy",
    showNameDate: false,
  });

  ldY = addTipBox(ld, "Keep this sheet! Use it when you are writing your own narratives. Each device is a tool you can reach for to make your writing more powerful.", ldY, { color: C.ACCENT });

  // Simile
  ldY = addSectionHeading(ld, "1. Simile", ldY, { color: C.PRIMARY });
  ldY = addBodyText(ld, "Definition: A comparison between two things using \"like\" or \"as.\" Similes help the reader picture something unfamiliar by comparing it to something familiar.", ldY);
  ldY = addBodyText(ld, "Example from Chapter 15:", ldY, { fontSize: 10, color: "6B7B8B" });
  ldY = addBodyText(ld, "\"...leaving behind great craters that smoked as if the earth itself was on fire.\" (p. 118)", ldY, { italic: true });
  ldY = addBodyText(ld, "Effect: Makes the destruction feel enormous -- the whole earth seems to be burning, not just the ground.", ldY, { fontSize: 10 });
  ldY += 6;

  // Onomatopoeia
  ldY = addSectionHeading(ld, "2. Onomatopoeia", ldY, { color: C.SECONDARY });
  ldY = addBodyText(ld, "Definition: Words that imitate the sound they describe. Onomatopoeia makes the reader \"hear\" the scene.", ldY);
  ldY = addBodyText(ld, "Example from Chapter 15:", ldY, { fontSize: 10, color: "6B7B8B" });
  ldY = addBodyText(ld, "\"...the crump and whistle of the shells the whining sound of motors accompanied by a terrifying rattle of steel...\" (p. 119)", ldY, { italic: true });
  ldY = addBodyText(ld, "Effect: Puts us inside the battlefield -- we can hear the sounds Joey hears.", ldY, { fontSize: 10 });
  ldY += 6;

  // Metaphor
  ldY = addSectionHeading(ld, "3. Metaphor", ldY, { color: C.ACCENT });
  ldY = addBodyText(ld, "Definition: Saying something IS something else (without using \"like\" or \"as\"). Metaphors transform one thing into another in the reader's mind.", ldY);
  ldY = addBodyText(ld, "Example from Chapter 15:", ldY, { fontSize: 10, color: "6B7B8B" });
  ldY = addBodyText(ld, "\"...a great grey lumbering monster that belched out smoke from behind as it rocked down the hillside towards me.\" (p. 119)", ldY, { italic: true });
  ldY = addBodyText(ld, "Effect: The tank becomes a monster. Because Joey doesn't know what a tank is, the metaphor shows us the world through his innocent, terrified eyes.", ldY, { fontSize: 10 });
  ldY += 6;

  // Check if we need a new page
  if (ldY > 680) {
    ld.addPage();
    ldY = 50;
  }

  // Personification
  ldY = addSectionHeading(ld, "4. Personification", ldY, { color: C.SUCCESS });
  ldY = addBodyText(ld, "Definition: Giving human qualities, actions, or emotions to something that is not human. Personification makes abstract ideas feel alive and physical.", ldY);
  ldY = addBodyText(ld, "Example from Chapter 15:", ldY, { fontSize: 10, color: "6B7B8B" });
  ldY = addBodyText(ld, "\"And then exhaustion finally overtook me, sapped the strength from my legs and forced me to lie down and sleep.\" (p. 120)", ldY, { italic: true });
  ldY = addBodyText(ld, "Effect: Exhaustion becomes a character that defeats Joey -- it \"overtook,\" \"sapped,\" and \"forced\" him. This makes tiredness feel like a physical enemy.", ldY, { fontSize: 10 });
  ldY += 6;

  // Repetition
  ldY = addSectionHeading(ld, "5. Repetition", ldY, { color: C.ASSESS });
  ldY = addBodyText(ld, "Definition: Deliberately repeating a word or phrase to emphasise an idea, create rhythm, or build emotion.", ldY);
  ldY = addBodyText(ld, "Example from Chapter 15:", ldY, { fontSize: 10, color: "6B7B8B" });
  ldY = addBodyText(ld, "\"...I shall never know. ... He would know ... He would know.\" (p. 121)", ldY, { italic: true });
  ldY = addBodyText(ld, "Effect: The repeated \"He would know\" shows how deeply Joey trusts Albert, even in his darkest moment. The repetition makes Joey's faith feel absolute and unshakeable.", ldY, { fontSize: 10 });
  ldY += 14;

  // Quick reference table
  ldY = addSectionHeading(ld, "Quick Reference", ldY, { color: C.PRIMARY, fontSize: 12 });
  ldY = addBodyText(ld, "Simile = comparison using \"like\" / \"as\"   |   Metaphor = IS something else (no like/as)", ldY, { fontSize: 10 });
  ldY = addBodyText(ld, "Onomatopoeia = sounds like what it means   |   Personification = human qualities for non-human things", ldY, { fontSize: 10 });
  ldY = addBodyText(ld, "Repetition = same words/phrases repeated for effect", ldY, { fontSize: 10 });

  addPdfFooter(ld, "War Horse | Lesson 18 | Literary Devices Reference Sheet");

  // --- Write all files ----------------------------------------------------
  await Promise.all([
    pres.writeFile({ fileName: `${OUT_DIR}/WH4_Lesson18.pptx` }),
    writePdf(ws, WORKSHEET_PDF_PATH),
    writePdf(ak, ANSWER_KEY_PDF_PATH),
    writePdf(ld, REFERENCE_PDF_PATH),
  ]);

  console.log("Done: WH4_Lesson18.pptx");
  console.log(`Done: ${WORKSHEET_RESOURCE.name}.pdf`);
  console.log(`Done: ${ANSWER_KEY_RESOURCE.name}.pdf`);
  console.log(`Done: ${REFERENCE_RESOURCE.name}.pdf`);
}

build().catch(console.error);
