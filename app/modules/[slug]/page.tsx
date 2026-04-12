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
} from "lucide-react";

// Merkblatt Content Component with full Markdown support
function MerkblattContent({ content }: { content: string }) {
  const elements: JSX.Element[] = [];
  const lines = content.split("\n");
  let tableRows: JSX.Element[] = [];
  let tableKey = 0;
  let elementKey = 0;

  const renderInline = (text: string) => {
    const parts: JSX.Element[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Find next math, bold, or code
      const mathMatch = remaining.match(/\$([^$]+)\$/);
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
      const codeMatch = remaining.match(/`([^`]+)`/);

      const mathIdx = mathMatch ? remaining.indexOf(mathMatch[0]) : Infinity;
      const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;
      const codeIdx = codeMatch ? remaining.indexOf(codeMatch[0]) : Infinity;

      const minIdx = Math.min(mathIdx, boldIdx, codeIdx);

      if (minIdx === Infinity) {
        parts.push(<span key={key++}>{remaining}</span>);
        break;
      }

      if (minIdx > 0) {
        parts.push(<span key={key++}>{remaining.slice(0, minIdx)}</span>);
      }

      if (minIdx === mathIdx && mathMatch) {
        parts.push(<MathBlock key={key++} math={mathMatch[1]} display={false} />);
        remaining = remaining.slice(mathIdx + mathMatch[0].length);
      } else if (minIdx === boldIdx && boldMatch) {
        parts.push(<strong key={key++} className="text-white font-semibold">{boldMatch[1]}</strong>);
        remaining = remaining.slice(boldIdx + boldMatch[0].length);
      } else if (minIdx === codeIdx && codeMatch) {
        parts.push(<code key={key++} className="bg-slate-700 px-1.5 py-0.5 rounded text-blue-300 text-xs">{codeMatch[1]}</code>);
        remaining = remaining.slice(codeIdx + codeMatch[0].length);
      }
    }

    return <>{parts}</>;
  };

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
                {renderInline(cell)}
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
      elements.push(<h4 key={elementKey++} className="text-sm font-semibold text-slate-200 mt-3 mb-1">{line.slice(4)}</h4>);
    } else if (line.startsWith("## ")) {
      elements.push(<h3 key={elementKey++} className="text-base font-semibold text-yellow-400 mt-4 mb-2">{line.slice(3)}</h3>);
    } else if (line.startsWith("# ")) {
      elements.push(<h2 key={elementKey++} className="text-lg font-bold text-white mt-4 mb-2">{line.slice(2)}</h2>);
    } else if (line.startsWith("- ")) {
      elements.push(<li key={elementKey++} className="text-slate-300 ml-4 mb-0.5 list-disc list-inside text-xs">{renderInline(line.slice(2))}</li>);
    } else if (line.trim()) {
      elements.push(<p key={elementKey++} className="text-slate-300 mb-1 text-xs">{renderInline(line)}</p>);
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

  // Get completed lessons for this module (from user or localStorage fallback)
  const completedLessons = new Set(
    user?.completedLessons[params.slug as string] || 
    (typeof window !== "undefined" ? JSON.parse(localStorage.getItem(`completed-${params.slug}`) || "[]") : [])
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
    }
  };

  const markComplete = (lessonId: string) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    // Save to user profile
    completeLesson(module.slug, lessonId);
    
    // Also save to localStorage as backup
    const completed = JSON.parse(localStorage.getItem(`completed-${params.slug}`) || "[]");
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem(`completed-${params.slug}`, JSON.stringify(completed));
    }
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
        <div className="flex items-start gap-4">
          <span className="text-5xl">{module.icon}</span>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
            <p className="text-slate-400 mb-4">{module.description}</p>
            <div className="max-w-md">
              <ProgressBar value={progress} />
              <p className="text-sm text-slate-400 mt-2">
                {completedLessons.size} von {module.lessons.length} Lektionen abgeschlossen
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lesson List */}
        <aside className="lg:col-span-1">
          <div className="glass rounded-xl p-4 sticky top-24">
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
            <nav className="space-y-2">
              {module.lessons.map((lesson, index) => {
                const isCompleted = completedLessons.has(lesson.id);
                const isSelected = selectedLesson?.id === lesson.id;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
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
        <div className="lg:col-span-2">
          {selectedLesson ? (
            selectedLesson.type === "quiz" ? (
              <Quiz
                moduleSlug={module.slug}
                onComplete={() => markComplete(selectedLesson.id)}
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
                onClick={() => setSelectedLesson(module.lessons[0])}
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
