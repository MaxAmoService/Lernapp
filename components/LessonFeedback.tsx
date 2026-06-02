"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { MessageSquare, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface LessonFeedbackProps {
  moduleSlug: string;
  moduleTitle: string;
  lessonId: string;
  lessonTitle: string;
}

type FeedbackCategory = "fehler" | "verbesserung" | "frage" | "sonstiges";

const CATEGORIES: { value: FeedbackCategory; label: string; icon: string }[] = [
  { value: "fehler", label: "Fehler gefunden", icon: "🐛" },
  { value: "verbesserung", label: "Verbesserung", icon: "💡" },
  { value: "frage", label: "Frage", icon: "❓" },
  { value: "sonstiges", label: "Sonstiges", icon: "📝" },
];

const RATE_LIMIT_KEY = "learnhub_feedback_last_submit";
const RATE_LIMIT_MS = 60_000; // 60 Sekunden

export function LessonFeedback({ moduleSlug, moduleTitle, lessonId, lessonTitle }: LessonFeedbackProps) {
  const { user } = useAuth();
  const [category, setCategory] = useState<FeedbackCategory>("fehler");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const isRateLimited = (): boolean => {
    const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
    if (!lastSubmit) return false;
    return Date.now() - parseInt(lastSubmit, 10) < RATE_LIMIT_MS;
  };

  const handleSubmit = async () => {
    setError(null);

    if (!message.trim()) {
      setError("Bitte gib einen Kommentar ein.");
      return;
    }

    if (message.trim().length < 10) {
      setError("Der Kommentar muss mindestens 10 Zeichen lang sein.");
      return;
    }

    if (message.trim().length > 2000) {
      setError("Der Kommentar darf maximal 2000 Zeichen lang sein.");
      return;
    }

    if (isRateLimited()) {
      setError("Du kannst nur einmal pro Minute Feedback senden.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const { getDb } = await import("@/lib/firebase");

      await addDoc(collection(getDb(), "feedback"), {
        uid: user?.uid || "anonymous",
        username: user?.username || "anonymous",
        displayName: user?.displayName || "Anonym",
        moduleSlug,
        moduleTitle,
        lessonId,
        lessonTitle,
        category,
        message: message.trim(),
        createdAt: serverTimestamp(),
        userAgent: navigator.userAgent,
      });

      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
      setSubmitted(true);
      setMessage("");
    } catch (err) {
      console.error("Feedback error:", err);
      setError("Fehler beim Senden. Bitte versuche es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-8 p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <p className="font-medium text-emerald-300">Feedback gesendet!</p>
            <p className="text-sm text-emerald-400/70 mt-0.5">
              Vielen Dank für dein Feedback. Es hilft uns, die Inhalte zu verbessern.
            </p>
          </div>
        </div>
        <button
          onClick={() => { setSubmitted(false); setIsExpanded(false); }}
          className="mt-3 text-sm text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
        >
          Weiteres Feedback senden
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-4 rounded-xl bg-slate-800/30 border border-slate-700/40 hover:bg-slate-800/50 hover:border-slate-700/60 transition-all text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
              <MessageSquare className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                Feedback zu dieser Lektion
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Fehler melden, Verbesserungen vorschlagen oder Fragen stellen
              </p>
            </div>
          </div>
        </button>
      ) : (
        <div className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <h3 className="font-semibold text-white text-sm">Feedback senden</h3>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Schließen
            </button>
          </div>

          {/* Kategorie-Auswahl */}
          <div className="flex flex-wrap gap-2 mb-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  category === cat.value
                    ? "bg-blue-500/20 border border-blue-500/50 text-blue-300"
                    : "bg-slate-700/30 border border-slate-700/40 text-slate-400 hover:text-slate-300 hover:border-slate-600"
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={message}
            onChange={(e) => { setMessage(e.target.value); setError(null); }}
            placeholder={
              category === "fehler"
                ? "Beschreibe den Fehler möglichst genau..."
                : category === "verbesserung"
                ? "Was könnte verbessert werden?"
                : category === "frage"
                ? "Was ist deine Frage?"
                : "Dein Feedback..."
            }
            rows={4}
            maxLength={2000}
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 resize-none transition-all"
          />

          {/* Zeichenzähler & Fehler */}
          <div className="flex items-center justify-between mt-2 mb-3">
            <div>
              {error && (
                <p className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error}
                </p>
              )}
            </div>
            <span className={`text-xs ${message.length > 1800 ? "text-amber-400" : "text-slate-500"}`}>
              {message.length}/2000
            </span>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-slate-600">
              {user ? `Als ${user.displayName} senden` : "Anonym senden"}
            </p>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !message.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg text-sm font-medium text-white transition-all disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Senden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
