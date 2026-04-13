#!/usr/bin/env python3
"""Füge Aufgaben-Lektionen zu allen Mathe-Modulen hinzu"""

# Lese die Datei
with open("lib/mathData.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Mapping: Modul-ID -> Lektionen-IDs für Aufgaben
exercises_map = {
    "m-grundlagen-mengen": ["mg1", "mg2", "mg3"],
    "m-grundlagen-funktionen": ["mf1", "mf2", "mf3"],
    "m1-grenzwerte": ["m1-grenzwerte", "m1g1", "m1g2", "m1g3"],
    "m1-ableitungen": ["m1-ableitungen", "m1a1", "m1a2", "m1a3"],
    "m1-integration": ["m1-integration", "m1i1", "m1i2", "m1i3"],
    "m1-reihen": ["m1-reihen", "m1r1", "m1r2", "m1r3"],
    "m2-vektoren": ["m2-vektoren", "m2v1", "m2v2", "m2v3"],
    "m2-dgl": ["m2-dgl", "m2d1", "m2d2", "m2d3"],
}

# Für jedes Modul: Füge Aufgaben-Lektion vor dem schließenden } des lessons-Arrays ein
for module_id in exercises_map.keys():
    # Suche nach dem Modul und der letzten Lektion
    search_pattern = 'id: "' + module_id + '"'
    
    # Finde die Position des Moduls
    module_start = content.find(search_pattern)
    if module_start == -1:
        print(f"⚠️ Modul {module_id} nicht gefunden")
        continue
    
    # Finde das nächste Modul oder Ende
    next_module = content.find('id: "m-', module_start + len(search_pattern))
    if next_module == -1:
        next_module = len(content)
    
    module_section = content[module_start:next_module]
    
    # Prüfe ob bereits eine exercises-Lektion existiert
    if 'type: "exercises"' in module_section:
        print(f"⏭️ {module_id} hat bereits Aufgaben")
        continue
    
    # Finde das letzte ], im lessons Array (vor dem }, das das Modul beendet)
    # Suche rückwärts von der Modulgrenze
    temp_section = content[module_start:next_module]
    
    # Finde alle "]," Positionen und nimm die letzte (Ende des lessons Arrays)
    last_bracket = -1
    pos = 0
    while True:
        pos = temp_section.find("],", pos)
        if pos == -1:
            break
        last_bracket = pos
        pos += 2
    
    if last_bracket == -1:
        print(f"⚠️ Kein ] gefunden für {module_id}")
        continue
    
    # Füge die Aufgaben-Lektion ein
    exercises_lesson = '''
      {
        id: "''' + module_id + '''-aufgaben",
        title: "📝 Aufgaben",
        duration: "15 min",
        type: "exercises",
        content: "Übe das Gelernte mit interaktiven Aufgaben!",
      },
    '''
    
    absolute_pos = module_start + last_bracket
    content = content[:absolute_pos] + exercises_lesson + content[absolute_pos:]
    
    # Aktualisiere next_module Position
    next_module += len(exercises_lesson)
    
    print(f"✅ {module_id}: Aufgaben-Lektion hinzugefügt")

# Schreibe die Datei zurück
with open("lib/mathData.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("\n🎉 Fertig!")
