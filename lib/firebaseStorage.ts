// ============================================================================
// Firebase Firestore Storage — User Data Persistence
// ============================================================================

import { doc, setDoc, getDoc } from "firebase/firestore";
import { getDb } from "./firebase";

// ─── Types ──────────────────────────────────────────────────────────────────

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

// ─── Flashcards ─────────────────────────────────────────────────────────────

export async function saveFlashcardData(userId: string, data: UserFlashcardData): Promise<void> {
  try {
    await setDoc(doc(getDb(), "users", userId, "data", "flashcards"), {
      ...data,
      lastUpdated: Date.now(),
    });
  } catch (err) {
    console.error("Failed to save flashcard data to Firebase:", err);
  }
}

export async function loadFlashcardData(userId: string): Promise<UserFlashcardData | null> {
  try {
    const snap = await getDoc(doc(getDb(), "users", userId, "data", "flashcards"));
    if (snap.exists()) {
      return snap.data() as UserFlashcardData;
    }
    return null;
  } catch (err) {
    console.error("Failed to load flashcard data from Firebase:", err);
    return null;
  }
}
