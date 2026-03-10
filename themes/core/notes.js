"use strict";

const NOTE_SECTION_HEADERS = [
  "SAY",
  "DO",
  "PACING OVERVIEW",
  "CFU CHECKPOINT",
  "TEACHER NOTES",
  "ENABLING & EXTENDING",
  "MISCONCEPTIONS",
  "SENSITIVITY ADVISORY",
  "WATCH FOR",
];

const ASCII_REPLACEMENTS = [
  [/[\u2018\u2019\u201A\u201B\u2032]/g, "'"],
  [/[\u201C\u201D\u201E\u201F\u2033]/g, '"'],
  [/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, "-"],
  [/\u2026/g, "..."],
  [/[\u2022\u2023\u25E6\u2043\u2219\u25CF\u25AA]/g, "-"],
  [/\u2192/g, "->"],
  [/\u2190/g, "<-"],
  [/\u21D2/g, "=>"],
  [/\u21D0/g, "<="],
  [/\u2265/g, ">="],
  [/\u2264/g, "<="],
  [/\u2260/g, "!="],
  [/\u00D7/g, "x"],
  [/\u00F7/g, "/"],
  [/\u00A0/g, " "],
  [/[\u200B-\u200D\uFEFF]/g, ""],
];

const HEADER_PATTERN = new RegExp(
  `^(${NOTE_SECTION_HEADERS.map(escapeRegex).join("|")})\\s*:?$`,
  "i"
);

let notesPatchInstalled = false;

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripMarkdown(value) {
  return value
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```/g, ""))
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*\n]+)\*/g, "$1")
    .replace(/_([^_\n]+)_/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "");
}

function toAscii(value) {
  let next = value;
  for (const [pattern, replacement] of ASCII_REPLACEMENTS) {
    next = next.replace(pattern, replacement);
  }

  return next
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

function normalizeHeader(line) {
  const stripped = stripMarkdown(line).trim();
  const match = stripped.match(HEADER_PATTERN);
  return match ? `${match[1].toUpperCase()}:` : null;
}

function normalizeBullet(line) {
  const bulletMatch = line.match(/^\s*(?:[-*]|\d+[.)])\s+(.*)$/);
  if (!bulletMatch) return line.trimEnd();
  return `- ${bulletMatch[1].trimEnd()}`;
}

function sanitizeTeacherNotes(notes) {
  if (notes == null || notes === "") return notes;

  const rawLines = toAscii(stripMarkdown(String(notes)).replace(/\r\n?/g, "\n"))
    .split("\n")
    .map((line) => line.replace(/\t/g, "  ").trimEnd());

  const normalized = [];
  for (const rawLine of rawLines) {
    const line = rawLine.trim();
    const header = normalizeHeader(rawLine);

    if (header) {
      if (normalized.length && normalized[normalized.length - 1] !== "") {
        normalized.push("");
      }
      normalized.push(header);
      continue;
    }

    if (!line) {
      if (normalized.length && normalized[normalized.length - 1] !== "") {
        normalized.push("");
      }
      continue;
    }

    normalized.push(normalizeBullet(rawLine));
  }

  while (normalized.length && normalized[normalized.length - 1] === "") {
    normalized.pop();
  }

  return normalized.join("\n");
}

function cleanTargetText(value) {
  return toAscii(stripMarkdown(String(value || ""))).replace(/\s+/g, " ").trim();
}

function ensureSentence(value) {
  if (!value) return value;
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

function ensureICan(value) {
  if (!value) return value;
  return /^i can\b/i.test(value) ? value : `I can ${value.charAt(0).toLowerCase()}${value.slice(1)}`;
}

function toArray(values) {
  if (values == null) return [];
  return Array.isArray(values) ? values : [values];
}

function normalizeLessonTargets(liItems, scItems) {
  const li = toArray(liItems).map(cleanTargetText).filter(Boolean);
  const sc = toArray(scItems).map(cleanTargetText).filter(Boolean);
  const warnings = [];

  if (li.length !== 1) {
    warnings.push(`expected exactly 1 Learning Intention, received ${li.length}`);
  }
  if (sc.length !== 3) {
    warnings.push(`expected exactly 3 Success Criteria, received ${sc.length}`);
  }

  return {
    liItems: li.slice(0, 1).map(ensureSentence),
    scItems: sc.slice(0, 3).map(ensureICan),
    warnings,
  };
}

function installNotesPatch(PptxGenJS) {
  if (notesPatchInstalled || typeof PptxGenJS !== "function") return;

  const probe = new PptxGenJS();
  const slide = probe.addSlide();
  const proto = Object.getPrototypeOf(slide);
  const originalAddNotes = proto && proto.addNotes;

  if (typeof originalAddNotes !== "function" || originalAddNotes.__teacherNotesPatched) {
    notesPatchInstalled = true;
    return;
  }

  function patchedAddNotes(notes) {
    return originalAddNotes.call(this, sanitizeTeacherNotes(notes));
  }

  patchedAddNotes.__teacherNotesPatched = true;
  proto.addNotes = patchedAddNotes;
  notesPatchInstalled = true;
}

module.exports = {
  NOTE_SECTION_HEADERS,
  sanitizeTeacherNotes,
  normalizeLessonTargets,
  installNotesPatch,
};
