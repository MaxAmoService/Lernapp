import { Module } from "./types";

// ============================================================================
// IHK "Software-Qualitätsstandards" — Modul-Daten
// Quelle: IHK IT-Handbuch + Moritz' Mitschriften
// ============================================================================

export const qualitaetModule: Module = {
  id: "ihk-qualitaet",
  slug: "ihk-qualitaet",
  title: "Software-Qualitätsstandards",
  description: "IHK IT-Handbuch: ISO 9126, Design Patterns, Anti-Patterns, Architekturstile, Testverfahren, Code Smells, Vorgehensmodelle",
  icon: "✅",
  color: "#10B981",
  category: "ihk",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Software-Qualitätsstandards (IHK)

### Was ist Softwarequalität?
- Fähigkeit, stated und implied needs zu erfüllen (ISO/IEC/IEEE 24765:2017)
- Grad der Erfüllung von Anforderungen

### ISO 9126 — Qualitätsmerkmale
- **Funktionalität:** Korrektheit, Sicherheit, Interoperabilität
- **Zuverlässigkeit:** Reife, Fehlertoleranz, Wiederherstellbarkeit
- **Benutzbarkeit:** Verständlichkeit, Erlernbarkeit, Bedienbarkeit
- **Effizienz:** Zeitverhalten, Ressourcenverhalten
- **Wartbarkeit:** Analysierbarkeit, Änderbarkeit, Testbarkeit
- **Portabilität:** Anpassbarkeit, Installierbarkeit, Austauschbarkeit

### Design Patterns (23 GoF)
- **Creational:** Singleton, Factory, Abstract Factory, Builder, Prototype
- **Structural:** Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
- **Behavioral:** Strategy, Observer, Command, Iterator, State, Template Method

### Architekturstile
- **Schichtenarchitektur:** Präsentation → Anwendung → Datenhaltung
- **MVC:** Model (Daten) → View (Darstellung) → Controller (Logik)
- **Microservices:** Unabhängige Services mit eigener DB

### Testverfahren
- **Unit-Test:** Einzelne Funktionen/Klassen isoliert
- **Integrationstest:** Zusammenspiel zwischen Modulen
- **Systemtest:** Gesamtes System
- **Akzeptanztest:** Durch den Kunden
- **Black-Box:** Ohne Kenntnis der Implementierung
- **White-Box:** Mit Kenntnis des Codes

### Code Smells
- Lange Methoden (>20 Zeilen)
- Lange Parameterlisten (>4)
- Error Hiding
- Reinvent the Wheel

### Clean Code & SOLID
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion`,

  lessons: [
    // --- Lektion 1: Softwarequalität Definition ---
    {
      id: "sq-1",
      title: "Was ist Softwarequalität?",
      duration: "12 min",
      type: "text",
      content: `## Softwarequalität — Was bedeutet das?

> In diesem Modul lernst du die wichtigsten Qualitätsstandards, Design Patterns und Testverfahren kennen — alles prüfungsrelevant für die IHK! Wir starten mit der Definition von Qualität und arbeiten uns zu konkreten Werkzeugen vor.

---

Nach der **ISO/IEC/IEEE 24765:2017** ist Softwarequalität:

> "The capability of a software product to satisfy stated and implied needs when used under specified conditions."

Einfach gesagt: **Tut das Programm, was es soll — und tut es gut?**

---

## 📊 Wie entsteht ein Standard?

| Schritt | Beschreibung |
|---------|-------------|
| 📝 **Antrag** | Bedarf wird erkannt |
| 👥 **Expertenteam** | Verfasst den Entwurf |
| 💬 **Diskussion** | Entwurf wird mit Öffentlichkeit angepasst |
| ✅ **Fertigstellung** | Standard wird veröffentlicht |

### Ebenen
- 🇩🇪 **National:** DIN (Deutsches Institut für Normung)
- 🇪🇺 **Europäisch:** CEN
- 🌍 **International:** ISO

> ⚠️ Der Prozess kann **3-5 Jahre** dauern!

---

## 💀 Software-Katastrophen — Warum Qualität wichtig ist

| Katastrophe | Jahr | Problem | Kosten |
|-------------|------|---------|--------|
| 🏫 Denver Airport | 1995 | Fehler im Gepäcksystem | 50 Mio. € |
| ✈️ Heathrow Terminal 5 | 2008 | Tausende Gepäckstücke verloren | — |
| 🏗️ Berlin Brandenburg | 2006+ | Softwareprobleme bei Türen/Licht/Sicherheit | 290 Mio. € |
| ☕ Starbucks | 2015 | Kassensystem weltweit ausgefallen | Imageschaden |
| 🚗 Nissan Airbag | 2015 | 3,2 Mio. Autos zurückgerufen | Rückrufkosten |
| 🌡️ Nest Thermostat | 2016 | Keine Heizung im Winter | Kundenabwanderung |
| 💻 CrowdStrike | 2024 | Weltweiter Windows-Ausfall | Milliarden |

> 💡 **Merke:** Softwarefehler können **Milliarden** kosten und **Leben gefährden**. Qualität ist kein Luxus!

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Nennen Sie 3 Beispiele für Software-Katastrophen und deren Ursachen!" — Mangelhafte Tests, schlechte Kommunikation, überhastete Updates.`
    },

    // --- Lektion 2: ISO 9126 ---
    {
      id: "sq-2",
      title: "ISO 9126 — Qualitätsmerkmale",
      duration: "15 min",
      type: "text",
      content: `## ISO 9126 — Die 6 Qualitätsmerkmale

> In der letzten Lektion haben wir gelernt, WAS Softwarequalität ist und WARUM sie wichtig ist. Jetzt schauen wir uns ein konkreteres Framework an: Die ISO 9126 definiert 6 messbare Qualitätsmerkmale.

Die **ISO 9126** definiert 6 Hauptmerkmale für Softwarequalität. Diese Struktur hilft, Qualität **systematisch** zu bewerten.

---

## 📊 Die 6 Qualitätsmerkmale

### 1️⃣ Funktionalität

> Tut das System, was es soll?

| Unterkriterium | Beschreibung |
|----------------|-------------|
| **Korrektheit** | Ergebnisse sind richtig |
| **Sicherheit** | Zugriffskontrolle, Verschlüsselung |
| **Interoperabilität** | Zusammenarbeit mit anderen Systemen |
| **Konformität** | Standards einhalten |

### 2️⃣ Zuverlässigkeit

> Läuft das System stabil?

| Unterkriterium | Beschreibung |
|----------------|-------------|
| **Reife** | Wenige Fehler im Betrieb |
| **Fehlertoleranz** | System läuft trotz Fehlern weiter |
| **Wiederherstellbarkeit** | Nach Absturz wiederherstellbar |

### 3️⃣ Benutzbarkeit

> Ist das System einfach zu bedienen?

| Unterkriterium | Beschreibung |
|----------------|-------------|
| **Verständlichkeit** | Funktionen sind nachvollziehbar |
| **Erlernbarkeit** | Schnell zu erlernen |
| **Bedienbarkeit** | Effizient nutzbar |

### 4️⃣ Effizienz

> Nutzt das System Ressourcen gut?

| Unterkriterium | Beschreibung |
|----------------|-------------|
| **Zeitverhalten** | Antwortzeiten |
| **Ressourcenverbrauch** | CPU, RAM, Speicher |

### 5️⃣ Wartbarkeit

> Ist das System einfach zu pflegen?

| Unterkriterium | Beschreibung |
|----------------|-------------|
| **Analysierbarkeit** | Fehler finden |
| **Änderbarkeit** | Code anpassen |
| **Testbarkeit** | Tests durchführbar |
| **Stabilität** | Änderungen brechen nichts |

### 6️⃣ Portabilität

> Läuft das System überall?

| Unterkriterium | Beschreibung |
|----------------|-------------|
| **Anpassbarkeit** | An andere Umgebungen anpassbar |
| **Installierbarkeit** | Einfach zu installieren |
| **Austauschbarkeit** | Komponenten ersetzbar |

---

## 📋 Zusammenfassung

| Merkmal | Kernfrage | Beispiel |
|---------|-----------|----------|
| **Funktionalität** | Tut es was es soll? | Login funktioniert |
| **Zuverlässigkeit** | Läuft es stabil? | Kein Absturz |
| **Benutzbarkeit** | Ist es einfach? | Intuitive UI |
| **Effizienz** | Ist es schnell? | <2s Ladezeit |
| **Wartbarkeit** | Ist es pflegbar? | Sauberer Code |
| **Portabilität** | Läuft es überall? | Windows + Linux |

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Nennen Sie die 6 Qualitätsmerkmale der ISO 9126!" — Funktionalität, Zuverlässigkeit, Benutzbarkeit, Effizienz, Wartbarkeit, Portabilität.`
    },

    // --- Lektion 3: Design Patterns ---
    {
      id: "sq-3",
      title: "Design Patterns — Die wichtigsten Muster",
      duration: "25 min",
      type: "interactive",
      interactive: "patternExplorer",
      content: `## Design Patterns — Lösungen für bekannte Probleme

> Nachdem wir die Qualitätsmerkmale kennengelernt haben, widmen wir uns jetzt konkreten Lösungsmustern. Design Patterns sind wie **Bauanleitungen für bewährte Probleme** — sie helfen dir, sauberen Code zu schreiben.

> Die SOLID-Prinzipien im Modul "Erweiterte Programmierung" ergänzen diese Patterns perfekt.

**Design Patterns** sind bewährte Lösungen für häufig auftretende Probleme in der Softwareentwicklung. Sie sind kein konkreter Code, sondern **allgemeine Konzepte**.

---

## 🎯 Was sind Design Patterns?

> "The pattern is not a specific piece of code, but a general concept for solving a particular problem."

### Unterschied zum Algorithmus
| | Algorithmus | Pattern |
|---|---|---|
| **Fokus** | Schritt-für-Schritt Lösung | High-Level Lösungskonzept |
| **Anwendung** | Ein Problem | Mehrere Probleme |
| **Code** | Spezifisch | Allgemein |

---

## 📂 Die drei Kategorien

| Kategorie | Zweck | Beispiel |
|-----------|-------|----------|
| 🏗️ **Creational** | Objekterstellung | Singleton, Factory |
| 🏛️ **Structural** | Struktur aufbauen | Adapter, Facade |
| 🎭 **Behavioral** | Verhalten regeln | Strategy, Observer |

---

## 🏗️ Creational Patterns

### Singleton
> Stellt sicher, dass eine Klasse **nur eine Instanz** hat.

\`\`\`python
class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
\`\`\`

**Verwendung:** Datenbankverbindung, Logger, Config-Manager

### Factory Method
> Definiert eine Schnittstelle zur Objekterstellung, lässt Unterklassen entscheiden.

\`\`\`python
class AnimalFactory:
    def create(self, type):
        if type == "dog": return Dog()
        if type == "cat": return Cat()
\`\`\`

**Verwendung:** Wenn die Art des Objekts erst zur Laufzeit feststeht.

---

## 🏛️ Structural Patterns

### Adapter
> Passt eine inkompatible Schnittstelle an die erwartete an.

\`\`\`python
class OldPrinter:
    def print_old(self, text):
        print(f"OLD: {text}")

class PrinterAdapter:
    def __init__(self, printer):
        self.printer = printer

    def print(self, text):
        self.printer.print_old(text)
\`\`\`

**Verwendung:** Alte Systeme in neue integrieren.

### Facade
> Bietet eine vereinfachte Schnittstelle zu einem komplexen System.

\`\`\`python
class ComputerFacade:
    def start(self):
        self.cpu.start()
        self.ram.load()
        self.hdd.read()
\`\`\`

**Verwendung:** Komplexe Bibliotheken einfacher nutzbar machen.

### Decorator
> Fügt einem Objekt dynamisch neue Funktionen hinzu.

\`\`\`python
class Coffee:
    def cost(self): return 5

class MilkDecorator:
    def __init__(self, coffee):
        self.coffee = coffee
    def cost(self):
        return self.coffee.cost() + 2
\`\`\`

**Verwendung:** Funktionen zur Laufzeit erweitern.

---

## 🎭 Behavioral Patterns

### Strategy
> Definiert eine Familie von Algorithmen und macht sie austauschbar.

\`\`\`python
class SortStrategy:
    def sort(self, data): pass

class BubbleSort(SortStrategy):
    def sort(self, data):
        # Bubblesort-Implementierung
        pass

class QuickSort(SortStrategy):
    def sort(self, data):
        # Quicksort-Implementierung
        pass
\`\`\`

**Verwendung:** Wenn ein Algorithmus zur Laufzeit gewechselt werden soll.

### Observer
> Benachrichtigt abhängige Objekte bei Zustandsänderungen.

\`\`\`python
class EventEmitter:
    def __init__(self):
        self.listeners = []

    def subscribe(self, listener):
        self.listeners.append(listener)

    def emit(self, event):
        for listener in self.listeners:
            listener.notify(event)
\`\`\`

**Verwendung:** Event-Systeme, UI-Updates, Messaging.

---

## 📋 Zusammenfassung der wichtigsten Patterns

| Pattern | Typ | Zweck |
|---------|-----|-------|
| **Singleton** | Creational | Eine einzige Instanz |
| **Factory** | Creational | Objekterstellung delegieren |
| **Adapter** | Structural | Inkompatible Schnittstellen |
| **Facade** | Structural | Vereinfachte Schnittstelle |
| **Decorator** | Structural | Dynamisch erweitern |
| **Strategy** | Behavioral | Algorithmen austauschen |
| **Observer** | Behavioral | Bei Änderung benachrichtigen |

---

## 🔨 Patterns erkunden

[INTERACTIVE]

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Erklären Sie das Strategy-Pattern!" — Definiert eine Familie von Algorithmen, kapselt sie in separate Klassen und macht sie austauschbar. Beispiel: Verschiedene Sortierverfahren zur Laufzeit wechseln.`
    },

    // --- Lektion 4: Architekturstile ---
    {
      id: "sq-4",
      title: "Architekturstile — Schichten, MVC, Microservices",
      duration: "15 min",
      type: "text",
      content: `## Architekturstile — Wie strukturiere ich Software?

> Nach den Design Patterns (kleine Lösungsmuster) schauen wir uns jetzt das große Ganze an: Wie strukturiere ich eine gesamte Anwendung? Die Wahl des Architekturstils entscheidet über Wartbarkeit und Skalierbarkeit.

Ein **Architekturstil** definiert, wie die Komponenten einer Anwendung organisiert und miteinander verbunden sind.

---

## 🏛️ Schichtenarchitektur

Trennt eine Anwendung in **logisch getrennte Schichten**. Jede Schicht hat eine klare Aufgabe.

\`\`\`
┌─────────────────────┐
│   Präsentation      │  ← UI, Darstellung
├─────────────────────┤
│   Anwendung         │  ← Geschäftslogik
├─────────────────────┤
│   Datenhaltung      │  ← Datenbank, Speicher
└─────────────────────┘
\`\`\`

### Regeln
- Kommunikation nur **zwischen benachbarten Schichten**
- **Strenge Schichtenarchitektur:** Nur von oben nach unten
- **Lockere Schichtenarchitektur:** Auch Schichten überspringen

### Vorteile
- ✅ Klare Trennung der Verantwortlichkeiten
- ✅ Gut testbar
- ✅ Austauschbar (z.B. Datenbank wechseln)

### Nachteile
- ❌ Kann zu viel Overhead erzeugen
- ❌ Performance durch viele Schichten

---

## 🔄 Model-View-Controller (MVC)

Strukturiert eine Anwendung in **drei Komponenten**:

| Komponente | Aufgabe | Beispiel |
|------------|---------|----------|
| 📊 **Model** | Daten + Logik | Datenbank, Berechnungen |
| 🖼️ **View** | Darstellung | HTML, UI |
| 🎮 **Controller** | Vermittler | Verarbeitet Input, steuert Model |

### Kommunikationsfluss
\`\`\`
User → View → Controller → Model → Controller → View → User
\`\`\`

### Vorteile
- ✅ Klare Trennung von UI und Logik
- ✅ Gut testbar (Model unabhängig von View)
- ✅ Mehrere Views für ein Model möglich

---

## 🧩 Microservices

Bei Microservices werden Aufgaben in **unabhängige Services** gekapselt:

\`\`\`
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Service A │  │ Service B │  │ Service C │
│ (Auth)    │  │ (Orders)  │  │ (Payment) │
│ DB-A      │  │ DB-B      │  │ DB-C      │
└──────────┘  └──────────┘  └──────────┘
      ↑              ↑              ↑
      └──────────── API ────────────┘
\`\`\`

### Eigenschaften
- Jeder Service ist **logisch getrennt** und **technisch unabhängig**
- Eigene Datenbank pro Service möglich
- Kommunikation über **APIs** (nicht Methodenaufrufe)
- Können unabhängig skaliert und aktualisiert werden

### Vorteile
- ✅ Unabhängige Entwicklung und Deployment
- ✅ Technologie-Freiheit pro Service
- ✅ Skalierbar

### Nachteile
- ❌ Komplexität (Netzwerk, API-Management)
- ❌ Schwieriges Debugging
- ❌ Datenkonsistenz

---

## ⚔️ Vergleich

| | Schichten | MVC | Microservices |
|---|---|---|---|
| **Komplexität** | Niedrig | Mittel | Hoch |
| **Trennung** | Horizontal | Vertikal | Unabhängig |
| **Skalierung** | Schichtweise | Komponente | Service |
| **Use Case** | Web-Apps | UI-Frameworks | Großprojekte |

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Erklären Sie die Schichtenarchitektur!" — Präsentation, Anwendung, Datenhaltung. Kommunikation nur zwischen benachbarten Schichten. Vorteile: Klare Trennung, testbar, austauschbar.`
    },

    // --- Lektion 5: Testverfahren ---
    {
      id: "sq-5",
      title: "Testverfahren — Unit, Integration, System",
      duration: "15 min",
      type: "text",
      content: `## Testverfahren — Qualität sicherstellen

> Wir kennen jetzt Qualitätsmerkmale, Patterns und Architekturen. Aber wie stellen wir sicher, dass unser Code auch wirklich funktioniert? Durch Tests! Verschiedene Testarten decken verschiedene Aspekte ab.

> Unit Tests behandeln wir auch im Modul "Erweiterte Programmierung" — dort mit Fokus auf das Schreiben von Tests.

Tests sind **essenziell** für Softwarequalität. Es gibt verschiedene Testarten, die unterschiedliche Aspekte prüfen.

---

## 🧪 Die Testpyramide

\`\`\`
        ╱╲
       ╱  ╲      ← E2E/Manuell (wenige, langsam)
      ╱────╲
     ╱      ╲    ← Integrationstests (mehrere)
    ╱────────╲
   ╱          ╲  ← Unit-Tests (viele, schnell)
  ╱────────────╲
\`\`\`

---

## 1️⃣ Unit-Test (Modultest)

> Testet **einzelne Funktionen oder Klassen** isoliert.

\`\`\`python
def addiere(a, b):
    return a + b

def test_addiere():
    assert addiere(2, 3) == 5
    assert addiere(-1, 1) == 0
\`\`\`

| Merkmal | Beschreibung |
|---------|-------------|
| **Umfang** | Eine Funktion/Klasse |
| **Geschwindigkeit** | Sehr schnell |
| **Werkzeuge** | unittest, pytest (Python), JUnit (Java) |

---

## 2️⃣ Integrationstest

> Testet das **Zusammenspiel** zwischen mehreren Modulen.

\`\`\`python
def test_login_flow():
    user = create_user("test@test.de", "pass123")
    result = login("test@test.de", "pass123")
    assert result.success == True
\`\`\`

| Merkmal | Beschreibung |
|---------|-------------|
| **Umfang** | Mehrere Module zusammen |
| **Geschwindigkeit** | Mittel |
| **Ziel** | Fehler in Schnittstellen finden |

---

## 3️⃣ Systemtest

> Testet das **gesamte System** als Ganzes.

| Merkmal | Beschreibung |
|---------|-------------|
| **Umfang** | Komplette Anwendung |
| **Geschwindigkeit** | Langsam |
| **Ziel** | End-to-End funktioniert alles? |

---

## 4️⃣ Akzeptanztest

> Wird vom **Kunden** durchgeführt. Prüft ob die Anforderungen erfüllt sind.

| Merkmal | Beschreibung |
|---------|-------------|
| **Durchführung** | Kunde/Anwender |
| **Ziel** | Erfüllt das System die Anforderungen? |

---

## ⚔️ Black-Box vs. White-Box

| | Black-Box | White-Box |
|---|---|---|
| **Kenntnis** | ❌ Keine internen Details | ✅ Code bekannt |
| **Fokus** | Eingabe → Ausgabe | Interne Logik |
| **Durchführung** | Tester, Kunde | Entwickler |
| **Beispiel** | "Login mit falschem Passwort → Fehlermeldung" | "Prüfe alle Pfade in der Login-Funktion" |

---

## 📊 Testabdeckung (Coverage)

| Art | Beschreibung |
|-----|-------------|
| **Statement Coverage** | Jede Anweisung wurde ausgeführt |
| **Branch Coverage** | Jeder Zweig (if/else) wurde getestet |
| **Path Coverage** | Jeder mögliche Pfad wurde getestet |

> ⚠️ **100% Coverage ≠ fehlerfrei!** Es zeigt nur, dass der Code ausgeführt wurde — nicht, dass er richtig funktioniert.

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was ist der Unterschied zwischen Unit-Test und Integrationstest?" — Unit = isoliert, eine Funktion. Integration = Zusammenspiel mehrerer Module.`
    },

    // --- Lektion 6: Vorgehensmodelle ---
    {
      id: "sq-6",
      title: "Vorgehensmodelle — Wasserfall, V-Modell, Scrum",
      duration: "15 min",
      type: "text",
      content: `## Vorgehensmodelle — Wie organisiere ich ein Projekt?

> Nach den Testverfahren wissen wir, WIE wir Qualität prüfen. Jetzt fragen wir uns: WANN im Entwicklungsprozess testen wir? Die Vorgehensmodelle bestimmen den gesamten Ablauf — von der Planung bis zum Deployment.

> Scrum behandeln wir auch im Modul "Projektmanagement" — dort mit Fokus auf Rollen und Events.

Verschiedene Projekte brauchen verschiedene Vorgehensweisen. Die IHK prüft, ob du die Modelle **unterscheiden und bewerten** kannst.

---

## 🌊 Wasserfallmodell

**Prinzip:** Phasen werden **streng sequentiell** durchlaufen.

\`\`\`
Anforderung → Design → Implementierung → Test → Wartung
\`\`\`

### Vorteile
- ✅ Einfach zu verstehen
- ✅ Klare Struktur
- ✅ Gut für Projekte mit festen Anforderungen

### Nachteile
- ❌ Keine Rücksprünge möglich
- ❌ Späte Fehlererkennung
- ❌ Kunde sieht erst am Ende das Ergebnis

---

## 🔀 V-Modell

**Prinzip:** Jede Phase hat eine **zugehörige Testphase**.

\`\`\`
Anforderung ───────────────────── Akzeptanztest
    Design ────────────────── Systemtest
        Implementierung ─ Integrationstest
              Unit-Test
\`\`\`

### Vorteile
- ✅ Testen von Anfang an geplant
- ✅ Frühe Fehlererkennung
- ✅ Klare Zuordnung (Was → Wie testen)

### Nachteile
- ❌ Wie Wasserfall: starr
- ❌ Hoher Dokumentationsaufwand

> 💡 **Merke:** Das V-Modell ist wie Wasserfall, aber mit **eingebautem Testen**!

---

## 🔄 Agiles Manifest (Scrum)

**4 Werte:**
1. **Individuen und Interaktionen** mehr als Prozesse und Werkzeuge
2. **Funktionierende Software** mehr als umfassende Dokumentation
3. **Zusammenarbeit mit dem Kunden** mehr als Vertragsverhandlung
4. **Reagieren auf Veränderung** mehr als das Befolgen eines Plans

### Scrum-Rollen
| Rolle | Aufgabe |
|-------|---------|
| 🏆 **Product Owner** | Verbindung zum Kunden, Backlog pflegen |
| 🛡️ **Scrum Master** | Berater, Prozess-Sicherung |
| 👥 **Cross-functional Team** | Selbstorganisiert, eigenverantwortlich |

### Scrum-Events
| Event | Zweck | Zeit |
|-------|-------|------|
| 📋 **Sprint Planning** | Was schaffen wir? | 2-4 Wochen |
| 🌅 **Daily** | Kurzer Standup | 15 min/Tag |
| 🎯 **Sprint Review** | Ergebnis zeigen | Am Sprint-Ende |
| 🔄 **Retrospektive** | Prozess verbessern | Am Sprint-Ende |

### Definition of Done
> Wann ist ein Arbeitspaket "fertig"?
> - Code geschrieben ✅
> - Tests bestanden ✅
> - Dokumentation aktualisiert ✅
> - Review durchgeführt ✅

---

## ⚔️ Vergleich

| | Wasserfall | V-Modell | Scrum |
|---|---|---|---|
| **Flexibilität** | ❌ Gering | ❌ Gering | ✅ Hoch |
| **Kundenkontakt** | ❌ Selten | ❌ Selten | ✅ Ständig |
| **Testen** | Am Ende | Jede Phase | Permanent |
| **Rücksprünge** | ❌ Nein | ❌ Nein | ✅ Ja |
| **Use Case** | Feste Anforderungen | Kritische Systeme | Sich ändernde Anforderungen |

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Vergleichen Sie Wasserfall und Scrum!" — Wasserfall: sequentiell, starr, feste Anforderungen. Scrum: iterativ, flexibel, Kundenkontakt. V-Modell: wie Wasserfall aber mit Testphasen.`
    },

    // --- Lektion 7: Code Smells & Clean Code ---
    {
      id: "sq-7",
      title: "Code Smells & Clean Code",
      duration: "15 min",
      type: "text",
      content: `## Code Smells — Warnsignale im Code

> Wir kennen jetzt die großen Konzepte: Qualitätsmerkmale, Patterns, Architekturen, Tests und Vorgehensmodelle. Jetzt zoomen wir auf die Code-Ebene: Was macht Code schlecht — und wie verbessern wir ihn?

> Code Smells behandeln wir auch im Modul "Erweiterte Programmierung" — dort mit Fokus auf Refactoring-Techniken.

**Code Smells** ("Code-Gerüche") sind Hinweise darauf, dass im Code etwas nicht stimmt — nicht sofort ein Fehler, aber ein Risiko für zukünftige Probleme.

---

## 🚩 Die häufigsten Code Smells

### 1️⃣ Lange Methoden
> Mehr als **20 Zeilen** → Methode macht zu viel.

\`\`\`python
# ❌ Schlecht
def process_order(order):
    # 50 Zeilen Code...

# ✅ Gut
def process_order(order):
    validate(order)
    calculate_total(order)
    save(order)
    send_confirmation(order)
\`\`\`

### 2️⃣ Lange Parameterlisten
> Mehr als **4 Parameter** → Schwer zu lesen.

\`\`\`python
# ❌ Schlecht
def create_user(name, email, age, city, street, zip_code, phone):

# ✅ Gut
def create_user(user_data: UserData):
\`\`\`

### 3️⃣ Error Hiding
> Fehler verstecken statt behandeln.

\`\`\`python
# ❌ Schlecht
try:
    do_something()
except:
    pass  # Fehler verschluckt!

# ✅ Gut
try:
    do_something()
except SpecificError as e:
    logger.error(f"Fehler: {e}")
    raise
\`\`\`

### 4️⃣ Reinvent the Wheel
> Bibliotheken nutzen statt alles selbst schreiben.

\`\`\`python
# ❌ Schlecht — eigenen HTTP-Client schreiben
# ✅ Gut — requests oder axios verwenden
\`\`\`

### 5️⃣ Duplicated Code
> Gleicher Code an mehreren Stellen → DRY-Prinzip verletzt.

---

## 🧹 Clean Code Prinzipien

### DRY — Don't Repeat Yourself
> Wiederhole dich nicht im Code. Nutze Funktionen und Variablen.

### KISS — Keep It Simple, Stupid
> Einfach ist besser als komplex. Nicht extrem abkürzen.

### YAGNI — You Ain't Gonna Need It
> Baue nur, was JETZT gebraucht wird. Nicht zukünftige Features vorbereiten.

---

## 🔧 Refactoring

**Refactoring** = Code verbessern ohne das Verhalten zu ändern.

### Wann refactorn?
- Code Smells erkannt
- Vor dem Merge
- Iterativ/inkrementell
- Pfadfinder-Regel: "Hinterlasse den Code besser als du ihn vorgefunden hast"

### Beispiele
- Lange Methode → in mehrere kleine aufteilen
- Duplizierter Code → in Funktion auslagern
- Magische Zahlen → Konstanten definieren

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was sind Code Smells und wie entfernt man sie?" — Warnsignale (lange Methoden, Error Hiding, etc.). Entfernen durch Refactoring: Code verbessern ohne Verhalten zu ändern.`
    },

    // --- Lektion 8: Quiz ---
    {
      id: "sq-8",
      title: "Wissenstest: Software-Qualitätsstandards",
      duration: "15 min",
      type: "quiz",
      content: `## 🎯 Quiz: Software-Qualitätsstandards

Teste dein Wissen über Qualitätsstandards, Design Patterns und Testverfahren!`,
    },
  ],
};

// ─── Quizfragen ─────────────────────────────────────────────────────────────

export const qualitaetQuizQuestions = [
  {
    question: "Was besagt die ISO 9126?",
    type: "multiple" as const,
    options: [
      "6 Qualitätsmerkmale für Software",
      "Ein Projektmanagement-Modell",
      "Ein Testverfahren",
      "Ein Design Pattern",
    ],
    correct: 0,
    explanation: "Die ISO 9126 definiert 6 Qualitätsmerkmale: Funktionalität, Zuverlässigkeit, Benutzbarkeit, Effizienz, Wartbarkeit, Portabilität.",
  },
  {
    question: "Was ist ein Singleton?",
    type: "multiple" as const,
    options: [
      "Ein Creational Design Pattern mit genau einer Instanz",
      "Ein Structural Design Pattern für Adapter",
      "Ein Behavioral Design Pattern für Strategien",
      "Ein Testverfahren",
    ],
    correct: 0,
    explanation: "Das Singleton ist ein Creational Design Pattern, das sicherstellt, dass eine Klasse nur eine Instanz hat und einen globalen Zugriffspunkt darauf bietet.",
  },
  {
    question: "Was macht das Strategy-Pattern?",
    type: "multiple" as const,
    options: [
      "Definiert eine Familie von Algorithmen und macht sie austauschbar",
      "Erstellt nur eine Instanz einer Klasse",
      "Passt eine Schnittstelle an eine andere an",
      "Benachrichtigt bei Zustandsänderungen",
    ],
    correct: 0,
    explanation: "Das Strategy-Pattern definiert eine Familie von Algorithmen, kapselt sie in separate Klassen und macht sie austauschbar — z.B. verschiedene Sortierverfahren.",
  },
  {
    question: "Was ist der Unterschied zwischen Unit-Test und Integrationstest?",
    type: "multiple" as const,
    options: [
      "Unit = isoliert, Integration = Zusammenspiel mehrerer Module",
      "Unit = langsam, Integration = schnell",
      "Unit = manuell, Integration = automatisch",
      "Es gibt keinen Unterschied",
    ],
    correct: 0,
    explanation: "Unit-Tests testen einzelne Funktionen isoliert. Integrationstests testen das Zusammenspiel zwischen mehreren Modulen.",
  },
  {
    question: "Was beschreibt die Schichtenarchitektur?",
    type: "multiple" as const,
    options: [
      "Trennung in Präsentation, Anwendung und Datenhaltung",
      "Unabhängige Services mit eigener Datenbank",
      "Model, View und Controller",
      "Ein Testverfahren",
    ],
    correct: 0,
    explanation: "Die Schichtenarchitektur trennt eine Anwendung in logisch getrennte Schichten: Präsentation (UI), Anwendung (Logik) und Datenhaltung (DB).",
  },
  {
    question: "Was ist ein Code Smell?",
    type: "multiple" as const,
    options: [
      "Ein Hinweis auf schlechte Code-Struktur",
      "Ein Syntaxfehler",
      "Ein Laufzeitfehler",
      "Ein Design Pattern",
    ],
    correct: 0,
    explanation: "Code Smells sind Hinweise auf schlechte Struktur — z.B. lange Methoden, Error Hiding, duplizierter Code. Sie sind nicht sofort Fehler, aber Risiken.",
  },
  {
    question: "Was besagt das DRY-Prinzip?",
    type: "multiple" as const,
    options: [
      "Don't Repeat Yourself — Vermeide Duplikate",
      "Do Repeat Yourself — Wiederhole dich",
      "Design Right Yesterday — Gestalte richtig",
      "Debug Release Yearly — Teste jährlich",
    ],
    correct: 0,
    explanation: "DRY = Don't Repeat Yourself. Gleicher Code sollte nur einmal existieren — Duplikate führen zu Wartungsproblemen.",
  },
  {
    question: "Was ist der Unterschied zwischen Black-Box und White-Box Testing?",
    type: "multiple" as const,
    options: [
      "Black-Box = ohne Kenntnis der Implementierung, White-Box = mit Kenntnis",
      "Black-Box = manuell, White-Box = automatisch",
      "Black-Box = Unit-Test, White-Box = Integrationstest",
      "Es gibt keinen Unterschied",
    ],
    correct: 0,
    explanation: "Black-Box: Test ohne Kenntnis der Interna (Eingabe → Ausgabe). White-Box: Test mit Kenntnis des Codes (Pfade abdecken).",
  },
  {
    question: "Was sind die 4 Werte des Agilen Manifests?",
    type: "multiple" as const,
    options: [
      "Individuen, funktionierende Software, Zusammenarbeit, Reagieren auf Veränderung",
      "Planung, Design, Implementierung, Test",
      "Dokumentation, Code, Test, Deployment",
      "Zeit, Budget, Qualität, Umfang",
    ],
    correct: 0,
    explanation: "Die 4 Werte: 1) Individuen > Prozesse, 2) Funktionierende Software > Dokumentation, 3) Zusammenarbeit > Verträge, 4) Reagieren > Befolgen.",
  },
  {
    question: "Was macht das Observer-Pattern?",
    type: "multiple" as const,
    options: [
      "Benachrichtigt abhängige Objekte bei Zustandsänderungen",
      "Erstellt nur eine Instanz einer Klasse",
      "Definiert eine Familie von Algorithmen",
      "Passt eine Schnittstelle an",
    ],
    correct: 0,
    explanation: "Das Observer-Pattern benachrichtigt alle abonnierten Objekte automatisch, wenn sich der Zustand des Subjekts ändert — z.B. Event-Systeme.",
  },
];

export const qualitaetCategories = [
  {
    id: "qualitaet",
    name: "Software-Qualität",
    icon: "✅",
    description: "ISO 9126, Design Patterns, Architekturstile, Testverfahren, Clean Code",
  },
];
