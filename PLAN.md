# Feedback-Umsetzung — Moritz (01.06.2026)

## Ubersicht

Das Feedback lasst sich in 6 Hauptbereiche gruppieren. Reihenfolge = vorgeschlagene Prioritat (Bugfixes zuerst, dann Quick Wins, dann grose Features).

---

## Phase 1: Bugfixes & Quick Fixes (sofort)

### 1.1 Quiz-XP-Bug
- **Problem:** Nach erstmaligem Abschluss kann man das Quiz wiederholen und bekommt erneut XP.
- **Fix:** In `Quiz.tsx` — nach erfolgreichem Abschluss (`onComplete` wurde aufgerufen) den "Quiz wiederholen"-Button ausblenden ODER beim Wiederholen keine XP mehr vergeben.
- **Betroffene Datei:** `components/Quiz.tsx`, `lib/auth.ts`

### 1.2 Scoreboard-Bug (Offline-User)
- **Problem:** Wenn man den 1. Platz wieder einholt und der aktuelle 1. offline ist, behalt dieser seinen Rahmen/Icon solange er offline bleibt.
- **Fix:** Leaderboard-Load pruft aktuelle Platzierung und setzt Cosmetics zuruck wenn nicht mehr berechtigt.
- **Betroffene Datei:** `app/leaderboard/page.tsx`, `lib/auth.ts`

### 1.3 Scoreboard: Random Icon bei Registrierung
- **Problem:** Neuer Nutzer kann zufallig ein Level-5+ Icon bekommen.
- **Fix:** Bei Registrierung nur Level-1-Icons verfugbar machen.
- **Betroffene Datei:** `lib/rewards.ts`, `lib/auth.ts`

### 1.4 Unendlicher Ladebalken
- **Problem 1:** "Zuruck zu allen Modulen" → unendlich ladt (erst zweiter Klick hilft).
- **Problem 2:** Bestenliste nach Quiz-Abschluss → unendlicher Ladebalken.
- **Fix:** Routing/State-Management prufen, Loading-State korrekt zurucksetzen.
- **Betroffene Datei:** `app/modules/[slug]/page.tsx`, `app/leaderboard/page.tsx`

### 1.5 Doppelte Emojis in Zusammenfassungen
- **Betroffene Module:** Git, Erw. Programmierung
- **Fix:** Dopplungen in den Markdown-Strings entfernen.

### 1.6 Computersysteme: Phase 1 Nummerierung startet bei 8
- **Fix:** Nummerierung in der Lektion korrigieren.
- **Betroffene Datei:** `lib/computersystemeData.ts`

### 1.7 UX: Requirements Engineering Einrückzahlen
- **Fix:** Indentation in der Lektion korrigieren.
- **Betroffene Datei:** `lib/uxData.ts`

### 1.8 UX: Usability-Test Nummerierung startet bei 10
- **Fix:** Nummerierung bei 1 beginnen.
- **Betroffene Datei:** `lib/uxData.ts`

---

## Phase 2: Quiz-Qualitat (alle Module)

### 2.1 Antworten mischen
- **Problem:** In vielen Modulen ist immer die erste Antwort richtig (oder die langste).
- **Fix:** `shuffleArray` fur Antwortoptionen in `Quiz.tsx` einfuhren — wird aber nur helfen wenn die Daten das schon richtig machen. Prufung: `correct`-Index muss nach Shuffle korrekt bleiben, also Shuffle MUSS in der Komponente passieren (nicht in den Daten).
- **Betroffene Datei:** `components/Quiz.tsx`

### 2.2 Quiz-Schwierigkeit erhohen
- Antworten so formulieren dass mehrere plausibel klingen.
- Falsche Antworten nicht offensichtlich unsinnig machen.
- Betroffene Module: Alle IHK-Module (git, ux, qualitaet, projektmanagement, docker, erw-prog, it-sicherheit, computersysteme)

---

## Phase 3: Formatierung — TSX durch Grafiken/Visuelles ersetzen

### 3.1 Allgemeines Problem
Viele Lektionen nutzen TSX-Code fur Diagramme/Darstellungen. Das ist:
- Nicht responsive
- Klein und schwer lesbar
- Visuell unattraktiv

**Strategie:** Fur jedes betroffene Element prufen ob:
- Die existierende interaktive Komponente ausreicht (z.B. PatternExplorer fur Design Patterns)
- Eine SVG/Grafik besser ware (statische Diagramme wie Wasserfall, V-Modell, Scrum-Zyklus)
- Ein neuer interaktiver Ansatz sinnvoll ware (z.B. Scrum Board)

### 3.2 Betroffene Module & Elemente

**Projektmanagement:**
- Magisches Dreieck → Interaktive Komponente (drag Punkte, sieht Auswirkung)
- DIN 69901 → Eigene Lektion
- Scrum-Zyklus → SVG-Grafik
- Definition of Done → Bessere visuelle Darstellung
- Unterpunkte-Formatierung → Generell in allen Lektionen verbessern

**Git:**
- VV wird nicht erklart → Erklarung einfugen
- Workflow → SVG/Markdown statt TSX
- Gitflow → SVG-Grafik
- Branch Visualizer → Uberarbeiten: bottom-up statt horizontal, neue Branches sichtbar
- Merge Konflikte → Interaktive Variante
- Commits auf Englisch (Konvention)
- Stash-Beispiel → Nicht TSX
- Syntax Highlighting fur Befehle

**Software-Qualitatsstandards:**
- Design Patterns → Nur interaktive Komponente nutzen (PatternExplorer ist gut)
- Schichtarchitektur → SVG-Grafik
- Kommunikationsfluss → SVG-Grafik
- Microservices → SVG-Grafik
- Testpyramide → SVG-Grafik
- Wasserfallmodell → SVG-Grafik
- V-Modell → SVG-Grafik
- C# Syntax Highlighting hinzufugen
- TestRunner Cursor-Offset fixen

**Docker:**
- Docker Workflow → SVG-Grafik
- Bash Syntax Highlighting (gesamtes Modul)
- Docker-Compose Builder UI uberarbeiten
- Deployment-Strategien → SVG-Grafik
- Kubernetes-Konzepte → SVG-Grafik

**UX (→ UI/UX umbenennen?):**
- Nielsen: Redundante Erklarungen uber interaktive Komponente entfernen
- User Stories → Nicht TSX
- Design Sprint → Bessere Bullet-Points
- Requirements Engineering → Einruckung fixen
- Usability-Test → Nummerierung fixen

**IT-Sicherheit:**
- Schadsoftware: Redundant wenn ThreatExplorer existiert
- IHK-Tipp-Boxen korrekt formatieren (generell im Modul)
- Firewall-Ubung: Mehr Anleitung
- DMZ-Skizze → SVG-Grafik
- SQL Syntax Highlighting
- Verschlusselung: Symmetrisch/Asymmetrisch → SVG-Grafiken
- Interaktive Verschlusselung uberarbeiten
- PKI → Nicht TSX
- Phishing Detector: Randomisierung + Quiz am Ende

**Computersysteme:**
- Gesamten Inhalt nochmal uberarbeiten (Formulierungen)
- RAID: Disk-Ansicht (A1, A2, Parity) implementieren
- CPU-Architektur Ubung: User mehr an die Hand nehmen
- Jede Lektion einzeln prufen (Tipps/IHK-Tipps Formatierung)

---

## Phase 4: Neue interaktive Komponenten

### 4.1 Interaktives Magisches Dreieck (Projektmanagement)
- 3 Punkte (Kosten, Zeit, Umfang/Qualitat) die man per Drag verschieben kann
- Wenn einer sich andert, visuelle Auswirkung auf die anderen zeigen

### 4.2 Interaktives Scrum Board (Projektmanagement)
- Tasks/User Storys erstellen und zwischen Spalten schieben
- Existierende ScrumBoard-Komponente prufen ob erweitert werden kann

### 4.3 Shell-Simulator (Git)
- Simuliert ein Git-Projekt mit poshgit-artigen Befehlen
- Zeigt Ausgabe jedes Befehls
- Fortschritt: init → add → commit → branch → merge

### 4.4 Interaktive Merge-Konflikte (Git)
- Zeigt Konflikt in einer Datei mit <<<<<<< / ======= / >>>>>>>
- User lost den Konflikt manuell

### 4.5 RAID Disk-Ansicht (Computersysteme)
- Visuelle Darstellung mit Platten, Blöcken (A1, A2, P) wie in Lehrbuchern

### 4.6 Phishing-Detector Randomisierung (IT-Sicherheit)
- Zufallige Reihenfolge der Beispiele
- Quiz am Ende

---

## Phase 5: Cookie Clicker Mini-Game (neues Feature)

### 5.1 Konzept
- Kleines schwebendes Fenster das man auf der Seite hin- und herschieben kann
- AFK-fahig: generiert automatisch "Lernpunkte"
- Optional: Klick-Boni fur aktives Interagieren
- NICHT zeitlich eingeschrankt — man muss nicht lernen um zu spielen
- Verknupfung mit bestehenden Modulen (thematisch)

### 5.2 Features
- Eigene Bestenliste
- Erschaltbare Profilbilder
- Exklusive Rahmen
- Gamification-Layer uber dem eigentlichen Lernen

### 5.3 Technische Umsetzung
- Neue Komponente: `components/LearningClicker.tsx`
- Persistenz: Firestore (user-spezifisch)
- Floating Window mit Drag-Funktionalitat
- Auto-Ticker (setInterval) fur AFK-Punkte
- Klick-Handler fur Bonus-Punkte
- Shop-System fur Cosmetics

---

## Phase 6: Allgemeine Verbesserungen

### 6.1 Cross-Module Links
- Wenn im "Roten Faden" andere Module/Lektionen erwat werden, dorthin verlinken.
- Betroffene: Alle Lektionen mit Querverweisen

### 6.2 Tabellen-Header
- In allen Modulen: Tabellenuberschriften klar kennzeichnen (fett, farbig, etc.)

### 6.3 Feedback-System
- Sichere Funktion fur Nutzer-Feedback
- Nicht als Schwachstelle implementieren
- Nicht storend fur den Lernfluss

### 6.4 Dashboard: Abgeschlossene Module ausblenden
- Standardmassig ausgeblendet, Toggle zum Anzeigen

### 6.5 XP/Level-Anzeige mergen
- Beide zeigen im Grunde dasselbe — zusammenfuhren

### 6.6 Karteikarten-Export (Anki)
- Universelles Download-Format (Anki .apkg oder CSV)
- Nutzer kann Karteikarten fur eigenes System herunterladen

### 6.7 UX-Modul umbenennen
- "UX & Interaction Design" → "UI/UX Design"?

---

## Geschatzter Aufwand

| Phase | Aufwand | Prioritat |
|-------|---------|-----------|
| 1: Bugfixes | ~2-3h | Hoch |
| 2: Quiz-Qualitat | ~4-6h | Hoch |
| 3: TSX → Grafiken | ~15-20h | Mittel |
| 4: Interaktive Komponenten | ~10-15h | Mittel |
| 5: Cookie Clicker | ~8-12h | Niedrig |
| 6: Allgemeines | ~5-8h | Mittel |

**Gesamt: ~45-65h**

---

## Offene Fragen an Moritz

1. **Prioritat:** Welche Phase(s) zuerst? Oder alles nacheinander?
2. **Cookie Clicker:** Wie soll die Verknupfung mit Modulen aussehen? (z.B. Bonus-XP fur abgeschlossene Module?)
3. **UX → UI/UX:** Wirklich umbenennen?
4. **Grafiken:** SVG inline oder externe Bilder? (SVG ist flexibler, Bilder sind einfacher zu erstellen)
5. **Shell-Simulator:** Echtes Git oder nur Simulated Output?
6. **Feedback-System:** Email-Formular? In-App? Firebase-Collection?
7. **Scrum Board:** Erweitern oder neu bauen?
