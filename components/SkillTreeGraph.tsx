"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import {
  skillTreeNodes,
  getEdges,
  getPositions,
  getNodeStatus,
  NODE_W,
  NODE_H,
  type SkillTreeNode,
  type NodeStatus,
} from "@/lib/skillTree";
import { useAuth } from "./AuthProvider";
import { getUserLevel } from "@/lib/auth";

// ─── Farben ─────────────────────────────────────────────────────────────────

const COLORS: Record<NodeStatus, { bg: string; border: string; text: string; bar: string }> = {
  completed: { bg: "#00ff8818", border: "#00ff88", text: "#00ff88", bar: "#00ff88" },
  "in-progress": { bg: "#00aaff18", border: "#00aaff", text: "#00aaff", bar: "#00aaff" },
  "not-started": { bg: "#1e293b", border: "#475569", text: "#94a3b8", bar: "#475569" },
};

const FRAME_COLORS: Record<string, string> = {
  none: "#a855f7",
  slate: "#64748b",
  blue: "#3b82f6",
  emerald: "#10b981",
  rose: "#f43f5e",
  violet: "#8b5cf6",
  amber: "#f59e0b",
  neon: "#22c55e",
  ice: "#67e8f9",
  gold: "#fbbf24",
};

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
      minX = Math.min(minX, node.x);
      maxX = Math.max(maxX, node.x);
      minY = Math.min(minY, node.y);
      maxY = Math.max(maxY, node.y);
    }
    const pad = 250;
    setVb({ x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2 + NODE_W, h: maxY - minY + pad * 2 + NODE_H });
  };

  // ─── Orthogonale Kante (Schritt-Linie) ─────────────────────────────────

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

    // Weiße Linie, heller wenn Pfad abgeschlossen
    const color = bothDone ? "#ffffff" : "#ffffff";
    const w = bothDone ? 2.5 : 1.5;
    const op = bothDone ? 0.5 : 0.15;

    // Rechte Kante von from → linke Kante von to
    const x1 = fp.x + NODE_W / 2;
    const y1 = fp.y + NODE_H / 2;
    const x2 = tp.x - NODE_W / 2;
    const y2 = tp.y + NODE_H / 2;

    // Gerade Linie
    return (
      <g key={`e-${i}`}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} opacity={op} strokeLinecap="round" />
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

    return (
      <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`}
        onMouseEnter={e => {
          setHovered(node);
          const r = svgRef.current?.getBoundingClientRect();
          if (r) setTip({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
        onMouseLeave={() => setHovered(null)}
        onClick={() => { window.location.href = `/modules/${node.id}`; }}
        className="cursor-pointer">

        {/* Glow */}
        {status !== "not-started" && (
          <rect x={-3} y={-3} width={NODE_W + 6} height={NODE_H + 6} rx={14}
            fill="none" stroke={c.border} strokeWidth="1.5" opacity={0.25} />
        )}

        {/* Karte */}
        <rect width={NODE_W} height={NODE_H} rx={12} fill={c.bg} stroke={c.border} strokeWidth={isH ? 2.5 : 1.5} />

        {/* Icon */}
        <text x={14} y={24} fontSize="18" className="select-none pointer-events-none">{node.icon}</text>

        {/* Label */}
        <text x={40} y={22} fontSize="11" fontWeight="600" fill={c.text} className="select-none pointer-events-none">
          {node.label.length > 16 ? node.label.slice(0, 16) + "…" : node.label}
        </text>

        {/* Progress */}
        <rect x={10} y={36} width={NODE_W - 20} height={5} rx={2.5} fill="rgba(255,255,255,0.04)" />
        {prog > 0 && (
          <rect x={10} y={36} width={Math.max(4, (NODE_W - 20) * Math.min(prog, 10) / 10)} height={5} rx={2.5} fill={c.bar} opacity={0.8} />
        )}

        {/* Status */}
        <text x={12} y={52} fontSize="8" fill={c.text} opacity={0.6} className="select-none pointer-events-none">
          {status === "completed" ? "✅ Fertig" : status === "in-progress" ? `📖 ${prog} Lektionen` : "⚪ Starten"}
        </text>
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
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_6px_rgba(0,255,136,0.5)]"></span><span className="text-slate-400">Abgeschlossen</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(0,170,255,0.4)]"></span><span className="text-slate-400">In Bearbeitung</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-500"></span><span className="text-slate-400">Noch nicht gestartet</span></div>
        <div className="border-t border-slate-700/50 mt-1 pt-1 text-slate-500">Shift+Drag = Verschieben</div>
        <div className="text-slate-500">Mausrad = Zoom</div>
      </div>

      {/* SVG */}
      <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing"
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
        onContextMenu={e => e.preventDefault()}>

        <defs>
          <clipPath id="avatarClip"><circle cx="0" cy="0" r="36" /></clipPath>
        </defs>

        {/* Kanten */}
        {edges.map((e, i) => renderEdge(e.from, e.to, i))}

        {/* Profilbild */}
        <g transform={`translate(-140, ${firstNodeY})`} className="cursor-pointer" onClick={() => window.location.href = "/profile"}>
          {/* Frame-Ring (wie AvatarFrame) */}
          <circle cx={0} cy={0} r={42} fill="none" stroke={frameColor} strokeWidth="3"
            style={{ filter: `drop-shadow(0 0 8px ${frameColor}60)` }} />
          <circle cx={0} cy={0} r={38} fill="none" stroke={frameColor} strokeWidth="1" opacity={0.4} />

          {/* Avatar */}
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

          {/* Name */}
          <text y={54} textAnchor="middle" fontSize="11" fontWeight="700" fill="#e2e8f0" className="select-none pointer-events-none">
            {user?.displayName || user?.username || "Du"}
          </text>
          {/* Level */}
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
      {hovered && (
        <div className="absolute z-20 pointer-events-none bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 max-w-[260px] shadow-2xl"
          style={{ left: Math.min(tip.x + 20, window.innerWidth - 280), top: tip.y - 10 }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{hovered.icon}</span>
            <span className="font-semibold text-slate-200">{hovered.label}</span>
          </div>
          <div className="text-xs text-slate-400 capitalize mb-3">{cats.find(c => c.id === hovered.category)?.label}</div>
          {hovered.prerequisite && (() => {
            const pn = skillTreeNodes.find(n => n.id === hovered.prerequisite);
            const ok = doneModules.includes(hovered.prerequisite);
            return (
              <div className="text-xs mb-2">
                <span className="text-slate-400 font-medium">Baut auf:</span>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className={ok ? "text-green-400" : "text-slate-500"}>{ok ? "✅" : "⬜"}</span>
                  <span className={ok ? "text-green-300" : "text-slate-400"}>{pn?.icon} {pn?.label}</span>
                </div>
              </div>
            );
          })()}
          {!hovered.prerequisite && <div className="text-xs text-green-400">✅ Grundlagen-Modul</div>}
        </div>
      )}
    </div>
  );
}
