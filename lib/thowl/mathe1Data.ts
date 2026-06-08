// =============================================================================
// TH OWL — Mathematik 1 (Lineare Algebra + Analysis I)
// Studienbegleitendes Modul mit Querverweisen zu bestehenden Mathe-Modulen
// =============================================================================

import { Module } from "../types";

export const thowlMathe1Module: Module = {
  id: "thowl-mathe1",
  slug: "thowl-mathe1",
  title: "Mathematik 1 — LA & Analysis I",
  description:
    "TH OWL Mathematik 1: Mengenlehre, vollständige Induktion, komplexe Zahlen, Folgen, Reihen, Differential- und Integralrechnung, Vektoren & Matrizen. Mit Querverweisen zu allen relevanten LearnHub-Mathe-Modulen.",
  icon: "📐",
  color: "#6366F1",
  progress: 0,
  category: "studium",
  lessons: [
    // -----------------------------------------------------------------------
    // Lektion 1: Mengenlehre & Logik
    // -----------------------------------------------------------------------
    {
      id: "ma1-mengen",
      title: "1. Mengenlehre & Aussagenlogik",
      duration: "30 min",
      type: "text",
      content: `## Mengenlehre & Aussagenlogik — Die Sprache der Mathematik

Jede mathematische Theorie beginnt mit **Mengen** und **Aussagen**. Beides sind fundamentale Bausteine, die in ALLEN weiteren Kapiteln vorausgesetzt werden.

> **Roter Faden:** Die LearnHub-Module [Mengenlehre & Logik](/modules/mathe-mengenlehre) und [Logik & Beweise](/modules/mathe-logik) decken diese Themen bereits ab — nutze sie als Referenz!

### Mengen

Eine **Menge** ist eine Zusammenfassung von wohlunterschiedenen Objekten. Diese Objekte heißen **Elemente**.

**Schreibweisen:**
- $M = \\\\{1, 2, 3, 4\\\\}$ — aufzählende Form
- $M = \\\\{x \\\\mid x \\\\text{ ist eine natürliche Zahl und } x < 5\\\\}$ — beschreibende Form
- $a \\\\in M$ — "$a$ ist Element von $M$"
- $a \\\\notin M$ — "$a$ ist nicht Element von $M$"

**Wichtige Mengen:**
| Symbol | Name | Elemente |
|--------|------|----------|
| $\\\\mathbb{N}$ | Natürliche Zahlen | $\\\\{1, 2, 3, \\\\ldots\\\\}$ |
| $\\\\mathbb{N}_0$ | Natürliche Zahlen mit 0 | $\\\\{0, 1, 2, 3, \\\\ldots\\\\}$ |
| $\\\\mathbb{Z}$ | Ganze Zahlen | $\\\\{\\\\ldots, -2, -1, 0, 1, 2, \\\\ldots\\\\}$ |
| $\\\\mathbb{Q}$ | Rationale Zahlen | Alle Brüche $\\\\frac{a}{b}$ mit $a,b \\\\in \\\\mathbb{Z}, b \\\\neq 0$ |
| $\\\\mathbb{R}$ | Reelle Zahlen | Alle Punkte auf dem Zahlenstrahl |
| $\\\\mathbb{C}$ | Komplexe Zahlen | $a + bi$ mit $a,b \\\\in \\\\mathbb{R}, i^2 = -1$ |

### Mengenoperationen

Für zwei Mengen $A$ und $B$ definiert man:

- **Vereinigung:** $A \\\\cup B = \\\\{x \\\\mid x \\\\in A \\\\text{ oder } x \\\\in B\\\\}$
- **Schnitt:** $A \\\\cap B = \\\\{x \\\\mid x \\\\in A \\\\text{ und } x \\\\in B\\\\}$
- **Differenz:** $A \\\\setminus B = \\\\{x \\\\mid x \\\\in A \\\\text{ und } x \\\\notin B\\\\}$
- **Komplement:** $\\\\overline{A} = \\\\{x \\\\mid x \\\\notin A\\\\}$ (bezogen auf eine Grundmenge)

**Beispiel:** Sei $A = \\\\{1, 2, 3, 4\\\\}$ und $B = \\\\{3, 4, 5, 6\\\\}$. Dann:
- $A \\\\cup B = \\\\{1, 2, 3, 4, 5, 6\\\\}$
- $A \\\\cap B = \\\\{3, 4\\\\}$
- $A \\\\setminus B = \\\\{1, 2\\\\}$

### Aussagenlogik

Eine **Aussage** ist ein Satz, der entweder **wahr** (w) oder **falsch** (f) ist.

**Logische Verknüpfungen (Junktoren):**
| Name | Symbol | Bedeutung | Beispiel |
|------|--------|-----------|----------|
| Negation | $\\\\neg A$ | "nicht A" | Das Gegenteil |
| Konjunktion | $A \\\\land B$ | "A und B" | Beide müssen wahr sein |
| Disjunktion | $A \\\\lor B$ | "A oder B" | Mindestens eins wahr |
| Implikation | $A \\\\implies B$ | "wenn A, dann B" | Aus A folgt B |
| Äquivalenz | $A \\\\iff B$ | "A genau dann, wenn B" | Beide gleich |

**Quantoren:**
- $\\\\forall x$ — "für alle $x$" (Allquantor)
- $\\\\exists x$ — "es existiert ein $x$" (Existenzquantor)

**Beispiel:** "$\\\\forall n \\\\in \\\\mathbb{N} : n + 1 > n$" — Für jede natürliche Zahl n gilt: n+1 ist größer als n. Das ist eine **wahre** Aussage.

### Warum ist das wichtig?

Mengenlehre und Logik sind das Fundament für ALLES was kommt:
- **Funktionen** sind spezielle Mengen (Relationen)
- **Beweise** verwenden logische Schlussregeln
- **Definitionen** in der Analysis arbeiten ständig mit Quantoren

> **Nächstes:** Als Nächstes behandeln wir die [Vollständige Induktion](#ma1-induktion) — eine der wichtigsten Beweistechniken der Mathematik.`,
    },
    // -----------------------------------------------------------------------
    // Lektion 2: Vollständige Induktion (NEU — gab es bisher nicht!)
    // -----------------------------------------------------------------------
    {
      id: "ma1-induktion",
      title: "2. Vollständige Induktion",
      duration: "40 min",
      type: "text",
      content: `## Vollständige Induktion — Das Beweiswerkzeug für Aussagen über ℕ

Die **vollständige Induktion** ist eine fundamentale Beweistechnik, mit der man Aussagen beweist, die für alle natürlichen Zahlen gelten sollen.

> **💡 Kernidee:** Wenn du eine unendlich lange Dominokette umwerfen willst, musst du zwei Dinge tun:
> 1. Den ersten Dominostein umwerfen
> 2. Sicherstellen, dass jeder fallende Stein den nächsten umwirft
>
> Genau das macht die Induktion!

### Das Induktionsprinzip

Um eine Aussage $A(n)$ für alle $n \\\\in \\\\mathbb{N}$ zu beweisen, zeige:

1. **Induktionsanfang (IA):** $A(1)$ ist wahr.
2. **Induktionsschritt (IS):** Für ein beliebiges $n \\\\in \\\\mathbb{N}$ gilt: Wenn $A(n)$ wahr ist (**Induktionsvoraussetzung**), dann ist auch $A(n+1)$ wahr (**Induktionsbehauptung**).

Daraus folgt: $A(n)$ gilt für alle $n \\\\in \\\\mathbb{N}$.

### Beispiel 1: Gaußsche Summenformel

> **Behauptung:** $1 + 2 + 3 + \\\\cdots + n = \\\\frac{n(n+1)}{2}$ für alle $n \\\\in \\\\mathbb{N}$

**Induktionsanfang ($n = 1$):**
Linke Seite: $1$
Rechte Seite: $\\\\frac{1 \\\\cdot 2}{2} = 1$
$1 = 1$ ✓

**Induktionsschritt ($n \\\\to n+1$):**
*Induktionsvoraussetzung (IV):* $1 + 2 + \\\\cdots + n = \\\\frac{n(n+1)}{2}$

*Zu zeigen:* $1 + 2 + \\\\cdots + n + (n+1) = \\\\frac{(n+1)(n+2)}{2}$

*Beweis:*
$$\\\\begin{aligned}
1 + 2 + \\\\cdots + n + (n+1) &= \\\\frac{n(n+1)}{2} + (n+1) \\\\quad \\\\text{(nach IV)} \\\\\\\\
&= \\\\frac{n(n+1) + 2(n+1)}{2} \\\\\\\\
&= \\\\frac{(n+1)(n+2)}{2} \\\\quad \\\\square
\\\\end{aligned}$$

### Beispiel 2: Bernoullische Ungleichung

> **Behauptung:** $(1+x)^n \\\\geq 1 + nx$ für alle $x \\\\geq -1$ und alle $n \\\\in \\\\mathbb{N}$

**Induktionsanfang ($n = 1$):** $(1+x)^1 = 1+x \\\\geq 1+1\\\\cdot x$ ✓

**Induktionsschritt:**
$$\\\\begin{aligned}
(1+x)^{n+1} &= (1+x)^n \\\\cdot (1+x) \\\\\\\\
&\\\\geq (1+nx)(1+x) \\\\quad \\\\text{(IV + } 1+x \\\\geq 0\\\\text{)} \\\\\\\\
&= 1 + x + nx + nx^2 \\\\\\\\
&\\\\geq 1 + (n+1)x \\\\quad \\\\text{(da } nx^2 \\\\geq 0\\\\text{)} \\\\; \\\\square
\\\\end{aligned}$$

### Typische Fehler

1. **Induktionsanfang vergessen** — Ohne den ersten Dominostein fällt nichts!
2. **Falsche Induktionsvoraussetzung** — Nicht $A(n+1)$ voraussetzen, sondern nur $A(n)$
3. **Nicht für ALLE n bewiesen** — Die Schlusskette muss für jedes n funktionieren

> **Übung:** Beweise $\\\\sum_{k=1}^n k^2 = \\\\frac{n(n+1)(2n+1)}{6}$ per Induktion.

> **Nächstes:** Jetzt schauen wir uns [Komplexe Zahlen](#ma1-komplex) an — eine Erweiterung der reellen Zahlen, die in der Elektrotechnik, Quantenmechanik und Signalverarbeitung unverzichtbar ist.`,
    },
    // -----------------------------------------------------------------------
    // Lektion 3: Komplexe Zahlen
    // -----------------------------------------------------------------------
    {
      id: "ma1-komplex",
      title: "3. Komplexe Zahlen",
      duration: "35 min",
      type: "interactive",
      interactive: "complexPlaneViewer",
      content: `## Komplexe Zahlen — Jenseits der reellen Achse

Was ist $\\\\sqrt{-1}$? In den reellen Zahlen gibt es darauf keine Antwort. Die **komplexen Zahlen** lösen dieses Problem durch Einführung der **imaginären Einheit** $i$ mit $i^2 = -1$.

> **Roter Faden:** Für eine interaktive Erkundung nutze das Modul [Komplexe Zahlen](/modules/mathe-komplexe-zahlen) — dort findest du auch Übungsaufgaben zu allen Rechenoperationen.

### Definition

Eine komplexe Zahl $z$ hat die Form:
$$z = a + bi$$

Dabei ist $a = \\\\operatorname{Re}(z)$ der **Realteil** und $b = \\\\operatorname{Im}(z)$ der **Imaginärteil**.

### Darstellungsformen

**1. Kartesische Form (algebraische Form):** $z = a + bi$

**2. Polarform (trigonometrische Form):**
$$z = r(\\\\cos\\\\varphi + i\\\\sin\\\\varphi)$$
wobei $r = |z| = \\\\sqrt{a^2 + b^2}$ der **Betrag** und $\\\\varphi = \\\\arg(z)$ das **Argument** ist.

**3. Exponentialform (Euler-Formel):**
$$z = r \\\\cdot e^{i\\\\varphi}$$

Die Euler-Formel $e^{i\\\\varphi} = \\\\cos\\\\varphi + i\\\\sin\\\\varphi$ ist eine der schönsten Gleichungen der Mathematik!

### Rechenoperationen

**Addition/Subtraktion:** Komponentenweise
$$(a+bi) + (c+di) = (a+c) + (b+d)i$$

**Multiplikation:** Ausmultiplizieren mit $i^2 = -1$
$$(a+bi)(c+di) = ac + adi + bci + bdi^2 = (ac-bd) + (ad+bc)i$$

**Division:** Erweitern mit dem komplex Konjugierten $\\\\overline{z} = a - bi$
$$\\\\frac{a+bi}{c+di} = \\\\frac{(a+bi)(c-di)}{(c+di)(c-di)} = \\\\frac{ac+bd}{c^2+d^2} + \\\\frac{bc-ad}{c^2+d^2}i$$

**In der Polarform ist Multiplikation viel einfacher:**
$$r_1 e^{i\\\\varphi_1} \\\\cdot r_2 e^{i\\\\varphi_2} = r_1 r_2 e^{i(\\\\varphi_1 + \\\\varphi_2)}$$

> **💡 Merke:** Multiplikation in Polarform = Beträge multiplizieren, Winkel addieren!

### Anwendung: Schwingungen

Komplexe Zahlen beschreiben Schwingungen elegant:
$$A \\\\cdot e^{i(\\\\omega t + \\\\varphi)} = A\\\\cos(\\\\omega t + \\\\varphi) + iA\\\\sin(\\\\omega t + \\\\varphi)$$

Die Projektion auf die reelle Achse gibt die physikalische Schwingung.

> **Nächstes:** Mit komplexen Zahlen können wir jetzt [Folgen & Konvergenz](#ma1-folgen) untersuchen — ein Thema, das den Übergang zur Analysis markiert.`,
    },
    // -----------------------------------------------------------------------
    // Lektion 4: Folgen & Konvergenz
    // -----------------------------------------------------------------------
    {
      id: "ma1-folgen",
      title: "4. Folgen & Konvergenz",
      duration: "35 min",
      type: "text",
      content: `## Folgen & Konvergenz — Der Grenzwertbegriff

Eine **Folge** ist eine nummerierte Liste von Zahlen: $a_1, a_2, a_3, \\\\ldots$. Formal: Eine Funktion $a: \\\\mathbb{N} \\\\to \\\\mathbb{R}$.

> **Roter Faden:** Das LearnHub-Modul [Folgen & Reihen](/modules/mathe-folgen-reihen) behandelt die Grundlagen — dort findest du arithmetische und geometrische Folgen im Detail.

### Konvergenz

Eine Folge $(a_n)$ **konvergiert** gegen den Grenzwert $a$, wenn die Folgenglieder dem Wert $a$ beliebig nahe kommen und dort bleiben.

**Formale Definition ($\\\\varepsilon$-Kriterium):**
$$\\\\forall \\\\varepsilon > 0 \\\\; \\\\exists N \\\\in \\\\mathbb{N} \\\\; \\\\forall n \\\\geq N: |a_n - a| < \\\\varepsilon$$

**Anschaulich:** Für jeden noch so kleinen Schlauch um $a$ liegen ab einem Index $N$ alle weiteren Folgenglieder innerhalb dieses Schlauchs.

### Wichtige Grenzwerte

| Folge | Grenzwert | Begründung |
|-------|-----------|------------|
| $\\\\frac{1}{n}$ | $0$ | Wird beliebig klein |
| $\\\\frac{n}{n+1}$ | $1$ | Kürzen: $\\\\frac{1}{1+1/n} \\\\to 1$ |
| $q^n$ mit $|q| < 1$ | $0$ | Geometrische Folge |
| $\\\\sqrt[n]{n}$ | $1$ | Standardgrenzwert |
| $\\\\left(1+\\\\frac{1}{n}\\\\right)^n$ | $e$ | Eulersche Zahl! |

### Rechenregeln für Grenzwerte

Wenn $a_n \\\\to a$ und $b_n \\\\to b$, dann:
- $a_n + b_n \\\\to a + b$
- $a_n \\\\cdot b_n \\\\to a \\\\cdot b$
- $\\\\frac{a_n}{b_n} \\\\to \\\\frac{a}{b}$ (falls $b \\\\neq 0$)

### Monotonie & Beschränktheit

Eine Folge heißt:
- **monoton wachsend**, wenn $a_{n+1} \\\\geq a_n$ für alle $n$
- **beschränkt**, wenn es ein $M$ gibt mit $|a_n| \\\\leq M$ für alle $n$

> **📖 Hauptsatz:** Jede monoton wachsende, nach oben beschränkte Folge konvergiert!

### Häufungspunkte

Eine Folge kann mehrere **Häufungspunkte** haben, auch wenn sie nicht konvergiert. Beispiel: $a_n = (-1)^n$ hat die Häufungspunkte $1$ und $-1$, konvergiert aber nicht.

> **Nächstes:** Aus Folgen entstehen durch Aufsummieren [Reihen](#ma1-reihen) — ein zentrales Konzept der Analysis.`,
    },
    // -----------------------------------------------------------------------
    // Lektion 5: Reihen
    // -----------------------------------------------------------------------
    {
      id: "ma1-reihen",
      title: "5. Reihen & Potenzreihen",
      duration: "40 min",
      type: "text",
      content: `## Reihen — Die Kunst des unendlichen Summierens

Eine **Reihe** entsteht, wenn man die Glieder einer Folge aufsummiert:

$$\\\\sum_{k=1}^{\\\\infty} a_k = a_1 + a_2 + a_3 + \\\\cdots$$

Die $n$-te **Partialsumme** ist $s_n = \\\\sum_{k=1}^n a_k$. Die Reihe **konvergiert**, wenn die Folge der Partialsummen $(s_n)$ konvergiert.

> **Roter Faden:** Das LearnHub-Modul [Reihen & Potenzreihen](/modules/mathe1-reihen) bietet ausführliche Beispiele und Übungen.

### Wichtige Reihen

**Geometrische Reihe:**
$$\\\\sum_{k=0}^{\\\\infty} q^k = \\\\frac{1}{1-q} \\\\quad \\\\text{für } |q| < 1$$

**Harmonische Reihe (divergiert!):**
$$\\\\sum_{k=1}^{\\\\infty} \\\\frac{1}{k} \\\\to \\\\infty$$

**Exponentialreihe:**
$$\\\\sum_{k=0}^{\\\\infty} \\\\frac{x^k}{k!} = e^x$$

### Konvergenzkriterien

1. **Notwendiges Kriterium:** $a_n \\\\to 0$ (sonst divergent!)
2. **Quotientenkriterium:** $\\\\lim |a_{n+1}/a_n| < 1 \\\\implies$ konvergent
3. **Wurzelkriterium:** $\\\\lim \\\\sqrt[n]{|a_n|} < 1 \\\\implies$ konvergent
4. **Leibniz-Kriterium:** Für alternierende Reihen mit $|a_n| \\\\searrow 0$ gilt Konvergenz
5. **Majorantenkriterium:** Vergleich mit bekannter konvergenter Reihe

### Potenzreihen

Eine **Potenzreihe** hat die Form:
$$\\\\sum_{k=0}^{\\\\infty} c_k (x - x_0)^k$$

Der **Konvergenzradius** $R$ gibt an, für welche $x$ die Reihe konvergiert:
$$R = \\\\lim_{k \\\\to \\\\infty} \\\\left|\\\\frac{c_k}{c_{k+1}}\\\\right| \\\\quad \\\\text{(falls der Grenzwert existiert)}$$

> **💡 Potenzreihen sind enorm wichtig!** Mit ihnen werden Funktionen wie $\\\\sin(x)$, $\\\\cos(x)$ und $e^x$ definiert und berechnet. Mehr dazu im Modul [Taylorreihen](/modules/mathe-taylorreihen).

> **Nächstes:** Nachdem wir das Summieren unendlich vieler Terme verstehen, wenden wir uns den [Funktionen & Grenzwerten](#ma1-funktionen) zu — dem Herzstück der Analysis.`,
    },
    // -----------------------------------------------------------------------
    // Lektion 6: Funktionen & Grenzwerte
    // -----------------------------------------------------------------------
    {
      id: "ma1-funktionen",
      title: "6. Funktionen & Grenzwerte",
      duration: "30 min",
      type: "interactive",
      interactive: "functionExplorer",
      content: `## Funktionen & Grenzwerte — Das Verhalten von Funktionen

Eine **Funktion** $f: D \\\\to \\\\mathbb{R}$ ordnet jedem Element $x$ aus dem Definitionsbereich $D$ genau einen Wert $f(x)$ zu.

> **Roter Faden:** Das Modul [Funktionen & Graphen](/modules/mathe-funktionen) erklärt die Grundlagen, [Grenzwerte](/modules/mathe1-grenzwerte) vertieft den Grenzwertbegriff für Funktionen.

### Grenzwerte von Funktionen

$\\\\lim_{x \\\\to a} f(x) = L$ bedeutet: Wenn $x$ gegen $a$ läuft, nähert sich $f(x)$ dem Wert $L$ an.

**Wichtig:** $f(a)$ muss NICHT gleich $L$ sein — der Grenzwert beschreibt das Verhalten in der Nähe von $a$.

### Stetigkeit

Eine Funktion $f$ ist **stetig** an der Stelle $a$, wenn:
$$\\\\lim_{x \\\\to a} f(x) = f(a)$$

Anschaulich: Der Graph hat keinen Sprung, man kann ihn ohne Absetzen zeichnen.

### Regel von L'Hôpital

Wenn $\\\\lim \\\\frac{f(x)}{g(x)}$ die Form $\\\\frac{0}{0}$ oder $\\\\frac{\\\\infty}{\\\\infty}$ hat:
$$\\\\lim \\\\frac{f(x)}{g(x)} = \\\\lim \\\\frac{f'(x)}{g'(x)}$$

> **💡 L'Hôpital ist mächtig für Grenzwertberechnungen!** Vorher prüfen, ob die Voraussetzungen wirklich erfüllt sind.

### Grenzwerte im Unendlichen

$\\\\lim_{x \\\\to \\\\infty} f(x)$ beschreibt das **asymptotische Verhalten**.

Beispiele:
- $\\\\lim_{x \\\\to \\\\infty} \\\\frac{1}{x} = 0$ (waagerechte Asymptote $y = 0$)
- $\\\\lim_{x \\\\to \\\\infty} e^{-x} = 0$
- $\\\\lim_{x \\\\to \\\\infty} \\\\frac{x^2+1}{x^2-1} = 1$

> **Nächstes:** Mit dem Grenzwert können wir die [Differentialrechnung](#ma1-ableitungen) definieren — das Werkzeug zur Analyse von Änderungsraten.`,
    },
    // -----------------------------------------------------------------------
    // Lektion 7: Differentialrechnung
    // -----------------------------------------------------------------------
    {
      id: "ma1-ableitungen",
      title: "7. Differentialrechnung",
      duration: "45 min",
      type: "text",
      content: `## Differentialrechnung — Die Mathematik der Veränderung

Die **Ableitung** $f'(x)$ misst die momentane Änderungsrate einer Funktion — anschaulich: die Steigung der Tangente.

> **Roter Faden:** Das Modul [Differentialrechnung](/modules/mathe1-ableitungen) behandelt Ableitungsregeln systematisch, [Kurvendiskussion](/modules/mathe-kurvendiskussion) wendet sie zur Funktionsanalyse an.

### Definition

$$f'(x_0) = \\\\lim_{h \\\\to 0} \\\\frac{f(x_0 + h) - f(x_0)}{h}$$

Dieser Grenzwert heißt **Differenzenquotient** oder **Differentialquotient**.

### Ableitungsregeln (Überblick)

| Regel | Formel |
|-------|--------|
| Potenzregel | $(x^n)' = nx^{n-1}$ |
| Faktorregel | $(c \\\\cdot f)' = c \\\\cdot f'$ |
| Summenregel | $(f + g)' = f' + g'$ |
| Produktregel | $(f \\\\cdot g)' = f'g + fg'$ |
| Quotientenregel | $(f/g)' = \\\\frac{f'g - fg'}{g^2}$ |
| Kettenregel | $(f \\\\circ g)' = f'(g) \\\\cdot g'$ |

### Ableitungen wichtiger Funktionen

| $f(x)$ | $f'(x)$ |
|--------|---------|
| $e^x$ | $e^x$ |
| $\\\\ln x$ | $\\\\frac{1}{x}$ |
| $\\\\sin x$ | $\\\\cos x$ |
| $\\\\cos x$ | $-\\\\sin x$ |
| $\\\\tan x$ | $\\\\frac{1}{\\\\cos^2 x}$ |

### Mittelwertsatz der Differentialrechnung

Wenn $f$ stetig auf $[a,b]$ und differenzierbar auf $(a,b)$ ist, dann existiert ein $\\\\xi \\\\in (a,b)$ mit:
$$f'(\\\\xi) = \\\\frac{f(b) - f(a)}{b - a}$$

Anschaulich: Es gibt mindestens einen Punkt, an dem die Tangente parallel zur Sekante ist.

### Extremwerte finden

1. **Notwendige Bedingung:** $f'(x) = 0$ (Kandidaten finden)
2. **Hinreichende Bedingung:** $f''(x) > 0$ (Minimum) oder $f''(x) < 0$ (Maximum)

> **Nachstes:** Die Umkehrung der Ableitung ist die [Integralrechnung](#ma1-integration) — sie berechnet Flächen unter Kurven.`,
    },
    // -----------------------------------------------------------------------
    // Lektion 8: Integralrechnung
    // -----------------------------------------------------------------------
    {
      id: "ma1-integration",
      title: "8. Integralrechnung",
      duration: "45 min",
      type: "interactive",
      interactive: "integralExplorer",
      content: `## Integralrechnung — Flächen, Volumen und mehr

Das **Integral** ist die Umkehrung der Ableitung (Hauptsatz der Analysis) und berechnet Flächeninhalte unter Kurven.

> **Roter Faden:** [Integralrechnung](/modules/mathe1-integration) erklärt die Grundlagen mit interaktivem Explorer.

### Bestimmtes vs. unbestimmtes Integral

- **Unbestimmtes Integral:** $\\\\int f(x)\\\\,dx = F(x) + C$ (Stammfunktion + Konstante)
- **Bestimmtes Integral:** $\\\\int_a^b f(x)\\\\,dx = F(b) - F(a)$ (Zahl = Fläche unter Kurve)

### Hauptsatz der Differential- und Integralrechnung

$$\\\\frac{d}{dx} \\\\int_a^x f(t)\\\\,dt = f(x)$$

**Das ist der wichtigste Satz der Analysis!** Er verbindet Ableiten und Integrieren als inverse Operationen.

### Integrationsregeln

| Regel | Formel |
|-------|--------|
| Potenzregel | $\\\\int x^n\\\\,dx = \\\\frac{x^{n+1}}{n+1} + C$ |
| Linearität | $\\\\int (af + bg) = a\\\\int f + b\\\\int g$ |
| Partielle Integration | $\\\\int u\\\\,dv = uv - \\\\int v\\\\,du$ |
| Substitution | $\\\\int f(g(x))g'(x)\\\\,dx = \\\\int f(u)\\\\,du$ |

### Partielle Integration (Produktintegration)

Formel: $\\\\int_a^b u(x)v'(x)\\\\,dx = [u(x)v(x)]_a^b - \\\\int_a^b u'(x)v(x)\\\\,dx$

> **💡 Faustregel:** $u$ sollte beim Ableiten einfacher werden (L = Logarithmus, I = inverse trigonometrische, A = algebraisch, T = trigonometrisch, E = Exponential — "LIATE"-Regel).

### Substitutionsregel

$\\\\int_a^b f(g(x)) \\\\cdot g'(x)\\\\,dx = \\\\int_{g(a)}^{g(b)} f(u)\\\\,du$

**Anschaulich:** Ersetze den "inneren Teil" durch eine neue Variable.

### Anwendungen

- **Flächenberechnung:** $A = \\\\int_a^b |f(x)|\\\\,dx$
- **Volumen von Rotationskörpern:** $V = \\\\pi\\\\int_a^b [f(x)]^2\\\\,dx$
- **Bogenlänge:** $L = \\\\int_a^b \\\\sqrt{1 + [f'(x)]^2}\\\\,dx$

> **Nachstes:** [Vektoren & Matrizen](#ma1-vektoren) — das Fundament der Linearen Algebra.`,
    },
    // -----------------------------------------------------------------------
    // Lektion 9: Vektoren & Matrizen
    // -----------------------------------------------------------------------
    {
      id: "ma1-vektoren",
      title: "9. Vektoren & Matrizen",
      duration: "40 min",
      type: "text",
      content: `## Vektoren & Matrizen — Die Sprache der Linearen Algebra

Vektoren beschreiben Punkte und Richtungen im Raum. Matrizen sind rechteckige Zahlenschemata, die lineare Abbildungen darstellen.

> **Roter Faden:** [Vektoren & Lineare Algebra](/modules/mathe2-vektoren) und [Matrizen & Determinanten](/modules/mathe-matrizen) bieten ausführliche Erklärungen und Übungen.

### Vektoren

Ein **Vektor** $\\\\vec{v} = \\\\begin{pmatrix} v_1 \\\\\\\\ v_2 \\\\\\\\ \\\\vdots \\\\\\\\ v_n \\\\end{pmatrix}$ ist ein $n$-Tupel von Zahlen.

**Operationen:**
- **Addition:** $\\\\vec{v} + \\\\vec{w} = \\\\begin{pmatrix} v_1+w_1 \\\\\\\\ \\\\vdots \\\\\\\\ v_n+w_n \\\\end{pmatrix}$
- **Skalarmultiplikation:** $\\\\lambda \\\\vec{v} = \\\\begin{pmatrix} \\\\lambda v_1 \\\\\\\\ \\\\vdots \\\\\\\\ \\\\lambda v_n \\\\end{pmatrix}$
- **Skalarprodukt:** $\\\\vec{v} \\\\cdot \\\\vec{w} = v_1 w_1 + \\\\cdots + v_n w_n$
- **Kreuzprodukt (nur ℝ³):** $\\\\vec{v} \\\\times \\\\vec{w}$ (Vektor senkrecht auf beiden)

### Lineare (Un-)Abhängigkeit

Vektoren $\\\\vec{v}_1, \\\\ldots, \\\\vec{v}_k$ heißen **linear unabhängig**, wenn aus $\\\\lambda_1\\\\vec{v}_1 + \\\\cdots + \\\\lambda_k\\\\vec{v}_k = \\\\vec{0}$ folgt: $\\\\lambda_1 = \\\\cdots = \\\\lambda_k = 0$.

**Anschaulich:** Kein Vektor lässt sich als Kombination der anderen darstellen.

### Matrizen

Eine $m \\\\times n$-**Matrix** hat $m$ Zeilen und $n$ Spalten:

$$A = \\\\begin{pmatrix} a_{11} & a_{12} & \\\\cdots & a_{1n} \\\\\\\\ a_{21} & a_{22} & \\\\cdots & a_{2n} \\\\\\\\ \\\\vdots & \\\\vdots & \\\\ddots & \\\\vdots \\\\\\\\ a_{m1} & a_{m2} & \\\\cdots & a_{mn} \\\\end{pmatrix}$$

**Matrix-Vektor-Produkt:** $A\\\\vec{x} = \\\\vec{b}$ — eine der wichtigsten Operationen!

**Rechenregeln:**
- $(A+B)C = AC + BC$ (Distributivgesetz)
- $A(BC) = (AB)C$ (Assoziativgesetz)
- $AB \\\\neq BA$ (NICHT kommutativ!)

> **💡 Eine Matrix IST eine lineare Abbildung — das ist die zentrale Erkenntnis der Linearen Algebra!**

> **Nächstes:** Matrizen helfen beim Lösen von [Linearen Gleichungssystemen](#ma1-lgs).`,
    },
    // -----------------------------------------------------------------------
    // Lektion 10: Lineare Gleichungssysteme
    // -----------------------------------------------------------------------
    {
      id: "ma1-lgs",
      title: "10. Lineare Gleichungssysteme",
      duration: "35 min",
      type: "text",
      content: `## Lineare Gleichungssysteme — Lösen mit System

Ein **Lineares Gleichungssystem (LGS)** besteht aus mehreren linearen Gleichungen mit mehreren Unbekannten.

> **Roter Faden:** [Lineare Gleichungssysteme](/modules/mathe-gleichungssysteme) erklärt Einsetzungs- und Gauß-Verfahren mit Übungen.

### Matrix-Schreibweise

Das LGS $A\\\\vec{x} = \\\\vec{b}$:

$$\\\\begin{pmatrix} a_{11} & \\\\cdots & a_{1n} \\\\\\\\ \\\\vdots & \\\\ddots & \\\\vdots \\\\\\\\ a_{m1} & \\\\cdots & a_{mn} \\\\end{pmatrix} \\\\begin{pmatrix} x_1 \\\\\\\\ \\\\vdots \\\\\\\\ x_n \\\\end{pmatrix} = \\\\begin{pmatrix} b_1 \\\\\\\\ \\\\vdots \\\\\\\\ b_m \\\\end{pmatrix}$$

### Gauß-Algorithmus (Gaußsches Eliminationsverfahren)

1. Schreibe die **erweiterte Koeffizientenmatrix** $(A|b)$
2. Bringe sie durch elementare Zeilenumformungen auf **Zeilenstufenform**
3. Löse von unten nach oben durch **Rückwärtseinsetzen**

**Erlaubte Zeilenumformungen:**
- Vertauschen zweier Zeilen
- Multiplizieren einer Zeile mit einer Zahl $\\\\neq 0$
- Addieren eines Vielfachen einer Zeile zu einer anderen

### Beispiel

Löse:
$$\\\\begin{aligned}
x_1 + 2x_2 + x_3 &= 4 \\\\\\\\
2x_1 + 5x_2 + 3x_3 &= 10 \\\\\\\\
-x_1 + x_2 - 2x_3 &= -3
\\\\end{aligned}$$

**Erweiterte Matrix:**
$$\\\\left(\\\\begin{array}{ccc|c} 1 & 2 & 1 & 4 \\\\\\\\ 2 & 5 & 3 & 10 \\\\\\\\ -1 & 1 & -2 & -3 \\\\end{array}\\\\right)$$

**Gauß-Schritte:**
1. $Z_2 - 2Z_1$ und $Z_3 + Z_1$
2. $Z_3 - 3Z_2$
3. Rückwärtseinsetzen: $x_3 = 1$, $x_2 = 1$, $x_1 = 1$

### Lösbarkeit

Ein LGS kann haben:
- **Genau eine Lösung** (reguläre Matrix, $\\\\det A \\\\neq 0$)
- **Unendlich viele Lösungen** (Rang < Anzahl Unbekannter)
- **Keine Lösung** (Widerspruch in den Gleichungen)

### Rang einer Matrix

Der **Rang** ist die Anzahl der linear unabhängigen Zeilen (oder Spalten). Ein LGS $A\\\\vec{x} = \\\\vec{b}$ ist lösbar genau dann, wenn $\\\\operatorname{Rang}(A) = \\\\operatorname{Rang}(A|b)$.

> **🎓 Prüfungs-Tipp für TH OWL:** Der Gauß-Algorithmus kommt in JEDER Mathe-1-Klausur dran. Übe das Aufstellen der Matrix, die Zeilenumformungen und das Rückwärtseinsetzen, bis es automatisch sitzt!

---

> ## 📚 Nächste Schritte
>
> Dieses Modul hat dir einen Überblick über alle Mathe-1-Themen gegeben. Für jedes Thema gibt es ein ausführliches LearnHub-Modul mit Erklärungen, interaktiven Tools und Übungsaufgaben:
>
> - [Mengenlehre & Logik](/modules/mathe-mengenlehre) — Grundlagen
> - [Funktionen & Graphen](/modules/mathe-funktionen) — Grundlagen
> - [Grenzwerte](/modules/mathe1-grenzwerte) — Analysis
> - [Differentialrechnung](/modules/mathe1-ableitungen) — Analysis
> - [Integralrechnung](/modules/mathe1-integration) — Analysis
> - [Folgen & Reihen](/modules/mathe-folgen-reihen) — Analysis
> - [Reihen & Potenzreihen](/modules/mathe1-reihen) — Analysis
> - [Taylorreihen](/modules/mathe-taylorreihen) — Analysis
> - [Kurvendiskussion](/modules/mathe-kurvendiskussion) — Analysis
> - [Lineare Gleichungssysteme](/modules/mathe-gleichungssysteme) — Lineare Algebra
> - [Vektoren & Lineare Algebra](/modules/mathe2-vektoren) — Lineare Algebra
> - [Matrizen & Determinanten](/modules/mathe-matrizen) — Lineare Algebra
> - [Logik & Beweise](/modules/mathe-logik) — Grundlagen
>
> **Viel Erfolg bei der Klausur!** 🎓`,
    },
  ],
  merkblatt: `## Mathe 1 — Merkblatt TH OWL

### Wichtige Mengen
- $\\\\mathbb{N}$ = {1, 2, 3, ...}
- $\\\\mathbb{Z}$ = {..., -2, -1, 0, 1, 2, ...}
- $\\\\mathbb{Q}$ = alle Brüche $a/b$
- $\\\\mathbb{R}$ = reelle Zahlen
- $\\\\mathbb{C}$ = komplexe Zahlen $a+bi$

### Induktionsbeweis (Schema)
1. **IA:** Zeige $A(1)$
2. **IV:** Nimm $A(n)$ als wahr an
3. **IS:** Zeige $A(n) \\\\implies A(n+1)$

### Grenzwerte (wichtige)
- $\\\\lim\\\\frac{1}{n}=0$, $\\\\lim q^n=0$ ($|q|<1$)
- $\\\\lim\\\\frac{\\\\ln n}{n}=0$, $\\\\lim\\\\sqrt[n]{n}=1$

### Ableitungen
- $(x^n)' = nx^{n-1}$
- $(e^x)' = e^x$, $(\\\\ln x)' = 1/x$
- $(\\\\sin x)' = \\\\cos x$, $(\\\\cos x)' = -\\\\sin x$
- Kettenregel: $(f(g(x)))' = f'(g(x)) \\\\cdot g'(x)$

### Integrale
- $\\\\int x^n dx = \\\\frac{x^{n+1}}{n+1}+C$
- $\\\\int e^x dx = e^x+C$, $\\\\int \\\\frac{1}{x}dx = \\\\ln|x|+C$
- Partielle Int.: $\\\\int uv' = uv - \\\\int u'v$

### LGS: Gauß-Verfahren
1. Matrix $(A|b)$ aufstellen
2. Zeilenstufenform durch Umformungen
3. Rückwärtseinsetzen`,
};
