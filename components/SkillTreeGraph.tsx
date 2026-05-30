"use client";

import { useState, useRef, useCallback, useMemo } from "react";
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
    bg: "rgba(0,255,136,0.08)",
    border: "#00ff88",
    glow: "0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.2)",
    text: "#00ff88",
  },
  available: {
    bg: "rgba(0,170,255,0.08)",
    border: "#00aaff",
    glow: "0 0 15px rgba(0,170,255,0.3), 0 0 30px rgba(0,170,255,0.15)",
    text: "#00aaff",
  },
  locked: {
    bg: "rgba(30,41,59,0.8)",
    border: "#334155",
    glow: "none",
    text: "#64748b",
  },
};

const NODE_WIDTH = 150;
const NODE_HEIGHT = 70;

// ─── Component ──────────────────────────────────────────────────────────────

export function SkillTreeGraph() {
  const { user } = useAuth();
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("mathe");
  const [hoveredNode, setHoveredNode] = useState<SkillTreeNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // ViewBox State für Zoom/Pan
  const [viewBox, setViewBox] = useState({ x: -800, y: -500, w: 1600, h: 1000 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const completedModules = user?.completedModules || [];

  // Berechne Layout für aktive Kategorie
  const positions = useMemo(
    () => calculateLayout(skillTreeNodes, activeCategory),
    [activeCategory]
  );

  const filteredNodes = useMemo(
    () => skillTreeNodes.filter(n => n.category === activeCategory),
    [activeCategory]
  );

  const edges = useMemo(() => {
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    return getEdges(filteredNodes).filter(e => nodeIds.has(e.from) && nodeIds.has(e.to));
  }, [filteredNodes]);

  // ─── Zoom & Pan ─────────────────────────────────────────────────────────

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const scale = e.deltaY > 0 ? 1.1 : 0.9;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const svgX = viewBox.x + (mouseX / rect.width) * viewBox.w;
      const svgY = viewBox.y + (mouseY / rect.height) * viewBox.h;
      const newW = viewBox.w * scale;
      const newH = viewBox.h * scale;
      setViewBox({
        x: svgX - (mouseX / rect.width) * newW,
        y: svgY - (mouseY / rect.height) * newH,
        w: newW,
        h: newH,
      });
    },
    [viewBox]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 1 || e.button === 2 || (e.button === 0 && e.shiftKey)) {
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
      }
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const dx = (e.clientX - panStart.x) * (viewBox.w / rect.width);
      const dy = (e.clientY - panStart.y) * (viewBox.h / rect.height);
      setViewBox((prev) => ({ ...prev, x: prev.x - dx, y: prev.y - dy }));
      setPanStart({ x: e.clientX, y: e.clientY });
    },
    [isPanning, panStart, viewBox]
  );

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  // ─── Kategorie wechseln ─────────────────────────────────────────────────

  const switchCategory = (cat: string) => {
    setActiveCategory(cat);
    // Reset ViewBox auf gute Position für die Kategorie
    setViewBox({ x: -800, y: -500, w: 1600, h: 1000 });
  };

  // ─── Render Helpers ─────────────────────────────────────────────────────

  const renderEdge = (fromId: string, toId: string, idx: number) => {
    const fromPos = positions.get(fromId);
    const toPos = positions.get(toId);
    if (!fromPos || !toPos) return null;

    const fromNode = filteredNodes.find((n) => n.id === fromId);
    const toNode = filteredNodes.find((n) => n.id === toId);
    if (!fromNode || !toNode) return null;

    const fromStatus = getNodeStatus(fromNode, completedModules);
    const toStatus = getNodeStatus(toNode, completedModules);
    const isCompletedPath = fromStatus === "completed" && toStatus === "completed";
    const isActive = fromStatus === "completed" && toStatus === "available";

    // Kanten-Endpunkte an den Knotenrändern
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / dist;
    const ny = dy / dist;

    const x1 = fromPos.x + nx * (NODE_WIDTH / 2 + 5);
    const y1 = fromPos.y + ny * (NODE_HEIGHT / 2 + 5);
    const x2 = toPos.x - nx * (NODE_WIDTH / 2 + 5);
    const y2 = toPos.y - ny * (NODE_HEIGHT / 2 + 5);

    // Bezier-Kurve
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const ctrlX = midX - (y2 - y1) * 0.2;
    const ctrlY = midY + (x2 - x1) * 0.2;

    return (
      <g key={`edge-${idx}`}>
        {/* Glow-Linie (dahinter) */}
        {(isCompletedPath || isActive) && (
          <path
            d={`M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`}
            fill="none"
            stroke={isCompletedPath ? "#00ff88" : "#00aaff"}
            strokeWidth={isCompletedPath ? 8 : 6}
            opacity={isCompletedPath ? 0.15 : 0.1}
            style={{ filter: "blur(4px)" }}
          />
        )}
        {/* Haupt-Linie */}
        <path
          d={`M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`}
          fill="none"
          stroke={isCompletedPath ? "#00ff88" : isActive ? "#00aaff" : "#475569"}
          strokeWidth={isCompletedPath ? 3.5 : isActive ? 2.5 : 2}
          strokeDasharray={isCompletedPath ? "none" : "12 6"}
          opacity={isCompletedPath ? 1 : isActive ? 0.8 : 0.5}
          strokeLinecap="round"
        />
        {/* Pfeilspitze */}
        {isActive && (
          <circle
            cx={x2}
            cy={y2}
            r={4}
            fill="#00aaff"
            opacity={0.8}
          />
        )}
      </g>
    );
  };

  const renderNode = (node: SkillTreeNode) => {
    const pos = positions.get(node.id);
    if (!pos) return null;

    const status = getNodeStatus(node, completedModules);
    const colors = STATUS[status];
    const isHovered = hoveredNode?.id === node.id;

    // Progress berechnen
    const completedLessons = user?.completedLessons[node.id] || [];
    const moduleProgress = completedLessons.length;
    const isLocked = status === "locked";

    return (
      <g
        key={node.id}
        transform={`translate(${pos.x}, ${pos.y})`}
        onMouseEnter={(e) => {
          setHoveredNode(node);
          const rect = svgRef.current?.getBoundingClientRect();
          if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseLeave={() => setHoveredNode(null)}
        onClick={() => !isLocked && (window.location.href = `/modules/${node.id}`)}
        style={{ cursor: isLocked ? "not-allowed" : "pointer" }}
      >
        {/* Glow-Hintergrund */}
        {status !== "locked" && (
          <rect
            x={-NODE_WIDTH / 2 - 3}
            y={-NODE_HEIGHT / 2 - 3}
            width={NODE_WIDTH + 6}
            height={NODE_HEIGHT + 6}
            rx={16}
            fill="none"
            stroke={colors.border}
            strokeWidth="1"
            opacity={0.3}
            style={{ filter: `drop-shadow(${colors.glow})` }}
          />
        )}

        {/* Haupt-Rechteck */}
        <rect
          x={-NODE_WIDTH / 2}
          y={-NODE_HEIGHT / 2}
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          rx={14}
          fill={colors.bg}
          stroke={colors.border}
          strokeWidth={isHovered ? 2.5 : 1.5}
          className="transition-all duration-200"
        />

        {/* Icon + Label */}
        <text
          x={-NODE_WIDTH / 2 + 14}
          y={-8}
          fontSize="20"
          className="select-none pointer-events-none"
        >
          {node.icon}
        </text>
        <text
          x={-NODE_WIDTH / 2 + 40}
          y={-6}
          fontSize="12"
          fontWeight="600"
          fill={colors.text}
          className="select-none pointer-events-none"
        >
          {node.label.length > 14 ? node.label.slice(0, 14) + "…" : node.label}
        </text>

        {/* Lock-Icon */}
        {isLocked && (
          <text x={NODE_WIDTH / 2 - 20} y={-6} fontSize="14" className="select-none pointer-events-none">
            🔒
          </text>
        )}

        {/* Progress-Balken */}
        <rect
          x={-NODE_WIDTH / 2 + 12}
          y={10}
          width={NODE_WIDTH - 24}
          height={6}
          rx={3}
          fill="rgba(255,255,255,0.05)"
        />
        {moduleProgress > 0 && (
          <rect
            x={-NODE_WIDTH / 2 + 12}
            y={10}
            width={Math.max(6, ((NODE_WIDTH - 24) * Math.min(moduleProgress, 10)) / 10)}
            height={6}
            rx={3}
            fill={colors.border}
            opacity={0.7}
          />
        )}

        {/* Status-Text */}
        <text
          x={-NODE_WIDTH / 2 + 14}
          y={30}
          fontSize="9"
          fill={colors.text}
          opacity={0.7}
          className="select-none pointer-events-none"
        >
          {status === "completed" ? "✅ Abgeschlossen" : status === "available" ? "▶️ Verfügbar" : "🔒 Gesperrt"}
        </text>
      </g>
    );
  };

  // ─── Kategorie-Metadaten ────────────────────────────────────────────────

  const categories = [
    { id: "mathe", label: "Mathematik", icon: "📐", color: "#a855f7", count: skillTreeNodes.filter(n => n.category === "mathe").length },
    { id: "programmierung", label: "Programmierung", icon: "💻", color: "#f97316", count: skillTreeNodes.filter(n => n.category === "programmierung").length },
    { id: "ihk", label: "IHK-Module", icon: "🏢", color: "#06b6d4", count: skillTreeNodes.filter(n => n.category === "ihk").length },
  ];

  const activeCat = categories.find(c => c.id === activeCategory)!;

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="relative w-full h-full select-none">
      {/* Kategorie-Tabs */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 bg-slate-900/90 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-700/50 shadow-xl">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const completedCount = skillTreeNodes
            .filter(n => n.category === cat.id)
            .filter(n => completedModules.includes(n.id)).length;

          return (
            <button
              key={cat.id}
              onClick={() => switchCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-slate-800 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
              style={isActive ? { boxShadow: `0 0 15px ${cat.color}30` } : undefined}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/10" : "bg-slate-800"}`}>
                {completedCount}/{cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legende */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 bg-slate-900/80 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(0,255,136,0.6)]"></span>
          <span className="text-slate-400">Abgeschlossen</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(0,170,255,0.4)]"></span>
          <span className="text-slate-400">Verfügbar</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-600"></span>
          <span className="text-slate-400">Gesperrt</span>
        </div>
        <div className="border-t border-slate-700/50 mt-1 pt-1 text-slate-500">
          Shift+Drag zum Verschieben
        </div>
      </div>

      {/* SVG Graph */}
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onContextMenu={(e) => e.preventDefault()}
      >
        <defs>
          <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feFlood floodColor="#00ff88" floodOpacity="0.5" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#00aaff" floodOpacity="0.35" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Kanten (zuerst zeichnen, dann Knoten drauf) */}
        {edges.map((edge, i) => renderEdge(edge.from, edge.to, i))}

        {/* Start-Knoten: User-Profil */}
        <g transform="translate(0, 0)" className="cursor-pointer" onClick={() => window.location.href = "/profile"}>
          {/* Äußerer Glow-Ring */}
          <circle r={52} fill="none" stroke="#a855f7" strokeWidth="1" opacity={0.2} />
          <circle r={48} fill="none" stroke="#a855f7" strokeWidth="2" opacity={0.4}
            style={{ filter: "drop-shadow(0 0 12px rgba(168,85,247,0.5))" }} />

          {/* Avatar (oder Fallback) */}
          {user?.avatar ? (
            <image
              href={user.avatar}
              x={-40}
              y={-40}
              width={80}
              height={80}
              clipPath="url(#avatarClip)"
              className="rounded-full"
            />
          ) : (
            <circle r={40} fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="2" />
          )}

          {/* Clip-Path für runden Avatar */}
          <defs>
            <clipPath id="avatarClip">
              <circle cx="0" cy="0" r="40" />
            </clipPath>
          </defs>

          {/* Fallback-Icon wenn kein Avatar */}
          {!user?.avatar && (
            <text textAnchor="middle" dominantBaseline="central" fontSize="32" className="select-none pointer-events-none">
              👤
            </text>
          )}

          {/* Name */}
          <text y={58} textAnchor="middle" fontSize="12" fontWeight="700" fill="#e2e8f0" className="select-none pointer-events-none">
            {user?.displayName || user?.username || "Du"}
          </text>

          {/* Level */}
          {user && (
            <text y={74} textAnchor="middle" fontSize="10" fill="#a855f7" className="select-none pointer-events-none">
              Lv. {getUserLevel(user.totalXP).level} — {getUserLevel(user.totalXP).title}
            </text>
          )}

          {/* Banner-Leiste */}
          <rect x={-50} y={-58} width={100} height={12} rx={6} fill="url(#bannerGradient)" opacity={0.8} />
          <defs>
            <linearGradient id="bannerGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <text y={-49} textAnchor="middle" fontSize="7" fill="white" fontWeight="700" className="select-none pointer-events-none">
            LEARNHUB
          </text>
        </g>

        {/* Knoten */}
        {filteredNodes.map(renderNode)}
      </svg>

      {/* Tooltip */}
      {hoveredNode && (
        <div
          className="absolute z-20 pointer-events-none bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 max-w-[280px] shadow-2xl"
          style={{
            left: Math.min(tooltipPos.x + 20, window.innerWidth - 300),
            top: tooltipPos.y - 10,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{hoveredNode.icon}</span>
            <span className="font-semibold text-slate-200">{hoveredNode.label}</span>
          </div>
          <div className="text-xs text-slate-400 capitalize mb-3">
            {categories.find(c => c.id === hoveredNode.category)?.label}
          </div>

          {hoveredNode.prerequisites.length > 0 && (
            <div className="text-xs mb-2">
              <span className="text-slate-400 font-medium">Voraussetzungen:</span>
              <div className="mt-1 space-y-1">
                {hoveredNode.prerequisites.map((p) => {
                  const prereqNode = skillTreeNodes.find((n) => n.id === p);
                  const isCompleted = completedModules.includes(p);
                  return (
                    <div key={p} className="flex items-center gap-1.5">
                      <span className={isCompleted ? "text-green-400" : "text-red-400"}>
                        {isCompleted ? "✅" : "❌"}
                      </span>
                      <span className={isCompleted ? "text-green-300" : "text-red-300"}>
                        {prereqNode?.icon} {prereqNode?.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {hoveredNode.prerequisites.length === 0 && (
            <div className="text-xs text-green-400">✅ Keine Voraussetzungen</div>
          )}

          {getNodeStatus(hoveredNode, completedModules) === "locked" && (
            <div className="text-xs text-red-400 mt-2 pt-2 border-t border-slate-700/50">
              🔒 Schließe zuerst die Voraussetzungen ab
            </div>
          )}
        </div>
      )}
    </div>
  );
}
