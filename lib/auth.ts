// ============================================================================
// Firebase Auth + Firestore — Sicheres User-System (DSGVO-konform)
// ============================================================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
  updatePassword as fbUpdatePassword,
  updateEmail as fbUpdateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuthInstance, getDb } from "./firebase";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  emailVerified: boolean;
  avatar: string;
  bio: string;
  displayName: string;
  createdAt: string;
  streak: number;
  lastActive: string;
  totalXP: number;
  completedModules: string[];
  completedLessons: Record<string, string[]>;
  quizScores: Record<string, number>;
  savedModules: string[];
  settings: {
    theme: "dark" | "light";
    notifications: boolean;
    language: string;
  };
  leaderboardOptIn: boolean;
  equippedFrame: string;
  statusHidden: boolean;
}

// ─── Konstanten ─────────────────────────────────────────────────────────────

const AVATARS = ["🤓", "😎", "🦊", "🐱", "🦄", "🐸", "🐼", "🦁", "🐯", "🐨", "🐻", "🐰", "🦋", "🐙", "🦉", "🐧"];
const STARTER_AVATARS = ["🤓", "😎", "🐱", "🐶", "🐼", "🐨"]; // Nur Level 1 Common

// ─── Helpers ────────────────────────────────────────────────────────────────

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 6) return { valid: false, error: "Passwort muss mindestens 6 Zeichen lang sein" };
  if (!/[0-9]/.test(password)) return { valid: false, error: "Passwort muss mindestens eine Zahl enthalten" };
  if (!/[a-zA-Z]/.test(password)) return { valid: false, error: "Passwort muss mindestens einen Buchstaben enthalten" };
  return { valid: true };
}

export function getUserLevel(xp: number): { level: number; title: string; xpToNext: number; progress: number } {
  const levels = [
    { xp: 0, title: "Anfänger" },
    { xp: 100, title: "Schüler" },
    { xp: 250, title: "Student" },
    { xp: 500, title: "Fortgeschritten" },
    { xp: 1000, title: "Experte" },
    { xp: 2000, title: "Meister" },
    { xp: 5000, title: "Guru" },
    { xp: 10000, title: "Legende" },
  ];
  let currentLevel = 0;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].xp) { currentLevel = i; break; }
  }
  const nextLevel = Math.min(currentLevel + 1, levels.length - 1);
  const currentXP = levels[currentLevel].xp;
  const nextXP = levels[nextLevel].xp;
  const progress = currentLevel === levels.length - 1 ? 100 : Math.round(((xp - currentXP) / (nextXP - currentXP)) * 100);
  return { level: currentLevel + 1, title: levels[currentLevel].title, xpToNext: nextXP - xp, progress };
}

// ─── Registration ───────────────────────────────────────────────────────────

export async function registerUser(
  email: string,
  password: string,
  username: string
): Promise<{ needsVerification: boolean }> {
  // Prüfen ob Username bereits vergeben
  const usernameSnap = await getDoc(doc(getDb(), "usernames", username));
  if (usernameSnap.exists()) {
    throw new Error("Benutzername ist bereits vergeben");
  }

  // Firebase Auth User erstellen
  const credential = await createUserWithEmailAndPassword(getAuthInstance(), email, password);
  const firebaseUser = credential.user;

  // Display Name setzen
  await updateProfile(firebaseUser, { displayName: username });

  // Username reservieren
  await setDoc(doc(getDb(), "usernames", username), {
    uid: firebaseUser.uid,
    createdAt: serverTimestamp(),
  });

  // Profil in Firestore anlegen (auch wenn noch unverifiziert)
  const profile: UserProfile = {
    uid: firebaseUser.uid,
    username,
    email,
    emailVerified: false,
    avatar: STARTER_AVATARS[Math.floor(Math.random() * STARTER_AVATARS.length)],
    bio: "",
    displayName: username,
    createdAt: new Date().toISOString(),
    streak: 1,
    lastActive: new Date().toISOString(),
    totalXP: 0,
    completedModules: [],
    completedLessons: {},
    quizScores: {},
    savedModules: [],
    settings: { theme: "dark", notifications: true, language: "de" },
    leaderboardOptIn: false,
    equippedFrame: "none",
    statusHidden: false,
  };
  await setDoc(doc(getDb(), "users", firebaseUser.uid), {
    ...profile,
    createdAt: serverTimestamp(),
  });

  // Bestätigungs-E-Mail senden (Firebase sendet automatisch)
  await sendEmailVerification(firebaseUser);

  // User ausloggen bis E-Mail bestätigt
  await signOut(getAuthInstance());

  return { needsVerification: true };
}

// ─── Login ──────────────────────────────────────────────────────────────────

export async function loginUser(email: string, password: string): Promise<UserProfile> {
  const credential = await signInWithEmailAndPassword(getAuthInstance(), email, password);
  const firebaseUser = credential.user;

  // Prüfen ob E-Mail bestätigt
  if (!firebaseUser.emailVerified) {
    await signOut(getAuthInstance());
    throw new Error("Bitte bestätige zuerst deine E-Mail. Schau in deinen Posteingang.");
  }

  // Profil laden
  let profile = await getUserProfile(firebaseUser.uid);

  if (!profile) {
    // Edge Case: Auth-User ohne Firestore-Profil
    profile = {
      uid: firebaseUser.uid,
      username: firebaseUser.displayName || email.split("@")[0],
      email: firebaseUser.email || email,
      emailVerified: true,
      avatar: AVATARS[0],
      bio: "",
      displayName: firebaseUser.displayName || "",
      createdAt: new Date().toISOString(),
      streak: 1,
      lastActive: new Date().toISOString(),
      totalXP: 0,
      completedModules: [],
      completedLessons: {},
      quizScores: {},
      savedModules: [],
      settings: { theme: "dark", notifications: true, language: "de" },
      leaderboardOptIn: false,
    equippedFrame: "none",
    statusHidden: false,
    };
    await setDoc(doc(getDb(), "users", firebaseUser.uid), { ...profile, createdAt: serverTimestamp() });
  } else if (!profile.emailVerified) {
    // E-Mail wurde gerade bestätigt → Profil updaten
    await updateUserProfile(firebaseUser.uid, { emailVerified: true });
    profile.emailVerified = true;
  }

  // Streak updaten
  const updated = updateStreak(profile);
  await updateUserProfile(firebaseUser.uid, { streak: updated.streak, lastActive: updated.lastActive });

  return updated;
}

// ─── E-Mail erneut senden ───────────────────────────────────────────────────

export async function resendVerificationEmail(): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user) throw new Error("Nicht eingeloggt");
  await sendEmailVerification(user);
}

// ─── Logout ─────────────────────────────────────────────────────────────────

export async function logoutUser(): Promise<void> {
  await signOut(getAuthInstance());
}

// ─── Profile CRUD ───────────────────────────────────────────────────────────

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const snap = await getDoc(doc(getDb(), "users", uid));
    if (snap.exists()) return snap.data() as UserProfile;
    return null;
  } catch (err) {
    console.error("Failed to load user profile:", err);
    return null;
  }
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
  try {
    await updateDoc(doc(getDb(), "users", uid), {
      ...updates,
      lastActive: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to update profile:", err);
    throw err;
  }
}

// ─── Passwort / E-Mail ändern ───────────────────────────────────────────────

async function reauthenticate(password: string): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user || !user.email) throw new Error("Nicht eingeloggt");
  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);
}

export async function changePassword(currentPw: string, newPw: string): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user) throw new Error("Nicht eingeloggt");
  await reauthenticate(currentPw);
  await fbUpdatePassword(user, newPw);
}

export async function changeEmail(currentPw: string, newEmail: string): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user) throw new Error("Nicht eingeloggt");
  await reauthenticate(currentPw);
  await fbUpdateEmail(user, newEmail);
  await sendEmailVerification(user);
  await updateUserProfile(user.uid, { email: newEmail, emailVerified: false });
}

// ─── DSGVO: Account löschen ─────────────────────────────────────────────────

export async function deleteAccount(password: string): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user) throw new Error("Nicht eingeloggt");
  await reauthenticate(password);
  const username = user.displayName;
  if (username) await deleteDoc(doc(getDb(), "usernames", username)).catch(() => {});
  await deleteDoc(doc(getDb(), "users", user.uid)).catch(() => {});
  await deleteUser(user);
}

// ─── Streak ─────────────────────────────────────────────────────────────────

function updateStreak(profile: UserProfile): UserProfile {
  const today = new Date().toDateString();
  const lastActive = new Date(profile.lastActive).toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (lastActive === today) return profile;
  if (lastActive === yesterday) return { ...profile, streak: profile.streak + 1, lastActive: new Date().toISOString() };
  return { ...profile, streak: 1, lastActive: new Date().toISOString() };
}

// ─── Progress ───────────────────────────────────────────────────────────────

export async function saveUserProgress(
  uid: string, moduleId: string, lessonId: string, quizScore?: number
): Promise<UserProfile | null> {
  const profile = await getUserProfile(uid);
  if (!profile) return null;
  if (!profile.completedLessons[moduleId]) profile.completedLessons[moduleId] = [];
  // Merken ob die Lektion bereits abgeschlossen war BEVOR wir sie hinzufügen
  const wasLessonAlreadyDone = profile.completedLessons[moduleId].includes(lessonId);
  if (!wasLessonAlreadyDone) {
    profile.completedLessons[moduleId].push(lessonId);
    profile.totalXP += 10;
  }
  if (quizScore !== undefined) {
    const old = profile.quizScores[moduleId] || 0;
    if (quizScore > old) {
      profile.quizScores[moduleId] = quizScore;
      // Nur XP für den ersten Abschluss vergeben, nicht für Wiederholungen
      if (!wasLessonAlreadyDone) {
        profile.totalXP += (quizScore - old) * 2;
      }
    }
  }
  try {
    const { getModule } = await import("./data");
    const mod = getModule(moduleId);
    if (mod) {
      const count = profile.completedLessons[moduleId]?.length || 0;
      if (count >= mod.lessons.length && !profile.completedModules.includes(moduleId)) {
        profile.completedModules.push(moduleId);
        profile.totalXP += 50;
      }
    }
  } catch { /* ok */ }
  const updated = updateStreak(profile);
  await updateUserProfile(uid, {
    completedLessons: updated.completedLessons, completedModules: updated.completedModules,
    quizScores: updated.quizScores, totalXP: updated.totalXP, streak: updated.streak, lastActive: updated.lastActive,
  });
  return updated;
}

export async function toggleSaveModule(uid: string, slug: string): Promise<UserProfile | null> {
  const profile = await getUserProfile(uid);
  if (!profile) return null;
  if (!profile.savedModules) profile.savedModules = [];
  const i = profile.savedModules.indexOf(slug);
  if (i >= 0) profile.savedModules.splice(i, 1); else profile.savedModules.push(slug);
  await updateUserProfile(uid, { savedModules: profile.savedModules });
  return profile;
}

// ─── Leaderboard ───────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  uid: string;
  username: string;
  displayName: string;
  avatar: string;
  equippedFrame: string;
  totalXP: number;
  streak: number;
  completedModules: number;
  level: number;
  levelTitle: string;
  rank: number;
}

export async function getLeaderboard(limit: number = 50): Promise<LeaderboardEntry[]> {
  try {
    const { collection, getDocs } = await import("firebase/firestore");

    // Alle Users laden (Firestore Free Tier: keine Composite-Index-Probleme)
    const snap = await getDocs(collection(getDb(), "users"));

    const entries: LeaderboardEntry[] = [];

    snap.forEach((doc) => {
      const data = doc.data() as UserProfile;
      // Nur opted-in Users
      if (data.leaderboardOptIn !== true) return;
      if (!data.uid || !data.username) return;
      const levelInfo = getUserLevel(data.totalXP || 0);
      entries.push({
        uid: data.uid,
        username: data.username,
        displayName: data.displayName || data.username,
        avatar: data.avatar || "🎓",
        equippedFrame: data.equippedFrame || "none",
        totalXP: data.totalXP || 0,
        streak: data.streak || 0,
        completedModules: data.completedModules?.length || 0,
        level: levelInfo.level,
        levelTitle: levelInfo.title,
        rank: 0,
      });
    });

    // Client-seitig nach XP sortieren
    entries.sort((a, b) => b.totalXP - a.totalXP);

    // Ränge vergeben
    entries.forEach((entry, i) => { entry.rank = i + 1; });

    return entries.slice(0, limit);
  } catch (err) {
    console.error("Failed to load leaderboard:", err);
    return [];
  }
}

export async function toggleLeaderboardOptIn(uid: string, optIn: boolean): Promise<void> {
  try {
    // setDoc mit merge: erstellt das Feld falls es noch nicht existiert
    await setDoc(doc(getDb(), "users", uid), {
      leaderboardOptIn: optIn,
      lastActive: new Date().toISOString(),
    }, { merge: true });
    console.log(`[Leaderboard] ${uid} → ${optIn ? "ON" : "OFF"}`);
  } catch (err) {
    console.error("[Leaderboard] Toggle failed:", err);
    throw err;
  }
}
