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
      type: "text",
      content: `# Pseudocode — Algorithmen in codenaher Sprache

## Was ist Pseudocode?

Pseudocode ist eine **sprachunabhängige, formale Sprache**, um Algorithmen zu beschreiben. Er sieht aus wie echter Code, ist aber an keine Programmiersprache gebunden. In der IHK-Prüfung ist Pseudocode ein zentrales Werkzeug — du musst Algorithmen formal beschreiben können, ohne eine bestimmte Sprache zu nutzen.

## Wofür braucht man Pseudocode?

- **Planung:** Vor dem eigentlichen Programmieren den Algorithmus strukturieren
- **Kommunikation:** Andere Entwickler verstehen die Logik ohne Code lesen zu müssen
- **IHK-Prüfung:** Algorithmen in Pseudocode beschreiben ist ein typischer Prüfungsauftrag

## Die wichtigsten Strukturen

### Variablen und Zuweisung
\`\`\`
meineZahl = 42
name = "Moritz"
\`\`\`

### Bedingungen
\`\`\`
if (alter >= 18) {
    print("Volljährig")
} else {
    print("Minderjährig")
}
\`\`\`

### Schleifen — kopfgesteuert (while)
Die Bedingung wird **am Anfang** geprüft. Wenn sie nicht erfüllt ist, wird die Schleife gar nicht erst ausgeführt.
\`\`\`
i = 0
while (i < 10) {
    print(i)
    i = i + 1
}
\`\`\`

### Schleifen — fußgesteuert (do-while)
Die Bedingung wird **am Ende** geprüft. Die Schleife wird **mindestens einmal** ausgeführt, auch wenn die Bedingung von vornherein nicht stimmt.
\`\`\`
i = 0
do {
    print(i)
    i = i + 1
} while (i < 10)
\`\`\`

### Switch/Case
\`\`\`
match (eingabe):
    case "ja": print("Bestätigt")
    case "nein": print("Abgebrochen")
    default: print("Ungültig")
\`\`\`

## Pseudocode-Beispiel: Bubblesort

\`\`\`
function bubbleSort(liste n):
    for i = 0 to n-2:
        for j = 0 to n-2-i:
            if (liste[j] > liste[j+1]):
                temp = liste[j]
                liste[j] = liste[j+1]
                liste[j+1] = temp
\`\`\`

## Regeln für die IHK

1. **Formal codenah** schreiben — keine deutschen Sätze
2. **Geschweifte Klammern** für Einrückung verwenden
3. **Englische Begriffe** bevorzugen (if, else, while, for, return)
4. **Kommentare** mit # oder // ergänzen
5. **Auf Papier** — für die Prüfung per Hand schreibbar
6. **Schreibtischtest** durchführen: Variablenwerte in einer Tabelle protokollieren`
    },

    // --- Lektion 2: Programmablaufplan (PAP) ---
    {
      id: "ihk-2",
      title: "Programmablaufplan (PAP)",
      duration: "12 min",
      type: "text",
      content: `# Programmablaufplan (PAP) — DIN 66001

## Was ist ein PAP?

Ein Programmablaufplan (PAP) ist eine **grafische Darstellung** eines Algorithmus nach der Norm **DIN 66001**. Er zeigt den Ablauf eines Programms mit standardisierten Symbolen — unabhängig von einer Programmiersprache.

## Wofür braucht man ein PAP?

- **Prozessdarstellung:** Code allgemein visualisieren, ohne eine Sprache zu nutzen
- **Kommunikation:** Nicht-Techniker können den Ablauf verstehen
- **IHK-Prüfung:** Typische Aufgabe — Algorithmus als PAP zeichnen

## Die Symbole nach DIN 66001

| Symbol | Form | Bedeutung |
|--------|------|-----------|
| **Start/Ende** | Oval (abgerundetes Rechteck) | Beginn oder Ende des Programms |
| **Operation** | Rechteck | Berechnung, Zuweisung, eine Aktion |
| **Entscheidung** | Raute | Ja/Nein-Abfrage (if/else) |
| **Ein-/Ausgabe** | Parallelogramm | Benutzereingabe oder Bildschirmausgabe |
| **Flusspfeil** | Pfeil | Richtung des Ablaufs |

## Beispiel: PAP für eine Kaffeemaschine

1. **Start** (Oval)
2. **Ausgabe:** "Bitte Geld einwerfen" (Parallelogramm)
3. **Eingabe:** Betrag (Parallelogramm)
4. **Entscheidung:** Betrag >= Preis? (Raute)
   - **Ja →** Kaffee zubereiten (Rechteck) → Ausgabe "Ihr Kaffee" → **Ende**
   - **Nein →** Ausgabe "Zu wenig Geld" → zurück zu Schritt 2

## PAP vs. Struktogramm

| PAP | Struktogramm |
|-----|-------------|
| Kann unstrukturierte Abläufe darstellen (goto) | Nur strukturierte Abläufe |
| Kann schnell unübersichtlich werden | Strukturiert und übersichtlich |
| Schwer in Code übertragbar | Einfach in Code übertragbar |

## Tipps für die IHK

- Auf **Papier** üben — nicht nur am PC
- Symbole **sauber und beschriftet** zeichnen
- **Englische Beschriftungen** verwenden (Start, End, Input, Output)
- Immer einen **Schreibtischtest** durchführen: Variablenwerte in Tabelle protokollieren`
    },

    // --- Lektion 3: Struktogramm ---
    {
      id: "ihk-3",
      title: "Struktogramm (Nassi-Shneiderman)",
      duration: "12 min",
      type: "text",
      content: `# Struktogramm (Nassi-Shneiderman)

## Was ist ein Struktogramm?

Ein Struktogramm nach **Nassi und Shneiderman** ist eine grafische Darstellung von Algorithmen, die **keine Sprünge (goto)** erlaubt. Es erzwingt strukturierte Programmierung und ist damit enger an modernem Code als der PAP.

## Die drei Grundstrukturen

### 1. Sequenz
Aufeinanderfolgende Anweisungen — einfache Abfolge von Codezeilen.

\`\`\`
| Anweisung 1              |
| Anweisung 2              |
| Anweisung 3              |
\`\`\`

### 2. Auswahl (If-Then-Else)
Eine Bedingung führt zu zwei verschiedenen Pfaden.

\`\`\`
            | Bedingung |
|------------+-----------|
| Dann-Teil | Else-Teil |
\`\`\`

### 3. Wiederholung (Schleife)
Ein Block wird wiederholt, solange eine Bedingung stimmt.

\`\`\`
| while (Bedingung)        |
|--------------------------|
| Schleifenrumpf           |
\`\`\`

## Beispiel: Bubblesort als Struktogramm

\`\`\`
function bubbleSort(liste, n):
    for i = 0 to n-2:
        for j = 0 to n-2-i:
            if liste[j] > liste[j+1]:
                tausche(liste[j], liste[j+1])
\`\`\`

Im Struktogramm siehst du die **verschachtelten Schleifen** als ineinander gestapelte Blöcke — die äußere Schleife enthält die innere, die wiederum die Auswahl (if) enthält.

## Struktogramm vs. PAP

| Struktogramm | PAP |
|-------------|-----|
| Keine Sprünge möglich | Sprünge (goto) möglich |
| Einfach in Code übertragbar | Schwerer in Code übertragbar |
| Gut für strukturierte Logik | Kann auch unstrukturierte Logik darstellen |
| Weniger flexibel | Flexibler |

## Vorteile

- Erzwingt saubere, strukturierte Programmierung
- **Direkt auf Code übertragbar** — jede Struktur hat ein Pendant in jeder Programmiersprache
- Übersichtlich bei mittleren Algorithmen

## Nachteile

- **Nicht geeignet** für unstrukturierte Abläufe oder parallele Prozesse
- Bei sehr großen Programmen unübersichtlich
- In der Praxis selten verwendet (außer in der IHK)`
    },

    // --- Lektion 4: Sortieralgorithmen ---
    {
      id: "ihk-4",
      title: "Sortieralgorithmen",
      duration: "20 min",
      type: "text",
      content: `# Sortieralgorithmen — Bubblesort, Selectionsort, Insertionsort

## Warum Sortieren?

Sortieren ist eine der grundlegendsten Aufgaben in der Informatik. Viele Algorithmen (z.B. binäre Suche) benötigen sortierte Daten als Eingabe. Die IHK verlangt das Verständnis und die Implementierung der wichtigsten Sortierverfahren.

---

## Bubblesort (Durchlauf-Methode)

**Prinzip:** Vergleiche benachbarte Elemente und tausche sie, wenn sie in falscher Reihenfolge sind. Wiederhole das Ganze, bis alles sortiert ist.

**Beispiel:** Liste A = [2, 4, 5, 3, 1, 8]

**Durchlauf 1:**
- Vergleiche 2↔4 → OK
- Vergleiche 4↔5 → OK
- Vergleiche 5↔3 → Tausche → [2, 4, 3, 5, 1, 8]
- Vergleiche 5↔1 → Tausche → [2, 4, 3, 1, 5, 8]
- Vergleiche 5↔8 → OK
- Größtes Element (8) ist am Ende! ✅

**Durchlauf 2:** Das größte Element ist schon hinten, also nur bis n-1 prüfen. Das 5 wandert nach hinten.

**Zeitkomplexität:**
- Bester Fall: O(n) (bereits sortiert, eine Optimierung)
- Durchschnitt: O(n²)
- Schlechtester Fall: O(n²) (umgekehrt sortiert)

**Pseudocode:**
\`\`\`
for i = 0 to n-2:
    for j = 0 to n-2-i:
        if A[j] > A[j+1]:
            temp = A[j]
            A[j] = A[j+1]
            A[j+1] = temp
\`\`\`

---

## Selectionsort (Auswahlverfahren)

**Prinzip:** Finde das kleinste Element im unsortierten Teil und tausche es an die erste Position. Wiederhole mit dem Rest.

**Beispiel:** Liste A = [2, 4, 5, 3, 1, 8]

- Kleinste: 1 (Position 4) → Tausche mit Position 0 → [1, 4, 5, 3, 2, 8]
- Kleinste: 2 (Position 4) → Tausche mit Position 1 → [1, 2, 5, 3, 4, 8]
- Und so weiter...

**Zeitkomplexität:** Immer O(n²) —少 Tauschoperationen, aber viele Vergleiche.

---

## Insertionsort (Einfügemethode)

**Prinzip:** Baue die sortierte Liste elementweise auf. Nimm das nächste Element und schiebe es an die richtige Stelle.

**Beispiel:** Liste A = [2, 4, 5, 3, 1, 8]

- 3 ist sortiert: [2, 4, 5] → 3 gehört zwischen 2 und 4 → [2, 3, 4, 5]
- 1 gehört vor alles → [1, 2, 3, 4, 5]
- 8 gehört hinten → [1, 2, 3, 4, 5, 8] ✅

**Zeitkomplexität:**
- Bester Fall: O(n) (fast sortiert — sehr effizient!)
- Durchschnitt: O(n²)
- Schlechtester Fall: O(n²)

---

## Vergleich

| | Bubblesort | Selectionsort | Insertionsort |
|---|---|---|---|
| **Prinzip** | Nachbarn vergleichen | Kleinstes suchen | Element einfügen |
| **Vergleiche** | O(n²) | O(n²) | O(n²) |
| **Tauschungen** | O(n²) | O(n) | O(n²) |
| **Stabil?** | Ja | Nein | Ja |
| **Best for** | Verständnis | Wenig Tausche | Fast sortiert |

> **Merke:** Alle drei haben O(n²) — für die IHK reicht das. Echte Anwendungen nutzen Quicksort (O(n log n)) oder Mergesort.`,
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
      type: "text",
      content: `# Suchalgorithmen — Lineare und Binäre Suche

## Warum Suchen?

Daten suchen ist eine der häufigsten Operationen in der Softwareentwicklung — ob in einer Datenbank, einer Datei oder einer Liste. Die Art der Suche bestimmt, wie schnell du dein Ziel findest.

---

## Lineare Suche

**Prinzip:** Gehe die Liste von Anfang bis Ende durch und prüfe jedes Element.

**Voraussetzung:** Keine — die Liste muss NICHT sortiert sein.

**Zeitkomplexität:** O(n) — im schlimmsten Fall musst du alles durchsuchen.

**Pseudocode:**
\`\`\`
function linearSearch(liste, ziel):
    for i = 0 to length(liste)-1:
        if liste[i] == ziel:
            return i
    return -1  // nicht gefunden
\`\`\`

**Beispiel:** Liste = [2, 4, 5, 3, 1, 8], Ziel = 3
- Prüfe 2 → nein
- Prüfe 4 → nein
- Prüfe 5 → nein
- Prüfe 3 → JA! Gefunden an Index 3 ✅

---

## Binäre Suche

**Prinzip:** Teile die sortierte Liste in der Mitte. Ist das mittlere Element das Ziel? Falls nicht: Suche nur in der linken oder rechten Hälfte weiter.

**Voraussetzung:** Die Liste MUSS **sortiert** sein!

**Zeitkomplexität:** O(log n) — viel schneller als linear!

**Pseudocode:**
\`\`\`
function binarySearch(liste, ziel):
    links = 0
    rechts = length(liste) - 1

    while links <= rechts:
        mitte = (links + rechts) / 2
        if liste[mitte] == ziel:
            return mitte
        else if liste[mitte] < ziel:
            links = mitte + 1
        else:
            rechts = mitte - 1

    return -1  // nicht gefunden
\`\`\`

**Beispiel:** Sortierte Liste = [1, 2, 3, 4, 5, 8], Ziel = 3
1. Mitte = (0+5)/2 = 2 → liste[2] = 3 → Gefunden! ✅

**Beispiel 2:** Sortierte Liste = [1, 2, 3, 4, 5, 8], Ziel = 8
1. Mitte = 2 → liste[2] = 3 < 8 → Suche rechts (links = 3)
2. Mitte = (3+5)/2 = 4 → liste[4] = 5 < 8 → Suche rechts (links = 5)
3. Mitte = (5+5)/2 = 5 → liste[5] = 8 → Gefunden! ✅

---

## Vergleich

| | Lineare Suche | Binäre Suche |
|---|---|---|
| **Sortiert nötig?** | Nein | Ja |
| **Zeitkomplexität** | O(n) | O(log n) |
| **Bei 1 Million Einträgen** | max. 1.000.000 Schritte | max. ~20 Schritte |

> **Merke:** Binäre Suche ist exponentiell schneller, braucht aber eine sortierte Liste. In der IHK immer prüfen: Ist die Liste sortiert?`,
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
      type: "text",
      content: `# Ereignisgesteuerte Prozesskette (EPK)

## Was ist eine EPK?

Eine EPK (Ereignisgesteuerte Prozesskette) ist ein Diagramm zur Darstellung von **Geschäftsprozessen**. Sie zeigt die logische und chronologische Abfolge von Ereignissen und Funktionen und wird häufig in der **Prozessoptimierung und Dokumentation** verwendet — auch bei Unternehmen wie Phoenix Contact.

## Wofür braucht man eine EPK?

- **Prozessdokumentation:** Abläufe im Unternehmen visualisieren
- **Prozessoptimierung:** Schwachstellen und Verbesserungspotenziale erkennen
- **Kommunikation:** Abteilungen verstehen gemeinsame Prozesse
- **IHK-Prüfung:** Geschäftsprozesse als EPK modellieren

## Die Elemente der EPK

| Element | Symbol | Beschreibung |
|---------|--------|-------------|
| **Ereignis** | Sechseck | Beschreibt, was passiert (z.B. "Bestellung eingegangen") |
| **Funktion** | Abgerundetes Rechteck | Beschreibt eine Tätigkeit (z.B. "Bestellung bearbeiten") |
| **Operator** | AND / OR / XOR | Logische Verknüpfung mehrerer Pfade |
| **Organisation** | Ellipse | Abteilung/Person für eine Funktion |
| **Information** | Dokument-Symbol | Daten für eine Funktion |

## Die Operatoren

### AND (UND)
Alle nachfolgenden Pfade werden **parallel** ausgeführt — alle müssen abgearbeitet werden.

### OR (ODER)
**Mehrere** Pfade können gewählt werden — mindestens einer.

### XOR (Exklusives Oder)
Genau **ein** Pfad wird gewählt — entweder der eine oder der andere.

## Grundregel der EPK

**Ereignis → Funktion → Ereignis → Funktion → ...**

Ereignisse und Funktionen **wechseln sich immer ab**. Direkt hintereinander zwei Funktionen oder zwei Ereignisse ist NICHT erlaubt.

## Beispiel: Bestellprozess

1. **Ereignis:** Bestellung eingegangen
2. → **Funktion:** Bestellung prüfen
3. → **Ereignis:** Bestellung geprüft
4. → **XOR:**
   - Ja → **Funktion:** Ware ausliefern → **Ereignis:** Ware geliefert
   - Nein → **Funktion:** Kunde kontaktieren → **Ereignis:** Kunde informiert`

    },

    // --- Lektion 7: UML Klassendiagramme ---
    {
      id: "ihk-7",
      title: "UML Klassendiagramme",
      duration: "18 min",
      type: "text",
      content: `# UML Klassendiagramme

## Was ist ein Klassendiagramm?

Das Klassendiagramm ist das **wichtigste Strukturdiagramm** in UML. Es zeigt Klassen, Interfaces, deren Attribute, Methoden und die **Beziehungen** zwischen ihnen. Es ist die Blaupause deiner Software-Architektur.

## Aufbau einer Klasse

\`\`\`
| ClassName          |
|-------------------|
| - privateAttr: Type |
| + publicAttr: Type  |
|-------------------|
| + method(): Type   |
| + method2(arg: T): T |
\`\`\`

- **-** (Minus) = private
- **+** (Plus) = public
- **#** (Raute) = protected

## Arten von Beziehungen

### 1. Assoziation
Einfache Verbindung zwischen Klassen. Zwei Klassen wissen voneinander.

### 2. Aggregation (lose Kopplung)
Objekte können **unabhängig** existieren. Dargestellt durch eine **leere Raute**.

**Beispiel:** Student und Vorlesung — Ein Student kann eine Vorlesung besuchen, existiert aber unabhängig davon.

### 3. Komposition (starke Kopplung)
Objekte sind **existenzabhängig**. Dargestellt durch eine **ausgefüllte Raute**.

**Beispiel:** Gebäude und Räume — Ohne das Gebäude können die Räume nicht existieren.

### 4. Vererbung (Generalisierung)
Eine Klasse erbt von einer anderen. Dargestellt durch einen **Pfeil mit leerem Dreieck**.

**Beispiel:** "Auto" erbt von "Fahrzeug" — Auto ist ein Fahrzeug.

## Kardinalitäten und Multiplizitäten

| Symbol | Bedeutung |
|--------|-----------|
| \`1\` | Genau eine Instanz |
| \`*\` | Beliebig viele (0 oder mehr) |
| \`1..*\` | Mindestens eine |
| \`0..1\` | Null oder eine |
| \`5..10\` | Zwischen 5 und 10 |

**Beispiel:** Ein Kunde hat \`*\` Bestellungen. Eine Bestellung gehört \`1\` Kunde.

## Beispiel: Klassendiagramm

\`\`\`
Kunde (1) --- Bestellung (*)
Bestellung (1) --- Artikel (*)
Bestellung (1) --- Mitarbeiter (1)
\`\`\`

- Ein Kunde kann mehrere Bestellungen haben
- Eine Bestellung enthält mehrere Artikel
- Jede Bestellung wird von einem Mitarbeiter erstellt`
    },

    // --- Lektion 8: UML Sequenz- und Zustandsdiagramme ---
    {
      id: "ihk-8",
      title: "UML Sequenz- & Zustandsdiagramme",
      duration: "15 min",
      type: "text",
      content: `# UML Sequenz- und Zustandsdiagramme

## Sequenzdiagramm

### Was ist ein Sequenzdiagramm?

Ein Sequenzdiagramm zeigt die **zeitliche Abfolge** der Nachrichten (Methodenaufrufe, Events) zwischen Objekten. Du siehst genau, welche Objekte miteinander kommunizieren und in welcher Reihenfolge.

### Elemente

- **Lebenslinien (Lifelines):** Gestrichelte Linie unter jedem Objekt — zeigt, wie lange das Objekt existiert
- **Aktivierungsbalken:** Zeigt, wann ein Objekt gerade arbeitet/aktiv ist
- **Nachrichten:** Pfeile zwischen Lebenslinien (synchron = volle Pfeilspitze, asynchron = offene Spitze)
- **Rücknachrichten:** Gestrichelte Pfeile zurück

### Regeln für Aktivierungsbalken

- Balken erscheint am Empfänger einer synchronen Nachricht
- Bleibt so lange, bis die Antwort gesendet wird
- **Nur Balken setzen, wenn noch keiner vorhanden** — unnötige Balken weglassen
- Der gesendende Balken bleibt bestehen, wenn noch weitere Aktionen folgen

### Beispiel: Online-Bestellung

\`\`\`
Kunde -> Bestellsystem: "Produkt auswählen"
Bestellsystem -> Warenkorb: "Produkt hinzufügen"
Warenkorb -> Bestellsystem: "Bestätigung"
Bestellsystem -> Kunde: "Im Warenkorb"
Kunde -> Bestellsystem: "Bestellen"
Bestellsystem -> Zahlung: "Zahlung anfordern"
Zahlung -> Bestellsystem: "Zahlung OK"
Bestellsystem -> Kunde: "Bestellung bestätigt"
\`\`\`

---

## Zustandsdiagramm (State Machine)

### Was ist ein Zustandsdiagramm?

Ein Zustandsdiagramm beschreibt die verschiedenen **Zustände** eines Objekts und die **Übergänge** zwischen ihnen. Es ist wie ein endlicher Automat — für jeden Zustand ist definiert, was bei einem Ereignis passiert.

### Elemente

- **Zustände:** Abgerundete Rechtecke
- **Anfangszustand:** Gefüllter Kreis
- **Endzustand:** Gefüllter Kreis mit Ring
- **Übergänge:** Pfeile mit Beschriftung (Ereignis [Bedingung] / Aktion)
- **History-State:** (H) — merkt sich den letzten Zustand

### Beispiel: Bestellstatus

\`\`\`
[Angelegt] --"Bestätigt"--> [In Bearbeitung]
[In Bearbeitung] --"Versandt"--> [Unterwegs]
[Unterwegs] --"Zugestellt"--> [Abgeschlossen]
[In Bearbeitung] --"Storniert"--> [Storniert]
[Unterwegs] --"Retoure"--> [Rücksendung]
\`\`\`

### History-State

Wenn ein Objekt aus einem Unterzustand unterbrochen wird und später zurückkehrt, springt der History-State nicht zum Anfang, sondern an die **letzte Position** zurück. In Aktivitätsdiagrammen wird das auch Pseudostatus genannt.`
    },

    // --- Lektion 9: Netzplantechnik & ER-Modell & Lastenheft ---
    {
      id: "ihk-9",
      title: "Netzplantechnik, ER-Modell & Lastenheft",
      duration: "20 min",
      type: "text",
      content: `# Netzplantechnik, ER-Modell & Lasten-/Pflichtenheft

## Netzplantechnik

### Was ist Netzplantechnik?

Netzplantechnik ist eine Methode aus dem **Projektmanagement**, um Arbeitsabläufe und deren Abhängigkeiten darzustellen. Sie hilft bei der Planung, Steuerung und Überwachung von Projekten.

### Aufbau eines Netzknotens

Jeder Vorgang hat vier Zeitpunkte:

| Abkürzung | Bedeutung | Berechnung |
|-----------|-----------|------------|
| **FAZ** | Frühester Anfangszeitpunkt | Vorgänger-FEZ |
| **FEZ** | Frühester Endzeitpunkt | FAZ + Dauer |
| **SAZ** | Spätester Anfangszeitpunkt | SEZ − Dauer |
| **SEZ** | Spätester Endzeitpunkt | Nachfolger-SAZ |

### Pufferzeit

**Pufferzeit = SAZ − FAZ**

Gibt an, wie viel Spielraum ein Vorgang hat, ohne das gesamte Projekt zu verzögern.

### Kritischer Pfad

Der **kritische Pfad** ist die Kette von Vorgängen, bei denen die **Pufferzeit = 0** ist. Jede Verzögerung auf diesem Pfad verzögert das gesamte Projekt. Er ist der längste Pfad durch das Netzwerk.

---

## ER-Modell (Entity-Relationship)

### Was ist ein ER-Modell?

Das ER-Modell beschreibt die **Datenstruktur** eines Systems unabhängig von einer Datenbank. Es zeigt Entitäten (Datenobjekte), ihre Attribute und Beziehungen zueinander.

### Elemente

| Element | Symbol | Beispiel |
|---------|--------|---------|
| **Entitätstyp** | Rechteck | Kunde, Bestellung, Produkt |
| **Attribut** | Ellipse | Name, Preis, ID |
| **Beziehung** | Raute | "bestellt", "enthält" |

### Kardinalitäten

| Typ | Bedeutung | Beispiel |
|-----|-----------|---------|
| **1:1** | Eins zu Eins | Person ↔ Personalausweis |
| **1:n** | Eins zu Viele | Kunde → Bestellungen |
| **n:m** | Viele zu Viele | Schüler ↔ Kurse |

### Beispiel

\`\`\`
[Kunde] --- (bestellt) --- [Bestellung]
[Bestellung] --- (enthält) --- [Produkt]
\`\`\`

- 1 Kunde → n Bestellungen (1:n)
- 1 Bestellung → n Produkte (n:m über Zwischentabelle)

---

## Lastenheft & Pflichtenheft

### Lastenheft — WAS soll das System tun?

Das Lastenheft stammt vom **Auftraggeber** und beschreibt die **Anforderungen**:

- **Funktionale Anforderungen:** Konkrete Funktionen (z.B. "Die App soll Kontostände anzeigen")
- **Nicht-funktionale Anforderungen:** Performance, Sicherheit, Usability
- **Rahmenbedingungen:** Budget, Zeit, Technologievorgaben

### Pflichtenheft — WIE wird es umgesetzt?

Das Pflichtenheft stammt vom **Auftragnehmer** und beschreibt die **Lösung**:

- Technische Architektur
- Datenbankdesign
- Schnittstellen
- Testkonzepte
- Zeitplan

### Gegenüberstellung

| | Lastenheft | Pflichtenheft |
|---|---|---|
| **Wer** | Auftraggeber | Auftragnehmer |
| **Inhalt** | WAS soll es tun? | WIE wird es umgesetzt? |
| **Detailgrad** | Anforderungen | Technische Lösung |
| **Zeitpunkt** | Vor der Ausschreibung | Vor der Entwicklung |`
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
    ],
  },
];
