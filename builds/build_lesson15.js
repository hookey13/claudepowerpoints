// War Horse Unit — Lesson 15: Warrior the War Horse & Writing Your Conclusion
// Final lesson of Week 3 / Narrative Writing arc — students complete their narrative

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const {
  C, FONT_H, FONT_B, makeShadow, makeCardShadow,
  iconToBase64Png,
  addTopBar, addBadge, addTitle, addCard, addFooter,
  titleSlide, liSlide, pausePointSlide, closingSlide,
} = require("../themes/wh_helpers");
const {
  FaBookOpen, FaPen, FaChalkboardTeacher, FaUsers, FaSearch, FaEdit,
  FaPencilAlt, FaHorse, FaCheckCircle, FaStar, FaFlag, FaFeatherAlt,
  FaQuoteLeft, FaListOl, FaLightbulb, FaClipboardCheck, FaHeart,
} = require("react-icons/fa");

const FOOTER = "Week 3  |  War Horse  |  Lesson 15";

async function build() {
  if (!fs.existsSync("output")) fs.mkdirSync("output");

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Claude";
  pres.title = "War Horse - Lesson 15 - Warrior the War Horse & Writing Your Conclusion";

  // Pre-render icons
  const icons = {
    book:       await iconToBase64Png(FaBookOpen,          "#" + C.WHITE),
    bookOlive:  await iconToBase64Png(FaBookOpen,          "#" + C.OLIVE),
    pen:        await iconToBase64Png(FaPen,               "#" + C.WHITE),
    penGold:    await iconToBase64Png(FaPen,               "#" + C.GOLD),
    teacher:    await iconToBase64Png(FaChalkboardTeacher,  "#" + C.WHITE),
    teacherO:   await iconToBase64Png(FaChalkboardTeacher,  "#" + C.OLIVE),
    users:      await iconToBase64Png(FaUsers,             "#" + C.WHITE),
    usersOlive: await iconToBase64Png(FaUsers,             "#" + C.OLIVE),
    search:     await iconToBase64Png(FaSearch,            "#" + C.WHITE),
    searchO:    await iconToBase64Png(FaSearch,            "#" + C.OLIVE),
    edit:       await iconToBase64Png(FaEdit,              "#" + C.WHITE),
    pencil:     await iconToBase64Png(FaPencilAlt,         "#" + C.WHITE),
    pencilBurg: await iconToBase64Png(FaPencilAlt,         "#" + C.BURGUNDY),
    horse:      await iconToBase64Png(FaHorse,             "#" + C.GOLD),
    horseW:     await iconToBase64Png(FaHorse,             "#" + C.WHITE),
    check:      await iconToBase64Png(FaCheckCircle,       "#" + C.SAGE),
    checkW:     await iconToBase64Png(FaCheckCircle,       "#" + C.WHITE),
    checkGold:  await iconToBase64Png(FaCheckCircle,       "#" + C.GOLD),
    star:       await iconToBase64Png(FaStar,              "#" + C.GOLD),
    starW:      await iconToBase64Png(FaStar,              "#" + C.WHITE),
    flag:       await iconToBase64Png(FaFlag,              "#" + C.WHITE),
    flagGold:   await iconToBase64Png(FaFlag,              "#" + C.GOLD),
    feather:    await iconToBase64Png(FaFeatherAlt,        "#" + C.WHITE),
    featherO:   await iconToBase64Png(FaFeatherAlt,        "#" + C.OLIVE),
    quote:      await iconToBase64Png(FaQuoteLeft,         "#" + C.GOLD),
    list:       await iconToBase64Png(FaListOl,            "#" + C.WHITE),
    listO:      await iconToBase64Png(FaListOl,            "#" + C.OLIVE),
    bulb:       await iconToBase64Png(FaLightbulb,         "#" + C.GOLD),
    bulbW:      await iconToBase64Png(FaLightbulb,         "#" + C.WHITE),
    clipboard:  await iconToBase64Png(FaClipboardCheck,    "#" + C.WHITE),
    clipboardO: await iconToBase64Png(FaClipboardCheck,    "#" + C.OLIVE),
    heart:      await iconToBase64Png(FaHeart,             "#" + C.BURGUNDY),
    heartW:     await iconToBase64Png(FaHeart,             "#" + C.WHITE),
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ═══════════════════════════════════════════════════════════════════════════
  titleSlide(
    pres,
    "War Horse",
    "Warrior the War Horse & Writing Your Conclusion",
    "Lesson 15  |  Week 3  |  Year 6 Narrative Writing",
    `SAY:
\u2022 Final lesson \u2014 today you finish your complete narrative
\u2022 Three weeks of building: introduction, action, complication, resolution \u2014 today you write the conclusion
\u2022 Two parts: reading the Warrior the War Horse comic, then writing your conclusion paragraph
\u2022 By the end of today, you\u2019ll have a complete story from start to finish
\u2022 Warrior\u2019s story will inspire you as you think about how YOUR story ends

DO:
- Build excitement \u2014 this is a milestone lesson
- Have writing books and the Warrior comic ready
- Display the title slide as students settle

TEACHER NOTES:
This is Lesson 15, the final lesson of Week 3 and the culmination of the narrative writing arc. Students have built their narrative incrementally over three weeks. The emotional stakes are high \u2014 they are completing something significant. Frame this as an achievement from the outset. The Warrior text provides a model of a war horse story that has an ending, directly connecting to students writing their own conclusion. VTLM 2.0: Engagement through meaningful, purposeful writing.

WATCH FOR:
- Students who are anxious about finishing \u2014 reassure them that the conclusion is short and they have the skills
- Students who haven\u2019t completed their resolution from yesterday \u2014 they will need extra support

[General: Introduction | VTLM 2.0: Engagement]`
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — Learning Intentions & Success Criteria
  // ═══════════════════════════════════════════════════════════════════════════
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
      "I can take notes from a supplementary text about a famous war horse",
      "I can explain the purpose and features of a conclusion paragraph",
      "I can plan and write a conclusion paragraph for my narrative, completing my story",
      "I can use mental verbs and adjectives to show how my character feels at the end",
    ],
    `SAY:
\u2022 Quite a few learning intentions today because this is the lesson where everything comes together
\u2022 Selecting and reading a supplementary text \u2014 the Warrior comic
\u2022 Using text structure knowledge \u2014 understanding where the conclusion fits and what it does
\u2022 Making creative choices about character and setting \u2014 your conclusion must reflect everything that\u2019s happened
\u2022 Re-reading, proofreading, and editing \u2014 especially important today because you\u2019ll have a complete narrative to review
\u2022 Read from slide: success criteria \u2014 emphasise \u201Ccompleting my story\u201D
\u2022 Ask: How many paragraphs will your finished narrative have? [Five \u2014 orientation, action, complication, resolution, conclusion]

DO:
- Read through each LI briefly \u2014 don\u2019t linger, students know the routine by Week 3
- Emphasise the fourth success criterion: completing the story
- Point to the word \u2018completing\u2019 \u2014 this is the milestone

TEACHER NOTES:
The learning intentions span reading (supplementary text), text structure knowledge (conclusion paragraph), creative writing, and editing. This reflects the comprehensive nature of this culminating lesson. Students should feel the weight of \u201Ccompleting my story\u201D \u2014 this is the payoff for three weeks of sustained effort. The success criteria are achievable and concrete. VTLM 2.0: Clear learning intentions with visible success criteria.

WATCH FOR:
- Students who seem overwhelmed by the number of LIs \u2014 reassure them that many are familiar from previous lessons
- Students who haven\u2019t kept up \u2014 they can still write a conclusion even if earlier paragraphs need work

[General: Learning Intentions | VTLM 2.0: Clear Learning Intentions]`
    ,
    FOOTER
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — Vocabulary Review (Daily Review)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Daily Review", { w: 1.6, color: C.OLIVE });
    addTitle(s, "Vocabulary Review", { y: 0.65 });

    // Left card — Weekly review words
    addCard(s, 0.5, 1.3, 4.3, 3.1, { strip: C.OLIVE });
    s.addShape("oval", { x: 0.75, y: 1.45, w: 0.5, h: 0.5, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.bookOlive, x: 0.83, y: 1.53, w: 0.34, h: 0.34 });
    // overlay white icon
    s.addImage({ data: icons.book, x: 0.83, y: 1.53, w: 0.34, h: 0.34 });
    s.addText("Week 3 Words", {
      x: 1.4, y: 1.48, w: 3, h: 0.4,
      fontSize: 16, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addText("Quick whiteboard check", {
      x: 1.4, y: 1.88, w: 3, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    const weekWords = ["hazardous", "lavish", "content (adj.)", "adapt"];
    weekWords.forEach((w, i) => {
      const wy = 2.35 + i * 0.45;
      s.addShape("roundRect", {
        x: 0.8, y: wy, w: 3.7, h: 0.38, rectRadius: 0.06,
        fill: { color: i % 2 === 0 ? C.WARM : C.WHITE },
      });
      s.addText(w, {
        x: 1.0, y: wy, w: 3.3, h: 0.38,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
        valign: "middle", margin: 0,
      });
    });

    // Right card — Today's incidental vocab
    addCard(s, 5.2, 1.3, 4.3, 3.1, { strip: C.GOLD });
    s.addShape("oval", { x: 5.45, y: 1.45, w: 0.5, h: 0.5, fill: { color: C.GOLD } });
    s.addImage({ data: icons.starW, x: 5.53, y: 1.53, w: 0.34, h: 0.34 });
    s.addText("Today\u2019s Incidental Vocab", {
      x: 6.1, y: 1.48, w: 3.2, h: 0.4,
      fontSize: 16, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });
    s.addText("From the Warrior comic", {
      x: 6.1, y: 1.88, w: 3, h: 0.28,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    const incidentalWords = ["flinching", "steadfastly", "retired", "bravery"];
    incidentalWords.forEach((w, i) => {
      const wy = 2.35 + i * 0.45;
      s.addShape("roundRect", {
        x: 5.5, y: wy, w: 3.7, h: 0.38, rectRadius: 0.06,
        fill: { color: i % 2 === 0 ? C.WARM : C.WHITE },
      });
      s.addText(w, {
        x: 5.7, y: wy, w: 3.3, h: 0.38,
        fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, bold: true,
        valign: "middle", margin: 0,
      });
    });

    // Connection note at bottom — y+h = 4.55+0.5 = 5.05 (within SAFE_BOTTOM)
    s.addShape("roundRect", {
      x: 0.5, y: 4.55, w: 9, h: 0.5, rectRadius: 0.08,
      fill: { color: C.CREAM_DARK },
    });
    s.addImage({ data: icons.bulb, x: 0.7, y: 4.63, w: 0.28, h: 0.28 });
    s.addText("Today\u2019s incidental words will come up in the Warrior the War Horse comic. Listen for them as you read.", {
      x: 1.1, y: 4.58, w: 8.1, h: 0.44,
      fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Last daily vocab review for Week 3 \u2014 whiteboards up
\u2022 Hazardous: Ask: What does it mean? [Dangerous, risky] Ask: If battlefield conditions were hazardous, what does that tell us?
\u2022 Lavish: [Luxurious, extravagant, very generous]
\u2022 Content (adjective, not noun): [Happy, satisfied, at peace]
\u2022 Adapt: [To change or adjust to new conditions]
\u2022 Today\u2019s comic also has great vocab: flinching [pulling back, wincing], steadfastly [with determination, without wavering], retired, bravery
\u2022 Just introduce incidental words verbally \u2014 don\u2019t test

DO:
- Whiteboards for weekly words \u2014 quick spelling check
- For incidental words, just introduce them verbally \u2014 don\u2019t test
- Keep this to 3-4 minutes maximum

TEACHER NOTES:
This is the final daily review for Week 3. The four weekly words (hazardous, lavish, content, adapt) should be well embedded by now. The incidental vocabulary connects directly to the Warrior comic and primes students for the reading. \u2018Content\u2019 as an adjective is particularly relevant \u2014 students may use it in their conclusion paragraphs to describe how their character feels. VTLM 2.0: Vocabulary development through contextual exposure.

WATCH FOR:
- Students still misspelling \u2018hazardous\u2019 \u2014 reinforce the -ous suffix
- Confusion between \u2018content\u2019 (noun) and \u2018content\u2019 (adjective) \u2014 stress the different pronunciation
- Students who can define but not USE the words \u2014 prompt: \u201CUse content in a sentence about your character\u201D

[General: Vocabulary Review | VTLM 2.0: Vocabulary Development]`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — Supplementary Text Introduction
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Supplementary Text", { w: 2.1, color: C.SAGE });
    addTitle(s, "Were there any famous horses used during the war?", { y: 0.65, fontSize: 22 });

    // Main info card
    addCard(s, 0.5, 1.3, 6.2, 2.6, { strip: C.SAGE });
    s.addShape("oval", { x: 0.8, y: 1.5, w: 0.55, h: 0.55, fill: { color: C.SAGE } });
    s.addImage({ data: icons.horseW, x: 0.88, y: 1.58, w: 0.38, h: 0.38 });
    s.addText("Animal Heroes \u2014 Warrior, the War Horse Comic", {
      x: 1.5, y: 1.48, w: 4.8, h: 0.55,
      fontSize: 17, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addText("A history comic about one of the most well-known horses used during World War I. Warrior served on the Western Front and became a symbol of courage and survival.", {
      x: 0.8, y: 2.15, w: 5.6, h: 0.7,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    // Reading mode badge
    s.addShape("roundRect", {
      x: 0.8, y: 3.0, w: 2.3, h: 0.36, rectRadius: 0.08,
      fill: { color: C.OLIVE },
    });
    s.addText("Student Read Aloud", {
      x: 0.8, y: 3.0, w: 2.3, h: 0.36,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Cross-curriculum badge
    s.addShape("roundRect", {
      x: 3.3, y: 3.0, w: 2.8, h: 0.36, rectRadius: 0.08,
      fill: { color: C.BURGUNDY },
    });
    s.addText("History \u2014 VC2HH6K10", {
      x: 3.3, y: 3.0, w: 2.8, h: 0.36,
      fontSize: 11, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Connection card on the right
    addCard(s, 7.0, 1.3, 2.5, 2.6, { fill: C.OLIVE });
    s.addImage({ data: icons.bulbW, x: 7.85, y: 1.5, w: 0.4, h: 0.4 });
    s.addText("Connection", {
      x: 7.2, y: 2.0, w: 2.1, h: 0.35,
      fontSize: 14, fontFace: FONT_B, color: C.GOLD, bold: true, align: "center", margin: 0,
    });
    s.addText("As we read about how Warrior\u2019s story ends, think about how YOUR narrative will end too.", {
      x: 7.2, y: 2.4, w: 2.1, h: 1.2,
      fontSize: 12, fontFace: FONT_B, color: C.LIGHT, align: "center", margin: 0,
    });

    // Bottom connection prompt — y+h = 4.15+0.85 = 5.0 (within SAFE_BOTTOM)
    s.addShape("roundRect", {
      x: 0.5, y: 4.15, w: 9, h: 0.85, rectRadius: 0.1,
      fill: { color: C.WARM },
    });
    s.addImage({ data: icons.quote, x: 0.75, y: 4.3, w: 0.35, h: 0.35 });
    s.addText("Think about this as you read:", {
      x: 1.2, y: 4.2, w: 4, h: 0.3,
      fontSize: 12, fontFace: FONT_B, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addText("Every great story has an ending that makes you FEEL something. What does Warrior\u2019s ending make you feel? And what do you want YOUR reader to feel?", {
      x: 1.2, y: 4.5, w: 8, h: 0.45,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Today\u2019s supplementary text is a comic about one of the most famous real war horses in history \u2014 Warrior
\u2022 Warrior served on the Western Front during WWI \u2014 real horse, not fictional like Joey
\u2022 Survived the worst battles: the Somme, Passchendaele, the Battle of Cambrai
\u2022 Known for incredible bravery \u2014 didn\u2019t flinch even when shells were exploding around him
\u2022 Captain Jack Seely (his owner) said Warrior seemed to understand what was happening and stayed calm when other horses panicked
\u2022 Key connection: we\u2019re writing conclusions today, and Warrior\u2019s story HAS an ending \u2014 pay close attention to how the story wraps up
\u2022 Ask: What happens to Warrior after the war? How does the ending make you feel?
\u2022 Assign student readers \u2014 everyone follow along

DO:
- Hand out / display the Warrior comic
- Assign student readers (rotate through 3-4 students)
- Frame the connection to conclusion writing BEFORE reading begins

TEACHER NOTES:
The Warrior comic serves dual purposes: it builds content knowledge about real war horses (History cross-curriculum VC2HH6K10) and provides a model of how a war story ENDS. This is deliberate \u2014 students need to see a conclusion in action before writing their own. Warrior was owned by Captain Jack Seely and served from 1914-1918. He survived the war and lived until 1941, dying at age 33 on the Isle of Wight. The comic format is accessible and engaging, and the visual medium reinforces that stories can be told in many forms. VTLM 2.0: Connecting reading to writing purpose.

WATCH FOR:
- Students distracted by the comic format \u2014 redirect to content and story structure
- Students reading too quickly through the ending \u2014 slow them down, this is the key part
- Students who make connections to Joey or their own narrative \u2014 praise and amplify these

[General: Supplementary Text | VTLM 2.0: Reading-Writing Connection]`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 5 — Note-Taking from Text
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Active Reading", { w: 1.8, color: C.SAGE });
    addTitle(s, "Note-Taking \u2014 Warrior the War Horse", { y: 0.65 });

    // Left card — What to look for
    addCard(s, 0.5, 1.3, 4.3, 3.0, { strip: C.SAGE });
    s.addShape("oval", { x: 0.8, y: 1.45, w: 0.5, h: 0.5, fill: { color: C.SAGE } });
    s.addImage({ data: icons.search, x: 0.88, y: 1.53, w: 0.34, h: 0.34 });
    s.addText("What to Look For", {
      x: 1.45, y: 1.48, w: 3, h: 0.4,
      fontSize: 16, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });

    const lookForItems = [
      "What made Warrior famous?",
      "How did Warrior show bravery?",
      "How did Warrior\u2019s story end?",
      "What feelings does the ending create?",
    ];
    lookForItems.forEach((item, i) => {
      const iy = 2.1 + i * 0.5;
      s.addShape("oval", { x: 0.85, y: iy + 0.02, w: 0.32, h: 0.32, fill: { color: C.OLIVE } });
      s.addText(String(i + 1), {
        x: 0.85, y: iy + 0.02, w: 0.32, h: 0.32,
        fontSize: 11, fontFace: FONT_B, color: C.WHITE, align: "center", valign: "middle", bold: true, margin: 0,
      });
      s.addText(item, {
        x: 1.3, y: iy, w: 3.2, h: 0.38,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    });

    // Right card — Your Notes
    addCard(s, 5.2, 1.3, 4.3, 3.0, { strip: C.GOLD });
    s.addShape("oval", { x: 5.45, y: 1.45, w: 0.5, h: 0.5, fill: { color: C.GOLD } });
    s.addImage({ data: icons.penGold, x: 5.53, y: 1.53, w: 0.34, h: 0.34 });
    // overlay white icon on gold circle
    s.addImage({ data: icons.pen, x: 5.53, y: 1.53, w: 0.34, h: 0.34 });
    s.addText("Your Notes", {
      x: 6.1, y: 1.48, w: 3, h: 0.4,
      fontSize: 16, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });
    s.addText("Write notes in your writing book as you read. Use dot points \u2014 capture the key ideas, not every detail.", {
      x: 5.5, y: 2.05, w: 3.7, h: 0.8,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    // Lines suggesting note-taking space
    for (let i = 0; i < 4; i++) {
      s.addShape("line", {
        x: 5.5, y: 2.95 + i * 0.35, w: 3.7, h: 0,
        line: { color: C.SAND, width: 0.5, dashType: "dash" },
      });
    }

    // Connection prompt at bottom — y+h = 4.5+0.55 = 5.05 (within SAFE_BOTTOM)
    s.addShape("roundRect", {
      x: 0.5, y: 4.5, w: 9, h: 0.55, rectRadius: 0.08,
      fill: { color: C.WARM },
    });
    s.addImage({ data: icons.bulb, x: 0.7, y: 4.57, w: 0.32, h: 0.32 });
    s.addText("Pay attention to HOW the comic ends. What feelings does it leave you with? This is what a good conclusion does.", {
      x: 1.15, y: 4.52, w: 8.1, h: 0.55,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, bold: true, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Open writing books to a fresh page \u2014 write \u201CWarrior Notes\u201D at the top
\u2022 Four focus questions on screen
\u2022 Question 1: What made Warrior famous? Want specifics \u2014 not just \u201Che was in the war\u201D \u2014 which battles? What did he do?
\u2022 Question 2: How did Warrior show bravery? Look for examples
\u2022 Question 3 (most important for today): How did Warrior\u2019s story end? What happened after the war?
\u2022 Question 4: What feelings does the ending create? Happy? Sad? Proud? A mix?
\u2022 This matters because YOUR conclusion needs to decide what feeling the reader is left with
\u2022 Use dot points \u2014 capture key ideas, not every detail
\u2022 Assign next reader and continue

DO:
- Monitor note-taking \u2014 circulate while students read aloud
- Pause at key moments in the comic to check understanding
- After the ending, give students 60 seconds to finish their notes
- Brief share: \u201CWhat feeling did the ending leave you with?\u201D

TEACHER NOTES:
The note-taking is focused and purposeful. Question 4 (feelings the ending creates) is the bridge to conclusion writing. Students who understand that a good ending leaves the reader feeling something specific will write stronger conclusions. Warrior survived the war and was retired to the Isle of Wight, where he lived out his days peacefully \u2014 the ending creates a sense of relief, gratitude, and earned peace. This mirrors the emotional arc many students will want for their own narratives. VTLM 2.0: Active reading strategies with purpose-driven note-taking.

WATCH FOR:
- Students writing too much \u2014 redirect to key ideas and dot points
- Students who skip question 4 \u2014 this is the critical connection to their writing
- Students who say the ending is \u201Chappy\u201D without depth \u2014 push for \u201CWhat KIND of happy? Relief? Pride? Peace?\u201D

[General: Note-Taking | VTLM 2.0: Active Reading Strategies]`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 6 — Narrative Structure Review (Celebratory)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s, C.GOLD);
    addTitle(s, "Narrative Text Structure \u2014 The Final Piece", { y: 0.2, fontSize: 24 });

    // Narrative arc — five stages as stepping blocks ascending then descending
    const stages = [
      { label: "Orientation /\nIntroduction", week: "Week 1", done: true, x: 0.5,  y: 3.4, color: C.SAGE },
      { label: "Action /\nRising Action",     week: "Week 2", done: true, x: 2.35, y: 2.6, color: C.SAGE },
      { label: "Problem /\nComplication",      week: "Week 2", done: true, x: 4.2,  y: 1.8, color: C.SAGE },
      { label: "Resolution",                   week: "Yesterday", done: true, x: 6.05, y: 2.6, color: C.SAGE },
      { label: "Conclusion",                   week: "TODAY", done: false, x: 7.9,  y: 3.4, color: C.GOLD },
    ];

    // Connecting lines between stages
    for (let i = 0; i < stages.length - 1; i++) {
      const a = stages[i];
      const b = stages[i + 1];
      s.addShape("line", {
        x: a.x + 0.8, y: a.y + 0.3,
        w: b.x - a.x - 0.6, h: b.y - a.y,
        line: { color: C.SAND, width: 2 },
      });
    }

    stages.forEach((st, i) => {
      const isToday = !st.done;
      const cardW = 1.65;
      const cardH = isToday ? 1.3 : 1.1;

      // Card background
      s.addShape("roundRect", {
        x: st.x, y: st.y, w: cardW, h: cardH, rectRadius: 0.1,
        fill: { color: isToday ? C.GOLD : C.WHITE },
        shadow: isToday ? makeShadow() : makeCardShadow(),
      });

      // Tick or star icon
      if (st.done) {
        s.addImage({ data: icons.check, x: st.x + cardW - 0.4, y: st.y + 0.08, w: 0.28, h: 0.28 });
      } else {
        s.addImage({ data: icons.starW, x: st.x + cardW - 0.4, y: st.y + 0.08, w: 0.28, h: 0.28 });
      }

      // Stage label
      s.addText(st.label, {
        x: st.x + 0.1, y: st.y + 0.1, w: cardW - 0.55, h: isToday ? 0.65 : 0.55,
        fontSize: isToday ? 13 : 11, fontFace: FONT_H,
        color: isToday ? C.WHITE : C.OLIVE,
        bold: true, margin: 0,
      });

      // Week / timing label
      s.addShape("roundRect", {
        x: st.x + 0.15, y: st.y + cardH - 0.38,
        w: isToday ? 1.0 : 0.9, h: 0.26, rectRadius: 0.06,
        fill: { color: isToday ? C.WHITE : C.CREAM_DARK },
      });
      s.addText(st.week, {
        x: st.x + 0.15, y: st.y + cardH - 0.38,
        w: isToday ? 1.0 : 0.9, h: 0.26,
        fontSize: 9, fontFace: FONT_B,
        color: isToday ? C.GOLD : C.MUTED,
        align: "center", valign: "middle", bold: true, margin: 0,
      });
    });

    // "YOU ARE HERE" pointer for conclusion
    s.addShape("roundRect", {
      x: 7.7, y: 2.8, w: 2.1, h: 0.38, rectRadius: 0.08,
      fill: { color: C.BURGUNDY },
    });
    s.addText("YOU ARE HERE", {
      x: 7.7, y: 2.8, w: 2.1, h: 0.38,
      fontSize: 12, fontFace: FONT_B, color: C.WHITE,
      align: "center", valign: "middle", bold: true, charSpacing: 2, margin: 0,
    });

    // Celebration message at bottom — FIXED: y+h = 4.45+0.5 = 4.95 (within SAFE_BOTTOM)
    s.addShape("roundRect", {
      x: 1.5, y: 4.45, w: 7, h: 0.5, rectRadius: 0.1,
      fill: { color: C.OLIVE },
    });
    s.addImage({ data: icons.starW, x: 1.7, y: 4.52, w: 0.32, h: 0.32 });
    s.addText("After today, you will have a COMPLETE narrative draft!", {
      x: 2.1, y: 4.45, w: 6.1, h: 0.5,
      fontSize: 16, fontFace: FONT_H, color: C.WHITE,
      bold: true, valign: "middle", margin: 0,
    });
    s.addImage({ data: icons.starW, x: 8.15, y: 4.52, w: 0.32, h: 0.32 });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Look at how far you\u2019ve come over three weeks
\u2022 Week 1: introduction \u2014 character, setting, hook
\u2022 Week 2: action paragraphs and complication
\u2022 Yesterday: resolution \u2014 character started solving the problem
\u2022 Today: the conclusion \u2014 the final piece of the puzzle
\u2022 When you write this today, you\u2019ll have a COMPLETE narrative \u2014 five paragraphs, a whole story
\u2022 Ask: What\u2019s the difference between resolution and conclusion? [Resolution = character ACTS to address the problem; Conclusion = what comes AFTER \u2014 reflection, feelings, \u201Cwhat now?\u201D]
\u2022 The conclusion is how your character feels after everything that\u2019s happened

DO:
- Point to each stage as you talk through it \u2014 make students see the progression
- Pause on \u201CCOMPLETE narrative\u201D \u2014 let it land
- Ask: \u201CHow many of you are excited to finish your story?\u201D \u2014 build energy
- Clarify resolution vs conclusion distinction before moving on

TEACHER NOTES:
This slide should feel like a milestone moment. Students have been building incrementally and may not have stepped back to see the full arc. The visual representation makes their progress tangible. The resolution vs conclusion distinction is critical \u2014 many students conflate the two. Resolution = action (character solves the problem). Conclusion = reflection (character processes what happened, reader gets closure). This is the D in DECIDE: Decide on the Thing. Make the distinction crystal clear before modelling. VTLM 2.0: Making learning visible through progress tracking.

WATCH FOR:
- Students who look anxious rather than excited \u2014 reassure: \u201CThe conclusion is the shortest paragraph\u201D
- Students who say \u201CI already finished\u201D (they may have ended at resolution) \u2014 check their work
- Confusion about resolution vs conclusion \u2014 use analogy: \u201CResolution is winning the game. Conclusion is the interview after where you talk about how it felt.\u201D

[General: Text Structure | VTLM 2.0: Making Learning Visible]`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 7 — Conclusion Paragraph: Purpose & Features (I Do)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "I Do", { w: 1.2, color: C.GOLD });
    addTitle(s, "The Conclusion Paragraph", { y: 0.65 });

    // Left card — Purpose
    addCard(s, 0.5, 1.3, 4.3, 3.6, { strip: C.OLIVE });
    s.addShape("oval", { x: 0.8, y: 1.45, w: 0.5, h: 0.5, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.flag, x: 0.88, y: 1.53, w: 0.34, h: 0.34 });
    s.addText("Purpose", {
      x: 1.45, y: 1.48, w: 3, h: 0.4,
      fontSize: 17, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addText("What does the conclusion do?", {
      x: 0.8, y: 1.95, w: 3.7, h: 0.3,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    const purposes = [
      "Wraps up the story",
      "Shows how the character NOW feels (after the resolution)",
      "Reflects on what happened / what was learned",
      "Leaves the reader with a final impression or feeling",
      "Can look to the future \u2014 what happens next for the character?",
    ];
    const purposeTexts = purposes.map((t, i) => ({
      text: t,
      options: { bullet: true, breakLine: i < purposes.length - 1, fontSize: 12, color: C.CHARCOAL },
    }));
    s.addText(purposeTexts, {
      x: 0.8, y: 2.35, w: 3.7, h: 2.3, fontFace: FONT_B, margin: 0,
    });

    // Right card — Features
    addCard(s, 5.2, 1.3, 4.3, 3.6, { strip: C.GOLD });
    s.addShape("oval", { x: 5.45, y: 1.45, w: 0.5, h: 0.5, fill: { color: C.GOLD } });
    s.addImage({ data: icons.feather, x: 5.53, y: 1.53, w: 0.34, h: 0.34 });
    s.addText("Features", {
      x: 6.1, y: 1.48, w: 3, h: 0.4,
      fontSize: 17, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });
    s.addText("What makes a strong conclusion?", {
      x: 5.5, y: 1.95, w: 3.7, h: 0.3,
      fontSize: 11, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    const features = [
      "Mental verbs showing how the character now feels/thinks",
      "Adjectives describing the character\u2019s emotional state at the END",
      "May include reflection or a lesson learned",
      "Shorter than other paragraphs \u2014 tight and purposeful",
      "Tone should match the story\u2019s mood (hopeful, bittersweet, triumphant...)",
    ];
    const featureTexts = features.map((t, i) => ({
      text: t,
      options: { bullet: true, breakLine: i < features.length - 1, fontSize: 12, color: C.CHARCOAL },
    }));
    s.addText(featureTexts, {
      x: 5.5, y: 2.35, w: 3.7, h: 2.3, fontFace: FONT_B, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 A conclusion wraps up the story \u2014 it doesn\u2019t introduce new problems (that was the complication) or solve the problem (that was the resolution)
\u2022 The conclusion is the AFTER \u2014 shows how the character feels now that everything has happened
\u2022 It reflects on what was learned or how things have changed
\u2022 Most importantly: it leaves the reader with a final impression
\u2022 Ask: Think about the Warrior comic ending \u2014 what feeling did it leave you with? [Pride, relief, sadness, gratitude]
\u2022 That\u2019s exactly what a conclusion does
\u2022 Features: mental verbs (like \u201Cunderstood,\u201D \u201Cfelt,\u201D \u201Cknew,\u201D \u201Choped\u201D) \u2014 shift from action-focused to reflective
\u2022 Adjectives describing how the character feels AT THE END, not during the action
\u2022 Key point: shorter than other paragraphs \u2014 4\u20136 sentences, every word matters

DO:
- Point between Purpose and Features \u2014 show how they connect
- Ask students to compare with what they noticed in Warrior\u2019s ending
- Write the key distinction on the board: \u201CResolution = character ACTS / Conclusion = character REFLECTS\u201D

TEACHER NOTES:
This slide establishes the conceptual framework for the conclusion. The distinction from resolution is the single most important teaching point. Many students will want to keep the action going in their conclusion \u2014 redirect them toward reflection and emotional processing. The \u2018shorter than other paragraphs\u2019 point is crucial: students who have written long action paragraphs may try to do the same here. The conclusion is deliberately concise. Every word should earn its place. This is D in DECIDE: Decide on the Thing \u2014 defining what a conclusion IS. VTLM 2.0: Explicit teaching of text structure features.

WATCH FOR:
- Students confusing conclusion with resolution \u2014 keep referring back to the distinction
- Students who want to add new events in the conclusion \u2014 redirect: \u201CNo new action. This is reflection.\u201D
- Students who think \u2018shorter\u2019 means less important \u2014 emphasise: \u201CShorter means every word counts MORE\u201D

[General: I Do \u2014 Text Structure | VTLM 2.0: Explicit Teaching]`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 8 — Mental Verbs & Adjectives for Conclusions (I Do)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "I Do", { w: 1.2, color: C.GOLD });
    addTitle(s, "Language for Your Conclusion", { y: 0.65 });

    // Column 1 — Mental Verbs
    addCard(s, 0.5, 1.3, 2.8, 3.5, { strip: C.OLIVE });
    s.addShape("oval", { x: 0.75, y: 1.45, w: 0.45, h: 0.45, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.feather, x: 0.82, y: 1.52, w: 0.31, h: 0.31 });
    s.addText("Mental Verbs", {
      x: 1.3, y: 1.47, w: 1.8, h: 0.36,
      fontSize: 14, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addText("(ending a story)", {
      x: 1.3, y: 1.82, w: 1.8, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    const mentalVerbs = ["understood", "accepted", "appreciated", "felt", "knew", "reflected", "hoped", "believed", "cherished", "promised"];
    mentalVerbs.forEach((v, i) => {
      s.addText(v, {
        x: 0.8, y: 2.12 + i * 0.26, w: 2.2, h: 0.24,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
        bold: i < 3, margin: 0,
      });
    });

    // Column 2 — Adjectives
    addCard(s, 3.6, 1.3, 2.8, 3.5, { strip: C.SAGE });
    s.addShape("oval", { x: 3.85, y: 1.45, w: 0.45, h: 0.45, fill: { color: C.SAGE } });
    s.addImage({ data: icons.heartW, x: 3.92, y: 1.52, w: 0.31, h: 0.31 });
    s.addText("Adjectives", {
      x: 4.4, y: 1.47, w: 1.8, h: 0.36,
      fontSize: 14, fontFace: FONT_H, color: C.SAGE, bold: true, margin: 0,
    });
    s.addText("(final feelings)", {
      x: 4.4, y: 1.82, w: 1.8, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    const adjectives = ["grateful", "peaceful", "transformed", "wiser", "hopeful", "bittersweet", "content", "changed", "stronger", "free"];
    adjectives.forEach((a, i) => {
      s.addText(a, {
        x: 3.9, y: 2.12 + i * 0.26, w: 2.2, h: 0.24,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL,
        bold: i < 3, margin: 0,
      });
    });

    // Column 3 — Conclusion Starters
    addCard(s, 6.7, 1.3, 2.8, 3.5, { strip: C.GOLD });
    s.addShape("oval", { x: 6.95, y: 1.45, w: 0.45, h: 0.45, fill: { color: C.GOLD } });
    s.addImage({ data: icons.penGold, x: 7.02, y: 1.52, w: 0.31, h: 0.31 });
    s.addImage({ data: icons.pen, x: 7.02, y: 1.52, w: 0.31, h: 0.31 });
    s.addText("Conclusion Starters", {
      x: 7.5, y: 1.47, w: 1.8, h: 0.36,
      fontSize: 13, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });

    const starters = [
      { text: "As [character] looked back on everything that had happened, ...", y: 2.12 },
      { text: "For the first time, [character] truly understood that ...", y: 2.68 },
      { text: "Things would never be the same, but [character] knew that ...", y: 3.24 },
      { text: "Standing there, [character] felt a quiet sense of ...", y: 3.8 },
    ];
    starters.forEach((st) => {
      s.addText(st.text, {
        x: 7.0, y: st.y, w: 2.3, h: 0.5,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
      });
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Three columns of language tools for your conclusion
\u2022 Left: mental verbs \u2014 show what\u2019s happening INSIDE the character\u2019s head
\u2022 Yesterday\u2019s resolution used action-focused mental verbs (decided, realised, determined) \u2014 today we shift to reflective ones
\u2022 Read from slide: understood, accepted, appreciated, reflected, hoped, believed \u2014 notice these are calmer, more reflective
\u2022 Middle: adjectives for final feelings \u2014 grateful, peaceful, transformed, wiser, hopeful, bittersweet
\u2022 Ask: What does \u201Cbittersweet\u201D mean? [A mix of happy and sad] \u2014 that\u2019s a sophisticated emotion for an ending
\u2022 Right: sentence starters to help you get started (optional, not required)
\u2022 Pick 1\u20132 mental verbs, 1\u20132 adjectives, and try a sentence starter if needed

DO:
- Read through each column, modelling pronunciation and meaning
- Ask students to identify which mental verbs feel most relevant to THEIR character
- Have students practise orally: \u201CMy character felt ___ because ___\u201D
- Contrast resolution language vs conclusion language explicitly

TEACHER NOTES:
This slide builds on Lesson 14\u2019s language work. The shift from action-oriented mental verbs (resolution) to reflective mental verbs (conclusion) mirrors the narrative\u2019s emotional arc. Students may gravitate toward \u2018happy\u2019 or \u2018sad\u2019 as their only emotional descriptors \u2014 push them toward the richer options on this list. \u2018Bittersweet,\u2019 \u2018transformed,\u2019 and \u2018wiser\u2019 require higher-order emotional processing. The sentence starters scaffold students who struggle to begin. E in DECIDE: Execute through Modelling \u2014 this is still the I Do phase, building the language toolkit before modelling a plan. VTLM 2.0: Explicit vocabulary instruction for specific writing purpose.

WATCH FOR:
- Students who gravitate to only \u2018happy\u2019 \u2014 push: \u201CWhat KIND of happy? Grateful? Hopeful? Content?\u201D
- Students copying ALL the words \u2014 redirect: \u201CChoose two or three that fit YOUR character\u201D
- Students who don\u2019t understand \u2018bittersweet\u2019 or \u2018transformed\u2019 \u2014 explain with examples from the novel or their own experience

[General: I Do \u2014 Language Features | VTLM 2.0: Explicit Vocabulary Instruction]`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 9 — Model Planning a Conclusion (I Do)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "I Do", { w: 1.2, color: C.GOLD });
    addTitle(s, "Planning a Conclusion \u2014 Teacher Model", { y: 0.65 });

    // Planning template card — left side
    addCard(s, 0.5, 1.3, 4.5, 3.3, { strip: C.OLIVE });
    s.addText("Planning Template", {
      x: 0.8, y: 1.4, w: 3.5, h: 0.35,
      fontSize: 15, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });

    const planQuestions = [
      { q: "How does my story end?", sub: "(the situation after resolution)" },
      { q: "How does my character feel NOW?", sub: "(mental verbs + adjectives)" },
      { q: "What has my character learned or how have they changed?", sub: "" },
      { q: "What final impression do I want to leave the reader with?", sub: "" },
    ];
    planQuestions.forEach((pq, i) => {
      const py = 1.9 + i * 0.63;
      s.addShape("oval", { x: 0.8, y: py + 0.02, w: 0.3, h: 0.3, fill: { color: C.OLIVE } });
      s.addText(String(i + 1), {
        x: 0.8, y: py + 0.02, w: 0.3, h: 0.3,
        fontSize: 10, fontFace: FONT_B, color: C.WHITE, align: "center", valign: "middle", bold: true, margin: 0,
      });
      s.addText(pq.q, {
        x: 1.2, y: py, w: 3.5, h: 0.28,
        fontSize: 12, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
      });
      if (pq.sub) {
        s.addText(pq.sub, {
          x: 1.2, y: py + 0.26, w: 3.5, h: 0.22,
          fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
        });
      }
    });

    // Model plan — right side (filled in)
    addCard(s, 5.3, 1.3, 4.2, 3.3, { strip: C.GOLD });
    s.addShape("oval", { x: 5.55, y: 1.45, w: 0.45, h: 0.45, fill: { color: C.GOLD } });
    s.addImage({ data: icons.teacherO, x: 5.62, y: 1.52, w: 0.31, h: 0.31 });
    s.addImage({ data: icons.teacher, x: 5.62, y: 1.52, w: 0.31, h: 0.31 });
    s.addText("My Plan", {
      x: 6.1, y: 1.48, w: 3, h: 0.4,
      fontSize: 15, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });
    s.addText("(school camp narrative)", {
      x: 6.1, y: 1.85, w: 3, h: 0.22,
      fontSize: 10, fontFace: FONT_B, color: C.MUTED, italic: true, margin: 0,
    });

    const modelPlan = [
      { label: "Situation:", text: "Back at camp after the rescue. Sitting by the fire. Everyone safe." },
      { label: "Feelings:", text: "Grateful, relieved, wiser. \u2018Understood\u2019 and \u2018appreciated\u2019." },
      { label: "Growth:", text: "Learned that real courage isn\u2019t about not being scared \u2014 it\u2019s acting despite fear." },
      { label: "Final impression:", text: "Quiet pride. The reader should feel the character has grown up a little." },
    ];
    modelPlan.forEach((mp, i) => {
      const my = 2.18 + i * 0.58;
      s.addText(mp.label, {
        x: 5.6, y: my, w: 1.2, h: 0.22,
        fontSize: 11, fontFace: FONT_B, color: C.GOLD, bold: true, margin: 0,
      });
      s.addText(mp.text, {
        x: 5.6, y: my + 0.22, w: 3.7, h: 0.34,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    });

    // Note at bottom — FIXED: y+h = 4.65+0.4 = 5.05 (within SAFE_BOTTOM)
    s.addShape("roundRect", {
      x: 0.5, y: 4.65, w: 9, h: 0.4, rectRadius: 0.08,
      fill: { color: C.WARM },
    });
    s.addImage({ data: icons.bulb, x: 0.7, y: 4.7, w: 0.28, h: 0.28 });
    s.addText("Notice: this is the SAME narrative from yesterday\u2019s resolution lesson. The conclusion follows directly from it.", {
      x: 1.1, y: 4.67, w: 8.1, h: 0.36,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Same narrative I\u2019ve been using all week \u2014 school camp story
\u2022 Recap: character got lost in the bush, panicked, used skills to find their way back \u2014 that was the resolution (character ACTED)
\u2022 Now plan what comes AFTER
\u2022 Question 1 \u2014 Situation: character is back at camp, everyone\u2019s safe, sitting by the fire, crisis is over
\u2022 Question 2 \u2014 Feelings NOW (not during the crisis): \u201Cunderstood\u201D and \u201Cappreciated\u201D as mental verbs; grateful, relieved, wiser as adjectives
\u2022 Notice the shift \u2014 yesterday\u2019s feelings were determined, focused, brave; today\u2019s are quieter, calmer
\u2022 Question 3 \u2014 Growth: real courage isn\u2019t about not being scared, it\u2019s doing the right thing despite fear
\u2022 Question 4 \u2014 Final impression: quiet pride; reader should feel the character has matured
\u2022 Ask: Does my plan connect back to my resolution? How?

DO:
- Write the plan on the board or document camera as you talk through it
- Think aloud explicitly \u2014 show the decision-making process
- Reference yesterday\u2019s resolution: \u201CRemember, the resolution was X. Now the conclusion is what comes after.\u201D
- Ask students: \u201CDoes my plan connect back to my resolution? How?\u201D

TEACHER NOTES:
This continues the same example narrative from Lesson 14 \u2014 consistency is key so students see how the conclusion follows the resolution. The school camp narrative (lost in the bush, found way back) provides a clear and relatable example. The planning template mirrors what students will use in the We Do phase. Think-aloud is critical: students need to hear the teacher\u2019s internal decision-making process, not just see the finished product. Emphasise the SHIFT in emotional register from resolution to conclusion. VTLM 2.0: Modelling through think-aloud.

WATCH FOR:
- Students who want to add new events to their plan \u2014 redirect: \u201CNo new action. The conclusion is reflection.\u201D
- Students who confuse their feelings with the character\u2019s feelings \u2014 maintain narrative distance
- Students who can\u2019t articulate growth \u2014 scaffold with: \u201CWhat does your character know NOW that they didn\u2019t know at the start?\u201D

[General: I Do \u2014 Planning | VTLM 2.0: Modelling]`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 10 — Model Writing a Conclusion (I Do)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "I Do", { w: 1.2, color: C.GOLD });
    addTitle(s, "Writing the Conclusion \u2014 Teacher Model", { y: 0.65 });

    // Main model paragraph card
    addCard(s, 0.5, 1.3, 6.5, 2.8, { strip: C.GOLD });
    s.addText("Model Conclusion Paragraph", {
      x: 0.8, y: 1.4, w: 4, h: 0.35,
      fontSize: 14, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });

    // The model paragraph with rich text (highlighted mental verbs and adjectives)
    s.addText([
      { text: "As the flames of the campfire flickered against the darkening sky, Mia ", options: { fontSize: 13, color: C.CHARCOAL, breakLine: false } },
      { text: "understood", options: { fontSize: 13, color: C.GOLD, bold: true, breakLine: false } },
      { text: " something she hadn\u2019t before. She was ", options: { fontSize: 13, color: C.CHARCOAL, breakLine: false } },
      { text: "grateful", options: { fontSize: 13, color: C.SAGE, bold: true, breakLine: false } },
      { text: " \u2014 not just for being found, but for discovering what she was capable of when it mattered most. She ", options: { fontSize: 13, color: C.CHARCOAL, breakLine: false } },
      { text: "appreciated", options: { fontSize: 13, color: C.GOLD, bold: true, breakLine: false } },
      { text: " the warmth of the fire, the sound of her friends laughing, the ordinary things she\u2019d taken for granted that morning. She was ", options: { fontSize: 13, color: C.CHARCOAL, breakLine: false } },
      { text: "wiser", options: { fontSize: 13, color: C.SAGE, bold: true, breakLine: false } },
      { text: " now, and quietly ", options: { fontSize: 13, color: C.CHARCOAL, breakLine: false } },
      { text: "proud", options: { fontSize: 13, color: C.SAGE, bold: true, breakLine: false } },
      { text: ". Tomorrow, they would pack up and head home. But Mia ", options: { fontSize: 13, color: C.CHARCOAL, breakLine: false } },
      { text: "knew", options: { fontSize: 13, color: C.GOLD, bold: true, breakLine: false } },
      { text: " that something inside her had shifted. She wasn\u2019t the same girl who\u2019d arrived at camp four days ago, and she never would be again.", options: { fontSize: 13, color: C.CHARCOAL } },
    ], {
      x: 0.8, y: 1.85, w: 5.9, h: 1.85,
      fontFace: FONT_B, margin: 0, lineSpacingMultiple: 1.15,
    });

    // Legend — below paragraph text, inside card
    s.addShape("roundRect", { x: 0.8, y: 3.78, w: 0.2, h: 0.2, rectRadius: 0.03, fill: { color: C.GOLD } });
    s.addText("= Mental verb", { x: 1.05, y: 3.75, w: 1.2, h: 0.24, fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0 });
    s.addShape("roundRect", { x: 2.4, y: 3.78, w: 0.2, h: 0.2, rectRadius: 0.03, fill: { color: C.SAGE } });
    s.addText("= Adjective", { x: 2.65, y: 3.75, w: 1.2, h: 0.24, fontSize: 10, fontFace: FONT_B, color: C.MUTED, margin: 0 });

    // Annotations card — right side
    addCard(s, 7.3, 1.3, 2.2, 2.9, { fill: C.OLIVE });
    s.addText("Key Features", {
      x: 7.5, y: 1.42, w: 1.8, h: 0.3,
      fontSize: 13, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });

    const annotations = [
      "Reflective opening \u2014 sets calm tone",
      "Mental verbs: understood, appreciated, knew",
      "Adjectives: grateful, wiser, proud",
      "Looks to the future briefly",
      "Shows character growth",
      "Only 5 sentences \u2014 tight & purposeful",
    ];
    annotations.forEach((a, i) => {
      s.addImage({ data: icons.checkW, x: 7.45, y: 1.85 + i * 0.38, w: 0.22, h: 0.22 });
      s.addText(a, {
        x: 7.75, y: 1.83 + i * 0.38, w: 1.6, h: 0.36,
        fontSize: 10, fontFace: FONT_B, color: C.LIGHT, margin: 0,
      });
    });

    // Think-aloud note
    s.addShape("roundRect", {
      x: 0.5, y: 4.35, w: 9, h: 0.55, rectRadius: 0.08,
      fill: { color: C.WARM },
    });
    s.addImage({ data: icons.teacher, x: 0.7, y: 4.42, w: 0.32, h: 0.32 });
    s.addText("Think-aloud: ", {
      x: 1.1, y: 4.37, w: 1.2, h: 0.25,
      fontSize: 12, fontFace: FONT_B, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addText("\"I chose \u2018understood\u2019 instead of \u2018learned\u2019 because it feels deeper. And I kept it to 5 sentences because the conclusion should feel tight \u2014 every word earns its place.\"", {
      x: 1.1, y: 4.58, w: 8.1, h: 0.3,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Watch me turn the plan into a paragraph \u2014 writing live, thinking aloud
\u2022 Read from slide: \u201CAs the flames of the campfire flickered against the darkening sky, Mia understood something she hadn\u2019t before.\u201D
\u2022 Explain: started with setting (campfire) to create calm, reflective mood; \u201Cunderstood\u201D is the first mental verb \u2014 immediately signals reflection, not action
\u2022 \u201CShe was grateful\u201D \u2014 adjective, and the dash explains WHAT she\u2019s grateful for (specific, not vague)
\u2022 \u201CShe appreciated\u201D \u2014 second mental verb with sensory details (warmth, sound, laughing) used for reflection, not action
\u2022 \u201CShe was wiser now, and quietly proud\u201D \u2014 short sentence, two adjectives; sometimes less is more
\u2022 \u201CTomorrow, they would pack up\u201D \u2014 briefly looks to the future
\u2022 Final line: \u201Csomething inside her had shifted\u201D \u2014 shows character growth; leaves reader feeling Mia has changed
\u2022 Count: five sentences total \u2014 tight and purposeful

DO:
- Write the paragraph live on the board \u2014 don\u2019t just display the slide
- Pause after each sentence to explain the choice
- Highlight mental verbs in one colour, adjectives in another
- Count the sentences at the end: \u201CFive. That\u2019s all you need.\u201D

TEACHER NOTES:
The model paragraph demonstrates every feature taught in the previous slides: reflective mental verbs, emotional adjectives, brief future reference, character growth, and concise length. Writing it live is essential \u2014 students need to see that even teachers write sentence by sentence, making choices as they go. The think-aloud should feel natural, not scripted. Emphasise the SHIFT in register: this paragraph sounds and feels different from the action paragraphs. It\u2019s slower, calmer, more internal. E in DECIDE: Execute through Modelling. The model should be approximately the same length students will aim for. VTLM 2.0: Live modelling with metacognitive commentary.

WATCH FOR:
- Students who think they need to write more \u2014 reinforce: \u201C5 sentences is plenty for a conclusion\u201D
- Students who want to copy the model exactly \u2014 they can use the STRUCTURE but not the specific content
- Students who notice the sensory details \u2014 praise: \u201CYes! You can use senses in a conclusion too, but for reflection, not action\u201D

[General: I Do \u2014 Writing Model | VTLM 2.0: Live Modelling]`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 11 — Guided Practice: Plan Your Conclusion (We Do)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.WARM };
    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.SAGE } });
    addBadge(s, "We Do", { w: 1.2, color: C.SAGE });
    addTitle(s, "Plan Your Conclusion", { y: 0.65, color: C.OLIVE });

    // Planning template card
    addCard(s, 0.5, 1.3, 5.5, 3.3, { strip: C.SAGE });
    s.addShape("oval", { x: 0.75, y: 1.45, w: 0.5, h: 0.5, fill: { color: C.SAGE } });
    s.addImage({ data: icons.listO, x: 0.83, y: 1.53, w: 0.34, h: 0.34 });
    s.addImage({ data: icons.list, x: 0.83, y: 1.53, w: 0.34, h: 0.34 });
    s.addText("Planning Template \u2014 Writing Books", {
      x: 1.4, y: 1.48, w: 4, h: 0.4,
      fontSize: 15, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });

    const planItems = [
      "How does my story end?",
      "How does my character feel NOW?",
      "What has changed?",
      "Final impression for the reader:",
    ];
    planItems.forEach((item, i) => {
      const py = 2.05 + i * 0.6;
      s.addShape("roundRect", {
        x: 0.8, y: py, w: 4.9, h: 0.5, rectRadius: 0.06,
        fill: { color: C.WHITE },
      });
      s.addText(item, {
        x: 0.95, y: py, w: 4.6, h: 0.28,
        fontSize: 12, fontFace: FONT_B, color: C.OLIVE, bold: true, margin: 0,
      });
      // Dotted line for writing
      s.addShape("line", {
        x: 0.95, y: py + 0.38, w: 4.6, h: 0,
        line: { color: C.SAND, width: 0.5, dashType: "dash" },
      });
    });

    // Right side — Instructions card
    addCard(s, 6.3, 1.3, 3.2, 2.0, { fill: C.OLIVE });
    s.addImage({ data: icons.bulbW, x: 7.55, y: 1.45, w: 0.4, h: 0.4 });
    s.addText("Remember", {
      x: 6.5, y: 1.95, w: 2.8, h: 0.35,
      fontSize: 14, fontFace: FONT_H, color: C.GOLD, bold: true, margin: 0,
    });
    s.addText("Look back at your resolution paragraph from yesterday. Your conclusion follows directly from it.", {
      x: 6.5, y: 2.35, w: 2.8, h: 0.8,
      fontSize: 12, fontFace: FONT_B, color: C.LIGHT, margin: 0,
    });

    // Teacher support card — y+h = 3.5+1.1 = 4.6 (within SAFE_BOTTOM)
    addCard(s, 6.3, 3.5, 3.2, 1.1, { strip: C.GOLD });
    s.addImage({ data: icons.usersOlive, x: 6.55, y: 3.65, w: 0.35, h: 0.35 });
    s.addText("Teacher Support", {
      x: 7.0, y: 3.65, w: 2.3, h: 0.3,
      fontSize: 13, fontFace: FONT_B, color: C.OLIVE, bold: true, margin: 0,
    });
    s.addText("Teacher circulates, checks plans, and conferences with students who need help connecting resolution to conclusion.", {
      x: 6.55, y: 4.0, w: 2.7, h: 0.5,
      fontSize: 10, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Your turn to plan \u2014 open writing books and find your resolution paragraph from yesterday
\u2022 Read it back to yourself [Pause 30 seconds]
\u2022 On the next page, write \u201CConclusion Plan\u201D at the top
\u2022 Copy and answer these four questions for YOUR narrative:
\u2022 Question 1: How does your story end? What is the situation now that the problem is resolved?
\u2022 Question 2: How does your character feel NOW? Use mental verbs and adjectives from previous slide
\u2022 Question 3: What has changed? Has your character grown, learned something, become stronger or wiser?
\u2022 Question 4: What final impression do you want to leave your reader with? What should they FEEL?
\u2022 Five minutes to plan \u2014 hand up if stuck on any question

DO:
- Set a 5-minute timer
- Circulate and prioritise students who struggled with the resolution yesterday
- Check that plans connect logically to the resolution \u2014 if the resolution was about fighting a dragon, the conclusion can\u2019t suddenly be about school
- Ask probing questions: \u201CWhat does your character know now that they didn\u2019t know before?\u201D
- Conference with 4-5 students individually

TEACHER NOTES:
This is C in DECIDE: students plan with teacher support. The planning template mirrors the one used in the model. Critical check: does the conclusion follow from the resolution? Students who wrote disconnected resolutions yesterday may need help bridging. The four questions scaffold the planning process \u2014 students who can answer all four will be able to write a conclusion. Prioritise students who struggled with the resolution or who were absent yesterday. Some may need to quickly review their resolution before planning. VTLM 2.0: Guided practice with scaffolded planning.

WATCH FOR:
- Students who plan new events rather than reflection \u2014 redirect: \u201CThe action is over. This is the AFTER.\u201D
- Students who can\u2019t articulate character growth \u2014 scaffold: \u201CHow is your character different at the end compared to the beginning?\u201D
- Students whose plans are too long \u2014 remind: \u201CFour to six sentences. Your plan should have key words, not full sentences.\u201D
- Students who didn\u2019t write a resolution yesterday \u2014 they need to write one before the conclusion, or work with teacher support

[General: We Do \u2014 Planning | VTLM 2.0: Guided Practice]`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 12 — Independent Practice: Write Your Conclusion (You Do)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.WARM };
    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.BURGUNDY } });
    addBadge(s, "You Do", { w: 1.3, color: C.BURGUNDY });
    addTitle(s, "Your Turn \u2014 Write Your Conclusion", { y: 0.65, color: C.OLIVE });

    // Three step cards — First / Next / Then
    const steps = [
      {
        label: "First", color: C.OLIVE,
        icon: icons.bookOlive, iconW: icons.book,
        text: "Re-read your resolution paragraph from yesterday. Your conclusion follows straight after it. Make sure you know where your story left off.",
      },
      {
        label: "Next", color: C.GOLD,
        icon: icons.penGold, iconW: icons.pen,
        text: "Write your conclusion paragraph in your writing book. Keep it tight \u2014 4\u20136 sentences. Use mental verbs, adjectives, and a reflective tone.",
      },
      {
        label: "Then", color: C.BURGUNDY,
        icon: icons.starW, iconW: null,
        text: "Congratulations \u2014 you now have a COMPLETE narrative draft! Read your entire story from the beginning. Does it flow? Does the ending feel satisfying?",
      },
    ];

    steps.forEach((st, i) => {
      const cy = 1.3 + i * 1.15;
      addCard(s, 0.5, cy, 9, 1.0, { strip: st.color });

      // Number circle
      s.addShape("oval", { x: 0.8, y: cy + 0.15, w: 0.55, h: 0.55, fill: { color: st.color } });
      if (st.iconW) {
        s.addImage({ data: st.iconW, x: 0.88, y: cy + 0.23, w: 0.38, h: 0.38 });
      } else {
        s.addImage({ data: st.icon, x: 0.88, y: cy + 0.23, w: 0.38, h: 0.38 });
      }

      // Step label
      s.addText(st.label, {
        x: 1.5, y: cy + 0.08, w: 1.5, h: 0.35,
        fontSize: 18, fontFace: FONT_H, color: st.color, bold: true, margin: 0,
      });

      // Step text
      s.addText(st.text, {
        x: 1.5, y: cy + 0.45, w: 7.7, h: 0.45,
        fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    });

    // Celebration bar at bottom — FIXED: y+h = 4.6+0.45 = 5.05 (within SAFE_BOTTOM)
    s.addShape("roundRect", {
      x: 1.5, y: 4.6, w: 7, h: 0.45, rectRadius: 0.1,
      fill: { color: C.GOLD },
    });
    s.addImage({ data: icons.starW, x: 1.7, y: 4.67, w: 0.3, h: 0.3 });
    s.addText("When you finish, you are a storyteller. Celebrate that!", {
      x: 2.1, y: 4.6, w: 6.1, h: 0.45,
      fontSize: 14, fontFace: FONT_H, color: C.WHITE, bold: true, valign: "middle", margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 This is it \u2014 the big moment \u2014 you\u2019re writing the last paragraph of your narrative
\u2022 Three steps on screen
\u2022 First: re-read your resolution from yesterday \u2014 know exactly where your story left off
\u2022 Second: write your conclusion \u2014 writing books, 4\u20136 sentences, use your plan, mental verbs, and adjectives
\u2022 Think about tone \u2014 is your ending hopeful? Bittersweet? Triumphant? Match the feeling to the words
\u2022 Third: when you write that last sentence, you have a COMPLETE narrative \u2014 five paragraphs, a whole story
\u2022 Go back to the very beginning and read the whole thing start to finish \u2014 does it flow? Does each paragraph connect? Does the ending feel satisfying?
\u2022 15-minute writing time \u2014 hand up if stuck, start re-reading if done early

DO:
- Set a 15-minute writing timer
- Circulate for individual conferences \u2014 prioritise struggling students
- For fast finishers: have them re-read their whole narrative and identify one thing to improve
- Play soft background music if appropriate for the class
- This should feel like a focused, purposeful writing block

TEACHER NOTES:
This is D in DECIDE: independent application. Students write their conclusion using their plan, the language toolkit, and the model as scaffolds. The three-step structure (First/Next/Then) provides clear expectations. The \u2018Then\u2019 step is critical: students who finish should immediately re-read their entire narrative. This is likely the first time they\u2019ll read the whole thing in sequence. Some students will need the full time just for the conclusion; others will finish quickly and need the re-reading task. Conference priorities: (1) students who didn\u2019t complete the resolution, (2) students whose plans were weak, (3) students who tend to write too much, (4) everyone else. VTLM 2.0: Independent practice with teacher conferencing.

WATCH FOR:
- Students writing more than 6 sentences \u2014 gently redirect: \u201CCan you say that more tightly?\u201D
- Students who add new action/events \u2014 redirect: \u201CThe action is over. This is reflection.\u201D
- Students who finish very quickly (2-3 sentences) \u2014 check quality: \u201CHave you included mental verbs and adjectives?\u201D
- Students who are emotional about finishing \u2014 acknowledge it: \u201CYou should be proud. This is a real achievement.\u201D

[General: You Do \u2014 Independent Writing | VTLM 2.0: Independent Practice]`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 13 — Review & Edit (You Do continued)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    addTopBar(s);
    addBadge(s, "Review", { w: 1.4, color: C.OLIVE });
    addTitle(s, "Final Review \u2014 Your Complete Narrative", { y: 0.65 });

    // Editing checklist card — large, dominant
    addCard(s, 0.5, 1.3, 5.8, 3.55, { strip: C.OLIVE });
    s.addShape("oval", { x: 0.75, y: 1.45, w: 0.5, h: 0.5, fill: { color: C.OLIVE } });
    s.addImage({ data: icons.clipboard, x: 0.83, y: 1.53, w: 0.34, h: 0.34 });
    s.addText("Whole-Narrative Checklist", {
      x: 1.4, y: 1.48, w: 4.5, h: 0.4,
      fontSize: 15, fontFace: FONT_H, color: C.OLIVE, bold: true, margin: 0,
    });

    const checklist = [
      "Does my introduction hook the reader and set the scene?",
      "Do my action paragraphs build tension?",
      "Does my problem/complication create a challenge for my character?",
      "Does my resolution show my character addressing the problem?",
      "Does my conclusion wrap up the story and leave a lasting impression?",
      "Have I used mental verbs and adjectives throughout?",
      "Have I checked spelling, punctuation and grammar?",
      "Does my narrative have a consistent voice?",
    ];
    checklist.forEach((item, i) => {
      const iy = 2.0 + i * 0.35;
      s.addShape("roundRect", {
        x: 0.8, y: iy, w: 0.22, h: 0.22, rectRadius: 0.03,
        fill: { color: C.WHITE },
        line: { color: C.SAGE, width: 1 },
      });
      s.addText(item, {
        x: 1.15, y: iy - 0.03, w: 4.9, h: 0.3,
        fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
      });
    });

    // Partner sharing card — right side
    addCard(s, 6.6, 1.3, 2.9, 2.2, { fill: C.GOLD });
    s.addImage({ data: icons.usersOlive, x: 7.7, y: 1.45, w: 0.45, h: 0.45 });
    s.addImage({ data: icons.users, x: 7.7, y: 1.45, w: 0.45, h: 0.45 });
    s.addText("Partner Sharing", {
      x: 6.8, y: 2.0, w: 2.5, h: 0.35,
      fontSize: 15, fontFace: FONT_H, color: C.WHITE, bold: true, align: "center", margin: 0,
    });
    s.addText("Swap books with a partner. Read their COMPLETE narrative.", {
      x: 6.8, y: 2.4, w: 2.5, h: 0.55,
      fontSize: 12, fontFace: FONT_B, color: C.LIGHT, align: "center", margin: 0,
    });

    // Two stars and a wish — y+h = 3.7+1.1 = 4.8 (within SAFE_BOTTOM)
    addCard(s, 6.6, 3.7, 2.9, 1.1, { strip: C.BURGUNDY });
    s.addText("Two Stars & a Wish", {
      x: 6.85, y: 3.8, w: 2.5, h: 0.3,
      fontSize: 13, fontFace: FONT_H, color: C.BURGUNDY, bold: true, margin: 0,
    });
    s.addImage({ data: icons.star, x: 6.85, y: 4.15, w: 0.22, h: 0.22 });
    s.addText("Two things done well", {
      x: 7.15, y: 4.13, w: 2.2, h: 0.24,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
    s.addImage({ data: icons.heart, x: 6.85, y: 4.42, w: 0.22, h: 0.22 });
    s.addText("One thing to improve", {
      x: 7.15, y: 4.4, w: 2.2, h: 0.24,
      fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });

    addFooter(s, FOOTER);

    s.addNotes(`SAY:
\u2022 Time for review \u2014 this checklist covers your ENTIRE narrative, not just the conclusion
\u2022 Read your narrative from the very beginning using the checklist
\u2022 Ask yourself: Does the introduction hook the reader? Does the action build tension? Does the complication challenge the character? Does the resolution address it? Does the conclusion wrap it up?
\u2022 Check for mental verbs and adjectives throughout
\u2022 Check spelling, punctuation, and grammar
\u2022 Most importantly: does it have a consistent voice? Does it sound like the same person telling the story from beginning to end?
\u2022 After self-review, swap books with a partner \u2014 read their COMPLETE narrative
\u2022 Give two stars and a wish: two specific things done well (not just \u201Cit\u2019s good\u201D) and one thing to improve
\u2022 Be kind but honest \u2014 this is how writers get better

DO:
- Give 3-4 minutes for self-review with checklist
- Then 5-6 minutes for partner sharing
- Monitor partner feedback \u2014 redirect if too vague (\u201CIt\u2019s good\u201D) or too harsh
- Model the feedback format: \u201CI like how you... I wonder if you could...\u201D
- Collect writing books at the end or have students keep them for Week 4

TEACHER NOTES:
This is E in DECIDE: Embed through editing and peer review. The whole-narrative checklist is comprehensive and covers every element taught across Weeks 1-3. This is the first time many students will read their complete narrative in sequence. Partner feedback (two stars and a wish) provides structured peer review that is both supportive and constructive. Students who have been absent for lessons may have gaps \u2014 this review process will make those gaps visible, which is useful for Week 4 planning. The consistent voice question is sophisticated \u2014 some students may have written in different styles across weeks. VTLM 2.0: Peer assessment and self-assessment as learning tools.

WATCH FOR:
- Students who skip the self-review and go straight to partner sharing \u2014 insist on self-review first
- Vague feedback: \u201CIt\u2019s good\u201D \u2014 model specific feedback and redirect
- Students embarrassed to share \u2014 pair them with a supportive partner or offer to be their partner
- Students who discover their narrative doesn\u2019t flow \u2014 reassure: \u201CThat\u2019s what editing is for. You can improve it in Week 4.\u201D
- Students who have genuine gaps (missing paragraphs) \u2014 note these for planning; they may need catch-up time

[General: Review & Edit | VTLM 2.0: Peer Assessment]`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 14 — Closing / Reflection
  // ═══════════════════════════════════════════════════════════════════════════
  closingSlide(
    pres,
    "You\u2019ve just completed an entire narrative \u2014 from introduction to conclusion. Think about YOUR story. What are you most proud of? If Morpurgo were reading your narrative, what would he notice about your writing? Share with your partner.",
    [
      "A conclusion wraps up the story and shows character growth",
      "Mental verbs and adjectives create emotional depth",
      "Real war horses like Warrior remind us these stories matter",
      "You now have a complete narrative draft \u2014 that\u2019s a huge achievement!",
    ],
    `SAY:
\u2022 Pens down \u2014 take a moment to think about what you\u2019ve done, not just today but over three weeks
\u2022 Week 1: created a character, built a world, wrote a hook
\u2022 Week 2: action paragraphs, built tension, created a complication
\u2022 This week: resolved the problem, and TODAY wrote the ending
\u2022 You have a COMPLETE narrative \u2014 introduction to conclusion \u2014 all written by you
\u2022 Ask: If Michael Morpurgo picked up your narrative and read it, what would he notice? Your setting? Your character\u2019s emotions? The way you built tension?
\u2022 Turn to your partner and share: what are you most proud of? [Allow 90 seconds, then take 3\u20134 shares]
\u2022 Read from slide: key takeaways
\u2022 A conclusion wraps up the story and shows character growth
\u2022 Mental verbs and adjectives create emotional depth that makes readers FEEL something
\u2022 Warrior\u2019s real story reminds us these stories matter, whether real or fictional
\u2022 Biggest takeaway: you now have a complete narrative draft \u2014 a HUGE achievement
\u2022 Give yourselves a round of applause
\u2022 Foreshadow: next week, persuasive writing begins \u2014 you\u2019ll carry everything you\u2019ve learned about language, structure, and craft

DO:
- Give genuine time for partner sharing \u2014 don\u2019t rush this
- Take 3-4 whole-class shares \u2014 celebrate specific examples
- Applause or celebration moment \u2014 this is earned
- Brief foreshadow of Week 4 (persuasive writing) but don\u2019t dwell
- Collect writing books if needed for assessment

TEACHER NOTES:
This is the culmination of a three-week narrative writing arc. The reflection prompt connects personal pride to the author study (Morpurgo). The Warrior connection reinforces that stories \u2014 real and fictional \u2014 have power. The four takeaways summarise the lesson and the entire Week 3 arc. The foreshadow of Week 4 (persuasive writing) signals a shift but doesn\u2019t diminish today\u2019s achievement. This moment matters: students who see themselves as writers will write better. The applause isn\u2019t frivolous \u2014 it\u2019s recognition of sustained effort over three weeks. Use this data formatively: which students completed all paragraphs? Which need catch-up? Which showed the most growth? VTLM 2.0: Celebration of learning, metacognitive reflection.

WATCH FOR:
- Students who can\u2019t identify what they\u2019re proud of \u2014 prompt specifically: \u201CWhat about your character\u2019s feelings in the conclusion?\u201D
- Students who are already thinking about revisions \u2014 affirm: \u201CThat\u2019s exactly what good writers do\u201D
- Students who seem deflated rather than celebratory \u2014 private check-in; they may need encouragement
- Note which students completed all paragraphs for assessment records

[General: Reflection | VTLM 2.0: Metacognitive Reflection]`
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // Write file
  // ═══════════════════════════════════════════════════════════════════════════
  await pres.writeFile({ fileName: "output/WH_Lesson15.pptx" });
  console.log("Saved: output/WH_Lesson15.pptx");
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
