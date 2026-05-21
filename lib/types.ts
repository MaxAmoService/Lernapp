export interface LessonVisual {
  type: "triangle" | "circle" | "rectangle" | "square" | "trapezoid" | "parallelogram" | "cube" | "cuboid" | "sphere" | "cylinder" | "cone" | "pyramid" | "coordinate2d" | "coordinate3d" | "functionGraph" | "unitCircle" | "papSymbols" | "papExample" | "struktSeq" | "struktIfElse" | "struktWhile" | "struktFor" | "struktBubbleSort";
  props?: Record<string, unknown>;
  position?: "top" | "bottom";
}

export type InteractiveType = "functionExplorer" | "tangentExplorer" | "integralExplorer" | "unitCircleInteractive" | "vectorExplorer" | "codeSandbox" | "papBuilder" | "pseudocodeRunner" | "struktogrammBuilder" | "sortVisualizer" | "searchVisualizer" | "epkBuilder" | "umlClassDiagram" | "sequenceDiagram" | "netzplanBuilder" | "networkBuilder" | "subnetCalculator" | "subnettingTrainer" | "osiExplorer" | "protocolAnalyzer" | "macConverter" | "packetJourney" | "ethernetFrameBuilder" | "arpSimulator" | "vlanExplorer" | "osiCapsuleViewer" | "tcpHandshakeSimulator" | "dhcpExplorer" | "dnsLookup" | "firewallRuleBuilder" | "wlanConfigurator" | "cableComparer" | "mailJourney" | "httpRequestVisualizer" | "encryptionDemo" | "vpnTunnelVisualizer" | "relationalModelExplorer" | "erDiagramBuilder" | "normalisationTrainer" | "sqlPlayground" | "joinVisualizer" | "dbPlanningPhases";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "text" | "interactive" | "quiz" | "exercises";
  content: string;
  codeExample?: string;
  visuals?: LessonVisual[];
  interactive?: InteractiveType;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  category: string;
  lessons: Lesson[];
  merkblatt?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subCategories?: { id: string; name: string; description: string }[];
}

export interface QuizQuestion {
  question: string;
  type: "multiple" | "input";
  options?: string[];
  correct: number | string;
  explanation: string;
  hint?: string;
  mathNotation?: string;
}
