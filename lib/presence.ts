// ============================================================================
// Presence System — Online/Offline Status via Firebase Realtime Database
// ============================================================================

import { getDatabase, ref, set, onDisconnect, serverTimestamp as rtdbTimestamp } from "firebase/database";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { app } from "./firebase";

const rtdb = getDatabase(app);
const db = getFirestore(app);

let initialized = false;

/**
 * Setzt den User als online und registriert onDisconnect.
 * Bei Tab-Schloss → automatisch offline via RTDB onDisconnect.
 */
export async function setOnline(uid: string): Promise<void> {
  if (initialized) return;
  initialized = true;

  const statusRef = ref(rtdb, `status/${uid}`);

  try {
    // Online setzen
    await set(statusRef, {
      state: "online",
      lastChanged: rtdbTimestamp(),
      uid,
    });

    // Bei Disconnect (Tab schließen, Internet weg, etc.) → offline
    onDisconnect(statusRef).set({
      state: "offline",
      lastChanged: rtdbTimestamp(),
      uid,
    });

    // Firestore auch updaten
    await updateDoc(doc(db, "users", uid), {
      "status.state": "online",
      "status.lastChanged": new Date().toISOString(),
      lastActive: new Date().toISOString(),
    }).catch(() => {});

    console.log("[Presence] Online:", uid);
  } catch (err) {
    console.error("[Presence] setOnline error:", err);
  }
}

/**
 * Setzt den User als offline (manuell bei Logout).
 */
export async function setOffline(uid: string): Promise<void> {
  try {
    const statusRef = ref(rtdb, `status/${uid}`);
    await set(statusRef, {
      state: "offline",
      lastChanged: rtdbTimestamp(),
      uid,
    });

    await updateDoc(doc(db, "users", uid), {
      "status.state": "offline",
      "status.lastChanged": new Date().toISOString(),
    }).catch(() => {});

    initialized = false;
    console.log("[Presence] Offline:", uid);
  } catch (err) {
    console.error("[Presence] setOffline error:", err);
  }
}

/**
 * Heartbeat: Hält die Verbindung am Leben.
 * Sollte alle 60 Sekunden aufgerufen werden.
 */
export async function refreshPresence(uid: string): Promise<void> {
  try {
    const statusRef = ref(rtdb, `status/${uid}`);
    await set(statusRef, {
      state: "online",
      lastChanged: rtdbTimestamp(),
      uid,
    });
  } catch { /* ok */ }
}

export type PresenceState = "online" | "offline";

export interface UserPresence {
  state: PresenceState;
  lastChanged: number;
  uid?: string;
}
