// ============================================================================
// Presence System — Online/Offline Status via Firebase Realtime Database
// ============================================================================

import { getDatabase, ref, onValue, set, onDisconnect, serverTimestamp as rtdbTimestamp } from "firebase/database";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { app } from "./firebase";

const rtdb = getDatabase(app);
const db = getFirestore(app);

/**
 * Setzt den User als online und registriert onDisconnect.
 * Wird beim Login aufgerufen.
 */
export async function setOnline(uid: string): Promise<void> {
  const statusRef = ref(rtdb, `status/${uid}`);
  const userStatusRef = ref(rtdb, `.info/connected`);

  // Realtime Database: Echtzeit-Verbindungsstatus
  onValue(userStatusRef, (snapshot) => {
    if (snapshot.val() === true) {
      // User ist verbunden → online setzen
      set(statusRef, {
        state: "online",
        lastChanged: rtdbTimestamp(),
      });

      // Bei Disconnect → offline setzen
      onDisconnect(statusRef).set({
        state: "offline",
        lastChanged: rtdbTimestamp(),
      });
    }
  });

  // Firestore: auch lastActive updaten
  try {
    await updateDoc(doc(db, "users", uid), {
      "status.state": "online",
      "status.lastChanged": new Date().toISOString(),
      lastActive: new Date().toISOString(),
    });
  } catch { /* ok */ }
}

/**
 * Setzt den User als offline (manuell, z.B. bei Logout).
 */
export async function setOffline(uid: string): Promise<void> {
  const statusRef = ref(rtdb, `status/${uid}`);
  await set(statusRef, {
    state: "offline",
    lastChanged: rtdbTimestamp(),
  });

  try {
    await updateDoc(doc(db, "users", uid), {
      "status.state": "offline",
      "status.lastChanged": new Date().toISOString(),
    });
  } catch { /* ok */ }
}

/**
 * Setzt den User als offline wenn er es in den Einstellungen deaktiviert.
 */
export async function setStatusHidden(uid: string, hidden: boolean): Promise<void> {
  try {
    await updateDoc(doc(db, "users", uid), {
      "status.hidden": hidden,
    });
  } catch { /* ok */ }
}

export type PresenceState = "online" | "offline";

export interface UserPresence {
  state: PresenceState;
  lastChanged: number; // timestamp
}
