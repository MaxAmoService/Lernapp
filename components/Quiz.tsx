"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthProvider";
import { mathQuizzes } from "@/lib/mathData";
import { complexQuizzes } from "@/lib/complexData";
import { grundrechnenQuizzes } from "@/lib/grundrechnenData";
import { ganzeZahlenQuizzes } from "@/lib/ganzeZahlenData";
import { quadratischeGleichungenQuizzes } from "@/lib/quadratischeGleichungenData";
import { logarithmusQuizzes } from "@/lib/logarithmusData";
import { exponentialQuizzes } from "@/lib/exponentialData";
import { wachstumsprozesseQuizzes } from "@/lib/wachstumsprozesseData";
import { fourierQuizzes } from "@/lib/fourierData";
import { MathBlock } from "./MathBlock";
import { InlineText } from "./InlineText";
import { CheckCircle2, XCircle, RotateCcw, Send } from "lucide-react";

interface QuizQuestion {
  question: string;
  type: "multiple" | "input";
  options?: string[];
  correct: number | string;
  explanation: string;
  hint?: string;
}

interface QuizProps {
  moduleSlug: string;
  onComplete: () => void;
}

const quizData: Record<string, QuizQuestion[]> = {
  "react-grundlagen": [
    {
      question: "Was ist React?",
      type: "multiple",
      options: [
        "Eine Programmiersprache",
        "Eine JavaScript-Bibliothek für UIs",
        "Ein Datenbank-System",
        "Ein Betriebssystem",
      ],
      correct: 1,
      explanation: "React ist eine JavaScript-Bibliothek von Meta (Facebook) für den Aufbau von Benutzeroberflächen.",
    },
    {
      question: "Welche Hook wird für State in Funktionskomponenten verwendet?",
      type: "input",
      correct: "useState",
      explanation: "useState ist die State-Hook für Funktionskomponenten. Geschrieben als 'useState' (camelCase).",
      hint: "Es beginnt mit 'use' und hat 4 Buchstaben danach...",
    },
    {
      question: "Was gibt useState zurück?",
      type: "multiple",
      options: [
        "Nur den aktuellen State",
        "Eine Funktion zum Updaten",
        "Ein Array mit [state, setState]",
        "Ein Objekt mit state und update",
      ],
      correct: 2,
      explanation: "useState gibt ein Array mit zwei Elementen zurück: den aktuellen State und eine Funktion zum Aktualisieren.",
    },
    {
      question: "Wie nennt man die HTML-ähnliche Syntax in React?",
      type: "input",
      correct: "JSX",
      explanation: "JSX (JavaScript XML) ist die Erweiterung, die HTML-ähnliche Syntax in JavaScript ermöglicht.",
      hint: "Drei Buchstaben, beginnt mit J...",
    },
    {
      question: "Wann wird useEffect mit leerem Dependency Array ausgeführt?",
      type: "multiple",
      options: [
        "Bei jedem Render",
        "Nur beim ersten Render (Mount)",
        "Nur bei State-Änderungen",
        "Nie",
      ],
      correct: 1,
      explanation: "Mit leerem Dependency Array [] wird useEffect nur einmal beim Mounten der Komponente ausgeführt.",
    },
  ],
  "mathe-ableitungen": [
    {
      question: "Was ist die Ableitung von f(x) = x³?",
      type: "input",
      correct: "3x^2",
      explanation: "Mit der Potenzregel: f'(x) = 3·x^(3-1) = 3x²",
      hint: "Potenzregel anwenden: n·x^(n-1)",
    },
    {
      question: "Was ist die Ableitung von sin(x)?",
      type: "input",
      correct: "cos(x)",
      explanation: "Die Ableitung von sin(x) ist cos(x).",
    },
    {
      question: "Was ist die Ableitung von eˣ?",
      type: "input",
      correct: "e^x",
      explanation: "eˣ ist seine eigene Ableitung: (eˣ)' = eˣ",
      hint: "e^x bleibt e^x...",
    },
    {
      question: "Welche Regel wird für [f·g]' verwendet?",
      type: "multiple",
      options: [
        "Kettenregel",
        "Produktregel",
        "Quotientenregel",
        "Summenregel",
      ],
      correct: 1,
      explanation: "Die Produktregel: [f·g]' = f'·g + f·g'",
    },
    {
      question: "Was ist die Kettenregel für f(g(x))?",
      type: "input",
      correct: "f'(g(x)) * g'(x)",
      explanation: "Die Kettenregel: [f(g(x))]' = f'(g(x)) · g'(x)",
      hint: "Ableitung außen mal Ableitung innen",
    },
  ],
  "typescript-basics": [
    {
      question: "Welches Schlüsselwort definiert ein Interface in TypeScript?",
      type: "input",
      correct: "interface",
      explanation: "Interfaces werden mit dem 'interface' Schlüsselwort definiert.",
    },
    {
      question: "Was ist der Unterschied zwischen 'type' und 'interface'?",
      type: "multiple",
      options: [
        "Kein Unterschied",
        "Interfaces können erweitert werden, Types nicht",
        "Beide sind gleich, aber interfaces sind schneller",
        "Types sind nur für Primitive",
      ],
      correct: 1,
      explanation: "Beide können ähnlich verwendet werden, aber Interfaces支持 Declaration Merging und können erweitert werden.",
    },
    {
      question: "Was macht das '?' nach einem Property-Namen?",
      type: "multiple",
      options: [
        "Es macht die Property unsichtbar",
        "Es macht die Property optional",
        "Es macht die Property readonly",
        "Es macht die Property nullable",
      ],
      correct: 1,
      explanation: "Das '?' macht eine Property optional - sie muss nicht vorhanden sein.",
    },
  ],
  "ihk-git": [
    {
      question: "Was ist der Hauptunterschied zwischen zentraler und dezentraler VV?",
      type: "multiple",
      options: [
        "Zentrale VV speichert alles nur auf einem zentralen Server",
        "Dezentrale VV gibt jedem Entwickler eine vollständige Kopie des Repositorys",
        "Zentrale VV verwendet ausschließlich Branches für die Zusammenarbeit",
        "Dezentrale VV benötigt immer eine aktive Internetverbindung",
      ],
      correct: 1,
      explanation: "Bei dezentraler VV hat jeder Entwickler eine vollständige Kopie inkl. Historie — arbeiten offline möglich.",
    },
    {
      question: "Was macht 'git fetch'?",
      type: "multiple",
      options: [
        "Lädt Änderungen herunter und merged sie automatisch in den lokalen Branch",
        "Lädt nur die Änderungen herunter, ohne sie zu mergen",
        "Erstellt einen neuen Remote-Branch und pushed lokale Änderungen",
        "Synchronisiert nur die Tags, nicht die Branches",
      ],
      correct: 1,
      explanation: "git fetch aktualisiert nur den lokalen Stand des Remote-Repositorys ohne zu mergen. Erst git pull merged.",
    },
    {
      question: "Was bedeutet Semantic Versioning 2.1.0?",
      type: "multiple",
      options: [
        "Major 2 (Breaking Changes), Minor 1 (neues Feature), Patch 0 (kein Bugfix)",
        "Revision 2, Build 1, Hotfix 0",
        "Version 2, Update 1, Release 0",
        "Generation 2, Iteration 1, Phase 0",
      ],
      correct: 0,
      explanation: "Semantic Versioning: MAJOR.MINOR.PATCH — Major bei Breaking Changes, Minor bei neuen Features, Patch bei Bugfixes.",
    },
    {
      question: "Welcher Branch ist in Gitflow für die produktive Version zuständig?",
      type: "multiple",
      options: [
        "dev — hier wird die nächste Version vorbereitet",
        "feature/* — hier werden neue Funktionen entwickelt",
        "main — hier liegen die fertigen, produktiven Releases",
        "release/* — hier wird der Release vorbereitet und getestet",
      ],
      correct: 2,
      explanation: "In Gitflow ist 'main' der produktive Branch mit fertigen Releases. 'dev' ist der Integrationsbranch.",
    },
    {
      question: "Was macht pessimistisches Locking?",
      type: "multiple",
      options: [
        "Erlaubt parallele Bearbeitung und löst Konflikte beim Merge",
        "Sperrt eine Datei exklusiv vor der Bearbeitung durch andere",
        "Erstellt automatisch einen Branch bei Konflikten",
        "Protokolliert alle Änderungen für spätere Konfliktlösung",
      ],
      correct: 1,
      explanation: "Pessimistisches Locking sperrt eine Datei exklusiv — andere können sie bearbeiten, bis die Sperre aufgehoben wird.",
    },
  ],
  "ihk-ux": [
    {
      question: "Was beschreibt User Experience (UX)?",
      type: "multiple",
      options: [
        "Nur die visuelle Gestaltung der Benutzeroberfläche",
        "Das gesamte Erlebnis eines Nutzers bei der Interaktion mit einem Produkt",
        "Die technische Implementierung der Frontend-Logik",
        "Die Auswahl der Farben und Schriftarten im Design",
      ],
      correct: 1,
      explanation: "UX beschreibt das gesamte Erlebnis — von der ersten Kontaktaufnahme bis zur langfristigen Nutzung.",
    },
    {
      question: "Was ist eine Persona?",
      type: "multiple",
      options: [
        "Ein echter Nutzer, der am Usability-Test teilnimmt",
        "Ein fiktives Nutzerprofil, das eine Zielgruppe repräsentiert",
        "Ein Entwickler, der die Software programmiert",
        "Ein Stakeholder, der das Projekt finanziert",
      ],
      correct: 1,
      explanation: "Eine Persona ist ein fiktiver Nutzer, der stellvertretend für eine Zielgruppe steht — basierend auf echten Daten.",
    },
    {
      question: "Wie lautet das Format einer User Story?",
      type: "multiple",
      options: [
        "Wenn [Bedingung] eintritt, dann soll [Aktion] ausgeführt werden",
        "Als [Rolle] möchte ich [Ziel], um [Nutzen] zu erreichen",
        "Das System muss [Funktion] unter [Bedingung] unterstützen",
        "Der Nutzer navigiert zu [Seite] und klickt auf [Element]",
      ],
      correct: 1,
      explanation: "User Stories: 'Als [Rolle] möchte ich [Ziel], um [Nutzen]'. Fokus auf den WARUM, nicht das WIE.",
    },
    {
      question: "Was sind die 5 Phasen des Design Sprints nach Google?",
      type: "multiple",
      options: [
        "Planen, Entwickeln, Testen, Launchen, Bewerben",
        "Understand, Diverge, Converge, Prototype, Test",
        "Research, Design, Code, Deploy, Monitor",
        "Idee, Plan, Umsetzung, Präsentation, Feedback",
      ],
      correct: 1,
      explanation: "5 Phasen: Understand (Problem verstehen), Diverge (Ideen sammeln), Converge (auswählen), Prototype (bauen), Testen (validieren).",
    },
    {
      question: "Was bedeutet 'Learnability' in der Usability-Evaluation?",
      type: "multiple",
      options: [
        "Wie gut sich der Nutzer an die Bedienung nach Pause erinnert",
        "Wie schnell ein neuer Nutzer die Grundfunktionen erlernt",
        "Wie sicher das System vor Fehlbedienung schützt",
        "Wie ansprechend das visuelle Design gestaltet ist",
      ],
      correct: 1,
      explanation: "Learnability = Erlernbarkeit. Memorability = Wiedererkennbarkeit. Safety = Fehlerschutz.",
    },
  ],
  "ihk-qualitaet": [
    {
      question: "Was besagt die ISO 9126?",
      type: "multiple",
      options: [
        "6 Qualitätsmerkmale für Software (Funktionalität, Zuverlässigkeit, Benutzbarkeit, Effizienz, Wartbarkeit, Portabilität)",
        "Ein 5-stufiges Reifegradmodell für Softwareentwicklungsteams",
        "Ein Standard für IT-Sicherheitsmanagement und Risikobewertung",
        "Ein Framework für agile Projektmanagement-Methoden",
      ],
      correct: 0,
      explanation: "ISO 9126 definiert 6 Qualitätsmerkmale. Nachfolger: ISO 25010 (erweitert auf 8 Merkmale).",
    },
    {
      question: "Was ist ein Singleton?",
      type: "multiple",
      options: [
        "Ein Creational Pattern, das nur eine einzige Instanz einer Klasse erlaubt",
        "Ein Structural Pattern, das Schnittstellen kompatibel macht",
        "Ein Behavioral Pattern, das Algorithmen austauschbar macht",
        "Ein Test-Pattern, das Abhängigkeiten simuliert",
      ],
      correct: 0,
      explanation: "Singleton = Creational Pattern mit genau einer Instanz. Beispiel: Logger, Datenbankverbindung.",
    },
    {
      question: "Was macht das Strategy-Pattern?",
      type: "multiple",
      options: [
        "Definiert eine Familie von Algorithmen und macht sie zur Laufzeit austauschbar",
        "Erstellt exakt eine Instanz einer Klasse und verwaltet den Zugriff",
        "Passt die Schnittstelle eines Objekts an eine erwartete Schnittstelle an",
        "Benachrichtigt alle Abhängigen automatisch bei Zustandsänderungen",
      ],
      correct: 0,
      explanation: "Strategy definiert eine Familie von Algorithmen, kapselt jeden einzelnen und macht sie austauschbar.",
    },
    {
      question: "Was ist der Unterschied zwischen Unit-Test und Integrationstest?",
      type: "multiple",
      options: [
        "Unit-Tests prüfen Komponenten isoliert, Integrationstests das Zusammenspiel mehrerer",
        "Unit-Tests sind langsamer als Integrationstests wegen des Isolationsaufwands",
        "Unit-Tests werden manuell ausgeführt, Integrationstests automatisch",
        "Unit-Tests prüfen nur die UI, Integrationstests die gesamte Architektur",
      ],
      correct: 0,
      explanation: "Unit = isoliert (eine Komponente). Integration = Zusammenspiel mehrerer Module. System-Test = gesamtes System.",
    },
    {
      question: "Was beschreibt die Schichtenarchitektur?",
      type: "multiple",
      options: [
        "Trennung in Präsentation, Geschäftslogik und Datenhaltung mit definierten Schnittstellen",
        "Unabhängige Services, die über Nachrichten miteinander kommunizieren",
        "Aufteilung in Model, View und Controller mit bidirektionaler Kommunikation",
        "Ein Testverfahren, das Schritt für Schritt durch den Code geht",
      ],
      correct: 0,
      explanation: "Schichtenarchitektur: Präsentation → Anwendung → Datenhaltung. Jede Schicht kennt nur die Schicht direkt darunter.",
    },
  ],
  "ihk-projektmanagement": [
    {
      question: "Was beschreibt das Magische Dreieck im Projektmanagement?",
      type: "multiple",
      options: [
        "Die drei Projektphasen: Planung, Durchführung, Abschluss",
        "Das Spannungsfeld zwischen Qualität, Budget und Zeit",
        "Die drei Stakeholder-Gruppen: Kunde, Team, Management",
        "Die drei Testverfahren: Unit, Integration, System",
      ],
      correct: 1,
      explanation: "Magisches Dreieck: Qualität, Budget, Zeit — ändert sich einer, beeinflusst es die anderen.",
    },
    {
      question: "Was bedeutet SMART bei der Zielformulierung?",
      type: "multiple",
      options: [
        "Schnell, Modern, Agil, Robust, Testbar",
        "Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert",
        "Strukturiert, Modular, Automatisiert, Reproduzierbar, Testbar",
        "Sicher, Minimal, Adaptiv, Redundant, Transparent",
      ],
      correct: 1,
      explanation: "SMART = Spezifisch, Messbar, Attraktiv/Akzeptiert, Realistisch, Terminiert.",
    },
    {
      question: "Wer erstellt das Lastenheft?",
      type: "multiple",
      options: [
        "Der Auftraggeber — es beschreibt WAS das System können soll",
        "Der Auftragnehmer — es beschreibt WIE das System gebaut wird",
        "Das Entwicklungsteam — es beschreibt die technische Architektur",
        "Der Scrum Master — es beschreibt die Sprint-Ziele",
      ],
      correct: 0,
      explanation: "Lastenheft = Auftraggeber (WAS). Pflichtenheft = Auftragnehmer (WIE).",
    },
    {
      question: "Was sind die 3 Rollen in Scrum?",
      type: "multiple",
      options: [
        "Manager, Entwickler und Tester mit hierarchischer Struktur",
        "Product Owner, Scrum Master und Development Team",
        "Projektleiter, Architekt und Administrator",
        "Kunde, Team und Stakeholder mit definierten Verantwortlichkeiten",
      ],
      correct: 1,
      explanation: "Scrum-Rollen: Product Owner (Was), Scrum Master (Prozess), Development Team (Umsetzung).",
    },
    {
      question: "Was misst die Earned Value Analyse (EVA)?",
      type: "multiple",
      options: [
        "Die Code-Qualität anhand von Metriken wie Cyclomatic Complexity",
        "Den Projektfortschritt im Vergleich zu Planung (Kosten und Termine)",
        "Die Zufriedenheit des Teams in regelmäßigen Retrospektiven",
        "Die Kundenzufriedenheit nach jedem abgeschlossenen Sprint",
      ],
      correct: 1,
      explanation: "EVA misst Projektfortschritt, Kostenentwicklung und Termintreue durch Vergleich von Plan- und Ist-Werten.",
    },
  ],
  "ihk-docker": [
    {
      question: "Was ist der Hauptunterschied zwischen Container und VM?",
      type: "multiple",
      options: [
        "Container teilen den OS-Kernel, VMs haben ihr eigenes vollständiges Betriebssystem",
        "Container sind langsamer als VMs wegen des gemeinsamen Kernel-Zugriffs",
        "Container unterstützen kein Netzwerk, VMs haben volle Netzwerkunterstützung",
        "Es gibt keinen Unterschied — beides virtualisiert Hardware vollständig",
      ],
      correct: 0,
      explanation: "Container teilen den Host-Kernel (leichtgewichtig). VMs virtualisieren Hardware mit eigenem OS (schwerer).",
    },
    {
      question: "Was macht die Dockerfile-Instruktion FROM?",
      type: "multiple",
      options: [
        "Definiert das Basis-Image, auf dem alle folgenden Schichten aufbauen",
        "Kopiert Dateien vom Host-System in den Container",
        "Führt Shell-Befehle während des Image-Builds aus",
        "Setzt den Startbefehl, der beim Container-Start ausgeführt wird",
      ],
      correct: 0,
      explanation: "FROM ist immer die erste Instruktion und definiert die Basis-Schicht (z.B. node:18, ubuntu:22.04).",
    },
    {
      question: "Was ist Docker Compose?",
      type: "multiple",
      options: [
        "Ein Tool zur Definition und Verwaltung von Multi-Container-Anwendungen via YAML",
        "Ein Betriebssystem für die Container-Virtualisierung",
        "Ein Cloud-Dienst für die automatische Container-Deployment-Pipeline",
        "Ein Monitoring-Tool zur Überwachung von Container-Ressourcen",
      ],
      correct: 0,
      explanation: "Docker Compose definiert Services, Netzwerke und Volumes in einer docker-compose.yml.",
    },
    {
      question: "Was ist ein Docker Volume?",
      type: "multiple",
      options: [
        "Persistenter Speicher, der Daten unabhängig vom Container-Lebenszyklus erhält",
        "Ein virtuelles Netzwerk für die Container-Kommunikation",
        "Ein Befehl in der Dockerfile-Syntax für Umgebungsvariablen",
        "Ein Tag-System zur Versionierung von Docker Images",
      ],
      correct: 0,
      explanation: "Volumes persistieren Daten außerhalb des Containers — Daten überleben Container-Neustarts und -Löschungen.",
    },
    {
      question: "Welche Kernfunktionen bietet Kubernetes?",
      type: "multiple",
      options: [
        "Nur die Verwaltung von Container-Images in einer Registry",
        "Automatische Skalierung, Self-Healing und Load-Balancing für Container",
        "Nur die Speicherung und Versionierung von Dockerfiles",
        "Nur die zentralisierte Sammlung und Auswertung von Container-Logs",
      ],
      correct: 1,
      explanation: "Kubernetes orchestriert Container: Skalierung, Self-Healing (Neustart bei Crash), Load-Balancing, Rolling Updates.",
    },
  ],
  "ihk-erw-prog": [
    {
      question: "Was besagt das Single Responsibility Principle (SRP)?",
      type: "multiple",
      options: [
        "Eine Klasse sollte nur eine einzige Verantwortung haben",
        "Eine Klasse darf maximal eine öffentliche Methode enthalten",
        "Jede Methode muss in einer eigenen Datei definiert werden",
        "Eine Klasse sollte nicht länger als 100 Zeilen sein",
      ],
      correct: 0,
      explanation: "SRP: Eine Klasse = eine Aufgabe/Verantwortung. Änderungsgrund sollte nur einer sein.",
    },
    {
      question: "Was ist der Hauptvorteil von Interfaces in der Programmierung?",
      type: "multiple",
      options: [
        "Sie beschleunigen die Laufzeit des Programms erheblich",
        "Sie ermöglichen Austauschbarkeit, Testbarkeit und eine klare Struktur",
        "Sie reduzieren den Speicherverbrauch durch gemeinsame Implementierung",
        "Sie erzwingen die Verwendung von Vererbung statt Komposition",
      ],
      correct: 1,
      explanation: "Interfaces: Austauschbarkeit (Dependency Injection), Testbarkeit (Mocks), klare Verträge zwischen Komponenten.",
    },
    {
      question: "Was ist ein Mock-Objekt im Software-Testing?",
      type: "multiple",
      options: [
        "Ein fehlerhaftes Objekt, das absichtlich Exceptions wirft",
        "Ein Test-Double, das echte Abhängigkeiten simuliert und kontrolliert",
        "Ein Design Pattern für die Erstellung von Objekten",
        "Ein Datenbank-Objekt mit vordefinierten Testdaten",
      ],
      correct: 1,
      explanation: "Mocks ersetzen echte Abhängigkeiten im Test — sie simulieren Verhalten und können Verifikationen durchführen.",
    },
    {
      question: "Was bedeutet das DRY-Prinzip?",
      type: "multiple",
      options: [
        "Don't Repeat Yourself — Wissen sollte an einer Stelle definiert sein",
        "Do Repeat Yourself — Wiederholung für bessere Lesbarkeit ist erlaubt",
        "Design Right Yesterday — Technische Schulden sofort begleichen",
        "Debug Release Yearly — Nur einmal pro Jahr releasen",
      ],
      correct: 0,
      explanation: "DRY = Don't Repeat Yourself. Jedes Wissen sollte eine einzige, eindeutige Darstellung im System haben.",
    },
    {
      question: "Was ist der Unterschied zwischen Coupling und Cohesion?",
      type: "multiple",
      options: [
        "Coupling = Abhängigkeit zwischen Klassen (niedrig = gut), Cohesion = Zusammengehörigkeit innerhalb einer Klasse (hoch = gut)",
        "Coupling = Code-Länge einer Methode, Cohesion = Anzahl der Variablen",
        "Coupling = Anzahl der Tests, Cohesion = Testabdeckung in Prozent",
        "Beide Begriffe beschreiben dasselbe Konzept aus verschiedenen Perspektiven",
      ],
      correct: 0,
      explanation: "Low Coupling (wenig Abhängigkeit) + High Cohesion (starke Zusammengehörigkeit) = gutes OO-Design.",
    },
  ],
};

// Combine with math quizzes
const allQuizData: Record<string, QuizQuestion[]> = {
  ...quizData,
  ...mathQuizzes,
  ...complexQuizzes,
  ...grundrechnenQuizzes,
  ...ganzeZahlenQuizzes,
  ...quadratischeGleichungenQuizzes,
  ...logarithmusQuizzes,
  ...exponentialQuizzes,
  ...wachstumsprozesseQuizzes,
  ...fourierQuizzes,
};

// Component to render questions with math
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Shuffle answer options for multiple-choice questions and update the correct index */
function shuffleQuestionOptions(q: QuizQuestion): QuizQuestion {
  if (q.type !== "multiple" || !q.options) return q;
  const indexed = q.options.map((opt, i) => ({ opt, i }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  const newCorrect = indexed.findIndex(x => x.i === q.correct);
  return { ...q, options: indexed.map(x => x.opt), correct: newCorrect };
}

function QuestionWithMath({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$")) {
          return <MathBlock key={i} math={part.slice(1, -1)} display={false} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function Quiz({ moduleSlug, onComplete }: QuizProps) {
  const { completeLesson } = useAuth();
  const rawQuestions = allQuizData[moduleSlug] || [];
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [inputAnswer, setInputAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const hasAwardedXP = useRef(false);

  useEffect(() => {
    setQuestions(shuffleArray(rawQuestions).map(shuffleQuestionOptions));
  }, [moduleSlug]);

  if (questions.length === 0) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <p className="text-slate-400">Noch kein Quiz für dieses Modul verfügbar.</p>
      </div>
    );
  }

  const question = questions[currentQuestion];

  const checkAnswer = () => {
    let correct = false;
    
    if (question.type === "multiple") {
      correct = selectedAnswer === question.correct;
    } else {
      // Input: normalize and compare
      const userAnswer = inputAnswer.trim().toLowerCase().replace(/\s+/g, "");
      const correctAnswer = String(question.correct).toLowerCase().replace(/\s+/g, "");
      correct = userAnswer === correctAnswer || 
                userAnswer === correctAnswer.replace("*", "·") ||
                userAnswer === correctAnswer.replace("·", "*");
    }
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setInputAnswer("");
      setShowResult(false);
      setIsCorrect(false);
    } else {
      setFinished(true);
      const finalScore = score + (isCorrect ? 1 : 0);
      if (finalScore >= questions.length * 0.8) {
        if (!hasAwardedXP.current) {
          hasAwardedXP.current = true;
          completeLesson(moduleSlug, "quiz", finalScore);
          onComplete();
        }
      }
    }
  };

  const restart = () => {
    setQuestions(shuffleArray(rawQuestions).map(shuffleQuestionOptions));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setInputAnswer("");
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setIsCorrect(false);
  };

  // Finished screen
  if (finished) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    const passed = percentage >= 80;

    return (
      <div className="glass rounded-2xl overflow-hidden animate-slide-up">
        {/* Header-Balken */}
        <div className={`px-6 py-8 text-center ${passed ? "bg-gradient-to-b from-emerald-500/20 to-transparent" : "bg-gradient-to-b from-amber-500/20 to-transparent"}`}>
          <div className="text-5xl mb-4">
            {passed ? "🎉" : "💪"}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {passed ? "Quiz bestanden!" : "Noch nicht bestanden"}
          </h2>
          <p className="text-slate-400">
            {passed
              ? "Super, du hast das Quiz gemeistert."
              : "Du brauchst 80% zum Bestehen. Nicht aufgeben!"}
          </p>
        </div>

        {/* Score-Karte */}
        <div className="px-6 pb-6">
          <div className={`rounded-xl p-6 text-center border ${passed ? "bg-emerald-500/10 border-emerald-500/30" : "bg-amber-500/10 border-amber-500/30"}`}>
            <div className="text-4xl font-bold text-white mb-3">{percentage}%</div>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-green-400">{finalScore} Richtig</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400">{questions.length - finalScore} Falsch</span>
              </div>
            </div>

            {/* Fortschrittsbalken */}
            <div className="mt-4 h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${passed ? "bg-emerald-500" : "bg-amber-500"}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Aktionen */}
          <div className="flex justify-center mt-4">
            <button
              onClick={restart}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Quiz wiederholen
            </button>
          </div>

          {passed && (
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-300 text-center">
                In der Seitenleiste warten jetzt die Übungen auf dich — vom leichten Einstieg bis zur Abschlussprüfung.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="glass rounded-xl p-6 animate-slide-up">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-slate-400">
          Frage {currentQuestion + 1} von {questions.length}
        </span>
        <span className="text-sm text-slate-400">
          {score} richtig
        </span>
      </div>

      <div className="w-full h-2 bg-slate-700 rounded-full mb-6">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Type Badge */}
      <div className="mb-4">
        <span className={`text-xs px-2 py-1 rounded ${
          question.type === "input" 
            ? "bg-purple-500/20 text-purple-400" 
            : "bg-blue-500/20 text-blue-400"
        }`}>
          {question.type === "input" ? "✍️ Texteingabe" : "📋 Multiple Choice"}
        </span>
      </div>

      {/* Question */}
      <div className="text-xl font-semibold mb-6">
        {question.question.includes("$") ? (
          <QuestionWithMath text={question.question} />
        ) : (
          question.question
        )}
      </div>

      {/* Multiple Choice Options */}
      {question.type === "multiple" && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const showCorrect = showResult && index === question.correct;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  showCorrect
                    ? "bg-green-500/20 border-green-500"
                    : showWrong
                    ? "bg-red-500/20 border-red-500"
                    : isSelected
                    ? "bg-blue-500/20 border-blue-500"
                    : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    showCorrect
                      ? "bg-green-500 text-white"
                      : showWrong
                      ? "bg-red-500 text-white"
                      : isSelected
                      ? "bg-blue-500 text-white"
                      : "bg-slate-700"
                  }`}>
                    {showCorrect ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : showWrong ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span>
                    {option.includes("$") ? (
                      <QuestionWithMath text={option} />
                    ) : (
                      option
                    )}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Input Answer */}
      {question.type === "input" && (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !showResult && checkAnswer()}
              disabled={showResult}
              placeholder="Deine Antwort..."
              className={`w-full p-4 bg-slate-800/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                showResult && isCorrect
                  ? "border-green-500 focus:ring-green-500/50"
                  : showResult && !isCorrect
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-slate-700 focus:ring-blue-500/50"
              }`}
            />
            {showResult && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
              </div>
            )}
          </div>
          
          {question.hint && !showResult && (
            <p className="text-sm text-slate-500 italic">💡 Tipp: {question.hint}</p>
          )}
          
          {!showResult && !isCorrect && (
            <p className="text-sm text-slate-500">Enter drücken zum Prüfen</p>
          )}
        </div>
      )}

      {/* Explanation */}
      {showResult && (
        <div className={`mt-6 p-4 rounded-lg border animate-fade-in ${
          isCorrect 
            ? "bg-green-500/10 border-green-500/30" 
            : "bg-red-500/10 border-red-500/30"
        }`}>
          <p className={`font-medium mb-1 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
            {isCorrect ? "✅ Richtig!" : "❌ Falsch!"}
          </p>
          <div className="text-slate-300"><InlineText text={question.explanation} /></div>
          {!isCorrect && question.type === "input" && (
            <p className="text-slate-400 mt-2">
              Richtige Antwort: <span className="text-green-400 font-mono">{typeof question.correct === "string" && question.correct.includes("$") ? <InlineText text={question.correct} /> : String(question.correct)}</span>
            </p>
          )}
        </div>
      )}

      {/* Submit / Next Button */}
      {!showResult ? (
        <button
          onClick={checkAnswer}
          disabled={question.type === "multiple" ? selectedAnswer === null : !inputAnswer.trim()}
          className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Antwort prüfen
        </button>
      ) : (
        <button
          onClick={nextQuestion}
          className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
        >
          {currentQuestion < questions.length - 1 ? "Nächste Frage" : "Quiz beenden"}
        </button>
      )}
    </div>
  );
}
