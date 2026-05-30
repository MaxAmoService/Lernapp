// ============================================================================
// Skill Tree — Horizontal Tech-Tree Layout
// ============================================================================

export type NodeStatus = "completed" | "in-progress" | "not-started";

export interface SkillTreeNode {
  id: string;
  label: string;
  icon: string;
  category: "mathe" | "programmierung" | "ihk";
  tier: number;         // Spalte (1 = links, 2 = daneben, ...)
  prerequisites: string[];
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
  { id: "mathe-prozent", label: "Prozent & Zinsen", icon: "💰", category: "mathe", tier: 2, prerequisites: ["mathe-bruchrechnen"] },

  { id: "mathe-ungleichungen", label: "Ungleichungen", icon: "≠", category: "mathe", tier: 3, prerequisites: ["mathe-gleichungen", "mathe-termumformung"] },
  { id: "mathe-funktionen", label: "Funktionen", icon: "📉", category: "mathe", tier: 3, prerequisites: ["mathe-potenzen", "mathe-gleichungen"] },
  { id: "mathe-geometrie", label: "Geometrie", icon: "📐", category: "mathe", tier: 3, prerequisites: ["mathe-gleichungen"] },
  { id: "mathe-komplexe", label: "Komplexe Zahlen", icon: "ℂ", category: "mathe", tier: 3, prerequisites: ["mathe-gleichungen"] },

  { id: "mathe-grenzwerte", label: "Grenzwerte", icon: "🎯", category: "mathe", tier: 4, prerequisites: ["mathe-funktionen"] },
  { id: "mathe-trigonometrie", label: "Trigonometrie", icon: "📏", category: "mathe", tier: 4, prerequisites: ["mathe-funktionen"] },
  { id: "mathe-stochastik", label: "Wahrscheinlichkeit", icon: "🎲", category: "mathe", tier: 4, prerequisites: ["mathe-mengenlehre", "mathe-bruchrechnen"] },

  { id: "mathe-ableitungen", label: "Ableitungen", icon: "∂", category: "mathe", tier: 5, prerequisites: ["mathe-grenzwerte"] },
  { id: "mathe-integration", label: "Integration", icon: "∫", category: "mathe", tier: 5, prerequisites: ["mathe-grenzwerte", "mathe-potenzen"] },
  { id: "mathe-statistik", label: "Statistik", icon: "📊", category: "mathe", tier: 5, prerequisites: ["mathe-stochastik"] },
  { id: "mathe-kombinatorik", label: "Kombinatorik", icon: "🔀", category: "mathe", tier: 5, prerequisites: ["mathe-stochastik"] },

  { id: "mathe-kurvendiskussion", label: "Kurvendiskussion", icon: "📊", category: "mathe", tier: 6, prerequisites: ["mathe-ableitungen"] },
  { id: "mathe-reihen", label: "Reihen", icon: "Σ", category: "mathe", tier: 6, prerequisites: ["mathe-integration"] },
  { id: "mathe-verteilungen", label: "Verteilungen", icon: "🔔", category: "mathe", tier: 6, prerequisites: ["mathe-statistik"] },
  { id: "mathe-numerik", label: "Numerik", icon: "🖥️", category: "mathe", tier: 6, prerequisites: ["mathe-ableitungen"] },

  { id: "mathe-taylor", label: "Taylorreihen", icon: "∞", category: "mathe", tier: 7, prerequisites: ["mathe-reihen", "mathe-ableitungen"] },
  { id: "mathe-folgen", label: "Folgen", icon: "→", category: "mathe", tier: 7, prerequisites: ["mathe-reihen"] },
  { id: "mathe-dgl", label: "Differentialgleichungen", icon: "ƒ'", category: "mathe", tier: 7, prerequisites: ["mathe-ableitungen", "mathe-integration"] },

  { id: "mathe-vektoren", label: "Vektoren", icon: "➡️", category: "mathe", tier: 8, prerequisites: [] },
  { id: "mathe-lgs", label: "LGS", icon: "⊞", category: "mathe", tier: 8, prerequisites: ["mathe-gleichungen", "mathe-vektoren"] },

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

// ─── Status ─────────────────────────────────────────────────────────────────

export function getNodeStatus(
  node: SkillTreeNode,
  completedModules: string[],
  completedLessons: Record<string, string[]>
): NodeStatus {
  if (completedModules.includes(node.id)) return "completed";
  const lessons = completedLessons[node.id];
  if (lessons && lessons.length > 0) return "in-progress";
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
    for (const prereq of node.prerequisites) {
      edges.push({ from: prereq, to: node.id });
    }
  }
  return edges;
}

// ─── Horizontal Layout ──────────────────────────────────────────────────────

const COL_WIDTH = 200;   // Abstand zwischen Spalten
const ROW_HEIGHT = 90;   // Abstand zwischen Zeilen
const NODE_W = 160;
const NODE_H = 64;

export function calculateLayout(nodes: SkillTreeNode[], category: string): Map<string, NodePosition> {
  const positions = new Map<string, NodePosition>();
  const catNodes = nodes.filter(n => n.category === category);

  // Gruppiere nach Tier (Spalte)
  const tiers = new Map<number, SkillTreeNode[]>();
  for (const node of catNodes) {
    if (!tiers.has(node.tier)) tiers.set(node.tier, []);
    tiers.get(node.tier)!.push(node);
  }

  const maxTier = Math.max(...tiers.keys(), 0);

  // Berechne Y-Position basierend auf Abhängigkeiten
  // Knoten mit gleichen Eltern werden untereinander angeordnet
  const nodeRow = new Map<string, number>();
  let currentRow = 0;

  // Topologisch sortieren (einfach: nach Tier)
  for (let tier = 1; tier <= maxTier; tier++) {
    const tierNodes = tiers.get(tier) || [];

    // Finde Eltern-Knoten und positioniere Kinder darunter
    for (const node of tierNodes) {
      if (node.prerequisites.length === 0) {
        nodeRow.set(node.id, currentRow);
        currentRow++;
      } else {
        // Positioniere bei durchschnittlicher Y der Eltern
        const parentRows = node.prerequisites
          .map(p => nodeRow.get(p))
          .filter((r): r is number => r !== undefined);

        if (parentRows.length > 0) {
          const avgRow = parentRows.reduce((a, b) => a + b, 0) / parentRows.length;
          nodeRow.set(node.id, avgRow);
        } else {
          nodeRow.set(node.id, currentRow);
          currentRow++;
        }
      }
    }
  }

  // Konvertiere zu Pixel-Positionen
  for (const node of catNodes) {
    const row = nodeRow.get(node.id) ?? 0;
    positions.set(node.id, {
      x: (node.tier - 1) * COL_WIDTH,
      y: row * ROW_HEIGHT,
    });
  }

  // Zentriere vertikal
  let minY = Infinity;
  let maxY = -Infinity;
  for (const pos of positions.values()) {
    minY = Math.min(minY, pos.y);
    maxY = Math.max(maxY, pos.y);
  }
  const centerY = (minY + maxY) / 2;
  for (const [id, pos] of positions) {
    positions.set(id, { x: pos.x, y: pos.y - centerY });
  }

  return positions;
}

export { COL_WIDTH, ROW_HEIGHT, NODE_W, NODE_H };
