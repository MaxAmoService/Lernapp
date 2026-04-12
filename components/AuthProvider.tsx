"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, getCurrentUser, setSession, clearSession, loginUser, registerUser, saveUserProgress } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (user: User) => void;
  completeLesson: (moduleId: string, lessonId: string, quizScore?: number) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
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
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string): boolean => {
    const newUser = registerUser(username, email, password);
    if (newUser) {
      setUser(newUser);
      setSession(username);
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
    // Update in localStorage
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
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, completeLesson, isLoading }}>
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
