// Session 3 of 3: Combined Suffix Rules (Change Y to I + Drop E)
// OG Spelling — Grade 5/6
// 3 teaching slides: I Do (recap both rules), We Do (mixed with reveal), You Do

"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");
const { createTheme } = require("../themes/factory");

const T = createTheme("literacy", "grade56", 0);
const {
  C, FONT_H, FONT_B,
  withReveal,
  addTopBar, addBadge, addTitle, addCard, addInstructionCard, addFooter, addTextOnShape,
  SAFE_BOTTOM, CONTENT_TOP,
} = T;

const OUT_DIR = path.join(__dirname, "..", "output", "OG_Suffix_Rules");
const FOOTER = "OG Spelling | Suffix Rules | Session 3";

// ── Teacher Notes ───────────────────────────────────────────────────────────

const NOTES_IDO = `SAY:
- "We've learned two suffix rules. Today we use them together."
- "On the left - Change Y to I. When does it apply?" [When the word ends in consonant + Y]
- "On the right - Drop the E. When does it apply?" [When the word ends in silent E and the suffix starts with a vowel]
- "The key question is: look at the END of the base word. Y or E?"
- "Let me model. Happy + -ness. Ends in Y. Before Y? P - consonant. Change Y to I: happi. Add -ness: happiness."
- "Now: make + -ing. Ends in E. Suffix -ing starts with a vowel. Drop the E: mak + ing = making."

DO:
- Point to both rule cards as you reference them.
- Draw a quick decision tree on the whiteboard: "Step 1: Y or E? Step 2: Apply the right rule."
- Run through both examples slowly, pointing to the relevant rule card as you go.

TEACHER NOTES:
This session integrates both suffix rules into a decision framework. The cognitive challenge is selecting the correct rule, not applying it. The decision tree reduces cognitive load by giving students a structured routine.

WATCH FOR:
- Students who jump to applying a rule without first identifying which rule is needed.
- Students who are confident with one rule but shaky on the other - note which rule needs more practice.
- Readiness signal: students can quickly identify which rule applies and articulate why.

[OG: Review / Learned Words | VTLM 2.0: Explicit Explanation]`;

const NOTES_WEDO = `SAY:
- "Mixed practice now. For each word, decide: which rule applies?"
- "First one together. Hurry + -ing. Ends in Y. But the suffix is -ing, which starts with I."
- "This is the exception! Suffix starts with I, so keep the Y. Hurrying, not hurriing."
- "Now work with your partner on 2-5. Say which RULE you are using before you write the answer."

DO:
- Model item 1 (hurry + -ing) and emphasise the exception.
- Allow 90 seconds for partners to work through items 2-5.
- Click to next slide to reveal answers after discussion.

CFU CHECKPOINT:
Technique: Finger Voting
Script:
- "For each word, hold up 1 finger for 'change Y to I' or 2 fingers for 'drop E'. Ready?"
- "Number 3 - carry + -er?" [1 finger - change Y to I] "Number 4 - value + -able?" [2 fingers - drop E]
- Scan for: correct rule identification on >=80% of hands.
PROCEED: If >=80% identify the correct rule for each word, move to You Do.
PIVOT: If students confuse which rule, go back to basics: "Step 1 - look at the ending. Carry ends in Y. Value ends in E. The ending tells you which rule." Re-check with: 'pretty + -est' [Y to I] and 'brave + -er' [drop E].

TEACHER NOTES:
Item 1 (hurry + -ing = hurrying) tests the Y-rule exception. Items 2-5 are straightforward rule-selection tasks. Finger voting checks rule identification efficiently across the whole class.

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Give these students 4 words pre-sorted into two labelled groups ('Y words' and 'E words'). They apply the correct rule to each without needing to identify which rule themselves.

EXTENDING PROMPT:
- Task: Students write a short paragraph (3-4 sentences) using at least 4 words that require either the change-y-to-i or drop-e rule. They underline each transformed word and write the base + suffix in brackets.

WATCH FOR:
- Students who apply the wrong rule (e.g., dropping the Y from 'carry' instead of changing it to I).
- Students who get the rule right but spell the answer wrong (e.g., 'carryer').
- Readiness signal: correct rule identification AND correct spelling for all 5 words.

[OG: Auditory Spelling | VTLM 2.0: Scaffold Practice]`;

const NOTES_YOUDO = `SAY:
- "Final challenge. Mixed practice in your OG book."
- "Remember your decision steps: check the ending, pick the rule, apply it."
- "Some of these have exceptions too. Read carefully."
- "If you finish early, check each answer by asking: does the new word look right?"

DO:
- Display the slide and read the word list aloud.
- Circulate and check. Note which students still need the decision tree on the board.
- Collect OG books at the end to check accuracy.

TEACHER NOTES:
Mixed practice is the culmination of the three-session sequence. Students must independently select and apply the correct rule. Words 2 and 6 test the keep-E exception (consonant suffix). Accuracy on these diagnostic items shows whether students have internalised the full rule set.

ENABLING & EXTENDING:
ENABLING PROMPT:
- Task: Students complete only 4 words (dry + -er, fancy + -ful, surprise + -ing, reply + -ed) with the decision tree visible on a desk card.

EXTENDING PROMPT:
- Task: Students create a 'suffix rule quiz' with 6 words of their own (3 change-Y-to-I, 3 drop-E). They write the answers on the back and swap with a partner to test each other.

WATCH FOR:
- Students who write 'excitment' (dropping E before consonant suffix) - the consonant-suffix exception needs reinforcing.
- Students who write 'fancyful' (forgetting to change Y to I) - they are not checking the ending systematically.
- Readiness signal: 5 or 6 correct out of 6 within 4 minutes.

[OG: Auditory Spelling | VTLM 2.0: Supported Application]`;

// ── Build ───────────────────────────────────────────────────────────────────

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  // ── SLIDE 1: I Do — Both Rules Side by Side ─────────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.PRIMARY);
    addBadge(s, "I Do", { color: C.PRIMARY });
    addTitle(s, "Two Suffix Rules \u2014 Side by Side");

    // Left card: Change Y to I
    addInstructionCard(s, [
      { text: "Change Y to I", role: "header" },
      { text: "", role: "spacer" },
      { text: "Consonant + Y:", role: "body", bold: true },
      { text: "change Y to I before adding suffix", role: "body" },
      { text: "", role: "spacer" },
      { text: "Example:", role: "emphasis" },
      { text: "happy + -er  \u2192  happier", role: "body" },
      { text: "", role: "spacer" },
      { text: "Exceptions:", role: "emphasis", color: C.ALERT },
      { text: "vowel + Y \u2192 keep Y  (played)", role: "body" },
      { text: "suffix starts with I \u2192 keep Y", role: "body" },
    ], {
      x: 0.5, y: CONTENT_TOP, w: 4.2, h: 2.5,
      strip: C.PRIMARY,
      headerColor: C.PRIMARY,
    });

    // Right card: Drop E
    addInstructionCard(s, [
      { text: "Drop the E", role: "header" },
      { text: "", role: "spacer" },
      { text: "Silent E + vowel suffix:", role: "body", bold: true },
      { text: "drop the E before adding suffix", role: "body" },
      { text: "", role: "spacer" },
      { text: "Example:", role: "emphasis" },
      { text: "make + -ing  \u2192  making", role: "body" },
      { text: "", role: "spacer" },
      { text: "Exception:", role: "emphasis", color: C.ALERT },
      { text: "consonant suffix \u2192 keep E", role: "body" },
      { text: "(hopeful, careful)", role: "body" },
    ], {
      x: 4.9, y: CONTENT_TOP, w: 4.6, h: 2.5,
      strip: C.SECONDARY,
      headerColor: C.SECONDARY,
    });

    // Decision card at bottom
    const decY = CONTENT_TOP + 2.62;
    const decH = SAFE_BOTTOM - decY;
    addCard(s, 0.5, decY, 9, decH, { fill: C.BG_DARK });
    s.addText("Which rule?  Check the ending of the base word first!", {
      x: 0.7, y: decY + 0.08, w: 8.6, h: 0.35,
      fontSize: 16, fontFace: FONT_H, color: C.WHITE, bold: true, margin: 0, valign: "middle",
    });
    s.addText([
      { text: "Ends in Y?", options: { bold: true, fontSize: 14, color: C.ACCENT } },
      { text: "  \u2192  Check consonant before Y  \u2192  Change Y to I", options: { fontSize: 13, color: C.WHITE, breakLine: true } },
      { text: "Ends in E?", options: { bold: true, fontSize: 14, color: C.ACCENT } },
      { text: "  \u2192  Check suffix start  \u2192  Vowel = drop E", options: { fontSize: 13, color: C.WHITE } },
    ], {
      x: 0.7, y: decY + 0.48, w: 8.6, h: decH - 0.56,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_IDO);
  })();

  // ── SLIDES 2-3: We Do — Mixed Practice (withReveal) ─────────────────────
  const weDoWords = [
    { base: "hurry", suffix: "-ing", answer: "hurrying" },
    { base: "shake", suffix: "-ing", answer: "shaking" },
    { base: "carry", suffix: "-er", answer: "carrier" },
    { base: "value", suffix: "-able", answer: "valuable" },
    { base: "lucky", suffix: "-est", answer: "luckiest" },
  ];

  const cardH = 0.48;
  const cardGap = 0.10;
  const wdStartY = CONTENT_TOP + 0.56;

  withReveal(
    () => {
      const s = pres.addSlide();
      addTopBar(s, C.SECONDARY);
      addBadge(s, "We Do", { color: C.SECONDARY });
      addTitle(s, "Which Rule? Apply It!");

      addTextOnShape(s, "Decide which rule applies, then add the suffix.", {
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

  // ── SLIDE 4: You Do — Mixed Independent Practice ────────────────────────
  (() => {
    const s = pres.addSlide();
    addTopBar(s, C.ACCENT);
    addBadge(s, "You Do", { color: C.ACCENT, w: 1.6 });
    addTitle(s, "Mixed Practice \u2014 In Your OG Book", { color: C.ACCENT });

    // Instruction card
    addCard(s, 0.5, CONTENT_TOP, 9, 0.50, { fill: C.PRIMARY });
    s.addText("Which rule? Add the suffix. Write the new word in your OG book.", {
      x: 0.7, y: CONTENT_TOP + 0.06, w: 8.6, h: 0.38,
      fontSize: 14, fontFace: FONT_B, color: C.WHITE, bold: true, margin: 0, valign: "middle",
    });

    // Word list card
    const listY = CONTENT_TOP + 0.62;
    const listH = SAFE_BOTTOM - listY;
    addCard(s, 0.5, listY, 5.5, listH, { strip: C.ACCENT });

    const youDoWords = [
      { base: "dry", suffix: "-er" },
      { base: "excite", suffix: "-ment" },
      { base: "fancy", suffix: "-ful" },
      { base: "surprise", suffix: "-ing" },
      { base: "reply", suffix: "-ed" },
      { base: "approve", suffix: "-al" },
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

    // Decision tree reminder (right side)
    addCard(s, 6.2, listY + 0.15, 3.1, 2.2, { fill: C.BG_CARD, strip: C.MUTED });
    s.addText([
      { text: "Decision Steps:", options: { bold: true, fontSize: 12, color: C.PRIMARY, breakLine: true } },
      { text: "", options: { fontSize: 5, breakLine: true } },
      { text: "1. Check the ending", options: { bold: true, fontSize: 12, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 5, breakLine: true } },
      { text: "Ends in Y?", options: { bold: true, fontSize: 11, color: C.PRIMARY, breakLine: true } },
      { text: "Consonant + Y = change Y to I", options: { fontSize: 10, color: C.CHARCOAL, breakLine: true } },
      { text: "", options: { fontSize: 5, breakLine: true } },
      { text: "Ends in E?", options: { bold: true, fontSize: 11, color: C.SECONDARY, breakLine: true } },
      { text: "Vowel suffix = drop E", options: { fontSize: 10, color: C.CHARCOAL, breakLine: true } },
      { text: "Consonant suffix = keep E", options: { fontSize: 10, color: C.CHARCOAL } },
    ], {
      x: 6.4, y: listY + 0.28, w: 2.7, h: 1.9,
      fontFace: FONT_B, margin: 0, valign: "top",
    });

    addFooter(s, FOOTER);
    s.addNotes(NOTES_YOUDO);
  })();

  // ── Write PPTX ──────────────────────────────────────────────────────────
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: `${OUT_DIR}/Session 3 - Combined Practice.pptx` });
  console.log("Session 3 PPTX written to " + OUT_DIR);
}

build().catch(console.error);
