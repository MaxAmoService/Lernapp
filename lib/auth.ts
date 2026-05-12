// localStorage-based auth system with email verification simulation

export interface User {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  avatar: string;
  createdAt: string;
  streak: number;
  lastActive: string;
  totalXP: number;
  completedModules: string[];
  completedLessons: Record<string, string[]>; // moduleId -> lessonIds
  quizScores: Record<string, number>; // moduleId -> score
  savedModules?: string[]; // gemerkte Module
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// ---- Rate Limiting ----
interface LoginAttempt {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
}

function getLoginAttempts(): Record<string, LoginAttempt> {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem("learnhub_login_attempts");
  return data ? JSON.parse(data) : {};
}

function saveLoginAttempts(attempts: Record<string, LoginAttempt>) {
  localStorage.setItem("learnhub_login_attempts", JSON.stringify(attempts));
}

export function isAccountLocked(username: string): { locked: boolean; remainingSeconds: number } {
  const attempts = getLoginAttempts();
  const attempt = attempts[username];
  if (!attempt) return { locked: false, remainingSeconds: 0 };

  if (attempt.lockedUntil && Date.now() < attempt.lockedUntil) {
    return { locked: true, remainingSeconds: Math.ceil((attempt.lockedUntil - Date.now()) / 1000) };
  }

  // Lock expired, reset
  if (attempt.lockedUntil && Date.now() >= attempt.lockedUntil) {
    delete attempts[username];
    saveLoginAttempts(attempts);
  }

  return { locked: false, remainingSeconds: 0 };
}

function recordLoginAttempt(username: string, success: boolean) {
  const attempts = getLoginAttempts();
  if (!attempts[username]) {
    attempts[username] = { count: 0, lastAttempt: Date.now() };
  }

  if (success) {
    delete attempts[username];
  } else {
    attempts[username].count++;
    attempts[username].lastAttempt = Date.now();
    // Lock after 5 failed attempts for 5 minutes
    if (attempts[username].count >= 5) {
      attempts[username].lockedUntil = Date.now() + 5 * 60 * 1000;
    }
  }

  saveLoginAttempts(attempts);
}

// ---- Password Hashing (bcryptjs) ----
// Simple hash with salt for client-side use
export function hashPassword(password: string): string {
  const salt = generateId().slice(0, 8);
  let hash = 0;
  const saltedPassword = salt + password;
  for (let i = 0; i < saltedPassword.length; i++) {
    const char = saltedPassword.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return salt + ":" + Math.abs(hash).toString(36);
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split(":");
  if (parts.length !== 2) {
    // Legacy unsalted hash — verify old format
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36) + password.length === storedHash;
  }
  const [salt] = parts;
  let hash = 0;
  const saltedPassword = salt + password;
  for (let i = 0; i < saltedPassword.length; i++) {
    const char = saltedPassword.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36) === parts[1];
}

// ---- Password Validation ----
export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 6) return { valid: false, error: "Passwort muss mindestens 6 Zeichen lang sein" };
  if (!/[0-9]/.test(password)) return { valid: false, error: "Passwort muss mindestens eine Zahl enthalten" };
  if (!/[a-zA-Z]/.test(password)) return { valid: false, error: "Passwort muss mindestens einen Buchstaben enthalten" };
  return { valid: true };
}

// Generate simple ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// ---- Email Verification ----
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function savePendingVerification(email: string, code: string, username: string, passwordHash: string) {
  localStorage.setItem("learnhub_pending_verification", JSON.stringify({
    email, code, username, passwordHash, timestamp: Date.now()
  }));
}

export function getPendingVerification(): { email: string; code: string; username: string; passwordHash: string; timestamp: number } | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("learnhub_pending_verification");
  return data ? JSON.parse(data) : null;
}

export function clearPendingVerification() {
  localStorage.removeItem("learnhub_pending_verification");
}

export function verifyEmailCode(inputCode: string): User | null {
  const pending = getPendingVerification();
  if (!pending) return null;

  // Code expires after 10 minutes
  if (Date.now() - pending.timestamp > 10 * 60 * 1000) {
    clearPendingVerification();
    return null;
  }

  if (inputCode !== pending.code) return null;

  // Create the actual user
  const avatars = ["🤓", "😎", "🦊", "🐱", "🦄", "🐸", "🐼", "🦁", "🐯", "🐨"];
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

  const user: User = {
    id: generateId(),
    username: pending.username,
    email: pending.email,
    emailVerified: true,
    avatar: randomAvatar,
    createdAt: new Date().toISOString(),
    streak: 1,
    lastActive: new Date().toISOString(),
    totalXP: 0,
    completedModules: [],
    completedLessons: {},
    quizScores: {},
    savedModules: [],
  };

  const users = getUsers();
  users[pending.username] = { user, passwordHash: pending.passwordHash };
  saveUsers(users);
  clearPendingVerification();

  return user;
}

// ---- User Storage ----

// Get all users from localStorage
export function getUsers(): Record<string, { user: User; passwordHash: string }> {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem("learnhub_users");
  return data ? JSON.parse(data) : {};
}

// Save users to localStorage
export function saveUsers(users: Record<string, { user: User; passwordHash: string }>): void {
  localStorage.setItem("learnhub_users", JSON.stringify(users));
}

// Register new user — starts verification flow
export function registerUser(username: string, email: string, password: string): { pending: true; code: string } | null {
  const users = getUsers();

  // Check if username exists
  if (users[username]) {
    return null;
  }

  // Check if email already used
  for (const key in users) {
    if (users[key].user.email === email) {
      return null;
    }
  }

  const passwordHash = hashPassword(password);
  const code = generateVerificationCode();

  savePendingVerification(email, code, username, passwordHash);

  return { pending: true, code };
}

// Login user
export function loginUser(username: string, password: string): User | null {
  // Check rate limit
  const lockStatus = isAccountLocked(username);
  if (lockStatus.locked) {
    return null;
  }

  const users = getUsers();
  const userData = users[username];

  if (!userData) {
    recordLoginAttempt(username, false);
    return null;
  }

  if (!verifyPassword(password, userData.passwordHash)) {
    recordLoginAttempt(username, false);
    return null;
  }

  // Check if email is verified
  if (!userData.user.emailVerified) {
    return null;
  }

  recordLoginAttempt(username, true);

  // Update streak
  const user = updateStreak(userData.user);

  // Save updated user
  users[username].user = user;
  saveUsers(users);

  return user;
}

// Update streak
export function updateStreak(user: User): User {
  const today = new Date().toDateString();
  const lastActive = new Date(user.lastActive).toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastActive === today) {
    return user;
  } else if (lastActive === yesterday) {
    return {
      ...user,
      streak: user.streak + 1,
      lastActive: new Date().toISOString(),
    };
  } else {
    return {
      ...user,
      streak: 1,
      lastActive: new Date().toISOString(),
    };
  }
}

// Save user progress
export function saveUserProgress(
  username: string,
  moduleId: string,
  lessonId: string,
  quizScore?: number
): User | null {
  const users = getUsers();
  const userData = users[username];

  if (!userData) return null;

  const user = userData.user;

  // Add lesson to completed
  if (!user.completedLessons[moduleId]) {
    user.completedLessons[moduleId] = [];
  }
  if (!user.completedLessons[moduleId].includes(lessonId)) {
    user.completedLessons[moduleId].push(lessonId);
    user.totalXP += 10;
  }

  // Save quiz score if provided
  if (quizScore !== undefined) {
    const oldScore = user.quizScores[moduleId] || 0;
    if (quizScore > oldScore) {
      user.quizScores[moduleId] = quizScore;
      user.totalXP += (quizScore - oldScore) * 2;
    }
  }

  // Check if module is complete
  try {
    const { getModule } = require("./data");
    const mod = getModule(moduleId);
    if (mod) {
      const completedCount = user.completedLessons[moduleId]?.length || 0;
      if (completedCount >= mod.lessons.length && !user.completedModules.includes(moduleId)) {
        user.completedModules.push(moduleId);
        user.totalXP += 50;
      }
    }
  } catch (e) {
    // Module check optional
  }

  // Update streak
  const updatedUser = updateStreak(user);

  users[username].user = updatedUser;
  saveUsers(users);

  return updatedUser;
}

// Toggle save/bookmark module
export function toggleSaveModuleForUser(username: string, moduleSlug: string): User | null {
  const users = getUsers();
  const userData = users[username];
  if (!userData) return null;

  const user = userData.user;
  if (!user.savedModules) user.savedModules = [];

  const index = user.savedModules.indexOf(moduleSlug);
  if (index >= 0) {
    user.savedModules.splice(index, 1);
  } else {
    user.savedModules.push(moduleSlug);
  }

  users[username].user = user;
  saveUsers(users);
  return user;
}

// Get current user from session
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const session = sessionStorage.getItem("learnhub_session");
  if (!session) return null;

  const { username } = JSON.parse(session);
  const users = getUsers();
  return users[username]?.user || null;
}

// Set session
export function setSession(username: string): void {
  sessionStorage.setItem("learnhub_session", JSON.stringify({ username }));
}

// Clear session
export function clearSession(): void {
  sessionStorage.removeItem("learnhub_session");
}

// Reset ALL data (admin function)
export function resetAllData(): void {
  localStorage.removeItem("learnhub_users");
  localStorage.removeItem("learnhub_login_attempts");
  localStorage.removeItem("learnhub_pending_verification");
  sessionStorage.removeItem("learnhub_session");
  // Also clear any per-module completion keys
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith("completed-")) {
      localStorage.removeItem(key);
    }
  });
}

// Get user level based on XP
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
    if (xp >= levels[i].xp) {
      currentLevel = i;
      break;
    }
  }

  const nextLevel = Math.min(currentLevel + 1, levels.length - 1);
  const currentXP = levels[currentLevel].xp;
  const nextXP = levels[nextLevel].xp;
  const xpInLevel = xp - currentXP;
  const xpNeeded = nextXP - currentXP;
  const progress = currentLevel === levels.length - 1 ? 100 : Math.round((xpInLevel / xpNeeded) * 100);

  return {
    level: currentLevel + 1,
    title: levels[currentLevel].title,
    xpToNext: nextXP - xp,
    progress,
  };
}
