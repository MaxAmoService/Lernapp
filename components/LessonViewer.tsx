"use client";

import { Lesson } from "@/lib/data";
import { LessonVisual } from "@/lib/types";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { MathBlock } from "./MathBlock";
import { InlineText } from "./InlineText";
import {
  Triangle, Circle, Rectangle, Square, Trapezoid, Parallelogram,
  Cube, Cuboid, Sphere, Cylinder, Cone, Pyramid
} from "./visuals/GeometryShapes";
import { CoordinateSystem2D, CoordinateSystem3D } from "./visuals/CoordinateSystem";
import { FunctionGraph } from "./visuals/FunctionGraph";
import { UnitCircle } from "./visuals/UnitCircle";
import { FunctionExplorer } from "./interactive/FunctionExplorer";
import { TangentExplorer } from "./interactive/TangentExplorer";
import { IntegralExplorer } from "./interactive/IntegralExplorer";
import { UnitCircleInteractive } from "./interactive/UnitCircleInteractive";
import { VectorExplorer } from "./interactive/VectorExplorer";

function renderVisual(visual: LessonVisual, index: number) {
  const w = 400, h = 300;
  const components: Record<string, JSX.Element> = {
    triangle: <Triangle width={w} height={h} className="w-full max-w-sm mx-auto" />,
    circle: <Circle width={w} height={h} className="w-full max-w-sm mx-auto" />,
    rectangle: <Rectangle width={w} height={h} className="w-full max-w-sm mx-auto" />,
    square: <Square width={w} height={h} className="w-full max-w-xs mx-auto" />,
    trapezoid: <Trapezoid width={w} height={h} className="w-full max-w-sm mx-auto" />,
    parallelogram: <Parallelogram width={w} height={h} className="w-full max-w-sm mx-auto" />,
    cube: <Cube width={w} height={h} className="w-full max-w-sm mx-auto" />,
    cuboid: <Cuboid width={w} height={h} className="w-full max-w-sm mx-auto" />,
    sphere: <Sphere width={w} height={h} className="w-full max-w-xs mx-auto" />,
    cylinder: <Cylinder width={w} height={h} className="w-full max-w-xs mx-auto" />,
    cone: <Cone width={w} height={h} className="w-full max-w-xs mx-auto" />,
    pyramid: <Pyramid width={w} height={h} className="w-full max-w-sm mx-auto" />,
    coordinate2d: <CoordinateSystem2D width={w} height={w} className="w-full max-w-sm mx-auto" {...(visual.props || {})} />,
    coordinate3d: <CoordinateSystem3D width={w} height={h} className="w-full max-w-sm mx-auto" {...(visual.props || {})} />,
    functionGraph: <FunctionGraph width={500} height={350} className="w-full max-w-md mx-auto" {...(visual.props || {})} />,
    unitCircle: <UnitCircle width={w} height={w} className="w-full max-w-sm mx-auto" {...(visual.props || {})} />,
  };

  return (
    <div key={`visual-${index}`} className="my-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
      {components[visual.type] || <p className="text-red-400">Unbekannter Visual-Typ: {visual.type}</p>}
    </div>
  );
}

function renderInteractive(type: string) {
  const components: Record<string, JSX.Element> = {
    functionExplorer: <FunctionExplorer />,
    tangentExplorer: <TangentExplorer />,
    integralExplorer: <IntegralExplorer />,
    unitCircleInteractive: <UnitCircleInteractive />,
    vectorExplorer: <VectorExplorer />,
  };

  return (
    <div className="my-6">
      {components[type] || <p className="text-red-400">Unbekannter Interaktiv-Typ: {type}</p>}
    </div>
  );
}

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

      {/* Visuals (top position) */}
      {lesson.visuals?.filter(v => v.position !== "bottom").map((v, i) => renderVisual(v, i))}

      {/* Interactive Component */}
      {lesson.interactive && renderInteractive(lesson.interactive)}

      {/* Content */}
      <div className="markdown-content">{renderContent(lesson.content)}</div>

      {/* Visuals (bottom position) */}
      {lesson.visuals?.filter(v => v.position === "bottom").map((v, i) => renderVisual(v, i + 100))}

      {/* Code Example */}
      {lesson.codeExample && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">💻 Code-Übung</h3>
          <CodeBlock code={lesson.codeExample} language="tsx" filename="example.tsx" />
        </div>
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
            onClick={() => {
              onNext?.();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
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



function getTypeLabel(type: Lesson["type"]) {
  switch (type) {
    case "video": return "🎬 Video";
    case "text": return "📄 Text";
    case "interactive": return "💻 Interaktiv";
    case "quiz": return "❓ Quiz";
    default: return "";
  }
}
