// War Horse — Lesson 14: The Walers & Writing Your Resolution
// Week 3, Lesson 3 of 4 | Year 6 Narrative Writing
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const {
  C, FONT_H, FONT_B, makeShadow, makeCardShadow,
  iconToBase64Png,
  addTopBar, addBadge, addTitle, addCard, addFooter,
  titleSlide, liSlide, pausePointSlide, closingSlide,
} = require("../themes/wh_helpers");
const {
  FaBookOpen, FaPen, FaChalkboardTeacher, FaUsers,
  FaSearch, FaEdit, FaPencilAlt, FaHorse,
  FaCheckCircle, FaLightbulb, FaClipboardList,
  FaStar, FaComments, FaArrowRight,
} = require("react-icons/fa");

if (!fs.existsSync("output")) fs.mkdirSync("output");

const FOOTER = "Week 3  |  War Horse  |  Lesson 14";

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Claude";
  pres.title = "War Horse — Lesson 14: The Walers & Writing Your Resolution";

  // ── Pre-render icons ────────────────────────────────────────────────────
  const icons = {
    bookIvory:    await iconToBase64Png(FaBookOpen, "#" + C.IVORY),
    bookOlive:    await iconToBase64Png(FaBookOpen, "#" + C.OLIVE),
    bookGold:     await iconToBase64Png(FaBookOpen, "#" + C.GOLD),
    penGold:      await iconToBase64Png(FaPen, "#" + C.GOLD),
    penIvory:     await iconToBase64Png(FaPen, "#" + C.IVORY),
    pencilWhite:  await iconToBase64Png(FaPencilAlt, "#" + C.WHITE),
    pencilOlive:  await iconToBase64Png(FaPencilAlt, "#" + C.OLIVE),
    teacherWhite: await iconToBase64Png(FaChalkboardTeacher, "#" + C.WHITE),
    teacherGold:  await iconToBase64Png(FaChalkboardTeacher, "#" + C.GOLD),
    usersWhite:   await iconToBase64Png(FaUsers, "#" + C.WHITE),
    searchWhite:  await iconToBase64Png(FaSearch, "#" + C.WHITE),
    searchOlive:  await iconToBase64Png(FaSearch, "#" + C.OLIVE),
    editWhite:    await iconToBase64Png(FaEdit, "#" + C.WHITE),
    editBurg:     await iconToBase64Png(FaEdit, "#" + C.BURGUNDY),
    horseGold:    await iconToBase64Png(FaHorse, "#" + C.GOLD),
    horseWhite:   await iconToBase64Png(FaHorse, "#" + C.WHITE),
    checkOlive:   await iconToBase64Png(FaCheckCircle, "#" + C.OLIVE),
    checkGold:    await iconToBase64Png(FaCheckCircle, "#" + C.GOLD),
    checkWhite:   await iconToBase64Png(FaCheckCircle, "#" + C.WHITE),
    bulbGold:     await iconToBase64Png(FaLightbulb, "#" + C.GOLD),
    bulbOlive:    await iconToBase64Png(FaLightbulb, "#" + C.OLIVE),
    clipOlive:    await iconToBase64Png(FaClipboardList, "#" + C.OLIVE),
    clipWhite:    await iconToBase64Png(FaClipboardList, "#" + C.WHITE),
    starGold:     await iconToBase64Png(FaStar, "#" + C.GOLD),
    commentsWhite:await iconToBase64Png(FaComments, "#" + C.WHITE),
    arrowGold:    await iconToBase64Png(FaArrowRight, "#" + C.GOLD),
    arrowWhite:   await iconToBase64Png(FaArrowRight, "#" + C.WHITE),
  };

  // =====================================================================
  // SLIDE 1 — Title
  // =====================================================================
  titleSlide(
    pres,
    "War Horse",
    "The Walers & Writing Your Resolution",
    "Lesson 14  |  Week 3  |  Year 6 Narrative Writing",
    `SAY:
\u2022 Two parts today: reading about real war horses (Walers), then writing the resolution paragraph
\u2022 The Walers article connects to Australian history \u2014 real horses in WWI
\u2022 By end of today, your story will almost be finished

DO:
\u2022 Display title slide as students settle
\u2022 Build anticipation for the dual focus of the lesson

TEACHER NOTES:
This lesson has two distinct halves: supplementary text reading (Slides 3-5) and writing instruction (Slides 6-13). Manage time carefully \u2014 the reading section should take roughly 15-20 minutes, leaving 30-35 minutes for the writing block. The supplementary text connects to the cross-curriculum History priority (VC2HH6K10) and also builds content knowledge students will draw on for persuasive writing later in the unit.

WATCH FOR:
\u2022 Students who seem disconnected from the topic \u2014 use the Australian connection to draw them in
\u2022 Energy levels \u2014 this is a content-heavy lesson, so keep transitions crisp

[General: Launch | VTLM 2.0: Engage]`
  );

  // =====================================================================
  // SLIDE 2 — Learning Intentions & Success Criteria
  // =====================================================================
  liSlide(
    pres,
    [
      "Select texts from print or digital sources to gather and organise research on a topic",
      "Use knowledge of text structure to navigate the text to locate specific information",
      "Choose literary forms with appropriate text structures, features and language to engage target audiences",
      "Make creative choices about temporal and spatial settings, character profiles and motives to enhance reader engagement",
      "Experiment with characterisation",
      "Choose and control narrative voice across a text",
      "Experiment with the development of thematic elements",
      "Re-read, proofread and edit own and other\u2019s writing, and use criteria and goals in response to feedback",
    ],
    [
      "I can take notes from a supplementary text about Walers in WWI",
      "I can explain the purpose and features of a resolution paragraph",
      "I can plan and write a resolution paragraph for my narrative using mental verbs and adjectives",
    ],
    `SAY:
\u2022 Eight learning intentions today \u2014 covers both reading and writing strands
\u2022 First intention: selecting texts to gather research (the Walers article)
\u2022 Writing intentions: text structures, creative choices, characterisation, voice, themes
\u2022 Read from slide: three success criteria \u2014 emphasise the third one (plan and write resolution paragraph)
\u2022 Ask: Can someone read success criterion three aloud for us? [Student reads]

DO:
\u2022 Read each learning intention aloud, pausing briefly
\u2022 Point to success criteria and have students read the third one chorally
\u2022 Emphasise the dual focus: reading AND writing today

TEACHER NOTES:
There are eight learning intentions because this lesson spans both the reading and writing strands of the Victorian Curriculum. Don't labour over reading every single one \u2014 the key ones to emphasise are the supplementary text selection (first), creative choices for narrative (fourth), and the editing intention (last). The success criteria are what students will actually be assessed against, so ensure these are clear. Consider having students copy the success criteria into their writing books.

WATCH FOR:
\u2022 Students who look overwhelmed by the number of intentions \u2014 reassure them that the lesson has clear steps
\u2022 Students who don't track or engage \u2014 cold call to check understanding of the third success criterion

[General: Learning Intentions | VTLM 2.0: Clarify]`,
    FOOTER
  );

  // =====================================================================
  // SLIDE 3 — Vocabulary Review (Daily Review)
  // =====================================================================
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Daily Review", { w: 1.6, color: C.OLIVE });
    addTitle(s, "Vocabulary Review", { y: 0.65 });

    // Review words card — left side
    addCard(s, 0.5, 1.35, 5.3, 2.3, { strip: C.GOLD });
    s.addText("Words from Lessons 12\u201313", {
      x: 0.8, y: 1.45, w: 4.5, h: 0.32,
      fontSize: 14, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
    });
    const reviewWords = [
      { word: "Hazardous", def: "dangerous, risky" },
      { word: "Lavish", def: "luxurious, generous in quantity" },
      { word: "Content (adj.)", def: "satisfied, at peace" },
      { word: "Adapt", def: "to adjust to new conditions" },
    ];
    reviewWords.forEach((w, i) => {
      s.addText([
        { text: w.word, options: { bold: true, fontSize: 13, color: C.CHARCOAL } },
        { text: "  \u2014  " + w.def, options: { fontSize: 13, color: C.MUTED } },
      ], { x: 0.8, y: 1.88 + i * 0.38, w: 4.8, h: 0.32, fontFace: FONT_B, margin: 0 });
    });

    // Activity badge
    s.addShape("roundRect", {
      x: 6.2, y: 1.35, w: 3.3, h: 0.45, rectRadius: 0.08,
      fill: { color: C.OLIVE },
    });
    s.addText("Cold Call Activity", {
      x: 6.2, y: 1.35, w: 3.3, h: 0.45,
      fontSize: 13, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText("Quick-fire recall.\nTeacher says a definition,\nstudents identify the word.", {
      x: 6.2, y: 1.95, w: 3.3, h: 0.9,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, align: "center", margin: 0,
    });

    // Incidental vocab card — bottom (repositioned: y=3.75, h=1.25, bottom=5.0)
    addCard(s, 0.5, 3.75, 9, 1.25, { strip: C.SAGE });
    s.addText("Today\u2019s Incidental Vocabulary", {
      x: 0.8, y: 3.83, w: 5, h: 0.28,
      fontSize: 13, fontFace: FONT_B, color: C.SAGE, bold: true, margin: 0,
    });
    s.addText("These words appear in today\u2019s supplementary text about Walers. Listen for them as we read.", {
      x: 0.8, y: 4.12, w: 8, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    const incidentalWords = [
      { word: "Mobility", def: "ability to move freely" },
      { word: "Infantry", def: "soldiers who fight on foot" },
      { word: "Bayonets", def: "blades attached to rifles" },
      { word: "Quarantine", def: "isolation to prevent disease" },
      { word: "Infirmity", def: "weakness or illness" },
    ];
    incidentalWords.forEach((w, i) => {
      const col = i < 3 ? 0 : 1;
      const row = i < 3 ? i : i - 3;
      const bx = 0.8 + col * 4.5;
      const by = 4.38 + row * 0.2;
      s.addText([
        { text: w.word, options: { bold: true, fontSize: 11, color: C.CHARCOAL } },
        { text: "  \u2014  " + w.def, options: { fontSize: 11, color: C.MUTED } },
      ], { x: bx, y: by, w: 4.2, h: 0.2, fontFace: FONT_B, margin: 0 });
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 Quick vocabulary review before new reading \u2014 cold call, no hands up
\u2022 Read from slide: definitions one at a time, students identify the word
\u2022 Ask: "This word means dangerous or risky." [Hazardous]
\u2022 Ask: "Luxurious or generous in quantity." [Lavish]
\u2022 Ask: "Satisfied, at peace \u2014 careful, it can also be a noun." [Content]
\u2022 Ask: "To adjust to new conditions." [Adapt]
\u2022 Point to incidental vocab: mobility, infantry, bayonets, quarantine, infirmity
\u2022 Don\u2019t pre-teach these \u2014 students will encounter them in context during reading

DO:
\u2022 Use cold call (no hands up) \u2014 select non-volunteers
\u2022 Allow 3-4 seconds think time before calling on a student
\u2022 If a student struggles, provide the first sound as a prompt
\u2022 Point to incidental vocab briefly \u2014 don't teach these explicitly yet

TEACHER NOTES:
This daily review is formative \u2014 it tells you which words from Lessons 12-13 have stuck. If most students struggle with a word, plan to revisit it. The incidental vocabulary is flagged so students can be alert readers. These words will make more sense in context. Don't pre-teach definitions beyond what's on the slide \u2014 let students encounter them during reading and use context clues. This builds the reading comprehension skill of inferring word meaning.

WATCH FOR:
\u2022 Students who consistently can't recall \u2014 they may need a vocabulary journal or word wall reference
\u2022 Students who define "content" as a noun (things inside something) rather than the adjective \u2014 redirect to the lesson context
\u2022 Overconfidence with "adapt" \u2014 check they understand the nuance (not just "change" but adjusting to new conditions)

[General: Daily Review | VTLM 2.0: Recall]`);
  }

  // =====================================================================
  // SLIDE 4 — Supplementary Text Introduction
  // =====================================================================
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Supplementary Text", { w: 2.2, color: C.SAGE });
    addTitle(s, "Did Australia use horses in the war too?", { y: 0.65, fontSize: 24 });

    // Main article info card
    addCard(s, 0.5, 1.35, 5.5, 2.7, { strip: C.SAGE });
    s.addShape("oval", { x: 0.85, y: 1.55, w: 0.55, h: 0.55, fill: { color: C.SAGE } });
    s.addImage({ data: icons.bookIvory, x: 0.95, y: 1.65, w: 0.35, h: 0.35 });
    s.addText("Article Details", {
      x: 1.6, y: 1.6, w: 4, h: 0.35,
      fontSize: 16, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addText([
      { text: "Title: ", options: { bold: true, fontSize: 13, color: C.CHARCOAL, breakLine: false } },
      { text: "Horses used in the First World War (Walers)", options: { fontSize: 13, color: C.CHARCOAL, italic: true, breakLine: true } },
      { text: "Source: ", options: { bold: true, fontSize: 13, color: C.CHARCOAL, breakLine: false } },
      { text: "Australian War Memorial (awm.gov.au)", options: { fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "A brief article about the Australian horses used during World War 1, known as Walers. This is a factual supplementary text that connects our novel study to real history.", options: { fontSize: 12, color: C.MUTED } },
    ], { x: 1.6, y: 2.0, w: 4.2, h: 1.8, fontFace: FONT_B, margin: 0 });

    // Right side — badges and connection
    // History badge
    addBadge(s, "History \u2014 VC2HH6K10", { x: 6.4, y: 1.35, w: 3.0, color: C.BURGUNDY });

    // Reading mode badge
    addBadge(s, "Student Read Aloud", { x: 6.4, y: 1.85, w: 2.4, color: C.GOLD });

    // Connection card
    addCard(s, 6.4, 2.5, 3.1, 1.55);
    s.addShape("oval", { x: 6.65, y: 2.65, w: 0.45, h: 0.45, fill: { color: C.GOLD } });
    s.addImage({ data: icons.horseWhite, x: 6.73, y: 2.73, w: 0.3, h: 0.3 });
    s.addText("War Horse Connection", {
      x: 7.2, y: 2.68, w: 2.1, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
    });
    s.addText("How does knowing about real war horses deepen our understanding of Joey\u2019s story?", {
      x: 6.65, y: 3.15, w: 2.7, h: 0.8,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Bottom tip
    addCard(s, 0.5, 4.3, 9, 0.7, { strip: C.OLIVE });
    s.addImage({ data: icons.bulbOlive, x: 0.85, y: 4.42, w: 0.35, h: 0.35 });
    s.addText("This is a supplementary text \u2014 it adds real-world context to our novel study. The notes you take today will be useful later in the unit for persuasive writing.", {
      x: 1.35, y: 4.38, w: 7.8, h: 0.55,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 War Horse is fiction, but based on real events \u2014 today we read about REAL horses that went to war
\u2022 These Australian horses were called Walers
\u2022 Ask: Has anyone heard of Walers before? [Various responses]
\u2022 Source: Australian War Memorial website \u2014 highly reliable for military history
\u2022 This is a supplementary text: supports and adds to our main text
\u2022 Key question to hold in mind: How does knowing about REAL war horses deepen our understanding of Joey\u2019s story?
\u2022 Student read aloud \u2014 different students will read sections
\u2022 Cross-curriculum: connects to History (VC2HH6K10)

DO:
\u2022 Hold up or display a copy of the article
\u2022 Point to the AWM source \u2014 discuss reliability briefly
\u2022 Assign reading sections to students before beginning
\u2022 Draw attention to the History cross-curriculum badge

TEACHER NOTES:
This supplementary text serves multiple purposes: it builds content knowledge about real war horses (VC2HH6K10), it gives students practice reading informational text alongside narrative, and it plants seeds for persuasive writing later in the unit. The Australian connection is powerful \u2014 these were OUR horses. Use this to build emotional engagement. The "Student Read Aloud" mode builds fluency and keeps all students accountable. Pre-assign readers so transitions are smooth. The connection question ("How does knowing about real war horses...") is designed to be returned to after reading.

WATCH FOR:
\u2022 Students who conflate fiction and non-fiction \u2014 clarify that War Horse is inspired by, not a record of, real events
\u2022 Students unfamiliar with the AWM \u2014 briefly explain its significance as Australia's national memorial and museum
\u2022 Low engagement \u2014 the Australian angle should hook most students; use proximity for those who drift

[General: Supplementary Text Introduction | VTLM 2.0: Engage]`);
  }

  // =====================================================================
  // SLIDE 5 — Note-Taking from Text
  // =====================================================================
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Active Reading", { w: 1.8, color: C.SAGE });
    addTitle(s, "Note-Taking \u2014 Walers in WWI", { y: 0.65 });

    // Left card — What to Look For
    addCard(s, 0.5, 1.35, 4.3, 2.8, { strip: C.OLIVE });
    s.addShape("oval", { x: 0.85, y: 1.5, w: 0.5, h: 0.5, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.searchWhite, x: 0.93, y: 1.58, w: 0.34, h: 0.34 });
    s.addText("What to Look For", {
      x: 1.5, y: 1.52, w: 3, h: 0.35,
      fontSize: 15, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });
    const prompts = [
      "What were Walers?",
      "Why were they important in the war?",
      "What happened to them?",
      "How does this connect to War Horse?",
    ];
    prompts.forEach((p, i) => {
      s.addText(p, {
        x: 0.85, y: 2.15 + i * 0.45, w: 3.7, h: 0.38,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, bullet: true, margin: 0,
      });
    });

    // Right card — Your Notes
    addCard(s, 5.2, 1.35, 4.3, 2.8, { strip: C.GOLD });
    s.addShape("oval", { x: 5.55, y: 1.5, w: 0.5, h: 0.5, fill: { color: C.GOLD } });
    s.addImage({ data: icons.pencilWhite, x: 5.63, y: 1.58, w: 0.34, h: 0.34 });
    s.addText("Your Notes", {
      x: 6.2, y: 1.52, w: 3, h: 0.35,
      fontSize: 15, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });
    s.addText([
      { text: "In your writing book:", options: { bold: true, fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "Write today\u2019s date and the heading \u201CWalers \u2014 Notes\u201D", options: { bullet: true, fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "As we read, jot dot-point notes for each question on the left", options: { bullet: true, fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "You don\u2019t need full sentences \u2014 key facts only", options: { bullet: true, fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "We\u2019ll pause after each section so you can write", options: { bullet: true, fontSize: 12, color: C.CHARCOAL } },
    ], { x: 5.55, y: 2.05, w: 3.7, h: 2.0, fontFace: FONT_B, margin: 0 });

    // Bottom tip card
    addCard(s, 0.5, 4.35, 9, 0.65, { fill: C.WARM });
    s.addImage({ data: icons.bulbGold, x: 0.75, y: 4.48, w: 0.3, h: 0.3 });
    s.addText([
      { text: "Tip: ", options: { bold: true, fontSize: 12, color: C.GOLD } },
      { text: "Use dot points. Focus on key facts. You can use these notes in your persuasive writing later in the unit.", options: { fontSize: 12, color: C.CHARCOAL } },
    ], { x: 1.2, y: 4.44, w: 7.9, h: 0.5, fontFace: FONT_B, margin: 0 });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 Set up: open writing books, write date and heading "Walers \u2014 Notes"
\u2022 Four questions on the left to guide listening
\u2022 Read from slide: What were Walers? Why important? What happened to them? Connection to War Horse?
\u2022 Model first note: read first paragraph aloud, then write example \u2014 "Walers = Australian horses, named after NSW, used by Light Horse brigades"
\u2022 Key instruction: dot points and key facts only, NOT full sentences
\u2022 Pause after each section (every 1\u20132 paragraphs) for note-taking time
\u2022 Assign first reader, then hand off to student readers for subsequent sections
\u2022 After reading, briefly discuss: How does this connect to War Horse?

DO:
\u2022 Model the first note on the board or under a document camera
\u2022 Read the first paragraph yourself, then assign student readers for subsequent sections
\u2022 Pause after each section (every 1-2 paragraphs) for note-taking time
\u2022 Circulate during pauses to check students are writing notes, not full sentences
\u2022 After reading, briefly discuss the connection question: How does this connect to War Horse?

TEACHER NOTES:
Explicit modelling of the first note is crucial \u2014 many Year 6 students will default to copying whole sentences or writing nothing at all. The four guiding questions scaffold the note-taking without making it a worksheet activity. The instruction to use dot points is deliberate: it forces students to process and compress information rather than transcribe. Pausing after each section is essential \u2014 don't let the reading run continuously or students won't keep up. The notes students take here will be referenced in a later lesson when they write a persuasive text, so quality matters. This is DECIDE's "D" \u2014 Decide on the skill (note-taking from informational text).

WATCH FOR:
\u2022 Students copying full sentences \u2014 redirect to dot points and key words only
\u2022 Students writing nothing \u2014 provide a sentence starter ("Walers were...")
\u2022 Students who can't connect to the four questions \u2014 point them to the specific question that matches what was just read
\u2022 Readers who struggle with vocabulary (bayonets, quarantine) \u2014 briefly gloss the word and move on

[General: Active Reading | VTLM 2.0: Model & Guide]`);
  }

  // =====================================================================
  // SLIDE 6 — Narrative Structure Review
  // =====================================================================
  {
    const s = pres.addSlide();
    addTopBar(s);
    addTitle(s, "Narrative Text Structure \u2014 Where Are We?", { y: 0.2, fontSize: 24 });

    // Narrative structure blocks — horizontal flow
    const stages = [
      { label: "Orientation /\nIntroduction", status: "completed", week: "Week 1", color: C.SAGE, textColor: C.WHITE },
      { label: "Action /\nRising Action", status: "completed", week: "Week 2", color: C.SAGE, textColor: C.WHITE },
      { label: "Problem /\nComplication", status: "completed", week: "Week 2", color: C.SAGE, textColor: C.WHITE },
      { label: "Resolution", status: "current", week: "Today!", color: C.GOLD, textColor: C.WHITE },
      { label: "Conclusion", status: "upcoming", week: "Lesson 15", color: C.CREAM_DARK, textColor: C.CHARCOAL },
    ];

    const blockW = 1.55;
    const blockH = 1.4;
    const gap = 0.22;
    const startX = 0.5;
    const blockY = 1.1;

    stages.forEach((st, i) => {
      const bx = startX + i * (blockW + gap);
      // Block
      s.addShape("roundRect", {
        x: bx, y: blockY, w: blockW, h: blockH, rectRadius: 0.08,
        fill: { color: st.color }, shadow: makeCardShadow(),
      });
      // Label
      s.addText(st.label, {
        x: bx, y: blockY + 0.15, w: blockW, h: 0.7,
        fontSize: 12, fontFace: FONT_H, color: st.textColor,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
      // Status line
      if (st.status === "completed") {
        s.addImage({ data: icons.checkWhite, x: bx + (blockW - 0.25) / 2, y: blockY + 0.9, w: 0.25, h: 0.25 });
      }
      // Week label below block
      s.addText(st.week, {
        x: bx, y: blockY + blockH + 0.08, w: blockW, h: 0.28,
        fontSize: 10, fontFace: FONT_B, color: st.status === "current" ? C.GOLD : C.MUTED,
        align: "center", bold: st.status === "current", margin: 0,
      });
      // Arrow between blocks (not after last)
      if (i < stages.length - 1) {
        s.addImage({
          data: i === 2 ? icons.arrowGold : icons.arrowWhite,
          x: bx + blockW + 0.02, y: blockY + (blockH - 0.22) / 2, w: 0.18, h: 0.22,
        });
      }
    });

    // "YOU ARE HERE" callout for Resolution
    const resX = startX + 3 * (blockW + gap);
    s.addShape("roundRect", {
      x: resX - 0.15, y: blockY - 0.4, w: blockW + 0.3, h: 0.35, rectRadius: 0.06,
      fill: { color: C.BURGUNDY },
    });
    s.addText("YOU ARE HERE", {
      x: resX - 0.15, y: blockY - 0.4, w: blockW + 0.3, h: 0.35,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Summary card below the flow
    addCard(s, 0.5, 3.1, 9, 1.9, { strip: C.OLIVE });
    s.addText("Your Narrative So Far", {
      x: 0.85, y: 3.2, w: 5, h: 0.35,
      fontSize: 16, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });

    const summaryItems = [
      { label: "Orientation:", desc: "You introduced your character, their world, and the setting." },
      { label: "Action:", desc: "Something happened to move the story forward \u2014 events escalated." },
      { label: "Problem:", desc: "Your character faced a complication \u2014 a conflict or challenge." },
      { label: "Resolution:", desc: "TODAY \u2014 Your character takes action to address the problem. The tension eases." },
      { label: "Conclusion:", desc: "TOMORROW \u2014 The story wraps up. What has your character learned?" },
    ];
    summaryItems.forEach((item, i) => {
      s.addText([
        { text: item.label + " ", options: { bold: true, fontSize: 12, color: i === 3 ? C.GOLD : (i === 4 ? C.MUTED : C.OLIVE) } },
        { text: item.desc, options: { fontSize: 12, color: i === 4 ? C.MUTED : C.CHARCOAL } },
      ], { x: 0.85, y: 3.62 + i * 0.27, w: 8.3, h: 0.27, fontFace: FONT_B, margin: 0 });
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 Shift gears from reading to writing now
\u2022 Five stages in a narrative \u2014 walk through the diagram
\u2022 Green blocks (orientation, action, problem): already written in Weeks 1\u20132 \u2014 done
\u2022 Gold block = Resolution = TODAY \u2014 "You Are Here"
\u2022 Grey block = Conclusion = tomorrow (Lesson 15)
\u2022 Resolution is NOT the ending \u2014 character takes action to address the problem, tension starts to ease
\u2022 Conclusion wraps everything up \u2014 that\u2019s tomorrow
\u2022 Ask: Put your hand up when I reach the stage you last wrote [Should be Problem]
\u2022 Build excitement: "You\u2019re nearly there! Your narrative is almost complete."

DO:
\u2022 Walk through each block on the diagram, pointing to each stage
\u2022 Ask students to put their hand up when you reach the stage they last wrote (should be Problem)
\u2022 Emphasise that Resolution is NOT the ending \u2014 that comes tomorrow
\u2022 Build excitement: "You're nearly there!"

TEACHER NOTES:
This visual overview is essential for students to understand where the resolution fits in the narrative arc. Many students confuse resolution with conclusion. Be explicit: the resolution is where the character TAKES ACTION to deal with the problem. The conclusion is where the story WRAPS UP and reflects. This diagram should stay visible (or be referenced) throughout the writing block. The colour coding reinforces the progression \u2014 green for done, gold for today, grey for tomorrow. This is a metacognitive scaffold that helps students see their writing as a structured whole rather than isolated paragraphs.

WATCH FOR:
\u2022 Students who don't remember writing a complication \u2014 they may need to re-read their work before planning the resolution
\u2022 Confusion between resolution and conclusion \u2014 address this directly: "Resolution = character acts. Conclusion = story wraps up."
\u2022 Students who feel their earlier paragraphs are "bad" \u2014 reassure them that we'll edit at the end of the unit

[General: Structure Review | VTLM 2.0: Clarify]`);
  }

  // =====================================================================
  // SLIDE 7 — Resolution Paragraph — Purpose & Features (I Do)
  // =====================================================================
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "I Do", { w: 1.2, color: C.GOLD });
    addTitle(s, "The Resolution Paragraph", { y: 0.65 });

    // Purpose card — left
    addCard(s, 0.5, 1.35, 4.3, 3.65, { strip: C.GOLD });
    s.addShape("oval", { x: 0.85, y: 1.5, w: 0.5, h: 0.5, fill: { color: C.GOLD } });
    s.addImage({ data: icons.bulbGold, x: 0.93, y: 1.58, w: 0.34, h: 0.34 });
    s.addText("Purpose", {
      x: 1.5, y: 1.52, w: 3, h: 0.4,
      fontSize: 17, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });
    s.addText("What does the resolution do?", {
      x: 1.5, y: 1.9, w: 3, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    const purposeItems = [
      "The character takes action to solve the problem",
      "The tension from the complication begins to ease",
      "Shows how the character has changed or grown",
      "Starts to bring the story towards its ending",
    ];
    purposeItems.forEach((p, i) => {
      s.addText(p, {
        x: 0.85, y: 2.35 + i * 0.5, w: 3.7, h: 0.42,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, bullet: true, margin: 0,
      });
    });

    // Features card — right
    addCard(s, 5.2, 1.35, 4.3, 3.65, { strip: C.OLIVE });
    s.addShape("oval", { x: 5.55, y: 1.5, w: 0.5, h: 0.5, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.clipWhite, x: 5.63, y: 1.58, w: 0.34, h: 0.34 });
    s.addText("Features", {
      x: 6.2, y: 1.52, w: 3, h: 0.4,
      fontSize: 17, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addText("What does it look like?", {
      x: 6.2, y: 1.9, w: 3, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    const featureItems = [
      "Action verbs showing what the character DOES",
      "Mental verbs showing what the character THINKS and FEELS",
      "Adjectives describing emotions and changes",
      "Connects back to the problem \u2014 shows it being resolved",
      "May not be a \u201Chappy\u201D resolution \u2014 it just moves the story forward",
    ];
    featureItems.forEach((f, i) => {
      s.addText(f, {
        x: 5.55, y: 2.35 + i * 0.5, w: 3.7, h: 0.42,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, bullet: true, margin: 0,
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 Resolution = character takes action to solve or address the problem (not necessarily "fix")
\u2022 Tension from the complication starts to ease
\u2022 Shows character change/growth, starts moving toward the ending
\u2022 Resolution is NOT the ending itself \u2014 that\u2019s the conclusion (tomorrow)
\u2022 Read from slide: Features card \u2014 action verbs, mental verbs, adjectives, connects to problem
\u2022 Key point: doesn\u2019t have to be a happy resolution
\u2022 War Horse example: Chapter 10, Emilie recovering \u2014 problem easing but not everything perfect (war still on, Joey still far from Albert)
\u2022 Ask: What\u2019s an example from War Horse where a problem starts to be resolved but it\u2019s not completely happy? [Various responses]

DO:
\u2022 Read through both cards, pausing for emphasis on key points
\u2022 Use War Horse Chapter 10 as a concrete example
\u2022 Ask students to identify the difference between resolution and conclusion
\u2022 Cold call: "What does a resolution do that a conclusion doesn't?"

TEACHER NOTES:
This is the "D" in DECIDE \u2014 Decide on the Thing. You're explicitly defining what a resolution paragraph is and isn't. The distinction between resolution and conclusion is the most common confusion, so hammer it home: resolution = character acts to address the problem; conclusion = story wraps up and reflects. The War Horse connection to Chapter 10 (Emilie's recovery) is deliberate \u2014 it's a resolution moment they've already encountered in the text. The point about unhappy resolutions is important for higher-ability writers who may want to write bittersweet or complex endings. Don't let students think resolution = happily ever after.

WATCH FOR:
\u2022 Students who think resolution means "the problem is completely solved" \u2014 clarify that it means the character TAKES ACTION, not that everything is fixed
\u2022 Students who conflate resolution with conclusion \u2014 keep redirecting to the diagram from Slide 6
\u2022 Students who can't identify a resolution moment in War Horse \u2014 guide them to Chapter 10

[General: I Do \u2014 Explicit Instruction | VTLM 2.0: Model]`);
  }

  // =====================================================================
  // SLIDE 8 — Mental Verbs & Adjectives (I Do)
  // =====================================================================
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "I Do", { w: 1.2, color: C.GOLD });
    addTitle(s, "Mental Verbs & Adjectives in Resolution", { y: 0.65, fontSize: 23 });

    // Three-column layout
    const colW = 2.7;
    const colGap = 0.3;
    const colY = 1.35;
    const colH = 2.6;

    // Column 1 — Mental Verbs
    addCard(s, 0.5, colY, colW, colH, { strip: C.GOLD });
    s.addText("Mental Verbs", {
      x: 0.75, y: colY + 0.1, w: colW - 0.4, h: 0.32,
      fontSize: 14, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });
    s.addText("(thinking & feeling)", {
      x: 0.75, y: colY + 0.4, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    const mentalVerbs = ["realised", "understood", "decided", "believed", "hoped", "feared", "wondered", "remembered", "recognised", "accepted"];
    mentalVerbs.forEach((v, i) => {
      s.addText(v, {
        x: 0.75, y: colY + 0.7 + i * 0.18, w: colW - 0.4, h: 0.18,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, bullet: true, margin: 0,
      });
    });

    // Column 2 — Adjectives
    const col2X = 0.5 + colW + colGap;
    addCard(s, col2X, colY, colW, colH, { strip: C.SAGE });
    s.addText("Adjectives", {
      x: col2X + 0.25, y: colY + 0.1, w: colW - 0.4, h: 0.32,
      fontSize: 14, fontFace: FONT_H, color: C.SAGE, bold: true, margin: 0,
    });
    s.addText("(describing feelings)", {
      x: col2X + 0.25, y: colY + 0.4, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    const adjectives = ["determined", "relieved", "anxious", "courageous", "conflicted", "hopeful", "desperate", "resolved", "shaken", "uncertain"];
    adjectives.forEach((a, i) => {
      s.addText(a, {
        x: col2X + 0.25, y: colY + 0.7 + i * 0.18, w: colW - 0.4, h: 0.18,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, bullet: true, margin: 0,
      });
    });

    // Column 3 — In Action
    const col3X = col2X + colW + colGap;
    addCard(s, col3X, colY, colW, colH, { strip: C.BURGUNDY });
    s.addText("In Action", {
      x: col3X + 0.25, y: colY + 0.1, w: colW - 0.4, h: 0.32,
      fontSize: 14, fontFace: FONT_H, color: C.BURGUNDY, bold: true, margin: 0,
    });
    s.addText("(example sentences)", {
      x: col3X + 0.25, y: colY + 0.4, w: colW - 0.4, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    const examples = [
      { text: "She realised that running would not solve anything.", hl: "realised" },
      { text: "Feeling determined, he stepped forward to face the challenge.", hl: "determined" },
      { text: "A desperate hope flickered inside her.", hl: "desperate" },
    ];
    examples.forEach((ex, i) => {
      s.addText(ex.text, {
        x: col3X + 0.25, y: colY + 0.72 + i * 0.62, w: colW - 0.4, h: 0.55,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
      });
    });

    // Bottom tip
    addCard(s, 0.5, 4.15, 9, 0.85, { fill: C.WARM });
    s.addImage({ data: icons.bulbGold, x: 0.75, y: 4.3, w: 0.35, h: 0.35 });
    s.addText([
      { text: "Key insight: ", options: { bold: true, fontSize: 12, color: C.GOLD } },
      { text: "Mental verbs show the reader what\u2019s happening INSIDE the character\u2019s mind. Action verbs show what they DO. A strong resolution uses both.", options: { fontSize: 12, color: C.CHARCOAL } },
    ], { x: 1.25, y: 4.25, w: 7.9, h: 0.65, fontFace: FONT_B, margin: 0 });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 Mental verbs = what\u2019s happening inside someone\u2019s head: realised, understood, decided, believed, hoped, feared, wondered, remembered, recognised, accepted
\u2022 Choral read the mental verb list together
\u2022 These let the reader see inside the character\u2019s mind \u2014 "she realised" = something clicked
\u2022 Adjectives describing feelings: determined, relieved, anxious, courageous, conflicted, hopeful, desperate, resolved, shaken, uncertain
\u2022 Choral read the adjective list together
\u2022 Example sentences \u2014 identify the key word in each:
  \u2013 "She realised that running would not solve anything." Ask: Mental verb? [realised]
  \u2013 "Feeling determined, he stepped forward." Ask: Adjective? [determined]
  \u2013 "A desperate hope flickered inside her." Ask: Adjective? [desperate]
\u2022 Pick 2\u20133 words from each column that fit YOUR character and story

DO:
\u2022 Choral read both word lists to build familiarity
\u2022 Cold call students to identify the mental verb or adjective in each example sentence
\u2022 Ask: "Which of these words might fit YOUR character's resolution?" (think-pair-share)
\u2022 Briefly connect to War Horse: "What mental verb would you use for Joey? For Albert?"

TEACHER NOTES:
This is the "E" in DECIDE \u2014 Execute through Modelling. You're explicitly teaching the language tools before asking students to use them. Mental verbs are a specific grammatical category in the Victorian Curriculum \u2014 verbs of thinking, feeling, perceiving. They are distinct from action verbs (which show external behaviour) and saying verbs (which show speech). Adjectives here are specifically emotional/psychological adjectives, not physical ones. The three example sentences model how these word types work together in resolution-style writing. Have students mark two or three words from each column that they plan to use \u2014 this gives them a concrete toolkit before they start writing.

WATCH FOR:
\u2022 Students who confuse mental verbs with action verbs \u2014 "decided" is mental (a thinking process), "ran" is action
\u2022 Students who pick words they can't spell \u2014 direct them to the slide and encourage them to copy the words into their books
\u2022 Students who pick the same word for everything \u2014 encourage variety ("Can you find a different word for the second sentence?")

[General: I Do \u2014 Language Focus | VTLM 2.0: Model]`);
  }

  // =====================================================================
  // SLIDE 9 — Model Planning a Resolution (I Do)
  // =====================================================================
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "I Do", { w: 1.2, color: C.GOLD });
    addTitle(s, "Planning a Resolution \u2014 Teacher Model", { y: 0.65, fontSize: 23 });

    // Planning template — left side (blank)
    addCard(s, 0.5, 1.35, 4.3, 3.6, { strip: C.OLIVE });
    s.addText("Planning Template", {
      x: 0.85, y: 1.45, w: 3.5, h: 0.32,
      fontSize: 14, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });

    const templateFields = [
      "My problem was:",
      "What does my character do to solve it?",
      "How does my character feel?",
      "What changes?",
    ];
    templateFields.forEach((field, i) => {
      const fy = 1.9 + i * 0.75;
      s.addText(field, {
        x: 0.85, y: fy, w: 3.7, h: 0.28,
        fontSize: 12, fontFace: FONT_B, color: C.OLIVE, bold: true, margin: 0,
      });
      s.addShape("rect", {
        x: 0.85, y: fy + 0.32, w: 3.6, h: 0.01,
        fill: { color: C.SAND },
      });
    });

    // Filled-in model — right side
    addCard(s, 5.2, 1.35, 4.3, 3.6, { strip: C.GOLD });
    s.addShape("oval", { x: 5.55, y: 1.5, w: 0.5, h: 0.5, fill: { color: C.GOLD } });
    s.addImage({ data: icons.pencilWhite, x: 5.63, y: 1.58, w: 0.34, h: 0.34 });
    s.addText("Teacher\u2019s Model Plan", {
      x: 6.2, y: 1.52, w: 3, h: 0.35,
      fontSize: 14, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });

    const modelPlan = [
      { q: "My problem was:", a: "Zara got separated from her group during the night hike at school camp and was lost in the bush." },
      { q: "What does my character do?", a: "She stops panicking, remembers what her dad taught her about staying calm, and follows the creek downhill towards the campsite." },
      { q: "How does my character feel?", a: "Frightened at first, then determined. She realised she had to rely on herself. Hopeful when she heard voices." },
      { q: "What changes?", a: "She finds the group. She feels relieved but also proud \u2014 she solved it herself." },
    ];
    modelPlan.forEach((item, i) => {
      const my = 2.05 + i * 0.73;
      s.addText(item.q, {
        x: 5.55, y: my, w: 3.7, h: 0.22,
        fontSize: 10, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
      });
      s.addText(item.a, {
        x: 5.55, y: my + 0.22, w: 3.7, h: 0.48,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 Before writing, we plan \u2014 always
\u2022 Read from slide: four planning questions (left card)
\u2022 Teacher model character: Zara, school camp, separated from group during night hike, lost in bush
\u2022 What she does: stops panicking, remembers dad\u2019s advice ("find water, follow it downhill"), follows the creek \u2014 she TAKES ACTION, not just sitting and crying
\u2022 How she feels: frightened (adjective) \u2192 determined (adjective) \u2192 realised she had to rely on herself (mental verb) \u2192 hopeful when she heard voices (adjective + mental verb)
\u2022 What changes: finds the group, feels relieved (adjective) but also proud \u2014 she solved it herself
\u2022 This is NOT a War Horse story \u2014 it\u2019s a Year 6 story about a kid at camp. YOUR stories are your own originals.
\u2022 Think about YOUR character\u2019s problem from your complication paragraph \u2014 that\u2019s where your resolution starts

DO:
\u2022 Think aloud as you fill in each section of the model plan
\u2022 Point to the mental verbs and adjectives as you use them
\u2022 Ask: "Can you see the mental verbs I used? Which adjectives describe Zara's feelings?"
\u2022 Have the model plan visible (on screen or board) throughout the writing block

TEACHER NOTES:
The think-aloud is the most important part of this slide. Students need to hear HOW a writer thinks through planning, not just see the finished product. The model narrative (Zara at school camp) is deliberately student-level \u2014 it's relatable, age-appropriate, and has clear problem-resolution structure. Don't use War Horse as your model because students need to see that this framework works for ANY narrative, not just the one they've been reading. The planning template is intentionally simple \u2014 four questions, dot-point answers. This prevents the common trap of students spending all their time planning and not writing. Keep the think-aloud to about 3-4 minutes \u2014 you need time for students to plan and write their own.

WATCH FOR:
\u2022 Students who want to copy your plan \u2014 redirect them to their OWN complication paragraph
\u2022 Students who can't remember their complication \u2014 have them re-read their writing book
\u2022 Students who plan a resolution that doesn't connect to their problem \u2014 use the planning template to show the link

[General: I Do \u2014 Planning Model | VTLM 2.0: Model]`);
  }

  // =====================================================================
  // SLIDE 10 — Model Writing a Resolution (I Do)
  // =====================================================================
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "I Do", { w: 1.2, color: C.GOLD });
    addTitle(s, "Writing the Resolution \u2014 Teacher Model", { y: 0.65, fontSize: 23 });

    // Model paragraph card — large, central
    addCard(s, 0.5, 1.3, 9, 2.6, { strip: C.GOLD });
    s.addText("Teacher\u2019s Model Paragraph", {
      x: 0.85, y: 1.4, w: 5, h: 0.32,
      fontSize: 14, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });

    // The model paragraph with inline formatting
    s.addText([
      { text: "Zara pressed her back against the rough bark of the tree, her breath coming in ragged gasps. She ", options: { fontSize: 13, color: C.CHARCOAL } },
      { text: "realised", options: { fontSize: 13, color: C.GOLD, bold: true } },
      { text: " that panicking would only make things worse. Slowly, her father\u2019s words drifted back to her: ", options: { fontSize: 13, color: C.CHARCOAL } },
      { text: "\u201CIf you\u2019re ever lost, find water and follow it downhill.\u201D", options: { fontSize: 13, color: C.CHARCOAL, italic: true } },
      { text: " Feeling ", options: { fontSize: 13, color: C.CHARCOAL } },
      { text: "determined", options: { fontSize: 13, color: C.SAGE, bold: true } },
      { text: ", she pushed herself to her feet and listened. There \u2014 the faint trickle of the creek. She ", options: { fontSize: 13, color: C.CHARCOAL } },
      { text: "decided", options: { fontSize: 13, color: C.GOLD, bold: true } },
      { text: " to follow it, placing each step carefully in the darkness. The bush closed in around her, but a ", options: { fontSize: 13, color: C.CHARCOAL } },
      { text: "desperate", options: { fontSize: 13, color: C.SAGE, bold: true } },
      { text: " ", options: { fontSize: 13, color: C.CHARCOAL } },
      { text: "hope", options: { fontSize: 13, color: C.CHARCOAL } },
      { text: " kept her moving. When she finally heard voices calling her name, ", options: { fontSize: 13, color: C.CHARCOAL } },
      { text: "relieved", options: { fontSize: 13, color: C.SAGE, bold: true } },
      { text: " tears spilled down her cheeks. She had done it. She had found her way back.", options: { fontSize: 13, color: C.CHARCOAL } },
    ], { x: 0.85, y: 1.78, w: 8.3, h: 1.9, fontFace: FONT_B, margin: 0 });

    // Annotation cards below — repositioned to stay within SAFE_BOTTOM
    // Mental verbs legend
    addCard(s, 0.5, 4.05, 2.8, 0.95);
    s.addShape("rect", {
      x: 0.65, y: 4.15, w: 0.35, h: 0.18,
      fill: { color: C.GOLD },
    });
    s.addText("= Mental verbs", {
      x: 1.1, y: 4.12, w: 1.8, h: 0.25,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addText("realised, decided", {
      x: 0.65, y: 4.4, w: 2.4, h: 0.2,
      fontSize: 11, fontFace: FONT_B, color: C.GOLD, italic: true, margin: 0,
    });
    s.addText("Show what the character THINKS", {
      x: 0.65, y: 4.62, w: 2.4, h: 0.2,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });

    // Adjectives legend
    addCard(s, 3.6, 4.05, 2.8, 0.95);
    s.addShape("rect", {
      x: 3.75, y: 4.15, w: 0.35, h: 0.18,
      fill: { color: C.SAGE },
    });
    s.addText("= Adjectives", {
      x: 4.2, y: 4.12, w: 1.8, h: 0.25,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addText("determined, desperate, relieved", {
      x: 3.75, y: 4.4, w: 2.4, h: 0.2,
      fontSize: 11, fontFace: FONT_B, color: C.SAGE, italic: true, margin: 0,
    });
    s.addText("Show what the character FEELS", {
      x: 3.75, y: 4.62, w: 2.4, h: 0.2,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });

    // Structure legend
    addCard(s, 6.7, 4.05, 2.8, 0.95);
    s.addShape("oval", { x: 6.85, y: 4.12, w: 0.3, h: 0.3, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.checkWhite, x: 6.89, y: 4.16, w: 0.22, h: 0.22 });
    s.addText("Structure", {
      x: 7.25, y: 4.12, w: 1.8, h: 0.25,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
    });
    s.addText([
      { text: "Connects to the problem", options: { bullet: true, fontSize: 10, color: C.CHARCOAL, breakLine: true } },
      { text: "Character takes action", options: { bullet: true, fontSize: 10, color: C.CHARCOAL, breakLine: true } },
      { text: "Tension eases at the end", options: { bullet: true, fontSize: 10, color: C.CHARCOAL } },
    ], { x: 6.85, y: 4.42, w: 2.4, h: 0.55, fontFace: FONT_B, margin: 0 });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 Watch as the plan becomes a paragraph \u2014 thinking aloud so you can hear a writer\u2019s brain at work
\u2022 Start with the problem: Zara pressed against a tree, panicking
\u2022 First mental verb: "She realised that panicking would only make things worse" \u2014 REALISED = shift in thinking
\u2022 Action + first adjective: remembers dad\u2019s advice, "Feeling determined" \u2014 mood shifts from panic to resolve
\u2022 Second mental verb: "She decided to follow it" \u2014 DECIDED = a choice, a thinking process
\u2022 Second adjective: "a desperate hope" \u2014 still scared but pushing through
\u2022 Tension eases at end: "relieved tears spilled down her cheeks" \u2014 RELIEVED = problem resolving
\u2022 Read from slide: legend cards \u2014 gold = mental verbs (thinking), green = adjectives (feeling)
\u2022 Ask: How many mental verbs? [Two \u2014 realised, decided] How many adjectives? [Three \u2014 determined, desperate, relieved]
\u2022 Good target: at least 2 mental verbs and 2 adjectives in your own writing

DO:
\u2022 Reveal the paragraph gradually if possible (section by section)
\u2022 Point to highlighted words as you discuss them
\u2022 Ask students to count the mental verbs and adjectives
\u2022 Reference back to the plan from Slide 9: "See how each part of my plan became part of the paragraph?"

TEACHER NOTES:
This is the culmination of the I Do phase. The model paragraph demonstrates every feature taught in Slides 7-8: mental verbs (realised, decided), adjectives (determined, desperate, relieved), action (following the creek), connection to the problem (being lost), and tension easing (finding the group). The colour-coding makes these features visible. Point explicitly to how the plan maps to the paragraph \u2014 this is the bridge students need to see before they plan and write their own. The paragraph is deliberately around 100 words \u2014 an achievable length for Year 6 students in one sitting. Don't let students think they need to write more than this.

WATCH FOR:
\u2022 Students who seem overwhelmed by the quality of the model \u2014 reassure them that this is the teacher model and their writing doesn't need to be identical
\u2022 Students who want to copy the paragraph \u2014 redirect: "This is MY story. You need to write YOUR story."
\u2022 Students who can't see the connection between plan and paragraph \u2014 draw explicit arrows between the two

[General: I Do \u2014 Writing Model | VTLM 2.0: Model]`);
  }

  // =====================================================================
  // SLIDE 11 — Guided Practice: Plan Your Resolution (We Do)
  // =====================================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.WARM };
    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.SAGE } });

    addBadge(s, "We Do", { w: 1.2, color: C.SAGE });
    addTitle(s, "Plan Your Resolution", { y: 0.65, color: C.OLIVE });

    // Planning template card — large
    addCard(s, 0.5, 1.3, 6.0, 3.5, { strip: C.OLIVE });
    s.addText("Your Planning Template", {
      x: 0.85, y: 1.42, w: 4, h: 0.32,
      fontSize: 15, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addText("Copy this into your writing book and fill it in.", {
      x: 0.85, y: 1.75, w: 5, h: 0.25,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    const planFields = [
      { label: "My problem was:", hint: "(What happened in your complication paragraph?)" },
      { label: "What does my character do?", hint: "(What ACTION do they take?)" },
      { label: "How does my character feel?", hint: "(Use mental verbs + adjectives)" },
      { label: "What changes?", hint: "(How does the situation shift?)" },
    ];
    planFields.forEach((f, i) => {
      const fy = 2.15 + i * 0.62;
      s.addText(f.label, {
        x: 0.85, y: fy, w: 3.5, h: 0.25,
        fontSize: 13, fontFace: FONT_B, color: C.OLIVE, bold: true, margin: 0,
      });
      s.addText(f.hint, {
        x: 3.8, y: fy, w: 2.5, h: 0.25,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });
      s.addShape("rect", {
        x: 0.85, y: fy + 0.3, w: 5.3, h: 0.01,
        fill: { color: C.SAND },
      });
    });

    // Instruction card — right side
    addCard(s, 6.8, 1.3, 2.7, 2.5, { fill: C.OLIVE });
    s.addText("Instructions", {
      x: 7.05, y: 1.4, w: 2.2, h: 0.28,
      fontSize: 13, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
    });
    s.addText([
      { text: "Re-read your complication paragraph", options: { bullet: true, fontSize: 10, color: C.LIGHT, breakLine: true } },
      { text: "Fill in each section of the plan", options: { bullet: true, fontSize: 10, color: C.LIGHT, breakLine: true } },
      { text: "Include at least 2 mental verbs and 2 adjectives in your \u201CHow does my character feel?\u201D section", options: { bullet: true, fontSize: 10, color: C.LIGHT } },
    ], { x: 7.05, y: 1.75, w: 2.2, h: 1.95, fontFace: FONT_B, margin: 0 });

    // Teacher check card — right bottom
    addCard(s, 6.8, 4.0, 2.7, 0.9, { fill: C.GOLD });
    s.addImage({ data: icons.checkWhite, x: 7.7, y: 4.08, w: 0.35, h: 0.35 });
    s.addText("Teacher Check", {
      x: 7.05, y: 4.45, w: 2.2, h: 0.22,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0,
    });
    s.addText("I\u2019ll check your plan before you start writing.", {
      x: 7.05, y: 4.65, w: 2.2, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.WHITE, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 Your turn to plan \u2014 open writing books, write date and heading "Resolution Plan"
\u2022 Copy the four questions from the slide
\u2022 FIRST: go back and re-read your complication paragraph from last week \u2014 you need to know your problem before resolving it
\u2022 If you can\u2019t find your complication paragraph, hand up and I\u2019ll help
\u2022 Three things to focus on: What does your character DO? (action) How do they FEEL? (mental verbs + adjectives) What CHANGES? (situation shifts)
\u2022 At least 2 mental verbs and 2 adjectives in the "How does my character feel?" section
\u2022 Five minutes for planning
\u2022 Don\u2019t start writing the paragraph yet \u2014 wait until I\u2019ve checked your plan

DO:
\u2022 Set a 5-minute timer for planning
\u2022 Circulate immediately \u2014 check that students have found their complication paragraphs
\u2022 Priority check: the "How does my character feel?" section (mental verbs + adjectives)
\u2022 Quick verbal approval for students whose plans are ready: "Good to go"
\u2022 Pull a small group of students who are struggling \u2014 work through the template together

TEACHER NOTES:
This is the "C" in DECIDE \u2014 Cycle. Students are applying the framework with teacher support. The teacher check before writing is a deliberate gate \u2014 it prevents students from writing a resolution that doesn't connect to their complication or that lacks the target language features. This is the hinge point of the lesson. If most students' plans are weak, STOP and return to the I Do model (Slide 9). If only a few students are struggling, pull them into a small group while others proceed. The hints in parentheses on the planning template scaffold without giving away the answer. The instruction to re-read the complication paragraph is critical \u2014 many students will have forgotten what they wrote.

WATCH FOR:
\u2022 Students whose resolution doesn't connect to their problem \u2014 ask: "What was the problem? How does this solve it?"
\u2022 Plans that are too vague ("my character feels sad") \u2014 push for specific mental verbs: "Which SPECIFIC verb? Realised? Understood? Decided?"
\u2022 Students who plan a completely new problem instead of resolving the existing one \u2014 redirect to complication paragraph
\u2022 Students who finish quickly \u2014 check quality before approving; fast doesn't mean good

[General: We Do \u2014 Guided Practice | VTLM 2.0: Guide]`);
  }

  // =====================================================================
  // SLIDE 12 — Independent Practice: Write Your Resolution (You Do)
  // =====================================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.WARM };
    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.BURGUNDY } });

    addBadge(s, "You Do", { w: 1.2, color: C.BURGUNDY });
    addTitle(s, "Your Turn \u2014 Write Your Resolution", { y: 0.65, color: C.OLIVE });

    // Three instruction cards — First / Next / Then
    const steps = [
      {
        label: "First",
        icon: "1",
        color: C.GOLD,
        text: "Review your plan. Make sure you have at least two mental verbs and two adjectives ready to use.",
      },
      {
        label: "Next",
        icon: "2",
        color: C.SAGE,
        text: "Write your resolution paragraph in your writing book. Use your plan as a guide. Remember: show what your character DOES, THINKS, and FEELS.",
      },
      {
        label: "Then",
        icon: "3",
        color: C.OLIVE,
        text: "Re-read your paragraph. Check: Does it connect to the problem? Does it use mental verbs and adjectives? Does it move the story towards an ending?",
      },
    ];

    steps.forEach((step, i) => {
      const cy = 1.3 + i * 1.2;
      addCard(s, 0.5, cy, 9, 1.0);
      // Number circle
      s.addShape("oval", { x: 0.75, y: cy + 0.15, w: 0.6, h: 0.6, fill: { color: step.color } });
      s.addText(step.icon, {
        x: 0.75, y: cy + 0.15, w: 0.6, h: 0.6,
        fontSize: 20, fontFace: FONT_H, color: C.WHITE,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
      // Label
      s.addText(step.label, {
        x: 1.55, y: cy + 0.08, w: 1.5, h: 0.35,
        fontSize: 16, fontFace: FONT_H, color: step.color, bold: true, margin: 0,
      });
      // Instruction text
      s.addText(step.text, {
        x: 1.55, y: cy + 0.42, w: 7.6, h: 0.48,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    });

    // Time indicator — repositioned to stay within SAFE_BOTTOM
    s.addShape("roundRect", {
      x: 7.5, y: 4.65, w: 2.0, h: 0.35, rectRadius: 0.08,
      fill: { color: C.BURGUNDY },
    });
    s.addText("15\u201320 minutes", {
      x: 7.5, y: 4.65, w: 2.0, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 Plans checked \u2014 ready to write. Follow the three steps on the slide.
\u2022 FIRST: review plan one more time, confirm 2+ mental verbs and 2+ adjectives ready
\u2022 NEXT: write the resolution paragraph \u2014 use plan as guide but add detail and description
\u2022 Show what character DOES (action), THINKS (mental verbs), FEELS (adjectives)
\u2022 Think about the Zara model: she didn\u2019t just find her way back \u2014 she realised, decided, felt determined, desperate, relieved
\u2022 THEN: re-read and self-check against three questions \u2014 connects to problem? uses mental verbs/adjectives? moves toward ending?
\u2022 15\u201320 minutes writing time; I\u2019ll be conferencing individually
\u2022 If stuck, re-read your plan first, then hand up

DO:
\u2022 Set a 15-20 minute timer visible to students
\u2022 Conference with individual students \u2014 prioritise those who struggled with planning
\u2022 Use prompt questions during conferences: "What mental verb did you use here? Can you add an adjective to describe how they felt?"
\u2022 Give a 5-minute warning before the end of writing time
\u2022 Students who finish early: move to Slide 13 (editing)

TEACHER NOTES:
This is the "D" in DECIDE \u2014 Differentiate. Students write independently while you conference. Prioritise conferencing with students who had weak plans or who struggle with writing. For conferences, use the success criteria as your guide: Can you see mental verbs? Adjectives? Connection to the problem? For high-ability writers, push for more sophisticated vocabulary, varied sentence structure, and stronger characterisation. For struggling writers, focus on getting a complete paragraph that connects to the problem and includes at least one mental verb. The First/Next/Then structure is a self-management scaffold \u2014 students can track their own progress through the steps.

WATCH FOR:
\u2022 Students who write a single sentence and declare they're done \u2014 ask: "Have you shown what your character thinks AND feels? Let's add that."
\u2022 Students who start a new problem instead of resolving the existing one \u2014 redirect to their plan
\u2022 Students writing dialogue only (no narration) \u2014 prompt: "Can you add a sentence that shows what your character is THINKING?"
\u2022 Students who are stuck after 5 minutes \u2014 sit with them and co-construct the first sentence

[General: You Do \u2014 Independent Practice | VTLM 2.0: Practise]`);
  }

  // =====================================================================
  // SLIDE 13 — Review & Edit (You Do continued)
  // =====================================================================
  {
    const s = pres.addSlide();
    addTopBar(s, C.OLIVE);
    addBadge(s, "Review", { w: 1.4, color: C.OLIVE });
    addTitle(s, "Re-read, Proofread & Edit", { y: 0.65 });

    // Editing checklist card — left
    addCard(s, 0.5, 1.3, 5.5, 3.0, { strip: C.OLIVE });
    s.addShape("oval", { x: 0.85, y: 1.45, w: 0.5, h: 0.5, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.editWhite, x: 0.93, y: 1.53, w: 0.34, h: 0.34 });
    s.addText("Editing Checklist", {
      x: 1.5, y: 1.48, w: 3.5, h: 0.35,
      fontSize: 16, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });

    const checklistItems = [
      "Does my resolution connect to my complication?",
      "Have I used mental verbs to show thinking/feeling?",
      "Have I used adjectives to describe emotions?",
      "Does my character take action to solve the problem?",
      "Have I checked spelling, punctuation and grammar?",
      "Does my resolution move the story towards the ending?",
    ];
    checklistItems.forEach((item, i) => {
      s.addImage({ data: icons.checkOlive, x: 0.85, y: 2.05 + i * 0.36, w: 0.22, h: 0.22 });
      s.addText(item, {
        x: 1.2, y: 2.02 + i * 0.36, w: 4.5, h: 0.3,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    });

    // Partner sharing card — right
    addCard(s, 6.3, 1.3, 3.2, 3.1, { strip: C.GOLD });
    s.addShape("oval", { x: 6.65, y: 1.45, w: 0.5, h: 0.5, fill: { color: C.GOLD } });
    s.addImage({ data: icons.commentsWhite, x: 6.73, y: 1.53, w: 0.34, h: 0.34 });
    s.addText("Partner Sharing", {
      x: 7.3, y: 1.48, w: 2, h: 0.32,
      fontSize: 14, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });

    s.addText([
      { text: "Step 1: ", options: { bold: true, fontSize: 11, color: C.GOLD, breakLine: false } },
      { text: "Swap books with your partner.", options: { fontSize: 11, color: C.CHARCOAL, breakLine: true } },
      { text: "Step 2: ", options: { bold: true, fontSize: 11, color: C.GOLD, breakLine: false } },
      { text: "Read their resolution paragraph.", options: { fontSize: 11, color: C.CHARCOAL, breakLine: true } },
      { text: "Step 3: ", options: { bold: true, fontSize: 11, color: C.GOLD, breakLine: false } },
      { text: "Give specific feedback:", options: { fontSize: 11, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 4, breakLine: true } },
      { text: "\u201CI liked how you used the mental verb ___ because it showed...\u201D", options: { fontSize: 10, color: C.MUTED, italic: true, breakLine: true } },
      { text: "or", options: { fontSize: 9, color: C.MUTED, breakLine: true } },
      { text: "\u201CYou could improve this by adding a ___ to show...\u201D", options: { fontSize: 10, color: C.MUTED, italic: true } },
    ], { x: 6.55, y: 1.95, w: 2.7, h: 2.35, fontFace: FONT_B, margin: 0 });

    // Bottom tip — repositioned to stay within SAFE_BOTTOM
    addCard(s, 0.5, 4.5, 9, 0.5, { fill: C.WARM });
    s.addImage({ data: icons.bulbGold, x: 0.75, y: 4.58, w: 0.28, h: 0.28 });
    s.addText([
      { text: "Editing tip: ", options: { bold: true, fontSize: 11, color: C.GOLD } },
      { text: "Read your paragraph aloud quietly to yourself. If you stumble on a sentence, it probably needs editing.", options: { fontSize: 11, color: C.CHARCOAL } },
    ], { x: 1.15, y: 4.55, w: 8.0, h: 0.4, fontFace: FONT_B, margin: 0 });

    addFooter(s, FOOTER);
    s.addNotes(`SAY:
\u2022 Writing time almost up \u2014 switching to editing mode
\u2022 Read from slide: six checklist items \u2014 go through paragraph and check each one
\u2022 Underline any mental verbs and adjectives you find in your writing
\u2022 Character must take ACTION, not just feel things
\u2022 Check the basics: spelling, punctuation, grammar \u2014 read every sentence
\u2022 Resolution should feel like things are winding down, not ramping up
\u2022 After self-check: swap books with partner, read their resolution
\u2022 Give ONE piece of specific feedback using the sentence starters on the slide
\u2022 Not "good job" \u2014 something specific about a mental verb or adjective they used
\u2022 Be kind, be specific, be helpful

DO:
\u2022 Give 3 minutes for self-editing with the checklist
\u2022 Then 4 minutes for partner swap and feedback
\u2022 Circulate during partner sharing \u2014 listen for quality of feedback
\u2022 If feedback is too vague ("it's good"), redirect to the sentence starters
\u2022 Collect or note observations about common strengths and weaknesses for future planning

TEACHER NOTES:
This is the "E" in DECIDE \u2014 Embed. Self-editing and peer feedback build metacognitive skills. The checklist is deliberately aligned to the success criteria from Slide 2 \u2014 students are self-assessing against the same targets. The partner sharing serves two purposes: accountability (someone else reads your work) and learning (reading another student's writing teaches you about your own). The sentence starters for feedback are essential \u2014 without them, Year 6 students default to "it's good" or "I liked it." Specific feedback targets the language features (mental verbs, adjectives) so the metalanguage is reinforced even in the feedback process. The tip about reading aloud is a genuine proofreading strategy that catches errors the eye misses.

WATCH FOR:
\u2022 Students who skip the self-check and go straight to partner sharing \u2014 redirect them to the checklist first
\u2022 Vague feedback ("I liked it") \u2014 model specific feedback: "What EXACTLY did you like? Which word? Which sentence?"
\u2022 Students who get defensive about feedback \u2014 remind them that editing is what real authors do
\u2022 Students who didn't finish writing \u2014 have them do a partial check on what they've written and plan to finish tomorrow

[General: You Do \u2014 Review & Edit | VTLM 2.0: Embed]`);
  }

  // =====================================================================
  // SLIDE 14 — Closing / Reflection
  // =====================================================================
  closingSlide(
    pres,
    "Think about what makes a powerful resolution. It\u2019s not just about solving the problem \u2014 it\u2019s about showing how the character has grown. What mental verb best describes how YOUR character feels at this point in your story? Share with your partner.",
    [
      "A resolution shows the character taking action to address the problem",
      "Mental verbs and adjectives bring the resolution to life",
      "Real war horses (Walers) add depth to our understanding of War Horse",
      "Tomorrow we\u2019ll write the conclusion to finish our narratives",
    ],
    `SAY:
\u2022 Pens down, eyes on me \u2014 big lesson today: read about Walers AND wrote a resolution paragraph
\u2022 Reflection question: What mental verb best describes how YOUR character feels at this point?
\u2022 Not how YOU feel \u2014 how your CHARACTER feels
\u2022 5 seconds think time, then turn and tell partner: "My character feels..." using a mental verb or adjective
\u2022 Cold call 2\u20133 students to share: Ask: What did you say? Why that word? [Student responds]
\u2022 Read from slide: four key takeaways
  \u2013 Resolution = character takes action, not just feeling things
  \u2013 Mental verbs + adjectives = tools that bring resolution to life
  \u2013 Walers = REAL horses, REAL experiences \u2014 makes the fiction more powerful
  \u2013 TOMORROW (Lesson 15): write the conclusion \u2014 final paragraph, story complete
\u2022 Give yourselves a round of applause \u2014 you\u2019ve worked incredibly hard today

DO:
\u2022 Facilitate pair share \u2014 listen for use of metalanguage (mental verbs, adjectives)
\u2022 Cold call 2-3 students to share their character's mental verb
\u2022 Read the four takeaways aloud
\u2022 Build excitement for Lesson 15 \u2014 "Your story is almost finished!"
\u2022 Collect writing books if appropriate

TEACHER NOTES:
The reflection prompt deliberately asks students to use the lesson's metalanguage (mental verbs) in describing their own character. This reinforces the learning while also checking understanding. If students can articulate their character's internal state using a mental verb, they've internalised the concept. The four takeaways bridge both halves of the lesson \u2014 the Walers reading and the resolution writing \u2014 reminding students that both activities serve the larger unit goals. The forward look to Lesson 15 (conclusion) maintains momentum and gives students a clear sense of progress through their narrative. This is the final lesson before students complete their narratives, so enthusiasm and encouragement matter here.

WATCH FOR:
\u2022 Students who can't name a mental verb for their character \u2014 they may not have used one in their writing; note this for conferencing tomorrow
\u2022 Students who are anxious about not finishing \u2014 reassure them that there will be time to finish and edit in coming lessons
\u2022 High-energy levels at the end of a big lesson \u2014 use the pair share to channel energy productively

[General: Reflection | VTLM 2.0: Reflect & Connect]`
  );

  // ── Save ───────────────────────────────────────────────────────────────
  await pres.writeFile({ fileName: "output/WH_Lesson14.pptx" });
  console.log("Saved: output/WH_Lesson14.pptx");
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
