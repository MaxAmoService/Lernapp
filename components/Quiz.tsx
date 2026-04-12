"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { mathQuizzes } from "@/lib/mathData";
import { MathBlock } from "./MathBlock";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Send } from "lucide-react";

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
};

// Combine with math quizzes
const allQuizData: Record<string, QuizQuestion[]> = {
  ...quizData,
  ...mathQuizzes,
};

// Component to render questions with math
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
  const questions = allQuizData[moduleSlug] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [inputAnswer, setInputAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

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
      <div className="glass rounded-xl p-8 text-center animate-slide-up">
        <div className="mb-6">
          {passed ? (
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
          ) : (
            <span className="text-6xl">💪</span>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {passed ? "Glückwunsch!" : "Weitere Übung nötig!"}
        </h2>
        <p className="text-slate-400 mb-6">
          Du hast {finalScore} von {questions.length} Fragen richtig beantwortet ({percentage}%).
        </p>

        <div className="w-full max-w-xs mx-auto mb-6">
          <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                passed ? "bg-green-500" : "bg-orange-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={restart}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Wiederholen
          </button>
          {passed && (
            <button
              onClick={onComplete}
              className="px-6 py-2.5 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors"
            >
              Modul abschließen
            </button>
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
          <p className="text-slate-300">{question.explanation}</p>
          {!isCorrect && question.type === "input" && (
            <p className="text-slate-400 mt-2">
              Richtige Antwort: <span className="text-green-400 font-mono">{question.correct}</span>
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
