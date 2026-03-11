// Session 2 of 3: Drop E Suffix Rule
// OG Spelling — Grade 5/6
// 3 teaching slides: I Do, We Do (with reveal pair), You Do

"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");
const { createTheme } = require("../themes/factory");

const T = createTheme("literacy", "grade56", 0);
const {
  C, FONT_H, FONT_B,
  withReveal,
  addTopBar, addBadge, addTitle, addCard, addFooter, addTextOnShape,
  SAFE_BOTTOM, CONTENT_TOP,
} = T;

const OUT_DIR = path.join(__dirname, "..", "output", "OG_Suffix_Rules");
const FOOTER = "OG Spelling | Suffix Rules | Session 2";

// ── Helpers ─────────────────────────────────────────────────────────────────

function wordLine(base, suffix, result, opts) {
  const o = opts || {};
  const fz = o.fontSize || 16;
  return [
    { text: base, options: { bold: true, fontSize: fz, color: C.PRIMARY } },
    { text: "  +  ", options: { fontSize: fz, color: C.CHARCOAL } },
    { text: suffix, options: { bold: true, fontSize: fz, color: C.ACCENT } },
    { text: "   \u2192   ", options: { fontSize: fz, color: C.MUTED } },
    { text: result, options: { bold: true, fontSize: fz, color: o.resultColor || C.PRIMARY, breakLine: !o.isLast } },
  ];
}

// ── Teacher Notes ───────────────────────────────────────────────────────────

const NOTES_IDO = `SAY:
- "Today we're learning a second suffix rule. This one is about words that end in silent E."
- "Look at 'make'. If I want to add -ing, I can't write 'makeing' - that double E looks wrong."
- "The rule: when a word ends in silent E and the suffix starts with a VOWEL, drop the E first."
- "Watch: m-a-k-e. Drop the E: m-a-k. Add -ing: making."
- "Another: hope + -ing. Drop the E: h-o-p. Add -ing: hoping."
- "But if the suffix starts with a CONSONANT, keep the E. Hope + -ful: hopeful. F is a consonant, so the E stays."
- Ask: "What's the decision you need to make?" [Does the suffix start with a vowel or a consonant?]

DO:
- Point to each transformation on the slide as you model it.
- Write suffix starting letters on the board and sort: vowel start (-ing, -able, -ive, -est) vs consonant start (-ful, -ment, -ly, -ness).
- Have students repeat: "Vowel suffix - drop the E. Consonant suffix - keep the E."

TEACHER NOTES:
The drop-e rule applies when a silent-E word meets a vowel-initial suffix. The silent E's job is to make the preceding vowel long. When a vowel suffix replaces it, the new vowel takes over that role. With consonant suffixes, nothing replaces the E, so it must stay.

MISCONCEPTIONS:
- Misconception: Students drop the E before ALL suffixes, including consonant suffixes (hopful instead of hopeful).
  Why: Overgeneralisation - once the drop-e rule is learned, students apply it everywhere.
  Impact: Consistent misspelling of -ful, -ment, -ness, -ly words.
  Quick correction: "Check the first letter of the suffix. Consonant means keep the E."

WATCH FOR:
- Students who cannot identify whether a suffix starts with a vowel or consonant - prerequisite gap.
- Students who confuse this rule with the change-y-to-i rule - remind them to check the ending of the base word first.
- Readiness signal: students can sort suffixes into vowel-start and consonant-start groups.

[OG: New Phonogram/Morpheme | VTLM 2.0: Explicit Explanation]`;

const NOTES_WEDO = `SAY:
- "Let's practise together. For each word, ask yourself: does the suffix start with a vowel or a consonant?"
- "Number 1. Dance + -ing. Does -ing start with a vowel?" [Yes - I is a vowel] "So we drop the E. Dancing."
- "Work with your partner on 2 through 5. Watch out for number 5 - it might surprise you."

DO:
- Work through item 1 (dance + -ing) as a class.
- Allow 60 seconds for partners to work through items 2-5.
- Click to next slide to reveal answers after discussion.

CFU CHECKPOINT:
Technique: Choral Response
Script:
- "Let's check. Number 2 - create + -ive. Does -ive start with a vowel?" [Yes] "So we..." [drop the E] "Everyone - answer?" [creative]
- "Number 5 - amaze + -ment. Does -ment start with a vowel?" [No - M is a consonant] "So we..." [keep the E] "Answer?" [amazement]
- Scan for: confident choral response on items 1-4 and correct identification that item 5 keeps the E.
PROCEED: If >=80% get all correct including item 5, move to You Do.
PIVOT: If students drop the E on item 5 (writing 'amazment'), pause: "Check - what letter does -ment start with? M. Is M a vowel? No. Consonant suffix means KEEP the E." Re-check with: excite + -ment [excitement] and excite + -ing [exciting]. "Same word, different suffix, different rule."

TEACHER NOTES:
Item 5 (amaze + -ment = amazement) is the diagnostic item. Students who drop the E here have learned the drop-e action but not the decision criterion (vowel vs consonant suffix). The pivot targets this specific gap.

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Give these students only items 1-3 (all vowel suffixes - straightforward drop E). Have them highlight the E they are dropping before writing the new word.

EXTENDING PROMPT:
- Task: Students find three words in their current reading book that end in silent E, then write each word with -ing and -ful added. They note which version drops E and which keeps it, and explain why.

WATCH FOR:
- Students who keep the E on items 1-4 (danceing) - they have not understood the rule yet.
- Students who drop the E on item 5 (amazment) - they are over-applying the rule.
- Readiness signal: all 5 correct, including the exception in item 5.

[OG: Auditory Spelling | VTLM 2.0: Scaffold Practice]`;

const NOTES_YOUDO = `SAY:
- "Your turn now. In your OG book, add the suffix to each word."
- "Remember: check whether the suffix starts with a vowel or a consonant."
- "Vowel suffix - drop the E. Consonant suffix - keep the E."
- "There are some trick ones in there. Read carefully before you write."

DO:
- Display the slide and read the word list aloud once.
- Circulate as students work. Check spelling in OG books.
- Target students who struggled with item 5 in the We Do.

TEACHER NOTES:
The list includes both drop-E cases (explore + -ing, believe + -able, debate + -able, serve + -ing) and keep-E cases (achieve + -ment, complete + -ly). Students must apply the vowel-vs-consonant decision criterion independently.

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Students complete only the three drop-E words (explore + -ing, debate + -able, serve + -ing). Provide a card: "Does the suffix start with a vowel? YES = drop E."

EXTENDING PROMPT:
- Task: Students investigate the 'soft c/g exception' - words like noticeable and courageous where the E stays even with a vowel suffix. They find two more examples and explain why the E is needed.

WATCH FOR:
- Students who write 'completly' (dropping E before consonant suffix -ly) - they need the decision criterion reinforced.
- Students who write 'achievment' (dropping E before -ment) - same issue.
- Readiness signal: all six correct within 3-4 minutes, correctly keeping E where needed.

[OG: Auditory Spelling | VTLM 2.0: Supported Application]`;

// ── Build ───────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  // ── SLIDE 1: I Do — Drop E Rule ─────────────────────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addBadge(s, "I Do", { color: C.PRIMARY });
    addTitle(s, "Suffix Rule: Drop the E");

    // Rule card (coloured background)
    addCard(s, 0.5, CONTENT_TOP, 9, 0.65, { fill: C.PRIMARY });
    s.addText("When a word ends in silent E, drop the E before adding a suffix that starts with a vowel.", {
      x: 0.7, y: CONTENT_TOP + 0.08, w: 8.6, h: 0.5,
      fontSize: 15, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0, valign: "middle",
    });

    // Worked examples card
    const exY = CONTENT_TOP + 0.77;
    addCard(s, 0.5, exY, 9, 1.55, { strip: C.PRIMARY });
    s.addText("Worked Examples", {
      x: 0.75, y: exY + 0.06, w: 4, h: 0.25,
      fontSize: 11, fontFace: FONT_B, color: C.PRIMARY, bold: true, margin: 0,
    });
    s.addText([
      ...wordLine("make", "-ing", "making"),
      ...wordLine("hope", "-ing", "hoping"),
      ...wordLine("love", "-able", "lovable"),
      ...wordLine("excite", "-ing", "exciting", { isLast: true }),
    ], {
      x: 0.75, y: exY + 0.35, w: 8.5, h: 1.1,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Exceptions card
    const excY = CONTENT_TOP + 2.44;
    const excH = SAFE_BOTTOM - excY;
    addCard(s, 0.5, excY, 9, excH, { strip: C.ALERT, fill: C.BG_CARD });
    s.addText("Exception \u2014 Keep the E", {
      x: 0.75, y: excY + 0.06, w: 4, h: 0.25,
      fontSize: 11, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0,
    });
    s.addText([
      { text: "When the suffix starts with a CONSONANT, keep the E:", options: { fontSize: 13, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      ...wordLine("hope", "-ful", "hopeful", { fontSize: 15 }),
      ...wordLine("care", "-ful", "careful", { fontSize: 15, isLast: true }),
    ], {
      x: 0.75, y: excY + 0.35, w: 8.5, h: excH - 0.45,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_IDO);
  })();

  // ── SLIDES 2-3: We Do — Apply the Rule (withReveal) ─────────────────────
  const weDoWords = [
    { base: "dance", suffix: "-ing", answer: "dancing" },
    { base: "create", suffix: "-ive", answer: "creative" },
    { base: "brave", suffix: "-est", answer: "bravest" },
    { base: "use", suffix: "-able", answer: "usable" },
    { base: "amaze", suffix: "-ment", answer: "amazement" },
  ];

  const cardH = 0.48;
  const cardGap = 0.10;
  const wdStartY = CONTENT_TOP + 0.56;

  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addBadge(s, "We Do", { color: C.SECONDARY });
      addTitle(s, "Apply the Drop E Rule");

      addTextOnShape(s, "Add the suffix to each word. Drop E or keep E?", {
        x: 0.5, y: CONTENT_TOP, w: 9, h: 0.42, rectRadius: 0.08,
        fill: { color: C.SECONDARY },
      }, {
        fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true,
      });

      weDoWords.forEach((w, i) => {
        const y = wdStartY + i * (cardH + cardGap);
        addCard(s, 0.5, y, 9, cardH, { strip: C.SECONDARY });
        s.addText([
          { text: (i + 1) + ".  ", options: { bold: true, fontSize: 17, color: C.MUTED } },
          { text: w.base, options: { bold: true, fontSize: 17, color: C.PRIMARY } },
          { text: "  +  ", options: { fontSize: 17, color: C.CHARCOAL } },
          { text: w.suffix, options: { bold: true, fontSize: 17, color: C.ACCENT } },
        ], {
          x: 0.75, y: y + 0.06, w: 5.0, h: cardH - 0.12,
          fontFace: FONT_B, margin: 0, valign: "middle",
        });
      });

      addFooter(s, FOOTER);
      s.addNotes(NOTES_WEDO);
      return s;
    },
    (slide) => {
      weDoWords.forEach((w, i) => {
        const y = wdStartY + i * (cardH + cardGap);
        addTextOnShape(slide, "\u2192  " + w.answer, {
          x: 6.0, y: y + 0.06, w: 3.0, h: cardH - 0.12, rectRadius: 0.08,
          fill: { color: C.SUCCESS },
        }, {
          fontSize: 15, fontFace: FONT_B, color: C.WHITE, bold: true,
        });
      });
    }
  );

  // ── SLIDE 4: You Do — Independent Practice ──────────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addBadge(s, "You Do", { color: C.ACCENT, w: 1.6 });
    addTitle(s, "Your Turn \u2014 In Your OG Book", { color: C.ACCENT });

    // Instruction card
    addCard(s, 0.5, CONTENT_TOP, 9, 0.50, { fill: C.PRIMARY });
    s.addText("Add the suffix to each word. Drop E or keep E? Write the answer in your OG book.", {
      x: 0.7, y: CONTENT_TOP + 0.06, w: 8.6, h: 0.38,
      fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0, valign: "middle",
    });

    // Word list card
    const listY = CONTENT_TOP + 0.62;
    const listH = SAFE_BOTTOM - listY;
    addCard(s, 0.5, listY, 5.5, listH, { strip: C.ACCENT });

    const youDoWords = [
      { base: "explore", suffix: "-ing" },
      { base: "achieve", suffix: "-ment" },
      { base: "believe", suffix: "-able" },
      { base: "debate", suffix: "-able" },
      { base: "serve", suffix: "-ing" },
      { base: "complete", suffix: "-ly" },
    ];

    const wordRuns = [];
    youDoWords.forEach((w, i) => {
      wordRuns.push(
        { text: (i + 1) + ".  ", options: { bold: true, fontSize: 17, color: C.MUTED } },
        { text: w.base, options: { bold: true, fontSize: 17, color: C.PRIMARY } },
        { text: "  +  ", options: { fontSize: 17, color: C.CHARCOAL } },
        { text: w.suffix, options: { bold: true, fontSize: 17, color: C.ACCENT, breakLine: i < youDoWords.length - 1 } },
      );
    });

    s.addText(wordRuns, {
      x: 0.75, y: listY + 0.12, w: 4.8, h: listH - 0.24,
      fontFace: FONT_B, margin: 0, valign: "top",
      paraSpaceAfter: 6,
    });

    // Rule reminder card (right side)
    addCard(s, 6.2, listY + 0.15, 3.1, 1.8, { fill: C.BG_CARD, strip: C.MUTED });
    s.addText([
      { text: "Remember:", options: { bold: true, fontSize: 12, color: C.PRIMARY, breakLine: true } },
      { text: "Silent E + vowel suffix", options: { bold: true, fontSize: 13, color: C.PRIMARY, breakLine: true } },
      { text: "= drop the E", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "But keep the E if:", options: { bold: true, fontSize: 11, color: C.ALERT, breakLine: true } },
      { text: "- suffix starts with a", options: { fontSize: 11, color: C.CHARCOAL, breakLine: true } },
      { text: "  consonant (-ful, -ment, -ly)", options: { fontSize: 11, color: C.CHARCOAL } },
    ], {
      x: 6.4, y: listY + 0.28, w: 2.7, h: 1.5,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_YOUDO);
  })();

  // ── Write PPTX ──────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: `${OUT_DIR}/Session 2 - Drop E.pptx` });
  console.log("Session 2 PPTX written to " + OUT_DIR);
}

build().catch(console.error);
