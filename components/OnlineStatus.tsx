"use client";

import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/lib/firebase";
import type { UserPresence } from "@/lib/presence";

const rtdb = getDatabase(app);

interface OnlineStatusProps {
  uid: string;
  hidden?: boolean;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const SIZES = {
  sm: "w-2.5 h-2.5",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

/**
 * Zeigt den Online-Status eines Users an (Echtzeit via RTDB).
 */
export function OnlineStatus({ uid, hidden, size = "sm", showText = false, className = "" }: OnlineStatusProps) {
  const isOnline = useOnlineStatus(uid, hidden);

  if (hidden) return null;

  const s = SIZES[size];

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div
        className={`${s} rounded-full flex-shrink-0 transition-colors duration-300 ${
          isOnline
            ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"
            : "bg-slate-500"
        }`}
        title={isOnline ? "Online" : "Offline"}
      />
      {showText && (
        <span className={`text-xs ${isOnline ? "text-emerald-400" : "text-slate-500"}`}>
          {isOnline ? "Online" : "Offline"}
        </span>
      )}
    </div>
  );
}

/**
 * Online-Indicator für den AvatarFrame — sitzt am Rahmen.
 */
export function FrameOnlineStatus({ uid, hidden, className = "" }: { uid: string; hidden?: boolean; className?: string }) {
  const isOnline = useOnlineStatus(uid, hidden);

  if (hidden) return null;

  return (
    <div
      className={`absolute w-4 h-4 rounded-full border-2 border-slate-900 transition-all duration-300 z-20 ${
        isOnline
          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
          : "bg-slate-500"
      } ${className}`}
    />
  );
}

/**
 * Hook: Abonniert den Online-Status eines Users (Echtzeit).
 */
export function useOnlineStatus(uid: string, hidden?: boolean): boolean {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (hidden || !uid) { setIsOnline(false); return; }

    const statusRef = ref(rtdb, `status/${uid}`);
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() as UserPresence;
        setIsOnline(data.state === "online");
      } else {
        setIsOnline(false);
      }
    }, (err) => {
      console.error("[Presence] Listen error:", err);
      setIsOnline(false);
    });

    return () => unsubscribe();
  }, [uid, hidden]);

  return isOnline;
}
