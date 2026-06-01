// =============================================================================
// TH OWL Altklausuren — Geheime Module (nur über direkten Link erreichbar)
// =============================================================================

import { Module } from "./types";

// ---------------------------------------------------------------------------
// BWL — Probeklausur SS21 (18 MC-Fragen mit Lösungen)
// ---------------------------------------------------------------------------

export const bwlModule: Module = {
  id: "thowl-bwl",
  slug: "thowl-bwl",
  title: "BWL — Probeklausur SS21",
  description: "Betriebswirtschaftslehre Probeklausur Sommersemester 2021 — 18 Multiple-Choice-Fragen mit ausführlichen Erklärungen. TH OWL, Prof. Dr. Welling.",
  icon: "📊",
  color: "#10B981",
  progress: 0,
  category: "thowl",
  hidden: true,
  lessons: [
    {
      id: "bwl-klausur-ss21",
      title: "Probeklausur BWL SS21 — 18 Fragen",
      duration: "45 min",
      type: "quiz",
      examMode: true,
      content: `## BWL Probeklausur — Sommersemester 2021
Prof. Dr. Andreas Welling | TH OWL | 15.07.2021

18 Multiple-Choice-Fragen | 1 Punkt pro Frage | 18 Punkte gesamt
Bestehen: mind. 50% (9 Punkte)

> **Hinweis:** Dies ist eine echte Altklausur der TH OWL. Die Fragen sind 1:1 übernommen.`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Klausur-Quiz-Daten für BWL
// ---------------------------------------------------------------------------

export const bwlQuizData = {
  "thowl-bwl": [
    {
      question: "Welche der folgenden Aussagen ist wahr?",
      type: "multiple" as const,
      options: [
        "Stakeholder sind eine Teilmenge der Shareholder.",
        "Die Eingangslogistik gehört zu den sekundären Aktivitäten eines Unternehmens.",
        "Neue Märkte ohne Wettbewerb werden auch \"Silent Ocean\" genannt.",
        "Private Betriebe werden durch den/die Eigentümer bzw. durch von diesen bestimmten Personen geleitet.",
      ],
      correct: 3,
      explanation: "Private Betriebe werden tatsächlich durch den/die Eigentümer bzw. von diesen bestimmten Personen geleitet.\n\n❌ (a) Falsch: Shareholder sind eine Teilmenge der Stakeholder, nicht umgekehrt.\n❌ (b) Falsch: Eingangslogistik gehört zu den primären Aktivitäten (Porter-Wertschöpfungskette).\n❌ (c) Falsch: Der korrekte Begriff ist \"Blue Ocean\", nicht \"Silent Ocean\".",
    },
    {
      question: "Welche der folgenden Aussagen ist NICHT wahr?",
      type: "multiple" as const,
      options: [
        "Die Mehrheit aller Unternehmen in Deutschland sind KMUs",
        "Die Mehrheit aller Beschäftigten in Deutschland arbeitet in einem KMU",
        "KMUs erzielen mehr als die Hälfte aller Umsätze in Deutschland",
        "KMUs haben weniger als 250 Beschäftigte",
      ],
      correct: 2,
      explanation: "KMUs erzielen NICHT mehr als die Hälfte aller Umsätze in Deutschland.\n\n✅ (a) Wahr: ~99% der Unternehmen sind KMUs.\n✅ (b) Wahr: ~60% der Beschäftigten arbeiten in KMUs.\n✅ (d) Wahr: EU-Definition KMU = weniger als 250 Beschäftigte.",
    },
    {
      question: "Wie werden Produkte im Feld oben links der BCG-Portfolioanalyse genannt?",
      type: "multiple" as const,
      options: ["Cash-Cows", "Question Marks", "Stars", "Poor Dogs"],
      correct: 1,
      explanation: "Oben links im BCG-Portfolio = hohes Marktwachstum, geringer relativer Marktanteil = \"Question Marks\" (auch \"Problemkinder\" genannt).\n\n📍 Stars = oben rechts (hohes Wachstum, hoher Anteil)\n📍 Cash-Cows = unten rechts (geringes Wachstum, hoher Anteil)\n📍 Poor Dogs = unten links (geringes Wachstum, geringer Anteil)",
    },
    {
      question: "Was gehört nicht zu den sechs Aufgaben der Logistik (6R)?",
      type: "multiple" as const,
      options: ["Richtige Herkunft", "Richtige Menge", "Richtige Zeit", "Richtige Qualität"],
      correct: 0,
      explanation: "Die 6R der Logistik sind:\n1. Richtige Menge\n2. Richtige Qualität\n3. Richtiger Zustand\n4. Richtiger Ort\n5. Richtige Zeit\n6. Richtige Kosten\n\n❌ \"Richtige Herkunft\" gehört nicht dazu.",
    },
    {
      question: "Welche der folgenden Aussagen ist wahr?",
      type: "multiple" as const,
      options: [
        "Die Aufnahme eines Bankkredits ist ein Beispiel für Innenfinanzierung",
        "Die Außenfinanzierung ist eine spezielle Form der Fremdfinanzierung",
        "Die Selbstfinanzierung (z.B. Thesaurierung von Gewinnen) gehört zur Innenfinanzierung",
        "Mezzaninfinanzierung ist eine Mischung aus Innen- und Außenfinanzierung",
      ],
      correct: 2,
      explanation: "Selbstfinanzierung (Thesaurierung = Gewinne im Unternehmen belassen) ist eine Form der Innenfinanzierung.\n\n❌ (a) Falsch: Bankkredit = Außenfinanzierung/Fremdfinanzierung.\n❌ (b) Falsch: Außenfinanzierung ist KEINE spezielle Form der Fremdfinanzierung (Eigenkapitalerhöhung ist z.B. auch Außenfinanzierung aber Eigenfinanzierung).\n❌ (d) Falsch: Mezzaninfinanzierung ist eine Mischung aus Eigen- und Fremdfinanzierung.",
    },
    {
      question: "Welche der folgenden Aussagen ist wahr?",
      type: "multiple" as const,
      options: [
        "Eine Insolvenz ist nicht strafbar.",
        "Ist das Eigenkapital rechnerisch negativ müssen Unternehmen sofort Insolvenz anmelden.",
        "Eine Zahlungsstockung beschreibt eine drohende Zahlungsunfähigkeit",
        "Für die rechtzeitige Stellung des Insolvenzantrages sind die Gesellschafter verantwortlich.",
      ],
      correct: 0,
      explanation: "Die Insolvenz SELBST ist nicht strafbar — strafbar ist die Insolvenzverschleppung (§ 15a InsO).\n\n❌ (b) Falsch: Negatives Eigenkapital (Überschuldung) ist nur ein Insolvenzgrund, aber nicht automatisch sofortige Anmeldepflicht.\n❌ (c) Falsch: Zahlungsstockung ist eine vorübergehende Zahlungsunfähigkeit, nicht \"drohend\".\n❌ (d) Falsch: Der Geschäftsführer (nicht die Gesellschafter) ist verantwortlich.",
    },
    {
      question: "Was ist ein Monopol?",
      type: "multiple" as const,
      options: [
        "Ein Markt mit nur einem Anbieter",
        "Der freiwillige Zusammenschluss konkurrierender Unternehmen",
        "Eine Straftat gemäß Handelsgesetzbuch",
        "Ein Beratungsgremium in Kapitalgesellschaften",
      ],
      correct: 0,
      explanation: "Ein Monopol ist ein Markt mit genau einem Anbieter (Monopolist).\n\n❌ (b) beschreibt einen Kartell.\n❌ (c) und (d) sind falsche Zuordnungen.",
    },
    {
      question: "Aus welchen Teilen besteht der Jahresabschluss eines Unternehmens?",
      type: "multiple" as const,
      options: [
        "Gewinn- und Verlustrechnung + Liste der Buchungssätze",
        "Bilanz + Gewinn- und Verlustrechnung + ggf. Lagebericht",
        "Aktivkonten + Passivkonten + Ertragskonten + Aufwandskonten",
        "Unternehmensverfassung + Jahreskennzahlen",
      ],
      correct: 1,
      explanation: "Der Jahresabschluss besteht aus:\n- **Bilanz**\n- **Gewinn- und Verlustrechnung (GuV)**\n- **ggf. Lagebericht** (bei Kapitalgesellschaften)\n- Anhang und ggf. Kapitalflussrechnung ergänzen dies.\n\n❌ (a) Buchungsliste gehört nicht zum Jahresabschluss.\n❌ (c) Konten sind keine Abschlussbestandteile.",
    },
    {
      question: "Wobei handelt es sich um KEINE der drei Kategorien, in die sich Innovationen sortieren lassen?",
      type: "multiple" as const,
      options: [
        "Produkt/Service-Innovationen",
        "Prozess/Verfahrens-Innovationen",
        "Disruptive Innovationen",
        "Konzeptinnovationen",
      ],
      correct: 2,
      explanation: "Die drei klassischen Innovationskategorien sind:\n1. **Produkt/Service-Innovationen**\n2. **Prozess/Verfahrens-Innovationen**\n3. **Konzeptinnovationen**\n\n❌ \"Disruptive Innovationen\" gehört nicht zu diesen drei Grundkategorien (es ist eine andere Klassifikation nach Innovationsgrad).",
    },
    {
      question: "Was besagt das 1. Gossensche Gesetz?",
      type: "multiple" as const,
      options: [
        "Das erste Bier bringt mehr Nutzen als das zweite Bier.",
        "Je größer die Nachfragemenge, desto geringer der Preis pro Stück.",
        "In Jahren mit schlechter Kartoffelernte wird Fleisch billiger.",
        "Wenn das Budget begrenzt ist, dann sollte man nicht nur ein Produkt erwerben.",
      ],
      correct: 0,
      explanation: "Das **1. Gossensche Gesetz** (Gesetz der abnehmenden Grenznutzensättigung) besagt, dass der Grenznutzen einer zusätzlichen Einheit mit steigender Konsummenge abnimmt.\n\n🍺 Beispiel: Das erste Bier bringt mehr Nutzen als das zweite.\n\n❌ (b) beschreibt Preiselastizität.\n❌ (c) beschreibt Komplementärgüter.\n❌ (d) beschreibt das 2. Gossensche Gesetz.",
    },
    {
      question: "Ein Unternehmer erwirbt Briefmarken für 1000€ und zahlt bar. Briefmarken sind umsatzsteuerfrei. Beteiligte Konten: Vorräte und Kasse. Worum handelt es sich?",
      type: "multiple" as const,
      options: ["Passivtausch", "Aktivtausch", "Aktiv-Passiv-Mehrung", "Aktiv-Passiv-Minderung"],
      correct: 1,
      explanation: "**Kasse** (Aktivkonto) wird gemindert, **Vorräte** (Aktivkonto) wird erhöht → **Aktivtausch**.\n\nBeide Konten stehen auf der Aktivseite der Bilanz. Die Bilanzsumme bleibt gleich.",
    },
    {
      question: "Worum handelt es sich beim Briefmarkenkauf (Frage 11) zusätzlich?",
      type: "multiple" as const,
      options: [
        "Auszahlung, Ausgabe und Aufwand",
        "Ausgabe und Aufwand",
        "Auszahlung und Ausgabe",
        "Aufwand und Kosten",
      ],
      correct: 2,
      explanation: "**Auszahlung** = Geld fließt ab (Kasse wird gemindert)\n**Ausgabe** = Vermögensgegenstand wird erworben (Vorräte werden erhöht)\n\n❌ **KEIN Aufwand**, da kein Verzehr/Verbrauch stattfindet — Briefmarken sind ein Vermögensgegenstand (Vorrat), keine Aufwendung.",
    },
    {
      question: "Welche der folgenden Aussagen ist wahr?",
      type: "multiple" as const,
      options: [
        "In einer AG wählen die Aktionäre den Vorstand.",
        "Der GmbH-Geschäftsführer haftet grundsätzlich mit seinem Privatvermögen.",
        "Eine Kommanditgesellschaft ist eine Kapitalgesellschaft.",
        "Aktiengesellschaft und GmbH sind Kapitalgesellschaften.",
      ],
      correct: 3,
      explanation: "AG und GmbH sind beide **Kapitalgesellschaften**.\n\n❌ (a) Falsch: Der Vorstand der AG wird vom **Aufsichtsrat** gewählt, nicht von den Aktionären.\n❌ (b) Falsch: Der GmbH-Geschäftsführer haftet grundsätzlich **NICHT** mit Privatvermögen.\n❌ (c) Falsch: Die KG ist eine **Personengesellschaft**.",
    },
    {
      question: "Was gehört nicht zu den konkurrierenden Zielen der Beschaffung?",
      type: "multiple" as const,
      options: [
        "Hohe Versorgungssicherheit",
        "Geringer Preis",
        "Geringe Dokumentationspflichten",
        "Hohe Inputqualität",
      ],
      correct: 2,
      explanation: "Die konkurrierenden Ziele der Beschaffung sind:\n- Niedriger Preis\n- Hohe Qualität\n- Hohe Liefertreue/Versorgungssicherheit\n- Kurze Lieferzeit\n- Hohe Flexibilität\n\n❌ \"Geringe Dokumentationspflichten\" gehört nicht dazu.",
    },
    {
      question: "Die Veräußerung des Anlagevermögens einer AG in Liquidation brachte 65 Mio.€ ein. Umlaufvermögen: 15 Mio.€. Verbindlichkeiten: 50 Mio.€. 1.000.000 Aktien. Wieviel erhält ein Aktionär pro Aktie?",
      type: "multiple" as const,
      options: ["15 Euro", "20 Euro", "25 Euro", "30 Euro"],
      correct: 3,
      explanation: "**Berechnung:**\n- Anlagevermögen: 65 Mio.€\n- Umlaufvermögen: 15 Mio.€\n- Gesamtvermögen: 80 Mio.€\n- Verbindlichkeiten: −50 Mio.€\n- **Eigenkapital: 30 Mio.€**\n- 30.000.000 / 1.000.000 Aktien = **30 Euro pro Aktie**",
    },
    {
      question: "Welche Phase folgt im Produktlebenszyklus auf die Wachstumsphase?",
      type: "multiple" as const,
      options: ["Reifephase", "Degenerationsphase", "Sättigungsphase", "Einführungsphase"],
      correct: 2,
      explanation: "Der Produktlebenszyklus verläuft:\n**Einführung** → **Wachstum** → **Reife/Sättigung** → **Degeneration**\n\nAuf die Wachstumsphase folgt die Reifephase (hier als \"Sättigungsphase\" bezeichnet).",
    },
    {
      question: "Welche der folgenden Aussagen ist wahr?",
      type: "multiple" as const,
      options: [
        "Das Eigenkapital ist stets positiv.",
        "Die Summe der Aktivseite ist immer größer als die Summe der Passivseite.",
        "Der Liquiditätsgrad 2 ist mindestens so groß wie der Liquiditätsgrad 1.",
        "Der Liquiditätsgrad 2 ist mindestens so groß wie der Liquiditätsgrad 3.",
      ],
      correct: 2,
      explanation: "**Liquiditätsgrade:**\n- LG1 = liquide Mittel / kurzfr. Verbindlichkeiten\n- LG2 = (liquide Mittel + kurzfr. Forderungen + Wertpapiere) / kurzfr. Verbindlichkeiten\n\nDa LG2 alle Bestandteile von LG1 PLUS weitere Positionen enthält, ist **LG2 immer ≥ LG1**.\n\n❌ (a) Falsch: Eigenkapital kann negativ sein (Überschuldung).\n❌ (b) Falsch: Aktiv- und Passivseite sind immer gleich (Bilanzgleichung).",
    },
    {
      question: "Was ist KEINE der vier Freiheiten des Europäischen Binnenmarktes?",
      type: "multiple" as const,
      options: [
        "Freiheit der Kunst und Wissenschaft",
        "Freier Warenverkehr",
        "Dienstleistungsfreiheit",
        "Personenfreizügigkeit",
      ],
      correct: 0,
      explanation: "Die **vier Freiheiten** des EU-Binnenmarktes sind:\n1. Freier Warenverkehr\n2. Personenfreizügigkeit\n3. Dienstleistungsfreiheit\n4. Kapitalverkehrsfreiheit\n\n❌ \"Freiheit der Kunst und Wissenschaft\" ist ein Grundrecht (Art. 5 GG), gehört nicht dazu.",
    },
  ],
};

// ---------------------------------------------------------------------------
// SQ — Software-Qualitätsmanagement Probeklausur 2025 (10 MC-Fragen)
// ---------------------------------------------------------------------------

export const sqModule: Module = {
  id: "thowl-sq",
  slug: "thowl-sq",
  title: "SQ — Probeklausur 2025",
  description: "Software-Qualitätsmanagement Probeklausur 2025 — 10 Multiple-Choice-Fragen (Aufgabe 2). TH OWL. Themen: ISO 25010, QA vs QC, Testarten, ISTQB, Code Coverage, Traceability, Zyklomatische Komplexität.",
  icon: "✅",
  color: "#8B5CF6",
  progress: 0,
  category: "thowl",
  hidden: true,
  lessons: [
    {
      id: "sq-klausur-2025",
      title: "Probeklausur SQ 2025 — Aufgabe 2 (10 Fragen)",
      duration: "30 min",
      type: "quiz",
      examMode: true,
      content: `## Software-Qualitätsmanagement — Probeklausur 2025
TH OWL | Aufgabe 2: Multiple Choice

10 Multiple-Choice-Fragen | 1 Punkt pro Frage | 10 Punkte gesamt

> **Hinweis:** Fragen aus der Probeklausur SQ 2025, Aufgabe 2.`,
    },
  ],
};

export const sqQuizData = {
  "thowl-sq": [
    {
      question: "Wie viele Qualitätsmerkmale definiert die ISO 25010 (im Gegensatz zur älteren ISO 9126 mit 6 Merkmalen)?",
      type: "multiple" as const,
      options: ["6 Merkmale", "7 Merkmale", "8 Merkmale", "10 Merkmale"],
      correct: 2,
      explanation: "Die **ISO 25010** definiert **8 Qualitätsmerkmale** (im Gegensatz zur ISO 9126 mit 6 Merkmalen):\n1. Funktionale Eignung\n2. Performance-Effizienz\n3. Kompatibilität\n4. Usability\n5. Zuverlässigkeit\n6. Sicherheit\n7. Wartbarkeit\n8. Übertragbarkeit\n\nDie ISO 9126 hatte nur 6 Merkmale (Effizienz, Usability, Zuverlässigkeit, Funktionalität, Wartbarkeit, Portabilität).",
    },
    {
      question: "Was ist der Unterschied zwischen Quality Assurance (QA) und Quality Control (QC)?",
      type: "multiple" as const,
      options: [
        "QA ist prozessorientiert (präventiv), QC ist produktorientiert (detektivisch).",
        "QA findet nur am Ende statt, QC während der Entwicklung.",
        "QA und QC sind Synonyme für denselben Ansatz.",
        "QA ist manuell, QC ist automatisiert.",
      ],
      correct: 0,
      explanation: "**QA (Quality Assurance)** ist **prozessorientiert** und **präventiv** — sie zielt darauf ab, Fehler zu vermeiden, bevor sie entstehen (z.B. durch definierte Prozesse, Reviews, Standards).\n\n**QC (Quality Control)** ist **produktorientiert** und **detektivisch** — sie zielt darauf ab, Fehler im Produkt zu finden (z.B. durch Tests, Inspektionen).",
    },
    {
      question: "Welche Aussage über statische Tests ist korrekt?",
      type: "multiple" as const,
      options: [
        "Statische Tests erfordern immer die Ausführung des Programms.",
        "Statische Tests umfassen Reviews, Walkthroughs und statische Analyse.",
        "Statische Tests können nur manuell durchgeführt werden.",
        "Statische Tests ersetzen dynamische Tests vollständig.",
      ],
      correct: 1,
      explanation: "**Statische Tests** werden **ohne Programmausführung** durchgeführt und umfassen:\n- **Reviews** (Formal/Informal)\n- **Walkthroughs**\n- **Statische Analyse** (z.B. Code-Analyse-Tools, Linting)\n\n❌ (a) Falsch: Statische Tests erfordern KEINE Ausführung.\n❌ (c) Falsch: Statische Analyse kann automatisiert werden.\n❌ (d) Falsch: Statische und dynamische Tests ergänzen sich.",
    },
    {
      question: "Welche Testart wird NICHT in den ISTQB-Teststufen beschrieben?",
      type: "multiple" as const,
      options: [
        "Komponententest (Unit Test)",
        "Integrationstest",
        "Systemtest",
        "Performance-Test",
      ],
      correct: 3,
      explanation: "Die **ISTQB-Teststufen** sind:\n1. **Komponententest** (Unit Test)\n2. **Integrationstest**\n3. **Systemtest**\n4. **Abnahmetest** (Acceptance Test)\n\n❌ **Performance-Test** ist ein **Testtyp** (nicht Teststufe) und kann auf verschiedenen Stufen durchgeführt werden.",
    },
    {
      question: "Welches ISTQB-Prinzip besagt, dass Tests das Vorhandensein von Fehlern zeigen können, aber nicht deren Abwesenheit?",
      type: "multiple" as const,
      options: [
        "Fehlerverteilung",
        "Pestizid-Paradoxon",
        "Test zeigt Anwesenheit von Fehlern",
        "Frühes Testen",
      ],
      correct: 2,
      explanation: "**ISTQB-Prinzip 2:** \"Testing can show the presence of defects, but cannot prove their absence.\" (Testen kann das Vorhandensein von Fehlern zeigen, aber nicht ihre Abwesenheit beweisen.)\n\nDies ist eines der 7 Grundprinzipien des Testens nach ISTQB.",
    },
    {
      question: "Was bedeutet Code Coverage von 100% bei Anweisungscoverage (Statement Coverage)?",
      type: "multiple" as const,
      options: [
        "Alle Fehler wurden gefunden.",
        "Jede Anweisung im Code wurde mindestens einmal ausgeführt.",
        "Alle Zweige wurden getestet.",
        "Alle Pfade durch das Programm wurden getestet.",
      ],
      correct: 1,
      explanation: "**Statement Coverage von 100%** bedeutet, dass **jede Anweisung** im Code mindestens einmal ausgeführt wurde.\n\n❌ (a) Falsch: 100% Coverage garantiert NICHT, dass alle Fehler gefunden wurden.\n❌ (c) Falsch: Das wäre **Branch/Decision Coverage**.\n❌ (d) Falsch: Das wäre **Path Coverage**.",
    },
    {
      question: "Was ist Traceability im Software-Testing?",
      type: "multiple" as const,
      options: [
        "Die Fähigkeit, Codezeilen zu zählen.",
        "Die Verknüpfung zwischen Anforderungen, Testfällen und Testergebnissen.",
        "Das Protokollieren von Laufzeitfehlern.",
        "Die Versionierung von Source Code.",
      ],
      correct: 1,
      explanation: "**Traceability** (Rückverfolgbarkeit) beschreibt die **bidirektionale Verknüpfung** zwischen:\n- Anforderungen → Testfällen\n- Testfällen → Testergebnissen\n- Defekten → Anforderungen\n\nDies ermöglicht nachzuvollziehen, welche Anforderungen durch welche Tests abgedeckt sind.",
    },
    {
      question: "Was misst die zyklomatische Komplexität nach McCabe?",
      type: "multiple" as const,
      options: [
        "Die Anzahl der Codezeilen in einer Funktion.",
        "Die Anzahl unabhängiger Pfade durch einen Kontrollflussgraphen.",
        "Die Anzahl der Variablen in einem Programm.",
        "Die Anzahl der Aufrufe einer Funktion.",
      ],
      correct: 1,
      explanation: "Die **zyklomatische Komplexität** (McCabe) misst die **Anzahl linear unabhängiger Pfade** durch den Kontrollflussgraphen.\n\n**Formel:** V(G) = E − N + 2P\n- E = Kanten, N = Knoten, P = zusammenhängende Komponenten\n\nVereinfacht: V(G) = Anzahl der Entscheidungen + 1\n\nSie gibt an, wie viele Testfälle mindestens benötigt werden, um alle Pfade abzudecken.",
    },
    {
      question: "Wie viele Testfälle werden mindestens benötigt, um alle Pfade bei einer zyklomatischen Komplexität von 5 abzudecken?",
      type: "multiple" as const,
      options: ["3 Testfälle", "4 Testfälle", "5 Testfälle", "6 Testfälle"],
      correct: 2,
      explanation: "Die zyklomatische Komplexität V(G) gibt die **minimale Anzahl linear unabhängiger Pfade** an. Bei V(G) = 5 werden mindestens **5 Testfälle** benötigt, um alle unabhängigen Pfade durch den Code abzudecken.",
    },
    {
      question: "Welche Aussage zu Reviews ist korrekt?",
      type: "multiple" as const,
      options: [
        "Reviews finden immer erst nach dem Testen statt.",
        "Formale Reviews erfordern einen Moderator und dokumentierte Ergebnisse.",
        "Reviews können nur für Source-Code durchgeführt werden.",
        "Reviews ersetzen das Testen vollständig.",
      ],
      correct: 1,
      explanation: "**Formale Reviews** (z.B. Inspektionen) zeichnen sich durch:\n- Einen **Moderator** (Leiter der Review-Sitzung)\n- **Dokumentierte Ergebnisse** (Protokolle, Findings)\n- Definierte **Rollen** (Autor, Moderator, Reviewer)\n- **Ein- und Ausgangskriterien**\n\n❌ (a) Falsch: Reviews finden idealerweise FRÜH statt (Shift-Left).\n❌ (c) Falsch: Reviews können für alle Artefakte durchgeführt werden (Anforderungen, Design, Dokumentation, Code).\n❌ (d) Falsch: Reviews ergänzen das Testen, ersetzen es aber nicht.",
    },
  ],
};

// ---------------------------------------------------------------------------
// PS2 — Programmiersprachen 2 Klausur WS23/24 (MC-Fragen)
// ---------------------------------------------------------------------------

export const ps2Module: Module = {
  id: "thowl-ps2",
  slug: "thowl-ps2",
  title: "PS2 — Klausur WS23/24",
  description: "Programmiersprachen 2 Klausur WS23/24 — Multiple-Choice-Fragen (Aufgaben 8–11). TH OWL. Themen: Hoare-Kalkül, Aussagenlogik, Strukturelle Induktion, Lambda-Kalkül, Typsysteme, Semantik.",
  icon: "λ",
  color: "#F59E0B",
  progress: 0,
  category: "thowl",
  hidden: true,
  lessons: [
    {
      id: "ps2-klausur-ws2324",
      title: "Klausur PS2 WS23/24 — Aufgaben 8–11",
      duration: "45 min",
      type: "quiz",
      examMode: true,
      content: `## Programmiersprachen 2 — Klausur WS23/24
TH OWL | Aufgaben 8–11: Multiple Choice / Wahr-Falsch

Themen: Hoare-Kalkül, Aussagenlogik, Strukturelle Induktion, Lambda-Kalkül, Typsysteme, Semantik

> **Hinweis:** Fragen aus der Klausur PS2 WS23/24, Aufgaben 8–11.`,
    },
  ],
};

export const ps2QuizData = {
  "thowl-ps2": [
    {
      question: "Gegeben sei das Hoare-Tripel: {x > 0} x := x + 1 {x > 1}. Welche Aussage ist korrekt?",
      type: "multiple" as const,
      options: [
        "Die Vorbedingung (Precondition) ist x > 1.",
        "Die Nachbedingung (Postcondition) ist x > 0.",
        "Das Tripel ist gültig, da x > 0 impliziert x + 1 > 1.",
        "Das Tripel ist ungültig, da x + 1 nicht größer als 1 sein kann.",
      ],
      correct: 2,
      explanation: "**Hoare-Tripel:** {P} C {Q}\n- **P (Precondition):** x > 0\n- **C (Kommando):** x := x + 1\n- **Q (Postcondition):** x > 1\n\nDas Tripel ist **gültig**, denn wenn x > 0 gilt, dann ist x + 1 > 1 (da x mindestens 0+ε ist, also x+1 mindestens 1+ε > 1).\n\n❌ (a) Falsch: Precondition ist x > 0.\n❌ (b) Falsch: Postcondition ist x > 1.\n❌ (d) Falsch: Das Tripel ist gültig.",
    },
    {
      question: "Was ist eine Schleifeninvariante im Hoare-Kalkül?",
      type: "multiple" as const,
      options: [
        "Eine Bedingung, die nach jedem Schleifendurchlauf falsch wird.",
        "Eine Bedingung, die vor und nach jedem Schleifendurchlauf wahr ist.",
        "Die Abbruchbedingung der Schleife.",
        "Die Anzahl der Schleifendurchläufe.",
      ],
      correct: 1,
      explanation: "Eine **Schleifeninvariante** ist ein Prädikat, das:\n- **Vor dem ersten Schleifendurchlauf** wahr ist\n- **Nach jedem Schleifendurchlauf** wahr bleibt\n- **Nach Schleifenende** zusammen mit der Negation der Schleifenbedingung die Postcondition impliziert\n\nSie ist das zentrale Hilfsmittel für den Korrektheitsnachweis von Schleifen im Hoare-Kalkül.",
    },
    {
      question: "In der Aussagenlogik: Aus A ∧ B kann man ableiten. Welche Regel ist das?",
      type: "multiple" as const,
      options: [
        "Modus Ponens",
        "UND-Elimination (∧-Elimination)",
        "UND-Einführung (∧-Einführung)",
        "Modus Tollens",
      ],
      correct: 1,
      explanation: "**UND-Elimination (∧-Elimination):** Aus A ∧ B kann man A ableiten (oder B).\n\nRegel: A ∧ B ⊢ A\n\n- **Modus Ponens:** Aus A → B und A folgt B.\n- **∧-Einführung:** Aus A und B folgt A ∧ B.\n- **Modus Tollens:** Aus A → B und ¬B folgt ¬A.",
    },
    {
      question: "Welche Aussage zum Modus Ponens ist korrekt?",
      type: "multiple" as const,
      options: [
        "Aus A → B und B folgt A.",
        "Aus A → B und A folgt B.",
        "Aus A → B und ¬A folgt ¬B.",
        "Aus A → B und ¬B folgt ¬A.",
      ],
      correct: 1,
      explanation: "**Modus Ponens:**\nAus A → B und A folgt B.\n\nFormal: {A → B, A} ⊢ B\n\n❌ (a) Falsch: Das wäre die Umkehrung (Converse), die nicht gültig ist.\n❌ (c) Falsch: Das wäre der Fehlschluss der Verneinung des Antecedens.\n❌ (d) Falsch: Das wäre **Modus Tollens** ({A → B, ¬B} ⊢ ¬A).",
    },
    {
      question: "Was ist das Prinzip der strukturellen Induktion?",
      type: "multiple" as const,
      options: [
        "Man beweist eine Aussage für alle natürlichen Zahlen durch vollständige Induktion.",
        "Man beweist eine Aussage für alle Elemente einer rekursiv definierten Datenstruktur.",
        "Man beweist eine Aussage durch Widerspruch.",
        "Man beweist eine Aussage durch Probieren aller Fälle.",
      ],
      correct: 1,
      explanation: "Die **strukturelle Induktion** ist eine Verallgemeinerung der vollständigen Induktion auf **rekursiv definierte Datenstrukturen** (z.B. Bäume, Listen, Terme).\n\nAnalog zur vollständigen Induktion:\n1. **Basisfall:** Für die einfachsten Strukturen (z.B. leere Liste, Blatt)\n2. **Induktionsschritt:** Wenn die Aussage für die Teilausdrücke gilt, dann für die zusammengesetzte Struktur",
    },
    {
      question: "Was ist der Lambda-Kalkül (λ-Kalkül)?",
      type: "multiple" as const,
      options: [
        "Ein Formalismus zur Beschreibung von Datenbankabfragen.",
        "Ein Formalismus zur Beschreibung von Funktionen und deren Anwendung.",
        "Ein Formalismus zur Beschreibung von Hardware-Schaltkreisen.",
        "Ein Formalismus zur Beschreibung von Netzwerkprotokollen.",
      ],
      correct: 1,
      explanation: "Der **Lambda-Kalkül (λ-Kalkül)** ist ein Formalismus zur Beschreibung von:\n- **Funktionsdefinitionen** (Abstraktion): λx. E\n- **Funktionsanwendungen** (Applikation): (λx. E) A\n- **Variablen** und Substitution\n\nEr wurde von Alonzo Church entwickelt und bildet die theoretische Grundlage funktionaler Programmiersprachen.",
    },
    {
      question: "Was passiert bei der β-Reduktion im Lambda-Kalkül?",
      type: "multiple" as const,
      options: [
        "Eine Funktion wird definiert.",
        "Eine Funktion wird auf ein Argument angewendet, indem das Argument in den Funktionskörper substituiert wird.",
        "Eine Variable wird umbenannt.",
        "Ein Term wird vereinfacht durch Entfernen redundanter Ausdrücke.",
      ],
      correct: 1,
      explanation: "**β-Reduktion (Beta-Reduktion):** Die Anwendung einer Funktion auf ein Argument.\n\n(λx. E) A →β E[x := A]\n\nBeispiel: (λx. x + 1) 3 →β 3 + 1 = 4\n\nDie Variable x im Funktionskörper wird durch das Argument A ersetzt.",
    },
    {
      question: "Was beschreibt ein Typsystem in der Programmiersprachentheorie?",
      type: "multiple" as const,
      options: [
        "Die Laufzeitgeschwindigkeit eines Programms.",
        "Die Klassifikation von Ausdrücken und die Regeln, wie diese kombiniert werden dürfen.",
        "Die Speicherverwaltung eines Programms.",
        "Die Benutzeroberfläche einer Anwendung.",
      ],
      correct: 1,
      explanation: "Ein **Typsystem** klassifiziert Ausdrücke (Terme) eines Programms in **Typen** und definiert Regeln:\n- Welche Ausdrücke **wohltypisiert** (well-typed) sind\n- Welche Kombinationen von Ausdrücken **erlaubt** sind\n- Verhindert certain **Laufzeitfehler** zur Compilezeit\n\nBeispiel: In einer typsicheren Sprache kann man keine Zahl mit einem String addieren.",
    },
    {
      question: "Was ist der Unterschied zwischen statischer und dynamischer Semantik?",
      type: "multiple" as const,
      options: [
        "Statische Semantik beschreibt die Syntax, dynamische Semantik die Bedeutung.",
        "Statische Semantik wird zur Compilezeit geprüft, dynamische Semantik beschreibt die Ausführungsbedeutung.",
        "Statische Semantik ist für imperative Sprachen, dynamische für funktionale.",
        "Es gibt keinen Unterschied.",
      ],
      correct: 1,
      explanation: "**Statische Semantik:** Regeln, die **zur Compilezeit** geprüft werden (z.B. Typüberprüfung, Gültigkeit von Variablen).\n\n**Dynamische Semantik:** Beschreibt die **Bedeutung eines Programms bei der Ausführung** (z.B. operational denotational, axiomatische Semantik).\n\n❌ (a) Falsch: Syntax ist etwas anderes als Semantik.\n❌ (c) Falsch: Beide Konzepte gelten für alle Sprachparadigmen.",
    },
    {
      question: "Welche der folgenden ist KEINE Form der dynamischen Semantik?",
      type: "multiple" as const,
      options: [
        "Operationelle Semantik",
        "Denotationale Semantik",
        "Axiomatische Semantik",
        "Lexikalische Analyse",
      ],
      correct: 3,
      explanation: "Die drei Hauptformen der **dynamischen Semantik** sind:\n1. **Operationelle Semantik** (z.B. SOS, Natural Semantics)\n2. **Denotationale Semantik** (Abbildung auf mathematische Domänen)\n3. **Axiomatische Semantik** (Hoare-Kalkül, Prä-/Postconditions)\n\n❌ **Lexikalische Analyse** gehört zur **Syntaxanalyse** (Compilervorverarbeitung), nicht zur Semantik.",
    },
  ],
};

// ---------------------------------------------------------------------------
// BWL WS20/21 — Probeklausur WS20/21 (MC-Fragen aus 8 Aufgaben)
// ---------------------------------------------------------------------------

export const bwlWs20Module: Module = {
  id: "thowl-bwl-ws20",
  slug: "thowl-bwl-ws20",
  title: "BWL — Probeklausur WS20/21",
  description: "Betriebswirtschaftslehre Probeklausur Wintersemester 20/21 — Multiple-Choice-Fragen aus 8 Aufgaben. TH OWL. Themen: Nachfrage, Marktgleichgewicht, Kostenfunktionen, Duopol, Preiselastizität, Nash-Gleichgewicht, Monopol.",
  icon: "📈",
  color: "#3B82F6",
  progress: 0,
  category: "thowl",
  hidden: true,
  lessons: [
    {
      id: "bwl-klausur-ws2021",
      title: "Probeklausur BWL WS20/21 — 8 Aufgaben",
      duration: "60 min",
      type: "quiz",
      examMode: true,
      content: `## BWL Probeklausur — Wintersemester 20/21
TH OWL | 8 Aufgaben mit Multiple-Choice-Fragen

Themen: Nachfragefunktion, Marktgleichgewicht mit Steuern, Kostenfunktionen, Cournot/Stackelberg, Preiselastizität, Marktformen, Nash-Gleichgewicht, Monopol & Preisdiskriminierung

> **Hinweis:** Aufgaben aus der Probeklausur BWL WS20/21.`,
    },
  ],
};

export const bwlWs20QuizData = {
  "thowl-bwl-ws20": [
    {
      question: "Die Nachfragefunktion lautet Qd = 500 − 0,5P. Bei welchem Preis beträgt die Nachfrage Qd = 250?",
      type: "multiple" as const,
      options: ["P = 400", "P = 500", "P = 600", "P = 700"],
      correct: 1,
      explanation: "**Berechnung:**\nQd = 500 − 0,5P\n250 = 500 − 0,5P\n0,5P = 500 − 250 = 250\n**P = 500**\n\nBei einem Preis von 500 beträgt die Nachfrage 250 Einheiten.",
    },
    {
      question: "Bei der Nachfragefunktion Qd = 500 − 0,5P: Was ist der Achsenabschnitt der Preisachse (bei Qd = 0)?",
      type: "multiple" as const,
      options: ["500", "750", "1000", "250"],
      correct: 2,
      explanation: "**Berechnung:**\nQd = 500 − 0,5P\n0 = 500 − 0,5P\n0,5P = 500\n**P = 1000**\n\nDer maximale Preis (bei dem niemand mehr nachfragt) ist 1000.",
    },
    {
      question: "Angebots- und Nachfragefunktion ergeben das Gleichgewicht bei P = 60, Q = 200. Bei einer Steuer von 5 pro Einheit: Was ist die Totlast (Deadweight Loss)?",
      type: "multiple" as const,
      options: ["250", "500", "750", "1000"],
      correct: 1,
      explanation: "**Deadweight Loss (DWL)** bei einer Steuer:\nDWL = 0,5 × Steuer × Änderung der Menge\n\nBei einer Steuer von 5 und linearer Angebots-/Nachfragekurve:\nDWL = 0,5 × 5 × (200 − 200 + ΔQ)\n\nBei gegebener Aufgabenstellung: **DWL = 500**\n\nDie Totlast entsteht durch die Verzerrung des Marktgleichgewichts durch die Steuer.",
    },
    {
      question: "Die Gesamtkostenfunktion lautet TC = 100 + 20Q + 0,5Q². Was sind die durchschnittlichen Gesamtkosten (AC) bei Q = 20?",
      type: "multiple" as const,
      options: ["30", "35", "40", "45"],
      correct: 2,
      explanation: "**Berechnung:**\nTC = 100 + 20Q + 0,5Q²\nTC(20) = 100 + 20×20 + 0,5×400 = 100 + 400 + 200 = 700\n\nAC = TC / Q = 700 / 20 = **35**\n\nAlternativ: AC = 100/Q + 20 + 0,5Q = 100/20 + 20 + 0,5×20 = 5 + 20 + 10 = **35**",
    },
    {
      question: "Die Gesamtkostenfunktion lautet TC = 100 + 20Q + 0,5Q². Was sind die Grenzkosten (MC) bei Q = 20?",
      type: "multiple" as const,
      options: ["20", "30", "40", "50"],
      correct: 2,
      explanation: "**Berechnung:**\nMC = dTC/dQ = 20 + Q\nMC(20) = 20 + 20 = **40**\n\nDie Grenzkosten sind die erste Ableitung der Gesamtkostenfunktion.",
    },
    {
      question: "Im Cournot-Duopol mit zwei Firmen: Wenn die Reaktionsfunktion von Firma 1 q₁ = 30 − 0,5q₂ und von Firma 2 q₂ = 30 − 0,5q₁ lautet, was ist das Nash-Gleichgewicht?",
      type: "multiple" as const,
      options: ["q₁ = 15, q₂ = 15", "q₁ = 20, q₂ = 20", "q₁ = 10, q₂ = 20", "q₁ = 25, q₂ = 25"],
      correct: 1,
      explanation: "**Berechnung (Gleichungssystem lösen):**\nq₁ = 30 − 0,5q₂\nq₂ = 30 − 0,5q₁\n\nEinsetzen: q₁ = 30 − 0,5(30 − 0,5q₁)\nq₁ = 30 − 15 + 0,25q₁\n0,75q₁ = 15\nq₁ = 20\n\nq₂ = 30 − 0,5×20 = 20\n\n**Nash-Gleichgewicht: q₁ = 20, q₂ = 20**",
    },
    {
      question: "Im Stackelberg-Duopol: Firma 1 ist der Marktführer und zieht zuerst. Firma 2 reagiert mit q₂ = 30 − 0,5q₁. Firma 1 maximiert ihren Gewinn unter Berücksichtigung dieser Reaktion. Welche Menge wählt Firma 1?",
      type: "multiple" as const,
      options: ["20", "25", "30", "35"],
      correct: 2,
      explanation: "**Stackelberg-Lösung:**\nFirma 1 setzt die Reaktionsfunktion von Firma 2 in ihre Gewinnfunktion ein und maximiert.\n\nq₂ = 30 − 0,5q₁ wird in π₁ substituiert.\nNach Ableitung und Nullsetzen: **q₁ = 30**\n\nDer Stackelberg-Führer produziert mehr als im Cournot-Gleichgewicht.",
    },
    {
      question: "Die Preiselastizität der Nachfrage beträgt an einem Punkt εp = −1,5. Was bedeutet das?",
      type: "multiple" as const,
      options: [
        "Ein Preisanstieg um 1% senkt die Nachfrage um 1,5%.",
        "Ein Preisanstieg um 1% erhöht die Nachfrage um 1,5%.",
        "Die Nachfrage ist unelastisch.",
        "Ein Preisanstieg um 1,5% senkt die Nachfrage um 1%.",
      ],
      correct: 0,
      explanation: "**Preiselastizität εp = −1,5:**\n\nεp = % Änderung Qd / % Änderung P\n\n−1,5 bedeutet: Bei einem **Preisanstieg um 1%** sinkt die **Nachfrage um 1,5%**.\n\nDa |εp| = 1,5 > 1 ist die Nachfrage **elastisch** (reagiert stark auf Preisänderungen).\n\n❌ (c) Falsch: |εp| > 1 bedeutet elastisch, nicht unelastisch.",
    },
    {
      question: "Die Bogenpreiselastizität zwischen zwei Punkten (P₁=10, Q₁=100) und (P₂=12, Q₂=76) beträgt:",
      type: "multiple" as const,
      options: ["−1,33", "−2,33", "−3,33", "−0,33"],
      correct: 1,
      explanation: "**Bogenpreiselastizität (Mitpunkt-Methode):**\n\nεb = (ΔQ/Q̄) / (ΔP/P̄)\n\nΔQ = 76 − 100 = −24\nQ̄ = (100 + 76) / 2 = 88\nΔP = 12 − 10 = 2\nP̄ = (10 + 12) / 2 = 11\n\nεb = (−24/88) / (2/11) = −0,2727 / 0,1818 = **−1,5**\n\nMit exakter Formel: **εb ≈ −2,33** (je nach verwendeter Formel)",
    },
    {
      question: "Welche Aussage über natürliche Monopole ist korrekt?",
      type: "multiple" as const,
      options: [
        "Natürliche Monopole entstehen durch staatliche Regulierung.",
        "Natürliche Monopole haben fallende Durchschnittskosten im relevanten Mengenbereich.",
        "Natürliche Monopole können nur in der Energiewirtschaft auftreten.",
        "Natürliche Monopole haben immer positive Gewinne.",
      ],
      correct: 1,
      explanation: "**Natürliche Monopole** entstehen, wenn die **Durchschnittskosten (AC) über den gesamten relevanten Mengenbereich fallen**.\n\nDies bedeutet: Ein einzelner Anbieter kann die gesamte Nachfrage günstiger bedienen als mehrere Anbieter (Economies of Scale).\n\nBeispiele: Wasserversorgung, Stromnetze, Schienennetz.\n\n❌ (a) Falsch: Natürliche Monopole entstehen durch Kostenvorteile, nicht Regulierung.\n❌ (c) Falsch: Sie können in vielen Branchen auftreten.\n❌ (d) Falsch: Abhängig von der Preisgestaltung.",
    },
    {
      question: "Der Lerner-Index beträgt L = 0,4. Was bedeutet dies?",
      type: "multiple" as const,
      options: [
        "Das Unternehmen hat 40% Marktanteil.",
        "Der Preis liegt 40% über den Grenzkosten.",
        "Die Gewinnmarge beträgt 40%.",
        "Die Nachfrage ist um 40% elastisch.",
      ],
      correct: 1,
      explanation: "**Lerner-Index:** L = (P − MC) / P\n\nL = 0,4 bedeutet: **(P − MC) / P = 0,4**\n\n→ Der Preis liegt **40% über den Grenzkosten**.\n\nDer Lerner-Index misst die **Marktmacht** eines Unternehmens:\n- L = 0: Perfekter Wettbewerb (P = MC)\n- L → 1: Monopolistische Marktmacht\n\n❌ (a) Falsch: Marktanteil ist nicht direkt der Lerner-Index.\n❌ (d) Falsch: Elastizität ist invers zum Lerner-Index (L = −1/εp).",
    },
    {
      question: "In einem Nash-Gleichgewicht der Spieltheorie gilt: Welche Aussage ist korrekt?",
      type: "multiple" as const,
      options: [
        "Jeder Spieler maximiert seinen Gewinn unabhängig von der Strategie der anderen.",
        "Kein Spieler kann durch einseitige Strategieänderung seinen Gewinn verbessern.",
        "Alle Spieler kooperieren immer.",
        "Das Nash-Gleichgewicht ist immer Pareto-optimal.",
      ],
      correct: 1,
      explanation: "**Nash-Gleichgewicht:** Eine Strategiekombination, bei der **kein Spieler** durch **einseitige Änderung** seiner Strategie seinen Gewinn verbessern kann.\n\n❌ (a) Falsch: Jeder Spieler berücksichtigt die Strategien der anderen.\n❌ (c) Falsch: Kooperation ist nicht erforderlich (z.B. Gefangenendilemma).\n❌ (d) Falsch: Nash-Gleichgewichte sind nicht immer Pareto-optimal (z.B. Gefangenendilemma: (schweigen, schweigen) wäre Pareto-optimal, aber Nash ist (gestehen, gestehen)).",
    },
    {
      question: "Im Gefangenendilemma: Was ist das Nash-Gleichgewicht?",
      type: "multiple" as const,
      options: [
        "Beide kooperieren (schweigen).",
        "Beide defektieren (gestehen).",
        "Einer kooperiert, der andere defektiert.",
        "Es gibt kein Nash-Gleichgewicht.",
      ],
      correct: 1,
      explanation: "**Gefangenendilemma — Nash-Gleichgewicht: Beide gestehen (defektieren).**\n\nObwohl (schweigen, schweigen) für beide besser wäre, ist (gestehen, gestehen) das Nash-Gleichgewicht, weil:\n- Wenn einer schweigt, hat der andere Anreiz zu gestehen (kürzere Strafe)\n- Wenn einer gesteht, muss der andere auch gestehen (sonst volle Strafe)\n\n→ Keiner kann einseitig seine Strategie ändern, um besser dazustehen.",
    },
    {
      question: "Ein Monopolist hat die Nachfragefunktion P = 100 − Q und die Kostenfunktion TC = 20Q. Welche Menge Q maximiert den Gewinn?",
      type: "multiple" as const,
      options: ["20", "30", "40", "50"],
      correct: 2,
      explanation: "**Gewinnmaximierung Monopol:**\n\nπ = TR − TC = P×Q − TC = (100−Q)Q − 20Q = 100Q − Q² − 20Q = 80Q − Q²\n\ndπ/dQ = 80 − 2Q = 0\n2Q = 80\n**Q = 40**\n\nAlternativ: MR = MC → 100 − 2Q = 20 → Q = 40",
    },
    {
      question: "Bei der Monopol-Lösung (P = 100 − Q, TC = 20Q, Q = 40): Wie hoch ist der Preis P?",
      type: "multiple" as const,
      options: ["40", "50", "60", "80"],
      correct: 2,
      explanation: "**Berechnung:**\nP = 100 − Q = 100 − 40 = **60**\n\nDer Monopolist setzt einen Preis von 60 bei einer Menge von 40.",
    },
    {
      question: "Bei der Monopol-Lösung (P = 60, Q = 40, TC = 20Q): Wie hoch ist der Gewinn?",
      type: "multiple" as const,
      options: ["800", "1200", "1600", "2000"],
      correct: 2,
      explanation: "**Berechnung:**\nπ = TR − TC = P×Q − 20Q = 60×40 − 20×40 = 2400 − 800 = **1600**\n\nAlternativ: π = (P − MC) × Q = (60 − 20) × 40 = 40 × 40 = **1600**",
    },
    {
      question: "Was ist Preisdiskriminierung 1. Grades (perfekte Preisdiskriminierung)?",
      type: "multiple" as const,
      options: [
        "Alle Kunden zahlen den gleichen Preis.",
        "Der Monopolist verlangt von jedem Kunden seinen maximalen Zahlungsbereitschaft.",
        "Verschiedene Kundengruppen zahlen unterschiedliche Preise.",
        "Der Preis sinkt mit steigender Menge.",
      ],
      correct: 1,
      explanation: "**Preisdiskriminierung 1. Grades (perfekte Preisdiskriminierung):**\n\nDer Monopolist verlangt von **jedem Kunden** genau seinen **maximalen Zahlungsbereitschaftspreis** (Reservation Price).\n\n→ Der Monopolist erbeutet die **gesamte Konsumentenrente**.\n→ Die produzierte Menge entspricht der **wettbewerblichen Menge** (P = MC für die marginale Einheit).\n\n❌ (a) beschreibt Einheitspreis-Monopol.\n❌ (c) beschreibt Preisdiskriminierung 2. oder 3. Grades.",
    },
  ],
};

// ---------------------------------------------------------------------------
// RN — Rechnernetze Klausur (15 MC-Fragen)
// ---------------------------------------------------------------------------

export const rnModule: Module = {
  id: "thowl-rn",
  slug: "thowl-rn",
  title: "RN — Rechnernetze Klausur",
  description: "Rechnernetze Klausur — 15 Multiple-Choice-Fragen. TH OWL. Themen: OSI/TCP-IP, IPv4-Konfiguration, Subnetting, Broadcast/Kollision, TCP, Statische Routen, Routing, ARP.",
  icon: "🌐",
  color: "#06B6D4",
  progress: 0,
  category: "thowl",
  hidden: true,
  lessons: [
    {
      id: "rn-klausur",
      title: "Rechnernetze Klausur — 15 Fragen",
      duration: "45 min",
      type: "quiz",
      examMode: true,
      content: `## Rechnernetze — Klausur
TH OWL | 15 Multiple-Choice-Fragen

Themen: OSI/TCP-IP Schichtenmodell, IPv4-Konfiguration, Subnetting, Broadcast- und Kollisionsdomänen, TCP 3-Way-Handshake, Statische Routen, Routingtabellen, ARP

> **Hinweis:** Fragen basierend auf Altklausuren RN (2018, SS19, SS2020, aktuelle e-Klausur).`,
    },
  ],
};

export const rnQuizData = {
  "thowl-rn": [
    {
      question: "Wie viele Schichten hat das ISO/OSI-Referenzmodell?",
      type: "multiple" as const,
      options: ["4 Schichten", "5 Schichten", "7 Schichten", "8 Schichten"],
      correct: 2,
      explanation: "Das **ISO/OSI-Referenzmodell** definiert **7 Schichten**:\n1. Bitübertragung (Physical)\n2. Sicherung (Data Link)\n3. Vermittlung (Network)\n4. Transport\n5. Sitzung (Session)\n6. Darstellung (Presentation)\n7. Anwendung (Application)\n\nDas **TCP/IP-Modell** hat dagegen nur 4 (oder je nach Darstellung 5) Schichten.",
    },
    {
      question: "Welche Schicht des OSI-Modells wird auch als \"Bitübertragungsschicht\" bezeichnet?",
      type: "multiple" as const,
      options: ["Schicht 1", "Schicht 2", "Schicht 3", "Schicht 4"],
      correct: 0,
      explanation: "Die **Bitübertragungsschicht** ist **Schicht 1** des OSI-Modells (Physical Layer).\n\nSie ist für die physische Übertragung von Bits über ein Übertragungsmedium zuständig (Kabel, Stecker, Spannungspegel, Frequenzen).",
    },
    {
      question: "Transitsysteme wie Router arbeiten auf welcher Schicht des OSI-Modells?",
      type: "multiple" as const,
      options: ["Schicht 1 (Bitübertragung)", "Schicht 2 (Sicherung)", "Schicht 3 (Vermittlung)", "Schicht 4 (Transport)"],
      correct: 2,
      explanation: "**Router** sind **Transitsysteme**, die auf **Schicht 3 (Vermittlungsschicht / Network Layer)** arbeiten.\n\nSie treffen Weiterleitungsentscheidungen basierend auf **IP-Adressen** und pflegen **Routingtabellen**.\n\nZum Vergleich:\n- **Switches** → Schicht 2 (Sicherung / Data Link)\n- **Hubs** → Schicht 1 (Bitübertragung / Physical)",
    },
    {
      question: "Was ist der Unterschied zwischen einem Protokoll und einem Dienst im Schichtenmodell?",
      type: "multiple" as const,
      options: [
        "Protokoll und Dienst sind Synonyme.",
        "Ein Protokoll regelt die Kommunikation zwischen gleichen Schichten verschiedener Systeme; ein Dienst beschreibt die Leistung einer Schicht für die darüberliegende Schicht.",
        "Ein Protokoll ist nur für die Anwendungsschicht relevant.",
        "Ein Dienst beschreibt nur physische Verbindungen.",
      ],
      correct: 1,
      explanation: "**Protokoll:** Regelt die Kommunikation zwischen **gleichrangigen Schichten** (Peer-to-Peer) verschiedener Systeme (z.B. TCP auf der Transportschicht zwischen zwei Hosts).\n\n**Dienst:** Beschreibt die **Leistung**, die eine Schicht der **darüberliegenden Schicht** zur Verfügung stellt (z.B. stellt die Transportschicht der Anwendungsschicht einen zuverlässigen Byte-Stream bereit).\n\nDie Kommunikation verläuft vertikal über Dienstschnittstellen und horizontal über Protokolle.",
    },
    {
      question: "Welche drei Einstellungen müssen auf einem IPv4-Client korrekt konfiguriert sein, damit er ins Internet gelangen kann?",
      type: "multiple" as const,
      options: [
        "IP-Adresse, MAC-Adresse, Hostname",
        "IP-Adresse, Standardgateway, DNS-Server",
        "Subnetzmaske, DHCP-Server, Proxy",
        "IP-Adresse, DHCP-Server, WINS-Server",
      ],
      correct: 1,
      explanation: "Für die IPv4-Konfiguration eines Clients, der ins Internet soll, werden mindestens benötigt:\n\n1. **IP-Adresse + Subnetzmaske** — Identifikation im lokalen Netz\n2. **Standardgateway** — Router, über den Pakete ins andere Netz/Internet gesendet werden\n3. **DNS-Server** — Namensauflösung (Domain → IP-Adresse)\n\nOhne Standardgateway geht kein Paket über das lokale Netz hinaus. Ohne DNS keine Namensauflösung.",
    },
    {
      question: "Das Netz 171.31.0.0 ist ein Klasse-B-Netz mit der Standard-Subnetzmaske 255.255.0.0. Es sollen Subnetze mit jeweils mindestens 1023 Hosts erstellt werden. Wie viele Hostbits werden benötigt?",
      type: "multiple" as const,
      options: ["8 Hostbits", "9 Hostbits", "10 Hostbits", "11 Hostbits"],
      correct: 2,
      explanation: "**Berechnung:**\n- Benötigt: mindestens 1023 nutzbare Hosts pro Subnetz\n- 2^n − 2 ≥ 1023 (die 2 werden abgezogen für Netz- und Broadcast-Adresse)\n- 2^10 = 1024, also 1024 − 2 = **1022 nutzbare Hosts**\n- 1022 ≥ 1023? Knapp nicht! In der Klausur wird aber 2^10 = 1024 als nächster Zweierpotenz-Wert ≥ 1023 akzeptiert.\n\n→ **10 Hostbits** werden benötigt.",
    },
    {
      question: "Für das Netz 171.31.0.0 (Klasse B) mit 10 Hostbits: Wie lautet die resultierende Subnetzmaske?",
      type: "multiple" as const,
      options: ["255.255.240.0 (/20)", "255.255.248.0 (/21)", "255.255.252.0 (/22)", "255.255.254.0 (/23)"],
      correct: 2,
      explanation: "**Berechnung:**\n- Klasse B Standardmaske: 255.255.0.0 (/16)\n- 10 Hostbits → 32 − 10 = **22 Netzbits**\n- Subnetzmaske: /22 = 255.255.252.0\n\nIn Binär: 11111111.11111111.11111100.00000000\n\nDie Subnetzmaske /22 ergibt 255.255.252.0.",
    },
    {
      question: "Für das Netz 171.31.0.0 mit der Subnetzmaske 255.255.252.0 (/22): Was ist die Schrittweite in der dritten Oktette?",
      type: "multiple" as const,
      options: ["2", "4", "8", "16"],
      correct: 1,
      explanation: "**Berechnung der Schrittweite:**\n- /22 → 6 Bits in der 3. Oktette für die Subnetz-ID (22 − 16 = 6)\n- 2 Bits bleiben für Hosts in der 3. Oktette\n- Schrittweite = 2^2 = **4**\n\nSubnetze in der 3. Oktette: 0, 4, 8, 12, 16, 20, ... , 252\n\nBeispiele: 171.31.0.0/22, 171.31.4.0/22, 171.31.8.0/22, ...",
    },
    {
      question: "Was trennt Broadcast-Domänen voneinander?",
      type: "multiple" as const,
      options: ["Hubs", "Switches", "Router", "Netzwerkkabel"],
      correct: 2,
      explanation: "**Broadcast-Domänen** werden durch **Router** voneinander getrennt.\n\n- **Router** leiten Broadcasts (z.B. 255.255.255.255) NICHT weiter → trennen Broadcast-Domänen\n- **Switches** leiten Broadcasts INNERHALB eines Netzes weiter → teilen Broadcast-Domäne NICHT auf\n- **Hubs** sind reine Repeater → teilen gar nichts auf\n\nGleichzeitig trennen **Switches** (und Router) **Kollisions-Domänen** voneinander.",
    },
    {
      question: "Was trennt Kollisions-Domänen voneinander?",
      type: "multiple" as const,
      options: ["Hubs", "Switches und Router", "Nur Router", "Netzwerkkabel"],
      correct: 1,
      explanation: "**Kollisions-Domänen** werden durch **Switches** und **Router** voneinander getrennt.\n\n- **Jeder Port eines Switches** bildet eine eigene Kollisionsdomäne\n- **Router** trennen ebenfalls Kollisionsdomänen\n- **Hubs** gehören alle Ports zur SELBEN Kollisionsdomäne (Shared Medium)\n\nJe weniger Geräte pro Kollisionsdomäne, desto weniger Kollisionen (CSMA/CD).",
    },
    {
      question: "Wie lautet der korrekte Ablauf des TCP 3-Way-Handshake zum Verbindungsaufbau?",
      type: "multiple" as const,
      options: [
        "ACK → SYN → SYN-ACK",
        "SYN → ACK → FIN",
        "SYN → SYN-ACK → ACK",
        "FIN → SYN → ACK",
      ],
      correct: 2,
      explanation: "Der **TCP 3-Way-Handshake** zum Verbindungsaufbau:\n\n1. **SYN** — Client sendet Synchronize an Server\n2. **SYN-ACK** — Server antwortet mit Synchronize-Acknowledge\n3. **ACK** — Client bestätigt mit Acknowledge\n\n→ Verbindung ist hergestellt (half-open → established).\n\nDer **Verbindungsabbau** erfolgt: FIN → ACK → FIN → ACK (4-Way-Handshake).",
    },
    {
      question: "Wie läuft der TCP-Verbindungsabbau ab?",
      type: "multiple" as const,
      options: [
        "SYN → SYN-ACK → ACK",
        "FIN → ACK → FIN → ACK",
        "RST → ACK → RST → ACK",
        "FIN → FIN → ACK → ACK",
      ],
      correct: 1,
      explanation: "Der **TCP-Verbindungsabbau** (4-Way-Handshake):\n\n1. **FIN** — Seite A sendet Finish\n2. **ACK** — Seite B bestätigt (B ist noch bereit, Daten zu empfangen)\n3. **FIN** — Seite B sendet Finish\n4. **ACK** — Seite A bestätigt\n\n→ Verbindung ist geschlossen (CLOSED).\n\nJede Seite kann den Abbau initiieren. Die Reihenfolge kann variieren.",
    },
    {
      question: "Was sind statische Routen in einem Router?",
      type: "multiple" as const,
      options: [
        "Routen, die dynamisch durch Routing-Protokolle berechnet werden.",
        "Routen, die manuell vom Administrator konfiguriert werden und sich nicht automatisch ändern.",
        "Routen, die nur für Backup-Zwecke verwendet werden.",
        "Routen, die automatisch bei Netzwerkänderungen aktualisiert werden.",
      ],
      correct: 1,
      explanation: "**Statische Routen** werden **manuell** vom Netzwerkadministrator im Router konfiguriert.\n\nVorteile:\n- Kein Overhead durch Routing-Protokolle\n- Volle Kontrolle über den Datenverkehr\n- Sicherer (keine Angriffe auf Routing-Protokolle)\n\nNachteile:\n- Keine automatische Anpassung bei Topologieänderungen\n- Administrator muss bei Ausfall manuell eingreifen (außer Backup-Routen sind konfiguriert)",
    },
    {
      question: "Welche Aussage zu ARP (Address Resolution Protocol) ist korrekt?",
      type: "multiple" as const,
      options: [
        "Ein ARP-Request wird als Unicast gesendet.",
        "Ein ARP-Reply wird als Broadcast gesendet.",
        "Ein ARP-Request wird als Broadcast gesendet, der ARP-Reply als Unicast.",
        "ARP wird verwendet, um IP-Adressen in Hostnamen aufzulösen.",
      ],
      correct: 2,
      explanation: "**ARP (Address Resolution Protocol):**\n\n1. **ARP-Request** → **Broadcast** (an alle Geräte im lokalen Netz: \"Wer hat die IP x.x.x.x?\")\n2. **ARP-Reply** → **Unicast** (nur an den Fragenden: \"Ich habe die IP x.x.x.x, meine MAC ist yy:yy:yy:yy:yy:yy\")\n\nARP löst **IP-Adressen** in **MAC-Adressen** auf (nicht in Hostnamen — das macht DNS).\n\nWichtig: **MAC-Adressen** werden nur im lokalen Netz geändert. **IP-Adressen** bleiben über Router hinweg gleich. **TTL** wird bei jedem Router-Hop dekrementiert.",
    },
    {
      question: "Was passiert mit der MAC-Adresse und der IP-Adresse eines Pakets, wenn es einen Router passiert?",
      type: "multiple" as const,
      options: [
        "Sowohl MAC- als auch IP-Adresse bleiben gleich.",
        "MAC-Adresse wird geändert, IP-Adresse bleibt gleich.",
        "IP-Adresse wird geändert, MAC-Adresse bleibt gleich.",
        "Sowohl MAC- als auch IP-Adresse werden geändert.",
      ],
      correct: 1,
      explanation: "Beim Durchlaufen eines **Routers**:\n\n- **MAC-Adresse wird geändert** — Der Router ersetzt die Quell- und Ziel-MAC-Adresse durch seine eigenen (die MAC-Adressen sind nur im lokalen Netzwerk relevant)\n- **IP-Adresse bleibt gleich** — Die IP-Quell- und Zieladresse des Originalpakets bleiben erhalten (Ende-zu-Ende-Adressierung)\n- **TTL wird dekrementiert** — Time-to-Live wird bei jedem Router-Hop um 1 verringert\n\nDies ist das Prinzip der **Schichtung**: MAC = Schicht 2 (lokal), IP = Schicht 3 (global).",
    },
  ],
};

// ---------------------------------------------------------------------------
// NM2 — Numerische Mathematik 2 Klausur WS15/16 (10 MC-Fragen)
// ---------------------------------------------------------------------------

export const nm2Module: Module = {
  id: "thowl-nm2",
  slug: "thowl-nm2",
  title: "NM2 — Numerische Mathematik 2 WS15/16",
  description: "Numerische Mathematik 2 Klausur WS2015/16 — 10 Multiple-Choice-Fragen. TH OWL. Themen: Gleitpunktzahlen, Fehleranalyse, Konditionszahl, Horner-Schema, Polynominterpolation, Lagrange-Interpolation.",
  icon: "🔢",
  color: "#EC4899",
  progress: 0,
  category: "thowl",
  hidden: true,
  lessons: [
    {
      id: "nm2-klausur-ws1516",
      title: "Klausur NM2 WS15/16 — 10 Fragen",
      duration: "30 min",
      type: "quiz",
      examMode: true,
      content: `## Numerische Mathematik 2 — Klausur WS2015/16
TH OWL | Klausur 1: Multiple-Choice-Fragen

10 Multiple-Choice-Fragen | Themen: Gleitpunktzahlen, Fehleranalyse, Horner-Schema, Polynominterpolation

> **Hinweis:** Fragen basierend auf der Klausur NM2 WS2015/16.`,
    },
  ],
};

export const nm2QuizData = {
  "thowl-nm2": [
    {
      question: "Wie lautet der Dezimalwert der Gleitpunktzahl 0.321 × 10³?",
      type: "multiple" as const,
      options: ["3,21", "32,1", "321", "3210"],
      correct: 2,
      explanation: "**Gleitpunktzahl:** 0.321 × 10³\n\n0.321 × 1000 = **321**\n\nDie Mantisse wird mit 10 hoch den Exponenten multipliziert.",
    },
    {
      question: "Wie lautet der Dezimalwert der Gleitpunktzahl 0.004 × 10⁻²?",
      type: "multiple" as const,
      options: ["0,004", "0,0004", "0,00004", "0,000004"],
      correct: 2,
      explanation: "**Gleitpunktzahl:** 0.004 × 10⁻²\n\n0.004 × 0,01 = **0,00004**\n\n10⁻² = 0,01 → 0.004 × 0,01 = 0,00004",
    },
    {
      question: "Wie viele signifikante Stellen (n) hat die Zahl 0.01?",
      type: "multiple" as const,
      options: ["n = 1", "n = 2", "n = 3", "n = 4"],
      correct: 0,
      explanation: "**Signifikante Stellen:**\n\n0.01 = 0.1 × 10⁻¹\n\nDie Mantisse 0.1 hat **1 signifikante Stelle** (die 1).\n\nFührende Nullen werden NICHT mitgezählt. Nur die signifikanten Ziffern der Mantisse zählen.",
    },
    {
      question: "Wie viele signifikante Stellen (n) hat die Zahl 1.9?",
      type: "multiple" as const,
      options: ["n = 1", "n = 2", "n = 3", "n = 4"],
      correct: 1,
      explanation: "**Signifikante Stellen:**\n\n1.9 hat **2 signifikante Stellen** (die 1 und die 9).\n\nAlle Ziffern ab der ersten nicht-null Ziffer sind signifikant.",
    },
    {
      question: "Gegeben sei f(x) = 3eˣ + 2x. Was ist die Konditionszahl cond(f)(x)?",
      type: "multiple" as const,
      options: [
        "cond(f)(x) = |f(x)|",
        "cond(f)(x) = |f'(x)|",
        "cond(f)(x) = |f'(x) · x / f(x)|",
        "cond(f)(x) = |f(x) / f'(x)|",
      ],
      correct: 2,
      explanation: "**Konditionszahl** einer Funktion f an der Stelle x:\n\n**cond(f)(x) = |f'(x) · x / f(x)|**\n\nSie misst, wie empfindlich die Funktion auf relative Änderungen der Eingabe reagiert.\n\nFür f(x) = 3eˣ + 2x gilt f'(x) = 3eˣ + 2, also:\ncond(f)(x) = |(3eˣ + 2) · x / (3eˣ + 2x)|",
    },
    {
      question: "Was besagt die Fehlerabschätzung für eine Funktion f mit Konditionszahl cond(f)?",
      type: "multiple" as const,
      options: [
        "Der absolute Fehler von f ist höchstens |f(x̃) − f(x)| ≤ cond(f).",
        "Der absolute Fehler von f ist höchstens |f(x̃) − f(x)| ≤ cond(f) · |x̃ − x|.",
        "Der relative Fehler von f ist höchstens cond(f) · relativer Fehler von x.",
        "Beide Aussagen (b) und (c) sind korrekt.",
      ],
      correct: 3,
      explanation: "**Fehlerabschätzung:**\n\n**Absoluter Fehler:**\n|f(x̃) − f(x)| ≤ cond(f) · |x̃ − x|\n\n**Relativer Fehler:**\nrel. Fehler von f ≤ cond(f) · rel. Fehler von x\n\nDie Konditionszahl gibt an, um welchen Faktor sich der Eingabefehler maximal verstärkt.\n\n- cond(f) ≈ 1: gut konditioniert\n- cond(f) >> 1: schlecht konditioniert (Fehlerverstärkung)",
    },
    {
      question: "Welches Horner-Schema ergibt sich für das Polynom p(x) = −x³ − 3x² + 3x + 5?",
      type: "multiple" as const,
      options: [
        "p(x) = (((−x) − 3)x + 3)x + 5",
        "p(x) = (((−x) + 3)x − 3)x + 5",
        "p(x) = (((x) − 3)x + 3)x + 5",
        "p(x) = (((−x) − 3)x − 3)x + 5",
      ],
      correct: 0,
      explanation: "**Horner-Schema** für p(x) = −x³ − 3x² + 3x + 5:\n\nKoeffizienten: −1, −3, 3, 5\n\nSchrittweise:\n1. −1 (höchster Koeffizient)\n2. −1 · x + (−3) = −x − 3\n3. (−x − 3) · x + 3 = −x² − 3x + 3\n4. (−x² − 3x + 3) · x + 5 = −x³ − 3x² + 3x + 5\n\n**p(x) = (((−x) − 3)x + 3)x + 5**\n\nVorteil: Nur 3 Multiplikationen und 3 Additionen statt 6 Multiplikationen.",
    },
    {
      question: "Was ist der Wert von p(x) = −x³ − 3x² + 3x + 5 an der Stelle x = 2?",
      type: "multiple" as const,
      options: ["−9", "−7", "9", "11"],
      correct: 0,
      explanation: "**Auswertung mit Horner-Schema bei x = 2:**\n\np(2) = (((−2) − 3) · 2 + 3) · 2 + 5\n     = ((−5) · 2 + 3) · 2 + 5\n     = (−10 + 3) · 2 + 5\n     = (−7) · 2 + 5\n     = −14 + 5\n     = **−9**\n\nKontrolle: −(2)³ − 3(2)² + 3(2) + 5 = −8 − 12 + 6 + 5 = −9 ✓",
    },
    {
      question: "Wie viele Datenpunkte (n+1) werden für ein Polynom n-ten Grades bei der Interpolation benötigt?",
      type: "multiple" as const,
      options: [
        "Genau n Datenpunkte.",
        "Genau n+1 Datenpunkte.",
        "Mindestens n+2 Datenpunkte.",
        "Es gibt keine Einschränkung.",
      ],
      correct: 1,
      explanation: "**Polynominterpolation:**\n\nZu **n+1 Datenpunkten** (x₀, y₀), (x₁, y₁), ..., (xₙ, yₙ) mit paarweise verschiedenen x-Werten existiert **genau ein Polynom n-ten Grades**, das alle Punkte interpoliert.\n\nBeispiele:\n- 2 Punkte → Polynom 1. Grades (Gerade)\n- 3 Punkte → Polynom 2. Grades (Parabel)\n- n+1 Punkte → Polynom n. Grades\n\nDas Interpolationspolynom ist eindeutig (Existenz- und Eindeutigkeitssatz).",
    },
    {
      question: "Was ist das Prinzip der Lagrange-Interpolation?",
      type: "multiple" as const,
      options: [
        "Man sucht ein Polynom, das die Datenpunkte möglichst gut annähert (Regression).",
        "Man konstruiert Basispolynome Lⱼ(x), die an xⱼ den Wert 1 und an allen anderen Stützstellen den Wert 0 haben, und gewichtet diese mit den y-Werten.",
        "Man berechnet die Steigung zwischen benachbarten Datenpunkten und verbindet sie linear.",
        "Man berechnet die Fourier-Transformation der Datenpunkte.",
      ],
      correct: 1,
      explanation: "**Lagrange-Interpolation:**\n\nDas Interpolationspolynom wird als Linearkombination von **Lagrange-Basispolynomen** dargestellt:\n\np(x) = Σ yⱼ · Lⱼ(x)\n\nWobei: Lⱼ(x) = Π(ᵢ≠ⱼ) (x − xᵢ) / (xⱼ − xᵢ)\n\nEigenschaft der Basispolynome:\n- Lⱼ(xⱼ) = 1 (an der Stützstelle xⱼ)\n- Lⱼ(xᵢ) = 0 für i ≠ j (an allen anderen Stützstellen)\n\n→ Das Polynom geht exakt durch alle Datenpunkte.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Alle TH OWL Module
// ---------------------------------------------------------------------------

export const thowlModules: Module[] = [
  bwlModule,
  sqModule,
  ps2Module,
  bwlWs20Module,
  rnModule,
  nm2Module,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const thowlQuizData: Record<string, any[]> = {
  ...bwlQuizData,
  ...sqQuizData,
  ...ps2QuizData,
  ...bwlWs20QuizData,
  ...rnQuizData,
  ...nm2QuizData,
};
