"use strict";

// War Horse Unit — Lesson 18: Chapter 15 — No Man's Land
// Week 4, Grade 5/6 Literacy
// Chapter 15: Joey alone in No Man's Land — literary devices, perspective, conjunctions

const pptxgen = require("pptxgenjs");
const fs = require("fs");

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
  addResourceSlide,
} = require("../themes/pdf_helpers");

const FOOTER = "War Horse | Lesson 18 of 25 | Week 4 | Year 5/6 Literacy";
const OUT_DIR = "output/WH4_Lesson18_No_Mans_Land";
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ─────────────────────────────────────────────────────────────────────────────
// Teacher Notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `SAY:
\u2022 Welcome back to War Horse \u2014 we\u2019re continuing with Chapter 15 today
\u2022 Last lesson was incredibly emotional \u2014 Topthorn died, Friedrich was injured. Today Joey is completely alone for the first time
\u2022 This chapter is one of the most powerfully written in the whole book. Morpurgo uses almost every literary device we\u2019ve studied to put us inside Joey\u2019s experience
\u2022 We\u2019ll be reading Chapter 15, studying the devices Morpurgo uses, and then doing some sentence-level writing with conjunctions
\u2022 By the end of the lesson you\u2019ll be able to name and explain five different literary devices and use \u201Cbecause\u201D, \u201Cbut\u201D and \u201Cso\u201D to extend a sentence

DO:
\u2022 Have copies of War Horse on desks, bookmarked at Chapter 15 (p. 118)
\u2022 Display title slide as students settle
\u2022 Gauge the mood \u2014 some students may still be processing Topthorn\u2019s death from the previous lesson
\u2022 Set a calm, focused tone \u2014 this is an intense chapter but the lesson is designed to be engaging without being stressful

SENSITIVITY ADVISORY:
Joey is alone, injured, and terrified in a war zone. He is surrounded by explosions, dead bodies, and barbed wire. Some students may find this confronting, especially those with personal connections to war, loss, or separation anxiety. Monitor for signs of distress. Remind students that Joey survives \u2014 this is not a death scene. The previous lesson dealt with Topthorn\u2019s death, so emotional residue may carry over. Frame the chapter as Joey\u2019s courage and resilience, not his suffering.

TEACHER NOTES:
This is Lesson 18 of 25, the third lesson of Week 4. Chapter 15 is a literary goldmine \u2014 Morpurgo deploys simile, metaphor, onomatopoeia, personification, and repetition in concentrated form. This makes it ideal for explicit teaching of narrative devices, which connects directly to students\u2019 own narrative writing. The sentence-level focus on conjunctions (\u201Cbecause\u201D, \u201Cbut\u201D, \u201Cso\u201D) reinforces complex sentence construction \u2014 a skill that strengthens narrative writing fluency. VTLM 2.0: Establishing Purpose and Relevance.

WATCH FOR:
\u2022 Students who are emotionally affected by the content \u2014 validate their feelings, remind them that Joey survives
\u2022 Students who were absent last lesson and need a brief recap of Chapter 14 events
\u2022 Anxiety levels \u2014 keep the energy warm and supportive

[General: Title | VTLM 2.0: Establishing Purpose and Relevance]`;

const NOTES_LI_SC = `SAY:
\u2022 Five learning intentions today \u2014 let\u2019s read through them together
\u2022 First: comparing purposes for different texts \u2014 we\u2019re looking at WHY Morpurgo structures this chapter the way he does
\u2022 Second: questioning the assertions made by authors \u2014 what is Morpurgo choosing to show us and what is he leaving out?
\u2022 Third: analysing character attributes \u2014 Joey\u2019s courage, fear, resilience
\u2022 Fourth: identifying how perspective shapes our understanding \u2014 everything is through Joey\u2019s eyes. How does that change what we know?
\u2022 Fifth: varying sentence structures \u2014 we\u2019ll practise using \u201Cbecause\u201D, \u201Cbut\u201D and \u201Cso\u201D to extend sentences
\u2022 Read the success criteria together. Ask: Which of these feels most challenging? [Take 2\u20133 responses]

DO:
\u2022 Choral read LIs, then SCs
\u2022 Don\u2019t linger \u2014 students know the routine by Week 4
\u2022 Highlight SC2 (perspective) and SC3 (conjunctions) as the two biggest focuses today

PACING OVERVIEW:
\u2022 Title + LI/SC: 3 minutes
\u2022 Vocabulary (murky, vague, incidental list): 5 minutes
\u2022 Reading introduction + read aloud with pause points: 15 minutes
\u2022 Literary devices (3 slides): 8 minutes
\u2022 CFU \u2014 literary devices: 3 minutes
\u2022 Conjunctions I Do + We Do + You Do: 15 minutes
\u2022 Closing review: 3 minutes
\u2022 Total: ~52 minutes (adjust reading pace if needed)

TEACHER NOTES:
Five LIs is substantial but appropriate for a chapter this rich. The SCs are concrete and assessable. SC1 focuses on literary devices (analytical reading), SC2 on perspective (critical reading), and SC3 on sentence-level writing (composition). This creates a balanced lesson across comprehension and composition. The conjunction focus connects naturally to narrative writing \u2014 students need varied sentence structures in their own stories. VTLM 2.0: Clear Learning Intentions with Visible Success Criteria.

WATCH FOR:
\u2022 Students who feel overwhelmed by 5 LIs \u2014 reassure that several overlap and build on each other
\u2022 Students who are strong readers but weaker writers (or vice versa) \u2014 the lesson gives both groups opportunities to shine

[General: Learning Intentions | VTLM 2.0: Clear Learning Intentions]`;

const NOTES_VOCAB_MURKY = `SAY:
\u2022 Our first vocabulary word today is \u201Cmurky\u201D
\u2022 Choral read: murky
\u2022 Murky is an adjective \u2014 it means dark, gloomy, and hard to see through. Think of water you can\u2019t see the bottom of, or a night where the fog makes everything unclear
\u2022 In Chapter 15, Morpurgo writes about murky conditions \u2014 Joey can barely see where he\u2019s going. The battlefield is covered in smoke, mud, and darkness
\u2022 Listen to the example: \u201CThe murky water of the shell crater hid everything beneath its surface.\u201D
\u2022 Quick check: thumbs up if murky means clear and bright, thumbs down if it means dark and hard to see through [thumbs down]

DO:
\u2022 Display word, choral read, define, example
\u2022 Emphasise the sensory quality \u2014 murky is a word you can FEEL. It\u2019s heavy, uncertain, unsettling
\u2022 Connect to the chapter: murky describes the world Joey is stumbling through

TEACHER NOTES:
\u201CMurky\u201D is a Tier 2 word that appears in the chapter and carries significant atmospheric weight. Pre-teaching it before reading ensures students can process the descriptions without stopping to decode vocabulary. The word also has metaphorical potential \u2014 Joey\u2019s future is murky, his understanding of the war is murky. This semantic richness makes it worth explicit teaching. VTLM 2.0: Building Vocabulary and Background Knowledge.

MISCONCEPTIONS:
\u2022 Misconception: \u201CMurky\u201D only means dirty water
  Why: Students often encounter the word in the context of ponds or rivers
  Impact: Limits their ability to apply the word to non-water contexts (murky night, murky atmosphere)
  Quick correction: \u201CMurky can describe any situation where things are hard to see or understand \u2014 murky fog, murky darkness, even murky intentions\u201D

WATCH FOR:
\u2022 Students who confuse \u201Cmurky\u201D with \u201Cmucky\u201D (dirty) \u2014 clarify: murky is about visibility, mucky is about cleanliness
\u2022 Students who can\u2019t generate their own example \u2014 provide a sentence frame: \u201CThe ___ was so murky that ___\u201D

[General: I Do \u2014 Vocabulary | VTLM 2.0: Building Vocabulary and Background Knowledge]`;

const NOTES_VOCAB_VAGUE = `SAY:
\u2022 Second vocabulary word: \u201Cvague\u201D
\u2022 Choral read: vague
\u2022 Vague is also an adjective \u2014 it means unclear, not definite, hard to pin down. Something vague lacks detail or precision
\u2022 In Chapter 15, things are vague for Joey \u2014 shapes in the darkness, sounds he can\u2019t identify, directions he can\u2019t be sure of
\u2022 Listen: \u201CJoey could only make out vague shapes in the distance through the smoke and mist.\u201D
\u2022 Ask: How is \u201Cvague\u201D different from \u201Cmurky\u201D? [Murky is about the environment being hard to see through; vague is about the thing itself being unclear. You see through murky fog and what you see is vague]

DO:
\u2022 Display word, choral read, define, example
\u2022 Draw the distinction between murky (the medium) and vague (the object) \u2014 this sharpens both words
\u2022 Ask 2\u20133 students to use \u201Cvague\u201D in a sentence about today\u2019s chapter

TEACHER NOTES:
Teaching \u201Cvague\u201D alongside \u201Cmurky\u201D creates a productive comparison. Both relate to unclear perception, but operate differently: murky describes the environment or conditions, while vague describes what is perceived. This semantic distinction develops vocabulary precision \u2014 a hallmark of sophisticated writing. Students who can distinguish between near-synonyms write with greater specificity. VTLM 2.0: Building Vocabulary and Background Knowledge.

WATCH FOR:
\u2022 Students who treat \u201Cvague\u201D and \u201Cmurky\u201D as identical \u2014 reinforce the distinction
\u2022 Students who use \u201Cvague\u201D only about people (\u201Che was being vague\u201D) \u2014 extend to visual and physical contexts

[General: I Do \u2014 Vocabulary | VTLM 2.0: Building Vocabulary and Background Knowledge]`;

const NOTES_INCIDENTAL = `SAY:
\u2022 Chapter 15 is packed with rich vocabulary. Here are the incidental words you\u2019ll encounter as we read
\u2022 You don\u2019t need to memorise definitions for all of these \u2014 but I want you to notice them as we read and use context clues to work out meanings
\u2022 Some of these are powerful words for your own narrative writing: \u201Cinexorably\u201D, \u201Csapped\u201D, \u201Cpulsated\u201D, \u201Cgingerly\u201D
\u2022 Ask: Can anyone already define one of these words? [Take 1\u20132 quick responses]
\u2022 We\u2019ll come back to any words that trip you up during reading

DO:
\u2022 Read through the list at a brisk pace \u2014 don\u2019t stop to define each one
\u2022 Point out 2\u20133 high-value words for narrative writing (inexorably, sapped, gingerly, pulsated)
\u2022 Encourage students to jot down any unfamiliar words during reading

TEACHER NOTES:
The incidental vocabulary list serves two purposes: it primes students to expect challenging words (reducing frustration during reading), and it signals which words are worth attending to. Not defining them here is deliberate \u2014 encountering them in context and using inference strategies is itself a comprehension skill. The words chosen are predominantly Tier 2 (general academic) with high transfer value to students\u2019 own narrative writing. VTLM 2.0: Building Vocabulary and Background Knowledge.

WATCH FOR:
\u2022 Students who are anxious about the number of unfamiliar words \u2014 reassure: context will help, and they won\u2019t be tested on all of them
\u2022 Strong readers who already know many \u2014 challenge them to notice HOW Morpurgo uses each word for effect

[General: Vocabulary Preview | VTLM 2.0: Building Vocabulary and Background Knowledge]`;

const NOTES_READING_INTRO = `SAY:
\u2022 Chapter 15 picks up right where we left off. Remember: Topthorn has died, Friedrich has been injured. Joey is now completely alone
\u2022 This is the first time in the entire book that Joey has no companion \u2014 no Albert, no Topthorn, no Friedrich, no Emilie. He is utterly alone on a battlefield
\u2022 Today\u2019s reading is Student Read Aloud. I\u2019ll select readers for short passages, and we\u2019ll pause at three key moments to discuss
\u2022 As you listen, pay attention to the LANGUAGE Morpurgo uses. This chapter is incredibly rich with literary devices \u2014 similes, metaphors, personification, onomatopoeia, repetition. Your job is to notice them
\u2022 Pages 118 to 126 \u2014 open your books now

DO:
\u2022 Give students 30 seconds to find p. 118
\u2022 Select first reader \u2014 choose a confident, expressive reader for the opening section (the tank scene is dramatic)
\u2022 Plan reader rotations: change every half-page or at natural pause points
\u2022 Have pause point slides ready to display at the right moments

SENSITIVITY ADVISORY:
The chapter describes Joey running through a battlefield at night. He encounters dead bodies, barbed wire that cuts his leg, explosions, and the terror of being alone in No Man\u2019s Land. While the narration is through Joey\u2019s animal perspective (which creates some emotional distance), the content is still confronting. Monitor student reactions. If any student appears distressed, allow them to step back from reading and follow along silently. Frame Joey\u2019s journey as one of courage and survival, not suffering.

TEACHER NOTES:
Student Read Aloud is chosen deliberately for this chapter. The dramatic, sensory prose benefits from being heard aloud \u2014 the rhythm, the repetition, the building tension all come alive when spoken. Selecting confident readers for the most dramatic passages ensures the text is delivered with appropriate expression while supporting less confident readers who can listen and follow. Three pause points create natural comprehension checkpoints without breaking the narrative flow. VTLM 2.0: Structured Reading Practice.

WATCH FOR:
\u2022 Readers who rush through dramatic passages \u2014 coach: \u201CSlow down at the commas. Let the tension build.\u201D
\u2022 Students who lose their place \u2014 use finger tracking
\u2022 Emotional responses to the battlefield descriptions \u2014 normalise these: \u201CIf this makes you feel tense or sad, that\u2019s Morpurgo\u2019s writing doing exactly what it\u2019s supposed to do\u201D

[General: Reading Launch | VTLM 2.0: Structured Reading Practice]`;

const NOTES_PAUSE1 = `SAY:
\u2022 Stop here. Let\u2019s look at this quote carefully
\u2022 \u201CAnd then exhaustion finally overtook me, sapped the strength from my legs and forced me to lie down and sleep.\u201D
\u2022 What\u2019s happening in this moment? [Joey has been running, he\u2019s utterly exhausted, he collapses]
\u2022 Ask: What\u2019s unusual about the way Morpurgo describes exhaustion here? Think about what exhaustion is DOING in this sentence [Exhaustion is described as if it\u2019s a person \u2014 it \u201Covertook\u201D him, \u201Csapped\u201D his strength, \u201Cforced\u201D him. These are human actions]
\u2022 That\u2019s personification \u2014 giving human qualities to something non-human. Exhaustion becomes a character in the sentence, almost like an enemy that defeats Joey

DO:
\u2022 Display the quote, read aloud slowly with expression
\u2022 Give 15 seconds of think time before taking responses
\u2022 Use Cold Call for initial responses, then open to volunteers for the literary device identification
\u2022 Write \u201CPERSONIFICATION\u201D on the board and circle the key verbs: overtook, sapped, forced

TEACHER NOTES:
This is the first pause point and introduces personification in context. The power of this example is that exhaustion becomes an antagonist \u2014 it acts upon Joey with agency and force. This connects to the broader narrative technique of using language to create tension and empathy. Students should understand that personification doesn\u2019t just make writing \u201Cpretty\u201D \u2014 it changes how we experience the emotion. Writing tip for students\u2019 own narratives: personification makes abstract emotions (fear, exhaustion, loneliness) feel physical and immediate. VTLM 2.0: Teacher-Led Discussion / Comprehension Check.

WATCH FOR:
\u2022 Students who identify the quote as a simile (no comparison word) or metaphor (it\u2019s not saying exhaustion IS something else) \u2014 clarify: personification specifically gives human traits to non-human things
\u2022 Students who can\u2019t see the personification \u2014 ask: \u201CCan exhaustion actually grab you and force you? Can it make decisions? Those are human actions\u201D

[General: Pause Point 1 | VTLM 2.0: Teacher-Led Discussion]`;

const NOTES_PAUSE1_REVEAL = `SAY:
\u2022 Here\u2019s what\u2019s happening: Joey has run until his body simply cannot go any further. Exhaustion is personified as a force that physically defeats him
\u2022 Notice the three verbs: \u201Covertook\u201D \u2014 like a pursuer catching up; \u201Csapped\u201D \u2014 draining his energy; \u201Cforced\u201D \u2014 leaving him no choice
\u2022 This is personification at its most powerful. Morpurgo makes exhaustion feel like a physical enemy
\u2022 Think about how you could use this in your own narrative writing: instead of \u201CI was tired,\u201D you could write \u201CExhaustion grabbed me and dragged me to the ground\u201D

DO:
\u2022 Reveal the answer card and read through the analysis
\u2022 Pause on the narrative writing connection \u2014 this is directly transferable
\u2022 Continue reading from where you left off

[General: Pause Point 1 Reveal | VTLM 2.0: Teacher-Led Discussion]`;

const NOTES_PAUSE2 = `SAY:
\u2022 Pause here. Look at this line: \u201C\u2026and moving towards the darker more silent world ahead of me.\u201D
\u2022 What\u2019s going on? Where is Joey heading? [Away from the fighting, towards quiet \u2014 but also towards the unknown]
\u2022 Ask: What does \u201Cdarker more silent world\u201D suggest? [It could mean the quieter part of the battlefield, but it also sounds like death. Silence and darkness are often associated with death in literature]
\u2022 Is Morpurgo just describing the physical landscape, or is there something deeper here? [Both \u2014 the physical landscape mirrors Joey\u2019s emotional state. He\u2019s moving away from chaos but towards uncertainty]

DO:
\u2022 Display quote, read with a slow, quiet tone
\u2022 Use Think-Pair-Share: 30 seconds think, 60 seconds pair talk, then share
\u2022 Push students beyond literal interpretation \u2014 this is a metaphorical landscape
\u2022 Accept multiple valid interpretations

TEACHER NOTES:
This pause point develops inferential reading. The phrase \u201Cdarker more silent world\u201D operates on two levels: literal (the quieter side of the battlefield) and symbolic (potential death, isolation, the unknown). Morpurgo\u2019s genius is that both readings work simultaneously. Students who can hold dual meanings are developing sophisticated literary comprehension. This connects to LI4: identifying how perspective shapes understanding. Joey doesn\u2019t know where he\u2019s going \u2014 and neither do we. VTLM 2.0: Higher-Order Questioning / Comprehension.

WATCH FOR:
\u2022 Students who only offer the literal reading \u2014 prompt: \u201CWhat else could \u2018darker more silent\u2019 mean beyond just the physical darkness?\u201D
\u2022 Students who jump to \u201Che\u2019s going to die\u201D \u2014 gently redirect: \u201CWe don\u2019t know that yet. What we know is that the language creates a feeling of uncertainty\u201D

[General: Pause Point 2 | VTLM 2.0: Higher-Order Questioning]`;

const NOTES_PAUSE2_REVEAL = `SAY:
\u2022 Joey is moving away from the fighting but into complete uncertainty. He doesn\u2019t know what lies ahead
\u2022 The phrase \u201Cdarker more silent world\u201D works on two levels: the literal landscape and the emotional journey
\u2022 This is a moment of transition \u2014 Joey is leaving one kind of danger (explosions, tanks) and entering another (isolation, injury, the unknown)
\u2022 Notice how Morpurgo uses the word \u201Cworld\u201D \u2014 not \u201Cplace\u201D or \u201Carea.\u201D World suggests something vast, all-encompassing, overwhelming

DO:
\u2022 Reveal the answer card
\u2022 Highlight the dual-level reading \u2014 literal and symbolic
\u2022 Continue reading towards the chapter\u2019s climax

[General: Pause Point 2 Reveal | VTLM 2.0: Higher-Order Questioning]`;

const NOTES_PAUSE3 = `SAY:
\u2022 Final pause. \u201CThis was what the soldiers called \u2018no man\u2019s land.\u2019\u201D
\u2022 What do you think the author wants us to know? [Joey has ended up in the most dangerous place on the entire battlefield \u2014 the strip of land between the two opposing armies]
\u2022 Ask: Why is it called \u201Cno man\u2019s land\u201D? [Because no person can survive there \u2014 it belongs to nobody. It\u2019s the killing ground between the trenches]
\u2022 Ask: What\u2019s ironic about Joey being in no man\u2019s land? [He\u2019s not a man \u2014 he\u2019s a horse. But he\u2019s trapped in a place defined by human war. The name \u201Cno man\u2019s land\u201D excludes him by definition, yet he\u2019s the one suffering there]

DO:
\u2022 Display quote, let the weight of the moment settle
\u2022 Use Cold Call for initial responses
\u2022 Draw attention to the irony \u2014 this is a central theme of the book: animals caught in human conflicts
\u2022 This is the chapter\u2019s climax \u2014 give it the space it deserves

TEACHER NOTES:
This is the pivotal moment of the chapter and one of the most significant in the entire novel. Joey\u2019s presence in no man\u2019s land crystallises the book\u2019s central theme: the absurdity and cruelty of war, especially for the animals who had no choice in it. The term itself carries enormous historical weight \u2014 students studying WWI will encounter it in History. The irony (a horse in \u201Cno man\u2019s\u201D land) is both linguistic and thematic. This connects powerfully to LI2 (questioning authorial assertions) and LI4 (perspective). VTLM 2.0: Deep Comprehension / Critical Literacy.

WATCH FOR:
\u2022 Students who don\u2019t know what no man\u2019s land is \u2014 brief explanation: the strip between opposing trenches, constantly shelled, covered in barbed wire and craters
\u2022 Students who are moved by the moment \u2014 this is appropriate. Acknowledge it: \u201CThis is meant to make you feel something. That\u2019s the power of Morpurgo\u2019s writing\u201D

[General: Pause Point 3 | VTLM 2.0: Deep Comprehension / Critical Literacy]`;

const NOTES_PAUSE3_REVEAL = `SAY:
\u2022 Morpurgo wants us to understand that Joey has stumbled into the most dangerous place on the battlefield
\u2022 No man\u2019s land is the space between the British and German trenches \u2014 it\u2019s constantly being shelled by both sides
\u2022 The author is also making a larger point about the war itself: horses like Joey are caught in a conflict that isn\u2019t theirs. The very name \u2014 \u201Cno MAN\u2019s land\u201D \u2014 reminds us that Joey isn\u2019t a man. He doesn\u2019t understand sides or enemies
\u2022 This moment sets up what happens next in the novel \u2014 and it\u2019s one of the most famous scenes in the story

DO:
\u2022 Reveal the answer card
\u2022 Let this land \u2014 don\u2019t rush past it
\u2022 Transition to literary devices analysis: \u201CNow let\u2019s go back through the chapter and look at HOW Morpurgo created all that tension and emotion\u201D

[General: Pause Point 3 Reveal | VTLM 2.0: Deep Comprehension]`;

const NOTES_DEVICES_1 = `SAY:
\u2022 Now we\u2019re going to look at the specific literary devices Morpurgo uses in this chapter. There are SO many \u2014 this is one of the richest chapters in the book for literary techniques
\u2022 First: simile. A simile compares two things using \u201Clike\u201D or \u201Cas.\u201D Look at this example: \u201C\u2026leaving behind great craters that smoked as if the earth itself was on fire.\u201D
\u2022 What two things are being compared? [The smoking craters and the earth being on fire]
\u2022 What effect does this create? [It makes the destruction feel enormous \u2014 like the earth itself is being destroyed, not just the surface]
\u2022 Second: onomatopoeia. Words that sound like what they describe. Listen: \u201C\u2026the crump and whistle of the shells the whining sound of motors accompanied by a terrifying rattle of steel\u201D
\u2022 Can you hear the sounds? Crump, whistle, whining, rattle \u2014 Morpurgo is making us HEAR the battlefield
\u2022 This is why this chapter is so powerful. The devices don\u2019t just describe \u2014 they put us INSIDE the experience

DO:
\u2022 Display both examples clearly
\u2022 Read the onomatopoeia example aloud with emphasis on the sound words
\u2022 Have students identify the sound words by underlining in their books
\u2022 Ask: \u201CWhich is more effective at putting you in Joey\u2019s position \u2014 the simile or the onomatopoeia? Why?\u201D

TEACHER NOTES:
Pairing simile and onomatopoeia on one slide allows comparison of two different sensory strategies: simile creates visual imagery through comparison, while onomatopoeia creates auditory imagery through phonetic mimicry. Both are accessible devices for students to identify and use in their own writing. The examples chosen are particularly strong because they work together \u2014 the visual devastation (earth on fire) combined with the auditory assault (crump, whistle, rattle) creates a multisensory experience of the battlefield. This connects directly to narrative writing craft: strong writers engage multiple senses. VTLM 2.0: Explicit Teaching of Literary Devices.

MISCONCEPTIONS:
\u2022 Misconception: Any comparison is a simile
  Why: Students confuse simile with metaphor because both involve comparison
  Impact: Reduces precision in literary analysis and weakens their ability to discuss technique
  Quick correction: \u201CSimile always uses \u2018like\u2019 or \u2018as\u2019 to compare. If there\u2019s no \u2018like\u2019 or \u2018as,\u2019 it\u2019s a metaphor\u201D
\u2022 Misconception: Onomatopoeia is only words like \u201Cbang\u201D and \u201Cpop\u201D
  Why: Students learn onomatopoeia with obvious comic-book examples
  Impact: They miss subtler sound words like \u201Cwhining,\u201D \u201Crattle,\u201D \u201Ccrump\u201D
  Quick correction: \u201COnomatopoeia includes any word where the sound of the word suggests its meaning. \u2018Rattle\u2019 sounds rattly. \u2018Whistle\u2019 sounds like a whistle\u201D

WATCH FOR:
\u2022 Students who can identify the device but can\u2019t explain the EFFECT \u2014 push beyond identification: \u201CYes, it\u2019s a simile. Now: what does it make you feel or picture?\u201D
\u2022 Students who are strong at onomatopoeia but weak at simile (or vice versa) \u2014 note for differentiation

[General: I Do \u2014 Literary Devices | VTLM 2.0: Explicit Teaching]`;

const NOTES_DEVICES_2 = `SAY:
\u2022 Now metaphor. This chapter has THREE powerful metaphors, and they\u2019re all connected. Look at the first: \u201C\u2026a great grey lumbering monster that belched out smoke from behind as it rocked down the hillside towards me.\u201D
\u2022 What is Morpurgo describing? [A tank]
\u2022 But he doesn\u2019t call it a tank. Why? [Because Joey doesn\u2019t know what a tank is. He\u2019s never seen one. So he sees it as a monster]
\u2022 This is the power of perspective \u2014 because we\u2019re seeing through Joey\u2019s eyes, a tank BECOMES a monster
\u2022 Look at the second: the one monster becomes SEVERAL monsters, rolling \u201Cinexorably\u201D down towards him. The metaphor builds \u2014 one monster multiplies into many
\u2022 And the third: the entire experience is described as \u201Ca nightmare of agony, terror and loneliness.\u201D Joey\u2019s reality has become a nightmare \u2014 that\u2019s metaphor too
\u2022 Ask: What makes these metaphors so effective? [They show us the world through Joey\u2019s innocent eyes. He has no human words for tanks and war \u2014 he can only compare them to things he understands: monsters and nightmares]

DO:
\u2022 Display all three metaphor examples
\u2022 Read each one aloud with dramatic expression
\u2022 Draw explicit attention to PERSPECTIVE: these metaphors work BECAUSE they come from Joey\u2019s point of view
\u2022 Connect to LI4: perspective shapes understanding. The reader understands the battlefield differently because of Joey\u2019s innocence

TEACHER NOTES:
The three metaphors form a deliberate progression: single monster \u2192 multiple monsters \u2192 nightmare. This escalation mirrors Joey\u2019s increasing terror. The key pedagogical insight is that these metaphors are inseparable from perspective \u2014 a human narrator would call them tanks, but Joey\u2019s animal perspective transforms them into something primal and terrifying. This is Morpurgo\u2019s most sophisticated narrative technique: using the first-person animal voice to defamiliarise the familiar. Students who grasp this understand both metaphor AND authorial choice simultaneously. For narrative writing: encourage students to think about how their narrator\u2019s perspective shapes the metaphors they use. VTLM 2.0: Explicit Teaching / Deep Analysis.

MISCONCEPTIONS:
\u2022 Misconception: Metaphor and simile are the same thing
  Why: Both involve comparison; students haven\u2019t internalised the structural difference
  Impact: Imprecise literary analysis
  Quick correction: \u201CSimile says something is LIKE something else. Metaphor says something IS something else. The tank isn\u2019t \u2018like\u2019 a monster \u2014 to Joey, it IS a monster\u201D
\u2022 Misconception: The author is being \u201Cunrealistic\u201D by calling tanks \u201Cmonsters\u201D
  Why: Students apply their own knowledge (they know what tanks are) instead of adopting the narrator\u2019s perspective
  Impact: Misses the entire point of first-person narration
  Quick correction: \u201CRemember, Joey is a horse. He has NEVER seen a tank. What would YOU call a giant metal thing that belches smoke if you\u2019d never seen one before?\u201D

WATCH FOR:
\u2022 Students who can\u2019t distinguish metaphor from simile \u2014 reinforce: no \u201Clike\u201D or \u201Cas\u201D = metaphor
\u2022 Students who miss the perspective angle \u2014 ask: \u201CWould a human soldier describe the tank as a monster? Why does Joey?\u201D
\u2022 Students who are engaged by the monster imagery \u2014 channel this energy: \u201CThis is what great narrative writing does. It makes us see familiar things in unfamiliar ways\u201D

[General: I Do \u2014 Literary Devices Part 2 | VTLM 2.0: Explicit Teaching / Deep Analysis]`;

const NOTES_DEVICES_3 = `SAY:
\u2022 Two more devices. First, personification \u2014 we already met this at our first pause point. Here\u2019s the full example again: \u201CAnd then exhaustion finally overtook me, sapped the strength from my legs and forced me to lie down and sleep.\u201D
\u2022 Remember: exhaustion is given human actions \u2014 overtaking, sapping, forcing. It becomes a character that defeats Joey
\u2022 Second: repetition. Look at this: \u201C\u2026I shall never know. \u2026 He would know \u2026 He would know.\u201D
\u2022 Why does Morpurgo repeat \u201CHe would know\u201D? [To emphasise Joey\u2019s faith in Albert. Even in his darkest moment, Joey believes Albert would understand him. The repetition shows how deeply Joey clings to this belief]
\u2022 These five devices together \u2014 simile, onomatopoeia, metaphor, personification, repetition \u2014 are the toolkit Morpurgo uses to make this chapter so powerful
\u2022 Ask: Which device do you think is MOST effective in this chapter? Why? [Take 2\u20133 responses \u2014 no wrong answer here]

DO:
\u2022 Display both examples
\u2022 Reconnect the personification example to Pause Point 1 \u2014 students already analysed this
\u2022 For repetition, read the repeated phrase with emphasis: \u201CHe would know. He WOULD know.\u201D
\u2022 Ask students to hold up fingers for which device they find most effective (1=simile, 2=onomatopoeia, 3=metaphor, 4=personification, 5=repetition)

TEACHER NOTES:
Completing the five-device survey gives students a comprehensive analytical vocabulary for this chapter. Repetition is often undervalued as a literary device \u2014 students tend to see it as \u201Csloppy writing\u201D rather than a deliberate technique. Drawing attention to HOW repetition functions (emphasis, emotional weight, rhythm) reframes it as a sophisticated choice. The \u201Cmost effective device\u201D question has no right answer and promotes critical evaluation \u2014 students must justify their preference with textual reasoning. This is higher-order thinking (evaluation on Bloom\u2019s taxonomy). For narrative writing: encourage students to experiment with at least one of these devices in their own stories. VTLM 2.0: Explicit Teaching / Higher-Order Thinking.

WATCH FOR:
\u2022 Students who dismiss repetition as \u201Cboring\u201D or \u201Ca mistake\u201D \u2014 redirect: \u201CIf Morpurgo wrote it twice, he chose to. Why?\u201D
\u2022 Students who struggle with the preference question \u2014 scaffold: \u201CWhich one made you feel the most? Which one created the strongest picture in your mind?\u201D
\u2022 Students who are ready for extension \u2014 ask: \u201CCan you find another example of ANY of these devices in the chapter that we haven\u2019t discussed?\u201D

[General: I Do \u2014 Literary Devices Part 3 | VTLM 2.0: Explicit Teaching / Higher-Order Thinking]`;

const NOTES_CFU_DEVICES = `SAY:
\u2022 Time to check your understanding. I\u2019m going to show you a quote from Chapter 15 and I want you to identify which literary device it uses
\u2022 Write your answer on your whiteboard. Don\u2019t hold it up until I say
\u2022 Here\u2019s the quote: \u201C\u2026a great grey lumbering monster that belched out smoke\u2026\u201D Which device is this?
\u2022 Three, two, one \u2014 show me! [Scan boards]

DO:
\u2022 Use Show Me Boards (mini whiteboards)
\u2022 Students write the device name, hold boards face-down until the count
\u2022 Scan for: correct identification of METAPHOR
\u2022 If students write \u201Csimile\u201D \u2014 ask: \u201CIs there a \u2018like\u2019 or \u2018as\u2019?\u201D
\u2022 If students write \u201Cpersonification\u201D \u2014 ask: \u201CIs the tank being given human qualities, or is it being called something else entirely?\u201D

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
\u2022 \u201CWrite the name of the literary device on your board. Don\u2019t show me yet.\u201D
\u2022 \u201CThree, two, one \u2014 boards up!\u201D
\u2022 Scan all boards simultaneously
PROCEED (\u226580%): Most students correctly identify METAPHOR. Move to conjunction teaching.
PIVOT (<80%): Common errors: simile (no \u201Clike/as\u201D), personification (not giving human qualities, calling it a different thing). Reteach: revisit the metaphor vs simile distinction. \u201CA metaphor says something IS something else. This sentence says the tank IS a monster. No \u2018like\u2019 or \u2018as.\u2019 That\u2019s metaphor.\u201D Re-check with a second example: \u201Ccraters that smoked as if the earth was on fire\u201D [simile \u2014 \u201Cas if\u201D].

TEACHER NOTES:
Show Me Boards provide simultaneous, whole-class assessment data. The chosen example (tank as monster) is the most important metaphor in the chapter and directly tests the metaphor-simile distinction, which is the most common confusion point. Using a single, well-chosen example rather than multiple questions keeps the CFU focused and time-efficient. The PIVOT strategy uses a contrastive pair (metaphor vs simile) to sharpen the distinction if needed. VTLM 2.0: Formative Assessment / Checking for Understanding.

MISCONCEPTIONS:
\u2022 Misconception: If it describes something as another thing, it must be personification
  Why: Students overapply personification because they learned it first and it\u2019s the most memorable device
  Impact: Conflates two distinct devices; weakens analytical precision
  Quick correction: \u201CPersonification is specifically about giving HUMAN qualities to non-human things. A tank being called a monster isn\u2019t personification \u2014 a monster isn\u2019t human. It\u2019s metaphor: saying one thing IS another\u201D

WATCH FOR:
\u2022 Students who write nothing \u2014 they may be unsure. After the reveal, check if they now understand
\u2022 Students who write the correct answer but can\u2019t explain why \u2014 push for reasoning in the debrief
\u2022 Speed of response: students who answer quickly and correctly are ready for the extension work in the conjunction section

[General: CFU | VTLM 2.0: Formative Assessment]`;

const NOTES_CFU_DEVICES_REVEAL = `SAY:
\u2022 The answer is METAPHOR. The tank is described as a monster \u2014 not \u201Clike a monster\u201D (that would be a simile), but AS a monster
\u2022 Remember: metaphor says something IS something else. Simile says something is LIKE something else
\u2022 If you got it right, well done. If you wrote simile or personification, you were close \u2014 now you know the distinction
\u2022 Let\u2019s move on to our sentence-level writing focus

DO:
\u2022 Reveal the answer
\u2022 Brief whole-class acknowledgement
\u2022 Transition to conjunction teaching

[General: CFU Reveal | VTLM 2.0: Formative Assessment]`;

const NOTES_CONJ_IDO = `SAY:
\u2022 We\u2019re shifting gears now to sentence-level writing. Today we\u2019re revising three important conjunctions: \u201Cbecause,\u201D \u201Cbut,\u201D and \u201Cso\u201D
\u2022 These aren\u2019t new to you, but using them WELL is what makes the difference between simple and sophisticated writing
\u2022 Look at the left side: each conjunction does a different job
\u2022 \u201CBecause\u201D tells us WHY something is true \u2014 it gives a reason
\u2022 \u201CBut\u201D shows a CHANGE IN DIRECTION \u2014 something unexpected or contrasting
\u2022 \u201CSo\u201D shows a RESULT \u2014 what happens because of something else
\u2022 Now watch me. I\u2019m going to take the sentence stem \u201CJoey ran as far away as he could\u201D and complete it three different ways
\u2022 BECAUSE: \u201CJoey ran as far away as he could BECAUSE he was terrified of the tank and wanted to find a place that was calm and safe.\u201D See how \u201Cbecause\u201D explains WHY he ran?
\u2022 BUT: \u201CJoey ran as far away as he could BUT he still couldn\u2019t escape the war altogether.\u201D See how \u201Cbut\u201D changes direction? We expect running away to solve the problem, but it doesn\u2019t
\u2022 SO: \u201CJoey ran as far away as he could SO he found himself alone and injured in the dark.\u201D See how \u201Cso\u201D shows the result? The running led to this outcome

DO:
\u2022 Display the three conjunction types on the left, teacher models on the right
\u2022 Read each model sentence aloud with emphasis on the conjunction
\u2022 After each model, pause and explicitly name what the conjunction does: \u201CThat\u2019s \u2018because\u2019 giving a reason. That\u2019s \u2018but\u2019 showing a contrast. That\u2019s \u2018so\u2019 showing a result.\u201D
\u2022 Think aloud: verbalise your decision-making process. \u201CI chose \u2018because\u2019 first because I want to explain Joey\u2019s motivation. I chose \u2018but\u2019 next because I want to show that running away didn\u2019t fully solve the problem. I chose \u2018so\u2019 last because I want to show the consequence.\u201D

TEACHER NOTES:
This I Do follows the Gradual Release of Responsibility model. The think-aloud is critical \u2014 students need to see not just the finished product but the THINKING behind each choice. By modelling all three conjunctions with the same sentence stem, students can directly compare how each conjunction changes the sentence\u2019s meaning and direction. This connects naturally to narrative writing: skilled writers choose conjunctions deliberately to control the reader\u2019s understanding. \u201CBecause\u201D deepens, \u201Cbut\u201D surprises, \u201Cso\u201D propels. VTLM 2.0: Explicit Teaching / Modelling / Think-Aloud.

WATCH FOR:
\u2022 Students who tune out during modelling \u2014 re-engage: \u201CWhich conjunction would YOU have chosen first? Why?\u201D
\u2022 Students who don\u2019t see the difference between the three completions \u2014 ask: \u201CDoes each sentence take you in the same direction? Which one surprises you?\u201D
\u2022 Students who are already confident with conjunctions \u2014 pre-load the challenge: \u201CIn the You Do, I\u2019m going to ask you to write your OWN sentence stem too\u201D

[General: I Do \u2014 Modelling | VTLM 2.0: Explicit Teaching / Modelling]`;

const NOTES_CONJ_WEDO = `SAY:
\u2022 Your turn to try with me. Same sentence stem: \u201CJoey ran as far away as he could\u2026\u201D
\u2022 This time I want YOU to complete it with \u201Cbecause.\u201D Remember: \u201Cbecause\u201D tells us WHY
\u2022 Turn to your partner. You have 30 seconds. Complete the sentence with \u201Cbecause\u201D
\u2022 [After 30 seconds] Let\u2019s hear some. [Cold Call 2\u20133 pairs]
\u2022 Now try \u201Cbut\u201D \u2014 remember, \u201Cbut\u201D changes direction. 30 seconds with your partner
\u2022 [Cold Call 2\u20133 pairs]
\u2022 Now \u201Cso\u201D \u2014 \u201Cso\u201D shows a result. 30 seconds
\u2022 [Cold Call 2\u20133 pairs]

DO:
\u2022 Display the sentence stem with the conjunction
\u2022 Time each round strictly \u2014 30 seconds is enough for oral composition
\u2022 Cold Call 2\u20133 pairs for each conjunction
\u2022 Provide specific praise: \u201CI like how you used a detail from the chapter in your reason\u201D or \u201CThat\u2019s a great contrast \u2014 your \u2018but\u2019 really changed direction\u201D
\u2022 Correct misconceptions in real time: \u201CThat sounds more like a \u2018because\u2019 sentence than a \u2018but\u2019 sentence. Can you revise?\u201D

ENABLING & EXTENDING:
\u2022 Enabling: Provide sentence starters after the conjunction: \u201CJoey ran as far away as he could because he was scared of\u2026\u201D
\u2022 Extending: Challenge students to use a literary device in their completion: \u201CJoey ran as far away as he could but exhaustion overtook him like a shadow\u201D (combining conjunction with simile)

TEACHER NOTES:
The We Do uses pair work with Cold Call to maintain accountability. Doing all three conjunctions in quick succession (30 seconds each) maintains pace and allows direct comparison. Cold Call ensures representative sampling \u2014 not just the confident volunteers. This bridges the gap between the I Do model and independent writing. The key pedagogical move is providing real-time corrective feedback: if a student\u2019s \u201Cbut\u201D sentence doesn\u2019t actually change direction, naming that explicitly builds metalinguistic awareness. VTLM 2.0: Guided Practice / We Do / Formative Feedback.

WATCH FOR:
\u2022 Students who write \u201Cbecause\u201D sentences for all three conjunctions (all give reasons) \u2014 they don\u2019t understand the functional difference
\u2022 Students who can do \u201Cbecause\u201D and \u201Cso\u201D but struggle with \u201Cbut\u201D \u2014 \u201Cbut\u201D requires thinking against the expected direction, which is cognitively harder
\u2022 Pairs where one partner dominates \u2014 require both partners to contribute: \u201CPartner A says the \u2018because\u2019 sentence, Partner B says the \u2018but\u2019 sentence\u201D

[General: We Do | VTLM 2.0: Guided Practice]`;

const NOTES_CONJ_WEDO_REVEAL = `SAY:
\u2022 Great work. Here are some strong examples. Notice how each conjunction takes the sentence in a completely different direction
\u2022 \u201CBecause\u201D gives us the reason \u2014 the WHY behind Joey\u2019s action
\u2022 \u201CBut\u201D introduces a twist or complication \u2014 something that works against the action
\u2022 \u201CSo\u201D shows the consequence \u2014 what happened AS A RESULT
\u2022 This is exactly the kind of sentence variety that makes narrative writing powerful. In your own stories, choosing the right conjunction controls how the reader experiences the story

DO:
\u2022 Display strong student examples (or teacher alternatives if needed)
\u2022 Reinforce the function of each conjunction one final time before You Do

[General: We Do Reveal | VTLM 2.0: Guided Practice]`;

const NOTES_CONJ_YOUDO = `SAY:
\u2022 Now it\u2019s your turn to write independently. You\u2019re going to write THREE sentences in your book
\u2022 First: write the sentence stem \u201CJoey ran as far away as he could\u201D and complete it with \u201Cbecause\u201D
\u2022 Next: write the same stem and complete it with \u201Cbut\u201D
\u2022 Then: write the same stem and complete it with \u201Cso\u201D
\u2022 Remember: each conjunction does a different job. Make sure your completions are DIFFERENT from each other, not just the same idea with a different conjunction
\u2022 You have 5 minutes. If you finish early, there\u2019s a challenge on the worksheet: write your OWN sentence stem from Chapter 15 and complete it with all three conjunctions

DO:
\u2022 Distribute the Because-But-So Worksheet
\u2022 Set a 5-minute timer visible on the board
\u2022 Circulate and monitor \u2014 spend time with students who struggled during the We Do
\u2022 Provide targeted feedback: check that \u201Cbut\u201D sentences actually change direction and \u201Cso\u201D sentences show results
\u2022 For early finishers, direct them to the challenge section on the worksheet
\u2022 At the 4-minute mark, give a time warning

ENABLING & EXTENDING:
\u2022 Enabling: Students who are stuck can refer to the teacher models on the previous slide (keep it visible or have it printed). Sentence frames available: \u201CJoey ran as far away as he could because he felt\u2026\u201D
\u2022 Extending: Write your own sentence stem from Chapter 15 (e.g., \u201CTopthorn lay still on the ground\u2026\u201D or \u201CThe tanks rolled towards Joey\u2026\u201D) and complete it with all three conjunctions. Then: can you add a literary device to any of your sentences?

TEACHER NOTES:
The You Do is the independent practice phase of the GRR model. Students write in their books AND on the worksheet, creating a record they can reference in future writing lessons. The 5-minute time limit maintains urgency and prevents overthinking. Circulating during this phase is the most valuable assessment opportunity in the lesson \u2014 you can see exactly which students understand the functional difference between conjunctions and which are still treating them as interchangeable. The challenge extension (writing their own stem) elevates the task from application to creation on Bloom\u2019s taxonomy. VTLM 2.0: Independent Practice / You Do.

WATCH FOR:
\u2022 Students who write the same completion for all three (just changing the conjunction) \u2014 they don\u2019t understand that each conjunction changes the meaning. Intervention: \u201CRead your three sentences aloud. Do they take you in three different directions?\u201D
\u2022 Students who rush and write incomplete sentences \u2014 quality over speed: \u201CYour completion should be at least 8\u201310 words\u201D
\u2022 Students who struggle to start \u2014 scaffold: \u201CTell me out loud: why did Joey run? Now write that after \u2018because.\u2019\u201D
\u2022 Strong writers who attempt the challenge \u2014 check that their self-selected stem is genuinely from Chapter 15 and that their completions demonstrate the three different functions

[General: You Do | VTLM 2.0: Independent Practice]`;

const NOTES_CLOSING = `SAY:
\u2022 Let\u2019s review our success criteria before we finish
\u2022 SC1: Can you identify and explain how Morpurgo uses simile, onomatopoeia, metaphor, personification, and repetition? Show me a thumbs up, sideways, or down [scan]
\u2022 SC2: Can you analyse how Joey\u2019s perspective shapes the reader\u2019s understanding? Think about the tank as a monster \u2014 that only works because we\u2019re seeing through Joey\u2019s eyes. Thumbs? [scan]
\u2022 SC3: Can you write three different sentences using \u201Cbecause,\u201D \u201Cbut,\u201D and \u201Cso\u201D? Thumbs? [scan]
\u2022 Turn and talk: What is one thing from today\u2019s lesson that you could use to make your own narrative writing stronger?
\u2022 [30 seconds pair talk, then 2\u20133 Cold Call responses]
\u2022 What a chapter. Joey is alone in no man\u2019s land \u2014 and we\u2019ll find out what happens next time

DO:
\u2022 Run through each SC with the self-assessment thumbs check
\u2022 Record any students who are \u201Cdown\u201D on any SC for follow-up
\u2022 Use the turn-and-talk to end on a positive, forward-looking note
\u2022 Preview next lesson: \u201CNext time, we find out what happens to Joey in no man\u2019s land. It\u2019s one of the most famous scenes in the entire book.\u201D
\u2022 Collect worksheets if needed, or have students store in their writing folders

TEACHER NOTES:
The closing slide creates a formative feedback loop by returning to the success criteria. Thumbs up/sideways/down gives you a quick read on class confidence. The turn-and-talk reflection question is deliberately focused on TRANSFER: \u201Cwhat could you use in your own writing?\u201D This bridges comprehension and composition, reinforcing that reading and writing are reciprocal processes. The chapter cliffhanger (Joey in no man\u2019s land) creates narrative anticipation for the next lesson. VTLM 2.0: Review and Reflect / Formative Feedback Loop.

WATCH FOR:
\u2022 Students who are \u201Cthumbs down\u201D on SC1 (literary devices) \u2014 these students may need a small-group reteach or the Literary Devices Reference Sheet
\u2022 Students who can\u2019t articulate a writing transfer \u2014 prompt: \u201CWhich device did you find most interesting? Could you use it in a story?\u201D
\u2022 Students who are emotionally engaged with the cliffhanger \u2014 encourage this: \u201CHold that curiosity. We\u2019ll need it next lesson.\u201D

[General: Closing | VTLM 2.0: Review and Reflect]`;

const NOTES_RESOURCES = `SAY:
\u2022 Three printable resources for today\u2019s lesson
\u2022 The Because-But-So Worksheet is for the You Do activity
\u2022 The Answer Key is for your reference \u2014 multiple valid answers are included
\u2022 The Literary Devices Reference Sheet is a student keepsake \u2014 they can use it when writing their own narratives

DO:
\u2022 Print the worksheet before the lesson (one per student)
\u2022 Print the answer key (teacher copy only)
\u2022 Print the reference sheet (one per student) \u2014 consider printing on card stock if available
\u2022 Click any resource card to open the PDF

TEACHER NOTES:
The reference sheet serves a dual purpose: it reinforces today\u2019s learning and provides a lasting writing tool. Students who struggle with literary devices in their own writing can refer back to the Chapter 15 examples as models. The worksheet design deliberately separates the three conjunctions into distinct sections to reinforce their different functions. The challenge section extends capable students without requiring additional teacher input.

[General: Resources | VTLM 2.0: Student Resources]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Claude";
  pres.title = "War Horse - Lesson 18 - Chapter 15: No Man\u2019s Land";

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ═══════════════════════════════════════════════════════════════════════════
  titleSlide(
    pres,
    "War Horse",
    "Chapter 15 \u2014 No Man\u2019s Land",
    "Lesson 18  |  Week 4  |  Year 5/6 Literacy",
    NOTES_TITLE
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — Learning Intentions & Success Criteria
  // ═══════════════════════════════════════════════════════════════════════════
  liSlide(
    pres,
    [
      "Compare purposes for different texts and consider why authors and illustrators have structured texts in particular ways",
      "Question the assertions made by authors when engaging with print and digital texts",
      "Analyse attributes of character",
      "Identify how perspective is made evident through authorial choices",
      "Vary sentence structures or lengths when using simple, compound and complex sentences, with a focus on achieving clarity and effect suited to text purpose",
    ],
    [
      "I can identify and explain how the author uses simile, onomatopoeia, metaphor, personification and repetition to create tension and emotion",
      "I can analyse how Joey\u2019s perspective shapes the reader\u2019s understanding of the battlefield",
      "I can write three different sentences using \u201Cbecause\u201D, \u201Cbut\u201D and \u201Cso\u201D to extend a sentence stem",
    ],
    NOTES_LI_SC,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — Vocabulary: murky
  // ═══════════════════════════════════════════════════════════════════════════
  vocabSlide(
    pres,
    "murky",
    "adjective",
    "Dark, gloomy, and difficult to see through. Often describes water, air, or conditions where visibility is poor and the atmosphere feels heavy and uncertain.",
    "The murky water of the shell crater hid everything beneath its surface.",
    NOTES_VOCAB_MURKY,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — Vocabulary: vague
  // ═══════════════════════════════════════════════════════════════════════════
  vocabSlide(
    pres,
    "vague",
    "adjective",
    "Unclear, not definite or precise. Something vague lacks detail, making it hard to understand, identify, or describe with certainty.",
    "Joey could only make out vague shapes in the distance through the smoke and mist.",
    NOTES_VOCAB_VAGUE,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 5 — Incidental Vocabulary
  // ═══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres,
    "Vocabulary",
    C.SECONDARY,
    "Incidental Vocabulary \u2014 Chapter 15",
    [
      "briefly \u2014 for a short time",
      "compelled \u2014 forced or driven to do something",
      "belched \u2014 sent out forcefully (smoke, fire)",
      "inexorably \u2014 in a way that cannot be stopped or prevented",
      "sapped \u2014 gradually drained of strength or energy",
      "intermittent \u2014 stopping and starting at irregular intervals",
      "stagnant \u2014 not flowing; still and often foul-smelling",
      "lumbered \u2014 moved heavily and clumsily",
      "pulsated \u2014 throbbed or beat with a strong, regular rhythm",
      "contemplate \u2014 to think about something deeply",
      "urgent \u2014 requiring immediate action or attention",
      "gingerly \u2014 in a careful, cautious way",
      "vast \u2014 extremely large or wide in area or scope",
    ],
    NOTES_INCIDENTAL,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 6 — Reading Introduction
  // ═══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres,
    "Read Aloud",
    C.PRIMARY,
    "Chapter 15 \u2014 Pages 118\u2013126",
    [
      "Reading Mode: Student Read Aloud",
      "Previously: Topthorn died. Friedrich was injured. Joey is now alone for the first time",
      "Chapter 15: Joey is startled by tanks \u2014 machines he has never seen before",
      "He runs in terror through the darkness, injuring his leg on barbed wire",
      "Joey searches desperately for somewhere peaceful, away from the shelling",
      "As dawn approaches, he realises he is in no man\u2019s land \u2014 the most dangerous place on the battlefield",
      "Focus: Notice the literary devices Morpurgo uses to put us inside Joey\u2019s experience",
    ],
    NOTES_READING_INTRO,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 7-8 — Pause Point 1 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 1", "Chapter 15 \u2014 p. 120",
      "And then exhaustion finally overtook me, sapped the strength from my legs and forced me to lie down and sleep.",
      "p. 120",
      "What\u2019s happening? Look at how exhaustion is described \u2014 what is unusual about this sentence?",
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
      slide.addText("Exhaustion is personified \u2014 given human actions: it \u201Covertook\u201D Joey, \u201Csapped\u201D his strength, and \u201Cforced\u201D him to sleep. Exhaustion becomes a character that physically defeats him. This makes the abstract feeling of tiredness concrete and dramatic.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
      slide.addNotes(NOTES_PAUSE1_REVEAL);
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 9-10 — Pause Point 2 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 2", "Chapter 15 \u2014 p. 123",
      "\u2026and moving towards the darker more silent world ahead of me.",
      "p. 123",
      "What\u2019s going on? What does \u201Cdarker more silent world\u201D suggest about where Joey is heading?",
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
      slide.addText("Literal: Joey is moving away from the explosions towards a quieter part of the battlefield. Symbolic: \u201Cdarker more silent world\u201D echoes death, isolation, and the unknown. Morpurgo\u2019s language works on two levels \u2014 describing the physical landscape AND Joey\u2019s emotional journey into uncertainty.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
      slide.addNotes(NOTES_PAUSE2_REVEAL);
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 11-12 — Pause Point 3 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 3", "Chapter 15 \u2014 p. 126",
      "This was what the soldiers called \u2018no man\u2019s land.\u2019",
      "p. 126",
      "What do you think the author wants us to know? What is \u201Cno man\u2019s land\u201D and why is it significant that Joey is there?",
      NOTES_PAUSE3, FOOTER
    ),
    (slide) => {
      const ansY = 3.62;
      slide.addShape("roundRect", {
        x: 0.5, y: ansY, w: 9, h: 1.38, rectRadius: 0.10,
        fill: { color: C.SUCCESS },
      });
      slide.addText("Theme \u2014 Animals in Human Wars", {
        x: 0.75, y: ansY + 0.08, w: 5, h: 0.30,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      slide.addText("No man\u2019s land is the strip between opposing trenches \u2014 the most dangerous place on the battlefield. The irony: it\u2019s called \u201Cno MAN\u2019s land\u201D but Joey, a horse, is the one trapped there. Morpurgo crystallises the novel\u2019s central theme: animals suffer in wars they did not choose and cannot understand.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
      slide.addNotes(NOTES_PAUSE3_REVEAL);
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 13 — Literary Devices Part 1: Simile + Onomatopoeia
  // ═══════════════════════════════════════════════════════════════════════════
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
    s.addText("A comparison using \u201Clike\u201D or \u201Cas\u201D", {
      x: 1.95, y: CONTENT_TOP + 0.10, w: 4, h: 0.30,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    s.addText("\u201C\u2026leaving behind great craters that smoked as if the earth itself was on fire.\u201D (p. 118)", {
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
    s.addText("\u201C\u2026I heard through the crump and whistle of the shells the whining sound of motors accompanied by a terrifying rattle of steel that set my ears back against my head.\u201D (p. 119)", {
      x: 0.75, y: onoY + 0.55, w: 8.4, h: 1.0,
      fontSize: 15, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_DEVICES_1);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 14 — Literary Devices Part 2: Metaphor (tanks as monsters)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addBadge(s, "Literary Devices", { color: C.ACCENT, w: 2.0 });
    addTitle(s, "Metaphor \u2014 Tanks as Monsters");

    // Metaphor 1
    addCard(s, 0.5, CONTENT_TOP, 9, 1.05, { strip: C.PRIMARY, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.7, y: CONTENT_TOP + 0.08, w: 1.5, h: 0.26, rectRadius: 0.08,
      fill: { color: C.PRIMARY },
    });
    s.addText("Metaphor 1", {
      x: 0.7, y: CONTENT_TOP + 0.08, w: 1.5, h: 0.26,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("\u201C\u2026a great grey lumbering monster that belched out smoke from behind as it rocked down the hillside towards me.\u201D (p. 119)", {
      x: 0.75, y: CONTENT_TOP + 0.42, w: 8.4, h: 0.55,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Metaphor 2
    const m2Y = CONTENT_TOP + 1.17;
    addCard(s, 0.5, m2Y, 9, 1.05, { strip: C.SECONDARY, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.7, y: m2Y + 0.08, w: 1.5, h: 0.26, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    });
    s.addText("Metaphor 2", {
      x: 0.7, y: m2Y + 0.08, w: 1.5, h: 0.26,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("\u201C\u2026the one monster had become several monsters and they were rolling inexorably down towards me\u2026\u201D (p. 119)", {
      x: 0.75, y: m2Y + 0.42, w: 8.4, h: 0.55,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Metaphor 3
    const m3Y = CONTENT_TOP + 2.34;
    addCard(s, 0.5, m3Y, 9, 1.05, { strip: C.ALERT, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.7, y: m3Y + 0.08, w: 1.5, h: 0.26, rectRadius: 0.08,
      fill: { color: C.ALERT },
    });
    s.addText("Metaphor 3", {
      x: 0.7, y: m3Y + 0.08, w: 1.5, h: 0.26,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("\u201C\u2026a nightmare of agony, terror and loneliness.\u201D (p. 122)", {
      x: 0.75, y: m3Y + 0.42, w: 8.4, h: 0.55,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Perspective note at bottom
    const noteY = CONTENT_TOP + 3.51;
    if (noteY + 0.30 <= SAFE_BOTTOM) {
      s.addText("Joey doesn\u2019t know what tanks are \u2014 so to him, they ARE monsters. Perspective shapes metaphor.", {
        x: 0.75, y: noteY, w: 8.5, h: 0.30,
        fontSize: 12, fontFace: FONT_B, color: C.ACCENT, bold: true, italic: true, margin: 0,
      });
    }

    addFooter(s, FOOTER);
    s.addNotes(NOTES_DEVICES_2);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 15 — Literary Devices Part 3: Personification + Repetition
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addBadge(s, "Literary Devices", { color: C.ACCENT, w: 2.0 });
    addTitle(s, "Personification & Repetition");

    // Personification card
    addCard(s, 0.5, CONTENT_TOP, 9, 1.7, { strip: C.SUCCESS, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.7, y: CONTENT_TOP + 0.10, w: 1.8, h: 0.30, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    });
    s.addText("Personification", {
      x: 0.7, y: CONTENT_TOP + 0.10, w: 1.8, h: 0.30,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Giving human qualities to non-human things", {
      x: 2.65, y: CONTENT_TOP + 0.10, w: 5, h: 0.30,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    s.addText("\u201CAnd then exhaustion finally overtook me, sapped the strength from my legs and forced me to lie down and sleep.\u201D (p. 120)", {
      x: 0.75, y: CONTENT_TOP + 0.55, w: 8.4, h: 1.0,
      fontSize: 15, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Repetition card
    const repY = CONTENT_TOP + 1.84;
    addCard(s, 0.5, repY, 9, 1.7, { strip: C.ASSESS, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.7, y: repY + 0.10, w: 1.4, h: 0.30, rectRadius: 0.08,
      fill: { color: C.ASSESS },
    });
    s.addText("Repetition", {
      x: 0.7, y: repY + 0.10, w: 1.4, h: 0.30,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Deliberately repeating words or phrases for emphasis", {
      x: 2.25, y: repY + 0.10, w: 5, h: 0.30,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    s.addText("\u201C\u2026I shall never know. \u2026 He would know \u2026 He would know.\u201D (p. 121)", {
      x: 0.75, y: repY + 0.55, w: 8.4, h: 1.0,
      fontSize: 15, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_DEVICES_3);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 16-17 — CFU: Literary Devices (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => cfuSlide(
      pres,
      "CFU",
      "Name That Device",
      "Show Me Boards",
      "\u201C\u2026a great grey lumbering monster that belched out smoke from behind as it rocked down the hillside towards me.\u201D\n\nWhich literary device is Morpurgo using here?\nWrite it on your whiteboard.",
      NOTES_CFU_DEVICES,
      FOOTER
    ),
    (slide) => {
      // Answer overlay
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
      slide.addText("The tank IS a monster \u2014 not \u201Clike\u201D a monster (that would be a simile). Joey has never seen a tank, so to him it IS a monstrous creature.", {
        x: 2.5, y: ansY + 0.08, w: 6.8, h: 0.84,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "middle", margin: 0,
      });
      slide.addNotes(NOTES_CFU_DEVICES_REVEAL);
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 18 — Conjunctions: I Do (Modelling)
  // ═══════════════════════════════════════════════════════════════════════════
  modellingSlide(
    pres,
    "I Do \u2014 Watch Me",
    "Because, But, So \u2014 Conjunctions",
    "Three conjunctions, three different jobs:\n\n\u201CBecause\u201D \u2014 tells us WHY\n(gives a reason)\n\n\u201CBut\u201D \u2014 shows a CHANGE\n(introduces a contrast)\n\n\u201CSo\u201D \u2014 shows a RESULT\n(what happens next)",
    "Sentence stem:\n\u201CJoey ran as far away as he could\u2026\u201D\n\n\u2026because he was terrified of the tank and wanted to find a place that was calm and safe.\n\n\u2026but he still couldn\u2019t escape the war altogether.\n\n\u2026so he found himself alone and injured in the dark.",
    NOTES_CONJ_IDO,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 19-20 — Conjunctions: We Do (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addBadge(s, "We Do", { color: C.SECONDARY });
      addTitle(s, "Your Turn \u2014 Complete the Stem");

      // Sentence stem card
      addCard(s, 0.5, CONTENT_TOP, 9, 0.9, { fill: C.PRIMARY });
      s.addText("\u201CJoey ran as far away as he could\u2026\u201D", {
        x: 0.75, y: CONTENT_TOP + 0.15, w: 8.4, h: 0.55,
        fontSize: 22, fontFace: FONT_H, color: C.WHITE, italic: true, margin: 0,
        valign: "middle",
      });

      // Three conjunction cards
      const conjunctions = [
        { word: "BECAUSE", desc: "Give a reason \u2014 WHY did Joey run?", color: C.PRIMARY },
        { word: "BUT", desc: "Change direction \u2014 what worked AGAINST him?", color: C.SECONDARY },
        { word: "SO", desc: "Show the result \u2014 what HAPPENED because he ran?", color: C.ACCENT },
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
      // Overlay example answers on top of the instruction text
      const examples = [
        { y: CONTENT_TOP + 1.06, text: "\u201C\u2026because the metal monsters were getting closer and he could feel the ground shaking beneath him.\u201D" },
        { y: CONTENT_TOP + 1.96, text: "\u201C\u2026but the darkness and barbed wire made every step more dangerous than the last.\u201D" },
        { y: CONTENT_TOP + 2.86, text: "\u201C\u2026so he ended up lost and limping through no man\u2019s land as dawn began to break.\u201D" },
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

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 21 — Conjunctions: You Do
  // ═══════════════════════════════════════════════════════════════════════════
  taskSlide(
    pres,
    "You Do",
    "Write Three Sentences",
    [
      { label: "First", instruction: "Write the stem and complete it with \u201Cbecause\u201D \u2014 explain WHY Joey ran." },
      { label: "Next", instruction: "Write the stem and complete it with \u201Cbut\u201D \u2014 show a contrast or complication." },
      { label: "Then", instruction: "Write the stem and complete it with \u201Cso\u201D \u2014 show the result of his running." },
    ],
    NOTES_CONJ_YOUDO,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 22 — Closing
  // ═══════════════════════════════════════════════════════════════════════════
  closingSlide(
    pres,
    "What is one literary device or writing technique from today that you could use to make your own narrative writing stronger? Tell your partner which device and HOW you would use it.",
    [
      "Morpurgo uses simile, metaphor, onomatopoeia, personification, and repetition to create tension",
      "Joey\u2019s perspective transforms tanks into monsters \u2014 point of view shapes meaning",
      "\u201CBecause,\u201D \u201Cbut,\u201D and \u201Cso\u201D each take a sentence in a different direction",
      "Strong narrative writing uses these tools deliberately, not accidentally",
    ],
    NOTES_CLOSING
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 23 — Resources
  // ═══════════════════════════════════════════════════════════════════════════
  const theme = { C, FONT_H, FONT_B, addTopBar, addTitle, addFooter, addCard };
  addResourceSlide(
    pres,
    [
      {
        name: "Because-But-So Worksheet",
        fileName: "WH4_L18_BBS_Worksheet.pdf",
        description: "Student worksheet: complete three sentences using because, but, and so. Includes challenge extension.",
      },
      {
        name: "Because-But-So Answer Key",
        fileName: "WH4_L18_BBS_AnswerKey.pdf",
        description: "Teacher reference: model answers with alternative valid completions.",
      },
      {
        name: "Literary Devices Reference Sheet",
        fileName: "WH4_L18_Literary_Devices.pdf",
        description: "Student reference: 5 devices with definitions and Chapter 15 examples. Keep for narrative writing.",
      },
    ],
    theme,
    FOOTER,
    NOTES_RESOURCES
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // Generate companion PDFs
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── PDF 1: Because-But-So Worksheet ──────────────────────────────────────
  const ws = createPdf({ title: "Because-But-So Worksheet" });
  let wsY = addPdfHeader(ws, "Because, But, So \u2014 Sentence Building", {
    color: C.PRIMARY,
    subtitle: "Chapter 15: No Man\u2019s Land",
    lessonInfo: "War Horse | Lesson 18 | Week 4 | Year 5/6 Literacy",
    showNameDate: true,
  });

  wsY = addTipBox(ws, "Read the sentence stem, then complete it three different ways using the conjunctions below. Each conjunction does a different job \u2014 make sure your completions are genuinely different from each other!", wsY, { color: C.PRIMARY });

  wsY = addSectionHeading(ws, "Sentence Stem", wsY, { color: C.PRIMARY });
  wsY = addBodyText(ws, "\u201CJoey ran as far away as he could\u2026\u201D", wsY, { fontSize: 14, italic: true });
  wsY += 8;

  // Because section
  wsY = addSectionHeading(ws, "1. BECAUSE \u2014 Give a reason (WHY did Joey run?)", wsY, { color: C.PRIMARY });
  wsY = addBodyText(ws, "Joey ran as far away as he could because", wsY, { fontSize: 12 });
  wsY = addLinedArea(ws, wsY, 3, { lineSpacing: 26 });
  wsY += 8;

  // But section
  wsY = addSectionHeading(ws, "2. BUT \u2014 Show a contrast (what worked AGAINST him?)", wsY, { color: C.SECONDARY });
  wsY = addBodyText(ws, "Joey ran as far away as he could but", wsY, { fontSize: 12 });
  wsY = addLinedArea(ws, wsY, 3, { lineSpacing: 26 });
  wsY += 8;

  // So section
  wsY = addSectionHeading(ws, "3. SO \u2014 Show the result (what HAPPENED because he ran?)", wsY, { color: C.ACCENT });
  wsY = addBodyText(ws, "Joey ran as far away as he could so", wsY, { fontSize: 12 });
  wsY = addLinedArea(ws, wsY, 3, { lineSpacing: 26 });
  wsY += 12;

  // Challenge section
  wsY = addSectionHeading(ws, "CHALLENGE: Write Your Own!", wsY, { color: C.ALERT, fontSize: 14 });
  wsY = addTipBox(ws, "Choose your OWN sentence stem from Chapter 15 (e.g., \u201CThe tanks rolled towards Joey\u2026\u201D or \u201CTopthorn lay still on the ground\u2026\u201D). Write it below, then complete it with all three conjunctions.", wsY, { color: C.ALERT });

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

  // ─── PDF 2: Because-But-So Answer Key ─────────────────────────────────────
  const ak = createPdf({ title: "Because-But-So Answer Key" });
  let akY = addPdfHeader(ak, "Because, But, So \u2014 Answer Key", {
    color: C.ALERT,
    subtitle: "Teacher Reference \u2014 Chapter 15: No Man\u2019s Land",
    lessonInfo: "War Horse | Lesson 18 | Week 4 | Year 5/6 Literacy",
    showNameDate: false,
  });

  akY = addTipBox(ak, "These are model answers. Accept any response that demonstrates correct use of the conjunction\u2019s function: \u201Cbecause\u201D gives a reason, \u201Cbut\u201D introduces a contrast, \u201Cso\u201D shows a result.", akY, { color: C.ALERT });

  akY = addSectionHeading(ak, "Sentence Stem: \u201CJoey ran as far away as he could\u2026\u201D", akY, { color: C.PRIMARY });
  akY += 6;

  akY = addSectionHeading(ak, "1. BECAUSE", akY, { color: C.PRIMARY });
  akY = addBodyText(ak, "Model: \u201C\u2026because he was terrified of the tank and wanted to find a place that was calm and safe.\u201D", akY);
  akY = addBodyText(ak, "Alternative: \u201C\u2026because the ground was shaking and the monstrous machines were getting closer.\u201D", akY, { italic: true });
  akY = addBodyText(ak, "Alternative: \u201C\u2026because every instinct told him to escape from the noise and the smoke.\u201D", akY, { italic: true });
  akY += 8;

  akY = addSectionHeading(ak, "2. BUT", akY, { color: C.SECONDARY });
  akY = addBodyText(ak, "Model: \u201C\u2026but he still couldn\u2019t escape the war altogether.\u201D", akY);
  akY = addBodyText(ak, "Alternative: \u201C\u2026but his leg caught on barbed wire and pain shot through his body.\u201D", akY, { italic: true });
  akY = addBodyText(ak, "Alternative: \u201C\u2026but the explosions followed him no matter which direction he turned.\u201D", akY, { italic: true });
  akY += 8;

  akY = addSectionHeading(ak, "3. SO", akY, { color: C.ACCENT });
  akY = addBodyText(ak, "Model: \u201C\u2026so he found himself alone and injured in the dark.\u201D", akY);
  akY = addBodyText(ak, "Alternative: \u201C\u2026so he ended up in no man\u2019s land, the most dangerous place on the battlefield.\u201D", akY, { italic: true });
  akY = addBodyText(ak, "Alternative: \u201C\u2026so by the time dawn broke, he was standing in the open between the two armies.\u201D", akY, { italic: true });
  akY += 12;

  akY = addSectionHeading(ak, "Common Errors to Watch For", akY, { color: C.ALERT });
  akY = addBodyText(ak, "\u2022 \u201CBut\u201D sentences that don\u2019t actually change direction (e.g., \u201C\u2026but he was very scared\u201D \u2014 this is a reason, not a contrast)", akY);
  akY = addBodyText(ak, "\u2022 \u201CSo\u201D sentences that give a reason instead of a result (e.g., \u201C\u2026so he was frightened\u201D \u2014 this explains why, not what happened)", akY);
  akY = addBodyText(ak, "\u2022 All three sentences saying essentially the same thing with different conjunctions", akY);
  akY = addBodyText(ak, "\u2022 Incomplete sentences or sentences that don\u2019t connect logically to the stem", akY);

  addPdfFooter(ak, "War Horse | Lesson 18 | Answer Key \u2014 TEACHER COPY");

  // ─── PDF 3: Literary Devices Reference Sheet ─────────────────────────────
  const ld = createPdf({ title: "Literary Devices Reference Sheet" });
  let ldY = addPdfHeader(ld, "Literary Devices \u2014 Reference Sheet", {
    color: C.ACCENT,
    subtitle: "Five devices from Chapter 15 of War Horse",
    lessonInfo: "War Horse | Lesson 18 | Year 5/6 Literacy",
    showNameDate: false,
  });

  ldY = addTipBox(ld, "Keep this sheet! Use it when you are writing your own narratives. Each device is a tool you can reach for to make your writing more powerful.", ldY, { color: C.ACCENT });

  // Simile
  ldY = addSectionHeading(ld, "1. Simile", ldY, { color: C.PRIMARY });
  ldY = addBodyText(ld, "Definition: A comparison between two things using \u201Clike\u201D or \u201Cas.\u201D Similes help the reader picture something unfamiliar by comparing it to something familiar.", ldY);
  ldY = addBodyText(ld, "Example from Chapter 15:", ldY, { fontSize: 10, color: "6B7B8B" });
  ldY = addBodyText(ld, "\u201C\u2026leaving behind great craters that smoked as if the earth itself was on fire.\u201D (p. 118)", ldY, { italic: true });
  ldY = addBodyText(ld, "Effect: Makes the destruction feel enormous \u2014 the whole earth seems to be burning, not just the ground.", ldY, { fontSize: 10 });
  ldY += 6;

  // Onomatopoeia
  ldY = addSectionHeading(ld, "2. Onomatopoeia", ldY, { color: C.SECONDARY });
  ldY = addBodyText(ld, "Definition: Words that imitate the sound they describe. Onomatopoeia makes the reader \u201Chear\u201D the scene.", ldY);
  ldY = addBodyText(ld, "Example from Chapter 15:", ldY, { fontSize: 10, color: "6B7B8B" });
  ldY = addBodyText(ld, "\u201C\u2026the crump and whistle of the shells the whining sound of motors accompanied by a terrifying rattle of steel\u2026\u201D (p. 119)", ldY, { italic: true });
  ldY = addBodyText(ld, "Effect: Puts us inside the battlefield \u2014 we can hear the sounds Joey hears.", ldY, { fontSize: 10 });
  ldY += 6;

  // Metaphor
  ldY = addSectionHeading(ld, "3. Metaphor", ldY, { color: C.ACCENT });
  ldY = addBodyText(ld, "Definition: Saying something IS something else (without using \u201Clike\u201D or \u201Cas\u201D). Metaphors transform one thing into another in the reader\u2019s mind.", ldY);
  ldY = addBodyText(ld, "Example from Chapter 15:", ldY, { fontSize: 10, color: "6B7B8B" });
  ldY = addBodyText(ld, "\u201C\u2026a great grey lumbering monster that belched out smoke from behind as it rocked down the hillside towards me.\u201D (p. 119)", ldY, { italic: true });
  ldY = addBodyText(ld, "Effect: The tank becomes a monster. Because Joey doesn\u2019t know what a tank is, the metaphor shows us the world through his innocent, terrified eyes.", ldY, { fontSize: 10 });
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
  ldY = addBodyText(ld, "\u201CAnd then exhaustion finally overtook me, sapped the strength from my legs and forced me to lie down and sleep.\u201D (p. 120)", ldY, { italic: true });
  ldY = addBodyText(ld, "Effect: Exhaustion becomes a character that defeats Joey \u2014 it \u201Covertook,\u201D \u201Csapped,\u201D and \u201Cforced\u201D him. This makes tiredness feel like a physical enemy.", ldY, { fontSize: 10 });
  ldY += 6;

  // Repetition
  ldY = addSectionHeading(ld, "5. Repetition", ldY, { color: C.ASSESS });
  ldY = addBodyText(ld, "Definition: Deliberately repeating a word or phrase to emphasise an idea, create rhythm, or build emotion.", ldY);
  ldY = addBodyText(ld, "Example from Chapter 15:", ldY, { fontSize: 10, color: "6B7B8B" });
  ldY = addBodyText(ld, "\u201C\u2026I shall never know. \u2026 He would know \u2026 He would know.\u201D (p. 121)", ldY, { italic: true });
  ldY = addBodyText(ld, "Effect: The repeated \u201CHe would know\u201D shows how deeply Joey trusts Albert, even in his darkest moment. The repetition makes Joey\u2019s faith feel absolute and unshakeable.", ldY, { fontSize: 10 });
  ldY += 14;

  // Quick reference table
  ldY = addSectionHeading(ld, "Quick Reference", ldY, { color: C.PRIMARY, fontSize: 12 });
  ldY = addBodyText(ld, "Simile = comparison using \u201Clike\u201D / \u201Cas\u201D   |   Metaphor = IS something else (no like/as)", ldY, { fontSize: 10 });
  ldY = addBodyText(ld, "Onomatopoeia = sounds like what it means   |   Personification = human qualities for non-human things", ldY, { fontSize: 10 });
  ldY = addBodyText(ld, "Repetition = same words/phrases repeated for effect", ldY, { fontSize: 10 });

  addPdfFooter(ld, "War Horse | Lesson 18 | Literary Devices Reference Sheet");

  // ─── Write all files ──────────────────────────────────────────────────────
  await Promise.all([
    pres.writeFile(`${OUT_DIR}/WH4_Lesson18.pptx`),
    writePdf(ws, `${OUT_DIR}/WH4_L18_BBS_Worksheet.pdf`),
    writePdf(ak, `${OUT_DIR}/WH4_L18_BBS_AnswerKey.pdf`),
    writePdf(ld, `${OUT_DIR}/WH4_L18_Literary_Devices.pdf`),
  ]);

  console.log("Done: WH4_Lesson18.pptx");
  console.log("Done: WH4_L18_BBS_Worksheet.pdf");
  console.log("Done: WH4_L18_BBS_AnswerKey.pdf");
  console.log("Done: WH4_L18_Literary_Devices.pdf");
}

build().catch(console.error);
