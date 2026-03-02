// War Horse — Lesson 12: Chapter 10 — Emilie's Care
// Year 6 Narrative Writing Unit | Week 3
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
  FaComments, FaFeatherAlt, FaQuoteLeft, FaMagic, FaBook,
  FaListOl, FaPencilAlt, FaCheckCircle, FaStar, FaLightbulb,
} = require("react-icons/fa");

const FOOTER = "Week 3  |  War Horse  |  Lesson 12";

async function build() {
  if (!fs.existsSync("output")) fs.mkdirSync("output");

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Claude";
  pres.title = "War Horse — Lesson 12: Chapter 10 — Emilie's Care";

  // Pre-render icons
  const icons = {
    bookOpen:   await iconToBase64Png(FaBookOpen, "#FFFFFF"),
    bookOlive:  await iconToBase64Png(FaBookOpen, "#2B3A2D"),
    pen:        await iconToBase64Png(FaPen, "#FFFFFF"),
    teacher:    await iconToBase64Png(FaChalkboardTeacher, "#FFFFFF"),
    teacherOlive: await iconToBase64Png(FaChalkboardTeacher, "#2B3A2D"),
    users:      await iconToBase64Png(FaUsers, "#FFFFFF"),
    search:     await iconToBase64Png(FaSearch, "#FFFFFF"),
    searchOlive: await iconToBase64Png(FaSearch, "#2B3A2D"),
    comments:   await iconToBase64Png(FaComments, "#FFFFFF"),
    feather:    await iconToBase64Png(FaFeatherAlt, "#FFFFFF"),
    featherGold: await iconToBase64Png(FaFeatherAlt, "#C8913B"),
    quote:      await iconToBase64Png(FaQuoteLeft, "#FFFFFF"),
    magic:      await iconToBase64Png(FaMagic, "#FFFFFF"),
    magicBurg:  await iconToBase64Png(FaMagic, "#8B2E3B"),
    book:       await iconToBase64Png(FaBook, "#FFFFFF"),
    listOl:     await iconToBase64Png(FaListOl, "#FFFFFF"),
    pencil:     await iconToBase64Png(FaPencilAlt, "#FFFFFF"),
    check:      await iconToBase64Png(FaCheckCircle, "#FFFFFF"),
    checkOlive: await iconToBase64Png(FaCheckCircle, "#5B7553"),
    star:       await iconToBase64Png(FaStar, "#C8913B"),
    bulb:       await iconToBase64Png(FaLightbulb, "#FFFFFF"),
    bulbGold:   await iconToBase64Png(FaLightbulb, "#C8913B"),
  };


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title (helper)
  // ═══════════════════════════════════════════════════════════════════════════
  titleSlide(
    pres,
    "War Horse",
    "Chapter 10 \u2014 Emilie\u2019s Care",
    "Lesson 12  |  Week 3  |  Year 6 Narrative Writing",
    `SAY:
\u2022 Lesson 12 \u2014 diving into Chapter 10 of War Horse
\u2022 Recap: Joey and Topthorn have been captured by the German army; things have been grim
\u2022 Today\u2019s chapter introduces a new character who changes the tone of the whole story
\u2022 Ask: What do you remember about where Joey was at the end of Chapter 9? [Captured by Germans / hauling wounded soldiers and artillery]

DO:
\u2022 Ensure all students have their copy of War Horse open and ready
\u2022 Display the title slide as students settle
\u2022 Use a calm, anticipatory tone to build interest

TEACHER NOTES:
This lesson sits in Week 3 of the narrative writing unit. By now, students should be comfortable with the close-reading routines and pause-point discussions from Weeks 1\u20132. Chapter 10 marks a tonal shift in the novel \u2014 from the bleakness of war to moments of tenderness and hope through Emilie\u2019s character. This is a rich chapter for character analysis and for exploring how authors manipulate reader emotions. The grammar focus on subordinating conjunctions builds on compound sentence work from the previous week.

WATCH FOR:
\u2022 Students who haven\u2019t kept up with reading \u2014 pair them with a reading partner so they can follow along
\u2022 If energy is low, use the anticipatory framing (\u201Cthis chapter will surprise you\u201D) to spark curiosity

[General: Introduction | VTLM 2.0: Engage]`
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — Learning Intentions & Success Criteria (helper)
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
      "I can identify how the author uses character to create empathy and hope",
      "I can discuss how authorial choices shape the reader\u2019s perspective",
      "I can complete a complex sentence by adding an independent clause to a dependent clause",
    ],
    `SAY:
\u2022 Read through each learning intention aloud with a brief verbal annotation
\u2022 LI 1: Compare purposes and text structures \u2014 familiar from Week 1, looking at Morpurgo\u2019s first-person horse narration
\u2022 LI 2: Question assertions \u2014 critical literacy; we don\u2019t just accept what the author says, we ask why
\u2022 LI 3: Analyse character attributes \u2014 front and centre today with new character Emilie
\u2022 LI 4: Identify how perspective is made evident through authorial choices
\u2022 LI 5: Vary sentence structures \u2014 grammar focus today on complex sentences
\u2022 Ask: Thumbs up/down \u2014 have you heard each of these before?
\u2022 Read from slide: the three success criteria \u2014 these are your targets for today

DO:
\u2022 Read each learning intention aloud with a brief verbal annotation
\u2022 Ask for thumbs up/down to check familiarity with each one
\u2022 Point explicitly to the success criteria and have students read them silently

TEACHER NOTES:
The learning intentions span reading comprehension, critical literacy, and grammar. This reflects the integrated nature of the DECIDE framework \u2014 reading and writing are not siloed. The success criteria are deliberately student-friendly and measurable. Students should be able to self-assess against these at the close of the lesson. The complex sentence criterion connects directly to the I Do / We Do / You Do sequence later.

WATCH FOR:
\u2022 Students who seem unfamiliar with terms like \u201Cauthorial choices\u201D or \u201Cperspective\u201D \u2014 these were introduced in Week 2; quick verbal recap may be needed
\u2022 If more than a third of students can\u2019t articulate what \u201Ccomplex sentence\u201D means, plan to spend extra time on the I Do modelling

[General: Learning Intentions | VTLM 2.0: Establish Purpose]`,
    FOOTER
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — Vocabulary Review (Daily Review)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Daily Review", { w: 1.6, color: C.SAGE });
    addTitle(s, "Vocabulary Review");

    // Left card — Previously Taught Words
    addCard(s, 0.5, 1.3, 4.25, 3.8, { strip: C.OLIVE });
    s.addShape("oval", { x: 0.75, y: 1.45, w: 0.5, h: 0.5, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.bookOlive, x: 0.82, y: 1.52, w: 0.36, h: 0.36 });
    // overlay white icon on olive circle
    s.addImage({ data: icons.bookOpen, x: 0.82, y: 1.52, w: 0.36, h: 0.36 });
    s.addText("Previously Taught Words", {
      x: 1.4, y: 1.48, w: 3.2, h: 0.4,
      fontSize: 15, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });

    const prevWords = [
      { word: "camaraderie", def: "a feeling of trust and friendship among a group" },
      { word: "tremulous", def: "shaking or quivering slightly; timid" },
      { word: "forlorn", def: "sad and lonely; pitifully sad" },
      { word: "obliged", def: "forced or required to do something" },
    ];
    prevWords.forEach((pw, i) => {
      const wy = 2.1 + i * 0.7;
      s.addText(pw.word, {
        x: 0.8, y: wy, w: 3.8, h: 0.28,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
      });
      s.addText(pw.def, {
        x: 0.8, y: wy + 0.28, w: 3.8, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });
    });

    // Right card — Today's Focus
    addCard(s, 5.25, 1.3, 4.25, 3.8, { strip: C.GOLD });
    s.addShape("oval", { x: 5.5, y: 1.45, w: 0.5, h: 0.5, fill: { color: C.GOLD } });
    s.addImage({ data: icons.star, x: 5.57, y: 1.52, w: 0.36, h: 0.36 });
    // white star overlay
    s.addImage({ data: icons.bulb, x: 5.57, y: 1.52, w: 0.36, h: 0.36 });
    s.addText("Today\u2019s Focus", {
      x: 6.15, y: 1.48, w: 3.2, h: 0.4,
      fontSize: 15, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });

    const todayWords = [
      {
        word: "hazardous",
        def: "dangerous; risky; full of risk",
        eg: "\u201CThe hazardous conditions made the journey perilous for both horse and soldier.\u201D",
      },
      {
        word: "lavish",
        def: "to give generously; or sumptuously rich and elaborate",
        eg: "\u201CEmilie lavished care and attention on Joey and Topthorn each evening.\u201D",
      },
    ];
    todayWords.forEach((tw, i) => {
      const wy = 2.1 + i * 1.35;
      s.addText(tw.word, {
        x: 5.55, y: wy, w: 3.8, h: 0.3,
        fontSize: 15, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
      });
      s.addText(tw.def, {
        x: 5.55, y: wy + 0.32, w: 3.8, h: 0.3,
        fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
      });
      s.addText(tw.eg, {
        x: 5.55, y: wy + 0.65, w: 3.8, h: 0.5,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Daily vocab check \u2014 Cold Call on previously taught words
\u2022 Cold Call: camaraderie \u2014 trust and friendship within a group (seen with Joey and Topthorn)
\u2022 Cold Call: tremulous \u2014 ask a student to use it in a sentence about War Horse
\u2022 Cold Call: forlorn and obliged
\u2022 New word 1: hazardous \u2014 choral pronunciation: haz-ard-ous
\u2022 Meaning: dangerous or risky; will appear in the chapter describing conditions the horses face
\u2022 New word 2: lavish \u2014 choral pronunciation: lav-ish
\u2022 Dual function: verb (to give generously \u2014 Emilie lavishes care on the horses) and adjective (sumptuously rich)
\u2022 Listen for both words as we read today

DO:
\u2022 Cold Call 4\u20135 students on the previously taught words (no hands up)
\u2022 Have students chorally pronounce each new word at least twice
\u2022 Write both new words on the class word wall

TEACHER NOTES:
The daily vocabulary review follows the spiral revision model from the DECIDE framework. Previously taught words are recycled to build long-term retention. The two explicit words \u2014 hazardous and lavish \u2014 are Tier 2 words that appear in the chapter and have broad utility across subject areas. Cold calling ensures accountability and gives formative data on which words need revisiting. Choral pronunciation builds phonological familiarity.

WATCH FOR:
\u2022 Students who conflate \u201Chavardous\u201D with \u201Chazardous\u201D (common mispronunciation) \u2014 correct immediately with choral drill
\u2022 If students struggle with more than two previously taught words, allocate extra time to vocabulary revision in a future warm-up

[General: Vocabulary Review | VTLM 2.0: Activate Prior Knowledge]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — Chapter Introduction
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Text-Level Reading", { w: 2.0, color: C.OLIVE });

    // Reading mode badge on right
    addBadge(s, "Student Read Aloud", { x: 7.5, w: 2.0, color: C.SAGE });

    addTitle(s, "Chapter 10 \u2014 Pages 79\u201387");

    // Summary card — broken into digestible chunks
    addCard(s, 0.5, 1.3, 9, 3.55, { strip: C.GOLD });

    s.addShape("oval", { x: 0.75, y: 1.45, w: 0.5, h: 0.5, fill: { color: C.GOLD } });
    s.addImage({ data: icons.bookOpen, x: 0.82, y: 1.52, w: 0.36, h: 0.36 });
    s.addText("Chapter Summary", {
      x: 1.4, y: 1.48, w: 3.5, h: 0.4,
      fontSize: 15, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });

    const summaryChunks = [
      {
        label: "A New Home",
        text: "Joey and Topthorn are taken care of by a little girl, Emilie, and her grandfather. They continue to transfer the wounded by day, then are tended to warmly at night.",
      },
      {
        label: "Growing Bond",
        text: "Joey enjoys Emilie\u2019s company and looks forward to seeing her at the end of each day. Her presence brings comfort amid the chaos of war.",
      },
      {
        label: "Crisis",
        text: "One day, Emilie doesn\u2019t come to see them. The grandfather arrives and tells them to pray for Emilie \u2014 she is sick with pneumonia.",
      },
      {
        label: "Hope at Christmas",
        text: "The following day, Christmas, proves very difficult on the battlefield. But Joey and Topthorn return to hear the good news: Emilie is improving against the odds.",
      },
    ];

    summaryChunks.forEach((chunk, i) => {
      const cy = 2.05 + i * 0.68;
      s.addText(chunk.label, {
        x: 0.85, y: cy, w: 1.5, h: 0.22,
        fontSize: 11, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
      });
      s.addText(chunk.text, {
        x: 0.85, y: cy + 0.22, w: 8.3, h: 0.42,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Recap: Joey and Topthorn captured by the German army, hauling wounded soldiers \u2014 things have been bleak
\u2022 Chapter 10 introduces Emilie, a little French girl living with her grandfather near the front lines
\u2022 Direct students to skim the four summary labels on screen: A New Home, Growing Bond, Crisis, Hope at Christmas
\u2022 Point out the chapter\u2019s structure: hope \u2192 bond \u2192 crisis \u2192 resolution \u2014 deliberate by Morpurgo
\u2022 Student Read Aloud today \u2014 selecting readers as we go; everyone follows along in their own copy
\u2022 If you lose your place, put your finger on the page and look to your neighbour

DO:
\u2022 Give students 15 seconds to skim the summary labels silently
\u2022 Select the first reader and begin at page 79
\u2022 Change readers every half-page to maintain engagement
\u2022 Have sticky notes ready for students to mark pause-point pages

TEACHER NOTES:
Breaking the chapter summary into labelled chunks helps students develop their understanding of narrative structure \u2014 setup, complication, crisis, resolution. This mirrors the story arc work from earlier in the unit. The Student Read Aloud mode keeps all students accountable as potential readers. The chapter is relatively short (8 pages), so pace the reading to allow for three pause points. The summary on screen is a scaffold for students who struggle with comprehension; it gives them a structural framework to hang details on as they read.

WATCH FOR:
\u2022 Students reading ahead silently \u2014 gently redirect them to follow the current reader
\u2022 Struggling readers who may need a shorter passage \u2014 pre-plan who will read easier sections

[General: Reading | VTLM 2.0: Engage with Text]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 5 — Pause Point 1 (helper)
  // ═══════════════════════════════════════════════════════════════════════════
  pausePointSlide(
    pres,
    "...clasping her hands in excitement as she watched us being unhitched.",
    "83",
    "How does the author want us to feel about Emilie? How are things looking for Joey and Topthorn?",
    `SAY:
\u2022 Read from slide: \u201C...clasping her hands in excitement as she watched us being unhitched.\u201D
\u2022 Morpurgo\u2019s deliberate choice: physical description (hands clasped, excitement) rather than simply \u201CEmilie watched them\u201D
\u2022 Ask: What does he want us to feel about Emilie? [Think-Pair-Share, 30 seconds]
\u2022 Key idea: warmth, kindness \u2014 she\u2019s genuinely excited to see the horses
\u2022 Ask: How are things looking for Joey and Topthorn now? [Cold Call]
\u2022 For the first time, things are looking up \u2014 someone cares about them as animals, not tools of war
\u2022 Morpurgo is using Emilie to give the reader hope \u2014 introducing light after darkness; important authorial choice

DO:
\u2022 Stop reading at page 83 at the indicated quote
\u2022 Allow 5 seconds of silent re-reading of the quote
\u2022 Use Think-Pair-Share: 30 seconds partner talk, then Cold Call 2\u20133 pairs
\u2022 Record key student responses on the whiteboard under \u201CAuthor\u2019s Purpose\u201D

TEACHER NOTES:
This pause point targets character analysis and authorial intent. The physical description (\u201Cclasping her hands\u201D) is a classic Morpurgo technique \u2014 he uses embodied action to reveal character rather than stating emotions directly. This aligns with the \u201Cshow, don\u2019t tell\u201D principle students have been learning in their own narrative writing. The Think-Pair-Share structure ensures all students process the question before anyone shares. Cold calling after partner talk is lower stakes than cold calling from silence.

WATCH FOR:
\u2022 Students who say \u201CShe\u2019s happy\u201D without connecting it to Morpurgo\u2019s intent \u2014 push with: \u201CYes, but why does Morpurgo want US to know she\u2019s happy?\u201D
\u2022 If pairs are off-task during discussion, stand near them to refocus without interrupting the whole class

[General: Pause Point 1 | VTLM 2.0: Monitor & Respond]`,
    FOOTER
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 6 — Pause Point 2 (helper)
  // ═══════════════════════════════════════════════════════════════════════════
  pausePointSlide(
    pres,
    "...pray for her like she does for you.",
    "85",
    "What does the author want us to know?",
    `SAY:
\u2022 Read from slide: \u201C...pray for her like she does for you.\u201D
\u2022 Emilie prays for the horses \u2014 she\u2019s not just feeding and brushing them; she has a deep emotional connection
\u2022 Ask: What does this tell us about how Emilie sees the horses? [Cold Call] [She sees them as more than animals]
\u2022 The grandfather asks the horses to pray for Emilie \u2014 of course horses can\u2019t pray, but Joey understands in his own way
\u2022 Ask: What bigger themes does the author want us to see? [Turn and Talk, 30 seconds]
\u2022 Key idea: compassion crossing the lines of war \u2014 Emilie is French, the horses serve the German army, yet she cares regardless
\u2022 Morpurgo is reminding us that kindness doesn\u2019t have a nationality

DO:
\u2022 Stop reading at page 85 at the indicated quote
\u2022 Read the quote aloud yourself with appropriate gravity
\u2022 Use Cold Call for initial response, then Turn and Talk for deeper thinking
\u2022 Write \u201CCompassion crosses the lines of war\u201D on the board as a theme statement

TEACHER NOTES:
This pause point connects character analysis to thematic understanding. The grandfather\u2019s line operates on two levels: literal (pray for the sick girl) and thematic (compassion transcends conflict). Year 6 students should be pushed beyond literal comprehension to interrogate what the author is doing with this moment. The theme of compassion crossing boundaries is central to the novel and will recur in Chapters 11\u201315. Making this theme explicit now gives students a lens for future reading. This connects to the VTLM 2.0 element of higher-order thinking.

WATCH FOR:
\u2022 Students who focus only on \u201CEmilie is sick\u201D without unpacking the thematic significance \u2014 scaffold with: \u201CYes, but look at the word \u2018like\u2019 \u2014 what comparison is the grandfather making?\u201D
\u2022 Ensure at least one quieter student is Cold Called during this discussion to broaden participation

[General: Pause Point 2 | VTLM 2.0: Higher-Order Thinking]`,
    FOOTER
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 7 — Pause Point 3 (helper)
  // ═══════════════════════════════════════════════════════════════════════════
  pausePointSlide(
    pres,
    "All\u2019s well, I tell you. All\u2019s well.",
    "87",
    "What\u2019s the big idea?",
    `SAY:
\u2022 Read from slide: \u201CAll\u2019s well, I tell you. All\u2019s well.\u201D
\u2022 Context: Christmas Day \u2014 brutal day on the battlefield; Joey and Topthorn return exhausted, expecting the worst because Emilie has been so sick
\u2022 Ask: Why does Morpurgo end the chapter this way? Not just what happens \u2014 why this ending? [10 seconds think time, then Turn and Talk, 45 seconds]
\u2022 Key idea: resilience and hope \u2014 even in the middle of war, on Christmas, hope survives
\u2022 Chapter structure mirrors a mini-narrative arc: tension builds \u2192 crisis hits \u2192 resolution comes
\u2022 Repetition of \u201CAll\u2019s well\u201D is deliberate \u2014 reassurance; the grandfather is convincing himself as much as the horses
\u2022 Cold Call 3 students and build on each response

DO:
\u2022 Stop reading at the end of the chapter (page 87)
\u2022 Give 10 seconds of individual think time before Turn and Talk
\u2022 Cold Call 3 students and build on each response
\u2022 Summarise the big idea explicitly: resilience, hope, narrative structure

TEACHER NOTES:
This final pause point synthesises the chapter. The question \u201CWhat\u2019s the big idea?\u201D pushes students beyond recall to interpretation. The repetition of \u201CAll\u2019s well\u201D is a stylistic device worth noting \u2014 it functions as both dialogue and thematic statement. Christmas as a setting amplifies the emotional resonance. Students who can articulate the connection between narrative structure (tension-crisis-resolution) and the reader\u2019s emotional experience are demonstrating sophisticated literary analysis. This discussion sets up the literary devices slide that follows. The DECIDE framework positions this as the culmination of the guided reading phase before moving to explicit teaching.

WATCH FOR:
\u2022 Students who only summarise the plot (\u201CEmilie gets better\u201D) without analysing the author\u2019s purpose \u2014 redirect with: \u201CYes, but why does Morpurgo choose to end on this note?\u201D
\u2022 If discussion runs long, cut the third Cold Call and summarise yourself to stay on schedule

[General: Pause Point 3 | VTLM 2.0: Synthesise]`,
    FOOTER
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 8 — Literary Devices: Personification
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Literary Devices", { w: 1.9, color: C.BURGUNDY });
    addTitle(s, "Personification");

    // Definition card at top
    addCard(s, 0.5, 1.3, 9, 0.7, { fill: C.CREAM_DARK });
    s.addShape("oval", { x: 0.7, y: 1.4, w: 0.45, h: 0.45, fill: { color: C.BURGUNDY } });
    s.addImage({ data: icons.magic, x: 0.77, y: 1.47, w: 0.32, h: 0.32 });
    s.addText("Personification gives human qualities to non-human things", {
      x: 1.3, y: 1.4, w: 7.8, h: 0.45,
      fontSize: 15, fontFace: FONT_B, color: C.CHARCOAL, bold: true, italic: true, margin: 0,
    });

    // Example 1 card
    addCard(s, 0.5, 2.15, 9, 1.3, { strip: C.BURGUNDY });
    s.addText("Example 1", {
      x: 0.8, y: 2.25, w: 2, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.BURGUNDY, bold: true, margin: 0,
    });
    s.addText([
      { text: "\u201CThe snow ", options: { fontSize: 14, color: C.CHARCOAL } },
      { text: "disguised", options: { fontSize: 14, color: C.BURGUNDY, bold: true } },
      { text: " perfectly the ruts and shell holes, ...\u201D", options: { fontSize: 14, color: C.CHARCOAL } },
    ], {
      x: 0.8, y: 2.55, w: 8.4, h: 0.35,
      fontFace: FONT_H, italic: true, margin: 0,
    });
    s.addText("p.85", {
      x: 8.7, y: 2.25, w: 0.6, h: 0.25,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, align: "right", margin: 0,
    });
    s.addText("Snow cannot \u201Cdisguise\u201D \u2014 that is a deliberate human action. Morpurgo makes the landscape feel alive and sinister, as if the war itself is hiding its dangers.", {
      x: 0.8, y: 2.95, w: 8.4, h: 0.4,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });

    // Example 2 card
    addCard(s, 0.5, 3.55, 9, 1.3, { strip: C.BURGUNDY });
    s.addText("Example 2", {
      x: 0.8, y: 3.65, w: 2, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.BURGUNDY, bold: true, margin: 0,
    });
    s.addText([
      { text: "\u201CThere was a ", options: { fontSize: 14, color: C.CHARCOAL } },
      { text: "dancing", options: { fontSize: 14, color: C.BURGUNDY, bold: true } },
      { text: " light in our stable...\u201D", options: { fontSize: 14, color: C.CHARCOAL } },
    ], {
      x: 0.8, y: 3.95, w: 8.4, h: 0.35,
      fontFace: FONT_H, italic: true, margin: 0,
    });
    s.addText("p.86", {
      x: 8.7, y: 3.65, w: 0.6, h: 0.25,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, align: "right", margin: 0,
    });
    s.addText("Light cannot \u201Cdance\u201D \u2014 this is a human action. The dancing light creates a sense of warmth and celebration, contrasting the bleakness of the war outside.", {
      x: 0.8, y: 4.35, w: 8.4, h: 0.4,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Close analysis time \u2014 literary device focus: personification
\u2022 Ask: Who can remind me what personification is? [Cold Call] [Giving human qualities to something non-human]
\u2022 Example 1, p.85: Read from slide: \u201CThe snow disguised perfectly the ruts and shell holes...\u201D
\u2022 Ask: Can snow actually disguise something? [No] \u2014 to disguise is a deliberate human action
\u2022 Morpurgo makes the landscape feel alive and dangerous \u2014 war hiding its hazards (vocab connection!) under a beautiful white surface
\u2022 Example 2, p.86: Read from slide: \u201CThere was a dancing light in our stable...\u201D
\u2022 Ask: Can light dance? [No] \u2014 creates a warm, celebratory feeling; it\u2019s Christmas, Emilie\u2019s recovering, even the light seems to celebrate
\u2022 Key contrast: Example 1 = sinister mood; Example 2 = joyful mood \u2014 opposite effects from the same device

DO:
\u2022 Cold Call for the definition of personification before revealing it on screen
\u2022 Have students find each quote in their own copy of the novel
\u2022 Annotate the key words \u201Cdisguised\u201D and \u201Cdancing\u201D on the board with the human quality they imply
\u2022 Highlight the contrast between the two examples (sinister vs joyful)

TEACHER NOTES:
Personification is not new to Year 6, but analysing it in context and connecting it to authorial purpose is higher-order work. The two examples were chosen deliberately because they create contrasting moods \u2014 this models the kind of analytical pairing students should be doing in their own reading. The connection to \u201Chazardous\u201D (vocabulary word) is an example of spiral integration. The DECIDE framework positions literary device analysis as a bridge between reading comprehension and writing craft \u2014 students identify devices in professional texts so they can deploy them in their own narratives.

WATCH FOR:
\u2022 Students who confuse personification with metaphor \u2014 clarify: personification is a specific type of metaphor that gives human qualities to non-human things
\u2022 If students struggle to articulate why the author uses personification, model the thinking aloud: \u201CIf I say \u2018the snow covered the holes,\u2019 that\u2019s just description. But \u2018disguised\u2019 implies intent.\u201D

[General: Literary Devices | VTLM 2.0: Explicit Teaching]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 9 — Vocabulary Focus
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Vocabulary Focus", { w: 2.0, color: C.GOLD });
    addTitle(s, "Vocabulary Focus");

    // Card 1 — hazardous
    addCard(s, 0.5, 1.3, 4.25, 2.6, { strip: C.OLIVE });
    s.addText("hazardous", {
      x: 0.85, y: 1.42, w: 3.5, h: 0.4,
      fontSize: 22, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addText("/\u02C8haz.\u0259.d\u0259s/  adjective", {
      x: 0.85, y: 1.82, w: 3.5, h: 0.25,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    s.addText("Dangerous; involving risk or peril", {
      x: 0.85, y: 2.15, w: 3.6, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
    });
    s.addText("\u201CThe hazardous conditions made every journey across no-man\u2019s land a gamble with death.\u201D", {
      x: 0.85, y: 2.55, w: 3.6, h: 0.55,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
    });
    s.addText("Synonyms: dangerous, perilous, risky", {
      x: 0.85, y: 3.2, w: 3.6, h: 0.25,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
    s.addText("Antonyms: safe, harmless, secure", {
      x: 0.85, y: 3.5, w: 3.6, h: 0.25,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });

    // Card 2 — lavish
    addCard(s, 5.25, 1.3, 4.25, 2.6, { strip: C.GOLD });
    s.addText("lavish", {
      x: 5.6, y: 1.42, w: 3.5, h: 0.4,
      fontSize: 22, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });
    s.addText("/\u02C8lav.\u026A\u0283/  verb & adjective", {
      x: 5.6, y: 1.82, w: 3.5, h: 0.25,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });
    s.addText("To give generously; or sumptuously rich", {
      x: 5.6, y: 2.15, w: 3.6, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
    });
    s.addText("\u201CEmilie lavished love and attention on Joey, brushing his coat until it gleamed.\u201D", {
      x: 5.6, y: 2.55, w: 3.6, h: 0.55,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
    });
    s.addText("Synonyms: generous, extravagant, abundant", {
      x: 5.6, y: 3.2, w: 3.6, h: 0.25,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });
    s.addText("Antonyms: meagre, stingy, sparse", {
      x: 5.6, y: 3.5, w: 3.6, h: 0.25,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
    });

    // Incidental vocab bar
    addCard(s, 0.5, 4.15, 9, 0.95, { fill: C.CREAM_DARK });
    s.addText("Incidental Vocabulary from Chapter 10", {
      x: 0.8, y: 4.22, w: 5, h: 0.3,
      fontSize: 11, fontFace: FONT_B, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addText("hazardous   \u00B7   adulation   \u00B7   prattle   \u00B7   precludes   \u00B7   lavished   \u00B7   disguised   \u00B7   straining   \u00B7   extricate   \u00B7   momentum", {
      x: 0.8, y: 4.55, w: 8.4, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Deeper dive into the two vocabulary words
\u2022 Hazardous \u2014 choral pronunciation again: haz-ard-ous
\u2022 Frayer Model thinking: characteristics (involves danger, could cause harm, creates worry), examples (hazardous waste, hazardous weather, hazardous materials sign), non-examples (a safe playground, a calm lake)
\u2022 Lavish \u2014 dual word class: verb and adjective
\u2022 As a verb: \u201CEmilie lavished care on the horses\u201D \u2014 gave generously, abundantly
\u2022 As an adjective: \u201Ca lavish feast\u201D \u2014 extravagant, over-the-top generous
\u2022 Ask: Can someone give me a sentence using lavish as a verb? [Cold Call] Now as an adjective? [Cold Call]
\u2022 Incidental vocabulary at the bottom \u2014 not explicitly taught today; use context clues strategy from Week 1 if you encounter an unknown word

DO:
\u2022 Use Frayer Model thinking for each word (definition, characteristics, examples, non-examples)
\u2022 Cold Call for student-generated sentences with each word
\u2022 Add both words to the class word wall with page references
\u2022 Briefly point out the incidental vocabulary list \u2014 students can record these in their vocab books

TEACHER NOTES:
The Frayer Model approach (definition, characteristics, examples, non-examples) is an evidence-based vocabulary instruction strategy aligned with the DECIDE framework\u2019s emphasis on explicit teaching. Lavish is particularly rich for instruction because its dual word class (verb/adjective) extends students\u2019 morphological awareness. The incidental vocabulary list gives students agency to explore words independently using context clue strategies taught in earlier lessons. This connects to the spiral approach \u2014 previously taught strategies are applied to new contexts.

WATCH FOR:
\u2022 Students who confuse \u201Chazardous\u201D with \u201Chazard\u201D (noun vs adjective) \u2014 clarify: \u201CA hazard is a thing; hazardous describes something\u201D
\u2022 If students generate incorrect example sentences, recast them publicly so the class hears the correct model

[General: Explicit Vocabulary | VTLM 2.0: Explicit Teaching]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 10 — I Do: Subordinating Conjunctions
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "I Do", { w: 1.2, color: C.GOLD });
    addTitle(s, "Subordinating Conjunctions");

    // Terminology Review card
    addCard(s, 0.5, 1.3, 4.25, 2.3, { strip: C.OLIVE });
    s.addText("Terminology Review", {
      x: 0.8, y: 1.4, w: 3.5, h: 0.35,
      fontSize: 14, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });

    const terms = [
      { term: "Dependent clause", def: "A group of words with a subject and verb that cannot stand alone as a sentence. It depends on the independent clause." },
      { term: "Independent clause", def: "A group of words with a subject and verb that can stand alone as a complete sentence." },
      { term: "Subordinating conjunction", def: "A word that connects a dependent clause to an independent clause (e.g., although, since, while, because, when, before, after)." },
    ];
    terms.forEach((t, i) => {
      const ty = 1.85 + i * 0.55;
      s.addText(t.term, {
        x: 0.8, y: ty, w: 3.7, h: 0.22,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
      });
      s.addText(t.def, {
        x: 0.8, y: ty + 0.2, w: 3.7, h: 0.32,
        fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0,
      });
    });

    // Teacher Model card
    addCard(s, 5.25, 1.3, 4.25, 2.3, { strip: C.GOLD });
    s.addText("Teacher Model", {
      x: 5.55, y: 1.4, w: 3.5, h: 0.35,
      fontSize: 14, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });

    // The worked example with visual distinction
    s.addText([
      { text: "Although", options: { fontSize: 13, color: C.GOLD, bold: true } },
      { text: " Joey and Topthorn are far from their homes,", options: { fontSize: 13, color: C.GOLD } },
    ], {
      x: 5.55, y: 1.9, w: 3.8, h: 0.45,
      fontFace: FONT_B, margin: 0,
    });
    s.addText("Dependent clause", {
      x: 5.55, y: 2.35, w: 2, h: 0.2,
      fontSize: 9, fontFace: FONT_B, color: C.GOLD, italic: true, margin: 0,
    });

    s.addText("they are treated well and are reasonably happy.", {
      x: 5.55, y: 2.65, w: 3.8, h: 0.35,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addText("Independent clause", {
      x: 5.55, y: 3.0, w: 2, h: 0.2,
      fontSize: 9, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
    });

    // Visual breakdown card at bottom
    addCard(s, 0.5, 3.75, 9, 1.25, { fill: C.WARM });
    s.addShape("oval", { x: 0.7, y: 3.85, w: 0.45, h: 0.45, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.teacher, x: 0.77, y: 3.92, w: 0.32, h: 0.32 });
    s.addText("How to build a complex sentence", {
      x: 1.3, y: 3.87, w: 5, h: 0.35,
      fontSize: 14, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });

    const steps = [
      { num: "1", text: "Start with a subordinating conjunction (Although, Since, While, When, Because...)" },
      { num: "2", text: "Write a dependent clause \u2014 it won\u2019t make sense on its own" },
      { num: "3", text: "Add a comma after the dependent clause" },
      { num: "4", text: "Complete with an independent clause \u2014 it must make sense on its own" },
    ];
    steps.forEach((st, i) => {
      const sx = 0.8 + (i % 2) * 4.5;
      const sy = 4.3 + Math.floor(i / 2) * 0.3;
      s.addText(st.num + ".", {
        x: sx, y: sy, w: 0.3, h: 0.26,
        fontSize: 10, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
      });
      s.addText(st.text, {
        x: sx + 0.3, y: sy, w: 4.0, h: 0.26,
        fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Shifting to grammar focus: subordinating conjunctions and complex sentences
\u2022 Revise terminology first \u2014 Ask: What is a dependent clause? [Cold Call] [Has subject + verb but can\u2019t stand alone]
\u2022 Ask: What is an independent clause? [Cold Call] [Can stand alone as a complete sentence]
\u2022 Subordinating conjunction = the glue word connecting dependent to independent clause (although, since, while, when, because, before, after, even though, unless)
\u2022 Model step by step on the whiteboard, writing as you go:
\u2022 Start with subordinating conjunction: \u201CAlthough\u201D
\u2022 Write the dependent clause: \u201CAlthough Joey and Topthorn are far from their homes\u201D
\u2022 Ask: Can that stand alone? [No \u2014 it leaves you hanging]
\u2022 Add a comma, then complete with independent clause: \u201Cthey are treated well and are reasonably happy.\u201D
\u2022 Ask: Can the second part stand alone? [Yes] \u2014 that\u2019s what makes it a complex sentence
\u2022 The dependent clause sets up a contrast; the independent clause resolves it

DO:
\u2022 Write the example sentence on the whiteboard step by step as you explain
\u2022 Use a different colour marker for the dependent clause and independent clause
\u2022 Underline the subordinating conjunction \u201CAlthough\u201D
\u2022 Circle the comma to emphasise its role as a separator
\u2022 Cold Call for definitions of key terms before revealing them on screen

TEACHER NOTES:
The I Do phase follows Gradual Release of Responsibility. The teacher thinks aloud through every step, making invisible cognitive processes visible. The worked example connects directly to the chapter students just read, reinforcing the integration of reading and writing. Colour-coding the clauses on the whiteboard provides a visual scaffold that students will replicate in the You Do phase (underlining the conjunction, circling the comma). The terminology review is necessary because these terms were introduced in Week 2 but may not be automatic yet. This aligns with VTLM 2.0 explicit teaching: the teacher names the skill, models it, and explains the thinking behind each step.

WATCH FOR:
\u2022 Students who think \u201CAlthough Joey and Topthorn are far from their homes\u201D IS a complete sentence \u2014 test it: \u201CRead it aloud. Does it feel finished?\u201D
\u2022 Students who forget the comma between clauses \u2014 emphasise it now so it\u2019s not a widespread error in the You Do

[General: I Do \u2014 Modelling | VTLM 2.0: Explicit Teaching]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 11 — We Do: Guided Practice
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.WARM };
    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.SAGE } });

    addBadge(s, "We Do", { w: 1.2, color: C.SAGE });
    addTitle(s, "Guided Practice \u2014 Complete the Sentence", { color: C.OLIVE });

    // Prompt 1
    addCard(s, 0.5, 1.3, 9, 1.55, { strip: C.SAGE });
    s.addShape("oval", { x: 0.75, y: 1.42, w: 0.4, h: 0.4, fill: { color: C.SAGE } });
    s.addText("1", {
      x: 0.75, y: 1.42, w: 0.4, h: 0.4,
      fontSize: 14, fontFace: FONT_B, color: C.WHITE, align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText("Complete the sentence:", {
      x: 1.3, y: 1.42, w: 3, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.SAGE, bold: true, margin: 0,
    });
    s.addText("Since being captured by the Germans, ...", {
      x: 0.85, y: 1.88, w: 8.3, h: 0.35,
      fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL, bold: true, italic: true, margin: 0,
    });

    // Example answer 1 (subtle)
    s.addShape("roundRect", {
      x: 0.85, y: 2.3, w: 8.3, h: 0.42, rectRadius: 0.06,
      fill: { color: C.CREAM_DARK },
    });
    s.addText("Example: Since being captured by the Germans, Trooper Warren and Captain Stewart are nowhere to be seen.", {
      x: 1.0, y: 2.32, w: 8.0, h: 0.38,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    // Prompt 2
    addCard(s, 0.5, 3.0, 9, 1.45, { strip: C.SAGE });
    s.addShape("oval", { x: 0.75, y: 3.1, w: 0.4, h: 0.4, fill: { color: C.SAGE } });
    s.addText("2", {
      x: 0.75, y: 3.1, w: 0.4, h: 0.4,
      fontSize: 14, fontFace: FONT_B, color: C.WHITE, align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText("Complete the sentence:", {
      x: 1.3, y: 3.1, w: 3, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.SAGE, bold: true, margin: 0,
    });
    s.addText("While the war continues to unfold, ...", {
      x: 0.85, y: 3.52, w: 8.3, h: 0.35,
      fontSize: 16, fontFace: FONT_H, color: C.CHARCOAL, bold: true, italic: true, margin: 0,
    });

    // Example answer 2 (subtle)
    s.addShape("roundRect", {
      x: 0.85, y: 3.92, w: 8.3, h: 0.42, rectRadius: 0.06,
      fill: { color: C.CREAM_DARK },
    });
    s.addText("Example: While the war continues to unfold, the loss of life grows on both sides.", {
      x: 1.0, y: 3.94, w: 8.0, h: 0.38,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    // Tip bar
    s.addShape("roundRect", {
      x: 0.5, y: 4.55, w: 9, h: 0.40, rectRadius: 0.06,
      fill: { color: C.SAGE, transparency: 15 },
    });
    s.addImage({ data: icons.bulbGold, x: 0.65, y: 4.61, w: 0.28, h: 0.28 });
    s.addText("Remember: the independent clause must make sense on its own!", {
      x: 1.05, y: 4.57, w: 8, h: 0.36,
      fontSize: 12, fontFace: FONT_B, color: C.OLIVE, bold: true, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Our turn to practise together \u2014 whiteboards ready
\u2022 Read from slide: \u201CSince being captured by the Germans, ...\u201D
\u2022 Ask: What\u2019s the subordinating conjunction? [Since]
\u2022 Ask: Is this a complete thought? [No \u2014 it leaves us hanging]
\u2022 Task: add an independent clause to finish the sentence \u2014 30 seconds on whiteboards
\u2022 Boards up \u2014 scan responses, read 2\u20133 aloud
\u2022 Reveal example: \u201CSince being captured by the Germans, Trooper Warren and Captain Stewart are nowhere to be seen.\u201D
\u2022 Check: does the independent clause make sense on its own? [Yes]
\u2022 Read from slide: \u201CWhile the war continues to unfold, ...\u201D \u2014 same process, 30 seconds
\u2022 Boards up \u2014 scan and discuss
\u2022 Reveal example: \u201CWhile the war continues to unfold, the loss of life grows on both sides.\u201D
\u2022 Key point: the dependent clause sets up context; the independent clause delivers key information \u2014 that\u2019s the power of a complex sentence

DO:
\u2022 Distribute mini whiteboards if not already out
\u2022 Give exactly 30 seconds for each prompt \u2014 use a visible timer
\u2022 Have students hold boards up simultaneously (\u201C3, 2, 1, boards up!\u201D)
\u2022 Scan quickly for common errors before discussing
\u2022 Cold Call 2\u20133 students to read their sentences aloud
\u2022 Only reveal the example answer after students have shared their own

TEACHER NOTES:
The We Do phase provides scaffolded practice with immediate feedback. Whiteboards are essential because they make all student thinking visible simultaneously \u2014 the teacher can scan for patterns of understanding or confusion in seconds. The two prompts use different subordinating conjunctions (Since, While) to demonstrate variety. The example answers use chapter content, reinforcing the reading-writing connection. Revealing example answers only after student sharing prevents students from simply copying. This aligns with the VTLM 2.0 principle of guided practice: the teacher is still present and providing feedback, but responsibility is shifting to the student.

WATCH FOR:
\u2022 Students who write a fragment instead of an independent clause (e.g., \u201CSince being captured by the Germans, fighting in the war\u201D) \u2014 test it: \u201CRead just your second part. Is it a sentence?\u201D
\u2022 Students who forget the comma \u2014 quick correction: \u201CDon\u2019t forget the comma! It separates the two clauses.\u201D
\u2022 If more than 30% get it wrong, do a third example together before releasing to independence

[General: We Do \u2014 Guided Practice | VTLM 2.0: Guided Practice]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 12 — You Do: Independent Practice
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.WARM };
    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.BURGUNDY } });

    addBadge(s, "You Do", { w: 1.2, color: C.BURGUNDY });
    addTitle(s, "Your Turn \u2014 Writing Books", { color: C.OLIVE });

    // First
    addCard(s, 0.5, 1.3, 9, 0.95, { strip: C.OLIVE });
    s.addShape("oval", { x: 0.75, y: 1.42, w: 0.42, h: 0.42, fill: { color: C.OLIVE } });
    s.addText("First", {
      x: 0.75, y: 1.42, w: 0.42, h: 0.42,
      fontSize: 9, fontFace: FONT_B, color: C.WHITE, align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText("Open your writing book to a new page.", {
      x: 1.35, y: 1.4, w: 7.8, h: 0.3,
      fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
    });
    s.addText("Write the heading: Subordinating Conjunctions \u2014 Chapter 10", {
      x: 1.35, y: 1.72, w: 7.8, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    // Next
    addCard(s, 0.5, 2.5, 9, 1.35, { strip: C.GOLD });
    s.addShape("oval", { x: 0.75, y: 2.62, w: 0.42, h: 0.42, fill: { color: C.GOLD } });
    s.addText("Next", {
      x: 0.75, y: 2.62, w: 0.42, h: 0.42,
      fontSize: 9, fontFace: FONT_B, color: C.WHITE, align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText("Write three complex sentences about Chapter 10.", {
      x: 1.35, y: 2.6, w: 7.8, h: 0.3,
      fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
    });
    s.addText("Each sentence must begin with a dependent clause using a subordinating conjunction.", {
      x: 1.35, y: 2.92, w: 7.8, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    // Conjunction word bank
    s.addShape("roundRect", {
      x: 1.35, y: 3.3, w: 7.8, h: 0.4, rectRadius: 0.06,
      fill: { color: C.CREAM_DARK },
    });
    s.addText("Although   |   Since   |   While   |   When   |   Because   |   Before   |   After   |   Even though   |   Unless", {
      x: 1.5, y: 3.32, w: 7.5, h: 0.36,
      fontSize: 11, fontFace: FONT_B, color: C.OLIVE, align: "center", margin: 0,
    });

    // Then
    addCard(s, 0.5, 3.95, 9, 0.95, { strip: C.BURGUNDY });
    s.addShape("oval", { x: 0.75, y: 4.07, w: 0.42, h: 0.42, fill: { color: C.BURGUNDY } });
    s.addText("Then", {
      x: 0.75, y: 4.07, w: 0.42, h: 0.42,
      fontSize: 9, fontFace: FONT_B, color: C.WHITE, align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText([
      { text: "Underline", options: { bold: true, fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: " the subordinating conjunction and ", options: { fontSize: 13, color: C.CHARCOAL, breakLine: false } },
      { text: "circle", options: { bold: true, fontSize: 13, color: C.CHARCOAL } },
      { text: " the comma that separates the dependent clause from the independent clause.", options: { fontSize: 13, color: C.CHARCOAL } },
    ], {
      x: 1.35, y: 4.02, w: 7.8, h: 0.42,
      fontFace: FONT_B, margin: 0,
    });
    s.addText("Share your best sentence with your partner.", {
      x: 1.35, y: 4.48, w: 7.8, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Independent practice time \u2014 this goes in writing books, not whiteboards
\u2022 Read from slide: the three steps \u2014 First, Next, Then
\u2022 Step 1: New page, heading: \u201CSubordinating Conjunctions \u2014 Chapter 10\u201D
\u2022 Step 2: Write three complex sentences about Chapter 10, each beginning with a dependent clause using a subordinating conjunction
\u2022 Word bank on screen: although, since, while, when, because, before, after, even though, unless
\u2022 Use at least three different conjunctions \u2014 don\u2019t write all three starting with \u201CAlthough\u201D
\u2022 Step 3: Go back and underline the subordinating conjunction; circle the comma
\u2022 When finished, share your best sentence with your partner \u2014 partner checks: does the dependent clause need the independent clause? Is there a comma? Is the independent clause a complete sentence?
\u2022 8 minutes for this task

DO:
\u2022 Set an 8-minute timer visible to the class
\u2022 Circulate and conference with at least 4\u20135 students during independent work
\u2022 Prioritise conferencing with students who struggled during the We Do phase
\u2022 If a student finishes early, challenge them to write a fourth sentence using \u201Cunless\u201D or \u201Ceven though\u201D
\u2022 At the 6-minute mark, remind students to start their underlining and circling

TEACHER NOTES:
The You Do phase is where students demonstrate their understanding independently. Writing in their writing books (rather than on disposable whiteboards) signals that this is real, valued work. The First/Next/Then structure provides clear, sequential instructions that reduce cognitive load. The word bank prevents students from being stuck on the first step. The underlining and circling requirement is a metacognitive scaffold \u2014 it forces students to identify the structural components they\u2019ve just learned about. Partner sharing provides peer feedback before teacher assessment. During conferencing, use the \u201Ctest\u201D approach from the I Do: \u201CRead just the first part. Is it a complete sentence? No? Good \u2014 that\u2019s your dependent clause.\u201D

WATCH FOR:
\u2022 Students who write simple sentences starting with a conjunction word but without a true dependent clause (e.g., \u201CAlthough it was cold. Joey was happy.\u201D \u2014 two sentences, not complex) \u2014 redirect: \u201CThese need to be joined with a comma into one sentence\u201D
\u2022 Students who use \u201Cand\u201D or \u201Cbut\u201D instead of subordinating conjunctions (those are coordinating) \u2014 redirect to the word bank
\u2022 If more than 3\u20134 students are stuck after 2 minutes, pause and do a quick whole-class check-in

[General: You Do \u2014 Independent Practice | VTLM 2.0: Independent Practice]`);
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 13 — Closing / Reflection (helper)
  // ═══════════════════════════════════════════════════════════════════════════
  closingSlide(
    pres,
    "Think about Emilie\u2019s character in Chapter 10. How does the author use her to give us hope in the middle of a war story? What subordinating conjunction could you use to describe her impact on Joey?",
    [
      "Personification makes descriptions vivid and memorable",
      "Subordinating conjunctions create complex sentences with depth",
      "Authors use characters like Emilie to shift tone and create empathy",
    ],
    `SAY:
\u2022 Closing reflection \u2014 integrates both strands of today\u2019s lesson
\u2022 Ask: How does Morpurgo use Emilie\u2019s character to give us hope in the middle of a war story?
\u2022 Challenge: answer using a complex sentence with a subordinating conjunction (e.g., \u201CBecause Emilie shows kindness to the horses, ...\u201D or \u201CAlthough the war is raging around them, ...\u201D)
\u2022 15 seconds think time, then 45 seconds Turn and Talk
\u2022 Cold Call 3\u20134 students for their complex sentence responses
\u2022 Key insight: the subordinating conjunction lets you show the contrast between war and kindness \u2014 that\u2019s the power of a complex sentence, holding two ideas in tension
\u2022 Read from slide: the three key takeaways
\u2022 Takeaway 1: Personification makes descriptions vivid and memorable (snow disguising danger, dancing light)
\u2022 Takeaway 2: Subordinating conjunctions create complex sentences with depth (practised in writing books)
\u2022 Takeaway 3: Authors use characters like Emilie to shift tone and create empathy (Morpurgo\u2019s craft)
\u2022 Preview: Tomorrow we move into Chapter 11

DO:
\u2022 Give 15 seconds of silent think time
\u2022 Allow 45 seconds of partner talk
\u2022 Cold Call 3\u20134 students for their complex sentence responses
\u2022 Read the three takeaways aloud and have students echo each one
\u2022 Collect writing books for formative assessment of subordinating conjunction sentences

TEACHER NOTES:
The closing reflection deliberately integrates both strands of the lesson: character analysis (Emilie as a vehicle for hope) and grammar (using a subordinating conjunction to frame the response). This is a higher-order synthesis task that serves as a formative assessment of both learning areas. Cold calling 3\u20134 students provides a snapshot of class understanding. Collecting writing books allows the teacher to assess the You Do sentences more carefully and plan targeted feedback or re-teaching for the next lesson. The three takeaways mirror the three success criteria from the beginning of the lesson, creating a satisfying bookend structure. The preview of Chapter 11 maintains narrative momentum for the next day.

WATCH FOR:
\u2022 Students who give a simple sentence when asked for a complex one \u2014 this indicates the skill isn\u2019t automatic yet; plan for more guided practice tomorrow
\u2022 If the reflection runs long, prioritise partner talk over whole-class sharing to ensure all students process the question

[General: Reflection & Close | VTLM 2.0: Review & Consolidate]`
  );


  // ═══════════════════════════════════════════════════════════════════════════
  // WRITE FILE
  // ═══════════════════════════════════════════════════════════════════════════
  await pres.writeFile({ fileName: "output/WH_Lesson12.pptx" });
  console.log("Saved: output/WH_Lesson12.pptx");
}

build().catch(err => { console.error(err); process.exit(1); });
