# PPTX Skill for Claude Code

Use this guide any time a .pptx file is involved — creating, reading, editing, or manipulating presentations.

---

## Quick Reference

| Task | Method |
|------|--------|
| Read/analyse content | `python -m markitdown presentation.pptx` |
| Edit or create from template | See [Editing Presentations](#editing-presentations) |
| Create from scratch | See [PptxGenJS Tutorial](#pptxgenjs-tutorial) |

---

## Project Structure

```
project/
├── CLAUDE.md                  # This file
├── build_presentation.js      # Generation script (one per presentation)
├── scripts/
│   └── pptx_to_images.py     # PPTX → slide images for QA
├── output/                    # Finished .pptx files go here
│   └── Presentation.pptx
└── slidetemp/                 # Temporary QA images (auto-cleaned)
    ├── slide-01.jpg
    └── slide-02.jpg
```

- **`output/`** — all generated .pptx files. Created automatically by build scripts.
- **`slidetemp/`** — temporary slide images for visual QA. **Always delete after QA** via `python scripts/pptx_to_images.py --clean`. Never commit this folder.

---

## Reading Content

```bash
# Text extraction
python -m markitdown presentation.pptx

# Visual overview (thumbnail grid)
python scripts/thumbnail.py presentation.pptx

# Raw XML inspection
python scripts/office/unpack.py presentation.pptx unpacked/
```

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
- **Icons on coloured backgrounds must have strong contrast** — use white icons on dark circles (`C.OLIVE`, `C.GOLD`, `C.BURGUNDY`), not dark icons on dark backgrounds. If the icon colour matches the background, it will be invisible.
- **Text colour must NEVER match or be close to its background fill** — this is the #1 readability failure. Before writing any `addText` call, check what's behind it (shape fill, card fill, slide background). If the text colour and background colour are from the same palette entry (e.g., `C.GOLD` text on a `C.GOLD` fill, even with transparency), the text will be invisible. **Rule: on coloured fills, use `C.WHITE` for text. On light fills (`C.WHITE`, `C.IVORY`, `C.WARM`, `C.CREAM_DARK`), use `C.CHARCOAL`, `C.OLIVE`, or another dark colour for text.** This applies to pill badges, banners, cards, and any shape with overlaid text.
- **Pill badges / tag grids**: When laying out multiple pill shapes in a grid, test with the widest expected text. Use consistent pill widths or calculate: `pillX + pillW <= 9.5` (right margin). For grids, use `Math.floor((availableWidth) / (pillW + gap))` to determine columns dynamically.

---

## QA (Required)

**Assume there are problems. Your job is to find them.**

Your first render is almost never correct. Approach QA as a bug hunt, not a confirmation step.

### Content QA

```bash
python -m markitdown output/Presentation.pptx
```

Check for missing content, typos, wrong order.

**When using templates, check for leftover placeholder text:**

```bash
python -m markitdown output/Presentation.pptx | grep -iE "xxxx|lorem|ipsum|this.*(page|slide).*layout"
```

### Visual QA

**Use subagents** — even for 2–3 slides. You've been staring at the code and will see what you expect, not what's there. Subagents have fresh eyes.

Convert slides to images, then inspect:

```bash
# Convert PPTX to individual JPGs in slidetemp/ (LibreOffice + PyMuPDF, no Poppler needed)
python scripts/pptx_to_images.py output/Presentation.pptx [--prefix slide] [--dpi 150]
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

1. Generate slides to `output/` → Convert to images in `slidetemp/` → Inspect
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
# Python
pip install "markitdown[pptx]" Pillow pymupdf

# Node
npm install -g pptxgenjs

# For icons (optional)
npm install -g react-icons react react-dom sharp

# System (for visual QA)
# LibreOffice (soffice) must be installed — Poppler/pdftoppm is NOT needed
```

---

## Editing Presentations

### Template-Based Workflow

When using an existing presentation as a template:

1. **Analyse existing slides**:
   ```bash
   python scripts/thumbnail.py template.pptx
   python -m markitdown template.pptx
   ```
   Review `thumbnails.jpg` to see layouts, and markitdown output to see placeholder text.

2. **Plan slide mapping**: For each content section, choose a template slide.

   **USE VARIED LAYOUTS** — monotonous presentations are a common failure mode. Don't default to basic title + bullet slides. Actively seek out: multi-column layouts, image + text combos, full-bleed images with text overlay, quote/callout slides, section dividers, stat/number callouts, icon grids.

   Match content type to layout style (e.g., key points → bullet slide, team info → multi-column, testimonials → quote slide).

3. **Unpack**: `python scripts/office/unpack.py template.pptx unpacked/`

4. **Build presentation** (do this yourself, not with subagents):
   - Delete unwanted slides (remove from `<p:sldIdLst>`)
   - Duplicate slides you want to reuse (`add_slide.py`)
   - Reorder slides in `<p:sldIdLst>`
   - **Complete all structural changes before step 5**

5. **Edit content**: Update text in each `slide{N}.xml`.
   **Use subagents here if available** — slides are separate XML files, so subagents can edit in parallel.

6. **Clean**: `python scripts/clean.py unpacked/`

7. **Pack**: `python scripts/office/pack.py unpacked/ output.pptx --original template.pptx`

### Scripts

| Script | Purpose |
|--------|---------|
| `unpack.py` | Extract and pretty-print PPTX |
| `add_slide.py` | Duplicate slide or create from layout |
| `clean.py` | Remove orphaned files |
| `pack.py` | Repack with validation |
| `thumbnail.py` | Create visual grid of slides |

```bash
# Unpack
python scripts/office/unpack.py input.pptx unpacked/

# Add slide (duplicate existing)
python scripts/add_slide.py unpacked/ slide2.xml

# Add slide (from layout)
python scripts/add_slide.py unpacked/ slideLayout2.xml

# Clean orphaned files
python scripts/clean.py unpacked/

# Pack
python scripts/office/pack.py unpacked/ output.pptx --original input.pptx

# Thumbnails
python scripts/thumbnail.py input.pptx [output_prefix] [--cols N]
```

### Slide Operations

Slide order is in `ppt/presentation.xml` → `<p:sldIdLst>`.

- **Reorder**: Rearrange `<p:sldId>` elements.
- **Delete**: Remove `<p:sldId>`, then run `clean.py`.
- **Add**: Use `add_slide.py`. Never manually copy slide files.

### Editing Content

For each slide:
1. Read the slide's XML
2. Identify ALL placeholder content — text, images, charts, icons, captions
3. Replace each placeholder with final content

**Use the Edit tool, not sed or Python scripts.** The Edit tool forces specificity.

### Formatting Rules

- **Bold all headers, subheadings, and inline labels**: Use `b="1"` on `<a:rPr>`.
- **Never use unicode bullets (•)**: Use proper list formatting with `<a:buChar>` or `<a:buAutoNum>`.
- **Bullet consistency**: Let bullets inherit from the layout. Only specify `<a:buChar>` or `<a:buNone>`.

### Template Pitfalls

**When source content has fewer items than the template:**
- **Remove excess elements entirely** (images, shapes, text boxes), don't just clear text.
- Check for orphaned visuals after clearing text content.

**When replacing text with different-length content:**
- Shorter replacements: usually safe.
- Longer replacements: may overflow or wrap unexpectedly.
- Test with visual QA after text changes.

**Multi-item content:** If source has multiple items (numbered lists, multiple sections), create separate `<a:p>` elements for each — **never concatenate into one string**.

**Smart quotes:** When adding new text with quotes in XML, use XML entities:
```xml
<a:t>the &#x201C;Agreement&#x201D;</a:t>
```

| Character | Unicode | XML Entity |
|-----------|---------|------------|
| " (left double) | U+201C | `&#x201C;` |
| " (right double) | U+201D | `&#x201D;` |
| ' (left single) | U+2018 | `&#x2018;` |
| ' (right single) | U+2019 | `&#x2019;` |

- **Whitespace**: Use `xml:space="preserve"` on `<a:t>` with leading/trailing spaces.
- **XML parsing**: Use `defusedxml.minidom`, not `xml.etree.ElementTree` (corrupts namespaces).

---

## PptxGenJS Tutorial

### Setup & Basic Structure

```javascript
const pptxgen = require("pptxgenjs");
const fs = require("fs");

// Ensure output directory exists
if (!fs.existsSync("output")) fs.mkdirSync("output");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';  // or 'LAYOUT_16x10', 'LAYOUT_4x3', 'LAYOUT_WIDE'
pres.author = 'Your Name';
pres.title = 'Presentation Title';

let slide = pres.addSlide();
slide.addText("Hello World!", { x: 0.5, y: 0.5, fontSize: 36, color: "363636" });

pres.writeFile({ fileName: "output/Presentation.pptx" });
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