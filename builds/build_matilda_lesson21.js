// Matilda — Lesson 21: The Second Miracle (Chapter 15)
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

const OUT_DIR = "output/Matilda_Lesson21_The_Second_Miracle";
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const FOOTER = "Matilda  |  Lesson 21 of 25  |  Week 5  |  Year 3/4 Literacy";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `SAY:
• "Today we are reading Chapter 15 — The Second Miracle. Something extraordinary happens in this chapter, and it changes everything for Matilda and Miss Honey."
• "We will read together, stop at key moments to think deeply, explore two literary devices Roald Dahl uses, and then learn about topic sentences and supporting details."

DO:
• Display this slide as students settle. Allow 15 seconds for students to read the title and subtitle.
• Do not give away the plot — let the title build anticipation.

TEACHER NOTES:
PACING NOTE: This is a content-heavy session. Suggested timing: Title/LI/Review (5 min), Vocabulary (3 min), Reading with pause points (18 min), Literary devices (4 min), Topic sentences I Do + We Do + You Do (18 min), Closing (2 min) = ~50 min. If running behind after reading, abbreviate Pause Point 3 to a 30-second Turn & Talk and move directly to literary devices. The Topic Sentences segment is the priority new learning — protect this time.

Chapter 15 is the turning point of the novel: Matilda deliberately demonstrates her telekinetic power to Miss Honey, shifting from accidental discovery (Chapter 14) to intentional control. The chapter deepens the Matilda–Miss Honey relationship and sets up the climax. Students need to track how dialogue reveals character trust and decision-making.

WATCH FOR:
• Students who cannot recall what happened in Chapter 14 — they will struggle with today's reading. Use the review slide to identify and address this.
• Students who look confused by "miracle" — clarify during review that it refers to the glass-tipping event.

[General: Title — VTLM 2.0: Establishing Purpose and Relevance]`;

const NOTES_LI = `SAY:
• Read from slide: "Here are our learning intentions for today."
• Point to each LI briefly: "We are reading and understanding the text, learning new vocabulary, spotting figurative language, noticing how dialogue works, and learning about topic sentences."
• Point to the success criteria: "By the end of the lesson, these are the things you will be able to do. We will come back to these at the end."

DO:
• Read each LI aloud. Do not elaborate — keep this brisk (90 seconds max).
• Point to each SC as you read it. Ask students to give a thumbs up for any SC they already feel confident about.
• Leave visible for 20 seconds for silent re-reading.

TEACHER NOTES:
Six learning intentions is dense for a single lesson. The slide groups them so students see the lesson arc: reading → vocabulary → figurative language → dialogue → writing. The success criteria are deliberately fewer (5) and student-friendly, mapped to observable outcomes. The writing SCs (distinguish TS from SD, write own TS + SD) are the priority new learning. The reading and vocabulary LIs are consolidated practice from prior lessons. VTLM 2.0: Making Learning Visible / Clear Learning Intentions.

WATCH FOR:
• Students who give thumbs up on every SC — probe: "Tell me what a topic sentence is in your own words." This is new content; high confidence may indicate misunderstanding.
• Students who seem overwhelmed by 6 LIs — reassure: "We are building on what we already know. The new part today is topic sentences."

[General: LI/SC — VTLM 2.0: Making Learning Visible / Clear Learning Intentions]`;

const NOTES_REVIEW = `SAY:
• "Before we start Chapter 15, let's make sure we remember what happened in Chapter 14 — The First Miracle."
• Ask: "What extraordinary thing happened to Matilda in Chapter 14?" [She made a glass of water tip over using only her mind / she discovered she has telekinetic power.]
• Ask: "Who was in the room when it happened?" [The Trunchbull, Miss Honey, and the whole class.]
• Ask: "Did Matilda do it on purpose?" [No — it happened when she was angry at the Trunchbull. It was involuntary.]
• "Good. So at the end of Chapter 14, Matilda has just discovered something incredible about herself. Now she needs to decide what to do with it. That is where Chapter 15 begins."

DO:
• Use Cold Call — do not accept hands up. Call on three different students for the three questions.
• If students struggle with the first question, rephrase: "What happened with the glass of water?"
• Keep this to 2 minutes maximum. This is activation, not reteaching.

CFU CHECKPOINT:
Technique: Cold Call

Script:
• Cold call a student: "Without looking at your book, tell me — what extraordinary thing happened to Matilda in Chapter 14?"
• If correct, cold call a second student: "Who was watching when this happened?"
• If the first student is incorrect or vague, redirect: "Who can add to that? What happened with the glass?" — cold call a second student.
• Scan for: Students who recall the key event (glass tipping) and the context (involuntary, during anger at Trunchbull).

PROCEED (if ≥80% recall the key event):
Move to vocabulary. Students have sufficient recall to engage with Chapter 15.

PIVOT (if <80% can recall the event):
Most likely issue: Students have forgotten the detail of Chapter 14 or are confusing it with an earlier chapter.
Reteach: "Let me remind you. In Chapter 14, the Trunchbull accused a boy of putting a newt in her water. Matilda was furious. She stared at the glass SO hard that it tipped over — by itself. Nobody touched it. Matilda made it happen with her MIND. That is the first miracle."
Re-check: "Now — what made the glass tip over?" Cold call a different student. If correct, proceed. If still unclear, briefly retell the key event and move on — the reading itself will reinforce it.

TEACHER NOTES:
Activating prior knowledge before reading is a non-negotiable comprehension strategy (VTLM 2.0: Retention and Recall). Chapter 15 only makes sense if students remember the "first miracle" from Chapter 14 — without this context, Matilda's decision to confide in Miss Honey lacks motivation. The three questions scaffold recall: WHAT happened → WHO was there → WAS it deliberate? This mirrors the narrative arc of Chapter 15 where Matilda moves from accidental to intentional.

WATCH FOR:
• Students who say "Matilda moved the glass on purpose" — correct immediately: "Not yet. In Chapter 14 it was an accident. Whether she can do it on purpose is the question for today's chapter."
• Readiness signal: Students can articulate that the glass tipped over involuntarily when Matilda was angry.

[General: Review/Activation of Prior Knowledge — VTLM 2.0: Retention and Recall]`;

const NOTES_VOCAB = `SAY:
• "Before we read, we need to know two important words that Roald Dahl uses in this chapter."
• Point to "confide": "Read this word with me: con-FIDE." [Students repeat.] "Confide means to tell someone a secret or something private because you trust them. You confide IN someone."
• "In Chapter 15, Matilda needs to confide in someone about her power. Ask yourself: why would she choose Miss Honey?" [Because Miss Honey is trustworthy / kind / the only adult who believes in her.]
• Point to "vivid": "Read this word with me: VIV-id." [Students repeat.] "Vivid means something so clear and bright that you can almost see it, hear it, or feel it. A vivid memory is one that feels real."
• "Roald Dahl uses vivid descriptions to help us SEE what Matilda experiences. Listen for vivid language as we read."

DO:
• Point to each word card as you teach it. Students repeat the word aloud (choral response).
• Spend no more than 90 seconds per word. This is rapid explicit teaching — depth comes during reading.
• Do NOT ask students to write definitions yet. They will encounter these words in context during reading.

TEACHER NOTES:
Two explicit vocabulary words is the right load for a content-heavy lesson. "Confide" is essential for comprehension — the entire chapter hinges on Matilda's decision to confide in Miss Honey. "Vivid" supports the literary devices work later (Dahl's metaphor on p.260 is vivid imagery). The incidental vocabulary (wise, sympathetic, extraordinary, doubtful, astounding, riffling, peculiar, disastrous, exalted, gaped, transfigured, seraphic, awestruck, wonderment) will be addressed in context during reading — do not pre-teach these. VTLM 2.0: Explicit Explanation. DECIDE Framework: D (Define the vocabulary component).

MISCONCEPTIONS:
• Misconception: "Confide" means the same as "tell" or "say."
  Why: Students overgeneralise — all forms of telling seem equivalent. They miss the trust/secrecy nuance.
  Impact: If students think "confide" just means "tell," they miss the significance of Matilda's choice to trust Miss Honey specifically. The narrative tension depends on understanding that confiding is a deliberate, trust-based act.
  Quick correction: "If I tell you what I had for breakfast, is that confiding? No — because it is not a secret. Confiding means telling someone something private or secret because you TRUST them. Would Matilda confide in the Trunchbull? Why not?"

WATCH FOR:
• Students who cannot repeat "confide" correctly (mispronouncing as "con-FYED" or "CON-fide") — model again: "con-FIDE, like 'confide in someone.'"
• Students who mix up "vivid" with "livid" (angry) — brief correction: "Vivid is about brightness and clarity. Livid means very angry. Different words."
• Readiness signal: Students can say both words clearly and nod when you give a quick-check: "Thumbs up if confide has something to do with trust."

[General: Explicit Instruction (I Do) — Vocabulary — VTLM 2.0: Explicit Explanation]`;

const NOTES_READING_LAUNCH = `SAY:
• "Open your books to page 251. We are reading Chapter 15: The Second Miracle."
• "Today is student read aloud. I will select readers as we go. Everyone follows along — fingers on the text."
• "We will stop THREE times during the reading at key moments. When we stop, I will ask you a question. Your job is to think carefully before you answer."
• "Remember: good readers do not just read the words — they think about what is happening and why."

DO:
• Ensure all students have books open to page 251. Scan for students who need page help.
• Remind students of read aloud expectations: "Eyes on text, follow along silently, be ready to read when called."
• Select your first reader. Aim for confident readers first to establish pace and fluency.
• Keep reading pace brisk but allow expression — this is a dramatic chapter.

TEACHER NOTES:
Student read aloud for this chapter serves two purposes: (1) it keeps engagement high in a content-heavy lesson, and (2) it lets the teacher monitor fluency and decoding in real time. The three pause points are strategically placed at moments of rising tension (p.256 — the request to repeat), climax (p.259 — the second miracle), and denouement (p.261 — Miss Honey's response). This mirrors narrative structure, which students can later connect to their topic sentence work. The reading section should take no more than 18 minutes including pause points. If pacing is tight, call on fluent readers and keep transitions between readers to under 5 seconds. VTLM 2.0: Scaffold Practice (shared reading with monitoring).

WATCH FOR:
• Students not following along (eyes off text, no finger tracking) — a quick "All eyes on line 3" redirects without disrupting the reader.
• Readers who struggle with incidental vocabulary (transfigured, seraphic, awestruck) — supply the word quickly and move on. Do not stop to teach these in detail during reading.
• Readiness signal: All students tracking the text, reader maintaining reasonable pace.

[General: Guided Practice (We Do — Shared Reading) — VTLM 2.0: Scaffold Practice]`;

const NOTES_PAUSE1 = `SAY:
• "Stop reading here. Look at this quote: 'Could you do it again?' she asked, not unkindly."
• Ask: "What is going on in this moment? Who is speaking, and what are they asking?" [Miss Honey is asking Matilda if she can tip the glass over again.]
• "Notice the dialogue tag: 'not unkindly.' What does that tell us about Miss Honey's tone?" [She is not being mean or dismissive — she is asking gently, perhaps with curiosity or concern.]
• "Think about this: why would Roald Dahl write 'not unkindly' instead of just 'kindly'? What is the difference?" [Allow pairs to discuss.] ["Not unkindly" suggests she is cautious, careful — not fully warm, but not cold either. There is a subtlety to her response.]
• After pairs share: "This is how authors use dialogue to show us what characters think and feel. Miss Honey's words AND the way she says them reveal her character."

DO:
• Pause the reader at p.256 after this line.
• Display the slide. Allow 10 seconds for students to re-read the quote on screen.
• Run Think-Pair-Share: 30 seconds silent thinking, 60 seconds pair discussion, then cold call 2 pairs.
• Click to next slide to reveal the discussion points after students have responded.

CFU CHECKPOINT:
Technique: Think-Pair-Share

Script:
• "Think silently for 30 seconds: what is happening in this moment, and what does 'not unkindly' tell us about Miss Honey?"
• "Now turn to your partner and share. You have 60 seconds."
• Cold call 2 pairs: "What did you and your partner discuss?"
• Scan for: Students who identify (a) Miss Honey is asking Matilda to demonstrate, and (b) 'not unkindly' shows her tone is gentle/cautious.

PROCEED (if ≥80% identify the speaker and interpret the tone):
Continue reading to p.259. Students are tracking the dialogue and tone effectively.

PIVOT (if <80% can identify speaker or interpret tone):
Most likely issue: Students read dialogue without connecting it to character — they see words but not the character behind them.
Reteach: "Let me show you how I read dialogue. I ask myself two questions: WHO is speaking? and HOW are they feeling? The words 'Could you do it again?' tell me WHAT she says. The tag 'not unkindly' tells me HOW she says it. That HOW is the author's clue about character. Let me try another one from earlier in the book..." Give a quick second example from a familiar passage, then re-prompt.
Re-check: "What two things do we look for in dialogue?" Cold call. [Who is speaking + how they are feeling.]

TEACHER NOTES:
This pause point addresses the LI on dialogue: "Identify how authors use dialogue to convey what characters say and think." The double negative "not unkindly" is a hallmark of Dahl's precise, understated style. It communicates more than "kindly" would — it implies Miss Honey's caution, her professional restraint, her desire not to frighten or dismiss Matilda. This is a rich teaching moment for Year 3/4 students who are learning to read beyond the literal. VTLM 2.0: Monitor Progress (comprehension check during reading).

WATCH FOR:
• Students who say Miss Honey is being "mean" because of the word "unkindly" — they are reading the word literally without the "not." Correct: "Read it again carefully — 'NOT unkindly.' The 'not' changes the meaning."
• Students who skip the dialogue tag entirely and focus only on the words spoken — redirect: "What THREE words come after the speech marks? Those are the clue."
• Readiness signal: Students can explain that the dialogue tag reveals Miss Honey's gentle, cautious tone.

[General: Guided Practice (We Do — Pause Point) — VTLM 2.0: Monitor Progress]`;

const NOTES_PAUSE2 = `SAY:
• "Stop here. Read this line again: 'not twelve inches from Miss Honey's folded arms.'"
• Ask: "What just happened?" [Matilda made the glass tip over again — this time on purpose, right in front of Miss Honey.]
• "On your whiteboard, write ONE word that describes how Miss Honey might be feeling right now." [Allow 20 seconds.] "Hold them up."
• Expected responses: shocked, amazed, scared, stunned, speechless, awestruck.
• "Many of you wrote words like 'shocked' or 'amazed.' Roald Dahl uses the word 'awestruck' — meaning so amazed you can barely speak. This is the moment Miss Honey BELIEVES Matilda."

DO:
• Pause the reader at p.259.
• Display the slide. Distribute whiteboards if not already out.
• Give students 20 seconds to write their one-word response. Say: "One word only. Hold up on my signal."
• Scan whiteboards quickly — note the range of responses.
• Click to next slide to reveal the answer/discussion after the whiteboard check.

CFU CHECKPOINT:
Technique: Show Me Boards

Script:
• "On your whiteboard, write ONE word that describes how Miss Honey is feeling at this exact moment. You have 20 seconds."
• "3, 2, 1 — boards up."
• Scan for: Words in the "amazed/shocked/stunned" family. Accept any reasonable synonym. Flag students who write feelings that don't match (e.g., "happy," "angry").
• "I can see words like 'shocked,' 'amazed,' 'stunned' — these all capture it. Roald Dahl's word for this is 'awestruck.'"

PROCEED (if ≥80% write an appropriate emotion word):
Continue reading to the literary devices on p.260.

PIVOT (if <80% write an appropriate emotion word):
Most likely issue: Students are not visualising the scene — they are reading words without building a mental picture of what just happened.
Reteach: "Close your eyes. Imagine you are Miss Honey. You are sitting at your desk. A small girl stares at a glass of water in front of you. Suddenly — the glass tips over. Nobody touched it. How do you feel?" Give 10 seconds of silent visualisation. "Now write your one word." This uses imagery to anchor comprehension.
Re-check: "Boards up again." Scan for improvement.

TEACHER NOTES:
This is the climax of Chapter 15 — Matilda deliberately repeats the telekinetic act. The phrase "not twelve inches from Miss Honey's folded arms" emphasises proximity: this happened RIGHT IN FRONT of her. There is no room for doubt. Show Me Boards are used here because the task (one emotion word) is low-stakes and fast, allowing every student to respond simultaneously. The word "awestruck" is an incidental vocabulary opportunity — do not formally teach it, but name it as Dahl's precise word choice. VTLM 2.0: Monitor Progress.

WATCH FOR:
• Students who write multiple words or sentences — redirect: "I said ONE word. Rub out and pick your strongest word."
• Students who write "happy" — probe: "Is Miss Honey just happy, or is it more intense than that? What word is bigger than happy?"
• Readiness signal: Boards show words in the amazed/shocked/stunned family across ≥80% of students.

[General: Guided Practice (We Do — Pause Point) — VTLM 2.0: Monitor Progress]`;

const NOTES_LIT_DEVICES = `SAY:
• "Before we finish reading, look at two incredible sentences Roald Dahl writes on page 260."
• Point to the first example: "Read this with me: 'click went her face.' What do you notice about this phrase?" [It sounds like the thing it describes — a clicking sound.]
• "This is called onomatopoeia — when a word sounds like the noise it describes. 'Click' is the sound. Dahl uses it to describe the moment Matilda's face changes — like a switch flipping on."
• Point to the second example: "Now read this one: 'I was flying past the stars on silver wings.'"
• "Is Matilda literally flying? No. This is a metaphor — a comparison that says something IS something else. Matilda is describing how her power FEELS. It feels like flying past stars. That is vivid — there is our vocabulary word."
• Ask: "Why would Dahl use a metaphor here instead of just saying 'it felt amazing'?" [A metaphor creates a picture in the reader's mind. It helps us FEEL what Matilda feels.]

DO:
• Display the slide with both examples visible.
• Read each example aloud with expression — model how onomatopoeia sounds and how metaphor paints a picture.
• Keep this section to 4 minutes. Teach the terms, connect to the text, move on.
• This is I Do — you are naming and explaining the devices. Students listen and engage.

CFU CHECKPOINT:
Technique: Thumbs Up/Down

Script:
• "Thumbs up if onomatopoeia is about words that SOUND like what they describe. Thumbs down if it is about comparing two things."
• Scan: ≥80% should show thumbs up.
• "Now — thumbs up if a metaphor says something IS something else. Thumbs down if a metaphor uses 'like' or 'as.'"
• Scan: ≥80% should show thumbs up. (Note: "like" or "as" = simile, not metaphor.)

PROCEED (if ≥80% correct on both checks):
Move to Pause Point 3. Students can identify both devices.

PIVOT (if <80% correct):
Most likely issue: Students confuse onomatopoeia with metaphor, or confuse metaphor with simile.
Reteach: "Think of it this way. Onomatopoeia = SOUNDS. Buzz, crash, click, pop. Say 'click' — it sounds like a click! That is onomatopoeia. Metaphor = IS. 'I was flying.' She WAS flying. She is not LIKE flying — she IS flying. If Dahl had written 'it felt LIKE flying,' that would be a simile. But he wrote 'I WAS flying' — that is a metaphor."
Re-check: "Give me a thumbs up or down: 'The thunder ROARED across the sky.' Is that onomatopoeia or metaphor?" [Metaphor — thunder is not literally a roaring animal.] Quick follow-up: "What about 'BOOM went the cannon'?" [Onomatopoeia — boom sounds like the noise.]

TEACHER NOTES:
These two literary devices are drawn directly from p.260 of the text, making them contextually meaningful rather than abstract. Onomatopoeia is relatively accessible for Year 3/4 (they love saying the word). Metaphor is more challenging — students at this level often confuse it with simile. The key distinction is "IS" vs "like/as." Dahl's metaphor is particularly powerful because it uses vivid sensory imagery (flying, stars, silver wings) to convey an internal experience. This connects directly to the vocabulary word "vivid." DECIDE Framework: E (Execute through modelling — I Do).

MISCONCEPTIONS:
• Misconception: A metaphor uses "like" or "as."
  Why: Students have learned simile first and overgeneralise the comparison concept. They see any comparison as the same device.
  Impact: If not corrected, students will mislabel similes as metaphors (and vice versa) throughout their literacy learning, confusing their analytical writing.
  Quick correction: "Simile = LIKE or AS. Metaphor = IS. 'She ran like the wind' = simile. 'She was the wind' = metaphor. The metaphor is stronger because it says she IS the thing."

WATCH FOR:
• Students who say "click went her face" is a metaphor — they may be focusing on the unusual sentence structure rather than the sound. Redirect: "Say the word 'click' out loud. Does it SOUND like what it describes? That is the clue."
• Students who think onomatopoeia only applies to animal sounds (moo, woof) — broaden: "It includes ALL sound words — crash, buzz, click, pop, sizzle."
• Readiness signal: Students can correctly identify both thumbs up/down checks without hesitation.

[General: Explicit Instruction (I Do) — Literary Devices — VTLM 2.0: Explicit Explanation]`;

const NOTES_PAUSE3 = `SAY:
• "Let's finish the chapter. Look at this last line: 'I wouldn't dream of it,' Miss Honey said."
• "Matilda has just shown Miss Honey her incredible power. Miss Honey asks Matilda to come to her cottage for tea to talk about it more."
• Ask: "Given what we already know about Miss Honey from the whole book so far, what do you think she is planning? Why does she want to talk more?"
• "Turn and talk with your partner for 60 seconds. What is Miss Honey up to?"
• After sharing: "Miss Honey cares deeply about Matilda. She is not afraid of the power — she wants to HELP. 'I wouldn't dream of it' means she would never betray Matilda's trust. This is what confiding looks like — Matilda confided in Miss Honey, and Miss Honey responded with care."

DO:
• Pause after reading p.261.
• Display the slide. Allow students to re-read the quote on screen.
• Run Turn & Talk: 60 seconds partner discussion. Circulate and listen to 3-4 pairs.
• Cold call 2 pairs to share predictions. Validate responses that connect to Miss Honey's character.
• Click to next slide to reveal the discussion notes.

CFU CHECKPOINT:
Technique: Turn & Talk

Script:
• "Turn to your partner. In 60 seconds, discuss: what do you think Miss Honey is planning? Use what you already know about her character."
• Circulate — listen for: references to Miss Honey's caring nature, her own difficult past (Trunchbull is her aunt), and her desire to protect Matilda.
• Cold call 2 pairs: "What did your partnership predict?"
• Scan for: Predictions grounded in character knowledge (not wild guesses).

PROCEED (if ≥80% make character-grounded predictions):
Close the reading section. Move to topic sentences.

PIVOT (if <80% make vague or unsupported predictions):
Most likely issue: Students are not connecting across chapters — they respond only to the immediate scene.
Reteach: "Let me give you a clue. Remember that Miss Honey lives in that tiny cottage, and the Trunchbull is her aunt. Miss Honey knows what it is like to be afraid of someone powerful. Now Matilda has a power of her own. What might Miss Honey see as an opportunity here?"
Re-check: "Talk to your partner again — 30 seconds. What might Miss Honey be thinking?" Cold call a new pair.

TEACHER NOTES:
This pause point is deliberately predictive — it asks students to infer forward rather than recall backward. Prediction grounded in character knowledge is a higher-order comprehension strategy (VC2E4LY05: inferring). The line "I wouldn't dream of it" is ambiguous — it could mean "I wouldn't dream of telling anyone" OR "I wouldn't dream of letting this go unexplored." Both are valid. The key teaching point is that Miss Honey's response reflects her trustworthiness — linking back to the vocabulary word "confide." If running behind on time, abbreviate this to a 30-second Turn & Talk and move on. VTLM 2.0: Monitor Progress.

WATCH FOR:
• Students who predict Miss Honey will "use" Matilda's power selfishly — challenge gently: "Is that consistent with everything we know about Miss Honey's character?"
• Students who cannot predict at all — scaffold: "What kind of person is Miss Honey? Kind or cruel? What would a kind person do if a child showed them something amazing?"
• Readiness signal: Predictions reference Miss Honey's established character traits (caring, protective, clever).

[General: Guided Practice (We Do — Pause Point) — VTLM 2.0: Monitor Progress]`;

const NOTES_TS_IDO = `SAY:
• "Now we are going to learn something new: topic sentences and supporting details. This is a writing skill you will use all the time."
• "A topic sentence is the MAIN IDEA of a paragraph. It tells the reader what the paragraph is about. It is usually the FIRST sentence."
• "Supporting details are the sentences that give MORE INFORMATION about the topic sentence. They explain, prove, or give examples."
• "Watch me. Here are three sentences about Chapter 15." Point to Example 1 on the slide.
• "I need to decide which one is the topic sentence — the MAIN IDEA — and which are supporting details."
• Point to each sentence: "Sentence 1: 'Matilda convinced Miss Honey she can control objects with her mind.' Sentence 2: 'She told Miss Honey she tipped the Trunchbull's glass over.' Sentence 3: 'She proved it by repeating the miracle again.'"
• "I ask myself: which sentence tells me the BIG picture? Which one could be a heading for the others? Sentence 1 — 'Matilda convinced Miss Honey she can control objects with her mind' — that is the BIG idea. Sentences 2 and 3 tell me HOW she convinced her. They are the details."
• "So Sentence 1 is the TOPIC SENTENCE. Sentences 2 and 3 are SUPPORTING DETAILS."

DO:
• Point to each sentence as you talk through it. Use a think-aloud to model your reasoning.
• Gesture to show the relationship: topic sentence = umbrella, supporting details = underneath.
• Do NOT ask students to identify yet — this is pure I Do modelling. Students watch and listen.
• Spend 3-4 minutes on this explanation. The concepts must be clear before We Do.

TEACHER NOTES:
This is the I Do phase for the new writing skill. Topic sentences and supporting details are foundational to paragraph structure. Year 3/4 students often write "and then... and then..." chains without hierarchy. Understanding that one sentence states the main idea and others support it is a conceptual shift. The example is drawn directly from Chapter 15 content, which keeps cognitive load manageable — students already know the story, so they can focus on the STRUCTURE rather than the CONTENT. DECIDE Framework: E (Execute through modelling). The "umbrella" metaphor (topic sentence covers the supporting details) is an effective visual anchor for this age group.

MISCONCEPTIONS:
• Misconception: The longest or most detailed sentence is always the topic sentence.
  Why: Students associate "main idea" with "most information." They equate length with importance.
  Impact: When writing their own paragraphs, students will write a long, detailed first sentence and then have nothing left to say in supporting details.
  Quick correction: "The topic sentence is not the longest sentence — it is the BROADEST. It tells the big picture. Supporting details fill in the specifics. Think of it like a title on a chapter — the title is short, but it covers everything in the chapter."

• Misconception: The topic sentence must always be the first sentence.
  Why: Teachers often simplify the concept by saying "the topic sentence comes first." While this is a useful starting structure for Year 3/4, it becomes a rigid rule.
  Impact: Low — at this stage, encouraging topic sentences first is developmentally appropriate. Revisit flexibility in Year 5/6.
  Quick correction: For now, reinforce "topic sentence first" as a strong pattern. Do not overcomplicate.

WATCH FOR:
• Students who look confused during the think-aloud — check by asking the class: "Put your hand on the sentence you think is the topic sentence." If most hands go to the right place, proceed.
• Students who cannot distinguish between "what happened" (detail) and "what the paragraph is ABOUT" (main idea) — use the analogy: "If this were a news headline, which sentence would be the headline?"
• Readiness signal: When you point to the topic sentence, students nod or say "yes" before you confirm it.

[General: Explicit Instruction (I Do) — Sentence-Level Writing — VTLM 2.0: Explicit Explanation and Modelling]`;

const NOTES_TS_WEDO2 = `SAY:
• "Your turn to help me. Here are three sentences. ONE is the topic sentence and TWO are supporting details."
• "Read all three silently." [Allow 15 seconds.]
• "Now — hold up fingers. If you think A is the topic sentence, hold up 1 finger. B = 2 fingers. C = 3 fingers."
• "On my count: 3, 2, 1 — show me."
• After scanning: "The topic sentence is B: 'Matilda tipped the glass over by staring at it.' This is the MAIN IDEA — it tells us WHAT happened. A and C are supporting details — they tell us HOW she did it."
• "A tells us she 'focussed on the glass intently' — that is a detail about HOW. C tells us she 'shouted the words inside her head' — another detail about HOW. Both support the topic sentence."

DO:
• Display the three sentences. Allow 15 seconds silent reading.
• Run Finger Voting: 1 finger = A, 2 = B, 3 = C.
• Count on "3, 2, 1" — students hold up fingers simultaneously. Scan the room.
• Click to next slide to reveal the answer after students have voted.
• After reveal, briefly explain WHY B is the TS and A/C are SD.

CFU CHECKPOINT:
Technique: Finger Voting

Script:
• "Read all three sentences. Decide which one is the topic sentence — the MAIN IDEA."
• "1 finger for A, 2 fingers for B, 3 fingers for C. 3, 2, 1 — show me."
• Scan for: ≥80% holding up 2 fingers (B).
• "If you picked B, you are correct. Let me explain why."

PROCEED (if ≥80% vote B):
Move to Example 3. Students are grasping the concept.

PIVOT (if <80% vote B):
Most likely issue: Students are choosing the most specific/vivid sentence rather than the broadest one.
Reteach: "Remember — the topic sentence is the BROADEST sentence. It covers the whole idea. Ask yourself: which sentence could be a TITLE for the other two? Could 'She focussed on the glass intently' be a title for all three? No — it is too specific. Could 'Matilda tipped the glass over by staring at it' be a title? Yes — the other two sentences explain HOW she did it."
Re-check: Read the three sentences aloud again, emphasising the breadth of B vs the specificity of A and C. "Now vote again." Scan for improvement.

TEACHER NOTES:
This is the first We Do: students apply the concept with teacher guidance. Finger Voting is used because it is fast, simultaneous, and gives the teacher instant data on the whole class. Example 2 is slightly harder than Example 1 because all three sentences are about the same event (tipping the glass) — students must distinguish between the WHAT (topic sentence) and the HOW (supporting details). The scrambled order (SD, TS, SD) prevents students from defaulting to "the first sentence is always the topic sentence." VTLM 2.0: Scaffold Practice.

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Give students a topic sentence and ask them to identify which of two sentences is a supporting detail and which is unrelated. This removes the three-way choice and reduces cognitive load. E.g., TS: "Matilda has a special power." SD: "She can tip over a glass with her mind." Unrelated: "Miss Honey likes tea." Ask: "Which sentence supports the topic sentence?"

EXTENDING PROMPT:
• Task: Give students a topic sentence and ask them to WRITE two supporting details of their own. E.g., TS: "Matilda is different from other children." Students generate: SD1 and SD2. This moves from identification to generation — the next step on the progression.

WATCH FOR:
• Students who consistently vote for A (the first sentence) — they may be using position rather than meaning. Probe: "Why did you choose A? What makes it the main idea?"
• Students who vote correctly but cannot explain why — push for reasoning: "How do you know B is the topic sentence?"
• Readiness signal: ≥80% vote correctly AND at least 2 students can articulate the reasoning (B is broad, A and C are specific).

[General: Guided Practice (We Do) — Sentence-Level Writing — VTLM 2.0: Scaffold Practice]`;

const NOTES_TS_WEDO3 = `SAY:
• "One more. Three sentences — find the topic sentence."
• "Read all three silently." [Allow 15 seconds.]
• "This time I want you to say the LETTER of the topic sentence together on my signal."
• "3, 2, 1 — say it!" [Students call out the letter.]
• After response: "The topic sentence is C: 'Miss Honey was amazed by Matilda's miracle.' This is the BIG IDEA — it tells us Miss Honey's reaction. A and B are details that explain her reaction."
• "A tells us she 'thought Matilda was making it up at first' — that is a detail about her initial doubt. B tells us she 'was speechless when she saw the glass fall over' — a detail about her amazement."

DO:
• Display the three sentences. Allow 15 seconds silent reading.
• Run Choral Response: Students say the letter aloud together on the count of 3, 2, 1.
• Listen for a clear, unified response. If mixed, repeat.
• Click to next slide to reveal the answer.

CFU CHECKPOINT:
Technique: Choral Response

Script:
• "When I say 'go,' call out the letter of the topic sentence. Ready? 3, 2, 1 — go!"
• Listen for: A clear, unified "C!" from the majority. If the response is mixed or quiet, repeat.
• "The answer is C. Let me show you why."

PROCEED (if clear unified "C"):
Move to You Do. Students are ready for independent practice.

PIVOT (if response is mixed or incorrect):
Most likely issue: The TS position changed (now C instead of B), confusing students who are pattern-matching rather than thinking about meaning.
Reteach: "I heard some different answers. Let's use the test: which sentence could be a HEADLINE? 'At first, she thought Matilda was making it up' — is that the big idea? No, that is just one moment. 'She was speechless when she saw the glass fall over' — is that the big idea? Closer, but it is still one specific moment. 'Miss Honey was amazed by Matilda's miracle' — this covers EVERYTHING. That is the topic sentence."
Re-check: "Say it with me: the topic sentence is..." [C!]

TEACHER NOTES:
Example 3 deliberately places the TS in position C (last) to prevent position-dependent answering. Students who understood the concept from Examples 1 and 2 will identify it regardless of position. Choral Response is used here as a lower-stakes, faster technique — it builds momentum heading into You Do. If the choral response is strong, the class is ready for independent practice. If mixed, one more teacher-led example may be needed. VTLM 2.0: Scaffold Practice.

WATCH FOR:
• A split response (some say A, some C) — this is diagnostic. Students saying A may be choosing the most narrative/interesting sentence rather than the broadest.
• Students who are silent during choral response — they may be unsure. Note them for extra support during You Do.
• Readiness signal: A strong, unified "C!" from ≥80% of the class.

[General: Guided Practice (We Do) — Sentence-Level Writing — VTLM 2.0: Scaffold Practice]`;

const NOTES_TS_YOUDO = `SAY:
• "Now it is your turn to write. You are going to write ONE topic sentence and TWO supporting details about Chapter 15."
• Read from slide: "First: Think about one BIG idea from Chapter 15."
• "Next: Write a topic sentence — one sentence that captures the main idea."
• "Then: Write two supporting details — sentences that give more information about your topic sentence."
• "You have your worked examples from our We Do to look back at. You can write about anything from Chapter 15 — Matilda's power, Miss Honey's reaction, the decision to confide, the trip to the cottage."
• "You have 8 minutes. Write in your booklets. Start with 'TS:' for your topic sentence and 'SD:' for each supporting detail."

DO:
• Ensure students have booklets open and pencils ready.
• Display the slide with the three steps visible throughout.
• Set a timer for 8 minutes (visible if possible).
• Circulate immediately — start with the back-left table, then move through the room.
• For the first 2 minutes, check that students are writing a TOPIC SENTENCE first, not a supporting detail.
• Conference briefly with students who are stuck — use the prompt: "What is ONE thing that happened in Chapter 15?" Then: "Can you say that in one broad sentence? That is your topic sentence."

TEACHER NOTES:
This is the You Do phase — students apply the new concept independently. The "First, Next, Then" structure on the slide gives students a clear process to follow while you circulate. The 8-minute window is tight but deliberate — in a content-heavy lesson, the writing must be protected but not overextended. Students write in booklets (not loose paper) so the work is retained. The TS/SD labelling is a scaffold that makes the paragraph structure visible. DECIDE Framework: D (Differentiate through fading) — students have seen three modelled examples and now write without the sort scaffold. VTLM 2.0: Supported Application.

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Provide students with a pre-written topic sentence about Chapter 15 (e.g., "Matilda decided to tell Miss Honey her secret"). Students write only the two supporting details. This reduces the cognitive load by removing the topic sentence generation step — they focus on supporting detail only.
• Extra Notes: Have 2-3 pre-written topic sentences on cards for students who need this scaffold. Let them choose one.

EXTENDING PROMPT:
• Task: Students write a SECOND paragraph with a different topic sentence about a different aspect of Chapter 15. E.g., if their first paragraph was about Matilda's power, the second could be about Miss Honey's reaction. This extends paragraph structure to multi-paragraph organisation.
• Extra Notes: Challenge them to make the two paragraphs connect — "Can your second paragraph follow on from your first?"

WATCH FOR:
• Students writing supporting details first and then struggling to write a topic sentence — redirect: "Stop. What is the BIG idea? Write that first. The details come second."
• Students whose topic sentence is too narrow (e.g., "Matilda stared at the glass") — probe: "Is that the big idea or is that a detail about how she did it? What is the bigger idea?"
• Students whose supporting details do not connect to their topic sentence — check: "Read your TS to me. Now read your SD. Does the SD tell me MORE about the TS?"
• Readiness signal: Students write a clear TS + 2 connected SDs within 8 minutes. At least 50% of the class should achieve this; the rest should have a TS + 1 SD minimum.

[General: Independent Practice (You Do) — Sentence-Level Writing — VTLM 2.0: Supported Application]`;

const NOTES_CLOSING = `SAY:
• "Let's reflect on what we learned today."
• Read the Turn & Talk prompt: "Why did Matilda choose to confide in Miss Honey — and what does that tell us about the kind of person you should confide in?"
• Allow 60 seconds Turn & Talk.
• Share 1-2 responses. Then: "Confiding in the right person — someone trustworthy — is a big decision. Matilda chose well."
• Point to takeaways: "Today we read Chapter 15 and explored Matilda's world. We learned about onomatopoeia and metaphor. And we learned how to write a topic sentence with supporting details."
• "Check the success criteria in your mind. Can you tell the difference between a topic sentence and a supporting detail? Can you write your own? Thumbs up."

DO:
• Run the Turn & Talk for 60 seconds. Circulate and listen.
• Share 1-2 brief responses. Do not extend — keep the closing to 2 minutes.
• Read the key takeaways aloud. Connect back to LI/SC.
• Quick thumbs up self-assessment against the SCs.
• Collect booklets if needed.

TEACHER NOTES:
The reflection prompt intentionally bridges the reading content (confiding in Miss Honey) with the vocabulary word (confide) and a real-life social-emotional theme (choosing trustworthy people). This makes the lesson sticky — students leave with both an academic takeaway (topic sentences) and a personal one (the value of trust). The key takeaways are kept to four points: reading comprehension, vocabulary, literary devices, and writing. This mirrors the lesson structure. VTLM 2.0: Retention and Recall / Consolidation.

WATCH FOR:
• Students who rush the thumbs up without genuine reflection — pause: "Be honest. If you are not sure about topic sentences yet, that is fine. We will practise more tomorrow."
• Students who want to discuss the plot further — acknowledge: "Great enthusiasm! We will keep reading in Lesson 22."
• Readiness signal: A calm, purposeful close with most students giving honest thumbs up on at least 3 of 5 SCs.

[General: Closing / Review — VTLM 2.0: Retention and Recall]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build helper: sorting activity slide (We Do — identify the topic sentence)
// ─────────────────────────────────────────────────────────────────────────────

function buildSortSlide(pres, sentences, tsIndex, notes) {
  /**
   * sentences: [string, string, string] — the three sentences (scrambled)
   * tsIndex:   0, 1, or 2 — which sentence is the Topic Sentence
   */
  const labels = ["A", "B", "C"];
  const cardH  = 1.08;
  const gap    = 0.14;

  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.TEAL);
      addBadge(s, "We Do", { color: C.TEAL });
      addTitle(s, "Which Is the Topic Sentence?");

      sentences.forEach((text, i) => {
        const y = CONTENT_TOP + i * (cardH + gap);
        addCard(s, 0.5, y, 9, cardH, { fill: C.WHITE });
        // Letter circle
        s.addShape("roundRect", {
          x: 0.65, y: y + 0.22, w: 0.50, h: 0.50, rectRadius: 0.25,
          fill: { color: C.PLUM },
        });
        s.addText(labels[i], {
          x: 0.65, y: y + 0.22, w: 0.50, h: 0.50,
          fontSize: 20, fontFace: FONT_H, color: C.WHITE, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
        s.addText(text, {
          x: 1.35, y: y + 0.12, w: 7.8, h: cardH - 0.24,
          fontSize: 15, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
        });
      });

      addFooter(s, FOOTER);
      s.addNotes(notes);
      return s;
    },
    (slide) => {
      // Highlight the TS card with a honey border
      const tsY = CONTENT_TOP + tsIndex * (cardH + gap);
      slide.addShape("roundRect", {
        x: 0.42, y: tsY - 0.04, w: 9.16, h: cardH + 0.08, rectRadius: 0.12,
        fill: { color: C.HONEY, transparency: 80 },
        line: { color: C.HONEY, width: 3 },
      });
      // "Topic Sentence" label on TS
      slide.addShape("roundRect", {
        x: 7.0, y: tsY + 0.25, w: 2.3, h: 0.45, rectRadius: 0.08,
        fill: { color: C.HONEY },
      });
      slide.addText("Topic Sentence", {
        x: 7.0, y: tsY + 0.25, w: 2.3, h: 0.45,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      // "Supporting Detail" labels on SD cards
      sentences.forEach((_, i) => {
        if (i === tsIndex) return;
        const sdY = CONTENT_TOP + i * (cardH + gap);
        slide.addShape("roundRect", {
          x: 7.2, y: sdY + 0.25, w: 2.1, h: 0.45, rectRadius: 0.08,
          fill: { color: C.TEAL },
        });
        slide.addText("Supporting Detail", {
          x: 7.2, y: sdY + 0.25, w: 2.1, h: 0.45,
          fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
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
  pres.title  = "Matilda Lesson 21 — The Second Miracle";

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1: TITLE
  // ═══════════════════════════════════════════════════════════════════════════
  titleSlide(
    pres,
    "The Second Miracle",
    "Matilda \u2014 Chapter 15",
    "Lesson 21 of 25  |  Week 5  |  Year 3/4 Literacy",
    NOTES_TITLE
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2: LEARNING INTENTIONS & SUCCESS CRITERIA
  // ═══════════════════════════════════════════════════════════════════════════
  liSlide(
    pres,
    [
      "We are learning to identify and write topic sentences with supporting details",
    ],
    [
      "I can tell the difference between a topic sentence and a supporting detail",
      "I can write a topic sentence about Chapter 15",
      "I can write a topic sentence with two supporting details",
    ],
    NOTES_LI,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3: REVIEW — Prior Knowledge (Chapter 14)
  // ═══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres,
    "Review", C.PLUM,
    "What Do We Remember?",
    [
      "What extraordinary thing happened to Matilda in Chapter 14?",
      "Who was in the room when it happened?",
      "Did Matilda do it on purpose \u2014 or was it involuntary?",
    ],
    NOTES_REVIEW,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4: VOCABULARY — confide & vivid (dual word, custom inline)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.TEAL);
    addBadge(s, "Vocabulary", { color: C.TEAL });
    addTitle(s, "Word Study \u2014 Two Key Words");

    // Left card: confide
    const col1X = 0.5, col2X = 5.05, colW = 4.3;
    const crdY = CONTENT_TOP, crdH = SAFE_BOTTOM - CONTENT_TOP;

    // --- confide ---
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
    s.addText("confide", {
      x: col1X + 0.15, y: crdY + 0.08, w: colW - 0.3, h: 0.54,
      fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: col1X + colW - 1.3, y: crdY + 0.15, w: 1.1, h: 0.34, rectRadius: 0.08,
      fill: { color: C.HONEY },
    });
    s.addText("verb", {
      x: col1X + colW - 1.3, y: crdY + 0.15, w: 1.1, h: 0.34,
      fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Definition", {
      x: col1X + 0.2, y: crdY + 0.80, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("To tell someone about a secret or private matter, trusting them to keep it safe.", {
      x: col1X + 0.2, y: crdY + 1.04, w: colW - 0.4, h: 0.70,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addText("In the text", {
      x: col1X + 0.2, y: crdY + 1.80, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("\u201CMatilda needed to confide in one trustworthy adult.\u201D", {
      x: col1X + 0.2, y: crdY + 2.06, w: colW - 0.4, h: 0.70,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // --- vivid ---
    addCard(s, col2X, crdY, colW, crdH, { fill: C.WHITE });
    s.addShape("roundRect", {
      x: col2X, y: crdY, w: colW, h: 0.70, rectRadius: 0.1,
      fill: { color: C.TEAL },
    });
    s.addShape("rect", {
      x: col2X, y: crdY + 0.55, w: colW, h: 0.15,
      fill: { color: C.TEAL },
    });
    s.addText("vivid", {
      x: col2X + 0.15, y: crdY + 0.08, w: colW - 0.3, h: 0.54,
      fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: col2X + colW - 1.4, y: crdY + 0.15, w: 1.2, h: 0.34, rectRadius: 0.08,
      fill: { color: C.HONEY },
    });
    s.addText("adjective", {
      x: col2X + colW - 1.4, y: crdY + 0.15, w: 1.2, h: 0.34,
      fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Definition", {
      x: col2X + 0.2, y: crdY + 0.80, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("Producing strong, clear images in the mind; very bright or intense.", {
      x: col2X + 0.2, y: crdY + 1.04, w: colW - 0.4, h: 0.70,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addText("In the text", {
      x: col2X + 0.2, y: crdY + 1.80, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("\u201CI was flying past the stars on silver wings.\u201D", {
      x: col2X + 0.2, y: crdY + 2.06, w: colW - 0.4, h: 0.70,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_VOCAB);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 5: READING LAUNCH — Chapter 15 setup
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PLUM);
    addBadge(s, "Read Aloud", { color: C.PLUM });
    addTitle(s, "Chapter 15: The Second Miracle");

    const crdH = SAFE_BOTTOM - CONTENT_TOP;
    addCard(s, 0.5, CONTENT_TOP, 5.4, crdH, { strip: C.PLUM, fill: C.WHITE });

    // Reading info
    s.addText("Pages 251\u2013261", {
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
    s.addText("The chapter is called \u2018The Second Miracle.\u2019 The first miracle was the glass tipping over. What do you predict the second miracle will be?", {
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
      "Matilda confides in Miss Honey",
      "She demonstrates her power deliberately",
      "Miss Honey believes and supports her",
      "They agree to talk more at Miss Honey\u2019s cottage",
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
  // SLIDES 6-7: PAUSE POINT 1 — p.256 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 1", "Chapter 15 \u2014 p. 256",
      "\u2018Could you do it again?\u2019 she asked, not unkindly.",
      "p. 256",
      "What is going on here? Who is speaking, and what are they really asking?",
      NOTES_PAUSE1, FOOTER
    ),
    (slide) => {
      // Answer covers the question area (question is on the previous slide)
      const ansY = 3.62;
      slide.addShape("roundRect", {
        x: 0.57, y: ansY, w: 8.86, h: 1.38, rectRadius: 0.08,
        fill: { color: C.HONEY },
      });
      slide.addText("Answer", {
        x: 0.75, y: ansY + 0.08, w: 3, h: 0.26,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
      });
      slide.addText("Miss Honey is asking Matilda to repeat the miracle. \u2018Not unkindly\u2019 shows she is gentle and cautious \u2014 not dismissive. The dialogue tag reveals her character.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 8-9: PAUSE POINT 2 — p.259 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 2", "Chapter 15 \u2014 p. 259",
      "\u2026not twelve inches from Miss Honey\u2019s folded arms.",
      "p. 259",
      "What just happened? Write ONE word on your whiteboard to describe how Miss Honey feels.",
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
      slide.addText("Matilda deliberately tipped the glass over \u2014 right in front of Miss Honey. She is awestruck: shocked, amazed, stunned. This is the moment Miss Honey truly believes.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 10: LITERARY DEVICES — Onomatopoeia & Metaphor (p.260)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PLUM);
    addBadge(s, "I Do", { color: C.PLUM });
    addTitle(s, "Figurative Language in Chapter 15");

    // Onomatopoeia card
    const c1Y = CONTENT_TOP;
    const c1H = 1.7;
    addCard(s, 0.5, c1Y, 9, c1H, { strip: C.CORAL, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.72, y: c1Y + 0.14, w: 2.3, h: 0.38, rectRadius: 0.08,
      fill: { color: C.CORAL },
    });
    s.addText("Onomatopoeia", {
      x: 0.72, y: c1Y + 0.14, w: 2.3, h: 0.38,
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("A word that sounds like the thing it describes", {
      x: 3.2, y: c1Y + 0.16, w: 6.0, h: 0.36,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    // Quote
    s.addText("\u201C", {
      x: 0.65, y: c1Y + 0.60, w: 0.4, h: 0.5,
      fontSize: 36, fontFace: FONT_H, color: C.HONEY, margin: 0,
    });
    s.addText("\u2026click went her face\u2026", {
      x: 1.0, y: c1Y + 0.72, w: 7.6, h: 0.45,
      fontSize: 20, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });
    s.addText("p. 260", {
      x: 8.3, y: c1Y + 1.30, w: 1.0, h: 0.22,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, align: "right", margin: 0,
    });

    // Metaphor card
    const c2Y = c1Y + c1H + 0.15;
    const c2H = SAFE_BOTTOM - c2Y;
    addCard(s, 0.5, c2Y, 9, c2H, { strip: C.PLUM, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.72, y: c2Y + 0.14, w: 1.6, h: 0.38, rectRadius: 0.08,
      fill: { color: C.PLUM },
    });
    s.addText("Metaphor", {
      x: 0.72, y: c2Y + 0.14, w: 1.6, h: 0.38,
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Saying something IS something else (no \u2018like\u2019 or \u2018as\u2019)", {
      x: 2.5, y: c2Y + 0.16, w: 6.8, h: 0.36,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    s.addText("\u201C", {
      x: 0.65, y: c2Y + 0.60, w: 0.4, h: 0.5,
      fontSize: 36, fontFace: FONT_H, color: C.HONEY, margin: 0,
    });
    s.addText("I was flying past the stars on silver wings.", {
      x: 1.0, y: c2Y + 0.72, w: 7.6, h: 0.45,
      fontSize: 20, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });
    s.addText("p. 260", {
      x: 8.3, y: c2Y + c2H - 0.36, w: 1.0, h: 0.22,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, align: "right", margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_LIT_DEVICES);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 11-12: PAUSE POINT 3 — p.261 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 3", "Chapter 15 \u2014 p. 261",
      "\u2018I wouldn\u2019t dream of it,\u2019 Miss Honey said.",
      "p. 261",
      "Given what we already know about Miss Honey, what do you think she is planning now?",
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
      slide.addText("Miss Honey wants to help Matilda. \u2018I wouldn\u2019t dream of it\u2019 shows she would never betray Matilda\u2019s trust \u2014 this is what confiding in the right person looks like.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 13: TOPIC SENTENCES — I DO (Modelling with Example 1)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PLUM);
    addBadge(s, "I Do \u2014 Watch Me", { color: C.PLUM, w: 2.2 });
    addTitle(s, "Topic Sentences & Supporting Details");

    // Concept cards — left column
    // TS definition
    addCard(s, 0.5, CONTENT_TOP, 4.3, 1.1, { fill: C.PLUM });
    s.addText("Topic Sentence", {
      x: 0.68, y: CONTENT_TOP + 0.10, w: 3.9, h: 0.30,
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
    });
    s.addText("The MAIN IDEA of a paragraph.\nTells the reader what the paragraph is about.", {
      x: 0.68, y: CONTENT_TOP + 0.42, w: 3.9, h: 0.58,
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, margin: 0,
    });

    // SD definition
    addCard(s, 0.5, CONTENT_TOP + 1.22, 4.3, 1.1, { fill: C.TEAL });
    s.addText("Supporting Details", {
      x: 0.68, y: CONTENT_TOP + 1.32, w: 3.9, h: 0.30,
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
    });
    s.addText("Give MORE INFORMATION about the topic sentence.\nExplain, prove, or give examples.", {
      x: 0.68, y: CONTENT_TOP + 1.64, w: 3.9, h: 0.58,
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, margin: 0,
    });

    // Right column — Example 1 (pre-labelled)
    const exX = 5.0, exW = 4.5;
    addCard(s, exX, CONTENT_TOP, exW, SAFE_BOTTOM - CONTENT_TOP, { strip: C.HONEY, fill: C.PARCHMENT });
    s.addText("Example", {
      x: exX + 0.2, y: CONTENT_TOP + 0.08, w: 3, h: 0.26,
      fontSize: 11, fontFace: FONT_B, color: C.PLUM, bold: true, margin: 0,
    });

    // TS example with label
    s.addShape("roundRect", {
      x: exX + 0.15, y: CONTENT_TOP + 0.42, w: exW - 0.3, h: 0.95, rectRadius: 0.08,
      fill: { color: C.WHITE }, shadow: makeCardShadow(),
    });
    s.addShape("roundRect", {
      x: exX + 0.25, y: CONTENT_TOP + 0.50, w: 1.8, h: 0.28, rectRadius: 0.06,
      fill: { color: C.PLUM },
    });
    s.addText("Topic Sentence", {
      x: exX + 0.25, y: CONTENT_TOP + 0.50, w: 1.8, h: 0.28,
      fontSize: 9, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Matilda convinced Miss Honey she can control objects with her mind.", {
      x: exX + 0.25, y: CONTENT_TOP + 0.82, w: exW - 0.5, h: 0.48,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    // SD 1
    const sd1Y = CONTENT_TOP + 1.50;
    s.addShape("roundRect", {
      x: exX + 0.15, y: sd1Y, w: exW - 0.3, h: 0.80, rectRadius: 0.08,
      fill: { color: C.WHITE }, shadow: makeCardShadow(),
    });
    s.addShape("roundRect", {
      x: exX + 0.25, y: sd1Y + 0.08, w: 2.0, h: 0.26, rectRadius: 0.06,
      fill: { color: C.TEAL },
    });
    s.addText("Supporting Detail", {
      x: exX + 0.25, y: sd1Y + 0.08, w: 2.0, h: 0.26,
      fontSize: 9, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("She told Miss Honey she tipped the Trunchbull\u2019s glass over.", {
      x: exX + 0.25, y: sd1Y + 0.38, w: exW - 0.5, h: 0.36,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    // SD 2
    const sd2Y = sd1Y + 0.92;
    s.addShape("roundRect", {
      x: exX + 0.15, y: sd2Y, w: exW - 0.3, h: 0.80, rectRadius: 0.08,
      fill: { color: C.WHITE }, shadow: makeCardShadow(),
    });
    s.addShape("roundRect", {
      x: exX + 0.25, y: sd2Y + 0.08, w: 2.0, h: 0.26, rectRadius: 0.06,
      fill: { color: C.TEAL },
    });
    s.addText("Supporting Detail", {
      x: exX + 0.25, y: sd2Y + 0.08, w: 2.0, h: 0.26,
      fontSize: 9, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("She proved it by repeating the miracle again.", {
      x: exX + 0.25, y: sd2Y + 0.38, w: exW - 0.5, h: 0.36,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_TS_IDO);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 14-15: TOPIC SENTENCES — WE DO (Example 2, withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  // Scrambled: SD, TS, SD → TS is at index 1
  buildSortSlide(pres, [
    "She focussed on the glass intently.",
    "Matilda tipped the glass over by staring at it.",
    "She shouted the words \u2018Tip, glass, tip!\u2019 inside her head.",
  ], 1, NOTES_TS_WEDO2);

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 16-17: TOPIC SENTENCES — WE DO (Example 3, withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  // Scrambled: SD, SD, TS → TS is at index 2
  buildSortSlide(pres, [
    "At first, she thought Matilda was making it up.",
    "She was speechless when she saw the glass fall over.",
    "Miss Honey was amazed by Matilda\u2019s miracle.",
  ], 2, NOTES_TS_WEDO3);

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 18: TOPIC SENTENCES — YOU DO (Independent Practice)
  // ═══════════════════════════════════════════════════════════════════════════
  taskSlide(
    pres,
    "You Do", "Your Turn: Topic Sentences",
    [
      { label: "First",  instruction: "Think of ONE big idea from Chapter 15." },
      { label: "Next",   instruction: "Write a topic sentence \u2014 one sentence that captures the main idea. Label it TS." },
      { label: "Then",   instruction: "Write TWO supporting details that give more information about your topic sentence. Label them SD." },
    ],
    NOTES_TS_YOUDO,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 19: CLOSING
  // ═══════════════════════════════════════════════════════════════════════════
  closingSlide(
    pres,
    "Why did Matilda choose to confide in Miss Honey \u2014 and what does that tell us about the kind of person you should confide in?",
    [
      "We read Chapter 15 and explored Matilda\u2019s second miracle",
      "We learned two vocabulary words: confide and vivid",
      "We identified onomatopoeia and metaphor in Dahl\u2019s writing",
      "We can now distinguish topic sentences from supporting details",
    ],
    NOTES_CLOSING
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // WRITE FILE
  // ═══════════════════════════════════════════════════════════════════════════
  await pres.writeFile({ fileName: OUT_DIR + "/Matilda_Lesson21_The_Second_Miracle.pptx" });
  console.log("\u2713 Written to " + OUT_DIR + "/Matilda_Lesson21_The_Second_Miracle.pptx");
})();
