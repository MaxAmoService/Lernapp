import { Module } from "./types";

export const javascriptModule: Module = {
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
};
