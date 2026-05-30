// ============================================================================
// Skill Tree — Module Dependencies & Auto-Layout
// ============================================================================

export type NodeStatus = "completed" | "available" | "locked";

export interface SkillTreeNode {
  id: string;
  label: string;
  icon: string;
  category: "mathe" | "programmierung" | "ihk";
  tier: number;
  prerequisites: string[];
}

export interface SkillTreeEdge {
  from: string;
  to: string;
}

export interface NodePosition {
  x: number;
  y: number;
}

// ─── Knoten-Definitionen ────────────────────────────────────────────────────

export const skillTreeNodes: SkillTreeNode[] = [
  // ═══ MATHE ═══
  { id: "mathe-bruchrechnen", label: "Bruchrechnen", icon: "🔢", category: "mathe", tier: 1, prerequisites: [] },
  { id: "mathe-termumformung", label: "Termumformung", icon: "📝", category: "mathe", tier: 1, prerequisites: [] },
  { id: "mathe-mengenlehre", label: "Mengenlehre & Logik", icon: "🧠", category: "mathe", tier: 1, prerequisites: [] },

  { id: "mathe-gleichungen", label: "Gleichungen", icon: "⚖️", category: "mathe", tier: 2, prerequisites: ["mathe-bruchrechnen"] },
  { id: "mathe-potenzen", label: "Potenzen & Logarithmen", icon: "📈", category: "mathe", tier: 2, prerequisites: ["mathe-termumformung"] },
  { id: "mathe-dreisatz", label: "Dreisatz", icon: "📐", category: "mathe", tier: 2, prerequisites: ["mathe-bruchrechnen"] },

  { id: "mathe-ungleichungen", label: "Ungleichungen", icon: "≠", category: "mathe", tier: 3, prerequisites: ["mathe-gleichungen", "mathe-termumformung"] },
  { id: "mathe-funktionen", label: "Funktionen", icon: "📉", category: "mathe", tier: 3, prerequisites: ["mathe-potenzen", "mathe-gleichungen"] },
  { id: "mathe-prozent", label: "Prozent & Zinsen", icon: "💰", category: "mathe", tier: 3, prerequisites: ["mathe-gleichungen"] },
  { id: "mathe-komplexe", label: "Komplexe Zahlen", icon: "ℂ", category: "mathe", tier: 3, prerequisites: ["mathe-gleichungen"] },

  { id: "mathe-grenzwerte", label: "Grenzwerte", icon: "🎯", category: "mathe", tier: 4, prerequisites: ["mathe-funktionen"] },
  { id: "mathe-trigonometrie", label: "Trigonometrie", icon: "📏", category: "mathe", tier: 4, prerequisites: ["mathe-funktionen"] },
  { id: "mathe-geometrie", label: "Geometrie", icon: "📐", category: "mathe", tier: 4, prerequisites: ["mathe-gleichungen"] },

  { id: "mathe-ableitungen", label: "Differentialrechnung", icon: "∂", category: "mathe", tier: 5, prerequisites: ["mathe-grenzwerte"] },
  { id: "mathe-integration", label: "Integralrechnung", icon: "∫", category: "mathe", tier: 5, prerequisites: ["mathe-grenzwerte", "mathe-potenzen"] },
  { id: "mathe-stochastik", label: "Wahrscheinlichkeit", icon: "🎲", category: "mathe", tier: 5, prerequisites: ["mathe-mengenlehre", "mathe-bruchrechnen"] },

  { id: "mathe-reihen", label: "Reihen", icon: "Σ", category: "mathe", tier: 6, prerequisites: ["mathe-integration"] },
  { id: "mathe-kurvendiskussion", label: "Kurvendiskussion", icon: "📊", category: "mathe", tier: 6, prerequisites: ["mathe-ableitungen"] },
  { id: "mathe-statistik", label: "Statistik", icon: "📊", category: "mathe", tier: 6, prerequisites: ["mathe-stochastik"] },
  { id: "mathe-kombinatorik", label: "Kombinatorik", icon: "🔀", category: "mathe", tier: 6, prerequisites: ["mathe-stochastik"] },

  { id: "mathe-taylor", label: "Taylorreihen", icon: "∞", category: "mathe", tier: 7, prerequisites: ["mathe-reihen", "mathe-ableitungen"] },
  { id: "mathe-folgen", label: "Folgen", icon: "→", category: "mathe", tier: 7, prerequisites: ["mathe-reihen"] },
  { id: "mathe-dgl", label: "Differentialgleichungen", icon: "ƒ'", category: "mathe", tier: 7, prerequisites: ["mathe-ableitungen", "mathe-integration"] },
  { id: "mathe-verteilungen", label: "Verteilungen", icon: "🔔", category: "mathe", tier: 7, prerequisites: ["mathe-statistik"] },
  { id: "mathe-numerik", label: "Numerik", icon: "🖥️", category: "mathe", tier: 7, prerequisites: ["mathe-ableitungen"] },

  { id: "mathe-vektoren", label: "Vektoren", icon: "➡️", category: "mathe", tier: 8, prerequisites: [] },
  { id: "mathe-lgs", label: "Lineare Gleichungssysteme", icon: "⊞", category: "mathe", tier: 8, prerequisites: ["mathe-gleichungen", "mathe-vektoren"] },

  { id: "mathe-matrizen", label: "Matrizen", icon: "▦", category: "mathe", tier: 9, prerequisites: ["mathe-lgs", "mathe-vektoren"] },
  { id: "mathe-anageo", label: "Analytische Geometrie", icon: "📐", category: "mathe", tier: 9, prerequisites: ["mathe-vektoren", "mathe-matrizen"] },

  // ═══ PROGRAMMIERUNG ═══
  { id: "react", label: "React", icon: "⚛️", category: "programmierung", tier: 1, prerequisites: [] },
  { id: "typescript", label: "TypeScript", icon: "📘", category: "programmierung", tier: 2, prerequisites: ["react"] },
  { id: "nextjs", label: "Next.js", icon: "▲", category: "programmierung", tier: 3, prerequisites: ["typescript"] },

  // ═══ IHK ═══
  { id: "ihk-diagramme", label: "Diagramme", icon: "📊", category: "ihk", tier: 1, prerequisites: [] },
  { id: "ihk-netzwerk", label: "Netzwerktechnik", icon: "🌐", category: "ihk", tier: 1, prerequisites: [] },
  { id: "ihk-datenbanken", label: "Datenbanken", icon: "🗄️", category: "ihk", tier: 1, prerequisites: [] },
  { id: "ihk-computersysteme", label: "Computersysteme", icon: "🖥️", category: "ihk", tier: 1, prerequisites: [] },

  { id: "ihk-sicherheit", label: "IT-Sicherheit", icon: "🔒", category: "ihk", tier: 2, prerequisites: ["ihk-netzwerk"] },
  { id: "ihk-git", label: "Git", icon: "🔀", category: "ihk", tier: 2, prerequisites: [] },
  { id: "ihk-ux", label: "UX Design", icon: "🎨", category: "ihk", tier: 2, prerequisites: [] },

  { id: "ihk-projektmanagement", label: "Projektmanagement", icon: "📋", category: "ihk", tier: 3, prerequisites: ["ihk-git"] },
  { id: "ihk-qualitaet", label: "Qualitätsstandards", icon: "✅", category: "ihk", tier: 3, prerequisites: ["ihk-git"] },
  { id: "ihk-docker", label: "Docker", icon: "🐳", category: "ihk", tier: 3, prerequisites: ["ihk-computersysteme", "ihk-netzwerk"] },

  { id: "ihk-erwprog", label: "Erw. Programmierung", icon: "🔧", category: "ihk", tier: 4, prerequisites: ["ihk-qualitaet"] },
];

// ─── Kanten berechnen ───────────────────────────────────────────────────────

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

export function getNodeStatus(node: SkillTreeNode, completedModules: string[]): NodeStatus {
  if (completedModules.includes(node.id)) return "completed";
  if (node.prerequisites.length === 0) return "available";
  const allPrereqsMet = node.prerequisites.every(p => completedModules.includes(p));
  return allPrereqsMet ? "available" : "locked";
}

// ─── Auto-Layout ────────────────────────────────────────────────────────────

const CATEGORY_ANGLES: Record<string, number> = {
  mathe: 180,        // nach links
  programmierung: 45, // nach rechts-oben
  ihk: 315,          // nach rechts-unten
};

const TIER_SPACING = 180;
const NODE_SPACING = 160;

export function calculateLayout(nodes: SkillTreeNode[], category: string): Map<string, NodePosition> {
  const positions = new Map<string, NodePosition>();
  const categoryNodes = nodes.filter(n => n.category === category);

  // Gruppiere nach Tier
  const tiers = new Map<number, SkillTreeNode[]>();
  for (const node of categoryNodes) {
    if (!tiers.has(node.tier)) tiers.set(node.tier, []);
    tiers.get(node.tier)!.push(node);
  }

  const baseAngle = CATEGORY_ANGLES[category] || 180;
  const angleSpread = 70; // Grad

  for (const [tier, tierNodes] of tiers) {
    const radius = tier * TIER_SPACING;
    const count = tierNodes.length;

    tierNodes.forEach((node, i) => {
      let angle: number;
      if (count === 1) {
        angle = baseAngle;
      } else {
        // Verteile gleichmäßig im Winkel-Bereich
        const t = count > 1 ? i / (count - 1) : 0.5;
        angle = baseAngle - angleSpread / 2 + t * angleSpread;
      }

      const angleRad = (angle * Math.PI) / 180;
      positions.set(node.id, {
        x: radius * Math.cos(angleRad),
        y: radius * Math.sin(angleRad),
      });
    });
  }

  return positions;
}

// ─── Kategorie-Filter ───────────────────────────────────────────────────────

export function filterByCategory(nodes: SkillTreeNode[], category: string | null): SkillTreeNode[] {
  if (!category || category === "alle") return nodes;
  return nodes.filter(n => n.category === category);
}
