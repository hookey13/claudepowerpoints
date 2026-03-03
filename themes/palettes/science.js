"use strict";

// ============================================================================
// Science Theme Palettes
// Clean, modern, discovery-oriented. Labs, microscopes, periodic tables,
// ecosystems, space. Clean whites/greys with strong STEM colours.
//
// 6 variants per year level, 5 year levels = 30 palettes total.
// All foreground-on-background pairs meet WCAG AA contrast (>= 4.5:1).
// ============================================================================

const palettes = {

  // ==========================================================================
  // FOUNDATION  (Arial Black / Calibri)
  // Bold, exciting, wonder-filled. Deepest saturation for engagement.
  // ==========================================================================
  foundation: [
    // 1. Lab Coat — deep navy, dark teal, burnt orange, crimson
    {
      PRIMARY: "152B45", SECONDARY: "0A5858", ACCENT: "944F18",
      ALERT: "7A1515", SUCCESS: "156B30", ASSESS: "501A7A",
      BG_DARK: "0F1B2B", BG_LIGHT: "F4F6FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E8EEF4", SUBTITLE: "A0B0C0",
      DECOR_1: "0A5858", DECOR_2: "944F18",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 2. Periodic — deep indigo, element green, dark gold, dark red
    {
      PRIMARY: "152050", SECONDARY: "155A3E", ACCENT: "7A6015",
      ALERT: "6A1515", SUCCESS: "156035", ASSESS: "401A6A",
      BG_DARK: "0E1A30", BG_LIGHT: "F3F5FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E0E8F5", SUBTITLE: "98A8C0",
      DECOR_1: "155A3E", DECOR_2: "7A6015",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 3. Ecosystem — dark forest, earth brown, deep sky blue, rust
    {
      PRIMARY: "255025", SECONDARY: "4A2E15", ACCENT: "154A75",
      ALERT: "7A3025", SUCCESS: "1A6040", ASSESS: "4A1A6A",
      BG_DARK: "1A2B1A", BG_LIGHT: "F4F7F2", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7A68", TEXT_ON_DARK: "E8F0E8", SUBTITLE: "A0B8A0",
      DECOR_1: "4A2E15", DECOR_2: "154A75",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 4. Galaxy — deep purple, nebula blue, stellar gold, supernova red
    {
      PRIMARY: "221545", SECONDARY: "154068", ACCENT: "7A5A10",
      ALERT: "7A1525", SUCCESS: "155A45", ASSESS: "3A1565",
      BG_DARK: "15102B", BG_LIGHT: "F5F3FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "706880", TEXT_ON_DARK: "E8E0F5", SUBTITLE: "B0A0C8",
      DECOR_1: "154068", DECOR_2: "7A5A10",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 5. Voltage — dark grey-blue, electric teal, amber, crimson
    {
      PRIMARY: "182535", SECONDARY: "085858", ACCENT: "8A5810",
      ALERT: "6A2525", SUCCESS: "1A6540", ASSESS: "401A6A",
      BG_DARK: "121D28", BG_LIGHT: "F4F6F8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E0EAF0", SUBTITLE: "98AAB8",
      DECOR_1: "085858", DECOR_2: "8A5810",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 6. Microscope — dark slate, cell green, warm orange, berry
    {
      PRIMARY: "223040", SECONDARY: "155A3E", ACCENT: "7A4E18",
      ALERT: "4A2240", SUCCESS: "1A5A3A", ASSESS: "3A1A65",
      BG_DARK: "1A2530", BG_LIGHT: "F4F6F8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E0E8F0", SUBTITLE: "98A8B8",
      DECOR_1: "155A3E", DECOR_2: "7A4E18",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],

  // ==========================================================================
  // GRADE 1  (Arial Black / Calibri)
  // Bold, curious. Slightly more refined than Foundation.
  // ==========================================================================
  grade1: [
    // 1. Lab Coat — navy, teal, safety orange, crimson
    {
      PRIMARY: "183050", SECONDARY: "0B6060", ACCENT: "9A551A",
      ALERT: "851818", SUCCESS: "187530", ASSESS: "551E80",
      BG_DARK: "101E32", BG_LIGHT: "F4F6FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E5ECF5", SUBTITLE: "9CAEC5",
      DECOR_1: "0B6060", DECOR_2: "9A551A",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 2. Periodic — deep indigo, element green, gold, dark red
    {
      PRIMARY: "182555", SECONDARY: "186545", ACCENT: "856818",
      ALERT: "751818", SUCCESS: "186840", ASSESS: "451E70",
      BG_DARK: "101832", BG_LIGHT: "F3F5FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E2E8F5", SUBTITLE: "9AA5C2",
      DECOR_1: "186545", DECOR_2: "856818",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 3. Ecosystem — forest, earth brown, sky blue, rust
    {
      PRIMARY: "2A5828", SECONDARY: "553518", ACCENT: "185580",
      ALERT: "853028", SUCCESS: "206545", ASSESS: "501E70",
      BG_DARK: "1B2E1B", BG_LIGHT: "F4F7F3", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7A6A", TEXT_ON_DARK: "E5F0E5", SUBTITLE: "A0B8A0",
      DECOR_1: "553518", DECOR_2: "185580",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 4. Galaxy — deep purple, nebula blue, stellar gold, supernova red
    {
      PRIMARY: "261848", SECONDARY: "184570", ACCENT: "856010",
      ALERT: "851828", SUCCESS: "186548", ASSESS: "3E1860",
      BG_DARK: "18122E", BG_LIGHT: "F5F4FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "706880", TEXT_ON_DARK: "E5E0F5", SUBTITLE: "B0A2C5",
      DECOR_1: "184570", DECOR_2: "856010",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 5. Voltage — dark grey-blue, electric teal, amber, crimson
    {
      PRIMARY: "1B2838", SECONDARY: "0A6060", ACCENT: "906010",
      ALERT: "702828", SUCCESS: "186845", ASSESS: "451E6A",
      BG_DARK: "14202C", BG_LIGHT: "F4F6F8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E2EAF2", SUBTITLE: "9AAAB8",
      DECOR_1: "0A6060", DECOR_2: "906010",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 6. Microscope — dark slate, cell green, warm orange, berry
    {
      PRIMARY: "283545", SECONDARY: "186545", ACCENT: "85521A",
      ALERT: "502640", SUCCESS: "18603A", ASSESS: "3E1860",
      BG_DARK: "1C2835", BG_LIGHT: "F4F6F8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E2E8F0", SUBTITLE: "9AA8B8",
      DECOR_1: "186545", DECOR_2: "85521A",
      FONT_H: "Arial Black", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],

  // ==========================================================================
  // GRADE 2  (Trebuchet MS / Calibri)
  // Transitional. Slightly more mature palette, still inviting.
  // ==========================================================================
  grade2: [
    // 1. Lab Coat — navy, teal, safety orange, crimson
    {
      PRIMARY: "1C3555", SECONDARY: "0C6868", ACCENT: "A05820",
      ALERT: "881818", SUCCESS: "1A7835", ASSESS: "581E85",
      BG_DARK: "121F35", BG_LIGHT: "F5F7FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E8EEF5", SUBTITLE: "A0B2C8",
      DECOR_1: "0C6868", DECOR_2: "A05820",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 2. Periodic — deep indigo, element green, gold, dark red
    {
      PRIMARY: "1A2858", SECONDARY: "1A6848", ACCENT: "887015",
      ALERT: "781818", SUCCESS: "1A7040", ASSESS: "481E75",
      BG_DARK: "121A35", BG_LIGHT: "F3F5FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E2E8F5", SUBTITLE: "9CA8C5",
      DECOR_1: "1A6848", DECOR_2: "887015",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 3. Ecosystem — forest, earth brown, sky blue, rust
    {
      PRIMARY: "2B5A2C", SECONDARY: "58381A", ACCENT: "1A5888",
      ALERT: "883028", SUCCESS: "226848", ASSESS: "521E75",
      BG_DARK: "1E301E", BG_LIGHT: "F4F7F3", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7A6A", TEXT_ON_DARK: "E8F0E8", SUBTITLE: "A2BAA2",
      DECOR_1: "58381A", DECOR_2: "1A5888",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 4. Galaxy — deep purple, nebula blue, stellar gold, supernova red
    {
      PRIMARY: "281A4B", SECONDARY: "1A4878", ACCENT: "886510",
      ALERT: "881A28", SUCCESS: "1A684A", ASSESS: "401A62",
      BG_DARK: "1A1430", BG_LIGHT: "F5F4FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "706880", TEXT_ON_DARK: "E8E2F5", SUBTITLE: "B2A5C8",
      DECOR_1: "1A4878", DECOR_2: "886510",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 5. Voltage — dark grey-blue, electric teal, amber, crimson
    {
      PRIMARY: "1D2A3A", SECONDARY: "0A6868", ACCENT: "956212",
      ALERT: "752828", SUCCESS: "1A6A48", ASSESS: "481E6A",
      BG_DARK: "151F2A", BG_LIGHT: "F4F6F8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E2ECF2", SUBTITLE: "9CACC0",
      DECOR_1: "0A6868", DECOR_2: "956212",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 6. Microscope — dark slate, cell green, warm orange, berry
    {
      PRIMARY: "283848", SECONDARY: "1A6848", ACCENT: "88581C",
      ALERT: "522840", SUCCESS: "1A623E", ASSESS: "401A62",
      BG_DARK: "1C2832", BG_LIGHT: "F4F6F8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E2EAF0", SUBTITLE: "9CAAB8",
      DECOR_1: "1A6848", DECOR_2: "88581C",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],

  // ==========================================================================
  // GRADE 3/4  (Trebuchet MS / Calibri)
  // Systematic, clear. Balanced saturation — serious but not austere.
  // ==========================================================================
  grade34: [
    // 1. Lab Coat — dark blue, teal, safety orange, crimson
    {
      PRIMARY: "1A3350", SECONDARY: "0D6B6B", ACCENT: "A85C1E",
      ALERT: "8B1A1A", SUCCESS: "1A7A3A", ASSESS: "5B2A8B",
      BG_DARK: "0F1B2B", BG_LIGHT: "F5F7FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E8EEF4", SUBTITLE: "A2B5C8",
      DECOR_1: "0D6B6B", DECOR_2: "A85C1E",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 2. Periodic — deep indigo, element green, gold, dark red
    {
      PRIMARY: "1B2A5B", SECONDARY: "1B6B4A", ACCENT: "8B7019",
      ALERT: "7B1A1A", SUCCESS: "1B7040", ASSESS: "4A2A7B",
      BG_DARK: "0E1A30", BG_LIGHT: "F3F5FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E0E8F5", SUBTITLE: "9EAAC5",
      DECOR_1: "1B6B4A", DECOR_2: "8B7019",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 3. Ecosystem — forest, earth brown, sky blue, rust
    {
      PRIMARY: "2C5F2D", SECONDARY: "5D3A1A", ACCENT: "1B5B8B",
      ALERT: "8B3A2A", SUCCESS: "2D6A4F", ASSESS: "5A3A7A",
      BG_DARK: "1A2B1A", BG_LIGHT: "F4F7F2", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7A68", TEXT_ON_DARK: "E8F0E8", SUBTITLE: "A5BCA5",
      DECOR_1: "5D3A1A", DECOR_2: "1B5B8B",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 4. Galaxy — deep purple, nebula blue, stellar gold, supernova red
    {
      PRIMARY: "2A1B4E", SECONDARY: "1B4B7B", ACCENT: "8B6914",
      ALERT: "8B1A2A", SUCCESS: "1A6A5A", ASSESS: "4B1A7B",
      BG_DARK: "15102B", BG_LIGHT: "F5F3FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "706880", TEXT_ON_DARK: "E8E0F5", SUBTITLE: "B2A5C8",
      DECOR_1: "1B4B7B", DECOR_2: "8B6914",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 5. Voltage — dark grey-blue, electric teal, amber, crimson
    {
      PRIMARY: "1E2D3D", SECONDARY: "0A6B6B", ACCENT: "996515",
      ALERT: "7B2A2A", SUCCESS: "1A6B50", ASSESS: "4A2A6B",
      BG_DARK: "121D28", BG_LIGHT: "F4F6F8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E0EAF0", SUBTITLE: "9CAEC0",
      DECOR_1: "0A6B6B", DECOR_2: "996515",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 6. Microscope — dark slate, cell green, warm orange, berry
    {
      PRIMARY: "2A3A4A", SECONDARY: "1B6B4A", ACCENT: "8B5A1E",
      ALERT: "5B2A4A", SUCCESS: "1A6A4A", ASSESS: "4A2A7B",
      BG_DARK: "1A2530", BG_LIGHT: "F4F6F8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2C2C2C", MUTED: "6B7280", TEXT_ON_DARK: "E0E8F0", SUBTITLE: "9CAAB8",
      DECOR_1: "1B6B4A", DECOR_2: "8B5A1E",
      FONT_H: "Trebuchet MS", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],

  // ==========================================================================
  // GRADE 5/6  (Georgia / Calibri)
  // Most sophisticated/muted. Professional, research-oriented.
  // ==========================================================================
  grade56: [
    // 1. Lab Coat — steel navy, deep teal, warm amber-orange, crimson
    {
      PRIMARY: "1E3858", SECONDARY: "107070", ACCENT: "B06020",
      ALERT: "901E1E", SUCCESS: "1E8040", ASSESS: "602090",
      BG_DARK: "121E30", BG_LIGHT: "F5F7FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2D3142", MUTED: "6B7280", TEXT_ON_DARK: "E8F0F8", SUBTITLE: "A5B8D0",
      DECOR_1: "107070", DECOR_2: "B06020",
      FONT_H: "Georgia", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 2. Periodic — deep indigo, element green, dark gold, dark red
    {
      PRIMARY: "1E3060", SECONDARY: "1E7050", ACCENT: "887015",
      ALERT: "801E1E", SUCCESS: "1E7545", ASSESS: "501E80",
      BG_DARK: "121A38", BG_LIGHT: "F3F5FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2D3142", MUTED: "6B7280", TEXT_ON_DARK: "E2EAF8", SUBTITLE: "A0AEC8",
      DECOR_1: "1E7050", DECOR_2: "887015",
      FONT_H: "Georgia", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 3. Ecosystem — forest, earth brown, sky blue, rust
    {
      PRIMARY: "306530", SECONDARY: "604020", ACCENT: "1E6090",
      ALERT: "903530", SUCCESS: "28704E", ASSESS: "581E80",
      BG_DARK: "1E321E", BG_LIGHT: "F4F7F3", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2D3142", MUTED: "6B7A6A", TEXT_ON_DARK: "EAF2EA", SUBTITLE: "A8C0A8",
      DECOR_1: "604020", DECOR_2: "1E6090",
      FONT_H: "Georgia", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 4. Galaxy — deep purple, nebula blue, stellar gold, supernova red
    {
      PRIMARY: "2E1E55", SECONDARY: "1E5080", ACCENT: "907015",
      ALERT: "901E30", SUCCESS: "1E7050", ASSESS: "451E6A",
      BG_DARK: "1A1232", BG_LIGHT: "F5F4FA", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2D3142", MUTED: "706880", TEXT_ON_DARK: "EAE2F8", SUBTITLE: "B5A8D0",
      DECOR_1: "1E5080", DECOR_2: "907015",
      FONT_H: "Georgia", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 5. Voltage — dark grey-blue, electric teal, amber, crimson
    {
      PRIMARY: "203040", SECONDARY: "0E7070", ACCENT: "A06A18",
      ALERT: "802E2E", SUCCESS: "1E7048", ASSESS: "501E70",
      BG_DARK: "161E28", BG_LIGHT: "F4F6F8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2D3142", MUTED: "6B7280", TEXT_ON_DARK: "E5EDF5", SUBTITLE: "A0B2C5",
      DECOR_1: "0E7070", DECOR_2: "A06A18",
      FONT_H: "Georgia", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
    // 6. Microscope — dark slate, cell green, warm orange, berry
    {
      PRIMARY: "2E4050", SECONDARY: "1E7050", ACCENT: "906018",
      ALERT: "582E48", SUCCESS: "1E6845", ASSESS: "451E68",
      BG_DARK: "1E2835", BG_LIGHT: "F4F6F8", BG_CARD: "FFFFFF", WHITE: "FFFFFF",
      CHARCOAL: "2D3142", MUTED: "6B7280", TEXT_ON_DARK: "E5EDF2", SUBTITLE: "A0B0C0",
      DECOR_1: "1E7050", DECOR_2: "906018",
      FONT_H: "Georgia", FONT_B: "Calibri",
      SHADOW_BLUR: 6, SHADOW_OFFSET: 2, SHADOW_OPACITY: 0.12,
      CARD_SHADOW_BLUR: 4, CARD_SHADOW_OFFSET: 1, CARD_SHADOW_OPACITY: 0.10,
    },
  ],
};

module.exports = { palettes };
