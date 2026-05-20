"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Flashcard,
  FlashcardProgress,
  sm2,
  newCardProgress,
  getDueCards,
  getDeckStats,
  getDeckProgress,
  saveDeckProgress,
} from "@/lib/flashcards";
import { RotateCcw, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Brain, Trophy, Flame } from "lucide-react";

interface FlashcardViewerProps {
  moduleId: string;
  cards: Flashcard[];
}

export function FlashcardViewer({ moduleId, cards }: FlashcardViewerProps) {
  const [deck, setDeck] = useState(() => getDeckProgress(moduleId));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0 });

  const dueCards = getDueCards(cards, deck.cards);
  const stats = getDeckStats(cards, deck.cards);
  const currentCard = dueCards[currentIndex];

  const flipCard = useCallback(() => setIsFlipped((f) => !f), []);

  const rateCard = useCallback(
    (quality: number) => {
      if (!currentCard) return;

      const progress = deck.cards[currentCard.id] || newCardProgress(currentCard.id);
      const updated = sm2(quality, progress);

      const newDeck = {
        ...deck,
        cards: { ...deck.cards, [currentCard.id]: updated },
        lastStudy: Date.now(),
      };

      setDeck(newDeck);
      saveDeckProgress(moduleId, newDeck);

      setSessionStats((s) => ({
        correct: quality >= 3 ? s.correct + 1 : s.correct,
        wrong: quality < 3 ? s.wrong + 1 : s.wrong,
      }));

      setIsFlipped(false);

      // Nächste Karte oder Session beenden
      if (currentIndex + 1 < dueCards.length) {
        setCurrentIndex((i) => i + 1);
      } else {
        setSessionDone(true);
      }
    },
    [currentCard, deck, currentIndex, dueCards.length, moduleId]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!isFlipped) flipCard();
      }
      if (isFlipped) {
        if (e.key === "1") rateCard(1);
        if (e.key === "2") rateCard(3);
        if (e.key === "3") rateCard(5);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFlipped, flipCard, rateCard]);

  // Session beendet
  if (sessionDone) {
    const total = sessionStats.correct + sessionStats.wrong;
    const pct = total > 0 ? Math.round((sessionStats.correct / total) * 100) : 0;
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">{pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "💪"}</div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {pct >= 80 ? "Super!" : pct >= 50 ? "Gut gemacht!" : "Übung macht den Meister!"}
        </h3>
        <p className="text-slate-400 mb-6">
          {sessionStats.correct} von {total} richtig ({pct}%)
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSessionDone(false);
              setSessionStats({ correct: 0, wrong: 0 });
            }}
            className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Nochmal
          </button>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSessionDone(false);
              setIsFlipped(false);
            }}
            className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    );
  }

  // Keine Karten fällig
  if (dueCards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">✨</div>
        <h3 className="text-2xl font-bold text-white mb-2">Alles gelernt!</h3>
        <p className="text-slate-400 mb-4">
          Keine Karten fällig. Nächste Wiederholung: {getNextReviewText(deck.cards)}
        </p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatBox label="Gesamt" value={stats.total} icon="📚" />
          <StatBox label="Gelernt" value={stats.studied} icon="📖" />
          <StatBox label="Gemeistert" value={stats.mastered} icon="🏆" />
        </div>
        <button
          onClick={() => {
            // Alle Karten nochmal üben
            setCurrentIndex(0);
            setSessionDone(false);
          }}
          className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Alle wiederholen
        </button>
      </div>
    );
  }

  const progress = deck.cards[currentCard?.id];
  const qualityButtons = [
    { quality: 1, label: "Schwer", color: "bg-red-500/20 text-red-400 hover:bg-red-500/30", icon: <XCircle className="w-4 h-4" /> },
    { quality: 3, label: "Okay", color: "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30", icon: <Brain className="w-4 h-4" /> },
    { quality: 5, label: "Leicht", color: "bg-green-500/20 text-green-400 hover:bg-green-500/30", icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Stats Bar */}
      <div className="w-full flex items-center justify-between mb-4 text-sm text-slate-400">
        <span>
          Karte {currentIndex + 1} / {dueCards.length}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-green-400">✓ {sessionStats.correct}</span>
          <span className="text-red-400">✗ {sessionStats.wrong}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / dueCards.length) * 100}%` }}
        />
      </div>

      {/* Flashcard with 3D Flip */}
      <div
        className="w-full max-w-lg cursor-pointer perspective-1000"
        onClick={flipCard}
        style={{ perspective: "1000px" }}
      >
        <div
          className={`relative w-full min-h-[280px] transition-transform duration-500 preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 p-8 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            {currentCard?.category && (
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400/70 mb-4">
                {currentCard.category}
              </span>
            )}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {currentCard?.front}
            </h3>
            {currentCard?.hint && (
              <p className="text-sm text-slate-500 italic">💡 {currentCard.hint}</p>
            )}
            <p className="text-xs text-slate-600 mt-6">Klicken oder Leertaste zum Umdrehen</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 p-8 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400/70 mb-4">
              Antwort
            </span>
            <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
              {currentCard?.back}
            </p>
          </div>
        </div>
      </div>

      {/* Rating Buttons — nur wenn flipped */}
      {isFlipped && (
        <div className="flex gap-3 mt-6 animate-fade-in">
          {qualityButtons.map((btn) => (
            <button
              key={btn.quality}
              onClick={() => rateCard(btn.quality)}
              className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${btn.color}`}
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {/* Keyboard Hint */}
      {isFlipped && (
        <p className="text-xs text-slate-600 mt-3">
          Tasten: <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">1</kbd> Schwer ·{" "}
          <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">2</kbd> Okay ·{" "}
          <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">3</kbd> Leicht
        </p>
      )}

      {/* Deck Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-md">
        <StatBox label="Fällig" value={stats.due} icon="⏰" />
        <StatBox label="Gelernt" value={stats.studied} icon="📖" />
        <StatBox label="Gemeistert" value={stats.mastered} icon="🏆" />
      </div>
    </div>
  );
}

function StatBox({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-3 text-center border border-slate-700/50">
      <div className="text-lg mb-1">{icon}</div>
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

function getNextReviewText(cards: Record<string, FlashcardProgress>): string {
  const now = Date.now();
  const nextTimes = Object.values(cards)
    .filter((c) => c.nextReview > now)
    .map((c) => c.nextReview);

  if (nextTimes.length === 0) return "jetzt";

  const next = Math.min(...nextTimes);
  const diff = next - now;
  const hours = Math.round(diff / (1000 * 60 * 60));

  if (hours < 1) return "in < 1 Stunde";
  if (hours < 24) return `in ${hours} Stunden`;
  const days = Math.round(hours / 24);
  return `in ${days} Tag${days > 1 ? "en" : ""}`;
}
