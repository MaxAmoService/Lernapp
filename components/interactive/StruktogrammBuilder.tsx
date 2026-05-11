"use client";

import { useState, useCallback, useMemo } from "react";

type BlockType = "sequence" | "if" | "while" | "dowhile" | "for" | "io";

interface StrukBlock {
  id: string;
  type: BlockType;
  label: string;
  elseLabel?: string;
  children?: StrukBlock[];
  elseChildren?: StrukBlock[];
}

const exampleBlocks: StrukBlock[] = [
  {
    id: "fn",
    type: "for",
    label: "i = 0 bis n-2",
    children: [
      {
        id: "for-j",
        type: "for",
        label: "j = 0 bis n-2-i",
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
];

interface StepInfo {
  blockId: string;
  title: string;
  description: string;
  symbol: string;
}

const exploreSteps: StepInfo[] = [
  { blockId: "fn", title: "Äußere for-Schleife", description: "Die äußere Schleife läuft von i=0 bis n-2. Im Nassi-Shneiderman-Diagramm wird eine for-Schleife als Block mit Zähler oben dargestellt — der Schleifenrumpf ist darunter.", symbol: "🔁 for-Schleife" },
  { blockId: "for-j", title: "Innere for-Schleife", description: "Die innere Schleife vergleicht benachbarte Elemente. Sie ist IN der äußeren Schleife verschachtelt — im Struktogramm siehst du das an der Einrückung unter dem äußeren Schleifenblock.", symbol: "🔁 for-Schleife" },
  { blockId: "if-swap", title: "Entscheidung: Tauschen?", description: "Das if/else wird im Nassi-Shneiderman als Block mit diagonaler Linie dargestellt. Links oben die Bedingung, links der JA-Teil, rechts der NEIN-Teil.", symbol: "❓ if/else" },
  { blockId: "temp", title: "Tausch Schritt 1: temp sichern", description: "Im JA-Teil: Zuerst sichern wir liste[j] in einer temporären Variable. Das ist der klassische Tausch-Algorithmus mit 3 Zuweisungen.", symbol: "🟦 Sequenz" },
  { blockId: "assign1", title: "Tausch Schritt 2: Verschieben", description: "Das zweite Element wird an die Position des ersten geschoben.", symbol: "🟦 Sequenz" },
  { blockId: "assign2", title: "Tausch Schritt 3: temp einsetzen", description: "Das gesicherte Element (temp) wird an die Position des zweiten geschoben. Tausch abgeschlossen! ✅", symbol: "🟦 Sequenz" },
];

// ═══════════════════════════════════════════
// SVG Nassi-Shneiderman Renderer
// ═══════════════════════════════════════════

const COLORS = {
  sequence: { fill: "#3b82f620", stroke: "#3b82f6", active: "#3b82f650", text: "#93c5fd" },
  for: { fill: "#a855f720", stroke: "#a855f7", active: "#a855f750", text: "#c4b5fd" },
  while: { fill: "#a855f720", stroke: "#a855f7", active: "#a855f750", text: "#c4b5fd" },
  dowhile: { fill: "#a855f720", stroke: "#a855f7", active: "#a855f750", text: "#c4b5fd" },
  if: { fill: "#f59e0b20", stroke: "#f59e0b", active: "#f59e0b50", text: "#fcd34d" },
  io: { fill: "#ec489920", stroke: "#ec4899", active: "#ec489950", text: "#f9a8d4" },
};

const HEADER_H = 32;
const MIN_BODY_H = 36;
const LABEL_OFFSET = 14;
const PAD = 6;

function measureBlock(block: StrukBlock, width: number): number {
  const innerW = width - PAD * 2;
  const halfW = (innerW - 8) / 2;

  switch (block.type) {
    case "sequence":
    case "io":
      return HEADER_H;

    case "for":
    case "while": {
      let bodyH = MIN_BODY_H;
      if (block.children) {
        for (const c of block.children) bodyH += measureBlock(c, innerW) + 2;
      }
      return HEADER_H + bodyH;
    }

    case "dowhile": {
      let bodyH = MIN_BODY_H;
      if (block.children) {
        for (const c of block.children) bodyH += measureBlock(c, innerW) + 2;
      }
      return bodyH + HEADER_H;
    }

    case "if": {
      let thenH = MIN_BODY_H;
      let elseH = MIN_BODY_H;
      if (block.children) for (const c of block.children) thenH += measureBlock(c, halfW) + 2;
      if (block.elseChildren) for (const c of block.elseChildren) elseH += measureBlock(c, halfW) + 2;
      return HEADER_H + Math.max(thenH, elseH);
    }

    default:
      return HEADER_H;
  }
}

function renderBlock(block: StrukBlock, x: number, y: number, width: number, activeId: string | null): JSX.Element {
  const isActive = activeId === block.id;
  const col = COLORS[block.type] || COLORS.sequence;
  const innerW = width - PAD * 2;
  const halfW = (innerW - 8) / 2;

  const activeStroke = isActive ? 2.5 : 1.5;
  const activeFill = isActive ? col.active : col.fill;

  switch (block.type) {
    case "sequence":
    case "io": {
      return (
        <g key={block.id}>
          <rect x={x} y={y} width={width} height={HEADER_H} rx={3} fill={activeFill} stroke={col.stroke} strokeWidth={activeStroke} />
          {block.type === "io" && <polygon points={`${x},${y} ${x + LABEL_OFFSET},${y} ${x + LABEL_OFFSET},${y + HEADER_H} ${x},${y + HEADER_H}`} fill={col.stroke + "30"} />}
          <text x={x + width / 2} y={y + HEADER_H / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill={isActive ? "white" : col.text} fontSize={12} fontWeight={isActive ? "bold" : "normal"} fontFamily="monospace">
            {block.label}
          </text>
        </g>
      );
    }

    case "for":
    case "while": {
      const totalH = measureBlock(block, width);
      const bodyH = totalH - HEADER_H;
      const elements: JSX.Element[] = [];

      // Header bar — Schleifenbedingung
      elements.push(
        <g key={`${block.id}-hdr`}>
          <rect x={x} y={y} width={width} height={HEADER_H} rx={3} fill={activeFill} stroke={col.stroke} strokeWidth={activeStroke} />
          {/* Schleifen-Bogen links */}
          <path d={`M ${x},${y + HEADER_H} Q ${x},${y} ${x + LABEL_OFFSET},${y}`} fill="none" stroke={col.stroke} strokeWidth={1.5} />
          <text x={x + width / 2} y={y + HEADER_H / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill={isActive ? "white" : col.text} fontSize={12} fontWeight={isActive ? "bold" : "normal"} fontFamily="monospace">
            {block.type === "for" ? `for ${block.label}` : `while ${block.label}`}
          </text>
        </g>
      );

      // Body
      let cy = y + HEADER_H;
      if (block.children && block.children.length > 0) {
        for (const child of block.children) {
          elements.push(renderBlock(child, x + PAD, cy, innerW, activeId));
          cy += measureBlock(child, innerW) + 2;
        }
      } else {
        elements.push(
          <text key={`${block.id}-empty`} x={x + width / 2} y={y + HEADER_H + bodyH / 2} textAnchor="middle" dominantBaseline="middle" fill="#475569" fontSize={11} fontStyle="italic">
            leer
          </text>
        );
      }

      // Umschließende Box
      elements.unshift(
        <rect key={`${block.id}-bg`} x={x} y={y} width={width} height={totalH} rx={3} fill="none" stroke={col.stroke + "40"} strokeWidth={1} />
      );

      return <g key={block.id}>{elements}</g>;
    }

    case "dowhile": {
      const totalH = measureBlock(block, width);
      const bodyH = totalH - HEADER_H;
      const elements: JSX.Element[] = [];

      // Body first
      let cy = y;
      if (block.children && block.children.length > 0) {
        for (const child of block.children) {
          elements.push(renderBlock(child, x + PAD, cy, innerW, activeId));
          cy += measureBlock(child, innerW) + 2;
        }
      }

      // Footer bar — Bedingung
      elements.push(
        <g key={`${block.id}-ftr`}>
          <rect x={x} y={y + bodyH} width={width} height={HEADER_H} rx={3} fill={activeFill} stroke={col.stroke} strokeWidth={activeStroke} />
          <path d={`M ${x},${y + bodyH} Q ${x},${y + totalH} ${x + LABEL_OFFSET},${y + totalH}`} fill="none" stroke={col.stroke} strokeWidth={1.5} />
          <text x={x + width / 2} y={y + bodyH + HEADER_H / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill={isActive ? "white" : col.text} fontSize={12} fontWeight={isActive ? "bold" : "normal"} fontFamily="monospace">
            do — {block.label}
          </text>
        </g>
      );

      elements.unshift(
        <rect key={`${block.id}-bg`} x={x} y={y} width={width} height={totalH} rx={3} fill="none" stroke={col.stroke + "40"} strokeWidth={1} />
      );

      return <g key={block.id}>{elements}</g>;
    }

    case "if": {
      const totalH = measureBlock(block, width);
      const bodyH = totalH - HEADER_H;
      const elements: JSX.Element[] = [];

      // Header with diagonal
      elements.push(
        <g key={`${block.id}-hdr`}>
          <rect x={x} y={y} width={width} height={HEADER_H} rx={3} fill={activeFill} stroke={col.stroke} strokeWidth={activeStroke} />
          {/* Diagonale Linie */}
          <line x1={x} y1={y + HEADER_H} x2={x + LABEL_OFFSET * 2} y2={y} stroke={col.stroke} strokeWidth={1.5} />
          <text x={x + width / 2} y={y + HEADER_H / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill={isActive ? "white" : col.text} fontSize={11} fontWeight={isActive ? "bold" : "normal"} fontFamily="monospace">
            {block.label}
          </text>
        </g>
      );

      // JA/NEIN Labels
      elements.push(
        <g key={`${block.id}-labels`}>
          <text x={x + halfW / 2} y={y + HEADER_H + 13} textAnchor="middle" fill="#22c55e" fontSize={9} fontWeight="bold">JA ✓</text>
          <text x={x + PAD + halfW + 8 + halfW / 2} y={y + HEADER_H + 13} textAnchor="middle" fill="#ef4444" fontSize={9} fontWeight="bold">NEIN ✗</text>
        </g>
      );

      // Divider line
      elements.push(
        <line key={`${block.id}-div`} x1={x + PAD + halfW + 4} y1={y + HEADER_H} x2={x + PAD + halfW + 4} y2={y + totalH} stroke={col.stroke + "60"} strokeWidth={1} strokeDasharray="4 2" />
      );

      // Then children (left)
      let thenY = y + HEADER_H + 18;
      if (block.children && block.children.length > 0) {
        for (const child of block.children) {
          elements.push(renderBlock(child, x + PAD, thenY, halfW, activeId));
          thenY += measureBlock(child, halfW) + 2;
        }
      }

      // Else children (right)
      let elseY = y + HEADER_H + 18;
      const elseX = x + PAD + halfW + 8;
      if (block.elseChildren && block.elseChildren.length > 0) {
        for (const child of block.elseChildren) {
          elements.push(renderBlock(child, elseX, elseY, halfW, activeId));
          elseY += measureBlock(child, halfW) + 2;
        }
      } else {
        elements.push(
          <text key={`${block.id}-else-empty`} x={elseX + halfW / 2} y={y + HEADER_H + bodyH / 2 + 9} textAnchor="middle" dominantBaseline="middle" fill="#475569" fontSize={10} fontStyle="italic">
            —
          </text>
        );
      }

      // Outer border
      elements.unshift(
        <rect key={`${block.id}-bg`} x={x} y={y} width={width} height={totalH} rx={3} fill="none" stroke={col.stroke + "40"} strokeWidth={1} />
      );

      return <g key={block.id}>{elements}</g>;
    }

    default:
      return <g key={block.id} />;
  }
}

// ═══════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════

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

  const svgWidth = 520;
  const totalH = measureBlock(exampleBlocks[0], svgWidth - 40) + 40;
  const userTotalH = userBlocks.length > 0 ? userBlocks.reduce((h, b) => h + measureBlock(b, svgWidth - 40) + 4, 0) + 40 : 200;

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

  const addBlock = useCallback((type: BlockType) => {
    const label = type === "if" ? "bedingung?" : type === "for" ? "i = 0 bis n" : type === "while" ? "bedingung" : type === "dowhile" ? "bedingung" : type === "io" ? "input(x)" : "anweisung";
    const newBlock: StrukBlock = {
      id: `u-${nextId}`,
      type,
      label,
      children: ["if", "while", "for", "dowhile"].includes(type) ? [] : undefined,
      elseChildren: type === "if" ? [] : undefined,
    };
    setUserBlocks((prev) => [...prev, newBlock]);
    setNextId((n) => n + 1);
  }, [nextId]);

  const currentStep = exploreIdx >= 0 ? exploreSteps[exploreIdx] : null;

  return (
    <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-lg font-bold text-white">📐 Nassi-Shneiderman Struktogramm</h4>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-5">
        {([
          { key: "explore" as const, label: "🔍 Bubblesort erkunden" },
          { key: "build" as const, label: "🔨 Eigene bauen" },
        ]).map((m) => (
          <button key={m.key} onClick={() => { setMode(m.key); if (m.key === "explore") { setExploreIdx(-1); setActiveId(null); } }}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === m.key ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"}`}>
            {m.label}
          </button>
        ))}
      </div>

      {mode === "explore" && (
        <>
          <p className="text-sm text-slate-400 mb-4">Erkunde das Bubblesort-Struktogramm Schritt für Schritt. Jeder Block wird hervorgehoben und erklärt.</p>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-3/5 bg-slate-900/40 rounded-xl p-4 border border-slate-700/30 flex justify-center">
              <svg width={svgWidth} height={totalH} viewBox={`0 0 ${svgWidth} ${totalH}`} className="w-full h-auto">
                {renderBlock(exampleBlocks[0], 20, 20, svgWidth - 40, activeId)}
              </svg>
            </div>
            <div className="lg:w-2/5 flex flex-col gap-4">
              <div className="p-5 bg-slate-800/60 rounded-xl border border-slate-700/30 min-h-[120px]">
                <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-2">
                  {exploreIdx >= 0 ? `Schritt ${exploreIdx + 1} von ${exploreSteps.length}` : "▶ Bereit zum Erkunden"}
                </p>
                {currentStep ? (
                  <div>
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full font-mono">{currentStep.symbol}</span>
                    <p className="text-white font-bold text-lg mt-2 mb-2">{currentStep.title}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{currentStep.description}</p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">📐</div>
                    <p className="text-slate-400">Klicke auf <strong className="text-white">Start</strong> um jeden Block zu erkunden.</p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/20">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Legende</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2"><svg width="20" height="14"><rect width="20" height="14" rx="2" fill="#3b82f640" stroke="#3b82f6" strokeWidth="1" /></svg><span className="text-blue-300">Sequenz — Anweisung</span></div>
                  <div className="flex items-center gap-2"><svg width="20" height="14"><rect width="20" height="14" rx="2" fill="#a855f740" stroke="#a855f7" strokeWidth="1" /></svg><span className="text-purple-300">Schleife — for/while</span></div>
                  <div className="flex items-center gap-2"><svg width="20" height="14"><rect width="20" height="14" rx="2" fill="#f59e0b40" stroke="#f59e0b" strokeWidth="1" /></svg><span className="text-amber-300">Auswahl — if/else</span></div>
                  <div className="flex items-center gap-2"><svg width="20" height="14"><rect width="20" height="14" rx="2" fill="#ec489940" stroke="#ec4899" strokeWidth="1" /></svg><span className="text-pink-300">Ein-/Ausgabe</span></div>
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <button onClick={prevExplore} disabled={exploreIdx < 0} className="flex-1 px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-xl disabled:opacity-20 hover:bg-slate-700 transition-all text-sm font-semibold">← Zurück</button>
                <button onClick={resetExplore} disabled={exploreIdx < 0} className="px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-xl disabled:opacity-20 hover:bg-slate-700 transition-all text-sm font-semibold">↺</button>
                <button onClick={exploreBlock} disabled={exploreIdx >= allExampleBlocks.length - 1} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl disabled:opacity-20 hover:bg-blue-500 transition-all text-sm font-semibold shadow-lg shadow-blue-500/20">
                  {exploreIdx < 0 ? "Start ▶" : "Weiter →"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {mode === "build" && (
        <>
          <p className="text-sm text-slate-400 mb-4">Baue dein eigenes Struktogramm! Wähle einen Blocktyp und füge ihn hinzu.</p>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-3/5 bg-slate-900/40 rounded-xl p-4 border border-slate-700/30 min-h-[200px] flex justify-center">
              {userBlocks.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="text-5xl mb-3">📐</div>
                  <p className="text-white font-semibold text-lg">Noch keine Blöcke</p>
                  <p className="text-sm text-slate-400 mt-2">Wähle rechts einen Blocktyp aus.</p>
                </div>
              ) : (
                <svg width={svgWidth} height={userTotalH} viewBox={`0 0 ${svgWidth} ${userTotalH}`} className="w-full h-auto">
                  {userBlocks.map((block, i) => {
                    const h = measureBlock(block, svgWidth - 40);
                    const yOffset = userBlocks.slice(0, i).reduce((acc, b) => acc + measureBlock(b, svgWidth - 40) + 4, 0) + 20;
                    return renderBlock(block, 20, yOffset, svgWidth - 40, null);
                  })}
                </svg>
              )}
            </div>
            <div className="lg:w-2/5 flex flex-col gap-4">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30">
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-3">Blöcke hinzufügen</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: "sequence" as BlockType, label: "Sequenz", icon: "🟦" },
                    { type: "if" as BlockType, label: "if/else", icon: "🔶" },
                    { type: "for" as BlockType, label: "for-Schleife", icon: "🔁" },
                    { type: "while" as BlockType, label: "while-Schleife", icon: "🔁" },
                    { type: "dowhile" as BlockType, label: "do-while", icon: "🔁" },
                    { type: "io" as BlockType, label: "Ein-/Ausgabe", icon: "🟪" },
                  ].map((b) => (
                    <button key={b.type} onClick={() => addBlock(b.type)} className="p-3 rounded-xl bg-slate-700/50 text-slate-200 hover:bg-slate-700 transition-all text-sm font-medium text-left border border-slate-600/30 hover:border-slate-500/50">
                      <span className="mr-1.5">{b.icon}</span>{b.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/20">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Tipp</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Im echten Nassi-Shneiderman-Diagramm wird if/else durch eine <strong className="text-white">diagonale Linie</strong> dargestellt. Schleifen haben einen <strong className="text-white">Bogen</strong> links.
                </p>
              </div>
              <button onClick={() => { setUserBlocks([]); setNextId(1); }} className="px-4 py-2.5 bg-red-600/20 text-red-400 rounded-xl hover:bg-red-600/30 transition-all text-sm font-medium border border-red-500/20">
                🗑 Alles löschen
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
