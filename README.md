# 🎓 LearnHub - Modulare Lernplattform

Eine moderne, modulare Lernplattform für React, TypeScript, Next.js, Mathe und mehr.

## Features

- 📚 **Modulare Struktur** - Beliebige Themen hinzufügen
- 🎯 **Interaktive Lektionen** - Code-Beispiele inline
- 📊 **Fortschritts-Tracking** - LocalStorage-basiert
- 🧠 **Quizzes** - Wissen testen nach jeder Lektion
- 🌙 **Dark Theme** - Modernes, dunkles Design
- 📱 **Responsive** - Funktioniert auf allen Geräten

## Tech Stack

- **Next.js 14** - React Framework
- **TypeScript** - Typsicherheit
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Start

```bash
cd learning-platform
npm install
npm run dev
```

Öffne http://localhost:3000

## Neue Themen hinzufügen

Bearbeite `lib/data.ts` und füge ein neues Modul hinzu:

```typescript
{
  id: "5",
  slug: "python-basics",
  title: "Python Grundlagen",
  description: "Lerne Python von Grund auf",
  icon: "🐍",
  color: "#3776ab",
  progress: 0,
  lessons: [
    {
      id: "p1",
      title: "Was ist Python?",
      duration: "5 min",
      type: "video",
      content: "# Was ist Python?\n\n...",
    },
  ],
}
```

## Ordnerstruktur

```
learning-platform/
├── app/
│   ├── layout.tsx          # Root Layout
│   ├── page.tsx            # Dashboard
│   ├── globals.css         # Globale Styles
│   └── modules/
│       ├── page.tsx        # Module-Übersicht
│       └── [slug]/
│           └── page.tsx    # Modul-Detail
├── components/
│   ├── ModuleCard.tsx      # Modul-Karte
│   ├── ProgressBar.tsx     # Fortschrittsbalken
│   ├── LessonViewer.tsx    # Lektion-Anzeige
│   └── Quiz.tsx            # Quiz-Komponente
├── lib/
│   └── data.ts             # Mock-Daten & Types
└── package.json
```

## Inhalt

### React Grundlagen ⚛️
- Was ist React?
- Komponenten & Props
- useState Hook
- useEffect Hook
- Quiz

### TypeScript Basics 📘
- Warum TypeScript?
- Interfaces & Types
- Generics

### Next.js ▲
- Einführung & Setup

### Mathe: Ableitungen 📐
- Was ist eine Ableitung?
- Differentiationsregeln
- Kettenregel
- Produktregel

---

*Built with ❤️ by Max*
