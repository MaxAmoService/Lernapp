import { Module, QuizQuestion } from "./types";

export const complexModule: Module = {
  id: "m-komplexe-zahlen",
  slug: "mathe-komplexe-zahlen",
  title: "Komplexe Zahlen",
  description: "Von der imaginären Einheit bis zu Wurzeln in der Gaußsche Ebene — interaktiv und verständlich",
  icon: "🌀",
  color: "#8b5cf6",
  category: "analysis",
  progress: 0,
  merkblatt: `## Merkblatt: Komplexe Zahlen

### Grundlagen
- Imaginäre Einheit: $j = \\sqrt{-1}$, also $j^2 = -1$
- Komplexe Zahl: $z = x + jy$ mit $x, y \\in \\mathbb{R}$

### Darstellungsformen
| Form | Schreibweise |
|------|-------------|
| Normalform | $z = x + jy$ |
| Trigonometrisch | $z = r(\\cos\\varphi + j\\sin\\varphi)$ |
| Exponentialform | $z = r \\cdot e^{j\\varphi}$ |

### Umrechnung
- $r = |z| = \\sqrt{x^2 + y^2}$
- $\\varphi = \\arctan\\frac{y}{x}$ (+ Quadrantenkorrektur!)

### Rechenregeln
- Addition: $(x_1+x_2) + j(y_1+y_2)$
- Multiplikation: $r_1 r_2 \\cdot e^{j(\\varphi_1+\\varphi_2)}$
- Division: $\\frac{r_1}{r_2} \\cdot e^{j(\\varphi_1-\\varphi_2)}$
- Konjugiertes: $\\bar{z} = x - jy$
- De Moivre: $z^n = r^n e^{jn\\varphi}$
- Wurzeln: $w_k = r^{1/n} e^{j(\\varphi+2k\\pi)/n}$

### Potenzen von j
$j^1 = j$, $j^2 = -1$, $j^3 = -j$, $j^4 = 1$ (zyklisch!)`,

  lessons: [
    // ══════════════════════════════════════════════════════════════
    // LEKTION 1: Grundlagen
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-1",
      title: "Warum komplexe Zahlen?",
      duration: "15 min",
      type: "text",
      content: `## Das Problem

Stell dir vor, du sollst $x^2 + 1 = 0$ lösen.

Umformen: $x^2 = -1$

Keine reelle Zahl quadriert zu $-1$! Denn $x^2 \\geq 0$ für alle $x \\in \\mathbb{R}$.

Also erfinden wir eine neue Zahl.

---

## Die imaginäre Einheit $j$

$$j = \\sqrt{-1} \\quad \\Rightarrow \\quad j^2 = -1$$

Das ist keine normale Zahl — aber mit ihr können wir rechnen!

Warum $j$ und nicht $i$? In der Mathematik verwendet man $i$, aber in der Elektrotechnik steht $i$ für den Strom. Deshalb nutzt man in der Technik $j$.

---

## Komplexe Zahlen

$$z = x + j \\cdot y$$

- $x = \\text{Re}(z)$ — der Realteil
- $y = \\text{Im}(z)$ — der Imaginärteil
- Wenn $y = 0$: $z = x$ — reelle Zahl (Spezialfall!)
- Wenn $x = 0$: $z = jy$ — rein imaginäre Zahl

---

## Beispiele

| Zahl | Re | Im | Bemerkung |
|------|---:|---:|-----------|
| $3 + 4j$ | 3 | 4 | komplexe Zahl |
| $-2 + 5j$ | -2 | 5 | negativer Realteil |
| $7$ | 7 | 0 | reell! |
| $-3j$ | 0 | -3 | rein imaginär |
| $0$ | 0 | 0 | Ursprung |

---

## Potenzen von $j$ — der Zyklus

Die Potenzen von $j$ wiederholen sich alle 4 Schritte:

$$j^1 = j \\rightarrow j^2 = -1 \\rightarrow j^3 = -j \\rightarrow j^4 = 1 \\rightarrow j^5 = j \\rightarrow \\ldots$$

Merke: $j^n = j^{n \\bmod 4}$ — einfach den Rest bei Division durch 4 berechnen!

---

### Beispiel: $j^6$ berechnen

$j^6 = j^4 \\cdot j^2 = 1 \\cdot (-1) = -1$

Denn $j^4 = (j^2)^2 = (-1)^2 = 1$ und $j^2 = -1$.

### Beispiel: $2j \\cdot 3j$ berechnen

$2j \\cdot 3j = 6j^2 = 6 \\cdot (-1) = -6$

Denn $j^2 = -1$ — das ist die wichtigste Regel!

---

[PRACTICE_START]
TITLE:Potenzen & Grundlagen von $j$
[Q]
$j^6 = ?$
[A]
$-1$ — $j^6 = j^4 \\cdot j^2 = 1 \\cdot (-1) = -1$
[Q]
$2j \\cdot 3j = ?$
[A]
$-6$ — $6j^2 = 6 \\cdot (-1) = -6$
[Q]
$j^8 = ?$
[A]
$1$ — denn $8 \\bmod 4 = 0$, also $j^8 = (j^4)^2 = 1$
[Q]
$j^{15} = ?$
[A]
$-j$ — denn $15 \\bmod 4 = 3$, also $j^{15} = j^3 = -j$
[Q]
$(1+j) + (3-2j) = ?$
[A]
$4 - j$ — Real: $1+3=4$, Imag: $1-2=-1$
[Q]
$(2j)^2 = ?$
[A]
$-4$ — $(2j)^2 = 4j^2 = 4(-1) = -4$
[Q]
$j^3 + j^4 + j^5 = ?$
[A]
$1$ — $-j + 1 + j = 1$
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 2: Gaußsche Ebene
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-2",
      title: "Die Gaußsche Zahlenebene",
      duration: "15 min",
      type: "interactive",
      interactive: "complexPlaneViewer",
      content: `## Von 1D zu 2D

Reelle Zahlen leben auf einer Zahlengerade (1D). Komplexe Zahlen brauchen eine Ebene (2D) — die Gaußsche Zahlenebene.

---

## So funktioniert's

- Horizontal (x-Achse): Realteil $\\text{Re}(z)$
- Vertikal (y-Achse): Imaginärteil $\\text{Im}(z)$

$z = x + jy$ wird als Punkt bei $(x, y)$ gezeichnet.

---

## Der Betrag — Abstand vom Ursprung

$$r = |z| = \\sqrt{x^2 + y^2}$$

Das ist der Abstand des Punktes $(x, y)$ vom Ursprung — nach dem Satz des Pythagoras!

---

## Beispiele

| $z$ | Punkt | Betrag $|z|$ |
|-----|-------|------|
| $3 + 4j$ | $(3, 4)$ | $5$ |
| $-2 + j$ | $(-2, 1)$ | $\\sqrt{5}$ |
| $5j$ | $(0, 5)$ | $5$ |
| $-4$ | $(-4, 0)$ | $4$ |

---

[INTERACTIVE]

---

[GUIDED_START]
TITLE:Zeichne $z = -3 + 2j$ ein
[STEP]
Realteil ablesen: $x = -3$ — gehe 3 nach links
[STEP]
Imaginärteil ablesen: $y = 2$ — gehe 2 nach oben
[STEP]
Punkt markieren bei $(-3, 2)$
[STEP]
Abstand: $r = \\sqrt{(-3)^2 + 2^2} = \\sqrt{13} \\approx 3.6$
[RESULT]
$z = -3 + 2j$ liegt bei $(-3, 2)$ mit Betrag $r = \\sqrt{13}$
[GUIDED_END]

[PRACTICE_START]
TITLE:Gaußsche Ebene — Zahlen einzeichnen
[Q]
$z_1 = 2 + 3j$ — wo liegt der Punkt?
[A]
$(2, 3)$ — Re=2, Im=3, also 2 rechts, 3 oben
[Q]
$z_2 = -4 + j$ — wo liegt der Punkt?
[A]
$(-4, 1)$ — Re=-4, Im=1, also 4 links, 1 oben
[Q]
$z_3 = -3 - 2j$ — wo liegt der Punkt?
[A]
$(-3, -2)$ — Re=-3, Im=-2, also 3 links, 2 unten
[Q]
$z_4 = 5j$ — wo liegt der Punkt?
[A]
$(0, 5)$ — rein imaginär, auf der Im-Achse
[Q]
$z_5 = -4$ — wo liegt der Punkt?
[A]
$(-4, 0)$ — reell, auf der Re-Achse
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 3: Darstellungsformen
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-3",
      title: "Die drei Darstellungsformen",
      duration: "20 min",
      type: "interactive",
      interactive: "complexFormConverter",
      content: `## Drei Wege, eine Zahl

Eine komplexe Zahl kann man auf drei Arten schreiben. Jede hat ihre Vorteile.

---

## 1. Normalform

$$z = x + jy$$

Gut zum Addieren und Subtrahieren. Die Standardform.

---

## 2. Trigonometrische Form

$$z = r \\cdot (\\cos\\varphi + j\\sin\\varphi)$$

- $r = |z| = \\sqrt{x^2 + y^2}$ — Betrag (Pythagoras!)
- $\\varphi$ — Winkel gegen die positive Re-Achse

Gut zum Multiplizieren und Visualisieren.

---

## 3. Exponentialform (Euler)

$$z = r \\cdot e^{j\\varphi}$$

Euler-Formel: $e^{j\\varphi} = \\cos\\varphi + j\\sin\\varphi$

Die kürzeste Schreibweise. Ideal für Rechnungen!

---

## Umrechnung: Normalform zur Exponentialform

Schritt 1: Betrag berechnen — $r = \\sqrt{x^2 + y^2}$

Schritt 2: Winkel berechnen — $\\varphi = \\arctan\\frac{y}{x}$

Schritt 3: Quadranten-Korrektur!

| Quadrant | x | y | Korrektur |
|----------|---|---|-----------|
| I (rechts oben) | + | + | keine |
| II (links oben) | $-$ | + | $+180°$ |
| III (links unten) | $-$ | $-$ | $+180°$ |
| IV (rechts unten) | + | $-$ | $+360°$ |

---

## Umrechnung: Exponentialform zur Normalform

$x = r \\cdot \\cos\\varphi$, $y = r \\cdot \\sin\\varphi$

---

[INTERACTIVE]

---

[GUIDED_START]
TITLE:Wandle $z = 3 + 4j$ in Exponentialform um
[STEP]
Betrag: $r = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$
[STEP]
Winkel: $\\tan\\varphi = 4/3 = 1.333$ — $\\varphi = 53.13°$
[STEP]
Quadrant: $x > 0, y > 0$ — Quadrant I — keine Korrektur!
[RESULT]
$z = 5 e^{j53.13°}$
[GUIDED_END]

[GUIDED_START]
TITLE:Wandle $z = -3 - 3j$ um (Quadrant III!)
[STEP]
$r = \\sqrt{(-3)^2 + (-3)^2} = \\sqrt{18} = 3\\sqrt{2} \\approx 4.24$
[STEP]
$\\arctan((-3)/(-3)) = \\arctan(1) = 45°$
[STEP]
$x < 0, y < 0$ — Quadrant III — Korrektur: $+180°$
[STEP]
$\\varphi = 45° + 180° = 225°$
[RESULT]
$z = 3\\sqrt{2} \\cdot e^{j225°}$
[GUIDED_END]

[PRACTICE_START]
TITLE:Darstellungsformen umrechnen
[Q]
$1 + j$ in Exponentialform?
[A]
$\\sqrt{2} e^{j45°}$ — $r=\\sqrt{2}$, $\\varphi=45°$ (Quadrant I)
[Q]
$2e^{j60°}$ in Normalform?
[A]
$1 + 1.732j$ — $x=2\\cos60°=1$, $y=2\\sin60°=1.732$
[Q]
$-4 + 4j$ in Exponentialform?
[A]
$4\\sqrt{2} e^{j135°}$ — $r=4\\sqrt{2}$, Quadrant II: $\\varphi=135°$
[Q]
$3e^{j270°}$ in Normalform?
[A]
$-3j$ — $x=3\\cos270°=0$, $y=3\\sin270°=-3$
[Q]
$-5$ in Exponentialform?
[A]
$5e^{j180°}$ — $r=5$, $\\varphi=180°$ (reell, negativ)
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 4: Addition & Subtraktion
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-4",
      title: "Addition & Subtraktion",
      duration: "12 min",
      type: "text",
      content: `## Die einfachste Rechenart

Addition und Subtraktion funktionieren nur in Normalform. Aber dafür total einfach!

---

## Die Regel

$$z_1 + z_2 = (x_1 + x_2) + j(y_1 + y_2)$$

$$z_1 - z_2 = (x_1 - x_2) + j(y_1 - y_2)$$

Realteile zusammen, Imaginärteile zusammen! Mehr ist es nicht.

---

## Geometrische Bedeutung

In der Gaußschen Ebene ist Addition wie Vektoraddition: Man legt die Pfeile aneinander.

---

[GUIDED_START]
TITLE:$(3 + 2j) + (1 - 4j)$
[STEP]
Realteile: $3 + 1 = 4$
[STEP]
Imaginärteile: $2 + (-4) = -2$
[RESULT]
$4 - 2j$
[GUIDED_END]

[GUIDED_START]
TITLE:$(-1 + 4j) - (3 + 2j)$
[STEP]
Realteile: $-1 - 3 = -4$
[STEP]
Imaginärteile: $4 - 2 = 2$
[RESULT]
$-4 + 2j$
[GUIDED_END]

[GUIDED_START]
TITLE:$(6 + j) - (-2 + 3j)$
[STEP]
Realteile: $6 - (-2) = 8$
[STEP]
Imaginärteile: $1 - 3 = -2$
[RESULT]
$8 - 2j$
[GUIDED_END]

[PRACTICE_START]
TITLE:Addition & Subtraktion
[Q]
$(5 + 3j) + (2 - 7j) = ?$
[A]
$7 - 4j$ — Real: $5+2=7$, Imag: $3-7=-4$
[Q]
$(2j) + (3 - 5j) = ?$
[A]
$3 - 3j$ — Real: $0+3=3$, Imag: $2-5=-3$
[Q]
$(1 + 2j) + (3 + 4j) + (-5 - j) = ?$
[A]
$-1 + 5j$ — Real: $1+3-5=-1$, Imag: $2+4-1=5$
[Q]
$(4 - 2j) - (4 - 2j) = ?$
[A]
$0$ — gleiche Zahlen, Differenz ist 0
[Q]
$10 - (3 + 7j) = ?$
[A]
$7 - 7j$ — Real: $10-3=7$, Imag: $0-7=-7$
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 5: Multiplikation
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-5",
      title: "Multiplikation",
      duration: "18 min",
      type: "interactive",
      interactive: "complexOperationsCalculator",
      content: `## Zwei Wege der Multiplikation

---

## In Normalform (FOIL)

$$z_1 \\cdot z_2 = (x_1 x_2 - y_1 y_2) + j(x_1 y_2 + x_2 y_1)$$

Ausmultiplizieren (FOIL: First, Outer, Inner, Last) und $j^2 = -1$ einsetzen.

Herkunft der Formel:

$(x_1 + jy_1)(x_2 + jy_2)$

$= x_1 x_2 + j x_1 y_2 + j x_2 y_1 + j^2 y_1 y_2$

$= x_1 x_2 + j(x_1 y_2 + x_2 y_1) - y_1 y_2$

$= (x_1 x_2 - y_1 y_2) + j(x_1 y_2 + x_2 y_1)$

---

## In Exponentialform (viel einfacher!)

$$z_1 \\cdot z_2 = r_1 r_2 \\cdot e^{j(\\varphi_1 + \\varphi_2)}$$

Beträge multiplizieren, Winkel addieren! Das ist der große Vorteil der Exponentialform.

---

[INTERACTIVE]

---

[GUIDED_START]
TITLE:$(2 + 3j) \\cdot (1 - 2j)$ (FOIL)
[STEP]
Erste Terme: $2 \\cdot 1 = 2$
[STEP]
$j^2$-Term: $3j \\cdot (-2j) = -6j^2 = +6$
[STEP]
Kreuzterme: $2 \\cdot (-2j) + 3j \\cdot 1 = -4j + 3j = -j$
[STEP]
Zusammen: $(2+6) + j(-1) = 8 - j$
[RESULT]
$(2+3j)(1-2j) = 8 - j$
[GUIDED_END]

[GUIDED_START]
TITLE:$4e^{j20°} \\cdot 3e^{j30°}$ (Exponentialform)
[STEP]
Beträge: $4 \\cdot 3 = 12$
[STEP]
Winkel: $20° + 30° = 50°$
[RESULT]
$12e^{j50°}$
[GUIDED_END]

[PRACTICE_START]
TITLE:Multiplikation
[Q]
$(1+j)(1-j) = ?$
[A]
$2$ — FOIL: $1 - j + j - j^2 = 1 + 1 = 2$
[Q]
$(3+2j)(1+4j) = ?$
[A]
$-5+14j$ — $3+12j+2j+8j^2 = 3+14j-8 = -5+14j$
[Q]
$2e^{j15°} \\cdot 5e^{j45°} = ?$
[A]
$10e^{j60°}$ — Beträge: $2\\cdot5=10$, Winkel: $15°+45°=60°$
[Q]
$(1+j)^2 = ?$
[A]
$2j$ — $(1+j)(1+j) = 1+2j+j^2 = 1+2j-1 = 2j$
[Q]
$(2e^{j90°})^3 = ?$
[A]
$-8j$ — $8e^{j270°} = 8(\\cos270° + j\\sin270°) = -8j$
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 6: Konjugierte & Division
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-6",
      title: "Konjugierte & Division",
      duration: "20 min",
      type: "interactive",
      interactive: "complexOperationsCalculator",
      content: `## Das konjugierte

$$\\bar{z} = x - jy$$

Man spiegelt den Imaginärteil an der reellen Achse. In der Gaußschen Ebene: Spiegelung an der x-Achse.

### Wichtige Eigenschaften

- $z \\cdot \\bar{z} = x^2 + y^2 = |z|^2$ — immer reell und positiv!
- $\\overline{z_1 + z_2} = \\bar{z_1} + \\bar{z_2}$
- $\\overline{z_1 \\cdot z_2} = \\bar{z_1} \\cdot \\bar{z_2}$

---

## Division — das Problem

$$\\frac{3+4j}{1-2j}$$

Im Nenner steht ein $j$! Wir können nicht einfach durch eine komplexe Zahl teilen.

Lösung: Erweitere mit dem konjugierten des Nenners — der Nenner wird reell!

---

## Division — die Methode

$$\\frac{z_1}{z_2} = \\frac{z_1 \\cdot \\bar{z_2}}{z_2 \\cdot \\bar{z_2}} = \\frac{z_1 \\cdot \\bar{z_2}}{|z_2|^2}$$

Der Nenner wird zu $|z_2|^2$ — eine reelle Zahl!

---

## In Exponentialform (viel einfacher!)

$$\\frac{z_1}{z_2} = \\frac{r_1}{r_2} \\cdot e^{j(\\varphi_1 - \\varphi_2)}$$

Beträge dividieren, Winkel subtrahieren!

---

[INTERACTIVE]

---

[GUIDED_START]
TITLE:$\\frac{3+4j}{1-2j}$
[STEP]
Konjugierten bilden: $\\overline{1-2j} = 1+2j$
[STEP]
Nenner: $(1-2j)(1+2j) = 1+4 = 5$ — reell!
[STEP]
Zähler: $(3+4j)(1+2j) = 3+6j+4j+8j^2 = -5+10j$
[STEP]
Teilen: $\\frac{-5+10j}{5} = -1+2j$
[RESULT]
$\\frac{3+4j}{1-2j} = -1 + 2j$
[GUIDED_END]

[GUIDED_START]
TITLE:$\\frac{12e^{j80°}}{4e^{j30°}}$ (Exponentialform)
[STEP]
Beträge: $12/4 = 3$
[STEP]
Winkel: $80° - 30° = 50°$
[RESULT]
$3e^{j50°}$
[GUIDED_END]

[PRACTICE_START]
TITLE:Division komplexer Zahlen
[Q]
$\\frac{1+j}{1-j} = ?$
[A]
$j$ — Erweiterung mit $(1+j)$: Nenner $= 2$, Zähler $= 2j$
[Q]
$\\frac{4+2j}{2+j} = ?$
[A]
$2$ (reell!) — Erweiterung mit $(2-j)$: Nenner $= 5$, Zähler $= 10$
[Q]
$\\frac{10e^{j90°}}{2e^{j30°}} = ?$
[A]
$5e^{j60°}$ — Beträge: $10/2=5$, Winkel: $90°-30°=60°$
[Q]
$\\frac{j}{1+j} = ?$
[A]
$\\frac{1}{2} + \\frac{1}{2}j$ — Erweiterung mit $(1-j)$
[Q]
$z \\cdot \\bar{z}$ für $z = 3+4j$?
[A]
$25$ — $|z|^2 = 9 + 16 = 25$
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 7: Potenzieren
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-7",
      title: "Potenzieren — De Moivre",
      duration: "15 min",
      type: "interactive",
      interactive: "complexPowerCalculator",
      content: `## De Moivresche Formel

$$z^n = r^n \\cdot e^{jn\\varphi}$$

Betrag potenzieren, Winkel mit $n$ multiplizieren!

Die Exponentialform macht Potenzieren extrem einfach — kein Ausmultiplizieren nötig.

---

## Herleitung

$z^n = (r \\cdot e^{j\\varphi})^n = r^n \\cdot (e^{j\\varphi})^n = r^n \\cdot e^{jn\\varphi}$

---

## Potenzen von $j$ — der Zyklus

| $n$ | $j^n$ | Warum |
|-----|-------|-------|
| 1 | $j$ | |
| 2 | $-1$ | $j^2 = -1$ |
| 3 | $-j$ | $j^2 \\cdot j$ |
| 4 | $1$ | $(j^2)^2$ |
| 5 | $j$ | Zyklus! |

Formel: $j^n = j^{n \\bmod 4}$

---

[INTERACTIVE]

---

[GUIDED_START]
TITLE:$(1+j)^4$
[STEP]
Umrechnen: $r = \\sqrt{2}$, $\\varphi = 45°$
[STEP]
De Moivre: $z^4 = (\\sqrt{2})^4 \\cdot e^{j(4 \\cdot 45°)} = 4e^{j180°}$
[STEP]
Zurück: $4e^{j180°} = 4(-1) = -4$
[RESULT]
$(1+j)^4 = -4$
[GUIDED_END]

[PRACTICE_START]
TITLE:Potenzieren nach De Moivre
[Q]
$(2e^{j15°})^3 = ?$
[A]
$8e^{j45°}$ — $2^3=8$, Winkel: $3\\cdot15°=45°$
[Q]
$j^{17} = ?$
[A]
$j$ — $17 \\bmod 4 = 1$, also $j^{17} = j^1 = j$
[Q]
$(1+j)^6 = ?$
[A]
$-8j$ — $z=\\sqrt{2}e^{j45°}$, $z^6=8e^{j270°}=-8j$
[Q]
$(\\sqrt{3}+j)^3 = ?$
[A]
$8j$ — $r=2$, $\\varphi=30°$, $z^3=8e^{j90°}=8j$
[Q]
$(-1)^5 = ?$
[A]
$-1$ — $(-1)^5 = -1$ (ungerade Potenz)
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 8: Radizieren
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-8",
      title: "Radizieren — Wurzeln",
      duration: "18 min",
      type: "interactive",
      interactive: "complexRootCalculator",
      content: `## Wurzeln komplexer Zahlen

Bei reellen Zahlen: $\\sqrt{4} = 2$ (eindeutig). Bei komplexen Zahlen gibt es $n$ verschiedene $n$-te Wurzeln!

---

## Die Formel

$$w_k = r^{1/n} \\cdot e^{j \\frac{\\varphi + 2k\\pi}{n}}, \\quad k = 0, 1, \\ldots, n-1$$

---

## Warum $n$ Wurzeln?

Die $n$-ten Wurzeln von $z$ sind die Lösungen von $w^n = z$. Da $e^{j2\\pi} = 1$ kann man $2\\pi$ beliebig oft addieren — jede Variation gibt eine andere Wurzel.

Geometrisch: Die Wurzeln liegen als gleichmäßiges $n$-Eck auf einem Kreis mit Radius $r^{1/n}$.

---

## Beispiel: Kubikwurzeln von $8$

$8 = 8e^{j0°}$, Radius $= 8^{1/3} = 2$

| $k$ | Winkel | Wurzel |
|-----|--------|--------|
| 0 | $0°$ | $2$ |
| 1 | $120°$ | $-1 + 1.732j$ |
| 2 | $240°$ | $-1 - 1.732j$ |

Gleichseitiges Dreieck auf dem Kreis!

---

[INTERACTIVE]

---

[GUIDED_START]
TITLE:Alle Kubikwurzeln von $-8$
[STEP]
$-8 = 8e^{j180°}$, Radius $= 2$
[STEP]
$w_0 = 2e^{j60°} = 1 + 1.732j$
[STEP]
$w_1 = 2e^{j180°} = -2$
[STEP]
$w_2 = 2e^{j300°} = 1 - 1.732j$
[RESULT]
Drei Wurzeln: $1+1.732j$, $-2$, $1-1.732j$ — gleichseitiges Dreieck
[GUIDED_END]

[PRACTICE_START]
TITLE:Radizieren — Wurzeln berechnen
[Q]
$\\sqrt[4]{16}$ — alle 4 Wurzeln?
[A]
$2, 2j, -2, -2j$ — Radius $= 2$, Quadrat auf Kreis
[Q]
$\\sqrt{-1}$ — beide Wurzeln?
[A]
$j, -j$ — $e^{j90°}$ und $e^{j270°}$
[Q]
Warum hat $z = 0$ nur eine Wurzel?
[A]
$0^{1/n} = 0$ für alle $n$ — kein Kreis, nur Ursprung
[Q]
$n$-te Wurzeln von $z \\neq 0$?
[A]
Genau $n$ Stück — Fundamentalsatz der Algebra
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // ABSCHLUSS-TEST
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-quiz",
      title: "Abschlusstest: Komplexe Zahlen",
      duration: "15 min",
      type: "quiz",
      content: "Beantworte die 10 Fragen. Du brauchst mindestens 80% zum Bestehen.",
    },
  ],
};

export const complexQuizzes: Record<string, QuizQuestion[]> = {
  "mathe-komplexe-zahlen": [
    {
      question: "Was ist $j^2$?",
      type: "multiple",
      options: ["$1$", "$-1$", "$j$", "$-j$"],
      correct: 1,
      explanation: "$j = \\sqrt{-1}$, also $j^2 = -1$.",
    },
    {
      question: "Was ist der Betrag von $z = 3 + 4j$?",
      type: "multiple",
      options: ["$7$", "$5$", "$25$", "$\\sqrt{7}$"],
      correct: 1,
      explanation: "$|z| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$",
    },
    {
      question: "Was ist $\\bar{z}$ für $z = 2 - 5j$?",
      type: "multiple",
      options: ["$-2 + 5j$", "$2 + 5j$", "$-2 - 5j$", "$5 - 2j$"],
      correct: 1,
      explanation: "Vorzeichen des Imaginärteils umkehren: $\\bar{z} = 2 + 5j$",
    },
    {
      question: "In welchem Quadrant liegt $z = -3 + 2j$?",
      type: "multiple",
      options: ["I", "II", "III", "IV"],
      correct: 1,
      explanation: "$x < 0, y > 0$ — Quadrant II",
    },
    {
      question: "$(1+j) + (2-3j) = ?$",
      type: "multiple",
      options: ["$3-2j$", "$3+2j$", "$-1-2j$", "$3-4j$"],
      correct: 0,
      explanation: "Real: $1+2=3$, Imag: $1-3=-2$",
    },
    {
      question: "$(2e^{j30°}) \\cdot (3e^{j60°}) = ?$",
      type: "multiple",
      options: ["$6e^{j90°}$", "$5e^{j90°}$", "$6e^{j180°}$", "$e^{j90°}$"],
      correct: 0,
      explanation: "Beträge: $2 \\cdot 3 = 6$, Winkel: $30°+60°=90°$",
    },
    {
      question: "Wie viele $n$-te Wurzeln hat $z \\neq 0$?",
      type: "multiple",
      options: ["$1$", "$2$", "$n$", "$n-1$"],
      correct: 2,
      explanation: "Genau $n$ verschiedene Wurzeln.",
    },
    {
      question: "Was ist $j^4$?",
      type: "multiple",
      options: ["$j$", "$-1$", "$-j$", "$1$"],
      correct: 3,
      explanation: "$j^4 = (j^2)^2 = (-1)^2 = 1$",
    },
    {
      question: "$z \\cdot \\bar{z}$ für $z = 3+4j$?",
      type: "multiple",
      options: ["$25$", "$7$", "$0$", "$5$"],
      correct: 0,
      explanation: "$z\\bar{z} = |z|^2 = 9+16 = 25$",
    },
    {
      question: "$\\frac{6e^{j90°}}{2e^{j30°}} = ?$",
      type: "multiple",
      options: ["$3e^{j60°}$", "$3e^{j120°}$", "$12e^{j60°}$", "$3e^{j30°}$"],
      correct: 0,
      explanation: "Beträge: $6/2=3$, Winkel: $90°-30°=60°$",
    },
  ],
};
