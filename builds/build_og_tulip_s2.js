// OG Open Tulip Rule - Session 2: Consolidation
// Year 5/6 Literacy - Orton-Gillingham Syllabication Component
// 3 slides: I Do, We Do, You Do

"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const { createTheme } = require("../themes/factory");

const T = createTheme("literacy", "grade56", 0);
const {
  C, FONT_H, FONT_B,
  addTopBar, addBadge, addTitle, addCard, addFooter, addTextOnShape,
  addInstructionCard,
  SAFE_BOTTOM, CONTENT_TOP,
} = T;

const OUT_DIR = "output/OG_Open_Tulip";
const FOOTER = "OG  |  Open Tulip Rule  |  Session 2  |  Year 5/6";

// ── Teacher notes ─────────────────────────────────────────────────────────────

const NOTES_IDO = `SAY:
- "Let's use the Open Tulip Rule again with a new word."
- "My word is LABEL. Watch me find the VCV pattern."
- "L-A-B-E-L. A is a vowel, B is a consonant, E is a vowel. VCV: A-B-E."
- "Open Tulip Rule: divide BEFORE the consonant. LA... BEL."
- "LA ends with a vowel - open syllable. A says its name: /ay/. LA-BEL."
- Ask: "What would happen if I divided the other way - LAB... EL?" [It would sound like /lab-el/ with a short A - that doesn't sound right.]
- "So I check: does /LAY-bel/ sound like a word I know? Yes. The Tulip Rule works."

DO:
- Point to the LA and BEL syllable boxes as you model the division.
- After modelling, confirm with students: "Does /LAY-bel/ sound like a word you know? Thumbs up or down."
- If time, model one more word verbally: FEVER -> FE/VER -> /FEE-ver/.

TEACHER NOTES:
Session 2 deepens the I Do by modelling the decision-making process - trying the division and confirming it produces a real word. This sets up the flexibility students will need when they meet VCV words that divide VC/V (e.g., camel) in future sessions. Today, all words still follow the Open Tulip Rule.

WATCH FOR:
- Students who remember the rule from Session 1 and anticipate the division - positive sign of consolidation.
- Students who still hesitate identifying vowels vs consonants - may need a vowel reference card.
- Readiness signal: students can articulate the three steps without prompting.

[OG: Syllabication - I Do Review | VTLM 2.0: Explicit Explanation and Modelling]`;

const NOTES_WEDO = `SAY:
- "Let's try five new words together."
- "Same routine: find VCV, divide before the consonant, read with the long vowel."
- "First word: MOTOR. Who can spot the VCV pattern?" [O-T-O]
- "Where do we divide?" [Before the T: MO/TOR]
- "Is MO open?" [Yes - ends in O.] "What sound?" [/oh/] "MO-TOR."
- After all five: "What's the same about all of these words?" [They all have VCV, divide V/CV, first syllable is open with a long vowel.]

DO:
- Work through MOTOR as a class. Then release one word at a time on whiteboards.
- Cold call a different student for each word to identify the VCV pattern.
- After all five, ask the pattern-recognition question.

CFU CHECKPOINT:
Technique: Cold Call with Whiteboard Verification
Script:
- "Write CEDAR on your whiteboard. Divide it using the Open Tulip Rule. Boards up."
- Cold call: "Tell me the VCV pattern you found, where you divided, and what the first vowel says."
- Scan for: CE/DAR with long E (/SEE-dar/).
PROCEED: If >=80% divide correctly and articulate the long vowel, move to You Do.
PIVOT: Most likely error is misidentifying the VCV pattern. Reteach by isolating: "Let me highlight the vowels. C is a consonant, E is a vowel, D is a consonant, A is a vowel. E-D-A is my VCV. Divide before the D: CE... DAR."

TEACHER NOTES:
Guided practice in Session 2 uses five new words and adds cold calling for explanation (not just answers). This checks deeper understanding of the rule, not just procedural recall. The final reflection question builds pattern recognition across examples.

WATCH FOR:
- Students who divide correctly but cannot explain WHY - they may be copying mechanically. Prompt: "Why before the consonant? What does that do to the syllable?"
- Students who struggle with the vowel sounds of E and U specifically - trickiest open-syllable vowels for Australian speakers.
- Readiness signal: students dividing new words within 5 seconds and reading fluently.

[OG: Syllabication - We Do | VTLM 2.0: Scaffold Practice]`;

const NOTES_YOUDO = `SAY:
- "Time to work independently. Six words in your OG book."
- "First: find the VCV pattern. Next: draw the division line before the consonant. Then: read the word to your partner using the long vowel."
- "After you've divided all six, read them to your partner. If they disagree with a division, discuss it."

DO:
- Direct students to their OG books.
- Set 4 minutes for independent work, then 1 minute for partner checking.
- Circulate from the back of the room forward.

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Reduce to three words (open, hotel, moment). Provide vowels pre-highlighted. Student identifies the consonant between vowels and draws the division line only.
EXTENDING PROMPT:
- Task: After dividing all six words, find three more words that follow the Open Tulip Rule from their current reading book. Underline the open syllable in each.

TEACHER NOTES:
Session 2 You Do includes slightly more complex words where students must isolate the correct VCV junction within longer letter sequences. Partner checking adds a peer verification layer.

WATCH FOR:
- Students who divide at every consonant rather than finding the specific VCV junction - they may be confusing syllable division with letter separation.
- Students who apply the rule correctly but read with short vowels due to Australian pronunciation habits. Prompt: "Is that syllable open or closed?"
- Readiness signal: students correctly dividing 5/6 words and finding their own examples from reading.

[OG: Syllabication - You Do | VTLM 2.0: Supported Application]`;

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  const cardH = SAFE_BOTTOM - CONTENT_TOP;

  // ═══════════════════════════════════════════════════════════════════════════════
  // SLIDE 1: I Do - Open Tulip Rule in Action
  // ═══════════════════════════════════════════════════════════════════════════════

  const s1 = pres.addSlide();
  addTopBar(s1, C.PRIMARY);
  addBadge(s1, "I Do - Watch Me", { color: C.PRIMARY, w: 2.2 });
  addTitle(s1, "Open Tulip Rule in Action");

  // Left card — Rule review
  addInstructionCard(s1, [
    { text: "Open Tulip Rule", role: "header" },
    { text: "", role: "spacer" },
    { text: "VCV -> divide V / CV" },
    { text: "Open syllable = vowel says its name" },
    { text: "", role: "spacer" },
    { text: "Try it. Does it sound right?", role: "emphasis" },
    { text: "If yes -> Tulip Rule works!", bold: true, color: C.SECONDARY },
  ], {
    x: 0.5, y: CONTENT_TOP, w: 4.3, h: cardH,
    strip: C.PRIMARY, fill: C.WHITE,
    headerColor: C.PRIMARY,
  });

  // Right card — LABEL visual demonstration
  addCard(s1, 5.0, CONTENT_TOP, 4.5, cardH, { strip: C.ACCENT, fill: C.BG_CARD });

  s1.addText("Example", {
    x: 5.2, y: CONTENT_TOP + 0.1, w: 2, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
  });

  // LA syllable box
  addTextOnShape(s1, "LA",
    { x: 5.4, y: CONTENT_TOP + 0.6, w: 1.7, h: 0.9, rectRadius: 0.12, fill: C.PRIMARY },
    { fontSize: 36, fontFace: FONT_H, color: C.WHITE, bold: true }
  );

  // Division slash
  s1.addText("/", {
    x: 7.15, y: CONTENT_TOP + 0.6, w: 0.3, h: 0.9,
    fontSize: 32, fontFace: FONT_H, color: C.CHARCOAL,
    align: "center", valign: "middle", margin: 0,
  });

  // BEL syllable box
  addTextOnShape(s1, "BEL",
    { x: 7.5, y: CONTENT_TOP + 0.6, w: 1.7, h: 0.9, rectRadius: 0.12, fill: C.SECONDARY },
    { fontSize: 36, fontFace: FONT_H, color: C.WHITE, bold: true }
  );

  // OPEN / CLOSED labels
  s1.addText("OPEN", {
    x: 5.4, y: CONTENT_TOP + 1.6, w: 1.7, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: C.PRIMARY, bold: true,
    align: "center", margin: 0,
  });
  s1.addText("CLOSED", {
    x: 7.5, y: CONTENT_TOP + 1.6, w: 1.7, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: C.SECONDARY, bold: true,
    align: "center", margin: 0,
  });

  // VCV pattern display
  s1.addText([
    { text: "V", options: { color: C.ACCENT, bold: true, fontSize: 18 } },
    { text: "  C  ", options: { color: C.MUTED, fontSize: 18 } },
    { text: "V", options: { color: C.ACCENT, bold: true, fontSize: 18 } },
  ], {
    x: 5.4, y: CONTENT_TOP + 2.0, w: 3.8, h: 0.35,
    fontFace: FONT_B, align: "center", valign: "middle", margin: 0,
  });

  // Key takeaway pill
  addTextOnShape(s1, "a says its name -> /ay/",
    { x: 5.3, y: CONTENT_TOP + 2.55, w: 4.0, h: 0.45, rectRadius: 0.1, fill: C.PRIMARY },
    { fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true }
  );

  addFooter(s1, FOOTER);
  s1.addNotes(NOTES_IDO);

  // ═══════════════════════════════════════════════════════════════════════════════
  // SLIDE 2: We Do - Practice Together
  // ═══════════════════════════════════════════════════════════════════════════════

  const s2 = pres.addSlide();
  addTopBar(s2, C.SECONDARY);
  addBadge(s2, "We Do - Together", { color: C.SECONDARY, w: 2.2 });
  addTitle(s2, "Practice Together");

  // Left card — Steps reference
  addInstructionCard(s2, [
    { text: "Our Steps", role: "header" },
    { text: "", role: "spacer" },
    { text: "1. Find the VCV pattern" },
    { text: "2. Divide before the consonant" },
    { text: "3. Read with the long vowel" },
    { text: "", role: "spacer" },
    { text: "Explain your thinking when called", role: "emphasis" },
  ], {
    x: 0.5, y: CONTENT_TOP, w: 4.3, h: cardH,
    strip: C.PRIMARY, fill: C.WHITE,
    headerColor: C.PRIMARY,
    emphasisColor: C.SECONDARY,
  });

  // Right card — Practice words
  addCard(s2, 5.0, CONTENT_TOP, 4.5, cardH, { strip: C.SECONDARY, fill: C.BG_CARD });
  s2.addText("Practice Words", {
    x: 5.2, y: CONTENT_TOP + 0.1, w: 3, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: C.SECONDARY, bold: true, margin: 0,
  });

  ["motor", "paper", "fever", "cedar", "final"].forEach((word, i) => {
    addTextOnShape(s2, word,
      { x: 5.4, y: CONTENT_TOP + 0.55 + i * 0.6, w: 3.7, h: 0.48, rectRadius: 0.08, fill: C.WHITE },
      { fontSize: 22, fontFace: FONT_H, color: C.PRIMARY, bold: true }
    );
  });

  addFooter(s2, FOOTER);
  s2.addNotes(NOTES_WEDO);

  // ═══════════════════════════════════════════════════════════════════════════════
  // SLIDE 3: You Do - Independent Practice
  // ═══════════════════════════════════════════════════════════════════════════════

  const s3 = pres.addSlide();
  addTopBar(s3, C.PRIMARY);
  addBadge(s3, "You Do - Your Turn", { color: C.PRIMARY, w: 2.3 });
  addTitle(s3, "Independent Practice");

  // Left card — Instructions
  addInstructionCard(s3, [
    { text: "In Your OG Book", role: "header" },
    { text: "", role: "spacer" },
    { text: "First: Find the VCV pattern" },
    { text: "Next: Divide before the consonant" },
    { text: "Then: Read the word to your partner" },
    { text: "", role: "spacer" },
    { text: "Discuss any disagreements", role: "emphasis" },
  ], {
    x: 0.5, y: CONTENT_TOP, w: 4.3, h: cardH,
    strip: C.PRIMARY, fill: C.WHITE,
    headerColor: C.PRIMARY,
  });

  // Right card — Practice words
  addCard(s3, 5.0, CONTENT_TOP, 4.5, cardH, { strip: C.PRIMARY, fill: C.BG_CARD });
  s3.addText("Practice Words", {
    x: 5.2, y: CONTENT_TOP + 0.1, w: 3, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
  });

  ["open", "hotel", "moment", "locate", "female", "total"].forEach((word, i) => {
    addTextOnShape(s3, word,
      { x: 5.4, y: CONTENT_TOP + 0.55 + i * 0.55, w: 3.7, h: 0.44, rectRadius: 0.08, fill: C.WHITE },
      { fontSize: 20, fontFace: FONT_H, color: C.PRIMARY, bold: true }
    );
  });

  addFooter(s3, FOOTER);
  s3.addNotes(NOTES_YOUDO);

  // ── Write ───────────────────────────────────────────────────────────────────
  fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: `${OUT_DIR}/OG Open Tulip Session 2.pptx` });
  console.log("Session 2 written to", OUT_DIR);
}

build().catch(console.error);
