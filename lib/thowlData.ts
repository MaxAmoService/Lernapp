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
// Alle TH OWL Module
// ---------------------------------------------------------------------------

export const thowlModules: Module[] = [
  bwlModule,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const thowlQuizData: Record<string, any[]> = {
  ...bwlQuizData,
};
