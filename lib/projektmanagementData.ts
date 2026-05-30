import { Module } from "./types";

// ============================================================================
// IHK "Projektmanagement" — Modul-Daten
// Quelle: IHK IT-Handbuch + Moritz' Mitschriften
// ============================================================================

export const projektmanagementModule: Module = {
  id: "ihk-projektmanagement",
  slug: "ihk-projektmanagement",
  title: "Projektmanagement",
  description: "IHK IT-Handbuch: Klassisch & Agil, Scrum, DIN 69901, Magisches Dreieck, EVA, SMART, Stakeholder-Analyse",
  icon: "📋",
  color: "#F59E0B",
  category: "ihk",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Projektmanagement (IHK)

### Was ist ein Projekt?
- Klare Zielvorgabe, Einmaligkeit, Zeitliche Befristung
- Komplexität, Interdisziplinär, Risikobehaftet

### Magisches Dreieck
- **Qualität**, **Budget**, **Zeit** — Spannungsfeld
- Wenn ein Punkt schwächelt, muss ein anderer ausgleichen

### SMART-Ziele
- **S**pezifisch, **M**essbar, **A**nspruchsvoll, **R**ealistisch, **T**erminiert

### DIN 69901 Phasen
1. Initiierung
2. Definition
3. Planung
4. Steuerung
5. Abschluss

### Klassisch vs. Agil
| Klassisch | Agil |
|-----------|------|
| Wasserfall, V-Modell | Scrum, Kanban |
| Feste Phasen | Iterativ |
| Dokumentation | Funktionierende Software |

### Scrum
- **Rollen:** Product Owner, Scrum Master, Team
- **Events:** Sprint Planning, Daily, Review, Retrospektive
- **Artefakte:** Backlog, Sprint Backlog, Inkrement

### EVA (Earned Value Analysis)
- PV (Planned Value), EV (Earned Value), AC (Actual Cost)
- CV = EV - AC, SV = EV - PV
- CPI = EV/AC, SPI = EV/PV

### Methoden
- FMEA, SWOT, Ishikawa, Kraftfeldanalyse
- Stakeholder-Analyse, Nutzwertanalyse`,

  lessons: [
    // --- Lektion 1: Was ist ein Projekt? ---
    {
      id: "pm-1",
      title: "Was ist ein Projekt?",
      duration: "10 min",
      type: "text",
      content: `## Was ist ein Projekt?

> In diesem Modul lernst du die Grundlagen des Projektmanagements kennen — vom Magischen Dreieck über SMART-Ziele bis zu Scrum und Analyse-Methoden. Die IHK prüft sowohl klassisches (DIN 69901, Wasserfall) als auch agiles PM — und du brauchst beides!

> Stakeholder und Anforderungen spielen auch im Modul "UX & Interaction Design" eine zentrale Rolle — dort aus der Perspektive des Nutzererlebnisses.

Ein Projekt ist eine **zeitlich befristete, einmalige Aufgabe** mit klaren Zielen und begrenzten Ressourcen.

---

## 📋 Projekteigenschaften

| Eigenschaft | Beschreibung | Beispiel |
|-------------|-------------|----------|
| 🎯 **Klare Zielvorgabe** | Definiertes Ergebnis | "App fertig bis März" |
| 🔄 **Einmaligkeit** | Nie so gemacht | Neues Produkt entwickeln |
| ⏰ **Zeitliche Befristung** | Start und Ende | 6 Monate |
| 🧩 **Komplexität** | Viele Variablen | Technik, Team, Budget |
| 👥 **Interdisziplinär** | Verschiedene Kompetenzen | Entwickler, Designer, Tester |
| ⚠️ **Risikobehaftet** | Unsicherheit | Technologie, Markt |

---

## 👥 Stakeholder

**Stakeholder** sind alle Personen oder Gruppen, die ein Interesse am Projekt haben oder von dessen Ergebnissen betroffen sind.

### Beispiele
| Stakeholder | Interesse |
|-------------|-----------|
| 👔 **Auftraggeber** | Ergebnis, Budget, Zeit |
| 👨‍💻 **Entwickler** | Technische Umsetzung |
| 👤 **Nutzer** | Funktion, Usability |
| 🏢 **Management** | ROI, Strategie |
| 📜 **Gesetzgeber** | Compliance, DSGVO |

---

## 📁 Projektakte

Die **Projektakte** ist das "heilige Dokument" eines Projekts — sie enthält ALLES:

- Lastenheft, Pflichtenheft
- Zeitpläne, Budget
- Risikoanalyse
- Protokolle, Entscheidungen
- Abschlussbericht

> ⚠️ Die Projektakte kommt am Ende ins **Archiv** und ist nicht mehr anpassbar!

---

## 🏢 Organisationsformen

| Form | Beschreibung |
|------|-------------|
| 📊 **Linienorganisation** | Klare Hierarchie (Chef → Abteilung → Mitarbeiter) |
| 🔀 **Matrixorganisation** | Mitarbeiter berichten an Linie UND Projekt |
| 📋 **Stablinienorganisation** | Stab berät die Linie |

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was sind die Eigenschaften eines Projekts?" — Klare Zielvorgabe, Einmaligkeit, Zeitliche Befristung, Komplexität, Interdisziplinär, Risikobehaftet.

---

> Jetzt weißt du, was ein Projekt ist. Aber woran muss man sich halten? In der nächsten Lektion lernst du das **Magische Dreieck** kennen — Qualität, Budget und Zeit im Spannungsfeld.`
    },

    // --- Lektion 2: Magisches Dreieck ---
    {
      id: "pm-2",
      title: "Das Magische Dreieck",
      duration: "12 min",
      type: "text",
      content: `## Das Magische Dreieck — Qualität, Budget, Zeit

> In der letzten Lektion hast du gelernt, was ein Projekt ist und wer daran beteiligt ist. Jetzt kommt das wichtigste Modell für jedes Projekt: das **Magische Dreieck**. Es beschreibt das Spannungsfeld, in dem sich jedes Projekt bewegt.

Das **Magische Dreieck** beschreibt das Spannungsfeld, in dem sich jedes Projekt bewegt. Die drei Eckpunkte sind **voneinander abhängig**.

---

## 📐 Die drei Eckpunkte

\`\`\`
        Qualität
        /      \\
       /        \\
      /          \\
   Budget ──── Zeit
\`\`\`

| Eckpunkt | Beschreibung |
|----------|-------------|
| ✅ **Qualität** | Wie gut ist das Ergebnis? |
| 💰 **Budget** | Wie viel Geld steht zur Verfügung? |
| ⏰ **Zeit** | Wann muss es fertig sein? |

---

## ⚖️ Die Regel

> **Wenn ein Punkt schwächelt, muss ein anderer ausgleichen!**

### Beispiele

| Problem | Ausgleich |
|---------|-----------|
| 💰 Budget wird um 50.000€ gekürzt | Qualität senken ODER Zeit verlängern |
| ⏰ Mitarbeiter fällt 3 Wochen aus | Budget erhöhen (externen Dienstleister) ODER Qualität senken |
| ✅ Qualität soll steigen | Mehr Budget ODER mehr Zeit |

---

## 🎯 Praxis-Beispiele

### Budget wird knapp
> Auftraggeber kürzt Budget um 50.000€.
> **Lösung:** Qualität/Zeit anpassen — oder Budget verhandeln.

### Mitarbeiter fällt aus
> Essenzieller Mitarbeiter ist 3 Wochen krank.
> **Lösung:** Externe Unterstützung (Budget) oder Fristen verschieben (Zeit).

### Qualität ist nicht ausreichend
> Tests zeigen zu viele Fehler.
> **Lösung:** Mehr Zeit für Tests oder Budget für zusätzliche Tester.

---

## 📝 Planung verteidigen

> **Einer der anderen beiden Punkte kann den geschwächten Punkt ausgleichen.**

- Zeit problematisch → Budget erhöhen (mehr Leute)
- Budget problematisch → Zeit verlängern
- Qualität problematisch → Mehr Zeit/Budget für Tests

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Erklären Sie das Magische Dreieck!" — Qualität, Budget, Zeit im Spannungsfeld. Wenn ein Punkt schwächelt, muss ein anderer ausgleichen. Planung muss verteidigt werden.

---

> Das Magische Dreieck zeigt das Spannungsfeld. Aber wie formuliert man überhaupt gute Ziele? In der nächsten Lektion lernst du das **SMART-Modell** kennen — Spezifisch, Messbar, Anspruchsvoll, Realistisch, Terminiert.`
    },

    // // --- Lektion 3: SMART-Ziele ---
    {
      id: "pm-3",
      title: "SMART-Ziele",
      duration: "10 min",
      type: "interactive",
      interactive: "smartGoalBuilder",
      content: `## SMART-Ziele — Ziele richtig formulieren

> In der letzten Lektion hast du das Magische Dreieck kennengelernt — Qualität, Budget und Zeit im Spannungsfeld. Aber wie formuliert man Ziele, die tatsächlich umsetzbar sind? Das **SMART-Modell** gibt dir die Antwort.

Das **SMART-Modell** hilft, Ziele so zu formulieren, dass sie **messbar, realistisch und terminiert** sind.

---

## 📏 Die SMART-Kriterien

| Buchstabe | Bedeutung | Frage | Beispiel |
|-----------|-----------|-------|----------|
| **S** | Spezifisch | Was genau? | "Login-Funktion implementieren" |
| **M** | Messbar | Wie misst man? | "Login funktioniert in <2 Sekunden" |
| **A** | Anspruchsvoll/Akzeptiert | Für wen? | Auftragnehmer: anspruchsvoll, Auftraggeber: attraktiv |
| **R** | Realistisch | Machbar? | Mit den gegebenen Ressourcen umsetzbar |
| **T** | Terminiert | Bis wann? | "Bis 15. März 2026" |

---

## ❌ Schlechte Ziele

| Ziel | Problem |
|------|---------|
| "Ein Shooterspiel erstellen" | Nicht messbar — was bedeutet "fertig"? |
| "Die App soll gut sein" | Nicht spezifisch — was ist "gut"? |
| "Irgendwann fertig werden" | Nicht terminiert — kein Datum |

## ✅ Gute Ziele (SMART)

| Ziel | SMART-Kriterien |
|------|----------------|
| "Login-Funktion mit E-Mail-Validierung bis 15. März implementieren" | S ✅ M ✅ A ✅ R ✅ T ✅ |
| "Ladezeit der Startseite auf unter 2 Sekunden senken bis Q2" | S ✅ M ✅ A ✅ R ✅ T ✅ |

---

## 🔨 Ausprobieren

[INTERACTIVE]

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was bedeutet SMART?" — Spezifisch, Messbar, Anspruchsvoll/Akzeptiert, Realistisch, Terminiert. Formuliere ein Beispiel-Ziel!

---

> Du kannst jetzt Ziele SMART formulieren. Aber wie plant und steuert man ein Projekt klassisch? In der nächsten Lektion lernst du die **DIN 69901**, Gantt-Diagramme und die **Earned Value Analyse** kennen.`
    },

    // --- Lektion 4: Klassisches Projektmanagement ---
    {
      id: "pm-4",
      title: "Klassisches Projektmanagement",
      duration: "15 min",
      type: "interactive",
      interactive: "evaCalculator",
      content: `## Klassisches Projektmanagement

> In der letzten Lektion hast du SMART-Ziele kennengelernt. Jetzt schauen wir uns das **klassische Projektmanagement** an — mit den 5 Phasen der DIN 69901, Lastenheft/Pflichtenheft und der Earned Value Analyse.

> Das Lastenheft (WAS) und Pflichtenheft (WIE) beschreiben Anforderungen — das Modul "UX & Interaction Design" zeigt dir, wie du diese Anforderungen mit User Stories und Personas erhebst.

Das klassische PM ist **phasenbasiert** und **dokumentengetrieben**. Es eignet sich für Projekte mit **festen Anforderungen**.

---

## 📊 DIN 69901 — Die 5 Phasen

| Phase | Aufgabe |
|-------|---------|
| 1️⃣ **Initiierung** | Projektidee, Machbarkeit prüfen |
| 2️⃣ **Definition** | Ziele, Umfang, Beteiligte festlegen |
| 3️⃣ **Planung** | Zeitplan, Budget, Ressourcen |
| 4️⃣ **Steuerung** | Umsetzung überwachen, anpassen |
| 5️⃣ **Abschluss** | Ergebnis abnehmen, Lessons Learned |

---

## 📋 Projektplanung

### Ablaufplan
- Phasen und Arbeitspakete definieren
- Meilensteine setzen
- Verantwortlichkeiten zuweisen

### Gantt-Diagramm
- Visuelle Darstellung des Zeitplans
- Balken zeigen Dauer der Arbeitspakete
- Abhängigkeiten sichtbar

### Netzplantechnik
- FAZ (Frühester Anfangszeitpunkt)
- FEZ (Frühester Endzeitpunkt)
- SAZ (Spätester Anfangszeitpunkt)
- SEZ (Spätester Endzeitpunkt)
- **Pufferzeit** = SAZ - FAZ
- **Kritischer Pfad** = Pufferzeit = 0

---

## 📄 Lastenheft vs. Pflichtenheft

| | Lastenheft | Pflichtenheft |
|---|---|---|
| **Wer** | Auftraggeber | Auftragnehmer |
| **Was** | WAS soll gemacht werden | WIE wird es gemacht |
| **Inhalt** | Anforderungen, Ziele | Technische Lösung |
| **Zeitpunkt** | Vor dem Projekt | Nach der Beauftragung |

> 💡 **Merke:** Lastenheft = WAS (Auftraggeber). Pflichtenheft = WIE (Auftragnehmer).

---

## 📊 Earned Value Analyse (EVA)

Die EVA misst **Projektfortschritt** im Vergleich zum Plan.

### Die drei Grundwerte
| Wert | Bedeutung |
|------|-----------|
| **PV** (Planned Value) | Was geplant war |
| **EV** (Earned Value) | Was tatsächlich erreicht wurde |
| **AC** (Actual Cost) | Was tatsächlich gekostet hat |

### Kennzahlen
| Formel | Bedeutung |
|--------|-----------|
| **CV** = EV - AC | Kostenabweichung (+ = unter Budget) |
| **SV** = EV - PV | Terminabweichung (+ = schneller) |
| **CPI** = EV / AC | Kosteneffizienz (>1 = gut) |
| **SPI** = EV / PV | Termineffizienz (>1 = gut) |

### Beispiel
\`\`\`
Geplant (PV): 100.000€ für 10 Features
Tatsächlich (EV): 8 Features fertig = 80.000€
Tatsächliche Kosten (AC): 90.000€

CV = 80.000 - 90.000 = -10.000 (über Budget!)
CPI = 80.000 / 90.000 = 0,89 (ineffizient!)
\`\`\`

---

## 🔨 EVA ausprobieren

[INTERACTIVE]

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was ist der Unterschied zwischen Lastenheft und Pflichtenheft?" — Lastenheft = WAS (Auftraggeber), Pflichtenheft = WIE (Auftragnehmer).

---

> Das klassische PM funktioniert gut bei festen Anforderungen. Aber was, wenn sich Anforderungen ändern? In der nächsten Lektion kommt das **agile Projektmanagement mit Scrum** — der Gegenpol zum Wasserfallmodell.`
    },

    // --- Lektion 5: Agiles Projektmanagement ---
    {
      id: "pm-5",
      title: "Agiles Projektmanagement & Scrum",
      duration: "20 min",
      type: "interactive",
      interactive: "scrumBoard",
      content: `## Agiles Projektmanagement

> In der letzten Lektion hast du das klassische PM mit DIN 69901 und EVA kennengelernt. Jetzt kommt der Gegenentwurf: **Agiles Projektmanagement mit Scrum** — iterativ, flexibel und heute der Industriestandard.

> Das Product Backlog enthält **User Stories** — das Format "Als [Rolle] möchte ich [Ziel]" lernst du im Modul "UX & Interaction Design" kennen. Und Sprints erinnern an **Feature-Branches** im Modul "Versionsmanagement mit Git".

Agiles PM ist **iterativ** und **inkrementell** — statt alles am Ende zu liefern, wird in kurzen Zyklen (Sprints) gearbeitet.

---

## 📜 Das Agile Manifest

> 1. **Individuen und Interaktionen** mehr als Prozesse und Werkzeuge
> 2. **Funktionierende Software** mehr als umfassende Dokumentation
> 3. **Zusammenarbeit mit dem Kunden** mehr als Vertragsverhandlung
> 4. **Reagieren auf Veränderung** mehr als das Befolgen eines Plans

> 💡 **Merke:** Die rechte Seite hat Wert — aber die linke Seite hat MEHR Wert!

---

## 🏃 Scrum — Das populärste agile Framework

### Rollen

| Rolle | Aufgabe |
|-------|---------|
| 🏆 **Product Owner** | Verbindung zum Kunden, Backlog pflegen, Prioritäten setzen |
| 🛡️ **Scrum Master** | Berater, Prozess-Sicherung, Hindernisse beseitigen |
| 👥 **Cross-functional Team** | Selbstorganisiert, eigenverantwortlich, 5-9 Mitglieder |

### Scrum-Events

| Event | Zweck | Zeit |
|-------|-------|------|
| 📋 **Sprint Planning** | Was schaffen wir im Sprint? | 2-4 Wochen Sprint |
| 🌅 **Daily Standup** | Kurzer Status (15 min) | Täglich |
| 🎯 **Sprint Review** | Ergebnis dem Kunden zeigen | Sprint-Ende |
| 🔄 **Retrospektive** | Prozess verbessern | Sprint-Ende |

### Daily Standup — Die 3 Fragen
1. Was habe ich gestern gemacht?
2. Was mache ich heute?
3. Was hindert mich?

### Definition of Done
> Wann ist ein Arbeitspaket "fertig"?
> - ✅ Code geschrieben
> - ✅ Tests bestanden
> - ✅ Dokumentation aktualisiert
> - ✅ Review durchgeführt

---

## 📋 Scrum Artefakte

### Product Backlog
- Liste aller Anforderungen (User Stories)
- Vom Product Owner gepflegt
- Priorisiert nach Wert

### Sprint Backlog
- Arbeitspakete für den aktuellen Sprint
- Vom Team ausgewählt

### Inkrement
- Funktionierende Software am Sprint-Ende
- Muss Definition of Done erfüllen

---

## 📊 Scrum Board

\`\`\`
| Backlog | To Do | In Progress | Review | Done |
|---------|-------|-------------|--------|------|
| Story 3 | Task 4 | Task 2      | Task 1 | ✅   |
| Story 4 |       |             |        |      |
\`\`\`

---

## ⚔️ Klassisch vs. Agil

| | Klassisch | Agil |
|---|---|---|
| **Anforderungen** | Fest | Sich ändernd |
| **Planung** | Am Anfang | Jeder Sprint |
| **Dokumentation** | Umfangreich | Minimal |
| **Kundenkontakt** | Selten | Ständig |
| **Risiko** | Späte Fehlererkennung | Frühe Fehlererkennung |
| **Beispiel** | Hausbau | App-Entwicklung |

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Erklären Sie Scrum!" — 3 Rollen (PO, SM, Team), 4 Events (Planning, Daily, Review, Retro), 3 Artefakte (Backlog, Sprint Backlog, Inkrement). Iterativ in 2-4 Wochen Sprints.

---

> Du kennst jetzt klassisches und agiles PM. In der letzten inhaltlichen Lektion lernst du **Analyse-Methoden** kennen — SWOT, Ishikawa, Stakeholder-Analyse und mehr.`
    },

    // --- Lektion 6: Analyse-Methoden ---
    {
      id: "pm-6",
      title: "Analyse-Methoden für Projekte",
      duration: "15 min",
      type: "text",
      content: `## Analyse-Methoden — Werkzeuge für das Projektmanagement

> In der letzten Lektion hast du Scrum kennengelernt — das agile Framework für die Umsetzung. Jetzt geht es um die **Werkzeuge**, mit denen man Projekte analysiert und verbessert: SWOT, Ishikawa, Stakeholder-Analyse und mehr.

> Die Stakeholder-Analyse zeigt dir, wer am Projekt beteiligt ist — im Modul "UX & Interaction Design" lernst du, wie du die Bedürfnisse dieser Stakeholder mit Personas und User Stories erfasst.

Es gibt viele Methoden, um Projekte zu analysieren und zu verbessern. Hier die **wichtigsten für die IHK**.

---

## 📊 SWOT-Analyse

Analysiert **Stärken, Schwächen, Chancen und Risiken** eines Projekts.

\`\`\`
|          | Positiv    | Negativ    |
|----------|------------|------------|
| Intern   | Stärken    | Schwächen  |
| Extern   | Chancen    | Risiken    |
\`\`\`

**Beispiel:**
| | Positiv | Negativ |
|---|---|---|
| **Intern** | Erfahrenes Team | Wenig Budget |
| **Extern** | Wachsender Markt | Starke Konkurrenz |

---

## 🐟 Ishikawa-Diagramm (Ursache-Wirkung)

Visualisiert **Ursachen für ein Problem** — sieht aus wie ein Fischgräten-Diagramm.

\`\`\`
Ursache 1 ──┐
Ursache 2 ──┤
Ursache 3 ──┼── Problem
Ursache 4 ──┤
Ursache 5 ──┘
\`\`\`

**Kategorien (6M):**
- **M**ensch, **M**aschine, **M**aterial
- **M**ethode, **M**essung, **M**ilieu

---

## 📋 Stakeholder-Analyse

Identifiziert und bewertet alle **Personen mit Interesse** am Projekt.

### Matrix
\`\`\`
Hoher Einfluss │ Manage Closely │ Keep Satisfied
               ├────────────────┼───────────────
Geringer       │ Monitor        │ Keep Informed
Einfluss       │                │
\`\`\`

---

## ⚡ Kraftfeldanalyse

Analysiert **treibende** und **hemmende Kräfte** bei Veränderungen.

| Treibende Kräfte | Hemmende Kräfte |
|-------------------|-----------------|
| Neue Technologie | Angst vor Veränderung |
| Kundennachfrage | Fehlendes Budget |
| Wettbewerbsvorteil | Alte Prozesse |

---

## 🔍 Five Why (5 Warum?)

Fragt **5 Mal "Warum?"** bis zur eigentlichen Ursache.

\`\`\`
Problem: Die App stürzt ab.
Warum? → NullPointer Exception.
Warum? → Variable nicht initialisiert.
Warum? → Datenbank liefert null.
Warum? → Verbindung fehlgeschlagen.
Warum? → Server nicht erreichbar. ← Echte Ursache!
\`\`\`

---

## 📊 Nutzwertanalyse

Bewertet **Optionen nach gewichteten Kriterien**.

| Kriterium | Gewicht | Option A | Option B |
|-----------|---------|----------|----------|
| Kosten | 30% | 8 | 6 |
| Zeit | 25% | 7 | 9 |
| Qualität | 45% | 9 | 7 |
| **Gesamt** | | **8,1** | **7,3** |

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Erklären Sie die SWOT-Analyse!" — Stärken, Schwächen (intern), Chancen, Risiken (extern). Hilft bei der strategischen Bewertung eines Projekts.

---

> Das war die letzte inhaltliche Lektion zu Projektmanagement! Du hast von den Grundlagen über klassisches und agiles PM bis zu den Analyse-Methoden alles kennengelernt. Jetzt kannst du dein Wissen im Quiz testen!`
    },

    // --- Lektion 7: Quiz ---
    {
      id: "pm-7",
      title: "Wissenstest: Projektmanagement",
      duration: "15 min",
      type: "quiz",
      content: `## 🎯 Quiz: Projektmanagement

> Du hast alle Lektionen zu Projektmanagement durchgearbeitet — vom Magischen Dreieck über SMART-Ziele, DIN 69901, Scrum bis zu den Analyse-Methoden. Jetzt ist es Zeit, dein Wissen zu testen!

Teste dein Wissen über Projektmanagement-Methoden!`,
    },
  ],
};
