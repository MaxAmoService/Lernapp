"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles,
  Zap,
  TrendingUp,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  X,
  GripVertical,
  Trophy,
  Star,
  Award,
  Rocket,
  Crown,
  Diamond,
  Flame,
  Heart,
  Shield,
  Sword,
  Gem,
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

interface ClickerState {
  points: number;
  totalPoints: number;
  clickPower: number;
  autoSpeed: number; // ms between auto ticks
  autoAmount: number; // points per auto tick
  upgrades: Record<string, number>; // upgradeId -> count
  equippedAvatar: string;
  equippedFrame: string;
  ownedCosmetics: string[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "learnhub-clicker";

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
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadState(): ClickerState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state: ClickerState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ok */ }
}

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
  const [state, setState] = useState<ClickerState>(DEFAULT_STATE);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"upgrades" | "cosmetics">("upgrades");
  const [clickEffects, setClickEffects] = useState<{ id: number; x: number; y: number; value: number }[]>([]);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragMovedRef = useRef(false);
  const dragHeaderRef = useRef<HTMLDivElement>(null);
  const clickIdRef = useRef(0);

  // Load state on mount
  useEffect(() => {
    setState(loadState());
  }, []);

  // Save state on change
  useEffect(() => {
    if (state !== DEFAULT_STATE) saveState(state);
  }, [state]);

  // Auto-generation
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

  // Drag handlers (pointer capture – works on desktop, tablet, and mobile)
  const handleDragStart = useCallback((e: React.PointerEvent) => {
    // Only primary button / first touch
    if (e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);
    dragMovedRef.current = false;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
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

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Prevent click on header after a drag (buttons inside use stopPropagation)
  const handleHeaderClick = useCallback((e: React.MouseEvent) => {
    if (dragMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  // Click handler
  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = clickIdRef.current++;

    setState((prev) => ({
      ...prev,
      points: prev.points + prev.clickPower,
      totalPoints: prev.totalPoints + prev.clickPower,
    }));

    setClickEffects((prev) => [...prev, { id, x, y, value: state.clickPower }]);
    setTimeout(() => {
      setClickEffects((prev) => prev.filter((c) => c.id !== id));
    }, 800);
  }, [state.clickPower]);

  // Buy upgrade
  const buyUpgrade = useCallback((upgrade: Upgrade) => {
    const count = state.upgrades[upgrade.id] || 0;
    const cost = getUpgradeCost(upgrade, count);
    if (state.points < cost) return;

    setState((prev) => {
      const newState = { ...prev, points: prev.points - cost, upgrades: { ...prev.upgrades, [upgrade.id]: count + 1 } };

      switch (upgrade.effect) {
        case "clickPower":
          newState.clickPower = prev.clickPower + upgrade.value;
          break;
        case "autoAmount":
          newState.autoAmount = prev.autoAmount + upgrade.value;
          break;
        case "autoSpeed":
          newState.autoSpeed = Math.max(100, Math.floor(prev.autoSpeed * upgrade.value));
          break;
      }

      return newState;
    });
  }, [state.points, state.upgrades]);

  // Buy cosmetic
  const buyCosmetic = useCallback((cosmetic: Cosmetic) => {
    if (state.points < cosmetic.cost || state.ownedCosmetics.includes(cosmetic.id)) return;
    setState((prev) => ({
      ...prev,
      points: prev.points - cosmetic.cost,
      ownedCosmetics: [...prev.ownedCosmetics, cosmetic.id],
    }));
  }, [state.points, state.ownedCosmetics]);

  // Equip cosmetic
  const equipCosmetic = useCallback((cosmetic: Cosmetic) => {
    if (!state.ownedCosmetics.includes(cosmetic.id)) return;
    if (cosmetic.type === "avatar") {
      setState((prev) => ({ ...prev, equippedAvatar: cosmetic.icon }));
    } else {
      setState((prev) => ({ ...prev, equippedFrame: cosmetic.id }));
    }
  }, [state.ownedCosmetics]);

  // Reset
  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const pointsPerSecond = state.autoAmount > 0 ? (state.autoAmount / state.autoSpeed) * 1000 : 0;

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

          {!isMinimized && (
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
                  className="relative mt-3 w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/30 border-2 border-amber-500/40 hover:border-amber-400/60 active:scale-95 transition-all flex items-center justify-center group"
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform">{state.equippedAvatar}</span>

                  {/* Click effects */}
                  {clickEffects.map((effect) => (
                    <div
                      key={effect.id}
                      className="absolute pointer-events-none text-amber-400 font-bold text-sm animate-fade-in"
                      style={{
                        left: effect.x,
                        top: effect.y,
                        animation: "floatUp 0.8s ease-out forwards",
                      }}
                    >
                      +{effect.value}
                    </div>
                  ))}
                </button>

                <div className="mt-2 text-xs text-slate-500">
                  +{state.clickPower} pro Klick
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-t border-slate-700/50">
                <button
                  onClick={() => setActiveTab("upgrades")}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${
                    activeTab === "upgrades" ? "text-amber-400 border-b-2 border-amber-400" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 inline mr-1" />
                  Upgrades
                </button>
                <button
                  onClick={() => setActiveTab("cosmetics")}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${
                    activeTab === "cosmetics" ? "text-amber-400 border-b-2 border-amber-400" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 inline mr-1" />
                  Shop
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
                        onClick={() => buyUpgrade(upgrade)}
                        disabled={!canAfford}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                          canAfford
                            ? "bg-slate-800/50 border-slate-700/50 hover:border-amber-500/40 hover:bg-amber-500/5"
                            : "bg-slate-800/20 border-slate-700/30 opacity-50"
                        }`}
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
                        onClick={() => (owned ? equipCosmetic(cosmetic) : buyCosmetic(cosmetic))}
                        disabled={!owned && !canAfford}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                          equipped
                            ? `${colors.bg} ${colors.border}`
                            : owned
                            ? "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
                            : canAfford
                            ? "bg-slate-800/30 border-slate-700/30 hover:border-amber-500/30"
                            : "bg-slate-800/20 border-slate-700/20 opacity-40"
                        }`}
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
                  onClick={reset}
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
        </div>
      </div>

      {/* CSS for float animation */}
      <style jsx global>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(1.2); }
        }
      `}</style>
    </>
  );
}
