// Simple localStorage-based auth system
// For production, replace with NextAuth.js + database

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  streak: number;
  lastActive: string;
  totalXP: number;
  completedModules: string[];
  completedLessons: Record<string, string[]>; // moduleId -> lessonIds
  quizScores: Record<string, number>; // moduleId -> score
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Generate simple ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Hash password (simple - for production use bcrypt)
export function hashPassword(password: string): string {
  // Simple hash for demo - use bcrypt in production
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36) + password.length;
}

// Verify password
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

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

// Register new user
export function registerUser(username: string, email: string, password: string): User | null {
  const users = getUsers();
  
  // Check if username exists
  if (users[username]) {
    return null;
  }
  
  const avatars = ["🤓", "😎", "🦊", "🐱", "🦄", "🐸", "🐼", "🦁", "🐯", "🐨"];
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
  
  const user: User = {
    id: generateId(),
    username,
    email,
    avatar: randomAvatar,
    createdAt: new Date().toISOString(),
    streak: 1,
    lastActive: new Date().toISOString(),
    totalXP: 0,
    completedModules: [],
    completedLessons: {},
    quizScores: {},
  };
  
  users[username] = {
    user,
    passwordHash: hashPassword(password),
  };
  
  saveUsers(users);
  return user;
}

// Login user
export function loginUser(username: string, password: string): User | null {
  const users = getUsers();
  const userData = users[username];
  
  if (!userData) {
    return null;
  }
  
  if (!verifyPassword(password, userData.passwordHash)) {
    return null;
  }
  
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
    // Already active today
    return user;
  } else if (lastActive === yesterday) {
    // Active yesterday, increment streak
    return {
      ...user,
      streak: user.streak + 1,
      lastActive: new Date().toISOString(),
    };
  } else {
    // Streak broken, reset to 1
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
    user.totalXP += 10; // 10 XP per lesson
  }
  
  // Save quiz score if provided
  if (quizScore !== undefined) {
    const oldScore = user.quizScores[moduleId] || 0;
    if (quizScore > oldScore) {
      user.quizScores[moduleId] = quizScore;
      user.totalXP += (quizScore - oldScore) * 2; // 2 XP per correct answer
    }
  }
  
  // Check if module is complete
  const { getModule } = require("./data");
  const module = getModule(moduleId);
  if (module) {
    const completedCount = user.completedLessons[moduleId]?.length || 0;
    if (completedCount >= module.lessons.length && !user.completedModules.includes(moduleId)) {
      user.completedModules.push(moduleId);
      user.totalXP += 50; // 50 XP bonus for completing module
    }
  }
  
  // Update streak
  const updatedUser = updateStreak(user);
  
  users[username].user = updatedUser;
  saveUsers(users);
  
  return updatedUser;
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

// Get user level based on XP
export function getUserLevel(xp: number): { level: number; title: string; xpToNext: number } {
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
  
  return {
    level: currentLevel + 1,
    title: levels[currentLevel].title,
    xpToNext: levels[nextLevel].xp - xp,
  };
}
