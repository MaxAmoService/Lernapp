// ============================================================================
// Presence System — Online/Offline via Firestore (kein RTDB nötig)
// ============================================================================

import { doc, updateDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

const HEARTBEAT_INTERVAL = 20_000; // 20 Sekunden
const ONLINE_THRESHOLD = 60_000;   // 60 Sekunden = als online betrachtet

let heartbeatTimer: NodeJS.Timeout | null = null;
let unloadHandler: (() => void) | null = null;

/**
 * Startet Presence-System: Heartbeat + Page-Unload Detection.
 */
export async function setOnline(uid: string): Promise<void> {
  // Sofort als online markieren
  await writeStatus(uid, "online");

  // Heartbeat: alle 20s Status refreshen
  if (heartbeatTimer) clearInterval(heartbeatTimer);
  heartbeatTimer = setInterval(() => writeStatus(uid, "online").catch(() => {}), HEARTBEAT_INTERVAL);

  // Bei Tab schließen → offline
  if (unloadHandler) window.removeEventListener("beforeunload", unloadHandler);
  unloadHandler = () => {
    // navigator.sendBeacon ist zuverlässiger als fetch bei Page-Unload
    const data = JSON.stringify({ state: "offline", lastChanged: Date.now() });
    navigator.sendBeacon(`/api/presence?uid=${uid}`, data);
    // Fallback: direkt in Firestore (best-effort)
    writeStatus(uid, "offline").catch(() => {});
  };
  window.addEventListener("beforeunload", unloadHandler);
}

/**
 * Stoppt Presence-System und setzt offline.
 */
export async function setOffline(uid: string): Promise<void> {
  if (heartbeatTimer) { clearInterval(heartbeatTimer); heartbeatTimer = null; }
  if (unloadHandler) { window.removeEventListener("beforeunload", unloadHandler); unloadHandler = null; }
  await writeStatus(uid, "offline");
}

/**
 * Prüft ob ein User online ist (basierend auf lastHeartbeat).
 */
export function isUserOnline(lastHeartbeat: string | undefined): boolean {
  if (!lastHeartbeat) return false;
  return Date.now() - new Date(lastHeartbeat).getTime() < ONLINE_THRESHOLD;
}

// ─── Intern ─────────────────────────────────────────────────────────────────

async function writeStatus(uid: string, state: "online" | "offline"): Promise<void> {
  await updateDoc(doc(db, "users", uid), {
    "status.state": state,
    "status.lastChanged": new Date().toISOString(),
    lastActive: new Date().toISOString(),
  }).catch(() => {});
}
