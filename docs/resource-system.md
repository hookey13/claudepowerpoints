# Resource System Reference

Lessons can include printable student resources such as worksheets, graphic organisers, scaffold cards, and answer keys. These are generated as companion PDF files in a `resources-session{N}/` subfolder alongside the PPTX, where `N` is the session number for that week.

## How It Works

1. Build scripts generate PDFs using `themes/pdf_helpers.js` (pdfkit-based).
2. PDFs go in `resources-session{N}/` inside the lesson folder, for example `output/ALG_Session3/resources-session3/`.
3. A "Resources" slide at the end of the PPTX lists all companion files with clickable hyperlinks.
4. The teacher clicks a resource card, opens the PDF, and prints it.

Example folder structure:

```text
output/ALG_Session3_Distributive_Property/
  ALG_Session3_Distributive_Property.pptx
  resources-session3/
    Session 3 Worksheet.pdf
    Session 3 Answer Key.pdf
    Session 3 Enabling Scaffold.pdf
```

## pdf_helpers.js Exports

`themes/pdf_helpers.js` is theme-agnostic. Pass colours as 6-char hex strings. It uses Windows Arial fonts (registered as `Sans`, `Sans-Bold`, and `Sans-Italic`) for broad Unicode coverage and falls back to built-in Helvetica if the system fonts are unavailable.

Document lifecycle:

| Function | Purpose |
|----------|---------|
| `createPdf(opts)` | Create a new A4 PDF document with `{ title, author, margin }`. |
| `writePdf(doc, filePath)` | Write a PDF to file and create the parent directory if needed. |

Naming helpers:

| Function | Purpose |
|----------|---------|
| `cleanResourceLabel(label)` | Removes underscores, codey separators, and invalid filename characters. |
| `getSessionResourceFolder(sessionNumber)` | Returns `resources-session{N}`. |
| `formatSessionResourceName(sessionNumber, label)` | Returns a display name like `Session 2 Worksheet`. |
| `formatSessionResourceFileName(sessionNumber, label, opts)` | Returns a relative path like `resources-session2/Session 2 Worksheet.pdf`. |
| `makeSessionResource(sessionNumber, label, description, opts)` | Returns `{ name, fileName, description }` with matching session-first naming. |

Page elements:

| Function | Purpose |
|----------|---------|
| `addPdfHeader(doc, title, opts)` | Coloured title bar plus subtitle and Name/Date fields. Returns `y`. |
| `addSectionHeading(doc, text, y, opts)` | Section heading with a left accent bar. Returns `y`. |
| `addBodyText(doc, text, y, opts)` | Body paragraph. Returns `y`. |
| `addPvChartPdf(doc, y, headers, opts)` | Place value chart, empty or pre-filled. Returns `{ y, bottomY }`. |
| `addWriteLine(doc, label, y, opts)` | Labelled write-on line. Returns `y`. |
| `addProblem(doc, num, prompt, y, opts)` | Numbered problem with optional chart and answer lines. Auto-paginates. Returns `y`. |
| `addStepInstructions(doc, steps, y, opts)` | "First, Next, Then" instruction block. Returns `y`. |
| `addTipBox(doc, text, y, opts)` | Light-background reminder box. Returns `y`. |
| `addPdfFooter(doc, text, opts)` | Footer on each page. |
| `addLinedArea(doc, y, lineCount, opts)` | Blank lined writing area. Returns `y`. |
| `addTwoColumnOrganiser(doc, leftHeader, rightHeader, y, opts)` | Two-column organiser. Returns `y`. |

PPTX integration:

| Function | Purpose |
|----------|---------|
| `addResourceSlide(pres, resources, theme, footer, notes)` | Add a "Teacher Resources" slide to the PPTX with clickable PDF links. |

## Resource Slide

Every lesson with companion PDFs should include a resource slide after the last content slide.

```javascript
const { addResourceSlide, makeSessionResource } = require("../themes/pdf_helpers");

addResourceSlide(
  pres,
  [
    makeSessionResource(1, "Worksheet", "Independent practice - 8 problems."),
    makeSessionResource(1, "Answer Key", "Teacher reference for the worksheet."),
    makeSessionResource(1, "Enabling Scaffold", "Pre-filled support for students who need it."),
  ],
  { C, FONT_H, FONT_B },
  FOOTER,
  NOTES_RESOURCES
);
```

Use the same human-friendly name on the resource slide and in the PDF filename stem. The helper already keeps those aligned.

## Generating a PDF Resource

```javascript
const path = require("path");
const {
  createPdf,
  writePdf,
  addPdfHeader,
  addSectionHeading,
  addProblem,
  addTipBox,
  addPdfFooter,
  formatSessionResourceName,
  formatSessionResourceFileName,
} = require("../themes/pdf_helpers");

async function generateWorksheet(outDir, sessionNumber, C) {
  const title = formatSessionResourceName(sessionNumber, "Worksheet");
  const relativeFile = formatSessionResourceFileName(sessionNumber, "Worksheet");
  const doc = createPdf({ title });

  let y = addPdfHeader(doc, title, {
    subtitle: `Session ${sessionNumber} resource`,
    color: C.NAVY,
    lessonInfo: `Session ${sessionNumber} | Unit Name | Grade X`,
  });

  y = addTipBox(doc, "Remember: key instruction here.", y, { color: C.TEAL });
  y = addSectionHeading(doc, "Practice", y, { color: C.NAVY });

  y = addProblem(doc, 1, "Problem prompt text", y, {
    headers: ["TTh", "Th", "H", "T", "O"],
    writeLines: [{ label: "Answer:" }],
    color: C.NAVY,
  });

  addPdfFooter(doc, `Session ${sessionNumber} | Unit Name`);
  await writePdf(doc, path.join(outDir, relativeFile));
}
```

## Resource Naming Rules

These rules are non-negotiable for future builds:

- Start every teacher-facing PDF name with `Session N`.
- Match the resource slide card title to the PDF filename stem.
- Use spaces, not underscores, in teacher-facing PDF filenames.
- Do not use day names. Teachers teach sessions on different days.
- Do not use code-heavy names such as `WH4_L16`, `SR1`, `GO1`, `EXT1`, or `ET_Lesson5`.

Good examples:

| Resource Type | Example |
|---------------|---------|
| Worksheet | `Session 1 Worksheet.pdf` |
| Answer key | `Session 1 Answer Key.pdf` |
| Graphic organiser | `Session 2 Graphic Organiser.pdf` |
| Enabling scaffold | `Session 2 Enabling Scaffold.pdf` |
| Extension task | `Session 3 Extension.pdf` |
| Vocabulary cards | `Session 3 Vocabulary Cards.pdf` |

## What Resources to Generate

Generate resources based on what the lesson references.

| Resource Type | When to Generate |
|---------------|-----------------|
| Practice worksheet | Every You Do stage that references a worksheet or printed task |
| Answer key or scaffold | When enabling students need a worked reference |
| Graphic organiser | When teacher notes mention a template, frame, organiser, or recording sheet |
| Exit ticket (printable) | When the exit ticket should be completed on paper |
| Vocabulary cards | When key terms need to be cut out, displayed, or sorted |
| Extending investigation | When EXTENDING introduces a concept not taught in the lesson |
| Teacher resource checklist | Optional one-page prep list |

## Scaffold Quality Rules

An enabling scaffold is not just "the same worksheet but easier". A genuine scaffold changes the form of the task. It must do at least one of the following:

1. Draw a visual model the student can read.
2. Pre-fill intermediate steps so the student completes only the final gap.
3. Provide a structural framework such as a table, flowchart, or labelled organiser.
4. Reduce the problem space by constraining choices.

Self-check:

- Put the main worksheet and the scaffold side by side.
- Ask: "What cognitive work does the scaffold remove?"
- If the answer is "not much", rewrite it.

## Hyperlinks

PptxGenJS hyperlinks use relative paths. Resource slide links should include the session subfolder prefix:

```javascript
hyperlink: {
  url: "resources-session3/Session 3 Worksheet.pdf",
  tooltip: "Open Session 3 Worksheet",
}
```

This keeps the PPTX and its companion PDFs portable inside the same lesson folder.
