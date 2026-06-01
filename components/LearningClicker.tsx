"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "./AuthProvider";
import {
  loadClickerState,
  saveClickerClick,
  saveClickerTick,
  buyClickerUpgrade,
  buyClickerCosmetic,
  resetClickerState,
  type ClickerState,
} from "@/lib/auth";
import {
  Sparkles,
  Zap,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  X,
  GripVertical,
  Flame,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Upgrade {
  id: string;
  name: string;
  description: string;
  icon: string;
  baseCost: number;
  costMultiplier: number;
  effect: "clickPower" | "autoSpeed" | "autoAmount";
  value: number;
}

interface Cosmetic {
  id: string;
  name: string;
  icon: string;
  cost: number;
  type: "avatar" | "frame";
  rarity: "common" | "rare" | "epic" | "legendary";
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const UPGRADES: Upgrade[] = [
  { id: "click1", name: "Schärferer Stift", description: "+1 Punkt pro Klick", icon: "✏️", baseCost: 10, costMultiplier: 1.5, effect: "clickPower", value: 1 },
  { id: "click2", name: "Mechanischer Stift", description: "+5 Punkte pro Klick", icon: "🖊️", baseCost: 100, costMultiplier: 1.8, effect: "clickPower", value: 5 },
  { id: "click3", name: "Laser-Stift", description: "+25 Punkte pro Klick", icon: "✒️", baseCost: 1000, costMultiplier: 2.0, effect: "clickPower", value: 25 },
  { id: "auto1", name: "Lern-Assistent", description: "+1 Punkt/Sekunde", icon: "🤖", baseCost: 50, costMultiplier: 1.6, effect: "autoAmount", value: 1 },
  { id: "auto2", name: "Tutor-Bot", description: "+5 Punkte/Sekunde", icon: "🧠", baseCost: 500, costMultiplier: 1.8, effect: "autoAmount", value: 5 },
  { id: "auto3", name: "KI-Professor", description: "+25 Punkte/Sekunde", icon: "🎓", baseCost: 5000, costMultiplier: 2.0, effect: "autoAmount", value: 25 },
  { id: "speed1", name: "Schneller Denker", description: "Auto 10% schneller", icon: "⚡", baseCost: 200, costMultiplier: 2.0, effect: "autoSpeed", value: 0.9 },
  { id: "speed2", name: "Blitzgeist", description: "Auto 20% schneller", icon: "🌩️", baseCost: 2000, costMultiplier: 2.5, effect: "autoSpeed", value: 0.8 },
];

const COSMETICS: Cosmetic[] = [
  { id: "av_book", name: "Buch", icon: "📚", cost: 50, type: "avatar", rarity: "common" },
  { id: "av_light", name: "Glühbirne", icon: "💡", cost: 50, type: "avatar", rarity: "common" },
  { id: "av_atom", name: "Atom", icon: "⚛️", cost: 100, type: "avatar", rarity: "common" },
  { id: "av_gear", name: "Zahnrad", icon: "⚙️", cost: 100, type: "avatar", rarity: "common" },
  { id: "av_brain", name: "Gehirn", icon: "🧠", cost: 250, type: "avatar", rarity: "rare" },
  { id: "av_rocket", name: "Rakete", icon: "🚀", cost: 250, type: "avatar", rarity: "rare" },
  { id: "av_dragon", name: "Drache", icon: "🐉", cost: 500, type: "avatar", rarity: "epic" },
  { id: "av_unicorn", name: "Einhorn", icon: "🦄", cost: 500, type: "avatar", rarity: "epic" },
  { id: "av_crown", name: "Krone", icon: "👑", cost: 1000, type: "avatar", rarity: "legendary" },
  { id: "av_diamond", name: "Diamant", icon: "💎", cost: 1000, type: "avatar", rarity: "legendary" },
  { id: "fr_wood", name: "Holz", icon: "🪵", cost: 75, type: "frame", rarity: "common" },
  { id: "fr_silver", name: "Silber", icon: "🪙", cost: 200, type: "frame", rarity: "rare" },
  { id: "fr_gold", name: "Gold", icon: "🏅", cost: 500, type: "frame", rarity: "epic" },
  { id: "fr_flame", name: "Flammen", icon: "🔥", cost: 1000, type: "frame", rarity: "legendary" },
];

const RARITY_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  common: { text: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/30" },
  rare: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  epic: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  legendary: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
};

const DEFAULT_STATE: ClickerState = {
  points: 0,
  totalPoints: 0,
  clickPower: 1,
  autoSpeed: 1000,
  autoAmount: 0,
  upgrades: {},
  equippedAvatar: "📚",
  equippedFrame: "none",
  ownedCosmetics: [],
  lastTick: new Date().toISOString(),
};

// ---------------------------------------------------------------------------
// Milestones
// ---------------------------------------------------------------------------

const MILESTONES = [
  { points: 50, label: "Erste Schritte", icon: "🌱", reward: null },
  { points: 200, label: "Lern-Anfänger", icon: "📖", reward: null },
  { points: 500, label: "Wissbegierig", icon: "🔍", reward: null },
  { points: 1500, label: "Fleißig", icon: "🐝", reward: null },
  { points: 5000, label: "Lern-Maschine", icon: "⚙️", reward: null },
  { points: 15000, label: "Gelehrter", icon: "🎓", reward: null },
  { points: 50000, label: "Meister", icon: "🏆", reward: null },
  { points: 150000, label: "Genie", icon: "🧠", reward: null },
  { points: 500000, label: "Legendär", icon: "⭐", reward: null },
  { points: 1000000, label: "Übermensch", icon: "👑", reward: null },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getUpgradeCost(upgrade: Upgrade, count: number): number {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, count));
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return Math.floor(n).toString();
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LearningClicker() {
  const { user } = useAuth();
  const [state, setState] = useState<ClickerState>(DEFAULT_STATE);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"upgrades" | "cosmetics">("upgrades");
  const [clickEffects, setClickEffects] = useState<{ id: number; x: number; y: number; value: number }[]>([]);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; angle: number }[]>([]);
  const [combo, setCombo] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragMovedRef = useRef(false);
  const dragHeaderRef = useRef<HTMLDivElement>(null);
  const clickIdRef = useRef(0);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const comboTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingPointsRef = useRef(0);

  // State aus Firebase laden
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    loadClickerState(user.uid).then((s) => {
      setState(s);
      setLoading(false);
    });
  }, [user]);

  // Auto-Tick: Punkte in Firebase speichern (alle 10 Sekunden)
  useEffect(() => {
    if (!user || state.autoAmount <= 0) return;
    tickIntervalRef.current = setInterval(async () => {
      const newPoints = await saveClickerTick(user.uid, state.autoAmount, state.autoSpeed);
      if (newPoints > 0) {
        setState((prev) => ({ ...prev, points: newPoints, totalPoints: prev.totalPoints + prev.autoAmount }));
      }
    }, 10_000); // Alle 10 Sekunden synchronisieren
    return () => { if (tickIntervalRef.current) clearInterval(tickIntervalRef.current); };
  }, [user, state.autoAmount, state.autoSpeed]);

  // Lokaler Auto-Tick (alle 1 Sekunde für flüssige Anzeige)
  useEffect(() => {
    if (state.autoAmount <= 0) return;
    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        points: prev.points + prev.autoAmount,
        totalPoints: prev.totalPoints + prev.autoAmount,
      }));
    }, state.autoSpeed);
    return () => clearInterval(interval);
  }, [state.autoAmount, state.autoSpeed]);

  // Drag handlers (pointer capture)
  const handleDragStart = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);
    dragMovedRef.current = false;
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    const el = dragHeaderRef.current;
    if (el) el.setPointerCapture(e.pointerId);
  }, [position]);

  const handleDragMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    dragMovedRef.current = true;
    setPosition({
      x: Math.max(0, Math.min(window.innerWidth - 320, e.clientX - dragOffset.current.x)),
      y: Math.max(0, Math.min(window.innerHeight - 60, e.clientY - dragOffset.current.y)),
    });
  }, [isDragging]);

  const handleDragEnd = useCallback(() => { setIsDragging(false); }, []);
  const handleHeaderClick = useCallback((e: React.MouseEvent) => {
    if (dragMovedRef.current) { e.preventDefault(); e.stopPropagation(); }
  }, []);

  // Combo-System
  const getComboMultiplier = useCallback((c: number) => {
    if (c >= 30) return 10;
    if (c >= 20) return 5;
    if (c >= 12) return 3;
    if (c >= 6) return 2;
    return 1;
  }, []);

  const COMBO_COLORS = ["#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#3B82F6", "#10B981"];

  // Golden Bonus — 8% Chance auf 5x Punkte
  const GOLDEN_CHANCE = 0.08;
  const GOLDEN_MULTIPLIER = 5;

  // Click handler — Combo + Golden Bonus + Partikel
  const handleClick = useCallback(async (e: React.MouseEvent) => {
    if (!user) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = clickIdRef.current++;
    const now = Date.now();

    // Combo berechnen
    const timeSinceLastClick = now - lastClickTime;
    const newCombo = timeSinceLastClick < 600 ? combo + 1 : 1;
    const comboMult = getComboMultiplier(newCombo);
    setCombo(newCombo);
    setLastClickTime(now);

    // Combo-Timeout
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    comboTimerRef.current = setTimeout(() => setCombo(0), 1500);

    // Golden Bonus (random)
    const isGolden = Math.random() < GOLDEN_CHANCE;
    const goldenMult = isGolden ? GOLDEN_MULTIPLIER : 1;

    const earnedPoints = state.clickPower * comboMult * goldenMult;

    // Optimistic UI update
    setState((prev) => ({
      ...prev,
      points: prev.points + earnedPoints,
      totalPoints: prev.totalPoints + earnedPoints,
    }));

    // Click-Effect — Größe skaliert mit Punkten
    setClickEffects((prev) => [...prev, { id, x, y, value: earnedPoints }]);
    setTimeout(() => { setClickEffects((prev) => prev.filter((c) => c.id !== id)); }, 1200);

    // Partikel — mehr bei Combo, Explosion bei Golden
    const particleCount = isGolden ? 16 : Math.min(3 + comboMult * 2, 12);
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: id * 100 + i,
      x, y,
      color: isGolden ? "#FFD700" : COMBO_COLORS[Math.floor(Math.random() * COMBO_COLORS.length)],
      angle: (360 / particleCount) * i + Math.random() * 20,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find(np => np.id === p.id)));
    }, 800);

    // Screen shake bei hohem Combo oder Golden
    if (newCombo >= 15 || isGolden) {
      document.documentElement.style.setProperty("--shake-intensity", isGolden ? "4px" : "2px");
      document.documentElement.classList.add("clicker-shake");
      setTimeout(() => document.documentElement.classList.remove("clicker-shake"), 200);
    }

    // Pending Points akkumulieren
    pendingPointsRef.current += earnedPoints;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      if (pendingPointsRef.current > 0) {
        await saveClickerClick(user.uid, pendingPointsRef.current);
        pendingPointsRef.current = 0;
      }
    }, 2000);
  }, [user, state.clickPower, combo, lastClickTime, getComboMultiplier]);

  // Pending Clicks sofort in Firebase speichern
  const flushPendingClicks = useCallback(async () => {
    if (!user) return;
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
    if (pendingPointsRef.current > 0) {
      await saveClickerClick(user.uid, pendingPointsRef.current);
      pendingPointsRef.current = 0;
    }
  }, [user]);

  // Upgrade kaufen (server-seitig validiert)
  const handleBuyUpgrade = useCallback(async (upgrade: Upgrade) => {
    if (!user) return;
    await flushPendingClicks();
    const newState = await buyClickerUpgrade(user.uid, upgrade.id);
    if (newState) setState(newState);
  }, [user, flushPendingClicks]);

  // Cosmetic kaufen (server-seitig validiert)
  const handleBuyCosmetic = useCallback(async (cosmetic: Cosmetic) => {
    if (!user) return;
    await flushPendingClicks();
    const newState = await buyClickerCosmetic(user.uid, cosmetic.id);
    if (newState) setState(newState);
  }, [user, flushPendingClicks]);

  // Reset
  const handleReset = useCallback(async () => {
    if (!user) return;
    await resetClickerState(user.uid);
    setState(DEFAULT_STATE);
  }, [user]);

  const pointsPerSecond = state.autoAmount > 0 ? (state.autoAmount / state.autoSpeed) * 1000 : 0;
  const comboMultiplier = getComboMultiplier(combo);

  // Nächstes Milestone finden
  const nextMilestone = MILESTONES.find(m => state.totalPoints < m.points) || MILESTONES[MILESTONES.length - 1];
  const prevMilestonePoints = MILESTONES.filter(m => m.points <= state.totalPoints).pop()?.points ?? 0;
  const milestoneProgress = Math.min(1, (state.totalPoints - prevMilestonePoints) / (nextMilestone.points - prevMilestonePoints));

  // Nicht eingeloggt → nichts anzeigen
  if (!user) return null;

  // Floating button (when closed)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-amber-500/30 flex items-center justify-center transition-all hover:scale-110 group"
        title="Lern-Clicker öffnen"
      >
        <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        {state.totalPoints > 0 && (
          <div className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-slate-900 rounded-full text-[10px] font-bold text-amber-400 border border-amber-500/30">
            {formatNumber(state.points)}
          </div>
        )}
      </button>
    );
  }

  return (
    <>
      {/* Window */}
      <div
        className="fixed z-50 w-80 select-none"
        style={{ left: position.x, top: position.y }}
      >
        <div className="glass rounded-2xl border border-slate-700/50 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Header (draggable via pointer capture) */}
          <div
            ref={dragHeaderRef}
            className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-slate-700/50 cursor-grab active:cursor-grabbing touch-none"
            style={{ touchAction: "none" }}
            onPointerDown={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
            onClick={handleHeaderClick}
          >
            <GripVertical className="w-4 h-4 text-slate-500" />
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <span className="text-lg">{state.equippedAvatar}</span>
              <span className="text-sm font-bold text-amber-400 truncate">Lern-Clicker</span>
            </div>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
              className="p-1 hover:bg-slate-700/50 rounded transition-colors"
            >
              {isMinimized ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="p-1 hover:bg-slate-700/50 rounded transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {!isMinimized && !loading && (
            <>
              {/* Points display */}
              <div className="p-4 text-center">
                <div className="text-3xl font-black text-white mb-1 tabular-nums tracking-tight"
                  style={{ textShadow: combo >= 12 ? "0 0 20px rgba(250,204,21,0.3)" : "none" }}
                >
                  {formatNumber(state.points)}
                </div>
                <div className="text-[11px] text-slate-500 tabular-nums">
                  {formatNumber(state.totalPoints)} Gesamt
                  {pointsPerSecond > 0 && (
                    <span className="text-amber-500/80"> · {formatNumber(pointsPerSecond)}/s</span>
                  )}
                </div>

                {/* Click area */}
                <button
                  onClick={handleClick}
                  style={{ touchAction: "manipulation" }}
                  className={`relative mt-3 w-28 h-28 mx-auto rounded-full border-2 flex items-center justify-center group active:scale-[0.85] transition-transform duration-75 ${
                    combo >= 30
                      ? "bg-gradient-to-br from-violet-500/50 to-fuchsia-500/50 border-violet-300/70 shadow-xl shadow-violet-500/40"
                      : combo >= 20
                      ? "bg-gradient-to-br from-violet-500/40 to-fuchsia-500/40 border-violet-400/60 shadow-lg shadow-violet-500/30"
                      : combo >= 12
                      ? "bg-gradient-to-br from-red-500/35 to-orange-500/35 border-red-400/50 shadow-md shadow-red-500/20"
                      : combo >= 6
                      ? "bg-gradient-to-br from-amber-500/35 to-orange-500/35 border-amber-400/50 shadow-md shadow-amber-500/15"
                      : "bg-gradient-to-br from-amber-500/25 to-orange-500/25 border-amber-500/40 hover:border-amber-400/60"
                  }`}
                >
                  {/* Glow ring bei Combo */}
                  {combo >= 6 && (
                    <div className={`absolute -inset-2 rounded-full animate-pulse opacity-60 ${
                      combo >= 30 ? "bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 blur-md" :
                      combo >= 20 ? "bg-gradient-to-r from-purple-500/25 to-pink-500/25 blur-md" :
                      combo >= 12 ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-sm" :
                      "bg-gradient-to-r from-amber-500/15 to-orange-500/15 blur-sm"
                    }`} />
                  )}

                  {/* Ping ring */}
                  {combo >= 12 && (
                    <div className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
                      combo >= 30 ? "bg-violet-400" : combo >= 20 ? "bg-purple-400" : "bg-red-400"
                    }`} />
                  )}

                  <span className={`text-4xl relative z-10 transition-transform duration-75 ${
                    combo >= 20 ? "scale-110" : combo >= 12 ? "scale-105" : "group-active:scale-90"
                  }`}>{state.equippedAvatar}</span>

                  {/* Floating numbers — Größe/Persistenz skaliert mit Wert */}
                  {clickEffects.map((effect) => {
                    const isBig = effect.value >= state.clickPower * 3;
                    return (
                      <div
                        key={effect.id}
                        className={`absolute pointer-events-none z-20 font-black ${
                          isBig ? "text-lg text-yellow-300" : "text-sm text-amber-400"
                        }`}
                        style={{
                          left: effect.x,
                          top: effect.y,
                          animation: isBig ? "floatUpBig 1.2s ease-out forwards" : "floatUp 1s ease-out forwards",
                          textShadow: isBig ? "0 0 10px rgba(250,204,21,0.5)" : "none",
                        }}
                      >
                        +{effect.value}
                      </div>
                    );
                  })}

                  {/* Partikel */}
                  {particles.map((p) => (
                    <div
                      key={p.id}
                      className="absolute w-2 h-2 rounded-full pointer-events-none z-10"
                      style={{
                        left: p.x,
                        top: p.y,
                        backgroundColor: p.color,
                        boxShadow: `0 0 6px ${p.color}`,
                        animation: "particle-burst 0.7s ease-out forwards",
                        // @ts-ignore
                        "--angle": `${p.angle}deg`,
                        "--dist": `${35 + Math.random() * 35}px`,
                      }}
                    />
                  ))}
                </button>

                {/* Combo-Anzeige — Dopamin-Feedback */}
                {combo >= 3 && (
                  <div className={`mt-2 flex items-center justify-center gap-1.5 font-bold transition-all ${
                    combo >= 30 ? "text-violet-300 text-sm" :
                    combo >= 20 ? "text-violet-400 text-xs" :
                    combo >= 12 ? "text-red-400 text-xs" :
                    "text-amber-400 text-xs"
                  }`}>
                    <Flame className={`w-4 h-4 ${combo >= 20 ? "animate-bounce" : "animate-pulse"}`} />
                    <span>×{comboMultiplier}</span>
                    {combo >= 12 && <span className="animate-pulse">🔥</span>}
                    {combo >= 30 && <span className="animate-bounce">⚡</span>}
                  </div>
                )}

                <div className="mt-1.5 text-[11px] text-slate-500">
                  +{state.clickPower}{comboMultiplier > 1 ? ` ×${comboMultiplier}` : ""} pro Klick
                </div>

                {/* Mini Milestone-Bar */}
                <div className="mt-2 px-3">
                  <div className="h-1 bg-slate-700/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                      style={{ width: `${milestoneProgress * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-600 mt-0.5">
                    <span>{nextMilestone.icon} {nextMilestone.label}</span>
                    <span>{formatNumber(state.totalPoints)}/{formatNumber(nextMilestone.points)}</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-t border-slate-700/50">
                <button
                  onClick={() => setActiveTab("upgrades")}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${activeTab === "upgrades" ? "text-amber-400 border-b-2 border-amber-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  <Zap className="w-3.5 h-3.5 inline mr-1" /> Upgrades
                </button>
                <button
                  onClick={() => setActiveTab("cosmetics")}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${activeTab === "cosmetics" ? "text-amber-400 border-b-2 border-amber-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 inline mr-1" /> Shop
                </button>
              </div>

              {/* Content */}
              <div className="max-h-60 overflow-y-auto p-2 space-y-1.5">
                {activeTab === "upgrades" ? (
                  UPGRADES.map((upgrade) => {
                    const count = state.upgrades[upgrade.id] || 0;
                    const cost = getUpgradeCost(upgrade, count);
                    const canAfford = state.points >= cost;
                    return (
                      <button
                        key={upgrade.id}
                        onClick={() => handleBuyUpgrade(upgrade)}
                        disabled={!canAfford}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all ${canAfford ? "bg-slate-800/50 border-slate-700/50 hover:border-amber-500/40 hover:bg-amber-500/5" : "bg-slate-800/20 border-slate-700/30 opacity-50"}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{upgrade.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-white truncate">
                              {upgrade.name} {count > 0 && <span className="text-slate-500">×{count}</span>}
                            </div>
                            <div className="text-[10px] text-slate-500">{upgrade.description}</div>
                          </div>
                          <div className={`text-xs font-bold ${canAfford ? "text-amber-400" : "text-slate-600"}`}>
                            {formatNumber(cost)}
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  COSMETICS.map((cosmetic) => {
                    const owned = state.ownedCosmetics.includes(cosmetic.id);
                    const equipped = cosmetic.type === "avatar"
                      ? state.equippedAvatar === cosmetic.icon
                      : state.equippedFrame === cosmetic.id;
                    const canAfford = state.points >= cosmetic.cost;
                    const colors = RARITY_COLORS[cosmetic.rarity];
                    return (
                      <button
                        key={cosmetic.id}
                        onClick={() => (owned ? null : handleBuyCosmetic(cosmetic))}
                        disabled={!owned && !canAfford}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all ${equipped ? `${colors.bg} ${colors.border}` : owned ? "bg-slate-800/50 border-slate-700/50 hover:border-slate-600" : canAfford ? "bg-slate-800/30 border-slate-700/30 hover:border-amber-500/30" : "bg-slate-800/20 border-slate-700/20 opacity-40"}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{cosmetic.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-white truncate">
                              {cosmetic.name}
                              <span className={`ml-1.5 text-[10px] ${colors.text}`}>{cosmetic.rarity}</span>
                            </div>
                          </div>
                          {equipped ? (
                            <span className="text-[10px] text-green-400 font-medium">Aktiv</span>
                          ) : owned ? (
                            <span className="text-[10px] text-slate-500">Auswählen</span>
                          ) : (
                            <span className={`text-xs font-bold ${canAfford ? "text-amber-400" : "text-slate-600"}`}>
                              {formatNumber(cosmetic.cost)}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-3 py-2 border-t border-slate-700/50 flex justify-between items-center">
                <button
                  onClick={handleReset}
                  className="text-[10px] text-slate-600 hover:text-red-400 transition-colors"
                >
                  Reset
                </button>
                <div className="text-[10px] text-slate-600">
                  💡 Lerne weiter — Punkte kommen automatisch!
                </div>
              </div>
            </>
          )}

          {loading && (
            <div className="p-6 text-center text-slate-500 text-sm">
              Lade...
            </div>
          )}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          50% { opacity: 1; transform: translateY(-30px) scale(1.1); }
          100% { opacity: 0; transform: translateY(-60px) scale(0.8); }
        }
        @keyframes floatUpBig {
          0% { opacity: 1; transform: translateY(0) scale(0.5); }
          30% { opacity: 1; transform: translateY(-20px) scale(1.4); }
          60% { opacity: 1; transform: translateY(-45px) scale(1.1); }
          100% { opacity: 0; transform: translateY(-70px) scale(0.6); }
        }
        @keyframes particle-burst {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(
            calc(cos(var(--angle)) * var(--dist)),
            calc(sin(var(--angle)) * var(--dist))
          ) scale(0); }
        }
        .clicker-shake {
          animation: shake 0.15s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(var(--shake-intensity, 2px)); }
          75% { transform: translateX(calc(var(--shake-intensity, 2px) * -1)); }
        }
      `}</style>
    </>
  );
}
