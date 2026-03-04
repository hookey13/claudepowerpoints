// Inquiry — Honesty, Respect, Integrity & Identity Bio-Poems
// Year 5/6 | Combined 1-hour session
// Uses themes/factory.js + themes/pdf_helpers.js

"use strict";

const pptxgen = require("pptxgenjs");
const fs      = require("fs");

const { createTheme, weekToVariant } = require("../themes/factory");

const T = createTheme("inquiry", "grade56", weekToVariant(1));
const {
  C, FONT_H, FONT_B,
  makeShadow, makeCardShadow,
  SLIDE_W, SLIDE_H, SAFE_BOTTOM, CONTENT_TOP,
  iconToBase64Png, getContrastColor, validateContrast,
  addTopBar, addBadge, addTitle, addCard, addFooter, addIconCircle,
  addTextOnShape, withReveal,
  titleSlide, liSlide, contentSlide, cfuSlide, closingSlide,
  investigationSlide, findingsSlide, pairShareSlide,
} = T;

const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addBodyText, addTipBox, addPdfFooter, addLinedArea,
  addTwoColumnOrganiser, PAGE, hex, lighten,
  addResourceSlide,
} = require("../themes/pdf_helpers");

const {
  FaBalanceScale,
  FaHandshake,
  FaUsers,
  FaComments,
  FaTheaterMasks,
  FaPen,
  FaStar,
  FaHeart,
  FaCheckCircle,
} = require("react-icons/fa");

const OUT_DIR = "output/Inquiry_Honesty_Identity";
const FOOTER  = "Inquiry  |  Honesty, Respect, Integrity & Identity  |  Year 5/6";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `**SAY:**
\u2022 "Today we have a jam-packed session that connects two big ideas: how we treat each other with honesty, respect and integrity \u2014 and how our experiences shape who we are."
\u2022 "We\u2019ll start with a game that might surprise you, then explore some real dilemmas, and finish by writing a poem about the most important person in the room \u2014 you."

**DO:**
\u2022 Display this slide as students settle. Allow 10 seconds for the title to land.
\u2022 Have the Honesty Dilemmas PDF and Bio-Poem Template PDF printed and ready (do not distribute yet).
\u2022 Ensure students have their inquiry books or iPads available for Part B.

**TEACHER NOTES:**
This is a combined session drawing together two inquiry lessons: (1) Honesty, Respect & Integrity, and (2) Identity Bio-Poems. The through-line is VALUES \u2014 the first part examines the values of honesty, respect and integrity through ethical dilemmas, and the second part asks students to reflect on the experiences and values that shape their own identity. The combined session runs approximately 60 minutes: ~30 min on honesty/dilemmas, ~30 min on identity/bio-poems. Pacing is tight \u2014 keep transitions sharp. This aligns to the Victorian Curriculum 2.0 Personal and Social Capability and Ethical Capability strands.

**WATCH FOR:**
\u2022 Students who seem anxious about the game \u2014 reassure that it\u2019s a thinking exercise, not a test.
\u2022 Readiness signal: Students are settled, curious, and attentive.

[General: Title \u2014 VTLM 2.0: Enabling Learning]`;

const NOTES_LI = `**SAY:**
\u2022 Read from slide: "I am learning the value of honesty, respect and integrity, and how my experiences have helped to shape my identity."
\u2022 "Look at the success criteria. By the end of today, I want you to be able to tick off each one."
\u2022 Read each SC aloud with students.
\u2022 Ask: "Put your hand up if you can already explain what \u2018integrity\u2019 means." [Diagnostic \u2014 note responses but don\u2019t correct yet. Return to this in Part A.]

**DO:**
\u2022 Point to each SC as you read it.
\u2022 Scan hands for SC1 \u2014 if fewer than 30% raise hands, the vocabulary unpacking in Part A will need more time.
\u2022 Keep this brisk \u2014 no more than 90 seconds on this slide.

**TEACHER NOTES:**
The learning intention combines both parts of the session into one cohesive statement. The five success criteria span both halves: SC1\u20133 target honesty/dilemmas (knowledge, perspective-taking, collaboration), SC4\u20135 target identity/bio-poems (reflection, creative expression). This progressive ordering means every student achieves something \u2014 SC1 is accessible to all; SC5 requires creative application. The LI is pitched in student-friendly language, translating the Victorian Curriculum Ethical Capability and Personal & Social Capability descriptors.

**WATCH FOR:**
\u2022 Students who claim to know all SC already \u2014 probe one: "Explain integrity in your own words." Surface-level confidence is common.
\u2022 Readiness signal: Students have read the SC and are ready to begin the game.

[General: LI/SC \u2014 VTLM 2.0: Explicit Explanation]`;

const NOTES_GAME = `**SAY:**
\u2022 "Right, we\u2019re going to play a quick game. I need everyone to write a number between 1 and 10 on a scrap of paper or whiteboard. Don\u2019t show anyone."
\u2022 "If my number matches yours, you win. Ready?"
\u2022 Allow 15 seconds for writing. Then say confidently: "The number is... 25."
\u2022 Pause. Let the reaction build. Then ask: "Was that fair?"
\u2022 Ask: "How did that make you feel?" [Expected: annoyed, cheated, confused, tricked.]
\u2022 Ask: "Was I being honest? Was I acting with integrity?" [Expected: No \u2014 you changed the rules / you cheated.]
\u2022 "You\u2019re right. I broke the rules of my own game. That\u2019s what it feels like when someone acts without honesty or integrity. Remember that feeling \u2014 we\u2019re going to need it."

**DO:**
\u2022 Distribute scrap paper or have students use mini-whiteboards.
\u2022 Say the number 25 with a straight face \u2014 the reveal is more powerful if you play it seriously.
\u2022 Allow the natural reaction (groans, laughter, protest). Don\u2019t rush past it.
\u2022 Cold call 3\u20134 students for their emotional response.
\u2022 Keep this to 3\u20134 minutes maximum.

**CFU CHECKPOINT:**
Technique: Cold Call with Probing Follow-Up

Script:
\u2022 "Hands down. [Name], was that fair? Why not?"
\u2022 "[Name], was I being honest? What did I do that was dishonest?"
\u2022 "[Name], what does \u2018integrity\u2019 mean based on what just happened? Take a guess." [Expected: doing the right thing / keeping your word / following the rules even when no one is checking.]
\u2022 Scan for: students who connect the feeling of being cheated to the concept of integrity \u2014 this is the hook for the vocabulary slide.

PROCEED (if \u226580% can articulate that saying 25 was unfair/dishonest):
Move to Slide 4 \u2014 vocabulary definitions. Students have the experiential foundation.

PIVOT (if <80% struggle to explain WHY it was unfair):
Most likely issue: Students can say "it\u2019s not fair" but cannot articulate WHY \u2014 they feel it but can\u2019t name the principle.
Reteach: "Let\u2019s slow down. I said pick a number between 1 and 10. What does \u2018between 1 and 10\u2019 mean? [1\u201310.] And I said 25. Is 25 between 1 and 10? [No.] So I broke my own rule. When someone breaks their own rule on purpose, what do we call that?" Guide toward \u2018dishonest\u2019 or \u2018unfair.\u2019 Then proceed.

**TEACHER NOTES:**
This experiential hook is the lesson\u2019s anchor. By FEELING the injustice first, students have an embodied reference point for the abstract vocabulary that follows. This is a classic activate-before-explain sequence \u2014 the experience creates the need for the vocabulary, rather than the other way around. The game also models what dishonesty feels like from the receiving end, which primes empathy for the dilemma discussions that follow. Keep the tone playful, not punitive \u2014 students should laugh about being tricked, not feel anxious.

**MISCONCEPTIONS:**
\u2022 Misconception: "It\u2019s only lying if you say something that\u2019s not true."
  Why: Students often define dishonesty narrowly as verbal lies. They don\u2019t recognise that changing rules, withholding information, or being deceptive through action also counts.
  Impact: In the dilemma discussions, students may struggle to see omission or deception-by-action as dishonest.
  Quick correction: "Was what I said technically a lie? I did say a number. But was it honest? There\u2019s a difference between not lying and being honest."

**WATCH FOR:**
\u2022 Students who say "it\u2019s just a game, who cares" \u2014 redirect: "Imagine it wasn\u2019t a game. Imagine it was a promise someone made to you. How would you feel then?"
\u2022 Students who immediately connect it to real-life situations \u2014 affirm and bank these: "Hold that thought \u2014 we\u2019re going to explore real situations just like that."
\u2022 Readiness signal: Students can name that saying 25 was dishonest and unfair, and are emotionally engaged.

[General: Review / Prior Knowledge Activation \u2014 VTLM 2.0: Retention & Recall]`;

const NOTES_VOCAB = `**SAY:**
\u2022 "Let\u2019s lock in three words we\u2019ll use for the rest of this session."
\u2022 Point to HONESTY: "Being truthful and transparent. Not just avoiding lies \u2014 being open and genuine. Think about the game \u2014 I avoided a direct lie, but I was still dishonest."
\u2022 Point to RESPECT: "Treating others the way they deserve to be treated \u2014 listening, valuing their ideas, even when you disagree."
\u2022 Point to INTEGRITY: "This is the big one. Integrity means doing the right thing even when no one is watching. It\u2019s your inner compass. If honesty is what you SAY, integrity is what you DO."
\u2022 Ask: "Which of these three do you think is the hardest to practise? Turn and tell your partner." [No single right answer \u2014 the discussion matters more than the answer.]

**DO:**
\u2022 Write HONESTY, RESPECT, INTEGRITY on the board as well as showing on screen \u2014 students will reference these throughout the session.
\u2022 Allow 60 seconds for Turn & Talk.
\u2022 Take 2\u20133 responses. Probe: "Why did you choose that one?"

**TEACHER NOTES:**
These three values form the ethical framework for the dilemma activity that follows. Defining them explicitly before the dilemmas ensures students have shared language for their discussions. The distinction between honesty (truthfulness) and integrity (consistent ethical behaviour) is subtle but important \u2014 many students conflate the two. The game hook gives them an experiential anchor for each term. This slide is the EXPLICIT INSTRUCTION phase of the General checklist \u2014 new vocabulary is introduced with clear definitions and examples before students are asked to apply it.

**WATCH FOR:**
\u2022 Students who define respect as "being nice" \u2014 push deeper: "Can you respect someone you disagree with? How?"
\u2022 Students who can\u2019t distinguish honesty from integrity \u2014 use the anchor: "Honesty is telling the truth when asked. Integrity is telling the truth even when nobody asks."
\u2022 Readiness signal: Students can offer a definition of each word in their own language and are ready to apply them to dilemmas.

[General: Explicit Instruction \u2014 I Do | VTLM 2.0: Explicit Explanation]`;

const NOTES_DILEMMA_INTRO = `**SAY:**
\u2022 "Remember from our previous lesson \u2014 a dilemma is a problem where BOTH outcomes are undesirable. There\u2019s no easy answer."
\u2022 Ask: "Who can remind us what a dilemma is?" [Expected: a problem where both choices have downsides / a situation where there\u2019s no perfect answer.]
\u2022 "Today you\u2019ll face honesty dilemmas \u2014 situations where telling the truth might hurt someone, and lying might protect them. There\u2019s no obvious right answer. That\u2019s what makes them dilemmas."
\u2022 Read the first scenario aloud from the Honesty Dilemmas sheet.

**DO:**
\u2022 Distribute the Honesty Dilemmas PDF (one per student or one per pair).
\u2022 Read the first scenario aloud clearly \u2014 students follow along.
\u2022 Allow 60 seconds for Turn & Talk after reading.
\u2022 Ask: "Was it easy or difficult to make a decision? Why?" Take 2\u20133 responses.

**CFU CHECKPOINT:**
Technique: Turn & Talk with Targeted Follow-Up

Script:
\u2022 "Turn to your partner. What would you do in this situation? You have 60 seconds."
\u2022 After: "Hands down. [Name], what did your pair decide? Was it easy or hard?"
\u2022 Follow up: "What made it hard?" [Expected: both options had problems / someone gets hurt either way.]
\u2022 Scan for: students who recognise that both options have consequences \u2014 this confirms they understand the dilemma concept.

PROCEED (if \u226580% articulate that both choices have downsides):
Move to the paired dilemma activity. Students understand the concept.

PIVOT (if <80% present it as a simple right/wrong answer):
Most likely issue: Students are applying black-and-white thinking \u2014 "just tell the truth" or "just lie" without considering consequences of both.
Reteach: "I hear you saying \u2018just tell the truth.\u2019 OK \u2014 but what happens if you do? [Name the consequence.] And what happens if you don\u2019t? [Name that consequence too.] BOTH options have a cost. THAT is what makes it a dilemma." Re-check with a new quick scenario: "Your best friend asks if you like their new haircut. You don\u2019t. What do you do? Is there a perfect answer?"

**TEACHER NOTES:**
This slide bridges the vocabulary (I Do) into the collaborative dilemma activity (We Do). The prior knowledge check on \u2018dilemma\u2019 is important \u2014 if students don\u2019t understand that dilemmas have no clean answer, they\u2019ll reduce the scenarios to simple moral rules and miss the point. The first scenario is done as a whole class to model the discussion process before students work in pairs. This is the GUIDED PRACTICE transition in the General checklist.

**MISCONCEPTIONS:**
\u2022 Misconception: "There\u2019s always a right answer if you think hard enough."
  Why: Students are often taught that ethical problems have clear solutions. Dilemmas challenge this \u2014 both options involve trade-offs.
  Impact: Students shut down discussion prematurely by declaring one option "right" without exploring consequences.
  Quick correction: "A dilemma isn\u2019t a puzzle with a hidden answer. It\u2019s a situation where thoughtful people can genuinely disagree. Your job is to think through BOTH sides, not find the \u2018trick\u2019 answer."

**WATCH FOR:**
\u2022 Students who default to "just tell the truth always" without considering context \u2014 probe: "What if telling the truth hurts someone\u2019s feelings? Is it still the right thing?"
\u2022 Students who are genuinely conflicted \u2014 affirm: "That discomfort is the point. Dilemmas are supposed to feel difficult."
\u2022 Readiness signal: Students are engaged in discussing the first scenario and can articulate consequences of both choices.

[General: Guided Practice \u2014 We Do | VTLM 2.0: Scaffold Practice]`;

const NOTES_DILEMMA_ACTIVITY = `**SAY:**
\u2022 "Now you\u2019re going to work through the dilemmas in pairs. Here\u2019s how it works:"
\u2022 "One partner is the TRUTH-TELLER \u2014 they must argue for telling the truth."
\u2022 "The other partner is the LIE-TELLER \u2014 they must argue for telling the lie."
\u2022 "You might not agree with the side you\u2019re given. That\u2019s the point \u2014 you\u2019re practising seeing TWO sides."
\u2022 "After each scenario, I\u2019ll ask one truth-teller and one lie-teller to share their argument. Then we\u2019ll vote as a class."

**DO:**
\u2022 Assign pairs. Within each pair, designate who is truth-teller and who is lie-teller (swap roles for each new scenario).
\u2022 Display each scenario on screen. Allow 90 seconds per scenario for pair discussion.
\u2022 After each scenario: cold call one truth-teller and one lie-teller to share. Then run a quick class vote (hands up for truth / hands up for lie).
\u2022 Aim for 2\u20133 scenarios in approximately 8\u201310 minutes.
\u2022 Circulate to listen to pair discussions. Note strong arguments to highlight.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
\u2022 Task: Provide enabling students with the Honesty Dilemmas PDF which includes sentence starters for each side ("I think telling the truth is better because..." / "I think lying is better because..."). These scaffolds help students structure their argument when the open-ended format is too demanding.

EXTENDING PROMPT:
\u2022 Task: After discussing each dilemma, extending students write a THIRD option \u2014 a response that is neither a direct lie nor the blunt truth. This targets the ethical skill of tactful honesty, which sits beyond the binary thinking of the lesson. E.g., for "Do you like my haircut?" \u2014 "I like that you tried something new!" is neither dishonest nor hurtful.

**TEACHER NOTES:**
The paired debate structure ensures every student engages with both perspectives \u2014 you cannot sit passively when you\u2019ve been assigned a side to argue. Swapping roles between scenarios prevents students from entrenching in one position. The class vote after each scenario makes the collective reasoning visible and creates a shared data point for the debrief. This is the WE DO / GUIDED PRACTICE phase. The role assignment (truth-teller / lie-teller) is a scaffold that structures the discussion \u2014 without it, pairs often just agree with each other and the dilemma collapses.

**WATCH FOR:**
\u2022 Pairs where one student dominates \u2014 intervene: "I need to hear from the lie-teller now. What\u2019s your argument?"
\u2022 Students who refuse to argue the lie side \u2014 reframe: "You don\u2019t have to agree with it. You\u2019re practising seeing from someone else\u2019s point of view. That\u2019s respect."
\u2022 Strong arguments from students \u2014 note them to highlight during the class share.
\u2022 Readiness signal: Pairs are actively debating and can articulate consequences for both sides.

[General: Guided Practice \u2014 We Do | VTLM 2.0: Scaffold Practice]`;

const NOTES_GROUP_ACTIVITY = `**SAY:**
\u2022 "Now it\u2019s your turn to CREATE a dilemma."
\u2022 "In groups of 3\u20134, write your own honesty dilemma \u2014 a situation where telling the truth AND lying both have consequences."
\u2022 "Then act it out for the class. The class will decide what they would do."
\u2022 "You have 8 minutes: 4 minutes to write, 4 minutes to rehearse."

**DO:**
\u2022 Form groups of 3\u20134. Mix students from different pairs to create fresh groupings.
\u2022 Distribute scrap paper for planning or have students use the back of the Honesty Dilemmas sheet.
\u2022 Set a visible timer: 4 min write + 4 min rehearse.
\u2022 Circulate and check that each group\u2019s dilemma is genuine (both sides have real consequences) \u2014 redirect groups whose scenarios are too simple.
\u2022 If time is tight, have 2\u20133 groups perform; others share in the next session.

**ENABLING & EXTENDING:**
ENABLING PROMPT:
\u2022 Task: Provide enabling groups with the Honesty Dilemmas PDF scenarios as models. They can adapt an existing scenario rather than creating one from scratch. This lowers the creative demand while still requiring group collaboration and performance.

EXTENDING PROMPT:
\u2022 Task: Extending groups must include a character who discovers the lie/truth LATER \u2014 adding a time dimension to the consequences. This pushes students to think about long-term ethical impacts, not just immediate reactions.

**TEACHER NOTES:**
This is the YOU DO / INDEPENDENT PRACTICE phase for Part A. Creating their own dilemma requires students to synthesise their understanding of honesty, integrity, and the dilemma concept. The performance element adds accountability and engagement. The 8-minute time limit is tight by design \u2014 it prevents over-planning and keeps energy high. If time is limited, this activity can be shortened to 5\u20136 minutes (3 min write, 2\u20133 min rehearse) or moved partly to the next session.

**WATCH FOR:**
\u2022 Groups who write a scenario with an obvious answer \u2014 push: "Where\u2019s the dilemma? What\u2019s the cost of telling the truth in your scenario?"
\u2022 Groups where one student does all the writing \u2014 prompt: "Everyone needs a role in the performance. Who\u2019s playing who?"
\u2022 Readiness signal: Groups have a written scenario and are rehearsing roles. All members are participating.

[General: Independent Practice \u2014 You Do | VTLM 2.0: Supported Application]`;

const NOTES_TRANSITION = `**SAY:**
\u2022 "Brilliant work on those dilemmas. You\u2019ve shown you can see two sides to a problem \u2014 and that takes real maturity."
\u2022 "Now we\u2019re shifting gears. We\u2019ve been thinking about values like honesty and integrity. Those values are part of who you are \u2014 part of your identity."
\u2022 "In Part B, we\u2019re going to explore what makes YOU who you are."
\u2022 Ask: "What kinds of things shape a person\u2019s identity? Shout out some ideas." [Expected: family, culture, experiences, friends, hobbies, achievements, fears, where you live.]

**DO:**
\u2022 Stand at the front and use open body language to signal a fresh start.
\u2022 Take 5\u20136 shout-out responses. Write them on the board in a quick brainstorm web.
\u2022 Keep this to 2 minutes \u2014 it\u2019s a bridge, not a deep discussion.

**CFU CHECKPOINT:**
Technique: Whole-Class Shout-Out with Board Capture

Script:
\u2022 "Shout out one thing that shapes who a person is. I\u2019ll write them on the board."
\u2022 After 5\u20136 responses: "Look at this list. Did anyone mention hopes? Fears? Accomplishments? Memories?"
\u2022 Scan for: a range of categories beyond surface traits (not just "hobbies" and "family" but also internal factors like fears, memories, hopes).

PROCEED (if students generate at least 4 different categories):
Move to the bio-poem introduction. Students have sufficient vocabulary for the brainstorm.

PIVOT (if responses are narrow \u2014 all surface-level like hobbies and sports):
Add categories yourself: "What about something you\u2019re scared of? Something you\u2019ve achieved that you\u2019re proud of? A memory that changed how you see the world?" These prompts expand the identity map before the bio-poem task.

**TEACHER NOTES:**
This transition slide serves two purposes: (1) it closes Part A with an affirming summary, and (2) it bridges to Part B by connecting values to identity. The brainstorm activates prior knowledge about identity and ensures students have a broader vocabulary for the bio-poem. If students completed identity charts in a previous lesson, reference them: "Think about the identity charts you made. What categories did you use?" This slide is brief by design \u2014 it\u2019s a pivot point, not a teaching phase.

**WATCH FOR:**
\u2022 Students who only name external traits (hobbies, sport teams) \u2014 prompt for internal ones: "What about something you feel or believe?"
\u2022 Students who connect values from Part A to identity \u2014 affirm: "Yes! The values you hold are part of your identity too."
\u2022 Readiness signal: The board has 6+ identity factors across surface and deeper categories.

[General: Explicit Instruction \u2014 I Do | VTLM 2.0: Explicit Explanation]`;

const NOTES_BIOPOEM_INTRO = `**SAY:**
\u2022 "Today you\u2019re going to create a bio-poem about yourself. A bio-poem is an eleven-line poem that captures who you are \u2014 your identity \u2014 in a creative format."
\u2022 "It\u2019s not about rhyming or perfect poetry. It\u2019s about expressing who YOU are \u2014 honestly and with integrity." [Callback to Part A.]
\u2022 "Let\u2019s look at the format together." [Walk through each line on the slide.]
\u2022 "Each line focuses on a different part of your identity. Some are easy \u2014 your name, where you live. Some will make you think harder \u2014 your fears, your hopes, your important memories."

**DO:**
\u2022 Display the bio-poem format on screen. Walk through each line slowly.
\u2022 Pause after "Fears" and "Important memories" \u2014 these are the lines students find hardest. Normalise this: "These are the deep ones. Take your time with them."
\u2022 Show the student example (next slide) to demonstrate what a finished poem looks like.

**TEACHER NOTES:**
The bio-poem format provides structure that reduces cognitive load \u2014 students know exactly what each line requires, so they can focus on content rather than form. This is critical for students who find open-ended creative writing overwhelming. The format is adapted from Facing History and Ourselves. The connection back to Part A ("honestly and with integrity") is deliberate \u2014 it threads the session\u2019s values into the creative task, making the combined lesson feel cohesive rather than two separate activities. The focus is NOT on teaching poetry conventions \u2014 it\u2019s on self-expression through a structured format.

**WATCH FOR:**
\u2022 Students who say "I don\u2019t know what to write for fears/hopes" \u2014 normalise: "Everyone has fears and hopes. They don\u2019t have to be dramatic. \u2018Scared of spiders\u2019 counts. \u2018Hopes to travel\u2019 counts."
\u2022 Students who seem uncomfortable with self-disclosure \u2014 remind: "You choose what to share. You don\u2019t have to include anything that feels too personal."
\u2022 Readiness signal: Students understand the format and are ready to see the example.

[General: Explicit Instruction \u2014 I Do | VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_BIOPOEM_EXAMPLE = `**SAY:**
\u2022 "Here\u2019s an example of a bio-poem written by a student called Jackson."
\u2022 Read the poem aloud \u2014 slowly, with expression.
\u2022 "Notice how each line matches the format. Line 1 is his first name. Line 2 is adjectives. Line 3 is a relationship. And so on."
\u2022 Ask: "What did you learn about Jackson from this poem that you wouldn\u2019t know just from looking at him?" [Expected: his fears, his accomplishments, his hopes.]
\u2022 "That\u2019s the power of a bio-poem \u2014 it reveals the invisible parts of identity."

**DO:**
\u2022 Display the Jackson bio-poem example on screen.
\u2022 Read it aloud with warmth. Pause briefly after each line.
\u2022 Point to specific lines as you discuss the format match.
\u2022 Take 2\u20133 student responses to the question.

**TEACHER NOTES:**
The student example is essential for modelling \u2014 without it, students guess at the tone, depth, and format. Jackson\u2019s poem is a strong model because it includes both light elements ("loves chocolate chip ice cream") and deeper ones ("scared of failure"), showing students that the full range is welcome. Reading it aloud models the sharing phase that comes later and normalises vulnerability. If you prepared your own bio-poem (recommended), share it here as a second model.

**WATCH FOR:**
\u2022 Students who comment on the example\u2019s honesty ("he said he\u2019s scared of failure!") \u2014 affirm: "That takes courage. And notice \u2014 it makes the poem more interesting, not less."
\u2022 Students already brainstorming their own lines \u2014 great sign. Let them start jotting notes.
\u2022 Readiness signal: Students understand the format and have seen a concrete example. They\u2019re ready to write.

[General: Explicit Instruction \u2014 I Do | VTLM 2.0: Modelling]`;

const NOTES_BIOPOEM_WRITE = `**SAY:**
\u2022 "Now it\u2019s your turn. You\u2019re going to write your own bio-poem."
\u2022 "First: Spend 2 minutes brainstorming. Jot down ideas for each line \u2014 don\u2019t write the poem yet."
\u2022 "Next: Write your poem. Follow the format \u2014 one idea per line."
\u2022 "Then: Read it back to yourself. Does it sound like YOU?"
\u2022 "You have 10 minutes. Use the bio-poem template or your inquiry book."

**DO:**
\u2022 Distribute the Bio-Poem Template PDF (one per student).
\u2022 Set a visible timer: 2 min brainstorm + 8 min writing.
\u2022 Circulate during writing. Offer encouragement, not correction \u2014 this is self-expression, not a writing assessment.
\u2022 For students who are stuck, prompt with specific questions: "What\u2019s something you\u2019re really good at?" "What\u2019s one memory that changed how you see the world?"

**ENABLING & EXTENDING:**
ENABLING PROMPT:
\u2022 Task: Provide enabling students with the Bio-Poem Template PDF which includes sentence starters for each line (e.g., "I am scared of...", "I learned how to..."). Students fill in the blanks rather than composing from scratch. This targets the prerequisite skill of generating personal content, which must be secured before creative formatting.
\u2022 Extra Notes: Sit with these students for the first 2 minutes to co-construct line 1\u20133 together, then release them to continue independently.

EXTENDING PROMPT:
\u2022 Task: After completing their own bio-poem, extending students write a bio-poem about a historical or literary figure studied this term (e.g., a character from a class novel). This requires students to apply the identity framework to another person \u2014 perspective-taking at a higher cognitive level. Provide the Extending Investigation PDF with the adapted format.

**TEACHER NOTES:**
This is the YOU DO / INDEPENDENT PRACTICE phase for Part B. The 10-minute writing window is generous enough for most students to complete a draft but tight enough to maintain urgency. The brainstorm-then-write sequence reduces the cognitive load of simultaneously generating ideas AND composing lines. Students who completed identity charts in a previous session should reference them \u2014 prompt: "Look at your identity chart. What\u2019s on there that you want in your poem?"

**WATCH FOR:**
\u2022 Students who write very surface-level content ("I like pizza, I like footy") \u2014 gently probe: "What about the deeper lines? What\u2019s a memory that matters to you?"
\u2022 Students who stall on "fears" \u2014 normalise: "Jackson wrote \u2018scared of tests.\u2019 It doesn\u2019t have to be dramatic."
\u2022 Students finishing very quickly with minimal content \u2014 ask them to add detail: "Can you say MORE about that hope? What would it look like if it came true?"
\u2022 Readiness signal: Students are writing with focus. Most have completed at least 6\u20137 lines within 8 minutes.

[General: Independent Practice \u2014 You Do | VTLM 2.0: Supported Application]`;

const NOTES_SHARE = `**SAY:**
\u2022 "Time to share. Here\u2019s how we\u2019ll do it: pass your poem to your neighbour."
\u2022 "Read their poem silently. Write one comment or question in the margin \u2014 something you found interesting, surprising, or want to know more about."
\u2022 "Every 2 minutes, pass the poem to the next person. You\u2019ll get 2\u20133 readers."
\u2022 "Remember \u2014 respect. These poems are personal. Treat them with care."
\u2022 After sharing: "When you get your poem back, read the comments. How does it feel to be seen?"

**DO:**
\u2022 Set clear expectations: written comments only, respectful and thoughtful.
\u2022 Set a timer: 2 minutes per rotation, 2\u20133 rotations.
\u2022 Circulate to monitor comments. Intervene immediately if any comment is disrespectful.
\u2022 After the final rotation, return poems to authors. Allow 30 seconds to read feedback.

**CFU CHECKPOINT:**
Technique: Finger Rating (1\u20135)

Script:
\u2022 "Hold up 1\u20135 fingers. How well does your bio-poem capture who you really are? 1 = not at all, 5 = that\u2019s really me."
\u2022 Scan for: mostly 3\u20135 indicates students engaged authentically. A cluster of 1\u20132 may indicate the task felt too exposing or students didn\u2019t have enough time.
\u2022 Follow up with 1\u20132 students who gave low ratings: "What\u2019s missing from your poem? What would make it more YOU?"

PROCEED (if most students rate 3+):
Move to the closing slide. Students have engaged meaningfully with the identity task.

PIVOT (if many students rate 1\u20132):
Most likely issue: Students felt rushed or uncomfortable with self-disclosure.
Reteach: "That\u2019s OK \u2014 this is a first draft. Identity is complex. You can add to your poem over the next week. For now, tell me ONE line you\u2019re proud of." This reframes the task from "complete poem" to "one meaningful line" and reduces the pressure.

**TEACHER NOTES:**
The pass-and-comment sharing strategy (from Facing History) builds community through peer recognition. It is lower-risk than reading aloud to the whole class, which can be intimidating for Year 5/6 students writing about personal identity. The written comment format also practises respectful engagement \u2014 a direct application of the \u2018respect\u2019 concept from Part A. The finger rating CFU checks authentic engagement, not writing quality.

**WATCH FOR:**
\u2022 Students who are reluctant to pass their poem \u2014 offer an alternative: "You can fold the poem in half and only share the top 5 lines." Or: "You can read one line aloud instead of passing."
\u2022 Inappropriate comments \u2014 address immediately and privately. Set the expectation early: "If I see a comment that isn\u2019t respectful, we stop."
\u2022 Readiness signal: Poems are circulating, students are reading thoughtfully, and comments are kind and curious.

[General: Monitor Progress & Feedback | VTLM 2.0: Monitor Progress]`;

const NOTES_CLOSING = `**SAY:**
\u2022 "Let\u2019s look at our success criteria one more time."
\u2022 Read each SC: "SC1: I know what honesty, respect and integrity mean. Thumbs up, sideways, or down."
\u2022 "SC2: I can see two sides to a dilemma. Thumbs."
\u2022 "SC3: I can work cooperatively in a group. Thumbs."
\u2022 "SC4: I can list characteristics or experiences that shape my identity. Thumbs."
\u2022 "SC5: I can create a bio-poem about myself. Thumbs."
\u2022 "Turn to your partner: Which SC are you most proud of today? And which one do you want to work on next time?"
\u2022 "You showed honesty, respect and integrity today \u2014 in the dilemma discussions AND in how you treated each other\u2019s poems. That\u2019s the real lesson."

**DO:**
\u2022 Display the SC on screen. Read each one aloud.
\u2022 Students show thumbs for each SC. Scan and note \u2014 this is formative data for next session.
\u2022 Allow 60 seconds for Turn & Talk.
\u2022 If time permits, take 1\u20132 shares from the Turn & Talk.
\u2022 Close warmly: acknowledge effort and courage.

**TEACHER NOTES:**
The closing slide brings the session full circle by returning to the success criteria introduced at the start. The thumbs-up self-assessment gives the teacher formative data across all five SC. The Turn & Talk reflection prompt targets metacognition \u2014 students identify their own strengths and growth areas. The final teacher comment explicitly connects Parts A and B, reinforcing that the combined session was one cohesive learning experience about values and identity. If any SC gets majority thumbs-down, plan to revisit it in the next session\u2019s opening.

**WATCH FOR:**
\u2022 SC2 (two sides to a dilemma) getting thumbs-down \u2014 this may indicate the dilemma activity was too rushed. Plan more time for this in the follow-up session.
\u2022 SC5 (bio-poem) getting thumbs-down \u2014 may indicate students felt they didn\u2019t have enough time. Offer: "You can finish your poem at home or in our next session."
\u2022 Readiness signal: Students are self-assessing honestly and can articulate one area of pride and one area of growth.

[General: Monitor Progress & Feedback / Closing | VTLM 2.0: Monitor Progress]`;

const NOTES_RESOURCES = `**SAY:**
\u2022 "These are the printable resources for today\u2019s session. You\u2019ll find them linked here."

**DO:**
\u2022 Click each resource link to open and print before the lesson.
\u2022 The Honesty Dilemmas sheet is needed for Part A (one per student or per pair).
\u2022 The Bio-Poem Template is needed for Part B (one per student).
\u2022 The Bio-Poem Example is reference only \u2014 display on screen, no need to print for students.

**TEACHER NOTES:**
Print all resources before the session begins. The Honesty Dilemmas PDF includes 4 scenarios with sentence starters for enabling students. The Bio-Poem Template includes the 11-line format with prompts and sentence starters. The Extending Investigation PDF is only needed if you have students working above the lesson target in Part B.

**WATCH FOR:**
\u2022 Ensure all PDFs open correctly from the hyperlinks before the lesson.

[General: Planning \u2014 Preparation | VTLM 2.0: Planning]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build function
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Inquiry Lesson Generator";
  pres.title  = "Honesty, Respect, Integrity & Identity Bio-Poems";

  // ── Slide 1: Title ──
  titleSlide(
    pres,
    "Honesty, Respect, Integrity\n& Identity",
    "Values That Shape Who We Are",
    "Inquiry  |  Year 5/6  |  Combined Session",
    NOTES_TITLE,
  );

  // ── Slide 2: LI / SC ──
  liSlide(
    pres,
    [
      "I am learning the value of honesty, respect and integrity, and how my experiences have helped to shape my identity.",
    ],
    [
      "I know what honesty, respect and integrity mean",
      "I can see two sides to a dilemma",
      "I can work cooperatively in a group",
      "I can list characteristics or experiences that shape my identity",
      "I can create a bio-poem about myself",
    ],
    NOTES_LI,
    FOOTER,
  );

  // ── Slide 3: The Number Game (Hook) ──
  contentSlide(
    pres,
    "Part A", C.PRIMARY,
    "The Number Game",
    [
      "Write a number between 1 and 10 on your whiteboard.",
      "Do NOT show anyone.",
      "If your number matches mine, you win!",
    ],
    NOTES_GAME,
    FOOTER,
  );

  // ── Slide 4: Vocabulary — Honesty, Respect, Integrity ──
  {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addBadge(s, "Key Terms", { color: C.PRIMARY });
    addTitle(s, "Honesty, Respect & Integrity");

    const terms = [
      { word: "Honesty", def: "Being truthful and transparent \u2014 not just avoiding lies, but being open and genuine.", color: C.PRIMARY },
      { word: "Respect", def: "Treating others the way they deserve \u2014 listening, valuing ideas, even when you disagree.", color: C.SECONDARY },
      { word: "Integrity", def: "Doing the right thing even when no one is watching. Your inner compass.", color: C.ACCENT },
    ];

    const cardH = 1.05;
    const gap = 0.12;

    terms.forEach((t, i) => {
      const y = CONTENT_TOP + i * (cardH + gap);
      addCard(s, 0.5, y, 9, cardH, { strip: t.color, fill: C.WHITE });
      s.addText(t.word, {
        x: 0.75, y: y + 0.10, w: 3, h: 0.30,
        fontSize: 16, fontFace: FONT_H, color: t.color, bold: true, margin: 0,
      });
      s.addText(t.def, {
        x: 0.75, y: y + 0.42, w: 8.5, h: 0.55,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, valign: "top", margin: 0,
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_VOCAB);
  }

  // ── Slide 5: Dilemma Introduction + First Scenario ──
  contentSlide(
    pres,
    "We Do", C.SECONDARY,
    "Honesty Dilemmas",
    [
      "A dilemma is a problem where BOTH outcomes are undesirable.",
      "There is no easy answer \u2014 that\u2019s what makes it a dilemma.",
      "Read the first scenario on your Honesty Dilemmas sheet.",
      "Turn & Talk: What would you do? Was it easy or hard to decide?",
    ],
    NOTES_DILEMMA_INTRO,
    FOOTER,
  );

  // ── Slide 6: Paired Dilemma Activity ──
  {
    const s = pres.addSlide();
    addTopBar(s, C.SECONDARY);
    addBadge(s, "We Do", { color: C.SECONDARY });
    addTitle(s, "Truth-Teller vs Lie-Teller");

    const cardH = SAFE_BOTTOM - CONTENT_TOP;
    addCard(s, 0.5, CONTENT_TOP, 9, cardH, { strip: C.SECONDARY, fill: C.WHITE });

    // Instructions
    const instructions = [
      { text: "Partner A = TRUTH-TELLER (argues for telling the truth)", options: { bold: true, breakLine: true, fontSize: 14, color: C.PRIMARY } },
      { text: "Partner B = LIE-TELLER (argues for telling the lie)", options: { bold: true, breakLine: true, fontSize: 14, color: C.ACCENT } },
      { text: " ", options: { breakLine: true, fontSize: 8 } },
      { text: "For each scenario:", options: { bold: true, breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: "Read the dilemma together", options: { bullet: true, breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: "Each partner argues their side (90 seconds)", options: { bullet: true, breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: "Swap roles for the next scenario", options: { bullet: true, breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: " ", options: { breakLine: true, fontSize: 8 } },
      { text: "After each scenario: one truth-teller and one lie-teller share, then we vote as a class.", options: { italic: true, fontSize: 12, color: C.MUTED } },
    ];

    s.addText(instructions, {
      x: 0.75, y: CONTENT_TOP + 0.12, w: 8.5, h: cardH - 0.24,
      fontFace: FONT_B, valign: "top", margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_DILEMMA_ACTIVITY);
  }

  // ── Slide 7: Group Dilemma Creation ──
  contentSlide(
    pres,
    "You Do", C.ACCENT,
    "Create Your Own Dilemma",
    [
      "In groups of 3\u20134, write your own honesty dilemma.",
      "Both telling the truth AND lying must have consequences.",
      "Then act it out for the class to decide!",
    ],
    NOTES_GROUP_ACTIVITY,
    FOOTER,
    (s) => {
      // Timer visual on the right
      addTextOnShape(s, "4 min\nWrite", {
        x: 6.5, y: CONTENT_TOP + 0.2, w: 1.5, h: 1.2, rectRadius: 0.1,
        fill: { color: C.PRIMARY },
      }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });

      addTextOnShape(s, "4 min\nRehearse", {
        x: 8.1, y: CONTENT_TOP + 0.2, w: 1.5, h: 1.2, rectRadius: 0.1,
        fill: { color: C.SECONDARY },
      }, { fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true });
    },
  );

  // ── Slide 8: Transition to Part B ──
  {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addBadge(s, "Part B", { color: C.ACCENT });
    addTitle(s, "From Values to Identity");

    const cardH = SAFE_BOTTOM - CONTENT_TOP;
    addCard(s, 0.5, CONTENT_TOP, 9, cardH, { strip: C.ACCENT, fill: C.WHITE });

    s.addText([
      { text: "Our values \u2014 honesty, respect, integrity \u2014 are part of who we are.", options: { breakLine: true, fontSize: 15, color: C.CHARCOAL, bold: true } },
      { text: " ", options: { breakLine: true, fontSize: 8 } },
      { text: "But identity is shaped by so much more:", options: { breakLine: true, fontSize: 14, color: C.CHARCOAL } },
      { text: "Family & relationships", options: { bullet: true, breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: "Experiences & memories", options: { bullet: true, breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: "Hopes & fears", options: { bullet: true, breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: "Accomplishments & challenges", options: { bullet: true, breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: "Where you live & your culture", options: { bullet: true, breakLine: true, fontSize: 13, color: C.CHARCOAL } },
      { text: " ", options: { breakLine: true, fontSize: 8 } },
      { text: "What else shapes who you are? Shout out your ideas!", options: { italic: true, fontSize: 13, color: C.MUTED } },
    ], {
      x: 0.75, y: CONTENT_TOP + 0.12, w: 8.5, h: cardH - 0.24,
      fontFace: FONT_B, valign: "top", margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_TRANSITION);
  }

  // ── Slide 9: Bio-Poem Format ──
  {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addBadge(s, "I Do", { color: C.PRIMARY });
    addTitle(s, "What Is a Bio-Poem?");

    const lines = [
      "Line 1: First name",
      "Line 2: Three or four adjectives that describe you",
      "Line 3: Important relationship (e.g., son of..., friend of...)",
      "Line 4: Who loves... (three things)",
      "Line 5: Who feels... (three things)",
      "Line 6: Who is scared of... (three things)",
      "Line 7: Who learned... (an accomplishment)",
      "Line 8: Who hopes... (a wish or dream)",
      "Line 9: Lives in...",
      "Line 10: Last name",
    ];

    const cardH = SAFE_BOTTOM - CONTENT_TOP;
    addCard(s, 0.5, CONTENT_TOP, 9, cardH, { strip: C.PRIMARY, fill: C.WHITE });

    s.addText("A 10-line poem about YOU", {
      x: 0.75, y: CONTENT_TOP + 0.08, w: 8, h: 0.28,
      fontSize: 12, fontFace: FONT_B, color: C.PRIMARY, bold: true, margin: 0,
    });

    s.addText(lines.map((l, i) => ({
      text: l,
      options: {
        breakLine: i < lines.length - 1,
        fontSize: 12,
        color: C.CHARCOAL,
        bold: l.startsWith("Line"),
      },
    })), {
      x: 0.75, y: CONTENT_TOP + 0.40, w: 8.5, h: cardH - 0.52,
      fontFace: FONT_B, valign: "top", margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_BIOPOEM_INTRO);
  }

  // ── Slide 10: Bio-Poem Example (Jackson) ──
  {
    const s = pres.addSlide();
    addTopBar(s, C.SECONDARY);
    addBadge(s, "Example", { color: C.SECONDARY });
    addTitle(s, "Bio-Poem Example");

    const poemLines = [
      "Jackson",
      "Friendly, silly, athletic, tall",
      "Son of John and Brenda",
      "Who loves chocolate chip ice cream, the Grizzlies, and Saturdays",
      "Who feels happy, tired, and lucky",
      "And who is scared of tests, thunderstorms, and failure",
      "Who learned how to shoot a three-point shot and won a basketball trophy",
      "Who hopes to see an NBA game and make his parents proud",
      "Lives in Memphis, Tennessee",
      "Tillman",
    ];

    const cardH = SAFE_BOTTOM - CONTENT_TOP;
    addCard(s, 0.5, CONTENT_TOP, 9, cardH, { strip: C.SECONDARY, fill: C.WHITE });

    s.addText(poemLines.map((l, i) => ({
      text: l,
      options: {
        breakLine: i < poemLines.length - 1,
        fontSize: 13,
        color: C.CHARCOAL,
        bold: i === 0 || i === poemLines.length - 1,
        italic: i > 0 && i < poemLines.length - 1,
        align: "center",
      },
    })), {
      x: 0.75, y: CONTENT_TOP + 0.15, w: 8.5, h: cardH - 0.30,
      fontFace: FONT_B, valign: "middle", margin: 0,
      align: "center",
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_BIOPOEM_EXAMPLE);
  }

  // ── Slide 11: Write Your Bio-Poem (You Do) ──
  contentSlide(
    pres,
    "You Do", C.ACCENT,
    "Write Your Bio-Poem",
    [
      "First: Brainstorm ideas for each line (2 minutes).",
      "Next: Write your poem \u2014 one idea per line (8 minutes).",
      "Then: Read it back. Does it sound like YOU?",
    ],
    NOTES_BIOPOEM_WRITE,
    FOOTER,
    (s) => {
      // Timer visual
      addTextOnShape(s, "10 min", {
        x: 7.0, y: CONTENT_TOP + 0.3, w: 2.5, h: 0.8, rectRadius: 0.1,
        fill: { color: C.PRIMARY },
      }, { fontSize: 24, fontFace: FONT_H, color: C.WHITE, bold: true });

      // Tip
      addTextOnShape(s, "Use your Bio-Poem\nTemplate or\nInquiry Book", {
        x: 7.0, y: CONTENT_TOP + 1.3, w: 2.5, h: 1.0, rectRadius: 0.1,
        fill: { color: C.SECONDARY },
      }, { fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true });
    },
  );

  // ── Slide 12: Share Bio-Poems ──
  {
    const s = pres.addSlide();
    addTopBar(s, C.SECONDARY);
    addBadge(s, "Share", { color: C.SECONDARY });
    addTitle(s, "Pass & Comment");

    const steps = [
      { label: "1. Pass", desc: "Pass your poem to your neighbour." },
      { label: "2. Read", desc: "Read their poem silently and carefully." },
      { label: "3. Comment", desc: "Write one kind comment or question in the margin." },
      { label: "4. Pass again", desc: "Every 2 minutes, pass to the next person." },
    ];

    const cardW = 4.3;
    const gap = 0.10;
    const cardH = (SAFE_BOTTOM - CONTENT_TOP - gap * 3) / 4;
    const colors = [C.PRIMARY, C.SECONDARY, C.ACCENT, C.PRIMARY];

    steps.forEach((step, i) => {
      const y = CONTENT_TOP + i * (cardH + gap);
      addCard(s, 0.5, y, cardW, cardH, { strip: colors[i], fill: C.WHITE });
      s.addText(step.label, {
        x: 0.75, y: y + 0.06, w: 1.5, h: 0.22,
        fontSize: 12, fontFace: FONT_H, color: colors[i], bold: true, margin: 0,
      });
      s.addText(step.desc, {
        x: 0.75, y: y + 0.30, w: 3.8, h: cardH - 0.36,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, valign: "top", margin: 0,
      });
    });

    // Reminder card on the right
    addTextOnShape(s, "Remember:\nRESPECT\nThese poems\nare personal.", {
      x: 5.5, y: CONTENT_TOP + 0.5, w: 4, h: 1.8, rectRadius: 0.15,
      fill: { color: C.PRIMARY },
    }, { fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true });

    addTextOnShape(s, "2 min per rotation\n2\u20133 rotations", {
      x: 5.5, y: CONTENT_TOP + 2.6, w: 4, h: 0.8, rectRadius: 0.10,
      fill: { color: C.SECONDARY },
    }, { fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_SHARE);
  }

  // ── Slide 13: Closing ──
  closingSlide(
    pres,
    "Which success criterion are you most proud of today? Which one do you want to work on next time?",
    [
      "Honesty = truthful and transparent; Respect = valuing others",
      "Integrity = doing the right thing, even when no one\u2019s watching",
      "Your experiences, hopes, and fears shape your identity",
      "A bio-poem captures who you really are",
    ],
    NOTES_CLOSING,
  );

  // ── Slide 14: Resources ──
  addResourceSlide(
    pres,
    [
      {
        name: "SR1 \u2014 Honesty Dilemmas",
        fileName: "SR1_Honesty_Dilemmas.pdf",
        description: "4 honesty dilemma scenarios with sentence starters for enabling students.",
      },
      {
        name: "SR2 \u2014 Bio-Poem Template",
        fileName: "SR2_Bio_Poem_Template.pdf",
        description: "11-line bio-poem format with prompts and sentence starters.",
      },
      {
        name: "EXT1 \u2014 Bio-Poem Investigation (Extending)",
        fileName: "EXT1_Bio_Poem_Investigation.pdf",
        description: "Write a bio-poem about a historical or literary figure. Self-contained investigation.",
      },
    ],
    { C, FONT_H, FONT_B },
    FOOTER,
    NOTES_RESOURCES,
  );

  // ── Write PPTX ──
  fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: `${OUT_DIR}/Inquiry_Honesty_Identity.pptx` });
  console.log("PPTX written to " + OUT_DIR);

  // ── Generate companion PDFs ──
  await generateHonestyDilemmasPdf();
  await generateBioPoemTemplatePdf();
  await generateExtendingInvestigationPdf();
  console.log("All PDFs written to " + OUT_DIR);
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF Resources
// ─────────────────────────────────────────────────────────────────────────────

async function generateHonestyDilemmasPdf() {
  const doc = createPdf({ title: "Honesty Dilemmas" });

  let y = addPdfHeader(doc, "Honesty Dilemmas", {
    subtitle: "Supporting Resource 1",
    color: C.PRIMARY,
    lessonInfo: "Inquiry | Honesty, Respect, Integrity & Identity | Year 5/6",
  });

  y = addTipBox(doc, "A dilemma is a problem where BOTH outcomes have consequences. There is no easy answer. Your job is to think through BOTH sides.", y, { color: C.SECONDARY });

  // Scenario 1
  y = addSectionHeading(doc, "Scenario 1: The Birthday Gift", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Your best friend gives you a birthday present. They are so excited and clearly spent a lot of time choosing it. But you really don\u2019t like it at all. They ask: \"Do you like it?\"", y);
  y = addBodyText(doc, "If you tell the truth, you might hurt their feelings. If you lie, you\u2019re not being honest \u2014 and they might buy you something similar next time.", y);
  y += 4;
  y = addTipBox(doc, "Truth-Teller: \"I think telling the truth is better because...\"\nLie-Teller: \"I think lying is better because...\"", y, { color: C.ACCENT });

  // Scenario 2
  y = addSectionHeading(doc, "Scenario 2: The Test Answers", y, { color: C.PRIMARY });
  y = addBodyText(doc, "You see your friend copying answers from another student during a test. Your teacher asks the class: \"Did anyone see any cheating?\" Your friend looks at you with pleading eyes.", y);
  y = addBodyText(doc, "If you tell the truth, your friend gets in trouble and may stop being your friend. If you stay silent, you\u2019re not being honest and the cheating continues.", y);
  y += 4;
  y = addTipBox(doc, "Truth-Teller: \"I think telling the truth is better because...\"\nLie-Teller: \"I think staying silent is better because...\"", y, { color: C.ACCENT });

  // Scenario 3
  y = addSectionHeading(doc, "Scenario 3: The Broken Vase", y, { color: C.PRIMARY });
  y = addBodyText(doc, "You accidentally break your mum\u2019s favourite vase while playing inside (which you weren\u2019t supposed to do). Your little brother walks in and your mum asks: \"Who broke this?\" Your brother doesn\u2019t know what happened.", y);
  y = addBodyText(doc, "If you tell the truth, you\u2019ll get in trouble for playing inside AND breaking the vase. If you stay quiet, your brother might get blamed.", y);
  y += 4;
  y = addTipBox(doc, "Truth-Teller: \"I think telling the truth is better because...\"\nLie-Teller: \"I think staying quiet is better because...\"", y, { color: C.ACCENT });

  // Scenario 4
  y = addSectionHeading(doc, "Scenario 4: The Party Invitation", y, { color: C.PRIMARY });
  y = addBodyText(doc, "You\u2019re invited to two birthday parties on the same day. You told the first friend you\u2019d come to theirs, but then your other friend (who you like more) invites you to theirs. The first friend asks: \"You\u2019re still coming, right?\"", y);
  y = addBodyText(doc, "If you tell the truth (you want to go to the other party), the first friend is hurt. If you make up an excuse, you\u2019re being dishonest.", y);
  y += 4;
  y = addTipBox(doc, "Truth-Teller: \"I think being honest is better because...\"\nLie-Teller: \"I think making an excuse is better because...\"", y, { color: C.ACCENT });

  addPdfFooter(doc, "Inquiry | Honesty, Respect, Integrity & Identity | Year 5/6");
  await writePdf(doc, `${OUT_DIR}/SR1_Honesty_Dilemmas.pdf`);
}

async function generateBioPoemTemplatePdf() {
  const doc = createPdf({ title: "Bio-Poem Template" });

  let y = addPdfHeader(doc, "My Bio-Poem", {
    subtitle: "Supporting Resource 2 \u2014 Bio-Poem Template",
    color: C.PRIMARY,
    lessonInfo: "Inquiry | Identity | Year 5/6",
  });

  y = addTipBox(doc, "A bio-poem is a poem about YOU. Each line focuses on a different part of your identity. There are no wrong answers \u2014 just be honest and be yourself.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Brainstorm First!", y, { color: C.PRIMARY });
  y = addBodyText(doc, "Before you write, jot down ideas for each line. Think about your identity chart if you made one.", y);
  y += 8;

  // Template lines with prompts
  const lines = [
    { label: "Line 1 \u2014 First name:", prompt: "Your first name" },
    { label: "Line 2 \u2014 Adjectives:", prompt: "Three or four words that describe you (e.g., creative, curious, loyal, tall)" },
    { label: "Line 3 \u2014 Relationship:", prompt: "An important relationship (e.g., Son of..., Friend of..., Sister of...)" },
    { label: "Line 4 \u2014 Who loves:", prompt: "Three things you love (e.g., Who loves basketball, rainy days, and pizza)" },
    { label: "Line 5 \u2014 Who feels:", prompt: "Three feelings (e.g., Who feels excited, grateful, and sometimes nervous)" },
    { label: "Line 6 \u2014 Who is scared of:", prompt: "Three fears (e.g., And who is scared of spiders, the dark, and letting people down)" },
    { label: "Line 7 \u2014 Who learned:", prompt: "An accomplishment or something you learned (e.g., Who learned to ride a bike)" },
    { label: "Line 8 \u2014 Who hopes:", prompt: "A wish or dream (e.g., Who hopes to travel the world and make a difference)" },
    { label: "Line 9 \u2014 Lives in:", prompt: "Your home location" },
    { label: "Line 10 \u2014 Last name:", prompt: "Your last name" },
  ];

  lines.forEach((line) => {
    if (y > PAGE.H - PAGE.MARGIN - 80) {
      doc.addPage();
      y = PAGE.MARGIN;
    }
    doc.fontSize(11).font("Helvetica-Bold").fillColor(hex(C.PRIMARY));
    doc.text(line.label, PAGE.MARGIN, y, { width: PAGE.CONTENT_W });
    y = doc.y + 2;
    doc.fontSize(9).font("Helvetica-Oblique").fillColor(hex("9CA3AF"));
    doc.text(line.prompt, PAGE.MARGIN + 10, y, { width: PAGE.CONTENT_W - 10 });
    y = doc.y + 4;
    // Write line
    doc.save();
    doc.moveTo(PAGE.MARGIN, y + 10).lineTo(PAGE.MARGIN + PAGE.CONTENT_W, y + 10)
      .strokeColor("#CCCCCC").lineWidth(0.5).stroke();
    doc.restore();
    y += 22;
  });

  addPdfFooter(doc, "Inquiry | Identity | Year 5/6");
  await writePdf(doc, `${OUT_DIR}/SR2_Bio_Poem_Template.pdf`);
}

async function generateExtendingInvestigationPdf() {
  const doc = createPdf({ title: "Bio-Poem Investigation \u2014 Extending" });

  let y = addPdfHeader(doc, "Bio-Poem Investigation", {
    subtitle: "Extending Challenge \u2014 Write a Bio-Poem About Someone Else",
    color: C.ACCENT,
    lessonInfo: "Inquiry | Identity | Year 5/6 | Extending",
  });

  y = addSectionHeading(doc, "What Is This Investigation?", y, { color: C.ACCENT });
  y = addBodyText(doc, "You\u2019ve written a bio-poem about yourself. Now the challenge: write a bio-poem about a historical or literary figure you\u2019ve studied this term.", y);
  y = addBodyText(doc, "This is harder than writing about yourself because you need to IMAGINE the person\u2019s inner world \u2014 their feelings, fears, hopes, and memories \u2014 based on what you know about them from texts, history, and evidence.", y);

  y = addSectionHeading(doc, "How Is This Different?", y, { color: C.ACCENT });
  y = addTipBox(doc, "When you write about yourself, you KNOW the answers. When you write about someone else, you INFER them \u2014 you use evidence and imagination together. This is called perspective-taking, and it\u2019s one of the hardest thinking skills there is.", y, { color: C.SECONDARY });

  y = addSectionHeading(doc, "Adapted Bio-Poem Format", y, { color: C.ACCENT });

  const adaptedLines = [
    "Line 1: Character/figure\u2019s first name",
    "Line 2: Three or four adjectives (based on evidence from the text/history)",
    "Line 3: Important relationship (who were they connected to?)",
    "Line 4: Who loved... (three things \u2014 infer from what you know)",
    "Line 5: Who felt... (three emotions they likely experienced)",
    "Line 6: Who feared... (based on challenges they faced)",
    "Line 7: Who achieved... (a real accomplishment from their life/story)",
    "Line 8: Who hoped... (what did they wish for or work toward?)",
    "Line 9: Lived in...",
    "Line 10: Last name",
  ];

  adaptedLines.forEach((line) => {
    doc.fontSize(10).font("Helvetica").fillColor(hex(C.CHARCOAL));
    doc.text(line, PAGE.MARGIN + 10, y, { width: PAGE.CONTENT_W - 10 });
    y = doc.y + 4;
  });
  y += 6;

  y = addSectionHeading(doc, "Your Investigation", y, { color: C.ACCENT });
  y = addBodyText(doc, "Choose a character or historical figure you\u2019ve studied this term. Use the format above to write their bio-poem. For each line, ask yourself: \"What evidence do I have for this?\"", y);
  y += 4;

  // Write space
  y = addBodyText(doc, "Character/Figure chosen: _________________________________", y, { fontSize: 11 });
  y += 4;
  y = addLinedArea(doc, y, 12);

  y = addTipBox(doc, "Did You Know? Bio-poems were originally used by historians to understand historical figures. Writing one about someone else helps you practise empathy \u2014 seeing the world through another person\u2019s eyes.", y, { color: C.PRIMARY });

  addPdfFooter(doc, "Inquiry | Identity | Year 5/6 | Extending Investigation");
  await writePdf(doc, `${OUT_DIR}/EXT1_Bio_Poem_Investigation.pdf`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Run
// ─────────────────────────────────────────────────────────────────────────────

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
