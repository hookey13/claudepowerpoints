// War Horse — Lesson 13: Chapter 11 — Taken Away
// Year 6 Narrative Writing | Week 3 | Subordinating Conjunctions

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const {
  C, FONT_H, FONT_B, makeShadow, makeCardShadow,
  iconToBase64Png,
  addTopBar, addBadge, addTitle, addCard, addFooter,
  titleSlide, liSlide, pausePointSlide, closingSlide,
} = require("../themes/wh_helpers");

const {
  FaBookOpen, FaPen, FaChalkboardTeacher, FaUsers, FaSearch,
  FaQuoteLeft, FaFeatherAlt, FaPencilAlt, FaBook,
  FaComments, FaLightbulb, FaUserEdit, FaCheckCircle,
} = require("react-icons/fa");
const { MdMenuBook, MdEdit } = require("react-icons/md");

const FOOTER = "Week 3  |  War Horse  |  Lesson 13";

async function build() {
  if (!fs.existsSync("output")) fs.mkdirSync("output");

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Claude";
  pres.title = "War Horse — Lesson 13: Chapter 11 — Taken Away";

  // Pre-render icons
  const icons = {
    bookOpen:    await iconToBase64Png(FaBookOpen, "#" + C.WHITE, 256),
    bookOlive:   await iconToBase64Png(FaBookOpen, "#" + C.OLIVE, 256),
    pen:         await iconToBase64Png(FaPen, "#" + C.WHITE, 256),
    penGold:     await iconToBase64Png(FaPen, "#" + C.GOLD, 256),
    teacher:     await iconToBase64Png(FaChalkboardTeacher, "#" + C.WHITE, 256),
    teacherOlive:await iconToBase64Png(FaChalkboardTeacher, "#" + C.OLIVE, 256),
    users:       await iconToBase64Png(FaUsers, "#" + C.WHITE, 256),
    usersOlive:  await iconToBase64Png(FaUsers, "#" + C.OLIVE, 256),
    search:      await iconToBase64Png(FaSearch, "#" + C.WHITE, 256),
    searchOlive: await iconToBase64Png(FaSearch, "#" + C.OLIVE, 256),
    quote:       await iconToBase64Png(FaQuoteLeft, "#" + C.GOLD, 256),
    feather:     await iconToBase64Png(FaFeatherAlt, "#" + C.WHITE, 256),
    featherBurg: await iconToBase64Png(FaFeatherAlt, "#" + C.BURGUNDY, 256),
    pencil:      await iconToBase64Png(FaPencilAlt, "#" + C.WHITE, 256),
    menuBook:    await iconToBase64Png(MdMenuBook, "#" + C.WHITE, 256),
    menuBookOlive: await iconToBase64Png(MdMenuBook, "#" + C.OLIVE, 256),
    comments:    await iconToBase64Png(FaComments, "#" + C.WHITE, 256),
    lightbulb:   await iconToBase64Png(FaLightbulb, "#" + C.GOLD, 256),
    lightbulbW:  await iconToBase64Png(FaLightbulb, "#" + C.WHITE, 256),
    userEdit:    await iconToBase64Png(FaUserEdit, "#" + C.WHITE, 256),
    check:       await iconToBase64Png(FaCheckCircle, "#" + C.OLIVE, 256),
    checkWhite:  await iconToBase64Png(FaCheckCircle, "#" + C.WHITE, 256),
    edit:        await iconToBase64Png(MdEdit, "#" + C.WHITE, 256),
  };


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ══════════════════════════════════════════════════════════════════════════

  titleSlide(
    pres,
    "War Horse",
    "Chapter 11 \u2014 Taken Away",
    "Lesson 13  |  Week 3  |  Year 6 Narrative Writing",
    `SAY:
\u2022 Continuing War Horse \u2014 Chapter 11 today
\u2022 Recap: Chapter 10 was peaceful \u2014 Emilie caring for Joey and Topthorn on the farm, everything hopeful
\u2022 Today's chapter is called "Taken Away" \u2014 that title alone signals a shift
\u2022 Ask: Keep the feeling of hope from Chapter 10 in mind as we read [Students should notice the contrast]

DO:
\u2022 Display the title slide as students settle
\u2022 Allow 30 seconds for students to read the title and subtitle
\u2022 Use tone of voice to signal the tonal shift \u2014 measured, slightly more serious than yesterday

TEACHER NOTES:
This is the second lesson of Week 3. Students read Chapter 10 in Lesson 12 and practised subordinating conjunctions for the first time. Today builds directly on that foundation \u2014 same sentence-level skill but with new content from Chapter 11. The tonal shift from hopeful (Ch 10) to loss (Ch 11) is a deliberate authorial choice that students will analyse. This connects to the DECIDE framework's focus on authorial purpose and the VTLM 2.0 emphasis on understanding how texts work. The emotional arc mirrors the structure students will eventually use in their own narratives (Lessons 14-15).

WATCH FOR:
\u2022 Students who weren't present for Lesson 12 \u2014 they may need a quick recap of Chapter 10 and subordinating conjunctions
\u2022 Engagement level \u2014 if students seem flat, use the chapter title "Taken Away" as a hook to build anticipation

[General: Opening | VTLM 2.0: Engaging with Texts]`
  );


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — Learning Intentions & Success Criteria
  // ══════════════════════════════════════════════════════════════════════════

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
      "I can identify how the author uses shifting events to change tone and mood",
      "I can discuss how perspective is shown through Joey\u2019s narration",
      "I can complete a complex sentence by adding an independent clause to a dependent clause using a subordinating conjunction",
    ],
    `SAY:
\u2022 Read through learning intentions and success criteria together
\u2022 LI 1: Why Morpurgo structured Ch 10 and Ch 11 the way he did \u2014 peace then loss is a deliberate choice
\u2022 LI 2: When Morpurgo tells us something through Joey\u2019s eyes \u2014 is that the whole truth, or only part of the picture?
\u2022 LI 3: How characters respond to events in this chapter
\u2022 LI 4: Joey as narrator \u2014 he can only tell us what he sees and feels
\u2022 LI 5: Subordinating conjunctions \u2014 building on yesterday\u2019s work with new Chapter 11 content
\u2022 Ask: Which success criterion connects to yesterday\u2019s lesson? [Expected: the third one about subordinating conjunctions]

DO:
\u2022 Read each learning intention aloud, pausing briefly after each
\u2022 Point to relevant success criteria as you explain the connections
\u2022 Ask students to identify which success criterion connects to yesterday's lesson [expected: the third one about subordinating conjunctions]

TEACHER NOTES:
The learning intentions span both reading comprehension and writing composition, reflecting the integrated nature of this unit. The success criteria are deliberately sequenced: reading analysis first (identifying tone/mood shifts), then comprehension (perspective through narration), then writing application (subordinating conjunctions). This mirrors the lesson flow. The subordinating conjunction criterion builds directly on Lesson 12's introduction. Students should recognise this skill from yesterday \u2014 if they don't, that's a signal to spend more time on the I Do modelling later.

WATCH FOR:
\u2022 Students who can't articulate the connection between yesterday's lesson and today's success criteria \u2014 this indicates fragile understanding of subordinating conjunctions that will need scaffolding in the We Do phase
\u2022 Students who look lost at the number of learning intentions \u2014 reassure them these span the whole lesson, not a single activity

[General: Orientation | VTLM 2.0: Engaging with Texts]`,
    FOOTER
  );


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — Vocabulary Review (Daily Review)
  // ══════════════════════════════════════════════════════════════════════════

  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Daily Review", { color: C.SAGE, w: 1.6 });
    addTitle(s, "Vocabulary Review");

    // Left card — Previously Taught Words
    addCard(s, 0.5, 1.3, 4.3, 3.1, { strip: C.OLIVE });
    s.addShape("oval", { x: 0.75, y: 1.45, w: 0.45, h: 0.45, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.bookOlive, x: 0.82, y: 1.52, w: 0.31, h: 0.31 });
    // White icon over the dark circle
    s.addImage({ data: icons.bookOpen, x: 0.82, y: 1.52, w: 0.31, h: 0.31 });
    s.addText("Previously Taught Words", {
      x: 1.35, y: 1.45, w: 3.2, h: 0.45,
      fontSize: 14, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0, valign: "middle",
    });

    const prevWords = [
      { word: "hazardous", def: "(adj.) risky, dangerous \u2014 \u201CThe hazardous conditions on the battlefield put every soldier at risk.\u201D" },
      { word: "lavish", def: "(adj.) sumptuously rich or elaborate \u2014 \u201CEmilie lavished attention on Joey and Topthorn.\u201D" },
      { word: "desolate", def: "(adj.) bleak, empty \u2014 \u201CThe desolate no man\u2019s land stretched endlessly.\u201D" },
      { word: "valiant", def: "(adj.) showing courage \u2014 \u201CThe valiant horses charged forward despite the noise.\u201D" },
    ];
    prevWords.forEach((w, i) => {
      const yPos = 2.05 + i * 0.55;
      s.addText([
        { text: w.word, options: { bold: true, color: C.CHARCOAL, fontSize: 12 } },
        { text: " \u2014 " + w.def, options: { color: C.CHARCOAL, fontSize: 10.5 } },
      ], { x: 0.78, y: yPos, w: 3.8, h: 0.5, fontFace: FONT_B, margin: 0 });
    });

    // Right card — Today's Focus
    addCard(s, 5.2, 1.3, 4.3, 3.1, { strip: C.GOLD });
    s.addShape("oval", { x: 5.45, y: 1.45, w: 0.45, h: 0.45, fill: { color: C.GOLD } });
    s.addImage({ data: icons.lightbulbW, x: 5.52, y: 1.52, w: 0.31, h: 0.31 });
    s.addText("Today\u2019s Focus", {
      x: 6.05, y: 1.45, w: 3.2, h: 0.45,
      fontSize: 14, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0, valign: "middle",
    });

    s.addText([
      { text: "content", options: { bold: true, fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: "(adjective) \u2014 in a state of peaceful happiness; satisfied", options: { fontSize: 11, color: C.CHARCOAL, breakLine: true } },
      { text: "\u201CJoey felt content working as a farm horse with Emilie.\u201D", options: { fontSize: 10.5, italic: true, color: C.MUTED, breakLine: true } },
      { text: "Note: NOT the noun \u2018content\u2019 (material/substance)", options: { fontSize: 10, color: C.BURGUNDY, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "adapt", options: { bold: true, fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: "(verb) \u2014 to become adjusted to new conditions", options: { fontSize: 11, color: C.CHARCOAL, breakLine: true } },
      { text: "\u201CThe horses had to adapt to life on the farm after the battlefield.\u201D", options: { fontSize: 10.5, italic: true, color: C.MUTED } },
    ], { x: 5.48, y: 2.05, w: 3.8, h: 2.2, fontFace: FONT_B, margin: 0 });

    // Incidental vocab bar
    addCard(s, 0.5, 4.55, 9, 0.7, { fill: C.WARM });
    s.addText("Incidental Vocabulary:", {
      x: 0.7, y: 4.6, w: 2.2, h: 0.25,
      fontSize: 10, fontFace: FONT_B, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addText("occasional  \u00B7  astride  \u00B7  content  \u00B7  jealousy  \u00B7  besieged  \u00B7  exuberant  \u00B7  adapted  \u00B7  exertion  \u00B7  incessant  \u00B7  bespectacled  \u00B7  unwillingly", {
      x: 0.7, y: 4.85, w: 8.6, h: 0.3,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Cold-call: What does "hazardous" mean? [Risky, dangerous] Where did we see it? [Battlefield/war conditions]
\u2022 Ask: What about "lavish"? [Sumptuously rich, elaborate] \u2014 remember Emilie lavishing care on the horses (same word as adjective and verb)
\u2022 Quick revisit of "desolate" and "valiant" from earlier in the unit
\u2022 Ask: Give me a sentence using "valiant" [Expected: The valiant soldiers/horses did something brave]
\u2022 New word: "content" \u2014 the adjective, con-TENT (not CON-tent the noun)
\u2022 Meaning: feeling satisfied and peaceful \u2014 "Joey felt content on the farm"
\u2022 Ask: Say it with me: con-TENT [Students repeat; stress on second syllable when adjective]
\u2022 New word: "adapt" \u2014 to adjust to new conditions
\u2022 Example: The horses had to adapt from battlefield life to farm life
\u2022 Ask: Think of a time you\u2019ve had to adapt to something new [Take 2\u20133 responses]
\u2022 Keep both words in mind for Chapter 11

DO:
\u2022 Cold-call for hazardous and lavish definitions \u2014 don't just accept the first hand up
\u2022 Write 'content' on the board with both pronunciations: CON-tent (noun) vs con-TENT (adjective)
\u2022 Have students say con-TENT aloud to embed the pronunciation
\u2022 Quick pair-share: "Tell your partner about a time you had to adapt"

TEACHER NOTES:
The daily vocabulary review spirals previously taught words while introducing new ones. 'Content' as a multiple-meaning word is pedagogically rich \u2014 it requires students to use context to determine meaning, which is a key reading comprehension skill. 'Adapt' connects directly to the chapter content where the horses adapt from war to farm and then back again. The incidental vocabulary list is for teacher awareness during the read \u2014 don't explicitly teach all of these, but be prepared to define them if students ask. This connects to the DECIDE framework's emphasis on building vocabulary through rich text encounters and the VTLM 2.0 focus on word knowledge.

WATCH FOR:
\u2022 Students who pronounce 'content' with stress on the first syllable (the noun pronunciation) \u2014 correct immediately and practise the adjective pronunciation
\u2022 Students who confuse 'adapt' with 'adopt' \u2014 brief clarification: adapt means to change yourself, adopt means to take something on
\u2022 If students can't recall hazardous or lavish, this signals they need more exposure \u2014 consider adding these to a classroom word wall

[General: Vocabulary | VTLM 2.0: Word Knowledge]`);
  }


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — Chapter Introduction
  // ══════════════════════════════════════════════════════════════════════════

  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Text-Level Reading", { color: C.OLIVE, w: 2.0 });
    addTitle(s, "Chapter 11 \u2014 Pages 88\u201396");

    // Reading mode pill
    s.addShape("roundRect", {
      x: 5.8, y: 0.2, w: 2.2, h: 0.36, rectRadius: 0.08,
      fill: { color: C.SAGE },
    });
    s.addText("Student Read Aloud", {
      x: 5.8, y: 0.2, w: 2.2, h: 0.36,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Chapter overview icon
    s.addShape("oval", { x: 0.6, y: 1.35, w: 0.55, h: 0.55, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.menuBook, x: 0.68, y: 1.43, w: 0.38, h: 0.38 });

    s.addText("Chapter Overview", {
      x: 1.3, y: 1.38, w: 3, h: 0.45,
      fontSize: 16, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0, valign: "middle",
    });

    // Main content card
    addCard(s, 0.5, 2.0, 9, 2.5, { strip: C.GOLD });

    s.addText([
      { text: "Joey and Topthorn are released from their duty with the field hospital as the battleground shifts and the troops move further away.", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "They get to spend time working as farm horses with Emilie and her grandfather.", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "One day, the soldiers return and camp overnight on the farm. By morning, they need to move on and declare that they will take Joey and Topthorn with them as they are needed to help pull a gun.", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "Emilie is very upset by this and says a sad goodbye as the horses are taken away into war again.", options: { fontSize: 12, color: C.CHARCOAL, bold: true } },
    ], { x: 0.8, y: 2.1, w: 8.5, h: 2.3, fontFace: FONT_B, margin: 0 });

    // Tonal shift callout
    s.addShape("roundRect", {
      x: 0.5, y: 4.65, w: 9, h: 0.4, rectRadius: 0.06,
      fill: { color: C.BURGUNDY, transparency: 10 },
    });
    s.addText("\u26A0  Tonal Shift:  Chapter 10 was hopeful and warm \u2014 Chapter 11 brings loss and separation.", {
      x: 0.7, y: 4.65, w: 8.6, h: 0.4,
      fontSize: 11, fontFace: FONT_B, color: C.BURGUNDY, bold: true, margin: 0, valign: "middle",
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Chapter 11, pages 88\u201396 \u2014 student read aloud today, selecting readers as we go
\u2022 Recap: Chapter 10 ended on a hopeful note \u2014 Joey and Topthorn safe on the farm with Emilie
\u2022 Ask: Look at the chapter title "Taken Away" \u2014 what does that make you predict? [Take 2\u20133 predictions; expected: horses get taken, something bad happens, soldiers return]
\u2022 Overview: Horses released from hospital duties as battleground shifts \u2192 spend time as farm horses with Emilie and grandfather \u2192 soldiers return, camp overnight, announce they\u2019re taking the horses to pull a gun \u2192 Emilie devastated, horses taken back to war
\u2022 Key focus: We\u2019re going from peace to war, hope to fear \u2014 pay close attention to how Morpurgo signals this shift
\u2022 Ask: What clues does the author give us that things are about to change? [Hold this question as we read]

DO:
\u2022 Read the chapter overview aloud \u2014 slowly, giving weight to each section
\u2022 Pause after the tonal shift callout and let it sink in
\u2022 Have students open their books to page 88
\u2022 Select first student reader (choose a confident reader for the opening)
\u2022 Stop at designated pause points (slides 5, 6, 7)

TEACHER NOTES:
This chapter is pivotal in the narrative arc. Morpurgo deliberately creates an emotional pattern of hope-loss-hope that mirrors the unpredictability of wartime. Students need to recognise this as an authorial choice, not just a plot event. The reading mode is student read aloud \u2014 select readers strategically, choosing confident readers for emotionally charged passages and less confident readers for descriptive passages. The tonal shift from Chapter 10 to Chapter 11 is the core analytical focus today, connecting to the first success criterion about how authors use shifting events to change tone and mood. This is DECIDE's text analysis in action.

WATCH FOR:
\u2022 Students who read too quickly through emotional passages \u2014 coach them to slow down and let the words land
\u2022 Students who seem disengaged from the emotional content \u2014 these students may need direct questioning at pause points
\u2022 Readers who struggle with the vocabulary (astride, besieged, exuberant) \u2014 have the incidental vocab list ready to support

[General: Text Introduction | VTLM 2.0: Engaging with Texts]`);
  }


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 5 — Pause Point 1
  // ══════════════════════════════════════════════════════════════════════════

  pausePointSlide(
    pres,
    "Look at them, Emilie, do they look unhappy?",
    "91",
    "What just happened? How has the author let us know that something has changed?",
    `SAY:
\u2022 Read from slide: "Look at them, Emilie, do they look unhappy?"
\u2022 Ask: Why is the grandfather asking this question? If everything was fine, would he need to ask? [Expected: Something must have happened to make Emilie worried or the horses seem different]
\u2022 The horses were content (vocabulary word) on the farm \u2014 but now something has shifted
\u2022 Ask: What clues has Morpurgo given us that things are changing? Think about language, descriptions, anything different from the peaceful farm scenes [Take 3\u20134 responses]
\u2022 The grandfather is trying to reassure Emilie \u2014 but the fact he HAS to reassure her tells us she senses change coming
\u2022 Key point: Great authors don\u2019t switch from happy to sad in one sentence \u2014 they build it gradually through foreshadowing

DO:
\u2022 Stop the student reader at this exact quote
\u2022 Display the slide and give 10 seconds of silent think time
\u2022 Pair-share for 30 seconds, then cold-call 3-4 students
\u2022 Write key student observations on the board (e.g., "Emilie is worried," "grandfather is reassuring," "atmosphere is changing")
\u2022 Explicitly name the technique: foreshadowing through dialogue

TEACHER NOTES:
This pause point targets the first success criterion: identifying how the author uses shifting events to change tone and mood. The grandfather's question is a foreshadowing device \u2014 it signals that the peace is fragile. Students should be able to identify that the need for reassurance implies threat. This connects to Lesson 12's character analysis work (how characters reveal their feelings through what they say and do). In the DECIDE framework, this is questioning authorial assertions \u2014 why does Morpurgo include this seemingly simple question? Because it does heavy lifting in building tension. VTLM 2.0's focus on perspective is evident here: the grandfather sees the horses differently from Emilie because he understands the realities of war.

WATCH FOR:
\u2022 Students who focus only on literal meaning ("The grandfather is asking about the horses") rather than implied meaning \u2014 push them: "But WHY is he asking? What does that tell us about what Emilie is feeling?"
\u2022 Students who can identify the mood shift but can't explain HOW Morpurgo achieves it \u2014 model the language: "The author uses dialogue to signal that..."
\u2022 Threshold: most students should be able to identify that something is changing even if they can't name the technique

[General: Guided Reading | VTLM 2.0: Responding to Texts]`,
    FOOTER
  );


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 6 — Pause Point 2
  // ══════════════════════════════════════════════════════════════════════════

  pausePointSlide(
    pres,
    "We will be taking them with us.",
    "94",
    "What\u2019s going on?",
    `SAY:
\u2022 Read from slide: "We will be taking them with us."
\u2022 Ask: Who is speaking? [Soldiers] Who are "them"? [Joey and Topthorn]
\u2022 This is the moment everything changes
\u2022 Ask: Did you see this coming? [Some will say yes \u2014 title, Pause Point 1 clues]
\u2022 Morpurgo gave us Chapter 10\u2019s warmth, then Chapter 11\u2019s farm peace \u2014 he made us feel safe \u2014 and now one short sentence takes it all away
\u2022 No long explanation, no negotiation \u2014 just a flat statement from the soldiers
\u2022 Ask: Why does Morpurgo give us hope and then take it away? [Expected: To make us feel what the characters feel, to show war\u2019s suddenness, to create emotional impact]
\u2022 He wants us to feel Emilie\u2019s shock and helplessness \u2014 events drive emotions for characters AND readers
\u2022 Ask: How are you feeling right now? [Take honest responses] Those feelings are Morpurgo\u2019s craft at work

DO:
\u2022 Read the quote aloud yourself \u2014 flatly, without emotion, to mirror the soldier's delivery
\u2022 Let silence sit for 5 seconds after reading it
\u2022 Pair-share: "Why does Morpurgo give us hope and then take it away?"
\u2022 Cold-call 4-5 students
\u2022 Chart responses under a heading: "Morpurgo's Purpose"

TEACHER NOTES:
This is the pivotal moment of the chapter and the key analytical focus. The deliberate construction of hope followed by loss is a fundamental narrative technique that students will use in their own writing (Lessons 14-15). The flat, declarative sentence "We will be taking them with us" contrasts sharply with the emotional weight of what it means \u2014 this is worth naming for students. Morpurgo uses understatement here, and the emotional impact comes from the gap between what is said and what it means. This connects to DECIDE's analysis of authorial choices and VTLM 2.0's focus on how perspective shapes meaning. The soldiers see the horses as tools; Emilie sees them as family. Same event, different perspectives.

WATCH FOR:
\u2022 Students who only respond at plot level ("The soldiers take the horses") without engaging with WHY Morpurgo structures it this way \u2014 redirect: "Yes, but why does the author make us feel safe first?"
\u2022 Students who are genuinely upset \u2014 validate this: "That's exactly what Morpurgo wanted you to feel. Your emotional response IS your analysis."
\u2022 Students who connect this to earlier events in the novel (Albert losing Joey at auction) \u2014 praise and amplify this: "Yes! Morpurgo uses this pattern of loss throughout the book."

[General: Guided Reading | VTLM 2.0: Responding to Texts]`,
    FOOTER
  );


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 7 — Pause Point 3
  // ══════════════════════════════════════════════════════════════════════════

  pausePointSlide(
    pres,
    "But at least this time I had my Topthorn with me.",
    "96",
    "What do you think the author wants us to know?",
    `SAY:
\u2022 Read from slide: "But at least this time I had my Topthorn with me."
\u2022 This is the very end of the chapter \u2014 Joey taken from Emilie, going back to war, everything safe is gone
\u2022 Ask: What does that "at least" tell you? [Expected: He\u2019s trying to find something positive, holding onto hope, Topthorn is his comfort]
\u2022 Joey has lost Emilie, lost the farm, returning to danger \u2014 but finds comfort in one thing: his friend is with him
\u2022 Ask: What does Morpurgo want us to understand? [Expected: Friendship matters, companionship gives hope, even in the worst times you can hold onto something]
\u2022 Compare to the beginning of the novel when Joey was taken from Albert \u2014 was Topthorn there then? [No \u2014 Joey was alone]
\u2022 "At least this time" \u2014 three words carrying huge weight: Joey has been through this before and knows how bad it can be alone
\u2022 Big theme of War Horse: bonds between characters give courage even in the darkest moments \u2014 we\u2019ll return to this at the end of the lesson

DO:
\u2022 Read the quote softly, emphasising "at least"
\u2022 Give 15 seconds of silent reflection time \u2014 this is the emotional climax of the reading
\u2022 Think-pair-share: "What does Morpurgo want us to know?"
\u2022 Harvest responses from 4-5 pairs
\u2022 Make the explicit comparison to Joey's first separation from Albert

TEACHER NOTES:
This quote encapsulates two key themes: the power of companionship and the ability to find hope in darkness. The phrase "at least this time" is rich for analysis \u2014 it simultaneously acknowledges loss AND finds comfort. Students should recognise this as Joey's perspective (second success criterion) and as an authorial choice about how Morpurgo uses narration to convey theme. The comparison to Joey's earlier separation from Albert is important for building students' understanding of narrative patterns and recurring motifs. This connects to DECIDE's character analysis work and anticipates the writing in Lessons 14-15 where students will need to create emotional complexity in their own narratives. VTLM 2.0's focus on inference is central here \u2014 students must read between the lines.

WATCH FOR:
\u2022 Students who can name the theme (friendship/hope) but can't connect it to specific textual evidence \u2014 push them to cite "at least this time" and explain what each word does
\u2022 Students who predict Topthorn's fate \u2014 acknowledge without confirming ("That's an interesting prediction \u2014 let's see what happens in future chapters")
\u2022 Students who connect Joey's narration to the concept of perspective \u2014 this is high-level thinking worth celebrating and naming

[General: Guided Reading | VTLM 2.0: Responding to Texts]`,
    FOOTER
  );


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 8 — Literary Devices
  // ══════════════════════════════════════════════════════════════════════════

  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Literary Devices", { color: C.BURGUNDY, w: 1.9 });
    addTitle(s, "Literary Devices");

    // Definition pills at top
    // Simile definition
    s.addShape("roundRect", {
      x: 0.5, y: 1.3, w: 4.3, h: 0.45, rectRadius: 0.08,
      fill: { color: C.OLIVE, transparency: 12 },
    });
    s.addText([
      { text: "Simile: ", options: { bold: true, color: C.OLIVE, fontSize: 11 } },
      { text: "A comparison using \u2018like\u2019 or \u2018as\u2019", options: { color: C.CHARCOAL, fontSize: 11 } },
    ], { x: 0.65, y: 1.3, w: 4.0, h: 0.45, fontFace: FONT_B, margin: 0, valign: "middle" });

    // Personification definition
    s.addShape("roundRect", {
      x: 5.2, y: 1.3, w: 4.3, h: 0.45, rectRadius: 0.08,
      fill: { color: C.OLIVE, transparency: 12 },
    });
    s.addText([
      { text: "Personification: ", options: { bold: true, color: C.OLIVE, fontSize: 11 } },
      { text: "Giving human qualities to non-human things", options: { color: C.CHARCOAL, fontSize: 11 } },
    ], { x: 5.35, y: 1.3, w: 4.0, h: 0.45, fontFace: FONT_B, margin: 0, valign: "middle" });

    // Simile card
    addCard(s, 0.5, 1.95, 4.3, 2.9, { strip: C.BURGUNDY });
    s.addShape("oval", { x: 0.78, y: 2.1, w: 0.45, h: 0.45, fill: { color: C.BURGUNDY } });
    s.addImage({ data: icons.searchOlive, x: 0.85, y: 2.17, w: 0.31, h: 0.31 });
    s.addImage({ data: icons.search, x: 0.85, y: 2.17, w: 0.31, h: 0.31 });
    s.addText("Simile", {
      x: 1.38, y: 2.12, w: 3, h: 0.4,
      fontSize: 16, fontFace: FONT_H, color: C.BURGUNDY, bold: true, margin: 0, valign: "middle",
    });

    s.addText([
      { text: "\u201C...says he\u2019s got eyes like a wasp...\u201D", options: { italic: true, fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "(p.93)", options: { fontSize: 10, color: C.MUTED, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "The author compares the character\u2019s eyes to a wasp\u2019s using \u201Clike.\u201D", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 4, breakLine: true } },
      { text: "Effect: ", options: { bold: true, fontSize: 12, color: C.OLIVE } },
      { text: "Makes the character seem threatening and unnervingly alert \u2014 wasps are aggressive and watchful.", options: { fontSize: 12, color: C.CHARCOAL } },
    ], { x: 0.78, y: 2.6, w: 3.8, h: 2.1, fontFace: FONT_B, margin: 0 });

    // Personification card
    addCard(s, 5.2, 1.95, 4.3, 2.9, { strip: C.BURGUNDY });
    s.addShape("oval", { x: 5.48, y: 2.1, w: 0.45, h: 0.45, fill: { color: C.BURGUNDY } });
    s.addImage({ data: icons.feather, x: 5.55, y: 2.17, w: 0.31, h: 0.31 });
    s.addText("Personification", {
      x: 6.08, y: 2.12, w: 3, h: 0.4,
      fontSize: 16, fontFace: FONT_H, color: C.BURGUNDY, bold: true, margin: 0, valign: "middle",
    });

    s.addText([
      { text: "\u201C...as the dark of night left the sky...\u201D", options: { italic: true, fontSize: 14, color: C.CHARCOAL, breakLine: true } },
      { text: "(p.93)", options: { fontSize: 10, color: C.MUTED, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "Darkness is given the human action of \u201Cleaving\u201D \u2014 as if the night is a person departing.", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 4, breakLine: true } },
      { text: "Effect: ", options: { bold: true, fontSize: 12, color: C.OLIVE } },
      { text: "Creates a sense of the night departing with purpose, suggesting an inevitable transition \u2014 like the coming change.", options: { fontSize: 12, color: C.CHARCOAL } },
    ], { x: 5.48, y: 2.6, w: 3.8, h: 2.1, fontFace: FONT_B, margin: 0 });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Now that we\u2019ve finished reading, two literary devices to examine \u2014 both on page 93
\u2022 Read from slide: Simile = comparison using "like" or "as"; Personification = giving human qualities to non-human things
\u2022 Simile: "says he\u2019s got eyes like a wasp"
\u2022 Ask: Who is being described? [The soldier/character who comes to take the horses]
\u2022 Ask: Why a wasp, not a hawk or a cat? What do we associate with wasps? [Aggressive, stinging, dangerous, alert, unpleasant]
\u2022 This simile makes us FEEL threatened \u2014 it tells us the character is dangerous
\u2022 Personification: "as the dark of night left the sky"
\u2022 Ask: Can darkness actually leave? [No \u2014 it\u2019s not a person] Morpurgo writes it as if the night is walking away
\u2022 Ask: What effect does this create? [Night feels alive, something inevitable happening, peace departing]
\u2022 Notice timing: this happens right before the soldiers announce they\u2019re taking the horses \u2014 the night "leaving" mirrors the peace about to leave
\u2022 Both devices on the same page \u2014 Morpurgo is layering techniques to build atmosphere

DO:
\u2022 Read both quotes aloud with appropriate emphasis
\u2022 Point to the definition pills as you explain each device
\u2022 Ask students to explain the difference between simile and personification in their own words
\u2022 Write on the board: "SIMILE = comparison (like/as) | PERSONIFICATION = human qualities to non-human things"
\u2022 Challenge: "Can anyone find another literary device in Chapter 11?" (Accept any reasonable response)

TEACHER NOTES:
Literary device identification connects to the learning intention about analysing how perspective is made evident through authorial choices. The simile creates character threat through comparison; the personification creates atmospheric mood through animation of nature. Both are on the same page, which is worth noting \u2014 Morpurgo is layering techniques. Students need to move beyond simple identification ("That's a simile") to analysis of effect ("It makes us feel..."). This is the difference between surface-level and deep reading comprehension. The DECIDE framework emphasises this analytical depth, and VTLM 2.0's focus on making meaning requires students to engage with HOW language creates effect, not just WHAT it says.

WATCH FOR:
\u2022 Students who can identify the device but can't explain the effect \u2014 scaffold with "This makes us feel ___ because ___"
\u2022 Students who confuse simile with metaphor \u2014 clarify: simile uses 'like' or 'as'; metaphor says something IS something else
\u2022 Students who think personification only applies to objects (not abstract concepts like darkness) \u2014 expand their understanding: anything non-human can be personified

[General: Literary Analysis | VTLM 2.0: Examining Texts]`);
  }


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 9 — Vocabulary Focus
  // ══════════════════════════════════════════════════════════════════════════

  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Vocabulary Focus", { color: C.GOLD, w: 2.0 });
    addTitle(s, "Vocabulary Focus");

    // Card 1 — content (adjective)
    addCard(s, 0.5, 1.3, 4.3, 3.0, { strip: C.GOLD });
    s.addText("content", {
      x: 0.8, y: 1.45, w: 3.8, h: 0.45,
      fontSize: 22, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: 0.8, y: 1.95, w: 1.2, h: 0.3, rectRadius: 0.06,
      fill: { color: C.GOLD },
    });
    s.addText("adjective", {
      x: 0.8, y: 1.95, w: 1.2, h: 0.3,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE, align: "center", valign: "middle", bold: true, margin: 0,
    });

    s.addText([
      { text: "Meaning:", options: { bold: true, fontSize: 12, color: C.OLIVE, breakLine: true } },
      { text: "In a state of peaceful happiness; satisfied. Feeling that things are enough and you don\u2019t need more.", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "Example:", options: { bold: true, fontSize: 12, color: C.OLIVE, breakLine: true } },
      { text: "\u201CJoey felt content working as a farm horse alongside Topthorn.\u201D", options: { fontSize: 12, italic: true, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "\u26A0 Not the noun \u2018content\u2019 (material/substance).", options: { fontSize: 11, color: C.BURGUNDY, bold: true } },
    ], { x: 0.8, y: 2.35, w: 3.8, h: 1.85, fontFace: FONT_B, margin: 0 });

    // Card 2 — adapt
    addCard(s, 5.2, 1.3, 4.3, 3.0, { strip: C.GOLD });
    s.addText("adapt", {
      x: 5.5, y: 1.45, w: 3.8, h: 0.45,
      fontSize: 22, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addShape("roundRect", {
      x: 5.5, y: 1.95, w: 0.8, h: 0.3, rectRadius: 0.06,
      fill: { color: C.GOLD },
    });
    s.addText("verb", {
      x: 5.5, y: 1.95, w: 0.8, h: 0.3,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE, align: "center", valign: "middle", bold: true, margin: 0,
    });

    s.addText([
      { text: "Meaning:", options: { bold: true, fontSize: 12, color: C.OLIVE, breakLine: true } },
      { text: "To become adjusted to new conditions; to change in response to your environment.", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "Example:", options: { bold: true, fontSize: 12, color: C.OLIVE, breakLine: true } },
      { text: "\u201CThe horses had to adapt to life on the farm after months on the battlefield.\u201D", options: { fontSize: 12, italic: true, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "Related: adaptation (noun), adaptable (adj.)", options: { fontSize: 11, color: C.SAGE, bold: true } },
    ], { x: 5.5, y: 2.35, w: 3.8, h: 1.85, fontFace: FONT_B, margin: 0 });

    // Multiple meanings note
    addCard(s, 0.5, 4.5, 9, 0.7, { fill: C.WARM });
    s.addShape("oval", { x: 0.7, y: 4.6, w: 0.4, h: 0.4, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.lightbulbW, x: 0.77, y: 4.67, w: 0.26, h: 0.26 });
    s.addText("Multiple-meaning words: context determines meaning. \u201CContent\u201D as an adjective (con-TENT) vs. a noun (CON-tent). How do we decide? We read the sentence around it.", {
      x: 1.25, y: 4.55, w: 8.0, h: 0.6,
      fontSize: 11.5, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Deeper dive into the two focus words \u2014 anchoring them properly
\u2022 "Content" \u2014 say it: con-TENT [Students repeat]
\u2022 Meaning: peaceful happiness, being satisfied
\u2022 Ask: Where do we see Joey feeling content in Chapter 11? [Expected: Working on the farm with Emilie and Topthorn]
\u2022 Key point: the contentment doesn\u2019t last \u2014 Joey was content, then it was taken away \u2014 that\u2019s the emotional punch
\u2022 Ask: Use "content" in a sentence about your own life [Take 2\u20133 responses; notice it naturally follows "felt" or "was" \u2014 that\u2019s because it\u2019s an adjective]
\u2022 "Adapt" \u2014 Joey and Topthorn adapted to farm life after the battlefield, and now at the end of Ch 11 they must adapt again back to war
\u2022 The ability to adapt is a survival skill and a recurring theme in War Horse
\u2022 Multiple-meaning word alert: "the content of the book" (noun, CON-tent) vs "feeling content" (adjective, con-TENT)
\u2022 Ask: How do we know which meaning the author intends? [Context \u2014 read the words around it]

DO:
\u2022 Write both words on the board with definitions
\u2022 Practise pronunciation of con-TENT vs CON-tent with the class
\u2022 Quick-fire: "Thumbs up if I'm using 'content' as an adjective, thumbs down if it's a noun" \u2014 give 3-4 example sentences
\u2022 Students write one sentence using each word in their vocabulary section (if they have one)

TEACHER NOTES:
This deeper vocabulary focus builds on the daily review introduction. The pedagogical value of 'content' as a multiple-meaning word goes beyond this lesson \u2014 it develops the metacognitive skill of using context to determine meaning, which is assessed in NAPLAN and central to VTLM 2.0's word knowledge strand. 'Adapt' connects thematically to the entire novel \u2014 the horses constantly adapt to new environments and people. Students should begin to see vocabulary not as isolated words but as tools for understanding character, theme, and authorial purpose. The DECIDE framework's vocabulary work emphasises deep processing over superficial memorisation.

WATCH FOR:
\u2022 Students who still pronounce 'content' with first-syllable stress when meaning the adjective \u2014 correct consistently
\u2022 Students who confuse 'adapt' with 'adopt' \u2014 have a quick clarification ready: adapt = change yourself; adopt = take something on
\u2022 Students who can define the words but can't use them in original sentences \u2014 this indicates shallow knowledge that needs more exposure

[General: Vocabulary | VTLM 2.0: Word Knowledge]`);
  }


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 10 — I Do: Subordinating Conjunctions (Modelling)
  // ══════════════════════════════════════════════════════════════════════════

  {
    const s = pres.addSlide();
    addTopBar(s, C.GOLD);
    addBadge(s, "I Do", { color: C.GOLD, w: 1.2 });
    addTitle(s, "Subordinating Conjunctions \u2014 Revision & Model", { fontSize: 24 });

    // Revision card
    addCard(s, 0.5, 1.3, 5.2, 2.0, { strip: C.OLIVE });
    s.addShape("oval", { x: 0.78, y: 1.42, w: 0.45, h: 0.45, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.bookOpen, x: 0.85, y: 1.49, w: 0.31, h: 0.31 });
    s.addText("Quick Revision", {
      x: 1.38, y: 1.42, w: 3.5, h: 0.4,
      fontSize: 14, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0, valign: "middle",
    });

    s.addText([
      { text: "Dependent clause: ", options: { bold: true, fontSize: 12, color: C.OLIVE } },
      { text: "Cannot stand alone as a sentence", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "Independent clause: ", options: { bold: true, fontSize: 12, color: C.OLIVE } },
      { text: "Can stand alone as a sentence", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "Subordinating conjunction: ", options: { bold: true, fontSize: 12, color: C.OLIVE } },
      { text: "Connects them", options: { fontSize: 12, color: C.CHARCOAL } },
    ], { x: 0.78, y: 2.0, w: 4.7, h: 1.15, fontFace: FONT_B, margin: 0 });

    // Conjunction pills card — dynamically laid out
    addCard(s, 5.9, 1.3, 3.6, 2.0, { fill: C.WARM });
    s.addText("Subordinating\nConjunctions", {
      x: 6.1, y: 1.38, w: 3.2, h: 0.55,
      fontSize: 12, fontFace: FONT_B, color: C.OLIVE, bold: true, margin: 0,
    });

    const conjunctions = ["When", "Before", "Even though", "Although", "Since", "While", "Because", "After", "Unless", "Until"];

    // Dynamic pill grid layout
    const PILL_H = 0.28;
    const PILL_PAD_X = 0.18;   // horizontal padding inside each pill (total both sides)
    const PILL_GAP_X = 0.12;   // gap between pills horizontally
    const PILL_GAP_Y = 0.10;   // gap between rows vertically
    const PILL_FONT = 10;
    const CHAR_WIDTH = 0.065;   // approximate width per character at fontSize 10
    const GRID_LEFT = 6.1;
    const GRID_RIGHT = 9.35;   // stay within right margin (card ends at 9.5)
    const GRID_TOP = 2.0;
    const GRID_MAX_W = GRID_RIGHT - GRID_LEFT;
    const MIN_PILL_W = 1.3;    // minimum width to fit words like "Although"

    // Calculate pill widths
    const pillWidths = conjunctions.map(c => Math.max(MIN_PILL_W, c.length * CHAR_WIDTH + PILL_PAD_X));

    // Flow pills into rows
    let rows = [];
    let currentRow = [];
    let currentRowW = 0;
    for (let i = 0; i < conjunctions.length; i++) {
      const pw = pillWidths[i];
      const needed = currentRow.length > 0 ? pw + PILL_GAP_X : pw;
      if (currentRowW + needed > GRID_MAX_W && currentRow.length > 0) {
        rows.push(currentRow);
        currentRow = [i];
        currentRowW = pw;
      } else {
        currentRow.push(i);
        currentRowW += needed;
      }
    }
    if (currentRow.length > 0) rows.push(currentRow);

    // Render pills
    rows.forEach((row, ri) => {
      const rowY = GRID_TOP + ri * (PILL_H + PILL_GAP_Y);
      let xCursor = GRID_LEFT;
      row.forEach((idx) => {
        const pw = pillWidths[idx];
        s.addShape("roundRect", {
          x: xCursor, y: rowY, w: pw, h: PILL_H, rectRadius: 0.06,
          fill: { color: C.GOLD, transparency: 25 },
        });
        s.addText(conjunctions[idx], {
          x: xCursor, y: rowY, w: pw, h: PILL_H,
          fontSize: PILL_FONT, fontFace: FONT_B, color: C.OLIVE,
          align: "center", valign: "middle", bold: true, margin: 0,
        });
        xCursor += pw + PILL_GAP_X;
      });
    });

    // Teacher Model card
    addCard(s, 0.5, 3.5, 9, 1.7, { strip: C.GOLD });
    s.addShape("oval", { x: 0.78, y: 3.62, w: 0.45, h: 0.45, fill: { color: C.GOLD } });
    s.addImage({ data: icons.teacher, x: 0.85, y: 3.69, w: 0.31, h: 0.31 });
    s.addText("Teacher Model", {
      x: 1.38, y: 3.62, w: 3.5, h: 0.4,
      fontSize: 14, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0, valign: "middle",
    });

    // Model sentence with colour coding
    s.addText([
      { text: "When the battleground moves further away,", options: { fontSize: 15, color: C.GOLD, bold: true, italic: true, breakLine: false } },
    ], { x: 0.78, y: 4.15, w: 8.5, h: 0.35, fontFace: FONT_B, margin: 0 });

    s.addText([
      { text: "Joey and Topthorn are released to spend time as farm horses with Emilie and her grandfather.", options: { fontSize: 15, color: C.CHARCOAL, breakLine: false } },
    ], { x: 0.78, y: 4.5, w: 8.5, h: 0.35, fontFace: FONT_B, margin: 0 });

    // Legend
    s.addShape("rect", { x: 0.78, y: 4.95, w: 0.25, h: 0.15, fill: { color: C.GOLD } });
    s.addText("= Dependent clause (subordinating conjunction underlined)", {
      x: 1.1, y: 4.9, w: 4, h: 0.22,
      fontSize: 9.5, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
    s.addShape("rect", { x: 5.5, y: 4.95, w: 0.25, h: 0.15, fill: { color: C.CHARCOAL } });
    s.addText("= Independent clause (can stand alone)", {
      x: 5.82, y: 4.9, w: 3.5, h: 0.22,
      fontSize: 9.5, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Moving into writing focus \u2014 subordinating conjunctions, building on yesterday\u2019s Lesson 12 work
\u2022 Ask: What does a subordinating conjunction do? [Expected: Joins a dependent clause to an independent clause / connects two parts of a sentence]
\u2022 Quick revision of terminology:
\u2022 Dependent clause = cannot stand alone. Example: "When the battleground moves further away" \u2014 incomplete thought, leaves you hanging
\u2022 Independent clause = can stand alone. Example: "Joey and Topthorn are released to spend time as farm horses" \u2014 complete sentence
\u2022 Subordinating conjunction = the connecting word ("When" in this case)
\u2022 Read from slide: conjunction list \u2014 When, Before, Even though, Although, Since, While, Because, After, Unless, Until
\u2022 Same skill as yesterday but with Chapter 11 content today
\u2022 Think aloud through the model: choose an event (battleground shifting) \u2192 choose a conjunction ("When") \u2192 build dependent clause (gold text) \u2192 check: can it stand alone? [No] \u2192 add independent clause (dark text) \u2192 check: can THAT stand alone? [Yes]
\u2022 Key rule: when dependent clause comes first, comma after it \u2014 that comma is crucial

DO:
\u2022 Point to each term as you define it
\u2022 Write the model sentence on the whiteboard as you think aloud
\u2022 Use two different coloured markers: gold/yellow for dependent clause, black for independent clause
\u2022 Underline "When" and circle the comma
\u2022 Ask students to identify the conjunction, the comma, and which clause is which
\u2022 Quick check: "Give me a thumbs up if you remember this from yesterday, sideways if you're a bit fuzzy, thumbs down if this is new"

TEACHER NOTES:
This is the second exposure to subordinating conjunctions, building on Lesson 12's introduction. The I Do phase should feel like revision, not new teaching \u2014 if students look confused, slow down and re-teach. The colour-coded sentence is a visual scaffold that makes the clause structure explicit. The think-aloud is critical: students need to see the process of constructing a complex sentence, not just the finished product. This connects to the DECIDE framework's gradual release model (I Do > We Do > You Do) and VTLM 2.0's emphasis on explicit teaching of sentence-level skills. The Chapter 11 content keeps the writing connected to the reading, so students see grammar as a tool for expressing meaning, not an isolated exercise.

WATCH FOR:
\u2022 Students who can't distinguish dependent from independent clauses \u2014 this is the foundational concept; if it's shaky, the We Do and You Do will struggle. Spend extra time here if needed.
\u2022 Students who forget the comma between clauses \u2014 reinforce: "Dependent clause first = comma after it. Always."
\u2022 Students who remember this clearly from Lesson 12 \u2014 these are your peer tutors for the We Do phase. Note who they are.

[General: I Do Modelling | VTLM 2.0: Creating Texts]`);
  }


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 11 — We Do: Guided Practice
  // ══════════════════════════════════════════════════════════════════════════

  {
    const s = pres.addSlide();
    s.background = { color: C.WARM };
    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.SAGE } });

    addBadge(s, "We Do", { color: C.SAGE, w: 1.2 });
    addTitle(s, "Guided Practice \u2014 Complete the Sentence", { color: C.OLIVE, fontSize: 24 });

    // Sentence 1
    addCard(s, 0.5, 1.25, 9, 1.75, { strip: C.SAGE });
    s.addText("1", {
      x: 0.72, y: 1.35, w: 0.35, h: 0.35,
      fontSize: 16, fontFace: FONT_B, color: C.SAGE, bold: true, margin: 0, align: "center",
    });
    s.addText([
      { text: "Before the soldiers return to the farm, ", options: { fontSize: 15, color: C.GOLD, bold: true, italic: true } },
      { text: "...", options: { fontSize: 18, color: C.MUTED, bold: true } },
    ], { x: 0.78, y: 1.75, w: 8.5, h: 0.4, fontFace: FONT_B, margin: 0 });

    // Example answer (muted)
    s.addShape("roundRect", {
      x: 0.78, y: 2.25, w: 8.5, h: 0.55, rectRadius: 0.06,
      fill: { color: C.SAGE, transparency: 85 },
    });
    s.addText([
      { text: "Example: ", options: { bold: true, fontSize: 11, color: C.SAGE } },
      { text: "Before the soldiers return to the farm, Joey and Topthorn enjoy their time with Emilie.", options: { fontSize: 11, color: C.MUTED, italic: true } },
    ], { x: 0.95, y: 2.3, w: 8.2, h: 0.45, fontFace: FONT_B, margin: 0, valign: "middle" });

    // Sentence 2
    addCard(s, 0.5, 3.2, 9, 1.95, { strip: C.SAGE });
    s.addText("2", {
      x: 0.72, y: 3.3, w: 0.35, h: 0.35,
      fontSize: 16, fontFace: FONT_B, color: C.SAGE, bold: true, margin: 0, align: "center",
    });
    s.addText([
      { text: "Even though Emilie promised that Joey and Topthorn wouldn\u2019t be taken away again, ", options: { fontSize: 15, color: C.GOLD, bold: true, italic: true } },
      { text: "...", options: { fontSize: 18, color: C.MUTED, bold: true } },
    ], { x: 0.78, y: 3.7, w: 8.5, h: 0.55, fontFace: FONT_B, margin: 0 });

    // Example answer (muted)
    s.addShape("roundRect", {
      x: 0.78, y: 4.35, w: 8.5, h: 0.55, rectRadius: 0.06,
      fill: { color: C.SAGE, transparency: 85 },
    });
    s.addText([
      { text: "Example: ", options: { bold: true, fontSize: 11, color: C.SAGE } },
      { text: "Even though Emilie promised that Joey and Topthorn wouldn\u2019t be taken away again, her promise was overruled by the wishes of the German soldiers.", options: { fontSize: 11, color: C.MUTED, italic: true } },
    ], { x: 0.95, y: 4.4, w: 8.2, h: 0.45, fontFace: FONT_B, margin: 0, valign: "middle" });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Whiteboards out \u2014 guided practice together
\u2022 Task: I give you a dependent clause (gold text), you complete the sentence with an independent clause
\u2022 Independent clause must make sense on its own as a complete sentence
\u2022 Sentence 1: "Before the soldiers return to the farm..." \u2014 subordinating conjunction is "Before"
\u2022 Ask: What happens before the soldiers return? Think about Chapter 11 \u2014 30 seconds to write on whiteboards [Wait, then boards up]
\u2022 Scan boards, read 2\u20133 aloud
\u2022 Read from slide: Example \u2014 "Before the soldiers return to the farm, Joey and Topthorn enjoy their time with Emilie."
\u2022 Ask: Does the independent clause work on its own? [Yes] Where\u2019s the comma? [After "farm"]
\u2022 Sentence 2 (trickier, longer dependent clause): "Even though Emilie promised that Joey and Topthorn wouldn\u2019t be taken away again..."
\u2022 Subordinating conjunction: "Even though" \u2014 what happened despite Emilie\u2019s promise? 30 seconds [Wait, boards up]
\u2022 Read from slide: Example \u2014 "her promise was overruled by the wishes of the German soldiers"
\u2022 Key point: the contrast between promise and reality is what makes "Even though" powerful

DO:
\u2022 Students write on mini whiteboards
\u2022 Use "boards up" for whole-class scanning \u2014 check every board, not just volunteers
\u2022 Cold-call 3-4 students to read their sentences aloud
\u2022 For sentence 2, pair struggling students with someone who got sentence 1 correct
\u2022 After sharing the example answers, have students check: "Does your independent clause work as a sentence on its own?"
\u2022 If many students struggle with sentence 2, break it down: "What happened?" then "Now start that with a capital letter and make sure it's a complete thought"

TEACHER NOTES:
The We Do phase provides scaffolded practice before independent work. Sentence 1 uses "Before" (straightforward temporal conjunction) while Sentence 2 uses "Even though" (concessive conjunction, longer and more complex). This deliberate difficulty gradient lets you assess where each student is. The whiteboard strategy allows real-time formative assessment \u2014 you can see every student's response and identify who needs support in the You Do phase. The example answers are deliberately muted/collapsed on screen so they don't anchor student thinking prematurely. Reveal them AFTER students have attempted their own. This connects to DECIDE's guided practice phase and VTLM 2.0's emphasis on supported writing before independent composition.

WATCH FOR:
\u2022 Students who write a dependent clause instead of an independent clause (e.g., "...because they were taken away") \u2014 redirect: "Can that stand alone as a sentence? No? Then it's still a dependent clause. You need an independent clause."
\u2022 Students who forget the comma \u2014 have them circle where the comma should go before holding up boards
\u2022 Students who write a response for sentence 1 but go blank on sentence 2 \u2014 this is expected due to the increased complexity. Scaffold: "What did the soldiers actually do despite Emilie's promise?"
\u2022 Students who finish quickly \u2014 challenge them: "Can you rewrite the sentence with a different conjunction? What about 'Although' instead of 'Even though'?"

[General: We Do | VTLM 2.0: Creating Texts]`);
  }


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 12 — You Do: Independent Practice in Writing Books
  // ══════════════════════════════════════════════════════════════════════════

  {
    const s = pres.addSlide();
    s.background = { color: C.WARM };
    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.BURGUNDY } });

    addBadge(s, "You Do", { color: C.BURGUNDY, w: 1.2 });
    addTitle(s, "Your Turn \u2014 Writing Books", { color: C.OLIVE, fontSize: 24 });

    // Step cards — First / Next / Then
    const steps = [
      {
        label: "First",
        color: C.OLIVE,
        text: "Open your writing book. Write the heading:\nSubordinating Conjunctions \u2014 Chapter 11",
        icon: icons.bookOpen,
      },
      {
        label: "Next",
        color: C.GOLD,
        text: "Write three complex sentences about Chapter 11. Each sentence must begin with a dependent clause using a different subordinating conjunction.",
        icon: icons.pen,
      },
      {
        label: "Then",
        color: C.BURGUNDY,
        text: "Underline the subordinating conjunction and circle the comma. Swap books with a partner \u2014 check each other\u2019s sentences.",
        icon: icons.users,
      },
    ];

    steps.forEach((st, i) => {
      const yPos = 1.25 + i * 1.35;
      addCard(s, 0.5, yPos, 9, 1.15, { strip: st.color });

      // Label pill
      s.addShape("roundRect", {
        x: 0.78, y: yPos + 0.12, w: 1.0, h: 0.32, rectRadius: 0.06,
        fill: { color: st.color },
      });
      s.addText(st.label, {
        x: 0.78, y: yPos + 0.12, w: 1.0, h: 0.32,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, align: "center", valign: "middle", bold: true, margin: 0,
      });

      // Icon
      s.addShape("oval", { x: 8.72, y: yPos + 0.3, w: 0.48, h: 0.48, fill: { color: st.color, transparency: 15 } });
      s.addImage({ data: st.icon, x: 8.78, y: yPos + 0.36, w: 0.36, h: 0.36 });

      s.addText(st.text, {
        x: 1.95, y: yPos + 0.12, w: 6.5, h: 0.9,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "middle",
      });
    });

    // Conjunction reminder bar
    s.addShape("roundRect", {
      x: 0.5, y: 4.85, w: 9, h: 0.45, rectRadius: 0.06,
      fill: { color: C.OLIVE, transparency: 88 },
    });
    s.addText([
      { text: "Conjunctions: ", options: { bold: true, fontSize: 10, color: C.OLIVE } },
      { text: "When  \u00B7  Before  \u00B7  Even though  \u00B7  Although  \u00B7  Since  \u00B7  While  \u00B7  Because  \u00B7  After  \u00B7  Until  \u00B7  Unless", options: { fontSize: 10, color: C.CHARCOAL } },
    ], { x: 0.7, y: 4.85, w: 8.6, h: 0.45, fontFace: FONT_B, margin: 0, valign: "middle" });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Independent practice \u2014 working in writing books today, not worksheets
\u2022 Step 1: Open writing book, write heading "Subordinating Conjunctions \u2014 Chapter 11" \u2014 date and heading, underline with ruler
\u2022 Step 2: Write three complex sentences about Chapter 11 \u2014 each must begin with a dependent clause using a DIFFERENT subordinating conjunction
\u2022 If you use "When" for sentence one, pick a different conjunction for sentence two \u2014 see the list on screen
\u2022 Sentences must be about Chapter 11 content: what happened, how characters felt, what changed
\u2022 Step 3: Underline the subordinating conjunction, circle the comma \u2014 this is your self-check
\u2022 Then swap books with a partner and check each other\u2019s work
\u2022 Ask your partner: Does the independent clause make sense on its own? If you cover the dependent clause, is what\u2019s left a complete sentence?
\u2022 10 minutes \u2014 if stuck, look at the I Do model and We Do examples for the same structure with different content

DO:
\u2022 Set a visible timer for 10 minutes
\u2022 Circulate continuously \u2014 prioritise students who struggled during We Do
\u2022 When students swap books, give them a specific checklist: (1) Is the conjunction underlined? (2) Is the comma circled? (3) Does the independent clause work alone?
\u2022 Cold-call 2-3 students to share their best sentence with the class in the last 2 minutes
\u2022 Collect or photograph 3-4 writing books for formative assessment data

TEACHER NOTES:
This is the culmination of the gradual release model: I Do (teacher modelled), We Do (guided practice), You Do (independent). Students are writing in their writing books, not on worksheets, which gives the work permanence and allows you to track progress across lessons. The requirement for three different conjunctions pushes students beyond their comfort zone \u2014 most will gravitate toward 'When' and 'Because,' so the variety requirement forces them to try more complex conjunctions like 'Even though,' 'Although,' or 'Unless.' The peer-checking step builds editing skills that connect directly to the writing they'll do in Lessons 14-15. This is DECIDE's independent practice phase and VTLM 2.0's creating texts strand in action. The subordinating conjunction list on screen provides a scaffold without doing the thinking for students.

WATCH FOR:
\u2022 Students who write simple sentences with 'and' or 'but' instead of subordinating conjunctions \u2014 redirect: "That's a coordinating conjunction. Look at the list on screen \u2014 pick one of those."
\u2022 Students who can't get started \u2014 scaffold: "Pick an event from Chapter 11. Now pick a conjunction from the list. Put them together."
\u2022 Students who write three sentences using the same structure (e.g., all starting with "When") \u2014 even with different conjunctions, encourage structural variety
\u2022 During peer checking: students who mark everything as correct without actually checking \u2014 model what good peer feedback looks like ("Does 'Joey and Topthorn' work as a sentence on its own? No? Then what's missing?")
\u2022 Students who finish early \u2014 challenge: "Can you write a fourth sentence using a conjunction you haven't tried yet? Try 'Unless' or 'Until' \u2014 those are tricky."

[General: You Do | VTLM 2.0: Creating Texts]`);
  }


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 13 — Closing / Reflection
  // ══════════════════════════════════════════════════════════════════════════

  closingSlide(
    pres,
    "Chapter 11 ends with Joey being taken away from Emilie \u2014 yet he says \u2018at least this time I had my Topthorn with me.\u2019 How does Morpurgo use the bond between characters to give us hope even in sad moments? Can you write a complex sentence about this using a subordinating conjunction?",
    [
      "Similes and personification bring War Horse\u2019s world to life",
      "Subordinating conjunctions add complexity and depth to our writing",
      "Authors use shifting events to change mood and create emotional impact",
    ],
    `SAY:
\u2022 Read from slide: the reflection question about Joey\u2019s bond with Topthorn giving hope in loss
\u2022 Chapter 11 ends with Joey taken from Emilie, going back to war \u2014 yet "at least this time I had my Topthorn with me"
\u2022 Despite losing Emilie, despite danger, Joey finds hope in his bond with Topthorn
\u2022 Ask: How does Morpurgo use character bonds to give us hope even in sad moments? [Turn and talk, 1 minute]
\u2022 Challenge: Express your answer as a complex sentence using a subordinating conjunction
\u2022 Ask: Who wants to share? [Take 3\u20134 responses; expected examples: "Although Joey was taken away from Emilie, he found comfort in knowing Topthorn was with him" / "Even though the soldiers forced them to leave, Joey felt hopeful because Topthorn was by his side"]
\u2022 Key point: those sentences combine reading analysis WITH writing skill \u2014 subordinating conjunctions expressing complex ideas about character and theme
\u2022 Takeaway 1: Similes and personification bring War Horse\u2019s world to life \u2014 both on page 93 today
\u2022 Takeaway 2: Subordinating conjunctions add complexity and depth \u2014 practised across two lessons now
\u2022 Takeaway 3: Authors use shifting events to change mood \u2014 Morpurgo gave us hope in Ch 10 and took it away in Ch 11, deliberately
\u2022 Tomorrow: Chapters 12 and 13, building toward your own narrative writing

DO:
\u2022 Give full 60 seconds for turn-and-talk \u2014 don't cut this short
\u2022 Cold-call a mix of confident and developing students to share
\u2022 Celebrate any response that successfully combines reading analysis with a subordinating conjunction structure
\u2022 Read through the three key takeaways, pausing after each
\u2022 Ask: "Which of these three takeaways will you remember most? Why?" [Take 1-2 responses]
\u2022 Ensure writing books are packed away neatly

TEACHER NOTES:
The closing reflection deliberately bridges reading comprehension and writing composition \u2014 students must analyse Morpurgo's use of character bonds (reading) and express that analysis using subordinating conjunctions (writing). This integration is the heart of the DECIDE framework and demonstrates that grammar is a meaning-making tool, not an isolated skill. The three takeaways map to the three success criteria: literary devices (SC implied), subordinating conjunctions (SC3), and shifting events/mood (SC1). Perspective through narration (SC2) was addressed through the pause points. This lesson builds the foundation for Lessons 14-15 where students will write their own narratives using the techniques they've been analysing. VTLM 2.0's creating texts strand requires students to transfer analytical understanding into compositional skill \u2014 this reflection moment tests that transfer.

WATCH FOR:
\u2022 Students who can discuss the theme verbally but can't form it into a complex sentence \u2014 this indicates the writing skill needs more practice, not that they don't understand the content
\u2022 Students who create a strong complex sentence but with weak analytical content \u2014 praise the sentence structure and push the analysis: "Good conjunction use. Now can you make the content more specific?"
\u2022 The energy level at this point \u2014 if students are flagging, keep the closing tight and don't over-explain. The takeaways speak for themselves.

[General: Closing | VTLM 2.0: Responding to Texts / Creating Texts]`
  );


  // ══════════════════════════════════════════════════════════════════════════
  // Save
  // ══════════════════════════════════════════════════════════════════════════

  await pres.writeFile({ fileName: "output/WH_Lesson13.pptx" });
  console.log("Saved: output/WH_Lesson13.pptx");
}

build().catch(err => { console.error(err); process.exit(1); });
