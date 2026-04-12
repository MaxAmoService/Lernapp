#!/usr/bin/env python3

with open('lib/mathData.ts', 'r') as f:
    content = f.read()

# Grenzwerte
old_grenz = 'merkblatt: "## 📋 Merkblatt: Grenzwerte\\n\\n### Wichtige Grenzwerte\\n- lim (x→0) sin(x)/x = 1\\n- lim (x→∞) (1+1/x)^x = e\\n- lim (x→0) (e^x-1)/x = 1\\n\\nL\'Hôpital\\nBei 0/0 oder ∞/∞: lim f/g = lim f\'/g\'"'
new_grenz = '''merkblatt: `## 📋 Merkblatt: Grenzwerte

### 🎯 Wichtige Grenzwerte

| Grenzwert | Wert |
|-----------|------|
| $\\\\lim_{x \\\\to 0} \\\\frac{\\\\sin x}{x}$ | $1$ |
| $\\\\lim_{x \\\\to 0} \\\\frac{1 - \\\\cos x}{x}$ | $0$ |
| $\\\\lim_{x \\\\to \\\\infty} (1 + \\\\frac{1}{x})^x$ | $e$ |
| $\\\\lim_{x \\\\to 0} \\\\frac{e^x - 1}{x}$ | $1$ |
| $\\\\lim_{x \\\\to 0} \\\\frac{\\\\ln(1+x)}{x}$ | $1$ |

### 📐 L'Hôpital'sche Regel

Bei $\\\\frac{0}{0}$ oder $\\\\frac{\\\\infty}{\\\\infty}$:

$$\\\\lim_{x \\\\to a} \\\\frac{f(x)}{g(x)} = \\\\lim_{x \\\\to a} \\\\frac{f'(x)}{g'(x)}$$

### 💡 Merke
- Immer **L'Hôpital** versuchen bei $\\\\frac{0}{0}$
- Grenzwerte können $\\\\pm\\\\infty$ sein
- **Squeeze Theorem:** $f(x) \\\\leq g(x) \\\\leq h(x)$ und $\\\\lim f = \\\\lim h \\\\Rightarrow \\\\lim g = \\\\lim f`'''

content = content.replace(old_grenz, new_grenz)

with open('lib/mathData.ts', 'w') as f:
    f.write(content)

print("Grenzwerte Merkblatt aktualisiert!")
