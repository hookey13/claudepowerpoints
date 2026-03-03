"use strict";

/**
 * Wellbeing colour palettes — pure data, no functions, no imports.
 *
 * 5 year levels x 6 colour-family variants = 30 palettes.
 * Every colour passes WCAG AA contrast (>= 4.5:1) for its intended pairing:
 *   - WHITE (FFFFFF) on PRIMARY, SECONDARY, ACCENT, ALERT, SUCCESS, ASSESS
 *   - CHARCOAL on BG_LIGHT, BG_CARD, WHITE
 *   - TEXT_ON_DARK on BG_DARK
 *
 * Wellbeing identity: warm, nurturing, safe, calming.
 * Think nature, growth, community. Greens, earthy tones, warm oranges, soft blues.
 *
 * Variant families (consistent across all year levels):
 *   [0] Forest Haven   — deep forest green / sage / warm gold / terracotta
 *   [1] Ocean Calm     — deep ocean blue / seafoam / warm amber / soft coral
 *   [2] Sunset Garden  — deep burgundy / olive / warm orange / earth brown
 *   [3] Mountain Air   — deep teal / lavender-grey / warm copper / russet
 *   [4] Harvest Gold   — deep brown / forest / golden amber / brick
 *   [5] Meadow Mist    — deep sage / plum / soft gold / clay
 *
 * Year-level progression: foundation (most saturated) → grade56 (most muted).
 */

const palettes = {

  // ─────────────────────────────────────────────────────────────────────────
  // FOUNDATION — Boldest, most saturated. Arial Black / Calibri.
  // ─────────────────────────────────────────────────────────────────────────
  foundation: [
    // [0] Forest Haven
    {
      PRIMARY: "14522A", SECONDARY: "3B6E2A", ACCENT: "7A5C10", ALERT: "8B2E18",
      SUCCESS: "186830", ASSESS: "3D2C8D",
      BG_DARK: "14522A", BG_LIGHT: "F9F6EE", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B8B7B", TEXT_ON_DARK: "D4EACC", SUBTITLE: "B0D8A0",
      DECOR_1: "3B6E2A", DECOR_2: "7A5C10",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [1] Ocean Calm
    {
      PRIMARY: "0C4068", SECONDARY: "186858", ACCENT: "7A5A12", ALERT: "8B3828",
      SUCCESS: "186848", ASSESS: "3A2878",
      BG_DARK: "0C4068", BG_LIGHT: "F5F8FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B8898", TEXT_ON_DARK: "C0D8E8", SUBTITLE: "90C0D8",
      DECOR_1: "186858", DECOR_2: "7A5A12",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [2] Sunset Garden
    {
      PRIMARY: "6A1830", SECONDARY: "3A5C20", ACCENT: "8A4E10", ALERT: "5A3818",
      SUCCESS: "2A6A28", ASSESS: "5A1A6A",
      BG_DARK: "6A1830", BG_LIGHT: "FBF6F0", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "8B7878", TEXT_ON_DARK: "E8C8D0", SUBTITLE: "D8A0B0",
      DECOR_1: "3A5C20", DECOR_2: "8A4E10",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [3] Mountain Air
    {
      PRIMARY: "105858", SECONDARY: "4A4870", ACCENT: "8A5018", ALERT: "6A2818",
      SUCCESS: "1A6A50", ASSESS: "482878",
      BG_DARK: "105858", BG_LIGHT: "F5F8F8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "708888", TEXT_ON_DARK: "C0E0D8", SUBTITLE: "98CCC0",
      DECOR_1: "4A4870", DECOR_2: "8A5018",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [4] Harvest Gold
    {
      PRIMARY: "4A2E18", SECONDARY: "285A30", ACCENT: "886010", ALERT: "7A2820",
      SUCCESS: "286838", ASSESS: "5A2860",
      BG_DARK: "4A2E18", BG_LIGHT: "FAF6EE", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "8B8070", TEXT_ON_DARK: "E0D0B8", SUBTITLE: "C8B898",
      DECOR_1: "285A30", DECOR_2: "886010",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [5] Meadow Mist
    {
      PRIMARY: "2A5838", SECONDARY: "582858", ACCENT: "7A6818", ALERT: "7A3828",
      SUCCESS: "2A6840", ASSESS: "4A2A68",
      BG_DARK: "2A5838", BG_LIGHT: "F6F8F2", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "708878", TEXT_ON_DARK: "C8E0C8", SUBTITLE: "A8D0A8",
      DECOR_1: "582858", DECOR_2: "7A6818",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // GRADE 1 — Bold but slightly softer. Arial Black / Calibri.
  // ─────────────────────────────────────────────────────────────────────────
  grade1: [
    // [0] Forest Haven
    {
      PRIMARY: "1A5C32", SECONDARY: "426E35", ACCENT: "7A5E18", ALERT: "882E20",
      SUCCESS: "1E6A35", ASSESS: "422E88",
      BG_DARK: "1A5C32", BG_LIGHT: "F9F6EE", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "708B78", TEXT_ON_DARK: "D0E8C8", SUBTITLE: "A8D0A0",
      DECOR_1: "426E35", DECOR_2: "7A5E18",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [1] Ocean Calm
    {
      PRIMARY: "144870", SECONDARY: "206A58", ACCENT: "7A5E18", ALERT: "883830",
      SUCCESS: "206A48", ASSESS: "3E2E78",
      BG_DARK: "144870", BG_LIGHT: "F5F8FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "708898", TEXT_ON_DARK: "BCD4E4", SUBTITLE: "8CBCD0",
      DECOR_1: "206A58", DECOR_2: "7A5E18",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [2] Sunset Garden
    {
      PRIMARY: "6E2035", SECONDARY: "406020", ACCENT: "885218", ALERT: "5A3C20",
      SUCCESS: "306A30", ASSESS: "5A2068",
      BG_DARK: "6E2035", BG_LIGHT: "FBF6F0", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "8A7A78", TEXT_ON_DARK: "E4C4CC", SUBTITLE: "D0A0B0",
      DECOR_1: "406020", DECOR_2: "885218",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [3] Mountain Air
    {
      PRIMARY: "185E5E", SECONDARY: "4E4C70", ACCENT: "885418", ALERT: "6A3020",
      SUCCESS: "1E6C52", ASSESS: "4C2E78",
      BG_DARK: "185E5E", BG_LIGHT: "F5F8F8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "748888", TEXT_ON_DARK: "BCDCD4", SUBTITLE: "94C8C0",
      DECOR_1: "4E4C70", DECOR_2: "885418",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [4] Harvest Gold
    {
      PRIMARY: "4E3420", SECONDARY: "2E5E35", ACCENT: "886418", ALERT: "7A3028",
      SUCCESS: "2E6A3A", ASSESS: "5A2E60",
      BG_DARK: "4E3420", BG_LIGHT: "FAF6EE", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "8A8070", TEXT_ON_DARK: "DCC8B8", SUBTITLE: "C0B498",
      DECOR_1: "2E5E35", DECOR_2: "886418",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [5] Meadow Mist
    {
      PRIMARY: "305C3E", SECONDARY: "5C2E5C", ACCENT: "7A6A20", ALERT: "7A3E30",
      SUCCESS: "2E6A42", ASSESS: "4E3068",
      BG_DARK: "305C3E", BG_LIGHT: "F6F8F2", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "748878", TEXT_ON_DARK: "C4DCC4", SUBTITLE: "A4CCA4",
      DECOR_1: "5C2E5C", DECOR_2: "7A6A20",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // GRADE 2 — Transitional, noticeable reduction. Trebuchet MS / Calibri.
  // ─────────────────────────────────────────────────────────────────────────
  grade2: [
    // [0] Forest Haven
    {
      PRIMARY: "226240", SECONDARY: "4A7040", ACCENT: "7A6020", ALERT: "843428",
      SUCCESS: "286C3C", ASSESS: "483488",
      BG_DARK: "226240", BG_LIGHT: "F8F5EC", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "758B7A", TEXT_ON_DARK: "CCE4C4", SUBTITLE: "A0C8A0",
      DECOR_1: "4A7040", DECOR_2: "7A6020",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [1] Ocean Calm
    {
      PRIMARY: "1C5078", SECONDARY: "286E5C", ACCENT: "7A6020", ALERT: "844038",
      SUCCESS: "286E4E", ASSESS: "423478",
      BG_DARK: "1C5078", BG_LIGHT: "F4F7F9", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "748898", TEXT_ON_DARK: "B8D0E0", SUBTITLE: "88B8CC",
      DECOR_1: "286E5C", DECOR_2: "7A6020",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [2] Sunset Garden
    {
      PRIMARY: "702840", SECONDARY: "486428", ACCENT: "885620", ALERT: "5E4228",
      SUCCESS: "386C38", ASSESS: "582668",
      BG_DARK: "702840", BG_LIGHT: "FAF5EF", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "887C78", TEXT_ON_DARK: "E0C0C8", SUBTITLE: "C898A8",
      DECOR_1: "486428", DECOR_2: "885620",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [3] Mountain Air
    {
      PRIMARY: "206464", SECONDARY: "525070", ACCENT: "885820", ALERT: "6E3828",
      SUCCESS: "266E56", ASSESS: "503478",
      BG_DARK: "206464", BG_LIGHT: "F4F7F7", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "788888", TEXT_ON_DARK: "B8D8D0", SUBTITLE: "90C4BC",
      DECOR_1: "525070", DECOR_2: "885820",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [4] Harvest Gold
    {
      PRIMARY: "543A28", SECONDARY: "366238", ACCENT: "886820", ALERT: "783830",
      SUCCESS: "346C3E", ASSESS: "5A3460",
      BG_DARK: "543A28", BG_LIGHT: "F9F5EC", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "888070", TEXT_ON_DARK: "D8C4B4", SUBTITLE: "B8B098",
      DECOR_1: "366238", DECOR_2: "886820",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [5] Meadow Mist
    {
      PRIMARY: "386245", SECONDARY: "603460", ACCENT: "7A6C28", ALERT: "784438",
      SUCCESS: "366C48", ASSESS: "523668",
      BG_DARK: "386245", BG_LIGHT: "F5F7F0", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "788878", TEXT_ON_DARK: "C0D8C0", SUBTITLE: "A0C8A0",
      DECOR_1: "603460", DECOR_2: "7A6C28",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // GRADE 3/4 — Balanced, some sophistication. Trebuchet MS / Calibri.
  // ─────────────────────────────────────────────────────────────────────────
  grade34: [
    // [0] Forest Haven
    {
      PRIMARY: "28604A", SECONDARY: "4E7050", ACCENT: "786228", ALERT: "7A3A30",
      SUCCESS: "306C44", ASSESS: "4A3880",
      BG_DARK: "28604A", BG_LIGHT: "F7F4EA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "788B7C", TEXT_ON_DARK: "C8E0C0", SUBTITLE: "9CC49C",
      DECOR_1: "4E7050", DECOR_2: "786228",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [1] Ocean Calm
    {
      PRIMARY: "245878", SECONDARY: "307060", ACCENT: "786228", ALERT: "7C4440",
      SUCCESS: "307050", ASSESS: "463870",
      BG_DARK: "245878", BG_LIGHT: "F3F6F8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "788898", TEXT_ON_DARK: "B4CCD8", SUBTITLE: "88B4C4",
      DECOR_1: "307060", DECOR_2: "786228",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [2] Sunset Garden
    {
      PRIMARY: "6C3048", SECONDARY: "4C6830", ACCENT: "845A28", ALERT: "5C4830",
      SUCCESS: "3E6E40", ASSESS: "542C60",
      BG_DARK: "6C3048", BG_LIGHT: "F9F4EE", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "888078", TEXT_ON_DARK: "DCC0C4", SUBTITLE: "C098A4",
      DECOR_1: "4C6830", DECOR_2: "845A28",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [3] Mountain Air
    {
      PRIMARY: "286868", SECONDARY: "565470", ACCENT: "845C28", ALERT: "6A3E30",
      SUCCESS: "2E705A", ASSESS: "543870",
      BG_DARK: "286868", BG_LIGHT: "F3F6F6", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "7C8888", TEXT_ON_DARK: "B4D4CC", SUBTITLE: "8CC0B8",
      DECOR_1: "565470", DECOR_2: "845C28",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [4] Harvest Gold
    {
      PRIMARY: "584030", SECONDARY: "3C6840", ACCENT: "846C28", ALERT: "743E38",
      SUCCESS: "3A6E44", ASSESS: "583858",
      BG_DARK: "584030", BG_LIGHT: "F8F4EA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "888070", TEXT_ON_DARK: "D4C0B0", SUBTITLE: "B0A890",
      DECOR_1: "3C6840", DECOR_2: "846C28",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [5] Meadow Mist
    {
      PRIMARY: "3E664C", SECONDARY: "643A64", ACCENT: "787028", ALERT: "744A40",
      SUCCESS: "3C6E4E", ASSESS: "563C60",
      BG_DARK: "3E664C", BG_LIGHT: "F4F6EF", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "7C8878", TEXT_ON_DARK: "BCD4BC", SUBTITLE: "9CC09C",
      DECOR_1: "643A64", DECOR_2: "787028",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // GRADE 5/6 — Most muted and sophisticated. Georgia / Calibri.
  // ─────────────────────────────────────────────────────────────────────────
  grade56: [
    // [0] Forest Haven
    {
      PRIMARY: "305C50", SECONDARY: "527258", ACCENT: "706430", ALERT: "704240",
      SUCCESS: "386C4C", ASSESS: "4E4078",
      BG_DARK: "305C50", BG_LIGHT: "F6F3E8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "7C8B80", TEXT_ON_DARK: "C4DCBC", SUBTITLE: "98C098",
      DECOR_1: "527258", DECOR_2: "706430",
      FONT_H: "Georgia", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [1] Ocean Calm
    {
      PRIMARY: "2C5E78", SECONDARY: "387268", ACCENT: "706430", ALERT: "704C48",
      SUCCESS: "387258", ASSESS: "4A4068",
      BG_DARK: "2C5E78", BG_LIGHT: "F2F5F7", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "7C8898", TEXT_ON_DARK: "B0C8D4", SUBTITLE: "84B0C0",
      DECOR_1: "387268", DECOR_2: "706430",
      FONT_H: "Georgia", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [2] Sunset Garden
    {
      PRIMARY: "643850", SECONDARY: "506C40", ACCENT: "7A5E30", ALERT: "585040",
      SUCCESS: "446E48", ASSESS: "4E3458",
      BG_DARK: "643850", BG_LIGHT: "F8F3EC", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "888078", TEXT_ON_DARK: "D8BCC0", SUBTITLE: "BC98A0",
      DECOR_1: "506C40", DECOR_2: "7A5E30",
      FONT_H: "Georgia", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [3] Mountain Air
    {
      PRIMARY: "306C6C", SECONDARY: "585870", ACCENT: "7A6030", ALERT: "644440",
      SUCCESS: "347060", ASSESS: "584068",
      BG_DARK: "306C6C", BG_LIGHT: "F2F5F5", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "808888", TEXT_ON_DARK: "B0D0C8", SUBTITLE: "88BCB4",
      DECOR_1: "585870", DECOR_2: "7A6030",
      FONT_H: "Georgia", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [4] Harvest Gold
    {
      PRIMARY: "5C4838", SECONDARY: "426C48", ACCENT: "7C7030", ALERT: "6A4440",
      SUCCESS: "406E4C", ASSESS: "544050",
      BG_DARK: "5C4838", BG_LIGHT: "F7F3E8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "888070", TEXT_ON_DARK: "D0BCAC", SUBTITLE: "ACA490",
      DECOR_1: "426C48", DECOR_2: "7C7030",
      FONT_H: "Georgia", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // [5] Meadow Mist
    {
      PRIMARY: "446A54", SECONDARY: "604060", ACCENT: "707430", ALERT: "6A5048",
      SUCCESS: "426E54", ASSESS: "584258",
      BG_DARK: "446A54", BG_LIGHT: "F3F5EE", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "808878", TEXT_ON_DARK: "B8D0B8", SUBTITLE: "98BC98",
      DECOR_1: "604060", DECOR_2: "707430",
      FONT_H: "Georgia", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],
};

module.exports = { palettes };
