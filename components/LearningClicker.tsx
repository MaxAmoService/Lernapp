"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "./AuthProvider";
import {
  loadClickerState,
  saveClickerClick,
  saveClickerTick,
  buyClickerUpgradeBulk,
  buyClickerCosmetic,
  equipClickerCosmetic,
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
  type: "avatar" | "frame" | "prestige";
  rarity: "common" | "rare" | "epic" | "legendary" | "prestige";
  minTotalPoints?: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const UPGRADES: Upgrade[] = [
  // ── Klick-Punkte ──
  { id: "click1", name: "Scharfer Stift", description: "+1 Punkt pro Klick", icon: "✏️", baseCost: 10, costMultiplier: 1.5, effect: "clickPower", value: 1 },
  { id: "click2", name: "Mechanischer Stift", description: "+5 Punkte pro Klick", icon: "🖊️", baseCost: 100, costMultiplier: 1.8, effect: "clickPower", value: 5 },
  { id: "click3", name: "Laser-Stift", description: "+25 Punkte pro Klick", icon: "✒️", baseCost: 1000, costMultiplier: 2.0, effect: "clickPower", value: 25 },
  { id: "click4", name: "Plasma-Stift", description: "+120 Punkte pro Klick", icon: "🖊️", baseCost: 12000, costMultiplier: 2.2, effect: "clickPower", value: 120 },
  { id: "click5", name: "Quanten-Stift", description: "+600 Punkte pro Klick", icon: "✒️", baseCost: 150000, costMultiplier: 2.5, effect: "clickPower", value: 600 },

  // ── Auto-Generierung ──
  { id: "auto1", name: "Lern-Assistent", description: "+1 Punkt/Sekunde", icon: "🤖", baseCost: 50, costMultiplier: 1.6, effect: "autoAmount", value: 1 },
  { id: "auto2", name: "Tutor-Bot", description: "+5 Punkte/Sekunde", icon: "🧠", baseCost: 500, costMultiplier: 1.8, effect: "autoAmount", value: 5 },
  { id: "auto3", name: "KI-Professor", description: "+25 Punkte/Sekunde", icon: "🎓", baseCost: 5000, costMultiplier: 2.0, effect: "autoAmount", value: 25 },
  { id: "auto4", name: "KI-Fakultät", description: "+120 Punkte/Sekunde", icon: "🏫", baseCost: 60000, costMultiplier: 2.2, effect: "autoAmount", value: 120 },
  { id: "auto5", name: "KI-Universität", description: "+600 Punkte/Sekunde", icon: "🏛️", baseCost: 750000, costMultiplier: 2.5, effect: "autoAmount", value: 600 },

  // ── Geschwindigkeit ──
  { id: "speed1", name: "Schneller Denker", description: "Auto 10% schneller", icon: "⚡", baseCost: 200, costMultiplier: 2.0, effect: "autoSpeed", value: 0.9 },
  { id: "speed2", name: "Blitzgeist", description: "Auto 15% schneller", icon: "🌩️", baseCost: 2500, costMultiplier: 2.3, effect: "autoSpeed", value: 0.85 },
  { id: "speed3", name: "Zeitraffer", description: "Auto 20% schneller", icon: "⏱️", baseCost: 30000, costMultiplier: 2.5, effect: "autoSpeed", value: 0.8 },
  { id: "speed4", name: "Lichtgeschwindigkeit", description: "Auto 25% schneller", icon: "🌌", baseCost: 400000, costMultiplier: 3.0, effect: "autoSpeed", value: 0.75 },

  // ── Synergie ──
  { id: "syn1", name: "Neuronales Netz", description: "Auto-Bonus: +2% Klick-Power pro Auto-Upgrade", icon: "🔗", baseCost: 8000, costMultiplier: 2.5, effect: "clickPower", value: 0 },
  { id: "syn2", name: "Feedback-Schleife", description: "Klick-Bonus: +3% Auto-Speed pro Klick-Upgrade", icon: "🔄", baseCost: 15000, costMultiplier: 2.8, effect: "autoSpeed", value: 1 },
];

const COSMETICS: Cosmetic[] = [
  // ── Avatare ──
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

  // ── Rahmen ──
  { id: "fr_wood", name: "Holz", icon: "🪵", cost: 75, type: "frame", rarity: "common" },
  { id: "fr_silver", name: "Silber", icon: "🪙", cost: 200, type: "frame", rarity: "rare" },
  { id: "fr_gold", name: "Gold", icon: "🏅", cost: 500, type: "frame", rarity: "epic" },
  { id: "fr_flame", name: "Flammen", icon: "🔥", cost: 1000, type: "frame", rarity: "legendary" },

  // ── Prestige-Avatare ──
  { id: "av_phoenix", name: "Phönix", icon: "🔥", cost: 5000, type: "avatar", rarity: "legendary" },
  { id: "av_galaxy", name: "Galaxie", icon: "🌌", cost: 10000, type: "avatar", rarity: "legendary" },
  { id: "av_cosmic", name: "Kosmisch", icon: "✨", cost: 25000, type: "avatar", rarity: "legendary" },

  // ── Prestige-Rahmen ──
  { id: "fr_prestige_bronze", name: "Prestige Bronze", icon: "🥉", cost: 50000, type: "prestige", rarity: "prestige", minTotalPoints: 100000 },
  { id: "fr_prestige_silver", name: "Prestige Silber", icon: "🥈", cost: 150000, type: "prestige", rarity: "prestige", minTotalPoints: 500000 },
  { id: "fr_prestige_gold", name: "Prestige Gold", icon: "🥇", cost: 500000, type: "prestige", rarity: "prestige", minTotalPoints: 2000000 },
  { id: "fr_prestige_diamond", name: "Prestige Diamant", icon: "💎", cost: 2000000, type: "prestige", rarity: "prestige", minTotalPoints: 10000000 },
  { id: "fr_prestige_legend", name: "Legendärer Rahmen", icon: "👑", cost: 10000000, type: "prestige", rarity: "prestige", minTotalPoints: 50000000 },
];

const RARITY_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  common: { text: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/30" },
  rare: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  epic: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  legendary: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  prestige: { text: "text-rose-400", bg: "bg-gradient-to-br from-rose-500/15 to-amber-500/15", border: "border-rose-500/40" },
};

const DEFAULT_STATE: ClickerState = {
  points: 0,
  totalPoints: 0,
  clickPower: 1,
  autoSpeed: 1000,
  autoAmount: 0,
  prestigeMultiplier: 1,
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
  { points: 50, label: "Erste Schritte", icon: "🌱" },
  { points: 200, label: "Lern-Anfänger", icon: "📖" },
  { points: 500, label: "Wissbegierig", icon: "🔍" },
  { points: 1500, label: "Fleißig", icon: "🐝" },
  { points: 5000, label: "Lern-Maschine", icon: "⚙️" },
  { points: 15000, label: "Gelehrter", icon: "🎓" },
  { points: 50000, label: "Meister", icon: "🏆" },
  { points: 150000, label: "Genie", icon: "🧠" },
  { points: 500000, label: "Legendär", icon: "⭐" },
  { points: 1000000, label: "Prestige I", icon: "👑" },
  { points: 5000000, label: "Prestige II", icon: "💫" },
  { points: 25000000, label: "Prestige III", icon: "🌌" },
  { points: 100000000, label: "Transzendenz", icon: "✨" },
];

// ---------------------------------------------------------------------------
// Upgrade-Kategorien
// ---------------------------------------------------------------------------

const UPGRADE_CATEGORIES = [
  { id: "click", name: "Klick", icon: "👆", ids: ["click1", "click2", "click3", "click4", "click5"] },
  { id: "auto", name: "Auto", icon: "🤖", ids: ["auto1", "auto2", "auto3", "auto4", "auto5"] },
  { id: "speed", name: "Speed", icon: "⚡", ids: ["speed1", "speed2", "speed3", "speed4"] },
  { id: "syn", name: "Synergie", icon: "🔗", ids: ["syn1", "syn2"] },
];

// ---------------------------------------------------------------------------
// Prestige-Tiers (für UI-Anzeige)
// ---------------------------------------------------------------------------

const PRESTIGE_TIERS = [
  { id: "fr_prestige_bronze", icon: "🥉", name: "Bronze", bonus: "+10%", multiplier: 1.10, cost: 50000, minTotal: 100000 },
  { id: "fr_prestige_silver", icon: "🥈", name: "Silber", bonus: "+25%", multiplier: 1.25, cost: 150000, minTotal: 500000 },
  { id: "fr_prestige_gold", icon: "🥇", name: "Gold", bonus: "+50%", multiplier: 1.50, cost: 500000, minTotal: 2000000 },
  { id: "fr_prestige_diamond", icon: "💎", name: "Diamant", bonus: "+100%", multiplier: 2.00, cost: 2000000, minTotal: 10000000 },
  { id: "fr_prestige_legend", icon: "👑", name: "Legendär", bonus: "+200%", multiplier: 3.00, cost: 10000000, minTotal: 50000000 },
];

// Prestige-Multiplikator-Mapping (muss mit auth.ts synchron sein)
const PRESTIGE_MAP: Record<string, number> = {
  fr_prestige_bronze: 1.10,
  fr_prestige_silver: 1.25,
  fr_prestige_gold: 1.50,
  fr_prestige_diamond: 2.00,
  fr_prestige_legend: 3.00,
};

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

function getBulkBuyInfo(
  upgrade: Upgrade,
  currentCount: number,
  availablePoints: number,
  maxLevels: number
): { levels: number; totalCost: number } {
  let count = currentCount;
  let totalCost = 0;
  let levels = 0;
  while (levels < maxLevels) {
    const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, count));
    if (availablePoints - totalCost < cost) break;
    totalCost += cost;
    count++;
    levels++;
  }
  return { levels, totalCost };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LearningClicker() {
  const { user } = useAuth();
  const [state, setState] = useState<ClickerState>(DEFAULT_STATE);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"upgrades" | "cosmetics" | "prestige">("upgrades");
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({ click: true, auto: true, speed: true, syn: true });
  const [clickEffects, setClickEffects] = useState<{ id: number; x: number; y: number; value: number }[]>([]);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; angle: number }[]>([]);
  const [combo, setCombo] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buyFeedback, setBuyFeedback] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragMovedRef = useRef(false);
  const dragHeaderRef = useRef<HTMLDivElement>(null);
  const clickIdRef = useRef(0);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const comboTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingPointsRef = useRef(0);

  // Prestige Multiplier (safe fallback für bestehende States)
  const prestigeMultiplier = state.prestigeMultiplier || 1;

  // ── State aus Firebase laden ──
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    loadClickerState(user.uid).then((s) => {
      setState(s);
      setLoading(false);
    });
  }, [user]);

  // ── Auto-Tick: Punkte in Firebase speichern (alle 10 Sekunden) ──
  useEffect(() => {
    if (!user || state.autoAmount <= 0) return;
    tickIntervalRef.current = setInterval(async () => {
      const effectiveAmount = Math.floor(state.autoAmount * prestigeMultiplier);
      const newPoints = await saveClickerTick(user.uid, effectiveAmount, state.autoSpeed);
      if (newPoints > 0) {
        setState((prev) => ({
          ...prev,
          points: newPoints,
          totalPoints: prev.totalPoints + Math.floor(prev.autoAmount * (prev.prestigeMultiplier || 1)),
        }));
      }
    }, 10_000);
    return () => { if (tickIntervalRef.current) clearInterval(tickIntervalRef.current); };
  }, [user, state.autoAmount, state.autoSpeed, prestigeMultiplier]);

  // ── Lokaler Auto-Tick (alle 1 Sekunde für flüssige Anzeige) ──
  const autoUpgradeCount =
    (state.upgrades["auto1"] || 0) + (state.upgrades["auto2"] || 0) +
    (state.upgrades["auto3"] || 0) + (state.upgrades["auto4"] || 0) + (state.upgrades["auto5"] || 0);
  const clickUpgradeCount =
    (state.upgrades["click1"] || 0) + (state.upgrades["click2"] || 0) +
    (state.upgrades["click3"] || 0) + (state.upgrades["click4"] || 0) + (state.upgrades["click5"] || 0);
  const syn1Count = state.upgrades["syn1"] || 0;
  const syn2Count = state.upgrades["syn2"] || 0;
  const synergyClickBonus = syn1Count > 0 ? 1 + (autoUpgradeCount * 0.02 * syn1Count) : 1;
  const synergySpeedBonus = syn2Count > 0 ? Math.max(0.3, 1 - (clickUpgradeCount * 0.03 * syn2Count)) : 1;
  const effectiveAutoSpeed = Math.max(100, Math.floor(state.autoSpeed * synergySpeedBonus));

  useEffect(() => {
    if (state.autoAmount <= 0) return;
    const interval = setInterval(() => {
      const effectiveAuto = Math.floor(state.autoAmount * prestigeMultiplier);
      setState((prev) => ({
        ...prev,
        points: prev.points + effectiveAuto,
        totalPoints: prev.totalPoints + effectiveAuto,
      }));
    }, effectiveAutoSpeed);
    return () => clearInterval(interval);
  }, [state.autoAmount, effectiveAutoSpeed, prestigeMultiplier]);

  // ── Drag handlers (pointer capture) ──
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

  // ── Combo-System ──
  const getComboMultiplier = useCallback((c: number) => {
    if (c >= 30) return 10;
    if (c >= 20) return 5;
    if (c >= 12) return 3;
    if (c >= 6) return 2;
    return 1;
  }, []);

  const COMBO_COLORS = ["#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#3B82F6", "#10B981"];
  const GOLDEN_CHANCE = 0.08;
  const GOLDEN_MULTIPLIER = 5;

  // ── Click handler ──
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

    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    comboTimerRef.current = setTimeout(() => setCombo(0), 1500);

    // Golden Bonus
    const isGolden = Math.random() < GOLDEN_CHANCE;
    const goldenMult = isGolden ? GOLDEN_MULTIPLIER : 1;

    const earnedPoints = Math.floor(
      state.clickPower * comboMult * goldenMult * synergyClickBonus * prestigeMultiplier
    );

    // Optimistic UI update
    setState((prev) => ({
      ...prev,
      points: prev.points + earnedPoints,
      totalPoints: prev.totalPoints + earnedPoints,
    }));

    // Click-Effect
    setClickEffects((prev) => [...prev, { id, x, y, value: earnedPoints }]);
    setTimeout(() => { setClickEffects((prev) => prev.filter((c) => c.id !== id)); }, 1200);

    // Partikel
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
  }, [user, state.clickPower, combo, lastClickTime, getComboMultiplier, synergyClickBonus, prestigeMultiplier]);

  // ── Pending Clicks sofort speichern ──
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

  // ── Upgrade kaufen (1 Klick = 1 Level) ──
  const handleBuyUpgrade = useCallback(async (upgrade: Upgrade) => {
    if (!user) return;
    await flushPendingClicks();
    const newState = await buyClickerUpgradeBulk(user.uid, upgrade.id, 1);
    if (newState) {
      setState(newState);
      setBuyFeedback(upgrade.id);
      setTimeout(() => setBuyFeedback(null), 300);
    }
  }, [user, flushPendingClicks]);

  // ── Cosmetic kaufen ──
  const handleBuyCosmetic = useCallback(async (cosmetic: Cosmetic) => {
    if (!user) return;
    await flushPendingClicks();
    const newState = await buyClickerCosmetic(user.uid, cosmetic.id);
    if (newState) setState(newState);
  }, [user, flushPendingClicks]);

  // ── Cosmetic ausrüsten ──
  const handleEquipCosmetic = useCallback(async (cosmetic: Cosmetic) => {
    if (!user) return;
    await equipClickerCosmetic(user.uid, cosmetic.id, cosmetic.type);
    setState((prev) => {
      const next = { ...prev };
      if (cosmetic.type === "avatar") {
        next.equippedAvatar = cosmetic.icon;
      } else {
        next.equippedFrame = cosmetic.id;
        next.prestigeMultiplier = PRESTIGE_MAP[cosmetic.id] || 1;
      }
      return next;
    });
  }, [user]);

  // ── Reset ──
  const handleReset = useCallback(async () => {
    if (!user) return;
    await resetClickerState(user.uid);
    setState(DEFAULT_STATE);
  }, [user]);

  // ── Computed values ──
  const comboMultiplier = getComboMultiplier(combo);
  const pointsPerSecond = state.autoAmount > 0
    ? (state.autoAmount * prestigeMultiplier / effectiveAutoSpeed) * 1000
    : 0;

  // Nächstes Milestone finden
  const nextMilestone = MILESTONES.find(m => state.totalPoints < m.points) || MILESTONES[MILESTONES.length - 1];
  const prevMilestonePoints = MILESTONES.filter(m => m.points <= state.totalPoints).pop()?.points ?? 0;
  const milestoneProgress = Math.min(1, (state.totalPoints - prevMilestonePoints) / (nextMilestone.points - prevMilestonePoints));

  // Nicht eingeloggt → nichts anzeigen
  if (!user) return null;

  // ── Floating button (when closed) ──
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
        className="fixed z-50 w-72 sm:w-80 select-none pointer-events-auto"
        style={{ left: position.x, top: position.y }}
      >
        <div className="glass rounded-2xl border border-slate-700/50 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Header (draggable via pointer capture) */}
          <div
            ref={dragHeaderRef}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-slate-700/50 cursor-grab active:cursor-grabbing touch-none"
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
              {prestigeMultiplier > 1 && (
                <span className="px-1 py-0.5 bg-rose-500/20 border border-rose-500/40 rounded text-[8px] font-bold text-rose-300 whitespace-nowrap">
                  ⭐×{prestigeMultiplier.toFixed(prestigeMultiplier % 1 === 0 ? 0 : 2)}
                </span>
              )}
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
              {/* ── Points display ── */}
              <div className="p-3 text-center">
                <div
                  className="text-2xl font-black text-white mb-0.5 tabular-nums tracking-tight"
                  style={{ textShadow: combo >= 12 ? "0 0 20px rgba(250,204,21,0.3)" : "none" }}
                >
                  {formatNumber(state.points)}
                </div>
                <div className="text-[10px] text-slate-500 tabular-nums">
                  {formatNumber(state.totalPoints)} Gesamt
                  {pointsPerSecond > 0 && (
                    <span className="text-amber-500/80"> · {formatNumber(pointsPerSecond)}/s</span>
                  )}
                </div>

                {/* Click area */}
                <button
                  onClick={handleClick}
                  style={{ touchAction: "manipulation" }}
                  className={`relative mt-2 w-24 h-24 mx-auto rounded-full border-2 flex items-center justify-center group active:scale-[0.85] transition-transform duration-75 ${
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

                  <span className={`text-3xl relative z-10 transition-transform duration-75 ${
                    combo >= 20 ? "scale-110" : combo >= 12 ? "scale-105" : "group-active:scale-90"
                  }`}>{state.equippedAvatar}</span>

                  {/* Floating numbers */}
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

                {/* Combo-Anzeige */}
                {combo >= 3 && (
                  <div className={`mt-1.5 flex items-center justify-center gap-1.5 font-bold transition-all ${
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

                <div className="mt-1 text-[10px] text-slate-500">
                  +{Math.floor(state.clickPower * synergyClickBonus * prestigeMultiplier)}{comboMultiplier > 1 ? ` ×${comboMultiplier}` : ""} pro Klick
                  {synergyClickBonus > 1 && <span className="text-purple-400 ml-1">(+{Math.round((synergyClickBonus - 1) * 100)}%)</span>}
                  {prestigeMultiplier > 1 && <span className="text-rose-400 ml-1">(⭐+{Math.round((prestigeMultiplier - 1) * 100)}%)</span>}
                </div>

                {/* Mini Milestone-Bar */}
                <div className="mt-1.5 px-2">
                  <div className="h-1 bg-slate-700/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                      style={{ width: `${milestoneProgress * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] text-slate-600 mt-0.5">
                    <span>{nextMilestone.icon} {nextMilestone.label}</span>
                    <span>{formatNumber(state.totalPoints)}/{formatNumber(nextMilestone.points)}</span>
                  </div>
                </div>
              </div>

              {/* ── Tabs ── */}
              <div className="flex border-t border-slate-700/50">
                <button
                  onClick={() => setActiveTab("upgrades")}
                  className={`flex-1 py-1.5 text-[11px] font-medium transition-colors ${activeTab === "upgrades" ? "text-amber-400 border-b-2 border-amber-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  <Zap className="w-3 h-3 inline mr-1" /> Upgrades
                </button>
                <button
                  onClick={() => setActiveTab("cosmetics")}
                  className={`flex-1 py-1.5 text-[11px] font-medium transition-colors ${activeTab === "cosmetics" ? "text-amber-400 border-b-2 border-amber-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  <ShoppingBag className="w-3 h-3 inline mr-1" /> Shop
                </button>
                <button
                  onClick={() => setActiveTab("prestige")}
                  className={`flex-1 py-1.5 text-[11px] font-medium transition-colors ${activeTab === "prestige" ? "text-rose-400 border-b-2 border-rose-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  <Sparkles className="w-3 h-3 inline mr-1" /> Prestige
                </button>
              </div>

              {/* ── Content ── */}
              <div className="max-h-52 overflow-y-auto p-1.5">
                {/* ════ UPGRADES TAB ════ */}
                {activeTab === "upgrades" && (() => {
                  // Sortiere Upgrades: kaufbare zuerst, dann nach Preis
                  const sortedUpgrades = [...UPGRADES].sort((a, b) => {
                    const countA = state.upgrades[a.id] || 0;
                    const countB = state.upgrades[b.id] || 0;
                    const costA = getUpgradeCost(a, countA);
                    const costB = getUpgradeCost(b, countB);
                    const canA = state.points >= costA ? 0 : 1;
                    const canB = state.points >= costB ? 0 : 1;
                    if (canA !== canB) return canA - canB;
                    return costA - costB;
                  });

                  // Kategorie-Farben (statisch für Tailwind)
                  const catStyles: Record<string, { bg: string; border: string; hover: string; badge: string; badgeText: string; cost: string; bar: string }> = {
                    click: { bg: "bg-amber-500/10", border: "border-amber-500/30", hover: "hover:border-amber-400/60 hover:bg-amber-500/15", badge: "bg-amber-500/20", badgeText: "text-amber-300", cost: "text-amber-400", bar: "bg-amber-500/60" },
                    auto: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", hover: "hover:border-emerald-400/60 hover:bg-emerald-500/15", badge: "bg-emerald-500/20", badgeText: "text-emerald-300", cost: "text-emerald-400", bar: "bg-emerald-500/60" },
                    speed: { bg: "bg-blue-500/10", border: "border-blue-500/30", hover: "hover:border-blue-400/60 hover:bg-blue-500/15", badge: "bg-blue-500/20", badgeText: "text-blue-300", cost: "text-blue-400", bar: "bg-blue-500/60" },
                    syn: { bg: "bg-purple-500/10", border: "border-purple-500/30", hover: "hover:border-purple-400/60 hover:bg-purple-500/15", badge: "bg-purple-500/20", badgeText: "text-purple-300", cost: "text-purple-400", bar: "bg-purple-500/60" },
                  };

                  return (
                    <div className="grid grid-cols-2 gap-1.5">
                      {sortedUpgrades.map((upgrade) => {
                        const count = state.upgrades[upgrade.id] || 0;
                        const isSynergy = upgrade.id.startsWith("syn");
                        const isFeedback = buyFeedback === upgrade.id;
                        const cost = getUpgradeCost(upgrade, count);
                        const canAfford = state.points >= cost;
                        const nextCost = getUpgradeCost(upgrade, count + 1);
                        const progressToNext = Math.min(1, state.points / nextCost);
                        const catKey = upgrade.id.startsWith("click") ? "click"
                          : upgrade.id.startsWith("auto") ? "auto"
                          : upgrade.id.startsWith("speed") ? "speed"
                          : "syn";
                        const s = catStyles[catKey];

                        return (
                          <button
                            key={upgrade.id}
                            onClick={() => handleBuyUpgrade(upgrade)}
                            disabled={!canAfford}
                            className={`relative text-left p-2 rounded-lg border transition-all active:scale-95 ${
                              isFeedback
                                ? "bg-green-500/15 border-green-500/40"
                                : canAfford
                                ? `${s.bg} ${s.border} ${s.hover} hover:scale-[1.02]`
                                : "bg-slate-800/20 border-slate-700/20 opacity-50"
                            }`}
                          >
                            {/* Kauf-Feedback Flash */}
                            {isFeedback && (
                              <div className="absolute inset-0 bg-green-400/10 rounded-lg animate-pulse pointer-events-none" />
                            )}

                            {/* Icon + Level */}
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-base">{upgrade.icon}</span>
                              {count > 0 && (
                                <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${s.badge} ${s.badgeText}`}>
                                  Lv.{count}
                                </span>
                              )}
                            </div>

                            {/* Name */}
                            <div className="text-[10px] font-bold text-white truncate mb-0.5">
                              {upgrade.name}
                            </div>

                            {/* Effekt */}
                            <div className="text-[8px] text-slate-400 truncate mb-1">
                              {upgrade.description}
                            </div>

                            {/* Kosten */}
                            <div className={`text-[10px] font-bold ${canAfford ? s.cost : "text-slate-600"}`}>
                              {formatNumber(cost)}
                            </div>

                            {/* Mini Progress Bar zum nächsten Level */}
                            {count > 0 && (
                              <div className="mt-1 h-0.5 bg-slate-700/40 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${s.bar} rounded-full transition-all duration-300`}
                                  style={{ width: `${progressToNext * 100}%` }}
                                />
                              </div>
                            )}

                            {/* Synergie Badge */}
                            {isSynergy && (
                              <div className="absolute top-1 right-1 text-[7px] text-purple-400">🔗</div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}

                {/* ════ COSMETICS TAB ════ */}
                {activeTab === "cosmetics" &&
                  COSMETICS.filter((c) => c.type !== "prestige").map((cosmetic) => {
                    const owned = state.ownedCosmetics.includes(cosmetic.id);
                    const equipped =
                      cosmetic.type === "avatar"
                        ? state.equippedAvatar === cosmetic.icon
                        : state.equippedFrame === cosmetic.id;
                    const canAfford = state.points >= cosmetic.cost;
                    const colors = RARITY_COLORS[cosmetic.rarity];
                    return (
                      <button
                        key={cosmetic.id}
                        onClick={() =>
                          owned ? handleEquipCosmetic(cosmetic) : handleBuyCosmetic(cosmetic)
                        }
                        disabled={!owned && !canAfford}
                        className={`w-full text-left px-2 py-1.5 rounded-md border transition-all ${
                          equipped
                            ? `${colors.bg} ${colors.border}`
                            : owned
                            ? "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
                            : canAfford
                            ? "bg-slate-800/30 border-slate-700/30 hover:border-amber-500/30"
                            : "bg-slate-800/20 border-slate-700/20 opacity-40"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{cosmetic.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-medium text-white truncate">
                              {cosmetic.name}
                              <span className={`ml-1 text-[9px] ${colors.text}`}>
                                {cosmetic.rarity}
                              </span>
                            </div>
                          </div>
                          {equipped ? (
                            <span className="text-[9px] text-green-400 font-medium">Aktiv</span>
                          ) : owned ? (
                            <span className="text-[9px] text-slate-400">Anlegen</span>
                          ) : (
                            <span
                              className={`text-[11px] font-bold ${
                                canAfford ? "text-amber-400" : "text-slate-600"
                              }`}
                            >
                              {formatNumber(cosmetic.cost)}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}

                {/* ════ PRESTIGE TAB ════ */}
                {activeTab === "prestige" && (
                  <>
                    {/* Aktiver Prestige-Bonus */}
                    {prestigeMultiplier > 1 ? (
                      <div className="mx-1 mb-1.5 p-2 rounded-lg bg-gradient-to-r from-rose-500/15 to-amber-500/15 border border-rose-500/30">
                        <div className="text-[11px] font-bold text-rose-300">
                          ⭐ Aktiver Bonus: ×{prestigeMultiplier.toFixed(prestigeMultiplier % 1 === 0 ? 0 : 2)}
                          <span className="text-amber-400 ml-1">
                            (+{Math.round((prestigeMultiplier - 1) * 100)}%)
                          </span>
                        </div>
                        <div className="text-[9px] text-slate-400 mt-0.5">
                          Alle Punkte werden verstärkt!
                        </div>
                      </div>
                    ) : (
                      <div className="mx-1 mb-1.5 p-2 rounded-lg bg-slate-800/30 border border-slate-700/30">
                        <div className="text-[11px] font-medium text-slate-400">
                          🔒 Schalte Prestige-Rahmen frei für Multiplikator-Bonus!
                        </div>
                        <div className="text-[9px] text-slate-500 mt-0.5">
                          Prestige-Rahmen verstärken ALLE Punkte dauerhaft.
                        </div>
                      </div>
                    )}

                    {/* Prestige-Tiers */}
                    {PRESTIGE_TIERS.map((tier) => {
                      const owned = state.ownedCosmetics.includes(tier.id);
                      const equipped = state.equippedFrame === tier.id;
                      const canAfford = state.points >= tier.cost;
                      const meetsMin = state.totalPoints >= tier.minTotal;
                      const colors = RARITY_COLORS.prestige;
                      return (
                        <button
                          key={tier.id}
                          onClick={() => {
                            if (owned && !equipped) {
                              handleEquipCosmetic({
                                id: tier.id, name: tier.name, icon: tier.icon,
                                cost: tier.cost, type: "prestige", rarity: "prestige",
                              });
                            } else if (!owned && canAfford && meetsMin) {
                              handleBuyCosmetic({
                                id: tier.id, name: tier.name, icon: tier.icon,
                                cost: tier.cost, type: "prestige", rarity: "prestige",
                                minTotalPoints: tier.minTotal,
                              });
                            }
                          }}
                          disabled={!owned && (!canAfford || !meetsMin)}
                          className={`w-full text-left px-2 py-1.5 rounded-md border transition-all ${
                            equipped
                              ? `${colors.bg} ${colors.border}`
                              : owned
                              ? "bg-rose-500/10 border-rose-500/30 hover:border-rose-400/50"
                              : canAfford && meetsMin
                              ? "bg-slate-800/30 border-rose-500/20 hover:border-rose-500/40"
                              : "bg-slate-800/20 border-slate-700/20 opacity-40"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">{tier.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-medium text-white truncate">
                                {tier.name}
                                <span className="ml-1 text-[9px] text-amber-400">{tier.bonus}</span>
                              </div>
                              {!meetsMin && (
                                <div className="text-[9px] text-rose-400/70">
                                  🔒 {formatNumber(tier.minTotal)} Gesamtpunkte
                                </div>
                              )}
                            </div>
                            {equipped ? (
                              <span className="text-[9px] text-green-400 font-medium">Aktiv</span>
                            ) : owned ? (
                              <span className="text-[9px] text-slate-400">Anlegen</span>
                            ) : (
                              <span
                                className={`text-[11px] font-bold ${
                                  canAfford && meetsMin ? "text-rose-400" : "text-slate-600"
                                }`}
                              >
                                {formatNumber(tier.cost)}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </>
                )}
              </div>

              {/* ── Footer ── */}
              <div className="px-3 py-1.5 border-t border-slate-700/50 flex justify-between items-center">
                <button
                  onClick={handleReset}
                  className="text-[9px] text-slate-600 hover:text-red-400 transition-colors"
                >
                  Reset
                </button>
                <div className="text-[9px] text-slate-600">
                  💡 Lerne weiter — Punkte kommen automatisch!
                </div>
              </div>
            </>
          )}

          {loading && (
            <div className="p-4 text-center text-slate-500 text-xs">Lade...</div>
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
        @keyframes prestige-glow {
          0%, 100% { box-shadow: 0 0 4px 2px #f43f5e, 0 0 12px 4px rgba(244,63,94,0.3), 0 0 24px 8px rgba(251,191,36,0.15); }
          50% { box-shadow: 0 0 6px 3px #fb7185, 0 0 18px 6px rgba(251,113,133,0.4), 0 0 32px 10px rgba(251,191,36,0.2); }
        }
        .prestige-glow {
          animation: prestige-glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
