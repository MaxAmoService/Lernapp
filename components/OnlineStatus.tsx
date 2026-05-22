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
}

const SIZES = {
  sm: "w-2.5 h-2.5",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

/**
 * Zeigt den Online-Status eines Users an.
 * Liest Echtzeit-Status aus Firebase Realtime Database.
 */
export function OnlineStatus({ uid, hidden, size = "sm", showText = false }: OnlineStatusProps) {
  const [presence, setPresence] = useState<UserPresence | null>(null);

  useEffect(() => {
    if (hidden) return;

    const statusRef = ref(rtdb, `status/${uid}`);
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        setPresence(snapshot.val() as UserPresence);
      } else {
        setPresence({ state: "offline", lastChanged: 0 });
      }
    });

    return () => unsubscribe();
  }, [uid, hidden]);

  if (hidden) return null;

  const isOnline = presence?.state === "online";
  const s = SIZES[size];

  return (
    <div className="flex items-center gap-1.5">
      <div className={`${s} rounded-full flex-shrink-0 ${
        isOnline
          ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"
          : "bg-slate-500"
      }`} />
      {showText && (
        <span className={`text-xs ${isOnline ? "text-emerald-400" : "text-slate-500"}`}>
          {isOnline ? "Online" : "Offline"}
        </span>
      )}
    </div>
  );
}

/**
 * Hook: Abonniert den Online-Status eines Users.
 */
export function useOnlineStatus(uid: string, hidden?: boolean): boolean {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (hidden) { setIsOnline(false); return; }

    const statusRef = ref(rtdb, `status/${uid}`);
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() as UserPresence;
        setIsOnline(data.state === "online");
      } else {
        setIsOnline(false);
      }
    });

    return () => unsubscribe();
  }, [uid, hidden]);

  return isOnline;
}
