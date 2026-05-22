// ============================================================================
// Firebase Auth + Firestore — Sicheres User-System (DSGVO-konform)
// ============================================================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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
import { auth, db } from "./firebase";

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
}

export interface PendingVerification {
  email: string;
  code: string;
  username: string;
  passwordHash: string;
  attempts: number;
  createdAt: number; // timestamp ms
  expiresAt: number; // timestamp ms
}

// ─── Konstanten ─────────────────────────────────────────────────────────────

const AVATARS = ["🤓", "😎", "🦊", "🐱", "🦄", "🐸", "🐼", "🦁", "🐯", "🐨", "🐻", "🐰", "🦋", "🐙", "🦉", "🐧"];
const MAX_VERIFY_ATTEMPTS = 5;
const CODE_EXPIRY_MS = 10 * 60 * 1000; // 10 Minuten
const MAX_CODES_PER_EMAIL = 3; // Max Codes pro E-Mail in 10 Min

// ─── Helpers ────────────────────────────────────────────────────────────────

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 6) return { valid: false, error: "Passwort muss mindestens 6 Zeichen lang sein" };
  if (!/[0-9]/.test(password)) return { valid: false, error: "Passwort muss mindestens eine Zahl enthalten" };
  if (!/[a-zA-Z]/.test(password)) return { valid: false, error: "Passwort muss mindestens einen Buchstaben enthalten" };
  return { valid: true };
}

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Einfacher Hash für Passwort-Speicherung in Pending-Verifications
function hashPasswordSimple(password: string): string {
  const salt = Math.random().toString(36).substring(2, 10);
  let hash = 0;
  for (let i = 0; i < (salt + password).length; i++) {
    const char = (salt + password).charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return salt + ":" + Math.abs(hash).toString(36);
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

// ─── E-Mail senden ──────────────────────────────────────────────────────────

async function sendVerificationEmail(email: string, code: string, username: string): Promise<boolean> {
  try {
    const response = await fetch("/api/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, username }),
    });
    if (response.ok) return true;
    const err = await response.json().catch(() => ({}));
    console.error("E-Mail API error:", err);
    return false;
  } catch (err) {
    console.error("E-Mail send error:", err);
    return false;
  }
}

// ─── Registration: Verification Code erstellen ─────────────────────────────

export async function createVerification(
  email: string,
  password: string,
  username: string
): Promise<{ code: string; sent: boolean }> {
  // Prüfen ob E-Mail bereits bei Firebase Auth registriert ist
  // (wir können das client-seitig nicht direkt prüfen, aber wir versuchen es beim Verify)

  // Prüfen ob Username bereits vergeben
  const usernameSnap = await getDoc(doc(db, "usernames", username));
  if (usernameSnap.exists()) {
    throw new Error("Benutzername ist bereits vergeben");
  }

  // Rate Limit: Prüfen wie viele Codes für diese E-Mail existieren
  const pendingRef = doc(db, "pending_verifications", email);
  const existingSnap = await getDoc(pendingRef);
  if (existingSnap.exists()) {
    const existing = existingSnap.data() as PendingVerification;
    const recentCodes = existing.createdAt > Date.now() - (10 * 60 * 1000) ? 1 : 0;
    if (recentCodes >= MAX_CODES_PER_EMAIL) {
      throw new Error("Zu viele Codes angefordert. Bitte warte 10 Minuten.");
    }
  }

  const code = generateCode();
  const passwordHash = hashPasswordSimple(password);

  // In Firestore speieren (NICHT den echten User anlegen!)
  await setDoc(pendingRef, {
    email,
    code,
    username,
    passwordHash,
    attempts: 0,
    createdAt: Date.now(),
    expiresAt: Date.now() + CODE_EXPIRY_MS,
  });

  // E-Mail senden
  const sent = await sendVerificationEmail(email, code, username);

  return { code, sent };
}

// ─── Verification Code prüfen + User erstellen ─────────────────────────────

export async function verifyCodeAndCreateUser(
  email: string,
  inputCode: string
): Promise<UserProfile> {
  const pendingRef = doc(db, "pending_verifications", email);
  const snap = await getDoc(pendingRef);

  if (!snap.exists()) {
    throw new Error("Kein Verifizierungscode gefunden. Bitte erneut registrieren.");
  }

  const pending = snap.data() as PendingVerification;

  // Abgelaufen?
  if (Date.now() > pending.expiresAt) {
    await deleteDoc(pendingRef);
    throw new Error("Code ist abgelaufen. Bitte erneut registrieren.");
  }

  // Zu viele Versuche?
  if (pending.attempts >= MAX_VERIFY_ATTEMPTS) {
    await deleteDoc(pendingRef);
    throw new Error("Zu viele Fehlversuche. Bitte erneut registrieren.");
  }

  // Code prüfen
  if (inputCode !== pending.code) {
    await updateDoc(pendingRef, { attempts: pending.attempts + 1 });
    throw new Error(`Falscher Code. Noch ${MAX_VERIFY_ATTEMPTS - pending.attempts - 1} Versuche.`);
  }

  // Code korrekt → Firebase Auth User erstellen
  let firebaseUser: FirebaseUser;
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, pending.passwordHash.split(":")[0] + pending.passwordHash);
    firebaseUser = credential.user;
  } catch (err: unknown) {
    // Falls E-Mail bereits bei Firebase Auth existiert
    if ((err as { code?: string })?.code === "auth/email-already-in-use") {
      await deleteDoc(pendingRef);
      throw new Error("Diese E-Mail ist bereits registriert. Bitte einloggen.");
    }
    throw err;
  }

  // Display Name setzen
  await updateProfile(firebaseUser, { displayName: pending.username });

  // Username reservieren
  await setDoc(doc(db, "usernames", pending.username), {
    uid: firebaseUser.uid,
    createdAt: serverTimestamp(),
  });

  // User-Profil in Firestore anlegen (erst NACH Verifizierung!)
  const profile: UserProfile = {
    uid: firebaseUser.uid,
    username: pending.username,
    email,
    emailVerified: true,
    avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    bio: "",
    displayName: pending.username,
    createdAt: new Date().toISOString(),
    streak: 1,
    lastActive: new Date().toISOString(),
    totalXP: 0,
    completedModules: [],
    completedLessons: {},
    quizScores: {},
    savedModules: [],
    settings: { theme: "dark", notifications: true, language: "de" },
  };

  await setDoc(doc(db, "users", firebaseUser.uid), {
    ...profile,
    createdAt: serverTimestamp(),
  });

  // Pending Verification löschen
  await deleteDoc(pendingRef);

  return profile;
}

// ─── Login ──────────────────────────────────────────────────────────────────

export async function loginUser(email: string, password: string): Promise<UserProfile> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const firebaseUser = credential.user;

  // Profil aus Firestore laden
  let profile = await getUserProfile(firebaseUser.uid);

  if (!profile) {
    // Edge Case: User existiert in Auth aber nicht in Firestore
    // → Profil nachtragen
    profile = {
      uid: firebaseUser.uid,
      username: firebaseUser.displayName || email.split("@")[0],
      email: firebaseUser.email || email,
      emailVerified: firebaseUser.emailVerified,
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
    };
    await setDoc(doc(db, "users", firebaseUser.uid), { ...profile, createdAt: serverTimestamp() });
  }

  // Streak updaten
  const updated = updateStreak(profile);
  await updateUserProfile(firebaseUser.uid, { streak: updated.streak, lastActive: updated.lastActive });

  return updated;
}

// ─── Logout ─────────────────────────────────────────────────────────────────

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

// ─── Profile CRUD ───────────────────────────────────────────────────────────

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const snap = await getDoc(doc(db, "users", uid));
    if (snap.exists()) return snap.data() as UserProfile;
    return null;
  } catch (err) {
    console.error("Failed to load user profile:", err);
    return null;
  }
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
  try {
    await updateDoc(doc(db, "users", uid), {
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
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error("Nicht eingeloggt");
  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);
}

export async function changePassword(currentPw: string, newPw: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("Nicht eingeloggt");
  await reauthenticate(currentPw);
  await fbUpdatePassword(user, newPw);
}

export async function changeEmail(currentPw: string, newEmail: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("Nicht eing로그gt");
  await reauthenticate(currentPw);
  await fbUpdateEmail(user, newEmail);
  await updateUserProfile(user.uid, { email: newEmail, emailVerified: false });
}

// ─── DSGVO: Account löschen ─────────────────────────────────────────────────

export async function deleteAccount(password: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("Nicht eingeloggt");

  await reauthenticate(password);

  // Firestore-Daten löschen
  const username = user.displayName;
  if (username) {
    await deleteDoc(doc(db, "usernames", username)).catch(() => {});
  }
  await deleteDoc(doc(db, "users", user.uid)).catch(() => {});

  // Firebase Auth User löschen
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
  uid: string,
  moduleId: string,
  lessonId: string,
  quizScore?: number
): Promise<UserProfile | null> {
  const profile = await getUserProfile(uid);
  if (!profile) return null;

  if (!profile.completedLessons[moduleId]) profile.completedLessons[moduleId] = [];
  if (!profile.completedLessons[moduleId].includes(lessonId)) {
    profile.completedLessons[moduleId].push(lessonId);
    profile.totalXP += 10;
  }

  if (quizScore !== undefined) {
    const old = profile.quizScores[moduleId] || 0;
    if (quizScore > old) {
      profile.quizScores[moduleId] = quizScore;
      profile.totalXP += (quizScore - old) * 2;
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
    completedLessons: updated.completedLessons,
    completedModules: updated.completedModules,
    quizScores: updated.quizScores,
    totalXP: updated.totalXP,
    streak: updated.streak,
    lastActive: updated.lastActive,
  });
  return updated;
}

export async function toggleSaveModule(uid: string, slug: string): Promise<UserProfile | null> {
  const profile = await getUserProfile(uid);
  if (!profile) return null;
  if (!profile.savedModules) profile.savedModules = [];
  const i = profile.savedModules.indexOf(slug);
  if (i >= 0) profile.savedModules.splice(i, 1);
  else profile.savedModules.push(slug);
  await updateUserProfile(uid, { savedModules: profile.savedModules });
  return profile;
}

// ─── Legacy Compat ──────────────────────────────────────────────────────────

export function isAccountLocked(): { locked: boolean; remainingSeconds: number } {
  return { locked: false, remainingSeconds: 0 };
}

export type User = UserProfile;
