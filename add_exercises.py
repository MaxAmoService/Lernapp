#!/usr/bin/env python3
"""Füge Aufgaben-Lektionen zu allen Mathe-Modulen hinzu"""

with open("lib/mathData.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Module IDs und ihre exercises-Lektionen
modules = [
    "m-grundlagen-mengen",
    "m-grundlagen-funktionen",
    "m1-grenzwerte",
    "m1-ableitungen",
    "m1-integration",
    "m1-reihen",
    "m2-vektoren",
    "m2-dgl",
]

for module_id in modules:
    # Suche nach dem Ende des Moduls (vor dem nächsten Modul oder Ende)
    search_start = content.find(f'id: "{module_id}"')
    if search_start == -1:
        print(f"⚠️ {module_id} nicht gefunden")
        continue
    
    # Finde das nächste Modul
    next_module = content.find('id: "m-', search_start + 10)
    if next_module == -1:
        next_module = len(content)
    
    # Finde die letzte } vor dem nächsten Modul (Ende des aktuellen Moduls)
    module_section = content[search_start:next_module]
    
    # Finde das letzte ], (Ende des lessons Arrays)
    last_bracket = module_section.rfind("],")
    if last_bracket == -1:
        print(f"⚠️ Kein ] gefunden für {module_id}")
        continue
    
    # Prüfe ob bereits exercises existieren
    if f'id: "{module_id}-aufgaben"' in module_section:
        print(f"⏭️ {module_id} hat bereits Aufgaben")
        continue
    
    # Füge die exercises-Lektion ein
    exercises_lesson = '''      {
        id: "''' + module_id + '''-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    '''
    
    absolute_pos = search_start + last_bracket
    content = content[:absolute_pos] + exercises_lesson + content[absolute_pos:]
    
    print(f"✅ {module_id}: Aufgaben-Lektion hinzugefügt")

with open("lib/mathData.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("\n🎉 Fertig!")
