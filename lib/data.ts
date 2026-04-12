import { mathModules, mathCategories, mathQuizzes } from "./mathData";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "text" | "interactive" | "quiz";
  content: string;
  codeExample?: string;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  category: string;
  lessons: Lesson[];
  merkblatt?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "programmieren",
    name: "Programmieren",
    icon: "💻",
    description: "Lerne moderne Programmiersprachen und Frameworks",
  },
  ...mathCategories,
];

export const modules: Module[] = [
  {
    id: "1",
    slug: "react-grundlagen",
    title: "React Grundlagen",
    description: "Lerne die Basics von React - Komponenten, Props, State und Hooks",
    icon: "⚛️",
    color: "#61dafb",
    category: "programmieren",
    progress: 35,
    merkblatt: "## 📋 Merkblatt: React\n\n### Grundlagen\n- Komponenten = Funktionen die JSX zurückgeben\n- JSX = HTML-ähnliche Syntax in JavaScript\n- Props = Daten von Eltern → Kinder (read-only)\n- State = interner Zustand mit useState()\n\n### Hooks\n- useState(): State verwalten\n- useEffect(): Nebeneffekte (API, Timer)\n- useContext(): Context nutzen\n\n### Regeln\n- Komponenten immer mit Großbuchstaben\n- Hooks nur auf oberster Ebene\n- state nie direkt manipulieren, sondern setState() nutzen",
    lessons: [
      {
        id: "r1",
        title: "Was ist React?",
        duration: "5 min",
        type: "video",
        content: `# Was ist React?

React ist eine **JavaScript-Bibliothek** von Meta (ehemals Facebook) für den Aufbau von Benutzeroberflächen.

## Warum React?

- **Komponenten-basiert**: Baue UIs aus wiederverwendbaren Bausteinen
- **Virtual DOM**: Schnelle Updates durch intelligente Diffing
- **Ecosystem**: Riesige Community und viele Tools
- **Einzelner State-Flow**: Vorhersehbares Datenfluss-Verhalten

## React vs. andere Frameworks

- **Vanilla JS**: Viel Boilerplate, schwer zu warten
- **jQuery**: Einfach, aber nicht skalierbar
- **React**: Declarativ, komponenten-basiert, performant

## Erste Komponente

Eine React-Komponente ist eine Funktion, die JSX zurückgibt:`,
        codeExample: `// Einfache Komponente
function Greeting({ name }) {
  return <h1>Hallo, {name}!</h1>;
}

// Verwendung
<Greeting name="Moritz" />`,
      },
      {
        id: "r2",
        title: "Komponenten & Props",
        duration: "10 min",
        type: "interactive",
        content: `# Komponenten & Props

Komponenten sind das Herzstück von React. Sie sind wiederverwendbare UI-Bausteine.

## Was sind Props?

Props (Properties) sind Daten, die von **Eltern- zu Kind-Komponenten** übergeben werden.

## Props sind read-only!

Eine Komponente darf ihre Props **nie** verändern. Das sorgt für vorhersehbares Verhalten.

## Beispiel: Benutzer-Karte`,
        codeExample: `// Kind-Komponente
function UserCard({ name, email, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

// Eltern-Komponente
function App() {
  return (
    <UserCard 
      name="Moritz"
      email="moritz@example.com"
      avatar="/avatar.jpg"
    />
  );
}`,
      },
      {
        id: "r3",
        title: "useState Hook",
        duration: "12 min",
        type: "interactive",
        content: `# useState Hook

Der **useState**-Hook ermöglicht es Funktionskomponenten State zu haben.

## Syntax

\`const [state, setState] = useState(initialValue);\`

- \`state\`: Der aktuelle Wert
- \`setState\`: Funktion zum Aktualisieren
- \`initialValue\`: Startwert

## Beispiel: Counter`,
        codeExample: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Du hast {count} mal geklickt</p>
      <button onClick={() => setCount(count + 1)}>
        Klick mich!
      </button>
    </div>
  );
}`,
      },
      {
        id: "r4",
        title: "useEffect Hook",
        duration: "15 min",
        type: "interactive",
        content: `# useEffect Hook

**useEffect** für Side Effects: API Calls, Subscriptions, DOM-Manipulation.

## Syntax

\`useEffect(() => { /* code */ }, [dependencies]);\`

- **Leeres Array []**: Nur beim Mount
- **Mit Dependencies**: Bei Änderungen
- **Kein Array**: Bei jedem Render

## Beispiel: Daten laden`,
        codeExample: `import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Neu laden bei userId-Änderung

  if (loading) return <p>Lädt...</p>;
  return <h1>{user.name}</h1>;
}`,
      },
      {
        id: "r5",
        title: "Quiz: React Grundlagen",
        duration: "5 min",
        type: "quiz",
        content: `# Quiz: React Grundlagen

Teste dein Wissen über React! Beantworte die Fragen, um das Modul abzuschließen.

## Tipps

- Lies die Fragen aufmerksam
- Bei Texteingabe: Achte auf Groß-/Kleinschreibung
- 80% werden zum Bestehen benötigt

Viel Erfolg! 🍀`,
      },
    ],
  },
  {
    id: "2",
    slug: "typescript-basics",
    title: "TypeScript Basics",
    description: "Typsicherheit in JavaScript - Interfaces, Types, Generics",
    icon: "📘",
    color: "#3178c6",
    category: "programmieren",
    progress: 0,
    merkblatt: "## 📋 Merkblatt: TypeScript\n\n### Primitive Types\n- string, number, boolean, null, undefined\n- any (vermeiden!), unknown, never\n\n### Complex Types\n- type User = { name: string; age: number }\n- interface Product { id: number; name: string }\n- Union: string | number\n- Array: number[] oder Array<number>\n\n### Functions\n- (a: number, b: number) => number\n- Optional: (name?: string) => void\n\n### Generics\n- Array<T>\n- function identity<T>(arg: T): T",
    lessons: [
      {
        id: "t1",
        title: "Warum TypeScript?",
        duration: "5 min",
        type: "text",
        content: `# Warum TypeScript?

TypeScript ist ein **Superset von JavaScript**, das statische Typen hinzufugt.

## Vorteile

- **Fehler zur Compile-Zeit**: Keine Laufzeit-Typfehler
- **Bessere IDE-Unterstützung**: Auto-Complete, Refactoring
- **Selbstdokumentierender Code**: Typen sind Dokumentation
- **Einfacheres Refactoring**: Compiler findet alle Stellen

## TypeScript vs JavaScript

| JavaScript | TypeScript |
|------------|------------|
| Dynamisch | Statisch |
| Laufzeitfehler | Compilezeitfehler |
| Keine Typen | Starke Typen |

## Erstes Beispiel`,
        codeExample: `// JavaScript - kein Fehler bis zur Ausführung
function add(a, b) {
  return a + b;
}
add("5", 3); // "53" - nicht gewollt!

// TypeScript - Fehler sofort!
function add(a: number, b: number): number {
  return a + b;
}
add("5", 3); // ❌ Compile Error!`,
      },
      {
        id: "t2",
        title: "Interfaces & Types",
        duration: "12 min",
        type: "interactive",
        content: `# Interfaces & Types

Beide definieren Strukturen, aber mit Unterschieden.

## Interface

Für Objekte und Klassen. Kann erweitert werden.

## Type Alias

Flexibler: Kann Primitive, Unions, Tuples sein.

## Unterschiede

- **Interface**: Erweiterbar (extends), Declaration Merging
- **Type**: Union Types, Utility Types, Tuple Types`,
        codeExample: `// Interface
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional
}

// Type Alias
type ID = string | number;
type Coordinates = [number, number];

// Erweiterung
interface Admin extends User {
  role: "admin";
  permissions: string[];
}

// Verwendung
const user: User = {
  id: 1,
  name: "Moritz",
  email: "moritz@example.com"
};`,
      },
      {
        id: "t3",
        title: "Generics",
        duration: "15 min",
        type: "interactive",
        content: `# Generics

Generics machen Code **wiederverwendbar** und **typsicher**.

## Problem ohne Generics

\`function first(arr: any[]): any\` - Typ geht verloren!

## Lösung mit Generics

\`function first<T>(arr: T[]): T\` - Typ bleibt erhalten!

## Typische Beispiele

- Arrays: \`Array<T>\` oder \`T[]\`
- Promises: \`Promise<T>\`
- useState: \`useState<T>\``,
        codeExample: `// Generic Funktion
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

first([1, 2, 3]); // Type: number | undefined
first(["a", "b"]); // Type: string | undefined

// Generic Interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Verwendung
interface User { id: number; name: string; }
const response: ApiResponse<User> = {
  data: { id: 1, name: "Moritz" },
  status: 200,
  message: "OK"
};`,
      },
    ],
  },
  {
    id: "3",
    slug: "nextjs",
    title: "Next.js",
    description: "Full-Stack React Framework - Routing, API Routes, SSR",
    icon: "▲",
    color: "#000000",
    category: "programmieren",
    merkblatt: "## 📋 Merkblatt: Next.js\n\n### Routing (App Router)\n- app/page.tsx = Startseite (/)\n- app/about/page.tsx = /about\n- app/[slug]/page.tsx = dynamische Routes\n\n### Server vs Client\n- Server Components (default)\n- 'use client' für Browser-Code\n\n### Wichtige Features\n- File-based Routing\n- API Routes: app/api/\n- Image Optimization: <Image />\n- ISR: revalidate = 60",
    progress: 0,
    lessons: [
      {
        id: "n1",
        title: "Einführung in Next.js",
        duration: "10 min",
        type: "text",
        content: `# Einführung in Next.js

Next.js ist ein **React Framework** für Production.

## Features

- **File-based Routing**: Ordner = Routes
- **Server-Side Rendering (SSR)**: SEO-freundlich
- **API Routes**: Backend im Frontend-Projekt
- **Static Generation (SSG)**: Blazing fast
- **Image Optimization**: Automatisch

## App Router (Next.js 13+)

\`app/\` Ordner statt \`pages/\`:

\`\`\`
app/
├── page.tsx          → /
├── about/
│   └── page.tsx      → /about
└── blog/
    ├── page.tsx      → /blog
    └── [slug]/
        └── page.tsx  → /blog/:slug
\`\`\`

## Erste Seite`,
        codeExample: `// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Willkommen bei Next.js!</h1>
      <p>Diese Seite wurde server-seitig gerendert.</p>
    </main>
  );
}

// app/about/page.tsx
export default function About() {
  return <h1>Über uns</h1>;
}`,
      },
    ],
  },
  {
    id: "4",
    slug: "mathe-ableitungen",
    title: "Mathe: Ableitungen",
    description: "Differentiationsregeln, Kettenregel, Produktregel",
    icon: "📐",
    color: "#8b5cf6",
    merkblatt: "## 📋 Merkblatt: Ableitungen\n\n### Grundregeln\n- (x^n)' = n·x^(n-1)\n- (e^x)' = e^x\n- (sin x)' = cos x\n- (cos x)' = -sin x\n- (ln x)' = 1/x\n\n### Regeln\n- Kettenregel: (f(g(x)))' = f'(g(x))·g'(x)\n- Produktregel: (f·g)' = f'·g + f·g'\n- Quotient: (f/g)' = (f'·g - f·g')/g²\n\n### Anwendung\n- Steigung der Tangente: f'(a)\n- Extremstellen: f'(x) = 0",
    category: "mathe",
    progress: 0,
    lessons: [
      {
        id: "m1",
        title: "Was ist eine Ableitung?",
        duration: "8 min",
        type: "text",
        content: `# Was ist eine Ableitung?

Die Ableitung beschreibt die **Änderungsrate** einer Funktion.

## Definition

\`f'(x) = lim(h→0) [f(x+h) - f(x)] / h\`

## Geometrische Bedeutung

- **Steigung** der Tangente am Punkt x
- **Geschwindigkeit** bei Positionsfunction
- **Wachstumsrate** bei Mengenänderung

## Notation

- \`f'(x)\` (Lagrange)
- \`df/dx\` (Leibniz)
- \`Df(x)\` (Euler)

## Beispiel

\`f(x) = x²\` → \`f'(x) = 2x\`

Bei x=3: Steigung = 2·3 = **6**`,
      },
      {
        id: "m2",
        title: "Differentiationsregeln",
        duration: "12 min",
        type: "interactive",
        content: `# Differentiationsregeln

## Potenzregel
\`(x^n)' = n · x^(n-1)\`

## Faktorregel
\`(c·f(x))' = c · f'(x)\`

## Summenregel
\`(f + g)' = f' + g'\`

## Differenzenregel
\`(f - g)' = f' - g'\`

## Beispiele`,
        codeExample: `# Potenzregel
f(x) = x^5
f'(x) = 5x^4

# Faktorregel
f(x) = 3x^2
f'(x) = 3 · 2x = 6x

# Summenregel
f(x) = x^2 + 3x + 5
f'(x) = 2x + 3

# Kombination
f(x) = 2x^3 - 4x^2 + 7x - 1
f'(x) = 6x^2 - 8x + 7`,
      },
      {
        id: "m3",
        title: "Kettenregel",
        duration: "15 min",
        type: "interactive",
        content: `# Kettenregel

Für verschachtelte Funktionen \`f(g(x))\`.

## Formel
\`[f(g(x))]' = f'(g(x)) · g'(x)\`

## Merksatz
"Ableitung außen × Ableitung innen"

## Beispiel 1
\`f(x) = (2x + 1)³\`
- Auß: \`u³\` → \`3u²\`
- Inn: \`2x + 1\` → \`2\`
- Ergebnis: \`3(2x+1)² · 2 = 6(2x+1)²\``,
        codeExample: `# Kettenregel Schritt für Schritt

f(x) = (3x - 2)^4

1. Außere Funktion: u^4
   Ableitung: 4u^3

2. Innere Funktion: 3x - 2
   Ableitung: 3

3. Zusammen:
   f'(x) = 4(3x-2)^3 · 3
   f'(x) = 12(3x-2)^3`,
      },
      {
        id: "m4",
        title: "Produktregel",
        duration: "12 min",
        type: "interactive",
        content: `# Produktregel

Für das Produkt zweier Funktionen \`f(x) · g(x)\`.

## Formel
\`[f · g]' = f' · g + f · g'\`

## Merksatz
"Erste abgeleitet × zweite + erste × zweite abgeleitet"

## Wichtig!
Nicht einfach die Ableitungen multiplizieren!

## Beispiel`,
        codeExample: `# Produktregel

f(x) = x² · sin(x)

f'(x) = (x²)' · sin(x) + x² · (sin(x))'
f'(x) = 2x · sin(x) + x² · cos(x)

# Noch ein Beispiel
f(x) = (x + 1)(x - 1)

f'(x) = 1·(x-1) + (x+1)·1
f'(x) = x - 1 + x + 1
f'(x) = 2x

# Alternative: Ausmultiplizieren
f(x) = x² - 1
f'(x) = 2x ✓`,
      },
    ],
  },
];

// Combine all modules
export const allModules: Module[] = [...modules, ...mathModules];

export function getModule(slug: string): Module | undefined {
  return allModules.find((m) => m.slug === slug);
}

export function getTotalProgress(): number {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, m) => acc + Math.floor((m.progress / 100) * m.lessons.length),
    0
  );
  return Math.round((completedLessons / totalLessons) * 100);
}
