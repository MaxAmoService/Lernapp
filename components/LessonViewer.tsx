"use client";

import { Lesson } from "@/lib/data";
import { LessonVisual } from "@/lib/types";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { MathBlock } from "./MathBlock";
import { InlineText } from "./InlineText";
import { GuidedExercise } from "./GuidedExercise";
import { PracticeExercises } from "./PracticeExercises";
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
import { CodeSandbox } from "./interactive/CodeSandbox";
import { PAPSymbolOverview, PAPExample } from "./visuals/PAPDiagram";
import { StrukExample } from "./visuals/StrukExamples";
import { PAPBuilder } from "./interactive/PAPBuilder";
import { PseudocodeRunner } from "./interactive/PseudocodeRunner";
import { StruktogrammBuilder } from "./interactive/StruktogrammBuilder";
import { SortVisualizer } from "./interactive/SortVisualizer";
import { SearchVisualizer } from "./interactive/SearchVisualizer";
import { EPKBuilder } from "./interactive/EPKBuilder";
import { UMLClassDiagram } from "./interactive/UMLClassDiagram";
import { SequenceDiagram } from "./interactive/SequenceDiagram";
import { NetzplanBuilder } from "./interactive/NetzplanBuilder";
import { NetworkBuilder } from "./interactive/NetworkBuilder";
import { SubnetCalculator } from "./interactive/SubnetCalculator";
import { OSIExplorer } from "./interactive/OSIExplorer";
import { ProtocolAnalyzer } from "./interactive/ProtocolAnalyzer";
import { MACConverter } from "./interactive/MACConverter";
import { OSICapsuleViewer } from "./interactive/OSICapsuleViewer";
import { TCPHandshakeSimulator } from "./interactive/TCPHandshakeSimulator";
import { DHCPExplorer } from "./interactive/DHCPExplorer";
import { DNSLookup } from "./interactive/DNSLookup";
import { FirewallRuleBuilder } from "./interactive/FirewallRuleBuilder";
import { WLANConfigurator } from "./interactive/WLANConfigurator";
import { CableComparer } from "./interactive/CableComparer";
import { MailJourney } from "./interactive/MailJourney";
import { HTTPRequestVisualizer } from "./interactive/HTTPRequestVisualizer";
import { EncryptionDemo } from "./interactive/EncryptionDemo";
import { VPNTunnelVisualizer } from "./interactive/VPNTunnelVisualizer";
import { SubnettingTrainer } from "./interactive/SubnettingTrainer";
import { RelationalModelExplorer } from "./interactive/RelationalModelExplorer";
import { ERDiagramBuilder } from "./interactive/ERDiagramBuilder";
import { NormalisationTrainer } from "./interactive/NormalisationTrainer";
import { SQLPlayground } from "./interactive/SQLPlayground";
import { JoinVisualizer } from "./interactive/JoinVisualizer";
import { DBPlanningPhases } from "./interactive/DBPlanningPhases";
import { ComplexPlaneViewer } from "./interactive/ComplexPlaneViewer";
import { ComplexFormConverter } from "./interactive/ComplexFormConverter";
import { ComplexOperationsCalculator } from "./interactive/ComplexOperationsCalculator";
import { ComplexPowerCalculator } from "./interactive/ComplexPowerCalculator";
import { ComplexRootCalculator } from "./interactive/ComplexRootCalculator";

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
    papSymbols: <PAPSymbolOverview width={w} height={500} className="w-full max-w-2xl mx-auto" />,
    papExample: <PAPExample width={400} height={700} className="w-full max-w-2xl mx-auto" />,
    struktSeq: <StrukExample example="sequence" className="w-full max-w-md mx-auto" />,
    struktIfElse: <StrukExample example="ifelse" className="w-full max-w-md mx-auto" />,
    struktWhile: <StrukExample example="while" className="w-full max-w-md mx-auto" />,
    struktFor: <StrukExample example="forloop" className="w-full max-w-md mx-auto" />,
    struktBubbleSort: <StrukExample example="bubblesort" className="w-full max-w-lg mx-auto" />,
  };

  return (
    <div key={`visual-${index}`} className="my-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
      {components[visual.type] || <p className="text-red-400">Unbekannter Visual-Typ: {visual.type}</p>}
    </div>
  );
}

function renderInteractive(type: string, codeExample?: string) {
  const interactiveNames: Record<string, string> = {
    functionExplorer: "Funktionen-Explorer",
    tangentExplorer: "Tangenten-Explorer",
    integralExplorer: "Integral-Rechner",
    unitCircleInteractive: "Einheitskreis",
    vectorExplorer: "Vektoren-Explorer",
    codeSandbox: "Code-Sandbox",
    papBuilder: "PAP-Builder",
    pseudocodeRunner: "Pseudocode-Runner",
    struktogrammBuilder: "Struktogramm-Builder",
    sortVisualizer: "Sortier-Visualisierung",
    searchVisualizer: "Such-Visualisierung",
    epkBuilder: "EPK-Builder",
    umlClassDiagram: "UML Klassendiagramm",
    sequenceDiagram: "Sequenzdiagramm",
    netzplanBuilder: "Netzplan-Builder",
    networkBuilder: "Netzwerk-Builder",
    subnetCalculator: "Subnetting-Rechner",
    osiExplorer: "OSI-Explorer",
    protocolAnalyzer: "Protokoll-Analyse",
    macConverter: "MAC/IP-Konverter",
    osiCapsuleViewer: "OSI-Kapselung",
    tcpHandshakeSimulator: "TCP-Handshake",
    dhcpExplorer: "DHCP-Explorer",
    dnsLookup: "DNS-Lookup",
    firewallRuleBuilder: "Firewall-Regeln",
    wlanConfigurator: "WLAN-Konfigurator",
    cableComparer: "Kabel-Vergleich",
    mailJourney: "E-Mail-Weg",
    httpRequestVisualizer: "HTTP-Request",
    encryptionDemo: "Verschlüsselung",
    vpnTunnelVisualizer: "VPN-Tunnel",
    subnettingTrainer: "Subnetting-Trainer",
    relationalModelExplorer: "Kardinalitäten-Explorer",
    erDiagramBuilder: "ER-Diagramm Builder",
    normalisationTrainer: "Normalisierungs-Trainer",
    sqlPlayground: "SQL Playground",
    joinVisualizer: "JOIN-Visualisierer",
    dbPlanningPhases: "DB-Phasen Guide",
    complexPlaneViewer: "Gaußsche Zahlenebene",
    complexFormConverter: "Form-Rechner",
    complexOperationsCalculator: "Operations-Rechner",
    complexPowerCalculator: "Potenz-Rechner",
    complexRootCalculator: "Wurzel-Rechner",
  };

  const components: Record<string, JSX.Element> = {
    functionExplorer: <FunctionExplorer />,
    tangentExplorer: <TangentExplorer />,
    integralExplorer: <IntegralExplorer />,
    unitCircleInteractive: <UnitCircleInteractive />,
    vectorExplorer: <VectorExplorer />,
    codeSandbox: <CodeSandbox initialCode={codeExample || '// Schreibe deinen Code hier\nconsole.log("Hallo!");'} />,
    papBuilder: <PAPBuilder />,
    pseudocodeRunner: <PseudocodeRunner />,
    struktogrammBuilder: <StruktogrammBuilder />,
    sortVisualizer: <SortVisualizer />,
    searchVisualizer: <SearchVisualizer />,
    epkBuilder: <EPKBuilder />,
    umlClassDiagram: <UMLClassDiagram />,
    sequenceDiagram: <SequenceDiagram />,
    netzplanBuilder: <NetzplanBuilder />,
    networkBuilder: <NetworkBuilder />,
    subnetCalculator: <SubnetCalculator />,
    osiExplorer: <OSIExplorer />,
    protocolAnalyzer: <ProtocolAnalyzer />,
    macConverter: <MACConverter />,
    osiCapsuleViewer: <OSICapsuleViewer />,
    tcpHandshakeSimulator: <TCPHandshakeSimulator />,
    dhcpExplorer: <DHCPExplorer />,
    dnsLookup: <DNSLookup />,
    firewallRuleBuilder: <FirewallRuleBuilder />,
    wlanConfigurator: <WLANConfigurator />,
    cableComparer: <CableComparer />,
    mailJourney: <MailJourney />,
    httpRequestVisualizer: <HTTPRequestVisualizer />,
    encryptionDemo: <EncryptionDemo />,
    vpnTunnelVisualizer: <VPNTunnelVisualizer />,
    subnettingTrainer: <SubnettingTrainer />,
    relationalModelExplorer: <RelationalModelExplorer />,
    erDiagramBuilder: <ERDiagramBuilder />,
    normalisationTrainer: <NormalisationTrainer />,
    sqlPlayground: <SQLPlayground />,
    joinVisualizer: <JoinVisualizer />,
    dbPlanningPhases: <DBPlanningPhases />,
    complexPlaneViewer: <ComplexPlaneViewer />,
    complexFormConverter: <ComplexFormConverter />,
    complexOperationsCalculator: <ComplexOperationsCalculator />,
    complexPowerCalculator: <ComplexPowerCalculator />,
    complexRootCalculator: <ComplexRootCalculator />,
  };

  const name = interactiveNames[type] || type;

  return (
    <div className="my-8 max-w-4xl mx-auto">
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-700/50 bg-slate-800/60">
          <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
            🧪 Übung: {name}
          </h3>
        </div>
        <div className="p-4 sm:p-6">
          {components[type] || <p className="text-red-400">Unbekannter Interaktiv-Typ: {type}</p>}
        </div>
      </div>
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
  const renderContent = (content: string, interactiveType?: string) => {
    const elements: JSX.Element[] = [];
    const lines = content.split("\n");
    const skipLines = new Set<number>();
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
          <div key={`table-wrap-${keyIndex++}`} className="overflow-x-auto my-5 rounded-xl border border-slate-700/50">
            <table className="w-full border-collapse">
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      if (skipLines.has(lineIndex)) continue;
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
            <tr key={`tr-${keyIndex++}`} className="border-b border-slate-700/40 last:border-0">
              {cells.map((cell, ci) => (
                <td key={ci} className="px-4 py-2.5 text-slate-200 bg-slate-800/40 first:bg-slate-800/60">
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
        elements.push(<h1 key={`h-${keyIndex++}`} className="text-3xl font-bold text-white mt-8 mb-4"><InlineText text={line.slice(2)} /></h1>);
      } else if (line.startsWith("## ")) {
        flushTable();
        const isMerkblatt = line.includes("Merkblatt") || line.includes("Zusammenfassung");
        elements.push(
          <h2 key={`h-${keyIndex++}`} className={`text-2xl font-semibold mt-6 mb-3 ${isMerkblatt ? "text-yellow-400" : "text-blue-400"}`}>
            {isMerkblatt && "📋 "}<InlineText text={line.slice(3)} />
          </h2>
        );
      } else if (line.startsWith("### ")) {
        flushTable();
        elements.push(<h3 key={`h-${keyIndex++}`} className="text-2xl font-semibold text-slate-200 mt-4 mb-2"><InlineText text={line.slice(4)} /></h3>);
      }
      // Callout boxes: > 💡 text or > [!TIP] text etc.
      else if (line.startsWith("> ")) {
        const raw = line.slice(2);
        const calloutTypes: Record<string, { bg: string; border: string; icon: string; label: string; text: string }> = {
          "💡": { bg: "bg-blue-500/10", border: "border-blue-500/40", icon: "💡", label: "Tipp", text: "text-blue-200" },
          "[!TIP]": { bg: "bg-blue-500/10", border: "border-blue-500/40", icon: "💡", label: "Tipp", text: "text-blue-200" },
          "⚠️": { bg: "bg-amber-500/10", border: "border-amber-500/40", icon: "⚠️", label: "Achtung", text: "text-amber-200" },
          "[!WARNING]": { bg: "bg-amber-500/10", border: "border-amber-500/40", icon: "⚠️", label: "Achtung", text: "text-amber-200" },
          "ℹ️": { bg: "bg-cyan-500/10", border: "border-cyan-500/40", icon: "ℹ️", label: "Info", text: "text-cyan-200" },
          "[!INFO]": { bg: "bg-cyan-500/10", border: "border-cyan-500/40", icon: "ℹ️", label: "Info", text: "text-cyan-200" },
          "❗": { bg: "bg-purple-500/10", border: "border-purple-500/40", icon: "❗", label: "Wichtig", text: "text-purple-200" },
          "[!IMPORTANT]": { bg: "bg-purple-500/10", border: "border-purple-500/40", icon: "❗", label: "Wichtig", text: "text-purple-200" },
          "✅": { bg: "bg-emerald-500/10", border: "border-emerald-500/40", icon: "✅", label: "Merke", text: "text-emerald-200" },
          "[!SUCCESS]": { bg: "bg-emerald-500/10", border: "border-emerald-500/40", icon: "✅", label: "Merke", text: "text-emerald-200" },
          "📝": { bg: "bg-slate-500/10", border: "border-slate-500/40", icon: "📝", label: "Notiz", text: "text-slate-300" },
          "[!NOTE]": { bg: "bg-slate-500/10", border: "border-slate-500/40", icon: "📝", label: "Notiz", text: "text-slate-300" },
        };
        let matched = false;
        for (const [key, style] of Object.entries(calloutTypes)) {
          if (raw.startsWith(key)) {
            const content = raw.slice(key.length).trim();
            elements.push(
              <div key={`callout-${keyIndex++}`} className={`my-4 p-4 rounded-xl border-l-4 ${style.bg} ${style.border} flex items-start gap-3`}>
                <span className="text-lg mt-0.5 shrink-0">{style.icon}</span>
                <div>
                  <span className={`text-sm font-bold uppercase tracking-wider ${style.text} opacity-70`}>{style.label}</span>
                  <p className={`${style.text} text-base mt-1 leading-relaxed`}><InlineText text={content} /></p>
                </div>
              </div>
            );
            matched = true;
            break;
          }
        }
        if (!matched) {
          // Regular blockquote
          elements.push(
            <blockquote key={`bq-${keyIndex++}`} className="my-3 pl-4 border-l-2 border-slate-600 text-slate-400 italic">
              <InlineText text={raw} />
            </blockquote>
          );
        }
      }
      // List items
      else if (line.startsWith("- ")) {
        const text = line.slice(2);
        elements.push(<li key={`li-${keyIndex++}`} className="text-slate-200 ml-4 mb-1.5 list-none pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-blue-400 before:font-bold"><InlineText text={text} /></li>);
      } else if (/^\d+\.\s/.test(line)) {
        const text = line.replace(/^\d+\.\s/, "");
        elements.push(<li key={`oli-${keyIndex++}`} className="text-slate-200 ml-4 mb-1.5 list-decimal list-inside marker:text-blue-400 marker:font-bold"><InlineText text={text} /></li>);
      }
      // Styled divider (---)
      else if (line.trim() === "---") {
        elements.push(
          <div key={`divider-${keyIndex++}`} className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          </div>
        );
      }
      // Guided Exercise markers
      else if (line.trim() === "[GUIDED_START]") {
        const guidedSteps: string[] = [];
        let guidedTitle = "";
        let guidedResult = "";
        let gi = lineIndex + 1;
        // Parse the GUIDED block
        while (gi < lines.length && lines[gi].trim() !== "[GUIDED_END]") {
          const gl = lines[gi].trim();
          if (gl.startsWith("TITLE:")) {
            guidedTitle = gl.slice(6).trim();
            gi++;
          } else if (gl === "[STEP]") {
            gi++;
            let stepContent = "";
            while (gi < lines.length && lines[gi].trim() !== "[STEP]" && lines[gi].trim() !== "[RESULT]" && lines[gi].trim() !== "[GUIDED_END]") {
              stepContent += (stepContent ? "\n" : "") + lines[gi];
              gi++;
            }
            guidedSteps.push(stepContent.trim());
          } else if (gl === "[RESULT]") {
            gi++;
            let resultContent = "";
            while (gi < lines.length && lines[gi].trim() !== "[GUIDED_END]") {
              resultContent += (resultContent ? "\n" : "") + lines[gi];
              gi++;
            }
            guidedResult = resultContent.trim();
          } else {
            gi++;
          }
        }
        // Skip all lines from [GUIDED_START] to [GUIDED_END]
        for (let skip = lineIndex; skip <= gi; skip++) {
          skipLines.add(skip);
        }
        if (guidedSteps.length > 0 && guidedResult) {
          elements.push(
            <GuidedExercise
              key={`guided-${keyIndex++}`}
              title={guidedTitle}
              steps={guidedSteps}
              result={guidedResult}
            />
          );
        }
      }
      // Practice Exercises markers
      else if (line.trim() === "[PRACTICE_START]") {
        const practiceExercises: { question: string; answer: string }[] = [];
        let practiceTitle = "Übung";
        let pi = lineIndex + 1;
        while (pi < lines.length && lines[pi].trim() !== "[PRACTICE_END]") {
          const pl = lines[pi].trim();
          if (pl.startsWith("TITLE:")) {
            practiceTitle = pl.slice(6).trim();
          } else if (pl.startsWith("[Q:" )) {
            // Format: [Q:question||answer]
            const inner = pl.slice(3, -1);
            const sepIdx = inner.indexOf("||");
            if (sepIdx !== -1) {
              practiceExercises.push({
                question: inner.slice(0, sepIdx).trim(),
                answer: inner.slice(sepIdx + 2).trim(),
              });
            }
          }
          pi++;
        }
        // Skip all lines from [PRACTICE_START] to [PRACTICE_END]
        for (let skip = lineIndex; skip <= pi; skip++) {
          skipLines.add(skip);
        }
        if (practiceExercises.length > 0) {
          elements.push(
            <PracticeExercises
              key={`practice-${keyIndex++}`}
              title={practiceTitle}
              exercises={practiceExercises}
            />
          );
        }
      }
      else if (!line.trim()) {
        elements.push(<div key={`br-${keyIndex++}`} className="h-3" />);
      }
      // Interactive marker — supports [INTERACTIVE] and [INTERACTIVE:type]
      else if (
        (line.trim() === "[INTERACTIVE]" || line.trim().startsWith("[INTERACTIVE:")) &&
        interactiveType &&
        interactiveType !== "codeSandbox"
      ) {
        let specificType: string | undefined;
        const match = line.trim().match(/^\[INTERACTIVE:(\w+)\]$/);
        if (match) {
          specificType = match[1];
        }
        elements.push(
          <div key={`interactive-${keyIndex++}`} className="my-8">
            {renderInteractive(specificType || interactiveType)}
          </div>
        );
      }
      // Regular paragraph
      else {
        elements.push(<p key={`p-${keyIndex++}`} className="text-slate-200 mb-3 leading-relaxed"><InlineText text={line} /></p>);
      }
    }

    flushTable();
    return elements;
  };

  return (
    <div className="glass rounded-xl p-4 sm:p-6 lg:p-8 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-700">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{lesson.title}</h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1">
            ⏱️ {lesson.duration} • {getTypeLabel(lesson.type)}
          </p>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-base">Abgeschlossen</span>
          </div>
        )}
      </div>

      {/* Visuals (top position) */}
      {lesson.visuals?.filter(v => v.position !== "bottom").map((v, i) => renderVisual(v, i))}

      {/* Content — Erklärung (enthält ggf. [INTERACTIVE] Marker) */}
      <div className="markdown-content">{renderContent(lesson.content, lesson.interactive)}</div>

      {/* Visuals (bottom position) */}
      {lesson.visuals?.filter(v => v.position === "bottom").map((v, i) => renderVisual(v, i + 100))}

      {/* CodeSandbox UNTEN — erst lernen, dann anwenden */}
      {lesson.interactive === "codeSandbox" && (
        <div className="my-8 max-w-4xl mx-auto">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-700/50 bg-slate-800/60">
              <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                🧪 Ausprobieren
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              {renderInteractive("codeSandbox", lesson.codeExample)}
            </div>
          </div>
        </div>
      )}

      {/* Code Example — nur wenn KEIN CodeSandbox */}
      {lesson.codeExample && lesson.interactive !== "codeSandbox" && (
        <div className="my-8 max-w-4xl mx-auto">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-700/50 bg-slate-800/60">
              <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                💻 Code-Beispiel
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <CodeBlock code={lesson.codeExample} language="tsx" filename="example.tsx" />
            </div>
          </div>
        </div>
      )}

      {/* Actions — Auto-complete on next or scroll to bottom */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-slate-700">
        {isCompleted ? (
          <div className="text-green-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Abgeschlossen
          </div>
        ) : (
          <button
            onClick={onComplete}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 text-green-400 rounded-lg font-medium transition-all text-base sm:text-lg"
          >
            <CheckCircle2 className="w-4 h-4" />
            Als abgeschlossen markieren
          </button>
        )}

        {hasNext && (
          <button
            onClick={() => {
              onNext?.();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors text-base sm:text-lg"
          >
            Nächste Lektion
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {!hasNext && isCompleted && (
          <a
            href="/modules"
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-violet-500 hover:bg-violet-600 rounded-lg font-medium transition-colors text-base sm:text-lg"
          >
            Alle Module
            <ChevronRight className="w-4 h-4" />
          </a>
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
