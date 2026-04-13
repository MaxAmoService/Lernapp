import { Module, QuizQuestion } from "./types";

export const mathCategories = [
  {
    id: "arithmetik-algebra",
    name: "Arithmetik & Algebra",
    icon: "🔢",
    description: "Grundrechenarten, Gleichungen und algebraische Strukturen",
  },
  {
    id: "analysis",
    name: "Analysis",
    icon: "📊",
    description: "Grenzwerte, Differentiation, Integration und Reihen",
  },
  {
    id: "lineare-algebra",
    name: "Lineare Algebra",
    icon: "↔️",
    description: "Vektoren, Matrizen und lineare Gleichungssysteme",
  },
  {
    id: "geometrie",
    name: "Geometrie",
    icon: "📐",
    description: "Formen, Flächen, Körper und räumliches Denken",
  },
  {
    id: "differentialgleichungen",
    name: "Differentialgleichungen",
    icon: "📈",
    description: "ODEs, PDEs und Lösungsmethoden",
  },
  {
    id: "komplexe-zahlen",
    name: "Komplexe Zahlen",
    icon: "🌀",
    description: "Komplexe Ebene, Polardarstellung und Anwendungen",
  },
  {
    id: "stochastik",
    name: "Stochastik",
    icon: "🎲",
    description: "Wahrscheinlichkeitsrechnung und Statistik",
  },
  {
    id: "numerik",
    name: "Numerik & Algorithmen",
    icon: "💻",
    description: "Numerische Verfahren und Algorithmik",
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
    category: "arithmetik-algebra",
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

- **Vereinigung**: $A \\cup B = \\{x \\mid x \\in A \\\text{ oder } x \\in B\\}$
- **Schnittmenge**: $A \\cap B = \\{x \\mid x \\in A \\\text{ und } x \\in B\\}$
- **Differenz**: $A \\setminus B = \\{x \\mid x \\in A \\\text{ und } x \\notin B\\}$
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

## Allquantor ($\forall$)

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
    category: "arithmetik-algebra",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Funktionen & Graphen\n\n### 🎯 Wichtige Funktionen\n\n| Typ | Formel | Beispiel |\n|-----|--------|----------|\n| **Linear** | $f(x) = mx + b$ | $2x + 3$ |\n| **Quadratisch** | $f(x) = ax^2 + bx + c$ | $x^2 - 4$ |\n| **Potenz** | $f(x) = x^n$ | $x^3$ |\n| **Wurzel** | $f(x) = \\\sqrt{x}$ | $\\\sqrt{x+1}$ |\n| **Exponential** | $f(x) = a^x$ | $2^x$ |\n| **Logarithmus** | $f(x) = \\\log_a x$ | $\\\ln x$ |\n\n### 📐 Eigenschaften\n\n| Eigenschaft | Definition |\n|-------------|------------|\n| **Gerade** | $f(-x) = f(x)$ (achsensymmetrisch) |\n| **Ungerade** | $f(-x) = -f(x)$ (punktsymmetrisch) |\n| **Monoton** | $x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$ |\n| **Beschränkt** | $|f(x)| \\leq M$ |\n\n### 💡 Umkehrfunktion\n- $f^{-1}(f(x)) = x$\n- Grafisch: Spiegelung an $y = x$\n- Existiert nur, wenn $f$ bijektiv ist` ,
    lessons: [
      {
        id: "mf1",
        title: "Funktionen & Definitionsbereiche",
        duration: "15 min",
        type: "interactive",
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
$f(x) = \\\frac{p(x)}{q(x)}$, wobei $q(x) \\\neq 0$

### Wurzelfunktionen
$f(x) = \\\sqrt[n]{x}$ für $x \\geq 0$ (bei geradem n)

## Definitionsbereich bestimmen

- **Nenner**: $\\\neq 0$
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
    merkblatt: `## 📋 Merkblatt: Grenzwerte\n\n### 🎯 Wichtige Grenzwerte\n\n| Grenzwert | Wert |\n|-----------|------|\n| $\\lim_{x \\to 0} \\\frac{\\sin x}{x}$ | $1$ |\n| $\\lim_{x \\to 0} \\\frac{1 - \\cos x}{x}$ | $0$ |\n| $\\lim_{x \\to \\infty} (1 + \\\frac{1}{x})^x$ | $e$ |\n| $\\lim_{x \\to 0} \\\frac{e^x - 1}{x}$ | $1$ |\n| $\\lim_{x \\to 0} \\\frac{\\\ln(1+x)}{x}$ | $1$ |\n\n### 📐 L'Hôpital'sche Regel\n\nBei $\\\frac{0}{0}$ oder $\\\frac{\\infty}{\\infty}$:\n\n$$\\lim_{x \\to a} \\\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\\frac{f'(x)}{g'(x)}$$\n\n### 💡 Merke\n- Immer **L'Hôpital** versuchen bei $\\\frac{0}{0}$\n- Grenzwerte können $\\pm\\infty$ sein\n- **Squeeze Theorem:** $f(x) \\leq g(x) \\leq h(x)$ und $\\lim f = \\lim h \\Rightarrow \\lim g = \\lim f`,
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
        content: `# Grenzwerte von Funktionen

## Definition

$\\lim_{x \\to a} f(x) = L$ bedeutet:
Für jedes $\\varepsilon > 0$ gibt es ein $\\delta > 0$, sodass für alle $x$ mit $0 < |x - a| < \\delta$ gilt: $|f(x) - L| < \\varepsilon$

## Rechenregeln

Seien $\\lim_{x \\to a} f(x) = L$ und $\\lim_{x \\to a} g(x) = M$, dann:

| Regel | Formel |
|-------|--------|
| Summe | $\\lim_{x \\to a} [f(x) + g(x)] = L + M$ |
| Produkt | $\\lim_{x \\to a} [f(x) \\\cdot g(x)] = L \\\cdot M$ |
| Quotient | $\\lim_{x \\to a} \\\frac{f(x)}{g(x)} = \\\frac{L}{M}$ (wenn $M \\\neq 0$) |
| Potenz | $\\lim_{x \\to a} [f(x)]^n = L^n$ |

## Wichtige Grenzwerte

- $\\lim_{x \\to 0} \\\frac{\\sin x}{x} = 1$
- $\\lim_{x \\to \\infty} \\left(1 + \\\frac{1}{x}\\right)^x = e$
- $\\lim_{x \\to 0} \\\frac{e^x - 1}{x} = 1$`,
      },
      {
        id: "m1g2",
        title: "L'Hôpital's Regel",
        duration: "15 min",
        type: "interactive",
        content: `# L'Hôpital's Regel

## Anwendung

Bei $\\\frac{0}{0}$ oder $\\\frac{\\infty}{\\infty}$:

$\\lim_{x \\to a} \\\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\\frac{f'(x)}{g'(x)}$

## Voraussetzungen

1. $\\lim_{x \\to a} f(x) = 0$ und $\\lim_{x \\to a} g(x) = 0$ (oder beide $\\to \\infty$)
2. $f$ und $g$ sind differenzierbar in einer Umgebung von $a$
3. $g'(x) \\\neq 0$ in der Umgebung (außer evtl. bei $a$)

## Beispiel

$\\lim_{x \\to 0} \\\frac{\\sin x}{x} = \\lim_{x \\to 0} \\\frac{\\cos x}{1} = 1$`,
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
    merkblatt: `## 📋 Merkblatt: Differentialrechnung\n\n### 🎯 Grundableitungen\n\n| $f(x)$ | $f'(x)$ |\n|--------|----------|\n| $x^n$ | $n \\\cdot x^{n-1}$ |\n| $e^x$ | $e^x$ |\n| $a^x$ | $a^x \\\cdot \\\ln(a)$ |\n| $\\sin x$ | $\\cos x$ |\n| $\\cos x$ | $-\\sin x$ |\n| $\\\ln x$ | $\\\frac{1}{x}$ |\n\n### 📐 Ableitungsregeln\n\n| Regel | Formel |\n|-------|--------|\n| **Kettenregel** | $(f \\circ g)'(x) = f'(g(x)) \\\cdot g'(x)$ |\n| **Produktregel** | $(f \\\cdot g)' = f' \\\cdot g + f \\\cdot g'$ |\n| **Quotient** | $(\\\frac{f}{g})' = \\\frac{f' \\\cdot g - f \\\cdot g'}{g^2}$ |\n\n### 💡 Anwendungen\n- **Tangentengleichung:** $y = f(a) + f'(a)(x - a)$\n- **Extremstellen:** $f'(x_0) = 0$\n- **Hinreichend:** $f''(x_0) > 0$ Min, $f''(x_0) < 0$ Max`,
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
        content: `# Definition der Ableitung

## Differenzenquotient

$\\\frac{f(x+h) - f(x)}{h}$

## Ableitung (Differentialquotient)

$f'(x) = \\lim_{h \\to 0} \\\frac{f(x+h) - f(x)}{h}$

## Notation

- $f'(x)$ (Lagrange)
- $\\\frac{df}{dx}$ oder $\\\frac{d}{dx}f(x)$ (Leibniz)
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
| $x^n$ | $n \\\cdot x^{n-1}$ |
| $e^x$ | $e^x$ |
| $\\\ln x$ | $\\\frac{1}{x}$ |
| $\\sin x$ | $\\cos x$ |
| $\\cos x$ | $-\\sin x$ |

## Kettenregel

$(f(g(x)))' = f'(g(x)) \\\cdot g'(x)$

## Produktregel

$(f \\\cdot g)' = f' \\\cdot g + f \\\cdot g'$

## Quotientenregel

$\\left(\\\frac{f}{g}\\right)' = \\\frac{f' \\\cdot g - f \\\cdot g'}{g^2}$`,
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
    merkblatt: `## 📋 Merkblatt: Integralrechnung\n\n### 🎯 Stammfunktionen\n\n| $f(x)$ | $\\int f(x) \\,dx$ |\n|--------|------------------|\n| $x^n$ | $\\\frac{x^{n+1}}{n+1}$ |\n| $\\\frac{1}{x}$ | $\\\ln|x|$ |\n| $e^x$ | $e^x$ |\n| $\\sin x$ | $-\\cos x$ |\n| $\\cos x$ | $\\sin x$ |\n| $\\\frac{1}{x^2+1}$ | $\\arctan x$ |\n\n### 📐 Hauptsatz der Differential- und Integralrechnung\n\n$$\\int_a^b f(x) \\,dx = F(b) - F(a)$$\n\n### 💡 Techniken\n- **Substitution:** $u = g(x) \Rightarrow du = g'(x)dx$\n- **Partielle Integration:** $\\int u \\,dv = uv - \\int v \\,du$\n- **Partialbruch:** Für rationale Funktionen`,
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
        content: `# Stammfunktionen

## Definition

$F$ ist Stammfunktion von $f$, wenn $F'(x) = f(x)$.

## Unbestimmtes Integral

$\\int f(x) \\, dx = F(x) + C$

## Wichtige Stammfunktionen

| Funktion | Stammfunktion |
|----------|---------------|
| $x^n$ | $\\\frac{x^{n+1}}{n+1} + C$ ($n \\\neq -1$) |
| $\\\frac{1}{x}$ | $\\\ln|x| + C$ |
| $e^x$ | $e^x + C$ |
| $\\sin x$ | $-\\cos x + C$ |
| $\\cos x$ | $\\sin x + C$ |

## Substitutionsregel

$\\int f(g(x)) \\\cdot g'(x) \\, dx = \\int f(u) \\, du$ mit $u = g(x)$`,
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
- $\\int_a^b c \\\cdot f(x) \\, dx = c \\\cdot \\int_a^b f(x) \\, dx$

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
    merkblatt: `## 📋 Merkblatt: Reihen & Potenzreihen\n\n### 🎯 Konvergenzkriterien\n\n| Kriterium | Bedingung |\n|-----------|-----------|\n| **Quotienten** | $q = \\lim_{n \\to \\infty} \\left|\\\frac{a_{n+1}}{a_n}\\right| < 1$ |\n| **Wurzel** | $\\\sqrt[n]{|a_n|} < 1$ |\n| **Vergleich** | $0 \\leq a_n \\leq b_n$ und $\\\sum b_n$ konv. |\n\n### 📐 Wichtige Reihen\n\n| Reihe | Summe |\n|-------|-------|\n| $\\\sum_{n=0}^{\\infty} x^n = \\\frac{1}{1-x}$ | $|x| < 1$ |\n| $e^x = \\\sum \\\frac{x^n}{n!}$ | $\\forall x$ |\n| $\\sin x = \\\sum \\\frac{(-1)^n x^{2n+1}}{(2n+1)!}$ | $\\forall x$ |\n| $\\cos x = \\\sum \\\frac{(-1)^n x^{2n}}{(2n)!}$ | $\\forall x$ |\n\n### 💡 Taylor-Entwicklung\n$$f(x) = \\\sum_{n=0}^{\\infty} \\\frac{f^{(n)}(a)}{n!}(x-a)^n$$`,
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
$\\\sum_{n=1}^{\\infty} a_n = a_1 + a_2 + a_3 + \\ldots$

## Konvergenzkriterien

### Vorzeichenkriterium (Leibniz)
Bei alternierenden Reihen: $a_n \\\cdot a_{n+1} < 0$ und $|a_{n+1}| \\leq |a_n|$ und $\\lim_{n \\to \\infty} a_n = 0$

### Vergleichskriterium
Wenn $0 \\leq a_n \\leq b_n$ und $\\\sum b_n$ konvergiert, dann konvergiert auch $\\\sum a_n$.

### Quotientenkriterium
$\\lim_{n \\to \\infty} \\left|\\\frac{a_{n+1}}{a_n}\\right| = q$
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

$\\\sum_{n=0}^{\\infty} a_n (x - a)^n = a_0 + a_1(x-a) + a_2(x-a)^2 + \\ldots$

## Konvergenzradius

$R = \\lim_{n \\to \\infty} \\left|\\\frac{a_n}{a_{n+1}}\\right|$

## Wichtige Reihen

### Taylor-Reihen
$f(x) = \\\sum_{n=0}^{\\infty} \\\frac{f^{(n)}(a)}{n!} (x-a)^n$

### Maclaurin-Reihen (a=0)
- $e^x = \\\sum_{n=0}^{\\infty} \\\frac{x^n}{n!}$
- $\\sin x = \\\sum_{n=0}^{\\infty} \\\frac{(-1)^n x^{2n+1}}{(2n+1)!}$
- $\\cos x = \\\sum_{n=0}^{\\infty} \\\frac{(-1)^n x^{2n}}{(2n)!}$`,
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
    merkblatt: `## 📋 Merkblatt: Vektoren & Lineare Algebra\n\n### 🎯 Skalarprodukt\n\n$$\\vec{a} \\\cdot \\vec{b} = a_1b_1 + a_2b_2 + a_3b_3 = |\\vec{a}||\\vec{b}|\\cos\\alpha$$\n\n| Eigenschaft | Bedingung |\n|-------------|-----------|\n| **Orthogonal** | $\\vec{a} \\\cdot \\vec{b} = 0$ |\n| **Parallel** | $\\vec{a} = \\lambda \\vec{b}$ |\n| **Betrag** | $|\\vec{a}| = \\\sqrt{a_1^2 + a_2^2 + a_3^2}$ |\n\n### 📐 Kreuzprodukt\n\n$$\\vec{a} \\times \\vec{b} = \\begin{pmatrix} a_2b_3 - a_3b_2 \\\\ a_3b_1 - a_1b_3 \\\\ a_1b_2 - a_2b_1 \\end{pmatrix}$$\n\n- **Betrag:** $|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\alpha$\n- **Richtung:** Rechtwinklig zu $\\vec{a}$ und $\\vec{b}$\n\n### 💡 Ebene & Gerade\n- **Ebenengleichung:** $\\vec{n} \\\cdot (\\vec{x} - \\vec{p}) = 0$\n- **Gerade:** $\\vec{x} = \\vec{p} + t \\\cdot \\vec{v}$`,
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
        content: `# Vektoren im Raum

## Definition

$\\vec{v} = \\begin{pmatrix} v_1 \\\\ v_2 \\\\ v_3 \\end{pmatrix} \\in \\mathbb{R}^3$

## Operationen

### Addition
$\\vec{u} + \\vec{v} = \\begin{pmatrix} u_1 + v_1 \\\\ u_2 + v_2 \\\\ u_3 + v_3 \\end{pmatrix}$

### Skalarmultiplikation
$\\lambda \\vec{v} = \\begin{pmatrix} \\lambda v_1 \\\\ \\lambda v_2 \\\\ \\lambda v_3 \\end{pmatrix}$

### Skalarprodukt
$\\vec{u} \\\cdot \\vec{v} = u_1 v_1 + u_2 v_2 + u_3 v_3 = |\\vec{u}| |\\vec{v}| \\cos \\alpha$

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

$(AB)_{ij} = \\\sum_{k=1}^{n} a_{ik} b_{kj}$

## Wichtige Matrizen

- **Einheitsmatrix**: $I_n$ (Diagonale = 1)
- **Nullmatrix**: $0_{m \\times n}$ (Alle Einträge = 0)
- **Transponierte**: $(A^T)_{ij} = a_{ji}$

## Determinante (2×2)

$\\det(A) = a_{11} a_{22} - a_{12} a_{21}$

## Inverse Matrix

$A \\\cdot A^{-1} = I$`,
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
    merkblatt: `## 📋 Merkblatt: Differentialgleichungen\n\n### 🎯 Homogene DGL 2. Ordnung\n\n$$ay'' + by' + cy = 0$$\n\n**Charakteristische Gleichung:** $ar^2 + br + c = 0$\n\n### 📐 Lösungen\n\n| Fall | Lösung |\n|------|--------|\n| **2 reelle** $r_1 \\\neq r_2$ | $y = C_1e^{r_1x} + C_2e^{r_2x}$ |\n| **Doppelte** $r_1 = r_2 = r$ | $y = (C_1 + C_2x)e^{rx}$ |\n| **Komplexe** $r = \\alpha \\pm \\beta i$ | $y = e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$ |\n\n### 💡 Nicht-homogen\n$$ay'' + by' + cy = f(x)$$\n\n**Lösung:** $y = y_h + y_p$ (homogen + partikulär)\n\n- **Bestimmung:** Partikuläre Lösung raten oder Variation der Konstanten`,
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
$\\\frac{dy}{dx} = f(x) \\\cdot g(y)$
Lösung: $\\int \\\frac{dy}{g(y)} = \\int f(x) \\, dx$

### Linear
$y' + p(x) \\\cdot y = q(x)$
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
1. **Zwei reelle Wurzeln** $r_1 \\\neq r_2$: $y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$
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
$$P(A) = \\frac{|A|}{|\Omega|}$$

**Eigenschaften:**
- $0 \leq P(A) \leq 1$
- $P(\Omega) = 1$
- $P(\emptyset) = 0$

### 💡 Formeln
| Regel | Formel |
|-------|--------|
| Addition | $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ |
| Komplement | $P(\bar{A}) = 1 - P(A)$ |
| Bedingt | $P(A|B) = \\frac{P(A \cap B)}{P(B)}$ |`,
    lessons: [
      {
        id: "m-sto-1",
        title: "Grundbegriffe der Wahrscheinlichkeit",
        duration: "20 min",
        type: "text",
        content: `## Zufallsexperimente

Ein **Zufallsexperiment** ist ein Experiment, dessen Ausgang nicht vorhersehbar ist.

**Beispiele:**
- Münzwurf: $\Omega = \{K, Z\}$
- Würfelwurf: $\Omega = \{1, 2, 3, 4, 5, 6\}$
- Kartenziehen: $\Omega = \{\\text{Herz}, \\text{Karo}, \\text{Kreuz}, \\text{Pik}\}$

## Wahrscheinlichkeit

$$P(A) = \\frac{\\text{günstige Ergebnisse}}{\\text{alle Ergebnisse}}$$

**Beispiel:** Beim Würfelwurf ist die Wahrscheinlichkeit für eine gerade Zahl:
$$P(\\text{gerade}) = \\frac{3}{6} = \\frac{1}{2}$$

## Additionssatz

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

Bei **disjunkten** Ereignissen ($A \cap B = \emptyset$):
$$P(A \cup B) = P(A) + P(B)$$

## Komplementregel

$$P(\bar{A}) = 1 - P(A)$$

**Beispiel:** Die Wahrscheinlichkeit, keine 6 zu würfeln:
$$P(\\text{keine 6}) = 1 - P(6) = 1 - \\frac{1}{6} = \\frac{5}{6}$$

## Übung

Gegeben: $P(A) = 0.4$, $P(B) = 0.3$, $P(A \cap B) = 0.1$

Berechne $P(A \cup B)$!`,
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
$$C_k^n = \binom{n}{k} = \\frac{n!}{k!(n-k)!}$$

**Beispiel:** Aus 10 Personen werden 3 gewählt:
$$\binom{10}{3} = \\frac{10!}{3! \\cdot 7!} = 120$$

## Binomialformel

$$(a + b)^n = \\sum_{k=0}^{n} \binom{n}{k} a^k b^{n-k}$$

## Übung

Wie viele 4-stellige Zahlen kann man aus den Ziffern 1,2,3,4,5 bilden (ohne Wiederholung)?`,
      },
      {
        id: "m-sto-3",
        title: "Bedingte Wahrscheinlichkeit",
        duration: "20 min",
        type: "text",
        content: `## Bedingte Wahrscheinlichkeit

$$P(A|B) = \\frac{P(A \cap B)}{P(B)}$$

Die Wahrscheinlichkeit von A, **unter der Bedingung** dass B eingetreten ist.

## Bayes-Formel

$$P(B|A) = \\frac{P(A|B) \\cdot P(B)}{P(A)}$$

## Unabhängigkeit

A und B sind **unabhängig**, wenn:
$$P(A \cap B) = P(A) \\cdot P(B)$$

**Beispiel:** Münzwürfe sind unabhängig.

## Übung

In einer Klasse sind 60% Mädchen und 40% Jungen. 70% der Mädchen haben Haare lang, 30% der Jungen haben Haare lang.

Wie hoch ist die Wahrscheinlichkeit, dass ein zufällig gewählter Schüler ein Mädchen mit langen Haaren ist?`,
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
    category: "komplexe-zahlen",
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
| Konjugiertes | $\overline{a+bi} = a-bi$ |
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

$$\overline{a + bi} = a - bi$$

**Eigenschaft:** $z \\cdot \bar{z} = |z|^2 = a^2 + b^2$

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
        content: `## Polardarstellung

$$z = r \\cdot e^{i\varphi}$$

Mit:
- $r = |z| = \\sqrt{a^2 + b^2}$ (Betrag)
- $\varphi = \arg(z)$ (Argument/Winkel)

## Euler-Formel

$$e^{i\varphi} = \cos\varphi + i\sin\varphi$$

**Spezielle Werte:**
- $e^{i\pi/2} = i$
- $e^{i\pi} = -1$
- $e^{i2\pi} = 1$

## De Moivre'scher Satz

$$(e^{i\varphi})^n = e^{in\varphi} = \cos(n\varphi) + i\sin(n\varphi)$$

**Anwendung:** Potenzen und Wurzeln komplexer Zahlen

## Einheitskreis

Alle Zahlen mit $|z| = 1$ liegen auf dem Einheitskreis.

## Übung

Gib $z = 1 + i$ in Polardarstellung an!`,
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
    category: "numerik",
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
- **Ordnung p:** $|e_{n+1}| \leq C \\cdot |e_n|^p$
- Linear: $p=1$, Quadratisch: $p=2$`,
    lessons: [
      {
        id: "m-num-1",
        title: "Fehler und Näherungen",
        duration: "15 min",
        type: "text",
        content: `## Rundungsfehler

Computer können nicht alle Zahlen exakt darstellen.

**Beispiel:** $\\frac{1}{3} = 0.3333...$ wird gerundet.

## Absolute und relative Fehler

$$\\text{abs. Fehler} = |x_{exakt} - x_{approx}|$$

$$\\text{rel. Fehler} = \\frac{|x_{exakt} - x_{approx}|}{|x_{exakt}|}$$

## Maschinengenauigkeit

$$\varepsilon_{mach} \approx 2.2 \times 10^{-16}$$ (für Double Precision)

## Übung

Berechne den relativen Fehler für $x_{exakt} = 2.5$, $x_{approx} = 2.48$!`,
      },
      {
        id: "m-num-2",
        title: "Bisektionsverfahren",
        duration: "20 min",
        type: "text",
        content: `## Bisektionsverfahren

Einfache Methode zum Finden von Nullstellen.

### Algorithmus
1. Wähle $[a,b]$ mit $f(a) \\cdot f(b) < 0$
2. Berechne $m = \\frac{a+b}{2}$
3. Wenn $f(m) = 0$: fertig!
4. Wenn $f(a) \\cdot f(m) < 0$: $b = m$, sonst $a = m$
5. Wiederhole ab Schritt 2

### Konvergenz
Nach n Schritten:
$$|x_n - x^*| \leq \\frac{b-a}{2^n}$$

**Beispiel:** Nullstelle von $f(x) = x^2 - 2$ im Intervall [1, 2]

## Übung

Finde die Nullstelle von $f(x) = x - \cos(x)$ mit Bisektion!`,
      },
      {
        id: "m-num-3",
        title: "Newton-Verfahren",
        duration: "25 min",
        type: "text",
        content: `## Newton-Verfahren

Schnellere Methode mit Ableitung.

### Formel
$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$

### Geometrische Deutung
Tangente an $f$ in $x_n$ wird gezogen. Der Schnitt mit der x-Achse ist $x_{n+1}$.

### Konvergenz
- Quadratische Konvergenz (sehr schnell!)
- Voraussetzung: $f'(x^*) \\neq 0$

### Beispiel
$f(x) = x^2 - 2$, $f'(x) = 2x$

$$x_{n+1} = x_n - \\frac{x_n^2 - 2}{2x_n} = \\frac{x_n}{2} + \\frac{1}{x_n}$$

Mit $x_0 = 1$:
- $x_1 = 1.5$
- $x_2 = 1.4166...$
- $x_3 = 1.4142...$ (schon sehr nah!)

## Übung

Verwende Newton für $f(x) = x^3 - 5$ mit $x_0 = 2$!`,
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
    category: "geometrie",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Geometrie

### 🎯 Flächeninhalte
| Formel | Formel |
|--------|--------|
| Rechteck | $A = a \\cdot b$ |
| Dreieck | $A = \\frac{g \\cdot h}{2}$ |
| Kreis | $A = \pi r^2$ |
| Trapez | $A = \\frac{(a+b) \\cdot h}{2}$ |
| Raute | $A = \\frac{d_1 \\cdot d_2}{2}$ |

### 📐 Körper
| Körper | Volumen | Oberfläche |
|--------|---------|------------|
| Quader | $V = a \\cdot b \\cdot c$ | $O = 2(ab+ac+bc)$ |
| Würfel | $V = a^3$ | $O = 6a^2$ |
| Kugel | $V = \\frac{4}{3}\pi r^3$ | $O = 4\pi r^2$ |
| Zylinder | $V = \pi r^2 h$ | $O = 2\pi r(r+h)$ |
| Kegel | $V = \\frac{1}{3}\pi r^2 h$ | $O = \pi r(r+l)$ |

### 💡 Satz des Pythagoras
$$a^2 + b^2 = c^2$$`,
    lessons: [
      {
        id: "m-geo-1",
        title: "Flächeninhalte",
        duration: "20 min",
        type: "text",
        content: `## Flächeninhalte ebener Figuren

### Rechteck & Quadrat
$$A = a \\cdot b$$

**Quadrat:** $A = a^2$

### Dreieck
$$A = \\frac{g \\cdot h}{2}$$

**Gleichseitiges Dreieck:** $A = \\frac{\\sqrt{3}}{4} a^2$

### Kreis
$$A = \pi r^2 = \\frac{\pi d^2}{4}$$

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
        content: `## Räumliche Körper

### Quader
$$V = a \\cdot b \\cdot c$$
$$O = 2(ab + ac + bc)$$

### Würfel
$$V = a^3$$
$$O = 6a^2$$

### Kugel
$$V = \\frac{4}{3}\pi r^3$$
$$O = 4\pi r^2$$

### Zylinder
$$V = \pi r^2 h$$
$$O = 2\pi r(r + h)$$

### Kegel
$$V = \\frac{1}{3}\pi r^2 h$$
$$O = \pi r(r + l)$$ (l = Mantellänge)

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
    category: "geometrie",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Trigonometrie

### 🎯 Grundfunktionen
| Funktion | Definition |
|----------|------------|
| $\sin \alpha$ | $\\frac{\\text{Gegenkathete}}{\\text{Hypotenuse}}$ |
| $\cos \alpha$ | $\\frac{\\text{Ankathete}}{\\text{Hypotenuse}}$ |
| $\tan \alpha$ | $\\frac{\\text{Gegenkathete}}{\\text{Ankathete}}$ |

### 📐 Wichtige Werte
| α | 0° | 30° | 45° | 60° | 90° |
|---|-----|-----|-----|-----|-----|
| sin | 0 | ½ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{3}}{2}$ | 1 |
| cos | 1 | $\\frac{\\sqrt{3}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | ½ | 0 |
| tan | 0 | $\\frac{\\sqrt{3}}{3}$ | 1 | $\\sqrt{3}$ | - |

### 💡 Gesetze
- **Satz des Pythagoras:** $\sin^2\alpha + \cos^2\alpha = 1$
- **Addition:** $\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$`,
    lessons: [
      {
        id: "m-trig-1",
        title: "Grundlagen der Trigonometrie",
        duration: "25 min",
        type: "text",
        content: `## Die trigonometrischen Funktionen

Im rechtwinkligen Dreieck:

$$\sin \alpha = \\frac{\\text{Gegenkathete}}{\\text{Hypotenuse}} = \\frac{a}{c}$$

$$\cos \alpha = \\frac{\\text{Ankathete}}{\\text{Hypotenuse}} = \\frac{b}{c}$$

$$\tan \alpha = \\frac{\\text{Gegenkathete}}{\\text{Ankathete}} = \\frac{a}{b} = \\frac{\sin \alpha}{\cos \alpha}$$

## Wichtige Identität

$$\sin^2 \alpha + \cos^2 \alpha = 1$$

## Übung

Gegeben: $a = 3$, $c = 5$. Berechne $\sin \alpha$, $\cos \alpha$, $\tan \alpha$!`,
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
- $x = \cos \alpha$
- $y = \sin \alpha$

## Übung

Berechne $\sin(60°) + \cos(30°)$!`,
      },
      {
        id: "m-trig-3",
        title: "Satz des Sinus & Kosinus",
        duration: "25 min",
        type: "text",
        content: `## Satz des Sinus

$$\\frac{a}{\sin \alpha} = \\frac{b}{\sin \beta} = \\frac{c}{\sin \gamma} = 2R$$

$R$ = Radius des Umkreises.

## Satz des Kosinus

$$c^2 = a^2 + b^2 - 2ab \\cdot \cos \gamma$$

## Anwendung

**Satz des Sinus:** Wenn Gegenwinkel bekannt
**Satz des Kosinus:** Wenn SSW oder SWS gegeben

## Übung

Gegeben: $a = 5$, $b = 7$, $\gamma = 60°$. Berechne $c$!`,
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
    category: "arithmetik-algebra",
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
$$\\log_a(x) = y \Leftrightarrow a^y = x$$

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
        content: `## Potenzen

$$a^n = \\underbrace{a \\cdot a \\cdot ... \\cdot a}_{n \\text{ mal}}$$

## Potenzregeln

**Multiplikation:**
$$a^m \\cdot a^n = a^{m+n}$$

**Division:**
$$\\frac{a^m}{a^n} = a^{m-n}$$

**Potenz von Potenz:**
$$(a^m)^n = a^{m \\cdot n}$$

**Nullter Potenz:**
$$a^0 = 1 \quad (a \\neq 0)$$

**Negativer Exponent:**
$$a^{-n} = \\frac{1}{a^n}$$

## Übung

Berechne $2^3 \\cdot 2^4$!`,
      },
      {
        id: "m-pot-2",
        title: "Logarithmen",
        duration: "25 min",
        type: "text",
        content: `## Definition

$$\\log_a(x) = y \Leftrightarrow a^y = x$$

Der Logarithmus gibt die Potenz zurück, auf die man $a$ erheben muss, um $x$ zu erhalten.

## Logarithmusregeln

**Produktregel:**
$$\\log_a(xy) = \\log_a(x) + \\log_a(y)$$

**Quotientenregel:**
$$\\log_a\left(\\frac{x}{y}\right) = \\log_a(x) - \\log_a(y)$$

**Potenzregel:**
$$\\log_a(x^n) = n \\cdot \\log_a(x)$$

## Natürlicher Logarithmus

$$\\ln(x) = \\log_e(x)$$
mit $e \approx 2.71828$

## Übung

Berechne $\\log_2(8)$!`,
      },
      {
        id: "m-pot-3",
        title: "Exponentialfunktion",
        duration: "20 min",
        type: "text",
        content: `## Exponentialfunktion

$$f(x) = a^x \quad (a > 0, a \\neq 1)$$

**Eigenschaften:**
- Immer positiv: $f(x) > 0$
- $f(0) = 1$
- Wachstum für $a > 1$, Zerfall für $0 < a < 1$

## Natürliche Exponentialfunktion

$$f(x) = e^x$$

## Umkehrfunktion

Die Umkehrfunktion von $e^x$ ist $\\ln(x)$:
$$e^{\\ln(x)} = x$$
$$\\ln(e^x) = x$$

## Übung

Löse $2^x = 16$!`,
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
| Mittelwert | $\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i$ |
| Median | Mittlerer Wert (sortiert) |
| Modus | Häufigster Wert |

### 📐 Streuung
| Maß | Formel |
|-----|--------|
| Varianz | $s^2 = \\frac{1}{n}\\sum(x_i - \bar{x})^2$ |
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
        content: `## Mittelwert

$$\bar{x} = \\frac{1}{n} \\sum_{i=1}^{n} x_i = \\frac{x_1 + x_2 + ... + x_n}{n}$$

## Median

Sortiere die Werte. Der Median ist der mittlere Wert.
- Bei ungerader Anzahl: mittlerer Wert
- Bei gerader Anzahl: Durchschnitt der beiden mittleren

## Modus

Der Modus ist der häufigste Wert.

## Beispiel

Daten: $3, 7, 7, 9, 12$
- Mittelwert: $\\frac{3+7+7+9+12}{5} = 7.6$
- Median: 7
- Modus: 7

## Übung

Berechne Mittelwert und Median für $2, 5, 8, 11, 14$!`,
      },
      {
        id: "m-stat-2",
        title: "Varianz & Standardabweichung",
        duration: "25 min",
        type: "text",
        content: `## Varianz

$$s^2 = \\frac{1}{n} \\sum_{i=1}^{n} (x_i - \bar{x})^2$$

Misst die Streuung um den Mittelwert.

## Standardabweichung

$$s = \\sqrt{s^2}$$

Hat die gleiche Einheit wie die Daten.

## Beispiel

Daten: $2, 4, 6, 8, 10$ ($\bar{x} = 6$)

$$s^2 = \\frac{(2-6)^2 + (4-6)^2 + ... + (10-6)^2}{5} = \\frac{40}{5} = 8$$

$$s = \\sqrt{8} \approx 2.83$$

## Übung

Berechne die Standardabweichung für $1, 3, 5, 7, 9$!`,
      },
      {
        id: "m-stat-3",
        title: "Quartile & Boxplot",
        duration: "20 min",
        type: "text",
        content: `## Quartile

**Erstes Quartil $Q_1$:** 25% der Werte sind kleiner
**Zweites Quartil $Q_2$:** Median (50%)
**Drittes Quartil $Q_3$:** 75% der Werte sind kleiner

## Interquartilsabstand

$$IQR = Q_3 - Q_1$$

## Boxplot

Min ---- Q1 ---- Q2 ---- Q3 ---- Max

## Übung

Daten: $2, 5, 7, 8, 10, 12, 15$

Bestimme $Q_1$, $Q_2$, $Q_3$!`,
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
      question: "Was ist der Definitionsbereich von $f(x) = \\\sqrt{x}$?",
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
      question: "Was ist $\\lim_{x \\to 0} \\\frac{\\sin x}{x}$?",
      type: "input",
      correct: "1",
      explanation: "Dies ist einer der wichtigsten Grenzwerte in der Analysis.",
      hint: "Denk an L'Hôpital oder die geometrische Interpretation.",
    },
    {
      question: "Welche Regel wendet man bei $\\\frac{0}{0}$ an?",
      type: "multiple",
      options: [
        "Produktregel",
        "Kettenregel",
        "L'Hôpital",
        "Substitution",
      ],
      correct: 2,
      explanation: "L'Hôpital's Regel gilt für die Formen $\\\frac{0}{0}$ oder $\\\frac{\\infty}{\\infty}$.",
    },
  ],
  "mathe1-ableitungen": [
    {
      question: "Was ist die Ableitung von $f(x) = x^3$?",
      type: "input",
      correct: "3x^2",
      explanation: "Potenzregel: $(x^n)' = n \\\cdot x^{n-1}$",
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
        "$f'(x) \\\cdot g'(x)$",
        "$f'(g(x)) \\\cdot g'(x)$",
        "$f(g'(x)) \\\cdot g'(x)$",
        "$f'(g(x)) \\\cdot g(x)$",
      ],
      correct: 1,
      explanation: "Kettenregel: $(f(g(x)))' = f'(g(x)) \\\cdot g'(x)$",
    },
  ],
  "mathe1-integration": [
    {
      question: "Was ist $\\int x^2 \\, dx$?",
      type: "input",
      correct: "x^3/3",
      explanation: "Stammfunktion von $x^n$ ist $\\\frac{x^{n+1}}{n+1}$",
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
      question: "Was ist $\\\sum_{n=0}^{\\infty} \\\frac{x^n}{n!}$?",
      type: "multiple",
      options: ["$\\sin x$", "$\\cos x$", "$e^x$", "$\\\ln(1+x)$"],
      correct: 2,
      explanation: "Die Taylor-Reihe von $e^x$ ist $\\\sum_{n=0}^{\\infty} \\\frac{x^n}{n!}$.",
    },
  ],
  "mathe2-vektoren": [
    {
      question: "Was ist $\\vec{u} \\\cdot \\vec{v}$ für orthogonale Vektoren?",
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
};
