import { Module } from "./types";

// ============================================================================
// IHK "Versionsmanagement mit Git" — Modul-Daten
// Quelle: IHK IT-Handbuch + Moritz' Mitschriften
// ============================================================================

export const gitModule: Module = {
  id: "ihk-git",
  slug: "ihk-git",
  title: "Versionsmanagement mit Git",
  description: "IHK IT-Handbuch: Git, Branching, Merging, Gitflow, Semantic Versioning, .gitignore, LFS, Commit-Conventionen",
  icon: "🔀",
  color: "#F05032",
  category: "ihk",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Versionsmanagement mit Git (IHK)

### Warum Versionsmanagement?
- Änderungen nachvollziehen (Wer? Wann? Warum?)
- Parallele Entwicklung (Branches)
- Zusammenarbeit im Team
- Jederzeit zurückkehren zu älteren Versionen

### Zentrale vs. Dezentrale VV
| | Zentral (SVN) | Dezentral (Git) |
|---|---|---|
| Repository | Ein Server | Jeder hat alles lokal |
| Offline | ❌ Nein | ✅ Ja |
| Konflikte | Beim Commit | Beim Merge |
| Tools | SVN, CVS, Perforce | Git, Mercurial |

### Optimistisches vs. Pessimistisches Locking
- **Optimistisch (Git):** Jeder darf arbeiten, Konflikte erst beim Merge
- **Pessimistisch (SVN/SAP):** Datei wird gesperrt, andere können nicht ändern

### Git-Befehle
- \`git clone\` — Repository kopieren
- \`git add\` — Änderungen stagen
- \`git commit -m "msg"\` — Änderungen speichern
- \`git push\` — Hochladen zum Remote
- \`git pull\` — Herunterladen + mergen
- \`git fetch\` — Nur herunterladen, nicht mergen
- \`git checkout -b name\` — Neuen Branch erstellen
- \`git merge branch\` — Branch zusammenführen
- \`git rebase branch\` — Commits neu basisieren
- \`git stash\` — Änderungen zwischenspeichern

### Gitflow
- **main** — Fertige Releases
- **dev** — Aktueller Entwicklungsstand
- **feature/*** — Neue Features
- **release/v*** — Release-Vorbereitung
- **hotfix*** — Schnelle Bugfixes

### Semantic Versioning: MAJOR.MINOR.PATCH
- **PATCH** — Bugfix, abwärtskompatibel
- **MINOR** — Neues Feature, abwärtskompatibel
- **MAJOR** — Breaking Change

### Commit-Regeln (Conventional Commits)
- Format: \`type(scope): beschreibung\`
- Typen: feat, fix, refactor, style, test, docs, chore
- Imperativ verwenden, max. 50 Zeichen`,

  lessons: [
    // --- Lektion 1: Warum Versionsmanagement? ---
    {
      id: "git-1",
      title: "Warum Versionsmanagement?",
      duration: "10 min",
      type: "text",
      content: `## Wozu Versionsmanagement?

Stell dir vor, du arbeitest an einem Projekt mit mehreren Entwicklern. Ohne Versionsmanagement chaos:

- 📧 Dateien per E-Mail tauschen — wer hat die neueste Version?
- 💾 USB-Sticks hin und her schieben
- 📁 \`Projekt_final_v2_wirklich_final_NEU.docx\` — jeder kennt das

> 💡 Versionsmanagement löst ALL diese Probleme — es ist wie ein **Zeitmaschine für deinen Code**.

---

## Die Probleme ohne VV

| Problem | Auswirkung |
|---------|-----------|
| 🔀 Gleichzeitige Bearbeitung | Änderungen gehen verloren |
| 📋 Keine Historie | Wer hat was geändert? |
| 🔙 Kein Zurück | Kaputter Code ist kaputter Code |
| 💰 Hoher Koordinationsaufstand | Meetings, Absprachen, Wartezeiten |

---

## Was Versionsmanagement kann

- 📝 **Jede Änderung dokumentieren** — Wer, Wann, Warum
- 🔀 **Parallele Entwicklung** — Jeder arbeitet an seinem Feature
- ⏪ **Jederzeit zurückkehren** — Zu jedem beliebigen Stand
- 🤝 **Zusammenarbeit** — Mehrere Entwickler gleichzeitig
- 🏷️ **Versionen markieren** — Releases sauber kennzeichnen

---

## 🎯 IHK-Tipp

> ❗ In der Prüfung wird oft gefragt: **Warum braucht man Versionsmanagement?** Nenne mindestens 3 Gründe!

- Änderungen nachvollziehen
- Parallele Entwicklung ermöglichen
- Rückfallmöglichkeit (Backup)
- Teamzusammenarbeit verbessern
- Konflikte erkennen und lösen`
    },

    // --- Lektion 2: Zentrale vs. Dezentrale VV ---
    {
      id: "git-2",
      title: "Zentrale vs. Dezentrale VV",
      duration: "12 min",
      type: "text",
      content: `## Zentrale vs. Dezentrale Versionsverwaltung

Es gibt zwei grundlegende Ansätze — und der Unterschied ist **prüfungsrelevant**!

---

## 🏢 Zentrale Versionsverwaltung

**Prinzip:** Ein zentrales Repository auf einem Server. Alle Entwickler arbeiten direkt damit.

| Merkmal | Beschreibung |
|---------|-------------|
| 📡 **Offline** | ❌ Nicht möglich — Serververbindung nötig |
| 🔒 **Konflikte** | Treten beim **Commit** auf |
| 🛠️ **Tools** | SVN (Subversion), CVS, Perforce |
| 👥 **Team** | Klare Kontrolle, gut für kleine Teams |

> ⚠️ **Problem:** Bei Serverausfall steht das gesamte Team still!

---

## 🌐 Dezentrale Versionsverwaltung

**Prinzip:** Jeder Entwickler hat eine **vollständige Kopie** des gesamten Repositorys inkl. Historie.

| Merkmal | Beschreibung |
|---------|-------------|
| 📡 **Offline** | ✅ Voll möglich — Commits, Branching, Merging |
| 🔀 **Konflikte** | Treten beim **Merge** auf |
| 🛠️ **Tools** | Git (GitHub, GitLab, Bitbucket), Mercurial |
| 👥 **Team** | Mehr Freiheit, unabhängige Arbeit |

> ✅ **Vorteil:** Kein Single Point of Failure — jeder hat alles lokal!

---

## ⚔️ Vergleich

| | 🏢 Zentral | 🌐 Dezentral |
|---|---|---|
| **Offline** | ❌ Nein | ✅ Ja |
| **Konflikte** | Beim Commit | Beim Merge |
| **Abhängigkeit** | Vom Server | Keine |
| **Flexibilität** | Eingeschränkt | Hoch |
| **Beispiel** | SVN, Perforce | Git, Mercurial |

---

## 🔒 Optimistisches vs. Pessimistisches Locking

Diese Strategien bestimmen, **wie mit parallelem Zugriff** umgegangen wird:

### Pessimistisches Locking (SVN, SAP)
- Eine Datei wird **gesperrt** bevor sie bearbeitet wird
- Andere können sie nur lesen, nicht ändern
- ✅ **Vorteil:** Keine Merge-Konflikte
- ❌ **Nachteil:** Blockaden, Wartezeiten

### Optimistisches Locking (Git)
- Jeder darf **zu jeder Zeit** alle Dateien bearbeiten
- Konflikte werden erst beim **Merge** erkannt
- ✅ **Vorteil:** Hohe Flexibilität, paralleles Arbeiten
- ❌ **Nachteil:** Merge-Konflikte müssen manuell gelöst werden

> 💡 **Merke:** Git arbeitet IMMER optimistisch! Das ist ein Feature, kein Bug.

---

## 🎯 IHK-Tipp

> ❗ **Typische Frage:** "Erklären Sie den Unterschied zwischen zentraler und dezentraler Versionsverwaltung!" — Nenne Vor- und Nachteile beider Ansätze.`
    },

    // --- Lektion 3: Git Grundlagen ---
    {
      id: "git-3",
      title: "Git Grundlagen & Befehle",
      duration: "20 min",
      type: "text",
      content: `## Git — Die wichtigsten Befehle

Git ist der **Industriestandard** für Versionsverwaltung. Hier sind die Befehle, die du kennen musst.

---

## 🏗️ Grundkonzepte

| Begriff | Beschreibung |
|---------|-------------|
| **Repository** | Der zentrale Speicherort für Code + Historie |
| **Remote** | Externe Version des Repos (z.B. GitLab, GitHub) |
| **Branch** | Parallele Entwicklungslinie |
| **Commit** | Ein gespeicherter Zustand des Codes |
| **Working Directory** | Dein lokaler Ordner mit den Dateien |
| **Staging Area** | Bereiche, die für den nächsten Commit vorgemerkt sind |

---

## 🔄 Der typische Workflow

\`\`\`
1. Code bearbeiten (Working Directory)
2. git add → Staging Area
3. git commit → Lokales Repository
4. git push → Remote Repository
\`\`\`

> 💡 **Merke:** Erst adden, dann committen — nicht umgekehrt!

---

## 📋 Die wichtigsten Befehle

### Repository erstellen
\`\`\`bash
git clone https://...    # Remote-Repo kopieren (einmalig)
git init                  # Neues lokales Repo erstellen
\`\`\`

### Änderungen speichern
\`\`\`bash
git add dateiname.txt    # Einzelne Datei stagen
git add .                # Alle Änderungen stagen
git status               # Was ist geändert?
git diff                 # Was genau wurde geändert?
git commit -m "Nachricht" # Änderungen speichern
git push                 # Zum Remote hochladen
\`\`\`

### Änderungen holen
\`\`\`bash
git fetch                # Nur herunterladen (ohne mergen)
git pull                 # Herunterladen + mergen
\`\`\`

### Branches
\`\`\`bash
git branch               # Lokale Branches anzeigen
git branch -a            # Alle Branches (lokal + remote)
git checkout -b name     # Neuen Branch erstellen + wechseln
git checkout name        # Zu Branch wechseln
git branch -d name       # Branch löschen
\`\`\`

### Merge & Rebase
\`\`\`bash
git merge branch-name    # Branch zusammenführen
git rebase branch-name   # Commits neu basisieren (lineare Historie)
\`\`\`

### Fehler korrigieren
\`\`\`bash
git restore dateiname    # Änderungen rückgängig machen
git stash                # Änderungen zwischenspeichern
git stash pop            # Gespeicherte Änderungen wiederherstellen
\`\`\`

---

## 🔀 Merge vs. Rebase

| | Merge | Rebase |
|---|---|---|
| **Historie** | Verschachtelt (Merge-Commit) | Linear |
| **Konflikte** | Einmal beim Merge | Pro Commit |
| **Use Case** | Feature in dev integrieren | Feature-Branch auf aktuell halten |

> ⚠️ **Regel:** Niemals einen öffentlichen Branch rebase! Nur lokale Branches.

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Erklären Sie den Unterschied zwischen git pull und git fetch!" — pull = fetch + merge. fetch lädt nur herunter, ohne lokale Branches zu verändern.`
    },

    // --- Lektion 4: Branching-Strategien ---
    {
      id: "git-4",
      title: "Gitflow & Branching-Strategien",
      duration: "15 min",
      type: "interactive",
      interactive: "gitBranchVisualizer",
      content: `## Gitflow — Ordnung im Branch-Chaos

Gitflow definiert **klare Regeln**, wann welcher Branch verwendet wird. Es ist eine der wichtigsten Strategien für Teams.

---

## 🌳 Die Gitflow-Branches

| Branch | Zweck | Lebensdauer |
|--------|-------|-------------|
| 🏷️ **main** | Fertige, produktive Releases | Permanent |
| 🔧 **dev** | Aktueller Entwicklungsstand | Permanent |
| ⭐ **feature/*** | Neue Features entwickeln | Temporär |
| 🚀 **release/v*** | Release vorbereiten | Temporär |
| 🔥 **hotfix*** | Schnelle Bugfixes für Produktion | Temporär |

---

## 🔄 Der Gitflow-Ablauf

### Feature entwickeln
\`\`\`
1. Von dev einen feature-Branch erstellen
2. Am Feature arbeiten (Commits)
3. Feature in dev mergen (Merge Request)
4. Feature-Branch löschen
\`\`\`

### Release vorbereiten
\`\`\`
1. Von dev einen release-Branch erstellen
2. Letzte Tests und Fixes
3. Release in main UND dev mergen
4. In main mit Version taggen (v1.0.0)
5. Release-Branch löschen
\`\`\`

### Hotfix (Notfall)
\`\`\`
1. Von main einen hotfix-Branch erstellen
2. Bugfix implementieren
3. Hotfix in main UND dev mergen
4. In main mit neuer Version taggen (v1.0.1)
5. Hotfix-Branch löschen
\`\`\`

---

## 📊 Visualisierung

\`\`\`
main:     ──●───────────●───────────●── (Releases)
             \\         / \\         /
hotfix:       \\       /   \\       /
               \\     /     \\     /
dev:    ──●───●───●───●───●───●───●── (Aktueller Stand)
               \\       /       \\
feature:        ●───●──           ●───●
\`\`\`

---

## 🏷️ Semantic Versioning

Jedes Release bekommt eine Version nach dem Schema **MAJOR.MINOR.PATCH**:

| Typ | Wann? | Beispiel |
|-----|-------|----------|
| **PATCH** (1.0.X) | Bugfix, abwärtskompatibel | 1.0.0 → 1.0.1 |
| **MINOR** (1.X.0) | Neues Feature, abwärtskompatibel | 1.0.0 → 1.1.0 |
| **MAJOR** (X.0.0) | Breaking Change | 1.0.0 → 2.0.0 |

> 💡 **Beispiel:** Version 2.3.1 = Major 2, Minor 3, Patch 1

### Vorveröffentlichungen
\`\`\`
1.0.0-alpha    # Alpha-Version (frühe Testversion)
1.0.0-beta     # Beta-Version (fast fertig)
1.0.0-rc.1     # Release Candidate (finale Testversion)
\`\`\`

---

## 🔨 Branching ausprobieren

[INTERACTIVE]

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Erklären Sie die Gitflow-Strategie!" — Benenne die Branches (main, dev, feature, release, hotfix) und deren Zweck. Erkläre den Ablauf eines Feature-Branches.`
    },

    // --- Lektion 5: Merge-Konflikte ---
    {
      id: "git-5",
      title: "Merge-Konflikte lösen",
      duration: "12 min",
      type: "text",
      content: `## Merge-Konflikte — Wenn Git nicht mehr weiterweiß

Merge-Konflikte entstehen, wenn **zwei Entwickler dieselbe Zeile** in derselben Datei geändert haben. Git kann dann nicht automatisch entscheiden, welche Version die richtige ist.

---

## 🔀 Wann entstehen Konflikte?

| Situation | Konflikt? |
|-----------|-----------|
| Verschiedene Dateien geändert | ❌ Nein — Git merged automatisch |
| Gleiche Datei, verschiedene Zeilen | ❌ Nein — Git merged automatisch |
| Gleiche Datei, gleiche Zeilen | ✅ **Ja — Merge-Konflikt!** |

---

## 🔧 Merge-Konflikt lösen (Schritt für Schritt)

### 1. Merge starten
\`\`\`bash
git checkout dev
git merge feature/neues-feature
# Auto-merging datei.ts
# CONFLICT (content): Merge conflict in datei.ts
\`\`\`

### 2. Konflikte anzeigen
\`\`\`bash
git status
# Both modified: datei.ts
\`\`\`

### 3. Konflikt in der Datei finden
\`\`\`
<<<<<<< HEAD
// Code aus dem aktuellen Branch (dev)
const x = 1;
=======
// Code aus dem gemergten Branch (feature)
const x = 2;
>>>>>>> feature/neues-feature
\`\`\`

### 4. Manuell entscheiden
- Welchen Code willst du behalten?
- Oder eine Kombination beider?
- Die Konfliktmarker (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`) **entfernen**!

### 5. Konflikt als gelöst markieren
\`\`\`bash
git add datei.ts
git commit -m "Merge-Konflikt in datei.ts gelöst"
\`\`\`

---

## 🛡️ Konflikte vermeiden

- 🔄 **Häufig pullen** — Hole regelmäßig die neuesten Änderungen
- 📦 **Kleine Commits** — Weniger Änderungen = weniger Konfliktpotenzial
- 💬 **Kommunikation** — Sag dem Team, an welchen Dateien du arbeitest
- 🌿 **Kurzlebige Branches** — Je länger ein Branch existiert, desto mehr Konflikte

---

## 🔀 Merge vs. Rebase bei Konflikten

| | Merge | Rebase |
|---|---|---|
| **Konflikte** | Einmal beim Merge | Pro Commit |
| **Historie** | Merge-Commit sichtbar | Linear |
| **Lösung** | Alle Konflikte auf einmal | Schritt für Schritt |

### Rebase-Workflow bei Konflikten
\`\`\`bash
git checkout feature/mein-feature
git rebase dev
# Konflikt lösen → git add → git rebase --continue
# Bei Problemen: git rebase --abort
\`\`\`

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Wie löst man einen Merge-Konflikt?" — Schritt für Schritt erklären: Konfliktmarker finden, Code manuell anpassen, als gelöst markieren, committen.`
    },

    // --- Lektion 6: Commit-Conventionen ---
    {
      id: "git-6",
      title: "Richtig committen — Conventional Commits",
      duration: "12 min",
      type: "text",
      content: `## Richtig committen

Ein Commit dokumentiert eine **abgeschlossene, sinnvolle Änderung**. Die Commit-Nachricht erklärt, WARUM die Änderung gemacht wurde — nicht nur WAS.

---

## 📝 Grundregel

> **Ein Commit = eine logische Änderung**
> - ✅ Gut: Bugfix ODER Feature ODER Refactoring
> - ❌ Schlecht: Alles zusammen in einem Commit

---

## 🏷️ Conventional Commits

Das empfohlene Format:

\`\`\`
<type>(<scope>): <kurze Beschreibung>

<optional: Erklärung WARUM>
\`\`\`

### Commit-Typen

| Typ | Bedeutung | Beispiel |
|-----|-----------|----------|
| **feat** | Neues Feature | feat(login): Benutzer registrieren |
| **fix** | Bugfix | fix(api): NullPointer bei leerer Response behoben |
| **refactor** | Umstrukturierung | refactor(order): Logik in Service ausgelagert |
| **style** | Formatierung | style: Einrückung korrigiert |
| **test** | Tests | test(login): Unit-Tests für Validierung |
| **docs** | Dokumentation | docs: README aktualisiert |
| **chore** | Build/Config | chore: Dependencies aktualisiert |

---

## ✅ Regeln für gute Commits

1. **Erste Zeile:** Max. 50 Zeichen
2. **Imperativ verwenden:** "add", "fix", "remove" (nicht "added", "fixed")
3. **Kein Punkt** am Ende
4. **Warum erklären** — nicht nur WAS

### Gut ✅
\`\`\`
fix(cart): entferne doppelte Produkte

Validierung ergänzt, damit keine doppelten Einträge
mehr im Warenkorb landen.
\`\`\`

### Schlecht ❌
\`\`\`
stuff fix änderungen
\`\`\`

---

## 📊 Beispiel einer sauberen Historie

\`\`\`
feat(product): Produktliste anzeigen
feat(product): Produktsuche hinzufügen
fix(product): Leere Liste korrekt behandeln
refactor(product): Komponentenstruktur verbessern
\`\`\`

> 💡 **Merke:** Ein guter Commit erklärt, WARUM etwas geändert wurde — nicht nur WAS.

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was macht einen guten Commit aus?" — Eine logische Änderung, aussagekräftige Nachricht im Imperativ, Warum erklären, max. 50 Zeichen erste Zeile.`
    },

    // --- Lektion 7: .gitignore & LFS ---
    {
      id: "git-7",
      title: ".gitignore & Git LFS",
      duration: "10 min",
      type: "text",
      content: `## .gitignore — Dateien ausschließen

Nicht alles gehört in ein Git-Repository! Automatisch generierte Dateien, Abhängigkeiten und Geheimnisse sollten **ignoriert** werden.

---

## 📁 Was sollte ignoriert werden?

| Kategorie | Beispiele |
|-----------|-----------|
| 🔧 **Build-Artefakte** | \`build/\`, \`dist/\`, \`*.o\`, \`*.class\` |
| 📦 **Abhängigkeiten** | \`node_modules/\`, \`__pycache__/\`, \`venv/\` |
| 🔑 **Geheimnisse** | \`.env\`, \`*.key\`, \`credentials.json\` |
| 🖥️ **IDE-Dateien** | \`.idea/\`, \`.vscode/\`, \`*.swp\` |
| 📝 **Logs** | \`*.log\`, \`logs/\` |

---

## 📝 .gitignore-Datei erstellen

\`\`\`bash
# Im Projektordner eine .gitignore Datei erstellen
touch .gitignore
\`\`\`

### Beispiel .gitignore (Python)
\`\`\`
# Byte-compiled
__pycache__/
*.py[cod]

# Virtual environments
venv/
.env

# IDE
.idea/
.vscode/

# Logs
*.log
\`\`\`

### Beispiel .gitignore (Node.js)
\`\`\`
node_modules/
dist/
.env
*.log
\`\`\`

> 💡 **Tipp:** Auf [gitignore.io](https://www.toptal.com/developers/gitignore) kann man sich .gitignore-Dateien für verschiedene Sprachen generieren lassen!

---

## 📦 Git LFS (Large File Storage)

Git ist gut bei **textbasierten Dateien**. Bilder, Videos und andere große Dateien können schnell viel Speicher belegen — hier kommt **Git LFS** ins Spiel.

### Das Problem
\`\`\`
Ohne LFS: Jede Version einer 100MB-Datei wird gespeichert
→ Bei 10 Versionen = 1GB Speicher!
\`\`\`

### Die Lösung mit LFS
\`\`\`
Mit LFS: Nur ein Pointer wird gespeichert
→ Die große Datei wird nur bei Bedarf heruntergeladen
\`\`\`

### Git LFS verwenden
\`\`\`bash
# LFS installieren
git lfs install

# Dateitypen tracken
git lfs track "*.jpg"
git lfs track "*.mp4"
git lfs track "*.psd"

# .gitattributes wird erstellt → nicht vergessen zu committen!
git add .gitattributes
git commit -m "chore: Git LFS für Bilder konfiguriert"
\`\`\`

### .gitattributes (automatisch erstellt)
\`\`\`
*.jpg filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
\`\`\`

> ⚠️ **Wichtig:** LFS muss **vor** dem Hinzufügen großer Dateien konfiguriert werden!

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was ist der Zweck von .gitignore?" — Dateien vom Tracking ausschließen, die nicht im Repository sein sollten (Build-Artefakte, Abhängigkeiten, Geheimnisse).`
    },

    // --- Lektion 8: Git Stash & Restore ---
    {
      id: "git-8",
      title: "Git Stash & Restore",
      duration: "10 min",
      type: "text",
      content: `## Git Stash — Änderungen zwischenspeichern

Du arbeitest an einem Feature, aber musst **dringend** einen Bugfix auf einem anderen Branch machen? Git Stash speichert deine Änderungen temporär.

---

## 📦 Stash verwenden

### Änderungen stashen
\`\`\`bash
git stash
# "Saved working directory and index state WIP on feature: abc1234"

# Mit Beschreibung
git stash push -m "Feature Login halb fertig"
\`\`\`

### Gespeicherte Stashes anzeigen
\`\`\`bash
git stash list
# stash@{0}: On feature: Feature Login halb fertig
# stash@{1}: WIP on feature: abc1234
\`\`\`

### Stash wiederherstellen
\`\`\`bash
git stash pop       # Letzten Stash anwenden UND löschen
git stash apply     # Letzten Stash anwenden (bleibt erhalten)
git stash apply stash@{1}  # Bestimmten Stash anwenden
\`\`\`

### Stash löschen
\`\`\`bash
git stash drop      # Letzten Stash löschen
git stash clear     # Alle Stashes löschen
\`\`\`

---

## 🔄 Typischer Workflow mit Stash

\`\`\`
1. Du arbeitest an feature/login
2. Chef ruft: "Bug in Produktion! Sofort fixen!"
3. git stash push -m "Login halb fertig"
4. git checkout main
5. git checkout -b hotfix/bug-123
6. Bugfix machen, committen, pushen
7. git checkout feature/login
8. git stash pop
9. Weiterarbeiten!
\`\`\`

---

## 🔙 git restore — Änderungen rückgängig machen

### Datei aus dem letzten Commit wiederherstellen
\`\`\`bash
git restore dateiname.txt   # Änderungen verwerfen
\`\`\`

### Datei aus der Staging Area entfernen
\`\`\`bash
git restore --staged dateiname.txt   # Unstagen
\`\`\`

### Bestimmte Version wiederherstellen
\`\`\`bash
git restore --source=HEAD~2 dateiname.txt  # Version von 2 Commits zurück
\`\`\`

---

## 📋 Zusammenfassung

| Befehl | Zweck |
|--------|-------|
| \`git stash\` | Änderungen temporär speichern |
| \`git stash pop\` | Stash anwenden + löschen |
| \`git stash apply\` | Stash anwenden (bleibt) |
| \`git stash list\` | Alle Stashes anzeigen |
| \`git restore\` | Änderungen verwerfen |
| \`git restore --staged\` | Aus Staging entfernen |

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Wann verwendet man git stash?" — Wenn man unvollständige Änderungen zwischenspeichern muss, um auf einem anderen Branch zu arbeiten.`
    },

    // --- Lektion 9: Quiz ---
    {
      id: "git-9",
      title: "Wissenstest: Git & Versionsmanagement",
      duration: "15 min",
      type: "quiz",
      content: `## 🎯 Quiz: Versionsmanagement mit Git

Teste dein Wissen über Git und Versionsmanagement!`,
    },
  ],
};

// ─── Quizfragen ─────────────────────────────────────────────────────────────

export const gitQuizQuestions = [
  {
    question: "Was ist der Hauptunterschied zwischen zentraler und dezentraler Versionsverwaltung?",
    type: "multiple" as const,
    options: [
      "Zentrale VV benötigt keinen Server",
      "Dezentrale VV gibt jedem Entwickler eine vollständige Kopie des Repositorys",
      "Zentrale VV kann keine Branches erstellen",
      "Dezentrale VV funktioniert nur mit Git",
    ],
    correct: 1,
    explanation: "Bei dezentraler VV hat jeder Entwickler eine vollständige Kopie inkl. Historie. Bei zentraler VV gibt es nur ein Repository auf dem Server.",
  },
  {
    question: "Was macht 'git fetch'?",
    type: "multiple" as const,
    options: [
      "Lädt Änderungen herunter und merged sie automatisch",
      "Lädt nur Änderungen herunter, ohne sie zu mergen",
      "Erstellt einen neuen Branch",
      "Löscht remote Branches",
    ],
    correct: 1,
    explanation: "git fetch aktualisiert nur den lokalen Stand des Remote-Repositorys, ohne die lokalen Branches zu verändern. git pull = git fetch + git merge.",
  },
  {
    question: "Was bedeutet Semantic Versioning 2.1.0?",
    type: "multiple" as const,
    options: [
      "MAJOR 2, MINOR 1, PATCH 0 — Neues Feature, abwärtskompatibel",
      "MAJOR 2, MINOR 0, PATCH 1 — Bugfix",
      "MAJOR 1, MINOR 2, PATCH 0 — Breaking Change",
      "MAJOR 0, MINOR 1, PATCH 2 — Erste Version",
    ],
    correct: 0,
    explanation: "2.1.0 = Major 2 (Breaking Changes in der Historie), Minor 1 (neues Feature), Patch 0 (kein Bugfix). Minor-Inkrement = abwärtskompatibles neues Feature.",
  },
  {
    question: "Welcher Branch ist in Gitflow für die produktive Version zuständig?",
    type: "multiple" as const,
    options: [
      "dev",
      "feature/*",
      "main",
      "release/*",
    ],
    correct: 2,
    explanation: "In Gitflow ist 'main' der produktive Branch mit fertigen Releases. 'dev' ist der Entwicklungsstand, 'feature/*' für neue Features, 'release/*' für Release-Vorbereitung.",
  },
  {
    question: "Was passiert bei einem Merge-Konflikt?",
    type: "multiple" as const,
    options: [
      "Git überschreibt automatisch die ältere Version",
      "Git kann nicht automatisch entscheiden und markiert die Konfliktstellen",
      "Der Merge wird abgebrochen",
      "Git erstellt einen neuen Branch",
    ],
    correct: 1,
    explanation: "Bei einem Merge-Konflikt markiert Git die Konfliktstellen mit <<<<<<<, ======= und >>>>>>>. Der Entwickler muss manuell entscheiden, welcher Code übernommen wird.",
  },
  {
    question: "Was macht pessimistisches Locking?",
    type: "multiple" as const,
    options: [
      "Erlaubt parallele Bearbeitung ohne Einschränkungen",
      "Sperrt eine Datei, bevor sie bearbeitet wird",
      "Löst Konflikte automatisch beim Merge",
      "Erstellt automatisch Branches",
    ],
    correct: 1,
    explanation: "Pessimistisches Locking sperrt eine Datei vor der Bearbeitung. Andere können sie nur lesen, nicht ändern. Das verhindert Konflikte, blockiert aber die parallele Arbeit.",
  },
  {
    question: "Was ist der Zweck von .gitignore?",
    type: "multiple" as const,
    options: [
      "Dateien vom Tracking ausschließen",
      "Git-Befehle ignorieren",
      "Branches verstecken",
      "Commits rückgängig machen",
    ],
    correct: 0,
    explanation: ".gitignore schließt Dateien und Verzeichnisse vom Git-Tracking aus — z.B. Build-Artefakte, Abhängigkeiten, Geheimnisse.",
  },
  {
    question: "Was macht Git LFS?",
    type: "multiple" as const,
    options: [
      "Beschleigt Git-Befehle",
      "Speichert große Dateien effizient mit Pointern",
      "Erstellt automatisch Branches",
      "Verschlüsselt das Repository",
    ],
    correct: 1,
    explanation: "Git LFS (Large File Storage) speichert große Dateien (Bilder, Videos) effizient, indem nur Pointer im Repository gespeichert werden. Die Dateien werden bei Bedarf heruntergeladen.",
  },
  {
    question: "Was ist der Unterschied zwischen git merge und git rebase?",
    type: "multiple" as const,
    options: [
      "Merge erstellt einen Merge-Commit, Rebase erzeugt eine lineare Historie",
      "Merge funktioniert nur lokal, Rebase nur remote",
      "Merge löscht den alten Branch, Rebase behält ihn",
      "Es gibt keinen Unterschied",
    ],
    correct: 0,
    explanation: "Merge verschmilzt zwei Branches mit einem Merge-Commit (verschachtelte Historie). Rebase verschiebt Commits auf eine neue Basis (lineare Historie).",
  },
  {
    question: "Was beschreibt Conventional Commits?",
    type: "multiple" as const,
    options: [
      "Ein Format für Commit-Nachrichten: type(scope): beschreibung",
      "Eine Methode zum Mergen von Branches",
      "Ein Tool für automatische Deployments",
      "Eine Git-Extension für große Dateien",
    ],
    correct: 0,
    explanation: "Conventional Commits definiert ein Format für Commit-Nachrichten: type(scope): beschreibung. Typen sind feat, fix, refactor, style, test, docs, chore.",
  },
];

// ─── Kategorien ─────────────────────────────────────────────────────────────

export const gitCategories = [
  {
    id: "git",
    name: "Versionsmanagement",
    icon: "🔀",
    description: "Git, Branching, Merging, Gitflow, Semantic Versioning",
  },
];
