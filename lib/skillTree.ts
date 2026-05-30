// ============================================================================
// Skill Tree — Manuell positioniertes Layout (keine Überlappung)
// ============================================================================

export type NodeStatus = "completed" | "in-progress" | "not-started";

export interface SkillTreeNode {
  id: string;
  label: string;
  icon: string;
  category: "mathe" | "programmierung" | "ihk";
  x: number;  // Pixel-Position (manuell)
  y: number;
  prerequisites: string[];
}

export interface NodePosition {
  x: number;
  y: number;
}

// ─── Layout-Konstanten ──────────────────────────────────────────────────────

const C = 200;  // Spalten-Abstand
const R = 100;  // Zeilen-Abstand

// ─── MATHE: Grid-Layout ─────────────────────────────────────────────────────
//
//  Spalte:  0     1       2         3        4         5          6        7       8
//  Reihe 0: Bruch → Gleich → Ungleich → Grenzw → Ableit → Kurvendis → Taylor
//  Reihe 1: Term  → Potenzen → Funkt → Trig → Integral → Reihen → DGL
//  Reihe 2: Meng  → Dreisatz → Geom → Stoch → Statistik → Vert → Numerik
//  Reihe 3:              Prozent → Komplex
//  Reihe 4:                              Vektor → LGS → Matrizen → AnGeo

export const skillTreeNodes: SkillTreeNode[] = [
  // ═══ MATHE — Reihe 0 (Analysis-Hauptpfad) ═══
  { id: "mathe-bruchrechnen", label: "Bruchrechnen", icon: "🔢", category: "mathe", x: 0, y: 0, prerequisites: [] },
  { id: "mathe-gleichungen", label: "Gleichungen", icon: "⚖️", category: "mathe", x: C, y: 0, prerequisites: ["mathe-bruchrechnen"] },
  { id: "mathe-ungleichungen", label: "Ungleichungen", icon: "≠", category: "mathe", x: 2*C, y: 0, prerequisites: ["mathe-gleichungen", "mathe-termumformung"] },
  { id: "mathe-grenzwerte", label: "Grenzwerte", icon: "🎯", category: "mathe", x: 3*C, y: 0, prerequisites: ["mathe-funktionen"] },
  { id: "mathe-ableitungen", label: "Ableitungen", icon: "∂", category: "mathe", x: 4*C, y: 0, prerequisites: ["mathe-grenzwerte"] },
  { id: "mathe-kurvendiskussion", label: "Kurvendiskussion", icon: "📊", category: "mathe", x: 5*C, y: 0, prerequisites: ["mathe-ableitungen"] },
  { id: "mathe-taylor", label: "Taylorreihen", icon: "∞", category: "mathe", x: 6*C, y: 0, prerequisites: ["mathe-reihen", "mathe-ableitungen"] },

  // ═══ MATHE — Reihe 1 (Analysis-Nebenpfad) ═══
  { id: "mathe-termumformung", label: "Termumformung", icon: "📝", category: "mathe", x: 0, y: R, prerequisites: [] },
  { id: "mathe-potenzen", label: "Potenzen & Log.", icon: "📈", category: "mathe", x: C, y: R, prerequisites: ["mathe-termumformung"] },
  { id: "mathe-funktionen", label: "Funktionen", icon: "📉", category: "mathe", x: 2*C, y: R, prerequisites: ["mathe-potenzen", "mathe-gleichungen"] },
  { id: "mathe-trigonometrie", label: "Trigonometrie", icon: "📏", category: "mathe", x: 3*C, y: R, prerequisites: ["mathe-funktionen"] },
  { id: "mathe-integration", label: "Integration", icon: "∫", category: "mathe", x: 4*C, y: R, prerequisites: ["mathe-grenzwerte", "mathe-potenzen"] },
  { id: "mathe-reihen", label: "Reihen", icon: "Σ", category: "mathe", x: 5*C, y: R, prerequisites: ["mathe-integration"] },
  { id: "mathe-dgl", label: "Differentialgl.", icon: "ƒ'", category: "mathe", x: 6*C, y: R, prerequisites: ["mathe-ableitungen", "mathe-integration"] },

  // ═══ MATHE — Reihe 2 (Stochastik + Geometrie) ═══
  { id: "mathe-mengenlehre", label: "Mengen & Logik", icon: "🧠", category: "mathe", x: 0, y: 2*R, prerequisites: [] },
  { id: "mathe-dreisatz", label: "Dreisatz", icon: "📐", category: "mathe", x: C, y: 2*R, prerequisites: ["mathe-bruchrechnen"] },
  { id: "mathe-geometrie", label: "Geometrie", icon: "📐", category: "mathe", x: 2*C, y: 2*R, prerequisites: ["mathe-gleichungen"] },
  { id: "mathe-stochastik", label: "Wahrscheinlichkeit", icon: "🎲", category: "mathe", x: 3*C, y: 2*R, prerequisites: ["mathe-mengenlehre", "mathe-bruchrechnen"] },
  { id: "mathe-statistik", label: "Statistik", icon: "📊", category: "mathe", x: 4*C, y: 2*R, prerequisites: ["mathe-stochastik"] },
  { id: "mathe-verteilungen", label: "Verteilungen", icon: "🔔", category: "mathe", x: 5*C, y: 2*R, prerequisites: ["mathe-statistik"] },
  { id: "mathe-numerik", label: "Numerik", icon: "🖥️", category: "mathe", x: 6*C, y: 2*R, prerequisites: ["mathe-ableitungen"] },

  // ═══ MATHE — Reihe 3 (Ergänzungen) ═══
  { id: "mathe-prozent", label: "Prozent & Zinsen", icon: "💰", category: "mathe", x: C, y: 3*R, prerequisites: ["mathe-bruchrechnen"] },
  { id: "mathe-komplexe", label: "Komplexe Zahlen", icon: "ℂ", category: "mathe", x: 2*C, y: 3*R, prerequisites: ["mathe-gleichungen"] },
  { id: "mathe-folgen", label: "Folgen", icon: "→", category: "mathe", x: 5*C, y: 3*R, prerequisites: ["mathe-reihen"] },

  // ═══ MATHE — Reihe 4 (Lineare Algebra) ═══
  { id: "mathe-kombinatorik", label: "Kombinatorik", icon: "🔀", category: "mathe", x: 4*C, y: 3*R, prerequisites: ["mathe-stochastik"] },
  { id: "mathe-vektoren", label: "Vektoren", icon: "➡️", category: "mathe", x: 4*C, y: 4*R, prerequisites: [] },
  { id: "mathe-lgs", label: "Lineare Gleichungssysteme", icon: "⊞", category: "mathe", x: 5*C, y: 4*R, prerequisites: ["mathe-gleichungen", "mathe-vektoren"] },
  { id: "mathe-matrizen", label: "Matrizen", icon: "▦", category: "mathe", x: 6*C, y: 4*R, prerequisites: ["mathe-lgs", "mathe-vektoren"] },
  { id: "mathe-anageo", label: "Analytische Geometrie", icon: "📐", category: "mathe", x: 7*C, y: 4*R, prerequisites: ["mathe-vektoren", "mathe-matrizen"] },

  // ═══ PROGRAMMIERUNG ═══
  { id: "react", label: "React", icon: "⚛️", category: "programmierung", x: 0, y: 0, prerequisites: [] },
  { id: "typescript", label: "TypeScript", icon: "📘", category: "programmierung", x: C, y: 0, prerequisites: ["react"] },
  { id: "nextjs", label: "Next.js", icon: "▲", category: "programmierung", x: 2*C, y: 0, prerequisites: ["typescript"] },

  // ═══ IHK ═══
  { id: "ihk-diagramme", label: "Diagramme", icon: "📊", category: "ihk", x: 0, y: 0, prerequisites: [] },
  { id: "ihk-netzwerk", label: "Netzwerktechnik", icon: "🌐", category: "ihk", x: 0, y: R, prerequisites: [] },
  { id: "ihk-datenbanken", label: "Datenbanken", icon: "🗄️", category: "ihk", x: 0, y: 2*R, prerequisites: [] },
  { id: "ihk-computersysteme", label: "Computersysteme", icon: "🖥️", category: "ihk", x: 0, y: 3*R, prerequisites: [] },

  { id: "ihk-sicherheit", label: "IT-Sicherheit", icon: "🔒", category: "ihk", x: C, y: 0.5*R, prerequisites: ["ihk-netzwerk"] },
  { id: "ihk-git", label: "Git", icon: "🔀", category: "ihk", x: C, y: 1.5*R, prerequisites: [] },
  { id: "ihk-ux", label: "UX Design", icon: "🎨", category: "ihk", x: C, y: 2.5*R, prerequisites: [] },

  { id: "ihk-projektmanagement", label: "Projektmanagement", icon: "📋", category: "ihk", x: 2*C, y: R, prerequisites: ["ihk-git"] },
  { id: "ihk-qualitaet", label: "Qualitätsstandards", icon: "✅", category: "ihk", x: 2*C, y: 2*R, prerequisites: ["ihk-git"] },
  { id: "ihk-docker", label: "Docker", icon: "🐳", category: "ihk", x: 2*C, y: 3*R, prerequisites: ["ihk-computersysteme", "ihk-netzwerk"] },

  { id: "ihk-erwprog", label: "Erw. Programmierung", icon: "🔧", category: "ihk", x: 3*C, y: 1.5*R, prerequisites: ["ihk-qualitaet"] },
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
  const edges: SkillTreeEdge[] = [];
  for (const node of nodes) {
    for (const p of node.prerequisites) {
      edges.push({ from: p, to: node.id });
    }
  }
  return edges;
}

// ─── Positionen abrufen ─────────────────────────────────────────────────────

export function getPositions(nodes: SkillTreeNode[]): Map<string, NodePosition> {
  const map = new Map<string, NodePosition>();
  for (const n of nodes) {
    map.set(n.id, { x: n.x, y: n.y });
  }
  return map;
}

// ─── Kategorie-Filter ───────────────────────────────────────────────────────

export function filterByCategory(nodes: SkillTreeNode[], category: string | null): SkillTreeNode[] {
  if (!category || category === "alle") return nodes;
  return nodes.filter(n => n.category === category);
}

export const NODE_W = 160;
export const NODE_H = 60;
