#!/usr/bin/env python3
import re

with open('lib/mathData.ts', 'r') as f:
    content = f.read()

# Merkblätter für jedes Modul
replacements = [
    # Grenzwerte
    ('slug: "mathe1-grenzwerte",\n    title: "Grenzwerte",',
     'slug: "mathe1-grenzwerte",\n    title: "Grenzwerte",\n    merkblatt: "## 📋 Merkblatt: Grenzwerte\\n\\n### Wichtige Grenzwerte\\n- lim (x→0) sin(x)/x = 1\\n- lim (x→∞) (1+1/x)^x = e\\n- lim (x→0) (e^x-1)/x = 1\\n\\n### L\'Hôpital\\nBei 0/0 oder ∞/∞: lim f/g = lim f\'/g\'",'),
    
    # Ableitungen
    ('slug: "mathe1-ableitungen",\n    title: "Differentialrechnung",',
     'slug: "mathe1-ableitungen",\n    title: "Differentialrechnung",\n    merkblatt: "## 📋 Merkblatt: Differentialrechnung\\n\\n### Grundregeln\\n- (x^n)\' = n·x^(n-1)\\n- (e^x)\' = e^x\\n- (sin x)\' = cos x\\n- (cos x)\' = -sin x\\n- (ln x)\' = 1/x\\n\\n### Regeln\\n- Kettenregel: (f(g(x)))\' = f\'(g(x))·g\'(x)\\n- Produktregel: (f·g)\' = f\'g + fg\'\\n- Quotient: (f/g)\' = (f\'g - fg\')/g²",'),
    
    # Integration
    ('slug: "mathe1-integration",\n    title: "Integralrechnung",',
     'slug: "mathe1-integration",\n    title: "Integralrechnung",\n    merkblatt: "## 📋 Merkblatt: Integralrechnung\\n\\n### Stammfunktionen\\n- ∫x^n dx = x^(n+1)/(n+1)\\n- ∫1/x dx = ln|x|\\n- ∫e^x dx = e^x\\n- ∫sin x dx = -cos x\\n- ∫cos x dx = sin x\\n\\n### Hauptsatz\\n∫_a^b f(x)dx = F(b) - F(a)",'),
    
    # Reihen
    ('slug: "mathe1-reihen",\n    title: "Reihen & Potenzreihen",',
     'slug: "mathe1-reihen",\n    title: "Reihen & Potenzreihen",\n    merkblatt: "## 📋 Merkblatt: Reihen\\n\\n### Konvergenz (Quotientenkriterium)\\nlim |a(n+1)/a(n)| = q\\n- q < 1: konvergent\\n- q > 1: divergent\\n\\n### Wichtige Reihen\\n- e^x = Σ x^n/n!\\n- sin x = Σ (-1)^n x^(2n+1)/(2n+1)!\\n- cos x = Σ (-1)^n x^(2n)/(2n)!",'),
    
    # Vektoren
    ('slug: "mathe2-vektoren",\n    title: "Vektoren & Lineare Algebra",',
     'slug: "mathe2-vektoren",\n    title: "Vektoren & Lineare Algebra",\n    merkblatt: "## 📋 Merkblatt: Vektoren\\n\\n### Skalarprodukt\\n- a·b = |a||b|cos(α) = a1b1 + a2b2 + a3b3\\n- Orthogonal: a·b = 0\\n- Parallel: a = λb\\n\\n### Kreuzprodukt\\n|a × b| = |a||b|sin(α)\\nRichtung: rechtwinklig zu a und b",'),
    
    # DGL
    ('slug: "mathe2-dgl",\n    title: "Differentialgleichungen",',
     'slug: "mathe2-dgl",\n    title: "Differentialgleichungen",\n    merkblatt: "## 📋 Merkblatt: Differentialgleichungen\\n\\n### Homogene DGL 2. Ordnung\\nay\'\' + by\' + cy = 0\\nCharakteristisch: ar² + br + c = 0\\n\\n### Lösungen\\n- 2 reelle: y = C1·e^(r1·x) + C2·e^(r2·x)\\n- Doppelte: y = (C1 + C2·x)·e^(rx)\\n- Komplexe: y = e^(αx)(C1·cos(βx) + C2·sin(βx))",'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open('lib/mathData.ts', 'w') as f:
    f.write(content)

print("Merkblätter hinzugefügt!")
