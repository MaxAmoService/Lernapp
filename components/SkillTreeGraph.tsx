"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { skillTreeNodes, getEdges, getNodePosition, getNodeStatus, filterByCategory, type SkillTreeNode, type NodeStatus } from "@/lib/skillTree";
import { useAuth } from "./AuthProvider";

// ─── Farben ─────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<NodeStatus, { fill: string; stroke: string; glow: string; text: string }> = {
  completed: { fill: "#00ff88", stroke: "#00cc6a", glow: "rgba(0,255,136,0.6)", text: "#00ff88" },
  available: { fill: "#00aaff", stroke: "#0088cc", glow: "rgba(0,170,255,0.4)", text: "#00aaff" },
  locked: { fill: "#334", stroke: "#445", glow: "none", text: "#556" },
};

const CATEGORY_COLORS: Record<string, string> = {
  mathe: "#a855f7",
  programmierung: "#f97316",
  ihk: "#06b6d4",
};

// ─── Component ──────────────────────────────────────────────────────────────

export function SkillTreeGraph() {
  const { user } = useAuth();
  const svgRef = useRef<SVGSVGElement>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SkillTreeNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [viewBox, setViewBox] = useState({ x: -600, y: -600, w: 1200, h: 1200 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const completedModules = user?.completedModules || [];
  const filteredNodes = filterByCategory(skillTreeNodes, filter);
  const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
  const edges = getEdges(filteredNodes).filter(e => filteredNodeIds.has(e.from) && filteredNodeIds.has(e.to));

  const centerX = 0;
  const centerY = 0;
  const ringSpacing = 100;

  // ─── Zoom & Pan ─────────────────────────────────────────────────────────

  const handleWheel = useCallback((e: React.WheelEvent) => {
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
  }, [viewBox]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || e.button === 2 || (e.button === 0 && e.shiftKey)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const dx = (e.clientX - panStart.x) * (viewBox.w / rect.width);
    const dy = (e.clientY - panStart.y) * (viewBox.h / rect.height);
    setViewBox(prev => ({ ...prev, x: prev.x - dx, y: prev.y - dy }));
    setPanStart({ x: e.clientX, y: e.clientY });
  }, [isPanning, panStart, viewBox]);

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  // ─── Reset Zoom ─────────────────────────────────────────────────────────

  const resetView = () => setViewBox({ x: -600, y: -600, w: 1200, h: 1200 });

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="relative w-full h-full">
      {/* Filter-Tabs */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-slate-900/80 backdrop-blur-sm rounded-xl p-1 border border-slate-700/50">
        {[
          { id: null, label: "Alle", icon: "🌍" },
          { id: "mathe", label: "Mathe", icon: "📐" },
          { id: "programmierung", label: "Programmierung", icon: "💻" },
          { id: "ihk", label: "IHK", icon: "🏢" },
        ].map(tab => (
          <button
            key={tab.id || "alle"}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === tab.id
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Reset-Button */}
      <button
        onClick={resetView}
        className="absolute top-4 right-4 z-10 px-3 py-2 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-700/50 text-slate-400 hover:text-slate-200 text-sm transition-colors"
      >
        🔄 Reset
      </button>

      {/* SVG Graph */}
      <svg
        ref={svgRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onContextMenu={e => e.preventDefault()}
      >
        <defs>
          {/* Glow-Filter */}
          <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#00ff88" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#00aaff" floodOpacity="0.4" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Pfeilspitze */}
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#556" />
          </marker>
          <marker id="arrowhead-active" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#00aaff" />
          </marker>
        </defs>

        {/* Ring-Hintergrund */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(tier => (
          <circle
            key={tier}
            cx={centerX}
            cy={centerY}
            r={tier * ringSpacing}
            fill="none"
            stroke="#1e293b"
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity={0.3}
          />
        ))}

        {/* Kanten */}
        {edges.map((edge, i) => {
          const fromNode = filteredNodes.find(n => n.id === edge.from);
          const toNode = filteredNodes.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return null;
          const from = getNodePosition(fromNode, centerX, centerY, ringSpacing);
          const to = getNodePosition(toNode, centerX, centerY, ringSpacing);
          const fromStatus = getNodeStatus(fromNode, completedModules);
          const toStatus = getNodeStatus(toNode, completedModules);
          const isActive = fromStatus === "completed" && toStatus !== "locked";
          const isCompletedPath = fromStatus === "completed" && toStatus === "completed";

          // Kurven-Pfad
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const ctrlX = midX - dy * 0.15;
          const ctrlY = midY + dx * 0.15;

          return (
            <path
              key={`edge-${i}`}
              d={`M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`}
              fill="none"
              stroke={isCompletedPath ? "#00ff88" : isActive ? "#00aaff" : "#334"}
              strokeWidth={isCompletedPath ? 3 : isActive ? 2 : 1.5}
              strokeDasharray={isCompletedPath ? "none" : isActive ? "8 4" : "4 8"}
              markerEnd={isActive ? "url(#arrowhead-active)" : "url(#arrowhead)"}
              opacity={isCompletedPath ? 0.9 : isActive ? 0.7 : 0.3}
              className={isCompletedPath ? "animate-pulse" : ""}
            />
          );
        })}

        {/* Knoten */}
        {filteredNodes.map(node => {
          const pos = getNodePosition(node, centerX, centerY, ringSpacing);
          const status = getNodeStatus(node, completedModules);
          const colors = STATUS_COLORS[status];
          const nodeRadius = 28;
          const isHovered = hoveredNode?.id === node.id;

          return (
            <g
              key={node.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              onMouseEnter={(e) => {
                setHoveredNode(node);
                const rect = svgRef.current?.getBoundingClientRect();
                if (rect) {
                  setTooltipPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }
              }}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => {
                if (status !== "locked") {
                  window.location.href = `/modules/${node.id}`;
                }
              }}
              className={status !== "locked" ? "cursor-pointer" : "cursor-not-allowed"}
            >
              {/* Glow-Hintergrund */}
              {status !== "locked" && (
                <circle
                  r={nodeRadius + 4}
                  fill="none"
                  stroke={colors.glow}
                  strokeWidth="2"
                  filter={status === "completed" ? "url(#glow-green)" : "url(#glow-blue)"}
                  className={status === "completed" ? "animate-pulse" : ""}
                />
              )}

              {/* Hauptkreis */}
              <circle
                r={nodeRadius}
                fill={status === "locked" ? "#1e293b" : `${colors.fill}15`}
                stroke={colors.stroke}
                strokeWidth={isHovered ? 3 : 2}
                className="transition-all duration-200"
              />

              {/* Icon */}
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="18"
                className="select-none pointer-events-none"
              >
                {node.icon}
              </text>

              {/* Label */}
              <text
                y={nodeRadius + 14}
                textAnchor="middle"
                fontSize="9"
                fill={colors.text}
                className="select-none pointer-events-none font-medium"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredNode && (
        <div
          className="absolute z-20 pointer-events-none bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 max-w-[250px] shadow-xl"
          style={{
            left: tooltipPos.x + 20,
            top: tooltipPos.y - 10,
            transform: tooltipPos.x > window.innerWidth / 2 ? "translateX(-120%)" : "none",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{hoveredNode.icon}</span>
            <span className="font-semibold text-slate-200 text-sm">{hoveredNode.label}</span>
          </div>
          <div className="text-xs text-slate-400 capitalize mb-2">{hoveredNode.category}</div>
          {hoveredNode.prerequisites.length > 0 && (
            <div className="text-xs text-slate-500">
              <span className="text-slate-400">Voraussetzungen:</span>{" "}
              {hoveredNode.prerequisites.map(p => {
                const prereqNode = skillTreeNodes.find(n => n.id === p);
                const isCompleted = completedModules.includes(p);
                return (
                  <span key={p} className={isCompleted ? "text-green-400" : "text-red-400"}>
                    {prereqNode?.icon} {prereqNode?.label}{isCompleted ? " ✅" : " ❌"}
                  </span>
                );
              })}
            </div>
          )}
          {hoveredNode.prerequisites.length === 0 && (
            <div className="text-xs text-green-400">✅ Keine Voraussetzungen</div>
          )}
          {getNodeStatus(hoveredNode, completedModules) === "locked" && (
            <div className="text-xs text-red-400 mt-1">🔒 Voraussetzungen nicht erfüllt</div>
          )}
        </div>
      )}
    </div>
  );
}
