"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import {
  skillTreeNodes,
  getEdges,
  getPositions,
  getNodeStatus,
  NODE_W,
  NODE_H,
  COL_W,
  ROW_H,
  type SkillTreeNode,
  type NodeStatus,
} from "@/lib/skillTree";
import { useAuth } from "./AuthProvider";
import { getUserLevel } from "@/lib/auth";
import { allModules } from "@/lib/data";

// IDs die tatsächlich Modul-Content haben
const AVAILABLE_MODULES = new Set(allModules.map(m => m.slug));

// ─── Farben ─────────────────────────────────────────────────────────────────

const COLORS: Record<NodeStatus, { bg: string; border: string; text: string; bar: string }> = {
  completed:    { bg: "#00ff8818", border: "#00ff88", text: "#00ff88", bar: "#00ff88" },
  "in-progress":{ bg: "#00aaff18", border: "#00aaff", text: "#00aaff", bar: "#00aaff" },
  "not-started":{ bg: "#1e293b",   border: "#475569", text: "#94a3b8", bar: "#475569" },
};

const FRAME_COLORS: Record<string, string> = {
  none: "#a855f7", slate: "#64748b", blue: "#3b82f6", emerald: "#10b981",
  rose: "#f43f5e", violet: "#8b5cf6", amber: "#f59e0b", neon: "#22c55e",
  ice: "#67e8f9", gold: "#fbbf24",
};

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────

/** Alle transitiven Voraussetzungen (nach oben, was ich brauche) */
function getAllPrerequisites(nodeId: string, nodes: SkillTreeNode[]): string[] {
  const result: string[] = [];
  const visited = new Set<string>();
  function walk(id: string) {
    if (visited.has(id)) return;
    visited.add(id);
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    for (const p of node.prerequisites) {
      result.push(p);
      walk(p);
    }
  }
  walk(nodeId);
  return [...new Set(result)];
}

/** Alle Module die von diesem Modul abhängen (nach unten, was mich braucht) */
function getDependents(nodeId: string, nodes: SkillTreeNode[]): string[] {
  return nodes.filter(n => n.prerequisites.includes(nodeId)).map(n => n.id);
}

/** Alle transitiven Abhänglinge (alles was downstream liegt) */
function getAllDependents(nodeId: string, nodes: SkillTreeNode[]): string[] {
  const result: string[] = [];
  const visited = new Set<string>();
  function walk(id: string) {
    if (visited.has(id)) return;
    visited.add(id);
    const dependents = nodes.filter(n => n.prerequisites.includes(id));
    for (const d of dependents) {
      result.push(d.id);
      walk(d.id);
    }
  }
  walk(nodeId);
  return [...new Set(result)];
}

// ─── Component ──────────────────────────────────────────────────────────────

export function SkillTreeGraph() {
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [cat, setCat] = useState("mathe");
  const [hovered, setHovered] = useState<SkillTreeNode | null>(null);
  const [tip, setTip] = useState({ x: 0, y: 0 });
  const [vb, setVb] = useState({ x: -200, y: -100, w: 1800, h: 700 });
  const [panning, setPanning] = useState(false);
  const [pan0, setPan0] = useState({ x: 0, y: 0 });

  const doneModules = user?.completedModules || [];
  const doneLessons = user?.completedLessons || {};

  const nodes = useMemo(() => skillTreeNodes.filter(n => n.category === cat), [cat]);
  const positions = useMemo(() => getPositions(nodes), [nodes]);
  const edges = useMemo(() => {
    const ids = new Set(nodes.map(n => n.id));
    return getEdges(nodes).filter(e => ids.has(e.from) && ids.has(e.to));
  }, [nodes]);

  // Knoten die mit dem Hovered verbunden sind (für Highlight)
  const highlightedIds = useMemo(() => {
    if (!hovered) return new Set<string>();
    const ids = new Set<string>();
    ids.add(hovered.id);
    // Direkte + transitive Voraussetzungen
    for (const p of getAllPrerequisites(hovered.id, nodes)) ids.add(p);
    // Direkte + transitive Abhänglinge
    for (const d of getAllDependents(hovered.id, nodes)) ids.add(d);
    return ids;
  }, [hovered, nodes]);

  // ─── Zoom ───────────────────────────────────────────────────────────────

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = e.deltaY > 0 ? 1.1 : 0.9;
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      const sx = vb.x + (mx / r.width) * vb.w;
      const sy = vb.y + (my / r.height) * vb.h;
      const nw = vb.w * s;
      const nh = vb.h * s;
      setVb({ x: sx - (mx / r.width) * nw, y: sy - (my / r.height) * nh, w: nw, h: nh });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [vb]);

  const onDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || e.button === 2 || (e.button === 0 && e.shiftKey)) {
      setPanning(true);
      setPan0({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!panning) return;
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const dx = (e.clientX - pan0.x) * (vb.w / r.width);
    const dy = (e.clientY - pan0.y) * (vb.h / r.height);
    setVb(v => ({ ...v, x: v.x - dx, y: v.y - dy }));
    setPan0({ x: e.clientX, y: e.clientY });
  }, [panning, pan0, vb]);

  const onUp = useCallback(() => setPanning(false), []);

  // ─── Kategorie ──────────────────────────────────────────────────────────

  const cats = [
    { id: "mathe", label: "Mathematik", icon: "📐", color: "#a855f7" },
    { id: "programmierung", label: "Programmierung", icon: "💻", color: "#f97316" },
    { id: "ihk", label: "IHK-Module", icon: "🏢", color: "#06b6d4" },
  ];

  const catCount = (id: string) => {
    const n = skillTreeNodes.filter(x => x.category === id);
    return { done: n.filter(x => doneModules.includes(x.id)).length, total: n.length };
  };

  const switchCat = (id: string) => {
    setCat(id);
    const n = skillTreeNodes.filter(x => x.category === id);
    if (n.length === 0) return;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const node of n) {
      const px = node.col * COL_W;
      const py = node.row * ROW_H;
      minX = Math.min(minX, px);
      maxX = Math.max(maxX, px);
      minY = Math.min(minY, py);
      maxY = Math.max(maxY, py);
    }
    const pad = 250;
    setVb({ x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2 + NODE_W, h: maxY - minY + pad * 2 + NODE_H });
  };

  // ─── Gekrümmte Kante (Cubic Bezier) ────────────────────────────────────

  const renderEdge = (from: string, to: string, i: number) => {
    const fp = positions.get(from);
    const tp = positions.get(to);
    if (!fp || !tp) return null;
    const fn = nodes.find(n => n.id === from);
    const tn = nodes.find(n => n.id === to);
    if (!fn || !tn) return null;

    const fs = getNodeStatus(fn, doneModules, doneLessons);
    const ts = getNodeStatus(tn, doneModules, doneLessons);
    const bothDone = fs === "completed" && ts === "completed";
    const isActive = fs === "completed" && ts !== "completed";

    const isHighlighted = hovered && (highlightedIds.has(from) && highlightedIds.has(to));
    const isDimmed = hovered && !isHighlighted;

    // Von unten Mitte von from → oben Mitte von to
    const x1 = fp.x + NODE_W / 2;
    const y1 = fp.y + NODE_H;
    const x2 = tp.x + NODE_W / 2;
    const y2 = tp.y;

    // Krümmung: Kontrollpunkte für sanfte Kurve
    const midY = (y1 + y2) / 2;
    const cp1x = x1;
    const cp1y = midY;
    const cp2x = x2;
    const cp2y = midY;
    const d = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;

    // Farbe
    let color: string, w: number, op: number;
    if (bothDone) { color = "#00ff88"; w = 3; op = 0.9; }
    else if (isActive) { color = "#00aaff"; w = 2.5; op = 0.7; }
    else { color = "#ffffff"; w = 2; op = 0.4; }

    // Hover-Modulation
    if (isDimmed) { op = 0.08; w = 1.5; }
    if (isHighlighted && hovered) { op = Math.min(op + 0.3, 1); w += 1; }

    // Pfeilspitze berechnen (Richtung am Endpunkt)
    const arrowSize = 7;
    const angle = Math.atan2(y2 - cp2y, x2 - cp2x);
    const ax = x2 - arrowSize * Math.cos(angle - Math.PI / 6);
    const ay = y2 - arrowSize * Math.sin(angle - Math.PI / 6);
    const bx = x2 - arrowSize * Math.cos(angle + Math.PI / 6);
    const by = y2 - arrowSize * Math.sin(angle + Math.PI / 6);

    return (
      <g key={`e-${i}`} style={{ transition: "opacity 0.2s" }}>
        {/* Glow */}
        <path d={d} fill="none" stroke={color} strokeWidth={w + 10} opacity={op * 0.12} strokeLinecap="round" />
        {/* Linie */}
        <path d={d} fill="none" stroke={color} strokeWidth={w} opacity={op} strokeLinecap="round" />
        {/* Pfeil */}
        <polygon points={`${x2},${y2} ${ax},${ay} ${bx},${by}`} fill={color} opacity={op} />
      </g>
    );
  };

  // ─── Knoten ─────────────────────────────────────────────────────────────

  const renderNode = (node: SkillTreeNode) => {
    const pos = positions.get(node.id);
    if (!pos) return null;
    const status = getNodeStatus(node, doneModules, doneLessons);
    const c = COLORS[status];
    const isH = hovered?.id === node.id;
    const prog = (doneLessons[node.id] || []).length;

    const isDimmed = hovered && !highlightedIds.has(node.id) && !isH;
    const isAvailable = AVAILABLE_MODULES.has(node.id);

    return (
      <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`}
        style={{ transition: "opacity 0.2s", opacity: isDimmed ? 0.2 : 1 }}
        onMouseEnter={e => {
          setHovered(node);
          const r = svgRef.current?.getBoundingClientRect();
          if (r) setTip({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
        onMouseLeave={() => setHovered(null)}
        onClick={() => { if (isAvailable) window.location.href = `/modules/${node.id}`; }}
        className={isAvailable ? "cursor-pointer" : "cursor-default"}>

        {/* Glow-Ring */}
        {status !== "not-started" && (
          <rect x={-4} y={-4} width={NODE_W + 8} height={NODE_H + 8} rx={16}
            fill="none" stroke={c.border} strokeWidth="1.5" opacity={isH ? 0.6 : 0.2}
            style={{ transition: "opacity 0.2s" }} />
        )}

        {/* Karte */}
        <rect width={NODE_W} height={NODE_H} rx={12} fill={c.bg}
          stroke={isH ? c.border : c.border}
          strokeWidth={isH ? 2.5 : 1.5}
          style={{ transition: "stroke-width 0.15s" }} />

        {/* Icon */}
        <text x={14} y={26} fontSize="18" className="select-none pointer-events-none">{node.icon}</text>

        {/* Label */}
        <text x={40} y={22} fontSize="11" fontWeight="600" fill={c.text} className="select-none pointer-events-none">
          {node.label.length > 16 ? node.label.slice(0, 16) + "…" : node.label}
        </text>

        {/* Progress-Bar */}
        <rect x={10} y={36} width={NODE_W - 20} height={5} rx={2.5} fill="rgba(255,255,255,0.04)" />
        {prog > 0 && (
          <rect x={10} y={36} width={Math.max(4, (NODE_W - 20) * Math.min(prog, 10) / 10)} height={5} rx={2.5} fill={c.bar} opacity={0.8} />
        )}

        {/* Status */}
        <text x={12} y={52} fontSize="8" fill={c.text} opacity={0.6} className="select-none pointer-events-none">
          {!isAvailable ? "🔜 Bald verfügbar" : status === "completed" ? "✅ Fertig" : status === "in-progress" ? `📖 ${prog} Lektionen` : "⚪ Starten"}
        </text>

        {/* "Bald" Overlay */}
        {!isAvailable && (
          <rect width={NODE_W} height={NODE_H} rx={12} fill="rgba(15,23,42,0.5)" />
        )}
      </g>
    );
  };

  // ─── Avatar Position ────────────────────────────────────────────────────

  const firstNodeY = nodes.length > 0 ? (positions.get(nodes[0]?.id)?.y ?? 0) : 0;
  const frameColor = FRAME_COLORS[user?.equippedFrame || "none"] || "#a855f7";

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div ref={containerRef} className="relative w-full h-full select-none overflow-hidden">

      {/* Tabs */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 bg-slate-900/90 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-700/50 shadow-xl">
        {cats.map(c => {
          const a = cat === c.id;
          const { done: d, total: t } = catCount(c.id);
          return (
            <button key={c.id} onClick={() => switchCat(c.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${a ? "bg-slate-800 text-white shadow-lg" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
              style={a ? { boxShadow: `0 0 15px ${c.color}30` } : undefined}>
              <span>{c.icon}</span><span>{c.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${a ? "bg-white/10" : "bg-slate-800"}`}>{d}/{t}</span>
            </button>
          );
        })}
      </div>

      {/* Legende */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 bg-slate-900/80 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50 text-xs">
        <div className="text-slate-300 font-medium mb-1">Knoten</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_6px_rgba(0,255,136,0.5)]"></span><span className="text-slate-400">Abgeschlossen</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(0,170,255,0.4)]"></span><span className="text-slate-400">In Bearbeitung</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-500"></span><span className="text-slate-400">Noch nicht gestartet</span></div>
        <div className="border-t border-slate-700/50 mt-1 pt-2 text-slate-300 font-medium">Verbindungen</div>
        <div className="flex items-center gap-2"><span className="w-6 h-0.5 bg-white/50 rounded"></span><span className="text-slate-400">Abhängigkeit</span></div>
        <div className="flex items-center gap-2"><span className="w-6 h-0.5 bg-blue-400 rounded"></span><span className="text-slate-400">Aktiv</span></div>
        <div className="flex items-center gap-2"><span className="w-6 h-0.5 bg-green-400 rounded"></span><span className="text-slate-400">Beide fertig</span></div>
        <div className="border-t border-slate-700/50 mt-1 pt-1 text-slate-500">Shift+Drag = Verschieben</div>
        <div className="text-slate-500">Mausrad = Zoom</div>
        <div className="text-slate-500">Hover = Abhängigkeiten</div>
      </div>

      {/* SVG */}
      <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing"
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
        onContextMenu={e => e.preventDefault()}>

        <defs>
          <clipPath id="avatarClip"><circle cx="0" cy="0" r="36" /></clipPath>
        </defs>

        {/* Kanten (unter den Knoten) */}
        {edges.map((e, i) => renderEdge(e.from, e.to, i))}

        {/* Profilbild */}
        <g transform={`translate(-140, ${firstNodeY})`} className="cursor-pointer" onClick={() => window.location.href = "/profile"}>
          <circle cx={0} cy={0} r={42} fill="none" stroke={frameColor} strokeWidth="3"
            style={{ filter: `drop-shadow(0 0 8px ${frameColor}60)` }} />
          <circle cx={0} cy={0} r={38} fill="none" stroke={frameColor} strokeWidth="1" opacity={0.4} />
          {user?.avatar ? (
            user.avatar.startsWith("http") || user.avatar.startsWith("/") ? (
              <image href={user.avatar} x={-36} y={-36} width={72} height={72} clipPath="url(#avatarClip)" />
            ) : (
              <>
                <circle cx={0} cy={0} r={36} fill="rgba(168,85,247,0.12)" />
                <text textAnchor="middle" dominantBaseline="central" fontSize="30" className="select-none pointer-events-none">{user.avatar}</text>
              </>
            )
          ) : (
            <>
              <circle cx={0} cy={0} r={36} fill="rgba(168,85,247,0.12)" />
              <text textAnchor="middle" dominantBaseline="central" fontSize="24" className="select-none pointer-events-none">👤</text>
            </>
          )}
          <text y={54} textAnchor="middle" fontSize="11" fontWeight="700" fill="#e2e8f0" className="select-none pointer-events-none">
            {user?.displayName || user?.username || "Du"}
          </text>
          {user && (
            <text y={68} textAnchor="middle" fontSize="9" fill="#a855f7" className="select-none pointer-events-none">
              Lv. {getUserLevel(user.totalXP).level} — {getUserLevel(user.totalXP).title}
            </text>
          )}
        </g>

        {/* Knoten */}
        {nodes.map(renderNode)}
      </svg>

      {/* Tooltip */}
      {hovered && (() => {
        const allPrereqs = getAllPrerequisites(hovered.id, nodes);
        const directDeps = getDependents(hovered.id, nodes);
        const allDeps = getAllDependents(hovered.id, nodes);

        // Baum aufbauen: gehoverter Knoten oben, Voraussetzungen als Baum nach unten
        type TreeNode = { id: string; children: TreeNode[] };
        const buildPrereqTree = (nodeId: string, depth: number = 0, visited: Set<string> = new Set()): TreeNode => {
          if (visited.has(nodeId) || depth > 5) return { id: nodeId, children: [] };
          visited.add(nodeId);
          const node = nodes.find(n => n.id === nodeId);
          return {
            id: nodeId,
            children: (node?.prerequisites || [])
              .filter(p => nodes.some(n => n.id === p))
              .map(p => buildPrereqTree(p, depth + 1, visited)),
          };
        };

        const renderTreeNode = (tree: TreeNode, depth: number = 0): React.ReactNode => {
          const pn = nodes.find(n => n.id === tree.id);
          if (!pn) return null;
          const ok = doneModules.includes(tree.id);
          const inProg = (doneLessons[tree.id]?.length || 0) > 0;
          const isHovered = tree.id === hovered.id;
          return (
            <div key={tree.id}>
              <div className="flex items-center gap-1.5" style={{ paddingLeft: `${depth * 14}px` }}>
                {depth > 0 && (
                  <span className="text-slate-600 text-[10px] mr-0.5">{"└─"}</span>
                )}
                <span className={ok ? "text-green-400" : inProg ? "text-blue-400" : "text-slate-500"}>
                  {ok ? "✅" : inProg ? "📖" : "⬜"}
                </span>
                <span className={`${isHovered ? "text-violet-300 font-semibold" : ok ? "text-green-300" : inProg ? "text-blue-300" : "text-slate-400"}`}>
                  {pn.icon} {pn.label}
                </span>
                {isHovered && <span className="text-[10px] text-violet-400 ml-auto font-medium">← hier</span>}
              </div>
              {tree.children.map(child => renderTreeNode(child, depth + 1))}
            </div>
          );
        };

        const tree = buildPrereqTree(hovered.id);

        return (
          <div className="absolute z-20 pointer-events-none bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 max-w-[320px] shadow-2xl"
            style={{ left: Math.min(tip.x + 20, window.innerWidth - 340), top: tip.y - 10 }}>
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{hovered.icon}</span>
              <span className="font-semibold text-slate-200">{hovered.label}</span>
            </div>
            <div className="text-xs text-slate-400 capitalize mb-3">
              {cats.find(c => c.id === hovered.category)?.label}
              {!AVAILABLE_MODULES.has(hovered.id) && (
                <span className="ml-2 text-amber-400">🔜 Bald verfügbar</span>
              )}
            </div>

            {/* Voraussetzungen als Baum */}
            {allPrereqs.length > 0 ? (
              <div className="text-xs mb-3">
                <div className="text-slate-400 font-medium mb-2">📋 Voraussetzungen ({allPrereqs.length}):</div>
                <div className="space-y-0.5 max-h-[200px] overflow-y-auto pr-1">
                  {renderTreeNode(tree)}
                </div>
              </div>
            ) : (
              <div className="text-xs text-green-400 mb-3">✅ Grundlagen-Modul — keine Voraussetzungen</div>
            )}

            {/* Wird gebraucht von */}
            {directDeps.length > 0 && (
              <div className="text-xs border-t border-slate-700/50 pt-2">
                <div className="text-slate-400 font-medium mb-1.5">🔓 Öffnet den Weg zu:</div>
                <div className="flex flex-wrap gap-1.5">
                  {directDeps.map(depId => {
                    const dn = nodes.find(n => n.id === depId);
                    if (!dn) return null;
                    const ok = doneModules.includes(depId);
                    return (
                      <span key={depId} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${ok ? "bg-green-500/10 text-green-300" : "bg-slate-800 text-slate-400"}`}>
                        {dn.icon} {dn.label}
                      </span>
                    );
                  })}
                </div>
                {allDeps.length > directDeps.length && (
                  <div className="text-slate-500 mt-1.5">+{allDeps.length - directDeps.length} weitere downstream…</div>
                )}
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
