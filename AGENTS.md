# PPTX Lesson Generator

Node.js project using PptxGenJS to generate explicit teaching slide decks with companion PDF resources. Theme system provides 150 pre-built palettes across 5 subjects x 5 year levels x 6 weekly variants.

## Commands

```bash
node builds/build_<unit>_lesson<n>.js          # Build a lesson (run from project root)
node test_theme.js <subject> <level> [variant] # Test a theme combo
python -m markitdown output/<file>.pptx        # Content QA - check text, order, typos
python scripts/pptx_to_images.py output/<file>.pptx  # Optional local preview - slides to slidetemp/*.jpg
python scripts/pptx_to_images.py --clean       # Delete slidetemp/ after QA
```

## Project Layout

```
themes/factory.js          # createTheme(subject, yearLevel, variant) - single entry point
themes/core/               # Shared utilities (layout, contrast, icons, shadows, elements, withReveal)
themes/builders/           # Slide builders by subject (base, literacy, numeracy, inquiry, wellbeing, science)
themes/palettes/           # Pure colour data (30 palettes per subject)
themes/pdf_helpers.js      # PDF resource generation (pdfkit)
builds/                    # One build script per lesson - writes to output/<LessonFolder>/
output/                    # Per-lesson folders (PPTX + companion PDFs)
megapromptlean.md          # Pedagogical framework - paste into conversation when planning lessons
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

**Theme cohesion: All lessons in the same unit MUST use the same variant.** Switching palettes between lessons in a unit looks confusing and unprofessional. Pick one variant for the unit (typically based on the week number) and use it for every lesson. Different variants are for different weeks or different units, not different lessons within the same unit.

For builder signatures, palette schema, and full API: read `docs/theme-system.md`.

## PptxGenJS Rules

- NEVER use `#` in hex colours - causes file corruption. Use `"FF0000"` not `"#FF0000"`.
- NEVER encode opacity in hex strings (8-char like `"00000020"`). Use `opacity` property.
- NEVER reuse option objects across calls - PptxGenJS mutates in-place. Use factory functions.
- Use `bullet: true`, never unicode bullet characters (creates double bullets).
- Use `breakLine: true` between text array items.
- Use `addTextOnShape` instead of separate addShape + addText - validates contrast automatically.
- Set `margin: 0` on text boxes that must align precisely with shapes or icons.
- `rectRadius` only works with `ROUNDED_RECTANGLE`, not `RECTANGLE`.
- Avoid `lineSpacing` with bullets - causes excessive gaps; use `paraSpaceAfter` instead.
- Shadow `offset` must be non-negative - negative values corrupt the file.
- Each presentation needs a fresh `new pptxgen()` instance.
- Always set `pres.layout = "LAYOUT_16x9"`. NEVER use `"LAYOUT_WIDE"` (wrong dimensions).

For full PptxGenJS API reference: read `docs/pptxgenjs-reference.md`.

## Layout Safety (10" x 5.625")

**Slide layout: Always use `pres.layout = "LAYOUT_16x9"` (10" x 5.625").** NEVER use `"LAYOUT_WIDE"` - it creates a 13.33" x 7.5" canvas but all theme builders and positioning constants assume 10" x 5.625", causing content to appear cropped/small in the top-left portion of the slide.

Content area: y 1.3"-5.1". Footer: y 5.3". NEVER place content below y 5.1".
For dynamic content, calculate total height and clamp to stay within the safe zone.
Console warnings during build = layout bugs. Fix before shipping.

## Key Conventions

- Palette uses semantic keys: PRIMARY, SECONDARY, ACCENT, ALERT, SUCCESS, BG_DARK, BG_LIGHT, BG_CARD, CHARCOAL, WHITE, MUTED. Backward-compatible aliases exist (C.NAVY, C.CREAM, C.TEAL).
- White text on coloured fills. Dark text on light fills. NEVER same colour for text and its background.
- White icons need a coloured circle background on light surfaces.
- `withReveal(buildFn, revealFn)` creates duplicate slide pairs for click-to-reveal. Use for CFU answers, We Do solutions, hinge questions. Do NOT use for I Do, exit tickets, or titles.
- Every lesson with companion PDFs gets a resource slide via `addResourceSlide()` from `pdf_helpers.js`.
- Output goes to `output/<LessonFolder>/` - PPTX at the root, companion PDFs in a `resources-lesson{N}/` subfolder (N = lesson number in the unit/week).
- PptxGenJS hyperlinks use relative paths - include the subfolder prefix (e.g., `resources-lesson3/SR1_Worksheet.pdf`).
- `SAY:` notes are teacher cue bullets, not formal narration. Write 2-4 short, directly speakable bullets that sound natural in class, use light conversational glue only when it helps flow, and avoid slang, polished briefing tone, or mini-lecture prose the teacher would have to mentally rewrite.

For resource generation details and PDF helper API: read `docs/resource-system.md`.
For ad-hoc (non-themed) presentation design guidance: read `docs/design-guide.md`.

**Scaffold quality:** An enabling scaffold must change the FORM of the task, not just the wording. It must draw a visual model, pre-fill intermediate steps, or provide a structural framework. If you claim "the model is drawn for you," draw the model with PDFKit primitives. Text that describes a visual is not a visual. Read `docs/resource-system.md` section "Scaffold Quality Rules" before writing any SR2.

## Build Script Authoring (Critical)

**NEVER delegate build script writing to agents/subagents.** Always write build scripts directly in the main conversation context. This is a hard rule learned from experience:

- Agents lack the accumulated context of PptxGenJS rendering quirks, builder signatures, layout constants, and the iterative build-inspect-fix discipline that produces correct output.
- Agents invent custom drawing helpers (flowcharts, Venn diagrams, tables) with hardcoded coordinates that haven't been tested. These consistently produce overlaps and misalignment.
- Agents favour manual `addShape`/`addText` with raw x/y/w/h values instead of using the tested theme builders (`contentSlide`, `workedExSlide`, etc.), which is fragile.
- The QA pipeline (markitdown, Google Slides review, and optional local preview images) catches content errors but cannot reliably catch the subtle layout regressions that agents introduce at scale across 1500+ line scripts.
- Previous builds that passed QA and rendered correctly in Google Slides were ALL written directly, never by agents.

**Use the tested theme builders** (`titleSlide`, `liSlide`, `contentSlide`, `cfuSlide`, `workedExSlide`, `exitTicketSlide`, `closingSlide`) for every slide that fits their signature. Only go manual for truly novel layouts, and test those individually.

Agents ARE useful for: research, reading reference files, visual QA inspection of rendered slide images, and content review. Just not for writing the build scripts themselves.

## QA (Required)

First render is almost never correct. After every build:
1. Content QA (`markitdown`) - check for missing content, wrong order, typos.
2. Final visual and compatibility QA in Google Slides - import the `.pptx` and inspect title, content, reveal, subject-specific, closing, and resource slides.
3. Optional local preview (`pptx_to_images.py`) - use when faster for local iteration before Google Slides review.
4. Inspect the slides yourself. Look for: overlaps, overflow, low contrast, uneven spacing, missing elements, text cut off, reveal mistakes, broken links, or elements below 5.1". Subagents can assist with inspection but you must verify key slides directly.
5. Fix issues, re-verify affected slides. One fix often creates another problem.
6. Repeat until a full pass reveals no new issues.
7. Clean up optional preview images: `python scripts/pptx_to_images.py --clean`

## Dependencies

```bash
pip install "markitdown[pptx]" Pillow pymupdf   # Python: content + visual QA
npm install                                     # Node: pptxgenjs, pdfkit, react-icons, sharp
# LibreOffice (soffice) only needed for optional local image preview
```
