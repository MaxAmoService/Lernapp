// ============================================================================
// Skill Tree — Vereinfachtes Layout (1 Verbindung pro Modul)
// ============================================================================

export type NodeStatus = "completed" | "in-progress" | "not-started";

export interface SkillTreeNode {
  id: string;
  label: string;
  icon: string;
  category: "mathe" | "programmierung" | "ihk";
  x: number;
  y: number;
  prerequisite: string | null;  // NUR EINE Haupt-Abhängigkeit
}

export interface NodePosition { x: number; y: number }

// ─── Layout ─────────────────────────────────────────────────────────────────

const C = 200;  // Spalten-Abstand
const R = 90;   // Zeilen-Abstand

export const skillTreeNodes: SkillTreeNode[] = [
  // ═══ MATHE — Reihe 0: Analysis-Hauptpfad ═══
  { id: "mathe-bruchrechnen", label: "Bruchrechnen", icon: "🔢", category: "mathe", x: 0, y: 0, prerequisite: null },
  { id: "mathe-gleichungen", label: "Gleichungen", icon: "⚖️", category: "mathe", x: C, y: 0, prerequisite: "mathe-bruchrechnen" },
  { id: "mathe-ungleichungen", label: "Ungleichungen", icon: "≠", category: "mathe", x: 2*C, y: 0, prerequisite: "mathe-gleichungen" },
  { id: "mathe-grenzwerte", label: "Grenzwerte", icon: "🎯", category: "mathe", x: 3*C, y: 0, prerequisite: "mathe-funktionen" },
  { id: "mathe-ableitungen", label: "Ableitungen", icon: "∂", category: "mathe", x: 4*C, y: 0, prerequisite: "mathe-grenzwerte" },
  { id: "mathe-kurvendiskussion", label: "Kurvendiskussion", icon: "📊", category: "mathe", x: 5*C, y: 0, prerequisite: "mathe-ableitungen" },
  { id: "mathe-taylor", label: "Taylorreihen", icon: "∞", category: "mathe", x: 6*C, y: 0, prerequisite: "mathe-reihen" },

  // ═══ MATHE — Reihe 1: Analysis-Nebenpfad ═══
  { id: "mathe-termumformung", label: "Termumformung", icon: "📝", category: "mathe", x: 0, y: R, prerequisite: null },
  { id: "mathe-potenzen", label: "Potenzen & Log.", icon: "📈", category: "mathe", x: C, y: R, prerequisite: "mathe-termumformung" },
  { id: "mathe-funktionen", label: "Funktionen", icon: "📉", category: "mathe", x: 2*C, y: R, prerequisite: "mathe-potenzen" },
  { id: "mathe-trigonometrie", label: "Trigonometrie", icon: "📏", category: "mathe", x: 3*C, y: R, prerequisite: "mathe-funktionen" },
  { id: "mathe-integration", label: "Integration", icon: "∫", category: "mathe", x: 4*C, y: R, prerequisite: "mathe-grenzwerte" },
  { id: "mathe-reihen", label: "Reihen", icon: "Σ", category: "mathe", x: 5*C, y: R, prerequisite: "mathe-integration" },
  { id: "mathe-dgl", label: "Differentialgl.", icon: "ƒ'", category: "mathe", x: 6*C, y: R, prerequisite: "mathe-ableitungen" },

  // ═══ MATHE — Reihe 2: Stochastik & Geometrie ═══
  { id: "mathe-mengenlehre", label: "Mengen & Logik", icon: "🧠", category: "mathe", x: 0, y: 2*R, prerequisite: null },
  { id: "mathe-dreisatz", label: "Dreisatz", icon: "📐", category: "mathe", x: C, y: 2*R, prerequisite: "mathe-bruchrechnen" },
  { id: "mathe-geometrie", label: "Geometrie", icon: "📐", category: "mathe", x: 2*C, y: 2*R, prerequisite: "mathe-gleichungen" },
  { id: "mathe-stochastik", label: "Wahrscheinlichkeit", icon: "🎲", category: "mathe", x: 3*C, y: 2*R, prerequisite: "mathe-mengenlehre" },
  { id: "mathe-statistik", label: "Statistik", icon: "📊", category: "mathe", x: 4*C, y: 2*R, prerequisite: "mathe-stochastik" },
  { id: "mathe-verteilungen", label: "Verteilungen", icon: "🔔", category: "mathe", x: 5*C, y: 2*R, prerequisite: "mathe-statistik" },
  { id: "mathe-numerik", label: "Numerik", icon: "🖥️", category: "mathe", x: 6*C, y: 2*R, prerequisite: "mathe-ableitungen" },

  // ═══ MATHE — Reihe 3: Ergänzungen ═══
  { id: "mathe-prozent", label: "Prozent & Zinsen", icon: "💰", category: "mathe", x: C, y: 3*R, prerequisite: "mathe-bruchrechnen" },
  { id: "mathe-komplexe", label: "Komplexe Zahlen", icon: "ℂ", category: "mathe", x: 2*C, y: 3*R, prerequisite: "mathe-gleichungen" },
  { id: "mathe-kombinatorik", label: "Kombinatorik", icon: "🔀", category: "mathe", x: 4*C, y: 3*R, prerequisite: "mathe-stochastik" },
  { id: "mathe-folgen", label: "Folgen", icon: "→", category: "mathe", x: 5*C, y: 3*R, prerequisite: "mathe-reihen" },

  // ═══ MATHE — Reihe 4: Lineare Algebra ═══
  { id: "mathe-vektoren", label: "Vektoren", icon: "➡️", category: "mathe", x: 4*C, y: 4*R, prerequisite: null },
  { id: "mathe-lgs", label: "LGS", icon: "⊞", category: "mathe", x: 5*C, y: 4*R, prerequisite: "mathe-vektoren" },
  { id: "mathe-matrizen", label: "Matrizen", icon: "▦", category: "mathe", x: 6*C, y: 4*R, prerequisite: "mathe-lgs" },
  { id: "mathe-anageo", label: "Analyt. Geometrie", icon: "📐", category: "mathe", x: 7*C, y: 4*R, prerequisite: "mathe-matrizen" },

  // ═══ PROGRAMMIERUNG ═══
  { id: "react", label: "React", icon: "⚛️", category: "programmierung", x: 0, y: 0, prerequisite: null },
  { id: "typescript", label: "TypeScript", icon: "📘", category: "programmierung", x: C, y: 0, prerequisite: "react" },
  { id: "nextjs", label: "Next.js", icon: "▲", category: "programmierung", x: 2*C, y: 0, prerequisite: "typescript" },

  // ═══ IHK ═══
  { id: "ihk-diagramme", label: "Diagramme", icon: "📊", category: "ihk", x: 0, y: 0, prerequisite: null },
  { id: "ihk-netzwerk", label: "Netzwerktechnik", icon: "🌐", category: "ihk", x: 0, y: R, prerequisite: null },
  { id: "ihk-datenbanken", label: "Datenbanken", icon: "🗄️", category: "ihk", x: 0, y: 2*R, prerequisite: null },
  { id: "ihk-computersysteme", label: "Computersysteme", icon: "🖥️", category: "ihk", x: 0, y: 3*R, prerequisite: null },

  { id: "ihk-sicherheit", label: "IT-Sicherheit", icon: "🔒", category: "ihk", x: C, y: 0.5*R, prerequisite: "ihk-netzwerk" },
  { id: "ihk-git", label: "Git", icon: "🔀", category: "ihk", x: C, y: 1.5*R, prerequisite: null },
  { id: "ihk-ux", label: "UX Design", icon: "🎨", category: "ihk", x: C, y: 2.5*R, prerequisite: null },

  { id: "ihk-projektmanagement", label: "Projektmanagement", icon: "📋", category: "ihk", x: 2*C, y: R, prerequisite: "ihk-git" },
  { id: "ihk-qualitaet", label: "Qualitätsstandards", icon: "✅", category: "ihk", x: 2*C, y: 2*R, prerequisite: "ihk-git" },
  { id: "ihk-docker", label: "Docker", icon: "🐳", category: "ihk", x: 2*C, y: 3*R, prerequisite: "ihk-computersysteme" },

  { id: "ihk-erwprog", label: "Erw. Programmierung", icon: "🔧", category: "ihk", x: 3*C, y: 1.5*R, prerequisite: "ihk-qualitaet" },
];

// ─── Status ─────────────────────────────────────────────────────────────────

export function getNodeStatus(
  node: SkillTreeNode,
  completedModules: string[],
  completedLessons: Record<string, string[]>
): NodeStatus {
  if (completedModules.includes(node.id)) return "completed";
  const l = completedLessons[node.id];
  if (l && l.length > 0) return "in-progress";
  return "not-started";
}

// ─── Kanten ─────────────────────────────────────────────────────────────────

export interface SkillTreeEdge {
  from: string;
  to: string;
}

export function getEdges(nodes: SkillTreeNode[]): SkillTreeEdge[] {
  return nodes
    .filter(n => n.prerequisite !== null)
    .map(n => ({ from: n.prerequisite!, to: n.id }));
}

// ─── Positionen ─────────────────────────────────────────────────────────────

export function getPositions(nodes: SkillTreeNode[]): Map<string, NodePosition> {
  const map = new Map<string, NodePosition>();
  for (const n of nodes) map.set(n.id, { x: n.x, y: n.y });
  return map;
}

export const NODE_W = 160;
export const NODE_H = 60;
