---
version: alpha
name: Blackshore Pulse Visual Identity
description: Deep Obsidian Frosted Glass meets Precision Telemetry
dials:
  variance: 6
  motion: 4
  density: 7
colors:
  primary: "#0D0F14"
  substrate: "#0D0F14"
  surface: "rgba(22, 25, 33, 0.78)"
  surface-border: "rgba(255, 255, 255, 0.08)"
  surface-hover: "rgba(255, 255, 255, 0.14)"
  text-primary: "#F1F5F9"
  text-secondary: "#94A3B8"
  text-muted: "#64748B"
  accent-normal: "#2E9E6B"
  accent-warn: "#D99A2B"
  accent-crit: "#D4553F"
typography:
  display:
    fontFamily: Inter, -apple-system, sans-serif
    fontSize: 2.25rem
    fontWeight: 600
    letterSpacing: "-0.02em"
    lineHeight: 1.15
  body:
    fontFamily: Inter, -apple-system, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  data:
    fontFamily: JetBrains Mono, monospace
    fontSize: 0.875rem
    fontWeight: 500
    fontFeature: '"tnum"'
rounded:
  sm: 6px
  md: 12px
  lg: 16px
  panel: 20px
  pill: 9999px
spacing:
  base: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section: 64px
components:
  panel-glass:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.panel}"
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "#0D0F14"
    rounded: "{rounded.sm}"
    padding: 8px
---

## Overview

Blackshore Pulse represents a real-time infrastructure status telemetry dashboard for distributed engineering systems, using Linear and Apple precision aesthetics.

## Colors

- **Substrate (#0D0F14):** Deep obsidian canvas base layer with organic radial glow.
- **Surface (rgba(22, 25, 33, 0.78)):** Frosted glass panel fill at 78% opacity.
- **Surface Border (rgba(255, 255, 255, 0.08)):** Hairline glass border.
- **Surface Hover (rgba(255, 255, 255, 0.14)):** Interactive hover highlight.
- **Text Primary (#F1F5F9):** Crisp high-contrast headlines and values.
- **Text Secondary (#94A3B8):** Subtitle, status description, and metadata.
- **Text Muted (#64748B):** Labels, metrics units, and captions.
- **Accent Normal (#2E9E6B):** Emerald status for healthy services.
- **Accent Warn (#D99A2B):** Amber status for degraded services.
- **Accent Crit (#D4553F):** Rose status for critical or offline services.

## Typography

- Display headings use Inter with tracking-tight and leading-none.
- Body copy uses Inter with leading-relaxed.
- Telemetry numbers strictly use JetBrains Mono with tabular-nums for vertical scannability.

## Layout

- Three Dials: Variance 6/10, Motion 4/10, Density 7/10.
- Base grid uses 4px and 8px scale.
- Card padding is 20px to 24px on desktop, collapsing to 14px on mobile viewports.
- Responsive grid transitions seamlessly from multi-column cockpit to 2-column or 1-column mobile views.

## Elevation & Depth

- Background layering uses dark obsidian with subtle ambient radial gradients.
- Panels use backdrop-filter blur(20px) saturate(160%) with inset top highlight borders.

## Shapes

- Rounded corners use 12px for metric tags and 20px for primary telemetry glass panels.

## Components

- `panel-glass` creates the primary telemetry card container.
- `button-primary` provides high-contrast cockpit interaction controls.

## Do's and Don'ts

- DO use tabular numerals for all latency, uptime, and status codes.
- DO keep micro-interactions subtle (dial 4/10).
- DONT use em-dashes anywhere in text or UI.
- DONT use purple or magenta generic gradients.
- DONT use emoji icons in badges or titles.
