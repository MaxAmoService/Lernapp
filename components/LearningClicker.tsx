"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "./AuthProvider";
import {
  loadClickerState,
  saveClickerClick,
  saveClickerTick,
  buyClickerUpgradeBulk,
  prestigeClickerState,
  openPetBox,
  equipPet,
  resetClickerState,
  getPetDefs,
  getBoxTiers,
  getPetBonuses,
  type ClickerState,
} from "@/lib/auth";
import {
  Sparkles,
  Zap,
  ChevronDown,
  ChevronUp,
  X,
  GripVertical,
  Flame,
  PawPrint,
  Crown,
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

interface PetDef {
  id: string;
  name: string;
  emoji: string;
  bonus: string;
  bonusType: "auto" | "click" | "speed";
  bonusPercent: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  module: string;
}

interface RevealedPet {
  pet: PetDef;
  id: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const UPGRADES: Upgrade[] = [
  // Klick-Punkte
  { id: "click1", name: "Scharfer Stift", description: "+1 Punkt pro Klick", icon: "✏️", baseCost: 10, costMultiplier: 1.5, effect: "clickPower", value: 1 },
  { id: "click2", name: "Mechanischer Stift", description: "+5 Punkte pro Klick", icon: "🖊️", baseCost: 100, costMultiplier: 1.8, effect: "clickPower", value: 5 },
  { id: "click3", name: "Laser-Stift", description: "+25 Punkte pro Klick", icon: "✒️", baseCost: 1000, costMultiplier: 2.0, effect: "clickPower", value: 25 },
  { id: "click4", name: "Plasma-Stift", description: "+120 Punkte pro Klick", icon: "🖊️", baseCost: 12000, costMultiplier: 2.2, effect: "clickPower", value: 120 },
  { id: "click5", name: "Quanten-Stift", description: "+600 Punkte pro Klick", icon: "✒️", baseCost: 150000, costMultiplier: 2.5, effect: "clickPower", value: 600 },

  // Auto-Generierung
  { id: "auto1", name: "Lern-Assistent", description: "+1 Punkt/Sekunde", icon: "🤖", baseCost: 50, costMultiplier: 1.6, effect: "autoAmount", value: 1 },
  { id: "auto2", name: "Tutor-Bot", description: "+5 Punkte/Sekunde", icon: "🧠", baseCost: 500, costMultiplier: 1.8, effect: "autoAmount", value: 5 },
  { id: "auto3", name: "KI-Professor", description: "+25 Punkte/Sekunde", icon: "🎓", baseCost: 5000, costMultiplier: 2.0, effect: "autoAmount", value: 25 },
  { id: "auto4", name: "KI-Fakultät", description: "+120 Punkte/Sekunde", icon: "🏫", baseCost: 60000, costMultiplier: 2.2, effect: "autoAmount", value: 120 },
  { id: "auto5", name: "KI-Universität", description: "+600 Punkte/Sekunde", icon: "🏛️", baseCost: 750000, costMultiplier: 2.5, effect: "autoAmount", value: 600 },

  // Geschwindigkeit
  { id: "speed1", name: "Schneller Denker", description: "Auto 10% schneller", icon: "⚡", baseCost: 200, costMultiplier: 2.0, effect: "autoSpeed", value: 0.9 },
  { id: "speed2", name: "Blitzgeist", description: "Auto 15% schneller", icon: "🌩️", baseCost: 2500, costMultiplier: 2.3, effect: "autoSpeed", value: 0.85 },
  { id: "speed3", name: "Zeitraffer", description: "Auto 20% schneller", icon: "⏱️", baseCost: 30000, costMultiplier: 2.5, effect: "autoSpeed", value: 0.8 },
  { id: "speed4", name: "Lichtgeschwindigkeit", description: "Auto 25% schneller", icon: "🌌", baseCost: 400000, costMultiplier: 3.0, effect: "autoSpeed", value: 0.75 },

  // Synergie
  { id: "syn1", name: "Neuronales Netz", description: "Auto-Bonus: +2% Klick-Power pro Auto-Upgrade", icon: "🔗", baseCost: 8000, costMultiplier: 2.5, effect: "clickPower", value: 0 },
  { id: "syn2", name: "Feedback-Schleife", description: "Klick-Bonus: +3% Auto-Speed pro Klick-Upgrade", icon: "🔄", baseCost: 15000, costMultiplier: 2.8, effect: "autoSpeed", value: 1 },
];

const CLICK_UPGRADES = UPGRADES.filter((u) => u.id.startsWith("click"));
const AUTO_UPGRADES = UPGRADES.filter((u) => u.id.startsWith("auto"));
const SPEED_UPGRADES = UPGRADES.filter((u) => u.id.startsWith("speed"));
const SYN_UPGRADES = UPGRADES.filter((u) => u.id.startsWith("syn"));

const BOX_DEFS = [
  { type: "common", name: "Lern-Box", emoji: "📦", cost: 100, desc: "Common/Rare", color: "from-slate-500/20 to-slate-600/20", border: "border-slate-500/40" },
  { type: "rare", name: "Wissens-Box", emoji: "🎁", cost: 500, desc: "Rare/Epic", color: "from-blue-500/20 to-indigo-500/20", border: "border-blue-500/40" },
  { type: "epic", name: "Meister-Box", emoji: "👑", cost: 2000, desc: "Epic/Legendary", color: "from-violet-500/20 to-purple-500/20", border: "border-violet-500/40" },
  { type: "prestige", name: "Prestige-Box", emoji: "✨", cost: 10000, desc: "Legendary", color: "from-rose-500/20 to-amber-500/20", border: "border-rose-500/40" },
];

const RARITY_COLORS: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  common: { text: "text-slate-300", bg: "bg-slate-500/10", border: "border-slate-500/30", glow: "shadow-slate-500/20" },
  rare: { text: "text-blue-300", bg: "bg-blue-500/10", border: "border-blue-500/30", glow: "shadow-blue-500/30" },
  epic: { text: "text-violet-300", bg: "bg-violet-500/10", border: "border-violet-500/30", glow: "shadow-violet-500/40" },
  legendary: { text: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/30", glow: "shadow-amber-500/50" },
};

const DEFAULT_STATE: ClickerState = {
  points: 0,
  totalPoints: 0,
  clickPower: 1,
  autoSpeed: 1000,
  autoAmount: 0,
  prestigeMultiplier: 1,
  prestigePoints: 0,
  prestigeLevel: 0,
  upgrades: {},
  ownedPets: [],
  activePet: null,
  equippedAvatar: "📚",
  equippedFrame: "none",
  ownedCosmetics: [],
  lastTick: new Date().toISOString(),
};

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
  const [activeTab, setActiveTab] = useState<"upgrades" | "pets" | "prestige">("upgrades");
  const [clickEffects, setClickEffects] = useState<{ id: number; x: number; y: number; value: number }[]>([]);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; angle: number }[]>([]);
  const [combo, setCombo] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buyFeedback, setBuyFeedback] = useState<string | null>(null);

  // Pet-System State
  const [allPets, setAllPets] = useState<PetDef[]>([]);
  const [boxTiers, setBoxTiers] = useState<Record<string, { cost: number }>>({});
  const [openingBox, setOpeningBox] = useState<string | null>(null);
  const [revealedPet, setRevealedPet] = useState<RevealedPet | null>(null);
  const [revealParticles, setRevealParticles] = useState<{ id: number; x: number; y: number; color: string; angle: number }[]>([]);

  // Prestige State
  const [showPrestigeConfirm, setShowPrestigeConfirm] = useState(false);
  const [prestigeAnimating, setPrestigeAnimating] = useState(false);

  const dragOffset = useRef({ x: 0, y: 0 });
  const dragMovedRef = useRef(false);
  const dragHeaderRef = useRef<HTMLDivElement>(null);
  const clickIdRef = useRef(0);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const comboTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingPointsRef = useRef(0);
  const revealIdRef = useRef(0);

  // Prestige Multiplier
  const prestigeMultiplier = state.prestigeMultiplier || 1;

  // Pet Bonuses
  const petBonuses = getPetBonuses(state.ownedPets, state.activePet);

  // Load pet definitions
  useEffect(() => {
    setAllPets(getPetDefs());
    setBoxTiers(getBoxTiers());
  }, []);

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
      const petAutoBonus = 1 + petBonuses.auto / 100;
      const effectiveAmount = Math.floor(state.autoAmount * prestigeMultiplier * petAutoBonus);
      const newPoints = await saveClickerTick(user.uid, effectiveAmount, state.autoSpeed);
      if (newPoints > 0) {
        setState((prev) => ({
          ...prev,
          points: newPoints,
          totalPoints: prev.totalPoints + Math.floor(prev.autoAmount * (prev.prestigeMultiplier || 1) * petAutoBonus),
        }));
      }
    }, 10_000);
    return () => { if (tickIntervalRef.current) clearInterval(tickIntervalRef.current); };
  }, [user, state.autoAmount, state.autoSpeed, prestigeMultiplier, petBonuses.auto]);

  // Lokaler Auto-Tick (alle 1 Sekunde)
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
  const effectiveAutoSpeed = Math.max(100, Math.floor(state.autoSpeed * synergySpeedBonus * (1 - petBonuses.speed / 100)));

  useEffect(() => {
    if (state.autoAmount <= 0) return;
    const petAutoBonus = 1 + petBonuses.auto / 100;
    const interval = setInterval(() => {
      const effectiveAuto = Math.floor(state.autoAmount * prestigeMultiplier * petAutoBonus);
      setState((prev) => ({
        ...prev,
        points: prev.points + effectiveAuto,
        totalPoints: prev.totalPoints + effectiveAuto,
      }));
    }, effectiveAutoSpeed);
    return () => clearInterval(interval);
  }, [state.autoAmount, effectiveAutoSpeed, prestigeMultiplier, petBonuses.auto]);

  // Drag handlers
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
  const GOLDEN_CHANCE = 0.08;
  const GOLDEN_MULTIPLIER = 5;

  // Click handler
  const handleClick = useCallback(async (e: React.MouseEvent) => {
    if (!user) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = clickIdRef.current++;
    const now = Date.now();

    const timeSinceLastClick = now - lastClickTime;
    const newCombo = timeSinceLastClick < 600 ? combo + 1 : 1;
    const comboMult = getComboMultiplier(newCombo);
    setCombo(newCombo);
    setLastClickTime(now);

    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    comboTimerRef.current = setTimeout(() => setCombo(0), 1500);

    const isGolden = Math.random() < GOLDEN_CHANCE;
    const goldenMult = isGolden ? GOLDEN_MULTIPLIER : 1;
    const petClickBonus = 1 + petBonuses.click / 100;

    const earnedPoints = Math.floor(
      state.clickPower * comboMult * goldenMult * synergyClickBonus * prestigeMultiplier * petClickBonus
    );

    setState((prev) => ({
      ...prev,
      points: prev.points + earnedPoints,
      totalPoints: prev.totalPoints + earnedPoints,
    }));

    setClickEffects((prev) => [...prev, { id, x, y, value: earnedPoints }]);
    setTimeout(() => { setClickEffects((prev) => prev.filter((c) => c.id !== id)); }, 1200);

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

    if (newCombo >= 15 || isGolden) {
      document.documentElement.style.setProperty("--shake-intensity", isGolden ? "4px" : "2px");
      document.documentElement.classList.add("clicker-shake");
      setTimeout(() => document.documentElement.classList.remove("clicker-shake"), 200);
    }

    pendingPointsRef.current += earnedPoints;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      if (pendingPointsRef.current > 0) {
        await saveClickerClick(user.uid, pendingPointsRef.current);
        pendingPointsRef.current = 0;
      }
    }, 2000);
  }, [user, state.clickPower, combo, lastClickTime, getComboMultiplier, synergyClickBonus, prestigeMultiplier, petBonuses.click]);

  // Pending Clicks speichern
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

  // Upgrade kaufen
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

  // Pet-Box öffnen
  const handleOpenBox = useCallback(async (boxType: string) => {
    if (!user || openingBox) return;
    await flushPendingClicks();
    setOpeningBox(boxType);

    // Shake-Animation starten
    setTimeout(async () => {
      const result = await openPetBox(user.uid, boxType);
      if (result) {
        setState(result.state);
        const revealId = revealIdRef.current++;
        setRevealedPet({ pet: result.pet, id: revealId });

        // Partikel-Explosion
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
          id: revealId * 100 + i,
          x: 50 + Math.random() * 100,
          y: 50 + Math.random() * 50,
          color: RARITY_COLORS[result.pet.rarity]?.text.includes("amber") ? "#FFD700"
            : RARITY_COLORS[result.pet.rarity]?.text.includes("violet") ? "#A78BFA"
            : RARITY_COLORS[result.pet.rarity]?.text.includes("blue") ? "#60A5FA"
            : "#94A3B8",
          angle: (360 / 20) * i + Math.random() * 30,
        }));
        setRevealParticles(newParticles);
        setTimeout(() => setRevealParticles([]), 1500);

        // Reveal nach 3 Sekunden ausblenden
        setTimeout(() => setRevealedPet(null), 3000);
      }
      setOpeningBox(null);
    }, 800);
  }, [user, openingBox, flushPendingClicks]);

  // Pet ausrüsten
  const handleEquipPet = useCallback(async (petId: string) => {
    if (!user) return;
    const newState = await equipPet(user.uid, petId);
    if (newState) setState(newState);
  }, [user]);

  // Prestige
  const handlePrestige = useCallback(async () => {
    if (!user) return;
    await flushPendingClicks();
    setPrestigeAnimating(true);
    setShowPrestigeConfirm(false);

    // Glitch-Animation
    setTimeout(async () => {
      const newState = await prestigeClickerState(user.uid);
      if (newState) {
        setState(newState);
      }
      setTimeout(() => setPrestigeAnimating(false), 1500);
    }, 1000);
  }, [user, flushPendingClicks]);

  // Reset
  const handleReset = useCallback(async () => {
    if (!user) return;
    await resetClickerState(user.uid);
    setState(DEFAULT_STATE);
  }, [user]);

  // Computed values
  const comboMultiplier = getComboMultiplier(combo);
  const petAutoBonus = 1 + petBonuses.auto / 100;
  const pointsPerSecond = state.autoAmount > 0
    ? (state.autoAmount * prestigeMultiplier * petAutoBonus / effectiveAutoSpeed) * 1000
    : 0;

  const nextMilestone = MILESTONES.find(m => state.totalPoints < m.points) || MILESTONES[MILESTONES.length - 1];
  const prevMilestonePoints = MILESTONES.filter(m => m.points <= state.totalPoints).pop()?.points ?? 0;
  const milestoneProgress = Math.min(1, (state.totalPoints - prevMilestonePoints) / (nextMilestone.points - prevMilestonePoints));

  const prestigePointsToGain = state.totalPoints >= 10000
    ? Math.floor(Math.log10(state.totalPoints / 10000))
    : 0;

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
        {state.prestigeLevel > 0 && (
          <div className="absolute -bottom-1 -right-1 px-1 py-0.5 bg-rose-900 rounded-full text-[8px] font-bold text-rose-300 border border-rose-500/30">
            P{state.prestigeLevel}
          </div>
        )}
      </button>
    );
  }

  return (
    <>
      {/* Prestige Glitch Overlay */}
      {prestigeAnimating && (
        <div className="fixed inset-0 z-[100] pointer-events-none prestige-glitch-overlay">
          <div className="absolute inset-0 bg-black/80 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-black text-rose-400 animate-bounce prestige-glitch-text">
              PRESTIGE {state.prestigeLevel + 1}
            </div>
          </div>
          {/* Prestige Particles */}
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={`pp-${i}`}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ["#F43F5E", "#FB923C", "#FBBF24", "#A78BFA"][i % 4],
                boxShadow: `0 0 10px ${["#F43F5E", "#FB923C", "#FBBF24", "#A78BFA"][i % 4]}`,
                animation: `prestige-particle ${1 + Math.random() * 2}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Pet Reveal Overlay */}
      {revealedPet && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative flex flex-col items-center gap-3 animate-bounce-in">
            {/* Rarity Glow */}
            <div className={`absolute -inset-8 rounded-full blur-2xl opacity-60 ${
              revealedPet.pet.rarity === "legendary" ? "bg-amber-500/40"
              : revealedPet.pet.rarity === "epic" ? "bg-violet-500/40"
              : revealedPet.pet.rarity === "rare" ? "bg-blue-500/40"
              : "bg-slate-500/30"
            }`} />
            <div className="text-7xl relative z-10 animate-spin-slow">{revealedPet.pet.emoji}</div>
            <div className={`text-xl font-black relative z-10 ${RARITY_COLORS[revealedPet.pet.rarity].text}`}>
              {revealedPet.pet.name}
            </div>
            <div className="text-sm text-slate-300 relative z-10">{revealedPet.pet.bonus}</div>
            <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${RARITY_COLORS[revealedPet.pet.rarity].bg} ${RARITY_COLORS[revealedPet.pet.rarity].text} ${RARITY_COLORS[revealedPet.pet.rarity].border} border relative z-10`}>
              {revealedPet.pet.rarity.toUpperCase()}
            </div>
            {/* Reveal Particles */}
            {revealParticles.map((p) => (
              <div
                key={p.id}
                className="absolute w-2.5 h-2.5 rounded-full pointer-events-none z-20"
                style={{
                  left: `${p.x}px`,
                  top: `${p.y}px`,
                  backgroundColor: p.color,
                  boxShadow: `0 0 8px ${p.color}`,
                  animation: "particle-burst 1s ease-out forwards",
                  // @ts-ignore
                  "--angle": `${p.angle}deg`,
                  "--dist": `${60 + Math.random() * 60}px`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Window */}
      <div
        className="fixed z-50 w-80 sm:w-96 select-none pointer-events-auto"
        style={{ left: position.x, top: position.y, isolation: "isolate" }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <div
          className={`glass rounded-2xl border border-slate-700/50 shadow-2xl shadow-black/50 overflow-hidden pointer-events-auto ${prestigeAnimating ? "animate-pulse" : ""}`}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {/* Header */}
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
                  x{prestigeMultiplier.toFixed(prestigeMultiplier % 1 === 0 ? 0 : 2)}
                </span>
              )}
              {state.prestigeLevel > 0 && (
                <span className="px-1 py-0.5 bg-violet-500/20 border border-violet-500/40 rounded text-[8px] font-bold text-violet-300 whitespace-nowrap">
                  P{state.prestigeLevel}
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
              {/* Points display */}
              <div className="p-3 text-center">
                <div
                  className="text-2xl font-black text-white mb-0.5 tabular-nums tracking-tight"
                  style={{ textShadow: combo >= 12 ? "0 0 20px rgba(250,204,21,0.3)" : "none" }}
                >
                  {formatNumber(state.points)}
                </div>
                <div className="text-[12px] text-slate-500 tabular-nums">
                  {formatNumber(state.totalPoints)} Gesamt
                  {pointsPerSecond > 0 && (
                    <span className="text-amber-500/80"> · {formatNumber(pointsPerSecond)}/s</span>
                  )}
                  {state.prestigePoints > 0 && (
                    <span className="text-violet-400 ml-1">· {state.prestigePoints} PP</span>
                  )}
                </div>

                {/* Click area */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleClick(e); }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
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
                  {combo >= 6 && (
                    <div className={`absolute -inset-2 rounded-full animate-pulse opacity-60 ${
                      combo >= 30 ? "bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 blur-md" :
                      combo >= 20 ? "bg-gradient-to-r from-purple-500/25 to-pink-500/25 blur-md" :
                      combo >= 12 ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-sm" :
                      "bg-gradient-to-r from-amber-500/15 to-orange-500/15 blur-sm"
                    }`} />
                  )}
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
                    <span>x{comboMultiplier}</span>
                    {combo >= 12 && <span className="animate-pulse">🔥</span>}
                    {combo >= 30 && <span className="animate-bounce">⚡</span>}
                  </div>
                )}

                <div className="mt-1 text-[12px] text-slate-500">
                  +{Math.floor(state.clickPower * synergyClickBonus * prestigeMultiplier * (1 + petBonuses.click / 100))}{comboMultiplier > 1 ? ` x${comboMultiplier}` : ""} pro Klick
                  {synergyClickBonus > 1 && <span className="text-purple-400 ml-1">(+{Math.round((synergyClickBonus - 1) * 100)}%)</span>}
                  {prestigeMultiplier > 1 && <span className="text-rose-400 ml-1">(+{Math.round((prestigeMultiplier - 1) * 100)}%)</span>}
                  {petBonuses.click > 0 && <span className="text-emerald-400 ml-1">(+{petBonuses.click}% Pet)</span>}
                </div>

                {/* Mini Milestone-Bar */}
                <div className="mt-1.5 px-2">
                  <div className="h-1 bg-slate-700/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                      style={{ width: `${milestoneProgress * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                    <span>{nextMilestone.icon} {nextMilestone.label}</span>
                    <span>{formatNumber(state.totalPoints)}/{formatNumber(nextMilestone.points)}</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-t border-slate-700/50">
                <button
                  onClick={() => setActiveTab("upgrades")}
                  className={`flex-1 py-1.5 text-[12px] font-medium transition-colors ${activeTab === "upgrades" ? "text-amber-400 border-b-2 border-amber-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  <Zap className="w-3.5 h-3.5 inline mr-1" /> Upgrades
                </button>
                <button
                  onClick={() => setActiveTab("pets")}
                  className={`flex-1 py-1.5 text-[12px] font-medium transition-colors ${activeTab === "pets" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  <PawPrint className="w-3.5 h-3.5 inline mr-1" /> Pets
                </button>
                <button
                  onClick={() => setActiveTab("prestige")}
                  className={`flex-1 py-1.5 text-[12px] font-medium transition-colors ${activeTab === "prestige" ? "text-rose-400 border-b-2 border-rose-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  <Crown className="w-3.5 h-3.5 inline mr-1" /> Prestige
                </button>
              </div>

              {/* Content */}
              <div className="max-h-72 overflow-y-auto p-2">

                {/* ════ UPGRADES TAB ════ */}
                {activeTab === "upgrades" && (
                  <div className="space-y-3">
                    {/* Klick-Upgrades */}
                    <div>
                      <div className="text-[12px] font-bold text-amber-400 mb-1.5 flex items-center gap-1">
                        <span>👆</span> Klick-Punkte
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {CLICK_UPGRADES.map((upgrade) => {
                          const count = state.upgrades[upgrade.id] || 0;
                          const cost = getUpgradeCost(upgrade, count);
                          const canAfford = state.points >= cost;
                          const isFeedback = buyFeedback === upgrade.id;
                          const nextCost = getUpgradeCost(upgrade, count + 1);
                          const progressToNext = Math.min(1, state.points / nextCost);

                          return (
                            <button
                              key={upgrade.id}
                              onClick={() => handleBuyUpgrade(upgrade)}
                              disabled={!canAfford}
                              className={`relative text-left p-2 rounded-lg border transition-all active:scale-95 ${
                                isFeedback
                                  ? "bg-green-500/15 border-green-500/40"
                                  : canAfford
                                  ? "bg-amber-500/10 border-amber-500/30 hover:border-amber-400/60 hover:bg-amber-500/15 hover:scale-[1.02]"
                                  : "bg-slate-800/20 border-slate-700/20 opacity-50"
                              }`}
                            >
                              {isFeedback && (
                                <div className="absolute inset-0 bg-green-400/10 rounded-lg animate-pulse pointer-events-none" />
                              )}
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-base">{upgrade.icon}</span>
                                {count > 0 && (
                                  <span className="text-[10px] font-bold px-1 py-0.5 rounded bg-amber-500/20 text-amber-300">
                                    Lv.{count}
                                  </span>
                                )}
                              </div>
                              <div className="text-[12px] font-bold text-white truncate mb-0.5">
                                {upgrade.name}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate mb-1">
                                {upgrade.description}
                              </div>
                              <div className={`text-[12px] font-bold ${canAfford ? "text-amber-400" : "text-slate-600"}`}>
                                {formatNumber(cost)}
                              </div>
                              {count > 0 && (
                                <div className="mt-1 h-0.5 bg-slate-700/40 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-amber-500/60 rounded-full transition-all duration-300"
                                    style={{ width: `${progressToNext * 100}%` }}
                                  />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Auto-Upgrades */}
                    <div>
                      <div className="text-[12px] font-bold text-emerald-400 mb-1.5 flex items-center gap-1">
                        <span>🤖</span> Auto-Generierung
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {AUTO_UPGRADES.map((upgrade) => {
                          const count = state.upgrades[upgrade.id] || 0;
                          const cost = getUpgradeCost(upgrade, count);
                          const canAfford = state.points >= cost;
                          const isFeedback = buyFeedback === upgrade.id;
                          const nextCost = getUpgradeCost(upgrade, count + 1);
                          const progressToNext = Math.min(1, state.points / nextCost);

                          return (
                            <button
                              key={upgrade.id}
                              onClick={() => handleBuyUpgrade(upgrade)}
                              disabled={!canAfford}
                              className={`relative text-left p-2 rounded-lg border transition-all active:scale-95 ${
                                isFeedback
                                  ? "bg-green-500/15 border-green-500/40"
                                  : canAfford
                                  ? "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-400/60 hover:bg-emerald-500/15 hover:scale-[1.02]"
                                  : "bg-slate-800/20 border-slate-700/20 opacity-50"
                              }`}
                            >
                              {isFeedback && (
                                <div className="absolute inset-0 bg-green-400/10 rounded-lg animate-pulse pointer-events-none" />
                              )}
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-base">{upgrade.icon}</span>
                                {count > 0 && (
                                  <span className="text-[10px] font-bold px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                                    Lv.{count}
                                  </span>
                                )}
                              </div>
                              <div className="text-[12px] font-bold text-white truncate mb-0.5">
                                {upgrade.name}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate mb-1">
                                {upgrade.description}
                              </div>
                              <div className={`text-[12px] font-bold ${canAfford ? "text-emerald-400" : "text-slate-600"}`}>
                                {formatNumber(cost)}
                              </div>
                              {count > 0 && (
                                <div className="mt-1 h-0.5 bg-slate-700/40 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-emerald-500/60 rounded-full transition-all duration-300"
                                    style={{ width: `${progressToNext * 100}%` }}
                                  />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Speed */}
                    <div>
                      <div className="text-[12px] font-bold text-blue-400 mb-1.5 flex items-center gap-1">
                        <span>⚡</span> Geschwindigkeit
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {SPEED_UPGRADES.map((upgrade) => {
                          const count = state.upgrades[upgrade.id] || 0;
                          const cost = getUpgradeCost(upgrade, count);
                          const canAfford = state.points >= cost;
                          const isFeedback = buyFeedback === upgrade.id;

                          return (
                            <button
                              key={upgrade.id}
                              onClick={() => handleBuyUpgrade(upgrade)}
                              disabled={!canAfford}
                              className={`relative text-left p-2 rounded-lg border transition-all active:scale-95 ${
                                isFeedback
                                  ? "bg-green-500/15 border-green-500/40"
                                  : canAfford
                                  ? "bg-blue-500/10 border-blue-500/30 hover:border-blue-400/60 hover:bg-blue-500/15 hover:scale-[1.02]"
                                  : "bg-slate-800/20 border-slate-700/20 opacity-50"
                              }`}
                            >
                              {isFeedback && (
                                <div className="absolute inset-0 bg-green-400/10 rounded-lg animate-pulse pointer-events-none" />
                              )}
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-base">{upgrade.icon}</span>
                                {count > 0 && (
                                  <span className="text-[10px] font-bold px-1 py-0.5 rounded bg-blue-500/20 text-blue-300">
                                    Lv.{count}
                                  </span>
                                )}
                              </div>
                              <div className="text-[12px] font-bold text-white truncate mb-0.5">
                                {upgrade.name}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate mb-1">
                                {upgrade.description}
                              </div>
                              <div className={`text-[12px] font-bold ${canAfford ? "text-blue-400" : "text-slate-600"}`}>
                                {formatNumber(cost)}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Synergie */}
                    <div>
                      <div className="text-[12px] font-bold text-purple-400 mb-1.5 flex items-center gap-1">
                        <span>🔗</span> Synergie
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {SYN_UPGRADES.map((upgrade) => {
                          const count = state.upgrades[upgrade.id] || 0;
                          const cost = getUpgradeCost(upgrade, count);
                          const canAfford = state.points >= cost;
                          const isFeedback = buyFeedback === upgrade.id;

                          return (
                            <button
                              key={upgrade.id}
                              onClick={() => handleBuyUpgrade(upgrade)}
                              disabled={!canAfford}
                              className={`relative text-left p-2 rounded-lg border transition-all active:scale-95 ${
                                isFeedback
                                  ? "bg-green-500/15 border-green-500/40"
                                  : canAfford
                                  ? "bg-purple-500/10 border-purple-500/30 hover:border-purple-400/60 hover:bg-purple-500/15 hover:scale-[1.02]"
                                  : "bg-slate-800/20 border-slate-700/20 opacity-50"
                              }`}
                            >
                              {isFeedback && (
                                <div className="absolute inset-0 bg-green-400/10 rounded-lg animate-pulse pointer-events-none" />
                              )}
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-base">{upgrade.icon}</span>
                                {count > 0 && (
                                  <span className="text-[10px] font-bold px-1 py-0.5 rounded bg-purple-500/20 text-purple-300">
                                    Lv.{count}
                                  </span>
                                )}
                              </div>
                              <div className="text-[12px] font-bold text-white truncate mb-0.5">
                                {upgrade.name}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate mb-1">
                                {upgrade.description}
                              </div>
                              <div className={`text-[12px] font-bold ${canAfford ? "text-purple-400" : "text-slate-600"}`}>
                                {formatNumber(cost)}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ════ PETS TAB ════ */}
                {activeTab === "pets" && (
                  <div className="space-y-3">
                    {/* Aktives Pet */}
                    {state.activePet ? (() => {
                      const activePetDef = allPets.find((p) => p.id === state.activePet);
                      if (!activePetDef) return null;
                      const colors = RARITY_COLORS[activePetDef.rarity];
                      return (
                        <div className={`p-3 rounded-xl border ${colors.border} ${colors.bg} relative overflow-hidden`}>
                          <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-xl opacity-30 ${
                            activePetDef.rarity === "legendary" ? "bg-amber-500"
                            : activePetDef.rarity === "epic" ? "bg-violet-500"
                            : activePetDef.rarity === "rare" ? "bg-blue-500"
                            : "bg-slate-500"
                          }`} />
                          <div className="text-[12px] font-bold text-slate-400 mb-1">Aktives Pet</div>
                          <div className="flex items-center gap-3">
                            <div className="text-4xl">{activePetDef.emoji}</div>
                            <div>
                              <div className={`text-[14px] font-black ${colors.text}`}>{activePetDef.name}</div>
                              <div className="text-[12px] text-emerald-400 font-bold">{activePetDef.bonus}</div>
                              <div className="text-[10px] text-slate-500">{activePetDef.module}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })() : (
                      <div className="p-3 rounded-xl border border-slate-700/30 bg-slate-800/20 text-center">
                        <div className="text-[12px] text-slate-500">Kein Pet aktiv</div>
                        <div className="text-[10px] text-slate-600">Oeffne eine Kiste oder waehle ein Pet aus deiner Sammlung!</div>
                      </div>
                    )}

                    {/* Kisten */}
                    <div>
                      <div className="text-[12px] font-bold text-slate-300 mb-1.5">Kisten oeffnen</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {BOX_DEFS.map((box) => {
                          const canAfford = state.points >= box.cost;
                          const isPrestigeLocked = box.type === "prestige" && state.prestigeLevel < 1;
                          const isOpening = openingBox === box.type;

                          return (
                            <button
                              key={box.type}
                              onClick={() => handleOpenBox(box.type)}
                              disabled={!canAfford || isPrestigeLocked || isOpening}
                              className={`relative text-left p-2.5 rounded-lg border transition-all active:scale-95 ${
                                isOpening
                                  ? "animate-wiggle bg-gradient-to-br " + box.color + " " + box.border
                                  : isPrestigeLocked
                                  ? "bg-slate-800/20 border-slate-700/20 opacity-40"
                                  : canAfford
                                  ? `bg-gradient-to-br ${box.color} ${box.border} hover:scale-[1.02]`
                                  : "bg-slate-800/20 border-slate-700/20 opacity-50"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-2xl">{box.emoji}</span>
                                <div>
                                  <div className="text-[12px] font-bold text-white">{box.name}</div>
                                  <div className="text-[10px] text-slate-400">{box.desc}</div>
                                </div>
                              </div>
                              <div className={`text-[12px] font-bold ${
                                isPrestigeLocked ? "text-slate-600" : canAfford ? "text-amber-400" : "text-slate-600"
                              }`}>
                                {isPrestigeLocked ? "🔒 Prestige noetig" : formatNumber(box.cost)}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Pet-Sammlung */}
                    <div>
                      <div className="text-[12px] font-bold text-slate-300 mb-1.5">
                        Sammlung ({new Set(state.ownedPets).size}/{allPets.length})
                      </div>
                      {state.ownedPets.length === 0 ? (
                        <div className="text-center py-4 text-[12px] text-slate-600">
                          Noch keine Pets. Oeffne eine Kiste!
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-1.5">
                          {/* Deduplizierte Pets anzeigen */}
                          {allPets
                            .filter((pet) => state.ownedPets.includes(pet.id))
                            .map((pet) => {
                              const colors = RARITY_COLORS[pet.rarity];
                              const isActive = state.activePet === pet.id;
                              const count = state.ownedPets.filter((id) => id === pet.id).length;

                              return (
                                <button
                                  key={pet.id}
                                  onClick={() => handleEquipPet(pet.id)}
                                  className={`relative p-2 rounded-lg border text-center transition-all active:scale-95 ${
                                    isActive
                                      ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}`
                                      : "bg-slate-800/30 border-slate-700/30 hover:border-slate-600"
                                  }`}
                                >
                                  <div className="text-2xl mb-0.5">{pet.emoji}</div>
                                  <div className={`text-[10px] font-bold truncate ${isActive ? colors.text : "text-slate-400"}`}>
                                    {pet.name}
                                  </div>
                                  {count > 1 && (
                                    <div className="absolute -top-1 -right-1 px-1 py-0.5 bg-slate-900 rounded-full text-[8px] font-bold text-slate-400 border border-slate-700">
                                      x{count}
                                    </div>
                                  )}
                                  {isActive && (
                                    <div className="text-[8px] text-green-400 font-medium mt-0.5">Aktiv</div>
                                  )}
                                </button>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ════ PRESTIGE TAB ════ */}
                {activeTab === "prestige" && (
                  <div className="space-y-3">
                    {/* Aktuelles Prestige */}
                    <div className="p-3 rounded-xl bg-gradient-to-r from-rose-500/10 to-violet-500/10 border border-rose-500/20">
                      <div className="text-[12px] font-bold text-slate-400 mb-1">Dein Prestige</div>
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">
                          {state.prestigeLevel === 0 ? "⭐" :
                           state.prestigeLevel < 3 ? "🥉" :
                           state.prestigeLevel < 5 ? "🥈" :
                           state.prestigeLevel < 8 ? "🥇" :
                           state.prestigeLevel < 12 ? "💎" : "👑"}
                        </div>
                        <div>
                          <div className="text-[16px] font-black text-white">
                            Prestige {state.prestigeLevel}
                          </div>
                          <div className="text-[12px] text-violet-300">
                            {state.prestigePoints} Prestige-Punkte
                          </div>
                          {prestigeMultiplier > 1 && (
                            <div className="text-[12px] text-rose-400 font-bold">
                              x{prestigeMultiplier.toFixed(2)} Multiplikator
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Prestige-Erklärung */}
                    <div className="p-2 rounded-lg bg-slate-800/30 border border-slate-700/30">
                      <div className="text-[12px] text-slate-400">
                        <span className="font-bold text-white">Was ist Prestige?</span>
                        <br />
                        Setze deinen Fortschritt zurück und erhalte <span className="text-violet-400 font-bold">Prestige-Punkte</span>.
                        Deine Pets bleiben erhalten! Prestige-Punkte berechnen sich aus: <span className="text-amber-400">floor(log10(Gesamtpunkte / 10.000))</span>
                      </div>
                    </div>

                    {/* Prestige-Button */}
                    <div>
                      {state.totalPoints >= 10000 ? (
                        <>
                          {!showPrestigeConfirm ? (
                            <button
                              onClick={() => setShowPrestigeConfirm(true)}
                              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500/20 to-violet-500/20 border border-rose-500/40 hover:border-rose-400/60 hover:from-rose-500/30 hover:to-violet-500/30 transition-all active:scale-[0.98]"
                            >
                              <div className="text-[14px] font-black text-rose-300">
                                ✨ Prestige auslösen
                              </div>
                              <div className="text-[12px] text-slate-400 mt-0.5">
                                Du erhältst <span className="text-violet-400 font-bold">{prestigePointsToGain}</span> Prestige-Punkte
                              </div>
                            </button>
                          ) : (
                            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
                              <div className="text-[12px] font-bold text-rose-300 mb-2 text-center">
                                Bist du sicher?
                              </div>
                              <div className="text-[11px] text-slate-400 mb-3 text-center">
                                Du erhältst <span className="text-violet-400 font-bold">{prestigePointsToGain} Prestige-Punkte</span>!
                                <br />
                                Alles wird zurückgesetzt, aber du behältst deine Pets.
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setShowPrestigeConfirm(false)}
                                  className="flex-1 py-2 rounded-lg bg-slate-700/50 border border-slate-600/50 text-[12px] font-medium text-slate-300 hover:bg-slate-700 transition-colors"
                                >
                                  Abbrechen
                                </button>
                                <button
                                  onClick={handlePrestige}
                                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-rose-500/30 to-violet-500/30 border border-rose-500/50 text-[12px] font-bold text-rose-300 hover:from-rose-500/40 hover:to-violet-500/40 transition-all active:scale-[0.95]"
                                >
                                  ✨ Prestige!
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="p-3 rounded-xl bg-slate-800/20 border border-slate-700/20 text-center">
                          <div className="text-[12px] text-slate-500">
                            🔒 Benötigt <span className="text-amber-400 font-bold">10.000</span> Gesamtpunkte
                          </div>
                          <div className="text-[10px] text-slate-600 mt-0.5">
                            Aktuell: {formatNumber(state.totalPoints)} / 10.000
                          </div>
                          <div className="mt-2 h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-rose-500 to-violet-500 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, (state.totalPoints / 10000) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Prestige-Stufen Übersicht */}
                    <div>
                      <div className="text-[12px] font-bold text-slate-300 mb-1.5">Prestige-Stufen</div>
                      <div className="space-y-1">
                        {[
                          { level: 1, icon: "⭐", name: "Stern", points: "10K" },
                          { level: 3, icon: "🥉", name: "Bronze", points: "100K" },
                          { level: 5, icon: "🥈", name: "Silber", points: "1M" },
                          { level: 8, icon: "🥇", name: "Gold", points: "100M" },
                          { level: 12, icon: "💎", name: "Diamant", points: "10B" },
                          { level: 15, icon: "👑", name: "Legendär", points: "10T" },
                        ].map((tier) => (
                          <div
                            key={tier.level}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border ${
                              state.prestigeLevel >= tier.level
                                ? "bg-violet-500/10 border-violet-500/30"
                                : "bg-slate-800/20 border-slate-700/20 opacity-50"
                            }`}
                          >
                            <span className="text-lg">{tier.icon}</span>
                            <div className="flex-1">
                              <div className="text-[12px] font-medium text-white">{tier.name}</div>
                              <div className="text-[10px] text-slate-500">Ab Prestige {tier.level}</div>
                            </div>
                            {state.prestigeLevel >= tier.level && (
                              <span className="text-[10px] text-green-400 font-medium">Freigeschaltet</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-3 py-1.5 border-t border-slate-700/50 flex justify-between items-center">
                <button
                  onClick={handleReset}
                  className="text-[10px] text-slate-600 hover:text-red-400 transition-colors"
                >
                  Reset
                </button>
                <div className="text-[10px] text-slate-600">
                  Lerne weiter — Punkte kommen automatisch!
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
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(8deg); }
          60% { transform: rotate(-5deg); }
          80% { transform: rotate(5deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.6s ease-in-out;
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.1); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .prestige-glitch-overlay {
          animation: glitch-overlay 2s ease-in-out forwards;
        }
        @keyframes glitch-overlay {
          0% { opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        .prestige-glitch-text {
          animation: glitch-text 0.3s ease-in-out infinite alternate;
        }
        @keyframes glitch-text {
          0% { text-shadow: 2px 0 #f43f5e, -2px 0 #3b82f6; transform: translate(0); }
          25% { text-shadow: -2px 0 #f43f5e, 2px 0 #3b82f6; transform: translate(2px, -1px); }
          50% { text-shadow: 2px 2px #f43f5e, -2px -2px #3b82f6; transform: translate(-1px, 2px); }
          75% { text-shadow: -2px -2px #f43f5e, 2px 2px #3b82f6; transform: translate(1px, -2px); }
          100% { text-shadow: 2px 0 #f43f5e, -2px 0 #3b82f6; transform: translate(0); }
        }
        @keyframes prestige-particle {
          0% { opacity: 1; transform: scale(1) translate(0, 0); }
          100% { opacity: 0; transform: scale(0) translate(
            ${Math.random() > 0.5 ? "" : "-"}${50 + Math.random() * 100}px,
            ${Math.random() > 0.5 ? "" : "-"}${50 + Math.random() * 100}px
          ); }
        }
      `}</style>
    </>
  );
}
