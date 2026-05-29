import { Module } from "./types";

// ============================================================================
// IHK "UX & Interaction Design" — Modul-Daten
// Quelle: IHK IT-Handbuch + Moritz' Mitschriften
// ============================================================================

export const uxModule: Module = {
  id: "ihk-ux",
  slug: "ihk-ux",
  title: "UX & Interaction Design",
  description: "IHK IT-Handbuch: Nielsen-Heuristiken, Personas, User Stories, Design Sprint, Prototyping, Usability-Tests, Anforderungsarten",
  icon: "🎨",
  color: "#EC4899",
  category: "ihk",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: UX & Interaction Design (IHK)

### Nielsens 10 Usability-Heuristiken
1. Sichtbarkeit des Systemstatus
2. Übereinstimmung mit der realen Welt
3. Kontrolle und Freiheit des Nutzers
4. Konsistenz und Standards
5. Fehlervermeidung
6. Wiedererkennen statt Erinnern
7. Flexibilität und Effizienz
8. Ästhetisches und minimalistisches Design
9. Fehler erkennen, diagnostizieren und beheben
10. Hilfe und Dokumentation

### Persona
- Fiktiver Nutzer, repräsentativ für eine Zielgruppe
- Hilft bei der Produktgestaltung
- Enthält: Name, Alter, Beruf, Ziele, Probleme, Kontext

### User Story
- Format: "Als [Rolle] möchte ich [Ziel], um [Nutzen]"
- Beschreibt Funktion aus Nutzersicht

### Anforderungsarten
- **Funktional:** Konkrete Funktionen
- **Nicht-funktional:** Performance, Sicherheit, Usability
- **Technisch:** Technische Voraussetzungen
- **Regulatorisch:** Gesetze, Normen, Richtlinien

### Design Sprint (Google)
1. Understand — Problem verstehen
2. Diverge — Ideen sammeln
3. Converge — Ideen auswählen
4. Prototype — Prototyp bauen
5. Test — Mit Nutzern testen

### Evaluation
- Safety — Schutz vor ungewollten Aktionen
- Learnability — Wie einfach zu erlernen?
- Memorability — Wie gut wiederzuerkennen?`,

  lessons: [
    // --- Lektion 1: Was ist UX? ---
    {
      id: "ux-1",
      title: "Was ist User Experience (UX)?",
      duration: "10 min",
      type: "text",
      content: `## User Experience — Mehr als nur "schön"

**User Experience (UX)** beschreibt das **gesamte Erlebnis** eines Nutzers mit einem Produkt — nicht nur wie es aussieht, sondern wie es sich anfühlt, funktioniert und ob es Spaß macht.

---

## 🎯 UX vs. UI

| | UX (User Experience) | UI (User Interface) |
|---|---|---|
| **Fokus** | Gesamterlebnis | Visuelles Design |
| **Fragen** | Ist es nützlich? Intuitiv? Spaßig? | Ist es schön? Konsistent? |
| **Methoden** | Research, Testing, Personas | Farben, Typografie, Layout |
| **Ziel** | Zufriedenheit | Ästhetik |

> 💡 **Merke:** Gute UI ohne gute UX = schönes Produkt, das niemand benutzen will. Gute UX ohne gute UI = funktionales Produkt, das niemand benutzen möchte.

---

## 📊 Warum UX wichtig ist

- 💰 **Kosten senken:** Weniger Support-Anfragen
- 📈 **Conversion steigern:** Nutzer bleiben länger
- 😊 **Zufriedenheit:** Nutzer kommen zurück
- 🏆 **Wettbewerbsvorteil:** Besseres Produkt

---

## 🧩 Die Dimensionen der Interaktion

| Dimension | Beschreibung | Beispiel |
|-----------|-------------|----------|
| 👆 **Taktil** | Physische Interaktion | Knöpfe, Joystick, Touch |
| 👁️ **Visuell** | Was der Nutzer sieht | Bildschirme, Animationen |
| 🔊 **Auditiv** | Was der Nutzer hört | Töne, Musik, Sprache |
| 📳 **Haptisch** | Was der Nutzer fühlt | Vibration, Widerstand |

---

## 🎮 Micro-Interactions

Kleine, subtile Interaktionen, die das Erlebnis verbessern:

- 🖱️ **Hover-Effekte** — Button ändert Farbe beim Darüberfahren
- 📳 **Haptisches Feedback** — Vibration bei Tastendruck
- 🔊 **Audio-Feedback** — Klick-Geräusch
- ✨ **Animationen** — Ladebalken, Übergänge

> 💡 **Merke:** Micro-Interactions geben dem Nutzer **Feedback** — er weiß, dass das System seine Aktion registriert hat.

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was ist der Unterschied zwischen UX und UI?" — UX = gesamtes Erlebnis (nützlich, intuitiv, Spaßig). UI = visuelles Design (schön, konsistent). UX ist das Dach, UI ist ein Teil davon.`
    },

    // --- Lektion 2: Nielsens Heuristiken ---
    {
      id: "ux-2",
      title: "Nielsens Usability-Heuristiken",
      duration: "20 min",
      type: "interactive",
      interactive: "heuristicEvaluator",
      content: `## Nielsens 10 Usability-Heuristiken

Jakob Nielsens 10 Heuristiken sind die **wichtigsten Regeln** für gutes Interface-Design. Sie sind **prüfungsrelevant** und sollten beim Programmierprojekt angewendet werden!

---

## 1️⃣ Sichtbarkeit des Systemstatus

> Das System hält den Nutzer **immer** über den aktuellen Stand informiert.

**Gut:** Fortschrittsbalken beim Download
**Schlecht:** Download ohne Anzeige — "Lädt es noch?"

---

## 2️⃣ Übereinstimmung mit der realen Welt

> Das System spricht die **Sprache des Nutzers**, nicht die des Systems.

**Gut:** 🗑️ Papierkorb-Symbol auf dem Desktop
**Schlecht:** 💾 Diskette als "Speichern" für junge Generationen

---

## 3️⃣ Kontrolle und Freiheit des Nutzers

> Nutzer brauchen einen **"Notfall-Exit"** — unerwünschte Aktionen rückgängig machen.

**Gut:** Strg+Z zum Rückgängig machen
**Schlecht:** Kreuz bei Werbeanzeigen, das nicht funktioniert

---

## 4️⃣ Konsistenz und Standards

> Gleiches sollte **gleich aussehen** und **gleich funktionieren**.

**Gut:** Kamera-Icon immer oben rechts auf dem Smartphone
**Schlecht:** Taschenlampen-Funktion per Doppelklick Seitentaste (Android)

---

## 5️⃣ Fehlervermeidung

> **Verhindere** Fehler, bevor sie passieren — nicht nur Fehlermeldungen zeigen.

**Gut:** "Betreff fehlt!" beim E-Mail-Versand
**Schlecht:** Spielstand nur manuell speichern (Datenverlust möglich)

---

## 6️⃣ Wiedererkennen statt Erinnern

> Mache **Optionen sichtbar** — der Nutzer soll nicht raten müssen.

**Gut:** Pokémon-Kampf-Oberfläche mit sichtbaren Aktionen
**Schlecht:** SAP-Text ohne Kontext — "Was war nochmal F4?"

---

## 7️⃣ Flexibilität und Effizienz der Nutzung

> Anfänger UND Experten sollten das System effizient nutzen können.

**Gut:** GitLab mit Klickibunti UND Console
**Schlecht:** Altes SAP — nur Shortcuts, keine Maus-Alternative

---

## 8️⃣ Ästhetisches und minimalistisches Design

> Jede Information auf dem Screen sollte **relevant** sein — nichts überflüssiges.

**Gut:** Fire-TV Fernbedienung — nur nötige Knöpfe
**Schlecht:** Ali Express — überladene Oberfläche

---

## 9️⃣ Nutzer bei Fehlern unterstützen

> Fehlermeldungen sollten **verständlich** sein und einen **Lösungsweg** zeigen.

**Gut:** "Datei nicht gefunden. Prüfe den Pfad: /documents/"
**Schlecht:** "Error 0x80070005" — ohne Kontext

---

## 🔟 Hilfe und Dokumentation

> Im Idealfall braucht der Nutzer keine Hilfe. Falls doch, sollte sie **leicht zu finden** sein.

**Gut:** \`git help\` — sofortige Kontexthilfe
**Schlecht:** Schulung nötig für einfache Funktionen (Vplan)

---

## 🔨 Heuristiken anwenden

[INTERACTIVE]

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Nennen Sie 5 von Nielsens 10 Heuristiken mit Beispiel!" — Die Heuristiken müssen nicht in dieser Reihenfolge genannt werden, aber mit konkreten Beispielen.`
    },

    // --- Lektion 3: Personas & Szenarien ---
    {
      id: "ux-3",
      title: "Personas & Szenarien",
      duration: "12 min",
      type: "text",
      content: `## Personas — Den Nutzer verstehen

Eine **Persona** ist ein fiktiver Nutzer, der **repräsentativ** für eine Zielgruppe steht. Sie hilft uns, uns in den Nutzer hineinzuversetzen.

---

## 🧑 Was ist eine Persona?

> Stell dir vor, du entwickelst eine App für Ausbilder. Statt "irgendein Nutzer" denkst du an **Marie, 29, frisch im Beruf, ärgert sich über VPLAN**.

### Bestandteile einer Persona

| Element | Beschreibung | Beispiel |
|---------|-------------|----------|
| 📷 **Name & Foto** | Persönlichkeitsgefühl | Marie Hoffmann, 29 |
| 💼 **Beruf** | Kontext | Ausbilderin |
| 🎯 **Ziele** | Was will sie erreichen? | Effizient arbeiten, weniger Fehler |
| 😤 **Probleme** | Was frustriert sie? | Lange Ladezeiten, unintuitive UI |
| 🏆 **Motivation** | Warum nutzt sie das Produkt? | Bessere Arbeitsqualität |

---

## 📖 Szenarien

Ein **Szenario** beschreibt eine **konkrete Situation**, in der eine Persona das Produkt nutzt:

> **Marie** sitzt am Montagmorgen vor dem PC. Sie muss die Ausbildungsnachweise von 15 Azubis prüfen. Sie öffnet VPLAN, wartet 30 Sekunden auf die Ladeseite...

### Elemente eines Szenarios
1. **Kontext:** Wo? Wann? Warum?
2. **Ziel:** Was will die Persona erreichen?
3. **Schritte:** Welche Aktionen führt sie durch?
4. **Ergebnis:** Was ist das gewünschte Ergebnis?

---

## 📝 User Stories

Eine **User Story** beschreibt eine Funktion aus der Sicht des Nutzers:

### Format
\`\`\`
Als [Rolle] möchte ich [Ziel], um [Nutzen].
\`\`\`

### Beispiele
\`\`\`
Als Ausbilder möchte ich Ausbildungsnachweise online prüfen,
um Papier zu sparen und schneller zu arbeiten.

Als Azubi möchte ich meinen Fortschritt sehen,
um motiviert zu bleiben.

Als Admin möchte ich Benutzerrechte verwalten,
um die Sicherheit zu gewährleisten.
\`\`\`

> 💡 **Merke:** User Stories beschreiben WAS der Nutzer will, nicht WIE es technisch umgesetzt wird.

---

## 🔍 Nutzer evaluieren — Ideen testen

| Methode | Beschreibung | Wann? |
|---------|-------------|-------|
| 🧪 **Usability-Test** | Nutzer führen Aufgaben aus, Beobachtung | Früh & oft |
| 🎤 **Interview** | Offene Fragen zu Erwartungen | Vor der Entwicklung |
| 🔀 **A/B-Test** | Zwei Varianten vergleichen | Nach dem Launch |
| 🖼️ **Prototyping** | Klickbare Mockups testen | Vor der Implementierung |

### Dabei beachten
- ✅ Repräsentative Nutzer auswählen
- ✅ Vorher klare Ziele definieren
- ✅ Neutral bleiben (nicht beeinflussen!)
- ✅ Ergebnisse dokumentieren und umsetzen

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was ist eine Persona und wozu braucht man sie?" — Fiktiver Nutzer für eine Zielgruppe, hilft bei der Produktgestaltung, da man sich besser in den Nutzer hineinversetzen kann.`
    },

    // --- Lektion 4: Design Sprint ---
    {
      id: "ux-4",
      title: "Der Design Sprint (Google)",
      duration: "15 min",
      type: "text",
      content: `## Der Design Sprint — Von der Idee zum Prototyp in 5 Tagen

Der **Design Sprint** von Google Ventures ist eine strukturierte Methode, um in **5 Tagen** von einem Problem zu einem getesteten Prototyp zu kommen.

---

## 📅 Die 5 Phasen

| Tag | Phase | Ziel |
|-----|-------|------|
| 1️⃣ | **Understand** | Problem verstehen |
| 2️⃣ | **Diverge** | Ideen sammeln (kreativ!) |
| 3️⃣ | **Converge** | Ideen auswählen |
| 4️⃣ | **Prototype** | Prototyp bauen |
| 5️⃣ | **Test** | Mit echten Nutzern testen |

---

## 1️⃣ Understand — Problem verstehen

- 🎯 **Was ist das Problem?** Für wen lösen wir es?
- 👥 **Stakeholder** einbeziehen
- 📊 **Daten** analysieren
- 🗺️ **User Journey** kartieren

> 💡 **Fragen:** Wer sind die Nutzer? Was sind ihre Probleme? Was haben sie schon probiert?

---

## 2️⃣ Diverge — Ideen sammeln

- 🧠 **Brainstorming** — Keine Kritik, alles erlaubt!
- ✏️ **Sketching** — Ideen auf Papier bringen
- 🔄 **Crazy 8s** — 8 Varianten in 8 Minuten
- 📋 **Storyboarding** — Ablauf visualisieren

> ⚠️ **Regel:** In dieser Phase gilt KEINE Kritik! Alle Ideen sind willkommen.

---

## 3️⃣ Converge — Ideen auswählen

- 🗳️ **Abstimmung** — Jeder hat Stimmen
- 📊 **Priorisierung** — Machbarkeit × Impact
- 🎯 **Entscheidung** — Team einigt sich auf eine Richtung

---

## 4️⃣ Prototype — Prototyp bauen

- 🖼️ **Low-Fidelity:** Papier, Stift, Post-its
- 💻 **High-Fidelity:** Figma, Sketch, Adobe XD
- ⚡ **Schnell** — Lieber schnell als perfekt
- 🎯 **Fokussiert** — Nur die Kernfunktionen

---

## 5️⃣ Test — Mit Nutzern testen

- 👥 **5 Nutzer** reichen für 80% der Probleme
- 📝 **Beobachten** — Nicht helfen!
- 🎤 **Laut denken** — Nutzer soll erklären, was er tut
- 📊 **Dokumentieren** — Probleme aufschreiben

---

## 🎨 Low-Fidelity Prototyping

Schnelle, billige Prototypen auf Papier:

### Vorteile
- ⚡ Schnell (Minuten statt Stunden)
- 💰 Kostenlos
- 🔄 Einfach zu ändern
- 🎯 Fokus auf Funktion, nicht auf Design

### Nachteile
- ❌ Nicht klickbar
- ❌ Schwer zu testen
- ❌ Wirkt "unprofessionell"

---

## 💡 Praxis-Beispiel: Trinkwasser-App

**Problem:** "Ich trinke zu wenig Wasser am Tag."

### Design Sprint Phasen
1. **Understand:** Warum trinken Menschen zu wenig? Vergessen, keine Erinnerung, kein Überblick.
2. **Diverge:** Erinnerungs-App, Gamification, Smartwatch-Integration, soziale Challenge.
3. **Converge:** Erinnerungs-App mit Gamification (einfachste Lösung).
4. **Prototype:** Figma-Mockup mit Timer und Belohnungssystem.
5. **Test:** 5 Nutzer testen die App — "Würdest du das täglich nutzen?"

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Beschreiben Sie den Design Sprint!" — 5 Phasen: Understand, Diverge, Converge, Prototype, Test. Ziel: In 5 Tagen vom Problem zum getesteten Prototyp.`
    },

    // --- Lektion 5: Anforderungsarten ---
    {
      id: "ux-5",
      title: "Anforderungsarten",
      duration: "12 min",
      type: "text",
      content: `## Anforderungsarten — Was braucht das System?

In der Softwareentwicklung gibt es **verschiedene Arten von Anforderungen**. Die IHK prüft, ob du sie unterscheiden kannst!

---

## 📋 Die 5 Anforderungsarten

### 1️⃣ Funktionale Anforderungen

> **Was** soll das System tun?

- Konkrete Funktionen und Features
- Beispiel: "Das System soll PDF-Export unterstützen"

### 2️⃣ Nicht-funktionale Anforderungen

> **Wie gut** soll das System es tun?

- Qualitätsmerkmale und Rahmenbedingungen
- Beispiel: "Die Seite muss in unter 2 Sekunden laden"

| Kategorie | Beispiel |
|-----------|----------|
| **Performance** | Antwortzeit < 200ms |
| **Sicherheit** | HTTPS, Passwort-Hashing |
| **Usability** | Barrierefrei (WCAG 2.1) |
| **Skalierbarkeit** | 10.000 gleichzeitige Nutzer |
| **Verfügbarkeit** | 99,9% Uptime |

### 3️⃣ Technische Anforderungen

> **Welche Technik** wird benötigt?

- Technische Voraussetzungen und Einschränkungen
- Beispiel: "Die Anwendung muss auf Linux laufen"

### 4️⃣ Regulatorische Anforderungen

> **Welche Regeln** müssen eingehalten werden?

- Gesetze, Normen, Richtlinien
- Beispiel: "DSGVO-konforme Datenverarbeitung"

### 5️⃣ Benutzeranforderungen

> **Was braucht der Nutzer?**

- Bedürfnisse und Erwartungen des Endnutzers
- Beispiel: "Die App muss auch ohne Internet funktionieren"

---

## ⚔️ Vergleich

| Art | Frage | Beispiel |
|-----|-------|----------|
| **Funktional** | WAS? | PDF-Export, Login, Suche |
| **Nicht-funktional** | WIE GUT? | Schnell, sicher, barrierefrei |
| **Technisch** | WELCHE TECHNIK? | Linux, PostgreSQL, REST API |
| **Regulatorisch** | WELCHE REGELN? | DSGVO, ISO 27001 |
| **Benutzer** | WAS BRAUCHT DER NUTZER? | Offline-Modus, Dark Mode |

---

## 📝 Requirements Engineering

Der Prozess der Anforderungserhebung:

1. **Elicitation** — Anforderungen erheben (Interviews, Workshops)
2. **Documentation** — Aufschreiben (Lastenheft, Pflichtenheft)
3. **Validation** — Prüfen (Ist es vollständig? Widerspruchsfrei?)
4. **Management** — Änderungen verwalten

> 💡 **Merke:** Anforderungen sind NICHT statisch — sie ändern sich im Laufe des Projekts!

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Nennen Sie die verschiedenen Anforderungsarten!" — Funktional, nicht-funktional, technisch, regulatorisch, Benutzeranforderungen. Erkläre den Unterschied mit je einem Beispiel.`
    },

    // --- Lektion 6: Evaluation ---
    {
      id: "ux-6",
      title: "Usability-Evaluation",
      duration: "12 min",
      type: "text",
      content: `## Usability-Evaluation — Ist das Produkt gut?

**Evaluation** bedeutet die **systematische Bewertung** eines Produkts. Ziel ist herauszufinden, ob das Produkt die Nutzerbedürfnisse erfüllt.

---

## 🎯 Die drei Evaluationsziele

### 🛡️ Safety (Sicherheit)

> Schützt das System den Nutzer vor ungewollten Aktionen?

- Gibt es eine **Bestätigung** bei kritischen Aktionen?
- Gibt es einen **Rückgängig**-Mechanismus?
- Beispiel: "Möchtest du wirklich ALLE Daten löschen?"

### 📚 Learnability (Erlernbarkeit)

> Wie einfach ist es, das System zu erlernen?

- Ist die **Navigation intuitiv**?
- Braucht der Nutzer eine **Schulung**?
- Beispiel: Ein Kind sollte die Grundfunktionen verstehen können.

### 🧠 Memorability (Wiedererkennbarkeit)

> Kann der Nutzer das System nach einer Pause wieder verwenden?

- Sind **Funktionen sichtbar**?
- Gibt es **konsistente** Bedienelemente?
- Beispiel: Auch nach 6 Monaten Pause weiß man, wo der Speicher-Button ist.

---

## 🔍 Evaluationstechniken

### Experten-basiert
| Methode | Beschreibung |
|---------|-------------|
| 📋 **Heuristische Evaluation** | Experten prüfen gegen Nielsens Heuristiken |
| 📝 **Cognitive Walkthrough** | Experte geht Schritt für Schritt durch |
| 🎯 **Guidelines Review** | Prüfung gegen Design-Guidelines |

### Nutzer-basiert
| Methode | Beschreibung |
|---------|-------------|
| 🧪 **Usability-Test** | Nutzer führt Aufgaben aus, Beobachtung |
| 🎤 **Thinking Aloud** | Nutzer kommentiert sein Handeln |
| 📊 **A/B-Test** | Zwei Varianten vergleichen |
| 📝 **Fragebogen** | SUS (System Usability Scale) |

---

## 📊 Usability-Test durchführen

### Vorbereitung
1. **Ziele definieren:** Was will ich testen?
2. **Aufgaben formulieren:** "Bestelle eine Pizza"
3. **Nutzer rekrutieren:** Repräsentativ für Zielgruppe
4. **Umgebung vorbereiten:** Ruhig, ohne Ablenkung

### Durchführung
1. **Begrüßen** und Situation erklären
2. **Aufgaben stellen** — NICHT helfen!
3. **Beobachten** und Notizen machen
4. **Thinking Aloud** — Nutzer soll laut denken
5. **Abschlussinterview:** "Was hat gefallen? Was nicht?"

### Auswertung
1. **Probleme kategorisieren**
2. **Schweregrad** bewerten (Kritisch/Mittel/Gering)
3. **Lösungen** vorschlagen
4. **Bericht** schreiben

---

## 📋 Usability-Fragen (Goals → Questions)

| Goal | Frage |
|------|-------|
| **Safety** | Wie schützt das System vor ungewollten Aktionen? |
| **Learnability** | Wie einfach sind die Funktionen zu verstehen? |
| **Memorability** | Wie gut kann man sich nach Pause erinnern? |

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was ist der Unterschied zwischen Safety, Learnability und Memorability?" — Safety = Schutz vor Fehlern. Learnability = einfach zu erlernen. Memorability = gut wiederzuerkennen.`
    },

    // --- Lektion 7: Quiz ---
    {
      id: "ux-7",
      title: "Wissenstest: UX & Interaction Design",
      duration: "15 min",
      type: "quiz",
      content: `## 🎯 Quiz: UX & Interaction Design

Teste dein Wissen über UX und Interaction Design!`,
    },
  ],
};

// ─── Quizfragen ─────────────────────────────────────────────────────────────

export const uxQuizQuestions = [
  {
    question: "Was beschreibt User Experience (UX)?",
    type: "multiple" as const,
    options: [
      "Nur das visuelle Design einer Anwendung",
      "Das gesamte Erlebnis eines Nutzers mit einem Produkt",
      "Die technische Implementierung einer Anwendung",
      "Die Programmiersprache einer Anwendung",
    ],
    correct: 1,
    explanation: "UX beschreibt das gesamte Erlebnis — nicht nur wie es aussieht (UI), sondern wie es sich anfühlt, funktioniert und ob es Spaß macht.",
  },
  {
    question: "Was ist eine Persona?",
    type: "multiple" as const,
    options: [
      "Ein echter Nutzer des Produkts",
      "Ein fiktiver Nutzer, repräsentativ für eine Zielgruppe",
      "Ein Programmierer im Team",
      "Ein Stakeholder des Projekts",
    ],
    correct: 1,
    explanation: "Eine Persona ist ein fiktiver Nutzer, der repräsentativ für eine Zielgruppe steht. Sie hilft, sich in den Nutzer hineinzuversetzen.",
  },
  {
    question: "Wie lautet das Format einer User Story?",
    type: "multiple" as const,
    options: [
      "Wenn [Bedingung], dann [Aktion]",
      "Als [Rolle] möchte ich [Ziel], um [Nutzen]",
      "Das System soll [Funktion] unterstützen",
      "Der Nutzer klickt auf [Element]",
    ],
    correct: 1,
    explanation: "User Stories folgen dem Format: 'Als [Rolle] möchte ich [Ziel], um [Nutzen].' Sie beschreiben Funktionen aus der Sicht des Nutzers.",
  },
  {
    question: "Welche Heuristik besagt, dass Optionen sichtbar sein sollen?",
    type: "multiple" as const,
    options: [
      "Sichtbarkeit des Systemstatus",
      "Wiedererkennen statt Erinnern",
      "Konsistenz und Standards",
      "Fehlervermeidung",
    ],
    correct: 1,
    explanation: "Heuristik 6 'Wiedererkennen statt Erinnern' besagt, dass Optionen sichtbar sein sollen, damit der Nutzer nicht raten muss.",
  },
  {
    question: "Was sind die 5 Phasen des Design Sprints?",
    type: "multiple" as const,
    options: [
      "Planen, Entwickeln, Testen, Launchen, Bewerben",
      "Understand, Diverge, Converge, Prototype, Test",
      "Research, Design, Code, Deploy, Monitor",
      "Idee, Plan, Umsetzung, Präsentation, Feedback",
    ],
    correct: 1,
    explanation: "Die 5 Phasen: Understand (Problem verstehen), Diverge (Ideen sammeln), Converge (Ideen auswählen), Prototype (bauen), Test (mit Nutzern testen).",
  },
  {
    question: "Was ist der Unterschied zwischen funktionalen und nicht-funktionalen Anforderungen?",
    type: "multiple" as const,
    options: [
      "Funktionale = was das System tut, Nicht-funktionale = wie gut es das tut",
      "Funktionale = wichtig, Nicht-funktionale = unwichtig",
      "Funktionale = technisch, Nicht-funktionale = organisatorisch",
      "Es gibt keinen Unterschied",
    ],
    correct: 0,
    explanation: "Funktionale Anforderungen beschreiben WAS (Features), nicht-funktionale WIE GUT (Performance, Sicherheit, Usability).",
  },
  {
    question: "Was bedeutet 'Learnability' in der Usability-Evaluation?",
    type: "multiple" as const,
    options: [
      "Wie gut der Nutzer sich nach Pause erinnert",
      "Wie einfach das System zu erlernen ist",
      "Wie sicher das System ist",
      "Wie schön das Design ist",
    ],
    correct: 1,
    explanation: "Learnability = Erlernbarkeit. Wie einfach ist es für einen neuen Nutzer, das System zu verstehen und zu bedienen?",
  },
  {
    question: "Was beschreibt Heuristik 2 (Übereinstimmung mit der realen Welt)?",
    type: "multiple" as const,
    options: [
      "Das System soll technisch korrekt sein",
      "Das System soll die Sprache des Nutzers sprechen",
      "Das System soll schnell sein",
      "Das System soll sicher sein",
    ],
    correct: 1,
    explanation: "Heuristik 2 besagt, dass das System die Sprache des Nutzers verwenden soll — nicht die des Systems. Beispiel: Papierkorb-Symbol statt 'delete.exe'.",
  },
  {
    question: "Was ist ein Low-Fidelity Prototyp?",
    type: "multiple" as const,
    options: [
      "Ein fertiges Produkt",
      "Ein klickbarer Prototyp in Figma",
      "Ein schneller Prototyp auf Papier",
      "Ein Prototyp mit echter Datenbank",
    ],
    correct: 2,
    explanation: "Low-Fidelity Prototypen sind schnelle, billige Prototypen auf Papier. Sie sind schnell zu erstellen und einfach zu ändern.",
  },
  {
    question: "Was bedeutet 'Safety' in der Usability-Evaluation?",
    type: "multiple" as const,
    options: [
      "Wie sicher die Daten gespeichert werden",
      "Wie das System den Nutzer vor ungewollten Aktionen schützt",
      "Wie schnell das System lädt",
      "Wie viele Nutzer gleichzeitig arbeiten können",
    ],
    correct: 1,
    explanation: "Safety = Sicherheit für den Nutzer. Das System soll vor ungewollten Aktionen schützen — z.B. Bestätigungsdialoge bei kritischen Aktionen.",
  },
];

export const uxCategories = [
  {
    id: "ux",
    name: "UX & Interaction Design",
    icon: "🎨",
    description: "Nielsen-Heuristiken, Personas, User Stories, Design Sprint, Prototyping",
  },
];
