import { Module, QuizQuestion } from "./types";

export const complexModule: Module = {
  id: "m-komplexe-zahlen",
  slug: "mathe-komplexe-zahlen",
  title: "Komplexe Zahlen",
  description: "Von der imaginären Einheit bis zu Wurzeln in der Gaußschen Ebene — interaktiv und verständlich",
  icon: "🌀",
  color: "#8b5cf6",
  category: "mathe",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Komplexe Zahlen

### Grundlagen
- **Imaginäre Einheit:** $j = \\sqrt{-1}$, also $j^2 = -1$
- **Komplexe Zahl:** $z = x + jy$ mit $x, y \\in \\mathbb{R}$
- **Realteil:** $\\text{Re}(z) = x$ · **Imaginärteil:** $\\text{Im}(z) = y$

### Darstellungsformen
| Form | Schreibweise | Wann nutzen? |
|------|-------------|--------------|
| **Normalform** | $z = x + jy$ | Addieren, Subtrahieren |
| **Trigonometrisch** | $z = r(\\cos\\varphi + j\\sin\\varphi)$ | Winkel sichtbar |
| **Exponentialform** | $z = r \\cdot e^{j\\varphi}$ | Multiplizieren, Dividieren |

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
- **Multiplikation:** $r_1 r_2 \\cdot e^{j(\\varphi_1+\\varphi_2)}$ → Beträge ×, Winkel +
- **Division:** $\\frac{r_1}{r_2} \\cdot e^{j(\\varphi_1-\\varphi_2)}$ → Beträge ÷, Winkel −
- **Konjugiertes:** $\\bar{z} = x - jy$ (Spiegelung an Re-Achse)
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

Stell dir vor, du sollst diese Gleichung lösen:

$$x^2 + 1 = 0$$

Umformen gibt: $x^2 = -1$

Aber: **Keine reelle Zahl quadriert zu $-1$!** Denn $x^2 \\geq 0$ für alle $x \\in \\mathbb{R}$.

Also erfinden wir eine neue Zahl.

---

## Die imaginäre Einheit $j$

Wir **definieren** eine neue Zahl $j$ mit der Eigenschaft:

$$j = \\sqrt{-1}$$

Das heißt automatisch:

$$j^2 = -1$$

**Das ist keine normale Zahl** — sie existiert nicht auf der reellen Zahlenachse. Aber mit ihr können wir rechnen!

---

## Komplexe Zahlen

Eine **komplexe Zahl** hat die Form:

$$z = x + j \\cdot y$$

wobei:
- $x$ ist der **Realteil** — $\\text{Re}(z) = x$ (der "normale" Teil)
- $y$ ist der **Imaginärteil** — $\\text{Im}(z) = y$ (der $j$-Teil)
- $x$ und $y$ sind reelle Zahlen

**Merke:** Wenn $y = 0$, dann ist $z = x$ — eine ganz normale reelle Zahl. Reelle Zahlen sind also ein Sonderfall komplexer Zahlen!

---

## Beispiele

| Zahl | $\\text{Re}(z)$ | $\\text{Im}(z)$ | Bemerkung |
|------|------|------|------|
| $z = 3 + 4j$ | 3 | 4 | "normale" komplexe Zahl |
| $z = -2 + 5j$ | -2 | 5 | negativer Realteil |
| $z = 7$ | 7 | 0 | reelle Zahl! |
| $z = -3j$ | 0 | -3 | rein imaginär |
| $z = j$ | 0 | 1 | die imaginäre Einheit selbst |

---

## Warum $j$ und nicht $i$?

In der Mathematik benutzt man oft $i$. In der **Elektrotechnik** und **Informatik** benutzt man $j$, weil $i$ schon für den Strom steht. In diesem Kurs nutzen wir $j$. 🎯

---

## 💡 Erste Rechnungen mit $j$

Da $j^2 = -1$ gilt, können wir vereinfachen:

- $j^3 = j^2 \\cdot j = (-1) \\cdot j = -j$
- $j^4 = j^2 \\cdot j^2 = (-1) \\cdot (-1) = 1$
- $j^5 = j^4 \\cdot j = 1 \\cdot j = j$ — und von vorne!

**Die Potenzen von $j$ wiederholen sich alle 4 Schritte:** $j, -1, -j, 1, j, -1, -j, 1, \\ldots$

---

## 🎯 Übung: Erste Schritte

**Aufgabe 1:** Berechne $j^6$.

*Lösung:* $j^6 = j^4 \\cdot j^2 = 1 \\cdot (-1) = -1$

**Aufgabe 2:** Berechne $2j \\cdot 3j$.

*Lösung:* $2j \\cdot 3j = 6j^2 = 6 \\cdot (-1) = -6$

**Aufgabe 3:** Vereinfache $(1 + j) + (3 - 2j)$.

*Lösung:* $(1+3) + j(1-2) = 4 - j$ — Realteile zusammen, Imaginärteile zusammen!`,
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

Reelle Zahlen leben auf einer **Zahlenachse** (1D). Komplexe Zahlen brauchen eine **Ebene** (2D).

---

## So funktioniert's

Die **Gaußsche Ebene** (auch: komplexes Zahlenfeld) hat zwei Achsen:

- **Horizontale Achse (x):** Realteil $\\text{Re}(z)$
- **Vertikale Achse (y):** Imaginärteil $\\text{Im}(z)$

Jede komplexe Zahl $z = x + jy$ ist ein **Punkt** in dieser Ebene bei den Koordinaten $(x | y)$.

---

## Beispiele einzeichnen

| Zahl | Re | Im | Position |
|------|---:|---:|----------|
| $z_1 = 3 + 4j$ | 3 | 4 | rechts oben |
| $z_2 = -2 + 3j$ | -2 | 3 | links oben |
| $z_3 = -5 - 4j$ | -5 | -4 | links unten |
| $z_4 = 6$ | 6 | 0 | auf der Re-Achse |
| $z_5 = -3j$ | 0 | -3 | auf der Im-Achse |

---

## 💡 Das kannst du jetzt interaktiv ausprobieren!

**Klicke auf die Ebene** — es wird dir die komplexe Zahl an der Stelle angezeigt. Oder gib eine Zahl ein und sie wird eingezeichnet.

---

## Wichtige Punkte

- $z = 4$ liegt auf der **reellen Achse** (rechts vom Ursprung)
- $z = -j$ liegt auf der **imaginären Achse** (unten)
- $z = 0$ ist der **Ursprung**
- Der **Abstand vom Ursprung** ist der Betrag $|z| = \\sqrt{x^2 + y^2}$ (Pythagoras!)

---

## 🎯 Übung

Versuche diese Zahlen in die Gaußsche Ebene einzuzeichnen:

1. $z_1 = 2 + 3j$ → Punkt bei $(2 | 3)$
2. $z_2 = -4 + j$ → Punkt bei $(-4 | 1)$
3. $z_3 = -3 - 2j$ → Punkt bei $(-3 | -2)$
4. $z_4 = 5j$ → Punkt bei $(0 | 5)$
5. $z_5 = -4$ → Punkt bei $(-4 | 0)$`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 3: Darstellungsformen
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-3",
      title: "Darstellungsformen",
      duration: "20 min",
      type: "interactive",
      interactive: "complexFormConverter",
      content: `# Die drei Darstellungsformen

Eine komplexe Zahl kann man auf **drei Arten** schreiben. Jede hat Vorteile.

---

## 1. Normalform (Kartesische Form)

$$z = x + jy$$

Das ist die Form die du bisher kennst. Gut zum **Addieren** und **Subtrahieren**.

---

## 2. Trigonometrische Form

$$z = r \\cdot (\\cos\\varphi + j\\sin\\varphi)$$

Hier beschreiben wir die Zahl durch:
- $r = |z|$ — der **Betrag** (Abstand vom Ursprung)
- $\\varphi$ — der **Winkel** gegen die positive reelle Achse

**Woher kommen $r$ und $\\varphi$?**

In der Gaußschen Ebene bildet $z = x + jy$ ein **rechtwinkliges Dreieck**:
- Die Hypotenuse ist $r$ (der Betrag)
- Die Ankathete ist $x$ (der Realteil)
- Die Gegenkathete ist $y$ (der Imaginärteil)

Aus der Schulmathematik:
$$r = \\sqrt{x^2 + y^2}$$

Das ist einfach der **Pythagoras!** $r$ ist die Hypotenuse des Dreiecks.

Für den Winkel:
$$\\tan\\varphi = \\frac{y}{x} \\quad \\Rightarrow \\quad \\varphi = \\arctan\\frac{y}{x}$$

**Achtung:** $\\arctan$ liefert nur Werte zwischen $-90°$ und $+90°$. Je nach **Quadrant** musst du korrigieren!

---

## 3. Exponentialform (Euler-Formel)

$$z = r \\cdot e^{j\\varphi}$$

Das ist die **kürzeste** Schreibweise. Die **Euler-Formel** sagt:

$$e^{j\\varphi} = \\cos\\varphi + j\\sin\\varphi$$

Die Exponentialform ist super zum **Multiplizieren** und **Dividieren**.

---

## Umrechnung: Normal → Polar

**Gegeben:** $z = 3 + 4j$

**Schritt 1: Betrag $r$ berechnen**
$$r = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$$

**Schritt 2: Winkel $\\varphi$ berechnen**
$$\\tan\\varphi = \\frac{4}{3} = 1.333 \\quad \\Rightarrow \\quad \\varphi = \\arctan(1.333) = 53.13°$$

**Schritt 3: Quadrant prüfen**
$x = 3 > 0$ und $y = 4 > 0$ → **Quadrant I** → keine Korrektur nötig!

**Ergebnis:**
- Trigonometrisch: $z = 5 \\cdot (\\cos 53.13° + j\\sin 53.13°)$
- Exponential: $z = 5 \\cdot e^{j \\cdot 53.13°}$

---

## Umrechnung: Polar → Normal

**Gegeben:** $z = 4 \\cdot e^{j \\cdot 30°}$

**Schritt 1: Realteil**
$$x = r \\cdot \\cos\\varphi = 4 \\cdot \\cos 30° = 4 \\cdot 0.866 = 3.464$$

**Schritt 2: Imaginärteil**
$$y = r \\cdot \\sin\\varphi = 4 \\cdot \\sin 30° = 4 \\cdot 0.5 = 2$$

**Ergebnis:** $z = 3.464 + 2j$

---

## ⚡ Quadranten-Regeln

Das Wichtigste: **Prüfe IMMER den Quadranten** bevor du $\\varphi$ abliest!

| Quadrant | Bedingung | $\\varphi$ berechnen |
|----------|-----------|---------------------|
| **I** (rechts oben) | $x > 0, y > 0$ | $\\arctan(y/x)$ |
| **II** (links oben) | $x < 0, y > 0$ | $\\arctan(y/x) + 180°$ |
| **III** (links unten) | $x < 0, y < 0$ | $\\arctan(y/x) + 180°$ |
| **IV** (rechts unten) | $x > 0, y < 0$ | $\\arctan(y/x) + 360°$ |

**Beispiel Quadrant II:** $z = -1 + j$
- $r = \\sqrt{1+1} = \\sqrt{2}$
- $\\arctan(1/(-1)) = \\arctan(-1) = -45°$
- Quadrant II: $\\varphi = -45° + 180° = 135°$ ✓

---

## 🎯 Übung: Umrechnung

**Aufgabe 1:** Wandle $z = 1 + j$ in die Exponentialform um.
- $r = \\sqrt{1+1} = \\sqrt{2} \\approx 1.414$
- $\\varphi = \\arctan(1/1) = 45°$ (Quadrant I)
- $z = \\sqrt{2} \\cdot e^{j45°}$

**Aufgabe 2:** Wandle $z = 2e^{j60°}$ in die Normalform um.
- $x = 2\\cos 60° = 2 \\cdot 0.5 = 1$
- $y = 2\\sin 60° = 2 \\cdot 0.866 = 1.732$
- $z = 1 + 1.732j$

**Aufgabe 3:** Wandle $z = -3 - 3j$ um.
- $r = \\sqrt{9+9} = \\sqrt{18} = 3\\sqrt{2}$
- $\\arctan((-3)/(-3)) = \\arctan(1) = 45°$
- Quadrant III: $\\varphi = 45° + 180° = 225°$
- $z = 3\\sqrt{2} \\cdot e^{j225°}$`,
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

Die einfachste Rechenart bei komplexen Zahlen!

---

## Die Regel

Gegeben: $z_1 = x_1 + jy_1$ und $z_2 = x_2 + jy_2$

**Addition:**
$$z_1 + z_2 = (x_1 + x_2) + j(y_1 + y_2)$$

**Subtraktion:**
$$z_1 - z_2 = (x_1 - x_2) + j(y_1 - y_2)$$

**Einfach:** Realteile zusammen, Imaginärteile zusammen!

---

## Beispiel Schritt für Schritt

**Aufgabe:** $(3 + 2j) + (1 - 4j)$

**Schritt 1 — Realteile addieren:** $3 + 1 = 4$

**Schritt 2 — Imaginärteile addieren:** $2 + (-4) = -2$

**Ergebnis:** $4 - 2j$ ✓

---

## Geometrische Bedeutung

In der Gaußschen Ebene ist Addition **Vektoraddition**:

- $z_1 = 3 + 2j$ ist ein Punkt bei $(3 | 2)$
- $z_2 = 1 - 4j$ ist ein Punkt bei $(1 | -4)$
- $z_1 + z_2 = 4 - 2j$ ist der Punkt bei $(4 | -2)$

Du kannst auch **Pfeile** (Vektoren) vom Ursprung zu $z_1$ und $z_2$ zeichnen. Die Summe ist das **Parallelogramm**!

---

## ⚡ Wichtig

Addition funktioniert **nur in der Normalform!** In der Exponentialform musst du zuerst umrechnen.

---

## 🎯 Übungsaufgaben

**1)** $(5 + 3j) + (2 - 7j)$
> Lösung: $7 - 4j$

**2)** $(-1 + 4j) - (3 + 2j)$
> Lösung: $(-1-3) + j(4-2) = -4 + 2j$

**3)** $(2j) + (3 - 5j)$
> Lösung: $3 + j(2-5) = 3 - 3j$

**4)** $(6 + j) - (-2 + 3j)$
> Lösung: $(6-(-2)) + j(1-3) = 8 - 2j$

**5)** $(1 + 2j) + (3 + 4j) + (-5 - j)$
> Lösung: $(1+3-5) + j(2+4-1) = -1 + 5j$`,
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
      content: `# Multiplikation komplexer Zahlen

Bei der Multiplikation wird es interessant — hier zeigt sich der Vorteil der Exponentialform!

---

## In Normalform (FOIL-Verfahren)

Gegeben: $z_1 = x_1 + jy_1$ und $z_2 = x_2 + jy_2$

$$z_1 \\cdot z_2 = (x_1 x_2 - y_1 y_2) + j(x_1 y_2 + x_2 y_1)$$

**Woher kommt das?** Einfach ausmultiplizieren (FOIL):

$$z_1 \\cdot z_2 = x_1 x_2 + x_1(jy_2) + (jy_1)x_2 + (jy_1)(jy_2)$$

$$= x_1 x_2 + j x_1 y_2 + j x_2 y_1 + j^2 y_1 y_2$$

Da $j^2 = -1$:

$$= x_1 x_2 - y_1 y_2 + j(x_1 y_2 + x_2 y_1)$$

---

## Beispiel Schritt für Schritt

**Aufgabe:** $(2 + 3j) \\cdot (1 - 2j)$

**Schritt 1 — Realteile:** $2 \\cdot 1 = 2$

**Schritt 2 — $j^2$-Term:** $3j \\cdot (-2j) = -6j^2 = -6 \\cdot (-1) = +6$

**Schritt 3 — Kreuzterme:** $2 \\cdot (-2j) + 3j \\cdot 1 = -4j + 3j = -j$

**Schritt 4 — Zusammenfassen:** $(2 + 6) + j(-1) = 8 - j$

---

## In Exponentialform (viel einfacher!)

$$z_1 \\cdot z_2 = r_1 r_2 \\cdot e^{j(\\varphi_1 + \\varphi_2)}$$

**Die Regel:** Beträge **multiplizieren**, Winkel **addieren**!

**Beispiel:** $(4 e^{j20°}) \\cdot (3 e^{j30°})$
- Betrag: $4 \\cdot 3 = 12$
- Winkel: $20° + 30° = 50°$
- Ergebnis: $12 e^{j50°}$

Das ist **deutlich einfacher** als in Normalform!

---

## 💡 Warum ist das wichtig?

In der Elektrotechnik und Signalverarbeitung werden Signale oft als komplexe Zahlen dargestellt. Multiplikation bedeutet dann: **Amplitude ändern** (Beträge ×) und **Phase drehen** (Winkel +).

---

## 🎯 Übungsaufgaben

**1)** $(1 + j) \\cdot (1 - j)$
> Lösung: $1 - j + j - j^2 = 1 + 1 = 2$

**2)** $(3 + 2j) \\cdot (1 + 4j)$
> Lösung: $(3-8) + j(12+2) = -5 + 14j$

**3)** $2e^{j15°} \\cdot 5e^{j45°}$
> Lösung: $10e^{j60°}$

**4)** Berechne $(1+j)^2$ in Normalform.
> Lösung: $1 + 2j + j^2 = 1 + 2j - 1 = 2j$

**5)** Berechne $(1+j)^2$ in Exponentialform (zuerst umrechnen!).
> $1+j = \\sqrt{2} e^{j45°}$ → $(\\sqrt{2})^2 e^{j90°} = 2e^{j90°} = 2j$ ✓`,
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
      content: `# Das Komplex Konjugierte & Division

---

## Das Komplex Konjugierte

Für $z = x + jy$ ist das **konjugierte**:

$$\\bar{z} = x - jy$$

**Geometrisch:** Spiegelung an der reellen Achse! Der Punkt $(x | y)$ wird zu $(x | -y)$.

**Beispiele:**
- $z = 3 + 4j$ → $\\bar{z} = 3 - 4j$
- $z = -2 - j$ → $\\bar{z} = -2 + j$
- $z = 5j$ → $\\bar{z} = -5j$

---

## Wichtige Eigenschaft

$$z \\cdot \\bar{z} = (x + jy)(x - jy) = x^2 - (jy)^2 = x^2 - j^2 y^2 = x^2 + y^2$$

Das ist **immer reell** und **immer positiv!** In fact:

$$z \\cdot \\bar{z} = |z|^2$$

Das nutzen wir für die Division.

---

## Division — Das Problem

$$\\frac{z_1}{z_2} = \\frac{x_1 + jy_1}{x_2 + jy_2}$$

Das Problem: Im **Nenner** steht ein $j$. Wir wollen aber eine komplexe Zahl in Normalform — also $a + jb$ — und **nicht** $a + jb$ im Nenner!

**Lösung:** Erweitere den Bruch mit dem **konjugierten des Nenners!**

---

## Division — Schritt für Schritt

**Aufgabe:** $\\frac{3 + 4j}{1 - 2j}$

**Schritt 1 — Konjugierten des Nenners bilden:**
$\\overline{1 - 2j} = 1 + 2j$

**Schritt 2 — Bruch erweitern:**
$$\\frac{3 + 4j}{1 - 2j} \\cdot \\frac{1 + 2j}{1 + 2j}$$

**Schritt 3 — Nenner ausrechnen:**
$$(1 - 2j)(1 + 2j) = 1^2 + 2^2 = 1 + 4 = 5$$

Der Nenner ist jetzt **reell!** Das war das Ziel.

**Schritt 4 — Zähler ausrechnen:**
$$(3 + 4j)(1 + 2j) = 3 + 6j + 4j + 8j^2 = 3 + 10j - 8 = -5 + 10j$$

**Schritt 5 — Teilen:**
$$\\frac{-5 + 10j}{5} = -1 + 2j$$

**Fertig!** ✓

---

## Division in Exponentialform

$$\\frac{z_1}{z_2} = \\frac{r_1}{r_2} \\cdot e^{j(\\varphi_1 - \\varphi_2)}$$

**Die Regel:** Beträge **dividieren**, Winkel **subtrahieren!**

**Beispiel:** $\\frac{12 e^{j80°}}{4 e^{j30°}} = 3 e^{j50°}$

---

## 🎯 Übungsaufgaben

**1)** Berechne $\\frac{1 + j}{1 - j}$.
> Erweiterung mit $(1+j)$: Nenner $= 1+1=2$, Zähler $= (1+j)^2 = 2j$
> Ergebnis: $\\frac{2j}{2} = j$

**2)** Berechne $\\frac{4 + 2j}{2 + j}$.
> Erweiterung mit $(2-j)$: Nenner $= 4+1=5$, Zähler $= 8-4j+4j-2j^2 = 10$
> Ergebnis: $\\frac{10}{5} = 2$ (reell!)

**3)** Berechne $\\frac{10 e^{j90°}}{2 e^{j30°}}$.
> Ergebnis: $5 e^{j60°}$

**4)** Zeige: $\\frac{z}{\\bar{z}}$ hat immer Betrag 1.
> $|\\frac{z}{\\bar{z}}| = \\frac{|z|}{|\\bar{z}|} = \\frac{|z|}{|z|} = 1$ ✓

**5)** Berechne $\\frac{2-3j}{4+j}$.
> Erweiterung mit $(4-j)$: Nenner $= 16+1=17$, Zähler $= 8-2j-12j+3j^2 = 5-14j$
> Ergebnis: $\\frac{5}{17} - \\frac{14}{17}j$`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 7: Potenzieren (De Moivre)
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

Für $z = r e^{j\\varphi}$ gilt:

$$z^n = r^n \\cdot e^{jn\\varphi}$$

Oder in trigonometrischer Form:

$$z^n = r^n (\\cos(n\\varphi) + j\\sin(n\\varphi))$$

**Die Regel:** Betrag **potenzieren**, Winkel **vervielfachen!**

Das heißt **Satz von de Moivre** (1707).

---

## Beispiel Schritt für Schritt

**Aufgabe:** Berechne $(1 + j)^4$

**Schritt 1 — In Exponentialform umwandeln:**
$r = \\sqrt{1^2 + 1^2} = \\sqrt{2}$
$\\varphi = 45°$ (Quadrant I)
$z = \\sqrt{2} \\cdot e^{j45°}$

**Schritt 2 — De Moivre anwenden:**
$z^4 = (\\sqrt{2})^4 \\cdot e^{j(4 \\cdot 45°)}$
$= 4 \\cdot e^{j180°}$

**Schritt 3 — Zurück in Normalform:**
$4 e^{j180°} = 4(\\cos 180° + j\\sin 180°) = 4(-1 + 0j) = -4$

**Ergebnis:** $(1+j)^4 = -4$ ✓

---

## Potenzen von $j$ — der Zyklus

Da $j = e^{j90°}$ gilt:

$$j^n = e^{jn \\cdot 90°}$$

| $n$ | $j^n$ | Erklärung |
|-----|-------|-----------|
| 1 | $j$ | $e^{j90°}$ |
| 2 | $-1$ | $e^{j180°}$ |
| 3 | $-j$ | $e^{j270°}$ |
| 4 | $1$ | $e^{j360°}$ |
| 5 | $j$ | Zyklus von 4! |

**Merke:** $j^n$ hängt nur von $n \\mod 4$ ab!

---

## 🎯 Übungsaufgaben

**1)** Berechne $(2e^{j15°})^3$.
> $= 8 e^{j45°}$

**2)** Berechne $j^{17}$.
> $17 \\mod 4 = 1$ → $j^{17} = j$

**3)** Berechne $(1+j)^6$.
> $z = \\sqrt{2} e^{j45°}$ → $z^6 = 8 e^{j270°} = -8j$

**4)** Berechne $(\\sqrt{3} + j)^3$.
> $r = 2$, $\\varphi = 30°$ → $z^3 = 8 e^{j90°} = 8j$

**5)** Zeige: $|z^n| = |z|^n$.
> $|z^n| = |r^n e^{jn\\varphi}| = r^n = |z|^n$ ✓`,
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

---

## Das Besondere

Bei reellen Zahlen hat $\\sqrt{4} = 2$ (eindeutig).

Bei komplexen Zahlen hat **jede Zahl $n$ verschiedene $n$-te Wurzeln!**

---

## Die Formel

Für $z = r e^{j\\varphi}$ sind die $n$-ten Wurzeln:

$$w_k = r^{1/n} \\cdot e^{j \\frac{\\varphi + 2k\\pi}{n}}$$

wobei $k = 0, 1, 2, \\ldots, n-1$

---

## Was bedeutet das geometrisch?

Die $n$ Wurzeln liegen als **gleichmäßiges $n$-Eck** auf einem Kreis mit Radius $r^{1/n}$ um den Ursprung!

- **3 Wurzeln** → gleichseitiges Dreieck
- **4 Wurzeln** → Quadrat
- **5 Wurzeln** → regelmäßiges Fünfeck

---

## Beispiel: Kubikwurzeln von $8$

**Aufgabe:** Berechne $\\sqrt[3]{8}$ (alle 3 Wurzeln)

$8 = 8 e^{j0°}$ (reelle Zahl, also $\\varphi = 0°$)

$r^{1/3} = 8^{1/3} = 2$

**Wurzel $k = 0$:**
$w_0 = 2 e^{j \\frac{0° + 0°}{3}} = 2 e^{j0°} = 2$

**Wurzel $k = 1$:**
$w_1 = 2 e^{j \\frac{0° + 360°}{3}} = 2 e^{j120°} = 2(\\cos 120° + j\\sin 120°) = -1 + 1.732j$

**Wurzel $k = 2$:**
$w_2 = 2 e^{j \\frac{0° + 720°}{3}} = 2 e^{j240°} = 2(\\cos 240° + j\\sin 240°) = -1 - 1.732j$

Die drei Wurzeln bilden ein **gleichseitiges Dreieck** auf einem Kreis mit Radius 2!

---

## Beispiel: Quadratwurzeln von $j$

**Aufgabe:** Berechne $\\sqrt{j}$

$j = 1 \\cdot e^{j90°}$ → $r = 1$, $\\varphi = 90°$

$r^{1/2} = 1$, $n = 2$

**Wurzel $k = 0$:**
$w_0 = e^{j \\frac{90°}{2}} = e^{j45°} = \\frac{\\sqrt{2}}{2} + j\\frac{\\sqrt{2}}{2}$

**Wurzel $k = 1$:**
$w_1 = e^{j \\frac{90° + 360°}{2}} = e^{j225°} = -\\frac{\\sqrt{2}}{2} - j\\frac{\\sqrt{2}}{2}$

**Probe:** $w_0^2 = (e^{j45°})^2 = e^{j90°} = j$ ✓

---

## 🎯 Übungsaufgaben

**1)** Berechne alle 3 Kubikwurzeln von $-8$.
> $-8 = 8e^{j180°}$, Radius $= 2$
> $w_0 = 2e^{j60°} = 1 + 1.732j$
> $w_1 = 2e^{j180°} = -2$
> $w_2 = 2e^{j300°} = 1 - 1.732j$

**2)** Berechne die 4 vierten Wurzeln von $16$.
> $16 = 16e^{j0°}$, Radius $= 2$
> $w_0 = 2$, $w_1 = 2j$, $w_2 = -2$, $w_3 = -2j$ (Quadrat!)

**3)** Berechne $\\sqrt{-1}$ (beide Wurzeln).
> $-1 = e^{j180°}$ → $w_0 = e^{j90°} = j$, $w_1 = e^{j270°} = -j$

**4)** Warum hat $z = 0$ nur eine Wurzel?
> $0^{1/n} = 0$ für alle $n$. Kein Kreis, nur der Ursprung.

**5)** Wie viele $n$-te Wurzeln hat eine komplexe Zahl?
> Immer genau $n$ (Fundamentalsatz der Algebra).`,
    },

    // ══════════════════════════════════════════════════════════════
    // QUIZ
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-quiz",
      title: "Test: Komplexe Zahlen",
      duration: "15 min",
      type: "quiz",
      content: "# Teste dein Wissen!\n\nBeantworte die 10 Fragen. Du brauchst mindestens 80% zum Bestehen.",
    },
  ],

};

// Quiz questions for the complex numbers module
export const complexQuizzes: Record<string, QuizQuestion[]> = {
  "mathe-komplexe-zahlen": [
    {
      question: "Was ist $j^2$?",
      type: "multiple",
      options: ["$1$", "$-1$", "$j$", "$-j$"],
      correct: 1,
      explanation: "Die imaginäre Einheit $j$ ist definiert als $j = \\sqrt{-1}$, also $j^2 = -1$.",
    },
    {
      question: "Was ist der Betrag von $z = 3 + 4j$?",
      type: "multiple",
      options: ["$7$", "$5$", "$25$", "$\\sqrt{7}$"],
      correct: 1,
      explanation: "$|z| = \\sqrt{3^2 + 4^2} = \\sqrt{9+16} = \\sqrt{25} = 5$",
    },
    {
      question: "Was ist das konjugierte von $z = 2 - 5j$?",
      type: "multiple",
      options: ["$-2 + 5j$", "$2 + 5j$", "$-2 - 5j$", "$5 - 2j$"],
      correct: 1,
      explanation: "Konjugiertes: Vorzeichen des Imaginärteils umkehren. $\\bar{z} = 2 + 5j$",
    },
    {
      question: "In welchem Quadrant liegt $z = -3 + 2j$?",
      type: "multiple",
      options: ["I", "II", "III", "IV"],
      correct: 1,
      explanation: "$x = -3 < 0$ und $y = 2 > 0$ → Quadrant II (links oben)",
    },
    {
      question: "Was ist $(1 + j) + (2 - 3j)$?",
      type: "multiple",
      options: ["$3 - 2j$", "$3 + 2j$", "$-1 - 2j$", "$3 - 4j$"],
      correct: 0,
      explanation: "Realteile: $1+2=3$, Imaginärteile: $1+(-3)=-2$. Ergebnis: $3 - 2j$",
    },
    {
      question: "Was ist $(2e^{j30°}) \\cdot (3e^{j60°})$?",
      type: "multiple",
      options: ["$6e^{j90°}$", "$5e^{j90°}$", "$6e^{j180°}$", "$e^{j90°}$"],
      correct: 0,
      explanation: "Beträge: $2 \\cdot 3 = 6$, Winkel: $30° + 60° = 90°$. Ergebnis: $6e^{j90°}$",
    },
    {
      question: "Wie viele $n$-te Wurzeln hat eine komplexe Zahl $z \\neq 0$?",
      type: "multiple",
      options: ["$1$", "$2$", "$n$", "$n-1$"],
      correct: 2,
      explanation: "Jede komplexe Zahl $z \\neq 0$ hat genau $n$ verschiedene $n$-te Wurzeln.",
    },
    {
      question: "Was ist $j^4$?",
      type: "multiple",
      options: ["$j$", "$-1$", "$-j$", "$1$"],
      correct: 3,
      explanation: "$j^4 = j^2 \\cdot j^2 = (-1)(-1) = 1$. Die Potenzen von $j$ haben Periode 4.",
    },
    {
      question: "Was ist $z \\cdot \\bar{z}$ für $z = 3 + 4j$?",
      type: "multiple",
      options: ["$25$", "$7$", "$0$", "$5$"],
      correct: 0,
      explanation: "$z \\cdot \\bar{z} = |z|^2 = 3^2 + 4^2 = 9 + 16 = 25$",
    },
    {
      question: "Was ist das Ergebnis von $\\frac{6e^{j90°}}{2e^{j30°}}$?",
      type: "multiple",
      options: ["$3e^{j60°}$", "$3e^{j120°}$", "$12e^{j60°}$", "$3e^{j30°}$"],
      correct: 0,
      explanation: "Beträge: $6/2 = 3$, Winkel: $90° - 30° = 60°$. Ergebnis: $3e^{j60°}$",
    },
  ],
};
