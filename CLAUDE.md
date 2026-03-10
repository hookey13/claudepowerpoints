# PPTX Lesson Generator

Node.js project using PptxGenJS to generate explicit teaching slide decks with companion PDF resources. Theme system provides 150 pre-built palettes across 5 subjects x 5 year levels x 6 weekly variants.

## Commands

```bash
node builds/build_<unit>_lesson<n>.js          # Build a lesson (run from project root)
node test_theme.js <subject> <level> [variant] # Test a theme combo
python -m markitdown output/<file>.pptx        # Content QA - check text, order, typos
python scripts/check_lesson_quality.py output/<file>.pptx --profile literacy-60  # Lesson density/language QA
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

## Teacher Notes Rules

- Speaker notes are plain text in PptxGenJS/PowerPoint. NEVER use markdown in teacher notes. Do not use `**bold**`, `_italics_`, backticks, markdown headings, or markdown lists.
- Teacher notes must be ASCII-safe for PowerPoint, PowerPoint for iPad, and exported notes views. Use straight quotes `' "`, hyphen bullets `-`, `...`, `->`, `>=`, `<=`, and `x`. Avoid smart quotes, em dashes, unicode bullets, unicode arrows, and other decorative symbols in notes.
- Keep teacher notes scannable. Prefer short bullets, not dense paragraphs. `SAY` should usually be 2-4 short bullets, `DO` 2-4 short bullets, `TEACHER NOTES` no more than 2 short sentences, and `WATCH FOR` 1-2 bullets.
- `SAY:` is teacher cue language, not script prose. Each bullet should sound like something a teacher could say immediately in class with little or no rewriting.
- Use a classroom-natural voice in `SAY:`: direct prompts, short follow-ups, question-led phrasing, and concise think-aloud cues. Light connective phrasing is allowed when it helps flow, but keep it brief and purposeful.
- Avoid slang, lesson-announcer phrasing, polished exposition, abstract briefing language, and over-explained transitions in `SAY:`. If a bullet sounds more like presenter copy than classroom talk, rewrite it.
- Section headers in notes should be plain uppercase text like `SAY:` and `DO:`. Do not try to force bold with markdown.
- If a slide uses `liSlide()`, the Learning Intention must be a single plain sentence and the Success Criteria must be exactly 3 simple `I can...` bullets. The first success criterion must be ultra-achievable for almost every student.
- Do not add a `PACING OVERVIEW` block to speaker notes by default. If timing guidance is genuinely needed, keep it to one short sentence in `TEACHER NOTES`.
- End notes with at most one short framework/meta tag line. Do not stack multiple checklist tags.

## Cognitive Load Defaults

- `Lean` means fewer, better-taught moves, not less learning. Apply this across all sessions, not just literacy.
- Protect the high-yield parts of instruction: clear modelling, repeated practice, retrieval, CFU, guided practice, and independent application.
- If a lesson feels overcrowded, cut low-yield extras first: duplicate explanations, oversized vocab banks, unnecessary reveal pairs, long note essays, decorative transitions, and multiple competing objectives.
- Default future generations to `mixed readiness`, not assumed mastery. Avoid student-facing or `SAY:` phrasing such as `you already know`, `students know the routine`, `not new to you`, `we've done this`, or `by Week X students know` unless the user explicitly asked for a revision/review lesson.
- Beginner-safe prior-knowledge language is allowed: `Some of you may remember...`, `If this feels new, that's okay`, `We'll build this together`.
- Less on the slide does not mean less teaching. It means the teacher voice and the practice sequence carry the load instead of cluttered slide text.

## Lean Literacy Defaults

- Default future generations to `mixed readiness`, not assumed mastery. Avoid student-facing or `SAY:` phrasing such as `you already know`, `students know the routine`, `not new to you`, `we've done this`, or `by Week X students know` unless the user explicitly asked for a revision/review lesson.
- Beginner-safe prior-knowledge language is allowed: `Some of you may remember...`, `If this feels new, that's okay`, `We'll build this together`.
- Default a 60-minute literacy lesson to one reading/comprehension or craft focus plus one writing/language focus only.
- Default literacy lesson shape: title, LI/SC, 0-2 explicit vocab slides, reading launch, up to 2 pause points, 1 craft/analysis slide, 1 CFU, 1 I Do, 1 We Do, 1 You Do, closing, resources.
- Default budget for a 60-minute literacy deck is 10-14 unique slides. Above 14 means the lesson is probably too crowded. Above 16 requires an explicit reason from the user.
- Default reveal budget is 0-2 reveal pairs. Use reveals only when hiding the answer materially improves thinking. Do not use reveal pairs by default for every vocabulary, CFU, or We Do slide.
- Incidental vocabulary list slides are off by default. Only include them when the source text genuinely demands them or the user explicitly asks for them.
- Slide-face text should stay lean. Do not preload large definition banks, long explanation blocks, or multiple abstract objectives onto one lesson by default.

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
- Output goes to `output/<LessonFolder>/` - PPTX at the root, companion PDFs in a `resources-session{N}/` subfolder where `N` is the session number within that week's sequence.
- PptxGenJS hyperlinks use relative paths - include the subfolder prefix (e.g., `resources-session3/Session 3 Worksheet.pdf`).
- Resource names must be teacher-friendly and session-first: `Session 1 Worksheet`, `Session 1 Answer Key`, `Session 2 Enabling Scaffold`.
- Use the same human-readable name on the resource slide and in the PDF filename stem. Avoid codes like `WH4_L16`, `SR1`, `GO1`, `ET_Lesson5`, or similar.
- Do not use day names in resource filenames. Teachers run sessions on different days.
- Do not use underscores in teacher-facing PDF filenames. Use spaces.

For resource generation details and PDF helper API: read `docs/resource-system.md`.
For ad-hoc (non-themed) presentation design guidance: read `docs/design-guide.md`.

**Scaffold quality:** An enabling scaffold must change the FORM of the task, not just the wording. It must draw a visual model, pre-fill intermediate steps, or provide a structural framework. If you claim "the model is drawn for you," draw the model with PDFKit primitives. Text that describes a visual is not a visual. Read `docs/resource-system.md` section "Scaffold Quality Rules" before writing an enabling scaffold PDF.

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
