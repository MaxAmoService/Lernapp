"use client";

import React, { useState, useCallback } from "react";

// PAP-Element Typen
type PAPType = "start" | "end" | "operation" | "decision" | "io";

interface PAPElement {
  id: string;
  type: PAPType;
  label: string;
  x: number;
  y: number;
  jaText?: string;
  neinText?: string;
}

interface PAPConnection {
  from: string;
  to: string;
  label?: string;
  color?: string;
}

// Vordefiniertes Beispiel: Kaffeemaschine
const kaffeeElements: PAPElement[] = [
  { id: "start", type: "start", label: "Start", x: 200, y: 30 },
  { id: "io1", type: "io", label: "Geld einwerfen", x: 200, y: 110 },
  { id: "io2", type: "io", label: "Betrag eingeben", x: 200, y: 190 },
  { id: "dec1", type: "decision", label: "Betrag >= Preis?", x: 200, y: 280, jaText: "Ja", neinText: "Nein" },
  { id: "op1", type: "operation", label: "Kaffee\nzubereiten", x: 350, y: 280 },
  { id: "io3", type: "io", label: "Ihr Kaffee", x: 350, y: 370 },
  { id: "end1", type: "end", label: "Ende", x: 350, y: 450 },
  { id: "io4", type: "io", label: "Zu wenig\nGuthaben!", x: 200, y: 370 },
];

const kaffeeConnections: PAPConnection[] = [
  { from: "start", to: "io1" },
  { from: "io1", to: "io2" },
  { from: "io2", to: "dec1" },
  { from: "dec1", to: "op1", label: "Ja", color: "#22c55e" },
  { from: "op1", to: "io3" },
  { from: "io3", to: "end1" },
  { from: "dec1", to: "io4", label: "Nein", color: "#ef4444" },
  { from: "io4", to: "io1", label: "Zurück", color: "#94a3b8" },
];

// Quiz-Modus: Lückentext
const quizQuestions = [
  {
    id: "q1",
    question: "Welches Symbol verwendet man für eine Entscheidung im PAP?",
    options: ["Rechteck", "Raute", "Oval", "Parallelogramm"],
    correct: 1,
    explanation: "Die Raute (Diamant) steht für eine Entscheidung — eine Ja/Nein-Verzweigung.",
  },
  {
    id: "q2",
    question: "Was wird im PAP mit einem Oval dargestellt?",
    options: ["Operation", "Start/Ende", "Eingabe", "Entscheidung"],
    correct: 1,
    explanation: "Das Oval (abgerundetes Rechteck) steht für Start oder Ende des Programms.",
  },
  {
    id: "q3",
    question: "Wie heißt die Norm, die den PAP definiert?",
    options: ["DIN 5001", "DIN 66001", "ISO 9001", "DIN 13301"],
    correct: 1,
    explanation: "DIN 66001 definiert die Symbole und Regeln für Programmablaufpläne.",
  },
  {
    id: "q4",
    question: "Was steht im Parallelogramm?",
    options: ["Berechnung", "Entscheidung", "Ein-/Ausgabe", "Start"],
    correct: 2,
    explanation: "Das Parallelogramm steht für Ein- oder Ausgabe — z.B. Benutzereingabe oder Bildschirmausgabe.",
  },
];

function getColor(type: PAPType): string {
  switch (type) {
    case "start": return "#22c55e";
    case "end": return "#ef4444";
    case "operation": return "#3b82f6";
    case "decision": return "#f59e0b";
    case "io": return "#a855f7";
  }
}

function getStroke(type: PAPType): string {
  switch (type) {
    case "start": return "#15803d";
    case "end": return "#dc2626";
    case "operation": return "#1d4ed8";
    case "decision": return "#b45309";
    case "io": return "#6d28d9";
  }
}

function renderElement(el: PAPElement, isHighlighted: boolean, onClick?: () => void) {
  const color = getColor(el.type);
  const stroke = getStroke(el.type);
  const opacity = isHighlighted ? 1 : 0.6;
  const lines = el.label.split("\n");
  const lineHeight = 14;
  const startY = el.y - (lines.length - 1) * lineHeight / 2;

  switch (el.type) {
    case "start":
    case "end":
      return (
        <g key={el.id} opacity={opacity} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
          <rect x={el.x - 55} y={el.y - 22} width="110" height="44" rx="22" ry="22"
            fill={color} stroke={stroke} strokeWidth="2" />
          {lines.map((l, i) => (
            <text key={i} x={el.x} y={startY + i * lineHeight} textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">{l}</text>
          ))}
        </g>
      );
    case "operation":
      return (
        <g key={el.id} opacity={opacity} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
          <rect x={el.x - 55} y={el.y - 22} width="110" height="44" rx="3" ry="3"
            fill={color} stroke={stroke} strokeWidth="2" />
          {lines.map((l, i) => (
            <text key={i} x={el.x} y={startY + i * lineHeight} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{l}</text>
          ))}
        </g>
      );
    case "decision":
      return (
        <g key={el.id} opacity={opacity} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
          <polygon points={`${el.x},${el.y - 30} ${el.x + 60},${el.y} ${el.x},${el.y + 30} ${el.x - 60},${el.y}`}
            fill={color} stroke={stroke} strokeWidth="2" />
          {lines.map((l, i) => (
            <text key={i} x={el.x} y={startY + i * lineHeight} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{l}</text>
          ))}
        </g>
      );
    case "io":
      return (
        <g key={el.id} opacity={opacity} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
          <polygon points={`${el.x - 45},${el.y - 22} ${el.x + 55},${el.y - 22} ${el.x + 45},${el.y + 22} ${el.x - 55},${el.y + 22}`}
            fill={color} stroke={stroke} strokeWidth="2" />
          {lines.map((l, i) => (
            <text key={i} x={el.x} y={startY + i * lineHeight} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{l}</text>
          ))}
        </g>
      );
  }
}

function renderConnections(elements: PAPElement[], connections: PAPConnection[], highlightUpTo: number) {
  const elMap = Object.fromEntries(elements.map(e => [e.id, e]));
  return connections.map((conn, i) => {
    const from = elMap[conn.from];
    const to = elMap[conn.to];
    if (!from || !to) return null;

    const isHighlighted = i < highlightUpTo;
    const color = conn.color || (isHighlighted ? "#94a3b8" : "#475569");
    const opacity = isHighlighted ? 1 : 0.3;

    // Berechne Start- und Endpunkte
    let x1 = from.x, y1 = from.y + 22;
    let x2 = to.x, y2 = to.y - 22;

    // Spezialfall: Zurück-Pfeil (io4 -> io1)
    if (conn.from === "io4" && conn.to === "io1") {
      return (
        <g key={i} opacity={opacity}>
          <line x1={from.x - 55} y1={from.y} x2={from.x - 70} y2={from.y} stroke={color} strokeWidth="2" />
          <line x1={from.x - 70} y1={from.y} x2={from.x - 70} y2={elMap[conn.to].y} stroke={color} strokeWidth="2" />
          <line x1={from.x - 70} y1={elMap[conn.to].y} x2={elMap[conn.to].x - 55} y2={elMap[conn.to].y} stroke={color} strokeWidth="2" markerEnd="url(#arrow)" />
          {conn.label && (
            <text x={from.x - 80} y={(from.y + elMap[conn.to].y) / 2} textAnchor="end" fill={color} fontSize="10">{conn.label}</text>
          )}
        </g>
      );
    }

    // Horizontale Verbindung (decision -> operation)
    if (from.type === "decision" && to.type === "operation" && from.y === to.y) {
      x1 = from.x + 60;
      y1 = from.y;
      x2 = to.x - 55;
      y2 = to.y;
      return (
        <g key={i} opacity={opacity}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" markerEnd="url(#arrow)" />
          {conn.label && <text x={(x1 + x2) / 2} y={y1 - 8} textAnchor="middle" fill={color} fontSize="11" fontWeight="bold">{conn.label}</text>}
        </g>
      );
    }

    // Vertikale Verbindung
    return (
      <g key={i} opacity={opacity}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" markerEnd="url(#arrow)" />
        {conn.label && <text x={x1 + 12} y={(y1 + y2) / 2} textAnchor="start" fill={color} fontSize="11" fontWeight="bold">{conn.label}</text>}
      </g>
    );
  });
}

export function PAPBuilder() {
  const [mode, setMode] = useState<"explore" | "quiz">("explore");
  const [step, setStep] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const maxSteps = kaffeeConnections.length;

  const nextStep = useCallback(() => {
    setStep(s => Math.min(s + 1, maxSteps));
  }, [maxSteps]);

  const prevStep = useCallback(() => {
    setStep(s => Math.max(s - 1, 0));
  }, []);

  const handleAnswer = useCallback((idx: number) => {
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === quizQuestions[quizIdx].correct) {
      setScore(s => s + 1);
    }
  }, [quizIdx]);

  const nextQuestion = useCallback(() => {
    setQuizIdx(i => Math.min(i + 1, quizQuestions.length - 1));
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, []);

  const resetQuiz = useCallback(() => {
    setQuizIdx(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
  }, []);

  return (
    <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
      {/* Mode-Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("explore")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "explore" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
        >
          🔍 PAP erkunden
        </button>
        <button
          onClick={() => setMode("quiz")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "quiz" ? "bg-amber-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
        >
          📝 Quiz
        </button>
      </div>

      {mode === "explore" ? (
        <>
          <h4 className="text-lg font-bold text-white mb-2">Kaffeemaschine — Schritt für Schritt</h4>
          <p className="text-sm text-slate-400 mb-4">
            Klicke auf &quot;Weiter&quot; um den PAP aufzubauen. Jeder Schritt fügt eine neue Verbindung hinzu.
          </p>

          <div className="flex justify-center overflow-x-auto">
            <svg width="420" height="500" viewBox="0 0 420 500" className="max-w-full">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                </marker>
              </defs>

              {/* Alle Elemente */}
              {kaffeeElements.map(el => {
                const elIdx = kaffeeElements.indexOf(el);
                const isHighlighted = elIdx <= step;
                return renderElement(el, isHighlighted);
              })}

              {/* Verbindungen */}
              {renderConnections(kaffeeElements, kaffeeConnections, step)}
            </svg>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg disabled:opacity-30 hover:bg-slate-600 transition-colors"
            >
              ← Zurück
            </button>
            <span className="text-sm text-slate-400">
              Schritt {step} / {maxSteps}
            </span>
            <button
              onClick={nextStep}
              disabled={step >= maxSteps}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-30 hover:bg-blue-500 transition-colors"
            >
              Weiter →
            </button>
          </div>

          {/* Erklärung */}
          {step > 0 && step <= maxSteps && (
            <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
              <p className="text-sm text-slate-300">
                <span className="font-bold text-blue-400">Schritt {step}:</span>{" "}
                {step === 1 && "Der PAP beginnt mit dem Start-Symbol (Oval)."}
                {step === 2 && "Der Nutzer wirft Geld ein — eine Eingabe (Parallelogramm)."}
                {step === 3 && "Der Nutzer gibt den Betrag ein — weitere Eingabe."}
                {step === 4 && "Entscheidung (Raute): Reicht der Betrag? Die Ja/Nein-Verzweigung zeigt zwei Pfade."}
                {step === 5 && "Bei 'Ja': Der Kaffee wird zubereitet (Operation/Rechteck)."}
                {step === 6 && "Die Ausgabe 'Ihr Kaffee' erscheint (Parallelogramm)."}
                {step === 7 && "Das Programm endet mit dem Ende-Symbol."}
                {step === 8 && "Bei 'Nein': Fehlermeldung als Ausgabe. Der Pfeil zurück zeigt, dass der Nutzer erneut Geld einwerfen muss."}
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <h4 className="text-lg font-bold text-white mb-2">PAP-Quiz</h4>
          <p className="text-sm text-slate-400 mb-4">
            Teste dein Wissen über PAP-Symbole und die DIN 66001.
          </p>

          {quizIdx < quizQuestions.length ? (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
                <p className="text-white font-medium mb-3">
                  Frage {quizIdx + 1} / {quizQuestions.length}: {quizQuestions[quizIdx].question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quizQuestions[quizIdx].options.map((opt, i) => {
                    let btnClass = "bg-slate-700 hover:bg-slate-600 text-slate-200";
                    if (showExplanation) {
                      if (i === quizQuestions[quizIdx].correct) {
                        btnClass = "bg-green-600/80 text-white border-green-400";
                      } else if (i === selectedAnswer) {
                        btnClass = "bg-red-600/80 text-white border-red-400";
                      } else {
                        btnClass = "bg-slate-800 text-slate-500";
                      }
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => !showExplanation && handleAnswer(i)}
                        disabled={showExplanation}
                        className={`p-3 rounded-lg text-sm text-left border border-transparent transition-colors ${btnClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="mt-3 p-3 bg-slate-800/50 rounded-lg">
                    <p className="text-sm text-slate-300">
                      {selectedAnswer === quizQuestions[quizIdx].correct ? "✅ Richtig!" : "❌ Falsch!"}{" "}
                      {quizQuestions[quizIdx].explanation}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Punkte: {score} / {quizQuestions.length}
                </span>
                {showExplanation && (
                  <button
                    onClick={quizIdx < quizQuestions.length - 1 ? nextQuestion : resetQuiz}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-colors"
                  >
                    {quizIdx < quizQuestions.length - 1 ? "Nächste Frage →" : "Quiz neustarten 🔄"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center p-6">
              <p className="text-2xl mb-2">🎉</p>
              <p className="text-white font-bold">Quiz abgeschlossen!</p>
              <p className="text-slate-400">Du hast {score} von {quizQuestions.length} Fragen richtig beantwortet.</p>
              <button onClick={resetQuiz} className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-colors">
                Nochmal versuchen
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
