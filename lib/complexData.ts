import { Module, QuizQuestion } from "./types";

export const complexModule: Module = {
  id: "m-komplexe-zahlen",
  slug: "mathe-komplexe-zahlen",
  title: "Komplexe Zahlen",
  description: "Von der imaginären Einheit bis zu Wurzeln in der Gaußschen Ebene — interaktiv und verständlich",
  icon: "🌀",
  color: "#8b5cf6",
  category: "analysis",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Komplexe Zahlen

### Grundlagen
- **Imaginäre Einheit:** $j = \\sqrt{-1}$, also $j^2 = -1$
- **Komplexe Zahl:** $z = x + jy$ mit $x, y \\in \\mathbb{R}$
- **Realteil:** $\\text{Re}(z) = x$ · **Imaginärteil:** $\\text{Im}(z) = y$

### Darstellungsformen
| Form | Schreibweise |
|------|-------------|
| **Normalform** | $z = x + jy$ |
| **Trigonometrisch** | $z = r(\\cos\\varphi + j\\sin\\varphi)$ |
| **Exponentialform** | $z = r \\cdot e^{j\\varphi}$ |

### Umrechnung
- **Betrag:** $r = |z| = \\sqrt{x^2 + y^2}$
- **Winkel:** $\\varphi = \\arctan\\frac{y}{x}$ (+ Quadrantenkorrektur!)

### Quadranten-Regeln
| Q | x | y | $\\varphi$ |
|---|---|---|-----------|
| I | + | + | $\\arctan(y/x)$ |
| II | − | + | $\\arctan(y/x) + 180°$ |
| III | − | − | $\\arctan(y/x) + 180°$ |
| IV | + | − | $\\arctan(y/x) + 360°$ |

### Rechenregeln
- **Addition:** $(x_1+x_2) + j(y_1+y_2)$
- **Multiplikation:** $r_1 r_2 \\cdot e^{j(\\varphi_1+\\varphi_2)}$
- **Division:** $\\frac{r_1}{r_2} \\cdot e^{j(\\varphi_1-\\varphi_2)}$
- **Konjugiertes:** $\\bar{z} = x - jy$
- **De Moivre:** $z^n = r^n e^{jn\\varphi}$
- **Wurzeln:** $w_k = r^{1/n} e^{j(\\varphi+2k\\pi)/n}$, $k = 0, \\ldots, n{-}1$

### Potenzen von j
$j^1 = j$ → $j^2 = -1$ → $j^3 = -j$ → $j^4 = 1$ (zyklisch!)`,

  lessons: [
    // ══════════════════════════════════════════════════════════════
    // LEKTION 1: Grundlagen
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-1",
      title: "Warum komplexe Zahlen?",
      duration: "12 min",
      type: "text",
      content: `# Warum brauchen wir komplexe Zahlen?

Stell dir vor, du sollst $x^2 + 1 = 0$ lösen.

Umformen: $x^2 = -1$

**Keine reelle Zahl quadriert zu $-1$!** Denn $x^2 \\geq 0$ für alle $x \\in \\mathbb{R}$.

Also erfinden wir eine neue Zahl.

---

## Die imaginäre Einheit $j$

$$j = \\sqrt{-1} \\quad \\Rightarrow \\quad j^2 = -1$$

Das ist keine "normale" Zahl — aber mit ihr können wir rechnen!

---

## Komplexe Zahlen

$$z = x + j \\cdot y$$

- $x = \\text{Re}(z)$ — der Realteil
- $y = \\text{Im}(z)$ — der Imaginärteil
- Wenn $y = 0$: $z = x$ — reelle Zahl (Spezialfall!)

---

## Beispiele

| Zahl | Re | Im | Bemerkung |
|------|---:|---:|-----------|
| $3 + 4j$ | 3 | 4 | komplexe Zahl |
| $-2 + 5j$ | -2 | 5 | negativer Realteil |
| $7$ | 7 | 0 | reell! |
| $-3j$ | 0 | -3 | rein imaginär |

---

## Potenzen von $j$ — der Zyklus

$j^1 = j$ → $j^2 = -1$ → $j^3 = -j$ → $j^4 = 1$ → $j^5 = j$ → ...

**Alle 4 Schritte wiederholt sich alles!**

[GUIDED_START]
TITLE:Berechne $j^6$
[STEP]
$j^6 = j^4 \\cdot j^2$
[STEP]
$j^4 = (j^2)^2 = (-1)^2 = 1$
[STEP]
$j^6 = 1 \\cdot (-1) = -1$
[RESULT]
$j^6 = -1$ ✓
[GUIDED_END]

[GUIDED_START]
TITLE:Berechne $2j \\cdot 3j$
[STEP]
$2j \\cdot 3j = 6j^2$
[STEP]
$j^2 = -1$
[STEP]
$6 \\cdot (-1) = -6$
[RESULT]
$2j \\cdot 3j = -6$ ✓
[GUIDED_END]

[PRACTICE_START]
TITLE:Potenzen von j & Grundlagen
[Q:$j^8 = ?$||$1$ — denn $8 \bmod 4 = 0$, also $j^8 = (j^4)^2 = 1^2 = 1$]
[Q:$j^{15} = ?$||$-j$ — denn $15 \bmod 4 = 3$, also $j^{15} = j^3 = -j$]
[Q:$(1+j) + (3-2j) = ? || $4 - j$ — Real: $1+3=4$, Imag: $1-2=-1$]
[Q:$(2j)^2 = ? || $-4$ — $(2j)^2 = 4j^2 = 4(-1) = -4$]
[Q:$j^3 + j^4 + j^5 = ? || $1$ — $-j + 1 + j = 1$]
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
      content: `# Die Gaußsche Zahlenebene

Reelle Zahlen leben auf einer Zahlengerade (1D). Komplexe Zahlen brauchen eine **Ebene** (2D).

---

## So funktioniert's

- **Horizontal:** Realteil $\\text{Re}(z)$
- **Vertikal:** Imaginärteil $\\text{Im}(z)$

$z = x + jy$ → Punkt bei $(x | y)$

---

[INTERACTIVE]

---

[GUIDED_START]
TITLE:Zeichne $z = -3 + 2j$ ein
[STEP]
Realteil ablesen: $x = -3$ → gehe 3 nach **links**
[STEP]
Imaginärteil ablesen: $y = 2$ → gehe 2 nach **oben**
[STEP]
Punkt markieren bei $(-3 | 2)$
[STEP]
Abstand: $r = \\sqrt{(-3)^2 + 2^2} = \\sqrt{13} \\approx 3.6$
[RESULT]
$z = -3 + 2j$ liegt bei $(-3 | 2)$ mit Betrag $r = \\sqrt{13}$ ✓
[GUIDED_END]

---

[PRACTICE_START]
TITLE:Gaußsche Ebene — Zahlen einzeichnen
[Q:$z_1 = 2 + 3j$ — wo liegt der Punkt?$(2 || 3)$ — Re=2, Im=3, also 2 rechts, 3 oben]
[Q:$z_2 = -4 + j$ — wo liegt der Punkt?$(-4 || 1)$ — Re=-4, Im=1, also 4 links, 1 oben]
[Q:$z_3 = -3 - 2j$ — wo liegt der Punkt?$(-3 || -2)$ — Re=-3, Im=-2, also 3 links, 2 unten]
[Q:$z_4 = 5j$ — wo liegt der Punkt?$(0 || 5)$ — rein imaginär, auf der Im-Achse]
[Q:$z_5 = -4$ — wo liegt der Punkt?$(-4 || 0)$ — reell, auf der Re-Achse]
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
      content: `# Darstellungsformen komplexer Zahlen

Eine komplexe Zahl kann man auf **drei Arten** schreiben.

---

## 1. Normalform

$$z = x + jy$$

Gut zum **Addieren** und **Subtrahieren**.

---

## 2. Trigonometrische Form

$$z = r \\cdot (\\cos\\varphi + j\\sin\\varphi)$$

- $r = |z| = \\sqrt{x^2 + y^2}$ — **Betrag** (Pythagoras!)
- $\\varphi$ — **Winkel** gegen die positive Re-Achse

---

## 3. Exponentialform (Euler)

$$z = r \\cdot e^{j\\varphi}$$

Euler-Formel: $e^{j\\varphi} = \\cos\\varphi + j\\sin\\varphi$

Super zum **Multiplizieren** und **Dividieren**.

---

[INTERACTIVE]

---

[GUIDED_START]
TITLE:Wandle $z = 3 + 4j$ in Exponentialform um
[STEP]
Betrag berechnen (Pythagoras): $r = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$
[STEP]
Winkel berechnen: $\\tan\\varphi = \\frac{4}{3} = 1.333$ → $\\varphi = 53.13°$
[STEP]
Quadrant prüfen: $x > 0, y > 0$ → Quadrant I → keine Korrektur!
[RESULT]
$z = 5 e^{j53.13°}$ ✓
[GUIDED_END]

---

## ⚡ Quadranten-Regeln

| Quadrant | x | y | Korrektur |
|----------|---|---|-----------|
| I (rechts oben) | + | + | keine |
| II (links oben) | − | + | $+180°$ |
| III (links unten) | − | − | $+180°$ |
| IV (rechts unten) | + | − | $+360°$ |

[GUIDED_START]
TITLE:Wandle $z = -3 - 3j$ um (Quadrant III!)
[STEP]
$r = \\sqrt{(-3)^2 + (-3)^2} = \\sqrt{18} = 3\\sqrt{2} \\approx 4.24$
[STEP]
$\\arctan((-3)/(-3)) = \\arctan(1) = 45°$
[STEP]
$x < 0, y < 0$ → Quadrant III → Korrektur: $+180°$
[STEP]
$\\varphi = 45° + 180° = 225°$
[RESULT]
$z = 3\\sqrt{2} \\cdot e^{j225°}$ ✓ (Probe: $x = 4.24 \\cdot \\cos(225°) = -3$ ✓)
[GUIDED_END]

---

[PRACTICE_START]
TITLE:Darstellungsformen umrechnen
[Q:$1 + j$ in Exponentialform?$\sqrt{2} e^{j45°}$ — $r=\sqrt{2}$, $\varphi=45°$ (Q I)]
[Q:$2e^{j60°}$ in Normalform?$1 + 1.732j$ — $x=2\cos60°=1$, $y=2\sin60°=1.732$]
[Q:$-4 + 4j$ in Exponentialform?$4\sqrt{2} e^{j135°}$ — $r=4\sqrt{2}$, Q II: $\varphi=135°$]
[Q:$3e^{j270°}$ in Normalform?$-3j$ — $x=3\cos270°=0$, $y=3\sin270°=-3$]
[Q:$-5$ in Exponentialform?$5e^{j180°}$ — $r=5$, $\varphi=180°$ (reell, negativ)]
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 4: Addition & Subtraktion
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-4",
      title: "Addition & Subtraktion",
      duration: "12 min",
      type: "exercises",
      content: `# Addition & Subtraktion

Die einfachste Rechenart — und die Einzige die direkt in Normalform funktioniert!

---

## Die Regel

$$z_1 + z_2 = (x_1 + x_2) + j(y_1 + y_2)$$

$$z_1 - z_2 = (x_1 - x_2) + j(y_1 - y_2)$$

**Realteile zusammen, Imaginärteile zusammen!**

---

[GUIDED_START]
TITLE:$(3 + 2j) + (1 - 4j)$
[STEP]
Realteile addieren: $3 + 1 = 4$
[STEP]
Imaginärteile addieren: $2 + (-4) = -2$
[RESULT]
$4 - 2j$ ✓
[GUIDED_END]

[GUIDED_START]
TITLE:$(-1 + 4j) - (3 + 2j)$
[STEP]
Realteile: $-1 - 3 = -4$
[STEP]
Imaginärteile: $4 - 2 = 2$
[RESULT]
$-4 + 2j$ ✓
[GUIDED_END]

[GUIDED_START]
TITLE:$(6 + j) - (-2 + 3j)$
[STEP]
Realteile: $6 - (-2) = 8$
[STEP]
Imaginärteile: $1 - 3 = -2$
[RESULT]
$8 - 2j$ ✓
[GUIDED_END]

---

[PRACTICE_START]
TITLE:Addition & Subtraktion
[Q:$(5 + 3j) + (2 - 7j) = ? || $7 - 4j$ — Real: $5+2=7$, Imag: $3-7=-4$]
[Q:$(2j) + (3 - 5j) = ? || $3 - 3j$ — Real: $0+3=3$, Imag: $2-5=-3$]
[Q:$(1 + 2j) + (3 + 4j) + (-5 - j) = ? || $-1 + 5j$ — Real: $1+3-5=-1$, Imag: $2+4-1=5$]
[Q:$(4 - 2j) - (4 - 2j) = ? || $0$ — gleiche Zahlen, Differenz ist 0]
[Q:$(10) - (3 + 7j) = ? || $7 - 7j$ — Real: $10-3=7$, Imag: $0-7=-7$]
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
      content: `# Multiplikation

---

## In Normalform (FOIL)

$$z_1 \\cdot z_2 = (x_1 x_2 - y_1 y_2) + j(x_1 y_2 + x_2 y_1)$$

Ausmultiplizieren + $j^2 = -1$ einsetzen.

---

## In Exponentialform

$$z_1 \\cdot z_2 = r_1 r_2 \\cdot e^{j(\\varphi_1 + \\varphi_2)}$$

**Beträge multiplizieren, Winkel addieren!**

---

[INTERACTIVE]

---

[GUIDED_START]
TITLE:$(2 + 3j) \\cdot (1 - 2j)$
[STEP]
Erste Terme: $2 \\cdot 1 = 2$
[STEP]
$j^2$-Term: $3j \\cdot (-2j) = -6j^2 = +6$
[STEP]
Kreuzterme: $2 \\cdot (-2j) + 3j \\cdot 1 = -4j + 3j = -j$
[STEP]
Zusammen: $(2+6) + j(-1) = 8 - j$
[RESULT]
$(2+3j)(1-2j) = 8 - j$ ✓
[GUIDED_END]

[GUIDED_START]
TITLE:$4e^{j20°} \\cdot 3e^{j30°}$ (Exponentialform)
[STEP]
Beträge: $4 \\cdot 3 = 12$
[STEP]
Winkel: $20° + 30° = 50°$
[RESULT]
$12e^{j50°}$ ✓
[GUIDED_END]

---

[PRACTICE_START]
TITLE:Multiplikation
[Q:$(1+j)(1-j) = ? || $2$ — FOIL: $1 - j + j - j^2 = 1 + 1 = 2$]
[Q:$(3+2j)(1+4j) = ? || $-5+14j$ — $3+12j+2j+8j^2 = 3+14j-8 = -5+14j$]
[Q:$2e^{j15°} \cdot 5e^{j45°} = ? || $10e^{j60°}$ — Beträge: $2\cdot5=10$, Winkel: $15°+45°=60°$]
[Q:$(1+j)^2 = ? || $2j$ — $(1+j)(1+j) = 1+2j+j^2 = 1+2j-1 = 2j$]
[Q:$(2e^{j90°})^3 = ? || $-8j$ — $8e^{j270°} = 8(\cos270° + j\sin270°) = -8j$]
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
      content: `# Konjugierte & Division

---

## Konjugiertes

$$\\bar{z} = x - jy$$

**Spiegelung an der Re-Achse!** $z \\cdot \\bar{z} = x^2 + y^2 = |z|^2$ (immer reell!)

---

## Division

**Problem:** Im Nenner steht ein $j$!

**Lösung:** Erweitere mit dem **konjugierten des Nenners** — Nenner wird reell!

---

[INTERACTIVE]

---

[GUIDED_START]
TITLE:$\\frac{3+4j}{1-2j}$
[STEP]
Konjugierten bilden: $\\overline{1-2j} = 1+2j$
[STEP]
Erweitern: $\\frac{3+4j}{1-2j} \\cdot \\frac{1+2j}{1+2j}$
[STEP]
Nenner: $(1-2j)(1+2j) = 1+4 = 5$ ← reell! ✓
[STEP]
Zähler: $(3+4j)(1+2j) = 3+6j+4j+8j^2 = -5+10j$
[STEP]
Teilen: $\\frac{-5+10j}{5} = -1+2j$
[RESULT]
$\\frac{3+4j}{1-2j} = -1 + 2j$ ✓
[GUIDED_END]

[GUIDED_START]
TITLE:$\\frac{12e^{j80°}}{4e^{j30°}}$ (Exponentialform)
[STEP]
Beträge: $12/4 = 3$
[STEP]
Winkel: $80° - 30° = 50°$
[RESULT]
$3e^{j50°}$ ✓
[GUIDED_END]

---

[PRACTICE_START]
TITLE:Division komplexer Zahlen
[Q:$\frac{1+j}{1-j} = ? || $j$ — Erweiterung mit $(1+j)$: Nenner $= 2$, Zähler $= 2j$, Ergebnis $= j$]
[Q:$\frac{4+2j}{2+j} = ? || $2$ (reell!) — Erweiterung mit $(2-j)$: Nenner $= 5$, Zähler $= 10$]
[Q:$\frac{10e^{j90°}}{2e^{j30°}} = ? || $5e^{j60°}$ — Beträge: $10/2=5$, Winkel: $90°-30°=60°$]
[Q:$\frac{2-3j}{4+j} = ? || $\frac{5}{17} - \frac{14}{17}j$ — Erweiterung mit $(4-j)$]
[Q:$\frac{j}{1+j} = ? || $\frac{1}{2} + \frac{1}{2}j$ — Erweiterung mit $(1-j)$]
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
      content: `# Potenzieren nach De Moivre

---

## Die Formel

$$z^n = r^n \\cdot e^{jn\\varphi}$$

**Betrag potenzieren, Winkel verviefachen!**

---

[INTERACTIVE]

---

## Potenzen von $j$

| $n$ | $j^n$ | Warum |
|-----|-------|-------|
| 1 | $j$ | |
| 2 | $-1$ | $j^2 = -1$ |
| 3 | $-j$ | $j^2 \\cdot j$ |
| 4 | $1$ | $(j^2)^2$ |
| 5 | $j$ | Zyklus! |

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
$(1+j)^4 = -4$ ✓
[GUIDED_END]

---

[PRACTICE_START]
TITLE:Potenzieren nach De Moivre
[Q:$(2e^{j15°})^3 = ? || $8e^{j45°}$ — $2^3=8$, Winkel: $3\cdot15°=45°$]
[Q:$j^{17} = ? || $j$ — $17 \bmod 4 = 1$, also $j^{17} = j^1 = j$]
[Q:$(1+j)^6 = ? || $-8j$ — $z=\sqrt{2}e^{j45°}$, $z^6=8e^{j270°}=-8j$]
[Q:$(\sqrt{3}+j)^3 = ? || $8j$ — $r=2$, $\varphi=30°$, $z^3=8e^{j90°}=8j$]
[Q:$(-1)^5 = ? || $-1$ — $(-1)^5 = -1$ (ungerade Potenz)]
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
      content: `# Wurzeln komplexer Zahlen

Bei reellen Zahlen: $\\sqrt{4} = 2$ (eindeutig). Bei komplexen: **$n$ verschiedene Wurzeln!**

---

## Die Formel

$$w_k = r^{1/n} \\cdot e^{j \\frac{\\varphi + 2k\\pi}{n}}, \\quad k = 0, 1, \\ldots, n-1$$

Die Wurzeln liegen als **gleichmäßiges $n$-Eck** auf einem Kreis mit Radius $r^{1/n}$!

---

[INTERACTIVE]

---

[GUIDED_START]
TITLE:Alle Kubikwurzeln von $8$
[STEP]
$8 = 8e^{j0°}$ (reelle Zahl, $\\varphi = 0°$)
[STEP]
Radius: $8^{1/3} = 2$
[STEP]
$w_0 = 2e^{j0°} = 2$
[STEP]
$w_1 = 2e^{j120°} = -1 + 1.732j$
[STEP]
$w_2 = 2e^{j240°} = -1 - 1.732j$
[RESULT]
Drei Wurzeln: $2$, $-1+1.732j$, $-1-1.732j$ → gleichseitiges Dreieck auf Kreis mit Radius 2 ✓
[GUIDED_END]

---

[PRACTICE_START]
TITLE:Radizieren — Wurzeln berechnen
[Q:$\sqrt[3]{-8}$ — alle 3 Wurzeln?$1+1.732j$, $-2$, $1-1.732j$ — Radius $= 2$, gleichseitiges Dreieck]
[Q:$\sqrt[4]{16}$ — alle 4 Wurzeln?$2, 2j, -2, -2j$ — Radius $= 2$, Quadrat auf Kreis]
[Q:$\sqrt{-1}$ — beide Wurzeln?$j, -j$ — $e^{j90°}$ und $e^{j270°}$]
[Q:Warum hat $z = 0$ nur eine Wurzel?$0^{1/n} = 0$ für alle $n$ — kein Kreis, nur Ursprung]
[Q:Wie viele $n$-te Wurzeln hat $z \neq 0$?Genau $n$ — Fundamentalsatz der Algebra]
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
      content: "# Abschlusstest\n\nBeantworte die 10 Fragen. Du brauchst mindestens 80% zum Bestehen.",
    },
  ],
};

// Quiz questions (exported for Quiz.tsx)
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
      explanation: "$x < 0, y > 0$ → Quadrant II",
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
