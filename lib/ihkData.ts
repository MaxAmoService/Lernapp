import { Module, QuizQuestion } from "./types";

// ============================================================================
// IHK "Diagramme und Darstellungsformen" — Modul-Daten
// Quelle: IHK IT-Handbuch + Moritz' Mitschriften
// ============================================================================

// --- FLASHCARDS (Anki-Stil) ---

export interface Flashcard {
  id: string;
  topic: string;
  front: string;
  back: string;
  hint?: string;
}

export const ihkFlashcards: Flashcard[] = [
  // --- Pseudocode ---
  { id: "fc-pseudo-1", topic: "Pseudocode", front: "Was ist Pseudocode und wofür wird er verwendet?", back: "Pseudocode ist eine sprachunabhängige, codenah Formulierung von Algorithmen. Er dient zur Planung und Dokumentation von Programmen und ist besonders für die IHK-Prüfung relevant.", hint: "Denk an: formal, aber nicht an eine bestimmte Sprache gebunden" },
  { id: "fc-pseudo-2", topic: "Pseudocode", front: "Welche Schleifenarten gibt es im Pseudocode?", back: "while-Schleife (kopfgesteuert): Bedingung AM ANFANG geprüft. do-while-Schleife (fußgesteuert): Bedingung AM ENDE, führt mindestens 1x aus.", hint: "Kopf vs. Fuß" },
  { id: "fc-pseudo-3", topic: "Pseudocode", front: "Schreibe die Syntax einer while-Schleife in Pseudocode.", back: "```\nwhile (bedingung) {\n  // Anweisungen\n}\n```" },

  // --- PAP ---
  { id: "fc-pap-1", topic: "PAP", front: "Welche Norm regelt den Programmablaufplan?", back: "DIN 66001" },
  { id: "fc-pap-2", topic: "PAP", front: "Welche Symbole gibt es im PAP nach DIN 66001?", back: "Start/Ende = Oval, Operation = Rechteck, Entscheidung = Raute, Ein-/Ausgabe = Parallelogramm" },
  { id: "fc-pap-3", topic: "PAP", front: "Wofür eignet sich ein PAP besonders gut?", back: "Zur allgemeinen Darstellung von Prozessen/Code, unabhängig von einer Programmiersprache. Gut für Flexibilität und Kommunikation." },

  // --- Struktogramm ---
  { id: "fc-strukt-1", topic: "Struktogramm", front: "Welche drei Grundstrukturen gibt es im Struktogramm (Nassi-Shneiderman)?", back: "1. Sequenz (Ablauf von Anweisungen)\n2. Auswahl (If-Then-Else)\n3. Wiederholung (While-Schleife, Do-While-Schleife)" },
  { id: "fc-strukt-2", topic: "Struktogramm", front: "Was ist der Vorteil von Struktogrammen gegenüber PAP?", back: "Struktogramme erzwingen strukturierte Programmierung — keine Sprünge (goto) möglich. Einfacher in Code übertragbar." },
  { id: "fc-strukt-3", topic: "Struktogramm", front: "Nach welcher Norm/Methode ist das Struktogramm benannt?", back: "Nassi-Shneiderman (Fredric Nassi und Ben Shneiderman)" },

  // --- Sortieralgorithmen ---
  { id: "fc-sort-1", topic: "Sortieralgorithmen", front: "Erkläre Bubblesort und seine Zeitkomplexität.", back: "Vergleicht benachbarte Elemente und tauscht sie, wenn sie in falscher Reihenfolge sind. Wiederholt das bis alles sortiert ist.\nZeitkomplexität: O(n²)\nStabiles Verfahren, einfach zu implementieren, aber langsam für große Listen." },
  { id: "fc-sort-2", topic: "Sortieralgorithmen", front: "Erkläre Selectionsort und seine Zeitkomplexität.", back: "Sucht das kleinste Element aus dem unsortierten Teil und tauscht es an die erste Position. Wiederholt für den Rest.\nZeitkomplexität: O(n²)\nNicht stabil, aber wenig Tauschoperationen." },
  { id: "fc-sort-3", topic: "Sortieralgorithmen", front: "Erkläre Insertionsort und seine Zeitkomplexität.", back: "Baut die sortierte Liste elementweise auf. Jedes neue Element wird an der richtigen Stelle eingefügt.\nZeitkomplexität: O(n²) im Durchschnitt, O(n) bei fast sortierten Listen.\nStabiles Verfahren." },

  // --- Suchalgorithmen ---
  { id: "fc-such-1", topic: "Suchalgorithmen", front: "Was ist der Unterschied zwischen linearer und binärer Suche?", back: "Lineare Suche: Prüft jedes Element der Reihe nach — O(n). Keine Sortierung nötig.\nBinäre Suche: Teilt die sortierte Liste immer in der Mitte — O(log n). Erfordert sortierte Liste." },
  { id: "fc-such-2", topic: "Suchalgorithmen", front: "Welche Voraussetzung braucht die binäre Suche?", back: "Die Liste MUSS sortiert sein, bevor die binäre Suche angewendet werden kann." },

  // --- EPK ---
  { id: "fc-epk-1", topic: "EPK", front: "Was steht EPK für und was sind die Kernelemente?", back: "EPK = Ereignisgesteuerte Prozesskette.\nKernelemente:\n- Ereignisse (Sechseck)\n- Funktionen (abgerundetes Rechteck)\n- Logische Operatoren (AND, OR, XOR)\n- Prozesswege (Pfeile)" },
  { id: "fc-epk-2", topic: "EPK", front: "Was bedeuten die Operatoren AND, OR und XOR in einer EPK?", back: "AND: Alle nachfolgenden Pfade werden parallel ausgeführt.\nOR: Mindestens ein Pfad (mehrere möglich).\nXOR: Genau EIN Pfad (exklusiv)." },
  { id: "fc-epk-3", topic: "EPK", front: "Welche Regel gilt in einer EPK für die Verknüpfung?", back: "Ereignis → Funktion → Ereignis → Funktion → ...\nEreignisse und Funktionen wechseln sich immer ab. Zwei Funktionen oder zwei Ereignisse direkt nacheinander sind NICHT erlaubt." },

  // --- UML Klassendiagramm ---
  { id: "fc-uml-1", topic: "UML Klassendiagramm", front: "Welche Arten von Beziehungen gibt es zwischen Klassen im UML?", back: "1. Assoziation (einfache Verbindung)\n2. Aggregation (lose Beziehung, nicht-existenzabhängig) — leere Raute\n3. Komposition (starke Beziehung, existenzabhängig) — ausgefüllte Raute\n4. Vererbung (Generalisierung) — Pfeil mit leerem Dreieck" },
  { id: "fc-uml-2", topic: "UML Klassendiagramm", front: "Was ist der Unterschied zwischen Aggregation und Komposition?", back: "Aggregation: Objekte können unabhängig existieren (z.B. Student und Vorlesung).\nKomposition: Objekte sind existenzabhängig (z.B. Räume und Gebäude — ohne Gebäude keine Räume). Darstellung: ausgefüllte vs. leere Raute." },
  { id: "fc-uml-3", topic: "UML Klassendiagramm", front: "Was sind Kardinalitäten und Multiplizitäten?", back: "Kardinalität: Feste Anzahl (z.B. 1, 4, 10).\nMultiplizität: Menge von Kardinalitäten (z.B. *, 0..1, 1..*, 5..10).\nBeispiel: Ein Kunde hat '*' (beliebig viele) Bestellungen." },

  // --- UML Sequenzdiagramm ---
  { id: "fc-uml-seq-1", topic: "UML Sequenzdiagramm", front: "Worauf liegt der Fokus beim Sequenzdiagramm?", back: "Auf der zeitlichen Abfolge von Nachrichten zwischen Objekten (Lebenslinien). Man sieht chronologisch, welche Nachricht wann gesendet wird." },
  { id: "fc-uml-seq-2", topic: "UML Sequenzdiagramm", front: "Wann braucht man einen Aktivierungsbalken?", back: "Nur wenn ein Objekt noch keinen hat. Ein Aktivierungsbalken erscheint am Empfänger einer synchronen Nachricht und bleibt bis zur Antwort. Unnötige Balken weglassen für Übersichtlichkeit." },

  // --- UML Use Case Diagramm ---
  { id: "fc-uml-uc-1", topic: "UML Use Case", front: "Was zeigt ein Anwendungsfalldiagramm (Use Case Diagramm)?", back: "Zeigt Akteure (Personen/Systeme) und ihre Interaktion mit dem System in Form von Use Cases (Anwendungsfällen). Inklusive Beziehungen: <<include>> und <<extend>>." },
  { id: "fc-uml-uc-2", topic: "UML Use Case", front: "Was ist der Unterschied zwischen <<include>> und <<extend>>?", back: "<<include>>: Ein Use Case enthält einen anderen IMMER (zwingend).\n<<extend>>: Ein Use Case kann einen anderen optional erweitern (bedingt)." },

  // --- UML Zustandsdiagramm ---
  { id: "fc-uml-zust-1", topic: "UML Zustandsdiagramm", front: "Was ist ein Zustandsdiagramm (State Machine Diagram)?", back: "Beschreibt die verschiedenen Zustände eines Objekts und die Übergänge zwischen ihnen. Wie ein endlicher Automat: Zustände, Ereignisse, Übergänge. Auch 'Statemachine' genannt." },

  // --- Netzplantechnik ---
  { id: "fc-netz-1", topic: "Netzplantechnik", front: "Was bedeuten FAZ, FEZ, SAZ, SEZ in der Netzplantechnik?", back: "FAZ = Frühester Anfangszeitpunkt\nFEZ = Frühester Endzeitpunkt\nSAZ = Spätester Anfangszeitpunkt\nSEZ = Spätester Endzeitpunkt\nPufferzeit = SAZ − FAZ" },
  { id: "fc-netz-2", topic: "Netzplantechnik", front: "Was ist der kritische Pfad?", back: "Die Kette von Vorgängen, bei denen der Gesamtpuffer Null ist (= SAZ = FAZ). Jede Verzögerung auf dem kritischen Pfad verzögert das gesamte Projekt." },

  // --- ER-Modell ---
  { id: "fc-er-1", topic: "ER-Modell", front: "Welche Elemente hat ein ER-Diagramm?", back: "Entitätstypen = Rechtecke\nAttribute = Ellipsen\nBeziehungen = Rauten\nKardinalitäten: 1:1, 1:n, n:m" },
  { id: "fc-er-2", topic: "ER-Modell", front: "Erkläre die drei Kardinalitäten im ER-Modell.", back: "1:1 — Eine Entität ist mit genau einer anderen verknüpft (z.B. Person → Personalausweis)\n1:n — Eine Entität mit mehreren (z.B. Kunde → Bestellungen)\nn:m — Beide Seiten mehrere (z.B. Schüler → Kurse)" },

  // --- Lastenheft / Pflichtenheft ---
  { id: "fc-lp-1", topic: "Lastenheft/Pflichtenheft", front: "Was ist der Unterschied zwischen Lastenheft und Pflichtenheft?", back: "Lastenheft: WAS soll das System tun? (Anforderungen des Auftraggebers — funktional + nicht-funktional)\nPflichtenheft: WIE wird es umgesetzt? (Lösungsvorschlag des Auftragnehmers — technische Details)" },
  { id: "fc-lp-2", topic: "Lastenheft/Pflichtenheft", front: "Was sind funktionale Anforderungen?", back: "Beschreiben konkret die Funktionen, die ein System erfüllen MUSS.\nBeispiel: 'Die App soll Kontostände anzeigen, Überweisungen durchführen und Push-Benachrichtigungen senden.'" },
];

// --- QUIZ FRAGEN ---

export const ihkQuizzes: QuizQuestion[] = [
  {
    question: "Welches Symbol wird im PAP (DIN 66001) für eine Entscheidung verwendet?",
    type: "multiple",
    options: ["Rechteck", "Oval", "Raute", "Parallelogramm"],
    correct: 2,
    explanation: "Eine Entscheidung wird im PAP durch eine Raute dargestellt. Das Oval ist für Start/Ende, das Rechteck für Operationen und das Parallelogramm für Ein-/Ausgabe."
  },
  {
    question: "Welche Zeitkomplexität hat der Bubblesort-Algorithmus?",
    type: "multiple",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correct: 2,
    explanation: "Bubblesort hat eine Zeitkomplexität von O(n²), da für jedes Element mit allen anderen verglichen wird. Es gibt zwar Optimierungen, aber im Durchschnitt bleibt es O(n²)."
  },
  {
    question: "Welche Voraussetzung muss erfüllt sein, damit die binäre Suche funktioniert?",
    type: "multiple",
    options: ["Die Liste muss leer sein", "Die Liste muss sortiert sein", "Die Liste muss ungerade Elemente haben", "Keine Voraussetzung"],
    correct: 1,
    explanation: "Die binäre Suche teilt die Liste immer in der Mitte und vergleicht — dafür muss die Liste sortiert sein, sonst funktioniert die Vergleichslogik nicht."
  },
  {
    question: "Was bedeutet XOR in einer EPK?",
    type: "multiple",
    options: ["Alle Pfade werden parallel ausgeführt", "Mindestens ein Pfad wird gewählt", "Genau ein Pfad wird gewählt", "Kein Pfad wird gewählt"],
    correct: 2,
    explanation: "XOR (exklusives Oder) bedeutet, dass genau EIN Pfad gewählt wird — entweder der eine oder der andere, aber nicht beide und nicht keiner."
  },
  {
    question: "Welche Beziehung im UML Klassendiagramm ist existenzabhängig?",
    type: "multiple",
    options: ["Assoziation", "Aggregation", "Komposition", "Vererbung"],
    correct: 2,
    explanation: "Die Komposition (ausgefüllte Raute) ist existenzabhängig: Wenn das übergeordnete Objekt gelöscht wird, werden auch die zugehörigen Objekte gelöscht (z.B. Räume in einem Gebäude)."
  },
  {
    question: "Was ist die Pufferzeit in der Netzplantechnik?",
    type: "multiple",
    options: ["SAZ − FEZ", "FEZ − FAZ", "SAZ − FAZ", "SEZ − FEZ"],
    correct: 2,
    explanation: "Pufferzeit = SAZ (Spätester Anfangszeitpunkt) minus FAZ (Frühester Anfangszeitpunkt). Sie gibt an, wie viel Spielraum ein Vorgang hat, ohne das Projekt zu verzögern."
  },
  {
    question: "Was beschreibt das Lastenheft?",
    type: "multiple",
    options: ["Die technische Lösung", "Die funktionalen Anforderungen des Auftraggebers", "Den Programmcode", "Den Testplan"],
    correct: 1,
    explanation: "Das Lastenheft beschreibt WAS das System tun soll — die Anforderungen des Auftraggebers. Das Pflichtenheft beschreibt die WIE-Lösung des Auftragnehmers."
  },
  {
    question: "Welche Grundstrukturen gibt es im Struktogramm nach Nassi-Shneiderman?",
    type: "multiple",
    options: ["Sequenz, Schleife, Exception", "Sequenz, Auswahl, Wiederholung", "Start, Prozess, Ende", "Eingabe, Verarbeitung, Ausgabe"],
    correct: 1,
    explanation: "Die drei Grundstrukturen sind: Sequenz (Ablauf), Auswahl (If-Then-Else) und Wiederholung (While-Schleife). Alle anderen Strukturen lassen sich daraus ableiten."
  },
  {
    question: "Welche UML-Diagrammart zeigt die zeitliche Abfolge von Nachrichten?",
    type: "multiple",
    options: ["Klassendiagramm", "Zustandsdiagramm", "Sequenzdiagramm", "Paketdiagramm"],
    correct: 2,
    explanation: "Das Sequenzdiagramm zeigt die zeitliche Reihenfolge der Nachrichten zwischen Objekten (Lebenslinien). Klassendiagramm zeigt Struktur, Zustandsdiagramm zeigt Automaten, Paketdiagramm zeigt Gruppierungen."
  },
  {
    question: "Was ist der kritische Pfad in der Netzplantechnik?",
    type: "multiple",
    options: ["Der längste Pfad ohne Puffer", "Der kürzeste Weg zum Ziel", "Der Pfad mit den meisten Vorgängen", "Der Pfad mit der meisten Pufferzeit"],
    correct: 0,
    explanation: "Der kritische Pfad ist die Kette von Vorgängen ohne Puffer (= Gesamtpuffer = 0). Jede Verzögerung auf diesem Pfad verzögert das gesamte Projekt."
  },
];

// --- LEPTECHNIKEN ---
// Die 9 Lektionen für das IHK-Modul "Diagramme und Darstellungsformen"

export const ihkModule: Module = {
  id: "ihk-diagramme",
  slug: "ihk-diagramme",
  title: "Diagramme & Darstellungen",
  description: "IHK IT-Handbuch: UML, PAP, Struktogramme, EPK, Sortier-/Suchalgorithmen, Netzplantechnik, ER-Modell, Lasten-/Pflichtenheft",
  icon: "📊",
  color: "#8B5CF6",
  category: "programmieren",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Diagramme & Darstellungen (IHK)

### UML-Übersicht
- **Strukturdiagramme:** Klassendiagramm, Paketdiagramm
- **Verhaltensdiagramme:** Use Case, Zustandsdiagramm
- **Interaktionsdiagramme:** Sequenz, Kommunikation

### PAP (DIN 66001)
- Oval = Start/Ende
- Rechteck = Operation
- Raute = Entscheidung
- Parallelogramm = Ein-/Ausgabe

### Struktogramm (Nassi-Shneiderman)
- Sequenz, Auswahl (If-Then-Else), Wiederholung
- Keine Sprünge möglich → erzwingt strukturierte Programmierung

### EPK
- Ereignis (Sechseck) → Funktion (Rechteck) → Ereignis → ...
- Operatoren: AND (parallel), OR (mehrere möglich), XOR (exklusiv)

### Sortieralgorithmen
- Bubblesort: Vergleiche Nachbarn, tausche — O(n²)
- Selectionsort: Kleinstes suchen, tauschen — O(n²)
- Insertionsort: Element einfügen — O(n²) / O(n) bei fast sortiert

### Suchalgorithmen
- Linear: Jedes Element durchsuchen — O(n)
- Binär: Mitte vergleichen, halbieren — O(log n) — braucht sortierte Liste!

### Netzplantechnik
- FAZ/FEZ/SAZ/SEZ | Pufferzeit = SAZ − FAZ
- Kritischer Pfad = Pufferzeit = 0

### ER-Modell
- Entität = Rechteck, Attribut = Ellipse, Beziehung = Raute
- Kardinalitäten: 1:1, 1:n, n:m

### Lastenheft vs Pflichtenheft
- Lastenheft = WAS (Anforderungen, Auftraggeber)
- Pflichtenheft = WIE (Lösung, Auftragnehmer)`,

  lessons: [
    // --- Lektion 1: Pseudocode ---
    {
      id: "ihk-1",
      title: "Pseudocode",
      duration: "15 min",
      type: "interactive",
      interactive: "pseudocodeRunner",
      content: `# Pseudocode — Algorithmen in codenaher Sprache 🟦

## Was ist Pseudocode?

**Pseudocode** ist eine **sprachunabhängige, formale Sprache**, um Algorithmen zu beschreiben. Er sieht aus wie echter Code, ist aber an keine Programmiersprache gebunden.

> 💡 Pseudocode ist wie ein **Bauplan für deinen Code** — du beschreibst die Logik, ohne dich um Syntax zu kümmern.

---

## Warum braucht man Pseudocode?

- 📋 **Planung:** Algorithmus strukturieren, bevor man programmiert
- 💬 **Kommunikation:** Logik verständlich machen ohne Code
- 📝 **IHK-Prüfung:** Algorithmen formal beschreiben — typischer Prüfungsauftrag

---

## Die wichtigsten Strukturen

| Struktur | Zweck | Beispiel |
|----------|-------|----------|
| 📦 **Variable** | Wert speichern | \`meineZahl = 42\` |
| 🔶 **if/else** | Bedingte Verzweigung | \`if (bedingung) { ... } else { ... }\` |
| 🔁 **while** | Kopfgesteuerte Schleife | Bedingung wird AM ANFANG geprüft |
| 🔁 **do-while** | Fußgesteuerte Schleife | Wird mindestens 1× ausgeführt |
| 🔀 **switch/case** | Mehrfachverzweigung | \`match (eingabe): case ...\` |

> 💡 Alle Strukturen siehst du in Aktion im **PseudocodeRunner** oben!

---

## 🧩 Interaktiv erkunden

[INTERACTIVE]
## 🎯 Regeln für die IHK-Prüfung

> ❗ **Diese Regeln sichern dir Punkte!**

1. ✏️ **Formal codenah** schreiben — keine deutschen Sätze
2. { } **Geschweifte Klammern** für Blöcke verwenden
3. 🇬🇧 **Englische Begriffe** bevorzugen (if, else, while, for, return)
4. 💬 **Kommentare** mit # oder // ergänzen
5. 📝 **Auf Papier** — für die Prüfung per Hand schreibbar
6. 🧪 **Schreibtischtest** durchführen: Variablenwerte in einer Tabelle protokollieren

> ✅ **Merke:** Pseudocode muss lesbar und nachvollziehbar sein. Wenn ein anderer Entwickler den Algorithmus versteht, hast du es richtig gemacht.`
    },

    // --- Lektion 2: Programmablaufplan (PAP) ---
    {
      id: "ihk-2",
      title: "Programmablaufplan (PAP)",
      duration: "15 min",
      type: "interactive",
      visuals: [
        { type: "papSymbols", position: "top" },
        { type: "papExample", position: "bottom" },
      ],
      interactive: "papBuilder",
      content: `# Programmablaufplan (PAP) 📊

## Was ist ein PAP?

Ein Programmablaufplan (PAP) ist eine **grafische Darstellung** eines Algorithmus nach der Norm **DIN 66001**. Er zeigt den Ablauf eines Programms mit standardisierten Symbolen — unabhängig von einer Programmiersprache.

> 💡 Denk an den PAP wie einen **Bauplan für deinen Code** — du siehst den gesamten Ablauf, bevor du eine Zeile programmierst.

## Wofür braucht man ein PAP?

- 🎯 **Prozessdarstellung:** Code allgemein visualisieren, ohne eine Sprache zu nutzen
- 💬 **Kommunikation:** Nicht-Techniker können den Ablauf verstehen
- 📝 **IHK-Prüfung:** Typische Aufgabe — Algorithmus als PAP zeichnen

> ⚠️ In der IHK-Prüfung musst du PAPs **auf Papier zeichnen** können — nicht nur am PC!

---

## Die Symbole nach DIN 66001

| Symbol | Form | Bedeutung |
|--------|------|------------|
| 🟢 **Start/Ende** | Oval | Beginn oder Ende des Programms |
| 🟦 **Operation** | Rechteck | Berechnung, Zuweisung |
| 🔶 **Entscheidung** | Raute | Ja/Nein-Abfrage (zwei Ausgänge!) |
| 🟪 **Ein-/Ausgabe** | Parallelogramm | Benutzereingabe oder Bildschirmausgabe |
| ➡️ **Flusspfeil** | Pfeil | Richtung des Ablaufs |

> ✅ Die Raute ist das EINZIGE Symbol mit zwei Ausgängen. Alle anderen haben genau einen.

---

## 🔨 Ausprobieren

[INTERACTIVE]

> 💡 Der interaktive PAP-Builder oben zeigt dir ein komplettes Beispiel — teste es selbst!

---

## ⚔️ PAP vs. Struktogramm

Beide dienen der Algorithmus-Darstellung, aber sie haben unterschiedliche Stärken:

| | PAP | Struktogramm |
|---|---|---|
| 🔄 Abläufe | Kann auch unstrukturierte Abläufe darstellen | Nur strukturierte Abläufe |
| 📐 Struktur | Kann schnell unübersichtlich werden | Strukturiert und übersichtlich |
| 💻 Code | Schwer in Code übertragbar | Direkt in Code übertragbar |
| 🚫 Sprünge | Erlaubt (goto möglich) | Verhindert Sprünge |

> ℹ️ **Für die IHK:** Beide sind wichtig! Der PAP zeigt Flexibilität, das Struktogramm zeigt saubere Struktur.

---

## 🎯 Tipps für die IHK-Prüfung

> ❗ **Diese Tipps können Punkte bringen!**

- ✏️ Auf **Papier** üben — nicht nur am PC
- 📏 Symbole **sauber und beschriftet** zeichnen
- 🇬🇧 **Englische Beschriftungen** verwenden (Start, End, Input, Output)
- 🧪 Immer einen **Schreibtischtest** durchführen: Variablenwerte in einer Tabelle protokollieren
- ➡️ **Flusspfeile** nicht vergessen — sie zeigen die Richtung!

> 📝 **Schreibtischtest:** Erstelle eine Tabelle mit Spalten "Schritt", "Variable", "Wert" und gehe jeden PAP-Schritt durch. So erkennst du Fehler bevor du den Code schreibst.`
    },

    // --- Lektion 3: Struktogramm ---
    {
      id: "ihk-3",
      title: "Struktogramm (Nassi-Shneiderman)",
      duration: "12 min",
      type: "interactive",
      interactive: "struktogrammBuilder",
      visuals: [
        { type: "struktBubbleSort", position: "bottom" },
      ],
      content: `# Struktogramm — Nassi-Shneiderman 📐

## Was ist ein Struktogramm?

Ein Struktogramm nach **Nassi und Shneiderman** ist eine grafische Darstellung von Algorithmen, die **keine Sprünge (goto)** erlaubt. Es erzwingt **strukturierte Programmierung** — du kannst nur Blöcke stapeln, nicht springen.

> 💡 Im interaktiven Builder oben siehst du ein echtes Nassi-Shneiderman-Diagramm: Bubblesort mit verschachtelten Schleifen und if/else.

## Wofür braucht man ein Struktogramm?

- 🧱 **Struktur:** Erzwingt saubere, verschachtelte Programmierung
- 💻 **Code-Nähe:** Jede Struktur hat ein Pendant in jeder Programmiersprache
- 📝 **IHK-Prüfung:** Algorithmen als Struktogramm zeichnen ist eine typische Aufgabe
- 🚫 **Keine Sprünge:** Im Gegensatz zum PAP sind goto-Sprünge unmöglich

---

## Die vier Grundelemente

Der Builder oben zeigt dir alle vier Elemente in Aktion:

| Element | Darstellung | Zweck |
|---------|-------------|-------|
| 🟦 **Sequenz** | Einfaches Rechteck | Anweisungen nacheinander |
| 🔶 **Auswahl** | Block mit diagonaler Linie | if/else — JA links, NEIN rechts |
| 🔁 **Schleife** | Block mit Bogen links | for/while — Bedingung im Kopf |
| 🟪 **Ein-/Ausgabe** | Parallelogramm | input() oder print() |

---

## 🔨 Ausprobieren

[INTERACTIVE]

> 💡 Der interaktive Builder zeigt dir Bubblesort als Struktogramm — teste auch eigene Algorithmen!

---

## ⚔️ Struktogramm vs. PAP

| | Struktogramm | PAP |
|---|---|---|
| 🚫 Sprünge | Keine möglich — strukturiert! | Erlaubt (goto möglich) |
| 💻 Code-Nähe | Direkt übertragbar | Schwerer übertragbar |
| 📐 Struktur | Immer übersichtlich | Kann unübersichtlich werden |
| 🔄 Flexibilität | Eingeschränkt | Sehr flexibel |
| 📝 IHK-Prüfung | Beide wichtig! | Beide wichtig! |

> ℹ️ **Für die IHK:** Beide sind wichtig! Das Struktogramm zeigt saubere Struktur, der PAP zeigt Flexibilität.

---

## 🎯 Tipps für die IHK-Prüfung

> ❗ **Diese Tipps können Punkte bringen!**

- ✏️ Struktogramme **auf Papier** zeichnen — sauber und lesbar
- 📏 Blöcke **bündig** ausrichten — Verschachtelung muss sichtbar sein
- 🔁 Schleifen **immer** mit Bedingung oben und Rumpf darunter
- 🔶 Auswahl **immer** mit JA/Links und NEIN/Rechts
- 🧪 **Schreibtischtest** durchführen — Variablenwerte protokollieren

> 📝 **Merke:** Das Struktogramm erzwingt strukturierte Programmierung. In der Prüfung immer prüfen: Kann der Algorithmus strukturiert dargestellt werden? Wenn ja → Struktogramm. Wenn Sprünge nötig sind → PAP.`
    },

    // --- Lektion 4: Sortieralgorithmen ---
    {
      id: "ihk-4",
      title: "Sortieralgorithmen",
      duration: "20 min",
      type: "interactive",
      interactive: "sortVisualizer",
      content: `# Sortieralgorithmen — Bubblesort, Selectionsort, Insertionsort 📊

## Warum Sortieren?

Sortieren ist eine der **grundlegendsten Aufgaben** in der Informatik. Viele Algorithmen (z.B. binäre Suche) benötigen sortierte Daten als Eingabe. Die IHK verlangt das Verständnis und die Implementierung der wichtigsten Sortierverfahren.

---

## 🫧 Bubblesort

**Prinzip:** Vergleiche benachbarte Elemente und tausche sie, wenn sie in falscher Reihenfolge sind — wiederhole bis alles sortiert ist.

| | Wert |
|---|---|
| 🟢 Bester Fall | O(n) — bereits sortiert |
| 🟡 Durchschnitt | O(n²) |
| 🔴 Schlechtester Fall | O(n²) |
| ✅ Stabil? | Ja |

---

## 🔍 Selectionsort

**Prinzip:** Finde das kleinste Element im unsortierten Teil und tausche es an die erste Position.

| | Wert |
|---|---|
| 🟡 Immer | O(n²) — wenige Tausche, viele Vergleiche |
| ✅ Stabil? | Nein |

---

## 📥 Insertionsort

**Prinzip:** Baue die sortierte Liste elementweise auf — jedes neue Element wird an der richtigen Stelle eingefügt.

| | Wert |
|---|---|
| 🟢 Bester Fall | O(n) — fast sortiert |
| 🟡 Durchschnitt | O(n²) |
| 🔴 Schlechtester Fall | O(n²) |
| ✅ Stabil? | Ja |

---

## ⚔️ Vergleich der Sortieralgorithmen

## 🔨 Ausprobieren

[INTERACTIVE]

| | 🫧 Bubblesort | 🔍 Selectionsort | 📥 Insertionsort |
|---|---|---|---|
| **Prinzip** | Nachbarn vergleichen | Kleinstes suchen | Element einfügen |
| **Vergleiche** | O(n²) | O(n²) | O(n²) |
| **Tauschungen** | O(n²) | O(n) | O(n²) |
| **Stabil?** | ✅ Ja | ❌ Nein | ✅ Ja |
| **Best for** | Verständnis | Wenig Tausche | Fast sortiert |

> ⚠️ Alle drei haben O(n²) — für die IHK reicht das. Echte Anwendungen nutzen **Quicksort** (O(n log n)) oder **Mergesort**.

---

## 🎯 IHK-Tipps

> ❗ **Diese Tipps sichern dir Punkte!**

- 🧪 Immer einen **Schreibtischtest** machen — Variablen in einer Tabelle protokollieren
- 📊 Jeden **Durchlauf einzeln** aufschreiben — nicht abkürzen!
- ⏱️ **Zeitkomplexität** erklären können — nicht nur auswendig lernen
- 🔄 **Stabilität** erklären: Stabil = gleiche Elemente behalten ihre Reihenfolge`,
      codeExample: `// Insertionsort in Python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

liste = [2, 4, 5, 3, 1, 8]
print(insertion_sort(liste))  # [1, 2, 3, 4, 5, 8]`
    },

    // --- Lektion 5: Suchalgorithmen ---
    {
      id: "ihk-5",
      title: "Suchalgorithmen",
      duration: "10 min",
      type: "interactive",
      interactive: "searchVisualizer",
      content: `# Suchalgorithmen — Lineare und Binäre Suche 🔍

## Warum Suchen?

Daten suchen ist eine der **häufigsten Operationen** in der Softwareentwicklung — ob in einer Datenbank, einer Datei oder einer Liste. Die Art der Suche bestimmt, wie schnell du dein Ziel findest.

---

## 🔎 Lineare Suche

**Prinzip:** Gehe die Liste von Anfang bis Ende durch und prüfe jedes Element.

- **Voraussetzung:** Keine — die Liste muss NICHT sortiert sein
- **Zeitkomplexität:** 🟡 O(n)

---

## 🎯 Binäre Suche

**Prinzip:** Teile die sortierte Liste in der Mitte. Ist das mittlere Element das Ziel? Falls nicht: Suche nur in der linken oder rechten Hälfte weiter.

- **Voraussetzung:** Die Liste MUSS **sortiert** sein!
- **Zeitkomplexität:** 🟢 O(log n) — viel schneller als linear

> ❗ Bei 1 Million Einträgen: Lineare Suche = bis zu 1.000.000 Schritte, Binäre Suche = max. ~20 Schritte!

---

## ⚔️ Vergleich

## 🔨 Ausprobieren

[INTERACTIVE]

| | 🔎 Lineare Suche | 🎯 Binäre Suche |
|---|---|---|
| **Sortiert nötig?** | ❌ Nein | ✅ Ja |
| **Zeitkomplexität** | 🟡 O(n) | 🟢 O(log n) |
| **Bei 1 Million Einträgen** | max. 1.000.000 Schritte | max. ~20 Schritte |

> ❗ **Merke:** Binäre Suche ist exponentiell schneller, braucht aber eine sortierte Liste. In der IHK immer prüfen: Ist die Liste sortiert? Wenn ja → binäre Suche.

---

## 🎯 IHK-Tipps

> 💡 **Diese Tipps sichern dir Punkte!**

- 🧪 Immer einen **Schreibtischtest** machen — besonders bei binärer Suche!
- 📊 **Voraussetzung** prüfen: Ist die Liste sortiert? → Entscheidet welcher Algorithmus
- 🔢 **Mitte berechnen** auf Papier üben — Rundungsfehler vermeiden
- ⏱️ **Zeitkomplexität** erklären können: Warum ist O(log n) schneller?`,
      codeExample: `// Binäre Suche in Python
def binary_search(arr, ziel):
    links, rechts = 0, len(arr) - 1
    while links <= rechts:
        mitte = (links + rechts) // 2
        if arr[mitte] == ziel:
            return mitte
        elif arr[mitte] < ziel:
            links = mitte + 1
        else:
            rechts = mitte - 1
    return -1

sortiert = [1, 2, 3, 4, 5, 8]
print(binary_search(sortiert, 3))  # 2
print(binary_search(sortiert, 6))  # -1`
    },

    // --- Lektion 6: EPK ---
    {
      id: "ihk-6",
      title: "Ereignisgesteuerte Prozesskette (EPK)",
      duration: "15 min",
      type: "interactive",
      interactive: "epkBuilder",
      content: `# Ereignisgesteuerte Prozesskette (EPK) 🔗

## Was ist eine EPK?

Eine **EPK** (Ereignisgesteuerte Prozesskette) ist ein Diagramm zur Darstellung von **Geschäftsprozessen**. Sie zeigt die logische und chronologische Abfolge von **Ereignissen** und **Funktionen** — häufig verwendet in der Prozessoptimierung und Dokumentation.

> 💡 Die EPK ist wie ein **Flowchart für Geschäftsprozesse** — sie zeigt, was passiert und was das auslöst.

---

## Warum braucht man eine EPK?

- 📋 **Prozessdokumentation:** Abläufe im Unternehmen visualisieren
- 🔧 **Prozessoptimierung:** Schwachstellen und Verbesserungspotenziale erkennen
- 💬 **Kommunikation:** Abteilungen verstehen gemeinsame Prozesse
- 📝 **IHK-Prüfung:** Geschäftsprozesse als EPK modellieren

---

## 🧩 Die Elemente der EPK

| Element | Symbol | Beschreibung |
|---------|--------|-------------|
| 🟢 **Ereignis** | Sechseck | WAS passiert (z.B. "Bestellung eingegangen") |
| 🟦 **Funktion** | Abger. Rechteck | Eine TÄTIGKEIT (z.B. "Bestellung bearbeiten") |
| 🔀 **Operator** | AND / OR / XOR | Logische Verknüpfung mehrerer Pfade |

---

## 🔀 Die Operatoren

- **AND:** Alle Pfade werden **parallel** ausgeführt
- **OR:** **Mindestens ein** Pfad wird gewählt
- **XOR:** Genau **ein** Pfad wird gewählt (exklusiv)

---

## 📐 Grundregel der EPK

**Ereignis → Funktion → Ereignis → Funktion → ...**

Ereignisse und Funktionen **wechseln sich immer ab**. Zwei Funktionen oder zwei Ereignisse direkt hintereinander ist NICHT erlaubt.

> ❗ **Diese Regel wird in der IHK-Prüfung oft geprüft!**

---

## 🔨 Ausprobieren

[INTERACTIVE]

> 💡 Der EPK-Builder oben zeigt dir einen kompletten Bestellprozess — baue eigene EPKs!

---

## 🎯 IHK-Tipps

> 💡 **Diese Tipps sichern dir Punkte!**

- 📐 **Ereignis-Funktion-Wechsel** immer einhalten — das wird geprüft!
- 🔀 **Operatoren** richtig wählen: XOR für Entweder-Oder, AND für Parallel
- 📝 **Beschriftungen** kurz und präzise formulieren
- 🧪 Immer prüfen: Beginnt und endet der Prozess mit einem **Ereignis**?`,

    },

    // --- Lektion 7: UML Klassendiagramme ---
    {
      id: "ihk-7",
      title: "UML Klassendiagramme",
      duration: "18 min",
      type: "interactive",
      interactive: "umlClassDiagram",
      content: `# UML Klassendiagramme 📐

## Was ist ein Klassendiagramm?

Das Klassendiagramm ist das **wichtigste Strukturdiagramm** in UML. Es zeigt Klassen, Interfaces, deren Attribute, Methoden und die **Beziehungen** zwischen ihnen. Es ist die Blaupause deiner Software-Architektur.

> 💡 Das Klassendiagramm ist der **Bauplan deiner Software** — bevor du programmierst, modellierst du die Struktur.

---

## 🧱 Aufbau einer Klasse

| Bereich | Inhalt | Sichtbarkeit |
|---------|--------|-------------|
| **Name** | Klassenname | — |
| **Attribute** | Eigenschaften | \`-\` privat, \`+\` öffentlich, \`#\` protected |
| **Methoden** | Funktionen | \`-\` privat, \`+\` öffentlich, \`#\` protected |

---

## 🔗 Arten von Beziehungen

| Beziehung | Symbol | Bedeutung |
|-----------|--------|-----------|
| ➡️ **Assoziation** | Einfache Linie | Klassen wissen voneinander |
| 🔷 **Aggregation** | ◇ Leere Raute | Lose Kopplung — Objekte können unabhängig existieren |
| 🔶 **Komposition** | ◆ Ausgefüllte Raute | Starke Kopplung — existenzabhängig (z.B. Räume ohne Gebäude) |
| 🏗️ **Vererbung** | ▷ Pfeil mit Dreieck | "ist ein" — Kind erbt von Elternklasse |

> 💡 Der UML-Class-Diagram-Builder oben zeigt dir alle Beziehungen interaktiv!

---

## 🔢 Kardinalitäten und Multiplizitäten

| Symbol | Bedeutung |
|--------|-----------|
| \`1\` | Genau eine Instanz |
| \`*\` | Beliebig viele (0 oder mehr) |
| \`1..*\` | Mindestens eine |
| \`0..1\` | Null oder eine |

> ❗ Kardinalitäten werden in der IHK oft abgefragt! 1:n und n:m sind die häufigsten.

---

## 🔨 Ausprobieren

[INTERACTIVE]

> 💡 Der Builder oben zeigt ein komplettes Bestellsystem — erstelle eigene Klassendiagramme!

---

## 🎯 IHK-Tipps

> 💡 **Diese Tipps sichern dir Punkte!**

- 📐 **Beziehungen** sauber zeichnen — Raute immer an der "Besitzer"-Seite
- 🔢 **Kardinalitäten** an beiden Enden der Verbindung eintragen
- 🏗️ **Vererbung** erkennen: "ist ein" → Vererbung, "hat ein" → Komposition/Aggregation
- 📝 **Attribute und Methoden** mit Sichtbarkeit (-/+) versehen`,
    },

    // --- Lektion 8: UML Sequenz- und Zustandsdiagramme ---
    {
      id: "ihk-8",
      title: "UML Sequenz- & Zustandsdiagramme",
      duration: "15 min",
      type: "interactive",
      interactive: "sequenceDiagram",
      content: `# UML Sequenz- und Zustandsdiagramme 📊

## 📨 Sequenzdiagramm

Ein Sequenzdiagramm zeigt die **zeitliche Abfolge** von Nachrichten zwischen Objekten — wie ein Protokoll eines Gesprächs.

### 🧩 Elemente

| Element | Beschreibung |
|---------|-------------|
| 📏 **Lebenslinien** | Gestrichelte Linie unter jedem Objekt — zeigt Existenzdauer |
| ▓ **Aktivierungsbalken** | Zeigt, wann ein Objekt gerade arbeitet |
| ➡️ **Nachrichten** | Pfeile zwischen Lebenslinien (synchron = volle Spitze) |
| ➰ **Rücknachrichten** | Gestrichelte Pfeile zurück |

> ❗ **Regel:** Aktivierungsbalken nur setzen, wenn noch keiner vorhanden ist!

---

## 🔄 Zustandsdiagramm (State Machine)

Ein Zustandsdiagramm beschreibt die **Zustände** eines Objekts und die **Übergänge** zwischen ihnen — wie ein endlicher Automat.

### 🧩 Elemente

| Element | Symbol | Beschreibung |
|---------|--------|-------------|
| 🔵 **Zustand** | Abgerundetes Rechteck | Beschreibt einen Zustand |
| ⬤ **Anfangszustand** | Gefüllter Kreis | Startpunkt |
| ◎ **Endzustand** | Kreis mit Ring | Endpunkt |
| ➡️ **Übergang** | Pfeil | Ereignis [Bedingung] / Aktion |

---

## 🔨 Ausprobieren

[INTERACTIVE]

> 💡 Der Sequence-Diagram-Builder oben zeigt dir eine Online-Bestellung — erstelle eigene Sequenz- und Zustandsdiagramme!

---

## 🎯 IHK-Tipps

> 💡 **Diese Tipps sichern dir Punkte!**

- 📨 **Sequenzdiagramm:** Nachrichten chronologisch ordnen — von oben nach unten
- ▓ **Aktivierungsbalken** nur setzen, wenn nötig — nicht jeder Pfeil braucht einen
- 🔄 **Zustandsdiagramm:** Alle Übergänge beschriften — Ereignis + Bedingung + Aktion
- ⬤ **Anfangs- und Endzustand** nie vergessen!
- 📌 **History-State** erklären können: Wann wird er verwendet?`,
    },

    // --- Lektion 9: Netzplantechnik & ER-Modell & Lastenheft ---
    {
      id: "ihk-9",
      title: "Netzplantechnik, ER-Modell & Lastenheft",
      duration: "20 min",
      type: "interactive",
      interactive: "netzplanBuilder",
      content: `# Netzplantechnik, ER-Modell & Lasten-/Pflichtenheft 📋

## 🗓️ Netzplantechnik

Netzplantechnik ist eine Methode aus dem **Projektmanagement** zur Darstellung von Arbeitsabläufen und deren Abhängigkeiten.

### 🧩 Die vier Zeitpunkte pro Vorgang

| Abkürzung | Bedeutung | Berechnung |
|-----------|-----------|------------|
| 🟢 **FAZ** | Frühester Anfangszeitpunkt | Vorgänger-FEZ |
| 🟢 **FEZ** | Frühester Endzeitpunkt | FAZ + Dauer |
| 🔴 **SAZ** | Spätester Anfangszeitpunkt | SEZ − Dauer |
| 🔴 **SEZ** | Spätester Endzeitpunkt | Nachfolger-SAZ |

> ❗ FAZ/FEZ werden **vorwärts** berechnet (links → rechts), SAZ/SEZ **rückwärts** (rechts → links).

### ⏱️ Pufferzeit & Kritischer Pfad

- **Pufferzeit = SAZ − FAZ** — wie viel Spielraum hat ein Vorgang?
- **Kritischer Pfad** = Kette mit Pufferzeit **0** — jede Verzögerung hier verzögert das Gesamtprojekt

> 💡 Der NetzplanBuilder oben berechnet alles automatisch — probiere es aus!

---

## 🔨 Ausprobieren

[INTERACTIVE]

---

## 🗃️ ER-Modell (Entity-Relationship)

### Was ist ein ER-Modell?

Das ER-Modell beschreibt die **Datenstruktur** eines Systems unabhängig von einer Datenbank. Es zeigt Entitäten (Datenobjekte), ihre Attribute und Beziehungen zueinander.

> 💡 Das ER-Modell ist der **Bauplan deiner Datenbank** — bevor du Tabellen erstellst, modellierst du die Struktur.

---

### 🧩 Elemente

| Element | Symbol | Beispiel |
|---------|--------|---------|
| 📦 **Entitätstyp** | Rechteck | Kunde, Bestellung, Produkt |
| 🏷️ **Attribut** | Ellipse | Name, Preis, ID |
| 🔗 **Beziehung** | Raute | "bestellt", "enthält" |

---

### 🔢 Kardinalitäten

| Typ | Bedeutung | Beispiel |
|-----|-----------|---------|
| **1:1** | Eins zu Eins | Person ↔ Personalausweis |
| **1:n** | Eins zu Viele | Kunde → Bestellungen |
| **n:m** | Viele zu Viele | Schüler ↔ Kurse |

> ❗ **Merke:** n:m-Beziehungen werden in relationalen Datenbanken über eine **Zwischentabelle** aufgelöst!

---

### ☕ Beispiel

\`\`\`
[Kunde] --- (bestellt) --- [Bestellung]
[Bestellung] --- (enthält) --- [Produkt]
\`\`\`

- 1 Kunde → n Bestellungen (1:n)
- 1 Bestellung → n Produkte (n:m über Zwischentabelle)

---

## 📝 Lastenheft & Pflichtenheft

### 📋 Lastenheft — WAS soll das System tun?

Das Lastenheft stammt vom **Auftraggeber** und beschreibt die **Anforderungen**:

- **Funktionale Anforderungen:** Konkrete Funktionen (z.B. "Die App soll Kontostände anzeigen")
- **Nicht-funktionale Anforderungen:** Performance, Sicherheit, Usability
- **Rahmenbedingungen:** Budget, Zeit, Technologievorgaben

---

### ⚙️ Pflichtenheft — WIE wird es umgesetzt?

Das Pflichtenheft stammt vom **Auftragnehmer** und beschreibt die **Lösung**:

- Technische Architektur
- Datenbankdesign
- Schnittstellen
- Testkonzepte
- Zeitplan

---

### ⚔️ Gegenüberstellung

| | 📋 Lastenheft | ⚙️ Pflichtenheft |
|---|---|---|
| **Wer** | Auftraggeber | Auftragnehmer |
| **Inhalt** | WAS soll es tun? | WIE wird es umgesetzt? |
| **Detailgrad** | Anforderungen | Technische Lösung |
| **Zeitpunkt** | Vor der Ausschreibung | Vor der Entwicklung |

---

## 🎯 IHK-Tipps

> 💡 **Diese Tipps sichern dir Punkte!**

- 🗓️ **Netzplan:** FAZ/FEZ vorwärts, SAZ/SEZ rückwärts berechnen — Reihenfolge merken!
- 🔴 **Kritischer Pfad** immer markieren — Pufferzeit 0 = kritisch
- 🗃️ **ER-Modell:** Kardinalitäten an beiden Enden eintragen
- 📝 **Lastenheft vs. Pflichtenheft:** Wer schreibt was? — Das wird oft gefragt!
- 🧪 Immer prüfen: Wurden alle Beziehungen und Kardinalitäten korrekt modelliert?`,
    },
  ],
};

export const ihkCategories = [
  {
    id: "ihk",
    name: "IHK Prüfungsvorbereitung",
    icon: "📋",
    description: "Vorbereitung auf die IHK-Prüfung: Fachinformatiker Anwendungsentwicklung",
    subCategories: [
      { id: "diagramme", name: "Diagramme & Darstellungen", description: "UML, PAP, Struktogramme, EPK, Algorithmen, Netzplantechnik, ER-Modell" },
      { id: "netzwerk", name: "Netzwerktechnik", description: "OSI, TCP/IP, IPv4/IPv6, Subnetting, WLAN, Sicherheit, Protokolle" },
    ],
  },
];
