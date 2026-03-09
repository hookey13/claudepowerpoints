// War Horse — Lesson 16: Pulling the Gun (Chapter 12)
// Week 4, Lesson 1 of 3 | Year 5/6 Literacy
// Uses shared helpers from themes/wh4_helpers.js

"use strict";

const pptxgen = require("pptxgenjs");
const fs      = require("fs");

const {
  C, FONT_H, FONT_B,
  makeCardShadow,
  SAFE_BOTTOM, CONTENT_TOP,
  addTopBar, addBadge, addTitle, addCard, addFooter,
  withReveal,
  titleSlide, liSlide, contentSlide, vocabSlide,
  quoteSlide, cfuSlide, taskSlide, modellingSlide, closingSlide,
} = require("../themes/wh4_helpers");

const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addBodyText, addTipBox, addPdfFooter, addLinedArea,
  addResourceSlide,
} = require("../themes/pdf_helpers");

const FOOTER  = "War Horse | Lesson 16 of 25 | Week 4 | Year 5/6 Literacy";
const OUT_DIR = "output/WH4_Lesson16_Pulling_The_Gun";
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// =============================================================================
// Teacher notes
// =============================================================================

const NOTES_TITLE = `SAY:
\u2022 Welcome back to War Horse \u2014 we are starting a new chapter today
\u2022 Chapter 12 marks a big shift in Joey and Topthorn\u2019s story \u2014 they have a completely new role now
\u2022 The title gives you a clue: \u201CPulling the Gun.\u201D What do you think that might involve? [Brief think time, no hands yet]
\u2022 As we read, pay close attention to how Morpurgo describes the conditions the horses face \u2014 the language he uses is incredibly powerful

DO:
\u2022 Display this slide as students settle. Allow 15 seconds for students to read the title and subtitle.
\u2022 Do not elaborate on the plot yet \u2014 let anticipation build.
\u2022 Have copies of War Horse open to page 97 on desks.

TEACHER NOTES:
Chapter 12 is one of the most harrowing chapters in the novel. Joey and Topthorn are reassigned from cavalry to artillery \u2014 pulling heavy guns through thick mud in appalling conditions. The chapter is rich in imagery and alliteration, making it ideal for close reading. Two horses die in this chapter and Topthorn becomes seriously ill, so sensitivity is needed. The tone shifts from the relative stability of the previous chapters to sustained suffering. This is strong material for narrative writing connections \u2014 Morpurgo shows how an author builds atmosphere through accumulated sensory detail. Students doing NAPLAN preparation will benefit from seeing how a skilled author constructs extended descriptions.

SENSITIVITY ADVISORY:
This chapter describes the death of two horses (they are \u201Cdestroyed\u201D by the vet because they are too weak to continue). Topthorn also becomes gravely ill. Some students may find this distressing. Frame the deaths gently \u2014 Morpurgo handles them with dignity. If students are upset, acknowledge their feelings: \u201CIt\u2019s natural to feel sad. Morpurgo wants us to understand what war really did to these animals.\u201D

WATCH FOR:
\u2022 Students who seem anxious about the content \u2014 check in quietly before reading begins
\u2022 Students who are unsettled from other classes \u2014 the calm, focused reading start will help them settle

[General: Title \u2014 VTLM 2.0: Establishing Purpose and Relevance]`;

const NOTES_LI = `SAY:
\u2022 Five learning intentions today \u2014 let me walk through them quickly
\u2022 First: comparing purposes for different texts \u2014 we will think about WHY Morpurgo made the choices he did
\u2022 Second: questioning assertions \u2014 that means we do not just accept what the author tells us, we think critically about it
\u2022 Third: analysing character attributes \u2014 we will look at what Joey\u2019s observations reveal about the other characters
\u2022 Fourth: identifying perspective through authorial choices \u2014 everything we read is through Joey\u2019s eyes
\u2022 Fifth: varying sentence structures \u2014 this connects to our sentence combining work today
\u2022 Read from slide: three success criteria. Point to each one.
\u2022 Ask: What is imagery? [Using descriptive language to create pictures in the reader\u2019s mind]
\u2022 Ask: What is alliteration? [Repeating the same sound at the start of nearby words]

DO:
\u2022 Read each LI aloud. Keep this brisk \u2014 under 2 minutes.
\u2022 Point to the success criteria and have students read the third one chorally.
\u2022 Leave visible for 15 seconds for silent re-reading.

TEACHER NOTES:
PACING OVERVIEW: Title/LI/Vocab (8 min), Reading with pause points (15 min), Literary Devices + CFU (5 min), Sentence Combining I Do (5 min), We Do (5 min), You Do (10 min), Closing (2 min) = ~50 min. If running behind after reading, shorten Pause Point 3 to a quick Turn & Talk and move to literary devices. The Sentence Combining segment is the priority new learning \u2014 protect this time. This is a deliberately lower-stress lesson to support students during a demanding week. The reading is engaging and the writing task is scaffolded and achievable.

The five learning intentions span reading comprehension, critical analysis, and writing. The sentence-level writing intention (varying sentence structures) is the priority new learning for this lesson, connecting to NAPLAN narrative writing where sentence variety is a key criterion. Do not mention NAPLAN directly. VTLM 2.0: Making Learning Visible / Clear Learning Intentions.

WATCH FOR:
\u2022 Students who cannot define imagery or alliteration \u2014 these are prerequisite concepts; note who needs support during the literary devices slide
\u2022 Students who look overwhelmed by five LIs \u2014 reassure: \u201CWe have done most of these before. The new part today is sentence combining.\u201D

[General: LI/SC \u2014 VTLM 2.0: Making Learning Visible / Clear Learning Intentions]`;

const NOTES_VOCAB_SCARCE = `SAY:
\u2022 Our first explicit vocabulary word today is \u201Cscarce\u201D
\u2022 Read from slide: the definition. \u201CInsufficient for the demand \u2014 in short supply.\u201D
\u2022 In Chapter 12, food becomes scarce for the horses. They are not getting enough to eat because the war has disrupted supply lines.
\u2022 Ask: Can you think of something that might be scarce during a war? [Food, water, medicine, ammunition, shelter]
\u2022 The example sentence shows how Morpurgo uses this word \u2014 notice it is not dramatic language, it is understated, which makes it more powerful

DO:
\u2022 Read the word, definition, and example aloud.
\u2022 Have students say the word chorally: \u201CScarce.\u201D
\u2022 Quick partner share: \u201CTell your partner one thing that could be scarce in your own life.\u201D (30 seconds)

TEACHER NOTES:
\u201CScarce\u201D is a Tier 2 word with broad utility across subjects (science: scarce resources; history: scarcity during wartime; geography: water scarcity). The word appears naturally in Chapter 12 and is crucial for understanding the suffering described. Understanding scarcity also connects to the broader theme of war\u2019s impact on innocent creatures. VTLM 2.0: Explicit Vocabulary Instruction.

WATCH FOR:
\u2022 Students who confuse \u201Cscarce\u201D with \u201Cscared\u201D \u2014 they sound similar. Clarify: \u201CScarce means there is not enough of something. Scared means frightened.\u201D
\u2022 Students who give examples that show understanding of the concept (not just the word) \u2014 these students are ready for extension

[General: Vocabulary \u2014 VTLM 2.0: Explicit Vocabulary Instruction]`;

const NOTES_VOCAB_IDYLLIC = `SAY:
\u2022 Our second word is \u201Cidyllic\u201D \u2014 say it with me: \u201Cih-DIL-ik\u201D
\u2022 Read from slide: the definition. \u201CExtremely happy, peaceful, or picturesque.\u201D
\u2022 Morpurgo uses this word to describe what the countryside USED to look like before the war destroyed it
\u2022 This is a really powerful contrast \u2014 the land was idyllic, and now it is devastated
\u2022 Ask: Why would an author describe something as idyllic right before showing us how terrible things have become? [To make the destruction feel worse by comparison \u2014 contrast]

DO:
\u2022 Read the word, definition, and example aloud.
\u2022 Practise pronunciation chorally: \u201Cih-DIL-ik\u201D (three times).
\u2022 Ask two students to use \u201Cidyllic\u201D in their own sentence.

TEACHER NOTES:
\u201CIdyllic\u201D is a sophisticated Tier 2/3 word that students will encounter in literary analysis and descriptive writing. It connects directly to the literary device of contrast (juxtaposition), which Morpurgo uses extensively in this chapter. The word also connects to narrative writing \u2014 describing a setting as idyllic before disrupting it is a classic narrative technique students could use in their own stories. VTLM 2.0: Explicit Vocabulary Instruction.

MISCONCEPTIONS:
\u2022 Students may think \u201Cidyllic\u201D only means \u201Cpretty\u201D \u2014 clarify that it carries a sense of perfection and peacefulness, not just visual beauty
\u2022 Students may mispronounce it as \u201Ceye-DIL-ik\u201D \u2014 model the correct stress: ih-DIL-ik

WATCH FOR:
\u2022 Students who can connect \u201Cidyllic\u201D to the concept of contrast \u2014 this shows higher-order thinking
\u2022 Students who struggle with pronunciation \u2014 have them break it into syllables: i-dyl-lic

[General: Vocabulary \u2014 VTLM 2.0: Explicit Vocabulary Instruction]`;

const NOTES_INCIDENTAL = `SAY:
\u2022 These are the incidental vocabulary words from Chapter 12 \u2014 there are quite a few today because this chapter has very rich, sophisticated language
\u2022 You do not need to memorise all of these, but you WILL encounter them as we read
\u2022 Quickly scan the list \u2014 put your hand up if you already know what \u201Cmeagre\u201D means [insufficient, barely enough \u2014 similar to scarce]
\u2022 What about \u201Carduous\u201D? [Extremely difficult and tiring]
\u2022 Some of these words are emotionally powerful: \u201Cpiteous\u201D means inspiring pity, \u201Cappalling\u201D means shockingly bad. Listen for how Morpurgo uses them.
\u2022 As we read, if you hear a word you do not know, put a finger up \u2014 we will pause briefly to clarify

DO:
\u2022 Display the word list for 30 seconds. Do not read every word aloud.
\u2022 Cold call 2\u20133 students to define a word they recognise.
\u2022 Reassure students: \u201CYou will pick up meaning from context as we read.\u201D

TEACHER NOTES:
The incidental word list for Chapter 12 is extensive (26 words), reflecting Morpurgo\u2019s sophisticated prose style. These words are grouped on screen by approximate order of appearance. Do not attempt to teach all of them \u2014 the purpose is exposure and context-based learning. Students who struggle with decoding may need the teacher to clarify 2\u20133 words during reading (most likely: interminable, spasmodically, diminutive). The sheer volume of sophisticated vocabulary in this chapter supports the argument that War Horse is a genuinely challenging text for Year 5/6. VTLM 2.0: Vocabulary Exposure.

WATCH FOR:
\u2022 Students who look overwhelmed by the list \u2014 reassure: \u201CYou do not need to know all of these. Just be aware of them.\u201D
\u2022 Students who already know several words \u2014 challenge them to listen for HOW Morpurgo uses them, not just WHAT they mean

[General: Vocabulary \u2014 VTLM 2.0: Vocabulary Exposure]`;

const NOTES_READING = `SAY:
\u2022 We are reading Chapter 12 today, pages 97 to 104
\u2022 Reading mode: Student Read Aloud. I will select readers as we go.
\u2022 Everyone else: follow along in your copy. Be ready \u2014 I may ask you to pick up reading at any point.
\u2022 We will stop at three key moments to discuss what is happening
\u2022 Remember: Joey is our narrator. Everything we learn is filtered through his perspective as a horse.
\u2022 This chapter is emotionally intense. The horses face terrible conditions. If you feel upset, that is okay \u2014 it means you are connecting with the text.

DO:
\u2022 Ensure all students have the book open to page 97.
\u2022 Select your first reader \u2014 choose a confident, fluent reader for the opening paragraphs (they set the tone).
\u2022 Read from p.97 to the first pause point. Change readers every half-page to keep engagement high.

TEACHER NOTES:
Student Read Aloud is the reading mode for today. This develops fluency and keeps all students actively tracking the text. Choose readers strategically: confident readers for emotionally charged passages, developing readers for shorter, calmer sections. The chapter has three natural pause points where the narrative shifts. Morpurgo\u2019s prose in this chapter is deliberately rhythmic \u2014 the long sentences mimic the exhausting, relentless nature of the work. Draw students\u2019 attention to this if they notice it naturally. VTLM 2.0: Shared Reading / Active Engagement.

SENSITIVITY ADVISORY:
Pages 100\u2013101 describe two horses being \u201Cdestroyed\u201D (euthanised) because they are too weak to continue. Pages 103\u2013104 describe Topthorn becoming seriously ill. Preview these sections mentally before the lesson. If a student becomes upset, acknowledge their feelings calmly and offer a brief break if needed.

WATCH FOR:
\u2022 Students who are not tracking the text \u2014 cold call them to read next
\u2022 Students who seem distressed during the horse death scenes \u2014 check in quietly
\u2022 Readers who rush \u2014 encourage them to slow down for descriptive passages

[General: Reading \u2014 VTLM 2.0: Shared Reading / Active Engagement]`;

const NOTES_PAUSE1 = `SAY:
\u2022 Stop here. Let\u2019s look at this line: \u201C\u2026and the countryside was laid waste for miles behind the trenches.\u201D
\u2022 Ask: How has the author let us know that something has changed? [The language shifts from describing movement and action to describing destruction. \u201CLaid waste\u201D is powerful \u2014 it means completely destroyed.]
\u2022 Ask: What was the countryside like before the war? [It was idyllic \u2014 remember our vocabulary word? Peaceful, beautiful farmland.]
\u2022 So what is Morpurgo doing here? [Creating contrast \u2014 showing the difference between what was and what is now]
\u2022 This technique of showing the before and after is really powerful for narrative writing. When you want your reader to feel the impact of a change, describe what things were like BEFORE the change happened.

DO:
\u2022 Pause reading. Give students 10 seconds of silent think time before asking the question.
\u2022 Use Turn and Talk for 30 seconds, then cold call two pairs to share.
\u2022 Bridge to \u201Cidyllic\u201D vocabulary: \u201CRemember our word? The countryside WAS idyllic. Now it is laid waste.\u201D

TEACHER NOTES:
This pause point focuses on authorial craft \u2014 how Morpurgo signals change through language choices. \u201CLaid waste\u201D is a deliberately archaic, formal phrase that carries historical weight. The contrast between the pre-war countryside and the wartime devastation is a key thematic element. This connects to LI2 (questioning assertions) and LI4 (identifying perspective through authorial choices). The narrative writing connection is natural: contrast is a foundational technique in storytelling. VTLM 2.0: Guided Discussion / Comprehension Strategy (Inferring).

WATCH FOR:
\u2022 Students who say \u201CIt\u2019s sad\u201D without explaining HOW the author creates that sadness \u2014 push for textual evidence: \u201CWhat specific words tell us?\u201D
\u2022 Students who connect back to \u201Cidyllic\u201D unprompted \u2014 praise this explicitly

[General: Pause Point 1 \u2014 VTLM 2.0: Guided Discussion / Comprehension Strategy]`;

const NOTES_PAUSE1_REVEAL = `SAY:
\u2022 Here is our expected response. Let\u2019s compare with what we discussed.
\u2022 The key insight is contrast \u2014 Morpurgo sets up the beauty of the landscape so we feel the destruction more deeply.
\u2022 In your own narrative writing, this is a technique you can use: describe what was, then show what changed.

DO:
\u2022 Display the answer slide. Read the key points aloud.
\u2022 Ask: \u201CDid anyone\u2019s response include something we have not mentioned here?\u201D
\u2022 Move on promptly \u2014 do not linger.

TEACHER NOTES:
The reveal slide consolidates the discussion. The answer is deliberately brief to avoid over-teaching. If students generated richer responses than the slide shows, acknowledge and celebrate that. VTLM 2.0: Consolidation.

WATCH FOR:
\u2022 Students who look confused by the answer \u2014 they may not have grasped the concept of contrast. Note for follow-up.

[General: Pause Point 1 Reveal \u2014 VTLM 2.0: Consolidation]`;

const NOTES_PAUSE2 = `SAY:
\u2022 This line tells us something important: \u201C\u2026slowed us down and spoiled the rhythm of the team.\u201D
\u2022 Ask: What has the author told us so far about Joey and Topthorn\u2019s new role? [They are pulling heavy guns. They work as a team with other horses. It is incredibly hard physical work.]
\u2022 Ask: What does \u201Cspoiled the rhythm\u201D suggest? [The team had found a way to work together, a pattern. When something disrupts that, it makes everything harder.]
\u2022 Notice how Morpurgo uses Joey\u2019s perspective here \u2014 Joey understands teamwork and rhythm. What does that tell us about Joey as a character? [He is intelligent, aware, perceptive]

DO:
\u2022 Pause reading. Use Whiteboards: \u201CWrite one word that describes Joey and Topthorn\u2019s new role.\u201D (30 seconds)
\u2022 Scan boards. Look for words like: exhausting, brutal, relentless, hard.
\u2022 Then ask the discussion question to two volunteers.

TEACHER NOTES:
This pause point shifts focus to Joey\u2019s perspective (LI4) and character analysis (LI3). Joey\u2019s ability to perceive \u201Crhythm\u201D in teamwork reveals his intelligence and social awareness \u2014 qualities Morpurgo consistently attributes to the horses to build empathy. The whiteboard check is a formative assessment: students who write surface-level words (\u201Cbad\u201D, \u201Csad\u201D) need prompting toward more precise vocabulary. Students who write \u201Carduous\u201D or \u201Crelentless\u201D are engaging at a higher level. VTLM 2.0: Guided Discussion / Formative Assessment.

CFU CHECKPOINT:
Technique: Show Me Boards
Script: \u201CWrite ONE word that describes Joey and Topthorn\u2019s new role. Hold up your board.\u201D
PROCEED: 80%+ use precise, descriptive vocabulary (exhausting, relentless, brutal, arduous) \u2192 continue to Pause Point 3.
PIVOT: <80% use vague words (bad, sad, hard) \u2192 model upgrading: \u201C\u2018Hard\u2019 is okay, but what KIND of hard? Physically exhausting? Emotionally draining? Choose a more precise word.\u201D

WATCH FOR:
\u2022 Students who write \u201Cscary\u201D or \u201Csad\u201D \u2014 prompt: \u201CThink about what the horses are DOING, not how you feel about it.\u201D
\u2022 Students who use incidental vocabulary words from the list (e.g., \u201Carduous\u201D, \u201Cappalling\u201D) \u2014 celebrate this

[General: Pause Point 2 \u2014 VTLM 2.0: Guided Discussion / Formative Assessment]`;

const NOTES_PAUSE2_REVEAL = `SAY:
\u2022 Here is our expected response. Joey and Topthorn have been reassigned to pulling artillery guns through thick mud.
\u2022 The work is relentless and exhausting. When a horse weakens, the whole team suffers.
\u2022 Notice how Joey\u2019s perspective gives us insight into the teamwork \u2014 he understands rhythm and cooperation, which tells us he is perceptive and intelligent.

DO:
\u2022 Display the answer slide. Read key points aloud.
\u2022 Keep brief \u2014 30 seconds maximum.

TEACHER NOTES:
The reveal reinforces the link between Joey\u2019s perspective and character analysis. This is a key skill for LI3 and LI4. VTLM 2.0: Consolidation.

WATCH FOR:
\u2022 Students who did not connect Joey\u2019s observations to character traits \u2014 this inference skill needs ongoing development

[General: Pause Point 2 Reveal \u2014 VTLM 2.0: Consolidation]`;

const NOTES_PAUSE3 = `SAY:
\u2022 This is a powerful line: \u201CIt was the mud that was killing us one by one, the mud, the lack of shelter and the lack of food.\u201D
\u2022 Ask: What did we learn from this conversation? What\u2019s going on? [The horses are dying. The conditions are so bad that they cannot survive. The mud, lack of shelter, and lack of food are all contributing.]
\u2022 Notice something about how that sentence is structured. Morpurgo repeats \u201Cthe mud\u201D and uses \u201Cthe lack of\u201D twice. Why? [Repetition creates emphasis. It builds up the weight of suffering. Each item adds another layer.]
\u2022 This is a technique called accumulation \u2014 listing things to build emotional impact. It is incredibly effective in narrative writing.

DO:
\u2022 Pause reading. Give 15 seconds of silent think time.
\u2022 Use Think-Pair-Share: 30 seconds thinking, 45 seconds sharing with partner, then cold call two pairs.
\u2022 Draw attention to the sentence structure \u2014 this bridges to the sentence combining activity later.

SENSITIVITY ADVISORY:
\u201CKilling us one by one\u201D is a direct reference to the horses dying. Some students may need a moment. Acknowledge: \u201CThis is hard to read. Morpurgo is showing us the real cost of war \u2014 not just for people, but for animals too.\u201D

TEACHER NOTES:
This is the most emotionally intense pause point. The sentence structure is deliberately crafted: the repetition of \u201Cthe mud\u201D and the parallel structure of \u201Cthe lack of\u201D creates a litany of suffering. This connects directly to the sentence combining work \u2014 Morpurgo uses compound structures to accumulate detail and build emotional weight. The narrative writing connection is explicit: students can use repetition and accumulation in their own descriptive writing. VTLM 2.0: Guided Discussion / Close Reading.

WATCH FOR:
\u2022 Students who focus only on the content (horses dying) without noticing the craft (sentence structure) \u2014 redirect: \u201CYes, the horses are suffering. Now look at HOW Morpurgo tells us that. What do you notice about the sentence?\u201D
\u2022 Students who are visibly upset \u2014 check in privately after the discussion

[General: Pause Point 3 \u2014 VTLM 2.0: Guided Discussion / Close Reading]`;

const NOTES_PAUSE3_REVEAL = `SAY:
\u2022 Here is the expected response. The conditions are devastating: mud, no shelter, no food.
\u2022 The repetition in the sentence structure is the key craft element \u2014 Morpurgo builds up the suffering by listing each hardship.
\u2022 Keep this technique in mind for your own writing. When you want your reader to feel the weight of something, list the details one after another.

DO:
\u2022 Display the answer slide. Read aloud.
\u2022 Briefly connect to the sentence combining activity: \u201CWe are about to practise combining sentences ourselves \u2014 just like Morpurgo does here.\u201D

TEACHER NOTES:
The reveal slide bridges to the sentence combining segment. The narrative writing connection (accumulation, repetition for effect) supports NAPLAN narrative writing without explicitly naming it. VTLM 2.0: Consolidation / Bridging.

WATCH FOR:
\u2022 Students who seem checked out after the emotional content \u2014 the shift to sentence combining will re-engage them with a concrete, low-stakes task

[General: Pause Point 3 Reveal \u2014 VTLM 2.0: Consolidation]`;

const NOTES_LIT_DEVICES = `SAY:
\u2022 Let\u2019s look at the literary devices Morpurgo uses in this chapter. We have two types today: imagery and alliteration.
\u2022 First imagery example: \u201CIn places now the guns were lined up only a few yards apart for miles and miles and when they sounded out their fury the very earth shook beneath us.\u201D
\u2022 Ask: What senses does this appeal to? [Sight \u2014 guns lined up for miles. Sound \u2014 \u201Csounded out their fury.\u201D Touch \u2014 \u201Cthe very earth shook.\u201D]
\u2022 Second imagery example: \u201CThat night with the rain sheeting down relentlessly on our backs\u2026\u201D
\u2022 Ask: What does \u201Csheeting down\u201D help you picture? [Heavy, continuous rain \u2014 like sheets of water, not just drops]
\u2022 Now alliteration: \u201C\u2026a great hulk of a horse they called Heinie\u2026\u201D
\u2022 Ask: Which sound is repeated? [The \u201Ch\u201D sound: hulk, horse, Heinie]
\u2022 Why might Morpurgo use alliteration here? [It draws attention to the description, makes it memorable, the hard \u201Ch\u201D sound suggests heaviness and strength]

DO:
\u2022 Display the slide. Point to each example as you discuss it.
\u2022 Give students 10 seconds to identify the senses in the first imagery example before calling on anyone.
\u2022 For alliteration, have students say \u201Ca great hulk of a horse they called Heinie\u201D aloud to hear the repeated sound.

TEACHER NOTES:
This slide consolidates the literary devices students have encountered during reading. Imagery and alliteration are both NAPLAN-relevant craft elements that appear frequently in narrative marking criteria. The imagery examples are multi-sensory (sight, sound, touch), which is a more sophisticated analysis than single-sense identification. The alliteration example is brief and clear, with an accessible discussion of effect. Keep this to 3\u20134 minutes \u2014 the CFU slide that follows will check understanding. VTLM 2.0: Explicit Teaching / Literary Analysis.

WATCH FOR:
\u2022 Students who can identify the device but not explain its effect \u2014 model: \u201CAlliteration does not just repeat a sound. It creates an EFFECT. What effect does the \u2018h\u2019 sound create here?\u201D
\u2022 Students who confuse imagery with imagination \u2014 clarify: \u201CImagery is the AUTHOR\u2019s technique of using descriptive language. YOUR imagination is what it creates in YOUR mind.\u201D

[General: Literary Devices \u2014 VTLM 2.0: Explicit Teaching / Literary Analysis]`;

const NOTES_CFU_LIT = `SAY:
\u2022 Quick check. I am going to read a line from the chapter and I want you to tell me: is it imagery, alliteration, or both?
\u2022 Read aloud: \u201CIn places now the guns were lined up only a few yards apart for miles and miles and when they sounded out their fury the very earth shook beneath us.\u201D
\u2022 On your fingers: hold up 1 for imagery, 2 for alliteration, 3 for both. [Wait for all hands up]
\u2022 The answer is 1 \u2014 imagery. It creates a vivid picture using sight, sound, and touch, but there is no repeated initial sound.
\u2022 Now: \u201C\u2026a great hulk of a horse they called Heinie.\u201D 1, 2, or 3? [2 \u2014 alliteration: repeated \u201Ch\u201D sound]
\u2022 Well done. You can identify both devices.

DO:
\u2022 Use Fingers Up technique. Read each example clearly.
\u2022 Wait for ALL students to show fingers before revealing the answer.
\u2022 Scan the room. Note students who hesitate or change their answer after seeing peers.

CFU CHECKPOINT:
Technique: Fingers Up (1/2/3)
Script: \u201CIs this imagery, alliteration, or both? Show me on your fingers. 1 for imagery, 2 for alliteration, 3 for both.\u201D
PROCEED: 85%+ correct on both examples \u2192 move to Sentence Combining.
PIVOT: <85% correct \u2192 reteach the distinction: \u201CImagery = descriptive language that creates a picture. Alliteration = repeating the SAME SOUND at the START of nearby words. They are different techniques.\u201D Then re-check with one more example.

TEACHER NOTES:
This CFU uses Fingers Up rather than whiteboards for speed \u2014 it is a quick binary check, not an extended response. The two examples are unambiguous (one is clearly imagery, one is clearly alliteration) to ensure the check assesses understanding of the distinction, not edge cases. VTLM 2.0: Check for Understanding / Formative Assessment.

WATCH FOR:
\u2022 Students who hold up 3 (both) for the alliteration example \u2014 they may think any descriptive language is imagery. Clarify: \u201CAlliteration can be part of imagery, but this short phrase is primarily alliteration.\u201D
\u2022 Students who copy their neighbour\u2019s answer \u2014 ask them to close their eyes and hold up fingers

[General: CFU \u2014 VTLM 2.0: Check for Understanding / Formative Assessment]`;

const NOTES_SC_IDO = `SAY:
\u2022 Now we are shifting to our sentence-level writing focus: sentence combining
\u2022 On the left, you can see five short, simple sentences about what happened to Joey and Topthorn
\u2022 Each sentence gives us one piece of information. They are clear, but they are choppy. They do not flow.
\u2022 Watch me combine them into one flowing compound-complex sentence.
\u2022 Think aloud: \u201CFirst, I need to identify the common subject \u2014 it is \u2018the horses\u2019 in every sentence. I do not need to repeat that five times.\u201D
\u2022 \u201CNext, I look for ideas that go together. Pulling the guns and travelling through mud are connected \u2014 they happened at the same time. I can use \u2018as\u2019 to join them.\u201D
\u2022 \u201CThen, growing weaker and having no food or shelter are cause and effect. I can use \u2018as\u2019 again or \u2018because\u2019.\u201D
\u2022 \u201CFinally, I need a turning point. \u2018But\u2019 works well because it shows a contrast between working hard and growing weaker.\u201D
\u2022 Read from slide: the model answer. \u201CThe horses worked hard as they pulled the guns and travelled through thick mud, but they grew weaker as they had no food or shelter.\u201D
\u2022 Notice: one sentence, flowing, clear, and it contains ALL the information from the five separate sentences.

DO:
\u2022 Read the five sentences aloud first. Then model the combining process step by step.
\u2022 Use a think-aloud voice \u2014 make your thinking visible.
\u2022 Point to each conjunction as you explain why you chose it: \u201Cas\u201D, \u201Cand\u201D, \u201Cbut\u201D, \u201Cas\u201D.
\u2022 Read the final combined sentence aloud twice \u2014 once slowly, once at natural pace.

TEACHER NOTES:
The I Do is the most critical modelling moment. Make the invisible process visible: identifying the common subject, grouping related ideas, selecting appropriate conjunctions, and checking that the combined sentence retains all original meaning. The model sentence uses: \u201Cas\u201D (temporal conjunction showing simultaneous action), \u201Cand\u201D (additive conjunction), \u201Cbut\u201D (contrastive conjunction), and \u201Cas\u201D again (causal conjunction). This demonstrates sentence variety within a single sentence. The model deliberately avoids semicolons or dashes to keep it accessible for Year 5 students. VTLM 2.0: Explicit Teaching / Modelling / Gradual Release of Responsibility (I Do).

WATCH FOR:
\u2022 Students who look confused during the think-aloud \u2014 slow down, repeat the key steps
\u2022 Students who start trying to combine on their own \u2014 redirect: \u201CJust watch for now. Your turn is coming.\u201D

[General: I Do \u2014 VTLM 2.0: Explicit Teaching / Modelling / GRR]`;

const NOTES_SC_WEDO = `SAY:
\u2022 Now it is your turn to help me. Same five sentences, but this time WE are going to combine them together.
\u2022 Step 1: What is the common subject? [The horses] Good \u2014 so we only need to say \u201Cthe horses\u201D once or twice.
\u2022 Step 2: Which ideas go together? Talk to your partner for 20 seconds. [Circulate and listen]
\u2022 Ask: What did you decide? [Pulling guns and travelling through mud go together. Growing weaker, no food, no shelter go together.]
\u2022 Step 3: What conjunctions could we use? [and, but, as, because, so, yet, while]
\u2022 Let\u2019s build it together. Start with\u2026? [The horses\u2026] Then what? [Take suggestions, guide toward a valid combination]
\u2022 After building: Let\u2019s read our combined sentence aloud together.

DO:
\u2022 Display the five sentences. Do NOT show the answer yet.
\u2022 Guide students step by step. Accept different valid combinations.
\u2022 Write the class-generated sentence on the board alongside the five originals.
\u2022 Then click to reveal the model answer and compare.

TEACHER NOTES:
The We Do is a guided practice phase. Students should generate their OWN combined sentence before seeing the model. Accept any grammatically correct combination that preserves all five ideas. Common valid alternatives: \u201CThe horses pulled the guns through thick mud and worked hard, but they grew weaker because they had no food or shelter.\u201D Or: \u201CWhile the horses pulled the guns and worked hard through thick mud, they grew weaker without food or shelter.\u201D Celebrate variety \u2014 there is no single correct answer. VTLM 2.0: Guided Practice / GRR (We Do).

ENABLING & EXTENDING:
\u2022 ENABLING: For students who struggle, reduce to 3 sentences: \u201CThe horses pulled the guns. The horses worked hard. The horses grew weaker.\u201D Then add the remaining two.
\u2022 EXTENDING: Challenge students to combine using a semicolon or dash: \u201CThe horses worked hard, pulling the guns through thick mud \u2014 but without food or shelter, they grew weaker.\u201D

WATCH FOR:
\u2022 Students who produce a run-on sentence (no conjunctions, just commas) \u2014 redirect: \u201CYou have joined the ideas, but you need conjunctions to show HOW they connect.\u201D
\u2022 Students who lose one of the five original ideas \u2014 prompt: \u201CCheck: does your sentence include all five pieces of information?\u201D

[General: We Do \u2014 VTLM 2.0: Guided Practice / GRR]`;

const NOTES_SC_WEDO_REVEAL = `SAY:
\u2022 Here is one possible combined sentence. Compare it with what we created together.
\u2022 Are they the same? Different? Both can be correct.
\u2022 The key is: all five ideas are included, the sentence flows, and the conjunctions show how the ideas connect.

DO:
\u2022 Display the reveal slide. Read the model aloud.
\u2022 Ask: \u201CIs our class version better, worse, or just different?\u201D [Accept all reasonable answers]
\u2022 Transition to You Do: \u201CNow you are going to combine sentences independently.\u201D

TEACHER NOTES:
The reveal validates the guided practice. If the class generated a different but valid combination, celebrate it. The model is not the \u201Ccorrect\u201D answer \u2014 it is ONE correct answer. VTLM 2.0: Consolidation / Feedback.

WATCH FOR:
\u2022 Students who think their version was \u201Cwrong\u201D because it is different from the model \u2014 explicitly state: \u201CDifferent does not mean wrong. Both sentences include all the ideas and use conjunctions correctly.\u201D

[General: We Do Reveal \u2014 VTLM 2.0: Consolidation / Feedback]`;

const NOTES_SC_YOUDO = `SAY:
\u2022 Your turn. You have a worksheet with the same task.
\u2022 First: read the five sentences on your worksheet carefully
\u2022 Next: plan your combined sentence. Identify the common subject and group related ideas.
\u2022 Then: write your combined sentence using pronouns, commas, and conjunctions
\u2022 If you finish early, there is a Challenge section: write your OWN combined sentence about a DIFFERENT event from Chapter 12.
\u2022 You have 8 minutes. I will circulate to help.

DO:
\u2022 Distribute the Sentence Combining Worksheet (one per student).
\u2022 Set a visible timer for 8 minutes.
\u2022 Circulate. Prioritise students who struggled during We Do.
\u2022 After 6 minutes, give a 2-minute warning.
\u2022 Ask 2\u20133 volunteers to share their combined sentence with the class.

TEACHER NOTES:
The You Do is independent practice. Students should work individually, not in pairs. Circulate and use proximity to keep students on task. The worksheet provides the five sentences and lined space for writing. The Challenge section extends higher-ability students by requiring them to generate their own content from the chapter, not just recombine given sentences. This is a natural differentiation point. VTLM 2.0: Independent Practice / GRR (You Do).

ENABLING & EXTENDING:
\u2022 ENABLING: For students who struggle, suggest they start with just two sentences: \u201CThe horses pulled the guns. The horses travelled through thick mud.\u201D Combine those first, then add more.
\u2022 EXTENDING: The Challenge section asks students to write about a different Chapter 12 event. Students who reach this are working at a higher level of synthesis.

WATCH FOR:
\u2022 Students who stare at the page without starting \u2014 prompt: \u201CWhat is the common subject? Start there.\u201D
\u2022 Students who write five separate sentences with commas between them (no conjunctions) \u2014 redirect: \u201CYou need conjunctions like \u2018and\u2019, \u2018but\u2019, \u2018as\u2019, \u2018because\u2019 to show how the ideas connect.\u201D
\u2022 Students who finish the main task and the challenge quickly \u2014 ask them to combine using a different structure than their first attempt

[General: You Do \u2014 VTLM 2.0: Independent Practice / GRR]`;

const NOTES_CLOSING = `SAY:
\u2022 Let\u2019s review our success criteria from today.
\u2022 SC1: I can identify how the author uses imagery and alliteration to describe the hardships of war. Thumbs up if you can do this now. [Scan]
\u2022 SC2: I can analyse how Joey\u2019s perspective reveals the impact of war on the horses. Thumbs up if you can do this. [Scan]
\u2022 SC3: I can combine sentences using pronouns, commas, and conjunctions to create compound and complex sentences. Thumbs up. [Scan]
\u2022 Reflection: think about this question quietly for 10 seconds, then share with your partner.
\u2022 Ask: Which moment in Chapter 12 affected you the most, and what did Morpurgo do with his writing to make you feel that way?

DO:
\u2022 Read each success criterion aloud. Pause for thumbs up/down after each.
\u2022 Note any students who give thumbs down on SC3 \u2014 they may need follow-up support in the next lesson.
\u2022 Give 10 seconds silent think time for the reflection, then 45 seconds partner share.
\u2022 Cold call two pairs to share their reflection with the class.
\u2022 Close: \u201CNext lesson we continue with Chapter 13. Think about what might happen to Topthorn.\u201D

TEACHER NOTES:
The closing serves three purposes: (1) self-assessment against success criteria, (2) metacognitive reflection on both content and craft, (3) anticipation for the next lesson. The reflection question deliberately asks students to connect emotional response to authorial technique \u2014 this is the synthesis of today\u2019s learning. The thumbs up/down provides a quick formative snapshot. If more than 3\u20134 students show thumbs down on SC3, consider starting the next lesson with a brief sentence combining review. VTLM 2.0: Review and Reflect / Self-Assessment.

WATCH FOR:
\u2022 Students who give thumbs up on everything without genuine reflection \u2014 probe: \u201CWhat is one example of imagery from today?\u201D
\u2022 Students who share emotional responses without connecting to craft \u2014 prompt: \u201CYou said that moment was sad. What did Morpurgo DO in his writing to make you feel sad?\u201D
\u2022 Students who seem emotionally affected by the chapter \u2014 a brief, quiet check-in after the lesson

[General: Closing \u2014 VTLM 2.0: Review and Reflect / Self-Assessment]`;

const NOTES_RESOURCES = `SAY:
\u2022 Here are the printable resources for today\u2019s lesson.
\u2022 The Sentence Combining Worksheet is one per student \u2014 print before the lesson.
\u2022 The Answer Key is for your reference only \u2014 do not distribute to students.

DO:
\u2022 Ensure worksheets are printed and ready before the lesson begins.
\u2022 Click the PDF links to open and print from your computer.

TEACHER NOTES:
Two companion PDFs: (1) Student worksheet with the five sentences, lined writing space, and challenge extension. (2) Teacher answer key with the model answer and alternative valid combinations. Both PDFs are in the same folder as this PPTX file. Hyperlinks use relative paths. VTLM 2.0: Resource Preparation.

WATCH FOR:
\u2022 Ensure you have enough copies printed \u2014 one worksheet per student, one answer key for the teacher.

[General: Resources \u2014 VTLM 2.0: Resource Preparation]`;

// =============================================================================
// PDF generation: Sentence Combining Worksheet
// =============================================================================

async function generateWorksheetPdf() {
  const doc = createPdf({ title: "Sentence Combining Worksheet" });

  let y = addPdfHeader(doc, "Sentence Combining \u2014 Chapter 12: Pulling the Gun", {
    subtitle: "Combine the sentences below into one flowing sentence.",
    color: C.PRIMARY,
    lessonInfo: "War Horse | Lesson 16 of 25 | Week 4 | Year 5/6 Literacy",
  });

  y = addSectionHeading(doc, "Instructions", y, { color: C.SECONDARY });
  y = addBodyText(doc, "Read the five simple sentences below. They each give one piece of information about Joey and Topthorn\u2019s experience in Chapter 12. Your task is to combine them into ONE flowing sentence using pronouns, commas, and conjunctions (and, but, as, because, so, while, yet).", y);

  y = addSectionHeading(doc, "Sentences to Combine", y, { color: C.PRIMARY });

  const sentences = [
    "The horses pulled the guns.",
    "The horses travelled through thick mud.",
    "The horses worked hard.",
    "The horses grew weaker.",
    "The horses had no food or shelter.",
  ];

  sentences.forEach((s, i) => {
    y = addBodyText(doc, `${i + 1}. ${s}`, y, { fontSize: 12 });
  });

  y += 8;
  y = addTipBox(doc, "Hint: Start by identifying the common subject. Then look for ideas that go together. Use conjunctions to show how the ideas connect.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "My Combined Sentence", y, { color: C.PRIMARY });
  y = addLinedArea(doc, y, 6, { lineSpacing: 30 });

  y += 10;
  y = addSectionHeading(doc, "Challenge", y, { color: C.ACCENT });
  y = addBodyText(doc, "Finished early? Write your OWN combined sentence about a DIFFERENT event from Chapter 12. First, write 3\u20134 simple sentences about the event. Then combine them into one flowing sentence.", y, { italic: true, color: "6B7280" });

  y = addSectionHeading(doc, "My Simple Sentences", y, { color: C.ACCENT });
  y = addLinedArea(doc, y, 4, { lineSpacing: 28 });

  y = addSectionHeading(doc, "My Combined Sentence", y, { color: C.ACCENT });
  y = addLinedArea(doc, y, 4, { lineSpacing: 30 });

  addPdfFooter(doc, "War Horse | Lesson 16 of 25 | Week 4 | Year 5/6 Literacy");

  await writePdf(doc, OUT_DIR + "/WH4_L16_Sentence_Combining_Worksheet.pdf");
  console.log("\u2713 Written WH4_L16_Sentence_Combining_Worksheet.pdf");
}

// =============================================================================
// PDF generation: Sentence Combining Answer Key
// =============================================================================

async function generateAnswerKeyPdf() {
  const doc = createPdf({ title: "Sentence Combining Answer Key" });

  let y = addPdfHeader(doc, "Sentence Combining \u2014 Answer Key (Teacher Reference)", {
    subtitle: "Model answer and alternative valid combinations.",
    color: C.ALERT,
    lessonInfo: "War Horse | Lesson 16 of 25 | Week 4 | Year 5/6 Literacy",
    showNameDate: false,
  });

  y = addSectionHeading(doc, "Original Sentences", y, { color: C.PRIMARY });

  const sentences = [
    "The horses pulled the guns.",
    "The horses travelled through thick mud.",
    "The horses worked hard.",
    "The horses grew weaker.",
    "The horses had no food or shelter.",
  ];

  sentences.forEach((s, i) => {
    y = addBodyText(doc, `${i + 1}. ${s}`, y, { fontSize: 11 });
  });

  y += 6;
  y = addSectionHeading(doc, "Model Answer", y, { color: C.SUCCESS });
  y = addBodyText(doc, "\u201CThe horses worked hard as they pulled the guns and travelled through thick mud, but they grew weaker as they had no food or shelter.\u201D", y, { fontSize: 12 });

  y += 6;
  y = addSectionHeading(doc, "Alternative Valid Combinations", y, { color: C.SECONDARY });
  y = addBodyText(doc, "1. \u201CThe horses pulled the guns through thick mud and worked hard, but they grew weaker because they had no food or shelter.\u201D", y, { fontSize: 11 });
  y = addBodyText(doc, "2. \u201CWhile the horses pulled the guns and worked hard through thick mud, they grew weaker without food or shelter.\u201D", y, { fontSize: 11 });
  y = addBodyText(doc, "3. \u201CThe horses worked hard pulling the guns through thick mud; however, they grew weaker as they had no food or shelter.\u201D", y, { fontSize: 11 });

  y += 6;
  y = addSectionHeading(doc, "Key Assessment Criteria", y, { color: C.ALERT });
  y = addBodyText(doc, "A successful combined sentence should:", y);
  y = addBodyText(doc, "\u2022 Include ALL five pieces of information from the original sentences", y, { fontSize: 11 });
  y = addBodyText(doc, "\u2022 Use at least two different conjunctions (e.g., and, but, as, because, while)", y, { fontSize: 11 });
  y = addBodyText(doc, "\u2022 Avoid unnecessary repetition of the subject (\u201Cthe horses\u201D)", y, { fontSize: 11 });
  y = addBodyText(doc, "\u2022 Use correct punctuation (commas before coordinating conjunctions in compound sentences)", y, { fontSize: 11 });
  y = addBodyText(doc, "\u2022 Read fluently when spoken aloud \u2014 no awkward phrasing or run-on structures", y, { fontSize: 11 });

  y += 6;
  y = addTipBox(doc, "Common errors to watch for: comma splices (commas without conjunctions), missing information (losing one of the five ideas), and unnecessary repetition of \u201Cthe horses\u201D in every clause.", y, { color: C.ALERT });

  addPdfFooter(doc, "War Horse | Lesson 16 of 25 | Week 4 | TEACHER REFERENCE \u2014 Do not distribute");

  await writePdf(doc, OUT_DIR + "/WH4_L16_Sentence_Combining_Answer_Key.pdf");
  console.log("\u2713 Written WH4_L16_Sentence_Combining_Answer_Key.pdf");
}

// =============================================================================
// Main build
// =============================================================================

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Claude";
  pres.title  = "War Horse - Lesson 16 - Chapter 12: Pulling the Gun";

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1: Title
  // ═══════════════════════════════════════════════════════════════════════════
  titleSlide(
    pres,
    "War Horse",
    "Chapter 12 \u2014 Pulling the Gun",
    "Lesson 16  |  Week 4  |  Year 5/6 Literacy",
    NOTES_TITLE
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2: Learning Intentions & Success Criteria
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
      "I can identify how the author uses imagery and alliteration to describe the hardships of war",
      "I can analyse how Joey\u2019s perspective reveals the impact of war on the horses",
      "I can combine sentences using pronouns, commas and conjunctions to create compound and complex sentences",
    ],
    NOTES_LI,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3: Vocabulary — "scarce"
  // ═══════════════════════════════════════════════════════════════════════════
  vocabSlide(
    pres,
    "scarce",
    "adjective",
    "Insufficient for the demand; in short supply. When something is scarce, there is not enough of it to meet people\u2019s needs.",
    "Food became scarce as the war dragged on, and the horses grew thinner each week.",
    NOTES_VOCAB_SCARCE,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4: Vocabulary — "idyllic"
  // ═══════════════════════════════════════════════════════════════════════════
  vocabSlide(
    pres,
    "idyllic",
    "adjective",
    "Extremely happy, peaceful, or picturesque. An idyllic place or time feels perfect and free from trouble.",
    "The countryside had once been idyllic, but the war had laid waste to it for miles.",
    NOTES_VOCAB_IDYLLIC,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 5: Incidental Vocabulary
  // ═══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres,
    "Incidental Vocabulary",
    C.SECONDARY,
    "Chapter 12 \u2014 Words to Listen For",
    [
      "idyllic  \u2022  bitter  \u2022  fury  \u2022  interminable  \u2022  compulsion",
      "scarcer  \u2022  spasmodically  \u2022  meagre  \u2022  prolonged  \u2022  motley",
      "unperturbed  \u2022  invariably  \u2022  incongruous  \u2022  diminutive",
      "appalling  \u2022  arduous  \u2022  mere  \u2022  excruciatingly",
      "deteriorated  \u2022  piteous  \u2022  discarded  \u2022  relentlessly",
      "intermittently  \u2022  consoled  \u2022  reservoir  \u2022  ponderously",
    ],
    NOTES_INCIDENTAL,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 6: Reading Introduction
  // ═══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres,
    "Reading",
    C.PRIMARY,
    "Chapter 12: Pulling the Gun",
    [
      "Pages 97\u2013104  |  Student Read Aloud",
      "Joey and Topthorn are reassigned to pull artillery guns through the mud",
      "Conditions are brutal: thick mud, no shelter, scarce food",
      "Other horses grow weaker and two are destroyed",
      "Topthorn becomes seriously ill but pulls through",
      "The vet recommends rest for Topthorn, but there is no choice \u2014 he must keep working",
      "As we read, listen for imagery and alliteration in Morpurgo\u2019s descriptions",
    ],
    NOTES_READING,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 7-8: Pause Point 1 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 1", "Chapter 12 \u2014 p. 97",
      "\u2026and the countryside was laid waste for miles behind the trenches.",
      "p. 97",
      "How has the author let us know that something has changed?",
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
      slide.addText("The language shifts from action to destruction. \u201CLaid waste\u201D signals devastation. Morpurgo contrasts the once-idyllic countryside with the war-torn landscape \u2014 this contrast makes the reader feel the impact of the change more deeply.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
      slide.addNotes(NOTES_PAUSE1_REVEAL);
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 9-10: Pause Point 2 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 2", "Chapter 12 \u2014 p. 100",
      "\u2026slowed us down and spoiled the rhythm of the team.",
      "p. 100",
      "What has the author told us so far about Joey and Topthorn\u2019s new role?",
      NOTES_PAUSE2, FOOTER
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
      slide.addText("They are pulling heavy artillery guns through thick mud. The work is relentless and exhausting. Joey\u2019s awareness of \u201Crhythm\u201D reveals his intelligence \u2014 he understands teamwork and cooperation, which tells us he is perceptive and socially aware.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
      slide.addNotes(NOTES_PAUSE2_REVEAL);
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 11-12: Pause Point 3 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 3", "Chapter 12 \u2014 p. 104",
      "It was the mud that was killing us one by one, the mud, the lack of shelter and the lack of food.",
      "p. 104",
      "What did we learn from this conversation? What\u2019s going on?",
      NOTES_PAUSE3, FOOTER
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
      slide.addText("The horses are dying from the terrible conditions: mud, no shelter, no food. The repetition of \u201Cthe mud\u201D and \u201Cthe lack of\u201D is deliberate \u2014 Morpurgo uses accumulation to build the weight of suffering. Each item adds another layer of hardship.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
      slide.addNotes(NOTES_PAUSE3_REVEAL);
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 13: Literary Devices
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addBadge(s, "Literary Devices", { color: C.ACCENT, w: 2.0 });
    addTitle(s, "Imagery & Alliteration in Chapter 12");

    // Imagery card 1
    addCard(s, 0.5, CONTENT_TOP, 9, 1.1, { strip: C.PRIMARY, fill: C.WHITE });
    s.addText([
      { text: "Imagery", options: { bold: true, fontSize: 11, color: C.PRIMARY } },
    ], { x: 0.75, y: CONTENT_TOP + 0.08, w: 3, h: 0.22, fontFace: FONT_B, margin: 0 });
    s.addText("\u201CIn places now the guns were lined up only a few yards apart for miles and miles and when they sounded out their fury the very earth shook beneath us.\u201D (p.97)", {
      x: 0.75, y: CONTENT_TOP + 0.34, w: 8.5, h: 0.68,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Imagery card 2
    const card2Y = CONTENT_TOP + 1.22;
    addCard(s, 0.5, card2Y, 9, 0.9, { strip: C.PRIMARY, fill: C.WHITE });
    s.addText([
      { text: "Imagery", options: { bold: true, fontSize: 11, color: C.PRIMARY } },
    ], { x: 0.75, y: card2Y + 0.08, w: 3, h: 0.22, fontFace: FONT_B, margin: 0 });
    s.addText("\u201CThat night with the rain sheeting down relentlessly on our backs\u2026\u201D (p.103)", {
      x: 0.75, y: card2Y + 0.34, w: 8.5, h: 0.48,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Alliteration card
    const card3Y = card2Y + 1.02;
    addCard(s, 0.5, card3Y, 9, 0.9, { strip: C.ACCENT, fill: C.WHITE });
    s.addText([
      { text: "Alliteration", options: { bold: true, fontSize: 11, color: C.ACCENT } },
    ], { x: 0.75, y: card3Y + 0.08, w: 3, h: 0.22, fontFace: FONT_B, margin: 0 });
    s.addText("\u201C\u2026a great hulk of a horse they called Heinie\u2026\u201D (p.99)", {
      x: 0.75, y: card3Y + 0.34, w: 8.5, h: 0.48,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_LIT_DEVICES);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 14: CFU — Literary Devices
  // ═══════════════════════════════════════════════════════════════════════════
  cfuSlide(
    pres,
    "CFU",
    "Check for Understanding: Literary Devices",
    "Fingers Up (1 / 2 / 3)",
    "Is this imagery, alliteration, or both?\n\n1 = Imagery    2 = Alliteration    3 = Both\n\nListen carefully as the teacher reads each example.",
    NOTES_CFU_LIT,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 15: Sentence Combining — I Do (Modelling)
  // ═══════════════════════════════════════════════════════════════════════════
  modellingSlide(
    pres,
    "I Do \u2014 Watch Me",
    "Sentence Combining: Teacher Model",
    "Simple sentences:\n\n1. The horses pulled the guns.\n2. The horses travelled through thick mud.\n3. The horses worked hard.\n4. The horses grew weaker.\n5. The horses had no food or shelter.",
    "Combined sentence:\n\n\u201CThe horses worked hard as they pulled the guns and travelled through thick mud, but they grew weaker as they had no food or shelter.\u201D\n\nConjunctions used:\n\u2022 as (temporal)\n\u2022 and (additive)\n\u2022 but (contrastive)\n\u2022 as (causal)",
    NOTES_SC_IDO,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 16-17: Sentence Combining — We Do (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addBadge(s, "We Do", { color: C.SECONDARY });
      addTitle(s, "Sentence Combining: Your Turn Together");

      // Show the 5 sentences
      const sentences = [
        "The horses pulled the guns.",
        "The horses travelled through thick mud.",
        "The horses worked hard.",
        "The horses grew weaker.",
        "The horses had no food or shelter.",
      ];

      addCard(s, 0.5, CONTENT_TOP, 9, 2.4, { strip: C.SECONDARY, fill: C.WHITE });
      s.addText("Combine these five sentences into ONE flowing sentence:", {
        x: 0.75, y: CONTENT_TOP + 0.10, w: 8.5, h: 0.30,
        fontSize: 13, fontFace: FONT_B, color: C.SECONDARY, bold: true, margin: 0,
      });
      s.addText(sentences.map((t, i) => ({
        text: `${i + 1}. ${t}`,
        options: { bullet: false, breakLine: i < sentences.length - 1, fontSize: 14, color: C.CHARCOAL },
      })), {
        x: 0.75, y: CONTENT_TOP + 0.48, w: 8.5, h: 1.8,
        fontFace: FONT_B, valign: "top", margin: 0,
      });

      // Hint card
      const hintY = CONTENT_TOP + 2.54;
      addCard(s, 0.5, hintY, 9, 1.1, { strip: C.ACCENT, fill: C.BG_LIGHT });
      s.addText("Steps:", {
        x: 0.75, y: hintY + 0.08, w: 2, h: 0.24,
        fontSize: 11, fontFace: FONT_B, color: C.ACCENT, bold: true, margin: 0,
      });
      s.addText("1. Identify the common subject   2. Group related ideas   3. Choose conjunctions   4. Write and read aloud", {
        x: 0.75, y: hintY + 0.38, w: 8.5, h: 0.60,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_SC_WEDO);
      return s;
    },
    (slide) => {
      // Add answer overlay in the hint card area
      const ansY = CONTENT_TOP + 2.54;
      slide.addShape("roundRect", {
        x: 0.5, y: ansY, w: 9, h: 1.1, rectRadius: 0.08,
        fill: { color: C.SUCCESS },
      });
      slide.addText("Model Answer", {
        x: 0.75, y: ansY + 0.08, w: 3, h: 0.24,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      slide.addText("\u201CThe horses worked hard as they pulled the guns and travelled through thick mud, but they grew weaker as they had no food or shelter.\u201D", {
        x: 0.75, y: ansY + 0.38, w: 8.5, h: 0.60,
        fontSize: 14, fontFace: FONT_H, color: C.WHITE, italic: true, margin: 0,
      });
      slide.addNotes(NOTES_SC_WEDO_REVEAL);
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 18: Sentence Combining — You Do (Task)
  // ═══════════════════════════════════════════════════════════════════════════
  taskSlide(
    pres,
    "You Do",
    "Sentence Combining: Independent Practice",
    [
      { label: "First",  instruction: "Read the five sentences on your worksheet carefully." },
      { label: "Next",   instruction: "Identify the common subject and group related ideas. Plan your combined sentence." },
      { label: "Then",   instruction: "Write your combined sentence using pronouns, commas, and conjunctions. Read it aloud to check it flows." },
    ],
    NOTES_SC_YOUDO,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 19: Closing
  // ═══════════════════════════════════════════════════════════════════════════
  closingSlide(
    pres,
    "Which moment in Chapter 12 affected you the most, and what did Morpurgo do with his writing to make you feel that way?",
    [
      "Morpurgo uses imagery and alliteration to create vivid descriptions of war\u2019s hardships",
      "Joey\u2019s perspective as narrator reveals the intelligence and suffering of the horses",
      "Combining sentences with conjunctions creates flowing, powerful prose \u2014 just like Morpurgo\u2019s",
    ],
    NOTES_CLOSING
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 20: Resources
  // ═══════════════════════════════════════════════════════════════════════════
  addResourceSlide(
    pres,
    [
      {
        name: "Sentence Combining Worksheet",
        fileName: "WH4_L16_Sentence_Combining_Worksheet.pdf",
        description: "Five sentences to combine, with lined writing space and a challenge extension \u2014 one per student.",
      },
      {
        name: "Sentence Combining Answer Key",
        fileName: "WH4_L16_Sentence_Combining_Answer_Key.pdf",
        description: "Model answer and alternative valid combinations \u2014 teacher reference only.",
      },
    ],
    { C, FONT_H, FONT_B },
    FOOTER,
    NOTES_RESOURCES
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // Generate PDFs and write PPTX
  // ═══════════════════════════════════════════════════════════════════════════
  await Promise.all([
    generateWorksheetPdf(),
    generateAnswerKeyPdf(),
  ]);

  await pres.writeFile(`${OUT_DIR}/WH4_Lesson16.pptx`);
  console.log("Done: WH4_Lesson16.pptx");
}

build().catch(console.error);
