"use client";

import { useState, useEffect } from "react";

const LAYERS = [
  {
    nr: 7,
    name: "Anwendung",
    color: "#EF4444",
    icon: "📧",
    protocol: "HTTP",
    data: "GET /index.html HTTP/1.1",
    description: "Dein Browser erzeugt eine HTTP-Anfrage",
    pdu: "Daten",
  },
  {
    nr: 6,
    name: "Präsentation",
    color: "#F97316",
    icon: "🔒",
    protocol: "TLS",
    data: "Verschlüsselte Daten",
    description: "TLS verschlüsselt die Daten",
    pdu: "Daten",
  },
  {
    nr: 5,
    name: "Sitzung",
    color: "#EAB308",
    icon: "🔗",
    protocol: "Session-ID",
    data: "Session: abc123",
    description: "Session wird verwaltet",
    pdu: "Daten",
  },
  {
    nr: 4,
    name: "Transport",
    color: "#22C55E",
    icon: "📦",
    protocol: "TCP",
    data: "Src-Port: 52340 → Dst-Port: 443",
    description: "TCP fügt Port-Nummern hinzu",
    pdu: "Segment",
  },
  {
    nr: 3,
    name: "Netzwerk",
    color: "#3B82F6",
    icon: "🌐",
    protocol: "IP",
    data: "Src: 192.168.1.5 → Dst: 142.250.74.110",
    description: "IP fügt Quell- und Ziel-IP hinzu",
    pdu: "Paket",
  },
  {
    nr: 2,
    name: "Sicherung",
    color: "#8B5CF6",
    icon: "🔗",
    protocol: "Ethernet",
    data: "MAC: AA:BB:CC:DD:EE:FF → MAC: 11:22:33:44:55:66",
    description: "Ethernet fügt MAC-Adressen hinzu",
    pdu: "Frame",
  },
  {
    nr: 1,
    name: "Physikalisch",
    color: "#6B7280",
    icon: "⚡",
    protocol: "Bits",
    data: "01001000 01000101 01001100 01001100 01001111",
    description: "Alles wird zu Bits auf dem Kabel",
    pdu: "Bits",
  },
];

export function OSICapsuleViewer() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"send" | "receive">("send");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);

  const quizQuestions = [
    {
      q: "Auf welcher Schicht werden MAC-Adressen hinzugefügt?",
      options: ["Schicht 3 — Netzwerk", "Schicht 2 — Sicherung", "Schicht 4 — Transport", "Schicht 1 — Physikalisch"],
      correct: 1,
    },
    {
      q: "Was passiert auf Schicht 4 (Transport)?",
      options: ["Verschlüsselung", "IP-Adressierung", "Port-Nummern hinzufügen", "Bitübertragung"],
      correct: 2,
    },
    {
      q: "Welche PDU gehört zur Netzwerkschicht?",
      options: ["Bits", "Frames", "Pakete", "Segmente"],
      correct: 2,
    },
  ];

  const [currentQuiz, setCurrentQuiz] = useState(0);

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(0);
    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev >= 6) {
          clearInterval(interval);
          setIsAnimating(false);
          return 6;
        }
        return prev + 1;
      });
    }, 800);
  };

  const resetAnimation = () => {
    setAnimationStep(0);
    setIsAnimating(false);
  };

  const visibleLayers = direction === "send"
    ? LAYERS.slice(0, animationStep + 1)
    : LAYERS.slice(animationStep);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">🔐 OSI-Kapselung — Interaktiv</h3>
      <p className="text-slate-300 text-sm mb-4">
        Siehst du wie eine Nachricht Schicht für Schicht verpackt wird — wie eine Zwiebel!
      </p>

      {/* Richtung Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setDirection("send"); resetAnimation(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            direction === "send"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          📤 Sender (Kapselung)
        </button>
        <button
          onClick={() => { setDirection("receive"); resetAnimation(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            direction === "receive"
              ? "bg-green-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          📥 Empfänger (Entkapselung)
        </button>
      </div>

      {/* Animations-Steuerung */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white rounded-lg text-sm font-medium transition-all"
        >
          ▶️ {direction === "send" ? "Kapselung starten" : "Entkapselung starten"}
        </button>
        <button
          onClick={resetAnimation}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-all"
        >
          🔄 Reset
        </button>
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-all"
        >
          🧠 Quiz
        </button>
      </div>

      {/* OSI-Schichten Visualisierung */}
      <div className="space-y-2 mb-6">
        {LAYERS.map((layer, idx) => {
          const isVisible = direction === "send"
            ? idx <= animationStep
            : idx >= animationStep;
          const isCurrentLayer = idx === animationStep;

          return (
            <div
              key={layer.nr}
              onClick={() => setActiveLayer(activeLayer === idx ? null : idx)}
              className={`relative rounded-lg border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                isVisible
                  ? isCurrentLayer
                    ? "border-white shadow-lg shadow-white/20 scale-[1.02]"
                    : "border-slate-600"
                  : "border-slate-800 opacity-30"
              }`}
              style={{
                backgroundColor: isVisible ? `${layer.color}15` : "transparent",
              }}
            >
              <div className="flex items-center gap-3 p-3">
                {/* Schicht-Nummer */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: layer.color }}
                >
                  {layer.nr}
                </div>

                {/* Name und Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{layer.icon}</span>
                    <span className="text-white font-semibold">Schicht {layer.nr}: {layer.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                      {layer.pdu}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5">{layer.description}</p>
                </div>

                {/* Protokoll-Badge */}
                <div
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold text-white shrink-0"
                  style={{ backgroundColor: layer.color }}
                >
                  {layer.protocol}
                </div>
              </div>

              {/* Daten-Vorschau (wenn aktiv) */}
              {activeLayer === idx && isVisible && (
                <div
                  className="px-3 pb-3 pt-1 border-t border-slate-700"
                  style={{ backgroundColor: `${layer.color}10` }}
                >
                  <div className="font-mono text-xs bg-slate-900 rounded p-2 text-green-400 break-all">
                    {direction === "send" ? "📤 " : "📥 "}{layer.data}
                  </div>
                </div>
              )}

              {/* Animations-Balken */}
              {isCurrentLayer && isAnimating && (
                <div
                  className="absolute bottom-0 left-0 h-1 animate-pulse"
                  style={{
                    backgroundColor: layer.color,
                    width: "100%",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Kapselungs-Darstellung */}
      {direction === "send" && animationStep > 0 && (
        <div className="bg-slate-900 rounded-lg p-4 mb-4">
          <h4 className="text-white font-semibold mb-3">📦 Datenkapselung — So sieht&apos;s aus:</h4>
          <div className="flex flex-wrap gap-1 items-center justify-center">
            {LAYERS.slice(0, animationStep + 1).reverse().map((layer, idx) => (
              <div key={layer.nr} className="flex items-center gap-1">
                {idx > 0 && <span className="text-slate-500 text-xs">+</span>}
                <div
                  className="px-2 py-1 rounded text-xs font-mono text-white font-bold"
                  style={{ backgroundColor: layer.color }}
                >
                  {layer.pdu === "Bits" ? "⚡ Bits" : `${layer.pdu}-Header`}
                </div>
              </div>
            ))}
            <span className="text-slate-500 text-xs">+</span>
            <div className="px-2 py-1 rounded text-xs font-mono bg-yellow-600 text-white font-bold">
              Nutzdaten
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-2 text-center">
            Jede Schicht fügt ihren Header hinzu — wie Geschenkpapier um ein Geschenk 🎁
          </p>
        </div>
      )}

      {/* Merksatz */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 mb-4">
        <p className="text-blue-300 text-sm">
          💡 <strong>Merksatz:</strong> {direction === "send"
            ? "Alle Priester Essen Tafelschokolade Am Palmsonntag — von oben nach unten wird jede Schicht eine neue Hülle."
            : "Der Empfänger schält die Hüllen ab — wie eine Zwiebel, Schicht für Schicht."
          }
        </p>
      </div>

      {/* Quiz */}
      {showQuiz && (
        <div className="bg-slate-900 rounded-lg p-4 border border-purple-700">
          <h4 className="text-purple-400 font-semibold mb-3">
            🧠 Quiz — Frage {currentQuiz + 1} von {quizQuestions.length}
          </h4>
          <p className="text-white mb-3">{quizQuestions[currentQuiz].q}</p>
          <div className="space-y-2">
            {quizQuestions[currentQuiz].options.map((opt, optIdx) => (
              <button
                key={optIdx}
                onClick={() => {
                  setQuizAnswer(optIdx);
                  setQuizCorrect(optIdx === quizQuestions[currentQuiz].correct);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                  quizAnswer === optIdx
                    ? quizCorrect
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {String.fromCharCode(65 + optIdx)}. {opt}
                {quizAnswer === optIdx && quizCorrect && " ✅"}
                {quizAnswer === optIdx && !quizCorrect && " ❌"}
              </button>
            ))}
          </div>
          {quizAnswer !== null && (
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  setQuizAnswer(null);
                  setQuizCorrect(null);
                  setCurrentQuiz((prev) => (prev + 1) % quizQuestions.length);
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm"
              >
                Nächste Frage →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
