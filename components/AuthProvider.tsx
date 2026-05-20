"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  User,
  getCurrentUser,
  setSession,
  clearSession,
  loginUser,
  registerUser,
  saveUserProgress,
  toggleSaveModuleForUser,
  verifyEmailCode,
  resetAllData,
} from "@/lib/auth";
import { getUserId, saveProgress, loadProgress, subscribeToProgress } from "@/lib/firebaseStorage";
import { syncToFirebase, syncFromFirebase } from "@/lib/flashcards";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => { pending: true; code: string } | null;
  verifyEmail: (code: string) => boolean;
  logout: () => void;
  updateUser: (user: User) => void;
  completeLesson: (moduleId: string, lessonId: string, quizScore?: number) => void;
  toggleSaveModule: (moduleSlug: string) => void;
  resetAll: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    const loggedInUser = loginUser(username, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      setSession(username);
      // Sync with Firebase
      const userId = getUserId(loggedInUser);
      if (userId) {
        syncFromFirebase(userId);
      }
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string): { pending: true; code: string } | null => {
    const result = registerUser(username, email, password);
    return result;
  };

  const verifyEmail = (code: string): boolean => {
    const verifiedUser = verifyEmailCode(code);
    if (verifiedUser) {
      setUser(verifiedUser);
      setSession(verifiedUser.username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    clearSession();
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    const users = JSON.parse(localStorage.getItem("learnhub_users") || "{}");
    if (users[updatedUser.username]) {
      users[updatedUser.username].user = updatedUser;
      localStorage.setItem("learnhub_users", JSON.stringify(users));
    }
  };

  const completeLesson = (moduleId: string, lessonId: string, quizScore?: number) => {
    if (!user) return;
    const updatedUser = saveUserProgress(user.username, moduleId, lessonId, quizScore);
    if (updatedUser) {
      setUser(updatedUser);
      // Sync to Firebase
      const userId = getUserId(updatedUser);
      if (userId) {
        saveProgress(userId, {
          completedLessons: updatedUser.completedLessons || {},
          savedModules: updatedUser.savedModules || [],
          lastUpdated: Date.now(),
        });
      }
    }
  };

  const toggleSaveModule = (moduleSlug: string) => {
    if (!user) return;
    const updatedUser = toggleSaveModuleForUser(user.username, moduleSlug);
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  const resetAll = () => {
    resetAllData();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user, login, register, verifyEmail, logout, updateUser,
      completeLesson, toggleSaveModule, resetAll, isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
