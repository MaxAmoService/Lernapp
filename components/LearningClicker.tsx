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
  Target,
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
  const [justReachedMilestone, setJustReachedMilestone] = useState<string | null>(null);
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
    if (c >= 20) return 5;
    if (c >= 12) return 3;
    if (c >= 6) return 2;
    return 1;
  }, []);

  const COMBO_COLORS = ["#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#3B82F6"];

  // Click handler — Combo + Partikel + Milestones
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
    const multiplier = getComboMultiplier(newCombo);
    setCombo(newCombo);
    setLastClickTime(now);

    // Combo-Timeout zurücksetzen
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    comboTimerRef.current = setTimeout(() => setCombo(0), 1500);

    const earnedPoints = state.clickPower * multiplier;

    // Optimistic UI update
    setState((prev) => {
      const newPoints = prev.points + earnedPoints;
      const newTotal = prev.totalPoints + earnedPoints;

      // Milestone prüfen
      const prevMilestone = MILESTONES.filter(m => prev.totalPoints >= m.points).pop();
      const newMilestone = MILESTONES.filter(m => newTotal >= m.points).pop();
      if (newMilestone && (!prevMilestone || newMilestone.points > prevMilestone.points)) {
        setTimeout(() => setJustReachedMilestone(newMilestone.label), 100);
        setTimeout(() => setJustReachedMilestone(null), 3000);
      }

      return { ...prev, points: newPoints, totalPoints: newTotal };
    });

    // Click-Effect (Punkte)
    const displayValue = multiplier > 1 ? `+${earnedPoints} ×${multiplier}` : `+${earnedPoints}`;
    setClickEffects((prev) => [...prev, { id, x, y, value: earnedPoints }]);
    setTimeout(() => { setClickEffects((prev) => prev.filter((c) => c.id !== id)); }, 1000);

    // Partikel-Effekt
    const particleCount = Math.min(4 + multiplier, 10);
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: id * 100 + i,
      x, y,
      color: COMBO_COLORS[Math.floor(Math.random() * COMBO_COLORS.length)],
      angle: (360 / particleCount) * i + Math.random() * 30,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find(np => np.id === p.id)));
    }, 700);

    // In Firebase speichern (debounced)
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      await saveClickerClick(user.uid, state.clickPower);
    }, 2000);
  }, [user, state.clickPower, combo, lastClickTime, getComboMultiplier]);

  // Upgrade kaufen (server-seitig validiert)
  const handleBuyUpgrade = useCallback(async (upgrade: Upgrade) => {
    if (!user) return;
    const newState = await buyClickerUpgrade(user.uid, upgrade.id);
    if (newState) setState(newState);
  }, [user]);

  // Cosmetic kaufen (server-seitig validiert)
  const handleBuyCosmetic = useCallback(async (cosmetic: Cosmetic) => {
    if (!user) return;
    const newState = await buyClickerCosmetic(user.uid, cosmetic.id);
    if (newState) setState(newState);
  }, [user]);

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
  const currentMilestone = MILESTONES.filter(m => state.totalPoints >= m.points).pop();

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
                <div className="text-3xl font-bold text-white mb-1">
                  {formatNumber(state.points)}
                </div>
                <div className="text-xs text-slate-500">
                  {formatNumber(state.totalPoints)} Gesamt
                  {pointsPerSecond > 0 && ` · ${formatNumber(pointsPerSecond)}/s`}
                </div>

                {/* Click area */}
                <button
                  onClick={handleClick}
                  style={{ touchAction: "manipulation" }}
                  className={`relative mt-3 w-24 h-24 mx-auto rounded-full border-2 transition-all flex items-center justify-center group active:scale-90 ${
                    combo >= 20
                      ? "bg-gradient-to-br from-violet-500/40 to-fuchsia-500/40 border-violet-400/60 shadow-lg shadow-violet-500/30"
                      : combo >= 12
                      ? "bg-gradient-to-br from-purple-500/40 to-pink-500/40 border-purple-400/60 shadow-md shadow-purple-500/20"
                      : combo >= 6
                      ? "bg-gradient-to-br from-red-500/30 to-orange-500/30 border-red-400/50 shadow-md shadow-red-500/15"
                      : combo >= 3
                      ? "bg-gradient-to-br from-amber-500/30 to-orange-500/30 border-amber-400/50"
                      : "bg-gradient-to-br from-amber-500/30 to-orange-500/30 border-amber-500/40 hover:border-amber-400/60"
                  }`}
                >
                  {/* Pulse ring bei Combo */}
                  {combo >= 6 && (
                    <div className={`absolute inset-0 rounded-full animate-ping ${
                      combo >= 20 ? "bg-violet-400/20" : combo >= 12 ? "bg-purple-400/20" : "bg-red-400/15"
                    }`} />
                  )}

                  <span className="text-4xl group-hover:scale-110 transition-transform relative z-10">{state.equippedAvatar}</span>

                  {/* Click effects */}
                  {clickEffects.map((effect) => (
                    <div
                      key={effect.id}
                      className={`absolute pointer-events-none font-bold text-sm z-20 ${
                        combo >= 12 ? "text-violet-300" : combo >= 6 ? "text-amber-300" : "text-amber-400"
                      }`}
                      style={{ left: effect.x, top: effect.y, animation: "floatUp 1s ease-out forwards" }}
                    >
                      +{effect.value}
                    </div>
                  ))}

                  {/* Partikel */}
                  {particles.map((p) => (
                    <div
                      key={p.id}
                      className="absolute w-1.5 h-1.5 rounded-full pointer-events-none z-10"
                      style={{
                        left: p.x,
                        top: p.y,
                        backgroundColor: p.color,
                        animation: `particle-burst 0.6s ease-out forwards`,
                        // @ts-ignore
                        "--angle": `${p.angle}deg`,
                        "--dist": `${30 + Math.random() * 30}px`,
                      }}
                    />
                  ))}
                </button>

                {/* Combo-Anzeige */}
                {combo >= 3 && (
                  <div className={`mt-2 flex items-center justify-center gap-1 text-xs font-bold transition-all ${
                    combo >= 20 ? "text-violet-400" : combo >= 12 ? "text-purple-400" : combo >= 6 ? "text-red-400" : "text-amber-400"
                  }`}>
                    <Flame className="w-3.5 h-3.5 animate-pulse" />
                    <span>×{comboMultiplier} Combo!</span>
                    <span className="text-slate-500 font-normal">({combo} Klicks)</span>
                  </div>
                )}

                <div className="mt-2 text-xs text-slate-500">
                  +{state.clickPower}{comboMultiplier > 1 ? ` ×${comboMultiplier}` : ""} pro Klick
                </div>

                {/* Milestone Progress */}
                <div className="mt-3 px-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {nextMilestone.icon} {nextMilestone.label}
                    </span>
                    <span>{formatNumber(state.totalPoints)} / {formatNumber(nextMilestone.points)}</span>
                  </div>
                  <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${milestoneProgress * 100}%` }}
                    />
                  </div>
                  {currentMilestone && (
                    <div className="text-[10px] text-slate-600 mt-0.5 text-center">
                      {currentMilestone.icon} {currentMilestone.label}
                    </div>
                  )}
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

      {/* Milestone Popup */}
      {justReachedMilestone && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] pointer-events-none animate-bounce">
          <div className="bg-gradient-to-br from-amber-500/90 to-orange-600/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-2xl shadow-amber-500/30 border border-amber-400/50 text-center">
            <div className="text-3xl mb-1">🎉</div>
            <div className="text-white font-bold text-sm">{justReachedMilestone}</div>
            <div className="text-amber-200 text-xs mt-0.5">Meilenstein erreicht!</div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-50px) scale(1.3); }
        }
        @keyframes particle-burst {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(
            calc(cos(var(--angle)) * var(--dist)),
            calc(sin(var(--angle)) * var(--dist))
          ) scale(0); }
        }
      `}</style>
    </>
  );
}
