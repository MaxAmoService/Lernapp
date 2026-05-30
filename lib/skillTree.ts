// ============================================================================
// Skill Tree — Module Dependencies & Layout (PoE2-inspiriert)
// ============================================================================

export interface SkillTreeNode {
  id: string;           // module slug
  label: string;
  icon: string;
  category: "mathe" | "programmierung" | "ihk";
  tier: number;         // 0 = Start, 1-9 = Distanz vom Start
  angle: number;        // 0-360° Position auf dem Ring
  prerequisites: string[];  // slugs der vorausgesetzten Module
}

// ─── Knoten-Definitionen ────────────────────────────────────────────────────

export const skillTreeNodes: SkillTreeNode[] = [
  // ═══ MATHEMATIK (links-oben, 180°-300°) ═══
  // Ebene 0 — Grundlagen
  { id: "mathe-bruchrechnen", label: "Bruchrechnen", icon: "🔢", category: "mathe", tier: 1, angle: 210, prerequisites: [] },
  { id: "mathe-termumformung", label: "Termumformung", icon: "📝", category: "mathe", tier: 1, angle: 250, prerequisites: [] },
  { id: "mathe-mengenlehre", label: "Mengenlehre & Logik", icon: "🧠", category: "mathe", tier: 1, angle: 190, prerequisites: [] },

  // Ebene 1
  { id: "mathe-gleichungen", label: "Gleichungen", icon: "⚖️", category: "mathe", tier: 2, angle: 200, prerequisites: ["mathe-bruchrechnen"] },
  { id: "mathe-potenzen", label: "Potenzen & Logarithmen", icon: "📈", category: "mathe", tier: 2, angle: 240, prerequisites: ["mathe-termumformung"] },
  { id: "mathe-dreisatz", label: "Dreisatz", icon: "📐", category: "mathe", tier: 2, angle: 220, prerequisites: ["mathe-bruchrechnen"] },

  // Ebene 2
  { id: "mathe-ungleichungen", label: "Ungleichungen", icon: "≠", category: "mathe", tier: 3, angle: 210, prerequisites: ["mathe-gleichungen", "mathe-termumformung"] },
  { id: "mathe-funktionen", label: "Funktionen", icon: "📉", category: "mathe", tier: 3, angle: 240, prerequisites: ["mathe-potenzen", "mathe-gleichungen"] },
  { id: "mathe-prozent", label: "Prozent & Zinsen", icon: "💰", category: "mathe", tier: 3, angle: 260, prerequisites: ["mathe-gleichungen"] },

  // Ebene 3 — Analysis
  { id: "mathe-grenzwerte", label: "Grenzwerte", icon: "🎯", category: "mathe", tier: 4, angle: 230, prerequisites: ["mathe-funktionen"] },
  { id: "mathe-trigonometrie", label: "Trigonometrie", icon: "📏", category: "mathe", tier: 4, angle: 250, prerequisites: ["mathe-funktionen"] },
  { id: "mathe-geometrie", label: "Geometrie", icon: "📐", category: "mathe", tier: 4, angle: 210, prerequisites: ["mathe-gleichungen"] },

  // Ebene 4
  { id: "mathe-ableitungen", label: "Differentialrechnung", icon: "∂", category: "mathe", tier: 5, angle: 220, prerequisites: ["mathe-grenzwerte"] },
  { id: "mathe-integration", label: "Integralrechnung", icon: "∫", category: "mathe", tier: 5, angle: 240, prerequisites: ["mathe-grenzwerte", "mathe-potenzen"] },

  // Ebene 5
  { id: "mathe-reihen", label: "Reihen", icon: "Σ", category: "mathe", tier: 6, angle: 230, prerequisites: ["mathe-integration"] },
  { id: "mathe-kurvendiskussion", label: "Kurvendiskussion", icon: "📊", category: "mathe", tier: 6, angle: 210, prerequisites: ["mathe-ableitungen"] },
  { id: "mathe-taylor", label: "Taylorreihen", icon: "∞", category: "mathe", tier: 6, angle: 250, prerequisites: ["mathe-reihen", "mathe-ableitungen"] },

  // Ebene 6 — Lineare Algebra
  { id: "mathe-folgen", label: "Folgen", icon: "→", category: "mathe", tier: 7, angle: 240, prerequisites: ["mathe-reihen"] },
  { id: "mathe-dgl", label: "Differentialgleichungen", icon: "ƒ'", category: "mathe", tier: 7, angle: 220, prerequisites: ["mathe-ableitungen", "mathe-integration"] },
  { id: "mathe-vektoren", label: "Vektoren", icon: "➡️", category: "mathe", tier: 7, angle: 190, prerequisites: [] },
  { id: "mathe-lgs", label: "Lineare Gleichungssysteme", icon: "⊞", category: "mathe", tier: 7, angle: 200, prerequisites: ["mathe-gleichungen", "mathe-vektoren"] },

  // Ebene 7
  { id: "mathe-matrizen", label: "Matrizen", icon: "▦", category: "mathe", tier: 8, angle: 195, prerequisites: ["mathe-lgs", "mathe-vektoren"] },
  { id: "mathe-anageo", label: "Analytische Geometrie", icon: "📐", category: "mathe", tier: 8, angle: 210, prerequisites: ["mathe-vektoren", "mathe-matrizen"] },

  // Ebene 8 — Stochastik
  { id: "mathe-stochastik", label: "Wahrscheinlichkeit", icon: "🎲", category: "mathe", tier: 8, angle: 260, prerequisites: ["mathe-mengenlehre", "mathe-bruchrechnen"] },
  { id: "mathe-statistik", label: "Statistik", icon: "📊", category: "mathe", tier: 9, angle: 250, prerequisites: ["mathe-stochastik"] },
  { id: "mathe-kombinatorik", label: "Kombinatorik", icon: "🔀", category: "mathe", tier: 9, angle: 270, prerequisites: ["mathe-stochastik"] },
  { id: "mathe-verteilungen", label: "Verteilungen", icon: "🔔", category: "mathe", tier: 9, angle: 260, prerequisites: ["mathe-statistik", "mathe-stochastik"] },
  { id: "mathe-numerik", label: "Numerik", icon: "🖥️", category: "mathe", tier: 9, angle: 230, prerequisites: ["mathe-ableitungen"] },

  // ═══ PROGRAMMIERUNG (rechts-oben, 30°-90°) ═══
  { id: "react", label: "React", icon: "⚛️", category: "programmierung", tier: 1, angle: 50, prerequisites: [] },
  { id: "typescript", label: "TypeScript", icon: "📘", category: "programmierung", tier: 2, angle: 50, prerequisites: ["react"] },
  { id: "nextjs", label: "Next.js", icon: "▲", category: "programmierung", tier: 3, angle: 50, prerequisites: ["typescript"] },

  // ═══ IHK (unten, 120°-180°) ═══
  { id: "ihk-diagramme", label: "Diagramme", icon: "📊", category: "ihk", tier: 1, angle: 140, prerequisites: [] },
  { id: "ihk-netzwerk", label: "Netzwerktechnik", icon: "🌐", category: "ihk", tier: 1, angle: 160, prerequisites: [] },
  { id: "ihk-datenbanken", label: "Datenbanken", icon: "🗄️", category: "ihk", tier: 1, angle: 120, prerequisites: [] },
  { id: "ihk-computersysteme", label: "Computersysteme", icon: "🖥️", category: "ihk", tier: 1, angle: 100, prerequisites: [] },
  { id: "ihk-sicherheit", label: "IT-Sicherheit", icon: "🔒", category: "ihk", tier: 2, angle: 150, prerequisites: ["ihk-netzwerk"] },
  { id: "ihk-git", label: "Git", icon: "🔀", category: "ihk", tier: 2, angle: 130, prerequisites: [] },
  { id: "ihk-ux", label: "UX Design", icon: "🎨", category: "ihk", tier: 2, angle: 110, prerequisites: [] },
  { id: "ihk-projektmanagement", label: "Projektmanagement", icon: "📋", category: "ihk", tier: 3, angle: 140, prerequisites: ["ihk-git"] },
  { id: "ihk-qualitaet", label: "Qualitätsstandards", icon: "✅", category: "ihk", tier: 3, angle: 120, prerequisites: ["ihk-git"] },
  { id: "ihk-docker", label: "Docker", icon: "🐳", category: "ihk", tier: 3, angle: 100, prerequisites: ["ihk-computersysteme", "ihk-netzwerk"] },
  { id: "ihk-erwprog", label: "Erw. Programmierung", icon: "🔧", category: "ihk", tier: 4, angle: 130, prerequisites: ["ihk-qualitaet"] },
  { id: "mathe-komplexe", label: "Komplexe Zahlen", icon: "ℂ", category: "mathe", tier: 3, angle: 270, prerequisites: ["mathe-gleichungen"] },
];

// ─── Layout-Berechnung ──────────────────────────────────────────────────────

export function getNodePosition(node: SkillTreeNode, centerX: number, centerY: number, ringSpacing: number): { x: number; y: number } {
  const radius = node.tier * ringSpacing;
  const angleRad = (node.angle * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleRad),
    y: centerY + radius * Math.sin(angleRad),
  };
}

// ─── Kanten berechnen ───────────────────────────────────────────────────────

export interface SkillTreeEdge {
  from: string;
  to: string;
}

export function getEdges(nodes: SkillTreeNode[]): SkillTreeEdge[] {
  const edges: SkillTreeEdge[] = [];
  for (const node of nodes) {
    for (const prereq of node.prerequisites) {
      edges.push({ from: prereq, to: node.id });
    }
  }
  return edges;
}

// ─── Status-Berechnung ──────────────────────────────────────────────────────

export type NodeStatus = "completed" | "available" | "locked";

export function getNodeStatus(node: SkillTreeNode, completedModules: string[]): NodeStatus {
  if (completedModules.includes(node.id)) return "completed";
  if (node.prerequisites.length === 0) return "available";
  const allPrereqsMet = node.prerequisites.every(p => completedModules.includes(p));
  return allPrereqsMet ? "available" : "locked";
}

// ─── Kategorie-Filter ───────────────────────────────────────────────────────

export function filterByCategory(nodes: SkillTreeNode[], category: string | null): SkillTreeNode[] {
  if (!category || category === "alle") return nodes;
  return nodes.filter(n => n.category === category);
}
