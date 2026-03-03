"use strict";

// ============================================================================
// Inquiry Theme Palettes
// Exploratory, curious, adventurous. Earthy tones with discovery accents.
// 5 year levels x 6 variants = 30 palettes.
//
// Every colour has been validated:
//   - WHITE on PRIMARY/SECONDARY/ACCENT/ALERT: contrast >= 4.5:1
//   - CHARCOAL on BG_LIGHT: contrast >= 4.5:1
//   - TEXT_ON_DARK on BG_DARK: contrast >= 4.5:1
//   - PRIMARY/SECONDARY/ALERT luminance < 0.18
// ============================================================================

const palettes = {

  // --------------------------------------------------------------------------
  // FOUNDATION  (Arial Black / Calibri — bold, exciting, high-saturation)
  // --------------------------------------------------------------------------
  foundation: [
    // 0 — Explorer: bold olive expedition
    {
      PRIMARY:   "2D4A1A",  SECONDARY: "8B3A00",  ACCENT:  "7A5B0A",
      ALERT:     "1A2040",  SUCCESS:   "1B6B35",  ASSESS:  "4B2068",
      BG_DARK:   "1A2A1A",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F5F0E0",  SUBTITLE: "D4C9A5",
      DECOR_1:   "8B3A00",  DECOR_2:   "7A5B0A",
      FONT_H:    "Arial Black",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 1 — Detective: dark teal-grey mystery
    {
      PRIMARY:   "2A3A44",  SECONDARY: "7A1A2A",  ACCENT:  "6D5A16",
      ALERT:     "1B3A5A",  SUCCESS:   "1B6B35",  ASSESS:  "4B2068",
      BG_DARK:   "1A1A28",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBE0",  SUBTITLE: "C0B8A8",
      DECOR_1:   "7A1A2A",  DECOR_2:   "6D5A16",
      FONT_H:    "Arial Black",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 2 — Archaeologist: chocolate & ancient gold
    {
      PRIMARY:   "331A14",  SECONDARY: "1A5A1A",  ACCENT:  "8B5A0A",
      ALERT:     "7A2A1A",  SUCCESS:   "1B6B35",  ASSESS:  "4B2068",
      BG_DARK:   "1A1410",  BG_LIGHT:  "FFFAF5",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F5EDE0",  SUBTITLE: "D4C0A0",
      DECOR_1:   "1A5A1A",  DECOR_2:   "8B5A0A",
      FONT_H:    "Arial Black",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 3 — Navigator: midnight navy charting
    {
      PRIMARY:   "0F1F3A",  SECONDARY: "0A5A5A",  ACCENT:  "7A5A0A",
      ALERT:     "6A0A0A",  SUCCESS:   "1B6B35",  ASSESS:  "4B2068",
      BG_DARK:   "0A1428",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBE0",  SUBTITLE: "B8C8D8",
      DECOR_1:   "0A5A5A",  DECOR_2:   "7A5A0A",
      FONT_H:    "Arial Black",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 4 — Naturalist: deep forest observation
    {
      PRIMARY:   "1A4A1A",  SECONDARY: "2A3A5A",  ACCENT:  "7A600A",
      ALERT:     "5A1020",  SUCCESS:   "1B6B35",  ASSESS:  "4B2068",
      BG_DARK:   "1A2A1A",  BG_LIGHT:  "FFFAF5",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F5F0E0",  SUBTITLE: "B8D0B0",
      DECOR_1:   "2A3A5A",  DECOR_2:   "7A600A",
      FONT_H:    "Arial Black",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 5 — Inventor: dark slate creative
    {
      PRIMARY:   "1A2A3A",  SECONDARY: "7A3A0A",  ACCENT:  "0A5A4A",
      ALERT:     "4A1A40",  SUCCESS:   "1B6B35",  ASSESS:  "4B2068",
      BG_DARK:   "141E28",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBE0",  SUBTITLE: "B0C0D0",
      DECOR_1:   "7A3A0A",  DECOR_2:   "0A5A4A",
      FONT_H:    "Arial Black",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],

  // --------------------------------------------------------------------------
  // GRADE 1  (Arial Black / Calibri — bold)
  // --------------------------------------------------------------------------
  grade1: [
    // 0 — Explorer: olive & terracotta expedition
    {
      PRIMARY:   "334D24",  SECONDARY: "8B4020",  ACCENT:  "7D5F10",
      ALERT:     "1A2848",  SUCCESS:   "1A6030",  ASSESS:  "4A2565",
      BG_DARK:   "1A2818",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F5F0E0",  SUBTITLE: "C8C0A0",
      DECOR_1:   "8B4020",  DECOR_2:   "7D5F10",
      FONT_H:    "Arial Black",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 1 — Detective: teal-grey investigation
    {
      PRIMARY:   "2F3F4A",  SECONDARY: "7F2030",  ACCENT:  "705818",
      ALERT:     "1E3E5E",  SUCCESS:   "1A6030",  ASSESS:  "4A2565",
      BG_DARK:   "1A1E28",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBE0",  SUBTITLE: "B8B0A0",
      DECOR_1:   "7F2030",  DECOR_2:   "705818",
      FONT_H:    "Arial Black",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 2 — Archaeologist: warm brown discovery
    {
      PRIMARY:   "3A2018",  SECONDARY: "255A25",  ACCENT:  "8A5810",
      ALERT:     "7F3020",  SUCCESS:   "1A6030",  ASSESS:  "4A2565",
      BG_DARK:   "1E1610",  BG_LIGHT:  "FFFAF5",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F5EDE0",  SUBTITLE: "D0C0A0",
      DECOR_1:   "255A25",  DECOR_2:   "8A5810",
      FONT_H:    "Arial Black",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 3 — Navigator: deep navy charting
    {
      PRIMARY:   "152840",  SECONDARY: "156060",  ACCENT:  "7F5F10",
      ALERT:     "6F1515",  SUCCESS:   "1A6030",  ASSESS:  "4A2565",
      BG_DARK:   "0E1828",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBE0",  SUBTITLE: "A8C0D8",
      DECOR_1:   "156060",  DECOR_2:   "7F5F10",
      FONT_H:    "Arial Black",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 4 — Naturalist: forest & slate observation
    {
      PRIMARY:   "245424",  SECONDARY: "2F4560",  ACCENT:  "7F6515",
      ALERT:     "5F1525",  SUCCESS:   "1A6030",  ASSESS:  "4A2565",
      BG_DARK:   "182818",  BG_LIGHT:  "FFFAF5",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F5F0E0",  SUBTITLE: "B0C8A8",
      DECOR_1:   "2F4560",  DECOR_2:   "7F6515",
      FONT_H:    "Arial Black",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 5 — Inventor: slate blue problem-solving
    {
      PRIMARY:   "243848",  SECONDARY: "7F4018",  ACCENT:  "156058",
      ALERT:     "502548",  SUCCESS:   "1A6030",  ASSESS:  "4A2565",
      BG_DARK:   "141E28",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBE0",  SUBTITLE: "A8B8C8",
      DECOR_1:   "7F4018",  DECOR_2:   "156058",
      FONT_H:    "Arial Black",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],

  // --------------------------------------------------------------------------
  // GRADE 2  (Trebuchet MS / Calibri — transitional)
  // --------------------------------------------------------------------------
  grade2: [
    // 0 — Explorer: earthy olive expedition
    {
      PRIMARY:   "374A28",  SECONDARY: "8B4218",  ACCENT:  "806010",
      ALERT:     "1A2846",  SUCCESS:   "1E6538",  ASSESS:  "4C2868",
      BG_DARK:   "1E2418",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F5EDE0",  SUBTITLE: "C8C0A5",
      DECOR_1:   "8B4218",  DECOR_2:   "806010",
      FONT_H:    "Trebuchet MS",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 1 — Detective: charcoal-teal investigation
    {
      PRIMARY:   "334248",  SECONDARY: "822430",  ACCENT:  "6D5518",
      ALERT:     "283E68",  SUCCESS:   "1E6538",  ASSESS:  "4C2868",
      BG_DARK:   "1A1E24",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBE0",  SUBTITLE: "B5B0A5",
      DECOR_1:   "822430",  DECOR_2:   "6D5518",
      FONT_H:    "Trebuchet MS",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 2 — Archaeologist: deep brown & sage
    {
      PRIMARY:   "3B2520",  SECONDARY: "2A5C2A",  ACCENT:  "8E5A10",
      ALERT:     "833528",  SUCCESS:   "1E6538",  ASSESS:  "4C2868",
      BG_DARK:   "1E1810",  BG_LIGHT:  "FFFAF5",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F5EDE0",  SUBTITLE: "D0BEA0",
      DECOR_1:   "2A5C2A",  DECOR_2:   "8E5A10",
      FONT_H:    "Trebuchet MS",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 3 — Navigator: navy & teal charting
    {
      PRIMARY:   "182A45",  SECONDARY: "186565",  ACCENT:  "826010",
      ALERT:     "721616",  SUCCESS:   "1E6538",  ASSESS:  "4C2868",
      BG_DARK:   "101E30",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBE0",  SUBTITLE: "A8B8D0",
      DECOR_1:   "186565",  DECOR_2:   "826010",
      FONT_H:    "Trebuchet MS",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 4 — Naturalist: forest & slate blue
    {
      PRIMARY:   "285528",  SECONDARY: "304A65",  ACCENT:  "826818",
      ALERT:     "621828",  SUCCESS:   "1E6538",  ASSESS:  "4C2868",
      BG_DARK:   "182818",  BG_LIGHT:  "FFFAF5",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F5F0E0",  SUBTITLE: "B0C8A8",
      DECOR_1:   "304A65",  DECOR_2:   "826818",
      FONT_H:    "Trebuchet MS",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 5 — Inventor: slate & burnt orange
    {
      PRIMARY:   "283A48",  SECONDARY: "824518",  ACCENT:  "18655A",
      ALERT:     "54284A",  SUCCESS:   "1E6538",  ASSESS:  "4C2868",
      BG_DARK:   "141E28",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBE0",  SUBTITLE: "A8B8C8",
      DECOR_1:   "824518",  DECOR_2:   "18655A",
      FONT_H:    "Trebuchet MS",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],

  // --------------------------------------------------------------------------
  // GRADE 3/4  (Trebuchet MS / Calibri — curious, structured)
  // --------------------------------------------------------------------------
  grade34: [
    // 0 — Explorer: deep khaki/olive expedition
    {
      PRIMARY:   "3A4A2A",  SECONDARY: "8B4513",  ACCENT:  "8B6914",
      ALERT:     "1A2744",  SUCCESS:   "2D6A4F",  ASSESS:  "4A2D6B",
      BG_DARK:   "1A2218",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBD8",  SUBTITLE: "C0B8A0",
      DECOR_1:   "8B4513",  DECOR_2:   "8B6914",
      FONT_H:    "Trebuchet MS",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 1 — Detective: charcoal & crimson investigation
    {
      PRIMARY:   "36454F",  SECONDARY: "8B2635",  ACCENT:  "785F14",
      ALERT:     "2E5077",  SUCCESS:   "2D6A4F",  ASSESS:  "4A2D6B",
      BG_DARK:   "1A1E24",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBE0",  SUBTITLE: "B0ACA0",
      DECOR_1:   "8B2635",  DECOR_2:   "785F14",
      FONT_H:    "Trebuchet MS",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 2 — Archaeologist: deep brown & amber
    {
      PRIMARY:   "3E2723",  SECONDARY: "2D5F2D",  ACCENT:  "996515",
      ALERT:     "8B3A2A",  SUCCESS:   "2D6A4F",  ASSESS:  "4A2D6B",
      BG_DARK:   "1E1610",  BG_LIGHT:  "FFFAF5",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F5EDE0",  SUBTITLE: "D0C0A0",
      DECOR_1:   "2D5F2D",  DECOR_2:   "996515",
      FONT_H:    "Trebuchet MS",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 3 — Navigator: deep navy & teal charting
    {
      PRIMARY:   "1B2D4A",  SECONDARY: "1B6B6A",  ACCENT:  "8B6914",
      ALERT:     "7B1818",  SUCCESS:   "2D6A4F",  ASSESS:  "4A2D6B",
      BG_DARK:   "0F1828",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBE0",  SUBTITLE: "A8B8D0",
      DECOR_1:   "1B6B6A",  DECOR_2:   "8B6914",
      FONT_H:    "Trebuchet MS",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 4 — Naturalist: forest & slate observation
    {
      PRIMARY:   "2C5F2D",  SECONDARY: "354F6B",  ACCENT:  "8B7019",
      ALERT:     "6B1D2A",  SUCCESS:   "2D6A4F",  ASSESS:  "4A2D6B",
      BG_DARK:   "1A2A1A",  BG_LIGHT:  "FFFAF5",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBD8",  SUBTITLE: "A8C8A0",
      DECOR_1:   "354F6B",  DECOR_2:   "8B7019",
      FONT_H:    "Trebuchet MS",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 5 — Inventor: dark blue-grey creative
    {
      PRIMARY:   "2A3B4D",  SECONDARY: "8B4B1A",  ACCENT:  "1A6B5E",
      ALERT:     "5B2C4F",  SUCCESS:   "2D6A4F",  ASSESS:  "4A2D6B",
      BG_DARK:   "141E28",  BG_LIGHT:  "FFF8F0",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0EBE0",  SUBTITLE: "A8B8C8",
      DECOR_1:   "8B4B1A",  DECOR_2:   "1A6B5E",
      FONT_H:    "Trebuchet MS",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],

  // --------------------------------------------------------------------------
  // GRADE 5/6  (Georgia / Calibri — scholarly, research-oriented, most muted)
  // --------------------------------------------------------------------------
  grade56: [
    // 0 — Explorer: muted olive & warm terracotta
    {
      PRIMARY:   "3F4F30",  SECONDARY: "8B4A18",  ACCENT:  "8B6B18",
      ALERT:     "1A2A48",  SUCCESS:   "2A6848",  ASSESS:  "3D2C5E",
      BG_DARK:   "1E2818",  BG_LIGHT:  "F7F4EE",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "E8E2D5",  SUBTITLE: "B8B0A0",
      DECOR_1:   "8B4A18",  DECOR_2:   "8B6B18",
      FONT_H:    "Georgia",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 1 — Detective: sophisticated charcoal & dusty crimson
    {
      PRIMARY:   "3A4850",  SECONDARY: "8B2A38",  ACCENT:  "7A6820",
      ALERT:     "304A70",  SUCCESS:   "2A6848",  ASSESS:  "3D2C5E",
      BG_DARK:   "1E2830",  BG_LIGHT:  "F7F4EE",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "E8E2D5",  SUBTITLE: "A8A8A0",
      DECOR_1:   "8B2A38",  DECOR_2:   "7A6820",
      FONT_H:    "Georgia",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 2 — Archaeologist: rich brown & scholarly sage
    {
      PRIMARY:   "402A20",  SECONDARY: "306230",  ACCENT:  "906018",
      ALERT:     "8A3828",  SUCCESS:   "2A6848",  ASSESS:  "3D2C5E",
      BG_DARK:   "1E1810",  BG_LIGHT:  "FFFAF5",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "F0E8D8",  SUBTITLE: "C8B8A0",
      DECOR_1:   "306230",  DECOR_2:   "906018",
      FONT_H:    "Georgia",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 3 — Navigator: deep navy & academic teal
    {
      PRIMARY:   "1E3050",  SECONDARY: "1E7070",  ACCENT:  "886818",
      ALERT:     "801A1A",  SUCCESS:   "2A6848",  ASSESS:  "3D2C5E",
      BG_DARK:   "121E30",  BG_LIGHT:  "F7F4EE",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "E8E2D5",  SUBTITLE: "A0B0C8",
      DECOR_1:   "1E7070",  DECOR_2:   "886818",
      FONT_H:    "Georgia",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 4 — Naturalist: refined forest & scholarly slate
    {
      PRIMARY:   "305830",  SECONDARY: "385268",  ACCENT:  "887018",
      ALERT:     "702030",  SUCCESS:   "2A6848",  ASSESS:  "3D2C5E",
      BG_DARK:   "1A2818",  BG_LIGHT:  "FFFAF5",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "E8E5D8",  SUBTITLE: "A0C0A0",
      DECOR_1:   "385268",  DECOR_2:   "887018",
      FONT_H:    "Georgia",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 5 — Inventor: refined blue-grey & copper
    {
      PRIMARY:   "2E4050",  SECONDARY: "8A4E1E",  ACCENT:  "1E7060",
      ALERT:     "5E3050",  SUCCESS:   "2A6848",  ASSESS:  "3D2C5E",
      BG_DARK:   "1A2430",  BG_LIGHT:  "F7F4EE",  BG_CARD: "FFFFFF",
      WHITE:     "FFFFFF",  CHARCOAL:  "2C2C2C",  MUTED:   "7B8A88",
      TEXT_ON_DARK: "E8E2D5",  SUBTITLE: "A0B0C0",
      DECOR_1:   "8A4E1E",  DECOR_2:   "1E7060",
      FONT_H:    "Georgia",  FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],

};

module.exports = { palettes };
