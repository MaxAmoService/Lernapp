"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { getModule, modules, Lesson } from "@/lib/data";
import { ProgressBar } from "@/components/ProgressBar";
import { LessonViewer } from "@/components/LessonViewer";
import { Quiz } from "@/components/Quiz";
import { LoginModal } from "@/components/LoginModal";
import { MathBlock } from "@/components/MathBlock";
import { InlineText } from "@/components/InlineText";
import { InteractiveExercise } from "@/components/InteractiveExercise";
import { getExercisesForLesson } from "@/lib/mathExercises";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Play,
  FileText,
  Code,
  HelpCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Target,
  Layers,
} from "lucide-react";
import { FlashcardViewer } from "@/components/FlashcardViewer";
import { getFlashcardsForModule } from "@/lib/flashcardData";
import { fireConfetti } from "@/components/Confetti";

// Merkblatt Content Component with full Markdown support
function MerkblattContent({ content }: { content: string }) {
  const elements: JSX.Element[] = [];
  const lines = content.split("\n");
  let tableRows: JSX.Element[] = [];
  let tableKey = 0;
  let elementKey = 0;

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`table-${tableKey++}`} className="overflow-x-auto my-3">
          <table className="w-full border-collapse text-xs">
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      );
      tableRows = [];
    }
  };

  lines.forEach((line) => {
    // Table row
    if (line.includes("|") && line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const cells = line.split("|").filter((_, i, arr) => i > 0 && i < arr.length - 1).map(c => c.trim());
      // Skip separator rows
      if (!cells.every(c => /^[\s:-]+$/.test(c))) {
        tableRows.push(
          <tr key={`tr-${elementKey++}`} className="border-b border-slate-700/50">
            {cells.map((cell, ci) => (
              <td key={ci} className="px-3 py-1.5 text-slate-300 bg-slate-800/30">
                <InlineText text={cell} />
              </td>
            ))}
          </tr>
        );
      }
      return;
    }

    // Flush table if not a table row
    flushTable();

    // Headings
    if (line.startsWith("### ")) {
      elements.push(<h4 key={elementKey++} className="text-sm font-semibold text-slate-200 mt-3 mb-1"><InlineText text={line.slice(4)} /></h4>);
    } else if (line.startsWith("## ")) {
      elements.push(<h3 key={elementKey++} className="text-base font-semibold text-yellow-400 mt-4 mb-2"><InlineText text={line.slice(3)} /></h3>);
    } else if (line.startsWith("# ")) {
      elements.push(<h2 key={elementKey++} className="text-lg font-bold text-white mt-4 mb-2"><InlineText text={line.slice(2)} /></h2>);
    } else if (line.startsWith("- ")) {
      elements.push(<li key={elementKey++} className="text-slate-300 ml-4 mb-0.5 list-disc list-inside text-xs"><InlineText text={line.slice(2)} /></li>);
    } else if (line.trim()) {
      elements.push(<p key={elementKey++} className="text-slate-300 mb-1 text-xs"><InlineText text={line} /></p>);
    }
  });

  flushTable(); // Flush any remaining table

  return <div className="space-y-1">{elements}</div>;
}

export default function ModulePage() {
  const params = useParams();
  const { user, completeLesson } = useAuth();
  const module = getModule(params.slug as string);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showMerkblatt, setShowMerkblatt] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);

  // Get completed lessons ONLY from user data (no localStorage fallback to prevent ghost progress)
  const completedLessons = new Set(
    user?.completedLessons[params.slug as string] || []
  );

  if (!module) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-400">Modul nicht gefunden</h1>
        <a href="/modules" className="text-blue-400 hover:underline mt-4 block">
          Zurück zu allen Modulen
        </a>
      </div>
    );
  }

  const getLessonIcon = (type: Lesson["type"]) => {
    switch (type) {
      case "video": return <Play className="w-4 h-4" />;
      case "text": return <FileText className="w-4 h-4" />;
      case "interactive": return <Code className="w-4 h-4" />;
      case "quiz": return <HelpCircle className="w-4 h-4" />;
      case "exercises": return <Target className="w-4 h-4" />;
    }
  };

  const markComplete = (lessonId: string) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    // Save to user profile only (no separate localStorage backup)
    completeLesson(module.slug, lessonId);
    fireConfetti();
  };

  const goToNextLesson = () => {
    if (!selectedLesson) return;
    const currentIndex = module.lessons.findIndex(l => l.id === selectedLesson.id);
    if (currentIndex < module.lessons.length - 1) {
      setSelectedLesson(module.lessons[currentIndex + 1]);
    }
  };

  const hasNextLesson = () => {
    if (!selectedLesson) return false;
    const currentIndex = module.lessons.findIndex(l => l.id === selectedLesson.id);
    return currentIndex < module.lessons.length - 1;
  };

  const progress = Math.round((completedLessons.size / module.lessons.length) * 100);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="mb-8">
        <a
          href="/modules"
          className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zu allen Modulen
        </a>
        <div className="flex items-start gap-3 sm:gap-4">
          <span className="text-3xl sm:text-5xl">{module.icon}</span>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">{module.title}</h1>
            <p className="text-slate-400 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2 sm:line-clamp-none">{module.description}</p>
            <div className="max-w-md">
              <ProgressBar value={progress} />
              <p className="text-sm text-slate-400 mt-2">
                {completedLessons.size} von {module.lessons.length} Lektionen abgeschlossen
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Lesson List — Mobile: oben als Dropdown, Desktop: Sidebar */}
        <aside className="lg:col-span-1">
          {/* Mobile: Auswahlliste */}
          <div className="lg:hidden mb-4">
            {/* Flashcard Button Mobile */}
            {getFlashcardsForModule(module.slug).length > 0 && (
              <button
                onClick={() => { setShowFlashcards(true); setSelectedLesson(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="w-full mb-2 flex items-center justify-center gap-2 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg text-sm text-purple-300 font-medium"
              >
                <Layers className="w-4 h-4" /> 🃏 Karteikarten lernen
              </button>
            )}
            <select
              value={selectedLesson?.id || ""}
              onChange={(e) => {
                const lesson = module.lessons.find((l) => l.id === e.target.value);
                if (lesson) { setSelectedLesson(lesson); setShowFlashcards(false); window.scrollTo({ top: 0, behavior: "smooth" }); }
              }}
              className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 text-sm border border-slate-600"
            >
              <option value="">📖 Lektion wählen...</option>
              {module.lessons.map((lesson, index) => (
                <option key={lesson.id} value={lesson.id}>
                  {completedLessons.has(lesson.id) ? "✅" : "⬜"} {index + 1}. {lesson.title} ({lesson.duration})
                </option>
              ))}
            </select>
            {/* Merkblatt Mobile */}
            {module.merkblatt && (
              <button
                onClick={() => setShowMerkblatt(!showMerkblatt)}
                className="w-full mt-2 flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-sm"
              >
                <span className="flex items-center gap-2 text-yellow-400 font-medium">
                  <BookOpen className="w-4 h-4" /> Merkblatt
                </span>
                {showMerkblatt ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
            {showMerkblatt && module.merkblatt && (
              <div className="mt-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700 text-sm">
                <MerkblattContent content={module.merkblatt} />
              </div>
            )}
          </div>

          {/* Desktop: Sticky Sidebar */}
          <div className="hidden lg:block glass rounded-xl p-2 sticky top-24">
            {/* Merkblatt */}
            {module.merkblatt && (
              <div className="mb-6">
                <button
                  onClick={() => setShowMerkblatt(!showMerkblatt)}
                  className="w-full flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/20 transition-colors"
                >
                  <span className="flex items-center gap-2 text-yellow-400 font-medium">
                    <BookOpen className="w-5 h-5" />
                    Merkblatt
                  </span>
                  {showMerkblatt ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showMerkblatt && (
                  <div className="mt-2 p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-sm">
                    <MerkblattContent content={module.merkblatt} />
                  </div>
                )}
              </div>
            )}
            <h2 className="text-lg font-semibold mb-4">Lektionen</h2>
            {/* Flashcard Button */}
            {getFlashcardsForModule(module.slug).length > 0 && (
              <button
                onClick={() => { setShowFlashcards(true); setSelectedLesson(null); }}
                className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors mb-2 ${
                  showFlashcards
                    ? "bg-purple-500/20 border border-purple-500/50"
                    : "bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30"
                }`}
              >
                <div className="p-1.5 rounded bg-purple-500/30">
                  <Layers className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-purple-300">🃏 Karteikarten</p>
                  <p className="text-xs text-purple-400/70">Spaced Repetition</p>
                </div>
              </button>
            )}
            <nav className="space-y-2">
              {module.lessons.map((lesson, index) => {
                const isCompleted = completedLessons.has(lesson.id);
                const isSelected = selectedLesson?.id === lesson.id;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => { setSelectedLesson(lesson); setShowFlashcards(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                      isSelected
                        ? "bg-blue-500/20 border border-blue-500/50"
                        : "hover:bg-slate-800/50"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${isCompleted ? "text-slate-400" : "text-white"}`}>
                        {index + 1}. {lesson.title}
                      </p>
                      <p className="text-xs text-slate-500">{lesson.duration}</p>
                    </div>
                    <div className={`p-1.5 rounded ${isSelected ? "bg-blue-500/30" : "bg-slate-700"}`}>
                      {getLessonIcon(lesson.type)}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Lesson Content */}
        <div className="lg:col-span-3 min-w-0">
          {showFlashcards ? (
            <div className="glass rounded-xl p-4 sm:p-6 lg:p-8 animate-slide-up">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                    🃏 Karteikarten
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                    Spaced Repetition — lerne effizient mit dem SM-2 Algorithmus
                  </p>
                </div>
                <button
                  onClick={() => setShowFlashcards(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
                >
                  Schließen
                </button>
              </div>
              <FlashcardViewer
                moduleId={module.slug}
                cards={getFlashcardsForModule(module.slug)}
              />
            </div>
          ) : selectedLesson ? (
            selectedLesson.type === "quiz" ? (
              <Quiz
                moduleSlug={module.slug}
                onComplete={() => markComplete(selectedLesson.id)}
              />
            ) : selectedLesson.type === "exercises" ? (
              <InteractiveExercise
                exercises={getExercisesForLesson(module.id)}
                moduleTitle={module.title}
              />
            ) : (
              <LessonViewer
                lesson={selectedLesson}
                onComplete={() => markComplete(selectedLesson.id)}
                isCompleted={completedLessons.has(selectedLesson.id)}
                onNext={goToNextLesson}
                hasNext={hasNextLesson()}
              />
            )
          ) : (
            <div className="glass rounded-xl p-12 text-center">
              <span className="text-6xl mb-4 block">{module.icon}</span>
              <h2 className="text-2xl font-bold mb-2">Bereit zu lernen?</h2>
              <p className="text-slate-400 mb-6">
                Wähle eine Lektion aus der Liste, um zu beginnen.
              </p>
              <button
                onClick={() => { setSelectedLesson(module.lessons[0]); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
              >
                Erste Lektion starten
              </button>
            </div>
          )}
        </div>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
