// Matilda — Lesson 22: Miss Honey's Cottage (Chapter 16)
// Year 3/4 Literacy — Narrative — Week 5
// Uses shared helpers from themes/matilda_helpers.js

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
} = require("../themes/matilda_helpers");

const OUT_DIR = "output/Matilda_Lesson22_Miss_Honeys_Cottage";
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const FOOTER = "Matilda  |  Lesson 22 of 25  |  Week 5  |  Year 3/4 Literacy";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `SAY:
\u2022 "Today we are reading Chapter 16 \u2014 Miss Honey\u2019s Cottage. After the miracle in Chapter 15, Matilda and Miss Honey walk to the cottage together. What Matilda discovers there will surprise her."
\u2022 "We will read together, stop at key moments, explore some incredible figurative language Roald Dahl uses, and then practise matching supporting details to the correct topic sentence."

DO:
\u2022 Display this slide as students settle. Allow 15 seconds for students to read the title and subtitle.
\u2022 Do not reveal what happens at the cottage \u2014 let the reading do the work.

TEACHER NOTES:
PACING NOTE: This is a content-heavy session with 3 pause points and 6 literary devices. Suggested timing: Title/LI/Review (4 min), Vocabulary (3 min), Reading with pause points (20 min), Literary devices (5 min), Matching I Do + We Do + You Do (15 min), Closing (3 min) = ~50 min. If running behind after reading, reduce the literary devices slide to 3 minutes (cover only the two strongest similes and the personification) and skip the extended metaphor discussion. The Matching Supporting Details segment is the priority new learning \u2014 protect this time.

Chapter 16 is one of the most emotionally significant chapters in the novel. Matilda walks with Miss Honey to her cottage and discovers extreme poverty \u2014 no running water, no real furniture, food stored in a box. This is the moment Matilda begins to understand that adults can be vulnerable too. The chapter also sustains the conversation about Matilda\u2019s telekinetic talent, with Miss Honey wisely suggesting practice. Students need to track the contrast between Matilda\u2019s excitement and the reality of Miss Honey\u2019s circumstances.

WATCH FOR:
\u2022 Students who cannot recall what happened at the end of Chapter 15 \u2014 they will struggle to understand why Matilda and Miss Honey are together outside school. Use the review slide to establish context.
\u2022 Students who are still confused about the difference between topic sentences and supporting details from Lesson 21 \u2014 today\u2019s matching activity will reinforce this, but note who needs pre-teaching during the I Do.

[General: Title \u2014 VTLM 2.0: Establishing Purpose and Relevance]`;

const NOTES_LI = `SAY:
\u2022 Read from slide: "Here are our learning intentions for today."
\u2022 Point to each LI briefly: "We are reading and understanding the text, learning new vocabulary, spotting figurative language \u2014 especially similes and personification today \u2014 noticing how dialogue works, and building on our topic sentence skills from yesterday."
\u2022 Point to the success criteria: "By the end of the lesson, you will be able to do all of these things. Look at the last two \u2014 matching supporting details to the right topic sentence and writing your own paragraph. That is our new learning today."

DO:
\u2022 Read each LI aloud. Do not elaborate \u2014 keep this brisk (90 seconds max).
\u2022 Point to each SC as you read it. Quick check: "Hands up if you remember what a topic sentence is from yesterday." Expect most hands up.
\u2022 Leave visible for 15 seconds for silent re-reading.

TEACHER NOTES:
Six learning intentions mirrors the Lesson 21 structure. Today\u2019s writing LIs build directly on yesterday: L21 was IDENTIFY/SORT (which is the TS?), L22 is MATCH (which SDs belong to which TS?) and WRITE (compose a paragraph). This is a deliberate progression on Bloom\u2019s taxonomy \u2014 from recognition to application. The success criteria make this progression visible to students. VTLM 2.0: Making Learning Visible / Clear Learning Intentions.

WATCH FOR:
\u2022 Students who cannot recall what a topic sentence is \u2014 quick verbal probe before moving on. If more than 20% are uncertain, add a 30-second recap: "A topic sentence is the MAIN IDEA of a paragraph. Supporting details give more information about it."
\u2022 Students who seem disengaged \u2014 the reading section will re-energise; keep LI delivery brisk.

[General: LI/SC \u2014 VTLM 2.0: Making Learning Visible / Clear Learning Intentions]`;

const NOTES_REVIEW = `SAY:
\u2022 "Before we start Chapter 16, let\u2019s make sure we remember where we left off in Chapter 15."
\u2022 Ask: "What did Matilda show Miss Honey in Chapter 15?" [She showed her that she could tip over a glass of water using only her mind \u2014 she demonstrated her telekinetic power deliberately.]
\u2022 Ask: "How did Miss Honey respond when she saw it?" [She was awestruck / amazed / shocked. She believed Matilda.]
\u2022 Ask: "What did Miss Honey invite Matilda to do at the end of Chapter 15?" [She invited Matilda to come to her cottage for tea, to talk about it more.]
\u2022 "Good. So Chapter 16 begins with that walk to Miss Honey\u2019s cottage. Let\u2019s see what Matilda discovers."

DO:
\u2022 Use Cold Call \u2014 do not accept hands up. Call on three different students for the three questions.
\u2022 If students struggle with the first question, rephrase: "What was the \u2018second miracle\u2019 from last lesson\u2019s chapter?"
\u2022 Keep this to 2 minutes maximum. This is activation, not reteaching.

CFU CHECKPOINT:
Technique: Cold Call

Script:
\u2022 Cold call a student: "What did Matilda show Miss Honey in Chapter 15?"
\u2022 If correct, cold call a second student: "How did Miss Honey respond?"
\u2022 If the first student is incorrect or vague, redirect: "Who can build on that? What happened with the glass?" \u2014 cold call a second student.
\u2022 Cold call a third student: "What did Miss Honey invite Matilda to do?"
\u2022 Scan for: Students who recall the deliberate demonstration AND the cottage invitation.

PROCEED (if \u226580% recall the key events):
Move to vocabulary. Students have sufficient recall to engage with Chapter 16.

PIVOT (if <80% can recall the events):
Most likely issue: Students have forgotten the end of Chapter 15 or are conflating events from different chapters.
Reteach: "Let me remind you. In Chapter 15, Matilda went to Miss Honey\u2019s classroom after school. She DELIBERATELY tipped over a glass of water using only her mind \u2014 right in front of Miss Honey. Miss Honey was amazed. She said \u2018I wouldn\u2019t dream of telling anyone.\u2019 Then she invited Matilda to her cottage for tea so they could talk about it. That is where we pick up today."
Re-check: "Now \u2014 where are Matilda and Miss Honey going at the start of Chapter 16?" Cold call a different student. If correct, proceed.

TEACHER NOTES:
Activating prior knowledge before reading is essential (VTLM 2.0: Retention and Recall). Chapter 16 only makes sense if students remember the outcome of Chapter 15 \u2014 the deliberate demonstration and the cottage invitation. The three questions scaffold recall: WHAT did Matilda show? \u2192 HOW did Miss Honey react? \u2192 WHAT happens next? This leads directly into the reading.

WATCH FOR:
\u2022 Students who say Matilda "moved the glass by accident" \u2014 correct: "That was Chapter 14. In Chapter 15, she did it ON PURPOSE."
\u2022 Students who don\u2019t remember the cottage invitation \u2014 this is the critical link to Chapter 16. Supply it if needed.
\u2022 Readiness signal: Students can articulate that Matilda deliberately demonstrated her power and Miss Honey invited her to the cottage.

[General: Review/Activation of Prior Knowledge \u2014 VTLM 2.0: Retention and Recall]`;

const NOTES_VOCAB = `SAY:
\u2022 "Before we read, we need to know two important words that Roald Dahl uses in this chapter."
\u2022 Point to "profoundly": "Read this word with me: pro-FOUND-ly." [Students repeat.] "Profoundly means in a way that is very great or intense \u2014 deeply. If you are profoundly excited, you are not just a little excited \u2014 you are excited down to your bones."
\u2022 "In Chapter 16, Matilda is profoundly excited about her newfound ability. She cannot stop talking about it. Listen for that excitement as we read."
\u2022 Point to "compel": "Read this word with me: com-PEL." [Students repeat.] "Compel means to force or drive someone to do something. Not with physical force \u2014 more like an inner force that pushes you."
\u2022 "Sometimes feelings compel us to act. Something compelled Miss Honey to share her story with Matilda. Listen for what drives Miss Honey\u2019s choices in this chapter."

DO:
\u2022 Point to each word card as you teach it. Students repeat the word aloud (choral response).
\u2022 Spend no more than 90 seconds per word. This is rapid explicit teaching \u2014 depth comes during reading.
\u2022 Do NOT ask students to write definitions yet. They will encounter these words in context during reading.

TEACHER NOTES:
Two explicit vocabulary words keeps the load manageable in a content-heavy lesson. "Profoundly" is essential for understanding Matilda\u2019s emotional state at the start of the chapter \u2014 she is not casually interested, she is deeply, intensely excited. This intensity drives the pacing of the first section. "Compel" supports understanding of character motivation throughout \u2014 what compels Miss Honey to reveal her poverty? What compels Matilda to care? The incidental vocabulary (primitive, meagre, dwelling, scarcely, lane, hedgerow, obliged) will be addressed in context during reading. VTLM 2.0: Explicit Explanation. DECIDE Framework: D (Define the vocabulary component).

MISCONCEPTIONS:
\u2022 Misconception: "Profoundly" means the same as "very" or "really."
  Why: Students substitute simpler intensifiers. They miss the depth connotation \u2014 "profoundly" implies something that goes to the core, not just surface-level intensity.
  Impact: If students treat "profoundly" as a generic intensifier, they miss the emotional weight Dahl attaches to Matilda\u2019s excitement. The chapter\u2019s opening energy depends on understanding how DEEPLY affected Matilda is.
  Quick correction: "If I say \u2018I am very happy,\u2019 that is everyday. If I say \u2018I am profoundly happy,\u2019 it means this happiness goes all the way through me \u2014 it has changed something deep inside. Which one sounds bigger? Profoundly."

\u2022 Misconception: "Compel" means "ask" or "want."
  Why: Students soften the word. "Compel" implies an irresistible force, not a polite request.
  Impact: If students think "compel" means "ask," they underestimate the strength of the forces driving characters\u2019 actions.
  Quick correction: "If someone asks you to clean your room, are you compelled? Not really \u2014 you might say no. But if you smell smoke in the house, you are COMPELLED to run outside. Compel means you HAVE to \u2014 the force is too strong to resist."

WATCH FOR:
\u2022 Students who cannot repeat "profoundly" correctly (mispronouncing as "pro-FOUND-lee" with wrong stress or "profound") \u2014 model again: "pro-FOUND-ly."
\u2022 Students who confuse "compel" with "compete" or "complete" \u2014 brief correction: "Compel means to force or drive. Different word."
\u2022 Readiness signal: Students can say both words clearly and give a thumbs up when you check: "Thumbs up if profoundly means something VERY deep and intense."

[General: Explicit Instruction (I Do) \u2014 Vocabulary \u2014 VTLM 2.0: Explicit Explanation]`;

const NOTES_READING_LAUNCH = `SAY:
\u2022 "Open your books to page 262. We are reading Chapter 16: Miss Honey\u2019s Cottage."
\u2022 "Today is student read aloud. I will select readers as we go. Everyone follows along \u2014 fingers on the text."
\u2022 "This is a long chapter \u2014 26 pages. We will stop THREE times during the reading at key moments."
\u2022 "Before we start, look at the title: Miss Honey\u2019s Cottage. We know Miss Honey is a teacher. What do you predict her cottage looks like? Think about what you already know about her. Is she rich? Is she poor? What clues has Dahl given us?" [Allow 3-4 brief responses.]

DO:
\u2022 Ensure all students have books open to page 262. Scan for students who need page help.
\u2022 Remind students of read aloud expectations: "Eyes on text, follow along silently, be ready to read when called."
\u2022 Take 3-4 predictions about the cottage. Do not confirm or deny \u2014 say "Let\u2019s find out."
\u2022 Select your first reader. Begin reading from p.262.
\u2022 NOTE: p.264 (\u2018but I don\u2019t mind that in the least\u2019) is an optional micro-check. If pacing allows, pause for 15 seconds and ask "What\u2019s going on here?" to check students are tracking. If pacing is tight, read through it \u2014 our formal Pause Point 1 is at p.269.

TEACHER NOTES:
Student read aloud for this chapter serves multiple purposes: engagement, fluency monitoring, and stamina building (26 pages is a significant reading stretch). The prediction prompt before reading activates schema \u2014 most students will predict a "nice" or "normal" cottage. The reality (extreme poverty) will create cognitive dissonance that deepens comprehension. The three formal pause points are at p.269 (conversation about practice), p.274 (the tree and personification), and p.287 (the closing line). The reading section should take no more than 20 minutes including pause points. If pacing is tight, call on fluent readers and limit each pause point to 90 seconds. VTLM 2.0: Scaffold Practice (shared reading with monitoring).

WATCH FOR:
\u2022 Students not following along (eyes off text, no finger tracking) \u2014 a quick "All eyes on page 265" redirects without disrupting the reader.
\u2022 Readers who struggle with incidental vocabulary (meagre, dwelling, scarcely, primitive, hedgerow) \u2014 supply the word quickly and move on.
\u2022 Students who react emotionally to the poverty description (p.275-282) \u2014 this is expected and healthy. Allow a brief moment, then continue.
\u2022 Readiness signal: All students tracking the text, reader maintaining reasonable pace.

[General: Guided Practice (We Do \u2014 Shared Reading) \u2014 VTLM 2.0: Scaffold Practice]`;

const NOTES_PAUSE1 = `SAY:
\u2022 "Stop reading here. Look at this quote: \u2018I think it\u2019s like anything else, the more you practise it, the easier it gets.\u2019"
\u2022 Ask: "Who is speaking here, and what are they talking about?" [Miss Honey is talking about Matilda\u2019s telekinetic power. She is suggesting that Matilda practise it.]
\u2022 "Think about this with your partner: What have we learned from this conversation between Matilda and Miss Honey? What does it tell us about BOTH characters?" [Allow 60 seconds pair discussion.]
\u2022 After pairs share: "Two key things: First, Miss Honey is practical and wise \u2014 she treats the power like a SKILL that can be developed, not something to be afraid of. Second, Matilda is profoundly excited \u2014 there is our vocabulary word \u2014 she cannot stop talking about it."
\u2022 "This tells us about their relationship too. Miss Honey is the calm, guiding adult. Matilda is the enthusiastic learner. They trust each other."

DO:
\u2022 Pause the reader at p.269 after this line.
\u2022 Display the slide. Allow 10 seconds for students to re-read the quote on screen.
\u2022 Run Think-Pair-Share: 30 seconds silent thinking, 60 seconds pair discussion, then cold call 2 pairs.
\u2022 Click to next slide to reveal the discussion points after students have responded.

CFU CHECKPOINT:
Technique: Think-Pair-Share

Script:
\u2022 "Think silently for 30 seconds: what have we learned from this conversation between Matilda and Miss Honey?"
\u2022 "Now turn to your partner and share. You have 60 seconds."
\u2022 Cold call 2 pairs: "What did you and your partner discuss?"
\u2022 Scan for: Students who identify (a) Miss Honey is treating the power practically, and (b) the conversation reveals their trusting relationship.

PROCEED (if \u226580% identify at least one key insight about the conversation):
Continue reading to p.274. Students are engaging with dialogue as character revelation.

PIVOT (if <80% can identify a key insight):
Most likely issue: Students are summarising WHAT was said rather than interpreting WHAT IT TELLS US about the characters.
Reteach: "Let me model this. When Miss Honey says \u2018the more you practise it, the easier it gets,\u2019 she is not just giving advice. She is showing us that she is NOT AFRAID of Matilda\u2019s power. She sees it as something positive. That tells us about her CHARACTER \u2014 she is calm, wise, and supportive. When you read dialogue, always ask: what does this tell me about the person speaking?"
Re-check: "Now \u2014 what does this conversation tell us about Matilda?" Cold call a different student. [She is excited, eager, trusting.] If correct, proceed.

TEACHER NOTES:
This pause point combines the p.264 and p.269 moments into a single substantive stop. The p.269 quote is richer because it reveals Miss Honey\u2019s wisdom and the dynamic of their relationship. The dialogue here functions as indirect characterisation \u2014 Dahl never says "Miss Honey was wise," he shows it through what she says. This connects to the LI on dialogue. The Think-Pair-Share format gives every student processing time before the cold call. VTLM 2.0: Monitor Progress (comprehension check during reading).

WATCH FOR:
\u2022 Students who focus only on Matilda\u2019s excitement without mentioning Miss Honey \u2014 prompt: "What about Miss Honey? What does HER response tell us?"
\u2022 Students who say Miss Honey is "being a teacher" \u2014 push deeper: "Yes, but what KIND of teacher? How is this different from how the Trunchbull would respond?"
\u2022 Readiness signal: Pairs can articulate something about both characters from the dialogue.

[General: Guided Practice (We Do \u2014 Pause Point) \u2014 VTLM 2.0: Monitor Progress]`;

const NOTES_PAUSE2 = `SAY:
\u2022 "Stop here. Read this passage again: \u2018Its massive spreading branches seemed to be enfolding and embracing the tiny building, and perhaps hiding it as well from the rest of the world.\u2019"
\u2022 "On your whiteboard, answer this: What do you think the author wants us to know about this place? Why does Dahl describe the tree as if it is DOING something?" [Allow 20 seconds to write.]
\u2022 "Hold up your boards."
\u2022 Expected responses: The tree is protecting the cottage / hiding it / the cottage is secret / Miss Honey is hidden away / the tree is like a guardian.
\u2022 "Brilliant. Dahl gives the tree human qualities \u2014 \u2018enfolding,\u2019 \u2018embracing,\u2019 \u2018hiding.\u2019 Trees cannot actually embrace or hide things on purpose. This is called personification \u2014 giving human qualities to something non-human. Dahl wants us to feel that this cottage is sheltered, secret, tucked away from the world. Why might Miss Honey want to be hidden from the world?"
\u2022 "We will come back to this personification on our literary devices slide."

DO:
\u2022 Pause the reader at p.274.
\u2022 Display the slide. Distribute whiteboards if not already out.
\u2022 Give students 20 seconds to write. Say: "Write one or two sentences. What does Dahl want us to know?"
\u2022 Scan whiteboards quickly \u2014 note the range of responses.
\u2022 Click to next slide to reveal the answer/discussion after the whiteboard check.

CFU CHECKPOINT:
Technique: Show Me Boards

Script:
\u2022 "On your whiteboard, write what you think the author wants us to know about this place. Why does Dahl make the tree sound alive? You have 20 seconds."
\u2022 "3, 2, 1 \u2014 boards up."
\u2022 Scan for: Responses that mention protection, hiding, secrecy, or the tree acting like a living guardian. Accept any reasonable interpretation.
\u2022 "I can see many of you wrote about the tree protecting or hiding the cottage. That is exactly right."

PROCEED (if \u226580% write about the tree as protector/guardian or the cottage as hidden):
Continue reading to p.287. Students are engaging with figurative language.

PIVOT (if <80% write a relevant response):
Most likely issue: Students are describing the literal scene (a tree near a house) without interpreting the figurative language.
Reteach: "Close your eyes. Imagine a giant tree with branches that wrap around a tiny cottage \u2014 like arms holding a baby. Can a tree really hold something? No. But Dahl writes it as if the tree IS holding and hiding the cottage. When an author gives a non-living thing human actions \u2014 like embracing or hiding \u2014 we call that personification. Now open your eyes. Why might Dahl want us to picture the tree as a protector?"
Re-check: "Write one word on your board: what is the tree doing to the cottage?" Scan for "protecting," "hiding," "embracing."

TEACHER NOTES:
This passage is one of the most visually rich in the entire novel. The personification of the tree serves multiple narrative purposes: (1) it creates a fairy-tale atmosphere (cottage hidden by a protective tree), (2) it foreshadows the discovery that Miss Honey\u2019s life is hidden and secret, and (3) it contrasts with the harshness of the Trunchbull\u2019s world. Show Me Boards are used because the task (interpret the author\u2019s purpose) requires more than a one-word response \u2014 students need to articulate a thought. This is a harder interpretive question than Pause Point 1. VTLM 2.0: Monitor Progress.

WATCH FOR:
\u2022 Students who write only "there is a big tree" \u2014 they are reading literally. Prompt: "Why does Dahl say the tree is \u2018embracing\u2019 the cottage? Can trees embrace?"
\u2022 Students who connect the tree to fairy tales ("like a fairy tale") \u2014 excellent! Validate this \u2014 Dahl makes this connection explicitly later.
\u2022 Readiness signal: Boards show interpretive responses that go beyond literal description.

[General: Guided Practice (We Do \u2014 Pause Point) \u2014 VTLM 2.0: Monitor Progress]`;

const NOTES_LIT_DEVICES = `SAY:
\u2022 "Before we go to the last pause point, let\u2019s look at the incredible figurative language Roald Dahl packs into this chapter. He uses THREE types of devices."
\u2022 Point to Simile: "First, SIMILE \u2014 a comparison using \u2018like\u2019 or \u2018as.\u2019 Look at this one: \u2018her fingers flew as if she would scatter them to the four winds.\u2019 Dahl compares Matilda\u2019s excited gestures to scattering things in every direction. And here: \u2018The room was as small and square and bare as a prison cell.\u2019 What picture does \u2018prison cell\u2019 put in your mind?" [Cold, harsh, empty, trapped.]
\u2022 Point to Personification: "We already found this one at our pause point. \u2018Its massive spreading branches seemed to be enfolding and embracing the tiny building.\u2019 The tree is given human qualities \u2014 it embraces and hides."
\u2022 Point to Extended Metaphor: "Now the most powerful one. Read this with me: \u2018It was the house where the poor woodcutter lived with Hansel and Gretel and where Red Riding Hood\u2019s grandmother lived\u2026 It was straight out of a fairytale.\u2019 Dahl does not say the cottage is LIKE a fairy-tale house \u2014 he says it IS one. And he keeps going \u2014 woodcutter, Red Riding Hood, Seven Dwarfs, Three Bears. This is an extended metaphor \u2014 a metaphor that continues across multiple sentences."
\u2022 "Thumbs up if you understand the difference between simile, personification, and metaphor. Thumbs down if you need more help." [Quick scan.]

DO:
\u2022 Display the slide with both cards visible. Point to each device and its example.
\u2022 Read each quote aloud with expression \u2014 model how similes sound and how the extended metaphor builds.
\u2022 Keep this section to 5 minutes. Teach the terms, connect to the text, move on.
\u2022 This is I Do \u2014 you are naming and explaining the devices. Students listen and engage.

CFU CHECKPOINT:
Technique: Thumbs Up/Down

Script:
\u2022 "Thumbs up if a simile uses \u2018like\u2019 or \u2018as\u2019 to compare two things. Thumbs down if it says something IS something else."
\u2022 Scan: \u226580% should show thumbs up.
\u2022 "Thumbs up if personification gives human qualities to non-human things. Thumbs down if it is about sounds."
\u2022 Scan: \u226580% should show thumbs up.
\u2022 "Thumbs up if an extended metaphor goes on for MULTIPLE sentences. Thumbs down if it is just one word."
\u2022 Scan: \u226580% should show thumbs up.

PROCEED (if \u226580% correct on all three checks):
Move to Pause Point 3. Students can distinguish the three devices.

PIVOT (if <80% correct):
Most likely issue: Students confuse simile with metaphor, or mix up personification with both.
Reteach: "Three simple rules. SIMILE = uses LIKE or AS. \u2018The room was as bare AS a prison cell\u2019 \u2014 there is the \u2018as.\u2019 METAPHOR = says something IS something else. \u2018It WAS the house of Hansel and Gretel\u2019 \u2014 no \u2018like\u2019 or \u2018as.\u2019 PERSONIFICATION = gives human qualities to non-human things. A tree cannot \u2018embrace\u2019 \u2014 but Dahl says it does."
Re-check: "Quick fire: \u2018Her eyes were stars.\u2019 Simile, metaphor, or personification?" [Metaphor \u2014 no \u2018like\u2019 or \u2018as.\u2019] "\u2018The wind whispered through the trees.\u2019" [Personification \u2014 wind cannot whisper.] "\u2018He ran like a cheetah.\u2019" [Simile \u2014 uses \u2018like.\u2019]

TEACHER NOTES:
This slide covers three device types with four examples. That is dense, but the examples are drawn directly from the chapter students just read, keeping cognitive load manageable. The progression (simile \u2192 personification \u2192 extended metaphor) moves from most familiar to least familiar. Simile is revision from earlier lessons. Personification was already introduced at Pause Point 2. The extended metaphor is new \u2014 students may not have encountered this term before, but the fairy-tale references are accessible. The Thumbs Up/Down technique provides three quick data points without slowing the lesson. DECIDE Framework: E (Execute through modelling \u2014 I Do).

MISCONCEPTIONS:
\u2022 Misconception: A metaphor uses "like" or "as."
  Why: Students have learned simile first and overgeneralise. They see any comparison as the same device.
  Impact: If not corrected, students will mislabel similes as metaphors throughout their literacy learning.
  Quick correction: "Simile = LIKE or AS. Metaphor = IS. \u2018It was LIKE a fairy tale\u2019 = simile. \u2018It WAS a fairy tale\u2019 = metaphor."

\u2022 Misconception: Personification only applies to animals.
  Why: Students confuse personification with anthropomorphism (giving animals human traits in stories).
  Impact: They miss personification of objects, weather, and abstract concepts.
  Quick correction: "Personification can apply to ANYTHING non-human: trees, wind, buildings, feelings. If Dahl writes \u2018the cottage crouched behind the tree,\u2019 that is personification \u2014 cottages cannot crouch."

WATCH FOR:
\u2022 Students who say the fairy-tale passage is a simile because it compares the cottage to fairy tales \u2014 redirect: "Does Dahl say it is LIKE a fairy-tale house, or does he say it IS one? Check the exact words."
\u2022 Students who struggle with "extended" \u2014 simplify: "Extended just means it keeps going. One metaphor that goes on and on."
\u2022 Readiness signal: Students can correctly answer all three Thumbs Up/Down checks.

[General: Explicit Instruction (I Do) \u2014 Literary Devices \u2014 VTLM 2.0: Explicit Explanation]`;

const NOTES_PAUSE3 = `SAY:
\u2022 "Let\u2019s finish the chapter. Read this last line: \u2018But it would be fun to find out.\u2019"
\u2022 "Matilda and Miss Honey have spent the afternoon together. Matilda has seen the poverty. Miss Honey has seen the power. And now Miss Honey says \u2018it would be fun to find out\u2019 what Matilda can really do."
\u2022 Ask: "What\u2019s going on here? What is Dahl setting up for the rest of the book?" [Allow 60 seconds Turn & Talk.]
\u2022 After sharing: "This is a TURNING POINT. Matilda and Miss Honey are becoming a team. Matilda has the power. Miss Honey has the wisdom. \u2018Fun\u2019 is an interesting word choice \u2014 it makes the next part feel like an adventure, not something scary. Dahl is building anticipation for what comes next."

DO:
\u2022 Pause after reading p.287 \u2014 the last line of the chapter.
\u2022 Display the slide. Allow students to re-read the quote on screen.
\u2022 Run Turn & Talk: 60 seconds partner discussion. Circulate and listen to 3-4 pairs.
\u2022 Cold call 2 pairs to share. Validate responses that connect to the partnership forming.
\u2022 Click to next slide to reveal the discussion notes.

CFU CHECKPOINT:
Technique: Turn & Talk

Script:
\u2022 "Turn to your partner. In 60 seconds, discuss: what is going on here? What is Dahl setting up?"
\u2022 Circulate \u2014 listen for: references to Matilda and Miss Honey becoming partners/allies, anticipation of using the power, the contrast between the poverty and the potential.
\u2022 Cold call 2 pairs: "What did your partnership discuss?"
\u2022 Scan for: Responses that go beyond plot summary to identify the relationship dynamic or the narrative setup.

PROCEED (if \u226580% identify the partnership or the setup for future chapters):
Close the reading section. Move to matching activity.

PIVOT (if <80% make insightful responses):
Most likely issue: Students are stuck on the immediate scene (the cottage) rather than seeing the bigger narrative arc.
Reteach: "Think about this: at the start of the book, Matilda was alone \u2014 her parents didn\u2019t understand her, the Trunchbull was terrifying. Now she has Miss Honey. And she has a POWER. Dahl has brought these two characters together. What might they DO together? That is what \u2018it would be fun to find out\u2019 is hinting at."
Re-check: "Talk again \u2014 30 seconds. What might Matilda and Miss Honey do together in the next chapters?" Cold call a new pair.

TEACHER NOTES:
This is the chapter\u2019s denouement \u2014 a quiet, forward-looking line that sets up the climax of the novel. The word "fun" is deliberately understated \u2014 Dahl signals that the adventure ahead will be playful, not threatening. This contrasts with the Trunchbull\u2019s world of fear. The Turn & Talk format allows students to process the whole chapter before answering. If running behind on time, abbreviate to a 30-second Turn & Talk. VTLM 2.0: Monitor Progress.

WATCH FOR:
\u2022 Students who predict specific plot events accurately (\u2018Matilda will use her power against the Trunchbull\u2019) \u2014 validate without confirming: "Interesting prediction! We will find out."
\u2022 Students who say "nothing happened in this chapter" \u2014 challenge: "Really? Think about what Matilda learned about Miss Honey. Think about the fairy-tale cottage. A LOT happened \u2014 it just happened quietly."
\u2022 Readiness signal: Pairs can articulate that a partnership is forming and something is being set up.

[General: Guided Practice (We Do \u2014 Pause Point) \u2014 VTLM 2.0: Monitor Progress]`;

const NOTES_MATCH_IDO = `SAY:
\u2022 "Now we are going to build on what we learned yesterday. Yesterday you learned to IDENTIFY topic sentences and sort them from supporting details."
\u2022 "Today is the next step: MATCHING. I am going to give you TWO different topic sentences and SIX supporting details \u2014 but they are all jumbled up. Your job is to match each supporting detail to the RIGHT topic sentence."
\u2022 "Watch me first. The key question is: does this detail give more information about Topic Sentence A or Topic Sentence B?"
\u2022 Point to the left column: "Here is how I think about it. If the detail is about Miss Honey\u2019s poverty \u2014 her cottage, her lack of food, her lack of water \u2014 it supports the topic sentence about Miss Honey being poor. If the detail is about Matilda\u2019s excitement \u2014 her talking, her feelings, her eagerness \u2014 it supports the topic sentence about Matilda\u2019s talent."
\u2022 Point to the right column example: "Let me try one. \u2018She has no running water in her cottage.\u2019 Is this about Miss Honey\u2019s poverty or Matilda\u2019s excitement? It\u2019s about poverty \u2014 so it goes with Topic Sentence A: \u2018Miss Honey is very poor.\u2019"

DO:
\u2022 Point to each element on the slide as you talk through the thinking process.
\u2022 Gesture to connect: supporting detail \u2192 topic sentence.
\u2022 Do NOT ask students to match yet \u2014 this is pure I Do modelling.
\u2022 Spend 2-3 minutes on this explanation. Keep it concise \u2014 the We Do will provide the practice.

TEACHER NOTES:
This is the I Do for the matching activity. The progression from L21 (IDENTIFY which sentence is the TS) to L22 (MATCH SDs to the correct TS) is a deliberate increase in complexity on Bloom\u2019s taxonomy \u2014 from recognition to classification. The key thinking skill is: "Does this detail give more information about Topic Sentence A or Topic Sentence B?" Modelling this question explicitly gives students a repeatable strategy. The content is drawn directly from Chapter 16, keeping cognitive load on the SKILL rather than the CONTENT. DECIDE Framework: E (Execute through modelling). VTLM 2.0: Explicit Explanation and Modelling.

MISCONCEPTIONS:
\u2022 Misconception: Any detail can go with any topic sentence as long as it is from the same chapter.
  Why: Students confuse "same topic" with "same text." They think any Chapter 16 sentence supports any Chapter 16 topic sentence.
  Impact: If not corrected, students will write paragraphs with mismatched details \u2014 a topic sentence about poverty followed by a detail about excitement.
  Quick correction: "The supporting detail must give MORE INFORMATION about the SPECIFIC main idea \u2014 not just about the same chapter. \u2018She could talk endlessly about moving things with her eyes\u2019 \u2014 is that about poverty or excitement? Excitement. It goes with the excitement TS, not the poverty TS."

WATCH FOR:
\u2022 Students who look confused about why there are TWO topic sentences \u2014 clarify: "Different paragraphs have different main ideas. Today we have two paragraphs about two different topics."
\u2022 Students who cannot distinguish the two themes (poverty vs. excitement) \u2014 give a quick sorting cue: "If it mentions the cottage, water, food, or small things \u2014 poverty. If it mentions eyes, power, talking, or energy \u2014 excitement."
\u2022 Readiness signal: Students nod when you match the example detail to its TS and can articulate why.

[General: Explicit Instruction (I Do) \u2014 Sentence-Level Writing \u2014 VTLM 2.0: Explicit Explanation and Modelling]`;

const NOTES_MATCH_WEDO = `SAY:
\u2022 "Your turn to help me. Look at the two Topic Sentences at the top: A \u2014 \u2018Miss Honey is very poor\u2019 and B \u2014 \u2018Matilda is very excited by her newfound talent.\u2019"
\u2022 "Below them are six Supporting Details, numbered 1 to 6. They are jumbled."
\u2022 "I am going to read each one. When I do, hold up your fingers: ONE finger if it goes with Topic Sentence A (Miss Honey is poor), TWO fingers if it goes with Topic Sentence B (Matilda is excited)."
\u2022 Read each SD aloud. After each, say "3, 2, 1 \u2014 show me" and scan fingers.
\u2022 After all six: "Let\u2019s see the answers." Click to reveal.

DO:
\u2022 Display the slide with both TS cards and six SD cards visible.
\u2022 Run Finger Voting for each SD: 1 finger = TS A, 2 fingers = TS B.
\u2022 Read each SD aloud before students vote. Keep pacing brisk \u2014 15 seconds per SD.
\u2022 After all six votes, click to the reveal slide. Discuss any that were tricky.
\u2022 Total time: 4-5 minutes including reveal and discussion.

CFU CHECKPOINT:
Technique: Finger Voting

Script:
\u2022 "Number 1: \u2018She feels like she is unstoppable.\u2019 One finger for A \u2014 poverty. Two fingers for B \u2014 excitement. 3, 2, 1 \u2014 show me."
\u2022 [Continue for all six SDs.]
\u2022 Scan for: \u226580% correct on each SD. Note which SDs cause the most confusion.

PROCEED (if \u226580% correct on at least 5 of 6 SDs):
Move to You Do. Students can match SDs to TSs.

PIVOT (if <80% correct on 3 or more SDs):
Most likely issue: Students are not distinguishing between the two themes (poverty vs excitement). They may be guessing based on sentence length or order rather than meaning.
Reteach: "Let\u2019s slow down. I will give you a trick. Read the supporting detail. Ask yourself: is this about something Miss Honey DOESN\u2019T HAVE? That is poverty \u2014 Topic Sentence A. Is this about something Matilda FEELS or WANTS TO DO? That is excitement \u2014 Topic Sentence B." Re-read the 2-3 most-missed SDs with this framework.
Re-check: Re-vote on the missed SDs. Scan for improvement.

TEACHER NOTES:
This is the We Do for matching. Finger Voting provides instant whole-class data on each individual SD, allowing the teacher to identify exactly which pairings cause confusion. The six SDs are presented in jumbled order (not grouped by TS) to force genuine classification rather than pattern-matching. The reveal slide colour-codes the SDs by their TS, making the groupings visually clear. This bridges from the I Do model to the You Do independent task. VTLM 2.0: Scaffold Practice.

ENABLING & EXTENDING:
ENABLING PROMPT:
\u2022 Task: Reduce the set to ONE topic sentence and four supporting details, where only TWO genuinely support it and two are distractors from a different topic. Students identify the two that match. This reduces cognitive load from 6-way to 4-way classification.

EXTENDING PROMPT:
\u2022 Task: Give students a THIRD topic sentence (e.g., "Miss Honey\u2019s cottage looks like a fairy-tale house") and ask them to generate two supporting details for it from their reading. This moves from matching to generating \u2014 the next step on the progression.

WATCH FOR:
\u2022 Students who vote quickly without reading the SD \u2014 slow them: "Read the sentence first, THEN decide."
\u2022 Students who get SD #3 wrong (\u2018She can\u2019t afford to buy food to cook at home\u2019 \u2014 this is poverty, not excitement) \u2014 some may be misled by the word "cook" and not connect it to poverty.
\u2022 Students who get all six correct easily \u2014 note them for the extending prompt during You Do.
\u2022 Readiness signal: \u226580% correct on 5+ of 6 SDs, with at least 3 students able to explain their reasoning.

[General: Guided Practice (We Do) \u2014 Sentence-Level Writing \u2014 VTLM 2.0: Scaffold Practice]`;

const NOTES_TS_YOUDO = `SAY:
\u2022 "Now it is your turn. You are going to take one of these Topic Sentence + Supporting Detail sets and write it as a COMPLETE PARAGRAPH."
\u2022 Read from slide: "First: Choose one set \u2014 either the Miss Honey set or the Matilda set."
\u2022 "Next: Write a paragraph that starts with the topic sentence and includes all three supporting details. Your job is to connect them smoothly \u2014 not just list them."
\u2022 "Then: If you finish early, try the challenge \u2014 write your OWN supporting details for the topic sentence: \u2018Miss Honey\u2019s house is very small.\u2019"
\u2022 "You have 8 minutes. Write in your booklets."

DO:
\u2022 Ensure students have booklets open and pencils ready.
\u2022 Display the slide with the three steps visible throughout.
\u2022 Set a timer for 8 minutes (visible if possible).
\u2022 Circulate immediately \u2014 start with the back-left table, then move through the room.
\u2022 For the first 2 minutes, check that students are writing the TOPIC SENTENCE FIRST, then adding supporting details as connected sentences.
\u2022 Conference briefly with students who are stuck \u2014 use the prompt: "Which set did you choose? Read me the topic sentence. Now \u2014 what is the first supporting detail? Say it in a full sentence."

TEACHER NOTES:
This is the You Do phase. The progression from L21 (write your own TS + SDs) to L22 (take a pre-matched set and write it as a connected paragraph) may seem like a step back, but it is actually a step UP: students are now composing a PARAGRAPH, not just labelling sentences. They must use connectives and transitions to make the paragraph flow. The "challenge" task (generate SDs for a given TS) mirrors yesterday\u2019s extending prompt and pushes strong writers further. The 8-minute window is deliberate \u2014 tight but protected. DECIDE Framework: D (Differentiate through fading). VTLM 2.0: Supported Application.

ENABLING & EXTENDING:
ENABLING PROMPT:
\u2022 Task: Provide the paragraph as a cloze exercise \u2014 the topic sentence and connecting words are given, students fill in the supporting details from the provided list. E.g., "Miss Honey is very poor. For example, ___. Also, ___. Additionally, ___." This scaffolds the paragraph structure while students focus on inserting the right details.

EXTENDING PROMPT:
\u2022 Task: Students write a SECOND paragraph using the other TS set they did not choose. Then they connect the two paragraphs with a transition sentence (e.g., "While Matilda was bursting with excitement, Miss Honey\u2019s life told a very different story."). This extends to multi-paragraph organisation.

WATCH FOR:
\u2022 Students who list the SDs without any connecting language (\u2018Miss Honey is very poor. She has no running water. Her cottage is very small. She can\u2019t buy food.\u2019) \u2014 prompt: "Can you add a word like \u2018for example,\u2019 \u2018also,\u2019 or \u2018additionally\u2019 to connect these sentences?"
\u2022 Students who add SDs that do not match their chosen TS \u2014 check: "Read your TS to me. Now read your SD. Does the SD tell me MORE about the TS?"
\u2022 Students who struggle to start \u2014 supply the opening: "Write the topic sentence word-for-word first. Then write \u2018For example,\u2019 and add the first supporting detail."
\u2022 Students who finish quickly with both paragraphs \u2014 challenge: "Can you add a concluding sentence to each paragraph?"
\u2022 Readiness signal: Students write a topic sentence followed by at least 2 connected supporting details within 8 minutes. At least 50% of the class should achieve this; the rest should have TS + 1 SD minimum.

[General: Independent Practice (You Do) \u2014 Sentence-Level Writing \u2014 VTLM 2.0: Supported Application]`;

const NOTES_CLOSING = `SAY:
\u2022 "Let\u2019s reflect on what we learned today."
\u2022 Read the Turn & Talk prompt: "Matilda saw that Miss Honey lives in poverty. How do you think this changes what Matilda wants to do with her power?"
\u2022 Allow 60 seconds Turn & Talk.
\u2022 Share 1-2 responses. Then: "At the start of the chapter, Matilda was excited about her own talent. By the end, she has seen that someone she cares about is suffering. That changes things. Power is not just about what you can DO \u2014 it is about who you can HELP."
\u2022 Point to takeaways: "Today we read Chapter 16 and explored Miss Honey\u2019s world. We found similes, personification, and an extended metaphor. And we practised matching supporting details to the right topic sentence and writing them into a paragraph."
\u2022 "Check the success criteria in your mind. Can you match supporting details to a topic sentence? Can you write them as a paragraph? Thumbs up."

DO:
\u2022 Run the Turn & Talk for 60 seconds. Circulate and listen.
\u2022 Share 1-2 brief responses. Do not extend \u2014 keep the closing to 3 minutes.
\u2022 Read the key takeaways aloud. Connect back to LI/SC.
\u2022 Quick thumbs up self-assessment against the SCs.
\u2022 Collect booklets if needed.
\u2022 Preview: "In our next lesson, we will keep reading and keep building our paragraph writing skills."

TEACHER NOTES:
The reflection prompt intentionally bridges the reading content (discovering Miss Honey\u2019s poverty) with a bigger theme (the purpose of power/talent). This connects to character development across the novel \u2014 Matilda\u2019s journey from self-focused excitement to other-focused compassion. The social-emotional dimension (helping others) makes the lesson sticky. The key takeaways are kept to four points: reading comprehension, vocabulary, literary devices, and writing. This mirrors the lesson structure. VTLM 2.0: Retention and Recall / Consolidation.

WATCH FOR:
\u2022 Students who rush the thumbs up without genuine reflection \u2014 pause: "Be honest. If you found the matching hard, that is fine. We will practise more."
\u2022 Students who want to predict what happens next \u2014 acknowledge: "Great thinking! We will keep reading in the next lesson."
\u2022 Readiness signal: A calm, purposeful close with most students giving honest thumbs up on at least 4 of 5 SCs.

[General: Closing / Review \u2014 VTLM 2.0: Retention and Recall]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build helper: matching activity slide (We Do — match SDs to TSs)
// ─────────────────────────────────────────────────────────────────────────────

function buildMatchSlide(pres, tsA, tsB, sds, notes) {
  /**
   * tsA:  string — Topic Sentence A
   * tsB:  string — Topic Sentence B
   * sds:  Array<{ text: string, ts: "A"|"B" }> — six SDs in jumbled order
   */
  const tsCardW = 4.25;
  const tsCardH = 0.75;
  const sdColW  = 4.25;
  const sdCardH = 0.58;
  const sdGap   = 0.10;

  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.TEAL);
      addBadge(s, "We Do", { color: C.TEAL });
      addTitle(s, "Match the Supporting Details");

      // TS A card (left)
      s.addShape("roundRect", {
        x: 0.5, y: CONTENT_TOP, w: tsCardW, h: tsCardH, rectRadius: 0.08,
        fill: { color: C.PLUM },
      });
      s.addText("A", {
        x: 0.6, y: CONTENT_TOP + 0.12, w: 0.40, h: 0.40,
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      s.addText(tsA, {
        x: 1.05, y: CONTENT_TOP + 0.08, w: tsCardW - 0.7, h: tsCardH - 0.16,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "middle", margin: 0,
      });

      // TS B card (right)
      s.addShape("roundRect", {
        x: 5.25, y: CONTENT_TOP, w: tsCardW, h: tsCardH, rectRadius: 0.08,
        fill: { color: C.TEAL },
      });
      s.addText("B", {
        x: 5.35, y: CONTENT_TOP + 0.12, w: 0.40, h: 0.40,
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      s.addText(tsB, {
        x: 5.80, y: CONTENT_TOP + 0.08, w: tsCardW - 0.7, h: tsCardH - 0.16,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "middle", margin: 0,
      });

      // Divider
      const divY = CONTENT_TOP + tsCardH + 0.12;
      s.addShape("rect", {
        x: 0.5, y: divY, w: 9.0, h: 0.02,
        fill: { color: C.HONEY },
      });

      // Six SD cards in 2x3 grid
      const gridY = divY + 0.16;
      const col1X = 0.5;
      const col2X = 5.0;
      const gridW = 4.3;

      sds.forEach((sd, i) => {
        const col = i < 3 ? 0 : 1;
        const row = i < 3 ? i : i - 3;
        const x = col === 0 ? col1X : col2X;
        const y = gridY + row * (sdCardH + sdGap);

        addCard(s, x, y, gridW, sdCardH, { fill: C.WHITE });
        // Number circle
        s.addShape("roundRect", {
          x: x + 0.10, y: y + 0.10, w: 0.36, h: 0.36, rectRadius: 0.18,
          fill: { color: C.MUTED },
        });
        s.addText(String(i + 1), {
          x: x + 0.10, y: y + 0.10, w: 0.36, h: 0.36,
          fontSize: 13, fontFace: FONT_H, color: C.WHITE, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
        s.addText(sd.text, {
          x: x + 0.56, y: y + 0.06, w: gridW - 1.30, h: sdCardH - 0.12,
          fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
        });
      });

      addFooter(s, FOOTER);
      s.addNotes(notes);
      return s;
    },
    (slide) => {
      // Reveal: colour-code each SD card border + add TS label
      const divY  = CONTENT_TOP + tsCardH + 0.12;
      const gridY = divY + 0.16;
      const col1X = 0.5;
      const col2X = 5.0;
      const gridW = 4.3;

      sds.forEach((sd, i) => {
        const col = i < 3 ? 0 : 1;
        const row = i < 3 ? i : i - 3;
        const x = col === 0 ? col1X : col2X;
        const y = gridY + row * (sdCardH + sdGap);

        const borderColor = sd.ts === "A" ? C.PLUM : C.TEAL;
        const labelText   = sd.ts === "A" ? "TS A" : "TS B";
        const labelFill   = sd.ts === "A" ? C.PLUM : C.TEAL;

        // Highlight border
        slide.addShape("roundRect", {
          x: x - 0.03, y: y - 0.03, w: gridW + 0.06, h: sdCardH + 0.06, rectRadius: 0.12,
          fill: { color: borderColor, transparency: 85 },
          line: { color: borderColor, width: 2.5 },
        });

        // TS label pill
        slide.addShape("roundRect", {
          x: x + gridW - 1.0, y: y + 0.10, w: 0.85, h: 0.34, rectRadius: 0.08,
          fill: { color: labelFill },
        });
        slide.addText(labelText, {
          x: x + gridW - 1.0, y: y + 0.10, w: 0.85, h: 0.34,
          fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
      });
    }
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main build
// ─────────────────────────────────────────────────────────────────────────────

(async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Explicit Teaching Slide Generator";
  pres.title  = "Matilda Lesson 22 \u2014 Miss Honey\u2019s Cottage";

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1: TITLE
  // ═══════════════════════════════════════════════════════════════════════════
  titleSlide(
    pres,
    "Miss Honey\u2019s Cottage",
    "Matilda \u2014 Chapter 16",
    "Lesson 22 of 25  |  Week 5  |  Year 3/4 Literacy",
    NOTES_TITLE
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2: LEARNING INTENTIONS & SUCCESS CRITERIA
  // ═══════════════════════════════════════════════════════════════════════════
  liSlide(
    pres,
    [
      "We are learning to connect supporting details to topic sentences in our writing",
    ],
    [
      "I can match supporting details to the correct topic sentence",
      "I can write a paragraph with a topic sentence and supporting details",
      "I can write supporting details that clearly link back to my topic sentence",
    ],
    NOTES_LI,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3: REVIEW — Prior Knowledge (Chapter 15)
  // ═══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres,
    "Review", C.PLUM,
    "What Do We Remember?",
    [
      "What did Matilda show Miss Honey in Chapter 15?",
      "How did Miss Honey respond when she saw it?",
      "What did Miss Honey invite Matilda to do at the end of Chapter 15?",
    ],
    NOTES_REVIEW,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4: VOCABULARY — profoundly & compel (dual word, custom inline)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.TEAL);
    addBadge(s, "Vocabulary", { color: C.TEAL });
    addTitle(s, "Word Study \u2014 Two Key Words");

    // Left card: profoundly
    const col1X = 0.5, col2X = 5.05, colW = 4.3;
    const crdY = CONTENT_TOP, crdH = SAFE_BOTTOM - CONTENT_TOP;

    // --- profoundly ---
    addCard(s, col1X, crdY, colW, crdH, { fill: C.WHITE });
    s.addShape("roundRect", {
      x: col1X, y: crdY, w: colW, h: 0.70, rectRadius: 0.1,
      fill: { color: C.PLUM },
    });
    // Cover bottom corners of the word banner so it joins the card cleanly
    s.addShape("rect", {
      x: col1X, y: crdY + 0.55, w: colW, h: 0.15,
      fill: { color: C.PLUM },
    });
    s.addText("profoundly", {
      x: col1X + 0.15, y: crdY + 0.08, w: colW - 0.3, h: 0.54,
      fontSize: 26, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: col1X + colW - 1.3, y: crdY + 0.15, w: 1.1, h: 0.34, rectRadius: 0.08,
      fill: { color: C.HONEY },
    });
    s.addText("adverb", {
      x: col1X + colW - 1.3, y: crdY + 0.15, w: 1.1, h: 0.34,
      fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Definition", {
      x: col1X + 0.2, y: crdY + 0.80, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("In a way that is very great or intense; deeply.", {
      x: col1X + 0.2, y: crdY + 1.04, w: colW - 0.4, h: 0.70,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addText("In the text", {
      x: col1X + 0.2, y: crdY + 1.80, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("\u201CMatilda was profoundly excited by her newfound ability.\u201D", {
      x: col1X + 0.2, y: crdY + 2.06, w: colW - 0.4, h: 0.70,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // --- compel ---
    addCard(s, col2X, crdY, colW, crdH, { fill: C.WHITE });
    s.addShape("roundRect", {
      x: col2X, y: crdY, w: colW, h: 0.70, rectRadius: 0.1,
      fill: { color: C.TEAL },
    });
    s.addShape("rect", {
      x: col2X, y: crdY + 0.55, w: colW, h: 0.15,
      fill: { color: C.TEAL },
    });
    s.addText("compel", {
      x: col2X + 0.15, y: crdY + 0.08, w: colW - 0.3, h: 0.54,
      fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: col2X + colW - 1.3, y: crdY + 0.15, w: 1.1, h: 0.34, rectRadius: 0.08,
      fill: { color: C.HONEY },
    });
    s.addText("verb", {
      x: col2X + colW - 1.3, y: crdY + 0.15, w: 1.1, h: 0.34,
      fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Definition", {
      x: col2X + 0.2, y: crdY + 0.80, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("To force or drive someone to do something.", {
      x: col2X + 0.2, y: crdY + 1.04, w: colW - 0.4, h: 0.70,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addText("In the text", {
      x: col2X + 0.2, y: crdY + 1.80, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("\u201CSomething compelled Miss Honey to share her story.\u201D", {
      x: col2X + 0.2, y: crdY + 2.06, w: colW - 0.4, h: 0.70,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_VOCAB);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 5: READING LAUNCH — Chapter 16 setup
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PLUM);
    addBadge(s, "Read Aloud", { color: C.PLUM });
    addTitle(s, "Chapter 16: Miss Honey\u2019s Cottage");

    const crdH = SAFE_BOTTOM - CONTENT_TOP;
    addCard(s, 0.5, CONTENT_TOP, 5.4, crdH, { strip: C.PLUM, fill: C.WHITE });

    // Reading info
    s.addText("Pages 262\u2013287", {
      x: 0.75, y: CONTENT_TOP + 0.12, w: 4.8, h: 0.30,
      fontSize: 14, fontFace: FONT_B, color: C.PLUM, bold: true, margin: 0,
    });
    s.addText("Reading Mode: Student Read Aloud", {
      x: 0.75, y: CONTENT_TOP + 0.48, w: 4.8, h: 0.30,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    // Prediction prompt
    s.addShape("rect", {
      x: 0.57, y: CONTENT_TOP + 1.0, w: 5.26, h: 0.02,
      fill: { color: C.HONEY },
    });
    s.addText("Before we begin\u2026", {
      x: 0.75, y: CONTENT_TOP + 1.15, w: 4.8, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.HONEY, bold: true, margin: 0,
    });
    s.addText("The chapter is called \u2018Miss Honey\u2019s Cottage.\u2019 We know Miss Honey is a teacher. What do you predict her cottage looks like? Is she rich or poor? What clues has Dahl given us?", {
      x: 0.75, y: CONTENT_TOP + 1.48, w: 4.8, h: 1.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Right side — chapter summary card (teacher reference, visible to class)
    addCard(s, 6.1, CONTENT_TOP, 3.4, crdH, { fill: C.PARCHMENT });
    s.addText("Big Ideas", {
      x: 6.3, y: CONTENT_TOP + 0.10, w: 3.0, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.PLUM, bold: true, margin: 0,
    });
    const bigIdeas = [
      "Matilda is profoundly excited about her talent",
      "Miss Honey wisely suggests practice",
      "The cottage is tiny and primitive",
      "Matilda discovers Miss Honey is very poor",
      "They agree to explore Matilda\u2019s power together",
    ];
    s.addText(
      bigIdeas.map((t, i) => ({
        text: t,
        options: { bullet: true, breakLine: i < bigIdeas.length - 1, fontSize: 11, color: C.CHARCOAL },
      })),
      {
        x: 6.3, y: CONTENT_TOP + 0.44, w: 3.0, h: crdH - 0.60,
        fontFace: FONT_B, valign: "top", margin: 0,
      }
    );

    addFooter(s, FOOTER);
    s.addNotes(NOTES_READING_LAUNCH);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 6-7: PAUSE POINT 1 — p.269 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 1", "Chapter 16 \u2014 p. 269",
      "\u2018I think it\u2019s like anything else, the more you practise it, the easier it gets.\u2019",
      "p. 269",
      "What have we learned from this conversation? What does it tell us about both characters?",
      NOTES_PAUSE1, FOOTER
    ),
    (slide) => {
      const ansY = 3.62;
      slide.addShape("roundRect", {
        x: 0.57, y: ansY, w: 8.86, h: 1.38, rectRadius: 0.08,
        fill: { color: C.HONEY },
      });
      slide.addText("Answer", {
        x: 0.75, y: ansY + 0.08, w: 3, h: 0.26,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      slide.addText("Miss Honey is practical and wise \u2014 she treats the power like a skill to practise, not something to fear. Matilda is profoundly excited. Their dialogue shows a trusting relationship forming.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 8-9: PAUSE POINT 2 — p.274 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 2", "Chapter 16 \u2014 p. 274",
      "\u2018Its massive spreading branches seemed to be enfolding and embracing the tiny building, and perhaps hiding it as well from the rest of the world.\u2019",
      "p. 274",
      "What do you think the author wants us to know about this place?",
      NOTES_PAUSE2, FOOTER
    ),
    (slide) => {
      const ansY = 3.62;
      slide.addShape("roundRect", {
        x: 0.57, y: ansY, w: 8.86, h: 1.38, rectRadius: 0.08,
        fill: { color: C.TEAL },
      });
      slide.addText("Answer", {
        x: 0.75, y: ansY + 0.08, w: 3, h: 0.26,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      slide.addText("Dahl uses personification \u2014 the tree \u2018enfolds,\u2019 \u2018embraces,\u2019 and \u2018hides.\u2019 The cottage is sheltered and secret. Miss Honey\u2019s life is hidden from the world \u2014 the tree is like a guardian protecting her.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 10: LITERARY DEVICES — Simile, Personification & Extended Metaphor
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PLUM);
    addBadge(s, "I Do", { color: C.PLUM });
    addTitle(s, "Figurative Language in Chapter 16");

    // Card 1: Simile + Personification
    const c1Y = CONTENT_TOP;
    const c1H = 2.10;
    addCard(s, 0.5, c1Y, 9, c1H, { strip: C.CORAL, fill: C.WHITE });

    // Simile pill
    s.addShape("roundRect", {
      x: 0.72, y: c1Y + 0.12, w: 1.2, h: 0.34, rectRadius: 0.08,
      fill: { color: C.CORAL },
    });
    s.addText("Simile", {
      x: 0.72, y: c1Y + 0.12, w: 1.2, h: 0.34,
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("A comparison using \u2018like\u2019 or \u2018as\u2019", {
      x: 2.1, y: c1Y + 0.14, w: 4.5, h: 0.32,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    // Simile quote 1 — p.263
    s.addText("\u201C", {
      x: 0.65, y: c1Y + 0.52, w: 0.35, h: 0.35,
      fontSize: 24, fontFace: FONT_H, color: C.HONEY, margin: 0,
    });
    s.addText("\u2026her fingers flew as if she would scatter them to the four winds\u2026", {
      x: 0.92, y: c1Y + 0.55, w: 7.3, h: 0.32,
      fontSize: 14, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });
    s.addText("p. 263", {
      x: 8.3, y: c1Y + 0.55, w: 0.9, h: 0.24,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, align: "right", margin: 0,
    });

    // Simile quote 2 — p.282
    s.addText("\u201C", {
      x: 0.65, y: c1Y + 0.90, w: 0.35, h: 0.35,
      fontSize: 24, fontFace: FONT_H, color: C.HONEY, margin: 0,
    });
    s.addText("The room was as small and square and bare as a prison cell.", {
      x: 0.92, y: c1Y + 0.93, w: 7.3, h: 0.32,
      fontSize: 14, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });
    s.addText("p. 282", {
      x: 8.3, y: c1Y + 0.93, w: 0.9, h: 0.24,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, align: "right", margin: 0,
    });

    // Personification sub-section within same card
    s.addShape("rect", {
      x: 0.65, y: c1Y + 1.32, w: 8.7, h: 0.015,
      fill: { color: C.PARCHMENT },
    });
    s.addShape("roundRect", {
      x: 0.72, y: c1Y + 1.42, w: 2.3, h: 0.34, rectRadius: 0.08,
      fill: { color: C.SAGE },
    });
    s.addText("Personification", {
      x: 0.72, y: c1Y + 1.42, w: 2.3, h: 0.34,
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Giving human qualities to non-human things", {
      x: 3.2, y: c1Y + 1.44, w: 5.5, h: 0.32,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    s.addText("\u201C\u2026enfolding and embracing the tiny building, and perhaps hiding it\u2026\u201D  p. 274", {
      x: 0.95, y: c1Y + 1.78, w: 8.2, h: 0.26,
      fontSize: 12, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Card 2: Extended Metaphor
    const c2Y = c1Y + c1H + 0.12;
    const c2H = SAFE_BOTTOM - c2Y;
    addCard(s, 0.5, c2Y, 9, c2H, { strip: C.PLUM, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.72, y: c2Y + 0.12, w: 2.6, h: 0.34, rectRadius: 0.08,
      fill: { color: C.PLUM },
    });
    s.addText("Extended Metaphor", {
      x: 0.72, y: c2Y + 0.12, w: 2.6, h: 0.34,
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("A metaphor that continues across multiple sentences", {
      x: 3.5, y: c2Y + 0.14, w: 5.8, h: 0.32,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    // Extended metaphor quote — p.277
    s.addText("\u201C", {
      x: 0.65, y: c2Y + 0.52, w: 0.35, h: 0.35,
      fontSize: 24, fontFace: FONT_H, color: C.HONEY, margin: 0,
    });
    s.addText("It was the house where the poor woodcutter lived with Hansel and Gretel and where Red Riding Hood\u2019s grandmother lived\u2026 It was straight out of a fairytale.", {
      x: 0.92, y: c2Y + 0.52, w: 7.8, h: c2H - 0.76,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, valign: "top", margin: 0,
    });
    s.addText("p. 277", {
      x: 8.3, y: c2Y + c2H - 0.32, w: 0.9, h: 0.22,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, align: "right", margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_LIT_DEVICES);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 11-12: PAUSE POINT 3 — p.287 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 3", "Chapter 16 \u2014 p. 287",
      "\u2018But it would be fun to find out.\u2019",
      "p. 287",
      "What\u2019s going on here? What is Dahl setting up for the rest of the book?",
      NOTES_PAUSE3, FOOTER
    ),
    (slide) => {
      const ansY = 3.62;
      slide.addShape("roundRect", {
        x: 0.57, y: ansY, w: 8.86, h: 1.38, rectRadius: 0.08,
        fill: { color: C.HONEY },
      });
      slide.addText("Answer", {
        x: 0.75, y: ansY + 0.08, w: 3, h: 0.26,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      slide.addText("This is a turning point. Matilda and Miss Honey are becoming a team \u2014 Matilda has the power, Miss Honey has the wisdom. \u2018Fun\u2019 makes the next part feel like an adventure. Dahl is building anticipation.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 13: MATCHING — I DO (Modelling)
  // ═══════════════════════════════════════════════════════════════════════════
  modellingSlide(
    pres,
    "I Do \u2014 Watch Me",
    "How to Match SDs to the Right TS",
    [
      { text: "How to Match", options: { bold: true, fontSize: 14, color: C.PLUM, breakLine: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "1. Read both Topic Sentences.", options: { fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: "2. Read the Supporting Detail.", options: { fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: "3. Ask: does this detail give more", options: { fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: "   information about TS A or TS B?", options: { fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "Key question:", options: { bold: true, fontSize: 13, color: C.TEAL, breakLine: true } },
      { text: "Is this about Miss Honey\u2019s poverty", options: { fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: "or Matilda\u2019s excitement?", options: { fontSize: 13, color: C.CHARCOAL, breakLine: true } },
    ],
    [
      { text: "Worked Example", options: { bold: true, fontSize: 14, color: C.PLUM, breakLine: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "TS A: Miss Honey is very poor.", options: { bold: true, fontSize: 13, color: C.PLUM, breakLine: true } },
      { text: "TS B: Matilda is very excited.", options: { bold: true, fontSize: 13, color: C.TEAL, breakLine: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "SD: \u2018She has no running water in", options: { fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: "her cottage.\u2019", options: { fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "Is this about poverty or excitement?", options: { italic: true, fontSize: 12, color: C.MUTED, breakLine: true } },
      { text: "Poverty \u2192 TS A", options: { bold: true, fontSize: 14, color: C.PLUM, breakLine: true } },
    ],
    NOTES_MATCH_IDO,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 14-15: MATCHING — WE DO (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  buildMatchSlide(
    pres,
    "Miss Honey is very poor.",
    "Matilda is very excited by her newfound talent.",
    [
      { text: "She feels like she is unstoppable.", ts: "B" },
      { text: "She has no running water in her cottage.", ts: "A" },
      { text: "She can\u2019t afford to buy food to cook at home.", ts: "A" },
      { text: "She could talk endlessly about moving things with her eyes.", ts: "B" },
      { text: "Her cottage is very small and bare.", ts: "A" },
      { text: "She is eager to test out the limits of her power.", ts: "B" },
    ],
    NOTES_MATCH_WEDO
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 16: YOU DO — Write a paragraph
  // ═══════════════════════════════════════════════════════════════════════════
  taskSlide(
    pres,
    "You Do", "Your Turn: Write a Paragraph",
    [
      { label: "First",  instruction: "Choose ONE set: the Miss Honey set (A) or the Matilda set (B). Copy the topic sentence into your booklet." },
      { label: "Next",   instruction: "Write all three supporting details as CONNECTED sentences. Use words like \u2018for example,\u2019 \u2018also,\u2019 and \u2018additionally.\u2019" },
      { label: "Then",   instruction: "Challenge: Write your OWN supporting details for \u2018Miss Honey\u2019s house is very small.\u2019" },
    ],
    NOTES_TS_YOUDO,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 17: CLOSING
  // ═══════════════════════════════════════════════════════════════════════════
  closingSlide(
    pres,
    "Matilda saw that Miss Honey lives in poverty. How do you think this changes what Matilda wants to do with her power?",
    [
      "We read Chapter 16 and explored Miss Honey\u2019s hidden world",
      "We learned two vocabulary words: profoundly and compel",
      "We identified simile, personification, and extended metaphor",
      "We can now match supporting details to the correct topic sentence",
    ],
    NOTES_CLOSING
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // WRITE FILE
  // ═══════════════════════════════════════════════════════════════════════════
  await pres.writeFile({ fileName: OUT_DIR + "/Matilda_Lesson22_Miss_Honeys_Cottage.pptx" });
  console.log("\u2713 Written to " + OUT_DIR + "/Matilda_Lesson22_Miss_Honeys_Cottage.pptx");
})();
