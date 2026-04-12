import { Module, QuizQuestion } from "./types";

export const mathCategories = [
  {
    id: "mathe-grundlagen",
    name: "Mathe Grundlagen",
    icon: "📐",
    description: "Grundlagen für das Mathe-Studium",
  },
  {
    id: "mathe1",
    name: "Mathe 1",
    icon: "📊",
    description: "Analysis & Lineare Algebra für Erstsemester",
  },
  {
    id: "mathe2",
    name: "Mathe 2",
    icon: "📈",
    description: "Fortgeschrittene Themen für das zweite Semester",
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
    category: "mathe-grundlagen",
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

## Merkblatt: Mengen

### Symbole
- $\in$: Element der Menge
- $\notin$: Kein Element
- $\subset$: Teilmenge
- $\cup$: Vereinigung
- $\cap$: Schnittmenge

### Formeln
- $|A \cup B| = |A| + |B| - |A \cap B|$ (Satz von Bernoulli)

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

## Merkblatt: Logik & Mengen

### Wichtigste Zeichen
- $\land$ (UND), $\lor$ (ODER), $\neg$ (NICHT)
- $\rightarrow$ (Implikation): $P \rightarrow Q$ nur falsch bei T→F

### Merksatz
Implikation umdrehen heißt **nicht** wahr!
- Richtig: $(P \rightarrow Q) \equiv (\neg Q \rightarrow \neg P)$

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
    ],
  },
  {
    id: "m-grundlagen-funktionen",
    slug: "mathe-funktionen",
    title: "Funktionen & Graphen",
    description: "Funktionen, Graphen und Eigenschaften",
    icon: "📉",
    color: "#8b5cf6",
    category: "mathe-grundlagen",
    progress: 0,
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
    ],
  },
  {
    id: "m1-grenzwerte",
    slug: "mathe1-grenzwerte",
    title: "Grenzwerte",
    merkblatt: "## 📋 Merkblatt: Grenzwerte\n\n### Wichtige Grenzwerte\n- lim (x→0) sin(x)/x = 1\n- lim (x→∞) (1+1/x)^x = e\n- lim (x→0) (e^x-1)/x = 1\n\n### L'Hôpital\nBei 0/0 oder ∞/∞: lim f/g = lim f'/g'",
    description: "Grenzwerte und stetige Fortsetzung",
    icon: "🎯",
    color: "#10b981",
    category: "mathe1",
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
    ],
  },
  {
    id: "m1-ableitungen",
    slug: "mathe1-ableitungen",
    title: "Differentialrechnung",
    merkblatt: "## 📋 Merkblatt: Differentialrechnung\n\n### Grundregeln\n- (x^n)' = n·x^(n-1)\n- (e^x)' = e^x\n- (sin x)' = cos x\n- (cos x)' = -sin x\n- (ln x)' = 1/x\n\n### Regeln\n- Kettenregel: (f(g(x)))' = f'(g(x))·g'(x)\n- Produktregel: (f·g)' = f'g + fg'\n- Quotient: (f/g)' = (f'g - fg')/g²",
    description: "Ableitungen, Regeln und Anwendungen",
    icon: "📐",
    color: "#8b5cf6",
    category: "mathe1",
    progress: 0,
    lessons: [
      {
        id: "m1a1",
        title: "Definition der Ableitung",
        duration: "15 min",
        type: "interactive",
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
    ],
  },
  {
    id: "m1-integration",
    slug: "mathe1-integration",
    title: "Integralrechnung",
    merkblatt: "## 📋 Merkblatt: Integralrechnung\n\n### Stammfunktionen\n- ∫x^n dx = x^(n+1)/(n+1)\n- ∫1/x dx = ln|x|\n- ∫e^x dx = e^x\n- ∫sin x dx = -cos x\n- ∫cos x dx = sin x\n\n### Hauptsatz\n∫_a^b f(x)dx = F(b) - F(a)",
    description: "Stammfunktionen und bestimmte Integrale",
    icon: "∫",
    color: "#f59e0b",
    category: "mathe1",
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
    ],
  },
  {
    id: "m1-reihen",
    slug: "mathe1-reihen",
    title: "Reihen & Potenzreihen",
    merkblatt: "## 📋 Merkblatt: Reihen\n\n### Konvergenz (Quotientenkriterium)\nlim |a(n+1)/a(n)| = q\n- q < 1: konvergent\n- q > 1: divergent\n\n### Wichtige Reihen\n- e^x = Σ x^n/n!\n- sin x = Σ (-1)^n x^(2n+1)/(2n+1)!\n- cos x = Σ (-1)^n x^(2n)/(2n)!",
    description: "Unendliche Reihen und Konvergenz",
    icon: "∞",
    color: "#ec4899",
    category: "mathe1",
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
    ],
  },
  {
    id: "m2-vektoren",
    slug: "mathe2-vektoren",
    title: "Vektoren & Lineare Algebra",
    merkblatt: "## 📋 Merkblatt: Vektoren\n\n### Skalarprodukt\n- a·b = |a||b|cos(α) = a1b1 + a2b2 + a3b3\n- Orthogonal: a·b = 0\n- Parallel: a = λb\n\n### Kreuzprodukt\n|a × b| = |a||b|sin(α)\nRichtung: rechtwinklig zu a und b",
    description: "Vektoren, Matrizen und Lineare Gleichungssysteme",
    icon: "↔",
    color: "#06b6d4",
    category: "mathe2",
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
    ],
  },
  {
    id: "m2-dgl",
    slug: "mathe2-dgl",
    title: "Differentialgleichungen",
    merkblatt: "## 📋 Merkblatt: Differentialgleichungen\n\n### Homogene DGL 2. Ordnung\nay'' + by' + cy = 0\nCharakteristisch: ar² + br + c = 0\n\n### Lösungen\n- 2 reelle: y = C1·e^(r1·x) + C2·e^(r2·x)\n- Doppelte: y = (C1 + C2·x)·e^(rx)\n- Komplexe: y = e^(αx)(C1·cos(βx) + C2·sin(βx))",
    description: "Gewöhnliche Differentialgleichungen 1. und 2. Ordnung",
    icon: "dy/dx",
    color: "#ef4444",
    category: "mathe2",
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
};
