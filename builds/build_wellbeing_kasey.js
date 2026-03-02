// Wellbeing — Kasey the Kind Kangaroo
// Year 5/6 | The Power of Kindness in Our Community
// Uses shared helpers from themes/wb_helpers.js

"use strict";

const pptxgen = require("pptxgenjs");
const fs      = require("fs");

const {
  C, FONT_H, FONT_B,
  makeCardShadow,
  SAFE_BOTTOM, CONTENT_TOP,
  iconToBase64Png,
  addTopBar, addBadge, addTitle, addCard, addFooter, addIconCircle,
  withReveal,
  titleSlide, liSlide, contentSlide, pairShareSlide,
  cfuSlide, taskSlide, closingSlide,
} = require("../themes/wb_helpers");

const {
  FaComments,
  FaHandHoldingHeart,
  FaClock,
  FaUsers,
  FaBrain,
  FaHeart,
  FaStar,
} = require("react-icons/fa");

const OUT_DIR = "output/Wellbeing_Kasey_Kindness";
const FOOTER  = "Wellbeing  |  Kasey the Kind Kangaroo  |  Year 5/6";

// ─────────────────────────────────────────────────────────────────────────────
// Teacher notes
// ─────────────────────────────────────────────────────────────────────────────

const NOTES_TITLE = `SAY:
• Let the title settle as students arrive. Don't rush the start.
• "We're going to explore kindness today — not as a nice feeling that comes and goes, but as a skill you can build and choose every day."
• "Kasey is a character who shows us what kindness looks like when it's not easy — and that's where things get interesting."

DO:
• Display this slide as students settle. Pause before speaking.
• Gesture toward the subtitle: "The Power of Kindness in Our Community."

TEACHER NOTES:
This title slide signals the tone for the lesson: serious inquiry into wellbeing, not a "feelings chat." Year 5/6 students can disengage if wellbeing lessons feel tokenistic. The framing "skill you can build" positions kindness as learnable and agentic, which is more engaging for this age group. The lesson aligns to the Victorian Curriculum Personal and Social Capability strand: recognising emotions, developing empathy, and contributing to positive group and community relationships.

WATCH FOR:
• Students who make dismissive comments early ("kindness is baby stuff") — acknowledge them: "That's a view worth testing. Let's see if it holds up." Do not challenge defensively.
• Students who seem withdrawn — note them for individual check-in during You Do.

[General: Title — VTLM 2.0: Enabling Learning]`;

const NOTES_LI = `SAY:
• Read from slide: "We are learning to understand what kindness is, why it matters, and how to make it a daily habit."
• "By the end of today, you'll be able to look at a real situation and see a kindness opportunity — and know what to do with it."
• Read each success criterion with students: "Say these out loud with me."
• Ask: "Give a thumbs up next to the criterion you feel most confident about already." [Diagnostic — don't comment on individual responses.]

DO:
• Point to each SC as you read it.
• Ask for thumbs up responses to gauge prior confidence.
• Note which SC gets fewest thumbs up — this is where you'll focus attention.

TEACHER NOTES:
Explicit sharing of learning objectives and success criteria is non-negotiable in VTLM 2.0. For wellbeing lessons, research shows students engage more deeply when they see the concrete skills being built — not just the emotional theme. The three SCs move from knowledge (explain) to application (describe) to action (plan), spanning Bloom's lower and middle tiers. This prevents the lesson stalling at a "feelings discussion" level and ensures it reaches transferable behaviour.

WATCH FOR:
• All thumbs up on every SC — probe one or two: "Tell me what SC 2 means in your own words." Socially desirable responses are common.
• No thumbs up on SC 3 — this is useful. Tell students: "That's exactly what this lesson is designed to give you."

[General: LI/SC — VTLM 2.0: Explicit Explanation]`;

const NOTES_PRIOR = `SAY:
• "Before we meet Kasey, I want you to connect to your own experience first."
• "Take 10 seconds of silent thinking time after you read each question. Don't answer yet — just think."
• After pair share: Ask one pair to share with the class. Follow up: "What EXACTLY did that person do? Not just 'they were nice' — what was the specific action?"

DO:
• Allow 10 seconds silent think time after students read the questions.
• Signal Turn & Talk clearly — allow 90 seconds.
• Cold call 2-3 pairs (not just volunteers). Use "hands down" language.

CFU CHECKPOINT:
Technique: Cold Call with Probing Question

Script:
• "Hands down — I'm going to choose someone." Cold call: "Tell me about a time someone showed you kindness."
• Follow-up probe: "What EXACTLY did they do? Start with a verb — what action did they take?"
• Scan for: Students who name a specific action ("she gave up her seat") rather than just a feeling ("I felt happy").

PROCEED (if ≥80% name a specific action):
Move to Slide 4 — vocabulary introduction. Students have sufficient lived experience to anchor the concepts.

PIVOT (if <80% describe feelings rather than actions):
Most likely issue: Students associate kindness with feelings rather than behaviours — "I felt good" rather than "she did X."
Reteach angle: "Kindness always lives in the DOING, not the feeling. Start with a verb. What did the person say or do physically? Even something small — 'she held the door,' 'he said well done.'" Model with your own example: "Let me show you. Yesterday, [colleague] saw I was carrying a heavy load and opened the door without me asking. That's kindness — one specific action." Re-prompt: "Now you. Start with a verb."

TEACHER NOTES:
This prior knowledge activation does two things: (1) connects abstract content to lived experience, reducing cognitive load when new vocabulary is introduced; (2) gives the teacher diagnostic information about students' current conceptual level. Students who can only describe kindness as "being nice" are still at the surface — they need the vocabulary and story content to build precision. This slide is the REVIEW / ACTIVATION stage in Checklist C.

MISCONCEPTIONS:
• Misconception: "Kindness means doing nice things when you feel like it."
  Why: Students have absorbed kindness as mood-dependent — you're kind when you feel generous, not as a discipline or daily practice.
  Impact: Students won't see kindness as something they can choose consistently. They'll wait for the mood to arrive.
  Quick correction: "Kasey has a difficult day in the story. Watch what she does when she doesn't feel like being kind. That's the interesting part."

WATCH FOR:
• Students who go quiet during pair share — may be processing a difficult social memory. Do not cold call these students here. Check in quietly during independent work.
• Students who describe a kind act as "just normal" without recognising it as noteworthy — affirm: "That's what consistent kindness looks like — it becomes ordinary for the person who practises it."

[General: Review / Prior Knowledge Activation — VTLM 2.0: Retention & Recall, Knowledge & Memory]`;

const NOTES_VOCAB = `SAY:
• "Before we look at Kasey's story, we need three key terms locked in — because we'll use them for the rest of the lesson."
• Point to KINDNESS: "We're upgrading our definition today. Kindness is not just 'being nice' — it's a deliberate act. You choose it."
• Point to EMPATHY: "Empathy is often confused with sympathy. Sympathy is feeling SORRY for someone. Empathy is feeling WITH them — stepping into their experience and seeing through their eyes."
• Point to RIPPLE EFFECT: "You'll see this play out in Kasey's story. One act changes something. That change creates more changes. The kindness spreads outward — like ripples in still water."
• Ask: "Which of these three would be hardest to explain to a Year 2 student? Tell your neighbour." [Cold call one response.]

DO:
• Point to each term and definition as you explain it.
• Pause on EMPATHY — it's the most commonly misunderstood. Allow 3 seconds of silence after defining it.

TEACHER NOTES:
Pre-teaching vocabulary before the story content reduces cognitive load during the narrative phase. Research (Beck, McKeown & Kucan) shows Tier 2 words like "empathy" and "ripple effect" require direct instruction because they appear across many contexts but are rarely defined explicitly. Students seeing these terms before the story can focus on comprehension rather than decoding new vocabulary mid-narrative. "Ripple effect" is introduced here as a conceptual metaphor that the lesson builds toward — it will be tested in the hinge question.

MISCONCEPTIONS:
• Misconception: Empathy equals sympathy.
  Why: Students hear the two words used interchangeably in media and everyday conversation.
  Impact: They'll use "empathy" as a synonym for "feeling sorry" rather than as perspective-taking — the actual skill being built.
  Quick correction: "Sympathy: Your dog is sick and I feel sorry FOR you. Empathy: I imagine what it feels like to love a pet and then lose it, and I feel that WITH you. The difference is whether I stay outside your experience or step into it."

WATCH FOR:
• Students who copy the definitions before you've finished explaining — redirect: "Listen first, write later."
• Students who already know "empathy" — ask them: "Give me an example from your own life, not a definition." Textbook definitions without personal connection don't signal deep understanding.

[General: Explicit Instruction (I Do) — VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_STORY = `SAY:
• "Let's meet Kasey. I'm going to walk you through four moments from her week at Billabong School."
• "Watch for what SPECIFICALLY Kasey does — not just that she's kind, but the exact action and what it cost her."
• Moment 1 — The Lonely Joey: "Kasey sees Jasper eating alone at lunch. She could keep walking — it's easier. She doesn't. She invites him to join her group. Why does this take courage? [Her friends might think it's awkward. Jasper might not want to come. She risks social discomfort for a stranger.]"
• Moment 2 — The Reading Circle: "Kasey gives up her favourite spot in the library circle so a smaller student can see the board. She says nothing about it — just moves."
• Moment 3 — Standing Up for Marcus: "Kasey tells her teacher that Marcus is being left out of playground games. Some students might call this telling tales. Is it? [No — she's advocating for someone who can't advocate for themselves. That's a higher form of kindness.]"
• Moment 4 — A Quiet Word: "When Mia makes a mistake in class and looks embarrassed, Kasey leans over and whispers 'You've got this.' She doesn't make a big deal of it."
• Ask: "Which of these four moments do you think took the most courage? Hold that thought — we'll use it in a moment."

DO:
• Point to each scene title on the slide as you narrate it.
• Pause on Moment 3 — the "is it dobbing?" question is deliberate. Use the productive tension.
• Do NOT rush this slide. These four moments are the content for the lesson.

TEACHER NOTES:
The I Do here is narrative-driven, not skills-driven. Students learn about kindness through story because narrative is concrete, emotionally engaging, and more memorable than abstract definitions alone (aligned with VTLM 2.0 Knowledge and Memory element). Each of the four moments represents a different type of kind act: inclusion (M1), self-sacrifice (M2), advocacy (M3), and emotional support (M4). These map directly to the four types of kindness introduced in Slide 8. The CFU on Slide 6 checks whether students understand WHY the acts are significant, not just WHAT happened.

WATCH FOR:
• Students who only identify Moment 1 as "the most obvious" — probe: "What made Moment 3 harder for Kasey than Moment 1?"
• Students who challenge Moment 3 as "dobbing" — this is a productive misconception. Don't shut it down: "What is the difference between telling tales and advocating for someone who can't do it for themselves?"

[General: Explicit Instruction (I Do) — VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_CFU1 = `SAY:
• "Now I want to know what YOU think — not what I told you."
• "Read the question. You have 15 seconds of silent thinking time first."
• After pair share: "I'm choosing someone — hands stay down."
• After responses: Click to the next slide to reveal the expected response.

DO:
• Display the question slide first. Allow 15 seconds silent think time before pair share.
• Signal Turn & Talk — allow 60 seconds.
• Cold call 2 students before clicking to reveal.
• Click to next slide to reveal the expected response after student responses are gathered.

CFU CHECKPOINT:
Technique: Think-Pair-Share → Cold Call

Script:
• "Silently: which of Kasey's four acts took the most courage, and why? 15 seconds."
• [15 seconds] "Turn to your partner. One person first, then swap. 60 seconds."
• [Cold call] "I'm choosing someone. [Name] — what did you and your partner decide?"
• Follow-up: "[Name], did your pair agree or land somewhere different?"
• Look for: Students who reference the COST or RISK of the act — not just what Kasey did. "She risked embarrassment," "she risked her friendships" signals genuine understanding of kindness as a deliberate choice.

PROCEED (if ≥80% reference risk or social cost):
Move to Slide 7 — The Science of Kindness. Students understand kindness as intentional and sometimes difficult.

PIVOT (if <80% describe kindness as automatic or easy):
Most likely misconception: Students see kindness as a pleasant impulse that costs nothing — not a choice made despite social risk.
Reteach angle: "Let me ask you something. When Kasey invited Jasper to sit with her, what could have GONE WRONG for Kasey? [Her friends might have been annoyed. Jasper might have said no. She might have looked desperate to seem kind.] So she knew those risks — and she CHOSE to do it anyway. That is what makes it kindness. Not the feeling. The choice."
Re-check: "With that in mind — which act took the most courage and why? Whisper your new answer to your partner. One sentence each."

TEACHER NOTES:
This CFU sits at the transition between the story content (I Do) and the science of kindness (next I Do). It checks whether students have moved beyond surface recall ("Kasey helped Jasper") to genuine comprehension ("kindness requires overcoming social risk"). If students are still at the surface level, the reteach anchors the concept before moving to abstraction. This is a GRR decision point: if the pivot is triggered, do not move to Slide 7 — return to the story content and reteach from a different angle before re-checking.
• Click to reveal only AFTER student responses have been gathered. Never click early.

WATCH FOR:
• Students who copy the most vocal student's answer — cold call quieter students first to capture independent thinking.
• A student who gives a genuinely nuanced response (e.g., "Moment 4 is hardest because you risk being laughed at for being kind publicly") — affirm this explicitly. It models high-quality thinking for the class.

[General: Monitor Progress (CFU) — VTLM 2.0: Monitor Progress]`;

const NOTES_SCIENCE = `SAY:
• "Here's something that surprised even me when I first read it: being kind is not just morally right. It's scientifically good for you."
• Point to Finding 1 — Oxytocin: "When you do something kind, your brain releases a chemical called oxytocin — sometimes called the 'kindness chemical.' It makes you feel calm and connected. The GIVER benefits, not just the receiver. Your brain is literally rewarding you for being kind."
• Point to Finding 2 — Moral Elevation: "Research shows that watching someone be kind makes you more likely to be kind yourself. Scientists call this 'moral elevation.' It's the mechanism behind the ripple effect — one act of kindness spreads because witnessing kindness changes people."
• Point to Finding 3 — Stress Reduction: "Acts of kindness reduce stress — for both the person giving and the person receiving. That's verified by the same research used in hospitals and schools."
• Ask: "So if kindness is good for your brain AND reduces stress — why do people sometimes choose NOT to be kind? What gets in the way?" [Expected: fear of judgement, not noticing the opportunity, thinking it won't matter, being in a rush.]

DO:
• Point to each finding pill on the right as you explain it.
• Pause after the oxytocin point — allow 3 seconds of silence. "Let that land."
• Ask the "why don't people choose it?" question before moving on.

TEACHER NOTES:
Embedding scientific evidence in a wellbeing lesson elevates the topic from "feelings talk" to evidence-based practice — significantly increasing engagement in Year 5/6 students, particularly those who are skeptical of wellbeing content. The oxytocin research is from Zak (2012). Moral elevation research comes from Haidt (2000). Stress reduction findings come from Post (2005). You don't need to cite these in the lesson — the point is that you can speak about this content with confidence because it has a solid research base. The "why don't people choose it?" question is critical: it surfaces the social barriers to kindness that the lesson addresses in the You Do task.

WATCH FOR:
• Students who respond with cynicism ("That sounds made up") — don't dismiss this: "Good critical thinking. Scientists test ideas because someone always says that. Here's what happened when they tested it: [restate the finding]. The data was consistent across thousands of participants."
• Students who ask "What IS oxytocin?" — brief answer: "A chemical your brain makes that creates feelings of connection and calm. We'll go deeper in Science later. For now: your brain rewards you for being kind. That's the key idea."

[General: Explicit Instruction (I Do) — VTLM 2.0: Explicit Explanation & Modelling]`;

const NOTES_TYPES = `SAY:
• "Now we're going to practise identifying different types of kindness. There are four categories — and research shows people tend to be stronger in some types than others."
• Point to each of the four types in turn:
  — "Words of Kindness: compliments, encouragement, noticing someone's effort. These cost nothing and take seconds."
  — "Acts of Service: helping someone without being asked. Not because you have to — because you see a need."
  — "Sharing Time: actually listening when someone wants to talk. Not waiting for your turn to speak — genuinely being present."
  — "Including Others: noticing who's been left out and making a deliberate move to include them. This is often the hardest one."
• "Think of ONE example from your own life for each type. It doesn't have to be something YOU did — it can be something you witnessed."
• "Turn to your partner and share. One type each — 60 seconds."

DO:
• Allow 60 seconds pair share, then cold call one example per type from different students.
• Affirm examples that go beyond the obvious: "That's a really precise example — what made it stand out as kindness rather than just politeness?"

CFU CHECKPOINT:
Technique: Finger Voting (self-assessment — which type is hardest for you?)

Script:
• "Look at the four types. Show me on your fingers — hold up 1, 2, 3, or 4 for the type YOU find hardest to do consistently. 1 = Words, 2 = Acts, 3 = Time, 4 = Including. Go."
• Scan the room: note the most common answer. This directly informs the You Do task — students whose hardest type is Including should be nudged toward that in their Kindness Plan.
• Say: "The type most of us find hardest is [name it]. Interesting. Keep that in mind when you make your Kindness Plan — that's where the growth is."

PROCEED: Move to Slide 9 — Hinge Question.
PIVOT: This is a preference/self-awareness check, not a comprehension check. All responses are valid. Use the data formatively to inform the You Do task.

TEACHER NOTES:
This We Do moves students from passive learning (I Do) to active engagement with the content. The four types of kindness draw from research on prosocial behaviour (Layous & Lyubomirsky, 2014) and align with differentiated prosocial expression in adolescent development. The Finger Voting CFU is low-stakes and informative — it gives the teacher real-time data about which type of kindness is perceived as hardest. This data should directly inform which students you check in with during the You Do task. Students who find Including Others hardest are the most important group to target — this type has the strongest impact on school culture.

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: For each of the four types of kindness, write down ONE example you have either experienced or witnessed in the last week. Label each example with the type.
• Extra Notes: If students struggle to recall examples, prompt them to think about small, everyday interactions rather than dramatic acts of kindness.

EXTENDING PROMPT:
• Task: For each of the four types of kindness, write a scenario where the "kind" act could backfire — and explain what the person could do differently to make it genuinely kind rather than well-intentioned but unhelpful. (E.g., Acts of Service can feel patronising if the person didn't want help.)

WATCH FOR:
• Students who claim they do all four types equally well — probe: "Tell me about the last time you included someone who was left out." This question reliably surfaces the gap between aspiration and practice.
• Students who avoid the Finger Voting — allow quiet or eyes-down responses. Some students feel embarrassed by their answer. What matters is that they engage with the reflection, not that you see their answer.

[General: Guided Practice (We Do) — VTLM 2.0: Scaffold Practice]`;

const NOTES_CFU2 = `SAY:
• "This is a hinge question. There is one best answer — your job is to find it and justify it."
• "Read the scenario and the four options carefully. You have 30 seconds to choose — no conferring."
• After Four Corners: Ask one student from EACH corner to justify their answer before revealing.
• Then click to next slide to reveal the correct answer.

DO:
• Display the question slide first. Allow 30 seconds silent thinking time.
• Run Four Corners: "Each corner of the room is a letter. Bottom left = A, top left = B, top right = C, bottom right = D. When I say go — move. No changing once you've chosen. Go."
• Call on one student per corner to justify before revealing.
• Click to next slide to reveal ONLY after all four corners have spoken.

CFU CHECKPOINT:
Technique: Four Corners (Hinge Question)

Script:
• "Bottom left = A, top left = B, top right = C, bottom right = D. Move to your answer. Go."
• [After movement] "Starting with corner B — why did you choose B?"
• Work through all four corners, one student per corner.
• "Here's the reveal." [Click to next slide.]
• Look for: Students who move to A AND justify it by tracing a chain of effects — not just identifying the first effect. The ripple goes: act → effect → second effect → broader impact.

PROCEED (if ≥80% choose A and can justify the chain):
Move to Slide 10 — My Kindness Plan. Students are ready for independent application.

PIVOT (if <80% choose A, or students cannot explain the chain):
Most likely misconception: Students are selecting the most emotionally satisfying answer (B — "Mia feels better") rather than the answer that demonstrates a chain of ripple effects. They're applying empathy correctly but confusing it with the ripple effect concept.
Reteach angle: "Let me show you the difference. B is correct that Mia feels better. But a ripple is a CHAIN — one effect creates another. Look at A: Mia feels better [first ripple] → she tries harder [second ripple] → the class watches this and sees that mistakes are OK [third ripple] → others start taking more learning risks [fourth ripple]. That's the ripple effect — not just one impact, but the chain of impacts that one kind act creates. B, C, and D all stop at the FIRST ripple."
Re-check: "Name ONE situation in our classroom where a kind act could create a ripple that spreads beyond the first person. Whisper it to your partner."

TEACHER NOTES:
This hinge question tests the threshold concept of the lesson: can students use the ripple effect to trace a chain of cause-and-effect from one kind act outward? The correct answer (A) requires students to follow the logic of the ripple, not just identify the most emotionally resonant outcome. If students fail this check, the You Do task will be superficial — they'll plan a kind act without being able to articulate its broader impact, which is the core learning outcome. The PIVOT must happen before releasing to independent work.

WATCH FOR:
• Students who look around to copy before moving — use "eyes closed, then move" if needed.
• Students in corner B who cannot articulate why beyond "Mia feels better" — probe: "And then what? What happens next?"
• Students in corner A who give vague justifications ("It just seemed most complete") — push for the chain: "Walk me through it — step by step, what happens after Kasey whispers those words?"

[General: Monitor Progress (CFU / Hinge) — VTLM 2.0: Monitor Progress]`;

const NOTES_YOUDO = `SAY:
• "You've seen kindness in action. You understand why it matters and how it spreads. Now it's your turn."
• "This is a planning task, not a feelings exercise. I want specifics — not 'I'll try to be nicer.' I want a person, an action, and a predicted ripple."
• Launch each step: "FIRST: Choose one person in our school community. It doesn't have to be a friend — in fact, it shouldn't be, because that's the easy version. NEXT: Name the exact type of kindness you'll show, and what specifically you will DO. Not a feeling — an action with a verb. THEN: Predict the ripple — what might change for them? And what might change because of THAT change?"
• "Five to seven minutes. Begin."

DO:
• Circulate immediately — do not stay at the front.
• Target students staring blankly first: "Who's someone you've noticed recently who might need some kindness? Start there."
• Note 2-3 strong plans for sharing at the end (with permission).

TEACHER NOTES:
This You Do is grounded in research on wellbeing interventions: small, specific, planned kind acts are significantly more likely to be carried out than vague intentions ("I'll try to be nicer"). The three-step structure (First/Next/Then) is a CLT-informed scaffold for breaking a planning task into manageable pieces. The "predict the ripple" step is the key: it requires students to apply the ripple effect concept from the lesson to their own situation, completing the transfer from concept to action. For resistant students: "This is not a feelings exercise. It's a planning document. Be specific."

ENABLING & EXTENDING:
ENABLING PROMPT:
• Task: Choose ONE type of kindness from the grid on the previous slide. Write down ONE act you've already done or seen that fits that type. Then use that same type for your Kindness Plan — who will you show it to this week?
• Extra Notes: If the planning task feels abstract, anchor with a prompt: "Think about someone you walked past today who was on their own. What could you do tomorrow morning?"

EXTENDING PROMPT:
• Task: Plan a CLASS-LEVEL kindness initiative — not just a personal act. Identify a problem in our school community, select the type of kindness that best addresses it, and map the full ripple effect chain: Act → First Effect → Second Effect → Community Impact. What would need to happen for the ripple to reach the whole school?

WATCH FOR:
• Students writing vague plans ("I'll be kinder") — redirect specifically: "Be kinder HOW? What will you say or do? When? To whom?"
• Students who choose the easiest person to be kind to (their best friend) — probe: "What's the type of kindness you said felt hardest? What would your plan look like if you tried THAT type with someone less familiar?"
• Readiness signal: A student who can name a specific person, a specific action, a specific time, AND describe one ripple effect is ready for the extending task.

[General: Independent Practice (You Do) — VTLM 2.0: Supported Application]`;

const NOTES_EXIT = `SAY:
• "Last check before we close. This one is yours alone — I want to know what YOU think."
• "Write your answer on a sticky note or in your workbook. I'll collect it."
• "This helps me plan our next lesson. Be honest — there are no wrong answers here."

DO:
• Distribute exit ticket medium (sticky notes or direct to workbook).
• Allow 3-4 minutes — circulate but do not prompt individual students.
• Collect at the door as students leave, OR collect by table before closure.

CFU CHECKPOINT:
Technique: Quick-Write Exit Ticket

Script:
• "Complete this sentence: The kindness challenge I'm taking on this week is [what you will do], and I think it will affect [who] because [reason — the ripple]."
• Look for: A specific act (verb + object), a named person or group, and a cause-effect chain that reflects understanding of the ripple effect. These three elements are the success indicators for this lesson.

PROCEED: Close with Slide 12. Review exit tickets before next lesson to group students by readiness for the next wellbeing lesson.
PIVOT: If during collection you notice blank tickets or very vague responses, note those students for individual check-in at the start of the next lesson. Do not call attention to this publicly.

TEACHER NOTES:
Exit tickets are the formative assessment data point for this lesson. Sort after class into three groups: Ready (specific act + ripple chain), Developing (specific act, no ripple), Needs Reteach (vague or blank). Use this grouping to plan differentiation for the next lesson. Students in the "Developing" group need one more modelled example of the ripple effect in a new context before they can transfer the concept independently.

WATCH FOR:
• Students who ask "Does this get marked?" — reassure: "This is for me, not a grade. I want to know how to support you in the next lesson."
• Students who write the minimum possible ("I'll say hi to someone") — decide whether this is low effort or genuine struggle. Probe briefly if you're unsure: "Who's the someone? When this week?"

[General: Monitor Progress / Exit Ticket — VTLM 2.0: Monitor Progress & Feedback]`;

const NOTES_CLOSING = `SAY:
• "Here's your Turn & Talk to close."
• Read the prompt from the slide — allow 60-90 seconds pair discussion.
• Cold call one pair: "What did you and your partner land on?"
• Close with: "Kasey didn't wait to FEEL kind before acting. She acted — and the feeling followed. The challenge I'm leaving you with is this: for the rest of this week, notice one moment each day where you could choose kindness. Then choose it."

DO:
• Display the closing slide while students discuss.
• Signal pair share, then cold call one pair.
• End with energy — not a flat close.

TEACHER NOTES:
The closing slide consolidates learning through retrieval (Turn & Talk forces active recall) and future-focusing (the kindness plan connects today's learning to action tomorrow). Research on wellbeing programs consistently shows that transfer from lesson to behaviour requires a commitment mechanism. Students who state their plan aloud — even to just one person — are significantly more likely to follow through. The key takeaways mirror the three success criteria, creating a clean closing loop for the lesson.

WATCH FOR:
• Students who are dismissive of the Turn & Talk ("We already did this") — these students may need the extending task next lesson. Check their exit ticket.
• Students still writing their Kindness Plan — allow them to finish during Turn & Talk time. The plan is more important than the discussion for these students.

[General: Closing / Review — VTLM 2.0: Retention & Recall]`;

// ─────────────────────────────────────────────────────────────────────────────
// Build
// ─────────────────────────────────────────────────────────────────────────────

async function build() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // Pre-render icons for the Types of Kindness grid
  const [iconWords, iconActs, iconTime, iconInclude, iconBrain, iconHeart, iconStar] =
    await Promise.all([
      iconToBase64Png(FaComments,        "#FFFFFF", 256),
      iconToBase64Png(FaHandHoldingHeart,"#FFFFFF", 256),
      iconToBase64Png(FaClock,           "#FFFFFF", 256),
      iconToBase64Png(FaUsers,           "#FFFFFF", 256),
      iconToBase64Png(FaBrain,           "#FFFFFF", 256),
      iconToBase64Png(FaHeart,           "#FFFFFF", 256),
      iconToBase64Png(FaStar,            "#FFFFFF", 256),
    ]);

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Wellbeing";
  pres.title  = "Kasey the Kind Kangaroo";

  // ── Slide 1: Title ──────────────────────────────────────────────────────────
  titleSlide(
    pres,
    "Kasey the Kind Kangaroo",
    "The Power of Kindness in Our Community",
    "Wellbeing  |  Year 5/6",
    NOTES_TITLE
  );

  // ── Slide 2: Learning Intention + Success Criteria ─────────────────────────
  liSlide(
    pres,
    [
      "We are learning to understand what kindness is, why it matters, and how to make it a daily habit.",
    ],
    [
      "explain what kindness means and describe specific examples of kind acts",
      "describe how kindness affects others — including the ripple effect",
      "plan one specific act of kindness I will carry out this week",
    ],
    NOTES_LI,
    FOOTER
  );

  // ── Slide 3: Prior Knowledge Activation ────────────────────────────────────
  pairShareSlide(
    pres,
    "Connect to Your Experience",
    [
      "Think of a time someone was kind to you. What EXACTLY did they do? How did it make you feel?",
      "Think of a time YOU were kind to someone else. What happened next — for them, and for you?",
    ],
    NOTES_PRIOR,
    FOOTER
  );

  // ── Slide 4: Key Vocabulary (custom three-term inline layout) ──────────────
  {
    const s = pres.addSlide();
    addTopBar(s, C.OCEAN);
    addBadge(s, "Vocabulary", { color: C.OCEAN });
    addTitle(s, "Key Terms for Today", { color: C.OCEAN });

    const terms = [
      {
        term:  "Kindness",
        def:   "A deliberate act of helping, caring for, or bringing joy to others — chosen, not just felt.",
        color: C.FOREST,
      },
      {
        term:  "Empathy",
        def:   "Understanding and sharing the feelings of another person — stepping into their experience and seeing through their eyes.",
        color: C.OCEAN,
      },
      {
        term:  "Ripple Effect",
        def:   "When one act of kindness spreads and inspires others to be kind too — like ripples moving outward in still water.",
        color: C.CORAL,
      },
    ];

    const CARD_H = 1.0;
    const GAP    = 0.15;

    terms.forEach((term, i) => {
      const y = CONTENT_TOP + i * (CARD_H + GAP);
      // Full-width white card
      addCard(s, 0.5, y, 9.0, CARD_H, { fill: C.WHITE });
      // Coloured left label box (plain rect inside the card)
      s.addShape("rect", {
        x: 0.5, y, w: 2.3, h: CARD_H,
        fill: { color: term.color },
      });
      s.addText(term.term, {
        x: 0.5, y, w: 2.3, h: CARD_H,
        fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      // Definition text
      s.addText(term.def, {
        x: 2.98, y: y + 0.1, w: 6.3, h: CARD_H - 0.2,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_VOCAB);
  }

  // ── Slide 5: I Do — Kasey's Four Moments ──────────────────────────────────
  // Slide face shows scene titles only — teacher narrates the story content (SAY)
  contentSlide(
    pres,
    "I Do — Story", C.FOREST,
    "Kasey's Week at Billabong School",
    [
      "Moment 1:  The Lonely Joey",
      "Moment 2:  The Reading Circle",
      "Moment 3:  Standing Up for Marcus",
      "Moment 4:  A Quiet Word of Encouragement",
    ],
    NOTES_STORY,
    FOOTER
  );

  // ── Slide 6: CFU 1 — Think-Pair-Share (with reveal) ───────────────────────
  withReveal(
    () => cfuSlide(
      pres,
      "CFU",
      "Think-Pair-Share",
      "Think-Pair-Share",
      "Which of Kasey's four moments took the most courage — and why?",
      NOTES_CFU1,
      FOOTER
    ),
    (s) => {
      // Reveal: expected response card
      s.addShape("roundRect", {
        x: 0.5, y: 4.22, w: 9.0, h: 0.72, rectRadius: 0.08,
        fill: { color: C.FOREST },
      });
      s.addText("Expected response: Students name the RISK or COST of the act — not just what Kasey did. Any moment can be correct if the reasoning identifies what Kasey chose to sacrifice or risk in order to be kind.", {
        x: 0.7, y: 4.27, w: 8.6, h: 0.62,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, valign: "middle", margin: 0,
      });
    }
  );

  // ── Slide 7: I Do — The Science of Kindness ───────────────────────────────
  contentSlide(
    pres,
    "I Do — Science", C.FOREST,
    "The Science of Kindness",
    [
      "Oxytocin — your brain releases a 'kindness chemical' when you help others",
      "Moral Elevation — witnessing kindness makes others more likely to be kind",
      "Kindness reduces stress for the giver AND the receiver",
    ],
    NOTES_SCIENCE,
    FOOTER,
    (s) => {
      // Right column: three coloured finding pills with icons
      const RX = 6.05;
      const findings = [
        { icon: iconBrain,  color: C.FOREST, label: "Oxytocin",         sub: "Brain rewards kind acts" },
        { icon: iconStar,   color: C.OCEAN,  label: "Moral Elevation",  sub: "Kindness is contagious" },
        { icon: iconHeart,  color: C.CORAL,  label: "Stress Reduction", sub: "Giver & receiver both benefit" },
      ];
      const pillH = 1.0;
      const gap   = 0.2;
      findings.forEach((f, i) => {
        const y = CONTENT_TOP + i * (pillH + gap);
        s.addShape("roundRect", {
          x: RX, y, w: 3.45, h: pillH, rectRadius: 0.16,
          fill: { color: f.color },
        });
        // Icon
        addIconCircle(s, f.icon, RX + 0.42, y + pillH / 2, 0.28, f.color);
        s.addShape("roundRect", {
          x: RX + 0.14, y: y + pillH / 2 - 0.28, w: 0.56, h: 0.56, rectRadius: 0.28,
          fill: { color: C.WHITE, transparency: 25 },
        });
        s.addImage({ data: f.icon, x: RX + 0.19, y: y + pillH / 2 - 0.23, w: 0.46, h: 0.46 });
        // Label
        s.addText(f.label, {
          x: RX + 0.82, y: y + 0.1, w: 2.55, h: 0.42,
          fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true, valign: "middle", margin: 0,
        });
        s.addText(f.sub, {
          x: RX + 0.82, y: y + 0.54, w: 2.55, h: 0.34,
          fontSize: 10, fontFace: FONT_B, color: C.WHITE, valign: "middle", margin: 0,
        });
      });
    }
  );

  // ── Slide 8: We Do — Four Types of Kindness (2 × 2 grid) ──────────────────
  {
    const s = pres.addSlide();
    addTopBar(s, C.FOREST);
    addBadge(s, "We Do — Discuss", { color: C.FOREST, w: 2.2 });
    addTitle(s, "Four Types of Kindness");

    const CARD_W  = 4.3;
    const CARD_H  = 1.8;
    const COL_GAP = 0.3;
    const ROW_GAP = 0.2;
    const COL2_X  = 0.5 + CARD_W + COL_GAP;   // 5.1
    const ROW2_Y  = CONTENT_TOP + CARD_H + ROW_GAP;  // 3.3

    const types = [
      { icon: iconWords,   color: C.FOREST, label: "Words of Kindness",   desc: "Compliments, encouragement, noticing someone's effort — costs nothing, takes seconds.",           col: 0, row: 0 },
      { icon: iconActs,    color: C.OCEAN,  label: "Acts of Service",      desc: "Helping someone without being asked — because you see a need, not because you have to.",         col: 1, row: 0 },
      { icon: iconTime,    color: C.CORAL,  label: "Sharing Time",         desc: "Genuinely listening when someone wants to talk — being present, not waiting for your turn.",      col: 0, row: 1 },
      { icon: iconInclude, color: C.MIDNIGHT, label: "Including Others",   desc: "Noticing who has been left out and making a deliberate move to welcome them in.",               col: 1, row: 1 },
    ];

    types.forEach((t) => {
      const x = t.col === 0 ? 0.5 : COL2_X;
      const y = t.row === 0 ? CONTENT_TOP : ROW2_Y;
      addCard(s, x, y, CARD_W, CARD_H, { fill: C.WHITE });
      // Coloured icon circle on left
      const CX = x + 0.52;
      const CY = y + CARD_H / 2;
      addIconCircle(s, t.icon, CX, CY, 0.32, t.color);
      // Type label
      s.addText(t.label, {
        x: x + 1.05, y: y + 0.28, w: CARD_W - 1.22, h: 0.42,
        fontSize: 14, fontFace: FONT_H, color: C.CHARCOAL, bold: true, margin: 0,
      });
      // Description
      s.addText(t.desc, {
        x: x + 1.05, y: y + 0.75, w: CARD_W - 1.22, h: 0.95,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, valign: "top", margin: 0,
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_TYPES);
  }

  // ── Slide 9: CFU 2 — Hinge Question (with reveal) ─────────────────────────
  // Layout constants used by both buildFn and revealFn
  const H_SCEN_Y  = CONTENT_TOP;
  const H_SCEN_H  = 0.9;
  const H_OPT_Y1  = CONTENT_TOP + H_SCEN_H + 0.1;   // 2.3
  const H_OPT_Y2  = H_OPT_Y1 + 1.35 + 0.1;           // 3.75
  const H_OPT_H   = 1.35;
  const H_OPT_W   = 4.3;
  const H_COL2_X  = 5.1;

  const hingeOptions = [
    {
      label: "A",
      text: "Mia feels better \u2192 tries harder \u2192 the class sees that mistakes are OK \u2192 others start taking more learning risks",
      col: 0, row: 0,
    },
    {
      label: "B",
      text: "Mia feels better in that moment",
      col: 1, row: 0,
    },
    {
      label: "C",
      text: "Kasey feels good about herself for being kind",
      col: 0, row: 1,
    },
    {
      label: "D",
      text: "The teacher notices Kasey\u2019s positive behaviour",
      col: 1, row: 1,
    },
  ];

  function buildHingeSlide() {
    const s = pres.addSlide();
    addTopBar(s, C.CORAL);
    addBadge(s, "Hinge Question", { color: C.CORAL, w: 2.4 });
    addTitle(s, "Which Best Describes the Ripple Effect?", { color: C.CORAL });

    // Scenario card
    addCard(s, 0.5, H_SCEN_Y, 9.0, H_SCEN_H, { fill: C.WHITE, strip: C.CORAL });
    s.addText("Kasey notices that Mia looks embarrassed after making a mistake in class. She leans over and whispers, \u201CYou\u2019ve got this.\u201D Which answer best describes the ripple effect of that act?", {
      x: 0.75, y: H_SCEN_Y + 0.12, w: 8.5, h: H_SCEN_H - 0.22,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
    });

    // Four option cards
    hingeOptions.forEach((opt) => {
      const x = opt.col === 0 ? 0.5 : H_COL2_X;
      const y = opt.row === 0 ? H_OPT_Y1 : H_OPT_Y2;
      addCard(s, x, y, H_OPT_W, H_OPT_H, { fill: C.WHITE });
      // Label box
      s.addShape("roundRect", {
        x, y, w: 0.7, h: H_OPT_H, rectRadius: 0.08,
        fill: { color: C.CORAL },
      });
      s.addText(opt.label, {
        x, y, w: 0.7, h: H_OPT_H,
        fontSize: 18, fontFace: FONT_H, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      s.addText(opt.text, {
        x: x + 0.84, y: y + 0.1, w: H_OPT_W - 0.98, h: H_OPT_H - 0.2,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_CFU2);
    return s;
  }

  withReveal(
    () => buildHingeSlide(),
    (s) => {
      // Reveal: green overlay on A + correct answer banner
      s.addShape("roundRect", {
        x: 0.5, y: H_OPT_Y1, w: H_OPT_W, h: H_OPT_H, rectRadius: 0.1,
        fill: { color: C.FOREST, transparency: 82 },
      });
      s.addShape("roundRect", {
        x: 0.5, y: H_OPT_Y2 + H_OPT_H - 0.5, w: 9.0, h: 0.48, rectRadius: 0.08,
        fill: { color: C.FOREST },
      });
      s.addText("\u2713  A is correct — this is the ripple effect: one act creates a chain of changes beyond the first person.", {
        x: 0.7, y: H_OPT_Y2 + H_OPT_H - 0.5, w: 8.6, h: 0.48,
        fontSize: 12, fontFace: FONT_B, color: C.WHITE, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
    }
  );

  // ── Slide 10: You Do — My Kindness Plan ────────────────────────────────────
  taskSlide(
    pres,
    "You Do",
    "My Kindness Plan",
    [
      {
        label:       "First",
        instruction: "Choose ONE person in our school community to show kindness to this week. Name them (or their role — e.g., 'the student who sits alone at lunch').",
      },
      {
        label:       "Next",
        instruction: "Write the EXACT act of kindness you will do. Use a verb. Name the type: Words / Acts of Service / Sharing Time / Including Others.",
      },
      {
        label:       "Then",
        instruction: "Predict the ripple: what will change for THEM because of your act? What might change next — beyond the first effect?",
      },
    ],
    NOTES_YOUDO,
    FOOTER
  );

  // ── Slide 11: Exit Ticket ──────────────────────────────────────────────────
  cfuSlide(
    pres,
    "Exit Ticket",
    "Exit Ticket",
    "Quick-Write",
    "The kindness challenge I\u2019m taking on this week is ___________, and I think it will affect ___________ because ___________.",
    NOTES_EXIT,
    FOOTER
  );

  // ── Slide 12: Closing ──────────────────────────────────────────────────────
  closingSlide(
    pres,
    "What\u2019s one type of kindness you found hardest today — and what would it look like if you chose it anyway this week?",
    [
      "Kindness is a deliberate act — not a mood.",
      "The ripple effect means your act affects more than one person.",
      "Your Kindness Plan is a commitment — make it specific.",
    ],
    NOTES_CLOSING
  );

  // ── Write file ─────────────────────────────────────────────────────────────
  const outFile = `${OUT_DIR}/Wellbeing_Kasey_Kindness.pptx`;
  await pres.writeFile({ fileName: outFile });
  console.log(`\nDone. Slides written to: ${outFile}\n`);
  console.log("Slide count: 14 (12 unique + 2 click-to-reveal duplicates)\n");
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
