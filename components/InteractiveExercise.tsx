"use client";

import { useState, useEffect, useRef } from "react";
import { Exercise } from "@/lib/mathExercises";
import { MathBlock } from "./MathBlock";
import { CheckCircle2, XCircle, Lightbulb, RotateCcw, ChevronDown, ChevronUp, Star, Plus } from "lucide-react";

interface Props {
  exercises: Exercise[];
  lessonTitle: string;
}

export function InteractiveExercise({ exercises, lessonTitle }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [showAllExercises, setShowAllExercises] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sortedExercises = [...exercises].sort((a, b) => a.difficulty - b.difficulty);
  const current = sortedExercises[currentIndex];
  const hasMoreExercises = sortedExercises.length > 3;

  useEffect(() => {
    setUserAnswer("");
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(false);
    setShowHint(false);
    setShowSolution(false);
  }, [currentIndex]);

  const checkAnswer = () => {
    if (!current) return;

    let correct = false;

    if (current.type === "multiple") {
      correct = selectedOption === current.correctOption;
    } else if (current.type === "input" && current.expectedAnswer) {
      const normalized = userAnswer.trim().toLowerCase().replace(/\s+/g, "");
      const expected = current.expectedAnswer.toLowerCase().replace(/\s+/g, "");

      if (current.tolerance) {
        const userNum = parseFloat(normalized);
        const expectedNum = parseFloat(expected);
        if (!isNaN(userNum) && !isNaN(expectedNum)) {
          correct = Math.abs(userNum - expectedNum) <= current.tolerance;
        }
      } else {
        correct = normalized === expected;
      }
    }

    setIsCorrect(correct);
    setShowResult(true);
    if (correct) setCompletedCount((c) => c + 1);
  };

  const nextExercise = () => {
    if (currentIndex < sortedExercises.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const prevExercise = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const resetExercise = () => {
    setUserAnswer("");
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(false);
    setShowHint(false);
    setShowSolution(false);
    inputRef.current?.focus();
  };

  const getDifficultyStars = (level: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < level ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}`}
      />
    ));
  };

  if (exercises.length === 0) return null;

  return (
    <div className="mt-8 border-t border-slate-700/50 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          🎯 Aufgaben
          <span className="text-sm font-normal text-slate-400">
            ({completedCount}/{sortedExercises.length} gelöst)
          </span>
        </h3>
        {hasMoreExercises && (
          <button
            onClick={() => setShowAllExercises(!showAllExercises)}
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            {showAllExercises ? "Weniger" : "Alle anzeigen"}
            {showAllExercises ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Exercise Card */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">
              Aufgabe {currentIndex + 1} von {sortedExercises.length}
            </span>
            <div className="flex">{getDifficultyStars(current.difficulty)}</div>
          </div>
          <button
            onClick={resetExercise}
            className="text-slate-400 hover:text-white p-1"
            title="Zurücksetzen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-1.5 mb-4">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / sortedExercises.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="mb-5">
          <div className="text-slate-200 leading-relaxed">
            <MathBlock math={current.question} display={true} />
          </div>
          {current.format && (
            <p className="text-sm text-blue-400 mt-2 flex items-center gap-1">
              📝 <span>{current.format}</span>
            </p>
          )}
        </div>

        {/* Answer Input */}
        {!showResult && (
          <div className="mb-4">
            {current.type === "input" ? (
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                  placeholder="Deine Antwort..."
                  className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  autoFocus
                />
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Prüfen
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {current.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedOption(option.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                      selectedOption === option.value
                        ? "border-blue-500 bg-blue-500/20 text-white"
                        : "border-slate-600 bg-slate-900/50 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    <span className="font-medium mr-2">{option.label}</span>
                  </button>
                ))}
                <button
                  onClick={checkAnswer}
                  disabled={!selectedOption}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-3 rounded-lg font-medium transition-colors mt-3"
                >
                  Prüfen
                </button>
              </div>
            )}
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className={`rounded-lg p-4 mb-4 ${isCorrect ? "bg-green-500/20 border border-green-500/30" : "bg-red-500/20 border border-red-500/30"}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">Richtig! 🎉</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-medium">Leider falsch</span>
                </>
              )}
            </div>
            {!isCorrect && current.expectedAnswer && (
              <p className="text-slate-300 text-sm">
                Richtige Antwort: <strong className="text-white">{current.expectedAnswer}</strong>
              </p>
            )}
          </div>
        )}

        {/* Hint & Solution */}
        <div className="flex flex-wrap gap-2 mb-4">
          {current.hint && !showResult && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 text-sm"
            >
              <Lightbulb className="w-4 h-4" />
              {showHint ? "Tipp ausblenden" : "Tipp"}
            </button>
          )}
          {(showResult || currentIndex === sortedExercises.length - 1) && (
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
            >
              {showSolution ? "Lösung ausblenden" : "Lösung anzeigen"}
            </button>
          )}
        </div>

        {showHint && current.hint && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
            <p className="text-yellow-200 text-sm">💡 {current.hint}</p>
          </div>
        )}

        {showSolution && (
          <div className="bg-slate-900/50 border border-slate-600/50 rounded-lg p-4 mb-4">
            <p className="text-sm text-slate-400 mb-2">Lösung:</p>
            <div className="text-slate-200">
              <MathBlock math={current.solution} display={true} />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={prevExercise}
            disabled={currentIndex === 0}
            className="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm"
          >
            ← Zurück
          </button>
          {currentIndex < sortedExercises.length - 1 && (
            <button
              onClick={nextExercise}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Nächste Aufgabe →
            </button>
          )}
        </div>
      </div>

      {/* All Exercises List (collapsible) */}
      {showAllExercises && hasMoreExercises && (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-slate-400 mb-2">Weitere Aufgaben:</p>
          {sortedExercises.slice(3).map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => {
                setCurrentIndex(3 + i);
                setShowAllExercises(false);
              }}
              className="w-full text-left bg-slate-800/30 hover:bg-slate-800/50 rounded-lg p-3 border border-slate-700/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="flex">{getDifficultyStars(ex.difficulty)}</div>
                <span className="text-slate-300 text-sm truncate">
                  <MathBlock math={ex.question.replace(/\$[^$]+\$/g, "[Formel]").slice(0, 60)} display={false} />
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
