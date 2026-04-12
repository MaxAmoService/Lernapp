#!/usr/bin/env python3
import re

with open('lib/mathData.ts', 'r') as f:
    content = f.read()

# Entferne Merkblatt-Blöcke aus Lektionen (zwischen ## Merkblatt: ... und ---)
# Pattern: von ## Merkblatt: bis zur --- Trennlinie
pattern = r'\n## Merkblatt:.*?\n---\n'

content = re.sub(pattern, '\n---\n', content, flags=re.DOTALL)

with open('lib/mathData.ts', 'w') as f:
    f.write(content)

print("Merkblätter aus Lektionen entfernt!")
