// OG Spelling — Jobs of e (Sessions 1-4)
// Year 5/6 Literacy — Orton-Gillingham
// 4 sessions x 3 slides = 12 slides across 4 PPTX files
// Each session: I Do (teach) -> We Do (together) -> You Do (partner/independent)

"use strict";

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const { createTheme } = require("../themes/factory");

const T = createTheme("literacy", "grade56", 0);
const {
  C, FONT_H, FONT_B,
  addTopBar, addBadge, addTitle, addCard, addInstructionCard,
  addFooter, addTextOnShape,
  SAFE_BOTTOM, CONTENT_TOP,
} = T;

const OUT_DIR = "output/OG_Jobs_of_E";

function ft(n) { return `Jobs of e - Session ${n} of 4 | OG Spelling | Year 5/6`; }

// ── Shared helpers ──────────────────────────────────────────────────────────

/** Display words in a grid layout. */
function addWordGrid(slide, words, x, y, w, h, opts) {
  const o = opts || {};
  const cols = o.cols || 4;
  const fontSize = o.fontSize || 20;
  const rows = Math.ceil(words.length / cols);
  const rowH = h / rows;
  const colW = w / cols;
  words.forEach(function (word, i) {
    slide.addText(word, {
      x: x + (i % cols) * colW,
      y: y + Math.floor(i / cols) * rowH,
      w: colW, h: rowH,
      fontSize: fontSize, fontFace: FONT_H, color: o.color || C.PRIMARY,
      bold: true, align: "center", valign: "middle", margin: 0,
    });
  });
}

/** Display CVC -> CVCe word pairs vertically. */
function addWordPairList(slide, pairs, x, y, w, h) {
  var textRuns = [];
  pairs.forEach(function (pair, i) {
    textRuns.push(
      { text: pair[0], options: { fontSize: 22, fontFace: FONT_H, color: C.CHARCOAL, bold: true } },
      { text: "  ->  ", options: { fontSize: 16, fontFace: FONT_B, color: C.MUTED } },
      { text: pair[1], options: { fontSize: 22, fontFace: FONT_H, color: C.PRIMARY, bold: true, breakLine: i < pairs.length - 1 } }
    );
  });
  slide.addText(textRuns, { x: x, y: y, w: w, h: h, fontFace: FONT_B, margin: 0, valign: "top", paraSpaceAfter: 6 });
}

/** Two-column I Do slide for teaching two jobs side by side. */
function twoJobIDo(pres, title, leftJob, leftWords, rightJob, rightWords, notes, footerText) {
  var s = pres.addSlide();
  addTopBar(s, C.PRIMARY);
  addBadge(s, "I Do", { color: C.PRIMARY });
  addTitle(s, title);

  var cardH = 3.6;

  // Left card
  addCard(s, 0.5, CONTENT_TOP, 4.3, cardH, { strip: C.PRIMARY });
  addTextOnShape(s, leftJob.label,
    { x: 0.65, y: CONTENT_TOP + 0.12, w: 3.95, h: 0.42, fill: C.PRIMARY, rectRadius: 0.08 },
    { fontSize: 12, color: C.WHITE, fontFace: FONT_H, bold: true }
  );
  s.addText(leftJob.rule, {
    x: 0.75, y: CONTENT_TOP + 0.62, w: 3.7, h: 0.55,
    fontSize: 11.5, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
  });
  addWordGrid(s, leftWords, 0.6, CONTENT_TOP + 1.2, 4.0, cardH - 1.4, {
    cols: 2, fontSize: 20, color: C.PRIMARY,
  });

  // Right card
  addCard(s, 5.0, CONTENT_TOP, 4.5, cardH, { strip: C.SECONDARY });
  addTextOnShape(s, rightJob.label,
    { x: 5.15, y: CONTENT_TOP + 0.12, w: 4.15, h: 0.42, fill: C.SECONDARY, rectRadius: 0.08 },
    { fontSize: 12, color: C.WHITE, fontFace: FONT_H, bold: true }
  );
  s.addText(rightJob.rule, {
    x: 5.25, y: CONTENT_TOP + 0.62, w: 4.0, h: 0.55,
    fontSize: 11.5, fontFace: FONT_B, color: C.CHARCOAL, margin: 0, valign: "top",
  });
  addWordGrid(s, rightWords, 5.1, CONTENT_TOP + 1.2, 4.3, cardH - 1.4, {
    cols: 2, fontSize: 20, color: C.SECONDARY,
  });

  addFooter(s, footerText);
  s.addNotes(notes);
  return s;
}

/** We Do sorting slide with category labels and word grid. */
function sortWeDoSlide(pres, title, words, categories, notes, footerText) {
  var s = pres.addSlide();
  addTopBar(s, C.SECONDARY);
  addBadge(s, "We Do", { color: C.SECONDARY });
  addTitle(s, title);

  var catW = 9 / categories.length;
  var catColors = [C.PRIMARY, C.SECONDARY];
  categories.forEach(function (cat, i) {
    addTextOnShape(s, cat,
      { x: 0.5 + i * catW, y: CONTENT_TOP, w: catW - 0.1, h: 0.42, fill: catColors[i % 2], rectRadius: 0.08 },
      { fontSize: 12, color: C.WHITE, fontFace: FONT_H, bold: true }
    );
  });

  addCard(s, 0.5, CONTENT_TOP + 0.56, 9, 3.0, { strip: C.SECONDARY });
  s.addText("Sort these words on your whiteboard:", {
    x: 0.75, y: CONTENT_TOP + 0.64, w: 8.5, h: 0.35,
    fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
  });
  addWordGrid(s, words, 0.5, CONTENT_TOP + 1.05, 9, 2.4, {
    cols: 4, fontSize: 22, color: C.PRIMARY,
  });

  addFooter(s, footerText);
  s.addNotes(notes);
  return s;
}

// ══════════════════════════════════════════════════════════════════════════════
// SESSION 1: Job 1 — Silent e Makes the Vowel Say Its Name
// ══════════════════════════════════════════════════════════════════════════════

function buildSession1() {
  var pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  // ── Slide 1: I Do ──────────────────────────────────────────────────────────
  var s1 = pres.addSlide();
  addTopBar(s1, C.PRIMARY);
  addBadge(s1, "I Do", { color: C.PRIMARY });
  addTitle(s1, "Job 1: Silent e Makes the Vowel Say Its Name");

  // Left card: word pairs
  addCard(s1, 0.5, CONTENT_TOP, 5.5, 3.6, { strip: C.PRIMARY });
  addWordPairList(s1, [
    ["mat", "mate"], ["hop", "hope"], ["kit", "kite"],
    ["tub", "tube"], ["pin", "pine"],
  ], 0.85, CONTENT_TOP + 0.15, 4.8, 3.3);

  // Right card: rule explanation
  addCard(s1, 6.2, CONTENT_TOP, 3.3, 3.6, { fill: C.BG_CARD });
  addTextOnShape(s1, "VCe Pattern",
    { x: 6.4, y: CONTENT_TOP + 0.15, w: 2.9, h: 0.48, fill: C.PRIMARY, rectRadius: 0.08 },
    { fontSize: 15, color: C.WHITE, fontFace: FONT_H, bold: true }
  );
  s1.addText([
    { text: "The silent e at the end makes the vowel before it say its name (long sound).", options: { fontSize: 13, color: C.CHARCOAL, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "The e is silent - you don't hear it, but it changes the vowel sound.", options: { fontSize: 13, color: C.CHARCOAL } },
  ], {
    x: 6.4, y: CONTENT_TOP + 0.8, w: 2.9, h: 2.5,
    fontFace: FONT_B, margin: 0, valign: "top",
  });

  addFooter(s1, ft(1));
  s1.addNotes(`SAY:
- We're starting the Jobs of e. The letter e at the end of a word has different jobs depending on the word.
- Job 1 is the most common. When we add a silent e to a short-vowel word, it makes the vowel say its name - its long sound.
- Watch: "mat" - the a says /a/. Add an e... "mate" - now the a says /ay/. The e is silent but it changes the vowel.
- [Point to each pair.] Say both words with me. Listen to the vowel change each time.
- Ask: What do you notice happens to the vowel in every single pair? [It changes from the short sound to the long sound.]

DO:
- Point to each word pair as you read them aloud.
- Tap the vowel in the CVC word, say the short sound. Tap the vowel in the CVCe word, say the long sound.
- After all five pairs, point to the VCe Pattern card on the right.

TEACHER NOTES:
Job 1 is the most common job of silent e and the one most students have encountered informally. The formal "Job" label gives students a systematic way to categorise WHY the e is there. VCe = Vowel-Consonant-e.

WATCH FOR:
- Students who read CVCe words but can't explain why the vowel changed - prompt: "What is the e doing in that word?"
- Students mixing up long and short vowel sounds - note for follow-up.
- Readiness signal: students predicting the new word before you say it.

[OG: New Concept | VTLM 2.0: Explicit Explanation]`);

  // ── Slide 2: We Do ─────────────────────────────────────────────────────────
  var s2 = pres.addSlide();
  addTopBar(s2, C.SECONDARY);
  addBadge(s2, "We Do", { color: C.SECONDARY });
  addTitle(s2, "Add the Silent e - What's the New Word?");

  addCard(s2, 0.5, CONTENT_TOP, 9, 3.6, { strip: C.SECONDARY });
  s2.addText("On your whiteboard: add a silent e and write the new word.", {
    x: 0.75, y: CONTENT_TOP + 0.12, w: 8.5, h: 0.35,
    fontSize: 14, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
  });
  addWordGrid(s2, ["cap", "rob", "cut", "rid", "not", "dim"], 0.5, CONTENT_TOP + 0.6, 9, 2.8, {
    cols: 3, fontSize: 28, color: C.PRIMARY,
  });

  addFooter(s2, ft(1));
  s2.addNotes(`SAY:
- Your turn. I'll show you a short-vowel word. Add a silent e and tell me the new word.
- First one: "cap." Add the silent e - what word do you get? Write it on your whiteboard. [cape]
- Good. The a changed from /a/ to /ay/. Job 1 in action.
- Next: "rob" - add the e. [robe] And "cut"? [cute]
- [Continue through all six words.]

DO:
- Point to each word one at a time. Allow 5-10 seconds for whiteboard response.
- After each: "Boards up - show me!" Confirm the answer.
- Pace briskly - this should feel like a drill.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
- "Write the new word on your whiteboard. Boards up on my signal... show me!"
- Scan for: correct CVCe spelling on >=80% of boards.
PROCEED: If >=80% correct across 4+ words, move to You Do.
PIVOT: If students struggle, model one more slowly: "Let's look at 'cut.' C-U-T. The u says /u/. Now I add e: C-U-T-E. Cute! The u now says its name." Re-check with "dim" -> "dime."

TEACHER NOTES:
Rapid-fire guided practice. Students transform CVC words to CVCe on whiteboards. Pace 5-10 seconds per word. The focus is naming the JOB of e, not just reading the word. Answers: cape, robe, cute, ride, note, dime.

WATCH FOR:
- Students who write the wrong vowel (e.g., "cepe" for "cape") - they may not understand VCe positioning.
- Students who add e but can't read the new word - they need more phonemic awareness work.
- Readiness signal: fast, confident responses on all six words.

[OG: Guided Practice | VTLM 2.0: Scaffold Practice]`);

  // ── Slide 3: You Do ────────────────────────────────────────────────────────
  var s3 = pres.addSlide();
  addTopBar(s3, C.ACCENT);
  addBadge(s3, "You Do", { color: C.ACCENT });
  addTitle(s3, "Job 1 Partner Practice");

  addInstructionCard(s3, [
    { text: "Partner Practice", role: "header" },
    { text: "", role: "spacer" },
    { text: "First: Read each word aloud to your partner.", role: "body" },
    { text: "Next: In your OG book, write each word. Underline the long vowel.", role: "body" },
    { text: "Then: Write the short-vowel word you get without the e.", role: "body" },
  ], { x: 0.5, y: CONTENT_TOP, w: 4.3, h: 3.6, strip: C.ACCENT });

  addCard(s3, 5.0, CONTENT_TOP, 4.5, 3.6, { fill: C.BG_CARD });
  addWordGrid(s3, ["stripe", "cave", "flame", "smile", "globe", "slope", "brave", "flute"], 5.0, CONTENT_TOP + 0.1, 4.5, 3.4, {
    cols: 2, fontSize: 22, color: C.PRIMARY,
  });

  addFooter(s3, ft(1));
  s3.addNotes(`SAY:
- Now with your partner. Eight words on the screen - all have a silent e doing Job 1.
- First, read each word aloud to your partner. Then in your OG book, write each word, underline the long vowel, and write the short-vowel word you'd get without the e.
- For example: "stripe" - underline the i, and the short-vowel word is "strip."

DO:
- Display the slide. Read through the three task steps.
- Set 3 minutes for partner work. Circulate and check.
- After 3 minutes: "Who can tell me the short-vowel word inside 'flame'?" [flam - shows the vowel change]

TEACHER NOTES:
Partner practice reinforces Job 1 by reversing the process - students see CVCe words and identify the short-vowel base. Writing in OG books creates a permanent record. Underlining the long vowel builds pattern awareness.

WATCH FOR:
- Students who underline the wrong letter - redirect: "Which vowel is saying its name? Underline that one."
- Partners rushing through without doing the written task - remind them the writing matters for pattern recognition.
- Readiness signal: partners completing all eight words within 3 minutes with correct underlining.

[OG: Independent Practice | VTLM 2.0: Supported Application]`);

  return pres;
}

// ══════════════════════════════════════════════════════════════════════════════
// SESSION 2: Job 2 (No word ends in v) & Job 3 (Soft c/g)
// ══════════════════════════════════════════════════════════════════════════════

function buildSession2() {
  var pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  // ── Slide 1: I Do ──────────────────────────────────────────────────────────
  twoJobIDo(pres,
    "Jobs 2 & 3: Protecting Letters",
    { label: "Job 2: No Word Ends in v", rule: "English words are not allowed to end in the letter v. The silent e sits after the v to follow this rule." },
    ["have", "give", "love", "solve", "nerve", "twelve"],
    { label: "Job 3: Keeps c or g Soft", rule: "Without the e, the c would say /k/ and the g would say /g/. The silent e keeps them soft." },
    ["dance", "prince", "cage", "large", "fence", "hinge"],
    `SAY:
- Today we learn two more jobs of e. Remember, Job 1 was about making the vowel say its name. Jobs 2 and 3 are different - they're about protecting letters.
- Job 2: look at these words on the left. Have. Give. Love. What letter comes just before the e? [v] English has a rule - no word is allowed to end in v. The e is there to follow that rule.
- Try removing the e from "have" - you'd get "hav." That's not allowed in English. The e protects the word.
- Job 3: look at the words on the right. Dance. Prince. Cage. In "dance," the c says /s/ - that's a soft c. If we removed the e, the c would say /k/. The e keeps the c soft.
- Same with g. In "cage," the g says /j/. Without the e, it would say /g/. The e keeps the g soft.

DO:
- Point to the left card for Job 2. Run through each word, asking: "What letter comes before the e?"
- Point to the right card for Job 3. For each word, name whether c or g is being kept soft.
- Ask students to try removing the e mentally and hear how the word would sound wrong.

TEACHER NOTES:
Jobs 2 and 3 are "protection" jobs - the e doesn't change the vowel sound (as in Job 1), it protects a spelling rule. Students often find these surprising because the e seems to "do nothing." The key insight is that it IS doing something, just not changing the vowel.

WATCH FOR:
- Students who try to apply Job 1 thinking to Job 2 words (e.g., saying "love" has a long o) - clarify: "The e isn't changing the vowel here. It's doing a different job."
- Students who don't know what soft c and soft g sound like - review: soft c = /s/, hard c = /k/; soft g = /j/, hard g = /g/.
- Readiness signal: students explaining WHY the e is in "have" or "dance" without prompting.

[OG: New Concept | VTLM 2.0: Explicit Explanation]`,
    ft(2)
  );

  // ── Slide 2: We Do ─────────────────────────────────────────────────────────
  sortWeDoSlide(pres,
    "Sort: Job 2 or Job 3?",
    ["serve", "glove", "curve", "lodge", "valve", "badge", "since", "pounce"],
    ["Job 2: Ends in v", "Job 3: Soft c or g"],
    `SAY:
- Let's sort these words together. Each word has a silent e doing either Job 2 or Job 3.
- On your whiteboard, draw a line down the middle. Write "Job 2" on one side and "Job 3" on the other.
- First word: "serve." What letter comes before the e? [v] So which job? [Job 2] Write it on the Job 2 side.
- Next: "lodge." The g says /j/ - soft g. Which job? [Job 3]
- Sort the rest. You have 60 seconds.

DO:
- Display the slide. Give students 10 seconds to set up two columns on their whiteboards.
- Work through the first two words together, then release for 60 seconds.
- After 60 seconds: "Boards up - let me see your sort."

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
- "Hold up your boards. I'm checking your sort."
- Scan for correct placement on >=80% of boards.
- Answers - Job 2: serve, glove, curve, valve. Job 3: lodge, badge, since, pounce.
PROCEED: If >=80% correct, move to You Do.
PIVOT: If students confuse the jobs, re-anchor: "Job 2 is simple - look for the v just before the e. If there's a v, it's Job 2. Job 3 - look for a soft c or soft g just before the e." Re-sort "valve" (v = Job 2) vs "badge" (soft g = Job 3).

TEACHER NOTES:
The sorting strategy is: look at the letter immediately before the e. If it's v, Job 2. If it's c saying /s/ or g saying /j/, Job 3. Building this discrimination is the purpose of the sort.

WATCH FOR:
- Students who put all words in one column - they may not understand the distinction yet.
- "Since" has a soft c that's less obvious than "dance" - check students don't miss it.
- Readiness signal: confident, correct sorts completed within 60 seconds.

[OG: Guided Practice | VTLM 2.0: Scaffold Practice]`,
    ft(2)
  );

  // ── Slide 3: You Do ────────────────────────────────────────────────────────
  var s3 = pres.addSlide();
  addTopBar(s3, C.ACCENT);
  addBadge(s3, "You Do", { color: C.ACCENT });
  addTitle(s3, "Jobs 2 & 3 - Partner Dictation");

  addInstructionCard(s3, [
    { text: "Partner Dictation", role: "header" },
    { text: "", role: "spacer" },
    { text: "First: Partner A dictates the words. Partner B writes them in their OG book.", role: "body" },
    { text: "Next: For each word, Partner B writes whether it is Job 2 or Job 3.", role: "body" },
    { text: "Then: Swap roles and repeat.", role: "body" },
  ], { x: 0.5, y: CONTENT_TOP, w: 4.3, h: 3.6, strip: C.ACCENT });

  addCard(s3, 5.0, CONTENT_TOP, 4.5, 3.6, { fill: C.BG_CARD });
  addTextOnShape(s3, "Dictation Words",
    { x: 5.15, y: CONTENT_TOP + 0.12, w: 4.1, h: 0.38, fill: C.PRIMARY, rectRadius: 0.08 },
    { fontSize: 12, color: C.WHITE, fontFace: FONT_H, bold: true }
  );
  addWordGrid(s3, ["carve", "swerve", "chance", "cringe", "shelve", "fudge", "starve", "prince"], 5.0, CONTENT_TOP + 0.6, 4.5, 2.9, {
    cols: 2, fontSize: 20, color: C.PRIMARY,
  });

  addFooter(s3, ft(2));
  s3.addNotes(`SAY:
- Partner practice time. Partner A dictates the words on the screen. Partner B writes them in their OG book and labels each one Job 2 or Job 3.
- Then swap. Partner B dictates, Partner A writes.
- Remember: Job 2 - the e is there because no word ends in v. Job 3 - the e keeps c soft or g soft.

DO:
- Display the slide. Assign Partner A and Partner B.
- Set 2 minutes per round, 4 minutes total.
- Circulate and check spelling and job labelling.
- Answers - Job 2: carve, swerve, shelve, starve. Job 3: chance, cringe, fudge, prince.

TEACHER NOTES:
Dictation practice builds encoding (spelling) alongside the sorting skill. Students must both spell the word correctly and identify the job. Swapping roles ensures both partners practise both skills.

WATCH FOR:
- Students who spell correctly but can't identify the job - they may be spelling from memory without understanding the e's role.
- Spelling errors on -ve endings (e.g., writing "carv" without the e) - perfect teaching moment: "See? English won't let you end in v!"
- Readiness signal: both partners completing with correct spellings and job labels.

[OG: Independent Practice | VTLM 2.0: Supported Application]`);

  return pres;
}

// ══════════════════════════════════════════════════════════════════════════════
// SESSION 3: Job 4 (Every syllable needs a vowel) & Job 5 (Prevents plural)
// ══════════════════════════════════════════════════════════════════════════════

function buildSession3() {
  var pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  // ── Slide 1: I Do ──────────────────────────────────────────────────────────
  twoJobIDo(pres,
    "Jobs 4 & 5: Syllable & Spelling Rules",
    { label: "Job 4: Every Syllable Needs a Vowel", rule: "In consonant-le words, the e is the vowel for the final syllable. Without it, the syllable has no vowel." },
    ["little", "castle", "candle", "whistle", "purple", "simple"],
    { label: "Job 5: Stops It Looking Plural", rule: "English words don't end in just s unless they are plurals. The silent e stops the word looking like a plural." },
    ["house", "goose", "nurse", "purse", "cheese", "dense"],
    `SAY:
- Two more jobs today. These are the trickiest ones.
- Job 4: every syllable in English needs a vowel. Look at "little." Two syllables: lit-tle. The second syllable is "tle." Where's the vowel? [the e] Without that e, "tl" isn't a real syllable. The e is there so the syllable has a vowel.
- Try "castle." Cas-tle. The "tle" syllable needs the e for its vowel. Same pattern in every word on the left.
- Job 5: look at "house." If I removed the e, I'd have "hous" - which looks like the plural of "hou." English doesn't let a word end in just s unless it IS a plural. The e stops "house" from looking like a plural.
- Same with "nurse" - without the e, "nurs" looks like a plural of "nur." The e prevents that.

DO:
- Point to the left card for Job 4. Clap each word into syllables to show the consonant-le pattern.
- Point to the right card for Job 5. For each word, say what the word would look like without the e.
- For "cheese" - "chees" looks like the plural of "chee." The e prevents this.

TEACHER NOTES:
Jobs 4 and 5 are structural spelling rules rather than pronunciation rules. Job 4 relates to syllable division - consonant-le is a syllable type. Job 5 is about English orthographic conventions. Both require students to think about why English spells words the way it does.

WATCH FOR:
- Students who confuse Job 4 with Job 1 - in "simple," the e is NOT making the i long (it stays short). The e is serving the syllable, not the vowel.
- Students who struggle with the "looks plural" idea - try: "If I write 'hous' on the board, does it look like there's more than one 'hou'?"
- Readiness signal: students can clap consonant-le words into syllables and explain why the e is there.

[OG: New Concept | VTLM 2.0: Explicit Explanation]`,
    ft(3)
  );

  // ── Slide 2: We Do ─────────────────────────────────────────────────────────
  sortWeDoSlide(pres,
    "Sort: Job 4 or Job 5?",
    ["pebble", "mouse", "riddle", "rinse", "gentle", "browse", "fumble", "tense"],
    ["Job 4: Syllable Vowel", "Job 5: Not a Plural"],
    `SAY:
- Sort time again. These words have a silent e doing either Job 4 or Job 5.
- Two columns on your whiteboard: Job 4 and Job 5.
- First word: "pebble." Clap it: peb-ble. Is the e there for a syllable vowel? [Yes - consonant-le.] Job 4.
- Next: "mouse." Without the e: "mous." Does that look like a plural? [Yes.] Job 5.
- Sort the rest. 60 seconds.

DO:
- Work through the first two together, then release students.
- After 60 seconds: "Boards up!"
- Answers - Job 4: pebble, riddle, gentle, fumble. Job 5: mouse, rinse, browse, tense.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
- "Hold up your sorts. I'm checking."
- Scan for correct placement on >=80% of boards.
PROCEED: If >=80% correct, move to You Do.
PIVOT: If confused, re-anchor: "Job 4 - clap the word. If the last syllable is consonant-le, it's Job 4. Job 5 - remove the e. If the word now looks like a plural ending in s, it's Job 5." Re-sort "rinse" (rins looks plural = Job 5) vs "fumble" (consonant-le = Job 4).

TEACHER NOTES:
Job 4: clap the word - if the final syllable is consonant-le, the e is the syllable vowel. Job 5: remove the e mentally - if the result ends in s and looks plural, the e is doing Job 5. These are the two sorting strategies.

WATCH FOR:
- Students who put "tense" in Job 4 - it is not a consonant-le word. Without e, "tens" looks plural. Job 5.
- Students who struggle with "browse" - without e, "brows" looks like the plural of "brow." Job 5.
- Readiness signal: correct sorts with clear reasoning.

[OG: Guided Practice | VTLM 2.0: Scaffold Practice]`,
    ft(3)
  );

  // ── Slide 3: You Do ────────────────────────────────────────────────────────
  var s3 = pres.addSlide();
  addTopBar(s3, C.ACCENT);
  addBadge(s3, "You Do", { color: C.ACCENT });
  addTitle(s3, "Jobs 4 & 5 - OG Book Practice");

  addInstructionCard(s3, [
    { text: "OG Book Practice", role: "header" },
    { text: "", role: "spacer" },
    { text: "First: Write each word in your OG book.", role: "body" },
    { text: "Next: Clap each word into syllables. Write the syllable count.", role: "body" },
    { text: "Then: Write Job 4 or Job 5 next to each word.", role: "body" },
  ], { x: 0.5, y: CONTENT_TOP, w: 4.3, h: 3.6, strip: C.ACCENT });

  addCard(s3, 5.0, CONTENT_TOP, 4.5, 3.6, { fill: C.BG_CARD });
  addWordGrid(s3, ["ankle", "goose", "bottle", "pulse", "puzzle", "moose", "crumble", "verse"], 5.0, CONTENT_TOP + 0.1, 4.5, 3.4, {
    cols: 2, fontSize: 20, color: C.PRIMARY,
  });

  addFooter(s3, ft(3));
  s3.addNotes(`SAY:
- In your OG book, write each word, clap it into syllables, write the syllable count, and label it Job 4 or Job 5.
- Remember: Job 4 words have a consonant-le syllable. Job 5 words would look like plurals without the e.

DO:
- Display the slide. Read the instructions aloud.
- Set 3 minutes. Circulate and check.
- Quick share: "What job is 'puzzle' doing?" [Job 4 - puz-zle, consonant-le] "And 'goose'?" [Job 5 - "goos" looks plural]
- Answers - Job 4: ankle, bottle, puzzle, crumble. Job 5: goose, pulse, moose, verse.

TEACHER NOTES:
Adding syllable counting reinforces the Job 4 connection - consonant-le words are always multisyllabic. The syllable count helps students distinguish the two jobs practically.

WATCH FOR:
- Students who write incorrect syllable counts - clap with them.
- "Verse" may confuse - it ends in -se, not -le. Without e, "vers" looks plural. Job 5.
- Readiness signal: correct labels and syllable counts for all eight words.

[OG: Independent Practice | VTLM 2.0: Supported Application]`);

  return pres;
}

// ══════════════════════════════════════════════════════════════════════════════
// SESSION 4: All 5 Jobs — Review & Consolidation
// ══════════════════════════════════════════════════════════════════════════════

function buildSession4() {
  var pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  // ── Slide 1: I Do — Review all 5 jobs ──────────────────────────────────────
  var s1 = pres.addSlide();
  addTopBar(s1, C.PRIMARY);
  addBadge(s1, "Review", { color: C.PRIMARY });
  addTitle(s1, "The 5 Jobs of Silent e");

  addCard(s1, 0.5, CONTENT_TOP, 9, 3.6, { strip: C.PRIMARY });

  var jobs = [
    { num: "1", rule: "Makes the vowel say its name", word: "mate", color: C.PRIMARY },
    { num: "2", rule: "No English word ends in v", word: "have", color: C.SECONDARY },
    { num: "3", rule: "Keeps c soft (/s/) or g soft (/j/)", word: "dance", color: C.ACCENT },
    { num: "4", rule: "Every syllable needs a vowel", word: "castle", color: C.PRIMARY },
    { num: "5", rule: "Stops the word looking plural", word: "house", color: C.SECONDARY },
  ];

  jobs.forEach(function (job, i) {
    var y = CONTENT_TOP + 0.12 + i * 0.66;
    addTextOnShape(s1, "Job " + job.num,
      { x: 0.7, y: y + 0.04, w: 0.75, h: 0.38, fill: job.color, rectRadius: 0.08 },
      { fontSize: 11, color: C.WHITE, fontFace: FONT_B, bold: true }
    );
    s1.addText(job.rule, {
      x: 1.6, y: y, w: 5.5, h: 0.46,
      fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, valign: "middle", margin: 0,
    });
    s1.addText(job.word, {
      x: 7.3, y: y, w: 2.0, h: 0.46,
      fontSize: 20, fontFace: FONT_H, color: job.color, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
  });

  addFooter(s1, ft(4));
  s1.addNotes(`SAY:
- Let's bring all five jobs together. You've learned each one over the last three sessions.
- [Point to each row.] Job 1: the vowel says its name - "mate." Job 2: no word ends in v - "have." Job 3: keeps c or g soft - "dance." Job 4: every syllable needs a vowel - "castle." Job 5: stops it looking plural - "house."
- Ask: Which job do you think is the most common? [Job 1] Which ones surprised you?
- The key question when you see a silent e is always: "What job is it doing?"

DO:
- Point to each row as you review. Pause at each example word.
- After the overview, quick-fire checks: "What job is the e doing in 'bridge'?" [Job 3] "What about 'table'?" [Job 4] "And 'drove'?" [Job 2]
- Keep this review brisk - the sorting activity on the next slide is the real practice.

TEACHER NOTES:
This reference slide anchors the review session. Students should be able to refer back to this slide mentally. The five jobs cover the vast majority of silent e words in English. Job 1 accounts for roughly half of all silent e words.

WATCH FOR:
- Students who remember Jobs 1-3 but are shaky on 4 and 5 - these were taught most recently.
- Students who recite rules but can't apply them to new words - the We Do sort will test application.
- Readiness signal: students naming the job for quick-check words without hesitation.

[OG: Review | VTLM 2.0: Retention & Recall]`);

  // ── Slide 2: We Do — Sort all 5 jobs ───────────────────────────────────────
  var s2 = pres.addSlide();
  addTopBar(s2, C.SECONDARY);
  addBadge(s2, "We Do", { color: C.SECONDARY });
  addTitle(s2, "Sort: Which Job of e?");

  // Five category pills
  var pillColors = [C.PRIMARY, C.SECONDARY, C.ACCENT, C.PRIMARY, C.SECONDARY];
  for (var i = 0; i < 5; i++) {
    addTextOnShape(s2, "Job " + (i + 1),
      { x: 0.5 + i * 1.82, y: CONTENT_TOP, w: 1.72, h: 0.36, fill: pillColors[i], rectRadius: 0.08 },
      { fontSize: 11, color: C.WHITE, fontFace: FONT_B, bold: true }
    );
  }

  addCard(s2, 0.5, CONTENT_TOP + 0.5, 9, 3.1, { strip: C.SECONDARY });
  s2.addText("Sort each word into the correct job on your whiteboard:", {
    x: 0.75, y: CONTENT_TOP + 0.58, w: 8.5, h: 0.3,
    fontSize: 13, fontFace: FONT_B, color: C.CHARCOAL, italic: true, margin: 0,
  });
  addWordGrid(s2, ["flame", "swerve", "chance", "maple", "loose", "stride", "twelve", "cringe", "bundle", "glimpse"], 0.5, CONTENT_TOP + 0.95, 9, 2.5, {
    cols: 5, fontSize: 18, color: C.PRIMARY,
  });

  addFooter(s2, ft(4));
  s2.addNotes(`SAY:
- Big sort! Ten words, five jobs. On your whiteboard, write job numbers 1 through 5. Sort each word under the right job.
- Think about the strategy for each: Is the vowel long? Check Job 1. Does it end in -ve? Job 2. Is c or g soft? Job 3. Consonant-le syllable? Job 4. Would it look plural without the e? Job 5.
- You have 90 seconds. Go!

DO:
- Give 90 seconds. Circulate and prompt stuck students: "What letter is just before the e? What does that tell you?"
- After 90 seconds: "Boards up!"
- Confirm the sort:
  Job 1: flame, stride. Job 2: swerve, twelve. Job 3: chance, cringe. Job 4: maple, bundle. Job 5: loose, glimpse.

CFU CHECKPOINT:
Technique: Show Me Boards
Script:
- "Boards up. Let me see your full sort."
- Scan for >=8 of 10 words correctly sorted on >=80% of boards.
PROCEED: If >=80% get 8+ correct, move to You Do.
PIVOT: Most likely confusion: Job 1 vs Job 3. Re-anchor: "In 'flame,' the a says its name - long a. That's Job 1. In 'chance,' the c says /s/ - soft c. That's Job 3. Job 1 is about the VOWEL. Job 3 is about the CONSONANT before the e."

TEACHER NOTES:
This consolidation sort covers all five jobs. Two words per job. The sorting strategies: check vowel sound (Job 1), check for v before e (Job 2), check for soft c/g (Job 3), clap for consonant-le (Job 4), remove e to check for plural look (Job 5).

WATCH FOR:
- "Loose" may confuse - without e, "loos" looks like plural of "loo." Job 5.
- "Chance" might be labelled Job 1 (the a is NOT long - it's /a/ as in "cat"). It's Job 3 (soft c).
- Readiness signal: 8+ correct with confident reasoning.

[OG: Guided Practice | VTLM 2.0: Scaffold Practice]`);

  // ── Slide 3: You Do — Word Detective ───────────────────────────────────────
  var s3 = pres.addSlide();
  addTopBar(s3, C.ACCENT);
  addBadge(s3, "You Do", { color: C.ACCENT });
  addTitle(s3, "All 5 Jobs - Word Detective");

  addInstructionCard(s3, [
    { text: "Word Detective Challenge", role: "header" },
    { text: "", role: "spacer" },
    { text: "First: Write each word in your OG book.", role: "body" },
    { text: "Next: Write the job number (1-5) next to each word.", role: "body" },
    { text: "Then: For at least 3 words, write a sentence explaining how you decided.", role: "body" },
  ], { x: 0.5, y: CONTENT_TOP, w: 4.3, h: 3.6, strip: C.ACCENT });

  addCard(s3, 5.0, CONTENT_TOP, 4.5, 3.6, { fill: C.BG_CARD });
  addTextOnShape(s3, "Investigate These Words",
    { x: 5.15, y: CONTENT_TOP + 0.12, w: 4.1, h: 0.38, fill: C.PRIMARY, rectRadius: 0.08 },
    { fontSize: 12, color: C.WHITE, fontFace: FONT_H, bold: true }
  );
  addWordGrid(s3, ["compete", "starve", "notice", "stumble", "rinse", "spoke", "sleeve", "gentle", "bruise", "judge"], 5.0, CONTENT_TOP + 0.6, 4.5, 2.9, {
    cols: 2, fontSize: 19, color: C.PRIMARY,
  });

  addFooter(s3, ft(4));
  s3.addNotes(`SAY:
- Word Detective time. Ten words in your OG book - write each one, label its job number, and for at least three words, write a sentence explaining how you decided.
- For example: "The e in 'starve' is doing Job 2 because English words can't end in v."
- Some are tricky! If you're not sure, try the strategies we've practised: check the vowel, check the letter before e, clap the syllables, remove the e.

DO:
- Display the slide. Read the instructions.
- Set 5 minutes. Circulate and support.
- Final share: pick 2-3 interesting words and discuss the job as a class.
- Answers: Job 1: compete, spoke. Job 2: starve, sleeve. Job 3: notice, judge. Job 4: stumble, gentle. Job 5: rinse, bruise.

TEACHER NOTES:
This application task pushes students beyond sorting into reasoning. The written explanation requirement deepens understanding. Some words are straightforward (starve = Job 2), others are more challenging (notice = Job 3 because the c says /s/).

WATCH FOR:
- "Notice" - the c says /s/ (soft c). Job 3. Students may try Job 1 but the o isn't long.
- "Sleeve" - ends in -ve. Job 2. The ee makes a long sound, but that's the digraph, not the silent e.
- "Bruise" - without e, "bruis" looks plural. Job 5.
- Readiness signal: correct labels with clear written reasoning for at least 3 words.

[OG: Independent Practice | VTLM 2.0: Supported Application]`);

  return pres;
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════════════════

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  var sessions = [buildSession1(), buildSession2(), buildSession3(), buildSession4()];
  for (var i = 0; i < sessions.length; i++) {
    var fileName = OUT_DIR + "/OG Jobs of E Session " + (i + 1) + ".pptx";
    await sessions[i].writeFile({ fileName: fileName });
    console.log("  -> " + fileName);
  }
  console.log("\nDone! Generated 4 PPTX files in " + OUT_DIR);
}

main().catch(console.error);
