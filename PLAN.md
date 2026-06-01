# Feedback-Umsetzung — Moritz (01.06.2026)

## Übersicht

Das Feedback lässt sich in 6 Hauptbereiche gruppieren. Reihenfolge = vorgeschlagene Priorität (Bugfixes zuerst, dann Quick Wins, dann große Features).

**Status-Symbole:** ✅ erledigt | 🔧 teilweise | ❌ offen | 🔄 in Arbeit

---

## Phase 1: Bugfixes & Quick Fixes (sofort)

### 1.1 Quiz-XP-Bug
- **Problem:** Nach erstmaligem Abschluss kann man das Quiz wiederholen und bekommt erneut XP.
- **Status:** 🔧 `hasAwardedXP` ref verhindert XP pro Session, aber Navigation zurück setzt Ref zurück.
- **Fix:** Nach Abschluss den "Quiz wiederholen"-Button ausblenden ODER XP-Belohnung dauerhaft in Firestore markieren.
- **Betroffene Datei:** `components/Quiz.tsx`, `lib/auth.ts`

### 1.2 Scoreboard-Bug (Offline-User)
- **Problem:** Wenn man den 1. Platz wieder einholt und der aktuelle 1. offline ist, behält dieser seinen Rahmen/Icon solange er offline bleibt.
- **Status:** 🔧 Fix nur für aktuellen User implementiert, nicht für offline User.
- **Fix:** Leaderboard-Load muss ALLE Top-3 User prüfen und Cosmetics zurücksetzen wenn nicht mehr berechtigt.
- **Betroffene Datei:** `app/leaderboard/page.tsx`, `lib/auth.ts`

### 1.3 Scoreboard: Random Icon bei Registrierung
- **Problem:** Neuer Nutzer kann zufällig ein Level-5+ Icon bekommen.
- **Status:** ✅ `STARTER_AVATARS` in `lib/auth.ts:59` ist auf Level-1-Icons beschränkt.

### 1.4 Unendlicher Ladebalken
- **Problem 1:** "Zurück zu allen Modulen" → unendlich lädt (erst zweiter Klick hilft).
- **Problem 2:** Bestenliste nach Quiz-Abschluss → unendlicher Ladebalken.
- **Status:** ❌ Kein Fix im Code sichtbar.
- **Fix:** Routing/State-Management prüfen, Loading-State korrekt zurücksetzen.
- **Betroffene Datei:** `app/modules/[slug]/page.tsx`, `app/leaderboard/page.tsx`

### 1.5 Doppelte Emojis in Zusammenfassungen
- **Betroffene Module:** Git, Erw. Programmierung
- **Status:** ❌
- **Fix:** Dopplungen in den Markdown-Strings entfernen.

### 1.6 Computersysteme: Phase 1 Nummerierung startet bei 8
- **Status:** ❌
- **Fix:** Nummerierung in der Lektion korrigieren.
- **Betroffene Datei:** `lib/computersystemeData.ts`

### 1.7 UX: Requirements Engineering Einrückzahlen
- **Status:** ❌
- **Fix:** Indentation in der Lektion korrigieren.
- **Betroffene Datei:** `lib/uxData.ts`

### 1.8 UX: Usability-Test Nummerierung startet bei 10
- **Status:** ❌
- **Fix:** Nummerierung bei 1 beginnen.
- **Betroffene Datei:** `lib/uxData.ts`

---

## Phase 2: Quiz-Qualität (alle Module)

### 2.1 Antworten mischen
- **Problem:** In vielen Modulen ist immer die erste Antwort richtig (oder die längste).
- **Status:** ✅ Fisher-Yates Shuffle in `Quiz.tsx:547-566` implementiert. Wird auf InitialLoad und Restart angewendet.
- **Aber:** Prüfen ob die Daten trotzdem "faule" Antworten haben (z.B. immer die längste = richtig).

### 2.2 Quiz-Schwierigkeit erhöhen
- Antworten so formulieren dass mehrere plausibel klingen.
- Falsche Antworten nicht offensichtlich unsinnig machen.
- Betroffene Module: Alle IHK-Module (git, ux, qualität, projektmanagement, docker, erw-prog, it-sicherheit, computersysteme)
- **Spezifisch:** Semantic Versioning Frage — Antwortoptionen zufällig anordnen (nicht nur Zahlen mischen).

---

## Phase 3: Formatierung — TSX durch Grafiken/Visuelles ersetzen

### 3.1 Allgemeines Problem
Viele Lektionen nutzen TSX-Code für Diagramme/Darstellungen. Das ist:
- Nicht responsive
- Klein und schwer lesbar
- Visuell unattraktiv

**Strategie:** Für jedes betroffene Element prüfen ob:
- Die existierende interaktive Komponente ausreicht (z.B. PatternExplorer für Design Patterns)
- Eine SVG/Grafik besser wäre (statische Diagramme wie Wasserfall, V-Modell, Scrum-Zyklus)
- Ein neuer interaktiver Ansatz sinnvoll wäre (z.B. Scrum Board)

### 3.2 Betroffene Module & Elemente

**Projektmanagement:**
- ❌ Magisches Dreieck → Interaktive Komponente (drag Punkte, sieht Auswirkung)
- ❌ DIN 69901 → Eigene Lektion
- ❌ Agiles Manifest → Unterpunkte schöner darstellen
- ❌ Scrum-Zyklus → SVG-Grafik
- ❌ Definition of Done → Bessere visuelle Darstellung
- ❌ Unterpunkte-Formatierung → Generell in allen Lektionen verbessern (bisher Stichpunkte hässlich/klein)

**Git:**
- ❌ VV wird nicht erklärt → Erklärung einfügen
- ❌ Workflow → SVG/Markdown statt TSX
- ❌ Gitflow → SVG-Grafik
- ❌ Branch Visualizer → Überarbeiten: bottom-up statt horizontal, neue Branches sichtbar
- ❌ Merge Konflikte → Interaktive Variante
- ❌ Commits auf Englisch (Konvention)
- ❌ Stash-Beispiel → Nicht TSX
- ❌ Syntax Highlighting für Befehle

**Software-Qualitätsstandards:**
- ❌ Design Patterns → Nur interaktive Komponente nutzen (PatternExplorer ist gut)
- ❌ Schichtarchitektur → SVG-Grafik
- ❌ Kommunikationsfluss → SVG-Grafik
- ❌ Microservices → SVG-Grafik
- ❌ Testpyramide → SVG-Grafik
- ❌ Wasserfallmodell → SVG-Grafik
- ❌ V-Modell → SVG-Grafik
- ❌ C# Syntax Highlighting hinzufügen
- ❌ TestRunner Cursor-Offset fixen

**Docker:**
- ❌ Docker Workflow → SVG-Grafik
- ❌ Bash Syntax Highlighting (gesamtes Modul)
- ❌ Docker-Compose Builder UI überarbeiten (rechts verzogen)
- ❌ Deployment-Strategien → SVG-Grafik
- ❌ Kubernetes-Konzepte → SVG-Grafik

**UX → UI/UX umbenennen:**
- ❌ Nielsen: Redundante Erklärungen über interaktive Komponente entfernen
- ❌ User Stories → Nicht TSX
- ❌ Design Sprint → Bessere Bullet-Points
- ❌ Requirements Engineering → Einrückung fixen
- ❌ Usability-Test → Nummerierung fixen

**IT-Sicherheit:**
- ❌ Schadsoftware: Redundant wenn ThreatExplorer existiert
- ❌ IHK-Tipp-Boxen korrekt formatieren (generell im Modul)
- ❌ Firewall-Übung: Mehr Anleitung
- ❌ DMZ-Skizze → SVG-Grafik
- ❌ SQL Syntax Highlighting
- ❌ Verschlüsselung: Symmetrisch/Asymmetrisch → SVG-Grafiken
- ❌ Interaktive Verschlüsselung überarbeiten
- ❌ PKI → Nicht TSX
- ❌ Phishing Detector: Randomisierung + Quiz am Ende

**Computersysteme:**
- ❌ Gesamten Inhalt nochmal überarbeiten (Formulierungen)
- ❌ RAID: Disk-Ansicht (A1, A2, Parity) implementieren
- ❌ CPU-Architektur Übung: User mehr an die Hand nehmen
- ❌ Jede Lektion einzeln prüfen (Tipps/IHK-Tipps Formatierung)

---

## Phase 4: Syntax Highlighting (Quick Win)

### 4.1 Fehlende Sprachen in PrismJS
- **Betroffene Dateien:** `components/CodeBlock.tsx`, `components/interactive/CodeSandbox.tsx`
- **Aktuell geladen:** jsx, typescript, tsx, python, css, javascript
- **Fehlend:**
  - ❌ `prism-csharp` — für C#-Beispiele (Software-Qualitätsstandards, Erw. Programmierung)
  - ❌ `prism-bash` — für Bash/Docker-Befehle
  - ❌ `prism-sql` — für SQL-Beispiele (IT-Sicherheit, Web-Security)

---

## Phase 5: Neue interaktive Komponenten

### 5.1 Interaktives Magisches Dreieck (Projektmanagement)
- 3 Punkte (Kosten, Zeit, Umfang/Qualität) die man per Drag verschieben kann
- Wenn einer sich ändert, visuelle Auswirkung auf die anderen zeigen
- **Status:** ❌

### 5.2 Interaktives Scrum Board (Projektmanagement)
- Tasks/User Storys erstellen und zwischen Spalten schieben
- **Status:** ❌

### 5.3 Shell-Simulator (Git)
- Simuliert ein Git-Projekt mit poshgit-artigen Befehlen
- Zeigt Ausgabe jedes Befehls
- Fortschritt: init → add → commit → branch → merge
- **Status:** ❌

### 5.4 Interaktive Merge-Konflikte (Git)
- Zeigt Konflikt in einer Datei mit <<<<<<< / ======= / >>>>>>>
- User löst den Konflikt manuell
- **Status:** ❌

### 5.5 RAID Disk-Ansicht (Computersysteme)
- Visuelle Darstellung mit Platten, Blöcken (A1, A2, P) wie in Lehrbüchern
- **Status:** ❌

### 5.6 Phishing-Detector Randomisierung (IT-Sicherheit)
- Zufällige Reihenfolge der Beispiele
- Quiz am Ende
- **Status:** ❌

---

## Phase 6: Cookie Clicker Mini-Game

### 6.1 Konzept
- Kleines schwebendes Fenster das man auf der Seite hin- und herschieben kann
- AFK-fähig: generiert automatisch "Lernpunkte"
- Optional: Klick-Boni für aktives Interagieren
- NICHT zeitlich eingeschränkt — man muss nicht lernen um zu spielen
- Verknüpfung mit bestehenden Modulen (thematisch)

### 6.2 Features
- Eigene Bestenliste
- Erschließbare Profilbilder
- Exklusive Rahmen
- Gamification-Layer über dem eigentlichen Lernen

### 6.3 Technische Umsetzung
- ✅ `components/LearningClicker.tsx` existiert
- ✅ Drag funktioniert auf Desktop/Tablet/Mobile (Pointer Capture)
- ✅ Auto-Ticker (setInterval) für AFK-Punkte
- ✅ Klick-Handler für Bonus-Punkte
- ✅ Shop-System für Cosmetics
- 🔧 Persistenz: localStorage (nicht Firestore)

---

## Phase 7: Allgemeine Verbesserungen

### 7.1 Cross-Module Links
- Wenn im "Roten Faden" andere Module/Lektionen erwähnt werden, dorthin verlinken.
- **Status:** ❌
- Betroffene: Alle Lektionen mit Querverweisen

### 7.2 Tabellen-Header
- In allen Modulen: Tabellenüberschriften klar kennzeichnen (fett, farbig, etc.)
- **Status:** 🔧 Global CSS hat Styling, aber MerkblattContent nutzt nur `<td>`, kein `<th>`.
- **Fix:** MerkblattContent Parser erste Tabellenzeile als `<th>` rendern.

### 7.3 Feedback-System
- Sichere Funktion für Nutzer-Feedback
- Nicht als Schwachstelle implementieren
- Nicht störend für den Lernfluss
- **Status:** ❌ Keine Implementierung vorhanden.
- **Offene Frage:** Email-Formular? In-App? Firebase-Collection?

### 7.4 Dashboard: Abgeschlossene Module ausblenden
- Standardmäßig ausgeblendet, Toggle zum Anzeigen
- **Status:** ✅ Implementiert in `app/page.tsx:17-18,150-170`.

### 7.5 XP/Level-Anzeige mergen
- Beide zeigen im Grunde dasselbe — zusammenführen
- **Status:** ❌

### 7.6 Karteikarten-Export (Anki)
- Universelles Download-Format (Anki .apkg oder CSV)
- Nutzer kann Karteikarten für eigenes System herunterladen
- **Status:** ✅ TSV-Format in `lib/flashcards.ts:152-184`, Anki-importierbar.

### 7.7 UX-Modul umbenennen
- "UX & Interaction Design" → "UI/UX Design"?
- **Status:** ❌ Offene Frage an Moritz.

---

## Gesamter Aufwand

| Phase | Aufwand | Priorität | Status |
|-------|---------|-----------|--------|
| 1: Bugfixes | ~2-3h | Hoch | 🔧 teilweise |
| 2: Quiz-Qualität | ~4-6h | Hoch | 🔧 Shuffle da, Qualität offen |
| 3: TSX → Grafiken | ~15-20h | Mittel | ❌ |
| 4: Syntax Highlighting | ~0.5h | Hoch (Quick Win) | ❌ |
| 5: Interaktive Komponenten | ~10-15h | Mittel | ❌ |
| 6: Cookie Clicker | ~8-12h | Niedrig | ✅ größtenteils |
| 7: Allgemeines | ~5-8h | Mittel | 🔧 |

**Gesamt: ~45-65h**

---

## Offene Fragen an Moritz

1. **Priorität:** Welche Phase(n) zuerst? Oder alles nacheinander?
2. **UX → UI/UX:** Wirklich umbenennen?
3. **Feedback-System:** Email-Formular? In-App? Firebase-Collection?
4. **Grafiken:** SVG inline oder externe Bilder?
5. **Shell-Simulator:** Echtes Git oder nur Simulated Output?
