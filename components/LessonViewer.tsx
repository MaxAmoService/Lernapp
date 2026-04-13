"use client";

import { Lesson } from "@/lib/data";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { MathBlock } from "./MathBlock";
import { InteractiveExercise } from "./InteractiveExercise";
import { getExercisesForLesson } from "@/lib/mathExercises";

interface LessonViewerProps {
  lesson: Lesson;
  onComplete: () => void;
  isCompleted: boolean;
  onNext?: () => void;
  hasNext?: boolean;
}

export function LessonViewer({ lesson, onComplete, isCompleted, onNext, hasNext }: LessonViewerProps) {
  const renderContent = (content: string) => {
    const elements: JSX.Element[] = [];
    const lines = content.split("\n");
    let inCodeBlock = false;
    let codeContent = "";
    let codeLang = "";
    let inMathBlock = false;
    let mathContent = "";
    let inTable = false;
    let tableRows: JSX.Element[] = [];
    let keyIndex = 0;

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={`table-wrap-${keyIndex++}`} className="overflow-x-auto my-4">
            <table className="w-full border-collapse">
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line) => {
      // Block math $$...$$
      if (line.trim().startsWith("$$") && !inCodeBlock) {
        flushTable();
        if (inMathBlock) {
          elements.push(<MathBlock key={`math-${keyIndex++}`} math={mathContent.trim()} display={true} />);
          mathContent = "";
          inMathBlock = false;
        } else {
          const rest = line.trim().slice(2);
          if (rest.endsWith("$$")) {
            elements.push(<MathBlock key={`math-${keyIndex++}`} math={rest.slice(0, -2).trim()} display={true} />);
          } else {
            inMathBlock = true;
            mathContent = rest + "\n";
          }
        }
        return;
      }

      if (inMathBlock) {
        if (line.trim().endsWith("$$")) {
          mathContent += line.trim().slice(0, -2);
          elements.push(<MathBlock key={`math-${keyIndex++}`} math={mathContent.trim()} display={true} />);
          mathContent = "";
          inMathBlock = false;
        } else {
          mathContent += line + "\n";
        }
        return;
      }

      // Code block
      if (line.startsWith("```")) {
        flushTable();
        if (inCodeBlock) {
          elements.push(<CodeBlock key={`code-${keyIndex++}`} code={codeContent.trim()} language={codeLang || "tsx"} />);
          codeContent = "";
          inCodeBlock = false;
        } else {
          codeLang = line.slice(3).trim();
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + "\n";
        return;
      }

      // Table row
      if (line.includes("|") && line.trim().startsWith("|") && line.trim().endsWith("|")) {
        const cells = line.split("|").filter((c, i, arr) => i > 0 && i < arr.length - 1).map(c => c.trim());
        // Skip separator row
        if (!cells.every(c => c.match(/^[\s:-]+$/))) {
          inTable = true;
          tableRows.push(
            <tr key={`tr-${keyIndex++}`} className="border-b border-slate-700/50">
              {cells.map((cell, ci) => (
                <td key={ci} className="px-4 py-2 text-slate-300 bg-slate-800/30">
                  <InlineText text={cell} />
                </td>
              ))}
            </tr>
          );
        }
        return;
      } else if (inTable) {
        flushTable();
      }

      // Headers
      if (line.startsWith("# ")) {
        flushTable();
        elements.push(<h1 key={`h-${keyIndex++}`} className="text-3xl font-bold text-white mt-8 mb-4">{line.slice(2)}</h1>);
      } else if (line.startsWith("## ")) {
        flushTable();
        const isMerkblatt = line.includes("Merkblatt") || line.includes("Zusammenfassung");
        elements.push(
          <h2 key={`h-${keyIndex++}`} className={`text-2xl font-semibold mt-6 mb-3 ${isMerkblatt ? "text-yellow-400" : "text-blue-400"}`}>
            {isMerkblatt && "📋 "}{line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        flushTable();
        elements.push(<h3 key={`h-${keyIndex++}`} className="text-xl font-semibold text-slate-200 mt-4 mb-2">{line.slice(4)}</h3>);
      }
      // List items
      else if (line.startsWith("- ")) {
        const text = line.slice(2);
        elements.push(<li key={`li-${keyIndex++}`} className="text-slate-300 ml-4 mb-1 list-disc list-inside"><InlineText text={text} /></li>);
      } else if (/^\d+\.\s/.test(line)) {
        const text = line.replace(/^\d+\.\s/, "");
        elements.push(<li key={`oli-${keyIndex++}`} className="text-slate-300 ml-4 mb-1 list-decimal list-inside"><InlineText text={text} /></li>);
      } else if (!line.trim()) {
        elements.push(<br key={`br-${keyIndex++}`} />);
      }
      // Regular paragraph
      else {
        elements.push(<p key={`p-${keyIndex++}`} className="text-slate-300 mb-2"><InlineText text={line} /></p>);
      }
    });

    flushTable();
    return elements;
  };

  return (
    <div className="glass rounded-xl p-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
        <div>
          <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
          <p className="text-sm text-slate-400 mt-1">
            ⏱️ {lesson.duration} • {getTypeLabel(lesson.type)}
          </p>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">Abgeschlossen</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="markdown-content">{renderContent(lesson.content)}</div>

      {/* Code Example */}
      {lesson.codeExample && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">💻 Code-Übung</h3>
          <CodeBlock code={lesson.codeExample} language="tsx" filename="example.tsx" />
        </div>
      )}

      {/* Interactive Exercises */}
      {getExercisesForLesson(lesson.id).length > 0 && (
        <InteractiveExercise
          exercises={getExercisesForLesson(lesson.id)}
          lessonTitle={lesson.title}
        />
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-700">
        {!isCompleted ? (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            Als abgeschlossen markieren
          </button>
        ) : (
          <div className="text-green-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Abgeschlossen
          </div>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
          >
            Nächste Lektion
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// Inline text with bold, code, math
function InlineText({ text }: { text: string }) {
  const parts: (string | JSX.Element)[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const mathMatch = remaining.match(/\$([^$]+)\$/);
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
    const codeMatch = remaining.match(/`([^`]+)`/);

    const mathIndex = mathMatch ? remaining.indexOf(mathMatch[0]) : Infinity;
    const boldIndex = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;
    const codeIndex = codeMatch ? remaining.indexOf(codeMatch[0]) : Infinity;

    if (mathIndex < boldIndex && mathIndex < codeIndex) {
      if (mathIndex > 0) parts.push(remaining.slice(0, mathIndex));
      parts.push(<MathBlock key={key++} math={mathMatch![1]} display={false} />);
      remaining = remaining.slice(mathIndex + mathMatch![0].length);
    } else if (boldIndex < codeIndex) {
      if (boldIndex > 0) parts.push(remaining.slice(0, boldIndex));
      parts.push(<strong key={key++} className="text-white font-semibold">{boldMatch![1]}</strong>);
      remaining = remaining.slice(boldIndex + boldMatch![0].length);
    } else if (codeIndex < Infinity) {
      if (codeIndex > 0) parts.push(remaining.slice(0, codeIndex));
      parts.push(<code key={key++} className="bg-slate-700 px-1.5 py-0.5 rounded text-blue-300 text-sm">{codeMatch![1]}</code>);
      remaining = remaining.slice(codeIndex + codeMatch![0].length);
    } else {
      parts.push(remaining);
      break;
    }
  }

  return <>{parts}</>;
}

function getTypeLabel(type: Lesson["type"]) {
  switch (type) {
    case "video": return "🎬 Video";
    case "text": return "📄 Text";
    case "interactive": return "💻 Interaktiv";
    case "quiz": return "❓ Quiz";
    default: return "";
  }
}
