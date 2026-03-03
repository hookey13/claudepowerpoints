# Theme System Reference

The theme system uses a **factory pattern** with 150 pre-built colour palettes across 5 subjects, 5 year levels, and 6 weekly variants. Build scripts import a single factory function — all builders, element helpers, and palette colours are returned as a bound theme object.

## Factory API

```javascript
const { createTheme, weekToVariant } = require("../themes/factory");

// Create a theme for a specific subject + year level + week
const T = createTheme("literacy", "grade56", weekToVariant(3));

// Destructure — everything you need is on one object
const { C, FONT_H, FONT_B, titleSlide, liSlide, contentSlide,
        cfuSlide, closingSlide, withReveal, addCard, addFooter,
        addTextOnShape, iconToBase64Png, getContrastColor } = T;

// Subject-specific builders are also on the theme object
const { vocabSlide, quoteSlide, modellingSlide } = T;  // literacy
const { workedExSlide, exitTicketSlide } = T;           // numeracy
const { experimentSlide, observationSlide } = T;        // science
const { scenarioSlide, reflectionSlide } = T;           // wellbeing
const { investigationSlide, findingsSlide } = T;        // inquiry
```

**Parameters:**
- `subject` — `"literacy"` | `"numeracy"` | `"inquiry"` | `"wellbeing"` | `"science"`
- `yearLevel` — `"foundation"` | `"grade1"` | `"grade2"` | `"grade34"` | `"grade56"`
- `variant` — `0`–`5` (weekly rotation index)

**`weekToVariant(weekNumber)`** converts a 1-based week number to a 0-based variant index (cycles 0–5).

## Subjects and Their Builders

All subjects get 5 **base builders**: `titleSlide`, `liSlide`, `contentSlide`, `cfuSlide`, `closingSlide`.

| Subject | Extra Builders | Purpose |
|---------|---------------|---------|
| **Literacy** | `vocabSlide`, `quoteSlide`, `modellingSlide`, `pairShareSlide` | Text study, vocabulary, modelled writing |
| **Numeracy** | `workedExSlide`, `exitTicketSlide`, `addPlaceValueChart`, `addNumberLine`, `addAreaModel`, `addTenthsStrip`, `addDecimalDot`, `addStageBadge` | Worked examples, maths visuals |
| **Inquiry** | `investigationSlide`, `findingsSlide`, `pairShareSlide` | Question-driven, evidence gathering |
| **Wellbeing** | `scenarioSlide`, `reflectionSlide`, `pairShareSlide` | Social scenarios, discussion, reflection |
| **Science** | `experimentSlide`, `observationSlide`, `conclusionSlide` | Scientific method structure |

## Base Builder Signatures

| Function | Signature |
|----------|-----------|
| `titleSlide` | `(pres, title, subtitle, meta, notes)` |
| `liSlide` | `(pres, liItems, scItems, notes, footer)` |
| `contentSlide` | `(pres, badgeText, badgeColor, title, bullets, notes, footer, drawRight)` |
| `cfuSlide` | `(pres, badgeText, title, technique, questionText, notes, footer)` |
| `closingSlide` | `(pres, reflectionPrompt, takeaways, notes)` |

## Standardised Palette Schema

Every palette uses **semantic colour keys** (never topic-specific names like `C.MIDNIGHT`):

```
PRIMARY        — 60-70% weight: title bg, top bars, badges
SECONDARY      — 20-30%: alternate accents, card strips
ACCENT         — Highlight: SC cards, decorative elements
ALERT          — CFU / emphasis colour
SUCCESS        — Correct / enabling / You Do
ASSESS         — Exit ticket (optional, falls back to ALERT)
BG_DARK        — Title/closing slide background
BG_LIGHT       — Content slide background (cream/off-white)
BG_CARD        — Card fill (white)
WHITE          — Pure white ("FFFFFF")
CHARCOAL       — Body text on light backgrounds
MUTED          — Captions, footers
TEXT_ON_DARK   — Text on dark backgrounds
SUBTITLE       — Subtitle text on title slides
DECOR_1        — Decorative shape colour 1
DECOR_2        — Decorative shape colour 2
FONT_H         — Heading font name
FONT_B         — Body font name
```

Backward-compatible aliases are added by the factory: `C.NAVY → C.PRIMARY`, `C.CREAM → C.BG_LIGHT`, `C.TEAL → C.SECONDARY`.

## Year Level Font Pairings

| Level | Header Font | Body Font | Design Feel |
|-------|------------|-----------|-------------|
| Foundation | Arial Black | Calibri | Bold, saturated, playful |
| Grade 1 | Arial Black | Calibri | Bold, slightly softer |
| Grade 2 | Trebuchet MS | Calibri | Transitional |
| Grade 3/4 | Trebuchet MS or Georgia | Calibri | Balanced, sophisticated accents |
| Grade 5/6 | Georgia | Calibri | Sophisticated, muted, literary |

## 6 Weekly Variants Per Subject

Each subject has 6 named colour families that rotate weekly. Example for Literacy:

| Variant | Name | Feel |
|---------|------|------|
| 0 | Midnight Scholar | Deep blue / slate / dark gold / crimson |
| 1 | Plum & Honey | Plum / teal / dark honey / coral |
| 2 | Olive & Parchment | Deep olive / burgundy / dark gold / slate |
| 3 | Ink & Paper | Navy ink / charcoal blue / copper / dark red |
| 4 | Autumn Library | Deep brown / forest green / amber / maroon |
| 5 | Twilight Pages | Deep indigo / dusty rose / dark gold / teal |

## Theme Object Exports

The `createTheme()` return object includes everything a build script needs:

- **Palette:** `C`, `FONT_H`, `FONT_B`
- **Shadow factories:** `makeShadow`, `makeCardShadow`
- **Layout constants:** `SLIDE_W`, `SLIDE_H`, `SAFE_RIGHT`, `SAFE_BOTTOM`, `CONTENT_TOP`
- **Contrast utilities:** `hexToRgb`, `luminance`, `contrastRatio`, `validateContrast`, `getContrastColor`
- **Bounds validation:** `validateBounds`
- **Icon rendering:** `iconToBase64Png`
- **Element helpers:** `addTopBar`, `addBadge`, `addTitle`, `addCard`, `addFooter`, `addIconCircle`, `addTextOnShape`
- **Click-to-reveal:** `withReveal`
- **Base builders:** `titleSlide`, `liSlide`, `contentSlide`, `cfuSlide`, `closingSlide`
- **Subject-specific builders:** varies by subject (see table above)
- **Metadata:** `_subject`, `_yearLevel`, `_variant`, `_paletteName`

## Adding a New Subject

1. Create `themes/builders/<subject>.js` — export `create<Subject>Builders(C, FONT_H, FONT_B, el)`
2. Create `themes/palettes/<subject>.js` — export `{ palettes }` with 5 year levels × 6 variants
3. Register in `themes/factory.js`: add to `SUBJECT_PALETTES` and `SUBJECT_BUILDER_FACTORIES`

## Adding New Variants

Append palette objects to the relevant year level array in `themes/palettes/<subject>.js` and update `VARIANTS_PER_LEVEL` in `themes/factory.js`.

## Adding a New Year Level

Add the key to `VALID_YEAR_LEVELS` in `themes/factory.js` and add corresponding entries in each palette file.

---

## Click-to-Reveal (`withReveal`)

Teachers often need to hide answers until after students have responded (CFU checks, problem pairs, worked example solutions). Since PptxGenJS has no animation API, we use **duplicate slides**: slide 1 shows the question, slide 2 shows question + answer. Clicking "next" in PowerPoint reveals the answer. The teacher experience is identical to a click-to-reveal animation.

### API

```javascript
withReveal(buildFn, revealFn)
```

- **`buildFn`** — zero-arg function that calls a slide builder and returns the slide. Called twice internally (once for the question slide, once for the answer slide).
- **`revealFn`** — `callback(slide)` that adds the answer/reveal content to the second slide.
- **Returns** the answer slide (the second slide).

### Usage

```javascript
// CFU slide with hidden answer
withReveal(
  () => cfuSlide(pres, "Check", "Quick Check", "Show Me Boards",
                 "What is 3 × 4?", notes, footer),
  (slide) => {
    addTextOnShape(slide, "Answer: 12", {
      x: 3.5, y: 4.2, w: 3, h: 0.6, rectRadius: 0.08,
      fill: { color: C.SECONDARY },
    }, { fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true });
  }
);
// Creates 2 slides: question-only → question + answer

// Content slide with hidden definition
withReveal(
  () => contentSlide(pres, "Vocabulary", C.PRIMARY, "Key Term: Equivalent",
                     ["What does 'equivalent' mean in maths?"], notes, footer),
  (slide) => {
    addCard(slide, 0.5, 3.0, 9, 1.5, { strip: C.SECONDARY });
    slide.addText("Equivalent means equal in value, even if represented differently.\ne.g. 3/6 = 1/2", {
      x: 0.75, y: 3.15, w: 8.5, h: 1.2,
      fontSize: 16, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
  }
);
```

### When to Use

| Slide Type | Reveal Content | Use `withReveal`? |
|------------|---------------|-------------------|
| CFU slides | Expected student response / answer | **Yes** |
| We Do worked examples | Steps/answers the teacher cold calls for | **Yes** — students read instead of think if answers are visible |
| Problem pairs (We Do) | The solution | **Yes** |
| Hinge questions | Answer + explanation | **Yes** |
| Worked example (I Do) | Teacher narrates live — visual anchor | No — teacher is telling, not asking |
| Exit ticket (You Do) | Students work independently | No |
| Title / LI / Closing | No hidden content | No |

### Notes

- Both slides share the same teacher notes (the `notes` param is applied to both).
- The question slide and answer slide are consecutive — no other slides should be inserted between them.
- The `revealFn` callback receives the full PptxGenJS slide object — you can add any element (text, shapes, images, charts).
- Available on every theme object: `T.withReveal` (or destructure as `withReveal` from `createTheme()`).

---

## Defensive Layout Helpers

These helpers are built into every theme object returned by `createTheme()`. They prevent common visual errors at build time.

### Bounds Validation

`addCard` and numeracy-specific helpers (`addPlaceValueChart`, `addNumberLine`, `addTenthsStrip`, `addAreaModel`) validate bounds automatically and print console warnings during build if elements overflow.

**Console warnings during build = layout bugs to fix.** Never ship a presentation with warnings.

### Numeracy Visual Helpers

Available on numeracy themes only (via `createTheme("numeracy", ...)`):

- `addPlaceValueChart(slide, x, y, headers, values, opts)` — auto-sizing PV chart. Pass `{ totalW: 4.2 }`.
- `addNumberLine(slide, x, y, w, labels, opts)` — adaptive label width/font for dense lines.
- `addAreaModel(slide, x, y, w, h, rows, cols, opts)` — grid-based area model.
- `addTenthsStrip(slide, x, y, w, h, filled, opts)` — tenths strip visual.
- `addDecimalDot(slide, geo, colIndex, opts)` — decimal dot positioned from chart geometry.

### Text on Shapes — `addTextOnShape`

**Always use this instead of separate addShape + addText calls.** Available on every theme. Guarantees `valign:"middle"`, `align:"center"`, `margin:0` and validates contrast:

```javascript
addTextOnShape(slide, "24 812", {
  x: 1, y: 2, w: 3, h: 0.5, rectRadius: 0.08,
  fill: { color: C.PRIMARY },
}, {
  fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true,
});
```

### Contrast Validation

Available on every theme object:

```javascript
// Auto-pick WHITE or CHARCOAL for a given background
const textColor = getContrastColor(someHexColor);

// Manual check — warns to console if contrast < 4.5:1 (WCAG AA)
validateContrast(textColor, bgColor, "my label badge");
```

**`addTextOnShape` runs contrast validation automatically.** For manual `addText` calls on coloured backgrounds, call `validateContrast` yourself or use `getContrastColor` to pick the text colour.
