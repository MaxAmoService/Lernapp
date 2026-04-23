import { mathModules, mathCategories, mathQuizzes, MathCategory } from "./mathData";
import { LessonVisual, InteractiveType } from "./types";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "text" | "interactive" | "quiz" | "exercises";
  content: string;
  codeExample?: string;
  visuals?: LessonVisual[];
  interactive?: InteractiveType;
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
  subCategories?: { id: string; name: string; description: string }[];
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

React ist eine **JavaScript-Bibliothek** von Meta (ehemals Facebook) für den Aufbau von Benutzeroberflächen. Stell dir vor, du baust eine Website wie ein Haus: React gibt dir vorgefertigte Bausteine (Komponenten), die du zusammensetzen kannst, statt alles von Grund auf zu mauern.

## Warum React lernen?

- **Komponenten-basiert**: Baue UIs aus wiederverwendbaren Bausteinen. Eine Navigationsleiste ist eine Komponente, die du überall einfügen kannst — ohne Code zu kopieren.
- **Virtual DOM**: React aktualisiert nur die Teile der Seite, die sich geändert haben. Das macht deine App schnell, auch wenn sich vieles gleichzeitig ändert.
- **Riesiges Ökosystem**: Tausende von Bibliotheken, Tools und Tutorials. Egal welches Problem du hast — jemand hat es schon gelöst.
- **Gefragt am Arbeitsmarkt**: React ist eines der meistgesuchten Skills in der Webentwicklung.

## React vs. Vanilla JavaScript

Mit Vanilla JavaScript musst du DOM-Elemente manuell erstellen, aktualisieren und Events verwalten. Das führt schnell zu unübersichtlichem Code. Mit React beschreibst du einfach, **wie** die Oberfläche aussehen soll — React kümmert sich um das **Wie**.

## JSX — HTML in JavaScript

JSX sieht aus wie HTML, ist aber eigentlich JavaScript. Du kannst darin Variablen, Funktionen und Logik verwenden. JSX wird von React in normale JavaScript-Aufrufe umgewandelt.

## Erste Komponente

Eine React-Komponente ist eine Funktion, die JSX zurückgibt. Der Name muss immer mit einem Großbuchstaben beginnen — das unterscheidet Komponenten von normalen HTML-Tags:`,
        codeExample: `// Eine einfache React-Komponente
// Der Name MUSS mit Großbuchstaben beginnen!
function Greeting({ name }) {
  // JSX wird zurückgegeben — sieht aus wie HTML
  // Aber {name} ist JavaScript-Code im HTML!
  return (
    <div className="greeting">
      <h1>Hallo, {name}!</h1>
      <p>Willkommen in React 🚀</p>
    </div>
  );
}

// Komponente verwenden — wie ein HTML-Tag
// Props werden als Attribute übergeben
<Greeting name="Moritz" />
// Ergebnis: <div class="greeting"><h1>Hallo, Moritz!</h1>...

// Verschachtelte Komponenten
function App() {
  return (
    <div>
      <Greeting name="Anna" />
      <Greeting name="Max" />
      <Greeting name="Lisa" />
    </div>
  );
}
// Ergebnis: Drei separate Begrüßungen, jeweils mit anderem Namen`,
      },
      {
        id: "r2",
        title: "Komponenten & Props",
        duration: "10 min",
        type: "interactive",
        interactive: "codeSandbox" as const,
        content: `# Komponenten & Props

Komponenten sind das Herzstück von React. Sie sind wiederverwendbare UI-Bausteine — wie LEGO-Steine, die du zusammensetzen kannst. Jede Komponente hat ihren eigenen Bereich und kann Daten empfangen.

## Was sind Props?

Props (Properties) sind Daten, die von einer **Eltern-Komponente an eine Kind-Komponente** übergeben werden. Stell dir Props wie Argumente einer Funktion vor: Die Eltern-Komponente "sagt" der Kind-Komponente, was sie anzeigen soll.

## Props sind read-only!

Eine Komponente darf ihre Props **niemals** verändern. Das ist eine fundamentale Regel in React. Wenn sich Daten ändern sollen, muss die Eltern-Komponente neue Props übergeben. Das macht das Verhalten der App vorhersehbar und leichter zu debuggen.

## Mehrere Props

Du kannst so viele Props übergeben wie du willst. Sie werden als Attribute im JSX-Tag geschrieben. Strings in Anführungszeichen, Zahlen und JavaScript-Ausdrücke in geschweiften Klammern.

## Beispiel: Benutzer-Karte

Hier sehen wir, wie eine Komponente mehrere Props empfängt und daraus eine strukturierte Anzeige baut:`,
        codeExample: `// Eine Komponente mit mehreren Props
// Props werden in { } destrukturiert
function UserCard({ name, email, age, role }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Alter: {age}</p>
      {/* Ternary: wenn role vorhanden, zeige es an */}
      {role && <span className="badge">{role}</span>}
    </div>
  );
}

// Komponente mit Props verwenden
<UserCard
  name="Moritz"
  email="moritz@example.com"
  age={22}
  role="Student"
/>

// Listen von Komponenten rendern
const users = [
  { id: 1, name: "Anna", email: "anna@test.de", age: 25 },
  { id: 2, name: "Max", email: "max@test.de", age: 30 },
  { id: 3, name: "Lisa", email: "lisa@test.de", age: 28 },
];

// map() erstellt für jeden User eine UserCard
// key={user.id} hilft React, Elemente zu unterscheiden
function UserList() {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}`,
      },
      {
        id: "r3",
        title: "useState Hook",
        duration: "12 min",
        type: "interactive",
        interactive: "codeSandbox" as const,
        content: `# useState Hook

Der **useState**-Hook ermöglicht es Funktionskomponenten, einen internen Zustand (State) zu verwalten. Ohne State wäre React nur eine statische HTML-Vorlage. State macht deine App interaktiv — wenn sich Daten ändern, aktualisiert sich die Oberfläche automatisch.

## Syntax

\`const [state, setState] = useState(initialValue);\`

- \`state\`: Der aktuelle Wert (liest du wie eine Variable)
- \`setState\`: Funktion zum Aktualisieren (verändert den Wert und löst einen Re-Render aus)
- \`initialValue\`: Der Startwert beim ersten Laden

## Wichtig: State-Updates sind asynchron!

Wenn du setState aufrufst, aktualisiert React nicht sofort die Variable. React sammelt Updates und führt sie gebündelt aus. Deshalb siehst du den alten Wert, wenn du direkt nach setState den State liest.

## Beispiel: Counter

Ein einfacher Zähler zeigt das Grundprinzip: Klick auf den Button → setState wird aufgerufen → React rendert die Komponente neu → der neue Wert wird angezeigt:`,
        codeExample: `import { useState } from "react";

// Ein einfacher Counter
function Counter() {
  // useState gibt [aktuellerWert, setFunktion] zurück
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Du hast {count} mal geklickt</p>
      {/* onClick ruft setCount auf, wenn der Button geklickt wird */}
      <button onClick={() => setCount(count + 1)}>
        Klick mich!
      </button>
    </div>
  );
}

// State als Objekt — z.B. ein Formular
function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Ein Handler für alle Felder
  const handleChange = (e) => {
    // Spread-Operator (...) kopiert alle bestehenden Werte
    // dann wird nur das geänderte Feld überschrieben
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Passwort"
      />
      <button type="submit">Einloggen</button>
    </form>
  );
}`,
      },
      {
        id: "r4",
        title: "useEffect Hook",
        duration: "15 min",
        type: "interactive",
        content: `# useEffect Hook

**useEffect** ist der Hook für sogenannte "Side Effects" — alles, was außerhalb des normalen Render-Ablaufs passiert. Dazu gehören: Daten von einer API laden, Timer starten, auf Fenstergröße reagieren, oder Daten im Browser speichern (localStorage).

## Syntax

\`useEffect(() => { /* code */ }, [dependencies]);\`

- **Leeres Array []**: Der Effekt läuft nur einmal beim ersten Rendern ("Mount")
- **Mit Dependencies [a, b]**: Der Effekt läuft, wenn sich a oder b ändert
- **Kein Array**: Der Effekt läuft bei JEDEM Render (meistens nicht gewollt!)

## Wann wird useEffect ausgeführt?

1. Komponente wird zum ersten Mal gerendert → Effekt läuft
2. Sich ändernde Dependencies → Effekt läuft nochmal
3. Komponente wird entfernt → Cleanup-Funktion (falls vorhanden)

## Beispiel: Daten laden und Timer

Hier sehen wir zwei typische Anwendungsfälle: API-Daten beim Laden abrufen und einen Timer, der bei jeder Sekunde aktualisiert:`,
        codeExample: `import { useState, useEffect } from "react";

// Beispiel 1: Daten von einer API laden
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // useEffect kann nicht async sein,
    // deshalb definieren wir eine async Funktion darin
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error("Fehler beim Laden!");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Neu laden, wenn sich userId ändert

  if (loading) return <p>Lädt...</p>;
  if (error) return <p>Fehler: {error}</p>;
  return <h1>{user?.name}</h1>;
}

// Beispiel 2: Timer mit Cleanup
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Timer starten — läuft jede Sekunde
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup: Timer stoppen, wenn Komponente entfernt wird
    // Ohne Cleanup läuft der Timer ewig weiter!
    return () => clearInterval(timer);
  }, []); // Leeres Array = nur einmal starten

  return <p>Vergangene Sekunden: {seconds}</p>;
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

TypeScript ist ein **Superset von JavaScript**, das statische Typen hinzufügt. Das bedeutet: Jedes gültige JavaScript-Programm ist auch gültiges TypeScript — aber TypeScript fügt eine zusätzliche Sicherheitsebene hinzu. Du schreibst weiterhin JavaScript, sagst dem Compiler aber, welche Art von Daten jede Variable, Funktion oder Komponente erwarten soll.

## Die Probleme mit reinem JavaScript

In JavaScript wird der Typ einer Variable erst zur Laufzeit geprüft. Das heißt: Ein Fehler zeigt sich erst, wenn der Code tatsächlich ausgeführt wird — möglicherweise im Browser eines Users, mitten in der Nacht. Ein Tippfehler, ein falscher Parameter, eine fehlende Eigenschaft — all das fällt erst spät auf.

## Warum TypeScript lernen?

- **Fehler sofort finden**: Der TypeScript-Compiler prüft deinen Code BEVOR er ausgeführt wird. Tippfehler, falsche Parameter, fehlende Eigenschaften — alles wird rot unterstrichen, bevor du den Browser öffnest.
- **Bessere IDE-Unterstützung**: Dank Typen weiß dein Editor genau, welche Methoden ein Objekt hat. Auto-Complete, Fehleranzeigen und Refactoring funktionieren viel besser.
- **Selbstdokumentierender Code**: Wenn du \`age: number\` siehst, weißt du sofort, dass hier eine Zahl erwartet wird. Keine Kommentare nötig.
- **Sichereres Refactoring**: Wenn du eine Funktion umbenennst oder eine Eigenschaft änderst, findet TypeScript alle Stellen, die angepasst werden müssen.
- **Teamarbeit**: TypeScript macht Code für andere (und dein zukünftiges Ich) leichter verständlich.

## TypeScript vs. JavaScript — ein Vergleich

| | JavaScript | TypeScript |
|---|---|---|
| **Typ-Prüfung** | Zur Laufzeit | Zur Compile-Zeit |
| **Fehler finden** | Im Browser/Server | Beim Schreiben im Editor |
| **Typ-Deklaration** | Keine | Explizit (string, number, ...) |
| **IDE-Support** | Basis | Hervorragend |
| **Lernaufwand** | Weniger | Mehr (aber lohnenswert) |

## Erstes Beispiel

Hier siehst du den Unterschied: In JavaScript fällt ein Typfehler erst bei der Ausführung auf. In TypeScript blockiert der Compiler den Fehler sofort:`,
        codeExample: `// ===== JavaScript =====
// Kein Fehler bis zur Ausführung!
function add(a, b) {
  return a + b;
}
console.log(add("5", 3));  // "53" — String statt Zahl!
// Das ist ein Bug, aber JavaScript sagt nichts.

// ===== TypeScript =====
// Der Compiler prüft die Typen BEVOR der Code läuft
function addTs(a: number, b: number): number {
  return a + b;
}
addTs("5", 3);  // ❌ Compile Error!
// "Argument of type 'string' is not assignable
//  to parameter of type 'number'"

// Typen für Variablen
let name: string = "Moritz";
let age: number = 22;
let isActive: boolean = true;

// name = 42;  // ❌ Fehler! 42 ist keine string

// Arrays mit Typen
let scores: number[] = [100, 95, 88];
let names: string[] = ["Anna", "Max", "Lisa"];

// Objekte mit Typen
let user: { name: string; age: number } = {
  name: "Moritz",
  age: 22,
};
// user.email = "test";  // ❌ Fehler! email existiert nicht`,
      },
      {
        id: "t2",
        title: "Interfaces & Types",
        duration: "12 min",
        type: "interactive",
        interactive: "codeSandbox" as const,
        content: `# Interfaces & Types

In TypeScript gibt es zwei Hauptmöglichkeiten, um die Struktur von Objekten zu definieren: **Interfaces** und **Type Aliases**. Beide beschreiben, welche Eigenschaften ein Objekt haben soll — aber sie haben unterschiedliche Stärken.

## Was ist ein Interface?

Ein Interface beschreibt die "Form" eines Objekts. Du legst fest, welche Eigenschaften es gibt, welche Typen sie haben und welche optional sind. Interfaces werden hauptsächlich für Objekte und Klassen verwendet und können mit \`extends\` erweitert werden.

## Was ist ein Type Alias?

Ein Type Alias ist flexibler als ein Interface. Es kann nicht nur Objekte beschreiben, sondern auch Primitive Typen, Union Types (\`string | number\`), Tupel (\`[number, string]\`) und mehr.

## Wann was verwenden?

- **Interface**: Wenn du ein Objekt beschreibst und es vielleicht erweitern willst. Perfekt für API-Antworten, Konfigurationen, Props.
- **Type**: Wenn du Union Types, Tupel oder komplexe Kombinationen brauchst.
- In der Praxis: Beides funktioniert meistens gleich. Wähle, was sich natürlicher anfühlt.

## Optionale Eigenschaften

Mit \`?\` markierst du Eigenschaften, die nicht zwingend vorhanden sein müssen. Das ist nützlich für optionale Konfigurationen oder nicht-pflichtige Formularfelder:`,
        codeExample: `// ===== Interface =====
// Beschreibt die Struktur eines Benutzer-Objekts
interface User {
  id: number;        // Pflicht-Eigenschaft
  name: string;      // Pflicht-Eigenschaft
  email: string;     // Pflicht-Eigenschaft
  age?: number;      // Optional (? = kann fehlen)
  bio?: string;      // Optional
}

// Ein User-Objekt erstellen
const user: User = {
  id: 1,
  name: "Moritz",
  email: "moritz@example.com",
  // age und bio können weggelassen werden
};

// ===== Interface erweitern =====
// Admin erbt ALLE Eigenschaften von User + eigene
interface Admin extends User {
  role: "admin" | "moderator";  // Nur diese Werte erlaubt
  permissions: string[];          // Array von Strings
}

const admin: Admin = {
  id: 2,
  name: "SuperAdmin",
  email: "admin@example.com",
  role: "admin",
  permissions: ["read", "write", "delete"],
};

// ===== Type Alias =====
// Für Primitive und Union Types
type ID = string | number;           // Entweder string ODER number
type Status = "active" | "inactive" | "banned";  // Nur diese Werte
type Coordinates = [number, number];  // Tupel: genau [Zahl, Zahl]

// Type für ein Objekt (wie Interface, aber mit type)
type Product = {
  id: ID;
  name: string;
  price: number;
  status: Status;
};

const product: Product = {
  id: "abc-123",
  name: "Laptop",
  price: 999.99,
  status: "active",
};

// ===== Praxis-Beispiel: API-Antwort =====
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const response: ApiResponse<User[]> = {
  success: true,
  data: [user],
  // error ist optional — hier weggelassen
};`,
      },
      {
        id: "t3",
        title: "Generics",
        duration: "15 min",
        type: "interactive",
        content: `# Generics

Generics (dt. "Generische Typen") sind eines der mächtigsten Features in TypeScript. Sie machen deinen Code **wiederverwendbar** UND **typsicher** — gleichzeitig. Stell dir Generics wie Schablonen vor: Du schreibst einmal einen Code-Block, und er funktioniert mit jedem Typ, den du übergibst.

## Problem ohne Generics

Ohne Generics müsstest du für jeden Typ eine eigene Funktion schreiben oder \`any\` verwenden. Mit \`any\` verlierst du aber alle Typ-Sicherheitsvorteile — der Compiler kann nicht mehr prüfen, ob dein Code korrekt ist.

## Lösung mit Generics

Mit Generics sagst du TypeScript: "Diese Funktion arbeitet mit einem Typ T, und ich sage dir bei Aufruf, was T ist." TypeScript merkt sich den Typ und prüft alles korrekt — ohne dass du mehrfach Code schreiben musst.

## Wie funktioniert \`<T>\`?

Das \`<T>\` nach dem Funktionsnamen definiert einen Platzhalter-Typ. Wenn du die Funktion aufrufst, erkennt TypeScript automatisch, welchen konkreten Typ \`T\` haben soll (z.B. \`number\` oder \`string\`). Du kannst auch mehrere Generics verwenden: \`<T, U>\`.

## Typische Anwendungsfälle

- **Arrays**: \`Array<T>\` oder \`T[]\` — eine Liste von Elementen eines beliebigen Typs
- **Promises**: \`Promise<T>\` — ein Wert, der in der Zukunft verfügbar ist
- **React useState**: \`useState<T>\` — State mit einem bestimmten Typ
- **API-Antworten**: \`ApiResponse<User>\` — generische Antwortstruktur

## Beispiel: Generische Funktionen und Interfaces

Hier sehen wir, wie Generics funktionieren — von einfachen Funktionen bis zu komplexen API-Strukturen:`,
        codeExample: `// ===== Einfache Generic-Funktion =====
// Das <T> ist ein Platzhalter für einen beliebigen Typ
// Bei Aufruf erkennt TypeScript automatisch den Typ
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// TypeScript erkennt: T = number
const num = first([1, 2, 3]);        // Type: number | undefined
// TypeScript erkennt: T = string
const str = first(["a", "b", "c"]);  // Type: string | undefined
// num.toUpperCase();  // ❌ Fehler! num ist number, nicht string

// ===== Generics mit mehreren Typen =====
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}

const p = pair("hello", 42);  // Type: [string, number]
const p2 = pair(true, [1,2]); // Type: [boolean, number[]]

// ===== Generics mit Constraints =====
// T muss eine Längen-Eigenschaft haben (string, Array, etc.)
function logLength<T extends { length: number }>(item: T): T {
  console.log("Länge:", item.length);
  return item;
}

logLength("Hallo");      // ✅ Länge: 5
logLength([1, 2, 3]);     // ✅ Länge: 3
// logLength(42);         // ❌ Fehler! number hat keine length-Eigenschaft

// ===== Generisches Interface =====
// T wird beim Verwenden festgelegt
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// T = User
const userResponse: ApiResponse<User> = {
  success: true,
  data: { id: 1, name: "Moritz", email: "moritz@example.com" },
  message: "Benutzer geladen",
};

// T = User[] (Array von Usern)
const listResponse: ApiResponse<User[]> = {
  success: true,
  data: [
    { id: 1, name: "Anna", email: "anna@test.de" },
    { id: 2, name: "Max", email: "max@test.de" },
  ],
  message: "Alle Benutzer geladen",
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

Next.js ist ein **React-Framework für Production** — entwickelt von Vercel. Während React allein nur eine Bibliothek für UI-Komponenten ist, gibt Next.js dir alles, was du für eine vollständige Web-App brauchst: Routing, Server-Rendering, API-Endpunkte, Bildoptimierung und mehr. Stell dir React als den Motor vor und Next.js als das komplette Auto.

## Was ist Server-Side Rendering (SSR)?

Bei normalem React (Client-Side Rendering, CSR) lädt der Browser eine leere HTML-Datei, dann lädt JavaScript herunter und rendert die Seite im Browser. Das hat zwei Probleme: Suchmaschinen sehen oft nur leere HTML, und der User sieht kurz eine leere Seite. Bei SSR rendert der Server die Seite und schickt fertiges HTML an den Browser. Das ist besser für SEO und schneller für den User.

## Was ist Static Site Generation (SSG)?

SSG ist wie SSR, aber die Seiten werden schon beim Build-Prozess gerendert — nicht bei jedem Request. Das macht sie extrem schnell, weil der Server nur eine fertige HTML-Datei ausliefern muss. Perfekt für Blog-Posts, Dokumentationen oder Seiten, die sich selten ändern.

## File-based Routing — Ordner sind URLs

In Next.js bestimmst du die URL-Struktur deiner App durch die Ordnerstruktur. Jede \`page.tsx\` in einem Ordner wird automatisch zu einer Seite. Keine Router-Konfiguration nötig — einfach Dateien anlegen!

\`\`\`
app/
├── page.tsx              → /
├── about/
│   └── page.tsx          → /about
├── blog/
│   ├── page.tsx          → /blog
│   └── [slug]/
│       └── page.tsx      → /blog/:slug  (dynamisch!)
└── api/
    └── users/
        └── route.ts      → /api/users (Backend!)
\`\`\`

## Server Components vs. Client Components

In Next.js 13+ (App Router) sind alle Komponenten standardmäßig **Server Components**. Das heißt, sie werden auf dem Server gerendert und senden kein JavaScript an den Browser. Brauchst du interaktive Features (useState, useEffect, onClick), fügst du \`\"use client\"\` am Anfang der Datei hinzu.

## Erste Seite mit Next.js

Hier sehen wir eine einfache Startseite und eine über-Seite — beides Server Components:`,
        codeExample: `// ===== app/page.tsx — Die Startseite =====
// Dieses File wird automatisch zur Route "/"
// Es ist ein Server Component (kein JavaScript im Browser)
export default function Home() {
  return (
    <main>
      <h1>Willkommen bei Next.js!</h1>
      <p>Diese Seite wurde auf dem Server gerendert.</p>
    </main>
  );
}

// ===== app/about/page.tsx — Über uns =====
// Wird automatisch zur Route "/about"
export default function About() {
  return (
    <main>
      <h1>Über uns</h1>
      <p>Wir lernen Next.js together! 🚀</p>
    </main>
  );
}

// ===== app/blog/[slug]/page.tsx — Dynamische Route =====
// [slug] ist ein dynamischer Parameter
// /blog/mein-erster-post → slug = "mein-erster-post"
export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <article>
      <h1>Blog-Post: {params.slug}</h1>
      <p>Inhalt des Posts...</p>
    </article>
  );
}

// ===== app/blog/page.tsx — Blog-Übersicht =====
// Links zu den einzelnen Posts
import Link from "next/link";

export default function Blog() {
  const posts = [
    { slug: "mein-erster-post", title: "Mein erster Post" },
    { slug: "nextjs-lernen", title: "Next.js lernen" },
  ];

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            {/* Link ist wie <a>, aber mit Client-Side Navigation */}
            <Link href={\`/blog/\${post.slug}\`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

// ===== Client Component (interaktiv) =====
// "use client" am Anfang = JavaScript wird im Browser geladen
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Klicks: {count}
    </button>
  );
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
