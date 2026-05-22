"use client";

import { type FrameOption, FRAMES } from "@/lib/rewards";

interface AvatarFrameProps {
  avatar: string;
  frameId?: string;
  level: number;
  leaderboardRank?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZES = {
  sm: { outer: "w-9 h-9", inner: "w-6 h-6", text: "text-base", ring: "2px" },
  md: { outer: "w-12 h-12", inner: "w-9 h-9", text: "text-xl", ring: "2px" },
  lg: { outer: "w-16 h-16", inner: "w-12 h-12", text: "text-3xl", ring: "3px" },
  xl: { outer: "w-24 h-24", inner: "w-18 h-18", text: "text-5xl", ring: "3px" },
};

function getFrameStyle(frameId: string, size: string): React.CSSProperties {
  const s = SIZES[size as keyof typeof SIZES] || SIZES.md;

  switch (frameId) {
    case "none":
      return {};
    case "slate":
      return { boxShadow: `0 0 0 ${s.ring} #64748b` };
    case "blue":
      return { boxShadow: `0 0 0 ${s.ring} #3b82f6` };
    case "emerald":
      return { boxShadow: `0 0 0 ${s.ring} #10b981, 0 0 8px rgba(16,185,129,0.3)` };
    case "rose":
      return { boxShadow: `0 0 0 ${s.ring} #f43f5e, 0 0 8px rgba(244,63,94,0.3)` };
    case "violet":
      return { boxShadow: `0 0 0 ${s.ring} #8b5cf6, 0 0 12px rgba(139,92,246,0.3)` };
    case "amber":
      return { boxShadow: `0 0 0 ${s.ring} #f59e0b, 0 0 12px rgba(245,158,11,0.3)` };
    case "neon":
      return { boxShadow: `0 0 0 ${s.ring} #22c55e, 0 0 16px rgba(34,197,94,0.5), 0 0 32px rgba(34,197,94,0.2)` };
    case "flame":
      return {};
    case "ice":
      return { boxShadow: `0 0 0 ${s.ring} #67e8f9, 0 0 16px rgba(103,232,249,0.4)` };
    case "gold":
      return { boxShadow: `0 0 0 ${s.ring} #fbbf24, 0 0 20px rgba(251,191,36,0.5), 0 0 40px rgba(251,191,36,0.2)` };
    case "rainbow":
      return {};
    case "galaxy":
      return {};
    case "pulse":
      return {};
    case "cosmic":
      return {};
    case "champion":
      return {};
    case "silver":
      return { boxShadow: `0 0 0 ${s.ring} #cbd5e1, 0 0 20px rgba(203,213,225,0.4)` };
    case "bronze-frame":
      return { boxShadow: `0 0 0 ${s.ring} #ea580c, 0 0 16px rgba(234,88,12,0.4)` };
    default:
      return { boxShadow: `0 0 0 ${s.ring} #475569` };
  }
}

function getFrameClass(frameId: string): string {
  switch (frameId) {
    case "flame":
      return "frame-flame";
    case "rainbow":
      return "frame-rainbow";
    case "galaxy":
      return "frame-galaxy";
    case "pulse":
      return "frame-pulse";
    case "cosmic":
      return "frame-cosmic";
    case "champion":
      return "frame-champion";
    case "neon":
      return "frame-neon";
    case "gold":
      return "frame-gold";
    case "ice":
      return "frame-ice";
    default:
      return "";
  }
}

export function AvatarFrame({ avatar, frameId = "none", level, leaderboardRank, size = "md", className = "" }: AvatarFrameProps) {
  const s = SIZES[size as keyof typeof SIZES] || SIZES.md;
  const frame = FRAMES.find(f => f.id === frameId);
  const isAnimated = frame?.animated && (frame.leaderboardRank === undefined || (leaderboardRank !== undefined && leaderboardRank <= frame.leaderboardRank));
  const style = getFrameStyle(frameId, size);
  const frameClass = isAnimated ? getFrameClass(frameId) : "";

  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 ${className}`}>
      {/* Animated glow ring (behind avatar) */}
      {isAnimated && (
        <div
          className={`absolute inset-0 rounded-full ${frameClass}`}
          style={{
            ...style,
            animationDuration: frameId === "rainbow" ? "3s" : frameId === "flame" ? "1.5s" : "2s",
          }}
        />
      )}

      {/* Static frame (non-animated) */}
      {!isAnimated && frameId !== "none" && (
        <div
          className="absolute inset-0 rounded-full"
          style={style}
        />
      )}

      {/* Avatar */}
      <div
        className={`${s.outer} rounded-full flex items-center justify-center bg-slate-900 relative z-10 ${frameClass ? frameClass + "-inner" : ""}`}
      >
        <span className={s.text}>{avatar}</span>
      </div>
    </div>
  );
}
