# Resource System Reference

Lessons reference printable student resources (worksheets, graphic organisers, scaffold cards, answer keys) that teachers must print before the lesson. These are generated as **companion PDF files** alongside the PPTX, bundled in a per-lesson output folder.

## How It Works

1. **Build script generates PDFs** using `themes/pdf_helpers.js` (pdfkit-based)
2. **PDFs go in the same folder** as the PPTX (e.g., `output/Lesson_PV1/`)
3. **A "Resources" slide** at the end of the PPTX lists all companion files with clickable hyperlinks
4. **Teacher clicks a link** → PDF opens in default viewer → teacher prints it

## pdf_helpers.js Exports

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

## Resource Slide

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

## Generating a PDF Resource

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

## What Resources to Generate

Generate resources based on what the lesson references. Common types:

| Resource Type | When to Generate |
|---------------|-----------------|
| **Practice worksheet** | Every You Do stage that references "SR" or a worksheet |
| **Answer key / scaffold** | When enabling students need a worked reference |
| **Graphic organiser** | When teacher notes mention a template, frame, or organiser |
| **Exit ticket** (printable) | When the exit ticket should be done on paper, not in workbooks |
| **Vocabulary cards** | When key terms need to be cut out or displayed |
| **Extending investigation** | When EXTENDING introduces a concept not taught in the lesson — the PDF must teach the concept, give examples, and set the task (the teacher is unavailable to explain it) |
| **Teacher resource checklist** | Optional — one-page list of everything to prepare |

## Naming Convention

| Pattern | Example |
|---------|---------|
| Worksheet | `SR3_Place_Value_Worksheet.pdf` |
| Answer key | `SR4_Example_Answer.pdf` |
| Graphic organiser | `GO1_Character_Profile.pdf` |
| Exit ticket | `ET_Lesson5_Exit_Ticket.pdf` |
| Extending investigation | `EXT1_Perfect_Numbers_Investigation.pdf` |
| Teacher checklist | `Teacher_Resource_Checklist.pdf` |

## Hyperlinks

PptxGenJS hyperlinks use relative paths. When the PPTX and PDFs are in the same folder, use just the filename:

```javascript
hyperlink: { url: "SR3_Worksheet.pdf", tooltip: "Open worksheet" }
```

This works when the teacher opens the PPTX from the lesson folder. The link opens the PDF in the default viewer.
