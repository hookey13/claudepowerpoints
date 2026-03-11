// OG Open Tulip Rule - Session 1: Introduction
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
const FOOTER = "OG  |  Open Tulip Rule  |  Session 1  |  Year 5/6";

// ── Teacher notes ─────────────────────────────────────────────────────────────

const NOTES_IDO = `SAY:
- "We're learning a new syllable division rule today called the Open Tulip Rule."
- "An open syllable is one that ends with a vowel. When a syllable is open, the vowel says its name - its long sound."
- "Watch me with the word TULIP. I need to find the VCV pattern - vowel, consonant, vowel."
- "U is a vowel, L is a consonant, I is a vowel. That's my VCV."
- "The Open Tulip Rule says: divide BEFORE the consonant. So I split here: TU... LIP."
- "TU ends with a vowel - it's open. The U says its name: /yoo/. TU-LIP."
- Ask: "What makes that first syllable open?" [It ends with a vowel - there's no consonant closing it off.]

DO:
- Point to the TU and LIP syllable boxes on the right of the slide as you model.
- Trace under the V-C-V letters with your finger.
- Say the word clearly with the long vowel: /TYOO-lip/.
- After modelling, students say it with you: "TU... LIP. Together."

TEACHER NOTES:
The Open Tulip Rule (V/CV syllable division) is a core OG syllable type. When a syllable ends in a vowel (is "open"), the vowel makes its long/name sound. TULIP is the keyword because its first syllable is a clear open syllable with a long U.

MISCONCEPTIONS:
- Misconception: Every VCV word divides V/CV with a long vowel.
  Why: Overgeneralisation - some VCV words divide VC/V with a short vowel (e.g., camel, lemon).
  Impact: Students mispronounce words when V/CV does not produce a real word.
  Quick correction: "We always TRY V/CV first. If it doesn't sound like a word you know, we try the other split. Today all our words follow the Tulip Rule."

WATCH FOR:
- Students who confuse vowels and consonants when identifying VCV. Correction: quickly review the five vowels (a, e, i, o, u).
- Students who divide after the consonant (TUL/IP instead of TU/LIP) - they are applying a closed syllable pattern. Redirect to the rule.
- Readiness signal: students can say "open syllable ends in a vowel, vowel says its name."

[OG: New Concept - Syllabication | VTLM 2.0: Explicit Explanation and Modelling]`;

const NOTES_WEDO = `SAY:
- "Let's try this together. Same steps every time."
- "First word: ROBOT. Find the vowels for me." [O and O, with B between them.]
- "VCV pattern: O-B-O. Divide before the consonant: RO... BOT."
- "Is RO open? Yes - ends in a vowel. O says its name: /oh/. RO-BOT."
- "Next word on your whiteboard. Find the VCV, divide before the consonant, read it."
- After each word: "Boards up. Show me where you divided."

DO:
- Work through ROBOT as a class.
- Release one word at a time for whiteboard practice.
- After each word, "boards up" and scan for correct division.
- Cold call 2-3 students to explain their thinking.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
- "Write SILENT on your whiteboard. Draw a line where you divide it. Write O under the open syllable. Boards up in 15 seconds."
- Scan for: SI / LENT with O under SI. Key check: division BEFORE the L, not after it.
PROCEED: If >=80% divide correctly at SI/LENT, move to You Do.
PIVOT: Most likely error is dividing after the consonant (SIL/ENT). Reteach: "Remember - Tulip Rule means we go BEFORE the consonant. The consonant belongs to the second syllable. Watch: S-I, then L starts the next syllable. SI... LENT. SI ends in a vowel - open - I says its name."

TEACHER NOTES:
Guided practice follows the same three-step process: (1) find VCV, (2) divide before consonant, (3) check open syllable has long vowel. All five words are clean Open Tulip Rule examples, building confidence before exceptions appear in later sessions.

WATCH FOR:
- Students dividing after the consonant (MUS/IC instead of MU/SIC) - they are applying a closed syllable pattern.
- Students who divide correctly but produce a short vowel sound - they need phoneme review for long vowels.
- Readiness signal: students dividing 3/5 words correctly within 10 seconds each.

[OG: Syllabication - We Do | VTLM 2.0: Scaffold Practice]`;

const NOTES_YOUDO = `SAY:
- "Your turn to practise independently."
- "You have six words. Same routine."
- "First: find the VCV pattern. Next: draw the division line before the consonant. Then: read the word using the long vowel."
- "Work with your partner. Partner A does the first three, Partner B does the last three. Then check each other."

DO:
- Direct students to complete the activity in their OG books.
- Set 3-4 minutes for partner work.
- Circulate, starting with students who struggled during We Do.

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Reduce to the first three words only (pilot, tiger, bonus). Provide vowels pre-highlighted and ask the student to identify just the consonant between them, then draw the division line.
EXTENDING PROMPT:
- Task: After dividing all six words, write a sentence using two of the words and underline the open syllable in each.

TEACHER NOTES:
Independent practice solidifies the V/CV division process. All six words are reliable open-syllable examples. Students work in OG books for easy review or collection.

WATCH FOR:
- Students rushing without checking whether the divided word sounds right - remind them to read aloud after dividing.
- Students who divide correctly but revert to short vowels when reading. Prompt: "Is that syllable open or closed? What does the vowel do?"
- Readiness signal: students correctly dividing and reading 5/6 words with long vowel sounds.

[OG: Syllabication - You Do | VTLM 2.0: Supported Application]`;

// ── Build ─────────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  const cardH = SAFE_BOTTOM - CONTENT_TOP;

  // ═══════════════════════════════════════════════════════════════════════════════
  // SLIDE 1: I Do - The Open Tulip Rule
  // ═══════════════════════════════════════════════════════════════════════════════

  const s1 = pres.addSlide();
  addTopBar(s1, C.PRIMARY);
  addBadge(s1, "I Do - Watch Me", { color: C.PRIMARY, w: 2.2 });
  addTitle(s1, "The Open Tulip Rule");

  // Left card — Rule
  addInstructionCard(s1, [
    { text: "The Rule", role: "header" },
    { text: "", role: "spacer" },
    { text: "Find the VCV pattern" },
    { text: "(Vowel - Consonant - Vowel)", italic: true, color: C.MUTED, fontSize: 11 },
    { text: "", role: "spacer" },
    { text: "Divide BEFORE the consonant", bold: true },
    { text: "V / CV", role: "emphasis", fontSize: 22, color: C.PRIMARY },
    { text: "", role: "spacer" },
    { text: "First syllable is OPEN" },
    { text: "Vowel says its NAME", role: "emphasis", color: C.ACCENT },
  ], {
    x: 0.5, y: CONTENT_TOP, w: 4.3, h: cardH,
    strip: C.PRIMARY, fill: C.WHITE,
    headerColor: C.PRIMARY,
  });

  // Right card — TULIP visual demonstration
  addCard(s1, 5.0, CONTENT_TOP, 4.5, cardH, { strip: C.ACCENT, fill: C.BG_CARD });

  s1.addText("Example", {
    x: 5.2, y: CONTENT_TOP + 0.1, w: 2, h: 0.28,
    fontSize: 11, fontFace: FONT_B, color: C.CHARCOAL, bold: true, margin: 0,
  });

  // TU syllable box
  addTextOnShape(s1, "TU",
    { x: 5.4, y: CONTENT_TOP + 0.6, w: 1.7, h: 0.9, rectRadius: 0.12, fill: C.PRIMARY },
    { fontSize: 36, fontFace: FONT_H, color: C.WHITE, bold: true }
  );

  // Division slash
  s1.addText("/", {
    x: 7.15, y: CONTENT_TOP + 0.6, w: 0.3, h: 0.9,
    fontSize: 32, fontFace: FONT_H, color: C.CHARCOAL,
    align: "center", valign: "middle", margin: 0,
  });

  // LIP syllable box
  addTextOnShape(s1, "LIP",
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
  addTextOnShape(s1, "u says its name -> /yoo/",
    { x: 5.3, y: CONTENT_TOP + 2.55, w: 4.0, h: 0.45, rectRadius: 0.1, fill: C.PRIMARY },
    { fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true }
  );

  addFooter(s1, FOOTER);
  s1.addNotes(NOTES_IDO);

  // ═══════════════════════════════════════════════════════════════════════════════
  // SLIDE 2: We Do - Divide Together
  // ═══════════════════════════════════════════════════════════════════════════════

  const s2 = pres.addSlide();
  addTopBar(s2, C.SECONDARY);
  addBadge(s2, "We Do - Together", { color: C.SECONDARY, w: 2.2 });
  addTitle(s2, "Divide Together");

  // Left card — Steps reference
  addInstructionCard(s2, [
    { text: "Our Steps", role: "header" },
    { text: "", role: "spacer" },
    { text: "1. Find the VCV pattern" },
    { text: "2. Divide before the consonant" },
    { text: "3. Read with the long vowel" },
    { text: "", role: "spacer" },
    { text: "Write each word on your whiteboard", role: "emphasis" },
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

  ["robot", "music", "silent", "frozen", "basic"].forEach((word, i) => {
    addTextOnShape(s2, word,
      { x: 5.4, y: CONTENT_TOP + 0.55 + i * 0.6, w: 3.7, h: 0.48, rectRadius: 0.08, fill: C.WHITE },
      { fontSize: 22, fontFace: FONT_H, color: C.PRIMARY, bold: true }
    );
  });

  addFooter(s2, FOOTER);
  s2.addNotes(NOTES_WEDO);

  // ═══════════════════════════════════════════════════════════════════════════════
  // SLIDE 3: You Do - Your Turn
  // ═══════════════════════════════════════════════════════════════════════════════

  const s3 = pres.addSlide();
  addTopBar(s3, C.PRIMARY);
  addBadge(s3, "You Do - Your Turn", { color: C.PRIMARY, w: 2.3 });
  addTitle(s3, "Your Turn");

  // Left card — Instructions
  addInstructionCard(s3, [
    { text: "In Your OG Book", role: "header" },
    { text: "", role: "spacer" },
    { text: "First: Find the VCV pattern" },
    { text: "Next: Divide before the consonant" },
    { text: "Then: Read with the long vowel" },
    { text: "", role: "spacer" },
    { text: "Partner A -> first three words", role: "emphasis" },
    { text: "Partner B -> last three words", role: "emphasis" },
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

  ["pilot", "tiger", "bonus", "human", "spider", "broken"].forEach((word, i) => {
    addTextOnShape(s3, word,
      { x: 5.4, y: CONTENT_TOP + 0.55 + i * 0.55, w: 3.7, h: 0.44, rectRadius: 0.08, fill: C.WHITE },
      { fontSize: 20, fontFace: FONT_H, color: C.PRIMARY, bold: true }
    );
  });

  addFooter(s3, FOOTER);
  s3.addNotes(NOTES_YOUDO);

  // ── Write ───────────────────────────────────────────────────────────────────
  fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: `${OUT_DIR}/OG Open Tulip Session 1.pptx` });
  console.log("Session 1 written to", OUT_DIR);
}

build().catch(console.error);
