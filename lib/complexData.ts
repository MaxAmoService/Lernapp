import { Module, QuizQuestion } from "./types";

export const complexModule: Module = {
  id: "m-komplexe-zahlen",
  slug: "mathe-komplexe-zahlen",
  title: "Komplexe Zahlen",
  description: "Imaginäre Zahlen, Gaußsche Ebene, Darstellungsformen, Rechenregeln und Anwendungen",
  icon: "🌀",
  color: "#8b5cf6",
  category: "komplexe-numerik",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Komplexe Zahlen

### 🎯 Definition
$$z = x + jy$$
- $x = \\text{Re}(z)$: Realteil
- $y = \\text{Im}(z)$: Imaginärteil
- $j^2 = -1$ (imaginäre Einheit)

### 📐 Darstellungsformen

| Form | Schreibweise |
|------|-------------|
| **Normalform** | $z = x + jy$ |
| **Trigonometrisch** | $z = r(\\cos\\varphi + j\\sin\\varphi)$ |
| **Exponentialform** | $z = r \\cdot e^{j\\varphi}$ |

**Umrechnung:** $r = \\sqrt{x^2 + y^2}$, $\\varphi = \\arctan\\frac{y}{x}$ (+ Quadrantenkorrektur)

### 📐 Rechenregeln

| Operation | Formel |
|-----------|--------|
| Addition | $(x_1+jy_1) + (x_2+jy_2) = (x_1+x_2) + j(y_1+y_2)$ |
| Multiplikation | $z_1 z_2 = r_1 r_2 e^{j(\\varphi_1+\\varphi_2)}$ |
| Konjugiertes | $\\bar{z} = x - jy$ |
| Betrag | $|z| = \\sqrt{x^2 + y^2}$ |
| Division | $\\frac{z_1}{z_2} = \\frac{r_1}{r_2} e^{j(\\varphi_1-\\varphi_2)}$ |

### 💡 Wichtige Formeln
- $z \\cdot \\bar{z} = |z|^2 = x^2 + y^2$
- **De Moivre:** $z^n = r^n e^{jn\\varphi}$
- **Wurzeln:** $w_k = r^{1/n} e^{j(\\varphi+2k\\pi)/n}$, $k = 0, 1, \\ldots, n-1$

### 💡 Potenzen von j
$j^1 = j$, $j^2 = -1$, $j^3 = -j$, $j^4 = 1$ (zyklisch mit Periode 4)

### 💡 Quadranten-Regeln für φ
| Quadrant | Bedingung | φ |
|----------|-----------|---|
| I | $x > 0, y > 0$ | $\\arctan(y/x)$ |
| II | $x < 0, y > 0$ | $\\arctan(y/x) + 180°$ |
| III | $x < 0, y < 0$ | $\\arctan(y/x) + 180°$ |
| IV | $x > 0, y < 0$ | $\\arctan(y/x) + 360°$ |`,

  lessons: [
    // ====== LEKTION 1: Grundlagen ======
    {
      id: "kz-1",
      title: "Komplexe Zahlen — Grundlagen",
      duration: "15 min",
      type: "text",
      content: `# Komplexe Zahlen — Grundlagen

## Warum komplexe Zahlen?

In der reellen Zahlenmenge $\\mathbb{R}$ hat die Gleichung

$$x^2 + 1 = 0$$

**keine Lösung**, denn $x^2 \\geq 0$ für alle $x \\in \\mathbb{R}$, also ist $x^2 + 1 \\geq 1 > 0$.

Um solche Gleichungen lösen zu können, erweitern wir die Zahlenmenge um die **imaginäre Einheit**:

## Die imaginäre Einheit

$$j = \\sqrt{-1}$$

Damit gilt:

$$j^2 = -1$$

> **Hinweis:** In der Mathematik wird oft $i$ verwendet, in der Elektrotechnik und bei technischen Studiengängen ist $j$ üblich, da $i$ bereits für den elektrischen Strom steht.

## Definition einer komplexen Zahl

Eine komplexe Zahl $z$ hat die Form:

$$z = x + j \\cdot y$$

wobei:
- $x = \\text{Re}(z)$ der **Realteil** ist
- $y = \\text{Im}(z)$ der **Imaginärteil** ist
- $j^2 = -1$

## Beispiele

| Zahl | $\\text{Re}(z)$ | $\\text{Im}(z)$ |
|------|-----------------|-----------------|
| $z = 3 + 2j$ | $3$ | $2$ |
| $z = -1 + 4j$ | $-1$ | $4$ |
| $z = 5$ | $5$ | $0$ (reell) |
| $z = -3j$ | $0$ | $-3$ (rein imaginär) |
| $z = 0$ | $0$ | $0$ |

## Reelle Zahlen als Spezialfall

Jede reelle Zahl ist auch eine komplexe Zahl mit $\\text{Im}(z) = 0$:

$$\\mathbb{R} \\subset \\mathbb{C}$$

## Gleichheit zweier komplexer Zahlen

$z_1 = x_1 + jy_1$ und $z_2 = x_2 + jy_2$ sind genau dann gleich, wenn:

$$x_1 = x_2 \\quad \\text{und} \\quad y_1 = y_2$$

Realteile und Imaginärteile müssen einzeln übereinstimmen.`,
    },

    // ====== LEKTION 2: Gaußsche Zahlenebene ======
    {
      id: "kz-2",
      title: "Gaußsche Zahlenebene",
      duration: "18 min",
      type: "interactive",
      interactive: "complexPlaneViewer" as const,
      content: `# Gaußsche Zahlenebene

## Komplexe Zahlen als Punkte

Jede komplexe Zahl $z = x + jy$ lässt sich als **Punkt** $(x, y)$ in einer Ebene darstellen:

- **Horizontale Achse** (x-Achse): Realteil $\\text{Re}(z)$
- **Vertikale Achse** (y-Achse): Imaginärteil $\\text{Im}(z)$

Diese Darstellung heißt **Gaußsche Zahlenebene** (auch: komplexer Zahlenstrahl, Argand-Diagramm).

## Beispiele zum Einzeichnen

| Komplexe Zahl | Punkt in der Ebene |
|---------------|-------------------|
| $z_1 = 3 + 2j$ | $(3, 2)$ |
| $z_2 = -2 + 4j$ | $(-2, 4)$ |
| $z_3 = -3 - j$ | $(-3, -1)$ |
| $z_4 = 4 - 3j$ | $(4, -3)$ |
| $z_5 = 5$ | $(5, 0)$ auf der Re-Achse |
| $z_6 = -4j$ | $(0, -4)$ auf der Im-Achse |
| $z_7 = 1 + j$ | $(1, 1)$ |
| $z_8 = -2 + 2j$ | $(-2, 2)$ |

## Geometrische Interpretation

- **Reelle Zahlen** liegen auf der x-Achse
- **Rein imaginäre Zahlen** liegen auf der y-Achse
- Die Ebene wird durch die beiden Achsen in **4 Quadranten** geteilt

## Konjugierte

Die **konjugierte** Zahl $\\bar{z} = x - jy$ ist die Spiegelung von $z$ an der reellen Achse (x-Achse).

## Betrag (Abstand zum Ursprung)

Der Betrag $|z|$ ist der Abstand des Punktes $(x, y)$ zum Ursprung:

$$|z| = \\sqrt{x^2 + y^2}$$

Dies entspricht dem Satz des Pythagoras!

## Übung

Klicke auf die Gaußsche Ebene, um die zugehörige komplexe Zahl abzulesen. Zeichne die folgenden Zahlen ein und bestimme ihren Betrag.`,
    },

    // ====== LEKTION 3: Darstellungsformen ======
    {
      id: "kz-3",
      title: "Darstellungsformen",
      duration: "22 min",
      type: "interactive",
      interactive: "complexFormConverter" as const,
      content: `# Darstellungsformen komplexer Zahlen

Komplexe Zahlen können auf drei verschiedene Arten dargestellt werden.

## 1. Normalform (algebraische Form)

$$z = x + jy$$

Die einfachste und gebräuchlichste Form.

**Beispiel:** $z = 3 + 4j$

---

## 2. Trigonometrische Form

$$z = r \\cdot (\\cos\\varphi + j \\cdot \\sin\\varphi)$$

wobei:
- $r = |z| = \\sqrt{x^2 + y^2}$ der **Betrag** ist
- $\\varphi = \\arg(z)$ das **Argument** (Winkel) ist

**Beispiel:** $z = 2(\\cos 60° + j \\sin 60°) = 2 \\cdot \\left(\\frac{1}{2} + j\\frac{\\sqrt{3}}{2}\\right) = 1 + j\\sqrt{3}$

---

## 3. Exponentialform (Euler-Formel)

$$z = r \\cdot e^{j\\varphi}$$

Basierend auf der **Euler-Formel**:

$$e^{j\\varphi} = \\cos\\varphi + j\\sin\\varphi$$

**Beispiel:** $z = 5e^{j\\cdot 90°} = 5j$

---

## Umrechnung: Normalform → Polarform

### Schritt 1: Betrag r

$$r = \\sqrt{x^2 + y^2}$$

### Schritt 2: Winkel φ

$$\\varphi = \\arctan\\left(\\frac{y}{x}\\right)$$

**Achtung:** Der einfache $\\arctan$ liefert nur Werte zwischen $-90°$ und $+90°$. Man muss den **Quadranten** beachten!

### Quadranten-Regeln

| Quadrant | Bedingung | Korrektur |
|----------|-----------|-----------|
| I | $x > 0, y > 0$ | $\\varphi = \\arctan(y/x)$ |
| II | $x < 0, y > 0$ | $\\varphi = \\arctan(y/x) + 180°$ |
| III | $x < 0, y < 0$ | $\\varphi = \\arctan(y/x) + 180°$ |
| IV | $x > 0, y < 0$ | $\\varphi = \\arctan(y/x) + 360°$ |

---

## Beispiel: Umrechnung

$z = -1 + j\\sqrt{3}$

**Schritt 1:** $r = \\sqrt{(-1)^2 + (\\sqrt{3})^2} = \\sqrt{1 + 3} = 2$

**Schritt 2:** $\\arctan\\left(\\frac{\\sqrt{3}}{-1}\\right) = \\arctan(-\\sqrt{3}) = -60°$

**Quadrant:** $x = -1 < 0$, $y = \\sqrt{3} > 0$ → **Quadrant II**

$\\varphi = -60° + 180° = 120°$

**Ergebnis:** $z = 2e^{j \\cdot 120°}$

---

## Umrechnung: Polarform → Normalform

$$x = r \\cos\\varphi, \\quad y = r \\sin\\varphi$$

**Beispiel:** $z = 3e^{j \\cdot 45°}$

$x = 3\\cos 45° = 3 \\cdot \\frac{\\sqrt{2}}{2} = \\frac{3\\sqrt{2}}{2}$

$y = 3\\sin 45° = 3 \\cdot \\frac{\\sqrt{2}}{2} = \\frac{3\\sqrt{2}}{2}$

$z = \\frac{3\\sqrt{2}}{2} + j\\frac{3\\sqrt{2}}{2}$`,
    },

    // ====== LEKTION 4: Addition & Subtraktion ======
    {
      id: "kz-4",
      title: "Addition & Subtraktion",
      duration: "15 min",
      type: "exercises",
      content: `# Addition & Subtraktion komplexer Zahlen

## Rechenregel

Für $z_1 = x_1 + jy_1$ und $z_2 = x_2 + jy_2$ gilt:

### Addition

$$z_1 + z_2 = (x_1 + x_2) + j(y_1 + y_2)$$

Realteile und Imaginärteile werden **getrennt** addiert.

### Subtraktion

$$z_1 - z_2 = (x_1 - x_2) + j(y_1 - y_2)$$

Analog werden Realteile und Imaginärteile getrennt subtrahiert.

---

## Beispiele

### Beispiel 1: Addition

$z_1 = 3 + 2j$, $z_2 = 1 + 4j$

$z_1 + z_2 = (3 + 1) + j(2 + 4) = 4 + 6j$

### Beispiel 2: Subtraktion

$z_1 = 5 + 3j$, $z_2 = 2 + 7j$

$z_1 - z_2 = (5 - 2) + j(3 - 7) = 3 - 4j$

### Beispiel 3: Gemischt

$(2 + 3j) + (4 - 5j) - (1 + 2j)$

$= (2 + 4 - 1) + j(3 - 5 - 2) = 5 - 4j$

---

## Geometrische Interpretation

Addition und Subtraktion komplexer Zahlen entsprechen der **Vektoraddition** in der Gaußschen Ebene:

- $z_1$ und $z_2$ werden als Vektoren vom Ursprung aus gezeichnet
- $z_1 + z_2$: **Parallelogrammregel** (Vektorspitze von $z_1$ zum Anfang von $z_2$)
- $z_1 - z_2$: Verbindungsvektor von $z_2$ nach $z_1$

---

## Übungsaufgaben

Berechne die folgenden Ausdrücke und kontrolliere die Lösungen:

**Aufgabe 1:** $(3 + 2j) + (4 - 3j) = ?$

*Lösung:* $7 - j$

**Aufgabe 2:** $(1 + 5j) - (3 + 2j) = ?$

*Lösung:* $-2 + 3j$

**Aufgabe 3:** $(2 - j) + (-3 + 4j) + (1 - 2j) = ?$

*Lösung:* $0 + j = j$

**Aufgabe 4:** $(6 + 2j) - (6 + 2j) = ?$

*Lösung:* $0$

**Aufgabe 5:** $|z_1 + z_2|$ mit $z_1 = 3 + 4j$, $z_2 = 1 - 4j$

*Lösung:* $z_1 + z_2 = 4$, also $|z_1 + z_2| = 4$`,
    },

    // ====== LEKTION 5: Multiplikation ======
    {
      id: "kz-5",
      title: "Multiplikation",
      duration: "20 min",
      type: "interactive",
      interactive: "complexOperationsCalculator" as const,
      content: `# Multiplikation komplexer Zahlen

## Multiplikation in Normalform

Für $z_1 = x_1 + jy_1$ und $z_2 = x_2 + jy_2$:

$$z_1 \\cdot z_2 = (x_1 x_2 - y_1 y_2) + j(x_1 y_2 + x_2 y_1)$$

### Herleitung

$(x_1 + jy_1)(x_2 + jy_2) = x_1 x_2 + jx_1 y_2 + jx_2 y_1 + j^2 y_1 y_2$

Da $j^2 = -1$:

$= x_1 x_2 + jx_1 y_2 + jx_2 y_1 - y_1 y_2$

$= (x_1 x_2 - y_1 y_2) + j(x_1 y_2 + x_2 y_1)$

### Beispiel 1

$z_1 = 2 + 3j$, $z_2 = 1 + 4j$

Realteil: $2 \\cdot 1 - 3 \\cdot 4 = 2 - 12 = -10$

Imaginärteil: $2 \\cdot 4 + 1 \\cdot 3 = 8 + 3 = 11$

$z_1 \\cdot z_2 = -10 + 11j$

---

## Multiplikation in Exponentialform

$$z_1 \\cdot z_2 = r_1 r_2 \\cdot e^{j(\\varphi_1 + \\varphi_2)}$$

**Regel:** Beträge **multiplizieren**, Winkel **addieren**!

### Beispiel 2

$z_1 = 2e^{j \\cdot 30°}$, $z_2 = 3e^{j \\cdot 45°}$

$z_1 \\cdot z_2 = 6e^{j \\cdot 75°}$

---

## Multiplikation in trigonometrischer Form

$$z_1 \\cdot z_2 = r_1 r_2 [\\cos(\\varphi_1 + \\varphi_2) + j\\sin(\\varphi_1 + \\varphi_2)]$$

---

## Spezialfall: Multiplikation mit j

$z \\cdot j = (x + jy) \\cdot j = xj + j^2 y = -y + jx$

Geometrisch: **Rotation um 90°** gegen den Uhrzeigersinn!

---

## Übungsaufgaben

**Aufgabe 1:** $(2 + j)(3 - 2j) = ?$

*Lösung:* $6 - 4j + 3j - 2j^2 = 6 - j + 2 = 8 - j$

**Aufgabe 2:** $(1 + j)^2 = ?$

*Lösung:* $1 + 2j + j^2 = 1 + 2j - 1 = 2j$

**Aufgabe 3:** Berechne $j^{10}$

*Lösung:* $j^{10} = (j^4)^2 \\cdot j^2 = 1 \\cdot (-1) = -1$

**Aufgabe 4:** $2e^{j60°} \\cdot 3e^{j30°} = ?$

*Lösung:* $6e^{j90°} = 6j$`,
    },

    // ====== LEKTION 6: Komplex Konjugierte & Division ======
    {
      id: "kz-6",
      title: "Komplex Konjugierte & Division",
      duration: "20 min",
      type: "interactive",
      interactive: "complexOperationsCalculator" as const,
      content: `# Komplex Konjugierte & Division

## Komplex Konjugierte

Die **konjugiert komplexe** Zahl von $z = x + jy$ ist:

$$\\bar{z} = x - jy$$

Geometrisch: **Spiegelung an der reellen Achse** (x-Achse) in der Gaußschen Ebene.

### Wichtige Eigenschaften

| Eigenschaft | Formel |
|------------|--------|
| Doppelte Konjugation | $\\overline{\\bar{z}} = z$ |
| Summe | $\\overline{z_1 + z_2} = \\bar{z_1} + \\bar{z_2}$ |
| Produkt | $\\overline{z_1 \\cdot z_2} = \\bar{z_1} \\cdot \\bar{z_2}$ |
| Betrag | $|\\bar{z}| = |z|$ |

### Schlüssel-Formel

$$z \\cdot \\bar{z} = (x + jy)(x - jy) = x^2 + y^2 = |z|^2$$

Das Produkt einer Zahl mit ihrem Konjugierten ergibt immer eine **reelle Zahl** (nämlich das Quadrat des Betrags)!

---

## Division in Normalform

Um $\\frac{z_1}{z_2} = \\frac{x_1 + jy_1}{x_2 + jy_2}$ zu berechnen, erweitern wir mit dem **konjugierten Nenner**:

$$\\frac{z_1}{z_2} = \\frac{z_1 \\cdot \\bar{z_2}}{z_2 \\cdot \\bar{z_2}} = \\frac{(x_1 + jy_1)(x_2 - jy_2)}{x_2^2 + y_2^2}$$

### Beispiel 1

$$\\frac{3 + 2j}{1 + j}$$

Erweitern mit $\\bar{z_2} = 1 - j$:

$$= \\frac{(3 + 2j)(1 - j)}{(1 + j)(1 - j)} = \\frac{3 - 3j + 2j - 2j^2}{1 + 1} = \\frac{3 - j + 2}{2} = \\frac{5 - j}{2} = 2{,}5 - 0{,}5j$$

### Beispiel 2

$$\\frac{4 + 2j}{2 - 3j}$$

Erweitern mit $2 + 3j$:

$$= \\frac{(4 + 2j)(2 + 3j)}{(2 - 3j)(2 + 3j)} = \\frac{8 + 12j + 4j + 6j^2}{4 + 9} = \\frac{8 + 16j - 6}{13} = \\frac{2 + 16j}{13}$$

---

## Division in Exponentialform

$$\\frac{z_1}{z_2} = \\frac{r_1}{r_2} \\cdot e^{j(\\varphi_1 - \\varphi_2)}$$

**Regel:** Beträge **dividieren**, Winkel **subtrahieren**!

### Beispiel 3

$$\\frac{6e^{j90°}}{2e^{j30°}} = 3e^{j60°}$$

---

## Übungsaufgaben

**Aufgabe 1:** Berechne $\\bar{z}$ für $z = 5 - 3j$

*Lösung:* $\\bar{z} = 5 + 3j$

**Aufgabe 2:** Berechne $z \\cdot \\bar{z}$ für $z = 3 + 4j$

*Lösung:* $z \\cdot \\bar{z} = 9 + 16 = 25 = |z|^2$

**Aufgabe 3:** $\\frac{2 + j}{1 - j} = ?$

*Lösung:* $\\frac{(2+j)(1+j)}{(1-j)(1+j)} = \\frac{2+2j+j+j^2}{2} = \\frac{1+3j}{2} = 0{,}5 + 1{,}5j$`,
    },

    // ====== LEKTION 7: Potenzieren (De Moivre) ======
    {
      id: "kz-7",
      title: "Potenzieren (De Moivre)",
      duration: "18 min",
      type: "interactive",
      interactive: "complexPowerCalculator" as const,
      content: `# Potenzieren — De Moivresche Formel

## De Moivresche Formel

Für eine komplexe Zahl in Exponentialform $z = r \\cdot e^{j\\varphi}$ gilt:

$$z^n = r^n \\cdot e^{jn\\varphi}$$

In trigonometrischer Form:

$$z^n = r^n \\cdot (\\cos(n\\varphi) + j\\sin(n\\varphi))$$

**Regel:** Betrag potenzieren, Winkel mit n multiplizieren!

---

## Beispiel 1: Quadrat

$z = 1 + j$ → in Polarform: $r = \\sqrt{2}$, $\\varphi = 45°$

$z^2 = (\\sqrt{2})^2 \\cdot e^{j \\cdot 90°} = 2e^{j90°} = 2j$

Probe in Normalform: $(1+j)^2 = 1 + 2j + j^2 = 2j$ ✓

---

## Beispiel 2: Kubik

$z = 2e^{j30°}$

$z^3 = 2^3 \\cdot e^{j \\cdot 90°} = 8e^{j90°} = 8j$

---

## Potenzen von j

Die imaginäre Einheit $j$ hat einen **zyklischen** Potenzkreislauf mit Periode 4:

| Potenz | Wert | Erklärung |
|--------|------|-----------|
| $j^0$ | $1$ | Definition |
| $j^1$ | $j$ | Definition |
| $j^2$ | $-1$ | Definition |
| $j^3$ | $j^2 \\cdot j = -j$ | |
| $j^4$ | $j^2 \\cdot j^2 = 1$ | Zyklus beginnt von vorn |
| $j^5$ | $j$ | = $j^1$ |
| $j^n$ | $j^{n \\bmod 4}$ | Allgemein |

### Beispiel 3

$j^{17} = j^{17 \\bmod 4} = j^1 = j$

$j^{22} = j^{22 \\bmod 4} = j^2 = -1$

$j^{100} = j^{100 \\bmod 4} = j^0 = 1$

---

## Beispiel 4: Komplexe Potenz

$(1 + j)^6 = ?$

In Polarform: $z = \\sqrt{2} e^{j45°}$

$z^6 = (\\sqrt{2})^6 \\cdot e^{j \\cdot 270°} = 8 \\cdot e^{j270°} = 8(\\cos 270° + j\\sin 270°) = 8(0 - j) = -8j$

---

## Anwendung: Reelle und imaginäre Teile extrahieren

Aus $z^n = r^n(\\cos n\\varphi + j\\sin n\\varphi)$ folgt:

$$\\text{Re}(z^n) = r^n \\cos(n\\varphi)$$

$$\\text{Im}(z^n) = r^n \\sin(n\\varphi)$$

Das ist nützlich, um trigonometrische Ausdrücke zu berechnen.`,
    },

    // ====== LEKTION 8: Radizieren ======
    {
      id: "kz-8",
      title: "Radizieren",
      duration: "22 min",
      type: "interactive",
      interactive: "complexRootCalculator" as const,
      content: `# Radizieren — n-te Wurzeln komplexer Zahlen

## Formel für n-te Wurzeln

Die $n$-ten Wurzeln von $z = r \\cdot e^{j\\varphi}$ sind:

$$w_k = r^{1/n} \\cdot e^{j(\\varphi + 2k\\pi)/n}$$

wobei $k = 0, 1, 2, \\ldots, n-1$.

> **Wichtig:** Es gibt immer genau $n$ verschiedene $n$-te Wurzeln!

---

## Beispiel 1: Kubikwurzeln von 8

$z = 8 = 8e^{j \\cdot 0°}$ → $r = 8$, $\\varphi = 0°$

$n = 3$: $w_k = 8^{1/3} \\cdot e^{j(0° + k \\cdot 360°)/3} = 2 \\cdot e^{jk \\cdot 120°}$

| $k$ | Winkel | Wurzel |
|-----|--------|--------|
| $0$ | $0°$ | $w_0 = 2$ |
| $1$ | $120°$ | $w_1 = 2e^{j120°} = -1 + j\\sqrt{3}$ |
| $2$ | $240°$ | $w_2 = 2e^{j240°} = -1 - j\\sqrt{3}$ |

Die drei Wurzeln bilden ein **gleichseitiges Dreieck** in der Gaußschen Ebene!

---

## Beispiel 2: Quadratwurzeln von $j$

$z = j = e^{j90°}$ → $r = 1$, $\\varphi = 90°$

$n = 2$: $w_k = 1^{1/2} \\cdot e^{j(90° + k \\cdot 360°)/2}$

| $k$ | Winkel | Wurzel |
|-----|--------|--------|
| $0$ | $45°$ | $w_0 = e^{j45°} = \\frac{\\sqrt{2}}{2} + j\\frac{\\sqrt{2}}{2}$ |
| $1$ | $225°$ | $w_1 = e^{j225°} = -\\frac{\\sqrt{2}}{2} - j\\frac{\\sqrt{2}}{2}$ |

---

## Beispiel 3: 4. Wurzeln von $16$

$z = 16 = 16e^{j \\cdot 0°}$ → $r = 16$, $\\varphi = 0°$

$n = 4$: $w_k = 16^{1/4} \\cdot e^{jk \\cdot 90°} = 2 \\cdot e^{jk \\cdot 90°}$

| $k$ | Winkel | Wurzel |
|-----|--------|--------|
| $0$ | $0°$ | $w_0 = 2$ |
| $1$ | $90°$ | $w_1 = 2j$ |
| $2$ | $180°$ | $w_2 = -2$ |
| $3$ | $270°$ | $w_3 = -2j$ |

Die vier Wurzeln bilden ein **Quadrat** in der Gaußschen Ebene!

---

## Geometrische Anschauung

Die $n$-ten Wurzeln einer komplexen Zahl:
- Liegen auf einem **Kreis** mit Radius $r^{1/n}$
- Sind **gleichmäßig verteilt** (Winkelabstand: $\\frac{360°}{n}$)
- Bilden die Ecken eines **regelmäßigen n-Ecks**

---

## Beispiel 4: Kubikwurzeln von $8i$

$z = 8j = 8e^{j90°}$ → $r = 8$, $\\varphi = 90°$

$n = 3$: $w_k = 2 \\cdot e^{j(90° + k \\cdot 360°)/3}$

| $k$ | Winkel | Wurzel |
|-----|--------|--------|
| $0$ | $30°$ | $w_0 = 2e^{j30°} = \\sqrt{3} + j$ |
| $1$ | $150°$ | $w_1 = 2e^{j150°} = -\\sqrt{3} + j$ |
| $2$ | $270°$ | $w_2 = 2e^{j270°} = -2j$ |

Probe: $(\\sqrt{3} + j)^3 = 8j$ ✓`,
    },
  ],
};

// ==================== QUIZ ====================

export const complexQuiz: QuizQuestion[] = [
  {
    question: "Was ist $j^2$?",
    type: "multiple",
    options: ["$1$", "$-1$", "$j$", "$-j$"],
    correct: 1,
    explanation: "Die imaginäre Einheit ist definiert durch $j^2 = -1$.",
  },
  {
    question: "Was ist der Realteil von $z = 3 - 5j$?",
    type: "multiple",
    options: ["$-5$", "$3$", "$5$", "$-3$"],
    correct: 1,
    explanation: "$z = 3 - 5j$: Der Realteil ist der Koeffizient ohne $j$, also $\\text{Re}(z) = 3$.",
  },
  {
    question: "Berechne den Betrag von $z = 3 + 4j$.",
    type: "multiple",
    options: ["$7$", "$5$", "$25$", "$\\sqrt{7}$"],
    correct: 1,
    explanation: "$|z| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
  },
  {
    question: "Was ergibt $(2 + 3j) + (1 - 4j)$?",
    type: "input",
    correct: "3-j",
    explanation: "$(2+1) + j(3-4) = 3 - j$.",
  },
  {
    question: "Was ist das Konjugierte von $z = 5 + 2j$?",
    type: "multiple",
    options: ["$-5 - 2j$", "$5 - 2j$", "$-5 + 2j$", "$2 + 5j$"],
    correct: 1,
    explanation: "Das Konjugierte erhält man, indem man das Vorzeichen des Imaginärteils ändert: $\\bar{z} = 5 - 2j$.",
  },
  {
    question: "Berechne $z \\cdot \\bar{z}$ für $z = 1 + 2j$.",
    type: "input",
    correct: "5",
    explanation: "$z \\cdot \\bar{z} = (1+2j)(1-2j) = 1 + 4 = 5 = |z|^2$.",
  },
  {
    question: "Was ergibt $(1+j)^2$?",
    type: "multiple",
    options: ["$2j$", "$2 + 2j$", "$1 + 2j$", "$-2j$"],
    correct: 0,
    explanation: "$(1+j)^2 = 1 + 2j + j^2 = 1 + 2j - 1 = 2j$.",
  },
  {
    question: "Was ist $j^7$?",
    type: "multiple",
    options: ["$j$", "$-1$", "$-j$", "$1$"],
    correct: 2,
    explanation: "$j^7 = j^{7 \\bmod 4} = j^3 = j^2 \\cdot j = -j$.",
  },
  {
    question: "In welcher Form schreibt man $z = r(\\cos\\varphi + j\\sin\\varphi)$?",
    type: "multiple",
    options: ["Normalform", "Exponentialform", "Trigonometrische Form", "Polarkoordinaten-Form"],
    correct: 2,
    explanation: "$z = r(\\cos\\varphi + j\\sin\\varphi)$ ist die trigonometrische Form.",
  },
  {
    question: "Wie viele $n$-te Wurzeln hat eine komplexe Zahl?",
    type: "multiple",
    options: ["$1$", "$2$", "$n-1$", "$n$"],
    correct: 3,
    explanation: "Nach dem Fundamentalsatz der Algebra hat jede komplexe Zahl genau $n$ verschiedene $n$-te Wurzeln.",
  },
];

// ==================== EXERCISES ====================

export interface ComplexExercise {
  id: string;
  lessonId: string;
  difficulty: 1 | 2 | 3;
  type: "input" | "multiple";
  question: string;
  hint?: string;
  expectedAnswer?: string;
  tolerance?: number;
  format?: string;
  options?: { label: string; value: string }[];
  correctOption?: string;
  solution: string;
}

export const complexExercises: ComplexExercise[] = [
  // === Lektion 1: Grundlagen ===
  {
    id: "kz-ue-1-1",
    lessonId: "kz-1",
    difficulty: 1,
    type: "input",
    question: "Was ist der Realteil von $z = 7 - 3j$?",
    expectedAnswer: "7",
    format: "Zahl",
    solution: "$\\text{Re}(7 - 3j) = 7$",
  },
  {
    id: "kz-ue-1-2",
    lessonId: "kz-1",
    difficulty: 1,
    type: "input",
    question: "Was ist der Imaginärteil von $z = 4 + 9j$?",
    expectedAnswer: "9",
    format: "Zahl",
    solution: "$\\text{Im}(4 + 9j) = 9$",
  },
  {
    id: "kz-ue-1-3",
    lessonId: "kz-1",
    difficulty: 1,
    type: "multiple",
    question: "Welche Gleichung hat keine reelle Lösung?",
    options: [
      { label: "$x^2 - 4 = 0$", value: "a" },
      { label: "$x^2 + 1 = 0$", value: "b" },
      { label: "$x^2 - 1 = 0$", value: "c" },
      { label: "$x^2 = 0$", value: "d" },
    ],
    correctOption: "b",
    solution: "$x^2 + 1 = 0 \\Rightarrow x^2 = -1$. Keine reelle Zahl quadriert ergibt $-1$.",
  },

  // === Lektion 2: Gaußsche Ebene ===
  {
    id: "kz-ue-2-1",
    lessonId: "kz-2",
    difficulty: 1,
    type: "input",
    question: "Berechne den Betrag von $z = 6 + 8j$.",
    expectedAnswer: "10",
    format: "Zahl",
    hint: "$|z| = \\sqrt{x^2 + y^2}$",
    solution: "$|z| = \\sqrt{36 + 64} = \\sqrt{100} = 10$",
  },
  {
    id: "kz-ue-2-2",
    lessonId: "kz-2",
    difficulty: 2,
    type: "input",
    question: "Berechne den Betrag von $z = 1 - j$.",
    expectedAnswer: "1.414",
    tolerance: 0.01,
    format: "Dezimalzahl",
    hint: "$|z| = \\sqrt{1^2 + (-1)^2}$",
    solution: "$|z| = \\sqrt{1 + 1} = \\sqrt{2} \\approx 1{,}414$",
  },
  {
    id: "kz-ue-2-3",
    lessonId: "kz-2",
    difficulty: 2,
    type: "multiple",
    question: "In welchem Quadranten liegt $z = -3 + 2j$?",
    options: [
      { label: "Quadrant I", value: "a" },
      { label: "Quadrant II", value: "b" },
      { label: "Quadrant III", value: "c" },
      { label: "Quadrant IV", value: "d" },
    ],
    correctOption: "b",
    solution: "$x = -3 < 0$, $y = 2 > 0$ → Quadrant II.",
  },

  // === Lektion 3: Darstellungsformen ===
  {
    id: "kz-ue-3-1",
    lessonId: "kz-3",
    difficulty: 2,
    type: "input",
    question: "Berechne den Betrag $r$ von $z = 5 + 12j$.",
    expectedAnswer: "13",
    format: "Zahl",
    hint: "$r = \\sqrt{x^2 + y^2}$",
    solution: "$r = \\sqrt{25 + 144} = \\sqrt{169} = 13$",
  },
  {
    id: "kz-ue-3-2",
    lessonId: "kz-3",
    difficulty: 2,
    type: "input",
    question: "Berechne den Winkel $\\varphi$ von $z = 1 + j$ in Grad.",
    expectedAnswer: "45",
    format: "Grad",
    hint: "$\\varphi = \\arctan(y/x)$",
    solution: "$\\varphi = \\arctan(1/1) = 45°$",
  },
  {
    id: "kz-ue-3-3",
    lessonId: "kz-3",
    difficulty: 3,
    type: "input",
    question: "Berechne den Winkel $\\varphi$ von $z = -1 - j$ in Grad (0° bis 360°).",
    expectedAnswer: "225",
    format: "Grad",
    hint: "Quadrant III: $\\varphi = \\arctan(y/x) + 180°$",
    solution: "$\\arctan((-1)/(-1)) = 45°$. Quadrant III: $\\varphi = 45° + 180° = 225°$.",
  },

  // === Lektion 4: Addition & Subtraktion ===
  {
    id: "kz-ue-4-1",
    lessonId: "kz-4",
    difficulty: 1,
    type: "input",
    question: "$(4 + 3j) + (2 - 5j) = ?$ (Format: a+bj)",
    expectedAnswer: "6-2j",
    format: "Komplexe Zahl",
    solution: "$(4+2) + j(3-5) = 6 - 2j$",
  },
  {
    id: "kz-ue-4-2",
    lessonId: "kz-4",
    difficulty: 1,
    type: "input",
    question: "$(7 + j) - (3 + 4j) = ?$ (Format: a+bj)",
    expectedAnswer: "4-3j",
    format: "Komplexe Zahl",
    solution: "$(7-3) + j(1-4) = 4 - 3j$",
  },
  {
    id: "kz-ue-4-3",
    lessonId: "kz-4",
    difficulty: 2,
    type: "input",
    question: "$(2 + 3j) + (1 - 2j) - (3 + j) = ?$ (Format: a+bj)",
    expectedAnswer: "0",
    format: "Komplexe Zahl",
    solution: "$(2+1-3) + j(3-2-1) = 0 + 0j = 0$",
  },

  // === Lektion 5: Multiplikation ===
  {
    id: "kz-ue-5-1",
    lessonId: "kz-5",
    difficulty: 2,
    type: "input",
    question: "$(1 + 2j)(3 - j) = ?$ (Format: a+bj)",
    expectedAnswer: "5+5j",
    format: "Komplexe Zahl",
    solution: "$(3 - j + 6j - 2j^2) = 3 + 5j + 2 = 5 + 5j$",
  },
  {
    id: "kz-ue-5-2",
    lessonId: "kz-5",
    difficulty: 2,
    type: "input",
    question: "$(2 + j)^2 = ?$ (Format: a+bj)",
    expectedAnswer: "3+4j",
    format: "Komplexe Zahl",
    solution: "$(2+j)^2 = 4 + 4j + j^2 = 4 + 4j - 1 = 3 + 4j$",
  },
  {
    id: "kz-ue-5-3",
    lessonId: "kz-5",
    difficulty: 3,
    type: "input",
    question: "Berechne $j^{15}$.",
    expectedAnswer: "-j",
    format: "Komplexe Zahl",
    hint: "$15 \\bmod 4 = 3$",
    solution: "$j^{15} = j^{15 \\bmod 4} = j^3 = -j$",
  },

  // === Lektion 6: Division ===
  {
    id: "kz-ue-6-1",
    lessonId: "kz-6",
    difficulty: 2,
    type: "input",
    question: "$\\frac{4}{1+j} = ?$ (Format: a+bj)",
    expectedAnswer: "2-2j",
    format: "Komplexe Zahl",
    hint: "Mit $1-j$ erweitern",
    solution: "$\\frac{4(1-j)}{(1+j)(1-j)} = \\frac{4-4j}{2} = 2 - 2j$",
  },
  {
    id: "kz-ue-6-2",
    lessonId: "kz-6",
    difficulty: 3,
    type: "input",
    question: "$\\frac{3+4j}{2-j} = ?$ (Format: a+bj)",
    expectedAnswer: "0.4+2.2j",
    tolerance: 0.01,
    format: "Komplexe Zahl",
    hint: "Mit $2+j$ erweitern",
    solution: "$\\frac{(3+4j)(2+j)}{4+1} = \\frac{6+3j+8j-4}{5} = \\frac{2+11j}{5} = 0{,}4 + 2{,}2j$",
  },

  // === Lektion 7: Potenzieren ===
  {
    id: "kz-ue-7-1",
    lessonId: "kz-7",
    difficulty: 2,
    type: "input",
    question: "Berechne $(e^{j60°})^3$ in der Form $a+bj$.",
    expectedAnswer: "-1",
    format: "Komplexe Zahl",
    hint: "De Moivre: $(e^{j\\varphi})^n = e^{jn\\varphi}$",
    solution: "$e^{j180°} = \\cos 180° + j\\sin 180° = -1 + 0j = -1$",
  },
  {
    id: "kz-ue-7-2",
    lessonId: "kz-7",
    difficulty: 3,
    type: "input",
    question: "Berechne $(1+j)^4$ in der Form $a+bj$.",
    expectedAnswer: "-4",
    format: "Komplexe Zahl",
    hint: "$(1+j)^2 = 2j$, dann quadrieren",
    solution: "$(1+j)^2 = 2j$. Dann $(2j)^2 = 4j^2 = -4$.",
  },

  // === Lektion 8: Radizieren ===
  {
    id: "kz-ue-8-1",
    lessonId: "kz-8",
    difficulty: 2,
    type: "input",
    question: "Wie viele verschiedene Quadratwurzeln hat eine komplexe Zahl?",
    expectedAnswer: "2",
    format: "Zahl",
    solution: "Jede komplexe Zahl hat genau $n = 2$ Quadratwurzeln.",
  },
  {
    id: "kz-ue-8-2",
    lessonId: "kz-8",
    difficulty: 3,
    type: "input",
    question: "Berechne die reelle Quadratwurzel von $z = -4$ (die mit positivem Imaginärteil). (Format: a+bj)",
    expectedAnswer: "2j",
    format: "Komplexe Zahl",
    hint: "$-4 = 4e^{j180°}$, $\\sqrt{4} = 2$",
    solution: "$-4 = 4e^{j180°}$. $w_0 = 2e^{j90°} = 2j$. $w_1 = 2e^{j270°} = -2j$. Die mit positivem Imaginärteil: $2j$.",
  },
  {
    id: "kz-ue-8-3",
    lessonId: "kz-8",
    difficulty: 3,
    type: "input",
    question: "Wie viele Kubikwurzeln hat $z = 27$?",
    expectedAnswer: "3",
    format: "Zahl",
    solution: "Jede komplexe Zahl hat genau 3 Kubikwurzeln ($n = 3$).",
  },
];
