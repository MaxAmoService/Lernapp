"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { mathQuizzes } from "@/lib/mathData";
import { complexQuizzes } from "@/lib/complexData";
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
      options: ["Zentrale VV benötigt keinen Server", "Dezentrale VV gibt jedem eine vollständige Kopie", "Zentrale VV kann keine Branches", "Dezentrale VV funktioniert nur mit Git"],
      correct: 1,
      explanation: "Bei dezentraler VV hat jeder Entwickler eine vollständige Kopie inkl. Historie.",
    },
    {
      question: "Was macht 'git fetch'?",
      type: "multiple",
      options: ["Lädt herunter und merged", "Lädt nur herunter", "Erstellt einen Branch", "Löscht remote Branches"],
      correct: 1,
      explanation: "git fetch aktualisiert nur den lokalen Stand des Remote-Repositorys, ohne zu mergen.",
    },
    {
      question: "Was bedeutet Semantic Versioning 2.1.0?",
      type: "multiple",
      options: ["MAJOR 2, MINOR 1, PATCH 0", "MAJOR 2, MINOR 0, PATCH 1", "MAJOR 1, MINOR 2, PATCH 0", "MAJOR 0, MINOR 1, PATCH 2"],
      correct: 0,
      explanation: "2.1.0 = Major 2, Minor 1 (neues Feature), Patch 0.",
    },
    {
      question: "Welcher Branch ist in Gitflow für die produktive Version zuständig?",
      type: "multiple",
      options: ["dev", "feature/*", "main", "release/*"],
      correct: 2,
      explanation: "In Gitflow ist 'main' der produktive Branch mit fertigen Releases.",
    },
    {
      question: "Was macht pessimistisches Locking?",
      type: "multiple",
      options: ["Erlaubt parallele Bearbeitung", "Sperrt eine Datei vor Bearbeitung", "Löst Konflikte automatisch", "Erstellt Branches"],
      correct: 1,
      explanation: "Pessimistisches Locking sperrt eine Datei vor der Bearbeitung.",
    },
  ],
  "ihk-ux": [
    {
      question: "Was beschreibt User Experience (UX)?",
      type: "multiple",
      options: ["Nur das visuelle Design", "Das gesamte Erlebnis eines Nutzers", "Die technische Implementierung", "Die Programmiersprache"],
      correct: 1,
      explanation: "UX beschreibt das gesamte Erlebnis — nicht nur UI.",
    },
    {
      question: "Was ist eine Persona?",
      type: "multiple",
      options: ["Ein echter Nutzer", "Ein fiktiver Nutzer für eine Zielgruppe", "Ein Programmierer", "Ein Stakeholder"],
      correct: 1,
      explanation: "Eine Persona ist ein fiktiver Nutzer, repräsentativ für eine Zielgruppe.",
    },
    {
      question: "Wie lautet das Format einer User Story?",
      type: "multiple",
      options: ["Wenn [Bedingung], dann [Aktion]", "Als [Rolle] möchte ich [Ziel], um [Nutzen]", "Das System soll [Funktion]", "Der Nutzer klickt auf [Element]"],
      correct: 1,
      explanation: "User Stories: 'Als [Rolle] möchte ich [Ziel], um [Nutzen]'.",
    },
    {
      question: "Was sind die 5 Phasen des Design Sprints?",
      type: "multiple",
      options: ["Planen, Entwickeln, Testen, Launchen, Bewerben", "Understand, Diverge, Converge, Prototype, Test", "Research, Design, Code, Deploy, Monitor", "Idee, Plan, Umsetzung, Präsentation, Feedback"],
      correct: 1,
      explanation: "5 Phasen: Understand, Diverge, Converge, Prototype, Test.",
    },
    {
      question: "Was bedeutet 'Learnability' in der Usability-Evaluation?",
      type: "multiple",
      options: ["Wie gut man sich erinnert", "Wie einfach das System zu erlernen ist", "Wie sicher das System ist", "Wie schön das Design ist"],
      correct: 1,
      explanation: "Learnability = Erlernbarkeit.",
    },
  ],
  "ihk-qualitaet": [
    {
      question: "Was besagt die ISO 9126?",
      type: "multiple",
      options: ["6 Qualitätsmerkmale für Software", "Ein Projektmanagement-Modell", "Ein Testverfahren", "Ein Design Pattern"],
      correct: 0,
      explanation: "ISO 9126: Funktionalität, Zuverlässigkeit, Benutzbarkeit, Effizienz, Wartbarkeit, Portabilität.",
    },
    {
      question: "Was ist ein Singleton?",
      type: "multiple",
      options: ["Creational Pattern mit einer Instanz", "Structural Pattern für Adapter", "Behavioral Pattern für Strategien", "Ein Testverfahren"],
      correct: 0,
      explanation: "Singleton = Creational Pattern mit genau einer Instanz.",
    },
    {
      question: "Was macht das Strategy-Pattern?",
      type: "multiple",
      options: ["Definiert austauschbare Algorithmen", "Erstellt eine Instanz", "Passt Schnittstellen an", "Benachrichtigt bei Änderungen"],
      correct: 0,
      explanation: "Strategy definiert eine Familie von Algorithmen und macht sie austauschbar.",
    },
    {
      question: "Was ist der Unterschied zwischen Unit-Test und Integrationstest?",
      type: "multiple",
      options: ["Unit = isoliert, Integration = Zusammenspiel", "Unit = langsam, Integration = schnell", "Unit = manuell, Integration = automatisch", "Kein Unterschied"],
      correct: 0,
      explanation: "Unit = isoliert, Integration = Zusammenspiel mehrerer Module.",
    },
    {
      question: "Was beschreibt die Schichtenarchitektur?",
      type: "multiple",
      options: ["Trennung in Präsentation, Anwendung, Datenhaltung", "Unabhängige Services", "Model, View, Controller", "Ein Testverfahren"],
      correct: 0,
      explanation: "Schichtenarchitektur: Präsentation → Anwendung → Datenhaltung.",
    },
  ],
  "ihk-projektmanagement": [
    {
      question: "Was beschreibt das Magische Dreieck?",
      type: "multiple",
      options: ["Qualität, Budget und Zeit", "Drei Projektphasen", "Drei Stakeholder-Gruppen", "Drei Testverfahren"],
      correct: 0,
      explanation: "Magisches Dreieck: Qualität, Budget, Zeit im Spannungsfeld.",
    },
    {
      question: "Was bedeutet SMART bei Zielen?",
      type: "multiple",
      options: ["Spezifisch, Messbar, Anspruchsvoll, Realistisch, Terminiert", "Schnell, Modern, Agil, Robust, Testbar", "Strukturiert, Modular, Automatisiert", "Sicher, Minimal, Adaptiv"],
      correct: 0,
      explanation: "SMART = Spezifisch, Messbar, Anspruchsvoll, Realistisch, Terminiert.",
    },
    {
      question: "Wer schreibt das Lastenheft?",
      type: "multiple",
      options: ["Der Auftraggeber", "Der Auftragnehmer", "Das Entwicklungsteam", "Der Scrum Master"],
      correct: 0,
      explanation: "Lastenheft = Auftraggeber (WAS). Pflichtenheft = Auftragnehmer (WIE).",
    },
    {
      question: "Was sind die 3 Scrum-Rollen?",
      type: "multiple",
      options: ["Product Owner, Scrum Master, Team", "Manager, Entwickler, Tester", "Chef, Team, Kunde", "Architekt, Developer, Admin"],
      correct: 0,
      explanation: "Scrum-Rollen: Product Owner, Scrum Master, Cross-functional Team.",
    },
    {
      question: "Was misst die Earned Value Analyse?",
      type: "multiple",
      options: ["Projektfortschritt im Vergleich zum Plan", "Code-Qualität", "Teamzufriedenheit", "Kundenzufriedenheit"],
      correct: 0,
      explanation: "EVA misst Projektfortschritt, Kostenentwicklung und Termintreue.",
    },
  ],
  "ihk-docker": [
    {
      question: "Was ist der Hauptunterschied zwischen Container und VM?",
      type: "multiple",
      options: ["Container teilt das OS, VM hat eigenes OS", "Container ist langsamer", "Container kann kein Netzwerk", "Kein Unterschied"],
      correct: 0,
      explanation: "Container teilen den OS-Kernel, VMs haben eigenes OS.",
    },
    {
      question: "Was macht die Dockerfile-Instruktion FROM?",
      type: "multiple",
      options: ["Definiert das Basis-Image", "Kopiert Dateien", "Führt Befehle aus", "Setzt den Startbefehl"],
      correct: 0,
      explanation: "FROM definiert das Basis-Image.",
    },
    {
      question: "Was ist Docker Compose?",
      type: "multiple",
      options: ["Tool für Multi-Container mit YAML", "Ein Betriebssystem", "Ein Cloud-Dienst", "Ein Monitoring-Tool"],
      correct: 0,
      explanation: "Docker Compose = Multi-Container-Anwendungen mit YAML.",
    },
    {
      question: "Was ist ein Volume?",
      type: "multiple",
      options: ["Persistenter Speicher außerhalb des Containers", "Ein Netzwerk", "Ein Dockerfile-Befehl", "Ein Image-Tag"],
      correct: 0,
      explanation: "Volumes speichern Daten außerhalb des Containers.",
    },
    {
      question: "Was kann Kubernetes?",
      type: "multiple",
      options: ["Skalierung, Self-Healing, Load-Balancing", "Nur Container bauen", "Nur Images speichern", "Nur Logs anzeigen"],
      correct: 0,
      explanation: "Kubernetes: automatische Skalierung, Self-Healing, Load-Balancing.",
    },
  ],
  "ihk-erw-prog": [
    {
      question: "Was besagt das Single Responsibility Principle?",
      type: "multiple",
      options: ["Eine Klasse = eine Aufgabe", "Eine Klasse = viele Aufgaben", "Keine Methoden", "Maximal 10 Zeilen"],
      correct: 0,
      explanation: "SRP: Eine Klasse sollte nur eine Aufgabe haben.",
    },
    {
      question: "Was ist der Vorteil von Interfaces?",
      type: "multiple",
      options: ["Austauschbarkeit, Testbarkeit, Struktur", "Schnellerer Code", "Weniger Speicher", "Schönere UI"],
      correct: 0,
      explanation: "Interfaces: Austauschbarkeit, Testbarkeit (Mocks), klare Struktur.",
    },
    {
      question: "Was ist ein Mock-Objekt?",
      type: "multiple",
      options: ["Test-Double für echte Abhängigkeiten", "Fehlerhafter Code", "Design Pattern", "Datenbank"],
      correct: 0,
      explanation: "Mocks ersetzen echte Abhängigkeiten im Test.",
    },
    {
      question: "Was bedeutet DRY?",
      type: "multiple",
      options: ["Don't Repeat Yourself", "Do Repeat Yourself", "Design Right Yesterday", "Debug Release Yearly"],
      correct: 0,
      explanation: "DRY = Don't Repeat Yourself.",
    },
    {
      question: "Was ist der Unterschied zwischen Coupling und Cohesion?",
      type: "multiple",
      options: ["Coupling = Abhängigkeit, Cohesion = Zusammengehörigkeit", "Coupling = Länge, Cohesion = Farbe", "Coupling = Tests, Cohesion = Performance", "Kein Unterschied"],
      correct: 0,
      explanation: "Coupling = Abhängigkeit (niedrig = gut). Cohesion = Zusammengehörigkeit (hoch = gut).",
    },
  ],
};

// Combine with math quizzes
const allQuizData: Record<string, QuizQuestion[]> = {
  ...quizData,
  ...mathQuizzes,
  ...complexQuizzes,
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

  useEffect(() => {
    setQuestions(shuffleArray(rawQuestions));
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
        completeLesson(moduleSlug, "quiz", finalScore);
        onComplete();
      }
    }
  };

  const restart = () => {
    setQuestions(shuffleArray(rawQuestions));
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
