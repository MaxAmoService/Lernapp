// ============================================================================
// Firebase Firestore Storage — User Data Persistence
// ============================================================================

import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface UserProgress {
  completedLessons: Record<string, string[]>; // moduleId -> lessonIds
  savedModules: string[];
  lastUpdated: number;
}

export interface UserFlashcardData {
  decks: Record<string, {
    cards: Record<string, {
      cardId: string;
      interval: number;
      easeFactor: number;
      repetitions: number;
      nextReview: number;
      lastReview: number;
    }>;
    lastStudy: number;
    streak: number;
  }>;
  lastUpdated: number;
}

// ─── Progress ───────────────────────────────────────────────────────────────

export async function saveProgress(userId: string, progress: UserProgress): Promise<void> {
  try {
    await setDoc(doc(db, "users", userId, "data", "progress"), {
      ...progress,
      lastUpdated: Date.now(),
    });
  } catch (err) {
    console.error("Failed to save progress to Firebase:", err);
  }
}

export async function loadProgress(userId: string): Promise<UserProgress | null> {
  try {
    const snap = await getDoc(doc(db, "users", userId, "data", "progress"));
    if (snap.exists()) {
      return snap.data() as UserProgress;
    }
    return null;
  } catch (err) {
    console.error("Failed to load progress from Firebase:", err);
    return null;
  }
}

// ─── Flashcards ─────────────────────────────────────────────────────────────

export async function saveFlashcardData(userId: string, data: UserFlashcardData): Promise<void> {
  try {
    await setDoc(doc(db, "users", userId, "data", "flashcards"), {
      ...data,
      lastUpdated: Date.now(),
    });
  } catch (err) {
    console.error("Failed to save flashcard data to Firebase:", err);
  }
}

export async function loadFlashcardData(userId: string): Promise<UserFlashcardData | null> {
  try {
    const snap = await getDoc(doc(db, "users", userId, "data", "flashcards"));
    if (snap.exists()) {
      return snap.data() as UserFlashcardData;
    }
    return null;
  } catch (err) {
    console.error("Failed to load flashcard data from Firebase:", err);
    return null;
  }
}

// ─── Real-time Sync ─────────────────────────────────────────────────────────

export function subscribeToProgress(
  userId: string,
  callback: (progress: UserProgress) => void
): () => void {
  return onSnapshot(
    doc(db, "users", userId, "data", "progress"),
    (snap) => {
      if (snap.exists()) {
        callback(snap.data() as UserProgress);
      }
    },
    (err) => {
      console.error("Progress subscription error:", err);
    }
  );
}

export function subscribeToFlashcards(
  userId: string,
  callback: (data: UserFlashcardData) => void
): () => void {
  return onSnapshot(
    doc(db, "users", userId, "data", "flashcards"),
    (snap) => {
      if (snap.exists()) {
        callback(snap.data() as UserFlashcardData);
      }
    },
    (err) => {
      console.error("Flashcard subscription error:", err);
    }
  );
}

// ─── Helper ─────────────────────────────────────────────────────────────────

export function getUserId(user: { uid?: string; username?: string } | null): string | null {
  if (!user) return null;
  // Prefer Firebase UID, fallback to username-based ID
  return user.uid || (user.username ? `user_${user.username}` : null);
}
