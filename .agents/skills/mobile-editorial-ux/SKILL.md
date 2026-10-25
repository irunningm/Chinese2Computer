---
name: mobile-editorial-ux
description: Enforces Claude Design editorial aesthetics combined with mobile-first thumb-zone navigation, progressive disclosure, bottom-sheet detail drawers, and high-affordance micro-interactions for non-technical humanities users.
---

# Mobile-First Editorial UX Skill (`mobile-editorial-ux`)

This skill synthesizes **Anthropic Claude Design (Editorial Salon Aesthetic)** with **`mobile-app-ui-design` (Thumb-Zone Ergonomics)** and **`beginner-mobile-ux` (Progressive Disclosure)** to create intuitive, zero-intimidation interactive products for humanities users across both mobile (375px–430px) and desktop viewports.

---

## 1. Information Architecture: Single-View Focus (No Endless Scroll Walls)
- **Independent Tab Views (One Module at a Time):** Never dump all modules onto a single 5,000px scrolling page. Render **one active view** at a time (`营造法式` | `格物词典` | `纪事本末` | `案头手札`), resetting scroll to top on view switch.
- **Thumb-Zone Bottom Navigation (Mobile) & Top Segmented Bar (Desktop):**
  - On viewports `< 768px`, fix a 4-tab navigation bar at the bottom of the screen (`height: 64px` + safe-area inset) where the user's thumb naturally rests.
  - On desktop, provide both a clean top segmented switcher and an optional **"手机预览模式 (Mobile Device Frame Toggle)"** so creators can test mobile ergonomics on desktop with one click.

## 2. Three-Layer Progressive Disclosure (Zero Code Intimidation)
Non-technical users freeze when confronted with dense code blocks and multi-pane dashboards simultaneously. Enforce strict 3-layer progressive disclosure:
1. **Layer 1 — Scannable Intuition Card:**
   - Show only: Index numeral (`01`), Literary Term (`书籍装帧与版式`), Engineering Mapping (`↔ 前端 Frontend`), and a 1-sentence **Epiphany (`眉批顿悟`)**.
   - Include a clear, high-affordance action cue: `点按审阅详卷 →` (`min-height: 44px`).
2. **Layer 2 — In-Place Bottom Sheet / Editorial Drawer:**
   - **Never use side-by-side master-detail columns that stack vertically on mobile** (where tapping a top item updates content off-screen at the bottom).
   - Instead, tapping any card opens an **animated Bottom Sheet (mobile) / Centered Editorial Sheet (desktop)** immediately in the user's viewport, presenting the literary-to-engineering explanation and AI prompt advice.
3. **Layer 3 — On-Demand Code Accordion:**
   - Raw code snippets (`HTML/JS/SQL/Git`) inside cards or sheets must be placed inside a clean, tactile `<details>` or toggleable accordion (`展开文码双栏对勘 · View Code Contrast`) so users opt in to seeing code rather than being overwhelmed by it.

## 3. High-Affordance Micro-Interactions
- **Touch Targets:** Every interactive button, card, chip, or tab must be at least `44px × 44px`.
- **Peeking Horizontal Steppers / Carousels:** When presenting sequential steps (e.g., 5-step request flow or 4-chapter case study), use a clear progress indicator (`第 1 步 / 共 5 步`) with prominent **「上一步 / 下一步」** bottom buttons so users don't have to hunt for tiny tabs.
- **Interactive Flashcards:** For tactile demos (like flipping a card or testing a diagnostic quiz), provide an unmistakable pill button (`点击翻转花签 ↻`) and immediate visual state transition.

## 4. Visual Tokens (Claude Editorial Palette)
- **Canvas:** `#F5F4ED` (Warm Parchment), **Card Surface:** `#FAF9F5` / `#FFFFFF`
- **Ink:** `#141413` (Primary Olive-Black), `#5E5D59` (Secondary), `#87867F` (Tertiary)
- **Accent:** `#C96442` (Terracotta / 朱笔赭石), `#52664E` (Muted Sage)
- **Zero Emojis:** Use clean SVG line icons (1.5px stroke) and monospace index numbers (`01`, `02`).
