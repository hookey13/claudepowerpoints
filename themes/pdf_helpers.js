// PDF Resource Generation Helpers
// Theme-agnostic utilities for creating printable A4 worksheets, answer keys,
// graphic organisers, and other companion resources alongside PPTX slide decks.
//
// Uses pdfkit. All colours passed as 6-char hex (no #). Fonts prefer a
// cross-platform sans family with broad Unicode support (□, Δ, ×, ÷, ≥, ≠
// etc.) and fall back to built-in Helvetica if no complete family is found.

"use strict";

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function normaliseSessionNumber(sessionNumber) {
  const value = Number.parseInt(sessionNumber, 10);
  if (!Number.isInteger(value) || value < 1) {
    throw new Error("Session number must be a positive integer.");
  }
  return value;
}

function cleanResourceLabel(label) {
  const raw = String(label || "")
    .replace(/[_-]+/g, " ")
    .replace(/[<>:\"/\\\\|?*]/g, " ");
  return raw.replace(/\s+/g, " ").trim();
}

function getSessionResourceFolder(sessionNumber) {
  return `resources-session${normaliseSessionNumber(sessionNumber)}`;
}

function formatSessionResourceName(sessionNumber, label) {
  const session = normaliseSessionNumber(sessionNumber);
  const suffix = cleanResourceLabel(label);
  return suffix ? `Session ${session} ${suffix}` : `Session ${session} Resource`;
}

function formatSessionResourceFileName(sessionNumber, label, opts) {
  const o = opts || {};
  const extValue = o.ext || ".pdf";
  const ext = extValue.startsWith(".") ? extValue : `.${extValue}`;
  const folder = o.folder || getSessionResourceFolder(sessionNumber);
  const baseName = cleanResourceLabel(o.baseName || formatSessionResourceName(sessionNumber, label));
  return path.posix.join(folder, `${baseName}${ext}`);
}

function makeSessionResource(sessionNumber, label, description, opts) {
  const o = opts || {};
  return {
    name: cleanResourceLabel(o.name || formatSessionResourceName(sessionNumber, label)),
    fileName: o.fileName || formatSessionResourceFileName(sessionNumber, label, o),
    description: description || "",
  };
}

function resourceNameFromFileName(fileName) {
  if (!fileName) return "Resource";
  const baseName = path.basename(fileName, path.extname(fileName));
  return cleanResourceLabel(baseName) || "Resource";
}

function getPdfFontFamilyCandidates() {
  if (process.platform === "win32") {
    return [
      {
        regular: "C:/Windows/Fonts/arial.ttf",
        bold: "C:/Windows/Fonts/arialbd.ttf",
        italic: "C:/Windows/Fonts/ariali.ttf",
      },
      {
        regular: "C:/Windows/Fonts/calibri.ttf",
        bold: "C:/Windows/Fonts/calibrib.ttf",
        italic: "C:/Windows/Fonts/calibrii.ttf",
      },
    ];
  }

  if (process.platform === "darwin") {
    return [
      {
        regular: "/System/Library/Fonts/Supplemental/Arial.ttf",
        bold: "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        italic: "/System/Library/Fonts/Supplemental/Arial Italic.ttf",
      },
    ];
  }

  return [
    {
      regular: "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
      bold: "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf",
      italic: "/usr/share/fonts/truetype/liberation2/LiberationSans-Italic.ttf",
    },
    {
      regular: "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
      bold: "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
      italic: "/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf",
    },
    {
      regular: "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
      bold: "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
      italic: "/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf",
    },
  ];
}

function resolvePdfFontFamily() {
  return getPdfFontFamilyCandidates().find((family) =>
    [family.regular, family.bold, family.italic].every((filePath) => fs.existsSync(filePath))
  ) || null;
}

// ── Page constants (A4 in points: 595.28 x 841.89) ─────────────────────────

const PAGE = {
  W: 595.28,
  H: 841.89,
  MARGIN: 50,
  CONTENT_W: 595.28 - 2 * 50,  // 495.28
  CONTENT_H: 841.89 - 2 * 50,  // 741.89
};

const FOOTER_Y = PAGE.H - PAGE.MARGIN - 10;
const CONTENT_BOTTOM = FOOTER_Y - 10;

// ── Colour helpers ──────────────────────────────────────────────────────────

/** Convert 6-char hex to "#RRGGBB" for pdfkit. */
function hex(color) {
  if (!color) return "#000000";
  return color.startsWith("#") ? color : "#" + color;
}

/** Parse 6-char hex (no #) to {r, g, b}. */
function hexToRgb(c) {
  const h = c.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

/** Lighten a hex colour by mixing with white. Amount 0-1 (0=original, 1=white). */
function lighten(color, amount) {
  const { r, g, b } = hexToRgb(color);
  const nr = Math.round(r + (255 - r) * amount);
  const ng = Math.round(g + (255 - g) * amount);
  const nb = Math.round(b + (255 - b) * amount);
  return "#" + [nr, ng, nb].map(v => v.toString(16).padStart(2, "0")).join("");
}

function ensureBlockFits(doc, y, requiredHeight, opts) {
  const o = opts || {};
  const top = o.pageTop != null ? o.pageTop : PAGE.MARGIN;
  const bottom = o.pageBottom != null ? o.pageBottom : CONTENT_BOTTOM;
  const fullPageHeight = bottom - top;

  // If the block can fit on a fresh page but not in the remaining space,
  // move it before drawing so prompts and answer space stay together.
  if (requiredHeight <= fullPageHeight && y + requiredHeight > bottom) {
    doc.addPage();
    return top;
  }

  return y;
}

function measureBodyTextHeight(doc, text, opts) {
  const o = opts || {};
  const font = o.italic ? "Sans-Italic" : "Sans";
  return doc.fontSize(o.fontSize || 11).font(font).heightOfString(text, {
    width: o.width || PAGE.CONTENT_W,
  });
}

function measureProblemHeight(doc, prompt, opts) {
  const o = opts || {};
  const promptHeight = doc.fontSize(11).font("Sans").heightOfString(prompt, {
    width: PAGE.CONTENT_W - 28,
  });

  let totalHeight = Math.max(20, promptHeight) + 10;

  if (o.headers) {
    totalHeight += (o.hdrH || 26) + (o.valH || 40) + 10;
  }

  if (o.writeLines) {
    totalHeight += o.writeLines.length * 24;
  }

  return totalHeight + 12;
}

// ── Document creation ───────────────────────────────────────────────────────

/**
 * Create a new A4 PDF document.
 * @param {object} opts — { margin }
 * @returns {PDFDocument}
 */
function createPdf(opts) {
  const o = opts || {};
  const doc = new PDFDocument({
    size: "A4",
    margin: o.margin || PAGE.MARGIN,
    info: {
      Title: o.title || "Worksheet",
      Author: o.author || "Generated Resource",
    },
    bufferPages: true,
  });

  const fontFamily = resolvePdfFontFamily();
  try {
    if (fontFamily) {
      doc.registerFont("Sans", fontFamily.regular);
      doc.registerFont("Sans-Bold", fontFamily.bold);
      doc.registerFont("Sans-Italic", fontFamily.italic);
    }
  } catch (_) {
    // Fall back to built-in Helvetica if system fonts unavailable
  }

  return doc;
}

/**
 * Write a PDF document to a file. Returns a promise.
 * Ensures the parent directory exists.
 * @param {PDFDocument} doc
 * @param {string} filePath
 * @returns {Promise<void>}
 */
function writePdf(doc, filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);
    doc.end();
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

// ── Page elements ───────────────────────────────────────────────────────────

/**
 * Add a worksheet header with coloured title bar, subtitle, and name/date fields.
 * @param {PDFDocument} doc
 * @param {string} title — main title
 * @param {object} opts — { subtitle, color, showNameDate, lessonInfo }
 */
function addPdfHeader(doc, title, opts) {
  const o = opts || {};
  const color = o.color || "1B3A6B";
  const x = PAGE.MARGIN;
  const w = PAGE.CONTENT_W;
  let y = PAGE.MARGIN;

  // Title bar
  doc.save();
  doc.roundedRect(x, y, w, 40, 4).fill(hex(color));
  doc.fontSize(18).font("Sans-Bold").fillColor("#FFFFFF");
  doc.text(title, x + 12, y + 10, { width: w - 24, align: "left" });
  doc.restore();
  y += 48;

  // Subtitle
  if (o.subtitle) {
    doc.fontSize(11).font("Sans").fillColor(hex("6B7280"));
    doc.text(o.subtitle, x, y, { width: w });
    y += 18;
  }

  // Lesson info line
  if (o.lessonInfo) {
    doc.fontSize(9).font("Sans").fillColor(hex("9CA3AF"));
    doc.text(o.lessonInfo, x, y, { width: w });
    y += 16;
  }

  // Name / Date line
  if (o.showNameDate !== false) {
    y += 4;
    doc.fontSize(11).font("Sans").fillColor("#000000");
    doc.text("Name: ", x, y, { continued: true });
    // Underline for name
    const nameLineX = x + 42;
    doc.moveTo(nameLineX, y + 14).lineTo(nameLineX + 200, y + 14)
      .strokeColor("#999999").lineWidth(0.5).stroke();
    // Date field
    const dateX = x + 300;
    doc.text("Date: ", dateX, y);
    doc.moveTo(dateX + 38, y + 14).lineTo(dateX + w - 300, y + 14)
      .strokeColor("#999999").lineWidth(0.5).stroke();
    y += 28;
  }

  return y; // Return current Y position for content below
}

/**
 * Add a section heading with a thin coloured left bar.
 * @param {PDFDocument} doc
 * @param {string} text
 * @param {number} y — vertical position
 * @param {object} opts — { color, fontSize }
 * @returns {number} y after the heading
 */
function addSectionHeading(doc, text, y, opts) {
  const o = opts || {};
  const color = o.color || "1B3A6B";
  const x = PAGE.MARGIN;
  const fontSize = o.fontSize || 13;
  y = ensureBlockFits(doc, y, fontSize + 14);

  // Left accent bar
  doc.save();
  doc.rect(x, y, 4, fontSize + 6).fill(hex(color));
  doc.restore();

  doc.fontSize(fontSize).font("Sans-Bold").fillColor(hex(color));
  doc.text(text, x + 12, y + 2, { width: PAGE.CONTENT_W - 12 });

  return y + fontSize + 14;
}

/**
 * Add instruction text (regular body text).
 * @param {PDFDocument} doc
 * @param {string} text
 * @param {number} y
 * @param {object} opts — { fontSize, color, italic }
 * @returns {number} y after text
 */
function addBodyText(doc, text, y, opts) {
  const o = opts || {};
  const font = o.italic ? "Sans-Italic" : "Sans";
  y = ensureBlockFits(doc, y, measureBodyTextHeight(doc, text, o) + 8);
  doc.fontSize(o.fontSize || 11).font(font).fillColor(hex(o.color || "2D3142"));
  doc.text(text, PAGE.MARGIN, y, { width: PAGE.CONTENT_W });
  return doc.y + 8;
}

/**
 * Add an empty place value chart for students to fill in.
 * @param {PDFDocument} doc
 * @param {number} y — top of chart
 * @param {string[]} headers — column headers (e.g., ["TTh","Th","H","T","O"])
 * @param {object} opts — { color, cellW, hdrH, valH, values, x }
 * @returns {{ y: number, bottomY: number }} positions for layout
 */
function addPvChartPdf(doc, y, headers, opts) {
  const o = opts || {};
  const n = headers.length;
  const cellW = o.cellW || 70;
  const hdrH = o.hdrH || 26;
  const valH = o.valH || 40;
  const color = o.color || "1B3A6B";
  const totalW = cellW * n;

  // Centre the chart horizontally unless x is explicitly provided
  const x = o.x != null
    ? o.x
    : PAGE.MARGIN + (PAGE.CONTENT_W - totalW) / 2;

  // Header row
  doc.save();
  headers.forEach((h, i) => {
    const cx = x + i * cellW;
    doc.rect(cx, y, cellW, hdrH).fill(hex(color));
    doc.fontSize(9).font("Sans-Bold").fillColor("#FFFFFF");
    doc.text(h, cx, y + 7, { width: cellW, align: "center" });
  });
  doc.restore();

  // Value row
  const values = o.values || [];
  doc.save();
  headers.forEach((_, i) => {
    const cx = x + i * cellW;
    doc.rect(cx, y + hdrH, cellW, valH)
      .lineWidth(1).strokeColor(hex(color)).stroke();
    // Fill in values if provided (for answer keys)
    if (values[i] != null && values[i] !== "") {
      doc.fontSize(20).font("Sans-Bold").fillColor(hex("2D3142"));
      doc.text(String(values[i]), cx, y + hdrH + 8, { width: cellW, align: "center" });
    }
  });
  doc.restore();

  const bottomY = y + hdrH + valH;
  return { y, bottomY, x, totalW };
}

/**
 * Add a write-on line (for student answers).
 * @param {PDFDocument} doc
 * @param {string} label — e.g., "Numeral:", "Words:"
 * @param {number} y
 * @param {object} opts — { answer, lineWidth, color }
 * @returns {number} y after the line
 */
function addWriteLine(doc, label, y, opts) {
  const o = opts || {};
  const x = PAGE.MARGIN;
  doc.fontSize(11).font("Sans-Bold").fillColor("#000000");
  doc.text(label, x, y);

  const labelW = doc.widthOfString(label) + 8;
  const lineX = x + labelW;
  const lineY = y + 14;
  const lineW = (o.lineWidth || PAGE.CONTENT_W) - labelW;

  doc.save();
  doc.moveTo(lineX, lineY).lineTo(lineX + lineW, lineY)
    .strokeColor("#CCCCCC").lineWidth(0.5).stroke();
  doc.restore();

  // Write answer if provided (for answer keys)
  if (o.answer) {
    doc.fontSize(11).font("Sans").fillColor(hex(o.color || "0F7F8C"));
    doc.text(o.answer, lineX + 4, y, { width: lineW - 8 });
  }

  return y + 24;
}

/**
 * Add a numbered problem with optional place value chart and write lines.
 * This is the main building block for PV worksheets.
 * @param {PDFDocument} doc
 * @param {number} num — problem number (1, 2, 3...)
 * @param {string} prompt — the question text
 * @param {number} y — starting y position
 * @param {object} opts — {
 *   headers: string[] — PV chart column headers (omit to skip chart),
 *   chartValues: (string|number)[] — pre-filled values for answer key,
 *   writeLines: { label, answer }[] — lines after chart,
 *   color: string — accent colour,
 *   problemBg: boolean — add light background to problem area
 * }
 * @returns {number} y after the problem
 */
function addProblem(doc, num, prompt, y, opts) {
  const o = opts || {};
  const x = PAGE.MARGIN;
  const color = o.color || "1B3A6B";

  y = ensureBlockFits(doc, y, measureProblemHeight(doc, prompt, o));

  // Problem number badge
  doc.save();
  doc.circle(x + 10, y + 8, 10).fill(hex(color));
  doc.fontSize(11).font("Sans-Bold").fillColor("#FFFFFF");
  doc.text(String(num), x + 2, y + 2, { width: 17, align: "center" });
  doc.restore();

  // Prompt text
  doc.fontSize(11).font("Sans").fillColor("#000000");
  doc.text(prompt, x + 28, y, { width: PAGE.CONTENT_W - 28 });
  y = doc.y + 10;

  // Place value chart
  if (o.headers) {
    const chart = addPvChartPdf(doc, y, o.headers, {
      color,
      values: o.chartValues,
    });
    y = chart.bottomY + 10;
  }

  // Write lines
  if (o.writeLines) {
    o.writeLines.forEach((wl) => {
      y = addWriteLine(doc, wl.label, y, { answer: wl.answer, color });
    });
  }

  // Spacing between problems
  y += 12;

  return y;
}

/**
 * Add a "First... Next... Then..." instruction block.
 * @param {PDFDocument} doc
 * @param {string[]} steps — array of step descriptions
 * @param {number} y
 * @param {object} opts — { color }
 * @returns {number} y after the block
 */
function addStepInstructions(doc, steps, y, opts) {
  const o = opts || {};
  const color = o.color || "1B3A6B";
  const x = PAGE.MARGIN;
  const labels = ["First:", "Next:", "Then:", "Finally:"];

  steps.forEach((step, i) => {
    const label = labels[i] || `Step ${i + 1}:`;
    doc.fontSize(11).font("Sans-Bold").fillColor(hex(color));
    doc.text(label + " ", x + 10, y, { continued: true });
    doc.font("Sans").fillColor("#000000");
    doc.text(step);
    y = doc.y + 6;
  });

  return y + 4;
}

/**
 * Add a light-background tip/instruction box.
 * @param {PDFDocument} doc
 * @param {string} text
 * @param {number} y
 * @param {object} opts — { color, icon }
 * @returns {number} y after the box
 */
function addTipBox(doc, text, y, opts) {
  const o = opts || {};
  const color = o.color || "0F7F8C";
  const x = PAGE.MARGIN;
  const w = PAGE.CONTENT_W;

  // Measure text height (use same font as render: Helvetica-Oblique)
  const textH = doc.fontSize(10).font("Sans-Italic").heightOfString(text, {
    width: w - 30,
  });
  const boxH = textH + 16;
  y = ensureBlockFits(doc, y, boxH + 10);

  doc.save();
  doc.roundedRect(x, y, w, boxH, 3).fill(lighten(color, 0.85));
  // Left accent
  doc.rect(x, y, 4, boxH).fill(hex(color));
  doc.restore();

  doc.fontSize(10).font("Sans-Italic").fillColor(hex("2D3142"));
  doc.text(text, x + 14, y + 8, { width: w - 30 });

  return y + boxH + 10;
}

/**
 * Add a footer to the current page.
 * @param {PDFDocument} doc
 * @param {string} text — footer text
 * @param {object} opts — { color }
 */
function addPdfFooter(doc, text, opts) {
  const o = opts || {};
  doc.fontSize(8).font("Sans").fillColor(hex(o.color || "9CA3AF"));
  doc.text(text, PAGE.MARGIN, FOOTER_Y, {
    width: PAGE.CONTENT_W,
    align: "center",
    lineBreak: false,
  });
}

/**
 * Add a blank lined area for extended writing.
 * @param {PDFDocument} doc
 * @param {number} y — starting y
 * @param {number} lineCount — number of lines
 * @param {object} opts — { lineSpacing }
 * @returns {number} y after the lined area
 */
function addLinedArea(doc, y, lineCount, opts) {
  const o = opts || {};
  const preferredSpacing = o.lineSpacing || 28;
  const minSpacing = o.minLineSpacing || Math.min(preferredSpacing, 20);
  const x = PAGE.MARGIN;
  const w = PAGE.CONTENT_W;
  let spacing = preferredSpacing;
  const available = CONTENT_BOTTOM - y;
  const required = lineCount * preferredSpacing;

  if (required > available) {
    const compactSpacing = Math.floor(available / Math.max(lineCount, 1));
    if (o.compact !== false && compactSpacing >= minSpacing) {
      spacing = compactSpacing;
    } else {
      doc.addPage();
      y = PAGE.MARGIN;
    }
  }

  if (y + lineCount * spacing > CONTENT_BOTTOM) {
    const refitSpacing = Math.floor((CONTENT_BOTTOM - y) / Math.max(lineCount, 1));
    if (o.compact !== false && refitSpacing >= minSpacing) {
      spacing = refitSpacing;
    }
  }

  doc.save();
  doc.strokeColor("#DDDDDD").lineWidth(0.5);
  for (let i = 0; i < lineCount; i++) {
    const ly = y + i * spacing;
    doc.moveTo(x, ly).lineTo(x + w, ly).stroke();
  }
  doc.restore();

  return y + lineCount * spacing;
}

/**
 * Add a two-column graphic organiser.
 * @param {PDFDocument} doc
 * @param {string} leftHeader
 * @param {string} rightHeader
 * @param {number} y
 * @param {object} opts — { color, rows, rowH, leftContent, rightContent }
 * @returns {number} y after the organiser
 */
function addTwoColumnOrganiser(doc, leftHeader, rightHeader, y, opts) {
  const o = opts || {};
  const color = o.color || "1B3A6B";
  const x = PAGE.MARGIN;
  const colW = PAGE.CONTENT_W / 2;
  const hdrH = 26;
  const rows = o.rows || 4;
  const rowH = o.rowH || 50;

  // Headers
  doc.save();
  [leftHeader, rightHeader].forEach((h, i) => {
    const cx = x + i * colW;
    doc.rect(cx, y, colW, hdrH).fill(hex(color));
    doc.fontSize(10).font("Sans-Bold").fillColor("#FFFFFF");
    doc.text(h, cx, y + 7, { width: colW, align: "center" });
  });
  doc.restore();

  // Rows
  const leftContent = o.leftContent || [];
  const rightContent = o.rightContent || [];
  doc.save();
  for (let r = 0; r < rows; r++) {
    const ry = y + hdrH + r * rowH;
    [0, 1].forEach((i) => {
      const cx = x + i * colW;
      doc.rect(cx, ry, colW, rowH).lineWidth(0.5).strokeColor(hex(color)).stroke();
      const content = i === 0 ? leftContent : rightContent;
      if (content[r]) {
        doc.fontSize(10).font("Sans").fillColor("#000000");
        doc.text(content[r], cx + 6, ry + 6, { width: colW - 12 });
      }
    });
  }
  doc.restore();

  return y + hdrH + rows * rowH + 10;
}

// ── Resource slide helper (for PPTX) ────────────────────────────────────────

/**
 * Add a "Teacher Resources" slide to a PPTX presentation.
 * Lists companion PDF files with clickable hyperlinks.
 *
 * @param {object} pres — PptxGenJS presentation object
 * @param {object[]} resources — [{ name, fileName, description }]
 * @param {object} theme — { C, FONT_H, FONT_B, addTopBar, addTitle, addFooter, addCard }
 * @param {string} footer — footer text
 * @param {string} notes — teacher notes
 * @returns {object} the slide
 */
function addResourceSlide(pres, resources, theme, footer, notes) {
  const { C: TC, FONT_H: FH, FONT_B: FB } = theme;
  const s = pres.addSlide();

  // Background + top bar
  s.background = { color: TC.CREAM || "F4F7FF" };
  s.addShape("rect", {
    x: 0, y: 0, w: 10, h: 0.06,
    fill: { color: TC.NAVY || "1B3A6B" },
  });

  // Badge
  const badgeColor = TC.TEAL || "0F7F8C";
  s.addShape("roundRect", {
    x: 0.5, y: 0.2, w: 2.8, h: 0.36, rectRadius: 0.08,
    fill: { color: badgeColor },
  });
  s.addText("Printable Resources", {
    x: 0.5, y: 0.2, w: 2.8, h: 0.36,
    fontSize: 11, fontFace: FB, color: TC.WHITE || "FFFFFF",
    align: "center", valign: "middle", bold: true, margin: 0,
  });

  // Title
  s.addText("Teacher Resources", {
    x: 0.5, y: 0.65, w: 9, h: 0.55,
    fontSize: 24, fontFace: FH, color: TC.NAVY || "1B3A6B",
    bold: true, margin: 0,
  });

  // Instruction text
  s.addText("Click any resource below to open the PDF. Print before the lesson.", {
    x: 0.5, y: 1.2, w: 9, h: 0.3,
    fontSize: 12, fontFace: FB, color: TC.MUTED || "6B7280",
    italic: true, margin: 0,
  });

  // Resource cards
  const cardH = 0.7;
  const gap = 0.15;
  const startY = 1.7;

  resources.forEach((res, i) => {
    const displayName = cleanResourceLabel(res.name) || resourceNameFromFileName(res.fileName);
    const cy = startY + i * (cardH + gap);

    // Card background
    s.addShape("roundRect", {
      x: 0.5, y: cy, w: 9, h: cardH, rectRadius: 0.08,
      fill: { color: TC.WHITE || "FFFFFF" },
      shadow: { type: "outer", blur: 4, offset: 1, color: "000000", opacity: 0.10, angle: 135 },
    });

    // Left accent strip
    s.addShape("rect", {
      x: 0.5, y: cy, w: 0.06, h: cardH,
      fill: { color: badgeColor },
    });

    // PDF icon circle
    const ICON_D = 0.46;
    s.addShape("roundRect", {
      x: 0.75, y: cy + 0.12, w: ICON_D, h: ICON_D, rectRadius: ICON_D / 2,
      fill: { color: TC.CORAL || "C94030" },
    });
    s.addText("PDF", {
      x: 0.75, y: cy + 0.12, w: ICON_D, h: ICON_D,
      fontSize: 9, fontFace: FB, color: TC.WHITE || "FFFFFF",
      align: "center", valign: "middle", bold: true, margin: 0,
    });

    // Resource name (clickable)
    s.addText(displayName, {
      x: 1.4, y: cy + 0.08, w: 7.5, h: 0.3,
      fontSize: 14, fontFace: FH, color: TC.NAVY || "1B3A6B",
      bold: true, margin: 0,
      hyperlink: { url: res.fileName, tooltip: "Open " + displayName },
    });

    // Description
    if (res.description) {
      s.addText(res.description, {
        x: 1.4, y: cy + 0.38, w: 7.5, h: 0.25,
        fontSize: 10, fontFace: FB, color: TC.MUTED || "6B7280",
        margin: 0,
      });
    }
  });

  if (footer) {
    s.addText(footer, {
      x: 0.5, y: 5.3, w: 9, h: 0.2,
      fontSize: 9, fontFace: FB, color: TC.MUTED || "6B7280", margin: 0,
    });
  }
  if (notes) s.addNotes(notes);

  return s;
}

module.exports = {
  // Constants
  PAGE,
  // Utilities
  hex, lighten,
  cleanResourceLabel,
  getSessionResourceFolder,
  formatSessionResourceName,
  formatSessionResourceFileName,
  makeSessionResource,
  // Document lifecycle
  createPdf, writePdf,
  // Page elements
  addPdfHeader, addSectionHeading, addBodyText,
  addPvChartPdf, addWriteLine, addProblem,
  addStepInstructions, addTipBox, addPdfFooter,
  addLinedArea, addTwoColumnOrganiser,
  // PPTX integration
  addResourceSlide,
};
