// Matilda — Lesson 23: Miss Honey's Story (Chapter 17)
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

const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addBodyText, addWriteLine, addTipBox, addPdfFooter,
  addLinedArea, addResourceSlide,
} = require("../themes/pdf_helpers");

const OUT_DIR = "output/Matilda_Lesson23_Miss_Honeys_Story";
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const FOOTER = "Matilda  |  Lesson 23 of 25  |  Week 5  |  Year 3/4 Literacy";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `SAY:
\u2022 "Today we are reading Chapter 17 \u2014 Miss Honey\u2019s Story. This is one of the most emotional chapters in the whole book. Miss Honey finally tells Matilda the truth about her life."
\u2022 "We will read together, stop at three key moments, explore a powerful metaphor Roald Dahl uses, and then practise improving our topic sentences by using different sentence types."

DO:
\u2022 Display this slide as students settle. Allow 15 seconds for students to read the title and subtitle.
\u2022 Do not reveal any plot details \u2014 the shocking twist at the end of this chapter must be experienced by students in real time.

TEACHER NOTES:
PACING NOTE: This is a content-heavy session with sensitive material. Suggested timing: Title/LI/Review (5 min), Vocabulary (3 min), Reading with pause points (18 min), Literary device (2 min), Improving Topic Sentences I Do + We Do + You Do (18 min), Resources + Closing (4 min) = ~50 min. If running behind after reading, abbreviate Pause Point 3 discussion to a 30-second partner exchange and move directly to the metaphor. The Improving Topic Sentences segment is the priority new learning \u2014 protect this time. If students are emotionally affected by the chapter content, allow 60 seconds of quiet processing before moving to the writing task.

Chapter 17 is a pivotal chapter: Miss Honey reveals her entire backstory in response to Matilda\u2019s direct questioning about her poverty. The chapter builds tension through a series of revelations \u2014 dead mother, dead father, cruel aunt \u2014 culminating in the devastating reveal that the aunt is Miss Trunchbull. This is the moment the two storylines (Matilda vs Trunchbull, Miss Honey vs Trunchbull) converge. Students need to process this emotionally and analytically.

SENSITIVITY: This chapter discusses the death of parents and briefly references the possibility of suicide (p.296). The reading launch slide includes a sensitivity advisory. Read this to students calmly and matter-of-factly before beginning. Do not overdramatise. If a student becomes upset, allow them to step outside with a buddy. Have your school\u2019s wellbeing referral process ready.

WATCH FOR:
\u2022 Students who cannot recall what happened in Chapter 16 \u2014 they will struggle with today\u2019s reading. Use the review slide to identify and address this.
\u2022 Students who seem anxious after hearing the sensitivity advisory \u2014 reassure quietly: "If you need a moment at any time, just raise your hand."

[General: Title \u2014 VTLM 2.0: Establishing Purpose and Relevance]`;

const NOTES_LI = `SAY:
\u2022 Read from slide: "Here are our learning intentions for today."
\u2022 Point to each LI briefly: "We are reading and understanding the text, learning new vocabulary, spotting figurative language, noticing how dialogue reveals character, and learning to improve our topic sentences using different sentence types."
\u2022 Point to the success criteria: "By the end of the lesson, these are the things you will be able to do. We will come back to these at the end."

DO:
\u2022 Read each LI aloud. Do not elaborate \u2014 keep this brisk (90 seconds max).
\u2022 Point to each SC as you read it. Ask students to give a thumbs up for any SC they already feel confident about.
\u2022 Leave visible for 20 seconds for silent re-reading.

TEACHER NOTES:
Five learning intentions keeps the cognitive load manageable. The slide groups them so students see the lesson arc: reading \u2192 vocabulary \u2192 figurative language \u2192 dialogue \u2192 writing. The success criteria are deliberately fewer (5) and student-friendly, mapped to observable outcomes. The writing SCs (rewrite a flat TS using a different sentence type, choose the strongest version) are the priority new learning. The reading and vocabulary LIs are consolidated practice from prior lessons. VTLM 2.0: Making Learning Visible / Clear Learning Intentions.

WATCH FOR:
\u2022 Students who give thumbs up on every SC \u2014 probe: "Tell me what a \u2018sentence type\u2019 is in your own words." Students learned statement/question/command/exclamation earlier in the year but may not connect it to topic sentences.
\u2022 Students who seem overwhelmed by the LIs \u2014 reassure: "Most of this builds on what we already know. The new part today is improving topic sentences."

[General: LI/SC \u2014 VTLM 2.0: Making Learning Visible / Clear Learning Intentions]`;

const NOTES_REVIEW = `SAY:
\u2022 "Before we start Chapter 17, let\u2019s make sure we remember what happened in Chapter 16 \u2014 Miss Honey\u2019s Cottage."
\u2022 Ask: "Where did Matilda and Miss Honey go at the end of Chapter 16?" [They went to Miss Honey\u2019s cottage for tea.]
\u2022 Ask: "What was surprising about Miss Honey\u2019s cottage?" [It was tiny, bare, and extremely poor. She had almost no furniture, no running water, and slept on a camp bed.]
\u2022 Ask: "What did Matilda notice that made her worried about Miss Honey?" [Matilda noticed the poverty and asked Miss Honey why she lived like this \u2014 she sensed something was wrong.]
\u2022 "Good. So at the end of Chapter 16, Matilda is in Miss Honey\u2019s cottage and she has started asking questions. Chapter 17 is where Miss Honey gives the answers."

DO:
\u2022 Use Cold Call \u2014 do not accept hands up. Call on three different students for the three questions.
\u2022 If students struggle with the first question, rephrase: "After school, where did Miss Honey take Matilda?"
\u2022 Keep this to 2 minutes maximum. This is activation, not reteaching.

CFU CHECKPOINT:
Technique: Cold Call

Script:
\u2022 Cold call a student: "Without looking at your book, tell me \u2014 where did Matilda and Miss Honey go at the end of Chapter 16?"
\u2022 If correct, cold call a second student: "What was surprising about Miss Honey\u2019s home?"
\u2022 If the first student is incorrect or vague, redirect: "Who can help? Where did they go after school?" \u2014 cold call a second student.
\u2022 Scan for: Students who recall the cottage visit and its shocking poverty.

PROCEED (if \u226580% recall the cottage visit):
Move to vocabulary. Students have sufficient recall to engage with Chapter 17.

PIVOT (if <80% can recall the visit):
Most likely issue: Students have forgotten the detail of Chapter 16 or are confusing it with the chapter where Matilda visits Miss Honey\u2019s classroom after hours.
Reteach: "Let me remind you. In Chapter 16, Miss Honey invited Matilda to her cottage for tea. When Matilda arrived, she was shocked. The cottage was tiny \u2014 one room, no proper furniture, an upside-down box for a table. Miss Honey was living in extreme poverty. Matilda was brave enough to ASK why. And that is where Chapter 17 begins \u2014 with Miss Honey\u2019s answer."
Re-check: "Now \u2014 what made Matilda worried about Miss Honey?" Cold call a different student. If correct, proceed. If still unclear, briefly summarise and move on.

TEACHER NOTES:
Activating prior knowledge before reading is a non-negotiable comprehension strategy (VTLM 2.0: Retention and Recall). Chapter 17 only makes sense if students remember the cottage visit from Chapter 16 \u2014 without this context, Miss Honey\u2019s decision to share her story lacks a trigger. The three questions scaffold recall: WHERE they went \u2192 WHAT was surprising \u2192 WHY Matilda was worried. This mirrors the emotional escalation of Chapter 17.

WATCH FOR:
\u2022 Students who say "Miss Honey is rich" or confuse the cottage with the school \u2014 correct immediately: "Miss Honey\u2019s cottage was very poor. She had almost nothing."
\u2022 Readiness signal: Students can articulate that Matilda visited the cottage, was shocked by the poverty, and started asking questions.

[General: Review/Activation of Prior Knowledge \u2014 VTLM 2.0: Retention and Recall]`;

const NOTES_VOCAB = `SAY:
\u2022 "Before we read, we need to know two important words that appear in this chapter."
\u2022 Point to "petrified": "Read this word with me: PET-ri-fied." [Students repeat.] "Petrified means so frightened that you are unable to move or think. You are frozen with fear."
\u2022 "In Chapter 17, we learn that Miss Honey was petrified of someone in her childhood. As we read, listen for what made her so afraid."
\u2022 Point to "insist": "Read this word with me: in-SIST." [Students repeat.] "Insist means to demand something firmly and not accept any refusal. If someone insists, you feel you have no choice."
\u2022 "In this chapter, someone insists on taking something from Miss Honey. Listen for what they demand and why Miss Honey cannot say no."

DO:
\u2022 Point to each word card as you teach it. Students repeat the word aloud (choral response).
\u2022 Spend no more than 90 seconds per word. This is rapid explicit teaching \u2014 depth comes during reading.
\u2022 Do NOT ask students to write definitions yet. They will encounter these words in context during reading.

TEACHER NOTES:
Two explicit vocabulary words is the right load for a content-heavy lesson. "Petrified" is essential for comprehension \u2014 it captures Miss Honey\u2019s emotional state throughout her childhood and explains why she could not escape the Trunchbull\u2019s control. "Insist" is a power word \u2014 it describes the mechanism of the aunt\u2019s control (insisting on Miss Honey\u2019s salary). Both words connect to the theme of power imbalance. The incidental vocabulary (wretched, ghastly, guardian, surrender, wages, dominated) will be addressed in context during reading \u2014 do not pre-teach these. VTLM 2.0: Explicit Explanation. DECIDE Framework: D (Define the vocabulary component).

MISCONCEPTIONS:
\u2022 Misconception: "Petrified" means the same as "scared" or "nervous."
  Why: Students overgeneralise \u2014 all fear words seem equivalent. They miss the intensity.
  Impact: If students think "petrified" just means "a bit scared," they underestimate the severity of Miss Honey\u2019s situation and the Trunchbull\u2019s cruelty.
  Quick correction: "Scared is when you hear a loud noise and jump. Petrified is when you are SO frightened that you CANNOT MOVE. Your body freezes. That is the level of fear Miss Honey lived with every day."

\u2022 Misconception: "Insist" is the same as "ask."
  Why: Students hear both as requests and do not distinguish politeness from force.
  Impact: If students think the aunt just "asked" for Miss Honey\u2019s money, they miss the coercion and injustice.
  Quick correction: "If I ask you to tidy up, you could say no. If I INSIST, I am not giving you a choice. The aunt did not ask \u2014 she insisted. There was no room for Miss Honey to refuse."

WATCH FOR:
\u2022 Students who cannot repeat "petrified" correctly (mispronouncing as "PETTY-fied" or "petra-fied") \u2014 model again: "PET-ri-fied. Three syllables."
\u2022 Students who mix up "insist" with "assist" (help) \u2014 brief correction: "Insist is to DEMAND. Assist is to HELP. Very different words."
\u2022 Readiness signal: Students can say both words clearly and nod when you give a quick-check: "Thumbs up if petrified means being SO scared you cannot move."

[General: Explicit Instruction (I Do) \u2014 Vocabulary \u2014 VTLM 2.0: Explicit Explanation]`;

const NOTES_READING_LAUNCH = `SAY:
\u2022 "Open your books to page 288. We are reading Chapter 17: Miss Honey\u2019s Story."
\u2022 Read the sensitivity advisory calmly: "Before we start, I want to let you know that this chapter talks about the death of Miss Honey\u2019s parents. Some of you might find this content upsetting. That is completely normal. If you need a moment at any time, just raise your hand quietly and I will help you."
\u2022 "Today is student read aloud. I will select readers as we go. Everyone follows along \u2014 fingers on the text."
\u2022 "We will stop THREE times during the reading at key moments. When we stop, I will ask you a question. Your job is to think carefully before you answer."
\u2022 "This chapter is called \u2018Miss Honey\u2019s Story.\u2019 She has been keeping a secret about her past. What do you predict she might reveal?"

DO:
\u2022 Ensure all students have books open to page 288. Scan for students who need page help.
\u2022 Read the sensitivity advisory in a calm, matter-of-fact tone. Do not overdramatise. Do not dwell \u2014 state it clearly and move on.
\u2022 If any student looks distressed, make quiet eye contact and give a reassuring nod. Have your school wellbeing referral process ready.
\u2022 Remind students of read aloud expectations: "Eyes on text, follow along silently, be ready to read when called."
\u2022 Select your first reader. Aim for confident, expressive readers \u2014 this chapter carries emotional weight.
\u2022 Keep reading pace measured but not slow. Allow expression on emotional passages.

TEACHER NOTES:
Student read aloud for this chapter serves two purposes: (1) it keeps engagement high in an emotionally heavy chapter, and (2) it lets the teacher monitor both fluency and emotional responses in real time. The three pause points are strategically placed: p.293 (Miss Honey begins her story), p.300 (the story concludes \u2014 full backstory revealed), and p.308 (the devastating reveal that the aunt is Miss Trunchbull). The reading section should take no more than 18 minutes including pause points. If pacing is tight, call on fluent readers and keep transitions between readers to under 5 seconds.

SENSITIVITY: The reference to Miss Honey\u2019s father\u2019s death (p.296) includes the line "They said he killed himself" \u2014 this is brief but potentially distressing. Read past it at normal pace. If a student asks about it afterward, respond simply: "Sometimes when people are very unhappy, very sad things happen. If this makes you feel worried, we can talk about it privately." Do not elaborate during class time. Follow your school\u2019s critical incident / wellbeing referral protocol if needed.

VTLM 2.0: Scaffold Practice (shared reading with monitoring).

WATCH FOR:
\u2022 Students not following along (eyes off text, no finger tracking) \u2014 a quick "All eyes on line 3" redirects without disrupting the reader.
\u2022 Students who become visibly upset during the death passages \u2014 approach quietly, offer to step outside briefly with a buddy. Do not draw class attention to them.
\u2022 Readers who struggle with incidental vocabulary (wretched, ghastly, dominated) \u2014 supply the word quickly and move on.
\u2022 Readiness signal: All students tracking the text, reader maintaining reasonable pace.

[General: Guided Practice (We Do \u2014 Shared Reading) \u2014 VTLM 2.0: Scaffold Practice]`;

const NOTES_PAUSE1 = `SAY:
\u2022 "Stop reading here. Look at this line: \u2018May I tell you a story?\u2019"
\u2022 Ask: "What is going on in this moment? Why is Miss Honey asking permission to tell a story?" [Miss Honey is about to share her personal history. She is asking permission because it is private and painful.]
\u2022 "Think about this with your partner: WHY does Miss Honey frame this as a \u2018story\u2019? Why not just say \u2018Let me tell you about my childhood\u2019?" [Allow 60 seconds pair discussion.]
\u2022 After pairs share: "Calling it a \u2018story\u2019 creates distance \u2014 it makes the painful memories feel less personal, almost like it happened to someone else. This is a protective mechanism. It also makes Matilda (and us) lean in \u2014 everyone wants to hear a story."

DO:
\u2022 Pause the reader at p.293 after this line.
\u2022 Display the slide. Allow 10 seconds for students to re-read the quote on screen.
\u2022 Run Think-Pair-Share: 30 seconds silent thinking, 60 seconds pair discussion, then cold call 2 pairs.
\u2022 Click to next slide to reveal the discussion points after students have responded.

CFU CHECKPOINT:
Technique: Think-Pair-Share

Script:
\u2022 "Think silently for 30 seconds: what is happening in this moment, and why does Miss Honey call it a \u2018story\u2019?"
\u2022 "Now turn to your partner and share. You have 60 seconds."
\u2022 Cold call 2 pairs: "What did you and your partner discuss?"
\u2022 Scan for: Students who identify (a) Miss Honey is about to share something personal, and (b) calling it a \u2018story\u2019 is a way of creating emotional distance.

PROCEED (if \u226580% identify that Miss Honey is sharing something private):
Continue reading to p.300. Students are tracking the narrative and emotional undercurrents.

PIVOT (if <80% can identify what is happening):
Most likely issue: Students are reading literally and not inferring \u2014 they think Miss Honey is literally going to tell a fairy tale or made-up story.
Reteach: "Miss Honey is not making up a story. She is about to tell Matilda about her REAL LIFE. But she says \u2018May I tell you a story?\u2019 because it is easier to talk about painful things if you frame them as a story. It creates distance. Think of when someone says \u2018I have a friend who...\u2019 \u2014 sometimes the \u2018friend\u2019 is actually them. Miss Honey is doing something similar."
Re-check: "What is Miss Honey REALLY about to tell Matilda?" Cold call. [About her own life / her childhood / why she is so poor.]

TEACHER NOTES:
This pause point addresses the LI on dialogue: "Identify how authors use dialogue to convey what characters say and think." The phrasing "May I tell you a story?" is deliberately understated \u2014 it signals vulnerability, politeness, and the weight of what is to come. The framing-as-story technique is a sophisticated narrative device that Year 3/4 students can grasp intuitively even if they cannot name it. VTLM 2.0: Monitor Progress (comprehension check during reading).

WATCH FOR:
\u2022 Students who think Miss Honey is going to read a book or tell a fictional story \u2014 redirect: "This is HER story. Her real life."
\u2022 Students who focus on the word "may" and discuss politeness \u2014 this is valid but secondary. Acknowledge it and steer toward the deeper question: "Yes, she is being polite. But WHY is she asking permission? What is she about to share?"
\u2022 Readiness signal: Students understand that Miss Honey is about to reveal something personal and painful.

[General: Guided Practice (We Do \u2014 Pause Point) \u2014 VTLM 2.0: Monitor Progress]`;

const NOTES_PAUSE2 = `SAY:
\u2022 "Stop here. Miss Honey has just finished telling her story. Read this line: \u2018That\u2019s the sad story of my life. Now I\u2019ve talked enough.\u2019"
\u2022 Ask: "What does the author want us to know about Miss Honey and her aunt?" [Miss Honey was mistreated by her aunt. Her mother died when she was 2, her father died when she was 5, and the aunt was cruel \u2014 she took Miss Honey\u2019s wages and controlled her life.]
\u2022 "On your whiteboards, write TWO things Miss Honey\u2019s aunt did that were cruel." [Allow 30 seconds.] "Hold them up."
\u2022 Expected responses: took her money / made her a slave / did not love her / took her house / hit her / was violent / made her surrender her wages / made her live in the cottage.
\u2022 "I can see excellent responses. Miss Honey\u2019s aunt was not just unkind \u2014 she was controlling and cruel. She used her power over a child who had no one else."

DO:
\u2022 Pause the reader at p.300.
\u2022 Display the slide. Distribute whiteboards if not already out.
\u2022 Give students 30 seconds to write their two responses. Say: "Two things. Hold up on my signal."
\u2022 Scan whiteboards quickly \u2014 note the range and accuracy of responses.
\u2022 Click to next slide to reveal the answer/discussion after the whiteboard check.

CFU CHECKPOINT:
Technique: Show Me Boards

Script:
\u2022 "On your whiteboard, write TWO cruel things Miss Honey\u2019s aunt did. You have 30 seconds."
\u2022 "3, 2, 1 \u2014 boards up."
\u2022 Scan for: Two specific actions from the text (not vague responses like "was mean"). Accept any reasonable actions: took wages, took house, made her a servant, denied her love, was violent.
\u2022 "I can see you\u2019ve identified some terrible things. This aunt was a bully with total power over Miss Honey."

PROCEED (if \u226580% identify two specific cruel actions):
Continue reading to p.308 for the big reveal.

PIVOT (if <80% can identify two specific actions):
Most likely issue: Students recall that the aunt was "bad" but cannot specify actions \u2014 they processed the emotion but not the detail.
Reteach: "Let me help you. Miss Honey\u2019s aunt did three main things: ONE \u2014 she made Miss Honey work as her servant from age 5. TWO \u2014 when Miss Honey grew up and became a teacher, the aunt INSISTED that she hand over ALL her wages. THREE \u2014 when Miss Honey\u2019s father died, the aunt took the house and everything in it. Miss Honey was left with nothing."
Re-check: "Write ONE of those three things on your board. Boards up." Scan for accuracy.

TEACHER NOTES:
This pause point serves as a comprehension consolidation moment after a dense, emotional reading passage. The backstory spans several pages and includes multiple revelations (mother\u2019s death, father\u2019s death, aunt\u2019s cruelty, wage theft, housing theft). Show Me Boards are used because they require every student to commit to a response, allowing the teacher to identify who absorbed the key details and who processed only the emotional tone. The question deliberately asks for TWO things to check depth of recall, not just surface-level understanding. VTLM 2.0: Monitor Progress.

WATCH FOR:
\u2022 Students who write vague responses like "was mean" or "was bad" \u2014 push for specificity: "HOW was she mean? What did she actually DO?"
\u2022 Students who are emotionally affected and find it hard to write \u2014 gently acknowledge: "I know this is a sad part. Take a breath, then write what you remember."
\u2022 Students who write about the father\u2019s death as something the aunt "did" \u2014 this is nuanced. The text implies the aunt may have been involved but does not confirm it. Accept it if raised, but do not teach it as fact: "That is an interesting inference. The text says the police thought it was suicide, but Matilda and Miss Honey wonder about that."
\u2022 Readiness signal: Boards show specific actions (took wages, took house, made her serve) across \u226580% of students.

[General: Guided Practice (We Do \u2014 Pause Point) \u2014 VTLM 2.0: Monitor Progress]`;

const NOTES_PAUSE3 = `SAY:
\u2022 "We have reached the final line of the chapter. Listen carefully." Read aloud: "\u2018Then she said softly, \u201CMiss Trunchbull.\u201D\u2019"
\u2022 Allow a dramatic pause. Let the revelation sink in.
\u2022 "The aunt \u2014 the cruel, controlling, terrifying aunt who ruined Miss Honey\u2019s life \u2014 is Miss Trunchbull. The head of their school."
\u2022 "Now that we know this, I want you to think about what happens next. Show me with your fingers."
\u2022 Read the four options from the slide. "Hold up 1, 2, 3, or 4 on my count."

DO:
\u2022 Read the final line aloud yourself \u2014 do not have a student read it. Use a soft, dramatic tone.
\u2022 Pause for 5 seconds of silence after reading. Let the room react naturally.
\u2022 Display the slide with the four prediction options.
\u2022 Run Finger Voting: 1 = Run away, 2 = Tell the police, 3 = Use her power, 4 = Do nothing.
\u2022 Count: "3, 2, 1 \u2014 show me your fingers."
\u2022 Scan the room. Most students will likely choose 3.
\u2022 Click to next slide to reveal the discussion.

CFU CHECKPOINT:
Technique: Finger Voting

Script:
\u2022 "Now that we know the aunt is Miss Trunchbull, what do you PREDICT Matilda will do? Listen to the options."
\u2022 "1 finger: Run away from the Trunchbull. 2 fingers: Tell the police about the Trunchbull. 3 fingers: Use her telekinetic power to help Miss Honey. 4 fingers: Do nothing."
\u2022 "3, 2, 1 \u2014 show me."
\u2022 Scan for: Distribution of responses. Most should cluster around option 3 based on character knowledge.
\u2022 "Interesting. I can see most of you chose option 3. Let me ask \u2014 WHY? What do we know about Matilda that makes this likely?"

PROCEED (if \u226580% choose option 3 and can give character-based reasoning):
Close the reading section. Move to the metaphor and then improving topic sentences.

PIVOT (if responses are scattered or students cannot justify their choice):
Most likely issue: Students are reacting emotionally (angry at the Trunchbull, scared for Miss Honey) rather than using character knowledge to predict logically.
Reteach: "Let\u2019s think about what we KNOW about Matilda. She is brave \u2014 she stood up to the Trunchbull before. She is clever \u2014 she finds creative solutions. And she has a POWER that nobody else has. Now she knows that her favourite teacher is being bullied by the Trunchbull. What would a brave, clever person with a special power do?"
Re-check: "Vote again \u2014 fingers up." Scan for convergence on option 3.

TEACHER NOTES:
This is the dramatic climax of the chapter and arguably the most important moment in the novel\u2019s plot structure. The reveal that the aunt is Miss Trunchbull connects the two parallel storylines: Matilda\u2019s battle with the Trunchbull at school, and Miss Honey\u2019s lifelong oppression by her aunt. The hinge question (prediction) tests whether students can use accumulated character knowledge to predict narrative direction \u2014 a higher-order comprehension skill (VC2E4LY05: inferring and predicting). Finger Voting is used because it is fast, non-threatening, and gives the teacher instant data on the whole class. VTLM 2.0: Monitor Progress.

MISCONCEPTIONS:
\u2022 Misconception: "Matilda should tell the police because that is what you should do."
  Why: Students apply real-world logic to a fictional narrative. In the real world, telling authorities is correct. In Dahl\u2019s world, children solve problems that adults cannot.
  Impact: Low \u2014 this is not a misconception per se, but a different narrative expectation. Acknowledge it: "In real life, absolutely \u2014 you should always tell a trusted adult. In Roald Dahl\u2019s stories, children often have to be the heroes. What has Matilda got that no police officer has?"
\u2022 Misconception: Students think the Trunchbull is a different aunt, not the headteacher they already know.
  Why: Some students may not connect "the aunt" to "Miss Trunchbull" immediately.
  Impact: High \u2014 the entire dramatic impact depends on this connection.
  Quick correction: "The aunt who was cruel to Miss Honey IS Miss Trunchbull \u2014 the same Miss Trunchbull who is the headteacher of Matilda\u2019s school. The same one who throws children. They are the SAME person."

WATCH FOR:
\u2022 Students who gasp, laugh, or exclaim at the reveal \u2014 this is a healthy emotional response. Allow it briefly, then channel it into the prediction task.
\u2022 Students who look confused at the reveal \u2014 they may not have tracked the aunt\u2019s identity across the chapter. Check: "Do you understand who the aunt is? She is the headteacher."
\u2022 Readiness signal: Students connect the aunt to Miss Trunchbull and can articulate why Matilda is likely to take action.

[General: Guided Practice (We Do \u2014 Pause Point / Hinge Question) \u2014 VTLM 2.0: Monitor Progress]`;

const NOTES_METAPHOR = `SAY:
\u2022 "Before we move on, look at one incredible sentence from early in this chapter, on page 290."
\u2022 Read aloud: "\u2018The atmosphere in the room had changed completely and now it was vibrating with awkwardness and secrets.\u2019"
\u2022 "Can an atmosphere literally vibrate? No. This is a metaphor \u2014 Dahl is saying the atmosphere IS vibrating, as if you could feel the tension in the air like a physical force."
\u2022 "Why does Dahl use this metaphor here? What is about to happen?" [Miss Honey is about to share her secret. The room feels tense because both characters know something important is about to be said. The metaphor makes us FEEL the tension.]
\u2022 "Notice the word \u2018secrets\u2019 \u2014 plural. Both Matilda and Miss Honey have secrets at this point. The atmosphere is heavy with unspoken truths."

DO:
\u2022 Display the slide with the quote visible.
\u2022 Read the quote aloud with expression \u2014 slow down on "vibrating" to emphasise the physical sensation.
\u2022 Keep this to 2 minutes maximum. Name the device, connect to the text, connect to what students already know about metaphor from Lesson 21.
\u2022 Do not run a full CFU here \u2014 this is brief I Do reinforcement of a previously taught concept.

TEACHER NOTES:
This metaphor reinforces the concept taught in Lesson 21 (where students learned metaphor vs simile through Dahl\u2019s "flying past the stars on silver wings"). The progression is intentional: in Lesson 21 the metaphor described an internal experience (Matilda\u2019s feeling); here it describes an external atmosphere (the room itself). This broadens students\u2019 understanding of what metaphor can do. The word "vibrating" is kinaesthetic \u2014 it appeals to touch/feeling, which makes it vivid (connecting to the vocabulary word from Lesson 21). DECIDE Framework: E (Execute through brief reinforcement). VTLM 2.0: Explicit Explanation.

WATCH FOR:
\u2022 Students who say "that is a simile" \u2014 check: "Is there a \u2018like\u2019 or \u2018as\u2019? No. It says the atmosphere WAS vibrating. That is a metaphor."
\u2022 Students who look confused about what "atmosphere" means in this context \u2014 clarify: "Atmosphere here does not mean the actual air. It means the FEELING in the room \u2014 the mood."
\u2022 Readiness signal: Students nod in recognition and can connect this to the metaphor from Lesson 21.

[General: Explicit Instruction (I Do) \u2014 Literary Devices \u2014 VTLM 2.0: Explicit Explanation]`;

const NOTES_TS_IDO = `SAY:
\u2022 "Now we are going to build on what we learned in Lesson 21 about topic sentences. Last time we learned to IDENTIFY topic sentences. Today we are going to IMPROVE them."
\u2022 "Sometimes a topic sentence is correct but BORING. It states the fact but does not grab the reader\u2019s attention. We call this a \u2018flat\u2019 topic sentence."
\u2022 "There are four sentence types we can use: statement, question, command, and exclamation. Watch how I transform a flat statement into something more engaging."
\u2022 Point to the left column: "These are the four sentence types. A statement tells. A question asks. A command instructs. An exclamation expresses strong feeling."
\u2022 Point to the first example: "Flat TS: \u2018Miss Honey is very poor.\u2019 This is a statement \u2014 it is true but dull."
\u2022 "Watch me rewrite it as a question: \u2018Did you know Miss Honey is extremely poor?\u2019 This pulls the reader in. It makes them curious."
\u2022 Point to the second example: "Flat TS: \u2018Matilda is very excited by her newfound talent.\u2019"
\u2022 "Watch me rewrite it as an exclamation: \u2018Listen up! Excited Matilda can\u2019t stop talking about her newfound talent!\u2019 This has energy. The reader feels Matilda\u2019s excitement."
\u2022 "Your job today is to take flat topic sentences about Chapter 17 and make them more interesting using a different sentence type."

DO:
\u2022 Point to each sentence type as you name it. Keep definitions brief \u2014 students have met these before.
\u2022 Model the transformation process: read the flat TS, name the target type, write the improved version.
\u2022 Use a think-aloud: "I want this to be a question, so I need a question mark and words like \u2018did you know\u2019 or \u2018have you ever wondered.\u2019"
\u2022 Spend 3\u20134 minutes on this. The concepts must be clear before We Do.
\u2022 This is pure I Do \u2014 students watch and listen. They do not write yet.

TEACHER NOTES:
This is the I Do phase for the new writing skill. The lesson builds on Lesson 21\u2019s topic sentence identification by adding a sentence-level writing strategy: transforming flat statements into more engaging openers. The four sentence types (statement, question, command, exclamation) are part of the Year 3/4 grammar curriculum and should be familiar, but students may not have connected them to paragraph writing. By modelling the transformation process explicitly, we reduce cognitive load \u2014 students see WHAT to do and HOW to do it before they try. The examples are drawn directly from the novel content, keeping cognitive load on the WRITING skill rather than the CONTENT. DECIDE Framework: E (Execute through modelling). VTLM 2.0: Explicit Explanation and Modelling.

MISCONCEPTIONS:
\u2022 Misconception: An exclamation just means adding an exclamation mark to any sentence.
  Why: Students equate punctuation with sentence type. They think "Miss Honey is poor!" is an exclamation.
  Impact: Students will add exclamation marks to flat statements without actually transforming the sentence structure or adding emotional language.
  Quick correction: "An exclamation is not just a statement with an exclamation mark. It needs emotional language \u2014 words like \u2018incredible,\u2019 \u2018unbelievable,\u2019 \u2018listen up!\u2019 The exclamation mark signals strong feeling, but the WORDS must carry that feeling too."

\u2022 Misconception: A command must be rude or bossy.
  Why: Students associate commands with being told off: "Sit down! Be quiet!"
  Impact: Students avoid using commands in their writing because they feel it sounds impolite.
  Quick correction: "A command does not have to be rude. \u2018Consider this\u2019 is a command. \u2018Think about what happened\u2019 is a command. \u2018Imagine you were Miss Honey\u2019 is a command. They are invitations to the reader."

WATCH FOR:
\u2022 Students who look confused about the four sentence types \u2014 this is a recall issue, not a new-learning issue. Quick review: "Statement = telling. Question = asking. Command = instructing. Exclamation = strong feeling."
\u2022 Students who cannot see the difference between the flat TS and the improved TS \u2014 read both aloud and exaggerate: "Listen to the flat one: \u2018Miss Honey is very poor.\u2019 Now listen to the question: \u2018Did you KNOW Miss Honey is extremely poor?\u2019 Which one makes you lean forward?"
\u2022 Readiness signal: Students can articulate that the improved TS is more engaging and can identify which sentence type was used.

[General: Explicit Instruction (I Do) \u2014 Sentence-Level Writing \u2014 VTLM 2.0: Explicit Explanation and Modelling]`;

const NOTES_TS_WEDO1 = `SAY:
\u2022 "Your turn to help me. Here is a flat topic sentence: \u2018The Trunchbull is a cruel character.\u2019"
\u2022 "This is true, but it is boring. I want you to improve it."
\u2022 "On your whiteboards, rewrite this topic sentence as EITHER a question, a command, OR an exclamation. You choose which type."
\u2022 "You have 60 seconds. Remember \u2014 a question needs a question mark. A command tells the reader to do something. An exclamation needs strong emotional language AND an exclamation mark."
\u2022 "3, 2, 1 \u2014 boards up!"
\u2022 Scan and share 2\u20133 examples aloud. Then click to reveal: "Here are three strong versions \u2014 one for each type."

DO:
\u2022 Display the slide with the flat TS prominently at top.
\u2022 Give students 60 seconds to write their improved version on whiteboards.
\u2022 Say: "Boards up on my count: 3, 2, 1."
\u2022 Scan rapidly. Look for: correct sentence type (question mark / command verb / exclamation mark + emotional language).
\u2022 Share 2\u20133 strong examples by reading them aloud: "Listen to this one\u2026"
\u2022 Click to next slide to reveal three model alternatives.

CFU CHECKPOINT:
Technique: Show Me Boards

Script:
\u2022 "Rewrite \u2018The Trunchbull is a cruel character\u2019 as a question, command, or exclamation. You choose. 60 seconds."
\u2022 "3, 2, 1 \u2014 boards up."
\u2022 Scan for: (a) correct use of the chosen sentence type, (b) retention of the core meaning (Trunchbull is cruel), (c) more engaging than the original.
\u2022 Read 2\u20133 aloud. "Excellent. Now let me show you three strong versions."

PROCEED (if \u226580% produce a valid improved TS):
Move to We Do 2. Students are grasping the transformation skill.

PIVOT (if <80% produce a valid improved TS):
Most likely issue: Students are stuck on HOW to start a different sentence type. They default to the statement format.
Reteach: "Let me give you sentence starters. For a question: \u2018Have you ever met someone as cruel as...\u2019 For a command: \u2018Think about the worst person you can imagine...\u2019 For an exclamation: \u2018What a terrifying character...\u2019 Now try again. Pick one starter and finish the sentence."
Re-check: "Boards up in 30 seconds." Scan for improvement.

TEACHER NOTES:
This is the first We Do: students apply the concept with teacher guidance. Show Me Boards are ideal because every student commits to a written response, and the teacher gets instant data on the full class. The flat TS "The Trunchbull is a cruel character" is deliberately simple and directly relevant to the chapter just read. Students must retain the MEANING while transforming the FORM \u2014 this is the key cognitive demand. Offering a choice of sentence type reduces anxiety and allows differentiation (students pick the type they feel most confident with). VTLM 2.0: Scaffold Practice.

ENABLING & EXTENDING:
ENABLING PROMPT:
\u2022 Task: Give students a choice of TWO sentence starters (one question, one exclamation) and ask them to choose one and finish it. This removes the blank-page problem. E.g., "Have you ever met someone as cruel as ___?" OR "What a ___ character the Trunchbull is!"
\u2022 Extra Notes: Sit with enabling students during the 60 seconds and verbally scaffold: "Say it to me first. Good. Now write that down."

EXTENDING PROMPT:
\u2022 Task: Write ALL THREE types (question + command + exclamation) for the same flat TS. Then star the one they think is strongest and explain why in one sentence. This pushes students to compare the effect of different sentence types.
\u2022 Extra Notes: These students can share their comparisons with the class after the reveal.

WATCH FOR:
\u2022 Students who just add an exclamation mark to the original sentence ("The Trunchbull is a cruel character!") \u2014 redirect: "You added punctuation but did not transform the sentence. An exclamation needs emotional LANGUAGE, not just a mark. Try: \u2018What an incredibly cruel character the Trunchbull is!\u2019"
\u2022 Students who change the meaning (e.g., "The Trunchbull is nice") \u2014 redirect: "Keep the same idea \u2014 she IS cruel. Just change the WAY you say it."
\u2022 Readiness signal: \u226580% produce a valid improved TS with correct sentence type and retained meaning.

[General: Guided Practice (We Do) \u2014 Sentence-Level Writing \u2014 VTLM 2.0: Scaffold Practice]`;

const NOTES_TS_WEDO2 = `SAY:
\u2022 "One more together. Here is another flat topic sentence: \u2018Matilda wants to help Miss Honey.\u2019"
\u2022 "Let\u2019s do this one together as a class."
\u2022 "First \u2014 what sentence TYPE should we use? Call it out on my count."
\u2022 "3, 2, 1 \u2014 what type?" [Students call out: question / command / exclamation.] "I heard [most popular]. Let\u2019s go with that."
\u2022 "Now \u2014 who has a version? Cold call: [student name], give me your improved topic sentence."
\u2022 Share 2\u20133 versions. Select the strongest and explain why: "This one works because it [pulls the reader in / creates urgency / shows Matilda\u2019s determination]."

DO:
\u2022 Display the slide with the flat TS.
\u2022 Run Choral Response for the sentence type choice \u2014 this is fast and builds collective momentum.
\u2022 Then Cold Call 2\u20133 students for their improved versions. Select students strategically \u2014 start with a strong student to model, then a middle student.
\u2022 Keep this to 3 minutes. The point is rehearsal before You Do, not extended practice.

CFU CHECKPOINT:
Technique: Choral Response + Cold Call

Script:
\u2022 "What sentence type should we use? 3, 2, 1 \u2014 call it out!" [Listen for a clear response.]
\u2022 "Now \u2014 [student name], give me your improved topic sentence using that type."
\u2022 Cold call 2\u20133 students. "Who has a different version?"
\u2022 Scan for: Correct sentence type, retained meaning, more engaging than original.

PROCEED (if \u226580% participate and shared examples are strong):
Move to You Do. Students are ready for independent practice.

PIVOT (if shared examples are weak or students are hesitant):
Most likely issue: Students need one more modelled example before they can generate independently.
Reteach: Model the transformation yourself: "Watch me. \u2018Matilda wants to help Miss Honey\u2019 \u2192 Question: \u2018Will brave Matilda find a way to rescue Miss Honey?\u2019 See how I kept the meaning but made it pull you in? Now you try the same thing with an exclamation."
Re-check: Cold call one more student. If strong, proceed to You Do. If still weak, provide sentence starters on the board before You Do.

TEACHER NOTES:
This second We Do uses a whole-class collaborative approach (Choral Response for type + Cold Call for generation) rather than individual whiteboards. This variation keeps energy high and models the generation process publicly \u2014 students hear multiple versions, which seeds their own ideas for You Do. The flat TS "Matilda wants to help Miss Honey" is directly relevant to the chapter\u2019s climax and the prediction task from Pause Point 3. VTLM 2.0: Scaffold Practice.

WATCH FOR:
\u2022 Students who are silent during the choral response \u2014 they may be unsure about sentence types. Note them for extra support during You Do.
\u2022 Students who give very long, complex improved TSs \u2014 remind: "A topic sentence should be ONE sentence. Keep it punchy."
\u2022 Readiness signal: Students call out a sentence type confidently AND cold-called students produce valid improved TSs.

[General: Guided Practice (We Do) \u2014 Sentence-Level Writing \u2014 VTLM 2.0: Scaffold Practice]`;

const NOTES_TS_YOUDO = `SAY:
\u2022 "Now it is your turn to work independently. You have THREE flat topic sentences about Chapter 17. Your job is to improve them."
\u2022 Read from slide: "First: Read all three flat topic sentences on your scaffold sheet."
\u2022 "Next: Choose which sentence type to use for each one. You can use a different type for each \u2014 or the same type if you prefer."
\u2022 "Then: Write your improved topic sentences on your scaffold sheet. Underneath, write your strongest improved TS and add two supporting details to make a short paragraph."
\u2022 "You have your scaffold sheet and the worked examples from our We Do to look back at."
\u2022 "You have 8 minutes. Start now."

DO:
\u2022 Distribute the GO1_Sentence_Types_Scaffold.pdf (printed before the lesson).
\u2022 Ensure students understand the layout: three rows (one per flat TS), write-on lines for each type, then a "My Best Paragraph" section at the bottom.
\u2022 Display the slide with the three steps visible throughout.
\u2022 Set a timer for 8 minutes (visible if possible).
\u2022 Circulate immediately \u2014 start with the back-left table, then move through the room.
\u2022 For the first 2 minutes, check that students are reading the flat TSs and choosing a type, not just writing anything.
\u2022 Conference briefly with students who are stuck \u2014 use the prompt: "Read the flat sentence aloud. Now \u2014 what type do you want to try? A question? What question word could you start with?"

TEACHER NOTES:
This is the You Do phase \u2014 students apply the new concept independently. The scaffold sheet (GO1_Sentence_Types_Scaffold.pdf) provides structure without answers: each flat TS is pre-printed with labelled write-on lines for each sentence type, reducing the cognitive load of remembering the task structure. The "My Best Paragraph" section at the bottom extends the task to paragraph-level writing \u2014 students choose their strongest improved TS and add supporting details, connecting today\u2019s new skill to the topic sentence + supporting detail structure from Lesson 21. The 8-minute window is tight but deliberate \u2014 in a content-heavy lesson, the writing must be protected but not overextended. DECIDE Framework: D (Differentiate through fading) \u2014 students have seen two modelled examples and now write independently with the scaffold. VTLM 2.0: Supported Application.

ENABLING & EXTENDING:
ENABLING PROMPT:
\u2022 Task: Students focus on improving only ONE flat TS (their choice) using sentence starters provided verbally by the teacher. They write just the improved TS and one supporting detail. This reduces volume while maintaining the core skill demand.
\u2022 Extra Notes: Have sentence starters ready: "Have you ever wondered why\u2026?", "Think about what it means when\u2026", "What an incredible\u2026!"

EXTENDING PROMPT:
\u2022 Task: Students improve ALL THREE flat TSs using a DIFFERENT sentence type for each (one question, one command, one exclamation). Then write a paragraph using their strongest TS + 3 supporting details. This pushes both variety and paragraph length.
\u2022 Extra Notes: Challenge them to connect the paragraph to a theme: "What message is Roald Dahl sending about bullying and power?"

WATCH FOR:
\u2022 Students who write improved sentences that change the meaning \u2014 redirect: "Read your original flat TS. Does your new version say the same thing in a more interesting way? Or have you changed the meaning?"
\u2022 Students who only add punctuation without transforming the sentence \u2014 redirect: "Adding a question mark is not enough. You need question WORDS: who, what, why, how, did, have, can."
\u2022 Students whose "My Best Paragraph" supporting details do not connect to the TS \u2014 check: "Read your TS to me. Now read your SD. Does the SD tell me MORE about the TS?"
\u2022 Readiness signal: Students write at least one valid improved TS per flat TS and complete the "My Best Paragraph" section. At least 50% of the class should complete all three; the rest should have at least one improved TS + paragraph minimum.

[General: Independent Practice (You Do) \u2014 Sentence-Level Writing \u2014 VTLM 2.0: Supported Application]`;

const NOTES_RESOURCES = `SAY:
\u2022 "On this slide you can see the printable resource for today\u2019s lesson."
\u2022 "The Sentence Types Scaffold is the sheet you are using for your independent writing task. If you need a fresh copy, click the link to open the PDF."

DO:
\u2022 This slide is primarily for teacher reference and for digital distribution if needed.
\u2022 In class, the scaffold sheet should already be printed and distributed before the You Do task.
\u2022 The hyperlink opens the PDF in the default viewer when the PPTX and PDF are in the same folder.

TEACHER NOTES:
The resource slide serves as a reference point for teachers preparing the lesson. Clicking the hyperlink opens the companion PDF, which can then be printed. Best practice: print the scaffold sheets the day before the lesson so they are ready for distribution during the You Do segment. One sheet per student. VTLM 2.0: Scaffold Practice.

[General: Resources \u2014 VTLM 2.0: Preparation]`;

const NOTES_CLOSING = `SAY:
\u2022 "Let\u2019s reflect on what we learned today."
\u2022 Read the Turn & Talk prompt: "Miss Honey was petrified of her aunt for her entire childhood. What does her decision to become a teacher \u2014 and to care for children like Matilda \u2014 tell us about the kind of person she is?"
\u2022 Allow 60 seconds Turn & Talk.
\u2022 Share 1\u20132 responses. Then: "Miss Honey chose kindness even though she grew up with cruelty. That takes incredible strength."
\u2022 Point to takeaways: "Today we read Chapter 17 and learned Miss Honey\u2019s heartbreaking story. We learned two vocabulary words: petrified and insist. We identified a metaphor about atmosphere and secrets. And we practised improving flat topic sentences using different sentence types."
\u2022 "Check the success criteria in your mind. Can you rewrite a flat topic sentence as a question, command, or exclamation? Can you choose the strongest version? Thumbs up."

DO:
\u2022 Run the Turn & Talk for 60 seconds. Circulate and listen.
\u2022 Share 1\u20132 brief responses. Do not extend \u2014 keep the closing to 2 minutes.
\u2022 Read the key takeaways aloud. Connect back to LI/SC.
\u2022 Quick thumbs up self-assessment against the SCs.
\u2022 Collect scaffold sheets if needed for marking.

TEACHER NOTES:
The reflection prompt intentionally bridges the reading content (Miss Honey\u2019s childhood suffering) with a social-emotional theme (choosing kindness despite adversity). This makes the lesson sticky \u2014 students leave with both an academic takeaway (improving topic sentences) and a personal one (the power of choosing who you want to be). The key takeaways are kept to four points: reading comprehension, vocabulary, literary devices, and writing. This mirrors the lesson structure. VTLM 2.0: Retention and Recall / Consolidation.

WATCH FOR:
\u2022 Students who rush the thumbs up without genuine reflection \u2014 pause: "Be honest. If you are still practising with sentence types, that is fine. We will keep working on this."
\u2022 Students who want to discuss the plot further (especially the Trunchbull reveal) \u2014 acknowledge: "Great engagement! We will find out what Matilda does about it in Lesson 24."
\u2022 Students who are still emotionally affected by the chapter \u2014 check in quietly as they pack up.
\u2022 Readiness signal: A calm, purposeful close with most students giving honest thumbs up on at least 3 of 5 SCs.

[General: Closing / Review \u2014 VTLM 2.0: Retention and Recall]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build helper: TS improvement We Do slide (custom withReveal)
// ─────────────────────────────────────────────────────────────────────────────

function buildTsImprovementSlide(pres, flatTs, improvedVersions, notes) {
  /**
   * flatTs:   string — the flat topic sentence to improve
   * improvedVersions: [{ type: string, text: string, color: string }]
   *   — three improved versions (question, command, exclamation)
   * notes: string — teacher notes
   */
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.TEAL);
      addBadge(s, "We Do", { color: C.TEAL });
      addTitle(s, "Improve This Topic Sentence");

      // Flat TS card — prominent at top
      addCard(s, 0.5, CONTENT_TOP, 9, 1.0, { fill: C.PLUM });
      s.addShape("roundRect", {
        x: 0.68, y: CONTENT_TOP + 0.12, w: 1.5, h: 0.30, rectRadius: 0.08,
        fill: { color: C.HONEY },
      });
      s.addText("Flat TS", {
        x: 0.68, y: CONTENT_TOP + 0.12, w: 1.5, h: 0.30,
        fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      s.addText(flatTs, {
        x: 0.75, y: CONTENT_TOP + 0.48, w: 8.5, h: 0.44,
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, margin: 0,
      });

      // Instruction text
      s.addText("Rewrite this as a question, command, or exclamation on your whiteboard.", {
        x: 0.5, y: CONTENT_TOP + 1.18, w: 9, h: 0.30,
        fontSize: 13, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });

      // Three empty labelled cards (question / command / exclamation)
      const labels = ["Question", "Command", "Exclamation"];
      const cardColors = [C.TEAL, C.SAGE, C.CORAL];
      const emptyH = 0.66;
      const gap = 0.10;
      const startY = CONTENT_TOP + 1.56;

      labels.forEach((label, i) => {
        const y = startY + i * (emptyH + gap);
        addCard(s, 0.5, y, 9, emptyH, { fill: C.PARCHMENT });
        s.addShape("roundRect", {
          x: 0.62, y: y + 0.15, w: 1.8, h: 0.34, rectRadius: 0.08,
          fill: { color: cardColors[i] },
        });
        s.addText(label, {
          x: 0.62, y: y + 0.15, w: 1.8, h: 0.34,
          fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
        s.addText("?", {
          x: 2.6, y: y + 0.10, w: 6.6, h: emptyH - 0.20,
          fontSize: 16, fontFace: FONT_H, color: C.MUTED, valign: "middle", margin: 0,
        });
      });

      addFooter(s, FOOTER);
      s.addNotes(notes);
      return s;
    },
    (slide) => {
      // Fill in the three improved versions
      const emptyH = 0.66;
      const gap = 0.10;
      const startY = CONTENT_TOP + 1.56;
      const cardColors = [C.TEAL, C.SAGE, C.CORAL];

      improvedVersions.forEach((ver, i) => {
        const y = startY + i * (emptyH + gap);
        // Overlay a filled card on the parchment one
        slide.addShape("roundRect", {
          x: 0.5, y, w: 9, h: emptyH, rectRadius: 0.1,
          fill: { color: C.WHITE }, shadow: makeCardShadow(),
        });
        // Left colour strip
        slide.addShape("rect", {
          x: 0.5, y, w: 0.07, h: emptyH,
          fill: { color: cardColors[i] },
        });
        // Type label
        slide.addShape("roundRect", {
          x: 0.62, y: y + 0.15, w: 1.8, h: 0.34, rectRadius: 0.08,
          fill: { color: cardColors[i] },
        });
        slide.addText(ver.type, {
          x: 0.62, y: y + 0.15, w: 1.8, h: 0.34,
          fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
        // Improved text
        slide.addText(ver.text, {
          x: 2.6, y: y + 0.06, w: 6.6, h: emptyH - 0.12,
          fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
        });
      });
    }
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF generation: GO1_Sentence_Types_Scaffold.pdf
// ─────────────────────────────────────────────────────────────────────────────

async function generateScaffoldPdf() {
  const doc = createPdf({ title: "Sentence Types Scaffold" });

  let y = addPdfHeader(doc, "Sentence Types Scaffold \u2014 Improving Topic Sentences", {
    subtitle: "Graphic Organiser 1 (GO1)",
    color: C.PLUM,
    lessonInfo: "Matilda | Lesson 23 of 25 | Week 5 | Year 3/4 Literacy",
  });

  y = addTipBox(doc, "Read each flat topic sentence. Rewrite it as a question, a command, and an exclamation. Then choose your strongest improved TS for the paragraph at the bottom.", y, { color: C.TEAL });

  // Three flat TSs, each with write-on lines
  const flatSentences = [
    "Miss Honey\u2019s parents died when she was young.",
    "Miss Honey\u2019s aunt became her legal guardian.",
    "Miss Honey\u2019s aunt is Miss Trunchbull.",
  ];

  flatSentences.forEach((ts, i) => {
    // Check if we need a new page
    if (y > 620) {
      doc.addPage();
      y = 50;
    }

    y = addSectionHeading(doc, `Topic Sentence ${i + 1}`, y, { color: C.PLUM });

    // Print the flat TS
    doc.fontSize(11).font("Helvetica-Bold").fillColor("#000000");
    doc.text(`Flat TS: "${ts}"`, 50, y, { width: 495.28 });
    y = doc.y + 10;

    // Write-on lines for each transformation
    y = addWriteLine(doc, "As a question:", y);
    y = addWriteLine(doc, "As a command:", y);
    y = addWriteLine(doc, "As an exclamation:", y);
    y += 8;
  });

  // "My Best Paragraph" section
  if (y > 560) {
    doc.addPage();
    y = 50;
  }

  y = addSectionHeading(doc, "My Best Paragraph", y, { color: C.TEAL });
  y = addBodyText(doc, "Choose your strongest improved topic sentence. Write it first, then add 2 supporting details.", y, { italic: true, color: "6B7280" });
  y = addLinedArea(doc, y, 7, { lineSpacing: 26 });

  y = addTipBox(doc, "Choose your strongest improved TS. Write it first, then add 2 supporting details. Use the text from Chapter 17 to help you find details.", y, { color: C.PLUM });

  addPdfFooter(doc, "Matilda | Lesson 23 of 25 | Week 5 | Year 3/4 Literacy");

  await writePdf(doc, OUT_DIR + "/GO1_Sentence_Types_Scaffold.pdf");
  console.log("\u2713 Written GO1_Sentence_Types_Scaffold.pdf");
}

// ─────────────────────────────────────────────────────────────────────────────
// Main build
// ─────────────────────────────────────────────────────────────────────────────

(async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Explicit Teaching Slide Generator";
  pres.title  = "Matilda Lesson 23 \u2014 Miss Honey\u2019s Story";

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1: TITLE
  // ═══════════════════════════════════════════════════════════════════════════
  titleSlide(
    pres,
    "Miss Honey\u2019s Story",
    "Matilda \u2014 Chapter 17",
    "Lesson 23 of 25  |  Week 5  |  Year 3/4 Literacy",
    NOTES_TITLE
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2: LEARNING INTENTIONS & SUCCESS CRITERIA
  // ═══════════════════════════════════════════════════════════════════════════
  liSlide(
    pres,
    [
      "We are learning to improve our topic sentences using different sentence types",
    ],
    [
      "I can identify a weak topic sentence and explain why it needs improving",
      "I can rewrite a topic sentence using a different sentence type",
      "I can choose the strongest version and explain why it works best",
    ],
    NOTES_LI,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3: REVIEW — Prior Knowledge (Chapter 16)
  // ═══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres,
    "Review", C.PLUM,
    "What Do We Remember?",
    [
      "Where did Matilda and Miss Honey go at the end of Chapter 16?",
      "What was surprising about Miss Honey\u2019s cottage?",
      "What did Matilda notice that made her worried about Miss Honey?",
    ],
    NOTES_REVIEW,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4: VOCABULARY — petrified & insist (dual word, custom inline)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.TEAL);
    addBadge(s, "Vocabulary", { color: C.TEAL });
    addTitle(s, "Word Study \u2014 Two Key Words");

    // Left card: petrified
    const col1X = 0.5, col2X = 5.05, colW = 4.3;
    const crdY = CONTENT_TOP, crdH = SAFE_BOTTOM - CONTENT_TOP;

    // --- petrified ---
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
    s.addText("petrified", {
      x: col1X + 0.15, y: crdY + 0.08, w: colW - 0.3, h: 0.54,
      fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: col1X + colW - 1.4, y: crdY + 0.15, w: 1.2, h: 0.34, rectRadius: 0.08,
      fill: { color: C.HONEY },
    });
    s.addText("adjective", {
      x: col1X + colW - 1.4, y: crdY + 0.15, w: 1.2, h: 0.34,
      fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Definition", {
      x: col1X + 0.2, y: crdY + 0.80, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("So frightened that you are unable to move or think.", {
      x: col1X + 0.2, y: crdY + 1.04, w: colW - 0.4, h: 0.70,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addText("In the text", {
      x: col1X + 0.2, y: crdY + 1.80, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("\u201CMiss Honey was petrified of her aunt.\u201D", {
      x: col1X + 0.2, y: crdY + 2.06, w: colW - 0.4, h: 0.70,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // --- insist ---
    addCard(s, col2X, crdY, colW, crdH, { fill: C.WHITE });
    s.addShape("roundRect", {
      x: col2X, y: crdY, w: colW, h: 0.70, rectRadius: 0.1,
      fill: { color: C.TEAL },
    });
    s.addShape("rect", {
      x: col2X, y: crdY + 0.55, w: colW, h: 0.15,
      fill: { color: C.TEAL },
    });
    s.addText("insist", {
      x: col2X + 0.15, y: crdY + 0.08, w: colW - 0.3, h: 0.54,
      fontSize: 28, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: col2X + colW - 1.1, y: crdY + 0.15, w: 0.9, h: 0.34, rectRadius: 0.08,
      fill: { color: C.HONEY },
    });
    s.addText("verb", {
      x: col2X + colW - 1.1, y: crdY + 0.15, w: 0.9, h: 0.34,
      fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Definition", {
      x: col2X + 0.2, y: crdY + 0.80, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("To demand something firmly, not accepting refusal.", {
      x: col2X + 0.2, y: crdY + 1.04, w: colW - 0.4, h: 0.70,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addText("In the text", {
      x: col2X + 0.2, y: crdY + 1.80, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("\u201CThe aunt insisted that Miss Honey hand over all her money.\u201D", {
      x: col2X + 0.2, y: crdY + 2.06, w: colW - 0.4, h: 0.70,
      fontSize: 13, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_VOCAB);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 5: SENSITIVITY ADVISORY + READING LAUNCH
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PLUM);
    addBadge(s, "Read Aloud", { color: C.PLUM });
    addTitle(s, "Chapter 17: Miss Honey\u2019s Story");

    const crdH = SAFE_BOTTOM - CONTENT_TOP;

    // Left card: reading info + prediction
    addCard(s, 0.5, CONTENT_TOP, 5.4, crdH, { strip: C.PLUM, fill: C.WHITE });

    // Reading info
    s.addText("Pages 288\u2013308", {
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
    s.addText("The chapter is called \u2018Miss Honey\u2019s Story.\u2019 She has been keeping a secret about her past. What do you predict she might reveal?", {
      x: 0.75, y: CONTENT_TOP + 1.48, w: 4.8, h: 1.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Right side — two stacked cards: Sensitivity Advisory (top) + Big Ideas (bottom)

    // Sensitivity advisory card — CORAL bordered, NOT filled
    const advY = CONTENT_TOP;
    const advH = 1.55;
    s.addShape("roundRect", {
      x: 6.1, y: advY, w: 3.4, h: advH, rectRadius: 0.1,
      fill: { color: C.PARCHMENT },
      line: { color: C.CORAL, width: 2 },
    });
    s.addText("Sensitivity Advisory", {
      x: 6.25, y: advY + 0.10, w: 3.1, h: 0.26,
      fontSize: 11, fontFace: FONT_B, color: C.CORAL, bold: true, margin: 0,
    });
    s.addText("This chapter includes references to the death of Miss Honey\u2019s father. Some students may find this content upsetting. If you need a moment, raise your hand quietly.", {
      x: 6.25, y: advY + 0.40, w: 3.1, h: 1.05,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    // Big Ideas card (below advisory)
    const bigY = advY + advH + 0.12;
    const bigH = SAFE_BOTTOM - bigY;
    addCard(s, 6.1, bigY, 3.4, bigH, { fill: C.PARCHMENT });
    s.addText("Big Ideas", {
      x: 6.3, y: bigY + 0.10, w: 3.0, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.PLUM, bold: true, margin: 0,
    });
    const bigIdeas = [
      "Matilda questions Miss Honey about her poverty",
      "Miss Honey reveals her tragic backstory",
      "Her mother died when she was 2; her father died suddenly",
      "The aunt was cruel and controlling",
      "The shocking reveal: the aunt is Miss Trunchbull",
    ];
    s.addText(
      bigIdeas.map((t, i) => ({
        text: t,
        options: { bullet: true, breakLine: i < bigIdeas.length - 1, fontSize: 10, color: C.CHARCOAL },
      })),
      {
        x: 6.3, y: bigY + 0.44, w: 3.0, h: bigH - 0.60,
        fontFace: FONT_B, valign: "top", margin: 0,
      }
    );

    addFooter(s, FOOTER);
    s.addNotes(NOTES_READING_LAUNCH);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 6-7: PAUSE POINT 1 — p.293 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 1", "Chapter 17 \u2014 p. 293",
      "\u2018May I tell you a story?\u2019",
      "p. 293",
      "What\u2019s going on here? Why does Miss Honey frame this as a \u2018story\u2019?",
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
      slide.addText("Miss Honey is about to share her painful personal history. Calling it a \u2018story\u2019 creates emotional distance \u2014 it makes the memories feel less raw. It also draws us in: everyone wants to hear a story.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 8-9: PAUSE POINT 2 — p.300 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => quoteSlide(
      pres, "Pause Point 2", "Chapter 17 \u2014 p. 300",
      "\u2018That\u2019s the sad story of my life. Now I\u2019ve talked enough.\u2019",
      "p. 300",
      "What does the author want us to know about Miss Honey and her aunt? Write TWO cruel things the aunt did.",
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
      slide.addText("The aunt was cruel and controlling: she forced Miss Honey to work as a servant, insisted on taking all her wages, and stole her father\u2019s house. Miss Honey was petrified \u2014 too frightened to fight back.", {
        x: 0.75, y: ansY + 0.40, w: 8.5, h: 0.88,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, valign: "top", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 10-11: PAUSE POINT 3 — p.308 HINGE QUESTION (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.CORAL);
      addBadge(s, "CFU \u2014 Hinge", { color: C.CORAL, w: 2.0 });
      addTitle(s, "The Big Reveal \u2014 p. 308", { color: C.CORAL });

      // Quote card (compact)
      addCard(s, 0.5, CONTENT_TOP, 9, 0.82, { fill: C.PLUM });
      s.addText("\u201C", {
        x: 0.6, y: CONTENT_TOP + 0.02, w: 0.5, h: 0.4,
        fontSize: 36, fontFace: FONT_H, color: C.HONEY, margin: 0,
      });
      s.addText("Then she said softly, \u201CMiss Trunchbull.\u201D", {
        x: 1.0, y: CONTENT_TOP + 0.12, w: 7.8, h: 0.40,
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, italic: true, margin: 0,
      });
      s.addText("p. 308", {
        x: 8.5, y: CONTENT_TOP + 0.56, w: 0.9, h: 0.22,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, align: "right", margin: 0,
      });

      // Prediction question
      s.addText("Now that we know the aunt is Miss Trunchbull, what do you predict Matilda will do?", {
        x: 0.5, y: CONTENT_TOP + 0.94, w: 9, h: 0.36,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
      });

      // Technique pill
      s.addShape("roundRect", {
        x: 0.5, y: CONTENT_TOP + 1.38, w: 2.2, h: 0.34, rectRadius: 0.08,
        fill: { color: C.CORAL },
      });
      s.addText("Finger Voting", {
        x: 0.5, y: CONTENT_TOP + 1.38, w: 2.2, h: 0.34,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });

      // Four option cards (2x2 grid)
      const options = [
        { letter: "A", text: "Run away from the Trunchbull", color: C.SAGE },
        { letter: "B", text: "Tell the police about the Trunchbull", color: C.TEAL },
        { letter: "C", text: "Use her telekinetic power to help Miss Honey", color: C.PLUM },
        { letter: "D", text: "Do nothing", color: C.MUTED },
      ];
      const optW = 4.3, optH = 0.54, optGapX = 0.4, optGapY = 0.10;
      const optStartY = CONTENT_TOP + 1.78;
      const optStartX = 0.5;

      options.forEach((opt, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const ox = optStartX + col * (optW + optGapX);
        const oy = optStartY + row * (optH + optGapY);

        addCard(s, ox, oy, optW, optH, { fill: C.WHITE });
        // Letter circle
        s.addShape("roundRect", {
          x: ox + 0.12, y: oy + 0.08, w: 0.38, h: 0.38, rectRadius: 0.19,
          fill: { color: opt.color },
        });
        s.addText(opt.letter, {
          x: ox + 0.12, y: oy + 0.08, w: 0.38, h: 0.38,
          fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
        s.addText(opt.text, {
          x: ox + 0.62, y: oy + 0.04, w: optW - 0.80, h: optH - 0.08,
          fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
        });
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_PAUSE3);
      return s;
    },
    (slide) => {
      // Highlight option C as the expected prediction
      const optW = 4.3, optH = 0.54, optGapX = 0.4, optGapY = 0.10;
      const optStartY = CONTENT_TOP + 1.78;
      const optStartX = 0.5;
      // Option C is index 2 → row 1, col 0
      const cX = optStartX + 0 * (optW + optGapX);
      const cY = optStartY + 1 * (optH + optGapY);

      // Highlight border around option C
      slide.addShape("roundRect", {
        x: cX - 0.04, y: cY - 0.04, w: optW + 0.08, h: optH + 0.08, rectRadius: 0.12,
        fill: { color: C.PLUM, transparency: 85 },
        line: { color: C.PLUM, width: 3 },
      });

      // "Most likely" label — positioned at top-right of option C highlight
      slide.addShape("roundRect", {
        x: cX + optW - 1.5, y: cY - 0.18, w: 1.4, h: 0.26, rectRadius: 0.08,
        fill: { color: C.PLUM },
      });
      slide.addText("Most Likely", {
        x: cX + optW - 1.5, y: cY - 0.18, w: 1.4, h: 0.26,
        fontSize: 9, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });

      // Explanation text below the grid
      const explY = optStartY + 2 * (optH + optGapY) + 0.06;
      const explH = Math.min(0.50, SAFE_BOTTOM - explY);
      slide.addShape("roundRect", {
        x: 0.5, y: explY, w: 9, h: explH, rectRadius: 0.08,
        fill: { color: C.HONEY },
      });
      slide.addText("Matilda is brave, clever, and has a power nobody else has. She cares about Miss Honey. She will use her gift to help \u2014 that is who she is.", {
        x: 0.68, y: explY + 0.04, w: 8.6, h: explH - 0.08,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, valign: "middle", margin: 0,
      });
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 12: LITERARY DEVICE — Metaphor (p.290)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PLUM);
    addBadge(s, "I Do", { color: C.PLUM });
    addTitle(s, "Figurative Language in Chapter 17");

    // Metaphor card — single card, full width (taller to fit explanation)
    const cY = CONTENT_TOP;
    const cH = 2.80;
    addCard(s, 0.5, cY, 9, cH, { strip: C.PLUM, fill: C.WHITE });
    s.addShape("roundRect", {
      x: 0.72, y: cY + 0.14, w: 1.6, h: 0.38, rectRadius: 0.08,
      fill: { color: C.PLUM },
    });
    s.addText("Metaphor", {
      x: 0.72, y: cY + 0.14, w: 1.6, h: 0.38,
      fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("Saying something IS something else (no \u2018like\u2019 or \u2018as\u2019)", {
      x: 2.5, y: cY + 0.16, w: 6.8, h: 0.36,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    // Quote
    s.addText("\u201C", {
      x: 0.65, y: cY + 0.65, w: 0.4, h: 0.6,
      fontSize: 42, fontFace: FONT_H, color: C.HONEY, margin: 0,
    });
    s.addText("\u2026the atmosphere in the room had changed completely and now it was vibrating with awkwardness and secrets.", {
      x: 1.0, y: cY + 0.78, w: 8.0, h: 0.70,
      fontSize: 18, fontFace: FONT_H, color: C.CHARCOAL, italic: true, margin: 0,
    });
    s.addText("p. 290", {
      x: 8.3, y: cY + 1.60, w: 1.0, h: 0.22,
      fontSize: 9, fontFace: FONT_B, color: C.MUTED, align: "right", margin: 0,
    });

    // Explanation card
    s.addText("Why this works:", {
      x: 0.75, y: cY + 1.88, w: 8.5, h: 0.26,
      fontSize: 11, fontFace: FONT_B, color: C.PLUM, bold: true, margin: 0,
    });
    s.addText("An atmosphere cannot literally vibrate. Dahl makes the tension feel physical \u2014 like you could reach out and touch the awkwardness in the air. Both characters have secrets, and the room is heavy with unspoken truths.", {
      x: 0.75, y: cY + 2.10, w: 8.5, h: 0.58,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    // Connection to Lesson 21 — compact card below
    const connY = cY + cH + 0.10;
    const connH = SAFE_BOTTOM - connY;
    addCard(s, 0.5, connY, 9, connH, { strip: C.TEAL, fill: C.PARCHMENT });
    s.addText("Connection to Lesson 21", {
      x: 0.75, y: connY + 0.06, w: 4, h: 0.24,
      fontSize: 11, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addText("In Lesson 21, we explored a metaphor about an internal experience: \u2018I was flying past the stars on silver wings.\u2019 Today\u2019s metaphor describes an external atmosphere. Both use vivid imagery to make the reader FEEL something.", {
      x: 0.75, y: connY + 0.30, w: 8.5, h: connH - 0.40,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_METAPHOR);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 13: IMPROVING TOPIC SENTENCES — I DO (Modelling)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.PLUM);
    addBadge(s, "I Do \u2014 Watch Me", { color: C.PLUM, w: 2.2 });
    addTitle(s, "Improving Topic Sentences");

    const cardH = SAFE_BOTTOM - CONTENT_TOP;

    // Left column — sentence types overview
    addCard(s, 0.5, CONTENT_TOP, 4.3, cardH, { strip: C.PLUM, fill: C.WHITE });
    s.addText("Four Sentence Types", {
      x: 0.68, y: CONTENT_TOP + 0.10, w: 3.9, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.PLUM, bold: true, margin: 0,
    });

    const types = [
      { label: "Statement", desc: "Tells a fact or opinion", color: C.MUTED },
      { label: "Question", desc: "Asks something", color: C.TEAL },
      { label: "Command", desc: "Instructs the reader", color: C.SAGE },
      { label: "Exclamation", desc: "Expresses strong feeling", color: C.CORAL },
    ];
    types.forEach((t, i) => {
      const ty = CONTENT_TOP + 0.46 + i * 0.50;
      s.addShape("roundRect", {
        x: 0.68, y: ty, w: 1.7, h: 0.30, rectRadius: 0.06,
        fill: { color: t.color },
      });
      s.addText(t.label, {
        x: 0.68, y: ty, w: 1.7, h: 0.30,
        fontSize: 10, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      s.addText(t.desc, {
        x: 2.50, y: ty, w: 2.1, h: 0.30,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
      });
    });

    // Strategy note
    s.addShape("rect", {
      x: 0.57, y: CONTENT_TOP + 2.60, w: 4.16, h: 0.02,
      fill: { color: C.HONEY },
    });
    s.addText("Strategy: Take a flat statement and rewrite it as a question, command, or exclamation to grab the reader.", {
      x: 0.68, y: CONTENT_TOP + 2.72, w: 3.9, h: 0.90,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Right column — two modelled examples
    addCard(s, 5.0, CONTENT_TOP, 4.5, cardH, { strip: C.HONEY, fill: C.PARCHMENT });
    s.addText("Modelled Examples", {
      x: 5.2, y: CONTENT_TOP + 0.08, w: 4.1, h: 0.26,
      fontSize: 11, fontFace: FONT_B, color: C.PLUM, bold: true, margin: 0,
    });

    // Example 1
    const ex1Y = CONTENT_TOP + 0.42;
    s.addShape("roundRect", {
      x: 5.15, y: ex1Y, w: 4.2, h: 1.50, rectRadius: 0.08,
      fill: { color: C.WHITE }, shadow: makeCardShadow(),
    });
    s.addText("Flat:", {
      x: 5.28, y: ex1Y + 0.06, w: 0.6, h: 0.24,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, bold: true, margin: 0,
    });
    s.addText("\u201CMiss Honey is very poor.\u201D", {
      x: 5.88, y: ex1Y + 0.06, w: 3.3, h: 0.24,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    // Arrow indicator
    s.addText("\u2192", {
      x: 5.28, y: ex1Y + 0.36, w: 0.4, h: 0.24,
      fontSize: 14, fontFace: FONT_B, color: C.TEAL, bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: 5.68, y: ex1Y + 0.36, w: 1.2, h: 0.24, rectRadius: 0.06,
      fill: { color: C.TEAL },
    });
    s.addText("Question", {
      x: 5.68, y: ex1Y + 0.36, w: 1.2, h: 0.24,
      fontSize: 9, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("\u201CDid you know Miss Honey is extremely poor?\u201D", {
      x: 5.28, y: ex1Y + 0.68, w: 3.9, h: 0.70,
      fontSize: 13, fontFace: FONT_H, color: C.PLUM, italic: true, margin: 0,
    });

    // Example 2
    const ex2Y = ex1Y + 1.62;
    s.addShape("roundRect", {
      x: 5.15, y: ex2Y, w: 4.2, h: 1.50, rectRadius: 0.08,
      fill: { color: C.WHITE }, shadow: makeCardShadow(),
    });
    s.addText("Flat:", {
      x: 5.28, y: ex2Y + 0.06, w: 0.6, h: 0.24,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, bold: true, margin: 0,
    });
    s.addText("\u201CMatilda is very excited by her newfound talent.\u201D", {
      x: 5.88, y: ex2Y + 0.06, w: 3.3, h: 0.24,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addText("\u2192", {
      x: 5.28, y: ex2Y + 0.36, w: 0.4, h: 0.24,
      fontSize: 14, fontFace: FONT_B, color: C.CORAL, bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: 5.68, y: ex2Y + 0.36, w: 1.5, h: 0.24, rectRadius: 0.06,
      fill: { color: C.CORAL },
    });
    s.addText("Exclamation", {
      x: 5.68, y: ex2Y + 0.36, w: 1.5, h: 0.24,
      fontSize: 9, fontFace: FONT_B, color: C.WHITE, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText("\u201CListen up! Excited Matilda can\u2019t stop talking about her newfound talent!\u201D", {
      x: 5.28, y: ex2Y + 0.68, w: 3.9, h: 0.70,
      fontSize: 13, fontFace: FONT_H, color: C.PLUM, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_TS_IDO);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDES 14-15: IMPROVING TS — WE DO 1 (withReveal)
  // ═══════════════════════════════════════════════════════════════════════════
  buildTsImprovementSlide(
    pres,
    "The Trunchbull is a cruel character.",
    [
      { type: "Question",    text: "Have you ever met a character as terrifyingly cruel as the Trunchbull?" },
      { type: "Command",     text: "Think about the worst bully you can imagine \u2014 the Trunchbull is worse." },
      { type: "Exclamation", text: "What an unbelievably cruel and heartless character the Trunchbull is!" },
    ],
    NOTES_TS_WEDO1
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 16: IMPROVING TS — WE DO 2 (whole class collaborative)
  // ═══════════════════════════════════════════════════════════════════════════
  contentSlide(
    pres,
    "We Do", C.TEAL,
    "Improve This Together",
    [
      "Flat TS: \u201CMatilda wants to help Miss Honey.\u201D",
      "",
      "Step 1: What sentence TYPE should we use? Call it out!",
      "Step 2: Who has an improved version? Share with the class.",
      "",
      "Remember: keep the meaning, change the form.",
    ],
    NOTES_TS_WEDO2,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 17: IMPROVING TS — YOU DO (Independent Practice)
  // ═══════════════════════════════════════════════════════════════════════════
  taskSlide(
    pres,
    "You Do", "Your Turn: Improve These Topic Sentences",
    [
      { label: "First",  instruction: "Read the three flat topic sentences on your scaffold sheet." },
      { label: "Next",   instruction: "Rewrite each as a question, command, or exclamation. You choose which type for each." },
      { label: "Then",   instruction: "Choose your STRONGEST improved TS. Write it at the bottom with 2 supporting details to make a paragraph." },
    ],
    NOTES_TS_YOUDO,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 18: RESOURCES
  // ═══════════════════════════════════════════════════════════════════════════
  addResourceSlide(
    pres,
    [
      {
        name: "GO1 \u2014 Sentence Types Scaffold",
        fileName: "GO1_Sentence_Types_Scaffold.pdf",
        description: "Graphic organiser for improving topic sentences \u2014 one per student.",
      },
    ],
    { C, FONT_H, FONT_B },
    FOOTER,
    NOTES_RESOURCES
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 19: CLOSING
  // ═══════════════════════════════════════════════════════════════════════════
  closingSlide(
    pres,
    "Miss Honey was petrified of her aunt for her entire childhood. What does her decision to become a teacher \u2014 and to care for children like Matilda \u2014 tell us about the kind of person she is?",
    [
      "We read Chapter 17 and learned Miss Honey\u2019s heartbreaking story",
      "We learned two vocabulary words: petrified and insist",
      "We identified a metaphor about atmosphere and secrets",
      "We can now improve flat topic sentences using different sentence types",
    ],
    NOTES_CLOSING
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // WRITE FILES
  // ═══════════════════════════════════════════════════════════════════════════
  await pres.writeFile({ fileName: OUT_DIR + "/Matilda_Lesson23_Miss_Honeys_Story.pptx" });
  console.log("\u2713 Written to " + OUT_DIR + "/Matilda_Lesson23_Miss_Honeys_Story.pptx");

  await generateScaffoldPdf();
  console.log("\u2713 All files written to " + OUT_DIR);
})();
