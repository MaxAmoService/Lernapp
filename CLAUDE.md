# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LearnHub is a German-language interactive learning platform for IHK exam prep, math, programming, and networking. Deployed on Vercel at `lernapp-nine.vercel.app`. All content is in German.

## Commands

```bash
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build (runs LaTeX validation as prebuild step)
npm run lint         # ESLint via Next.js
npm run prebuild     # Validates LaTeX escaping in lib/*Data.ts files
npx tsx scripts/generate-module-registry.ts  # Regenerate lib/content/registry.ts
```

## Architecture

**Next.js 14 App Router** — all pages are `"use client"` components. No API routes; all backend communication goes directly from client to Firebase.

### Data Flow

- **Module content** lives as static TypeScript data in `lib/*Data.ts` files (e.g., `ihkData.ts`, `mathData.ts`, `netzwerkData.ts`). Each file exports a `Module` object with lessons, quizzes, and exercises.
- `lib/data.ts` aggregates all modules and exports `allModules`, `categories`, `getModule()`.
- `lib/types.ts` defines `Module`, `Lesson`, `QuizQuestion`, `InteractiveType`, `Category`, `LessonVisual`.
- **Auth & persistence** via Firebase (Firestore + Auth). AuthProvider (`components/AuthProvider.tsx`) wraps the app and exposes `useAuth()` — handles user state, progress tracking, XP/levels, streaks, leaderboard, profile.
- **No Redux/Zustand** — state is React Context (AuthProvider) + Firestore.

### Key Directories

- `app/` — Routes: `/` (dashboard), `/modules` (browser), `/modules/[slug]` (module detail with lesson viewer, quiz, flashcards, exercises), `/leaderboard`, `/profile`, `/datenschutz`, `/impressum`
- `components/` — Top-level UI components (Navbar, LessonViewer, Quiz, FlashcardViewer, ModuleCard, etc.)
- `components/interactive/` — 65+ interactive learning tools (OSI explorer, subnet calculator, CPU architecture, RAID configurator, etc.). Exported via `index.ts` barrel. Matched to lessons via `InteractiveType` string in lesson data.
- `lib/` — Data files, types, utilities (flashcards.ts with SM-2 algorithm, presence.ts for online status)

### Adding a New Module

1. Create `lib/<subject>Data.ts` exporting a `Module` object (follow existing patterns)
2. Import and add to `lib/data.ts` (`allModules` array and `allCategories`)
3. Optionally add exercises in `lib/<subject>Exercises.ts` and flashcards in `lib/flashcardData.ts`
4. Run `npx tsx scripts/generate-module-registry.ts` if using `lib/content/` directory

### Adding a New Interactive Component

1. Create component in `components/interactive/`
2. Export from `components/interactive/index.ts`
3. Add the identifier string to `InteractiveType` union in `lib/types.ts`
4. Reference it in lesson data via the `interactive` field

## Tech Stack Specifics

- **Tailwind CSS** with custom dark theme (`dark-*` palette), glass morphism, custom animations (fadeIn, slideUp, pulse-slow)
- **KaTeX** for LaTeX math rendering (MathBlock, InlineMath components)
- **PrismJS** for code syntax highlighting
- **canvas-confetti** for completion celebrations
- **Lucide React** for all icons
- Path alias: `@/*` maps to project root

## Firebase Structure

- `users/{uid}` — profile, XP, level, streak, avatar, leaderboard opt-in
- `usernames/{username}` — username uniqueness
- `users/{uid}/data/progress` — lesson completion, module saves
- `users/{uid}/data/flashcards` — SM-2 spaced repetition state
- Region: `eur3` (Frankfurt) for DSGVO compliance

## Content Notes

- Lesson content uses markdown with embedded LaTeX (`$...$` for inline, `$$...$$` for blocks)
- LaTeX in template literals must use double backslashes (`\\frac`, not `\frac`) — the prebuild script validates this
- Python scripts at root (`add_exercises.py`, `add_merkblaetter.py`, etc.) batch-add content to data files
