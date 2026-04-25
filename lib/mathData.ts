import { Module, QuizQuestion, LessonVisual } from "./types";

export interface MathSubCategory {
  id: string;
  name: string;
  description: string;
}

export interface MathCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  subCategories: MathSubCategory[];
}

export const mathCategories: MathCategory[] = [
  {
    id: "arithmetik-algebra",
    name: "Arithmetik & Algebra",
    icon: "🔢",
    description: "Brüche, Gleichungen, Termumformung, Ungleichungen",
    subCategories: [
      { id: "bruchrechnen", name: "Bruchrechnen", description: "Brüche, KGV, gemischte Zahlen" },
      { id: "gleichungen", name: "Gleichungen", description: "Linear, quadratisch, pq-Formel" },
      { id: "termumformung", name: "Termumformung", description: "Binomische Formeln, Distributivgesetz" },
    ],
  },
  {
    id: "geometrie",
    name: "Geometrie",
    icon: "📏",
    description: "Analytische Geometrie, Körper, Abstände",
    subCategories: [
      { id: "analytisch", name: "Analytische Geometrie", description: "Geraden, Ebenen, Abstände" },
    ],
  },
  {
    id: "grundlagen",
    name: "Grundlagen",
    icon: "🔢",
    description: "Mengenlehre, Logik, Funktionen, Potenzen & Wurzeln",
    subCategories: [
      { id: "mengen-logik", name: "Mengenlehre & Logik", description: "Mengenoperationen, logische Aussagen, Quantoren" },
      { id: "funktionen", name: "Funktionen & Graphen", description: "Definitionsbereiche, Eigenschaften, Umkehrfunktionen" },
      { id: "potenzen-logarithmen", name: "Potenzen & Logarithmen", description: "Potenzregeln, Wurzeln, Exponentialfunktionen" },
    ],
  },
  {
    id: "analysis",
    name: "Analysis",
    icon: "📊",
    description: "Grenzwerte, Ableitungen, Integration, Reihen & Potenzreihen",
    subCategories: [
      { id: "grenzwerte", name: "Grenzwerte", description: "Limes, L'Hôpital, Konvergenz" },
      { id: "differentialrechnung", name: "Differentialrechnung", description: "Ableitungen, Regeln, Anwendungen" },
      { id: "integralrechnung", name: "Integralrechnung", description: "Stammfunktionen, bestimmte Integrale" },
      { id: "reihen", name: "Reihen & Potenzreihen", description: "Konvergenz, Taylor, Maclaurin" },
    ],
  },
  {
    id: "lineare-algebra",
    name: "Lineare Algebra",
    icon: "↔️",
    description: "Vektoren, Matrizen, Lineare Gleichungssysteme",
    subCategories: [
      { id: "vektoren", name: "Vektoren", description: "Vektorrechnung, Skalar- und Kreuzprodukt" },
      { id: "matrizen", name: "Matrizen", description: "Matrixrechnung, Determinanten, inverse Matrizen" },
    ],
  },
  {
    id: "geometrie-trigonometrie",
    name: "Geometrie & Trigonometrie",
    icon: "📐",
    description: "Flächen, Körper, Trigonometrie, Analytische Geometrie",
    subCategories: [
      { id: "flaechen", name: "Flächeninhalte", description: "Rechteck, Dreieck, Kreis, Trapez" },
      { id: "koerper", name: "Körper & Volumen", description: "Quader, Kugel, Zylinder, Kegel" },
      { id: "trigonometrie", name: "Trigonometrie", description: "Sinus, Kosinus, Tangens, Einheitskreis" },
    ],
  },
  {
    id: "stochastik",
    name: "Stochastik",
    icon: "🎲",
    description: "Wahrscheinlichkeitsrechnung, Kombinatorik, Statistik",
    subCategories: [
      { id: "wahrscheinlichkeit", name: "Wahrscheinlichkeitsrechnung", description: "Grundbegriffe, bedingte Wahrscheinlichkeit, Bayes" },
      { id: "kombinatorik", name: "Kombinatorik", description: "Permutationen, Variationen, Kombinationen" },
      { id: "statistik", name: "Statistik", description: "Mittelwert, Varianz, Standardabweichung, Quartile" },
    ],
  },
  {
    id: "komplexe-numerik",
    name: "Komplexe Zahlen & Numerik",
    icon: "🌀",
    description: "Komplexe Zahlen, Numerische Verfahren",
    subCategories: [
      { id: "komplexe-zahlen", name: "Komplexe Zahlen", description: "Rechenregeln, Betrag, Polardarstellung" },
      { id: "numerik", name: "Numerische Verfahren", description: "Fehler, Bisektion, Newton-Verfahren" },
    ],
  },
  {
    id: "differentialgleichungen",
    name: "Differentialgleichungen",
    icon: "📈",
    description: "DGln 1. und 2. Ordnung",
    subCategories: [
      { id: "dgl-1", name: "DGln 1. Ordnung", description: "Trennbare Variablen, Integrationsfaktor" },
      { id: "dgl-2", name: "DGln 2. Ordnung", description: "Charakteristik, homogen, inhomogen" },
    ],
  },
];

export const mathModules: Module[] = [
  {
    id: "m-grundlagen-mengen",
    slug: "mathe-mengenlehre",
    title: "Mengenlehre & Logik",
    description: "Grundlagen der Mengen und mathematischen Logik",
    icon: "🔢",
    color: "#8b5cf6",
    category: "grundlagen",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Mengenlehre & Logik

### Mengen-Operationen
| Operation | Symbol | Beschreibung |
|-----------|--------|---------------|
| Vereinigung | $A \\cup B$ | Alle Elemente in A oder B |
| Schnitt | $A \\cap B$ | Nur Elemente in A und B |
| Differenz | $A \\setminus B$ | In A, aber nicht in B |
| Komplement | $\\bar{A}$ | Alles außerhalb A |

### Wichtige Formeln
- **Satz von Bernoulli:** $|A \\cup B| = |A| + |B| - |A \\cap B|$
- **De Morgan:** $\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}$

### Logik
- **Implikation:** $P \\rightarrow Q$ nur falsch bei Wahr → Falsch
- **Kontraposition:** $(P \\rightarrow Q) \\equiv (\\neg Q \\rightarrow \\neg P)$
- **Quantoren:** $\\forall$ (alle), $\\exists$ (existiert)` ,
    lessons: [
      {
        id: "mg1",
        title: "Mengen & Mengenoperationen",
        duration: "15 min",
        type: "interactive",
        content: `# Mengen & Mengenoperationen

---


## Definition einer Menge

Eine Menge ist eine Zusammenfassung bestimmter, unterscheidbarer Objekte zu einem Ganzen.

## Mengenschreibweisen

- **Aufzählung**: $A = \\{1, 2, 3, 4, 5\\}$
- **Eigenschaft**: $B = \\{x \\in \\mathbb{N} \\mid x < 10\\}$
- **Intervalle**: $[a, b] = \\{x \\in \\mathbb{R} \\mid a \\leq x \\leq b\\}$

## Wichtige Mengen

| Symbol | Menge |
|--------|-------|
| $\\mathbb{N}$ | Natürliche Zahlen |
| $\\mathbb{Z}$ | Ganze Zahlen |
| $\\mathbb{Q}$ | Rationale Zahlen |
| $\\mathbb{R}$ | Reelle Zahlen |
| $\\mathbb{C}$ | Komplexe Zahlen |

## Mengenoperationen

- **Vereinigung**: $A \\cup B = \\{x \\mid x \\in A \\text{ oder } x \\in B\\}$
- **Schnittmenge**: $A \\cap B = \\{x \\mid x \\in A \\text{ und } x \\in B\\}$
- **Differenz**: $A \\setminus B = \\{x \\mid x \\in A \\text{ und } x \\notin B\\}$
- **Komplement**: $\\bar{A} = U \\setminus A$`,
      },
      {
        id: "mg2",
        title: "Logische Aussagen",
        duration: "12 min",
        type: "interactive",
        content: `# Logische Aussagen

## Wahrheitstafeln

### UND ($\\land$)
$P \\land Q$ ist wahr, wenn beide wahr sind.

### ODER ($\\lor$)
$P \\lor Q$ ist wahr, wenn mindestens eine wahr ist.

### NICHT ($\\neg$)
$\\neg P$ invertiert den Wahrheitswert.

### IMPLIKATION ($\\rightarrow$)
$P \\rightarrow Q$ ist nur falsch, wenn P wahr und Q falsch.

## Äquivalenzen

- **Kontraposition**: $(P \\rightarrow Q) \\equiv (\\neg Q \\rightarrow \\neg P)$
- **De Morgan**: $\\neg(P \\land Q) \\equiv (\\neg P \\lor \\neg Q)$
- **Distributiv**: $P \\land (Q \\lor R) \\equiv (P \\land Q) \\lor (P \\land R)$`,
      },
      {
        id: "mg3",
        title: "Quantoren",
        duration: "10 min",
        type: "interactive",
        content: `# Quantoren

---

## Allquantor ($\\forall$)

"Ausgesagt für alle x gilt..."

$\\forall x \\in \\mathbb{R}: x^2 \\geq 0$

## Existenzquantor ($\\exists$)

"Es existiert mindestens ein x, sodass..."

$\\exists x \\in \\mathbb{R}: x^2 = 4$

## Eindeutigkeitsquantor ($\\exists!$)

"Es existiert genau ein x, sodass..."

$\\exists! x \\in \\mathbb{R}: x + 2 = 5$

## Negation von Quantoren

- $\\neg(\\forall x: P(x)) \\equiv \\exists x: \\neg P(x)$
- $\\neg(\\exists x: P(x)) \\equiv \\forall x: \\neg P(x)$`,
      },
      {
        id: "mg4",
        title: "Quiz: Mengenlehre",
        duration: "8 min",
        type: "quiz",
        content: "Teste dein Wissen über Mengenlehre und Logik!",
      },
      {
        id: "m-grundlagen-mengen-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },
  {
    id: "m-grundlagen-funktionen",
    slug: "mathe-funktionen",
    title: "Funktionen & Graphen",
    description: "Funktionen, Graphen und Eigenschaften",
    icon: "📉",
    color: "#8b5cf6",
    category: "grundlagen",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Funktionen & Graphen\n\n### 🎯 Wichtige Funktionen\n\n| Typ | Formel | Beispiel |\n|-----|--------|----------|\n| **Linear** | $f(x) = mx + b$ | $2x + 3$ |\n| **Quadratisch** | $f(x) = ax^2 + bx + c$ | $x^2 - 4$ |\n| **Potenz** | $f(x) = x^n$ | $x^3$ |\n| **Wurzel** | $f(x) = \\sqrt{x}$ | $\\sqrt{x+1}$ |\n| **Exponential** | $f(x) = a^x$ | $2^x$ |\n| **Logarithmus** | $f(x) = \\log_a x$ | $\\ln x$ |\n\n### 📐 Eigenschaften\n\n| Eigenschaft | Definition |\n|-------------|------------|\n| **Gerade** | $f(-x) = f(x)$ (achsensymmetrisch) |\n| **Ungerade** | $f(-x) = -f(x)$ (punktsymmetrisch) |\n| **Monoton** | $x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$ |\n| **Beschränkt** | $|f(x)| \\leq M$ |\n\n### 💡 Umkehrfunktion\n- $f^{-1}(f(x)) = x$\n- Grafisch: Spiegelung an $y = x$\n- Existiert nur, wenn $f$ bijektiv ist` ,
    lessons: [
      {
        id: "mf1",
        title: "Funktionen & Definitionsbereiche",
        duration: "15 min",
        type: "interactive",
        interactive: "functionExplorer" as const,
        visuals: [
          { type: "functionGraph" as const, props: { fn: (x: number) => x * x - 2, xRange: [-3, 3], yRange: [-3, 7], label: "f(x) = x² - 2", points: [{ x: 0, y: -2, label: "(0, -2)" }] } },
        ],
        content: `# Funktionen & Definitionsbereiche

## Definition

Eine Funktion $f: D \\rightarrow Y$ ordnet jedem Element aus dem Definitionsbereich $D$ genau ein Element aus dem Zielbereich $Y$ zu.

## Schreibweisen

- $f(x) = x^2 + 1$
- $f: \\mathbb{R} \\rightarrow \\mathbb{R}, x \\mapsto x^2 + 1$

## Wichtige Funktionen

### Polynomfunktionen
$f(x) = a_n x^n + a_{n-1} x^{n-1} + \\ldots + a_1 x + a_0$

### Rationalfunktionen
$f(x) = \\frac{p(x)}{q(x)}$, wobei $q(x) \\neq 0$

### Wurzelfunktionen
$f(x) = \\sqrt[n]{x}$ für $x \\geq 0$ (bei geradem n)

## Definitionsbereich bestimmen

- **Nenner**: $\\neq 0$
- **Wurzel**: Argument $\\geq 0$ (bei geradem Index)
- **Logarithmus**: Argument $> 0$`,
      },
      {
        id: "mf2",
        title: "Funktionseigenschaften",
        duration: "18 min",
        type: "interactive",
        content: `# Funktionseigenschaften

## Monotonie

Eine Funktion $f$ ist:
- **Monoton steigend**: $x_1 < x_2 \\Rightarrow f(x_1) \\leq f(x_2)$
- **Streng monoton steigend**: $x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$
- **Monoton fallend**: $x_1 < x_2 \\Rightarrow f(x_1) \\geq f(x_2)$

## Stetigkeit

$f$ ist stetig in $a$, wenn:
$\\lim_{x \\to a} f(x) = f(a)$

## Symmetrie

- **Gerade Funktion**: $f(-x) = f(x)$ (achsensymmetrisch)
- **Ungerade Funktion**: $f(-x) = -f(x)$ (punktsymmetrisch)

## Umkehrfunktion

$f$ ist umkehrbar, wenn $f$ bijektiv ist.
Die Umkehrfunktion $f^{-1}$ gilt: $f^{-1}(f(x)) = x$`,
      },
      {
        id: "mf3",
        title: "Quiz: Funktionen",
        duration: "8 min",
        type: "quiz",
        content: "Teste dein Wissen über Funktionen!",
      },
      {
        id: "m-grundlagen-funktionen-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },
  {
    id: "m1-grenzwerte",
    slug: "mathe1-grenzwerte",
    title: "Grenzwerte",
    merkblatt: `## 📋 Merkblatt: Grenzwerte\n\n### 🎯 Wichtige Grenzwerte\n\n| Grenzwert | Wert |\n|-----------|------|\n| $\\lim_{x \\to 0} \\frac{\\sin x}{x}$ | $1$ |\n| $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x}$ | $0$ |\n| $\\lim_{x \\to \\infty} (1 + \\frac{1}{x})^x$ | $e$ |\n| $\\lim_{x \\to 0} \\frac{e^x - 1}{x}$ | $1$ |\n| $\\lim_{x \\to 0} \\frac{\\ln(1+x)}{x}$ | $1$ |\n\n### 📐 L'Hôpital'sche Regel\n\nBei $\\frac{0}{0}$ oder $\\frac{\\infty}{\\infty}$:\n\n$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$$\n\n### 💡 Merke\n- Immer **L'Hôpital** versuchen bei $\\frac{0}{0}$\n- Grenzwerte können $\\pm\\infty$ sein\n- **Squeeze Theorem:** $f(x) \\leq g(x) \\leq h(x)$ und $\\lim f = \\lim h \\Rightarrow \\lim g = \\lim f`,
    description: "Grenzwerte und stetige Fortsetzung",
    icon: "🎯",
    color: "#10b981",
    category: "analysis",
    progress: 0,
    lessons: [
      {
        id: "m1g1",
        title: "Grenzwerte von Funktionen",
        duration: "20 min",
        type: "interactive",
        visuals: [
          { type: "functionGraph" as const, props: { fn: (x: number) => x === 0 ? 1 : Math.sin(x) / x, xRange: [-6, 6], yRange: [-0.5, 1.5], label: "sin(x)/x", points: [{ x: 0, y: 1, label: "lim = 1" }] } },
        ],
        content: `# Grenzwerte von Funktionen

## Definition

$\\lim_{x \\to a} f(x) = L$ bedeutet:
Für jedes $\\varepsilon > 0$ gibt es ein $\\delta > 0$, sodass für alle $x$ mit $0 < |x - a| < \\delta$ gilt: $|f(x) - L| < \\varepsilon$

## Rechenregeln

Seien $\\lim_{x \\to a} f(x) = L$ und $\\lim_{x \\to a} g(x) = M$, dann:

| Regel | Formel |
|-------|--------|
| Summe | $\\lim_{x \\to a} [f(x) + g(x)] = L + M$ |
| Produkt | $\\lim_{x \\to a} [f(x) \\cdot g(x)] = L \\cdot M$ |
| Quotient | $\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{L}{M}$ (wenn $M \\neq 0$) |
| Potenz | $\\lim_{x \\to a} [f(x)]^n = L^n$ |

## Wichtige Grenzwerte

- $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$
- $\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e$
- $\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$`,
      },
      {
        id: "m1g2",
        title: "L'Hôpital's Regel",
        duration: "15 min",
        type: "interactive",
        content: `# L'Hôpital's Regel

## Anwendung

Bei $\\frac{0}{0}$ oder $\\frac{\\infty}{\\infty}$:

$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$

## Voraussetzungen

1. $\\lim_{x \\to a} f(x) = 0$ und $\\lim_{x \\to a} g(x) = 0$ (oder beide $\\to \\infty$)
2. $f$ und $g$ sind differenzierbar in einer Umgebung von $a$
3. $g'(x) \\neq 0$ in der Umgebung (außer evtl. bei $a$)

## Beispiel

$\\lim_{x \\to 0} \\frac{\\sin x}{x} = \\lim_{x \\to 0} \\frac{\\cos x}{1} = 1$`,
      },
      {
        id: "m1g3",
        title: "Quiz: Grenzwerte",
        duration: "10 min",
        type: "quiz",
        content: "Teste dein Wissen über Grenzwerte!",
      },
      {
        id: "m1-grenzwerte-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },
  {
    id: "m1-ableitungen",
    slug: "mathe1-ableitungen",
    title: "Differentialrechnung",
    merkblatt: `## 📋 Merkblatt: Differentialrechnung\n\n### 🎯 Grundableitungen\n\n| $f(x)$ | $f'(x)$ |\n|--------|----------|\n| $x^n$ | $n \\cdot x^{n-1}$ |\n| $e^x$ | $e^x$ |\n| $a^x$ | $a^x \\cdot \\ln(a)$ |\n| $\\sin x$ | $\\cos x$ |\n| $\\cos x$ | $-\\sin x$ |\n| $\\ln x$ | $\\frac{1}{x}$ |\n\n### 📐 Ableitungsregeln\n\n| Regel | Formel |\n|-------|--------|\n| **Kettenregel** | $(f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)$ |\n| **Produktregel** | $(f \\cdot g)' = f' \\cdot g + f \\cdot g'$ |\n| **Quotient** | $(\\frac{f}{g})' = \\frac{f' \\cdot g - f \\cdot g'}{g^2}$ |\n\n### 💡 Anwendungen\n- **Tangentengleichung:** $y = f(a) + f'(a)(x - a)$\n- **Extremstellen:** $f'(x_0) = 0$\n- **Hinreichend:** $f''(x_0) > 0$ Min, $f''(x_0) < 0$ Max`,
    description: "Ableitungen, Regeln und Anwendungen",
    icon: "📐",
    color: "#8b5cf6",
    category: "analysis",
    progress: 0,
    lessons: [
      {
        id: "m1a1",
        title: "Definition der Ableitung",
        duration: "15 min",
        type: "interactive",
        interactive: "tangentExplorer" as const,
        visuals: [
          { type: "functionGraph" as const, props: { fn: (x: number) => x * x, xRange: [-3, 4], yRange: [-1, 10], label: "f(x) = x²", tangent: { x: 2, slope: 4, label: "f'(2) = 4" }, points: [{ x: 2, y: 4, label: "(2, 4)" }] } },
        ],
        content: `# Definition der Ableitung

## Differenzenquotient

$\\frac{f(x+h) - f(x)}{h}$

## Ableitung (Differentialquotient)

$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$

## Notation

- $f'(x)$ (Lagrange)
- $\\frac{df}{dx}$ oder $\\frac{d}{dx}f(x)$ (Leibniz)
- $Df(x)$ (Operator)
- $\\dot{x}$ (Newton, für Zeit)

## Geometrische Bedeutung

Die Ableitung $f'(a)$ gibt die **Steigung der Tangente** an der Stelle $a$.`,
      },
      {
        id: "m1a2",
        title: "Ableitungsregeln",
        duration: "20 min",
        type: "interactive",
        content: `# Ableitungsregeln

## Grundregeln

| Funktion | Ableitung |
|----------|-----------|
| $c$ (Konstante) | $0$ |
| $x^n$ | $n \\cdot x^{n-1}$ |
| $e^x$ | $e^x$ |
| $\\ln x$ | $\\frac{1}{x}$ |
| $\\sin x$ | $\\cos x$ |
| $\\cos x$ | $-\\sin x$ |

## Kettenregel

$(f(g(x)))' = f'(g(x)) \\cdot g'(x)$

## Produktregel

$(f \\cdot g)' = f' \\cdot g + f \\cdot g'$

## Quotientenregel

$\\left(\\frac{f}{g}\\right)' = \\frac{f' \\cdot g - f \\cdot g'}{g^2}$`,
      },
      {
        id: "m1a3",
        title: "Quiz: Ableitungen",
        duration: "10 min",
        type: "quiz",
        content: "Teste dein Wissen über Ableitungen!",
      },
      {
        id: "m1-ableitungen-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },
  {
    id: "m1-integration",
    slug: "mathe1-integration",
    title: "Integralrechnung",
    merkblatt: `## 📋 Merkblatt: Integralrechnung\n\n### 🎯 Stammfunktionen\n\n| $f(x)$ | $\\int f(x) \\,dx$ |\n|--------|------------------|\n| $x^n$ | $\\frac{x^{n+1}}{n+1}$ |\n| $\\frac{1}{x}$ | $\\ln|x|$ |\n| $e^x$ | $e^x$ |\n| $\\sin x$ | $-\\cos x$ |\n| $\\cos x$ | $\\sin x$ |\n| $\\frac{1}{x^2+1}$ | $\\arctan x$ |\n\n### 📐 Hauptsatz der Differential- und Integralrechnung\n\n$$\\int_a^b f(x) \\,dx = F(b) - F(a)$$\n\n### 💡 Techniken\n- **Substitution:** $u = g(x) \\Rightarrow du = g'(x)dx$\n- **Partielle Integration:** $\\int u \\,dv = uv - \\int v \\,du$\n- **Partialbruch:** Für rationale Funktionen`,
    description: "Stammfunktionen und bestimmte Integrale",
    icon: "∫",
    color: "#f59e0b",
    category: "analysis",
    progress: 0,
    lessons: [
      {
        id: "m1i1",
        title: "Stammfunktionen",
        duration: "18 min",
        type: "interactive",
        interactive: "integralExplorer" as const,
        visuals: [
          { type: "functionGraph" as const, props: { fn: (x: number) => x * x, xRange: [-1, 3], yRange: [-1, 10], label: "f(x) = x²", fillArea: { from: 0, to: 2, color: "rgba(129,140,248,0.3)", label: "∫₀² x² dx" } } },
        ],
        content: `# Stammfunktionen

## Definition

$F$ ist Stammfunktion von $f$, wenn $F'(x) = f(x)$.

## Unbestimmtes Integral

$\\int f(x) \\, dx = F(x) + C$

## Wichtige Stammfunktionen

| Funktion | Stammfunktion |
|----------|---------------|
| $x^n$ | $\\frac{x^{n+1}}{n+1} + C$ ($n \\neq -1$) |
| $\\frac{1}{x}$ | $\\ln|x| + C$ |
| $e^x$ | $e^x + C$ |
| $\\sin x$ | $-\\cos x + C$ |
| $\\cos x$ | $\\sin x + C$ |

## Substitutionsregel

$\\int f(g(x)) \\cdot g'(x) \\, dx = \\int f(u) \\, du$ mit $u = g(x)$`,
      },
      {
        id: "m1i2",
        title: "Bestimmtes Integral",
        duration: "20 min",
        type: "interactive",
        content: `# Bestimmtes Integral

## Hauptsatz der Analysis

$\\int_a^b f(x) \\, dx = F(b) - F(a)$

## Geometrische Bedeutung

Das bestimmte Integral gibt die **Fläche** unter der Kurve (mit Vorzeichen).

## Eigenschaften

- $\\int_a^b f(x) \\, dx = -\\int_b^a f(x) \\, dx$
- $\\int_a^b [f(x) + g(x)] \\, dx = \\int_a^b f(x) \\, dx + \\int_a^b g(x) \\, dx$
- $\\int_a^b c \\cdot f(x) \\, dx = c \\cdot \\int_a^b f(x) \\, dx$

## Teilungsregel

$\\int u \\, dv = uv - \\int v \\, du$`,
      },
      {
        id: "m1i3",
        title: "Quiz: Integration",
        duration: "10 min",
        type: "quiz",
        content: "Teste dein Wissen über Integration!",
      },
      {
        id: "m1-integration-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },
  {
    id: "m1-reihen",
    slug: "mathe1-reihen",
    title: "Reihen & Potenzreihen",
    merkblatt: `## 📋 Merkblatt: Reihen & Potenzreihen\n\n### 🎯 Konvergenzkriterien\n\n| Kriterium | Bedingung |\n|-----------|-----------|\n| **Quotienten** | $q = \\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right| < 1$ |\n| **Wurzel** | $\\sqrt[n]{|a_n|} < 1$ |\n| **Vergleich** | $0 \\leq a_n \\leq b_n$ und $\\sum b_n$ konv. |\n\n### 📐 Wichtige Reihen\n\n| Reihe | Summe |\n|-------|-------|\n| $\\sum_{n=0}^{\\infty} x^n = \\frac{1}{1-x}$ | $|x| < 1$ |\n| $e^x = \\sum \\frac{x^n}{n!}$ | $\\forall x$ |\n| $\\sin x = \\sum \\frac{(-1)^n x^{2n+1}}{(2n+1)!}$ | $\\forall x$ |\n| $\\cos x = \\sum \\frac{(-1)^n x^{2n}}{(2n)!}$ | $\\forall x$ |\n\n### 💡 Taylor-Entwicklung\n$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n$$`,
    description: "Unendliche Reihen und Konvergenz",
    icon: "∞",
    color: "#ec4899",
    category: "analysis",
    progress: 0,
    lessons: [
      {
        id: "m1r1",
        title: "Reihen & Konvergenz",
        duration: "18 min",
        type: "interactive",
        content: `# Reihen & Konvergenz

## Definition

Eine Reihe ist die Summe einer Folge:
$\\sum_{n=1}^{\\infty} a_n = a_1 + a_2 + a_3 + \\ldots$

## Konvergenzkriterien

### Vorzeichenkriterium (Leibniz)
Bei alternierenden Reihen: $a_n \\cdot a_{n+1} < 0$ und $|a_{n+1}| \\leq |a_n|$ und $\\lim_{n \\to \\infty} a_n = 0$

### Vergleichskriterium
Wenn $0 \\leq a_n \\leq b_n$ und $\\sum b_n$ konvergiert, dann konvergiert auch $\\sum a_n$.

### Quotientenkriterium
$\\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right| = q$
- $q < 1$: konvergent
- $q > 1$: divergent
- $q = 1$: kein Ergebnis`,
      },
      {
        id: "m1r2",
        title: "Potenzreihen",
        duration: "15 min",
        type: "interactive",
        content: `# Potenzreihen

## Definition

$\\sum_{n=0}^{\\infty} a_n (x - a)^n = a_0 + a_1(x-a) + a_2(x-a)^2 + \\ldots$

## Konvergenzradius

$R = \\lim_{n \\to \\infty} \\left|\\frac{a_n}{a_{n+1}}\\right|$

## Wichtige Reihen

### Taylor-Reihen
$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x-a)^n$

### Maclaurin-Reihen (a=0)
- $e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$
- $\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!}$
- $\\cos x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!}$`,
      },
      {
        id: "m1r3",
        title: "Quiz: Reihen",
        duration: "8 min",
        type: "quiz",
        content: "Teste dein Wissen über Reihen!",
      },
      {
        id: "m1-reihen-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },
  {
    id: "m2-vektoren",
    slug: "mathe2-vektoren",
    title: "Vektoren & Lineare Algebra",
    merkblatt: `## 📋 Merkblatt: Vektoren & Lineare Algebra\n\n### 🎯 Skalarprodukt\n\n$$\\vec{a} \\cdot \\vec{b} = a_1b_1 + a_2b_2 + a_3b_3 = |\\vec{a}||\\vec{b}|\\cos\\alpha$$\n\n| Eigenschaft | Bedingung |\n|-------------|-----------|\n| **Orthogonal** | $\\vec{a} \\cdot \\vec{b} = 0$ |\n| **Parallel** | $\\vec{a} = \\lambda \\vec{b}$ |\n| **Betrag** | $|\\vec{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2}$ |\n\n### 📐 Kreuzprodukt\n\n$$\\vec{a} \\times \\vec{b} = \\begin{pmatrix} a_2b_3 - a_3b_2 \\\\ a_3b_1 - a_1b_3 \\\\ a_1b_2 - a_2b_1 \\end{pmatrix}$$\n\n- **Betrag:** $|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\alpha$\n- **Richtung:** Rechtwinklig zu $\\vec{a}$ und $\\vec{b}$\n\n### 💡 Ebene & Gerade\n- **Ebenengleichung:** $\\vec{n} \\cdot (\\vec{x} - \\vec{p}) = 0$\n- **Gerade:** $\\vec{x} = \\vec{p} + t \\cdot \\vec{v}$`,
    description: "Vektoren, Matrizen und Lineare Gleichungssysteme",
    icon: "↔",
    color: "#06b6d4",
    category: "lineare-algebra",
    progress: 0,
    lessons: [
      {
        id: "m2v1",
        title: "Vektoren im Raum",
        duration: "18 min",
        type: "interactive",
        interactive: "vectorExplorer" as const,
        visuals: [
          { type: "coordinate2d" as const, props: { vectors: [{ x: 3, y: 2, label: "a⃗", color: "#818cf8" }, { x: 1, y: 4, label: "b⃗", color: "#f472b6" }] } },
          { type: "coordinate3d" as const, props: { vectors: [{ x: 2, y: 1, z: 3, label: "v⃗", color: "#f59e0b" }] } },
        ],
        content: `# Vektoren im Raum

## Definition

$\\vec{v} = \\begin{pmatrix} v_1 \\\\ v_2 \\\\ v_3 \\end{pmatrix} \\in \\mathbb{R}^3$

## Operationen

### Addition
$\\vec{u} + \\vec{v} = \\begin{pmatrix} u_1 + v_1 \\\\ u_2 + v_2 \\\\ u_3 + v_3 \\end{pmatrix}$

### Skalarmultiplikation
$\\lambda \\vec{v} = \\begin{pmatrix} \\lambda v_1 \\\\ \\lambda v_2 \\\\ \\lambda v_3 \\end{pmatrix}$

### Skalarprodukt
$\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2 + u_3 v_3 = |\\vec{u}| |\\vec{v}| \\cos \\alpha$

### Kreuzprodukt
$\\vec{u} \\times \\vec{v} = \\begin{pmatrix} u_2 v_3 - u_3 v_2 \\\\ u_3 v_1 - u_1 v_3 \\\\ u_1 v_2 - u_2 v_1 \\end{pmatrix}$`,
      },
      {
        id: "m2v2",
        title: "Matrizen",
        duration: "20 min",
        type: "interactive",
        content: `# Matrizen

## Definition

$A = \\begin{pmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{pmatrix} \\in \\mathbb{R}^{m \\times n}$

## Matrixmultiplikation

$(AB)_{ij} = \\sum_{k=1}^{n} a_{ik} b_{kj}$

## Wichtige Matrizen

- **Einheitsmatrix**: $I_n$ (Diagonale = 1)
- **Nullmatrix**: $0_{m \\times n}$ (Alle Einträge = 0)
- **Transponierte**: $(A^T)_{ij} = a_{ji}$

## Determinante (2×2)

$\\det(A) = a_{11} a_{22} - a_{12} a_{21}$

## Inverse Matrix

$A \\cdot A^{-1} = I$`,
      },
      {
        id: "m2v3",
        title: "Quiz: Vektoren & Matrizen",
        duration: "10 min",
        type: "quiz",
        content: "Teste dein Wissen über Vektoren und Matrizen!",
      },
      {
        id: "m2-vektoren-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },
  {
    id: "m2-dgl",
    slug: "mathe2-dgl",
    title: "Differentialgleichungen",
    merkblatt: `## 📋 Merkblatt: Differentialgleichungen\n\n### 🎯 Homogene DGL 2. Ordnung\n\n$$ay'' + by' + cy = 0$$\n\n**Charakteristische Gleichung:** $ar^2 + br + c = 0$\n\n### 📐 Lösungen\n\n| Fall | Lösung |\n|------|--------|\n| **2 reelle** $r_1 \\neq r_2$ | $y = C_1e^{r_1x} + C_2e^{r_2x}$ |\n| **Doppelte** $r_1 = r_2 = r$ | $y = (C_1 + C_2x)e^{rx}$ |\n| **Komplexe** $r = \\alpha \\pm \\beta i$ | $y = e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$ |\n\n### 💡 Nicht-homogen\n$$ay'' + by' + cy = f(x)$$\n\n**Lösung:** $y = y_h + y_p$ (homogen + partikulär)\n\n- **Bestimmung:** Partikuläre Lösung raten oder Variation der Konstanten`,
    description: "Gewöhnliche Differentialgleichungen 1. und 2. Ordnung",
    icon: "dy/dx",
    color: "#ef4444",
    category: "differentialgleichungen",
    progress: 0,
    lessons: [
      {
        id: "m2d1",
        title: "DGln 1. Ordnung",
        duration: "20 min",
        type: "interactive",
        content: `# Differentialgleichungen 1. Ordnung

## Typen

### Trennbare Variablen
$\\frac{dy}{dx} = f(x) \\cdot g(y)$
Lösung: $\\int \\frac{dy}{g(y)} = \\int f(x) \\, dx$

### Linear
$y' + p(x) \\cdot y = q(x)$
Lösung mit Integrationsfaktor: $\\mu(x) = e^{\\int p(x) \\, dx}$

## Lösungsansätze

1. **Trennung der Variablen**
2. **Integrationsfaktor**
3. **Substitution**
4. **Variation der Konstanten**`,
      },
      {
        id: "m2d2",
        title: "DGln 2. Ordnung",
        duration: "22 min",
        type: "interactive",
        content: `# Differentialgleichungen 2. Ordnung

## Homogene lineare DGln

$ay'' + by' + cy = 0$

### Charakteristische Gleichung
$ar^2 + br + c = 0$

### Fälle:
1. **Zwei reelle Wurzeln** $r_1 \\neq r_2$: $y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$
2. **Doppelte Wurzel** $r_1 = r_2 = r$: $y = (C_1 + C_2 x) e^{rx}$
3. **Komplexe Wurzeln** $r_{1,2} = \\alpha \\pm i\\beta$: $y = e^{\\alpha x}(C_1 \\cos(\\beta x) + C_2 \\sin(\\beta x))$

## Inhomogene DGln

$ay'' + by' + cy = f(x)$

Lösung: $y = y_h + y_p$ (homogene + partikuläre Lösung)`,
      },
      {
        id: "m2d3",
        title: "Quiz: Differentialgleichungen",
        duration: "10 min",
        type: "quiz",
        content: "Teste dein Wissen über Differentialgleichungen!",
      },
      {
        id: "m2-dgl-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },

  // =============== STOCHASTIK ===============
  {
    id: "m-stochastik-grundlagen",
    slug: "mathe-stochastik",
    title: "Wahrscheinlichkeitsrechnung",
    description: "Grundlagen der Stochastik und Wahrscheinlichkeit",
    icon: "🎲",
    color: "#f59e0b",
    category: "stochastik",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Wahrscheinlichkeitsrechnung

### 🎯 Grundbegriffe
- **Zufallsexperiment:** Experiment mit zufälligem Ausgang
- **Ergebnisraum Ω:** Menge aller möglichen Ergebnisse
- **Ereignis:** Teilmenge von Ω

### 📐 Wahrscheinlichkeit
$$P(A) = \\frac{|A|}{|\\Omega|}$$

**Eigenschaften:**
- $0 \\leq P(A) \\leq 1$
- $P(\\Omega) = 1$
- $P(\\emptyset) = 0$

### 💡 Formeln
| Regel | Formel |
|-------|--------|
| Addition | $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ |
| Komplement | $P(\\bar{A}) = 1 - P(A)$ |
| Bedingt | $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ |`,
    lessons: [
      {
        id: "m-sto-1",
        title: "Grundbegriffe der Wahrscheinlichkeit",
        duration: "20 min",
        type: "text",
        content: `## Zufallsexperimente

Ein **Zufallsexperiment** ist ein Experiment, dessen Ausgang nicht vorhersehbar ist.

**Beispiele:**
- Münzwurf: $\\Omega = \{K, Z\}$
- Würfelwurf: $\\Omega = \{1, 2, 3, 4, 5, 6\}$
- Kartenziehen: $\\Omega = \{\\text{Herz}, \\text{Karo}, \\text{Kreuz}, \\text{Pik}\}$

## Wahrscheinlichkeit

$$P(A) = \\frac{\\text{günstige Ergebnisse}}{\\text{alle Ergebnisse}}$$

**Beispiel:** Beim Würfelwurf ist die Wahrscheinlichkeit für eine gerade Zahl:
$$P(\\text{gerade}) = \\frac{3}{6} = \\frac{1}{2}$$

## Additionssatz

$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$

Bei **disjunkten** Ereignissen ($A \\cap B = \\emptyset$):
$$P(A \\cup B) = P(A) + P(B)$$

## Komplementregel

$$P(\\bar{A}) = 1 - P(A)$$

**Beispiel:** Die Wahrscheinlichkeit, keine 6 zu würfeln:
$$P(\\text{keine 6}) = 1 - P(6) = 1 - \\frac{1}{6} = \\frac{5}{6}$$

## Übung

Gegeben: $P(A) = 0.4$, $P(B) = 0.3$, $P(A \\cap B) = 0.1$

Berechne $P(A \\cup B)$!`,
      },
      {
        id: "m-sto-2",
        title: "Kombinatorik",
        duration: "25 min",
        type: "text",
        content: `## Permutationen

Anordnung von n verschiedenen Objekten:
$$P_n = n! = n \\cdot (n-1) \\cdot ... \\cdot 1$$

**Beispiel:** 5 Bücher können auf $5! = 120$ Arten angeordnet werden.

## Variationen

Auswahl von k aus n Objekten **mit Zurücklegen**:
$$V_k^n = n^k$$

Ohne Zurücklegen:
$$V_k^n = \\frac{n!}{(n-k)!}$$

## Kombinationen

Auswahl von k aus n Objekten **ohne Reihenfolge**:
$$C_k^n = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}$$

**Beispiel:** Aus 10 Personen werden 3 gewählt:
$$\\binom{10}{3} = \\frac{10!}{3! \\cdot 7!} = 120$$

## Binomialformel

$$(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^k b^{n-k}$$

## Übung

Wie viele 4-stellige Zahlen kann man aus den Ziffern 1,2,3,4,5 bilden (ohne Wiederholung)?`,
      },
      {
        id: "m-sto-3",
        title: "Bedingte Wahrscheinlichkeit",
        duration: "20 min",
        type: "text",
        content: `## Bedingte Wahrscheinlichkeit

Die bedingte Wahrscheinlichkeit gibt an, wie wahrscheinlich ein Ereignis ist, **wenn ein anderes bereits eingetreten ist**.

### Notation

$P(A|B)$ = "Wahrscheinlichkeit von A, gegeben B"

### Formel

$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

### Beispiel 1: Ziehen ohne Zurücklegen

Eine Urne mit 3 roten und 2 blauen Kugeln. Ziehe 2 Kugeln ohne Zurücklegen.

$P(\text{2. rot} | \text{1. rot}) = \frac{2}{4} = 0{,}5$

Nachdem die erste rote Kugel gezogen wurde, sind nur noch 2 von 4 übrig.

### Beispiel 2: Würfeln

$P(\text{6} | \text{ungerade}) = ?$

Ungerade Zahlen: {1, 3, 5}. Keine davon ist 6. Also $P = 0$.

### Beispiel 3: Medizinischer Test

- Krankheit: 1% der Bevölkerung
- Test: 95% Sensitivität (richtig positiv)
- Test: 5% Falsch-Positiv-Rate

$P(\text{krank} | \text{positiv}) = \frac{0{,}95 \cdot 0{,}01}{0{,}95 \cdot 0{,}01 + 0{,}05 \cdot 0{,}99} \approx 16{,}1\%$

Überraschend niedrig! Das liegt an der niedrigen Grundrate.

### Unabhängigkeit

A und B sind unabhängig, wenn $P(A|B) = P(A)$.

> **Merke:** Bedingte Wahrscheinlichkeit = "Wissen ändert die Wahrscheinlichkeit"!`,
      },
      {
        id: "m-sto-quiz",
        title: "Quiz: Stochastik",
        duration: "10 min",
        type: "quiz",
        content: "Teste dein Wissen über Wahrscheinlichkeitsrechnung!",
      },
      {
        id: "m-stochastik-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },

  // =============== KOMPLEXE ZAHLEN ===============
  {
    id: "m-komplexe-zahlen",
    slug: "mathe-komplexe-zahlen",
    title: "Komplexe Zahlen",
    description: "Imaginäre Zahlen und komplexe Ebene",
    icon: "🌀",
    color: "#8b5cf6",
    category: "komplexe-numerik",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Komplexe Zahlen

### 🎯 Definition
$$z = a + bi$$
- $a$: Realteil, $b$: Imaginärteil
- $i^2 = -1$

### 📐 Rechenregeln
| Operation | Formel |
|-----------|--------|
| Addition | $(a+bi) + (c+di) = (a+c) + (b+d)i$ |
| Multiplikation | $(a+bi)(c+di) = (ac-bd) + (ad+bc)i$ |
| Konjugiertes | $\\overline{a+bi} = a-bi$ |
| Betrag | $|z| = \\sqrt{a^2 + b^2}$ |

### 💡 Polardarstellung
$$z = r \\cdot e^{i\\varphi} = r(\\cos\\varphi + i\\sin\\varphi)$$

**Euler-Formel:** $e^{i\\varphi} = \\cos\\varphi + i\\sin\\varphi$`,
    lessons: [
      {
        id: "m-kz-1",
        title: "Grundlagen komplexer Zahlen",
        duration: "20 min",
        type: "text",
        content: `## Die imaginäre Einheit

$$i^2 = -1$$

Die **imaginäre Einheit** $i$ ist definiert als:
$$i = \\sqrt{-1}$$

## Komplexe Zahlen

Eine komplexe Zahl hat die Form:
$$z = a + bi$$

- $a$ = **Realteil** = $\\text{Re}(z)$
- $b$ = **Imaginärteil** = $\\text{Im}(z)$

**Beispiele:**
- $z = 3 + 2i$ → Re = 3, Im = 2
- $z = -1 + i$ → Re = -1, Im = 1
- $z = 5$ → Re = 5, Im = 0 (reelle Zahl)
- $z = -2i$ → Re = 0, Im = -2 (reine Imaginärzahl)

## Rechenregeln

**Addition:**
$$(a + bi) + (c + di) = (a + c) + (b + d)i$$

**Beispiel:** $(2 + 3i) + (1 - i) = 3 + 2i$

**Subtraktion:**
$$(a + bi) - (c + di) = (a - c) + (b - d)i$$

## Übung

Berechne $(4 + 2i) + (3 - 5i)$!`,
      },
      {
        id: "m-kz-2",
        title: "Multiplikation und Division",
        duration: "25 min",
        type: "text",
        content: `## Multiplikation

$$(a + bi)(c + di) = (ac - bd) + (ad + bc)i$$

**Beispiel:**
$$(2 + 3i)(1 + 4i) = 2 + 8i + 3i + 12i^2 = 2 + 11i - 12 = -10 + 11i$$

## Konjugierte

$$\\overline{a + bi} = a - bi$$

**Eigenschaft:** $z \\cdot \\bar{z} = |z|^2 = a^2 + b^2$

## Division

$$\\frac{a + bi}{c + di} = \\frac{(a + bi)(c - di)}{(c + di)(c - di)} = \\frac{(a + bi)(c - di)}{c^2 + d^2}$$

**Beispiel:**
$$\\frac{3 + 2i}{1 + i} = \\frac{(3 + 2i)(1 - i)}{1 + 1} = \\frac{3 - 3i + 2i - 2i^2}{2} = \\frac{5 - i}{2} = 2.5 - 0.5i$$

## Übung

Berechne $\\frac{2 + 3i}{1 - i}$!`,
      },
      {
        id: "m-kz-3",
        title: "Polardarstellung & Euler",
        duration: "20 min",
        type: "text",
        content: `## Polardarstellung & Euler

Komplexe Zahlen können nicht nur als $a + bi$, sondern auch als **Polarkoordinaten** dargestellt werden.

### Betrag

$|z| = \sqrt{a^2 + b^2}$

### Beispiel 1

$z = 3 + 4i$

$|z| = \sqrt{9 + 16} = \sqrt{25} = 5$

### Polarform

$z = r \cdot (\cos \varphi + i \sin \varphi) = r \cdot e^{i\varphi}$

- $r = |z|$ (Betrag)
- $\varphi = \arctan\frac{b}{a}$ (Winkel)

### Beispiel 2

$z = 1 + i$

$r = \sqrt{2}$, $\varphi = \frac{\pi}{4}$ (45°)

$z = \sqrt{2} \cdot e^{i\pi/4}$

### Euler-Formel

$$e^{ix} = \cos x + i \sin x$$

Das ist eine der berühmtesten Formeln der Mathematik! Sie verbindet $e$, $i$, $\pi$, $1$ und $0$.

### Multiplikation in Polarform

$z_1 \cdot z_2 = r_1 \cdot r_2 \cdot e^{i(\varphi_1 + \varphi_2)}$

**Betrag multiplizieren, Winkel addieren!**

### Beispiel 3

$z_1 = 2e^{i\pi/6}$, $z_2 = 3e^{i\pi/3}$

$z_1 \cdot z_2 = 6e^{i\pi/2} = 6i$

### De Moivre's Formel

$z^n = r^n \cdot e^{in\varphi}$

$|z^n| = r^n$, $\arg(z^n) = n \cdot \varphi$

> **Merke:** Polarform = Betrag × Euler. Multiplikation = Beträge multiplizieren, Winkel addieren!`,
      },
      {
        id: "m-kz-quiz",
        title: "Quiz: Komplexe Zahlen",
        duration: "10 min",
        type: "quiz",
        content: "Teste dein Wissen über komplexe Zahlen!",
      },
      {
        id: "m-komplexe-zahlen-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },

  // =============== NUMERIK ===============
  {
    id: "m-numerik-grundlagen",
    slug: "mathe-numerik",
    title: "Numerische Verfahren",
    description: "Algorithmen für numerische Berechnungen",
    icon: "💻",
    color: "#10b981",
    category: "komplexe-numerik",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Numerik

### 🎯 Grundlagen
- **Fehler:** $|x_{exakt} - x_{approx}|$
- **Rel. Fehler:** $\\frac{|x_{exakt} - x_{approx}|}{|x_{exakt}|}$

### 📐 Wichtige Verfahren
| Verfahren | Anwendung |
|-----------|----------|
| Bisektion | Nullstellen finden |
| Newton | Nullstellen (schneller) |
| Gauß | Lineare Gleichungssysteme |
| Euler | DGLs lösen |

### 💡 Konvergenz
- **Ordnung p:** $|e_{n+1}| \\leq C \\cdot |e_n|^p$
- Linear: $p=1$, Quadratisch: $p=2$`,
    lessons: [
      {
        id: "m-num-1",
        title: "Fehler und Näherungen",
        duration: "15 min",
        type: "text",
        content: `## Fehler und Näherungen

In der Numerik sind **Fehler** unvermeidlich. Wir unterscheiden verschiedene Arten von Fehlern.

### Absoluter Fehler

$e = |x_{\text{approx}} - x_{\text{exact}}|$

**Beispiel:** $\pi \approx 3{,}14$

$e = |3{,}14 - 3{,}14159...| = 0{,}00159...$

### Relativer Fehler

$e_{\text{rel}} = \frac{|x_{\text{approx}} - x_{\text{exact}}|}{|x_{\text{exact}}|}$

**Beispiel:** $\pi \approx 3{,}14$

$e_{\text{rel}} = \frac{0{,}00159}{3{,}14159} \approx 0{,}0005 = 0{,}05\%$

### Rundungsfehler

Computer haben endliche Genauigkeit. $0{,}1 + 0{,}2 \neq 0{,}3$ in Gleitkomma!

$0{,}1 + 0{,}2 = 0{,}30000000000000004$

### Kondition

Wie stark ändert sich das Ergebnis bei kleinen Änderungen der Eingabe?

- **Gut konditioniert:** $f(x) = x + 1$ (kleine Änderung → kleiner Effekt)
- **Schlecht konditioniert:** $f(x) = \frac{1}{x}$ bei $x \approx 0$ (kleine Änderung → großer Effekt)

### Konvergenzordnung

Wenn $|e_{n+1}| \leq C \cdot |e_n|^p$, dann ist die Konvergenzordnung $p$.

- **Linear (p=1):** Jeder Schritt halbiert den Fehler
- **Quadratisch (p=2):** Jeder Schritt quadriert den Fehler (viel schneller!)

> **Merke:** Relativer Fehler ist oft wichtiger als absoluter — 1 cm Fehler bei 1 m ist anders als bei 1 km!`,
      },
      {
        id: "m-num-2",
        title: "Bisektionsverfahren",
        duration: "20 min",
        type: "text",
        content: `## Bisektionsverfahren

Das Bisektionsverfahren findet **Nullstellen** einer Funktion durch halbierende Intervallschritte.

### Idee

Wenn $f(a)$ und $f(b)$ verschiedene Vorzeichen haben, liegt dazwischen eine Nullstelle.

### Algorithmus

1. Startintervall $[a, b]$ mit $f(a) \cdot f(b) < 0$
2. Mitte: $c = \frac{a+b}{2}$
3. Wenn $f(c) = 0$: fertig!
4. Sonst: Welches Teilintervall hat Vorzeichenwechsel? → neues Intervall
5. Wiederhole bis gewünschte Genauigkeit

### Beispiel

$f(x) = x^2 - 2$ (Nullstelle bei $\sqrt{2} \approx 1{,}414$)

| Schritt | $a$ | $b$ | $c$ | $f(c)$ |
|---------|-----|-----|-----|--------|
| 1 | 1 | 2 | 1,5 | 0,25 |
| 2 | 1 | 1,5 | 1,25 | -0,4375 |
| 3 | 1,25 | 1,5 | 1,375 | -0,1094 |
| 4 | 1,375 | 1,5 | 1,4375 | 0,0664 |

Nach 4 Schritten: $\sqrt{2} \approx 1{,}4375$

### Konvergenz

- **Linear** (Ordnung 1): Jeder Schritt halbiert das Intervall
- Nach $n$ Schritten: Intervallbreite $\frac{b-a}{2^n}$
- Für 10 Dezimalstellen: ca. 34 Schritte ($2^{34} > 10^{10}$)

### Vor- und Nachteile

✅ Garantiert Konvergenz (wenn Vorzeichenwechsel vorhanden)

✅ Einfach zu implementieren

❌ Langsam (linear)

❌ Braucht Vorzeichenwechsel

> **Merke:** Bisektion = Intervall halbieren. Garantiert, aber langsam!`,
      },
      {
        id: "m-num-3",
        title: "Newton-Verfahren",
        duration: "25 min",
        type: "text",
        content: `## Newton-Verfahren

Das Newton-Verfahren (auch Newton-Raphson) ist ein schnelles Verfahren zur Nullstellenbestimmung.

### Idee

Starte mit einem Schätzwert $x_0$ und verbessere ihn iterativ mit der **Tangente**.

### Formel

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

### Beispiel

$f(x) = x^2 - 2$ (Nullstelle bei $\sqrt{2}$)

$f'(x) = 2x$, Start: $x_0 = 2$

| Schritt | $x_n$ | $f(x_n)$ | $f'(x_n)$ | $x_{n+1}$ |
|---------|--------|----------|-----------|-----------|
| 0 | 2 | 2 | 4 | 1,5 |
| 1 | 1,5 | 0,25 | 3 | 1,4167 |
| 2 | 1,4167 | 0,0069 | 2,833 | 1,4142 |

Nach nur 3 Schritten: $\sqrt{2} \approx 1{,}4142$ (4 Dezimalstellen!)

### Konvergenz

- **Quadratisch** (Ordnung 2): Anzahl korrekter Stellen verdoppelt sich pro Schritt
- Viel schneller als Bisektion!

### Vor- und Nachteile

✅ Sehr schnell (quadratisch)

✅ Gut für viele Funktionen

❌ Braucht Ableitung $f'(x)$

❌ Konvergiert nicht immer (z.B. bei Wendepunkten)

❌ Kann "überspringen" (divergieren)

### Vergleich

| | Bisektion | Newton |
|--|-----------|--------|
| Konvergenz | Linear | Quadratisch |
| Braucht Ableitung? | Nein | Ja |
| Garantiert? | Ja | Nein |
| Schritte für 10 Stellen | ~34 | ~5 |

> **Merke:** Newton = schnell aber heikel, Bisektion = langsam aber sicher!`,
      },
      {
        id: "m-num-quiz",
        title: "Quiz: Numerik",
        duration: "10 min",
        type: "quiz",
        content: "Teste dein Wissen über numerische Verfahren!",
      },
      {
        id: "m-numerik-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },

  // =============== GEOMETRIE ===============
  {
    id: "m-geometrie-flaechen",
    slug: "mathe-geometrie",
    title: "Geometrie & Flächeninhalte",
    description: "Flächen, Körper und räumliches Denken",
    icon: "📐",
    color: "#06b6d4",
    category: "geometrie-trigonometrie",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Geometrie

### 🎯 Flächeninhalte
| Formel | Formel |
|--------|--------|
| Rechteck | $A = a \\cdot b$ |
| Dreieck | $A = \\frac{g \\cdot h}{2}$ |
| Kreis | $A = \\pi r^2$ |
| Trapez | $A = \\frac{(a+b) \\cdot h}{2}$ |
| Raute | $A = \\frac{d_1 \\cdot d_2}{2}$ |

### 📐 Körper
| Körper | Volumen | Oberfläche |
|--------|---------|------------|
| Quader | $V = a \\cdot b \\cdot c$ | $O = 2(ab+ac+bc)$ |
| Würfel | $V = a^3$ | $O = 6a^2$ |
| Kugel | $V = \\frac{4}{3}\\pi r^3$ | $O = 4\\pi r^2$ |
| Zylinder | $V = \\pi r^2 h$ | $O = 2\\pi r(r+h)$ |
| Kegel | $V = \\frac{1}{3}\\pi r^2 h$ | $O = \\pi r(r+l)$ |

### 💡 Satz des Pythagoras
$$a^2 + b^2 = c^2$$`,
    lessons: [
      {
        id: "m-geo-1",
        title: "Flächeninhalte",
        duration: "20 min",
        type: "text",
        visuals: [
          { type: "rectangle" as const },
          { type: "triangle" as const },
          { type: "circle" as const },
          { type: "trapezoid" as const },
        ],
        content: `## Flächeninhalte ebener Figuren

### Rechteck & Quadrat
$$A = a \\cdot b$$

**Quadrat:** $A = a^2$

### Dreieck
$$A = \\frac{g \\cdot h}{2}$$

**Gleichseitiges Dreieck:** $A = \\frac{\\sqrt{3}}{4} a^2$

### Kreis
$$A = \\pi r^2 = \\frac{\\pi d^2}{4}$$

### Trapez
$$A = \\frac{(a + b) \\cdot h}{2}$$

### Übung
Berechne die Fläche eines Rechtecks mit $a = 8\\text{cm}$ und $b = 5\\text{cm}$!`,
      },
      {
        id: "m-geo-2",
        title: "Körper & Volumen",
        duration: "25 min",
        type: "text",
        visuals: [
          { type: "cuboid" as const },
          { type: "cube" as const },
          { type: "sphere" as const },
          { type: "cylinder" as const },
          { type: "cone" as const },
        ],
        content: `## Räumliche Körper

### Quader
$$V = a \\cdot b \\cdot c$$
$$O = 2(ab + ac + bc)$$

### Würfel
$$V = a^3$$
$$O = 6a^2$$

### Kugel
$$V = \\frac{4}{3}\\pi r^3$$
$$O = 4\\pi r^2$$

### Zylinder
$$V = \\pi r^2 h$$
$$O = 2\\pi r(r + h)$$

### Kegel
$$V = \\frac{1}{3}\\pi r^2 h$$
$$O = \\pi r(r + l)$$ (l = Mantellänge)

### Übung
Berechne das Volumen einer Kugel mit $r = 5\\text{cm}$!`,
      },
      {
        id: "m-geo-3",
        title: "Satz des Pythagoras",
        duration: "20 min",
        type: "text",
        content: `## Der Satz des Pythagoras

Im rechtwinkligen Dreieck gilt:
$$a^2 + b^2 = c^2$$

$c$ ist die Hypotenuse (längste Seite).

### Umformungen
$$c = \\sqrt{a^2 + b^2}$$
$$a = \\sqrt{c^2 - b^2}$$

### Geometrische Deutung
Die Quadrate über den Seiten ergeben:
$$A_c = A_a + A_b$$

### Übung
Ein rechtwinkliges Dreieck hat Katheten $a = 3$ und $b = 4$. Wie lang ist die Hypotenuse?`,
      },
      {
        id: "m-geo-quiz",
        title: "Quiz: Geometrie",
        duration: "10 min",
        type: "quiz",
        content: "Teste dein Wissen über Geometrie!",
      },
      {
        id: "m-geometrie-flaechen-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },

  // =============== TRIGONOMETRIE ===============
  {
    id: "m-trigonometrie",
    slug: "mathe-trigonometrie",
    title: "Trigonometrie",
    description: "Sinus, Kosinus, Tangens und Anwendungen",
    icon: "📏",
    color: "#ec4899",
    category: "geometrie-trigonometrie",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Trigonometrie

### 🎯 Grundfunktionen
| Funktion | Definition |
|----------|------------|
| $\\sin \\alpha$ | $\\frac{\\text{Gegenkathete}}{\\text{Hypotenuse}}$ |
| $\\cos \\alpha$ | $\\frac{\\text{Ankathete}}{\\text{Hypotenuse}}$ |
| $\\tan \\alpha$ | $\\frac{\\text{Gegenkathete}}{\\text{Ankathete}}$ |

### 📐 Wichtige Werte
| α | 0° | 30° | 45° | 60° | 90° |
|---|-----|-----|-----|-----|-----|
| sin | 0 | ½ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{3}}{2}$ | 1 |
| cos | 1 | $\\frac{\\sqrt{3}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | ½ | 0 |
| tan | 0 | $\\frac{\\sqrt{3}}{3}$ | 1 | $\\sqrt{3}$ | - |

### 💡 Gesetze
- **Satz des Pythagoras:** $\\sin^2\\alpha + \\cos^2\\alpha = 1$
- **Addition:** $\\sin(\\alpha + \\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$`,
    lessons: [
      {
        id: "m-trig-1",
        title: "Grundlagen der Trigonometrie",
        duration: "25 min",
        type: "text",
        interactive: "unitCircleInteractive" as const,
        visuals: [
          { type: "triangle" as const },
          { type: "unitCircle" as const, props: { angle: Math.PI / 3 } },
        ],
        content: `## Die trigonometrischen Funktionen

Im rechtwinkligen Dreieck:

$$\\sin \\alpha = \\frac{\\text{Gegenkathete}}{\\text{Hypotenuse}} = \\frac{a}{c}$$

$$\\cos \\alpha = \\frac{\\text{Ankathete}}{\\text{Hypotenuse}} = \\frac{b}{c}$$

$$\\tan \\alpha = \\frac{\\text{Gegenkathete}}{\\text{Ankathete}} = \\frac{a}{b} = \\frac{\\sin \\alpha}{\\cos \\alpha}$$

## Wichtige Identität

$$\\sin^2 \\alpha + \\cos^2 \\alpha = 1$$

## Übung

Gegeben: $a = 3$, $c = 5$. Berechne $\\sin \\alpha$, $\\cos \\alpha$, $\\tan \\alpha$!`,
      },
      {
        id: "m-trig-2",
        title: "Wichtige Werte & Einheitskreis",
        duration: "20 min",
        type: "text",
        content: `## Wichtige Werte

| α | 0° | 30° | 45° | 60° | 90° |
|---|-----|-----|-----|-----|-----|
| sin | 0 | ½ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{3}}{2}$ | 1 |
| cos | 1 | $\\frac{\\sqrt{3}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | ½ | 0 |
| tan | 0 | $\\frac{\\sqrt{3}}{3}$ | 1 | $\\sqrt{3}$ | - |

## Einheitskreis

Auf dem Einheitskreis ($r=1$):
- $x = \\cos \\alpha$
- $y = \\sin \\alpha$

## Übung

Berechne $\\sin(60°) + \\cos(30°)$!`,
      },
      {
        id: "m-trig-3",
        title: "Satz des Sinus & Kosinus",
        duration: "25 min",
        type: "text",
        content: `## Satz des Sinus

$$\\frac{a}{\\sin \\alpha} = \\frac{b}{\\sin \\beta} = \\frac{c}{\\sin \\gamma} = 2R$$

$R$ = Radius des Umkreises.

## Satz des Kosinus

$$c^2 = a^2 + b^2 - 2ab \\cdot \\cos \\gamma$$

## Anwendung

**Satz des Sinus:** Wenn Gegenwinkel bekannt
**Satz des Kosinus:** Wenn SSW oder SWS gegeben

## Übung

Gegeben: $a = 5$, $b = 7$, $\\gamma = 60°$. Berechne $c$!`,
      },
      {
        id: "m-trig-quiz",
        title: "Quiz: Trigonometrie",
        duration: "10 min",
        type: "quiz",
        content: "Teste dein Wissen über Trigonometrie!",
      },
      {
        id: "m-trigonometrie-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },

  // =============== POTENZEN & LOGARITHMEN ===============
  {
    id: "m-potenzen-log",
    slug: "mathe-potenzen",
    title: "Potenzen & Logarithmen",
    description: "Rechnen mit Potenzen und Logarithmen",
    icon: "🔢",
    color: "#84cc16",
    category: "grundlagen",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Potenzen & Logarithmen

### 🎯 Potenzregeln
| Regel | Formel |
|-------|--------|
| Multiplikation | $a^m \\cdot a^n = a^{m+n}$ |
| Division | $\\frac{a^m}{a^n} = a^{m-n}$ |
| Potenz von Potenz | $(a^m)^n = a^{mn}$ |
| Produktregel | $(ab)^n = a^n b^n$ |

### 📐 Logarithmus
$$\\log_a(x) = y \\Leftrightarrow a^y = x$$

**Log-Regeln:**
- $\\log(ab) = \\log a + \\log b$
- $\\log(\\frac{a}{b}) = \\log a - \\log b$
- $\\log(a^n) = n \\cdot \\log a$

### 💡 Spezielle Logarithmen
- $\\ln(x) = \\log_e(x)$ (natürlich)
- $\lg(x) = \\log_{10}(x)$ (dezimal)
- $\\log_2(x)$ (binär)`,
    lessons: [
      {
        id: "m-pot-1",
        title: "Potenzen & Potenzregeln",
        duration: "20 min",
        type: "text",
        content: `## Potenzregeln

Potenzen sind die Grundlage für viele mathematische Konzepte. Hier die wichtigsten Regeln:

### Grundbegriffe
$a^n = a \cdot a \cdot a \cdots$ (n-mal)

- $a$: Basis
- $n$: Exponent
- $a^2$: Quadrat
- $a^3$: Kubik

### Regeln

**Multiplikation:** $a^m \cdot a^n = a^{m+n}$

$2^3 \cdot 2^4 = 2^7 = 128$

**Division:** $\frac{a^m}{a^n} = a^{m-n}$

$\frac{2^5}{2^3} = 2^2 = 4$

**Potenz von Potenz:** $(a^m)^n = a^{m \cdot n}$

$(2^3)^2 = 2^6 = 64$

**Produkt:** $(ab)^n = a^n \cdot b^n$

$(2 \cdot 3)^2 = 4 \cdot 9 = 36$

**Quotient:** $(\frac{a}{b})^n = \frac{a^n}{b^n}$

$(\frac{2}{3})^2 = \frac{4}{9}$

### Besondere Werte
$a^0 = 1$ (für $a \neq 0$)

$a^1 = a$

$a^{-n} = \frac{1}{a^n}$

$2^{-3} = \frac{1}{8} = 0{,}125$

> **Merke:** Bei Multiplikation gleicher Basen werden die Exponenten addiert, bei Division subtrahiert!`,
      },
      {
        id: "m-pot-2",
        title: "Logarithmen",
        duration: "25 min",
        type: "text",
        content: `## Logarithmen

Der Logarithmus ist die **Umkehrung** der Potenzierung. Wenn $a^x = b$, dann ist $\log_a(b) = x$.

### Definition
$\log_a(b) = x \Leftrightarrow a^x = b$

### Beispiel 1
$\log_2(8) = 3$, denn $2^3 = 8$

$\log_{10}(100) = 2$, denn $10^2 = 100$

$\log_5(25) = 2$, denn $5^2 = 25$

### Logarithmusgesetze

**Produkt:** $\log(a \cdot b) = \log(a) + \log(b)$

$\log(6) = \log(2) + \log(3)$

**Quotient:** $\log(\frac{a}{b}) = \log(a) - \log(b)$

$\log(\frac{100}{10}) = \log(100) - \log(10) = 2 - 1 = 1$

**Potenz:** $\log(a^n) = n \cdot \log(a)$

$\log(8) = \log(2^3) = 3 \cdot \log(2)$

### Wichtige Logarithmen

- **Natürlicher Logarithmus:** $\ln(x) = \log_e(x)$ mit $e \approx 2{,}718$
- **Dezimallogarithmus:** $\lg(x) = \log_{10}(x)$
- **Binärlogarithmus:** $\log_2(x)$ (in der Informatik)

### Beispiel 2: Gleichung lösen
$2^x = 16$

$x = \log_2(16) = \log_2(2^4) = 4$

> **Merke:** Logarithmen wandeln Potenzen in Produkte um — das macht Rechnungen einfacher!`,
      },
      {
        id: "m-pot-3",
        title: "Exponentialfunktion",
        duration: "20 min",
        type: "text",
        content: `## Exponentialfunktionen

Eine Exponentialfunktion hat die Form $f(x) = a^x$, wobei die Variable im **Exponenten** steht.

### Die wichtigste: $e^x$

$e \approx 2{,}71828$ ist die **Euler-Zahl**.

$e^x$ hat eine besondere Eigenschaft: $\frac{d}{dx}e^x = e^x$ — die Ableitung ist die Funktion selbst!

### Wachstum & Zerfall

**Exponentielles Wachstum:** $f(t) = N_0 \cdot e^{kt}$ (k > 0)

- Bakterienwachstum
- Bevölkerungsentwicklung
- Zinseszins

**Exponentieller Zerfall:** $f(t) = N_0 \cdot e^{-kt}$ (k > 0)

- Radioaktiver Zerfall
- Abkühlung
- Medikamentenabbau

### Halbwertszeit

Die Zeit, bis die Hälfte zerfallen ist:

$T_{1/2} = \frac{\ln(2)}{k}$

### Beispiel: Radioaktiver Zerfall

1000 Atome, Halbwertszeit 5 Jahre. Nach 15 Jahren?

$N(15) = 1000 \cdot (\frac{1}{2})^{15/5} = 1000 \cdot \frac{1}{8} = 125$

> **Merke:** $e^x$ ist DIE Exponentialfunktion — sie beschreibt natürliches Wachstum überall in der Natur!`,
      },
      {
        id: "m-pot-quiz",
        title: "Quiz: Potenzen & Log",
        duration: "10 min",
        type: "quiz",
        content: "Teste dein Wissen über Potenzen und Logarithmen!",
      },
      {
        id: "m-potenzen-log-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },

  // =============== STATISTIK ===============
  {
    id: "m-statistik",
    slug: "mathe-statistik",
    title: "Statistik",
    description: "Mittelwert, Varianz und Datenanalyse",
    icon: "📊",
    color: "#f97316",
    category: "stochastik",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Statistik

### 🎯 Maße der zentralen Tendenz
| Maß | Formel |
|-----|--------|
| Mittelwert | $\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i$ |
| Median | Mittlerer Wert (sortiert) |
| Modus | Häufigster Wert |

### 📐 Streuung
| Maß | Formel |
|-----|--------|
| Varianz | $s^2 = \\frac{1}{n}\\sum(x_i - \\bar{x})^2$ |
| Standardabweichung | $s = \\sqrt{s^2}$ |
| Spannweite | $R = x_{max} - x_{min}$ |

### 💡 Quartile
- $Q_1$: 25% sind kleiner
- $Q_2$ (= Median): 50% sind kleiner
- $Q_3$: 75% sind kleiner
- $IQR = Q_3 - Q_1$`,
    lessons: [
      {
        id: "m-stat-1",
        title: "Mittelwert, Median, Modus",
        duration: "20 min",
        type: "text",
        content: `## Mittelwert, Median, Modus

Diese drei Maße beschreiben die **Lage** einer Datenverteilung.

### Mittelwert (Durchschnitt)

$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i = \frac{x_1 + x_2 + \cdots + x_n}{n}$

### Beispiel 1
Noten: 2, 3, 2, 1, 2, 4, 3

$\bar{x} = \frac{2+3+2+1+2+4+3}{7} = \frac{17}{7} \approx 2{,}43$

### Median (Zentralwert)

Der **mittlere Wert**, wenn die Daten sortiert sind. Robust gegen Ausreißer!

Sortiert: 1, 2, 2, **2**, 3, 3, 4 → Median = 2

### Beispiel 2: Ausreißer
Gehälter: 3000, 3200, 3500, 3800, **50000**

Mittelwert: $\frac{63500}{5} = 12700$ (verzerrt!)

Median: 3500 (realistischer)

### Modus (Häufigster Wert)

Der Wert, der **am häufigsten** vorkommt.

Daten: 2, 3, 2, 1, 2, 4, 3 → Modus = 2 (kommt 3-mal vor)

> **Merke:** Mittelwert rechnet, Median sortiert, Modus zählt. Bei schiefen Verteiligungen ist der Median oft aussagekräftiger!`,
      },
      {
        id: "m-stat-2",
        title: "Varianz & Standardabweichung",
        duration: "25 min",
        type: "text",
        content: `## Varianz & Standardabweichung

Diese Maße beschreiben die **Streuung** einer Datenverteilung.

### Varianz

$\sigma^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2$

### Beispiel 1
Daten: 2, 4, 4, 4, 5, 5, 7, 9

Mittelwert: $\bar{x} = \frac{40}{8} = 5$

Abweichungen: $-3, -1, -1, -1, 0, 0, 2, 4$

Quadrate: $9, 1, 1, 1, 0, 0, 4, 16$

$\sigma^2 = \frac{32}{8} = 4$

### Standardabweichung

$\sigma = \sqrt{\sigma^2}$

$\sigma = \sqrt{4} = 2$

Die Standardabweichung hat die **gleiche Einheit** wie die Daten!

### Beispiel 2: Noten
Klasse A: Noten 3, 3, 3, 3, 3 → $\sigma = 0$ (alle gleich)

Klasse B: Noten 1, 2, 3, 4, 5 → $\sigma \approx 1{,}41$ (große Streuung)

### Empirische Regel (Normalverteilung)

- 68% der Daten liegen in $\bar{x} \pm \sigma$
- 95% in $\bar{x} \pm 2\sigma$
- 99,7% in $\bar{x} \pm 3\sigma$

> **Merke:** Varianz in Quadrat-Einheiten, Standardabweichung in Original-Einheiten. $\sigma$ zeigt, wie stark die Daten um den Mittelwert streuen!`,
      },
      {
        id: "m-stat-3",
        title: "Quartile & Boxplot",
        duration: "20 min",
        type: "text",
        content: `## Quartile & Boxplot

Quartile teilen eine sortierte Datenreihe in **vier gleiche Teile**.

### Definitionen

- **Q1** (unteres Quartil): 25% der Daten liegen darunter
- **Q2** (Median): 50% der Daten liegen darunter
- **Q3** (oberes Quartil): 75% der Daten liegen darunter

### Berechnung

Sortierte Daten: $x_1, x_2, \cdots, x_n$

$Q_1$ = Median der unteren Hälfte

$Q_3$ = Median der oberen Hälfte

### Beispiel
Daten: 2, 3, 5, 7, 8, 10, 12, 15, 18

$Q_1 = 4$ (Median von 2,3,5,7)

$Q_2 = 8$ (Median)

$Q_3 = 13{,}5$ (Median von 10,12,15,18)

### Interquartilsabstand (IQR)

$IQR = Q_3 - Q_1 = 13{,}5 - 4 = 9{,}5$

Der IQR beschreibt die Streubreite des **mittleren 50%** der Daten.

### Boxplot

Ein Boxplot zeigt:
- Box von Q1 bis Q3
- Linie bei Q2 (Median)
- Whisker bis zu den Extremwerten (innerhalb 1,5 × IQR)
- Punkte für Ausreißer

### Ausreißer erkennen

- Unterhalb: $Q_1 - 1{,}5 \cdot IQR$
- Oberhalb: $Q_3 + 1{,}5 \cdot IQR$

> **Merke:** Der IQR ist robust gegen Ausreißer und zeigt die typische Streuung der Daten!`,
      },
      {
        id: "m-stat-quiz",
        title: "Quiz: Statistik",
        duration: "10 min",
        type: "quiz",
        content: "Teste dein Wissen über Statistik!",
      },
      {
        id: "m-statistik-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    ],
  },
  {
    id: "m-bruchrechnen",
    slug: "mathe-bruchrechnen",
    title: "Bruchrechnen",
    description: "Grundlagen der Bruchrechnung - addieren, subtrahieren, multiplizieren, dividieren",
    icon: "🔢",
    color: "#8b5cf6",
    category: "arithmetik-algebra",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Bruchrechnen

### Grundbegriffe
- **Zähler** (oben): Anzahl der Teile
- **Nenner** (unten): Gesamtanzahl der Teile
- **Echter Bruch:** Zähler < Nenner
- **Unechter Bruch:** Zähler ≥ Nenner

### Rechenregeln
| Operation | Regel |
|-----------|-------|
| Addieren | $\\frac{a}{c} + \\frac{b}{c} = \\frac{a+b}{c}$ |
| KGV nötig | $\\frac{a}{b} + \\frac{c}{d} = \\frac{a \\cdot d + c \\cdot b}{b \\cdot d}$ |
| Multiplizieren | $\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$ |
| Dividieren | $\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$ |

### Kürzen
$\\frac{a \\cdot k}{b \\cdot k} = \\frac{a}{b}$ — Immer den größten gemeinsamen Teiler suchen!`,
    lessons: [
      {
        id: "m-br-1",
        title: "Brüche verstehen",
        duration: "15 min",
        type: "text",
        content: `## Was ist ein Bruch?

Ein Bruch $\\frac{a}{b}$ stellt einen Anteil dar. $a$ ist der **Zähler**, $b$ der **Nenner**.

## Echte vs. unechte Brüche

- **Echter Bruch:** $\\frac{3}{4}$ — Zähler < Nenner (weniger als 1 Ganzes)
- **Unechter Bruch:** $\\frac{5}{3}$ — Zähler ≥ Nenner (mehr als 1 Ganzes)
- **Gemischte Zahl:** $1\\frac{2}{3}$ = $\\frac{5}{3}$

## Brüche als Dezimalzahlen

$\\frac{1}{4} = 0{,}25$, $\\frac{1}{3} = 0{,}333...$, $\\frac{1}{2} = 0{,}5$

## Am Zahlenstrahl

Brüche lassen sich auf dem Zahlenstrahl darstellen. $\\frac{3}{4}$ liegt bei 0,75.

### Beispiel
Teile einen Kuchen in 8 Stücke. Wenn du 3 isst, hast du $\\frac{3}{8}$ gegessen. Es bleiben $\\frac{5}{8}$.`,
      },
      {
        id: "m-br-2",
        title: "Addieren & Subtrahieren",
        duration: "18 min",
        type: "text",
        content: `## Gleicher Nenner

Wenn der Nenner gleich ist, einfach die Zähler addieren/subtrahieren:

$$\\frac{3}{7} + \\frac{2}{7} = \\frac{5}{7}$$

$$\\frac{5}{8} - \\frac{3}{8} = \\frac{2}{8} = \\frac{1}{4}$$

## Verschiedene Nenner

KGV (kleinstes gemeinsames Vielfaches) des Nenners suchen:

$$\\frac{1}{3} + \\frac{1}{4} = \\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}$$

## Schritt für Schritt

1. Nenner gleich machen (KGV suchen)
2. Zähler entsprechend erweitern
3. Zähler addieren/subtrahieren
4. Ergebnis kürzen

### Beispiel
$\\frac{2}{5} + \\frac{1}{3}$:
- KGV von 5 und 3 = 15
- $\\frac{2 \\cdot 3}{5 \\cdot 3} + \\frac{1 \\cdot 5}{3 \\cdot 5} = \\frac{6}{15} + \\frac{5}{15} = \\frac{11}{15}$`,
      },
      {
        id: "m-br-3",
        title: "Multiplizieren & Dividieren",
        duration: "15 min",
        type: "text",
        content: `## Multiplizieren & Dividieren

Brüche zu multiplizieren ist einfacher als zu addieren — man braucht keinen gemeinsamen Nenner!

## Multiplikation

**Regel:** Zähler mal Zähler, Nenner mal Nenner.

$$\frac{a}{b} \cdot \frac{c}{d} = \frac{a \cdot c}{b \cdot d}$$

### Beispiel 1

$\frac{2}{3} \cdot \frac{4}{5} = \frac{8}{15}$

### Beispiel 2: Vereinfachen vor dem Multiplizieren

$\frac{3}{4} \cdot \frac{8}{9}$

Kreußlich kürzen: 3 und 9 teilen sich durch 3, 4 und 8 teilen sich durch 4:

$= \frac{1}{1} \cdot \frac{2}{3} = \frac{2}{3}$

**Tipp:** Immer vor dem Multiplizieren kürzen — das macht das Ergebnis einfacher!

## Division

**Regel:** Kehrtausch! Dividieren durch $\frac{a}{b}$ = Multiplizieren mit $\frac{b}{a}$.

$$\frac{a}{b} : \frac{c}{d} = \frac{a}{b} \cdot \frac{d}{c}$$

### Beispiel 3

$\frac{2}{3} : \frac{4}{5} = \frac{2}{3} \cdot \frac{5}{4} = \frac{10}{12} = \frac{5}{6}$

### Beispiel 4: Gemischte Zahlen

$2\frac{1}{2} : 1\frac{1}{4}$

Erst in unechte Brüche umwandeln:

$\frac{5}{2} : \frac{5}{4} = \frac{5}{2} \cdot \frac{4}{5} = \frac{20}{10} = 2$

> **Merke:** Multiplizieren = Zähler×Zähler, Nenner×Nenner. Dividieren = Kehren und multiplizieren!`,
      },
      {
        id: "m-br-4",
        title: "Quiz: Bruchrechnen",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen über Bruchrechnen!`,
      },
      {
        id: "m-br-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Übe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-gleichungen",
    slug: "mathe-gleichungen",
    title: "Gleichungen lösen",
    description: "Lineare und quadratische Gleichungen, pq-Formel, Mitternachtsformel",
    icon: "⚖️",
    color: "#10b981",
    category: "arithmetik-algebra",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Gleichungen lösen

### Lineare Gleichungen
$ax + b = 0 \\Rightarrow x = -\\frac{b}{a}$

### Quadratische Gleichungen
$ax^2 + bx + c = 0$

**pq-Formel:** $x^2 + px + q = 0 \\Rightarrow x = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$

**abc-Formel:** $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

### Diskriminante
$D = b^2 - 4ac$
- $D > 0$: 2 Lösungen
- $D = 0$: 1 Lösung (doppelt)
- $D < 0$: keine reelle Lösung`,
    lessons: [
      {
        id: "m-gl-1",
        title: "Lineare Gleichungen",
        duration: "15 min",
        type: "text",
        content: `## Lineare Gleichungen

Lineare Gleichungen sind die einfachste Art von Gleichungen — die Variable kommt nur in der **1. Potenz** vor.

### Grundprinzip

Was du auf einer Seite machst, musst du auch auf der anderen machen.

### Beispiel 1: Einfach

$2x + 6 = 14$

$2x = 14 - 6 = 8$

$x = 4$

**Probe:** $2 \cdot 4 + 6 = 14$ ✓

### Beispiel 2: Variable auf beiden Seiten

$5x - 3 = 2x + 9$

$5x - 2x = 9 + 3$

$3x = 12$

$x = 4$

### Beispiel 3: Klammern

$3(x - 2) = 2(x + 1)$

$3x - 6 = 2x + 2$

$3x - 2x = 2 + 6$

$x = 8$

### Beispiel 4: Brüche

$\frac{x}{3} + \frac{x}{4} = 7$

Mit 12 erweitern (kgV von 3 und 4):

$4x + 3x = 84$

$7x = 84$

$x = 12$

### Schema

1. **Klammern** auflösen
2. **Brüche** wegschaffen (erweitern)
3. **Variablen** auf eine Seite
4. **Zahlen** auf die andere Seite
5. **Dividieren** durch den Koeffizienten
6. **Probe** machen!

> **Merke:** Das Ziel ist immer, $x = ...$ zu bekommen. Schritt für Schritt umformen!`,
      },
      {
        id: "m-gl-2",
        title: "Quadratische Gleichungen",
        duration: "20 min",
        type: "text",
        content: `## Quadratische Gleichungen

$ax^2 + bx + c = 0$ — Die Variable kommt in der **2. Potenz** vor.

## pq-Formel

Für $x^2 + px + q = 0$:

$$x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$$

### Beispiel
$x^2 - 5x + 6 = 0$ → $p = -5$, $q = 6$

$x_{1,2} = \\frac{5}{2} \\pm \\sqrt{\\frac{25}{4} - 6} = \\frac{5}{2} \\pm \\sqrt{\\frac{1}{4}} = \\frac{5}{2} \\pm \\frac{1}{2}$

$x_1 = 3$, $x_2 = 2$

## abc-Formel

Für $ax^2 + bx + c = 0$:

$$x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

## Diskriminante

$D = b^2 - 4ac$ bestimmt die Anzahl der Lösungen:
- $D > 0$: Zwei Lösungen
- $D = 0$: Eine Lösung (doppelt)
- $D < 0$: Keine reelle Lösung`,
      },
      {
        id: "m-gl-3",
        title: "Quiz: Gleichungen",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-gl-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Übe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-termumformung",
    slug: "mathe-termumformung",
    title: "Termumformung",
    description: "Klammern, Binomische Formeln, Kürzen, Vereinfachen",
    icon: "✏️",
    color: "#f59e0b",
    category: "arithmetik-algebra",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Termumformung

### Binomische Formeln
$(a+b)^2 = a^2 + 2ab + b^2$
$(a-b)^2 = a^2 - 2ab + b^2$
$(a+b)(a-b) = a^2 - b^2$

### Distributivgesetz
$a(b+c) = ab + ac$

### Potenzregeln
$a^m \\cdot a^n = a^{m+n}$
$(a^m)^n = a^{m \\cdot n}$
$a^0 = 1$ (für $a \\neq 0$)`,
    lessons: [
      {
        id: "m-tu-1",
        title: "Klammern ausmultiplizieren",
        duration: "15 min",
        type: "text",
        content: `## Klammern ausmultiplizieren

Das Distributivgesetz ist das wichtigste Werkzeug beim Vereinfachen von Termen.

### Distributivgesetz

$a \cdot (b + c) = a \cdot b + a \cdot c$

### Beispiel 1: Einfach

$3(x + 4) = 3 \cdot x + 3 \cdot 4 = 3x + 12$

### Beispiel 2: Negatives Vorzeichen

$-2(5 - x) = -2 \cdot 5 + (-2) \cdot (-x) = -10 + 2x$

**Vorsicht:** Minus mal Minus gibt Plus!

### Beispiel 3: Variable außen

$x(x + 3) = x^2 + 3x$

### Beispiel 4: Verschachtelte Klammern

$2(3x - (4 - x))$

Erst innere Klammer auflösen:

$= 2(3x - 4 + x) = 2(4x - 4) = 8x - 8$

### Beispiel 5: Zwei Klammern

$(x + 2)(x - 3)$

Jedes Element der ersten Klammer mit jedem der zweiten multiplizieren:

$= x \cdot x + x \cdot (-3) + 2 \cdot x + 2 \cdot (-3)$

$= x^2 - 3x + 2x - 6 = x^2 - x - 6$

### Schema für zwei Klammern

$(a + b)(c + d) = ac + ad + bc + bd"

> **Merke:** "Außen mal Außen, Innen mal Innen" — das FOIL-Prinzip (First, Outer, Inner, Last)!`,
      },
      {
        id: "m-tu-2",
        title: "Binomische Formeln",
        duration: "18 min",
        type: "text",
        content: `## Die drei binomischen Formeln

### 1. Formel: $(a+b)^2 = a^2 + 2ab + b^2$
$(x+3)^2 = x^2 + 6x + 9$

### 2. Formel: $(a-b)^2 = a^2 - 2ab + b^2$
$(x-4)^2 = x^2 - 8x + 16$

### 3. Formel: $(a+b)(a-b) = a^2 - b^2$
$(x+5)(x-5) = x^2 - 25$

## Anwendung: Ausklammern rückwärts

$x^2 + 10x + 25 = (x+5)^2$

$x^2 - 49 = (x+7)(x-7)$

### Merkhilfe
- **Erste:** Quadrieren, doppelt, quadrieren
- **Zweite:** Wie erste, aber Minus
- **Dritte:** Plus mal Minus = Differenz der Quadrate`,
      },
      {
        id: "m-tu-3",
        title: "Quiz: Termumformung",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-tu-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Übe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-ungleichungen",
    slug: "mathe-ungleichungen",
    title: "Ungleichungen",
    description: "Lineare und quadratische Ungleichungen, Betragsungleichungen",
    icon: "⚖️",
    color: "#ec4899",
    category: "arithmetik-algebra",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Ungleichungen

### Regeln
- $a < b \\Rightarrow a + c < b + c$ (Addition)
- $a < b$ und $c > 0 \\Rightarrow a \\cdot c < b \\cdot c$
- $a < b$ und $c < 0 \\Rightarrow a \\cdot c > b \\cdot c$ (**Vorzeichenwechsel!**)

### Intervallschreibweise
- $(a, b)$ = offenes Intervall: $a < x < b$
- $[a, b]$ = abgeschlossenes Intervall: $a \\leq x \\leq b$
- $[a, b)$ = halboffen: $a \\leq x < b$`,
    lessons: [
      {
        id: "m-ug-1",
        title: "Lineare Ungleichungen",
        duration: "15 min",
        type: "text",
        content: `## Lineare Ungleichungen

Wie Gleichungen lösen — aber mit $<$, $>$, $\\leq$, $\\geq$ statt $=$.

### Beispiel
$3x - 7 > 5$
$3x > 12$
$x > 4$

**Lösungsmenge:** $L = \{x \\in \\mathbb{R} \mid x > 4\} = (4, \\infty)$

## Wichtig: Vorzeichenwechsel!

Bei Multiplikation/Division mit einer **negativen Zahl** dreht sich das Zeichen um:

$-2x < 6$ → $x > -3$ (nicht $x < -3$!)

## Darstellung auf dem Zahlenstrahl

$x > 4$: Offener Kreis bei 4, Pfeil nach rechts.`,
      },
      {
        id: "m-ug-2",
        title: "Quadratische Ungleichungen",
        duration: "18 min",
        type: "text",
        content: `## Quadratische Ungleichungen

$ax^2 + bx + c > 0$ oder $ax^2 + bx + c < 0$

## Lösungsweg

1. Zugehörige Gleichung $ax^2 + bx + c = 0$ lösen
2. Nullstellen auf dem Zahlenstrahl eintragen
3. Vorzeichen in den Intervallen bestimmen (Tafel-Test)

### Beispiel
$x^2 - 5x + 6 > 0$

Nullstellen: $x_1 = 2$, $x_2 = 3$

| Intervall | $(−\\infty, 2)$ | $(2, 3)$ | $(3, \\infty)$ |
|-----------|---------|---------|---------|
| Vorzeichen | $+$ | $-$ | $+$ |

Lösung: $x < 2$ oder $x > 3$, also $L = (-\\infty, 2) \\cup (3, \\infty)$`,
      },
      {
        id: "m-ug-3",
        title: "Quiz: Ungleichungen",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-ug-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Übe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-kurvendiskussion",
    slug: "mathe-kurvendiskussion",
    title: "Kurvendiskussion",
    description: "Vollständige Analyse einer Funktion: Nullstellen, Extrema, Wendepunkte",
    icon: "📈",
    color: "#8b5cf6",
    category: "analysis",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Kurvendiskussion

### Schema
1. Definitionsbereich bestimmen
2. Nullstellen: $f(x) = 0$
3. Ableitungen: $f'(x)$, $f''(x)$
4. Extrema: $f'(x) = 0$, dann $f''(x)$ prüfen
5. Wendepunkt: $f''(x) = 0$, dann $f'''(x) \\neq 0$
6. Monotonie: Vorzeichen von $f'(x)$
7. Krümmung: Vorzeichen von $f''(x)$

### Extrema
- **Minimum:** $f'(x_0) = 0$ und $f''(x_0) > 0$
- **Maximum:** $f'(x_0) = 0$ und $f''(x_0) < 0$`,
    lessons: [
      {
        id: "m-kd-1",
        title: "Definitionsbereich & Nullstellen",
        duration: "18 min",
        type: "text",
        content: `## Definitionsbereich (Wertebereich)

Für welche $x$-Werte ist $f(x)$ definiert?

### Einschränkungen
- **Nenner:** $\\neq 0$
- **Wurzel:** Argument $\\geq 0$
- **Logarithmus:** Argument $> 0$

## Nullstellen

Löse $f(x) = 0$.

### Polynomfunktionen
$f(x) = x^3 - 4x = x(x^2 - 4) = x(x+2)(x-2)$

Nullstellen: $x_1 = -2$, $x_2 = 0$, $x_3 = 2$

### Numerisch
Wenn keine algebraische Lösung möglich: Newton-Verfahren oder Bisektion.`,
      },
      {
        id: "m-kd-2",
        title: "Extrema",
        duration: "20 min",
        type: "text",
        content: `## Extrema finden

### Notwendige Bedingung (1. Ableitung)
$f'(x_0) = 0$ → Kandidat für Extremum

### Hinreichende Bedingung (2. Ableitung)
- $f''(x_0) > 0$ → **lokales Minimum**
- $f''(x_0) < 0$ → **lokales Maximum**
- $f''(x_0) = 0$ → unklar, höhere Ableitungen prüfen

### Beispiel
$f(x) = x^3 - 3x + 2$

$f'(x) = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1$

$f''(x) = 6x$
- $f''(-1) = -6 < 0$ → **Maximum** bei $(-1, 4)$
- $f''(1) = 6 > 0$ → **Minimum** bei $(1, 0)$`,
      },
      {
        id: "m-kd-3",
        title: "Wendepunkte & Monotonie",
        duration: "18 min",
        type: "text",
        content: `## Wendepunkt

Die **Krümmung** ändert sich. Bedingung: $f''(x_0) = 0$ und $f'''(x_0) \\neq 0$.

### Beispiel
$f(x) = x^3 - 3x + 2$
$f''(x) = 6x = 0 \\Rightarrow x = 0$
$f'''(x) = 6 \\neq 0$ → Wendepunkt bei $(0, 2)$

## Monotonie

- $f'(x) > 0$: Funktion steigt
- $f'(x) < 0$: Funktion fällt
- $f'(x) = 0$: Extremstelle

## Krümmung

- $f''(x) > 0$: Linksgekrümmt (U-Form)
- $f''(x) < 0$: Rechtsgekrümmt (n-U-Form)`,
      },
      {
        id: "m-kd-4",
        title: "Quiz: Kurvendiskussion",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-kd-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Übe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-lgs",
    slug: "mathe-gleichungssysteme",
    title: "Lineare Gleichungssysteme",
    description: "Gauß-Verfahren, Einsetzen, Addieren, Cramersche Regel",
    icon: "↔️",
    color: "#06b6d4",
    category: "lineare-algebra",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: LGS

### Verfahren
1. **Einsetzen:** Eine Gleichung nach einer Variable auflösen
2. **Addition:** Gleichungen addieren, um Variable zu eliminieren
3. **Gauß:** Stufenform durch Zeilenumformung

### Cramersche Regel (2×2)
$x = \\frac{D_x}{D}$, $y = \\frac{D_y}{D}$

### Anzahl Lösungen
- **1 Lösung:** Gleichungen schneiden sich
- **∞ Lösungen:** Gleichungen sind identisch
- **0 Lösungen:** Gleichungen sind parallel`,
    lessons: [
      {
        id: "m-lgs-1",
        title: "Einsetzungsverfahren",
        duration: "15 min",
        type: "text",
        content: `## Einsetzungsverfahren

1. Aus einer Gleichung eine Variable isolieren
2. In die andere Gleichung einsetzen

### Beispiel
$\\begin{cases} 2x + y = 7 \\ x - y = 1 \\end{cases}$

Aus Gleichung 2: $x = y + 1$

Einsetzen in Gleichung 1: $2(y+1) + y = 7$
$2y + 2 + y = 7$
$3y = 5$
$y = \\frac{5}{3}$

Rückeinsetzen: $x = \\frac{5}{3} + 1 = \\frac{8}{3}$

Probe: $2 \\cdot \\frac{8}{3} + \\frac{5}{3} = \\frac{21}{3} = 7$ ✓`,
      },
      {
        id: "m-lgs-2",
        title: "Gauß-Verfahren",
        duration: "20 min",
        type: "text",
        content: `## Gauß-Verfahren

Systematische Methode durch Zeilenumformung.

### Beispiel
$\\begin{cases} x + y + z = 6 \\ 2x - y + z = 3 \\ x + 2y - z = 2 \\end{cases}$

**Schritt 1:** Zeile 2 - 2·Zeile 1, Zeile 3 - Zeile 1

$\\begin{cases} x + y + z = 6 \\ -3y - z = -9 \\ y - 2z = -4 \\end{cases}$

**Schritt 2:** Zeile 3 + $\\frac{1}{3}$·Zeile 2

$\\begin{cases} x + y + z = 6 \\ -3y - z = -9 \\ -\\frac{7}{3}z = -7 \\end{cases}$

**Rückwärts:** $z = 3$, $y = 2$, $x = 1$`,
      },
      {
        id: "m-lgs-3",
        title: "Quiz: Gleichungssysteme",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-lgs-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Übe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-matrizen",
    slug: "mathe-matrizen",
    title: "Matrizen & Determinanten",
    description: "Matrix-Operationen, Determinanten, Inverse Matrix",
    icon: "🔢",
    color: "#a855f7",
    category: "lineare-algebra",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Matrizen

### Operationen
- **Addition:** $(A+B)_{ij} = a_{ij} + b_{ij}$
- **Multiplikation:** $(AB)_{ij} = \\sum_k a_{ik} b_{kj}$
- **Transponiert:** $(A^T)_{ij} = a_{ji}$

### Determinante (2×2)
$\det\\begin{pmatrix}a&b\\c&d\\end{pmatrix} = ad - bc$

### Inverse (2×2)
$A^{-1} = \\frac{1}{\det A} \\begin{pmatrix}d&-b\\-c&a\\end{pmatrix}$`,
    lessons: [
      {
        id: "m-ma-1",
        title: "Matrix-Operationen",
        duration: "18 min",
        type: "text",
        content: `## Matrix-Operationen

Eine Matrix ist ein rechteckiges Zahlenfeld in Zeilen und Spalten.

### Notation
$A = \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix}$

Die Matrix hat 2 Zeilen und 2 Spalten → $2 \times 2$-Matrix.

### Addition

Matrizen gleicher Dimension werden elementweise addiert:

$\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} + \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix} = \begin{pmatrix} 6 & 8 \\ 10 & 12 \end{pmatrix}$

### Skalarmultiplikation

$2 \cdot \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} = \begin{pmatrix} 2 & 4 \\ 6 & 8 \end{pmatrix}$

### Matrixmultiplikation

$(AB)_{ij} = \sum_{k=1}^{n} a_{ik} \cdot b_{kj}$

**Beispiel:**

$\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} \cdot \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}$

$(AB)_{11} = 1 \cdot 5 + 2 \cdot 7 = 19$

$(AB)_{12} = 1 \cdot 6 + 2 \cdot 8 = 22$

$(AB)_{21} = 3 \cdot 5 + 4 \cdot 7 = 43$

$(AB)_{22} = 3 \cdot 6 + 4 \cdot 8 = 50$

**Ergebnis:** $\begin{pmatrix} 19 & 22 \\ 43 & 50 \end{pmatrix}$

### Transposition

$A^T$: Zeilen werden zu Spalten

$\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}^T = \begin{pmatrix} 1 & 3 \\ 2 & 4 \end{pmatrix}$

> **Merke:** Matrixmultiplikation ist NICHT kommutativ: $AB \neq BA$ im Allgemeinen!`,
      },
      {
        id: "m-ma-2",
        title: "Determinanten & Inverse",
        duration: "20 min",
        type: "text",
        content: `## Determinanten & Inverse

Die Determinante ist eine Zahl, die aus einer quadratischen Matrix berechnet wird. Sie sagt aus, ob die Matrix invertierbar ist.

### Determinante (2×2)

$\det(A) = \det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$

### Beispiel 1

$\det\begin{pmatrix} 3 & 1 \\ 2 & 4 \end{pmatrix} = 3 \cdot 4 - 1 \cdot 2 = 12 - 2 = 10$

### Determinante (3×3)

Für eine $3 \times 3$-Matrix wird nach der **Sarrus-Regel** oder **Laplace-Entwicklung** berechnet.

### Inverse Matrix

$A \cdot A^{-1} = I$ (Einheitsmatrix)

Für $2 \times 2$:

$A^{-1} = \frac{1}{\det(A)} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$

### Beispiel 2

$A = \begin{pmatrix} 3 & 1 \\ 2 & 4 \end{pmatrix}$, $\det(A) = 10$

$A^{-1} = \frac{1}{10} \begin{pmatrix} 4 & -1 \\ -2 & 3 \end{pmatrix} = \begin{pmatrix} 0{,}4 & -0{,}1 \\ -0{,}2 & 0{,}3 \end{pmatrix}$

### Wann existiert die Inverse?

Nur wenn $\det(A) \neq 0$! Ist $\det(A) = 0$, heißt die Matrix **singulär**.

### Anwendung: LGS lösen

$A \vec{x} = \vec{b} \Rightarrow \vec{x} = A^{-1} \vec{b}$

> **Merke:** det = 0 → keine Inverse → LGS hat keine oder unendlich viele Lösungen!`,
      },
      {
        id: "m-ma-3",
        title: "Quiz: Matrizen",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-ma-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Übe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-verteilungen",
    slug: "mathe-wahrscheinlichkeitsverteilungen",
    title: "Wahrscheinlichkeitsverteilungen",
    description: "Binomialverteilung, Normalverteilung, Poisson-Verteilung",
    icon: "📊",
    color: "#f59e0b",
    category: "stochastik",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Verteilungen

### Binomialverteilung
$P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}$
$E(X) = np$, $Var(X) = np(1-p)$

### Normalverteilung
$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$

### Poisson-Verteilung
$P(X=k) = \\frac{\\lambda^k}{k!} e^{-\\lambda}$
$E(X) = \\lambda$`,
    lessons: [
      {
        id: "m-vt-1",
        title: "Binomialverteilung",
        duration: "20 min",
        type: "text",
        content: `## Binomialverteilung

Die Binomialverteilung modelliert die Anzahl **erfolgreicher** Versuche bei $n$ unabhängigen Experimenten.

### Voraussetzungen

- **n** feste Versuche
- Jeder Versuch: **Erfolg** (Wahrscheinlichkeit $p$) oder **Misserfolg** ($1-p$)
- Versuche sind **unabhängig**
- **p** ist konstant

### Formel

$$P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$$

### Beispiel 1: Münzwurf

Münze 5-mal werfen. Wie wahrscheinlich sind genau 3 Köpfe?

$P(X=3) = \binom{5}{3} (0{,}5)^3 (0{,}5)^2 = 10 \cdot 0{,}125 \cdot 0{,}25 = 0{,}3125$

Also ca. 31%.

### Beispiel 2: Würfel

Würfel 10-mal. Wie wahrscheinlich sind genau 2 Sechsen?

$P(X=2) = \binom{10}{2} \left(\frac{1}{6}\right)^2 \left(\frac{5}{6}\right)^8$

$= 45 \cdot 0{,}0278 \cdot 0{,}2326 \approx 0{,}2907$

### Erwartungswert & Varianz

$E(X) = np$

$Var(X) = np(1-p)$

### Beispiel 3

Münze 100-mal: $E(X) = 100 \cdot 0{,}5 = 50$ Köpfe

$Var(X) = 100 \cdot 0{,}5 \cdot 0{,}5 = 25$, $\sigma = 5$

### Binomialkoeffizient

$\binom{n}{k} = \frac{n!}{k!(n-k)!}$

$\binom{5}{3} = \frac{5!}{3! \cdot 2!} = \frac{120}{6 \cdot 2} = 10$

> **Merke:** Binomialverteilung zählt Erfolge bei n Versuchen. $E(X) = np$ ist der erwartete Mittelwert!`,
      },
      {
        id: "m-vt-2",
        title: "Normalverteilung",
        duration: "20 min",
        type: "text",
        content: `## Normalverteilung

Die wichtigste **stetige** Verteilung. Glockenförmige Kurve.

### Parameter
- $\\mu$: Mittelwert (Lage)
- $\\sigma$: Standardabweichung (Streue)

### 68-95-99,7-Regel
- 68% der Werte liegen in $\\mu \\pm \\sigma$
- 95% in $\\mu \\pm 2\\sigma$
- 99,7% in $\\mu \\pm 3\\sigma$

### Standardnormalverteilung
$Z = \\frac{X - \\mu}{\\sigma}$ → $\\mu = 0$, $\\sigma = 1$

### Beispiel
Größe: $\\mu = 175$ cm, $\\sigma = 7$ cm
68% sind zwischen 168 und 182 cm groß.`,
      },
      {
        id: "m-vt-3",
        title: "Quiz: Verteilungen",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-vt-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Übe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-folgen",
    slug: "mathe-folgen-reihen",
    title: "Folgen & Reihen",
    description: "Arithmetische/geometrische Folgen und Reihen, Konvergenz",
    icon: "♾️",
    color: "#ec4899",
    category: "analysis",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Folgen & Reihen

### Arithmetische Folge
$a_n = a_1 + (n-1) \\cdot d$
$S_n = \\frac{n}{2}(a_1 + a_n)$

### Geometrische Folge
$a_n = a_1 \\cdot q^{n-1}$
$S_n = a_1 \\cdot \\frac{1-q^n}{1-q}$ (für $q \\neq 1$)

### Geometrische Reihe (unendlich)
$S = \\frac{a_1}{1-q}$ (nur für $|q| < 1$)`,
    lessons: [
      {
        id: "m-fr-1",
        title: "Arithmetische Folgen",
        duration: "15 min",
        type: "text",
        content: `## Arithmetische Folgen

Eine arithmetische Folge hat einen **konstanten Abstand** $d$ zwischen aufeinanderfolgenden Gliedern.

### Formel

$$a_n = a_1 + (n-1) \cdot d$$

### Beispiel 1

$3, 7, 11, 15, 19, ...$ → $a_1 = 3$, $d = 4$

$a_5 = 3 + (5-1) \cdot 4 = 3 + 16 = 19$

### Beispiel 2

Gerade Zahlen: $2, 4, 6, 8, ...$ → $a_1 = 2$, $d = 2$

$a_{10} = 2 + 9 \cdot 2 = 20$

## Partialsumme

Die Summe der ersten $n$ Glieder:

$$S_n = \frac{n}{2}(a_1 + a_n) = \frac{n}{2}(2a_1 + (n-1)d)$$

### Beispiel 3: Gauß'sche Summenformel

$1 + 2 + 3 + ... + 100 = ?$

$S_{100} = \frac{100}{2}(1 + 100) = 50 \cdot 101 = 5050$

### Beispiel 4

$5 + 8 + 11 + 14 + 17 = ?$

$S_5 = \frac{5}{2}(5 + 17) = \frac{5}{2} \cdot 22 = 55$

## Wichtige Eigenschaften

- **Differenz:** $a_{n+1} - a_n = d$ (konstant)
- **Graphisch:** Punkte liegen auf einer Geraden
- **Summe:** Wächst quadratisch mit $n$

> **Merke:** Arithmetische Folge = gleicher Abstand, Partialsumme = Durchschnitt × Anzahl!`,
      },
      {
        id: "m-fr-2",
        title: "Geometrische Folgen & Reihen",
        duration: "18 min",
        type: "text",
        content: `## Geometrische Folgen & Reihen

Eine geometrische Folge hat einen **konstanten Faktor** $q$ zwischen aufeinanderfolgenden Gliedern.

### Formel

$$a_n = a_1 \cdot q^{n-1}$$

### Beispiel 1

$2, 6, 18, 54, ...$ → $a_1 = 2$, $q = 3$

$a_4 = 2 \cdot 3^3 = 2 \cdot 27 = 54$

### Beispiel 2: Halbwertszeit

1000g einer Substanz, Halbwertszeit = 5 Jahre:

$a_n = 1000 \cdot \left(\frac{1}{2}\right)^{n/5}$

Nach 15 Jahren: $a_3 = 1000 \cdot \frac{1}{8} = 125g$

## Geometrische Reihe (endlich)

$$S_n = a_1 \cdot \frac{1-q^n}{1-q}$$ (für $q \neq 1$)

### Beispiel 3

$1 + 2 + 4 + 8 + 16 = ?$

$S_5 = 1 \cdot \frac{1-2^5}{1-2} = \frac{1-32}{-1} = 31$

## Unendliche geometrische Reihe

Wenn $|q| < 1$, dann konvergiert die Reihe:

$$S_\infty = \frac{a_1}{1-q}$$

### Beispiel 4

$1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots$

$S_\infty = \frac{1}{1-\frac{1}{2}} = 2$

### Beispiel 5: Periodische Dezimalzahlen

$0{,}333... = \frac{3}{10} + \frac{3}{100} + \frac{3}{1000} + \cdots = \frac{\frac{3}{10}}{1-\frac{1}{10}} = \frac{3}{9} = \frac{1}{3}$

> **Merke:** Geometrische Folge = gleicher Faktor. Unendliche Reihe konvergiert nur wenn $|q| < 1$!`,
      },
      {
        id: "m-fr-3",
        title: "Quiz: Folgen & Reihen",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-fr-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Übe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-anageo",
    slug: "mathe-analytische-geometrie",
    title: "Analytische Geometrie",
    description: "Geraden, Ebenen, Abstände im Raum",
    icon: "📏",
    color: "#06b6d4",
    category: "geometrie",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Analytische Geometrie

### Gerade im Raum
$\\vec{x} = \\vec{p} + t \\cdot \\vec{v}$

### Ebene
$\\vec{n} \\cdot (\\vec{x} - \\vec{p}) = 0$ oder $ax + by + cz = d$

### Abstand Punkt-Ebene
$d = \\frac{|\\vec{n} \\cdot (\\vec{a} - \\vec{p})|}{|\\vec{n}|}$

### Abstand Punkt-Gerade
$d = \\frac{|\\vec{v} \\times (\\vec{a} - \\vec{p})|}{|\\vec{v}|}$`,
    lessons: [
      {
        id: "m-ag-1",
        title: "Geraden im Raum",
        duration: "20 min",
        type: "text",
        content: `## Geraden im Raum

Im dreidimensionalen Raum werden Geraden durch einen **Stützvektor** und einen **Richtungsvektor** beschrieben.

### Parameterform

$$\vec{x} = \vec{p} + t \cdot \vec{v}$$

- $\vec{p}$: Stützvektor (Punkt auf der Geraden)
- $\vec{v}$: Richtungsvektor (Richtung der Geraden)
- $t$: Parameter (reelle Zahl)

### Beispiel 1

$\vec{x} = \begin{pmatrix}1\\2\\3\end{pmatrix} + t \cdot \begin{pmatrix}2\\-1\\1\end{pmatrix}$

Für $t = 0$: Punkt $(1, 2, 3)$

Für $t = 1$: Punkt $(1+2, 2-1, 3+1) = (3, 1, 4)$

Für $t = -1$: Punkt $(1-2, 2+1, 3-1) = (-1, 3, 2)$

### Koordinatenform

Aus der Parameterform erhält man die Koordinatengleichungen:

$x = 1 + 2t$, $y = 2 - t$, $z = 3 + t$

### Schnitt zweier Geraden

Gleichsetzen und $t_1$, $t_2$ lösen:

$\vec{p}_1 + t_1 \vec{v}_1 = \vec{p}_2 + t_2 \vec{v}_2$

### Beispiel 2

$g_1: \vec{x} = \begin{pmatrix}0\\0\\0\end{pmatrix} + t \begin{pmatrix}1\\1\\0\end{pmatrix}$

$g_2: \vec{x} = \begin{pmatrix}1\\0\\0\end{pmatrix} + s \begin{pmatrix}0\\1\\0\end{pmatrix}$

Gleichsetzen: $t = 1$, $t + 0 = 0 + s$ → $s = 1$

Schnittpunkt: $(1, 1, 0)$

### Lagebeziehungen

- **Schnitt:** Genau ein Punkt (Gleichungssystem lösbar)
- **Parallel:** $\vec{v}_1 = k \cdot \vec{v}_2$ (Richtungsvektoren proportional)
- **Windschief:** Weder parallel noch sich schneidend

> **Merke:** Gerade im Raum = Punkt + Richtung × Parameter. Schnitt = Gleichungssystem lösen!`,
      },
      {
        id: "m-ag-2",
        title: "Ebenen im Raum",
        duration: "20 min",
        type: "text",
        content: `## Ebene im Raum

### Parameterform
$\\vec{x} = \\vec{p} + r \\cdot \\vec{u} + s \\cdot \\vec{v}$

### Koordinatenform
$ax + by + cz = d$

$\\vec{n} = \\begin{pmatrix}a\\b\\c\\end{pmatrix}$ ist der **Normalenvektor**.

### Beispiel
$2x - y + 3z = 6$

Normalenvektor: $\\vec{n} = (2, -1, 3)$

## Abstand Punkt-Ebene

$d = \\frac{|ax_0 + by_0 + cz_0 - d|}{\\sqrt{a^2 + b^2 + c^2}}$

### Beispiel
Punkt $(1, 2, 3)$, Ebene $2x - y + 3z = 6$

$d = \\frac{|2 - 2 + 9 - 6|}{\\sqrt{4+1+9}} = \\frac{3}{\\sqrt{14}}$`,
      },
      {
        id: "m-ag-3",
        title: "Quiz: Analytische Geometrie",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-ag-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Übe das Gelernte!`,
      },
    ],
  },

  {
    id: "m-prozent",
    slug: "mathe-prozent-zinsen",
    title: "Prozent- & Zinsrechnung",
    description: "Prozente, Zinsen, Zinseszins, Prozentuale Änderungen",
    icon: "💰",
    color: "#10b981",
    category: "arithmetik-algebra",
    progress: 0,
    merkblatt: `## Merkblatt: Prozent- & Zinsrechnung

### Prozentwert
$p = W \\cdot \\frac{p\%}{100}$

### Zinsen
$Z = K \\cdot \\frac{p}{100} \\cdot \\frac{n}{12}$

### Zinseszins
$K_n = K_0 \\cdot (1 + \\frac{p}{100})^n$`,
    lessons: [
      {
        id: "m-pz-1",
        title: "Prozentrechnung",
        duration: "15 min",
        type: "text",
        content: `## Prozentrechnung

Prozente begegnen uns überall: Rabatte, Steuern, Zinsen. Die Grundformel ist einfach.

### Grundbegriffe

- **Grundwert (G):** Die Gesamtmenge (100%)
- **Prozentsatz (p%):** Der Anteil in Prozent
- **Prozentwert (W):** Der absolute Anteil

### Grundformel

$$W = G \cdot \frac{p}{100}$$

### Beispiel 1: Prozentwert berechnen

20% von 150€?

$W = 150 \cdot \frac{20}{100} = 150 \cdot 0{,}2 = 30€$

### Beispiel 2: Prozentualer Anteil

30 von 200 — wie viel Prozent?

$p = \frac{W}{G} \cdot 100 = \frac{30}{200} \cdot 100 = 15\%$

### Beispiel 3: Grundwert berechnen

40 sind 25% von was?

$G = \frac{W \cdot 100}{p} = \frac{40 \cdot 100}{25} = 160$

## Prozentuale Änderung

$\text{Änderung} = \frac{\text{Neu} - \text{Alt}}{\text{Alt}} \cdot 100\%$

### Beispiel 4: Preissteigerung

Preis steigt von 80€ auf 100€:

$\frac{100 - 80}{80} \cdot 100\% = \frac{20}{80} \cdot 100\% = 25\%$

### Beispiel 5: Rabatt

20% Rabatt auf 120€:

$120 \cdot 0{,}2 = 24€$ Rabatt

$120 - 24 = 96€$ Endpreis

> **Merke:** Prozentwert = Grundwert × Prozentsatz / 100. Die drei Formeln kann man alle aus der Grundformel ableiten!`,
      },
      {
        id: "m-pz-2",
        title: "Zinsen & Zinseszins",
        duration: "18 min",
        type: "text",
        content: `## Zinsen & Zinseszins

Zinsen sind der "Preis" für geliehenes Geld. Bei Zinseszinsen wächst das Geld exponentiell.

## Einfache Zinsen

$$Z = K \cdot \frac{p}{100} \cdot \frac{n}{12}$$

- $K$: Kapital
- $p$: Zinssatz (pro Jahr)
- $n$: Monate

### Beispiel 1

5000€ zu 4% für 6 Monate:

$Z = 5000 \cdot \frac{4}{100} \cdot \frac{6}{12} = 5000 \cdot 0{,}04 \cdot 0{,}5 = 100€$

## Zinseszins

Bei Zinseszinsen werden die Zinsen **mitverzinst** — das Geld wächst exponentiell!

$$K_n = K_0 \cdot \left(1 + \frac{p}{100}\right)^n$$

### Beispiel 2

1000€ zu 5% über 3 Jahre:

$K_3 = 1000 \cdot 1{,}05^3 = 1000 \cdot 1{,}157625 = 1157{,}63€$

Ohne Zinseszins wären es nur $1000 + 150 = 1150€$ — die 7,63€ Unterschied kommen von den Zinsen auf die Zinsen!

## Verdopplungszeit (72er-Regel)

$t \approx \frac{72}{p}$

Bei 6% Zinsen: $t \approx \frac{72}{6} = 12$ Jahre bis zur Verdopplung.

### Beispiel 3

10.000€ zu 8% — wann verdoppelt?

$t \approx \frac{72}{8} = 9$ Jahre → $K_9 \approx 10000 \cdot 1{,}08^9 \approx 19{,}990€$

> **Merke:** Einfache Zinsen = linear, Zinseszins = exponentiell. Die 72er-Regel ist eine schnelle Faustregel!`,
      },
      {
        id: "m-pz-3",
        title: "Quiz",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-pz-aufgaben",
        title: "Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Uebe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-koerper",
    slug: "mathe-koerper",
    title: "Koerper & Volumen",
    description: "Quader, Zylinder, Kegel, Kugel",
    icon: "🧊",
    color: "#06b6d4",
    category: "geometrie-trigonometrie",
    progress: 0,
    merkblatt: `## Merkblatt: Koerper

| Koerper | Volumen | Oberflaeche |
|---------|---------|-------------|
| Quader | $abc$ | $2(ab+bc+ac)$ |
| Wuerfel | $a^3$ | $6a^2$ |
| Zylinder | $\\pi r^2 h$ | $2\\pi r(r+h)$ |
| Kegel | $\\frac{1}{3}\\pi r^2 h$ | $\\pi r(r+s)$ |
| Kugel | $\\frac{4}{3}\\pi r^3$ | $4\\pi r^2$ |`,
    lessons: [
      {
        id: "m-ko-1",
        title: "Quader & Wuerfel",
        duration: "15 min",
        type: "text",
        content: `## Quader

Ein Quader hat 3 verschiedene Kantenlängen: a, b, c.

### Volumen
$V = a \cdot b \cdot c$

### Oberfläche
$O = 2(ab + bc + ac)$

### Raumdiagonale
$d = \sqrt{a^2 + b^2 + c^2}$

### Beispiel 1
$a=3$, $b=4$, $c=5$:

$V = 3 \cdot 4 \cdot 5 = 60$

$O = 2(12 + 20 + 15) = 2 \cdot 47 = 94$

$d = \sqrt{9 + 16 + 25} = \sqrt{50} \approx 7{,}07$

### Beispiel 2: Karton
Ein Karton ist 40cm × 30cm × 20cm. Wie viele Liter fasst er?

$V = 40 \cdot 30 \cdot 20 = 24.000$ cm³ $= 24$ Liter

## Würfel

Sonderfall des Quaders: alle Kanten gleich lang ($a = b = c$).

$V = a^3$, $O = 6a^2$, $d = a\sqrt{3}$

### Beispiel
$a = 4$: $V = 64$, $O = 96$, $d = 4\sqrt{3} \approx 6{,}93$`,
      },
      {
        id: "m-ko-2",
        title: "Zylinder, Kegel, Kugel",
        duration: "18 min",
        type: "text",
        content: `## Zylinder

Ein Zylinder hat einen kreisförmigen Querschnitt mit Radius r und Höhe h.

### Volumen
$V = \pi r^2 h$

### Oberfläche
$O = 2\pi r^2 + 2\pi r h = 2\pi r(r + h)$

### Beispiel
$r = 3$, $h = 10$:

$V = \pi \cdot 9 \cdot 10 = 90\pi \approx 282{,}7$

$O = 2\pi \cdot 3(3 + 10) = 78\pi \approx 245$

## Kegel

Ein Kegel hat eine Spitze. Radius r, Höhe h, Mantellinie s.

### Volumen
$V = \frac{1}{3}\pi r^2 h$

### Mantellinie
$s = \sqrt{r^2 + h^2}$

### Oberfläche
$O = \pi r^2 + \pi r s = \pi r(r + s)$

### Beispiel
$r = 4$, $h = 6$:

$V = \frac{1}{3}\pi \cdot 16 \cdot 6 = 32\pi \approx 100{,}5$

$s = \sqrt{16 + 36} = \sqrt{52} \approx 7{,}21$

> **Merke:** Kegel = $\frac{1}{3}$ des Zylinders mit gleicher Grundfläche und Höhe!

## Kugel

### Volumen
$V = \frac{4}{3}\pi r^3$

### Oberfläche
$O = 4\pi r^2$

### Beispiel
$r = 5$:

$V = \frac{4}{3}\pi \cdot 125 = \frac{500}{3}\pi \approx 523{,}6$

$O = 4\pi \cdot 25 = 100\pi \approx 314{,}2$`,
      },
      {
        id: "m-ko-3",
        title: "Quiz",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-ko-aufgaben",
        title: "Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Uebe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-kombinatorik",
    slug: "mathe-kombinatorik",
    title: "Kombinatorik",
    description: "Permutationen, Kombinationen, Variationen",
    icon: "🔀",
    color: "#f59e0b",
    category: "stochastik",
    progress: 0,
    merkblatt: `## Merkblatt: Kombinatorik

| Art | Formel |
|-----|--------|
| Permutation | $P(n) = n!$ |
| Variation | $V(n,k) = \\frac{n!}{(n-k)!}$ |
| Kombination | $C(n,k) = \\binom{n}{k}$ |`,
    lessons: [
      {
        id: "m-kb-1",
        title: "Permutationen & Variationen",
        duration: "18 min",
        type: "text",
        content: `## Permutation

Eine Permutation ist eine **Anordnung** von n Elementen. Die Reihenfolge ist wichtig!

### Formel
$P(n) = n!$ (n-Fakultät)

$5! = 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1 = 120$

### Beispiel 1: Bücherregal
3 Bücher (A, B, C) auf einem Regal anordnen:
$P(3) = 3! = 6$

Möglichkeiten: ABC, ACB, BAC, BCA, CAB, CBA

### Beispiel 2: PIN
Eine 4-stellige PIN mit den Ziffern 0-9:
Hier handelt es sich um eine **Variation mit Wiederholung**: $10^4 = 10.000$ Möglichkeiten

## Variation

**k** aus **n** Elementen auswählen, **Reihenfolge wichtig**:

$V(n,k) = \frac{n!}{(n-k)!}$

### Beispiel 1: Top 3
Die besten 3 aus 5 Schülern auswählen:
$V(5,3) = \frac{5!}{(5-3)!} = \frac{120}{2} = 60$ Möglichkeiten

### Beispiel 2: Medaillen
Gold, Silber, Bronze unter 8 Athleten:
$V(8,3) = \frac{8!}{5!} = 8 \cdot 7 \cdot 6 = 336$

> **Merke:** Permutation = alle Elemente, Variation = Auswahl. Bei beiden ist die Reihenfolge wichtig!`,
      },
      {
        id: "m-kb-2",
        title: "Kombinationen",
        duration: "15 min",
        type: "text",
        content: `## Kombination

Eine Kombination ist eine **Auswahl** von k aus n Elementen, bei der die **Reihenfolge egal** ist.

### Formel
$C(n,k) = \binom{n}{k} = \frac{n!}{k!(n-k)!}$

### Beispiel 1: Lotto
6 aus 49 Zahlen — Reihenfolge egal:
$\binom{49}{6} = \frac{49!}{6! \cdot 43!} = 13.983.816$

Die Chance auf den Jackpot ist also etwa 1 zu 14 Millionen!

### Beispiel 2: Eiscreme
3 Eissorten aus 8 wählen:
$\binom{8}{3} = \frac{8!}{3! \cdot 5!} = \frac{8 \cdot 7 \cdot 6}{3 \cdot 2 \cdot 1} = 56$

### Beispiel 3: Hände schütteln
In einer Runde mit 10 Personen schütteln alle einander die Hände. Wie viele Handshakes?
$\binom{10}{2} = \frac{10!}{2! \cdot 8!} = 45$

> **Merke:** Kombination = Auswahl ohne Reihenfolge. Variation = Auswahl mit Reihenfolge.`,
      },
      {
        id: "m-kb-3",
        title: "Quiz",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-kb-aufgaben",
        title: "Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Uebe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-logik",
    slug: "mathe-logik",
    title: "Logik & Beweise",
    description: "Aussagenlogik, Wahrheitstafeln, Beweistechniken",
    icon: "🧠",
    color: "#8b5cf6",
    category: "grundlagen",
    progress: 0,
    merkblatt: `## Merkblatt: Logik

### Verknuepfungen
- UND: $\\land$
- ODER: $\\lor$
- NICHT: $\\lnot$
- Implikation: $\\Rightarrow$

### De Morgan
$\\lnot(p \\land q) = \\lnot p \\lor \\lnot q$
$\\lnot(p \\lor q) = \\lnot p \\land \\lnot q$`,
    lessons: [
      {
        id: "m-lg-1",
        title: "Aussagenlogik",
        duration: "18 min",
        type: "text",
        content: `## Aussagenlogik

Die Aussagenlogik ist die Grundlage der Mathematik und Informatik. Sie untersucht, ob Aussagen **wahr** oder **falsch** sind.

### Was ist eine Aussage?

Eine Aussage ist ein Satz, der entweder **wahr (w)** oder **falsch (f)** ist — aber nicht beides.

- "2 + 3 = 5" → wahr ✓
- "Alle Primzahlen sind gerade" → falsch ✗ (3, 5, 7 sind ungerade)
- "x > 5" → **keine Aussage** (hängt von x ab)

### Logische Verknüpfungen

**UND ($\land$):** $p \land q$ ist nur wahr, wenn **beide** wahr sind.

| $p$ | $q$ | $p \land q$ |
|-----|-----|-------------|
| w | w | **w** |
| w | f | f |
| f | w | f |
| f | f | f |

**ODER ($\lor$):** $p \lor q$ ist wahr, wenn **mindestens eine** wahr ist.

| $p$ | $q$ | $p \lor q$ |
|-----|-----|------------|
| w | w | w |
| w | f | **w** |
| f | w | **w** |
| f | f | f |

**NICHT ($\lnot$):** Kehrt den Wahrheitswert um.

$\lnot w = f$, $\lnot f = w$

### Implikation ($\Rightarrow$)

$p \Rightarrow q$ bedeutet: "Wenn p, dann q."

| $p$ | $q$ | $p \Rightarrow q$ |
|-----|-----|-------------------|
| w | w | **w** |
| w | f | **f** |
| f | w | **w** |
| f | f | **w** |

**Merke:** Die Implikation ist nur falsch, wenn die Voraussetzung wahr und die Folge falsch ist!

### Beispiel

"Wenn es regnet ($p$), dann wird die Straße nass ($q$)."

- Es regnet und die Straße ist nass → wahr ✓
- Es regnet, aber die Straße ist trocken → falsch ✗
- Es regnet nicht, aber die Straße ist nass (Sprinkler) → trotzdem wahr!

### De Morgan'sche Regeln

$\lnot(p \land q) = \lnot p \lor \lnot q$

$\lnot(p \lor q) = \lnot p \land \lnot q$

"Nicht beide" = "Mindestens einer nicht" — das ist intuitiv!`,
      },
      {
        id: "m-lg-2",
        title: "Beweistechniken",
        duration: "20 min",
        type: "text",
        content: `## Beweistechniken

Beweise sind das Herzstück der Mathematik. Hier die wichtigsten Techniken.

### Direkter Beweis

Von der Voraussetzung Schritt für Schritt zum Ziel zeigen.

**Beispiel:** Sei n eine gerade Zahl. Dann ist $n^2$ auch gerade.

$n = 2k$ (Definition von gerade) → $n^2 = 4k^2 = 2(2k^2)$ → gerade ✓

### Indirekter Beweis (Widerspruch)

Annahme des **Gegenteils**, dann einen Widerspruch herleiten.

**Beispiel:** $\sqrt{2}$ ist irrational.

Annahme: $\sqrt{2} = \frac{p}{q}$ (ggT(p,q)=1)

$2q^2 = p^2$ → $p^2$ gerade → $p$ gerade → $p = 2k$

$2q^2 = 4k^2$ → $q^2 = 2k^2$ → $q$ auch gerade

Widerspruch: ggT(p,q) ≥ 2! ✓

### Vollständige Induktion (VI)

Für Aussagen über **alle natürlichen Zahlen**.

**Schritt 1 — Anfang:** Zeige für $n = 0$ (oder $n = 1$)

**Schritt 2 — Induktionsschritt:** Annahme für $n$, zeige für $n + 1$

**Beispiel:** $\sum_{k=1}^{n} k = \frac{n(n+1)}{2}$

**Anfang ($n=1$):** $1 = \frac{1 \cdot 2}{2} = 1$ ✓

**Schritt:** Angenommen für $n$. Dann:

$\sum_{k=1}^{n+1} k = \frac{n(n+1)}{2} + (n+1) = \frac{n(n+1) + 2(n+1)}{2} = \frac{(n+1)(n+2)}{2}$ ✓

### Kontraposition

Statt $p \Rightarrow q$ beweisen wir $\lnot q \Rightarrow \lnot p$.

**Beispiel:** Wenn $n^2$ ungerade, dann $n$ ungerade.

Kontraposition: Wenn $n$ gerade, dann $n^2$ gerade. (Einfacher zu beweisen!)

> **Merke:** VI funktioniert wie eine Kartenreihe — wenn jede Karte die nächste umstößt, fallen alle um!`,
      },
      {
        id: "m-lg-3",
        title: "Quiz",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-lg-aufgaben",
        title: "Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Uebe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-dreisatz",
    slug: "mathe-dreisatz",
    title: "Dreisatz",
    description: "Direkt & indirekt proportional, Dreisatz-Aufgaben",
    icon: "⚖️",
    color: "#ec4899",
    category: "arithmetik-algebra",
    progress: 0,
    merkblatt: `## Merkblatt: Dreisatz

### Direkt proportional
$a_1 : a_2 = b_1 : b_2$

### Indirekt proportional
$a_1 : a_2 = b_2 : b_1$`,
    lessons: [
      {
        id: "m-ds-1",
        title: "Direkt proportional",
        duration: "15 min",
        type: "text",
        content: `## Direkt proportional

Wenn eine Größe steigt, steigt die andere **im gleichen Verhältnis**. Das Verhältnis bleibt konstant.

### Schema
$a_1 \rightarrow b_1$
$a_2 \rightarrow b_2$

$b_2 = \frac{a_2 \cdot b_1}{a_1}$

### Beispiel 1: Äpfel
3 Äpfel kosten 2€. Was kosten 8 Äpfel?

$b_2 = \frac{8 \cdot 2}{3} = \frac{16}{3} = 5{,}33€$

### Beispiel 2: Benzin
5 Liter Benzin kosten 8,50€. Was kosten 12 Liter?

$b_2 = \frac{12 \cdot 8{,}50}{5} = \frac{102}{5} = 20{,}40€$

### Beispiel 3: Geschwindigkeit
Ein Auto fährt 60 km in 45 Minuten. Wie weit in 2 Stunden?

Erst umrechnen: 2 Stunden = 120 Minuten
$b_2 = \frac{120 \cdot 60}{45} = 160$ km

> **Merke:** Direkt proportional = $\frac{a_1}{b_1} = \frac{a_2}{b_2}$ (Verhältnis gleich)`,
      },
      {
        id: "m-ds-2",
        title: "Indirekt proportional",
        duration: "15 min",
        type: "text",
        content: `## Indirekt proportional

Wenn eine Größe steigt, sinkt die andere. Das **Produkt** bleibt konstant.

### Schema
$a_1 \rightarrow b_1$
$a_2 \rightarrow b_2$

$b_2 = \frac{a_1 \cdot b_1}{a_2}$

### Beispiel 1: Arbeiter
3 Arbeiter brauchen 10 Tage für eine Aufgabe. Wie lange brauchen 5 Arbeiter?

$b_2 = \frac{3 \cdot 10}{5} = 6$ Tage

Mehr Arbeiter = weniger Tage. Logisch!

### Beispiel 2: Geschwindigkeit
Wenn man 120 km mit 60 km/h in 2 Stunden schafft — wie lange braucht man mit 40 km/h?

$b_2 = \frac{60 \cdot 2}{40} = 3$ Stunden

Langsamer = mehr Zeit.

### Beispiel 3: Rohrleitung
Eine Rohrleitung füllt einen Tank in 8 Stunden. Eine zweite (doppelt so schnell) braucht...

$b_2 = \frac{8 \cdot 1}{2} = 4$ Stunden

> **Merke:** Indirekt proportional = $a_1 \cdot b_1 = a_2 \cdot b_2$ (Produkt gleich)`,
      },
      {
        id: "m-ds-3",
        title: "Quiz",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-ds-aufgaben",
        title: "Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Uebe das Gelernte!`,
      },
    ],
  },
  {
    id: "m-taylor",
    slug: "mathe-taylorreihen",
    title: "Taylorreihen",
    description: "Taylor- und Maclaurin-Reihen, wichtige Reihenentwicklungen",
    icon: "📐",
    color: "#a855f7",
    category: "analysis",
    progress: 0,
    merkblatt: `## Merkblatt: Taylorreihen

### Taylor-Reihe
$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n$

### Wichtige Reihen
- $e^x = \\sum x^n/n!$
- $\\sin(x) = \\sum (-1)^n x^{2n+1}/(2n+1)!$
- $\\cos(x) = \\sum (-1)^n x^{2n}/(2n)!$`,
    lessons: [
      {
        id: "m-tw-1",
        title: "Taylor-Reihe",
        duration: "20 min",
        type: "text",
        content: `## Taylor-Reihe

Die Taylor-Reihe ermöglicht es, eine Funktion durch ein **Polynom** (unendliche Summe) anzunähern. Das ist extrem nützlich für Berechnungen!

### Formel
$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n$

Für $a = 0$ heißt sie **Maclaurin-Reihe**.

### Beispiel: $e^x$

Alle Ableitungen von $e^x$ sind $e^x$. Also: $f^{(n)}(0) = 1$ für alle n.

$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \cdots$

### Näherung von $e$

$e = e^1 \approx 1 + 1 + \frac{1}{2} + \frac{1}{6} + \frac{1}{24} + \frac{1}{120} = 2{,}7167...$

Das wahre $e \approx 2{,}71828$ — schon nach 5 Gliedern ziemlich genau!

### Warum ist das nützlich?

Computer können nicht $e^x$ direkt berechnen. Sie verwenden stattdessen die Taylor-Reihe und berechnen eine endliche Anzahl von Gliedern.

> **Merke:** Taylor-Reihe = Funktion als unendliches Polynom. Je mehr Glieder, desto genauer.`,
      },
      {
        id: "m-tw-2",
        title: "Wichtige Reihen",
        duration: "18 min",
        type: "text",
        content: `## Wichtige Reihenentwicklungen

Diese Reihen kommen überall in der Mathematik und Physik vor. Sie lohnt es sich, sie zu kennen!

### Exponentialfunktion
$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots = \sum_{n=0}^{\infty} \frac{x^n}{n!}$

Konvergenzradius: $R = \infty$ (konvergiert für alle x)

### Sinus
$\sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots$

Nur ungerade Potenzen, Vorzeichen wechseln.

### Kosinus
$\cos(x) = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots$

Nur gerade Potenzen, Vorzeichen wechseln.

### Geometrische Reihe
$\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots$ für $|x| < 1$

### Natürlicher Logarithmus
$\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \cdots$ für $|x| < 1$

## Näherungen (kleines x)

Für kleine x-Werte reichen die ersten Glieder:

$\sin(x) \approx x - \frac{x^3}{6}$

$\cos(x) \approx 1 - \frac{x^2}{2}$

$e^x \approx 1 + x + \frac{x^2}{2}$

> **Merke:** Taylor-Reihen sind das Werkzeug, mit dem Computer trigonometrische Funktionen berechnen!`,
      },
      {
        id: "m-tw-3",
        title: "Quiz",
        duration: "8 min",
        type: "quiz",
        content: `Teste dein Wissen!`,
      },
      {
        id: "m-tw-aufgaben",
        title: "Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: `Uebe das Gelernte!`,
      },
    ],
  },
];

export const mathQuizzes: Record<string, QuizQuestion[]> = {
  "mathe-mengenlehre": [
    {
      question: "Was ist $A \\cap B$ wenn $A = \\{1, 2, 3\\}$ und $B = \\{2, 3, 4\\}$?",
      type: "input",
      correct: "{2, 3}",
      explanation: "Die Schnittmenge enthält alle Elemente, die in beiden Mengen sind.",
      hint: "Welche Zahlen kommen in beiden Mengen vor?",
    },
    {
      question: "Welche Menge enthält alle reellen Zahlen?",
      type: "multiple",
      options: ["$\\mathbb{N}$", "$\\mathbb{Z}$", "$\\mathbb{Q}$", "$\\mathbb{R}$"],
      correct: 3,
      explanation: "$\\mathbb{R}$ ist die Menge aller reellen Zahlen.",
    },
    {
      question: "Was bedeutet $\\forall x \\in \\mathbb{R}$?",
      type: "multiple",
      options: [
        "Es existiert ein x",
        "Für alle x",
        "Für kein x",
        "Es gibt genau ein x",
      ],
      correct: 1,
      explanation: "$\\forall$ ist der Allquantor und bedeutet 'für alle'.",
    },
  ],
  "mathe-funktionen": [
    {
      question: "Was ist der Definitionsbereich von $f(x) = \\sqrt{x}$?",
      type: "multiple",
      options: [
        "$x > 0$",
        "$x \\geq 0$",
        "$x \\in \\mathbb{R}$",
        "$x < 0$",
      ],
      correct: 1,
      explanation: "Die Quadratwurzel ist nur für nicht-negative Zahlen definiert.",
    },
    {
      question: "Welche Funktion ist gerade?",
      type: "multiple",
      options: ["$f(x) = x^3$", "$f(x) = x^2$", "$f(x) = x + 1$", "$f(x) = \\sin x$"],
      correct: 1,
      explanation: "Eine gerade Funktion erfüllt $f(-x) = f(x)$. Für $f(x) = x^2$ gilt: $(-x)^2 = x^2$.",
    },
  ],
  "mathe1-grenzwerte": [
    {
      question: "Was ist $\\lim_{x \\to 0} \\frac{\\sin x}{x}$?",
      type: "input",
      correct: "1",
      explanation: "Dies ist einer der wichtigsten Grenzwerte in der Analysis.",
      hint: "Denk an L'Hôpital oder die geometrische Interpretation.",
    },
    {
      question: "Welche Regel wendet man bei $\\frac{0}{0}$ an?",
      type: "multiple",
      options: [
        "Produktregel",
        "Kettenregel",
        "L'Hôpital",
        "Substitution",
      ],
      correct: 2,
      explanation: "L'Hôpital's Regel gilt für die Formen $\\frac{0}{0}$ oder $\\frac{\\infty}{\\infty}$.",
    },
  ],
  "mathe1-ableitungen": [
    {
      question: "Was ist die Ableitung von $f(x) = x^3$?",
      type: "input",
      correct: "3x^2",
      explanation: "Potenzregel: $(x^n)' = n \\cdot x^{n-1}$",
      hint: "Verwende die Potenzregel.",
    },
    {
      question: "Was ist $(\\sin x)'$?",
      type: "multiple",
      options: ["$\\cos x$", "$-\\cos x$", "$\\sin x$", "$-\\sin x$"],
      correct: 0,
      explanation: "Die Ableitung von $\\sin x$ ist $\\cos x$.",
    },
    {
      question: "Was ist die Kettenregel für $(f(g(x)))'$?",
      type: "multiple",
      options: [
        "$f'(x) \\cdot g'(x)$",
        "$f'(g(x)) \\cdot g'(x)$",
        "$f(g'(x)) \\cdot g'(x)$",
        "$f'(g(x)) \\cdot g(x)$",
      ],
      correct: 1,
      explanation: "Kettenregel: $(f(g(x)))' = f'(g(x)) \\cdot g'(x)$",
    },
  ],
  "mathe1-integration": [
    {
      question: "Was ist $\\int x^2 \\, dx$?",
      type: "input",
      correct: "x^3/3",
      explanation: "Stammfunktion von $x^n$ ist $\\frac{x^{n+1}}{n+1}$",
      hint: "Erhöhe den Exponenten um 1 und teile durch die neue Potenz.",
    },
    {
      question: "Was besagt der Hauptsatz der Analysis?",
      type: "multiple",
      options: [
        "$\\int_a^b f(x) dx = f(b) - f(a)$",
        "$\\int_a^b f(x) dx = F(b) - F(a)$ mit $F' = f$",
        "$\\int f'(x) dx = f(x)$",
        "Alle Antworten sind richtig",
      ],
      correct: 1,
      explanation: "Der Hauptsatz verknüpft Integration und Differentiation.",
    },
  ],
  "mathe1-reihen": [
    {
      question: "Was ist $\\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$?",
      type: "multiple",
      options: ["$\\sin x$", "$\\cos x$", "$e^x$", "$\\ln(1+x)$"],
      correct: 2,
      explanation: "Die Taylor-Reihe von $e^x$ ist $\\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$.",
    },
  ],
  "mathe2-vektoren": [
    {
      question: "Was ist $\\vec{u} \\cdot \\vec{v}$ für orthogonale Vektoren?",
      type: "input",
      correct: "0",
      explanation: "Bei orthogonalen Vektoren ist das Skalarprodukt 0.",
      hint: "Was bedeutet $\\cos(90°)$?",
    },
    {
      question: "Wie viele Komponenten hat ein Vektor in $\\mathbb{R}^3$?",
      type: "multiple",
      options: ["1", "2", "3", "4"],
      correct: 2,
      explanation: "Ein Vektor in $\\mathbb{R}^3$ hat 3 Komponenten.",
    },
  ],
  "mathe2-dgl": [
    {
      question: "Was ist die allgemeine Lösung von $y' = 2y$?",
      type: "input",
      correct: "Ce^{2x}",
      explanation: "Dies ist eine exponentielle Wachstumsgleichung.",
      hint: "Löse durch Trennung der Variablen.",
    },
    {
      question: "Wie lautet die charakteristische Gleichung für $y'' - 3y' + 2y = 0$?",
      type: "multiple",
      options: [
        "$r^2 - 3r + 2 = 0$",
        "$r^2 + 3r + 2 = 0$",
        "$r^2 - 3r - 2 = 0$",
        "$r^2 + 3r - 2 = 0$",
      ],
      correct: 0,
      explanation: "Die Koeffizienten der DGl werden direkt übernommen.",
    },
  ],

  // ==================== STOCHASTIK ====================
  "mathe-stochastik": [
    {
      question: "Ein fairer Würfel wird geworfen. Wie groß ist $P(\\text{ungerade Zahl})$?",
      type: "multiple",
      options: ["$\\frac{1}{6}$", "$\\frac{1}{3}$", "$\\frac{1}{2}$", "$\\frac{2}{3}$"],
      correct: 2,
      explanation: "Ungerade Zahlen: {1, 3, 5} = 3 von 6. Also $P = \\frac{3}{6} = \\frac{1}{2}$.",
    },
    {
      question: "Was ist $P(A \\cup B)$ wenn $P(A) = 0.4$, $P(B) = 0.3$ und A, B sind disjunkt?",
      type: "input",
      correct: "0.7",
      explanation: "Bei disjunkten Ereignissen: $P(A \\cup B) = P(A) + P(B) = 0.4 + 0.3 = 0.7$.",
      hint: "Disjunkt bedeutet $A \\cap B = \\emptyset$.",
    },
    {
      question: "Wie viele Möglichkeiten gibt es, 3 Bücher auf einem Regal anzuordnen?",
      type: "input",
      correct: "6",
      explanation: "Permutation: $3! = 3 \\cdot 2 \\cdot 1 = 6$.",
    },
    {
      question: "Was ist $\\binom{5}{2}$?",
      type: "input",
      correct: "10",
      explanation: "$\\binom{5}{2} = \\frac{5!}{2! \\cdot 3!} = \\frac{120}{2 \\cdot 6} = 10$.",
    },
    {
      question: "Wenn $P(A) = 0.6$ und $P(B|A) = 0.5$, was ist $P(A \\cap B)$?",
      type: "input",
      correct: "0.3",
      explanation: "Bedingte Wahrscheinlichkeit: $P(A \\cap B) = P(B|A) \\cdot P(A) = 0.5 \\cdot 0.6 = 0.3$.",
    },
  ],

  // ==================== KOMPLEXE ZAHLEN ====================
  "mathe-komplexe-zahlen": [
    {
      question: "Was ist $i^2$?",
      type: "input",
      correct: "-1",
      explanation: "Die imaginäre Einheit ist definiert als $i^2 = -1$.",
    },
    {
      question: "Berechne $(2 + 3i) + (1 - i)$.",
      type: "multiple",
      options: ["$3 + 2i$", "$3 + 4i$", "$1 + 2i$", "$3 - 2i$"],
      correct: 0,
      explanation: "Addition: $(2+1) + (3-1)i = 3 + 2i$.",
    },
    {
      question: "Was ist der Betrag von $z = 3 + 4i$?",
      type: "input",
      correct: "5",
      explanation: "$|z| = \\sqrt{3^2 + 4^2} = \\sqrt{9+16} = \\sqrt{25} = 5$.",
    },
    {
      question: "Was ist das konjugierte von $z = 2 - 5i$?",
      type: "multiple",
      options: ["$-2 + 5i$", "$2 + 5i$", "$-2 - 5i$", "$5 - 2i$"],
      correct: 1,
      explanation: "Das konjugierte $\\bar{z} = a - bi$ wird durch Vorzeichenwechsel des Imaginärteils gebildet: $2 + 5i$.",
    },
    {
      question: "In der Polardarstellung $z = r \\cdot e^{i\\varphi}$, was ist $r$?",
      type: "multiple",
      options: ["Der Realteil", "Der Imaginärteil", "Der Betrag $|z|$", "Das Argument"],
      correct: 2,
      explanation: "$r = |z|$ ist der Betrag der komplexen Zahl.",
    },
  ],

  // ==================== NUMERIK ====================
  "mathe-numerik": [
    {
      question: "Was ist der absolute Fehler für $x_{exakt} = 10$, $x_{approx} = 9.8$?",
      type: "input",
      correct: "0.2",
      explanation: "$|x_{exakt} - x_{approx}| = |10 - 9.8| = 0.2$.",
    },
    {
      question: "Beim Bisektionsverfahren halbiert sich das Intervall in jedem Schritt. Nach wie vielen Schritten ist das Intervall kleiner als $\\frac{1}{8}$ des ursprünglichen?",
      type: "input",
      correct: "3",
      explanation: "$\\frac{1}{2^3} = \\frac{1}{8}$, also nach 3 Schritten.",
    },
    {
      question: "Wie lautet die Newton-Iterationsformel?",
      type: "multiple",
      options: [
        "$x_{n+1} = x_n - f(x_n) \\cdot f'(x_n)$",
        "$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$",
        "$x_{n+1} = x_n + \\frac{f(x_n)}{f'(x_n)}$",
        "$x_{n+1} = \\frac{x_n + f(x_n)}{2}$",
      ],
      correct: 1,
      explanation: "Newton-Verfahren: $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$.",
    },
    {
      question: "Welche Konvergenzordnung hat das Newton-Verfahren (bei einfachen Nullstellen)?",
      type: "multiple",
      options: ["Linear", "Quadratisch", "Kubisch", "Logarithmisch"],
      correct: 1,
      explanation: "Das Newton-Verfahren hat quadratische Konvergenz (Ordnung 2).",
    },
    {
      question: "Newton: $f(x) = x^2 - 4$, $x_0 = 3$. Berechne $x_1$.",
      type: "input",
      correct: "2.1667",
      explanation: "$x_1 = 3 - \\frac{9-4}{6} = 3 - \\frac{5}{6} \\approx 2.1667$.",
    },
  ],

  // ==================== GEOMETRIE ====================
  "mathe-geometrie": [
    {
      question: "Was ist die Fläche eines Rechtecks mit $a = 6$ und $b = 4$?",
      type: "input",
      correct: "24",
      explanation: "$A = a \\cdot b = 6 \\cdot 4 = 24$.",
    },
    {
      question: "Was ist das Volumen einer Kugel mit Radius $r = 3$? Gib $\\pi$ als Faktor an (z.B. 36\\pi).",
      type: "input",
      correct: "36pi",
      explanation: "$V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot 27 = 36\\pi$.",
    },
    {
      question: "Im rechtwinkligen Dreieck: $a = 5$, $b = 12$. Was ist $c$?",
      type: "input",
      correct: "13",
      explanation: "Pythagoras: $c = \\sqrt{a^2 + b^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$.",
    },
    {
      question: "Was ist die Fläche eines Kreises mit Radius $r = 5$? Gib $\\pi$ als Faktor an.",
      type: "input",
      correct: "25pi",
      explanation: "$A = \\pi r^2 = 25\\pi$.",
    },
    {
      question: "Welche Formel beschreibt das Volumen eines Zylinders?",
      type: "multiple",
      options: [
        "$V = \\pi r^2$",
        "$V = \\pi r^2 h$",
        "$V = \\frac{1}{3}\\pi r^2 h$",
        "$V = \\frac{4}{3}\\pi r^3$",
      ],
      correct: 1,
      explanation: "Zylindervolumen: $V = \\pi r^2 h$.",
    },
  ],

  // ==================== TRIGONOMETRIE ====================
  "mathe-trigonometrie": [
    {
      question: "Was ist $\\sin(30°)$?",
      type: "multiple",
      options: ["$0$", "$\\frac{1}{2}$", "$\\frac{\\sqrt{2}}{2}$", "$1$"],
      correct: 1,
      explanation: "$\\sin(30°) = \\frac{1}{2}$.",
    },
    {
      question: "Was ist $\\cos(0°)$?",
      type: "input",
      correct: "1",
      explanation: "$\\cos(0°) = 1$.",
    },
    {
      question: "Im rechtwinkligen Dreieck: Gegenkathete $= 4$, Hypotenuse $= 5$. Was ist $\\sin(\\alpha)$?",
      type: "multiple",
      options: ["$\\frac{3}{5}$", "$\\frac{4}{5}$", "$\\frac{4}{3}$", "$\\frac{5}{4}$"],
      correct: 1,
      explanation: "$\\sin(\\alpha) = \\frac{\\text{Gegenkathete}}{\\text{Hypotenuse}} = \\frac{4}{5}$.",
    },
    {
      question: "Welche Identität gilt immer?",
      type: "multiple",
      options: [
        "$\\sin^2\\alpha + \\cos^2\\alpha = 2$",
        "$\\sin^2\\alpha + \\cos^2\\alpha = 1$",
        "$\\sin\\alpha + \\cos\\alpha = 1$",
        "$\\sin\\alpha \\cdot \\cos\\alpha = 1$",
      ],
      correct: 1,
      explanation: "Grundidentität: $\\sin^2\\alpha + \\cos^2\\alpha = 1$.",
    },
    {
      question: "Was ist $\\tan(45°)$?",
      type: "input",
      correct: "1",
      explanation: "$\\tan(45°) = \\frac{\\sin(45°)}{\\cos(45°)} = \\frac{\\sqrt{2}/2}{\\sqrt{2}/2} = 1$.",
    },
  ],

  // ==================== POTENZEN ====================
  "mathe-potenzen": [
    {
      question: "Was ist $2^3 \\cdot 2^4$?",
      type: "input",
      correct: "128",
      explanation: "$2^3 \\cdot 2^4 = 2^{3+4} = 2^7 = 128$.",
    },
    {
      question: "Was ist $\\log_2(16)$?",
      type: "input",
      correct: "4",
      explanation: "$2^4 = 16$, also $\\log_2(16) = 4$.",
    },
    {
      question: "Was ist $\\sqrt[3]{27}$?",
      type: "input",
      correct: "3",
      explanation: "$3^3 = 27$, also $\\sqrt[3]{27} = 3$.",
    },
    {
      question: "Welche Regel gilt: $\\log(a \\cdot b) = $ ...?",
      type: "multiple",
      options: [
        "$\\log(a) \\cdot \\log(b)$",
        "$\\log(a) + \\log(b)$",
        "$\\frac{\\log(a)}{\\log(b)}$",
        "$\\log(a) - \\log(b)$",
      ],
      correct: 1,
      explanation: "Produktregel des Logarithmus: $\\log(a \\cdot b) = \\log(a) + \\log(b)$.",
    },
    {
      question: "Was ist $5^0$?",
      type: "input",
      correct: "1",
      explanation: "Jede Zahl (außer 0) hoch 0 ist 1: $a^0 = 1$.",
    },
  ],

  // ==================== STATISTIK ====================
  "mathe-statistik": [
    {
      question: "Was ist der Mittelwert von $2, 4, 6, 8, 10$?",
      type: "input",
      correct: "6",
      explanation: "$\\bar{x} = \\frac{2+4+6+8+10}{5} = \\frac{30}{5} = 6$.",
    },
    {
      question: "Was ist der Median von $3, 7, 9, 12, 15$?",
      type: "input",
      correct: "9",
      explanation: "Sortiert: Der mittlere Wert (3. von 5) ist 9.",
    },
    {
      question: "Daten: $1, 3, 5, 7, 9$. Was ist die Varianz $s^2$?",
      type: "input",
      correct: "8",
      explanation: "$\\bar{x} = 5$. $s^2 = \\frac{(1-5)^2+(3-5)^2+(5-5)^2+(7-5)^2+(9-5)^2}{5} = \\frac{16+4+0+4+16}{5} = 8$.",
    },
    {
      question: "Was ist die Standardabweichung wenn die Varianz $s^2 = 9$ ist?",
      type: "input",
      correct: "3",
      explanation: "$s = \\sqrt{s^2} = \\sqrt{9} = 3$.",
    },
    {
      question: "Was gibt der Interquartilsabstand $IQR$ an?",
      type: "multiple",
      options: [
        "Den Mittelwert",
        "Die Spannweite",
        "Die Streubreite des mittleren 50%",
        "Den häufigsten Wert",
      ],
      correct: 2,
      explanation: "$IQR = Q_3 - Q_1$ beschreibt die Streubreite des mittleren 50% der Daten.",
    },
  ],

  "mathe-bruchrechnen": [
    {
      question: "Was ist $\\frac{1}{2} + \\frac{1}{3}$?",
      type: "multiple",
      options: ["$\\frac{2}{5}$", "$\\frac{5}{6}$", "$\\frac{1}{5}$", "$\\frac{3}{5}$"],
      correct: 1,
      explanation: "$\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$",
    },
    {
      question: "Was ist $\\frac{2}{3} \\cdot \\frac{3}{4}$?",
      type: "multiple",
      options: ["$\\frac{6}{12}$", "$\\frac{1}{2}$", "$\\frac{5}{7}$", "$\\frac{8}{9}$"],
      correct: 1,
      explanation: "$\\frac{2}{3} \\cdot \\frac{3}{4} = \\frac{6}{12} = \\frac{1}{2}$",
    },
    {
      question: "Welcher Bruch ist gleich $0{,}75$?",
      type: "multiple",
      options: ["$\\frac{1}{4}$", "$\\frac{1}{2}$", "$\\frac{3}{4}$", "$\\frac{2}{3}$"],
      correct: 2,
      explanation: "$\\frac{3}{4} = 0{,}75$",
    },
    {
      question: "$\\frac{5}{8} : \\frac{5}{4} = ?$",
      type: "multiple",
      options: ["$\\frac{1}{2}$", "$\\frac{25}{32}$", "$\\frac{1}{4}$", "$\\frac{5}{2}$"],
      correct: 0,
      explanation: "$\\frac{5}{8} \\cdot \\frac{4}{5} = \\frac{20}{40} = \\frac{1}{2}$",
    },
    {
      question: "Was ist $\\frac{7}{12} - \\frac{1}{4}$?",
      type: "multiple",
      options: ["$\\frac{1}{3}$", "$\\frac{6}{8}$", "$\\frac{1}{2}$", "$\\frac{4}{12}$"],
      correct: 0,
      explanation: "$\\frac{7}{12} - \\frac{3}{12} = \\frac{4}{12} = \\frac{1}{3}$",
    },
  ],
  "mathe-gleichungen": [
    {
      question: "Löse $3x + 9 = 0$",
      type: "multiple",
      options: ["$x = 3$", "$x = -3$", "$x = 9$", "$x = -9$"],
      correct: 1,
      explanation: "$3x = -9 \\Rightarrow x = -3$",
    },
    {
      question: "Welche Formel löst $x^2 + px + q = 0$?",
      type: "multiple",
      options: ["Mitternachtsformel", "pq-Formel", "Euler-Formel", "abc-Formel"],
      correct: 1,
      explanation: "Die pq-Formel löst quadratische Gleichungen in Normalform.",
    },
    {
      question: "Diskriminante von $x^2 - 4x + 4 = 0$?",
      type: "multiple",
      options: ["$D = 0$", "$D = 4$", "$D = -4$", "$D = 8$"],
      correct: 0,
      explanation: "$D = 16 - 16 = 0$ → doppelte Lösung",
    },
    {
      question: "Nullstellen von $x^2 - 9 = 0$?",
      type: "multiple",
      options: ["$x = 3$", "$x = \\pm 3$", "$x = 9$", "$x = \\pm 9$"],
      correct: 1,
      explanation: "$x^2 = 9 \\Rightarrow x = \\pm 3$",
    },
    {
      question: "Wie viele Lösungen hat $x^2 + 2x + 5 = 0$?",
      type: "multiple",
      options: ["0", "1", "2", "3"],
      correct: 0,
      explanation: "$D = 4 - 20 = -16 < 0$ → keine reelle Lösung",
    },
  ],
  "mathe-termumformung": [
    {
      question: "$(a-b)^2 = ?$",
      type: "multiple",
      options: ["$a^2 - b^2$", "$a^2 - 2ab + b^2$", "$a^2 + 2ab + b^2$", "$a^2 + b^2$"],
      correct: 1,
      explanation: "2. binomische Formel: $(a-b)^2 = a^2 - 2ab + b^2$",
    },
    {
      question: "$(x+4)(x-4) = ?$",
      type: "multiple",
      options: ["$x^2 - 16$", "$x^2 + 16$", "$x^2 - 8x + 16$", "$x^2 + 8x - 16$"],
      correct: 0,
      explanation: "3. binomische Formel: $(a+b)(a-b) = a^2 - b^2$",
    },
    {
      question: "$2(x+3) = ?$",
      type: "multiple",
      options: ["$2x + 3$", "$2x + 6$", "$x + 6$", "$2x + 5$"],
      correct: 1,
      explanation: "Distributivgesetz: $2 \\cdot x + 2 \\cdot 3 = 2x + 6$",
    },
    {
      question: "$x^2 - 25 = ?$ (faktorisiert)",
      type: "multiple",
      options: ["$(x-5)^2$", "$(x+5)(x-5)$", "$(x+5)^2$", "$(x-25)(x+1)$"],
      correct: 1,
      explanation: "$x^2 - 25 = (x+5)(x-5)$ — Differenz der Quadrate",
    },
    {
      question: "$(2x+3)^2 = ?$",
      type: "multiple",
      options: ["$4x^2 + 9$", "$4x^2 + 12x + 9$", "$4x^2 + 6x + 9$", "$2x^2 + 12x + 9$"],
      correct: 1,
      explanation: "$(2x+3)^2 = 4x^2 + 12x + 9$",
    },
  ],
  "mathe-ungleichungen": [
    {
      question: "Löse $-2x > 6$",
      type: "multiple",
      options: ["$x > -3$", "$x < -3$", "$x > 3$", "$x < 3$"],
      correct: 1,
      explanation: "Division durch -2: Vorzeichen wechseln! $x < -3$",
    },
    {
      question: "Was bedeutet $[2, 5)$?",
      type: "multiple",
      options: ["$2 < x < 5$", "$2 \\leq x < 5$", "$2 < x \\leq 5$", "$2 \\leq x \\leq 5$"],
      correct: 1,
      explanation: "$[2, 5)$ = $2 \\leq x < 5$ (geschlossen bei 2, offen bei 5)",
    },
    {
      question: "Löse $x^2 - 1 \\leq 0$",
      type: "multiple",
      options: ["$-1 \\leq x \\leq 1$", "$x \\leq -1$ oder $x \\geq 1$", "$x < 1$", "$x > -1$"],
      correct: 0,
      explanation: "$(x-1)(x+1) \\leq 0 \\Rightarrow -1 \\leq x \\leq 1$",
    },
    {
      question: "Löse $3x - 1 \\geq 5$",
      type: "multiple",
      options: ["$x \\geq 2$", "$x > 2$", "$x \\geq \\frac{4}{3}$", "$x \\geq 6$"],
      correct: 0,
      explanation: "$3x \\geq 6 \\Rightarrow x \\geq 2$",
    },
    {
      question: "$|x| < 3$ bedeutet:",
      type: "multiple",
      options: ["$x < 3$", "$x > -3$", "$-3 < x < 3$", "$x < -3$ oder $x > 3$"],
      correct: 2,
      explanation: "$|x| < a \\Leftrightarrow -a < x < a$",
    },
  ],
  "mathe-kurvendiskussion": [
    {
      question: "$f(x) = x^3$. Wo ist der Wendepunkt?",
      type: "multiple",
      options: ["Bei $x = 0$", "Bei $x = 1$", "Kein Wendepunkt", "Bei $x = -1$"],
      correct: 0,
      explanation: "$f''(x) = 6x = 0 \\Rightarrow x = 0$, $f'''(0) = 6 \\neq 0$",
    },
    {
      question: "Was gilt bei einem lokalen Maximum?",
      type: "multiple",
      options: ["$f'(x) = 0$, $f''(x) > 0$", "$f'(x) = 0$, $f''(x) < 0$", "$f''(x) = 0$", "$f(x) = 0$"],
      correct: 1,
      explanation: "Maximum: $f'(x_0) = 0$ und $f''(x_0) < 0$",
    },
    {
      question: "Monotonie: Wann fällt $f$?",
      type: "multiple",
      options: ["$f'(x) > 0$", "$f'(x) < 0$", "$f''(x) < 0$", "$f(x) < 0$"],
      correct: 1,
      explanation: "$f'(x) < 0$ → $f$ ist fallend",
    },
    {
      question: "$f(x) = x^2 - 2x + 1$. Minimum bei x = ?",
      type: "multiple",
      options: ["$x = 0$", "$x = 1$", "$x = -1$", "$x = 2$"],
      correct: 1,
      explanation: "$f(x) = (x-1)^2$ → Minimum bei $x = 1$ mit $f(1) = 0$",
    },
    {
      question: "Krümmung bei $f''(x) > 0$:",
      type: "multiple",
      options: ["Rechtsgekrümmt", "Linksgekrümmt", "Linear", "Keine Krümmung"],
      correct: 1,
      explanation: "$f''(x) > 0$ → linksgekrümmt (U-Form)",
    },
  ],
  "mathe-gleichungssysteme": [
    {
      question: "Wie viele Lösungen hat ein LGS mit 2 Gleichungen und 2 Unbekannten normalerweise?",
      type: "multiple",
      options: ["0, 1 oder unendlich", "Immer 1", "Immer 2", "Immer unendlich"],
      correct: 0,
      explanation: "Je nach Schnitt: 0 (parallel), 1 (Schnittpunkt), oder unendlich (identisch)",
    },
    {
      question: "Gauß-Verfahren arbeitet mit...",
      type: "multiple",
      options: ["Determinanten", "Zeilenumformungen", "Graphen", "Ableitungen"],
      correct: 1,
      explanation: "Gauß: Zeilenumformungen zum Lösen des Systems",
    },
    {
      question: "$x + y = 3$, $x - y = 1$. Lösung?",
      type: "multiple",
      options: ["$(2, 1)$", "$(1, 2)$", "$(3, 0)$", "$(0, 3)$"],
      correct: 0,
      explanation: "Addition: $2x = 4 \\Rightarrow x = 2$, $y = 1$",
    },
    {
      question: "Cramersche Regel nutzt...",
      type: "multiple",
      options: ["Summen", "Determinanten", "Ableitungen", "Integrale"],
      correct: 1,
      explanation: "Cramer: $x = D_x / D$ mit Determinanten",
    },
    {
      question: "Homogenes LGS hat immer...",
      type: "multiple",
      options: ["Keine Lösung", "Genau eine Lösung", "Mindestens die Nulllösung", "Unendlich viele"],
      correct: 2,
      explanation: "Homogen: $A\\vec{x} = \\vec{0}$ hat immer die Triviallösung $\\vec{x} = \\vec{0}$",
    },
  ],
  "mathe-matrizen": [
    {
      question: "Produkt einer $(2 \\times 3)$ und $(3 \\times 2)$ Matrix hat Dimension...",
      type: "multiple",
      options: ["$(2 \\times 2)$", "$(3 \\times 3)$", "$(2 \\times 3)$", "$(3 \\times 2)$"],
      correct: 0,
      explanation: "$(m \\times n) \\cdot (n \\times p) = (m \\times p)$ → $(2 \\times 2)$",
    },
    {
      question: "Einheitsmatrix: Alle Diagonalelemente sind...",
      type: "multiple",
      options: ["0", "1", "-1", "beliebig"],
      correct: 1,
      explanation: "Einheitsmatrix $I$: Diagonale = 1, Rest = 0",
    },
    {
      question: "$\det(A) = 0$ bedeutet...",
      type: "multiple",
      options: ["A ist invertierbar", "A ist nicht invertierbar", "A = 0", "A ist symmetrisch"],
      correct: 1,
      explanation: "$\det(A) = 0$ → singulär → keine Inverse",
    },
    {
      question: "$(AB)^T = ?$",
      type: "multiple",
      options: ["$A^T B^T$", "$B^T A^T$", "$AB$", "$(BA)^T$"],
      correct: 1,
      explanation: "Transponiert: $(AB)^T = B^T A^T$ (Reihenfolge dreht sich um!)",
    },
    {
      question: "Spur einer Matrix = ?",
      type: "multiple",
      options: ["Determinante", "Summe der Diagonalelemente", "Anzahl Zeilen", "Rang"],
      correct: 1,
      explanation: "$\\text{tr}(A) = \\sum a_{ii}$ — Summe der Hauptdiagonale",
    },
  ],
  "mathe-wahrscheinlichkeitsverteilungen": [
    {
      question: "Binomialverteilung: Voraussetzung?",
      type: "multiple",
      options: ["Stetige Werte", "Feste Anzahl Versuche, Erfolg/Misserfolg", "Normalverteilte Daten", "Unendliche Versuche"],
      correct: 1,
      explanation: "Binomial: n feste Bernoulli-Versuche mit konstantem p",
    },
    {
      question: "Normalverteilung: 95% der Werte in...",
      type: "multiple",
      options: ["$\\mu \\pm \\sigma$", "$\\mu \\pm 2\\sigma$", "$\\mu \\pm 3\\sigma$", "$\\mu \\pm 4\\sigma$"],
      correct: 1,
      explanation: "68-95-99,7-Regel: 95% in $\\mu \\pm 2\\sigma$",
    },
    {
      question: "$Bin(20, 0{,}5)$. Erwartungswert?",
      type: "multiple",
      options: ["5", "10", "15", "20"],
      correct: 1,
      explanation: "$E(X) = np = 20 \\cdot 0{,}5 = 10$",
    },
    {
      question: "Poisson-Verteilung nutzt man für...",
      type: "multiple",
      options: ["Stetige Daten", "Seltene Ereignisse", "Normalverteilte Daten", "Ordinaldaten"],
      correct: 1,
      explanation: "Poisson modelliert seltene Ereignisse in festen Intervallen",
    },
    {
      question: "Standardabweichung = ?",
      type: "multiple",
      options: ["Varianz²", "√Varianz", "Erwartungswert²", "Mittelwert"],
      correct: 1,
      explanation: "$\\sigma = \\sqrt{Var(X)}$",
    },
  ],
  "mathe-folgen-reihen": [
    {
      question: "Arithmetische Folge: $a_1 = 2$, $d = 3$. $a_5 = ?$",
      type: "multiple",
      options: ["11", "14", "17", "8"],
      correct: 1,
      explanation: "$a_5 = 2 + 4 \\cdot 3 = 14$",
    },
    {
      question: "Geometrische Reihe konvergiert wenn...",
      type: "multiple",
      options: ["$|q| > 1$", "$|q| < 1$", "$q = 1$", "$q = 0$"],
      correct: 1,
      explanation: "Geometrische Reihe: $S = \\frac{a_1}{1-q}$ nur für $|q| < 1$",
    },
    {
      question: "$\\sum_{n=1}^{100} n = ?$",
      type: "multiple",
      options: ["5000", "5050", "5100", "4950"],
      correct: 1,
      explanation: "$\\frac{100 \\cdot 101}{2} = 5050$",
    },
    {
      question: "Harmonische Reihe...",
      type: "multiple",
      options: ["Konvergiert", "Divergiert", "Ist endlich", "Ist alternierend"],
      correct: 1,
      explanation: "$\\sum \\frac{1}{n}$ divergiert (bekanntes Ergebnis)",
    },
    {
      question: "Grenzwert von $\\frac{1}{n}$ für $n \to \\infty$?",
      type: "multiple",
      options: ["1", "0", "$\\infty$", "-1"],
      correct: 1,
      explanation: "$\\lim_{n \to \\infty} \\frac{1}{n} = 0$",
    },
  ],
  "mathe-analytische-geometrie": [
    {
      question: "Gerade: $\\vec{x} = \\vec{p} + t \\cdot \\vec{v}$. $\\vec{p}$ ist der...",
      type: "multiple",
      options: ["Richtungsvektor", "Stützvektor", "Normalenvektor", "Ortsvektor"],
      correct: 1,
      explanation: "$\\vec{p}$ = Stützvektor (Punkt auf der Geraden)",
    },
    {
      question: "Ebene $ax + by + cz = d$. Normalenvektor?",
      type: "multiple",
      options: ["$(a, b, c)$", "$(d, b, c)$", "$(-a, -b, -c)$", "$(1, 1, 1)$"],
      correct: 0,
      explanation: "$\\vec{n} = (a, b, c)$ ist der Normalenvektor der Ebene",
    },
    {
      question: "Zwei Ebenen sind parallel wenn...",
      type: "multiple",
      options: ["Gleicher Normalenvektor (bis auf Skalar)", "Gleicher Abstand", "Verschiedene d", "Orthogonal"],
      correct: 0,
      explanation: "Parallel: $\\vec{n}_1 = k \\cdot \\vec{n}_2$",
    },
    {
      question: "Abstand Ursprung zur Ebene $2x + y - 2z = 6$?",
      type: "multiple",
      options: ["2", "3", "6", "$\\sqrt{9}$"],
      correct: 0,
      explanation: "$d = \\frac{|0+0+0-6|}{\\sqrt{4+1+4}} = \\frac{6}{3} = 2$",
    },
    {
      question: "Schnitt von Gerade und Ebene: Wie löst man?",
      type: "multiple",
      options: ["Gleichsetzen und t berechnen", "Abstand berechnen", "Kreuzprodukt", "Determinante"],
      correct: 0,
      explanation: "Parameterform in Koordinatenform einsetzen und nach t auflösen",
    },
  ],

  "mathe-prozent-zinsen": [
    { question: "20% von 150?", type: "multiple", options: ["20", "25", "30", "35"], correct: 2, explanation: "$150 \\cdot 0.2 = 30$" },
    { question: "Zinseszins: 1000, 5%, 2J?", type: "multiple", options: ["1100", "1102.50", "1050", "1150"], correct: 1, explanation: "$1000 \\cdot 1.05^2 = 1102.50$" },
    { question: "72er-Regel bei 8%?", type: "multiple", options: ["6J", "9J", "12J", "18J"], correct: 1, explanation: "$72 / 8 = 9$ Jahre" },
    { question: "Preis 200->250. Prozent?", type: "multiple", options: ["20%", "25%", "30%", "15%"], correct: 1, explanation: "$50/200 = 25\%$" },
    { question: "15% Rabatt auf 80?", type: "multiple", options: ["12", "68", "65", "15"], correct: 1, explanation: "$80 - 12 = 68$" },
  ],
  "mathe-koerper": [
    { question: "Volumen Quader 3x4x5?", type: "multiple", options: ["47", "60", "94", "12"], correct: 1, explanation: "$3 \\cdot 4 \\cdot 5 = 60$" },
    { question: "Oberflaeche Wuerfel a=2?", type: "multiple", options: ["8", "12", "24", "16"], correct: 2, explanation: "$6 \\cdot 4 = 24$" },
    { question: "Kugel-Volumen r=3?", type: "multiple", options: ["$36\\pi$", "$27\\pi$", "$108\\pi$", "$9\\pi$"], correct: 0, explanation: "$\\frac{4}{3}\\pi \\cdot 27 = 36\\pi$" },
    { question: "Zylinder r=2, h=5?", type: "multiple", options: ["$10\\pi$", "$20\\pi$", "$40\\pi$", "$50\\pi$"], correct: 1, explanation: "$\\pi \\cdot 4 \\cdot 5 = 20\\pi$" },
    { question: "Kegel = ? des Zylinders", type: "multiple", options: ["1/2", "1/3", "1/4", "2/3"], correct: 1, explanation: "$V = \\frac{1}{3}V_{Zyl}$" },
  ],
  "mathe-kombinatorik": [
    { question: "$P(4) = ?$", type: "multiple", options: ["12", "16", "24", "8"], correct: 2, explanation: "$4! = 24$" },
    { question: "$\\binom{5}{2} = ?$", type: "multiple", options: ["5", "10", "20", "15"], correct: 1, explanation: "$\\frac{5!}{2! \\cdot 3!} = 10$" },
    { question: "Lotto 6 aus 49?", type: "multiple", options: ["13983816", "1000000", "49!", "$6^{49}$"], correct: 0, explanation: "$\\binom{49}{6} = 13.983.816$" },
    { question: "$V(5,2) = ?$", type: "multiple", options: ["10", "20", "25", "15"], correct: 1, explanation: "$\\frac{5!}{3!} = 20$" },
    { question: "Permutationen AABB?", type: "multiple", options: ["24", "12", "6", "4"], correct: 2, explanation: "$\\frac{4!}{2!2!} = 6$" },
  ],
  "mathe-logik": [
    { question: "$p \\Rightarrow q$ falsch wenn...", type: "multiple", options: ["p w, q f", "p f, q w", "beide f", "beide w"], correct: 0, explanation: "Implikation nur falsch bei (w,f)" },
    { question: "$\\lnot(p \\land q) = ?$", type: "multiple", options: ["$\\lnot p \\land \\lnot q$", "$\\lnot p \\lor \\lnot q$", "$p \\lor q$", "$p \\land q$"], correct: 1, explanation: "De Morgan" },
    { question: "Kontraposition von $p \\Rightarrow q$?", type: "multiple", options: ["$q \\Rightarrow p$", "$\\lnot p \\Rightarrow \\lnot q$", "$\\lnot q \\Rightarrow \\lnot p$", "$\\lnot p \\lor q$"], correct: 2, explanation: "Kontraposition: $\\lnot q \\Rightarrow \\lnot p$" },
    { question: "VI-Schritt?", type: "multiple", options: ["Anfang", "n -> n+1", "Widerspruch", "Gegenbeispiel"], correct: 1, explanation: "Induktionsschritt" },
    { question: "$p \\lor \\lnot p$ ist immer...", type: "multiple", options: ["Falsch", "Wahr", "Unbestimmt", "Kontingenz"], correct: 1, explanation: "Tautologie" },
  ],
  "mathe-dreisatz": [
    { question: "5 Arb., 8 Tage. 2 Arb.?", type: "multiple", options: ["3", "20", "10", "16"], correct: 1, explanation: "$\\frac{5 \\cdot 8}{2} = 20$" },
    { question: "4L = 6 Euro. 10L?", type: "multiple", options: ["12", "15", "16", "24"], correct: 1, explanation: "$\\frac{10 \\cdot 6}{4} = 15$" },
    { question: "Direkt proportional?", type: "multiple", options: ["Verhaeltnis", "Produkt", "Summe", "Differenz"], correct: 0, explanation: "a1/b1 = a2/b2" },
    { question: "6 Masch., 12h. 4 Masch.?", type: "multiple", options: ["8", "16", "18", "24"], correct: 2, explanation: "$\\frac{6 \\cdot 12}{4} = 18$" },
    { question: "30% von 200?", type: "multiple", options: ["40", "50", "60", "70"], correct: 2, explanation: "$200 \\cdot 0.3 = 60$" },
  ],
  "mathe-taylorreihen": [
    { question: "Taylor bei a=0?", type: "multiple", options: ["Taylor", "Maclaurin", "Fourier", "Laurent"], correct: 1, explanation: "Maclaurin-Reihe" },
    { question: "$e^x \approx ?$ (1. Ord.)", type: "multiple", options: ["$1+x$", "$x$", "$1+x^2$", "$1-x$"], correct: 0, explanation: "$e^x \approx 1+x$" },
    { question: "$\\sin(x) \approx ?$ (1. Ord.)", type: "multiple", options: ["$x$", "$1$", "$x^2$", "$1-x$"], correct: 0, explanation: "$\\sin(x) \approx x$" },
    { question: "Konvergenzradius 1/(1-x)?", type: "multiple", options: ["R=0", "R=1", "R=inf", "R=2"], correct: 1, explanation: "|x| < 1, R=1" },
    { question: "$\\cos(0) = ?$", type: "multiple", options: ["0", "1", "-1", "pi"], correct: 1, explanation: "$\\cos(0) = 1$" },
  ],
};