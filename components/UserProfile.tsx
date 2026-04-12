"use client";

import { useAuth } from "./AuthProvider";
import { getUserLevel } from "@/lib/auth";
import { LogOut, Trophy, Flame, Star, Zap, ChevronDown } from "lucide-react";
import { useState } from "react";

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
          <p className="text-sm font-medium">{user.username}</p>
          <p className="text-xs text-slate-400">Lvl {levelInfo.level} • {user.totalXP} XP</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showMenu ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute right-0 top-full mt-2 w-72 glass rounded-xl p-4 animate-slide-up z-50">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700">
            <span className="text-4xl">{user.avatar}</span>
            <div>
              <p className="font-semibold">{user.username}</p>
              <p className="text-sm text-blue-400">{levelInfo.title}</p>
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
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${Math.max(0, 100 - (levelInfo.xpToNext / 10))}%` }}
              />
            </div>
          </div>

          {/* Achievements Preview */}
          <div className="mb-4">
            <p className="text-sm text-slate-400 mb-2">Erfolge</p>
            <div className="flex gap-2 flex-wrap">
              {user.streak >= 3 && (
                <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                  🔥 3 Tage Streak
                </span>
              )}
              {user.completedModules.length >= 1 && (
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  🎯 Modul abgeschlossen
                </span>
              )}
              {user.totalXP >= 100 && (
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                  ⭐ 100 XP Club
                </span>
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
      )}
    </div>
  );
}
