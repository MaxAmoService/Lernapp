"use client";

import { getFrameCSS, isFrameAnimated } from "@/lib/rewards";

interface AvatarFrameProps {
  avatar: string;
  frameId?: string;
  level: number;
  leaderboardRank?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZES = {
  sm: { outer: "w-9 h-9", inner: "w-7 h-7", text: "text-lg", padding: "p-0.5" },
  md: { outer: "w-12 h-12", inner: "w-10 h-10", text: "text-2xl", padding: "p-1" },
  lg: { outer: "w-16 h-16", inner: "w-14 h-14", text: "text-3xl", padding: "p-1" },
  xl: { outer: "w-24 h-24", inner: "w-20 h-20", text: "text-5xl", padding: "p-2" },
};

export function AvatarFrame({ avatar, frameId = "none", level, leaderboardRank, size = "md", className = "" }: AvatarFrameProps) {
  const s = SIZES[size];
  const frameCSS = getFrameCSS(frameId, level, leaderboardRank);
  const animated = isFrameAnimated(frameId, level, leaderboardRank);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Animated glow background */}
      {animated && (
        <div
          className={`absolute inset-0 rounded-full ${s.outer} animate-pulse`}
          style={{
            background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6)",
            filter: "blur(6px)",
            opacity: 0.5,
          }}
        />
      )}

      {/* Rainbow border for animated legendary */}
      {frameId === "rainbow" && animated && (
        <div
          className={`absolute inset-0 rounded-full ${s.outer}`}
          style={{
            background: "conic-gradient(from 0deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6, #ef4444)",
            padding: "2px",
            animation: "spin 4s linear infinite",
          }}
        >
          <div className="w-full h-full rounded-full bg-slate-900" />
        </div>
      )}

      {/* Avatar container */}
      <div
        className={`relative ${s.outer} rounded-full flex items-center justify-center ${s.padding} ${
          frameCSS || "ring-2 ring-slate-700"
        } ${animated && frameId !== "rainbow" ? "animate-glow" : ""} z-10`}
        style={animated && frameId !== "rainbow" ? {
          background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6)",
          padding: "2px",
        } : undefined}
      >
        <div className={`${s.inner} rounded-full bg-slate-900 flex items-center justify-center ${s.text}`}>
          {avatar}
        </div>
      </div>
    </div>
  );
}
