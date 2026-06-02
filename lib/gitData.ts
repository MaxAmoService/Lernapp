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

### Zentrale vs. Dezentrale Versionsverwaltung (VV)
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
- Format: \`type(scope): description\`
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

> In diesem Modul lernst du Versionsverwaltung mit Git kennen — von den Grundlagen über die Befehle bis zu professionellen Workflows mit Gitflow. Die IHK prüft das regelmäßig — sowohl theoretisch (zentral vs. dezentral) als auch praktisch.

Stell dir vor, du arbeitest an einem Projekt mit mehreren Entwicklern. Ohne Versionsmanagement chaos:

- 📧 Dateien per E-Mail tauschen — wer hat die neueste Version?
- 💾 USB-Sticks hin und her schieben
- 📁 \`Projekt_final_v2_wirklich_final_NEU.docx\` — jeder kennt das

> 💡 Versionsmanagement löst ALL diese Probleme — es ist wie ein **Zeitmaschine für deinen Code**.

---

## Die Probleme ohne Versionsverwaltung (VV)

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

> 💡 **IHK-Tipp:** In der Prüfung wird oft gefragt: **Warum braucht man Versionsmanagement?** Nenne mindestens 3 Gründe!

- Änderungen nachvollziehen
- Parallele Entwicklung ermöglichen
- Rückfallmöglichkeit (Backup)
- Teamzusammenarbeit verbessern
- Konflikte erkennen und lösen

---

> Jetzt wo du weißt, WARUM Versionsmanagement wichtig ist, schauen wir uns die zwei grundlegenden Ansätze an: zentrale vs. dezentrale Versionsverwaltung — und warum Git sich durchgesetzt hat.`
    },

    // --- Lektion 2: Zentrale vs. Dezentrale VV ---
    {
      id: "git-2",
      title: "Zentrale vs. Dezentrale VV",
      duration: "12 min",
      type: "text",
      content: `## Zentrale vs. Dezentrale Versionsverwaltung (VV)

> In der letzten Lektion haben wir gelernt, WARUM Versionsmanagement wichtig ist. Jetzt schauen wir uns die zwei grundlegenden Ansätze an — und warum Git (dezentral) sich gegen SVN (zentral) durchgesetzt hat.

**VV** steht für **Versionsverwaltung** — der Überbegriff für Systeme, die Änderungen an Dateien über die Zeit nachverfolgen.

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

> 💡 **IHK-Tipp:** "Erklären Sie den Unterschied zwischen zentraler und dezentraler Versionsverwaltung!" — Nenne Vor- und Nachteile beider Ansätze.

---

> Jetzt kennst du den Unterschied zwischen zentral und dezentral. In der nächsten Lektion lernst du die konkreten Git-Befehle kennen, die du im Alltag brauchst — von git clone bis git merge.`
    },

    // --- Lektion 3: Git Grundlagen ---
    {
      id: "git-3",
      title: "Git Grundlagen & Befehle",
      duration: "20 min",
      type: "interactive",
      interactive: "gitShellSimulator",
      content: `## Git — Die wichtigsten Befehle

> In der letzten Lektion haben wir zentrale und dezentrale VV verglichen. Jetzt wird es praktisch: Du lernst die wichtigsten Git-Befehle kennen, mit denen du im Alltag arbeitest.

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

<svg viewBox="0 0 680 100" xmlns="http://www.w3.org/2000/svg" style="max-width:680px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="680" height="100" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="15" y="25" width="120" height="50" rx="8" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="75" y="46" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">Working Dir</text>
  <text x="75" y="62" text-anchor="middle" fill="#64748b" font-size="8">Code bearbeiten</text>
  <text x="75" y="18" text-anchor="middle" fill="#94a3b8" font-size="8">💻</text>
  <polygon points="140,50 158,42 158,58" fill="#64748b"/>
  <text x="149" y="38" text-anchor="middle" fill="#64748b" font-size="7">add</text>
  <rect x="165" y="25" width="120" height="50" rx="8" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="225" y="46" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">Staging Area</text>
  <text x="225" y="62" text-anchor="middle" fill="#64748b" font-size="8">git add</text>
  <text x="225" y="18" text-anchor="middle" fill="#94a3b8" font-size="8">📋</text>
  <polygon points="290,50 308,42 308,58" fill="#64748b"/>
  <text x="299" y="38" text-anchor="middle" fill="#64748b" font-size="7">commit</text>
  <rect x="315" y="25" width="140" height="50" rx="8" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1.5"/>
  <text x="385" y="46" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">Lokales Repo</text>
  <text x="385" y="62" text-anchor="middle" fill="#64748b" font-size="8">git commit</text>
  <text x="385" y="18" text-anchor="middle" fill="#94a3b8" font-size="8">🗄️</text>
  <polygon points="460,50 478,42 478,58" fill="#64748b"/>
  <text x="469" y="38" text-anchor="middle" fill="#64748b" font-size="7">push</text>
  <rect x="485" y="25" width="140" height="50" rx="8" fill="#8b5cf6" fill-opacity="0.2" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="555" y="46" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">Remote Repo</text>
  <text x="555" y="62" text-anchor="middle" fill="#64748b" font-size="8">git push</text>
  <text x="555" y="18" text-anchor="middle" fill="#94a3b8" font-size="8">☁️</text>
  <text x="640" y="50" text-anchor="middle" fill="#94a3b8" font-size="8">GitHub</text>
</svg>

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

> 💡 **IHK-Tipp:** "Erklären Sie den Unterschied zwischen git pull und git fetch!" — pull = fetch + merge. fetch lädt nur herunter, ohne lokale Branches zu verändern.

[INTERACTIVE]

---

> Du kennst jetzt die einzelnen Befehle. Aber wie organisiert man ein ganzes Team-Projekt mit Branches? In der nächsten Lektion lernst du Gitflow kennen — die wichtigste Branching-Strategie.`
    },

    // --- Lektion 4: Branching-Strategien ---
    {
      id: "git-4",
      title: "Gitflow & Branching-Strategien",
      duration: "15 min",
      type: "interactive",
      interactive: "gitBranchVisualizer",
      visuals: [{ type: "gitflow", position: "top" }],
      content: `## Gitflow — Ordnung im Branch-Chaos

> In der letzten Lektion hast du die einzelnen Git-Befehle kennengelernt. Jetzt schauen wir uns an, wie man mit einer **Branching-Strategie** wie Gitflow Ordnung ins Chaos bringt — denn ohne klare Regeln wird es bei mehreren Entwicklern schnell unübersichtlich.

> Gitflow mit seinen definierten Phasen (Feature, Release, Hotfix) erinnert an die DIN 69901-Phasen im Modul "Projektmanagement" — auch dort geht es um strukturierte Abläufe.

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
1. Von dev einen feature/-Branch erstellen
2. Am Feature arbeiten (Commits)
3. Feature in dev mergen (Merge Request)
4. Feature-Branch löschen

### Release vorbereiten
1. Von dev einen release/-Branch erstellen
2. Letzte Tests und Fixes
3. Release in main UND dev mergen
4. In main mit Version taggen (v1.0.0)
5. Release-Branch löschen

### Hotfix (Notfall)
1. Von main einen hotfix/-Branch erstellen
2. Bugfix implementieren
3. Hotfix in main UND dev mergen
4. In main mit neuer Version taggen (v1.0.1)
5. Hotfix-Branch löschen

---

## 📊 Visualisierung

<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" style="max-width:700px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="700" height="200" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <!-- main branch -->
  <text x="30" y="40" fill="#94a3b8" font-size="11" font-weight="bold">main</text>
  <line x1="60" y1="40" x2="640" y2="40" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
  <circle cx="120" cy="40" r="7" fill="#ef4444" stroke="#fff" stroke-width="1.5"/>
  <circle cx="350" cy="40" r="7" fill="#ef4444" stroke="#fff" stroke-width="1.5"/>
  <circle cx="580" cy="40" r="7" fill="#ef4444" stroke="#fff" stroke-width="1.5"/>
  <text x="120" y="28" text-anchor="middle" fill="#fca5a5" font-size="9">v1.0.0</text>
  <text x="350" y="28" text-anchor="middle" fill="#fca5a5" font-size="9">v1.1.0</text>
  <text x="580" y="28" text-anchor="middle" fill="#fca5a5" font-size="9">v1.2.0</text>
  <!-- dev branch -->
  <text x="30" y="100" fill="#94a3b8" font-size="11" font-weight="bold">dev</text>
  <line x1="60" y1="100" x2="640" y2="100" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
  <circle cx="100" cy="100" r="6" fill="#3b82f6"/>
  <circle cx="180" cy="100" r="6" fill="#3b82f6"/>
  <circle cx="280" cy="100" r="6" fill="#3b82f6"/>
  <circle cx="400" cy="100" r="6" fill="#3b82f6"/>
  <circle cx="500" cy="100" r="6" fill="#3b82f6"/>
  <circle cx="600" cy="100" r="6" fill="#3b82f6"/>
  <!-- feature branch -->
  <text x="30" y="150" fill="#94a3b8" font-size="11" font-weight="bold">feature</text>
  <line x1="100" y1="100" x2="100" y2="150" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,3"/>
  <line x1="100" y1="150" x2="220" y2="150" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="220" y1="150" x2="220" y2="100" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,3"/>
  <circle cx="140" cy="150" r="5" fill="#22c55e"/>
  <circle cx="190" cy="150" r="5" fill="#22c55e"/>
  <!-- feature 2 -->
  <line x1="400" y1="100" x2="400" y2="150" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,3"/>
  <line x1="400" y1="150" x2="520" y2="150" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="520" y1="150" x2="520" y2="100" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,3"/>
  <circle cx="440" cy="150" r="5" fill="#22c55e"/>
  <circle cx="490" cy="150" r="5" fill="#22c55e"/>
  <!-- release branch -->
  <text x="30" y="180" fill="#94a3b8" font-size="11" font-weight="bold">release</text>
  <line x1="280" y1="100" x2="280" y2="180" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,3"/>
  <line x1="280" y1="180" x2="360" y2="180" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="360" y1="180" x2="360" y2="40" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,3"/>
  <circle cx="310" cy="180" r="5" fill="#f59e0b"/>
  <!-- merge arrows -->
  <path d="M220,100 Q220,70 120,40" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrow)"/>
  <path d="M520,100 Q520,70 350,40" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,3"/>
  <defs><marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#22c55e"/></marker></defs>
  <text x="650" y="40" fill="#94a3b8" font-size="9">(Releases)</text>
  <text x="650" y="100" fill="#94a3b8" font-size="9">(Entwicklung)</text>
</svg>

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

| Version | Bedeutung |
|---------|-----------|
| 1.0.0-alpha | Alpha-Version (frühe Testversion) |
| 1.0.0-beta | Beta-Version (fast fertig) |
| 1.0.0-rc.1 | Release Candidate (finale Testversion) |

---

## 🔨 Branching ausprobieren

[INTERACTIVE]

---

> 💡 **IHK-Tipp:** "Erklären Sie die Gitflow-Strategie!" — Benenne die Branches (main, dev, feature, release, hotfix) und deren Zweck. Erkläre den Ablauf eines Feature-Branches.

---

> Gitflow bringt Ordnung — aber was passiert, wenn zwei Entwickler dieselbe Datei ändern? In der nächsten Lektion lösen wir Merge-Konflikte Schritt für Schritt.`
    },

    // --- Lektion 5: Merge-Konflikte ---
    {
      id: "git-5",
      title: "Merge-Konflikte lösen",
      duration: "12 min",
      type: "interactive",
      interactive: "mergeConflictResolver",
      content: `## Merge-Konflikte — Wenn Git nicht mehr weiterweiß

> In der letzten Lektion hast du gelernt, wie man mit Gitflow Branches strategisch einsetzt. Aber was passiert, wenn zwei Entwickler dieselbe Zeile ändern? Jetzt lernst du, wie Merge-Konflikte entstehen und wie du sie löst.

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
git commit -m "resolve merge conflict in file.ts"
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

[INTERACTIVE]

> 💡 **IHK-Tipp:** "Wie löst man einen Merge-Konflikt?" — Schritt für Schritt erklären: Konfliktmarker finden, Code manuell anpassen, als gelöst markieren, committen.

---

> Konflikte lösen ist wichtig — aber noch besser ist es, sie zu vermeiden. In der nächsten Lektion lernst du, wie gute Commit-Nachrichten und Conventional Commits die Zusammenarbeit verbessern.`
    },

    // --- Lektion 6: Commit-Conventionen ---
    {
      id: "git-6",
      title: "Richtig committen — Conventional Commits",
      duration: "12 min",
      type: "text",
      content: `## Richtig committen

> In der letzten Lektion hast du Merge-Konflikte kennengelernt. Jetzt schauen wir uns an, wie du durch **saubere Commits** die Zusammenarbeit im Team verbessern kannst — denn gute Commit-Nachrichten sind die Basis für eine nachvollziehbare Historie.

> Saubere Commits und Versionsnummern spielen auch im Modul "Projektmanagement" eine Rolle — dort bei der Release-Planung und Dokumentation.

Ein Commit dokumentiert eine **abgeschlossene, sinnvolle Änderung**. Die Commit-Nachricht erklärt, WARUM die Änderung gemacht wurde — nicht nur WAS.

---

## 📝 Grundregel

> **Ein Commit = eine logische Änderung**
> - ✅ Gut: Bugfix ODER Feature ODER Refactoring
> - ❌ Schlecht: Alles zusammen in einem Commit

---

## 🏷️ Conventional Commits

Das empfohlene Format:

\`\`\`text
<type>(<scope>): <short description>

<optional: explanation WHY>
\`\`\`

### Commit-Typen

| Typ | Bedeutung | Beispiel |
|-----|-----------|----------|
| **feat** | Neues Feature | feat(login): add user registration |
| **fix** | Bugfix | fix(api): handle null response gracefully |
| **refactor** | Umstrukturierung | refactor(order): extract service layer |
| **style** | Formatierung | style: fix indentation |
| **test** | Tests | test(login): add validation unit tests |
| **docs** | Dokumentation | docs: update README |
| **chore** | Build/Config | chore: update dependencies |

---

## ✅ Regeln für gute Commits

1. **Erste Zeile:** Max. 50 Zeichen
2. **Imperativ verwenden:** "add", "fix", "remove" (nicht "added", "fixed")
3. **Kein Punkt** am Ende
4. **Warum erklären** — nicht nur WAS

### Gut ✅
\`\`\`
fix(cart): remove duplicate products

Add validation to prevent duplicate entries
from being added to the shopping cart.
\`\`\`

### Schlecht ❌
\`\`\`
stuff fix changes
\`\`\`

---

## 📊 Beispiel einer sauberen Historie

\`\`\`
feat(product): display product list
feat(product): add product search
fix(product): handle empty list correctly
refactor(product): improve component structure
\`\`\`

> 💡 **Merke:** Ein guter Commit erklärt, WARUM etwas geändert wurde — nicht nur WAS.

---

> 💡 **IHK-Tipp:** "Was macht einen guten Commit aus?" — Eine logische Änderung, aussagekräftige Nachricht im Imperativ, Warum erklären, max. 50 Zeichen erste Zeile.

---

> Jetzt weißt du, wie man richtig committet. Aber was gehört NICHT in ein Repository? In der nächsten Lektion lernst du gitignore und Git LFS kennen.`
    },

    // --- Lektion 7: .gitignore & LFS ---
    {
      id: "git-7",
      title: ".gitignore & Git LFS",
      duration: "10 min",
      type: "text",
      content: `## .gitignore — Dateien ausschließen

> In der letzten Lektion hast du gelernt, wie man sauber committet. Jetzt schauen wir uns die andere Seite an: Was sollte man **nicht** ins Repository packen? \`.gitignore\` und Git LFS helfen dir dabei.

> Geheimnisse wie API-Keys und Passwörter dürfen nie im Repository landen — das Thema Sicherheit behandeln wir auch im Modul "IT-Sicherheit".

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
\`\`\`gitignore
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
\`\`\`gitignore
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
> Ohne LFS: Jede Version einer 100MB-Datei wird gespeichert → Bei 10 Versionen = **1GB Speicher!**

### Die Lösung mit LFS
> Mit LFS: Nur ein **Pointer** wird gespeichert → Die große Datei wird nur bei Bedarf heruntergeladen.

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
git commit -m "chore: configure Git LFS for images"
\`\`\`

### .gitattributes (automatisch erstellt)
\`\`\`gitattributes
*.jpg filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
\`\`\`

> ⚠️ **Wichtig:** LFS muss **vor** dem Hinzufügen großer Dateien konfiguriert werden!

---

> 💡 **IHK-Tipp:** "Was ist der Zweck von .gitignore?" — Dateien vom Tracking ausschließen, die nicht im Repository sein sollten (Build-Artefakte, Abhängigkeiten, Geheimnisse).

---

> Du weißt jetzt, was ins Repository gehört und was nicht. In der nächsten Lektion lernst du git stash und git restore kennen — zwei Befehle für den Notfall.`
    },

    // --- Lektion 8: Git Stash & Restore ---
    {
      id: "git-8",
      title: "Git Stash & Restore",
      duration: "10 min",
      type: "text",
      content: `## Git Stash — Änderungen zwischenspeichern

> In der letzten Lektion hast du gitignore und Git LFS kennengelernt. Jetzt lernst du zwei praktische Befehle für den Alltag: git stash zum Zwischenspeichern und git restore zum Rückgängig machen.

> Der Stash-Workflow (Feature unterbrechen, Hotfix machen, weiterarbeiten) zeigt, wie wichtig gute Branching-Strategien sind — das haben wir in der Gitflow-Lektion besprochen.

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

\`\`\`bash
# 1. Du arbeitest an feature/login
# 2. Chef ruft: "Bug in Produktion! Sofort fixen!"

# Änderungen stashen
git stash push -m "Login halb fertig"

# Auf main wechseln und Hotfix-Branch erstellen
git checkout main
git checkout -b hotfix/bug-123

# Bugfix machen, committen, pushen
# ... git add, commit, push ...

# Zurück zum Feature und Stash wiederherstellen
git checkout feature/login
git stash pop
# Weiterarbeiten!
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

## Zusammenfassung

In dieser Lektion hast du zwei wichtige Werkzeuge für den Alltag kennengelernt:

- **git stash** speichert unvollständige Änderungen temporär, damit du schnell den Branch wechseln kannst (z.B. für einen Hotfix)
- **git restore** verwirft lokale Änderungen oder stellt eine ältere Dateiversion wieder her

| Befehl | Zweck |
|--------|-------|
| \`git stash\` | Änderungen temporär speichern |
| \`git stash push -m "msg"\` | Stash mit Beschreibung |
| \`git stash pop\` | Stash anwenden + löschen |
| \`git stash apply\` | Stash anwenden (bleibt im Stash) |
| \`git stash list\` | Alle Stashes anzeigen |
| \`git stash drop\` | Einzelnen Stash löschen |
| \`git restore dateiname\` | Lokale Änderungen verwerfen |
| \`git restore --staged dateiname\` | Aus Staging entfernen |

> 💡 **Merke:** \`git stash pop\` entfernt den Stash nach dem Anwenden, \`git stash apply\` behält ihn. Im Zweifel erst \`apply\` nutzen, dann manuell mit \`git stash drop\` löschen.

> ⚠️ **Achtung:** \`git restore\` ist NICHT rückgängig zu machen — die Änderungen sind weg! Im Zweifel vorher stashen.

---

> 💡 **IHK-Tipp:** "Wann verwendet man git stash?" — Wenn man unvollständige Änderungen zwischenspeichern muss, um auf einem anderen Branch zu arbeiten.

---

> Das war die letzte inhaltliche Lektion zu Git! In der nächsten Lektion kannst du dein Wissen im Quiz testen — von den Grundlagen bis zu den fortgeschrittenen Workflows.`
    },

    // --- Lektion 9: Quiz ---
    {
      id: "git-9",
      title: "Wissenstest: Git & Versionsmanagement",
      duration: "15 min",
      type: "quiz",
      content: `## 🎯 Quiz: Versionsmanagement mit Git

> Du hast alle Lektionen zu Git durchgearbeitet — von den Grundlagen über die Befehle bis zu professionellen Workflows. Jetzt ist es Zeit, dein Wissen zu testen!

Teste dein Wissen über Git und Versionsmanagement!`,
    },
  ],
};
