// Kasey the Kind Kangaroo — Session 1: Caring Connects Us
// Year 5/6 Wellbeing — Term 1
// Uses themes/kasey_helpers.js + themes/pdf_helpers.js

"use strict";

const pptxgen = require("pptxgenjs");
const fs      = require("fs");

const {
  C, FONT_H, FONT_B,
  makeShadow, makeCardShadow,
  SAFE_BOTTOM, CONTENT_TOP,
  iconToBase64Png,
  addTopBar, addBadge, addTitle, addCard, addFooter, addIconCircle,
  addTextOnShape, withReveal,
  titleSlide, liSlide, contentSlide, discussionSlide,
  cfuSlide, taskSlide, closingSlide,
} = require("../themes/kasey_helpers");

const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addBodyText, addTipBox, addPdfFooter, PAGE, hex, lighten,
  addResourceSlide,
} = require("../themes/pdf_helpers");

const {
  FaHeart,
  FaUsers,
  FaHandsHelping,
  FaComments,
  FaSmile,
  FaLightbulb,
  FaStar,
  FaCheckCircle,
} = require("react-icons/fa");

const OUT_DIR = "output/Session_Kasey1_Caring_Connects_Us";
const FOOTER  = "Kasey the Kind Kangaroo  |  Session 1  |  Year 5/6 Wellbeing";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
\u2022 "Welcome to our first wellbeing session with Kasey the Kind Kangaroo. This term, Kasey will help us explore what it means to care for each other and build a kind community."
\u2022 "Today\u2019s session is called \u2018Caring Connects Us\u2019 \u2014 and by the end, you\u2019ll understand why supporting each other makes everyone\u2019s life better, including your own."

**DO:**
\u2022 Display this slide as students enter. Allow 15 seconds for students to read the title and settle.
\u2022 Have Emotion Cards and Scenario Cards ready but not yet distributed.
\u2022 Ensure the classroom is arranged for partner discussion (desks paired or students seated near a partner).

**TEACHER NOTES:**
This is Session 1 of the Kasey the Kind Kangaroo wellbeing program for Term 1. The session targets empathy and emotional support as foundational wellbeing skills. Research (Eisenberg et al., 2006) shows that empathy development in upper primary is critical for prosocial behaviour and emotional regulation. This opening session establishes the safe, supportive tone for the term. Keep the energy warm and inviting \u2014 students need to feel this is a space where sharing is valued, not judged.

**WATCH FOR:**
\u2022 Students who appear disengaged or uncomfortable \u2014 wellbeing sessions can trigger emotions for students experiencing difficulties at home or with peers. Note these students and check in privately afterward.
\u2022 Readiness signal: Students are settled, attentive, and curious about the topic.

[General: Planning \u2014 Preparation | VTLM 2.0: Enabling Learning]`;

const NOTES_LI = `**SAY:**
\u2022 Read from slide: "We are learning about the importance of offering and receiving emotional support."
\u2022 Read from slide: "We are learning to practise empathy by understanding and respecting others\u2019 feelings."
\u2022 "Look at the success criteria \u2014 these are the things I\u2019ll be checking you can do by the end of our session."
\u2022 Ask: "Who can tell me what \u2018empathy\u2019 means in their own words?" [Expected: something about understanding how someone else feels / putting yourself in their shoes.]

**DO:**
\u2022 Point to each success criterion as you read it aloud.
\u2022 Give students 10 seconds to silently read the success criteria.
\u2022 Take 2\u20133 quick student responses to the empathy question. Affirm responses and note any misconceptions to address later.

**TEACHER NOTES:**
The learning intention is deliberately split into two parts: offering/receiving support (behavioural) and practising empathy (cognitive/affective). This mirrors the dual nature of wellbeing \u2014 it is both something you DO and something you FEEL. The success criteria are scaffolded from knowledge (explain, identify) to application (suggest, describe). By asking students about empathy early, you activate prior knowledge and identify starting points.

**WATCH FOR:**
\u2022 Students who confuse empathy with sympathy \u2014 empathy is feeling WITH someone, sympathy is feeling FOR them. If this comes up, make a quick distinction: "Sympathy says \u2018I feel sorry for you.\u2019 Empathy says \u2018I understand how you feel.\u2019"
\u2022 Readiness signal: Students can articulate some understanding of empathy, even if imprecise.

[General: Planning \u2014 Curriculum Alignment | VTLM 2.0: Planning]`;

const NOTES_DISCUSSION = `**SAY:**
\u2022 "Before we dive in, I want you to think about your own experience with emotional support."
\u2022 Read from slide: "What does it mean to support someone emotionally?"
\u2022 "Think about a specific time \u2014 either when someone supported YOU, or when YOU supported someone else. What did they say or do? How did it make you feel?"
\u2022 "Turn to your partner and share your example. You have 60 seconds each."
\u2022 After sharing: "Let\u2019s hear from a few pairs. What did your partner share?" (Cold Call 2\u20133 pairs)

**DO:**
\u2022 Allow 10 seconds of silent think time before partner sharing.
\u2022 Set a visible timer for 2 minutes total (60 seconds each partner).
\u2022 Circulate during partner sharing \u2014 listen for strong examples to invite to share with the class.
\u2022 Cold Call 2\u20133 pairs to share, ensuring a range of examples (both giving and receiving support).

**CFU CHECKPOINT:**
Technique: Turn & Talk with Cold Call follow-up

Script:
\u2022 "Turn to your partner. Share one specific time someone supported you emotionally, or you supported someone else. What did they say or do? You have 60 seconds each."
\u2022 After 2 minutes: "Freeze. I\u2019m going to ask some pairs to share."
\u2022 Cold Call 2\u20133 pairs: "[Name], what did your partner share?"
\u2022 Scan for: students naming specific actions (listened, sat with me, said something kind) rather than vague answers ("they were nice").

PROCEED (if \u226580% demonstrate understanding):
\u2022 Students can describe specific emotional support actions \u2014 move to the Emotion Cards activity.

PIVOT (if <80% demonstrate understanding):
\u2022 Most likely misconception: students are thinking of physical help (carrying books, sharing food) rather than emotional support. They may not distinguish between practical help and emotional support.
\u2022 Reteach: "There\u2019s a difference between helping someone carry their bag \u2014 that\u2019s practical support \u2014 and sitting with someone who\u2019s upset and listening to them \u2014 that\u2019s emotional support. Emotional support is about feelings. Can someone give me a new example that\u2019s about feelings?"
\u2022 Re-check with 2 more Cold Called pairs sharing. If \u226580% now correct, proceed.

**TEACHER NOTES:**
This activation of prior knowledge serves two purposes: (1) it connects the abstract concept of "emotional support" to students\u2019 lived experiences, making it tangible; (2) it establishes the emotional register for the session \u2014 sharing personal examples builds vulnerability and trust. The Turn & Talk structure ensures every student processes the question, not just the confident hand-raisers. Cold Calling after partner sharing is lower-stakes because students report their partner\u2019s idea, not their own. General: Review / Activation of Prior Knowledge | VTLM 2.0: Retention and Recall.

**MISCONCEPTIONS:**
\u2022 Misconception: Emotional support means solving someone\u2019s problem for them.
  Why: Students often conflate "helping" with "fixing." Media and cultural narratives reinforce the idea that support = making the problem go away.
  Impact: If uncorrected, students may feel inadequate when they can\u2019t solve a friend\u2019s problem, or they may overstep boundaries by trying to "fix" rather than listen.
  Quick correction: "Sometimes the best support isn\u2019t solving the problem \u2014 it\u2019s just being there. Listening is one of the most powerful forms of emotional support."

**WATCH FOR:**
\u2022 Students who share very personal or distressing examples \u2014 gently affirm ("Thank you for sharing that") and move on without probing. Follow up privately if needed.
\u2022 Students who can\u2019t think of an example \u2014 prompt with: "Have you ever had a bad day and someone noticed? What did they do?"
\u2022 Readiness signal: Most pairs can name a specific action (listened, asked if I was OK, sat with me) rather than a vague "they helped me."

[General: Review / Activation of Prior Knowledge | VTLM 2.0: Retention and Recall, Enabling Learning]`;

const NOTES_EMOTION_CARDS = `**SAY:**
\u2022 "Now we\u2019re going to practise recognising emotions in others \u2014 because the first step to supporting someone is knowing how they feel."
\u2022 "I\u2019m going to give each of you an Emotion Card. DO NOT show your card to anyone else."
\u2022 "Your job is to show the class what your emotion looks like \u2014 using your face, your body, your voice \u2014 WITHOUT saying the name of the emotion. The class will try to guess."
\u2022 "Let me show you what I mean." (Model: demonstrate \u2018frustrated\u2019 \u2014 cross arms, sigh, furrow brow. Ask: "What emotion am I showing?" [Frustrated.])

**DO:**
\u2022 Distribute one Emotion Card to each student (face down).
\u2022 Model the activity yourself first \u2014 choose an emotion not on the cards. Demonstrate with full body language for 10 seconds, then have the class guess.
\u2022 Select 5\u20136 students to present (choose a mix \u2014 not just the confident ones). Each student gets 15\u201320 seconds.
\u2022 After each guess, ask: "What did you notice that told you it was [emotion]? What body language clues did you see?"

**CFU CHECKPOINT:**
Technique: Choral Response with probing follow-up

Script:
\u2022 After 3\u20134 students have presented: "When [student name] showed their emotion, many of you guessed correctly. I want to check \u2014 everyone, on three, tell me: what is the FIRST step in supporting someone emotionally? One, two, three\u2014" [Expected choral response: recognise/notice how they feel.]
\u2022 Probe: Cold Call one student \u2014 "[Name], why is recognising the emotion the first step? What happens if you try to help someone but you don\u2019t know how they feel?" [Expected: you might say the wrong thing / your help might not match what they need.]

PROCEED (if \u226580% demonstrate understanding):
\u2022 Students articulate that recognising emotions is the first step \u2014 move to the CFU scenario check.

PIVOT (if <80% demonstrate understanding):
\u2022 Most likely cause: students can guess emotions in the game but haven\u2019t connected this to the bigger idea \u2014 that recognising emotions is a SKILL for supporting others, not just a guessing game.
\u2022 Reteach: "This isn\u2019t just a game \u2014 this is a real skill. When you walk into the playground and your friend is sitting alone with their head down, what you just practised \u2014 reading their body language \u2014 is exactly how you know they need support. Let me show you another example." (Re-model with a new emotion, then explicitly narrate: "I can see slumped shoulders, looking down \u2014 this person might be feeling sad or lonely. Now I know to go over and check in.")
\u2022 Re-check: "On your fingers, show me: how many clues should you look for before deciding how someone feels \u2014 one clue, or more than one?" [More than one \u2014 at least 2\u20133 clues.]

**TEACHER NOTES:**
The Emotion Cards activity builds emotional literacy \u2014 the ability to accurately identify emotions in self and others. This is a foundational skill in the Collaborative for Academic, Social, and Emotional Learning (CASEL) framework and sits within the "Social Awareness" domain. The activity is kinaesthetic and performative, which engages students who learn through movement and role-play. By asking "What body language clues did you see?" after each guess, you\u2019re explicitly teaching the skill of reading non-verbal cues \u2014 this is the cognitive content, not just the game.

**ENABLING & EXTENDING:**
ENABLING PROMPT (for students working below the lesson target):
\u2022 Task: Emotion Matching \u2014 give these students a smaller set of 4 basic emotion cards (happy, sad, angry, scared) and have them match each card to a facial expression picture. Focus on identifying the most fundamental emotions before attempting nuanced ones.
\u2022 Extra Notes: Use picture cues showing clear facial expressions. Some students may need to name emotions they personally feel before recognising them in others.

EXTENDING PROMPT (for students working above the lesson target):
\u2022 Task: Mixed Emotions \u2014 challenge these students to demonstrate TWO emotions at once (e.g., excited but nervous, happy but tired) and have a partner identify both. Discuss how people often feel multiple emotions simultaneously and why this makes recognising emotions harder.

**WATCH FOR:**
\u2022 Students who make fun of others\u2019 performances \u2014 intervene immediately: "In this space, we support each other. [Name] is being brave by sharing."
\u2022 Students who act out emotions in an exaggerated or silly way \u2014 redirect gently: "Can you show me what this emotion really looks like? Think about a time you actually felt it."
\u2022 Students who guess incorrectly \u2014 validate the attempt: "I can see why you\u2019d think that. What other clues can you look for?"
\u2022 Readiness signal: Students are identifying emotions from body language cues and can articulate what they noticed (not just guessing randomly).

[General: Explicit Instruction (I Do) \u2192 Guided Practice (We Do) | VTLM 2.0: Explicit Explanation, Scaffold Practice]`;

const NOTES_CFU_EMOTIONS = `**SAY:**
\u2022 "I want to check how well you can recognise emotions from body language."
\u2022 Read from slide: "Someone walks into class, slumps into their chair, drops their bag on the floor, and stares out the window without talking to anyone."
\u2022 "On your mini-whiteboard, write down: What emotion might this person be feeling? Write ONE emotion word."
\u2022 After reveal: "The most likely answers are SAD or LONELY \u2014 but some of you may have written different emotions like UPSET or WITHDRAWN, and that\u2019s valid too. The key is that you noticed the body language clues: slumped posture, dropped bag, no eye contact, silence."

**DO:**
\u2022 Read the scenario slowly and clearly. Pause after each clue (slumps\u2026 drops bag\u2026 stares\u2026).
\u2022 Give students 15 seconds to write on their whiteboards.
\u2022 "Boards up on three. One, two, three."
\u2022 Scan the room quickly. Note the range of responses.
\u2022 Click to next slide to reveal the answer after students have responded.

**TEACHER NOTES:**
This CFU checks whether students can transfer the emotion recognition skill from the structured card activity to a realistic scenario. The scenario deliberately uses multiple body language cues (posture, action with bag, gaze, social withdrawal) to give students rich data. Accept a range of valid emotion labels \u2014 the goal is not to name the "right" emotion but to demonstrate the skill of reading non-verbal cues.

**WATCH FOR:**
\u2022 Students who write vague responses like "bad" or "not happy" \u2014 prompt for specificity: "Can you be more precise? What specific emotion?"
\u2022 Students who focus on one cue only \u2014 encourage pattern-reading: "You\u2019re right that staring out the window might mean bored. But what do ALL the clues together tell you?"
\u2022 Readiness signal: \u226580% of boards show a specific, plausible emotion word (sad, lonely, upset, disappointed, withdrawn).

[General: Monitor Progress | VTLM 2.0: Monitor Progress]`;

const NOTES_SCENARIO = `**SAY:**
\u2022 "Now that you can recognise emotions, let\u2019s practise the next step \u2014 actually offering support."
\u2022 "Each group is going to get a Scenario Card describing a situation where someone needs emotional support."
\u2022 Read from slide the three steps: "First: Read your scenario card together as a group. Next: Brainstorm what you could say or do to help. Then: Choose your best idea to share with the class."
\u2022 "You have 3 minutes. Go."

**DO:**
\u2022 Distribute one Scenario Card per group (groups of 3\u20134).
\u2022 Set a visible timer for 3 minutes.
\u2022 Circulate to each group \u2014 listen to their brainstorming, prompt with: "What could you SAY to this person? What could you DO?"
\u2022 At 2 minutes, give a 1-minute warning: "You should be choosing your best idea now."
\u2022 After 3 minutes: "Freeze. Each group will share in 30 seconds or less."

**CFU CHECKPOINT:**
Technique: Cold Call (group representative)

Script:
\u2022 After groups share: Cold Call one group NOT yet heard from \u2014 "[Group], read your scenario and share your best support strategy."
\u2022 Follow-up probe to class: "Raise your hand if you think [Group\u2019s strategy] would actually help that person feel supported. Why?" Cold Call one student to explain.
\u2022 Scan for: groups naming specific actions (listen, sit with them, ask how they feel, tell a teacher) rather than vague "be nice to them."

PROCEED (if \u226580% demonstrate understanding):
\u2022 Groups can articulate specific, appropriate support strategies \u2014 move to the Finger Voting check.

PIVOT (if <80% demonstrate understanding):
\u2022 Most likely cause: students suggest practical solutions ("tell a teacher", "study harder next time") but not emotional support actions (listening, validating feelings, being present).
\u2022 Reteach: "I\u2019m hearing great practical ideas, but remember \u2014 emotional support is about feelings first. Before you solve the problem, you acknowledge the feeling. Try this formula: \u2018I can see you\u2019re feeling [emotion]. That must be really [hard/frustrating/scary]. I\u2019m here for you.\u2019 Who can try that with their scenario?"
\u2022 Model with one scenario: "Your friend failed a test. Instead of \u2018You should study harder,\u2019 try: \u2018I can see you\u2019re really disappointed. That must feel awful. Do you want to talk about it?\u2019"
\u2022 Re-check: Ask 2\u20133 groups to revise their response using the formula.

**TEACHER NOTES:**
The Scenario Cards activity bridges from recognition (knowing HOW someone feels) to action (knowing WHAT to do about it). This is the We Do \u2192 You Do transition \u2014 groups scaffold each other while the teacher circulates. The scenarios are designed to be relatable to Year 5/6 students: peer conflict, academic disappointment, social exclusion, loss. The sharing component builds collective understanding \u2014 students hear multiple strategies and can add to their own repertoire. The instruction to choose their "best idea" forces evaluation and prioritisation, a higher-order thinking skill.

**ENABLING & EXTENDING:**
ENABLING PROMPT (for students working below the lesson target):
\u2022 Task: Sentence Starter Support \u2014 give these students a sentence starter card: "I can see you\u2019re feeling ___. I could help by ___." They fill in the blanks for their scenario rather than brainstorming freely. This scaffolds the language of emotional support.
\u2022 Extra Notes: Pair these students with a supportive peer. The scaffold reduces the cognitive load of generating language while keeping the empathy focus.

EXTENDING PROMPT (for students working above the lesson target):
\u2022 Task: Complex Scenarios \u2014 give these students a scenario with conflicting emotions (e.g., "Your friend is angry because they weren\u2019t picked for the team, but they\u2019re also embarrassed because they cried in front of everyone"). Challenge them to address BOTH emotions in their support strategy and explain why acknowledging multiple feelings matters.

**MISCONCEPTIONS:**
\u2022 Misconception: Being a good friend means always agreeing with how someone feels or telling them everything will be OK.
  Why: Students learn from media and adults that "making someone feel better" means cheering them up or dismissing negative emotions ("Don\u2019t worry, it\u2019ll be fine!").
  Impact: If uncorrected, students may invalidate peers\u2019 feelings or avoid difficult conversations. This undermines genuine emotional support.
  Quick correction: "Sometimes the kindest thing you can say is NOT \u2018Don\u2019t worry, it\u2019ll be fine.\u2019 Sometimes it\u2019s \u2018That sounds really hard. I\u2019m here.\u2019 You don\u2019t have to fix the feeling \u2014 just show you understand it."

**WATCH FOR:**
\u2022 Groups that jump straight to "tell a teacher" without considering peer-to-peer support \u2014 prompt: "That\u2019s a good backup plan. But what could YOU do first, before involving an adult?"
\u2022 Groups where one student dominates \u2014 redirect: "I want to hear from everyone. [Quieter student], what\u2019s your idea?"
\u2022 Students who suggest unhelpful strategies (e.g., "Just ignore it," "Toughen up") \u2014 challenge respectfully: "How would YOU feel if someone said that to you when you were upset?"
\u2022 Readiness signal: Groups can name specific emotional support actions (listen, validate, be present) and can distinguish these from practical solutions.

[General: Guided Practice (We Do) \u2192 Independent Practice (You Do) | VTLM 2.0: Scaffold Practice, Supported Application]`;

const NOTES_CFU_FINGER = `**SAY:**
\u2022 "One more check before we reflect."
\u2022 Read from slide: "What is the most important thing you can do when someone is struggling emotionally?"
\u2022 "I\u2019m going to give you four choices. When I say \u2018Go,\u2019 hold up the number of fingers that matches your answer."
\u2022 Read the four options from the slide.
\u2022 "Think\u2026 Go!"
\u2022 After reveal: "The best answer is TWO \u2014 listen and show you care. Let me explain why the others fall short\u2026"
\u2022 "One: Telling someone to cheer up dismisses their feelings. Three: Solving their problem skips the emotional step \u2014 they might just need to be heard. Four: Leaving them alone might make them feel more isolated."

**DO:**
\u2022 Display the question and options. Give students 5 seconds of think time.
\u2022 Say "Go" and scan the room immediately. Count fingers quickly.
\u2022 Click to next slide to reveal the answer after students have responded.
\u2022 Briefly address each wrong option using the explanations in SAY.

**TEACHER NOTES:**
This Finger Voting CFU assesses whether students have grasped the core message: emotional support is primarily about listening and caring presence, not problem-solving or dismissing feelings. The distractors are deliberate: Option 1 is toxic positivity (common in student culture), Option 3 is the "fixer" trap, Option 4 is avoidance. Each wrong option represents a genuine misconception about emotional support. The debrief of wrong options is as valuable as confirming the right answer.

**WATCH FOR:**
\u2022 Students choosing Option 1 (cheer up) \u2014 this is the most common misconception. Many students have been taught that positivity is always helpful.
\u2022 Students choosing Option 3 (solve the problem) \u2014 these students have good intentions but need to learn that emotional support comes before practical solutions.
\u2022 Readiness signal: \u226580% hold up two fingers.

[General: Monitor Progress (Check for Understanding) | VTLM 2.0: Monitor Progress]`;

const NOTES_REFLECTION = `**SAY:**
\u2022 "We\u2019ve learned a lot today about emotional support and empathy. Now I want you to reflect."
\u2022 Read from slide the two prompts: "What is one new thing you learned today about supporting others?" and "What is one way you plan to show support to someone this week?"
\u2022 "Take 30 seconds to think, then share with your partner."
\u2022 After sharing: "Let\u2019s hear from a few people. Who wants to share their commitment?" (Invite 3\u20134 volunteers.)
\u2022 "Remember \u2014 caring for others doesn\u2019t just help THEM. Research shows that when we support others, we feel happier and more connected ourselves. Kindness is a two-way street."

**DO:**
\u2022 Give 30 seconds silent think time.
\u2022 Set timer for 1 minute of partner discussion.
\u2022 Invite 3\u20134 volunteers to share their commitment with the whole class.
\u2022 If time permits, write 2\u20133 key commitments on the board as a visual anchor.

**TEACHER NOTES:**
The reflection serves two purposes: (1) metacognition \u2014 students process and consolidate what they learned; (2) commitment to action \u2014 the "one way I will show support" prompt bridges from classroom learning to real-world application. Research on prosocial behaviour (Layous et al., 2012) shows that public commitment to acts of kindness increases follow-through. The partner sharing before whole-class volunteering keeps the bar low \u2014 every student reflects, even if not every student shares publicly.

**WATCH FOR:**
\u2022 Students who give generic commitments ("be nice") \u2014 prompt for specificity: "That\u2019s great. What does \u2018being nice\u2019 look like? Give me one specific action."
\u2022 Students who seem reluctant to share \u2014 don\u2019t force it. The partner sharing already achieved the learning goal.
\u2022 Readiness signal: Students can articulate a specific, actionable commitment (not just "be kind" but "check on my friend if they look sad at recess").

[General: Review / Reflection | VTLM 2.0: Monitor Progress and Feedback, Enabling Learning]`;

const NOTES_CLOSING = `**SAY:**
\u2022 "Turn to your partner one more time. Here\u2019s your final discussion question\u2026"
\u2022 Read from slide: "How does supporting someone else actually help YOU?"
\u2022 "Share your thinking with your partner. 60 seconds."
\u2022 After sharing: Cold Call 2 students to share.
\u2022 "Remember our key takeaways from today\u2026" (Point to each takeaway on screen.)
\u2022 "Kasey the Kind Kangaroo reminds us: \u2018Caring connects us.\u2019 That\u2019s not just a nice saying \u2014 it\u2019s backed by science. When you care for others, your brain releases chemicals that make YOU feel good too. Kindness is literally good for your health."

**DO:**
\u2022 Set a 60-second timer for the Turn & Talk.
\u2022 Cold Call 2 students to share after the discussion.
\u2022 Read the key takeaways aloud, pointing to each one.
\u2022 End on a positive, warm note. Smile.

**TEACHER NOTES:**
The closing slide connects the session\u2019s learning to the broader evidence base on wellbeing. The "How does supporting someone else help YOU?" question introduces the concept of helper\u2019s high \u2014 the documented phenomenon where prosocial behaviour increases the helper\u2019s own wellbeing (Post, 2005). This reframes kindness from altruistic obligation ("you should be nice") to mutually beneficial action ("caring is good for everyone, including you"). This is a powerful motivator for Year 5/6 students who are developing their sense of identity and social positioning.

**WATCH FOR:**
\u2022 Students who think caring is purely selfless \u2014 validate this but extend: "It IS generous to care for others. AND it turns out it helps us too. Both things can be true."
\u2022 Readiness signal: Students leave the session with a sense of purpose and a specific commitment for the week.

[General: Post-Lesson Reflection | VTLM 2.0: Retention and Recall, Enabling Learning]`;

const NOTES_RESOURCES = `**SAY:**
\u2022 "Before the session, make sure you\u2019ve printed the Emotion Cards and Scenario Cards. Click the links on this slide to open the PDFs."

**DO:**
\u2022 Print one set of Emotion Cards per class (12 cards \u2014 one per student, recycle across groups if class is larger).
\u2022 Print one set of Scenario Cards per class (6 cards \u2014 one per group of 3\u20134).
\u2022 Cut cards along the dashed lines before the session.

**TEACHER NOTES:**
This is a preparation slide for teachers. Both PDFs are in the same folder as this PPTX file. Click the hyperlinks to open and print. The Emotion Cards have 12 emotions suitable for Year 5/6 students, including nuanced emotions like \u2018frustrated,\u2019 \u2018anxious,\u2019 and \u2018grateful.\u2019 The Scenario Cards have 6 relatable scenarios covering peer conflict, academic disappointment, social exclusion, and loss.

**WATCH FOR:**
\u2022 Ensure all cards are cut and sorted before the session begins. Fumbling with materials during a wellbeing session breaks the emotional tone.

[General: Planning \u2014 Preparation | VTLM 2.0: Planning]`;

// ─────────────────────────────────────────────────────────────────────────────
// Slide content data
// ─────────────────────────────────────────────────────────────────────────────

const EMOTIONS = [
  { name: "Happy",       prompt: "Show what JOY looks like" },
  { name: "Sad",         prompt: "Show what SADNESS looks like" },
  { name: "Frustrated",  prompt: "Show what FRUSTRATION looks like" },
  { name: "Excited",     prompt: "Show what EXCITEMENT looks like" },
  { name: "Anxious",     prompt: "Show what WORRY looks like" },
  { name: "Lonely",      prompt: "Show what LONELINESS looks like" },
  { name: "Proud",       prompt: "Show what PRIDE looks like" },
  { name: "Confused",    prompt: "Show what CONFUSION looks like" },
  { name: "Grateful",    prompt: "Show what GRATITUDE looks like" },
  { name: "Surprised",   prompt: "Show what SURPRISE looks like" },
  { name: "Embarrassed", prompt: "Show what EMBARRASSMENT looks like" },
  { name: "Hopeful",     prompt: "Show what HOPE looks like" },
];

const SCENARIOS = [
  "Your friend just failed an important test. They look really upset and don\u2019t want to talk to anyone at lunch.",
  "A new student has started at your school. They\u2019re sitting alone at recess and no one has spoken to them yet.",
  "You overhear someone teasing a classmate about their clothes. The classmate looks like they\u2019re about to cry.",
  "Your friend wasn\u2019t invited to a birthday party that most of the class is going to. They found out and are feeling left out.",
  "A classmate tells you their pet passed away over the weekend. They can barely hold back tears.",
  "Your teammate made a mistake that lost the game for your team. Now they won\u2019t talk to anyone and look devastated.",
];

// ─────────────────────────────────────────────────────────────────────────────
// PDF generation: Emotion Cards
// ─────────────────────────────────────────────────────────────────────────────

async function generateEmotionCards() {
  const doc = createPdf({ title: "Emotion Cards" });

  let y = addPdfHeader(doc, "Emotion Cards", {
    subtitle: "Cut along the dashed lines. One card per student.",
    color: C.BUSH,
    showNameDate: false,
    lessonInfo: "Session 1 | Kasey the Kind Kangaroo | Year 5/6 Wellbeing",
  });

  y = addTipBox(doc, "Instructions: Distribute one card per student. Students express the emotion using facial expressions, body language, and tone of voice \u2014 WITHOUT saying the emotion word. The class guesses the emotion.", y, { color: C.TEAL });

  const cols  = 3;
  const gap   = 8;
  const cardW = Math.floor((PAGE.CONTENT_W - gap * (cols - 1)) / cols);
  const cardH = 125;
  const rows  = 4;

  EMOTIONS.forEach((emo, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx  = PAGE.MARGIN + col * (cardW + gap);
    const cy  = y + row * (cardH + gap);

    // Page break if needed
    if (cy + cardH > PAGE.H - PAGE.MARGIN - 30) {
      doc.addPage();
      y = PAGE.MARGIN;
      return; // skip this iteration, will need recalculation
    }

    // Dashed border
    doc.save();
    doc.roundedRect(cx, cy, cardW, cardH, 5)
      .dash(4, { space: 3 })
      .strokeColor("#AAAAAA").lineWidth(0.5).stroke();
    doc.undash();
    doc.restore();

    // Coloured header
    doc.save();
    doc.roundedRect(cx + 3, cy + 3, cardW - 6, 28, 3).fill(hex(C.BUSH));
    doc.fontSize(13).font("Helvetica-Bold").fillColor("#FFFFFF");
    doc.text(emo.name, cx + 3, cy + 9, { width: cardW - 6, align: "center" });
    doc.restore();

    // Prompt
    doc.fontSize(9).font("Helvetica").fillColor("#333333");
    doc.text(emo.prompt, cx + 8, cy + 40, { width: cardW - 16, align: "center" });

    // Decorative heart icon (small)
    doc.save();
    doc.fontSize(18).fillColor(hex(lighten(C.CORAL, 0.3).replace("#", "")));
    doc.text("\u2665", cx + cardW / 2 - 8, cy + cardH - 32, { width: 16, align: "center" });
    doc.restore();
  });

  addPdfFooter(doc, "Kasey the Kind Kangaroo | Session 1 | Emotion Cards | Year 5/6 Wellbeing");
  await writePdf(doc, OUT_DIR + "/Emotion_Cards.pdf");
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF generation: Scenario Cards
// ─────────────────────────────────────────────────────────────────────────────

async function generateScenarioCards() {
  const doc = createPdf({ title: "Scenario Cards" });

  let y = addPdfHeader(doc, "Scenario Cards", {
    subtitle: "Cut along the dashed lines. One card per group.",
    color: C.BUSH,
    showNameDate: false,
    lessonInfo: "Session 1 | Kasey the Kind Kangaroo | Year 5/6 Wellbeing",
  });

  y = addTipBox(doc, "Instructions: Give one card to each group of 3\u20134 students. Groups read the scenario, brainstorm ways to offer emotional support, then share their best idea with the class.", y, { color: C.TEAL });

  const cols  = 2;
  const gap   = 10;
  const cardW = Math.floor((PAGE.CONTENT_W - gap * (cols - 1)) / cols);
  const cardH = 180;
  const headerH = 30;
  const cardColors = [C.BUSH, C.TEAL, C.OCHRE, C.CORAL, C.SAGE, C.BUSH];

  SCENARIOS.forEach((scenario, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx  = PAGE.MARGIN + col * (cardW + gap);
    const cy  = y + row * (cardH + gap);

    if (cy + cardH > PAGE.H - PAGE.MARGIN - 30) {
      doc.addPage();
      y = PAGE.MARGIN;
      return;
    }

    const color = cardColors[i % cardColors.length];

    // Dashed border
    doc.save();
    doc.roundedRect(cx, cy, cardW, cardH, 5)
      .dash(5, { space: 3 })
      .strokeColor("#AAAAAA").lineWidth(0.5).stroke();
    doc.undash();
    doc.restore();

    // Coloured header
    doc.save();
    doc.roundedRect(cx + 3, cy + 3, cardW - 6, headerH, 3).fill(hex(color));
    doc.fontSize(11).font("Helvetica-Bold").fillColor("#FFFFFF");
    doc.text("Scenario " + (i + 1), cx + 3, cy + 10, { width: cardW - 6, align: "center" });
    doc.restore();

    // Scenario text
    doc.fontSize(10).font("Helvetica").fillColor("#2C2C2C");
    doc.text(scenario, cx + 10, cy + headerH + 10, { width: cardW - 20 });

    // Discussion prompt
    const promptY = cy + cardH - 40;
    doc.save();
    doc.rect(cx + 8, promptY, cardW - 16, 0.5).fill(hex(lighten(color, 0.5).replace("#", "")));
    doc.restore();
    doc.fontSize(8).font("Helvetica-BoldOblique").fillColor(hex(color));
    doc.text("Discuss: What could you say or do to support this person?", cx + 10, promptY + 5, { width: cardW - 20 });
  });

  addPdfFooter(doc, "Kasey the Kind Kangaroo | Session 1 | Scenario Cards | Year 5/6 Wellbeing");
  await writePdf(doc, OUT_DIR + "/Scenario_Cards.pdf");
}

// ─────────────────────────────────────────────────────────────────────────────
// Main build
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // Pre-render icons
  const heartIcon    = await iconToBase64Png(FaHeart, "#FFFFFF");
  const usersIcon    = await iconToBase64Png(FaUsers, "#FFFFFF");
  const handsIcon    = await iconToBase64Png(FaHandsHelping, "#FFFFFF");
  const commentsIcon = await iconToBase64Png(FaComments, "#FFFFFF");
  const smileIcon    = await iconToBase64Png(FaSmile, "#FFFFFF");
  const bulbIcon     = await iconToBase64Png(FaLightbulb, "#FFFFFF");
  const starIcon     = await iconToBase64Png(FaStar, "#FFFFFF");
  const checkIcon    = await iconToBase64Png(FaCheckCircle, "#FFFFFF");

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Generated Resource";
  pres.title  = "Caring Connects Us \u2014 Kasey the Kind Kangaroo Session 1";

  // ── Slide 1: Title ──────────────────────────────────────────────────────
  const s1 = titleSlide(
    pres,
    "Caring Connects Us",
    "Kasey the Kind Kangaroo \u2014 Session 1",
    "Term 1  |  Year 5/6 Wellbeing  |  20 Minutes",
    NOTES_TITLE
  );
  // Heart icon on title slide
  addIconCircle(s1, heartIcon, 8.8, 2.3, 0.4, C.CORAL);

  // ── Slide 2: Learning Intention & Success Criteria ──────────────────────
  liSlide(
    pres,
    [
      "We are learning about the importance of offering and receiving emotional support.",
      "We are learning to practise empathy by understanding and respecting others\u2019 feelings.",
    ],
    [
      "Explain what emotional support means and why it matters.",
      "Identify emotions in others using body language clues.",
      "Suggest ways to support someone who is struggling.",
      "Describe how caring for others helps our own wellbeing.",
    ],
    NOTES_LI,
    FOOTER
  );

  // ── Slide 3: Discussion — Prior Knowledge ──────────────────────────────
  const s3 = discussionSlide(
    pres,
    "What Does It Mean to Support Someone?",
    [
      "What does it mean to support someone emotionally?",
      "Think about a time when someone supported YOU, or when YOU supported someone else. What did they say or do?",
    ],
    NOTES_DISCUSSION,
    FOOTER
  );
  // Discussion icon
  addIconCircle(s3, commentsIcon, 9.1, 0.42, 0.22, C.TEAL);

  // ── Slide 4: Emotion Cards Activity (We Do) ────────────────────────────
  const s4 = contentSlide(
    pres,
    "We Do", C.TEAL,
    "Emotion Cards \u2014 Recognising Feelings",
    null, // no bullets — visual content only (CLT compliant)
    NOTES_EMOTION_CARDS,
    FOOTER,
    (slide) => {
      // Left card: rule/constraint
      addCard(slide, 0.5, CONTENT_TOP, 4.8, SAFE_BOTTOM - CONTENT_TOP, { strip: C.TEAL, fill: C.WHITE });

      // Icon
      addIconCircle(slide, smileIcon, 2.9, CONTENT_TOP + 0.65, 0.35, C.OCHRE);

      // Key rule
      slide.addText("Express your emotion\nusing body language only!", {
        x: 0.75, y: CONTENT_TOP + 1.15, w: 4.3, h: 0.8,
        fontSize: 18, fontFace: FONT_H, color: C.BUSH, bold: true,
        align: "center", valign: "top", margin: 0,
      });

      // Sub-points with icons
      const tips = [
        { icon: "\uD83D\uDE10", text: "Use your FACE" },
        { icon: "\uD83E\uDDD1", text: "Use your BODY" },
        { icon: "\uD83D\uDDE3\uFE0F", text: "Use your VOICE" },
      ];
      tips.forEach((tip, i) => {
        const ty = CONTENT_TOP + 2.15 + i * 0.55;
        slide.addShape("roundRect", {
          x: 1.0, y: ty, w: 3.8, h: 0.44, rectRadius: 0.08,
          fill: { color: C.PARCHMENT },
        });
        slide.addText(tip.text, {
          x: 1.0, y: ty, w: 3.8, h: 0.44,
          fontSize: 15, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
      });

      // Right card: "No words!" rule
      addCard(slide, 5.5, CONTENT_TOP, 4.0, SAFE_BOTTOM - CONTENT_TOP, { fill: C.BUSH });

      addIconCircle(slide, heartIcon, 7.5, CONTENT_TOP + 0.65, 0.35, C.CORAL);

      slide.addText("The class guesses\nyour emotion!", {
        x: 5.7, y: CONTENT_TOP + 1.15, w: 3.6, h: 0.7,
        fontSize: 17, fontFace: FONT_H, color: C.WHITE, bold: true,
        align: "center", valign: "top", margin: 0,
      });

      // Key insight
      slide.addShape("roundRect", {
        x: 5.8, y: CONTENT_TOP + 2.1, w: 3.4, h: 1.2, rectRadius: 0.08,
        fill: { color: C.TEAL },
      });
      slide.addText("Recognising emotions in others is the FIRST STEP to offering support.", {
        x: 5.9, y: CONTENT_TOP + 2.15, w: 3.2, h: 1.1,
        fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });

      // Bottom reminder
      slide.addShape("roundRect", {
        x: 5.8, y: CONTENT_TOP + 3.5, w: 3.4, h: 0.42, rectRadius: 0.08,
        fill: { color: C.OCHRE },
      });
      slide.addText("Look for clues: face, posture, voice", {
        x: 5.8, y: CONTENT_TOP + 3.5, w: 3.4, h: 0.42,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
    }
  );

  // ── Slide 5: CFU — Emotion Recognition (withReveal) ────────────────────
  withReveal(
    () => cfuSlide(
      pres,
      "CFU",
      "Can You Read the Clues?",
      "Show Me Boards",
      "Someone walks into class, slumps into their chair, drops their bag on the floor, and stares out the window without talking to anyone.\n\nWhat emotion might this person be feeling?",
      NOTES_CFU_EMOTIONS,
      FOOTER
    ),
    (slide) => {
      // Cream overlay to cleanly cover any text below the reveal area
      slide.addShape("rect", {
        x: 0.57, y: 4.0, w: 8.86, h: 1.05,
        fill: { color: C.CREAM },
      });
      addTextOnShape(slide, "Most likely: SAD or LONELY", {
        x: 2.5, y: 4.08, w: 5.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.TEAL },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      slide.addText("Clues: slumped posture \u2022 dropped bag \u2022 no eye contact \u2022 silence", {
        x: 1.5, y: 4.64, w: 7.0, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED, align: "center", margin: 0, italic: true,
      });
    }
  );

  // ── Slide 6: Scenario Cards Activity (We Do → You Do) ──────────────────
  taskSlide(
    pres,
    "We Do",
    "Scenario Cards \u2014 Supporting Others",
    [
      { label: "First",  instruction: "Read your scenario card together as a group." },
      { label: "Next",   instruction: "Brainstorm what you could SAY or DO to help the person in your scenario." },
      { label: "Then",   instruction: "Choose your group\u2019s BEST idea to share with the class." },
    ],
    NOTES_SCENARIO,
    FOOTER
  );

  // ── Slide 7: CFU — Finger Voting (withReveal) ──────────────────────────
  withReveal(
    () => cfuSlide(
      pres,
      "CFU",
      "What Matters Most?",
      "Finger Voting",
      "What is the most important thing you can do when someone is struggling emotionally?\n\n" +
      "1.  Tell them to cheer up\n" +
      "2.  Listen to them and show you care\n" +
      "3.  Solve their problem for them\n" +
      "4.  Leave them alone to figure it out",
      NOTES_CFU_FINGER,
      FOOTER
    ),
    (slide) => {
      // Cream overlay to cleanly cover the bottom area before reveal
      slide.addShape("rect", {
        x: 0.57, y: 4.0, w: 8.86, h: 1.05,
        fill: { color: C.CREAM },
      });
      addTextOnShape(slide, "\u2714  Listen and show you care", {
        x: 2.5, y: 4.08, w: 5.0, h: 0.5, rectRadius: 0.08,
        fill: { color: C.BUSH },
      }, {
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
      });
      slide.addText("Emotional support starts with LISTENING, not fixing.", {
        x: 1.5, y: 4.64, w: 7.0, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED, align: "center", margin: 0, italic: true,
      });
    }
  );

  // ── Slide 8: Reflection ─────────────────────────────────────────────────
  const s8 = discussionSlide(
    pres,
    "Reflect & Commit",
    [
      "What is one new thing you learned today about supporting others?",
      "What is one way you plan to show support to someone this week?",
    ],
    NOTES_REFLECTION,
    FOOTER
  );
  addIconCircle(s8, bulbIcon, 9.1, 0.42, 0.22, C.OCHRE);

  // ── Slide 9: Closing ───────────────────────────────────────────────────
  closingSlide(
    pres,
    "How does supporting someone else actually help YOU?",
    [
      "Recognising emotions is the first step to offering support.",
      "Emotional support means listening and showing you care.",
      "Caring for others helps THEM and makes US feel happier too.",
      "Kindness is a two-way street \u2014 caring connects us all.",
    ],
    NOTES_CLOSING
  );

  // ── Slide 10: Resources ────────────────────────────────────────────────
  addResourceSlide(
    pres,
    [
      {
        name: "Emotion Cards",
        fileName: "Emotion_Cards.pdf",
        description: "12 printable emotion cards for the class activity. Cut along dashed lines.",
      },
      {
        name: "Scenario Cards",
        fileName: "Scenario_Cards.pdf",
        description: "6 printable scenario cards for group discussion. One per group.",
      },
    ],
    { C: { ...C, NAVY: C.BUSH, CORAL: C.CORAL }, FONT_H, FONT_B },
    FOOTER,
    NOTES_RESOURCES
  );

  // ── Write PPTX ─────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: OUT_DIR + "/Session_Kasey1_Caring_Connects_Us.pptx" });
  console.log("PPTX written to " + OUT_DIR + "/Session_Kasey1_Caring_Connects_Us.pptx");

  // ── Generate PDF resources ──────────────────────────────────────────────
  await generateEmotionCards();
  console.log("PDF written to " + OUT_DIR + "/Emotion_Cards.pdf");

  await generateScenarioCards();
  console.log("PDF written to " + OUT_DIR + "/Scenario_Cards.pdf");

  console.log("\nBuild complete! Output folder: " + OUT_DIR);
}

main().catch(console.error);
