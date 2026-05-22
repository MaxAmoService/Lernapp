"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  UserProfile,
  getUserProfile,
  createVerification,
  verifyCodeAndCreateUser,
  loginUser,
  logoutUser,
  saveUserProgress,
  toggleSaveModule,
  updateUserProfile,
  changePassword,
  changeEmail,
  deleteAccount,
} from "@/lib/auth";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isEmailVerified: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<{ code: string; sent: boolean }>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updatePassword: (currentPw: string, newPw: string) => Promise<void>;
  updateEmail: (currentPw: string, newEmail: string) => Promise<void>;
  deleteUserAccount: (password: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  completeLesson: (moduleId: string, lessonId: string, quizScore?: number) => Promise<void>;
  toggleSaveModule: (moduleSlug: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  resetAll: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          let profile = await getUserProfile(firebaseUser.uid);
          if (!profile) {
            // Edge Case: Auth-User ohne Firestore-Profil
            profile = await getUserProfile(firebaseUser.uid);
          }
          if (profile) {
            // Email-Verifikation syncen
            if (profile.emailVerified !== firebaseUser.emailVerified) {
              await updateUserProfile(firebaseUser.uid, { emailVerified: firebaseUser.emailVerified });
              profile.emailVerified = firebaseUser.emailVerified;
            }
            setUser(profile);
          } else {
            setUser(null);
          }
        } catch (err) {
          console.error("Auth state error:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const profile = await loginUser(email, password);
    setUser(profile);
  };

  const register = async (email: string, password: string, username: string) => {
    // Erstellt Pending Verification in Firestore + sendet Code
    const result = await createVerification(email, password, username);
    return result;
  };

  const verifyEmail = async (email: string, code: string): Promise<void> => {
    // Prüft Code + erstellt Firebase Auth User + Firestore Profil
    const profile = await verifyCodeAndCreateUser(email, code);
    setUser(profile);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    await updateUserProfile(user.uid, updates);
    setUser({ ...user, ...updates });
  };

  const updatePassword = async (currentPw: string, newPw: string) => {
    await changePassword(currentPw, newPw);
  };

  const updateEmail = async (currentPw: string, newEmail: string) => {
    await changeEmail(currentPw, newEmail);
    if (user) setUser({ ...user, email: newEmail, emailVerified: false });
  };

  const deleteUserAccount = async (password: string) => {
    await deleteAccount(password);
    setUser(null);
  };

  const resendVerification = async () => {
    const user = auth.currentUser;
    if (user) {
      // Firebase Auth sendet Verifikations-Email erneut
      const { sendEmailVerification } = await import("firebase/auth");
      await sendEmailVerification(user);
    }
  };

  const completeLesson = async (moduleId: string, lessonId: string, quizScore?: number) => {
    if (!user) return;
    const updated = await saveUserProgress(user.uid, moduleId, lessonId, quizScore);
    if (updated) setUser(updated);
  };

  const toggleSaveModuleFn = async (moduleSlug: string) => {
    if (!user) return;
    const updated = await toggleSaveModule(user.uid, moduleSlug);
    if (updated) setUser(updated);
  };

  const refreshUser = async () => {
    if (!user) return;
    const profile = await getUserProfile(user.uid);
    if (profile) setUser(profile);
  };

  const resetAll = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("learnhub_users");
      localStorage.removeItem("learnhub_login_attempts");
      localStorage.removeItem("learnhub_pending_verification");
      sessionStorage.removeItem("learnhub_session");
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith("completed-")) localStorage.removeItem(key);
      });
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user, isLoading, isEmailVerified: user?.emailVerified ?? false,
      login, register, verifyEmail, logout,
      updateProfile, updatePassword, updateEmail, deleteUserAccount, resendVerification,
      completeLesson, toggleSaveModule: toggleSaveModuleFn,
      refreshUser, resetAll,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
