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

interface StepInfo {
  blockId: string;
  title: string;
  description: string;
  symbol: string;
}

const exploreSteps: StepInfo[] = [
  { blockId: "fn", title: "Funktion: bubbleSort", description: "Das Struktogramm beginnt mit der Hauptfunktion. Im Struktogramm ist jede Funktion ein großer Block, der alles enthält.", symbol: "🟦 Sequenz" },
  { blockId: "for-i", title: "Äußere Schleife", description: "Die for-Schleife iteriert über alle Elemente. Im Struktogramm wird eine Schleife als Block mit Bedingung oben dargestellt — der Schleifenrumpf ist darunter eingerückt.", symbol: "🔁 Schleife" },
  { blockId: "for-j", title: "Innere Schleife", description: "Die innere Schleife vergleicht benachbarte Elemente. Sie ist IN der äußeren Schleife verschachtelt — im Struktogramm siehst du das an der Einrückung.", symbol: "🔁 Schleife" },
  { blockId: "if-swap", title: "Entscheidung: Tauschen?", description: "Die Raute (if/else) prüft ob zwei benachbarte Elemente vertauscht werden müssen. Links der JA-Teil (tauschen), rechts der NEIN-Teil (nichts tun).", symbol: "❓ Auswahl" },
  { blockId: "temp", title: "Tausch: temp sichern", description: "Im JA-Teil: Zuerst sichern wir das erste Element in einer temporären Variable. Das ist der klassische Tausch-Algorithmus.", symbol: "🟦 Sequenz" },
  { blockId: "assign1", title: "Tausch: Element verschieben", description: "Das zweite Element wird an die Position des ersten geschoben.", symbol: "🟦 Sequenz" },
  { blockId: "assign2", title: "Tausch: temp einsetzen", description: "Das gesicherte Element (temp) wird an die Position des zweiten geschoben. Tausch abgeschlossen! ✅", symbol: "🟦 Sequenz" },
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

function StrukBlockSVG({
  block,
  x,
  y,
  width,
  activeId,
}: {
  block: StrukBlock;
  x: number;
  y: number;
  width: number;
  activeId: string | null;
}): { element: JSX.Element; height: number } {
  const isActive = activeId === block.id;
  const color = getBlockColor(block.type);
  const headerH = 38;
  const padding = 10;
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
            rx={6}
            fill={isActive ? color + "70" : color + "25"}
            stroke={isActive ? color : color + "50"}
            strokeWidth={isActive ? 3 : 1.5}
            style={{ transition: "all 0.4s ease" }}
          />
          {isActive && (
            <rect x={x} y={y} width={width} height={h} rx={6} fill="none" stroke={color} strokeWidth={3} opacity={0.4} className="animate-pulse" />
          )}
          <text
            x={x + width / 2}
            y={y + h / 2 + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={isActive ? "white" : "#cbd5e1"}
            fontSize={13}
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
        const result = StrukBlockSVG({ block: child, x: x + padding, y: childY, width: childWidth, activeId });
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
          <rect
            x={x}
            y={y}
            width={width}
            height={headerH}
            rx={6}
            fill={isActive ? color + "70" : color + "25"}
            stroke={isActive ? color : color + "50"}
            strokeWidth={isActive ? 3 : 1.5}
            style={{ transition: "all 0.4s ease" }}
          />
          {isActive && (
            <rect x={x} y={y} width={width} height={headerH} rx={6} fill="none" stroke={color} strokeWidth={3} opacity={0.4} className="animate-pulse" />
          )}
          <text
            x={x + width / 2}
            y={y + headerH / 2 + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={isActive ? "white" : "#cbd5e1"}
            fontSize={13}
            fontWeight={isActive ? "bold" : "normal"}
            fontFamily="monospace"
          >
            🔁 {block.label}
          </text>
          {totalChildH > 0 && (
            <rect
              x={x + 2}
              y={y + headerH}
              width={width - 4}
              height={totalChildH + padding}
              rx={4}
              fill={color + "08"}
              stroke={color + "30"}
              strokeWidth={1}
              strokeDasharray="6 3"
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
    const halfWidth = (width - padding * 2 - 10) / 2;

    if (block.children) {
      for (const child of block.children) {
        const result = StrukBlockSVG({ block: child, x: x + padding, y: thenY, width: halfWidth, activeId });
        thenElements.push(result.element);
        thenY += result.height + childGap;
        thenH += result.height + childGap;
      }
    }

    let elseY = y + headerH + childGap;
    const elseElements: JSX.Element[] = [];
    let elseH = 0;
    const elseX = x + padding + halfWidth + 10;

    if (block.elseChildren) {
      for (const child of block.elseChildren) {
        const result = StrukBlockSVG({ block: child, x: elseX, y: elseY, width: halfWidth, activeId });
        elseElements.push(result.element);
        elseY += result.height + childGap;
        elseH += result.height + childGap;
      }
    }

    const bodyH = Math.max(thenH, elseH, 40);
    const totalH = headerH + bodyH + padding + 4;

    return {
      height: totalH,
      element: (
        <g key={block.id}>
          <rect
            x={x}
            y={y}
            width={width}
            height={headerH}
            rx={6}
            fill={isActive ? color + "70" : color + "25"}
            stroke={isActive ? color : color + "50"}
            strokeWidth={isActive ? 3 : 1.5}
            style={{ transition: "all 0.4s ease" }}
          />
          {isActive && (
            <rect x={x} y={y} width={width} height={headerH} rx={6} fill="none" stroke={color} strokeWidth={3} opacity={0.4} className="animate-pulse" />
          )}
          <text
            x={x + width / 2}
            y={y + headerH / 2 + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={isActive ? "white" : "#cbd5e1"}
            fontSize={13}
            fontWeight={isActive ? "bold" : "normal"}
            fontFamily="monospace"
          >
            ❓ {block.label}
          </text>
          <line
            x1={x + halfWidth + padding + 5}
            y1={y + headerH}
            x2={x + halfWidth + padding + 5}
            y2={y + totalH}
            stroke={color + "40"}
            strokeWidth={1.5}
          />
          <rect
            x={x + 2}
            y={y + headerH}
            width={halfWidth + padding - 2}
            height={bodyH + padding}
            rx={4}
            fill="#22c55e08"
            stroke="#22c55e20"
            strokeWidth={1}
          />
          <text x={x + padding + 6} y={y + headerH + 16} fill="#22c55e90" fontSize={10} fontWeight="bold">
            JA ✓
          </text>
          <rect
            x={elseX - 2}
            y={y + headerH}
            width={halfWidth + padding - 2}
            height={bodyH + padding}
            rx={4}
            fill="#ef444408"
            stroke="#ef444420"
            strokeWidth={1}
          />
          <text x={elseX + 6} y={y + headerH + 16} fill="#ef444490" fontSize={10} fontWeight="bold">
            NEIN ✗
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
    if (block.type === "sequence" || block.type === "io") h += 42;
    else if (block.type === "while") {
      const childH = block.children ? calculateTotalHeight(block.children) : 0;
      h += 42 + childH + 14;
    } else if (block.type === "if") {
      const thenH = block.children ? calculateTotalHeight(block.children) : 0;
      const elseH = block.elseChildren ? calculateTotalHeight(block.elseChildren) : 0;
      h += 42 + Math.max(thenH, elseH, 40) + 18;
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
    const newIdx = Math.min(exploreIdx + 1, allExampleBlocks.length - 1);
    setExploreIdx(newIdx);
    setActiveId(allExampleBlocks[newIdx].id);
  }, [exploreIdx, allExampleBlocks]);

  const prevExplore = useCallback(() => {
    const newIdx = Math.max(exploreIdx - 1, -1);
    setExploreIdx(newIdx);
    setActiveId(newIdx >= 0 ? allExampleBlocks[newIdx].id : null);
  }, [exploreIdx, allExampleBlocks]);

  const resetExplore = useCallback(() => {
    setExploreIdx(-1);
    setActiveId(null);
  }, []);

  const addBlock = useCallback(
    (type: BlockType) => {
      const label = type === "if" ? "Bedingung?" : type === "while" ? "while (true)" : type === "io" ? "input(x)" : "Anweisung";
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

  const svgWidth = 560;
  const svgHeight = Math.max(calculateTotalHeight(exampleBlocks) + 60, 400);
  const userSvgHeight = Math.max(calculateTotalHeight(userBlocks) + 60, 300);

  const currentStep = exploreIdx >= 0 ? exploreSteps[exploreIdx] : null;

  return (
    <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-lg font-bold text-white">📐 Struktogramm — Nassi-Shneiderman</h4>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-5">
        {[
          { key: "explore" as const, label: "🔍 Bubblesort erkunden", color: "blue" },
          { key: "build" as const, label: "🔨 Eigene bauen", color: "emerald" },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => { setMode(m.key); if (m.key === "explore") { setExploreIdx(-1); setActiveId(null); } }}
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
            Erkunde das Bubblesort-Struktogramm Schritt für Schritt. Jeder Block wird farbig hervorgehoben und erklärt.
          </p>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-3/5 flex justify-center bg-slate-900/40 rounded-xl p-5 border border-slate-700/30">
              <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
                <defs>
                  <filter id="strukt-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {exampleBlocks.map((block) => {
                  const result = StrukBlockSVG({ block, x: 20, y: 20, width: svgWidth - 40, activeId });
                  return result.element;
                })}
              </svg>
            </div>
            <div className="lg:w-2/5 flex flex-col gap-4">
              {/* Step Info */}
              <div className="p-5 bg-slate-800/60 rounded-xl border border-slate-700/30 min-h-[120px]">
                <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-2">
                  {exploreIdx >= 0 ? `Schritt ${exploreIdx + 1} von ${exploreSteps.length}` : "▶ Bereit zum Erkunden"}
                </p>
                {currentStep ? (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full font-mono">{currentStep.symbol}</span>
                    </div>
                    <p className="text-white font-bold text-lg mb-2">{currentStep.title}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{currentStep.description}</p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">📐</div>
                    <p className="text-slate-400">Klicke auf <strong className="text-white">Weiter</strong> um jeden Block zu erkunden.</p>
                  </div>
                )}
              </div>

              {/* Legende */}
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/20">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Symbole</p>
                <div className="space-y-2">
                  {[
                    { icon: "🟦", label: "Sequenz — Anweisung, Zuweisung", color: "text-blue-300" },
                    { icon: "🔶", label: "Auswahl — if/else Verzweigung", color: "text-amber-300" },
                    { icon: "🔁", label: "Schleife — while/for Wiederholung", color: "text-purple-300" },
                    { icon: "🟪", label: "Ein-/Ausgabe — input/print", color: "text-pink-300" },
                  ].map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-base">{b.icon}</span>
                      <span className={`text-xs ${b.color}`}>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={prevExplore}
                  disabled={exploreIdx < 0}
                  className="flex-1 px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-xl disabled:opacity-20 hover:bg-slate-700 transition-all text-sm font-semibold"
                >
                  ← Zurück
                </button>
                <button
                  onClick={resetExplore}
                  disabled={exploreIdx < 0}
                  className="px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-xl disabled:opacity-20 hover:bg-slate-700 transition-all text-sm font-semibold"
                >
                  ↺
                </button>
                <button
                  onClick={exploreBlock}
                  disabled={exploreIdx >= allExampleBlocks.length - 1}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl disabled:opacity-20 hover:bg-blue-500 transition-all text-sm font-semibold shadow-lg shadow-blue-500/20"
                >
                  {exploreIdx < 0 ? "Start ▶" : "Weiter →"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {mode === "build" && (
        <>
          <p className="text-sm text-slate-400 mb-4">
            Baue dein eigenes Struktogramm! Wähle einen Blocktyp und füge ihn hinzu.
          </p>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-3/5 flex justify-center bg-slate-900/40 rounded-xl p-5 border border-slate-700/30 min-h-[300px]">
              {userBlocks.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-3">📐</div>
                  <p className="text-white font-semibold text-lg">Noch keine Blöcke</p>
                  <p className="text-sm text-slate-400 mt-2">Wähle rechts einen Blocktyp aus zum Starten.</p>
                </div>
              ) : (
                <svg width={svgWidth} height={userSvgHeight} viewBox={`0 0 ${svgWidth} ${userSvgHeight}`} className="w-full h-auto">
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
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/20">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Tipp</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Struktogramme erzwingen <strong className="text-white">strukturierte Programmierung</strong> — keine Sprünge (goto) möglich.
                  Jede Struktur hat ein Pendant in modernen Programmiersprachen.
                </p>
              </div>
              <button
                onClick={() => { setUserBlocks([]); setNextId(1); }}
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
