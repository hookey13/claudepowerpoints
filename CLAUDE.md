# PPTX Lesson Generator

Node.js project using PptxGenJS to generate explicit teaching slide decks with companion PDF resources. Theme system provides 150 pre-built palettes across 5 subjects x 5 year levels x 6 weekly variants.

## Commands

```bash
node builds/build_<unit>_lesson<n>.js          # Build a lesson (run from project root)
node test_theme.js <subject> <level> [variant]  # Test a theme combo
python -m markitdown output/<file>.pptx         # Content QA — check text, order, typos
python scripts/pptx_to_images.py output/<file>.pptx  # Visual QA — slides to slidetemp/*.jpg
python scripts/pptx_to_images.py --clean        # Delete slidetemp/ after QA
```

## Project Layout

```
themes/factory.js          # createTheme(subject, yearLevel, variant) — single entry point
themes/core/               # Shared utilities (layout, contrast, icons, shadows, elements, withReveal)
themes/builders/           # Slide builders by subject (base, literacy, numeracy, inquiry, wellbeing, science)
themes/palettes/           # Pure colour data (30 palettes per subject)
themes/pdf_helpers.js      # PDF resource generation (pdfkit)
builds/                    # One build script per lesson — writes to output/<LessonFolder>/
output/                    # Per-lesson folders (PPTX + companion PDFs)
megapromptlean.md          # Pedagogical framework — paste into conversation when planning lessons
docs/                      # Deep reference docs (read when needed, not every session)
```

## Theme API

```javascript
const { createTheme, weekToVariant } = require("../themes/factory");
const T = createTheme("literacy", "grade56", weekToVariant(3));
// T contains: C, FONT_H, FONT_B, all builders, withReveal, addCard, addFooter,
//   addTextOnShape, iconToBase64Png, getContrastColor, makeShadow, layout constants
```

Subjects: `literacy` | `numeracy` | `inquiry` | `wellbeing` | `science`
Year levels: `foundation` | `grade1` | `grade2` | `grade34` | `grade56`
Variants: `0`-`5` (use `weekToVariant(weekNumber)` for 1-based weeks)

For builder signatures, palette schema, and full API: read `docs/theme-system.md`.

## PptxGenJS Rules

- NEVER use `#` in hex colours — causes file corruption. Use `"FF0000"` not `"#FF0000"`.
- NEVER encode opacity in hex strings (8-char like `"00000020"`). Use `opacity` property.
- NEVER reuse option objects across calls — PptxGenJS mutates in-place. Use factory functions.
- Use `bullet: true`, never unicode `"•"` (creates double bullets).
- Use `breakLine: true` between text array items.
- Use `addTextOnShape` instead of separate addShape + addText — validates contrast automatically.
- Set `margin: 0` on text boxes that must align precisely with shapes or icons.
- `rectRadius` only works with `ROUNDED_RECTANGLE`, not `RECTANGLE`.
- Avoid `lineSpacing` with bullets — causes excessive gaps; use `paraSpaceAfter` instead.
- Shadow `offset` must be non-negative — negative values corrupt the file.
- Each presentation needs a fresh `new pptxgen()` instance.

For full PptxGenJS API reference: read `docs/pptxgenjs-reference.md`.

## Layout Safety (10" x 5.625")

Content area: y 1.3"-5.1". Footer: y 5.3". NEVER place content below y 5.1".
For dynamic content, calculate total height and clamp to stay within the safe zone.
Console warnings during build = layout bugs. Fix before shipping.

## Key Conventions

- Palette uses semantic keys: PRIMARY, SECONDARY, ACCENT, ALERT, SUCCESS, BG_DARK, BG_LIGHT, BG_CARD, CHARCOAL, WHITE, MUTED. Backward-compatible aliases exist (C.NAVY, C.CREAM, C.TEAL).
- White text on coloured fills. Dark text on light fills. NEVER same colour for text and its background.
- White icons need a coloured circle background on light surfaces.
- `withReveal(buildFn, revealFn)` creates duplicate slide pairs for click-to-reveal. Use for CFU answers, We Do solutions, hinge questions. Do NOT use for I Do, exit tickets, or titles.
- Every lesson with companion PDFs gets a resource slide via `addResourceSlide()` from `pdf_helpers.js`.
- Output goes to `output/<LessonFolder>/` — PPTX and all PDFs in the same folder.
- PptxGenJS hyperlinks use relative paths — just the filename when PPTX and PDFs share a folder.

For resource generation details and PDF helper API: read `docs/resource-system.md`.
For ad-hoc (non-themed) presentation design guidance: read `docs/design-guide.md`.

## QA (Required)

First render is almost never correct. After every build:
1. Content QA (`markitdown`) — check for missing content, wrong order, typos.
2. Visual QA (`pptx_to_images.py`) — convert to images in `slidetemp/`.
3. Inspect slide images using a subagent with fresh eyes. Look for: overlaps, overflow, low contrast, uneven spacing, missing elements, text cut off, elements below 5.1".
4. Fix issues, re-verify affected slides. One fix often creates another problem.
5. Repeat until a full pass reveals no new issues.
6. Clean up: `python scripts/pptx_to_images.py --clean`

## Dependencies

```bash
pip install "markitdown[pptx]" Pillow pymupdf   # Python: content + visual QA
npm install                                       # Node: pptxgenjs, pdfkit, react-icons, sharp
# LibreOffice (soffice) must be on PATH for visual QA
```
