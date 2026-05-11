"use client";

import { useState, useCallback, useMemo } from "react";

type BlockType = "sequence" | "if" | "while" | "io";

interface StrukBlock {
  id: string;
  type: BlockType;
  label: string;
  children?: StrukBlock[];
  elseChildren?: StrukBlock[];
}

const exampleBlocks: StrukBlock[] = [
  {
    id: "fn",
    type: "sequence",
    label: "bubbleSort(liste, n)",
    children: [
      {
        id: "for-i",
        type: "while",
        label: "for i = 0 to n-2",
        children: [
          {
            id: "for-j",
            type: "while",
            label: "for j = 0 to n-2-i",
            children: [
              {
                id: "if-swap",
                type: "if",
                label: "liste[j] > liste[j+1]?",
                children: [
                  { id: "temp", type: "sequence", label: "temp = liste[j]" },
                  { id: "assign1", type: "sequence", label: "liste[j] = liste[j+1]" },
                  { id: "assign2", type: "sequence", label: "liste[j+1] = temp" },
                ],
                elseChildren: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const availableBlocks: { type: BlockType; label: string; icon: string; color: string }[] = [
  { type: "sequence", label: "Sequenz", icon: "🟦", color: "blue" },
  { type: "if", label: "Auswahl (if/else)", icon: "🔶", color: "amber" },
  { type: "while", label: "Schleife (while)", icon: "🔁", color: "purple" },
  { type: "io", label: "Ein-/Ausgabe", icon: "🟪", color: "pink" },
];

function getBlockColor(type: BlockType): string {
  switch (type) {
    case "sequence": return "#3b82f6";
    case "if": return "#f59e0b";
    case "while": return "#a855f7";
    case "io": return "#ec4899";
  }
}

function getBlockBg(type: BlockType): string {
  switch (type) {
    case "sequence": return "bg-blue-600/30 border-blue-500/40";
    case "if": return "bg-amber-600/30 border-amber-500/40";
    case "while": return "bg-purple-600/30 border-purple-500/40";
    case "io": return "bg-pink-600/30 border-pink-500/40";
  }
}

function StrukBlockSVG({
  block,
  x,
  y,
  width,
  activeId,
  depth = 0,
}: {
  block: StrukBlock;
  x: number;
  y: number;
  width: number;
  activeId: string | null;
  depth?: number;
}): { element: JSX.Element; height: number } {
  const isActive = activeId === block.id;
  const color = getBlockColor(block.type);
  const headerH = 36;
  const padding = 8;
  const childGap = 4;

  if (block.type === "sequence" || block.type === "io") {
    const h = headerH;
    return {
      height: h,
      element: (
        <g key={block.id}>
          <rect
            x={x}
            y={y}
            width={width}
            height={h}
            rx={4}
            fill={isActive ? color + "60" : color + "25"}
            stroke={isActive ? color : color + "60"}
            strokeWidth={isActive ? 2.5 : 1.5}
            style={{ transition: "all 0.3s ease" }}
          />
          <text
            x={x + width / 2}
            y={y + h / 2 + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={isActive ? "white" : "#cbd5e1"}
            fontSize={12}
            fontWeight={isActive ? "bold" : "normal"}
            fontFamily="monospace"
          >
            {block.label}
          </text>
        </g>
      ),
    };
  }

  if (block.type === "while") {
    let childY = y + headerH + childGap;
    const childElements: JSX.Element[] = [];
    let totalChildH = 0;
    const childWidth = width - padding * 2;

    if (block.children) {
      for (const child of block.children) {
        const result = StrukBlockSVG({ block: child, x: x + padding, y: childY, width: childWidth, activeId, depth: depth + 1 });
        childElements.push(result.element);
        childY += result.height + childGap;
        totalChildH += result.height + childGap;
      }
    }

    const totalH = headerH + (totalChildH > 0 ? totalChildH + padding : 0) + 4;

    return {
      height: totalH,
      element: (
        <g key={block.id}>
          {/* Header */}
          <rect
            x={x}
            y={y}
            width={width}
            height={headerH}
            rx={4}
            fill={isActive ? color + "60" : color + "25"}
            stroke={isActive ? color : color + "60"}
            strokeWidth={isActive ? 2.5 : 1.5}
            style={{ transition: "all 0.3s ease" }}
          />
          <text
            x={x + width / 2}
            y={y + headerH / 2 + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={isActive ? "white" : "#cbd5e1"}
            fontSize={12}
            fontWeight={isActive ? "bold" : "normal"}
            fontFamily="monospace"
          >
            🔁 {block.label}
          </text>
          {/* Body */}
          {totalChildH > 0 && (
            <rect
              x={x + 2}
              y={y + headerH}
              width={width - 4}
              height={totalChildH + padding}
              rx={3}
              fill={color + "08"}
              stroke={color + "30"}
              strokeWidth={1}
              strokeDasharray="4 2"
            />
          )}
          {childElements}
        </g>
      ),
    };
  }

  if (block.type === "if") {
    let thenY = y + headerH + childGap;
    const thenElements: JSX.Element[] = [];
    let thenH = 0;
    const halfWidth = (width - padding * 2 - 8) / 2;

    if (block.children) {
      for (const child of block.children) {
        const result = StrukBlockSVG({ block: child, x: x + padding, y: thenY, width: halfWidth, activeId, depth: depth + 1 });
        thenElements.push(result.element);
        thenY += result.height + childGap;
        thenH += result.height + childGap;
      }
    }

    let elseY = y + headerH + childGap;
    const elseElements: JSX.Element[] = [];
    let elseH = 0;
    const elseX = x + padding + halfWidth + 8;

    if (block.elseChildren) {
      for (const child of block.elseChildren) {
        const result = StrukBlockSVG({ block: child, x: elseX, y: elseY, width: halfWidth, activeId, depth: depth + 1 });
        elseElements.push(result.element);
        elseY += result.height + childGap;
        elseH += result.height + childGap;
      }
    }

    const bodyH = Math.max(thenH, elseH, 30);
    const totalH = headerH + bodyH + padding + 4;

    return {
      height: totalH,
      element: (
        <g key={block.id}>
          {/* Header — full width */}
          <rect
            x={x}
            y={y}
            width={width}
            height={headerH}
            rx={4}
            fill={isActive ? color + "60" : color + "25"}
            stroke={isActive ? color : color + "60"}
            strokeWidth={isActive ? 2.5 : 1.5}
            style={{ transition: "all 0.3s ease" }}
          />
          <text
            x={x + width / 2}
            y={y + headerH / 2 + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={isActive ? "white" : "#cbd5e1"}
            fontSize={12}
            fontWeight={isActive ? "bold" : "normal"}
            fontFamily="monospace"
          >
            ❓ {block.label}
          </text>
          {/* Divider line */}
          <line
            x1={x + halfWidth + padding + 4}
            y1={y + headerH}
            x2={x + halfWidth + padding + 4}
            y2={y + totalH}
            stroke={color + "40"}
            strokeWidth={1.5}
          />
          {/* Then area */}
          <rect
            x={x + 2}
            y={y + headerH}
            width={halfWidth + padding - 2}
            height={bodyH + padding}
            rx={3}
            fill="#22c55e08"
            stroke="#22c55e20"
            strokeWidth={1}
          />
          <text x={x + padding + 4} y={y + headerH + 14} fill="#22c55e80" fontSize={9} fontWeight="bold">
            JA
          </text>
          {/* Else area */}
          <rect
            x={elseX - 2}
            y={y + headerH}
            width={halfWidth + padding - 2}
            height={bodyH + padding}
            rx={3}
            fill="#ef444408"
            stroke="#ef444420"
            strokeWidth={1}
          />
          <text x={elseX + 4} y={y + headerH + 14} fill="#ef444480" fontSize={9} fontWeight="bold">
            NEIN
          </text>
          {thenElements}
          {elseElements}
        </g>
      ),
    };
  }

  return { height: headerH, element: <g key={block.id} /> };
}

function calculateTotalHeight(blocks: StrukBlock[]): number {
  let h = 0;
  for (const block of blocks) {
    if (block.type === "sequence" || block.type === "io") h += 40;
    else if (block.type === "while") {
      const childH = block.children ? calculateTotalHeight(block.children) : 0;
      h += 40 + childH + 12;
    } else if (block.type === "if") {
      const thenH = block.children ? calculateTotalHeight(block.children) : 0;
      const elseH = block.elseChildren ? calculateTotalHeight(block.elseChildren) : 0;
      h += 40 + Math.max(thenH, elseH, 30) + 16;
    }
  }
  return h;
}

function flattenBlocks(blocks: StrukBlock[]): StrukBlock[] {
  const result: StrukBlock[] = [];
  for (const block of blocks) {
    result.push(block);
    if (block.children) result.push(...flattenBlocks(block.children));
    if (block.elseChildren) result.push(...flattenBlocks(block.elseChildren));
  }
  return result;
}

export function StruktogrammBuilder() {
  const [mode, setMode] = useState<"explore" | "build">("explore");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [userBlocks, setUserBlocks] = useState<StrukBlock[]>([]);
  const [nextId, setNextId] = useState(1);

  const allExampleBlocks = useMemo(() => flattenBlocks(exampleBlocks), []);
  const [exploreIdx, setExploreIdx] = useState(-1);

  const exploreBlock = useCallback(() => {
    setExploreIdx((i) => Math.min(i + 1, allExampleBlocks.length - 1));
    if (exploreIdx + 1 < allExampleBlocks.length) {
      setActiveId(allExampleBlocks[exploreIdx + 1].id);
    }
  }, [exploreIdx, allExampleBlocks]);

  const prevExplore = useCallback(() => {
    setExploreIdx((i) => Math.max(i - 1, -1));
    if (exploreIdx > 0) {
      setActiveId(allExampleBlocks[exploreIdx - 1].id);
    } else {
      setActiveId(null);
    }
  }, [exploreIdx, allExampleBlocks]);

  const addBlock = useCallback(
    (type: BlockType) => {
      const label = type === "if" ? "Bedingung?" : type === "while" ? "while (true)" : type === "io" ? "print(...)" : "Anweisung";
      const newBlock: StrukBlock = {
        id: `user-${nextId}`,
        type,
        label,
        children: type === "if" || type === "while" ? [] : undefined,
        elseChildren: type === "if" ? [] : undefined,
      };
      setUserBlocks((prev) => [...prev, newBlock]);
      setNextId((n) => n + 1);
    },
    [nextId]
  );

  const svgWidth = 500;
  const svgHeight = Math.max(calculateTotalHeight(exampleBlocks) + 60, 400);

  return (
    <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-lg font-bold text-white">📐 Struktogramm Builder</h4>
        <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs rounded-full font-medium">Nassi-Shneiderman</span>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-5">
        {[
          { key: "explore" as const, label: "🔍 Erkunden", color: "blue" },
          { key: "build" as const, label: "🔨 Bauen", color: "emerald" },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === m.key
                ? m.key === "explore"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "explore" && (
        <>
          <p className="text-sm text-slate-400 mb-4">
            Erkunde das Bubblesort-Struktogramm Schritt für Schritt. Jeder Klick hebt den nächsten Block hervor.
          </p>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-3/5 flex justify-center bg-slate-900/40 rounded-xl p-5 border border-slate-700/30">
              <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
                {exampleBlocks.map((block) => {
                  const result = StrukBlockSVG({ block, x: 20, y: 20, width: svgWidth - 40, activeId });
                  return result.element;
                })}
              </svg>
            </div>
            <div className="lg:w-2/5 flex flex-col gap-4">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30">
                <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">
                  {exploreIdx >= 0 ? `Block ${exploreIdx + 1} / ${allExampleBlocks.length}` : "Bereit?"}
                </p>
                {exploreIdx >= 0 ? (
                  <div>
                    <p className="text-white font-bold text-lg mb-1">{allExampleBlocks[exploreIdx].label}</p>
                    <p className="text-sm text-slate-400">
                      Typ: <span className="text-indigo-300 font-mono">{allExampleBlocks[exploreIdx].type}</span>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">Klicke auf &quot;Weiter&quot; um jeden Block des Struktogramms zu erkunden.</p>
                )}
              </div>

              {/* Legende */}
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/20">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Legende</p>
                <div className="space-y-2">
                  {availableBlocks.map((b) => (
                    <div key={b.type} className="flex items-center gap-2">
                      <span className="text-base">{b.icon}</span>
                      <span className="text-xs text-slate-400">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <button
                  onClick={prevExplore}
                  disabled={exploreIdx < 0}
                  className="flex-1 px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-xl disabled:opacity-20 hover:bg-slate-700 transition-all text-sm font-semibold"
                >
                  ← Zurück
                </button>
                <button
                  onClick={exploreBlock}
                  disabled={exploreIdx >= allExampleBlocks.length - 1}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl disabled:opacity-20 hover:bg-blue-500 transition-all text-sm font-semibold shadow-lg shadow-blue-500/20"
                >
                  Weiter →
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {mode === "build" && (
        <>
          <p className="text-sm text-slate-400 mb-4">
            Baue dein eigenes Struktogramm! Wähle unten einen Blocktyp aus und füge ihn hinzu.
          </p>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-3/5 flex justify-center bg-slate-900/40 rounded-xl p-5 border border-slate-700/30 min-h-[300px]">
              {userBlocks.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-3">📐</div>
                  <p className="text-white font-semibold">Noch keine Blöcke</p>
                  <p className="text-sm text-slate-400 mt-1">Wähle links einen Blocktyp aus zum Starten.</p>
                </div>
              ) : (
                <svg width={svgWidth} height={Math.max(calculateTotalHeight(userBlocks) + 60, 300)} viewBox={`0 0 ${svgWidth} ${Math.max(calculateTotalHeight(userBlocks) + 60, 300)}`} className="w-full h-auto">
                  {userBlocks.map((block) => {
                    const result = StrukBlockSVG({ block, x: 20, y: 20, width: svgWidth - 40, activeId: null });
                    return result.element;
                  })}
                </svg>
              )}
            </div>
            <div className="lg:w-2/5 flex flex-col gap-4">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30">
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-3">Blöcke hinzufügen</p>
                <div className="grid grid-cols-2 gap-2">
                  {availableBlocks.map((b) => (
                    <button
                      key={b.type}
                      onClick={() => addBlock(b.type)}
                      className="p-3 rounded-xl bg-slate-700/50 text-slate-200 hover:bg-slate-700 transition-all text-sm font-medium text-left border border-slate-600/30 hover:border-slate-500/50"
                    >
                      <span className="text-base mr-1.5">{b.icon}</span>
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setUserBlocks([])}
                className="px-4 py-2.5 bg-red-600/20 text-red-400 rounded-xl hover:bg-red-600/30 transition-all text-sm font-medium border border-red-500/20"
              >
                🗑 Alles löschen
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
