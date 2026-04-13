"use client";

import { useState, useEffect } from "react";
import { Exercise } from "@/lib/mathExercises";
import { MathBlock } from "./MathBlock";
import { InlineText } from "./InlineMath";
import { CheckCircle2, XCircle, Lightbulb, ChevronRight, RotateCcw, Trophy, Target, Star, HelpCircle } from "lucide-react";

interface Props {
  exercises: Exercise[];
  moduleTitle: string;
}

export function InteractiveExercise({ exercises, moduleTitle }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [completed, setCompleted] = useState(false);
  const [showAllExercises, setShowAllExercises] = useState(false);

  const current = exercises[currentIndex];
  const total = exercises.length;
  const progress = ((currentIndex + 1) / total) * 100;

  // Reset bei Aufgabenwechsel
  useEffect(() => {
    setUserAnswer("");
    setSelectedOption(null);
    setShowResult(false);
    setShowHint(false);
    setShowSolution(false);
  }, [currentIndex]);

  const checkAnswer = () => {
    let correct = false;

    if (current.type === "multiple" && current.correctOption) {
      correct = selectedOption === current.correctOption;
    } else if (current.type === "input" && current.expectedAnswer) {
      const normalizedUser = userAnswer.trim().toLowerCase().replace(/\s+/g, "");
      const normalizedExpected = current.expectedAnswer.toLowerCase().replace(/\s+/g, "");
      
      if (current.tolerance) {
        const userNum = parseFloat(normalizedUser);
        const expectedNum = parseFloat(normalizedExpected);
        if (!isNaN(userNum) && !isNaN(expectedNum)) {
          correct = Math.abs(userNum - expectedNum) <= current.tolerance;
        }
      } else {
        correct = normalizedUser === normalizedExpected;
      }
    }

    setIsCorrect(correct);
    setShowResult(true);
    setStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      wrong: prev.wrong + (correct ? 0 : 1),
    }));
  };

  const nextExercise = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetExercise = () => {
    setUserAnswer("");
    setSelectedOption(null);
    setShowResult(false);
    setShowHint(false);
    setShowSolution(false);
  };

  const restartAll = () => {
    setCurrentIndex(0);
    setStats({ correct: 0, wrong: 0 });
    setCompleted(false);
    resetExercise();
  };

  const getScorePercentage = () => Math.round((stats.correct / total) * 100);
  const getScoreEmoji = () => {
    const pct = getScorePercentage();
    if (pct >= 90) return "🏆";
    if (pct >= 70) return "🎉";
    if (pct >= 50) return "👍";
    return "💪";
  };

  const diffLabel = {
    1: { text: "Leicht", bg: "bg-green-500/20", color: "text-green-400" },
    2: { text: "Mittel", bg: "bg-yellow-500/20", color: "text-yellow-400" },
    3: { text: "Schwer", bg: "bg-red-500/20", color: "text-red-400" },
  }[current?.difficulty || 1];

  if (exercises.length === 0) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <Target className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Keine Aufgaben verfügbar</h3>
        <p className="text-slate-400">Für dieses Modul gibt es noch keine interaktiven Aufgaben.</p>
      </div>
    );
  }

  // Abschluss-Bildschirm
  if (completed) {
    return (
      <div className="glass rounded-2xl p-8 text-center max-w-lg mx-auto">
        <div className="text-6xl mb-4">{getScoreEmoji()}</div>
        <h2 className="text-2xl font-bold text-white mb-2">Aufgaben abgeschlossen!</h2>
        <p className="text-slate-400 mb-6">{moduleTitle}</p>
        
        <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
          <div className="text-5xl font-bold text-white mb-2">{getScorePercentage()}%</div>
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-green-400">{stats.correct} Richtig</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400">{stats.wrong} Falsch</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={restartAll}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Nochmal versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-400" />
            Aufgaben
          </h2>
          <div className="text-sm text-slate-400">
            {currentIndex + 1} / {total}
          </div>
        </div>

        {/* Fortschrittsbalken */}
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Statistiken */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-green-400">{stats.correct}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-400">{stats.wrong}</span>
          </div>
        </div>
      </div>

      {/* Aufgaben-Karte */}
      <div className="glass rounded-2xl overflow-hidden">
        {/* Karten-Header */}
        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${diffLabel.bg} ${diffLabel.color}`}>
            {"★".repeat(current.difficulty)} {diffLabel.text}
          </div>
          <button
            onClick={resetExercise}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Zurücksetzen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Frage */}
        <div className="p-6">
          <div className="text-white text-lg md:text-xl mb-6 leading-relaxed">
            <InlineText text={current.question} />
          </div>

          {/* Hinweis */}
          {current.hint && (
            <div className="mb-6">
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
                >
                  <Lightbulb className="w-4 h-4" />
                  Hinweis anzeigen
                </button>
              ) : (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-yellow-200 text-base">
                      <InlineText text={current.hint} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Eingabefeld */}
          {current.type === "input" && !showResult && (
            <div className="space-y-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                placeholder={current.format || "Deine Antwort..."}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                autoFocus
              />
              {current.format && (
                <p className="text-xs text-slate-500">Format: {current.format}</p>
              )}
            </div>
          )}

          {/* Multiple Choice */}
          {current.type === "multiple" && !showResult && (
            <div className="space-y-3">
              {current.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(option.value)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedOption === option.value
                      ? "border-blue-500 bg-blue-500/20"
                      : "border-slate-600 hover:border-slate-500 bg-slate-800/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === option.value ? "border-blue-500" : "border-slate-500"
                    }`}>
                      {selectedOption === option.value && (
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                      )}
                    </div>
                    <span className="text-white text-base">
                      <InlineText text={option.label} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Ergebnis */}
          {showResult && (
            <div className={`rounded-xl p-5 mb-4 ${
              isCorrect ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"
            }`}>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-semibold mb-2 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {isCorrect ? "Richtig! ✨" : "Leider falsch"}
                  </p>
                  {!isCorrect && (
                    <div className="text-slate-300 text-sm">
                      <p className="mb-1">
                        <span className="text-slate-500">Richtige Antwort:</span>{" "}
                        <span className="text-white font-medium">
                          <InlineText text={current.type === "multiple" 
                            ? current.options?.find(o => o.value === current.correctOption)?.label || ""
                            : current.expectedAnswer || ""} />
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Lösung & Erklärung */}
          {showResult && !showSolution && (
            <button
              onClick={() => setShowSolution(true)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              <HelpCircle className="w-4 h-4" />
              Lösung & Erklärung anzeigen
            </button>
          )}

          {showSolution && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 mt-4">
              <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Lösung
              </h4>
              <div className="text-slate-300 text-base">
                <InlineText text={current.solution} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-800/30">
          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={current.type === "input" ? !userAnswer : !selectedOption}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium transition-colors"
            >
              Antwort prüfen
            </button>
          ) : (
            <button
              onClick={nextExercise}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {currentIndex < total - 1 ? (
                <>
                  Nächste Aufgabe
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Ergebnis anzeigen
                  <Trophy className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
