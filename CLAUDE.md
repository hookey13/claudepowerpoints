# PPTX Skill for Claude Code

Use this guide any time a .pptx file is involved — creating, reading, editing, or manipulating presentations.

---

## Quick Reference

| Task | Method |
|------|--------|
| Read/analyse content | `python -m markitdown presentation.pptx` |
| Create from scratch | See [PptxGenJS Tutorial](#pptxgenjs-tutorial) |
| Generate companion PDFs | See [Resource System](#resource-system) |

---

## Project Structure

```
project/
├── CLAUDE.md                  # This file
├── megapromptlean.md          # Pedagogical framework (DECIDE, VTLM 2.0)
├── themes/                    # Colour palettes & slide builder helpers
│   ├── pv_palette.js          # Place Value colours/fonts
│   ├── pv_helpers.js          # Place Value slide builders & layout helpers
│   ├── wh_palette.js          # War Horse colours/fonts
│   ├── wh_helpers.js          # War Horse slide builders & layout helpers
│   ├── skellig_palette.js     # Skellig Novel Study colours/fonts
│   ├── skellig_helpers.js     # Skellig slide builders & layout helpers
│   ├── pdf_helpers.js         # PDF resource generation utilities (pdfkit)
│   └── theme.js               # Legacy generic theme (not used by current builds)
├── builds/                    # One build script per lesson
│   ├── build_pv_lesson*.js    # PV unit (lessons 1–5)
│   ├── build_skellig_*.js     # Skellig Novel Study (lessons 1–5)
│   └── build_lesson1*.js      # War Horse (lessons 12–15)
├── scripts/                   # Utility scripts
│   ├── pptx_to_images.py      # PPTX → slide images for QA
│   └── merge_lessons.py       # Merge multiple PPTX files into one
├── output/                    # Generated lesson folders
│   ├── Lesson_PV1_Proportional_Materials/
│   │   ├── Lesson_PV1_Proportional_Materials.pptx
│   │   ├── SR3_Place_Value_Worksheet.pdf
│   │   └── SR4_Example_Answer.pdf
│   └── ...
└── slidetemp/                 # Temporary QA images (auto-cleaned)
```

- **`output/`** — each lesson gets its own subfolder containing the PPTX and any companion PDF resources. Lessons without resources may still use flat output.
- **`slidetemp/`** — temporary slide images for visual QA. **Always delete after QA** via `python scripts/pptx_to_images.py --clean`. Never commit this folder.

### Output Convention

Build scripts live in `builds/` and write to per-lesson folders in `output/` (paths resolve relative to CWD, which is always the project root):

```bash
node builds/build_pv_lesson1.js
```

```javascript
const OUT_DIR = "output/Lesson_PV1_Proportional_Materials";
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
await pres.writeFile({ fileName: OUT_DIR + "/Lesson_PV1_Proportional_Materials.pptx" });
// + companion PDFs generated into the same folder
```

Each lesson folder contains the PPTX and all companion PDF resources. Teachers receive the entire folder. See [Resource System](#resource-system) for how PDFs are generated and linked.

---

## Reading Content

```bash
python -m markitdown presentation.pptx
```

---

## Theme System

Each lesson unit gets its own palette + helpers pair. Build scripts import from the helpers file only — helpers re-export most palette exports (low-level utilities like `hexToRgb`, `luminance`, `contrastRatio` are palette-only).

### Existing Themes

| Unit | Palette | Helpers | Fonts |
|------|---------|---------|-------|
| Place Value (Maths) | `themes/pv_palette.js` | `themes/pv_helpers.js` | Arial Black / Calibri |
| War Horse (Narrative) | `themes/wh_palette.js` | `themes/wh_helpers.js` | Georgia / Calibri |

### Palette Exports

Every palette file exports:
- `C` — colour constants object (e.g., `C.NAVY`, `C.TEAL`, `C.WHITE`)
- `FONT_H` — header font name
- `FONT_B` — body font name
- `makeShadow()` — factory for card shadows (returns fresh object each call)
- `makeCardShadow()` — factory for subtle card shadows

PV palette additionally exports: `STAGE_COLORS`, `validateContrast`, `getContrastColor`, `contrastRatio`.

### Helpers Exports

Every helpers file re-exports most palette exports plus:

**Layout constants:** `SAFE_BOTTOM` (5.1), `CONTENT_TOP` (1.3), `SLIDE_W` (10), `SAFE_RIGHT` (9.5)

**Element helpers:** `iconToBase64Png`, `addTopBar`, `addBadge`, `addStageBadge`, `addTitle`, `addCard`, `addFooter`

**Click-to-reveal:** `withReveal(buildFn, revealFn)` — creates a duplicate slide pair for teacher-controlled answer reveals (see [Click-to-Reveal](#click-to-reveal-withreveal))

**Full slide builders** (the primary API — every build script uses these):

| Function | Purpose |
|----------|---------|
| `titleSlide(pres, title, subtitle, meta, notes)` | Dark background title slide |
| `liSlide(pres, liItems, scItems, notes, footer)` | Learning intention + success criteria (title hardcoded) |
| `contentSlide(pres, stageNum, stageLabel, title, bullets, notes, footer, drawRight)` | Content slide; pass `drawRight` callback for right-side visuals |
| `workedExSlide(pres, stageNum, stageLabel, title, steps, notes, footer, drawRight)` | Worked example slide |
| `cfuSlide(pres, stageNum, stageLabel, title, technique, question, notes, footer)` | Check for understanding |
| `exitTicketSlide(pres, questions, notes, footer)` | Exit ticket / assessment (title hardcoded) |
| `closingSlide(pres, prompt, keyPoints, notes)` | Closing slide with Turn & Talk prompt |

PV helpers additionally export maths-specific helpers: `addPlaceValueChart`, `addTenthsStrip`, `addAreaModel`, `addNumberLine`, `addDecimalDot`, `addTextOnShape`, `validateBounds`.

### Import Pattern

```javascript
const { C, FONT_H, FONT_B, SAFE_BOTTOM, CONTENT_TOP,
        withReveal,
        titleSlide, liSlide, contentSlide, workedExSlide,
        cfuSlide, exitTicketSlide, closingSlide,
        addCard, addTopBar, addBadge, addStageBadge, addTitle, addFooter,
        iconToBase64Png, addPlaceValueChart, addNumberLine,
        addTextOnShape, validateContrast, getContrastColor,
        makeShadow, makeCardShadow } = require("../themes/pv_helpers");
```

### Creating a New Theme

When starting a new lesson unit:
1. Create `themes/<prefix>_palette.js` — define colours, fonts, shadow factories
2. Create `themes/<prefix>_helpers.js` — re-export palette, add element helpers and full slide builders
3. Follow the existing pattern in `themes/pv_palette.js` / `themes/pv_helpers.js`
4. Build scripts go in `builds/` and import with `require("../themes/<prefix>_helpers")`

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
  () => cfuSlide(pres, 2, "Check", "Quick Check", "Show Me Boards",
                 "What is 3 × 4?", notes, footer),
  (slide) => {
    addTextOnShape(slide, "Answer: 12", {
      x: 3.5, y: 4.2, w: 3, h: 0.6, rectRadius: 0.08,
      fill: { color: C.TEAL },
    }, { fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true });
  }
);
// Creates 2 slides: question-only → question + answer

// Content slide with hidden definition
withReveal(
  () => contentSlide(pres, 1, "Vocabulary", "Key Term: Equivalent",
                     ["What does 'equivalent' mean in maths?"], notes, footer),
  (slide) => {
    addCard(slide, 0.5, 3.0, 9, 1.5, { strip: C.TEAL });
    slide.addText("Equivalent means equal in value, even if represented differently.\ne.g. 3/6 = 1/2", {
      x: 0.75, y: 3.15, w: 8.5, h: 1.2,
      fontSize: 16, fontFace: FONT_B, color: C.CHARCOAL, margin: 0,
    });
  }
);
```

### When to Use

The megaprompt guides the agent to use `withReveal` agentic-ally based on slide type:

| Slide Type | Reveal Content | Use `withReveal`? |
|------------|---------------|-------------------|
| CFU slides | Expected student response / answer | **Yes** |
| Problem pairs (We Do) | The solution | **Yes** |
| Hinge questions | Answer + explanation | **Yes** |
| Worked example (I Do) | Typically NO — teacher narrates live | Usually no |
| Exit ticket (You Do) | Students work independently | No |
| Title / LI / Closing | No hidden content | No |

### Notes

- Both slides share the same teacher notes (the `notes` param is applied to both).
- The question slide and answer slide are consecutive — no other slides should be inserted between them.
- The `revealFn` callback receives the full PptxGenJS slide object — you can add any element (text, shapes, images, charts).
- Available in all three themes: `pv_helpers`, `skellig_helpers`, `wh_helpers`.

---

## Resource System

Lessons reference printable student resources (worksheets, graphic organisers, scaffold cards, answer keys) that teachers must print before the lesson. These are generated as **companion PDF files** alongside the PPTX, bundled in a per-lesson output folder.

### How It Works

1. **Build script generates PDFs** using `themes/pdf_helpers.js` (pdfkit-based)
2. **PDFs go in the same folder** as the PPTX (e.g., `output/Lesson_PV1/`)
3. **A "Resources" slide** at the end of the PPTX lists all companion files with clickable hyperlinks
4. **Teacher clicks a link** → PDF opens in default viewer → teacher prints it

### pdf_helpers.js Exports

`themes/pdf_helpers.js` is theme-agnostic — pass colours as 6-char hex strings. Uses built-in Helvetica fonts (no font files needed).

**Document lifecycle:**

| Function | Purpose |
|----------|---------|
| `createPdf(opts)` | Create a new A4 PDF document (`{ title, author, margin }`) |
| `writePdf(doc, filePath)` | Write PDF to file (creates parent dirs). Returns a promise. |

**Page elements:**

| Function | Purpose |
|----------|---------|
| `addPdfHeader(doc, title, opts)` | Coloured title bar + subtitle + Name/Date fields. Returns y. |
| `addSectionHeading(doc, text, y, opts)` | Section heading with left accent bar. Returns y. |
| `addBodyText(doc, text, y, opts)` | Body paragraph. Returns y. |
| `addPvChartPdf(doc, y, headers, opts)` | Place value chart (empty or pre-filled). Returns `{ y, bottomY }`. |
| `addWriteLine(doc, label, y, opts)` | Labelled write-on line (e.g., "Numeral: ____"). Returns y. |
| `addProblem(doc, num, prompt, y, opts)` | Numbered problem with optional chart + write lines. Auto-paginates. Returns y. |
| `addStepInstructions(doc, steps, y, opts)` | "First… Next… Then…" instruction block. Returns y. |
| `addTipBox(doc, text, y, opts)` | Light-background tip/reminder box. Returns y. |
| `addPdfFooter(doc, text, opts)` | Page footer (lesson info). |
| `addLinedArea(doc, y, lineCount, opts)` | Blank lined writing area. Returns y. |
| `addTwoColumnOrganiser(doc, leftHeader, rightHeader, y, opts)` | Two-column graphic organiser. Returns y. |

**PPTX integration:**

| Function | Purpose |
|----------|---------|
| `addResourceSlide(pres, resources, theme, footer, notes)` | Add a "Teacher Resources" slide to the PPTX with clickable PDF links. |

### Resource Slide

Every lesson with companion PDFs should include a resource slide. Add it **after the last content slide** (before or after the closing slide — your choice):

```javascript
const { addResourceSlide } = require("../themes/pdf_helpers");

addResourceSlide(
  pres,
  [
    {
      name: "SR3 — Place Value Worksheet",
      fileName: "SR3_Place_Value_Worksheet.pdf",  // relative to PPTX location
      description: "Independent practice — 8 problems.",
    },
    {
      name: "SR4 — Example Answer",
      fileName: "SR4_Example_Answer.pdf",
      description: "Answer key for enabling students.",
    },
  ],
  { C, FONT_H, FONT_B },  // pass your theme colours
  FOOTER,
  NOTES_RESOURCES
);
```

### Generating a PDF Resource

```javascript
const {
  createPdf, writePdf, addPdfHeader, addSectionHeading,
  addProblem, addTipBox, addPdfFooter,
} = require("../themes/pdf_helpers");

async function generateWorksheet() {
  const doc = createPdf({ title: "My Worksheet" });

  let y = addPdfHeader(doc, "Worksheet Title", {
    subtitle: "Supporting Resource 1",
    color: C.NAVY,       // 6-char hex, no #
    lessonInfo: "Lesson 1 of 10 | Unit Name | Grade X",
  });

  y = addTipBox(doc, "Remember: key instruction here.", y, { color: C.TEAL });

  y = addSectionHeading(doc, "Section A: Practice Problems", y, { color: C.NAVY });

  y = addProblem(doc, 1, "Problem prompt text", y, {
    headers: ["TTh", "Th", "H", "T", "O"],  // optional PV chart
    writeLines: [{ label: "Answer:" }],       // optional write lines
    color: C.NAVY,
  });

  // For answer keys, add chartValues and answer text:
  y = addProblem(doc, 1, "Same prompt", y, {
    headers: ["TTh", "Th", "H", "T", "O"],
    chartValues: [2, 4, 3, 5, 6],            // pre-filled chart
    writeLines: [{ label: "Answer:", answer: "24 356" }],  // answer shown
    color: C.NAVY,
  });

  addPdfFooter(doc, "Lesson info footer");
  await writePdf(doc, OUT_DIR + "/SR1_Worksheet.pdf");
}
```

### What Resources to Generate

The megaprompt (`#RESOURCE_GENERATION` section) instructs the agent to generate resources based on what the lesson references. Common types:

| Resource Type | When to Generate |
|---------------|-----------------|
| **Practice worksheet** | Every You Do stage that references "SR" or a worksheet |
| **Answer key / scaffold** | When enabling students need a worked reference |
| **Graphic organiser** | When teacher notes mention a template, frame, or organiser |
| **Exit ticket** (printable) | When the exit ticket should be done on paper, not in workbooks |
| **Vocabulary cards** | When key terms need to be cut out or displayed |
| **Teacher resource checklist** | Optional — one-page list of everything to prepare |

### Naming Convention

| Pattern | Example |
|---------|---------|
| Worksheet | `SR3_Place_Value_Worksheet.pdf` |
| Answer key | `SR4_Example_Answer.pdf` |
| Graphic organiser | `GO1_Character_Profile.pdf` |
| Exit ticket | `ET_Lesson5_Exit_Ticket.pdf` |
| Teacher checklist | `Teacher_Resource_Checklist.pdf` |

### Hyperlinks

PptxGenJS hyperlinks use relative paths. When the PPTX and PDFs are in the same folder, use just the filename:

```javascript
hyperlink: { url: "SR3_Worksheet.pdf", tooltip: "Open worksheet" }
```

This works when the teacher opens the PPTX from the lesson folder. The link opens the PDF in the default viewer.

---

## Design Ideas

**Don't create boring slides.** Plain bullets on a white background won't impress anyone.

### Before Starting

- **Pick a bold, content-informed colour palette**: The palette should feel designed for THIS topic. If swapping your colours into a completely different presentation would still "work," you haven't made specific enough choices.
- **Dominance over equality**: One colour should dominate (60–70% visual weight), with 1–2 supporting tones and one sharp accent. Never give all colours equal weight.
- **Dark/light contrast**: Dark backgrounds for title + conclusion slides, light for content ("sandwich" structure). Or commit to dark throughout for a premium feel.
- **Commit to a visual motif**: Pick ONE distinctive element and repeat it — rounded image frames, icons in coloured circles, thick single-side borders. Carry it across every slide.

### Colour Palettes

Choose colours that match your topic — don't default to generic blue. Use these palettes as inspiration:

| Theme | Primary | Secondary | Accent |
|-------|---------|-----------|--------|
| **Midnight Executive** | `1E2761` (navy) | `CADCFC` (ice blue) | `FFFFFF` (white) |
| **Forest & Moss** | `2C5F2D` (forest) | `97BC62` (moss) | `F5F5F5` (cream) |
| **Coral Energy** | `F96167` (coral) | `F9E795` (gold) | `2F3C7E` (navy) |
| **Warm Terracotta** | `B85042` (terracotta) | `E7E8D1` (sand) | `A7BEAE` (sage) |
| **Ocean Gradient** | `065A82` (deep blue) | `1C7293` (teal) | `21295C` (midnight) |
| **Charcoal Minimal** | `36454F` (charcoal) | `F2F2F2` (off-white) | `212121` (black) |
| **Teal Trust** | `028090` (teal) | `00A896` (seafoam) | `02C39A` (mint) |
| **Berry & Cream** | `6D2E46` (berry) | `A26769` (dusty rose) | `ECE2D0` (cream) |
| **Sage Calm** | `84B59F` (sage) | `69A297` (eucalyptus) | `50808E` (slate) |
| **Cherry Bold** | `990011` (cherry) | `FCF6F5` (off-white) | `2F3C7E` (navy) |

### For Each Slide

**Every slide needs a visual element** — image, chart, icon, or shape. Text-only slides are forgettable.

**Layout options:**
- Two-column (text left, illustration on right)
- Icon + text rows (icon in coloured circle, bold header, description below)
- 2x2 or 2x3 grid (image on one side, grid of content blocks on other)
- Half-bleed image (full left or right side) with content overlay

**Data display:**
- Large stat callouts (big numbers 60–72pt with small labels below)
- Comparison columns (before/after, pros/cons, side-by-side options)
- Timeline or process flow (numbered steps, arrows)

**Visual polish:**
- Icons in small coloured circles next to section headers
- Italic accent text for key stats or taglines

### Typography

**Choose an interesting font pairing** — don't default to Arial.

| Header Font | Body Font |
|-------------|-----------|
| Georgia | Calibri |
| Arial Black | Arial |
| Calibri | Calibri Light |
| Cambria | Calibri |
| Trebuchet MS | Calibri |
| Impact | Arial |
| Palatino | Garamond |
| Consolas | Calibri |

| Element | Size |
|---------|------|
| Slide title | 36–44pt bold |
| Section header | 20–24pt bold |
| Body text | 14–16pt |
| Captions | 10–12pt muted |

### Spacing

- 0.5" minimum margins
- 0.3–0.5" between content blocks
- Leave breathing room — don't fill every inch

### Avoid (Common Mistakes)

- **Don't repeat the same layout** — vary columns, cards, and callouts across slides
- **Don't centre body text** — left-align paragraphs and lists; centre only titles
- **Don't skimp on size contrast** — titles need 36pt+ to stand out from 14–16pt body
- **Don't default to blue** — pick colours that reflect the specific topic
- **Don't mix spacing randomly** — choose 0.3" or 0.5" gaps and use consistently
- **Don't style one slide and leave the rest plain** — commit fully or keep it simple throughout
- **Don't create text-only slides** — add images, icons, charts, or visual elements; avoid plain title + bullets
- **Don't forget text box padding** — when aligning lines or shapes with text edges, set `margin: 0` on the text box or offset the shape to account for padding
- **Don't use low-contrast elements** — icons AND text need strong contrast against the background. **Never use the same palette colour for both text and its background fill** (e.g., gold text on gold pill, olive text on olive banner). Use white text on coloured fills, dark text on light fills.
- **NEVER use accent lines under titles** — these are a hallmark of AI-generated slides; use whitespace or background colour instead

### Layout Safety (16:9 slides — 10" x 5.625")

**These are hard limits. Violating them causes elements to collide or overflow off-screen.**

| Zone | Y range | Purpose |
|------|---------|---------|
| Top bar | 0 – 0.06" | Coloured accent bar |
| Badge + title | 0.2 – 1.2" | Stage badge and slide title |
| Content area | 1.3 – 5.1" | Cards, text, icons, all content |
| Footer | 5.3 – 5.5" | Lesson/week label |

- **SAFE_BOTTOM = 5.1"** — no content element should extend below this y coordinate
- **Footer lives at y = 5.3"** — the 0.2" gap between content and footer is non-negotiable
- **When placing bottom elements** (tip bars, celebration banners, connection prompts), calculate: `element_y + element_h <= 5.1`
- **For dynamic content** (bullet lists, grids with variable item counts), calculate total height first and clamp or shrink per-item spacing to stay within the safe zone
- **Icons on coloured backgrounds must have strong contrast** — use white icons on dark circles (e.g., `C.NAVY`, `C.TEAL`, `C.CORAL`), not dark icons on dark backgrounds. If the icon colour matches the background, it will be invisible.
- **Text colour must NEVER match or be close to its background fill** — this is the #1 readability failure. Before writing any `addText` call, check what's behind it (shape fill, card fill, slide background). If the text colour and background colour are from the same palette entry, the text will be invisible. **Rule: on coloured fills, use `C.WHITE` for text. On light fills (`C.WHITE`, `C.CREAM`, `C.LIGHT`), use `C.CHARCOAL` or another dark colour for text.** This applies to pill badges, banners, cards, and any shape with overlaid text.
- **Pill badges / tag grids**: When laying out multiple pill shapes in a grid, test with the widest expected text. Use consistent pill widths or calculate: `pillX + pillW <= 9.5` (right margin). For grids, use `Math.floor((availableWidth) / (pillW + gap))` to determine columns dynamically.

---

## QA (Required)

**Assume there are problems. Your job is to find them.**

Your first render is almost never correct. Approach QA as a bug hunt, not a confirmation step.

### Content QA

```bash
python -m markitdown output/<filename>.pptx
```

Check for missing content, typos, wrong order.

### Visual QA

**Use subagents** — even for 2–3 slides. You've been staring at the code and will see what you expect, not what's there. Subagents have fresh eyes.

Convert slides to images, then inspect:

```bash
# Convert PPTX to individual JPGs in slidetemp/ (LibreOffice + PyMuPDF, no Poppler needed)
python scripts/pptx_to_images.py output/<filename>.pptx [--prefix slide] [--dpi 150]
```

This creates `slidetemp/slide-01.jpg`, `slidetemp/slide-02.jpg`, etc.

Inspect with this prompt:

```
Visually inspect these slides. Assume there are issues — find them.

Look for:
- Overlapping elements (text through shapes, lines through words, stacked elements)
- Text overflow or cut off at edges/box boundaries
- Decorative lines positioned for single-line text but title wrapped to two lines
- Source citations or footers colliding with content above
- Elements too close (< 0.3" gaps) or cards/sections nearly touching
- Uneven gaps (large empty area in one place, cramped in another)
- Insufficient margin from slide edges (< 0.5")
- Columns or similar elements not aligned consistently
- Low-contrast text (e.g., light gray text on cream background)
- Low-contrast icons (e.g., dark icons on dark backgrounds without a contrasting circle)
- Text boxes too narrow causing excessive wrapping
- Leftover placeholder content

For each slide, list issues or areas of concern, even if minor.
```

### Verification Loop

1. Generate slides → Convert to images in `slidetemp/` → Inspect
2. **List issues found** (if none found, look again more critically)
3. Fix issues
4. **Re-verify affected slides** — one fix often creates another problem
5. Repeat until a full pass reveals no new issues
6. **Clean up**: `python scripts/pptx_to_images.py --clean` (removes `slidetemp/`)

**Do not declare success until you've completed at least one fix-and-verify cycle.**
**Always clean up `slidetemp/` when QA is complete** — these images are disposable and should not persist.

---

## Dependencies

```bash
# Python (for content extraction and visual QA)
pip install "markitdown[pptx]" Pillow pymupdf

# Node (installed locally via package.json)
npm install    # pptxgenjs, pdfkit, react, react-dom, react-icons, sharp

# System (for visual QA)
# LibreOffice (soffice) must be installed — Poppler/pdftoppm is NOT needed
```

---

## PptxGenJS Tutorial

### Setup & Basic Structure

```javascript
const pptxgen = require("pptxgenjs");
const fs = require("fs");

if (!fs.existsSync("output")) fs.mkdirSync("output");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';  // or 'LAYOUT_16x10', 'LAYOUT_4x3', 'LAYOUT_WIDE'
pres.author = 'Your Name';
pres.title = 'Presentation Title';

let slide = pres.addSlide();
slide.addText("Hello World!", { x: 0.5, y: 0.5, fontSize: 36, color: "363636" });

pres.writeFile({ fileName: "output/My_Presentation.pptx" });
```

### Layout Dimensions

Slide dimensions (coordinates in inches):
- `LAYOUT_16x9`: 10" × 5.625" (default)
- `LAYOUT_16x10`: 10" × 6.25"
- `LAYOUT_4x3`: 10" × 7.5"
- `LAYOUT_WIDE`: 13.3" × 7.5"

### Text & Formatting

```javascript
// Basic text
slide.addText("Simple Text", {
  x: 1, y: 1, w: 8, h: 2, fontSize: 24, fontFace: "Arial",
  color: "363636", bold: true, align: "center", valign: "middle"
});

// Character spacing (use charSpacing, not letterSpacing which is silently ignored)
slide.addText("SPACED TEXT", { x: 1, y: 1, w: 8, h: 1, charSpacing: 6 });

// Rich text arrays
slide.addText([
  { text: "Bold ", options: { bold: true } },
  { text: "Italic ", options: { italic: true } }
], { x: 1, y: 3, w: 8, h: 1 });

// Multi-line text (requires breakLine: true)
slide.addText([
  { text: "Line 1", options: { breakLine: true } },
  { text: "Line 2", options: { breakLine: true } },
  { text: "Line 3" }  // Last item doesn't need breakLine
], { x: 0.5, y: 0.5, w: 8, h: 2 });

// Text box margin (internal padding)
slide.addText("Title", {
  x: 0.5, y: 0.3, w: 9, h: 0.6,
  margin: 0  // Use 0 when aligning text with other elements like shapes or icons
});
```

**Tip:** Text boxes have internal margin by default. Set `margin: 0` when you need text to align precisely with shapes, lines, or icons at the same x-position.

### Lists & Bullets

```javascript
// Multiple bullets
slide.addText([
  { text: "First item", options: { bullet: true, breakLine: true } },
  { text: "Second item", options: { bullet: true, breakLine: true } },
  { text: "Third item", options: { bullet: true } }
], { x: 0.5, y: 0.5, w: 8, h: 3 });

// NEVER use unicode bullets — creates double bullets
// slide.addText("• First item", { ... });  // DON'T DO THIS

// Sub-items and numbered lists
{ text: "Sub-item", options: { bullet: true, indentLevel: 1 } }
{ text: "First", options: { bullet: { type: "number" }, breakLine: true } }
```

### Shapes

```javascript
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 0.8, w: 1.5, h: 3.0,
  fill: { color: "FF0000" }, line: { color: "000000", width: 2 }
});

slide.addShape(pres.shapes.OVAL, { x: 4, y: 1, w: 2, h: 2, fill: { color: "0000FF" } });

slide.addShape(pres.shapes.LINE, {
  x: 1, y: 3, w: 5, h: 0, line: { color: "FF0000", width: 3, dashType: "dash" }
});

// With transparency
slide.addShape(pres.shapes.RECTANGLE, {
  x: 1, y: 1, w: 3, h: 2,
  fill: { color: "0088CC", transparency: 50 }
});

// Rounded rectangle (rectRadius only works with ROUNDED_RECTANGLE, not RECTANGLE)
// Don't pair with rectangular accent overlays — they won't cover rounded corners.
slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 1, y: 1, w: 3, h: 2,
  fill: { color: "FFFFFF" }, rectRadius: 0.1
});

// With shadow
slide.addShape(pres.shapes.RECTANGLE, {
  x: 1, y: 1, w: 3, h: 2,
  fill: { color: "FFFFFF" },
  shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.15 }
});
```

Shadow options:

| Property | Type | Range | Notes |
|----------|------|-------|-------|
| `type` | string | `"outer"`, `"inner"` | |
| `color` | string | 6-char hex (e.g. `"000000"`) | No `#` prefix, no 8-char hex |
| `blur` | number | 0–100 pt | |
| `offset` | number | 0–200 pt | **Must be non-negative** — negative values corrupt the file |
| `angle` | number | 0–359 degrees | 135 = bottom-right, 270 = upward |
| `opacity` | number | 0.0–1.0 | Use this for transparency, never encode in colour string |

To cast a shadow upward (e.g. on a footer bar), use `angle: 270` with a positive offset — do **not** use a negative offset.

**Note**: Gradient fills are not natively supported. Use a gradient image as a background instead.

### Images

```javascript
// From file path
slide.addImage({ path: "images/chart.png", x: 1, y: 1, w: 5, h: 3 });

// From URL
slide.addImage({ path: "https://example.com/image.jpg", x: 1, y: 1, w: 5, h: 3 });

// From base64 (faster, no file I/O)
slide.addImage({ data: "image/png;base64,iVBORw0KGgo...", x: 1, y: 1, w: 5, h: 3 });

// Image options
slide.addImage({
  path: "image.png",
  x: 1, y: 1, w: 5, h: 3,
  rotate: 45,              // 0-359 degrees
  rounding: true,          // Circular crop
  transparency: 50,        // 0-100
  altText: "Description",  // Accessibility
  hyperlink: { url: "https://example.com" }
});

// Sizing modes
{ sizing: { type: 'contain', w: 4, h: 3 } }  // Fit inside, preserve ratio
{ sizing: { type: 'cover', w: 4, h: 3 } }    // Fill area, may crop
{ sizing: { type: 'crop', x: 0.5, y: 0.5, w: 2, h: 2 } }  // Cut specific portion
```

### Calculate Dimensions (preserve aspect ratio)

```javascript
const origWidth = 1978, origHeight = 923, maxHeight = 3.0;
const calcWidth = maxHeight * (origWidth / origHeight);
const centerX = (10 - calcWidth) / 2;

slide.addImage({ path: "image.png", x: centerX, y: 1.2, w: calcWidth, h: maxHeight });
```

### Icons

Use react-icons to generate SVG icons, then rasterise to PNG for universal compatibility.

```javascript
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaCheckCircle, FaChartLine } = require("react-icons/fa");

function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// Usage
const iconData = await iconToBase64Png(FaCheckCircle, "#4472C4", 256);
slide.addImage({ data: iconData, x: 1, y: 1, w: 0.5, h: 0.5 });
```

**Note**: Use size 256 or higher for crisp icons. The size parameter controls rasterisation resolution, not display size on the slide.

Icon libraries: `react-icons/fa` (Font Awesome), `react-icons/md` (Material Design), `react-icons/hi` (Heroicons), `react-icons/bi` (Bootstrap Icons).

### Slide Backgrounds

```javascript
slide.background = { color: "F1F1F1" };                              // Solid
slide.background = { color: "FF3399", transparency: 50 };            // With transparency
slide.background = { path: "https://example.com/bg.jpg" };           // Image URL
slide.background = { data: "image/png;base64,iVBORw0KGgo..." };      // Base64
```

### Tables

```javascript
slide.addTable([
  ["Header 1", "Header 2"],
  ["Cell 1", "Cell 2"]
], {
  x: 1, y: 1, w: 8, h: 2,
  border: { pt: 1, color: "999999" }, fill: { color: "F1F1F1" }
});

// Advanced with merged cells
let tableData = [
  [{ text: "Header", options: { fill: { color: "6699CC" }, color: "FFFFFF", bold: true } }, "Cell"],
  [{ text: "Merged", options: { colspan: 2 } }]
];
slide.addTable(tableData, { x: 1, y: 3.5, w: 8, colW: [4, 4] });
```

### Charts

```javascript
// Bar chart
slide.addChart(pres.charts.BAR, [{
  name: "Sales", labels: ["Q1", "Q2", "Q3", "Q4"], values: [4500, 5500, 6200, 7100]
}], {
  x: 0.5, y: 0.6, w: 6, h: 3, barDir: 'col',
  showTitle: true, title: 'Quarterly Sales'
});

// Line chart
slide.addChart(pres.charts.LINE, [{
  name: "Temp", labels: ["Jan", "Feb", "Mar"], values: [32, 35, 42]
}], { x: 0.5, y: 4, w: 6, h: 3, lineSize: 3, lineSmooth: true });

// Pie chart
slide.addChart(pres.charts.PIE, [{
  name: "Share", labels: ["A", "B", "Other"], values: [35, 45, 20]
}], { x: 7, y: 1, w: 5, h: 4, showPercent: true });
```

**Better-looking charts:**

```javascript
slide.addChart(pres.charts.BAR, chartData, {
  x: 0.5, y: 1, w: 9, h: 4, barDir: "col",
  chartColors: ["0D9488", "14B8A6", "5EEAD4"],
  chartArea: { fill: { color: "FFFFFF" }, roundedCorners: true },
  catAxisLabelColor: "64748B",
  valAxisLabelColor: "64748B",
  valGridLine: { color: "E2E8F0", size: 0.5 },
  catGridLine: { style: "none" },
  showValue: true,
  dataLabelPosition: "outEnd",
  dataLabelColor: "1E293B",
  showLegend: false,
});
```

### Slide Masters

```javascript
pres.defineSlideMaster({
  title: 'TITLE_SLIDE', background: { color: '283A5E' },
  objects: [{
    placeholder: { options: { name: 'title', type: 'title', x: 1, y: 2, w: 8, h: 2 } }
  }]
});

let titleSlide = pres.addSlide({ masterName: "TITLE_SLIDE" });
titleSlide.addText("My Title", { placeholder: "title" });
```

### PptxGenJS Pitfalls

1. **NEVER use "#" with hex colours** — causes file corruption. Use `"FF0000"` not `"#FF0000"`.
2. **NEVER encode opacity in hex colour strings** — 8-char colours (e.g., `"00000020"`) corrupt the file. Use the `opacity` property instead.
3. **Use `bullet: true`** — NEVER unicode symbols like "•" (creates double bullets).
4. **Use `breakLine: true`** between array items or text runs together.
5. **Avoid `lineSpacing` with bullets** — causes excessive gaps; use `paraSpaceAfter` instead.
6. **Each presentation needs a fresh instance** — don't reuse `pptxgen()` objects.
7. **NEVER reuse option objects across calls** — PptxGenJS mutates objects in-place. Use factory functions:
   ```javascript
   const makeShadow = () => ({ type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.15 });
   slide.addShape(pres.shapes.RECTANGLE, { shadow: makeShadow(), ... });
   slide.addShape(pres.shapes.RECTANGLE, { shadow: makeShadow(), ... });
   ```
8. **Don't use `ROUNDED_RECTANGLE` with accent borders** — rectangular overlay bars won't cover rounded corners. Use `RECTANGLE` instead.

### PptxGenJS Quick Reference

- **Shapes**: RECTANGLE, OVAL, LINE, ROUNDED_RECTANGLE
- **Charts**: BAR, LINE, PIE, DOUGHNUT, SCATTER, BUBBLE, RADAR
- **Layouts**: LAYOUT_16x9 (10"×5.625"), LAYOUT_16x10, LAYOUT_4x3, LAYOUT_WIDE
- **Alignment**: "left", "center", "right"
- **Chart data labels**: "outEnd", "inEnd", "center"
- **Supported image formats**: PNG, JPG, GIF (animated in M365), SVG (modern PowerPoint/M365)

---

## Defensive Layout Helpers (themes/pv_helpers.js)

These helpers prevent common visual errors at build time. **Always use them** when building slides with the PV theme system.

### Bounds Validation

Every visual helper (`addCard`, `addPlaceValueChart`, `addNumberLine`, `addTenthsStrip`, `addAreaModel`) validates bounds automatically and prints console warnings during `node builds/build_*.js` if elements overflow.

**Console warnings during build = layout bugs to fix.** Never ship a presentation with warnings.

### Place Value Charts — Auto-Sizing

`addPlaceValueChart` supports auto-sizing. Pass a total width and it calculates cell widths:

```javascript
// PREFERRED — chart fits within 4.2" total
addPlaceValueChart(slide, x, y, headers, values, { totalW: 4.2 });

// Also works — "w" is treated as totalW for backward compatibility
addPlaceValueChart(slide, x, y, headers, values, { w: 4.2 });

// Manual cell width — use only if you've calculated it fits
addPlaceValueChart(slide, x, y, headers, values, { cellW: 0.84 });
```

**Returns geometry** for downstream positioning (decimal dots, labels):
```javascript
const geo = addPlaceValueChart(slide, x, y, headers, values, { totalW: 4.0 });
// geo = { cellW, totalW, hdrH, valH, n, x, y }
addDecimalDot(slide, geo, 0, { color: C.CORAL }); // dot after column 0
```

### Number Lines — Adaptive Labels

`addNumberLine` auto-adjusts label width and font size when interval width drops below 0.5" (e.g., many labels on narrow widths). No configuration needed — it prevents label overlap automatically.

### Text on Shapes — `addTextOnShape`

**Always use this instead of separate addShape + addText calls.** It guarantees `valign:"middle"`, `align:"center"`, `margin:0` and validates contrast:

```javascript
addTextOnShape(slide, "24 812", {
  x: 1, y: 2, w: 3, h: 0.5, rectRadius: 0.08,
  fill: { color: C.NAVY },
}, {
  fontSize: 22, fontFace: FONT_H, color: C.WHITE, bold: true,
});
```

### Contrast Validation

Available from both `themes/pv_palette.js` and `themes/pv_helpers.js`:

```javascript
// Auto-pick WHITE or CHARCOAL for a given background
const textColor = getContrastColor(C.AMBER);  // → C.CHARCOAL

// Manual check — warns to console if contrast < 4.5:1 (WCAG AA)
validateContrast(textColor, bgColor, "my label badge");
```

**`addTextOnShape` runs contrast validation automatically.** For manual `addText` calls on coloured backgrounds, call `validateContrast` yourself or use `getContrastColor` to pick the text colour.