# CLAUDE.md

## Project Overview

Merve's personal website — a Windows 95-themed digital garden built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. The UI simulates a Win95 desktop with draggable windows, a taskbar, and desktop icons.

## Architecture

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + custom CSS variables in `globals.css` for Win95 theming
- **Fonts**: W95FA (pixel font), Lora, IBM Plex Mono
- **Content**: MDX files in `content/` directory

### Directory Structure

```
src/
  app/              # Next.js App Router pages
    posts/[slug]/   # Individual post pages
    experiments/    # Experiments section
    product-design/ # Product design section
    self-improvement/
    travel/
  components/
    Win95Desktop.tsx     # Root desktop component
    apps/                # App windows (browser, notebook, etc.)
    desktop/             # Desktop icons and layout
    diagrams/            # Diagram components
    taskbar/             # Taskbar components
    ui/                  # Reusable Win95 UI primitives
    window/              # Window chrome components
  lib/
    content.ts      # MDX content loading utilities
    posts.ts        # Post fetching helpers
    categories.ts   # Category definitions

content/
  craft/            # Blog posts about making things
  growth/           # Blog posts about personal growth
  now.mdx           # /now page content
```

## Win95 Design System

CSS variables defined in `globals.css`:
- `--desktop-bg: #008080` (teal desktop)
- `--win-bg: #C0C0C0` (window background)
- `--title-active-start/end` (active titlebar gradient)
- `--win95-font` (pixel font stack)

Utility classes: `.win95-raised`, `.win95-sunken` for bevel effects.

## Content

Blog posts are MDX files. Categories:
- `craft/` — making things, building, design
- `growth/` — learning, habits, personal development

## Commands

```bash
npm run dev    # Start dev server
npm run build  # Build for production
npm run lint   # Run ESLint
```

## Deployment

Deployed on Vercel (configured via `vercel.json`).
