"use client";

import { useAuth } from "./AuthProvider";
import { getUserLevel } from "@/lib/auth";
import { LogOut, Trophy, Flame, Star, Zap, ChevronDown, Settings, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function UserProfile() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  if (!user) return null;

  const levelInfo = getUserLevel(user.totalXP);

  return (
    <div className="relative">
      {/* User Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <span className="text-2xl">{user.avatar}</span>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium">{user.displayName || user.username}</p>
          <p className="text-xs text-slate-400">Lvl {levelInfo.level} • {user.totalXP} XP</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showMenu ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Backdrop to close menu */}
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-full mt-2 w-72 glass rounded-xl p-4 animate-slide-up z-50">
            {/* User Info */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700">
              <span className="text-4xl">{user.avatar}</span>
              <div>
                <p className="font-semibold">{user.displayName || user.username}</p>
                <p className="text-sm text-blue-400">{levelInfo.title}</p>
                {user.email && (
                  <p className="text-xs text-slate-500">{user.email}</p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                <p className="text-lg font-bold">{user.streak}</p>
                <p className="text-xs text-slate-400">Streak</p>
              </div>
              <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                <p className="text-lg font-bold">{user.totalXP}</p>
                <p className="text-xs text-slate-400">XP</p>
              </div>
              <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                <Trophy className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <p className="text-lg font-bold">{user.completedModules.length}</p>
                <p className="text-xs text-slate-400">Module</p>
              </div>
            </div>

            {/* Level Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Level {levelInfo.level}</span>
                <span className="text-slate-400">{levelInfo.xpToNext} XP bis Level {levelInfo.level + 1}</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                  style={{ width: `${levelInfo.progress}%` }}
                />
              </div>
            </div>

            {/* Profile Link */}
            <Link
              href="/profile"
              onClick={() => setShowMenu(false)}
              className="w-full flex items-center gap-2 p-2 mb-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors text-sm"
            >
              <User className="w-4 h-4 text-blue-400" />
              Mein Profil bearbeiten
            </Link>

            {/* Achievements */}
            <div className="mb-4">
              <p className="text-sm text-slate-400 mb-2">Erfolge</p>
              <div className="flex gap-2 flex-wrap">
                {user.streak >= 3 && (
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                    🔥 3+ Tage Streak
                  </span>
                )}
                {user.completedModules.length >= 1 && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                    🎯 Erstes Modul
                  </span>
                )}
                {user.totalXP >= 100 && (
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                    ⭐ 100 XP
                  </span>
                )}
                {user.totalXP >= 500 && (
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                    💎 500 XP
                  </span>
                )}
                {user.streak >= 7 && (
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                    🔥 7 Tage Streak
                  </span>
                )}
                {(user.savedModules?.length || 0) >= 3 && (
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                    📚 Sammler
                  </span>
                )}
                {user.completedModules.length === 0 && user.streak < 3 && user.totalXP < 100 && (
                  <span className="text-xs text-slate-500 italic">Spiele Erfolge frei! 🎮</span>
                )}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={() => { logout(); setShowMenu(false); }}
              className="w-full flex items-center justify-center gap-2 p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Abmelden
            </button>
          </div>
        </>
      )}
    </div>
  );
}
