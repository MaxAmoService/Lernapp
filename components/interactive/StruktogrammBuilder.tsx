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

const availableBlocks: { type: BlockType; label: string; icon: string }[] = [
  { type: "sequence", label: "Sequenz", icon: "🟦" },
  { type: "if", label: "Auswahl (if/else)", icon: "🔶" },
  { type: "while", label: "Schleife (while)", icon: "🔁" },
  { type: "io", label: "Ein-/Ausgabe", icon: "🟪" },
];

function getBlockColors(type: BlockType) {
  switch (type) {
    case "sequence": return { border: "border-blue-500/60", bg: "bg-blue-600/20", activeBorder: "border-blue-400", activeBg: "bg-blue-500/40", text: "text-blue-200" };
    case "if": return { border: "border-amber-500/60", bg: "bg-amber-600/20", activeBorder: "border-amber-400", activeBg: "bg-amber-500/40", text: "text-amber-200" };
    case "while": return { border: "border-purple-500/60", bg: "bg-purple-600/20", activeBorder: "border-purple-400", activeBg: "bg-purple-500/40", text: "text-purple-200" };
    case "io": return { border: "border-pink-500/60", bg: "bg-pink-600/20", activeBorder: "border-pink-400", activeBg: "bg-pink-500/40", text: "text-pink-200" };
  }
}

function BlockComponent({
  block,
  activeId,
}: {
  block: StrukBlock;
  activeId: string | null;
}) {
  const isActive = activeId === block.id;
  const colors = getBlockColors(block.type);

  const headerClasses = `
    px-4 py-2.5 font-mono text-sm font-bold border-2 rounded-lg transition-all duration-300
    ${isActive ? `${colors.activeBorder} ${colors.activeBg} text-white shadow-lg` : `${colors.border} ${colors.bg} ${colors.text}`}
  `;

  if (block.type === "sequence" || block.type === "io") {
    return (
      <div data-block-id={block.id} className={headerClasses}>
        {block.type === "io" && <span className="mr-1.5">📥</span>}
        {block.label}
      </div>
    );
  }

  if (block.type === "while") {
    return (
      <div data-block-id={block.id} className="flex flex-col">
        <div className={headerClasses}>
          <span className="mr-1.5">🔁</span>{block.label}
        </div>
        <div className={`ml-4 mt-1 border-l-2 border-dashed ${isActive ? "border-purple-400" : "border-purple-500/30"} pl-3 py-2 space-y-1.5`}>
          {block.children && block.children.length > 0 ? (
            block.children.map((child) => (
              <BlockComponent key={child.id} block={child} activeId={activeId} />
            ))
          ) : (
            <div className="text-xs text-slate-500 italic py-2">Schleifenrumpf (leer)</div>
          )}
        </div>
      </div>
    );
  }

  if (block.type === "if") {
    return (
      <div data-block-id={block.id} className="flex flex-col">
        <div className={headerClasses}>
          <span className="mr-1.5">❓</span>{block.label}
        </div>
        <div className="flex gap-1 mt-1">
          {/* JA-Seite */}
          <div className={`flex-1 ml-4 border-l-2 border-t-2 rounded-tl-lg ${isActive ? "border-green-400" : "border-green-500/30"} pl-3 pt-2 pb-2 space-y-1.5`}>
            <div className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1">✓ Ja</div>
            {block.children && block.children.length > 0 ? (
              block.children.map((child) => (
                <BlockComponent key={child.id} block={child} activeId={activeId} />
              ))
            ) : (
              <div className="text-xs text-slate-500 italic py-2">—</div>
            )}
          </div>
          {/* NEIN-Seite */}
          <div className={`flex-1 border-r-2 border-t-2 rounded-tr-lg ${isActive ? "border-red-400" : "border-red-500/30"} pr-3 pt-2 pb-2 space-y-1.5 text-right`}>
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">✗ Nein</div>
            {block.elseChildren && block.elseChildren.length > 0 ? (
              block.elseChildren.map((child) => (
                <BlockComponent key={child.id} block={child} activeId={activeId} />
              ))
            ) : (
              <div className="text-xs text-slate-500 italic py-2">—</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <div className={headerClasses}>{block.label}</div>;
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

  const currentStep = exploreIdx >= 0 ? exploreSteps[exploreIdx] : null;

  return (
    <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-lg font-bold text-white">📐 Struktogramm — Nassi-Shneiderman</h4>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-5">
        {([
          { key: "explore" as const, label: "🔍 Bubblesort erkunden" },
          { key: "build" as const, label: "🔨 Eigene bauen" },
        ]).map((m) => (
          <button
            key={m.key}
            onClick={() => { setMode(m.key); if (m.key === "explore") { setExploreIdx(-1); setActiveId(null); } }}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === m.key
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
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
            Erkunde das Bubblesort-Struktogramm Schritt für Schritt. Jeder Block wird hervorgehoben und erklärt.
          </p>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-3/5 bg-slate-900/40 rounded-xl p-5 border border-slate-700/30">
              <div className="space-y-1.5">
                {exampleBlocks.map((block) => (
                  <BlockComponent key={block.id} block={block} activeId={activeId} />
                ))}
              </div>
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
                    <p className="text-slate-400">Klicke auf <strong className="text-white">Start</strong> um jeden Block zu erkunden.</p>
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
            <div className="w-full lg:w-3/5 bg-slate-900/40 rounded-xl p-5 border border-slate-700/30 min-h-[200px]">
              {userBlocks.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="text-5xl mb-3">📐</div>
                  <p className="text-white font-semibold text-lg">Noch keine Blöcke</p>
                  <p className="text-sm text-slate-400 mt-2">Wähle rechts einen Blocktyp aus zum Starten.</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {userBlocks.map((block) => (
                    <BlockComponent key={block.id} block={block} activeId={null} />
                  ))}
                </div>
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
