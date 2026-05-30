"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import {
  skillTreeNodes,
  getEdges,
  calculateLayout,
  getNodeStatus,
  type SkillTreeNode,
  type NodeStatus,
} from "@/lib/skillTree";
import { useAuth } from "./AuthProvider";
import { getUserLevel } from "@/lib/auth";

// ─── Farben ─────────────────────────────────────────────────────────────────

const STATUS: Record<NodeStatus, { bg: string; border: string; glow: string; text: string }> = {
  completed: {
    bg: "rgba(0,255,136,0.1)",
    border: "#00ff88",
    glow: "0 0 20px rgba(0,255,136,0.4)",
    text: "#00ff88",
  },
  "in-progress": {
    bg: "rgba(0,170,255,0.1)",
    border: "#00aaff",
    glow: "0 0 15px rgba(0,170,255,0.3)",
    text: "#00aaff",
  },
  "not-started": {
    bg: "rgba(30,41,59,0.6)",
    border: "#475569",
    glow: "none",
    text: "#94a3b8",
  },
};

const NODE_W = 150;
const NODE_H = 70;

// ─── Component ──────────────────────────────────────────────────────────────

export function SkillTreeGraph() {
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("mathe");
  const [hoveredNode, setHoveredNode] = useState<SkillTreeNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [viewBox, setViewBox] = useState({ x: -800, y: -600, w: 1600, h: 1200 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const completedModules = user?.completedModules || [];
  const completedLessons = user?.completedLessons || {};

  const positions = useMemo(() => calculateLayout(skillTreeNodes, activeCategory), [activeCategory]);

  const filteredNodes = useMemo(() => skillTreeNodes.filter(n => n.category === activeCategory), [activeCategory]);

  const edges = useMemo(() => {
    const ids = new Set(filteredNodes.map(n => n.id));
    return getEdges(filteredNodes).filter(e => ids.has(e.from) && ids.has(e.to));
  }, [filteredNodes]);

  // ─── Scroll-Zoom verhindert Page-Scroll ─────────────────────────────────

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scale = e.deltaY > 0 ? 1.08 : 0.92;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const svgX = viewBox.x + (mx / rect.width) * viewBox.w;
      const svgY = viewBox.y + (my / rect.height) * viewBox.h;
      const newW = viewBox.w * scale;
      const newH = viewBox.h * scale;
      setViewBox({
        x: svgX - (mx / rect.width) * newW,
        y: svgY - (my / rect.height) * newH,
        w: newW,
        h: newH,
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [viewBox]);

  // ─── Pan (Shift+Drag oder Mittel-Maustaste) ────────────────────────────

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || e.button === 2 || (e.button === 0 && e.shiftKey)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const dx = (e.clientX - panStart.x) * (viewBox.w / rect.width);
      const dy = (e.clientY - panStart.y) * (viewBox.h / rect.height);
      setViewBox(v => ({ ...v, x: v.x - dx, y: v.y - dy }));
      setPanStart({ x: e.clientX, y: e.clientY });
    },
    [isPanning, panStart, viewBox]
  );

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  // ─── Kategorie wechseln ─────────────────────────────────────────────────

  const switchCategory = (cat: string) => {
    setActiveCategory(cat);
    setViewBox({ x: -800, y: -600, w: 1600, h: 1200 });
  };

  // ─── Hilfsfunktionen ───────────────────────────────────────────────────

  const categories = [
    { id: "mathe", label: "Mathematik", icon: "📐", color: "#a855f7" },
    { id: "programmierung", label: "Programmierung", icon: "💻", color: "#f97316" },
    { id: "ihk", label: "IHK-Module", icon: "🏢", color: "#06b6d4" },
  ];

  const getCatCount = (catId: string) => {
    const nodes = skillTreeNodes.filter(n => n.category === catId);
    const done = nodes.filter(n => completedModules.includes(n.id)).length;
    return { done, total: nodes.length };
  };

  // ─── Kanten rendern ─────────────────────────────────────────────────────

  const renderEdge = (fromId: string, toId: string, idx: number) => {
    const fromPos = positions.get(fromId);
    const toPos = positions.get(toId);
    if (!fromPos || !toPos) return null;

    const fromNode = filteredNodes.find(n => n.id === fromId);
    const toNode = filteredNodes.find(n => n.id === toId);
    if (!fromNode || !toNode) return null;

    const fs = getNodeStatus(fromNode, completedModules, completedLessons);
    const ts = getNodeStatus(toNode, completedModules, completedLessons);
    const bothDone = fs === "completed" && ts === "completed";
    const isActive = fs === "completed" && ts !== "completed";

    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = dx / dist;
    const ny = dy / dist;

    const x1 = fromPos.x + nx * (NODE_W / 2 + 8);
    const y1 = fromPos.y + ny * (NODE_H / 2 + 8);
    const x2 = toPos.x - nx * (NODE_W / 2 + 8);
    const y2 = toPos.y - ny * (NODE_H / 2 + 8);

    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const cx = mx - (y2 - y1) * 0.15;
    const cy = my + (x2 - x1) * 0.15;
    const path = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

    return (
      <g key={`e-${idx}`}>
        {(bothDone || isActive) && (
          <path d={path} fill="none" stroke={bothDone ? "#00ff88" : "#00aaff"} strokeWidth={10} opacity={0.1} />
        )}
        <path
          d={path}
          fill="none"
          stroke={bothDone ? "#00ff88" : isActive ? "#00aaff" : "#475569"}
          strokeWidth={bothDone ? 3 : isActive ? 2.5 : 2}
          strokeDasharray={bothDone ? "none" : "10 6"}
          opacity={bothDone ? 1 : isActive ? 0.7 : 0.4}
          strokeLinecap="round"
        />
      </g>
    );
  };

  // ─── Knoten rendern ─────────────────────────────────────────────────────

  const renderNode = (node: SkillTreeNode) => {
    const pos = positions.get(node.id);
    if (!pos) return null;

    const status = getNodeStatus(node, completedModules, completedLessons);
    const colors = STATUS[status];
    const isHovered = hoveredNode?.id === node.id;
    const lessons = completedLessons[node.id] || [];
    const progress = lessons.length;

    return (
      <g
        key={node.id}
        transform={`translate(${pos.x}, ${pos.y})`}
        onMouseEnter={(e) => {
          setHoveredNode(node);
          const r = svgRef.current?.getBoundingClientRect();
          if (r) setTooltipPos({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
        onMouseLeave={() => setHoveredNode(null)}
        onClick={() => { window.location.href = `/modules/${node.id}`; }}
        className="cursor-pointer"
      >
        {/* Glow */}
        {status !== "not-started" && (
          <rect x={-NODE_W/2-4} y={-NODE_H/2-4} width={NODE_W+8} height={NODE_H+8} rx={16}
            fill="none" stroke={colors.border} strokeWidth="1" opacity={0.3}
            style={{ filter: `drop-shadow(${colors.glow})` }}
          />
        )}

        {/* Karte */}
        <rect x={-NODE_W/2} y={-NODE_H/2} width={NODE_W} height={NODE_H} rx={14}
          fill={colors.bg} stroke={colors.border} strokeWidth={isHovered ? 2.5 : 1.5}
          className="transition-all duration-200"
        />

        {/* Icon */}
        <text x={-NODE_W/2+14} y={-8} fontSize="20" className="select-none pointer-events-none">
          {node.icon}
        </text>

        {/* Label */}
        <text x={-NODE_W/2+40} y={-6} fontSize="11" fontWeight="600" fill={colors.text}
          className="select-none pointer-events-none">
          {node.label.length > 15 ? node.label.slice(0, 15) + "…" : node.label}
        </text>

        {/* Progress-Balken */}
        <rect x={-NODE_W/2+12} y={10} width={NODE_W-24} height={6} rx={3} fill="rgba(255,255,255,0.05)" />
        {progress > 0 && (
          <rect x={-NODE_W/2+12} y={10}
            width={Math.max(6, (NODE_W-24) * Math.min(progress, 10) / 10)}
            height={6} rx={3} fill={colors.border} opacity={0.8} />
        )}

        {/* Status-Text */}
        <text x={-NODE_W/2+14} y={28} fontSize="9" fill={colors.text} opacity={0.7}
          className="select-none pointer-events-none">
          {status === "completed" ? "✅ Fertig" : status === "in-progress" ? `📖 ${progress} Lektionen` : "⚪ Noch nicht gestartet"}
        </text>
      </g>
    );
  };

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div ref={containerRef} className="relative w-full h-full select-none overflow-hidden">

      {/* Tabs */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 bg-slate-900/90 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-700/50 shadow-xl">
        {categories.map(cat => {
          const active = activeCategory === cat.id;
          const { done, total } = getCatCount(cat.id);
          return (
            <button key={cat.id} onClick={() => switchCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active ? "bg-slate-800 text-white shadow-lg" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
              style={active ? { boxShadow: `0 0 15px ${cat.color}30` } : undefined}>
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? "bg-white/10" : "bg-slate-800"}`}>
                {done}/{total}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legende */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 bg-slate-900/80 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50 text-xs">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(0,255,136,0.6)]"></span><span className="text-slate-400">Abgeschlossen</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(0,170,255,0.4)]"></span><span className="text-slate-400">In Bearbeitung</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-500"></span><span className="text-slate-400">Noch nicht gestartet</span></div>
        <div className="border-t border-slate-700/50 mt-1 pt-1 text-slate-500">Shift+Drag = Verschieben</div>
        <div className="text-slate-500">Mausrad = Zoom</div>
      </div>

      {/* SVG */}
      <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        onContextMenu={e => e.preventDefault()}>

        <defs>
          <linearGradient id="bannerGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <clipPath id="avatarClip"><circle cx="0" cy="0" r="40" /></clipPath>
        </defs>

        {/* Kanten */}
        {edges.map((e, i) => renderEdge(e.from, e.to, i))}

        {/* Start-Knoten: Profil */}
        <g transform="translate(0,0)" className="cursor-pointer" onClick={() => window.location.href = "/profile"}>
          <circle r={52} fill="none" stroke="#a855f7" strokeWidth="1" opacity={0.2} />
          <circle r={48} fill="none" stroke="#a855f7" strokeWidth="2" opacity={0.4}
            style={{ filter: "drop-shadow(0 0 12px rgba(168,85,247,0.5))" }} />
          {user?.avatar ? (
            <image href={user.avatar} x={-40} y={-40} width={80} height={80} clipPath="url(#avatarClip)" />
          ) : (
            <>
              <circle r={40} fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="2" />
              <text textAnchor="middle" dominantBaseline="central" fontSize="32" className="select-none pointer-events-none">👤</text>
            </>
          )}
          <text y={58} textAnchor="middle" fontSize="12" fontWeight="700" fill="#e2e8f0" className="select-none pointer-events-none">
            {user?.displayName || user?.username || "Du"}
          </text>
          {user && (
            <text y={74} textAnchor="middle" fontSize="10" fill="#a855f7" className="select-none pointer-events-none">
              Lv. {getUserLevel(user.totalXP).level} — {getUserLevel(user.totalXP).title}
            </text>
          )}
          <rect x={-50} y={-58} width={100} height={12} rx={6} fill="url(#bannerGrad)" opacity={0.8} />
          <text y={-49} textAnchor="middle" fontSize="7" fill="white" fontWeight="700" className="select-none pointer-events-none">LEARNHUB</text>
        </g>

        {/* Knoten */}
        {filteredNodes.map(renderNode)}
      </svg>

      {/* Tooltip */}
      {hoveredNode && (
        <div className="absolute z-20 pointer-events-none bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 max-w-[280px] shadow-2xl"
          style={{ left: Math.min(tooltipPos.x + 20, window.innerWidth - 300), top: tooltipPos.y - 10 }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{hoveredNode.icon}</span>
            <span className="font-semibold text-slate-200">{hoveredNode.label}</span>
          </div>
          <div className="text-xs text-slate-400 capitalize mb-3">{categories.find(c => c.id === hoveredNode.category)?.label}</div>
          {hoveredNode.prerequisites.length > 0 && (
            <div className="text-xs mb-2">
              <span className="text-slate-400 font-medium">Baut auf:</span>
              <div className="mt-1 space-y-1">
                {hoveredNode.prerequisites.map(p => {
                  const pn = skillTreeNodes.find(n => n.id === p);
                  const done = completedModules.includes(p);
                  return (
                    <div key={p} className="flex items-center gap-1.5">
                      <span className={done ? "text-green-400" : "text-slate-500"}>{done ? "✅" : "⬜"}</span>
                      <span className={done ? "text-green-300" : "text-slate-400"}>{pn?.icon} {pn?.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {hoveredNode.prerequisites.length === 0 && <div className="text-xs text-green-400">✅ Grundlagen-Modul</div>}
        </div>
      )}
    </div>
  );
}
