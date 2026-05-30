// ============================================================================
// Skill Tree — Etagen-basiert (von oben nach unten)
// ============================================================================

export type NodeStatus = "completed" | "in-progress" | "not-started";

export interface SkillTreeNode {
  id: string;
  label: string;
  icon: string;
  category: "mathe" | "programmierung" | "ihk";
  col: number;           // Spalte (0, 1, 2, ...)
  row: number;           // Reihe / Etage (0 = oben, 1 = darunter, ...)
  prerequisite: string | null;
}

export interface NodePosition { x: number; y: number }

// ─── Layout ─────────────────────────────────────────────────────────────────

const COL_W = 200;  // Spalten-Abstand
const ROW_H = 110;  // Zeilen-Abstand

export const skillTreeNodes: SkillTreeNode[] = [
  // ═══ MATHE ═══
  // Etage 0: Grundlagen
  { id: "mathe-bruchrechnen", label: "Bruchrechnen", icon: "🔢", category: "mathe", col: 0, row: 0, prerequisite: null },
  { id: "mathe-termumformung", label: "Termumformung", icon: "📝", category: "mathe", col: 1, row: 0, prerequisite: null },
  { id: "mathe-mengenlehre", label: "Mengen & Logik", icon: "🧠", category: "mathe", col: 2, row: 0, prerequisite: null },

  // Etage 1
  { id: "mathe-gleichungen", label: "Gleichungen", icon: "⚖️", category: "mathe", col: 0, row: 1, prerequisite: "mathe-bruchrechnen" },
  { id: "mathe-potenzen", label: "Potenzen & Log.", icon: "📈", category: "mathe", col: 1, row: 1, prerequisite: "mathe-termumformung" },
  { id: "mathe-dreisatz", label: "Dreisatz", icon: "📐", category: "mathe", col: 2, row: 1, prerequisite: "mathe-bruchrechnen" },
  { id: "mathe-prozent", label: "Prozent & Zinsen", icon: "💰", category: "mathe", col: 3, row: 1, prerequisite: "mathe-bruchrechnen" },

  // Etage 2
  { id: "mathe-ungleichungen", label: "Ungleichungen", icon: "≠", category: "mathe", col: 0, row: 2, prerequisite: "mathe-gleichungen" },
  { id: "mathe-funktionen", label: "Funktionen", icon: "📉", category: "mathe", col: 1, row: 2, prerequisite: "mathe-potenzen" },
  { id: "mathe-geometrie", label: "Geometrie", icon: "📐", category: "mathe", col: 2, row: 2, prerequisite: "mathe-gleichungen" },
  { id: "mathe-komplexe", label: "Komplexe Zahlen", icon: "ℂ", category: "mathe", col: 3, row: 2, prerequisite: "mathe-gleichungen" },
  { id: "mathe-stochastik", label: "Wahrscheinlichkeit", icon: "🎲", category: "mathe", col: 4, row: 2, prerequisite: "mathe-mengenlehre" },

  // Etage 3
  { id: "mathe-grenzwerte", label: "Grenzwerte", icon: "🎯", category: "mathe", col: 0, row: 3, prerequisite: "mathe-funktionen" },
  { id: "mathe-trigonometrie", label: "Trigonometrie", icon: "📏", category: "mathe", col: 1, row: 3, prerequisite: "mathe-funktionen" },
  { id: "mathe-statistik", label: "Statistik", icon: "📊", category: "mathe", col: 3, row: 3, prerequisite: "mathe-stochastik" },
  { id: "mathe-kombinatorik", label: "Kombinatorik", icon: "🔀", category: "mathe", col: 4, row: 3, prerequisite: "mathe-stochastik" },

  // Etage 4
  { id: "mathe-ableitungen", label: "Ableitungen", icon: "∂", category: "mathe", col: 0, row: 4, prerequisite: "mathe-grenzwerte" },
  { id: "mathe-integration", label: "Integration", icon: "∫", category: "mathe", col: 1, row: 4, prerequisite: "mathe-grenzwerte" },
  { id: "mathe-verteilungen", label: "Verteilungen", icon: "🔔", category: "mathe", col: 3, row: 4, prerequisite: "mathe-statistik" },
  { id: "mathe-numerik", label: "Numerik", icon: "🖥️", category: "mathe", col: 4, row: 4, prerequisite: "mathe-ableitungen" },

  // Etage 5
  { id: "mathe-kurvendiskussion", label: "Kurvendiskussion", icon: "📊", category: "mathe", col: 0, row: 5, prerequisite: "mathe-ableitungen" },
  { id: "mathe-reihen", label: "Reihen", icon: "Σ", category: "mathe", col: 1, row: 5, prerequisite: "mathe-integration" },
  { id: "mathe-dgl", label: "Differentialgl.", icon: "ƒ'", category: "mathe", col: 2, row: 5, prerequisite: "mathe-ableitungen" },

  // Etage 6
  { id: "mathe-taylor", label: "Taylorreihen", icon: "∞", category: "mathe", col: 0, row: 6, prerequisite: "mathe-reihen" },
  { id: "mathe-folgen", label: "Folgen", icon: "→", category: "mathe", col: 1, row: 6, prerequisite: "mathe-reihen" },

  // Etage 7: Lineare Algebra
  { id: "mathe-vektoren", label: "Vektoren", icon: "➡️", category: "mathe", col: 3, row: 7, prerequisite: null },
  { id: "mathe-lgs", label: "LGS", icon: "⊞", category: "mathe", col: 4, row: 7, prerequisite: "mathe-vektoren" },

  // Etage 8
  { id: "mathe-matrizen", label: "Matrizen", icon: "▦", category: "mathe", col: 4, row: 8, prerequisite: "mathe-lgs" },
  { id: "mathe-anageo", label: "Analyt. Geometrie", icon: "📐", category: "mathe", col: 5, row: 8, prerequisite: "mathe-matrizen" },

  // ═══ PROGRAMMIERUNG ═══
  { id: "react", label: "React", icon: "⚛️", category: "programmierung", col: 0, row: 0, prerequisite: null },
  { id: "typescript", label: "TypeScript", icon: "📘", category: "programmierung", col: 0, row: 1, prerequisite: "react" },
  { id: "nextjs", label: "Next.js", icon: "▲", category: "programmierung", col: 0, row: 2, prerequisite: "typescript" },

  // ═══ IHK ═══
  // Etage 0: Grundlagen
  { id: "ihk-diagramme", label: "Diagramme", icon: "📊", category: "ihk", col: 0, row: 0, prerequisite: null },
  { id: "ihk-netzwerk", label: "Netzwerktechnik", icon: "🌐", category: "ihk", col: 1, row: 0, prerequisite: null },
  { id: "ihk-datenbanken", label: "Datenbanken", icon: "🗄️", category: "ihk", col: 2, row: 0, prerequisite: null },
  { id: "ihk-computersysteme", label: "Computersysteme", icon: "🖥️", category: "ihk", col: 3, row: 0, prerequisite: null },

  // Etage 1
  { id: "ihk-sicherheit", label: "IT-Sicherheit", icon: "🔒", category: "ihk", col: 0, row: 1, prerequisite: "ihk-netzwerk" },
  { id: "ihk-git", label: "Git", icon: "🔀", category: "ihk", col: 1, row: 1, prerequisite: null },
  { id: "ihk-ux", label: "UX Design", icon: "🎨", category: "ihk", col: 2, row: 1, prerequisite: null },
  { id: "ihk-docker", label: "Docker", icon: "🐳", category: "ihk", col: 3, row: 1, prerequisite: "ihk-computersysteme" },

  // Etage 2
  { id: "ihk-projektmanagement", label: "Projektmanagement", icon: "📋", category: "ihk", col: 0, row: 2, prerequisite: "ihk-git" },
  { id: "ihk-qualitaet", label: "Qualitätsstandards", icon: "✅", category: "ihk", col: 1, row: 2, prerequisite: "ihk-git" },

  // Etage 3
  { id: "ihk-erwprog", label: "Erw. Programmierung", icon: "🔧", category: "ihk", col: 0, row: 3, prerequisite: "ihk-qualitaet" },
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
  for (const n of nodes) {
    map.set(n.id, { x: n.col * COL_W, y: n.row * ROW_H });
  }
  return map;
}

export const NODE_W = 160;
export const NODE_H = 60;
export { COL_W, ROW_H };
