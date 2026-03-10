// War Horse — Lesson 17: Friedrich and Topthorn (Chapters 13-14)
// Year 5/6 Literacy — Novel Study — Week 4
// Uses shared helpers from themes/wh4_helpers.js

"use strict";

const pptxgen = require("pptxgenjs");
const fs      = require("fs");
const path    = require("path");

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

const SESSION_NUMBER = 2;
const FOOTER = "War Horse | Lesson 17 of 25 | Week 4 | Year 5/6 Literacy";
const OUT_DIR = "output/WH4_Lesson17_Friedrich_And_Topthorn";
const RES_DIR = path.join(OUT_DIR, getSessionResourceFolder(SESSION_NUMBER));
const WORKSHEET_RESOURCE = makeSessionResource(
  SESSION_NUMBER,
  "Sentence Combining Worksheet",
  "Five sentences about Friedrich for students to combine - one per student."
);
const ANSWER_KEY_RESOURCE = makeSessionResource(
  SESSION_NUMBER,
  "Answer Key",
  "Teacher reference: model answer plus alternative valid combinations."
);
const RESOURCE_ITEMS = [WORKSHEET_RESOURCE, ANSWER_KEY_RESOURCE];
const WORKSHEET_PDF_PATH = path.join(OUT_DIR, WORKSHEET_RESOURCE.fileName);
const ANSWER_KEY_PDF_PATH = path.join(OUT_DIR, ANSWER_KEY_RESOURCE.fileName);
fs.mkdirSync(RES_DIR, { recursive: true });

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `SAY:
\u2022 \u201CToday we are reading Chapters 13 and 14 of War Horse. These chapters introduce a remarkable character \u2014 Friedrich \u2014 and take us through one of the most emotional moments in the book.\u201D
\u2022 \u201CWe will read aloud together, stop at key moments to explore character and meaning, examine a powerful simile, and practise combining sentences.\u201D
\u2022 \u201COur focus today is on understanding how Michael Morpurgo creates complex characters and uses figurative language to make us feel the reality of war \u2014 and the beauty that survives within it.\u201D

DO:
\u2022 Display this slide as students settle. Allow 10 seconds for students to read the title and subtitle.
\u2022 Have copies of War Horse open and ready. Ensure students know pages 105\u2013117.

TEACHER NOTES:
PACING NOTE: Suggested timing \u2014 Title/LI/SC (3 min), Vocabulary (4 min), Reading Ch 13 with pause points 1\u20132 and simile analysis (18 min), Reading Ch 14 with pause point 3 (8 min), CFU (3 min), Sentence combining I Do + We Do + You Do (12 min), Closing (2 min) = ~50 min. If running behind after reading, abbreviate the We Do to a quick choral response and protect the You Do time. The sentence combining segment is the priority new learning.

This lesson covers emotionally significant content: Friedrich\u2019s quiet defiance, Topthorn\u2019s death, and Friedrich\u2019s injury/death during the shelling. These are the most impactful events since Emilie\u2019s separation from Joey. Handle with care but do not shy away \u2014 the emotional depth is what makes Morpurgo\u2019s writing powerful and gives students authentic material for literary analysis.

Narrative writing link (natural, not forced): the way Morpurgo structures these two chapters mirrors effective narrative craft \u2014 Chapter 13 builds hope and connection, Chapter 14 shatters it. This contrast is something students can draw on when writing their own narratives.

WATCH FOR:
\u2022 Students who seem unsettled or anxious \u2014 reassure without spoiling: \u201CToday\u2019s chapters have some intense moments. If you need a moment, that\u2019s okay.\u201D
\u2022 Students who recall previous chapters inaccurately \u2014 a quick review question will surface this.

[General: Title \u2014 VTLM 2.0: Establishing Purpose and Relevance]`;

const NOTES_LI = `SAY:
\u2022 Read the learning intention from the slide once so students hear the full destination for today.
\u2022 Name the two connected strands: close reading of Morpurgo's language and characterisation, then clearer sentence combining about Friedrich.
\u2022 Point to the success criteria: \u201CThese three success criteria show exactly what success looks like today. We'll come back to them at the end.\u201D

DO:
\u2022 Read the single LI once, then read the SCs.
\u2022 Ask students to give a thumbs up if one SC already feels familiar.
\u2022 Total time: 90 seconds maximum.

TEACHER NOTES:
The single LI keeps the lesson coherent: close reading of Morpurgo's craft in Chapters 13-14 plus sentence combining as the transfer task. SC1 is simile analysis, SC2 is sentence combining, and SC3 is Friedrich character analysis. SC2 is the priority new learning; SC1 and SC3 are reinforced through the reading and pause points. VTLM 2.0: Making Learning Visible / Clear Learning Intention.

WATCH FOR:
\u2022 Students who lock onto only the reading side or only the writing side - remind them the LI connects both.
\u2022 Students who give thumbs up on all SCs - probe: \u201CWhat is a simile? Can you show me how you would combine two Friedrich facts into one sentence?\u201D

[General: Learning Intention \u2014 VTLM 2.0: Making Learning Visible / Clear Learning Intention]`;

const NOTES_VOCAB_LUSH = `SAY:
\u2022 \u201CRead this word with me: lush.\u201D [Students repeat.]
\u2022 \u201CLush means growing thickly and strongly \u2014 rich, green, abundant. Think of a garden after rain: everything is lush.\u201D
\u2022 \u201CIn Chapters 13\u201314, Morpurgo uses \u2018lush\u2019 to describe the spring landscape. After months of mud and misery, the land becomes lush again. Why does that matter?\u201D [It shows that nature recovers even in war / it gives the horses better food and rest / it contrasts with the destruction.]
\u2022 \u201CLush is a sensory word \u2014 when you read it, you can almost see and feel the green. Good writers use words like this to create atmosphere.\u201D

DO:
\u2022 Point to the word card. Students repeat the word aloud (choral response).
\u2022 Spend no more than 90 seconds. Rapid explicit teaching.
\u2022 Do NOT ask students to write definitions. They will meet this word in context during reading.

TEACHER NOTES:
\u201CLush\u201D is a deliberate vocabulary choice because it connects the natural world to the emotional arc of the novel. The lush spring landscape in Chapter 13 creates a brief sense of hope before the devastation of Chapter 14. Students who understand this word will be better equipped to recognise the narrative contrast Morpurgo builds. This is also a useful word for students\u2019 own narrative writing \u2014 setting descriptions benefit from precise sensory adjectives like \u201Clush.\u201D VTLM 2.0: Explicit Explanation. DECIDE Framework: D (Define the vocabulary component).

WATCH FOR:
\u2022 Students who confuse \u201Clush\u201D with \u201Cluxurious\u201D or \u201Crush\u201D \u2014 clarify: \u201CLush is about plants and growth. Luxurious is about comfort and expense. Different words.\u201D
\u2022 Students who pronounce it incorrectly (some may say \u201Cloosh\u201D) \u2014 model: \u201CLush. Rhymes with rush.\u201D
\u2022 Readiness signal: Students can say the word clearly and connect it to the idea of rich, green growth.

[General: Explicit Instruction (I Do) \u2014 Vocabulary \u2014 VTLM 2.0: Explicit Explanation]`;

const NOTES_VOCAB_SERENITY = `SAY:
\u2022 \u201CRead this word with me: se-REN-i-ty.\u201D [Students repeat.]
\u2022 \u201CSerenity means a state of being calm, peaceful, and untroubled. Complete calm.\u201D
\u2022 \u201CMorpurgo uses this word to describe Topthorn. Think about that \u2014 a war horse, in the middle of battle, described with serenity. What does that tell us about this horse?\u201D [Topthorn has a calm, noble nature / he is dignified even in terrible circumstances.]
\u2022 \u201CWhen you write about characters, choosing a word like \u2018serenity\u2019 instead of just \u2018calm\u2019 elevates your writing. It is more precise and more powerful.\u201D

DO:
\u2022 Point to the word card. Students repeat aloud. Clap the syllables: se-REN-i-ty (four syllables).
\u2022 Quick turn and talk (30 seconds): \u201CTell your partner a time or place where you felt serenity.\u201D Share 1\u20132 responses.
\u2022 Total time: 90 seconds.

TEACHER NOTES:
\u201CSerenity\u201D is chosen because it directly characterises Topthorn and foreshadows his death. Morpurgo associates Topthorn with calmness and nobility throughout \u2014 so when he collapses and dies in Chapter 14, the loss of that serenity hits hard. The word also connects to the simile on p.113 (\u201Cfinding a butterfly on a dung heap\u201D) where beauty exists amidst ugliness. For students\u2019 own writing, \u201Cserenity\u201D is a powerful word for describing settings or characters in narrative. VTLM 2.0: Explicit Explanation.

MISCONCEPTIONS:
\u2022 Misconception: \u201CSerenity\u201D means the same as \u201Csilence.\u201D
  Why: Students associate calm with quiet, but serenity is about inner peace, not just the absence of noise.
  Impact: If students think serenity = silence, they miss the deeper characterisation of Topthorn. A horse can be serene even in noise.
  Quick correction: \u201CYou can have serenity in a noisy place. It is about how you FEEL inside, not how quiet it is outside. Topthorn has serenity even surrounded by war.\u201D

WATCH FOR:
\u2022 Students who stumble on the syllable count \u2014 clap it together: se-REN-i-ty. Four claps.
\u2022 Students who can\u2019t think of a personal connection \u2014 prompt: \u201CThink of a quiet morning, or sitting by water, or being with someone safe.\u201D
\u2022 Readiness signal: Students can say the word confidently and connect it to \u201Cdeep calm.\u201D

[General: Explicit Instruction (I Do) \u2014 Vocabulary \u2014 VTLM 2.0: Explicit Explanation]`;

const NOTES_INCIDENTAL = `SAY:
\u2022 \u201CChapters 13 and 14 are full of rich vocabulary. Here are words you will hear during our reading.\u201D
\u2022 \u201CYou don\u2019t need to memorise all of these. If you hear one you don\u2019t know, underline it in the text and we\u2019ll come back to it.\u201D
\u2022 Quickly scan a few: \u201COptimism \u2014 hoping for the best. Sporadic \u2014 happening now and then, not regularly. Abomination \u2014 something truly awful.\u201D
\u2022 \u201CLet\u2019s begin reading.\u201D

DO:
\u2022 Display the word list. Allow 15 seconds for silent scanning.
\u2022 Do NOT teach each word individually. Name 2\u20133 briefly as anchors.
\u2022 This slide is a reference \u2014 students know these words are coming. Keep to 60 seconds.

TEACHER NOTES:
The incidental vocabulary list is long (26 words) because Morpurgo\u2019s prose in these chapters is particularly rich. The purpose is exposure, not mastery. Students will encounter these words in context during reading. Flagging them here activates a \u201Clook-for\u201D mindset \u2014 students are more likely to notice and process a word they have seen on a list. The three words briefly named (optimism, sporadic, abomination) are chosen because they appear early in Chapter 13, are high-utility, and are likely unfamiliar. VTLM 2.0: Explicit Explanation (light touch).

WATCH FOR:
\u2022 Students who look overwhelmed by the list \u2014 reassure: \u201CThis is just a heads-up. You do not need to know all of these.\u201D
\u2022 Students who want to copy the list \u2014 redirect: \u201CDon\u2019t copy. Just listen and underline words in the book as you hear them.\u201D
\u2022 Readiness signal: Students have books open and are ready to begin reading.

[General: Vocabulary Preview \u2014 VTLM 2.0: Explicit Explanation]`;

const NOTES_READING_CH13 = `SAY:
\u2022 \u201COpen your books to page 105. We are reading Chapter 13.\u201D
\u2022 \u201CToday is student read aloud. I will select readers. Everyone follows along \u2014 finger on the text.\u201D
\u2022 \u201CIn Chapter 13, spring arrives and the war quietens. Joey and Topthorn are given into the care of a new character \u2014 Friedrich. Pay attention to what Friedrich says and does. Ask yourself: what kind of person is he?\u201D
\u2022 \u201CWe will stop twice during this chapter.\u201D

DO:
\u2022 Ensure all students have books open to page 105. Quick scan for page readiness.
\u2022 Remind students of read-aloud expectations: eyes on text, follow along silently, ready to read.
\u2022 Select your first reader. Choose a confident reader to set the pace.
\u2022 Read through Chapter 13, pausing at the two designated quote points.

TEACHER NOTES:
Chapter 13 is a turning point in tone. After the relentless mud and death of earlier chapters, spring brings relief. This matters narratively because Morpurgo is building hope \u2014 only to destroy it in Chapter 14. Students should feel this shift in atmosphere. Friedrich is introduced as a complex character: the soldiers think he is crazy, but he is actually the most rational person in the troop. This is dramatic irony and a commentary on war. The reading should take approximately 10 minutes including the two pause points. VTLM 2.0: Scaffold Practice (shared reading with monitoring).

WATCH FOR:
\u2022 Students not following along \u2014 redirect: \u201CAll eyes on line [x].\u201D
\u2022 Readers who struggle with \u201Csporadic,\u201D \u201Ctedious,\u201D or \u201Cabomination\u201D \u2014 supply the word and move on.
\u2022 Readiness signal: All students tracking text, reader maintaining pace.

[General: Guided Practice (We Do \u2014 Shared Reading) \u2014 VTLM 2.0: Scaffold Practice]`;

const NOTES_PAUSE1 = `SAY:
\u2022 \u201CStop here. Read this quote again: \u2018\u2026so that I can return again to Schleiden and become Butcher Friedrich that everyone knew and respected before all this mess began.\u2019\u201D
\u2022 Ask: \u201CWhat does the author want us to know about Friedrich?\u201D
\u2022 Allow 15 seconds silent thinking, then cold call 2 students.
\u2022 Expected responses: [Friedrich was a normal person before the war / He had a respectable life / He doesn\u2019t want to be a soldier / He wants to go home / The war has changed him / He is only pretending to be crazy.]
\u2022 After discussion: \u201CFriedrich is not crazy at all. He acts crazy as a way of coping \u2014 a front. He thinks the war itself is the real insanity. Morpurgo is using Friedrich to ask a powerful question: who is truly \u2018crazy\u2019 \u2014 the man who talks to himself, or the men who fight in a senseless war?\u201D

DO:
\u2022 Pause the reader at p.109 after this quote.
\u2022 Display the slide. Allow 10 seconds to re-read the quote on screen.
\u2022 Cold Call: select 2 students. Do not accept hands up.
\u2022 Click to reveal the expected response after students have shared.

CFU CHECKPOINT:
Technique: Cold Call

Script:
\u2022 Cold call Student A: \u201CWhat does this quote tell us about Friedrich \u2014 the real Friedrich, not the act?\u201D
\u2022 Cold call Student B: \u201CWhy might a butcher from a small town act crazy in the army?\u201D
\u2022 Scan for: Students who recognise Friedrich\u2019s identity before the war and his deliberate performance.

PROCEED (if \u226580% identify Friedrich\u2019s real character):
Continue reading to p.113. Students are engaging with character beyond surface level.

PIVOT (if <80% seem confused about Friedrich):
Most likely issue: Students take Friedrich\u2019s \u201Ccrazy\u201D behaviour at face value and miss the performance.
Reteach: \u201CLet me re-read what Friedrich says to Joey: he TELLS the horse that he acts crazy on purpose. Why? Because if the soldiers think he is mad, they leave him alone. He gets to care for the horses instead of fighting. Friedrich is the cleverest person in the troop \u2014 not the craziest.\u201D
Re-check: \u201CSo is Friedrich actually crazy?\u201D [No.] \u201CWhat is he really?\u201D [Sane / scared / clever / strategic.]

TEACHER NOTES:
This quote reveals Friedrich\u2019s backstory and humanity. He is a butcher from Schleiden \u2014 an ordinary man with an ordinary life, pulled into a war he did not choose. His \u201Ccrazy\u201D behaviour is a survival strategy and a quiet act of resistance. For Grade 5/6 students, this is a rich example of authorial characterisation: Morpurgo tells us who Friedrich was BEFORE the war so we can measure what the war has done to him. This connects to the LI on analysing character attributes and the LI on perspective through authorial choices. The narrative writing connection is natural: good character writing reveals backstory to create empathy. VTLM 2.0: Monitor Progress.

WATCH FOR:
\u2022 Students who say \u201CFriedrich is German so he\u2019s the bad guy\u201D \u2014 this is a critical moment. Redirect firmly: \u201CMorpurgo wants us to see Friedrich as a human being, not as the enemy. He has a home, a job, a name. War forces ordinary people onto different sides.\u201D
\u2022 Students who focus only on \u201Cbutcher\u201D and miss the broader point \u2014 prompt: \u201CWhat does \u2018respected\u2019 tell us about his life before war?\u201D
\u2022 Readiness signal: Students can articulate that Friedrich is performing craziness as a front.

[General: Guided Practice (We Do \u2014 Pause Point) \u2014 VTLM 2.0: Monitor Progress]`;

const NOTES_PAUSE2 = `SAY:
\u2022 \u201CStop here. Look at this line: \u2018We don\u2019t belong in the same universe as a creature like this.\u2019\u201D
\u2022 Ask: \u201CWhat\u2019s the big idea here?\u201D
\u2022 Think-Pair-Share: 30 seconds thinking, 60 seconds pair discussion, then share.
\u2022 Expected responses: [Friedrich thinks Topthorn is too beautiful/noble for war / The horse doesn\u2019t deserve to suffer / War degrades everything, but Topthorn\u2019s beauty survives / Friedrich sees the horse as something pure in an impure world.]
\u2022 After sharing: \u201CFriedrich is saying that a creature as magnificent as Topthorn should not exist in the same world as this terrible war. The horse represents everything beautiful that war destroys. This is one of Morpurgo\u2019s big ideas \u2014 that beauty and innocence do not belong in war, yet they are trapped in it.\u201D

DO:
\u2022 Pause the reader at p.113.
\u2022 Display the slide. Allow 10 seconds to re-read on screen.
\u2022 Think-Pair-Share: 30 seconds silent thinking, 60 seconds pair talk. Circulate and listen.
\u2022 Cold call 2 pairs to share. Click to reveal after discussion.

CFU CHECKPOINT:
Technique: Think-Pair-Share

Script:
\u2022 \u201CThink silently for 30 seconds: what is the big idea Friedrich is expressing here?\u201D
\u2022 \u201CTurn to your partner. You have 60 seconds.\u201D
\u2022 Cold call 2 pairs.
\u2022 Scan for: Responses that go beyond \u201Che likes the horse\u201D to the broader theme of beauty vs war.

PROCEED (if \u226580% connect to the theme of beauty/innocence in war):
Continue reading. Move to the simile analysis slide.

PIVOT (if <80% make surface-level responses):
Most likely issue: Students read the line literally (\u201Che likes the horse\u201D) without seeing the broader theme.
Reteach: \u201CListen to Friedrich\u2019s exact words: \u2018We don\u2019t BELONG in the same universe.\u2019 He is not just saying Topthorn is nice. He is saying this horse is so beautiful that it does not belong in a universe where war exists. What does that tell us about what Friedrich thinks of war?\u201D [War is ugly / war corrupts / war doesn\u2019t deserve beautiful things.]
Re-check: \u201CSo the big idea is not just about the horse. What is it really about?\u201D [The contrast between beauty and the ugliness of war.]

TEACHER NOTES:
This quote is the thematic heart of Chapters 13\u201314. Friedrich articulates what Morpurgo has been showing through Joey\u2019s perspective: war is an abomination, and the horses \u2014 innocent, beautiful, serving without choice \u2014 expose its cruelty. This directly connects to the LI on questioning the assertions made by authors and identifying how perspective is made evident through authorial choices. Friedrich speaks for Morpurgo here. The narrative writing connection: when characters express theme directly through dialogue, it is a powerful technique. Students can use this in their own writing \u2014 having a character say what the story means. VTLM 2.0: Monitor Progress.

WATCH FOR:
\u2022 Students who say \u201CFriedrich is talking to the horse, that\u2019s weird\u201D \u2014 redirect: \u201CRemember, Friedrich confides in the horses because they listen without judging. What he says to Topthorn is his honest view of the world.\u201D
\u2022 Students who focus only on Topthorn and miss the commentary on war \u2014 push: \u201CIf the horse doesn\u2019t belong, what does that say about the universe they\u2019re in?\u201D
\u2022 Readiness signal: Students can connect the quote to the broader theme of innocence in war.

[General: Guided Practice (We Do \u2014 Pause Point) \u2014 VTLM 2.0: Monitor Progress]`;

const NOTES_SIMILE = `SAY:
\u2022 \u201CBefore we move on, I want us to look closely at one incredible sentence from this chapter.\u201D
\u2022 Read aloud: \u201C\u2018And to find a horse like this in the middle of this filthy abomination of a war, is for me like finding a butterfly on a dung heap.\u2019\u201D
\u2022 \u201CWhat is Morpurgo doing here? What literary device is this?\u201D [A simile \u2014 \u201Clike finding a butterfly on a dung heap.\u201D]
\u2022 \u201CRight. A simile \u2014 a comparison using \u2018like.\u2019 Now let\u2019s unpack it. What is the butterfly?\u201D [Topthorn / beauty / something precious and delicate.]
\u2022 \u201CWhat is the dung heap?\u201D [The war / the filth and destruction / everything ugly and senseless.]
\u2022 \u201CSo Morpurgo is comparing finding Topthorn in the war to finding something beautiful in something disgusting. The contrast is the whole point \u2014 beauty surrounded by ugliness.\u201D
\u2022 \u201CNotice how much MEANING Morpurgo packs into one sentence. When you write your own narratives, a single powerful simile can say more than a whole paragraph of description.\u201D

DO:
\u2022 Display the simile on screen. Read it aloud with expression.
\u2022 Unpack the simile step by step: identify the device, then the tenor (what is being compared) and the vehicle (what it is compared to).
\u2022 This is I Do \u2014 you are modelling close reading. Students listen and respond to prompts.
\u2022 Keep to 3\u20134 minutes. This connects directly to the previous pause point.

TEACHER NOTES:
This simile is the literary centrepiece of the lesson. It directly addresses the LI on comparing purposes and structures in texts, and how the author uses simile to create meaning. The image is visceral: a butterfly (fragile, colourful, living) on a dung heap (waste, decay, stench). The juxtaposition mirrors the novel\u2019s central tension: beauty and innocence forced into the machinery of war. For narrative writing, this is an exemplar of how a single figurative device can carry thematic weight. Students at Grade 5/6 should be able to identify the simile and begin to explain its effect. DECIDE Framework: E (Execute through modelling \u2014 I Do). VTLM 2.0: Explicit Explanation.

MISCONCEPTIONS:
\u2022 Misconception: A simile is just any comparison.
  Why: Students overgeneralise \u2014 they think \u201Cthe horse is big like an elephant\u201D and \u201Cfinding a butterfly on a dung heap\u201D are doing the same work. They miss the difference between decorative and thematic simile.
  Impact: Students produce generic similes in their own writing (as tall as a building, as fast as lightning) rather than meaningful ones.
  Quick correction: \u201CAnyone can write \u2018the horse was big like a bus.\u2019 That tells us size. But Morpurgo\u2019s simile tells us something about the MEANING of the whole novel. A great simile does not just compare \u2014 it makes you think.\u201D

WATCH FOR:
\u2022 Students who identify the simile but cannot explain its effect \u2014 scaffold: \u201CWhat is beautiful in this simile? What is ugly? Why put them together?\u201D
\u2022 Students who confuse simile with metaphor \u2014 quick clarification: \u201CSimile uses \u2018like\u2019 or \u2018as.\u2019 If Morpurgo had written \u2018Topthorn IS a butterfly on a dung heap,\u2019 that would be a metaphor.\u201D
\u2022 Readiness signal: Students can identify the two halves of the simile (butterfly = beauty, dung heap = war) and articulate the contrast.

[General: Explicit Instruction (I Do) \u2014 Literary Device \u2014 VTLM 2.0: Explicit Explanation]`;

const NOTES_READING_CH14 = `SAY:
\u2022 \u201CNow we move to Chapter 14. This chapter takes place in autumn \u2014 months have passed since the hopeful spring of Chapter 13.\u201D
\u2022 \u201CI need to let you know that this chapter contains some very sad and intense moments. One of the characters we have come to care about does not survive. If you find it difficult, that is completely okay. We will talk about it together.\u201D
\u2022 \u201CAs you read, pay attention to what Morpurgo does with PACE. Notice how the chapter starts calmly and then suddenly changes. Good writers control pace deliberately.\u201D

DO:
\u2022 Deliver the sensitivity framing calmly and directly. Do not overdramatise.
\u2022 Watch students\u2019 faces for signs of anxiety. Some students may already know what happens.
\u2022 Have tissues available. This is not an exaggeration \u2014 Topthorn\u2019s death affects students deeply.
\u2022 Select readers carefully for this chapter. Choose students who can handle the emotional content.
\u2022 Read through to the designated pause point.

SENSITIVITY ADVISORY:
Topthorn\u2019s death is one of the most emotionally impactful moments in the novel. Joey nuzzles close to Topthorn\u2019s body \u2014 this detail is particularly affecting for animal-loving students. Friedrich is then hit by shelling and likely killed. These are not gratuitous moments; they are central to Morpurgo\u2019s anti-war message. However, some students may become distressed:
\u2022 Give the general warning above BEFORE reading begins.
\u2022 Do NOT describe the death in advance \u2014 let the text do its work.
\u2022 After reading, allow 30 seconds of silence before discussion. Let emotions settle.
\u2022 If a student becomes visibly upset, a quiet hand on the shoulder and \u201CTake a moment\u201D is sufficient. Do not draw attention.
\u2022 Frame the emotion positively: \u201CThe fact that you feel sad shows you understand the story deeply. That\u2019s what great writing does.\u201D

TEACHER NOTES:
Chapter 14 is structured as a deliberate emotional ambush. It opens peacefully \u2014 the troop resting by a river on an autumn day, horses drinking. Then Topthorn collapses without warning. No build-up, no illness \u2014 just sudden death. This mirrors the arbitrary nature of loss in war. The pacing technique (calm followed by shock) is something students can learn from for their own narrative writing: calm before the storm is a deliberate structural choice. Friedrich\u2019s death/injury during the shelling compounds the loss \u2014 Joey loses both his companion and his caretaker in moments. The chapter ends with Joey alone, which sets up the next phase of the novel. VTLM 2.0: Scaffold Practice.

WATCH FOR:
\u2022 Students who become upset \u2014 see sensitivity advisory above. Normalise the emotion.
\u2022 Students who laugh or make jokes \u2014 this is sometimes a coping mechanism. A quiet \u201CThis is a serious moment in the story\u201D usually redirects.
\u2022 Readers who struggle with the emotional content while reading aloud \u2014 be ready to take over seamlessly: \u201CThank you, I\u2019ll take it from here.\u201D
\u2022 Readiness signal: Students are engaged and tracking the text, even if emotional.

[General: Guided Practice (We Do \u2014 Shared Reading) \u2014 VTLM 2.0: Scaffold Practice]`;

const NOTES_PAUSE3 = `SAY:
\u2022 \u201CStop here. Read this line: \u2018\u2026with the gunners hauling frantically on their reins and straining to push the gun from behind.\u2019\u201D
\u2022 Allow 10 seconds of silence after reading. This is important \u2014 let the moment breathe.
\u2022 Ask quietly: \u201CWhat just happened?\u201D
\u2022 Expected responses: [A shelling began / The troop was attacked / Friedrich tried to lead Joey away but Joey wouldn\u2019t leave Topthorn / Friedrich was hit / Joey is left alone.]
\u2022 \u201CYes. The shelling destroyed everything. Friedrich tried to save Joey, but Joey refused to leave Topthorn\u2019s side. And then Friedrich was hit.\u201D
\u2022 \u201CTake a moment. This is a hard part of the story. Joey has lost his best friend and the only human who truly understood him.\u201D
\u2022 \u201CNotice Morpurgo\u2019s word choices here: \u2018frantically,\u2019 \u2018hauling,\u2019 \u2018straining.\u2019 Every word creates urgency and chaos. This is the opposite of the serenity we talked about earlier.\u201D

DO:
\u2022 Pause at p.117 after this line.
\u2022 Allow genuine silence (10 seconds minimum). Do not rush into questions.
\u2022 Ask \u201CWhat just happened?\u201D quietly. Accept brief responses. This is processing, not analysis.
\u2022 Click to reveal the response summary after students have shared.
\u2022 Allow another moment before moving on. This is the emotional peak of the lesson.

SENSITIVITY ADVISORY:
This is the aftermath of Topthorn\u2019s death and Friedrich\u2019s injury. Students who were already affected by the death may now be processing cumulative emotion. Joey\u2019s refusal to leave Topthorn is the detail that hits hardest \u2014 it shows loyalty and love in an animal that many students project their own feelings onto.
\u2022 Keep your voice low and steady.
\u2022 Do NOT rush to the next activity. The silence is pedagogically important.
\u2022 If a student needs to step out briefly, allow it without fanfare.
\u2022 Transition gently: \u201CLet\u2019s take what we\u2019ve read and think about it carefully.\u201D

CFU CHECKPOINT:
Technique: Whip Around (quick verbal check)

Script:
\u2022 \u201CIn one sentence, tell me what just happened.\u201D Go around 4\u20135 students quickly.
\u2022 Listen for: Students who can summarise the sequence \u2014 resting by the river, Topthorn\u2019s collapse, the shelling, Friedrich\u2019s injury, Joey left alone.
\u2022 This is a comprehension check, not a discussion prompt.

PROCEED (if students can sequence the events):
Move to the CFU character analysis. Students understood the chapter.

PIVOT (if students are confused about the sequence):
Most likely issue: The chapter moves fast. Students may have lost track during the emotional intensity.
Reteach: \u201CLet me walk through what happened. First, the troop was resting by a river. Joey and Topthorn went to drink. On the way back, Topthorn collapsed and died \u2014 suddenly. Joey stayed by his side. Then a shelling began. Friedrich tried to lead Joey away, but Joey wouldn\u2019t go. Friedrich was hit. The troop retreated. Joey was left alone.\u201D
Re-check: \u201CWho is left at the end of this chapter?\u201D [Just Joey.] \u201CWho has he lost?\u201D [Topthorn and Friedrich.]

TEACHER NOTES:
This pause point is about processing, not interrogation. Students have just experienced two significant character deaths in quick succession. The question \u201CWhat just happened?\u201D is deliberately simple \u2014 it asks for sequencing and comprehension, not higher-order analysis. Save the deeper analysis for the CFU slide that follows. The vocabulary callback (serenity vs frantically) is a deliberate contrast that connects the lesson\u2019s threads. The word choices (\u201Chauling,\u201D \u201Cstraining,\u201D \u201Cfrantically\u201D) demonstrate how Morpurgo uses diction to control pace and emotion \u2014 a technique students can apply in their own narrative writing. VTLM 2.0: Monitor Progress.

WATCH FOR:
\u2022 Students who are too upset to respond \u2014 that is okay. Do not push. A nod or \u201CI understand\u201D is sufficient.
\u2022 Students who focus only on Topthorn and miss Friedrich\u2019s fate \u2014 gently include: \u201CAnd what happened to Friedrich?\u201D
\u2022 Students who want to discuss whether Joey will be okay \u2014 acknowledge: \u201CThat\u2019s a great question. We\u2019ll find out in the next chapters.\u201D
\u2022 Readiness signal: Students can sequence the key events and are emotionally settled enough to continue.

[General: Guided Practice (We Do \u2014 Pause Point) \u2014 VTLM 2.0: Monitor Progress]`;

const NOTES_CFU = `SAY:
\u2022 \u201CLet\u2019s check our understanding. I\u2019m going to ask you a question, and I want you to write your response on your whiteboard.\u201D
\u2022 \u201CThink about Friedrich. He acted crazy. The soldiers thought he was mad. But what did WE learn about the real Friedrich? And why does his death matter to the story?\u201D
\u2022 \u201CWrite TWO sentences on your whiteboard: one about who Friedrich really was, and one about why his death matters.\u201D
\u2022 Allow 90 seconds writing time.
\u2022 \u201CBoards up.\u201D
\u2022 Scan and share 2\u20133 strong responses.
\u2022 Expected: [Friedrich was a sane, caring man who used his \u201Ccrazy\u201D act to survive. His death matters because he was the last person who truly cared for the horses / because it shows that war destroys good people along with everything else.]

DO:
\u2022 Distribute whiteboards if not already out.
\u2022 Give 90 seconds writing time. Circulate and read over shoulders.
\u2022 \u201C3, 2, 1 \u2014 boards up.\u201D Scan the room systematically.
\u2022 Share 2\u20133 exemplar responses. Briefly explain what makes them strong.
\u2022 Transition: \u201CNow we\u2019re going to shift to our writing focus for today.\u201D

CFU CHECKPOINT:
Technique: Show Me Boards

Script:
\u2022 \u201COn your whiteboard, write TWO sentences: who was Friedrich really, and why does his death matter to the story? You have 90 seconds.\u201D
\u2022 \u201C3, 2, 1 \u2014 boards up.\u201D
\u2022 Scan for: Sentence 1 identifying Friedrich as sane/caring/strategic (not actually crazy). Sentence 2 connecting his death to a broader theme (loss of goodness, futility of war, Joey\u2019s isolation).

PROCEED (if \u226580% write two substantive sentences):
Move to sentence combining. Students have synthesised character understanding effectively.

PIVOT (if <80% write adequate responses):
Most likely issue: Students struggle to move beyond \u201CFriedrich was nice\u201D or \u201Chis death is sad.\u201D They need help with analytical depth.
Reteach: \u201CLet me model this. Here is my sentence about Friedrich: \u2018Friedrich pretended to be crazy, but he was actually the most rational person in the troop because he refused to accept the war as normal.\u2019 See how I explained WHO he really was and WHY he behaved that way? Now for why his death matters: \u2018Friedrich\u2019s death shows that war does not spare the good people \u2014 it destroys the caring and the cruel alike.\u2019 That connects his death to the bigger idea.\u201D
Re-check: \u201CTry again. One sentence about the real Friedrich, one about why his death matters. 60 seconds.\u201D Boards up. Scan for improvement.

TEACHER NOTES:
This CFU combines character analysis (Friedrich) with thematic synthesis (why his death matters). It targets multiple LIs: analysing character attributes, identifying perspective through authorial choices, and questioning the assertions made by authors. The two-sentence format ensures students practise both description and analysis. This is also a bridge to the sentence combining activity \u2014 students are thinking about Friedrich in full sentences, which sets up the material for the next segment. VTLM 2.0: Monitor Progress / Check for Understanding.

WATCH FOR:
\u2022 Students who write only about Friedrich\u2019s actions (\u201Che looked after horses\u201D) without analysing his character \u2014 prompt: \u201CThat\u2019s what he DID. Who was he? What did he believe?\u201D
\u2022 Students who write \u201Chis death is sad\u201D without connecting to theme \u2014 push: \u201CWhy is it sad? What does his death MEAN for the story?\u201D
\u2022 Students who connect Friedrich\u2019s death to Joey\u2019s isolation \u2014 excellent. Highlight this.
\u2022 Readiness signal: \u226580% write analytical sentences that go beyond surface description.

[General: Check for Understanding \u2014 VTLM 2.0: Monitor Progress]`;

const NOTES_SC_IDO = `SAY:
\u2022 \u201CNow we\u2019re shifting to our writing focus: sentence combining. This is a skill that makes your writing more sophisticated and interesting.\u201D
\u2022 \u201CLook at these five short sentences about Friedrich. They are all correct, but they sound choppy and repetitive.\u201D
\u2022 Read them aloud: \u201C\u2018Friedrich talks to himself. Friedrich thinks war is crazy. Friedrich is from Schleiden. Friedrich is a butcher. Friedrich is too afraid to leave the army.\u2019\u201D
\u2022 \u201CHear how \u2018Friedrich\u2019 starts every sentence? And they are all short? Good writers combine simple sentences into longer, more interesting ones using pronouns, commas, and conjunctions.\u201D
\u2022 \u201CWatch me combine these.\u201D
\u2022 Read model aloud: \u201C\u2018Friedrich, a butcher from Schleiden, thinks war is crazy but is too afraid to leave the army so he talks to himself instead.\u2019\u201D
\u2022 \u201CNotice what I did. I used a comma to insert extra information \u2014 \u2018a butcher from Schleiden\u2019 is an appositive phrase. I used \u2018but\u2019 to show contrast. I used \u2018so\u2019 to show cause and effect. And I used \u2018he\u2019 instead of repeating \u2018Friedrich.\u2019\u201D
\u2022 \u201CFive sentences became one clear, complex sentence. That\u2019s sentence combining.\u201D

DO:
\u2022 Display the five short sentences on the left. Read them aloud with deliberately choppy intonation to emphasise the problem.
\u2022 Display the combined sentence on the right. Read it aloud with natural flow.
\u2022 Point to each technique as you name it: pronoun (\u201Che\u201D), commas (appositive), conjunctions (\u201Cbut,\u201D \u201Cso\u201D).
\u2022 This is pure I Do. Students watch and listen. Do NOT ask them to combine yet.
\u2022 Total time: 3 minutes.

TEACHER NOTES:
Sentence combining directly targets the LI on varying sentence structures using simple, compound, and complex sentences for clarity and effect. The five source sentences are all simple sentences with the same subject (\u201CFriedrich\u201D), which makes the repetition obvious. The model answer demonstrates three key techniques: pronoun substitution (he for Friedrich), appositives with commas (a butcher from Schleiden), and coordinating conjunctions (but, so). These map to the curriculum expectation for Grade 5/6. The content is drawn from the reading, reducing cognitive load \u2014 students already know about Friedrich, so they can focus on the STRUCTURE rather than generating new content. DECIDE Framework: E (Execute through modelling). VTLM 2.0: Explicit Explanation and Modelling.

For narrative writing, sentence combining is directly transferable: students who can combine sentences about a character produce more fluent character descriptions in their stories.

MISCONCEPTIONS:
\u2022 Misconception: Longer sentences are always better.
  Why: Students hear \u201Ccombine sentences\u201D and think the goal is maximum length.
  Impact: Students produce run-on sentences that are harder to read, not easier.
  Quick correction: \u201CThe goal is not the longest sentence \u2014 it\u2019s the CLEAREST sentence. Sometimes two sentences are better than one huge one. But five choppy sentences about the same person definitely need combining.\u201D

WATCH FOR:
\u2022 Students who look confused by the terminology (\u201Cappositive,\u201D \u201Ccoordinating conjunction\u201D) \u2014 use simpler language alongside: \u201CAn appositive is just extra information between commas. A conjunction is a joining word like \u2018but\u2019 or \u2018so.\u2019\u201D
\u2022 Students who cannot see the difference between the five short sentences and the combined one \u2014 read both versions aloud again and ask: \u201CWhich sounds better when you hear it?\u201D
\u2022 Readiness signal: Students nod when you point to each technique in the model sentence.

[General: Explicit Instruction (I Do) \u2014 Sentence-Level Writing \u2014 VTLM 2.0: Explicit Explanation and Modelling]`;

const NOTES_SC_WEDO = `SAY:
\u2022 \u201CNow it\u2019s your turn to help. Here are the same five sentences about Friedrich. I want you to combine them into ONE sentence \u2014 but you might come up with something DIFFERENT from my version.\u201D
\u2022 \u201CTalk to your partner. You have 90 seconds to combine these sentences. Use at least one pronoun, one comma, and one conjunction.\u201D
\u2022 After 90 seconds: \u201CWho wants to share their combined sentence?\u201D Take 2\u20133 volunteers.
\u2022 After sharing, click to reveal: \u201CHere\u2019s one strong version. Compare yours \u2014 did you use a pronoun? A comma? A conjunction? Your sentence doesn\u2019t need to match mine. It needs to be clear and combine the ideas.\u201D

DO:
\u2022 Display the five short sentences. Give 90 seconds for partner work.
\u2022 Circulate and listen. Look for students using pronouns, commas, and conjunctions.
\u2022 Select 2\u20133 pairs to share. Choose a range: one strong example, one that needs refinement.
\u2022 Click to reveal the model answer after sharing.
\u2022 Briefly compare: \u201CNotice how this version handles the information. Your version might order things differently, and that\u2019s fine.\u201D

CFU CHECKPOINT:
Technique: Partner Work + Cold Call

Script:
\u2022 \u201CWith your partner, combine these five sentences into one. Use at least one pronoun, one comma, and one conjunction. 90 seconds.\u201D
\u2022 Circulate. Listen for: pronoun use, comma placement, conjunction choice.
\u2022 Cold call 2\u20133 pairs: \u201CRead me your combined sentence.\u201D
\u2022 Scan for: Sentences that combine at least 3 of the 5 source sentences with grammatical accuracy.

PROCEED (if \u226580% produce a reasonable combined sentence):
Move to You Do. Students are ready for independent practice.

PIVOT (if <80% struggle to combine):
Most likely issue: Students try to keep all five sentences and end up with a run-on, OR they do not know where to start.
Reteach: \u201CLet me give you a starting frame: \u2018Friedrich, who is from [blank], thinks [blank] but [blank].\u2019 Fill in the blanks with information from the sentences. That\u2019s combining!\u201D
Re-check: \u201CTry again with the frame. 60 seconds.\u201D Listen for improvement.

ENABLING & EXTENDING:
ENABLING PROMPT:
\u2022 Task: Provide a sentence frame: "Friedrich, a [blank] from [blank], thinks [blank] but [blank]." Students fill in blanks using information from the five sentences. This removes the structural challenge and focuses on content selection.

EXTENDING PROMPT:
\u2022 Task: Students combine the sentences in TWO different ways, then choose which version they prefer and explain why. This develops metalinguistic awareness - they evaluate their own sentence construction.

TEACHER NOTES:
The We Do uses the same five sentences from the I Do, but now students generate their own combinations. This is deliberate: the content is familiar, reducing cognitive load. Multiple valid answers exist \u2014 the reveal shows one strong version, but students should understand that sentence combining has no single \u201Ccorrect\u201D answer. What matters is clarity, grammar, and effective use of pronouns/commas/conjunctions. Accepting different valid combinations validates student thinking and models the flexibility of English syntax. VTLM 2.0: Scaffold Practice.

WATCH FOR:
\u2022 Students who produce a run-on sentence (no commas, no full stops, just \u201Cand\u201D chains) \u2014 redirect: \u201CI can see you\u2019ve connected the ideas. Now add a comma and a conjunction to make it flow.\u201D
\u2022 Students who only combine 2 of the 5 sentences \u2014 that\u2019s okay for now. Acknowledge the effort: \u201CGood start. Can you add one more piece of information?\u201D
\u2022 Students who produce a sentence very similar to the teacher model \u2014 that\u2019s fine. They were paying attention.
\u2022 Readiness signal: \u226580% produce a combined sentence with at least one pronoun and one conjunction.

[General: Guided Practice (We Do) \u2014 Sentence-Level Writing \u2014 VTLM 2.0: Scaffold Practice]`;

const NOTES_SC_YOUDO = `SAY:
\u2022 \u201CNow you\u2019re working independently. On your worksheet, you will see the same five sentences about Friedrich.\u201D
\u2022 \u201CFirst: Read all five sentences carefully.\u201D
\u2022 \u201CNext: Combine them into one clear, complex sentence. Use at least one pronoun, one comma, and one conjunction.\u201D
\u2022 \u201CThen: If you finish, try the challenge at the bottom \u2014 write a combined sentence about Topthorn\u2019s final moments using at least two conjunctions.\u201D
\u2022 \u201CYou have 5 minutes. Pencils up when you\u2019re done.\u201D

DO:
\u2022 Distribute the Sentence Combining Worksheet (printed from companion PDF).
\u2022 Set a timer for 5 minutes (visible if possible).
\u2022 Circulate immediately. Start with students who struggled during We Do.
\u2022 For the first 2 minutes, check that students are attempting to combine (not just copying sentences).
\u2022 Conference briefly with stuck students: \u201CWhich two sentences could you join first? What word could connect them?\u201D
\u2022 After 5 minutes, collect or review. Share 1\u20132 strong examples.

ENABLING & EXTENDING:
ENABLING PROMPT:
\u2022 Task: Reduce the five sentences to three. Students combine three sentences instead of five. The worksheet has a note: \u201CSupport: Choose three sentences and combine them.\u201D This lowers the cognitive load while maintaining the skill focus.

EXTENDING PROMPT:
\u2022 Task: The challenge section asks students to write a combined sentence about Topthorn\u2019s final moments using at least two conjunctions. This requires students to generate content (from memory of Chapter 14) AND combine sentences \u2014 a higher cognitive demand.

TEACHER NOTES:
This is the You Do phase \u2014 independent practice of the sentence combining skill. The worksheet provides the five source sentences in print, reducing working memory load (students do not need to remember the sentences while constructing their combined version). The 5-minute window is tight but deliberate for a content-heavy lesson. The challenge extension (Topthorn\u2019s final moments) serves two purposes: it extends the skill and it gives students a structured way to process the emotional content of Chapter 14 through writing. Writing about emotional events is therapeutic and pedagogically sound. DECIDE Framework: D (Differentiate through fading) \u2014 the scaffold is removed; students work independently. VTLM 2.0: Supported Application.

WATCH FOR:
\u2022 Students who write a sentence that is grammatically incorrect (missing commas, misplaced conjunctions) \u2014 conference: \u201CRead it aloud. Does it sound right? Where do you need a pause?\u201D
\u2022 Students who finish very quickly with a minimal sentence \u2014 redirect to the challenge: \u201CGreat. Now try the Topthorn challenge at the bottom.\u201D
\u2022 Students who are still emotionally affected and struggle to write \u2014 a quiet \u201CWrite what you can. Even two sentences combined is a success\u201D is sufficient.
\u2022 Readiness signal: \u226570% produce a combined sentence with at least one pronoun and one conjunction. Students who attempt the challenge demonstrate strong understanding.

[General: Independent Practice (You Do) \u2014 Sentence-Level Writing \u2014 VTLM 2.0: Supported Application]`;

const NOTES_CLOSING = `SAY:
\u2022 \u201CLet\u2019s reflect on what we read and learned today.\u201D
\u2022 Read the reflection prompt: \u201CFriedrich said the war was the real \u2018craziness\u2019 \u2014 not him. What does his story make you think about how we judge people?\u201D
\u2022 Allow 60 seconds Turn & Talk.
\u2022 Share 1\u20132 responses. Then read the takeaways.
\u2022 \u201CCheck the success criteria. Can you identify a simile and explain what is being compared? Thumbs up. Can you combine sentences about a character using pronouns and conjunctions? Thumbs up. Can you explain how Friedrich challenges what it means to be 'crazy'? Thumbs up.\u201D
\u2022 \u201CToday\u2019s chapters were intense. You handled them with maturity. Well done.\u201D

DO:
\u2022 Run Turn & Talk for 60 seconds. Circulate briefly.
\u2022 Share 1\u20132 responses. Keep it brisk.
\u2022 Read the three takeaways. Connect each to a specific moment in the lesson.
\u2022 Run the three-point thumbs up self-assessment against SCs.
\u2022 End warmly. Acknowledge the emotional weight of the reading.
\u2022 Collect worksheets.

TEACHER NOTES:
The reflection prompt bridges the reading content (Friedrich\u2019s \u201Ccraziness\u201D) with a real-world ethical question (how we judge people). This makes the lesson sticky \u2014 students leave with both an academic takeaway (sentence combining) and a personal one (the danger of judging people by appearances). The three takeaways mirror the three SCs: simile analysis, character analysis, sentence combining. The thumbs-up self-assessment gives the teacher quick data on which SC needs revisiting. The final warm acknowledgement is important after an emotionally heavy lesson \u2014 it closes the emotional container the sensitivity framing opened. VTLM 2.0: Retention and Recall / Consolidation.

WATCH FOR:
\u2022 Students who rush the self-assessment \u2014 pause: \u201CBe honest with yourself. If you\u2019re not sure about sentence combining yet, that\u2019s okay. We\u2019ll practise more.\u201D
\u2022 Students who want to discuss what happens next in the book \u2014 acknowledge: \u201CGreat question. We\u2019ll find out in Lesson 18.\u201D
\u2022 Students who are still visibly affected by the reading \u2014 a quiet check-in after class is appropriate.
\u2022 Readiness signal: Most students give honest thumbs up on at least 2 of 3 SCs. A calm, purposeful close.

[General: Closing / Review \u2014 VTLM 2.0: Retention and Recall]`;

const NOTES_RESOURCES = `SAY:
\u2022 \u201CThese are the companion resources for today\u2019s lesson. You can print the worksheet for student use and keep the answer key for your reference.\u201D

DO:
\u2022 Click on the PDF links to verify they open correctly before the lesson.
\u2022 Print the ${WORKSHEET_RESOURCE.name} \u2014 one per student (or one per pair if reducing paper).
\u2022 Keep the ${ANSWER_KEY_RESOURCE.name} for teacher reference during the You Do phase.

TEACHER NOTES:
Two companion PDFs are provided:
1. ${WORKSHEET_RESOURCE.name} - contains the five source sentences, lined space for student response, and a challenge extension about Topthorn.
2. ${ANSWER_KEY_RESOURCE.name} - the teacher model answer plus alternative valid combinations for reference during marking or conferencing.

Print before the lesson. The worksheet is designed for the You Do phase (Slide 19).

[General: Resources \u2014 VTLM 2.0: Planning and Preparation]`;

// ─────────────────────────────────────────────────────────────────────────────
// PDF Generation
// ─────────────────────────────────────────────────────────────────────────────

async function generateWorksheetPdf() {
  const doc = createPdf({ title: WORKSHEET_RESOURCE.name });

  let y = addPdfHeader(doc, "Sentence Combining \u2014 Friedrich", {
    subtitle: "War Horse Chapters 13\u201314",
    lessonInfo: "Lesson 17 of 25 | Week 4 | Year 5/6 Literacy",
    color: C.PRIMARY,
    showNameDate: true,
  });

  y += 6;
  y = addSectionHeading(doc, "Combine these sentences about Friedrich", y, { color: C.PRIMARY });

  y = addBodyText(doc, "Read the five sentences below. They are all about the same character but they sound choppy and repetitive. Your task is to combine them into ONE clear, complex sentence.", y);

  y = addTipBox(doc, "Use at least one pronoun (he, his), one comma, and one conjunction (and, but, so, because, although, who).", y, { color: C.SECONDARY });

  y += 4;
  y = addSectionHeading(doc, "Source Sentences", y, { color: C.ACCENT });

  const sentences = [
    "1.  Friedrich talks to himself.",
    "2.  Friedrich thinks war is crazy.",
    "3.  Friedrich is from Schleiden.",
    "4.  Friedrich is a butcher.",
    "5.  Friedrich is too afraid to leave the army.",
  ];

  sentences.forEach((s) => {
    y = addBodyText(doc, s, y, { fontSize: 12 });
    y += 2;
  });

  y += 4;
  y = addSectionHeading(doc, "Your Combined Sentence", y, { color: C.PRIMARY });

  y = addBodyText(doc, "Write your combined sentence on the lines below:", y, { italic: true });

  y = addLinedArea(doc, y + 6, 6, { lineSpacing: 30 });

  y += 10;
  y = addTipBox(doc, "Support: If five sentences feel like too many, start by choosing three and combining those.", y, { color: C.SUCCESS });

  y += 10;
  y = addSectionHeading(doc, "Challenge", y, { color: C.ALERT });

  y = addBodyText(doc, "Write a combined sentence about Topthorn\u2019s final moments using at least TWO conjunctions. Think about what happened by the river, Topthorn\u2019s collapse, and Joey\u2019s refusal to leave.", y);

  y = addLinedArea(doc, y + 6, 5, { lineSpacing: 30 });

  addPdfFooter(doc, "War Horse | Lesson 17 of 25 | Week 4 | Year 5/6 Literacy");

  await writePdf(doc, WORKSHEET_PDF_PATH);
  console.log(`\u2713 Written ${WORKSHEET_RESOURCE.name}.pdf`);
}

async function generateAnswerKeyPdf() {
  const doc = createPdf({ title: ANSWER_KEY_RESOURCE.name });

  let y = addPdfHeader(doc, "Sentence Combining \u2014 Answer Key", {
    subtitle: "Teacher Reference \u2014 War Horse Chapters 13\u201314",
    lessonInfo: "Lesson 17 of 25 | Week 4 | Year 5/6 Literacy",
    color: C.ALERT,
    showNameDate: false,
  });

  y += 6;
  y = addSectionHeading(doc, "Source Sentences", y, { color: C.PRIMARY });

  const sentences = [
    "1.  Friedrich talks to himself.",
    "2.  Friedrich thinks war is crazy.",
    "3.  Friedrich is from Schleiden.",
    "4.  Friedrich is a butcher.",
    "5.  Friedrich is too afraid to leave the army.",
  ];

  sentences.forEach((s) => {
    y = addBodyText(doc, s, y, { fontSize: 11 });
    y += 1;
  });

  y += 8;
  y = addSectionHeading(doc, "Model Answer", y, { color: C.ACCENT });

  y = addBodyText(doc, "\u201CFriedrich, a butcher from Schleiden, thinks war is crazy but is too afraid to leave the army so he talks to himself instead.\u201D", y, { fontSize: 12 });

  y += 4;
  y = addTipBox(doc, "Key techniques used: appositive phrase with commas (\u201Ca butcher from Schleiden\u201D), coordinating conjunctions (\u201Cbut\u201D and \u201Cso\u201D), pronoun substitution (\u201Che\u201D for \u201CFriedrich\u201D).", y, { color: C.SECONDARY });

  y += 10;
  y = addSectionHeading(doc, "Alternative Valid Combinations", y, { color: C.PRIMARY });

  y = addBodyText(doc, "1.  \u201CAlthough Friedrich is a butcher from Schleiden who thinks war is crazy, he is too afraid to leave the army, so he talks to himself instead.\u201D", y, { fontSize: 11 });
  y += 4;
  y = addBodyText(doc, "2.  \u201CFriedrich, who is from Schleiden and works as a butcher, talks to himself because he thinks war is crazy but he is too afraid to leave the army.\u201D", y, { fontSize: 11 });
  y += 4;
  y = addBodyText(doc, "3.  \u201CBecause Friedrich thinks war is crazy but is too afraid to leave the army, the butcher from Schleiden talks to himself as a way of coping.\u201D", y, { fontSize: 11 });

  y += 12;
  y = addSectionHeading(doc, "Challenge \u2014 Sample Response (Topthorn)", y, { color: C.ALERT });

  y = addBodyText(doc, "\u201CWhile the troop was resting by the river, Topthorn collapsed and died, and although Friedrich tried to lead Joey away, Joey refused to leave his friend\u2019s side.\u201D", y, { fontSize: 11 });

  y += 6;
  y = addTipBox(doc, "Accept any combined sentence about Topthorn\u2019s final moments that uses at least two conjunctions and is grammatically accurate. Content does not need to match this sample exactly.", y, { color: C.SUCCESS });

  y += 12;
  y = addSectionHeading(doc, "Marking Notes", y, { color: C.SECONDARY });

  y = addBodyText(doc, "Look for:", y, { fontSize: 11 });
  const criteria = [
    "\u2022  At least one pronoun replacing \u201CFriedrich\u201D (he, his, who)",
    "\u2022  At least one comma used correctly (appositive, list, or conjunction boundary)",
    "\u2022  At least one conjunction joining ideas (and, but, so, because, although, who, while)",
    "\u2022  The combined sentence makes grammatical sense when read aloud",
    "\u2022  Information from at least 3 of the 5 source sentences is included",
  ];
  criteria.forEach((c) => {
    y = addBodyText(doc, c, y, { fontSize: 10 });
  });

  addPdfFooter(doc, "War Horse | Lesson 17 of 25 | Week 4 | Year 5/6 Literacy \u2014 TEACHER REFERENCE");

  await writePdf(doc, ANSWER_KEY_PDF_PATH);
  console.log(`\u2713 Written ${ANSWER_KEY_RESOURCE.name}.pdf`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main build
// ─────────────────────────────────────────────────────────────────────────────

(async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Explicit Teaching Slide Generator";
  pres.title  = "War Horse - Lesson 17 - Chapters 13-14: Friedrich and Topthorn";

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1: TITLE
  // ═══════════════════════════════════════════════════════════════════════════
  titleSlide(
    pres,
    "Friedrich and Topthorn",
    "War Horse \u2014 Chapters 13\u201314",
    "Lesson 17 of 25  |  Week 4  |  Year 5/6 Literacy",
    NOTES_TITLE
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2: LEARNING INTENTION & SUCCESS CRITERIA
  // ═══════════════════════════════════════════════════════════════════════════
  liSlide(
    pres,
    [
      "We are learning to analyse how Morpurgo uses language and characterisation in Chapters 13-14, and to combine ideas about a character into clearer sentences",
    ],
    [
      "I can identify a simile in the text and explain what is being compared",
      "I can combine short sentences about a character using pronouns, commas and conjunctions",
      "I can explain how Friedrich\u2019s character challenges what it means to be \u201Ccrazy\u201D in wartime",
    ],
    NOTES_LI,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3: VOCABULARY — lush
  // ═══════════════════════════════════════════════════════════════════════════
  vocabSlide(
    pres,
    "lush",
    "adjective",
    "Growing thickly and strongly; rich, green, and abundant. Used to describe vegetation or landscapes that are full of life.",
    "\u201CThe land around them grew lush and green as spring took hold.\u201D \u2014 Chapter 13",
    NOTES_VOCAB_LUSH,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4: VOCABULARY — serenity
  // ═══════════════════════════════════════════════════════════════════════════
  vocabSlide(
    pres,
    "serenity",
    "noun",
    "A state of being calm, peaceful, and untroubled. Complete inner calm, even in difficult circumstances.",
    "\u201CTopthorn carried himself with a quiet serenity that set him apart from every other horse.\u201D \u2014 Chapter 13",
    NOTES_VOCAB_SERENITY,
    FOOTER
  );

  // Incidental vocabulary slide omitted — lean profile default (OFF).
  // Teacher can surface words during reading as needed.

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 6: READING INTRODUCTION — Chapter 13
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addBadge(s, "Read Aloud", { color: C.PRIMARY });
    addTitle(s, "Chapter 13: Spring and Friedrich");

    const crdH = SAFE_BOTTOM - CONTENT_TOP;
    addCard(s, 0.5, CONTENT_TOP, 5.4, crdH, { strip: C.PRIMARY, fill: C.WHITE });

    // Reading info
    s.addText("Pages 105\u2013114", {
      x: 0.75, y: CONTENT_TOP + 0.12, w: 4.8, h: 0.30,
      fontSize: 14, fontFace: FONT_B, color: C.PRIMARY, bold: true, margin: 0,
    });
    s.addText("Reading Mode: Student Read Aloud", {
      x: 0.75, y: CONTENT_TOP + 0.48, w: 4.8, h: 0.30,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    // Focus prompt
    s.addShape("rect", {
      x: 0.57, y: CONTENT_TOP + 1.0, w: 5.26, h: 0.02,
      fill: { color: C.ACCENT },
    });
    s.addText("As you read, think about\u2026", {
      x: 0.75, y: CONTENT_TOP + 1.15, w: 4.8, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.ACCENT, bold: true, margin: 0,
    });
    s.addText("A new character \u2014 Friedrich \u2014 enters the story. The other soldiers think he is crazy. But is he? Pay attention to what Friedrich says and does. What kind of person is he really?", {
      x: 0.75, y: CONTENT_TOP + 1.48, w: 4.8, h: 1.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Right side — chapter overview
    addCard(s, 6.1, CONTENT_TOP, 3.4, crdH, { fill: C.BG_LIGHT });
    s.addText("Big Ideas", {
      x: 6.3, y: CONTENT_TOP + 0.10, w: 3.0, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.PRIMARY, bold: true, margin: 0,
    });
    const bigIdeas = [
      "Spring arrives \u2014 conditions improve",
      "More food for Joey and Topthorn",
      "Friedrich is assigned to care for the horses",
      "Soldiers think Friedrich is crazy",
      "Friedrich confides his act is a front",
      "Friedrich takes a liking to Topthorn",
    ];
    s.addText(
      bigIdeas.map((t, i) => ({
        text: t,
        options: { bullet: true, breakLine: i < bigIdeas.length - 1, fontSize: 10, color: C.CHARCOAL },
      })),
      {
        x: 6.3, y: CONTENT_TOP + 0.44, w: 3.0, h: crdH - 0.60,
        fontFace: FONT_B, valign: "top", margin: 0,
      }
    );

    addFooter(s, FOOTER);
    s.addNotes(NOTES_READING_CH13);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 7-8: PAUSE POINT 1 — Friedrich's identity (p.109, withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 1", "Chapter 13 \u2014 p. 109",
      "\u201C\u2026so that I can return again to Schleiden and become Butcher Friedrich that everyone knew and respected before all this mess began.\u201D",
      "p. 109",
      "What does the author want us to know about Friedrich?",
      NOTES_PAUSE1, FOOTER
    ),
    (slide) => {
      const ansY = 3.62;
      slide.addShape("roundRect", {
        x: 0.57, y: ansY, w: 8.86, h: 1.38, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      });
      slide.addText("Expected Response", {
        x: 0.75, y: ansY + 0.08, w: 3, h: 0.26,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      slide.addText("Friedrich was a respected butcher from Schleiden \u2014 an ordinary man with an ordinary life. He is not truly \u201Ccrazy\u201D \u2014 his behaviour is a deliberate act. He thinks the war itself is the real insanity.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 9-10: PAUSE POINT 2 — Beauty amidst war (p.113, withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 2", "Chapter 13 \u2014 p. 113",
      "\u201CWe don\u2019t belong in the same universe as a creature like this.\u201D",
      "p. 113",
      "What\u2019s the big idea here?",
      NOTES_PAUSE2, FOOTER
    ),
    (slide) => {
      const ansY = 3.62;
      slide.addShape("roundRect", {
        x: 0.57, y: ansY, w: 8.86, h: 1.38, rectRadius: 0.08,
        fill: { color: C.ACCENT },
      });
      slide.addText("The Big Idea", {
        x: 0.75, y: ansY + 0.08, w: 3, h: 0.26,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      slide.addText("Friedrich is saying that Topthorn \u2014 beautiful, noble, serene \u2014 does not belong in a world of war. The horse represents everything good that war corrupts. Morpurgo uses Friedrich to voice his anti-war message.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 11: LITERARY DEVICE — Simile (butterfly on a dung heap)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addBadge(s, "I Do", { color: C.PRIMARY });
    addTitle(s, "Literary Device \u2014 Simile");

    // Simile quote card
    const c1Y = CONTENT_TOP;
    const c1H = 2.1;
    addCard(s, 0.5, c1Y, 9, c1H, { fill: C.PRIMARY });
    s.addText("\u201C", {
      x: 0.6, y: c1Y + 0.05, w: 0.6, h: 0.7,
      fontSize: 52, fontFace: FONT_H, color: C.ACCENT, margin: 0,
    });
    s.addText("And to find a horse like this in the middle of this filthy abomination of a war, is for me like finding a butterfly on a dung heap.", {
      x: 1.1, y: c1Y + 0.18, w: 7.6, h: 1.4,
      fontSize: 16, fontFace: FONT_H, color: C.WHITE, italic: true, margin: 0,
    });
    s.addText("p. 113", {
      x: 8.5, y: c1Y + 1.72, w: 0.9, h: 0.24,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, align: "right", margin: 0,
    });

    // Analysis card — two columns
    const c2Y = c1Y + c1H + 0.15;
    const c2H = SAFE_BOTTOM - c2Y;
    const colW = 4.3;

    // Left — Butterfly
    addCard(s, 0.5, c2Y, colW, c2H, { strip: C.SUCCESS, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.72, y: c2Y + 0.10, w: 1.6, h: 0.32, rectRadius: 0.08,
      fill: { color: C.SUCCESS },
    });
    s.addText("Butterfly", {
      x: 0.72, y: c2Y + 0.10, w: 1.6, h: 0.32,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("= Topthorn / beauty / innocence / something precious and delicate that does not belong in war", {
      x: 0.72, y: c2Y + 0.50, w: 3.8, h: c2H - 0.60,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, valign: "top", margin: 0,
    });

    // Right — Dung Heap
    addCard(s, 5.0, c2Y, 4.5, c2H, { strip: C.ALERT, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 5.22, y: c2Y + 0.10, w: 1.8, h: 0.32, rectRadius: 0.08,
      fill: { color: C.ALERT },
    });
    s.addText("Dung Heap", {
      x: 5.22, y: c2Y + 0.10, w: 1.8, h: 0.32,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("= The war / destruction / filth / everything senseless and ugly about the conflict", {
      x: 5.22, y: c2Y + 0.50, w: 4.0, h: c2H - 0.60,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, valign: "top", margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_SIMILE);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 12: READING INTRODUCTION — Chapter 14
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.ALERT);
    addBadge(s, "Read Aloud", { color: C.ALERT });
    addTitle(s, "Chapter 14: By the River");

    const crdH = SAFE_BOTTOM - CONTENT_TOP;
    addCard(s, 0.5, CONTENT_TOP, 5.4, crdH, { strip: C.ALERT, fill: C.WHITE });

    // Reading info
    s.addText("Pages 114\u2013117", {
      x: 0.75, y: CONTENT_TOP + 0.12, w: 4.8, h: 0.30,
      fontSize: 14, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0,
    });
    s.addText("Reading Mode: Student Read Aloud", {
      x: 0.75, y: CONTENT_TOP + 0.48, w: 4.8, h: 0.30,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    // Sensitivity framing
    s.addShape("rect", {
      x: 0.57, y: CONTENT_TOP + 1.0, w: 5.26, h: 0.02,
      fill: { color: C.ALERT },
    });
    s.addText("Before we begin\u2026", {
      x: 0.75, y: CONTENT_TOP + 1.15, w: 4.8, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0,
    });
    s.addText("This chapter contains some intense and emotional moments. If you find it difficult, that is completely okay. We will talk about it together.", {
      x: 0.75, y: CONTENT_TOP + 1.48, w: 4.8, h: 1.0,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Right side — focus prompts
    addCard(s, 6.1, CONTENT_TOP, 3.4, crdH, { fill: C.BG_LIGHT });
    s.addText("As You Read", {
      x: 6.3, y: CONTENT_TOP + 0.10, w: 3.0, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0,
    });
    const prompts = [
      "Notice how the chapter begins calmly",
      "Pay attention to the PACE \u2014 when does it change?",
      "Watch Morpurgo\u2019s word choices: \u201Cfrantically,\u201D \u201Chauling,\u201D \u201Cstraining\u201D",
      "Compare this chapter\u2019s mood to Chapter 13",
    ];
    s.addText(
      prompts.map((t, i) => ({
        text: t,
        options: { bullet: true, breakLine: i < prompts.length - 1, fontSize: 10, color: C.CHARCOAL },
      })),
      {
        x: 6.3, y: CONTENT_TOP + 0.44, w: 3.0, h: crdH - 0.60,
        fontFace: FONT_B, valign: "top", margin: 0,
      }
    );

    addFooter(s, FOOTER);
    s.addNotes(NOTES_READING_CH14);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 13-14: PAUSE POINT 3 — The shelling (p.117, withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 3", "Chapter 14 \u2014 p. 117",
      "\u201C\u2026with the gunners hauling frantically on their reins and straining to push the gun from behind.\u201D",
      "p. 117",
      "What just happened?",
      NOTES_PAUSE3, FOOTER
    ),
    (slide) => {
      const ansY = 3.62;
      slide.addShape("roundRect", {
        x: 0.57, y: ansY, w: 8.86, h: 1.38, rectRadius: 0.08,
        fill: { color: C.PRIMARY },
      });
      slide.addText("What Happened", {
        x: 0.75, y: ansY + 0.08, w: 3, h: 0.26,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      slide.addText("Topthorn collapsed and died by the river. Joey refused to leave his side. A shelling began. Friedrich tried to lead Joey away but was hit. The troop retreated, leaving Joey alone \u2014 without his companion or his caretaker.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 15: CFU — Character Analysis
  // ═══════════════════════════════════════════════════════════════════════════
  cfuSlide(
    pres,
    "CFU",
    "Friedrich \u2014 Character Check",
    "Show Me Boards",
    "Write TWO sentences on your whiteboard:\n1. Who was the REAL Friedrich? (not the act)\n2. Why does his death matter to the story?",
    NOTES_CFU,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 16: SENTENCE COMBINING — I Do (Modelling)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addBadge(s, "I Do \u2014 Watch Me", { color: C.PRIMARY, w: 2.2 });
    addTitle(s, "Sentence Combining");

    const cardH = SAFE_BOTTOM - CONTENT_TOP;

    // Left card — source sentences
    addCard(s, 0.5, CONTENT_TOP, 4.3, cardH, { strip: C.SECONDARY, fill: C.WHITE });
    s.addText("Short Sentences", {
      x: 0.72, y: CONTENT_TOP + 0.08, w: 3.8, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.SECONDARY, bold: true, margin: 0,
    });

    const shortSentences = [
      "Friedrich talks to himself.",
      "Friedrich thinks war is crazy.",
      "Friedrich is from Schleiden.",
      "Friedrich is a butcher.",
      "Friedrich is too afraid to leave the army.",
    ];
    s.addText(
      shortSentences.map((t, i) => ({
        text: t,
        options: { bullet: true, breakLine: i < shortSentences.length - 1, fontSize: 12, color: C.CHARCOAL },
      })),
      {
        x: 0.72, y: CONTENT_TOP + 0.42, w: 3.8, h: cardH - 0.60,
        fontFace: FONT_B, valign: "top", margin: 0,
      }
    );

    // Right card — combined sentence (teacher model)
    addCard(s, 5.0, CONTENT_TOP, 4.5, cardH, { strip: C.ACCENT, fill: C.BG_CARD });
    s.addText("Combined Sentence", {
      x: 5.2, y: CONTENT_TOP + 0.08, w: 4.1, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.ACCENT, bold: true, margin: 0,
    });
    s.addText("\u201CFriedrich, a butcher from Schleiden, thinks war is crazy but is too afraid to leave the army so he talks to himself instead.\u201D", {
      x: 5.2, y: CONTENT_TOP + 0.48, w: 4.1, h: 1.6,
      fontSize: 14, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Technique labels
    const techY = CONTENT_TOP + 2.2;
    const techniques = [
      { label: "Pronoun", desc: "\u201Che\u201D replaces \u201CFriedrich\u201D", color: C.PRIMARY },
      { label: "Commas", desc: "appositive: \u201Ca butcher from Schleiden\u201D", color: C.SECONDARY },
      { label: "Conjunctions", desc: "\u201Cbut\u201D + \u201Cso\u201D join ideas", color: C.ACCENT },
    ];
    techniques.forEach((tech, i) => {
      const ty = techY + i * 0.50;
      s.addShape("roundRect", {
        x: 5.2, y: ty, w: 1.6, h: 0.34, rectRadius: 0.08,
        fill: { color: tech.color },
      });
      s.addText(tech.label, {
        x: 5.2, y: ty, w: 1.6, h: 0.34,
        fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      s.addText(tech.desc, {
        x: 6.9, y: ty, w: 2.5, h: 0.34,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_SC_IDO);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 17-18: SENTENCE COMBINING — We Do (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addBadge(s, "We Do", { color: C.SECONDARY });
      addTitle(s, "Your Turn to Combine");

      const cardH = SAFE_BOTTOM - CONTENT_TOP;
      addCard(s, 0.5, CONTENT_TOP, 9, cardH, { strip: C.SECONDARY, fill: C.WHITE });

      s.addText("Combine these five sentences into ONE sentence.", {
        x: 0.72, y: CONTENT_TOP + 0.10, w: 8.5, h: 0.30,
        fontSize: 12, fontFace: FONT_B, color: C.SECONDARY, bold: true, margin: 0,
      });
      s.addText("Use at least one pronoun, one comma, and one conjunction.", {
        x: 0.72, y: CONTENT_TOP + 0.42, w: 8.5, h: 0.26,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });

      const wdSentences = [
        "1.  Friedrich talks to himself.",
        "2.  Friedrich thinks war is crazy.",
        "3.  Friedrich is from Schleiden.",
        "4.  Friedrich is a butcher.",
        "5.  Friedrich is too afraid to leave the army.",
      ];

      const startY = CONTENT_TOP + 0.84;
      const itemH = 0.40;
      wdSentences.forEach((t, i) => {
        const iy = startY + i * (itemH + 0.05);
        s.addShape("roundRect", {
          x: 0.72, y: iy, w: 8.26, h: itemH, rectRadius: 0.06,
          fill: { color: C.BG_LIGHT },
        });
        s.addText(t, {
          x: 0.92, y: iy, w: 7.8, h: itemH,
          fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
        });
      });

      // Partner work prompt
      const promptY = startY + 5 * (itemH + 0.05) + 0.08;
      s.addShape("roundRect", {
        x: 2.5, y: promptY, w: 5, h: 0.40, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      });
      s.addText("Work with your partner \u2014 90 seconds", {
        x: 2.5, y: promptY, w: 5, h: 0.40,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_SC_WEDO);
      return s;
    },
    (slide) => {
      // Reveal: model answer overlay at bottom of content area
      const ansY = 3.80;
      slide.addShape("roundRect", {
        x: 0.57, y: ansY, w: 8.86, h: 1.05, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      });
      slide.addText("One Strong Version", {
        x: 0.75, y: ansY + 0.06, w: 3, h: 0.24,
        fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      slide.addText("\u201CFriedrich, a butcher from Schleiden, thinks war is crazy but is too afraid to leave the army so he talks to himself instead.\u201D", {
        x: 0.75, y: ansY + 0.34, w: 8.5, h: 0.66,
        fontSize: 13, fontFace: FONT_H, color: C.WHITE, italic: true, valign: "top", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 19: SENTENCE COMBINING — You Do
  // ═══════════════════════════════════════════════════════════════════════════
  taskSlide(
    pres,
    "You Do", "Sentence Combining \u2014 Independent Practice",
    [
      { label: "First", instruction: "Read all five sentences about Friedrich on your worksheet." },
      { label: "Next", instruction: "Combine them into ONE clear sentence. Use at least one pronoun, one comma, and one conjunction." },
      { label: "Then", instruction: "If you finish, try the Challenge: write a combined sentence about Topthorn\u2019s final moments using at least two conjunctions." },
    ],
    NOTES_SC_YOUDO,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 20: CLOSING
  // ═══════════════════════════════════════════════════════════════════════════
  closingSlide(
    pres,
    "Friedrich said the war was the real \u201Ccraziness\u201D \u2014 not him. What does his story make you think about how we judge people?",
    [
      "We analysed how Morpurgo\u2019s simile creates meaning about beauty and war",
      "We explored how Friedrich challenges what it means to be \u201Ccrazy\u201D in wartime",
      "We practised combining sentences using pronouns, commas, and conjunctions",
    ],
    NOTES_CLOSING
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 21: RESOURCES
  // ═══════════════════════════════════════════════════════════════════════════
  addResourceSlide(
    pres,
    RESOURCE_ITEMS,
    { C, FONT_H, FONT_B },
    FOOTER,
    NOTES_RESOURCES
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // WRITE FILES
  // ═══════════════════════════════════════════════════════════════════════════
  await pres.writeFile({ fileName: OUT_DIR + "/WH4_Lesson17.pptx" });
  console.log("\u2713 Written to " + OUT_DIR + "/WH4_Lesson17.pptx");

  await generateWorksheetPdf();
  await generateAnswerKeyPdf();
  console.log("\u2713 All files written to " + OUT_DIR);
})();
