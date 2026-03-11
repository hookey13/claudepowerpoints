// Session 1 of 3: Change Y to I Suffix Rule
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
const FOOTER = "OG Spelling | Suffix Rules | Session 1";

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
- "We're learning a spelling rule that helps us add suffixes to words ending in Y."
- "Look at 'happy'. If I want to add -er, I can't just stick it on - 'happyer' isn't right."
- "The rule: when a word ends in a consonant then Y, we change the Y to I before adding the suffix."
- "Watch: h-a-p-p-y. Before the Y is P - that's a consonant. Change Y to I: h-a-p-p-i. Add -er: happier."
- "More: carry + -ed. Before the Y? R - consonant. Change Y to I: carri. Add -ed: carried."
- "But two exceptions. If the suffix starts with I, keep the Y. Otherwise we'd get double I: carriing."
- "And if there's a VOWEL before the Y, like in 'play', keep the Y: played, not plaied."

DO:
- Point to each transformation on the slide as you model it.
- Underline or tap the consonant before Y in each example.
- Point to the exceptions card and explain both cases clearly.
- Have students repeat the rule: "Consonant plus Y - change Y to I."

TEACHER NOTES:
This slide teaches the change-y-to-i suffix rule, a core OG suffixation pattern. The two exceptions (suffix starts with i, and vowel + y) must be modelled explicitly to prevent overgeneralisation.

MISCONCEPTIONS:
- Misconception: Students apply the rule to ALL words ending in y, including vowel + y words (play -> plaied).
  Why: Overgeneralisation - the rule feels universal once learned.
  Impact: Persistent misspelling of played, stayed, enjoyed, delayed.
  Quick correction: "Check the letter BEFORE the y. Vowel before y means the y stays."

WATCH FOR:
- Students who cannot identify consonants vs vowels - prerequisite gap that must be addressed first.
- Students who try to apply the rule to 'play' or 'stay' - redirect to check the letter before y.
- Readiness signal: students can state the rule and explain both exceptions.

[OG: New Phonogram/Morpheme | VTLM 2.0: Explicit Explanation]`;

const NOTES_WEDO = `SAY:
- "Let's try this together. For each word, check: does it end in consonant + y?"
- "Number 1 together. Worry + -ed. Before the y? R - consonant. Change y to i: worri. Add -ed: worried."
- "Now work with your partner on 2 through 5. Say the new word to each other before you agree."

DO:
- Work through item 1 (worry + -ed) as a class.
- Allow 60 seconds for partners to work through items 2-5.
- Click to next slide to reveal answers after discussion.

CFU CHECKPOINT:
Technique: Turn and Talk with Choral Response
Script:
- "Check with your partner. Number 2 - lazy + -ness. Everyone together..." [laziness]
- "Number 4 - plenty + -ful. Together..." [plentiful]
- Scan for: correct y-to-i change in choral responses. Listen for students who keep the y.
PROCEED: If >=80% produce correct answers, move to You Do slide.
PIVOT: If students struggle, model one more: "Easy + -er. Before y? S - consonant. Change y to i: easi. Add -er: easier. Now try busy + -ly yourself." Then re-check with choral response.

TEACHER NOTES:
Guided practice with reveal pair. Item 1 is teacher-led. Items 2-5 are partner work. All five are straightforward applications with no exceptions, building confidence before independent practice.

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Give these students just two words (worry + -ed, happy + -er). Have them circle the consonant before Y first, then write the new word step-by-step.

EXTENDING PROMPT:
- Task: Students write three original sentences, each using a word that requires the change-y-to-i rule. They underline the transformed word and note the base + suffix in the margin.

WATCH FOR:
- Students who forget to add the suffix after changing y to i (writing 'worri' instead of 'worried').
- Students who change y to i even when the suffix starts with i.
- Readiness signal: fast, confident answers with correct spelling.

[OG: Auditory Spelling | VTLM 2.0: Scaffold Practice]`;

const NOTES_YOUDO = `SAY:
- "Your turn. In your OG book, add the suffix to each word."
- "Remember: consonant before y means change y to i, then add the suffix."
- "Watch out for number 6. Check whether the suffix starts with I."
- "If you finish early, write a sentence using two of your new words."

DO:
- Display the slide and read the word list aloud once.
- Circulate as students work. Check spelling in OG books.
- Target students who struggled during We Do for immediate feedback.

TEACHER NOTES:
Five straightforward applications plus one exception test (hurry + -ing = hurrying). Item 6 is diagnostic - it reveals who has internalised the suffix-starts-with-i exception.

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Students complete only the first three words (heavy + -est, tidy + -ed, happy + -ness). Provide the rule on a desk card for reference.

EXTENDING PROMPT:
- Task: Students sort these words into 'change y to i' vs 'keep the y' and explain why: enjoying, loneliness, supplying, happily, delaying, pitiful.

WATCH FOR:
- Students who write 'hurriing' instead of 'hurrying' - applying the rule but missing the exception.
- Students who are slow or uncertain - note for reteaching in next session.
- Readiness signal: all six correct within 3-4 minutes, including 'hurrying'.

[OG: Auditory Spelling | VTLM 2.0: Supported Application]`;

// ── Build ───────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  // ── SLIDE 1: I Do — Change Y to I Rule ──────────────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addBadge(s, "I Do", { color: C.PRIMARY });
    addTitle(s, "Suffix Rule: Change Y to I");

    // Rule card (coloured background)
    addCard(s, 0.5, CONTENT_TOP, 9, 0.65, { fill: C.PRIMARY });
    s.addText("When a word ends in consonant + Y, change the Y to I before adding a suffix.", {
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
      ...wordLine("happy", "-er", "happier"),
      ...wordLine("carry", "-ed", "carried"),
      ...wordLine("beauty", "-ful", "beautiful"),
      ...wordLine("funny", "-ly", "funnily", { isLast: true }),
    ], {
      x: 0.75, y: exY + 0.35, w: 8.5, h: 1.1,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    // Exceptions card
    const excY = CONTENT_TOP + 2.44;
    const excH = SAFE_BOTTOM - excY;
    addCard(s, 0.5, excY, 9, excH, { strip: C.ALERT, fill: C.BG_CARD });
    s.addText("Exceptions \u2014 Keep the Y", {
      x: 0.75, y: excY + 0.06, w: 4, h: 0.25,
      fontSize: 11, fontFace: FONT_B, color: C.ALERT, bold: true, margin: 0,
    });
    s.addText([
      ...wordLine("carry", "-ing", "carrying", { fontSize: 15 }),
      { text: "     (suffix starts with I \u2014 keep the Y)", options: { fontSize: 11, color: C.MUTED, breakLine: true } },
      ...wordLine("play", "-ed", "played", { fontSize: 15, isLast: false }),
      { text: "     (vowel before Y \u2014 keep the Y)", options: { fontSize: 11, color: C.MUTED } },
    ], {
      x: 0.75, y: excY + 0.35, w: 8.5, h: excH - 0.45,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_IDO);
  })();

  // ── SLIDES 2-3: We Do — Apply the Rule (withReveal) ─────────────────────
  const weDoWords = [
    { base: "worry", suffix: "-ed", answer: "worried" },
    { base: "lazy", suffix: "-ness", answer: "laziness" },
    { base: "easy", suffix: "-er", answer: "easier" },
    { base: "plenty", suffix: "-ful", answer: "plentiful" },
    { base: "busy", suffix: "-ly", answer: "busily" },
  ];

  const cardH = 0.48;
  const cardGap = 0.10;
  const wdStartY = CONTENT_TOP + 0.56;

  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addBadge(s, "We Do", { color: C.SECONDARY });
      addTitle(s, "Apply the Change Y to I Rule");

      addTextOnShape(s, "Add the suffix to each word. Use the rule!", {
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
    s.addText("Add the suffix to each word. Write the new word in your OG book.", {
      x: 0.7, y: CONTENT_TOP + 0.06, w: 8.6, h: 0.38,
      fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0, valign: "middle",
    });

    // Word list card
    const listY = CONTENT_TOP + 0.62;
    const listH = SAFE_BOTTOM - listY;
    addCard(s, 0.5, listY, 5.5, listH, { strip: C.ACCENT });

    const youDoWords = [
      { base: "heavy", suffix: "-est" },
      { base: "tidy", suffix: "-ed" },
      { base: "happy", suffix: "-ness" },
      { base: "noisy", suffix: "-ly" },
      { base: "angry", suffix: "-est" },
      { base: "hurry", suffix: "-ing" },
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
      { text: "Consonant + Y", options: { bold: true, fontSize: 13, color: C.PRIMARY, breakLine: true } },
      { text: "= change Y to I", options: { fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 6, breakLine: true } },
      { text: "But keep the Y if:", options: { bold: true, fontSize: 11, color: C.ALERT, breakLine: true } },
      { text: "- suffix starts with I", options: { fontSize: 11, color: C.CHARCOAL, breakLine: true } },
      { text: "- vowel before Y", options: { fontSize: 11, color: C.CHARCOAL } },
    ], {
      x: 6.4, y: listY + 0.28, w: 2.7, h: 1.5,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_YOUDO);
  })();

  // ── Write PPTX ──────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: `${OUT_DIR}/Session 1 - Change Y to I.pptx` });
  console.log("Session 1 PPTX written to " + OUT_DIR);
}

build().catch(console.error);
