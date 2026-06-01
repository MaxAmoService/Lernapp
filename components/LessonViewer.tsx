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
import { TruthTableExplorer } from "./interactive/TruthTableExplorer";
import { VennDiagramExplorer } from "./interactive/VennDiagramExplorer";
import { ProbabilitySimulator } from "./interactive/ProbabilitySimulator";
import { MatrixCalculator } from "./interactive/MatrixCalculator";
import { BoxplotBuilder } from "./interactive/BoxplotBuilder";
import { SeriesVisualizer } from "./interactive/SeriesVisualizer";
import { ComplexPowersTrainer } from "./interactive/ComplexPowersTrainer";
import CPUArchitectureExplorer from "./interactive/CPUArchitectureExplorer";
import MemoryHierarchyExplorer from "./interactive/MemoryHierarchyExplorer";
import RAIDConfigurator from "./interactive/RAIDConfigurator";
import StorageComparator from "./interactive/StorageComparator";
import AddressingCalculator from "./interactive/AddressingCalculator";
import VirtualizationExplorer from "./interactive/VirtualizationExplorer";
import BootSequenceBuilder from "./interactive/BootSequenceBuilder";
import DataTransmissionVisualizer from "./interactive/DataTransmissionVisualizer";
import ARPExplorer from "./interactive/ARPExplorer";
import TreeExplorer from "./interactive/TreeExplorer";
import GraphExplorer from "./interactive/GraphExplorer";
import { SecurityThreatExplorer } from "./interactive/SecurityThreatExplorer";
import { PasswordStrengthChecker } from "./interactive/PasswordStrengthChecker";
import { SQLInjectionSimulator } from "./interactive/SQLInjectionSimulator";
import { PhishingDetector } from "./interactive/PhishingDetector";
import { XSSChallengeSimulator } from "./interactive/XSSChallengeSimulator";
import { AuthBypassChallenge } from "./interactive/AuthBypassChallenge";
import { SecurityChallengeArena } from "./interactive/SecurityChallengeArena";
import GitBranchVisualizer from "./interactive/GitBranchVisualizer";
import HeuristicEvaluator from "./interactive/HeuristicEvaluator";
import PatternExplorer from "./interactive/PatternExplorer";
import ScrumBoard from "./interactive/ScrumBoard";
import DockerfileBuilder from "./interactive/DockerfileBuilder";
import { SOLIDChecker } from "./interactive/SOLIDChecker";
import { TestRunner } from "./interactive/TestRunner";
import EVACalculator from "./interactive/EVACalculator";
import SMARTGoalBuilder from "./interactive/SMARTGoalBuilder";
import DockerComposeBuilder from "./interactive/DockerComposeBuilder";

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
    truthTableExplorer: "Wahrheitstafel-Explorer",
    vennDiagramExplorer: "Venn-Diagramm",
    probabilitySimulator: "Wahrscheinlichkeits-Simulator",
    matrixCalculator: "Matrix-Rechner",
    boxplotBuilder: "Boxplot-Builder",
    seriesVisualizer: "Reihen-Visualisierung",
    complexPowersTrainer: "j-Potenzen-Trainer",
    cpuArchitectureExplorer: "CPU-Architektur",
    memoryHierarchyExplorer: "Speicherhierarchie",
    raidConfigurator: "RAID-Konfigurator",
    storageComparator: "Speichermedien-Vergleich",
    addressingCalculator: "Adressierungs-Rechner",
    virtualizationExplorer: "Virtualisierung",
    bootSequenceBuilder: "Boot-Sequenz",
    dataTransmissionVisualizer: "Datenübertragung",
    arpExplorer: "ARP-Explorer",
    treeExplorer: "Baum-Explorer",
    graphExplorer: "Graph-Explorer",
    securityThreatExplorer: "Bedrohungs-Explorer",
    passwordStrengthChecker: "Passwort-Checker",
    sqlInjectionSimulator: "SQL Injection Simulator",
    phishingDetector: "Phishing Detector",
    gitBranchVisualizer: "Git Branch Visualizer",
    heuristicEvaluator: "Heuristik-Evaluator",
    patternExplorer: "Design Pattern Explorer",
    scrumBoard: "Scrum Board",
    dockerfileBuilder: "Dockerfile Builder",
    solidChecker: "SOLID Checker",
    testRunner: "Test Runner",
    evaCalculator: "EVA-Rechner",
    smartGoalBuilder: "SMART-Ziel Builder",
    dockerComposeBuilder: "Docker Compose Builder",
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
    truthTableExplorer: <TruthTableExplorer />,
    vennDiagramExplorer: <VennDiagramExplorer />,
    probabilitySimulator: <ProbabilitySimulator />,
    matrixCalculator: <MatrixCalculator />,
    boxplotBuilder: <BoxplotBuilder />,
    seriesVisualizer: <SeriesVisualizer />,
    complexPowersTrainer: <ComplexPowersTrainer />,
    cpuArchitectureExplorer: <CPUArchitectureExplorer />,
    memoryHierarchyExplorer: <MemoryHierarchyExplorer />,
    raidConfigurator: <RAIDConfigurator />,
    storageComparator: <StorageComparator />,
    addressingCalculator: <AddressingCalculator />,
    virtualizationExplorer: <VirtualizationExplorer />,
    bootSequenceBuilder: <BootSequenceBuilder />,
    dataTransmissionVisualizer: <DataTransmissionVisualizer />,
    arpExplorer: <ARPExplorer />,
    treeExplorer: <TreeExplorer />,
    graphExplorer: <GraphExplorer />,
    securityThreatExplorer: <SecurityThreatExplorer />,
    passwordStrengthChecker: <PasswordStrengthChecker />,
    sqlInjectionSimulator: <SQLInjectionSimulator />,
    phishingDetector: <PhishingDetector />,
    xssChallengeSimulator: <XSSChallengeSimulator />,
    authBypassChallenge: <AuthBypassChallenge />,
    securityChallengeArena: <SecurityChallengeArena />,
    gitBranchVisualizer: <GitBranchVisualizer />,
    heuristicEvaluator: <HeuristicEvaluator />,
    patternExplorer: <PatternExplorer />,
    scrumBoard: <ScrumBoard />,
    dockerfileBuilder: <DockerfileBuilder />,
    solidChecker: <SOLIDChecker />,
    testRunner: <TestRunner />,
    evaCalculator: <EVACalculator />,
    smartGoalBuilder: <SMARTGoalBuilder />,
    dockerComposeBuilder: <DockerComposeBuilder />,
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
    let inSvgBlock = false;
    let svgContent = "";
    let inTable = false;
    let tableRows: JSX.Element[] = [];
    let olItems: JSX.Element[] = [];
    let keyIndex = 0;

    const flushOl = () => {
      if (olItems.length > 0) {
        elements.push(
          <ol key={`ol-${keyIndex++}`} className="my-3 space-y-1.5 list-decimal list-inside marker:text-blue-400 marker:font-bold">
            {olItems}
          </ol>
        );
        olItems = [];
      }
    };

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
        continue;
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
        continue;
      }

      // SVG block
      if (line.trim().startsWith("<svg")) {
        flushTable();
        flushOl();
        inSvgBlock = true;
        svgContent = line + "\n";
        if (line.includes("</svg>")) {
          inSvgBlock = false;
          elements.push(<div key={`svg-${keyIndex++}`} className="my-6 flex justify-center" dangerouslySetInnerHTML={{ __html: svgContent }} />);
          svgContent = "";
        }
        continue;
      }
      if (inSvgBlock) {
        svgContent += line + "\n";
        if (line.includes("</svg>")) {
          inSvgBlock = false;
          elements.push(<div key={`svg-${keyIndex++}`} className="my-6 flex justify-center" dangerouslySetInnerHTML={{ __html: svgContent }} />);
          svgContent = "";
        }
        continue;
      }

      // Code block
      if (line.startsWith("```")) {
        flushTable();
        flushOl();
        if (inCodeBlock) {
          elements.push(<CodeBlock key={`code-${keyIndex++}`} code={codeContent.trim()} language={codeLang || "tsx"} />);
          codeContent = "";
          inCodeBlock = false;
        } else {
          codeLang = line.slice(3).trim();
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent += line + "\n";
        continue;
      }

      // Table row
      if (line.includes("|") && line.trim().startsWith("|") && line.trim().endsWith("|")) {
        flushOl();
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
        continue;
      } else if (inTable) {
        flushTable();
      }

      // Headers
      if (line.startsWith("# ")) {
        flushTable();
        flushOl();
        elements.push(<h1 key={`h-${keyIndex++}`} className="text-3xl font-bold text-white mt-8 mb-4"><InlineText text={line.slice(2)} /></h1>);
      } else if (line.startsWith("## ")) {
        flushTable();
        const headingText = line.slice(3);
        const isMerkblatt = headingText.includes("Merkblatt") || headingText.includes("Zusammenfassung");
        const hasEmoji = /^[^\w\s]/.test(headingText);
        elements.push(
          <h2 key={`h-${keyIndex++}`} className={`text-2xl font-semibold mt-6 mb-3 ${isMerkblatt ? "text-yellow-400" : "text-blue-400"}`}>
            {isMerkblatt && !hasEmoji && "📋 "}<InlineText text={headingText} />
          </h2>
        );
      } else if (line.startsWith("### ")) {
        flushTable();
        elements.push(<h3 key={`h-${keyIndex++}`} className="text-2xl font-semibold text-slate-200 mt-4 mb-2"><InlineText text={line.slice(4)} /></h3>);
      }
      // Callout boxes: > 💡 text or > [!TIP] text etc.
      else if (line.startsWith("> ")) {
        flushOl();
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
        // 🎬 Video embed
        if (raw.startsWith("🎬")) {
          const videoContent = raw.slice(2).trim();
          const urlMatch = videoContent.match(/https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
          const videoId = urlMatch ? urlMatch[1] : null;
          const titleMatch = videoContent.match(/\*\*(.+?)\*\*/);
          const title = titleMatch ? titleMatch[1] : "Video";
          const descMatch = videoContent.match(/—\s*(.+)$/);
          const description = descMatch ? descMatch[1] : "";
          if (videoId) {
            elements.push(
              <div key={`video-${keyIndex++}`} className="my-4 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50">
                <div className="px-4 py-2.5 bg-gradient-to-r from-red-500/10 to-red-600/5 border-b border-slate-700/50 flex items-center gap-2">
                  <span className="text-lg">🎬</span>
                  <span className="text-sm font-semibold text-red-300">{title}</span>
                  <span className="text-xs text-slate-500 ml-auto">3Blue1Brown</span>
                </div>
                {description && <p className="px-4 py-1.5 text-xs text-slate-400 bg-slate-900/30">{description}</p>}
                <div className="relative" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            );
            matched = true;
          }
        }
        if (!matched) {
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
        flushOl();
        const text = line.slice(2);
        elements.push(<li key={`li-${keyIndex++}`} className="text-slate-200 ml-4 mb-1.5 list-none pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-blue-400 before:font-bold"><InlineText text={text} /></li>);
      } else if (/^\d+\.\s/.test(line)) {
        const text = line.replace(/^\d+\.\s/, "");
        olItems.push(<li key={`oli-${keyIndex++}`} className="text-slate-200 mb-1.5"><InlineText text={text} /></li>);
      }
      // Styled divider (---)
      else if (line.trim() === "---") {
        flushOl();
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
        flushOl();
        try {
          const guidedSteps: string[] = [];
          let guidedTitle = "";
          let guidedResult = "";
          let gi = lineIndex + 1;
          while (gi < lines.length && lines[gi].trim() !== "[GUIDED_END]") {
            const gl = lines[gi].trim();
            if (gl.startsWith("TITLE:")) {
              guidedTitle = gl.slice(6).trim();
              gi++;
            } else if (gl === "[STEP]") {
              gi++;
              let stepContent = "";
              while (gi < lines.length) {
                const sl = lines[gi].trim();
                if (sl === "[STEP]" || sl === "[RESULT]" || sl === "[GUIDED_END]") break;
                stepContent += (stepContent ? "\n" : "") + lines[gi];
                gi++;
              }
              guidedSteps.push(stepContent.trim());
            } else if (gl === "[RESULT]") {
              gi++;
              let resultContent = "";
              while (gi < lines.length) {
                if (lines[gi].trim() === "[GUIDED_END]") break;
                resultContent += (resultContent ? "\n" : "") + lines[gi];
                gi++;
              }
              guidedResult = resultContent.trim();
            } else {
              gi++;
            }
          }
          for (let skip = lineIndex; skip <= gi; skip++) {
            skipLines.add(skip);
          }
          if (guidedSteps.length > 0 && guidedResult) {
            elements.push(
              <GuidedExercise key={`guided-${keyIndex++}`} title={guidedTitle} steps={guidedSteps} result={guidedResult} />
            );
          }
        } catch (e) {
          console.error("GuidedExercise parse error:", e);
        }
      }
      // Practice Exercises markers
      else if (line.trim() === "[PRACTICE_START]") {
        try {
          const practiceExercises: { question: string; answer: string }[] = [];
          let practiceTitle = "Übung";
          let pi = lineIndex + 1;
          while (pi < lines.length && lines[pi].trim() !== "[PRACTICE_END]") {
            const pl = lines[pi].trim();
            if (pl.startsWith("TITLE:")) {
              practiceTitle = pl.slice(6).trim();
              pi++;
            } else if (pl === "[Q]") {
              pi++;
              let question = "";
              while (pi < lines.length && lines[pi].trim() !== "[A]" && lines[pi].trim() !== "[PRACTICE_END]") {
                question += (question ? " " : "") + lines[pi].trim();
                pi++;
              }
              if (pi < lines.length && lines[pi].trim() === "[A]") pi++;
              let answer = "";
              while (pi < lines.length && lines[pi].trim() !== "[Q]" && lines[pi].trim() !== "[PRACTICE_END]") {
                answer += (answer ? " " : "") + lines[pi].trim();
                pi++;
              }
              if (question && answer) {
                practiceExercises.push({ question: question.trim(), answer: answer.trim() });
              }
              pi--;
            }
            pi++;
          }
          for (let skip = lineIndex; skip <= pi; skip++) {
            skipLines.add(skip);
          }
          if (practiceExercises.length > 0) {
            elements.push(
              <PracticeExercises key={`practice-${keyIndex++}`} title={practiceTitle} exercises={practiceExercises} />
            );
          }
        } catch (e) {
          console.error("PracticeExercises parse error:", e);
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
        flushOl();
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
        flushOl();
        elements.push(<p key={`p-${keyIndex++}`} className="text-slate-200 mb-3 leading-relaxed"><InlineText text={line} /></p>);
      }
    }

    flushOl();
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
