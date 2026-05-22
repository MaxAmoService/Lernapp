// ============================================================================
// Reward System — Avatare & Frames freischalten
// ============================================================================

export interface AvatarOption {
  id: string;
  emoji: string;
  name: string;
  unlockLevel: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface FrameOption {
  id: string;
  name: string;
  unlockLevel: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  css: string; // Tailwind classes for the frame
  animated: boolean;
}

// ─── Avatare ────────────────────────────────────────────────────────────────

export const AVATARS: AvatarOption[] = [
  // Common (Level 1 — immer verfügbar)
  { id: "nerd", emoji: "🤓", name: "Nerd", unlockLevel: 1, rarity: "common" },
  { id: "cool", emoji: "😎", name: "Cool", unlockLevel: 1, rarity: "common" },
  { id: "cat", emoji: "🐱", name: "Katze", unlockLevel: 1, rarity: "common" },
  { id: "dog", emoji: "🐶", name: "Hund", unlockLevel: 1, rarity: "common" },
  { id: "panda", emoji: "🐼", name: "Panda", unlockLevel: 1, rarity: "common" },
  { id: "koala", emoji: "🐨", name: "Koala", unlockLevel: 1, rarity: "common" },

  // Uncommon (Level 2)
  { id: "fox", emoji: "🦊", name: "Fuchs", unlockLevel: 2, rarity: "common" },
  { id: "owl", emoji: "🦉", name: "Eule", unlockLevel: 2, rarity: "common" },
  { id: "penguin", emoji: "🐧", name: "Pinguin", unlockLevel: 2, rarity: "common" },
  { id: "butterfly", emoji: "🦋", name: "Schmetterling", unlockLevel: 2, rarity: "common" },
  { id: "octopus", emoji: "🐙", name: "Oktopus", unlockLevel: 2, rarity: "common" },
  { id: "rabbit", emoji: "🐰", name: "Hase", unlockLevel: 2, rarity: "common" },

  // Rare (Level 3)
  { id: "unicorn", emoji: "🦄", name: "Einhorn", unlockLevel: 3, rarity: "rare" },
  { id: "frog", emoji: "🐸", name: "Frosch", unlockLevel: 3, rarity: "rare" },
  { id: "lion", emoji: "🦁", name: "Löwe", unlockLevel: 3, rarity: "rare" },
  { id: "tiger", emoji: "🐯", name: "Tiger", unlockLevel: 3, rarity: "rare" },
  { id: "bear", emoji: "🐻", name: "Bär", unlockLevel: 3, rarity: "rare" },

  // Epic (Level 5)
  { id: "dragon", emoji: "🐲", name: "Drache", unlockLevel: 5, rarity: "epic" },
  { id: "eagle", emoji: "🦅", name: "Adler", unlockLevel: 5, rarity: "epic" },
  { id: "shark", emoji: "🦈", name: "Hai", unlockLevel: 5, rarity: "epic" },
  { id: "wolf", emoji: "🐺", name: "Wolf", unlockLevel: 5, rarity: "epic" },
  { id: "phoenix", emoji: "🔥", name: "Phönix", unlockLevel: 5, rarity: "epic" },

  // Legendary (Level 8)
  { id: "crown", emoji: "👑", name: "Krone", unlockLevel: 8, rarity: "legendary" },
  { id: "gem", emoji: "💎", name: "Diamant", unlockLevel: 8, rarity: "legendary" },
  { id: "star", emoji: "🌟", name: "Stern", unlockLevel: 8, rarity: "legendary" },
  { id: "rocket", emoji: "🚀", name: "Rakete", unlockLevel: 8, rarity: "legendary" },
  { id: "alien", emoji: "👽", name: "Alien", unlockLevel: 8, rarity: "legendary" },

  // Leaderboard Exklusiv
  { id: "trophy", emoji: "🏆", name: "Trophäe", unlockLevel: 0, rarity: "legendary" }, // Top 1
  { id: "medal1", emoji: "🥇", name: "Gold", unlockLevel: 0, rarity: "legendary" },     // Top 1
  { id: "medal2", emoji: "🥈", name: "Silber", unlockLevel: 0, rarity: "epic" },        // Top 3
  { id: "medal3", emoji: "🥉", name: "Bronze", unlockLevel: 0, rarity: "epic" },        // Top 5
];

// ─── Frames ─────────────────────────────────────────────────────────────────

export const FRAMES: FrameOption[] = [
  // Common (immer verfügbar)
  { id: "none", name: "Kein Rahmen", unlockLevel: 1, rarity: "common", css: "", animated: false },
  { id: "slate", name: "Grau", unlockLevel: 1, rarity: "common", css: "ring-2 ring-slate-500", animated: false },
  { id: "blue", name: "Blau", unlockLevel: 1, rarity: "common", css: "ring-2 ring-blue-500", animated: false },

  // Rare (Level 2)
  { id: "emerald", name: "Smaragd", unlockLevel: 2, rarity: "rare", css: "ring-2 ring-emerald-500", animated: false },
  { id: "amber", name: "Bernstein", unlockLevel: 2, rarity: "rare", css: "ring-2 ring-amber-500", animated: false },

  // Rare (Level 3)
  { id: "violet", name: "Violett", unlockLevel: 3, rarity: "rare", css: "ring-2 ring-violet-500", animated: false },
  { id: "rose", name: "Rose", unlockLevel: 3, rarity: "rare", css: "ring-2 ring-rose-500", animated: false },

  // Epic (Level 5)
  { id: "gradient-blue", name: "Blau-Gradient", unlockLevel: 5, rarity: "epic", css: "ring-2 ring-gradient-to-r from-blue-500 to-cyan-400", animated: false },
  { id: "gradient-fire", name: "Feuer", unlockLevel: 5, rarity: "epic", css: "ring-2 ring-gradient-to-r from-orange-500 to-red-500", animated: false },
  { id: "neon", name: "Neon", unlockLevel: 5, rarity: "epic", css: "ring-2 ring-green-400 shadow-[0_0_12px_rgba(74,222,128,0.6)]", animated: false },

  // Legendary (Level 8)
  { id: "gold", name: "Gold", unlockLevel: 8, rarity: "legendary", css: "ring-2 ring-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.5)]", animated: false },
  { id: "rainbow", name: "Regenbogen", unlockLevel: 8, rarity: "legendary", css: "ring-2 ring-transparent", animated: true },

  // Animated Legendary (Level 10)
  { id: "pulse-glow", name: "Pulsieren", unlockLevel: 10, rarity: "legendary", css: "ring-2 ring-blue-400", animated: true },
  { id: "fire-ring", name: "Feuer-Ring", unlockLevel: 10, rarity: "legendary", css: "ring-2 ring-orange-400", animated: true },
];

// ─── Leaderboard Exklusiv-Frames ────────────────────────────────────────────

export const LEADERBOARD_FRAMES: Record<number, FrameOption> = {
  1: { id: "champion", name: "Champion", unlockLevel: 0, rarity: "legendary", css: "ring-2 ring-amber-400", animated: true },
  2: { id: "runner-up", name: "Vizemeister", unlockLevel: 0, rarity: "epic", css: "ring-2 ring-slate-300", animated: false },
  3: { id: "third", name: "Bronze", unlockLevel: 0, rarity: "epic", css: "ring-2 ring-orange-600", animated: false },
};

// ─── Helper ─────────────────────────────────────────────────────────────────

export function getUnlockedAvatars(level: number, leaderboardRank?: number): AvatarOption[] {
  return AVATARS.filter((a) => {
    if (a.unlockLevel > 0) return level >= a.unlockLevel;
    // Leaderboard-Exklusiv
    if (a.id === "trophy" || a.id === "medal1") return leaderboardRank === 1;
    if (a.id === "medal2") return leaderboardRank !== undefined && leaderboardRank <= 3;
    if (a.id === "medal3") return leaderboardRank !== undefined && leaderboardRank <= 5;
    return false;
  });
}

export function getUnlockedFrames(level: number): FrameOption[] {
  return FRAMES.filter((f) => level >= f.unlockLevel);
}

export function getFrameCSS(frameId: string, level: number, leaderboardRank?: number): string {
  // Leaderboard-Frames haben Priorität
  if (leaderboardRank !== undefined) {
    if (leaderboardRank === 1) return LEADERBOARD_FRAMES[1].css;
    if (leaderboardRank <= 3) return LEADERBOARD_FRAMES[3].css;
  }

  const frame = FRAMES.find((f) => f.id === frameId);
  if (!frame || level < frame.unlockLevel) return "";
  return frame.css;
}

export function isFrameAnimated(frameId: string, level: number, leaderboardRank?: number): boolean {
  if (leaderboardRank !== undefined && leaderboardRank <= 3) return true;
  const frame = FRAMES.find((f) => f.id === frameId);
  if (!frame) return false;
  return frame.animated && level >= frame.unlockLevel;
}

export function getRarityColor(rarity: AvatarOption["rarity"]): string {
  switch (rarity) {
    case "common": return "text-slate-400";
    case "rare": return "text-blue-400";
    case "epic": return "text-violet-400";
    case "legendary": return "text-amber-400";
  }
}

export function getRarityBg(rarity: AvatarOption["rarity"]): string {
  switch (rarity) {
    case "common": return "bg-slate-500/15 border-slate-500/30";
    case "rare": return "bg-blue-500/15 border-blue-500/30";
    case "epic": return "bg-violet-500/15 border-violet-500/30";
    case "legendary": return "bg-amber-500/15 border-amber-500/30";
  }
}
