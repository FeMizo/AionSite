---
name: Continental
description: Refined and welcoming editorial school-site demonstration.
colors:
  paper: "#f6f4ed"
  ink: "#183d35"
  muted: "#4d655c"
  accent: "#a6442f"
  line: "#cbd1c5"
  life-surface: "#e8ecdf"
  button-hover: "#28574b"
typography:
  display:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(3.7rem, 6.8vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(2.7rem, 4.4vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.02
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  square: "0"
  circle: "50%"
spacing:
  small: "16px"
  medium: "24px"
  section: "100px"
  section-mobile: "64px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "16px 22px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  round-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    width: "48px"
    height: "48px"
  text-link:
    textColor: "{colors.ink}"
    padding: "0 0 8px"
  mobile-menu:
    textColor: "{colors.ink}"
    padding: "7px 14px"
  level-row:
    padding: "26px 0"
---

# Design System: Continental

## Overview

**Creative North Star: "A welcoming editorial campus"**

Refined, welcoming typography and broad photographs give the school demonstration a calm editorial voice. Warm paper and forest ink frame expressive serif headings and clear humanist body text.

The chosen school-site reference informs structure and motion while Continental retains its own identity. This is a provisional demo system, not approved institutional branding.

**Key Characteristics:**
- Editorial serif with humanist sans.
- Warm paper and forest ink.
- Flat surfaces, fine dividers and broad photographs.

## Colors

### Primary
- **Forest ink**: main text, headings, dividers and primary actions.
- **Forest hover**: primary action hover state.

### Secondary
- **Terracotta**: keyboard focus outlines.

### Neutral
- **Warm paper**: canvas, image captions and reversed text.
- **Muted green**: supporting copy.
- **Sage divider**: section rules.
- **Pale sage**: community section surface.

## Typography

Libre Caslon Display with Georgia fallback supplies regular-weight display headings. DM Sans supplies body text, navigation and captions. Body paragraphs cap at 68ch. Mobile display text uses clamp(3.1rem, 12vw, 4.3rem); section headings retain balanced wrapping. Navigation uses 14px and captions 12px.

## Layout

Centered containers cap at 1440px, with 5% desktop gutters and 6% mobile gutters. Two-column editorial compositions stack at 760px. Main section spacing follows the frontmatter; contact uses 110px vertical padding. Hero photos measure 390px high on desktop and 310px on mobile. The community block also caps at 1440px above 1600px.

## Elevation & Depth

No shadows are used. Fine rules, tonal fields and image crops establish hierarchy. Paper captions overlay photographs directly.

## Shapes

Square corners govern images and primary actions. Circular outlined discovery controls and the provisional lettermark supply a restrained geometric counterpoint.

## Components

Primary actions use forest ink with paper text and square corners. Text actions use an underline and separated directional arrow. Circular discovery links reverse ink and paper on hover over 0.25s. Interactive elements expose terracotta keyboard focus outlines (3px) with 6px offset.

Navigation becomes a disclosure menu on mobile. Native details and summary rows show serif level names, muted supporting phrases and a plus that rotates 45 degrees when expanded. Description text indents on desktop and aligns left on mobile.

The hero photograph reveals once over 1.15s with cubic-bezier(.16,1,.3,1). Reduced-motion preference removes animation and transitions and disables smooth scrolling. WhatsApp remains hidden until the configured number validates; status text explains availability. No forms, chips or card system are implemented.

## Do's and Don'ts

### Do:
- **Do** retain the serif/sans pairing and forest-on-paper hierarchy.
- **Do** retain visible focus, native disclosure semantics and reduced-motion support.
- **Do** identify sample photography and provisional identity elements.

### Don't:
- **Don't** copy the reference school's identity, text or claims.
- **Don't** present the provisional lettermark as an approved logo.
